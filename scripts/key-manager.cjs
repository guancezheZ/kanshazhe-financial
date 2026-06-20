/**
 * 观测者财务模拟系统 · 密钥管理器（商业版）
 *
 * 用法：
 *   node scripts/key-manager.cjs generate [数量]     生成激活码
 *   node scripts/key-manager.cjs export [令牌]         导出密钥（有令牌时从 Worker 取实时数据）
 *   node scripts/key-manager.cjs verify <密钥>        验证密钥是否有效
 *   node scripts/key-manager.cjs batch <文件>         从CSV批量导入生成
 *   node scripts/key-manager.cjs upload [令牌]        将未上传的密钥同步到 Cloudflare Worker
 */

const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const MASTER_KEY = '6125-9D04-84E5-007F'
const DATA_FILE = path.join(__dirname, '..', 'keys-database.json')
const WORKER_URL = 'https://jiaqinw.xyz'

// ─── 密钥数据库 ───

function loadDB() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
    }
  } catch {}
  return { keys: [], nextId: 1, createdAt: new Date().toISOString() }
}

function saveDB(db) {
  db.updatedAt = new Date().toISOString()
  fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2), 'utf-8')
}

// ─── 激活码生成算法（与客户端代码保持同步） ───

function generateCodeFromSeed() {
  const chars = []
  // 用 crypto.randomBytes(6) 生成 6 字节 → 12 个十六进制 nibble
  const bytes = crypto.randomBytes(6)
  for (let i = 0; i < 6; i++) {
    chars.push((bytes[i] >> 4).toString(16).toUpperCase())
    chars.push((bytes[i] & 0x0F).toString(16).toUpperCase())
  }

  // 校验和：前12位 XOR → 3位hex（不变）
  let checksum = 0
  for (let i = 0; i < 12; i++) checksum ^= parseInt(chars[i], 16)
  chars.push(((checksum >> 8) & 0xF).toString(16).toUpperCase())
  chars.push(((checksum >> 4) & 0xF).toString(16).toUpperCase())
  chars.push((checksum & 0xF).toString(16).toUpperCase())

  // 第16位随机（无设备预绑定，激活时自动绑定）
  const randomNibble = crypto.randomInt(0, 16).toString(16).toUpperCase()
  chars.push(randomNibble)

  return chars.slice(0, 4).join('') + '-' + chars.slice(4, 8).join('') +
         '-' + chars.slice(8, 12).join('') + '-' + chars.slice(12, 16).join('')
}

function verifyCode(code) {
  if (!/^[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}$/.test(code)) return false
  if (code === MASTER_KEY) return true

  const normalized = code.replace(/-/g, '')
  const chars = normalized.split('')
  if (chars.length !== 16) return false

  let checksum = 0
  for (let i = 0; i < 12; i++) checksum ^= parseInt(chars[i], 16)
  const expected = checksum & 0xFFF
  const actual = (parseInt(chars[12], 16) << 8) | (parseInt(chars[13], 16) << 4) | parseInt(chars[14], 16)
  return expected === actual
}

// ─── 命令：生成 ───

function cmdGenerate(count) {
  const db = loadDB()
  const results = []
  const existingCodes = new Set(db.keys.map(k => k.code))

  while (results.length < count) {
    const code = generateCodeFromSeed()
    if (existingCodes.has(code)) continue
    existingCodes.add(code)
    const entry = {
      id: db.nextId++,
      code,
      status: 'unused',
      generatedAt: new Date().toISOString(),
      activatedAt: null,
      deviceFingerprint: null,
      note: '',
    }
    db.keys.push(entry)
    results.push(entry)
  }

  saveDB(db)
  return results
}

// ─── 命令：导出 ───

function cmdExport() {
  const db = loadDB()
  return db.keys
}

// ─── 命令：验证 ───

function cmdVerify(code) {
  const upper = code.toUpperCase().trim()
  const valid = verifyCode(upper)

  const db = loadDB()
  const record = db.keys.find(k => k.code === upper)

  return {
    valid,
    code: upper,
    isMasterKey: upper === MASTER_KEY,
    inDatabase: !!record,
    status: record?.status || 'unknown',
    activatedAt: record?.fps?.[0]?.activatedAt || record?.activatedAt || null,
    deviceFingerprint: record?.fps?.map(d => d.fp).join(', ') || record?.deviceFingerprint || null,
  }
}

// ─── 主入口 ───

function main() {
  const command = process.argv[2]
  const arg = process.argv[3]

  console.log('')
  console.log('  ╔══════════════════════════════════════╗')
  console.log('  ║   观测者财务 · 密钥管理器 v1.0       ║')
  console.log('  ╚══════════════════════════════════════╝')
  console.log('')

  switch (command) {
    case 'generate':
    case 'gen': {
      const count = Math.max(1, parseInt(arg) || 1)
      const keys = cmdGenerate(count)
      console.log(`  ✅ 已生成 ${keys.length} 个激活码:\n`)
      keys.forEach(k => {
        console.log(`     [${String(k.id).padStart(4, '0')}]  ${k.code}`)
      })
      console.log(`\n  已保存到: ${path.basename(DATA_FILE)}`)
      break
    }

    case 'export':
    case 'list': {
      const token = arg || ''
      if (token) {
        // 在线模式：直接从 Worker 获取实时数据
        console.log(`  🌐 正在获取云端实时数据...`)
        const httpsExport = require('https')
        const exportUrl = new URL(WORKER_URL + '?action=admin&cmd=stats&token=' + encodeURIComponent(token))
        httpsExport.get(exportUrl, (res) => {
          let body = ''
          res.on('data', c => body += c)
          res.on('end', () => {
            try {
              const result = JSON.parse(body)
              if (!result.records) {
                console.log('  ❌ 获取失败:', JSON.stringify(result))
                return
              }
              const entries = Object.entries(result.records).map(([code, info]) => ({
                code, ...info
              }))
              // ⭐ 兼容新旧格式：新格式用 fps 数组，旧格式用 fp 字段
              const isActive = e => !e.revoked && ((e.fps?.length > 0) || !!e.fp)
              const deviceCount = e => Math.max(e.fps?.length || 0, e.fp ? 1 : 0)
              const activated = entries.filter(e => isActive(e)).length
              const revoked = entries.filter(e => e.revoked).length
              const unused = entries.length - activated - revoked
              const totalDevices = entries.reduce((s, e) => s + deviceCount(e), 0)
              console.log(`  云端: 总计 ${entries.length} | 未使用: ${unused} | 已激活: ${activated} | 已吊销: ${revoked} | 设备: ${totalDevices}\n`)
              console.log('  激活码                      状态        绑定设备/平台    激活时间')
              console.log('  ─────────────────────────────────────────────────────────────────────────')
              entries.forEach(e => {
                const devs = (e.fps && e.fps.length > 0)
                  ? e.fps.map(d => (d.platform || '?')[0] + ':' + d.fp.slice(0, 6)).join(', ')
                  : e.fp ? ('old:' + e.fp.slice(0, 6)) : '-'
                const time = e.fps?.[0]?.activatedAt
                  ? e.fps[0].activatedAt.slice(0, 19).replace('T', ' ')
                  : e.activatedAt
                    ? e.activatedAt.slice(0, 19).replace('T', ' ')
                    : (e.importedAt ? '已导入' : '-')
                const icon = e.revoked ? '🚫' : isActive(e) ? '🔐' : '📄'
                const status = e.revoked ? 'revoked' : isActive(e) ? `activated(${deviceCount(e)})` : 'unused'
                console.log(`  ${e.code}  ${icon} ${status.padEnd(14)} ${devs.padEnd(18)} ${time}`)
              })
            } catch (e) {
              console.log('  ❌ 解析响应失败:', e.message)
            }
          })
        }).on('error', e => console.log('  ❌ 请求失败:', e.message))
        break
      }
      // 本地模式
      const all = cmdExport()
      if (all.length === 0) {
        console.log('  📭 还没有生成过激活码')
        break
      }
      const unused = all.filter(k => k.status === 'unused').length
      const activated = all.filter(k => k.status === 'activated').length
      const revoked = all.filter(k => k.status === 'revoked').length
      console.log(`  总计: ${all.length} | 未使用: ${unused} | 已激活: ${activated} | 已吊销: ${revoked}\n`)
      console.log('  ID      激活码                      状态        绑定设备')
      console.log('  ────────────────────────────────────────────────────────────')
      all.forEach(k => {
        const fp = k.deviceFingerprint ? k.deviceFingerprint.slice(0, 8) : '-'
        const statusIcon = k.status === 'activated' ? '🔐' : k.status === 'revoked' ? '🚫' : '📄'
        console.log(`  ${String(k.id).padStart(4, '0')}  ${k.code}  ${statusIcon} ${k.status.padEnd(9)} ${fp}`)
      })
      break
    }

    case 'verify':
    case 'check': {
      if (!arg) {
        console.log('  ❌ 请指定要验证的激活码')
        console.log('  用法: node scripts/key-manager.cjs verify <激活码>')
        break
      }
      const result = cmdVerify(arg)
      if (!result.valid) {
        console.log(`  ❌ ${result.code} 是无效的激活码`)
      } else if (result.isMasterKey) {
        console.log(`  🔑 ${result.code} 是主密钥（通用，不限设备）`)
      } else if (result.activatedAt) {
        console.log(`  🔐 ${result.code}`)
        console.log(`     状态: 已激活（${result.activatedAt}）`)
        console.log(`     设备: ${result.deviceFingerprint || '未知'}`)
      } else {
        console.log(`  📄 ${result.code} 是有效的激活码，尚未被激活`)
      }
      break
    }

    case 'upload': {
      const token = arg || ''
      if (!token) {
        console.log('  ❌ 请提供管理员令牌')
        console.log('  用法: node scripts/key-manager.cjs upload <令牌>')
        console.log('  令牌在 Worker 代码中的 ADMIN_TOKEN 变量里')
        break
      }
      const db = loadDB()
      const codes = db.keys.filter(k => k.status === 'unused' && !k.uploaded).map(k => k.code)
      if (codes.length === 0) {
        console.log('  📭 没有需要上传的新密钥')
        break
      }
      console.log(`  📤 正在上传 ${codes.length} 个密钥到 Worker...`)
      const https = require('https')
      const data = JSON.stringify({ codes })
      const url = new URL(WORKER_URL + '?action=admin&cmd=import&token=' + encodeURIComponent(token))
      const req = https.request(url, { method: 'POST', headers: { 'Content-Type': 'application/json' } }, (res) => {
        let body = ''
        res.on('data', c => body += c)
        res.on('end', () => {
          const result = JSON.parse(body)
          if (result.success) {
            // 标记已上传
            db.keys.forEach(k => { if (codes.includes(k.code)) k.uploaded = true })
            saveDB(db)
            console.log(`  ✅ 成功上传 ${result.imported} 个密钥到 Worker`)
            console.log(`  ⚠️  未导入: ${codes.length - result.imported} 个（可能已存在）`)
          } else {
            console.log('  ❌ 上传失败:', JSON.stringify(result))
          }
        })
      })
      req.on('error', e => console.log('  ❌ 请求失败:', e.message))
      req.write(data)
      req.end()
      break
    }

    case 'revoke': {
      const token = arg
      const code = process.argv[4]
      if (!token || !code) {
        console.log('  ❌ 请提供管理员令牌和要吊销的激活码')
        console.log('  用法: node scripts/key-manager.cjs revoke <令牌> <激活码>')
        break
      }
      console.log(`  🚫 正在吊销 ${code}...`)
      const httpsRevoke = require('https')
      const revokeUrl = new URL(WORKER_URL + '?action=admin&cmd=revoke&token=' + encodeURIComponent(token) + '&code=' + encodeURIComponent(code))
      httpsRevoke.get(revokeUrl, (res) => {
        let body = ''
        res.on('data', c => body += c)
        res.on('end', () => {
          const result = JSON.parse(body)
          if (result.success) {
            // 同步更新本地数据库
            const db = loadDB()
            const entry = db.keys.find(k => k.code === code)
            if (entry) { entry.status = 'revoked'; entry.revokedAt = new Date().toISOString() }
            saveDB(db)
            console.log(`  ✅ 已吊销 ${code}`)
          } else {
            console.log('  ❌ 吊销失败:', JSON.stringify(result))
          }
        })
      }).on('error', e => console.log('  ❌ 请求失败:', e.message))
      break
    }

    case 'sync': {
      if (!token) {
        console.log('  ❌ 请提供管理员令牌')
        console.log('  用法: node scripts/key-manager.cjs sync <令牌>')
        console.log('  令牌在 Worker 代码中的 ADMIN_TOKEN 变量里')
        break
      }
      console.log(`  🔄 正在从 Worker 同步状态...`)
      const httpsSync = require('https')
      const syncUrl = new URL(WORKER_URL + '?action=admin&cmd=stats&token=' + encodeURIComponent(token))
      httpsSync.get(syncUrl, (res) => {
        let body = ''
        res.on('data', c => body += c)
        res.on('end', () => {
          try {
            const result = JSON.parse(body)
            if (!result.records) {
              console.log('  ❌ 同步失败:', JSON.stringify(result))
              return
            }
            const localDb = loadDB()
            let synced = 0
            for (const entry of localDb.keys) {
              const remote = result.records[entry.code]
              if (remote) {
                if (remote.fp) {
                  entry.status = 'activated'
                  entry.deviceFingerprint = remote.fp
                  entry.activatedAt = remote.activatedAt || entry.activatedAt
                  entry.uploaded = true
                  synced++
                } else if (remote.revoked) {
                  entry.status = 'revoked'
                  entry.uploaded = true
                  synced++
                } else {
                  entry.uploaded = true
                  synced++
                }
              }
            }
            saveDB(localDb)
            console.log(`  ✅ 同步完成！本地 ${synced} 条记录已更新`)
            console.log(`     云端: 总计 ${result.total} | 已激活 ${result.activated} | 已吊销 ${result.revoked}`)
          } catch (e) {
            console.log('  ❌ 解析响应失败:', e.message)
          }
        })
      }).on('error', e => console.log('  ❌ 请求失败:', e.message))
      break
    }

    case 'purge': {
      const token = arg || ''
      if (!token) {
        console.log('  ❌ 请提供管理员令牌')
        console.log('  用法: node scripts/key-manager.cjs purge <令牌>')
        break
      }
      console.log(`  🧹 正在扫描 Worker 上的无效密钥...`)
      const httpsPurge = require('https')
      const purgeUrl = new URL(WORKER_URL + '?action=admin&cmd=stats&token=' + encodeURIComponent(token))
      httpsPurge.get(purgeUrl, (res) => {
        let body = ''
        res.on('data', c => body += c)
        res.on('end', () => {
          try {
            const result = JSON.parse(body)
            if (!result.records) {
              console.log('  ❌ 获取失败:', JSON.stringify(result))
              return
            }
            const codes = Object.keys(result.records)
            // 只保留：在本地 DB 中 且 通过校验和 的密钥
            const localDb = loadDB()
            const legitCodes = new Set(localDb.keys.map(k => k.code))
            const toPurge = codes.filter(c => {
              // 主密钥不过滤
              if (c === MASTER_KEY) return false
              // 不在本地 DB 中 → 测试垃圾数据
              if (!legitCodes.has(c)) return true
              // 在本地 DB 中但没通过校验和 → 无效
              return !verifyCode(c)
            })
            if (toPurge.length === 0) {
              console.log('  ✅ Worker 上无垃圾数据')
              return
            }
            console.log(`  发现 ${toPurge.length} 个无效密钥，正在清理...`)
            // 逐个吊销（Worker 不支持批量，只能一个个来）
            let done = 0, errors = 0
            function revokeNext(i) {
              if (i >= toPurge.length) {
                console.log(`  ✅ 清理完成！已吊销 ${done} 个，失败 ${errors} 个`)
                return
              }
              const code = toPurge[i]
              const url = new URL(WORKER_URL + '?action=admin&cmd=revoke&token=' + encodeURIComponent(token) + '&code=' + encodeURIComponent(code))
              httpsPurge.get(url, (res2) => {
                let b = ''
                res2.on('data', c => b += c)
                res2.on('end', () => {
                  const r = JSON.parse(b)
                  if (r.success) done++
                  else errors++
                  process.stdout.write(`\r  进度: ${done + errors}/${toPurge.length}...`)
                  revokeNext(i + 1)
                })
              }).on('error', () => { errors++; revokeNext(i + 1) })
            }
            revokeNext(0)
          } catch (e) {
            console.log('  ❌ 解析响应失败:', e.message)
          }
        })
      }).on('error', e => console.log('  ❌ 请求失败:', e.message))
      break
    }

    case 'batch':
    case 'import': {
      // 从CSV文件导入：每行一个种子值或备注
      if (!arg || !fs.existsSync(arg)) {
        console.log('  ❌ 请指定有效的CSV文件路径')
        console.log('  用法: node scripts/key-manager.cjs batch <文件.csv>')
        break
      }
      const lines = fs.readFileSync(arg, 'utf-8').split('\n').map(l => l.trim()).filter(Boolean)
      console.log(`  📥 从 ${path.basename(arg)} 导入 ${lines.length} 条记录...`)
      const keys = cmdGenerate(lines.length)
      // 将备注写入
      const db = loadDB()
      lines.forEach((line, i) => {
        if (keys[i]) {
          const entry = db.keys.find(k => k.id === keys[i].id)
          if (entry) entry.note = line
        }
      })
      saveDB(db)
      console.log(`  ✅ 已生成 ${keys.length} 个激活码`)
      break
    }

    default:
      console.log('  用法: node scripts/key-manager.cjs <命令> [参数]\n')
      console.log('  命令:')
      console.log('    generate <数量>    生成激活码（默认1个）')
      console.log('    export [令牌]       查看密钥状态（有令牌时从 Worker 取实时数据）')
      console.log('    verify <激活码>    验证激活码是否有效')
      console.log('    upload <令牌>      上传密钥到 Cloudflare Worker')
      console.log('    revoke <令牌> <码>  吊销指定激活码（设备将无法激活）')
      console.log('    sync <令牌>        从 Worker 同步激活状态到本地')
      console.log('    purge <令牌>       清理 Worker 上的测试/无效密钥')
      console.log('    batch <文件.csv>   从CSV批量导入生成\n')
      console.log('  示例:')
      console.log('    node scripts/key-manager.cjs gen 10          生成10个')
      console.log('    node scripts/key-manager.cjs export          查看本地状态')
      console.log('    node scripts/key-manager.cjs export <令牌>   查看云端实时状态')
      console.log('    node scripts/key-manager.cjs revoke <令牌> ABCD-1234  吊销指定密钥')
      console.log('    node scripts/key-manager.cjs sync <令牌>    同步状态到本地')
      console.log('    node scripts/key-manager.cjs purge <令牌>    清理垃圾数据')
      console.log('    node scripts/key-manager.cjs verify ABCD     验证密钥')
      console.log('    node scripts/key-manager.cjs upload <令牌>   上传到云端\n')
  }
}

main()
