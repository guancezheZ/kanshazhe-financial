/**
 * 批量修复教学任务中缺失的 role 字段（v3 — 括号计数法）
 * 用 brace counting 精确定位每个任务的起止，只在无 role 的任务中插入
 * 用法：node scripts/fix-missing-roles.mjs
 */
import fs from 'fs'

const files = [
  'src/data/tutorials/year1.js',
  ...Array.from({length: 11}, (_, i) => `src/data/tutorials/months/${String(i+2).padStart(2,'0')}.js`),
  ...Array.from({length: 12}, (_, i) => `src/data/tutorials/commercial/${String(i+1).padStart(2,'0')}.js`),
  ...Array.from({length: 12}, (_, i) => `src/data/tutorials/service/${String(i+1).padStart(2,'0')}.js`),
  ...Array.from({length: 12}, (_, i) => `src/data/tutorials/construction/${String(i+1).padStart(2,'0')}.js`),
]

let totalFixed = 0

function fixMissingRoles(content) {
  const lines = content.split('\n')
  const result = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // 检测任务开始：{ 后跟 date: 或 title:
    if (/^\s*\{\s*$/.test(line) || /^\s*\{\s*["']?(?:date|title)\s*:/.test(line)) {
      // 收集这个任务的完整行
      let taskLines = [line]
      i++
      let braceDepth = 0
      // 计算当前行的括号深度
      for (const ch of line) {
        if (ch === '{') braceDepth++
        if (ch === '}') braceDepth--
      }

      // 继续读取直到括号闭合
      while (i < lines.length && braceDepth > 0) {
        const l = lines[i]
        taskLines.push(l)
        for (const ch of l) {
          if (ch === '{') braceDepth++
          if (ch === '}') braceDepth--
        }
        i++
      }

      // 双引号 JSON 格式（service/04-12.js），任务在一行内：{ "date": "...", ... }
      // 标准格式：多行 { \n    date: ..., \n    title: ..., \n    ..., }

      const taskBlock = taskLines.join('\n')

      // 检查是否已经有 role: 字段
      if (!/\brole\s*:/.test(taskBlock) && !/"role"\s*:/.test(taskBlock)) {
        // 找到第一个字段的结尾（即第一个逗号后）
        let fixed = taskBlock

        if (taskLines.length === 1 && taskBlock.includes('"date"')) {
          // JSON 紧凑格式：{"date":"...","title":"...",...}
          fixed = taskBlock.replace(/^(\s*\{)/, '$1\n      "role": "accountant",')
        } else {
          // 多行格式：在第一个字段行（date: 或 title:）后插入
          // 兼容格式：date: / "date": / 'date': / title: / "title": / 'title':
          const fieldLineIdx = taskLines.findIndex(l => /["']?(?:date|title)["']?\s*:/.test(l))
          if (fieldLineIdx >= 0) {
            const fieldLine = taskLines[fieldLineIdx]
            const indent = fieldLine.match(/^(\s*)/)[1] || '      '
            // 判断是 JSON 双引号格式还是 JS 单引号格式
            // 判断 JSON 格式：第一个字段键名是双引号包着的（"date": 而非 date:）
            const isJson = /"date"\s*:/.test(fieldLine)
            if (isJson) {
              taskLines[fieldLineIdx] = fieldLine + '\n' + indent + '"role": "accountant",'
            } else {
              taskLines[fieldLineIdx] = fieldLine + '\n' + indent + "role: 'accountant',"
            }
            fixed = taskLines.join('\n')
          }
        }

        if (fixed !== taskBlock) {
          result.push(fixed)
          totalFixed++
          continue
        }
      }

      result.push(taskBlock)
    } else {
      result.push(line)
      i++
    }
  }

  return result.join('\n')
}

for (const fp of files) {
  if (!fs.existsSync(fp)) {
    console.log(`${fp.replace('src/data/tutorials/', '')}: 跳过`)
    continue
  }
  const original = fs.readFileSync(fp, 'utf8')
  const fixed = fixMissingRoles(original)
  if (fixed !== original) {
    fs.writeFileSync(fp, fixed, 'utf8')
    console.log(`${fp.replace('src/data/tutorials/', '')}: OK`)
  }
}
console.log(`\n总共修复: ${totalFixed} 个任务`)
