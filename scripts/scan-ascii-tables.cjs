/**
 * 扫描 text 文档中的 ASCII 表格（┌─┬─┐）
 * 用于评估转换范围
 * 用法：node scripts/scan-ascii-tables.cjs
 */
const fs = require('fs')
const path = require('path')

const FILES = [
  'src/data/tutorials/construction/04.js',
  'src/data/tutorials/construction/05.js',
  'src/data/tutorials/construction/06.js',
  'src/data/tutorials/construction/07.js',
  'src/data/tutorials/construction/08.js',
  'src/data/tutorials/construction/09.js',
  'src/data/tutorials/construction/10.js',
  'src/data/tutorials/construction/11.js',
  'src/data/tutorials/construction/12.js',
]

let totalText = 0, totalTables = 0

for (const f of FILES) {
  const fullPath = path.resolve(__dirname, '..', f)
  const text = fs.readFileSync(fullPath, 'utf8')
  const lines = text.split('\n')
  let textDocs = 0, tables = 0, asciiDocs = 0
  let inTextDoc = false, hasTable = false

  for (const l of lines) {
    if (l.includes("type: 'text'")) {
      textDocs++
      inTextDoc = true
      hasTable = false
    } else if (l.includes('},') && inTextDoc) {
      if (hasTable) asciiDocs++
      inTextDoc = false
      hasTable = false
    }
    if (l.includes('┌') || l.includes('├') || l.includes('│') || l.includes('└')) {
      tables++
      hasTable = true
    }
  }

  console.log(`${f}: text=${textDocs}, asciiDocs=${asciiDocs}, tableLines=${tables}`)
  totalText += textDocs
  totalTables += asciiDocs
}

console.log(`\n合计: text=${totalText}, asciiTableDocs=${totalTables}`)
