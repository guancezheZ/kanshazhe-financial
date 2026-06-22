import feb from './months/02.js'
import mar from './months/03.js'
import apr from './months/04.js'
import may from './months/05.js'
import jun from './months/06.js'
import jul from './months/07.js'
import aug from './months/08.js'
import sep from './months/09.js'
import oct from './months/10.js'
import nov from './months/11.js'
import dec from './months/12.js'

const tutorials = {
  '01': [
    { date: '2026-01-02', role: 'accountant', title: '提取备用金', tags: ["资金"], difficulty: 1, tip: '提取备用金。', description: '提取现金2,000元。', entries: [{ subjectCode: '1001', summary: '备用金', debit: 2000, credit: 0, explanation: '现金增加。' }, { subjectCode: '100201', summary: '提备用金', debit: 0, credit: 2000, explanation: '银行减少。' }]},
    { date: '2026-01-03', role: 'accountant', title: '购买办公用品', tags: ["费用"], difficulty: 1, tip: '办公用品入管理费。', description: '购买办公用品500元。', entries: [{ subjectCode: '660201', summary: '办公用品', debit: 500, credit: 0, explanation: '管理费增加。' }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 500, explanation: '银行减少。' }]},
    { date: '2026-01-04', role: 'accountant', title: '收到客户欠款', tags: ["资金","销售"], difficulty: 1, tip: '冲应收。', description: '收到甲公司货款50,000元。', entries: [{ subjectCode: '100201', summary: '收款', debit: 50000, credit: 0, explanation: '银行增加。' }, { subjectCode: '112201', summary: '应收', debit: 0, credit: 50000, explanation: '应收减少。' }]},
    { date: '2026-01-05', role: 'accountant', title: '采购钢材（赊购）', tags: ["采购"], difficulty: 1, tip: '赊购不涉及现金。', description: '采购A型钢材10吨150,000元。', entries: [{ subjectCode: '1403', summary: '采购', debit: 150000, credit: 0, explanation: '原材料增加。' }, { subjectCode: '220201', summary: '应付', debit: 0, credit: 150000, explanation: '应付增加。' }]},
    { date: '2026-01-06', role: 'accountant', title: '支付房租', tags: ["费用"], difficulty: 1, tip: '房租按月支付。', description: '支付1月租金8,000元。', entries: [{ subjectCode: '6602', summary: '房租', debit: 8000, credit: 0, explanation: '管理费增加。' }, { subjectCode: '100201', summary: '付房租', debit: 0, credit: 8000, explanation: '银行减少。' }]},
    { date: '2026-01-07', role: 'accountant', title: '差旅费报销', tags: ["费用"], difficulty: 1, tip: '差旅费入管理费。', description: '报销差旅费3,000元。', entries: [{ subjectCode: '660202', summary: '差旅', debit: 3000, credit: 0, explanation: '管理费增加。' }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 3000, explanation: '银行减少。' }]},
    { date: '2026-01-08', role: 'accountant', title: '采购材料+运杂费', tags: ["采购"], difficulty: 2, tip: '运杂费入存货成本。', description: '采购B型材料10,500元现购。', entries: [{ subjectCode: '1403', summary: '采购', debit: 10500, credit: 0, explanation: '原材料增加。' }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 10500, explanation: '银行减少。' }]},
    { date: '2026-01-09', role: 'accountant', title: '生产领料', tags: ["生产"], difficulty: 2, tip: '借生产，贷原材料。', description: '领用A型钢材5吨75,000元。', entries: [{ subjectCode: '500101', summary: '领料', debit: 75000, credit: 0, explanation: '生产成本增加。' }, { subjectCode: '1403', summary: '领料', debit: 0, credit: 75000, explanation: '原材料减少。' }]},
    { date: '2026-01-10', role: 'accountant', title: '支付通讯费', tags: ["费用"], difficulty: 1, tip: '通讯费入管理费。', description: '支付通讯费1,200元。', entries: [{ subjectCode: '660201', summary: '通讯费', debit: 1200, credit: 0, explanation: '管理费增加。' }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 1200, explanation: '银行减少。' }]},
    { date: '2026-01-11', role: 'accountant', title: '生产领料-辅助材料', tags: ["生产"], difficulty: 2, tip: '辅助材料入制造费用。', description: '领用辅助材料6,000元。', entries: [{ subjectCode: '5101', summary: '辅料', debit: 6000, credit: 0, explanation: '制造费用增加。' }, { subjectCode: '1403', summary: '辅料', debit: 0, credit: 6000, explanation: '原材料减少。' }]},
    { date: '2026-01-12', role: 'accountant', title: '支付广告费', tags: ["费用"], difficulty: 1, tip: '广告费入销售费用。', description: '支付1月广告费6,000元。', entries: [{ subjectCode: '660101', summary: '广告费', debit: 6000, credit: 0, explanation: '销售费增加。' }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 6000, explanation: '银行减少。' }]},
    { date: '2026-01-13', role: 'accountant', title: '直接人工归集', tags: ["生产"], difficulty: 2, tip: '人工计入生产成本。', description: '生产工人工资30,000元。', entries: [{ subjectCode: '500102', summary: '人工', debit: 30000, credit: 0, explanation: '生产成本增加。' }, { subjectCode: '221101', summary: '计提', debit: 0, credit: 30000, explanation: '应付薪酬增加。' }]},
    { date: '2026-01-14', role: 'accountant', title: '支付水电费', tags: ["费用"], difficulty: 1, tip: '水电费入管理费。', description: '支付1月水电费3,300元。', entries: [{ subjectCode: '6602', summary: '水电费', debit: 3300, credit: 0, explanation: '管理费增加。' }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 3300, explanation: '银行减少。' }]},
    { date: '2026-01-15', role: 'accountant', title: '制造费用归集', tags: ["生产"], difficulty: 2, tip: '归集车间间接成本。', description: '归集制造费用5,500元。', entries: [{ subjectCode: '5101', summary: '归集', debit: 5500, credit: 0, explanation: '制造费用增加。' }, { subjectCode: '1602', summary: '折旧', debit: 0, credit: 2000, explanation: '折旧增加。' }, { subjectCode: '100201', summary: '水电', debit: 0, credit: 3500, explanation: '银行减少。' }]},
    { date: '2026-01-16', role: 'accountant', title: '制造费用分配', tags: ["生产"], difficulty: 3, tip: '分配后余额归零。', description: '分配11,500元至生产成本。', entries: [{ subjectCode: '500103', summary: '分配', debit: 11500, credit: 0, explanation: '生产成本增加。' }, { subjectCode: '5101', summary: '分配', debit: 0, credit: 11500, explanation: '制造费用归零。' }]},
    { date: '2026-01-17', role: 'accountant', title: '完工产品入库', tags: ["生产"], difficulty: 3, tip: '借库存，贷生产成本。', description: '100台完工，成本116,500元。', entries: [{ subjectCode: '1405', summary: '完工', debit: 116500, credit: 0, explanation: '库存增加。' }, { subjectCode: '500101', summary: '材料', debit: 0, credit: 75000, explanation: '生产转出。' }, { subjectCode: '500102', summary: '人工', debit: 0, credit: 30000, explanation: '生产转出。' }, { subjectCode: '500103', summary: '制造费用', debit: 0, credit: 11500, explanation: '生产转出。' }]},
    { date: '2026-01-18', role: 'accountant', title: '现销商品', tags: ["销售"], difficulty: 2, tip: '借银行，贷收入、税费。', description: '销售50台，价款100,000，增值税13,000。', entries: [{ subjectCode: '100201', summary: '销50台', debit: 113000, credit: 0, explanation: '银行增加。' }, { subjectCode: '6001', summary: '收入', debit: 0, credit: 100000, explanation: '收入增加。' }, { subjectCode: '222101', summary: '销项税', debit: 0, credit: 13000, explanation: '增值税增加。' }]},
    { date: '2026-01-19', role: 'accountant', title: '赊销商品', tags: ["销售"], difficulty: 2, tip: '借应收，贷收入、税费。', description: '赊销60台，价款60,000，增值税7,800。', entries: [{ subjectCode: '112202', summary: '赊销', debit: 67800, credit: 0, explanation: '应收增加。' }, { subjectCode: '6001', summary: '收入', debit: 0, credit: 60000, explanation: '收入增加。' }, { subjectCode: '222101', summary: '销项税', debit: 0, credit: 7800, explanation: '增值税增加。' }]},
    { date: '2026-01-20', role: 'accountant', title: '银行利息', tags: ["资金"], difficulty: 1, tip: '利息冲财务费用。', description: '收到1月利息8,500元。', entries: [{ subjectCode: '100201', summary: '利息', debit: 8500, credit: 0, explanation: '银行增加。' }, { subjectCode: '6603', summary: '冲财务', debit: 0, credit: 8500, explanation: '财务费减少。' }]},
    { date: '2026-01-21', role: 'accountant', title: '结转销售成本', tags: ["生产","成本"], difficulty: 3, tip: '先进先出法。', description: '结转80台成本93,200元。', entries: [{ subjectCode: '6401', summary: '结转成本', debit: 93200, credit: 0, explanation: '主营成本增加。' }, { subjectCode: '1405', summary: '转成本', debit: 0, credit: 93200, explanation: '库存减少。' }]},
    { date: '2026-01-22', role: 'accountant', title: '银行账户划转', tags: ["资金"], difficulty: 1, tip: '内部资金调拨。', description: '工行转建行30,000元。', entries: [{ subjectCode: '100202', summary: '建行增加', debit: 30000, credit: 0, explanation: '建行增加。' }, { subjectCode: '100201', summary: '工行减少', debit: 0, credit: 30000, explanation: '工行减少。' }]},
    { date: '2026-01-23', role: 'accountant', title: '购买办公电脑', tags: ["资产"], difficulty: 1, tip: '通过固定资产模块。', description: '前往固定资产模块新增资产。', entries: [], nextAction: 'fixed-assets', documents: [{ type: 'text', label: '操作指引', docTitle: '操作说明', stampText: '财务专用章', content: '固定资产→新增资产' }]},
    { date: '2026-01-24', role: 'accountant', title: '计提工资', tags: ["工资"], difficulty: 1, tip: '通过工资模块。', description: '前往工资模块计提工资。', entries: [], nextAction: 'payroll', documents: [{ type: 'text', label: '操作指引', docTitle: '操作说明', stampText: '财务专用章', content: '工资管理→计提工资' }]},
    { date: '2026-01-25', role: 'accountant', title: '计提附加税', tags: ["税费"], difficulty: 2, tip: '以增值税为基数。', description: '应纳增值税20,800，城建税1,456，教育附加624。', entries: [{ subjectCode: '6403', summary: '城建税', debit: 1456, credit: 0, explanation: '税金增加。' }, { subjectCode: '222103', summary: '城建税', debit: 0, credit: 1456, explanation: '应交增加。' }, { subjectCode: '6403', summary: '教育附加', debit: 624, credit: 0, explanation: '税金增加。' }, { subjectCode: '222104', summary: '教育附加', debit: 0, credit: 624, explanation: '应交增加。' }]},
    { date: '2026-01-26', role: 'accountant', title: '计提折旧', tags: ["资产"], difficulty: 1, tip: '通过固定资产模块。', description: '前往固定资产模块。', entries: [], nextAction: 'fixed-assets', documents: [{ type: 'text', label: '操作指引', docTitle: '操作说明', stampText: '财务专用章', content: '固定资产→计提折旧' }]},
    { date: '2026-01-27', role: 'accountant', title: '银行手续费', tags: ["资金"], difficulty: 1, tip: '手续费入财务费用。', description: '本月手续费200元。', entries: [{ subjectCode: '6603', summary: '手续费', debit: 200, credit: 0, explanation: '财务费增加。' }, { subjectCode: '100201', summary: '手续费', debit: 0, credit: 200, explanation: '银行减少。' }]},
    { date: '2026-01-28', role: 'accountant', title: '现金折扣', tags: ["销售"], difficulty: 3, tip: '折扣入财务费用。', description: '客户提前付款享折扣600元。', entries: [{ subjectCode: '100201', summary: '收款', debit: 33300, credit: 0, explanation: '银行增加。' }, { subjectCode: '6603', summary: '折扣', debit: 600, credit: 0, explanation: '财务费增加。' }, { subjectCode: '112202', summary: '应收', debit: 0, credit: 33900, explanation: '应收减少。' }]},
    { date: '2026-01-29', role: 'accountant', title: '缴纳社保公积金', tags: ["工资"], difficulty: 2, tip: '冲减应付职工薪酬。', description: '缴纳社保18,000公积金9,000元。', entries: [{ subjectCode: '221102', summary: '社保', debit: 18000, credit: 0, explanation: '应付薪酬减少。' }, { subjectCode: '221103', summary: '公积金', debit: 9000, credit: 0, explanation: '应付薪酬减少。' }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 27000, explanation: '银行减少。' }]},
    { date: '2026-01-30', role: 'accountant', title: '月末期间损益结转', tags: ["期末"], difficulty: 3, tip: '收入借转，费用贷转。', description: '结转各损益科目至本年利润。', entries: [
      { subjectCode: '6001', summary: '转收入', debit: 160000, credit: 0, explanation: '收入转出。' }, { subjectCode: '6401', summary: '转成本', debit: 0, credit: 93200, explanation: '成本转出。' }, { subjectCode: '6403', summary: '转税金', debit: 0, credit: 2080, explanation: '税金转出。' }, { subjectCode: '660101', summary: '转销售费用', debit: 0, credit: 6000, explanation: '销售费转出。' }, { subjectCode: '6602', summary: '转管理费用', debit: 0, credit: 15500, explanation: '管理费转出。' }, { subjectCode: '6603', summary: '转财务费用', debit: 7700, credit: 0, explanation: '财务费转出。' }, { subjectCode: '4103', summary: '转本年利润', debit: 0, credit: 50920, explanation: '净利润转出。' }]},
    { date: '2026-01-31', role: 'accountant', title: '模拟纳税申报', tags: ["期末","申报"], difficulty: 1, tip: '每月申报是法定义务。', description: '完成账务处理后申报。', entries: [], nextAction: 'tax-filing', documents: [{ type: 'text', label: '申报提醒', docTitle: '1月纳税申报提醒', stampText: '财务专用章', content: '截至2月15日' }]},
  ],
  '02': feb,
  '03': mar,
  '04': apr,
  '05': may,
  '06': jun,
  '07': jul,
  '08': aug,
  '09': sep,
  '10': oct,
  '11': nov,
  '12': dec}

export function getTutorials(month) { return tutorials[month] || [] }
export function compareAnswers(us, cs) {
  const r = []
  if (us.length !== cs.length) r.push({ type: 'warning', message: `分录条数不一致：你录了 ${us.length} 条，正确答案 ${cs.length} 条` })
  const n = Math.min(us.length, cs.length)
  for (let i = 0; i < n; i++) {
    const u = us[i], c = cs[i]
    const ok = u.subjectCode === c.subjectCode && Math.abs(Number(u.debit) - Number(c.debit)) < 0.01 && Math.abs(Number(u.credit) - Number(c.credit)) < 0.01
    if (ok) r.push({ type: 'success', message: `第${i+1}条 ✔` })
    else { const d = []; if (u.subjectCode !== c.subjectCode) d.push(`科目应为"${c.subjectCode}"`); if (Math.abs(Number(u.debit) - Number(c.debit)) >= 0.01) d.push(`借方应为 ${c.debit}`); if (Math.abs(Number(u.credit) - Number(c.credit)) >= 0.01) d.push(`贷方应为 ${c.credit}`); r.push({ type: 'error', message: `第${i+1}条 ✘ ${d.join('，')}` }) }
  }
  if (r.every(x => x.type === 'success')) r.push({ type: 'success', message: '🎉 全部正确！' })
  return r
}
export default tutorials
