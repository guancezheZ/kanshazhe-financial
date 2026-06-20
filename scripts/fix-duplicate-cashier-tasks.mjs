/**
 * 批量删除 service 各月中重复的现金盘点/银行对账
 *
 * 问题：部分 service 月份文件末尾的"出纳月末"区段中，
 * 现金盘点 和 银行对账 与主区段重复（同日期同标题）。
 * 月末票据归档 标题不同（"月末票据归档" vs "票据归档"），保留。
 *
 * 用法：node scripts/fix-duplicate-cashier-tasks.mjs
 */

import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

const MONTHS = ['06', '07', '08', '09', '10', '11']

for (const m of MONTHS) {
  const filePath = resolve(ROOT, `src/data/tutorials/service/${m}.js`)
  let src = readFileSync(filePath, 'utf8')

  // Find the second "现金盘点" — this is the duplicate
  const firstIdx = src.indexOf('"title": "现金盘点"')
  const secondIdx = src.indexOf('"title": "现金盘点"', firstIdx + 10)

  if (secondIdx === -1) {
    console.log(`⚠️  ${m}: 未找到第二个现金盘点，跳过`)
    continue
  }

  // Find the start of this task block: go backwards to find the matching "  {"
  const blockStart = src.lastIndexOf('\n  {', secondIdx)
  if (blockStart === -1) {
    console.log(`⚠️  ${m}: 无法定位现金盘点块起始，跳过`)
    continue
  }

  // Find the end of the following "银行对账" block
  const bankTitleIdx = src.indexOf('"title": "银行对账"', secondIdx)
  if (bankTitleIdx === -1) {
    console.log(`⚠️  ${m}: 找不到现金盘点后的银行对账，跳过`)
    continue
  }

  // Find the end of the 银行对账 block: look for the "}," or "}" that closes it,
  // then the next line starting with "  {" or "];"
  const afterBank = src.indexOf('\n  {', bankTitleIdx)
  let blockEnd
  if (afterBank !== -1) {
    // There's another task after 银行对账 — end at the } before the next task
    blockEnd = src.lastIndexOf('\n  },\n', afterBank)
    if (blockEnd === -1) {
      blockEnd = src.lastIndexOf('\n  }\n', afterBank)
    }
  } else {
    // 银行对账 is the last task — end at the closing of the array
    blockEnd = src.lastIndexOf('\n];')
  }

  if (blockEnd === -1 || blockEnd <= blockStart) {
    console.log(`⚠️  ${m}: 无法定位银行对账块结束，跳过`)
    continue
  }

  // Include the closing } and the trailing comma if present (before next task)
  const blockContent = src.slice(blockStart, blockEnd)
  const fixContent = src.slice(0, blockStart) + src.slice(blockEnd)

  // Verify: count should drop by 2
  const beforeCount = (src.match(/"现金盘点"/g) || []).length
  const afterCount = (fixContent.match(/"现金盘点"/g) || []).length

  if (afterCount !== beforeCount - 1) {
    console.log(`⚠️  ${m}: 现金盘点计数异常 ${beforeCount}→${afterCount}，跳过`)
    continue
  }

  writeFileSync(filePath, fixContent, 'utf8')
  console.log(`✅  ${m}: 已删除重复的现金盘点/银行对账（原${beforeCount}个现金盘点，现${afterCount}个）`)
}

// Verify test still passes
console.log('\n修复完成。请运行 npm run test 确认。')
