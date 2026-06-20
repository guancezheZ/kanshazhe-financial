import { describe, it, expect } from 'vitest'
import {
  checkBalance,
  trialBalance,
  validateEntry,
  formatAmount,
  generateVoucherNo,
  BALANCE_DIRECTION,
  SUBJECT_TYPE,
  DEBIT, CREDIT, round,
  calcBalanceSheet, calcIncomeStatement, calcCashFlow,
  recalcClosingBalance, updateBalancesAfterPost, createPeriodBalance,
} from '@/utils/accounting.js'

describe('checkBalance - 凭证借贷平衡校验', () => {
  it('借贷相等时返回 balanced=true', () => {
    const entries = [
      { debit: 1000, credit: 0 },
      { debit: 0, credit: 1000 },
    ]
    const result = checkBalance(entries)
    expect(result.balanced).toBe(true)
    expect(result.debitTotal).toBe(1000)
    expect(result.creditTotal).toBe(1000)
    expect(result.diff).toBe(0)
  })

  it('借贷不等时返回 balanced=false', () => {
    const entries = [
      { debit: 2000, credit: 0 },
      { debit: 0, credit: 1500 },
    ]
    const result = checkBalance(entries)
    expect(result.balanced).toBe(false)
    expect(result.debitTotal).toBe(2000)
    expect(result.creditTotal).toBe(1500)
    expect(result.diff).toBe(500)
  })

  it('空列表返回 balanced=true（借贷均为0）', () => {
    const result = checkBalance([])
    expect(result.balanced).toBe(true)
    expect(result.debitTotal).toBe(0)
    expect(result.creditTotal).toBe(0)
  })

  it('浮点精度容差内视为平衡（差异小于0.001）', () => {
    const entries = [
      { debit: 100.0001, credit: 0 },
      { debit: 0, credit: 100.0002 },
    ]
    const result = checkBalance(entries)
    expect(result.balanced).toBe(true)
  })

  it('处理多分录场景', () => {
    const entries = [
      { debit: 500, credit: 0 },
      { debit: 300, credit: 0 },
      { debit: 0, credit: 800 },
    ]
    const result = checkBalance(entries)
    expect(result.balanced).toBe(true)
    expect(result.debitTotal).toBe(800)
    expect(result.creditTotal).toBe(800)
  })
})

describe('validateEntry - 分录校验', () => {
  it('有效的借方分录', () => {
    const result = validateEntry({ subjectCode: '1001', debit: 500, credit: 0 })
    expect(result.valid).toBe(true)
    expect(result.errors).toHaveLength(0)
  })

  it('有效的贷方分录', () => {
    const result = validateEntry({ subjectCode: '2001', debit: 0, credit: 800 })
    expect(result.valid).toBe(true)
  })

  it('科目编码为空时报错', () => {
    const result = validateEntry({ subjectCode: '', debit: 500, credit: 0 })
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('科目编码不能为空')
  })

  it('借贷同时有金额时报错', () => {
    const result = validateEntry({ subjectCode: '1001', debit: 500, credit: 300 })
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('同一条分录不能同时有借方和贷方金额')
  })

  it('借贷同时为零时报错', () => {
    const result = validateEntry({ subjectCode: '1001', debit: 0, credit: 0 })
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('借方和贷方金额不能同时为零')
  })

  it('负数金额（红字）允许通过', () => {
    const result = validateEntry({ subjectCode: '1001', debit: -100, credit: 0 })
    expect(result.valid).toBe(true)
  })
})

describe('trialBalance - 试算平衡', () => {
  it('借贷平衡时返回 balanced=true', () => {
    const subjects = [
      { subjectCode: '1001', subjectType: SUBJECT_TYPE.ASSET, balance: 500000 },
      { subjectCode: '2001', subjectType: SUBJECT_TYPE.LIABILITY, balance: 200000 },
      { subjectCode: '3001', subjectType: SUBJECT_TYPE.EQUITY, balance: 300000 },
    ]
    const result = trialBalance(subjects)
    expect(result.balanced).toBe(true)
    expect(result.totalDebit).toBe(500000)
    expect(result.totalCredit).toBe(500000)
  })

  it('借贷不平衡时返回 balanced=false', () => {
    const subjects = [
      { subjectCode: '1001', subjectType: SUBJECT_TYPE.ASSET, balance: 500000 },
      { subjectCode: '2001', subjectType: SUBJECT_TYPE.LIABILITY, balance: 200000 },
      { subjectCode: '3001', subjectType: SUBJECT_TYPE.EQUITY, balance: 100000 },
    ]
    const result = trialBalance(subjects)
    expect(result.balanced).toBe(false)
  })

  it('损益类科目不计入余额（平衡检查中跳过）', () => {
    const subjects = [
      { subjectCode: '1001', subjectType: SUBJECT_TYPE.ASSET, balance: 300000 },
      { subjectCode: '2001', subjectType: SUBJECT_TYPE.LIABILITY, balance: 150000 },
      { subjectCode: '3001', subjectType: SUBJECT_TYPE.EQUITY, balance: 150000 },
      { subjectCode: '5001', subjectType: SUBJECT_TYPE.PROFIT_LOSS, balance: 0 },
    ]
    const result = trialBalance(subjects)
    expect(result.balanced).toBe(true)
  })

  it('返回详细信息包含方向和金额', () => {
    const subjects = [
      { subjectCode: '1001', subjectType: SUBJECT_TYPE.ASSET, balance: 1000 },
    ]
    const result = trialBalance(subjects)
    expect(result.details).toHaveLength(1)
    expect(result.details[0].direction).toBe('借')
    expect(result.details[0].amount).toBe(1000)
  })
})

describe('formatAmount - 金额格式化', () => {
  it('保留两位小数', () => {
    expect(formatAmount(100)).toBe('100.00')
    expect(formatAmount(100.5)).toBe('100.50')
    expect(formatAmount(100.123)).toBe('100.12')
  })

  it('千分位逗号分隔', () => {
    expect(formatAmount(1234567.89)).toBe('1,234,567.89')
    expect(formatAmount(1000)).toBe('1,000.00')
  })

  it('负数处理', () => {
    expect(formatAmount(-500, false)).toBe('500.00')
    expect(formatAmount(-500, true)).toBe('-500.00')
    expect(formatAmount(500, true)).toBe('500.00')
  })

  it('零值', () => {
    expect(formatAmount(0)).toBe('0.00')
    expect(formatAmount(null)).toBe('0.00')
    expect(formatAmount(undefined)).toBe('0.00')
  })
})

describe('generateVoucherNo - 凭证号生成', () => {
  it('默认前缀', () => {
    expect(generateVoucherNo('记', 1)).toBe('记-0001')
    expect(generateVoucherNo('记', 100)).toBe('记-0100')
  })

  it('带会计期间', () => {
    expect(generateVoucherNo('记', 1, '202506')).toBe('记-202506-0001')
  })

  it('自定义前缀', () => {
    expect(generateVoucherNo('现收', 5)).toBe('现收-0005')
  })
})

describe('BALANCE_DIRECTION - 科目余额方向映射', () => {
  it('资产类和成本类为借方余额', () => {
    expect(BALANCE_DIRECTION[SUBJECT_TYPE.ASSET]).toBe(DEBIT)
    expect(BALANCE_DIRECTION[SUBJECT_TYPE.COST]).toBe(DEBIT)
  })
  it('负债类和所有者权益类为贷方余额', () => {
    expect(BALANCE_DIRECTION[SUBJECT_TYPE.LIABILITY]).toBe(CREDIT)
    expect(BALANCE_DIRECTION[SUBJECT_TYPE.EQUITY]).toBe(CREDIT)
  })
  it('损益类余额为 null（期末结转无余额）', () => {
    expect(BALANCE_DIRECTION[SUBJECT_TYPE.PROFIT_LOSS]).toBeNull()
  })
})


describe('trialBalance - 含损益类科目', () => {
  it('费用类借方余额计入借方', () => {
    const result = trialBalance([
      { subjectCode: '660201', subjectName: '管理费用-办公费', subjectType: 'profit_loss', balance: -1000 },
      { subjectCode: '100201', subjectName: '银行存款-工行', subjectType: 'asset', balance: -1000 },
    ])
    expect(result.balanced).toBe(true)
    expect(result.totalDebit).toBe(1000)
    expect(result.totalCredit).toBe(1000)
  })

  it('收入类贷方余额计入贷方', () => {
    const result = trialBalance([
      { subjectCode: '1002', subjectName: '银行存款', subjectType: 'asset', balance: 5000 },
      { subjectCode: '6001', subjectName: '主营业务收入', subjectType: 'profit_loss', balance: 5000 },
    ])
    expect(result.balanced).toBe(true)
    expect(result.totalDebit).toBe(5000)
    expect(result.totalCredit).toBe(5000)
  })

  it('混合费用+收入时借贷平衡', () => {
    const result = trialBalance([
      { subjectCode: '1002', subjectName: '银行存款', subjectType: 'asset', balance: 2000 },
      { subjectCode: '6001', subjectName: '主营业务收入', subjectType: 'profit_loss', balance: 8000 },
      { subjectCode: '6602', subjectName: '管理费用', subjectType: 'profit_loss', balance: -6000 },
    ])
    expect(result.balanced).toBe(true)
    expect(result.totalDebit).toBe(8000)
    expect(result.totalCredit).toBe(8000)
  })

  it('损益类科目不平衡时检测正确', () => {
    const result = trialBalance([
      { subjectCode: '6602', subjectName: '管理费用', subjectType: 'profit_loss', balance: -5000 },
      { subjectCode: '6001', subjectName: '主营业务收入', subjectType: 'profit_loss', balance: 3000 },
    ])
    expect(result.balanced).toBe(false)
    expect(result.totalDebit).toBe(5000)
    expect(result.totalCredit).toBe(3000)
  })
})

// ═══════════════════════════════════════════════════════════════
//  第2轮全面测试：会计精度校验
//  覆盖 calcBalanceSheet / calcIncomeStatement / calcCashFlow
//  + recalcClosingBalance / updateBalancesAfterPost 集成
// ═══════════════════════════════════════════════════════════════

describe('calcBalanceSheet - 资产负债表恒等式', () => {
  it('简单场景：资产=负债+所有者权益', () => {
    const subjects = [
      { id: 's-100201', code: '100201', name: '银行存款-工行', type: SUBJECT_TYPE.ASSET, parentId: null, isLeaf: true },
      { id: 's-2001', code: '2001', name: '短期借款', type: SUBJECT_TYPE.LIABILITY, parentId: null, isLeaf: true },
      { id: 's-4001', code: '4001', name: '实收资本', type: SUBJECT_TYPE.EQUITY, parentId: null, isLeaf: true },
    ]
    const balances = [
      { subjectId: 's-100201', closingDebit: 500000, closingCredit: 0 },
      { subjectId: 's-2001', closingDebit: 0, closingCredit: 200000 },
      { subjectId: 's-4001', closingDebit: 0, closingCredit: 300000 },
    ]
    const result = calcBalanceSheet(subjects, balances)
    expect(result.isBalanced).toBe(true)
    expect(result.assets.total).toBe(500000)
    expect(result.liabilities.total).toBe(200000)
    expect(result.equity.total).toBe(300000)
    expect(result.assets.total).toBe(result.liabilities.total + result.equity.total)
  })

  it('含多子科目：银行存款聚合', () => {
    const subjects = [
      { id: 's-100201', code: '100201', name: '工商银行', type: SUBJECT_TYPE.ASSET, parentId: 's-1002', isLeaf: true },
      { id: 's-100202', code: '100202', name: '建设银行', type: SUBJECT_TYPE.ASSET, parentId: 's-1002', isLeaf: true },
      { id: 's-2001', code: '2001', name: '短期借款', type: SUBJECT_TYPE.LIABILITY, parentId: null, isLeaf: true },
      { id: 's-4001', code: '4001', name: '实收资本', type: SUBJECT_TYPE.EQUITY, parentId: null, isLeaf: true },
    ]
    const balances = [
      { subjectId: 's-100201', closingDebit: 300000, closingCredit: 0 },
      { subjectId: 's-100202', closingDebit: 200000, closingCredit: 0 },
      { subjectId: 's-2001', closingDebit: 0, closingCredit: 100000 },
      { subjectId: 's-4001', closingDebit: 0, closingCredit: 400000 },
    ]
    const result = calcBalanceSheet(subjects, balances)
    expect(result.isBalanced).toBe(true)
    expect(result.assets.total).toBe(500000)
    expect(result.assets.items.length).toBe(2)
    expect(result.liabilities.total + result.equity.total).toBe(500000)
  })

  it('负债类科目有余额时正确处理', () => {
    const subjects = [
      { id: 's-1001', code: '1001', name: '库存现金', type: SUBJECT_TYPE.ASSET, isLeaf: true },
      { id: 's-220201', code: '220201', name: '应付账款-丙公司', type: SUBJECT_TYPE.LIABILITY, isLeaf: true },
      { id: 's-4001', code: '4001', name: '实收资本', type: SUBJECT_TYPE.EQUITY, isLeaf: true },
    ]
    const balances = [
      { subjectId: 's-1001', closingDebit: 100000, closingCredit: 0 },
      { subjectId: 's-220201', closingDebit: 0, closingCredit: 60000 },
      { subjectId: 's-4001', closingDebit: 0, closingCredit: 40000 },
    ]
    const result = calcBalanceSheet(subjects, balances)
    expect(result.isBalanced).toBe(true)
    expect(result.assets.total).toBe(100000)
    expect(result.liabilities.total + result.equity.total).toBe(100000)
  })

  it('空余额返回空报表且平衡', () => {
    const result = calcBalanceSheet([], [])
    expect(result.isBalanced).toBe(true)
    expect(result.assets.total).toBe(0)
    expect(result.liabilities.total).toBe(0)
    expect(result.equity.total).toBe(0)
  })

  it('仅资产无负债回报不平', () => {
    const subjects = [
      { id: 's-1001', code: '1001', name: '库存现金', type: SUBJECT_TYPE.ASSET, isLeaf: true },
    ]
    const balances = [
      { subjectId: 's-1001', closingDebit: 1000, closingCredit: 0 },
    ]
    const result = calcBalanceSheet(subjects, balances)
    expect(result.isBalanced).toBe(false)
    expect(result.assets.total).toBe(1000)
  })
})

describe('calcIncomeStatement - 利润表公式', () => {
  it('基本营收成本：收入-成本=营业利润（无费用）', () => {
    const subjects = [
      { id: 's-6001', code: '6001', name: '主营业务收入', type: SUBJECT_TYPE.PROFIT_LOSS, parentId: null, isLeaf: true },
      { id: 's-6401', code: '6401', name: '主营业务成本', type: SUBJECT_TYPE.PROFIT_LOSS, parentId: null, isLeaf: true },
    ]
    const balances = [
      { subjectId: 's-6001', currentDebit: 0, currentCredit: 100000 },
      { subjectId: 's-6401', currentDebit: 60000, currentCredit: 0 },
    ]
    const result = calcIncomeStatement(subjects, balances)
    expect(result.revenue).toBe(100000)
    expect(result.cost).toBe(60000)
    expect(result.operatingProfit).toBe(40000) // 100000 - 60000
    expect(result.totalProfit).toBe(40000)
    expect(result.netProfit).toBe(40000)
    // items 行数据
    expect(result.items[0].name).toBe('一、营业收入')
    expect(result.items[0].amount).toBe(100000)
    expect(result.items[1].name).toBe('减：营业成本')
    expect(result.items[1].amount).toBe(60000)
  })

  it('含子科目：管理费用/销售费用从末级科目聚合', () => {
    const subjects = [
      { id: 's-6001', code: '6001', name: '主营业务收入', type: SUBJECT_TYPE.PROFIT_LOSS, parentId: null, isLeaf: true },
      { id: 's-6401', code: '6401', name: '主营业务成本', type: SUBJECT_TYPE.PROFIT_LOSS, parentId: null, isLeaf: true },
      // 管理费用 - 非末级
      { id: 's-6602', code: '6602', name: '管理费用', type: SUBJECT_TYPE.PROFIT_LOSS, parentId: null, isLeaf: false },
      { id: 's-660201', code: '660201', name: '办公费', type: SUBJECT_TYPE.PROFIT_LOSS, parentId: 's-6602', isLeaf: true },
      { id: 's-660202', code: '660202', name: '差旅费', type: SUBJECT_TYPE.PROFIT_LOSS, parentId: 's-6602', isLeaf: true },
      // 销售费用 - 非末级
      { id: 's-6601', code: '6601', name: '销售费用', type: SUBJECT_TYPE.PROFIT_LOSS, parentId: null, isLeaf: false },
      { id: 's-660101', code: '660101', name: '广告费', type: SUBJECT_TYPE.PROFIT_LOSS, parentId: 's-6601', isLeaf: true },
    ]
    const balances = [
      { subjectId: 's-6001', currentDebit: 0, currentCredit: 200000 },
      { subjectId: 's-6401', currentDebit: 120000, currentCredit: 0 },
      { subjectId: 's-660201', currentDebit: 5000, currentCredit: 0 },   // 办公费 5000
      { subjectId: 's-660202', currentDebit: 3000, currentCredit: 0 },   // 差旅费 3000
      { subjectId: 's-660101', currentDebit: 2000, currentCredit: 0 },   // 广告费 2000
    ]
    const result = calcIncomeStatement(subjects, balances)

    // 验证聚合
    expect(result.revenue).toBe(200000)
    expect(result.cost).toBe(120000)
    expect(result.adminExp).toBe(8000)    // 5000 + 3000
    expect(result.sellingExp).toBe(2000)  // 2000

    // 验证公式
    expect(result.operatingProfit).toBe(70000)  // 200000 - 120000 - 0 - 2000 - 8000 - 0
    expect(result.totalProfit).toBe(70000)
    expect(result.netProfit).toBe(70000)
  })

  it('完整利润链条：含营业外收支和所得税', () => {
    const subjects = [
      { id: 's-6001', code: '6001', name: '主营业务收入', type: SUBJECT_TYPE.PROFIT_LOSS, isLeaf: true },
      { id: 's-6401', code: '6401', name: '主营业务成本', type: SUBJECT_TYPE.PROFIT_LOSS, isLeaf: true },
      { id: 's-6603', code: '6603', name: '财务费用', type: SUBJECT_TYPE.PROFIT_LOSS, isLeaf: true },
      { id: 's-6301', code: '6301', name: '营业外收入', type: SUBJECT_TYPE.PROFIT_LOSS, isLeaf: true },
      { id: 's-6711', code: '6711', name: '营业外支出', type: SUBJECT_TYPE.PROFIT_LOSS, isLeaf: true },
      { id: 's-6801', code: '6801', name: '所得税费用', type: SUBJECT_TYPE.PROFIT_LOSS, isLeaf: true },
    ]
    const balances = [
      { subjectId: 's-6001', currentDebit: 0, currentCredit: 500000 },
      { subjectId: 's-6401', currentDebit: 300000, currentCredit: 0 },
      { subjectId: 's-6603', currentDebit: 5000, currentCredit: 0 },      // 财务费用
      { subjectId: 's-6301', currentDebit: 0, currentCredit: 10000 },     // 营业外收入
      { subjectId: 's-6711', currentDebit: 2000, currentCredit: 0 },      // 营业外支出
      { subjectId: 's-6801', currentDebit: 50000, currentCredit: 0 },     // 所得税
    ]
    const result = calcIncomeStatement(subjects, balances)

    expect(result.revenue).toBe(500000)
    expect(result.cost).toBe(300000)
    expect(result.financeExp).toBe(5000)
    expect(result.otherIncome).toBe(10000)
    expect(result.otherExp).toBe(2000)
    expect(result.incomeTax).toBe(50000)

    expect(result.operatingProfit).toBe(195000)  // 500000 - 300000 - 0 - 0 - 0 - 5000
    expect(result.totalProfit).toBe(203000)      // 195000 + 10000 - 2000
    expect(result.netProfit).toBe(153000)        // 203000 - 50000
  })

  it('无损益数据时全部为零', () => {
    const result = calcIncomeStatement([], [])
    expect(result.revenue).toBe(0)
    expect(result.cost).toBe(0)
    expect(result.operatingProfit).toBe(0)
    expect(result.totalProfit).toBe(0)
    expect(result.netProfit).toBe(0)
    expect(result.items.length).toBe(12)
  })

  it('利润表行项目结构完整', () => {
    const subjects = [
      { id: 's-6001', code: '6001', name: '主营业务收入', type: SUBJECT_TYPE.PROFIT_LOSS, isLeaf: true },
    ]
    const balances = [
      { subjectId: 's-6001', currentDebit: 0, currentCredit: 1000 },
    ]
    const result = calcIncomeStatement(subjects, balances)
    expect(result.items).toHaveLength(12)
    // 验证关键行标记
    expect(result.items[0].indent).toBe(false)   // 营业收入 - 不缩进
    expect(result.items[1].indent).toBe(true)    // 营业成本 - 缩进
    expect(result.items[6].bold).toBe(true)       // 营业利润 - 加粗
    expect(result.items[9].bold).toBe(true)       // 利润总额 - 加粗
    expect(result.items[11].bold).toBe(true)      // 净利润 - 加粗
  })
})

describe('calcCashFlow - 现金流量表', () => {
  it('基本结构', () => {
    const result = calcCashFlow([], [])
    expect(result).toHaveProperty('operating')
    expect(result).toHaveProperty('investing')
    expect(result).toHaveProperty('financing')
    expect(result).toHaveProperty('netIncrease')
    expect(result).toHaveProperty('netProfit')
  })

  it('净利润=0时经营现金流=0', () => {
    const result = calcCashFlow([], [])
    expect(result.netProfit).toBe(0)
    expect(result.operating.net).toBe(0)
  })
})

describe('recalcClosingBalance - 期末余额计算', () => {
  it('资产类：期初借方+本期借方-本期贷方', () => {
    const pb = {
      subjectType: SUBJECT_TYPE.ASSET,
      openingDebit: 100000, openingCredit: 0,
      currentDebit: 50000, currentCredit: 30000,
    }
    const result = recalcClosingBalance(pb)
    expect(result.closingDebit).toBe(120000) // 100000 + 50000 - 30000
    expect(result.closingCredit).toBe(0)
  })

  it('资产类：净额为负时转为贷方余额', () => {
    const pb = {
      subjectType: SUBJECT_TYPE.ASSET,
      openingDebit: 10000, openingCredit: 0,
      currentDebit: 0, currentCredit: 15000,
    }
    const result = recalcClosingBalance(pb)
    expect(result.closingDebit).toBe(0)
    expect(result.closingCredit).toBe(5000) // 10000 + 0 - 15000 = -5000 → 贷方5000
  })

  it('负债类：期初贷方+本期贷方-本期借方', () => {
    const pb = {
      subjectType: SUBJECT_TYPE.LIABILITY,
      openingDebit: 0, openingCredit: 200000,
      currentDebit: 50000, currentCredit: 30000,
    }
    const result = recalcClosingBalance(pb)
    expect(result.closingCredit).toBe(180000) // 200000 + 30000 - 50000
    expect(result.closingDebit).toBe(0)
  })

  it('负债类：净额为负时转为借方余额', () => {
    const pb = {
      subjectType: SUBJECT_TYPE.LIABILITY,
      openingDebit: 0, openingCredit: 10000,
      currentDebit: 20000, currentCredit: 0,
    }
    const result = recalcClosingBalance(pb)
    expect(result.closingCredit).toBe(0)
    expect(result.closingDebit).toBe(10000) // 10000 + 0 - 20000 = -10000 → 借方10000
  })

  it('处理零值', () => {
    const pb = {
      subjectType: SUBJECT_TYPE.ASSET,
      openingDebit: 0, openingCredit: 0,
      currentDebit: 0, currentCredit: 0,
    }
    const result = recalcClosingBalance(pb)
    expect(result.closingDebit).toBe(0)
    expect(result.closingCredit).toBe(0)
  })
})

describe('updateBalancesAfterPost - 过账余额更新', () => {
  it('过账增加发生额', () => {
    const periodBalances = [
      { subjectId: 's-1001', subjectType: SUBJECT_TYPE.ASSET, period: '202601',
        openingDebit: 0, openingCredit: 0, currentDebit: 0, currentCredit: 0,
        closingDebit: 0, closingCredit: 0 },
    ]
    const entries = [
      { subjectId: 's-1001', debit: 50000, credit: 0 },
    ]
    const result = updateBalancesAfterPost(periodBalances, entries, '202601', 'post')
    expect(result[0].currentDebit).toBe(50000)
    expect(result[0].currentCredit).toBe(0)
    expect(result[0].closingDebit).toBe(50000)
  })

  it('反过账冲销发生额', () => {
    const periodBalances = [
      { subjectId: 's-1001', subjectType: SUBJECT_TYPE.ASSET, period: '202601',
        openingDebit: 0, openingCredit: 0, currentDebit: 50000, currentCredit: 0,
        closingDebit: 50000, closingCredit: 0 },
    ]
    const entries = [
      { subjectId: 's-1001', debit: 50000, credit: 0 },
    ]
    const result = updateBalancesAfterPost(periodBalances, entries, '202601', 'unpost')
    expect(result[0].currentDebit).toBe(0)
    expect(result[0].currentCredit).toBe(0)
    expect(result[0].closingDebit).toBe(0)
  })

  it('多分录多科目同时更新', () => {
    const periodBalances = [
      { subjectId: 's-1001', subjectType: SUBJECT_TYPE.ASSET, period: '202601',
        openingDebit: 0, openingCredit: 0, currentDebit: 0, currentCredit: 0,
        closingDebit: 0, closingCredit: 0 },
      { subjectId: 's-2001', subjectType: SUBJECT_TYPE.LIABILITY, period: '202601',
        openingDebit: 0, openingCredit: 0, currentDebit: 0, currentCredit: 0,
        closingDebit: 0, closingCredit: 0 },
    ]
    const entries = [
      { subjectId: 's-1001', debit: 100000, credit: 0 },
      { subjectId: 's-2001', debit: 0, credit: 100000 },
    ]
    const result = updateBalancesAfterPost(periodBalances, entries, '202601', 'post')
    expect(result[0].currentDebit).toBe(100000)
    expect(result[0].closingDebit).toBe(100000)
    expect(result[1].currentCredit).toBe(100000)
    expect(result[1].closingCredit).toBe(100000)
  })
})

describe('createPeriodBalance - 期间余额初始化', () => {
  it('新期间从零开始', () => {
    const pb = createPeriodBalance('s-1001', SUBJECT_TYPE.ASSET, '202602')
    expect(pb.period).toBe('202602')
    expect(pb.openingDebit).toBe(0)
    expect(pb.openingCredit).toBe(0)
    expect(pb.currentDebit).toBe(0)
    expect(pb.currentCredit).toBe(0)
  })

  it('从上期结转期初余额', () => {
    const prev = [
      { subjectId: 's-1001', period: '202601',
        closingDebit: 100000, closingCredit: 0 },
    ]
    const pb = createPeriodBalance('s-1001', SUBJECT_TYPE.ASSET, '202602', prev)
    expect(pb.openingDebit).toBe(100000)
    expect(pb.openingCredit).toBe(0)
  })
})

// ═══════════════════════════════════════════════════════════════
//  期末结转分录验证（模拟月末期间损益结转）
// ═══════════════════════════════════════════════════════════════

describe('periodEndClosing - 期末结转分录验证', () => {
  /**
   * 模拟一个月的数据：
   * 1. 收入：主营业务收入 100000（贷方）
   * 2. 成本：主营业务成本 60000（借方）
   * 3. 费用：管理费用-办公费 5000（借方），销售费用-广告费 3000（借方）
   * 4. 结转前利润表：operatingProfit = 100000 - 60000 - 0 - 3000 - 5000 - 0 = 32000
   * 5. 结转分录：
   *    Dr 主营业务收入 100000
   *    Cr 本年利润 100000
   *    Dr 本年利润 68000
   *    Cr 主营业务成本 60000
   *    Cr 管理费用-办公费 5000
   *    Cr 销售费用-广告费 3000
   * 6. 结转后：本年利润余额 = 100000 - 68000 = 32000（贷方=净利润）
   */
  const subjects = [
    // 损益类
    { id: 's-6001', code: '6001', name: '主营业务收入', type: SUBJECT_TYPE.PROFIT_LOSS, parentId: null, isLeaf: true },
    { id: 's-6401', code: '6401', name: '主营业务成本', type: SUBJECT_TYPE.PROFIT_LOSS, parentId: null, isLeaf: true },
    // 管理费用（非末级）
    { id: 's-6602', code: '6602', name: '管理费用', type: SUBJECT_TYPE.PROFIT_LOSS, parentId: null, isLeaf: false },
    { id: 's-660201', code: '660201', name: '办公费', type: SUBJECT_TYPE.PROFIT_LOSS, parentId: 's-6602', isLeaf: true },
    // 销售费用（非末级）
    { id: 's-6601', code: '6601', name: '销售费用', type: SUBJECT_TYPE.PROFIT_LOSS, parentId: null, isLeaf: false },
    { id: 's-660101', code: '660101', name: '广告费', type: SUBJECT_TYPE.PROFIT_LOSS, parentId: 's-6601', isLeaf: true },
    // 所有者权益
    { id: 's-4103', code: '4103', name: '本年利润', type: SUBJECT_TYPE.EQUITY, parentId: null, isLeaf: true },
    // 资产
    { id: 's-100201', code: '100201', name: '银行存款-工行', type: SUBJECT_TYPE.ASSET, parentId: null, isLeaf: true },
  ]

  it('结转前利润表计算正确', () => {
    // 只有日常业务，没有结转
    const beforeClose = [
      { subjectId: 's-6001', currentDebit: 0, currentCredit: 100000 },
      { subjectId: 's-6401', currentDebit: 60000, currentCredit: 0 },
      { subjectId: 's-660201', currentDebit: 5000, currentCredit: 0 },
      { subjectId: 's-660101', currentDebit: 3000, currentCredit: 0 },
    ]
    const income = calcIncomeStatement(subjects, beforeClose)
    expect(income.revenue).toBe(100000)
    expect(income.cost).toBe(60000)
    expect(income.adminExp).toBe(5000)
    expect(income.sellingExp).toBe(3000)
    expect(income.operatingProfit).toBe(32000) // 100000 - 60000 - 3000 - 5000
    expect(income.netProfit).toBe(32000)
  })

  it('结转分录借贷平衡', () => {
    // 结转分录：收入转出（Dr），费用转出（Cr），差额入本年利润
    const closingEntries = [
      { subjectCode: '6001', debit: 100000, credit: 0 },   // 收入转出
      { subjectCode: '6401', debit: 0, credit: 60000 },    // 成本转出
      { subjectCode: '660201', debit: 0, credit: 5000 },   // 办公费转出
      { subjectCode: '660101', debit: 0, credit: 3000 },   // 广告费转出
      { subjectCode: '4103', debit: 68000, credit: 100000 },  // 本年利润：收入100000-费用68000=32000净利润
    ]
    const result = checkBalance(closingEntries)
    expect(result.balanced).toBe(true)
    expect(result.debitTotal).toBe(168000)  // 100000 + 68000
    expect(result.creditTotal).toBe(168000) // 60000 + 5000 + 3000 + 100000
  })

  it('结转后损益类科目余额归零', () => {
    // 过账结转分录后，updateBalancesAfterPost
    const beforeClosing = [
      { subjectId: 's-6001', subjectType: SUBJECT_TYPE.PROFIT_LOSS, period: '202601',
        openingDebit: 0, openingCredit: 0, currentDebit: 0, currentCredit: 100000,
        closingDebit: 0, closingCredit: 100000 },
      { subjectId: 's-6401', subjectType: SUBJECT_TYPE.PROFIT_LOSS, period: '202601',
        openingDebit: 0, openingCredit: 0, currentDebit: 60000, currentCredit: 0,
        closingDebit: 60000, closingCredit: 0 },
      { subjectId: 's-660201', subjectType: SUBJECT_TYPE.PROFIT_LOSS, period: '202601',
        openingDebit: 0, openingCredit: 0, currentDebit: 5000, currentCredit: 0,
        closingDebit: 5000, closingCredit: 0 },
      { subjectId: 's-660101', subjectType: SUBJECT_TYPE.PROFIT_LOSS, period: '202601',
        openingDebit: 0, openingCredit: 0, currentDebit: 3000, currentCredit: 0,
        closingDebit: 3000, closingCredit: 0 },
      { subjectId: 's-4103', subjectType: SUBJECT_TYPE.EQUITY, period: '202601',
        openingDebit: 0, openingCredit: 0, currentDebit: 0, currentCredit: 0,
        closingDebit: 0, closingCredit: 0 },
      { subjectId: 's-100201', subjectType: SUBJECT_TYPE.ASSET, period: '202601',
        openingDebit: 500000, openingCredit: 0, currentDebit: 0, currentCredit: 68000,
        closingDebit: 432000, closingCredit: 0 },
    ]

    // 结转分录
    const closingEntries = [
      { subjectId: 's-6001', debit: 100000, credit: 0 },
      { subjectId: 's-6401', debit: 0, credit: 60000 },
      { subjectId: 's-660201', debit: 0, credit: 5000 },
      { subjectId: 's-660101', debit: 0, credit: 3000 },
      { subjectId: 's-4103', debit: 68000, credit: 100000 },
      { subjectId: 's-100201', debit: 0, credit: 0 },  // 不影响现金的分录（只是演示）
    ]

    const afterClosing = updateBalancesAfterPost(beforeClosing, closingEntries, '202601', 'post')

    // 损益类科目转出后发生额归零（借贷加减后为0）
    const revenuePb = afterClosing.find(p => p.subjectId === 's-6001')
    expect(revenuePb.currentDebit).toBe(100000)  // 转出记借方
    expect(revenuePb.currentCredit).toBe(100000) // 原贷方100000
    expect(revenuePb.closingDebit).toBe(0)       // 余额归零

    const costPb = afterClosing.find(p => p.subjectId === 's-6401')
    expect(costPb.currentCredit).toBe(60000)     // 转出记贷方
    expect(costPb.currentDebit).toBe(60000)      // 原借方60000
    expect(costPb.closingDebit).toBe(0)          // 余额归零

    // 本年利润：收入100000 - 费用68000 = 净利润32000
    const profitPb = afterClosing.find(p => p.subjectId === 's-4103')
    expect(profitPb.currentDebit).toBe(68000)
    expect(profitPb.currentCredit).toBe(100000)
    expect(profitPb.closingCredit).toBe(32000)   // 净利润（贷方余额）
  })

  it('净利润=结转后利润表净利润', () => {
    // 结转后续算利润表，损益类科目发生额已对冲
    const afterCloseBalances = [
      { subjectId: 's-6001', currentDebit: 100000, currentCredit: 100000 },  // 对冲后0
      { subjectId: 's-6401', currentDebit: 60000, currentCredit: 60000 },    // 对冲后0
      { subjectId: 's-660201', currentDebit: 5000, currentCredit: 5000 },    // 对冲后0
      { subjectId: 's-660101', currentDebit: 3000, currentCredit: 3000 },    // 对冲后0
    ]
    const income = calcIncomeStatement(subjects, afterCloseBalances)
    expect(income.revenue).toBe(0)        // 收入已转出
    expect(income.cost).toBe(0)           // 成本已转出
    expect(income.adminExp).toBe(0)       // 费用已转出
    expect(income.sellingExp).toBe(0)     // 费用已转出
    expect(income.operatingProfit).toBe(0)
    expect(income.netProfit).toBe(0)
  })

  it('结转后试算平衡（含期初所有者权益）', () => {
    // 结转后各科目余额：
    // 银行存款 = 500000(期初) - 68000(费用支付) = 432000 (借)
    // 实收资本 = 400000 (贷) — 期初
    // 本年利润 = 32000 (贷) — 本期净利润
    // 总借 = 432000 = 总贷 = 400000 + 32000 ✓
    const afterCloseItems = [
      { subjectCode: '100201', subjectName: '银行存款', subjectType: SUBJECT_TYPE.ASSET, balance: 432000 },
      { subjectCode: '4001', subjectName: '实收资本', subjectType: SUBJECT_TYPE.EQUITY, balance: 400000 },
      { subjectCode: '4103', subjectName: '本年利润', subjectType: SUBJECT_TYPE.EQUITY, balance: 32000 },
    ]
    const result = trialBalance(afterCloseItems)
    expect(result.balanced).toBe(true)
    expect(result.totalDebit).toBe(432000)
    expect(result.totalCredit).toBe(432000)
  })
})
