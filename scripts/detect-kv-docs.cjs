/**
 * 检测所有未转换的 text 文档，识别键值对型（可结构化）vs 其他类型
 */
const fs = require('fs')

const files = ['01','02','03','04','05','06','07','08','09','10','11','12']

for (const m of files) {
  const text = fs.readFileSync(`src/data/tutorials/construction/${m}.js`, 'utf8')
  const lines = text.split(/\r?\n/)

  for (let i = 0; i < lines.length; i++) {
    if (!lines[i].includes("type: 'text'")) continue

    // 找 label 和 content
    let label = '', content = '', hasHeaders = false, skip = false
    for (let k = i; k < Math.min(i + 6, lines.length); k++) {
      const lm = lines[k].match(/label:\s*'([^']+)'/)
      if (lm) label = lm[1]
      const cm = lines[k].match(/content:\s*'((?:[^'\\]|\\.)*)'/)
      if (cm) content = cm[1]
    }
    // 也查内容后面的行
    for (let k = i + 6; k < Math.min(i + 20, lines.length); k++) {
      if (lines[k].match(/headers:/)) hasHeaders = true
      if (lines[k].includes('},') || lines[k].trim() === '}') break
    }
    if (hasHeaders || !content) continue

    // 检测内容类型
    const real = content.replace(/\\n/g, '\n').replace(/\\'/g, "'")

    // 合同检测
    if (/合同/.test(label) || /合同/.test(content)) { skip = true; continue }

    // 检测键值对模式（含：或：的值）
    const kvLines = real.split('\n').filter(l => /[:：]/.test(l) && l.trim().length > 3)
    const totalLines = real.split('\n').filter(l => l.trim().length > 0)

    const isKV = kvLines.length >= 2 && kvLines.length === totalLines.length
    const isSingleKV = kvLines.length === 1 && totalLines.length <= 2
    const isContractLike = /合同|协议/.test(label) || /签字|签章|盖章/.test(real)

    if (isKV) {
      console.log(`📊 ${m}.js: ${label} (${kvLines.length}行键值对)`)
    } else if (isSingleKV || totalLines.length <= 2) {
      console.log(`📝 ${m}.js: ${label} (简短说明)`)
    } else if (!isContractLike) {
      console.log(`📋 ${m}.js: ${label} (混合内容，${totalLines.length}行)`)
    } else {
      skip = true
    }
  }
}
