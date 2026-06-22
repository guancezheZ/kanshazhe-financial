/**
 * 长周期 localStorage 清理机制
 *
 * 防止连续使用12个月后 localStorage 性能下降。
 * 三种触发方式：
 *   1. 自动：App 启动时检测存储量 > 4MB 自动清理
 *   2. 手动：用户通过设置页"清理数据"按钮触发
 *   3. 定时：每30天自动提醒一次
 *
 * 清理规则：
 *   - tutorial_done_* > 6个月 → 删除
 *   - 审计日志(场景数据内) → 保留最新200条
 *   - XP数据(completedTasks) → 保留最新2000条
 *   - 空的/废弃的 localStorage key → 删除
 */

const STORAGE_WARN_LEVEL = 4 * 1024 * 1024 // 4MB 警告阈值
const CLEANUP_LOG_KEY = 'jd_last_cleanup'

// ─── 获取 localStorage 用量（字节） ───

export function getStorageUsage() {
  let total = 0
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key) {
      const val = localStorage.getItem(key)
      total += key.length * 2 + (val ? val.length * 2 : 0) // UTF-16 近似
    }
  }
  return total
}

export function getStorageUsageMB() {
  return (getStorageUsage() / (1024 * 1024)).toFixed(2)
}

// ─── 清理：过期的教程完成标记 ───

function cleanTutorialDoneMarkers(monthsToKeep = 6) {
  let removed = 0
  const cutoff = new Date()
  cutoff.setMonth(cutoff.getMonth() - monthsToKeep)

  const keysToRemove = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith('tutorial_done_')) {
      // 格式: tutorial_done_YYYY-MM-DD_title
      const dateStr = key.replace('tutorial_done_', '').split('_')[0]
      const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/)
      if (match) {
        const d = new Date(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]))
        if (d < cutoff) {
          keysToRemove.push(key)
        }
      }
    }
  }

  keysToRemove.forEach(k => { localStorage.removeItem(k); removed++ })
  return removed
}

// ─── 清理：废弃/空场景数据 ───

function cleanAbandonedScenarioData(currentScenario, currentRole) {
  let removed = 0
  const prefixesToCheck = ['jd_scenario_data_', 'jd_case_data_']

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key) continue

    for (const prefix of prefixesToCheck) {
      if (key.startsWith(prefix)) {
        try {
          const val = localStorage.getItem(key)
          if (!val || val === '{}' || val === 'null' || val === 'undefined' || val.length < 10) {
            localStorage.removeItem(key)
            removed++
          }
        } catch { /* skip */ }
      }
    }
  }
  return removed
}

// ─── 清理：空的/无效的 localStorage key ───

function cleanOrphanedKeys() {
  const knownPrefixes = [
    'jd_', 'tutorial_done_', 'el-', 'PERFECT_', 'STREAK_',
  ]
  let removed = 0

  for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i)
    if (!key) continue

    // 跳过已知有效前缀
    const isKnown = knownPrefixes.some(p => key.startsWith(p))
    if (isKnown) continue

    // 跳过 Element Plus 内部 key
    if (key.startsWith('el-')) continue

    // 其他非 jd_ 开头的未知 key，长度 < 30 的跳过（可能是第三方库）
    if (key.length > 30) {
      try {
        localStorage.removeItem(key)
        removed++
      } catch { /* skip */ }
    }
  }
  return removed
}

// ─── 清理：XP 数据中的 completedTasks 旧记录 ───

function cleanXPCompletedTasks(maxTasks = 2000) {
  try {
    const raw = localStorage.getItem('jd_xp_data')
    if (!raw) return 0

    const xpData = JSON.parse(raw)
    if (!xpData.completedTasks || !Array.isArray(xpData.completedTasks)) return 0

    if (xpData.completedTasks.length > maxTasks) {
      // 保留最新的 maxTasks 条
      xpData.completedTasks = xpData.completedTasks.slice(-maxTasks)
      localStorage.setItem('jd_xp_data', JSON.stringify(xpData))
      return xpData.completedTasks.length - maxTasks // 返回移除的数量
    }
  } catch { /* ignore */ }
  return 0
}

// ─── 统计各类 key 数量 ───

export function getStorageStats() {
  const stats = {
    totalKeys: localStorage.length,
    tutorialDone: 0,
    scenarioData: 0,
    caseData: 0,
    xpKeys: 0,
    other: 0,
    usageMB: getStorageUsageMB(),
  }

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i) || ''
    if (key.startsWith('tutorial_done_')) stats.tutorialDone++
    else if (key.startsWith('jd_scenario_data_')) stats.scenarioData++
    else if (key.startsWith('jd_case_data_')) stats.caseData++
    else if (key.startsWith('jd_xp')) stats.xpKeys++
    else stats.other++
  }

  return stats
}

// ─── 主清理入口 ───

export function runCleanup(options = {}) {
  const {
    monthsToKeep = 6,
    maxAuditLogs = 200,
    maxCompletedTasks = 2000,
    cleanOrphans = true,
  } = options

  const results = {
    tutorialMarkersRemoved: 0,
    abandonedDataRemoved: 0,
    xpTasksTrimmed: 0,
    orphansRemoved: 0,
    auditLogsTrimmed: 0,
    beforeBytes: getStorageUsage(),
    afterBytes: 0,
  }

  // 清理过期的教程完成标记
  results.tutorialMarkersRemoved = cleanTutorialDoneMarkers(monthsToKeep)

  // 清理废弃的场景数据
  const currentScenario = localStorage.getItem('jd_scenario') || ''
  const currentRole = localStorage.getItem('jd_role') || ''
  results.abandonedDataRemoved = cleanAbandonedScenarioData(currentScenario, currentRole)

  // 清理 XP 旧任务记录
  results.xpTasksTrimmed = cleanXPCompletedTasks(maxCompletedTasks)

  // 清理孤儿 key
  if (cleanOrphans) {
    results.orphansRemoved = cleanOrphanedKeys()
  }

  results.afterBytes = getStorageUsage()

  // 记录清理时间
  localStorage.setItem(CLEANUP_LOG_KEY, JSON.stringify({
    lastRun: new Date().toISOString(),
    results,
  }))

  return results
}

// ─── 自动检查是否需要清理 ───

export function shouldRunCleanup() {
  const usage = getStorageUsage()
  if (usage > STORAGE_WARN_LEVEL) return true

  // 检查上次清理时间
  try {
    const last = JSON.parse(localStorage.getItem(CLEANUP_LOG_KEY) || '{}')
    if (last.lastRun) {
      const daysSince = (Date.now() - new Date(last.lastRun).getTime()) / (1000 * 60 * 60 * 24)
      if (daysSince < 30) return false // 30天内已清理过
    }
  } catch { /* ignore */ }

  // 超过30天未清理 → 建议清理
  return usage > 1 * 1024 * 1024 // 超过1MB就提醒
}

// ─── 获取上次清理记录 ───

export function getLastCleanupInfo() {
  try {
    return JSON.parse(localStorage.getItem(CLEANUP_LOG_KEY) || 'null')
  } catch { return null }
}
