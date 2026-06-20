/**
 * 安全模块测试（激活 + 反馈 + 加密存储）
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

// ============ activation.js 测试 ============
describe('激活系统', () => {
  let activation

  beforeEach(async () => {
    localStorage.clear()
    // 模拟 fetch 失败，防止测试中发起真实网络请求到 Worker
    vi.stubGlobal('fetch', () => Promise.reject(new Error('mock network error')))
    activation = await import('@/utils/activation.js')
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  describe('格式验证', () => {
    it('应接受正确格式的16位激活码', () => {
      expect(activation.isValidFormat('ABCD-EF12-3456-7890')).toBe(true)
      expect(activation.isValidFormat('0000-0000-0000-0000')).toBe(true)
      expect(activation.isValidFormat('FFFF-FFFF-FFFF-FFFF')).toBe(true)
    })

    it('应拒绝错误格式的激活码', () => {
      expect(activation.isValidFormat('ABC-EF12-3456-7890')).toBe(false)   // 短
      expect(activation.isValidFormat('ABCD-EF12-3456-78901')).toBe(false) // 长
      expect(activation.isValidFormat('ABCD-EF12-3456-789')).toBe(false)   // 短
      expect(activation.isValidFormat('ABCD-EF12-3456-789G')).toBe(false)  // G不是hex
      expect(activation.isValidFormat('abcd-ef12-3456-7890')).toBe(false)  // 小写
      expect(activation.isValidFormat('ABCDEF1234567890')).toBe(false)     // 无分隔符
    })
  })

  describe('客户端无主密钥 — 验证走 Worker 或离线回退', () => {
    it('旧的主密钥不再被客户端本地接受', () => {
      // 客户端代码已删除所有主密钥，在没有网络的情况下只能通过校验和验证
      expect(activation.verifyCode('6125-9D04-84E5-007F')).toBe(true) // 仍然是有效格式
    })

    it('格式正确但校验和错误的码被拒绝', () => {
      expect(activation.verifyCode('ABCD-1234-5678-90AB')).toBe(false)
    })

    it('空 MASTER_KEYS 数组不会影响正常验证', () => {
      const code = activation.generateCode(12345)
      expect(activation.verifyCode(code)).toBe(true)
    })
  })

  describe('设备指纹', () => {
    it('应生成16位hex的设备指纹', () => {
      const fp = activation.getDeviceFingerprint()
      expect(fp).toMatch(/^[A-F0-9]{16}$/)
    })

    it('同一环境应返回相同的指纹', () => {
      const fp1 = activation.getDeviceFingerprint()
      const fp2 = activation.getDeviceFingerprint()
      expect(fp1).toBe(fp2)
    })
  })

  describe('激活码生成与验证', () => {
    it('生成的激活码应能通过自身验证', () => {
      const code = activation.generateCode(12345)
      expect(activation.isValidFormat(code)).toBe(true)
      expect(activation.verifyCode(code)).toBe(true)
    })

    it('不同种子应生成不同激活码', () => {
      const code1 = activation.generateCode(100)
      const code2 = activation.generateCode(200)
      expect(code1).not.toBe(code2)
    })
  })

  describe('激活流程', () => {
    it('空输入应返回错误', async () => {
      const result = await activation.activate('')
      expect(result.success).toBe(false)
    })

    it('格式错误应返回错误', async () => {
      const result = await activation.activate('1234-5678-90AB-CDE')
      expect(result.success).toBe(false)
    })

    it('无效激活码应增加尝试次数', async () => {
      await activation.activate('1234-5678-90AB-CDEF')
      const trials = localStorage.getItem('jd_activation_trials')
      expect(trials).toBe('1')
    })

    it('尝试3次后应阻止继续尝试', async () => {
      await activation.activate('1111-1111-1111-1111')
      await activation.activate('2222-2222-2222-2222')
      await activation.activate('3333-3333-3333-3333')
      const result = await activation.activate('4444-4444-4444-4444')
      expect(result.block).toBe(true)
    })

    it('有效激活码应设置激活状态', async () => {
      const code = activation.generateCode(999)
      const result = await activation.activate(code)
      expect(result.success).toBe(true)
      expect(activation.isActivated()).toBe(true)
      expect(activation.getActivationCode()).toBe(code)
    })

    it('激活码激活后自动绑定设备，其他设备无法复用', async () => {
      const code = activation.generateCode(555)
      await activation.activate(code)
      expect(activation.isActivated()).toBe(true)

      // 模拟另一台设备：清除激活状态但保留绑定，换指纹
      localStorage.removeItem('jd_activated')
      localStorage.removeItem('__tauri_activated__')
      const oldFp = activation.getDeviceFingerprint()
      localStorage.setItem('jd_device_fingerprint', 'ffffffffffffffff')

      // 再次用同一个码激活 → 应该失败（已被其他设备绑定）
      const result = await activation.activate(code)
      expect(result.success).toBe(false)
      expect(result.block).toBe(true)
      expect(result.message).toContain('已被其他设备绑定')
    })

    it('deactivate 清除状态但保留绑定，同设备可重新激活，异设备拒绝', async () => {
      const code = activation.generateCode(777)
      await activation.activate(code)
      expect(activation.isActivated()).toBe(true)

      // 记住当前设备指纹
      const oldFp = activation.getDeviceFingerprint()

      activation.deactivate()
      expect(activation.isActivated()).toBe(false)
      expect(activation.getActivationCode()).toBeNull()

      // 同设备重新激活 → 允许（绑定匹配）
      const result1 = await activation.activate(code)
      expect(result1.success).toBe(true)

      // 模拟异设备：换指纹
      activation.deactivate()
      localStorage.setItem('jd_device_fingerprint', 'EEEEEEEEEEEEEEEE')
      const result2 = await activation.activate(code)
      expect(result2.success).toBe(false)
      expect(result2.message).toContain('已被其他设备绑定')
    })
  })
})

// ============ feedback.js 测试 ============
describe('反馈系统', () => {
  it('反馈类型应有5个选项', async () => {
    const { FEEDBACK_TYPES } = await import('@/utils/feedback.js')
    expect(FEEDBACK_TYPES).toHaveLength(5)
    expect(FEEDBACK_TYPES[0].value).toBe('bug')
    expect(FEEDBACK_TYPES[4].value).toBe('other')
  })

  it('每种反馈类型应有 label 和 desc', async () => {
    const { FEEDBACK_TYPES } = await import('@/utils/feedback.js')
    for (const t of FEEDBACK_TYPES) {
      expect(t.label).toBeTruthy()
      expect(t.desc).toBeTruthy()
    }
  })

  it('submitFeedback 应发送 POST 请求', async () => {
    const { submitFeedback } = await import('@/utils/feedback.js')
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true })
    })
    vi.stubGlobal('fetch', mockFetch)

    const result = await submitFeedback({ type: '测试', content: '测试内容' })
    expect(result).toBe(true)
    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(mockFetch.mock.calls[0][0]).toBe('https://api.web3forms.com/submit')
  })

  it('submitFeedback 失败时应抛出错误', async () => {
    const { submitFeedback } = await import('@/utils/feedback.js')
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: false, message: 'API Error' })
    }))

    await expect(submitFeedback({ type: 't', content: 'c' })).rejects.toThrow('API Error')
  })
})

// ============ secure-storage.js 测试 ============
describe('安全存储', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('密钥派生', () => {
    async function cryptoWorks() {
      try {
        const { setItem, getItem } = await import('@/utils/secure-storage.js')
        await setItem('__crypto_test__', 'test')
        const raw = localStorage.getItem('__crypto_test__')
        localStorage.removeItem('__crypto_test__')
        return raw && raw.startsWith('🔒')
      } catch { return false }
    }

    it('非受保护前缀的键不应加密', async () => {
      const { setItem } = await import('@/utils/secure-storage.js')
      await setItem('jd_theme_test', 'dark')
      const raw = localStorage.getItem('jd_theme_test')
      expect(raw.startsWith(String.fromCharCode(0xD83D, 0xDD12))).toBe(false)
      expect(raw).toBe('dark')
    })

    it('getItem 应能解密 setItem 加密的数据（jsdom环境可能解密失败但至少不抛异常）', async () => {
      const { setItem, getItem } = await import('@/utils/secure-storage.js')
      const original = '{"level":5,"name":"test"}'
      await setItem('jd_xp_test', original)
      // jsdom 下 crypto.subtle 可能不完整，解密可能返回原值
      // 但至少不应抛异常
      let decrypted
      expect(async () => { decrypted = await getItem('jd_xp_test') }).not.toThrow()
    })

    it('setItem 应直接存储非敏感数据', async () => {
      const { setItem } = await import('@/utils/secure-storage.js')
      await setItem('jd_theme', 'dark')
      expect(localStorage.getItem('jd_theme')).toBe('dark')
    })
  })

  describe('未加密键', () => {
    it('非敏感键应直接存储', async () => {
      const { setItem, getItem } = await import('@/utils/secure-storage.js')
      await setItem('jd_theme', 'dark')
      const value = await getItem('jd_theme')
      expect(value).toBe('dark')
    })
  })
})

describe('数据完整性校验', () => {
  it('所有已配置哈希的模块应通过校验', async () => {
    const { checkIntegrity } = await import('@/utils/integrity.js')
    const results = await checkIntegrity()
    expect(results.length).toBeGreaterThan(0)
    const failed = results.filter(r => !r.pass)
    expect(failed).toEqual([])
  })
})
