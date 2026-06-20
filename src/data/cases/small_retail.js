/**
 * 案例：阳光便利店 — 小型零售企业
 *
 * 企业背景：社区便利店，小规模纳税人，主营日用百货和食品饮料
 * 会计制度：小企业会计准则
 * 纳税人性质：小规模纳税人（增值税征收率3%）
 * 成立时间：2026年1月（新成立，无期初余额）
 *
 * 共 21 个业务事件，覆盖：资金筹集→采购→销售→费用→税费→期末调整
 */

const SUBJECTS = [
  { id: 's-1001', code: '1001', name: '库存现金', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1002', code: '1002', name: '银行存款', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1123', code: '1123', name: '预付账款', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1405', code: '1405', name: '库存商品', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1601', code: '1601', name: '固定资产', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1602', code: '1602', name: '累计折旧', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-2202', code: '2202', name: '应付账款', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-2211', code: '2211', name: '应付职工薪酬', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-2221', code: '2221', name: '应交税费', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-3001', code: '4001', name: '实收资本', type: 'equity', parentId: null, isLeaf: true },
  { id: 's-4103', code: '4103', name: '本年利润', type: 'equity', parentId: null, isLeaf: true },
  { id: 's-6001', code: '6001', name: '主营业务收入', type: 'profit_loss', parentId: null, isLeaf: true },
  { id: 's-6401', code: '6401', name: '主营业务成本', type: 'profit_loss', parentId: null, isLeaf: true },
  { id: 's-6403', code: '6403', name: '税金及附加', type: 'profit_loss', parentId: null, isLeaf: true },
  { id: 's-6601', code: '6601', name: '销售费用', type: 'profit_loss', parentId: null, isLeaf: true },
  { id: 's-6602', code: '6602', name: '管理费用', type: 'profit_loss', parentId: null, isLeaf: true },
]

const OPENING_BALANCES = []  // 新成立企业，无期初余额

const EVENTS = [
  // ─── 1月2日：资金筹集 ───
  {
    id: 'evt_01',
    date: '2026-01-02',
    title: '收到投资者投资款',
    description: '投资者张三向阳光便利店投入资金300,000元，已存入银行账户。',
    documents: [
      { type: 'receipt', title: '投资款收据', content: '收到张三投资款人民币叁拾万元整' },
    ],
    entries: [
      { subjectCode: '1002', summary: '收到投资款', debit: 300000, credit: 0, explanation: '银行存款增加记借方。投资者投入资本，企业资产增加。' },
      { subjectCode: '4001', summary: '收到投资款', debit: 0, credit: 300000, explanation: '实收资本增加记贷方。投资者投入的资本属于所有者权益，需在实收资本科目核算。' },
    ],
    explanation: '企业收到投资者投入的资本金，一方面资产（银行存款）增加，另一方面所有者权益（实收资本）增加。这是企业设立时的第一笔分录。',
  },

  // ─── 1月2日：购置设备 ───
  {
    id: 'evt_02',
    date: '2026-01-02',
    title: '购置收银设备',
    description: '购买收银机一台，价款5,000元，以银行存款支付。预计使用5年，残值率5%。',
    documents: [
      { type: 'receipt', title: '购买收银机发票', content: 'POS收银机 1台 ￥5,000.00' },
    ],
    entries: [
      { subjectCode: '1601', summary: '购置收银机', debit: 5000, credit: 0, explanation: '固定资产增加记借方。收银机作为固定资产核算，在其使用寿命内分期计提折旧。' },
      { subjectCode: '1002', summary: '购置收银机', debit: 0, credit: 5000, explanation: '银行存款减少记贷方。以银行存款支付设备价款，资产形态发生转换。' },
    ],
    explanation: '购置固定资产时，按实际支付的价款确认固定资产成本。后续每月计提折旧，将设备成本分摊到各月费用中。',
  },

  // ─── 1月3日：预付房租 ───
  {
    id: 'evt_03',
    date: '2026-01-03',
    title: '预付一季度房租',
    description: '预付2026年1-3月店铺租金共计9,000元，以银行存款支付。',
    documents: [
      { type: 'receipt', title: '房租收据', content: '2026年1-3月店铺租金 ￥9,000.00' },
    ],
    entries: [
      { subjectCode: '1123', summary: '预付一季度房租', debit: 9000, credit: 0, explanation: '预付账款增加记借方。预付的租金属于企业的债权，在后续各月分期摊销计入费用。' },
      { subjectCode: '1002', summary: '预付一季度房租', debit: 0, credit: 9000, explanation: '银行存款减少记贷方。一次性支付三个月租金，资金减少。' },
    ],
    explanation: '预付租金属于预付账款，在支付时暂不确认为费用。后续每月摊销3,000元计入销售费用（店铺租金属于销售费用）。',
  },

  // ─── 1月3日：采购商品 ───
  {
    id: 'evt_04',
    date: '2026-01-03',
    title: '采购商品（现购）',
    description: '向供应商采购日用百货一批，价款40,000元，以银行存款支付，商品已入库。',
    documents: [
      { type: 'receipt', title: '采购入库单', content: '日用百货一批 金额￥40,000.00' },
      { type: 'receipt', title: '付款回单', content: '支付货款￥40,000.00' },
    ],
    entries: [
      { subjectCode: '1405', summary: '采购商品入库', debit: 40000, credit: 0, explanation: '库存商品增加记借方。采购的商品已验收入库，作为库存商品核算。' },
      { subjectCode: '1002', summary: '支付货款', debit: 0, credit: 40000, explanation: '银行存款减少记贷方。现购方式下，采购与付款同时完成。' },
    ],
    explanation: '采购商品并验收入库时，按采购成本计入库存商品。现购（一手交钱一手交货）是最简单的采购方式。如果赊购则贷记应付账款。',
  },

  // ─── 1月4日：提取备用金 ───
  {
    id: 'evt_04b',
    date: '2026-01-04',
    title: '提取备用金',
    description: '从银行提取2,000元现金作为店铺备用金，用于日常小额支出。',
    documents: [
      { type: 'bank', title: '银行取款回单', content: '提取备用金￥2,000.00' },
    ],
    entries: [
      { subjectCode: '1001', summary: '提取备用金', debit: 2000, credit: 0, explanation: '库存现金增加记借方。备用金是存放在企业的现金，用于日常小额支出。' },
      { subjectCode: '1002', summary: '提取备用金', debit: 0, credit: 2000, explanation: '银行存款减少记贷方。从银行提取现金，银行存款减少。' },
    ],
    explanation: '备用金是企业为日常零星开支而准备的现金。提取备用金时，资金从银行存款转入库存现金，总资产不变，只是资产形态发生了变化。备用金需定期盘点核对。',
  },

  // ─── 1月5日：销售商品 ───
  {
    id: 'evt_05',
    date: '2026-01-05',
    title: '销售商品（①收入确认）',
    description: '当日零售业务收入10,000元，已存入银行。商品成本约7,000元。小规模纳税人增值税征收率3%。',
    documents: [
      { type: 'receipt', title: '销售日报表', content: '1月5日零售收入￥10,000.00' },
    ],
    entries: [
      { subjectCode: '1002', summary: '收到零售货款', debit: 10000, credit: 0, explanation: '银行存款增加记借方。零售业务收入款项已存入银行。' },
      { subjectCode: '6001', summary: '确认零售收入', debit: 0, credit: 10000, explanation: '主营业务收入增加记贷方。实现的销售收入（含税金额）在月末统一计提增值税。' },
    ],
    explanation: '小规模纳税人日常销售可先按含税金额确认收入，月末统一计提增值税。收入确认的同时，还需结转相应的销售成本。',
  },
  {
    id: 'evt_06',
    date: '2026-01-05',
    title: '销售商品（①结转成本）',
    description: '根据1月5日的销售情况，结转已售商品的成本7,000元。',
    entries: [
      { subjectCode: '6401', summary: '结转销售成本', debit: 7000, credit: 0, explanation: '主营业务成本增加记借方。已售商品的成本从库存商品中转出，计入当期损益。' },
      { subjectCode: '1405', summary: '结转销售成本', debit: 0, credit: 7000, explanation: '库存商品减少记贷方。商品已售出，库存减少。' },
    ],
    explanation: '收入与成本应当配比。确认收入的同时，必须结转相应的销售成本。毛利率约为30%（(10,000-7,000)/10,000）。',
  },

  // ─── 1月7日：水电费 ───
  {
    id: 'evt_07',
    date: '2026-01-07',
    title: '支付水电费',
    description: '支付1月上旬水电费800元，以银行存款支付。',
    documents: [
      { type: 'receipt', title: '水电费缴费单', content: '1月上旬电费￥500.00 水费￥300.00' },
    ],
    entries: [
      { subjectCode: '6601', summary: '支付水电费', debit: 800, credit: 0, explanation: '销售费用增加记借方。店铺的水电费属于销售费用，是维持门店运营的必要支出。' },
      { subjectCode: '1002', summary: '支付水电费', debit: 0, credit: 800, explanation: '银行存款减少记贷方。' },
    ],
    explanation: '便利店发生的日常运营费用（水电费、物业费等）计入销售费用。这些费用直接与门店的销售活动相关。',
  },

  // ─── 1月8日：销售 ───
  {
    id: 'evt_08',
    date: '2026-01-08',
    title: '销售商品（②收入确认）',
    description: '当日零售业务收入8,000元，已存入银行。商品成本约5,600元。',
    entries: [
      { subjectCode: '1002', summary: '收到零售货款', debit: 8000, credit: 0 },
      { subjectCode: '6001', summary: '确认零售收入', debit: 0, credit: 8000 },
    ],
    explanation: '零售收入确认，含税金额入账。',
  },
  {
    id: 'evt_09',
    date: '2026-01-08',
    title: '销售商品（②结转成本）',
    description: '结转1月8日已售商品的成本5,600元。',
    entries: [
      { subjectCode: '6401', summary: '结转销售成本', debit: 5600, credit: 0 },
      { subjectCode: '1405', summary: '结转销售成本', debit: 0, credit: 5600 },
    ],
    explanation: '配比原则：收入与对应成本在同一期间确认。',
  },

  // ─── 1月10日：工资 ───
  {
    id: 'evt_10',
    date: '2026-01-10',
    title: '计提员工工资',
    description: '计提1月份员工工资共计8,000元。其中店员薪酬6,000元，店长薪酬2,000元。',
    entries: [
      { subjectCode: '6601', summary: '店员薪酬', debit: 6000, credit: 0, explanation: '店员薪酬计入销售费用，与门店运营直接相关。' },
      { subjectCode: '6602', summary: '店长薪酬', debit: 2000, credit: 0, explanation: '店长薪酬计入管理费用，属于管理性质的支出。' },
      { subjectCode: '2211', summary: '计提应付工资', debit: 0, credit: 8000, explanation: '应付职工薪酬增加记贷方。计提工资时形成企业的一项负债。' },
    ],
    explanation: '工资计提（计提）和工资发放（实发）是两个不同的环节。计提时确认费用和负债，发放时减少负债和资产。',
  },
  {
    id: 'evt_11',
    date: '2026-01-10',
    title: '发放员工工资',
    description: '以银行存款发放1月份员工工资8,000元。',
    entries: [
      { subjectCode: '2211', summary: '发放工资', debit: 8000, credit: 0, explanation: '应付职工薪酬减少记借方。发放工资后，企业对员工的负债减少。' },
      { subjectCode: '1002', summary: '发放工资', debit: 0, credit: 8000, explanation: '银行存款减少记贷方。实际支付工资，资产流出。' },
    ],
    explanation: '实际发放工资时，冲减应付职工薪酬。如果代扣个税或社保，还需贷记应交税费/其他应付款。本例简化处理，不涉及代扣代缴。',
  },

  // ─── 1月12日：销售 ───
  {
    id: 'evt_12',
    date: '2026-01-12',
    title: '销售商品（③收入确认）',
    description: '当日零售业务收入12,000元，已存入银行。商品成本约8,400元。',
    entries: [
      { subjectCode: '1002', summary: '收到零售货款', debit: 12000, credit: 0 },
      { subjectCode: '6001', summary: '确认零售收入', debit: 0, credit: 12000 },
    ],
    explanation: '零售收入确认。',
  },
  {
    id: 'evt_13',
    date: '2026-01-12',
    title: '销售商品（③结转成本）',
    description: '结转1月12日已售商品的成本8,400元。',
    entries: [
      { subjectCode: '6401', summary: '结转销售成本', debit: 8400, credit: 0 },
      { subjectCode: '1405', summary: '结转销售成本', debit: 0, credit: 8400 },
    ],
    explanation: '结转销售成本。',
  },

  // ─── 1月15日：赊购 ───
  {
    id: 'evt_14',
    date: '2026-01-15',
    title: '采购商品（赊购）',
    description: '向乙公司采购食品饮料一批，价款25,000元，货款暂欠，商品已入库。',
    documents: [
      { type: 'receipt', title: '采购入库单', content: '食品饮料一批 金额￥25,000.00' },
    ],
    entries: [
      { subjectCode: '1405', summary: '赊购商品入库', debit: 25000, credit: 0, explanation: '库存商品增加记借方。赊购与现购一样，商品入库时按采购成本确认为库存商品。' },
      { subjectCode: '2202', summary: '赊购商品', debit: 0, credit: 25000, explanation: '应付账款增加记贷方。货款暂欠，形成对供应商的负债。' },
    ],
    explanation: '赊购是指先收货后付款。与现购的区别在于：现购贷记银行存款，赊购贷记应付账款。付款时再冲减应付账款。赊购有助于缓解企业的资金压力。',
  },

  // ─── 1月16日：银行手续费 ───
  {
    id: 'evt_14c',
    date: '2026-01-16',
    title: '支付银行账户管理费',
    description: '银行扣收1月份账户管理费50元。',
    documents: [
      { type: 'bank', title: '银行扣款回单', content: '账户管理费￥50.00' },
    ],
    entries: [
      { subjectCode: '6603', summary: '银行账户管理费', debit: 50, credit: 0, explanation: '财务费用增加记借方。银行账户管理费是维持银行账户的日常费用，属于财务费用。' },
      { subjectCode: '1002', summary: '银行账户管理费', debit: 0, credit: 50, explanation: '银行存款减少记贷方。银行直接扣款，企业银行存款减少。' },
    ],
    explanation: '财务费用是指企业为筹集生产经营资金而发生的费用，包括银行手续费、利息支出等。银行账户管理费虽然金额不大，但每月都会发生，需及时入账。',
  },

  // ─── 1月18日：销售 ───
  {
    id: 'evt_15',
    date: '2026-01-18',
    title: '销售商品（④收入确认）',
    description: '当日零售业务收入10,000元，已存入银行。商品成本约7,000元。',
    entries: [
      { subjectCode: '1002', summary: '收到零售货款', debit: 10000, credit: 0 },
      { subjectCode: '6001', summary: '确认零售收入', debit: 0, credit: 10000 },
    ],
    explanation: '零售收入确认。',
  },
  {
    id: 'evt_16',
    date: '2026-01-18',
    title: '销售商品（④结转成本）',
    description: '结转1月18日已售商品的成本7,000元。',
    entries: [
      { subjectCode: '6401', summary: '结转销售成本', debit: 7000, credit: 0 },
      { subjectCode: '1405', summary: '结转销售成本', debit: 0, credit: 7000 },
    ],
    explanation: '结转销售成本。',
  },

  // ─── 1月20日：付款 ───
  {
    id: 'evt_17',
    date: '2026-01-20',
    title: '偿还前欠货款',
    description: '以银行存款偿还之前欠乙公司的货款25,000元。',
    documents: [
      { type: 'bank', title: '银行付款回单', content: '付款￥25,000.00 收款方：乙公司' },
    ],
    entries: [
      { subjectCode: '2202', summary: '偿还前欠货款', debit: 25000, credit: 0, explanation: '应付账款减少记借方。偿还欠款后，企业对供应商的负债减少。' },
      { subjectCode: '1002', summary: '偿还前欠货款', debit: 0, credit: 25000, explanation: '银行存款减少记贷方。资金流出，用于偿还债务。' },
    ],
    explanation: '赊购时形成应付账款，偿还时冲减应付账款。这笔业务与1月15日的赊购业务对应，完整展示了赊购→付款的全过程。',
  },

  // ─── 1月22日：销售 ───
  {
    id: 'evt_18',
    date: '2026-01-22',
    title: '销售商品（⑤收入确认）',
    description: '当日零售业务收入11,000元，已存入银行。商品成本约7,700元。',
    entries: [
      { subjectCode: '1002', summary: '收到零售货款', debit: 11000, credit: 0 },
      { subjectCode: '6001', summary: '确认零售收入', debit: 0, credit: 11000 },
    ],
    explanation: '零售收入确认。',
  },
  {
    id: 'evt_19',
    date: '2026-01-22',
    title: '销售商品（⑤结转成本）',
    description: '结转1月22日已售商品的成本7,700元。',
    entries: [
      { subjectCode: '6401', summary: '结转销售成本', debit: 7700, credit: 0 },
      { subjectCode: '1405', summary: '结转销售成本', debit: 0, credit: 7700 },
    ],
    explanation: '结转销售成本。',
  },

  // ─── 1月25日：采购 ───
  {
    id: 'evt_20',
    date: '2026-01-25',
    title: '采购商品（现购）',
    description: '补货采购一批商品，价款20,000元，以银行存款支付，商品已入库。',
    entries: [
      { subjectCode: '1405', summary: '采购商品入库', debit: 20000, credit: 0 },
      { subjectCode: '1002', summary: '支付货款', debit: 0, credit: 20000 },
    ],
    explanation: '现购商品入库。1月份总计采购三次（40,000+25,000+20,000=85,000元）。',
  },

  // ─── 1月28日：销售 ───
  {
    id: 'evt_21',
    date: '2026-01-28',
    title: '销售商品（⑥收入确认）',
    description: '当日零售业务收入9,000元，已存入银行。商品成本约6,300元。',
    entries: [
      { subjectCode: '1002', summary: '收到零售货款', debit: 9000, credit: 0 },
      { subjectCode: '6001', summary: '确认零售收入', debit: 0, credit: 9000 },
    ],
    explanation: '零售收入确认。',
  },
  {
    id: 'evt_22',
    date: '2026-01-28',
    title: '销售商品（⑥结转成本）',
    description: '结转1月28日已售商品的成本6,300元。',
    entries: [
      { subjectCode: '6401', summary: '结转销售成本', debit: 6300, credit: 0 },
      { subjectCode: '1405', summary: '结转销售成本', debit: 0, credit: 6300 },
    ],
    explanation: '结转销售成本。',
  },

  // ─── 1月29日：费用报销 ───
  {
    id: 'evt_23',
    date: '2026-01-29',
    title: '报销差旅费',
    description: '店长报销出差交通费和餐费共计500元，以现金支付。',
    documents: [
      { type: 'receipt', title: '差旅费报销单', content: '交通费￥300 餐费￥200 合计￥500' },
    ],
    entries: [
      { subjectCode: '6602', summary: '报销差旅费', debit: 500, credit: 0, explanation: '管理费用增加记借方。差旅费属于管理性质的费用支出。' },
      { subjectCode: '1001', summary: '报销差旅费', debit: 0, credit: 500, explanation: '库存现金减少记贷方。以现金支付报销款。' },
    ],
    explanation: '差旅费是企业管理人员因公出差发生的交通、住宿、餐饮等费用，计入管理费用。报销时冲减库存现金。',
  },

  // ─── 1月30日：库存盘点 ───
  {
    id: 'evt_23b',
    date: '2026-01-30',
    title: '月末库存盘点',
    description: '月末对库存商品进行盘点，发现部分商品因保管不当受损，报损金额200元。经批准计入管理费用。',
    documents: [
      { type: 'receipt', title: '库存盘点表', content: '商品报损￥200.00 经批准核销' },
    ],
    entries: [
      { subjectCode: '6602', summary: '库存商品报损', debit: 200, credit: 0, explanation: '管理费用增加记借方。存货盘亏或毁损，属于管理原因造成的，计入管理费用。' },
      { subjectCode: '1405', summary: '库存商品报损', debit: 0, credit: 200, explanation: '库存商品减少记贷方。实际报损的商品从库存中扣除。' },
    ],
    explanation: '库存商品每月末应进行盘点，核对账实是否相符。盘亏或毁损的商品需查明原因并按规定处理。属于管理不善的计入管理费用，属于自然灾害的计入营业外支出。',
  },

  // ─── 1月31日：期末调整 ───
  {
    id: 'evt_24',
    date: '2026-01-31',
    title: '摊销本月房租',
    description: '摊销应归属于1月份的房租3,000元（预付的9,000元 ÷ 3个月）。',
    entries: [
      { subjectCode: '6601', summary: '摊销本月房租', debit: 3000, credit: 0, explanation: '销售费用增加记借方。本月应承担的房租计入销售费用（店铺租金）。' },
      { subjectCode: '1123', summary: '摊销本月房租', debit: 0, credit: 3000, explanation: '预付账款减少记贷方。随着时间推移，预付的租金逐步摊销，资产减少。' },
    ],
    explanation: '预付账款按受益期摊销。1月份使用店铺一个月，因此将预付的三个月租金中的1/3（3,000元）转为费用。剩余6,000元仍作为预付账款挂在账上。',
  },
  {
    id: 'evt_25',
    date: '2026-01-31',
    title: '计提固定资产折旧',
    description: '收银机原值5,000元，预计使用5年（60个月），残值率5%。本月折旧额 = 5,000 × 95% ÷ 60 = 79.17元。',
    entries: [
      { subjectCode: '6601', summary: '计提折旧', debit: 79.17, credit: 0, explanation: '销售费用增加记借方。固定资产在使用过程中会损耗，这种损耗以折旧形式计入费用。' },
      { subjectCode: '1602', summary: '计提折旧', debit: 0, credit: 79.17, explanation: '累计折旧增加记贷方。累计折旧是固定资产的备抵科目，反映固定资产已损耗的价值。' },
    ],
    explanation: '折旧是将固定资产的成本在其使用寿命内系统分摊的过程。直线法是最常用的折旧方法：月折旧额 = (原值 - 残值) ÷ 使用月数。',
  },
  {
    id: 'evt_26',
    date: '2026-01-31',
    title: '计提增值税',
    description: '1月含税销售收入总额 = 10,000+8,000+12,000+10,000+11,000+9,000 = 60,000元。不含税收入 = 60,000÷1.03 = 58,252.43元，应交增值税 = 60,000÷1.03×3% = 1,747.57元。采用提取法，从主营业务收入中冲减增值税。',
    entries: [
      { subjectCode: '6001', summary: '计提应交增值税', debit: 1747.57, credit: 0, explanation: '主营业务收入减少记借方。采用"提取法"从含税收入中冲减增值税部分，使收入还原为不含税金额。' },
      { subjectCode: '2221', summary: '计提应交增值税', debit: 0, credit: 1747.57, explanation: '应交税费-应交增值税增加记贷方。小规模纳税人按3%征收率计算应交增值税，形成对税务局的负债。' },
    ],
    explanation: '小规模纳税人增值税采用简易计税方法：应交增值税 = 含税销售额÷(1+征收率)×征收率。本案例采用"提取法"在月末统一计提，避免在每笔销售时做价税分离，简化日常操作。',
  },
  {
    id: 'evt_27',
    date: '2026-01-31',
    title: '计提城建税及教育费附加',
    description: '按实际缴纳增值税的12%计提附加税（城建税7%+教育费附加3%+地方教育附加2%）。附加税额 = 1,747.57 × 12% = 209.71元。',
    entries: [
      { subjectCode: '6403', summary: '计提城建税及附加', debit: 209.71, credit: 0, explanation: '税金及附加增加记借方。城建税和教育费附加是附加在增值税之上的税费，计入税金及附加科目。' },
      { subjectCode: '2221', summary: '计提城建税及附加', debit: 0, credit: 209.71, explanation: '应交税费增加记贷方。计提的附加税形成对税务局的负债，待实际缴纳时冲减。' },
    ],
    explanation: '城建税和教育费附加是增值税的附加税费，以实际缴纳的增值税为计税依据。城建税税率7%（市区），教育费附加3%，地方教育附加2%，合计12%。这些税费计入"税金及附加"科目。',
  },
]

export default {
  id: 'small_retail',
  companyInfo: {
    name: '阳光便利店',
    shortName: '阳光便利店',
    taxType: '小规模纳税人',
    taxRate: '3%',
    accountingSystem: '小企业会计准则',
    industry: '零售业',
    address: '阳光社区幸福路88号',
    description: '阳光便利店是一家位于社区内的便民零售店，经营日用百货、食品饮料、烟酒等商品。门店面积约80平方米，日常运营由店长负责，另有2名店员轮班。',
  },
  subjects: SUBJECTS,
  openingBalances: OPENING_BALANCES,
  events: EVENTS,
  periodEnd: {
    depreciation: true,
    amortization: true,
    taxTransfer: false,    // 小企业不涉及所得税结转
    profitTransfer: true,  // 年末才做利润结转，此处不启用
  },
}
