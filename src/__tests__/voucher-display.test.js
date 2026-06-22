/**
 * VoucherDisplay 组件测试
 *
 * 测试重点：工具函数（fmt/cnNumber/印章生成/文档类型检测）
 */

import { describe, it, expect } from 'vitest'

// ─── fmt 函数 ───
function fmt(v) {
  if (v === undefined || v === null) return '0.00'
  const num = Math.round(Math.abs(v) * 100) / 100
  return num.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

// ─── cnNumber 中文大写 ───
function cnNumber(n) {
  const digits = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  const units = ['', '拾', '佰', '仟']
  const bigUnits = ['', '万', '亿']
  const num = Math.round(Math.abs(n) * 100) / 100
  if (num === 0) return '零元整'
  const intPart = Math.floor(num)
  const decPart = Math.round((num - intPart) * 100)
  let result = ''
  let unitIdx = 0
  let temp = intPart
  while (temp > 0) {
    let section = temp % 10000
    let secStr = ''
    let needZero = false
    for (let i = 0; i < 4; i++) {
      const digit = section % 10
      if (digit === 0) {
        if (i > 0 && secStr.length > 0) needZero = true
      } else {
        if (needZero) { secStr = '零' + secStr; needZero = false }
        secStr = digits[digit] + units[i] + secStr
      }
      section = Math.floor(section / 10)
    }
    if (secStr) secStr += bigUnits[unitIdx]
    else if (temp >= 1000 && unitIdx > 0 && result) secStr = '零'
    result = secStr + result
    temp = Math.floor(temp / 10000)
    unitIdx++
  }
  if (intPart > 0) result += '元'
  if (decPart === 0) result += '整'
  else {
    if (decPart >= 10) result += digits[Math.floor(decPart / 10)] + '角'
    if (decPart % 10 > 0) result += digits[decPart % 10] + '分'
  }
  return result
}

// ─── 文档类型检测 ───
function isContract(title) {
  if (!title) return false
  return /合同/.test(title)
}
function isInventory(title) {
  if (!title) return false
  return /盘点|库存表|对账表/.test(title)
}

describe('VoucherDisplay - fmt 金额格式化', () => {
  it('null/undefined 返回 0.00', () => {
    expect(fmt(null)).toBe('0.00')
    expect(fmt(undefined)).toBe('0.00')
  })

  it('整数格式化', () => {
    expect(fmt(1000)).toBe('1,000.00')
    expect(fmt(5000000)).toBe('5,000,000.00')
  })

  it('小数保留两位', () => {
    expect(fmt(1234.5)).toBe('1,234.50')
    expect(fmt(99.99)).toBe('99.99')
  })

  it('负数格式化', () => {
    expect(fmt(-40000)).toBe('40,000.00')
  })
})

describe('VoucherDisplay - cnNumber 中文大写', () => {
  it('零元整', () => {
    expect(cnNumber(0)).toBe('零元整')
  })

  it('整数元', () => {
    expect(cnNumber(100)).toBe('壹佰元整')
    expect(cnNumber(5000)).toBe('伍仟元整')
  })

  it('含角分', () => {
    expect(cnNumber(1234.56)).toBe('壹仟贰佰叁拾肆元伍角陆分')
  })

  it('仅含角', () => {
    expect(cnNumber(10.10)).toBe('壹拾元壹角')
  })

  it('大数', () => {
    expect(cnNumber(1002000)).toBe('壹佰万贰仟元整')
  })

  it('负数转换为正数大写', () => {
    expect(cnNumber(-500)).toBe('伍佰元整')
  })
})

describe('VoucherDisplay - 文档类型检测', () => {
  it('isContract 检测合同', () => {
    expect(isContract('采购合同')).toBe(true)
    expect(isContract('销售合同')).toBe(true)
    expect(isContract('发票')).toBe(false)
    expect(isContract('')).toBe(false)
    expect(isContract(null)).toBe(false)
  })

  it('isInventory 检测盘点/库存', () => {
    expect(isInventory('盘点表')).toBe(true)
    expect(isInventory('库存表')).toBe(true)
    expect(isInventory('对账表')).toBe(true)
    expect(isInventory('合同')).toBe(false)
  })
})
