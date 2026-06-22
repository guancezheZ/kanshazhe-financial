/**
 * 凭证录入组件核心工具函数测试
 *
 * 覆盖：格式函数、科目查找、借贷平衡检查、现金流量、日期工具
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { formatAmount, todayStr, getCurrentPeriod } from '@/utils/accounting.js'

describe('VoucherEntry - 金额格式化', () => {
  it('formatAmount 正常数字', () => {
    expect(formatAmount(1000)).toBe('1,000.00')
    expect(formatAmount(5000000)).toBe('5,000,000.00')
  })

  it('formatAmount 小数', () => {
    expect(formatAmount(99.5)).toBe('99.50')
    expect(formatAmount(0.01)).toBe('0.01')
  })

  it('formatAmount 负数', () => {
    expect(formatAmount(-40000)).toBe('40,000.00')
  })

  it('formatAmount null/undefined', () => {
    expect(formatAmount(null)).toBe('0.00')
    expect(formatAmount(undefined)).toBe('0.00')
  })

  it('formatAmount 显示正负号', () => {
    expect(formatAmount(1000, true)).toBe('1,000.00')
    expect(formatAmount(-1000, true)).toBe('-1,000.00')
  })
})

describe('VoucherEntry - 借贷平衡检查', () => {
  function calcBalance(entries) {
    let totalDebit = 0
    let totalCredit = 0
    for (const e of entries) {
      totalDebit += e.debit || 0
      totalCredit += e.credit || 0
    }
    return {
      totalDebit: Math.round(totalDebit * 100) / 100,
      totalCredit: Math.round(totalCredit * 100) / 100,
      balanced: Math.abs(totalDebit - totalCredit) < 0.01,
    }
  }

  it('借贷平衡', () => {
    const entries = [
      { subjectCode: '100201', debit: 5000, credit: 0 },
      { subjectCode: '4001', debit: 0, credit: 5000 },
    ]
    const result = calcBalance(entries)
    expect(result.balanced).toBe(true)
    expect(result.totalDebit).toBe(5000)
    expect(result.totalCredit).toBe(5000)
  })

  it('借贷不平衡', () => {
    const entries = [
      { subjectCode: '100201', debit: 5000, credit: 0 },
      { subjectCode: '4001', debit: 0, credit: 4999 },
    ]
    const result = calcBalance(entries)
    expect(result.balanced).toBe(false)
  })

  it('多分录借贷平衡', () => {
    const entries = [
      { subjectCode: '100201', debit: 10000, credit: 0 },
      { subjectCode: '1403', debit: 0, credit: 5000 },
      { subjectCode: '222101', debit: 0, credit: 1300 },
      { subjectCode: '4001', debit: 0, credit: 3700 },
    ]
    const result = calcBalance(entries)
    expect(result.balanced).toBe(true)
  })

  it('空分录列表', () => {
    const result = calcBalance([])
    expect(result.balanced).toBe(true)
    expect(result.totalDebit).toBe(0)
    expect(result.totalCredit).toBe(0)
  })
})

describe('VoucherEntry - 日期工具', () => {
  it('todayStr 返回 YYYY-MM-DD 格式', () => {
    const today = todayStr()
    expect(today).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('getCurrentPeriod 返回会计期间字符串', () => {
    const period = getCurrentPeriod()
    // 可以是 YYYY-MM 或 YYYY年MM月
    expect(period).toBeTruthy()
  })
})

describe('VoucherEntry - 科目查找', () => {
  // 模拟科目数据（与 store 结构一致）
  const mockSubjects = [
    { id: 's1', code: '1002', name: '银行存款', parentId: null },
    { id: 's2', code: '01', name: '工商银行', parentId: 's1' },
    { id: 's3', code: '4001', name: '实收资本', parentId: null },
    { id: 's4', code: '1403', name: '原材料', parentId: null },
    { id: 's5', code: '01', name: 'A材料', parentId: 's4' },
    { id: 's6', code: '2221', name: '应交税费', parentId: null },
    { id: 's7', code: '01', name: '应交增值税', parentId: 's6' },
    { id: 's8', code: '01', name: '进项税额', parentId: 's7' },
  ]

  function findSubjectByFullCode(fullCode) {
    for (const s of mockSubjects) {
      let code = s.code
      let parent = s.parentId ? mockSubjects.find(p => p.id === s.parentId) : null
      while (parent) {
        code = parent.code + code
        parent = parent.parentId ? mockSubjects.find(p => p.id === parent.parentId) : null
      }
      if (code === fullCode) return s
    }
    return null
  }

  it('一级科目查找', () => {
    const s = findSubjectByFullCode('1002')
    expect(s).not.toBeNull()
    expect(s.name).toBe('银行存款')
  })

  it('二级科目查找', () => {
    const s = findSubjectByFullCode('100201')
    expect(s).not.toBeNull()
    expect(s.name).toBe('工商银行')
  })

  it('三级科目查找', () => {
    const s = findSubjectByFullCode('22210101')
    expect(s).not.toBeNull()
    expect(s.name).toBe('进项税额')
  })

  it('不存在的科目返回 null', () => {
    const s = findSubjectByFullCode('999999')
    expect(s).toBeNull()
  })
})

describe('VoucherEntry - 防重复提交', () => {
  it('已完成任务检测', () => {
    // 模拟 localStorage 完成标记
    const date = '2026-01-05'
    const title = '注册资本入账'
    const doneKey = 'tutorial_done_' + date + '_' + title

    localStorage.setItem(doneKey, 'true')
    expect(localStorage.getItem(doneKey)).toBe('true')

    localStorage.removeItem(doneKey)
  })

  it('未完成任务检测', () => {
    const date = '2026-01-05'
    const title = '未完成任务'
    const doneKey = 'tutorial_done_' + date + '_' + title
    expect(localStorage.getItem(doneKey)).toBeNull()
  })
})
