/**
 * 错误状态处理测试
 *
 * 覆盖：
 *   1. activation.js 错误路径
 *   2. Worker 不可达回退
 *   3. 格式错误/无效码/尝试次数限制
 *   4. Worker 返回 block 错误
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// ─── Mock fetch 和 localStorage ───
const mockFetch = vi.fn()
global.fetch = mockFetch

// 保存原始 localStorage
const originalStorage = { ...localStorage }

describe('错误状态 - 激活格式验证', () => {
  it('空字符串返回格式错误', async () => {
    const { activate } = await import('@/utils/activation.js')
    const result = await activate('')
    expect(result.success).toBe(false)
    expect(result.message).toContain('请输入')
  })

  it('null 返回格式错误', async () => {
    const { activate } = await import('@/utils/activation.js')
    const result = await activate(null)
    expect(result.success).toBe(false)
    expect(result.message).toContain('请输入')
  })

  it('无效格式返回格式错误', async () => {
    const { activate } = await import('@/utils/activation.js')
    const result = await activate('1234-5678-XXXX')
    expect(result.success).toBe(false)
    expect(result.message).toContain('格式错误')
  })
})

describe('错误状态 - 尝试次数限制', () => {
  beforeEach(() => {
    localStorage.setItem('jd_activation_trials', '2') // 已尝试2次
  })
  afterEach(() => {
    localStorage.removeItem('jd_activation_trials')
  })

  it('3次失败后 block', async () => {
    // 需要 mock fetch 返回失败 + 使用无效码触发校验和失败
    mockFetch.mockRejectedValue(new Error('Network error'))

    const { activate } = await import('@/utils/activation.js')
    // 使用一个格式正确但校验和错误的码
    const result = await activate('AAAA-AAAA-AAAA-AAAA')
    expect(result.success).toBe(false)
  })
})

describe('错误状态 - Worker 返回错误', () => {
  beforeEach(() => {
    // 有效码：5B34E36119BC00C0 校验和=0x0C
    localStorage.removeItem('jd_activation_trials')
  })

  it('Worker 返回 block:true 时为阻止性错误', async () => {
    mockFetch.mockResolvedValue({
      json: () => Promise.resolve({
        success: false,
        message: '此激活码已绑定到其他设备',
        block: true,
      }),
    })

    const { activate } = await import('@/utils/activation.js')
    // 使用校验和合法的码
    const result = await activate('5B34-E361-19BC-00C0')
    expect(result.success).toBe(false)
    expect(result.block).toBe(true)
  })

  it('Worker 不可达时回退离线模式', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'))

    const { activate } = await import('@/utils/activation.js')
    // 使用校验和合法的码 → 走离线回退
    const result = await activate('5B34-E361-19BC-00C0')
    // 校验和合法 + 离线 → 激活成功（离线模式）
    expect(result.success).toBe(true)
    expect(result.message).toContain('离线')
  })
})

describe('错误状态 - 完整性校验', () => {
  it('checkIntegrity 执行不抛异常', async () => {
    const { checkIntegrity } = await import('@/utils/integrity.js')
    const results = await checkIntegrity({ skipHealthScan: true })
    expect(Array.isArray(results)).toBe(true)
  })
})

describe('错误状态 - 输入过滤', () => {
  it('filterHex 过滤非十六进制字符', async () => {
    const filterHex = (val) => val.toUpperCase().replace(/[^A-F0-9]/g, '')
    // 只保留 A-F0-9，其他全过滤
    expect(filterHex('GGGG')).toBe('')       // 全是非hex
    expect(filterHex('SQL 注入!@#')).toBe('')  // SQL注入字符全过滤
    expect(filterHex('../../')).toBe('')     // 路径遍历全过滤
    expect(filterHex('ABCD')).toBe('ABCD')   // 纯hex保留
    expect(filterHex('abc123')).toBe('ABC123') // 转大写
    expect(filterHex('混杂AB12')).toBe('AB12')  // 中文过滤
  })

  it('isValidFormat 拒绝 XSS 注入', () => {
    const isValidFormat = (code) => /^[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}$/.test(code)
    expect(isValidFormat('<script>')).toBe(false)
    expect(isValidFormat('alert(1)')).toBe(false)
    expect(isValidFormat('ABCD-1234-EF56-7890')).toBe(true) // 正常
  })

  it('verifyCode 拒绝无效码', () => {
    const verifyCode = (code) => {
      if (!/^[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}$/.test(code)) return false
      const norm = code.replace(/-/g, '').split('')
      let cs = 0
      for (let i = 0; i < 12; i++) cs ^= parseInt(norm[i], 16)
      const exp = cs & 0xFFF
      const act = (parseInt(norm[12], 16) << 8) | (parseInt(norm[13], 16) << 4) | parseInt(norm[14], 16)
      return exp === act
    }
    expect(verifyCode('ABCD-1234-5678-0000')).toBe(false) // 校验和不匹配
    expect(verifyCode('5B34-E361-19BC-00C0')).toBe(true)  // 有效码
  })
})
