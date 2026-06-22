/**
 * 🔧 生成期末结转修复数据
 *
 * 对每个行业/月份：
 * 1. 过账非结转任务
 * 2. 获取实际 P&L 叶级科目余额
 * 3. 输出修正后的结转分录
 *
 * 用法：node scripts/generate-fix.cjs [行业] [月份]
 */
const fs = require('fs')
const path = require('path')

// ═══════════════════════════════════════════
// 行业配置
// ═══════════════════════════════════════════

const BASE = path.join(__dirname, '..', 'src', 'data')

const INDUSTRIES = {
  manufacturing: {
    label: '制造业',
    dir: 'tutorials',
    files: {
      '01': 'year1.js', '02': 'months/02.js', '03': 'months/03.js',
      '04': 'months/04.js', '05': 'months/05.js', '06': 'months/06.js',
      '07': 'months/07.js', '08': 'months/08.js', '09': 'months/09.js',
      '10': 'months/10.js', '11': 'months/11.js', '12': 'months/12.js',
    },
  },
  commercial: {
    label: '商业企业', dir: 'tutorials/commercial',
    files: Object.fromEntries(['01','02','03','04','05','06','07','08','09','10','11','12'].map(m => [m, `${m}.js`])),
  },
  service: {
    label: '服务业', dir: 'tutorials/service',
    files: Object.fromEntries(['01','02','03','04','05','06','07','08','09','10','11','12'].map(m => [m, `${m}.js`])),
  },
  construction: {
    label: '建筑业', dir: 'tutorials/construction',
    files: Object.fromEntries(['01','02','03','04','05','06','07','08','09','10','11','12'].map(m => [m, `${m}.js`])),
  },
}

// ═══════════════════════════════════════════
// 解析函数
// ═══════════════════════════════════════════

function extractTasks(content) {
  const tasks = []
  const arrays = findTopLevelArrays(content)
  for (const arrStr of arrays) {
    tasks.push(...extractFromArray(arrStr))
  }
  if (tasks.length === 0) {
    const objs = findTopLevelObjects(content)
    for (const o of objs) {
      for (const a of findAllArrays(o)) {
        tasks.push(...extractFromArray(a))
      }
    }
  }
  // 去重
  const seen = new Set()
  return tasks.filter(t => {
    const k = `${t.title}|${t.date}|${t.role||''}`
    if (seen.has(k)) return false
    seen.add(k); return true
  })
}

function findTopLevelArrays(content) {
  const arrs = []; let d = 0, s = -1
  for (let i = 0; i < content.length; i++) {
    if (content[i] === '[') { if (d === 0) s = i; d++ }
    else if (content[i] === ']') { d--; if (d === 0 && s !== -1) { const sub = content.substring(s, i+1); if (sub.includes('title') && sub.includes('date')) arrs.push(sub); s = -1 }}
  }
  return arrs
}

function extractFromArray(arr) {
  const ts = []; let d = 0, s = -1
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === '{') { if (d === 0) s = i; d++ }
    else if (arr[i] === '}') { d--; if (d === 0 && s !== -1) { const o = arr.substring(s, i+1); if (hasField(o,'title') && hasField(o,'date')) { const t = parseTask(o); if (t?.title) ts.push(t) } s = -1 }}
  }
  return ts
}

function findTopLevelObjects(c) { const obs = []; let d=0,s=-1; for(let i=0;i<c.length;i++){if(c[i]==='{'){if(d===0)s=i;d++}else if(c[i]==='}'){d--;if(d===0&&s!==-1){obs.push(c.substring(s,i+1));s=-1}}} return obs }
function findAllArrays(s) { const as=[]; let d=0,st=-1; for(let i=0;i<s.length;i++){if(s[i]==='['){if(d===0)st=i;d++}else if(s[i]===']'){d--;if(d===0&&st!==-1){as.push(s.substring(st,i+1));st=-1}}} return as }
function hasField(s, n) { return s.includes(`${n}:`) || s.includes(`"${n}":`) }
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function extractValue(s, n) {
  // Single-quote: name: 'value'
  const sqIdx = s.indexOf(`${n}: '`)
  if (sqIdx !== -1) {
    const start = sqIdx + `${n}: '`.length
    const end = s.indexOf("'", start)
    if (end !== -1) return s.substring(start, end)
  }
  // Double-quote: "name": "value"
  const dqIdx = s.indexOf(`"${n}": "`)
  if (dqIdx !== -1) {
    const start = dqIdx + `"${n}": "`.length
    const end = s.indexOf('"', start)
    if (end !== -1) return s.substring(start, end)
  }
  // Unquoted value (JS format): name: VALUE
  const uqIdx = s.indexOf(`${n}: `)
  if (uqIdx !== -1) {
    // Verify it's not a quoted string (would have been caught above)
    const beforeQuote = s.substring(uqIdx, uqIdx + `${n}: `.length + 1)
    if (beforeQuote[beforeQuote.length - 1] !== "'" && beforeQuote[beforeQuote.length - 1] !== '"') {
      const start = uqIdx + `${n}: `.length
      let end = start
      while (end < s.length && s[end] !== ',' && s[end] !== '}' && s[end] !== '\n' && s[end] !== '\r') end++
      const val = s.substring(start, end).trim()
      if (val.length > 0) return val
    }
  }
  // Unquoted value (JSON format): "name": VALUE
  const jqIdx = s.indexOf(`"${n}": `)
  if (jqIdx !== -1) {
    const beforeQuote = s.substring(jqIdx, jqIdx + `"${n}": `.length + 1)
    if (beforeQuote[beforeQuote.length - 1] !== "'" && beforeQuote[beforeQuote.length - 1] !== '"') {
      const start = jqIdx + `"${n}": `.length
      let end = start
      while (end < s.length && s[end] !== ',' && s[end] !== '}' && s[end] !== '\n' && s[end] !== '\r') end++
      const val = s.substring(start, end).trim()
      if (val.length > 0) return val
    }
  }
  return null
}

function parseTask(s) {
  const t = { title: extractValue(s,'title'), role: extractValue(s,'role')||'accountant', date: extractValue(s,'date'), entries: [] }
  // Find entries array content using index search
  const entriesLabel = 'entries: ['
  const eIdx = s.indexOf(entriesLabel)
  if (eIdx !== -1) {
    const arrStart = eIdx + entriesLabel.length - 1  // points to [
    // Find matching closing ]
    let depth = 0
    for (let i = arrStart; i < s.length; i++) {
      if (s[i] === '[') depth++
      else if (s[i] === ']') { depth--; if (depth === 0) {
        const arrContent = s.substring(arrStart + 1, i)
        // Extract each { } entry
        let d = 0, os = -1
        for (let j = 0; j < arrContent.length; j++) {
          if (arrContent[j] === '{') { if (d === 0) os = j; d++ }
          else if (arrContent[j] === '}') { d--; if (d === 0 && os !== -1) {
            const es = arrContent.substring(os, j + 1)
            t.entries.push({
              subjectCode: extractValue(es, 'subjectCode'),
              debit: parseFloat(extractValue(es, 'debit') || '0'),
              credit: parseFloat(extractValue(es, 'credit') || '0'),
              summary: extractValue(es, 'summary') || '',
            })
            os = -1
          }}
        }
        break
      }}
    }
  }
  return t
}

/** 判断是否为需要结转的损益类科目（4位叶级 + 6位明细） */
function isClosablePnL(code) {
  if (!code) return false
  const prefixes = ['6001','6051','6101','6111','6301','6401','6402','6403',
    '6601','6602','6603','6701','6711','6801','6901']
  if (!prefixes.some(p => code.startsWith(p))) return false
  // 4位编码 = 叶级损益科目（如6001, 6603）
  if (code.length === 4) return true
  // 6位编码 = 子科目（如660201, 660101），排除父级（6601, 6602）
  if (code.length === 6) return true
  return false
}

/** 判断是否为父级损益科目 */
function isParentPnL(code) {
  if (!code) return false
  return ['6601','6602'].includes(code)
}

function isClosingTask(title) {
  if (!title) return false
  return title.includes('月末结转') && (title.includes('损益') || title.includes('期间损益'))
}

// ═══════════════════════════════════════════
// 主逻辑
// ═══════════════════════════════════════════

function generateFix(scenario, cfg, months) {
  console.log(`\n${'='.repeat(72)}`)
  console.log(`  ${cfg.label} — 结转修复方案`)
  console.log(`${'='.repeat(72)}`)

  const baseDir = path.join(BASE, cfg.dir)

  for (const month of months) {
    const filePath = path.join(baseDir, cfg.files[month])
    if (!fs.existsSync(filePath)) { console.log(`  ⚠️ 月${month}: 文件不存在`); continue }

    const content = fs.readFileSync(filePath, 'utf8')
    const tasks = extractTasks(content)
    if (tasks.length === 0) {
      console.log(`  ⚠️ 月${month}: 解析到 0 个任务（共${content.length}字符）`)
      // debug: check arrays found
      const arrays = findTopLevelArrays(content)
      console.log(`    findTopLevelArrays: ${arrays.length}个数组`)
      continue
    }

    // 找结转任务
    const closingIdx = tasks.findIndex(t => isClosingTask(t.title))
    if (closingIdx === -1) {
      console.log(`  ⚠️ 月${month}: 未找到结转任务`)
      continue
    }

    const closingTask = tasks[closingIdx]
    const nonClosing = tasks.filter((_, i) => i !== closingIdx)

    // 汇总非结转任务P&L发生额（按可结转科目）
    let pnlEntryCount = 0
    const pnlTotals = {}
    for (const t of nonClosing) {
      if (t.role === 'cashier') continue
      if (t.entries.length === 0) continue
      for (const e of t.entries) {
        if (!e.subjectCode) continue
        if (isClosablePnL(e.subjectCode)) {
          pnlEntryCount++
          if (!pnlTotals[e.subjectCode]) pnlTotals[e.subjectCode] = { debit: 0, credit: 0 }
          pnlTotals[e.subjectCode].debit += e.debit
          pnlTotals[e.subjectCode].credit += e.credit
        }
      }
    }
    // 过滤净额不为零的
    const active = {}
    let totalRevenue = 0, totalExpense = 0
    const isRevenue = c => ['6001','6051','6101','6111','6301'].some(p => c.startsWith(p))
    const isMfgOverhead = c => c === '5101'

    for (const [code, v] of Object.entries(pnlTotals)) {
      const net = v.debit - v.credit
      if (Math.abs(net) < 0.005) continue
      // 根据实际余额方向决定：贷方余额→借记转出（类似收入），借方余额→贷记转出（类似费用）
      const isCreditBalance = net < 0  // 贷方余额
      active[code] = { ...v, net, absNet: Math.abs(net), isCreditBalance }
      if (isRevenue(code) || isCreditBalance) totalRevenue += Math.abs(net)
      else if (!isMfgOverhead(code)) totalExpense += Math.abs(net)
    }

    if (Object.keys(active).length === 0 && pnlEntryCount > 0) {
      console.log(`  ⚠️ P&L分录${pnlEntryCount}条但全部净额为零！`)
      for (const [code, v] of Object.entries(pnlTotals)) {
        console.log(`    ${code}: dr=${v.debit} cr=${v.credit} net=${v.debit - v.credit}`)
      }
    }
    if (pnlEntryCount === 0 && nonClosing.some(t => t.role !== 'cashier')) {
      console.log(`  ⚠️ 非结转任务中无损益科目分录`)
    }

    // 看当前结转用了哪些父级科目，以及修正后仍需哪些
    const parentCodes = closingTask.entries.filter(e => isParentPnL(e.subjectCode)).map(e => e.subjectCode)
    const stillNeedParent = Object.keys(active).filter(c => isParentPnL(c))

    // 输出
    // debug: count tasks with entries
    const tasksWithEntries = tasks.filter(t => t.entries && t.entries.length > 0).length
    const nonCashierWithEntries = tasks.filter(t => t.role !== 'cashier' && t.entries && t.entries.length > 0).length

    console.log(`\n  📍 月${month} — ${closingTask.title}`)
    console.log(`  当前结转 ${closingTask.entries.length} 条分录 (共${tasks.length}任务, ${tasksWithEntries}有分录, ${nonCashierWithEntries}非出纳有分录)`)
    console.log(`  发现 ${Object.keys(active).length} 个有余额的叶级损益科目`)
    if (parentCodes.length > 0) console.log(`  ⚠️ 使用了父级科目: ${parentCodes.join(', ')}`)

    console.log(`\n  🔧 正确结转分录:`)

    const fixedEntries = []

    // 1. 贷方余额 → 借记转出（收入类 + 贷方余额的费用科目）
    for (const [code, v] of Object.entries(active).sort()) {
      if (!v.isCreditBalance) continue
      if (isMfgOverhead(code)) continue
      const entry = { subjectCode: code, debit: v.absNet, credit: 0 }
      fixedEntries.push(entry)
      console.log(`    { subjectCode: '${code}', debit: ${v.absNet.toFixed(2)}, credit: 0 },  // ${v.absNet.toFixed(2)}`)
    }

    // 2. 借方余额 → 贷记转出（费用类）
    for (const [code, v] of Object.entries(active).sort()) {
      if (v.isCreditBalance) continue
      if (isMfgOverhead(code)) continue
      const entry = { subjectCode: code, debit: 0, credit: v.absNet }
      fixedEntries.push(entry)
      console.log(`    { subjectCode: '${code}', debit: 0, credit: ${v.absNet.toFixed(2)} },  // ${v.absNet.toFixed(2)}`)
    }

    // 3. 特殊：6603 如果净余额是贷方（利息收入>手续费），用借记转出
    if (active['6603'] && active['6603'].net < 0) {
      // 已在上面处理
    }

    // 4. 制造费用
    if (active['5101']) {
      // 制造费用是成本科目，真正应该结转到生产成本而不是本年利润
      // 但这里保留原逻辑
    }

    // 5. 本年利润
    const totalDr = fixedEntries.filter(e => e.debit > 0).reduce((s, e) => s + e.debit, 0)
    const totalCr = fixedEntries.filter(e => e.credit > 0).reduce((s, e) => s + e.credit, 0)
    const netProfit = totalCr - totalDr  // 收入贷记本年利润 - 费用借记本年利润

    if (Math.abs(netProfit) > 0.01) {
      if (netProfit > 0) {
        fixedEntries.push({ subjectCode: '4103', debit: 0, credit: netProfit, summary: '结转净利润' })
        console.log(`    { subjectCode: '4103', debit: 0, credit: ${netProfit.toFixed(2)} },  // 净利润`)
      } else {
        fixedEntries.push({ subjectCode: '4103', debit: Math.abs(netProfit), credit: 0, summary: '结转净亏损' })
        console.log(`    { subjectCode: '4103', debit: ${Math.abs(netProfit).toFixed(2)}, credit: 0 },  // 净亏损`)
      }
    }

    // 总结
    console.log(`\n  当前 Dr=${closingTask.entries.reduce((s,e)=>s+(e.debit||0),0).toFixed(2)} Cr=${closingTask.entries.reduce((s,e)=>s+(e.credit||0),0).toFixed(2)}`)
    console.log(`  修正 Dr=${fixedEntries.reduce((s,e)=>s+e.debit,0).toFixed(2)} Cr=${fixedEntries.reduce((s,e)=>s+e.credit,0).toFixed(2)}`)
    console.log(`  收入: ${totalRevenue.toFixed(2)} 费用: ${totalExpense.toFixed(2)} 利润: ${(totalRevenue-totalExpense).toFixed(2)}`)
  }
}

// ═══════════════════════════════════════════
// 入口
// ═══════════════════════════════════════════

const args = process.argv.slice(2)
const ti = args[0] || 'all'
const tm = args[1] || 'all'
const months = tm === 'all' ? ['01','02','03','04','05','06','07','08','09','10','11','12'] : [tm]

for (const [scenario, cfg] of Object.entries(INDUSTRIES)) {
  if (ti !== 'all' && ti !== scenario) continue
  generateFix(scenario, cfg, months)
}

console.log('\n生成完成。先在制造业1月验证后再批量应用。')
