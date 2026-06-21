/**
 * 序列号验证 & 设备绑定工具
 *
 * 在线模式（默认）：通过 Cloudflare Worker 集中管理密钥
 * 离线模式（回退）：本地校验算法（开发/无网络时使用）
 *
 * 激活码格式：XXXX-XXXX-XXXX-XXXX（16位大写十六进制）
 * 第13-15位 = 前12位的 XOR 校验和
 * 第16位 = 随机
 *
 * ⭐ 双轨存储策略：
 *   - 同步：写入 localStorage 明文（保证 isActivated() 等同步读取正常）
 *   - 异步：通过 secure-storage.js 写入 AES-GCM 密文（保护数据在本地磁盘的安全）
 *   - initActivationCache() 在启动时从加密存储恢复明文
 */

const STORAGE_KEY = 'jd_activated'
const TRIAL_KEY = 'jd_activation_trials'
const FINGERPRINT_KEY = 'jd_device_fingerprint'
const BINDING_PREFIX = 'jd_code_binding_'

// ⚡ 在线验证服务地址（通过 Cloudflare Worker）
const WORKER_URL = 'https://jiaqinw.xyz'

// ⚠️ 客户端代码不含任何密钥，所有验证走 Worker
const MASTER_KEYS = [] // 保留空数组以防引用错误

// ⭐ 内存缓存：加密存储解密后的激活状态，用于同步读取
let _activationCache = null

// ─── 安全存储工具（延迟加载，避免循环依赖） ───

let _secureItem = null
async function _getSecure() {
  if (!_secureItem) {
    _secureItem = await import('./secure-storage.js')
  }
  return _secureItem
}

// ─── Tauri 桥接 ───

function isTauri() {
  // Tauri v2: window.__TAURI__ 可能不直接暴露，尝试导入 invoke 来判断
  try {
    return typeof window !== 'undefined' &&
      (window.__TAURI__ !== undefined || document.querySelector('meta[name="tauri"]') !== null)
  } catch {
    return false
  }
}

async function tauriInvoke(cmd, args = {}) {
  try {
    const { invoke } = await import('@tauri-apps/api/core')
    return await invoke(cmd, args)
  } catch { return null }
}

// ─── 在线验证 API ───

async function onlineVerify(code) {
  try {
    const res = await fetch(`${WORKER_URL}?action=verify&code=${encodeURIComponent(code)}`, {
      signal: AbortSignal.timeout(5000)
    })
    return await res.json()
  } catch {
    return null // 超时或网络错误 → 走离线回退
  }
}

async function onlineActivate(code, fp) {
  const platform = isTauri() ? 'tauri' : 'web'
  try {
    const res = await fetch(`${WORKER_URL}?action=activate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, fp, platform }),
      signal: AbortSignal.timeout(5000)
    })
    return await res.json()
  } catch {
    return null
  }
}

// ─── 设备指纹 ───

export function getDeviceFingerprint() {
  // 优先使用内存缓存
  if (_activationCache && _activationCache.fp) return _activationCache.fp

  if (isTauri()) {
    const cached = localStorage.getItem(FINGERPRINT_KEY)
    if (cached) return cached
    tauriInvoke('get_hardware_id').then(fp => { if (fp) localStorage.setItem(FINGERPRINT_KEY, fp) })
    return cached || '--------'
  }
  let fp = localStorage.getItem(FINGERPRINT_KEY)
  // 旧版 8 位指纹自动迁移
  if (fp && fp.length < 16) {
    localStorage.removeItem(FINGERPRINT_KEY)
    fp = null
  }
  // 旧版含随机数的指纹自动重新生成（v2 改为确定性算法）
  if (fp && fp.length === 16) {
    // 尝试判断是否为 v2（v2 不包含 Math.random，不会过期）
    const oldCache = localStorage.getItem('_fp_v2_marker')
    if (!oldCache) {
      localStorage.removeItem(FINGERPRINT_KEY)
      localStorage.setItem('_fp_v2_marker', '1')
      fp = null
    }
  }
  if (fp) return fp

  // 确定性熵源（v2）：去掉了 Math.random()，同一台机器永远返回相同指纹
  // navigator.userAgent 虽会随浏览器升级变化，但指纹缓存在 localStorage，
  // 正常情况下不会重新计算。只有清空 localStorage 才会触发重新计算。
  const signals = [
    navigator.userAgent || '',
    navigator.language || '',
    navigator.platform || '',
    screen.width || '',
    screen.height || '',
    screen.colorDepth || '',
    navigator.hardwareConcurrency || '',
    navigator.deviceMemory || '',
    navigator.maxTouchPoints || '',
    new Date().getTimezoneOffset() || '',
  ]
  const seed = 'v2|' + signals.join('|')

  // 双通 DJB2 产生 64 位指纹（16 位 hex）
  let hash1 = 0, hash2 = 0xFFFFFFFF
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i)
    hash1 = ((hash1 << 5) - hash1) + char; hash1 = hash1 & hash1
    const j = seed.length - 1 - i
    hash2 = ((hash2 << 5) - hash2) + seed.charCodeAt(j); hash2 = hash2 & hash2
  }
  const part1 = (Math.abs(hash1) % 0xFFFFFFFF).toString(16).toUpperCase().padStart(8, '0')
  const part2 = (Math.abs(hash2) % 0xFFFFFFFF).toString(16).toUpperCase().padStart(8, '0')
  fp = part1 + part2

  // 写入明文和加密
  localStorage.setItem(FINGERPRINT_KEY, fp)
  localStorage.setItem('_fp_v2_marker', '1')
  _getSecure().then(ss => ss.setItem(FINGERPRINT_KEY, fp)).catch(() => {})
  return fp
}

// ─── 格式 + 校验算法 ───

export function isValidFormat(code) {
  return /^[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}$/.test(code)
}

export function verifyCode(code) {
  if (!isValidFormat(code)) return false
  if (MASTER_KEYS.includes(code)) return true
  const norm = code.replace(/-/g, '').split('')
  let cs = 0
  for (let i = 0; i < 12; i++) cs ^= parseInt(norm[i], 16)
  const exp = cs & 0xFFF
  const act = (parseInt(norm[12], 16) << 8) | (parseInt(norm[13], 16) << 4) | parseInt(norm[14], 16)
  return exp === act
}

// ─── 本地绑定（离线回退用） ───

function bindingKey(code) { return BINDING_PREFIX + code.replace(/-/g, '').slice(0, 8) }

function isCodeBoundToOtherDevice(code, fp) {
  if (MASTER_KEYS.includes(code)) return false
  const bound = localStorage.getItem(bindingKey(code))
  return bound && bound !== fp
}

function bindCode(code, fp) {
  if (!MASTER_KEYS.includes(code)) {
    localStorage.setItem(bindingKey(code), fp)
    // 绑定记录不加密（低敏感度，数量多），仅保留明文
  }
}

function unbindCode(code) {
  if (!MASTER_KEYS.includes(code)) localStorage.removeItem(bindingKey(code))
}

// ─── 激活缓存管理（加密存储 ↔ 明文同步） ───

/**
 * 从加密存储中读取激活数据并恢复到明文 localStorage
 * 在应用启动时调用（MainLayout.vue onMounted）
 */
export async function initActivationCache() {
  try {
    const ss = await _getSecure()
    let [code, fp] = await Promise.all([
      ss.getItem(STORAGE_KEY),
      ss.getItem(FINGERPRINT_KEY),
    ])

    // ⭐ 迁移旧版加密数据：jd_activated 不再由 secure-storage 加密，
    //    但老用户 localStorage 中可能还有 "🔒..." 前缀的旧数据
    if (code && typeof code === 'string' && code.startsWith('🔒')) {
      try {
        await ss.migrateFromSecure()
        code = localStorage.getItem(STORAGE_KEY)
        fp = localStorage.getItem(FINGERPRINT_KEY)
      } catch {
        // 迁移失败，清除旧数据让用户重新激活
        localStorage.removeItem(STORAGE_KEY)
        localStorage.removeItem(FINGERPRINT_KEY)
        code = null
        fp = null
      }
    }

    // 从加密存储恢复明文（如有加密数据而明文不存在/不一致时）
    if (code) {
      const currentPlain = localStorage.getItem(STORAGE_KEY)
      if (currentPlain !== code) localStorage.setItem(STORAGE_KEY, code)
    }
    if (fp) {
      const currentPlain = localStorage.getItem(FINGERPRINT_KEY)
      if (currentPlain !== fp) localStorage.setItem(FINGERPRINT_KEY, fp)
    }

    // 更新内存缓存
    _activationCache = {
      code: code || localStorage.getItem(STORAGE_KEY) || null,
      fp: fp || localStorage.getItem(FINGERPRINT_KEY) || null,
    }

    // Tauri 模式下：如果内存缓存无数据，立即从 Rust 同步
    if (!_activationCache.code) {
      await syncTauriActivation()
    }
  } catch {
    // 加密存储不可用时，使用现有明文
    _activationCache = {
      code: localStorage.getItem(STORAGE_KEY) || null,
      fp: localStorage.getItem(FINGERPRINT_KEY) || null,
    }

    // Tauri 模式下回退：立即从 Rust 同步
    if (!_activationCache.code) {
      await syncTauriActivation().catch(() => {})
    }
  }
}

// ─── 激活管理 ───

export async function initDeviceFingerprint() {
  if (isTauri()) {
    const cached = localStorage.getItem(FINGERPRINT_KEY)
    if (cached) return cached
    const fp = await tauriInvoke('get_hardware_id')
    if (fp) { localStorage.setItem(FINGERPRINT_KEY, fp); return fp }
  }
  return getDeviceFingerprint()
}

export async function activate(code) {
  if (!code || typeof code !== 'string') {
    return { success: false, message: '请输入激活码', block: false }
  }

  const upper = code.toUpperCase()
  if (!isValidFormat(upper)) {
    return { success: false, message: '格式错误，正确格式：XXXX-XXXX-XXXX-XXXX', block: false }
  }

  // ⭐ 客户端先验证校验和，无效码不发给 Worker
  if (!MASTER_KEYS.includes(upper) && !verifyCode(upper)) {
    const trials = parseInt(localStorage.getItem(TRIAL_KEY) || '0') + 1
    localStorage.setItem(TRIAL_KEY, String(trials))
    _getSecure().then(ss => ss.setItem(TRIAL_KEY, String(trials))).catch(() => {})
    if (trials >= 3) return { success: false, message: '❌ 输入错误次数过多，请联系管理员。', block: true }
    return { success: false, message: `❌ 激活码无效，剩余尝试：${3 - trials} 次`, block: false }
  }

  const fp = getDeviceFingerprint()

  // 尝试在线验证（所有验证码统一走 Worker）
  const serverResult = await onlineActivate(upper, fp)
  if (serverResult) {
    if (serverResult.success) {
      // ⭐ 双轨写入：明文 + 加密
      localStorage.setItem(STORAGE_KEY, upper)
      localStorage.removeItem(TRIAL_KEY)
      _getSecure().then(ss => {
        ss.setItem(STORAGE_KEY, upper)
        ss.removeItem(TRIAL_KEY)
      }).catch(() => {})
      if (_activationCache) _activationCache.code = upper
      return { success: true, message: '✅ 激活成功！已绑定本机。', block: false }
    }
    if (serverResult.block) {
      return { success: false, message: '❌ ' + serverResult.message, block: true }
    }
    return { success: false, message: '❌ ' + serverResult.message, block: false }
  }

  // 离线回退（网络不可用时的本地验证）
  if (!verifyCode(upper)) {
    const trials = parseInt(localStorage.getItem(TRIAL_KEY) || '0') + 1
    localStorage.setItem(TRIAL_KEY, String(trials))
    _getSecure().then(ss => ss.setItem(TRIAL_KEY, String(trials))).catch(() => {})
    if (trials >= 3) return { success: false, message: '❌ 输入错误次数过多，请联系管理员。', block: true }
    return { success: false, message: `❌ 激活码无效，剩余尝试：${3 - trials} 次`, block: false }
  }

  if (isCodeBoundToOtherDevice(upper, fp)) {
    return { success: false, message: '❌ 此激活码已被其他设备绑定，无法重复使用。', block: true }
  }

  bindCode(upper, fp)
  // ⭐ 双轨写入
  localStorage.setItem(STORAGE_KEY, upper)
  localStorage.removeItem(TRIAL_KEY)
  _getSecure().then(ss => {
    ss.setItem(STORAGE_KEY, upper)
    ss.removeItem(TRIAL_KEY)
  }).catch(() => {})
  if (_activationCache) _activationCache.code = upper
  return { success: true, message: '✅ 激活成功（离线模式）！已绑定本机。', block: false }
}

export function isActivated() {
  // ⭐ 优先使用内存缓存（加密存储恢复后的结果）
  if (_activationCache) {
    if (_activationCache.code) {
      if (MASTER_KEYS.includes(_activationCache.code)) return true
      if (!verifyCode(_activationCache.code)) return false
      const fp = _activationCache.fp || getDeviceFingerprint()
      if (isCodeBoundToOtherDevice(_activationCache.code, fp)) return false
      return true
    }
    // 内存缓存无激活码，但 Tauri 模式下可能 Rust 端已激活
    // 检查 syncTauriActivation 设置的同步标记
    if (localStorage.getItem('__tauri_activated__') === 'true') {
      const code = localStorage.getItem(STORAGE_KEY)
      if (code) {
        _activationCache.code = code
        if (MASTER_KEYS.includes(code)) return true
        if (!verifyCode(code)) return false
        const fp = _activationCache.fp || getDeviceFingerprint()
        if (isCodeBoundToOtherDevice(code, fp)) return false
        return true
      }
    }
    return false
  }
  // 回退：明文 localStorage（初始加载/缓存未就绪时）
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    // Tauri 模式下检查 Rust 同步标记
    if (localStorage.getItem('__tauri_activated__') === 'true') return true
    return false
  }
  if (MASTER_KEYS.includes(stored)) return true
  if (!verifyCode(stored)) return false
  const fp = getDeviceFingerprint()
  if (isCodeBoundToOtherDevice(stored, fp)) return false
  return true
}

export async function syncTauriActivation() {
  // 不先检查 isTauri()：tauriInvoke 内部已用 try-catch，非 Tauri 环境返回 null
  // 这样可以避免 isTauri 检测不准导致 Rust 端激活数据不同步
  const [activated, code] = await Promise.all([
    tauriInvoke('is_activated'),
    tauriInvoke('get_activation_code'),
  ])

  // 更新同步标记（供 isActivated() 回退检查用）
  const reallyActivated = activated === true || (code !== null && code !== undefined)
  localStorage.setItem('__tauri_activated__', reallyActivated ? 'true' : 'false')

  if (code) {
    localStorage.setItem(STORAGE_KEY, code)
    _getSecure().then(ss => ss.setItem(STORAGE_KEY, code)).catch(() => {})
    if (_activationCache) _activationCache.code = code
  }
}

export function getActivationCode() {
  if (_activationCache && _activationCache.code) return _activationCache.code
  return localStorage.getItem(STORAGE_KEY)
}

export function generateCode(seed = Date.now()) {
  const chars = []
  // 使用密码学安全随机数生成 12 个 nibble
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const bytes = new Uint8Array(6)
    crypto.getRandomValues(bytes)
    for (let i = 0; i < 6; i++) {
      chars.push((bytes[i] >> 4).toString(16).toUpperCase())
      chars.push((bytes[i] & 0x0F).toString(16).toUpperCase())
    }
  } else {
    // 降级：改良 LCG（大初始偏移避免 0000 开头）
    let s = (seed >>> 0) + 0x7FFFFFFF
    for (let i = 0; i < 12; i++) {
      s = ((s * 1103515245 + 12345) >>> 0) & 0x7FFFFFFF
      chars.push((s % 16).toString(16).toUpperCase())
    }
  }
  // XOR 校验和（不变）
  let cs = 0
  for (let i = 0; i < 12; i++) cs ^= parseInt(chars[i], 16)
  chars.push(((cs >> 8) & 0xF).toString(16).toUpperCase())
  chars.push(((cs >> 4) & 0xF).toString(16).toUpperCase())
  chars.push((cs & 0xF).toString(16).toUpperCase())
  // 第16位随机
  const last = typeof crypto !== 'undefined' && crypto.getRandomValues
    ? crypto.getRandomValues(new Uint8Array(1))[0] % 16
    : Math.floor(Math.random() * 16)
  chars.push(last.toString(16).toUpperCase())
  return [chars.slice(0,4).join(''), chars.slice(4,8).join(''), chars.slice(8,12).join(''), chars.slice(12,16).join('')].join('-')
}

export function deactivate() {
  // ⚠️ 不清除绑定记录！防止同一个码在离线模式下重复激活
  // 绑定记录在重新激活前一致保留
  localStorage.removeItem(STORAGE_KEY)
  localStorage.removeItem(TRIAL_KEY)
  localStorage.removeItem('__tauri_activated__')
  // ⭐ 同步清除加密存储
  _getSecure().then(ss => {
    ss.removeItem(STORAGE_KEY)
    ss.removeItem(TRIAL_KEY)
  }).catch(() => {})
  if (_activationCache) { _activationCache.code = null }
  if (isTauri()) tauriInvoke('deactivate')
}
