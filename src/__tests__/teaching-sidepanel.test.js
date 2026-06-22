/**
 * TeachingSidePanel 核心函数测试
 */

import { describe, it, expect, beforeEach } from 'vitest'

function roleDisplayName(role) {
  const map = { cashier: '出纳', supervisor: '主管', accountant: '会计' }
  return map[role] || role
}

function roleTagType(role) {
  const map = { cashier: 'warning', supervisor: 'danger', accountant: 'primary' }
  return map[role] || 'info'
}

function filterByRole(tasks, role) {
  if (role === 'supervisor') return tasks
  if (role === 'cashier') return tasks.filter(t => t.role === 'cashier')
  return tasks.filter(t => !t.role || t.role === 'accountant' || t.role === 'supervisor')
}

describe('TeachingSidePanel - 角色显示名', () => {
  it('会计', () => expect(roleDisplayName('accountant')).toBe('会计'))
  it('出纳', () => expect(roleDisplayName('cashier')).toBe('出纳'))
  it('主管', () => expect(roleDisplayName('supervisor')).toBe('主管'))
  it('未知角色返回原值', () => expect(roleDisplayName('unknown')).toBe('unknown'))
})

describe('TeachingSidePanel - 角色标签类型', () => {
  it('会计', () => expect(roleTagType('accountant')).toBe('primary'))
  it('出纳', () => expect(roleTagType('cashier')).toBe('warning'))
  it('主管', () => expect(roleTagType('supervisor')).toBe('danger'))
  it('未知', () => expect(roleTagType('xxx')).toBe('info'))
})

describe('TeachingSidePanel - 任务角色过滤', () => {
  const tasks = [
    { title: 'task1', role: 'accountant' },
    { title: 'task2', role: 'cashier' },
    { title: 'task3', role: 'supervisor' },
    { title: 'task4' }, // 无角色
  ]

  it('会计看到会计+无角色任务', () => {
    const result = filterByRole(tasks, 'accountant')
    expect(result.length).toBe(3)
    expect(result.map(t => t.title)).toEqual(['task1', 'task3', 'task4'])
  })

  it('出纳只看出纳任务', () => {
    const result = filterByRole(tasks, 'cashier')
    expect(result.length).toBe(1)
    expect(result[0].title).toBe('task2')
  })

  it('主管看到全部', () => {
    const result = filterByRole(tasks, 'supervisor')
    expect(result.length).toBe(4)
  })

  it('空列表返回空', () => {
    expect(filterByRole([], 'accountant')).toEqual([])
  })
})
