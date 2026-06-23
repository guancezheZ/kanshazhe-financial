/**
 * 修复05-06月 cashFlowExplanation 问题：
 * 1. 移除第一个冗余的cashFlowExplanation（在debit和credit之间的）
 * 2. 替换剩余的cashFlowExplanation: ''为正确内容
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

  // Step 1: Remove FIRST cashFlowExplanation when duplicate exists (between debit and credit)
  // Pattern: debit: X, cashFlowExplanation: '...', credit:
  const step1Regex = /(debit:\s*[\d.]+),\s*cashFlowExplanation:\s*'[^']*',\s*(credit:)/g
  const afterStep1 = content.replace(step1Regex, '$1, $2')
  if (afterStep1 !== content) {
    content = afterStep1
    changed = true
    console.log(`${month}月: 移除了重复的cashFlowExplanation`)
  }

  // Step 2: Fix trailing triple quote issue (''') -> ('})
  const step2Regex = /'''/g
  const afterStep2 = content.replace(step2Regex, "'}")
  if (afterStep2 !== content) {
    content = afterStep2
    changed = true
    console.log(`${month}月: 修复了多余引号`)
  }

  // Step 3: Replace remaining cashFlowExplanation: '' with proper text
  const step3Regex = /cashFlowItem:\s*'([^']+)',\s*cashFlowExplanation:\s*''/g
  const afterStep3 = content.replace(step3Regex, (match, cfItem) => {
    const expl = cfExplanations[cfItem]
    return expl ? `cashFlowItem: '${cfItem}', cashFlowExplanation: '${expl}'` : match
  })
  if (afterStep3 !== content) {
    content = afterStep3
    changed = true
    console.log(`${month}月: 替换了空的cashFlowExplanation`)
  }

  if (changed) {
    writeFileSync(filePath, content, 'utf-8')
  }
}

console.log('完成！')
