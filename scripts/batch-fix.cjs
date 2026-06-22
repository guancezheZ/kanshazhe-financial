/**
 * 批量修复制造业月末结转 entries（月06-12）
 * 只改 entries 的 debit/credit 值，保留 explanation 和 doc 结构
 */
const fs = require('fs'), path = require('path');
const BASE = path.join(__dirname, '..', 'src', 'data', 'tutorials', 'months');

// 各月正确的结转条目（从 generate-fix 输出提取，已修正 4103 方向）
// 格式: { 科目: { dr|cr: 金额 } }
const FIX = {
  '06': {
    dr: { '6001': 295000, '6111': 104.17 },
    cr: { '6401': 135000, '6403': 3055, '6601': 43000, '6602': 8800, '660201': 750, '660202': 3200, '660203': 32000, '6701': 6780, '6801': 35688, '5101': 5000 },
    np: { dr:0, cr: 156831.17 }
  },
  '07': {
    dr: { '6001': 280000, '6301': 12000, '6111': 104.17 },
    cr: { '6401': 126000, '6403': 3250, '6601': 41000, '6602': 11200, '660201': 680, '660202': 2800, '660203': 31000, '6603': 543.75, '6701': 4520 },
    np: { dr:0, cr: 165467.42 }
  },
  '08': {
    dr: { '6001': 495000, '6051': 10000, '6111': 104.17 },
    cr: { '6401': 140000, '6403': 3705, '6601': 42000, '6602': 18500, '660201': 700, '660202': 3000, '660203': 31000, '6603': 1488.75, '6701': 10650, '5101': 5000 },
    np: { dr:0, cr: 389060.42 }
  },
  '09': {
    dr: { '6001': 221200, '6051': 8000, '6101': 2000, '6111': 24104.17, '6603': 9475 },
    cr: { '6401': 80000, '6402': 1187.5, '6403': 1430, '6601': 45500, '6602': 20050, '660201': 800, '660203': 31000, '6701': 2750, '6801': 54198, '5101': 5000 },
    np: { dr: 3913.67, cr:0 }
  },
  '10': {
    dr: { '6001': 307079.65, '6051': 8000, '6111': 28000, '6701': 8400 },
    cr: { '6401': 180000, '6402': 2375, '6403': 2080, '6601': 44800, '6602': 17300, '660201': 700, '660203': 31000, '6603': 4788, '5101': 5000 },
    np: { dr:0, cr: 46036.65 }
  },
  '11': {
    dr: { '6602': 23000, '660101': 8000 },
    cr: { '530101': 23000, '6602': 17000, '6603': 145, '5101': 5000 },
    np: { dr: 30145, cr:0 }
    // Note: months 11 has special closing (研发支出费用化), not 期间损益
    // 6602 has dr 23000 (研发支出结转) AND cr 17000 (管理费用结转) → should net correctly
  },
  '12': {
    dr: { '6001': 160000, '6051': 8000, '6111': 12000, '6701': 1500 },
    cr: { '6401': 80000, '6402': 2375, '6403': 1560, '6601': 44500, '6602': 18500, '660201': 500, '660203': 31000, '6603': 295, '6801': 26864, '5101': 5000 },
    np: { dr: 40094, cr:0 }
  }
};

function findClosingEntries(content) {
  const idx = content.indexOf("'月末结转");
  if (idx === -1) return null;
  // Find the entries array of this task
  const taskStart = content.lastIndexOf('{', idx);
  const taskPart = content.substring(taskStart);
  const entriesLabel = 'entries:';
  const ei = taskPart.indexOf(entriesLabel);
  if (ei === -1) return null;
  const es = taskPart.indexOf('[', ei);
  if (es === -1) return null;
  let d = 0, ee = -1;
  for (let i = es; i < taskPart.length; i++) {
    if (taskPart[i] === '[') d++;
    else if (taskPart[i] === ']') { d--; if (d === 0) { ee = i; break; } }
  }
  if (ee === -1) return null;
  return { content: taskPart, entriesSection: taskPart.substring(es, ee+1), start: taskStart, entriesStart: es, entriesEnd: ee+1 };
}

// Build new entries
function buildEntries(month) {
  const f = FIX[month];
  if (!f) return null;
  const lines = ['['];
  for (const [code, amt] of Object.entries(f.dr)) {
    lines.push(`      { subjectCode: '${code}', debit: ${amt}, credit: 0 },`);
  }
  for (const [code, amt] of Object.entries(f.cr)) {
    lines.push(`      { subjectCode: '${code}', debit: 0, credit: ${amt} },`);
  }
  if (f.np.dr > 0) {
    lines.push(`      { subjectCode: '4103', debit: ${f.np.dr}, credit: 0 },`);
  } else {
    lines.push(`      { subjectCode: '4103', debit: 0, credit: ${f.np.cr} },`);
  }
  lines[lines.length-1] = lines[lines.length-1].replace(/,$/, '');
  lines.push('    ]');
  return lines.join('\n');
}

const months = Object.keys(FIX);
for (const m of months) {
  const fp = path.join(BASE, `${m}.js`);
  let content = fs.readFileSync(fp, 'utf8');
  const backup = fp + '.bak2';
  if (!fs.existsSync(backup)) fs.writeFileSync(backup, content);

  const found = findClosingEntries(content);
  if (!found) { console.log(`月${m}: 未找到结转 entries`); continue; }

  const newEntries = buildEntries(m);
  if (!newEntries) { console.log(`月${m}: 无法构建 entries`); continue; }

  // Replace old entries with new ones
  const before = content.substring(0, found.start + found.entriesStart);
  const after = content.substring(found.start + found.entriesEnd);
  content = before + '\n' + newEntries + '\n' + after;

  fs.writeFileSync(fp, content, 'utf8');
  console.log(`月${m}: ✅ 已修复`);
}

console.log('修复完成');
