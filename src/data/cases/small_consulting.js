/**
 * 案例：启航企业管理咨询有限公司 — 管理咨询服务业
 *
 * 企业背景：管理咨询服务机构，小规模纳税人，提供战略规划、市场调研、企业培训等专业服务
 * 会计制度：小企业会计准则
 * 纳税人性质：小规模纳税人（增值税征收率3%）
 * 成立时间：2026年1月（新成立，无期初余额）
 *
 * 共 27 个业务事件，覆盖：资金筹集→项目收入→项目成本→日常费用→工资→借款→税费→期末调整
 */

const SUBJECTS = [
  { id: 's-1001', code: '1001', name: '库存现金', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1002', code: '1002', name: '银行存款', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1123', code: '1123', name: '预付账款', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1221', code: '1221', name: '其他应收款', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1601', code: '1601', name: '固定资产', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1602', code: '1602', name: '累计折旧', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-2001', code: '2001', name: '短期借款', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-2202', code: '2202', name: '应付账款', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-2211', code: '2211', name: '应付职工薪酬', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-2221', code: '2221', name: '应交税费', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-2241', code: '2241', name: '其他应付款', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-4001', code: '4001', name: '实收资本', type: 'equity', parentId: null, isLeaf: true },
  { id: 's-4103', code: '4103', name: '本年利润', type: 'equity', parentId: null, isLeaf: true },
  { id: 's-5001', code: '5001', name: '劳务成本', type: 'cost', parentId: null, isLeaf: true },
  { id: 's-6001', code: '6001', name: '主营业务收入', type: 'profit_loss', parentId: null, isLeaf: true },
  { id: 's-6401', code: '6401', name: '主营业务成本', type: 'profit_loss', parentId: null, isLeaf: true },
  { id: 's-6403', code: '6403', name: '税金及附加', type: 'profit_loss', parentId: null, isLeaf: true },
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
    description: '公司收到投资者李华投入资本金200,000元，已存入银行账户。',
    documents: [
      { type: 'receipt', title: '投资款收据', content: '收到李华投资款人民币贰拾万元整（￥200,000.00）' },
      { type: 'bank', title: '银行进账单', content: '收款人：启航企业管理咨询有限公司 金额：￥200,000.00 付款人：李华' },
    ],
    entries: [
      { subjectCode: '1002', summary: '收到投资款', debit: 200000, credit: 0, explanation: '银行存款增加记借方。投资者投入的货币资金存入银行，企业资产增加。' },
      { subjectCode: '4001', summary: '收到投资款', debit: 0, credit: 200000, explanation: '实收资本增加记贷方。投资者投入的资本属于所有者权益，需在实收资本科目核算。有限责任公司按实际收到的出资额入账。' },
    ],
    explanation: '企业设立时收到投资者投入的资本金，一方面资产（银行存款）增加，另一方面所有者权益（实收资本）增加。这是企业设立后的第一笔分录，确立了企业的初始资本结构。',
  },

  // ─── 1月2日：预付房租 ───
  {
    id: 'evt_02',
    date: '2026-01-02',
    title: '预付上半年办公室房租',
    description: '预付2026年1-6月办公室租金共计18,000元（每月3,000元），以银行存款支付。',
    documents: [
      { type: 'receipt', title: '房屋租赁发票', content: '启航商务中心A座1201室 2026年1-6月租金 ￥18,000.00' },
      { type: 'bank', title: '银行付款回单', content: '付款人：启航咨询 收款人：启航物业管理有限公司 金额：￥18,000.00' },
    ],
    entries: [
      { subjectCode: '1123', summary: '预付上半年房租', debit: 18000, credit: 0, explanation: '预付账款增加记借方。预付的半年租金属于企业的债权（预付费用），在后续各月分期摊销计入管理费用。' },
      { subjectCode: '1002', summary: '预付上半年房租', debit: 0, credit: 18000, explanation: '银行存款减少记贷方。一次性支付六个月租金，企业资产（货币资金）减少。' },
    ],
    explanation: '预付租金属于预付账款，是企业预先支付但尚未消耗的经济资源。按照权责发生制原则，支付时暂不确认为费用，在后续受益期间（1-6月）分期摊销。每月摊销3,000元计入管理费用。',
  },

  // ─── 1月3日：购置设备 ───
  {
    id: 'evt_03',
    date: '2026-01-03',
    title: '购置办公设备',
    description: '购置办公电脑、打印机等设备共计12,000元，以银行存款支付。预计使用5年，残值率5%。',
    documents: [
      { type: 'receipt', title: '办公设备发票', content: '办公电脑3台 ￥9,000.00 打印机1台 ￥3,000.00 合计￥12,000.00' },
      { type: 'bank', title: '银行付款回单', content: '金额：￥12,000.00' },
    ],
    entries: [
      { subjectCode: '1601', summary: '购置办公设备', debit: 12000, credit: 0, explanation: '固定资产增加记借方。办公设备作为固定资产核算，在其使用寿命内（5年）分期计提折旧，将成本分摊到各期费用中。' },
      { subjectCode: '1002', summary: '购置办公设备', debit: 0, credit: 12000, explanation: '银行存款减少记贷方。以银行存款支付设备价款，资产形态从货币资金转换为固定资产。' },
    ],
    explanation: '固定资产是指为生产商品、提供劳务、出租或经营管理而持有的，使用寿命超过一个会计年度的有形资产。购置固定资产时按实际支付的价款确认成本，后续按月计提折旧。',
  },

  // ─── 1月3日：提取备用金 ───
  {
    id: 'evt_04',
    date: '2026-01-03',
    title: '提取备用金',
    description: '从银行提取3,000元现金作为公司日常备用金，用于小额零星支出。',
    documents: [
      { type: 'bank', title: '现金支票存根', content: '用途：备用金 金额：￥3,000.00' },
    ],
    entries: [
      { subjectCode: '1001', summary: '提取备用金', debit: 3000, credit: 0, explanation: '库存现金增加记借方。备用金是存放在企业出纳处的现金，用于日常小额支出和差旅费报销等。' },
      { subjectCode: '1002', summary: '提取备用金', debit: 0, credit: 3000, explanation: '银行存款减少记贷方。从银行提取现金，银行存款减少，库存现金增加，总资产不变。' },
    ],
    explanation: '备用金是企业为满足日常零星开支而保留的库存现金。提取备用金时，资金从银行存款转入库存现金，资产总额不变，仅是资产形态发生了变化。备用金需指定专人管理并定期盘点。',
  },

  // ─── 1月5日：A项目 ───
  {
    id: 'evt_05',
    date: '2026-01-05',
    title: 'A咨询项目收款',
    description: '完成A咨询项目第一阶段工作，收到客户支付的服务费20,000元，已存入银行。',
    documents: [
      { type: 'receipt', title: '服务费发票（记账联）', content: '管理咨询服务费 ￥20,000.00 （含税）' },
      { type: 'bank', title: '银行进账单', content: '付款人：A项目客户 金额：￥20,000.00' },
    ],
    entries: [
      { subjectCode: '1002', summary: '收到A项目服务费', debit: 20000, credit: 0, explanation: '银行存款增加记借方。咨询服务收入款项已存入银行账户。' },
      { subjectCode: '6001', summary: '确认A项目收入', debit: 0, credit: 20000, explanation: '主营业务收入增加记贷方。小规模纳税人按含税金额确认收入，月末统一计提增值税。' },
    ],
    explanation: '咨询企业完成服务项目后按约定收取服务费。小规模纳税人日常销售可先按含税金额确认收入，月末采用提取法统一计提增值税。收入确认时需关注服务是否已交付、客户是否已验收。',
  },

  // ─── 1月6日：A项目成本 ───
  {
    id: 'evt_06',
    date: '2026-01-06',
    title: 'A项目支付外包专家咨询费',
    description: 'A项目因涉及专业领域，聘请外部专家提供技术支持，支付咨询费8,000元，以银行存款支付。',
    documents: [
      { type: 'receipt', title: '专家咨询费收据', content: 'A项目专家咨询费 ￥8,000.00' },
      { type: 'bank', title: '银行付款回单', content: '金额：￥8,000.00' },
    ],
    entries: [
      { subjectCode: '5001', summary: '归集A项目专家费', debit: 8000, credit: 0, explanation: '劳务成本增加记借方。项目直接成本先通过劳务成本科目归集，待项目完工时再结转至主营业务成本。' },
      { subjectCode: '1002', summary: '支付专家咨询费', debit: 0, credit: 8000, explanation: '银行存款减少记贷方。以银行存款支付外包专家费用。' },
    ],
    explanation: '劳务成本是服务型企业归集项目直接成本的科目，类似于制造业的"生产成本"。外包专家费、项目人员工资、差旅费等与特定项目直接相关的支出，先在劳务成本中归集，完工后转入主营业务成本。',
  },

  // ─── 1月8日：A项目完工结转 ───
  {
    id: 'evt_07',
    date: '2026-01-08',
    title: 'A项目完工结转成本',
    description: 'A项目全部工作完成，将已归集的劳务成本8,000元结转至主营业务成本。',
    entries: [
      { subjectCode: '6401', summary: '结转A项目成本', debit: 8000, credit: 0, explanation: '主营业务成本增加记借方。项目完工时，将归集的劳务成本转入主营业务成本，与对应的收入进行配比。' },
      { subjectCode: '5001', summary: '结转A项目成本', debit: 0, credit: 8000, explanation: '劳务成本减少记贷方。已完工项目的成本从劳务成本中转出，该科目余额归零。' },
    ],
    explanation: '收入与成本应当遵循配比原则。A项目收入已在1月5日确认，项目完工后将归集的直接成本（专家咨询费8,000元）从劳务成本结转至主营业务成本，使该项目当期的收入与成本相互匹配。',
  },

  // ─── 1月10日：B项目 ───
  {
    id: 'evt_08',
    date: '2026-01-10',
    title: 'B咨询项目收款',
    description: '完成B市场调研项目，收到客户服务费15,000元，已存入银行。该项目周期短，采用直接确认方式。',
    documents: [
      { type: 'receipt', title: '服务费发票（记账联）', content: '市场调研服务费 ￥15,000.00 （含税）' },
      { type: 'bank', title: '银行进账单', content: '付款人：B项目客户 金额：￥15,000.00' },
    ],
    entries: [
      { subjectCode: '1002', summary: '收到B项目服务费', debit: 15000, credit: 0, explanation: '银行存款增加记借方。市场调研项目服务费已收到并存入银行。' },
      { subjectCode: '6001', summary: '确认B项目收入', debit: 0, credit: 15000, explanation: '主营业务收入增加记贷方。按含税金额确认咨询收入。' },
    ],
    explanation: 'B项目周期短，采用完工后一次性确认收入的方式。对于服务周期短（如一周内完成）的项目，可直接在完工收款时确认收入，无需通过劳务成本归集。',
  },

  // ─── 1月10日：B项目直接成本 ───
  {
    id: 'evt_09',
    date: '2026-01-10',
    title: 'B项目支付调研费',
    description: 'B项目支付市场调研数据采购费5,000元，以银行存款支付。因项目已完工，直接计入主营业务成本。',
    documents: [
      { type: 'receipt', title: '数据采购费收据', content: '市场调研数据 ￥5,000.00' },
      { type: 'bank', title: '银行付款回单', content: '金额：￥5,000.00' },
    ],
    entries: [
      { subjectCode: '6401', summary: 'B项目调研费', debit: 5000, credit: 0, explanation: '主营业务成本增加记借方。对于已完工项目发生的直接支出，可直接计入主营业务成本，无需通过劳务成本归集再结转。' },
      { subjectCode: '1002', summary: '支付调研费', debit: 0, credit: 5000, explanation: '银行存款减少记贷方。以银行存款支付数据采购费用。' },
    ],
    explanation: '对于完工后发生的少量直接费用，为简化核算可直接计入主营业务成本，无需先通过劳务成本归集再结转。这种做法适用于项目已完工、费用金额较小且与项目直接相关的情形。',
  },

  // ─── 1月12日：C项目预收款 ───
  {
    id: 'evt_10',
    date: '2026-01-12',
    title: '收到C项目预收款',
    description: '与C客户签订企业培训咨询合同，合同总金额25,000元，客户一次性预付全部款项，已存入银行。',
    documents: [
      { type: 'receipt', title: '收款收据', content: '预收C项目咨询费 ￥25,000.00' },
      { type: 'bank', title: '银行进账单', content: '付款人：C客户 金额：￥25,000.00 备注：培训咨询项目预付款' },
    ],
    entries: [
      { subjectCode: '1002', summary: '收到C项目预收款', debit: 25000, credit: 0, explanation: '银行存款增加记借方。客户预付的项目款已存入银行。' },
      { subjectCode: '2241', summary: '收到C项目预收款', debit: 0, credit: 25000, explanation: '其他应付款增加记贷方。预收客户的项目款属于企业的一项负债，在项目完工交付前不能确认为收入。' },
    ],
    explanation: '预收账款是指企业在提供劳务之前向客户预先收取的款项。按照权责发生制，预收款在收到时形成负债，待项目完工、服务交付后才能确认为收入。咨询行业的预收款通常通过"其他应付款"科目核算。',
  },

  // ─── 1月15日：水电费 ───
  {
    id: 'evt_11',
    date: '2026-01-15',
    title: '支付办公水电费',
    description: '支付1月份办公用水电费1,500元，以银行存款支付。',
    documents: [
      { type: 'receipt', title: '水电费缴费单', content: '电费￥1,100.00 水费￥400.00 合计￥1,500.00' },
      { type: 'bank', title: '银行代扣回单', content: '水电费￥1,500.00' },
    ],
    entries: [
      { subjectCode: '6602', summary: '支付水电费', debit: 1500, credit: 0, explanation: '管理费用增加记借方。办公场所的水电费属于公司管理运营的必要支出，计入管理费用。' },
      { subjectCode: '1002', summary: '支付水电费', debit: 0, credit: 1500, explanation: '银行存款减少记贷方。银行直接扣缴或转账支付水电费。' },
    ],
    explanation: '管理费用是指企业为组织和管理生产经营活动而发生的各项费用。对于服务型企业，办公水电费、行政人员薪酬、办公用品费等均属于管理费用。这些费用直接计入当期损益。',
  },

  // ─── 1月18日：C项目完工确认收入 ───
  {
    id: 'evt_12',
    date: '2026-01-18',
    title: 'C项目完工确认收入',
    description: 'C企业培训咨询项目全部完成并交付，将预收的25,000元转为收入。',
    documents: [
      { type: 'receipt', title: '项目验收单', content: 'C项目已完成验收，确认收入￥25,000.00' },
    ],
    entries: [
      { subjectCode: '2241', summary: '结转C项目预收款至收入', debit: 25000, credit: 0, explanation: '其他应付款减少记借方。项目完工后，预收的款项从负债转出，不再作为负债存在。' },
      { subjectCode: '6001', summary: '确认C项目收入', debit: 0, credit: 25000, explanation: '主营业务收入增加记贷方。项目已完成交付，满足收入确认条件，将预收款转为收入。' },
    ],
    explanation: '预收款转收入是服务型企业常见的会计处理。当劳务已经提供、客户已验收时，原预收的款项满足收入确认条件，从负债（其他应付款）转为收入（主营业务收入）。这笔分录体现了权责发生制的核心——收入在实际赚取时确认，而非在收到现金时确认。',
  },

  // ─── 1月18日：C项目成本 ───
  {
    id: 'evt_13',
    date: '2026-01-18',
    title: 'C项目支付专家费',
    description: 'C项目聘请外部培训讲师，支付课酬费10,000元，以银行存款支付。',
    documents: [
      { type: 'receipt', title: '讲师课酬收据', content: 'C项目培训讲师课酬 ￥10,000.00' },
      { type: 'bank', title: '银行付款回单', content: '金额：￥10,000.00' },
    ],
    entries: [
      { subjectCode: '6401', summary: 'C项目专家费', debit: 10000, credit: 0, explanation: '主营业务成本增加记借方。项目完工后发生的直接成本直接计入主营业务成本，与项目收入配比。' },
      { subjectCode: '1002', summary: '支付专家费', debit: 0, credit: 10000, explanation: '银行存款减少记贷方。以银行存款支付外部讲师课酬。' },
    ],
    explanation: '外部讲师费是咨询培训项目的直接成本。由于C项目已完工（收入已确认），发生的直接成本直接计入主营业务成本，与已确认的项目收入在同一期间配比。这体现了收入与成本的配比原则。',
  },

  // ─── 1月20日：工资计提 ───
  {
    id: 'evt_14',
    date: '2026-01-20',
    title: '计提1月份员工工资',
    description: '计提1月份全体员工工资共计22,000元。其中咨询顾问薪酬18,000元，行政人员薪酬4,000元。',
    documents: [
      { type: 'text', title: '工资汇总表', docTitle: '工资汇总表', content: '1月工资：咨询顾问5人 ￥18,000.00 行政人员2人 ￥4,000.00 合计￥22,000.00' },
    ],
    entries: [
      { subjectCode: '6602', summary: '计提1月工资', debit: 22000, credit: 0, explanation: '管理费用增加记借方。管理咨询公司所有员工（包括顾问和行政）的薪酬均计入管理费用。服务型企业不像制造业有"生产成本"对应生产工人工资，全部薪酬计入管理费用。' },
      { subjectCode: '2211', summary: '计提1月工资', debit: 0, credit: 22000, explanation: '应付职工薪酬增加记贷方。计提工资时形成企业对员工的负债，待实际发放时冲减。' },
    ],
    explanation: '工资计提（计提）和工资发放（实发）是两个不同的环节。计提时确认当期费用和应付职工薪酬负债；发放时减少负债和资产。服务型企业员工薪酬一般全部计入管理费用，因为员工的工作是为企业创造服务收入的管理活动。',
  },

  // ─── 1月20日：工资发放 ───
  {
    id: 'evt_15',
    date: '2026-01-20',
    title: '发放1月份员工工资',
    description: '以银行存款发放1月份员工工资22,000元（本例简化处理，不涉及代扣代缴个人社保和个税）。',
    documents: [
      { type: 'bank', title: '银行代发工资回单', content: '代发工资￥22,000.00 人数：7人' },
    ],
    entries: [
      { subjectCode: '2211', summary: '发放1月工资', debit: 22000, credit: 0, explanation: '应付职工薪酬减少记借方。实际发放工资后，企业对员工的负债相应减少。' },
      { subjectCode: '1002', summary: '发放1月工资', debit: 0, credit: 22000, explanation: '银行存款减少记贷方。实际支付工资，资金从企业流向员工账户。' },
    ],
    explanation: '实际发放工资时冲减应付职工薪酬。本案例简化处理，未涉及社保公积金和个税的代扣代缴。在实际工作中，发放工资时通常会涉及代扣养老保险、医疗保险、失业保险、住房公积金和个人所得税等，需通过其他应付款或应交税费科目核算。',
  },

  // ─── 1月22日：办公用品 ───
  {
    id: 'evt_16',
    date: '2026-01-22',
    title: '采购办公用品',
    description: '采购复印纸、文具等办公用品共计1,800元，以银行存款支付。',
    documents: [
      { type: 'receipt', title: '办公用品发票', content: '复印纸￥800.00 文具￥600.00 墨盒￥400.00 合计￥1,800.00' },
      { type: 'bank', title: '银行付款回单', content: '金额：￥1,800.00' },
    ],
    entries: [
      { subjectCode: '6602', summary: '采购办公用品', debit: 1800, credit: 0, explanation: '管理费用增加记借方。办公用品属于企业日常管理运营的消耗性支出，直接计入当期管理费用。' },
      { subjectCode: '1002', summary: '采购办公用品', debit: 0, credit: 1800, explanation: '银行存款减少记贷方。以银行存款支付办公用品采购款。' },
    ],
    explanation: '办公用品是金额较小、消耗较快的办公消耗品，采购时一般直接计入管理费用，不通过存货科目核算。如果采购量大或用于转售，则需通过存货科目核算领用后再计入费用。',
  },

  // ─── 1月23日：D项目 ───
  {
    id: 'evt_17',
    date: '2026-01-23',
    title: 'D咨询项目收款',
    description: '完成D战略规划咨询项目，收到客户服务费12,000元，已存入银行。',
    documents: [
      { type: 'receipt', title: '服务费发票（记账联）', content: '战略规划咨询服务费 ￥12,000.00 （含税）' },
      { type: 'bank', title: '银行进账单', content: '付款人：D项目客户 金额：￥12,000.00' },
    ],
    entries: [
      { subjectCode: '1002', summary: '收到D项目服务费', debit: 12000, credit: 0, explanation: '银行存款增加记借方。战略规划项目服务费已收到并存入银行。' },
      { subjectCode: '6001', summary: '确认D项目收入', debit: 0, credit: 12000, explanation: '主营业务收入增加记贷方。按含税金额确认咨询收入，月末统一价税分离。' },
    ],
    explanation: 'D项目为完工后一次性收费，收款即确认收入。咨询企业多个项目并行开展是常态，每个项目需单独核算收入，便于月末统计各项目的毛利情况。',
  },

  // ─── 1月23日：D项目成本 ───
  {
    id: 'evt_18',
    date: '2026-01-23',
    title: 'D项目支付交通费',
    description: 'D项目执行过程中发生差旅交通费3,000元（含机票、打车等），以银行存款支付。',
    documents: [
      { type: 'receipt', title: '交通费报销单', content: '机票￥2,200.00 市内交通￥800.00 合计￥3,000.00' },
      { type: 'bank', title: '银行付款回单', content: '金额：￥3,000.00' },
    ],
    entries: [
      { subjectCode: '6401', summary: 'D项目交通费', debit: 3000, credit: 0, explanation: '主营业务成本增加记借方。项目直接相关的差旅交通费计入主营业务成本，与项目收入配比。' },
      { subjectCode: '1002', summary: '支付交通费', debit: 0, credit: 3000, explanation: '银行存款减少记贷方。以银行存款支付项目差旅费用。' },
    ],
    explanation: '项目执行过程中发生的差旅交通费，如果是为特定项目发生的直接支出，应计入该项目的成本（主营业务成本），而非管理费用。正确区分直接费用和间接费用，对于准确计算项目利润至关重要。',
  },

  // ─── 1月25日：差旅报销 ───
  {
    id: 'evt_19',
    date: '2026-01-25',
    title: '员工报销差旅费',
    description: '行政人员报销因公出差产生的住宿费和餐费共计1,200元，以现金支付。',
    documents: [
      { type: 'receipt', title: '差旅费报销单', content: '住宿费￥800.00 餐费补贴￥400.00 合计￥1,200.00' },
    ],
    entries: [
      { subjectCode: '6602', summary: '报销差旅费', debit: 1200, credit: 0, explanation: '管理费用增加记借方。行政人员差旅费属于企业管理性质的费用支出。与项目直接相关的差旅费计入成本，行政管理人员的差旅费计入管理费用。' },
      { subjectCode: '1001', summary: '报销差旅费', debit: 0, credit: 1200, explanation: '库存现金减少记贷方。以备用金现金支付员工报销款，库存现金减少。' },
    ],
    explanation: '差旅费区分计入管理费用还是主营业务成本，取决于出差人员的性质和出差目的。行政管理人员因公出差计入管理费用，而项目人员为特定项目出差的直接费用应计入项目成本。本笔为行政人员差旅，故计入管理费用。',
  },

  // ─── 1月26日：培训费 ───
  {
    id: 'evt_20',
    date: '2026-01-26',
    title: '支付员工培训费',
    description: '支付咨询顾问参加专业培训课程的培训费5,000元，以银行存款支付。',
    documents: [
      { type: 'receipt', title: '培训费发票', content: '企业管理咨询专业培训课程 ￥5,000.00' },
      { type: 'bank', title: '银行付款回单', content: '金额：￥5,000.00' },
    ],
    entries: [
      { subjectCode: '6602', summary: '支付培训费', debit: 5000, credit: 0, explanation: '管理费用增加记借方。员工培训费属于企业为提升员工专业能力而发生的支出，计入管理费用下的职工教育经费。' },
      { subjectCode: '1002', summary: '支付培训费', debit: 0, credit: 5000, explanation: '银行存款减少记贷方。以银行存款支付培训课程费用。' },
    ],
    explanation: '职工教育经费是企业为提升员工素质和专业能力而发生的费用，包括培训费、教材费等。这类费用属于管理性质的支出，计入管理费用。对于咨询企业来说，员工的持续学习和专业提升是保持竞争力的关键。',
  },

  // ─── 1月28日：短期借款 ───
  {
    id: 'evt_21',
    date: '2026-01-28',
    title: '向银行借入短期借款',
    description: '为补充流动资金，向银行借入短期借款100,000元，期限6个月，年利率6%，已存入银行账户。',
    documents: [
      { type: 'receipt', title: '短期借款合同（摘要）', content: '借款金额：￥100,000.00 期限：6个月 年利率：6% 还款方式：到期一次还本付息' },
      { type: 'bank', title: '银行进账单', content: '贷款发放 ￥100,000.00 收款人：启航企业管理咨询有限公司' },
    ],
    entries: [
      { subjectCode: '1002', summary: '收到短期借款', debit: 100000, credit: 0, explanation: '银行存款增加记借方。银行发放的短期贷款已划入企业账户，资产增加。' },
      { subjectCode: '2001', summary: '收到短期借款', debit: 0, credit: 100000, explanation: '短期借款增加记贷方。向银行借入的短期借款形成企业的金融负债。' },
    ],
    explanation: '短期借款是指企业向银行或其他金融机构借入的期限在1年以内（含1年）的借款。企业因经营周转需要向银行借款时，收到款项时确认资产（银行存款）和负债（短期借款）。短期借款的利息通常按季或到期一次性支付。',
  },

  // ─── 1月29日：预付利息 ───
  {
    id: 'evt_22',
    date: '2026-01-29',
    title: '预付第一季度银行借款利息',
    description: '预付短期借款1-3月利息共计1,500元（100,000元×6%÷12×3个月），以银行存款支付。',
    documents: [
      { type: 'bank', title: '银行利息回单', content: '1-3月短期借款利息 ￥1,500.00 年利率6% 本金￥100,000.00' },
    ],
    entries: [
      { subjectCode: '6603', summary: '预付借款利息', debit: 1500, credit: 0, explanation: '财务费用增加记借方。短期借款的利息支出属于财务费用，是企业为筹集经营资金而发生的融资成本。' },
      { subjectCode: '1002', summary: '预付借款利息', debit: 0, credit: 1500, explanation: '银行存款减少记贷方。一次性支付三个月利息，银行存款减少。' },
    ],
    explanation: '财务费用是企业为筹集生产经营所需资金而发生的费用，包括利息支出、银行手续费等。本例采用简化的处理方法，将一季度利息在支付时全部计入当月财务费用。更准确的做法是按月预提利息费用。',
  },

  // ─── 1月31日：摊销房租 ───
  {
    id: 'evt_23',
    date: '2026-01-31',
    title: '摊销本月办公室房租',
    description: '摊销应归属于1月份的办公室房租3,000元（预付的18,000元 ÷ 6个月）。',
    entries: [
      { subjectCode: '6602', summary: '摊销本月房租', debit: 3000, credit: 0, explanation: '管理费用增加记借方。本月应承担的办公室房租计入管理费用，反映企业使用办公场所应负担的费用。' },
      { subjectCode: '1123', summary: '摊销本月房租', debit: 0, credit: 3000, explanation: '预付账款减少记贷方。随着时间推移，预付的房租逐步摊销转化为费用，预付账款（资产）相应减少。' },
    ],
    explanation: '预付账款按受益期分期摊销，体现了权责发生制原则。1月份使用了办公室一个月，因此将预付的六个月租金中的1/6（3,000元）转为费用。剩余15,000元仍作为预付账款挂在账上，在2-6月继续摊销。',
  },

  // ─── 1月31日：计提折旧 ───
  {
    id: 'evt_24',
    date: '2026-01-31',
    title: '计提固定资产折旧',
    description: '计提本月办公设备折旧。设备原值12,000元，预计使用5年（60个月），残值率5%。月折旧额=12,000×95%÷60=190元。',
    documents: [
      { type: 'text', title: '固定资产折旧计算表', docTitle: '固定资产折旧计算表', content: '设备原值￥12,000.00 残值率5% 使用年限5年 月折旧额￥190.00' },
    ],
    entries: [
      { subjectCode: '6602', summary: '计提折旧', debit: 190, credit: 0, explanation: '管理费用增加记借方。固定资产在使用过程中会逐渐损耗，这种系统性损耗以折旧形式分期计入费用。办公设备折旧计入管理费用。' },
      { subjectCode: '1602', summary: '计提折旧', debit: 0, credit: 190, explanation: '累计折旧增加记贷方。累计折旧是固定资产的备抵科目，反映固定资产已损耗的价值。固定资产原值减去累计折旧即为账面净值。' },
    ],
    explanation: '直线法是最常用的折旧方法：月折旧额 = (原值 - 预计净残值) ÷ 预计使用月数。本设备月折旧额 = (12,000 - 12,000×5%) ÷ 60 = 190元。累计折旧在资产负债表上作为固定资产的抵减项目列示。',
  },

  // ─── 1月31日：计提增值税 ───
  {
    id: 'evt_25',
    date: '2026-01-31',
    title: '计提应交增值税',
    description: '采用提取法计提1月应交增值税。1月含税销售收入总额=20,000+15,000+25,000+12,000=72,000元。不含税收入=72,000÷1.03=69,902.91元。应交增值税=72,000÷1.03×3%=2,097.09元。',
    documents: [
      { type: 'text', title: '增值税计算表', docTitle: '增值税计算表', content: '含税收入￥72,000.00 征收率3% 不含税收入￥69,902.91 应交增值税￥2,097.09' },
    ],
    entries: [
      { subjectCode: '6001', summary: '计提应交增值税', debit: 2097.09, credit: 0, explanation: '主营业务收入减少记借方。采用"提取法"从含税收入中冲减增值税部分，使主营业务收入还原为不含税金额。' },
      { subjectCode: '2221', summary: '计提应交增值税', debit: 0, credit: 2097.09, explanation: '应交税费-应交增值税增加记贷方。小规模纳税人按3%征收率计算应交增值税，形成对税务局的负债。' },
    ],
    explanation: '小规模纳税人增值税采用简易计税方法：应交增值税 = 含税销售额 ÷ (1+征收率) × 征收率。本案例采用"提取法"在月末统一计提，避免在每笔销售时做价税分离，简化日常核算。计提后主营业务收入调整为不含税金额69,902.91元。',
  },

  // ─── 1月31日：计提附加税 ───
  {
    id: 'evt_26',
    date: '2026-01-31',
    title: '计提城建税及教育费附加',
    description: '按实际应缴增值税的12%计提附加税（城建税7%+教育费附加3%+地方教育附加2%）。附加税额=2,097.09×12%=251.65元。',
    documents: [
      { type: 'text', title: '城建税及附加计算表', docTitle: '城建税及附加计算表', content: '增值税￥2,097.09 城建税7% 教育费附加3% 地方教育附加2% 合计12% 应缴￥251.65' },
    ],
    entries: [
      { subjectCode: '6403', summary: '计提城建税及附加', debit: 251.65, credit: 0, explanation: '税金及附加增加记借方。城建税和教育费附加是附加在增值税之上的税费，计入税金及附加科目。' },
      { subjectCode: '2221', summary: '计提城建税及附加', debit: 0, credit: 251.65, explanation: '应交税费增加记贷方。计提的附加税与增值税一并形成对税务局的负债，待申报缴纳时冲减。' },
    ],
    explanation: '城市维护建设税和教育费附加是增值税的附加税费，以实际应缴纳的增值税为计税依据。城建税税率7%（市区），教育费附加3%，地方教育附加2%，合计12%。这些税费在计提时计入"税金及附加"科目，影响当期损益。',
  },

  // ─── 1月31日：银行管理费 ───
  {
    id: 'evt_27',
    date: '2026-01-31',
    title: '银行账户管理费',
    description: '银行扣收1月份账户管理费50元。',
    documents: [
      { type: 'bank', title: '银行扣款回单', content: '账户管理费￥50.00' },
    ],
    entries: [
      { subjectCode: '6603', summary: '银行账户管理费', debit: 50, credit: 0, explanation: '财务费用增加记借方。银行账户管理费是企业维持银行账户的日常费用，属于财务费用。' },
      { subjectCode: '1002', summary: '银行账户管理费', debit: 0, credit: 50, explanation: '银行存款减少记贷方。银行直接扣收管理费，企业银行存款减少。' },
    ],
    explanation: '财务费用包括利息支出、银行手续费、账户管理费等各类与资金筹集和银行服务相关的费用。银行账户管理费虽然金额不大，但每月固定发生，需及时入账以确保银行日记账与银行对账单一致。',
  },
]

export default {
  id: 'small_consulting',
  companyInfo: {
    name: '启航企业管理咨询有限公司',
    shortName: '启航咨询',
    taxType: '小规模纳税人',
    taxRate: '3%',
    accountingSystem: '小企业会计准则',
    industry: '管理咨询业',
    address: '启航商务中心A座1201室',
    description: '启航咨询是一家专注于中小企业管理咨询的专业服务机构，提供战略规划、市场调研、企业培训等专业服务。公司拥有5名全职咨询顾问和2名行政人员，以项目制方式为客户提供定制化咨询服务。公司于2026年1月新设立，采用小企业会计准则进行会计核算。',
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
