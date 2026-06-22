/**
 * 服务业（管理咨询/软件开发）2月教学任务
 *
 * 行业特征：无存货、无生产核算、人工成本为主、项目制核算
 * 企业类型：一般纳税人（增值税6%）
 * 企业名称：雲帆管理咨询有限公司
 *
 * 知识点标签：项目核算、收入确认、人工成本、费用管理、工资社保、税费、往来管理、资金管理、期末、出纳
 *
 * 会计准则依据：
 * - 《企业会计准则第14号——收入》（财会[2017]22号）
 */

const tasks = [
  // ═══════════════════════════════════════════
  // 第一周：期初事务 + 社保税务（2月2日~2月7日）
  // ═══════════════════════════════════════════
  {
    date: '2026-02-02',
    title: '缴纳上月增值税及附加税',
    tags: ['税费'],
    difficulty: 2,
    description: '申报缴纳1月增值税19,200元、城建税1,344元、教育费附加576元，合计21,120元，通过银行转账缴纳。',
    tip: '增值税及附加税应在次月申报期内缴纳。借：应交税费-各明细，贷：银行存款。注意区分不同税种。',
    entries: [
      { subjectCode: '222101', summary: '缴纳上月增值税', debit: 19200, credit: 0, explanation: '应交增值税减少记借方。缴纳增值税冲减应交税费。' },
      { subjectCode: '222103', summary: '缴纳上月城建税', debit: 1344, credit: 0, explanation: '应交城建税减少记借方。' },
      { subjectCode: '222104', summary: '缴纳上月教育费附加', debit: 576, credit: 0, explanation: '应交教育费附加减少记借方。' },
      { subjectCode: '100201', summary: '缴纳税款', debit: 0, credit: 21120, explanation: '银行存款减少记贷方。通过银行转账缴纳税款。' , cashFlowItem: 'cf-op4', cashFlowExplanation: '缴纳税费支出（配对科目222101），属于"支付的各项税费"——经营活动现金流出。'}],
    documents: [
      { type: 'bank', label: '银行付款回单', date: '2026-02-02', totalAmount: 21120, payer: '雲帆管理咨询有限公司', payeeName: '国家金库北京市分库', content: '纳税', refNo: 'FK202602020001' },
      { type: 'receipt', label: '完税证明', docTitle: '电子缴税付款凭证', items: [{ name: '增值税', amount: 19200 }, { name: '城建税', amount: 1344 }, { name: '教育费附加', amount: 576 }], totalAmount: 21120, stampText: '国家税务总局 电子印章' }]},
  {
    date: '2026-02-03',
    title: '缴纳上月社保费用',
    tags: ['工资社保'],
    difficulty: 1,
    description: '缴纳1月单位+个人社保费用。单位承担25,750元，个人承担部分(工资×10.5%)：58,000×10.5%=6,090元，合计31,840元，银行转账。',
    tip: '社保费包含单位部分(计入成本/费用)和个人部分(从工资中代扣)。缴纳时借：应付职工薪酬-社保（单位+个人），贷：银行存款。',
    entries: [
      { subjectCode: '221102', summary: '缴纳1月社保费', debit: 31840, credit: 0, explanation: '应付职工薪酬-社保减少记借方。缴纳后社保负债清空。' },
      { subjectCode: '100201', summary: '缴纳1月社保费', debit: 0, credit: 31840, explanation: '银行存款减少记贷方。银行转账支付社保费。' , cashFlowItem: 'cf-op3', cashFlowExplanation: '支付职工薪酬相关支出（配对科目221102），属于"支付给职工以及为职工支付的现金"——经营活动现金流出。'}],
    documents: [
      { type: 'bank', label: '银行付款回单', date: '2026-02-03', totalAmount: 31840, payer: '雲帆管理咨询有限公司', payeeName: '北京市社会保险基金管理中心', content: '社保缴纳', refNo: 'FK202602030001' },
      { type: 'receipt', label: '社保缴费单', docTitle: '2026年1月社会保险缴费通知', items: [{ name: '养老保险', amount: 18560 }, { name: '医疗保险', amount: 9280 }, { name: '失业保险', amount: 1160 }, { name: '工伤保险', amount: 580 }, { name: '生育保险', amount: 580 }, { name: '个人部分代扣', amount: 1680 }], totalAmount: 31840, stampText: '北京市社保中心' }]},
  {
    date: '2026-02-04',
    title: '发放1月工资（代扣个税）',
    tags: ['人工成本', '工资社保'],
    difficulty: 3,
    description: '发放1月工资。应发总额=项目人员58,000+管理人员45,000=103,000元。代扣个税3,090元（按工资薪金预扣率），实发99,910元，银行代发。',
    tip: '工资发放涉及多个科目：借：应付职工薪酬-工资（应发额），贷：银行存款（实发额）、应交税费-应交个人所得税（代扣个税）。',
    entries: [
      { subjectCode: '221101', summary: '发放1月工资-应发额', debit: 103000, credit: 0, explanation: '应付职工薪酬-工资减少记借方。冲销此前计提的应付工资。' },
      { subjectCode: '100201', summary: '发放1月工资-实发额', debit: 0, credit: 99910, explanation: '银行存款减少记贷方。银行代发工资至员工个人账户。' , cashFlowItem: 'cf-op3', cashFlowExplanation: '支付职工薪酬相关支出（配对科目221101），属于"支付给职工以及为职工支付的现金"——经营活动现金流出。'},
      { subjectCode: '222102', summary: '代扣个人所得税-工资薪金', debit: 0, credit: 3090, explanation: '应交所得税（个税）增加记贷方。企业代扣的员工个人所得税负债。' }],
    documents: [
      { type: 'bank', label: '银行付款回单', date: '2026-02-04', totalAmount: 99910, payer: '雲帆管理咨询有限公司', payeeName: '批量代发工资', content: '1月工资', refNo: 'FK202602040001' },
      { type: 'receipt', label: '工资发放明细', docTitle: '2026年1月工资发放汇总', items: [{ name: '应发工资', amount: 103000 }, { name: '代扣个税', amount: -3090 }, { name: '实发工资', amount: 99910 }], totalAmount: 99910, stampText: '雲帆管理咨询有限公司 财务专用章' }]},
  {
    date: '2026-02-05',
    title: '签订新管理咨询合同',
    tags: ['收入确认', '往来管理'],
    difficulty: 2,
    description: '公司与丙客户签订战略规划咨询合同，总额300,000元（不含税），增值税6%。丙客户预付40%作为定金，已到账。',
    tip: '收到预收款时：借银行存款，贷合同负债（不含税部分）、应交税费（增值税部分）。',
    entries: [
      { subjectCode: '100201', summary: '收取新咨询合同定金', debit: 127200, credit: 0, explanation: '银行存款增加记借方。预付40%=300,000×40%=120,000，增值税7,200。' , cashFlowItem: 'cf-op5', cashFlowExplanation: '其他经营活动现金流入（配对科目2205），属于"收到其他与经营活动有关的现金"。'},
      { subjectCode: '2205', summary: '收取新咨询合同定金', debit: 0, credit: 120000, explanation: '合同负债增加记贷方。收到预收款尚未履约。' },
      { subjectCode: '222101', summary: '收取新咨询合同定金-增值税', debit: 0, credit: 7200, explanation: '应交增值税-销项税额增加记贷方。' }],
    documents: [
      { type: 'bank', label: '银行回单', date: '2026-02-05', totalAmount: 127200, payer: '丙客户', payeeName: '雲帆管理咨询有限公司', content: '战略咨询项目定金', refNo: 'HD202602050001' },
      { type: 'text', label: '咨询合同', docTitle: '企业战略规划咨询合同', content: '雲帆管理咨询为丙客户提供三年战略规划咨询服务，总价300,000元（不含税），周期60天。付款：签约付40%，中期30%，终验30%。', signature: '双方盖章' }]},
  {
    date: '2026-02-06',
    title: '购买财务软件（无形资产）',
    tags: ['费用管理'],
    difficulty: 2,
    description: '公司购买正版财务软件一套，价值12,000元，通过银行转账支付，预计使用3年。',
    tip: '软件属于无形资产，按期摊销。购买时：借：无形资产，贷：银行存款。摊销时：借：管理费用，贷：累计摊销。',
    entries: [
      { subjectCode: '1701', summary: '购买财务软件', debit: 12000, credit: 0, explanation: '无形资产增加记借方。财务软件符合无形资产确认条件。' },
      { subjectCode: '100201', summary: '购买财务软件', debit: 0, credit: 12000, explanation: '银行存款减少记贷方。' , cashFlowItem: 'cf-inv', cashFlowExplanation: '购建固定资产/无形资产支出（配对科目1701），属于投资活动现金流出——资本性支出，区别于日常经营支出。'}],
    documents: [
      { type: 'invoice', label: '增值税发票', region: '北京市', invoiceNo: '1100234567', date: '2026-02-06', buyer: '雲帆管理咨询有限公司', seller: '正通软件有限公司', lineItems: [{ name: '财务管理系统V3.0', qty: 1, price: 12000, amount: 12000 }], totalAmount: 12000 }]},
  {
    date: '2026-02-07',
    title: '摊销1月办公室租金',
    tags: ['费用管理'],
    difficulty: 1,
    description: '摊销2月办公室租金20,000元（预付6个月中的第2个月）。',
    tip: '每月摊销预付租金。借：管理费用-办公费，贷：预付账款。',
    entries: [
      { subjectCode: '660201', summary: '摊销2月办公室租金', debit: 20000, credit: 0, explanation: '管理费用-办公费增加记借方。本月应摊销的租金。' },
      { subjectCode: '1123', summary: '摊销2月办公室租金', debit: 0, credit: 20000, explanation: '预付账款减少记贷方。预付租金逐月摊销。' }],
    documents: [
      { type: 'text', label: '费用摊销表', docTitle: '2026年2月租金摊销明细', content: '办公室预付租金第2次摊销，20,000元。剩余待摊：120,000-20,000=80,000元。', signature: '财务部' }]},

  // ═══════════════════════════════════════════
  // 第二周：项目执行 + 多业务线（2月9日~2月14日）
  // ═══════════════════════════════════════════
  {
    date: '2026-02-09',
    title: '计提2月项目组上半月工资',
    tags: ['项目核算', '人工成本'],
    difficulty: 2,
    description: '计提2月上半月项目人员工资。咨询组（甲客户+丙客户两个项目）4人共24,000元，开发组2人共22,000元，合计46,000元。',
    tip: '项目人员工资持续归集到劳务成本。借：劳务成本-人工成本，贷：应付职工薪酬-工资。',
    entries: [
      { subjectCode: '520101', summary: '计提项目组上半月工资', debit: 46000, credit: 0, explanation: '劳务成本-人工成本增加记借方。本月新增丙客户项目，项目人员增加。' },
      { subjectCode: '221101', summary: '计提项目组上半月工资', debit: 0, credit: 46000, explanation: '应付职工薪酬-工资增加记贷方。' }],
    documents: [
      { type: 'text', label: '工资计提表', docTitle: '2026年2月上半月项目工资明细', content: '咨询组4人各6,000=24,000（甲+丙两项目），开发组2人各11,000=22,000。', signature: '人力资源部' }]},
  {
    date: '2026-02-10',
    title: '丙客户咨询项目人员出差',
    tags: ['项目核算'],
    difficulty: 2,
    description: '丙客户项目组2人出差实地调研，预借差旅费6,000元（现金支付）。',
    tip: '项目差旅费先通过劳务成本归集。借：其他应收款，贷：库存现金。报销时再转入劳务成本。',
    entries: [
      { subjectCode: '1221', summary: '预借差旅费-丙项目', debit: 6000, credit: 0, explanation: '其他应收款增加记借方。员工预借差旅费。' },
      { subjectCode: '1001', summary: '预借差旅费-丙项目', debit: 0, credit: 6000, explanation: '库存现金减少记贷方。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目1221），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'text', label: '借款单', docTitle: '差旅费借款单', content: '丙项目2人赴客户现场调研，预借6,000元。', signature: '项目负责人 | 财务审批' }]},
  {
    date: '2026-02-11',
    title: '软件开发项目中期验收（确认收入）',
    tags: ['收入确认', '项目核算'],
    difficulty: 3,
    description: '乙客户ERP软件开发项目完成中期目标，按合同约定中期验收付40%，具备收入确认条件。确认收入160,000元（400,000×40%），开具发票并收款。此前已收启动资金120,000元。',
    tip: '时段法确认软件开发收入。按产出法（已达到里程碑）确认进度。借：合同负债（冲预收）+银行存款（新收款），贷：主营业务收入、应交税费。',
    entries: [
      { subjectCode: '2205', summary: '合同负债转入收入-中期', debit: 120000, credit: 0, explanation: '合同负债减少记借方。冲销此前收取的启动资金。' },
      { subjectCode: '100201', summary: '收取中期验收款', debit: 169600, credit: 0, explanation: '银行存款增加记借方。中期验收款=400,000×40%=160,000，增值税9,600。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入——主营业务产生的现金收入。'},
      { subjectCode: '6001', summary: '确认软件开发收入-中期', debit: 0, credit: 280000, explanation: '主营业务收入增加记贷方。软件开发项目达到中期里程碑，确认收入70%即280,000元（含此前30%定金转收入和本次40%收入）。' },
      { subjectCode: '222101', summary: '中期验收-增值税', debit: 0, credit: 9600, explanation: '应交增值税-销项税额增加记贷方。中期验收款对应的增值税。' }],
    documents: [
      { type: 'bank', label: '银行回单', date: '2026-02-11', totalAmount: 169600, payer: '乙客户', payeeName: '雲帆管理咨询有限公司', content: '软件开发中期验收款', refNo: 'HD202602110001' },
      { type: 'invoice', label: '增值税发票', region: '北京市', invoiceNo: '1100345678', date: '2026-02-11', buyer: '乙客户', seller: '雲帆管理咨询有限公司', lineItems: [{ name: 'ERP管理系统开发费（中期）', qty: 1, price: 160000, amount: 160000 }], totalAmount: 160000 },
      { type: 'text', label: '中期验收报告', docTitle: 'ERP管理系统中期验收确认书', content: '经测试验证，项目已完成需求分析、系统设计和核心模块编码，达成中期目标。', signature: '乙客户（盖章） | 雲帆咨询（盖章）' }]},
  {
    date: '2026-02-12',
    title: '支付丙客户咨询项目外包调研费',
    tags: ['项目核算'],
    difficulty: 2,
    description: '丙客户战略规划咨询项目需外部行业数据支持，支付第三方调研机构服务费25,000元，银行转账。',
    tip: '为特定项目发生的外部服务费计入劳务成本-外包服务费。借：劳务成本-外包服务费，贷：银行存款。',
    entries: [
      { subjectCode: '520103', summary: '支付项目外包调研费', debit: 25000, credit: 0, explanation: '劳务成本-外包服务费增加记借方。丙客户项目发生的外部调研费用。' },
      { subjectCode: '100201', summary: '支付项目外包调研费', debit: 0, credit: 25000, explanation: '银行存款减少记贷方。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目520103），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'invoice', label: '增值税发票', region: '北京市', invoiceNo: '1100567890', date: '2026-02-12', buyer: '雲帆管理咨询有限公司', seller: '华信市场调研有限公司', lineItems: [{ name: '行业数据调研服务', qty: 1, price: 25000, amount: 25000 }], totalAmount: 25000 },
      { type: 'bank', label: '付款回单', date: '2026-02-12', totalAmount: 25000, payer: '雲帆管理咨询有限公司', payeeName: '华信市场调研有限公司', content: '调研服务费', refNo: 'FK202602120001' }]},
  {
    date: '2026-02-13',
    title: '丙项目组出差人员报销差旅费',
    tags: ['项目核算', '费用管理'],
    difficulty: 2,
    description: '丙项目组出差归来报销差旅费5,500元（交通2,000+住宿2,500+补助1,000），此前预借6,000元，退回现金500元。',
    tip: '项目差旅费归集至劳务成本-差旅费。借：劳务成本-差旅费，库存现金（退回余款），贷：其他应收款。',
    entries: [
      { subjectCode: '520102', summary: '丙项目差旅费', debit: 5500, credit: 0, explanation: '劳务成本-差旅费增加记借方。丙项目直接差旅费用。' },
      { subjectCode: '1001', summary: '退回多余差旅借款', debit: 500, credit: 0, explanation: '库存现金增加记借方。员工退回多余借款。' , cashFlowItem: 'cf-op5', cashFlowExplanation: '其他经营活动现金流入（配对科目1221），属于"收到其他与经营活动有关的现金"。'},
      { subjectCode: '1221', summary: '冲销差旅费预借款', debit: 0, credit: 6000, explanation: '其他应收款减少记贷方。冲销预借款。' }],
    documents: [
      { type: 'receipt', label: '差旅费报销单', docTitle: '差旅费报销审批单', items: [{ name: '交通费', amount: 2000 }, { name: '住宿费', amount: 2500 }, { name: '出差补助', amount: 1000 }], totalAmount: 5500, stampText: '财务审核章' }]},
  {
    date: '2026-02-14',
    title: '计提2月管理人员工资（上半月）',
    tags: ['人工成本', '工资社保'],
    difficulty: 2,
    description: '计提2月上半月管理人员工资22,500元。',
    tip: '管理人员工资全额计入管理费用-工资薪金。',
    entries: [
      { subjectCode: '660203', summary: '计提管理人员上半月工资', debit: 22500, credit: 0, explanation: '管理费用-工资薪金增加记借方。' },
      { subjectCode: '221101', summary: '计提管理人员上半月工资', debit: 0, credit: 22500, explanation: '应付职工薪酬-工资增加记贷方。' }],
    documents: [
      { type: 'text', label: '工资计提表', docTitle: '2026年2月上半月管理人员工资明细', content: '管理人员7人上半月工资合计22,500元。', signature: '人力资源部' }]},

  // ═══════════════════════════════════════════
  // 第三周：日常运营 + 商务活动（2月16日~2月21日）
  // ═══════════════════════════════════════════
  {
    date: '2026-02-16',
    title: '报销员工日常费用（交通+通讯）',
    tags: ['费用管理'],
    difficulty: 1,
    description: '员工凭发票报销1月市内交通费800元、通讯费1,200元，合计2,000元，以现金支付。',
    tip: '日常报销费用计入管理费用-办公费。借：管理费用，贷：库存现金。',
    entries: [
      { subjectCode: '660201', summary: '报销交通通讯费', debit: 2000, credit: 0, explanation: '管理费用-办公费增加记借方。日常费用报销。' },
      { subjectCode: '1001', summary: '报销交通通讯费', debit: 0, credit: 2000, explanation: '库存现金减少记贷方。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目660201），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '费用报销单', docTitle: '2026年2月日常费用报销单', items: [{ name: '市内交通费（1月）', amount: 800 }, { name: '通讯费（1月）', amount: 1200 }], totalAmount: 2000, stampText: '财务审核章' }]},
  {
    date: '2026-02-17',
    title: '支付法律顾问服务费',
    tags: ['费用管理'],
    difficulty: 1,
    description: '公司聘请常年法律顾问，支付本月顾问服务费5,000元，银行转账。',
    tip: '法律顾问费属于管理费用。借：管理费用-办公费，贷：银行存款。',
    entries: [
      { subjectCode: '660201', summary: '支付法律顾问费', debit: 5000, credit: 0, explanation: '管理费用-办公费增加记借方。' },
      { subjectCode: '100201', summary: '支付法律顾问费', debit: 0, credit: 5000, explanation: '银行存款减少记贷方。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目660201），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'invoice', label: '增值税发票', region: '北京市', invoiceNo: '1100678901', date: '2026-02-17', buyer: '雲帆管理咨询有限公司', seller: '大成律师事务所', lineItems: [{ name: '常年法律顾问服务费', qty: 1, price: 5000, amount: 5000 }], totalAmount: 5000 }]},
  {
    date: '2026-02-18',
    title: '支付2月办公室水电费',
    tags: ['费用管理'],
    difficulty: 1,
    description: '支付2月办公室水电费6,200元，银行转账。',
    tip: '水电费计入管理费用-办公费。',
    entries: [
      { subjectCode: '660201', summary: '支付2月水电费', debit: 6200, credit: 0, explanation: '管理费用-办公费增加记借方。' },
      { subjectCode: '100201', summary: '支付2月水电费', debit: 0, credit: 6200, explanation: '银行存款减少记贷方。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目660201），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '水电费账单', docTitle: '2026年2月水电费缴费通知', items: [{ name: '电费', amount: 4600 }, { name: '水费', amount: 1600 }], totalAmount: 6200 }]},
  {
    date: '2026-02-19',
    title: '咨询项目组下半月工资计提',
    tags: ['项目核算', '人工成本'],
    difficulty: 2,
    description: '计提2月下半月项目人员工资。咨询组24,000元+开发组22,000元=46,000元。',
    tip: '持续归集项目人工成本至劳务成本。',
    entries: [
      { subjectCode: '520101', summary: '计提项目组下半月工资', debit: 46000, credit: 0, explanation: '劳务成本-人工成本增加记借方。' },
      { subjectCode: '221101', summary: '计提项目组下半月工资', debit: 0, credit: 46000, explanation: '应付职工薪酬-工资增加记贷方。' }],
    documents: [
      { type: 'text', label: '工资计提表', docTitle: '2026年2月下半月项目工资明细', content: '咨询组24,000+开发组22,000=46,000。', signature: '人力资源部' }]},
  {
    date: '2026-02-20',
    title: '计提管理人员下半月工资',
    tags: ['人工成本', '工资社保'],
    difficulty: 1,
    description: '计提2月下半月管理人员工资22,500元。',
    tip: '管理人员工资全额计入管理费用。',
    entries: [
      { subjectCode: '660203', summary: '计提管理人员下半月工资', debit: 22500, credit: 0, explanation: '管理费用-工资薪金增加记借方。' },
      { subjectCode: '221101', summary: '计提管理人员下半月工资', debit: 0, credit: 22500, explanation: '应付职工薪酬-工资增加记贷方。' }],
    documents: [
      { type: 'text', label: '工资计提表', docTitle: '2026年2月下半月管理人员工资明细', content: '管理人员7人下半月工资合计22,500元。', signature: '人力资源部' }]},
  {
    date: '2026-02-21',
    title: '计提2月单位社保费用',
    tags: ['人工成本', '工资社保'],
    difficulty: 2,
    description: '计提2月单位社保。项目人员工资92,000×25%=23,000元，管理人员45,000×25%=11,250元，合计34,250元。',
    tip: '项目人员社保归集到劳务成本，管理人员的计入管理费用。',
    entries: [
      { subjectCode: '520101', summary: '项目组社保-单位部分', debit: 23000, credit: 0, explanation: '劳务成本-人工成本增加记借方。' },
      { subjectCode: '660203', summary: '管理人员社保-单位部分', debit: 11250, credit: 0, explanation: '管理费用-工资薪金增加记借方。' },
      { subjectCode: '221102', summary: '计提单位社保费用', debit: 0, credit: 34250, explanation: '应付职工薪酬-社保增加记贷方。' }],
    documents: [
      { type: 'text', label: '社保计提表', docTitle: '2026年2月社保费用计提明细', content: '项目92,000×25%=23,000，管理45,000×25%=11,250，合计34,250。', signature: '人力资源部' }]},

  // ═══════════════════════════════════════════
  // 第四周：结算 + 期末处理（2月23日~2月28日）
  // ═══════════════════════════════════════════
  {
    date: '2026-02-23',
    title: '甲客户咨询项目二期启动（差旅费支出）',
    tags: ['项目核算'],
    difficulty: 2,
    description: '甲客户续签第二阶段优化咨询合同，合同金额150,000元（不含税）。项目组出差调研，发生差旅费6,000元，直接支付（非预借）。',
    tip: '不通过预借方式，直接支付项目差旅费。借：劳务成本-差旅费，贷：银行存款/库存现金。',
    entries: [
      { subjectCode: '520102', summary: '甲项目二期差旅费', debit: 6000, credit: 0, explanation: '劳务成本-差旅费增加记借方。甲客户续签项目直接发生的差旅费用。' },
      { subjectCode: '100201', summary: '甲项目二期差旅费', debit: 0, credit: 6000, explanation: '银行存款减少记贷方。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目520102），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '差旅费报销单', docTitle: '甲项目二期差旅费用明细', items: [{ name: '交通费', amount: 2500 }, { name: '住宿费', amount: 2500 }, { name: '补助', amount: 1000 }], totalAmount: 6000, stampText: '财务审核章' }]},
  {
    date: '2026-02-24',
    title: '计提2月固定资产折旧',
    tags: ['费用管理'],
    difficulty: 1,
    description: '计提2月办公设备折旧760元。',
    tip: '固定资产每月计提折旧。借：管理费用，贷：累计折旧。',
    entries: [
      { subjectCode: '660201', summary: '计提办公设备折旧', debit: 760, credit: 0, explanation: '管理费用-办公费增加记借方。' },
      { subjectCode: '1602', summary: '计提办公设备折旧', debit: 0, credit: 760, explanation: '累计折旧增加记贷方。' }],
    documents: [
      { type: 'text', label: '折旧计算表', docTitle: '2026年2月折旧明细', content: '办公设备月折旧760元。', signature: '财务部' }]},
  {
    date: '2026-02-25',
    title: '计提2月短期借款利息',
    tags: ['期末'],
    difficulty: 1,
    description: '计提2月短期借款利息1,087.50元。',
    entries: [
      { subjectCode: '6603', summary: '计提短期借款利息', debit: 1087.5, credit: 0, explanation: '财务费用增加记借方。' },
      { subjectCode: '2232', summary: '计提短期借款利息', debit: 0, credit: 1087.5, explanation: '应付利息增加记贷方。' }],
    documents: [
      { type: 'text', label: '利息计算表', content: '短期借款300,000×4.35%÷12=1,087.50。', signature: '财务部' }]},
  {
    date: '2026-02-26',
    title: '结转完工项目成本（甲项目二期）',
    tags: ['项目核算', '期末'],
    difficulty: 3,
    description: '甲客户二期咨询项目完成，收入尚未确认（按合同已完成但客户尚未验收）。但先将可归集的直接成本计入。',
    tip: '项目完工但客户尚未验收时，成本先归集在劳务成本。待验收确认收入后再结转至主营业务成本。此处展示成本归集状态。',
    role: 'cashier',
    entries: [],
    documents: [
      { type: 'text', label: '项目成本汇总表', docTitle: '2026年2月项目成本状态', content: '甲项目二期差旅费6,000元（待验收后结转）。丙项目：人工24,000+外包25,000+差旅5,500=54,500元（在施）。开发项目：人工44,000元（资本化阶段）。', signature: '财务部' }]},
  {
    date: '2026-02-27',
    title: '计算并结转2月增值税',
    tags: ['税费', '期末'],
    difficulty: 2,
    description: '计算2月应交增值税。销项税额：新项目定金7,200+软件中期收入9,600=16,800元。进项税额：外包调研费1,500（25,000×6%），法律顾问费300（5,000×6%）。应交增值税=16,800-1,800=15,000元。',
    tip: '服务业也可取得增值税专用发票抵扣进项。应交增值税=销项-进项。',
    entries: [
      { subjectCode: '6403', summary: '计提城建税', debit: 1050, credit: 0, explanation: '税金及附加。城建税=15,000×7%=1,050元。' },
      { subjectCode: '6403', summary: '计提教育费附加', debit: 450, credit: 0, explanation: '税金及附加。教育费附加=15,000×3%=450元。' },
      { subjectCode: '222103', summary: '应交城建税', debit: 0, credit: 1050, explanation: '应交城建税增加。' },
      { subjectCode: '222104', summary: '应交教育费附加', debit: 0, credit: 450, explanation: '应交教育费附加增加。' }],
    documents: [
      { type: 'text', label: '增值税计算表', docTitle: '2026年2月增值税及附加计算', content: '销项16,800-进项1,800=应交15,000。附加税：城建税1,050+教育费450=1,500。', signature: '财务部' }]},
  {
    date: '2026-02-28',
    title: '期末结转损益',
    tags: ['期末'],
    difficulty: 3,
    description: '结转2月损益类科目。收入：主营业务收入280,000元（软件开发中期含定金转入）。费用：管理费用90,210元，财务费用1,087.50元，税金及附加1,500元。合计92,797.50元。',
    tip: '注意2月主营业务收入含合同负债转入+新收款部分。',
    entries: [
      { subjectCode: '6001', debit: 449600, credit: 0, summary: '结转主营业务收入', explanation: '主营业务收入减少记借方。' },
      { subjectCode: '6403', debit: 0, credit: 1500, summary: '结转税金及附加', explanation: '税金及附加减少记贷方。' },
      { subjectCode: '660201', debit: 0, credit: 45160, summary: '结转660201', explanation: '660201转出，余额归零。' },
      { subjectCode: '660203', debit: 0, credit: 56250, summary: '结转660203', explanation: '660203转出，余额归零。' },
      { subjectCode: '6603', debit: 0, credit: 1087.5, summary: '结转财务费用', explanation: '财务费用减少记贷方。' },
      { subjectCode: '4103', debit: 0, credit: 345602.5, summary: '成本费用转入本年利润', explanation: '本年利润减少。' }
    ],
    documents: [
      { type: 'text', label: '损益结转表', docTitle: '2026年2月损益结转表', content: '收入280,000-费用92,797.50=利润187,202.50元。', signature: '财务部' }]},

  // ═══════════════════════════════════════════
  // 出纳任务（15个）
  // ═══════════════════════════════════════════
  {
    date: '2026-02-02',
    title: '纳税申报银行转账',
    tags: ['出纳', '税费'],
    difficulty: 1,
    description: '通过银行转账缴纳1月增值税及附加税合计21,120元。',
    tip: '出纳需在申报期内及时办理税款缴纳，避免滞纳金。',
    entries: [
      { subjectCode: '222101', summary: '缴纳增值税', debit: 19200, credit: 0, explanation: '应交增值税减少。' },
      { subjectCode: '222103', summary: '缴纳城建税', debit: 1344, credit: 0, explanation: '应交城建税减少。' },
      { subjectCode: '222104', summary: '缴纳教育费附加', debit: 576, credit: 0, explanation: '应交教育费附加减少。' },
      { subjectCode: '100201', summary: '缴纳税款', debit: 0, credit: 21120, explanation: '银行存款减少。' , cashFlowItem: 'cf-op4', cashFlowExplanation: '缴纳税费支出（配对科目222101），属于"支付的各项税费"——经营活动现金流出。'}],
    documents: [
      { type: 'bank', label: '付款回单', date: '2026-02-02', totalAmount: 21120, payer: '雲帆管理咨询有限公司', payeeName: '国家金库', content: '纳税', refNo: 'FK202602020001' }]},
  {
    date: '2026-02-03',
    title: '银行代缴社保操作',
    tags: ['出纳', '工资社保'],
    difficulty: 1,
    description: '通过银行转账缴纳1月社保费31,840元。',
    tip: '社保由银行自动代扣或手动转账，出纳需确保账户余额充足。',
    entries: [
      { subjectCode: '221102', summary: '缴纳社保', debit: 31840, credit: 0, explanation: '应付职工薪酬减少。' },
      { subjectCode: '100201', summary: '缴纳社保', debit: 0, credit: 31840, explanation: '银行存款减少。' , cashFlowItem: 'cf-op3', cashFlowExplanation: '支付职工薪酬相关支出（配对科目221102），属于"支付给职工以及为职工支付的现金"——经营活动现金流出。'}],
    documents: [
      { type: 'bank', label: '付款回单', date: '2026-02-03', totalAmount: 31840, payer: '雲帆管理咨询有限公司', payeeName: '社保中心', content: '社保缴纳', refNo: 'FK202602030001' }]},
  {
    date: '2026-02-04',
    title: '银行代发工资操作',
    tags: ['出纳', '工资社保'],
    difficulty: 2,
    description: '通过银行批量代发1月工资，实发合计99,910元至员工个人账户。',
    tip: '工资代发需提前制作工资发放表，经审批后提交银行办理。',
    entries: [
      { subjectCode: '221101', summary: '银行代发工资', debit: 103000, credit: 0, explanation: '应付职工薪酬减少。' },
      { subjectCode: '100201', summary: '银行代发工资', debit: 0, credit: 99910, explanation: '银行存款减少。' , cashFlowItem: 'cf-op3', cashFlowExplanation: '支付职工薪酬相关支出（配对科目221101），属于"支付给职工以及为职工支付的现金"——经营活动现金流出。'},
      { subjectCode: '222102', summary: '代扣个税', debit: 0, credit: 3090, explanation: '应交所得税（个税）增加。' }],
    documents: [
      { type: 'bank', label: '付款回单', date: '2026-02-04', totalAmount: 99910, payer: '雲帆管理咨询有限公司', payeeName: '批量代发', content: '1月工资', refNo: 'FK202602040001' }]},
  {
    date: '2026-02-05',
    title: '新合同定金到账确认',
    tags: ['出纳'],
    difficulty: 1,
    description: '确认丙客户战略咨询合同定金127,200元到账，登记日记账。',
    entries: [
      { subjectCode: '100201', summary: '定金到账', debit: 127200, credit: 0, explanation: '银行存款增加。' , cashFlowItem: 'cf-op5', cashFlowExplanation: '其他经营活动现金流入（配对科目2205），属于"收到其他与经营活动有关的现金"。'},
      { subjectCode: '2205', summary: '定金到账', debit: 0, credit: 127200, explanation: '合同负债增加。' }],
    documents: [
      { type: 'bank', label: '银行回单', date: '2026-02-05', totalAmount: 127200, payer: '丙客户', payeeName: '雲帆管理咨询有限公司', content: '合同定金', refNo: 'HD202602050001' }]},
  {
    date: '2026-02-06',
    title: '财务软件采购转账支付',
    tags: ['出纳', '费用管理'],
    difficulty: 1,
    description: '银行转账支付财务软件采购款12,000元。',
    entries: [
      { subjectCode: '1701', summary: '购买财务软件', debit: 12000, credit: 0, explanation: '无形资产增加。' },
      { subjectCode: '100201', summary: '购买财务软件', debit: 0, credit: 12000, explanation: '银行存款减少。' , cashFlowItem: 'cf-inv', cashFlowExplanation: '购建固定资产/无形资产支出（配对科目1701），属于投资活动现金流出——资本性支出，区别于日常经营支出。'}],
    documents: [
      { type: 'bank', label: '付款回单', date: '2026-02-06', totalAmount: 12000, payer: '雲帆管理咨询有限公司', payeeName: '正通软件有限公司', content: '软件采购', refNo: 'FK202602060001' }]},
  {
    date: '2026-02-10',
    title: '差旅费借款现金支付',
    tags: ['出纳', '项目核算'],
    difficulty: 1,
    description: '现金支付丙项目组差旅费预借款6,000元。',
    entries: [
      { subjectCode: '1221', summary: '差旅借款', debit: 6000, credit: 0, explanation: '其他应收款增加。' },
      { subjectCode: '1001', summary: '差旅借款', debit: 0, credit: 6000, explanation: '库存现金减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目1221），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'text', label: '借款单', docTitle: '差旅借款单', content: '丙项目2人借支6,000元。', signature: '借款人 | 审批' }]},
  {
    date: '2026-02-11',
    title: '软件开发中期验收款到账',
    tags: ['出纳'],
    difficulty: 1,
    description: '确认乙客户支付的中期验收款169,600元到账。',
    entries: [
      { subjectCode: '100201', summary: '中期验收款到账', debit: 169600, credit: 0, explanation: '银行存款增加。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入——主营业务产生的现金收入。'},
      { subjectCode: '6001', summary: '中期验收款到账', debit: 0, credit: 169600, explanation: '主营业务收入增加。' }],
    documents: [
      { type: 'bank', label: '银行回单', date: '2026-02-11', totalAmount: 169600, payer: '乙客户', payeeName: '雲帆管理咨询有限公司', content: '软件开发中期款', refNo: 'HD202602110001' }]},
  {
    date: '2026-02-12',
    title: '外包调研费银行转账支付',
    tags: ['出纳', '项目核算'],
    difficulty: 1,
    description: '银行转账支付华信调研公司服务费25,000元。',
    entries: [
      { subjectCode: '520103', summary: '支付调研费', debit: 25000, credit: 0, explanation: '劳务成本增加。' },
      { subjectCode: '100201', summary: '支付调研费', debit: 0, credit: 25000, explanation: '银行存款减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目520103），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '付款回单', date: '2026-02-12', totalAmount: 25000, payer: '雲帆管理咨询有限公司', payeeName: '华信市场调研有限公司', content: '调研服务费', refNo: 'FK202602120001' }]},
  {
    date: '2026-02-13',
    title: '出差报销退回现金处理',
    tags: ['出纳', '费用管理'],
    difficulty: 1,
    description: '丙项目组报销差旅费5,500元，退回现金500元，清点入账。',
    entries: [
      { subjectCode: '520102', summary: '差旅费报销', debit: 5500, credit: 0, explanation: '劳务成本增加。' },
      { subjectCode: '1001', summary: '退回现金', debit: 500, credit: 0, explanation: '库存现金增加。' , cashFlowItem: 'cf-op5', cashFlowExplanation: '其他经营活动现金流入（配对科目1221），属于"收到其他与经营活动有关的现金"。'},
      { subjectCode: '1221', summary: '冲销借款', debit: 0, credit: 6000, explanation: '其他应收款减少。' }],
    documents: [
      { type: 'receipt', label: '收款收据', docTitle: '现金收款收据', items: [{ name: '退回差旅借款余款', amount: 500 }], totalAmount: 500, stampText: '财务专用章' }]},
  {
    date: '2026-02-17',
    title: '法律顾问费银行转账',
    tags: ['出纳', '费用管理'],
    difficulty: 1,
    description: '银行转账支付本月法律顾问费5,000元。',
    entries: [
      { subjectCode: '660201', summary: '法律顾问费', debit: 5000, credit: 0, explanation: '管理费用增加。' },
      { subjectCode: '100201', summary: '法律顾问费', debit: 0, credit: 5000, explanation: '银行存款减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目660201），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '付款回单', date: '2026-02-17', totalAmount: 5000, payer: '雲帆管理咨询有限公司', payeeName: '大成律师事务所', content: '法律顾问费', refNo: 'FK202602170001' }]},
  {
    date: '2026-02-18',
    title: '水电费银行转账支付',
    tags: ['出纳', '费用管理'],
    difficulty: 1,
    description: '银行转账支付2月水电费6,200元。',
    entries: [
      { subjectCode: '660201', summary: '水电费', debit: 6200, credit: 0, explanation: '管理费用增加。' },
      { subjectCode: '100201', summary: '水电费', debit: 0, credit: 6200, explanation: '银行存款减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目660201），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '付款回单', date: '2026-02-18', totalAmount: 6200, payer: '雲帆管理咨询有限公司', payeeName: '供电公司', content: '水电费', refNo: 'FK202602180001' }]},
  {
    date: '2026-02-23',
    title: '项目差旅费直接支付',
    tags: ['出纳', '项目核算'],
    difficulty: 1,
    description: '银行转账支付甲项目二期差旅费6,000元。',
    entries: [
      { subjectCode: '520102', summary: '差旅费', debit: 6000, credit: 0, explanation: '劳务成本增加。' },
      { subjectCode: '100201', summary: '差旅费', debit: 0, credit: 6000, explanation: '银行存款减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目520102），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '付款回单', date: '2026-02-23', totalAmount: 6000, payer: '雲帆管理咨询有限公司', payeeName: '员工差旅', content: '差旅费', refNo: 'FK202602230001' }]},
  {
    date: '2026-02-26',
    title: '库存现金盘点',
    tags: ['出纳', '期末'],
    difficulty: 1,
    description: '月末库存现金盘点。账面余额=8,000（1月末）-6,000（预借差旅）+500（退回）-2,000（日常报销）=500元。实存相符。',
    tip: '每月末现金盘点不可遗漏。',
    role: 'cashier',
    entries: [],
    documents: [
      { type: 'text', label: '现金盘点表', docTitle: '2026年2月库存现金盘点表', content: '账面余额500元，实存500元，账实相符。', signature: '出纳 | 监盘人' }]},
  {
    date: '2026-02-27',
    title: '银行对账单核对',
    tags: ['出纳', '期末'],
    difficulty: 1,
    description: '核对2月工商银行对账单与银行存款日记账。',
    tip: '逐笔核对银行流水与日记账，编制余额调节表。',
    role: 'cashier',
    entries: [],
    documents: [
      { type: 'text', label: '银行对账单', docTitle: '工商银行2月对账单', content: '核对：2月收入合计296,800元，支出合计142,160元。', stampText: '中国工商银行' }]},
  {
    date: '2026-02-28',
    title: '月末票据整理归档',
    tags: ['出纳', '期末'],
    difficulty: 1,
    description: '整理2月所有收付款凭证归档。',
    role: 'cashier',
    entries: [],
    documents: [
      { type: 'text', label: '归档清单', docTitle: '2月出纳票据归档', content: '银行回单8份，付款单7份，其他5份，共20份。', signature: '出纳 | 财务主管' }]},
  {
    date: "2026-02-28",
    title: "模拟纳税申报",
    tags: ["期末", "税费"],
    difficulty: 1,
    description: "根据本月已完成的账务处理，进行模拟纳税申报。系统已自动计算应缴税额（增值税和企业所得税），请前往纳税申报页面核对并提交。",
    tip: "纳税申报是企业每月的法定义务。确认所有凭证已过账、期末结转已完成后，前往纳税申报页面核对各项税额后点击「提交申报」。",
    entries: [],
    documents: [
      { type: "text", label: "纳税申报提醒", docTitle: "2月纳税申报提醒", content: "申报期间：2026-02-28\n\n请前往纳税申报页面：\n1. 核对增值税申报表数据\n2. 核对企业所得税申报表数据\n3. 确认无误后点击「提交申报」\n\n纳税申报是企业每月必做的合规义务，请按时完成。", stampText: "财务专用章" }]},
]

export default tasks
