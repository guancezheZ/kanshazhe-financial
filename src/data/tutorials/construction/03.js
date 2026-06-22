/**
 * 建筑业（建筑工程企业）3月教学任务
 *
 * 企业名称：鼎立建筑工程有限公司
 * 税制：一般纳税人（增值税9%）
 *
 * 3月主题：分包工程阶段性完工结算、收到第一批进度款、一季度增值税申报
 *
 * 知识点标签：工程合同、工程成本、分包管理、材料管理、机械使用、往来管理、资金管理、工资社保、税费、期末
 *
 * 会计准则依据：
 * - 《企业会计准则第14号——收入》（财会[2017]22号）
 * - 《企业会计准则第15号——建造合同》（财会[2006]3号）
 */

const tasks = [
  // ═════════════════════════════════════════════════════════════════════
  // 第一周：税费缴纳 + 材料采购（3月2日~3月6日）
  // ═════════════════════════════════════════════════════════════════════
  {
    date: '2026-03-02',
    role: 'accountant',
    title: '缴纳1-2月增值税差额',
    tags: ['税费'],
    difficulty: 2,
    description: '出纳根据税务申报表，通过银行转账缴纳1-2月增值税差额26,500元。1月销项45,000元+2月销项67,500元，抵扣进项56,000元及预缴30,000元后，应补缴26,500元。',
    tip: '增值税一般纳税人按月申报。应纳税额=销项税额-进项税额-预缴税额。出纳根据税务局出具的缴款书办理转账。',
    entries: [
      { subjectCode: '222101', debit: 26500, credit: 0, summary: '缴纳1-2月增值税差额', explanation: '应交税费-应交增值税借方减少，反映已缴纳的增值税税款。' },
      { subjectCode: '100201', debit: 0, credit: 26500, summary: '银行扣缴税款', explanation: '银行存款减少，完成增值税缴纳。' , cashFlowItem: 'cf-op4', cashFlowExplanation: '缴纳税费支出（配对科目222101），属于"支付的各项税费"——经营活动现金流出。'}],
    documents: [
      { type: 'bank', label: '电子缴税凭证', date: '2026-03-02', totalAmount: 26500, payer: '鼎立建筑工程有限公司', payeeName: '国家金库', content: '增值税缴纳', refNo: 'NS202603020001' }]},
  {
    date: '2026-03-02',
    role: 'accountant',
    title: '缴纳2月附加税费',
    tags: ['税费'],
    difficulty: 1,
    description: '缴纳2月城建税、教育费附加及地方教育附加。2月应交增值税37,500元，附加税合计4,500元（37,500×12%），已转账支付。',
    tip: '城建税7%+教育费附加3%+地方教育附加2%=12%，以增值税为计税基础。附加税随增值税同时申报缴纳。',
    entries: [
      { subjectCode: '222103', debit: 2625, credit: 0, summary: '缴纳城建税（37,500×7%）', explanation: '应交城建税减少，完税后负债清偿。' },
      { subjectCode: '222104', debit: 1875, credit: 0, summary: '缴纳教育费附加（37,500×5%）', explanation: '教育费附加3%（1,125元）+地方教育附加2%（750元），合计1,875元。' },
      { subjectCode: '100201', debit: 0, credit: 4500, summary: '银行扣缴附加税费', explanation: '银行存款减少4,500元。' , cashFlowItem: 'cf-op4', cashFlowExplanation: '缴纳税费支出（配对科目222103），属于"支付的各项税费"——经营活动现金流出。'}],
    documents: [
      { type: 'bank', label: '电子缴税凭证', date: '2026-03-02', totalAmount: 4500, payer: '鼎立建筑工程有限公司', payeeName: '国家金库', content: '附加税缴纳', refNo: 'NS202603020002' }]},
  {
    date: '2026-03-03',
    role: 'accountant',
    title: '缴纳2月社会保险费',
    tags: ['工资社保'],
    difficulty: 1,
    description: '出纳通过银行转账缴纳2月社会保险费。按上年度平均工资基数计算，单位承担部分合计36,250元，已扣缴。',
    tip: '社保费由单位承担部分和个人承担部分组成。出纳需在每月规定期限内完成缴纳，避免产生滞纳金。',
    entries: [
      { subjectCode: '221102', debit: 36250, credit: 0, summary: '缴纳2月社保费', explanation: '应付职工薪酬-社保减少，清偿对社保机构的负债。' },
      { subjectCode: '100201', debit: 0, credit: 36250, summary: '社保扣款', explanation: '银行存款减少，完成社保费用缴纳。' , cashFlowItem: 'cf-op3', cashFlowExplanation: '支付职工薪酬相关支出（配对科目221102），属于"支付给职工以及为职工支付的现金"——经营活动现金流出。'}],
    documents: [
      { type: 'bank', label: '社保缴费回单', date: '2026-03-03', totalAmount: 36250, payer: '鼎立建筑工程有限公司', payeeName: '社会保险事业管理中心', content: '2月社保费', refNo: 'SB202603030001' }]},
  {
    date: '2026-03-03',
    role: 'accountant',
    title: '向丙公司采购工程钢筋',
    tags: ['材料管理', '工程成本'],
    difficulty: 2,
    description: '向丙公司采购工程用钢筋一批，价款148,000元（不含税），增值税13%计19,240元，材料已验收入库并用于主体结构施工，款项未付。',
    tip: '建筑业材料采购直接计入"合同履约成本-材料成本"。增值税专用发票进项税额可抵扣销项税额。注意13%税率适用于货物采购。',
    entries: [
      { subjectCode: '540102', debit: 148000, credit: 0, summary: '购入钢筋一批', explanation: '钢筋用于办公楼主体结构施工，材料成本直接归集至合同履约成本。' },
      { subjectCode: '222101', debit: 19240, credit: 0, summary: '增值税进项税额（148,000×13%）', explanation: '取得增值税专用发票，进项税额19,240元可在当期销项税额中抵扣。' },
      { subjectCode: '220201', debit: 0, credit: 167240, summary: '应付丙公司材料款', explanation: '款项未付，形成对供应商丙公司的应付账款。' }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', date: '2026-03-03', region: '江苏省', invoiceNo: '3200260303', buyer: '鼎立建筑工程有限公司', seller: '丙公司', lineItems: [{ name: '螺纹钢HRB400', qty: 20, unit: '吨', price: 7400, amount: 148000 }], totalAmount: 167240 }]},
  {
    date: '2026-03-04',
    role: 'accountant',
    title: '支付丙公司钢筋材料款',
    tags: ['材料管理'],
    difficulty: 1,
    description: '出纳根据采购合同和审批单，通过网银向丙公司支付钢筋采购款167,240元。',
    tip: '出纳支付材料款时需核对合同金额、发票金额与审批单的一致性，确保三单匹配。',
    entries: [
      { subjectCode: '220201', debit: 167240, credit: 0, summary: '支付丙公司钢筋款', explanation: '应付账款减少，清偿对供应商的债务。' },
      { subjectCode: '100201', debit: 0, credit: 167240, summary: '银行转账支付', explanation: '银行存款减少，完成材料款支付。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目220201），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '网银转账回单', date: '2026-03-04', totalAmount: 167240, payer: '鼎立建筑工程有限公司', payeeName: '丙公司', content: '钢筋采购款', refNo: 'ZF202603040001' }]},
  {
    date: '2026-03-04',
    role: 'accountant',
    title: '租赁塔吊起重机',
    tags: ['机械使用', '工程成本'],
    difficulty: 1,
    description: '因主体结构施工需要，从租赁公司租入塔吊起重机一台，3月租金25,000元（含税），已转账支付。',
    tip: '施工机械租赁费直接计入"合同履约成本-机械使用费"。塔吊是高层建筑施工必备的大型机械。',
    entries: [
      { subjectCode: '540104', debit: 25000, credit: 0, summary: '塔吊起重机3月租金', explanation: '机械使用费是工程直接成本，计入合同履约成本。塔吊用于主体结构材料垂直运输。' },
      { subjectCode: '100201', debit: 0, credit: 25000, summary: '支付塔吊租赁费', explanation: '银行存款减少，支付租赁费用。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目540104），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '付款回单', date: '2026-03-04', totalAmount: 25000, payer: '鼎立建筑工程有限公司', payeeName: '宏远机械租赁有限公司', content: '塔吊租赁费', refNo: 'ZF202603040002' }]},
  {
    date: '2026-03-05',
    role: 'accountant',
    title: '提取备用金',
    tags: ['出纳'],
    difficulty: 1,
    description: '出纳开具现金支票，从工商银行提取备用金30,000元，用于日常零星开支。',
    tip: '提取备用金时填写现金支票，到银行柜台办理。备用金实行定额管理，用于日常小额支出。',
    entries: [
      { subjectCode: '1001', debit: 30000, credit: 0, summary: '提取备用金', explanation: '库存现金增加，用于日常零星开支。' },
      { subjectCode: '100201', debit: 0, credit: 30000, summary: '银行提现', explanation: '银行存款减少，提取现金。' }],
    documents: [
      { type: 'text', label: '现金支票存根', docTitle: '现金支票存根', content: '支票号码：XC20260305，收款人：鼎立建筑工程有限公司，金额：30,000元，用途：备用金。', stampText: '财务专用章' }]},
  {
    date: '2026-03-05',
    role: 'accountant',
    title: '采购工程水泥',
    tags: ['材料管理', '工程成本'],
    difficulty: 2,
    description: '向丁公司采购工程用水泥一批，价款82,000元（不含税），增值税13%计10,660元，材料已验收入库，款项未付。',
    tip: '水泥是建筑工程主要材料之一，直接计入合同履约成本-材料成本。注意保留质保书和合格证。',
    entries: [
      { subjectCode: '540102', debit: 82000, credit: 0, summary: '购入水泥一批', explanation: '水泥用于主体结构混凝土浇筑，材料成本计入合同履约成本。' },
      { subjectCode: '222101', debit: 10660, credit: 0, summary: '增值税进项税额（82,000×13%）', explanation: '取得增值税专用发票，进项税额10,660元可抵扣。' },
      { subjectCode: '220202', debit: 0, credit: 92660, summary: '应付丁公司材料款', explanation: '款项未付，形成对供应商丁公司的应付账款。' }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', date: '2026-03-05', region: '江苏省', invoiceNo: '3200260305', buyer: '鼎立建筑工程有限公司', seller: '丁公司', lineItems: [{ name: 'P.O42.5水泥', qty: 200, unit: '吨', price: 410, amount: 82000 }], totalAmount: 92660 }]},
  {
    date: '2026-03-06',
    role: 'accountant',
    title: '分包工程阶段性完工结算',
    tags: ['分包管理', '工程成本'],
    difficulty: 3,
    description: '大地基础工程有限公司承接的办公楼基础工程已全部完工并通过验收。分包合同总价800,000元（不含税），增值税9%计72,000元。此前已预付240,000元，现支付尾款632,000元，并取得全额增值税专用发票。',
    tip: '分包工程完工后，将预付账款转入合同履约成本。取得全额发票后确认进项税额。分包成本是建筑业成本的重要组成部分。',
    entries: [
      { subjectCode: '540103', debit: 800000, credit: 0, summary: '基础工程分包成本', explanation: '分包工程完工验收合格，全额分包成本800,000元计入合同履约成本-分包成本。' },
      { subjectCode: '222101', debit: 72000, credit: 0, summary: '增值税进项税额（800,000×9%）', explanation: '取得全额增值税专用发票，确认进项税额72,000元。' },
      { subjectCode: '1123', debit: 0, credit: 240000, summary: '冲销预付分包款', explanation: '此前预付的240,000元分包工程款冲销，预付账款减少。' },
      { subjectCode: '100201', debit: 0, credit: 632000, summary: '支付分包工程尾款', explanation: '支付尾款632,000元（800,000+72,000-240,000），银行存款减少。' , cashFlowItem: 'cf-op4', cashFlowExplanation: '缴纳税费支出（配对科目540103），属于"支付的各项税费"——经营活动现金流出。'}],
    documents: [
      { type: 'invoice', label: '增值税专用发票', date: '2026-03-06', region: '江苏省', invoiceNo: '3200260306', buyer: '鼎立建筑工程有限公司', seller: '大地基础工程有限公司', lineItems: [{ name: '办公楼基础工程施工', qty: 1, unit: '项', price: 800000, amount: 800000 }], totalAmount: 872000 },
      { type: 'text', label: '工程验收单', docTitle: '基础工程竣工验收确认书', content: '经鼎立建筑、大地基础及监理三方验收，办公楼基础工程施工质量合格，符合设计及规范要求，同意验收。', signature: '鼎立建筑（章）大地基础（章）监理单位（章）' }]},

  // ═════════════════════════════════════════════════════════════════════
  // 第二周：进度款 + 日常运营（3月9日~3月13日）
  // ═════════════════════════════════════════════════════════════════════
  {
    date: '2026-03-09',
    role: 'accountant',
    title: '确认3月工程进度并开票',
    tags: ['工程合同', '工程成本'],
    difficulty: 3,
    description: '恒达地产办公楼工程累计完工50%（1月10%+2月15%+3月25%），本期确认收入1,250,000元（不含税），增值税9%计112,500元。此前合同负债余额250,000元冲抵，差额1,112,500元形成应收账款。向恒达地产开具增值税专用发票。',
    tip: '完工百分比法确认收入。合同负债冲抵已收款部分，超出部分通过应收账款核算。建筑业增值税纳税义务在开票时产生。',
    entries: [
      { subjectCode: '2205', debit: 250000, credit: 0, summary: '合同负债冲抵进度款（剩余预收款）', explanation: '合同负债减少250,000元，将此前收到的预收款冲抵本次进度款。' },
      { subjectCode: '112201', debit: 1112500, credit: 0, summary: '应收恒达地产进度款', explanation: '应收账款增加1,112,500元，为超出预收款部分的进度款及增值税。' },
      { subjectCode: '6001', debit: 0, credit: 1250000, summary: '确认主营业务收入（不含税）', explanation: '按完工百分比法确认本期工程收入1,250,000元。累计确认收入2,500,000元（合同总额50%）。' },
      { subjectCode: '222101', debit: 0, credit: 112500, summary: '增值税销项税额（1,250,000×9%）', explanation: '开票产生增值税纳税义务，销项税额112,500元。' }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', date: '2026-03-09', region: '江苏省', invoiceNo: '3200260309', buyer: '恒达地产有限公司', seller: '鼎立建筑工程有限公司', lineItems: [{ name: '办公楼建设工程进度款（第三期）', qty: 1, unit: '项', price: 1250000, amount: 1250000 }], totalAmount: 1362500 },
      { type: 'text', label: '工程进度确认单', docTitle: '工程产值确认单（2026年3月）', content: '截至3月底，办公楼工程累计完成产值2,500,000元（合同总价5,000,000元的50%）。本期完成产值1,250,000元。经甲方及监理确认。', signature: '恒达地产（章）监理单位（章）鼎立建筑（章）' }]},
  {
    date: '2026-03-09',
    role: 'accountant',
    title: '收到工程进度款',
    tags: ['往来管理'],
    difficulty: 1,
    description: '恒达地产支付3月工程进度款1,112,500元，已到账工商银行账户。出纳确认收款并登记银行存款日记账。',
    tip: '出纳收到客户款项后，应及时与销售/工程部门核对，确保与开票金额一致。登记日记账并通知会计。',
    entries: [
      { subjectCode: '100201', debit: 1112500, credit: 0, summary: '收到恒达地产进度款', explanation: '银行存款增加，客户支付工程进度款。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目112201），属于经营活动现金流入——主营业务产生的现金收入。'},
      { subjectCode: '112201', debit: 0, credit: 1112500, summary: '冲销应收账款', explanation: '应收账款减少，客户付款结清应收款项。' }],
    documents: [
      { type: 'bank', label: '银行收款回单', date: '2026-03-09', totalAmount: 1112500, payer: '恒达地产有限公司', payeeName: '鼎立建筑工程有限公司', content: '办公楼工程进度款', refNo: 'HD202603090001' }]},
  {
    date: '2026-03-10',
    role: 'accountant',
    title: '支付水泥材料款',
    tags: ['材料管理'],
    difficulty: 1,
    description: '出纳根据审批单，通过网银支付丁公司水泥采购款92,660元。',
    tip: '材料款支付需在合同约定的账期内完成，避免违约。出纳应做好付款排期。',
    entries: [
      { subjectCode: '220202', debit: 92660, credit: 0, summary: '支付丁公司水泥款', explanation: '应付账款减少，清偿对丁公司的债务。' },
      { subjectCode: '100201', debit: 0, credit: 92660, summary: '银行转账支付', explanation: '银行存款减少，支付材料款。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目220202），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '网银转账回单', date: '2026-03-10', totalAmount: 92660, payer: '鼎立建筑工程有限公司', payeeName: '丁公司', content: '水泥采购款', refNo: 'ZF202603100001' }]},
  {
    date: '2026-03-10',
    role: 'accountant',
    title: '采购砂石材料',
    tags: ['材料管理', '工程成本'],
    difficulty: 2,
    description: '向砂石供应商采购中砂和碎石一批，价款50,000元（不含税），增值税3%（简易计税）计1,500元，材料已运抵现场验收，款项未付。',
    tip: '砂石等建筑地材通常由小规模纳税人供应，适用3%征收率。虽税率较低，但进项税额仍可抵扣。',
    entries: [
      { subjectCode: '540102', debit: 50000, credit: 0, summary: '购入砂石材料', explanation: '砂石用于混凝土及砌筑工程，材料成本计入合同履约成本。' },
      { subjectCode: '222101', debit: 1500, credit: 0, summary: '增值税进项税额（50,000×3%）', explanation: '取得增值税专用发票，进项税额1,500元可抵扣。小规模纳税人适用3%征收率。' },
      { subjectCode: '220201', debit: 0, credit: 51500, summary: '应付砂石材料款', explanation: '款项未付，形成对供应商的应付账款。' }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', date: '2026-03-10', region: '江苏省', invoiceNo: '3200260310', buyer: '鼎立建筑工程有限公司', seller: '鑫鑫砂石经营部', lineItems: [{ name: '中砂', qty: 100, unit: '立方米', price: 300, amount: 30000 }, { name: '碎石', qty: 80, unit: '立方米', price: 250, amount: 20000 }], totalAmount: 51500 }]},
  {
    date: '2026-03-11',
    role: 'accountant',
    title: '支付砂石材料款',
    tags: ['材料管理'],
    difficulty: 1,
    description: '出纳通过网银支付鑫鑫砂石经营部材料款51,500元。',
    tip: '小额材料款应及时结清，维护良好的供应商关系。',
    entries: [
      { subjectCode: '220201', debit: 51500, credit: 0, summary: '支付砂石材料款', explanation: '应付账款减少，清偿对砂石供应商的债务。' },
      { subjectCode: '100201', debit: 0, credit: 51500, summary: '银行转账支付', explanation: '银行存款减少51,500元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目220201），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '网银转账回单', date: '2026-03-11', totalAmount: 51500, payer: '鼎立建筑工程有限公司', payeeName: '鑫鑫砂石经营部', content: '砂石材料款', refNo: 'ZF202603110001' }]},
  {
    date: '2026-03-11',
    role: 'accountant',
    title: '购买安全防护用品',
    tags: ['材料管理', '工程成本'],
    difficulty: 1,
    description: '项目部购买安全网、安全帽、防护栏等安全防护用品，价款20,000元（不含税），增值税13%计2,600元，已转账支付。',
    tip: '安全防护用品属于材料成本，计入合同履约成本-材料成本。安全生产费用是建筑企业的法定支出。',
    entries: [
      { subjectCode: '540102', debit: 20000, credit: 0, summary: '购入安全防护用品', explanation: '安全防护用品属于工程直接材料，计入合同履约成本-材料成本。' },
      { subjectCode: '222101', debit: 2600, credit: 0, summary: '增值税进项税额（20,000×13%）', explanation: '取得增值税专用发票，进项税额2,600元可抵扣。' },
      { subjectCode: '100201', debit: 0, credit: 22600, summary: '支付安全用品款', explanation: '银行存款减少，支付安全防护用品采购款。' , cashFlowItem: 'cf-op4', cashFlowExplanation: '缴纳税费支出（配对科目540102），属于"支付的各项税费"——经营活动现金流出。'}],
    documents: [
      { type: 'invoice', label: '增值税专用发票', date: '2026-03-11', region: '江苏省', invoiceNo: '3200260311', buyer: '鼎立建筑工程有限公司', seller: '安达安全设备有限公司', lineItems: [{ name: '安全网', qty: 100, unit: '张', price: 80, amount: 8000 }, { name: '安全帽', qty: 60, unit: '顶', price: 50, amount: 3000 }, { name: '防护栏', qty: 30, unit: '套', price: 300, amount: 9000 }], totalAmount: 22600 }]},
  {
    date: '2026-03-12',
    role: 'accountant',
    title: '摊销3月办公室租金',
    tags: ['期末'],
    difficulty: 1,
    description: '摊销本月办公用房租金20,000元。一季度预付租金60,000元，本月为最后一个月摊销。',
    tip: '预付账款需按月摊销。办公用房租金摊销计入管理费用。摊销完毕后预付账款余额为零。',
    entries: [
      { subjectCode: '660201', debit: 20000, credit: 0, summary: '摊销3月办公用房租金', explanation: '管理费用增加，本月应承担的办公室租金计入当期损益。' },
      { subjectCode: '1123', debit: 0, credit: 20000, summary: '冲减预付租金', explanation: '预付账款减少20,000元。一季度预付60,000元已全部摊销完毕。' }],
    documents: [
      { type: 'text', label: '费用摊销表', docTitle: '预付租金摊销计算表', content: '一季度房租60,000元，每月摊销20,000元，本月为最后一次摊销，预付账款余额为零。', signature: '财务部' }]},
  {
    date: '2026-03-12',
    role: 'accountant',
    title: '报销项目部差旅费',
    tags: ['工程成本'],
    difficulty: 1,
    description: '项目经理报销赴恒达地产现场协调工程进度发生的差旅费8,000元，其中交通费3,500元、住宿费3,000元、餐补1,500元，以现金支付。',
    tip: '项目部管理人员的差旅费属于"合同履约成本-其他直接费用"。工程项目直接相关的费用直接计入工程成本。',
    entries: [
      { subjectCode: '540105', debit: 8000, credit: 0, summary: '项目部差旅费', explanation: '工程管理人员现场协调发生的差旅费，属于其他直接费用，计入合同履约成本。' },
      { subjectCode: '1001', debit: 0, credit: 8000, summary: '现金支付差旅费', explanation: '库存现金减少，支付差旅报销款。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目540105），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '差旅费报销单', date: '2026-03-12', items: [{ label: '交通费（高铁+打车）', amount: 3500 }, { label: '住宿费（4天）', amount: 3000 }, { label: '出差补助（4天×375）', amount: 1500 }], totalAmount: 8000, stampText: '鼎立建筑工程有限公司财务专用章' }]},
  {
    date: '2026-03-13',
    role: 'accountant',
    title: '计提3月上半月职工薪酬',
    tags: ['工程成本', '工资社保'],
    difficulty: 2,
    description: '计提3月上半月职工工资。施工人员45,000元（上半月），项目部管理人员15,000元（上半月），公司管理人员12,500元（上半月）。合计72,500元。施工人员工资计入合同履约成本-人工成本，项目部管理人员计入间接费用，公司管理人员计入管理费用。',
    tip: '建筑企业工资按人员归属分别核算：直接施工人员→合同履约成本-人工成本，项目部管理→间接费用，公司行政管理→管理费用。正确区分直接影响工程成本核算的准确性。',
    entries: [
      { subjectCode: '540101', debit: 45000, credit: 0, summary: '施工人员上半月工资', explanation: '直接人工是工程成本核心部分，施工人员工资计入合同履约成本-人工成本。' },
      { subjectCode: '540106', debit: 15000, credit: 0, summary: '项目部管理人员上半月工资', explanation: '项目部管理人员工资属于间接费用，通过合同履约成本-间接费用归集。' },
      { subjectCode: '660201', debit: 12500, credit: 0, summary: '公司管理人员上半月工资', explanation: '公司行政管理人员工资计入管理费用，不计入工程成本。' },
      { subjectCode: '221101', debit: 0, credit: 72500, summary: '应付职工薪酬-工资', explanation: '应付职工薪酬增加，形成对职工的工资负债。' }],
    documents: [
      { type: 'text', label: '工资计提表', docTitle: '2026年3月上半月职工工资明细', content: '施工人员（15人）45,000元；项目部管理（5人）15,000元；公司管理（4人）12,500元。合计72,500元。', signature: '人力资源部' }]},
  {
    date: '2026-03-13',
    role: 'accountant',
    title: '支付日常办公费用',
    tags: ['费用管理'],
    difficulty: 1,
    description: '出纳支付本月办公用品费5,000元，通过银行转账支付。',
    tip: '日常办公费用金额较小，凭发票及审批单付款。计入管理费用-办公费。',
    entries: [
      { subjectCode: '660201', debit: 5000, credit: 0, summary: '公司办公费用', explanation: '管理费用增加，日常办公用品费用计入当期损益。' },
      { subjectCode: '100201', debit: 0, credit: 5000, summary: '支付办公费用', explanation: '银行存款减少5,000元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目660201），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'invoice', label: '增值税普通发票', date: '2026-03-13', region: '江苏省', invoiceNo: '3200260313', buyer: '鼎立建筑工程有限公司', seller: '得力办公用品店', lineItems: [{ name: '办公用品一批', qty: 1, price: 5000, amount: 5000 }], totalAmount: 5000 }]},

  // ═════════════════════════════════════════════════════════════════════
  // 第三周：成本归集 + 机械费用（3月16日~3月20日）
  // ═════════════════════════════════════════════════════════════════════
  {
    date: '2026-03-16',
    role: 'accountant',
    title: '支付挖掘机租赁费',
    tags: ['机械使用'],
    difficulty: 1,
    description: '出纳支付本月挖掘机租赁费30,000元，银行转账。挖掘机用于基础回填及场地平整。',
    tip: '大型施工机械租赁费是机械使用费的主要组成部分。出纳付款需附租赁合同和结算单。',
    entries: [
      { subjectCode: '540104', debit: 30000, credit: 0, summary: '挖掘机本月租赁费', explanation: '机械使用费计入合同履约成本-机械使用费。' },
      { subjectCode: '100201', debit: 0, credit: 30000, summary: '支付机械租赁费', explanation: '银行存款减少30,000元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目540104），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '付款回单', date: '2026-03-16', totalAmount: 30000, payer: '鼎立建筑工程有限公司', payeeName: '宏远机械租赁有限公司', content: '挖掘机租赁费', refNo: 'ZF202603160001' }]},
  {
    date: '2026-03-16',
    role: 'accountant',
    title: '支付工程水电费',
    tags: ['工程成本'],
    difficulty: 1,
    description: '收到供电局和自来水公司账单，本月工程用水电费8,000元，通过银行转账支付。工程水电费属于间接费用。',
    tip: '施工现场的水电费属于工程间接费用，计入合同履约成本-间接费用，而非管理费用。',
    entries: [
      { subjectCode: '540106', debit: 8000, credit: 0, summary: '工程水电费', explanation: '施工现场水电费属于间接费用，计入合同履约成本-间接费用。' },
      { subjectCode: '100201', debit: 0, credit: 8000, summary: '支付水电费', explanation: '银行存款减少8,000元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目540106），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '水电费缴费通知', date: '2026-03-16', items: [{ label: '施工用电', amount: 6000 }, { label: '施工用水', amount: 2000 }], totalAmount: 8000, stampText: '国网江苏省电力公司 江苏省自来水公司' }]},
  {
    date: '2026-03-17',
    role: 'accountant',
    title: '计提3月固定资产折旧',
    tags: ['机械使用', '工程成本'],
    difficulty: 2,
    description: '计提本月固定资产折旧。运输车辆折旧5,000元（用于工程材料运输，计入机械使用费），办公设备折旧2,000元（计入管理费用）。合计7,000元。',
    tip: '固定资产折旧按用途分别核算：工程用固定资产折旧计入合同履约成本-机械使用费，管理用固定资产折旧计入管理费用。',
    entries: [
      { subjectCode: '540104', debit: 5000, credit: 0, summary: '运输车辆折旧（工程用）', explanation: '运输车辆用于工程材料运输，折旧费属于机械使用费，计入合同履约成本。' },
      { subjectCode: '660201', debit: 2000, credit: 0, summary: '办公设备折旧（管理用）', explanation: '办公设备用于行政管理，折旧费计入管理费用。' },
      { subjectCode: '1602', debit: 0, credit: 7000, summary: '累计折旧增加', explanation: '累计折旧增加7,000元，反映固定资产价值损耗。' }],
    documents: [
      { type: 'text', label: '折旧计算表', docTitle: '2026年3月固定资产折旧明细', content: '运输车辆原值300,000元，月折旧5,000元；办公设备原值120,000元，月折旧2,000元。合计7,000元。直线法折旧。', signature: '财务部' }]},
  {
    date: '2026-03-18',
    role: 'accountant',
    title: '计提3月下半月职工薪酬',
    tags: ['工程成本', '工资社保'],
    difficulty: 2,
    description: '计提3月下半月职工工资。施工人员45,000元，项目部管理人员15,000元，公司管理人员12,500元。合计72,500元。',
    tip: '下半月工资的科目归集与上半月相同。月度工资总额=上半月+下半月。',
    entries: [
      { subjectCode: '540101', debit: 45000, credit: 0, summary: '施工人员下半月工资', explanation: '直接人工成本继续归集至合同履约成本-人工成本，下半月施工人员工资45,000元。' },
      { subjectCode: '540106', debit: 15000, credit: 0, summary: '项目部管理人员下半月工资', explanation: '项目部管理人员下半月工资15,000元，计入间接费用。' },
      { subjectCode: '660201', debit: 12500, credit: 0, summary: '公司管理人员下半月工资', explanation: '公司管理人员下半月工资12,500元，计入管理费用。' },
      { subjectCode: '221101', debit: 0, credit: 72500, summary: '应付职工薪酬-工资', explanation: '应付职工薪酬增加，3月下半月工资合计72,500元。' }],
    documents: [
      { type: 'text', label: '工资计提表', docTitle: '2026年3月下半月职工工资明细', content: '施工人员45,000+项目部15,000+公司12,500=72,500元。', signature: '人力资源部' }]},
  {
    date: '2026-03-18',
    role: 'accountant',
    title: '报销公司管理人员差旅费',
    tags: ['费用管理'],
    difficulty: 1,
    description: '公司财务经理赴税务局办理业务发生差旅费4,500元，以现金报销。',
    tip: '公司行政管理人员差旅费计入管理费用，不同于项目部人员的工程成本归集。',
    entries: [
      { subjectCode: '660201', debit: 4500, credit: 0, summary: '管理人员差旅费', explanation: '公司管理人员差旅费计入管理费用-办公费。' },
      { subjectCode: '1001', debit: 0, credit: 4500, summary: '现金支付报销款', explanation: '库存现金减少4,500元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目660201），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '差旅费报销单', date: '2026-03-18', items: [{ label: '交通费', amount: 1500 }, { label: '住宿费', amount: 2000 }, { label: '餐补', amount: 1000 }], totalAmount: 4500, stampText: '鼎立建筑工程有限公司财务专用章' }]},
  {
    date: '2026-03-19',
    role: 'accountant',
    title: '计提3月社会保险费',
    tags: ['工资社保', '工程成本'],
    difficulty: 2,
    description: '计提3月单位应承担的社会保险费用。施工人员工资90,000×25%=22,500元，项目部管理人员30,000×25%=7,500元，公司管理人员25,000×25%=6,250元。合计36,250元。',
    tip: '社保费用按人员归属分别计入合同履约成本（施工人员）、间接费用（项目部管理）和管理费用（公司管理）。单位社保费率合计约25%（养老16%+医疗8%+失业0.5%+工伤0.2%+生育0.3%）。',
    entries: [
      { subjectCode: '540101', debit: 22500, credit: 0, summary: '施工人员社保（单位）', explanation: '施工人员社保费用计入合同履约成本-人工成本，随工资一同归集。' },
      { subjectCode: '540106', debit: 7500, credit: 0, summary: '项目部管理人员社保（单位）', explanation: '项目部管理人员社保计入间接费用。' },
      { subjectCode: '660201', debit: 6250, credit: 0, summary: '公司管理人员社保（单位）', explanation: '公司管理人员社保计入管理费用。' },
      { subjectCode: '221102', debit: 0, credit: 36250, summary: '应付职工薪酬-社保', explanation: '应付社保费用增加，单位承担部分合计36,250元。' }],
    documents: [
      { type: 'text', label: '社保计提表', docTitle: '2026年3月社会保险费用计提明细', content: '施工工资90,000×25%=22,500；项目工资30,000×25%=7,500；管理工资25,000×25%=6,250。合计36,250元。', signature: '人力资源部' }]},
  {
    date: '2026-03-19',
    role: 'accountant',
    title: '计提短期借款利息',
    tags: ['期末'],
    difficulty: 1,
    description: '计提3月短期借款利息。借款本金400,000元，年利率4.35%，月利息=400,000×4.35%÷12=1,450元。',
    tip: '短期借款利息按月计提，计入财务费用。借：财务费用，贷：应付利息。到期还本付息时冲销应付利息。',
    entries: [
      { subjectCode: '6603', debit: 1450, credit: 0, summary: '计提3月短期借款利息', explanation: '财务费用增加1,450元。借款利息属于融资成本，计入当期损益。' },
      { subjectCode: '2232', debit: 0, credit: 1450, summary: '应付利息增加', explanation: '应付利息增加1,450元。本月已发生但尚未支付的利息，负债增加。' }],
    documents: [
      { type: 'text', label: '利息计算表', docTitle: '2026年3月借款利息计提明细', content: '短期借款400,000元，年利率4.35%，月利息=400,000×4.35%÷12=1,450元。', signature: '财务部' }]},
  // ═════════════════════════════════════════════════════════════════════
  // 第四周：季度税务 + 期末结转（3月23日~3月27日）
  // ═════════════════════════════════════════════════════════════════════
  {
    date: '2026-03-23',
    role: 'accountant',
    title: '计算一季度应交增值税',
    tags: ['税费', '期末'],
    difficulty: 3,
    description: '计算3月及一季度应交增值税。3月销项税额112,500元，3月进项税额合计106,000元（钢筋19,240+水泥10,660+砂石1,500+安全2,600+分包72,000），应交增值税=112,500-106,000=6,500元。一季度累计应交增值税（1月已缴30,000元预缴+2月已缴26,500元补缴+3月6,500元）整体平衡。',
    tip: '增值税=当期销项税额-当期进项税额。进项税额需取得合规增值税专用发票方可抵扣。简易计税项目（如砂石3%）的进项也可抵扣。',
    entries: [
      { subjectCode: '6403', debit: 455, credit: 0, summary: '计提城建税（6,500×7%）', explanation: '税金及附加增加，城建税以应交增值税为计税基础，税率7%。' },
      { subjectCode: '6403', debit: 195, credit: 0, summary: '计提教育费附加（6,500×3%）', explanation: '税金及附加增加，教育费附加税率3%。' },
      { subjectCode: '6403', debit: 130, credit: 0, summary: '计提地方教育附加（6,500×2%）', explanation: '税金及附加增加，地方教育附加税率2%。' },
      { subjectCode: '222103', debit: 0, credit: 455, summary: '应交城建税', explanation: '应交城建税增加455元。' },
      { subjectCode: '222104', debit: 0, credit: 325, summary: '应交教育费附加（含地方）', explanation: '应交教育费附加195元+地方教育附加130元=325元。' }],
    documents: [
      { type: 'text', label: '增值税及附加税计算表', docTitle: '2026年3月增值税及附加税计算表', content: '销项税额112,500-进项税额106,000=应交增值税6,500元。附加税合计780元（城建税455+教育费附加195+地方教育附加130）。一季度累计应交增值税约33,000元（已缴56,500+本月6,500）。', signature: '财务部' }]},
  {
    date: '2026-03-24',
    role: 'accountant',
    title: '计提一季度企业所得税',
    tags: ['税费', '期末'],
    difficulty: 3,
    description: '计提3月企业所得税。3月主营业务收入1,250,000元，成本费用合计1,130,180元（成本转移1,065,000+管理费用62,750+财务费用1,650+税金及附加780），利润总额119,820元。所得税=119,820×25%=29,955元。一季度累计所得税约66,688元（1月11,225+2月25,508+3月29,955）。',
    tip: '企业所得税按季度预缴，年度汇算清缴。季度预缴按当期实际利润额计算。借：所得税费用，贷：应交税费-应交所得税。',
    entries: [
      { subjectCode: '6801', debit: 29955, credit: 0, summary: '计提3月所得税（119,820×25%）', explanation: '所得税费用增加29,955元。按利润总额的25%计提当期所得税费用。' },
      { subjectCode: '222102', debit: 0, credit: 29955, summary: '应交企业所得税', explanation: '应交税费-应交所得税增加，形成对税务局的负债。' }],
    documents: [
      { type: 'text', label: '所得税计算表', docTitle: '2026年3月企业所得税计提明细', content: '利润总额119,820元，所得税率25%，本月所得税29,955元。一季度累计利润约267,600元，累计所得税约66,900元。', signature: '财务部' }]},
  {
    date: '2026-03-24',
    role: 'accountant',
    title: '月末结转合同履约成本',
    tags: ['工程成本', '期末'],
    difficulty: 3,
    description: '月末按完工百分比法结转本月已完工部分对应的合同履约成本至主营业务成本。本月合同履约成本累计发生额：人工112,500+材料300,000+分包800,000+机械60,000+其他8,000+间接45,500=1,326,000元。按50%累计完工进度对应成本比例，结转1,065,000元至主营业务成本，剩余261,000元作为未完工项目成本保留。',
    tip: '月末按完工百分比法结转合同履约成本至主营业务成本。已确认收入对应的成本需同步结转，实现收入与成本的配比。未完工部分的成本保留在合同履约成本科目。',
    entries: [
      { subjectCode: '6401', debit: 1065000, credit: 0, summary: '结转主营业务成本', explanation: '按完工百分比法结转已完工部分对应的合同履约成本至主营业务成本。本月结转1,065,000元。' },
      { subjectCode: '540101', debit: 0, credit: 90000, summary: '结转人工成本', explanation: '结转人工成本90,000元至主营业务成本，剩余22,500元保留在合同履约成本。' },
      { subjectCode: '540102', debit: 0, credit: 210000, summary: '结转材料成本', explanation: '结转材料成本210,000元，剩余90,000元为已购入但尚未用于本期进度的材料。' },
      { subjectCode: '540103', debit: 0, credit: 660000, summary: '结转分包成本', explanation: '结转分包成本660,000元。基础工程虽已完工，但根据完工进度比例，660,000元对应本期进度。' },
      { subjectCode: '540104', debit: 0, credit: 55000, summary: '结转机械使用费', explanation: '结转机械使用费55,000元（租赁费50,000+折旧5,000），剩余5,000元保留。' },
      { subjectCode: '540105', debit: 0, credit: 8000, summary: '结转其他直接费用', explanation: '结转其他直接费用8,000元（差旅费），全部转出。' },
      { subjectCode: '540106', debit: 0, credit: 42000, summary: '结转间接费用', explanation: '结转间接费用42,000元（管理工资30,000+水电8,000+社保部分），剩余3,500元保留。' }],
    documents: [
      { type: 'text', label: '成本结转计算表', docTitle: '2026年3月合同履约成本结转明细', content: '本月合同履约成本发生1,326,000元，结转1,065,000元至主营业务成本，剩余261,000元结转下期。累计已结转成本约1,950,000元（1月355,000+2月530,000+3月1,065,000）。', signature: '财务部' }]},
  {
    date: '2026-03-25',
    title: '现金盘点',
    tags: ['期末'],
    difficulty: 1,
    description: '月末对库存现金进行盘点。期初余额16,800元，本月收入提取备用金30,000元，支出差旅费8,000元+差旅报销4,500元=12,500元，账面余额34,300元。经盘点实存34,300元，账实相符。',
    tip: '出纳每月末必须进行现金盘点并编制盘点表。盘点时需有财务人员在旁监盘，双方签字确认。',
    role: 'cashier',
    entries: [],
    documents: [
      { type: 'text', label: '现金盘点表', docTitle: '2026年3月库存现金盘点表', content: '账面余额34,300元，实存金额34,300元，盘点结果：账实相符。', signature: '出纳：刘出纳 监盘人：赵会计' }]},
  {
    date: '2026-03-25',
    title: '银行对账单核对',
    tags: ['期末'],
    difficulty: 1,
    description: '收到工商银行3月份对账单，与银行存款日记账逐笔核对。编制银行存款余额调节表，确认无未达账项。',
    tip: '银行对账是出纳月末重要工作。如有未达账项需编制余额调节表，确保企业账面余额与银行对账单调节一致。',
    role: 'cashier',
    entries: [],
    documents: [
      { type: 'text', label: '银行对账单', docTitle: '中国工商银行对账单（2026年3月）', content: '3月对账单显示：期初余额约7,130,750元，本期收入1,112,500元，支出合计1,076,450元，期末余额约7,166,800元。核对一致。', stampText: '中国工商银行 业务专用章' }]},
  {
    date: '2026-03-26',
    role: 'accountant',
    title: '月末结转损益类科目',
    tags: ['期末'],
    difficulty: 3,
    description: '将3月损益类科目余额结转至本年利润。收入：主营业务收入1,250,000元。成本费用：主营业务成本1,065,000元+管理费用62,750元+财务费用1,650元+税金及附加780元=1,130,180元。利润总额=1,250,000-1,130,180=119,820元。',
    tip: '结转损益：收入类余额从借方转出至本年利润贷方；成本费用类余额从贷方转出至本年利润借方。结转后损益类科目余额为零。',
    entries: [
      { subjectCode: '6001', debit: 1250000, credit: 0, summary: '结转主营业务收入', explanation: '主营业务收入科目余额转出，结转至本年利润。' },
      { subjectCode: '6401', debit: 0, credit: 1065000, summary: '结转主营业务成本', explanation: '主营业务成本1,065,000元结转至本年利润，科目余额结平。' },
      { subjectCode: '6403', debit: 0, credit: 780, summary: '结转税金及附加', explanation: '税金及附加780元结转至本年利润，科目余额结平。' },
      { subjectCode: '660201', debit: 0, credit: 65250, summary: '结转管理费用', explanation: '管理费用62,750元结转至本年利润，科目余额结平。' },
      { subjectCode: '6603', debit: 0, credit: 2130, summary: '结转财务费用', explanation: '财务费用1,650元结转至本年利润，科目余额结平。' },
      { subjectCode: '4103', debit: 0, credit: 116840, summary: '成本费用转入本年利润', explanation: '本年利润减少，成本费用合计1,130,180元结转至本年利润借方。' }
    ],
    documents: [
      { type: 'text', label: '损益结转计算表', docTitle: '2026年3月损益结转明细', content: '收入1,250,000-成本费用1,130,180=利润总额119,820元。一季度累计利润总额≈267,600元。', signature: '财务部' }]},
  {
    date: '2026-03-26',
    role: 'accountant',
    title: '结转所得税费用',
    tags: ['税费', '期末'],
    difficulty: 2,
    description: '将本月所得税费用29,955元结转至本年利润。结转后所得税费用科目余额为零，本年利润反映税后净利润。',
    tip: '所得税费用作为损益类科目，月末需结转至本年利润。净利润=利润总额-所得税费用。',
    entries: [
      { subjectCode: '4103', debit: 29955, credit: 0, summary: '所得税费用转入本年利润', explanation: '本年利润减少29,955元，反映所得税费用对利润的冲减。' },
      { subjectCode: '6801', debit: 0, credit: 29955, summary: '结转所得税费用', explanation: '所得税费用科目余额结平。' }],
    documents: [
      { type: 'text', label: '所得税结转表', docTitle: '2026年3月所得税费用结转', content: '所得税费用29,955元结转至本年利润。本月净利润=119,820-29,955=89,865元。', signature: '财务部' }]},
  {
    date: '2026-03-27',
    role: 'accountant',
    title: '结转净利润至未分配利润',
    tags: ['期末'],
    difficulty: 2,
    description: '将3月净利润89,865元从本年利润结转至利润分配-未分配利润。结转后本年利润科目余额为零。',
    tip: '月末将本年利润余额（净利润）结转至利润分配-未分配利润。借：本年利润，贷：利润分配-未分配利润。',
    entries: [
      { subjectCode: '4103', debit: 89865, credit: 0, summary: '本年利润转出', explanation: '本年利润减少，将本月净利润转出至利润分配。' },
      { subjectCode: '410401', debit: 0, credit: 89865, summary: '未分配利润增加', explanation: '未分配利润增加89,865元，所有者权益增加。' }],
    documents: [
      { type: 'text', label: '利润结转表', docTitle: '2026年3月净利润结转明细', content: '本月净利润89,865元结转至未分配利润。一季度累计净利润约173,540元。', signature: '财务部' }]},
  {
    date: '2026-03-27',
    role: 'accountant',
    title: '提取盈余公积',
    tags: ['期末'],
    difficulty: 2,
    description: '按一季度净利润的10%提取法定盈余公积。一季度净利润约173,540元（1月33,675+2月约50,000+3月89,865），提取17,354元。',
    tip: '法定盈余公积按净利润的10%提取，累计达到注册资本50%时可不再提取。盈余公积用于弥补亏损或转增资本。',
    entries: [
      { subjectCode: '410401', debit: 17354, credit: 0, summary: '提取法定盈余公积', explanation: '未分配利润减少17,354元，用于提取盈余公积。' },
      { subjectCode: '4101', debit: 0, credit: 17354, summary: '法定盈余公积增加', explanation: '盈余公积增加17,354元，所有者权益内部结构调整。' }],
    documents: [
      { type: 'text', label: '利润分配表', docTitle: '2026年一季度利润分配计算表', content: '一季度净利润约173,540元，按10%提取法定盈余公积17,354元。', signature: '财务部' }]},
  {
    date: '2026-03-31',
    title: '一季度票据整理归档',
    tags: ['期末'],
    difficulty: 1,
    description: '整理一季度所有收付款凭证、银行回单、发票、合同等财务票据，按日期顺序编号装订归档，编制归档清册。',
    tip: '出纳需按月、按季度整理保管好票据凭证。票据归档是财务档案管理的基础工作，确保票据完整、排序正确。',
    role: 'cashier',
    entries: [],
    documents: [
      { type: 'text', label: '票据归档清册', docTitle: '2026年一季度财务票据归档登记', content: '银行回单25份，付款审批单18份，增值税发票12份，合同3份，其他票据8份，合计66份已装订归档。', signature: '出纳：刘出纳 财务主管：赵会计' }]},
  {
    date: '2026-03-31',
    title: '季度银行存款余额确认',
    tags: ['期末'],
    difficulty: 1,
    description: '确认一季度末银行存款余额，编制资金变动汇总表。一季度资金收支汇总：期初余额400,000元，总收入8,112,500元，总支出现约1,345,700元，期末余额约7,166,800元。',
    tip: '季度末出纳需编制资金报告，汇总季度资金收支及结余情况，报送财务主管。',
    role: 'cashier',
    entries: [],
    documents: [
      { type: 'text', label: '资金变动汇总表', docTitle: '2026年一季度资金收支汇总', content: '期初余额400,000元（注册资本+借款后）。一季度收入合计8,112,500元（投资6,000,000+借款400,000+预收款1,500,000+进度款1,112,500+其他）。支出合计约1,345,700元。期末余额约7,166,800元。', signature: '出纳：刘出纳' }]},

  {
    date: '2026-03-15',
    role: 'accountant',
    title: '支付日常办公费用',
    tags: ['费用管理'],
    difficulty: 1,
    description: '支付本月日常办公用品采购费2,500元，已转账支付。',
    tip: '日常办公费计入管理费用。',
    entries: [
      { subjectCode: '660201', debit: 2500, credit: 0, summary: '办公用品费', explanation: '办公用品费计入管理费用。' },
      { subjectCode: '100201', debit: 0, credit: 2500, summary: '支付办公费', explanation: '银行存款减少2,500元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目660201），属于"支付其他与经营活动有关的现金"。'}],
    documents: [{ type: 'receipt', label: '办公用品发票', items: [{ label: '办公用品', amount: 2500 }], totalAmount: 2500, stampText: '收款单位财务章' }]},
  {
    date: '2026-03-20',
    title: '往来对账',
    tags: ['往来管理'],
    difficulty: 1,
    role: 'accountant',
    description: '月末与供应商核对材料采购往来账项。',
    tip: '月末往来对账确保双方账目一致。',
    entries: [
      { subjectCode: '220201', debit: 0, credit: 0, summary: '对账一致', explanation: '与供应商对账确认无误。' }],
    documents: [{ type: 'text', label: '对账确认单', docTitle: '往来对账确认单', content: '与供应商核对往来，确认全部款项已结清。', signature: '赵会计' }]},
  {
    date: '2026-03-25',
    role: 'accountant',
    title: '支付银行手续费',
    tags: ['费用管理'],
    difficulty: 1,
    description: '本月银行费用680元，已由银行自动扣划。',
    tip: '银行手续费计入财务费用。',
    entries: [
      { subjectCode: '6603', debit: 680, credit: 0, summary: '银行手续费', explanation: '银行手续费计入财务费用。' },
      { subjectCode: '100201', debit: 0, credit: 680, summary: '银行扣款', explanation: '银行存款减少680元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6603），属于"支付其他与经营活动有关的现金"。'}],
    documents: [{ type: 'bank', label: '银行扣款通知', totalAmount: 680, content: '银行手续费' }]},
  {
    date: "2026-03-31",
    role: 'accountant',
    title: "模拟纳税申报",
    tags: ["期末", "税费"],
    difficulty: 1,
    description: "根据本月已完成的账务处理，进行模拟纳税申报。系统已自动计算应缴税额（增值税和企业所得税），请前往纳税申报页面核对并提交。",
    tip: "纳税申报是企业每月的法定义务。确认所有凭证已过账、期末结转已完成后，前往纳税申报页面核对各项税额后点击「提交申报」。",
    entries: [],
    documents: [
      { type: "text", label: "纳税申报提醒", docTitle: "3月纳税申报提醒", content: "申报期间：2026-03-31\n\n请前往纳税申报页面：\n1. 核对增值税申报表数据\n2. 核对企业所得税申报表数据\n3. 确认无误后点击「提交申报」\n\n纳税申报是企业每月必做的合规义务，请按时完成。", stampText: "财务专用章" }]},
]

export default tasks
