/**
 * 为制造业/服务业/建筑业添加模拟纳税申报任务（v5 — 修复版）
 *
 * Fix:
 * 1. 正确插入新任务（删除原数组闭括号前的内容，插入新任务后重新闭合）
 * 2. content 字段中使用「提交申报」而非 "提交申报" 避免 JS 语法错误
 */
const fs = require('fs')

const LAST_DAYS = { '01':31,'02':28,'03':31,'04':30,'05':31,'06':30,'07':31,'08':31,'09':30,'10':31,'11':30,'12':31 }

function buildTaxTask(mm, dd) {
  const mn = parseInt(mm, 10)
  const ds = '2026-' + mm + '-' + String(dd).padStart(2, '0')
  const dt = mn + '月纳税申报提醒'
  const ct = '申报期间：' + ds + '\\n\\n请前往纳税申报页面：\\n1. 核对增值税申报表数据\\n2. 核对企业所得税申报表数据\\n3. 确认无误后点击「提交申报」\\n\\n纳税申报是企业每月必做的合规义务，请按时完成。'
  return [
    '  {',
    '    date: "' + ds + '",',
    '    title: "模拟纳税申报",',
    '    tags: ["期末", "税费"],',
    '    difficulty: 1,',
    '    description: "根据本月已完成的账务处理，进行模拟纳税申报。系统已自动计算应缴税额（增值税和企业所得税），请前往纳税申报页面核对并提交。",',
    '    tip: "纳税申报是企业每月的法定义务。确认所有凭证已过账、期末结转已完成后，前往纳税申报页面核对各项税额后点击「提交申报」。",',
    '    entries: [],',
    '    documents: [',
    '      { type: "text", label: "纳税申报提醒", docTitle: "' + dt + '", content: "' + ct + '", stampText: "财务专用章" }]},'
  ].join('\n')
}

/**
 * 在 tasks 数组末尾插入新任务
 *
 * 策略：找到最后一个 ]（数组闭括号）前的内容，
 * 在原有最后一个任务后加逗号，插入新任务，再重新闭合数组
 */
function addTask(filePath, mm, exportName) {
  let content = fs.readFileSync(filePath, 'utf-8')
  const taxTask = buildTaxTask(mm, LAST_DAYS[mm])

  const exportIdx = content.lastIndexOf('export default ' + exportName)
  if (exportIdx < 0) {
    console.log('  FAIL - export not found for', mm, exportName)
    return false
  }

  // 找到最后一个 ]（即原 tasks 数组的闭括号）
  const bracketIdx = content.lastIndexOf(']', exportIdx)
  if (bracketIdx < 0) {
    console.log('  FAIL - no closing bracket')
    return false
  }

  // 在 ] 之前插入新任务：删除原 ]，在最后一个任务后添加逗号，插入新任务，然后重新加 ]
  // before = ] 之前的所有内容（包含最后一个任务末尾的 }\n）
  // 去掉末尾空白字符 → 确保最后一个字符是 }（去掉可能已有的逗号）→ 加逗号 → 新任务 → 原 ] → 之后的内容
  const before = content.slice(0, bracketIdx).trimEnd().replace(/,+$/, '')
  const after = content.slice(bracketIdx)  // 包含 ] 和其后的空白/export
  const newContent = before + ',\n' + taxTask + '\n' + after

  fs.writeFileSync(filePath, newContent, 'utf-8')
  return true
}

let ok = 0, fail = 0

// ── 1. 制造业 months/02-12.js ──
console.log('=== 制造业 months/02-12.js ===')
const monthVarNames = {
  '02':'feb','03':'mar','04':'apr','05':'may','06':'jun',
  '07':'jul','08':'aug','09':'sep','10':'oct','11':'nov','12':'dec'
}
for (let m = 2; m <= 12; m++) {
  const mm = String(m).padStart(2, '0')
  const r = addTask('src/data/tutorials/months/' + mm + '.js', mm, monthVarNames[mm])
  console.log(mm + '.js ' + (r ? 'OK' : 'FAIL'))
  if (r) ok++; else fail++
}

// ── 2. 服务业 service/01-12.js ──
console.log('\n=== 服务业 service/01-12.js ===')
for (let m = 1; m <= 12; m++) {
  const mm = String(m).padStart(2, '0')
  const r = addTask('src/data/tutorials/service/' + mm + '.js', mm, 'tasks')
  console.log(mm + '.js ' + (r ? 'OK' : 'FAIL'))
  if (r) ok++; else fail++
}

// ── 3. 建筑业 construction/01-12.js ──
console.log('\n=== 建筑业 construction/01-12.js ===')
for (let m = 1; m <= 12; m++) {
  const mm = String(m).padStart(2, '0')
  const r = addTask('src/data/tutorials/construction/' + mm + '.js', mm, 'tasks')
  console.log(mm + '.js ' + (r ? 'OK' : 'FAIL'))
  if (r) ok++; else fail++
}

// ── 4. 制造业 year1.js（1月） ──
console.log('\n=== 制造业 year1.js (1月) ===')
let y1 = fs.readFileSync('src/data/tutorials/year1.js', 'utf-8')
const y1TaxTask = buildTaxTask('01', '31')

const y1Match = y1.match(/}\],\r?\n  '02': feb,/)
if (y1Match) {
  const y1After = y1.slice(y1Match.index + y1Match[0].length)
  y1 = y1.slice(0, y1Match.index) + '},\n' + y1TaxTask + '\n],\n  \'02\': feb,' + y1After
  fs.writeFileSync('src/data/tutorials/year1.js', y1, 'utf-8')
  console.log('year1.js OK')
  ok++
} else {
  console.log('year1.js FAIL')
  fail++
}

console.log('\n✅ 完成: ' + ok + ' OK, ' + fail + ' FAIL')
