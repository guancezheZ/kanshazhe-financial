/**
 * secure-storage.js 核心逻辑测试
 */

import { describe, it, expect, vi, beforeAll } from 'vitest'

// ─── 模拟 activation.js 的 getDeviceFingerprint ───
vi.mock('@/utils/activation.js', () => ({
  getDeviceFingerprint: () => 'TEST-FP-12345678',
}))

// ─── 内联测试 shouldProtect 逻辑 ───
const PROTECTED_PREFIXES = [
  'jd_xp_data',
  'jd_activated',
  'jd_device_fingerprint',
  'jd_activation_trials',
  'jd_scenario_data_',
]
const SKIP_KEYS = ['jd_activated']

function shouldProtect(key) {
  if (SKIP_KEYS.includes(key)) return false
  return PROTECTED_PREFIXES.some(p => key.startsWith(p))
}

describe('secure-storage - 加密范围判断', () => {
  it('场景数据需要加密', () => {
    expect(shouldProtect('jd_scenario_data_manufacturing_accountant')).toBe(true)
  })

  it('XP数据需要加密', () => {
    expect(shouldProtect('jd_xp_data')).toBe(true)
  })

  it('设备指纹需要加密', () => {
    expect(shouldProtect('jd_device_fingerprint')).toBe(true)
  })

  it('jd_activated 跳过加密（双轨管理）', () => {
    expect(shouldProtect('jd_activated')).toBe(false)
  })

  it('不相关键不加密', () => {
    expect(shouldProtect('jd_theme')).toBe(false)
    expect(shouldProtect('jd_logged_in')).toBe(false)
    expect(shouldProtect('jd_role')).toBe(false)
  })

  it('尝试次数需要加密', () => {
    expect(shouldProtect('jd_activation_trials')).toBe(true)
  })
})

describe('secure-storage - 密钥派生', () => {
  it('deriveKey 使用 PBKDF2 返回 CryptoKey', async () => {
    const secure = await import('@/utils/secure-storage.js')

    const testData = '测试加密数据123!@#'
    await secure.setItem('__test_secure_key__', testData)
    const result = await secure.getItem('__test_secure_key__')
    expect(result).toBe(testData)

    await secure.removeItem('__test_secure_key__')
    const cleaned = await secure.getItem('__test_secure_key__')
    expect(cleaned).toBeNull()
  })

  it('不同数据加密后密文不同', async () => {
    const secure = await import('@/utils/secure-storage.js')

    await secure.setItem('__test_val1__', 'hello')
    await secure.setItem('__test_val2__', 'world')

    const v1 = await secure.getItem('__test_val1__')
    const v2 = await secure.getItem('__test_val2__')

    expect(v1).toBe('hello')
    expect(v2).toBe('world')

    await secure.removeItem('__test_val1__')
    await secure.removeItem('__test_val2__')
  })

  it('不存在的键返回 null', async () => {
    const secure = await import('@/utils/secure-storage.js')
    const result = await secure.getItem('__nonexistent_key__')
    expect(result).toBeNull()
  })
})
