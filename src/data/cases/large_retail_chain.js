/**
 * 案例：万佳连锁超市有限公司 — 大型零售连锁企业
 *
 * 企业背景：万佳连锁是一家拥有3家连锁超市的零售企业（总店+2家分店），
 * 经营日用百货、食品、家电等品类。公司实行统一采购、统一配送、统一定价、
 * 统一核算的管理模式。员工150人（各店收银理货100人、采购配送20人、管理30人）。
 *
 * 会计制度：企业会计准则
 * 纳税人性质：一般纳税人（增值税税率13%，运费税率9%）
 * 成立时间：2026年1月（新成立，无期初余额）
 *
 * 共 45 个业务事件，覆盖：资金筹集→租赁设备→采购配送→销售→联营专柜→
 * 促销活动→工资费用→期末调整（盘点/折旧/跌价准备/增值税/所得税）
 */

const SUBJECTS = [
  // ─── 资产类 ───
  { id: 's-1001', code: '1001', name: '库存现金', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1002', code: '1002', name: '银行存款', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1123', code: '1123', name: '预付账款', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1405', code: '1405', name: '库存商品', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1471', code: '1471', name: '存货跌价准备', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1601', code: '1601', name: '固定资产', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1602', code: '1602', name: '累计折旧', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1901', code: '1901', name: '待处理财产损溢', type: 'asset', parentId: null, isLeaf: true },

  // ─── 负债类 ───
  { id: 's-2001', code: '2001', name: '短期借款', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-2202', code: '2202', name: '应付账款', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-2211', code: '2211', name: '应付职工薪酬', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-222101', code: '222101', name: '应交税费-应交增值税(进项税额)', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-222102', code: '222102', name: '应交税费-应交增值税(销项税额)', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-222104', code: '222104', name: '应交税费-应交所得税', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-222106', code: '222106', name: '应交税费-应交增值税(转出未交增值税)', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-222108', code: '222108', name: '应交税费-未交增值税', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-222120', code: '222120', name: '应交税费-应交城建税及附加', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-2241', code: '2241', name: '其他应付款', type: 'liability', parentId: null, isLeaf: true },

  // ─── 权益类 ───
  { id: 's-4001', code: '4001', name: '实收资本', type: 'equity', parentId: null, isLeaf: true },
  { id: 's-4002', code: '4002', name: '资本公积', type: 'equity', parentId: null, isLeaf: true },
  { id: 's-4103', code: '4103', name: '本年利润', type: 'equity', parentId: null, isLeaf: true },
  { id: 's-4104', code: '4104', name: '利润分配', type: 'equity', parentId: null, isLeaf: true },

  // ─── 损益类 ───
  { id: 's-6001', code: '6001', name: '主营业务收入', type: 'profit_loss', parentId: null, isLeaf: true },
  { id: 's-6051', code: '6051', name: '其他业务收入', type: 'profit_loss', parentId: null, isLeaf: true },
  { id: 's-6401', code: '6401', name: '主营业务成本', type: 'profit_loss', parentId: null, isLeaf: true },
  { id: 's-6403', code: '6403', name: '税金及附加', type: 'profit_loss', parentId: null, isLeaf: true },
  { id: 's-6601', code: '6601', name: '销售费用', type: 'profit_loss', parentId: null, isLeaf: true },
  { id: 's-6602', code: '6602', name: '管理费用', type: 'profit_loss', parentId: null, isLeaf: true },
  { id: 's-6603', code: '6603', name: '财务费用', type: 'profit_loss', parentId: null, isLeaf: true },
  { id: 's-6701', code: '6701', name: '资产减值损失', type: 'profit_loss', parentId: null, isLeaf: true },
  { id: 's-6801', code: '6801', name: '所得税费用', type: 'profit_loss', parentId: null, isLeaf: true },
]

const OPENING_BALANCES = []  // 新成立企业，无期初余额

const EVENTS = [
  // ═══════════════════════════════════════════
  // 1月2日 — 资金筹集
  // ═══════════════════════════════════════════
  {
    id: 'evt_01',
    date: '2026-01-02',
    title: '收到投资者投资款',
    description: '万佳连锁收到各股东投入资本金5,000,000元，其中注册资本3,000,000元，资本溢价2,000,000元，款项已存入银行账户。',
    documents: [
      {
        type: 'bank',
        title: '银行收款回单',
        content: '收款金额：人民币伍佰万元整 付款人：各股东 摘要：投资款入账',
      },
      {
        type: 'receipt',
        title: '验资报告摘要',
        content: '万佳连锁超市有限公司注册资本叁佰万元，各股东出资合计伍佰万元，超出部分计入资本公积。',
      },
    ],
    entries: [
      { subjectCode: '1002', summary: '收到投资款', debit: 5000000.00, credit: 0, explanation: '银行存款增加记借方。投资者投入的货币资金存入银行，企业资产增加。' },
      { subjectCode: '4001', summary: '确认注册资本', debit: 0, credit: 3000000.00, explanation: '实收资本增加记贷方。按公司章程确认的注册资本部分，属于所有者投入的资本。' },
      { subjectCode: '4002', summary: '资本溢价', debit: 0, credit: 2000000.00, explanation: '资本公积增加记贷方。投资者出资超过注册资本份额的部分形成资本溢价，计入资本公积。' },
    ],
    explanation: '企业设立时收到投资者投入资本，超出注册资本的部分形成资本溢价。这笔分录体现了所有者权益的构成：实收资本是法定资本，资本公积是资本溢价积累。',
  },

  {
    id: 'evt_02',
    date: '2026-01-02',
    title: '取得短期借款',
    description: '向工商银行借入短期借款2,000,000元，期限6个月，年利率6%，按月付息，到期还本。款项已存入银行账户。',
    documents: [
      {
        type: 'bank',
        title: '银行收款回单',
        content: '收款金额：人民币贰佰万元整 付款人：工商银行 摘要：短期借款',
      },
      {
        type: 'receipt',
        title: '借款合同摘要',
        content: '借款金额2,000,000元 期限6个月 年利率6% 按月付息 到期还本',
      },
    ],
    entries: [
      { subjectCode: '1002', summary: '借入短期借款', debit: 2000000.00, credit: 0, explanation: '银行存款增加记借方。借入的款项已存入银行，企业可随时用于经营周转。' },
      { subjectCode: '2001', summary: '借入短期借款', debit: 0, credit: 2000000.00, explanation: '短期借款增加记贷方。期限一年以内的借款属于短期负债，需在短期借款科目核算。' },
    ],
    explanation: '短期借款是企业向银行借入的期限在一年以内的借款，主要用于补充流动资金。本例借款200万元，期限6个月，年利率6%，每月需支付利息10,000元。',
  },

  // ═══════════════════════════════════════════
  // 1月3日 — 店面租赁与设备购置
  // ═══════════════════════════════════════════
  {
    id: 'evt_03',
    date: '2026-01-03',
    title: '预付三家店面一季度房租',
    description: '预付总店及2家分店2026年1-3月房租合计135,000元（总店月租20,000元、分店A月租13,333.33元、分店B月租11,666.67元），以银行存款支付。',
    documents: [
      {
        type: 'receipt',
        title: '房屋租赁合同（总店）',
        content: '万佳广场1号总店 月租金20,000元 租期1年',
      },
      {
        type: 'receipt',
        title: '房屋租赁合同（分店A）',
        content: '阳光路88号分店A 月租金13,333.33元 租期1年',
      },
      {
        type: 'receipt',
        title: '房屋租赁合同（分店B）',
        content: '花园道66号分店B 月租金11,666.67元 租期1年',
      },
      {
        type: 'bank',
        title: '银行付款回单',
        content: '付款金额：人民币壹拾叁万伍仟元整 收款方：各房东 摘要：预付一季度租金',
      },
    ],
    entries: [
      { subjectCode: '1123', summary: '预付一季度房租', debit: 135000.00, credit: 0, explanation: '预付账款增加记借方。一次性支付三个月租金形成预付资产，后续按月摊销。' },
      { subjectCode: '1002', summary: '支付房租', debit: 0, credit: 135000.00, explanation: '银行存款减少记贷方。预付三个月租金，资金流出企业。' },
    ],
    explanation: '预付房租属于预付账款，在支付时暂不确认为费用。后续每月摊销45,000元计入销售费用（店面租金属于销售费用），体现权责发生制原则。',
  },

  {
    id: 'evt_04',
    date: '2026-01-03',
    title: '购买货架收银等设备',
    description: '为三家店面采购货架、收银机、冷柜等设备，总价款500,000元，增值税65,000元（税率13%），价税合计565,000元以银行存款支付。预计使用5年，残值率5%。',
    documents: [
      {
        type: 'invoice',
        title: '增值税专用发票（设备）',
        region: '广东省',
        invoiceNo: '4400112233',
        buyer: '万佳连锁超市有限公司',
        seller: '华强商用设备有限公司',
        lineItems: [
          { name: '超市货架（总店及分店）', quantity: 1, unitPrice: 500000, amount: 500000, taxRate: '13%', taxAmount: 65000 },
        ],
        totalAmount: 565000,
      },
      {
        type: 'bank',
        title: '银行付款回单',
        content: '付款金额：人民币伍拾陆万伍仟元整 收款方：华强商用设备有限公司 摘要：购设备款',
      },
    ],
    entries: [
      { subjectCode: '1601', summary: '购置设备原值', debit: 500000.00, credit: 0, explanation: '固定资产增加记借方。设备按取得时实际成本（不含可抵扣增值税）入账。' },
      { subjectCode: '222101', summary: '设备进项税额', debit: 65000.00, credit: 0, explanation: '应交税费-进项税额增加记借方。一般纳税人取得增值税专用发票，进项税额可抵扣。' },
      { subjectCode: '1002', summary: '支付设备款', debit: 0, credit: 565000.00, explanation: '银行存款减少记贷方。支付价税合计金额。' },
    ],
    explanation: '一般纳税人购置固定资产，取得增值税专用发票的，进项税额可以抵扣。固定资产入账价值为不含税价款500,000元，后续每月计提折旧。',
  },

  // ═══════════════════════════════════════════
  // 1月4日 — 统一采购
  // ═══════════════════════════════════════════
  {
    id: 'evt_05',
    date: '2026-01-04',
    title: '统一采购食品（现购）',
    description: '向天润食品公司统一采购食品一批，价款600,000元，增值税78,000元（税率13%），价税合计678,000元以银行存款支付。商品已验收入总仓库。',
    documents: [
      {
        type: 'invoice',
        title: '增值税专用发票（食品）',
        region: '广东省',
        invoiceNo: '4400223344',
        buyer: '万佳连锁超市有限公司',
        seller: '天润食品有限公司',
        lineItems: [{ name: '食品饮料', quantity: 1, unitPrice: 600000, amount: 600000, taxRate: '13%', taxAmount: 78000 }],
        totalAmount: 678000,
      },
      {
        type: 'receipt',
        title: '采购入库单',
        content: '食品一批 入库金额￥600,000.00 已验收入总仓库',
      },
    ],
    entries: [
      { subjectCode: '1405', summary: '采购食品入库', debit: 600000.00, credit: 0, explanation: '库存商品增加记借方。采购的食品按不含税采购成本验收入库。' },
      { subjectCode: '222101', summary: '食品进项税额', debit: 78000.00, credit: 0, explanation: '应交税费-进项税额增加记借方。取得增值税专用发票，进项税额准予抵扣。' },
      { subjectCode: '1002', summary: '支付采购款', debit: 0, credit: 678000.00, explanation: '银行存款减少记贷方。现购方式下，采购与付款同时完成。' },
    ],
    explanation: '统一采购是零售连锁企业集中采购的模式，有利于降低采购成本。采购的商品先入总仓库，后续再配送到各分店销售。',
  },

  {
    id: 'evt_06',
    date: '2026-01-04',
    title: '统一采购百货（赊购）',
    description: '向万通日化公司统一采购日用百货一批，价款500,000元，增值税65,000元（税率13%），价税合计565,000元货款暂欠。商品已验收入总仓库。',
    documents: [
      {
        type: 'invoice',
        title: '增值税专用发票（百货）',
        region: '广东省',
        invoiceNo: '4400334455',
        buyer: '万佳连锁超市有限公司',
        seller: '万通日化有限公司',
        lineItems: [{ name: '日用百货', quantity: 1, unitPrice: 500000, amount: 500000, taxRate: '13%', taxAmount: 65000 }],
        totalAmount: 565000,
      },
      {
        type: 'receipt',
        title: '采购入库单',
        content: '日用百货一批 入库金额￥500,000.00 已验收入总仓库',
      },
    ],
    entries: [
      { subjectCode: '1405', summary: '采购百货入库', debit: 500000.00, credit: 0, explanation: '库存商品增加记借方。百货按不含税采购成本验收入库。' },
      { subjectCode: '222101', summary: '百货进项税额', debit: 65000.00, credit: 0, explanation: '应交税费-进项税额增加记借方。增值税专用发票注明的税额准予抵扣。' },
      { subjectCode: '2202', summary: '赊购货款暂欠', debit: 0, credit: 565000.00, explanation: '应付账款增加记贷方。赊购方式下，货款暂欠形成对供应商的负债。' },
    ],
    explanation: '赊购（先收货后付款）与现购的区别在于：现购贷记银行存款，赊购贷记应付账款。本例采用赊购方式，有利于缓解企业开业初期的资金压力。',
  },

  {
    id: 'evt_07',
    date: '2026-01-04',
    title: '支付采购运费',
    description: '支付采购商品的运输费用，价款20,000元，增值税1,800元（税率9%），价税合计21,800元以银行存款支付。运费计入库存商品成本。',
    documents: [
      {
        type: 'invoice',
        title: '增值税专用发票（运费）',
        region: '广东省',
        invoiceNo: '4400445566',
        buyer: '万佳连锁超市有限公司',
        seller: '顺达物流有限公司',
        lineItems: [{ name: '商品运输服务', quantity: 1, unitPrice: 20000, amount: 20000, taxRate: '9%', taxAmount: 1800 }],
        totalAmount: 21800,
      },
    ],
    entries: [
      { subjectCode: '1405', summary: '运费计入采购成本', debit: 20000.00, credit: 0, explanation: '库存商品增加记借方。采购运费是商品成本的组成部分，计入库存商品成本。' },
      { subjectCode: '222101', summary: '运费进项税额', debit: 1800.00, credit: 0, explanation: '应交税费-进项税额增加记借方。运输服务增值税专用发票注明的税额准予抵扣。' },
      { subjectCode: '1002', summary: '支付运费', debit: 0, credit: 21800.00, explanation: '银行存款减少记贷方。支付运费价税合计金额。' },
    ],
    explanation: '采购商品发生的运输费、装卸费等属于商品采购成本的组成部分，应计入库存商品的入账价值，而非直接计入当期费用。运费增值税税率为9%。',
  },

  // ═══════════════════════════════════════════
  // 1月5日 — 开业准备
  // ═══════════════════════════════════════════
  {
    id: 'evt_08',
    date: '2026-01-05',
    title: '提取备用金',
    description: '从银行提取15,000元现金作为三家店面的日常备用金，用于日常小额支出。',
    documents: [
      {
        type: 'bank',
        title: '银行取款回单',
        content: '提取备用金 人民币壹万伍仟元整',
      },
    ],
    entries: [
      { subjectCode: '1001', summary: '提取备用金', debit: 15000.00, credit: 0, explanation: '库存现金增加记借方。备用金用于各店日常找零和小额支出。' },
      { subjectCode: '1002', summary: '提取备用金', debit: 0, credit: 15000.00, explanation: '银行存款减少记贷方。从银行提取现金后银行存款相应减少。' },
    ],
    explanation: '零售企业需要大量备用金用于日常找零。提取备用金时，资金从银行存款转入库存现金，总资产不变，只是资产形态发生变化。',
  },

  // ═══════════════════════════════════════════
  // 1月6日 — 开业推广
  // ═══════════════════════════════════════════
  {
    id: 'evt_09',
    date: '2026-01-06',
    title: '支付开业广告费',
    description: '三家店面同时开业，支付广告宣传费用30,000元（含传单印刷、媒体推广、开业横幅等），以银行存款支付。',
    documents: [
      {
        type: 'receipt',
        title: '广告费发票',
        content: '开业广告宣传费 金额￥30,000.00',
      },
      {
        type: 'bank',
        title: '银行付款回单',
        content: '付款金额：人民币叁万元整 收款方：新传媒广告有限公司',
      },
    ],
    entries: [
      { subjectCode: '6601', summary: '开业广告费', debit: 30000.00, credit: 0, explanation: '销售费用增加记借方。开业广告费是为了促进销售发生的费用，属于销售费用。' },
      { subjectCode: '1002', summary: '支付广告费', debit: 0, credit: 30000.00, explanation: '银行存款减少记贷方。' },
    ],
    explanation: '广告宣传费是零售企业常见的销售费用，包括线上推广、线下传单、店面促销活动等。这些费用直接与销售活动相关，计入销售费用。',
  },

  // ═══════════════════════════════════════════
  // 1月7日 — 第1周销售
  // ═══════════════════════════════════════════
  {
    id: 'evt_10',
    date: '2026-01-07',
    title: '各店第1周销售（收入确认）',
    description: '开业首周，三家店面销售合计含税收入550,000元（总店280,000元、分店A160,000元、分店B110,000元），款项已全部存入银行。不含税收入486,725.66元，销项税额63,274.34元。',
    documents: [
      {
        type: 'receipt',
        title: '第1周销售汇总表',
        content: '总店￥280,000.00 分店A￥160,000.00 分店B￥110,000.00 合计￥550,000.00',
      },
      {
        type: 'bank',
        title: '银行收款回单',
        content: '第1周销售款入账 合计￥550,000.00',
      },
    ],
    entries: [
      { subjectCode: '1002', summary: '第1周销售收款', debit: 550000.00, credit: 0, explanation: '银行存款增加记借方。三家店面的销售款项全部存入银行。' },
      { subjectCode: '6001', summary: '第1周销售收入', debit: 0, credit: 486725.66, explanation: '主营业务收入增加记贷方。不含税销售额确认主营业务收入。' },
      { subjectCode: '222102', summary: '第1周销项税额', debit: 0, credit: 63274.34, explanation: '应交税费-销项税额增加记贷方。一般纳税人销售商品按13%税率计提销项税。' },
    ],
    explanation: '零售企业每日销售由收银系统汇总，定期（每周）集中入账。含税销售额需进行价税分离：不含税收入=含税金额÷(1+13%)，销项税额=不含税收入×13%。',
  },

  {
    id: 'evt_11',
    date: '2026-01-07',
    title: '结转第1周销售成本',
    description: '根据第1周销售情况，按成本率65%结转已售商品成本316,371.68元。',
    entries: [
      { subjectCode: '6401', summary: '结转第1周销售成本', debit: 316371.68, credit: 0, explanation: '主营业务成本增加记借方。已售商品的成本从库存商品中转出。' },
      { subjectCode: '1405', summary: '结转第1周销售成本', debit: 0, credit: 316371.68, explanation: '库存商品减少记贷方。商品已售出，库存减少。' },
    ],
    explanation: '收入与成本应当配比。确认收入的同时必须结转相应的销售成本。本例采用成本率法（65%）计算销售成本，即销售额的65%为商品采购成本，35%为毛利空间。',
  },

  {
    id: 'evt_12',
    date: '2026-01-07',
    title: '联营专柜第1周销售',
    description: '三家店面的联营专柜（化妆品、首饰等品牌专柜）第1周含税销售额30,000元（总店15,000元、分店A9,000元、分店B6,000元），超市按20%收取分成。分成收入不含税5,309.73元，销项税690.27元。应支付品牌商24,000元。',
    documents: [
      {
        type: 'receipt',
        title: '联营专柜销售周报',
        content: '联营专柜本周含税销售额￥30,000.00 超市分成20% 品牌商应结算80%',
      },
    ],
    entries: [
      { subjectCode: '1002', summary: '联营专柜收款', debit: 30000.00, credit: 0, explanation: '银行存款增加记借方。联营专柜销售款由超市统一收取。' },
      { subjectCode: '2241', summary: '应付品牌商货款', debit: 0, credit: 24000.00, explanation: '其他应付款增加记贷方。品牌商的分成部分属于超市代收的资金，需支付给品牌商。' },
      { subjectCode: '6051', summary: '联营分成收入', debit: 0, credit: 5309.73, explanation: '其他业务收入增加记贷方。超市按20%收取的分成属于其他业务收入。' },
      { subjectCode: '222102', summary: '联营销项税额', debit: 0, credit: 690.27, explanation: '应交税费-销项税额增加记贷方。联营分成收入同样需缴纳增值税。' },
    ],
    explanation: '联营专柜是超市引入品牌商设立专柜的运营模式。商品所有权属于品牌商，超市提供场地和收款服务。超市只将分成部分确认为其他业务收入，代收的品牌商货款作为其他应付款核算。',
  },

  // ═══════════════════════════════════════════
  // 1月8日 — 联营专柜保证金
  // ═══════════════════════════════════════════
  {
    id: 'evt_13',
    date: '2026-01-08',
    title: '收取联营专柜保证金',
    description: '向三家联营品牌商各收取保证金5,000元，合计15,000元，已存入银行。合同到期无违约后退还。',
    documents: [
      {
        type: 'receipt',
        title: '保证金收据',
        content: '联营专柜保证金 3家×￥5,000.00=￥15,000.00',
      },
    ],
    entries: [
      { subjectCode: '1002', summary: '收取保证金', debit: 15000.00, credit: 0, explanation: '银行存款增加记借方。收取的保证金存入银行。' },
      { subjectCode: '2241', summary: '联营保证金', debit: 0, credit: 15000.00, explanation: '其他应付款增加记贷方。保证金到期需退还，属于企业的一项负债。' },
    ],
    explanation: '联营专柜保证金是品牌商向超市缴纳的履约保证金，合同到期且无违约时需退还，因此属于其他应付款，不作为企业的收入。',
  },

  // ═══════════════════════════════════════════
  // 1月10日 — 工资与水电
  // ═══════════════════════════════════════════
  {
    id: 'evt_14',
    date: '2026-01-10',
    title: '支付1月上旬水电费',
    description: '支付三家店面1月上旬水电费合计7,000元（总店3,000元、分店A2,200元、分店B1,800元），以银行存款支付。',
    documents: [
      {
        type: 'receipt',
        title: '水电费缴费单',
        content: '总店￥3,000.00 分店A￥2,200.00 分店B￥1,800.00 合计￥7,000.00',
      },
    ],
    entries: [
      { subjectCode: '6601', summary: '支付上旬水电费', debit: 7000.00, credit: 0, explanation: '销售费用增加记借方。店面水电费是维持门店运营的必要支出，属于销售费用。' },
      { subjectCode: '1002', summary: '支付水电费', debit: 0, credit: 7000.00, explanation: '银行存款减少记贷方。' },
    ],
    explanation: '超市水电费金额较大，是门店运营的重要费用。零售企业通常按月支付水电费，直接计入销售费用。',
  },

  {
    id: 'evt_15',
    date: '2026-01-10',
    title: '计提1月员工工资',
    description: '计提1月份员工工资合计680,000元。其中各店收银理货人员100人×4,000元=400,000元，采购配送人员20人×5,000元=100,000元（均计入销售费用）；管理人员30人×6,000元=180,000元（计入管理费用）。',
    documents: [
      {
        type: 'receipt',
        title: '1月工资计提表',
        content: '收银理货100人￥400,000 采购配送20人￥100,000 管理30人￥180,000 合计￥680,000',
      },
    ],
    entries: [
      { subjectCode: '6601', summary: '销售部门工资', debit: 500000.00, credit: 0, explanation: '销售费用增加记借方。收银理货、采购配送人员的薪酬属于销售费用。' },
      { subjectCode: '6602', summary: '管理部门工资', debit: 180000.00, credit: 0, explanation: '管理费用增加记借方。管理人员的薪酬属于管理费用。' },
      { subjectCode: '2211', summary: '计提应付工资', debit: 0, credit: 680000.00, explanation: '应付职工薪酬增加记贷方。计提工资时形成企业对员工的一项负债。' },
    ],
    explanation: '工资计提（确认费用和负债）和工资发放（实际支付）是两个不同的环节。计提时确认各受益对象的费用，同时形成应付职工薪酬负债。',
  },

  {
    id: 'evt_16',
    date: '2026-01-10',
    title: '发放1月员工工资',
    description: '以银行存款发放1月份员工工资680,000元。',
    entries: [
      { subjectCode: '2211', summary: '发放工资', debit: 680000.00, credit: 0, explanation: '应付职工薪酬减少记借方。发放工资后企业对员工的负债减少。' },
      { subjectCode: '1002', summary: '发放工资', debit: 0, credit: 680000.00, explanation: '银行存款减少记贷方。实际支付工资，资产流出。' },
    ],
    explanation: '实际发放工资时，冲减应付职工薪酬。本例简化处理，未涉及代扣代缴个人所得税和社保费用，实际工作中需同步处理代扣款项。',
  },

  // ═══════════════════════════════════════════
  // 1月14日 — 第2周销售
  // ═══════════════════════════════════════════
  {
    id: 'evt_17',
    date: '2026-01-14',
    title: '各店第2周销售（收入确认）',
    description: '第2周销售合计含税收入650,000元（总店330,000元、分店A190,000元、分店B130,000元），款项已全部存入银行。不含税收入575,221.24元，销项税额74,778.76元。',
    documents: [
      {
        type: 'receipt',
        title: '第2周销售汇总表',
        content: '总店￥330,000.00 分店A￥190,000.00 分店B￥130,000.00 合计￥650,000.00',
      },
    ],
    entries: [
      { subjectCode: '1002', summary: '第2周销售收款', debit: 650000.00, credit: 0, explanation: '银行存款增加记借方。第2周销售款项全部存入银行。' },
      { subjectCode: '6001', summary: '第2周销售收入', debit: 0, credit: 575221.24, explanation: '主营业务收入增加记贷方。不含税销售额确认主营业务收入。' },
      { subjectCode: '222102', summary: '第2周销项税额', debit: 0, credit: 74778.76, explanation: '应交税费-销项税额增加记贷方。按13%税率计提销项税。' },
    ],
    explanation: '随着开业口碑传播，第2周销售额较第1周有所增长。零售企业每周汇总销售数据入账，提升核算效率。',
  },

  {
    id: 'evt_18',
    date: '2026-01-14',
    title: '结转第2周销售成本',
    description: '根据第2周销售情况，按成本率65%结转已售商品成本373,893.81元。',
    entries: [
      { subjectCode: '6401', summary: '结转第2周销售成本', debit: 373893.81, credit: 0, explanation: '主营业务成本增加记借方。已售商品的成本从库存中转出。' },
      { subjectCode: '1405', summary: '结转第2周销售成本', debit: 0, credit: 373893.81, explanation: '库存商品减少记贷方。商品已售出，库存减少。' },
    ],
    explanation: '零售企业采用统一成本率结转销售成本，简化日常核算。月末可根据实际盘点结果调整差异。',
  },

  {
    id: 'evt_19',
    date: '2026-01-14',
    title: '联营专柜第2周销售',
    description: '联营专柜第2周含税销售额30,000元，超市分成20%。分成收入不含税5,309.73元，销项税690.27元。应支付品牌商24,000元。',
    entries: [
      { subjectCode: '1002', summary: '联营专柜收款', debit: 30000.00, credit: 0 },
      { subjectCode: '2241', summary: '应付品牌商货款', debit: 0, credit: 24000.00 },
      { subjectCode: '6051', summary: '联营分成收入', debit: 0, credit: 5309.73 },
      { subjectCode: '222102', summary: '联营销项税额', debit: 0, credit: 690.27 },
    ],
    explanation: '联营专柜每周结算一次，超市统一收款后在分成额中确认其他业务收入。',
  },

  // ═══════════════════════════════════════════
  // 1月15日 — 促销活动
  // ═══════════════════════════════════════════
  {
    id: 'evt_20',
    date: '2026-01-15',
    title: '促销活动——赠品处理',
    description: '开展"开业大酬宾"促销活动，向顾客赠送商品的成本为5,000元（从库存商品中发出）。赠品按成本价计入销售费用。',
    documents: [
      {
        type: 'receipt',
        title: '促销赠品出库单',
        content: '促销赠品 成本金额￥5,000.00',
      },
    ],
    entries: [
      { subjectCode: '6601', summary: '促销赠品费用', debit: 5000.00, credit: 0, explanation: '销售费用增加记借方。赠品成本计入销售费用，属于促销支出。' },
      { subjectCode: '1405', summary: '赠品出库', debit: 0, credit: 5000.00, explanation: '库存商品减少记贷方。赠品从库存中发出。' },
    ],
    explanation: '赠品促销是零售企业常见的促销手段。赠品虽不产生直接收入，但其成本作为销售费用处理。在税法上，赠品视同销售需缴纳增值税，本例为简化未单独处理。',
  },

  {
    id: 'evt_21',
    date: '2026-01-15',
    title: '报销差旅费',
    description: '采购经理出差考察新供应商，报销差旅费3,000元，以库存现金支付。',
    documents: [
      {
        type: 'receipt',
        title: '差旅费报销单',
        content: '交通费￥1,500 住宿费￥1,000 餐补￥500 合计￥3,000',
      },
    ],
    entries: [
      { subjectCode: '6602', summary: '报销差旅费', debit: 3000.00, credit: 0, explanation: '管理费用增加记借方。差旅费属于管理性质的费用支出。' },
      { subjectCode: '1001', summary: '报销差旅费', debit: 0, credit: 3000.00, explanation: '库存现金减少记贷方。以现金支付报销款。' },
    ],
    explanation: '差旅费是企业管理人员因公出差发生的交通、住宿、餐饮等费用，计入管理费用。',
  },

  // ═══════════════════════════════════════════
  // 1月17日 — 补货采购
  // ═══════════════════════════════════════════
  {
    id: 'evt_22',
    date: '2026-01-17',
    title: '补货采购食品',
    description: '因销售旺盛，再次向天润食品公司采购食品一批补货，价款400,000元，增值税52,000元（税率13%），价税合计452,000元以银行存款支付。商品已验收入总仓库。',
    documents: [
      {
        type: 'invoice',
        title: '增值税专用发票（食品补货）',
        region: '广东省',
        invoiceNo: '4400556677',
        buyer: '万佳连锁超市有限公司',
        seller: '天润食品有限公司',
        lineItems: [{ name: '食品饮料补货', quantity: 1, unitPrice: 400000, amount: 400000, taxRate: '13%', taxAmount: 52000 }],
        totalAmount: 452000,
      },
    ],
    entries: [
      { subjectCode: '1405', summary: '补货食品入库', debit: 400000.00, credit: 0, explanation: '库存商品增加记借方。补货采购的食品验收入库。' },
      { subjectCode: '222101', summary: '补货食品进项税额', debit: 52000.00, credit: 0, explanation: '应交税费-进项税额增加记借方。' },
      { subjectCode: '1002', summary: '支付补货款', debit: 0, credit: 452000.00, explanation: '银行存款减少记贷方。现购方式支付货款。' },
    ],
    explanation: '零售企业需要根据销售情况及时补货，保持合理的库存水平。补货采购与首次采购的会计处理相同。',
  },

  {
    id: 'evt_23',
    date: '2026-01-17',
    title: '补货采购百货',
    description: '补货采购日用百货一批，价款350,000元，增值税45,500元（税率13%），价税合计395,500元以银行存款支付。商品已验收入总仓库。',
    documents: [
      {
        type: 'invoice',
        title: '增值税专用发票（百货补货）',
        region: '广东省',
        invoiceNo: '4400667788',
        buyer: '万佳连锁超市有限公司',
        seller: '万通日化有限公司',
        lineItems: [{ name: '日用百货补货', quantity: 1, unitPrice: 350000, amount: 350000, taxRate: '13%', taxAmount: 45500 }],
        totalAmount: 395500,
      },
    ],
    entries: [
      { subjectCode: '1405', summary: '补货百货入库', debit: 350000.00, credit: 0, explanation: '库存商品增加记借方。补货百货验收入库。' },
      { subjectCode: '222101', summary: '补货百货进项税额', debit: 45500.00, credit: 0, explanation: '应交税费-进项税额增加记借方。' },
      { subjectCode: '1002', summary: '支付补货款', debit: 0, credit: 395500.00, explanation: '银行存款减少记贷方。' },
    ],
    explanation: '本月采购总额合计：食品600,000+400,000=1,000,000元，百货500,000+350,000=850,000元，运费20,000元，总计采购库存商品1,870,000元。',
  },

  // ═══════════════════════════════════════════
  // 1月21日 — 第3周销售
  // ═══════════════════════════════════════════
  {
    id: 'evt_24',
    date: '2026-01-21',
    title: '各店第3周销售（收入确认）',
    description: '第3周销售合计含税收入700,000元（总店360,000元、分店A200,000元、分店B140,000元），款项已全部存入银行。不含税收入619,469.03元，销项税额80,530.97元。',
    documents: [
      {
        type: 'receipt',
        title: '第3周销售汇总表',
        content: '总店￥360,000.00 分店A￥200,000.00 分店B￥140,000.00 合计￥700,000.00',
      },
    ],
    entries: [
      { subjectCode: '1002', summary: '第3周销售收款', debit: 700000.00, credit: 0 },
      { subjectCode: '6001', summary: '第3周销售收入', debit: 0, credit: 619469.03 },
      { subjectCode: '222102', summary: '第3周销项税额', debit: 0, credit: 80530.97 },
    ],
    explanation: '临近月末，销售持续增长。第3周含税销售额突破70万元，表明三家店面的经营逐步步入正轨。',
  },

  {
    id: 'evt_25',
    date: '2026-01-21',
    title: '结转第3周销售成本',
    description: '按成本率65%结转第3周已售商品成本402,654.87元。',
    entries: [
      { subjectCode: '6401', summary: '结转第3周销售成本', debit: 402654.87, credit: 0 },
      { subjectCode: '1405', summary: '结转第3周销售成本', debit: 0, credit: 402654.87 },
    ],
    explanation: '零售企业按周结转销售成本，便于及时掌握各店毛利情况。',
  },

  {
    id: 'evt_26',
    date: '2026-01-21',
    title: '联营专柜第3周销售',
    description: '联营专柜第3周含税销售额30,000元，超市分成20%。',
    entries: [
      { subjectCode: '1002', summary: '联营专柜收款', debit: 30000.00, credit: 0 },
      { subjectCode: '2241', summary: '应付品牌商货款', debit: 0, credit: 24000.00 },
      { subjectCode: '6051', summary: '联营分成收入', debit: 0, credit: 5309.73 },
      { subjectCode: '222102', summary: '联营销项税额', debit: 0, credit: 690.27 },
    ],
    explanation: '联营专柜每周销售稳定在30,000元左右，月均贡献其他业务收入约21,238.92元。',
  },

  // ═══════════════════════════════════════════
  // 1月25日 — 费用支付
  // ═══════════════════════════════════════════
  {
    id: 'evt_27',
    date: '2026-01-25',
    title: '支付1月下旬水电费',
    description: '支付三家店面1月下旬水电费合计8,000元（总店3,500元、分店A2,500元、分店B2,000元），以银行存款支付。',
    documents: [
      {
        type: 'receipt',
        title: '水电费缴费单',
        content: '总店￥3,500.00 分店A￥2,500.00 分店B￥2,000.00 合计￥8,000.00',
      },
    ],
    entries: [
      { subjectCode: '6601', summary: '支付下旬水电费', debit: 8000.00, credit: 0, explanation: '销售费用增加记借方。下旬水电费同样计入销售费用。' },
      { subjectCode: '1002', summary: '支付水电费', debit: 0, credit: 8000.00, explanation: '银行存款减少记贷方。' },
    ],
    explanation: '1月水电费合计7,000+8,000=15,000元。零售企业水电费是重要的运营成本，需准确核算。',
  },

  {
    id: 'evt_28',
    date: '2026-01-25',
    title: '支付广告宣传费',
    description: '支付中旬追加的宣传推广费8,000元（含社交媒体推广、会员卡印制等），以银行存款支付。',
    documents: [
      {
        type: 'receipt',
        title: '广告费发票',
        content: '宣传推广费 金额￥8,000.00',
      },
    ],
    entries: [
      { subjectCode: '6601', summary: '广告宣传费', debit: 8000.00, credit: 0, explanation: '销售费用增加记借方。持续性广告宣传是保持客流的重要手段。' },
      { subjectCode: '1002', summary: '支付宣传费', debit: 0, credit: 8000.00, explanation: '银行存款减少记贷方。' },
    ],
    explanation: '1月广告费合计：开业广告30,000+追加宣传8,000=38,000元。开业首月广告投入较大，后续月份会逐步减少。',
  },

  // ═══════════════════════════════════════════
  // 1月28日 — 第4周销售
  // ═══════════════════════════════════════════
  {
    id: 'evt_29',
    date: '2026-01-28',
    title: '各店第4周销售（收入确认）',
    description: '第4周销售合计含税收入800,000元（总店410,000元、分店A240,000元、分店B150,000元），款项已全部存入银行。不含税收入707,964.60元，销项税额92,035.40元。',
    documents: [
      {
        type: 'receipt',
        title: '第4周销售汇总表',
        content: '总店￥410,000.00 分店A￥240,000.00 分店B￥150,000.00 合计￥800,000.00',
      },
    ],
    entries: [
      { subjectCode: '1002', summary: '第4周销售收款', debit: 800000.00, credit: 0 },
      { subjectCode: '6001', summary: '第4周销售收入', debit: 0, credit: 707964.60 },
      { subjectCode: '222102', summary: '第4周销项税额', debit: 0, credit: 92035.40 },
    ],
    explanation: '1月最后一周销售达到高峰，全月含税销售总额2,700,000元。开业首月业绩良好，为后续经营奠定基础。',
  },

  {
    id: 'evt_30',
    date: '2026-01-28',
    title: '结转第4周销售成本',
    description: '按成本率65%结转第4周已售商品成本460,176.99元。',
    entries: [
      { subjectCode: '6401', summary: '结转第4周销售成本', debit: 460176.99, credit: 0 },
      { subjectCode: '1405', summary: '结转第4周销售成本', debit: 0, credit: 460176.99 },
    ],
    explanation: '全月主营业务成本合计1,553,097.35元，毛利率约35%，符合零售行业平均水平。',
  },

  {
    id: 'evt_31',
    date: '2026-01-28',
    title: '联营专柜第4周销售',
    description: '联营专柜第4周含税销售额30,000元，超市分成20%。',
    entries: [
      { subjectCode: '1002', summary: '联营专柜收款', debit: 30000.00, credit: 0 },
      { subjectCode: '2241', summary: '应付品牌商货款', debit: 0, credit: 24000.00 },
      { subjectCode: '6051', summary: '联营分成收入', debit: 0, credit: 5309.73 },
      { subjectCode: '222102', summary: '联营销项税额', debit: 0, credit: 690.27 },
    ],
    explanation: '联营专柜月含税销售额120,000元，超市分成收入不含税合计21,238.92元。',
  },

  // ═══════════════════════════════════════════
  // 1月29日 — 结算联营专柜
  // ═══════════════════════════════════════════
  {
    id: 'evt_32',
    date: '2026-01-29',
    title: '支付联营品牌商货款',
    description: '将本月联营专柜代收的销售款（扣除超市分成后）支付给各品牌商，金额合计96,000元（24,000元×4周），以银行存款支付。',
    documents: [
      {
        type: 'bank',
        title: '银行付款回单',
        content: '付款金额：人民币玖万陆仟元整 收款方：各品牌商 摘要：联营结算款',
      },
    ],
    entries: [
      { subjectCode: '2241', summary: '支付品牌商货款', debit: 96000.00, credit: 0, explanation: '其他应付款减少记借方。支付代收的品牌商货款，冲减其他应付款。' },
      { subjectCode: '1002', summary: '支付品牌商货款', debit: 0, credit: 96000.00, explanation: '银行存款减少记贷方。' },
    ],
    explanation: '联营专柜的结算周期通常为月结。超市将代收的销售款扣除分成后，将剩余款项支付给品牌商。此时其他应付款余额仅剩保证金15,000元。',
  },

  // ═══════════════════════════════════════════
  // 1月30日 — 付款结算
  // ═══════════════════════════════════════════
  {
    id: 'evt_33',
    date: '2026-01-30',
    title: '支付前欠百货采购款',
    description: '以银行存款支付之前欠万通日化公司的百货采购款565,000元（1月4日赊购）。',
    documents: [
      {
        type: 'bank',
        title: '银行付款回单',
        content: '付款金额：人民币伍拾陆万伍仟元整 收款方：万通日化有限公司 摘要：支付货款',
      },
    ],
    entries: [
      { subjectCode: '2202', summary: '支付前欠货款', debit: 565000.00, credit: 0, explanation: '应付账款减少记借方。偿还赊购欠款后，对供应商的负债减少。' },
      { subjectCode: '1002', summary: '支付货款', debit: 0, credit: 565000.00, explanation: '银行存款减少记贷方。资金流出用于偿还债务。' },
    ],
    explanation: '赊购时形成应付账款，偿还时冲减应付账款。这笔业务与1月4日的赊购业务对应，完整展示了赊购→付款的全过程。',
  },

  {
    id: 'evt_34',
    date: '2026-01-30',
    title: '支付办公费',
    description: '支付总部办公室1月份办公费用（含文具、打印耗材、饮用水等）12,000元，以银行存款支付。',
    documents: [
      {
        type: 'receipt',
        title: '办公费用清单',
        content: '办公用品￥12,000.00',
      },
    ],
    entries: [
      { subjectCode: '6602', summary: '支付办公费', debit: 12000.00, credit: 0, explanation: '管理费用增加记借方。办公费属于管理性质的日常支出。' },
      { subjectCode: '1002', summary: '支付办公费', debit: 0, credit: 12000.00, explanation: '银行存款减少记贷方。' },
    ],
    explanation: '办公费包括文具用品、打印耗材、饮用水、绿化等日常办公支出，计入管理费用。',
  },

  {
    id: 'evt_35',
    date: '2026-01-30',
    title: '支付银行手续费',
    description: '银行扣收1月份账户管理费及转账手续费200元。',
    documents: [
      {
        type: 'bank',
        title: '银行扣款回单',
        content: '账户管理费及手续费￥200.00',
      },
    ],
    entries: [
      { subjectCode: '6603', summary: '银行手续费', debit: 200.00, credit: 0, explanation: '财务费用增加记借方。银行账户管理费及转账手续费属于财务费用。' },
      { subjectCode: '1002', summary: '银行扣款', debit: 0, credit: 200.00, explanation: '银行存款减少记贷方。银行直接扣款，银行存款减少。' },
    ],
    explanation: '财务费用包括银行手续费、利息支出等。虽然金额不大，但每月都会发生，需及时入账。',
  },

  {
    id: 'evt_36',
    date: '2026-01-30',
    title: '支付短期借款利息',
    description: '支付1月份短期借款利息10,000元（借款2,000,000元×年利率6%÷12个月=10,000元），以银行存款支付。',
    documents: [
      {
        type: 'bank',
        title: '银行扣息回单',
        content: '短期借款利息 ￥10,000.00 借款本金￥2,000,000.00 年利率6%',
      },
    ],
    entries: [
      { subjectCode: '6603', summary: '支付借款利息', debit: 10000.00, credit: 0, explanation: '财务费用增加记借方。借款利息是企业为筹集资金发生的费用，计入财务费用。' },
      { subjectCode: '1002', summary: '支付利息', debit: 0, credit: 10000.00, explanation: '银行存款减少记贷方。利息由银行直接从账户扣收。' },
    ],
    explanation: '短期借款利息按借款本金×年利率÷12计算。本例中月利息=2,000,000×6%÷12=10,000元。利息按月支付，直接计入当期财务费用。',
  },

  // ═══════════════════════════════════════════
  // 1月31日 — 期末调整
  // ═══════════════════════════════════════════
  {
    id: 'evt_37',
    date: '2026-01-31',
    title: '摊销本月店面房租',
    description: '摊销应归属于1月份的三家店面房租45,000元（预付三个月135,000元÷3个月）。',
    entries: [
      { subjectCode: '6601', summary: '摊销本月房租', debit: 45000.00, credit: 0, explanation: '销售费用增加记借方。本月应承担的房租计入销售费用（店面租金）。' },
      { subjectCode: '1123', summary: '摊销本月房租', debit: 0, credit: 45000.00, explanation: '预付账款减少记贷方。随着时间推移，预付租金逐步摊销至费用。' },
    ],
    explanation: '预付账款按受益期摊销。1月份使用店面一个月，因此将预付三个月租金的1/3（45,000元）转为费用。剩余90,000元仍作为预付账款挂在账上。',
  },

  {
    id: 'evt_38',
    date: '2026-01-31',
    title: '计提固定资产折旧',
    description: '设备原值500,000元，预计使用5年（60个月），残值率5%。月折旧额=(500,000-500,000×5%)÷60=7,916.67元。其中店面设备80%计入销售费用（6,333.33元），办公设备20%计入管理费用（1,583.33元）。',
    entries: [
      { subjectCode: '6601', summary: '店面设备折旧', debit: 6333.34, credit: 0, explanation: '销售费用增加记借方。店面用货架、收银机等设备的折旧计入销售费用。' },
      { subjectCode: '6602', summary: '办公设备折旧', debit: 1583.33, credit: 0, explanation: '管理费用增加记借方。总部办公用设备的折旧计入管理费用。' },
      { subjectCode: '1602', summary: '计提折旧', debit: 0, credit: 7916.67, explanation: '累计折旧增加记贷方。累计折旧是固定资产的备抵科目，反映已损耗的价值。' },
    ],
    explanation: '折旧是将固定资产的成本在其使用寿命内系统分摊的过程。直线法是最常用的折旧方法：月折旧额=(原值-残值)÷使用月数。',
  },

  {
    id: 'evt_39',
    date: '2026-01-31',
    title: '月末存货盘点——发现盘亏',
    description: '月末对总仓库及各店库存商品进行全面盘点，发现部分商品因保管不当或失窃等原因盘亏，报损金额12,000元。先通过待处理财产损溢科目核算。',
    documents: [
      {
        type: 'receipt',
        title: '库存盘点表',
        content: '库存商品盘亏￥12,000.00 原因待查',
      },
    ],
    entries: [
      { subjectCode: '1901', summary: '存货盘亏（待查）', debit: 12000.00, credit: 0, explanation: '待处理财产损溢增加记借方。盘亏的存货在查明原因前先通过待处理科目过渡。' },
      { subjectCode: '1405', summary: '存货盘亏', debit: 0, credit: 12000.00, explanation: '库存商品减少记贷方。实际盘点发现的短缺商品从库存中扣除。' },
    ],
    explanation: '存货盘亏是指实际库存少于账面记录的情况。在查明原因之前，先通过"待处理财产损溢"科目过渡，待批准后根据原因分别计入管理费用或营业外支出。',
  },

  {
    id: 'evt_40',
    date: '2026-01-31',
    title: '处理存货盘亏',
    description: '经查，盘亏的12,000元商品中，8,000元属于管理不善（未严格执行出入库管理），4,000元属于正常损耗。经批准全部计入管理费用。',
    entries: [
      { subjectCode: '6602', summary: '存货盘亏处理', debit: 12000.00, credit: 0, explanation: '管理费用增加记借方。管理不善造成的存货损失计入管理费用。' },
      { subjectCode: '1901', summary: '盘亏转销', debit: 0, credit: 12000.00, explanation: '待处理财产损溢减少记贷方。盘亏已批准处理，冲销待处理科目。' },
    ],
    explanation: '存货盘亏经批准后，根据原因不同处理方式不同：管理不善计入管理费用，自然灾害计入营业外支出，责任人赔偿计入其他应收款。',
  },

  {
    id: 'evt_41',
    date: '2026-01-31',
    title: '计提存货跌价准备',
    description: '月末对库存商品进行减值测试，发现部分商品（临期食品、过季百货等）可变现净值低于成本，计提存货跌价准备20,000元。',
    documents: [
      {
        type: 'receipt',
        title: '存货减值测试报告',
        content: '临期食品￥12,000 过季百货￥8,000 合计跌价金额￥20,000',
      },
    ],
    entries: [
      { subjectCode: '6701', summary: '计提存货跌价准备', debit: 20000.00, credit: 0, explanation: '资产减值损失增加记借方。存货可变现净值低于成本的差额确认为资产减值损失。' },
      { subjectCode: '1471', summary: '计提存货跌价准备', debit: 0, credit: 20000.00, explanation: '存货跌价准备增加记贷方。该科目是库存商品的备抵科目，减少存货账面价值。' },
    ],
    explanation: '存货跌价准备体现了会计的谨慎性原则。当存货的可变现净值低于其成本时，需计提跌价准备，将存货账面价值调整至可变现净值。',
  },

  {
    id: 'evt_42',
    date: '2026-01-31',
    title: '增值税月末核算',
    description: '月末计算本月应交增值税。销项税额合计313,380.55元（主营310,619.47元+联营2,761.08元），进项税额合计307,300.00元，差额6,080.55元为应交未交增值税。',
    entries: [
      { subjectCode: '222102', summary: '结转销项税额', debit: 313380.55, credit: 0, explanation: '销项税额结转减少记借方。将销项税额余额转出。' },
      { subjectCode: '222101', summary: '结转进项税额', debit: 0, credit: 307300.00, explanation: '进项税额结转减少记贷方。将进项税额余额转出。' },
      { subjectCode: '222106', summary: '转出未交增值税', debit: 0, credit: 6080.55, explanation: '转出未交增值税增加记贷方。差额部分为应交未交的增值税。' },
      {
        subjectCode: '222106',
        summary: '结转至未交增值税',
        debit: 6080.55,
        credit: 0,
        explanation: '转出未交增值税结转至未交增值税科目。',
      },
      {
        subjectCode: '222108',
        summary: '未交增值税',
        debit: 0,
        credit: 6080.55,
        explanation: '未交增值税增加记贷方。反映企业期末应交但尚未缴纳的增值税。',
      },
    ],
    explanation: '月末增值税核算的"转出未交增值税"将销项税额大于进项税额的差额转入未交增值税科目，反映企业应向税务局缴纳的增值税额。若进项大于销项则为留抵税额，可结转下月抵扣。',
  },

  {
    id: 'evt_43',
    date: '2026-01-31',
    title: '计提城建税及教育费附加',
    description: '按实际应缴增值税的12%计提附加税。城建税7%、教育费附加3%、地方教育附加2%。附加税额=6,080.55×12%=729.67元。',
    entries: [
      { subjectCode: '6403', summary: '计提城建税及附加', debit: 729.67, credit: 0, explanation: '税金及附加增加记借方。城建税和教育费附加是附加在增值税之上的税费。' },
      { subjectCode: '222120', summary: '计提城建税及附加', debit: 0, credit: 729.67, explanation: '应交税费-城建税及附加增加记贷方。计提的附加税形成对税务局的负债。' },
    ],
    explanation: '城建税（7%）、教育费附加（3%）和地方教育附加（2%）以实际应缴纳的增值税为计税依据，合计附加率为12%。这些税费计入"税金及附加"科目。',
  },

  {
    id: 'evt_44',
    date: '2026-01-31',
    title: '计提本月所得税',
    description: '按本月利润总额8,675.77元计提企业所得税，税率25%，应交所得税=8,675.77×25%=2,168.94元。',
    entries: [
      { subjectCode: '6801', summary: '计提所得税', debit: 2168.94, credit: 0, explanation: '所得税费用增加记借方。企业所得税按应纳税所得额的25%计算。' },
      { subjectCode: '222104', summary: '计提应交所得税', debit: 0, credit: 2168.94, explanation: '应交税费-应交所得税增加记贷方。所得税形成对税务局的负债。' },
    ],
    explanation: '企业所得税按季度预缴、年终汇算清缴。本例按月计提所得税，便于计算净利润。税率25%为基本税率，小微企业可享受优惠税率。',
  },

  {
    id: 'evt_45',
    date: '2026-01-31',
    title: '结转损益至本年利润',
    description: '将本月所有损益类科目余额结转至本年利润，计算1月份净利润。',
    entries: [
      { subjectCode: '6001', summary: '结转主营业务收入', debit: 2389380.53, credit: 0, explanation: '主营业务收入结转减少记借方。将收入类科目余额结转至本年利润。' },
      { subjectCode: '6051', summary: '结转其他业务收入', debit: 21238.92, credit: 0, explanation: '其他业务收入结转减少记借方。' },
      { subjectCode: '4103', summary: '收入结转至本年利润', debit: 0, credit: 2410619.45, explanation: '本年利润增加记贷方。全部收入结转入本年利润贷方。' },
      {
        subjectCode: '4103',
        summary: '费用结转至本年利润',
        debit: 2404112.62,
        credit: 0,
        explanation: '本年利润减少记借方。全部费用结转入本年利润借方。',
      },
      { subjectCode: '6401', summary: '结转主营业务成本', debit: 0, credit: 1553097.35, explanation: '主营业务成本结转减少记贷方。' },
      { subjectCode: '6403', summary: '结转税金及附加', debit: 0, credit: 729.67, explanation: '税金及附加结转减少记贷方。' },
      { subjectCode: '6601', summary: '结转销售费用', debit: 0, credit: 609333.33, explanation: '销售费用结转减少记贷方。本月销售费用合计：工资500,000+房租45,000+折旧6,333.33+水电15,000+广告38,000+赠品5,000=609,333.33元。' },
      { subjectCode: '6602', summary: '结转管理费用', debit: 0, credit: 208583.33, explanation: '管理费用结转减少记贷方。本月管理费用合计：工资180,000+折旧1,583.33+差旅3,000+办公12,000+盘亏12,000=208,583.33元。' },
      { subjectCode: '6603', summary: '结转财务费用', debit: 0, credit: 10200.00, explanation: '财务费用结转减少记贷方。本月财务费用合计：利息10,000+手续费200=10,200元。' },
      { subjectCode: '6701', summary: '结转资产减值损失', debit: 0, credit: 20000.00, explanation: '资产减值损失结转减少记贷方。' },
      { subjectCode: '6801', summary: '结转所得税费用', debit: 0, credit: 2168.94, explanation: '所得税费用结转减少记贷方。' },
    ],
    explanation: '期末结转损益是将所有损益类科目的余额汇总转入"本年利润"科目，计算本期净利润。收入类转入贷方，费用类转入借方，贷方差额为净利润。本月收入2,410,619.45元，费用2,404,112.62元，净利润6,506.83元。',
  },
]

export default {
  id: 'large_retail_chain',
  companyInfo: {
    name: '万佳连锁超市有限公司',
    shortName: '万佳连锁',
    taxType: '一般纳税人',
    taxRate: '13%',
    accountingSystem: '企业会计准则',
    industry: '零售连锁',
    address: '万佳广场1号',
    description: '万佳连锁是一家拥有3家连锁超市的零售企业（总店+2家分店），经营日用百货、食品、家电等品类。公司实行统一采购、统一配送、统一定价、统一核算的管理模式。员工150人，其中各店收银理货100人、采购配送20人、管理30人。2026年1月新成立，3家店同时开业。',
  },
  subjects: SUBJECTS,
  openingBalances: OPENING_BALANCES,
  events: EVENTS,
  periodEnd: {
    depreciation: true,
    amortization: true,
    taxTransfer: true,
    profitTransfer: true,
  },
}
