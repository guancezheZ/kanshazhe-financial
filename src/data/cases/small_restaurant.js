/**
 * 案例：食味轩餐馆 — 小型餐饮企业
 *
 * 企业背景：社区餐馆，小规模纳税人（个体工商户），主营川湘菜
 * 会计制度：小企业会计准则
 * 纳税人性质：小规模纳税人（增值税征收率3%）
 * 成立时间：2026年1月（新成立，无期初余额）
 *
 * 共 32 个业务事件，覆盖：资金投入→设备购置→食材采购→日常营业→费用支付→工资→税费→期末调整
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
  { id: 's-3001', code: '3001', name: '实收资本', type: 'equity', parentId: null, isLeaf: true },
  { id: 's-4103', code: '4103', name: '本年利润', type: 'equity', parentId: null, isLeaf: true },
  { id: 's-6001', code: '6001', name: '主营业务收入', type: 'profit_loss', parentId: null, isLeaf: true },
  { id: 's-6401', code: '6401', name: '主营业务成本', type: 'profit_loss', parentId: null, isLeaf: true },
  { id: 's-6403', code: '6403', name: '税金及附加', type: 'profit_loss', parentId: null, isLeaf: true },
  { id: 's-6601', code: '6601', name: '销售费用', type: 'profit_loss', parentId: null, isLeaf: true },
  { id: 's-6602', code: '6602', name: '管理费用', type: 'profit_loss', parentId: null, isLeaf: true },
  { id: 's-6603', code: '6603', name: '财务费用', type: 'profit_loss', parentId: null, isLeaf: true },
]

const OPENING_BALANCES = []  // 新成立企业，无期初余额

const EVENTS = [
  // ─── 1月2日：资金投入 ───
  {
    id: 'evt_01',
    date: '2026-01-02',
    title: '个体户老板投入经营资金',
    description: '个体工商户老板王明向食味轩餐馆投入经营资金150,000元，已存入银行账户。',
    documents: [
      { type: 'receipt', title: '投资款收据', content: '收到王明经营资金人民币壹拾伍万元整（￥150,000.00）' },
      { type: 'bank', title: '银行进账单', content: '收款人：食味轩餐馆 金额：￥150,000.00 付款人：王明' },
    ],
    entries: [
      { subjectCode: '1002', summary: '收到经营资金', debit: 150000, credit: 0, explanation: '银行存款增加记借方。个体工商户投入的货币资金存入银行，企业资产增加。' },
      { subjectCode: '3001', summary: '收到经营资金', debit: 0, credit: 150000, explanation: '实收资本增加记贷方。个体工商户业主投入的资本属于所有者权益，在实收资本科目核算。个体工商户的注册资本由业主自行决定。' },
    ],
    explanation: '个体工商户开业时由业主投入经营资金，一方面资产（银行存款）增加，另一方面所有者权益（实收资本）增加。个体工商户的实收资本不同于有限责任公司，没有法定最低限额，由业主根据经营需要自行投入。',
  },

  // ─── 1月2日：预付房租 ───
  {
    id: 'evt_02',
    date: '2026-01-02',
    title: '预付一季度房租',
    description: '预付2026年1-3月店铺租金共计24,000元（每月8,000元），以银行存款支付。',
    documents: [
      { type: 'receipt', title: '房屋租赁发票', content: '美食街88号 2026年1-3月租金 ￥24,000.00 月租金￥8,000.00' },
      { type: 'bank', title: '银行付款回单', content: '付款人：食味轩餐馆 收款人：美食街物业管理有限公司 金额：￥24,000.00' },
    ],
    entries: [
      { subjectCode: '1123', summary: '预付一季度房租', debit: 24000, credit: 0, explanation: '预付账款增加记借方。预付的三个月租金属于企业的债权（预付费用），在后续各月分期摊销计入费用。' },
      { subjectCode: '1002', summary: '预付一季度房租', debit: 0, credit: 24000, explanation: '银行存款减少记贷方。一次性支付三个月租金，企业资产（货币资金）减少。' },
    ],
    explanation: '预付租金属于预付账款，是企业预先支付但尚未消耗的经济资源。按照权责发生制原则，支付时暂不确认为费用，在后续受益期间（1-3月）分期摊销。每月摊销8,000元计入销售费用。',
  },

  // ─── 1月3日：购置厨房设备 ───
  {
    id: 'evt_03',
    date: '2026-01-03',
    title: '购置厨房设备',
    description: '购置炉灶、冰柜、排烟罩等厨房设备共计35,000元，以银行存款支付。预计使用5年，残值率5%。',
    documents: [
      { type: 'receipt', title: '厨房设备发票', content: '商用炉灶2台 ￥15,000.00 冰柜1台 ￥8,000.00 排烟系统 ￥12,000.00 合计￥35,000.00' },
      { type: 'bank', title: '银行付款回单', content: '金额：￥35,000.00' },
    ],
    entries: [
      { subjectCode: '1601', summary: '购置厨房设备', debit: 35000, credit: 0, explanation: '固定资产增加记借方。厨房设备作为固定资产核算，在其使用寿命内（5年）分期计提折旧，将成本分摊到各期费用中。' },
      { subjectCode: '1002', summary: '购置厨房设备', debit: 0, credit: 35000, explanation: '银行存款减少记贷方。以银行存款支付设备价款，资产形态从货币资金转换为固定资产。' },
    ],
    explanation: '固定资产是指为生产商品、提供劳务、出租或经营管理而持有的，使用寿命超过一个会计年度的有形资产。餐馆的厨房设备是提供餐饮服务的核心生产工具，按固定资产管理，按月计提折旧。',
  },

  // ─── 1月3日：购置餐厅桌椅 ───
  {
    id: 'evt_04',
    date: '2026-01-03',
    title: '购置餐厅桌椅',
    description: '购置大厅餐桌椅和包间家具共计12,000元，以银行存款支付。预计使用5年，残值率5%。',
    documents: [
      { type: 'receipt', title: '家具发票', content: '餐桌6张 ￥4,800.00 椅子24把 ￥4,800.00 包间沙发4套 ￥2,400.00 合计￥12,000.00' },
      { type: 'bank', title: '银行付款回单', content: '金额：￥12,000.00' },
    ],
    entries: [
      { subjectCode: '1601', summary: '购置餐厅桌椅', debit: 12000, credit: 0, explanation: '固定资产增加记借方。餐厅桌椅家具作为固定资产核算，与厨房设备合并计提折旧。' },
      { subjectCode: '1002', summary: '购置餐厅桌椅', debit: 0, credit: 12000, explanation: '银行存款减少记贷方。以银行存款支付家具采购款。' },
    ],
    explanation: '餐厅桌椅家具属于餐馆的经营用固定资产，与厨房设备一同按月计提折旧。本月共购置固定资产47,000元（厨房设备35,000+桌椅12,000），后续统一计算折旧。',
  },

  // ─── 1月4日：提取备用金 ───
  {
    id: 'evt_05',
    date: '2026-01-04',
    title: '提取备用金',
    description: '从银行提取5,000元现金作为餐馆日常备用金，用于找零和小额支出。',
    documents: [
      { type: 'bank', title: '现金支票存根', content: '用途：备用金 金额：￥5,000.00' },
    ],
    entries: [
      { subjectCode: '1001', summary: '提取备用金', debit: 5000, credit: 0, explanation: '库存现金增加记借方。备用金是存放在餐馆收银处的现金，用于日常找零和小额支出。' },
      { subjectCode: '1002', summary: '提取备用金', debit: 0, credit: 5000, explanation: '银行存款减少记贷方。从银行提取现金，银行存款减少，库存现金增加，总资产不变。' },
    ],
    explanation: '备用金是餐馆为满足日常找零、零星采购等需要而保留的库存现金。餐馆营业需要大量零钱找零，因此备用金金额通常比一般企业高。提取备用金时只是资产形态发生变化，从银行存款转为库存现金。',
  },

  // ─── 1月5日：采购食材 ───
  {
    id: 'evt_06',
    date: '2026-01-05',
    title: '采购食材（现购）',
    description: '从农贸市场采购蔬菜、肉类、水产等食材一批，价款共计10,000元，以银行存款支付，食材已验收入库。',
    documents: [
      { type: 'receipt', title: '采购入库单', content: '蔬菜类￥3,000.00 肉类￥5,000.00 水产类￥1,500.00 其他￥500.00 合计￥10,000.00' },
      { type: 'bank', title: '银行付款回单', content: '金额：￥10,000.00' },
    ],
    entries: [
      { subjectCode: '1405', summary: '采购食材入库', debit: 10000, credit: 0, explanation: '库存商品增加记借方。采购的食材已验收入库，作为库存商品（原材料）核算。餐饮业的食材类似于制造业的原材料。' },
      { subjectCode: '1002', summary: '支付食材款', debit: 0, credit: 10000, explanation: '银行存款减少记贷方。现购方式下，采购与付款同时完成。' },
    ],
    explanation: '餐饮业采购的食材通过"库存商品"科目核算，类似于商业企业的商品采购。食材入库后按采购成本入账，待实际耗用时再结转至主营业务成本。现购是最常见的餐饮采购方式。',
  },

  // ─── 1月5日：营业收入 ───
  {
    id: 'evt_07',
    date: '2026-01-05',
    title: '营业日收入（①）',
    description: '当日餐饮营业收入3,500元，已存入银行账户。小规模纳税人增值税征收率3%。',
    documents: [
      { type: 'receipt', title: '收银日报表', content: '1月5日 大厅收入￥2,200.00 包间收入￥1,300.00 合计￥3,500.00' },
      { type: 'bank', title: '银行进账单', content: '金额：￥3,500.00' },
    ],
    entries: [
      { subjectCode: '1002', summary: '收到营业款', debit: 3500, credit: 0, explanation: '银行存款增加记借方。餐饮营业收入已存入银行账户。' },
      { subjectCode: '6001', summary: '确认营业收入', debit: 0, credit: 3500, explanation: '主营业务收入增加记贷方。小规模纳税人按含税金额确认收入，月末统一计提增值税。' },
    ],
    explanation: '餐馆每日营业收入的确认：实际收到款项时借记银行存款（或库存现金），贷记主营业务收入。小规模纳税人日常可先按含税金额入账，月末采用"提取法"统一进行价税分离。',
  },

  // ─── 1月5日：结转食材成本 ───
  {
    id: 'evt_08',
    date: '2026-01-05',
    title: '结转当日食材成本（①）',
    description: '根据当日耗用情况，结转已使用的食材成本约2,100元（毛利率约40%）。',
    entries: [
      { subjectCode: '6401', summary: '结转食材成本', debit: 2100, credit: 0, explanation: '主营业务成本增加记借方。已耗用的食材成本从库存商品中转出，计入当期损益。餐馆的食材成本是主要营业成本。' },
      { subjectCode: '1405', summary: '结转食材成本', debit: 0, credit: 2100, explanation: '库存商品减少记贷方。食材已耗用，库存减少。' },
    ],
    explanation: '收入与成本应当配比。餐饮业的毛利率通常在30%-50%之间，本例毛利率约为40%（(3,500-2,100)/3,500=40%）。每日根据实际耗用估算食材成本，月末再根据盘点进行调整。',
  },

  // ─── 1月7日：赊购调料 ───
  {
    id: 'evt_09',
    date: '2026-01-07',
    title: '采购调料（赊购）',
    description: '向调味品供应商采购食用油、酱油、味精等调料一批，价款2,000元，货款暂欠，商品已入库。',
    documents: [
      { type: 'receipt', title: '采购入库单', content: '调味品一批 ￥2,000.00 供应商：味之源商贸' },
    ],
    entries: [
      { subjectCode: '1405', summary: '赊购调料入库', debit: 2000, credit: 0, explanation: '库存商品增加记借方。赊购的调料入库后按采购成本确认为库存商品。' },
      { subjectCode: '2202', summary: '赊购调料', debit: 0, credit: 2000, explanation: '应付账款增加记贷方。货款暂欠，形成对供应商的负债。' },
    ],
    explanation: '赊购是餐饮企业常见的采购方式之一，特别适合与长期合作的供应商之间。赊购时先收货后付款，形成应付账款。偿还时再冲减应付账款。赊购有助于缓解餐馆日常经营的资金压力。',
  },

  // ─── 1月8日：营业收入 ───
  {
    id: 'evt_10',
    date: '2026-01-08',
    title: '营业日收入（②）',
    description: '当日餐饮营业收入4,200元，已存入银行账户。',
    documents: [
      { type: 'receipt', title: '收银日报表', content: '1月8日 大厅收入￥2,800.00 包间收入￥1,400.00 合计￥4,200.00' },
    ],
    entries: [
      { subjectCode: '1002', summary: '收到营业款', debit: 4200, credit: 0 },
      { subjectCode: '6001', summary: '确认营业收入', debit: 0, credit: 4200 },
    ],
    explanation: '餐饮营业日收入确认。周末或节假日餐馆收入通常较高，1月8日为周四，收入较前几日有所增长。',
  },

  // ─── 1月8日：结转食材成本 ───
  {
    id: 'evt_11',
    date: '2026-01-08',
    title: '结转当日食材成本（②）',
    description: '根据当日耗用情况，结转已使用的食材成本约2,520元。',
    entries: [
      { subjectCode: '6401', summary: '结转食材成本', debit: 2520, credit: 0 },
      { subjectCode: '1405', summary: '结转食材成本', debit: 0, credit: 2520 },
    ],
    explanation: '结转当日食材成本。毛利率仍维持在40%左右（(4,200-2,520)/4,200=40%），体现了餐饮业成本结构的相对稳定性。',
  },

  // ─── 1月10日：水电费 ───
  {
    id: 'evt_12',
    date: '2026-01-10',
    title: '支付水电费',
    description: '支付1月上旬水电费1,800元，以银行存款支付。',
    documents: [
      { type: 'receipt', title: '水电费缴费单', content: '电费￥1,300.00 水费￥500.00 合计￥1,800.00' },
      { type: 'bank', title: '银行代扣回单', content: '水电费￥1,800.00' },
    ],
    entries: [
      { subjectCode: '6601', summary: '支付水电费', debit: 1800, credit: 0, explanation: '销售费用增加记借方。餐馆的水电费属于维持门店运营的必要支出，计入销售费用。餐饮业水电费占营收比例较高，是重要的运营成本。' },
      { subjectCode: '1002', summary: '支付水电费', debit: 0, credit: 1800, explanation: '银行存款减少记贷方。银行直接扣缴或转账支付水电费。' },
    ],
    explanation: '餐饮业是水电消耗大户，厨房设备运行、照明、空调等都需要大量用电。水电费是餐馆日常运营的重要费用支出，计入销售费用。本例水电费占当日营收约51%，处于餐饮业正常水平。',
  },

  // ─── 1月12日：营业收入 ───
  {
    id: 'evt_13',
    date: '2026-01-12',
    title: '营业日收入（③）',
    description: '当日餐饮营业收入3,800元，已存入银行账户。',
    documents: [
      { type: 'receipt', title: '收银日报表', content: '1月12日 大厅收入￥2,500.00 包间收入￥1,300.00 合计￥3,800.00' },
    ],
    entries: [
      { subjectCode: '1002', summary: '收到营业款', debit: 3800, credit: 0 },
      { subjectCode: '6001', summary: '确认营业收入', debit: 0, credit: 3800 },
    ],
    explanation: '餐饮营业日收入确认。1月12日为周一，工作日午餐和晚餐时段正常营业，收入较为平稳。',
  },

  // ─── 1月12日：结转食材成本 ───
  {
    id: 'evt_14',
    date: '2026-01-12',
    title: '结转当日食材成本（③）',
    description: '结转当日已使用的食材成本约2,280元。',
    entries: [
      { subjectCode: '6401', summary: '结转食材成本', debit: 2280, credit: 0 },
      { subjectCode: '1405', summary: '结转食材成本', debit: 0, credit: 2280 },
    ],
    explanation: '结转当日食材成本。毛利率约为40%（(3,800-2,280)/3,800=40%），与之前保持一致。',
  },

  // ─── 1月15日：保洁服务费 ───
  {
    id: 'evt_15',
    date: '2026-01-15',
    title: '支付保洁服务费',
    description: '支付1月份餐厅保洁服务费1,000元，以银行存款支付。',
    documents: [
      { type: 'receipt', title: '保洁服务发票', content: '1月餐厅保洁服务费 ￥1,000.00' },
      { type: 'bank', title: '银行付款回单', content: '金额：￥1,000.00' },
    ],
    entries: [
      { subjectCode: '6601', summary: '支付保洁服务费', debit: 1000, credit: 0, explanation: '销售费用增加记借方。餐厅保洁服务费属于维持门店卫生环境的运营支出，计入销售费用。' },
      { subjectCode: '1002', summary: '支付保洁服务费', debit: 0, credit: 1000, explanation: '银行存款减少记贷方。以银行存款支付外包保洁服务费。' },
    ],
    explanation: '餐饮业对卫生环境要求高，许多餐馆将保洁服务外包给专业公司。保洁服务费属于维持门店正常运营的必要费用，计入销售费用。此外包方式也节省了餐馆自行管理保洁人员的成本。',
  },

  // ─── 1月15日：计提工资 ───
  {
    id: 'evt_16',
    date: '2026-01-15',
    title: '计提员工工资',
    description: '计提1月份员工工资共计24,000元。其中厨师和服务人员工资18,000元计入销售费用，店长工资6,000元计入管理费用。',
    documents: [
      { type: 'text', title: '工资汇总表', docTitle: '工资汇总表', content: '1月工资：厨师3人￥12,000.00 服务员3人￥6,000.00 收银员1人￥2,500.00 店长1人￥6,000.00 合计￥26,500.00 其中销售费用￥20,500.00 管理费用￥6,000.00' },
    ],
    entries: [
      { subjectCode: '6601', summary: '厨师和服务人员工资', debit: 18000, credit: 0, explanation: '销售费用增加记借方。厨师和服务人员的薪酬直接与餐馆的餐饮服务相关，计入销售费用。' },
      { subjectCode: '6602', summary: '店长工资', debit: 6000, credit: 0, explanation: '管理费用增加记借方。店长的薪酬属于管理性质的支出，计入管理费用。' },
      { subjectCode: '2211', summary: '计提应付工资', debit: 0, credit: 24000, explanation: '应付职工薪酬增加记贷方。计提工资时形成企业对员工的负债，待实际发放时冲减。' },
    ],
    explanation: '工资计提和工资发放是两个不同的环节。计提时确认当期费用和应付职工薪酬负债；发放时减少负债和资产。餐馆的一线员工（厨师、服务员）薪酬计入销售费用，管理岗位（店长）薪酬计入管理费用。',
  },

  // ─── 1月15日：发放工资 ───
  {
    id: 'evt_17',
    date: '2026-01-15',
    title: '发放员工工资',
    description: '以银行存款发放1月份员工工资24,000元（本例简化处理，不涉及代扣代缴社保和个税）。',
    documents: [
      { type: 'bank', title: '银行代发工资回单', content: '代发工资￥24,000.00 人数：8人' },
    ],
    entries: [
      { subjectCode: '2211', summary: '发放工资', debit: 24000, credit: 0, explanation: '应付职工薪酬减少记借方。实际发放工资后，企业对员工的负债相应减少。' },
      { subjectCode: '1002', summary: '发放工资', debit: 0, credit: 24000, explanation: '银行存款减少记贷方。实际支付工资，资金从企业流向员工账户。' },
    ],
    explanation: '实际发放工资时冲减应付职工薪酬。本例简化处理，未涉及社保和个税的代扣代缴。实际工作中，餐馆通常会涉及代扣养老保险、医疗保险、失业保险和个税等，需通过其他应付款或应交税费科目核算。',
  },

  // ─── 1月18日：营业收入 ───
  {
    id: 'evt_18',
    date: '2026-01-18',
    title: '营业日收入（④）',
    description: '当日餐饮营业收入5,000元，已存入银行账户。当日为周日，客流较多。',
    documents: [
      { type: 'receipt', title: '收银日报表', content: '1月18日（周日）大厅收入￥3,200.00 包间收入￥1,800.00 合计￥5,000.00' },
    ],
    entries: [
      { subjectCode: '1002', summary: '收到营业款', debit: 5000, credit: 0 },
      { subjectCode: '6001', summary: '确认营业收入', debit: 0, credit: 5000 },
    ],
    explanation: '周末餐饮收入通常高于工作日。1月18日为周日，家庭聚餐和朋友聚会较多，收入达到5,000元，为当月单日最高。',
  },

  // ─── 1月18日：结转食材成本 ───
  {
    id: 'evt_19',
    date: '2026-01-18',
    title: '结转当日食材成本（④）',
    description: '结转当日已使用的食材成本约3,000元。',
    entries: [
      { subjectCode: '6401', summary: '结转食材成本', debit: 3000, credit: 0 },
      { subjectCode: '1405', summary: '结转食材成本', debit: 0, credit: 3000 },
    ],
    explanation: '高收入日对应较高的食材成本，毛利率仍维持在40%（(5,000-3,000)/5,000=40%）。',
  },

  // ─── 1月20日：偿还欠款 ───
  {
    id: 'evt_20',
    date: '2026-01-20',
    title: '偿还前欠货款',
    description: '以银行存款偿还之前欠味之源商贸的调料货款2,000元。',
    documents: [
      { type: 'bank', title: '银行付款回单', content: '付款￥2,000.00 收款方：味之源商贸' },
    ],
    entries: [
      { subjectCode: '2202', summary: '偿还前欠货款', debit: 2000, credit: 0, explanation: '应付账款减少记借方。偿还欠款后，企业对供应商的负债减少。' },
      { subjectCode: '1002', summary: '偿还前欠货款', debit: 0, credit: 2000, explanation: '银行存款减少记贷方。资金流出，用于偿还债务。' },
    ],
    explanation: '赊购时形成应付账款，偿还时冲减应付账款。这笔业务与1月7日的赊购业务对应，完整展示了赊购到付款的全过程。及时偿还供应商货款有助于维持良好的商业信用。',
  },

  // ─── 1月22日：采购食材 ───
  {
    id: 'evt_21',
    date: '2026-01-22',
    title: '采购食材（现购）',
    description: '补充采购蔬菜、肉类等食材一批，价款8,000元，以银行存款支付，食材已验收入库。',
    documents: [
      { type: 'receipt', title: '采购入库单', content: '蔬菜类￥2,500.00 肉类￥4,000.00 水产类￥1,500.00 合计￥8,000.00' },
      { type: 'bank', title: '银行付款回单', content: '金额：￥8,000.00' },
    ],
    entries: [
      { subjectCode: '1405', summary: '采购食材入库', debit: 8000, credit: 0, explanation: '库存商品增加记借方。补充采购的食材已验收入库，确保后续营业所需食材充足。' },
      { subjectCode: '1002', summary: '支付食材款', debit: 0, credit: 8000, explanation: '银行存款减少记贷方。现购方式采购食材。' },
    ],
    explanation: '餐饮业食材需要频繁补货，通常每周采购2-3次。本次采购以现购方式支付，补充了前期营业耗用的食材库存。1月份共采购食材三次（10,000+2,000+8,000=20,000元）。',
  },

  // ─── 1月25日：营业收入 ───
  {
    id: 'evt_22',
    date: '2026-01-25',
    title: '营业日收入（⑤）',
    description: '当日餐饮营业收入4,500元，已存入银行账户。',
    documents: [
      { type: 'receipt', title: '收银日报表', content: '1月25日 大厅收入￥3,000.00 包间收入￥1,500.00 合计￥4,500.00' },
    ],
    entries: [
      { subjectCode: '1002', summary: '收到营业款', debit: 4500, credit: 0 },
      { subjectCode: '6001', summary: '确认营业收入', debit: 0, credit: 4500 },
    ],
    explanation: '餐饮营业日收入确认。1月25日临近月末，生意继续保持良好势头。',
  },

  // ─── 1月25日：结转食材成本 ───
  {
    id: 'evt_23',
    date: '2026-01-25',
    title: '结转当日食材成本（⑤）',
    description: '结转当日已使用的食材成本约2,700元。',
    entries: [
      { subjectCode: '6401', summary: '结转食材成本', debit: 2700, credit: 0 },
      { subjectCode: '1405', summary: '结转食材成本', debit: 0, credit: 2700 },
    ],
    explanation: '结转当日食材成本，毛利率维持约40%。',
  },

  // ─── 1月28日：营业收入 ───
  {
    id: 'evt_24',
    date: '2026-01-28',
    title: '营业日收入（⑥）',
    description: '当日餐饮营业收入3,000元，已存入银行账户。',
    documents: [
      { type: 'receipt', title: '收银日报表', content: '1月28日 大厅收入￥2,000.00 包间收入￥1,000.00 合计￥3,000.00' },
    ],
    entries: [
      { subjectCode: '1002', summary: '收到营业款', debit: 3000, credit: 0 },
      { subjectCode: '6001', summary: '确认营业收入', debit: 0, credit: 3000 },
    ],
    explanation: '餐饮营业日收入确认。1月28日为周三，收入相对平稳。本月共记录了6个营业日的收入，合计24,000元，反映了餐馆正常经营状况。',
  },

  // ─── 1月28日：结转食材成本 ───
  {
    id: 'evt_25',
    date: '2026-01-28',
    title: '结转当日食材成本（⑥）',
    description: '结转当日已使用的食材成本约1,800元。',
    entries: [
      { subjectCode: '6401', summary: '结转食材成本', debit: 1800, credit: 0 },
      { subjectCode: '1405', summary: '结转食材成本', debit: 0, credit: 1800 },
    ],
    explanation: '结转当日食材成本。本月6个营业日共结转食材成本14,400元（2,100+2,520+2,280+3,000+2,700+1,800），月均毛利率约为40%。',
  },

  // ─── 1月29日：煤气费 ───
  {
    id: 'evt_26',
    date: '2026-01-29',
    title: '支付煤气费',
    description: '支付1月份燃气费2,500元，以银行存款支付。',
    documents: [
      { type: 'receipt', title: '燃气费缴费单', content: '1月燃气费￥2,500.00（含管道气基础费）' },
      { type: 'bank', title: '银行代扣回单', content: '燃气费￥2,500.00' },
    ],
    entries: [
      { subjectCode: '6601', summary: '支付煤气费', debit: 2500, credit: 0, explanation: '销售费用增加记借方。餐馆的燃气费是厨房烹饪的主要能源消耗，计入销售费用。餐饮业燃气费是仅次于食材成本的重要运营支出。' },
      { subjectCode: '1002', summary: '支付煤气费', debit: 0, credit: 2500, explanation: '银行存款减少记贷方。银行代扣燃气费用。' },
    ],
    explanation: '餐饮业燃气费是厨房运营的核心能源支出，中餐烹饪以明火爆炒为主，燃气消耗量大。煤气费和水电费一样，属于餐馆的日常运营费用，计入销售费用。1月燃气费2,500元占营收比例约10%。',
  },

  // ─── 1月31日：摊销房租 ───
  {
    id: 'evt_27',
    date: '2026-01-31',
    title: '摊销本月房租',
    description: '摊销应归属于1月份的店铺房租8,000元（预付的24,000元 ÷ 3个月）。',
    documents: [
      { type: 'text', title: '房租摊销计算表', docTitle: '房租摊销计算表', content: '预付三个月房租￥24,000.00 本月应摊销￥8,000.00 剩余待摊销￥16,000.00' },
    ],
    entries: [
      { subjectCode: '6601', summary: '摊销本月房租', debit: 8000, credit: 0, explanation: '销售费用增加记借方。本月应承担的房租计入销售费用（店铺租金属于运营场所费用）。' },
      { subjectCode: '1123', summary: '摊销本月房租', debit: 0, credit: 8000, explanation: '预付账款减少记贷方。随着时间推移，预付的房租逐步摊销转化为费用，资产相应减少。' },
    ],
    explanation: '预付账款按受益期分期摊销，体现了权责发生制原则。1月份使用店铺一个月，因此将预付的三个月租金中的1/3（8,000元）转为费用。剩余16,000元仍作为预付账款挂在账上，在2-3月继续摊销。',
  },

  // ─── 1月31日：计提折旧 ───
  {
    id: 'evt_28',
    date: '2026-01-31',
    title: '计提固定资产折旧',
    description: '计提本月固定资产折旧。厨房设备35,000元+餐厅桌椅12,000元=47,000元，残值率5%，使用5年（60个月）。月折旧额=47,000×95%÷60=744.17元。',
    documents: [
      { type: 'text', title: '固定资产折旧计算表', docTitle: '固定资产折旧计算表', content: '固定资产原值￥47,000.00（厨房设备￥35,000.00+餐厅桌椅￥12,000.00）残值率5% 使用年限5年 月折旧额￥744.17' },
    ],
    entries: [
      { subjectCode: '6601', summary: '计提折旧', debit: 744.17, credit: 0, explanation: '销售费用增加记借方。固定资产在使用过程中会逐渐损耗，这种系统性损耗以折旧形式分期计入费用。餐馆的厨房设备和家具折旧计入销售费用。' },
      { subjectCode: '1602', summary: '计提折旧', debit: 0, credit: 744.17, explanation: '累计折旧增加记贷方。累计折旧是固定资产的备抵科目，反映固定资产已损耗的价值。固定资产原值减去累计折旧即为账面净值。' },
    ],
    explanation: '直线法是最常用的折旧方法：月折旧额 = (原值 - 预计净残值) ÷ 预计使用月数。本月折旧 = (47,000 - 47,000×5%) ÷ 60 = 744.17元。累计折旧在资产负债表上作为固定资产的抵减项目列示。',
  },

  // ─── 1月31日：计提增值税 ───
  {
    id: 'evt_29',
    date: '2026-01-31',
    title: '计提应交增值税',
    description: '采用提取法计提1月应交增值税。1月含税营业收入总额=3,500+4,200+3,800+5,000+4,500+3,000=24,000元。不含税收入=24,000÷1.03=23,300.97元。应交增值税=24,000÷1.03×3%=699.03元。',
    documents: [
      { type: 'text', title: '增值税计算表', docTitle: '增值税计算表', content: '含税收入￥24,000.00 征收率3% 不含税收入￥23,300.97 应交增值税￥699.03' },
    ],
    entries: [
      { subjectCode: '6001', summary: '计提应交增值税', debit: 699.03, credit: 0, explanation: '主营业务收入减少记借方。采用"提取法"从含税收入中冲减增值税部分，使主营业务收入还原为不含税金额。' },
      { subjectCode: '2221', summary: '计提应交增值税', debit: 0, credit: 699.03, explanation: '应交税费-应交增值税增加记贷方。小规模纳税人按3%征收率计算应交增值税，形成对税务局的负债。' },
    ],
    explanation: '小规模纳税人增值税采用简易计税方法：应交增值税=含税销售额÷(1+征收率)×征收率。本案例采用"提取法"在月末统一计提，避免在每笔销售时做价税分离，简化日常核算。计提后主营业务收入调整为不含税金额23,300.97元。',
  },

  // ─── 1月31日：计提城建税 ───
  {
    id: 'evt_30',
    date: '2026-01-31',
    title: '计提城建税及教育费附加',
    description: '按实际应缴增值税的12%计提附加税（城建税7%+教育费附加3%+地方教育附加2%）。附加税额=699.03×12%=83.88元。',
    documents: [
      { type: 'text', title: '城建税及附加计算表', docTitle: '城建税及附加计算表', content: '增值税￥699.03 城建税7% 教育费附加3% 地方教育附加2% 合计12% 应缴￥83.88' },
    ],
    entries: [
      { subjectCode: '6403', summary: '计提城建税及附加', debit: 83.88, credit: 0, explanation: '税金及附加增加记借方。城建税和教育费附加是附加在增值税之上的税费，计入税金及附加科目。' },
      { subjectCode: '2221', summary: '计提城建税及附加', debit: 0, credit: 83.88, explanation: '应交税费增加记贷方。计提的附加税与增值税一并形成对税务局的负债，待申报缴纳时冲减。' },
    ],
    explanation: '城市维护建设税和教育费附加是增值税的附加税费，以实际应缴纳的增值税为计税依据。城建税税率7%（市区），教育费附加3%，地方教育附加2%，合计12%。这些税费在计提时计入"税金及附加"科目，影响当期损益。',
  },

  // ─── 1月31日：银行管理费 ───
  {
    id: 'evt_31',
    date: '2026-01-31',
    title: '银行账户管理费',
    description: '银行扣收1月份账户管理费60元。',
    documents: [
      { type: 'bank', title: '银行扣款回单', content: '账户管理费￥60.00' },
    ],
    entries: [
      { subjectCode: '6603', summary: '银行账户管理费', debit: 60, credit: 0, explanation: '财务费用增加记借方。银行账户管理费是企业维持银行账户的日常费用，属于财务费用。' },
      { subjectCode: '1002', summary: '银行账户管理费', debit: 0, credit: 60, explanation: '银行存款减少记贷方。银行直接扣收管理费，企业银行存款减少。' },
    ],
    explanation: '财务费用包括利息支出、银行手续费、账户管理费等各类与资金筹集和银行服务相关的费用。银行账户管理费虽然金额不大，但每月固定发生，需及时入账以确保银行日记账与银行对账单一致。',
  },

  // ─── 1月31日：盘点报损 ───
  {
    id: 'evt_32',
    date: '2026-01-31',
    title: '月末库存盘点及报损',
    description: '月末对库存食材进行盘点，发现部分蔬菜和肉类因保存不当变质，报损金额150元。经店长批准核销。',
    documents: [
      { type: 'receipt', title: '库存盘点表', content: '蔬菜报损￥80.00 肉类报损￥70.00 合计￥150.00 经店长批准核销' },
    ],
    entries: [
      { subjectCode: '6601', summary: '食材报损', debit: 150, credit: 0, explanation: '销售费用增加记借方。食材在储存过程中因保管不当发生的损耗，属于餐馆运营中的正常损耗，计入销售费用。' },
      { subjectCode: '1405', summary: '食材报损', debit: 0, credit: 150, explanation: '库存商品减少记贷方。报损的食材从库存中扣除，账面库存减少。' },
    ],
    explanation: '餐饮业食材盘点报损是常见事项。蔬菜、肉类等生鲜食材保质期短，如果储存不当或采购过量，容易发生变质损耗。月末盘点时发现损耗需及时处理，确保账实相符。合理范围的损耗计入销售费用，重大非正常损耗需查明原因。',
  },
]

export default {
  id: 'small_restaurant',
  companyInfo: {
    name: '食味轩餐馆',
    shortName: '食味轩',
    taxType: '小规模纳税人',
    taxRate: '3%',
    accountingSystem: '小企业会计准则',
    industry: '餐饮业',
    address: '美食街88号',
    description: '食味轩是一家位于美食街的社区餐馆，主营川湘菜。店面面积约120平方米，设有大厅和4个包间。共有员工8人，其中厨师3人、服务员3人、收银1人、店长1人。餐馆于2026年1月新开业，按小企业会计准则进行会计核算，为个体工商户性质（小规模纳税人）。',
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
