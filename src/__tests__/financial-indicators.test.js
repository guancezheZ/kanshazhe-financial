/**
 * FinancialIndicators 核心函数测试
 */

import { describe, it, expect } from 'vitest'

function judgmentType(j) {
  if (j === '良好') return 'success'
  if (j === '一般' || j === '适中') return 'warning'
  if (j === '偏低' || j === '偏高' || j === '警惕') return 'danger'
  return 'info'
}

function formatValue(ind) {
  if (ind.value === null || ind.value === '—') return '—'
  if (ind.unit === '%') return ind.value.toFixed(2)
  if (ind.unit === '次') return ind.value.toFixed(2)
  return ind.value
}

describe('FinancialIndicators - 判断类型映射', () => {
  it('良好 → success', () => expect(judgmentType('良好')).toBe('success'))
  it('一般 → warning', () => expect(judgmentType('一般')).toBe('warning'))
  it('适中 → warning', () => expect(judgmentType('适中')).toBe('warning'))
  it('偏低 → danger', () => expect(judgmentType('偏低')).toBe('danger'))
  it('偏高 → danger', () => expect(judgmentType('偏高')).toBe('danger'))
  it('警惕 → danger', () => expect(judgmentType('警惕')).toBe('danger'))
  it('未知 → info', () => expect(judgmentType('未知')).toBe('info'))
  it('空字符串 → info', () => expect(judgmentType('')).toBe('info'))
})

describe('FinancialIndicators - 数值格式化', () => {
  it('null → 横线', () => {
    expect(formatValue({ value: null, unit: '%' })).toBe('—')
  })

  it('横线值 → 横线', () => {
    expect(formatValue({ value: '—', unit: '%' })).toBe('—')
  })

  it('百分比保留两位小数', () => {
    expect(formatValue({ value: 12.3456, unit: '%' })).toBe('12.35')
  })

  it('次数保留两位小数', () => {
    expect(formatValue({ value: 3.14159, unit: '次' })).toBe('3.14')
  })

  it('金额原样返回', () => {
    expect(formatValue({ value: 1000000, unit: '元' })).toBe(1000000)
  })

  it('无单位原样返回', () => {
    expect(formatValue({ value: 0.5, unit: '' })).toBe(0.5)
  })
})
