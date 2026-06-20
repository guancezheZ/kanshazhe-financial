/**
 * 观测者财务模拟系统 · 激活码验证 Worker
 * 部署到 Cloudflare Workers
 *
 * 使用前：
 *   1. 在 Cloudflare 创建一个 KV Namespace（命名：ACTIVATION_DB）
 *   2. 在 Worker 设置中绑定该 KV，变量名填 ACTIVATION_DB
 *   3. 在 Worker 环境变量中设置 ADMIN_TOKEN（管理员密码）
 *   4. 可选：设置 MASTER_KEY 环境变量覆盖默认主密钥
 *
 * ⚠️ 安全警告：不得在代码中硬编码密码！
 *    管理员密码和主密钥都通过 Cloudflare 环境变量设置。
 */

// 🔑 管理令牌（从 Cloudflare 环境变量读取，不得硬编码！）
// 部署后在 CF 面板设置 ADMIN_TOKEN 环境变量

// 主密钥（优先从环境变量读取，兼容现有客户端）
function getMasterKey(env) {
  return env?.MASTER_KEY || '6125-9D04-84E5-007F'
}

// 🌐 单设备配置：同一激活码绑定 1 台设备（固定指纹，平台版专用）
const MAX_DEVICES = 1

// 🌐 双层防护配置
const RATE_LIMIT_WINDOW = 60000    // 1 分钟窗口
const RATE_LIMIT_MAX = 10           // 每分钟最多 10 次
const FAIL_BAN_THRESHOLD = 20       // 连续失败 20 次封禁
const FAIL_BAN_DURATION = 3600      // 封禁时长 1 小时（秒）

export default {
  async fetch(request, env) {
    // 处理 CORS
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      })
    }

    const url = new URL(request.url)
    const path = url.pathname.replace(/\/+$/, '') || '/'

    // 🌐 下载 / 更新页面
    if (path === '/download') {
      return Response.redirect('https://github.com/guancezheZ/kanshazhe-financial/releases/download/v0.1.0/%E8%A7%82%E6%B5%8B%E8%80%85%E8%B4%A2%E5%8A%A1%E6%A8%A1%E6%8B%9F%E7%B3%BB%E7%BB%9F_0.1.0_x64-setup.exe', 302)
    }
    if (path === '/update') {
      return Response.redirect('https://github.com/guancezheZ/kanshazhe-financial/releases', 302)
    }

    const action = url.searchParams.get('action') || 'verify'

    try {
      // 全局：检查客户端IP是否被封禁
      const clientIp = request.headers.get('CF-Connecting-IP') || 'unknown'
      const banned = await checkBan(env, clientIp)
      if (banned) {
        return json({ success: false, message: '该IP已被临时封禁，请1小时后重试', block: true }, 403)
      }

      switch (action) {
        case 'verify':   return await handleVerify(url, env, request)
        case 'activate': return await handleActivate(url, env, request)
        case 'admin':    return await handleAdmin(url, env, request)
        default:         return json({ error: '未知操作' })
      }
    } catch (err) {
      return json({ error: err.message }, 500)
    }
  },
}

// ─── 验证激活码 ───
async function handleVerify(url, env, request) {
  const code = (url.searchParams.get('code') || '').toUpperCase()

  if (!isValidFormat(code)) {
    return json({ valid: false, message: '格式错误' })
  }

  // 主密钥直接通过
  if (code === getMasterKey(env)) {
    return json({ valid: true, master: true })
  }

  // 从 KV 查状态
  const db = await getDB(env)
  const record = db[code]

  if (!record) {
    // 不在 KV 中 → 必须通过校验和验证
    if (!verifyCode(code)) {
      return json({ valid: false, message: '校验和无效' })
    }
    // 校验和通过但从未被激活过
    return json({ valid: true, status: 'new' })
  }

  if (record.revoked) {
    return json({ valid: false, status: 'revoked', message: '此激活码已被吊销' })
  }

  if (record.fps && record.fps.length > 0) {
    // 有设备绑定记录，返回绑定的平台列表（不暴露具体指纹）
    const platforms = record.fps.map(d => d.platform || 'unknown')
    return json({ valid: true, status: 'bound', deviceCount: record.fps.length, platforms, message: '已绑定设备' })
  }

  // ⭐ 兼容旧格式检验
  if (record.fp) {
    return json({ valid: true, status: 'bound', deviceCount: 1, platforms: ['legacy'], message: '已绑定设备（旧格式）' })
  }

  return json({ valid: true, status: 'new' })
}

// ─── 激活并绑定设备 ───
async function handleActivate(url, env, request) {
  let code, fp, platform

  if (request.method === 'POST') {
    const body = await request.json()
    code = (body.code || '').toUpperCase()
    fp = body.fp || ''
    platform = body.platform || 'web'
  } else {
    code = (url.searchParams.get('code') || '').toUpperCase()
    fp = url.searchParams.get('fp') || ''
    platform = url.searchParams.get('platform') || 'web'
  }

  if (!isValidFormat(code)) {
    return json({ success: false, message: '格式错误' })
  }

  if (!fp) {
    return json({ success: false, message: '缺少设备指纹' })
  }

  // 主密钥
  if (code === getMasterKey(env)) {
    return json({ success: true, message: '主密钥激活成功' })
  }

  // ⭐ 校验和验证（非主密钥必须通过）
  if (!verifyCode(code)) {
    await recordFailAttempt(env, request.headers.get('CF-Connecting-IP') || 'unknown')
    return json({ success: false, message: '激活码校验和无效', block: true })
  }

  // ⭐ 速率限制（每 IP 每分钟最多 10 次激活尝试）
  const clientIp = request.headers.get('CF-Connecting-IP') || 'unknown'
  if (!await checkRateLimit(env, clientIp)) {
    return json({ success: false, message: '请求过于频繁，请稍后再试', block: true }, 429)
  }

  // 从 KV 查状态
  const db = await getDB(env)
  const record = db[code]

  if (record?.revoked) {
    await recordFailAttempt(env, clientIp)
    return json({ success: false, message: '此激活码已被吊销', block: true })
  }

  // ⭐ 兼容旧格式：老 KV 数据用 { fp, activatedAt } 而非 { fps: [...] }
  // 迁移到新格式以支持设备绑定
  if (record?.fp && !record?.fps) {
    record.fps = [{ fp: record.fp, platform: 'legacy', activatedAt: record.activatedAt || new Date().toISOString() }]
    delete record.fp
    delete record.activatedAt
    await saveDB(env, db)
  }

  // 已存在的绑定：检查指纹是否匹配
  if (record?.fps && record.fps.length > 0) {
    const existing = record.fps.find(d => d.fp === fp)
    if (existing) {
      // ✅ 同一设备重复激活
      existing.activatedAt = new Date().toISOString()
      await saveDB(env, db)
      return json({ success: true, message: '已激活', status: 'already' })
    }

    if (record.fps.length >= MAX_DEVICES) {
      // 🚫 超过最大设备数
      await recordFailAttempt(env, clientIp)
      return json({ success: false, message: '此激活码已绑定到其他设备，每码仅限一台', block: true })
    }

    // 新设备加入绑定
    record.fps.push({ fp, platform, activatedAt: new Date().toISOString() })
    await saveDB(env, db)
    return json({ success: true, message: '激活成功（设备已绑定）', status: 'activated' })
  }

  // 首次激活 → 创建绑定数组
  db[code] = { fps: [{ fp, platform, activatedAt: new Date().toISOString() }] }
  await saveDB(env, db)
  // ✅ 成功激活，清除失败计数
  await clearFailCount(env, clientIp)
  return json({ success: true, message: '激活成功，已绑定本机', status: 'activated' })
}

// ─── 管理员操作 ───
async function handleAdmin(url, env, request) {
  const adminToken = env?.ADMIN_TOKEN || ''
  if (!adminToken) {
    return json({ error: '管理员令牌未配置，请在 CF 面板设置 ADMIN_TOKEN 环境变量' }, 500)
  }
  const token = url.searchParams.get('token') || request.headers.get('Authorization') || ''
  if (token !== adminToken) {
    return json({ error: '未授权' }, 403)
  }

  const cmd = url.searchParams.get('cmd')
  const db = await getDB(env)

  switch (cmd) {
    case 'stats': {
      const codes = Object.keys(db)
      const activated = codes.filter(c => db[c].fps?.length > 0 && !db[c].revoked).length
      const revoked = codes.filter(c => db[c].revoked).length
      const totalDevices = codes.reduce((s, c) => s + (db[c].fps?.length || 0), 0)
      return json({ total: codes.length, activated, revoked, totalDevices, records: db })
    }

    case 'revoke': {
      const code = (url.searchParams.get('code') || '').toUpperCase()
      if (!db[code]) return json({ error: '密钥不存在' })
      db[code].revoked = true
      await saveDB(env, db)
      return json({ success: true, message: '已吊销' })
    }

    case 'import': {
      // 批量导入密钥（POST JSON {codes: ["...", "..."]}）
      if (request.method !== 'POST') return json({ error: '请用 POST' })
      const body = await request.json()
      const imported = []
      for (const code of (body.codes || [])) {
        const c = code.toUpperCase()
        if (isValidFormat(c) && !db[c]) {
          db[c] = { importedAt: new Date().toISOString() }
          imported.push(c)
        }
      }
      await saveDB(env, db)
      return json({ success: true, imported: imported.length })
    }

    default:
      return json({ commands: ['stats', 'revoke', 'import'] })
  }
}

// ─── KV 工具 ───

async function getDB(env) {
  try {
    const raw = await env.ACTIVATION_DB.get('keys', 'json')
    return raw || {}
  } catch { return {} }
}

async function saveDB(env, db) {
  await env.ACTIVATION_DB.put('keys', JSON.stringify(db))
}

// ─── 双层防护：速率限制 + IP 封禁 ───

/**
 * 速率限制（基于 KV 的滑动窗口）
 * 每 IP 每分钟最多 RATE_LIMIT_MAX 次
 */
async function checkRateLimit(env, ip) {
  const key = `ratelimit:${ip}`
  const now = Date.now()

  try {
    const record = await env.ACTIVATION_DB.get(key, 'json')
    if (!record || now - record.start > RATE_LIMIT_WINDOW) {
      await env.ACTIVATION_DB.put(key, JSON.stringify({ count: 1, start: now }), { expirationTtl: 120 })
      return true
    }
    if (record.count >= RATE_LIMIT_MAX) return false
    record.count++
    await env.ACTIVATION_DB.put(key, JSON.stringify(record), { expirationTtl: 120 })
    return true
  } catch {
    return true // 异常时放行（不阻塞正常用户）
  }
}

/**
 * IP 封禁检查
 * 连续 FAIL_BAN_THRESHOLD 次失败后封禁 FAIL_BAN_DURATION 秒
 */
async function checkBan(env, ip) {
  const key = `ban:${ip}`
  try {
    const record = await env.ACTIVATION_DB.get(key, 'json')
    if (!record) return false
    // 检查封禁是否已过期
    if (record.until && Date.now() < record.until) {
      return true // 仍在封禁期
    }
    // 封禁已过期，清除记录
    await env.ACTIVATION_DB.delete(key)
    return false
  } catch {
    return false // 异常时放行
  }
}

/**
 * 记录一次失败的激活尝试
 * 连续失败达到阈值 → 封禁 IP
 */
async function recordFailAttempt(env, ip) {
  const key = `fail:${ip}`
  try {
    const record = await env.ACTIVATION_DB.get(key, 'json')
    const now = Date.now()
    const count = (record?.count || 0) + 1

    if (count >= FAIL_BAN_THRESHOLD) {
      // 🚫 达到封禁阈值
      await env.ACTIVATION_DB.put(key, JSON.stringify({ count, lastFail: now }), { expirationTtl: FAIL_BAN_DURATION + 300 })
      // 写入封禁记录
      await env.ACTIVATION_DB.put(`ban:${ip}`, JSON.stringify({ until: now + FAIL_BAN_DURATION * 1000 }), { expirationTtl: FAIL_BAN_DURATION + 60 })
      return
    }

    // 未达阈值，递增计数（窗口 1 小时滑动，过期自动清理）
    await env.ACTIVATION_DB.put(key, JSON.stringify({ count, lastFail: now }), { expirationTtl: 3600 + 300 })
  } catch {
    // 失败不计（不阻塞正常用户）
  }
}

/**
 * 清除失败计数（激活成功后调用）
 */
async function clearFailCount(env, ip) {
  try {
    await env.ACTIVATION_DB.delete(`fail:${ip}`)
  } catch { /* ignore */ }
}

// ─── 验证算法 ───

function isValidFormat(code) {
  return /^[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}$/.test(code)
}

function verifyCode(code) {
  if (!isValidFormat(code)) return false
  const norm = code.replace(/-/g, '').split('')
  let cs = 0
  for (let i = 0; i < 12; i++) cs ^= parseInt(norm[i], 16)
  const exp = cs & 0xFFF
  const act = (parseInt(norm[12], 16) << 8) | (parseInt(norm[13], 16) << 4) | parseInt(norm[14], 16)
  return exp === act
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
