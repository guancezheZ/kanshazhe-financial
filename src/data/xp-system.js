/**
 * XP 等级与成就系统
 *
 * 等级称号（13级，基于会计职业声望）
 * XP获取：引导+10、练习+15、考试+20、首次完成额外+5
 * 成就：涵盖数量、质量、探索等维度
 */

// ==================== 等级定义 ====================

export const LEVELS = [
  { level: 1,  title: '见习生',     icon: '📄', xpRequired: 0 },
  { level: 2,  title: '账房学徒',   icon: '📊', xpRequired: 30 },
  { level: 3,  title: '核算助手',   icon: '🧾', xpRequired: 80 },
  { level: 4,  title: '初级会计',   icon: '📋', xpRequired: 160 },
  { level: 5,  title: '中级会计',   icon: '📈', xpRequired: 280 },
  { level: 6,  title: '高级会计',   icon: '📑', xpRequired: 480 },
  { level: 7,  title: '财务主管',   icon: '⚖️', xpRequired: 800 },
  { level: 8,  title: '财务分析师', icon: '🔍', xpRequired: 1300 },
  { level: 9,  title: '财务经理',   icon: '🏛️', xpRequired: 2000 },
  { level: 10, title: '财务总监',   icon: '💼', xpRequired: 3000 },
  { level: 11, title: '首席财务官', icon: '👑', xpRequired: 4500 },
  { level: 12, title: '财务宗师',   icon: '🌟', xpRequired: 6500 },
  { level: 13, title: '财务传说',   icon: '🏆', xpRequired: 9500 },
]

/** 最高等级 */
export const MAX_LEVEL = LEVELS[LEVELS.length - 1]

/**
 * 根据XP计算当前等级和进度
 * @param {number} xp
 * @returns {{ level: number, title: string, icon: string, xpRequired: number, xpProgress: number, xpToNext: number, isMaxLevel: boolean }}
 */
export function calcLevel(xp) {
  const xpNum = Number(xp) || 0

  // 从高到低找当前等级
  let current = LEVELS[0]
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xpNum >= LEVELS[i].xpRequired) {
      current = LEVELS[i]
      break
    }
  }

  const isMaxLevel = current.level === MAX_LEVEL.level

  // 下一级需要的XP
  let nextLevel = null
  if (!isMaxLevel) {
    nextLevel = LEVELS.find(l => l.level === current.level + 1)
  }

  const currentRequired = current.xpRequired
  const nextRequired = nextLevel ? nextLevel.xpRequired : currentRequired
  const xpProgress = xpNum - currentRequired
  const xpToNext = nextRequired - currentRequired

  return {
    level: current.level,
    title: current.title,
    icon: current.icon,
    xpRequired: currentRequired,
    xpProgress: Math.max(0, xpProgress),
    xpToNext: Math.max(1, xpToNext),
    isMaxLevel,
    totalXp: xpNum,
    nextTitle: nextLevel ? nextLevel.title : null,
    nextIcon: nextLevel ? nextLevel.icon : null,
  }
}

/**
 * 计算从 fromLevel 到 toLevel 需要的总XP
 */
export function xpForLevels(fromLevel, toLevel) {
  let total = 0
  for (const l of LEVELS) {
    if (l.level > fromLevel && l.level <= toLevel) {
      total += l.xpRequired - (LEVELS.find(pl => pl.level === l.level - 1)?.xpRequired || 0)
    }
  }
  return total
}

// ==================== 模式XP基数 ====================

export const XP_BASE = {
  guided: 5,    // 引导模式：自动填入，仅给象征性XP
  practice: 15, // 练习模式：自主做答，标准XP
  exam: 25,     // 考试模式：独立完成无提示，最高奖励
}

export const XP_FIRST_BONUS = 5

// ==================== 成就定义 ====================

export const ACHIEVEMENTS = [
  {
    id: 'first_task',
    title: '初试啼声',
    icon: '🎯',
    description: '完成第一个教学任务',
    xpReward: 30,
    group: 'progress',
  },
  {
    id: 'ten_tasks',
    title: '小试牛刀',
    icon: '🔟',
    description: '累计完成10个教学任务',
    xpReward: 50,
    group: 'progress',
  },
  {
    id: 'hundred_tasks',
    title: '百战能手',
    icon: '💯',
    description: '累计完成100个教学任务',
    xpReward: 100,
    group: 'progress',
  },
  {
    id: 'five_hundred_tasks',
    title: '千锤百炼',
    icon: '⚡',
    description: '累计完成500个教学任务',
    xpReward: 200,
    group: 'progress',
  },
  {
    id: 'streak_5',
    title: '五连击',
    icon: '🔥',
    description: '连续5题全对',
    xpReward: 50,
    group: 'quality',
  },
  {
    id: 'streak_10',
    title: '十连冠',
    icon: '🌟',
    description: '连续10题全对',
    xpReward: 100,
    group: 'quality',
  },
  {
    id: 'exam_perfect',
    title: '考场霸主',
    icon: '🎓',
    description: '在考试模式下一次性满分通过',
    xpReward: 100,
    group: 'quality',
  },
  {
    id: 'month_complete',
    title: '月度全勤',
    icon: '📅',
    description: '完成一个月份的所有教学任务',
    xpReward: 80,
    group: 'explore',
  },
  {
    id: 'quarter_complete',
    title: '季度达人',
    icon: '📆',
    description: '完成一个季度（3个月）的所有任务',
    xpReward: 150,
    group: 'explore',
  },
  {
    id: 'manufacturing_complete',
    title: '工业巨匠',
    icon: '🏭',
    description: '完成制造业全部12个月的教学任务',
    xpReward: 500,
    group: 'explore',
  },
  {
    id: 'commercial_complete',
    title: '商界精英',
    icon: '🏪',
    description: '完成商业企业全部12个月的教学任务',
    xpReward: 500,
    group: 'explore',
  },
  {
    id: 'service_complete',
    title: '服务专家',
    icon: '💼',
    description: '完成服务业全部12个月的教学任务',
    xpReward: 500,
    group: 'explore',
  },
  {
    id: 'construction_complete',
    title: '筑梦师',
    icon: '🏗️',
    description: '完成建筑业全部12个月的教学任务',
    xpReward: 500,
    group: 'explore',
  },
  {
    id: 'persistence',
    title: '永不放弃',
    icon: '💪',
    description: '同一道题答错3次后终于答对',
    xpReward: 30,
    group: 'quality',
  },
  {
    id: 'role_master',
    title: '双面能手',
    icon: '🔄',
    description: '以会计和出纳角色各完成30个任务',
    xpReward: 150,
    group: 'explore',
  },
  {
    id: 'collector_5',
    title: '徽章收藏家',
    icon: '🏅',
    description: '累计获得5枚成就徽章',
    xpReward: 100,
    group: 'milestone',
  },
  {
    id: 'all_achievements',
    title: '圆满收官',
    icon: '👑',
    description: '解锁全部成就',
    xpReward: 500,
    group: 'milestone',
  },
]

export const ACHIEVEMENT_GROUPS = {
  progress: { title: '进度之路', icon: '📈' },
  quality: { title: '品质之道', icon: '⭐' },
  explore: { title: '探索之旅', icon: '🗺️' },
  milestone: { title: '里程碑', icon: '🏛️' },
}

/** localStorage key */
export const STORAGE_KEY_XP = 'jd_xp_data'
export const STORAGE_KEY_ACHIEVEMENTS = 'jd_achievements'

// ==================== localStorage 工具 ====================

/**
 * 读取XP数据
 * @returns {{ xp: number, completedTasks: string[], firstCompletes: string[], streak: number, maxStreak: number, roleCounts: { accountant: number, cashier: number } }}
 */
export function loadXPData() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_XP)) || getDefaultXPData()
  } catch {
    return getDefaultXPData()
  }
}

function getDefaultXPData() {
  return {
    xp: 0,
    completedTasks: [],
    firstCompletes: [],
    streak: 0,
    maxStreak: 0,
    roleCounts: { accountant: 0, cashier: 0 },
  }
}

export function saveXPData(data) {
  localStorage.setItem(STORAGE_KEY_XP, JSON.stringify(data))
}

/**
 * 读取成就状态
 * @returns {{ [id: string]: { unlocked: boolean, unlockedAt: string|null } }}
 */
export function loadAchievements() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_ACHIEVEMENTS)) || getDefaultAchievements()
  } catch {
    return getDefaultAchievements()
  }
}

function getDefaultAchievements() {
  const obj = {}
  for (const a of ACHIEVEMENTS) {
    obj[a.id] = { unlocked: false, unlockedAt: null }
  }
  return obj
}

export function saveAchievements(data) {
  localStorage.setItem(STORAGE_KEY_ACHIEVEMENTS, JSON.stringify(data))
}

/**
 * 添加XP并检查等级变化
 * @param {number} amount
 * @param {object} xpData
 * @returns {{ newLevel: number|null, didLevelUp: boolean, levelInfo: object }}
 */
export function addXPAndCheckLevel(amount, xpData) {
  const oldLevel = calcLevel(xpData.xp)
  xpData.xp += amount
  const newLevel = calcLevel(xpData.xp)
  return {
    newLevel: newLevel.level,
    didLevelUp: newLevel.level > oldLevel.level,
    levelInfo: newLevel,
    oldLevelInfo: oldLevel,
  }
}

/**
 * 检查所有成就是否达成
 * @param {object} xpData - 当前XP数据
 * @param {object} achievementData - 当前成就数据
 * @param {string} currentRole - 当前角色
 * @returns {{ newlyUnlocked: Array<{id: string, achievement: object}> }}
 */
export function checkAchievements(xpData, achievementData, currentRole) {
  const newlyUnlocked = []

  // 已完成的任务数量
  const totalDone = xpData.completedTasks.length
  const totalFirst = xpData.firstCompletes.length

  for (const ach of ACHIEVEMENTS) {
    if (achievementData[ach.id]?.unlocked) continue

    let unlocked = false

    switch (ach.id) {
      case 'first_task':
        unlocked = totalDone >= 1
        break
      case 'ten_tasks':
        unlocked = totalDone >= 10
        break
      case 'hundred_tasks':
        unlocked = totalDone >= 100
        break
      case 'five_hundred_tasks':
        unlocked = totalDone >= 500
        break
      case 'streak_5':
        unlocked = xpData.maxStreak >= 5
        break
      case 'streak_10':
        unlocked = xpData.maxStreak >= 10
        break
      case 'exam_perfect':
        unlocked = xpData.examPerfect || false
        break
      case 'month_complete':
        unlocked = xpData.monthComplete || false
        break
      case 'quarter_complete':
        unlocked = xpData.quarterComplete || false
        break
      case 'manufacturing_complete':
        unlocked = xpData.manufacturingComplete || false
        break
      case 'commercial_complete':
        unlocked = xpData.commercialComplete || false
        break
      case 'service_complete':
        unlocked = xpData.serviceComplete || false
        break
      case 'construction_complete':
        unlocked = xpData.constructionComplete || false
        break
      case 'persistence':
        unlocked = xpData.persistentWin || false
        break
      case 'role_master':
        unlocked = (xpData.roleCounts?.accountant || 0) >= 30 && (xpData.roleCounts?.cashier || 0) >= 30
        break
      case 'collector_5':
        unlocked = Object.values(achievementData).filter(a => a.unlocked).length >= 5
        break
      case 'all_achievements':
        // 除"圆满收官"自身外全部解锁
        unlocked = ACHIEVEMENTS.filter(a => a.id !== 'all_achievements')
          .every(a => achievementData[a.id]?.unlocked)
        break
    }

    if (unlocked) {
      achievementData[ach.id] = { unlocked: true, unlockedAt: new Date().toISOString() }
      newlyUnlocked.push({ id: ach.id, achievement: ach })
    }
  }

  return { newlyUnlocked }
}
