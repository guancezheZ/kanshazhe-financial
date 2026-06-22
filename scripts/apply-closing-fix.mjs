/**
 * 🔧 自动修正期末结转分录
 *
 * 读取教学数据文件 → 计算各月P&L余额 → 替换结转任务entries
 * 保留现有的 summary/explanation 字段
 *
 * 用法：node scripts/apply-closing-fix.mjs [行业] [月份]
 *       行业: commercial/service/construction (缺省=全部)
 *       月份: 01-12/all (缺省=all)
 */
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// 行业配置
const INDUSTRIES = {
  commercial: { label: '商业企业', dir: 'tutorials/commercial' },
  service: { label: '服务业', dir: 'tutorials/service' },
  construction: { label: '建筑业', dir: 'tutorials/construction' },
}

const PNL_PREFIXES = ['6001','6051','6101','6111','6301','6401','6402','6403',
  '6601','6602','6603','6701','6711','6801','6901','5101']

const CLOSING_TITLES = [
  '期末结转损益',
  '期末结转',       // 匹配"期末结转12月损益类科目"等带月份格式
  '结转本月损益类科目',
  '月末结转损益类科目',
  '结转损益类科目',
]

function isPnl(code) {
  return PNL_PREFIXES.some(p => code.startsWith(p))
}

function isRevenueType(code) {
  return ['6001','6051','6101','6111','6301'].some(p => code.startsWith(p))
}

function isMfgOverhead(code) {
  return code === '5101'
}

function isClosing(title) {
  return CLOSING_TITLES.some(t => title?.includes(t))
}

/** 提取字段值（支持单引号、双引号、数字、JSON格式数字） */
function extractValue(str, name) {
  // 1. 单引号字符串: name: 'value'
  let m = str.match(new RegExp(`${name}\\s*:\\s*'([^']*)'`))
  if (m) return m[1]
  // 2. 双引号字符串: "name": "value" (JSON格式)
  m = str.match(new RegExp(`"${name}"\\s*:\\s*"([^"]*)"`))
  if (m) return m[1]
  // 3. 数字值: name: 123 或 name: 123.45
  m = str.match(new RegExp(`${name}\\s*:\\s*(-?\\d+\\.?\\d*)`))
  if (m) return m[1]
  // 4. JSON数字值: "name": 123 或 "name": 123.45
  m = str.match(new RegExp(`"${name}"\\s*:\\s*(-?\\d+\\.?\\d*)`))
  if (m) return m[1]
  return null
}

/** 从任务源码中提取 entries 数组内容（支持JS和JSON两种格式） */
function extractEntriesFromSource(code) {
  const entries = []
  // 支持 "entries": 或 entries: 两种格式（JSON/JS）
  const entriesMatch = code.match(/"?entries"?\s*:\s*\[([\s\S]*?)\]\s*(?:\}|,)/)
  if (!entriesMatch) return entries

  let arrStr = entriesMatch[1]
  let depth = 0, objStart = -1

  for (let i = 0; i < arrStr.length; i++) {
    if (arrStr[i] === '{') {
      if (depth === 0) objStart = i
      depth++
    } else if (arrStr[i] === '}') {
      depth--
      if (depth === 0 && objStart !== -1) {
        const entryStr = arrStr.substring(objStart, i + 1)
        entries.push({
          subjectCode: extractValue(entryStr, 'subjectCode'),
          debit: parseFloat(extractValue(entryStr, 'debit') || '0'),
          credit: parseFloat(extractValue(entryStr, 'credit') || '0'),
          summary: extractValue(entryStr, 'summary') || '',
          explanation: extractValue(entryStr, 'explanation') || '',
        })
        objStart = -1
      }
    }
  }
  return entries
}

/** 从源码中提取所有任务（兼容字符串和注释中的 {/}） */
function parseTasksFromSource(content) {
  const tasks = []
  let depth = 0, objStart = -1
  let inSingle = false, inDouble = false, inTemplate = false
  let inLineComment = false, inBlockComment = false
  for (let i = 0; i < content.length; i++) {
    const c = content[i]
    const prev = i > 0 ? content[i - 1] : ''

    // 追踪行注释 //
    if (!inBlockComment && !inSingle && !inDouble && !inTemplate) {
      if (c === '/' && i + 1 < content.length && content[i + 1] === '/') {
        inLineComment = true
        continue
      }
    }
    if (inLineComment) {
      if (c === '\n') inLineComment = false
      continue
    }

    // 追踪块注释 /* */
    if (!inLineComment && !inSingle && !inDouble && !inTemplate) {
      if (c === '/' && i + 1 < content.length && content[i + 1] === '*') {
        inBlockComment = true
        continue
      }
    }
    if (inBlockComment) {
      if (c === '*' && i + 1 < content.length && content[i + 1] === '/') {
        inBlockComment = false
        i++ // skip */
      }
      continue
    }

    // 追踪字符串（跳过转义字符）
    if (!inLineComment && !inBlockComment) {
      if (prev !== '\\') {
        if (c === "'" && !inDouble && !inTemplate) inSingle = !inSingle
        else if (c === '"' && !inSingle && !inTemplate) inDouble = !inDouble
        else if (c === '`' && !inSingle && !inDouble) inTemplate = !inTemplate
      }
    }

    // 只在代码中计算 {} 深度
    if (!inSingle && !inDouble && !inTemplate && !inLineComment && !inBlockComment) {
      if (c === '{') {
        if (depth === 0) objStart = i
        depth++
      } else if (c === '}') {
        depth--
        if (depth === 0 && objStart !== -1) {
          const objStr = content.substring(objStart, i + 1)
          const title = extractValue(objStr, 'title')
          const date = extractValue(objStr, 'date')
          if (title && date) {
            const role = extractValue(objStr, 'role') || 'accountant'
            tasks.push({
              sourceStart: objStart,
              sourceEnd: i + 1,
              source: objStr,
              title, date, role,
              entries: extractEntriesFromSource(objStr),
            })
          }
          objStart = -1
        }
      }
    }
  }
  return tasks
}

/** 查找当前文件中结转任务的具体源码位置 */
function findClosingTaskInSource(tasks) {
  // 找匹配的任务（从后往前找）
  for (let i = tasks.length - 1; i >= 0; i--) {
    if (isClosing(tasks[i].title)) return tasks[i]
  }
  // 向前找（可能前面的任务标题也匹配）
  for (let i = 0; i < tasks.length; i++) {
    if (isClosing(tasks[i].title)) return tasks[i]
  }
  return null
}

/** 生成修正后的entries文本 */
function generateFixedEntries(correctAmounts, oldEntries) {
  const lines = []
  lines.push('      entries: [')

  // 建立旧entries的映射
  const oldMap = {}
  for (const e of oldEntries) {
    oldMap[e.subjectCode] = e
  }

  const entryList = []
  // 1. 收入/贷方余额科目 → 借记转出
  for (const [code, info] of Object.entries(correctAmounts).sort()) {
    if (!info.isCreditBalance || isMfgOverhead(code)) continue
    const old = oldMap[code]
    const summary = old?.summary || `结转${info.codeName || code}`
    const explanation = old?.explanation || `${info.codeName || code}转出，余额归零。`
    entryList.push({ subjectCode: code, debit: info.absNet, credit: 0, summary, explanation })
  }

  // 2. 费用/借方余额科目 → 贷记转出
  for (const [code, info] of Object.entries(correctAmounts).sort()) {
    if (info.isCreditBalance || isMfgOverhead(code)) continue
    const old = oldMap[code]
    const summary = old?.summary || `结转${info.codeName || code}`
    const explanation = old?.explanation || `${info.codeName || code}转出，余额归零。`
    entryList.push({ subjectCode: code, debit: 0, credit: info.absNet, summary, explanation })
  }

  // 3. 4103 本年利润
  const totalDr = entryList.reduce((s, e) => s + e.debit, 0)
  const totalCr = entryList.reduce((s, e) => s + e.credit, 0)
  const netProfit = Math.round((totalDr - totalCr) * 100) / 100
  const old4103 = oldMap['4103']

  if (Math.abs(netProfit) > 0.01) {
    if (netProfit > 0) {
      entryList.push({
        subjectCode: '4103', debit: 0, credit: netProfit,
        summary: old4103?.summary || '结转净利润',
        explanation: old4103?.explanation || `本年利润增加${netProfit.toFixed(2)}元。`,
      })
    } else {
      entryList.push({
        subjectCode: '4103', debit: Math.abs(netProfit), credit: 0,
        summary: old4103?.summary || '结转净亏损',
        explanation: old4103?.explanation || `本年利润减少${Math.abs(netProfit).toFixed(2)}元。`,
      })
    }
  }

  // 生成文本
  for (let i = 0; i < entryList.length; i++) {
    const e = entryList[i]
    const comma = i < entryList.length - 1 ? ',' : ''
    const summaryStr = e.summary ? `, summary: '${e.summary.replace(/'/g, "\\'")}'` : ''
    const explanationStr = e.explanation ? `, explanation: '${e.explanation.replace(/'/g, "\\'")}'` : ''
    lines.push(`      { subjectCode: '${e.subjectCode}', debit: ${e.debit}, credit: ${e.credit}${summaryStr}${explanationStr} }${comma}`)
  }

  lines.push('    ]')
  return lines.join('\n')
}

// ═══════════════════════════════════════════
// 主流程
// ═══════════════════════════════════════════

const args = process.argv.slice(2)
const targetIndustry = args[0] || 'all'
const targetMonth = args[1] || 'all'
const months = targetMonth === 'all'
  ? ['01','02','03','04','05','06','07','08','09','10','11','12']
  : [targetMonth]

const dataBase = join(__dirname, '..', 'src', 'data')

for (const [scenario, cfg] of Object.entries(INDUSTRIES)) {
  if (targetIndustry !== 'all' && targetIndustry !== scenario) continue

  console.log(`\n${'='.repeat(60)}`)
  console.log(`  ${cfg.label} (${scenario})`)
  console.log(`${'='.repeat(60)}`)

  const baseDir = join(dataBase, cfg.dir)
  let fixed = 0, errors = 0

  for (const month of months) {
    const filePath = join(baseDir, `${month}.js`)
    if (!existsSync(filePath)) {
      console.log(`  月${month}: ⚠️ 文件不存在`); errors++; continue
    }

    const content = readFileSync(filePath, 'utf8')
    const tasks = parseTasksFromSource(content)
    const closingTask = findClosingTaskInSource(tasks)

    if (!closingTask) {
      console.log(`  月${month}: ⚠️ 未找到结转任务 (共${tasks.length}任务)`)
      errors++; continue
    }

    const nonClosing = tasks.filter(t => t !== closingTask)

    // 计算P&L余额
    const pnl = {}
    for (const t of nonClosing) {
      if (t.role === 'cashier') continue
      for (const e of t.entries) {
        if (!isPnl(e.subjectCode)) continue
        if (!pnl[e.subjectCode]) pnl[e.subjectCode] = { debit: 0, credit: 0 }
        pnl[e.subjectCode].debit += e.debit
        pnl[e.subjectCode].credit += e.credit
      }
    }

    // 过滤非零余额
    const active = {}
    for (const [code, val] of Object.entries(pnl)) {
      const net = val.debit - val.credit
      const absNet = Math.abs(net)
      if (absNet < 0.005) continue
      active[code] = {
        absNet: Math.round(absNet * 100) / 100,
        isCreditBalance: net < 0,  // 贷方余额
        codeName: code,
      }
    }

    if (Object.keys(active).length === 0) {
      console.log(`  月${month}: ⚠️ 无损益科目余额`)
      errors++; continue
    }

    // 生成替换entries
    // 用精确位置定位 entries: [...] 避免正则逗号问题
    const taskSource = closingTask.source
    const taskSourceStart = closingTask.sourceStart

    // 找 entries: 或 "entries": 开头（支持JS和JSON格式）
    let entriesIdx = taskSource.indexOf('entries:')
    if (entriesIdx === -1) entriesIdx = taskSource.indexOf('"entries":')
    if (entriesIdx === -1) {
      console.log(`  月${month}: ⚠️ 找不到 entries: 关键字`)
      errors++; continue
    }

    // 从 entries: 后的 [ 开始，数括号深度找到匹配的 ]
    const bracketStart = taskSource.indexOf('[', entriesIdx)
    if (bracketStart === -1) {
      console.log(`  月${month}: ⚠️ 找不到 entries 的 [`)
      errors++; continue
    }

    let bracketDepth = 0
    let bracketEnd = -1
    for (let j = bracketStart; j < taskSource.length; j++) {
      if (taskSource[j] === '[') bracketDepth++
      else if (taskSource[j] === ']') {
        bracketDepth--
        if (bracketDepth === 0) { bracketEnd = j; break }
      }
    }

    if (bracketEnd === -1) {
      console.log(`  月${month}: ⚠️ 找不到 entries 的匹配 ]`)
      errors++; continue
    }

    // 生成新 content: prefix + innerContent + suffix
    const prefix = taskSource.substring(0, bracketStart)           // 包含 entries: 但不含 [
    const suffix = taskSource.substring(bracketEnd + 1)            // ] 之后的内容（含逗号/换行）

    const newEntriesContent = generateFixedEntries(active, closingTask.entries)
    const bracketInNew = newEntriesContent.indexOf('[')
    const innerContent = bracketInNew >= 0 ? newEntriesContent.substring(bracketInNew) : '[' + newEntriesContent + ']'

    const newTaskSource = prefix + innerContent + suffix

    // 替换原文件中的任务源码
    const newContent = content.substring(0, taskSourceStart) + newTaskSource + content.substring(taskSourceStart + taskSource.length)

    // 备份原文件
    const backupPath = filePath + '.bak'
    writeFileSync(backupPath, content)

    // 写新文件
    writeFileSync(filePath, newContent)
    fixed++

    console.log(`  月${month}: ✅ ${closingTask.title} — entries已更新 (余额科目${Object.keys(active).length}个, 利润${(Object.values(active).filter(v => v.isCreditBalance && !isMfgOverhead(Object.keys(active).find(k => active[k] === v))).reduce((s, v) => s + v.absNet, 0) - Object.values(active).filter(v => !v.isCreditBalance && !isMfgOverhead(Object.keys(active).find(k => active[k] === v))).reduce((s, v) => s + v.absNet, 0)).toFixed(2)})`)
  }

  console.log(`\n  结果: ${fixed}个月修正成功, ${errors}个月错误`)
  if (fixed > 0) console.log('  ⚠️ 原文件已备份为 .bak')
}

console.log('\n修复完成。运行 npm run test 验证。')
