/**
 * 案例：恒达房地产开发有限公司 — 大型房地产企业
 *
 * 企业背景：恒达地产是一家专业从事住宅地产开发的企业，目前在"翡翠湖"住宅项目
 * （占地50亩，规划建设6栋高层住宅）进行开发建设中。公司员工80人
 * （工程管理20人、销售30人、财务行政15人、其他15人）。
 *
 * 会计制度：企业会计准则
 * 纳税人性质：一般纳税人（增值税税率9%，材料采购13%，服务类6%）
 * 成立时间：2026年1月（新成立，无期初余额）
 * 开发项目：翡翠湖住宅项目（规划6栋高层住宅）
 *
 * 共 47 个业务事件，覆盖：资金筹集→土地获取→前期费用→工程建设→材料采购领用→
 * 预售→费用→利息资本化→竣工→交付确认收入→税费→期末结转
 */

const SUBJECTS = [
  // ─── 资产类 ───
  { id: 's-1001', code: '1001', name: '库存现金', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1002', code: '1002', name: '银行存款', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1122', code: '1122', name: '应收账款', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1123', code: '1123', name: '预付账款', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1221', code: '1221', name: '其他应收款', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1403', code: '1403', name: '开发用材料', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1601', code: '1601', name: '固定资产', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1602', code: '1602', name: '累计折旧', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1701', code: '1701', name: '土地使用权', type: 'asset', parentId: null, isLeaf: true },
  { id: 's-1702', code: '1702', name: '累计摊销', type: 'asset', parentId: null, isLeaf: true },

  // ─── 负债类 ───
  { id: 's-2001', code: '2001', name: '短期借款', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-2002', code: '2002', name: '应付债券', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-2202', code: '2202', name: '应付账款', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-2203', code: '2203', name: '预收账款', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-2211', code: '2211', name: '应付职工薪酬', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-222101', code: '222101', name: '应交税费-应交增值税(进项税额)', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-222102', code: '222102', name: '应交税费-应交增值税(销项税额)', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-222103', code: '222103', name: '应交税费-应交增值税(预缴税额)', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-222106', code: '222106', name: '应交税费-应交增值税(转出未交增值税)', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-222120', code: '222120', name: '应交税费-应交城建税及附加', type: 'liability', parentId: null, isLeaf: true },
  { id: 's-2241', code: '2241', name: '其他应付款', type: 'liability', parentId: null, isLeaf: true },

  // ─── 权益类 ───
  { id: 's-4001', code: '4001', name: '实收资本', type: 'equity', parentId: null, isLeaf: true },
  { id: 's-4002', code: '4002', name: '资本公积', type: 'equity', parentId: null, isLeaf: true },
  { id: 's-4103', code: '4103', name: '本年利润', type: 'equity', parentId: null, isLeaf: true },
  { id: 's-4104', code: '4104', name: '利润分配', type: 'equity', parentId: null, isLeaf: true },

  // ─── 成本类 ───
  { id: 's-5001', code: '5001', name: '开发成本', type: 'cost', parentId: null, isLeaf: true },
  { id: 's-5002', code: '5002', name: '开发产品', type: 'cost', parentId: null, isLeaf: true },

  // ─── 损益类 ───
  { id: 's-6001', code: '6001', name: '主营业务收入', type: 'profit_loss', parentId: null, isLeaf: true },
  { id: 's-6401', code: '6401', name: '主营业务成本', type: 'profit_loss', parentId: null, isLeaf: true },
  { id: 's-6403', code: '6403', name: '税金及附加', type: 'profit_loss', parentId: null, isLeaf: true },
  { id: 's-6601', code: '6601', name: '销售费用', type: 'profit_loss', parentId: null, isLeaf: true },
  { id: 's-6602', code: '6602', name: '管理费用', type: 'profit_loss', parentId: null, isLeaf: true },
  { id: 's-6603', code: '6603', name: '财务费用', type: 'profit_loss', parentId: null, isLeaf: true },
  { id: 's-6801', code: '6801', name: '所得税费用', type: 'profit_loss', parentId: null, isLeaf: true },
]

const OPENING_BALANCES = []  // 新成立企业，无期初余额

const EVENTS = [
  // ═══════════════════════════════════════════
  // 1月2日 — 资金筹集 (Events 01-03)
  // ═══════════════════════════════════════════
  {
    id: 'evt_01',
    date: '2026-01-02',
    title: '收到投资者投资款',
    description: '恒达地产收到各股东投入资本金800万元，其中注册资本500万元，资本溢价300万元。款项中770万元已存入银行账户，另股东作价投入工程车辆一批（皮卡车2辆、商务车1辆），评估价值30万元。',
    documents: [
      {
        type: 'bank',
        title: '银行收款回单',
        content: '收款金额：人民币柒佰柒拾万元整 付款人：各股东 摘要：投资款入账',
      },
      {
        type: 'receipt',
        title: '验资报告摘要',
        content: '恒达房地产开发有限公司注册资本伍佰万元，各股东出资合计捌佰万元（货币资金770万+实物资产30万），超出部分计入资本公积。',
      },
    ],
    entries: [
      { subjectCode: '1002', summary: '收到货币投资款', debit: 7700000.00, credit: 0, explanation: '银行存款增加记借方。投资者投入的货币资金存入银行。' },
      { subjectCode: '1601', summary: '收到实物投资（车辆）', debit: 300000.00, credit: 0, explanation: '固定资产增加记借方。投资者作价投入的车辆作为固定资产核算。' },
      { subjectCode: '4001', summary: '确认注册资本', debit: 0, credit: 5000000.00, explanation: '实收资本增加记贷方。按公司章程确认注册资本500万元。' },
      { subjectCode: '4002', summary: '资本溢价', debit: 0, credit: 3000000.00, explanation: '资本公积增加记贷方。出资超出注册资本的部分属于资本溢价。' },
    ],
    explanation: '企业设立时收到投资者投入资本，超出注册资本的部分形成资本溢价。货币资金770万元和实物资产（车辆）30万元合计800万元。',
  },

  {
    id: 'evt_02',
    date: '2026-01-02',
    title: '借入项目开发贷款',
    description: '为翡翠湖项目开发建设，向工商银行借入项目开发贷款500万元，期限1年，年利率6%，按月付息，到期还本。款项已到账。',
    documents: [
      {
        type: 'bank',
        title: '银行收款回单',
        content: '收款金额：人民币伍佰万元整 付款人：工商银行 摘要：项目开发贷款放款',
      },
      {
        type: 'receipt',
        title: '借款合同摘要',
        content: '借款金额500万元 期限12个月 年利率6% 按月付息 到期还本 贷款用途：翡翠湖项目开发建设',
      },
    ],
    entries: [
      { subjectCode: '1002', summary: '收到开发贷款', debit: 5000000.00, credit: 0, explanation: '银行存款增加记借方。开发贷款已到账。' },
      { subjectCode: '2001', summary: '开发贷款增加', debit: 0, credit: 5000000.00, explanation: '短期借款增加记贷方。1年期项目贷款计入短期借款。' },
    ],
    explanation: '项目开发贷款是企业为房地产开发而向银行借入的专项贷款。本例贷款为1年期，计入短期借款。后续每月计提并支付利息。',
  },

  {
    id: 'evt_03',
    date: '2026-01-02',
    title: '提取备用金',
    description: '出纳从银行提取备用金50,000元，用于公司日常小额零星支出。',
    documents: [
      { type: 'bank', title: '现金支票存根', content: '提取备用金 人民币伍万元整' },
    ],
    entries: [
      { subjectCode: '1001', summary: '提取备用金', debit: 50000.00, credit: 0, explanation: '库存现金增加记借方。备用金用于日常小额开支。' },
      { subjectCode: '1002', summary: '提取备用金', debit: 0, credit: 50000.00, explanation: '银行存款减少记贷方。从银行提取现金。' },
    ],
    explanation: '备用金是为日常零星开支准备的现金。提取备用金时资金从银行存款转入库存现金，资产形态发生变化但总额不变。',
  },

  // ═══════════════════════════════════════════
  // 1月3日 — 土地获取 (Events 04-06)
  // ═══════════════════════════════════════════
  {
    id: 'evt_04',
    date: '2026-01-03',
    title: '支付土地出让金',
    description: '通过招拍挂方式取得翡翠湖项目土地使用权，支付土地出让金3,000,000元，以银行存款支付。该项目占地50亩，规划建设6栋高层住宅。',
    documents: [
      { type: 'receipt', title: '土地使用权出让合同', content: '翡翠湖项目用地 面积50亩 出让金3,000,000元' },
      { type: 'bank', title: '银行付款回单', content: '付款金额：人民币叁佰万元整 收款方：市土地资源局 摘要：土地出让金' },
    ],
    entries: [
      { subjectCode: '5001', summary: '支付土地出让金', debit: 3000000.00, credit: 0, explanation: '开发成本增加记借方。土地出让金计入开发成本-土地征用及拆迁补偿费。' },
      { subjectCode: '1002', summary: '支付土地出让金', debit: 0, credit: 3000000.00, explanation: '银行存款减少记贷方。支付土地出让金。' },
    ],
    explanation: '房地产开发企业的土地成本是开发成本的核心组成部分。通过招拍挂取得的土地使用权，出让金直接计入开发成本，不单独确认为无形资产。',
  },

  {
    id: 'evt_05',
    date: '2026-01-03',
    title: '缴纳契税及印花税',
    description: '缴纳土地出让相关的契税（税率3%）和印花税（税率0.05%）。契税=3,000,000×3%=90,000元，印花税=3,000,000×0.05%=1,500元，合计91,500元以银行存款支付。',
    documents: [
      { type: 'receipt', title: '契税完税凭证', content: '计税金额3,000,000元 税率3% 税额90,000元' },
      { type: 'receipt', title: '印花税完税凭证', content: '计税金额3,000,000元 税率0.05% 税额1,500元' },
    ],
    entries: [
      { subjectCode: '5001', summary: '缴纳契税', debit: 90000.00, credit: 0, explanation: '开发成本增加记借方。契税计入开发成本-土地征用及拆迁补偿费。' },
      { subjectCode: '6602', summary: '缴纳印花税', debit: 1500.00, credit: 0, explanation: '管理费用增加记借方。印花税金额较小计入当期管理费用。' },
      { subjectCode: '1002', summary: '缴纳税费', debit: 0, credit: 91500.00, explanation: '银行存款减少记贷方。支付契税及印花税合计。' },
    ],
    explanation: '取得土地使用权时除支付出让金外，还需缴纳契税（3%）和印花税（0.05%）。契税计入开发成本，印花税因金额较小可计入管理费用。',
  },

  {
    id: 'evt_06',
    date: '2026-01-03',
    title: '购入自用办公楼土地使用权',
    description: '购入公司办公场所（恒达大厦）所在土地的土地使用权，支付转让款500,000元，以银行存款支付。该土地使用权作为无形资产核算，预计使用50年。',
    documents: [
      { type: 'receipt', title: '土地使用权转让合同', content: '恒达大厦办公用地 面积200㎡ 转让价款500,000元 使用年限50年' },
      { type: 'bank', title: '银行付款回单', content: '付款金额：人民币伍拾万元整 收款方：恒达大厦管理公司 摘要：转让款' },
    ],
    entries: [
      { subjectCode: '1701', summary: '购入土地使用权', debit: 500000.00, credit: 0, explanation: '土地使用权增加记借方。自用办公楼的土地使用权作为无形资产核算。' },
      { subjectCode: '1002', summary: '支付转让款', debit: 0, credit: 500000.00, explanation: '银行存款减少记贷方。支付转让价款。' },
    ],
    explanation: '与项目用地不同，企业自用办公楼的土地使用权应作为无形资产核算。后续在50年内分期摊销，摊销额计入管理费用。',
  },

  // ═══════════════════════════════════════════
  // 1月5日 — 前期费用 (Events 07-09)
  // ═══════════════════════════════════════════
  {
    id: 'evt_07',
    date: '2026-01-05',
    title: '支付规划设计费',
    description: '委托市建筑设计院对翡翠湖项目进行规划设计，支付规划设计费500,000元，以银行存款支付。包括总平面图、建筑方案设计、施工图设计等。',
    documents: [
      { type: 'receipt', title: '规划设计合同', content: '翡翠湖项目规划设计 费用500,000元 设计单位：市建筑设计院' },
      { type: 'bank', title: '银行付款回单', content: '付款金额：人民币伍拾万元整 收款方：市建筑设计院 摘要：规划设计费' },
    ],
    entries: [
      { subjectCode: '5001', summary: '支付规划设计费', debit: 500000.00, credit: 0, explanation: '开发成本增加记借方。规划设计费属于开发成本-前期工程费。' },
      { subjectCode: '1002', summary: '支付规划设计费', debit: 0, credit: 500000.00, explanation: '银行存款减少记贷方。支付规划设计费用。' },
    ],
    explanation: '前期工程费是房地产开发成本的重要组成部分，包括规划设计费、勘察费、三通一平费等，全部计入开发成本。',
  },

  {
    id: 'evt_08',
    date: '2026-01-05',
    title: '支付地质勘察费',
    description: '委托市地质工程勘察院对翡翠湖项目地块进行地质勘察，支付勘察费150,000元，以银行存款支付。',
    documents: [
      { type: 'receipt', title: '地质勘察合同', content: '翡翠湖项目地质勘察 费用150,000元 勘察单位：市地质工程勘察院' },
      { type: 'bank', title: '银行付款回单', content: '付款金额：人民币壹拾伍万元整 收款方：市地质工程勘察院 摘要：勘察费' },
    ],
    entries: [
      { subjectCode: '5001', summary: '支付地质勘察费', debit: 150000.00, credit: 0, explanation: '开发成本增加记借方。勘察费属于前期工程费。' },
      { subjectCode: '1002', summary: '支付勘察费', debit: 0, credit: 150000.00, explanation: '银行存款减少记贷方。支付勘察费用。' },
    ],
    explanation: '地质勘察是房地产开发前必须完成的工作，为基础设计和施工提供科学依据。勘察费计入开发成本-前期工程费。',
  },

  {
    id: 'evt_09',
    date: '2026-01-06',
    title: '支付三通一平工程费',
    description: '翡翠湖项目施工前的基础设施配套——三通一平（通水、通电、通路、场地平整）工程，支付工程费800,000元，以银行存款支付。',
    documents: [
      { type: 'receipt', title: '三通一平工程合同', content: '翡翠湖项目三通一平 费用800,000元 施工单位：市基础工程公司' },
      { type: 'bank', title: '银行付款回单', content: '付款金额：人民币捌拾万元整 收款方：市基础工程公司 摘要：三通一平工程费' },
    ],
    entries: [
      { subjectCode: '5001', summary: '支付三通一平工程费', debit: 800000.00, credit: 0, explanation: '开发成本增加记借方。三通一平费属于前期工程费。' },
      { subjectCode: '1002', summary: '支付三通一平费', debit: 0, credit: 800000.00, explanation: '银行存款减少记贷方。支付工程费用。' },
    ],
    explanation: '"三通一平"指通水、通电、通路和场地平整，是项目开工前的必备条件，计入开发成本-前期工程费。',
  },

  // ═══════════════════════════════════════════
  // 1月7日 — 材料采购 (Events 10-11)
  // ═══════════════════════════════════════════
  {
    id: 'evt_10',
    date: '2026-01-07',
    title: '采购建筑材料（第一批）',
    description: '向华强建材公司采购建筑材料一批，其中钢材1,200,000元、水泥800,000元，合计2,000,000元，增值税260,000元（税率13%），价税合计2,260,000元以银行存款支付。材料已验收入库。',
    documents: [
      {
        type: 'invoice', title: '增值税专用发票（钢材水泥）', region: '河北省',
        invoiceNo: '130020260107', buyer: '恒达房地产开发有限公司', seller: '华强建材有限公司',
        lineItems: [
          { name: '螺纹钢HRB400', quantity: 200, unit: '吨', price: 6000, amount: 1200000, taxRate: '13%', taxAmount: 156000 },
          { name: 'PO42.5水泥', quantity: 4000, unit: '吨', price: 200, amount: 800000, taxRate: '13%', taxAmount: 104000 },
        ],
        totalAmount: 2260000,
      },
      { type: 'receipt', title: '材料入库单', content: '钢材200吨 水泥4000吨 入库金额2,000,000元 已验收入库' },
    ],
    entries: [
      { subjectCode: '1403', summary: '采购钢材水泥入库', debit: 2000000.00, credit: 0, explanation: '开发用材料增加记借方。采购的建筑材料按不含税成本入库。' },
      { subjectCode: '222101', summary: '材料进项税额', debit: 260000.00, credit: 0, explanation: '应交税费-进项税额增加记借方。取得增值税专票可抵扣。' },
      { subjectCode: '1002', summary: '支付材料款', debit: 0, credit: 2260000.00, explanation: '银行存款减少记贷方。现购方式下采购与付款同时完成。' },
    ],
    explanation: '房开企业采购建筑材料使用"开发用材料（1403）"科目核算，取得增值税专票的进项税额可抵扣。',
  },

  {
    id: 'evt_11',
    date: '2026-01-08',
    title: '领用建筑材料（第一批）',
    description: '翡翠湖项目主体工程开工，领用钢材和水泥等建筑材料1,800,000元投入建设。',
    documents: [
      { type: 'receipt', title: '工程领料单', content: '领用钢材180吨 水泥3500吨 金额1,800,000元 用于主体工程建设' },
    ],
    entries: [
      { subjectCode: '5001', summary: '领用建筑材料', debit: 1800000.00, credit: 0, explanation: '开发成本增加记借方。材料投入工程建设计入开发成本。' },
      { subjectCode: '1403', summary: '领用建筑材料', debit: 0, credit: 1800000.00, explanation: '开发用材料减少记贷方。材料被工程领用后库存减少。' },
    ],
    explanation: '工程领用材料时，成本从"开发用材料"转入"开发成本-建筑安装工程费"，随工程进度逐步归集到开发成本中。',
  },

  // ═══════════════════════════════════════════
  // 1月9日 — 工程建设 (Events 12-13)
  // ═══════════════════════════════════════════
  {
    id: 'evt_12',
    date: '2026-01-09',
    title: '支付主体工程进度款',
    description: '支付翡翠湖项目主体工程（总包单位：市建工集团）第一批进度款4,000,000元，增值税360,000元（税率9%）。按合同扣留质量保证金200,000元，实际支付4,160,000元。',
    documents: [
      {
        type: 'invoice', title: '增值税专用发票（工程进度款）', region: '河北省',
        invoiceNo: '130020260109', buyer: '恒达房地产开发有限公司', seller: '市建工集团有限公司',
        lineItems: [{ name: '主体工程施工进度款', quantity: 1, unitPrice: 4000000, amount: 4000000, taxRate: '9%', taxAmount: 360000 }],
        totalAmount: 4360000,
      },
      { type: 'bank', title: '银行付款回单', content: '付款金额：肆佰壹拾陆万元整 收款方：市建工集团 摘要：工程进度款（扣留质保金20万）' },
    ],
    entries: [
      { subjectCode: '5001', summary: '主体工程进度款', debit: 4000000.00, credit: 0, explanation: '开发成本增加记借方。主体工程款计入开发成本-建筑安装工程费。' },
      { subjectCode: '222101', summary: '工程进项税额', debit: 360000.00, credit: 0, explanation: '应交税费-进项税额增加记借方。建筑工程服务按9%抵扣进项。' },
      { subjectCode: '1002', summary: '实际支付工程款', debit: 0, credit: 4160000.00, explanation: '银行存款减少记贷方。实际支付金额扣除质保金20万元。' },
      { subjectCode: '2241', summary: '扣留质量保证金', debit: 0, credit: 200000.00, explanation: '其他应付款增加记贷方。扣留的质保金待期满后支付。' },
    ],
    explanation: '工程进度款按合同分期支付，按比例扣留5%质保金。质保金作为其他应付款核算，待竣工验收满一定期限后支付。',
  },

  {
    id: 'evt_13',
    date: '2026-01-09',
    title: '支付基础设施配套工程款',
    description: '支付翡翠湖项目基础设施配套工程款（水、电、气等市政配套），价款800,000元，增值税72,000元（税率9%），价税合计872,000元以银行存款支付。',
    documents: [
      {
        type: 'invoice', title: '增值税专用发票（基础设施配套）', region: '河北省',
        invoiceNo: '130020260110', buyer: '恒达房地产开发有限公司', seller: '市政工程有限公司',
        lineItems: [{ name: '基础设施配套工程', quantity: 1, unitPrice: 800000, amount: 800000, taxRate: '9%', taxAmount: 72000 }],
        totalAmount: 872000,
      },
      { type: 'bank', title: '银行付款回单', content: '付款金额：捌拾柒万贰仟元整 收款方：市政工程有限公司 摘要：基础设施配套费' },
    ],
    entries: [
      { subjectCode: '5001', summary: '基础设施配套费', debit: 800000.00, credit: 0, explanation: '开发成本增加记借方。基础设施配套费计入开发成本-基础设施费。' },
      { subjectCode: '222101', summary: '基础设施进项税额', debit: 72000.00, credit: 0, explanation: '应交税费-进项税额增加记借方。按9%抵扣进项。' },
      { subjectCode: '1002', summary: '支付基础设施款', debit: 0, credit: 872000.00, explanation: '银行存款减少记贷方。支付基础设施配套费用。' },
    ],
    explanation: '基础设施配套费包括水电气暖等市政配套工程，计入开发成本-基础设施费，是住宅项目交付使用的必要条件。',
  },

  // ═══════════════════════════════════════════
  // 1月10日 — 工资 (Events 14-15)
  // ═══════════════════════════════════════════
  {
    id: 'evt_14',
    date: '2026-01-10',
    title: '计提员工工资',
    description: '计提1月份员工工资共计400,000元。其中：工程管理人员工资120,000元（计入开发成本），销售人员工资160,000元（计入销售费用），财务行政人员工资80,000元（计入管理费用），其他人员工资40,000元（计入管理费用）。',
    documents: [
      { type: 'receipt', title: '2026年1月工资表', content: '工程管理120,000元 销售人员160,000元 财务行政80,000元 其他40,000元 合计400,000元' },
    ],
    entries: [
      { subjectCode: '5001', summary: '工程管理人员工资', debit: 120000.00, credit: 0, explanation: '开发成本增加记借方。工程管理人员工资计入开发成本-开发间接费。' },
      { subjectCode: '6601', summary: '销售人员工资', debit: 160000.00, credit: 0, explanation: '销售费用增加记借方。销售人员工资与销售活动直接相关。' },
      { subjectCode: '6602', summary: '行政及其他人员工资', debit: 120000.00, credit: 0, explanation: '管理费用增加记借方。行政及其他人员工资计入管理费用。' },
      { subjectCode: '2211', summary: '计提应付职工薪酬', debit: 0, credit: 400000.00, explanation: '应付职工薪酬增加记贷方。计提工资形成企业对员工的负债。' },
    ],
    explanation: '房开企业的工资分配特殊：直接服务于项目的人员工资计入开发成本-开发间接费，而非管理费用。销售人员工资计入销售费用，行政人员工资计入管理费用。',
  },

  {
    id: 'evt_15',
    date: '2026-01-10',
    title: '发放员工工资',
    description: '以银行存款发放1月份员工工资400,000元。',
    documents: [
      { type: 'bank', title: '银行代发工资回单', content: '代发工资 人民币肆拾万元整 摘要：2026年1月工资' },
    ],
    entries: [
      { subjectCode: '2211', summary: '发放工资', debit: 400000.00, credit: 0, explanation: '应付职工薪酬减少记借方。实际发放后负债减少。' },
      { subjectCode: '1002', summary: '发放工资', debit: 0, credit: 400000.00, explanation: '银行存款减少记贷方。工资通过银行代发。' },
    ],
    explanation: '发放工资时冲减应付职工薪酬。计提（确认费用和负债）和发放（支付现金）是两个独立环节。',
  },

  // ═══════════════════════════════════════════
  // 1月12日 — 费用支付 (Events 16-19)
  // ═══════════════════════════════════════════
  {
    id: 'evt_16',
    date: '2026-01-12',
    title: '支付广告宣传费',
    description: '支付翡翠湖项目广告宣传费250,000元，增值税15,000元（税率6%），价税合计265,000元以银行存款支付。广告投放于本地电视台和户外广告牌。',
    documents: [
      {
        type: 'invoice', title: '增值税专用发票（广告费）', region: '河北省',
        invoiceNo: '130020260112', buyer: '恒达房地产开发有限公司', seller: '盛世传媒有限公司',
        lineItems: [{ name: '翡翠湖项目广告推广服务', quantity: 1, unitPrice: 250000, amount: 250000, taxRate: '6%', taxAmount: 15000 }],
        totalAmount: 265000,
      },
      { type: 'receipt', title: '广告投放合同', content: '翡翠湖住宅项目广告推广 费用250,000元 含电视+户外广告' },
    ],
    entries: [
      { subjectCode: '6601', summary: '广告宣传费', debit: 250000.00, credit: 0, explanation: '销售费用增加记借方。房地产广告费属于市场推广支出。' },
      { subjectCode: '222101', summary: '广告费进项税额', debit: 15000.00, credit: 0, explanation: '应交税费-进项税额增加记借方。广告服务按6%抵扣进项。' },
      { subjectCode: '1002', summary: '支付广告费', debit: 0, credit: 265000.00, explanation: '银行存款减少记贷方。支付广告宣传费用。' },
    ],
    explanation: '房地产项目广告宣传费是销售费用中的重要部分，包括电视广告、户外广告等多种形式，与项目销售直接相关。',
  },

  {
    id: 'evt_17',
    date: '2026-01-12',
    title: '支付办公费',
    description: '支付公司日常办公费用50,000元，增值税6,500元（税率13%），价税合计56,500元以银行存款支付。包括办公用品采购、打印耗材等。',
    documents: [
      {
        type: 'invoice', title: '增值税专用发票（办公用品）', region: '河北省',
        invoiceNo: '130020260113', buyer: '恒达房地产开发有限公司', seller: '晨光办公用品有限公司',
        lineItems: [{ name: '办公用品及耗材一批', quantity: 1, unitPrice: 50000, amount: 50000, taxRate: '13%', taxAmount: 6500 }],
        totalAmount: 56500,
      },
    ],
    entries: [
      { subjectCode: '6602', summary: '办公费', debit: 50000.00, credit: 0, explanation: '管理费用增加记借方。办公费属于管理性质的支出。' },
      { subjectCode: '222101', summary: '办公费进项税额', debit: 6500.00, credit: 0, explanation: '应交税费-进项税额增加记借方。办公用品取得专票可抵扣。' },
      { subjectCode: '1002', summary: '支付办公费', debit: 0, credit: 56500.00, explanation: '银行存款减少记贷方。支付办公费用。' },
    ],
    explanation: '办公费包括办公用品、打印耗材等日常运营支出，作为期间费用计入管理费用。',
  },

  {
    id: 'evt_18',
    date: '2026-01-12',
    title: '报销差旅费',
    description: '工程管理人员出差考察其他楼盘项目，报销差旅费40,000元，以库存现金支付。',
    documents: [
      { type: 'receipt', title: '差旅费报销单', content: '交通费20,000元 住宿费12,000元 餐补8,000元 合计40,000元' },
    ],
    entries: [
      { subjectCode: '6602', summary: '差旅费', debit: 40000.00, credit: 0, explanation: '管理费用增加记借方。出差考察的差旅费计入管理费用。' },
      { subjectCode: '1001', summary: '报销差旅费', debit: 0, credit: 40000.00, explanation: '库存现金减少记贷方。以现金支付报销款。' },
    ],
    explanation: '差旅费是因公出差发生的交通、住宿、餐饮等费用，计入管理费用。',
  },

  {
    id: 'evt_19',
    date: '2026-01-12',
    title: '支付水电费',
    description: '支付公司办公场所1月上旬水电费30,000元，增值税3,900元（税率13%），价税合计33,900元以银行存款支付。',
    documents: [
      {
        type: 'invoice', title: '增值税专用发票（水电费）', region: '河北省',
        invoiceNo: '130020260114', buyer: '恒达房地产开发有限公司', seller: '市供电公司/市自来水公司',
        lineItems: [
          { name: '电费', quantity: 1, unitPrice: 22000, amount: 22000, taxRate: '13%', taxAmount: 2860 },
          { name: '水费', quantity: 1, unitPrice: 8000, amount: 8000, taxRate: '13%', taxAmount: 1040 },
        ],
        totalAmount: 33900,
      },
    ],
    entries: [
      { subjectCode: '6602', summary: '水电费', debit: 30000.00, credit: 0, explanation: '管理费用增加记借方。公司办公场所的水电费计入管理费用。' },
      { subjectCode: '222101', summary: '水电费进项税额', debit: 3900.00, credit: 0, explanation: '应交税费-进项税额增加记借方。水电费取得专票可抵扣。' },
      { subjectCode: '1002', summary: '支付水电费', debit: 0, credit: 33900.00, explanation: '银行存款减少记贷方。支付水电费用。' },
    ],
    explanation: '办公场所的水电费属于日常运营费用，计入管理费用。取得增值税专票的进项税额可抵扣。',
  },
  // ═══════════════════════════════════════════
  // 1月13日 — 材料采购第二批 (Events 20-21)
  // ═══════════════════════════════════════════
  {
    id: 'evt_20',
    date: '2026-01-13',
    title: '采购建筑材料（第二批）',
    description: '因工程建设需要，再次向华强建材公司采购建筑材料一批，价款1,000,000元，增值税130,000元（税率13%），价税合计1,130,000元以银行存款支付。材料已验收入库。',
    documents: [
      {
        type: 'invoice', title: '增值税专用发票（第二批材料）', region: '河北省',
        invoiceNo: '130020260115', buyer: '恒达房地产开发有限公司', seller: '华强建材有限公司',
        lineItems: [
          { name: '盘螺HRB400', quantity: 80, unit: '吨', price: 6250, amount: 500000, taxRate: '13%', taxAmount: 65000 },
          { name: '商品混凝土C30', quantity: 2000, unit: 'm3', price: 250, amount: 500000, taxRate: '13%', taxAmount: 65000 },
        ],
        totalAmount: 1130000,
      },
      { type: 'receipt', title: '材料入库单', content: '盘螺80吨 混凝土2000m3 入库金额1,000,000元 已验收入库' },
    ],
    entries: [
      { subjectCode: '1403', summary: '采购第二批材料入库', debit: 1000000.00, credit: 0, explanation: '开发用材料增加记借方。第二批材料按不含税成本入库。' },
      { subjectCode: '222101', summary: '第二批材料进项税额', debit: 130000.00, credit: 0, explanation: '应交税费-进项税额增加记借方。取得专票可抵扣。' },
      { subjectCode: '1002', summary: '支付第二批材料款', debit: 0, credit: 1130000.00, explanation: '银行存款减少记贷方。支付材料采购款。' },
    ],
    explanation: '工程建设期间需要多次采购建筑材料。第二批材料包括盘螺和商品混凝土，均为主体工程所需的主要材料。',
  },

  {
    id: 'evt_21',
    date: '2026-01-14',
    title: '领用建筑材料（第二批）',
    description: '翡翠湖项目继续施工，领用第二批建筑材料800,000元投入工程建设。',
    documents: [
      { type: 'receipt', title: '工程领料单', content: '领用盘螺60吨 混凝土1800m3 金额800,000元 用于主体工程' },
    ],
    entries: [
      { subjectCode: '5001', summary: '领用第二批材料', debit: 800000.00, credit: 0, explanation: '开发成本增加记借方。第二批材料投入工程建设。' },
      { subjectCode: '1403', summary: '领用第二批材料', debit: 0, credit: 800000.00, explanation: '开发用材料减少记贷方。材料领用后库存减少。' },
    ],
    explanation: '持续领用建筑材料投入工程建设，材料成本逐步归集到开发成本。截至本日共领用材料2,600,000元。',
  },

  // ═══════════════════════════════════════════
  // 1月15日 — 其他工程 (Events 22-24)
  // ═══════════════════════════════════════════
  {
    id: 'evt_22',
    date: '2026-01-15',
    title: '支付绿化景观工程款',
    description: '支付翡翠湖项目绿化及景观工程款400,000元，增值税36,000元（税率9%），价税合计436,000元以银行存款支付。包含小区绿化、景观小品等。',
    documents: [
      {
        type: 'invoice', title: '增值税专用发票（绿化工程）', region: '河北省',
        invoiceNo: '130020260116', buyer: '恒达房地产开发有限公司', seller: '绿源园林工程有限公司',
        lineItems: [{ name: '翡翠湖项目绿化景观工程', quantity: 1, unitPrice: 400000, amount: 400000, taxRate: '9%', taxAmount: 36000 }],
        totalAmount: 436000,
      },
      { type: 'bank', title: '银行付款回单', content: '付款金额：肆拾叁万陆仟元整 收款方：绿源园林 摘要：绿化景观工程款' },
    ],
    entries: [
      { subjectCode: '5001', summary: '绿化景观工程费', debit: 400000.00, credit: 0, explanation: '开发成本增加记借方。绿化景观费计入开发成本-基础设施费。' },
      { subjectCode: '222101', summary: '绿化工程进项税额', debit: 36000.00, credit: 0, explanation: '应交税费-进项税额增加记借方。绿化工程按9%抵扣进项。' },
      { subjectCode: '1002', summary: '支付绿化工程款', debit: 0, credit: 436000.00, explanation: '银行存款减少记贷方。支付绿化景观工程费用。' },
    ],
    explanation: '绿化景观工程是住宅小区配套建设的重要内容，计入开发成本-基础设施费，提升小区的居住品质和销售竞争力。',
  },

  {
    id: 'evt_23',
    date: '2026-01-15',
    title: '支付临时设施费',
    description: '支付翡翠湖项目施工现场临时设施费120,000元（临时办公室、工人宿舍、材料仓库等），以银行存款支付。',
    documents: [
      { type: 'receipt', title: '临时设施费用清单', content: '临时办公室40,000元 工人宿舍50,000元 材料仓库30,000元 合计120,000元' },
      { type: 'bank', title: '银行付款回单', content: '付款金额：壹拾贰万元整 收款方：临时设施搭建公司 摘要：临时设施费' },
    ],
    entries: [
      { subjectCode: '5001', summary: '临时设施费', debit: 120000.00, credit: 0, explanation: '开发成本增加记借方。临时设施费计入开发成本-前期工程费。' },
      { subjectCode: '1002', summary: '支付临时设施费', debit: 0, credit: 120000.00, explanation: '银行存款减少记贷方。支付临时设施费用。' },
    ],
    explanation: '临时设施费指为项目施工搭建的临时性建筑物和设施，如临时办公室、工人宿舍等，计入开发成本-前期工程费。',
  },

  {
    id: 'evt_24',
    date: '2026-01-16',
    title: '支付招标代理费',
    description: '支付翡翠湖项目工程招标代理服务费20,000元，以银行存款支付。用于项目主体工程和配套工程的招标代理服务。',
    documents: [
      { type: 'receipt', title: '招标代理费发票', content: '翡翠湖项目工程招标代理服务 费用20,000元' },
      { type: 'bank', title: '银行付款回单', content: '付款金额：贰万元整 收款方：招标代理有限公司 摘要：招标代理费' },
    ],
    entries: [
      { subjectCode: '5001', summary: '招标代理费', debit: 20000.00, credit: 0, explanation: '开发成本增加记借方。招标代理费计入开发成本-前期工程费。' },
      { subjectCode: '1002', summary: '支付招标代理费', debit: 0, credit: 20000.00, explanation: '银行存款减少记贷方。支付招标代理费用。' },
    ],
    explanation: '招标代理费是委托招标代理机构进行工程招标发生的费用，计入开发成本-前期工程费。',
  },

  // ═══════════════════════════════════════════
  // 1月16日 — 监理费 (Event 25)
  // ═══════════════════════════════════════════
  {
    id: 'evt_25',
    date: '2026-01-16',
    title: '预付工程监理费',
    description: '预付翡翠湖项目工程监理费100,000元，增值税9,000元（税率9%），价税合计109,000元以银行存款支付。监理单位负责工程项目全过程质量监督。',
    documents: [
      {
        type: 'invoice', title: '增值税专用发票（监理服务）', region: '河北省',
        invoiceNo: '130020260117', buyer: '恒达房地产开发有限公司', seller: '建安工程监理有限公司',
        lineItems: [{ name: '翡翠湖项目工程监理服务', quantity: 1, unitPrice: 100000, amount: 100000, taxRate: '9%', taxAmount: 9000 }],
        totalAmount: 109000,
      },
      { type: 'bank', title: '银行付款回单', content: '付款金额：壹拾万玖仟元整 收款方：建安监理 摘要：预付监理费' },
    ],
    entries: [
      { subjectCode: '1123', summary: '预付工程监理费', debit: 100000.00, credit: 0, explanation: '预付账款增加记借方。预付的监理费后续按工程进度摊销计入开发成本。' },
      { subjectCode: '222101', summary: '监理费进项税额', debit: 9000.00, credit: 0, explanation: '应交税费-进项税额增加记借方。监理服务按9%抵扣进项。' },
      { subjectCode: '1002', summary: '支付监理费', debit: 0, credit: 109000.00, explanation: '银行存款减少记贷方。支付工程监理费用。' },
    ],
    explanation: '工程监理费是委托监理单位对工程施工进行质量监督的费用。预付的监理费先计入预付账款，后续随着工程进度逐步摊销计入开发成本。',
  },

  // ═══════════════════════════════════════════
  // 1月18日 — 销售费用 (Event 26)
  // ═══════════════════════════════════════════
  {
    id: 'evt_26',
    date: '2026-01-18',
    title: '支付销售部门办公费',
    description: '支付销售部门日常办公费用30,000元，以银行存款支付。包括售楼处日常运营、宣传资料印刷等。',
    documents: [
      { type: 'receipt', title: '销售部门费用清单', content: '售楼处运营15,000元 宣传资料印刷12,000元 其他3,000元 合计30,000元' },
      { type: 'bank', title: '银行付款回单', content: '付款金额：叁万元整 收款方：各供应商 摘要：销售部门办公费' },
    ],
    entries: [
      { subjectCode: '6601', summary: '销售部门办公费', debit: 30000.00, credit: 0, explanation: '销售费用增加记借方。销售部门的日常运营费用计入销售费用。' },
      { subjectCode: '1002', summary: '支付销售办公费', debit: 0, credit: 30000.00, explanation: '银行存款减少记贷方。支付销售部门办公费用。' },
    ],
    explanation: '销售部门的日常运营费用（售楼处运营、宣传资料等）计入销售费用，与销售活动直接相关。',
  },

  // ═══════════════════════════════════════════
  // 1月20日 — 预售 (Events 27-28)
  // ═══════════════════════════════════════════
  {
    id: 'evt_27',
    date: '2026-01-20',
    title: '收到预售房款（第一批）',
    description: '翡翠湖项目取得商品房预售许可证后，收到客户预付购房款3,000,000元，已存入银行。房开企业在项目达到预售条件后可收取预收款。',
    documents: [
      {
        type: 'bank', title: '银行收款回单',
        content: '收款金额：人民币叁佰万元整 付款人：各购房客户 摘要：翡翠湖项目购房预付款',
      },
      { type: 'receipt', title: '商品房预售合同', content: '翡翠湖项目预售 收取定金及首付款3,000,000元' },
    ],
    entries: [
      { subjectCode: '1002', summary: '收到预售房款', debit: 3000000.00, credit: 0, explanation: '银行存款增加记借方。收到客户预付的购房款。' },
      { subjectCode: '2203', summary: '预收购房款', debit: 0, credit: 3000000.00, explanation: '预收账款增加记贷方。预售房款先计入预收账款，待交付时再确认收入。' },
    ],
    explanation: '房地产开发企业在项目达到预售条件后，可向购房者收取预付款。预收款先计入预收账款（负债），待房屋交付满足收入确认条件时再转入主营业务收入。',
  },

  {
    id: 'evt_28',
    date: '2026-01-20',
    title: '预缴增值税（第一批预收款）',
    description: '收到预售房款后，按规定预缴增值税。预收款3,000,000元，一般计税项目预征率3%，不含税金额=3,000,000÷1.09=2,752,293.58元，应预缴增值税=2,752,293.58×3%=82,568.81元。',
    documents: [
      { type: 'receipt', title: '增值税预缴税款表', content: '预收款3,000,000元 预征率3% 预缴增值税82,568.81元' },
      { type: 'bank', title: '银行付款回单', content: '付款金额：捌万贰仟伍佰陆拾捌元捌角壹分 摘要：预缴增值税' },
    ],
    entries: [
      { subjectCode: '222103', summary: '预缴增值税（第一批预收款）', debit: 82568.81, credit: 0, explanation: '应交税费-预缴增值税增加记借方。房开企业预收款按3%预征率预缴增值税。' },
      { subjectCode: '1002', summary: '缴纳预缴增值税', debit: 0, credit: 82568.81, explanation: '银行存款减少记贷方。缴纳预缴增值税。' },
    ],
    explanation: '房地产开发企业收到预收款时需预缴增值税。一般计税项目按3%预征率预缴，预缴税额在项目交付申报时抵减应纳税额。',
  },

  // ═══════════════════════════════════════════
  // 1月22日 — 预售第二批 (Events 29-30)
  // ═══════════════════════════════════════════
  {
    id: 'evt_29',
    date: '2026-01-22',
    title: '收到预售房款（第二批）',
    description: '翡翠湖项目持续热销，再次收到客户预付购房款2,000,000元，已存入银行。',
    documents: [
      { type: 'bank', title: '银行收款回单', content: '收款金额：人民币贰佰万元整 付款人：购房客户 摘要：购房预付款' },
    ],
    entries: [
      { subjectCode: '1002', summary: '收到第二批预售房款', debit: 2000000.00, credit: 0, explanation: '银行存款增加记借方。持续收到客户预付款。' },
      { subjectCode: '2203', summary: '预收第二批购房款', debit: 0, credit: 2000000.00, explanation: '预收账款增加记贷方。预售房款暂计入预收账款。' },
    ],
    explanation: '房地产项目取得预售许可证后持续销售，预收款累计增加。截至本日预收款合计5,000,000元。',
  },

  {
    id: 'evt_30',
    date: '2026-01-22',
    title: '预缴增值税（第二批预收款）',
    description: '收到第二批预售房款后，预缴增值税。预收款2,000,000元，不含税金额=2,000,000÷1.09=1,834,862.39元，应预缴增值税=1,834,862.39×3%=55,045.87元。',
    documents: [
      { type: 'receipt', title: '增值税预缴税款表', content: '预收款2,000,000元 预征率3% 预缴增值税55,045.87元' },
      { type: 'bank', title: '银行付款回单', content: '付款金额：伍万伍仟零肆拾伍元捌角柒分 摘要：预缴增值税' },
    ],
    entries: [
      { subjectCode: '222103', summary: '预缴增值税（第二批）', debit: 55045.87, credit: 0, explanation: '应交税费-预缴增值税增加记借方。第二批预收款预缴增值税。' },
      { subjectCode: '1002', summary: '缴纳预缴增值税', debit: 0, credit: 55045.87, explanation: '银行存款减少记贷方。缴纳预缴增值税。' },
    ],
    explanation: '每一笔预收款均需按规定预缴增值税。本月共预收5,000,000元，预缴增值税合计137,614.68元（82,568.81+55,045.87）。',
  },

  // ═══════════════════════════════════════════
  // 1月23日 — 销售佣金 (Event 31)
  // ═══════════════════════════════════════════
  {
    id: 'evt_31',
    date: '2026-01-23',
    title: '支付销售佣金',
    description: '支付翡翠湖项目销售佣金120,000元，以银行存款支付。支付给房地产代理销售公司的佣金费用。',
    documents: [
      { type: 'receipt', title: '销售代理佣金结算单', content: '翡翠湖项目销售佣金 计120,000元 代理公司：恒信房产经纪' },
      { type: 'bank', title: '银行付款回单', content: '付款金额：壹拾贰万元整 收款方：恒信房产经纪 摘要：销售佣金' },
    ],
    entries: [
      { subjectCode: '6601', summary: '销售佣金', debit: 120000.00, credit: 0, explanation: '销售费用增加记借方。支付给代理公司的销售佣金属于销售费用。' },
      { subjectCode: '1002', summary: '支付销售佣金', debit: 0, credit: 120000.00, explanation: '银行存款减少记贷方。支付销售佣金费用。' },
    ],
    explanation: '房地产开发企业常委托代理销售公司进行房屋销售，支付销售佣金。佣金按销售额的一定比例计算，计入销售费用。',
  },

  // ═══════════════════════════════════════════
  // 1月25日 — 利息与资产 (Events 32-34)
  // ═══════════════════════════════════════════
  {
    id: 'evt_32',
    date: '2026-01-25',
    title: '计提贷款利息（资本化）',
    description: '计提1月份开发贷款利息。贷款本金5,000,000元，年利率6%，月利息=5,000,000×6%÷12=25,000元。该利息符合资本化条件，计入开发成本。',
    documents: [
      { type: 'receipt', title: '贷款利息计算表', content: '本金5,000,000元 年利率6% 月利息25,000元 资本化处理' },
    ],
    entries: [
      { subjectCode: '5001', summary: '资本化利息', debit: 25000.00, credit: 0, explanation: '开发成本增加记借方。项目开发期间的贷款利息符合资本化条件，计入开发成本-开发间接费。' },
      { subjectCode: '2241', summary: '应付贷款利息', debit: 0, credit: 25000.00, explanation: '其他应付款增加记贷方。计提的利息尚未支付，形成应付利息。' },
    ],
    explanation: '房地产开发企业为项目开发借入的贷款利息，在项目开发建设期间符合资本化条件，应计入开发成本（资本化），而非计入财务费用（费用化）。这是房开企业区别于一般企业的重要会计处理特点。',
  },

  {
    id: 'evt_33',
    date: '2026-01-25',
    title: '支付贷款利息',
    description: '支付1月份开发贷款利息25,000元，以银行存款支付。',
    documents: [
      { type: 'bank', title: '银行扣息回单', content: '扣款金额：贰万伍仟元整 摘要：1月贷款利息 利率6%' },
    ],
    entries: [
      { subjectCode: '2241', summary: '支付应付利息', debit: 25000.00, credit: 0, explanation: '其他应付款减少记借方。支付已计提的贷款利息，冲减应付利息。' },
      { subjectCode: '1002', summary: '支付贷款利息', debit: 0, credit: 25000.00, explanation: '银行存款减少记贷方。支付贷款利息。' },
    ],
    explanation: '支付贷款利息与计提利息对应，完整展示了"先计提、后支付"的流程。贷款利息已资本化计入开发成本，不产生财务费用。',
  },

  {
    id: 'evt_34',
    date: '2026-01-26',
    title: '购买办公设备',
    description: '购买办公电脑、打印机等办公设备一批，价款50,000元，以银行存款支付。预计使用5年，残值率5%。',
    documents: [
      { type: 'receipt', title: '办公设备采购清单', content: '电脑5台30,000元 打印机2台12,000元 其他8,000元 合计50,000元' },
      { type: 'bank', title: '银行付款回单', content: '付款金额：伍万元整 收款方：电子设备有限公司 摘要：办公设备款' },
    ],
    entries: [
      { subjectCode: '1601', summary: '购买办公设备', debit: 50000.00, credit: 0, explanation: '固定资产增加记借方。购买的办公设备作为固定资产核算。' },
      { subjectCode: '1002', summary: '支付设备款', debit: 0, credit: 50000.00, explanation: '银行存款减少记贷方。支付办公设备采购款。' },
    ],
    explanation: '办公设备（电脑、打印机等）单价较高且使用期限超过一年，应作为固定资产核算。外购固定资产按实际支付的价款入账，后续按月计提折旧（从下月起计提）。',
  },

  // ═══════════════════════════════════════════
  // 1月28日 — 工程收尾 (Events 35-36)
  // ═══════════════════════════════════════════
  {
    id: 'evt_35',
    date: '2026-01-28',
    title: '支付监理费尾款',
    description: '支付剩余工程监理费80,000元，增值税7,200元（税率9%），价税合计87,200元以银行存款支付。冲销前期预付的监理费。',
    documents: [
      {
        type: 'invoice', title: '增值税专用发票（监理服务尾款）', region: '河北省',
        invoiceNo: '130020260118', buyer: '恒达房地产开发有限公司', seller: '建安工程监理有限公司',
        lineItems: [{ name: '翡翠湖项目监理服务尾款', quantity: 1, unitPrice: 80000, amount: 80000, taxRate: '9%', taxAmount: 7200 }],
        totalAmount: 87200,
      },
      { type: 'bank', title: '银行付款回单', content: '付款金额：捌万柒仟贰佰元整 收款方：建安监理 摘要：监理费尾款' },
    ],
    entries: [
      { subjectCode: '5001', summary: '监理费计入开发成本', debit: 80000.00, credit: 0, explanation: '开发成本增加记借方。监理费尾款计入开发成本-建筑安装工程费。' },
      { subjectCode: '222101', summary: '监理费进项税额', debit: 7200.00, credit: 0, explanation: '应交税费-进项税额增加记借方。监理服务按9%抵扣进项。' },
      { subjectCode: '1002', summary: '支付监理费尾款', debit: 0, credit: 87200.00, explanation: '银行存款减少记贷方。支付监理服务尾款。' },
    ],
    explanation: '监理费是工程项目质量监督的费用。前期预付的监理费（evt_25）计入预付账款，本次发生的监理费直接计入开发成本。项目竣工后将预付的监理费一并转入开发成本。',
  },

  {
    id: 'evt_36',
    date: '2026-01-28',
    title: '支付工程质保金',
    description: '工程进展顺利，按合同约定支付前期扣留的部分工程质量保证金200,000元，以银行存款支付。',
    documents: [
      { type: 'bank', title: '银行付款回单', content: '付款金额：贰拾万元整 收款方：市建工集团 摘要：支付工程质保金' },
    ],
    entries: [
      { subjectCode: '2241', summary: '支付工程质保金', debit: 200000.00, credit: 0, explanation: '其他应付款减少记借方。支付前期扣留的质保金，冲减其他应付款。' },
      { subjectCode: '1002', summary: '支付质保金', debit: 0, credit: 200000.00, explanation: '银行存款减少记贷方。支付工程质量保证金。' },
    ],
    explanation: '工程质保金在扣留时（evt_12）计入其他应付款，实际支付时冲减其他应付款。质保金的支付标志着工程质量保修期的启动。',
  },

  // ═══════════════════════════════════════════
  // 1月31日 — 期末调整 (Events 37-47)
  // ═══════════════════════════════════════════
  {
    id: 'evt_37',
    date: '2026-01-31',
    title: '计提固定资产折旧',
    description: '计提1月份固定资产折旧。股东投入的工程车辆（原值300,000元，预计使用10年，残值率5%），月折旧额=300,000×95%÷120=2,375元。本月新购办公设备（原值50,000元）按会计准则当月新增不计提折旧，从2月起计提。',
    entries: [
      { subjectCode: '6602', summary: '车辆折旧费', debit: 2375.00, credit: 0, explanation: '管理费用增加记借方。公司车辆折旧计入管理费用。' },
      { subjectCode: '1602', summary: '计提车辆折旧', debit: 0, credit: 2375.00, explanation: '累计折旧增加记贷方。车辆折旧反映固定资产的价值损耗。' },
    ],
    explanation: '固定资产折旧采用直线法：月折旧额=（原值-残值）÷使用月数。会计准则规定当月新增的固定资产当月不计提折旧，从下月起计提。',
  },

  {
    id: 'evt_38',
    date: '2026-01-31',
    title: '摊销土地使用权',
    description: '摊销本月自用办公楼土地使用权。原值500,000元，预计使用50年（600个月），月摊销额=500,000÷600=833.33元。',
    entries: [
      { subjectCode: '6602', summary: '土地使用权摊销', debit: 833.33, credit: 0, explanation: '管理费用增加记借方。自用土地使用权摊销计入管理费用。' },
      { subjectCode: '1702', summary: '累计摊销增加', debit: 0, credit: 833.33, explanation: '累计摊销增加记贷方。摊销额反映无形资产的价值减少。' },
    ],
    explanation: '土地使用权作为无形资产，按其预计使用年限（50年）分期摊销。摊销额计入管理费用。无形资产当月增加当月开始摊销。',
  },

  {
    id: 'evt_39',
    date: '2026-01-31',
    title: '结转预付款（监理费摊销）',
    description: '将预付的工程监理费100,000元转入开发成本。监理服务已在本月提供，预付账款需摊销转入开发成本。',
    entries: [
      { subjectCode: '5001', summary: '监理费摊销转入开发成本', debit: 100000.00, credit: 0, explanation: '开发成本增加记借方。预付的监理费按受益期摊销转入开发成本。' },
      { subjectCode: '1123', summary: '冲销预付监理费', debit: 0, credit: 100000.00, explanation: '预付账款减少记贷方。预付的监理费摊销完毕，冲减预付账款。' },
    ],
    explanation: '预付的工程监理费在服务提供后，从预付账款转入开发成本-建筑安装工程费，体现权责发生制原则。',
  },

  {
    id: 'evt_40',
    date: '2026-01-31',
    title: '项目竣工（开发成本转开发产品）',
    description: '翡翠湖项目主体工程及配套设施本月完工，达到预定可使用状态。将归集的开发成本结转至开发产品科目，待销售时再结转主营业务成本。',
    entries: [
      { subjectCode: '5002', summary: '项目竣工结转开发产品', debit: 12805000.00, credit: 0, explanation: '开发产品增加记借方。竣工项目成本从开发成本转入开发产品，作为存货核算。' },
      { subjectCode: '5001', summary: '开发成本转出', debit: 0, credit: 12805000.00, explanation: '开发成本减少记贷方。项目竣工后开发成本全部转至开发产品。' },
    ],
    explanation: '房地产开发项目竣工后，需将开发成本转入开发产品科目。开发产品是房开企业的存货，待房屋交付销售时再结转至主营业务成本。开发成本明细：土地征用费3,090,000+前期工程费1,470,000+建筑安装工程费7,080,000+开发间接费145,000+资本化利息25,000+基础设施费1,200,000=12,805,000元。',
  },

  {
    id: 'evt_41',
    date: '2026-01-31',
    title: '交付房屋确认收入',
    description: '翡翠湖项目已竣工，向预购房客户交付房屋，确认主营业务收入。预收账款5,000,000元全部转收入，不含税收入=5,000,000÷1.09=4,587,155.96元，销项税额=412,844.04元。',
    documents: [
      { type: 'receipt', title: '房屋交付确认书', content: '翡翠湖项目首批交付 预收款转收入5,000,000元' },
    ],
    entries: [
      { subjectCode: '2203', summary: '预收账款转收入', debit: 5000000.00, credit: 0, explanation: '预收账款减少记借方。房屋交付后冲减预收账款。' },
      { subjectCode: '6001', summary: '确认主营业务收入', debit: 0, credit: 4587155.96, explanation: '主营业务收入增加记贷方。按不含税金额确认收入。' },
      { subjectCode: '222102', summary: '确认销项税额', debit: 0, credit: 412844.04, explanation: '应交税费-销项税额增加记贷方。房屋交付产生纳税义务，按9%计提销项税额。' },
    ],
    explanation: '房地产开发企业收入确认的时点：房屋交付给购房者时满足收入确认条件。预收账款转为收入的同时计提销项税额（一般计税9%）。收入和纳税义务在同一时点产生。',
  },

  {
    id: 'evt_42',
    date: '2026-01-31',
    title: '结转主营业务成本',
    description: '结转已交付房屋对应的开发产品成本。已交付房屋占竣工项目的30%，成本=12,805,000×30%=3,841,500元。',
    entries: [
      { subjectCode: '6401', summary: '结转主营业务成本', debit: 3841500.00, credit: 0, explanation: '主营业务成本增加记借方。已交付房屋对应的开发产品成本转入当期损益。' },
      { subjectCode: '5002', summary: '开发产品减少', debit: 0, credit: 3841500.00, explanation: '开发产品减少记贷方。已交付房屋的开发产品转出。' },
    ],
    explanation: '配比原则要求收入与成本在同一期间确认。已交付房屋按实际成本从开发产品结转至主营业务成本。剩余开发产品8,963,500元作为存货留待后续交付结转。',
  },

  {
    id: 'evt_43',
    date: '2026-01-31',
    title: '月末增值税计算',
    description: '月末计算增值税应纳税额。本月进项税额合计899,600元，预缴税额137,614.68元，销项税额412,844.04元。因进项税额和预缴税额合计超过销项税额，形成留抵税额624,370.64元，本期无需缴纳增值税。将预缴税额结转。',
    entries: [
      { subjectCode: '222106', summary: '结转预缴税额', debit: 137614.68, credit: 0, explanation: '转出未交增值税借方记。结转预缴增值税税额。' },
      { subjectCode: '222103', summary: '预缴税额转出', debit: 0, credit: 137614.68, explanation: '预缴增值税减少记贷方。将预缴税额结转至转出未交科目。' },
    ],
    explanation: '房地产开发企业增值税核算：进项税额899,600元+预缴税额137,614.68元=1,037,214.68元，销项税额412,844.04元。留抵税额=1,037,214.68-412,844.04=624,370.64元。留抵税额可结转下期继续抵扣。预缴税额从预缴科目结转至转出未交科目。',
  },

  {
    id: 'evt_44',
    date: '2026-01-31',
    title: '计提城建税及附加',
    description: '因本月增值税为留抵税额（无需缴纳），相应的城建税（7%）、教育费附加（3%）、地方教育附加（2%）均为零，无需计提附加税费。',
    entries: [],
    explanation: '城建税和教育费附加以实际缴纳的增值税为计税依据。本期增值税为留抵（无需缴纳），故无需计提附加税费。留抵税额可在以后期间抵扣，待实际缴纳增值税时再计提附加税费。',
  },

  {
    id: 'evt_45',
    date: '2026-01-31',
    title: '计提所得税费用',
    description: '计算本月应交企业所得税。利润总额=主营业务收入4,587,155.96-主营业务成本3,841,500.00-销售费用560,000.00-管理费用244,708.33-税金及附加0=-59,052.37元。本月为亏损，无需计提所得税费用。',
    entries: [],
    explanation: '假设本月利润总额为-58,052.37元（亏损），无需计提所得税费用。计算公式：收入4,587,155.96-成本3,841,500.00-销售费用（工资160,000+广告250,000+办公30,000+佣金120,000）=560,000.00-管理费用（工资120,000+印花税1,500+办公50,000+差旅40,000+水电30,000+折旧2,375+摊销833.33）=244,708.33=-58,052.37元。亏损可在以后5个纳税年度内弥补。',
  },

  {
    id: 'evt_46',
    date: '2026-01-31',
    title: '结转损益',
    description: '将本月损益类科目余额结转至本年利润。主营业务收入4,587,155.96元（贷方余额）和各项费用（主营业务成本3,841,500.00元、销售费用560,000.00元、管理费用244,708.33元）结转至本年利润。',
    entries: [
      { subjectCode: '6001', summary: '收入结转本年利润', debit: 4587155.96, credit: 0, explanation: '主营业务收入结转至本年利润，余额归零。' },
      { subjectCode: '6401', summary: '成本结转本年利润', debit: 0, credit: 3841500.00, explanation: '主营业务成本结转至本年利润，余额归零。' },
      { subjectCode: '6601', summary: '销售费用结转本年利润', debit: 0, credit: 560000.00, explanation: '销售费用结转至本年利润，余额归零。' },
      { subjectCode: '6602', summary: '管理费用结转本年利润', debit: 0, credit: 244708.33, explanation: '管理费用结转至本年利润，余额归零。' },
      { subjectCode: '4103', summary: '本年利润净额', debit: 59052.37, credit: 0, explanation: '本年利润借方余额59,052.37元反映本月亏损。收入4,587,155.96-费用4,646,208.33=-59,052.37元。' },
    ],
    explanation: '期末将所有损益类科目余额结转至本年利润，计算本期经营成果。结转后损益类科目余额为零，本年利润借方余额表示亏损，贷方余额表示盈利。亏损59,052.37元可在以后年度弥补。',
  },

  {
    id: 'evt_47',
    date: '2026-01-31',
    title: '支付银行手续费',
    description: '银行扣收1月份账户管理费及转账手续费500元。',
    documents: [
      { type: 'bank', title: '银行扣款回单', content: '账户管理费200元 转账手续费300元 合计500元' },
    ],
    entries: [
      { subjectCode: '6603', summary: '银行手续费', debit: 500.00, credit: 0, explanation: '财务费用增加记借方。银行账户管理费和转账手续费属于财务费用。' },
      { subjectCode: '1002', summary: '银行扣款', debit: 0, credit: 500.00, explanation: '银行存款减少记贷方。银行直接扣款。' },
    ],
    explanation: '银行手续费包括账户管理费、转账手续费、票据工本费等，计入财务费用。虽然金额不大，但每月都会发生，需及时入账。',
  },
]

export default {
  id: 'large_property',
  companyInfo: {
    name: '恒达房地产开发有限公司',
    shortName: '恒达地产',
    taxType: '一般纳税人',
    taxRate: '9%',
    accountingSystem: '企业会计准则',
    industry: '房地产业',
    address: '恒达大厦3001室',
    description: '恒达地产是一家专业从事住宅地产开发的企业，目前在"翡翠湖"住宅项目（占地50亩，规划建设6栋高层住宅）进行开发建设中。公司员工80人（工程管理20人、销售30人、财务行政15人、其他15人）。2026年1月新成立，翡翠湖项目1月启动。',
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
