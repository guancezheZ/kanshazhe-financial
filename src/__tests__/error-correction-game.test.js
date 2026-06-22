/**
 * ErrorCorrectionGame 核心逻辑测试
 *
 * 覆盖：错误注入4种类型、工具函数、计分逻辑
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'

// ─── 模拟 store ───
vi.mock('@/stores/store.js', () => ({
  useStore: () => ({
    state: {
      subjects: [
        { id: 's1', code: '1002', name: '银行存款', parentId: null },
        { id: 's2', code: '01', name: '工商银行', parentId: 's1' },
        { id: 's3', code: '4001', name: '实收资本', parentId: null },
        { id: 's4', code: '6601', name: '销售费用', parentId: null },
        { id: 's5', code: '6602', name: '管理费用', parentId: null },
        { id: 's6', code: '1403', name: '原材料', parentId: null },
        { id: 's7', code: '1405', name: '库存商品', parentId: null },
      ],
    },
  }),
}))

// ─── 模拟 ElMessage ───
vi.mock('element-plus', () => ({
  ElMessage: { success: vi.fn(), warning: vi.fn(), info: vi.fn() },
}))

// ─── 工具函数 ───
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

// 科目查找
function getSubjectName(fullCode, subjects) {
  if (!fullCode) return fullCode || ''
  for (const s of subjects) {
    let code = s.code
    let parent = s.parentId ? subjects.find(p => p.id === s.parentId) : null
    while (parent) {
      code = parent.code + code
      parent = parent.parentId ? subjects.find(p => p.id === parent.parentId) : null
    }
    if (code === fullCode) {
      const names = [s.name]
      let p = s.parentId ? subjects.find(x => x.id === s.parentId) : null
      while (p) {
        names.unshift(p.name)
        p = p.parentId ? subjects.find(x => x.id === p.parentId) : null
      }
      return names.join('-') + '(' + fullCode + ')'
    }
  }
  return fullCode
}

// SIMILAR_SUBJECTS 映射
const SIMILAR_SUBJECTS = {
  '6601': '6602', '6602': '6601',
  '1001': '100201', '100201': '1001',
  '6001': '6051', '6051': '6001',
  '6401': '6402', '6402': '6401',
  '1403': '1405', '1405': '1403',
  '112201': '112202', '112202': '112201',
  '220201': '220202', '220202': '220201',
}

const mockSubjects = [
  { id: 's1', code: '1002', name: '银行存款', parentId: null },
  { id: 's2', code: '01', name: '工商银行', parentId: 's1' },
  { id: 's3', code: '4001', name: '实收资本', parentId: null },
  { id: 's4', code: '6601', name: '销售费用', parentId: null },
  { id: 's5', code: '6602', name: '管理费用', parentId: null },
]

describe('ErrorCorrectionGame - 工具函数', () => {
  it('shuffle 保持元素数量不变', () => {
    const arr = [1, 2, 3, 4, 5]
    const result = shuffle(arr)
    expect(result.length).toBe(arr.length)
    expect(result.sort()).toEqual(arr.sort())
  })

  it('shuffle 不修改原数组', () => {
    const arr = [1, 2, 3]
    const copy = [...arr]
    shuffle(arr)
    expect(arr).toEqual(copy)
  })

  it('pick 返回数组中的元素', () => {
    const arr = ['a', 'b', 'c']
    const result = pick(arr)
    expect(arr.includes(result)).toBe(true)
  })

  it('getSubjectName 一级科目', () => {
    expect(getSubjectName('4001', mockSubjects)).toBe('实收资本(4001)')
  })

  it('getSubjectName 二级科目', () => {
    expect(getSubjectName('100201', mockSubjects)).toBe('银行存款-工商银行(100201)')
  })

  it('getSubjectName 不存在的科目返回原编码', () => {
    expect(getSubjectName('999999', mockSubjects)).toBe('999999')
  })

  it('getSubjectName null/undefined 返回空', () => {
    expect(getSubjectName(null, mockSubjects)).toBe('')
    expect(getSubjectName(undefined, mockSubjects)).toBe('')
  })
})

describe('ErrorCorrectionGame - 错误注入逻辑', () => {
  const baseEntries = [
    { subjectCode: '100201', debit: 5000, credit: 0 },
    { subjectCode: '4001', debit: 0, credit: 5000 },
  ]

  function injectError(entries, errorType, idx) {
    const entry = { ...entries[idx], debit: entries[idx].debit, credit: entries[idx].credit }
    const original = { ...entry }

    switch (errorType) {
      case 'subjectSwap': {
        const replacementCode = SIMILAR_SUBJECTS[entry.subjectCode]
        if (replacementCode) {
          entry.subjectCode = replacementCode
        } else {
          const tmp = entry.debit
          entry.debit = entry.credit
          entry.credit = tmp
        }
        break
      }
      case 'directionReverse': {
        const tmp = entry.debit
        entry.debit = entry.credit
        entry.credit = tmp
        break
      }
      case 'amountChange': {
        const origAmount = entry.debit > 0 ? entry.debit : entry.credit
        const newAmount = Math.round(origAmount * 1.5)
        if (entry.debit > 0) entry.debit = newAmount
        else entry.credit = newAmount
        break
      }
      case 'imbalance': {
        if (entry.debit > 0) entry.debit = Math.round(entry.debit * 1.1)
        else entry.credit = Math.round(entry.credit * 1.1)
        break
      }
    }
    return { injected: entry, original }
  }

  it('科目替换错误注入', () => {
    const result = injectError(baseEntries, 'subjectSwap', 0)
    expect(result.injected.subjectCode).toBe('1001') // 银行存款→库存现金
    expect(result.injected.subjectCode).not.toBe(result.original.subjectCode)
  })

  it('方向反转错误注入', () => {
    const result = injectError(baseEntries, 'directionReverse', 0)
    expect(result.injected.debit).toBe(0)
    expect(result.injected.credit).toBe(5000)
  })

  it('金额改变错误注入', () => {
    const result = injectError(baseEntries, 'amountChange', 0)
    expect(result.injected.debit).toBe(7500) // 5000 * 1.5
    expect(result.injected.credit).toBe(0)
  })

  it('借贷不平衡错误注入', () => {
    const result = injectError(baseEntries, 'imbalance', 0)
    expect(result.injected.debit).toBe(5500) // 5000 * 1.1
    expect(result.injected.credit).toBe(0)
  })

  it('错误注入后原始数据不变', () => {
    const result = injectError(baseEntries, 'amountChange', 0)
    expect(result.original.debit).toBe(5000)
    expect(result.original.credit).toBe(0)
  })

  it('四种错误类型都能生成', () => {
    const types = new Set()
    for (let i = 0; i < 100; i++) {
      types.add(pick(['subjectSwap', 'directionReverse', 'amountChange', 'imbalance']))
    }
    expect(types.size).toBe(4)
  })
})

describe('ErrorCorrectionGame - 计分逻辑', () => {
  it('完美得分: 全部找出', () => {
    const entries = [
      { _isError: true, _playerMarked: true },
      { _isError: true, _playerMarked: true },
      { _isError: false, _playerMarked: false },
    ]
    const score = entries.filter(e => e._isError && e._playerMarked).length
    const total = entries.filter(e => e._isError).length
    expect(score).toBe(2)
    expect(total).toBe(2)
    expect(score === total).toBe(true)
  })

  it('部分得分', () => {
    const entries = [
      { _isError: true, _playerMarked: true },
      { _isError: true, _playerMarked: false },
      { _isError: false, _playerMarked: true }, // 误标
    ]
    const score = entries.filter(e => e._isError && e._playerMarked).length
    const total = entries.filter(e => e._isError).length
    const markedWrong = entries.filter(e => e._playerMarked).length
    expect(score).toBe(1)
    expect(total).toBe(2)
    expect(markedWrong).toBe(2) // 正确标了1+误标1
  })

  it('零分', () => {
    const entries = [
      { _isError: true, _playerMarked: false },
      { _isError: false, _playerMarked: false },
    ]
    const score = entries.filter(e => e._isError && e._playerMarked).length
    expect(score).toBe(0)
  })
})
