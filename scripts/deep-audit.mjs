/**
 * 深度数据审计脚本
 *
 * 第1轮全面测试：数据结构深度审计
 * - A. 全部分录借贷平衡校验
 * - B. 重复任务检测
 * - C. 任务数量异常扫描
 * - D. 必填字段完整性检查
 *
 * 用法：node scripts/deep-audit.mjs
 */

import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

// ═══════════════════════════════════════════════════════════
//  工具函数
// ═══════════════════════════════════════════════════════════

const PASS = '✅'
const FAIL = '❌'
const WARN = '⚠️ '

let totalErrors = 0
let totalWarnings = 0

function error(msg) { totalErrors++; console.log(`  ${FAIL} ${msg}`) }
function warn(msg) { totalWarnings++; console.log(`  ${WARN} ${msg}`) }
function pass(msg) { console.log(`  ${PASS} ${msg}`) }
function heading(title) { console.log(`\n═══════════════════════════════════════════\n${title}\n`) }

// ═══════════════════════════════════════════════════════════
//  A: 全模块分录借贷平衡 + 字段完整性
// ═══════════════════════════════════════════════════════════

function round2(n) { return Math.round(n * 100) / 100 }

/**
 * 检查 entries 数组的借贷平衡和字段完整性
 */
function auditEntryBalance(entries, taskPath, taskInfo = '') {
  if (!Array.isArray(entries)) return
  if (entries.length === 0) return // 空 entries 合法（如"清点库存"类任务）

  let totalDebit = 0
  let totalCredit = 0

  for (let i = 0; i < entries.length; i++) {
    const e = entries[i]

    // 必填字段
    if (e.subjectCode === undefined || e.subjectCode === null) {
      error(`${taskPath}.entries[${i}] 缺少 subjectCode ${taskInfo}`)
    }
    if (e.debit === undefined && e.credit === undefined) {
      error(`${taskPath}.entries[${i}] 同时缺少 debit 和 credit ${taskInfo}`)
    }

    // NaN/Infinity 检测
    if (typeof e.debit === 'number' && isNaN(e.debit)) {
      error(`${taskPath}.entries[${i}].debit = NaN ${taskInfo}`)
    }
    if (typeof e.credit === 'number' && isNaN(e.credit)) {
      error(`${taskPath}.entries[${i}].credit = NaN ${taskInfo}`)
    }
    if (e.debit === Infinity || e.debit === -Infinity) {
      error(`${taskPath}.entries[${i}].debit = ${e.debit} ${taskInfo}`)
    }
    if (e.credit === Infinity || e.credit === -Infinity) {
      error(`${taskPath}.entries[${i}].credit = ${e.credit} ${taskInfo}`)
    }

    // 汇总
    totalDebit += typeof e.debit === 'number' ? e.debit : 0
    totalCredit += typeof e.credit === 'number' ? e.credit : 0
  }

  // 借贷平衡检查（允许0.02的浮点误差）
  if (Math.abs(totalDebit - totalCredit) > 0.02) {
    error(`${taskPath} 借贷不平衡：Dr=${round2(totalDebit)} ≠ Cr=${round2(totalCredit)}（差${round2(Math.abs(totalDebit - totalCredit))}）${taskInfo}`)
  }
}

/**
 * 遍历教程数据（monthKey: [task, ...] 结构）
 */
function auditTutorialData(data, moduleName) {
  if (!data || typeof data !== 'object') {
    error(`${moduleName}: 数据为空或非对象`)
    return
  }

  const monthKeys = Object.keys(data)
  for (const mk of monthKeys) {
    const tasks = data[mk]
    if (!Array.isArray(tasks)) {
      warn(`${moduleName}.${mk}: 月份数据不是数组`)
      continue
    }

    for (let ti = 0; ti < tasks.length; ti++) {
      const task = tasks[ti]
      if (!task) { error(`${moduleName}.${mk}[${ti}]: 任务为空`); continue }

      const taskInfo = `「${task.title || '无标题'}」${task.date || ''}`
      const taskPath = `${moduleName}.${mk}[${ti}]`

      // 必填字段
      if (!task.title) warn(`${taskPath} 缺少 title`)
      if (!task.date) warn(`${taskPath} 缺少 date`)
      if (!task.role) warn(`${taskPath} 缺少 role ${taskInfo}`)

      // 检查 entries
      if (task.entries) {
        auditEntryBalance(task.entries, taskPath, taskInfo)
      }
    }
  }
}

/**
 * 遍历案例数据（CASES 数组结构）
 */
function auditCasesData(casesArray) {
  if (!Array.isArray(casesArray)) {
    error('案例数据不是数组')
    return
  }

  for (let ci = 0; ci < casesArray.length; ci++) {
    const c = casesArray[ci]
    if (!c || !c.data) continue

    const caseName = c.id || c.title || `cases[${ci}]`
    const events = c.data.EVENTS || c.data.events || []

    if (!Array.isArray(events)) {
      warn(`${caseName}: events 不是数组`)
      continue
    }

    for (let ei = 0; ei < events.length; ei++) {
      const evt = events[ei]
      if (!evt) { error(`${caseName}.events[${ei}]: 事件为空`); continue }

      const evtPath = `${caseName}.events[${ei}]`
      const evtInfo = `「${evt.title || '无标题'}」${evt.date || ''}`

      if (!evt.title) warn(`${evtPath} 缺少 title`)
      if (!evt.date) warn(`${evtPath} 缺少 date`)

      if (evt.entries) {
        auditEntryBalance(evt.entries, evtPath, evtInfo)
      }
    }
  }
}

// ═══════════════════════════════════════════════════════════
//  B: 重复任务检测
// ═══════════════════════════════════════════════════════════

function checkDuplicateTasks(data, moduleName) {
  if (!data || typeof data !== 'object') return

  const monthKeys = Object.keys(data)
  for (const mk of monthKeys) {
    const tasks = data[mk]
    if (!Array.isArray(tasks)) continue

    const seen = new Map() // "date|title" → index
    for (let ti = 0; ti < tasks.length; ti++) {
      const task = tasks[ti]
      if (!task || !task.date || !task.title) continue

      const key = `${task.date}|${task.title}`
      if (seen.has(key)) {
        warn(`${moduleName}.${mk}: 重复任务 — ${task.date} 「${task.title}」（索引 ${seen.get(key)} 和 ${ti}）`)
      } else {
        seen.set(key, ti)
      }
    }
  }
}

// ═══════════════════════════════════════════════════════════
//  C: 任务数量统计 & 异常检测
// ═══════════════════════════════════════════════════════════

function countTasksByMonth(data, moduleName) {
  if (!data || typeof data !== 'object') return {}

  const counts = {}
  const monthKeys = Object.keys(data).sort()
  for (const mk of monthKeys) {
    const tasks = data[mk]
    counts[mk] = Array.isArray(tasks) ? tasks.length : 0
  }
  return counts
}

function detectTaskCountAnomalies(counts, moduleName, expectedRange) {
  const values = Object.values(counts)
  if (values.length === 0) {
    warn(`${moduleName}: 无月份数据`)
    return
  }

  const avg = values.reduce((s, v) => s + v, 0) / values.length
  const stdDev = Math.sqrt(values.reduce((s, v) => s + (v - avg) ** 2, 0) / values.length)

  // 零任务月
  for (const [mk, count] of Object.entries(counts)) {
    if (count === 0) {
      warn(`${moduleName}.${mk}: 零任务月`)
    }
  }

  // 偏离均值超过2个标准差
  for (const [mk, count] of Object.entries(counts)) {
    if (count > 0 && Math.abs(count - avg) > stdDev * 2) {
      warn(`${moduleName}.${mk}: 任务数 ${count} 偏离均值 ${round2(avg)}（±${round2(stdDev)}），注意检查是否正常`)
    }
  }
}

// ═══════════════════════════════════════════════════════════
//  主函数
// ═══════════════════════════════════════════════════════════

async function main() {
  console.log('═══ 深度数据审计 — 第1轮全面测试 ═══')
  console.log(`时间：${new Date().toISOString()}\n`)

  // ─── 加载各模块数据 ───
  const modules = [
    { name: 'year1', path: '../src/data/tutorials/year1.js', extract: m => m.default },
    { name: 'commercial', path: '../src/data/tutorials/commercial/index.js', extract: m => m.MONTHS },
    { name: 'service', path: '../src/data/tutorials/service/index.js', extract: m => m.MONTHS },
    { name: 'construction', path: '../src/data/tutorials/construction/index.js', extract: m => m.MONTHS },
    { name: 'cases', path: '../src/data/cases/index.js', extract: m => m.CASES },
    { name: 'scenarios', path: '../src/data/scenarios.js', extract: m => m.SCENARIOS },
    { name: 'xp-system', path: '../src/data/xp-system.js', extract: m => m.default || m.LEVELS },
  ]

  const loaded = []
  for (const mod of modules) {
    try {
      const fullPath = resolve(__dirname, mod.path)
      const m = await import(`file://${fullPath.replace(/\\/g, '/')}`)
      const data = mod.extract(m)
      loaded.push({ name: mod.name, data })
      pass(`${mod.name} 加载成功`)
    } catch (e) {
      error(`${mod.name} 加载失败: ${e.message}`)
    }
  }

  // ─── A: 分录借贷平衡 + 字段完整性 ───
  heading('A. 分录借贷平衡 & 字段完整性')

  const tutorialModules = ['year1', 'commercial', 'service', 'construction']
  for (const item of loaded) {
    if (tutorialModules.includes(item.name)) {
      console.log(`\n--- ${item.name} ---`)
      auditTutorialData(item.data, item.name)
    }
  }

  // 案例
  const casesItem = loaded.find(i => i.name === 'cases')
  if (casesItem) {
    console.log(`\n--- cases ---`)
    auditCasesData(casesItem.data)
  }

  // ─── B: 重复任务检测 ───
  heading('B. 重复任务检测')
  for (const item of loaded) {
    if (tutorialModules.includes(item.name)) {
      checkDuplicateTasks(item.data, item.name)
    }
  }
  if (totalErrors === 0 && totalWarnings === 0) pass('无重复任务')

  // ─── C: 任务数量统计 & 异常 ───
  heading('C. 各行业各月任务数')
  for (const item of loaded) {
    if (!tutorialModules.includes(item.name)) continue
    const counts = countTasksByMonth(item.data, item.name)
    console.log(`\n${item.name}:`)
    for (const [mk, count] of Object.entries(counts)) {
      console.log(`  第${mk}月: ${count} 个任务`)
    }
    detectTaskCountAnomalies(counts, item.name)
    const total = Object.values(counts).reduce((s, v) => s + v, 0)
    console.log(`  合计: ${total} 个任务`)
  }

  // 案例统计
  if (casesItem) {
    console.log(`\ncases:`)
    const casesArray = casesItem.data
    if (Array.isArray(casesArray)) {
      for (const c of casesArray) {
        if (!c || !c.data) continue
        const events = c.data.EVENTS || c.data.events || []
        console.log(`  ${c.id || c.title}: ${events.length} 个事件`)
      }
      console.log(`  合计: ${casesArray.length} 个案例`)
    }
  }

  // ─── D: 枚举所有任务的角色分布 ───
  heading('D. 任务角色分布')
  for (const item of loaded) {
    if (!tutorialModules.includes(item.name)) continue
    if (!item.data || typeof item.data !== 'object') continue

    let accountant = 0, cashier = 0, unset = 0
    for (const tasks of Object.values(item.data)) {
      if (!Array.isArray(tasks)) continue
      for (const task of tasks) {
        if (!task) continue
        if (task.role === 'accountant') accountant++
        else if (task.role === 'cashier') cashier++
        else unset++
      }
    }
    const total = accountant + cashier + unset
    console.log(`  ${item.name}: 会计 ${accountant}/${total} | 出纳 ${cashier}/${total}${unset > 0 ? ` | 未设置角色 ${unset} ⚠️` : ''}`)
  }

  // ─── 汇总 ───
  heading('═══ 审计总结 ═══')
  if (totalErrors === 0 && totalWarnings === 0) {
    console.log(`\n${PASS} 完美！全部通过，零错误零警告\n`)
  } else {
    console.log(`\n${FAIL} ${totalErrors} 个错误，${totalWarnings} 个警告\n`)
  }
}

main().catch(e => {
  console.error('审计脚本异常:', e)
  process.exit(1)
})
