/**
 * 🔧 批量修正制造业各月期末结转金额
 *
 * 安全做法：只修改 debit/credit 数值，保留所有其他字段
 *
 * 用法：node scripts/patch-closing.cjs
 */
const fs = require('fs')
const path = require('path')

const FILES = {
  '02': { base: 'months', file: '02.js', title: '月末结转·期间损益' },
  '03': { base: 'months', file: '03.js', title: '月末结转·期间损益' },
  '04': { base: 'months', file: '04.js', title: '月末结转·期间损益' },
  '05': { base: 'months', file: '05.js', title: '月末结转·期间损益' },
  '06': { base: 'months', file: '06.js', title: '月末结转·期间损益' },
  '07': { base: 'months', file: '07.js', title: '月末结转·期间损益' },
  '08': { base: 'months', file: '08.js', title: '月末结转·期间损益' },
  '09': { base: 'months', file: '09.js', title: '月末结转·期间损益（Q3季末）' },
  '10': { base: 'months', file: '10.js', title: '月末结转·期间损益' },
  '11': { base: 'months', file: '11.js', title: '月末结转·期间损益' },
  '12': { base: 'months', file: '12.js', title: '月末结转·期间损益（12月）' },
}

// 修正后的金额：{ 科目编码: { debit, credit } }
// ONLY include entries that need to change
const AMOUNTS = {
  '02': {
    '6001': { debit: 223097.35, credit: 0 },
    '6603': { debit: 256.25, credit: 0 },
    '660201': { debit: 0, credit: 1760 },
    '6602': { debit: 0, credit: 19160 },
    '4103': { debit: 132439.20, credit: 0 },
  },
  '03': {
    '4103': { debit: 9566.25, credit: 0 },
    '6602': { debit: 0, credit: 9600 },
    '660201': { debit: 0, credit: 800 },
  },
  '04': {
    '6602': { debit: 0, credit: 12000 },
    '6603': { debit: 2956.25, credit: 0 },
    '4103': { debit: 22486.25, credit: 0 },
    '6001': { debit: 180000, credit: 0 },
  },
  '05': {
    '6602': { debit: 0, credit: 13000 },
    '660201': { debit: 0, credit: 600 },
    '6601': { debit: 0, credit: 49500 },
    '6603': { debit: 0, credit: 543.75 },
    '4103': { debit: 450411.25, credit: 0 },
  },
  '06': {
    '6602': { debit: 0, credit: 8800 },
    '660201': { debit: 0, credit: 750 },
    '4103': { debit: 161831.17, credit: 0 },
  },
  '07': {
    '6602': { debit: 0, credit: 11200 },
    '660201': { debit: 0, credit: 680 },
    '4103': { debit: 197110.42, credit: 0 },
  },
  '08': {
    '6602': { debit: 0, credit: 18500 },
    '660201': { debit: 0, credit: 700 },
    '4103': { debit: 394060.42, credit: 0 },
    '6001': { debit: 495000, credit: 0 },
  },
  '09': {
    '6602': { debit: 0, credit: 20050 },
    '660201': { debit: 0, credit: 800 },
    '4103': { debit: 27863.67, credit: 0 },
    '6001': { debit: 221200, credit: 0 },
  },
  '10': {
    '6602': { debit: 0, credit: 17300 },
    '660201': { debit: 0, credit: 700 },
    '4103': { debit: 51036.65, credit: 0 },
    '6001': { debit: 307079.65, credit: 0 },
    '6603': { debit: 0, credit: 4788 },
    '6701': { debit: 8400, credit: 0 },
  },
  '11': {
    '6602': { debit: 0, credit: 41700 },
    '660201': { debit: 0, credit: 600 },
    '4103': { debit: 0, credit: 51545 },
    '6001': { debit: 120000, credit: 0 },
    '6603': { debit: 0, credit: 325 },
  },
  '12': {
    '6602': { debit: 0, credit: 18500 },
    '660201': { debit: 0, credit: 500 },
    '4103': { debit: 0, credit: 32094 },
    '6001': { debit: 160000, credit: 0 },
    '6603': { debit: 0, credit: 295 },
  },
}

// 需要删除的分录（科目编码）
const REMOVE = {
  '02': [],
  '03': [],
  '04': [],
  '05': [],
  '06': [],
  '07': [],
  '08': [],
  '09': [],
  '10': ['6701'], // remove 6701 with 0 credit duplicate
  '11': [],
  '12': [],
}

// 需要新增的分录（完整对象）
const ADD = {}

const BASE_DIR = path.join(__dirname, '..', 'src', 'data', 'tutorials')

for (const [month, cfg] of Object.entries(FILES)) {
  const fp = path.join(BASE_DIR, cfg.base, cfg.file)
  let content = fs.readFileSync(fp, 'utf8')

  const titleIdx = content.indexOf(cfg.title)
  if (titleIdx === -1) { console.log(`月${month}: 未找到任务 "${cfg.title}"`); continue }

  const entriesStart = content.indexOf('entries: [', titleIdx)
  const arrStart = content.indexOf('[', entriesStart)

  let depth = 0, arrEnd = -1
  for (let i = arrStart; i < content.length; i++) {
    if (content[i] === '[') depth++
    else if (content[i] === ']') { depth--; if (depth === 0) { arrEnd = i + 1; break } }
  }

  const beforeBlock = content.substring(0, arrStart)
  const entriesBlock = content.substring(arrStart, arrEnd)
  const afterBlock = content.substring(arrEnd)

  // Parse entries
  let eDepth = 0, eStart = -1
  const entries = []
  for (let i = 0; i < entriesBlock.length; i++) {
    if (entriesBlock[i] === '{') { if (eDepth === 0) eStart = i; eDepth++ }
    else if (entriesBlock[i] === '}') { eDepth--; if (eDepth === 0 && eStart !== -1) {
      entries.push(entriesBlock.substring(eStart, i + 1)); eStart = -1
    }}
  }

  const changes = AMOUNTS[month] || {}
  const removes = REMOVE[month] || []
  let modifiedCount = 0

  const newEntries = entries.filter(raw => {
    const code = (raw.match(/subjectCode:\s*'([^']*)'/) || [])[1]
    // Remove?
    if (removes.includes(code)) { console.log(`  月${month}: 删除 ${code}`); return false }
    return true
  }).map(raw => {
    const code = (raw.match(/subjectCode:\s*'([^']*)'/) || [])[1]
    const amt = changes[code]
    if (!amt) return raw

    let modified = raw
    // Replace debit value
    if (typeof amt.debit === 'number') {
      modified = modified.replace(/debit:\s*[0-9.]+/, `debit: ${amt.debit}`)
    }
    // Replace credit value
    if (typeof amt.credit === 'number') {
      modified = modified.replace(/credit:\s*[0-9.]+/, `credit: ${amt.credit}`)
    }
    if (modified !== raw) {
      modifiedCount++
      console.log(`  月${month}: ${code} → dr=${amt.debit} cr=${amt.credit}`)
    }
    return modified
  })

  // Rebuild
  const newBlock = beforeBlock + '[\n' + newEntries.join(',\n') + '\n      ]' + afterBlock.substring(afterBlock.indexOf(']') + 2)
  fs.writeFileSync(fp, newBlock, 'utf8')
  console.log(`月${month}: ✅ ${modifiedCount}处修改，${newEntries.length}条分录`)
}
console.log('\n全部完成！')
