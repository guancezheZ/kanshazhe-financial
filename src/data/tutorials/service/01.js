/**
 * 服务业（管理咨询/软件开发）1月教学任务
 *
 * 行业特征：无存货、无生产核算、人工成本为主、项目制核算
 * 企业类型：一般纳税人（增值税6%）
 * 企业名称：雲帆管理咨询有限公司
 * 经营范围：企业管理咨询、IT咨询、软件开发
 *
 * 知识点标签：项目核算、收入确认、人工成本、费用管理、工资社保、税费、往来管理、资金管理、期末、出纳
 *
 * 会计准则依据：
 * - 《企业会计准则第14号——收入》（财会[2017]22号）
 * - 《企业会计准则第6号——无形资产》（财会[2006]3号）
 */

const tasks = [
  // ═══════════════════════════════════════════
  // 第一周：企业初始 + 基础建设（1月2日~1月7日）
  // ═══════════════════════════════════════════
  {
    date: '2026-01-02',
    title: '投资者追加资本金',
    tags: ['资金管理'],
    difficulty: 1,
    description: '公司收到新投资者追加投入资本金500,000元，已存入工商银行账户。',
    tip: '企业收到投资者投入资本时，银行存款增加记借方，实收资本增加记贷方。注意区分注册资本与实收资本的关系。',
    entries: [
      { subjectCode: '100201', summary: '收到追加投资款', debit: 500000, credit: 0, explanation: '银行存款增加记借方。资金已存入工商银行账户，资产增加。' , cashFlowItem: 'cf-fin3', cashFlowExplanation: '吸收投资收到的现金（配对科目4001），属于筹资活动现金流入——企业通过权益融资获得资金。'},
      { subjectCode: '4001', summary: '收到追加投资款', debit: 0, credit: 500000, explanation: '实收资本增加记贷方。新投资者投入资本，所有者权益增加。依据《公司法》关于注册资本的规定。' }],
    documents: [
      { type: 'bank', label: '银行回单', date: '2026-01-02', totalAmount: 500000, payer: '新投资者', payeeName: '雲帆管理咨询有限公司', content: '投资款', refNo: 'HD202601020001' },
      { type: 'text', label: '增资协议', docTitle: '增资扩股协议', content: '经股东会决议，同意新投资者以货币500,000元增资，增资后注册资本变更为500万元。', signature: '全体股东签字' }]},
  {
    date: '2026-01-03',
    title: '取得短期流动资金借款',
    tags: ['出纳'],
    difficulty: 1,
    description: '公司向工商银行借入短期流动资金借款300,000元，期限6个月，年利率4.35%，款项已到账。',
    tip: '短期借款期限在1年以内。取得借款时：借银行存款，贷短期借款。利息采用按月计提、到期支付的方式。',
    entries: [
      { subjectCode: '100201', summary: '取得短期借款', debit: 300000, credit: 0, explanation: '银行存款增加记借方。借款资金到账，企业可动用资金增加。' , cashFlowItem: 'cf-fin', cashFlowExplanation: '借款收到的现金（配对科目2001），属于筹资活动现金流入——企业通过负债融资获得资金。'},
      { subjectCode: '2001', summary: '取得短期借款', debit: 0, credit: 300000, explanation: '短期借款增加记贷方。企业承担了6个月内还本付息的义务，负债增加。' }],
    documents: [
      { type: 'bank', label: '借款回单', date: '2026-01-03', totalAmount: 300000, payer: '工商银行', payeeName: '雲帆管理咨询有限公司', content: '短期贷款发放', refNo: 'DK202601030001' },
      { type: 'text', label: '借款合同', docTitle: '流动资金借款合同', content: '雲帆管理咨询有限公司向工商银行申请短期流动资金贷款300,000元，年利率4.35%，期限6个月（2026.1.3-2026.7.2），到期一次性还本付息。', stampText: '中国工商银行 合同专用章' }]},
  {
    date: '2026-01-04',
    title: '购买办公设备',
    tags: ['费用管理'],
    difficulty: 1,
    description: '行政部购买办公桌椅、文件柜等办公设备一批，共计48,000元，通过银行转账支付。',
    tip: '办公设备作为固定资产入账，按使用年限计提折旧。固定资产增加记借方，银行存款减少记贷方。',
    entries: [
      { subjectCode: '160103', summary: '购买办公设备', debit: 48000, credit: 0, explanation: '固定资产-办公设备增加记借方。办公设备符合固定资产确认条件，按成本入账。' },
      { subjectCode: '100201', summary: '购买办公设备', debit: 0, credit: 48000, explanation: '银行存款减少记贷方。通过银行转账支付设备款项，资产减少。' , cashFlowItem: 'cf-inv', cashFlowExplanation: '购建固定资产/无形资产支出（配对科目160103），属于投资活动现金流出——资本性支出，区别于日常经营支出。'}],
    documents: [
      { type: 'invoice', label: '增值税发票', region: '北京市', invoiceNo: '1100254321', date: '2026-01-04', buyer: '雲帆管理咨询有限公司', seller: '京华办公家具有限公司', lineItems: [{ name: '办公桌椅', qty: 20, price: 1500, amount: 30000 }, { name: '文件柜', qty: 10, price: 1800, amount: 18000 }], totalAmount: 48000 },
      { type: 'bank', label: '付款回单', date: '2026-01-04', totalAmount: 48000, payer: '雲帆管理咨询有限公司', payeeName: '京华办公家具有限公司', content: '设备采购款', refNo: 'FK202601040001' }]},
  {
    date: '2026-01-05',
    title: '预付办公室半年租金',
    tags: ['费用管理'],
    difficulty: 1,
    description: '公司租用写字楼办公室，预付半年租金120,000元（每月20,000元），通过银行转账支付。',
    tip: '预付租金属于预付账款，在租赁期内逐月摊销计入管理费用。预付时借：预付账款，贷：银行存款。每月末摊销时借：管理费用，贷：预付账款。',
    entries: [
      { subjectCode: '1123', summary: '预付半年房租', debit: 120000, credit: 0, explanation: '预付账款增加记借方。预付半年租金形成企业的债权，在后续6个月内逐月摊销。' },
      { subjectCode: '100201', summary: '预付半年房租', debit: 0, credit: 120000, explanation: '银行存款减少记贷方。通过银行转账支付租金，资产减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目1123），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '房屋租赁合同', docTitle: '写字楼租赁合同', items: [{ name: '办公场地租金（2026.1-2026.6）', amount: 120000 }], totalAmount: 120000, stampText: '北京鼎盛物业管理有限公司 财务专用章' },
      { type: 'bank', label: '付款回单', date: '2026-01-05', totalAmount: 120000, payer: '雲帆管理咨询有限公司', payeeName: '北京鼎盛物业管理有限公司', content: '办公室租金', refNo: 'FK202601050001' }]},
  {
    date: '2026-01-06',
    title: '购买办公用品（现金）',
    tags: ['费用管理'],
    difficulty: 1,
    description: '行政部在文具店购买办公用品一批，共计1,500元，以现金支付。',
    tip: '金额较小的日常办公支出直接用现金支付。借：管理费用-办公费，贷：库存现金。',
    entries: [
      { subjectCode: '660201', summary: '购买办公用品', debit: 1500, credit: 0, explanation: '管理费用-办公费增加记借方。办公用品用于日常行政管理，属于期间费用，计入当期损益。' },
      { subjectCode: '1001', summary: '购买办公用品', debit: 0, credit: 1500, explanation: '库存现金减少记贷方。现金支付办公用品款项，资产减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目660201），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'invoice', label: '增值税普通发票', region: '北京市', invoiceNo: '1100987654', date: '2026-01-06', buyer: '雲帆管理咨询有限公司', seller: '文化办公用品商店', lineItems: [{ name: '办公用品一批', qty: 1, price: 1500, amount: 1500 }], totalAmount: 1500 }]},
  {
    date: '2026-01-07',
    title: '支付银行账户管理费',
    tags: ['费用管理'],
    difficulty: 1,
    description: '工商银行收取本月账户管理费200元，已从银行账户自动扣划。',
    tip: '银行手续费计入财务费用。借：财务费用，贷：银行存款。',
    entries: [
      { subjectCode: '6603', summary: '银行账户管理费', debit: 200, credit: 0, explanation: '财务费用增加记借方。银行手续费属于融资费用，计入当期损益。' },
      { subjectCode: '100201', summary: '银行账户管理费', debit: 0, credit: 200, explanation: '银行存款减少记贷方。银行自动扣划费用，资产减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6603），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '银行扣费通知', docTitle: '业务收费回单', items: [{ name: '账户管理费', amount: 200 }], totalAmount: 200, stampText: '中国工商银行 业务专用章' }]},

  // ═══════════════════════════════════════════
  // 第二周：项目启动 + 成本归集（1月9日~1月14日）
  // ═══════════════════════════════════════════
  {
    date: '2026-01-09',
    title: '签订管理咨询合同并收取定金',
    tags: ['收入确认', '往来管理'],
    difficulty: 2,
    description: '公司与甲客户签订管理咨询合同，合同金额200,000元（不含税），增值税6%。甲客户预付50%作为定金，已到账。',
    tip: '预收客户款项时，先计入"合同负债"（新收入准则）。借：银行存款，贷：合同负债、应交税费。待收入确认时再从合同负债转入主营业务收入。',
    entries: [
      { subjectCode: '100201', summary: '收取咨询合同定金', debit: 106000, credit: 0, explanation: '银行存款增加记借方。收到客户预付的合同定金（100,000+增值税6,000）。' , cashFlowItem: 'cf-op5', cashFlowExplanation: '其他经营活动现金流入（配对科目2205），属于"收到其他与经营活动有关的现金"。'},
      { subjectCode: '2205', summary: '收取咨询合同定金', debit: 0, credit: 100000, explanation: '合同负债增加记贷方。根据新收入准则，已收款但尚未履约的义务确认为合同负债。' },
      { subjectCode: '222101', summary: '收取咨询合同定金', debit: 0, credit: 6000, explanation: '应交增值税-销项税额增加记贷方。预收款对应的增值税纳税义务已产生。' }],
    documents: [
      { type: 'bank', label: '银行回单', date: '2026-01-09', totalAmount: 106000, payer: '甲客户', payeeName: '雲帆管理咨询有限公司', content: '管理咨询合同定金', refNo: 'HD202601090001' },
      { type: 'text', label: '咨询合同', docTitle: '企业管理咨询服务合同', content: '雲帆管理咨询有限公司为甲客户提供组织架构优化咨询服务，合同总价200,000元（不含税），服务周期30天。付款：签约付50%，验收后付50%。', signature: '双方盖章' }]},
  {
    date: '2026-01-10',
    title: '咨询项目人员出差（差旅费预支）',
    tags: ['项目核算'],
    difficulty: 2,
    description: '咨询项目组3名员工前往甲客户现场调研，预借差旅费9,000元（每人3,000元），以现金支付。',
    tip: '员工预借差旅费时，通过"其他应收款"核算。借：其他应收款，贷：库存现金。待员工报销时冲销其他应收款。',
    entries: [
      { subjectCode: '1221', summary: '预借差旅费', debit: 9000, credit: 0, explanation: '其他应收款增加记借方。员工预借差旅费形成企业对员工的债权。' },
      { subjectCode: '1001', summary: '预借差旅费', debit: 0, credit: 9000, explanation: '库存现金减少记贷方。现金支付给员工作为差旅备用金。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目1221），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'text', label: '借款单', docTitle: '差旅费借款申请单', content: '咨询项目组三人赴甲客户现场调研，预借差旅费9,000元（交通+住宿+补助），预计出差5天。', signature: '项目负责人签字 | 财务审批签字' }]},
  {
    date: '2026-01-11',
    title: '计提咨询项目组1月上半月工资',
    tags: ['项目核算', '人工成本'],
    difficulty: 2,
    description: '计提咨询项目组3名员工1月上半月工资共计18,000元（每人月薪12,000元，半个月计6,000元）。',
    tip: '服务业的人工成本直接计入项目成本。通过"劳务成本-人工成本"归集，月末再结转至主营业务成本。借：劳务成本-人工成本，贷：应付职工薪酬-工资。',
    entries: [
      { subjectCode: '520101', summary: '计提项目组上半月工资', debit: 18000, credit: 0, explanation: '劳务成本-人工成本增加记借方。项目人员直接人工计入项目成本，而非管理费用。这是服务业区别于制造业的重要特点。' },
      { subjectCode: '221101', summary: '计提项目组上半月工资', debit: 0, credit: 18000, explanation: '应付职工薪酬-工资增加记贷方。企业应付给员工的工资薪酬，负债增加。' }],
    documents: [
      { type: 'text', label: '工资计提表', docTitle: '咨询项目组工资计提明细', content: '咨询项目组3人，月薪各12,000元，1月上半月各计提6,000元，合计18,000元。', signature: '人力资源部 | 财务部' }]},
  {
    date: '2026-01-12',
    title: '支付软件开发工具授权费',
    tags: ['项目核算'],
    difficulty: 2,
    description: '公司为承接的软件开发项目购买开发工具授权，支付外包服务费30,000元，通过银行转账。',
    tip: '为特定项目发生的外包服务费计入劳务成本。借：劳务成本-外包服务费，贷：银行存款。',
    entries: [
      { subjectCode: '520103', summary: '支付开发工具授权费', debit: 30000, credit: 0, explanation: '劳务成本-外包服务费增加记借方。为软件开发项目采购的外部工具授权，属于可直接归集的项目成本。' },
      { subjectCode: '100201', summary: '支付开发工具授权费', debit: 0, credit: 30000, explanation: '银行存款减少记贷方。通过银行转账支付授权费用。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目520103），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'invoice', label: '增值税发票', region: '北京市', invoiceNo: '1100456789', date: '2026-01-12', buyer: '雲帆管理咨询有限公司', seller: '天工软件技术有限公司', lineItems: [{ name: '企业级开发工具授权（1年）', qty: 1, price: 30000, amount: 30000 }], totalAmount: 30000 },
      { type: 'bank', label: '付款回单', date: '2026-01-12', totalAmount: 30000, payer: '雲帆管理咨询有限公司', payeeName: '天工软件技术有限公司', content: '软件授权费', refNo: 'FK202601120001' }]},
  {
    date: '2026-01-13',
    title: '签订软件开发合同并收取启动资金',
    tags: ['收入确认', '往来管理'],
    difficulty: 2,
    description: '公司与乙客户签订定制软件开发合同，合同金额400,000元（不含税），增值税6%。乙客户预付30%作为启动资金，已到账。',
    tip: '软件开发合同通常采用时段法确认收入（按履约进度）。预收款先计入合同负债，后续按履约进度逐步转入主营业务收入。',
    entries: [
      { subjectCode: '100201', summary: '收取软件开发启动资金', debit: 127200, credit: 0, explanation: '银行存款增加记借方。收到客户预付的启动资金（400,000×30%=120,000，增值税7,200）。' , cashFlowItem: 'cf-op5', cashFlowExplanation: '其他经营活动现金流入（配对科目2205），属于"收到其他与经营活动有关的现金"。'},
      { subjectCode: '2205', summary: '收取软件开发启动资金', debit: 0, credit: 120000, explanation: '合同负债增加记贷方。已收款但尚未履约的义务，符合新收入准则"合同负债"的定义。' },
      { subjectCode: '222101', summary: '收取软件开发启动资金', debit: 0, credit: 7200, explanation: '应交增值税-销项税额增加记贷方。收到预收款时增值税纳税义务产生。' }],
    documents: [
      { type: 'bank', label: '银行回单', date: '2026-01-13', totalAmount: 127200, payer: '乙客户', payeeName: '雲帆管理咨询有限公司', content: '软件开发项目启动资金', refNo: 'HD202601130001' },
      { type: 'text', label: '开发合同', docTitle: '定制软件开发合同', content: '雲帆管理咨询有限公司为乙客户开发ERP管理系统，合同总价400,000元（不含税），开发周期预计90天。付款：签约付30%，中期验收付40%，终验付30%。', signature: '双方盖章' }]},
  {
    date: '2026-01-14',
    title: '分配办公场所租金（本月摊销）',
    tags: ['费用管理'],
    difficulty: 1,
    description: '月末摊销本月办公室租金20,000元（预付半年租金120,000元÷6个月）。',
    tip: '预付的租金需要按月摊销。借：管理费用-办公费，贷：预付账款。注意摊销计算与租赁期间匹配。',
    entries: [
      { subjectCode: '660201', summary: '摊销本月办公室租金', debit: 20000, credit: 0, explanation: '管理费用-办公费增加记借方。本月应承担的办公室租金计入当期损益。' },
      { subjectCode: '1123', summary: '摊销本月办公室租金', debit: 0, credit: 20000, explanation: '预付账款减少记贷方。当月摊销额冲减预付账款。' }],
    documents: [
      { type: 'text', label: '费用摊销表', docTitle: '预付费用月度摊销计算表', content: '办公室预付租金120,000元，租赁期2026年1月至6月，本月应摊销20,000元。', stampText: '雲帆管理咨询有限公司 财务专用章' }]},

  // ═══════════════════════════════════════════
  // 第三周：项目执行 + 日常运营（1月16日~1月21日）
  // ═══════════════════════════════════════════
  {
    date: '2026-01-16',
    title: '员工报销差旅费（冲抵预借）',
    tags: ['项目核算', '费用管理'],
    difficulty: 2,
    description: '咨询项目组员工出差归来报销差旅费，实际支出8,500元（交通3,000+住宿4,000+补助1,500），此前预借9,000元，退回现金500元。',
    tip: '员工报销时冲销其他应收款。报销金额计入劳务成本（项目直接差旅费），退回现金增加库存现金。借：劳务成本-差旅费，库存现金，贷：其他应收款。',
    entries: [
      { subjectCode: '520102', summary: '报销差旅费-项目直接费用', debit: 8500, credit: 0, explanation: '劳务成本-差旅费增加记借方。项目人员的差旅费用直接归集到项目成本中。' },
      { subjectCode: '1001', summary: '退回多余差旅费借款', debit: 500, credit: 0, explanation: '库存现金增加记借方。员工退回多余的预借差旅费。' , cashFlowItem: 'cf-op5', cashFlowExplanation: '其他经营活动现金流入（配对科目1221），属于"收到其他与经营活动有关的现金"。'},
      { subjectCode: '1221', summary: '冲销差旅费预借款', debit: 0, credit: 9000, explanation: '其他应收款减少记贷方。冲销员工此前的差旅费预借款。' }],
    documents: [
      { type: 'receipt', label: '差旅费报销单', docTitle: '差旅费报销审批单', items: [{ name: '交通费（机票+打车）', amount: 3000 }, { name: '住宿费（5天×800）', amount: 4000 }, { name: '出差补助（5天×300）', amount: 1500 }], totalAmount: 8500, stampText: '财务审核章' },
      { type: 'text', label: '出差报告', docTitle: '甲客户现场调研工作报告', content: '完成甲客户组织架构访谈，收集业务流程资料，形成调研报告初稿。', signature: '项目负责人' }]},
  {
    date: '2026-01-17',
    title: '计提全公司管理人员工资',
    tags: ['人工成本', '工资社保'],
    difficulty: 2,
    description: '计提本月行政管理人员（行政、财务、HR等）工资共计45,000元。',
    tip: '管理人员的工资不计入项目成本，直接计入管理费用。借：管理费用-工资薪金，贷：应付职工薪酬-工资。注意区分项目人员（劳务成本）和管理人员（管理费用）的工资归集。',
    entries: [
      { subjectCode: '660203', summary: '计提管理人员工资', debit: 45000, credit: 0, explanation: '管理费用-工资薪金增加记借方。管理人员的工资属于期间费用，不计入项目成本。' },
      { subjectCode: '221101', summary: '计提管理人员工资', debit: 0, credit: 45000, explanation: '应付职工薪酬-工资增加记贷方。企业应付管理人员工资，负债增加。' }],
    documents: [
      { type: 'text', label: '工资计提表', docTitle: '2026年1月管理人员工资明细', content: '行政部3人共18,000元，财务部2人共14,000元，HR部2人共13,000元。', signature: '人力资源部 | 财务部' }]},
  {
    date: '2026-01-18',
    title: '计提咨询项目组1月下半月工资',
    tags: ['项目核算', '人工成本'],
    difficulty: 2,
    description: '计提咨询项目组3名员工1月下半月工资共计18,000元（每人6,000元）和软件开发组2人下半月工资共计22,000元（每人11,000元）。开发人员工资先归集劳务成本，后续转入研发支出。',
    tip: '项目人员工资继续归集到劳务成本。借：劳务成本-人工成本，贷：应付职工薪酬-工资。',
    entries: [
      { subjectCode: '520101', summary: '计提项目组下半月工资', debit: 40000, credit: 0, explanation: '劳务成本-人工成本增加记借方。包括咨询组18,000元和开发组22,000元，均先归集到劳务成本。' },
      { subjectCode: '221101', summary: '计提项目组下半月工资', debit: 0, credit: 40000, explanation: '应付职工薪酬-工资增加记贷方。企业应付项目人员下半月工资。' }],
    documents: [
      { type: 'text', label: '工资计提表', docTitle: '2026年1月下半月项目人员工资明细', content: '软件开发组2人各11,000元=22,000元，咨询组3人各6,000元=18,000元，合计40,000元。', signature: '人力资源部 | 财务部' }]},
  {
    date: '2026-01-19',
    title: '支付办公室水电费',
    tags: ['费用管理'],
    difficulty: 1,
    description: '收到供电局和自来水公司账单，本月办公室水电费共计5,600元，通过银行转账支付。',
    tip: '办公场所的水电费计入管理费用。借：管理费用-办公费，贷：银行存款。',
    entries: [
      { subjectCode: '660201', summary: '支付办公室水电费', debit: 5600, credit: 0, explanation: '管理费用-办公费增加记借方。办公场所的水电费属于日常管理费用。' },
      { subjectCode: '100201', summary: '支付办公室水电费', debit: 0, credit: 5600, explanation: '银行存款减少记贷方。通过银行支付水电费用。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目660201），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '水电费账单', docTitle: '2026年1月水电费缴费通知', items: [{ name: '电费', amount: 4200 }, { name: '水费', amount: 1400 }], totalAmount: 5600, stampText: '北京市供电公司 | 北京市自来水公司' }]},
  {
    date: '2026-01-20',
    title: '支付业务招待费',
    tags: ['费用管理'],
    difficulty: 1,
    description: '公司为拓展业务宴请潜在客户，发生业务招待费2,000元，以现金支付。',
    tip: '业务招待费计入管理费用。注意：业务招待费在企业所得税前有扣除限额。',
    entries: [
      { subjectCode: '660201', summary: '支付业务招待费', debit: 2000, credit: 0, explanation: '管理费用-办公费增加记借方。业务招待费属于经营管理费用，注意税前扣除限额。' },
      { subjectCode: '1001', summary: '支付业务招待费', debit: 0, credit: 2000, explanation: '库存现金减少记贷方。现金支付招待费用。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目660201），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'invoice', label: '餐饮发票', region: '北京市', invoiceNo: '1100789012', date: '2026-01-20', buyer: '雲帆管理咨询有限公司', seller: '华庭酒店餐饮部', lineItems: [{ name: '餐饮费', qty: 1, price: 2000, amount: 2000 }], totalAmount: 2000 }]},
  {
    date: '2026-01-21',
    title: '咨询项目第一阶段完成（确认收入）',
    tags: ['收入确认', '项目核算'],
    difficulty: 3,
    description: '甲客户管理咨询项目第一阶段完成并通过验收，占合同总额50%。此前已收定金100,000元（不含税价），现确认本阶段收入。',
    tip: '时点法确认收入：服务完成并获客户验收时一次性确认。将合同负债转入主营业务收入。借：合同负债，贷：主营业务收入。',
    entries: [
      { subjectCode: '2205', summary: '合同负债转入收入-第一阶段', debit: 100000, credit: 0, explanation: '合同负债减少记借方。根据新收入准则，履约义务已完成，将预收款转入收入。' },
      { subjectCode: '6001', summary: '确认咨询收入-第一阶段', debit: 0, credit: 100000, explanation: '主营业务收入增加记贷方。管理咨询第一阶段完成并经客户验收，符合收入确认条件。' }],
    documents: [
      { type: 'text', label: '项目验收单', docTitle: '管理咨询项目第一阶段验收确认书', content: '经甲客户验收确认，雲帆咨询提供的组织架构优化方案（第一阶段：调研诊断）已完成并达到约定标准。', signature: '甲客户（盖章） | 雲帆咨询（盖章）' }]},

  // ═══════════════════════════════════════════
  // 第四周：结算 + 期末处理（1月22日~1月27日）
  // ═══════════════════════════════════════════
  {
    date: '2026-01-22',
    title: '咨询项目第二阶段完成并收款',
    tags: ['收入确认', '往来管理'],
    difficulty: 2,
    description: '甲客户管理咨询项目全部完成并通过终验，确认剩余50%收入（不含税100,000元），同时收到尾款106,000元（含税）。',
    tip: '项目完成后确认剩余收入并收款。借：银行存款，贷：主营业务收入、应交税费。',
    entries: [
      { subjectCode: '100201', summary: '收到咨询项目尾款', debit: 106000, credit: 0, explanation: '银行存款增加记借方。客户支付项目尾款，资金到账。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入——主营业务产生的现金收入。'},
      { subjectCode: '6001', summary: '确认咨询收入-第二阶段', debit: 0, credit: 100000, explanation: '主营业务收入增加记贷方。项目全部完成并验收，确认剩余50%收入。' },
      { subjectCode: '222101', summary: '计提咨询收入增值税', debit: 0, credit: 6000, explanation: '应交增值税-销项税额增加记贷方。咨询收入100,000×6%=6,000元增值税。' }],
    documents: [
      { type: 'bank', label: '银行回单', date: '2026-01-22', totalAmount: 106000, payer: '甲客户', payeeName: '雲帆管理咨询有限公司', content: '咨询项目尾款', refNo: 'HD202601220001' },
      { type: 'text', label: '项目终验单', docTitle: '管理咨询项目最终验收确认书', content: '组织架构优化方案全部完成，甲客户验收通过。项目总价200,000元已全部履行完毕。', signature: '甲客户（盖章） | 雲帆咨询（盖章）' }]},
  {
    date: '2026-01-23',
    title: '计算并提取单位社保费用',
    tags: ['人工成本', '工资社保'],
    difficulty: 2,
    description: '按社保规定比例计提本月单位应承担的社保费用。项目人员工资58,000元×25%=14,500元，管理人员工资45,000元×25%=11,250元。',
    tip: '社保费用按人员归属分别计入劳务成本和/或管理费用。单位承担部分合计约25%（养老16%、医疗8%、失业0.5%、工伤0.2%、生育0.3%）。',
    entries: [
      { subjectCode: '520101', summary: '计提项目组社保-单位部分', debit: 14500, credit: 0, explanation: '劳务成本-人工成本增加记借方。项目人员社保费用直接归集到项目成本。' },
      { subjectCode: '660203', summary: '计提管理人员社保-单位部分', debit: 11250, credit: 0, explanation: '管理费用-工资薪金增加记借方。管理人员社保费用计入期间费用。' },
      { subjectCode: '221102', summary: '计提单位社保费用', debit: 0, credit: 25750, explanation: '应付职工薪酬-社保增加记贷方。企业应缴纳的社保费用合计。' }],
    documents: [
      { type: 'text', label: '社保计提表', docTitle: '2026年1月社保费用计提明细', content: '项目人员工资58,000×25%=14,500，管理人员工资45,000×25%=11,250，合计25,750。', signature: '人力资源部' }]},
  {
    date: '2026-01-24',
    title: '计提固定资产折旧',
    tags: ['费用管理'],
    difficulty: 2,
    description: '计提本月固定资产折旧。办公设备48,000元，预计使用5年，残值率5%，采用直线法折旧。',
    tip: '月折旧额=原值×(1-残值率)÷(年限×12)=48,000×95%÷60=760元。借：管理费用，贷：累计折旧。',
    entries: [
      { subjectCode: '660201', summary: '计提办公设备折旧', debit: 760, credit: 0, explanation: '管理费用-办公费增加记借方。固定资产价值逐渐损耗计入当期费用。' },
      { subjectCode: '1602', summary: '计提办公设备折旧', debit: 0, credit: 760, explanation: '累计折旧增加记贷方。累计折旧是固定资产的抵减科目。' }],
    documents: [
      { type: 'text', label: '折旧计算表', docTitle: '2026年1月固定资产折旧明细', content: '办公设备原值48,000元，残值率5%，使用年限5年，月折旧额=48,000×0.95÷60=760元。', signature: '财务部' }]},
  {
    date: '2026-01-25',
    title: '月末计提短期借款利息',
    tags: ['期末'],
    difficulty: 1,
    description: '计提本月短期借款利息。借款本金300,000元，年利率4.35%，本月利息=300,000×4.35%÷12=1,087.50元。',
    tip: '短期借款利息按月计提。借：财务费用，贷：应付利息。',
    entries: [
      { subjectCode: '6603', summary: '计提短期借款利息', debit: 1087.5, credit: 0, explanation: '财务费用增加记借方。借款利息属于融资成本，计入当期损益。' },
      { subjectCode: '2232', summary: '计提短期借款利息', debit: 0, credit: 1087.5, explanation: '应付利息增加记贷方。本月已发生但尚未支付的利息，负债增加。' }],
    documents: [
      { type: 'text', label: '利息计算表', docTitle: '2026年1月借款利息计提明细', content: '短期借款300,000元，年利率4.35%，月利息=300,000×4.35%÷12=1,087.50元。', signature: '财务部' }]},
  {
    date: '2026-01-26',
    title: '计算并结转本月增值税',
    tags: ['税费', '期末'],
    difficulty: 2,
    description: '计算本月应交增值税。销项税额合计：6,000（定金）+6,000（尾款）+7,200（开发启动资金）=19,200元（无可抵扣进项）。计提城建税（7%）和教育费附加（3%）。',
    tip: '城建税=应交增值税×7%，教育费附加=应交增值税×3%。借：税金及附加，贷：应交税费。',
    entries: [
      { subjectCode: '6403', summary: '计提城建税', debit: 1344, credit: 0, explanation: '税金及附加增加记借方。城建税=19,200×7%=1,344元。' },
      { subjectCode: '6403', summary: '计提教育费附加', debit: 576, credit: 0, explanation: '税金及附加增加记借方。教育费附加=19,200×3%=576元。' },
      { subjectCode: '222103', summary: '应交城建税', debit: 0, credit: 1344, explanation: '应交城建税增加记贷方。' },
      { subjectCode: '222104', summary: '应交教育费附加', debit: 0, credit: 576, explanation: '应交教育费附加增加记贷方。' }],
    documents: [
      { type: 'text', label: '增值税计算表', docTitle: '2026年1月增值税及附加税计算表', content: '销项税额合计19,200元（咨询收入+软件开发预收款），进项税额0元（服务业进项较少），应交增值税19,200元。城建税1,344元，教育费附加576元。', signature: '财务部' }]},
  {
    date: '2026-01-27',
    title: '期末结转劳务成本至主营业务成本',
    tags: ['项目核算', '期末'],
    difficulty: 3,
    description: '结转本月已完工项目（甲客户咨询项目）对应的劳务成本至主营业务成本。归集成本：人工成本36,000（上下半月各18,000）+差旅费8,500=44,500元。开发项目尚未完工，成本暂不结转。',
    tip: '期末，对于已完成收入确认的项目，需将归集的劳务成本结转至主营业务成本，实现收入与成本的配比。借：主营业务成本，贷：劳务成本。',
    entries: [
      { subjectCode: '6401', summary: '结转已完工项目成本', debit: 44500, credit: 0, explanation: '主营业务成本增加记借方。将已确认收入的项目对应成本结转至主营业务成本。' },
      { subjectCode: '520101', summary: '结转项目人工成本', debit: 0, credit: 36000, explanation: '劳务成本-人工成本减少记贷方。完工项目对应的人工成本转出（咨询项目上下半月合计36,000）。' },
      { subjectCode: '520102', summary: '结转项目差旅费', debit: 0, credit: 8500, explanation: '劳务成本-差旅费减少记贷方。完工项目对应的差旅费转出。' }],
    documents: [
      { type: 'text', label: '成本结转计算表', docTitle: '2026年1月项目成本结转明细', content: '甲客户咨询项目成本：人工成本36,000+差旅费8,500=44,500元。软件开发项目成本仍在归集（未完工），暂不结转。', signature: '财务部' }]},
  {
    date: '2026-01-31',
    title: '期末结转损益',
    tags: ['期末'],
    difficulty: 3,
    description: '将本月损益类科目余额结转至本年利润。收入：主营业务收入200,000元。成本费用：主营业务成本44,500+税金及附加1,920+管理费用86,110+财务费用1,287.50=133,817.50元。',
    tip: '期末结转：①收入类贷方余额转入本年利润贷方；②成本费用类借方余额转入本年利润借方。结转后损益类科目余额为零。',
    entries: [
      { subjectCode: '6001', debit: 306000, credit: 0, summary: '结转主营业务收入', explanation: '主营业务收入减少记借方。将收入余额结转至本年利润。' },
      { subjectCode: '6401', debit: 0, credit: 44500, summary: '结转主营业务成本', explanation: '主营业务成本减少记贷方。结转后余额为零。' },
      { subjectCode: '6403', debit: 0, credit: 1920, summary: '结转税金及附加', explanation: '税金及附加减少记贷方。结转后余额为零。' },
      { subjectCode: '660201', debit: 0, credit: 35460, summary: '结转660201', explanation: '660201转出，余额归零。' },
      { subjectCode: '660203', debit: 0, credit: 56250, summary: '结转660203', explanation: '660203转出，余额归零。' },
      { subjectCode: '6603', debit: 0, credit: 1487.5, summary: '结转财务费用', explanation: '财务费用减少记贷方。结转后余额为零。' },
      { subjectCode: '4103', debit: 0, credit: 166382.5, summary: '成本费用转入本年利润', explanation: '本年利润减少记借方。将成本费用合计结转至本年利润。' }
    ],
    documents: [
      { type: 'text', label: '损益结转表', docTitle: '2026年1月损益结转计算表', content: '利润=200,000-44,500-1,920-86,110-1,287.50=66,182.50元。', signature: '财务部' }]},

  // ═══════════════════════════════════════════
  // 出纳任务（穿插于各周，16个）
  // ═══════════════════════════════════════════
  {
    date: '2026-01-01',
    title: '库存现金清点与日记账启用',
    tags: ['出纳'],
    difficulty: 1,
    description: '作为出纳，检查库存现金实存数，建立现金日记账和银行存款日记账。期初库存现金余额为0元，银行存款600,000元。',
    tip: '出纳每日需核对现金实存数与账面数。新公司启用日记账时，以初始余额为起点。',
    role: 'cashier',
    entries: [],
    documents: [
      { type: 'text', label: '日记账启用表', docTitle: '雲帆管理咨询有限公司现金日记账启用', content: '2026年1月1日启用现金日记账，期初余额：0元。银行存款日记账期初余额：600,000元。', signature: '出纳 | 财务主管' }]},
  {
    date: '2026-01-02',
    title: '投资款到账确认并登记',
    tags: ['出纳'],
    difficulty: 1,
    description: '确认新投资者投入的资本金500,000元已到账，登记银行存款日记账。',
    tip: '出纳收到银行回单后在银行存款日记账借方（收入方）登记。',
    entries: [
      { subjectCode: '100201', summary: '登记投资款到账', debit: 500000, credit: 0, explanation: '银行存款日记账登记收入方。' , cashFlowItem: 'cf-fin3', cashFlowExplanation: '吸收投资收到的现金（配对科目4001），属于筹资活动现金流入——企业通过权益融资获得资金。'},
      { subjectCode: '4001', summary: '登记投资款到账', debit: 0, credit: 500000, explanation: '实收资本对应登记。出纳收付款凭证联转会计。' }],
    documents: [
      { type: 'bank', label: '银行回单', date: '2026-01-02', totalAmount: 500000, payer: '新投资者', payeeName: '雲帆管理咨询有限公司', content: '投资款入账', refNo: 'HD202601020001' }]},
  {
    date: '2026-01-03',
    title: '提取备用金（现金支票）',
    tags: ['出纳'],
    difficulty: 1,
    description: '因日常需要，从工商银行提取备用金20,000元，开具现金支票。',
    tip: '提取备用金时，借：库存现金，贷：银行存款。正确填写现金支票并到银行柜台办理。注意支票的填写规范。',
    entries: [
      { subjectCode: '1001', summary: '提取备用金', debit: 20000, credit: 0, explanation: '库存现金增加记借方。从银行提取现金作为备用金。' },
      { subjectCode: '100201', summary: '提取备用金', debit: 0, credit: 20000, explanation: '银行存款减少记贷方。' }],
    documents: [
      { type: 'text', label: '现金支票存根', docTitle: '中国工商银行现金支票（存根）', content: '支票号码：XY123456，收款人：雲帆管理咨询有限公司，金额：20,000元，用途：备用金。', stampText: '财务专用章 | 法人章' }]},
  {
    date: '2026-01-04',
    title: '办公设备采购银行转账',
    tags: ['出纳', '费用管理'],
    difficulty: 1,
    description: '根据付款审批单，通过银行转账支付办公设备采购款48,000元。',
    tip: '出纳根据经审批的付款申请单办理转账。付款后登记银行存款日记账。',
    entries: [
      { subjectCode: '160103', summary: '支付办公设备款', debit: 48000, credit: 0, explanation: '固定资产增加记借方。' },
      { subjectCode: '100201', summary: '支付办公设备款', debit: 0, credit: 48000, explanation: '银行存款减少记贷方。' , cashFlowItem: 'cf-inv', cashFlowExplanation: '购建固定资产/无形资产支出（配对科目160103），属于投资活动现金流出——资本性支出，区别于日常经营支出。'}],
    documents: [
      { type: 'bank', label: '银行付款回单', date: '2026-01-04', totalAmount: 48000, payer: '雲帆管理咨询有限公司', payeeName: '京华办公家具有限公司', content: '设备采购款', refNo: 'FK202601040001' }]},
  {
    date: '2026-01-05',
    title: '预付房租银行转账操作',
    tags: ['出纳', '费用管理'],
    difficulty: 1,
    description: '根据房屋租赁合同及付款审批单，通过银行转账支付半年房租120,000元。',
    tip: '大额付款前需核对合同条款和审批流程。付款后登记银行存款日记账。',
    entries: [
      { subjectCode: '1123', summary: '预付半年房租', debit: 120000, credit: 0, explanation: '预付账款增加记借方。' },
      { subjectCode: '100201', summary: '预付半年房租', debit: 0, credit: 120000, explanation: '银行存款减少记贷方。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目1123），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '付款回单', date: '2026-01-05', totalAmount: 120000, payer: '雲帆管理咨询有限公司', payeeName: '北京鼎盛物业管理有限公司', content: '办公室租金', refNo: 'FK202601050001' }]},
  {
    date: '2026-01-07',
    title: '银行账户管理费确认',
    tags: ['出纳', '费用管理'],
    difficulty: 1,
    description: '确认工商银行已自动扣划本月账户管理费200元，登记银行存款日记账。',
    tip: '银行费用通常自动扣划，出纳需关注账户变动。',
    entries: [
      { subjectCode: '6603', summary: '银行账户管理费', debit: 200, credit: 0, explanation: '财务费用增加记借方。' },
      { subjectCode: '100201', summary: '银行账户管理费', debit: 0, credit: 200, explanation: '银行存款减少记贷方。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6603），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '银行扣费通知', docTitle: '业务收费回单', items: [{ name: '账户管理费', amount: 200 }], totalAmount: 200, stampText: '中国工商银行 业务专用章' }]},
  {
    date: '2026-01-09',
    title: '咨询合同定金到账确认',
    tags: ['出纳', '往来管理'],
    difficulty: 1,
    description: '确认甲客户支付的管理咨询合同定金106,000元已到账，登记银行存款日记账。',
    tip: '出纳收到客户汇款后，应在当日登记日记账并通知会计。',
    entries: [
      { subjectCode: '100201', summary: '咨询合同定金到账', debit: 106000, credit: 0, explanation: '银行存款增加记借方。' , cashFlowItem: 'cf-op5', cashFlowExplanation: '其他经营活动现金流入（配对科目2205），属于"收到其他与经营活动有关的现金"。'},
      { subjectCode: '2205', summary: '咨询合同定金到账', debit: 0, credit: 106000, explanation: '合同负债增加记贷方。' }],
    documents: [
      { type: 'bank', label: '银行回单', date: '2026-01-09', totalAmount: 106000, payer: '甲客户', payeeName: '雲帆管理咨询有限公司', content: '咨询合同定金', refNo: 'HD202601090001' }]},
  {
    date: '2026-01-10',
    title: '差旅费借款现金支付',
    tags: ['出纳', '费用管理'],
    difficulty: 1,
    description: '根据审批的借款申请单，支付咨询项目组员工差旅费预借款9,000元（现金）。',
    tip: '出纳凭审批齐全的借款单支付现金，领款人签字确认。',
    entries: [
      { subjectCode: '1221', summary: '支付差旅费预借款', debit: 9000, credit: 0, explanation: '其他应收款增加记借方。' },
      { subjectCode: '1001', summary: '支付差旅费预借款', debit: 0, credit: 9000, explanation: '库存现金减少记贷方。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目1221），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'text', label: '借款单（存根）', docTitle: '差旅费借款申请单', content: '项目组三人出差预借差旅费9,000元，领款人签字确认。', signature: '借款人签字 | 财务审批签字' }]},
  {
    date: '2026-01-12',
    title: '开发工具授权费银行转账支付',
    tags: ['出纳', '项目核算'],
    difficulty: 1,
    description: '根据采购审批单，通过银行转账支付开发工具授权费30,000元。',
    tip: '付款前核对合同金额、发票与审批单一致性。',
    entries: [
      { subjectCode: '520103', summary: '支付开发工具授权费', debit: 30000, credit: 0, explanation: '劳务成本增加记借方。' },
      { subjectCode: '100201', summary: '支付开发工具授权费', debit: 0, credit: 30000, explanation: '银行存款减少记贷方。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目520103），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '付款回单', date: '2026-01-12', totalAmount: 30000, payer: '雲帆管理咨询有限公司', payeeName: '天工软件技术有限公司', content: '开发工具授权费', refNo: 'FK202601120001' }]},
  {
    date: '2026-01-13',
    title: '软件开发启动资金到账确认',
    tags: ['出纳'],
    difficulty: 1,
    description: '确认乙客户支付的软件开发项目启动资金127,200元已到账，登记银行存款日记账。',
    tip: '收到大额客户款项后，出纳应立即通知会计。',
    entries: [
      { subjectCode: '100201', summary: '开发启动资金到账', debit: 127200, credit: 0, explanation: '银行存款增加记借方。' , cashFlowItem: 'cf-op5', cashFlowExplanation: '其他经营活动现金流入（配对科目2205），属于"收到其他与经营活动有关的现金"。'},
      { subjectCode: '2205', summary: '开发启动资金到账', debit: 0, credit: 127200, explanation: '合同负债增加记贷方。' }],
    documents: [
      { type: 'bank', label: '银行回单', date: '2026-01-13', totalAmount: 127200, payer: '乙客户', payeeName: '雲帆管理咨询有限公司', content: '软件开发启动资金', refNo: 'HD202601130001' }]},
  {
    date: '2026-01-16',
    title: '员工差旅费报销退回现金',
    tags: ['出纳', '费用管理'],
    difficulty: 1,
    description: '员工出差归来报销差旅费8,500元，退回多余预借款现金500元。出纳当面清点并出具收据。',
    tip: '出纳收到退回的现金需当面清点并开具收据。报销单据需经审批。',
    entries: [
      { subjectCode: '520102', summary: '差旅费报销', debit: 8500, credit: 0, explanation: '劳务成本增加记借方。' },
      { subjectCode: '1001', summary: '退回多余借款', debit: 500, credit: 0, explanation: '库存现金增加记借方。' , cashFlowItem: 'cf-op5', cashFlowExplanation: '其他经营活动现金流入（配对科目1221），属于"收到其他与经营活动有关的现金"。'},
      { subjectCode: '1221', summary: '冲销差旅费预借款', debit: 0, credit: 9000, explanation: '其他应收款减少记贷方。' }],
    documents: [
      { type: 'receipt', label: '现金收款收据', docTitle: '现金收款收据', items: [{ name: '收回多余差旅借款', amount: 500 }], totalAmount: 500, stampText: '雲帆管理咨询有限公司 财务专用章' }]},
  {
    date: '2026-01-19',
    title: '水电费银行转账支付',
    tags: ['出纳', '费用管理'],
    difficulty: 1,
    description: '根据缴费通知单，通过银行转账支付办公室水电费5,600元。',
    tip: '日常费用付款需核对账单金额。',
    entries: [
      { subjectCode: '660201', summary: '支付水电费', debit: 5600, credit: 0, explanation: '管理费用增加记借方。' },
      { subjectCode: '100201', summary: '支付水电费', debit: 0, credit: 5600, explanation: '银行存款减少记贷方。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目660201），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '付款回单', date: '2026-01-19', totalAmount: 5600, payer: '雲帆管理咨询有限公司', payeeName: '北京市供电公司', content: '电费', refNo: 'FK202601190001' }]},
  {
    date: '2026-01-22',
    title: '咨询项目尾款到账确认',
    tags: ['出纳'],
    difficulty: 1,
    description: '确认甲客户支付的咨询项目尾款106,000元已到账，登记银行存款日记账。',
    tip: '项目尾款到账标志该项目资金回笼完成。出纳需与会计核对收款进度。',
    entries: [
      { subjectCode: '100201', summary: '咨询项目尾款到账', debit: 106000, credit: 0, explanation: '银行存款增加记借方。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入——主营业务产生的现金收入。'},
      { subjectCode: '6001', summary: '咨询项目尾款到账', debit: 0, credit: 106000, explanation: '主营业务收入增加记贷方。' }],
    documents: [
      { type: 'bank', label: '银行回单', date: '2026-01-22', totalAmount: 106000, payer: '甲客户', payeeName: '雲帆管理咨询有限公司', content: '咨询项目尾款', refNo: 'HD202601220001' }]},
  {
    date: '2026-01-24',
    title: '现金盘点',
    tags: ['出纳', '期末'],
    difficulty: 1,
    description: '月末进行库存现金盘点。账面现金余额=提取20,000-办公用品1,500-预借差旅9,000-招待费2,000+退回500=8,000元。实存相符。',
    tip: '出纳每月末必须进行现金盘点并编制盘点表。盘点时需有监盘人在场。',
    role: 'cashier',
    entries: [],
    documents: [
      { type: 'text', label: '现金盘点表', docTitle: '2026年1月库存现金盘点表', content: '账面余额8,000元，实存8,000元。盘点结果：账实相符。', signature: '出纳 | 监盘人' }]},
  {
    date: '2026-01-25',
    title: '出纳资金日报编制',
    tags: ['出纳'],
    difficulty: 1,
    description: '编制月末资金日报表，汇总当日资金收支及结余情况。',
    tip: '资金日报反映当日资金变动和结余，是出纳日常工作的重要内容。',
    role: 'cashier',
    entries: [],
    documents: [
      { type: 'text', label: '资金日报表', docTitle: '2026年1月25日资金日报表', content: '当日现金余额8,000元，银行存款余额约943,200元。', signature: '出纳' }]},
  {
    date: '2026-01-27',
    title: '银行对账单核对',
    tags: ['出纳', '期末'],
    difficulty: 1,
    description: '收到工商银行1月份对账单，与企业银行存款日记账逐笔核对，编制余额调节表。',
    tip: '银行对账是出纳月末重要工作。如有未达账项需编制调节表。企业账面与银行对账单经调节应一致。',
    role: 'cashier',
    entries: [],
    documents: [
      { type: 'text', label: '银行对账单', docTitle: '中国工商银行对账单（2026年1月）', content: '期初余额600,000元，收入合计1,139,200元，支出合计796,000元，期末余额943,200元。核对一致。', stampText: '中国工商银行 业务专用章' }]},
  {
    date: '2026-01-31',
    title: '月末票据整理与归档',
    tags: ['出纳', '期末'],
    difficulty: 1,
    description: '整理本月所有收付款凭证、银行回单、支票存根等，按日期顺序装订归档。',
    tip: '出纳需按月整理保管好票据凭证，确保票据完整、排序正确。',
    role: 'cashier',
    entries: [],
    documents: [
      { type: 'text', label: '票据归档清单', docTitle: '2026年1月出纳票据归档登记', content: '银行回单14份，付款审批单8份，现金支票存根1份，其他票据6份，合计29份已装订。', signature: '出纳 | 财务主管' }]},
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
]

export default tasks
