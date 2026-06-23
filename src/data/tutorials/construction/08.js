/**
 * 建筑业 - 08月教学任务（办公楼装饰装修阶段）
 *
 * 企业名称：鼎立建筑工程有限公司
 * 税制：一般纳税人（增值税9%）
 *
 * 本月主题：办公楼装饰装修阶段
 * 重点：装饰分包进场、农民工工资专户、进度款确认
 *
 * 知识点标签：工程合同、工程成本、分包管理、材料管理、机械使用、往来管理、资金管理、工资社保、税费、期末
 */

const tasks = [
  // ═══════════════════════════════════════════════════════════════════
  // 月初：缴纳上月税费及工资（8月1-4日）
  // ═══════════════════════════════════════════════════════════════════
  {
    date: '2026-08-01',
    role: 'accountant',
    title: '缴纳7月增值税及附加税费',
    tags: ['税费'],
    difficulty: 1,
    description: '出纳通过网上申报缴纳7月增值税22,000元，城建税1,540元（22,000×7%），教育费附加660元（22,000×3%+2%），合计24,200元。',
    tip: '缴纳上月增值税时，借记"应交税费-应交增值税"（借方表示预缴/缴纳），同时缴纳的城建税和教育费附加也一并处理。注意：缴纳时只涉及负债科目和银行存款，不影响当期损益。',
    entries: [
      { subjectCode: '222101', debit: 22000, credit: 0, summary: '缴纳7月增值税', explanation: '应交增值税减少22,000元。上期应交增值税在贷方余额，本期缴纳时借记冲减。' },
      { subjectCode: '222103', debit: 1540, credit: 0, summary: '缴纳7月城建税（22,000×7%）', explanation: '应交城建税减少，按增值税额的7%计算缴纳。' },
      { subjectCode: '222104', debit: 660, credit: 0, summary: '缴纳7月教育费附加（22,000×3%+2%）', explanation: '应交教育费附加减少，教育费附加3%+地方教育附加2%合计5%。' },
      { subjectCode: '100201', debit: 0, credit: 24200, summary: '缴纳税款', explanation: '工商银行存款减少24,200元，完成7月税款缴纳。' , cashFlowItem: 'cf-op4', cashFlowExplanation: '缴纳税费支出（配对科目222101），属于"支付的各项税费"——经营活动现金流出。'}],
    documents: [
      { type: 'bank', label: '电子缴税回单', date: '2026-08-01', totalAmount: 24200, payer: '鼎立建筑工程有限公司', payeeName: '国家税务局', content: '7月增值税及附加税费', refNo: 'JS202608010001' }]},
  {
    date: '2026-08-02',
    role: 'accountant',
    title: '缴纳7月社会保险费',
    tags: ['工资社保'],
    difficulty: 1,
    description: '出纳通过银行转账缴纳7月社会保险费35,000元（单位部分）。社保包括养老保险、医疗保险、失业保险、工伤保险和生育保险。',
    tip: '社保单位部分在计提时已计入成本或费用，缴纳时冲减"应付职工薪酬-社保"。出纳需核对社保局出具的缴费通知单金额后再办理转账。',
    entries: [
      { subjectCode: '221102', debit: 35000, credit: 0, summary: '缴纳7月社保单位部分', explanation: '应付职工薪酬-社保减少35,000元。缴纳社保冲减此前计提的负债。' },
      { subjectCode: '100201', debit: 0, credit: 35000, summary: '社保扣款', explanation: '工商银行存款减少35,000元，社保费由银行代扣。' , cashFlowItem: 'cf-op3', cashFlowExplanation: '支付职工薪酬相关支出（配对科目221102），属于"支付给职工以及为职工支付的现金"——经营活动现金流出。'}],
    documents: [
      { type: 'bank', label: '社保缴费回单', date: '2026-08-02', totalAmount: 35000, payer: '鼎立建筑工程有限公司', payeeName: '社会保险基金管理局', content: '7月社保费', refNo: 'SB202608020001' }]},
  {
    date: '2026-08-03',
    role: 'accountant',
    title: '缴纳7月住房公积金',
    tags: ['工资社保'],
    difficulty: 1,
    description: '出纳通过银行转账缴纳7月住房公积金18,000元（单位部分），公积金缴存比例为12%。',
    tip: '住房公积金与社保类似，单位部分在计提时计入成本或费用。缴纳时借记"应付职工薪酬-公积金"，贷记"银行存款"。',
    entries: [
      { subjectCode: '221103', debit: 18000, credit: 0, summary: '缴纳7月公积金单位部分', explanation: '应付职工薪酬-公积金减少18,000元，冲减此前计提的负债。' },
      { subjectCode: '100201', debit: 0, credit: 18000, summary: '公积金扣款', explanation: '工商银行存款减少18,000元。' , cashFlowItem: 'cf-op3', cashFlowExplanation: '支付职工薪酬相关支出（配对科目221103），属于"支付给职工以及为职工支付的现金"——经营活动现金流出。'}],
    documents: [
      { type: 'bank', label: '公积金汇缴回单', date: '2026-08-03', totalAmount: 18000, payer: '鼎立建筑工程有限公司', payeeName: '住房公积金管理中心', content: '7月公积金', refNo: 'GJJ202608030001' }]},
  {
    date: '2026-08-04',
    role: 'accountant',
    title: '发放7月职工工资',
    tags: ['工资社保'],
    difficulty: 2,
    description: '出纳通过银行代发7月职工工资。应发工资120,000元，代扣个人所得税4,800元，实发115,200元。',
    tip: '发放工资时，借"应付职工薪酬-工资"（应发额），贷"银行存款"（实发额）、贷"应交税费-应交所得税"（代扣个税）。代扣的个税需在下月申报缴纳。',
    entries: [
      { subjectCode: '221101', debit: 120000, credit: 0, summary: '发放7月工资（应发额）', explanation: '应付职工薪酬-工资减少120,000元。冲减此前计提的工资负债。' },
      { subjectCode: '100201', debit: 0, credit: 115200, summary: '银行代发工资', explanation: '工商银行存款减少115,200元，为实际发放到员工卡中的金额。' , cashFlowItem: 'cf-op3', cashFlowExplanation: '支付职工薪酬相关支出（配对科目221101），属于"支付给职工以及为职工支付的现金"——经营活动现金流出。'},
      { subjectCode: '222102', debit: 0, credit: 4800, summary: '代扣个人所得税', explanation: '应交所得税增加4,800元。代扣的个税由企业代员工缴纳，形成对税务局的负债。' }],
    documents: [
      { type: 'bank', label: '代发工资回单', date: '2026-08-04', totalAmount: 115200, payer: '鼎立建筑工程有限公司', payeeName: '公司全体员工', content: '7月工资代发', refNo: 'GZ202608040001' }]},

  // ═══════════════════════════════════════════════════════════════════
  // 装饰分包合同签订与备料款预付（8月5-6日）
  // ═══════════════════════════════════════════════════════════════════
  {
    date: '2026-08-05',
    title: '签订装饰装修分包合同',
    tags: ['分包管理', '工程合同'],
    difficulty: 2,
    role: 'accountant',
    description: '与"精艺建筑装饰有限公司"签订办公楼室内装饰装修分包合同，分包合同价款400,000元（不含税），增值税9%。装饰内容包括：墙面地面贴砖、天花吊顶、门窗安装、涂料工程等。合同约定预付备料款30%。',
    tip: '签订分包合同本身不产生会计分录，但需存档合同作为后续业务依据。分包合同应明确工程范围、合同价款、付款节点、质量标准和工期要求。',
    entries: [],
    documents: [
      { type: 'text', label: '分包合同', docTitle: '建设工程分包合同（摘要）', signature: '鼎立建筑：张建设 精艺装饰：刘精艺', content: `总包方：鼎立建筑工程有限公司（甲方）
分包方：精艺建筑装饰有限公司（乙方）

工程名称：恒达地产办公楼装饰装修工程
分包范围：室内装饰装修（含地面、墙面、天花、门窗、涂料）
合同价款：400,000.00元（不含税）
增值税税率：9%
付款方式：预付30%，按进度支付65%，验收合格后付5%

签订日期：2026年8月5日` }]},
  {
    date: '2026-08-06',
    title: '预付装饰分包工程备料款',
    tags: ['分包管理'],
    difficulty: 2,
    role: 'accountant',
    description: '按分包合同约定，预付精艺装饰公司备料款120,000元（分包合同价400,000×30%），通过工商银行转账支付。',
    tip: '预付分包工程款时，借记"预付账款"，贷记"银行存款"。注意：预付账款是资产类科目，待分包工程完工结算后，再从预付账款转入"合同履约成本-分包成本"。',
    entries: [
      { subjectCode: '1123', debit: 120000, credit: 0, summary: '预付装饰分包备料款（400,000×30%）', explanation: '预付账款增加120,000元，形成对分包商的债权。待分包工程完工后冲抵工程款。' },
      { subjectCode: '100201', debit: 0, credit: 120000, summary: '支付预付备料款', explanation: '工商银行存款减少120,000元，支付给分包商的预付款。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目1123），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '转账回单', date: '2026-08-06', totalAmount: 120000, payer: '鼎立建筑工程有限公司', payeeName: '精艺建筑装饰有限公司', content: '办公楼装饰工程备料款', refNo: 'ZF202608060001' }]},
  {
    date: '2026-08-06',
    role: 'accountant',
    title: '申请银行汇票备付材料采购',
    tags: ['资金管理'],
    difficulty: 1,
    description: '为采购装饰材料，向工商银行申请签发银行汇票60,000元，用于向材料供应商付款。银行汇票保证金已从其账户扣划。',
    tip: '申请银行汇票时，资金从银行存款转入"银行汇票"科目。借记"银行汇票"，贷记"银行存款"。银行汇票属于其他货币资金，是企业持有的支付凭证。',
    entries: [
      { subjectCode: '101201', debit: 60000, credit: 0, summary: '银行汇票增加', explanation: '银行汇票是其他货币资金的一种，增加60,000元。' },
      { subjectCode: '100201', debit: 0, credit: 60000, summary: '银行汇票保证金扣划', explanation: '工商银行存款减少60,000元，转为银行汇票保证金。' }],
    documents: [
      { type: 'bank', label: '银行汇票申请书', date: '2026-08-06', totalAmount: 60000, payer: '鼎立建筑工程有限公司', payeeName: '鼎立建筑工程有限公司', content: '申请签发银行汇票', refNo: 'HP202608060001' }]},

  // ═══════════════════════════════════════════════════════════════════
  // 出纳日常：备用金与现金盘点（8月7日）
  // ═══════════════════════════════════════════════════════════════════
  {
    date: '2026-08-07',
    role: 'accountant',
    title: '提取备用金',
    tags: ['出纳'],
    difficulty: 1,
    description: '出纳从工商银行提取备用金10,000元，用于日常零星开支及小额费用支付。',
    tip: '提取备用金：借记"库存现金"，贷记"银行存款"。备用金金额根据企业日常零星开支额度确定，一般满足3-5天需求即可。出纳需妥善保管现金并逐笔登记现金日记账。',
    entries: [
      { subjectCode: '1001', debit: 10000, credit: 0, summary: '提取备用金', explanation: '库存现金增加10,000元，用于日常小额支付。' },
      { subjectCode: '100201', debit: 0, credit: 10000, summary: '银行取现', explanation: '工商银行存款减少10,000元，提取现金备用。' }],
    documents: [
      { type: 'bank', label: '现金支票存根', date: '2026-08-07', totalAmount: 10000, payer: '鼎立建筑工程有限公司', payeeName: '鼎立建筑工程有限公司', content: '备用金', refNo: 'XJ202608070001' }]},
  {
    date: '2026-08-07',
    role: 'accountant',
    title: '购买转账支票及财务用品',
    tags: ['出纳'],
    difficulty: 1,
    description: '出纳到工商银行购买转账支票1本（25张），支付工本费200元，以现金支付。',
    tip: '购买支票的工本费计入管理费用，借记"管理费用"，贷记"库存现金"。支票是出纳日常使用的支付结算工具，使用完毕后需到银行购买新支票簿。',
    entries: [
      { subjectCode: '660201', debit: 200, credit: 0, summary: '购买转账支票工本费', explanation: '管理费用增加200元。支票工本费是银行收取的行政管理性质费用。' },
      { subjectCode: '1001', debit: 0, credit: 200, summary: '现金支付工本费', explanation: '库存现金减少200元，以备用金支付支票工本费。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目660201），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '银行收费凭证', date: '2026-08-07', items: [{ label: '转账支票工本费（25张）', amount: 200 }], totalAmount: 200, stampText: '中国工商银行收费专用章' }]},

  // ═══════════════════════════════════════════════════════════════════
  // 材料采购与农民工工资专户（8月8-10日）
  // ═══════════════════════════════════════════════════════════════════
  {
    date: '2026-08-08',
    title: '装饰材料采购入库',
    tags: ['材料管理', '工程成本'],
    difficulty: 2,
    role: 'accountant',
    description: '向丙公司采购装饰用瓷砖、卫浴、涂料等材料，价款120,000元（不含税），增值税13%（15,600元），材料已验收入库，款项未付。',
    tip: '建筑业材料采购直接记入"合同履约成本-材料成本"，不同于制造业先入原材料仓库。取得的增值税专用发票进项税额可抵扣销项税额。',
    entries: [
      { subjectCode: '540102', debit: 120000, credit: 0, summary: '购入装饰材料（瓷砖、卫浴、涂料等）', explanation: '材料成本直接计入合同履约成本-材料成本。装饰工程的材料费直接归集到该项目成本中。' },
      { subjectCode: '222101', debit: 15600, credit: 0, summary: '增值税进项税额（120,000×13%）', explanation: '取得增值税专用发票，进项税额15,600元可用于抵扣当期销项税额。' },
      { subjectCode: '220201', debit: 0, credit: 135600, summary: '应付账款-丙公司（材料商）', explanation: '对丙公司形成应付账款135,600元，其中材料款120,000元，增值税15,600元。' }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', date: '2026-08-08', region: '江苏省', invoiceNo: '3200260808', buyer: '鼎立建筑工程有限公司', seller: '丙公司', lineItems: [{ name: '抛光瓷砖', qty: 500, unit: '平方米', price: 160, amount: 80000 }, { name: '环保涂料', qty: 100, unit: '桶', price: 400, amount: 40000 }], totalAmount: 135600 }]},
  {
    date: '2026-08-08',
    title: '缴存农民工工资专户资金',
    tags: ['工资社保'],
    difficulty: 2,
    role: 'accountant',
    description: '根据《保障农民工工资支付条例》要求，将本月农民工工资资金80,000元从工商银行基本户转入建设银行农民工工资专用账户，专项用于发放农民工工资。',
    tip: '农民工工资专户是建筑业特色账户。资金从基本户转入专户时，借记"银行存款-建设银行（专户）"，贷记"银行存款-工商银行"。专户资金专款专用，不得挪作他用。',
    entries: [
      { subjectCode: '100202', debit: 80000, credit: 0, summary: '农民工工资专户转入', explanation: '建设银行农民工工资专户增加80,000元，该资金定向用于支付农民工工资。' },
      { subjectCode: '100201', debit: 0, credit: 80000, summary: '基本户转出', explanation: '工商银行基本户减少80,000元，资金转入农民工工资专户。' }],
    documents: [
      { type: 'bank', label: '网银转账回单', date: '2026-08-08', totalAmount: 80000, payer: '鼎立建筑工程有限公司（工行）', payeeName: '鼎立建筑工程有限公司（建行专户）', content: '农民工工资专户资金划转', refNo: 'ZZ202608080001' }]},
  {
    date: '2026-08-09',
    role: 'accountant',
    title: '通过专户发放农民工工资',
    tags: ['工资社保'],
    difficulty: 2,
    description: '出纳通过建设银行农民工工资专用账户发放本月农民工工资75,000元。工人包括：贴砖班组10人、油漆班组6人、吊顶班组5人，共21人。工资已直接发放到工人个人银行卡中。',
    tip: '从专户发放农民工工资时，借记"应付职工薪酬-工资"，贷记"银行存款-建设银行（专户）"。专户发放工资后余额为5,000元。注意：专户资金只能用于发放工资，不得提取现金。',
    entries: [
      { subjectCode: '221101', debit: 75000, credit: 0, summary: '发放8月农民工工资', explanation: '应付职工薪酬-工资减少75,000元。农民工工资通过专户发放。' },
      { subjectCode: '100202', debit: 0, credit: 75000, summary: '专户代发农民工工资', explanation: '建设银行专户减少75,000元，工资已发至农民工个人银行卡。' , cashFlowItem: 'cf-op3', cashFlowExplanation: '支付职工薪酬相关支出（配对科目221101），属于"支付给职工以及为职工支付的现金"——经营活动现金流出。'}],
    documents: [
      { type: 'bank', label: '专户代发工资回单', date: '2026-08-09', totalAmount: 75000, payer: '鼎立建筑工程有限公司（建行专户）', payeeName: '农民工工资代发户（21人）', content: '8月农民工工资发放', refNo: 'GZ202608090001' }]},
  {
    date: '2026-08-10',
    role: 'accountant',
    title: '支付装饰材料供应商货款',
    tags: ['材料管理'],
    difficulty: 1,
    description: '出纳通过网银支付丙公司装饰材料采购款135,600元（含增值税），结清8月8日采购欠款。',
    tip: '支付应付账款时，借记"应付账款"，贷记"银行存款"。出纳需核对采购发票、入库单和付款申请单，确保金额一致后方可付款。',
    entries: [
      { subjectCode: '220201', debit: 135600, credit: 0, summary: '支付丙公司材料款', explanation: '应付账款-丙公司减少135,600元，清偿对材料供应商的债务。' },
      { subjectCode: '100201', debit: 0, credit: 135600, summary: '网银转账支付', explanation: '工商银行存款减少135,600元，通过网银支付材料采购款。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目220201），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '网银转账回单', date: '2026-08-10', totalAmount: 135600, payer: '鼎立建筑工程有限公司', payeeName: '丙公司', content: '装饰材料采购款', refNo: 'ZF202608100001' }]},

  // ═══════════════════════════════════════════════════════════════════
  // 分包施工与进度款确认（8月11-15日）
  // ═══════════════════════════════════════════════════════════════════
  {
    date: '2026-08-11',
    title: '装饰分包进场施工确认',
    tags: ['分包管理', '工程成本'],
    difficulty: 2,
    role: 'accountant',
    description: '精艺装饰公司正式进场施工，本月已完成部分装饰基层工作（墙面找平、管线预埋等），经项目部验收合格确认工程量80,000元。按照合同，从预付备料款中抵扣50,000元，余款30,000元待付。',
    tip: '分包工程完工后，确认分包成本：借记"合同履约成本-分包成本"，按结算金额贷记"预付账款"（冲抵预付）和"应付账款"（剩余应付）。分包成本是建筑业工程成本的重要组成部分。',
    entries: [
      { subjectCode: '540103', debit: 80000, credit: 0, summary: '确认装饰分包工程成本', explanation: '分包成本增加80,000元，为装饰分包本月完成工程量。' },
      { subjectCode: '1123', debit: 0, credit: 50000, summary: '冲抵预付备料款', explanation: '预付账款减少50,000元，预付备料款按工程量比例冲抵。' },
      { subjectCode: '220202', debit: 0, credit: 30000, summary: '应付账款-精艺装饰', explanation: '应付账款-丁公司（精艺装饰）增加30,000元，未付工程款。' }],
    documents: [
      { type: 'text', label: '分包工程量确认单', docTitle: '分包工程进度确认单', content: '分包单位：精艺建筑装饰有限公司。本月完成：墙面找平、管线预埋等基层工作。确认工程量80,000元。抵扣预付款50,000元，应付30,000元。', signature: '项目部：孙经理 分包方：刘精艺 监理：李监理' }]},
  {
    date: '2026-08-12',
    title: '月度工程进度确认及开票',
    tags: ['工程合同', '税费'],
    difficulty: 3,
    role: 'accountant',
    description: '办公楼装饰装修工程本月进度完成10%，累计完成85%。按完工百分比法确认工程收入550,000元（不含税），增值税销项税额49,500元（550,000×9%），向甲方开具增值税专用发票。',
    tip: '进度确认时：借记"合同资产"，贷记"主营业务收入"和"应交税费-应交增值税（销项税额）"。合同资产是用来核算已确认收入但尚未收款的权利，待达到收款条件时转入应收账款。',
    entries: [
      { subjectCode: '1208', debit: 599500, credit: 0, summary: '确认工程进度款债权', explanation: '合同资产增加599,500元。已完工但尚未收取的进度款，属于合同资产（非无条件收款权）。' },
      { subjectCode: '6001', debit: 0, credit: 550000, summary: '确认8月主营业务收入', explanation: '按完工百分比法确认收入550,000元。截至8月累计确认4,250,000元（85%）。' },
      { subjectCode: '222101', debit: 0, credit: 49500, summary: '增值税销项税额（550,000×9%）', explanation: '应交增值税-销项税额增加49,500元。开具增值税专用发票后即产生纳税义务。' }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', date: '2026-08-12', region: '江苏省', invoiceNo: '3200260812', buyer: '恒达地产有限公司', seller: '鼎立建筑工程有限公司', lineItems: [{ name: '办公楼装饰装修工程进度款', qty: 1, unit: '项', price: 550000, amount: 550000 }], totalAmount: 599500 },
      { type: 'text', label: '工程进度确认单', docTitle: '工程完工进度确认单', signature: '恒达地产：王甲方 鼎立建筑：张建设 监理：李监理', content: `截至2026年8月，办公楼工程累计完成85%。
本月（8月）完成装饰装修工程10%。
累计已确认收入：4,250,000元。
本月确认收入：550,000元。
合同总价：5,000,000元（不含税）。` }]},
  {
    date: '2026-08-13',
    role: 'accountant',
    title: '收到甲方装饰阶段进度款',
    tags: ['往来管理'],
    difficulty: 1,
    description: '收到恒达地产支付的本月工程进度款599,500元，款项已到工商银行账户。该款项对应8月12日开具的工程进度发票。',
    tip: '收到进度款时，借记"银行存款"，贷记"合同资产"。合同资产在收款时转销，表明收款权已实现。出纳需及时确认到账并登记银行日记账。',
    entries: [
      { subjectCode: '100201', debit: 599500, credit: 0, summary: '收到甲方装饰阶段进度款', explanation: '工商银行存款增加599,500元，收到工程进度款。' , cashFlowItem: 'cf-op5', cashFlowExplanation: '其他经营活动现金流入（配对科目1208），属于"收到其他与经营活动有关的现金"。'},
      { subjectCode: '1208', debit: 0, credit: 599500, summary: '冲减合同资产', explanation: '合同资产减少599,500元。款项已收回，合同资产转销。' }],
    documents: [
      { type: 'bank', label: '银行进账回单', date: '2026-08-13', totalAmount: 599500, payer: '恒达地产有限公司', payeeName: '鼎立建筑工程有限公司', content: '办公楼装饰阶段进度款', refNo: 'HD202608130001' }]},

  // ═══════════════════════════════════════════════════════════════════
  // 机械租赁与现场费用（8月14-16日）
  // ═══════════════════════════════════════════════════════════════════
  {
    date: '2026-08-14',
    title: '租赁装饰用脚手架及电动工具',
    tags: ['机械使用', '工程成本'],
    difficulty: 2,
    role: 'accountant',
    description: '向租赁公司租赁装饰工程用移动脚手架、电锤、切割机等设备，本月租金20,000元，已通过工商银行转账支付。',
    tip: '施工机械及工具租赁费直接记入"合同履约成本-机械使用费"。装饰阶段使用的设备以中小型工具为主，租赁费是工程直接成本的一部分。',
    entries: [
      { subjectCode: '540104', debit: 20000, credit: 0, summary: '脚手架及电动工具租赁费', explanation: '机械使用费增加20,000元，为装饰工程租用设备的费用。' },
      { subjectCode: '100201', debit: 0, credit: 20000, summary: '支付设备租赁费', explanation: '工商银行存款减少20,000元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目540104），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '转账回单', date: '2026-08-14', totalAmount: 20000, payer: '鼎立建筑工程有限公司', payeeName: '鑫源租赁有限公司', content: '装饰工程设备租赁费', refNo: 'ZF202608140001' }]},
  {
    date: '2026-08-15',
    role: 'accountant',
    title: '微信支付采购零星装饰工具',
    tags: ['材料管理'],
    difficulty: 1,
    description: '施工现场需要一批零星工具（美工刀、水平尺、线锤、胶枪等），采购金额5,000元，通过微信支付方式结算。',
    tip: '通过微信支付采购小额材料的，借记"合同履约成本-材料成本"，贷记"微信支付"。微信支付属于其他货币资金，核算时需注意与银行存款区分。',
    entries: [
      { subjectCode: '540102', debit: 5000, credit: 0, summary: '采购零星装饰工具', explanation: '材料成本增加5,000元，零星工具直接计入工程材料成本。' },
      { subjectCode: '101204', debit: 0, credit: 5000, summary: '微信支付', explanation: '微信支付减少5,000元。通过第三方支付平台结算，需与微信账单核对。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目540102），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '微信支付凭证', date: '2026-08-15', items: [{ label: '装饰工具一批（美工刀、水平尺等）', amount: 5000 }], totalAmount: 5000, stampText: '收款方电子凭证' }]},

  // ═══════════════════════════════════════════════════════════════════
  // 工资社保计提与发放（8月17-19日）
  // ═══════════════════════════════════════════════════════════════════
  {
    date: '2026-08-17',
    title: '计提8月职工薪酬',
    tags: ['工程成本', '工资社保'],
    difficulty: 2,
    role: 'accountant',
    description: '计提8月职工工资：施工人员（含农民工）65,000元，项目部管理人员28,000元，公司管理人员22,000元。合计115,000元。',
    tip: '直接施工人员工资记入"合同履约成本-人工成本"，项目部管理人员工资记入"合同履约成本-间接费用"，公司管理人员工资记入"管理费用"。工资当月计提，次月发放。',
    entries: [
      { subjectCode: '540101', debit: 65000, credit: 0, summary: '施工人员工资（含农民工）', explanation: '直接人工是工程成本的核心构成，施工人员工资计入合同履约成本-人工成本。' },
      { subjectCode: '540106', debit: 28000, credit: 0, summary: '项目部管理人员工资', explanation: '项目部管理人员工资属于间接费用，计入合同履约成本-间接费用。' },
      { subjectCode: '660201', debit: 22000, credit: 0, summary: '公司管理人员工资', explanation: '公司行政管理人员工资计入管理费用。' },
      { subjectCode: '221101', debit: 0, credit: 115000, summary: '应付职工薪酬-工资', explanation: '应付职工薪酬增加115,000元，形成对职工的工资负债。' }],
    documents: [
      { type: 'text', label: '工资汇总表', docTitle: '2026年8月工资汇总表', content: '施工人员（含农民工21人）65,000元；项目部管理人员（5人）28,000元；公司管理人员（4人）22,000元。合计115,000元。', signature: '王人事' }]},
  {
    date: '2026-08-18',
    role: 'accountant',
    title: '支付装饰分包进度款',
    tags: ['分包管理'],
    difficulty: 1,
    description: '出纳通过网银支付精艺装饰公司本月分包工程余款30,000元（对应8月11日确认的工程量余款）。',
    tip: '支付分包工程款时，借记"应付账款"，贷记"银行存款"。出纳需确认分包工程量确认单和发票齐全后方可付款。',
    entries: [
      { subjectCode: '220202', debit: 30000, credit: 0, summary: '支付精艺装饰分包款', explanation: '应付账款-丁公司（精艺装饰）减少30,000元，支付分包工程余款。' },
      { subjectCode: '100201', debit: 0, credit: 30000, summary: '网银支付分包款', explanation: '工商银行存款减少30,000元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目220202），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '转账回单', date: '2026-08-18', totalAmount: 30000, payer: '鼎立建筑工程有限公司', payeeName: '精艺建筑装饰有限公司', content: '装饰分包工程进度款', refNo: 'ZF202608180001' }]},
  {
    date: '2026-08-19',
    title: '计提8月社会保险费及住房公积金',
    tags: ['工资社保'],
    difficulty: 2,
    role: 'accountant',
    description: '计提8月社会保险费（单位部分）36,000元和住房公积金（单位部分）12,000元，合计48,000元。按人员类别分配：施工人员27,000元，项目部管理人员12,000元，公司管理人员9,000元。',
    tip: '社保和公积金按受益对象分配：施工人员（含农民工）部分计入"合同履约成本-人工成本"，项目部管理人员部分计入"合同履约成本-间接费用"，公司管理人员部分计入"管理费用"。',
    entries: [
      { subjectCode: '540101', debit: 27000, credit: 0, summary: '施工人员社保及公积金', explanation: '施工人员社保公积金计入人工成本，属于工程直接成本。' },
      { subjectCode: '540106', debit: 12000, credit: 0, summary: '项目部管理人员社保及公积金', explanation: '项目部管理人员社保公积金计入间接费用。' },
      { subjectCode: '660201', debit: 9000, credit: 0, summary: '公司管理人员社保及公积金', explanation: '公司管理人员社保公积金计入管理费用。' },
      { subjectCode: '221102', debit: 0, credit: 36000, summary: '应付职工薪酬-社保', explanation: '应付社保增加36,000元，形成对社保局的负债。' },
      { subjectCode: '221103', debit: 0, credit: 12000, summary: '应付职工薪酬-公积金', explanation: '应付公积金增加12,000元，形成对公积金中心的负债。' }],
    documents: [
      { type: 'text', label: '社保公积金计提表', docTitle: '2026年8月社保公积金计提明细表', content: '社保（单位）36,000元，公积金（单位）12,000元，合计48,000元。按部门分配：施工人员27,000元（计入人工成本），项目部12,000元（计入间接费用），公司管理9,000元（计入管理费用）。', signature: '赵会计' }]},

  // ═══════════════════════════════════════════════════════════════════
  // 折旧与费用支付（8月20-25日）
  // ═══════════════════════════════════════════════════════════════════
  {
    date: '2026-08-20',
    title: '计提8月固定资产折旧',
    tags: ['机械使用', '工程成本'],
    difficulty: 2,
    role: 'accountant',
    description: '本月应计提折旧：运输车辆折旧5,000元（用于装饰材料运输），办公设备折旧2,000元。合计7,000元。',
    tip: '用于施工的固定资产折旧计入工程成本（合同履约成本-机械使用费），行政管理用的折旧计入管理费用。固定资产当月增加、下月开始计提折旧。',
    entries: [
      { subjectCode: '540104', debit: 5000, credit: 0, summary: '运输车辆折旧（工程用）', explanation: '运输车辆用于工程材料运输，折旧费计入机械使用费。' },
      { subjectCode: '660201', debit: 2000, credit: 0, summary: '办公设备折旧（管理用）', explanation: '办公设备用于行政管理，折旧费计入管理费用。' },
      { subjectCode: '1602', debit: 0, credit: 7000, summary: '计提累计折旧', explanation: '累计折旧增加7,000元，反映固定资产价值损耗。' }],
    documents: [
      { type: 'text', label: '折旧计算表', docTitle: '固定资产折旧计算表（2026年8月）', content: '直线法折旧。运输车辆（原值120万，月折旧5,000元）；办公设备（原值48万，月折旧2,000元）。合计7,000元。', signature: '赵会计' }]},
  {
    date: '2026-08-21',
    role: 'accountant',
    title: '支付现场水电费及办公费',
    tags: ['往来管理'],
    difficulty: 1,
    description: '支付8月施工现场水电费5,000元、办公场所水电及办公费3,500元，合计8,500元，已通过工商银行转账支付。',
    tip: '施工现场水电费计入"合同履约成本-间接费用"，办公场所水电费计入"管理费用"。费用性质取决于受益对象，工程相关与行政管理需分开核算。',
    entries: [
      { subjectCode: '540106', debit: 5000, credit: 0, summary: '施工现场水电费', explanation: '施工现场水电费属于间接费用，计入合同履约成本。' },
      { subjectCode: '660201', debit: 3500, credit: 0, summary: '办公场所水电及办公费', explanation: '办公场所费用计入管理费用，属于行政管理部门支出。' },
      { subjectCode: '100201', debit: 0, credit: 8500, summary: '转账支付', explanation: '工商银行存款减少8,500元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目540106），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '水电费缴费凭证', date: '2026-08-21', items: [{ label: '施工现场水电费', amount: 5000 }, { label: '办公场所水电费', amount: 3500 }], totalAmount: 8500, stampText: '收款单位财务专用章' }]},
  {
    date: '2026-08-22',
    title: '报销项目部管理人员差旅费',
    tags: ['工程成本'],
    difficulty: 1,
    role: 'accountant',
    description: '项目经理孙经理到外省考察装饰材料市场，报销差旅费4,800元（交通费2,200元、住宿费1,600元、餐补1,000元），以现金支付。',
    tip: '工程管理人员差旅费记入"合同履约成本-其他直接费用"。与工程直接相关的差旅支出属于工程成本，与行政管理无关。',
    entries: [
      { subjectCode: '540105', debit: 4800, credit: 0, summary: '孙经理差旅费（材料市场考察）', explanation: '其他直接费用增加4,800元。考察装饰材料市场的差旅费与工程直接相关。' },
      { subjectCode: '1001', debit: 0, credit: 4800, summary: '现金报销差旅费', explanation: '库存现金减少4,800元，以备用金支付差旅报销。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目540105），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '差旅费报销单', date: '2026-08-22', items: [{ label: '交通费（飞机+市内交通）', amount: 2200 }, { label: '住宿费（3晚）', amount: 1600 }, { label: '出差补贴（3天）', amount: 1000 }], totalAmount: 4800, stampText: '鼎立建筑工程有限公司财务专用章' }]},
  {
    date: '2026-08-24',
    title: '摊销临时设施费用',
    tags: ['工程成本'],
    difficulty: 2,
    role: 'accountant',
    description: '本月摊销临时设施费用10,000元。临时设施（工地围挡、临时办公用房、临时仓库等）原值60,000元，按6个月摊销。',
    tip: '临时设施费用通过"长期待摊费用"科目核算，按月摊销计入"合同履约成本-间接费用"。临时设施是施工企业特有的资产，完工后需拆除。',
    entries: [
      { subjectCode: '540106', debit: 10000, credit: 0, summary: '摊销临时设施费用（60,000÷6）', explanation: '间接费用增加10,000元。临时设施按期摊销计入工程成本。' },
      { subjectCode: '1901', debit: 0, credit: 10000, summary: '长期待摊费用减少', explanation: '长期待摊费用减少10,000元，反映临时设施价值的逐步消耗。' }],
    documents: [
      { type: 'text', label: '摊销计算表', docTitle: '长期待摊费用摊销表', content: '临时设施原值60,000元，摊销期6个月，月摊销10,000元。截至本月已摊销4个月，余额20,000元。', signature: '赵会计' }]},
  {
    date: '2026-08-25',
    role: 'accountant',
    title: '支付现场保安保洁服务费',
    tags: ['工程成本'],
    difficulty: 1,
    description: '支付8月施工现场保安和保洁服务费6,000元，已通过银行转账支付给物业公司。',
    tip: '现场保安保洁费属于施工现场管理支出，计入"合同履约成本-间接费用"。施工现场的管理服务支出是间接费用的重要组成部分。',
    entries: [
      { subjectCode: '540106', debit: 6000, credit: 0, summary: '现场保安保洁服务费', explanation: '间接费用增加6,000元。保安保洁服务为施工现场管理所需。' },
      { subjectCode: '100201', debit: 0, credit: 6000, summary: '银行转账支付', explanation: '工商银行存款减少6,000元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目540106），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '转账回单', date: '2026-08-25', totalAmount: 6000, payer: '鼎立建筑工程有限公司', payeeName: 'XX物业服务有限公司', content: '8月保安保洁服务费', refNo: 'ZF202608250001' }]},
  {
    date: '2026-08-25',
    role: 'accountant',
    title: '购入办公用品',
    tags: ['往来管理'],
    difficulty: 1,
    description: '行政部购入办公用品一批（打印纸、墨盒、文件夹等），金额2,800元，以现金支付。',
    tip: '办公用品计入"管理费用-办公费"。小额办公用品直接费用化；大额耐用办公设备应作为固定资产处理。',
    entries: [
      { subjectCode: '660201', debit: 2800, credit: 0, summary: '购入办公用品', explanation: '管理费用增加2,800元。办公用品属于行政管理支出。' },
      { subjectCode: '1001', debit: 0, credit: 2800, summary: '现金支付', explanation: '库存现金减少2,800元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目660201），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '办公用品发票', date: '2026-08-25', items: [{ label: '打印纸5箱', amount: 1500 }, { label: '墨盒3个', amount: 900 }, { label: '文件夹及其他', amount: 400 }], totalAmount: 2800, stampText: '得力办公用品店发票专用章' }]},

  // ═══════════════════════════════════════════════════════════════════
  // 税金计算与资金业务（8月26-27日）
  // ═══════════════════════════════════════════════════════════════════
  {
    date: '2026-08-26',
    title: '计提8月城建税及教育费附加',
    tags: ['税费'],
    difficulty: 2,
    role: 'accountant',
    description: '计提8月城建税及教育费附加。本月销项税额49,500元，进项税额15,600元（材料采购），应纳增值税33,900元。城建税=33,900×7%=2,373元，教育费附加=33,900×3%=1,017元，地方教育附加=33,900×2%=678元。合计4,068元。',
    tip: '城建税和教育费附加以应纳增值税为计税依据，计入"税金及附加"。月末计提时：借"税金及附加"，贷"应交税费-应交城建税/教育费附加"。下月初申报缴纳。',
    entries: [
      { subjectCode: '6403', debit: 4068, credit: 0, summary: '计提8月城建税及附加', explanation: '税金及附加增加4,068元。以应纳增值税33,900元为基数，合计税率12%。' },
      { subjectCode: '222103', debit: 0, credit: 2373, summary: '应交城建税（33,900×7%）', explanation: '城建税按增值税额7%计算，形成对税务局的负债。' },
      { subjectCode: '222104', debit: 0, credit: 1695, summary: '应交教育费附加（33,900×5%）', explanation: '教育费附加3%（1,017元）+地方教育附加2%（678元），合计5%。' }],
    documents: [
      { type: 'text', label: '税费计算表', docTitle: '2026年8月增值税及附加税费计算表', content: `销项税额：49,500元
进项税额：15,600元
应纳增值税：33,900元
城建税（7%）：2,373元
教育费附加（3%）：1,017元
地方教育附加（2%）：678元
附加合计：4,068元`, signature: '赵会计' }]},
  {
    date: '2026-08-26',
    role: 'accountant',
    title: '通过银行汇票支付材料采购欠款',
    tags: ['材料管理'],
    difficulty: 2,
    description: '将此前申请的面额60,000元银行汇票背书转让给丙公司，用于支付装饰材料采购欠款。',
    tip: '使用银行汇票支付欠款时，借记"应付账款"，贷记"银行汇票"。银行汇票背书转让后，企业对银行的债权减少。',
    entries: [
      { subjectCode: '220201', debit: 60000, credit: 0, summary: '银行汇票支付丙公司材料款', explanation: '应付账款-丙公司减少60,000元，以银行汇票清偿债务。' },
      { subjectCode: '101201', debit: 0, credit: 60000, summary: '银行汇票背书转让', explanation: '银行汇票减少60,000元。汇票转让给供应商后，其他货币资金减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目220201），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '银行汇票背书转让凭证', date: '2026-08-26', totalAmount: 60000, payer: '鼎立建筑工程有限公司', payeeName: '丙公司', content: '支付材料采购款', refNo: 'HP202608260001' }]},
  {
    date: '2026-08-27',
    role: 'accountant',
    title: '收到银行存款利息',
    tags: ['出纳'],
    difficulty: 1,
    description: '收到工商银行8月活期存款利息5,200元，银行已自动入账。出纳确认利息收入并登记银行存款日记账。',
    tip: '存款利息收入冲减"财务费用"，而非计入营业收入。分录：借记"银行存款"，贷记"财务费用"。利息收入用贷方负数表示费用的减少。',
    entries: [
      { subjectCode: '100201', debit: 5200, credit: 0, summary: '8月存款利息', explanation: '工商银行存款增加5,200元，银行自动结息入账。' , cashFlowItem: 'cf-op5', cashFlowExplanation: '其他经营活动现金流入（配对科目6603），属于"收到其他与经营活动有关的现金"。'},
      { subjectCode: '6603', debit: 0, credit: 5200, summary: '冲减财务费用', explanation: '财务费用减少5,200元。存款利息冲减财务费用，贷方表示费用减少。' }],
    documents: [
      { type: 'bank', label: '利息入账回单', date: '2026-08-27', totalAmount: 5200, payer: '中国工商银行', payeeName: '鼎立建筑工程有限公司', content: '2026年8月活期存款利息', refNo: 'LX202608270001' }]},

  // ═══════════════════════════════════════════════════════════════════
  // 月末：成本结转与损益结转（8月28-29日）
  // ═══════════════════════════════════════════════════════════════════
  {
    date: '2026-08-28',
    title: '月末结转合同履约成本至主营业务成本',
    tags: ['工程成本', '期末'],
    difficulty: 3,
    role: 'accountant',
    description: '月末按完工百分比法结转本月已完工程对应的合同履约成本380,000元至主营业务成本。本月各项成本合计约381,800元，按完工进度10%对应约380,000元准予结转（少量材料未耗用留存在科目余额中）。',
    tip: '月末将已完工程对应的合同履约成本转入主营业务成本。施工企业"合同履约成本"科目借方余额反映在建工程已发生但未结转的成本（类似制造业的"生产成本"）。',
    entries: [
      { subjectCode: '6401', debit: 380000, credit: 0, summary: '结转主营业务成本', explanation: '主营业务成本增加380,000元。按完工进度10%结转合同履约成本。' },
      { subjectCode: '540101', debit: 0, credit: 92000, summary: '结转人工成本', explanation: '人工成本结转：施工工资65,000+施工社保公积金27,000=92,000元。' },
      { subjectCode: '540102', debit: 0, credit: 123000, summary: '结转材料成本', explanation: '材料成本结转：采购120,000+零星工具5,000-未耗用2,000=123,000元。' },
      { subjectCode: '540103', debit: 0, credit: 80000, summary: '结转分包成本', explanation: '结转分包成本80,000元，为精艺装饰公司已完成工程量。' },
      { subjectCode: '540104', debit: 0, credit: 25000, summary: '结转机械使用费', explanation: '机械使用费结转：租赁费20,000+运输车辆折旧5,000=25,000元。' },
      { subjectCode: '540105', debit: 0, credit: 4800, summary: '结转其他直接费用', explanation: '其他直接费用结转：差旅费4,800元。' },
      { subjectCode: '540106', debit: 0, credit: 55200, summary: '结转间接费用', explanation: '间接费用结转：项目管理人员工资28,000+社保公积金12,000+水电费5,000+摊销10,000+保安费6,000-未吸收4,800=55,200元。' }],
    documents: [
      { type: 'text', label: '成本结转计算表', docTitle: '合同履约成本结转计算表', content: `本月成本合计：387,800元
人工92,000+材料125,000+分包80,000+机械25,000+其他4,800+间接61,000=387,800
按完工进度10%对应结转主营业务成本：380,000元
未结转余额：7,800元（材料2,000+间接5,800未吸收部分）`, signature: '赵会计' }]},
  {
    date: '2026-08-29',
    title: '月末结转损益类科目',
    tags: ['期末'],
    difficulty: 3,
    role: 'accountant',
    description: '月末结转各损益类科目余额至本年利润。本月主营业务收入550,000元，财务费用（净收入）4,850元；费用类：主营业务成本380,000元，税金及附加4,068元，管理费用39,500元。',
    tip: '月末将各损益类科目余额转入本年利润。收入类余额从借方转出（余额归零），费用类余额从贷方转出（余额归零）。差额为税前利润。如有财务费用贷方余额（利息收入>手续费），应从借方转出增加利润。',
    entries: [
      { subjectCode: '6001', debit: 550000, credit: 0, summary: '结转主营业务收入', explanation: '主营业务收入余额转出，收入类科目结转后余额为零。' },
      { subjectCode: '6603', debit: 5200, credit: 0, summary: '结转财务费用（净利息收入）', explanation: '财务费用净贷方余额（利息收入5,200-手续费350=4,850）从借方转出，增加本年利润。' },
      { subjectCode: '6401', debit: 0, credit: 380000, summary: '结转主营业务成本', explanation: '主营业务成本380,000元结转至本年利润，余额归零。' },
      { subjectCode: '6403', debit: 0, credit: 4068, summary: '结转税金及附加', explanation: '税金及附加4,068元结转至本年利润，余额归零。' },
      { subjectCode: '660201', debit: 0, credit: 42000, summary: '结转管理费用', explanation: '管理费用39,500元结转至本年利润，余额归零。明细：工资22,000+社保公积金9,000+折旧2,000+水电办公3,500+支票工本费200+办公用品2,800=39,500元。' },
      { subjectCode: '4103', debit: 0, credit: 129132, summary: '费用类科目转入本年利润', explanation: '管理费用39,500+税金及附加4,068+主营业务成本380,000=423,568元。' }
    ],
    documents: [
      { type: 'text', label: '损益结转计算表', docTitle: '2026年8月损益结转计算表', signature: '赵会计', content: `收入类：
  主营业务收入：550,000元
  财务费用（净收入）：4,850元
  收入合计：554,850元

费用类：
  主营业务成本：380,000元
  税金及附加：4,068元
  管理费用：39,500元
  费用合计：423,568元

利润总额：554,850-423,568=131,282元` }]},

  // ═══════════════════════════════════════════════════════════════════
  // 月末：所得税与净利润（8月30日）
  // ═══════════════════════════════════════════════════════════════════
  {
    date: '2026-08-30',
    title: '计提并结转企业所得税',
    tags: ['税费', '期末'],
    difficulty: 2,
    role: 'accountant',
    description: '本月利润总额131,282元，按25%计提企业所得税32,820.50元。再将所得税费用结转至本年利润。净利润=131,282-32,820.50=98,461.50元。',
    tip: '计提所得税：借"所得税费用"贷"应交税费-应交所得税"。结转所得税：借"本年利润"贷"所得税费用"。这两笔分录需在损益结转之后、净利润结转之前完成。',
    entries: [
      { subjectCode: '6801', debit: 32820.50, credit: 0, summary: '计提本月所得税（131,282×25%）', explanation: '所得税费用增加32,820.50元，按税法规定计提企业所得税。' },
      { subjectCode: '222102', debit: 0, credit: 32820.50, summary: '应交企业所得税', explanation: '应交税费-应交所得税增加32,820.50元，形成对税务局的负债。' },
      { subjectCode: '4103', debit: 32820.50, credit: 0, summary: '所得税费用转入本年利润', explanation: '本年利润减少32,820.50元，所得税费用结转后余额归零。' },
      { subjectCode: '6801', debit: 0, credit: 32820.50, summary: '结转所得税费用', explanation: '所得税费用科目余额结转至本年利润，余额归零。' }],
    documents: [
      { type: 'text', label: '所得税计算表', docTitle: '企业所得税计算表', content: '利润总额131,282元，所得税率25%，所得税32,820.50元，净利润98,461.50元。', signature: '赵会计' }]},
  {
    date: '2026-08-30',
    title: '结转净利润至未分配利润',
    tags: ['期末'],
    difficulty: 2,
    role: 'accountant',
    description: '将本月净利润98,461.50元从本年利润结转至利润分配-未分配利润。',
    tip: '月末将本年利润余额（净利润）结转至"利润分配-未分配利润"。借记"本年利润"，贷记"利润分配-未分配利润"。如为亏损则做相反分录。年末再将利润分配余额分配至盈余公积和应付股利。',
    entries: [
      { subjectCode: '4103', debit: 98461.50, credit: 0, summary: '本年利润转出', explanation: '本年利润减少98,461.50元，净利润从本年利润转出。' },
      { subjectCode: '410401', debit: 0, credit: 98461.50, summary: '未分配利润增加', explanation: '未分配利润增加98,461.50元。所有者权益增加，反映企业累计盈利。' }],
    documents: [
      { type: 'text', label: '净利润结转表', docTitle: '净利润结转计算表', content: '8月净利润98,461.50元结转至未分配利润。', signature: '赵会计' }]},

  // ═══════════════════════════════════════════════════════════════════
  // 月末：利润分配（8月31日）
  // ═══════════════════════════════════════════════════════════════════
  {
    date: '2026-08-31',
    title: '提取法定盈余公积',
    tags: ['期末'],
    difficulty: 2,
    role: 'accountant',
    description: '按净利润的10%提取法定盈余公积9,846.15元（98,461.50×10%）。',
    tip: '法定盈余公积是企业从净利润中提取的积累资金，用于弥补亏损或转增资本。提取时：借记"利润分配-提取盈余公积"，贷记"盈余公积"。提取比例不低于净利润的10%。',
    entries: [
      { subjectCode: '410401', debit: 9846.15, credit: 0, summary: '提取法定盈余公积（98,461.50×10%）', explanation: '未分配利润减少9,846.15元，用于提取盈余公积。' },
      { subjectCode: '4101', debit: 0, credit: 9846.15, summary: '法定盈余公积增加', explanation: '盈余公积增加9,846.15元。盈余公积是所有者权益的组成部分，提取后留存于企业。' }],
    documents: [
      { type: 'text', label: '盈余公积计提表', docTitle: '法定盈余公积计提表', content: '8月净利润98,461.50元，按10%计提法定盈余公积9,846.15元。', signature: '赵会计' }]},

  // ═══════════════════════════════════════════════════════════════════
  // 出纳月末任务（8月31日）
  // ═══════════════════════════════════════════════════════════════════

  {
    date: '2026-08-15',
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
    date: '2026-08-20',
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
    date: "2026-08-31",
    role: 'accountant',
    title: "模拟纳税申报",
    tags: ["期末", "税费", "info"],
    difficulty: 1,
    description: "根据本月已完成的账务处理，进行模拟纳税申报。系统已自动计算应缴税额（增值税和企业所得税），请前往纳税申报页面核对并提交。",
    tip: "纳税申报是企业每月的法定义务。确认所有凭证已过账、期末结转已完成后，前往纳税申报页面核对各项税额后点击「提交申报」。",
    entries: [],
    documents: [
      { type: "text", label: "纳税申报提醒", docTitle: "8月纳税申报提醒", content: "申报期间：2026-08-31\n\n请前往纳税申报页面：\n1. 核对增值税申报表数据\n2. 核对企业所得税申报表数据\n3. 确认无误后点击「提交申报」\n\n纳税申报是企业每月必做的合规义务，请按时完成。", stampText: "财务专用章" }]},
]

export default tasks
