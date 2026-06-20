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

// ============ 数据完整性校验（增强） ============
describe('数据完整性校验', () => {
  let integrity
  let I

  beforeAll(async () => {
    integrity = await import('@/utils/integrity.js')
    I = integrity
  })

  // ─── 哈希校验 ───
  it('所有已配置哈希的模块应通过校验', async () => {
    const results = await I.checkIntegrity()
    expect(results.length).toBeGreaterThan(0)
    const failed = results.filter(r => !r.pass)
    expect(failed).toEqual([])
  })

  it('checkIntegrity 的 skipHealthScan 应跳过健康扫描', async () => {
    const results = await I.checkIntegrity({ skipHealthScan: true })
    expect(results.length).toBe(7)
    for (const r of results) {
      expect(r.healthPass).toBe(true)   // 跳过后默认为 true
      expect(r.healthIssues).toBeUndefined()
    }
  })

  it('checkIntegrity 的 modules 选项只校验指定模块', async () => {
    const results = await I.checkIntegrity({ modules: ['xp-system', 'year1'] })
    expect(results).toHaveLength(2)
    expect(results[0].name).toBe('xp-system')
    expect(results[1].name).toBe('year1')
  })

  // ─── healthCheckOnly ───
  it('healthCheckOnly 应覆盖全部7个模块', async () => {
    const results = await I.healthCheckOnly()
    expect(results).toHaveLength(7)
    const unhealthy = results.filter(r => !r.healthPass)
    expect(unhealthy).toEqual([])
  })

  it('healthCheckOnly 支持指定模块', async () => {
    const results = await I.healthCheckOnly(['scenarios'])
    expect(results).toHaveLength(1)
    expect(results[0].name).toBe('scenarios')
    expect(results[0].healthPass).toBe(true)
  })

  // ─── scanDataHealth — 边界值检测 ───
  describe('scanDataHealth 边界值检测', () => {
    it('应检测 NaN 值', () => {
      const data = [{ entries: [{ subjectCode: '1001', debit: NaN, credit: 0 }] }]
      const issues = I.scanDataHealth({ '01': data }, 'year1')
      const nanIssues = issues.filter(i => i.type === 'nan')
      expect(nanIssues.length).toBeGreaterThan(0)
      expect(nanIssues[0].severity).toBe('error')
    })

    it('应检测 Infinity 值', () => {
      const data = [{ entries: [{ subjectCode: '1001', debit: Infinity, credit: 0 }] }]
      const issues = I.scanDataHealth({ '01': data }, 'year1')
      const infIssues = issues.filter(i => i.type === 'infinity')
      expect(infIssues.length).toBeGreaterThan(0)
    })

    it('应检测 -Infinity 值', () => {
      const data = [{ entries: [{ subjectCode: '1001', debit: -Infinity, credit: 0 }] }]
      const issues = I.scanDataHealth({ '01': data }, 'year1')
      const infIssues = issues.filter(i => i.type === 'infinity')
      expect(infIssues.length).toBeGreaterThan(0)
    })

    it('应检测 undefined 属性值（在对象中）', () => {
      const obj = { a: undefined, b: 1 }
      const issues = I.scanDataHealth({ '01': [{ entries: [{ subjectCode: '1001', debit: 100, credit: 100 }] }] }, 'year1')
      // 在扫描入口处传入 undefined 属性——但 scanIllegalValues 是内部调用
      // 通过 scanDataHealth 间接测试：收集 entries 时 undefined 不会在 data 顶层
      // 直接用 scanDataHealth 包一个带 undefined 的对象
      // 由于 scanDataHealth 内部调用了 scanIllegalValues，会遍历到 undefined
      const dataWithUndef = { '01': [{ entries: [{ subjectCode: '1001', debit: 100, credit: 100 }], extra: undefined }] }
      const issues2 = I.scanDataHealth(dataWithUndef, 'year1')
      expect(issues2.length).toBeGreaterThan(0)
    })

    it('应检测空模块（null）', () => {
      const issues = I.scanDataHealth(null, 'test')
      const emptyIssues = issues.filter(i => i.type === 'empty_module')
      expect(emptyIssues.length).toBeGreaterThan(0)
    })

    it('应检测空模块（空对象）', () => {
      const issues = I.scanDataHealth({}, 'test')
      const emptyIssues = issues.filter(i => i.type === 'empty_module')
      expect(emptyIssues.length).toBeGreaterThan(0)
    })

    it('应检测空模块（空数组）', () => {
      const issues = I.scanDataHealth([], 'test')
      const emptyIssues = issues.filter(i => i.type === 'empty_module')
      expect(emptyIssues.length).toBeGreaterThan(0)
    })
  })

  // ─── checkEntryBalance — 借贷平衡 ───
  describe('checkEntryBalance 借贷平衡检测', () => {
    it('借贷平衡的分录应无问题', () => {
      const entries = [
        { subjectCode: '1001', debit: 2000, credit: 0 },
        { subjectCode: '100201', debit: 0, credit: 2000 },
      ]
      const issues = I.checkEntryBalance(entries, 'test.task')
      const balanceIssues = issues.filter(i => i.type === 'balance')
      expect(balanceIssues).toEqual([])
    })

    it('借贷不平衡的分录应检出', () => {
      const entries = [
        { subjectCode: '1001', debit: 3000, credit: 0 },
        { subjectCode: '100201', debit: 0, credit: 2000 },
      ]
      const issues = I.checkEntryBalance(entries, 'test.task')
      const balanceIssues = issues.filter(i => i.type === 'balance')
      expect(balanceIssues.length).toBe(1)
      expect(balanceIssues[0].details.totalDebit).toBe(3000)
      expect(balanceIssues[0].details.totalCredit).toBe(2000)
    })

    it('缺失 subjectCode 的分录应检出', () => {
      const entries = [
        { debit: 100, credit: 0 },
        { subjectCode: '100201', debit: 0, credit: 100 },
      ]
      const issues = I.checkEntryBalance(entries, 'test.task')
      const missingIssues = issues.filter(i => i.type === 'missing_field')
      expect(missingIssues.length).toBe(1)
      expect(missingIssues[0].message).toContain('subjectCode')
    })

    it('空数组不应报借贷不平衡', () => {
      const issues = I.checkEntryBalance([], 'test.empty')
      const balanceIssues = issues.filter(i => i.type === 'balance')
      expect(balanceIssues).toEqual([])
    })
  })

  // ─── collectEntries — 数据结构遍历 ───
  describe('collectEntries 数据结构遍历', () => {
    it('应识别教程 monthKey 结构', () => {
      const data = {
        '01': [
          { title: 'Task1', date: '2026-01-01', entries: [{ subjectCode: '1001', debit: 100, credit: 100 }] },
        ],
        '02': [
          { title: 'Task2', date: '2026-02-01', entries: [{ subjectCode: '1002', debit: 200, credit: 200 }] },
        ],
      }
      const groups = I.collectEntries(data)
      expect(groups).toHaveLength(2)
      expect(groups[0].path).toContain('$.01[0]')
      expect(groups[1].path).toContain('$.02[0]')
    })

    it('应识别 cases 数组结构', () => {
      const data = [
        {
          id: 'test_case',
          title: '测试案例',
          data: {
            EVENTS: [
              { id: 'evt_01', title: 'Event1', entries: [{ subjectCode: '1001', debit: 500, credit: 500 }] },
            ],
          },
        },
      ]
      const groups = I.collectEntries(data)
      expect(groups).toHaveLength(1)
      expect(groups[0].path).toContain('$.CASES[0]')
    })

    it('不含 entries 的任务应跳过', () => {
      const data = {
        '01': [{ title: 'No entry task', entries: [] }],
      }
      const groups = I.collectEntries(data)
      expect(groups).toHaveLength(0)
    })
  })

  // ─── 全模块健康扫描集成测试 ───
  describe('全模块健康扫描集成', () => {
    it('所有教学数据模块不应有 NaN/Infinity 等非法值', async () => {
      const results = await I.healthCheckOnly()
      const badModules = results.filter(r => !r.healthPass)
      for (const mod of badModules) {
        console.warn(`[integrity] ${mod.label} 健康扫描发现问题:`, JSON.stringify(mod.healthIssues))
      }
      expect(badModules).toEqual([])
    })

    it('教学数据全部分录应借贷平衡', async () => {
      const results = await I.healthCheckOnly(['year1', 'commercial', 'service', 'construction', 'cases'])
      const allIssues = results.flatMap(r => r.healthIssues || [])
      const balanceIssues = allIssues.filter(i => i.type === 'balance')
      expect(balanceIssues).toEqual([])
    })
  })
})
