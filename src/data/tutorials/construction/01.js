/**
 * 建筑业 - 1月教学任务（基础设施验证版）
 *
 * 企业名称：鼎立建筑工程有限公司
 * 税制：一般纳税人（增值税9%）
 *
 * 知识点标签：工程合同、工程成本、分包管理、材料管理、机械使用、往来管理、资金管理、工资社保、税费、期末
 */

const tasks = [
  // ═══════════════════════════════════════════════════════════════════
  // 企业设立
  // ═══════════════════════════════════════════════════════════════════
  {
    date: '2026-01-02',
    title: '投资者投入资本金',
    tags: ['资金管理'],
    difficulty: 1,
    role: 'accountant',
    description: '公司由三位股东共同出资设立，收到股东王建国、李建设、张工程投入的资本金共计600万元，存入工商银行基本账户。',
    tip: '收到投资者投入资本，借记"银行存款"，贷记"实收资本"。实收资本按约定比例记入各股东明细。',
    entries: [
      { subjectCode: '100201', debit: 6000000, credit: 0, summary: '收到股东投资款', explanation: '银行存款增加，借记银行存款-工商银行。实收资本增加，按1/3比例贷记各股东。' , cashFlowItem: 'cf-fin3', cashFlowExplanation: '吸收投资收到的现金（配对科目4001），属于筹资活动现金流入——企业通过权益融资获得资金。'},
      { subjectCode: '4001', debit: 0, credit: 6000000, summary: '实收资本增加', explanation: '实收资本是所有者权益科目，贷方记增加。三位股东各占1/3。' }],
    documents: [
      { type: 'bank', label: '银行回单', date: '2026-01-02', totalAmount: 6000000, payer: '王建国等三人', payeeName: '鼎立建筑工程有限公司', content: '投资款', refNo: 'HD202601020001' }]},
  {
    date: '2026-01-03',
    title: '向银行申请短期借款',
    tags: ['资金管理'],
    difficulty: 1,
    role: 'accountant',
    description: '为补充流动资金，向工商银行申请短期借款40万元，年利率4.35%，期限6个月，款项已到账。',
    tip: '收到短期借款，借记"银行存款"，贷记"短期借款"。短期借款属于流动负债。',
    entries: [
      { subjectCode: '100201', debit: 400000, credit: 0, summary: '收到短期借款', explanation: '银行存款增加400,000元。' , cashFlowItem: 'cf-fin', cashFlowExplanation: '借款收到的现金（配对科目2001），属于筹资活动现金流入——企业通过负债融资获得资金。'},
      { subjectCode: '2001', debit: 0, credit: 400000, summary: '短期借款增加', explanation: '短期借款增加，形成企业对银行的负债。' }],
    documents: [
      { type: 'bank', label: '银行回单', date: '2026-01-03', totalAmount: 400000, payer: '工商银行', payeeName: '鼎立建筑工程有限公司', content: '短期借款放款', refNo: 'DK202601030001' }]},
  {
    date: '2026-01-04',
    title: '预付一季度办公用房租金',
    tags: ['工程成本'],
    difficulty: 1,
    role: 'accountant',
    description: '预付第一季度办公用房租金60,000元，已转账支付。',
    tip: '预付租金借记"预付账款"，贷记"银行存款"。后续按月摊销计入管理费用。',
    entries: [
      { subjectCode: '1123', debit: 60000, credit: 0, summary: '预付第一季度办公租金', explanation: '预付账款是资产类科目，预付的租金先记入预付账款，后续分期摊销。' },
      { subjectCode: '100201', debit: 0, credit: 60000, summary: '支付预付租金', explanation: '银行存款减少60,000元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目1123），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '银行回单', date: '2026-01-04', totalAmount: 60000, payer: '鼎立建筑工程有限公司', payeeName: '鑫源租赁有限公司', content: '预付办公用房租金', refNo: 'ZF202601040001' }]},
  {
    date: '2026-01-05',
    title: '提取备用金',
    tags: ['出纳'],
    difficulty: 1,
    description: '出纳从银行提取备用金20,000元，用于日常零星开支。',
    tip: '提取备用金，借记"库存现金"，贷记"银行存款"。备用金用于日常小额支出。',
    entries: [
      { subjectCode: '1001', debit: 20000, credit: 0, summary: '提取备用金', explanation: '库存现金增加，用于日常零星开支。' },
      { subjectCode: '100201', debit: 0, credit: 20000, summary: '提取备用金', explanation: '银行存款减少20,000元。' }],
    documents: [
      { type: 'bank', label: '现金支票存根', date: '2026-01-05', totalAmount: 20000, payer: '鼎立建筑工程有限公司', payeeName: '鼎立建筑工程有限公司', content: '备用金', refNo: 'XJ0123456789' }]},

  // ═══════════════════════════════════════════════════════════════════
  // 合同签订与工程准备
  // ═══════════════════════════════════════════════════════════════════
  {
    date: '2026-01-06',
    title: '签订办公楼建设工程合同并收预付款',
    tags: ['工程合同'],
    difficulty: 1,
    role: 'accountant',
    description: '与甲方"恒达地产"签订办公楼建设工程合同，合同总价500万元（不含税），增值税9%。按合同约定收到预付工程款150万元（30%）。',
    tip: '收到预收工程款时，借记"银行存款"，贷记"合同负债"。合同负债是新收入准则下预收款项的核算科目。',
    entries: [
      { subjectCode: '100201', debit: 1500000, credit: 0, summary: '收到预付工程款（500万×30%）', explanation: '按合同约定收到30%预付款，银行存款增加1,500,000元。' , cashFlowItem: 'cf-op5', cashFlowExplanation: '其他经营活动现金流入（配对科目2205），属于"收到其他与经营活动有关的现金"。'},
      { subjectCode: '2205', debit: 0, credit: 1500000, summary: '合同负债-恒达地产', explanation: '合同负债核算已收款但尚未履约的义务。待工程进度确认后转入主营业务收入。' }],
    documents: [
      { type: 'bank', label: '银行回单', date: '2026-01-06', totalAmount: 1500000, payer: '恒达地产有限公司', payeeName: '鼎立建筑工程有限公司', content: '办公楼工程预付款', refNo: 'HD202601060001' }]},
  {
    date: '2026-01-07',
    title: '预缴增值税及附加税费',
    tags: ['税费'],
    difficulty: 2,
    role: 'accountant',
    description: '收到预收工程款后，按规定预缴增值税及附加税费。预收款1,500,000元，增值税预征率2%，应预缴增值税30,000元。城建税7%+教育费附加3%+地方教育附加2%，合计3,600元。',
    tip: '建筑业收到预收款时需预缴增值税。注意：一般计税项目按2%预征率预缴。预缴税款在申报时抵减应纳税额。',
    entries: [
      { subjectCode: '222101', debit: 30000, credit: 0, summary: '预缴增值税（150万×2%）', explanation: '建筑业预收款按2%预征率预缴增值税。应交增值税-借方反映预缴税额。' },
      { subjectCode: '222103', debit: 2100, credit: 0, summary: '城建税（30,000×7%）', explanation: '城建税按增值税额的7%计算。' },
      { subjectCode: '222104', debit: 1500, credit: 0, summary: '教育费附加3%+地方教育附加2%', explanation: '教育费附加3%（900元），地方教育附加2%（600元），合计1,500元。' },
      { subjectCode: '100201', debit: 0, credit: 33600, summary: '缴纳税费', explanation: '银行存款减少，支付增值税及附加税费。' , cashFlowItem: 'cf-op4', cashFlowExplanation: '缴纳税费支出（配对科目222101），属于"支付的各项税费"——经营活动现金流出。'}],
    documents: [
      { type: 'receipt', label: '电子缴税凭证', date: '2026-01-07', items: [{ label: '增值税（预征2%）', amount: 30000 }, { label: '城建税7%', amount: 2100 }, { label: '教育费附加3%', amount: 900 }, { label: '地方教育附加2%', amount: 600 }], totalAmount: 33600, stampText: '国家税务总局电子缴税专用章' }]},
  {
    date: '2026-01-08',
    title: '采购工程材料',
    tags: ['材料管理', '工程成本'],
    difficulty: 2,
    role: 'accountant',
    description: '向华强建材公司采购钢筋、水泥等工程材料，价款20万元（不含税），增值税13%，材料已验收入库，款项未付。建筑业采购材料直接记入"合同履约成本-材料成本"。',
    tip: '建筑业材料采购直接记入合同履约成本，不同于制造业先入原材料仓库。取得的增值税专用发票进项税额可抵扣。',
    entries: [
      { subjectCode: '540102', debit: 200000, credit: 0, summary: '购入钢筋、水泥等工程材料', explanation: '材料成本直接记入合同履约成本-材料成本。建筑业采购的材料直接用于工程施工，不经过原材料科目。' },
      { subjectCode: '222101', debit: 26000, credit: 0, summary: '增值税进项税额（20万×13%）', explanation: '取得增值税专用发票，进项税额26,000元可抵扣销项税额。' },
      { subjectCode: '220201', debit: 0, credit: 226000, summary: '应付账款-华强建材', explanation: '款项未付，形成对供应商的负债。' }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', date: '2026-01-08', region: '江苏省', invoiceNo: '3200260108', buyer: '鼎立建筑工程有限公司', seller: '华强建材有限公司', lineItems: [{ name: '钢筋', qty: 10, unit: '吨', price: 12000, amount: 120000 }, { name: '水泥', qty: 80, unit: '吨', price: 1000, amount: 80000 }], totalAmount: 226000 }]},
  {
    date: '2026-01-09',
    title: '支付材料采购款',
    tags: ['材料管理'],
    difficulty: 1,
    description: '出纳通过网银支付华强建材公司材料款226,000元。',
    tip: '支付应付账款，借记"应付账款"，贷记"银行存款"。出纳完成付款操作。',
    entries: [
      { subjectCode: '220201', debit: 226000, credit: 0, summary: '支付华强建材材料款', explanation: '应付账款减少，清偿对供应商的债务。' },
      { subjectCode: '100201', debit: 0, credit: 226000, summary: '支付材料款', explanation: '银行存款减少226,000元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目220201），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '网银转账回单', date: '2026-01-09', totalAmount: 226000, payer: '鼎立建筑工程有限公司', payeeName: '华强建材有限公司', content: '材料采购款', refNo: 'ZF202601090001' }]},

  // ═══════════════════════════════════════════════════════════════════
  // 分包工程
  // ═══════════════════════════════════════════════════════════════════
  {
    date: '2026-01-12',
    title: '预付分包工程款',
    tags: ['分包管理', '工程成本'],
    difficulty: 2,
    role: 'accountant',
    description: '将办公楼基础工程分包给"大地基础工程有限公司"，分包合同价款80万元（不含税），增值税9%。按合同约定预付分包工程款30%（240,000元）。',
    tip: '预付分包工程款，借记"预付账款"，贷记"银行存款"。待分包工程完工结算后，再转入合同履约成本-分包成本。',
    entries: [
      { subjectCode: '1123', debit: 240000, credit: 0, summary: '预付分包工程款（80万×30%）', explanation: '预付账款增加，待分包工程完工结算后转入工程成本。' },
      { subjectCode: '100201', debit: 0, credit: 240000, summary: '支付预付分包款', explanation: '银行存款减少240,000元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目1123），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '银行回单', date: '2026-01-12', totalAmount: 240000, payer: '鼎立建筑工程有限公司', payeeName: '大地基础工程有限公司', content: '预付分包工程款', refNo: 'ZF202601120001' }]},

  // ═══════════════════════════════════════════════════════════════════
  // 施工设备与人工
  // ═══════════════════════════════════════════════════════════════════
  {
    date: '2026-01-14',
    title: '租赁施工机械',
    tags: ['机械使用', '工程成本'],
    difficulty: 2,
    role: 'accountant',
    description: '从租赁公司租赁挖掘机一台，本月租金30,000元（含税），已转账支付。',
    tip: '施工机械租赁费直接记入"合同履约成本-机械使用费"。建筑业的施工机械费用是工程成本的重要组成部分。',
    entries: [
      { subjectCode: '540104', debit: 30000, credit: 0, summary: '挖掘机本月租金', explanation: '机械使用费是合同履约成本的直接费用，计入工程成本。' },
      { subjectCode: '100201', debit: 0, credit: 30000, summary: '支付机械租赁费', explanation: '银行存款减少30,000元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目540104），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '银行回单', date: '2026-01-14', totalAmount: 30000, payer: '鼎立建筑工程有限公司', payeeName: '鑫源租赁有限公司', content: '挖掘机租赁费', refNo: 'ZF202601140001' }]},
  {
    date: '2026-01-15',
    title: '计提本月固定资产折旧',
    tags: ['机械使用', '工程成本'],
    difficulty: 2,
    role: 'accountant',
    description: '公司拥有运输车辆和办公设备，本月应计提折旧：运输车辆折旧5,000元（用于工程材料运输），办公设备折旧2,000元。运输车辆折旧计入合同履约成本-机械使用费。',
    tip: '用于工程的固定资产折旧计入工程成本（合同履约成本-机械使用费），行政管理用的折旧计入管理费用。',
    entries: [
      { subjectCode: '540104', debit: 5000, credit: 0, summary: '运输车辆折旧（工程用）', explanation: '运输车辆用于工程材料运输，折旧费属于机械使用费。' },
      { subjectCode: '660201', debit: 2000, credit: 0, summary: '办公设备折旧（管理用）', explanation: '办公设备用于行政管理，折旧费计入管理费用。' },
      { subjectCode: '1602', debit: 0, credit: 7000, summary: '计提累计折旧', explanation: '累计折旧增加7,000元，反映固定资产价值损耗。' }],
    documents: [
      { type: 'text', label: '折旧计算表', docTitle: '固定资产折旧计算表', content: '直线法折旧。运输车辆月折旧5,000元；办公设备月折旧2,000元。合计7,000元。', signature: '赵会计' }]},
  {
    date: '2026-01-16',
    title: '计提本月职工薪酬',
    tags: ['工程成本', '工资社保'],
    difficulty: 2,
    role: 'accountant',
    description: '本月应发职工工资：施工人员80,000元，项目部管理人员30,000元，公司管理人员25,000元。合计135,000元。',
    tip: '直接施工人员工资记入"合同履约成本-人工成本"，项目部管理人员工资记入"合同履约成本-间接费用"，公司管理人员工资记入"管理费用"。',
    entries: [
      { subjectCode: '540101', debit: 80000, credit: 0, summary: '施工人员工资', explanation: '直接人工是工程成本的核心组成部分，计入合同履约成本-人工成本。' },
      { subjectCode: '540106', debit: 30000, credit: 0, summary: '项目部管理人员工资', explanation: '项目部管理人员工资属于间接费用，计入合同履约成本-间接费用。' },
      { subjectCode: '660201', debit: 25000, credit: 0, summary: '公司管理人员工资', explanation: '公司行政管理人员工资计入管理费用。' },
      { subjectCode: '221101', debit: 0, credit: 135000, summary: '应付职工薪酬-工资', explanation: '应付职工薪酬增加，形成对职工的负债。' }],
    documents: [
      { type: 'text', label: '工资表', docTitle: '2026年1月职工工资表', content: '施工人员（15人）80,000元；项目部管理人员（5人）30,000元；公司管理人员（4人）25,000元。合计135,000元。', signature: '王人事' }]},
  {
    date: '2026-01-17',
    title: '发放职工工资',
    tags: ['工资社保'],
    difficulty: 1,
    description: '出纳通过银行代发本月职工工资135,000元。',
    tip: '发放工资时，借记"应付职工薪酬"，贷记"银行存款"。',
    entries: [
      { subjectCode: '221101', debit: 135000, credit: 0, summary: '发放1月工资', explanation: '应付职工薪酬减少，清偿对职工的工资负债。' },
      { subjectCode: '100201', debit: 0, credit: 135000, summary: '银行代发工资', explanation: '银行存款减少135,000元。' , cashFlowItem: 'cf-op3', cashFlowExplanation: '支付职工薪酬相关支出（配对科目221101），属于"支付给职工以及为职工支付的现金"——经营活动现金流出。'}],
    documents: [
      { type: 'bank', label: '银行代发工资回单', date: '2026-01-17', totalAmount: 135000, payer: '鼎立建筑工程有限公司', payeeName: '公司全体员工', content: '1月份工资发放', refNo: 'GZ202601170001' }]},

  // ═══════════════════════════════════════════════════════════════════
  // 房屋与施工设备租赁费摊销
  // ═══════════════════════════════════════════════════════════════════
  {
    date: '2026-01-20',
    title: '摊销本月预付租金',
    tags: ['工程成本'],
    difficulty: 2,
    role: 'accountant',
    description: '本月摊销预付办公用房租金20,000元（预付6万÷3月），计入管理费用。',
    tip: '预付账款分期摊销。办公用房租金计入管理费用-租赁费。',
    entries: [
      { subjectCode: '660201', debit: 20000, credit: 0, summary: '摊销办公用房租金', explanation: '办公用房租金摊销计入管理费用。预付6万元÷3个月=2万元。' },
      { subjectCode: '1123', debit: 0, credit: 20000, summary: '冲减预付账款', explanation: '预付账款减少20,000元。' }],
    documents: [
      { type: 'text', label: '摊销计算表', docTitle: '预付费用摊销计算表', content: '办公用房租金60,000÷3=20,000元/月。', signature: '赵会计' }]},

  // ═══════════════════════════════════════════════════════════════════
  // 日常费用
  // ═══════════════════════════════════════════════════════════════════
  {
    date: '2026-01-22',
    title: '报销差旅费',
    tags: ['工程成本'],
    difficulty: 1,
    role: 'accountant',
    description: '项目经理陈经理报销出差费用3,200元，其中：交通费1,200元，住宿费1,500元，餐补500元，已用现金支付。',
    tip: '工程管理人员差旅费记入"合同履约成本-其他直接费用"。',
    entries: [
      { subjectCode: '540105', debit: 3200, credit: 0, summary: '工程管理人员差旅费', explanation: '项目管理人员出差费用属于与工程直接相关的其他直接费用。' },
      { subjectCode: '1001', debit: 0, credit: 3200, summary: '现金报销差旅费', explanation: '库存现金减少3,200元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目540105），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '差旅费报销单', date: '2026-01-22', items: [{ label: '交通费', amount: 1200 }, { label: '住宿费', amount: 1500 }, { label: '餐补', amount: 500 }], totalAmount: 3200, stampText: '鼎立建筑工程有限公司财务专用章' }]},
  {
    date: '2026-01-24',
    title: '支付办公费及水电费',
    tags: ['工程成本'],
    difficulty: 1,
    description: '支付本月办公费4,500元、水电费3,200元，合计7,700元，已转账支付。',
    tip: '办公费计入管理费用，水电费中工程部部分计入合同履约成本-间接费用。',
    entries: [
      { subjectCode: '660201', debit: 4500, credit: 0, summary: '公司办公费用', explanation: '行政管理部门办公费计入管理费用。' },
      { subjectCode: '540106', debit: 3200, credit: 0, summary: '工程部水电费', explanation: '工程部水电费属于间接费用，计入合同履约成本。' },
      { subjectCode: '100201', debit: 0, credit: 7700, summary: '支付办公费及水电费', explanation: '银行存款减少7,700元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目660201），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '缴费凭证', date: '2026-01-24', items: [{ label: '办公费', amount: 4500 }, { label: '水电费', amount: 3200 }], totalAmount: 7700, stampText: '收款单位财务专用章' }]},
  {
    date: '2026-01-25',
    title: '购入办公电脑',
    tags: ['工程成本'],
    difficulty: 1,
    role: 'accountant',
    description: '购入办公电脑3台，价款15,000元（不含税），增值税1,950元，款项已转账支付。',
    tip: '购入固定资产，借记"固定资产"和"应交税费-进项税额"，贷记"银行存款"。',
    entries: [
      { subjectCode: '160103', debit: 15000, credit: 0, summary: '购入办公电脑', explanation: '固定资产-办公设备增加，按成本入账。' },
      { subjectCode: '222101', debit: 1950, credit: 0, summary: '增值税进项税额', explanation: '取得增值税专用发票，进项税额可抵扣。' },
      { subjectCode: '100201', debit: 0, credit: 16950, summary: '支付电脑款', explanation: '银行存款减少16,950元。' , cashFlowItem: 'cf-inv', cashFlowExplanation: '购建固定资产/无形资产支出（配对科目160103），属于投资活动现金流出——资本性支出，区别于日常经营支出。'}],
    documents: [
      { type: 'invoice', label: '增值税专用发票', date: '2026-01-25', region: '江苏省', invoiceNo: '3200260125', buyer: '鼎立建筑工程有限公司', seller: '创新科技公司', lineItems: [{ name: '办公电脑', qty: 3, unit: '台', price: 5000, amount: 15000 }], totalAmount: 16950 }]},

  // ═══════════════════════════════════════════════════════════════════
  // 收入确认（完工百分比法）
  // ═══════════════════════════════════════════════════════════════════
  {
    date: '2026-01-26',
    title: '确认本月工程进度收入',
    tags: ['工程合同', '工程成本'],
    difficulty: 3,
    role: 'accountant',
    description: '本月办公楼基础工程完成10%。按完工百分比法确认工程收入500,000元（合同总价500万×10%）。同时结转合同履约成本355,000元（人工80,000+材料200,000+机械35,000+分包160,000+间接33,200+其他3,200-材料已购金额调整），差额145,000元为合同毛利。开具增值税发票，增值税销项税额45,000元。',
    tip: '完工百分比法：借"合同结算-价款结算"或"应收账款"，贷"主营业务收入"；同时结转成本：借"主营业务成本"，贷"合同履约成本"。增值税销项税额记贷方。此前收到的预收款从合同负债转入收入。',
    entries: [
      { subjectCode: '2205', debit: 500000, credit: 0, summary: '合同负债转入收入（预收款冲抵）', explanation: '此前收到的预收款1,500,000元，本次确认收入500,000元，冲减合同负债。' },
      { subjectCode: '222101', debit: 0, credit: 45000, summary: '增值税销项税额（50万×9%）', explanation: '确认增值税纳税义务，应交增值税-贷方反映销项税额。' },
      { subjectCode: '6001', debit: 0, credit: 455000, summary: '确认主营业务收入（不含税）', explanation: '确认工程收入500,000元扣除增值税45,000元后的不含税金额。' }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', date: '2026-01-26', region: '江苏省', invoiceNo: '3200260126', buyer: '恒达地产有限公司', seller: '鼎立建筑工程有限公司', lineItems: [{ name: '办公楼建设工程进度款', qty: 1, unit: '项', price: 500000, amount: 500000 }], totalAmount: 545000 },
      { type: 'text', label: '工程进度确认单', docTitle: '工程完工进度确认单', content: '基础工程完成10%，经监理验收合格。合同总收入5,000,000元，本月确认收入500,000元。', signature: '李监理 恒达地产 鼎立建筑' }]},

  // ═══════════════════════════════════════════════════════════════════
  // 期末处理
  // ═══════════════════════════════════════════════════════════════════
  {
    date: '2026-01-27',
    title: '月末结转合同履约成本',
    tags: ['工程成本', '期末'],
    difficulty: 2,
    role: 'accountant',
    description: '月末将本月发生的合同履约成本结转至主营业务成本。本月合同履约成本合计：人工80,000+材料200,000+分包160,000+机械35,000+间接33,200+其他3,200=511,400元。其中本月确认收入对应的完工进度10%应结转成本约355,000元（简化处理）。',
    tip: '月末按完工百分比法结转已完工部分对应的合同履约成本至主营业务成本。',
    entries: [
      { subjectCode: '6401', debit: 355000, credit: 0, summary: '结转主营业务成本', explanation: '按完工进度10%结转合同履约成本至主营业务成本。本月总成本511,400元×10%≈355,000元（取整）。' },
      { subjectCode: '5401', debit: 0, credit: 355000, summary: '结转合同履约成本', explanation: '合同履约成本减少，反映已完工部分成本转入主营业务成本。' }],
    documents: [
      { type: 'text', label: '成本结转计算表', docTitle: '合同履约成本结转计算表', content: '本月合同履约成本合计511,400元，按完工进度10%结转355,000元至主营业务成本。', signature: '赵会计' }]},
  {
    date: '2026-01-28',
    title: '结转本月损益类科目',
    tags: ['期末'],
    difficulty: 2,
    role: 'accountant',
    description: '月末结转损益类科目到本年利润。本月收入：主营业务收入455,000元；费用：主营业务成本355,000元、管理费用51,500元（折旧2,000+管理工资25,000+办公费4,500+摊销20,000）、税金及附加3,600元。',
    tip: '月末将各损益类科目余额转入本年利润。收入类余额转借方，费用类余额转贷方。',
    entries: [
      { subjectCode: '6001', debit: 455000, credit: 0, summary: '结转主营业务收入', explanation: '收入类科目余额转入本年利润，增加本年利润。' },
      { subjectCode: '4103', debit: 0, credit: 455000, summary: '收入转入本年利润', explanation: '本年利润增加455,000元。' },
      { subjectCode: '4103', debit: 410100, credit: 0, summary: '费用转入本年利润', explanation: '费用合计：355,000+51,500+3,600=410,100元。' },
      { subjectCode: '6401', debit: 0, credit: 355000, summary: '结转主营业务成本', explanation: '主营业务成本结转至本年利润。' },
      { subjectCode: '660201', debit: 0, credit: 51500, summary: '结转管理费用', explanation: '管理费用51,500元结转至本年利润。' },
      { subjectCode: '6403', debit: 0, credit: 3600, summary: '结转税金及附加', explanation: '税金及附加3,600元结转至本年利润。' }],
    documents: [
      { type: 'text', label: '结转计算表', docTitle: '月末损益结转计算表', content: '收入455,000元；费用410,100元；利润总额=455,000-410,100=44,900元。', signature: '赵会计' }]},
  {
    date: '2026-01-29',
    title: '计提并结转所得税',
    tags: ['税费', '期末'],
    difficulty: 2,
    role: 'accountant',
    description: '本月利润总额44,900元，按25%计提企业所得税11,225元。再将所得税费用结转至本年利润。净利润=44,900-11,225=33,675元。',
    tip: '计提所得税：借"所得税费用"贷"应交税费-应交所得税"。结转所得税：借"本年利润"贷"所得税费用"。',
    entries: [
      { subjectCode: '6801', debit: 11225, credit: 0, summary: '计提本月所得税（44,900×25%）', explanation: '所得税费用增加11,225元。' },
      { subjectCode: '222102', debit: 0, credit: 11225, summary: '应交企业所得税', explanation: '应交税费-应交所得税增加。' },
      { subjectCode: '4103', debit: 11225, credit: 0, summary: '所得税费用转入本年利润', explanation: '所得税费用结转至本年利润。' },
      { subjectCode: '6801', debit: 0, credit: 11225, summary: '结转所得税费用', explanation: '所得税费用科目余额结平。' }],
    documents: [
      { type: 'text', label: '所得税计算表', docTitle: '企业所得税计算表', content: '利润总额44,900元，所得税率25%，所得税11,225元，净利润33,675元。', signature: '赵会计' }]},
  {
    date: '2026-01-31',
    title: '结转净利润至未分配利润',
    tags: ['期末'],
    difficulty: 2,
    role: 'accountant',
    description: '将本月净利润33,675元从本年利润结转至利润分配-未分配利润。',
    tip: '月末将净利润结转至利润分配。借记"本年利润"，贷记"利润分配-未分配利润"。',
    entries: [
      { subjectCode: '4103', debit: 33675, credit: 0, summary: '本年利润转出', explanation: '本年利润减少，净利润转出。' },
      { subjectCode: '410401', debit: 0, credit: 33675, summary: '未分配利润增加', explanation: '未分配利润增加33,675元，所有者权益增加。' }],
    documents: [
      { type: 'text', label: '利润分配计算表', docTitle: '净利润结转计算表', content: '本月净利润33,675元结转至未分配利润。', signature: '赵会计' }]},

  // ═══════════════════════════════════════════════════════════════════
  // 出纳任务
  // ═══════════════════════════════════════════════════════════════════
  {
    date: '2026-01-31',
    title: '现金盘点',
    tags: ['出纳'],
    difficulty: 1,
    description: '月末出纳对库存现金进行盘点。本月收入（提取备用金）20,000元，支出（差旅费报销）3,200元，现金账面余额16,800元。经盘点实存16,800元，账实相符。',
    tip: '出纳应每月进行现金盘点，确保账实相符。',
    role: 'cashier',
    entries: [],
    documents: [
      { type: 'text', label: '现金盘点表', docTitle: '库存现金盘点表', content: '账面余额16,800元，实盘16,800元，账实相符。盘点人：刘出纳 监盘人：赵会计', signature: '刘出纳 赵会计' }]},
  {
    date: '2026-01-31',
    title: '银行存款余额核对',
    tags: ['期末'],
    difficulty: 1,
    description: '月末核对工商银行存款余额。核对银行对账单，编制余额调节表。',
    tip: '月末出纳需将银行存款日记账与银行对账单核对。',
    role: 'cashier',
    entries: [],
    documents: [
      { type: 'text', label: '银行对账单', docTitle: '2026年1月银行对账单', content: '本月收入合计：投资款6,000,000+短期借款400,000+预收款1,500,000=7,900,000元。支出合计：预付租金60,000+备用金20,000+预缴税费33,600+材料款226,000+分包款240,000+机械费30,000+工资135,000+办公水电7,700+电脑16,950=769,250元。月末余额7,130,750元。核对相符。', signature: '工商银行' }]},

  {
    date: '2026-01-11',
    title: '购买安全防护用品',
    tags: ['工程成本', '材料管理'],
    difficulty: 1,
    role: 'accountant',
    description: '购买安全帽、安全带等安全防护用品，价款8,000元，已用现金支付。',
    tip: '安全防护用品属于其他直接费用。',
    entries: [
      { subjectCode: '540105', debit: 8000, credit: 0, summary: '购买安全防护用品', explanation: '安全防护用品计入合同履约成本-其他直接费用。' },
      { subjectCode: '1001', debit: 0, credit: 8000, summary: '现金支付', explanation: '库存现金减少8,000元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目540105），属于"支付其他与经营活动有关的现金"。'}],
    documents: [{ type: 'receipt', label: '购物发票', items: [{ label: '安全防护用品', amount: 8000 }], totalAmount: 8000, stampText: '收款单位财务专用章' }]},
  {
    date: '2026-01-13',
    title: '支付工程保险费',
    tags: ['工程合同'],
    difficulty: 1,
    role: 'accountant',
    description: '为办公楼工程投保建筑工程一切险，支付保险费15,000元，已转账支付。',
    tip: '工程保险费属于其他直接费用。',
    entries: [
      { subjectCode: '540105', debit: 15000, credit: 0, summary: '支付工程保险费', explanation: '工程保险是直接费用，计入合同履约成本-其他直接费用。' },
      { subjectCode: '100201', debit: 0, credit: 15000, summary: '支付保险费', explanation: '银行存款减少15,000元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目540105），属于"支付其他与经营活动有关的现金"。'}],
    documents: [{ type: 'bank', label: '银行回单', totalAmount: 15000, payer: '鼎立建筑工程有限公司', payeeName: '平安保险公司', content: '建筑工程一切险保费', refNo: 'BX202601130001' }]},
  {
    date: '2026-01-14',
    title: '支付施工用水电费',
    tags: ['工程成本'],
    difficulty: 1,
    description: '支付本月施工用水电费12,000元，已转账支付。',
    tip: '施工用水电费属于间接费用。',
    entries: [
      { subjectCode: '540106', debit: 12000, credit: 0, summary: '施工用水电费', explanation: '工地水电费计入合同履约成本-间接费用。' },
      { subjectCode: '100201', debit: 0, credit: 12000, summary: '支付水电费', explanation: '银行存款减少12,000元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目540106），属于"支付其他与经营活动有关的现金"。'}],
    documents: [{ type: 'receipt', label: '水电费发票', items: [{ label: '施工用电', amount: 8000 }, { label: '施工用水', amount: 4000 }], totalAmount: 12000, stampText: '供电公司' }]},
  {
    date: '2026-01-18',
    title: '支付施工图纸设计费',
    tags: ['工程成本', '工程合同'],
    difficulty: 2,
    role: 'accountant',
    description: '支付工程设计院施工图纸设计费25,000元，已转账支付。',
    tip: '设计费属于其他直接费用。',
    entries: [
      { subjectCode: '540105', debit: 25000, credit: 0, summary: '支付施工图纸设计费', explanation: '设计费计入合同履约成本-其他直接费用。' },
      { subjectCode: '100201', debit: 0, credit: 25000, summary: '支付设计费', explanation: '银行存款减少25,000元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目540105），属于"支付其他与经营活动有关的现金"。'}],
    documents: [{ type: 'bank', label: '银行回单', totalAmount: 25000, payer: '鼎立建筑工程有限公司', payeeName: '省建筑设计院', content: '施工图纸设计费', refNo: 'SJ202601180001' }]},
  {
    date: '2026-01-19',
    title: '支付工程监理费',
    tags: ['工程合同', '往来管理'],
    difficulty: 1,
    role: 'accountant',
    description: '支付本月工程监理费10,000元，已转账支付。',
    tip: '监理费属于其他直接费用。',
    entries: [
      { subjectCode: '540105', debit: 10000, credit: 0, summary: '支付工程监理费', explanation: '监理费计入合同履约成本-其他直接费用。' },
      { subjectCode: '100201', debit: 0, credit: 10000, summary: '支付监理费', explanation: '银行存款减少10,000元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目540105），属于"支付其他与经营活动有关的现金"。'}],
    documents: [{ type: 'bank', label: '银行回单', totalAmount: 10000, payer: '鼎立建筑工程有限公司', payeeName: '工程监理有限公司', content: '1月份工程监理费', refNo: 'JL202601190001' }]},
  {
    date: '2026-01-23',
    title: '支付材料运输费',
    tags: ['材料管理', '工程成本'],
    difficulty: 1,
    description: '支付钢筋水泥等材料运输费5,000元，已用现金支付。',
    tip: '材料运输费计入合同履约成本-材料成本。',
    entries: [
      { subjectCode: '540102', debit: 5000, credit: 0, summary: '材料运输费', explanation: '材料运杂费计入合同履约成本。' },
      { subjectCode: '1001', debit: 0, credit: 5000, summary: '支付运输费', explanation: '库存现金减少5,000元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目540102），属于"支付其他与经营活动有关的现金"。'}],
    documents: [{ type: 'receipt', label: '运输发票', items: [{ label: '材料运输费', amount: 5000 }], totalAmount: 5000, stampText: '运输公司财务章' }]},
  {
    date: '2026-01-26',
    title: '往来款项核对',
    tags: ['往来管理'],
    difficulty: 2,
    role: 'accountant',
    description: '月末与华强建材公司核对材料采购往来账项，双方对账一致。',
    tip: '月末往来对账确保双方账目一致。',
    entries: [
      { subjectCode: '220201', debit: 0, credit: 0, summary: '往来对账一致', explanation: '与供应商对账确认无误。' }],
    documents: [{ type: 'text', label: '对账确认单', docTitle: '往来款项对账确认单', content: '与华强建材有限公司核对1月份往来，确认全部款项已结清。', signature: '赵会计' }]}]

export default tasks
