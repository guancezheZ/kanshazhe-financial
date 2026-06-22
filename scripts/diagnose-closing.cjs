/**
 * 期末结转诊断脚本 v2
 *
 * 直接读教学数据文件 → 汇总各损益科目发生额 → 对比结转分录金额
 *
 * 用法：node scripts/diagnose-closing.cjs [行业] [月份]
 *       行业: manufacturing/commercial/service/construction/all
 *       月份: 01-12/all（缺省=all/all）
 */
const fs = require('fs')
const path = require('path')

// ═══════════════════════════════════════════
// 行业配置
// ═══════════════════════════════════════════

const INDUSTRIES = {
  manufacturing: {
    label: '制造业',
    dir: 'tutorials',
    files: {
      '01': 'year1.js',
      '02': 'months/02.js', '03': 'months/03.js', '04': 'months/04.js',
      '05': 'months/05.js', '06': 'months/06.js', '07': 'months/07.js',
      '08': 'months/08.js', '09': 'months/09.js', '10': 'months/10.js',
      '11': 'months/11.js', '12': 'months/12.js',
    },
  },
  commercial: {
    label: '商业企业',
    dir: 'tutorials/commercial',
    files: Object.fromEntries(['01','02','03','04','05','06','07','08','09','10','11','12'].map(m => [m, `${m}.js`])),
  },
  service: {
    label: '服务业',
    dir: 'tutorials/service',
    files: Object.fromEntries(['01','02','03','04','05','06','07','08','09','10','11','12'].map(m => [m, `${m}.js`])),
  },
  construction: {
    label: '建筑业',
    dir: 'tutorials/construction',
    files: Object.fromEntries(['01','02','03','04','05','06','07','08','09','10','11','12'].map(m => [m, `${m}.js`])),
  },
}

// ═══════════════════════════════════════════
// 解析函数
// ═══════════════════════════════════════════

/**
 * 从JS文件内容中解析所有任务对象
 *
 * 支持两种结构：
 * 1. 平铺数组：const xxx = [ { ... }, { ... } ]; export default xxx
 * 2. 嵌套结构：const xxx = { '01': [ ... ], testAnswer: fn }; export default xxx
 */
function parseTasks(content) {
  const tasks = []

  // 第一步：找到所有顶层数组
  // 找第一个 export default 或 const = 后面的数组
  const arrays = findTopLevelArrays(content)
  // console.log(`  找到 ${arrays.length} 个顶层数组`)

  for (const arrStr of arrays) {
    const arrTasks = extractTasksFromArray(arrStr)
    tasks.push(...arrTasks)
  }

  // 第二步：如果没找到数组，找顶层对象中的数组（嵌套格式）
  if (tasks.length === 0) {
    const objects = findTopLevelObjects(content)
    for (const objStr of objects) {
      // 在对象中找所有数组
      const arrInObj = findAllArrays(objStr)
      for (const arrStr of arrInObj) {
        const arrTasks = extractTasksFromArray(arrStr)
        tasks.push(...arrTasks)
      }
      // 也直接找对象中的任务（平铺对象格式）
      if (!hasField(objStr, 'date') && !hasField(objStr, 'title')) {
        // 可能是 { '01': [...], '02': [...] } 这种，递归处理
        // 已经在 findAllArrays 中处理了
      }
    }
  }

  // 去重
  const seen = new Set()
  return tasks.filter(t => {
    const key = t.title + '|' + t.date + '|' + (t.role || 'accountant')
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

/** 找所有顶层数组内容 */
function findTopLevelArrays(content) {
  const arrays = []
  let depth = 0
  let bracketDepth = 0
  let arrStart = -1

  // 先找到数组开始
  for (let i = 0; i < content.length; i++) {
    const ch = content[i]
    if (ch === '[') {
      if (bracketDepth === 0) arrStart = i
      bracketDepth++
    } else if (ch === ']') {
      bracketDepth--
      if (bracketDepth === 0 && arrStart !== -1) {
        // 检查这个数组是否包含任务（有 { 且有 title）
        const arrContent = content.substring(arrStart, i + 1)
        const firstBrace = arrContent.indexOf('{')
        if (firstBrace !== -1) {
          const afterBrace = arrContent.substring(firstBrace, firstBrace + 100)
          if (hasField(afterBrace, 'title') || hasField(afterBrace, 'date')) {
            arrays.push(arrContent)
          }
        }
        arrStart = -1
      }
    }
  }
  return arrays
}

/** 从数组字符串中提取任务对象 */
function extractTasksFromArray(arrStr) {
  const tasks = []
  let depth = 0
  let objStart = -1

  // 确定任务的搜索深度：在数组中的顶层 { }
  // 数组本身有外部包装，内部 { } 起始深度为0
  for (let i = 0; i < arrStr.length; i++) {
    if (arrStr[i] === '{') {
      if (depth === 0) objStart = i
      depth++
    } else if (arrStr[i] === '}') {
      depth--
      if (depth === 0 && objStart !== -1) {
        const objStr = arrStr.substring(objStart, i + 1)
        if (hasField(objStr, 'title') && hasField(objStr, 'date')) {
          const task = parseTaskObject(objStr)
          if (task && task.title) tasks.push(task)
        }
        objStart = -1
      }
    }
  }
  return tasks
}

/** 找所有顶层对象 */
function findTopLevelObjects(content) {
  const objects = []
  let depth = 0
  let objStart = -1
  for (let i = 0; i < content.length; i++) {
    if (content[i] === '{') {
      if (depth === 0) objStart = i
      depth++
    } else if (content[i] === '}') {
      depth--
      if (depth === 0 && objStart !== -1) {
        objects.push(content.substring(objStart, i + 1))
        objStart = -1
      }
    }
  }
  return objects
}

/** 在字符串中找出所有 [...] 数组 */
function findAllArrays(str) {
  const arrays = []
  let depth = 0
  let start = -1
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '[') {
      if (depth === 0) start = i
      depth++
    } else if (str[i] === ']') {
      depth--
      if (depth === 0 && start !== -1) {
        arrays.push(str.substring(start, i + 1))
        start = -1
      }
    }
  }
  return arrays
}

/** 检查对象是否包含类似月份键的结构 */
function hasKeysAsMonths(str) {
  return /['"]0[1-9]['"]\s*:/.test(str) || /['"]1[0-2]['"]\s*:/.test(str)
}

/** 检查字符串是否包含指定字段 */
function hasField(str, name) {
  return str.includes(`${name}: `) || str.includes(`"${name}": `) || str.includes(`'${name}': `)
}

/** 解析单个任务对象字符串 */
function parseTaskObject(str) {
  const task = {}

  // 提取 title
  task.title = extractValue(str, 'title')
  task.role = extractValue(str, 'role') || 'accountant'
  task.date = extractValue(str, 'date')

  // 提取 entries 数组
  task.entries = parseEntries(str)

  return task
}

/** 提取指定字段的值（同时支持单引号和双引号） */
function extractValue(str, name) {
  const patterns = [
    new RegExp(`${name}\\s*:\\s*'([^']*)'`),
    new RegExp(`"${name}"\\s*:\\s*"([^"]*)"`),
  ]
  for (const p of patterns) {
    const m = str.match(p)
    if (m) return m[1]
  }
  return null
}

/** 解析 entries 数组 */
function parseEntries(str) {
  const entries = []

  // 找 entries: [ 的内容
  const m = str.match(/entries\s*:\s*\[([\s\S]*?)\]\s*(?:\}|,)/)
  if (!m) return entries

  let arrStr = m[1]

  // 解析数组中的每个 { ... }
  let depth = 0
  let objStart = -1

  for (let i = 0; i < arrStr.length; i++) {
    const ch = arrStr[i]
    if (ch === '{') {
      if (depth === 0) objStart = i
      depth++
    } else if (ch === '}') {
      depth--
      if (depth === 0 && objStart !== -1) {
        const entryStr = arrStr.substring(objStart, i + 1)
        const entry = {
          subjectCode: extractValue(entryStr, 'subjectCode'),
          debit: parseFloat(extractValue(entryStr, 'debit') || '0'),
          credit: parseFloat(extractValue(entryStr, 'credit') || '0'),
          summary: extractValue(entryStr, 'summary') || '',
        }
        if (entry.subjectCode) entries.push(entry)
        objStart = -1
      }
    }
  }

  return entries
}

/** 判断是否为损益类科目 */
function isPnL(code) {
  if (!code) return false
  const prefixes = ['6001','6051','6101','6111','6301','6401','6402','6403',
    '6601','6602','6603','6701','6711','6801','6901','5101']
  return prefixes.some(p => code.startsWith(p))
}

/** 判断是否为结转任务 */
function isClosingTask(title) {
  if (!title) return false
  const patterns = [
    '月末结转·期间损益',
    '月末结转',
    '期间损益结转',
    '期末结转损益',         // 商业企业/服务业
    '结转本月损益类科目',    // 建筑业
    '月末结转损益类科目',    // 建筑业（部分月份）
    '结转损益类科目',        // 建筑业（部分月份）
    '结转所得税费用',        // 建筑业所得税
    '计提并结转企业所得税',  // 建筑业所得税
    '计提并结转所得税',      // 建筑业所得税
    '计提并结转所得税费用',  // 建筑业所得税
  ]
  return patterns.some(p => title.includes(p))
}

// ═══════════════════════════════════════════
// 诊断逻辑
// ═══════════════════════════════════════════

function diagnoseIndustry(scenario, cfg, months) {
  console.log(`\n${'='.repeat(72)}`)
  console.log(`  ${cfg.label} (${scenario})`)
  console.log(`${'='.repeat(72)}`)

  const baseDir = path.join(__dirname, '..', 'src', 'data', cfg.dir)
  let totalIssues = 0
  let fixedMonths = 0

  for (const month of months) {
    const filePath = path.join(baseDir, cfg.files[month])
    if (!fs.existsSync(filePath)) {
      console.log(`  ⚠️ 月${month}: 文件不存在 (${filePath})`)
      continue
    }

    const content = fs.readFileSync(filePath, 'utf8')
    const tasks = parseTasks(content)
    // console.log(`  月${month}: 解析到 ${tasks.length} 个任务`)

    // 找结转任务
    const closingIdx = tasks.findIndex(t => isClosingTask(t.title))
    if (closingIdx === -1) {
      // 尝试模糊匹配
      const fuzzy = tasks.filter(t => t.title && (t.title.includes('结转') || t.tags?.includes('期末')))
      if (fuzzy.length > 0) {
        // 取最后一个"期末"标签的任务
        const lastPeriodEnd = tasks.filter(t => t.title && (t.title.includes('月末结转') || t.title.includes('损益结转')))
        if (lastPeriodEnd.length > 0) {
          closingIdx = tasks.indexOf(lastPeriodEnd[lastPeriodEnd.length - 1])
        }
      }
    }

    if (closingIdx === -1) {
      console.log(`  ⚠️ 月${month}: 未找到结转任务（共${tasks.length}个任务）`)
      continue
    }

    const closingTask = tasks[closingIdx]
    const nonClosing = tasks.filter((_, i) => i !== closingIdx)

    // 汇总非结转任务的 P&L 发生额
    const pnlTotals = {}

    for (const t of nonClosing) {
      if (t.role === 'cashier') continue
      if (!t.entries) continue
      for (const e of t.entries) {
        if (!isPnL(e.subjectCode)) continue
        if (!pnlTotals[e.subjectCode]) {
          pnlTotals[e.subjectCode] = { debit: 0, credit: 0 }
        }
        pnlTotals[e.subjectCode].debit += e.debit
        pnlTotals[e.subjectCode].credit += e.credit
      }
    }

    // 过滤净额为零的
    const activePnL = {}
    for (const [code, val] of Object.entries(pnlTotals)) {
      const net = val.debit - val.credit
      if (Math.abs(net) < 0.005) continue

      const isRevenueType = ['6001','6051','6101','6111','6301'].some(p => code.startsWith(p))
      activePnL[code] = {
        debit: val.debit, credit: val.credit,
        balance: Math.abs(net),
        direction: net > 0 ? '借' : '贷',
        isRevenue: isRevenueType,
      }
    }

    // 判断：如果是制造费用 5101，它是成本类非损益类，单独处理
    // 获取当前结转分录（排除 4103 本年利润）
    const closingEntries = closingTask.entries.filter(e => e.subjectCode !== '4103').map(e => ({
      subjectCode: e.subjectCode, debit: e.debit, credit: e.credit, summary: e.summary || '',
    }))

    // 对比
    const differences = []
    const allCodes = new Set([...Object.keys(activePnL), ...closingEntries.map(e => e.subjectCode)])

    for (const code of [...allCodes].sort()) {
      const actual = activePnL[code]
      const closure = closingEntries.find(e => e.subjectCode === code)

      // 实际余额
      const actualBalance = actual ? actual.balance : 0
      const actualDir = actual ? actual.direction : '—'

      // 当前结转金额
      const currentAmt = closure ? (closure.debit || closure.credit) : 0

      // 应结转金额 = 余额绝对值
      const correctAmt = actualBalance

      const diff = Math.abs(currentAmt - correctAmt)
      const existingButZero = !closure && correctAmt > 0.01  // 实际有余额但没做结转
      const closedButNoBalance = closure && correctAmt < 0.01  // 做了结转但实际余额为零

      if (diff > 0.01 || existingButZero) {
        differences.push({
          code, actualBalance, actualDir, currentAmt, correctAmt, diff,
          needsFix: diff > 0.01 || existingButZero,
          missing: existingButZero,
          extra: closedButNoBalance,
        })
        totalIssues++
      }
    }

    // 输出
    console.log(`\n  📍 月${month} — ${closingTask.title} (共${tasks.length}任务)`)

    if (differences.length === 0) {
      console.log('  ✅ 所有结转金额正确')
      fixedMonths++
      continue
    }

    console.log(`  ┌──────────┬────────────┬──────┬────────────┬────────────┬──────────┐`)
    console.log(`  │ 科目     │ 实际余额    │ 方向 │ 当前结转    │ 应结转      │ 状态     │`)
    console.log(`  ├──────────┼────────────┼──────┼────────────┼────────────┼──────────┤`)

    for (const d of differences) {
      let status = '✅'
      if (d.missing) status = '🆕 缺结转'
      else if (d.extra) status = '⚠️ 多余'
      else if (d.needsFix) status = '🔧 需修正'
      console.log(`  │ ${d.code.padEnd(8)} │ ${String(d.actualBalance.toFixed(2)).padStart(10)} │ ${d.actualDir.padEnd(3)} │ ${String(d.currentAmt.toFixed(2)).padStart(10)} │ ${String(d.correctAmt.toFixed(2)).padStart(10)} │ ${status} │`)
    }

    console.log(`  └──────────┴────────────┴──────┴────────────┴────────────┴──────────┘`)

    if (differences.some(d => d.needsFix || d.missing)) {
      console.log(`  📝 建议修正的结转分录:`)
      for (const d of differences.filter(d => d.needsFix || d.missing)) {
        if (d.correctAmt < 0.01) continue
        // 收入类（贷方余额）→ debit 转出；费用类（借方余额）→ credit 转出
        if (d.actualDir === '贷') {
          console.log(`    { subjectCode: '${d.code}', debit: ${d.correctAmt.toFixed(2)}, credit: 0, ... }`)
        } else {
          console.log(`    { subjectCode: '${d.code}', debit: 0, credit: ${d.correctAmt.toFixed(2)}, ... }`)
        }
      }

      // 计算本期净利润/亏损
      const totalRevenue = Object.values(activePnL).filter(a => a.isRevenue).reduce((s, a) => s + a.balance, 0)
      const totalExpenses = Object.values(activePnL).filter(a => !a.isRevenue).reduce((s, a) => s + a.balance, 0)
      const netProfit = totalRevenue - totalExpenses
      console.log(`    收入合计: ${totalRevenue.toFixed(2)} | 费用合计: ${totalExpenses.toFixed(2)} | 净利润: ${netProfit.toFixed(2)}`)
      if (Math.abs(netProfit) > 0.01) {
        console.log(`    { subjectCode: '4103', debit: ${netProfit < 0 ? Math.abs(netProfit).toFixed(2) : 0}, credit: ${netProfit > 0 ? netProfit.toFixed(2) : 0}, summary: '结转净利润/亏损' }`)
      }
    }
  }

  console.log(`\n  月${fixedMonths}/12 完全正确`)
}

// ═══════════════════════════════════════════
// 入口
// ═══════════════════════════════════════════

const args = process.argv.slice(2)
const targetIndustry = args[0] || 'all'
const targetMonth = args[1] || 'all'

const months = targetMonth === 'all'
  ? ['01','02','03','04','05','06','07','08','09','10','11','12']
  : [targetMonth]

for (const [scenario, cfg] of Object.entries(INDUSTRIES)) {
  if (targetIndustry !== 'all' && targetIndustry !== scenario) continue
  diagnoseIndustry(scenario, cfg, months)
}

console.log('\n诊断完成。')
