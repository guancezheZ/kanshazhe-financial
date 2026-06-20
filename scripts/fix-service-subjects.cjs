/**
 * 修复服务业教学数据缺subjectCode和explanation
 *
 * 扫描 service/04.js ~ service/12.js，为每个缺subjectCode的entry补上
 * 根据 summary 字段 + 任务标题 + 借贷方向 推断正确的科目编码
 *
 * 用法: node scripts/fix-service-subjects.cjs
 */
const fs = require('fs')
const path = require('path')

const DATA_DIR = path.join(__dirname, '..', 'src', 'data', 'tutorials', 'service')

/**
 * 根据上下文推断科目编码
 */
function inferSubject(entry, taskTitle, taskTags) {
  const sum = (entry.summary || '').trim()
  const isDebit = Number(entry.debit) > 0
  const isCredit = Number(entry.credit) > 0
  const title = taskTitle || ''
  const tags = taskTags || []
  const isCashier = tags.includes('出纳')

  // ========== 银行存款相关 ==========
  if ((sum.includes('银行存款减少') || sum.includes('缴纳税款') || sum === '付款' ||
       sum.includes('转账支付') || sum === '还本付息' || sum === '转账' ||
       sum === '支付水电费' || sum === '支付外包费' || sum === '购车付款' ||
       sum === '支付应付利息' || sum === '转账支付' || sum === '发工资' ||
       sum === '实发' || sum === '实发工资' || sum === '缴纳社保' ||
       sum === '缴纳所得税' || sum === '缴税' || sum === '缴社保' ||
       sum === '缴所得税' || sum === '外包费' || sum === '购车' ||
       sum === '预付下半年房租' || sum === '预付房租' ||
       sum === '年终奖金转账' || sum === '奖金转账' ||
       sum === '房租预付转账') && isCredit) {
    return { subjectCode: '100201', explanation: '银行存款减少记贷方。资金流出，资产减少。' }
  }

  if ((sum.includes('银行存款增加') || sum === '收款' || sum.includes('到账') ||
       sum === '收取定金' || sum === '收取尾款' || sum === '定金到账' ||
       sum === '尾款到账' || sum === '启动金' || sum === '培训费' ||
       sum === '框架预收' || sum.includes('尾款') || sum.includes('中期款') ||
       sum === '汇票托收到账' || sum === '取得借款' ||
       sum.includes('借款') && sum !== '借款利息' && sum !== '应付利息') && isDebit) {
    return { subjectCode: '100201', explanation: '银行存款增加记借方。资金流入，资产增加。' }
  }

  if ((sum === '利息收入' || sum === '银行活期利息') && isDebit) {
    return { subjectCode: '100201', explanation: '银行存款增加记借方。利息收入到账。' }
  }

  if ((sum === '利息收入' || sum === '银行活期利息') && isCredit) {
    return { subjectCode: '6603', explanation: '财务费用减少/利息收入冲减财务费用记贷方。' }
  }

  // ========== 现金相关 ==========
  if ((sum.includes('现金增加') || sum === '退回' || sum === '退现' ||
       sum === '提取备用金' || sum === '补充库存') && isDebit) {
    return { subjectCode: '1001', explanation: '库存现金增加记借方。' }
  }
  if ((sum.includes('现金减少') || sum === '现金付款' ||
       sum === '借支' || sum === '预借差旅') && isCredit) {
    return { subjectCode: '1001', explanation: '库存现金减少记贷方。' }
  }
  if (sum === '快递费' && isDebit) {
    return { subjectCode: '660201', explanation: '管理费用-办公费增加记借方。' }
  }
  if (sum === '现金付款' && isCredit) {
    return { subjectCode: '1001', explanation: '库存现金减少记贷方。' }
  }

  // ========== 微信/支付宝 ==========
  if ((sum === '微信收款' || (sum.includes('微信') && isDebit && sum !== '微信付款')) && isDebit) {
    return { subjectCode: '101204', explanation: '其他货币资金-微信增加记借方。微信收款入账。' }
  }
  if ((sum === '微信付款' || (sum.includes('微信') && isCredit))) {
    return { subjectCode: '101204', explanation: '其他货币资金-微信减少记贷方。' }
  }
  if ((sum === '支付宝付款' || (sum.includes('支付宝') && isCredit && sum !== '支付宝收款'))) {
    return { subjectCode: '101205', explanation: '其他货币资金-支付宝减少记贷方。' }
  }
  // 支付宝付款(debit) = 采购
  if (sum === '采购工具' && isDebit) {
    return { subjectCode: '520104', explanation: '劳务成本-其他直接费用增加记借方。' }
  }
  if ((sum === '项目成本增加' || sum.includes('外包')) && isDebit && !sum.includes('支付') && !sum.includes('结转')) {
    return { subjectCode: '520103', explanation: '劳务成本-外包服务费增加记借方。' }
  }
  // 支付宝采购
  if ((sum === '支付宝付款' && isDebit) || (sum.includes('支付宝') && sum.includes('采购'))) {
    return { subjectCode: '660201', explanation: '管理费用-办公费增加记借方。' }
  }

  // ========== 银行转账/内部调拨 ==========
  if (sum.includes('转入建行') || sum.includes('转入工行') || sum === '银行账户间调拨' || sum.includes('调拨')) {
    if (isDebit) return { subjectCode: '100202', explanation: '银行存款-建设银行增加记借方。银行内部调拨。' }
    if (isCredit) return { subjectCode: '100201', explanation: '银行存款-工商银行减少记贷方。银行内部调拨。' }
  }

  // ========== 薪酬相关 ==========
  // 计提工资(借：劳务成本-人工成本 or 管理费用-工资薪金)
  const isProjectSalary = (sum.includes('上半月') || sum.includes('下半月')) &&
    (title.includes('项目') || sum.includes('项目') || (!sum.includes('管理') && !title.includes('管理')))

  if (isProjectSalary && isDebit) {
    return { subjectCode: '520101', explanation: '劳务成本-人工成本增加记借方。计提项目人员工资计入成本。' }
  }

  const isAdminSalary = (sum.includes('上半月') || sum.includes('下半月') || sum === '管理工资' ||
    sum === '管理上半月工资' || sum === '管理下半月工资' || sum === '管理上半月' || sum === '管理下半月') &&
    (sum.includes('管理') || title.includes('管理'))

  if (isAdminSalary && isDebit) {
    return { subjectCode: '660203', explanation: '管理费用-工资薪金增加记借方。计提管理人员工资。' }
  }

  // 计提工资(贷：应付职工薪酬)
  if ((sum === '薪酬' || sum === '应付职工薪酬' || sum === '应付薪酬') && isCredit) {
    return { subjectCode: '221101', explanation: '应付职工薪酬-工资增加记贷方。计提工资形成负债。' }
  }

  // 发放工资(借: 应付职工薪酬)
  if ((sum === '工资' || sum === '应发' || sum === '发放工资' || sum === '项目年终奖' || sum === '管理年终奖' || sum === '发工资' || sum === '年终奖金') && isDebit && title.includes('发放') || title.includes('年终')) {
    return { subjectCode: '2211', explanation: '应付职工薪酬减少记借方。工资发放冲减负债。' }
  }
  if (sum === '年终奖金' || sum === '奖金' && isDebit) {
    return { subjectCode: '2211', explanation: '应付职工薪酬减少记借方。年终奖金发放冲减负债。' }
  }
  if (sum === '奖金' && isCredit || sum === '奖金转账' && isCredit || sum === '年终奖金转账' && isCredit) {
    return { subjectCode: '100201', explanation: '银行存款减少记贷方。资金流出支付奖金。' }
  }

  // 实发工资(贷: 银行存款)
  if ((sum === '实发' || sum === '实发工资') && isCredit) {
    return { subjectCode: '100201', explanation: '银行存款减少记贷方。实发工资通过银行代发。' }
  }

  // 代扣个税(贷: 应交税费)
  if ((sum === '个税' || sum === '扣个税') && isCredit) {
    return { subjectCode: '222102', explanation: '应交个人所得税增加记贷方。代扣员工个人所得税。' }
  }

  // ========== 社保相关 ==========
  // 计提社保(借: 劳务成本/管理费用)
  if (sum === '项目社保' && isDebit) {
    return { subjectCode: '520101', explanation: '劳务成本-人工成本增加记借方。项目人员社保费用计入成本。' }
  }
  if (sum === '管理社保' && isDebit) {
    return { subjectCode: '660203', explanation: '管理费用-工资薪金增加记借方。管理人员社保费用。' }
  }
  // 计提社保(贷: 应付职工薪酬-社保)
  if ((sum === '社保' || sum === '社保费用') && isCredit) {
    return { subjectCode: '221102', explanation: '应付职工薪酬-社保增加记贷方。计提社保形成负债。' }
  }
  // 缴纳社保(借: 应付职工薪酬-社保)
  if ((sum === '社保' || sum === '缴纳社保' || sum === '缴社保' || sum === '社保转账') && isDebit) {
    return { subjectCode: '221102', explanation: '应付职工薪酬-社保减少记借方。缴纳社保冲减负债。' }
  }
  // 缴纳社保(贷: 银行存款)
  if ((sum === '缴纳社保' || sum === '缴社保' || sum === '社保转账') && isCredit) {
    return { subjectCode: '100201', explanation: '银行存款减少记贷方。缴纳社保资金流出。' }
  }

  // ========== 税费相关 ==========
  // 缴纳增值税
  if ((sum === '增值税' || sum === '缴增值税' || sum === '税' || sum === '缴税' || sum === '税费') && isDebit &&
      (title.includes('缴纳') || title.includes('纳税') || title.includes('缴税') || title.includes('增值税'))) {
    return { subjectCode: '222101', explanation: '应交增值税减少记借方。缴纳税费冲销负债。' }
  }
  // 计提增值税(贷方)
  if ((sum === '增值税' || sum === '定金增值税' || sum === '尾款增值税' || sum === '计提税费') && isCredit) {
    return { subjectCode: '222101', explanation: '应交增值税增加记贷方。计提销项税形成负债。' }
  }
  // 增值税(借方-进项)
  if (sum === '增值税' && isDebit && (title.includes('采购') || title.includes('取得'))) {
    return { subjectCode: '222101', explanation: '应交增值税(进项税额)增加记借方。取得增值税专用发票。' }
  }

  // 城建税
  if (sum === '城建税' && isDebit && title.includes('缴纳')) {
    return { subjectCode: '222103', explanation: '应交城建税减少记借方。缴纳城建税冲销负债。' }
  }
  if (sum === '城建税' && isDebit && (title.includes('计算') || title.includes('计提'))) {
    return { subjectCode: '6403', explanation: '税金及附加增加记借方。计提城建税计入当期损益。' }
  }
  if (sum === '城建税' && isCredit) {
    return { subjectCode: '222103', explanation: '应交城建税增加记贷方。计提城建税形成负债。' }
  }
  if (sum === '缴城建税' && isDebit) {
    return { subjectCode: '222103', explanation: '应交城建税减少记借方。缴纳城建税冲销负债。' }
  }

  // 教育费附加
  if (sum === '教育费附加' && isDebit && title.includes('缴纳')) {
    return { subjectCode: '222104', explanation: '应交教育费附加减少记借方。缴纳教育费附加冲销负债。' }
  }
  if (sum === '教育费附加' && isDebit && (title.includes('计算') || title.includes('计提'))) {
    return { subjectCode: '6403', explanation: '税金及附加增加记借方。计提教育费附加计入当期损益。' }
  }
  if (sum === '教育费附加' && isCredit) {
    return { subjectCode: '222104', explanation: '应交教育费附加增加记贷方。计提教育费附加形成负债。' }
  }
  if (sum === '缴教育费附加' && isDebit) {
    return { subjectCode: '222104', explanation: '应交教育费附加减少记借方。缴纳教育费附加冲销负债。' }
  }

  // 所得税
  if ((sum === '缴纳所得税' || sum === '缴所得税') && isDebit) {
    return { subjectCode: '222106', explanation: '应交企业所得税减少记借方。预缴所得税冲销负债。' }
  }
  if ((sum === '缴纳所得税' || sum === '缴所得税') && isCredit) {
    return { subjectCode: '100201', explanation: '银行存款减少记贷方。支付所得税资金流出。' }
  }
  if (sum === '所得税' && isDebit) {
    return { subjectCode: '6801', explanation: '所得税费用增加记借方。计提当期所得税费用。' }
  }
  if (sum === '所得税' && isCredit) {
    return { subjectCode: '222106', explanation: '应交企业所得税增加记贷方。计提所得税形成负债。' }
  }
  if (sum === '所得税费用' && isDebit) {
    return { subjectCode: '6801', explanation: '所得税费用增加记借方。' }
  }

  // ========== 借款相关 ==========
  if (sum === '借款' && isCredit && title.includes('取得')) {
    return { subjectCode: '2001', explanation: '短期借款增加记贷方。取得银行借款形成负债。' }
  }
  if (sum === '借款' && isDebit && (title.includes('偿还') || title.includes('还'))) {
    return { subjectCode: '2001', explanation: '短期借款减少记借方。偿还借款冲减负债。' }
  }
  if (sum === '还本' && isDebit) {
    return { subjectCode: '2001', explanation: '短期借款减少记借方。偿还借款本金冲减负债。' }
  }
  if (sum === '付息' && isDebit) {
    return { subjectCode: '2232', explanation: '应付利息减少记借方。支付借款利息冲减负债。' }
  }
  if (sum === '应付利息' && isCredit) {
    return { subjectCode: '2232', explanation: '应付利息增加记贷方。计提借款利息形成负债。' }
  }
  if (sum === '利息' && isDebit && (title.includes('利息') || title.includes('借款'))) {
    return { subjectCode: '6603', explanation: '财务费用增加记借方。计提借款利息计入当期损益。' }
  }
  if (sum === '借款利息' && isDebit) {
    return { subjectCode: '6603', explanation: '财务费用增加记借方。计提借款利息计入当期损益。' }
  }

  // ========== 管理费用 ==========
  if (sum === '管理费用' && isDebit) {
    // 检查具体内容
    if (title.includes('招待') || title.includes('业务招待')) {
      return { subjectCode: '660201', explanation: '管理费用-办公费增加记借方。业务招待费计入管理费用。' }
    }
    if (title.includes('水电')) {
      return { subjectCode: '660201', explanation: '管理费用-办公费增加记借方。水电费计入管理费用。' }
    }
    if (title.includes('审计')) {
      return { subjectCode: '660201', explanation: '管理费用-办公费增加记借方。审计费计入管理费用。' }
    }
    if (title.includes('午餐') || title.includes('补贴')) {
      return { subjectCode: '660203', explanation: '管理费用-工资薪金增加记借方。员工补贴计入工资薪金。' }
    }
    if (title.includes('折旧')) {
      return { subjectCode: '660204', explanation: '管理费用-折旧费增加记借方。计提折旧计入管理费用。' }
    }
    return { subjectCode: '660201', explanation: '管理费用增加记借方。日常费用计入管理费用。' }
  }
  if (sum === '管理费用' && isCredit) {
    return { subjectCode: '6602', explanation: '管理费用减少记贷方。期末结转至本年利润。' }
  }

  // 水电
  if (sum === '水电' && isDebit) {
    return { subjectCode: '660201', explanation: '管理费用-办公费增加记借方。水电费计入管理费用。' }
  }
  if (sum === '支付水电费' && isCredit) {
    return { subjectCode: '100201', explanation: '银行存款减少记贷方。支付水电费资金流出。' }
  }

  // 差旅费
  if ((sum === '报销' || sum === '差旅报销') && isDebit) {
    return { subjectCode: '660202', explanation: '管理费用-差旅费增加记借方。差旅费计入管理费用。' }
  }
  if (sum === '预借差旅' && isDebit) {
    return { subjectCode: '1221', explanation: '其他应收款增加记借方。员工预借差旅费形成债权。' }
  }
  if ((sum === '借支') && isDebit) {
    return { subjectCode: '1221', explanation: '其他应收款增加记借方。员工借款形成债权。' }
  }
  if ((sum === '冲借款' || sum === '冲销') && isCredit) {
    return { subjectCode: '1221', explanation: '其他应收款减少记贷方。报销冲销员工借款。' }
  }
  if (sum === '退回' && isDebit) {
    return { subjectCode: '1001', explanation: '库存现金增加记借方。员工退回多余借款。' }
  }
  if (sum === '退现' && isDebit) {
    return { subjectCode: '1001', explanation: '库存现金增加记借方。员工退回多余差旅预借。' }
  }

  // 审计费
  if ((sum === '审计费' || sum.includes('审计')) && isDebit) {
    return { subjectCode: '660201', explanation: '管理费用-办公费增加记借方。审计费计入管理费用。' }
  }

  // 招待费
  if (sum === '招待费' && isDebit) {
    return { subjectCode: '660201', explanation: '管理费用-办公费增加记借方。业务招待费计入管理费用。' }
  }

  // ========== 折旧摊销 ==========
  if ((sum === '折旧' || sum === '计提折旧') && isDebit) {
    return { subjectCode: '660204', explanation: '管理费用-折旧费增加记借方。计提固定资产折旧。' }
  }
  if (sum === '无形资产摊销' && isDebit) {
    return { subjectCode: '660206', explanation: '管理费用-摊销费增加记借方。计提无形资产摊销。' }
  }
  if (sum === '累计摊销' && isCredit) {
    return { subjectCode: '1702', explanation: '累计摊销增加记贷方。计提无形资产摊销。' }
  }

  // ========== 房租摊销 ==========
  if (sum === '房租摊销' && isCredit || sum === '预付摊销' && isCredit) {
    return { subjectCode: '1123', explanation: '预付账款减少记贷方。摊销预付房租。' }
  }
  if (sum === '预付房租' && isDebit || sum === '预付下半年房租' && isDebit || sum === '预付半年房租' && isDebit) {
    return { subjectCode: '1123', explanation: '预付账款增加记借方。预付房租形成待摊费用。' }
  }
  if (sum === '最后一次房租摊销' || sum === '补提房租摊销') {
    if (isDebit) return { subjectCode: '660206', explanation: '管理费用-摊销费增加记借方。摊销最后一期房租。' }
    if (isCredit) return { subjectCode: '1123', explanation: '预付账款减少记贷方。预付房租摊销完毕。' }
  }
  // 预付下年度软件服务费
  if ((sum === '借方金额') && isDebit && title.includes('预付')) {
    return { subjectCode: '1123', explanation: '预付账款增加记借方。预付服务费形成待摊费用。' }
  }
  if ((sum === '贷方金额' || sum === '预付摊销') && isCredit && (title.includes('预付') || title.includes('摊销') || title.includes('租金'))) {
    return { subjectCode: '1123', explanation: '预付账款减少记贷方。摊销预付款项。' }
  }
  if (sum === '贷方金额' && isCredit && title.includes('预付') || sum === '预付账款清零' && isCredit) {
    return { subjectCode: '1123', explanation: '预付账款减少记贷方。预付账款摊销完毕。' }
  }

  // ========== 财务费用 ==========
  if ((sum === '财务费用' || sum.includes('手续费')) && isDebit) {
    return { subjectCode: '6603', explanation: '财务费用增加记借方。银行手续费计入财务费用。' }
  }
  if (sum === '财务费用' && isCredit && title.includes('结转')) {
    return { subjectCode: '6603', explanation: '财务费用减少记贷方。期末结转至本年利润。' }
  }
  if (sum === '结转财务费用(红字)' && isDebit) {
    return { subjectCode: '6603', explanation: '财务费用(红字)冲减。利息收入大于手续费时红字冲回。' }
  }

  // ========== 合同负债相关 ==========
  if (sum === '合同负债' && isCredit) {
    return { subjectCode: '2205', explanation: '合同负债增加记贷方。收到预收款形成合同负债。' }
  }
  if (sum === '合同负债转收入' && isDebit) {
    return { subjectCode: '2205', explanation: '合同负债减少记借方。履约完成冲减合同负债。' }
  }
  if (sum === '定金' && isCredit) {
    return { subjectCode: '2205', explanation: '合同负债增加记贷方。收到定金形成合同负债。' }
  }
  if (sum === '定金' && isDebit && title.includes('退款')) {
    return { subjectCode: '2205', explanation: '合同负债减少记借方。退还定金冲减合同负债。' }
  }
  if (sum === '冲减合同负债' && isDebit) {
    return { subjectCode: '2205', explanation: '合同负债减少记借方。退还客户预收款冲减合同负债。' }
  }

  // ========== 收入相关 ==========
  if (sum === '咨询收入' && isCredit) {
    return { subjectCode: '6001', explanation: '主营业务收入增加记贷方。咨询业务收入确认。' }
  }
  if ((sum === '收入' || sum === '确认App开发收入' || sum === '咨询收入' || sum === '确认收入') && isCredit) {
    return { subjectCode: '6001', explanation: '主营业务收入增加记贷方。收入确认。' }
  }
  if (sum === '收入' && isDebit) {
    return { subjectCode: '6001', explanation: '主营业务收入减少记借方。期末结转至本年利润。' }
  }
  if (sum === '废旧物资出售' && isDebit) {
    return { subjectCode: '1001', explanation: '库存现金增加记借方。出售废旧物资收款。' }
  }
  if (sum === '废旧物资出售' && isCredit) {
    return { subjectCode: '6051', explanation: '其他业务收入增加记贷方。出售废旧物资确认收入。' }
  }

  // ========== 成本相关 ==========
  if ((sum === '结转App项目成本' || sum === '结转戊项目成本' || sum === '成本') && isDebit && (title.includes('结转') || title.includes('成本'))) {
    return { subjectCode: '6401', explanation: '主营业务成本增加记借方。结转项目成本至主营业务成本。' }
  }
  if ((sum === '结转人工' || sum === '人工成本') && isCredit) {
    return { subjectCode: '520101', explanation: '劳务成本-人工成本减少记贷方。结转人工成本至主营业务成本。' }
  }
  if ((sum === '结转外包费' || sum === '外包开发费') && isCredit) {
    return { subjectCode: '520103', explanation: '劳务成本-外包服务费减少记贷方。结转外包费至主营业务成本。' }
  }
  if (sum === '结转其他费用' && isCredit) {
    return { subjectCode: '520104', explanation: '劳务成本-其他直接费用减少记贷方。结转其他费用至主营业务成本。' }
  }
  if (sum === '其他直接费用' && isCredit) {
    return { subjectCode: '520104', explanation: '劳务成本-其他直接费用减少记贷方。结转其他直接费用。' }
  }
  if (sum === '差旅费' && isCredit) {
    return { subjectCode: '520102', explanation: '劳务成本-差旅费减少记贷方。结转差旅费至主营业务成本。' }
  }

  // ========== 期末结转 ==========
  if (sum === '收入转利润' && isCredit) {
    return { subjectCode: '4103', explanation: '本年利润增加记贷方。结转收入增加本年利润。' }
  }
  if (sum === '收入转入' && isCredit) {
    return { subjectCode: '4103', explanation: '本年利润增加记贷方。结转收入增加本年利润。' }
  }
  if ((sum === '费用转入' || sum === '成本费用转入') && isDebit) {
    return { subjectCode: '4103', explanation: '本年利润减少记借方。结转成本费用减少本年利润。' }
  }
  if (sum === '费用转利润' && isDebit) {
    return { subjectCode: '4103', explanation: '本年利润减少记借方。结转费用减少本年利润。' }
  }
  if (sum === '结转收入转利润' && isDebit) {
    return { subjectCode: '6001', explanation: '主营业务收入减少记借方。期末结转收入。' }
  }
  if (sum === '结转收入' && isDebit) {
    return { subjectCode: '6001', explanation: '主营业务收入减少记借方。期末结转至本年利润。' }
  }
  if (sum === '结转成本' && isCredit) {
    return { subjectCode: '6401', explanation: '主营业务成本减少记贷方。期末结转至本年利润。' }
  }
  if (sum === '结转税金' && isCredit) {
    return { subjectCode: '6403', explanation: '税金及附加减少记贷方。期末结转至本年利润。' }
  }

  // ========== 坏账准备 ==========
  if (sum === '计提坏账准备' && isDebit) {
    return { subjectCode: '6701', explanation: '资产减值损失增加记借方。计提坏账准备计入当期损益。' }
  }
  if (sum === '坏账准备' && isCredit) {
    return { subjectCode: '1231', explanation: '坏账准备增加记贷方。计提坏账准备备抵应收账款。' }
  }
  if (sum === '资产减值损失' && isCredit) {
    return { subjectCode: '6701', explanation: '资产减值损失减少记贷方。期末结转至本年利润。' }
  }

  // ========== 销售费用 ==========
  if ((sum === '销售费用' || sum === '广告宣传费') && isDebit) {
    return { subjectCode: '660101', explanation: '销售费用-广告费增加记借方。市场推广费用计入销售费用。' }
  }
  if ((sum === '广告宣传费' || sum === '转账支付') && isCredit && !sum.includes('水电')) {
    return { subjectCode: '100201', explanation: '银行存款减少记贷方。支付广告费资金流出。' }
  }

  // ========== 利润分配 ==========
  if (sum === '提取盈余公积' && isDebit) {
    return { subjectCode: '410402', explanation: '利润分配-提取盈余公积增加记借方。提取盈余公积减少未分配利润。' }
  }
  if (sum === '盈余公积' && isCredit) {
    return { subjectCode: '4101', explanation: '盈余公积增加记贷方。提取盈余公积形成公积金。' }
  }
  if (sum === '未分配利润' && isCredit) {
    return { subjectCode: '410401', explanation: '利润分配-未分配利润增加记贷方。盈余公积从净利润中提取。' }
  }
  if (sum === '未分配利润' && isDebit) {
    return { subjectCode: '410401', explanation: '利润分配-未分配利润减少记借方。结转净利润至未分配利润。' }
  }

  // ========== 固定资产 ==========
  if ((sum === '购买商务车' || sum === '购车') && isDebit) {
    return { subjectCode: '1601', explanation: '固定资产增加记借方。购入固定资产。' }
  }
  if ((sum === '购车付款' || sum === '购车') && isCredit) {
    return { subjectCode: '100201', explanation: '银行存款减少记贷方。支付购车款资金流出。' }
  }
  if (sum === '累计折旧' && isCredit) {
    return { subjectCode: '1602', explanation: '累计折旧增加记贷方。计提固定资产折旧。' }
  }

  // ========== 应收票据 ==========
  if (sum === '应收票据减少' && isCredit) {
    return { subjectCode: '1121', explanation: '应收票据减少记贷方。银行托收成功冲减应收票据。' }
  }
  if (sum === '汇票托收到账' && isDebit) {
    return { subjectCode: '100201', explanation: '银行存款增加记借方。托收汇票资金到账。' }
  }

  // ========== 应收账款 ==========
  if (sum === '应收账款减少' && isCredit) {
    return { subjectCode: '1122', explanation: '应收账款减少记贷方。收回客户欠款冲减应收账款。' }
  }
  if ((sum === '中期款' || sum === '尾款到账') && isDebit) {
    return { subjectCode: '100201', explanation: '银行存款增加记借方。收回客户款项资金到账。' }
  }
  if ((sum === '尾款收入' || sum === '账款') && isCredit) {
    return { subjectCode: '1122', explanation: '应收账款减少记贷方。收回尾款冲减应收账款。' }
  }
  if (sum === '收到应收账款' && isDebit) {
    return { subjectCode: '100201', explanation: '银行存款增加记借方。收回客户欠款。' }
  }

  // ========== 其他 ==========
  if (sum === '增值税' && isDebit && (title.includes('采购') || title.includes('进项'))) {
    return { subjectCode: '222101', explanation: '应交增值税(进项税额)增加记借方。取得增值税专用发票用于抵扣。' }
  }

  // fallback
  return null
}

/**
 * 为条目补充explanation（当已有subjectCode但缺explanation时）
 */
function generateExplanation(entry, taskTitle) {
  if (entry.explanation) return entry.explanation
  return ''
}

function fixFile(month) {
  const filePath = path.join(DATA_DIR, `${month}.js`)
  let content = fs.readFileSync(filePath, 'utf-8')

  // 尝试用正则匹配entry对象
  // entry格式: { summary: 'xxx', debit: N, credit: N }
  // 需要改成: { subjectCode: 'xxxx', summary: 'xxx', debit: N, credit: N, explanation: 'xxx' }

  // 更可靠的方式: 逐行解析
  const lines = content.split('\n')
  const newLines = []
  let i = 0

  // 先加载数据获取上下文
  let data
  try {
    // 动态导入
    const modPath = `../src/data/tutorials/service/${month}.js`
    delete require.cache[require.resolve(modPath)]
    data = require(modPath)
  } catch(e) {
    console.error(`Cannot load ${month}.js:`, e.message)
    return
  }

  // data 的结构: { tasks: [...] } 或直接数组
  let tasks
  if (data && data.tasks) {
    tasks = data.tasks
  } else if (Array.isArray(data)) {
    tasks = data
  } else if (data && data.default) {
    tasks = data.default
  } else {
    // 遍历所有导出
    tasks = Object.values(data).find(v => Array.isArray(v))
  }

  if (!tasks) {
    console.error(`No tasks array found in ${month}.js`)
    return
  }

  // 构建文件中每条entry的行范围
  // 需要匹配到原始文件中的对应entry并修改
  // 策略: 对于每个task中的每个entry，找到它在文件中的位置并替换

  let taskIndex = -1
  let entryIndex = -1
  let inEntries = false
  let inTask = false
  let braceCount = 0
  let entryStart = -1
  let entryLines = []
  let fixCount = 0
  let taskBraceCount = 0

  // 重置，逐行分析
  const resultLines = []
  let currentTaskIdx = -1
  let currentEntryIdx = -1
  let entryBraceDepth = 0
  let inEntry = false
  let entryObjLines = []
  let entryObjStartLine = -1

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const line = lines[lineIdx]
    const trimmed = line.trim()

    // 检测新task开始: { "date": ... 或 { date: ...
    if (trimmed.match(/^\{\s*("date"|date)\s*:/)) {
      currentTaskIdx++
      currentEntryIdx = -1
      inEntry = false
    }

    // 检测entries数组开始
    if (trimmed.match(/"entries"\s*:\s*\[/) || trimmed.match(/entries\s*:\s*\[/)) {
      // entries开始
    }

    // 检测entry对象开始 - { 在entries数组内部且是简单对象
    if (trimmed === '{' && currentTaskIdx >= 0) {
      // 可能是entry的开始
      const prevLine = resultLines.length > 0 ? resultLines[resultLines.length - 1] : ''
      const prevTrimmed = prevLine.trim()
      // 前一行是 [ 或 { 或 }, 或 ,
      if (prevTrimmed === '[' || prevTrimmed === ']' || prevTrimmed === '{' || prevTrimmed.endsWith(',') || prevTrimmed.endsWith('[')) {
        inEntry = true
        entryObjLines = [line]
        entryObjStartLine = lineIdx
        continue
      }
    }

    if (inEntry) {
      entryObjLines.push(line)
      if (trimmed === '},' || trimmed === '}' || trimmed === '},' || trimmed === '}') {
        // entry结束，分析这个entry
        inEntry = false
        const entryText = entryObjLines.join('\n')
        const fixedEntry = fixEntryText(entryText, currentTaskIdx, currentEntryIdx + 1, tasks)
        if (fixedEntry !== entryText) {
          fixCount++
        }
        resultLines.push(fixedEntry)
        if (trimmed.endsWith(',')) currentEntryIdx++
        continue
      }
      continue
    }

    resultLines.push(line)
  }

  if (fixCount > 0) {
    const newContent = resultLines.join('\n')
    // Verify by trying to require
    const tmpFile = filePath + '.tmp'
    fs.writeFileSync(tmpFile, newContent)
    try {
      // Clear cache and try
      const testPath = path.resolve(tmpFile)
      delete require.cache[testPath]
      const mod = require(testPath)
      console.log(`  ✅ ${month}.js: 修复 ${fixCount} 处, 验证通过`)
      fs.renameSync(tmpFile, filePath)
    } catch(e) {
      console.error(`  ❌ ${month}.js: 修复后验证失败: ${e.message}`)
      fs.unlinkSync(tmpFile)
    }
  } else {
    console.log(`  ${month}.js: 无变化`)
  }
}

/**
 * 尝试修复一条entry的文本
 */
function fixEntryText(text, taskIdx, entryIdx, tasks) {
  // 解析entry对象
  let summaryMatch = text.match(/summary\s*:\s*['"]([^'"]+)['"]/)
  let debitMatch = text.match(/debit\s*:\s*([0-9.]+)/)
  let creditMatch = text.match(/credit\s*:\s*([0-9.]+)/)

  if (!summaryMatch) {
    // 尝试不带引号的
    summaryMatch = text.match(/summary\s*:\s*([^,\s}]+)/)
  }

  if (!summaryMatch) return text

  const summary = summaryMatch[1]
  const debit = debitMatch ? Number(debitMatch[1]) : 0
  const credit = creditMatch ? Number(creditMatch[1]) : 0

  // 检查是否已经有subjectCode
  if (text.includes('subjectCode')) return text

  // 获取任务
  const task = tasks[taskIdx]
  if (!task) return text

  const entry = { summary, debit, credit }
  const result = inferSubject(entry, task.title, task.tags)

  if (!result) {
    console.log(`  ⚠️ 无法推断: task#${taskIdx} "${(task.title||'').substring(0,30)}" entry[${entryIdx}] summary="${summary}"`)
    return text
  }

  // 在summary之前插入subjectCode
  // 格式: { summary: 'xxx', debit: N, credit: N }
  // 改为: { subjectCode: 'xxx', summary: 'xxx', debit: N, credit: N, explanation: 'xxx' }

  // 找到summary的位置
  const summaryPos = text.indexOf('summary')
  if (summaryPos < 0) return text

  const beforeSummary = text.substring(0, summaryPos)
  const afterSummary = text.substring(summaryPos)

  // 查找是否有尾部闭合
  const hasTrailing = text.trim().endsWith('},') || text.trim().endsWith('}')

  const explanation = result.explanation || ''

  // 在debit/credit之后添加explanation
  let creditPos = text.lastIndexOf('credit')
  if (creditPos < 0) creditPos = text.lastIndexOf('debit')

  if (creditPos >= 0) {
    // 在credit/debit值后面加explanation
    const creditValueMatch = text.substring(creditPos).match(/:\s*[0-9.]+/)
    if (creditValueMatch) {
      const valueEnd = creditPos + text.substring(creditPos).indexOf(creditValueMatch[0]) + creditValueMatch[0].length
      const before = text.substring(0, valueEnd)
      const after = text.substring(valueEnd)

      // 看看后面有没有逗号或者闭合
      const afterTrimmed = after.trim()
      if (afterTrimmed.startsWith(',')) {
        // 已经有逗号了，在逗号后面加explanation
        const commaPos = after.indexOf(',')
        return before + ',' + after.substring(commaPos).replace(/^,\s*/, ', explanation: \'' + explanation + '\'')
      } else if (afterTrimmed === '}' || afterTrimmed === '},') {
        // 没有逗号，加逗号
        return before + ', explanation: \'' + explanation + '\'' + after
      }
    }
  }

  // fallback: 在 } 之前插入
  const closeBrace = text.lastIndexOf('}')
  if (closeBrace >= 0) {
    const beforeClose = text.substring(0, closeBrace).trimEnd()
    const afterClose = text.substring(closeBrace)

    // 先插入subjectCode到summary前
    const withSubjectCode = text.substring(0, summaryPos) + `subjectCode: '${result.subjectCode}', ` + text.substring(summaryPos)

    // 再在末尾加explanation
    const finalClose = withSubjectCode.lastIndexOf('}')
    if (finalClose >= 0) {
      return withSubjectCode.substring(0, finalClose).trimEnd() + `, explanation: '${explanation}'` + withSubjectCode.substring(finalClose)
    }

    return withSubjectCode
  }

  return text
}

// 处理04-12月
const months = ['04', '05', '06', '07', '08', '09', '10', '11', '12']
for (const m of months) {
  console.log(`处理 ${m}月...`)
  fixFile(m)
}
