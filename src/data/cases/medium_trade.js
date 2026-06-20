/**
 * 案例：瑞丰贸易有限公司 — 商业贸易企业
 *
 * 企业背景：电子产品批发销售商贸企业，一般纳税人（增值税税率13%）
 * 会计制度：企业会计准则
 * 纳税人性质：一般纳税人（增值税税率13%）
 * 成立时间：2026年1月（新成立，无期初余额）
 *
 * 共 37 个业务事件，覆盖：资金筹集→采购→销售→费用→工资→税费→期末调整
 */

const SUBJECTS = [
  { id: 's-1001', code: '1001', name: '库存现金', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1002', code: '1002', name: '银行存款', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1122', code: '1122', name: '应收账款', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1123', code: '1123', name: '预付账款', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1221', code: '1221', name: '其他应收款', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1405', code: '1405', name: '库存商品', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1406', code: '1406', name: '发出商品', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1601', code: '1601', name: '固定资产', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1602', code: '1602', name: '累计折旧', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-2001', code: '2001', name: '短期借款', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-2202', code: '2202', name: '应付账款', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-2203', code: '2203', name: '预收账款', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-2211', code: '2211', name: '应付职工薪酬', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-222101', code: '222101', name: '应交增值税-进项税额', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-222102', code: '222102', name: '应交增值税-销项税额', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-222106', code: '222106', name: '应交增值税-未交增值税', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-222120', code: '222120', name: '应交城建税', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-2241', code: '2241', name: '其他应付款', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-4001', code: '4001', name: '实收资本', type: 'equity', parentId: null, isLeaf: true },
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
  // ═══ 1月2日：资金筹集 ═══
  {
    id: 'evt_01',
    date: '2026-01-02',
    title: '收到投资者投资款',
    description: '公司收到各股东投入的注册资本金300,000元，已存入银行账户。',
    documents: [
      { type: 'receipt', title: '投资款收据', content: '收到股东投资款人民币叁拾万元整（￥300,000.00）' },
      { type: 'bank', title: '银行进账单', content: '收款人：瑞丰贸易有限公司 金额：￥300,000.00 款项用途：投资款' },
    ],
    entries: [
      { subjectCode: '1002', summary: '收到投资款', debit: 300000, credit: 0, explanation: '银行存款增加记借方。投资者投入资本，企业资产增加。' },
      { subjectCode: '4001', summary: '收到投资款', debit: 0, credit: 300000, explanation: '实收资本增加记贷方。投资者投入的资本属于所有者权益，需在实收资本科目核算。' },
    ],
    explanation: '企业设立时收到投资者投入的资本金，一方面资产（银行存款）增加，另一方面所有者权益（实收资本）增加。这是企业运营的初始资金来源。',
  },

  // ═══ 1月3日：预付房租+采购 ═══
  {
    id: 'evt_02',
    date: '2026-01-03',
    title: '预付一季度仓库租金',
    description: '预付2026年1-3月仓库租金共计12,000元，以银行存款支付。仓库用于存放电子产品和数码商品。',
    documents: [
      { type: 'receipt', title: '仓库租赁收据', content: '瑞丰大厦地下仓库 2026年1-3月租金 ￥12,000.00' },
      { type: 'bank', title: '银行付款回单', content: '收款方：瑞丰物业公司 金额：￥12,000.00 用途：仓库租金' },
    ],
    entries: [
      { subjectCode: '1123', summary: '预付一季度仓库租金', debit: 12000, credit: 0, explanation: '预付账款增加记借方。预付的租金属于企业的债权，在后续各月分期摊销计入费用。' },
      { subjectCode: '1002', summary: '预付一季度仓库租金', debit: 0, credit: 12000, explanation: '银行存款减少记贷方。一次性支付三个月租金，资金减少。' },
    ],
    explanation: '预付租金属于预付账款，在支付时暂不确认为费用。后续每月摊销4,000元计入销售费用（仓库租金属于销售环节的仓储费用）。',
  },
  {
    id: 'evt_03',
    date: '2026-01-03',
    title: '采购家电一批（现购）',
    description: '向甲公司采购家用电器一批，价款200,000元，增值税26,000元，以银行存款支付，商品已验收入库。',
    documents: [
      { type: 'invoice', title: '增值税专用发票（采购）', content: '甲公司 家用电器一批 金额￥200,000.00 税率13% 税额￥26,000.00' },
      { type: 'receipt', title: '采购入库单', content: '家电类商品 数量200台 金额￥200,000.00' },
      { type: 'bank', title: '银行付款回单', content: '收款方：甲公司 金额：￥226,000.00 用途：采购家电货款' },
    ],
    entries: [
      { subjectCode: '1405', summary: '采购家电入库', debit: 200000, credit: 0, explanation: '库存商品增加记借方。采购的家电已验收入库，按采购成本（不含税）计入库存商品。' },
      { subjectCode: '222101', summary: '采购家电进项税', debit: 26000, credit: 0, explanation: '应交增值税-进项税额增加记借方。一般纳税人取得增值税专用发票，进项税额可抵扣销项税额。' },
      { subjectCode: '1002', summary: '支付采购货款及税款', debit: 0, credit: 226000, explanation: '银行存款减少记贷方。支付含税总价款，资金流出。' },
    ],
    explanation: '一般纳税人采购商品取得增值税专用发票时，采购成本（库存商品入账价值）不含增值税，进项税额单独核算。这与小规模纳税人的价税合一处理方式不同。',
  },
  {
    id: 'evt_04',
    date: '2026-01-05',
    title: '采购数码产品（赊购）',
    description: '向乙公司采购数码产品一批，价款150,000元，增值税19,500元，货款暂欠，商品已验收入库。',
    documents: [
      { type: 'invoice', title: '增值税专用发票（采购）', content: '乙公司 数码产品一批 金额￥150,000.00 税率13% 税额￥19,500.00' },
      { type: 'receipt', title: '采购入库单', content: '数码类商品 数量300台 金额￥150,000.00' },
    ],
    entries: [
      { subjectCode: '1405', summary: '采购数码产品入库', debit: 150000, credit: 0, explanation: '库存商品增加记借方。数码产品已验收入库，按不含税采购成本入账。' },
      { subjectCode: '222101', summary: '采购数码产品进项税', debit: 19500, credit: 0, explanation: '进项税额增加记借方。该进项税额可在当期抵扣销项税额。' },
      { subjectCode: '2202', summary: '赊购数码产品', debit: 0, credit: 169500, explanation: '应付账款增加记贷方。货款暂欠，形成对供应商乙公司的负债。' },
    ],
    explanation: '赊购方式下，企业先取得商品后付款。与现购的区别在于：现购贷记银行存款，赊购贷记应付账款。应付账款是企业的一项流动负债，需在信用期内偿还。',
  },

  // ═══ 1月5日：预收款 ═══
  {
    id: 'evt_05',
    date: '2026-01-05',
    title: '收到C客户预付款',
    description: '收到客户C公司预付的家电采购定金50,000元，已存入银行。',
    documents: [
      { type: 'bank', title: '银行收款回单', content: '付款方：C公司 金额：￥50,000.00 用途：预付家电采购定金' },
    ],
    entries: [
      { subjectCode: '1002', summary: '收到客户预付款', debit: 50000, credit: 0, explanation: '银行存款增加记借方。收到客户预付的货款。' },
      { subjectCode: '2203', summary: '收到客户预付款', debit: 0, credit: 50000, explanation: '预收账款增加记贷方。预收的货款形成对客户的负债，待实际发货时冲减。' },
    ],
    explanation: '预收账款是企业在未发货前预先收取的货款，属于企业的一项负债。在确认收入时，再冲减预收账款。这种交易方式常见于供不应求的市场环境或定制化业务。',
  },

  // ═══ 1月6日：销售给A客户 ═══
  {
    id: 'evt_06',
    date: '2026-01-06',
    title: '销售家电给A客户（收入确认）',
    description: '向A客户销售家用电器一批，价款150,000元，增值税19,500元，款项已存入银行。',
    documents: [
      { type: 'invoice', title: '增值税专用发票（销售）', content: 'A公司 家用电器一批 金额￥150,000.00 税率13% 税额￥19,500.00' },
      { type: 'bank', title: '银行收款回单', content: '付款方：A公司 金额：￥169,500.00 用途：家电采购款' },
      { type: 'receipt', title: '销售出库单', content: '家电类商品 数量100台 金额￥150,000.00' },
    ],
    entries: [
      { subjectCode: '1002', summary: '收到A客户货款', debit: 169500, credit: 0, explanation: '银行存款增加记借方。货款已收妥入账。' },
      { subjectCode: '6001', summary: '销售家电给A客户', debit: 0, credit: 150000, explanation: '主营业务收入增加记贷方。实现的销售收入按不含税金额确认。' },
      { subjectCode: '222102', summary: '销项税额', debit: 0, credit: 19500, explanation: '应交增值税-销项税额增加记贷方。一般纳税人销售商品需开具增值税专用发票，销项税额单独核算。' },
    ],
    explanation: '一般纳税人销售商品时，销售收入按不含税金额确认，增值税销项税额单独核算。这与小规模纳税人的含税入账不同。收入确认的同时需结转相应成本。',
  },
  {
    id: 'evt_07',
    date: '2026-01-06',
    title: '结转已售家电成本',
    description: '结转1月6日销售给A客户的家电成本100,000元（按加权平均单价计算）。',
    entries: [
      { subjectCode: '6401', summary: '结转销售成本——家电', debit: 100000, credit: 0, explanation: '主营业务成本增加记借方。已售商品的成本从库存商品中转出，计入当期损益。' },
      { subjectCode: '1405', summary: '结转销售成本——家电', debit: 0, credit: 100000, explanation: '库存商品减少记贷方。商品已售出，库存减少。' },
    ],
    explanation: '收入与成本应当配比。确认收入的同时，必须结转相应的销售成本。本案例中家电毛利率约为33%（1-(100,000÷150,000)）。',
  },

  // ═══ 1月8日：销售给B客户 ═══
  {
    id: 'evt_08',
    date: '2026-01-08',
    title: '销售数码产品给B客户（收入确认）',
    description: '向B客户销售数码产品一批，价款120,000元，增值税15,600元，货款暂未收到。',
    documents: [
      { type: 'invoice', title: '增值税专用发票（销售）', content: 'B公司 数码产品一批 金额￥120,000.00 税率13% 税额￥15,600.00' },
      { type: 'receipt', title: '销售出库单', content: '数码类商品 数量200台 金额￥120,000.00' },
    ],
    entries: [
      { subjectCode: '1122', summary: '应收B客户货款', debit: 135600, credit: 0, explanation: '应收账款增加记借方。货款尚未收到，形成对客户的债权。' },
      { subjectCode: '6001', summary: '销售数码产品给B客户', debit: 0, credit: 120000, explanation: '主营业务收入增加记贷方。无论款项是否收到，满足收入确认条件即确认收入。' },
      { subjectCode: '222102', summary: '销项税额', debit: 0, credit: 15600, explanation: '销项税额增加记贷方。增值税纳税义务在销售发生时即产生，不论是否收款。' },
    ],
    explanation: '赊销方式下，虽然货款未收，但商品所有权已转移，满足收入确认条件，应确认收入并计提销项税。应收账款成为企业的一项债权，需后续催收。',
  },
  {
    id: 'evt_09',
    date: '2026-01-08',
    title: '结转已售数码产品成本',
    description: '结转1月8日销售给B客户的数码产品成本80,000元。',
    entries: [
      { subjectCode: '6401', summary: '结转销售成本——数码产品', debit: 80000, credit: 0, explanation: '主营业务成本增加记借方。已售数码产品的成本转入当期损益。' },
      { subjectCode: '1405', summary: '结转销售成本——数码产品', debit: 0, credit: 80000, explanation: '库存商品减少记贷方。数码产品已售出，库存减少。' },
    ],
    explanation: '数码产品毛利率约为33%（1-(80,000÷120,000)）。成本结转的准确性直接影响毛利计算的正确性。',
  },

  // ═══ 1月10日：费用+工资 ═══
  {
    id: 'evt_10',
    date: '2026-01-10',
    title: '支付运输费',
    description: '支付本月商品运输费用3,000元，以银行存款支付。',
    documents: [
      { type: 'receipt', title: '运输费发票', content: '物流运输服务费 金额￥3,000.00' },
      { type: 'bank', title: '银行付款回单', content: '收款方：迅达物流公司 金额：￥3,000.00' },
    ],
    entries: [
      { subjectCode: '6601', summary: '支付运输费', debit: 3000, credit: 0, explanation: '销售费用增加记借方。运输费是商品销售过程中发生的必要支出，属于销售费用。' },
      { subjectCode: '1002', summary: '支付运输费', debit: 0, credit: 3000, explanation: '银行存款减少记贷方。' },
    ],
    explanation: '商品流通企业的运输费属于销售费用，是维持销售活动的必要支出。如果运输费金额较大且可直接归属于特定商品，也可计入商品成本（存货成本）。',
  },
  {
    id: 'evt_11',
    date: '2026-01-10',
    title: '计提员工工资',
    description: '计提1月份员工工资共计35,000元。其中销售人员工资24,000元，行政管理人员工资11,000元。',
    entries: [
      { subjectCode: '6601', summary: '销售人员工资', debit: 24000, credit: 0, explanation: '销售费用增加记借方。销售团队（18人）的工资属于销售费用。' },
      { subjectCode: '6602', summary: '行政管理人员工资', debit: 11000, credit: 0, explanation: '管理费用增加记借方。行政财务（4人）和仓储物流（3人）的工资属于管理费用。' },
      { subjectCode: '2211', summary: '计提应付工资', debit: 0, credit: 35000, explanation: '应付职工薪酬增加记贷方。计提工资时形成企业的一项负债。' },
    ],
    explanation: '工资计提（计提）和工资发放（实发）是两个不同的环节。计提时按照员工所属部门将工资费用分配到不同的费用科目，同时确认应付职工薪酬负债。',
  },
  {
    id: 'evt_12',
    date: '2026-01-10',
    title: '发放员工工资',
    description: '以银行存款发放1月份员工工资35,000元。',
    documents: [
      { type: 'bank', title: '银行代发工资回单', content: '代发工资 人数25人 金额￥35,000.00' },
    ],
    entries: [
      { subjectCode: '2211', summary: '发放工资', debit: 35000, credit: 0, explanation: '应付职工薪酬减少记借方。发放工资后，企业对员工的负债减少。' },
      { subjectCode: '1002', summary: '发放工资', debit: 0, credit: 35000, explanation: '银行存款减少记贷方。实际支付工资，资金流出。' },
    ],
    explanation: '实际发放工资时，冲减应付职工薪酬。实务中还需代扣代缴个人所得税和社保，本例简化处理，不涉及代扣代缴。',
  },

  // ═══ 1月12日：销售给C客户（预收转销） ═══
  {
    id: 'evt_13',
    date: '2026-01-12',
    title: '销售家电给C客户（预收转销+补收）',
    description: '向C客户销售家用电器一批，价款100,000元，增值税13,000元。前期已预收50,000元，本次补收63,000元，款项已存入银行。',
    documents: [
      { type: 'invoice', title: '增值税专用发票（销售）', content: 'C公司 家用电器一批 金额￥100,000.00 税率13% 税额￥13,000.00' },
      { type: 'bank', title: '银行收款回单', content: '付款方：C公司 金额：￥63,000.00 用途：尾款' },
      { type: 'receipt', title: '销售出库单', content: '家电类商品 数量80台 金额￥100,000.00' },
    ],
    entries: [
      { subjectCode: '2203', summary: '冲减预收C客户货款', debit: 50000, credit: 0, explanation: '预收账款减少记借方。之前预收的50,000元定金在发货后冲减，转为收入。' },
      { subjectCode: '1002', summary: '收到C客户补付款', debit: 63000, credit: 0, explanation: '银行存款增加记借方。本次补收的尾款63,000元。' },
      { subjectCode: '6001', summary: '销售家电给C客户', debit: 0, credit: 100000, explanation: '主营业务收入增加记贷方。确认销售收入100,000元。' },
      { subjectCode: '222102', summary: '销项税额', debit: 0, credit: 13000, explanation: '销项税额增加记贷方。按13%税率计提销项税13,000元。' },
    ],
    explanation: '预收账款转销是常见的销售模式。客户先预付部分货款（定金），发货时冲减预收账款，同时收取余款。整个交易的总价款为113,000元（含税），其中50,000元已在预收账款中核算，本次实际收到63,000元。',
  },
  {
    id: 'evt_14',
    date: '2026-01-12',
    title: '结转已售家电成本',
    description: '结转1月12日销售给C客户的家电成本65,000元。',
    entries: [
      { subjectCode: '6401', summary: '结转销售成本——家电', debit: 65000, credit: 0, explanation: '主营业务成本增加记借方。已售家电的成本转入当期损益。' },
      { subjectCode: '1405', summary: '结转销售成本——家电', debit: 0, credit: 65000, explanation: '库存商品减少记贷方。家电出库后库存减少。' },
    ],
    explanation: '这批家电的毛利率为35%（1-(65,000÷100,000)），与第一批家电的毛利率相近，说明采购成本控制较为稳定。',
  },

  // ═══ 1月15日：费用 ═══
  {
    id: 'evt_15',
    date: '2026-01-15',
    title: '支付办公费用',
    description: '支付1月份办公室各项办公费用1,800元，以银行存款支付。',
    documents: [
      { type: 'receipt', title: '办公用品采购清单', content: '打印纸、墨盒、文具等办公用品 金额￥1,800.00' },
    ],
    entries: [
      { subjectCode: '6602', summary: '支付办公费用', debit: 1800, credit: 0, explanation: '管理费用增加记借方。办公用品费用属于管理性质的日常支出。' },
      { subjectCode: '1002', summary: '支付办公费用', debit: 0, credit: 1800, explanation: '银行存款减少记贷方。' },
    ],
    explanation: '办公费用是公司日常运营中必不可少的管理性支出，包括办公用品、打印耗材、饮用水等。这类费用金额不大但发生频繁，计入管理费用。',
  },
  {
    id: 'evt_16',
    date: '2026-01-15',
    title: '支付广告费',
    description: '支付1月份产品推广广告费8,000元，以银行存款支付。',
    documents: [
      { type: 'receipt', title: '广告费发票', content: '电子产品推广广告服务费 金额￥8,000.00' },
      { type: 'receipt', title: '广告服务合同', content: '2026年1月线上推广服务 服务费￥8,000.00' },
    ],
    entries: [
      { subjectCode: '6601', summary: '支付广告费', debit: 8000, credit: 0, explanation: '销售费用增加记借方。广告费是促进销售的重要手段，属于销售费用。' },
      { subjectCode: '1002', summary: '支付广告费', debit: 0, credit: 8000, explanation: '银行存款减少记贷方。' },
    ],
    explanation: '广告费是企业为推广产品、扩大市场份额而发生的支出，属于销售费用。合理的广告投入有助于提升品牌知名度和销售额。',
  },
  {
    id: 'evt_17',
    date: '2026-01-15',
    title: '银行结息收入',
    description: '银行账户收到1月上旬存款结息收入200元。',
    documents: [
      { type: 'bank', title: '银行结息回单', content: '存款利息收入 ￥200.00' },
    ],
    entries: [
      { subjectCode: '1002', summary: '银行结息收入', debit: 200, credit: 0, explanation: '银行存款增加记借方。收到的存款利息使银行存款增加。' },
      { subjectCode: '6603', summary: '银行结息收入', debit: 0, credit: 200, explanation: '财务费用减少记贷方（或红字借方）。利息收入冲减财务费用，以负数或贷方反映。' },
    ],
    explanation: '银行存款产生的利息收入冲减财务费用。在会计实务中，利息收入也可借记银行存款，贷记财务费用（贷方蓝字），或用红字借记财务费用。本案例采用贷方蓝字方式。',
  },

  // ═══ 1月16日：付款 ═══
  {
    id: 'evt_18',
    date: '2026-01-16',
    title: '偿还乙公司前欠货款',
    description: '以银行存款偿还1月5日欠乙公司的采购货款169,500元。',
    documents: [
      { type: 'bank', title: '银行付款回单', content: '收款方：乙公司 金额：￥169,500.00 用途：支付采购货款' },
    ],
    entries: [
      { subjectCode: '2202', summary: '偿还乙公司货款', debit: 169500, credit: 0, explanation: '应付账款减少记借方。偿还欠款后，企业对供应商的负债减少。' },
      { subjectCode: '1002', summary: '偿还乙公司货款', debit: 0, credit: 169500, explanation: '银行存款减少记贷方。资金流出用于偿还债务。' },
    ],
    explanation: '这笔业务与1月5日的赊购业务对应，完整展示了赊购（形成应付账款）到付款（冲减应付账款）的全过程。及时偿还货款有助于维护良好的供应商关系。',
  },

  // ═══ 1月18日：补货+备用金 ═══
  {
    id: 'evt_19',
    date: '2026-01-18',
    title: '补货采购家电（现购）',
    description: '因库存不足，再次向甲公司采购家用电器一批，价款100,000元，增值税13,000元，以银行存款支付，商品已验收入库。',
    documents: [
      { type: 'invoice', title: '增值税专用发票（采购）', content: '甲公司 家用电器一批 金额￥100,000.00 税率13% 税额￥13,000.00' },
      { type: 'receipt', title: '采购入库单', content: '家电类商品 数量100台 金额￥100,000.00' },
      { type: 'bank', title: '银行付款回单', content: '收款方：甲公司 金额：￥113,000.00 用途：采购家电货款' },
    ],
    entries: [
      { subjectCode: '1405', summary: '补货采购家电入库', debit: 100000, credit: 0, explanation: '库存商品增加记借方。补货采购的家电入库，增加库存。' },
      { subjectCode: '222101', summary: '补货进项税额', debit: 13000, credit: 0, explanation: '进项税额增加记借方。补货采购的进项税额可抵扣。' },
      { subjectCode: '1002', summary: '支付补货款', debit: 0, credit: 113000, explanation: '银行存款减少记贷方。支付含税总价款。' },
    ],
    explanation: '企业根据销售情况和库存水平进行补货采购。本案例1月份共采购家电两次（首次200,000元+补货100,000元=300,000元），数码产品一次（150,000元），总采购额450,000元。',
  },
  {
    id: 'evt_20',
    date: '2026-01-18',
    title: '提取备用金',
    description: '从银行提取5,000元现金作为日常备用金，用于差旅费报销和小额零星支出。',
    documents: [
      { type: 'bank', title: '银行取款回单', content: '提取备用金 ￥5,000.00' },
    ],
    entries: [
      { subjectCode: '1001', summary: '提取备用金', debit: 5000, credit: 0, explanation: '库存现金增加记借方。备用金是存放在企业的现金，用于日常小额支出。' },
      { subjectCode: '1002', summary: '提取备用金', debit: 0, credit: 5000, explanation: '银行存款减少记贷方。从银行提取现金，银行存款减少。' },
    ],
    explanation: '备用金是企业为日常零星开支而准备的现金。提取备用金时，资金从银行存款转入库存现金，总资产不变，只是资产形态发生变化。备用金需定期盘点核对。',
  },

  // ═══ 1月20日：收款+费用 ═══
  {
    id: 'evt_21',
    date: '2026-01-20',
    title: '收到B客户货款',
    description: '收到B公司偿还的1月8日所欠货款135,600元，已存入银行。',
    documents: [
      { type: 'bank', title: '银行收款回单', content: '付款方：B公司 金额：￥135,600.00 用途：支付采购货款' },
    ],
    entries: [
      { subjectCode: '1002', summary: '收到B客户货款', debit: 135600, credit: 0, explanation: '银行存款增加记借方。收回前期应收账款，资金回笼。' },
      { subjectCode: '1122', summary: '收到B客户货款', debit: 0, credit: 135600, explanation: '应收账款减少记贷方。B公司的欠款已结清，债权减少。' },
    ],
    explanation: '这笔业务与1月8日的赊销业务对应。赊销时形成应收账款（债权），收款时冲减应收账款。B公司在12天后即付清货款，信用状况良好。',
  },
  {
    id: 'evt_22',
    date: '2026-01-20',
    title: '支付电话费',
    description: '支付1月份公司固话及网络通信费1,200元，以银行存款支付。',
    documents: [
      { type: 'receipt', title: '通信费发票', content: '2026年1月固话及网络费 ￥1,200.00' },
    ],
    entries: [
      { subjectCode: '6602', summary: '支付电话费', debit: 1200, credit: 0, explanation: '管理费用增加记借方。通信费属于公司日常管理性支出。' },
      { subjectCode: '1002', summary: '支付电话费', debit: 0, credit: 1200, explanation: '银行存款减少记贷方。' },
    ],
    explanation: '通信费（电话费、网络费）是公司日常运营的必要支出，计入管理费用。',
  },

  // ═══ 1月22日：销售给D客户 ═══
  {
    id: 'evt_23',
    date: '2026-01-22',
    title: '销售数码产品给D客户（收入确认）',
    description: '向D客户销售数码产品一批，价款80,000元，增值税10,400元，款项已存入银行。',
    documents: [
      { type: 'invoice', title: '增值税专用发票（销售）', content: 'D公司 数码产品一批 金额￥80,000.00 税率13% 税额￥10,400.00' },
      { type: 'bank', title: '银行收款回单', content: '付款方：D公司 金额：￥90,400.00 用途：数码产品采购款' },
      { type: 'receipt', title: '销售出库单', content: '数码类商品 数量150台 金额￥80,000.00' },
    ],
    entries: [
      { subjectCode: '1002', summary: '收到D客户货款', debit: 90400, credit: 0, explanation: '银行存款增加记借方。货款已收妥入账。' },
      { subjectCode: '6001', summary: '销售数码产品给D客户', debit: 0, credit: 80000, explanation: '主营业务收入增加记贷方。确认数码产品销售收入。' },
      { subjectCode: '222102', summary: '销项税额', debit: 0, credit: 10400, explanation: '销项税额增加记贷方。按13%税率计提销项税。' },
    ],
    explanation: 'D客户是本月第四笔销售业务，现销方式交易，货款即时到账。本案例四笔主要销售合计：A客户150,000元+B客户120,000元+C客户100,000元+D客户80,000元=450,000元。',
  },
  {
    id: 'evt_24',
    date: '2026-01-22',
    title: '结转已售数码产品成本',
    description: '结转1月22日销售给D客户的数码产品成本55,000元。',
    entries: [
      { subjectCode: '6401', summary: '结转销售成本——数码产品', debit: 55000, credit: 0, explanation: '主营业务成本增加记借方。已售数码产品成本转入当期损益。' },
      { subjectCode: '1405', summary: '结转销售成本——数码产品', debit: 0, credit: 55000, explanation: '库存商品减少记贷方。数码产品出库后库存减少。' },
    ],
    explanation: '这批数码产品的毛利率为31.25%（1-(55,000÷80,000)），与第一批数码产品毛利率（33%）基本一致。',
  },
  {
    id: 'evt_25',
    date: '2026-01-22',
    title: '支付快递费',
    description: '支付本月商品快递配送费600元，以银行存款支付。',
    documents: [
      { type: 'receipt', title: '快递费发票', content: '同城快递配送费 ￥600.00' },
    ],
    entries: [
      { subjectCode: '6601', summary: '支付快递费', debit: 600, credit: 0, explanation: '销售费用增加记借方。快递配送费属于商品销售环节的费用。' },
      { subjectCode: '1002', summary: '支付快递费', debit: 0, credit: 600, explanation: '银行存款减少记贷方。' },
    ],
    explanation: '商品配送产生的快递费计入销售费用。对于批发企业，配送费是不可忽视的运营成本。',
  },

  // ═══ 1月25日：费用 ═══
  {
    id: 'evt_26',
    date: '2026-01-25',
    title: '支付仓库水电费',
    description: '支付1月份仓库水电费2,000元，以银行存款支付。',
    documents: [
      { type: 'receipt', title: '水电费缴费单', content: '1月仓库电费￥1,500.00 水费￥500.00 合计￥2,000.00' },
    ],
    entries: [
      { subjectCode: '6601', summary: '支付仓库水电费', debit: 2000, credit: 0, explanation: '销售费用增加记借方。仓库的水电费属于仓储费用，计入销售费用。' },
      { subjectCode: '1002', summary: '支付仓库水电费', debit: 0, credit: 2000, explanation: '银行存款减少记贷方。' },
    ],
    explanation: '仓库是商品流通企业的重要设施，仓库运营相关的水电费属于销售费用中的仓储费用。',
  },
  {
    id: 'evt_27',
    date: '2026-01-25',
    title: '报销差旅费',
    description: '销售经理报销出差交通费和住宿费共计2,200元，以现金支付。',
    documents: [
      { type: 'receipt', title: '差旅费报销单', content: '交通费￥1,200.00 住宿费￥800.00 餐补￥200.00 合计￥2,200.00' },
    ],
    entries: [
      { subjectCode: '6602', summary: '报销差旅费', debit: 2200, credit: 0, explanation: '管理费用增加记借方。差旅费属于管理性质的费用支出，计入管理费用。' },
      { subjectCode: '1001', summary: '报销差旅费', debit: 0, credit: 2200, explanation: '库存现金减少记贷方。以现金支付报销款。' },
    ],
    explanation: '差旅费是企业员工因公出差发生的交通、住宿、餐饮等费用，计入管理费用。报销时使用备用金支付，冲减库存现金。',
  },

  // ═══ 1月26日：培训费 ═══
  {
    id: 'evt_28',
    date: '2026-01-26',
    title: '支付员工培训费',
    description: '支付销售团队产品知识培训费用1,500元，以银行存款支付。',
    documents: [
      { type: 'receipt', title: '培训费发票', content: '电子产品知识培训 服务费￥1,500.00' },
    ],
    entries: [
      { subjectCode: '6602', summary: '支付员工培训费', debit: 1500, credit: 0, explanation: '管理费用增加记借方。员工培训费属于人力资源管理支出，计入管理费用。' },
      { subjectCode: '1002', summary: '支付员工培训费', debit: 0, credit: 1500, explanation: '银行存款减少记贷方。' },
    ],
    explanation: '员工培训费是企业为提升员工专业技能而发生的支出，属于管理费用。合理的培训投入有助于提高员工素质和业务能力。',
  },

  // ═══ 1月28日：采购设备+零星销售 ═══
  {
    id: 'evt_29',
    date: '2026-01-28',
    title: '采购办公设备',
    description: '采购办公用电脑及打印机等设备，价款15,000元，增值税1,950元，以银行存款支付。预计使用5年，残值率5%。',
    documents: [
      { type: 'invoice', title: '增值税专用发票', content: '办公设备一批 金额￥15,000.00 税率13% 税额￥1,950.00' },
      { type: 'bank', title: '银行付款回单', content: '金额：￥16,950.00 用途：采购办公设备' },
    ],
    entries: [
      { subjectCode: '1601', summary: '采购办公设备', debit: 15000, credit: 0, explanation: '固定资产增加记借方。办公设备作为固定资产核算，在其使用寿命内分期计提折旧。' },
      { subjectCode: '222101', summary: '设备进项税额', debit: 1950, credit: 0, explanation: '进项税额增加记借方。固定资产采购的进项税额也可抵扣。' },
      { subjectCode: '1002', summary: '支付设备款', debit: 0, credit: 16950, explanation: '银行存款减少记贷方。支付含税总价款。' },
    ],
    explanation: '固定资产采购与商品采购的税务处理一致：一般纳税人取得增值税专用发票，进项税额可抵扣。固定资产入账价值为不含税金额15,000元，后续按月计提折旧。',
  },
  {
    id: 'evt_30',
    date: '2026-01-28',
    title: '零星销售商品（收入确认）',
    description: '向零散客户销售少量库存数码产品，价款5,000元，增值税650元，款项已存入银行。',
    documents: [
      { type: 'invoice', title: '增值税普通发票', content: '零星数码产品 金额￥5,000.00 税率13% 税额￥650.00' },
      { type: 'bank', title: '银行收款回单', content: '金额：￥5,650.00' },
    ],
    entries: [
      { subjectCode: '1002', summary: '收到零星销售款', debit: 5650, credit: 0, explanation: '银行存款增加记借方。零星销售收入款项已到账。' },
      { subjectCode: '6001', summary: '零星销售收入', debit: 0, credit: 5000, explanation: '主营业务收入增加记贷方。确认零星销售收入。' },
      { subjectCode: '222102', summary: '销项税额', debit: 0, credit: 650, explanation: '销项税额增加记贷方。零星销售也需计提销项税。' },
    ],
    explanation: '即使是零星销售，也需正常确认收入和计提销项税。一般纳税人的增值税管理要求对每一笔销售业务都进行核算。',
  },
  {
    id: 'evt_31',
    date: '2026-01-28',
    title: '结转零星销售成本',
    description: '结转零星销售商品的成本3,500元。',
    entries: [
      { subjectCode: '6401', summary: '结转零星销售成本', debit: 3500, credit: 0, explanation: '主营业务成本增加记借方。零星销售的成本转入当期损益。' },
      { subjectCode: '1405', summary: '结转零星销售成本', debit: 0, credit: 3500, explanation: '库存商品减少记贷方。商品出库后库存减少。' },
    ],
    explanation: '零星销售毛利率为30%（1-(3,500÷5,000)），与其他销售毛利率基本一致。',
  },

  // ═══ 1月29日：银行手续费 ═══
  {
    id: 'evt_32',
    date: '2026-01-29',
    title: '支付银行手续费',
    description: '银行扣收1月份账户管理费、转账手续费等共计300元。',
    documents: [
      { type: 'bank', title: '银行扣款回单', content: '账户管理费及转账手续费 ￥300.00' },
    ],
    entries: [
      { subjectCode: '6603', summary: '银行手续费', debit: 300, credit: 0, explanation: '财务费用增加记借方。银行手续费是企业使用银行服务发生的费用，属于财务费用。' },
      { subjectCode: '1002', summary: '银行手续费', debit: 0, credit: 300, explanation: '银行存款减少记贷方。银行直接扣款，企业银行存款减少。' },
    ],
    explanation: '财务费用包括银行手续费、利息支出（减利息收入）、汇兑损益等。本月财务费用净额为100元（手续费300元-利息收入200元）。',
  },

  // ═══ 1月30日：库存盘点 ═══
  {
    id: 'evt_33',
    date: '2026-01-30',
    title: '月末库存盘点（盘盈）',
    description: '月末对库存商品进行盘点，发现部分商品实际库存比账面多出500元，经查明为平时出库计量误差所致，经批准冲减管理费用。',
    documents: [
      { type: 'receipt', title: '库存盘点表', content: '盘盈商品 金额￥500.00 原因：出库计量误差 经批准冲减管理费用' },
    ],
    entries: [
      { subjectCode: '1405', summary: '库存盘盈入库', debit: 500, credit: 0, explanation: '库存商品增加记借方。盘盈的商品入库，增加库存。' },
      { subjectCode: '6602', summary: '库存盘盈冲减管理费用', debit: 0, credit: 500, explanation: '管理费用减少记贷方。盘盈商品冲减管理费用，相当于减少了当期费用。' },
    ],
    explanation: '存货盘盈通常是由于计量误差或记账错误导致的。按会计准则规定，存货盘盈冲减管理费用。盘盈与盘亏的处理方式相反：盘亏需查明原因后计入管理费用或营业外支出。',
  },

  // ═══ 1月31日：期末调整 ═══
  {
    id: 'evt_34',
    date: '2026-01-31',
    title: '摊销本月仓库租金',
    description: '摊销应归属于1月份的仓库租金4,000元（预付的12,000元 ÷ 3个月）。',
    entries: [
      { subjectCode: '6601', summary: '摊销本月仓库租金', debit: 4000, credit: 0, explanation: '销售费用增加记借方。本月应承担的仓库租金计入销售费用（仓储费用）。' },
      { subjectCode: '1123', summary: '摊销本月仓库租金', debit: 0, credit: 4000, explanation: '预付账款减少记贷方。随着时间推移，预付的租金逐步摊销，资产减少。' },
    ],
    explanation: '预付账款按受益期摊销。1月份使用仓库一个月，因此将预付的三个月租金中的1/3（4,000元）转为费用。剩余8,000元仍作为预付账款挂在账上，在2月和3月继续摊销。',
  },
  {
    id: 'evt_35',
    date: '2026-01-31',
    title: '计提固定资产折旧',
    description: '办公设备原值15,000元，预计使用5年（60个月），残值率5%。本月折旧额 = 15,000 × 95% ÷ 60 = 237.50元。',
    entries: [
      { subjectCode: '6602', summary: '计提办公设备折旧', debit: 237.50, credit: 0, explanation: '管理费用增加记借方。办公设备折旧计入管理费用，反映资产因使用而发生的价值损耗。' },
      { subjectCode: '1602', summary: '计提办公设备折旧', debit: 0, credit: 237.50, explanation: '累计折旧增加记贷方。累计折旧是固定资产的备抵科目，反映已损耗的价值。' },
    ],
    explanation: '折旧是将固定资产的成本在其使用寿命内系统分摊的过程。直线法是最常用的折旧方法：月折旧额 = (原值 - 残值) ÷ 使用月数。本案例办公设备月折旧额 = (15,000 - 750) ÷ 60 = 237.50元。',
  },
  {
    id: 'evt_36',
    date: '2026-01-31',
    title: '增值税月末结转',
    description: '月末结转增值税明细科目。本月进项税额合计60,450元（26,000+19,500+13,000+1,950），销项税额合计59,150元（19,500+15,600+13,000+10,400+650）。进项税额大于销项税额，差额1,300元为留抵税额，结转至未交增值税借方。',
    documents: [
      { type: 'text', title: '增值税计算表', content: '进项税额合计：￥60,450.00\n销项税额合计：￥59,150.00\n应交增值税：￥-1,300.00（留抵税额）' },
    ],
    entries: [
      { subjectCode: '222102', summary: '结转销项税额', debit: 59150, credit: 0, explanation: '销项税额转出记借方。将销项税额明细科目余额结转至未交增值税。' },
      { subjectCode: '222106', summary: '留抵税额（进项大于销项）', debit: 1300, credit: 0, explanation: '未交增值税借方余额表示留抵税额。进项税额大于销项税额的差额，可结转下期继续抵扣。' },
      { subjectCode: '222101', summary: '结转进项税额', debit: 0, credit: 60450, explanation: '进项税额转出记贷方。将进项税额明细科目余额结转至未交增值税。' },
    ],
    explanation: '月末增值税结转是将"进项税额"和"销项税额"明细科目的余额转入"未交增值税"科目。如果销项大于进项，贷方差额为应交增值税；如果进项大于销项（本案例），借方差额为留抵税额，可结转下期继续抵扣。本月留抵税额1,300元。',
  },
  {
    id: 'evt_37',
    date: '2026-01-31',
    title: '城建税处理',
    description: '本月增值税为留抵税额（-1,300元），不需缴纳增值税，因此以增值税为计税依据的城建税（税率7%）和教育费附加为0元，无需计提。',
    entries: [],
    explanation: '城市维护建设税和教育费附加以实际缴纳的增值税为计税依据。本月进项税额（60,450元）大于销项税额（59,150元），产生留抵税额1,300元，无需缴纳增值税，因此城建税和教育费附加也为0元。留抵税额1,300元可结转至下月继续抵扣。',
  },
]

export default {
  id: 'medium_trade',
  companyInfo: {
    name: '瑞丰贸易有限公司',
    shortName: '瑞丰贸易',
    taxType: '一般纳税人',
    taxRate: '13%',
    accountingSystem: '企业会计准则',
    industry: '商业贸易',
    address: '瑞丰大厦1508室',
    description: '瑞丰贸易是一家从事电子产品批发销售的商贸企业，代理销售多个知名品牌的家用电器和数码产品。公司拥有3个销售团队，员工25人（销售人员18人、行政财务4人、仓储物流3人）。经营模式为从厂家采购后批发给下游经销商。2026年1月新成立，无期初余额。',
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
