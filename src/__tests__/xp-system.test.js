/**
 * XP/等级/成就系统测试
 *
 * 覆盖：等级计算、XP 累积、成就解锁、边界情况
 */

import { describe, it, expect } from 'vitest'
import { calcLevel, LEVELS, MAX_LEVEL, XP_BASE, XP_FIRST_BONUS, ACHIEVEMENTS } from '@/data/xp-system.js'
import { addXPAndCheckLevel, checkAchievements } from '@/data/xp-system.js'

describe('XP 系统 - 等级计算', () => {
  it('0 XP = 等级1 (见习生)', () => {
    const info = calcLevel(0)
    expect(info.level).toBe(1)
    expect(info.title).toBe('见习生')
    expect(info.xpProgress).toBe(0)
  })

  it('边界值：刚好达到某级的 XP', () => {
    const info = calcLevel(30)
    expect(info.level).toBe(2)
    expect(info.title).toBe('账房学徒')
  })

  it('边界值：差1XP未升级', () => {
    const info = calcLevel(29)
    expect(info.level).toBe(1)
    expect(info.title).toBe('见习生')
  })

  it('中间值：正确计算进度', () => {
    const info = calcLevel(100)
    expect(info.level).toBe(3) // 核算助手 >= 80
    expect(info.title).toBe('核算助手')
    expect(info.xpProgress).toBe(20) // 100-80
    expect(info.xpToNext).toBe(80) // 160-80
  })

  it('满级：财务传说', () => {
    const info = calcLevel(99999)
    expect(info.level).toBe(13)
    expect(info.title).toBe('财务传说')
    expect(info.isMaxLevel).toBe(true)
    expect(info.nextTitle).toBe(null)
  })

  it('负XP = 等级1', () => {
    const info = calcLevel(-100)
    expect(info.level).toBe(1)
  })

  it('字符串数字自动转换', () => {
    const info = calcLevel('150')
    expect(info.level).toBe(3)
  })

  it('null/undefined = 等级1', () => {
    expect(calcLevel(null).level).toBe(1)
    expect(calcLevel(undefined).level).toBe(1)
  })

  it('所有等级都能正确计算', () => {
    for (let i = 0; i < LEVELS.length; i++) {
      const lvl = LEVELS[i]
      const info = calcLevel(lvl.xpRequired)
      expect(info.level).toBe(lvl.level)
      expect(info.title).toBe(lvl.title)
    }
  })
})

describe('XP 系统 - XP 累积', () => {
  it('addXPAndCheckLevel 累加XP', () => {
    const data = { xp: 0, completedTasks: [], firstCompletes: [], streak: 0, maxStreak: 0, roleCounts: { accountant: 0, cashier: 0 } }
    const result = addXPAndCheckLevel(15, data)
    expect(data.xp).toBe(15)
    expect(result.didLevelUp).toBe(false)
  })

  it('累加后升级', () => {
    const data = { xp: 25, completedTasks: [], firstCompletes: [], streak: 0, maxStreak: 0, roleCounts: { accountant: 0, cashier: 0 } }
    const result = addXPAndCheckLevel(10, data)
    expect(data.xp).toBe(35)
    expect(result.didLevelUp).toBe(true) // 25+10=35 > 30
    expect(result.newLevel).toBe(2)
  })

  it('跨多级升级', () => {
    const data = { xp: 0, completedTasks: [], firstCompletes: [], streak: 0, maxStreak: 0, roleCounts: { accountant: 0, cashier: 0 } }
    const result = addXPAndCheckLevel(300, data)
    expect(data.xp).toBe(300)
    expect(result.didLevelUp).toBe(true)
    expect(result.newLevel).toBeGreaterThanOrEqual(5)
  })
})

describe('XP 系统 - XP 基数', () => {
  it('各模式应有适当XP奖励', () => {
    expect(XP_BASE.practice).toBeGreaterThan(XP_BASE.guided)
    expect(XP_BASE.exam).toBeGreaterThan(XP_BASE.practice)
  })

  it('首次完成有额外奖励', () => {
    expect(XP_FIRST_BONUS).toBe(5)
  })
})

describe('XP 系统 - 成就系统', () => {
  function makeData(overrides = {}) {
    return {
      xp: 0,
      completedTasks: [],
      firstCompletes: [],
      streak: 0,
      maxStreak: 0,
      examPerfect: false,
      monthComplete: false,
      quarterComplete: false,
      manufacturingComplete: false,
      commercialComplete: false,
      serviceComplete: false,
      constructionComplete: false,
      persistentWin: false,
      roleCounts: { accountant: 0, cashier: 0 },
      ...overrides,
    }
  }

  function makeAchievements() {
    const obj = {}
    for (const a of ACHIEVEMENTS) obj[a.id] = { unlocked: false, unlockedAt: null }
    return obj
  }

  it('完成任务0个 → 无成就解锁', () => {
    const data = makeData()
    const achievements = makeAchievements()
    const result = checkAchievements(data, achievements, 'accountant')
    expect(result.newlyUnlocked.length).toBe(0)
  })

  it('完成1个任务 → 解锁"初试啼声"', () => {
    const data = makeData({ completedTasks: ['task1'] })
    const achievements = makeAchievements()
    const result = checkAchievements(data, achievements, 'accountant')
    expect(result.newlyUnlocked.some(a => a.id === 'first_task')).toBe(true)
  })

  it('完成10个任务 → 解锁"小试牛刀"', () => {
    const data = makeData({ completedTasks: Array(10).fill('x') })
    const achievements = makeAchievements()
    const result = checkAchievements(data, achievements, 'accountant')
    expect(result.newlyUnlocked.some(a => a.id === 'ten_tasks')).toBe(true)
  })

  it('完成500个任务 → 解锁"千锤百炼"', () => {
    const data = makeData({ completedTasks: Array(500).fill('x') })
    const achievements = makeAchievements()
    const result = checkAchievements(data, achievements, 'accountant')
    expect(result.newlyUnlocked.some(a => a.id === 'five_hundred_tasks')).toBe(true)
  })

  it('最高连对10题 → 解锁"十连冠"', () => {
    const data = makeData({ maxStreak: 10 })
    const achievements = makeAchievements()
    const result = checkAchievements(data, achievements, 'accountant')
    expect(result.newlyUnlocked.some(a => a.id === 'streak_10')).toBe(true)
  })

  it('制造业全通 → 解锁"工业巨匠"', () => {
    const data = makeData({ manufacturingComplete: true })
    const achievements = makeAchievements()
    const result = checkAchievements(data, achievements, 'accountant')
    expect(result.newlyUnlocked.some(a => a.id === 'manufacturing_complete')).toBe(true)
  })

  it('双角色各30任务 → 解锁"双面能手"', () => {
    const data = makeData({ roleCounts: { accountant: 30, cashier: 30 } })
    const achievements = makeAchievements()
    const result = checkAchievements(data, achievements, 'accountant')
    expect(result.newlyUnlocked.some(a => a.id === 'role_master')).toBe(true)
  })

  it('成就不解锁两次', () => {
    const data = makeData({ completedTasks: ['task1'] })
    const achievements = makeAchievements()
    achievements.first_task.unlocked = true // 已解锁
    const result = checkAchievements(data, achievements, 'accountant')
    expect(result.newlyUnlocked.length).toBe(0)
  })

  it('应有17项成就定义', () => {
    expect(ACHIEVEMENTS.length).toBe(17)
  })

  it('应有13个等级', () => {
    expect(LEVELS.length).toBe(13)
    expect(MAX_LEVEL.title).toBe('财务传说')
  })
})
