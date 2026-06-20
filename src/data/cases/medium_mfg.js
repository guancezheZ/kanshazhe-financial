/**
 * 案例：华鑫制造厂 — 中型制造业企业
 *
 * 企业背景：华鑫制造厂是一家从事工业设备零部件加工制造的生产型企业，
 * 拥有2个生产车间和1个装配车间。主要产品为机械零部件和精密配件。
 * 一般纳税人，适用增值税税率13%。
 * 会计制度：企业会计准则
 * 成立时间：2026年1月（新成立，无期初余额）
 *
 * 共 39 个业务事件，覆盖：资金筹集→采购→生产→销售→费用→税费→期末调整
 */

const SUBJECTS = [
  // 资产类
  { id: 's-1001', code: '1001', name: '库存现金', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1002', code: '1002', name: '银行存款', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1122', code: '1122', name: '应收账款', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1123', code: '1123', name: '预付账款', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1221', code: '1221', name: '其他应收款', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1403', code: '1403', name: '原材料', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1405', code: '1405', name: '库存商品', type: 'asset', parentId: null, isLeaf: true },
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
  { id: 's-5001', code: '5001', name: '生产成本', type: 'cost', parentId: null, isLeaf: true },
  { id: 's-5101', code: '5101', name: '制造费用', type: 'cost', parentId: null, isLeaf: true },

  // 损益类
  { id: 's-6001', code: '6001', name: '主营业务收入', type: 'profit_loss', parentId: null, isLeaf: true },
  { id: 's-6401', code: '6401', name: '主营业务成本', type: 'profit_loss', parentId: null, isLeaf: true },
  { id: 's-6403', code: '6403', name: '税金及附加', type: 'profit_loss', parentId: null, isLeaf: true },
  { id: 's-6601', code: '6601', name: '销售费用', type: 'profit_loss', parentId: null, isLeaf: true },
  { id: 's-6602', code: '6602', name: '管理费用', type: 'profit_loss', parentId: null, isLeaf: true },
  { id: 's-6603', code: '6603', name: '财务费用', type: 'profit_loss', parentId: null, isLeaf: true },
]

const OPENING_BALANCES = []  // 新成立企业，无期初余额

const EVENTS = [
  // ─── 1月2日：资金筹集 ───
  {
    id: 'evt_01',
    date: '2026-01-02',
    title: '收到投资者投资款',
    description: '投资者向华鑫制造厂投入注册资本500,000元，已存入银行账户。公司注册资本500,000元，由两位股东出资设立。',
    documents: [
      { type: 'receipt', title: '投资款收据', content: '收到股东投资款人民币伍拾万元整（￥500,000.00）' },
      { type: 'bank', title: '银行收款回单', content: '收到投资款￥500,000.00 付款方：股东' },
    ],
    entries: [
      { subjectCode: '1002', summary: '收到投资款', debit: 500000, credit: 0, explanation: '银行存款增加记借方。投资者投入货币资金，企业资产增加。' },
      { subjectCode: '4001', summary: '收到投资款', debit: 0, credit: 500000, explanation: '实收资本增加记贷方。投资者投入的资本属于所有者权益，在实收资本科目核算。' },
    ],
    explanation: '企业设立时收到投资者投入的资本金，一方面资产（银行存款）增加，另一方面所有者权益（实收资本）增加。这是企业设立的第一笔分录，标志着企业的正式成立。',
  },

  {
    id: 'evt_02',
    date: '2026-01-02',
    title: '借入短期借款',
    description: '为补充流动资金，华鑫制造厂向银行借入短期借款200,000元，期限6个月，年利率4.35%，到期一次还本付息。',
    documents: [
      { type: 'bank', title: '银行收款回单', content: '收到短期贷款￥200,000.00 贷款银行：工商银行' },
      { type: 'text', title: '借款合同', content: '短期流动资金借款合同，金额￥200,000.00，年利率4.35%，期限6个月' },
    ],
    entries: [
      { subjectCode: '1002', summary: '借入短期借款', debit: 200000, credit: 0, explanation: '银行存款增加记借方。借款资金已存入银行账户。' },
      { subjectCode: '2001', summary: '借入短期借款', debit: 0, credit: 200000, explanation: '短期借款增加记贷方。向银行借入的款项形成企业的流动负债，需在一年内偿还。' },
    ],
    explanation: '短期借款是企业向银行或其他金融机构借入的期限在一年以内的借款。企业借入资金时，借记银行存款，贷记短期借款。后续需按月计提利息费用。',
  },

  // ─── 1月3日：预付与购置 ───
  {
    id: 'evt_03',
    date: '2026-01-03',
    title: '预付一季度车间房租',
    description: '预付2026年1-3月生产车间厂房租金共计15,000元，以银行存款支付。每月租金5,000元。',
    documents: [
      { type: 'receipt', title: '房屋租赁发票', content: '2026年1-3月车间厂房租金￥15,000.00' },
    ],
    entries: [
      { subjectCode: '1123', summary: '预付一季度房租', debit: 15000, credit: 0, explanation: '预付账款增加记借方。预付的租金属于企业的债权，在后续各月分期摊销计入成本。' },
      { subjectCode: '1002', summary: '预付一季度房租', debit: 0, credit: 15000, explanation: '银行存款减少记贷方。一次性支付三个月租金，资金减少。' },
    ],
    explanation: '预付租金属于预付账款，在支付时暂不确认为成本费用。后续每月摊销5,000元计入制造费用（车间厂房租金属于生产相关的间接费用）。这种先付后摊的方式体现了权责发生制原则。',
  },

  {
    id: 'evt_04',
    date: '2026-01-03',
    title: '购置生产设备',
    description: '购入一台数控机床用于生产加工，价款80,000元，增值税10,400元（税率13%），以银行存款支付。设备预计使用10年，残值率5%。',
    documents: [
      { type: 'invoice', title: '增值税专用发票', content: '数控机床1台 价款￥80,000.00 税额￥10,400.00 价税合计￥90,400.00' },
      { type: 'bank', title: '银行付款回单', content: '支付设备款￥90,400.00 收款方：设备供应商' },
    ],
    entries: [
      { subjectCode: '1601', summary: '购置数控机床', debit: 80000, credit: 0, explanation: '固定资产增加记借方。数控机床作为固定资产核算，在其使用寿命内分期计提折旧。' },
      { subjectCode: '222101', summary: '设备进项税额', debit: 10400, credit: 0, explanation: '应交增值税-进项税额增加记借方。一般纳税人购入固定资产取得的增值税专用发票，进项税额可抵扣销项税额。' },
      { subjectCode: '1002', summary: '支付设备款', debit: 0, credit: 90400, explanation: '银行存款减少记贷方。以银行存款支付设备价款及增值税。' },
    ],
    explanation: '购置固定资产时，按实际支付的价款确认固定资产成本。一般纳税人取得增值税专用发票的，进项税额可以抵扣。后续每月按直线法计提折旧：月折旧额 = 80,000 × (1-5%) ÷ (10×12) = 633.33元。',
  },

  // ─── 1月4日：备用金 ───
  {
    id: 'evt_05',
    date: '2026-01-04',
    title: '提取备用金',
    description: '从银行提取5,000元现金作为日常备用金，用于小额零星支出。',
    documents: [
      { type: 'bank', title: '银行取款回单', content: '提取备用金￥5,000.00' },
    ],
    entries: [
      { subjectCode: '1001', summary: '提取备用金', debit: 5000, credit: 0, explanation: '库存现金增加记借方。备用金是存放在企业的现金，用于日常小额支出。' },
      { subjectCode: '1002', summary: '提取备用金', debit: 0, credit: 5000, explanation: '银行存款减少记贷方。从银行提取现金，银行存款减少。' },
    ],
    explanation: '备用金是企业为日常零星开支而准备的现金。提取备用金时，资金从银行存款转入库存现金，总资产不变，只是资产形态发生了变化。备用金需定期盘点核对，确保账实相符。',
  },

  // ─── 1月5日：采购 ───
  {
    id: 'evt_06',
    date: '2026-01-05',
    title: '采购原材料钢材（现购）',
    description: '向钢铁供应商采购生产用钢材一批，价款50,000元，增值税6,500元（税率13%），以银行存款支付。材料已验收入库。',
    documents: [
      { type: 'invoice', title: '增值税专用发票', content: '钢材一批 价款￥50,000.00 税额￥6,500.00 价税合计￥56,500.00' },
      { type: 'receipt', title: '入库单', content: '钢材一批 数量5吨 金额￥50,000.00 已验收入库' },
    ],
    entries: [
      { subjectCode: '1403', summary: '采购钢材入库', debit: 50000, credit: 0, explanation: '原材料增加记借方。钢材是生产机械零部件的主要材料，按采购成本计入原材料。' },
      { subjectCode: '222101', summary: '钢材进项税额', debit: 6500, credit: 0, explanation: '进项税额增加记借方。购入材料取得的增值税专用发票，进项税额可抵扣。' },
      { subjectCode: '1002', summary: '支付钢材款', debit: 0, credit: 56500, explanation: '银行存款减少记贷方。现购方式下，采购与付款同时完成。' },
    ],
    explanation: '采购原材料并验收入库时，按采购成本计入原材料科目。一般纳税人的进项税额可抵扣销项税额，因此材料成本为不含税金额50,000元，增值税6,500元单独核算。',
  },

  {
    id: 'evt_07',
    date: '2026-01-05',
    title: '采购辅助配件（赊购）',
    description: '向配件供应商采购生产用辅助配件一批，价款20,000元，增值税2,600元（税率13%），货款暂欠。材料已验收入库。',
    documents: [
      { type: 'invoice', title: '增值税专用发票', content: '辅助配件一批 价款￥20,000.00 税额￥2,600.00 价税合计￥22,600.00' },
      { type: 'receipt', title: '入库单', content: '辅助配件一批 金额￥20,000.00 已验收入库' },
    ],
    entries: [
      { subjectCode: '1403', summary: '采购配件入库', debit: 20000, credit: 0, explanation: '原材料增加记借方。辅助配件用于产品装配，属于原材料的一部分。' },
      { subjectCode: '222101', summary: '配件进项税额', debit: 2600, credit: 0, explanation: '进项税额增加记借方。赊购同样取得专用发票，进项税额可抵扣。' },
      { subjectCode: '2202', summary: '赊购配件款', debit: 0, credit: 22600, explanation: '应付账款增加记贷方。货款暂欠，形成对供应商的负债。' },
    ],
    explanation: '赊购（先收货后付款）是企业常见的采购方式。与现购的区别在于贷记科目不同：现购贷记银行存款，赊购贷记应付账款。货款22,600元将在信用期内支付。',
  },

  {
    id: 'evt_36',
    date: '2026-01-05',
    title: '支付工商注册费',
    description: '支付公司注册登记费、印章刻制费等开办费用共计500元，以银行存款支付。',
    documents: [
      { type: 'receipt', title: '行政事业性收费收据', content: '工商注册登记费￥500.00' },
    ],
    entries: [
      { subjectCode: '6602', summary: '支付注册费', debit: 500, credit: 0, explanation: '管理费用增加记借方。公司注册登记费属于开办费用，计入管理费用。' },
      { subjectCode: '1002', summary: '支付注册费', debit: 0, credit: 500, explanation: '银行存款减少记贷方。' },
    ],
    explanation: '企业在设立过程中发生的工商注册登记费、印章刻制费、验资费等开办费用，计入管理费用。这些费用虽然发生在正式经营之前，但按会计准则可直接计入当期损益。',
  },

  // ─── 1月6日：生产领料 ───
  {
    id: 'evt_08',
    date: '2026-01-06',
    title: '生产领用材料（第一次）',
    description: '生产车间为生产机械零部件领用钢材一批，成本30,000元；领用辅助配件一批，成本10,000元。合计40,000元。',
    documents: [
      { type: 'receipt', title: '领料单', content: '钢材￥30,000 辅助配件￥10,000 合计￥40,000 生产车间领用' },
    ],
    entries: [
      { subjectCode: '5001', summary: '生产领用直接材料', debit: 40000, credit: 0, explanation: '生产成本-直接材料增加记借方。生产领用的原材料直接计入产品生产成本。' },
      { subjectCode: '1403', summary: '生产领用材料', debit: 0, credit: 40000, explanation: '原材料减少记贷方。材料被生产领用，从库房发出，原材料库存减少。' },
    ],
    explanation: '生产领用材料时，材料从原材料仓库转移到生产车间。直接用于产品生产的材料成本计入"生产成本-直接材料"科目，这是产品成本的重要组成部分。',
  },

  // ─── 1月7日：销售（第一次） ───
  {
    id: 'evt_09',
    date: '2026-01-07',
    title: '销售产品一批（现销）',
    description: '向甲客户销售机械零部件一批，价款80,000元，增值税10,400元（税率13%），货款已存入银行。',
    documents: [
      { type: 'invoice', title: '增值税专用发票', content: '机械零部件一批 价款￥80,000.00 税额￥10,400.00 价税合计￥90,400.00' },
      { type: 'bank', title: '银行收款回单', content: '收到货款￥90,400.00 付款方：甲客户' },
    ],
    entries: [
      { subjectCode: '1002', summary: '收到销售货款', debit: 90400, credit: 0, explanation: '银行存款增加记借方。现销方式下，销售货款即时到账。' },
      { subjectCode: '6001', summary: '确认产品销售收入', debit: 0, credit: 80000, explanation: '主营业务收入增加记贷方。实现的销售收入按不含税金额确认。' },
      { subjectCode: '222102', summary: '计提销项税额', debit: 0, credit: 10400, explanation: '销项税额增加记贷方。一般纳税人销售产品按13%税率计提销项税额。' },
    ],
    explanation: '现销（一手交钱一手交货）是最直接的销售方式。一般纳税人需做价税分离：不含税收入80,000元确认主营业务收入，增值税10,400元确认为销项税额（负债）。收入确认的同时还需结转销售成本。',
  },

  {
    id: 'evt_10',
    date: '2026-01-07',
    title: '结转已售产品成本（第一批）',
    description: '根据销售出库情况，结转1月7日已售机械零部件的生产成本50,000元。',
    entries: [
      { subjectCode: '6401', summary: '结转销售成本', debit: 50000, credit: 0, explanation: '主营业务成本增加记借方。已售产品的成本从库存商品中转出，计入当期损益。' },
      { subjectCode: '1405', summary: '结转销售成本', debit: 0, credit: 50000, explanation: '库存商品减少记贷方。产品已售出，库存减少。' },
    ],
    explanation: '收入与成本应当配比——确认收入的同时必须结转相应的销售成本。该批产品的毛利率为37.5%（(80,000-50,000)/80,000），反映了企业的盈利水平。',
  },

  // ─── 1月8日：水电费 ───
  {
    id: 'evt_11',
    date: '2026-01-08',
    title: '支付车间水电费',
    description: '支付生产车间1月上旬电费2,654.87元、水费345.13元，合计3,000元。增值税390元（税率13%），以银行存款支付。',
    documents: [
      { type: 'receipt', title: '电费缴费单', content: '1月上旬电费￥2,654.87 税额￥345.13' },
      { type: 'receipt', title: '水费缴费单', content: '1月上旬水费￥345.13 税额￥44.87' },
    ],
    entries: [
      { subjectCode: '5101', summary: '支付车间水电费', debit: 3000, credit: 0, explanation: '制造费用增加记借方。车间的生产用水电费属于间接生产成本，先归集到制造费用。' },
      { subjectCode: '222101', summary: '水电进项税额', debit: 390, credit: 0, explanation: '进项税额增加记借方。水电费取得的增值税专用发票，进项税额可抵扣。' },
      { subjectCode: '1002', summary: '支付水电费', debit: 0, credit: 3390, explanation: '银行存款减少记贷方。' },
    ],
    explanation: '生产车间的日常水电费属于制造费用——间接服务于产品生产的费用。这些费用先归集到制造费用科目，月末再按一定标准分配转入各产品的生产成本。',
  },

  // ─── 1月10日：工资 ───
  {
    id: 'evt_12',
    date: '2026-01-10',
    title: '计提生产工人及车间管理人员工资',
    description: '计提1月份生产车间人员工资：生产工人30,000元，车间管理人员5,000元。合计35,000元。',
    entries: [
      { subjectCode: '5001', summary: '生产工人工资', debit: 30000, credit: 0, explanation: '生产成本-直接人工增加记借方。生产工人工资直接计入产品生产成本。' },
      { subjectCode: '5101', summary: '车间管理工资', debit: 5000, credit: 0, explanation: '制造费用增加记借方。车间管理人员的工资属于间接生产成本。' },
      { subjectCode: '2211', summary: '计提应付工资', debit: 0, credit: 35000, explanation: '应付职工薪酬增加记贷方。计提工资时形成企业的一项负债。' },
    ],
    explanation: '工资计提和发放是两个不同的环节。生产工人工资直接计入生产成本（直接人工），车间管理人员工资先计入制造费用（间接成本），月末再分配转入生产成本。',
  },

  {
    id: 'evt_13',
    date: '2026-01-10',
    title: '计提销售人员及行政管理人员工资',
    description: '计提1月份销售人员工资3,000元，行政管理人员工资7,000元。合计10,000元。',
    entries: [
      { subjectCode: '6601', summary: '销售人员工资', debit: 3000, credit: 0, explanation: '销售费用增加记借方。销售人员的薪酬与销售活动直接相关，计入销售费用。' },
      { subjectCode: '6602', summary: '行政人员工资', debit: 7000, credit: 0, explanation: '管理费用增加记借方。行政管理人员的薪酬属于管理性质的费用支出。' },
      { subjectCode: '2211', summary: '计提应付工资', debit: 0, credit: 10000, explanation: '应付职工薪酬增加记贷方。工资总额形成企业对员工的负债。' },
    ],
    explanation: '不同岗位的工资计入不同的费用科目：生产工人→生产成本，车间管理→制造费用，销售人员→销售费用，行政人员→管理费用。这种分类反映了不同人力资源投入的经济性质。',
  },

  {
    id: 'evt_14',
    date: '2026-01-10',
    title: '发放全体员工工资',
    description: '以银行存款发放1月份全部员工工资45,000元（生产工人30,000+车间管理5,000+销售3,000+行政7,000）。',
    documents: [
      { type: 'bank', title: '银行工资发放回单', content: '发放1月工资￥45,000.00 代发工资' },
      { type: 'text', title: '工资汇总表', content: '生产工人￥30,000 车间管理￥5,000 销售￥3,000 行政￥7,000 合计￥45,000' },
    ],
    entries: [
      { subjectCode: '2211', summary: '发放全部工资', debit: 45000, credit: 0, explanation: '应付职工薪酬减少记借方。发放工资后，企业对员工的负债减少。' },
      { subjectCode: '1002', summary: '发放全部工资', debit: 0, credit: 45000, explanation: '银行存款减少记贷方。实际支付工资，资金流出企业。' },
    ],
    explanation: '实际发放工资时，冲减应付职工薪酬（计提时确认的负债）。本例简化处理未涉及社保公积金和个税代扣代缴。实务中发放工资时还需处理代扣个人社保、住房公积金和个税。',
  },

  // ─── 1月12日：采购+销售 ───
  {
    id: 'evt_15',
    date: '2026-01-12',
    title: '采购原材料（现购）',
    description: '为保障生产持续进行，再次采购原材料一批，价款40,000元，增值税5,200元（税率13%），以银行存款支付。材料已验收入库。',
    documents: [
      { type: 'invoice', title: '增值税专用发票', content: '原材料一批 价款￥40,000.00 税额￥5,200.00 价税合计￥45,200.00' },
      { type: 'receipt', title: '入库单', content: '原材料一批 金额￥40,000.00 已验收入库' },
    ],
    entries: [
      { subjectCode: '1403', summary: '采购材料入库', debit: 40000, credit: 0, explanation: '原材料增加记借方。补充采购的材料入库，增加库存。' },
      { subjectCode: '222101', summary: '材料进项税额', debit: 5200, credit: 0, explanation: '进项税额增加记借方。' },
      { subjectCode: '1002', summary: '支付材料款', debit: 0, credit: 45200, explanation: '银行存款减少记贷方。' },
    ],
    explanation: '企业需要根据生产计划持续采购原材料。本月的第二次采购使原材料库存更加充裕，保障生产不间断运行。截至1月12日，原材料采购总额已达110,000元。',
  },

  {
    id: 'evt_37',
    date: '2026-01-12',
    title: '购买办公用品',
    description: '购买办公用纸、笔、文件夹等办公用品共计1,200元，以银行存款支付。',
    documents: [
      { type: 'receipt', title: '办公用品发票', content: '办公用品一批￥1,200.00' },
    ],
    entries: [
      { subjectCode: '6602', summary: '购买办公用品', debit: 1200, credit: 0, explanation: '管理费用增加记借方。办公用品属于行政管理部门的日常消耗性支出。' },
      { subjectCode: '1002', summary: '购买办公用品', debit: 0, credit: 1200, explanation: '银行存款减少记贷方。' },
    ],
    explanation: '办公用品是维持企业日常管理运营的消耗品，金额不大时直接计入当期管理费用，无需通过物料库存核算。这是最典型的管理费用支出之一。',
  },

  {
    id: 'evt_16',
    date: '2026-01-12',
    title: '销售产品一批（赊销）',
    description: '向乙客户销售精密配件一批，价款100,000元，增值税13,000元（税率13%），货款尚未收到。',
    documents: [
      { type: 'invoice', title: '增值税专用发票', content: '精密配件一批 价款￥100,000.00 税额￥13,000.00 价税合计￥113,000.00' },
    ],
    entries: [
      { subjectCode: '1122', summary: '赊销货款未收', debit: 113000, credit: 0, explanation: '应收账款增加记借方。赊销方式下，货款尚未收到，形成对客户的债权。' },
      { subjectCode: '6001', summary: '确认产品销售收入', debit: 0, credit: 100000, explanation: '主营业务收入增加记贷方。赊销与现销一样，在商品控制权转移时确认收入。' },
      { subjectCode: '222102', summary: '计提销项税额', debit: 0, credit: 13000, explanation: '销项税额增加记贷方。按13%税率计提增值税。' },
    ],
    explanation: '赊销（先交货后收款）是制造业企业常见的销售方式。虽然货款尚未收到，但商品控制权已转移给客户，按权责发生制原则应确认收入。应收账款113,000元将在信用期内向客户收取。',
  },

  {
    id: 'evt_17',
    date: '2026-01-12',
    title: '结转已售产品成本（第二批）',
    description: '结转1月12日已售精密配件的生产成本60,000元。',
    entries: [
      { subjectCode: '6401', summary: '结转销售成本', debit: 60000, credit: 0, explanation: '主营业务成本增加记借方。' },
      { subjectCode: '1405', summary: '结转销售成本', debit: 0, credit: 60000, explanation: '库存商品减少记贷方。' },
    ],
    explanation: '第二笔销售的成本结转。该批产品毛利率为40%（(100,000-60,000)/100,000）。配比原则要求收入与对应的成本在同一会计期间确认。',
  },

  // ─── 1月15日：费用+付款 ───
  {
    id: 'evt_18',
    date: '2026-01-15',
    title: '支付行政管理办公费',
    description: '支付行政管理部门1月份办公场所物业费、清洁费等共计2,000元，以银行存款支付。',
    documents: [
      { type: 'receipt', title: '物业费收据', content: '1月物业管理费￥2,000.00' },
    ],
    entries: [
      { subjectCode: '6602', summary: '支付办公费', debit: 2000, credit: 0, explanation: '管理费用增加记借方。行政部门的物业费、清洁费等办公费用计入管理费用。' },
      { subjectCode: '1002', summary: '支付办公费', debit: 0, credit: 2000, explanation: '银行存款减少记贷方。' },
    ],
    explanation: '企业行政管理部门发生的各项办公费用，包括物业管理费、清洁费、饮用水费等，均计入管理费用。这些费用虽不直接创造价值，但维持了企业的正常运转。',
  },

  {
    id: 'evt_19',
    date: '2026-01-15',
    title: '偿还前欠配件款',
    description: '以银行存款偿还之前欠配件供应商的货款22,600元（含税）。',
    documents: [
      { type: 'bank', title: '银行付款回单', content: '付款￥22,600.00 收款方：配件供应商' },
    ],
    entries: [
      { subjectCode: '2202', summary: '偿还前欠货款', debit: 22600, credit: 0, explanation: '应付账款减少记借方。偿还欠款后，企业对供应商的负债减少。' },
      { subjectCode: '1002', summary: '偿还前欠货款', debit: 0, credit: 22600, explanation: '银行存款减少记贷方。资金流出，用于偿还债务。' },
    ],
    explanation: '赊购（1月5日发生）形成应付账款，偿还时冲减应付账款。这笔业务与evt_07对应，完整展示了赊购→付款的全过程。及时偿还货款有助于维护良好的供应商关系。',
  },

  // ─── 1月18日：预收+采购 ───
  {
    id: 'evt_20',
    date: '2026-01-18',
    title: '预收客户货款',
    description: '预收丙客户购买机械零部件的货款50,000元，已存入银行。待发货后确认收入。',
    documents: [
      { type: 'bank', title: '银行收款回单', content: '收到预收货款￥50,000.00 付款方：丙客户' },
    ],
    entries: [
      { subjectCode: '1002', summary: '收到预收货款', debit: 50000, credit: 0, explanation: '银行存款增加记借方。预收的货款已存入银行。' },
      { subjectCode: '2203', summary: '预收客户货款', debit: 0, credit: 50000, explanation: '预收账款增加记贷方。预收货款属于企业的负债——企业有义务向客户交付商品。' },
    ],
    explanation: '预收货款是客户提前支付的款项，但企业尚未交付商品，因此不确认收入，而是先确认为一项负债（预收账款）。待商品交付后，再冲减预收账款并确认收入。',
  },

  {
    id: 'evt_21',
    date: '2026-01-18',
    title: '采购原材料（现购）',
    description: '为应对后续生产计划，再次采购原材料一批，价款30,000元，增值税3,900元（税率13%），以银行存款支付。材料已验收入库。',
    documents: [
      { type: 'invoice', title: '增值税专用发票', content: '原材料一批 价款￥30,000.00 税额￥3,900.00 价税合计￥33,900.00' },
      { type: 'receipt', title: '入库单', content: '原材料一批 金额￥30,000.00 已验收入库' },
    ],
    entries: [
      { subjectCode: '1403', summary: '采购材料入库', debit: 30000, credit: 0, explanation: '原材料增加记借方。' },
      { subjectCode: '222101', summary: '材料进项税额', debit: 3900, credit: 0, explanation: '进项税额增加记借方。' },
      { subjectCode: '1002', summary: '支付材料款', debit: 0, credit: 33900, explanation: '银行存款减少记贷方。' },
    ],
    explanation: '本月的第三次原材料采购。截至1月18日，原材料采购总额已达140,000元，为全月的生产活动提供了充足的物料保障。',
  },

  // ─── 1月20日：生产领料 ───
  {
    id: 'evt_22',
    date: '2026-01-20',
    title: '生产领用材料（第二次）',
    description: '生产车间为第二批产品生产领用原材料一批，成本40,000元，用于精密配件加工。',
    documents: [
      { type: 'receipt', title: '领料单', content: '原材料一批￥40,000 生产车间领用 用于精密配件生产' },
    ],
    entries: [
      { subjectCode: '5001', summary: '生产领用直接材料', debit: 40000, credit: 0, explanation: '生产成本-直接材料增加记借方。' },
      { subjectCode: '1403', summary: '生产领用材料', debit: 0, credit: 40000, explanation: '原材料减少记贷方。' },
    ],
    explanation: '第二次生产领料，继续将原材料投入到产品生产过程中。直接材料是产品成本的主要构成部分，多次分批领料是制造业生产的常态。',
  },

  // ─── 1月22日：销售（第三次） ───
  {
    id: 'evt_23',
    date: '2026-01-22',
    title: '向预收款客户发货确认收入',
    description: '向丙客户发出机械零部件产品，价款50,000元，增值税6,500元（税率13%）。冲减预收账款，剩余款项暂欠。',
    documents: [
      { type: 'invoice', title: '增值税专用发票', content: '机械零部件一批 价款￥50,000.00 税额￥6,500.00 价税合计￥56,500.00' },
      { type: 'receipt', title: '出库单', content: '机械零部件一批 已发货 客户：丙客户' },
    ],
    entries: [
      { subjectCode: '2203', summary: '冲减预收货款', debit: 50000, credit: 0, explanation: '预收账款减少记借方。向客户发货后，冲销之前确认的预收账款。' },
      { subjectCode: '1122', summary: '剩余应收货款', debit: 6500, credit: 0, explanation: '应收账款增加记借方。发货总价56,500元，预收50,000元，剩余6,500元客户尚未支付。' },
      { subjectCode: '6001', summary: '确认产品销售收入', debit: 0, credit: 50000, explanation: '主营业务收入增加记贷方。商品控制权已转移，满足收入确认条件。' },
      { subjectCode: '222102', summary: '计提销项税额', debit: 0, credit: 6500, explanation: '销项税额增加记贷方。按13%税率计提增值税。' },
    ],
    explanation: '预收账款发出商品的会计处理。发货总价税合计56,500元（含税），其中50,000元冲减预收账款（之前已预收），剩余6,500元转为应收账款。收入按不含税金额50,000元确认。',
  },

  {
    id: 'evt_24',
    date: '2026-01-22',
    title: '结转已售产品成本（第三批）',
    description: '结转1月22日已售机械零部件的生产成本30,000元。',
    entries: [
      { subjectCode: '6401', summary: '结转销售成本', debit: 30000, credit: 0, explanation: '主营业务成本增加记借方。' },
      { subjectCode: '1405', summary: '结转销售成本', debit: 0, credit: 30000, explanation: '库存商品减少记贷方。' },
    ],
    explanation: '第三笔销售的成本结转。该批产品毛利率为40%（(50,000-30,000)/50,000）。三批销售合计收入230,000元，成本140,000元，毛利90,000元，综合毛利率39.13%。',
  },

  // ─── 1月25日：费用 ───
  {
    id: 'evt_25',
    date: '2026-01-25',
    title: '支付产品广告费',
    description: '支付产品宣传广告费5,000元，以银行存款支付。通过行业杂志刊登广告。',
    documents: [
      { type: 'receipt', title: '广告费发票', content: '行业杂志广告费￥5,000.00' },
    ],
    entries: [
      { subjectCode: '6601', summary: '支付广告费', debit: 5000, credit: 0, explanation: '销售费用增加记借方。产品广告费属于为促进销售发生的费用，计入销售费用。' },
      { subjectCode: '1002', summary: '支付广告费', debit: 0, credit: 5000, explanation: '银行存款减少记贷方。' },
    ],
    explanation: '广告费是为推广产品、扩大市场影响力而发生的支出，属于销售费用。合理的广告投入有助于提升品牌知名度和市场份额，但其效益通常具有不确定性。',
  },

  // 1月25日生产领料（第三次）
  {
    id: 'evt_26',
    date: '2026-01-25',
    title: '生产领用材料（第三次）',
    description: '生产车间继续领用原材料一批，成本30,000元，用于装配车间组装产品。',
    documents: [
      { type: 'receipt', title: '领料单', content: '原材料一批￥30,000 装配车间领用' },
    ],
    entries: [
      { subjectCode: '5001', summary: '生产领用直接材料', debit: 30000, credit: 0, explanation: '生产成本-直接材料增加记借方。装配车间的领料同样是直接材料投入。' },
      { subjectCode: '1403', summary: '生产领用材料', debit: 0, credit: 30000, explanation: '原材料减少记贷方。' },
    ],
    explanation: '第三次生产领料。三次领料合计：第一次40,000元+第二次40,000元+第三次30,000元=110,000元。原材料库存结余30,000元（总采购140,000-总领用110,000）。',
  },

  // ─── 1月26日：差旅费 ───
  {
    id: 'evt_27',
    date: '2026-01-26',
    title: '报销差旅费',
    description: '销售经理报销出差交通费、住宿费共计1,500元，以现金支付。',
    documents: [
      { type: 'receipt', title: '差旅费报销单', content: '交通费￥800 住宿费￥500 餐补￥200 合计￥1,500.00' },
    ],
    entries: [
      { subjectCode: '6602', summary: '报销差旅费', debit: 1500, credit: 0, explanation: '管理费用增加记借方。差旅费属于管理性质的费用支出，计入管理费用。' },
      { subjectCode: '1001', summary: '报销差旅费', debit: 0, credit: 1500, explanation: '库存现金减少记贷方。以现金支付报销款，库存现金减少。' },
    ],
    explanation: '差旅费是企业员工因公出差发生的交通、住宿、餐饮等费用。本例费用计入管理费用（销售经理的差旅费也可计入销售费用，实务中按企业内部管理制度确定）。',
  },

  // ─── 1月28日：银行手续费+生产领料 ───
  {
    id: 'evt_28',
    date: '2026-01-28',
    title: '支付银行手续费',
    description: '银行扣收1月份账户管理费及转账手续费共计200元。',
    documents: [
      { type: 'bank', title: '银行扣款回单', content: '1月账户管理费及转账手续费￥200.00' },
    ],
    entries: [
      { subjectCode: '6603', summary: '银行手续费', debit: 200, credit: 0, explanation: '财务费用增加记借方。银行手续费是企业使用银行服务发生的费用，属于财务费用。' },
      { subjectCode: '1002', summary: '银行手续费', debit: 0, credit: 200, explanation: '银行存款减少记贷方。银行直接扣款，企业银行存款减少。' },
    ],
    explanation: '财务费用是指企业为筹集生产经营资金等而发生的费用，包括银行手续费、利息支出、汇兑损益等。银行手续费虽金额不大，但每月都会发生。',
  },

  // ─── 1月30日：计提利息 ───
  {
    id: 'evt_38',
    date: '2026-01-30',
    title: '计提本月短期借款利息',
    description: '计提1月份短期借款（200,000元，年利率4.35%）的利息费用。月利息 = 200,000 × 4.35% ÷ 12 = 725元。',
    documents: [
      { type: 'text', title: '利息计算表', content: '短期借款￥200,000×4.35%÷12=￥725.00' },
    ],
    entries: [
      { subjectCode: '6603', summary: '计提短期借款利息', debit: 725, credit: 0, explanation: '财务费用增加记借方。借款利息是企业使用借入资金付出的代价，按月计提计入财务费用。' },
      { subjectCode: '2241', summary: '计提应付利息', debit: 0, credit: 725, explanation: '其他应付款增加记贷方。计提的利息尚未实际支付，形成一项负债。' },
    ],
    explanation: '按照权责发生制原则，借款利息应在受益期（借款使用期间）内计提，即使尚未实际支付。本案例借款到期一次还本付息，因此每月计提利息，贷记其他应付款。',
  },

  // ─── 1月31日：期末调整 ───
  {
    id: 'evt_29',
    date: '2026-01-31',
    title: '摊销本月车间房租',
    description: '摊销应归属于1月份的车间厂房租金5,000元（预付的15,000元÷3个月）。',
    entries: [
      { subjectCode: '5101', summary: '摊销本月车间房租', debit: 5000, credit: 0, explanation: '制造费用增加记借方。本月应承担的车间房租计入制造费用（生产相关的间接费用）。' },
      { subjectCode: '1123', summary: '摊销本月房租', debit: 0, credit: 5000, explanation: '预付账款减少记贷方。随着时间推移，预付的租金逐步摊销，资产减少。' },
    ],
    explanation: '预付账款按受益期摊销。1月份使用车间一个月，因此将预付的三个月租金中的三分之一（5,000元）转为费用。剩余10,000元仍作为预付账款在后续两个月继续摊销。',
  },

  {
    id: 'evt_30',
    date: '2026-01-31',
    title: '计提固定资产折旧',
    description: '数控机床原值80,000元，预计使用10年（120个月），残值率5%。月折旧额 = 80,000 × 95% ÷ 120 = 633.33元。',
    entries: [
      { subjectCode: '5101', summary: '计提设备折旧', debit: 633.33, credit: 0, explanation: '制造费用增加记借方。生产设备在使用过程中会损耗，其折旧计入制造费用。' },
      { subjectCode: '1602', summary: '计提设备折旧', debit: 0, credit: 633.33, explanation: '累计折旧增加记贷方。累计折旧是固定资产的备抵科目，反映已损耗的价值。' },
    ],
    explanation: '折旧是将固定资产的成本在其使用寿命内系统分摊的过程。本例采用直线法：月折旧额 = (原值 - 预计净残值) ÷ 使用月数 = (80,000 - 4,000) ÷ 120 = 633.33元。生产设备折旧先计入制造费用，再分配转入生产成本。',
  },

  {
    id: 'evt_31',
    date: '2026-01-31',
    title: '归集并分配制造费用',
    description: '将本月归集的制造费用全部转入生产成本。制造费用明细：车间管理工资5,000+水电费3,000+房租摊销5,000+折旧633.33=13,633.33元。',
    entries: [
      { subjectCode: '5001', summary: '分配制造费用转入生产成本', debit: 13633.33, credit: 0, explanation: '生产成本-制造费用增加记借方。将归集的制造费用按一定标准分配计入产品生产成本。' },
      { subjectCode: '5101', summary: '结转制造费用', debit: 0, credit: 13633.33, explanation: '制造费用减少记贷方。制造费用全部结转后，该科目余额为零。' },
    ],
    explanation: '制造费用是生产过程中发生的间接费用，包括车间管理工资、水电费、房租、折旧等。这些费用先归集到制造费用科目，月末全部分配转入生产成本。分配后制造费用科目余额为零。',
  },

  {
    id: 'evt_32',
    date: '2026-01-31',
    title: '完工产品入库',
    description: '本月生产的产品全部完工并验收入库。生产成本总额 = 直接材料110,000 + 直接人工30,000 + 制造费用13,633.33 = 153,633.33元。',
    documents: [
      { type: 'receipt', title: '完工产品入库单', content: '机械零部件及精密配件 生产成本￥153,633.33 已完工入库' },
    ],
    entries: [
      { subjectCode: '1405', summary: '完工产品验收入库', debit: 153633.33, credit: 0, explanation: '库存商品增加记借方。完工产品从生产车间转入仓库，按实际生产成本入账。' },
      { subjectCode: '5001', summary: '结转完工产品成本', debit: 0, credit: 153633.33, explanation: '生产成本减少记贷方。产品成本计算完成，将生产成本结转至库存商品。' },
    ],
    explanation: '完工产品入库标志着生产过程的完成。生产成本（直接材料+直接人工+制造费用）全部转入库存商品。本月生产成本构成：直接材料110,000元（71.6%）、直接人工30,000元（19.5%）、制造费用13,633.33元（8.9%）。完工入库后生产成本科目余额为零。',
  },

  {
    id: 'evt_33',
    date: '2026-01-31',
    title: '计提坏账准备',
    description: '按应收账款余额的5‰计提坏账准备。应收账款余额 = 113,000（evt_16赊销）+ 6,500（evt_23尾款）= 119,500元。应计提 = 119,500 × 5‰ = 597.50元。',
    entries: [
      { subjectCode: '6602', summary: '计提坏账准备', debit: 597.5, credit: 0, explanation: '管理费用增加记借方。坏账准备是按应收账款余额的一定比例计提的信用损失，计入管理费用。' },
      { subjectCode: '1221', summary: '计提坏账准备', debit: 0, credit: 597.5, explanation: '其他应收款（坏账准备）增加记贷方。注意：实务中坏账准备使用"信用减值损失"科目，本例简化使用其他应收款作为备抵。' },
    ],
    explanation: '坏账准备是企业对可能无法收回的应收账款预先计提的损失准备。按应收账款余额百分比法计算：119,500×5‰=597.50元。这体现了会计的谨慎性原则——不高估资产。',
  },

  {
    id: 'evt_34',
    date: '2026-01-31',
    title: '转出未交增值税',
    description: '月末结转增值税。本月进项税额合计28,990元，销项税额合计29,900元，应交增值税=29,900-28,990=910元。',
    entries: [
      { subjectCode: '222102', summary: '结转销项税额', debit: 29900, credit: 0, explanation: '销项税额减少记借方。月末将销项税额明细科目余额转出。' },
      { subjectCode: '222101', summary: '结转进项税额', debit: 0, credit: 28990, explanation: '进项税额减少记贷方。月末将进项税额明细科目余额转出，进项税小于销项税表示应纳增值税。' },
      { subjectCode: '222106', summary: '转出未交增值税', debit: 0, credit: 910, explanation: '应交增值税-未交增值税增加记贷方。本月应交未交的增值税形成对税务局的负债。' },
    ],
    explanation: '月末增值税结转处理。进项税额合计=10,400(设备)+6,500(钢材)+2,600(配件)+390(水电)+5,200(材料)+3,900(材料)=28,990元。销项税额合计=10,400(现销)+13,000(赊销)+6,500(预收发货)=29,900元。本月应交增值税=29,900-28,990=910元。',
  },

  {
    id: 'evt_35',
    date: '2026-01-31',
    title: '计提城建税及教育费附加',
    description: '按实际应交增值税的12%计提城市维护建设税及教育费附加（城建税7%+教育费附加3%+地方教育附加2%）。附加税额 = 910 × 12% = 109.20元。',
    entries: [
      { subjectCode: '6403', summary: '计提城建税及附加', debit: 109.2, credit: 0, explanation: '税金及附加增加记借方。城建税和教育费附加是附加在增值税之上的税费，计入税金及附加科目。' },
      { subjectCode: '222120', summary: '计提城建税及附加', debit: 0, credit: 109.2, explanation: '应交城建税增加记贷方。计提的附加税形成对税务局的负债，待实际缴纳时冲减。' },
    ],
    explanation: '城建税和教育费附加以实际应交增值税为计税依据。城建税税率7%（市区），教育费附加3%，地方教育附加2%，合计12%。本月应交增值税910元，附加税=910×12%=109.20元。这些税费在利润表中计入"税金及附加"。',
  },

  {
    id: 'evt_39',
    date: '2026-01-31',
    title: '支付本月通讯费',
    description: '支付公司1月份电话费及网络通讯费共计1,000元，以银行存款支付。',
    documents: [
      { type: 'receipt', title: '通讯费发票', content: '1月电话费及网络费￥1,000.00' },
    ],
    entries: [
      { subjectCode: '6602', summary: '支付通讯费', debit: 1000, credit: 0, explanation: '管理费用增加记借方。企业通讯费属于行政管理部门的日常运营支出。' },
      { subjectCode: '1002', summary: '支付通讯费', debit: 0, credit: 1000, explanation: '银行存款减少记贷方。' },
    ],
    explanation: '通讯费（电话、网络等）是企业日常管理运营必不可少的费用支出，计入管理费用。这是本月最后一笔经济业务，完成1月份的全部账务处理。',
  },
]

export default {
  id: 'medium_mfg',
  companyInfo: {
    name: '华鑫制造厂',
    shortName: '华鑫制造厂',
    taxType: '一般纳税人',
    taxRate: '13%',
    accountingSystem: '企业会计准则',
    industry: '制造业',
    address: '华鑫工业园8号',
    description: '华鑫制造厂是一家从事工业设备零部件加工制造的生产型企业，拥有2个生产车间和1个装配车间。主要产品为机械零部件和精密配件，月生产能力约5,000件。公司员工45人，其中生产工人30人、车间管理人员5人、销售人员3人、行政管理人员7人。2026年1月新成立，无期初余额。',
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
