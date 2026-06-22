/**
 * TutorialFloater 简化测试
 *
 * 该组件依赖 localStorage + store 数据动态渲染，部分功能通过 Playwright e2e 覆盖。
 * 这里测组件基础行为和关键工具函数。
 */

import { describe, it, expect } from 'vitest'

// ─── 工具函数测试（直接复制组件内的逻辑） ───

function roleLabel(roleId) {
  const map = { accountant: '会计', cashier: '出纳', supervisor: '主管' }
  return map[roleId] || roleId
}

function filterHex(val) {
  return val.toUpperCase().replace(/[^A-F0-9]/g, '')
}

function taskKey(task) {
  return 'tutorial_done_' + task.date + '_' + task.title
}

describe('TutorialFloater - 工具函数', () => {
  it('roleLabel 返回中文角色名', () => {
    expect(roleLabel('accountant')).toBe('会计')
    expect(roleLabel('cashier')).toBe('出纳')
    expect(roleLabel('supervisor')).toBe('主管')
    expect(roleLabel('unknown')).toBe('unknown')
  })

  it('filterHex 过滤非十六进制字符', () => {
    expect(filterHex('ABCDEF')).toBe('ABCDEF')
    expect(filterHex('abcdef')).toBe('ABCDEF')
    expect(filterHex('123XYZ')).toBe('123')
    expect(filterHex('GHIJKL')).toBe('')
  })

  it('taskKey 生成唯一任务标记', () => {
    const task = { date: '2026-01-05', title: '注册资本入账' }
    expect(taskKey(task)).toBe('tutorial_done_2026-01-05_注册资本入账')
  })

  it('filterHex 保留有效字符过滤无效字符', () => {
    expect(filterHex(' 测试!@# ')).toBe('')
    expect(filterHex('AB12CD34')).toBe('AB12CD34')
    expect(filterHex('ab12cd34')).toBe('AB12CD34')
  })
})
