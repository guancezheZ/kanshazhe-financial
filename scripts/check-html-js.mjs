/**
 * 检查生成HTML的JS语法错误
 */
import fs from 'fs'

const html = fs.readFileSync('docs/教学知识点介绍.html', 'utf8')
const match = html.match(/\(function\(\)\{([\s\S]*?)}\)\(\);/)
if (!match) { console.log('IIFE not found'); process.exit(1) }

const code = match[1]
const lines = code.split('\n')

for (let i = 0; i < lines.length; i++) {
  try {
    new Function(lines.slice(0, i + 1).join('\n'))
  } catch (e) {
    console.log(`Error at line ${i + 1}: ${e.message}`)
    console.log(`Line content: ${lines[i].substring(0, 150)}`)
    // Show context
    if (i > 0) console.log(`Previous: ${lines[i-1].substring(0, 150)}`)
    break
  }
}
