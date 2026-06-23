import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

function gen(e, taskTitle) {
  const s = e.subjectCode || '';
  const summary = e.summary || '';

  if (taskTitle.match(/期末结转|结转损益/)) {
    if (s === '6401') return '主营业务成本结转至本年利润。借：本年利润，贷：主营业务成本。'
    if (s === '6403') return '税金及附加结转至本年利润。借：本年利润，贷：税金及附加。'
    if (s.startsWith('6601')) return '销售费用结转至本年利润。借：本年利润，贷：销售费用。'
    if (s.startsWith('6602')) return '管理费用结转至本年利润。借：本年利润，贷：管理费用。'
    if (s === '6603') return '财务费用结转至本年利润。借：本年利润，贷：财务费用。'
    if (s.startsWith('6') && !s.startsWith('6401') && !s.startsWith('6403')) return '收入类科目结转至本年利润贷方。'
    return '期末结转至本年利润。'
  }
  if (summary.match(/收入|销售收入/) && !summary.includes('利息')) return '销售收入增加记贷方。不含税金额贷记主营业务收入。'
  if (summary.match(/销项/)) return '增值税销项税额增加记贷方。销售商品适用13%税率。'
  if (summary.match(/POS收款|收款/)) return '银行存款增加记借方。POS收款T+1到账。'
  if (summary.match(/入库/) && s.startsWith('14')) return '库存商品增加记借方。采购商品验收入库。'
  if (summary.match(/进项/)) return '增值税进项税额增加记借方。取得专用发票可抵扣。'
  if (summary.includes('付款') && s.startsWith('1002')) return '银行存款减少记贷方。支付采购货款。'
  if (summary.includes('支付货款') && s.startsWith('1002')) return '银行存款减少记贷方。支付采购货款。'
  if (s === '220203') return '应付账款增加记贷方。赊购商品形成应付供应商款项。'
  if (summary.match(/到账|提现到账/)) return '银行存款增加记借方。第三方支付资金提现到账。'
  if (summary.includes('微信转出') || summary.includes('支付宝转出')) return '其他货币资金减少记贷方。第三方支付资金转出。'
  if (summary.includes('手续费') && s.startsWith('6603')) return '手续费计入财务费用。'
  if (summary.includes('手续费') && s.startsWith('1002')) return '银行存款减少记贷方。银行扣收手续费。'
  if (summary.includes('银行扣费')) return '银行存款减少记贷方。银行扣收费用。'
  if (summary.includes('冲减') && s.startsWith('6603')) return '利息收入冲减财务费用（贷方红字）。'
  if (summary.includes('利息') && s.startsWith('1002')) return '银行存款利息收入增加。'
  if (summary.includes('利息') && s.startsWith('6603')) return '利息收入冲减财务费用。'
  if (summary.includes('入库')) return '库存商品增加记借方。'
  if (summary.includes('出库') || summary.includes('损耗')) return '库存商品减少记贷方。存货出库。'
  if (summary.includes('赊购') || summary.includes('应付')) return '应付账款增加记贷方。'
  if (debit > 0) return '借方增加。'
  if (credit > 0) return '贷方增加。'
  return '根据业务性质处理。'
}

const months = ['02','03','04','05','06'];
for (const m of months) {
  const filePath = resolve(__dirname, '../src/data/tutorials/commercial', m + '.js');
  let content = readFileSync(filePath, 'utf-8');
  const fileUrl = 'file:///' + filePath.replace(/\\/g, '/');
  const { default: tasks } = await import(fileUrl);
  let modified = false;

  for (const task of tasks) {
    if (!task.entries) continue;
    for (const entry of task.entries) {
      if (entry.explanation !== '') continue;
      const expl = gen(entry, task.title);
      if (!expl) { console.log(m + '月 无法生成: ' + task.title + '/' + entry.subjectCode); continue; }

      // Find the entry in text using subjectCode + summary
      const escSubject = entry.subjectCode.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
      const escSummary = (entry.summary || '').replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')

      // Pattern: explanation: '', near the matching subjectCode and summary
      const pattern = new RegExp(
        `subjectCode:\\s*'${escSubject}'[\\s\\S]{0,300}?explanation:\\s*''`,
        's'
      )
      const match = content.match(pattern)
      if (!match) { console.log(m + '月 未找到: ' + task.title + '/' + entry.subjectCode + '/' + entry.summary); continue; }

      const pos = match.index + match[0].length - 2
      content = content.slice(0, pos) + `'${expl.replace(/'/g, "\\'")}'` + content.slice(pos + 2)
      modified = true
    }
  }

  if (modified) {
    writeFileSync(filePath, content, 'utf-8');
    console.log(m + '月: fixed');
  } else {
    console.log(m + '月: 无变化');
  }
}
