/**
 * 安全存储工具
 *
 * 对 localStorage 中的敏感数据使用 AES-GCM 加密存储。
 * 密钥基于设备指纹派生，每台设备唯一。
 * 后续 Tauri 阶段将迁移到 Rust 层的 SQLCipher。
 */

import { getDeviceFingerprint } from './activation.js'

// 需要加密的存储键前缀
// ⭐ 激活相关键和教学/场景数据全部加密
// 注意：activation.js 读写使用双轨策略（同步明文+异步加密），见 initActivationCache()
const PROTECTED_PREFIXES = [
  'jd_xp_data',           // XP/等级/成就数据
  'jd_activated',         // 激活码
  'jd_device_fingerprint', // 设备指纹
  'jd_activation_trials', // 尝试次数
  'jd_scenario_data_',    // 场景账套数据（全额/凭证/科目等）
]

// 不加密的存储键
const SKIP_KEYS = []

/**
 * 检查指定 key 是否需要加密
 */
function shouldProtect(key) {
  if (SKIP_KEYS.includes(key)) return false
  return PROTECTED_PREFIXES.some(p => key.startsWith(p))
}

/**
 * 从设备指纹派生加密密钥
 * 使用 PBKDF2 派生固定长度的密钥
 */
async function deriveKey() {
  const fp = getDeviceFingerprint()
  const encoder = new TextEncoder()

  // 使用固定的应用盐值（不含设备指纹，指纹已作密钥材料）
  const salt = encoder.encode('kanshazhe-financial-v3:salt')

  // 导入 PBKDF2 密钥（使用完整指纹，不再截断）
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(fp),
    'PBKDF2',
    false,
    ['deriveKey']
  )

  // 派生 AES-GCM 密钥
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  )
}

/**
 * 加密数据
 */
async function encrypt(plaintext) {
  const key = await deriveKey()
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const encoded = new TextEncoder().encode(plaintext)

  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoded
  )

  // 返回 base64(IV + ciphertext)
  const combined = new Uint8Array(iv.length + ciphertext.byteLength)
  combined.set(iv)
  combined.set(new Uint8Array(ciphertext), iv.length)

  return btoa(String.fromCharCode(...combined))
}

/**
 * 解密数据
 */
async function decrypt(data) {
  try {
    const key = await deriveKey()
    const combined = Uint8Array.from(atob(data), c => c.charCodeAt(0))

    const iv = combined.slice(0, 12)
    const ciphertext = combined.slice(12)

    const plaintext = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      ciphertext
    )

    return new TextDecoder().decode(plaintext)
  } catch {
    return null // 解密失败返回 null
  }
}

/**
 * 安全版 setItem：自动加密需要保护的数据
 */
export async function setItem(key, value) {
  if (shouldProtect(key)) {
    try {
      const encrypted = await encrypt(String(value))
      localStorage.setItem(key, '🔒' + encrypted)
    } catch (e) {
      // 加密失败则回退到明文存储
      console.warn('[SecureStorage] 加密失败，回退明文:', key)
      localStorage.setItem(key, value)
    }
  } else {
    localStorage.setItem(key, value)
  }
}

/**
 * 安全版 getItem：自动解密已加密的数据
 */
export async function getItem(key) {
  const raw = localStorage.getItem(key)
  if (raw === null) return null

  if (raw.startsWith('🔒')) {
    // 已加密，需要解密
    const encrypted = raw.slice(1)
    const decrypted = await decrypt(encrypted)
    if (decrypted !== null) return decrypted
    // 解密失败，尝试返回原始值
    return raw
  }

  return raw
}

/**
 * 移除项
 */
export function removeItem(key) {
  localStorage.removeItem(key)
}

/**
 * 加密存储中所有受保护的数据
 * 用于将明文数据迁移为密文
 * ⚠️ 当前版本禁用——改用 migrateFromSecure 反向迁移
 */
export async function migrateToSecure() {
  // 已禁用：所有 PROTECTED_PREFIXES 已清空
}

/**
 * 反向迁移：将已加密的数据解密回明文
 * 用于修复 JD-065 版本中加密导致的数据不可读问题
 */
export async function migrateFromSecure() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    const value = localStorage.getItem(key)
    if (value && value.startsWith('🔒')) {
      const encrypted = value.slice(1)
      const decrypted = await decrypt(encrypted)
      if (decrypted !== null) {
        localStorage.setItem(key, decrypted)
        console.log('[SecureStorage] 已解密:', key)
      } else {
        // 解密失败，保留原值（可能是 jsdom 环境等）
        console.warn('[SecureStorage] 解密失败，保留原值:', key)
      }
    }
  }
}
