/**
 * 列出所有被跳过的 text 文档（无 ASCII 表格，也未转换）
 * 用于评估是否需要手动添加结构化数据
 */
const fs = require('fs')

const files = ['04','05','06','07','08','09','10','11','12']
let total = 0

for (const m of files) {
  const text = fs.readFileSync(`src/data/tutorials/construction/${m}.js`, 'utf8')
  const lines = text.split('\n')

  let inDoc = false, docLabel = '', hasHeaders = false, content = ''

  for (let i = 0; i < lines.length; i++) {
    const l = lines[i]

    if (l.includes("type: 'text'")) {
      inDoc = true
      hasHeaders = false
      content = ''
      docLabel = ''
      // 找 label
      for (let k = i; k <= i + 3 && k < lines.length; k++) {
        const m2 = l[k]?.match(/label:\s*'([^']+)'/)
        if (m2) { docLabel = m2[1]; break }
      }
      // 找 content
      const m3 = l.match(/content:\s*'((?:[^'\\]|\\.)*)'/)
      if (m3) content = m3[1]
      const m3b = l.match(/content:\s*`([^`]*)`/)
      if (m3b) content = m3b[1]
      // 检查后续行是否有 content
    }

    if (inDoc && l.match(/headers:/)) hasHeaders = true

    if (inDoc && !content) {
      // content 可能在下一行
      const m3 = l.match(/content:\s*'((?:[^'\\]|\\.)*)'/)
      if (m3) content = m3[1]
    }

    if (inDoc && (l.trim() === '},' || l.trim() === '}' || (l.includes('},') && !l.includes('type:') && !l.includes('label:') && !l.includes('date:') && !l.includes('docTitle:') && !l.includes('content:') && !l.includes('headers:') && !l.includes('signature:')))) {
      if (!content.includes('┌') && !hasHeaders && docLabel) {
        console.log(`${m}.js: ${docLabel}`)
        total++
      }
      inDoc = false
    }
  }
}

console.log(`\n合计: ${total} 个`)
