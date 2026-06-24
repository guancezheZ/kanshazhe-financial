import { describe, it, expect, beforeEach } from 'vitest'
import { useStore } from '@/stores/store.js'

// 每次测试前重置 store 状态
function resetStore() {
  // 清除 localStorage
  localStorage.clear()
  // 重新加载 store（模块内部会重新初始化）
  const store = useStore()
  store.resetToDefaults()
  return store
}

describe('Store - 初始化', () => {
  it('默认有 80+ 个科目', () => {
    const store = resetStore()
    expect(store.state.subjects.length).toBeGreaterThanOrEqual(80)
  })

  it('默认有一个账套', () => {
    const store = resetStore()
    expect(store.state.accounts.length).toBe(1)
    expect(store.state.accounts[0].name).toBe('默认账套')
  })

  it('默认凭证列表为空', () => {
    const store = resetStore()
    expect(store.state.vouchers.length).toBe(0)
  })

  it('getSubjectTree 返回树形结构', () => {
    const store = resetStore()
    const tree = store.getSubjectTree()
    expect(Array.isArray(tree)).toBe(true)
    expect(tree.length).toBeGreaterThan(0)
    // 顶级科目应有 children 字段
    expect(tree[0]).toHaveProperty('children')
  })
})

describe('Store - 科目操作', () => {
  let store
  beforeEach(() => {
    store = resetStore()
  })

  it('新增一级科目', () => {
    const result = store.addSubject({ name: '测试科目', type: 'asset' })
    expect(result).toHaveProperty('id')
    expect(result.code).toBeTruthy()
    expect(result.name).toBe('测试科目')
    expect(store.state.subjects.length).toBeGreaterThanOrEqual(81)
  })

  it('新增子科目', () => {
    // 找一个末级父科目
    const parent = store.state.subjects.find(s => s.code === '1001')
    const result = store.addSubject({ name: '现金子科目', type: 'asset', parentId: parent.id })
    expect(result).toHaveProperty('id')
    expect(result.parentId).toBe(parent.id)
    // 父科目不再标记为末级
    const updatedParent = store.state.subjects.find(s => s.id === parent.id)
    expect(updatedParent.isLeaf).toBe(false)
  })

  it('更新科目', () => {
    const target = store.state.subjects.find(s => s.code === '1001')
    const updated = store.updateSubject(target.id, { name: '库存现金(更新)' })
    expect(updated.name).toBe('库存现金(更新)')
  })

  it('删除末级科目', () => {
    // 添加一个临时科目再删除
    const sub = store.addSubject({ name: '待删除科目', type: 'asset' })
    const result = store.deleteSubject(sub.id)
    expect(result.success).toBe(true)
    expect(store.state.subjects.find(s => s.id === sub.id)).toBeUndefined()
  })

  it('删除非末级科目失败', () => {
    // 1002 银行存款有子科目，不能删
    const target = store.state.subjects.find(s => s.code === '1002')
    const result = store.deleteSubject(target.id)
    expect(result.success).toBe(false)
    expect(result.error).toContain('子科目')
  })

  it('删除被凭证引用的科目失败', () => {
    // 先创建一个凭证引用科目
    const subject = store.state.subjects.find(s => s.code === '1001')
    store.addVoucher({
      date: '2025-06-01',
      entries: [
        { subjectId: subject.id, subjectCode: subject.code, subjectName: subject.name, debit: 100, credit: 0 },
        { subjectId: store.state.subjects.find(s => s.code === '2001').id, subjectCode: '2001', subjectName: '短期借款', debit: 0, credit: 100 },
      ],
    })
    const result = store.deleteSubject(subject.id)
    expect(result.success).toBe(false)
    expect(result.error).toContain('引用')
  })
})

describe('Store - 凭证操作', () => {
  let store
  beforeEach(() => {
    store = resetStore()
  })

  it('创建有效凭证', () => {
    const subject1 = store.state.subjects.find(s => s.code === '1001')
    const subject2 = store.state.subjects.find(s => s.code === '2001')

    const result = store.addVoucher({
      date: '2025-06-01',
      entries: [
        { subjectId: subject1.id, subjectCode: subject1.code, subjectName: subject1.name, debit: 1000, credit: 0 },
        { subjectId: subject2.id, subjectCode: subject2.code, subjectName: subject2.name, debit: 0, credit: 1000 },
      ],
    })

    expect(result.success).toBe(true)
    expect(result.voucher).toHaveProperty('voucherNo')
    expect(result.voucher.voucherNo).toContain('记-')
    expect(result.voucher.status).toBe('draft')
    expect(store.state.vouchers.length).toBe(1)
  })

  it('借贷不平的凭证创建失败', () => {
    const subject1 = store.state.subjects.find(s => s.code === '1001')
    const subject2 = store.state.subjects.find(s => s.code === '2001')

    const result = store.addVoucher({
      date: '2025-06-01',
      entries: [
        { subjectId: subject1.id, subjectCode: subject1.code, subjectName: subject1.name, debit: 1000, credit: 0 },
        { subjectId: subject2.id, subjectCode: subject2.code, subjectName: subject2.name, debit: 0, credit: 500 },
      ],
    })

    expect(result.success).toBe(false)
    expect(result.errors.length).toBeGreaterThan(0)
  })

  it('分录为空的凭证创建失败', () => {
    const result = store.addVoucher({ date: '2025-06-01', entries: [] })
    expect(result.success).toBe(false)
  })

  it('凭证号自动递增', () => {
    const subject1 = store.state.subjects.find(s => s.code === '1001')
    const subject2 = store.state.subjects.find(s => s.code === '2001')
    const makeEntry = () => [
      { subjectId: subject1.id, subjectCode: subject1.code, subjectName: subject1.name, debit: 100, credit: 0 },
      { subjectId: subject2.id, subjectCode: subject2.code, subjectName: subject2.name, debit: 0, credit: 100 },
    ]

    const v1 = store.addVoucher({ date: '2025-06-01', period: '202506', entries: makeEntry() })
    const v2 = store.addVoucher({ date: '2025-06-01', period: '202506', entries: makeEntry() })
    const v3 = store.addVoucher({ date: '2025-07-01', period: '202507', entries: makeEntry() })

    expect(v1.voucher.voucherNo).toContain('0001')
    expect(v2.voucher.voucherNo).toContain('0002')
    expect(v3.voucher.voucherNo).toContain('0001')
  })

  it('更新草稿凭证', () => {
    const s1 = store.state.subjects.find(s => s.code === '1001')
    const s2 = store.state.subjects.find(s => s.code === '2001')
    const result = store.addVoucher({
      date: '2025-06-01',
      entries: [
        { subjectId: s1.id, subjectCode: s1.code, subjectName: s1.name, debit: 500, credit: 0 },
        { subjectId: s2.id, subjectCode: s2.code, subjectName: s2.name, debit: 0, credit: 500 },
      ],
    })
    const updated = store.updateVoucher(result.voucher.id, { date: '2025-06-15' })
    expect(updated.success).toBe(true)
    expect(updated.voucher.date).toBe('2025-06-15')
  })

  it('更新已审核凭证失败', () => {
    const s1 = store.state.subjects.find(s => s.code === '1001')
    const s2 = store.state.subjects.find(s => s.code === '2001')
    const result = store.addVoucher({
      date: '2025-06-01',
      entries: [
        { subjectId: s1.id, subjectCode: s1.code, subjectName: s1.name, debit: 500, credit: 0 },
        { subjectId: s2.id, subjectCode: s2.code, subjectName: s2.name, debit: 0, credit: 500 },
      ],
    })
    store.approveVoucher(result.voucher.id)
    const updated = store.updateVoucher(result.voucher.id, { date: '2025-07-01' })
    expect(updated.success).toBe(false)
  })

  it('删除草稿凭证', () => {
    const s1 = store.state.subjects.find(s => s.code === '1001')
    const s2 = store.state.subjects.find(s => s.code === '2001')
    const result = store.addVoucher({
      date: '2025-06-01',
      entries: [
        { subjectId: s1.id, subjectCode: s1.code, subjectName: s1.name, debit: 500, credit: 0 },
        { subjectId: s2.id, subjectCode: s2.code, subjectName: s2.name, debit: 0, credit: 500 },
      ],
    })
    const delResult = store.deleteVoucher(result.voucher.id)
    expect(delResult.success).toBe(true)
    expect(store.state.vouchers.length).toBe(0)
  })

  it('凭证号唯一', () => {
    const s1 = store.state.subjects.find(s => s.code === '1001')
    const s2 = store.state.subjects.find(s => s.code === '2001')
    const makeEntry = () => [
      { subjectId: s1.id, subjectCode: s1.code, subjectName: s1.name, debit: 100, credit: 0 },
      { subjectId: s2.id, subjectCode: s2.code, subjectName: s2.name, debit: 0, credit: 100 },
    ]
    const v1 = store.addVoucher({ date: '2025-06-01', entries: makeEntry() })
    const v2 = store.addVoucher({ date: '2025-06-01', entries: makeEntry() })
    expect(v1.voucher.voucherNo).not.toBe(v2.voucher.voucherNo)
  })
})

describe('Store - 凭证生命周期', () => {
  let store, voucherId
  beforeEach(() => {
    store = resetStore()
    const s1 = store.state.subjects.find(s => s.code === '1001')
    const s2 = store.state.subjects.find(s => s.code === '2001')
    const result = store.addVoucher({
      date: '2025-06-01',
      entries: [
        { subjectId: s1.id, subjectCode: s1.code, subjectName: s1.name, debit: 10000, credit: 0 },
        { subjectId: s2.id, subjectCode: s2.code, subjectName: s2.name, debit: 0, credit: 10000 },
      ],
    })
    voucherId = result.voucher.id
  })

  it('草稿→已审核', () => {
    const result = store.approveVoucher(voucherId)
    expect(result.success).toBe(true)
    expect(store.state.vouchers.find(v => v.id === voucherId).status).toBe('approved')
  })

  it('已审核→已过账', () => {
    store.approveVoucher(voucherId)
    const result = store.postVoucher(voucherId)
    expect(result.success).toBe(true)
    expect(store.state.vouchers.find(v => v.id === voucherId).status).toBe('posted')
  })

  it('过账后科目余额更新', () => {
    const s1 = store.state.subjects.find(s => s.code === '1001')
    store.approveVoucher(voucherId)
    store.postVoucher(voucherId)

    const balances = store.getPeriodBalances('202506')
    const pb = balances.find(b => b.subjectId === s1.id)
    expect(pb).toBeDefined()
    expect(pb.currentDebit).toBe(10000)
  })

  it('已过账→反过账', () => {
    store.approveVoucher(voucherId)
    store.postVoucher(voucherId)
    const result = store.unpostVoucher(voucherId)
    expect(result.success).toBe(true)
    expect(store.state.vouchers.find(v => v.id === voucherId).status).toBe('approved')
  })

  it('草稿直接过账失败', () => {
    const result = store.postVoucher(voucherId)
    expect(result.success).toBe(false)
  })

  it('已过账再审核失败', () => {
    store.approveVoucher(voucherId)
    store.postVoucher(voucherId)
    const result = store.approveVoucher(voucherId)
    expect(result.success).toBe(false)
  })

  it('非末级科目过账失败', () => {
    const s1 = store.state.subjects.find(s => s.code === '1002') // 非末级
    const s2 = store.state.subjects.find(s => s.code === '2001')
    const result = store.addVoucher({
      date: '2025-06-01',
      entries: [
        { subjectId: s1.id, subjectCode: s1.code, subjectName: s1.name, debit: 1000, credit: 0 },
        { subjectId: s2.id, subjectCode: s2.code, subjectName: s2.name, debit: 0, credit: 1000 },
      ],
    })
    store.approveVoucher(result.voucher.id)
    const postResult = store.postVoucher(result.voucher.id)
    expect(postResult.success).toBe(false)
  })
})

describe('Store - 报表', () => {
  let store
  beforeEach(() => {
    store = resetStore()
    // 创建一些过账数据
    const s1001 = store.state.subjects.find(s => s.code === '1001')
    const s2001 = store.state.subjects.find(s => s.code === '2001')
    const s4001 = store.state.subjects.find(s => s.code === '4001')

    const v1 = store.addVoucher({
      date: '2025-06-01',
      entries: [
        { subjectId: s1001.id, subjectCode: s1001.code, subjectName: s1001.name, debit: 50000, credit: 0 },
        { subjectId: s2001.id, subjectCode: s2001.code, subjectName: s2001.name, debit: 0, credit: 50000 },
      ],
    })
    store.approveVoucher(v1.voucher.id)
    store.postVoucher(v1.voucher.id)

    const v2 = store.addVoucher({
      date: '2025-06-01',
      entries: [
        { subjectId: s1001.id, subjectCode: s1001.code, subjectName: s1001.name, debit: 30000, credit: 0 },
        { subjectId: s4001.id, subjectCode: s4001.code, subjectName: s4001.name, debit: 0, credit: 30000 },
      ],
    })
    store.approveVoucher(v2.voucher.id)
    store.postVoucher(v2.voucher.id)
  })

  it('试算平衡表借贷平衡', () => {
    const tb = store.getTrialBalance('202506')
    expect(tb.balanced).toBe(true)
    expect(tb.totalDebit).toBeGreaterThan(0)
    expect(tb.totalDebit).toBe(tb.totalCredit)
  })

  it('资产负债表唯一恒等式', () => {
    const bs = store.getBalanceSheet('202506')
    const totalAssets = bs.assets.total
    const totalLiabEquity = bs.liabilities.total + bs.equity.total
    expect(Math.abs(totalAssets - totalLiabEquity)).toBeLessThan(0.01)
  })

  it('科目余额表有数据', () => {
    const tb = store.getTrialBalance('202506')
    expect(tb.items.length).toBeGreaterThan(0)
    // 至少应有银行存款和短期借款
    const codes = tb.items.map(i => i.code)
    expect(codes).toContain('1001')
    expect(codes).toContain('2001')
  })

  it('利润表可计算（即使无损益数据）', () => {
    const income = store.getIncomeStatement('202506')
    expect(income.items).toBeDefined()
    expect(income.netProfit).toBe(0) // 无损益数据时净利润为0
  })

  it('现金流量表可计算', () => {
    const cf = store.getCashFlow('202506')
    expect(cf.netIncrease).toBeDefined()
  })
})

describe('Store - Dashboard 统计', () => {
  it('空账套返回零值', () => {
    const store = resetStore()
    const stats = store.getDashboardStats('202506')
    expect(stats.voucherCount).toBe(0)
    expect(stats.postedCount).toBe(0)
    expect(stats.debitTotal).toBe(0)
    expect(stats.creditTotal).toBe(0)
    expect(stats.isBalanced).toBe(true)
  })

  it('有数据时返回正确统计', () => {
    const store = resetStore()
    const s1 = store.state.subjects.find(s => s.code === '1001')
    const s2 = store.state.subjects.find(s => s.code === '2001')
    store.addVoucher({
      date: '2025-06-01',
      entries: [
        { subjectId: s1.id, subjectCode: s1.code, subjectName: s1.name, debit: 1000, credit: 0 },
        { subjectId: s2.id, subjectCode: s2.code, subjectName: s2.name, debit: 0, credit: 1000 },
      ],
    })
    const stats = store.getDashboardStats('202506')
    expect(stats.voucherCount).toBe(1)
    expect(stats.debitTotal).toBe(1000)
    expect(stats.creditTotal).toBe(1000)
  })
})

describe('Store - 账套管理', () => {
  let store
  beforeEach(() => {
    store = resetStore()
  })

  it('新增账套', () => {
    store.addAccount({ name: '2025年度', fiscalYear: 2025 })
    expect(store.state.accounts.length).toBe(2)
  })

  it('切换账套', () => {
    store.addAccount({ name: '新账套', fiscalYear: 2025 })
    const newId = store.state.accounts[1].id
    store.switchAccount(newId)
    expect(store.state.currentAccountId).toBe(newId)
  })

  it('不能删除当前账套', () => {
    const result = store.deleteAccount(store.state.accounts[0].id)
    expect(result.success).toBe(false)
  })
})

describe('Store - 凭证查询筛选', () => {
  it('按期间筛选', () => {
    const store = resetStore()
    const s1 = store.state.subjects.find(s => s.code === '1001')
    const s2 = store.state.subjects.find(s => s.code === '2001')
    store.addVoucher({
      date: '2025-06-01',
      period: '202506',
      entries: [
        { subjectId: s1.id, subjectCode: s1.code, subjectName: s1.name, debit: 100, credit: 0 },
        { subjectId: s2.id, subjectCode: s2.code, subjectName: s2.name, debit: 0, credit: 100 },
      ],
    })
    store.addVoucher({
      date: '2025-07-01',
      period: '202507',
      entries: [
        { subjectId: s1.id, subjectCode: s1.code, subjectName: s1.name, debit: 200, credit: 0 },
        { subjectId: s2.id, subjectCode: s2.code, subjectName: s2.name, debit: 0, credit: 200 },
      ],
    })
    const juneList = store.getVoucherList({ period: '202506' })
    expect(juneList.length).toBe(1)
    const allList = store.getVoucherList({})
    expect(allList.length).toBe(2)
  })
})


describe('Store - 全面试算平衡测试', () => {
  let store
  beforeEach(() => { store = resetStore() })

  function postVoucher(entries) {
    const v = store.addVoucher({ date: '2025-06-15', period: '202506', entries })
    if (!v.success) throw new Error(v.errors?.join(';'))
    store.approveVoucher(v.voucher.id)
    const r = store.postVoucher(v.voucher.id)
    if (!r.success) throw new Error(r.error)
  }

  it('资产+负债类凭证试算平衡', () => {
    const s1 = store.state.subjects.find(s => s.code === '1001')
    const s2 = store.state.subjects.find(s => s.code === '2001')
    postVoucher([
      { subjectId: s1.id, subjectCode: s1.code, subjectName: s1.name, debit: 50000, credit: 0 },
      { subjectId: s2.id, subjectCode: s2.code, subjectName: s2.name, debit: 0, credit: 50000 },
    ])
    const tb = store.getTrialBalance('202506')
    expect(tb.balanced).toBe(true)
    expect(tb.totalDebit).toBeGreaterThan(0)
  })

  it('含费用类科目试算平衡', () => {
    const s1 = store.state.subjects.find(s => s.id === 's-660201')
    const s2 = store.state.subjects.find(s => s.id === 's-100201')
    postVoucher([
      { subjectId: s1.id, subjectCode: s1.code, subjectName: s1.name, debit: 2000, credit: 0 },
      { subjectId: s2.id, subjectCode: s2.code, subjectName: s2.name, debit: 0, credit: 2000 },
    ])
    const tb = store.getTrialBalance('202506')
    expect(tb.balanced).toBe(true)
    expect(tb.totalDebit).toBeGreaterThan(0)
  })

  it('含收入类科目试算平衡', () => {
    const s1 = store.state.subjects.find(s => s.code === '1002')
    const s2 = store.state.subjects.find(s => s.code === '6001')
    const s1Leaf = store.state.subjects.find(s => s.id === 's-100201')
    postVoucher([
      { subjectId: s1Leaf.id, subjectCode: s1Leaf.code, subjectName: s1Leaf.name, debit: 30000, credit: 0 },
      { subjectId: s2.id, subjectCode: s2.code, subjectName: s2.name, debit: 0, credit: 30000 },
    ])
    const tb = store.getTrialBalance('202506')
    expect(tb.balanced).toBe(true)
  })

  it('混合收入+费用+资产负债试算平衡', () => {
    const cash = store.state.subjects.find(s => s.code === '1001')
    const bank = store.state.subjects.find(s => s.id === 's-100201')
    const loan = store.state.subjects.find(s => s.code === '2001')
    const revenue = store.state.subjects.find(s => s.code === '6001')
    const expense = store.state.subjects.find(s => s.id === 's-660201')

    postVoucher([
      { subjectId: bank.id, subjectCode: bank.code, subjectName: bank.name, debit: 100000, credit: 0 },
      { subjectId: revenue.id, subjectCode: revenue.code, subjectName: revenue.name, debit: 0, credit: 100000 },
    ])
    postVoucher([
      { subjectId: expense.id, subjectCode: expense.code, subjectName: expense.name, debit: 30000, credit: 0 },
      { subjectId: cash.id, subjectCode: cash.code, subjectName: cash.name, debit: 0, credit: 30000 },
    ])
    postVoucher([
      { subjectId: cash.id, subjectCode: cash.code, subjectName: cash.name, debit: 20000, credit: 0 },
      { subjectId: loan.id, subjectCode: loan.code, subjectName: loan.name, debit: 0, credit: 20000 },
    ])

    const tb = store.getTrialBalance('202506')
    expect(tb.balanced).toBe(true)
  })

  it('资产负债表含成本类科目', () => {
    const prod = store.state.subjects.find(s => s.id === 's-500101') // 生产成本-直接材料
    const loan = store.state.subjects.find(s => s.code === '2001')
    postVoucher([
      { subjectId: prod.id, subjectCode: prod.code, subjectName: prod.name, debit: 50000, credit: 0 },
      { subjectId: loan.id, subjectCode: loan.code, subjectName: loan.name, debit: 0, credit: 50000 },
    ])
    const bs = store.getBalanceSheet('202506')
    expect(bs.isBalanced).toBe(true)
    // 生产成本应计入资产
    expect(bs.assets.total).toBeGreaterThan(0)
  })

  it('每个行业init后预设模块数据', () => {
    const store = resetStore()
    const industries = [
      { init: 'initTeachingAccount', sid: 'manufacturing', payrollExpected: 6 },
      { init: 'initCommercialAccount', sid: 'commercial', payrollExpected: 7 },
      { init: 'initServiceAccount', sid: 'service', payrollExpected: 6 },
      { init: 'initConstructionAccount', sid: 'construction', payrollExpected: 8 },
    ]
    for (const ind of industries) {
      localStorage.clear()
      store[ind.init]()
      const payroll = JSON.parse(localStorage.getItem(`jd_payroll_employees_${ind.sid}`) || '[]')
      expect(payroll.length).toBe(ind.payrollExpected)
      // 固定资产不再预设（随教学进度通过凭证录入逐步积累）
      const assets = JSON.parse(localStorage.getItem(`jd_fixed_assets_${ind.sid}`) || '[]')
      expect(assets.length).toBe(0)
    }
  })

  it('不同行业预设工资数据不同', () => {
    const store = resetStore()
    store.initTeachingAccount()
    const mfg = JSON.parse(localStorage.getItem('jd_payroll_employees_manufacturing') || '[]')
    store.initCommercialAccount()
    const com = JSON.parse(localStorage.getItem('jd_payroll_employees_commercial') || '[]')
    // 行业不同，员工组成不同
    const mfgDepts = mfg.map(e => e.dept)
    const comDepts = com.map(e => e.dept)
    expect(mfgDepts).toContain('生产部')
    expect(comDepts).not.toContain('生产部')
    expect(comDepts).toContain('收银部')
  })

  it('自由模式切换行业后模块数据隔离', () => {
    const store = resetStore()
    // 初始化制造业
    store.initTeachingAccount()
    const mfgPayroll = JSON.parse(localStorage.getItem('jd_payroll_employees_manufacturing') || '[]')
    // 切换到商业企业
    store.switchScenarioState('commercial')
    store.initCommercialAccount()
    const comPayroll = JSON.parse(localStorage.getItem('jd_payroll_employees_commercial') || '[]')
    // 制造业数据应该还存在（未被覆盖）
    const mfgPayrollAfter = JSON.parse(localStorage.getItem('jd_payroll_employees_manufacturing') || '[]')
    expect(mfgPayrollAfter.length).toBe(mfgPayroll.length)
    // 两个行业数据不同
    expect(mfgPayrollAfter[0].dept).not.toBe(comPayroll[0].dept)
    // 固定資産键应始终为空（不再预设）
    expect(localStorage.getItem('jd_fixed_assets_manufacturing')).toBeNull()
    expect(localStorage.getItem('jd_fixed_assets_commercial')).toBeNull()
  })

  it('全部科目展示测试', () => {
    const tb = store.getTrialBalance('202506')
    // 即使没有过账，也应显示所有末级科目
    expect(tb.items.length).toBeGreaterThan(50)
  })
})
