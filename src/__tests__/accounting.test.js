import { describe, it, expect } from 'vitest'
import {
  checkBalance,
  trialBalance,
  validateEntry,
  formatAmount,
  generateVoucherNo,
  BALANCE_DIRECTION,
  SUBJECT_TYPE,
  DEBIT,
  CREDIT,
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
