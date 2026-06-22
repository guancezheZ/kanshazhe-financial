/**
 * 1年期业务教程数据
 *
 * 每个任务包含：
 * - date: 业务日期
 * - title: 业务标题
 * - description: 场景描述（用户看到的内容）
 * - tip: 教学提示（显示在凭证录入区）
 * - entries: 标准答案分录
 * - documents[]: 电子凭证附件数组（TutorialFloater + VoucherDisplay 展示）
 *   - text: 文档/计算表/合同（纸纹背景+标题栏+印章）
 *   - receipt: 收据/缴费单（红色标题栏+明细表格+印章）
 *   - bank: 银行电子回单（红色银行头+标准字段+印章）
 *   - invoice: 增值税发票（税务局风格+明细+红色印章）
 *
 * 会计准则依据：《企业会计准则——基本准则》（财政部令第76号）
 */

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
    {
      date: '2026-01-02',
      title: '提取备用金',
      tags: ["出纳"],
      difficulty: 1,
      description: '出纳从工商银行提取现金 2,000元，作为日常零星开支备用金。',
      tip: '提取备用金是最常见的出纳业务之一。分录：借：库存现金，贷：银行存款。注意备用金金额不宜过大，一般满足3-5天零星开支即可。',
      entries: [
        { subjectCode: '1001', summary: '提取备用金', debit: 2000, credit: 0, explanation: '库存现金增加记借方。"提取备用金"后，企业手头可动用的现金增多。库存现金需每日盘点核对，确保账实相符。' },
        { subjectCode: '100201', summary: '提取备用金', debit: 0, credit: 2000, explanation: '银行存款减少记贷方。"提取备用金"，资金从银行划出，资产减少。月末需银行对账。' }],
      documents: [
        { type: 'receipt', label: '现金支票', docTitle: '中国工商银行现金支票存根', date: '2026-01-02', totalAmount: 2000, payer: '本公司', stampText: '中国工商银行\n业务专用章',
          items: [{ name: '提取备用金', qty: 1, price: 2000, amount: 2000 }],
          content: '支票号码：XX123456\n收款人：本公司\n用途：备用金' },
        { type: 'bank', label: '银行回单', date: '2026-01-02', totalAmount: 2000, payer: '本公司', payeeName: '本公司（现金）', content: '提取备用金', refNo: 'HD202601020002' }]},
    {
      date: '2026-01-03',
      title: '购买办公用品',
      tags: ["费用"],
      difficulty: 1,
      description: '行政部采购办公用品',
      voucherType: 'receipt',
      totalAmount: 500,
      seller: '得力办公用品店',
      tip: '办公用品属于管理费用-办公费。金额较小直接费用化。',
      documents: [
        {
          type: 'receipt',
          label: '收据',
          docTitle: '收  据',
          date: '2026-01-03',
          totalAmount: 500,
          payer: '本公司',
          paymentMethod: '银行转账',
          stampText: '得力办公用品店\n发票专用章',
          receiver: '李四',
          items: [
            { name: '打印纸 5包×60元', qty: 5, price: 60, amount: 300 },
            { name: '签字笔 20支×10元', qty: 20, price: 10, amount: 200 }]},
        {
          type: 'bank',
          label: '银行回单',
          date: '2026-01-03',
          totalAmount: 500,
          payer: '本公司',
          payerAccount: '6222 0200 **** 1234',
          payeeName: '得力办公用品店',
          payeeAccount: '6222 0200 **** 5678',
          content: '支付办公用品采购款',
          refNo: 'HD202601030001',
          instructionNo: 'HQH20260103001'}],
      entries: [
        { subjectCode: '660201', summary: '购买办公用品', debit: 500, credit: 0, explanation: '办公用品属于行政管理支出，计入"管理费用-办公费"。管理部门领用的办公用品不产生销售行为，不能计入销售费用。' },
        { subjectCode: '100201', summary: '购买办公用品', debit: 0, credit: 500, explanation: '银行存款减少记贷方。"购买办公用品"，资金从银行划出，资产减少。月末需银行对账。', cashFlowItem: 'cf-op6', cashFlowExplanation: '办公用品采购支出属于经营活动中的其他现金支出。' }]},
    {
      date: '2026-01-04',
      title: '现金日记账启用与期初余额确认',
      tags: ["出纳"],
      difficulty: 1,
      description: '新年度第一个工作周，出纳清点库存现金，确认现金日记账期初余额为2,000元（上年结转），与总账核对一致，启用新账页。',
      role: 'cashier',
      tip: '每年初出纳需启用新的现金日记账和银行日记账账页，期初余额承上年末余额。确认账实相符后开始登记新年度的收支业务。这是出纳"日清月结"制度的起点。',
      entries: [],
      documents: [
        { type: 'text', label: '现金日记账', docTitle: '现金日记账（2026年1月）', stampText: '现金日记账',
          content: `现金日记账
━━━━━━━━━━━━━━━━━━━━━━━━━
1月期初余额：2,000.00
（承2025年末余额）

核对确认：
总账余额：2,000.00 ✓
实盘金额：2,000.00 ✓
核对人：王出纳
核对日期：2026年1月4日` }]},
    {
      date: '2026-01-05',
      title: '收到客户货款',
      tags: ["销售"],
      difficulty: 1,
      description: '收到客户归还欠款',
      voucherType: 'receipt',
      totalAmount: 50000,
      tip: '收到欠款时：借：银行存款，贷：应收账款。注意区分"收到货款"（冲应收账款）和"直接销售收款"（冲主营业务收入）。',
      documents: [
        {
          type: 'bank',
          label: '银行回单',
          date: '2026-01-05',
          totalAmount: 50000,
          payer: '甲公司',
          payerAccount: '6222 0100 **** 8888',
          payeeName: '本公司',
          payeeAccount: '6222 0200 **** 1234',
          content: '转账还款',
          remark: '2025年12月货款',
          refNo: 'HD202601050012',
          instructionNo: 'HQH20260105002'},
        {
          type: 'text',
          label: '往来对账单',
          docTitle: '客户往来对账单',
          content: `甲公司往来对账单（截至2025-12-31）

期初应收：120,000.00
本期销售： 80,000.00
本期收款： 50,000.00
期末应收：150,000.00

备注：2026年1月5日收回50,000元`}],
      entries: [
        { subjectCode: '100201', summary: '收到甲公司货款', debit: 50000, credit: 0, explanation: '收到客户还款，银行存款增加。注意这是"收回欠款"而非"销售收款"，区别在于对方科目是应收账款而非主营业务收入。', cashFlowItem: 'cf-op', cashFlowExplanation: '收回前期应收账款属于销售商品收到的现金，归入经营活动现金流入。' },
        { subjectCode: '112201', summary: '收到甲公司货款', debit: 0, credit: 50000, explanation: '应收账款减少记贷方。客户还款后债权减少。注意：收回欠款不确认收入（收入在赊销时已确认）。' }]},
    {
      date: '2026-01-06',
      title: '支付办公室房租',
      tags: ["费用"],
      difficulty: 1,
      description: '支付本月办公室租金 8,000元，以银行存款支付给房东。',
      voucherType: 'receipt',
      totalAmount: 8000,
      tip: '房租计入"管理费用-租赁费"。如果一次性支付多月租金，应先计入"长期待摊费用"再分期摊销。',
      documents: [
        {
          type: 'receipt',
          label: '收据',
          docTitle: '房屋租赁专用收据',
          date: '2026-01-06',
          totalAmount: 8000,
          payer: '本公司',
          paymentMethod: '银行转账',
          stampText: 'XX物业管理\n有限公司\n财务专用章',
          receiver: '王XX',
          items: [
            { name: 'XX大厦801室 2026年1月租金', qty: 1, price: 8000, amount: 8000 }]},
        {
          type: 'text',
          label: '租赁合同',
          docTitle: '房屋租赁合同（摘要）',
          stampText: '合同专用章',
          signature: '甲方（盖章）：XX物业管理有限公司    乙方（盖章）：本公司',
          content: `出租方：XX物业管理有限公司
承租方：本公司

租赁标的：XX大厦801室
建筑面积：120㎡
租赁期限：2026年1月1日 至 2026年12月31日
月租金：8,000.00元（人民币捌仟元整）
付款方式：每月5日前支付当月租金
押金：16,000.00元（已付）

双方签字盖章后生效。`}],
      entries: [
        { subjectCode: '6602', summary: '支付1月房租', debit: 8000, credit: 0, explanation: '管理费用增加记借方。"支付1月房租"是企业管理支出，减少当期利润。' },
        { subjectCode: '100201', summary: '支付1月房租', debit: 0, credit: 8000, explanation: '银行存款减少记贷方。"支付1月房租"，资金从银行划出，资产减少。月末需银行对账。', cashFlowItem: 'cf-op6', cashFlowExplanation: '支付办公室房租属于经营活动中的其他现金支出。' }]},
    {
      date: '2026-01-07',
      title: '计提并发放员工工资',
      tags: ["工资社保"],
      difficulty: 2,
      description: '本月员工工资总额 60,000元。其中：行政管理人员工资 25,000元，销售人员工资 35,000元。次月10日发放。',
      voucherType: 'text',
      tip: '工资当月计提、次月发放。计提时：借：管理费用/销售费用，贷：应付职工薪酬-工资。1月份计提的工资，2月份才实际发放。',
      documents: [
        {
          type: 'text',
          label: '工资汇总表',
          docTitle: '2026年1月工资汇总表',
          stampText: '人力资源部\n工资专用章',
          signature: '制表：王出纳    审核：李会计    批准：赵总',
          content: `  部门      人数    基本工资    绩效工资    应发合计
────────────────────────────────────
  行政部      5     18,000      7,000     25,000
  销售部      8     22,000     13,000     35,000
────────────────────────────────────
  合  计     13     40,000     20,000     60,000

扣款明细（次月发放时扣除）：
  社保个人部分：6,000
  公积金个人部分：3,000
  个税：1,500
  实发合计：49,500`}],
      entries: [
        { subjectCode: '660203', summary: '计提1月行政工资', debit: 25000, credit: 0, explanation: '工资按部门归属：行政管理人员工资计入"管理费用"(660203)，销售人员工资计入"销售费用"(6601)。当月计提、次月发放。' },
        { subjectCode: '6601', summary: '计提1月销售工资', debit: 35000, credit: 0, explanation: '销售费用增加记借方。"计提1月销售工资"，销售部门费用直接减少当期利润。' },
        { subjectCode: '221101', summary: '计提1月工资', debit: 0, credit: 60000, explanation: '工资计提时形成对员工的负债，贷"应付职工薪酬-工资"。实际发放时再冲减该科目。' }]},
    {
      date: '2026-01-08',
      title: '缴纳上月社保费',
      tags: ["工资社保"],
      difficulty: 1,
      description: '缴纳上月社会保险费 18,000元（单位部分），以银行存款支付。',
      voucherType: 'receipt',
      totalAmount: 18000,
      tip: '社保费包含单位部分（计入费用）和个人部分（从工资扣）。这里只做单位部分的缴纳。个人部分在发工资时做扣缴。',
      documents: [
        {
          type: 'receipt',
          label: '社保缴费单',
          docTitle: '社会保险费缴费通知单',
          date: '2026-01-08',
          totalAmount: 18000,
          payer: '本公司',
          refNo: 'SB202601080001',
          stampText: 'XX市社会保险\n基金管理局\n社保征缴章',
          items: [
            { name: '养老保险（单位）', qty: 1, price: 12000, amount: 12000 },
            { name: '医疗保险（单位）', qty: 1, price: 4000, amount: 4000 },
            { name: '失业保险（单位）', qty: 1, price: 1200, amount: 1200 },
            { name: '工伤保险（单位）', qty: 1, price: 500, amount: 500 },
            { name: '生育保险（单位）', qty: 1, price: 300, amount: 300 }]},
        {
          type: 'bank',
          label: '银行回单',
          date: '2026-01-08',
          totalAmount: 18000,
          payer: '本公司',
          payeeName: 'XX市社会保险基金管理局',
          content: '2025年12月社保费（单位部分）',
          refNo: 'HD202601080021'}],
      entries: [
        { subjectCode: '221102', summary: '缴纳上月社保', debit: 18000, credit: 0, explanation: '应付职工薪酬-社保减少记借方。缴纳社保单位部分，冲减原计提负债。' },
        { subjectCode: '100201', summary: '缴纳上月社保', debit: 0, credit: 18000, explanation: '银行存款减少记贷方。"缴纳上月社保"，资金从银行划出，资产减少。月末需银行对账。', cashFlowItem: 'cf-op3', cashFlowExplanation: '缴纳社保属于为职工支付的现金支出，归入经营活动。' }]},
    {
      date: '2026-01-09',
      title: '缴纳上月公积金',
      tags: ["工资社保"],
      difficulty: 1,
      description: '缴纳上月住房公积金 9,000元（单位部分），以银行存款支付。',
      voucherType: 'receipt',
      totalAmount: 9000,
      tip: '公积金与社保类似，单位部分计入费用。缴费基数按规定执行，各地比例不同。',
      documents: [
        {
          type: 'receipt',
          label: '公积金汇缴书',
          docTitle: '住房公积金汇缴书',
          date: '2026-01-09',
          totalAmount: 9000,
          payer: '本公司',
          refNo: 'GJJ20260109001',
          stampText: 'XX市住房\n公积金\n管理中心\n业务专用章',
          items: [
            { name: '单位缴存（13人）', qty: 13, price: 692.31, amount: 9000 }]},
        {
          type: 'bank',
          label: '银行回单',
          date: '2026-01-09',
          totalAmount: 9000,
          payer: '本公司',
          payeeName: 'XX市住房公积金管理中心',
          content: '2025年12月公积金（单位部分）',
          refNo: 'HD202601090018'}],
      entries: [
        { subjectCode: '221103', summary: '缴纳上月公积金', debit: 9000, credit: 0, explanation: '应付职工薪酬-公积金减少记借方。缴纳公积金单位部分，冲减原计提负债。' },
        { subjectCode: '100201', summary: '缴纳上月公积金', debit: 0, credit: 9000, explanation: '银行存款减少记贷方。"缴纳上月公积金"，资金从银行划出，资产减少。月末需银行对账。', cashFlowItem: 'cf-op3', cashFlowExplanation: '缴纳公积金属于为职工支付的现金支出，归入经营活动。' }]},
    {
      date: '2026-01-10',
      title: '计提固定资产折旧',
      tags: ["资产"],
      difficulty: 2,
      description: '本月计提固定资产折旧：办公设备折旧 2,000元，机器设备折旧 5,000元。',
      voucherType: 'text',
      tip: '固定资产当月增加、下月开始计提折旧。折旧方法有直线法、双倍余额递减法等。管理用设备折旧计入管理费用，生产用设备计入制造费用。',
      documents: [
        {
          type: 'text',
          label: '折旧计算表',
          docTitle: '固定资产折旧计算表（2026年1月）',
          stampText: '固定资产\n管理专用章',
          signature: '制表：王出纳    审核：李会计    批准：赵总',
          content: `  资产名称      原值      月折旧额    累计折旧     净值
──────────────────────────────────────────
  办公设备     120,000      2,000     48,000     72,000
  机器设备     600,000      5,000    100,000    500,000
──────────────────────────────────────────
  合  计      720,000      7,000    148,000    572,000

折旧方法：平均年限法（直线法）
预计净残值率：5%
办公设备折旧年限：5年
机器设备折旧年限：10年`},
        {
          type: 'text',
          label: '资产清单',
          docTitle: '固定资产台账（摘要）',
          content: `办公设备 — HP LaserJet打印机、Dell台式电脑等 共15台
  原值：120,000元
  启用日期：2023年1月
  折旧年限：5年
  月折旧额：2,000元

机器设备 — 数控机床 共2台
  原值：600,000元
  启用日期：2024年7月
  折旧年限：10年
  月折旧额：5,000元`}],
      entries: [
        { subjectCode: '6602', summary: '计提办公设备折旧', debit: 2000, credit: 0, explanation: '管理费用增加记借方。"计提办公设备折旧"是企业管理支出，减少当期利润。' },
        { subjectCode: '5101', summary: '计提机器设备折旧', debit: 5000, credit: 0, explanation: '制造费用增加记借方。车间间接成本先归集，期末全部分配入生产成本，余额归零。' },
        { subjectCode: '1602', summary: '计提折旧', debit: 0, credit: 7000, explanation: '累计折旧增加记贷方。固定资产价值因使用消耗而减少。不直接减原值，保持历史成本。' }]},
    {
      date: '2026-01-11',
      title: '银行转账支付快递月结费',
      tags: ["出纳","费用"],
      difficulty: 1,
      description: '支付1月份顺丰快递月结费用 1,200元，通过工商银行转账支付。出纳审核快递对账单后办理付款。',
      tip: '快递月结是企业常见支出，出纳需核对快递明细后付款。分录：借：管理费用-办公费，贷：银行存款。注意：月结客户一般先服务后付款，需确认账单真实性。',
      entries: [
        { subjectCode: '660201', summary: '支付快递月结费', debit: 1200, credit: 0, explanation: '管理费用-办公费增加记借方。快递费属于企业日常管理费用支出。' },
        { subjectCode: '100201', summary: '支付快递月结费', debit: 0, credit: 1200, explanation: '银行存款减少记贷方。通过银行转账支付快递费，出纳需保留转账回单并登记银行日记账。', cashFlowItem: 'cf-op6', cashFlowExplanation: '快递费属于经营活动中的其他现金支出。' }],
      documents: [
        { type: 'bank', label: '转账回单', date: '2026-01-11', totalAmount: 1200, payer: '本公司', payeeName: '顺丰速运有限公司', content: '支付1月快递月结费', refNo: 'HD202601110022' },
        { type: 'receipt', label: '快递账单', docTitle: '顺丰速运月结账单', date: '2026-01-11', totalAmount: 1200, stampText: '顺丰速运\n发票专用章',
          items: [{ name: '文件寄送服务（共20件）', qty: 20, price: 60, amount: 1200 }] }]},
    {
      date: '2026-01-13',
      title: '采购原材料',
      tags: ["采购"],
      difficulty: 1,
      description: '从丙公司购入原材料一批，价款 30,000元，款项未付，材料已验收入库。',
      voucherType: 'text',
      tip: '原材料采购常见分录：借：原材料，贷：应付账款。如果是一般纳税人，还需要考虑增值税进项税额。',
      documents: [
        {
          type: 'text',
          label: '入库单',
          docTitle: '收料单（入库单）',
          stampText: '仓库\n验收专用章',
          signature: '保管：刘保管    采购：陈采购    会计：李会计',
          content: `入库日期：2026年1月13日

  材料名称       规格    数量    单价       金额
──────────────────────────────────────
  A型钢材       Φ25mm   2吨  15,000    30,000.00
──────────────────────────────────────
  合  计                        30,000.00

供应商：丙公司
仓库验收：刘保管    采购员：陈采购
备注：发票未到，暂估入库`},
        {
          type: 'text',
          label: '采购合同',
          docTitle: '购销合同（摘要）',
          stampText: '合同专用章',
          signature: '甲方签章：本公司    乙方签章：丙公司',
          content: `甲方（买方）：本公司
乙方（卖方）：丙公司

货物名称：A型钢材
规格型号：Φ25mm
数量：10吨
单价：15,000元/吨
合同总价：150,000.00元（壹拾伍万元整）

交货方式：分批次交货
本次交货：2吨，金额30,000元
付款方式：货到后30天付款
签订日期：2026年1月5日`}],
      entries: [
        { subjectCode: '1403', summary: '采购原材料', debit: 30000, credit: 0, explanation: '原材料增加记借方。"采购原材料"，库存材料成本增加。一般纳税人专票价款和税款分开入账。' },
        { subjectCode: '220201', summary: '采购原材料-丙公司', debit: 0, credit: 30000, explanation: '应付账款增加记贷方。"采购原材料-丙公司"，采购未付款，形成负债。' }]},
    {
      date: '2026-01-14',
      title: '销售商品（款已收）',
      tags: ["销售"],
      difficulty: 2,
      description: '向乙公司销售商品一批，价款 80,000元，增值税 10,400元（13%），款项已存入工商银行。',
      voucherType: 'invoice',
      lineItems: [{ name: 'A产品', qty: 100, price: 800, amount: 80000, taxRate: '13%', tax: 10400 }],
      totalAmount: 90400,
      buyer: '乙公司',
      seller: '本公司',
      tip: '销售商品的完整分录：借：银行存款，贷：主营业务收入、应交税费-应交增值税（销项税额）。增值税税率一般为13%（一般纳税人）。',
      documents: [
        {
          type: 'invoice',
          label: '增值税发票',
          region: '广东',
          invoiceType: '专用',
          copy: '发票联',
          invoiceNo: '4400201234',
          date: '2026年01月14日',
          buyer: '乙公司',
          buyerTaxId: '91440101MA5XXXXXXXX',
          seller: '本公司',
          sellerTaxId: '91440101MA3XXXXXXXX',
          stampText: '国家税务总局\n发票专用章',
          stampId: '91440101MA3XXXXXXXX',
          payee: '李四',
          reviewer: '王五',
          drawer: '赵六',
          lineItems: [
            { name: 'A产品', unit: '件', qty: 100, price: 800.00, amount: 80000.00, taxRate: '13%', tax: 10400.00 }],
          totalAmount: 90400.00},
        {
          type: 'bank',
          label: '银行回单',
          date: '2026-01-14',
          totalAmount: 90400,
          payer: '乙公司',
          payerAccount: '6222 0100 **** 6666',
          payeeName: '本公司',
          content: '购买A产品货款及增值税',
          refNo: 'HD202601140035'}],
      entries: [
        { subjectCode: '100201', summary: '销售商品-乙公司', debit: 90400, credit: 0, explanation: '价税合计全部收到，银行存款增加。注意含税金额 = 价款80,000 + 增值税10,400 = 90,400元。', cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品收到价税款合计，属于经营活动现金流入——主营业务产生的现金收入。' },
        { subjectCode: '6001', summary: '销售商品-乙公司', debit: 0, credit: 80000, explanation: '销售收入确认在贷方。主营业务收入按不含税价款80,000元入账。' },
        { subjectCode: '222101', summary: '销售商品-增值税', debit: 0, credit: 10400, explanation: '增值税是价外税，单独核算。销项税额 = 80,000 × 13% = 10,400元。' }]},
    {
      date: '2026-01-15',
      title: '支付水电费',
      tags: ["费用"],
      difficulty: 1,
      description: '支付本月电费 2,500元、水费 800元，以银行存款支付。',
      voucherType: 'receipt',
      totalAmount: 3300,
      tip: '水电费根据使用部门分别计入管理费用（办公室用电）或制造费用（车间用电）。小企业可全部计入管理费用。',
      documents: [
        {
          type: 'receipt',
          label: '电费单',
          docTitle: '电费缴费凭证',
          date: '2026-01-15',
          totalAmount: 2500,
          payer: '本公司',
          paymentMethod: '银行代扣',
          stampText: '国家电网\n电费收讫章',
          items: [
            { name: '有功电量 2,500 kWh × 1.00元', qty: 2500, price: 1.00, amount: 2500.00 }]},
        {
          type: 'receipt',
          label: '水费单',
          docTitle: '水费缴费凭证',
          date: '2026-01-15',
          totalAmount: 800,
          payer: '本公司',
          paymentMethod: '银行代扣',
          stampText: '自来水公司\n水费收讫章',
          items: [
            { name: '用水量 200 吨 × 4.00元', qty: 200, price: 4.00, amount: 800.00 }]}],
      entries: [
        { subjectCode: '6602', summary: '支付水电费', debit: 3300, credit: 0, explanation: '管理费用增加记借方。"支付水电费"是企业管理支出，减少当期利润。' },
        { subjectCode: '100201', summary: '支付水电费', debit: 0, credit: 3300, explanation: '银行存款减少记贷方。"支付水电费"，资金从银行划出，资产减少。月末需银行对账。', cashFlowItem: 'cf-op6', cashFlowExplanation: '水电费属于经营活动中的其他现金支出。' }]},
    {
      date: '2026-01-17',
      title: '收到股东增资款',
      tags: ["融资"],
      difficulty: 1,
      description: '收到股东追加投资 100,000元，款项已存入工商银行。',
      voucherType: 'receipt',
      totalAmount: 100000,
      tip: '股东增资：借：银行存款，贷：实收资本。如果增资额超过注册资本份额，超出部分计入资本公积。',
      documents: [
        {
          type: 'bank',
          label: '银行进账单',
          date: '2026-01-17',
          totalAmount: 100000,
          payer: '股东张三',
          payerAccount: '6222 0100 **** 2222',
          payeeName: '本公司',
          content: '投资款',
          remark: '增加注册资本',
          refNo: 'HD202601170056'},
        {
          type: 'text',
          label: '股东会决议',
          docTitle: '股东会决议（摘要）',
          stampText: '本公司\n公章',
          content: `会议时间：2026年1月15日
出席股东：张三（100%股权）

决议事项：
1. 增加注册资本壹拾万元整（¥100,000.00）
2. 新增资本由股东张三以货币出资
3. 增资后注册资本由300,000元增至400,000元

全体股东签字：
    ┌─────────────────────┐
    │  股东：张  三  （签字）  │
    │  日期：2026年1月15日   │
    └─────────────────────┘

（本决议一式两份，股东及公司各执一份）`}],
      entries: [
        { subjectCode: '100201', summary: '收到股东增资', debit: 100000, credit: 0, explanation: '银行存款增加记借方。"收到股东增资"，款项存入银行账户，资产增加。需逐笔登记银行日记账并与银行对账。', cashFlowItem: 'cf-fin3', cashFlowExplanation: '股东增资属于筹资活动现金流入——企业通过权益融资获得资金，区别于借款（负债融资）。' },
        { subjectCode: '4001', summary: '收到股东增资', debit: 0, credit: 100000, explanation: '实收资本增加记贷方。股东投入资本金，所有者权益增加。' }]},
    {
      date: '2026-01-18',
      title: '客户提前付款享受现金折扣 ⭐',
      tags: ["销售"],
      difficulty: 2,
      description: '上月赊销给乙公司的商品价款30,000元，增值税3,900元（13%），合计应收账款33,900元。乙公司于今日提前付款，根据合同享受2%现金折扣（30,000×2%=600元）。实际收到33,300元已存入工商银行。现金折扣计入财务费用，不冲减销售收入。',
      tip: '现金折扣是企业为鼓励客户提前付款而给予的价格优惠，计入财务费用。收款金额=应收账款-现金折扣。注意：现金折扣不能冲减主营业务收入，应作为财务费用处理。',
      entries: [
        { subjectCode: '100201', summary: '收到乙公司货款（含现金折扣）', debit: 33300, credit: 0, explanation: '银行存款增加记借方。乙公司实际支付33,300元（33,900-600），已存入工商银行。', cashFlowItem: 'cf-op', cashFlowExplanation: '收回含现金折扣的销售货款仍属于销售商品收到的现金。折扣部分计入财务费用不影响现金流分类。' },
        { subjectCode: '6603', summary: '乙公司享受现金折扣', debit: 600, credit: 0, explanation: '财务费用增加记借方。现金折扣30,000×2%=600元，是企业为加速资金回笼而发生的融资成本。根据《企业会计准则第14号——收入》，现金折扣计入财务费用，不得冲减主营业务收入。' },
        { subjectCode: '112202', summary: '收回乙公司欠款', debit: 0, credit: 33900, explanation: '应收账款减少记贷方。全额冲减应收账款33,900元（含税），差额600元为现金折扣。' }],
      documents: [
        {
          type: 'bank',
          label: '银行回单',
          date: '2026-01-18',
          totalAmount: 33300,
          payer: '乙公司',
          payerAccount: '6222 0100 **** 6666',
          payeeName: '本公司',
          content: '货款（含现金折扣）',
          refNo: 'HD202601180048'},
        {
          type: 'text',
          label: '现金折扣计算',
          docTitle: '现金折扣计算说明',
          stampText: '财务专用章',
          content: `销售合同条款：2/10, n/30
（10天内付款享受2%折扣，30天内全额付款）

应收账款余额：33,900.00元
  价款：30,000.00元
  增值税：3,900.00元（13%）

现金折扣计算：
  折扣基数：货款30,000.00元（增值税部分不享受折扣）
  折扣率：2%
  折扣金额：30,000 × 2% = 600.00元

实际收款：33,900 - 600 = 33,300.00元

会计分录：
  借：银行存款      33,300
  借：财务费用         600
  贷：应收账款      33,900`}]},
    {
      date: '2026-01-20',
      title: '偿还银行短期借款',
      tags: ["融资"],
      difficulty: 1,
      description: '偿还到期的短期借款本金 50,000元，以银行存款支付。',
      voucherType: 'receipt',
      totalAmount: 50000,
      tip: '偿还借款本金：借：短期借款，贷：银行存款。借款利息应计入财务费用，与本金分开核算。',
      documents: [
        {
          type: 'receipt',
          label: '还款凭证',
          docTitle: '贷款还款凭证',
          date: '2026-01-20',
          totalAmount: 50000,
          payer: '本公司',
          refNo: 'DK20260120001',
          stampText: '中国工商银行\n贷款业务章',
          items: [
            { name: '短期借款本金（到期还本）', qty: 1, price: 50000, amount: 50000 }]},
        {
          type: 'text',
          label: '借款合同',
          docTitle: '短期借款合同（摘要）',
          stampText: '银行合同专用章',
          signature: '贷款人：中国工商银行XX支行（盖章）    借款人：本公司（盖章）',
          content: `贷款人：中国工商银行XX支行
借款人：本公司

借款种类：短期流动资金贷款
借款金额：200,000.00元
年利率：4.35%（年）
借款期限：2025年7月20日 - 2026年1月20日
还款方式：到期一次性还本付息

本次偿还本金：50,000.00元`}],
      entries: [
        { subjectCode: '2001', summary: '偿还短期借款', debit: 50000, credit: 0, explanation: '短期借款减少记借方。偿还借款本金，负债减少。利息单独进财务费用。' },
        { subjectCode: '100201', summary: '偿还短期借款', debit: 0, credit: 50000, explanation: '银行存款减少记贷方。"偿还短期借款"，资金从银行划出，资产减少。月末需银行对账。', cashFlowItem: 'cf-fin2', cashFlowExplanation: '偿还短期借款本金属于筹资活动现金流出——归还债务本金，区别于支付利息（利息计入经营活动或筹资活动）。' }]},
    {
      date: '2026-01-21',
      title: '员工报销差旅费',
      tags: ["费用"],
      difficulty: 1,
      description: '销售部员工张三出差归来报销差旅费 3,000元（含往返机票1,800元、住宿800元、餐补400元），以银行存款支付。',
      voucherType: 'receipt',
      totalAmount: 3000,
      tip: '差旅费计入"管理费用-差旅费"或"销售费用-差旅费"（按部门）。差旅费中的机票、住宿可抵扣增值税。',
      documents: [
        {
          type: 'receipt',
          label: '报销单',
          docTitle: '差旅费报销单',
          date: '2026-01-21',
          totalAmount: 3000,
          payer: '本公司',
          stampText: '财务\n审核专用章',
          receiver: '张三',
          items: [
            { name: '往返机票（广州-深圳）', qty: 1, price: 1800, amount: 1800 },
            { name: '住宿费（2晚）', qty: 2, price: 400, amount: 800 },
            { name: '出差补贴（2天×200元）', qty: 2, price: 200, amount: 400 }]},
        {
          type: 'receipt',
          label: '行程单',
          docTitle: '航空运输电子客票行程单',
          date: '2026-01-21',
          totalAmount: 1800,
          payer: '本公司',
          stampText: '电子客票\n专用章',
          items: [
            { name: '广州CAN → 深圳SZX 往返', qty: 1, price: 1800, amount: 1800 }]}],
      entries: [
        { subjectCode: '660202', summary: '报销张三差旅费', debit: 3000, credit: 0, explanation: '管理费用-差旅费增加记借方。出差费用实报实销。' },
        { subjectCode: '100201', summary: '报销张三差旅费', debit: 0, credit: 3000, explanation: '银行存款减少记贷方。"报销张三差旅费"，资金从银行划出，资产减少。月末需银行对账。', cashFlowItem: 'cf-op6', cashFlowExplanation: '差旅费属于经营活动中的其他现金支出——员工出差报销是日常管理性支出。' }]},
    {
      date: '2026-01-22',
      title: '支付广告费',
      tags: ["费用"],
      difficulty: 1,
      description: '支付本月网络推广广告费 6,000元，以银行存款支付。',
      voucherType: 'receipt',
      totalAmount: 6000,
      tip: '广告费计入"销售费用-广告费"。广告费不超过当年营业收入15%的部分可以税前扣除。',
      documents: [
        {
          type: 'invoice',
          label: '服务发票',
          region: '北京',
          invoiceType: '专用',
          copy: '发票联',
          invoiceNo: '1100998765',
          date: '2026年01月22日',
          buyer: '本公司',
          buyerTaxId: '91440101MA3XXXXXXXX',
          seller: '百度在线网络技术（北京）有限公司',
          sellerTaxId: '91110000802138434Y',
          stampText: '百度\n发票专用章',
          payee: '周七',
          reviewer: '吴八',
          drawer: '郑九',
          lineItems: [
            { name: '搜索推广服务费', unit: '项', qty: 1, price: 6000.00, amount: 6000.00, taxRate: '6%', tax: 360.00 }],
          totalAmount: 6360.00},
        {
          type: 'text',
          label: '服务合同',
          docTitle: '网络推广服务合同（摘要）',
          stampText: '合同专用章',
          content: `甲方：本公司
乙方：百度在线网络技术（北京）有限公司

服务内容：百度搜索推广
服务期限：2026年1月1日 - 2026年12月31日

本次充值金额：6,000.00元
服务费：360.00元（6%）
合计：6,360.00元`}],
      entries: [
        { subjectCode: '660101', summary: '支付广告费', debit: 6000, credit: 0, explanation: '销售费用-广告费增加记借方。广告宣传支出直接费用化。' },
        { subjectCode: '100201', summary: '支付广告费', debit: 0, credit: 6000, explanation: '银行存款减少记贷方。"支付广告费"，资金从银行划出，资产减少。月末需银行对账。', cashFlowItem: 'cf-op6', cashFlowExplanation: '广告费属于经营活动中的其他现金支出——营销推广费用。' }]},
    {
      date: '2026-01-24',
      title: '购买办公电脑',
      tags: ["资产"],
      difficulty: 2,
      description: '行政部购买办公用电脑一台，价款 4,500元，以银行存款支付。预计使用3年。',
      voucherType: 'receipt',
      totalAmount: 4500,
      tip: '固定资产标准：单价≥2,000元且使用年限≥1年。电脑作为"固定资产-办公设备"，下月开始计提折旧，折旧年限3年（36个月）。',
      documents: [
        {
          type: 'invoice',
          label: '普通发票',
          region: '广东',
          invoiceType: '普通',
          copy: '发票联',
          invoiceNo: '4400219876',
          date: '2026年01月24日',
          buyer: '本公司',
          buyerTaxId: '91440101MA3XXXXXXXX',
          seller: 'XX数码科技有限公司',
          sellerTaxId: '91440101MA6YYYYYYY',
          stampText: 'XX数码\n发票专用章',
          payee: '钱十',
          reviewer: '孙十一',
          drawer: '李十二',
          lineItems: [
            { name: '联想台式电脑 ThinkCentre M930t', unit: '台', qty: 1, price: 4500.00, amount: 4500.00, taxRate: '免税', tax: 0 }],
          totalAmount: 4500.00},
        {
          type: 'bank',
          label: '银行回单',
          date: '2026-01-24',
          totalAmount: 4500,
          payer: '本公司',
          payeeName: 'XX数码科技有限公司',
          content: '购买办公电脑一台',
          refNo: 'HD202601240105'}],
      entries: [
        { subjectCode: '160103', summary: '购买办公电脑', debit: 4500, credit: 0, explanation: '固定资产增加记借方。办公设备符合固定资产确认条件（使用超1年），应计提折旧而非一次性费用化。' },
        { subjectCode: '100201', summary: '购买办公电脑', debit: 0, credit: 4500, explanation: '银行存款减少记贷方。"购买办公电脑"，资金从银行划出，资产减少。月末需银行对账。', cashFlowItem: 'cf-inv', cashFlowExplanation: '购买固定资产（办公电脑）属于投资活动现金流出——资本性支出不同于日常经营支出。' }]},
    {
      date: '2026-01-25',
      title: '银行转账支付审计费',
      tags: ["出纳","费用"],
      difficulty: 2,
      description: '支付年度财务报表审计费 8,000元给XX会计师事务所，通过工商银行转账支付。出纳核对审计合同后办理付款。',
      tip: '审计费属于管理费用。分录：借：管理费用-中介费，贷：银行存款。注意：聘请会计师事务所进行年报审计是《公司法》的要求，上市公司必须经过审计。',
      entries: [
        { subjectCode: '6602', summary: '支付年度审计费', debit: 8000, credit: 0, explanation: '管理费用增加。年度审计费是企业为满足法规要求而发生的管理支出。' },
        { subjectCode: '100201', summary: '支付年度审计费', debit: 0, credit: 8000, explanation: '银行存款减少。通过银行转账支付审计费，出纳需核对审计合同金额。', cashFlowItem: 'cf-op6', cashFlowExplanation: '审计费属于经营活动中的其他现金支出——专业服务费用。' }],
      documents: [
        { type: 'bank', label: '转账回单', date: '2026-01-25', totalAmount: 8000, payer: '本公司', payeeName: 'XX会计师事务所', content: '2026年度财务报表审计费', refNo: 'HD202601250065' },
        { type: 'invoice', label: '服务发票', region: '广东', invoiceType: '专用', copy: '发票联', invoiceNo: '4400277777', date: '2026年01月25日', buyer: '本公司', buyerTaxId: '91440101MA3XXXXXXXX', seller: 'XX会计师事务所', sellerTaxId: '91440101MA9JJJJJJJ', stampText: 'XX会计师事务所\n发票专用章',
          lineItems: [{ name: '2026年度财务报表审计服务', unit: '项', qty: 1, price: 8000, amount: 8000, taxRate: '6%', tax: 480 }], totalAmount: 8480 }]},
    {
      date: '2026-01-27',
      title: '计提本月税费',
      tags: ["税费"],
      difficulty: 2,
      description: '本月应计提城建税（增值税的7%）和教育费附加（增值税的3%）。本月增值税销项税额10,400元，进项税额0元（小规模纳税人简化处理）。',
      voucherType: 'text',
      tip: '城建税=增值税×7%，教育费附加=增值税×3%，地方教育费附加=增值税×2%。这些附加税费计入"税金及附加"。',
      documents: [
        {
          type: 'text',
          label: '税费计算表',
          docTitle: '税费计提计算表（2026年1月）',
          stampText: '财务专用章',
          signature: '制表：李会计    审核：赵会计主管',
          content: `  税种            计税依据          税率      金额
──────────────────────────────────────
  城建税          增值税 10,400       7%       728
  教育费附加       增值税 10,400       3%       312
──────────────────────────────────────
  合  计                                   1,040.00

增值税计算：
  销项税额：10,400.00
  进项税额：      0.00
  应纳增值税：10,400.00

政策依据：《城市维护建设税法》2020年第十二号
         《征收教育费附加的暂行规定》`}],
      entries: [
        { subjectCode: '6403', summary: '计提城建税', debit: 728, credit: 0, explanation: '城建税=增值税×7%。增值税是价外税，但城建税是附加税，计入"税金及附加"。' },
        { subjectCode: '222103', summary: '计提城建税', debit: 0, credit: 728, explanation: '应交城建税增加记贷方。月末计提（增值税×7%），形成负债。' },
        { subjectCode: '6403', summary: '计提教育费附加', debit: 312, credit: 0, explanation: '税金及附加增加记借方。以应纳增值税为基数计提的城建税和教育费附加。' },
        { subjectCode: '222104', summary: '计提教育费附加', debit: 0, credit: 312, explanation: '应交教育费附加增加记贷方。月末计提（增值税×3%），形成负债。' }]},
    {
      date: '2026-01-28',
      title: '月末结转·期间损益',
      tags: ["期末"],
      difficulty: 3,
      description: '月末将各损益类科目余额结转至"本年利润"。本月收入80,000元，各项费用合计约89,040元。',
      voucherType: 'text',
      tip: '期间损益结转是月末必做步骤。收入类从借方转出（余额为零），费用类从贷方转出。差额为本月净利润（或净亏损）。亏损时：借：利润分配-未分配利润，贷：本年利润。',
      documents: [
        {
          type: 'text',
          label: '结转计算表',
          docTitle: '期间损益结转表（2026年1月）',
          stampText: '已结转',
          signature: '制表：李会计    审核：赵会计主管    财务负责人：赵总',
          content: `  科目                    余额方向      金额
────────────────────────────────────
【收入类】→ 本年利润（贷方）
  主营业务收入              贷        80,000

【费用类】→ 本年利润（借方）
  管理费用-办公费            借           500
  管理费用-租赁费            借         8,000
  管理费用-折旧费            借         2,000
  管理费用-水电费            借         3,300
  管理费用-工资              借        25,000
  管理费用-差旅费            借         3,000
  销售费用-工资              借        35,000
  销售费用-广告费            借         6,000
  财务费用-手续费            借           200
  税金及附加                 借         1,040
  制造费用                   借         5,000
────────────────────────────────────
  收入合计：80,000
  费用合计：89,040
  本年利润：-9,040（净亏损）

结转后各损益类科目余额为零 ✓`}],
      entries: [
        { subjectCode: '6001', summary: '结转主营业务收入', debit: 80000, credit: 0,
          explanation: '为什么结转入本年利润时借"主营业务收入"？主营业务收入平时在贷方（收入增加），月末余额在贷方。结转时从借方转出，余额归零。差额计入本年利润。' },
        { subjectCode: '6603', summary: '结转财务费用（利息收入冲减）', debit: 7900, credit: 0,
          explanation: '本月财务费用因利息收入（8,500元）大于手续费支出（600元），产生贷方余额7,900元。贷方余额从借方转出，实质是冲减费用增加利润。' },
        { subjectCode: '4103', summary: '结转本年利润（净亏损）', debit: 11340, credit: 0,
          explanation: '本月收入80,000元，费用合计91,340元（含制造费用5,000元），为净亏损11,340元。"本年利润"借方表示亏损。' },
        { subjectCode: '660201', summary: '结转管理费用-办公费', debit: 0, credit: 1700, explanation: '办公费1,700元转出记贷方。月末余额归零。含办公用品采购及电话网络费。' },
        { subjectCode: '6602', summary: '结转管理费用（房租+水电+折旧）', debit: 0, credit: 22500, explanation: '管理费用转出记贷方。含租赁费8,000、折旧费2,000、水电费3,300、通讯费1,200及其他。' },
        { subjectCode: '660203', summary: '结转管理费用-工资', debit: 0, credit: 25000, explanation: '管理工资转出记贷方。月末余额归零。' },
        { subjectCode: '6601', summary: '结转销售费用', debit: 0, credit: 35000, explanation: '销售费用转出记贷方。月末结转至本年利润，余额归零。' },
        { subjectCode: '660202', summary: '结转管理费用-差旅费', debit: 0, credit: 3000, explanation: '差旅费转出记贷方。月末余额归零。' },
        { subjectCode: '660101', summary: '结转销售费用-广告费', debit: 0, credit: 6000, explanation: '广告费转出记贷方。月末余额归零。' },
        { subjectCode: '6403', summary: '结转税金及附加', debit: 0, credit: 1040, explanation: '税金及附加转出记贷方。月末余额归零。' },
        { subjectCode: '5101', summary: '结转制造费用', debit: 0, credit: 5000, explanation: '制造费用转出记贷方。期末分配至生产成本，余额归零。' }]},
    {
      date: '2026-01-29',
      title: '银行代扣社保个人部分缴费',
      tags: ["出纳","工资社保"],
      difficulty: 2,
      description: '本月代扣的社保个人部分 6,000元和公积金个人部分 3,000元已由银行代扣缴纳给社保局和公积金中心。出纳确认扣款并登记入账。',
      tip: '代扣款项的缴纳是出纳的重要职责——发工资时从员工工资中扣下，次月由企业统一缴纳。分录：借：其他应付款-社保/公积金，贷：银行存款。两种代扣款应分别核算。',
      entries: [
        { subjectCode: '224101', summary: '缴纳代扣社保个人部分', debit: 6000, credit: 0, explanation: '其他应付款-社保减少记借方。代扣的社保个人部分已缴给社保局，负债减少。' },
        { subjectCode: '224102', summary: '缴纳代扣公积金个人部分', debit: 3000, credit: 0, explanation: '其他应付款-公积金减少记借方。代扣的公积金个人部分已缴给公积金中心，负债减少。' },
        { subjectCode: '100201', summary: '缴纳代扣社保公积金', debit: 0, credit: 9000, explanation: '银行存款减少记贷方。两笔代扣款共9,000元通过银行划转缴纳。出纳需核对扣款回单。', cashFlowItem: 'cf-op3', cashFlowExplanation: '代扣社保公积金的缴纳属于为职工支付的现金支出——虽然资金来源于员工工资代扣，但统一缴纳仍归入经营活动。' }],
      documents: [
        { type: 'bank', label: '社保扣款回单', date: '2026-01-29', totalAmount: 6000, payer: '本公司', payeeName: 'XX市社会保险基金管理局', content: '缴纳1月代扣社保个人部分', refNo: 'HD202601290070' },
        { type: 'bank', label: '公积金扣款回单', date: '2026-01-29', totalAmount: 3000, payer: '本公司', payeeName: 'XX市住房公积金管理中心', content: '缴纳1月代扣公积金个人部分', refNo: 'HD202601290071' }]},
    {
      date: '2026-01-06', title: '银行进账确认-收到客户货款',
      tags: ["出纳","销售"], difficulty: 1,
      description: '客户甲公司通过银行转账支付一笔货款 50,000元，款项已到账。出纳登录网银确认入账，登记银行日记账。',
      tip: '出纳每日需登录企业网银查看是否有新到款项。收到银行进账通知后，确认金额和付款方，登记银行日记账。若无分录需要做，确认即可。',
      role: 'cashier', entries: [],
      documents: [
        { type: 'bank', label: '银行进账回单', date: '2026-01-06', totalAmount: 50000, payer: '甲公司', payeeName: '本公司', content: '货款', refNo: 'HD202601060015' }]},
    {
      date: '2026-01-09', title: '银行转账支付电话费',
      tags: ["出纳","费用"], difficulty: 1,
      description: '支付1月份固定电话费和网络费共计 1,200元，通过工商银行转账支付。',
      tip: '通讯费是企业的日常管理费用。分录：借：管理费用-办公费，贷：银行存款。出纳办理后需将缴费回单归档。',
      entries: [
        { subjectCode: '6602', summary: '支付电话网络费', debit: 1200, credit: 0, explanation: '管理费用增加。通讯费是企业日常管理支出。' },
        { subjectCode: '100201', summary: '支付电话网络费', debit: 0, credit: 1200, explanation: '银行存款减少。通过银行转账支付，出纳需保留回单。', cashFlowItem: 'cf-op6', cashFlowExplanation: '电话网络费属于经营活动中的其他现金支出。' }],
      documents: [
        { type: 'bank', label: '缴费回单', date: '2026-01-09', totalAmount: 1200, payer: '本公司', payeeName: '中国电信XX分公司', content: '1月电话费及网络费', refNo: 'HD202601090020' }]},
    {
      date: '2026-01-12', title: '银行回单的整理与归档',
      tags: ["出纳"], difficulty: 1,
      description: '过去一周发生了多笔银行业务（缴社保、缴公积金、收款、付款等），出纳整理银行回单并分类归档。',
      tip: '及时整理银行回单是出纳的重要日常工作。回单需按月装订成册，作为会计档案保存至少10年。',
      role: 'cashier', entries: [], documents: [
        { type: 'text', label: '回单清单', docTitle: '回单整理清单（1月第2周）', stampText: '财务专用章',
          content: `回单清单：1/5收到货款50,000 1/6支付房租8,000\n1/8缴社保18,000 1/9缴公积金9,000 均已完成勾对✓` }]},
    {
      date: '2026-01-17', title: '银行账户间资金划转 ⭐',
      tags: ["出纳"], difficulty: 2,
      description: '因建行账户需要支付一笔贷款利息，从工商银行划转 30,000元至建设银行。出纳通过企业网银办理同行转账。',
      tip: '同一企业不同银行账户间的资金调拨，分录可简化为：借：银行存款-建行，贷：银行存款-工行。出纳需在两个账户的日记账中都登记此笔业务。',
      entries: [
        { subjectCode: '100202', summary: '工行转建行-建行增加', debit: 30000, credit: 0, explanation: '银行存款-建设银行增加。资金从工行转入建行，建行账户余额增加。' },
        { subjectCode: '100201', summary: '工行转建行-工行减少', debit: 0, credit: 30000, explanation: '银行存款-工商银行减少。资金从工行划出，工行账户余额减少。出纳需在两本日记账中都登记此笔。' }],
      documents: [
        { type: 'bank', label: '网银转账回单', date: '2026-01-17', totalAmount: 30000, payer: '本公司（工行）', payeeName: '本公司（建行）', content: '资金调拨', refNo: 'HD202601170045' }]},
    {
      date: '2026-01-19', title: '银行存款利息收入确认',
      tags: ["出纳","融资"], difficulty: 1,
      description: '收到工商银行1月份存款利息收入 8,500元，银行已自动入账。出纳确认利息收入并登记银行存款日记账。',
      tip: '存款利息冲减财务费用。分录：借：银行存款，贷：财务费用-利息收入。注意：利息收入不是营业收入。',
      entries: [
        { subjectCode: '100201', summary: '1月存款利息', debit: 8500, credit: 0, explanation: '银行存款增加。存款利息由银行自动入账。', cashFlowItem: 'cf-op5', cashFlowExplanation: '存款利息收入属于"收到其他与经营活动有关的现金"。利息收入虽然与银行相关但不属于投资或筹资活动，而是企业经营性资金存放产生的收益。' },
        { subjectCode: '6603', summary: '冲减财务费用', debit: 0, credit: 8500, explanation: '财务费用减少。利息收入冲减费用，贷方表示减少。' }],
      documents: [
        { type: 'bank', label: '利息入账回单', date: '2026-01-19', totalAmount: 8500, payer: '中国工商银行', payeeName: '本公司', content: '2026年1月存款利息', refNo: 'HD202601190050' }]},
    {
      date: '2026-01-22', title: '银行代发工资确认',
      tags: ["出纳","工资社保"], difficulty: 1,
      description: '本月工资已由银行代发完毕，出纳确认银行代发回单，核对实发金额与工资表一致。',
      tip: '银行代发工资是出纳的月度例行工作。出纳需将工资明细表提交银行，银行批量转账至员工账户。收到银行回单后确认代发成功，若有个别失败需查明原因。',
      role: 'cashier', entries: [], documents: [
        { type: 'bank', label: '代发工资回单', date: '2026-01-22', totalAmount: 49500, payer: '本公司', payeeName: '员工代发户', content: '2026年1月工资代发', refNo: 'HD202601220060' },
        { type: 'text', label: '代发明细', docTitle: '银行代发工资明细表', stampText: '银行受理章',
          content: `代发总金额：49,500.00\n代发人数：13人\n成功：13笔\n失败：0笔` }]},
    {
      date: '2026-01-23', title: '银行对账单核对',
      tags: ["出纳"], difficulty: 1,
      description: '从网银下载本月截至目前（1月1日-23日）的银行对账单，与银行日记账逐笔勾对，检查是否有未达账项。',
      tip: '出纳应定期（建议每周）核对银行日记账与银行对账单，及时发现未达账项和异常交易。不要在月底才一次性对账，平时定期核对效率更高、错误更少。',
      role: 'cashier', entries: [], documents: [
        { type: 'text', label: '银行对账单', docTitle: '中国工商银行对账单（截至1月23日）', stampText: '中国工商银行\n电子业务\n专用章',
          content: `账户余额：637,900.00\n已勾对笔数：15笔\n未达账项：0笔` }]},
    {
      date: '2026-01-26',
      title: '采购运杂费分摊',
      tags: ["采购"],
      difficulty: 1,
      description: '从丁公司采购B型钢材3吨，单价16,000元，货款48,000元尚未支付。另以银行存款支付运费2,400元、装卸费600元。材料已验收入库。根据会计准则，运费和装卸费应计入原材料采购成本。',
      tip: '采购原材料发生的运费、装卸费等直接费用应计入原材料采购成本，而非计入期间费用。分录：借：原材料（货款+运杂费），贷：应付账款/银行存款。',
      entries: [
        { subjectCode: '1403', summary: '采购B型钢材（含运杂费）', debit: 51000, credit: 0, explanation: '原材料增加记借方。采购成本=货款48,000+运费2,400+装卸费600=51,000元。根据《企业会计准则第1号——存货》，采购途中发生的运费、装卸费等均计入存货成本。' },
        { subjectCode: '220202', summary: '采购B型钢材-丁公司', debit: 0, credit: 48000, explanation: '应付账款增加记贷方。48,000元货款未付，形成对丁公司的负债。' },
        { subjectCode: '100201', summary: '支付运费及装卸费', debit: 0, credit: 3000, explanation: '银行存款减少记贷方。运费2,400+装卸费600=3,000元通过银行转账支付。注意：运杂费不计入"管理费用"或"销售费用"，而是计入存货成本，这是初学者容易出错的地方。', cashFlowItem: 'cf-op2', cashFlowExplanation: '采购运杂费属于"购买商品、接受劳务支付的现金"——运费和装卸费是存货采购成本的一部分，归入经营活动现金流出。' }],
      documents: [
        {
          type: 'text',
          label: '入库单',
          docTitle: '收料单（入库单）',
          date: '2026-01-26',
          stampText: '仓库\n验收专用章',
          signature: '保管：刘保管    采购：陈采购    会计：李会计',
          content: `入库日期：2026年1月26日

  材料名称       规格    数量    单价       金额
──────────────────────────────────────
  B型钢材       Φ30mm   3吨  17,000    51,000.00
──────────────────────────────────────
  合  计                        51,000.00

供应商：丁公司
仓库验收：刘保管    采购员：陈采购

备注：含运费2,400元、装卸费600元`},
        {
          type: 'receipt',
          label: '运费发票',
          docTitle: '增值税电子普通发票',
          date: '2026-01-26',
          totalAmount: 2400,
          payer: '本公司',
          stampText: 'XX物流公司\n发票专用章',
          items: [
            { name: 'B型钢材运输服务（3吨）', qty: 3, price: 800, amount: 2400 }]},
        {
          type: 'receipt',
          label: '装卸费收据',
          docTitle: '装卸服务费收据',
          date: '2026-01-26',
          totalAmount: 600,
          payer: '本公司',
          stampText: 'XX装卸服务部\n收款专用章',
          items: [
            { name: 'B型钢材装卸服务', qty: 3, price: 200, amount: 600 }]}]},
    {
      date: '2026-01-28', title: '银行代扣社保/公积金缴费 ⭐',
      tags: ["出纳","工资社保"], difficulty: 2,
      description: '本月社保费单位部分 18,000元和公积金单位部分 9,000元已由银行自动代扣。出纳核对扣款回单并登记入账。',
      tip: '社保和公积金由银行按月自动代扣。出纳需在扣款后取得回单，确认金额与申报表一致。分录：借：应付职工薪酬-社保/公积金，贷：银行存款。',
      entries: [
        { subjectCode: '221102', summary: '缴纳1月社保单位部分', debit: 18000, credit: 0, explanation: '应付职工薪酬-社保减少。单位社保由企业承担，冲减计提负债。' },
        { subjectCode: '221103', summary: '缴纳1月公积金单位部分', debit: 9000, credit: 0, explanation: '应付职工薪酬-公积金减少。单位公积金冲减计提负债。' },
        { subjectCode: '100201', summary: '缴纳社保公积金', debit: 0, credit: 27000, explanation: '银行存款减少。社保18,000+公积金9,000=27,000元通过银行代扣。', cashFlowItem: 'cf-op3', cashFlowExplanation: '缴纳社保和公积金单位为职工支付的现金支出。社保公积金是职工薪酬的组成部分，归入经营活动——支付给职工以及为职工支付的现金。' }],
      documents: [
        { type: 'bank', label: '社保扣款回单', date: '2026-01-28', totalAmount: 18000, payer: '本公司', payeeName: 'XX市社保局', content: '1月社保单位部分', refNo: 'HD202601280075' },
        { type: 'bank', label: '公积金扣款回单', date: '2026-01-28', totalAmount: 9000, payer: '本公司', payeeName: 'XX市公积金中心', content: '1月公积金单位部分', refNo: 'HD202601280076' }]},
    {
      date: '2026-01-30',
      title: '资金筹集方式对比分析',
      tags: ["融资"],
      difficulty: 1,
      description: '企业近期需要80,000元资金用于扩大生产。财务部列出两种方案：(A)股东追加投资80,000元；(B)向银行借入短期借款80,000元，期限1年，年利率4.35%。请分析两种方式对企业财务状况的不同影响。',
      tip: '股东增资 vs 银行借款的核心区别：增资增加所有者权益、不产生利息费用、不增加财务风险；借款增加负债、产生利息费用、增加财务风险但具有财务杠杆效应。',
      role: 'cashier',
      entries: [],
      documents: [
        {
          type: 'text',
          label: '筹资方案对比表',
          docTitle: '资金筹集方式对比分析表',
          stampText: '财务专用章',
          signature: '制表：李会计    审核：赵会计主管',
          content: `  对比维度          股东增资（方案A）        银行借款（方案B）
─────────────────────────────────────────────────────
  1. 会计处理       借：银行存款            借：银行存款
                    贷：实收资本            贷：短期借款

  2. 对资产负债表   资产↑ 所有者权益↑       资产↑ 负债↑

  3. 对利润表       无直接影响             产生利息费用→利润↓

  4. 资金成本       无需还本付息           需还本付息（年利率4.35%）

  5. 财务风险       无                     有（到期还本压力）

  6. 控制权影响     股权稀释               无影响

  7. 税收影响       无                     利息支出可税前扣除

  结论：
  方案A（增资）适合长期资金需求，安全但稀释股权
  方案B（借款）适合短期资金需求，有杠杆效应但需控制风险

  ⚠️ 思考题：假设企业年利润率8%，哪种方案对股东更有利？
  提示：借款有财务杠杆效应——当投资回报率>借款利率时
  （8% > 4.35%），借款能提高股东收益率！`}]},
    {
      date: '2026-01-30', title: '库存现金盘点',
      tags: ["出纳"], difficulty: 1,
      description: '月末对库存现金进行全面盘点，账面余额 2,000元，实盘金额 2,000元，账实相符。编制现金盘点表。',
      tip: '现金盘点应在每月末进行，出纳自行盘点、会计主管监盘。盘点表需双方签字确认。发现长款或短款需查明原因并通过"待处理财产损溢"科目核算。',
      role: 'cashier',
      entries: [], documents: [
        { type: 'text', label: '现金盘点表', docTitle: '库存现金盘点表（2026年1月）', stampText: '财务专用章',
          content: `盘点日期：2026年1月30日\n账面余额：2,000.00\n实盘金额：2,000.00\n结果：相符 ✓\n盘点人：王出纳  监盘人：李会计` }]},
    {
      date: '2026-01-31',
      title: '月末·银行存款余额核对',
      tags: ["出纳","期末"],
      difficulty: 1,
      description: '月末了，核对工商银行日记账余额与银行对账单是否一致。本月银行存款变动较大，需要逐笔勾对。',
      role: 'cashier',
      voucherType: 'text',
      tip: '每月末必须做银行存款余额调节表。常见差异原因：未达账项（企业已收银行未收、银行已付企业未付等）。这是出纳的重要工作。',
      documents: [
        {
          type: 'text',
          label: '银行对账单',
          docTitle: '银行对账单（2026年1月）',
          stampText: '中国工商银行\n电子业务\n专用章',
          content: `中国工商银行 对账单

账户：6222 0200 **** 1234
户名：本公司

日期      摘要              收入         支出       余额
────────────────────────────────────────────
01-01     期初余额                                  500,000.00
01-03     购买办公用品                   500.00    499,500.00
01-05     收到甲公司货款   50,000.00                549,500.00
01-06     支付房租                       8,000.00    541,500.00
01-08     缴纳社保                      18,000.00    523,500.00
01-09     缴纳公积金                     9,000.00    514,500.00
01-14     销售收款        90,400.00                604,900.00
01-15     支付水电费                     3,300.00    601,600.00
01-16     银行手续费                       200.00    601,400.00
01-17     股东增资       100,000.00                701,400.00
01-20     偿还借款                      50,000.00    651,400.00
01-21     报销差旅费                     3,000.00    648,400.00
01-22     支付广告费                     6,000.00    642,400.00
01-24     购买电脑                       4,500.00    637,900.00
01-31     利息收入         8,500.00                646,400.00
────────────────────────────────────────────
期末余额：¥646,400.00`},
        {
          type: 'text',
          label: '余额调节表',
          docTitle: '银行存款余额调节表',
          content: `账户：工商银行 6222 0200 **** 1234
编制日期：2026年1月31日

                             金额
────────────────────────────
企业日记账余额：xxx（需填入）
加：银行已收、企业未收          -
减：银行已付、企业未付          -
调节后余额：                   -

银行对账单余额：646,400.00
加：企业已收、银行未收          -
减：企业已付、银行未付          -
调节后余额：                   -

提示：请根据银行对账单逐笔勾对
找出未达账项后填写完整`}],
      role: 'cashier',
      entries: []},
  {
    date: "2026-01-31",
    title: "模拟纳税申报",
    tags: ["期末", "税费"],
    difficulty: 1,
    description: "根据本月已完成的账务处理，进行模拟纳税申报。系统已自动计算应缴税额（增值税和企业所得税），请前往纳税申报页面核对并提交。",
    tip: "纳税申报是企业每月的法定义务。确认所有凭证已过账、期末结转已完成后，前往纳税申报页面核对各项税额后点击「提交申报」。",
    entries: [],
    documents: [
      { type: "text", label: "纳税申报提醒", docTitle: "1月纳税申报提醒", content: "申报期间：2026-01-31\n\n请前往纳税申报页面：\n1. 核对增值税申报表数据\n2. 核对企业所得税申报表数据\n3. 确认无误后点击「提交申报」\n\n纳税申报是企业每月必做的合规义务，请按时完成。", stampText: "财务专用章" }]},
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

/**
 * 获取指定月份的教学任务
 * @param {string} month - 月份 "01"~"12"
 * @returns {Array} 任务列表
 */
export function getTutorials(month) {
  return tutorials[month] || []
}

/**
 * 比对用户答案与标准答案
 * @param {Array} userEntries - 用户录入的分录
 * @param {Array} correctEntries - 标准答案分录
 * @param {Object} [cashFlowMap] - 现金流量ID到名称的映射，如 { 'cf-op': '销售商品收到现金' }
 * @returns {Array} 比对结果
 */
export function compareAnswers(userEntries, correctEntries, cashFlowMap) {
  const results = []

  // 检查条数
  if (userEntries.length !== correctEntries.length) {
    results.push({
      type: 'warning',
      message: `分录条数不一致：你录了 ${userEntries.length} 条，正确答案 ${correctEntries.length} 条`})
  }

  // 逐条比对（按顺序匹配）
  const minLen = Math.min(userEntries.length, correctEntries.length)
  for (let i = 0; i < minLen; i++) {
    const u = userEntries[i]
    const c = correctEntries[i]

    const subjectMatch = u.subjectCode === c.subjectCode
    const debitMatch = Math.abs(Number(u.debit) - Number(c.debit)) < 0.01
    const creditMatch = Math.abs(Number(u.credit) - Number(c.credit)) < 0.01
    // 现金流量分类比对（仅当正确答案有指定时才检查）
    const hasCashFlow = c.cashFlowItem && c.cashFlowItem !== ''
    const cashFlowMatch = !hasCashFlow || u.cashFlowItem === c.cashFlowItem

    if (subjectMatch && debitMatch && creditMatch && cashFlowMatch) {
      results.push({ type: 'success', message: `第${i + 1}条 ✔ 正确` })
    } else {
      const diff = []
      if (!subjectMatch) diff.push(`科目应为"${c.subjectCode}"`)
      if (!debitMatch) diff.push(`借方应为 ${c.debit}`)
      if (!creditMatch) diff.push(`贷方应为 ${c.credit}`)
      if (!cashFlowMatch) {
        const cfName = (cashFlowMap && cashFlowMap[c.cashFlowItem]) || c.cashFlowItem
        diff.push(`现金流量应为"${cfName}"`)
      }
      results.push({
        type: 'error',
        message: `第${i + 1}条 ✘ ${diff.join('，')}`})
    }
  }

  // 总体验证
  const allCorrect = results.every(r => r.type === 'success')
  if (allCorrect) {
    results.push({ type: 'success', message: '🎉 全部正确！可以提交审核了。' })
  }

  return results
}

export default tutorials
