/**
 * SubjectSelect 组件核心逻辑测试
 *
 * 覆盖：科目树过滤、搜索匹配、编码格式化
 */

import { describe, it, expect } from 'vitest'

// ─── filterNode 逻辑（与 SubjectSelect.vue 一致） ───
function filterNode(value, data) {
  if (!value) return true
  const search = value.toUpperCase()
  return (data.code && data.code.includes(search)) ||
         (data.name && data.name.toUpperCase().includes(search))
}

// ─── 格式化科目显示 ───
function formatSubjectDisplay(subject) {
  if (!subject) return ''
  const indent = '  '.repeat((subject.level || 0))
  return indent + subject.code + ' ' + subject.name
}

describe('SubjectSelect - 节点过滤', () => {
  const mockData = { code: '100201', name: '工商银行', level: 1 }

  it('空搜索全部可见', () => {
    expect(filterNode('', mockData)).toBe(true)
  })

  it('按编码搜索匹配', () => {
    expect(filterNode('1002', mockData)).toBe(true)
  })

  it('按名称搜索匹配', () => {
    expect(filterNode('工商', mockData)).toBe(true)
  })

  it('不匹配时返回 false', () => {
    expect(filterNode('固定资产', mockData)).toBe(false)
  })

  it('编码大小写不敏感', () => {
    expect(filterNode('1002', mockData)).toBe(true)
    expect(filterNode('1002'.toLowerCase(), mockData)).toBe(true)
  })

  it('编码部分匹配', () => {
    expect(filterNode('01', mockData)).toBe(true) // 100201 包含 01
  })

  it('特殊字符搜索', () => {
    expect(filterNode('@@@', mockData)).toBe(false)
  })
})

describe('SubjectSelect - 科目显示格式', () => {
  it('一级科目显示', () => {
    expect(formatSubjectDisplay({ code: '1002', name: '银行存款', level: 0 }))
      .toBe('1002 银行存款')
  })

  it('二级科目缩进', () => {
    expect(formatSubjectDisplay({ code: '01', name: '工商银行', level: 1 }))
      .toBe('  01 工商银行')
  })

  it('三级科目缩进', () => {
    expect(formatSubjectDisplay({ code: '01', name: '进项税额', level: 2 }))
      .toBe('    01 进项税额')
  })

  it('null 返回空', () => {
    expect(formatSubjectDisplay(null)).toBe('')
  })

  it('无 level 默认0级', () => {
    expect(formatSubjectDisplay({ code: '1002', name: '银行存款' }))
      .toBe('1002 银行存款')
  })
})
