/**
 * 修复05-06月 cashFlowExplanation: '' 为空的分录（替换已有空值）
 */
import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const COMMERCIAL_DIR = resolve(__dirname, '../src/data/tutorials/commercial')

const cfExplanations = {
  'cf-op': '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入。',
  'cf-op2': '采购存货/商品支出，属于经营活动现金流出。',
  'cf-op5': '收到银行存款利息，属于经营活动现金流入（收到其他与经营活动有关的现金）。',
  'cf-op6': '其他经营活动现金支出（银行手续费），属于经营活动现金流出。',
}

for (const month of ['05', '06']) {
  const filePath = resolve(COMMERCIAL_DIR, `${month}.js`)
  let content = readFileSync(filePath, 'utf-8')
  let changed = false

  // Find entries with cashFlowExplanation: '' and cashFlowItem: 'cf-xxx'
  const regex = /cashFlowItem:\s*'([^']+)'[^}]*?cashFlowExplanation:\s*''/g
  let match
  while ((match = regex.exec(content)) !== null) {
    const cfItem = match[1]
    const explanation = cfExplanations[cfItem]
    if (!explanation) continue

    const start = match.index
    const end = match.index + match[0].length - 2 // -2 for the ''
    // Replace cashFlowExplanation: '' with the proper explanation
    const oldText = content.slice(start, end)
    const newText = `cashFlowItem: '${cfItem}', cashFlowExplanation: '${explanation}'`
    content = content.slice(0, start) + newText + content.slice(end)
    changed = true
    // Re-run regex from after this fix
    regex.lastIndex = start + newText.length
  }

  if (changed) {
    writeFileSync(filePath, content, 'utf-8')
    console.log(`${month}月: 修复完成`)
  } else {
    console.log(`${month}月: 无变化`)
  }
}

console.log('完成！')
