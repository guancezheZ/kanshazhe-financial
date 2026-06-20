/**
 * 案例：鼎盛建筑工程有限公司 — 中型建筑业企业
 *
 * 企业背景：鼎盛建筑是一家从事房屋建筑工程施工的建筑企业，
 * 拥有建筑工程施工总承包三级资质。公司目前承建1个住宅小区项目（盛世豪庭）
 * 和1个商业办公楼项目（鼎盛大厦配套工程）。
 * 一般纳税人，适用增值税税率9%（建筑服务业）。
 * 会计制度：企业会计准则
 * 成立时间：2026年1月（新成立，无期初余额）
 *
 * 共 36 个业务事件，覆盖：资金筹集→项目预收→材料采购→领用施工→分包工程→
 * 工程结算→收入成本确认→费用支付→工资社保→税费处理→期末调整
 */

const SUBJECTS = [
  // 资产类
  { id: 's-1001', code: '1001', name: '库存现金', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1002', code: '1002', name: '银行存款', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1122', code: '1122', name: '应收账款', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1123', code: '1123', name: '预付账款', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1221', code: '1221', name: '其他应收款', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1403', code: '1403', name: '原材料', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1601', code: '1601', name: '固定资产', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1602', code: '1602', name: '累计折旧', type: 'asset', parentId: null, isLeaf: true },

  // 负债类
  { id: 's-2001', code: '2001', name: '短期借款', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-2202', code: '2202', name: '应付账款', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-2203', code: '2203', name: '预收账款', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-2211', code: '2211', name: '应付职工薪酬', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-2221', code: '2221', name: '应交税费', type: 'liability', parentId: null, isLeaf: false },
  { id: 's-222101', code: '222101', name: '应交增值税-进项税额', type: 'liability', parentId: 's-2221', isLeaf: true },
  { id: 's-222102', code: '222102', name: '应交增值税-销项税额', type: 'liability', parentId: 's-2221', isLeaf: true },
  { id: 's-222106', code: '222106', name: '应交增值税-未交增值税', type: 'liability', parentId: 's-2221', isLeaf: true },
  { id: 's-222120', code: '222120', name: '应交城建税', type: 'liability', parentId: 's-2221', isLeaf: true },
  { id: 's-2241', code: '2241', name: '其他应付款', type: 'liability', parentId: null, isLeaf: true },

  // 所有者权益类
  { id: 's-4001', code: '4001', name: '实收资本', type: 'equity', parentId: null, isLeaf: true },
  { id: 's-4103', code: '4103', name: '本年利润', type: 'equity', parentId: null, isLeaf: true },

  // 成本类
  { id: 's-5401', code: '5401', name: '工程施工', type: 'cost', parentId: null, isLeaf: true },
  { id: 's-5402', code: '5402', name: '工程结算', type: 'cost', parentId: null, isLeaf: true },

  // 损益类
  { id: 's-6001', code: '6001', name: '主营业务收入', type: 'profit_loss', parentId: null, isLeaf: true },
  { id: 's-6401', code: '6401', name: '主营业务成本', type: 'profit_loss', parentId: null, isLeaf: true },
  { id: 's-6403', code: '6403', name: '税金及附加', type: 'profit_loss', parentId: null, isLeaf: true },
  { id: 's-6601', code: '6601', name: '销售费用', type: 'profit_loss', parentId: null, isLeaf: true },
  { id: 's-6602', code: '6602', name: '管理费用', type: 'profit_loss', parentId: null, isLeaf: true },
  { id: 's-6603', code: '6603', name: '财务费用', type: 'profit_loss', parentId: null, isLeaf: true },
  { id: 's-6901', code: '6901', name: '营业外支出', type: 'profit_loss', parentId: null, isLeaf: true },
]

const OPENING_BALANCES = []  // 新成立企业，无期初余额

const EVENTS = [
  // ═══ 1月2日：资金筹集 ═══
  {
    id: 'evt_01',
    date: '2026-01-02',
    title: '收到投资者投资款',
    description: '公司收到各股东投入的注册资本金600,000元，已存入银行账户。公司注册资本600,000元，由多位股东共同出资设立。',
    documents: [
      { type: 'receipt', title: '投资款收据', content: '收到股东投资款人民币陆拾万元整（￥600,000.00）' },
      { type: 'bank', title: '银行收款回单', content: '收到投资款￥600,000.00 付款方：各股东' },
    ],
    entries: [
      { subjectCode: '1002', summary: '收到投资款', debit: 600000, credit: 0, explanation: '银行存款增加记借方。投资者投入货币资金，企业资产增加。' },
      { subjectCode: '4001', summary: '收到投资款', debit: 0, credit: 600000, explanation: '实收资本增加记贷方。投资者投入的资本属于所有者权益，在实收资本科目核算。' },
    ],
    explanation: '企业设立时收到投资者投入的资本金，一方面资产（银行存款）增加，另一方面所有者权益（实收资本）增加。这是企业运营的初始资金来源，为后续经营活动和工程项目开展提供资金保障。',
  },

  {
    id: 'evt_02',
    date: '2026-01-02',
    title: '借入短期借款',
    description: '为补充项目流动资金，鼎盛建筑向银行借入短期借款300,000元，期限6个月，年利率4.35%，到期一次还本付息。',
    documents: [
      { type: 'bank', title: '银行收款回单', content: '收到短期贷款￥300,000.00 贷款银行：工商银行' },
      { type: 'text', title: '借款合同', content: '短期流动资金借款合同，金额￥300,000.00，年利率4.35%，期限6个月，到期一次还本付息' },
    ],
    entries: [
      { subjectCode: '1002', summary: '借入短期借款', debit: 300000, credit: 0, explanation: '银行存款增加记借方。借款资金已存入银行账户，补充企业流动资金。' },
      { subjectCode: '2001', summary: '借入短期借款', debit: 0, credit: 300000, explanation: '短期借款增加记贷方。向银行借入的款项形成企业的流动负债，需在一年内偿还。' },
    ],
    explanation: '短期借款是企业向银行借入的期限在一年以内的借款，是企业除股权投资外的重要融资方式。建筑企业工程项目周期长、资金占用量大，适度借款有助于缓解资金压力。后续需按月计提利息费用。',
  },

  // ═══ 1月3日：预付房租与购置设备 ═══
  {
    id: 'evt_03',
    date: '2026-01-03',
    title: '预付一季度办公室房租',
    description: '预付2026年1-3月公司办公室租金共计9,000元，以银行存款支付。办公室位于鼎盛大厦2201室，月租金3,000元。',
    documents: [
      { type: 'receipt', title: '房屋租赁发票', content: '鼎盛大厦2201室 2026年1-3月租金 ￥9,000.00' },
      { type: 'bank', title: '银行付款回单', content: '支付办公室租金￥9,000.00 收款方：鼎盛物业管理公司' },
    ],
    entries: [
      { subjectCode: '1123', summary: '预付一季度办公室房租', debit: 9000, credit: 0, explanation: '预付账款增加记借方。预付的租金属于企业的债权，在后续各月分期摊销计入管理费用。' },
      { subjectCode: '1002', summary: '预付一季度办公室房租', debit: 0, credit: 9000, explanation: '银行存款减少记贷方。一次性支付三个月租金，资金减少。' },
    ],
    explanation: '预付租金属于预付账款，在支付时暂不确认为费用。后续每月摊销3,000元计入管理费用（办公室租金属于行政管理费用）。这种先付后摊的方式体现了权责发生制原则。',
  },

  {
    id: 'evt_04',
    date: '2026-01-03',
    title: '购置施工设备',
    description: '购入一台挖掘机和一台混凝土搅拌机用于工程施工，价款120,000元，增值税15,600元（税率13%），以银行存款支付。设备预计使用10年，残值率5%。',
    documents: [
      { type: 'invoice', title: '增值税专用发票', content: '施工设备一批（挖掘机、搅拌机）价款￥120,000.00 税额￥15,600.00 价税合计￥135,600.00' },
      { type: 'bank', title: '银行付款回单', content: '支付设备款￥135,600.00 收款方：工程机械供应商' },
    ],
    entries: [
      { subjectCode: '1601', summary: '购置施工设备', debit: 120000, credit: 0, explanation: '固定资产增加记借方。施工设备作为固定资产核算，在其使用寿命内分期计提折旧。' },
      { subjectCode: '222101', summary: '设备进项税额', debit: 15600, credit: 0, explanation: '应交增值税-进项税额增加记借方。一般纳税人购入固定资产取得的增值税专用发票，进项税额可抵扣销项税额。' },
      { subjectCode: '1002', summary: '支付设备款及税款', debit: 0, credit: 135600, explanation: '银行存款减少记贷方。以银行存款支付设备价款及增值税。' },
    ],
    explanation: '购置固定资产时，按实际支付的价款确认固定资产成本。一般纳税人取得增值税专用发票的，进项税额可以抵扣。施工设备是建筑企业的重要生产工具，后续每月按直线法计提折旧：月折旧额 = 120,000 × (1-5%) ÷ 120 = 950元。',
  },

  // ═══ 1月4日：备用金 ═══
  {
    id: 'evt_05',
    date: '2026-01-04',
    title: '提取备用金',
    description: '从银行提取8,000元现金作为公司日常备用金，用于项目现场零星采购和费用报销。',
    documents: [
      { type: 'bank', title: '银行取款回单', content: '提取备用金￥8,000.00' },
    ],
    entries: [
      { subjectCode: '1001', summary: '提取备用金', debit: 8000, credit: 0, explanation: '库存现金增加记借方。备用金是存放在企业的现金，用于日常小额支出。' },
      { subjectCode: '1002', summary: '提取备用金', debit: 0, credit: 8000, explanation: '银行存款减少记贷方。从银行提取现金，银行存款减少。' },
    ],
    explanation: '备用金是企业为日常零星开支而准备的现金。建筑工程项目现场经常需要小额采购和支付，备用金制度能提高资金使用效率。提取备用金时总资产不变，只是资产形态发生了变化。',
  },

  // ═══ 1月5日：盛世豪庭项目收款与材料采购 ═══
  {
    id: 'evt_06',
    date: '2026-01-05',
    title: '收到盛世豪庭项目预付款',
    description: '收到盛世豪庭住宅小区项目业主支付的工程预付款200,000元，已存入银行账户。按合同约定，业主在开工前支付合同总价15%作为工程预付款。',
    documents: [
      { type: 'bank', title: '银行收款回单', content: '收到盛世豪庭工程预付款￥200,000.00 付款方：盛世豪庭项目业主' },
      { type: 'text', title: '施工合同（预付款条款）', content: '盛世豪庭住宅小区工程施工合同，合同总价暂定1,200,000元，开工前支付预付款15%即￥180,000元，实际收到￥200,000元（含材料备料款）。' },
    ],
    entries: [
      { subjectCode: '1002', summary: '收到盛世豪庭预付款', debit: 200000, credit: 0, explanation: '银行存款增加记借方。项目预付款已存入银行。' },
      { subjectCode: '2203', summary: '收到盛世豪庭预付款', debit: 0, credit: 200000, explanation: '预收账款增加记贷方。预收的工程款属于企业的负债——企业有义务按合同约定完成工程施工。' },
    ],
    explanation: '建筑企业通常在项目开工前收取一定比例的工程预付款，用于备料和前期施工准备。预收工程款属于负债（预收账款），待后续按工程进度结算时冲减。这是建筑业特有的结算方式，与一般工商企业的预收款性质相同。',
  },

  {
    id: 'evt_07',
    date: '2026-01-05',
    title: '采购钢材（现购）',
    description: '向钢材供应商采购建筑用钢筋一批，价款150,000元，增值税19,500元（税率13%），以银行存款支付。钢材已验收入库，用于盛世豪庭项目主体结构施工。',
    documents: [
      { type: 'invoice', title: '增值税专用发票', content: '建筑用钢筋一批 价款￥150,000.00 税额￥19,500.00 价税合计￥169,500.00' },
      { type: 'receipt', title: '入库单', content: '钢筋一批 数量50吨 金额￥150,000.00 已验收入库' },
    ],
    entries: [
      { subjectCode: '1403', summary: '采购钢材入库', debit: 150000, credit: 0, explanation: '原材料增加记借方。钢材是建筑工程的主要建筑材料，按采购成本计入原材料。' },
      { subjectCode: '222101', summary: '钢材进项税额', debit: 19500, credit: 0, explanation: '进项税额增加记借方。购入材料取得的增值税专用发票，进项税额可抵扣。' },
      { subjectCode: '1002', summary: '支付钢材款', debit: 0, credit: 169500, explanation: '银行存款减少记贷方。现购方式下，采购与付款同时完成。' },
    ],
    explanation: '采购建筑工程材料并验收入库时，按采购成本计入原材料科目。一般纳税人的进项税额可抵扣销项税额，因此材料成本为不含税金额150,000元，增值税19,500元单独核算。钢材是建筑工程最重要的结构材料。',
  },

  // ═══ 1月6日：项目领料 ═══
  {
    id: 'evt_08',
    date: '2026-01-06',
    title: '盛世豪庭项目领用钢材',
    description: '盛世豪庭项目施工班组领用钢筋一批，成本50,000元，用于项目主体结构的钢筋绑扎工程。',
    documents: [
      { type: 'receipt', title: '领料单', content: '钢筋 金额￥50,000.00 盛世豪庭项目领用 用于主体结构施工' },
    ],
    entries: [
      { subjectCode: '5401', summary: '盛世豪庭领用钢材', debit: 50000, credit: 0, explanation: '工程施工增加记借方。项目领用的建筑材料直接计入该工程的施工成本。' },
      { subjectCode: '1403', summary: '钢材出库', debit: 0, credit: 50000, explanation: '原材料减少记贷方。钢材被项目领用，从仓库发出至施工现场，原材料库存减少。' },
    ],
    explanation: '建筑企业领用材料时，材料从仓库转移到施工现场。工程直接耗用的材料成本计入"工程施工"科目下的直接材料成本，这是工程成本的重要组成部分。材料出库后需妥善保管领料单作为原始凭证。',
  },

  // ═══ 1月7日：赊购材料 ═══
  {
    id: 'evt_09',
    date: '2026-01-07',
    title: '采购水泥等材料（赊购）',
    description: '向建材供应商采购水泥、砂石等建筑材料一批，价款80,000元，增值税10,400元（税率13%），货款暂欠。材料已验收入库，用于后续施工。',
    documents: [
      { type: 'invoice', title: '增值税专用发票', content: '水泥、砂石一批 价款￥80,000.00 税额￥10,400.00 价税合计￥90,400.00' },
      { type: 'receipt', title: '入库单', content: '水泥、砂石一批 金额￥80,000.00 已验收入库' },
    ],
    entries: [
      { subjectCode: '1403', summary: '采购水泥入库', debit: 80000, credit: 0, explanation: '原材料增加记借方。水泥、砂石是建筑施工的基础材料，按采购成本入账。' },
      { subjectCode: '222101', summary: '水泥进项税额', debit: 10400, credit: 0, explanation: '进项税额增加记借方。赊购同样取得专用发票，进项税额可抵扣。' },
      { subjectCode: '2202', summary: '赊购材料款', debit: 0, credit: 90400, explanation: '应付账款增加记贷方。货款暂欠，形成对供应商的负债。' },
    ],
    explanation: '赊购（先收货后付款）是建筑业常见的采购方式。与现购的区别在于贷记科目不同：现购贷记银行存款，赊购贷记应付账款。材料款90,400元将在信用期内支付，企业应合理安排资金，按时偿还供应商货款。',
  },

  // ═══ 1月8日：②领料+安全费 ═══
  {
    id: 'evt_10',
    date: '2026-01-08',
    title: '盛世豪庭项目领用水泥',
    description: '盛世豪庭项目施工班组领用水泥一批，成本30,000元，用于项目混凝土浇筑工程。',
    documents: [
      { type: 'receipt', title: '领料单', content: '水泥 金额￥30,000.00 盛世豪庭项目领用 用于混凝土浇筑' },
    ],
    entries: [
      { subjectCode: '5401', summary: '盛世豪庭领用水泥', debit: 30000, credit: 0, explanation: '工程施工增加记借方。水泥用于项目混凝土施工，计入该工程的直接材料成本。' },
      { subjectCode: '1403', summary: '水泥出库', debit: 0, credit: 30000, explanation: '原材料减少记贷方。水泥被项目领用，原材料库存减少。' },
    ],
    explanation: '盛世豪庭项目第二次领用材料。两次领料合计：钢材50,000元+水泥30,000元=80,000元，已全部投入项目主体结构施工中。材料成本是工程成本的核心组成部分。',
  },

  {
    id: 'evt_11',
    date: '2026-01-09',
    title: '支付项目安全文明施工费',
    description: '支付盛世豪庭项目现场安全文明施工措施费用5,000元，包括安全警示牌、防护网、施工围挡等费用，以银行存款支付。',
    documents: [
      { type: 'receipt', title: '安全施工费收据', content: '安全文明施工措施费 ￥5,000.00 含安全标志牌、防护网、围挡等' },
    ],
    entries: [
      { subjectCode: '5401', summary: '安全文明施工费', debit: 5000, credit: 0, explanation: '工程施工增加记借方。安全文明施工费是工程项目现场的必要支出，计入项目施工成本（间接费）。' },
      { subjectCode: '1002', summary: '支付安全施工费', debit: 0, credit: 5000, explanation: '银行存款减少记贷方。' },
    ],
    explanation: '安全文明施工费是建筑企业按照国家规定必须投入的安全生产和文明施工措施费用，包括安全防护、警示标志、施工围挡、环境保护等。这些费用计入工程成本，是保障施工安全的重要支出。',
  },

  // ═══ 1月10日：工资 ═══
  {
    id: 'evt_12',
    date: '2026-01-10',
    title: '计提员工工资',
    description: '计提1月份全体员工工资共计50,000元。其中项目施工人员工资30,000元，项目管理人员工资8,000元，公司行政管理人员工资7,000元，销售人员工资5,000元。',
    documents: [
      { type: 'text', title: '工资汇总表', content: '项目施工人员￥30,000 项目管理人员￥8,000 行政管理人员￥7,000 销售人员￥5,000 合计￥50,000' },
    ],
    entries: [
      { subjectCode: '5401', summary: '项目施工人员工资', debit: 38000, credit: 0, explanation: '工程施工增加记借方。项目施工人员（30,000元）和项目管理人员（8,000元）的工资直接计入工程成本。' },
      { subjectCode: '6602', summary: '行政管理人员工资', debit: 7000, credit: 0, explanation: '管理费用增加记借方。公司行政管理人员的薪酬属于管理性质的费用支出。' },
      { subjectCode: '6601', summary: '销售人员工资', debit: 5000, credit: 0, explanation: '销售费用增加记借方。销售人员（市场拓展、投标等）的薪酬与业务拓展活动相关。' },
      { subjectCode: '2211', summary: '计提应付工资', debit: 0, credit: 50000, explanation: '应付职工薪酬增加记贷方。计提工资时形成企业的一项负债。' },
    ],
    explanation: '不同岗位的工资计入不同的成本费用科目：项目施工和管理人员→工程施工（直接或间接成本），行政人员→管理费用，销售人员→销售费用。建筑施工企业的项目管理人员工资计入工程成本而非管理费用，这是建筑业与一般企业的显著区别。',
  },

  {
    id: 'evt_13',
    date: '2026-01-10',
    title: '发放员工工资',
    description: '以银行存款发放1月份全部员工工资50,000元。',
    documents: [
      { type: 'bank', title: '银行代发工资回单', content: '代发1月工资 人数60人 金额￥50,000.00' },
    ],
    entries: [
      { subjectCode: '2211', summary: '发放全部工资', debit: 50000, credit: 0, explanation: '应付职工薪酬减少记借方。发放工资后，企业对员工的负债减少。' },
      { subjectCode: '1002', summary: '发放全部工资', debit: 0, credit: 50000, explanation: '银行存款减少记贷方。实际支付工资，资金流出企业。' },
    ],
    explanation: '实际发放工资时，冲减应付职工薪酬（计提时确认的负债）。本例简化处理未涉及社保公积金和个税代扣代缴。实务中建筑企业还需处理社保、住房公积金和个税的代扣代缴。',
  },

  // ═══ 1月12日：项目水电费 ═══
  {
    id: 'evt_14',
    date: '2026-01-12',
    title: '支付项目水电费',
    description: '支付盛世豪庭项目现场1月上旬施工用水电费5,000元，增值税450元（水电费适用9%税率），以银行存款支付。',
    documents: [
      { type: 'receipt', title: '水电费缴费单', content: '1月上旬施工用电费￥4,200.00 水费￥800.00 合计￥5,000.00 税额￥450.00' },
    ],
    entries: [
      { subjectCode: '5401', summary: '支付项目水电费', debit: 5000, credit: 0, explanation: '工程施工增加记借方。项目施工用水电费属于工程直接成本中的其他直接费。' },
      { subjectCode: '222101', summary: '水电进项税额', debit: 450, credit: 0, explanation: '进项税额增加记借方。水电费增值税专用发票的进项税额可抵扣。' },
      { subjectCode: '1002', summary: '支付水电费', debit: 0, credit: 5450, explanation: '银行存款减少记贷方。' },
    ],
    explanation: '施工项目现场的水电费是工程施工过程中必不可少的支出，计入工程成本中的"其他直接费"（水电费）。建筑企业施工现场水电消耗量大，这部分费用需要及时准确核算。',
  },

  // ═══ 1月13日：预付分包款 ═══
  {
    id: 'evt_15',
    date: '2026-01-13',
    title: '预付分包工程款',
    description: '按分包合同约定，预付给某劳务分包公司工程款30,000元，以银行存款支付。该分包公司负责盛世豪庭项目的基础施工劳务。',
    documents: [
      { type: 'receipt', title: '预付款收据', content: '收到鼎盛建筑预付劳务分包款￥30,000.00' },
      { type: 'text', title: '劳务分包合同', content: '盛世豪庭项目基础施工劳务分包，合同总价90,000元，预付30,000元' },
      { type: 'bank', title: '银行付款回单', content: '支付分包预付款￥30,000.00 收款方：某劳务分包公司' },
    ],
    entries: [
      { subjectCode: '1123', summary: '预付分包工程款', debit: 30000, credit: 0, explanation: '预付账款增加记借方。预付给分包商的工程款属于企业的债权，待分包工程完工结算时冲减。' },
      { subjectCode: '1002', summary: '支付分包预付款', debit: 0, credit: 30000, explanation: '银行存款减少记贷方。支付分包工程预付款，资金流出。' },
    ],
    explanation: '建筑企业经常将部分工程分包给专业分包商或劳务公司。预付分包工程款与预付材料款性质相同，属于预付账款。待分包方完成工程并办理结算时，再冲减预付账款并确认工程成本。',
  },

  // ═══ 1月15日：分包结算+费用 ═══
  {
    id: 'evt_16',
    date: '2026-01-15',
    title: '支付分包工程结算款',
    description: '收到分包公司提交的基础施工进度结算单，结算金额50,000元，增值税4,500元（建筑服务税率9%），扣除前期预付30,000元后，实际支付24,500元。',
    documents: [
      { type: 'invoice', title: '增值税专用发票（分包）', content: '建筑服务-基础施工劳务 金额￥50,000.00 税率9% 税额￥4,500.00 价税合计￥54,500.00' },
      { type: 'receipt', title: '分包工程进度结算单', content: '基础施工已完成50% 结算金额￥50,000.00' },
      { type: 'bank', title: '银行付款回单', content: '支付分包结算款￥24,500.00（扣减预付款￥30,000.00后实付）' },
    ],
    entries: [
      { subjectCode: '5401', summary: '分包工程成本', debit: 50000, credit: 0, explanation: '工程施工增加记借方。分包工程完成的工作量计入总包方的工程施工成本。' },
      { subjectCode: '222101', summary: '分包进项税额', debit: 4500, credit: 0, explanation: '进项税额增加记借方。建筑服务分包取得的专用发票，进项税额可抵扣。' },
      { subjectCode: '1123', summary: '冲减预付分包款', debit: 0, credit: 30000, explanation: '预付账款减少记贷方。冲销前期预付的30,000元分包款。' },
      { subjectCode: '1002', summary: '支付分包结算余款', debit: 0, credit: 24500, explanation: '银行存款减少记贷方。扣除预付款后，实际支付结算余款24,500元。' },
    ],
    explanation: '分包工程结算时，按结算金额确认工程成本，同时冲减前期预付的工程款。如果结算金额大于预付款，差额为应付分包款；本例中结算总价54,500元（含税），预付30,000元，实际再支付24,500元。分包工程的增值税税率为9%（建筑服务）。',
  },

  {
    id: 'evt_17',
    date: '2026-01-15',
    title: '报销业务招待费',
    description: '报销公司管理人员业务招待客户餐费及礼品费用共计2,000元，以现金支付。',
    documents: [
      { type: 'receipt', title: '业务招待费报销单', content: '业务招待费 餐费￥1,500.00 礼品￥500.00 合计￥2,000.00' },
    ],
    entries: [
      { subjectCode: '6602', summary: '报销业务招待费', debit: 2000, credit: 0, explanation: '管理费用增加记借方。业务招待费是企业为维护客户关系发生的支出，计入管理费用。' },
      { subjectCode: '1001', summary: '报销业务招待费', debit: 0, credit: 2000, explanation: '库存现金减少记贷方。以现金支付报销款。' },
    ],
    explanation: '业务招待费是企业为业务拓展、客户关系维护而发生的合理支出，计入管理费用。企业所得税法对业务招待费的税前扣除有限额限制（按发生额的60%扣除，最高不超过当年销售收入的5‰），实务中需注意税务合规。',
  },

  // ═══ 1月18日：工程结算与收入确认 ═══
  {
    id: 'evt_18',
    date: '2026-01-18',
    title: '盛世豪庭项目工程进度结算',
    description: '与盛世豪庭项目业主进行第一次工程进度结算，确认已完成工程量150,000元，增值税13,500元（建筑服务税率9%），开具增值税专用发票，款项尚未收到。',
    documents: [
      { type: 'invoice', title: '增值税专用发票', content: '建筑服务-盛世豪庭工程进度款 金额￥150,000.00 税率9% 税额￥13,500.00 价税合计￥163,500.00' },
      { type: 'receipt', title: '工程进度确认单', content: '盛世豪庭项目截至1月18日已完成工程量￥150,000.00 经业主现场代表签字确认' },
    ],
    entries: [
      { subjectCode: '1122', summary: '应收工程进度款', debit: 163500, credit: 0, explanation: '应收账款增加记借方。已办理工程结算但尚未收到的工程款形成对业主的债权。' },
      { subjectCode: '5402', summary: '工程进度结算', debit: 0, credit: 150000, explanation: '工程结算增加记贷方。工程结算是建筑业特有的科目，反映已向业主办理结算的工程量。' },
      { subjectCode: '222102', summary: '销项税额', debit: 0, credit: 13500, explanation: '应交增值税-销项税额增加记贷方。建筑服务按9%税率计提销项税额，纳税义务已发生。' },
    ],
    explanation: '工程进度结算是建筑业特有的收入确认环节。与业主按工程进度办理结算时，借记应收账款（应收业主款），同时贷记"工程结算"科目（反映已结算的工程价值），并计提增值税销项税额。建筑服务增值税税率为9%。',
  },

  {
    id: 'evt_19',
    date: '2026-01-18',
    title: '按完工百分比确认盛世豪庭收入',
    description: '按照完工百分比法确认盛世豪庭项目本月收入150,000元。根据工程进度，已完成工程量占合同总价的比例约为12.5%（150,000÷1,200,000），与业主结算金额一致。',
    documents: [
      { type: 'text', title: '完工百分比计算表', content: '合同总价￥1,200,000.00 本月完成￥150,000.00 完工比例12.5% 确认收入￥150,000.00' },
    ],
    entries: [
      { subjectCode: '5402', summary: '结转工程结算至收入', debit: 150000, credit: 0, explanation: '工程结算减少记借方。期末将工程结算余额结转至主营业务收入。' },
      { subjectCode: '6001', summary: '确认主营业务收入', debit: 0, credit: 150000, explanation: '主营业务收入增加记贷方。按完工百分比法确认的工程收入，与结算金额一致。' },
    ],
    explanation: '建筑企业采用完工百分比法确认收入，即在每个会计期末根据工程完工进度确认相应的收入和成本。本例中已结算工程量150,000元，因此确认收入150,000元。分录为借记"工程结算"（结转），贷记"主营业务收入"。',
  },

  {
    id: 'evt_20',
    date: '2026-01-18',
    title: '结转盛世豪庭项目工程成本',
    description: '结转盛世豪庭项目本月已发生的工程成本80,000元至主营业务成本。成本构成：领用钢材50,000元+领用水泥30,000元。',
    entries: [
      { subjectCode: '6401', summary: '结转工程成本', debit: 80000, credit: 0, explanation: '主营业务成本增加记借方。已完工程的实际成本从工程施工科目转入主营业务成本。' },
      { subjectCode: '5401', summary: '结转工程施工成本', debit: 0, credit: 80000, explanation: '工程施工减少记贷方。将确认收入对应的工程成本结转至损益。' },
    ],
    explanation: '按照收入与成本配比原则，确认收入的同时必须结转相应的工程成本。本期盛世豪庭项目发生直接材料成本80,000元（钢材50,000+水泥30,000），工程毛利率为46.67%（(150,000-80,000)/150,000）。后续安全费和分包费等也将逐步计入工程成本。',
  },

  // ═══ 1月20日：收款+办公用品 ═══
  {
    id: 'evt_21',
    date: '2026-01-20',
    title: '收到盛世豪庭工程进度款',
    description: '收到盛世豪庭项目业主支付的第一次工程进度款163,500元（含税），已存入银行账户。',
    documents: [
      { type: 'bank', title: '银行收款回单', content: '收到工程进度款￥163,500.00 付款方：盛世豪庭项目业主 用途：1月工程进度款' },
    ],
    entries: [
      { subjectCode: '1002', summary: '收到进度款', debit: 163500, credit: 0, explanation: '银行存款增加记借方。收回前期确认的应收账款，资金回笼。' },
      { subjectCode: '1122', summary: '冲减应收账款', debit: 0, credit: 163500, explanation: '应收账款减少记贷方。业主欠款已结清，债权减少。' },
    ],
    explanation: '工程进度款收回标志着从"已确认收入尚未收款"到"款已到账"的转变。这笔收款与1月18日的工程结算业务对应，结算时形成应收账款，收款时冲减应收账款。建筑企业应密切关注工程款回收进度，避免形成坏账。',
  },

  {
    id: 'evt_22',
    date: '2026-01-20',
    title: '购买办公用品',
    description: '购买公司办公用打印纸、墨盒、文件夹等办公用品共计1,500元，以银行存款支付。',
    documents: [
      { type: 'receipt', title: '办公用品发票', content: '办公用品一批 金额￥1,500.00' },
    ],
    entries: [
      { subjectCode: '6602', summary: '购买办公用品', debit: 1500, credit: 0, explanation: '管理费用增加记借方。办公用品属于行政管理部门日常消耗性支出，金额不大时直接计入当期费用。' },
      { subjectCode: '1002', summary: '购买办公用品', debit: 0, credit: 1500, explanation: '银行存款减少记贷方。' },
    ],
    explanation: '办公用品是维持企业日常管理运营的消耗品，金额不大时直接计入当期管理费用，无需通过物料库存核算。这是最典型的管理费用支出之一。',
  },

  // ═══ 1月22日：鼎盛大厦项目 ═══
  {
    id: 'evt_23',
    date: '2026-01-22',
    title: '收到鼎盛大厦项目预付款',
    description: '鼎盛大厦配套工程项目开工，收到业主支付的工程预付款300,000元，已存入银行账户。按合同约定，开工前支付合同总价的20%作为工程预付款。',
    documents: [
      { type: 'bank', title: '银行收款回单', content: '收到鼎盛大厦工程预付款￥300,000.00 付款方：鼎盛大厦项目业主' },
      { type: 'text', title: '施工合同（预付款条款）', content: '鼎盛大厦配套工程施工合同，合同总价1,500,000元，开工前支付预付款20%即￥300,000元。' },
    ],
    entries: [
      { subjectCode: '1002', summary: '收到鼎盛大厦预付款', debit: 300000, credit: 0, explanation: '银行存款增加记借方。第二个项目的预付款已收到，企业资金更加充裕。' },
      { subjectCode: '2203', summary: '预收鼎盛大厦工程款', debit: 0, credit: 300000, explanation: '预收账款增加记贷方。鼎盛大厦项目的预收工程款形成对业主的负债。' },
    ],
    explanation: '鼎盛建筑第二个工程项目开工，再次收到工程预付款。两个项目同时运作，对企业的资金管理能力和项目管理能力提出了更高要求。预收账款余额合计500,000元（盛世豪庭200,000+鼎盛大厦300,000）。',
  },

  {
    id: 'evt_24',
    date: '2026-01-22',
    title: '采购装修材料（现购）',
    description: '为鼎盛大厦配套工程采购装修用材料一批，价款60,000元，增值税7,800元（税率13%），以银行存款支付。材料已验收入库，后续用于大厦内部装修施工。',
    documents: [
      { type: 'invoice', title: '增值税专用发票', content: '装修材料一批 价款￥60,000.00 税额￥7,800.00 价税合计￥67,800.00' },
      { type: 'receipt', title: '入库单', content: '装修材料一批 金额￥60,000.00 已验收入库' },
    ],
    entries: [
      { subjectCode: '1403', summary: '采购装修材料入库', debit: 60000, credit: 0, explanation: '原材料增加记借方。装修材料按采购成本（不含税）计入原材料科目。' },
      { subjectCode: '222101', summary: '装修材料进项税额', debit: 7800, credit: 0, explanation: '进项税额增加记借方。装修材料采购的进项税额可抵扣。' },
      { subjectCode: '1002', summary: '支付材料款', debit: 0, credit: 67800, explanation: '银行存款减少记贷方。支付含税总价款。' },
    ],
    explanation: '鼎盛大厦项目的材料采购。装修材料是配套工程的主要建筑材料。截至1月22日，公司原材料采购总额达290,000元（钢材150,000+水泥80,000+装修材料60,000），库存丰富，为两个项目的施工提供了充足的材料保障。',
  },

  // ═══ 1月23日：鼎盛大厦领料 ═══
  {
    id: 'evt_25',
    date: '2026-01-23',
    title: '鼎盛大厦项目领用材料',
    description: '鼎盛大厦项目施工班组领用装修材料一批，成本40,000元，用于大厦内部隔断和基础装修施工。',
    documents: [
      { type: 'receipt', title: '领料单', content: '装修材料 金额￥40,000.00 鼎盛大厦项目领用 用于内部装修施工' },
    ],
    entries: [
      { subjectCode: '5401', summary: '鼎盛大厦领用材料', debit: 40000, credit: 0, explanation: '工程施工增加记借方。鼎盛大厦项目领用的装修材料计入该工程的施工成本。' },
      { subjectCode: '1403', summary: '装修材料出库', debit: 0, credit: 40000, explanation: '原材料减少记贷方。材料被项目领用，原材料库存减少。' },
    ],
    explanation: '鼎盛大厦项目首次领料。截至1月23日，两个项目累计领用材料：盛世豪庭80,000元（钢材+水泥）+鼎盛大厦40,000元（装修材料）=120,000元。原材料库存结余：230,000元（总采购290,000-总领用120,000+期初0）。',
  },

  // ═══ 1月24-25日：费用 ═══
  {
    id: 'evt_26',
    date: '2026-01-24',
    title: '支付通讯费',
    description: '支付公司1月份固定电话费及网络通讯费共计1,200元，以银行存款支付。',
    documents: [
      { type: 'receipt', title: '通讯费发票', content: '1月固话费￥600.00 网络费￥600.00 合计￥1,200.00' },
    ],
    entries: [
      { subjectCode: '6602', summary: '支付通讯费', debit: 1200, credit: 0, explanation: '管理费用增加记借方。企业通讯费属于行政管理部门的日常运营支出。' },
      { subjectCode: '1002', summary: '支付通讯费', debit: 0, credit: 1200, explanation: '银行存款减少记贷方。' },
    ],
    explanation: '通讯费（电话费、网络费）是企业日常管理运营必不可少的费用支出，计入管理费用。对于建筑企业而言，项目现场与公司总部的通讯联络尤为重要。',
  },

  {
    id: 'evt_27',
    date: '2026-01-25',
    title: '支付公司办公费',
    description: '支付公司办公室1月份物业管理费、清洁费、饮用水费等办公费用共计3,000元，以银行存款支付。',
    documents: [
      { type: 'receipt', title: '办公费收据', content: '1月物业管理费￥1,800.00 清洁费￥800.00 饮用水费￥400.00 合计￥3,000.00' },
    ],
    entries: [
      { subjectCode: '6602', summary: '支付公司办公费', debit: 3000, credit: 0, explanation: '管理费用增加记借方。办公室物业管理费、清洁费等属于公司的管理性支出。' },
      { subjectCode: '1002', summary: '支付公司办公费', debit: 0, credit: 3000, explanation: '银行存款减少记贷方。' },
    ],
    explanation: '企业行政管理部门发生的各项办公费用，包括物业管理费、清洁费、饮用水费等，均计入管理费用。这些费用虽不直接创造价值，但维持了企业的正常运转。',
  },

  {
    id: 'evt_28',
    date: '2026-01-25',
    title: '报销差旅费',
    description: '公司管理人员报销前往项目现场检查工作的差旅费共计2,500元（交通费1,200元、住宿费800元、伙食补助500元），以现金支付。',
    documents: [
      { type: 'receipt', title: '差旅费报销单', content: '交通费￥1,200.00 住宿费￥800.00 伙食补助￥500.00 合计￥2,500.00' },
    ],
    entries: [
      { subjectCode: '6602', summary: '报销差旅费', debit: 2500, credit: 0, explanation: '管理费用增加记借方。管理人员下项目现场的差旅费属于管理性质的费用支出。' },
      { subjectCode: '1001', summary: '报销差旅费', debit: 0, credit: 2500, explanation: '库存现金减少记贷方。以现金支付报销款，备用金减少。' },
    ],
    explanation: '差旅费是企业员工因公出差发生的交通、住宿、餐饮等费用。建筑企业管理人员经常需要到各项目现场检查指导，差旅费是必不可少的管理费用。报销时使用备用金支付，冲减库存现金。',
  },

  // ═══ 1月26日：偿还欠款 ═══
  {
    id: 'evt_29',
    date: '2026-01-26',
    title: '偿还前欠材料货款',
    description: '以银行存款偿还1月7日欠建材供应商的水泥、砂石货款90,400元（含税）。',
    documents: [
      { type: 'bank', title: '银行付款回单', content: '付款￥90,400.00 收款方：建材供应商 用途：支付水泥砂石货款' },
    ],
    entries: [
      { subjectCode: '2202', summary: '偿还前欠货款', debit: 90400, credit: 0, explanation: '应付账款减少记借方。偿还欠款后，企业对供应商的负债减少。' },
      { subjectCode: '1002', summary: '偿还前欠货款', debit: 0, credit: 90400, explanation: '银行存款减少记贷方。资金流出，用于偿还债务。' },
    ],
    explanation: '这笔业务与1月7日的赊购业务对应。赊购时形成应付账款（负债），偿还时冲减应付账款。在信用期内及时偿还货款有助于维护良好的供应商关系，为后续材料采购争取更优惠的信用条件。',
  },

  // ═══ 1月28日：费用 ═══
  {
    id: 'evt_30',
    date: '2026-01-28',
    title: '支付银行手续费',
    description: '银行扣收1月份账户管理费、转账汇款手续费等共计350元。',
    documents: [
      { type: 'bank', title: '银行扣款回单', content: '1月账户管理费及转账手续费￥350.00' },
    ],
    entries: [
      { subjectCode: '6603', summary: '银行手续费', debit: 350, credit: 0, explanation: '财务费用增加记借方。银行手续费是企业使用银行服务发生的费用，属于财务费用。' },
      { subjectCode: '1002', summary: '银行手续费', debit: 0, credit: 350, explanation: '银行存款减少记贷方。银行直接扣款，企业银行存款减少。' },
    ],
    explanation: '财务费用是指企业为筹集生产经营资金等而发生的费用，包括银行手续费、利息支出、汇兑损益等。银行手续费虽金额不大，但每月都会发生。',
  },

  {
    id: 'evt_31',
    date: '2026-01-28',
    title: '支付施工机械租赁费',
    description: '因自有设备不足，租赁一台塔吊用于鼎盛大厦项目施工，支付1月份租赁费6,000元，以银行存款支付。',
    documents: [
      { type: 'receipt', title: '机械租赁费发票', content: '塔吊租赁 1月份 ￥6,000.00' },
      { type: 'bank', title: '银行付款回单', content: '支付塔吊租赁费￥6,000.00 收款方：机械设备租赁公司' },
    ],
    entries: [
      { subjectCode: '5401', summary: '施工机械租赁费', debit: 6000, credit: 0, explanation: '工程施工增加记借方。施工机械租赁费属于工程成本的机械使用费，计入项目成本。' },
      { subjectCode: '1002', summary: '支付机械租赁费', debit: 0, credit: 6000, explanation: '银行存款减少记贷方。支付租赁费。' },
    ],
    explanation: '建筑企业除自有施工设备外，还经常需要租赁大型施工机械（塔吊、起重机等）。机械租赁费计入工程成本中的"机械使用费"。这是建筑业特有的成本构成要素，体现了工程施工对大型机械设备的依赖。',
  },

  // ═══ 1月30日：计提利息 ═══
  {
    id: 'evt_32',
    date: '2026-01-30',
    title: '计提本月短期借款利息',
    description: '计提1月份短期借款300,000元的利息费用。月利息 = 300,000 × 4.35% ÷ 12 = 1,087.50元。该借款到期一次还本付息。',
    documents: [
      { type: 'text', title: '利息计算表', content: '短期借款￥300,000.00×年利率4.35%÷12个月=月利息￥1,087.50' },
    ],
    entries: [
      { subjectCode: '6603', summary: '计提短期借款利息', debit: 1087.50, credit: 0, explanation: '财务费用增加记借方。借款利息是企业使用借入资金付出的代价，按月计提计入财务费用。' },
      { subjectCode: '2241', summary: '计提应付利息', debit: 0, credit: 1087.50, explanation: '其他应付款增加记贷方。计提的利息尚未实际支付，形成一项负债。' },
    ],
    explanation: '按照权责发生制原则，借款利息应在受益期（借款使用期间）内计提，即使尚未实际支付。本案例短期借款到期一次还本付息，因此每月计提利息，贷记"其他应付款"。月利息=300,000×4.35%÷12=1,087.50元。',
  },

  // ═══ 1月31日：期末调整 ═══
  {
    id: 'evt_33',
    date: '2026-01-31',
    title: '摊销本月办公室房租',
    description: '摊销应归属于1月份的办公室租金3,000元（预付的9,000元 ÷ 3个月）。',
    entries: [
      { subjectCode: '6602', summary: '摊销本月房租', debit: 3000, credit: 0, explanation: '管理费用增加记借方。本月应承担的办公室租金计入管理费用。' },
      { subjectCode: '1123', summary: '摊销预付房租', debit: 0, credit: 3000, explanation: '预付账款减少记贷方。随着时间推移，预付的租金逐步摊销，资产减少。' },
    ],
    explanation: '预付账款按受益期摊销。1月份使用办公室一个月，因此将预付的三个月租金中的三分之一（3,000元）转为费用。剩余6,000元仍作为预付账款挂在账上，在2月和3月继续摊销。这体现了权责发生制的要求。',
  },

  {
    id: 'evt_34',
    date: '2026-01-31',
    title: '计提固定资产折旧',
    description: '施工设备原值120,000元，预计使用10年（120个月），残值率5%。月折旧额 = 120,000 × 95% ÷ 120 = 950元。',
    entries: [
      { subjectCode: '5401', summary: '计提施工设备折旧', debit: 950, credit: 0, explanation: '工程施工增加记借方。施工设备在使用过程中会损耗，其折旧计入工程成本的机械使用费。' },
      { subjectCode: '1602', summary: '计提设备折旧', debit: 0, credit: 950, explanation: '累计折旧增加记贷方。累计折旧是固定资产的备抵科目，反映已损耗的价值。' },
    ],
    explanation: '折旧是将固定资产的成本在其使用寿命内系统分摊的过程。本例采用直线法：月折旧额 = (原值 - 预计净残值) ÷ 使用月数 = (120,000 - 6,000) ÷ 120 = 950元。施工设备折旧计入工程成本中的"机械使用费"，通过工程施工科目归集。',
  },

  {
    id: 'evt_35',
    date: '2026-01-31',
    title: '增值税月末结转',
    description: '月末结转增值税明细科目。本月进项税额合计58,250元，销项税额合计13,500元。进项税额大于销项税额，差额44,750元为留抵税额。',
    documents: [
      { type: 'text', title: '增值税计算表', content: '进项税额合计：设备15,600+钢材19,500+水泥10,400+水电450+分包4,500+装修材料7,800=58,250.00元\n销项税额合计：工程结算13,500.00元\n应交增值税：13,500-58,250=-44,750.00元（留抵税额）' },
    ],
    entries: [
      { subjectCode: '222102', summary: '结转销项税额', debit: 13500, credit: 0, explanation: '销项税额转出记借方。月末将销项税额明细科目余额结转至未交增值税。' },
      { subjectCode: '222106', summary: '留抵税额', debit: 44750, credit: 0, explanation: '未交增值税借方余额表示留抵税额。进项税额大于销项税额的差额，可结转下期继续抵扣。' },
      { subjectCode: '222101', summary: '结转进项税额', debit: 0, credit: 58250, explanation: '进项税额转出记贷方。将进项税额明细科目余额结转至未交增值税。' },
    ],
    explanation: '月末增值税结转是将"进项税额"和"销项税额"明细科目的余额转入"未交增值税"科目。本月进项税额（58,250元）远大于销项税额（13,500元），产生留抵税额44,750元。主要原因是本期大规模采购材料、购置设备产生了大量进项，而工程结算收入仅为150,000元。留抵税额可结转下月继续抵扣销项税额。进项构成：设备15,600+钢材19,500+水泥10,400+水电450+分包4,500+装修材料7,800=58,250元。',
  },

  {
    id: 'evt_36',
    date: '2026-01-31',
    title: '城建税处理（留抵无需缴纳）',
    description: '本月增值税为留抵税额44,750元，不需缴纳增值税。因此以增值税为计税依据的城市维护建设税（税率7%）和教育费附加（3%+2%）为0元，无需计提。',
    entries: [],
    explanation: '城市维护建设税和教育费附加以实际应缴纳的增值税为计税依据。本月进项税额（58,250元）大于销项税额（13,500元），产生留抵税额44,750元。由于无需缴纳增值税，城建税（7%）和教育费附加（3%+2%）也为0元。留抵税额44,750元可结转至下月继续抵扣。',
  },
]

export default {
  id: 'medium_construction',
  companyInfo: {
    name: '鼎盛建筑工程有限公司',
    shortName: '鼎盛建筑',
    taxType: '一般纳税人',
    taxRate: '9%',
    accountingSystem: '企业会计准则',
    industry: '建筑业',
    address: '鼎盛大厦2201室',
    description: '鼎盛建筑是一家从事房屋建筑工程施工的建筑企业，拥有建筑工程施工总承包三级资质。公司目前承建1个住宅小区项目（盛世豪庭，合同总价1,200,000元）和1个商业办公楼项目（鼎盛大厦配套工程，合同总价1,500,000元）。公司在册员工60人，其中项目施工人员40人、项目管理人员8人、公司管理人员7人、销售人员5人。2026年1月新成立，无期初余额。',
  },
  subjects: SUBJECTS,
  openingBalances: OPENING_BALANCES,
  events: EVENTS,
  periodEnd: {
    depreciation: true,
    amortization: true,
    taxTransfer: false,
    profitTransfer: false,
  },
}
