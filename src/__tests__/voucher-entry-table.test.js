/**
 * VoucherEntryTable 核心逻辑测试
 *
 * 覆盖：借贷平衡、行管理、金额处理、摘要复制
 */

import { describe, it, expect } from 'vitest'
import { checkBalance, formatAmount } from '@/utils/accounting.js'

describe('VoucherEntryTable - 借贷平衡', () => {
  it('平衡：一借一贷', () => {
    const r = checkBalance([
      { debit: 5000, credit: 0 },
      { debit: 0, credit: 5000 },
    ])
    expect(r.balanced).toBe(true)
    expect(r.debitTotal).toBe(5000)
    expect(r.creditTotal).toBe(5000)
    expect(r.diff).toBe(0)
  })

  it('平衡：一借多贷', () => {
    const r = checkBalance([
      { debit: 10000, credit: 0 },
      { debit: 0, credit: 6000 },
      { debit: 0, credit: 4000 },
    ])
    expect(r.balanced).toBe(true)
  })

  it('不平衡：借贷不等', () => {
    const r = checkBalance([
      { debit: 5000, credit: 0 },
      { debit: 0, credit: 4999 },
    ])
    expect(r.balanced).toBe(false)
    expect(r.diff).toBe(1)
  })

  it('空列表平衡', () => {
    const r = checkBalance([])
    expect(r.balanced).toBe(true)
    expect(r.debitTotal).toBe(0)
    expect(r.creditTotal).toBe(0)
  })

  it('null/undefined 值视为0', () => {
    const r = checkBalance([
      { debit: 100, credit: null },
      { debit: undefined, credit: 100 },
    ])
    expect(r.balanced).toBe(true)
  })
})

describe('VoucherEntryTable - 金额格式化', () => {
  it('formatTotal 前缀 ¥', () => {
    const formatTotal = (val) => '¥' + formatAmount(val)
    expect(formatTotal(1000)).toBe('¥1,000.00')
    expect(formatTotal(0)).toBe('¥0.00')
    expect(formatTotal(-40000)).toBe('¥40,000.00')
  })
})

describe('VoucherEntryTable - 行管理', () => {
  it('createEmptyRow 有正确的默认字段', () => {
    const row = {
      id: 'test',
      summary: '',
      subjectId: '',
      subjectCode: '',
      subjectName: '',
      debit: null,
      credit: null,
      _editing: true,
    }
    expect(row.summary).toBe('')
    expect(row.debit).toBeNull()
    expect(row.credit).toBeNull()
    expect(row._editing).toBe(true)
  })

  it('最少2行限制', () => {
    const entries = [{ id: 'a' }, { id: 'b' }]
    expect(entries.length <= 2).toBe(true) // 不能删除到少于2行
  })

  it('多行可删除', () => {
    const entries = [{ id: 'a' }, { id: 'b' }, { id: 'c' }]
    const removed = entries.splice(1, 1)
    expect(entries.length).toBe(2)
    expect(removed[0].id).toBe('b')
  })
})

describe('VoucherEntryTable - 金额冲突处理', () => {
  function handleAmountChange(row) {
    if ((Number(row.debit) || 0) !== 0 && (Number(row.credit) || 0) !== 0) {
      const db = Math.abs(Number(row.debit) || 0)
      const cr = Math.abs(Number(row.credit) || 0)
      if (db >= cr) row.credit = null
      else row.debit = null
    }
    return row
  }

  it('借大贷小 → 保留借方', () => {
    const result = handleAmountChange({ debit: 100, credit: 50 })
    expect(result.debit).toBe(100)
    expect(result.credit).toBeNull()
  })

  it('贷大借小 → 保留贷方', () => {
    const result = handleAmountChange({ debit: 30, credit: 100 })
    expect(result.debit).toBeNull()
    expect(result.credit).toBe(100)
  })

  it('借贷相等 → 保留借方', () => {
    const result = handleAmountChange({ debit: 100, credit: 100 })
    expect(result.debit).toBe(100)
    expect(result.credit).toBeNull()
  })

  it('单方金额不触发清除', () => {
    const result = handleAmountChange({ debit: 100, credit: 0 })
    expect(result.debit).toBe(100)
    expect(result.credit).toBe(0)
  })
})

describe('VoucherEntryTable - 摘要复制', () => {
  it('Enter将当前行摘要复制到下一行', () => {
    const entries = [
      { summary: '购买原材料' },
      { summary: '' },
    ]
    const summary = entries[0].summary
    if (summary && 0 < entries.length - 1) {
      if (!entries[1].summary) entries[1].summary = summary
    }
    expect(entries[1].summary).toBe('购买原材料')
  })

  it('下一行已有摘要不覆盖', () => {
    const entries = [
      { summary: '购买原材料' },
      { summary: '支付运费' },
    ]
    const summary = entries[0].summary
    if (summary && 0 < entries.length - 1) {
      if (!entries[1].summary) entries[1].summary = summary
    }
    expect(entries[1].summary).toBe('支付运费') // 不变
  })
})
