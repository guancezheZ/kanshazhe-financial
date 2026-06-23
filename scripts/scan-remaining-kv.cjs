/**
 * 扫描剩余可转换的键值对文档（04-12.js 中未转换的）
 */
const fs = require('fs')

let remaining = []

for (let m = 4; m <= 12; m++) {
  const fn = m < 10 ? '0' + m : '' + m
  const text = fs.readFileSync(`src/data/tutorials/construction/${fn}.js`, 'utf8')
  const lines = text.split(/\r?\n/)

  for (let i = 0; i < lines.length; i++) {
    if (!lines[i].includes("type: 'text'")) continue

    let label = '', content = '', hasHeaders = false

    for (let k = i; k < Math.min(i + 6, lines.length); k++) {
      const lm = lines[k].match(/label:\s*'([^']+)'/)
      if (lm) label = lm[1]
      const cm = lines[k].match(/content:\s*'((?:[^'\\]|\\.)*)'/)
      if (cm) content = cm[1]
    }

    // 查找当前文档块内是否有 headers
    for (let k = i + 5; k < Math.min(i + 25, lines.length); k++) {
      if (lines[k].includes('headers:')) { hasHeaders = true; break }
      if (lines[k].includes('},') || lines[k].trim() === '}') break
    }

    if (hasHeaders || !content) continue

    // 检测键值对
    const real = content.replace(/\\n/g, '\n')
    const kvLines = real.split('\n').filter(l =>
      /^[^┌│]+[：:]\s*\S+/.test(l.trim()) && !/合同/.test(l)
    )

    if (kvLines.length >= 2) {
      remaining.push(`${fn}.js: ${label} (${kvLines.length} KV行)`)
    }
  }
}

console.log('剩余可转KV文档：')
remaining.forEach(r => console.log('  ' + r))
console.log('\n合计：' + remaining.length + ' 个')
