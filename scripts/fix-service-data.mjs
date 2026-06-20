/**
 * 修复服务业数据：补全缺description和summary的字段
 * 运行：node scripts/fix-service-data.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')

/**
 * 根据任务自动生成description
 */
function genDescription(task) {
  const title = task.title || ''
  const entries = task.entries || []
  const totalDebit = entries.reduce((s, e) => s + (Number(e.debit) || 0), 0)
  const totalCredit = entries.reduce((s, e) => s + (Number(e.credit) || 0), 0)

  // 无分录任务（盘点/对账/归档）
  if (entries.length === 0) {
    if (title.includes('盘点')) return '对库存现金进行月末盘点，确保账实相符。'
    if (title.includes('对账')) return '将银行日记账与银行对账单进行核对，编制余额调节表。'
    if (title.includes('归档') || title.includes('装订')) return '将本月凭证整理装订成册，归档保存。'
    return title + '。'
  }

  // 根据科目推断业务类型
  const codes = entries.map(e => e.subjectCode)
  const has1001 = codes.some(c => c === '1001')
  const has1002 = codes.some(c => c.startsWith('1002'))
  const has2221 = codes.some(c => c.startsWith('2221'))
  const has2211 = codes.some(c => c.startsWith('2211'))
  const debitSubjects = entries.filter(e => Number(e.debit) > 0).map(e => e.subjectCode)
  const creditSubjects = entries.filter(e => Number(e.credit) > 0).map(e => e.subjectCode)

  // 税款缴纳
  if (title.includes('税款') || title.includes('缴税') || (has2221 && !debitSubjects.some(c => c.startsWith('6001')))) {
    const taxAmount = totalDebit
    return `通过银行转账缴纳各项税款合计${taxAmount.toLocaleString()}元。`
  }

  // 社保缴纳
  if (title.includes('社保') || (debitSubjects.some(c => c.startsWith('2211')) && creditSubjects.some(c => c.startsWith('1002')) && !debitSubjects.some(c => c === '221101'))) {
    return `通过银行转账缴纳社保费用合计${totalDebit.toLocaleString()}元。`
  }

  // 工资发放
  if (title.includes('工资') || title.includes('代发') || (codes.some(c => c === '221101') && codes.some(c => c.startsWith('1002')))) {
    const netPay = entries.find(e => e.subjectCode?.startsWith('1002'))?.credit || 0
    const taxEntry = entries.find(e => e.subjectCode === '222102')
    if (taxEntry && Number(taxEntry.credit) > 0) {
      return `通过银行代发上月工资，实发金额${Number(netPay).toLocaleString()}元，代扣个税${Number(taxEntry.credit).toLocaleString()}元。`
    }
    return `通过银行代发工资合计${totalDebit.toLocaleString()}元。`
  }

  // 购车/资产购置
  if (title.includes('购车') || title.includes('大额转账') || debitSubjects.some(c => c.startsWith('1601'))) {
    const assetAmount = entries.find(e => e.subjectCode?.startsWith('1601'))?.debit || totalDebit
    return `通过银行转账支付设备/资产购置款${Number(assetAmount).toLocaleString()}元。`
  }

  // 借款还本付息
  if (title.includes('还本') || title.includes('借款')) {
    const principal = entries.find(e => e.subjectCode === '2001')?.debit || 0
    const interest = entries.find(e => e.subjectCode === '2232')?.debit || 0
    if (Number(interest) > 0) {
      return `偿还到期短期借款本金${Number(principal).toLocaleString()}元及利息${Number(interest).toLocaleString()}元，合计${(Number(principal) + Number(interest)).toLocaleString()}元。`
    }
    return `通过银行转账偿还借款本息合计${totalDebit.toLocaleString()}元。`
  }

  // 收款（定金/尾款/到账等）
  if (title.includes('到账') || title.includes('收款') || title.includes('定金') || (creditSubjects.some(c => c.startsWith('6001')) && debitSubjects.some(c => c.startsWith('1002')))) {
    return `收到客户款项${totalCredit.toLocaleString()}元，已存入银行账户。`
  }

  // 付款/转账
  if (title.includes('付款') || title.includes('转账') || title.includes('代扣') || title.includes('手续费')) {
    return `通过银行转账/代扣支付${totalDebit.toLocaleString()}元。`
  }

  // 微信/支付宝收款
  if (debitSubjects.some(c => c === '101204' || c === '101205')) {
    const amt = entries.find(e => e.subjectCode === '101204' || e.subjectCode === '101205')?.debit || 0
    const platform = debitSubjects.includes('101204') ? '微信' : '支付宝'
    return `通过${platform}收款${Number(amt).toLocaleString()}元。`
  }

  // 现金业务
  if (has1001 && has1002) {
    return `从银行提取现金${Number(entries.find(e => e.subjectCode === '1001')?.debit || 0).toLocaleString()}元作为备用金。`
  }
  if (has1001) {
    const cashOut = entries.find(e => e.subjectCode === '1001' && Number(e.credit) > 0)
    if (cashOut) return `以现金支付${Number(cashOut.credit).toLocaleString()}元。`
    return '以现金支付相关款项。'
  }

  // 利息
  if (title.includes('利息')) {
    const amt = entries.find(e => e.subjectCode === '6603')?.credit || 0
    if (Number(amt) > 0) return `收到银行账户利息收入${Number(amt).toLocaleString()}元。`
    return '支付银行利息费用。'
  }

  // 托收
  if (title.includes('托收')) {
    return '银行托收商业汇票到期，款项已划入银行账户。'
  }

  // 默认
  return `${title}，涉及金额${totalDebit.toLocaleString()}元。`
}

/**
 * 生成entry的summary
 */
function genSummary(entry, task) {
  if (entry.summary) return entry.summary
  const code = entry.subjectCode || ''
  const isDebit = Number(entry.debit) > 0
  const isCredit = Number(entry.credit) > 0

  // 根据科目生成
  if (code === '1001' && isDebit) return '现金增加'
  if (code === '1001' && isCredit) return '现金减少'
  if (code.startsWith('1002') && isDebit) return '银行存款增加'
  if (code.startsWith('1002') && isCredit) return '银行存款减少'
  if (code === '101204' && isDebit) return '微信收款'
  if (code === '101204' && isCredit) return '微信付款'
  if (code === '101205' && isDebit) return '支付宝收款'
  if (code === '101205' && isCredit) return '支付宝付款'
  if (code.startsWith('1601') && isDebit) return '固定资产增加'
  if (code.startsWith('2221') && isDebit) return '缴纳税费'
  if (code.startsWith('2221') && isCredit) return '计提税费'
  if (code.startsWith('2211') && isDebit) return '冲减应付薪酬'
  if (code.startsWith('2211') && isCredit) return '计提薪酬'
  if (code === '2001' && isDebit) return '偿还借款'
  if (code === '2001' && isCredit) return '取得借款'
  if (code.startsWith('6601') && isDebit) return '销售费用'
  if (code.startsWith('6602') && isDebit) return '管理费用'
  if (code === '6603' && isDebit) return '财务费用'
  if (code === '6603' && isCredit) return '利息收入'
  if (code === '6001' && isCredit) return '确认收入'
  if (code.startsWith('2205') && isDebit) return '冲减合同负债'
  if (code.startsWith('2205') && isCredit) return '合同负债增加'
  if (code === '1121' && isCredit) return '应收票据减少'
  if (code === '1121' && isDebit) return '应收票据增加'
  if (code.startsWith('5201') && isDebit) return '项目成本增加'
  if (code.startsWith('5201') && isCredit) return '项目成本减少'
  if (code.startsWith('6401') && isDebit) return '主营业务成本'
  if (code.startsWith('6403') && isDebit) return '税金及附加'
  if (isDebit) return '借方金额'
  if (isCredit) return '贷方金额'
  return ''
}

// 主流程：修复服务业 04-12 月
let totalFixed = 0
let totalSummaryFixed = 0

for (let m = 4; m <= 12; m++) {
  const mm = String(m).padStart(2, '0')
  const filePath = path.join(projectRoot, 'src/data/tutorials/service', `${mm}.js`)

  if (!fs.existsSync(filePath)) {
    console.log(`${mm}.js 不存在，跳过`)
    continue
  }

  // 读取文件内容
  let content = fs.readFileSync(filePath, 'utf-8')

  // 找出 tasks 数组的内容（简单方法：匹配 const tasks = [...] 块）
  const taskMatch = content.match(/const tasks\s*=\s*(\[[\s\S]*?\])\s*\n\s*(export default|export\s+\{)/)
  if (!taskMatch) {
    console.log(`${mm}.js: 无法解析 tasks 数组`)
    continue
  }

  // 动态导入并修改
  const modulePath = new URL(`file://${path.resolve(projectRoot, `src/data/tutorials/service/${mm}.js`)}`).href
  const module = await import(modulePath)
  const tasks = module.default || module

  let monthFixed = 0
  let monthSummaryFixed = 0

  for (const task of tasks) {
    if (!task.description) {
      task.description = genDescription(task)
      monthFixed++
    }
    for (const entry of (task.entries || [])) {
      if (!entry.summary && (Number(entry.debit) > 0 || Number(entry.credit) > 0)) {
        entry.summary = genSummary(entry, task)
        monthSummaryFixed++
      }
    }
  }

  if (monthFixed > 0 || monthSummaryFixed > 0) {
    // 重新生成文件内容（保留原注释头）
    const headerMatch = content.match(/^(\/\*\*[\s\S]*?\*\/\s*)/)
    const header = headerMatch ? headerMatch[1] : `/**\n * 服务业 ${mm}月\n */`

    // 对 tasks 做 JSON 序列化，但保留函数引用
    const serialized = JSON.stringify(tasks, (key, value) => {
      if (key === 'data' && value && typeof value === 'object' && value.events) {
        return '[Case Data]' // 防止误入案例数据
      }
      return value
    }, 2)

    const newContent = `${header}
const tasks = ${serialized};

export default tasks;
`
    fs.writeFileSync(filePath, newContent, 'utf-8')
    totalFixed += monthFixed
    totalSummaryFixed += monthSummaryFixed
    console.log(`${mm}.js: 修复 ${monthFixed} 个description, ${monthSummaryFixed} 个summary`)
  }
}

console.log(`\n✅ 修复完成: ${totalFixed} 个description, ${totalSummaryFixed} 个summary`)
