/**
 * 案例：振华集团制造有限公司 — 大型制造业集团
 *
 * 企业背景：振华集团是一家综合性电子制造企业，拥有两个生产分厂（电子元器件分厂和成品组装分厂）
 * 和一个研发中心。主要产品包括电子元器件和智能终端设备，月产能约10,000件。
 * 公司员工200人，其中生产工人120人、车间管理15人、研发人员20人、销售人员25人、行政管理20人。
 * 公司设有独立的研发部门，拥有多项专利技术。
 *
 * 会计制度：企业会计准则
 * 纳税人性质：一般纳税人（增值税税率13%，运输服务税率9%）
 * 成立时间：2026年1月（新成立，无期初余额）
 *
 * 共 48 个业务事件，覆盖：资金筹集→资产购置→采购→生产→销售→费用→投资→税费→期末调整
 */

const SUBJECTS = [
  // ─── 资产类 ───
  { id: 's-1001', code: '1001', name: '库存现金', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1002', code: '1002', name: '银行存款', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1012', code: '1012', name: '其他货币资金', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1122', code: '1122', name: '应收账款', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1123', code: '1123', name: '预付账款', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1221', code: '1221', name: '其他应收款', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1231', code: '1231', name: '坏账准备', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1403', code: '1403', name: '原材料', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1405', code: '1405', name: '库存商品', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1406', code: '1406', name: '发出商品', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1511', code: '1511', name: '长期股权投资', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1601', code: '1601', name: '固定资产', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1602', code: '1602', name: '累计折旧', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1701', code: '1701', name: '无形资产', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1702', code: '1702', name: '累计摊销', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1901', code: '1901', name: '待处理财产损溢', type: 'asset', parentId: null, isLeaf: true },

  // ─── 负债类 ───
  { id: 's-2001', code: '2001', name: '短期借款', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-2202', code: '2202', name: '应付账款', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-2203', code: '2203', name: '预收账款', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-2211', code: '2211', name: '应付职工薪酬', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-222101', code: '222101', name: '应交税费-应交增值税(进项税额)', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-222102', code: '222102', name: '应交税费-应交增值税(销项税额)', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-222104', code: '222104', name: '应交税费-应交所得税', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-222106', code: '222106', name: '应交税费-应交增值税(转出未交增值税)', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-222120', code: '222120', name: '应交税费-应交城建税及附加', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-2241', code: '2241', name: '其他应付款', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-2501', code: '2501', name: '长期借款', type: 'liability', parentId: null, isLeaf: true },

  // ─── 权益类 ───
  { id: 's-4001', code: '4001', name: '实收资本', type: 'equity', parentId: null, isLeaf: true },
  { id: 's-4002', code: '4002', name: '资本公积', type: 'equity', parentId: null, isLeaf: true },
  { id: 's-4103', code: '4103', name: '本年利润', type: 'equity', parentId: null, isLeaf: true },
  { id: 's-4104', code: '4104', name: '利润分配', type: 'equity', parentId: null, isLeaf: true },

  // ─── 成本类 ───
  { id: 's-5001', code: '5001', name: '生产成本', type: 'cost', parentId: null, isLeaf: true },
  { id: 's-5101', code: '5101', name: '制造费用', type: 'cost', parentId: null, isLeaf: true },
  { id: 's-5301', code: '5301', name: '研发支出', type: 'cost', parentId: null, isLeaf: true },

  // ─── 损益类 ───
  { id: 's-6001', code: '6001', name: '主营业务收入', type: 'profit_loss', parentId: null, isLeaf: true },
  { id: 's-6051', code: '6051', name: '其他业务收入', type: 'profit_loss', parentId: null, isLeaf: true },
  { id: 's-6401', code: '6401', name: '主营业务成本', type: 'profit_loss', parentId: null, isLeaf: true },
  { id: 's-6402', code: '6402', name: '其他业务成本', type: 'profit_loss', parentId: null, isLeaf: true },
  { id: 's-6403', code: '6403', name: '税金及附加', type: 'profit_loss', parentId: null, isLeaf: true },
  { id: 's-6601', code: '6601', name: '销售费用', type: 'profit_loss', parentId: null, isLeaf: true },
  { id: 's-6602', code: '6602', name: '管理费用', type: 'profit_loss', parentId: null, isLeaf: true },
  { id: 's-6603', code: '6603', name: '财务费用', type: 'profit_loss', parentId: null, isLeaf: true },
  { id: 's-6711', code: '6711', name: '营业外收入', type: 'profit_loss', parentId: null, isLeaf: true },
  { id: 's-6712', code: '6712', name: '营业外支出', type: 'profit_loss', parentId: null, isLeaf: true },
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
    description: '振华集团收到各股东投入资本金1,000,000元，其中注册资本800,000元，资本溢价200,000元，款项已存入银行账户。',
    documents: [
      {
        type: 'bank',
        title: '银行收款回单',
        content: '收款金额：人民币壹佰万元整 付款人：各股东 摘要：投资款入账',
      },
      {
        type: 'receipt',
        title: '验资报告摘要',
        content: '振华集团制造有限公司注册资本捌拾万元，各股东出资合计壹佰万元，超出部分计入资本公积。',
      },
    ],
    entries: [
      {
        subjectCode: '1002',
        summary: '收到投资款',
        debit: 1000000.00,
        credit: 0,
        explanation: '银行存款增加记借方。投资者投入的货币资金存入银行，企业资产增加。',
      },
      {
        subjectCode: '4001',
        summary: '确认注册资本',
        debit: 0,
        credit: 800000.00,
        explanation: '实收资本增加记贷方。按公司章程确认的注册资本部分，属于所有者投入的资本。',
      },
      {
        subjectCode: '4002',
        summary: '资本溢价',
        debit: 0,
        credit: 200000.00,
        explanation: '资本公积增加记贷方。投资者出资超过注册资本份额的部分，属于资本溢价，计入资本公积。',
      },
    ],
    explanation: '企业设立时收到投资者投入资本，超出注册资本的部分形成资本溢价。这笔分录体现了所有者权益的构成：实收资本是法定资本，资本公积是资本溢价积累。企业初始资金1,000,000元全部存入银行。',
  },

  {
    id: 'evt_02',
    date: '2026-01-02',
    title: '借入长期借款',
    description: '向工商银行借入长期借款500,000元，期限3年，年利率6%，按月付息，到期还本。款项已存入银行账户。',
    documents: [
      {
        type: 'bank',
        title: '银行收款回单',
        content: '收款金额：人民币伍拾万元整 付款人：工商银行 摘要：长期借款',
      },
      {
        type: 'receipt',
        title: '借款合同摘要',
        content: '借款金额500,000元 期限36个月 年利率6% 按月付息 到期还本',
      },
    ],
    entries: [
      {
        subjectCode: '1002',
        summary: '借入长期借款',
        debit: 500000.00,
        credit: 0,
        explanation: '银行存款增加记借方。借入的款项已存入银行，企业可随时用于生产经营。',
      },
      {
        subjectCode: '2501',
        summary: '借入长期借款',
        debit: 0,
        credit: 500000.00,
        explanation: '长期借款增加记贷方。期限超过一年的借款属于长期负债，需在长期借款科目核算。',
      },
    ],
    explanation: '长期借款是企业向银行或其他金融机构借入的期限在一年以上的借款。本例中借款期为3年，属于长期负债。长期借款的利息通常按月计提，计入财务费用。初始资金1,500,000元。',
  },

  // ═══════════════════════════════════════════
  // 1月3日 — 资产购置
  // ═══════════════════════════════════════════
  {
    id: 'evt_03',
    date: '2026-01-03',
    title: '预付全年厂房租金',
    description: '预付振华科技园厂房2026年度全年租金120,000元，以银行存款支付。厂房用于生产车间和研发中心。',
    documents: [
      {
        type: 'receipt',
        title: '厂房租赁合同',
        content: '振华科技园88号厂房 年租金120,000元 租赁期2026年1月-12月',
      },
      {
        type: 'bank',
        title: '银行付款回单',
        content: '付款金额：人民币壹拾贰万元整 收款方：振华科技园管理公司 摘要：预付2026年厂房租金',
      },
    ],
    entries: [
      {
        subjectCode: '1123',
        summary: '预付全年厂房租金',
        debit: 120000.00,
        credit: 0,
        explanation: '预付账款增加记借方。一次性支付全年租金形成一项预付资产，后续按月摊销计入制造费用。',
      },
      {
        subjectCode: '1002',
        summary: '支付全年租金',
        debit: 0,
        credit: 120000.00,
        explanation: '银行存款减少记贷方。一次性支付大额租金，资金流出企业。',
      },
    ],
    explanation: '预付全年租金属于预付账款，不是当期费用。受益期为全年12个月，每月摊销10,000元计入制造费用（厂房主要为生产车间服务）。这是权责发生制的基本要求——费用应与受益期匹配。',
  },

  {
    id: 'evt_04',
    date: '2026-01-03',
    title: '购置生产设备',
    description: '购买自动化生产线设备一套，价款200,000元，增值税26,000元（税率13%），价税合计226,000元以银行存款支付。预计使用10年，残值率5%。',
    documents: [
      {
        type: 'invoice',
        title: '增值税专用发票（设备）',
        region: '浙江省',
        invoiceNo: '3300223344',
        buyer: '振华集团制造有限公司',
        seller: '华强机械设备有限公司',
        lineItems: [{ name: '自动化生产线设备', quantity: 1, unitPrice: 200000, amount: 200000, taxRate: '13%', taxAmount: 26000 }],
        totalAmount: 226000,
      },
      {
        type: 'bank',
        title: '银行付款回单',
        content: '付款金额：人民币贰拾贰万陆仟元整 收款方：华强机械设备有限公司 摘要：购设备款',
      },
    ],
    entries: [
      {
        subjectCode: '1601',
        summary: '购置生产设备原值',
        debit: 200000.00,
        credit: 0,
        explanation: '固定资产增加记借方。设备按取得时的实际成本（不含可抵扣增值税）入账。',
      },
      {
        subjectCode: '222101',
        summary: '设备进项税额',
        debit: 26000.00,
        credit: 0,
        explanation: '应交税费-进项税额增加记借方。一般纳税人取得增值税专用发票，进项税额可抵扣销项税额。',
      },
      {
        subjectCode: '1002',
        summary: '支付设备款',
        debit: 0,
        credit: 226000.00,
        explanation: '银行存款减少记贷方。支付价税合计金额，资金流出企业。',
      },
    ],
    explanation: '一般纳税人购置固定资产，取得增值税专用发票的，进项税额可以抵扣。固定资产入账价值为不含税价款200,000元，后续每月计提折旧，将设备成本分期计入制造费用。',
  },

  // ═══════════════════════════════════════════
  // 1月4日 — 备用金
  // ═══════════════════════════════════════════
  {
    id: 'evt_05',
    date: '2026-01-04',
    title: '提取备用金',
    description: '从银行提取10,000元现金作为公司日常备用金，用于小额零星支出。',
    documents: [
      {
        type: 'bank',
        title: '银行取款回单',
        content: '提取备用金 人民币壹万元整',
      },
    ],
    entries: [
      {
        subjectCode: '1001',
        summary: '提取备用金',
        debit: 10000.00,
        credit: 0,
        explanation: '库存现金增加记借方。备用金是存放在企业出纳处的现金，用于日常小额支付。',
      },
      {
        subjectCode: '1002',
        summary: '提取备用金',
        debit: 0,
        credit: 10000.00,
        explanation: '银行存款减少记贷方。从银行提取现金后，银行存款相应减少。',
      },
    ],
    explanation: '备用金是企业为日常零星开支准备的现金。提取备用金时，资金从银行存款转入库存现金，总资产不变，只是资产形态发生变化。备用金需指定专人保管并定期盘点核对。',
  },

  // ═══════════════════════════════════════════
  // 1月5日 — 采购
  // ═══════════════════════════════════════════
  {
    id: 'evt_06',
    date: '2026-01-05',
    title: '采购电子元器件（现购）',
    description: '向天元电子采购电子元器件一批，价款300,000元，增值税39,000元（税率13%），价税合计339,000元以银行存款支付。材料已验收入库。',
    documents: [
      {
        type: 'invoice',
        title: '增值税专用发票（材料采购）',
        region: '浙江省',
        invoiceNo: '3300334455',
        buyer: '振华集团制造有限公司',
        seller: '天元电子科技有限公司',
        lineItems: [{ name: '电子元器件', quantity: 1, unitPrice: 300000, amount: 300000, taxRate: '13%', taxAmount: 39000 }],
        totalAmount: 339000,
      },
      {
        type: 'receipt',
        title: '材料入库单',
        content: '电子元器件 一批 入库金额￥300,000.00 已验收入库',
      },
      {
        type: 'bank',
        title: '银行付款回单',
        content: '付款金额：人民币叁拾叁万玖仟元整 收款方：天元电子科技有限公司 摘要：材料采购款',
      },
    ],
    entries: [
      {
        subjectCode: '1403',
        summary: '采购原材料入库',
        debit: 300000.00,
        credit: 0,
        explanation: '原材料增加记借方。采购的电子元器件作为原材料验收入库，按不含税采购成本入账。',
      },
      {
        subjectCode: '222101',
        summary: '材料进项税额',
        debit: 39000.00,
        credit: 0,
        explanation: '应交税费-进项税额增加记借方。取得增值税专用发票，进项税额准予抵扣。',
      },
      {
        subjectCode: '1002',
        summary: '支付材料款',
        debit: 0,
        credit: 339000.00,
        explanation: '银行存款减少记贷方。现购方式下，采购与付款同时完成。',
      },
    ],
    explanation: '采购原材料并验收入库，按采购成本（不含可抵扣增值税）计入原材料科目。现购方式下，款项即时支付。一般纳税人的进项税额可抵扣销项税额，不构成材料成本。',
  },

  {
    id: 'evt_07',
    date: '2026-01-05',
    title: '采购包装材料（赊购）',
    description: '向华美包装采购包装材料一批，价款50,000元，增值税6,500元（税率13%），价税合计56,500元货款暂欠。材料已验收入库。',
    documents: [
      {
        type: 'invoice',
        title: '增值税专用发票（包装材料）',
        region: '浙江省',
        invoiceNo: '3300445566',
        buyer: '振华集团制造有限公司',
        seller: '华美包装材料有限公司',
        lineItems: [{ name: '包装材料', quantity: 1, unitPrice: 50000, amount: 50000, taxRate: '13%', taxAmount: 6500 }],
        totalAmount: 56500,
      },
      {
        type: 'receipt',
        title: '材料入库单',
        content: '包装材料 一批 入库金额￥50,000.00 已验收入库',
      },
    ],
    entries: [
      {
        subjectCode: '1403',
        summary: '采购包装材料入库',
        debit: 50000.00,
        credit: 0,
        explanation: '原材料增加记借方。包装材料属于原材料的一部分，按不含税采购成本入账。',
      },
      {
        subjectCode: '222101',
        summary: '包装材料进项税额',
        debit: 6500.00,
        credit: 0,
        explanation: '应交税费-进项税额增加记借方。增值税专用发票注明的税额准予抵扣。',
      },
      {
        subjectCode: '2202',
        summary: '赊购材料款暂欠',
        debit: 0,
        credit: 56500.00,
        explanation: '应付账款增加记贷方。赊购方式下，材料已入库但货款尚未支付，形成对供应商的负债。',
      },
    ],
    explanation: '赊购（先收货后付款）与现购的区别在于：现购贷记银行存款，赊购贷记应付账款。本例采用赊购方式，形成对华美包装的应付账款56,500元，后续付款时再冲减。赊购有助于企业缓解短期资金压力。',
  },

  // ═══════════════════════════════════════════
  // 1月6日 — 生产领料
  // ═══════════════════════════════════════════
  {
    id: 'evt_08',
    date: '2026-01-06',
    title: '一车间领用电子元器件',
    description: '电子元器件分厂（一车间）为生产电子元器件产品，领用电子元器件原材料150,000元。',
    documents: [
      {
        type: 'receipt',
        title: '领料单',
        content: '一车间领用电子元器件 金额￥150,000.00 用于生产',
      },
    ],
    entries: [
      {
        subjectCode: '5001',
        summary: '一车间领用原材料',
        debit: 150000.00,
        credit: 0,
        explanation: '生产成本增加记借方。生产车间领用的原材料构成产品实体，计入生产成本-直接材料。',
      },
      {
        subjectCode: '1403',
        summary: '一车间领用原材料',
        debit: 0,
        credit: 150000.00,
        explanation: '原材料减少记贷方。原材料被生产领用后，从库存中减少，转入生产成本。',
      },
    ],
    explanation: '生产领用原材料是制造业成本核算的第一步。原材料从仓库发出到车间，价值从原材料科目转入生产成本-直接材料科目。一车间（电子元器件分厂）领用电子元器件进行生产加工。',
  },

  {
    id: 'evt_09',
    date: '2026-01-06',
    title: '二车间领用原材料及包装材料',
    description: '成品组装分厂（二车间）为生产智能终端产品，领用电子元器件80,000元和包装材料30,000元，合计110,000元。',
    documents: [
      {
        type: 'receipt',
        title: '领料单',
        content: '二车间领用电子元器件￥80,000 包装材料￥30,000 合计￥110,000',
      },
    ],
    entries: [
      {
        subjectCode: '5001',
        summary: '二车间领用原材料',
        debit: 110000.00,
        credit: 0,
        explanation: '生产成本增加记借方。二车间领用的原材料（含包装材料）计入生产成本。',
      },
      {
        subjectCode: '1403',
        summary: '二车间领用原材料',
        debit: 0,
        credit: 110000.00,
        explanation: '原材料减少记贷方。电子元器件和包装材料被生产领用，原材料库存减少。',
      },
    ],
    explanation: '二车间生产智能终端产品，既需要电子元器件作为核心部件，也需要包装材料进行成品包装。两种材料一次性领用，合计110,000元全部转入生产成本。截至本日，两车间共领用材料260,000元。',
  },

  // ═══════════════════════════════════════════
  // 1月7日 — 购入无形资产 + 销售
  // ═══════════════════════════════════════════
  {
    id: 'evt_10',
    date: '2026-01-07',
    title: '购入非专利技术',
    description: '为提升产品竞争力，向创芯科技购入一项非专利技术（电子电路设计技术），价款50,000元，以银行存款支付。预计使用10年。',
    documents: [
      {
        type: 'receipt',
        title: '技术转让合同',
        content: '非专利技术-电子电路设计技术 转让价款￥50,000.00 使用年限10年',
      },
      {
        type: 'bank',
        title: '银行付款回单',
        content: '付款金额：人民币伍万元整 收款方：创芯科技有限公司 摘要：技术转让费',
      },
    ],
    entries: [
      {
        subjectCode: '1701',
        summary: '购入非专利技术',
        debit: 50000.00,
        credit: 0,
        explanation: '无形资产增加记借方。外购的无形资产按实际支付的价款入账，作为无形资产核算。',
      },
      {
        subjectCode: '1002',
        summary: '支付技术转让费',
        debit: 0,
        credit: 50000.00,
        explanation: '银行存款减少记贷方。以银行存款支付技术转让价款。',
      },
    ],
    explanation: '非专利技术属于无形资产，在购入时按实际成本入账。后续在预计使用年限内（本例为10年）分期摊销，摊销额计入管理费用。无形资产与固定资产类似，都是将长期资产的成本分摊到各受益期。',
  },

  {
    id: 'evt_11',
    date: '2026-01-07',
    title: '销售电子元器件（收入确认）',
    description: '向恒达科技销售电子元器件一批，售价200,000元，增值税26,000元（税率13%），价税合计226,000元已收存银行。',
    documents: [
      {
        type: 'invoice',
        title: '增值税专用发票（销售元器件）',
        region: '浙江省',
        invoiceNo: '4400112233',
        buyer: '恒达科技有限公司',
        seller: '振华集团制造有限公司',
        lineItems: [{ name: '电子元器件', quantity: 1, unitPrice: 200000, amount: 200000, taxRate: '13%', taxAmount: 26000 }],
        totalAmount: 226000,
      },
      {
        type: 'bank',
        title: '银行收款回单',
        content: '收款金额：人民币贰拾贰万陆仟元整 付款人：恒达科技有限公司 摘要：货款',
      },
    ],
    entries: [
      {
        subjectCode: '1002',
        summary: '收到销售货款',
        debit: 226000.00,
        credit: 0,
        explanation: '银行存款增加记借方。销售货物收到的款项（含税）已存入银行。',
      },
      {
        subjectCode: '6001',
        summary: '确认主营业务收入',
        debit: 0,
        credit: 200000.00,
        explanation: '主营业务收入增加记贷方。确认产品销售收入，按不含税金额入账。',
      },
      {
        subjectCode: '222102',
        summary: '确认销项税额',
        debit: 0,
        credit: 26000.00,
        explanation: '应交税费-销项税额增加记贷方。一般纳税人销售货物按13%税率计提销项税额。',
      },
    ],
    explanation: '销售商品确认收入时，按不含税售价确认主营业务收入，按售价的13%确认销项税额。一般纳税人采用价税分离核算：借记银行存款（含税总额），贷记主营业务收入（不含税）和应交税费-销项税额。',
  },

  {
    id: 'evt_12',
    date: '2026-01-07',
    title: '结转电子元器件销售成本',
    description: '结转已售电子元器件的生产成本120,000元。',
    entries: [
      {
        subjectCode: '6401',
        summary: '结转销售成本',
        debit: 120000.00,
        credit: 0,
        explanation: '主营业务成本增加记借方。已售产品的生产成本从库存商品转入当期损益。',
      },
      {
        subjectCode: '1405',
        summary: '结转销售成本',
        debit: 0,
        credit: 120000.00,
        explanation: '库存商品减少记贷方。产品已售出，库存商品相应减少。',
      },
    ],
    explanation: '收入与成本应当配比。确认收入的同时必须结转相应的销售成本。电子元器件的生产成本120,000元从库存商品转入主营业务成本，毛利率为40%（(200,000-120,000)/200,000）。',
  },

  // ═══════════════════════════════════════════
  // 1月8日 — 销售（赊销）
  // ═══════════════════════════════════════════
  {
    id: 'evt_13',
    date: '2026-01-08',
    title: '销售智能终端（赊销）',
    description: '向B客户（百川电子）销售智能终端设备一批，售价300,000元，增值税39,000元（税率13%），价税合计339,000元货款暂欠。',
    documents: [
      {
        type: 'invoice',
        title: '增值税专用发票（销售终端）',
        region: '浙江省',
        invoiceNo: '4400223344',
        buyer: '百川电子有限公司',
        seller: '振华集团制造有限公司',
        lineItems: [{ name: '智能终端设备', quantity: 1, unitPrice: 300000, amount: 300000, taxRate: '13%', taxAmount: 39000 }],
        totalAmount: 339000,
      },
      {
        type: 'receipt',
        title: '产品出库单',
        content: '智能终端设备 一批 成本￥180,000 已发货',
      },
    ],
    entries: [
      {
        subjectCode: '1122',
        summary: '赊销货款未收',
        debit: 339000.00,
        credit: 0,
        explanation: '应收账款增加记借方。赊销方式下，货款尚未收到，形成对客户的债权。',
      },
      {
        subjectCode: '6001',
        summary: '确认主营业务收入',
        debit: 0,
        credit: 300000.00,
        explanation: '主营业务收入增加记贷方。按不含税售价确认产品销售收入。',
      },
      {
        subjectCode: '222102',
        summary: '确认销项税额',
        debit: 0,
        credit: 39000.00,
        explanation: '应交税费-销项税额增加记贷方。销售智能终端按13%计提销项税额。',
      },
    ],
    explanation: '赊销（先发货后收款）与现销的区别在于：现销借记银行存款，赊销借记应收账款。本例采用赊销方式，形成对百川电子的应收账款339,000元，后续收款时再冲减。赊销是企业扩大销售的重要手段，但会增加应收账款管理成本和坏账风险。',
  },

  {
    id: 'evt_14',
    date: '2026-01-08',
    title: '结转智能终端销售成本',
    description: '结转已售智能终端设备的生产成本180,000元。',
    entries: [
      {
        subjectCode: '6401',
        summary: '结转销售成本',
        debit: 180000.00,
        credit: 0,
        explanation: '主营业务成本增加记借方。已售智能终端的成本转入当期损益。',
      },
      {
        subjectCode: '1405',
        summary: '结转销售成本',
        debit: 0,
        credit: 180000.00,
        explanation: '库存商品减少记贷方。智能终端已售出，库存减少。',
      },
    ],
    explanation: '配比原则要求收入与对应成本在同一期间确认。智能终端毛利率40%（(300,000-180,000)/300,000），与电子元器件产品毛利率一致，反映了企业产品的稳定盈利能力。',
  },

  // ═══════════════════════════════════════════
  // 1月10日 — 费用支付 + 工资
  // ═══════════════════════════════════════════
  {
    id: 'evt_15',
    date: '2026-01-10',
    title: '支付车间水电费',
    description: '支付一、二车间1月上旬水电费8,000元，增值税1,040元（税率13%），价税合计9,040元以银行存款支付。',
    documents: [
      {
        type: 'invoice',
        title: '增值税专用发票（车间水费电费）',
        region: '浙江省',
        invoiceNo: '5500112233',
        buyer: '振华集团制造有限公司',
        seller: '市供电公司/市自来水公司',
        lineItems: [
          { name: '电费', quantity: 1, unitPrice: 6000, amount: 6000, taxRate: '13%', taxAmount: 780 },
          { name: '水费', quantity: 1, unitPrice: 2000, amount: 2000, taxRate: '13%', taxAmount: 260 },
        ],
        totalAmount: 9040,
      },
    ],
    entries: [
      {
        subjectCode: '5101',
        summary: '车间水电费',
        debit: 8000.00,
        credit: 0,
        explanation: '制造费用增加记借方。生产车间发生的动力费（水电费）属于制造费用，需归集后分配计入产品成本。',
      },
      {
        subjectCode: '222101',
        summary: '水电费进项税额',
        debit: 1040.00,
        credit: 0,
        explanation: '应交税费-进项税额增加记借方。水电费取得增值税专用发票，进项税额可抵扣。',
      },
      {
        subjectCode: '1002',
        summary: '支付水电费',
        debit: 0,
        credit: 9040.00,
        explanation: '银行存款减少记贷方。支付生产车间水电费。',
      },
    ],
    explanation: '生产车间的水电费属于制造费用（间接生产成本），不能直接计入某一种产品成本，需要先归集到制造费用科目，月末再按照合理的分配标准（如工时比例）分配到各产品中。',
  },

  {
    id: 'evt_16',
    date: '2026-01-10',
    title: '支付研发中心水电费',
    description: '支付研发中心1月上旬水电费2,000元，增值税260元（税率13%），价税合计2,260元以银行存款支付。',
    documents: [
      {
        type: 'invoice',
        title: '增值税专用发票（研发水电费）',
        region: '浙江省',
        invoiceNo: '5500223344',
        buyer: '振华集团制造有限公司',
        seller: '市供电公司',
        lineItems: [{ name: '电费', quantity: 1, unitPrice: 2000, amount: 2000, taxRate: '13%', taxAmount: 260 }],
        totalAmount: 2260,
      },
    ],
    entries: [
      {
        subjectCode: '5301',
        summary: '研发中心水电费',
        debit: 2000.00,
        credit: 0,
        explanation: '研发支出增加记借方。研发部门发生的费用计入研发支出科目，期末判断资本化或费用化。',
      },
      {
        subjectCode: '222101',
        summary: '研发水电费进项税额',
        debit: 260.00,
        credit: 0,
        explanation: '应交税费-进项税额增加记借方。研发中心水电费取得专票，进项税额可抵扣。',
      },
      {
        subjectCode: '1002',
        summary: '支付研发水电费',
        debit: 0,
        credit: 2260.00,
        explanation: '银行存款减少记贷方。支付研发中心水电费。',
      },
    ],
    explanation: '研发支出用于归集企业研究开发活动发生的各项支出。本例中研发中心水电费先归集在5301科目，月末根据研发阶段判断：研究阶段支出全部费用化（计入管理费用），开发阶段符合资本化条件的可计入无形资产成本。',
  },

  {
    id: 'evt_17',
    date: '2026-01-10',
    title: '计提员工工资',
    description: '计提1月份员工工资150,000元。其中：生产工人工资100,000元（计入生产成本），车间管理人员工资12,000元（计入制造费用），研发人员工资20,000元（计入研发支出），销售人员工资8,000元（计入销售费用），行政管理人员工资10,000元（计入管理费用）。',
    documents: [
      {
        type: 'receipt',
        title: '2026年1月工资表',
        content: '生产工人100,000元 车间管理12,000元 研发人员20,000元 销售人员8,000元 行政管理10,000元 合计150,000元',
      },
    ],
    entries: [
      {
        subjectCode: '5001',
        summary: '生产工人工资',
        debit: 100000.00,
        credit: 0,
        explanation: '生产成本增加记借方。生产工人的工资属于直接人工，直接计入生产成本-直接人工。',
      },
      {
        subjectCode: '5101',
        summary: '车间管理人员工资',
        debit: 12000.00,
        credit: 0,
        explanation: '制造费用增加记借方。车间管理人员的工资属于间接人工，先归集到制造费用，月末再分配计入产品成本。',
      },
      {
        subjectCode: '5301',
        summary: '研发人员工资',
        debit: 20000.00,
        credit: 0,
        explanation: '研发支出增加记借方。研发人员的工资计入研发支出，期末根据研发阶段确定资本化或费用化。',
      },
      {
        subjectCode: '6601',
        summary: '销售人员工资',
        debit: 8000.00,
        credit: 0,
        explanation: '销售费用增加记借方。销售人员的工资直接计入销售费用，与销售活动直接相关。',
      },
      {
        subjectCode: '6602',
        summary: '行政人员工资',
        debit: 10000.00,
        credit: 0,
        explanation: '管理费用增加记借方。行政管理人员的工资计入管理费用，属于管理性质的支出。',
      },
      {
        subjectCode: '2211',
        summary: '计提应付职工薪酬',
        debit: 0,
        credit: 150000.00,
        explanation: '应付职工薪酬增加记贷方。计提工资时形成企业对员工的负债，待实际发放时冲减。',
      },
    ],
    explanation: '工资的会计处理分为计提（确认费用和负债）和发放（支付现金）两个环节。不同部门人员的工资计入不同的成本费用科目：生产工人→生产成本（直接人工），车间管理→制造费用（间接人工），研发→研发支出，销售→销售费用，行政→管理费用。这是成本核算中"谁受益谁承担"原则的体现。',
  },

  {
    id: 'evt_18',
    date: '2026-01-10',
    title: '发放员工工资',
    description: '以银行存款发放1月份员工工资150,000元。',
    documents: [
      {
        type: 'bank',
        title: '银行代发工资回单',
        content: '代发工资 人民币壹拾伍万元整 备注：2026年1月工资',
      },
    ],
    entries: [
      {
        subjectCode: '2211',
        summary: '发放应付工资',
        debit: 150000.00,
        credit: 0,
        explanation: '应付职工薪酬减少记借方。实际发放工资后，企业对员工的负债减少。',
      },
      {
        subjectCode: '1002',
        summary: '发放工资',
        debit: 0,
        credit: 150000.00,
        explanation: '银行存款减少记贷方。资金从银行账户划转至员工工资卡，资产流出企业。',
      },
    ],
    explanation: '实际发放工资时冲减应付职工薪酬。如果涉及代扣个人所得税、社保个人部分等，还需贷记应交税费/其他应付款。本例简化处理，按实发工资全额核算。计提和发放两个环节完整展示了"先确认负债，后清偿负债"的全过程。',
  },

  // ═══════════════════════════════════════════
  // 1月11日 — 培训费
  // ═══════════════════════════════════════════
  {
    id: 'evt_19',
    date: '2026-01-11',
    title: '支付员工培训费',
    description: '委托外部培训机构对生产技术人员进行技能培训，支付培训费5,000元，以银行存款支付。',
    documents: [
      {
        type: 'receipt',
        title: '培训费发票',
        content: '生产技能培训 ￥5,000.00 培训单位：卓越管理咨询公司',
      },
    ],
    entries: [
      {
        subjectCode: '6602',
        summary: '员工培训费',
        debit: 5000.00,
        credit: 0,
        explanation: '管理费用增加记借方。员工培训费属于企业人力资源管理支出，计入管理费用。',
      },
      {
        subjectCode: '1002',
        summary: '支付培训费',
        debit: 0,
        credit: 5000.00,
        explanation: '银行存款减少记贷方。支付外部培训费用。',
      },
    ],
    explanation: '员工培训费是企业为提升员工技能发生的教育经费支出，属于管理费用。根据税法规定，企业发生的职工教育经费支出，不超过工资薪金总额8%的部分准予税前扣除。',
  },

  // ═══════════════════════════════════════════
  // 1月12日 — 研发材料 + 委托代销
  // ═══════════════════════════════════════════
  {
    id: 'evt_20',
    date: '2026-01-12',
    title: '支付研发材料费',
    description: '研发中心领用研发用试验材料一批，价款15,000元，增值税1,950元（税率13%），价税合计16,950元以银行存款支付。',
    documents: [
      {
        type: 'invoice',
        title: '增值税专用发票（研发材料）',
        region: '浙江省',
        invoiceNo: '6600112233',
        buyer: '振华集团制造有限公司',
        seller: '科创实验材料有限公司',
        lineItems: [{ name: '研发试验材料', quantity: 1, unitPrice: 15000, amount: 15000, taxRate: '13%', taxAmount: 1950 }],
        totalAmount: 16950,
      },
    ],
    entries: [
      {
        subjectCode: '5301',
        summary: '研发材料费',
        debit: 15000.00,
        credit: 0,
        explanation: '研发支出增加记借方。研发活动领用的材料费用计入研发支出。',
      },
      {
        subjectCode: '222101',
        summary: '研发材料进项税额',
        debit: 1950.00,
        credit: 0,
        explanation: '应交税费-进项税额增加记借方。研发用材料取得增值税专票，进项税额可抵扣。',
      },
      {
        subjectCode: '1002',
        summary: '支付研发材料款',
        debit: 0,
        credit: 16950.00,
        explanation: '银行存款减少记贷方。支付研发材料价款及增值税。',
      },
    ],
    explanation: '研发活动中直接消耗的材料费用计入研发支出。研发支出在期末需判断属于研究阶段还是开发阶段：研究阶段支出全部费用化（转入管理费用），开发阶段符合资本化条件的可确认为无形资产。本例研发项目尚处于研究阶段，期末全部费用化处理。',
  },

  {
    id: 'evt_21',
    date: '2026-01-12',
    title: '委托代销发出商品',
    description: '采用委托代销方式，将一批智能终端产品发给代销商（兴盛商贸公司），成本50,000元。商品发出时不确认收入，待收到代销清单时再确认。',
    documents: [
      {
        type: 'receipt',
        title: '委托代销出库单',
        content: '发出商品-智能终端 成本￥50,000.00 代销商：兴盛商贸公司',
      },
    ],
    entries: [
      {
        subjectCode: '1406',
        summary: '委托代销发出商品',
        debit: 50000.00,
        credit: 0,
        explanation: '发出商品增加记借方。委托代销方式下，商品虽已发出但所有权尚未转移，不确认收入，转入发出商品科目核算。',
      },
      {
        subjectCode: '1405',
        summary: '委托代销发出商品',
        debit: 0,
        credit: 50000.00,
        explanation: '库存商品减少记贷方。商品从仓库发出，库存商品减少，转入发出商品科目。',
      },
    ],
    explanation: '委托代销是一种特殊的销售方式。商品发出时，风险和报酬并未转移，不能确认收入。发出商品仍属于企业的存货，只是从"库存商品"转入"发出商品"科目。待收到代销商的代销清单时，再确认收入并结转成本。',
  },

  // ═══════════════════════════════════════════
  // 1月14日 — 运输费
  // ═══════════════════════════════════════════
  {
    id: 'evt_22',
    date: '2026-01-14',
    title: '支付产品运输费',
    description: '支付销售产品的运输费3,000元，以银行存款支付。',
    documents: [
      {
        type: 'receipt',
        title: '运输费发票',
        content: '产品运输费 ￥3,000.00 运输单位：顺达物流公司',
      },
    ],
    entries: [
      {
        subjectCode: '6601',
        summary: '产品运输费',
        debit: 3000.00,
        credit: 0,
        explanation: '销售费用增加记借方。销售产品发生的运输费属于销售费用，是销售活动的必要支出。',
      },
      {
        subjectCode: '1002',
        summary: '支付运输费',
        debit: 0,
        credit: 3000.00,
        explanation: '银行存款减少记贷方。支付运输费用。',
      },
    ],
    explanation: '销售过程中发生的运输费、装卸费等，属于销售费用。一般纳税人取得运输发票可按9%税率抵扣进项税额，本例简化未涉及增值税处理。',
  },

  // ═══════════════════════════════════════════
  // 1月15日 — 费用支付 + 还款
  // ═══════════════════════════════════════════
  {
    id: 'evt_23',
    date: '2026-01-15',
    title: '支付广告宣传费',
    description: '支付产品广告宣传费20,000元，以银行存款支付。广告在行业媒体投放，用于推广电子元器件和智能终端产品。',
    documents: [
      {
        type: 'receipt',
        title: '广告费发票',
        content: '行业媒体广告投放 ￥20,000.00 广告公司：云帆传媒有限公司',
      },
    ],
    entries: [
      {
        subjectCode: '6601',
        summary: '广告宣传费',
        debit: 20000.00,
        credit: 0,
        explanation: '销售费用增加记借方。产品广告费属于销售费用中的市场推广支出。',
      },
      {
        subjectCode: '1002',
        summary: '支付广告费',
        debit: 0,
        credit: 20000.00,
        explanation: '银行存款减少记贷方。支付广告费用。',
      },
    ],
    explanation: '广告宣传费是企业为推广产品、提升品牌知名度发生的支出，属于销售费用。企业所得税法规定，广告费不超过当年销售收入15%的部分准予税前扣除，超过部分可结转以后年度扣除。',
  },

  {
    id: 'evt_24',
    date: '2026-01-15',
    title: '支付办公费',
    description: '支付公司日常办公费用5,000元，包括办公用品采购、打印耗材、饮用水费等，以银行存款支付。',
    documents: [
      {
        type: 'receipt',
        title: '办公用品采购清单',
        content: '办公用品及耗材 ￥5,000.00',
      },
    ],
    entries: [
      {
        subjectCode: '6602',
        summary: '办公费',
        debit: 5000.00,
        credit: 0,
        explanation: '管理费用增加记借方。公司日常办公费属于管理性质的支出，计入管理费用。',
      },
      {
        subjectCode: '1002',
        summary: '支付办公费',
        debit: 0,
        credit: 5000.00,
        explanation: '银行存款减少记贷方。支付办公费用。',
      },
    ],
    explanation: '办公费是企业维持日常运营发生的综合性费用，包括办公用品、打印耗材、饮用水、清洁费等。这些费用无法归集到具体产品，作为期间费用计入管理费用。',
  },

  {
    id: 'evt_25',
    date: '2026-01-15',
    title: '偿还前欠货款',
    description: '以银行存款偿还之前欠华美包装的材料货款56,500元（含增值税）。',
    documents: [
      {
        type: 'bank',
        title: '银行付款回单',
        content: '付款金额：人民币伍万陆仟伍佰元整 收款方：华美包装材料有限公司 摘要：付材料款',
      },
    ],
    entries: [
      {
        subjectCode: '2202',
        summary: '偿还应付账款',
        debit: 56500.00,
        credit: 0,
        explanation: '应付账款减少记借方。偿还前欠货款后，企业对供应商的负债减少。',
      },
      {
        subjectCode: '1002',
        summary: '偿还应付账款',
        debit: 0,
        credit: 56500.00,
        explanation: '银行存款减少记贷方。资金流出企业用于偿还债务。',
      },
    ],
    explanation: '这笔业务与1月5日的赊购（evt_07）对应，完整展示了赊购→付款的全过程。1月5日赊购包装材料形成应付账款56,500元，今日偿还后该笔债务清零。短期负债的及时偿还有助于维护企业良好的信用记录。',
  },

  // ═══════════════════════════════════════════
  // 1月16日 — 收货款
  // ═══════════════════════════════════════════
  {
    id: 'evt_26',
    date: '2026-01-16',
    title: '收到B客户货款',
    description: '收到百川电子（B客户）偿还的前欠货款339,000元。',
    documents: [
      {
        type: 'bank',
        title: '银行收款回单',
        content: '收款金额：人民币叁拾叁万玖仟元整 付款人：百川电子有限公司 摘要：付货款',
      },
    ],
    entries: [
      {
        subjectCode: '1002',
        summary: '收到B客户货款',
        debit: 339000.00,
        credit: 0,
        explanation: '银行存款增加记借方。收回前欠货款，资金流入企业。',
      },
      {
        subjectCode: '1122',
        summary: '收到B客户货款',
        debit: 0,
        credit: 339000.00,
        explanation: '应收账款减少记贷方。客户偿还欠款后，企业应收的债权减少。',
      },
    ],
    explanation: '这笔业务与1月8日的赊销（evt_13）对应，完整展示了赊销→回款的全过程。1月8日向百川电子赊销智能终端形成应收账款339,000元，今日收回后该笔债权清零。及时回款是保障企业现金流的重要环节。',
  },

  // ═══════════════════════════════════════════
  // 1月18日 — 委托代销售出
  // ═══════════════════════════════════════════
  {
    id: 'evt_27',
    date: '2026-01-18',
    title: '委托代销商品售出（收入确认）',
    description: '收到代销商兴盛商贸公司的代销清单，委托代销的智能终端已售出。售价80,000元，增值税10,400元（税率13%），价税合计90,400元已收存银行。',
    documents: [
      {
        type: 'invoice',
        title: '增值税专用发票（代销结算）',
        region: '浙江省',
        invoiceNo: '4400334455',
        buyer: '兴盛商贸有限公司',
        seller: '振华集团制造有限公司',
        lineItems: [{ name: '智能终端设备', quantity: 1, unitPrice: 80000, amount: 80000, taxRate: '13%', taxAmount: 10400 }],
        totalAmount: 90400,
      },
      {
        type: 'receipt',
        title: '代销清单',
        content: '兴盛商贸本月销售智能终端一批 售价￥80,000 代销数量已确认',
      },
    ],
    entries: [
      {
        subjectCode: '1002',
        summary: '收到代销货款',
        debit: 90400.00,
        credit: 0,
        explanation: '银行存款增加记借方。代销商品已售出，货款已收存银行。',
      },
      {
        subjectCode: '6001',
        summary: '确认代销商品收入',
        debit: 0,
        credit: 80000.00,
        explanation: '主营业务收入增加记贷方。收到代销清单后，满足收入确认条件，按售价确认收入。',
      },
      {
        subjectCode: '222102',
        summary: '确认代销销项税额',
        debit: 0,
        credit: 10400.00,
        explanation: '应交税费-销项税额增加记贷方。代销商品售出后按13%计提销项税额。',
      },
    ],
    explanation: '委托代销商品在收到代销清单时才满足收入确认条件。这笔业务与1月12日的发出商品（evt_21）对应，完整展示了委托代销的全流程：发出商品时不确认收入→收到代销清单时确认收入并产生纳税义务。',
  },

  {
    id: 'evt_28',
    date: '2026-01-18',
    title: '结转代销商品销售成本',
    description: '结转已售代销商品的成本50,000元。',
    entries: [
      {
        subjectCode: '6401',
        summary: '结转代销商品成本',
        debit: 50000.00,
        credit: 0,
        explanation: '主营业务成本增加记借方。已售代销商品的成本转入当期损益。',
      },
      {
        subjectCode: '1406',
        summary: '结转代销商品成本',
        debit: 0,
        credit: 50000.00,
        explanation: '发出商品减少记贷方。代销商品已售出，发出商品减少。',
      },
    ],
    explanation: '确认代销收入的同时，需配比结转相应的销售成本。代销商品的成本在发出时（evt_21）从库存商品转入发出商品（1406），售出时从发出商品转入主营业务成本（6401）。代销毛利率为37.5%（(80,000-50,000)/80,000）。',
  },

  // ═══════════════════════════════════════════
  // 1月19日 — 通讯费
  // ═══════════════════════════════════════════
  {
    id: 'evt_29',
    date: '2026-01-19',
    title: '支付通讯费',
    description: '支付公司电话费、网络费等通讯费用2,000元，以银行存款支付。',
    documents: [
      {
        type: 'receipt',
        title: '通讯费发票',
        content: '电话费￥800 网络费￥1,200 合计￥2,000.00',
      },
    ],
    entries: [
      {
        subjectCode: '6602',
        summary: '通讯费',
        debit: 2000.00,
        credit: 0,
        explanation: '管理费用增加记借方。公司办公通讯费属于管理性质的日常支出。',
      },
      {
        subjectCode: '1002',
        summary: '支付通讯费',
        debit: 0,
        credit: 2000.00,
        explanation: '银行存款减少记贷方。支付通讯费用。',
      },
    ],
    explanation: '通讯费是企业日常运营中不可或缺的费用，包括固定电话费、移动电话费、网络费等。这些费用与行政管理活动相关，计入管理费用。',
  },

  // ═══════════════════════════════════════════
  // 1月20日 — 长期投资
  // ═══════════════════════════════════════════
  {
    id: 'evt_30',
    date: '2026-01-20',
    title: '长期股权投资',
    description: '投资200,000元设立一家全资子公司（振华电子销售有限公司），持有100%股权，款项以银行存款支付。',
    documents: [
      {
        type: 'receipt',
        title: '投资协议',
        content: '振华集团出资￥200,000设立全资子公司振华电子销售有限公司，持股比例100%',
      },
      {
        type: 'bank',
        title: '银行付款回单',
        content: '付款金额：人民币贰拾万元整 收款方：振华电子销售有限公司（验资户） 摘要：投资款',
      },
    ],
    entries: [
      {
        subjectCode: '1511',
        summary: '对子公司长期股权投资',
        debit: 200000.00,
        credit: 0,
        explanation: '长期股权投资增加记借方。企业对外投资设立子公司，形成长期股权投资。',
      },
      {
        subjectCode: '1002',
        summary: '支付投资款',
        debit: 0,
        credit: 200000.00,
        explanation: '银行存款减少记贷方。投资款项支付后，资金流出企业。',
      },
    ],
    explanation: '长期股权投资是企业通过投资取得被投资单位股权的行为。本例中振华集团出资设立全资子公司，持股100%，能够对子公司实施控制，属于成本法核算的长期股权投资。子公司独立纳税，独立核算。',
  },

  // ═══════════════════════════════════════════
  // 1月22日 — 租金收入
  // ═══════════════════════════════════════════
  {
    id: 'evt_31',
    date: '2026-01-22',
    title: '收到厂房租金收入',
    description: '出租部分闲置厂房给第三方公司，收到1月份租金10,000元，增值税900元（税率9%），价税合计10,900元已收存银行。',
    documents: [
      {
        type: 'invoice',
        title: '增值税专用发票（租赁服务）',
        region: '浙江省',
        invoiceNo: '7700112233',
        buyer: '宏远物流有限公司',
        seller: '振华集团制造有限公司',
        lineItems: [{ name: '厂房租赁服务（1月份）', quantity: 1, unitPrice: 10000, amount: 10000, taxRate: '9%', taxAmount: 900 }],
        totalAmount: 10900,
      },
      {
        type: 'bank',
        title: '银行收款回单',
        content: '收款金额：人民币壹万零玖佰元整 付款人：宏远物流有限公司 摘要：1月厂房租金',
      },
    ],
    entries: [
      {
        subjectCode: '1002',
        summary: '收到租金收入',
        debit: 10900.00,
        credit: 0,
        explanation: '银行存款增加记借方。出租闲置资产收到的租金已存入银行。',
      },
      {
        subjectCode: '6051',
        summary: '确认其他业务收入',
        debit: 0,
        credit: 10000.00,
        explanation: '其他业务收入增加记贷方。出租资产取得的租金收入属于非主营业务收入。',
      },
      {
        subjectCode: '222102',
        summary: '确认租赁销项税额',
        debit: 0,
        credit: 900.00,
        explanation: '应交税费-销项税额增加记贷方。不动产租赁服务按9%税率计提销项税额。',
      },
    ],
    explanation: '出租闲置厂房取得的租金收入属于企业的其他业务收入（非主营业务）。不动产租赁服务增值税税率为9%。其他业务收入对应的成本（如出租厂房的折旧、摊销等）需另行结转。',
  },

  // ═══════════════════════════════════════════
  // 1月23日 — 办公用品（现金）
  // ═══════════════════════════════════════════
  {
    id: 'evt_32',
    date: '2026-01-23',
    title: '购买办公用品（现金支付）',
    description: '用库存现金购买办公用品一批（文具、纸张等），金额800元，用于公司日常办公。',
    documents: [
      {
        type: 'receipt',
        title: '办公用品购买清单',
        content: '文具纸张等 ￥800.00 现金支付',
      },
    ],
    entries: [
      {
        subjectCode: '6602',
        summary: '办公用品支出',
        debit: 800.00,
        credit: 0,
        explanation: '管理费用增加记借方。日常办公用品的消耗计入管理费用。',
      },
      {
        subjectCode: '1001',
        summary: '现金支付办公用品',
        debit: 0,
        credit: 800.00,
        explanation: '库存现金减少记贷方。使用备用金支付日常小额支出。',
      },
    ],
    explanation: '企业日常办公过程中持续发生的小额办公用品支出，是管理费用中常见的组成部分。使用备用金现金支付，体现了备用金"用于日常小额零星支出"的用途。',
  },

  // ═══════════════════════════════════════════
  // 1月25日 — 差旅费
  // ═══════════════════════════════════════════
  {
    id: 'evt_33',
    date: '2026-01-25',
    title: '报销差旅费',
    description: '销售人员报销赴外地客户拜访产生的差旅费3,000元（含交通费2,000元、住宿费1,000元），以现金支付报销款。',
    documents: [
      {
        type: 'receipt',
        title: '差旅费报销单',
        content: '交通费￥2,000 住宿费￥1,000 合计￥3,000',
      },
    ],
    entries: [
      {
        subjectCode: '6602',
        summary: '报销差旅费',
        debit: 3000.00,
        credit: 0,
        explanation: '管理费用增加记借方。差旅费属于管理性质的费用支出。',
      },
      {
        subjectCode: '1001',
        summary: '现金支付差旅报销',
        debit: 0,
        credit: 3000.00,
        explanation: '库存现金减少记贷方。以现金支付报销款，备用金减少。',
      },
    ],
    explanation: '员工因公出差发生的交通费、住宿费等属于差旅费，计入管理费用。差旅费报销需附有合规的交通票据和住宿发票，企业内部需建立差旅费报销制度和标准。',
  },

  // ═══════════════════════════════════════════
  // 1月26日 — 银行手续费
  // ═══════════════════════════════════════════
  {
    id: 'evt_34',
    date: '2026-01-26',
    title: '支付银行手续费',
    description: '银行扣收1月份账户管理费、转账手续费等共计500元。',
    documents: [
      {
        type: 'bank',
        title: '银行扣款回单',
        content: '账户管理费￥200 转账手续费￥300 合计￥500.00',
      },
    ],
    entries: [
      {
        subjectCode: '6603',
        summary: '银行手续费',
        debit: 500.00,
        credit: 0,
        explanation: '财务费用增加记借方。银行手续费属于财务费用，是企业为筹集和使用资金发生的费用。',
      },
      {
        subjectCode: '1002',
        summary: '银行扣手续费',
        debit: 0,
        credit: 500.00,
        explanation: '银行存款减少记贷方。银行直接从账户扣划手续费。',
      },
    ],
    explanation: '财务费用是指企业为筹集和使用生产经营资金而发生的费用，包括银行手续费、利息支出、汇兑损益等。银行手续费虽然单笔金额不大，但每月都会发生，需及时入账。',
  },

  // ═══════════════════════════════════════════
  // 1月28日 — 出售闲置材料
  // ═══════════════════════════════════════════
  {
    id: 'evt_35',
    date: '2026-01-28',
    title: '出售闲置材料（收入确认）',
    description: '将部分闲置的电子元器件原材料出售，售价20,000元，增值税2,600元（税率13%），价税合计22,600元已收存银行。',
    documents: [
      {
        type: 'invoice',
        title: '增值税专用发票（销售材料）',
        region: '浙江省',
        invoiceNo: '4400556677',
        buyer: '新创电子有限公司',
        seller: '振华集团制造有限公司',
        lineItems: [{ name: '电子元器件（原材料）', quantity: 1, unitPrice: 20000, amount: 20000, taxRate: '13%', taxAmount: 2600 }],
        totalAmount: 22600,
      },
    ],
    entries: [
      {
        subjectCode: '1002',
        summary: '收到出售材料款',
        debit: 22600.00,
        credit: 0,
        explanation: '银行存款增加记借方。出售原材料收到的款项（含税）已存入银行。',
      },
      {
        subjectCode: '6051',
        summary: '确认原材料销售收入',
        debit: 0,
        credit: 20000.00,
        explanation: '其他业务收入增加记贷方。出售原材料属于非主营业务，计入其他业务收入。',
      },
      {
        subjectCode: '222102',
        summary: '确认销项税额',
        debit: 0,
        credit: 2600.00,
        explanation: '应交税费-销项税额增加记贷方。销售原材料按13%税率计提销项税额。',
      },
    ],
    explanation: '企业出售原材料（非自产产品）取得的收入属于其他业务收入，而非主营业务收入。这是因为出售原材料不是企业的日常经营活动，而是处置多余材料的行为。对应的原材料成本需另行结转。',
  },

  {
    id: 'evt_36',
    date: '2026-01-28',
    title: '结转出售材料成本',
    description: '结转已售电子元器件的原材料成本15,000元。',
    entries: [
      {
        subjectCode: '6402',
        summary: '结转原材料销售成本',
        debit: 15000.00,
        credit: 0,
        explanation: '其他业务成本增加记借方。已售原材料的成本计入其他业务成本，与其他业务收入配比。',
      },
      {
        subjectCode: '1403',
        summary: '结转原材料销售成本',
        debit: 0,
        credit: 15000.00,
        explanation: '原材料减少记贷方。原材料售出后，原材料库存减少。',
      },
    ],
    explanation: '其他业务收入与其他业务成本应当配比。出售原材料的毛利润率为25%（(20,000-15,000)/20,000）。这笔业务与evt_35共同构成完整的原材料出售核算。',
  },

  // ═══════════════════════════════════════════
  // 1月29日 — 坏账准备
  // ═══════════════════════════════════════════
  {
    id: 'evt_37',
    date: '2026-01-29',
    title: '计提坏账准备',
    description: '月末按应收账款余额的5‰计提坏账准备。本月应收账款余额300,000元，应计提坏账准备=300,000×5‰=1,500元。',
    entries: [
      {
        subjectCode: '6602',
        summary: '计提坏账准备',
        debit: 1500.00,
        credit: 0,
        explanation: '管理费用增加记借方（小企业会计准则）或信用减值损失（企业会计准则）。本例简化计入管理费用。',
      },
      {
        subjectCode: '1231',
        summary: '计提坏账准备',
        debit: 0,
        credit: 1500.00,
        explanation: '坏账准备增加记贷方。坏账准备是应收账款的备抵科目，反映应收账款预计可能发生的坏账损失。',
      },
    ],
    explanation: '坏账准备是企业按照谨慎性原则，对可能无法收回的应收账款预先计提的损失准备。本例采用应收账款余额百分比法，按余额的5‰（0.5%）计提。计提坏账准备体现了会计的谨慎性原则：不高估资产，不低估费用。',
  },

  // ═══════════════════════════════════════════
  // 1月30日 — 现金盘点
  // ═══════════════════════════════════════════
  {
    id: 'evt_38',
    date: '2026-01-30',
    title: '库存现金盘点发现短缺',
    description: '月末对库存现金进行盘点，发现账面余额比实际库存多出200元，属于现金短缺，原因待查。先通过待处理财产损溢科目核算。',
    documents: [
      {
        type: 'receipt',
        title: '库存现金盘点表',
        content: '账面余额：6,000元 实盘金额：5,800元 短缺：200元',
      },
    ],
    entries: [
      {
        subjectCode: '1901',
        summary: '现金短缺待查',
        debit: 200.00,
        credit: 0,
        explanation: '待处理财产损溢增加记借方。现金盘点短缺在查明原因前先通过待处理财产损溢科目核算。',
      },
      {
        subjectCode: '1001',
        summary: '现金短缺待查',
        debit: 0,
        credit: 200.00,
        explanation: '库存现金减少记贷方。实际盘点现金比账面少200元。',
      },
    ],
    explanation: '库存现金每月末必须进行盘点，核对账实是否相符。发现短缺时，在查明原因之前先通过"待处理财产损溢"科目挂账，待查明原因后再做相应处理。现金短缺的可能原因有：记账差错、出纳失误、被盗等。',
  },

  {
    id: 'evt_39',
    date: '2026-01-30',
    title: '现金短缺核销处理',
    description: '经查明，上述现金短缺200元属于出纳人员工作失误所致，但因金额较小，经管理层批准予以核销，计入管理费用。',
    entries: [
      {
        subjectCode: '6602',
        summary: '现金短缺核销',
        debit: 200.00,
        credit: 0,
        explanation: '管理费用增加记借方。经批准核销的现金短缺计入管理费用（管理不善原因）。',
      },
      {
        subjectCode: '1901',
        summary: '现金短缺核销',
        debit: 0,
        credit: 200.00,
        explanation: '待处理财产损溢减少记贷方。原因查明并处理后，冲减待处理财产损溢科目。',
      },
    ],
    explanation: '现金短缺查明原因后需做相应处理：属于出纳人员责任的应向责任人索赔（借记其他应收款），属于管理不善的计入管理费用，属于被盗的计入营业外支出。本例金额较小，经批准直接核销计入管理费用。',
  },

  // ═══════════════════════════════════════════
  // 1月31日 — 期末调整（摊销/折旧/制造费用分配/完工入库/研发费用化/税费/所得税）
  // ═══════════════════════════════════════════
  {
    id: 'evt_40',
    date: '2026-01-31',
    title: '摊销本月厂房租金',
    description: '摊销1月份应承担的厂房租金10,000元（预付全年租金120,000÷12个月）。厂房主要用于生产车间，摊销金额计入制造费用。',
    entries: [
      {
        subjectCode: '5101',
        summary: '摊销本月厂房租金',
        debit: 10000.00,
        credit: 0,
        explanation: '制造费用增加记借方。生产用厂房的租金摊销计入制造费用，是间接生产成本的一部分。',
      },
      {
        subjectCode: '1123',
        summary: '摊销本月厂房租金',
        debit: 0,
        credit: 10000.00,
        explanation: '预付账款减少记贷方。随着时间推移，预付的租金逐步摊销，预付资产减少。',
      },
    ],
    explanation: '预付全年租金120,000元，受益期为12个月，每月摊销10,000元。1月份使用厂房，即需摊销1/12的预付租金。厂房主要用于生产，故摊销金额计入制造费用。剩余110,000元仍挂在预付账款科目，在后续月份继续摊销。',
  },

  {
    id: 'evt_41',
    date: '2026-01-31',
    title: '计提固定资产折旧',
    description: '计提本月生产设备折旧。设备原值200,000元，预计净残值率5%（残值10,000元），使用年限10年（120个月）。月折旧额=(200,000-10,000)÷120=1,583.33元。',
    entries: [
      {
        subjectCode: '5101',
        summary: '计提设备折旧',
        debit: 1583.33,
        credit: 0,
        explanation: '制造费用增加记借方。生产用固定资产的折旧费计入制造费用，是间接生产成本。',
      },
      {
        subjectCode: '1602',
        summary: '计提设备折旧',
        debit: 0,
        credit: 1583.33,
        explanation: '累计折旧增加记贷方。累计折旧反映固定资产已损耗的价值，是固定资产的备抵科目。',
      },
    ],
    explanation: '折旧是将固定资产的成本在其使用寿命内系统分摊的过程。本例采用最常用的直线法（平均年限法）：月折旧额=(原值-预计净残值)÷预计使用月数。设备原值200,000元，残值10,000元，使用120个月，每月折旧1,583.33元。生产设备折旧计入制造费用。',
  },

  {
    id: 'evt_42',
    date: '2026-01-31',
    title: '归集并分配制造费用',
    description: '将本月归集的制造费用总额31,583.33元转入生产成本。制造费用明细：车间水电费8,000+车间管理人员工资12,000+厂房租金摊销10,000+设备折旧1,583.33=31,583.33元。在两个生产车间之间按直接人工工时比例分配（本例简化全部转入生产成本）。',
    entries: [
      {
        subjectCode: '5001',
        summary: '分配制造费用转入生产成本',
        debit: 31583.33,
        credit: 0,
        explanation: '生产成本增加记借方。制造费用是间接生产成本，月末需分配计入各产品的生产成本中。',
      },
      {
        subjectCode: '5101',
        summary: '结转制造费用',
        debit: 0,
        credit: 31583.33,
        explanation: '制造费用减少记贷方。制造费用归集完成后全部结转至生产成本，制造费用科目月末无余额。',
      },
    ],
    explanation: '制造费用是生产过程中发生的间接生产成本（不能直接归属于某一种产品），包括车间管理人员工资、水电费、折旧费、租金等。月末需将归集的制造费用按合理的分配标准（如直接人工工时、机器工时、材料成本等）分配计入各产品的生产成本。本例制造费用总额31,583.33元全部转入生产成本。',
  },

  {
    id: 'evt_43',
    date: '2026-01-31',
    title: '完工产品入库',
    description: '本月生产产品全部完工验收入库。生产成本总额=直接材料260,000+直接人工100,000+制造费用31,583.33=391,583.33元。',
    documents: [
      {
        type: 'receipt',
        title: '完工产品入库单',
        content: '电子元器件产品 + 智能终端产品 合计生产成本￥391,583.33 已全部完工入库',
      },
    ],
    entries: [
      {
        subjectCode: '1405',
        summary: '完工产品成本结转',
        debit: 391583.33,
        credit: 0,
        explanation: '库存商品增加记借方。完工产品的生产成本从生产成本科目转入库存商品，形成可供销售的产品存货。',
      },
      {
        subjectCode: '5001',
        summary: '完工产品成本结转',
        debit: 0,
        credit: 391583.33,
        explanation: '生产成本减少记贷方。完工验收入库后，生产成本科目的余额（在产品成本）结转至库存商品。',
      },
    ],
    explanation: '完工产品入库是制造业成本核算的终点。本月生产成本总额=直接材料（一车间150,000+二车间110,000=260,000）+直接人工（生产工人工资100,000）+制造费用（31,583.33）=391,583.33元。产品完工后，这些成本从"生产成本"科目转入"库存商品"科目，等待销售。生产成本科目月末应无余额（假设无在产品）。',
  },

  {
    id: 'evt_44',
    date: '2026-01-31',
    title: '研发支出费用化结转',
    description: '本月研发支出37,000元（研发人员工资20,000+研发水电费2,000+研发材料费15,000）全部属于研究阶段支出，结转至管理费用。',
    entries: [
      {
        subjectCode: '6602',
        summary: '研发费用化支出结转',
        debit: 37000.00,
        credit: 0,
        explanation: '管理费用增加记借方。研究阶段的研发支出全部费用化，计入管理费用-研发费用。',
      },
      {
        subjectCode: '5301',
        summary: '研发费用化支出结转',
        debit: 0,
        credit: 37000.00,
        explanation: '研发支出减少记贷方。研究阶段支出结转至管理费用后，研发支出科目余额归零。',
      },
    ],
    explanation: '企业内部研发活动分为研究阶段和开发阶段。研究阶段（探索性活动）的支出全部费用化，计入当期管理费用。开发阶段（将研究成果应用于具体产品）的支出，符合资本化条件的可确认为无形资产。本例研发项目尚处于研究阶段，全部费用化处理，体现了会计的谨慎性原则。',
  },

  {
    id: 'evt_45',
    date: '2026-01-31',
    title: '摊销无形资产',
    description: '计提本月非专利技术摊销额。非专利技术原值50,000元，预计使用10年（120个月），月摊销额=50,000÷120=416.67元。',
    entries: [
      {
        subjectCode: '6602',
        summary: '无形资产摊销',
        debit: 416.67,
        credit: 0,
        explanation: '管理费用增加记借方。无形资产的摊销额计入管理费用，在受益期内分期确认。',
      },
      {
        subjectCode: '1702',
        summary: '无形资产摊销',
        debit: 0,
        credit: 416.67,
        explanation: '累计摊销增加记贷方。累计摊销是无形资产的备抵科目，反映无形资产已摊销的价值。',
      },
    ],
    explanation: '无形资产和固定资产类似，其成本需要在预计使用年限内系统分摊。本例非专利技术使用直线法摊销，月摊销额=50,000元÷120个月≈416.67元。累计摊销科目反映无形资产累计已摊销金额，在资产负债表中作为无形资产的抵减项列示。',
  },

  {
    id: 'evt_46',
    date: '2026-01-31',
    title: '结转应交增值税',
    description: '月末结转本月应交增值税。销项税额合计78,900元，进项税额合计74,750元，应交增值税=78,900-74,750=4,150元。将销项和进项余额结转到"转出未交增值税"科目。',
    entries: [
      {
        subjectCode: '222102',
        summary: '结转销项税额',
        debit: 78900.00,
        credit: 0,
        explanation: '销项税额转出记借方。月末将销项税额明细科目余额转出，用于计算应交增值税。',
      },
      {
        subjectCode: '222101',
        summary: '结转进项税额',
        debit: 0,
        credit: 74750.00,
        explanation: '进项税额转出记贷方。月末将进项税额明细科目余额转出，用于计算应交增值税。',
      },
      {
        subjectCode: '222106',
        summary: '转出未交增值税',
        debit: 0,
        credit: 4150.00,
        explanation: '转出未交增值税增加记贷方。销项税额大于进项税额的差额即为本月应交未交增值税。',
      },
    ],
    explanation: '增值税结转是月末的重要步骤。本月销项税额78,900元（销售元器件26,000+销售终端39,000+委托代销10,400+租金收入900+出售材料2,600），进项税额74,750元（设备26,000+材料现购39,000+材料赊购6,500+车间水电1,040+研发水电260+研发材料1,950），差额4,150元为应交增值税。结转分录将增值税明细科目余额清零，并将应交未交增值税转入转出未交增值税明细科目，待下月申报缴纳。',
  },

  {
    id: 'evt_47',
    date: '2026-01-31',
    title: '计提城建税及教育费附加',
    description: '按实际应交增值税的12%计提城建税（7%）、教育费附加（3%）和地方教育附加（2%）。附加税额=4,150×12%=498.00元。',
    entries: [
      {
        subjectCode: '6403',
        summary: '计提城建税及附加',
        debit: 498.00,
        credit: 0,
        explanation: '税金及附加增加记借方。城建税和教育费附加是附加在增值税之上的税费，计入税金及附加科目。',
      },
      {
        subjectCode: '222120',
        summary: '计提城建税及附加',
        debit: 0,
        credit: 498.00,
        explanation: '应交税费-城建税及附加增加记贷方。计提的附加税形成对税务局的负债，待实际缴纳时冲减。',
      },
    ],
    explanation: '城建税（7%）、教育费附加（3%）、地方教育附加（2%）是以实际缴纳的增值税为计税依据的附加税费，合计附加税率为12%。本月应交增值税4,150元，附加税=4,150×12%=498.00元。这些税费计入"税金及附加"科目，在利润表中作为营业税费列示。',
  },

  {
    id: 'evt_48',
    date: '2026-01-31',
    title: '计提所得税费用',
    description: '按应纳税所得额的25%计提本月所得税费用。',
    entries: [
      {
        subjectCode: '6801',
        summary: '计提所得税费用',
        debit: 37021.33,
        credit: 0,
        explanation: '所得税费用增加记借方。所得税费用是企业根据税法规定应缴纳的所得税，在利润表中列示。',
      },
      {
        subjectCode: '222104',
        summary: '计提应交所得税',
        debit: 0,
        credit: 37021.33,
        explanation: '应交税费-应交所得税增加记贷方。计提的所得税形成对税务局的负债。',
      },
    ],
    explanation: '本月利润总额计算如下：主营业务收入580,000元+其他业务收入30,000元=收入合计610,000元；主营业务成本350,000元+其他业务成本15,000元+税金及附加498元+销售费用31,000元+管理费用64,916.67元+财务费用500元=费用合计461,914.67元；利润总额=610,000-461,914.67=148,085.33元；所得税费用=148,085.33×25%=37,021.33元（假设无纳税调整事项）。净利润=148,085.33-37,021.33=111,064.00元。',
  },
]

export default {
  id: 'large_group',
  companyInfo: {
    name: '振华集团制造有限公司',
    shortName: '振华集团',
    taxType: '一般纳税人',
    taxRate: '13%',
    accountingSystem: '企业会计准则',
    industry: '制造业',
    address: '振华科技园88号',
    description: '振华集团是一家综合性电子制造企业，拥有两个生产分厂（电子元器件分厂和成品组装分厂）和一个研发中心。主要产品包括电子元器件和智能终端设备，月产能约10,000件。公司员工200人，其中生产工人120人、车间管理15人、研发人员20人、销售人员25人、行政管理20人。公司设有独立的研发部门，拥有多项专利技术。2026年1月新成立，无期初余额。',
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
