/**
 * 商业企业（商品流通企业）7月教学任务
 *
 * 行业特征：纯进销存，无生产成本核算
 * 企业类型：一般纳税人（增值税13%）
 * 本月主题：费用与工资专题
 *
 * 时间线：
 *   费用专题(7/1-7/5)：各项日常费用
 *   低值易耗品(7/6-7/11)：购入+摊销
 *   采购销售(7/13-7/18)：购销业务+在途物资
 *   月末(7/20-7/31)：期末+出纳
 *
 * 知识点标签：商品采购、商品销售、仓存管理、往来管理、资金管理、费用管理、工资社保、税费、期末、出纳
 *
 * 会计准则依据：
 * - 《企业会计准则第14号——收入》（财会[2017]22号）
 * - 《企业会计准则第1号——存货》（财会[2006]3号）
 * - 《企业会计准则第4号——固定资产》（财会[2006]3号）
 * - 《城市维护建设税暂行条例》国发[1985]19号
 */

const tasks = [
  // ═══════════════════════════════════════════
  // 第一周（7/1-7/5）：费用专题——各项日常费用
  // ═══════════════════════════════════════════
  {
    date: '2026-07-01',
    title: '支付办公室房租',
    tags: ['费用管理'],
    difficulty: 1,
    description: '支付本月办公室房租6,000元，以工商银行转账支付。',
    tip: '房租属于企业日常经营的必要支出，计入"管理费用"。借：管理费用，贷：银行存款。注意区分押金和租金——押金计入"其他应收款"，租金直接计入费用。',
    entries: [
      { subjectCode: '6602', summary: '支付办公室房租', debit: 6000, credit: 0, explanation: '管理费用增加记借方。办公室房租是企业日常运营的必要支出，计入当期管理费用。' },
      { subjectCode: '100201', summary: '支付办公室房租', debit: 0, credit: 6000, explanation: '银行存款减少记贷方。通过工行转账支付房租，资产减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6602），属于"支付其他与经营活动有关的现金"。'},
    ],
    documents: [
      { type: 'receipt', label: '房租发票', docTitle: '增值税普通发票——房屋租赁', date: '2026-07-01', totalAmount: 6000, stampText: 'XX物业管理有限公司 发票专用章',
        items: [{ name: '2026年7月办公室房租', qty: 1, price: 6000, amount: 6000 }] },
      { type: 'text', label: '房屋租赁合同', docTitle: '办公用房租赁合同（摘录）', content: '租赁地址：上海市浦东新区XX路XX号XX室\n租赁期限：2026年1月1日至2026年12月31日\n月租金：6,000元（含税）\n支付方式：每月初转账支付', stampText: '合同专用章' },
    ],
  },
  {
    date: '2026-07-02',
    title: '报销差旅费（销售人员出差）',
    tags: ['费用管理'],
    difficulty: 1,
    description: '销售人员李华报销赴广州出差差旅费3,500元（含往返高铁票1,800元、住宿费1,400元、市内交通费300元），以现金支付。',
    tip: '销售人员出差的差旅费计入"销售费用"。报销时需审核发票真实性、行程合理性。借：销售费用，贷：库存现金。',
    entries: [
      { subjectCode: '6601', summary: '报销销售差旅费', debit: 3500, credit: 0, explanation: '销售费用增加记借方。销售人员出差发生的差旅费属于销售环节支出，计入销售费用。依据《企业所得税法》第八条，合理的差旅费准予税前扣除。' },
      { subjectCode: '1001', summary: '报销销售差旅费', debit: 0, credit: 3500, explanation: '库存现金减少记贷方。以现金支付差旅费报销款，资产减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6601），属于"支付其他与经营活动有关的现金"。'},
    ],
    documents: [
      { type: 'receipt', label: '差旅费报销单', docTitle: '差旅费报销单', date: '2026-07-02', totalAmount: 3500, stampText: '财务审核专用章',
        items: [{ name: '上海→广州高铁票', qty: 1, price: 900, amount: 900 }, { name: '广州→上海高铁票', qty: 1, price: 900, amount: 900 }, { name: '住宿费（2晚）', qty: 2, price: 700, amount: 1400 }, { name: '市内交通费', qty: 1, price: 300, amount: 300 }] },
      { type: 'text', label: '出差申请单', docTitle: '出差申请单', content: '出差人：李华（销售部）\n出差地点：广州\n出差事由：拜访客户、洽谈合作协议\n出差日期：2026年6月30日-7月2日\n审批人：销售经理 王经理', signature: '销售经理 王经理' },
    ],
  },
  {
    date: '2026-07-03',
    title: '支付广告费（网络推广）',
    tags: ['费用管理'],
    difficulty: 1,
    description: '支付本月百度搜索引擎推广服务费8,000元，以工商银行转账支付。',
    tip: '网络推广费属于广告宣传支出，计入"销售费用-广告费"。借：销售费用-广告费，贷：银行存款。广告费在企业所得税税前扣除有比例限制（不超过当年销售收入的15%）。',
    entries: [
      { subjectCode: '660101', summary: '支付网络广告费', debit: 8000, credit: 0, explanation: '销售费用-广告费增加记借方。网络推广属于广告宣传支出，计入销售费用。依据《企业所得税法实施条例》第四十四条，广告费不超过当年销售收入15%的部分准予扣除。' },
      { subjectCode: '100201', summary: '支付网络广告费', debit: 0, credit: 8000, explanation: '银行存款减少记贷方。支付网络推广服务费，资产减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目660101），属于"支付其他与经营活动有关的现金"。'},
    ],
    documents: [
      { type: 'receipt', label: '广告费发票', docTitle: '增值税普通发票', date: '2026-07-03', totalAmount: 8000, stampText: '百度在线网络技术有限公司 发票专用章',
        items: [{ name: '百度搜索引擎推广服务（7月）', qty: 1, price: 8000, amount: 8000 }] },
    ],
  },
  {
    date: '2026-07-04',
    title: '支付水电费',
    tags: ['费用管理'],
    difficulty: 1,
    description: '支付本月办公室水费800元、电费1,700元，合计2,500元，以工商银行转账支付。',
    tip: '水电费是企业日常运营的基本费用，计入"管理费用"。借：管理费用，贷：银行存款。实务中水电费通常有单独的缴费通知单和发票。',
    entries: [
      { subjectCode: '6602', summary: '支付水费', debit: 800, credit: 0, explanation: '管理费用增加记借方。办公用水费800元，计入当期管理费用。' },
      { subjectCode: '6602', summary: '支付电费', debit: 1700, credit: 0, explanation: '管理费用增加记借方。办公用电费1,700元，计入当期管理费用。' },
      { subjectCode: '100201', summary: '支付水电费', debit: 0, credit: 2500, explanation: '银行存款减少记贷方。支付水电费合计2,500元，资产减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6602），属于"支付其他与经营活动有关的现金"。'},
    ],
    documents: [
      { type: 'receipt', label: '电费账单', docTitle: '上海市电力公司缴费单', date: '2026-07-04', totalAmount: 1700,
        items: [{ name: '2026年7月电费', qty: 1, price: 1700, amount: 1700 }] },
      { type: 'receipt', label: '水费账单', docTitle: '上海市自来水公司缴费单', date: '2026-07-04', totalAmount: 800,
        items: [{ name: '2026年7月水费', qty: 1, price: 800, amount: 800 }] },
    ],
  },
  {
    date: '2026-07-05',
    title: '支付通讯费（电话+网络）',
    tags: ['费用管理'],
    difficulty: 1,
    description: '支付本月办公室固定电话费500元、宽带网络费1,000元，合计1,500元，以现金支付。',
    tip: '通讯费属于企业管理费用中的日常办公支出。借：管理费用，贷：库存现金。注意区分办公通讯费与个人通讯费补贴的处理差异。',
    entries: [
      { subjectCode: '6602', summary: '支付电话费', debit: 500, credit: 0, explanation: '管理费用增加记借方。办公电话费500元，计入当期管理费用。' },
      { subjectCode: '6602', summary: '支付宽带费', debit: 1000, credit: 0, explanation: '管理费用增加记借方。办公宽带网络费1,000元，计入当期管理费用。' },
      { subjectCode: '1001', summary: '支付通讯费', debit: 0, credit: 1500, explanation: '库存现金减少记贷方。以现金支付通讯费，资产减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6602），属于"支付其他与经营活动有关的现金"。'},
    ],
    documents: [
      { type: 'receipt', label: '电话费发票', docTitle: '中国电信缴费发票', date: '2026-07-05', totalAmount: 500,
        items: [{ name: '2026年7月固定电话费', qty: 1, price: 500, amount: 500 }] },
      { type: 'receipt', label: '宽带费发票', docTitle: '中国电信缴费发票', date: '2026-07-05', totalAmount: 1000,
        items: [{ name: '2026年7月企业宽带费', qty: 1, price: 1000, amount: 1000 }] },
    ],
  },

  // ═══════════════════════════════════════════
  // 第二周（7/6-7/11）：低值易耗品——购入+摊销
  // ═══════════════════════════════════════════
  {
    date: '2026-07-06',
    title: '购入低值易耗品（办公桌椅+文件柜）',
    tags: ['费用管理'],
    difficulty: 2,
    description: '公司新购入办公桌椅10套（单价300元，共3,000元）和文件柜4个（单价750元，共3,000元），合计6,000元，以工商银行转账支付。低值易耗品采用"长期待摊费用"科目归集，待领用时摊销。',
    tip: '低值易耗品是指使用年限短、价值低的资产。商业企业购入低值易耗品时先计入"长期待摊费用"归集，待领用时根据摊销方法分摊到费用。注意低值易耗品不同于固定资产（未达到固定资产确认标准）。',
    entries: [
      { subjectCode: '1801', summary: '购入低值易耗品（待摊销）', debit: 6000, credit: 0, explanation: '长期待摊费用增加记借方。购入低值易耗品（办公桌椅3,000元+文件柜3,000元）先归集，待领用时按摊销方法分摊。依据《企业会计准则——应用指南》，低值易耗品可采用一次摊销法或五五摊销法。' },
      { subjectCode: '100201', summary: '支付低值易耗品款项', debit: 0, credit: 6000, explanation: '银行存款减少记贷方。支付低值易耗品购置款，资产减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目1801），属于"支付其他与经营活动有关的现金"。'},
    ],
    documents: [
      { type: 'invoice', label: '增值税普通发票', region: '上海', invoiceNo: '3100789012', date: '2026-07-06', buyer: '本公司', seller: 'XX办公家具有限公司',
        lineItems: [{ name: '办公桌椅', spec: '标准型', unit: '套', qty: 10, price: 300, amount: 3000 }, { name: '铁皮文件柜', spec: '双开门', unit: '个', qty: 4, price: 750, amount: 3000 }],
        totalAmount: 6000, taxRate: '免税' },
      { type: 'receipt', label: '付款回单', docTitle: '工商银行转账凭证', date: '2026-07-06', totalAmount: 6000, stampText: '业务专用章',
        items: [{ name: 'XX办公家具有限公司——低值易耗品购置款', qty: 1, price: 6000, amount: 6000 }] },
    ],
  },
  {
    date: '2026-07-07',
    title: '低值易耗品摊销（一次摊销法——办公桌椅）',
    tags: ['费用管理'],
    difficulty: 2,
    description: '行政部领用办公桌椅10套（原值3,000元），采用一次摊销法，全额计入当期管理费用。',
    tip: '一次摊销法（也称"全额摊销法"）是指领用低值易耗品时将其全部价值一次计入费用。适用于价值较低或使用周期短的物品。借：管理费用，贷：长期待摊费用。此法简便，但不利于实物管理。',
    entries: [
      { subjectCode: '660201', summary: '办公桌椅一次摊销', debit: 3000, credit: 0, explanation: '管理费用-办公费增加记借方。办公桌椅10套采用一次摊销法，全额3,000元计入当期管理费用。一次摊销法适用于单价较低的低值易耗品，优点是核算简便。' },
      { subjectCode: '1801', summary: '办公桌椅一次摊销转出', debit: 0, credit: 3000, explanation: '长期待摊费用减少记贷方。办公桌椅3,000元从待摊费用中转出，资产减少。' },
    ],
    documents: [
      { type: 'text', label: '低值易耗品领用单', docTitle: '低值易耗品领用单（一次摊销）', content: '领用部门：行政部\n物品名称：办公桌椅10套\n原值：3,000元\n摊销方法：一次摊销法（全额摊销）\n摊销金额：3,000元\n审批：行政主管 张主管', signature: '行政主管 张主管' },
    ],
  },
  {
    date: '2026-07-08',
    title: '低值易耗品摊销（五五摊销法——领用文件柜）',
    tags: ['费用管理'],
    difficulty: 2,
    description: '销售部领用文件柜4个（原值3,000元），采用五五摊销法，领用时先摊销50%（1,500元）。',
    tip: '五五摊销法是指在领用低值易耗品时摊销其价值的50%，报废时再摊销剩余50%。适用于价值较高或使用周期较长的低值易耗品。借：管理费用（领用摊销50%），贷：长期待摊费用。相比一次摊销法，更利于实物管理和成本配比。',
    entries: [
      { subjectCode: '660201', summary: '文件柜领用摊销50%', debit: 1500, credit: 0, explanation: '管理费用-办公费增加记借方。文件柜4个采用五五摊销法，领用时先摊销50%=3,000×50%=1,500元。五五摊销法比一次摊销法更能体现费用与收益的配比。' },
      { subjectCode: '1801', summary: '文件柜领用摊销转出', debit: 0, credit: 1500, explanation: '长期待摊费用减少记贷方。文件柜价值1,500元从待摊费用中转出（剩余1,500元待报废时摊销）。' },
    ],
    documents: [
      { type: 'text', label: '低值易耗品领用单', docTitle: '低值易耗品领用单（五五摊销）', content: '领用部门：销售部\n物品名称：铁皮文件柜4个\n原值：3,000元\n摊销方法：五五摊销法\n本次摊销：50% = 1,500元\n剩余待摊销：1,500元（报废时摊销）\n审批：销售经理 王经理', signature: '销售经理 王经理' },
    ],
  },
  {
    date: '2026-07-11',
    title: '低值易耗品报废（五五摊销法——剩余50%）',
    tags: ['费用管理'],
    difficulty: 2,
    description: '上月领用的文件柜因损坏报废，摊销剩余50%价值1,500元。',
    tip: '五五摊销法下，低值易耗品报废时需摊销剩余50%的价值。借：管理费用（报废摊销50%），贷：长期待摊费用。至此该批低值易耗品全部摊销完毕，长期待摊费用余额归零。',
    entries: [
      { subjectCode: '660201', summary: '文件柜报废摊销剩余50%', debit: 1500, credit: 0, explanation: '管理费用-办公费增加记借方。文件柜报废，摊销剩余50%=3,000×50%=1,500元。至此文件柜全部摊销完毕。' },
      { subjectCode: '1801', summary: '文件柜报废摊销转出', debit: 0, credit: 1500, explanation: '长期待摊费用减少记贷方。文件柜剩余价值1,500元转出，长期待摊费用归零。五五摊销法完成全部摊销流程。' },
    ],
    documents: [
      { type: 'text', label: '低值易耗品报废单', docTitle: '低值易耗品报废申请单', content: '报废物品：铁皮文件柜4个\n原值：3,000元\n已摊销：1,500元（领用时50%）\n本次报废摊销：1,500元（报废时50%）\n报废原因：柜门铰链损坏、柜体变形，无法修复\n审批：行政主管 张主管', signature: '行政主管 张主管' },
    ],
  },

  // ═══════════════════════════════════════════
  // 第三周（7/13-7/18）：采购销售——在途物资+购销业务
  // ═══════════════════════════════════════════
  {
    date: '2026-07-13',
    title: '在途物资购入（商品已付款未到货）',
    tags: ['商品采购', '资金管理'],
    difficulty: 2,
    description: '向华强供应链采购D类商品一批，不含税价40,000元，增值税5,200元，价税合计45,200元，以工商银行存款支付。商品尚未到货，需通过"在途物资"科目核算。',
    tip: '在途物资是指企业已付款但尚未验收入库的商品。付款时：借：在途物资/应交税费-进项，贷：银行存款。待商品到货入库时再从在途物资转入库存商品。这是商业企业采购业务的重要核算环节。',
    entries: [
      { subjectCode: '1402', summary: '在途物资购入（未到货）', debit: 40000, credit: 0, explanation: '在途物资增加记借方。D类商品已付款但尚未到货，暂列在途物资科目，待入库时转入库存商品。依据《企业会计准则第1号——存货》第六条。' },
      { subjectCode: '222101', summary: '在途物资进项税额', debit: 5200, credit: 0, explanation: '应交税费-应交增值税（进项税额）增加记借方。取得增值税专用发票，进项税额5,200元可抵扣销项税。' },
      { subjectCode: '100201', summary: '支付在途物资货款', debit: 0, credit: 45200, explanation: '银行存款减少记贷方。支付D类商品货款及税款，资金减少。' , cashFlowItem: 'cf-op2', cashFlowExplanation: '采购存货/商品支出（配对科目1402），属于"购买商品、接受劳务支付的现金"——经营活动现金流出。'},
    ],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '上海', invoiceNo: '3100789013', date: '2026-07-13', buyer: '本公司', seller: '华强供应链有限公司',
        lineItems: [{ name: 'D类商品', spec: '标准', unit: '件', qty: 400, price: 100, amount: 40000 }],
        totalAmount: 45200, taxRate: '13%', taxAmount: 5200, totalInWords: '肆万伍仟贰佰元整' },
      { type: 'bank', label: '付款回单', date: '2026-07-13', totalAmount: 45200, payer: '本公司', payeeName: '华强供应链有限公司', content: 'D类商品采购货款', refNo: 'HD202607130001' },
    ],
  },
  {
    date: '2026-07-14',
    title: '在途物资到货入库（冲转在途物资）',
    tags: ['商品采购', '仓存管理'],
    difficulty: 2,
    description: '昨日在途的D类商品400件已到货并验收入库，结转在途物资至库存商品。',
    tip: '在途物资到货时，从"在途物资"转入"库存商品"。借：库存商品，贷：在途物资。注意到货时只是科目转换（从在途变为库存），不涉及增值税处理（进项税额在付款时已确认）。',
    entries: [
      { subjectCode: '1405', summary: 'D类商品到货入库', debit: 40000, credit: 0, explanation: '库存商品增加记借方。D类商品400件×100元=40,000元验收入库，存货增加。' },
      { subjectCode: '1402', summary: '冲转在途物资', debit: 0, credit: 40000, explanation: '在途物资减少记贷方。在途物资转入库存商品，在途结清。到货入库不涉及增值税处理（进项税在付款时已确认）。' },
    ],
    documents: [
      { type: 'text', label: '商品入库单', docTitle: '商品入库单', date: '2026-07-14', stampText: '仓库验收专用章',
        content: '供应商：华强供应链有限公司\n商品名称：D类商品\n数量：400件\n单价：100元\n金额：40,000元\n验收结果：质量合格、数量无误\n经手人：仓库管理员 王强' },
    ],
  },
  {
    date: '2026-07-15',
    title: '现购商品',
    tags: ['商品采购', '税费'],
    difficulty: 2,
    description: '向鼎盛贸易有限公司现购C类商品一批，不含税价30,000元，增值税3,900元，价税合计33,900元，以工商银行存款支付。商品已验收入库。',
    tip: '现购是采购商品并立即付款的方式。借：库存商品/应交税费-进项，贷：银行存款。现购通常能获得更好的采购价格，但占用流动资金。',
    entries: [
      { subjectCode: '1405', summary: '现购商品入库', debit: 30000, credit: 0, explanation: '库存商品增加记借方。C类商品验收入库，存货增加。不含税价30,000元。' },
      { subjectCode: '222101', summary: '现购商品进项税额', debit: 3900, credit: 0, explanation: '应交税费-应交增值税（进项税额）增加记借方。取得增值税专用发票，税额3,900元可抵扣销项税。依据《增值税暂行条例》第八条。' },
      { subjectCode: '100201', summary: '支付现购商品款', debit: 0, credit: 33900, explanation: '银行存款减少记贷方。支付采购货款及税款，资产减少。' , cashFlowItem: 'cf-op2', cashFlowExplanation: '采购存货/商品支出（配对科目1405），属于"购买商品、接受劳务支付的现金"——经营活动现金流出。'},
    ],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '广东', invoiceNo: '4400789012', date: '2026-07-15', buyer: '本公司', seller: '鼎盛贸易有限公司',
        lineItems: [{ name: 'C类商品', spec: '标准', unit: '件', qty: 200, price: 150, amount: 30000 }],
        totalAmount: 33900, taxRate: '13%', taxAmount: 3900, totalInWords: '叁万叁仟玖佰元整' },
      { type: 'bank', label: '付款回单', date: '2026-07-15', totalAmount: 33900, payer: '本公司', payeeName: '鼎盛贸易有限公司', content: 'C类商品货款', refNo: 'HD202607150001' },
    ],
  },
  {
    date: '2026-07-15',
    title: '赊购商品',
    tags: ['商品采购', '往来管理'],
    difficulty: 2,
    description: '向丙公司赊购B类商品一批，不含税价50,000元，增值税6,500元，价税合计56,500元，货款未付。商品已验收入库。',
    tip: '赊购是商业企业常见的采购方式，可缓解短期资金压力。借：库存商品/应交税费-进项，贷：应付账款。注意区分应付账款明细科目，正确归集到对应供应商。',
    entries: [
      { subjectCode: '1405', summary: '赊购商品入库', debit: 50000, credit: 0, explanation: '库存商品增加记借方。B类商品验收入库，存货增加。不含税价50,000元。' },
      { subjectCode: '222101', summary: '赊购商品进项税额', debit: 6500, credit: 0, explanation: '应交税费-应交增值税（进项税额）增加记借方。取得增值税专用发票，税额6,500元可抵扣销项税。' },
      { subjectCode: '220201', summary: '赊购商品款未付（丙公司）', debit: 0, credit: 56500, explanation: '应付账款-丙公司增加记贷方。赊购商品尚未付款，形成对丙公司的债务56,500元。' },
    ],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '江苏', invoiceNo: '3200789012', date: '2026-07-15', buyer: '本公司', seller: '丙公司',
        lineItems: [{ name: 'B类商品', spec: '标准', unit: '件', qty: 250, price: 200, amount: 50000 }],
        totalAmount: 56500, taxRate: '13%', taxAmount: 6500, totalInWords: '伍万陆仟伍佰元整' },
      { type: 'text', label: '入库单', docTitle: '商品入库单', content: '供应商：丙公司\n商品名称：B类商品\n数量：250件\n单价：200元\n金额：50,000元\n验收结果：合格\n经手人：仓库管理员 王强', signature: '仓库管理员 王强' },
    ],
  },
  {
    date: '2026-07-16',
    title: '现销商品',
    tags: ['商品销售', '资金管理'],
    difficulty: 2,
    description: '销售C类商品一批，不含税价120,000元，增值税15,600元，价税合计135,600元，已收存工商银行。',
    tip: '现销是一手交钱一手交货的销售方式。确认收入时：借：银行存款，贷：主营业务收入/应交税费-销项。收入确认需满足《企业会计准则第14号》的五条件，特别注意商品控制权已转移给客户。',
    entries: [
      { subjectCode: '100201', summary: '现销商品收款', debit: 135600, credit: 0, explanation: '银行存款增加记借方。现销商品收到款项，资金回笼。价税合计135,600元。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入——主营业务产生的现金收入。'},
      { subjectCode: '6001', summary: '现销确认收入', debit: 0, credit: 120000, explanation: '主营业务收入增加记贷方。商品销售实现，确认不含税收入120,000元。依据《企业会计准则第14号——收入》第四条。' },
      { subjectCode: '222101', summary: '现销增值税销项税额', debit: 0, credit: 15600, explanation: '应交税费-应交增值税（销项税额）增加记贷方。销项税额=120,000×13%=15,600元。销售商品产生纳税义务，负债增加。' },
    ],
    documents: [
      { type: 'invoice', label: '增值税专用发票（销项）', region: '上海', invoiceNo: '3100789014', date: '2026-07-16', buyer: '永辉超市', seller: '本公司',
        lineItems: [{ name: 'C类商品', spec: '标准', unit: '件', qty: 600, price: 200, amount: 120000 }],
        totalAmount: 135600, taxRate: '13%', taxAmount: 15600, totalInWords: '壹拾叁万伍仟陆佰元整' },
      { type: 'bank', label: '收款回单', date: '2026-07-16', totalAmount: 135600, payer: '永辉超市', payeeName: '本公司', content: '货款（发票No.3100789014）', refNo: 'HD202607160001' },
    ],
  },
  {
    date: '2026-07-16',
    title: '赊销商品',
    tags: ['商品销售', '往来管理'],
    difficulty: 2,
    description: '向鑫源商贸有限公司赊销A类商品一批，不含税价100,000元，增值税13,000元，价税合计113,000元，货款未收。',
    tip: '赊销是给予客户信用期的销售方式。确认收入时：借：应收账款，贷：主营业务收入/应交税费-销项。注意赊销虽未收到现金，但已产生增值税纳税义务。',
    entries: [
      { subjectCode: '112201', summary: '赊销商品款未收（甲公司）', debit: 113000, credit: 0, explanation: '应收账款-甲公司增加记借方。赊销商品形成对甲公司的债权113,000元，需按合同约定账期催收。' },
      { subjectCode: '6001', summary: '赊销确认收入', debit: 0, credit: 100000, explanation: '主营业务收入增加记贷方。商品已发出，控制权已转移，收入条件满足。依据《企业会计准则第14号——收入》第四条。' },
      { subjectCode: '222101', summary: '赊销增值税销项税额', debit: 0, credit: 13000, explanation: '应交税费-应交增值税（销项税额）增加记贷方。赊销同样产生纳税义务，销项税额=100,000×13%=13,000元。' },
    ],
    documents: [
      { type: 'invoice', label: '增值税专用发票（销项）', region: '上海', invoiceNo: '3100789015', date: '2026-07-16', buyer: '鑫源商贸有限公司', seller: '本公司',
        lineItems: [{ name: 'A类商品', spec: '标准', unit: '件', qty: 500, price: 200, amount: 100000 }],
        totalAmount: 113000, taxRate: '13%', taxAmount: 13000, totalInWords: '壹拾壹万叁仟元整' },
      { type: 'text', label: '出库单', docTitle: '商品出库单', content: '商品名称：A类商品\n数量：500件\n单价：200元\n金额：100,000元\n承运人：顺丰物流\n经手人：仓库管理员 王强', signature: '仓库管理员 王强' },
    ],
  },
  {
    date: '2026-07-17',
    title: '结转已销商品成本',
    tags: ['商品销售', '仓存管理'],
    difficulty: 2,
    description: '计算并结转7月16日销售商品的成本。C类商品（现销）600件，单位成本120元/件，计72,000元；A类商品（赊销）500件，单位成本与销售均价一致，计60,000元（成本率约60%），合计132,000元。',
    tip: '确认收入的同时必须同步结转成本，遵循配比原则。借：主营业务成本，贷：库存商品。商业企业通常采用移动加权平均法或先进先出法计算发出商品成本。成本结转的准确性直接影响毛利和存货价值。',
    entries: [
      { subjectCode: '6401', summary: '结转现销C类商品成本', debit: 72000, credit: 0, explanation: '主营业务成本增加记借方。C类商品600件×单位成本120元=72,000元。遵循配比原则，收入确认的同时结转成本。依据《企业会计准则第1号——存货》第十四条。' },
      { subjectCode: '6401', summary: '结转赊销A类商品成本', debit: 60000, credit: 0, explanation: '主营业务成本增加记借方。A类商品500件×单位成本120元=60,000元（采用移动加权平均法计算）。' },
      { subjectCode: '1405', summary: '结转现销C类商品出库', debit: 0, credit: 72000, explanation: '库存商品减少记贷方。C类商品600件出库，存货减少72,000元。' },
      { subjectCode: '1405', summary: '结转赊销A类商品出库', debit: 0, credit: 60000, explanation: '库存商品减少记贷方。A类商品500件出库，存货减少60,000元。' },
    ],
    documents: [
      { type: 'text', label: '成本计算表', docTitle: '商品销售成本计算表（7月第一批）', content: '一、现销（永辉超市）：\n  商品：C类商品\n  销售数量：600件\n  单位成本：120元/件\n  销售成本：72,000元\n\n二、赊销（鑫源商贸）：\n  商品：A类商品\n  销售数量：500件\n  单位成本：120元/件\n  销售成本：60,000元\n\n三、合计销售成本：132,000元\n计价方法：移动加权平均法', stampText: '财务专用章' },
    ],
  },

  // ═══════════════════════════════════════════
  // 第四周（7/20-7/31）：月末——期末处理+出纳
  // ═══════════════════════════════════════════
  {
    date: '2026-07-20',
    title: '计提短期借款利息',
    tags: ['费用管理'],
    difficulty: 2,
    description: '公司上月向工商银行借入短期借款500,000元，月利率0.3625%（年利率4.35%），计提本月应付利息1,812.50元。',
    tip: '短期借款利息应按月计提，计入"财务费用"。借：财务费用，贷：其他应付款（或应付利息）。利息费用=借款本金×年利率÷12。注意利息是资金使用成本，属于财务费用而非管理费用。',
    entries: [
      { subjectCode: '6603', summary: '计提短期借款利息', debit: 1812.5, credit: 0, explanation: '财务费用增加记借方。本月短期借款利息=500,000×4.35%÷12=1,812.50元。利息支出是融资成本，计入财务费用。依据《企业会计准则第17号——借款费用》第四条。' },
      { subjectCode: '2241', summary: '计提短期借款利息', debit: 0, credit: 1812.5, explanation: '其他应付款增加记贷方。计提的应付利息暂挂其他应付款，待实际支付时冲减。' },
    ],
    documents: [
      { type: 'text', label: '利息计算表', docTitle: '短期借款利息计算表', content: '借款银行：工商银行\n借款本金：500,000元\n年利率：4.35%\n月利率：0.3625%（4.35%÷12）\n本月利息：500,000×4.35%÷12=1,812.50元\n付息方式：到期一次性还本付息', stampText: '财务专用章' },
    ],
  },
  {
    date: '2026-07-21',
    title: '报销差旅费（管理人员出差）',
    tags: ['费用管理'],
    difficulty: 1,
    description: '行政主管张明报销赴北京参加培训的差旅费4,500元（含往返机票2,800元、住宿费1,200元、市内交通费500元），以现金支付。',
    tip: '管理人员出差发生的差旅费计入"管理费用"，与销售人员的差旅费计入"销售费用"有所区别。借：管理费用，贷：库存现金。实务中差旅费报销需附完整单据并按规定标准执行。',
    entries: [
      { subjectCode: '6602', summary: '报销管理人员差旅费', debit: 4500, credit: 0, explanation: '管理费用增加记借方。行政主管张明参加培训发生的差旅费4,500元，属于管理活动支出，计入管理费用。' },
      { subjectCode: '1001', summary: '报销管理人员差旅费', debit: 0, credit: 4500, explanation: '库存现金减少记贷方。以现金支付差旅费报销款，资产减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6602），属于"支付其他与经营活动有关的现金"。'},
    ],
    documents: [
      { type: 'receipt', label: '差旅费报销单', docTitle: '差旅费报销单', date: '2026-07-21', totalAmount: 4500, stampText: '财务审核专用章',
        items: [{ name: '上海→北京机票', qty: 1, price: 1400, amount: 1400 }, { name: '北京→上海机票', qty: 1, price: 1400, amount: 1400 }, { name: '住宿费（2晚）', qty: 2, price: 600, amount: 1200 }, { name: '市内交通费', qty: 1, price: 500, amount: 500 }] },
      { type: 'text', label: '培训通知', docTitle: '企业管理能力提升培训通知', content: '培训主题：现代企业管理与财务思维\n参训人员：行政主管 张明\n培训时间：2026年7月19日-7月21日\n培训地点：北京\n主办单位：中国企业联合会', stampText: '中国企业联合会 公章' },
    ],
  },
  {
    date: '2026-07-22',
    title: '计提本月工资',
    tags: ['工资社保'],
    difficulty: 2,
    description: '计提本月员工工资：管理人员工资25,000元，销售人员工资20,000元，合计45,000元。',
    tip: '月末需计提当月应付职工薪酬，按部门分别计入不同费用科目。借：管理费用/销售费用，贷：应付职工薪酬-工资。工资是期间费用，直接影响当期利润。计提是权责发生制的体现——7月的工资即使8月发放，费用仍归属7月。',
    entries: [
      { subjectCode: '660203', summary: '计提管理人员工资', debit: 25000, credit: 0, explanation: '管理费用-工资薪金增加记借方。行政管理人员工资25,000元计入管理费用。' },
      { subjectCode: '6601', summary: '计提销售人员工资', debit: 20000, credit: 0, explanation: '销售费用增加记借方。销售人员工资20,000元计入销售费用。' },
      { subjectCode: '221101', summary: '计提本月工资', debit: 0, credit: 45000, explanation: '应付职工薪酬-工资增加记贷方。计提本月工资45,000元，形成对员工的负债。依据《企业会计准则第9号——职工薪酬》第四条。' },
    ],
    documents: [
      { type: 'text', label: '工资表', docTitle: '2026年7月工资汇总表', content: '管理人员：5人×5,000元=25,000元\n销售人员：4人×5,000元=20,000元\n合计：45,000元\n实发金额：45,000元（无社保公积金扣缴）\n制表：人事部  审核：财务部', stampText: '行政人事部章' },
    ],
  },
  {
    date: '2026-07-23',
    title: '发放本月工资',
    tags: ['工资社保'],
    difficulty: 1,
    description: '通过工商银行转账发放本月员工工资45,000元。',
    tip: '实际发放工资时：借：应付职工薪酬，贷：银行存款。发放后"应付职工薪酬"余额归零，表示企业对员工的工资负债已清偿。注意代扣代缴个税和社保时会有更复杂的分录。',
    entries: [
      { subjectCode: '221101', summary: '发放本月工资', debit: 45000, credit: 0, explanation: '应付职工薪酬-工资减少记借方。实际发放工资，对员工的负债减少。' },
      { subjectCode: '100201', summary: '发放本月工资', debit: 0, credit: 45000, explanation: '银行存款减少记贷方。通过工商银行代发工资45,000元，资金划出。' , cashFlowItem: 'cf-op3', cashFlowExplanation: '支付职工薪酬相关支出（配对科目221101），属于"支付给职工以及为职工支付的现金"——经营活动现金流出。'},
    ],
    documents: [
      { type: 'bank', label: '代发工资回单', date: '2026-07-23', totalAmount: 45000, payer: '本公司', payeeName: '员工代发户', content: '2026年7月工资', refNo: 'HD202607230001' },
    ],
  },
  {
    date: '2026-07-25',
    title: '计提固定资产折旧',
    tags: ['费用管理'],
    difficulty: 2,
    description: '计提本月固定资产折旧。房屋建筑物原值500,000元，月折旧率0.2%；办公设备原值80,000元，月折旧率0.8%；运输设备原值200,000元，月折旧率0.6%。所有资产均归管理部门使用。',
    tip: '固定资产折旧按使用部门计入相应费用。借：管理费用，贷：累计折旧。累计折旧是固定资产的抵减科目，贷方表示累计折旧增加。固定资产账面价值=原值-累计折旧。',
    entries: [
      { subjectCode: '6602', summary: '计提固定资产折旧', debit: 2840, credit: 0, explanation: '管理费用增加记借方。本月折旧合计：房屋500,000×0.2%=1,000元+办公设备80,000×0.8%=640元+运输设备200,000×0.6%=1,200元=2,840元。依据《企业会计准则第4号——固定资产》第十四条。' },
      { subjectCode: '1602', summary: '计提固定资产折旧', debit: 0, credit: 2840, explanation: '累计折旧增加记贷方。累计折旧是固定资产的抵减科目，贷方表示折旧增加。固定资产账面价值=原值-累计折旧。' },
    ],
    documents: [
      { type: 'text', label: '折旧计算表', docTitle: '固定资产折旧计算表（2026年7月）', content: '固定资产折旧计算（直线法）：\n\n房屋建筑物：原值500,000×月折旧率0.2%=1,000元\n办公设备：原值80,000×月折旧率0.8%=640元\n运输设备：原值200,000×月折旧率0.6%=1,200元\n\n合计：2,840元\n所有资产均归管理部门使用，折旧全部计入管理费用。', stampText: '财务专用章' },
    ],
  },
  {
    date: '2026-07-28',
    title: '计提城建税及教育费附加',
    tags: ['税费'],
    difficulty: 2,
    description: '根据本月应交增值税计算并计提城市维护建设税（税率7%）和教育费附加（税率3%）。本月销项税额28,600元，进项税额15,600元，应交增值税13,000元。',
    tip: '城建税和教育费附加以实际应交增值税为计税依据。借：税金及附加，贷：应交税费-城建税/教育费附加。城建税税率因地区而异（城市7%、县城5%、其他1%），本例按市区7%计算。',
    entries: [
      { subjectCode: '6403', summary: '计提城建税及教育费附加', debit: 1300, credit: 0, explanation: '税金及附加增加记借方。本月应交增值税=销项28,600-进项15,600=13,000元。城建税=13,000×7%=910元，教育费附加=13,000×3%=390元，合计1,300元。依据《城市维护建设税暂行条例》第四条。' },
      { subjectCode: '222103', summary: '计提应交城市维护建设税', debit: 0, credit: 910, explanation: '应交税费-应交城市维护建设税增加记贷方。应交城建税=13,000×7%=910元。' },
      { subjectCode: '222104', summary: '计提应交教育费附加', debit: 0, credit: 390, explanation: '应交税费-应交教育费附加增加记贷方。应交教育费附加=13,000×3%=390元。' },
    ],
    documents: [
      { type: 'text', label: '税金计算表', docTitle: '附加税费计算表（2026年7月）', content: '计税依据：\n销项税额：28,600元\n进项税额：15,600元\n应交增值税：13,000元\n\n城市维护建设税：13,000×7%=910元\n教育费附加：13,000×3%=390元\n合计：1,300元', stampText: '财务专用章' },
    ],
  },
  {
    date: '2026-07-29',
    title: '缴纳增值税',
    tags: ['税费'],
    difficulty: 2,
    description: '缴纳本月应交增值税13,000元，通过工商银行转账支付。',
    tip: '缴纳增值税时：借：应交税费-应交增值税（已交税金），贷：银行存款。一般纳税人通常次月15日前申报上月增值税。实际缴纳后，应交税费余额减少，纳税义务清偿。',
    entries: [
      { subjectCode: '222101', summary: '缴纳本月增值税', debit: 13000, credit: 0, explanation: '应交税费-应交增值税减少记借方。实际缴纳本月应交增值税13,000元，纳税义务清偿。' },
      { subjectCode: '100201', summary: '缴纳本月增值税', debit: 0, credit: 13000, explanation: '银行存款减少记贷方。通过工行缴纳增值税款，资金减少。' , cashFlowItem: 'cf-op4', cashFlowExplanation: '缴纳税费支出（配对科目222101），属于"支付的各项税费"——经营活动现金流出。'},
    ],
    documents: [
      { type: 'bank', label: '缴税回单', date: '2026-07-29', totalAmount: 13000, payer: '本公司', payeeName: '国家金库上海分库', content: '缴纳2026年7月增值税', refNo: 'HD202607290001' },
      { type: 'text', label: '增值税纳税申报表', docTitle: '增值税纳税申报表（简表）', content: '所属期：2026年7月\n销项税额：28,600元\n进项税额：15,600元\n应交增值税：13,000元\n已缴纳：13,000元\n申报日期：2026年7月29日' },
    ],
  },
  {
    date: '2026-07-30',
    title: '期末结转损益',
    tags: ['期末'],
    difficulty: 3,
    description: '月末结转所有损益类科目余额至"本年利润"，计算本月净利润。',
    tip: '期末结转损益是每月必做的重要步骤。先将收入类科目结转至本年利润贷方，再将费用类科目结转至本年利润借方。差额（本年利润贷方余额）即为本月净利润。注意结转账务的顺序：先收入后费用。',
    entries: [
      { subjectCode: '6001', summary: '结转主营业务收入', debit: 220000, credit: 0, explanation: '主营业务收入结转至本年利润。收入类科目期末余额转出，余额归零。本月收入合计=现销120,000+赊销100,000=220,000元。' },
      { subjectCode: '4103', summary: '结转主营业务收入', debit: 0, credit: 220000, explanation: '本年利润增加记贷方。收入结转至本年利润，所有者权益增加。' },
      { subjectCode: '4103', summary: '结转各项费用支出', debit: 214952.5, credit: 0, explanation: '本年利润减少记借方。将本期所有费用转入本年利润：主营业务成本132,000+税金及附加1,300+销售费用31,500+管理费用48,340+财务费用1,812.50=214,952.50元。本月净利润=220,000-214,952.50=5,047.50元。' },
      { subjectCode: '6401', summary: '结转主营业务成本', debit: 0, credit: 132000, explanation: '主营业务成本转出，余额归零。已销商品成本132,000元（C类72,000+A类60,000）。' },
      { subjectCode: '6403', summary: '结转税金及附加', debit: 0, credit: 1300, explanation: '税金及附加转出1,300元（计提的城建税910+教育费附加390）。' },
      { subjectCode: '6601', summary: '结转销售费用', debit: 0, credit: 31500, explanation: '销售费用转出31,500元（含差旅费3,500+广告费8,000+工资20,000）。' },
      { subjectCode: '6602', summary: '结转管理费用', debit: 0, credit: 48340, explanation: '管理费用转出48,340元（含房租6,000+水电2,500+通讯1,500+低值易耗品摊销6,000+管理人员差旅费4,500+管理人员工资25,000+折旧2,840）。' },
      { subjectCode: '6603', summary: '结转财务费用', debit: 0, credit: 1812.5, explanation: '财务费用转出1,812.50元（短期借款利息）。' },
    ],
    documents: [
      { type: 'text', label: '损益计算表', docTitle: '2026年7月损益计算表', content: '一、营业收入：220,000.00元\n  其中：现销收入120,000元，赊销收入100,000元\n二、减：营业成本：132,000.00元\n三、减：税金及附加：1,300.00元\n四、减：销售费用：31,500.00元\n五、减：管理费用：48,340.00元\n六、减：财务费用：1,812.50元\n七、营业利润：5,047.50元\n八、净利润：5,047.50元\n\n注：本月无形资产未发生摊销业务。', stampText: '财务专用章' },
    ],
  },

  // ═══════════════════════════════════════════
  // 出纳任务（7/1-7/27）：资金收付 + 工资社保
  // ═══════════════════════════════════════════
  {
    date: '2026-07-01',
    title: '月初现金日记账启用',
    tags: ['出纳'],
    difficulty: 1,
    role: 'cashier',
    description: '月初，出纳开启本月现金日记账，确认库存现金期初余额为20,000元，核对无误后开始登记本月现金收支。',
    tip: '出纳需首先确认现金日记账期初余额是否与上月期末余额一致，如有差异需查明原因。这是出纳每月工作的起点，也是资金管理的基础。',
    entries: [],
    documents: [
      { type: 'text', label: '现金日记账', docTitle: '现金日记账（2026年7月）', content: '日期：2026年7月1日\n页码：第1页\n\n期初余额：20,000.00元\n\n说明：本月现金期初余额已核对无误，与上月期末余额一致。', stampText: '出纳员章' },
    ],
  },
  {
    date: '2026-07-02',
    title: '提取备用金',
    tags: ['出纳', '资金管理'],
    difficulty: 1,
    role: 'cashier',
    description: '从工商银行提取备用金5,000元，用于日常零星开支。',
    tip: '提取备用金时需填写现金支票，经会计主管签字后到银行柜台办理。借：库存现金，贷：银行存款。注意提取备用金不超过银行核定的库存现金限额。',
    entries: [
      { subjectCode: '1001', summary: '提取备用金', debit: 5000, credit: 0, explanation: '库存现金增加记借方。提取备用金后库存现金增加5,000元，可用于日常零星支出。' },
      { subjectCode: '100201', summary: '提取备用金', debit: 0, credit: 5000, explanation: '银行存款减少记贷方。从工行账户提取现金5,000元，银行存款减少。' },
    ],
    documents: [
      { type: 'receipt', label: '现金支票存根', docTitle: '中国工商银行现金支票存根', date: '2026-07-02', totalAmount: 5000, stampText: '预留印鉴',
        items: [{ name: '提取备用金（日常零星开支）', qty: 1, price: 5000, amount: 5000 }] },
    ],
  },
  {
    date: '2026-07-04',
    title: '现金送存银行',
    tags: ['出纳', '资金管理'],
    difficulty: 1,
    role: 'cashier',
    description: '将库存现金3,000元送存工商银行，减少库存现金存量。',
    tip: '当库存现金超过银行核定的限额时，出纳应将超额部分送存银行。借：银行存款，贷：库存现金。送存时需填制现金进账单，银行盖章后退回一联作为记账凭证。',
    entries: [
      { subjectCode: '100201', summary: '现金送存银行', debit: 3000, credit: 0, explanation: '银行存款增加记借方。将现金存入工行账户，银行存款增加3,000元。' },
      { subjectCode: '1001', summary: '现金送存银行', debit: 0, credit: 3000, explanation: '库存现金减少记贷方。送存银行后，库存现金减少3,000元。' },
    ],
    documents: [
      { type: 'receipt', label: '现金进账单', docTitle: '中国工商银行现金进账单', date: '2026-07-04', totalAmount: 3000, stampText: '中国工商银行 业务专用章',
        items: [{ name: '库存现金送存', qty: 1, price: 3000, amount: 3000 }] },
    ],
  },
  {
    date: '2026-07-05',
    title: '备用金借支（员工预借差旅费）',
    tags: ['出纳', '费用管理'],
    difficulty: 1,
    role: 'cashier',
    description: '行政部员工王芳预借差旅费2,000元，用于下周赴杭州出差，以现金支付。',
    tip: '员工预借差旅费属于备用金借支，不属于费用报销。借：其他应收款，贷：库存现金。待员工出差归来报销时，再冲减其他应收款，多退少补。',
    entries: [
      { subjectCode: '1221', summary: '王芳预借差旅费', debit: 2000, credit: 0, explanation: '其他应收款增加记借方。员工预借差旅费形成对员工的债权2,000元，待出差回来后凭票报销冲销。' },
      { subjectCode: '1001', summary: '王芳预借差旅费', debit: 0, credit: 2000, explanation: '库存现金减少记贷方。以现金支付员工预借差旅费2,000元，资产减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目1221），属于"支付其他与经营活动有关的现金"。'},
    ],
    documents: [
      { type: 'receipt', label: '借款单', docTitle: '员工借款单', date: '2026-07-05', totalAmount: 2000, stampText: '财务审核专用章',
        items: [{ name: '差旅费预借（王芳-杭州出差）', qty: 1, price: 2000, amount: 2000 }] },
      { type: 'text', label: '借款申请审批单', docTitle: '借款审批单', content: '借款人：王芳（行政部）\n借款事由：赴杭州出差预借差旅费\n借款金额：2,000元\n预计还款方式：出差归来后凭票报销\n审批人：行政主管 张主管', signature: '行政主管 张主管' },
    ],
  },
  {
    date: '2026-07-07',
    title: '银行转账付款（支付供应商货款）',
    tags: ['出纳', '商品采购', '资金管理'],
    difficulty: 1,
    role: 'cashier',
    description: '通过工商银行转账支付丙公司采购货款20,000元（部分付款）。',
    tip: '支付供应商货款时，出纳需根据采购合同和入库单核对付款金额。借：应付账款，贷：银行存款。注意核对供应商名称、账号和付款金额，确保准确无误。',
    entries: [
      { subjectCode: '220201', summary: '支付丙公司货款', debit: 20000, credit: 0, explanation: '应付账款-丙公司减少记借方。偿还丙公司部分采购货款20,000元，负债减少。' },
      { subjectCode: '100201', summary: '支付丙公司货款', debit: 0, credit: 20000, explanation: '银行存款减少记贷方。通过工行转账支付货款20,000元，资产减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目220201），属于"支付其他与经营活动有关的现金"。'},
    ],
    documents: [
      { type: 'bank', label: '付款回单', date: '2026-07-07', totalAmount: 20000, payer: '本公司', payeeName: '丙公司', content: '支付采购货款（部分付款）', refNo: 'HD202607070001' },
    ],
  },
  {
    date: '2026-07-08',
    title: '银行收款（收到客户汇款）',
    tags: ['出纳', '商品销售', '资金管理'],
    difficulty: 1,
    role: 'cashier',
    description: '收到甲公司通过工商银行汇来的货款50,000元，系上月赊销款项回款。',
    tip: '收到客户汇款后，出纳需及时查询银行到账情况，并登记银行存款日记账。借：银行存款，贷：应收账款。如汇款金额与应收金额不一致，需及时与客户沟通核实。',
    entries: [
      { subjectCode: '100201', summary: '收到甲公司货款', debit: 50000, credit: 0, explanation: '银行存款增加记借方。收到客户货款50,000元，资金增加。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目112201），属于经营活动现金流入——主营业务产生的现金收入。'},
      { subjectCode: '112201', summary: '收到甲公司货款', debit: 0, credit: 50000, explanation: '应收账款-甲公司减少记贷方。收回客户欠款50,000元，债权减少。' },
    ],
    documents: [
      { type: 'bank', label: '收款回单', date: '2026-07-08', totalAmount: 50000, payer: '甲公司', payeeName: '本公司', content: '货款（上月赊销款项）', refNo: 'HD202607080001' },
    ],
  },
  {
    date: '2026-07-09',
    title: '微信提现至银行',
    tags: ['出纳', '资金管理'],
    difficulty: 1,
    role: 'cashier',
    description: '将微信账户余额3,000元提现至工商银行账户。',
    tip: '微信提现是指将微信账户中的资金转入绑定的银行账户。借：银行存款-工行，贷：其他货币资金-微信账户。出纳应定期核对第三方支付平台余额，及时归集资金。',
    entries: [
      { subjectCode: '100201', summary: '微信提现至工行', debit: 3000, credit: 0, explanation: '银行存款增加记借方。微信提现3,000元转入工行账户，银行存款增加。' },
      { subjectCode: '101204', summary: '微信提现转出', debit: 0, credit: 3000, explanation: '其他货币资金-微信账户减少记贷方。微信余额减少3,000元，第三方支付平台资金减少。' },
    ],
    documents: [
      { type: 'bank', label: '微信提现记录', date: '2026-07-09', totalAmount: 3000, payer: '微信账户', payeeName: '本公司工行账户', content: '微信余额提现', refNo: 'WX20260709001' },
    ],
  },
  {
    date: '2026-07-10',
    title: '支付宝提现至银行',
    tags: ['出纳', '资金管理'],
    difficulty: 1,
    role: 'cashier',
    description: '将支付宝账户余额2,000元提现至工商银行账户。',
    tip: '支付宝提现操作与微信类似。借：银行存款-工行，贷：其他货币资金-支付宝账户。出纳应定期核对第三方支付平台余额，及时将资金归集到银行账户统一管理。',
    entries: [
      { subjectCode: '100201', summary: '支付宝提现至工行', debit: 2000, credit: 0, explanation: '银行存款增加记借方。支付宝提现2,000元转入工行账户，银行存款增加。' },
      { subjectCode: '101205', summary: '支付宝提现转出', debit: 0, credit: 2000, explanation: '其他货币资金-支付宝账户减少记贷方。支付宝余额减少2,000元，第三方支付平台资金减少。' },
    ],
    documents: [
      { type: 'bank', label: '支付宝提现记录', date: '2026-07-10', totalAmount: 2000, payer: '支付宝账户', payeeName: '本公司工行账户', content: '支付宝余额提现', refNo: 'ZFB20260710001' },
    ],
  },
  {
    date: '2026-07-12',
    title: '银行手续费',
    tags: ['出纳', '费用管理', '资金管理'],
    difficulty: 1,
    role: 'cashier',
    description: '工商银行收取本月账户管理费及转账手续费共180元。',
    tip: '银行手续费包括账户管理费、转账手续费等，银行通常直接从账户中扣收。借：财务费用，贷：银行存款。出纳需逐笔核对银行扣款金额，发现异常及时联系银行。',
    entries: [
      { subjectCode: '6603', summary: '银行手续费', debit: 180, credit: 0, explanation: '财务费用增加记借方。银行账户管理费及转账手续费180元，属于银行服务费用，计入财务费用。' },
      { subjectCode: '100201', summary: '银行手续费', debit: 0, credit: 180, explanation: '银行存款减少记贷方。银行直接扣收手续费180元，银行存款减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6603），属于"支付其他与经营活动有关的现金"。'},
    ],
    documents: [
      { type: 'bank', label: '银行扣款通知', date: '2026-07-12', totalAmount: 180, payer: '本公司', payeeName: '中国工商银行', content: '7月账户管理费及转账手续费', refNo: 'HD202607120001' },
    ],
  },
  {
    date: '2026-07-14',
    title: '购买支票本',
    tags: ['出纳', '资金管理'],
    difficulty: 1,
    role: 'cashier',
    description: '到工商银行购买现金支票和转账支票各一本，工本费及手续费共60元。',
    tip: '购买支票本时需填写票据购买申请书，银行收取工本费。借：财务费用，贷：银行存款。出纳需妥善保管支票本，使用时应按编号逐一登记。空白支票和印章必须由不同人员分管。',
    entries: [
      { subjectCode: '6603', summary: '购买支票本工本费', debit: 60, credit: 0, explanation: '财务费用增加记借方。购买支票本支付的工本费及手续费60元计入财务费用。' },
      { subjectCode: '100201', summary: '购买支票本', debit: 0, credit: 60, explanation: '银行存款减少记贷方。支付支票本工本费60元，银行存款减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6603），属于"支付其他与经营活动有关的现金"。'},
    ],
    documents: [
      { type: 'receipt', label: '支票工本费收据', docTitle: '中国工商银行收费凭证', date: '2026-07-14', totalAmount: 60, stampText: '中国工商银行 业务专用章',
        items: [{ name: '现金支票工本费', qty: 1, price: 30, amount: 30 }, { name: '转账支票工本费', qty: 1, price: 30, amount: 30 }] },
    ],
  },
  {
    date: '2026-07-15',
    title: '银行转账付款（支付物流运费）',
    tags: ['出纳', '商品销售', '资金管理'],
    difficulty: 1,
    role: 'cashier',
    description: '通过工商银行支付本月销售商品产生的物流运费2,500元。',
    tip: '物流运费是商品销售环节的必要支出，计入"销售费用-运输费"。借：销售费用-运输费，贷：银行存款。出纳付款时需核对物流对账单和发票金额。',
    entries: [
      { subjectCode: '660102', summary: '支付物流运费', debit: 2500, credit: 0, explanation: '销售费用-运输费增加记借方。本月商品销售产生的物流运费2,500元，属于销售环节费用。' },
      { subjectCode: '100201', summary: '支付物流运费', debit: 0, credit: 2500, explanation: '银行存款减少记贷方。支付物流运费2,500元，银行存款减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目660102），属于"支付其他与经营活动有关的现金"。'},
    ],
    documents: [
      { type: 'bank', label: '付款回单', date: '2026-07-15', totalAmount: 2500, payer: '本公司', payeeName: '顺丰物流有限公司', content: '支付7月物流运费', refNo: 'HD202607150002' },
    ],
  },
  {
    date: '2026-07-16',
    title: '银行转账付款（支付设备维修费）',
    tags: ['出纳', '费用管理'],
    difficulty: 1,
    role: 'cashier',
    description: '支付办公设备（打印机、空调）维修费1,500元，通过工商银行转账。',
    tip: '设备维修费属于企业管理费用。借：管理费用，贷：银行存款。出纳付款时需审核维修申请单和维修发票是否齐全。',
    entries: [
      { subjectCode: '6602', summary: '支付设备维修费', debit: 1500, credit: 0, explanation: '管理费用增加记借方。办公设备维修费1,500元属于日常管理支出，计入管理费用。' },
      { subjectCode: '100201', summary: '支付设备维修费', debit: 0, credit: 1500, explanation: '银行存款减少记贷方。支付维修费1,500元，银行存款减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6602），属于"支付其他与经营活动有关的现金"。'},
    ],
    documents: [
      { type: 'receipt', label: '维修费发票', docTitle: '增值税普通发票——设备维修', date: '2026-07-16', totalAmount: 1500, stampText: 'XX办公设备维修公司 发票专用章',
        items: [{ name: '打印机维修（更换硒鼓+定影器）', qty: 1, price: 800, amount: 800 }, { name: '空调维修（加氟+清洗）', qty: 1, price: 700, amount: 700 }] },
    ],
  },
  {
    date: '2026-07-18',
    title: '现金盘点',
    tags: ['出纳', '期末'],
    difficulty: 1,
    role: 'cashier',
    description: '对库存现金进行实地盘点，盘点结果：账面余额与实际库存相符，无盘盈盘亏。',
    tip: '现金盘点由出纳自行盘点，会计主管监盘。盘点后填写现金盘点表，双方签字确认。如发现现金溢余或短缺，需查明原因并及时处理。这是出纳的重要日常工作。',
    entries: [],
    documents: [
      { type: 'text', label: '现金盘点表', docTitle: '库存现金盘点表（2026年7月18日）', content: '盘点时间：2026年7月18日 17:00\n盘点人：出纳员\n监盘人：会计主管\n\n账面余额：18,500.00元\n实盘金额：18,500.00元\n盘点结果：账实相符\n\n备注：无盘盈盘亏。', stampText: '财务专用章', signature: '会计主管 李主管' },
    ],
  },
  {
    date: '2026-07-19',
    title: '编制资金日报',
    tags: ['出纳', '资金管理'],
    difficulty: 1,
    role: 'cashier',
    description: '编制7月第三周资金日报表，汇总本周现金及银行存款的收支情况。',
    tip: '资金日报是出纳必须编制的报表，反映当日现金和银行存款的收、支、余情况。通过资金日报，管理层可及时了解企业资金动态。出纳应确保日报数据准确、报送及时。',
    entries: [],
    documents: [
      { type: 'text', label: '资金日报表', docTitle: '资金日报表（2026年7月第三周）', content: '编制日期：2026年7月19日\n单位：元\n\n项目      期初余额    本期收入    本期支出    期末余额\n库存现金   20,000      5,000       7,000       18,000\n银行存款   800,000     55,000      23,740      831,260\n\n合计       820,000     60,000      30,740      849,260\n\n制表：出纳员  复核：会计主管', stampText: '财务专用章' },
    ],
  },
  {
    date: '2026-07-22',
    title: '缴纳社保费',
    tags: ['出纳', '工资社保'],
    difficulty: 2,
    role: 'cashier',
    description: '通过工商银行缴纳本月社会保险费13,500元（单位缴纳部分10,800元，个人代扣部分2,700元）。',
    tip: '社保费由单位承担和个人承担两部分组成，出纳需按月准时缴纳。借：应付职工薪酬-社保，贷：银行存款。缴费后可到社保局网站打印缴费凭证留档。',
    entries: [
      { subjectCode: '221102', summary: '缴纳本月社保费', debit: 13500, credit: 0, explanation: '应付职工薪酬-社保减少记借方。缴纳社保费13,500元，对社保机构的负债减少。' },
      { subjectCode: '100201', summary: '缴纳本月社保费', debit: 0, credit: 13500, explanation: '银行存款减少记贷方。通过工行缴纳社保费13,500元，资金减少。' , cashFlowItem: 'cf-op3', cashFlowExplanation: '支付职工薪酬相关支出（配对科目221102），属于"支付给职工以及为职工支付的现金"——经营活动现金流出。'},
    ],
    documents: [
      { type: 'bank', label: '社保缴费回单', date: '2026-07-22', totalAmount: 13500, payer: '本公司', payeeName: '上海市社会保险事业管理中心', content: '2026年7月社保费', refNo: 'HD202607220001' },
      { type: 'text', label: '社保缴费明细', docTitle: '上海市社保缴费通知单（7月）', content: '单位名称：本公司\n缴费月份：2026年7月\n\n养老保险（单位16%+个人8%）：\n医疗保险（单位9.5%+个人2%）：\n失业保险（单位0.5%+个人0.5%）：\n工伤保险（单位0.2%）：\n生育保险（单位1%）：\n\n单位合计：10,800元\n个人代扣：2,700元\n本月应缴合计：13,500元', stampText: '上海市社会保险事业管理中心 业务专用章' },
    ],
  },
  {
    date: '2026-07-24',
    title: '代扣代缴个人所得税',
    tags: ['出纳', '税费'],
    difficulty: 2,
    role: 'cashier',
    description: '通过工商银行缴纳本月代扣代缴的个人所得税2,250元。',
    tip: '企业作为扣缴义务人，需按月代扣员工个人所得税并上缴税务机关。借：其他应付款-代扣个税，贷：银行存款。个税申报期限为次月15日前，出纳需按时缴纳避免滞纳金。',
    entries: [
      { subjectCode: '2241', summary: '缴纳代扣个税', debit: 2250, credit: 0, explanation: '其他应付款减少记借方。缴纳代扣代缴的个人所得税2,250元，负债减少。企业作为扣缴义务人，需在发放工资时代扣个税并次月15日前上缴。' },
      { subjectCode: '100201', summary: '缴纳代扣个税', debit: 0, credit: 2250, explanation: '银行存款减少记贷方。通过工行缴纳个税2,250元，资金减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目2241），属于"支付其他与经营活动有关的现金"。'},
    ],
    documents: [
      { type: 'bank', label: '缴税回单', date: '2026-07-24', totalAmount: 2250, payer: '本公司', payeeName: '国家金库上海分库', content: '代扣代缴个人所得税（7月）', refNo: 'HD202607240001' },
    ],
  },
  {
    date: '2026-07-26',
    title: '费用报销（购买办公用品）',
    tags: ['出纳', '费用管理'],
    difficulty: 1,
    role: 'cashier',
    description: '行政部报销本月办公用品采购费1,500元（含打印纸、笔、文件夹等），以现金支付。',
    tip: '办公用品报销时，需审核发票、验收单和审批单是否齐全。借：管理费用-办公费，贷：库存现金。出纳付款后需在报销单上加盖现金付讫章。',
    entries: [
      { subjectCode: '660201', summary: '报销办公用品费', debit: 1500, credit: 0, explanation: '管理费用-办公费增加记借方。行政部办公用品采购费1,500元，计入管理费用。' },
      { subjectCode: '1001', summary: '报销办公用品费', debit: 0, credit: 1500, explanation: '库存现金减少记贷方。以现金支付办公用品报销款1,500元，资产减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目660201），属于"支付其他与经营活动有关的现金"。'},
    ],
    documents: [
      { type: 'receipt', label: '办公用品发票', docTitle: '增值税普通发票——办公用品', date: '2026-07-26', totalAmount: 1500, stampText: 'XX办公用品超市 发票专用章',
        items: [{ name: 'A4打印纸（5箱）', qty: 5, price: 120, amount: 600 }, { name: '中性笔（20盒）', qty: 20, price: 25, amount: 500 }, { name: '文件夹（30个）', qty: 30, price: 13.33, amount: 400 }] },
      { type: 'receipt', label: '费用报销单', docTitle: '费用报销单', date: '2026-07-26', totalAmount: 1500, stampText: '财务审核专用章',
        items: [{ name: '7月办公用品采购', qty: 1, price: 1500, amount: 1500 }] },
    ],
  },
  {
    date: '2026-07-27',
    title: '银行转账付款（支付供应商丁公司）',
    tags: ['出纳', '商品采购', '资金管理'],
    difficulty: 1,
    role: 'cashier',
    description: '通过工商银行转账支付丁公司采购货款20,000元。',
    tip: '出纳根据采购合同和入库单核对付款金额后办理转账。借：应付账款-丁公司，贷：银行存款。大额付款需双人复核（出纳制单+会计主管审核），确保资金安全。',
    entries: [
      { subjectCode: '220202', summary: '支付丁公司货款', debit: 20000, credit: 0, explanation: '应付账款-丁公司减少记借方。偿还丁公司采购货款20,000元，负债减少。' },
      { subjectCode: '100201', summary: '支付丁公司货款', debit: 0, credit: 20000, explanation: '银行存款减少记贷方。通过工行转账支付货款20,000元，资产减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目220202），属于"支付其他与经营活动有关的现金"。'},
    ],
    documents: [
      { type: 'bank', label: '付款回单', date: '2026-07-27', totalAmount: 20000, payer: '本公司', payeeName: '丁公司', content: '支付采购货款', refNo: 'HD202607270001' },
    ],
  },
  {
    date: '2026-07-31',
    title: '月末银行存款余额核对',
    tags: ['出纳', '期末'],
    difficulty: 1,
    role: 'cashier',
    description: '月末核对工商银行日记账余额与银行对账单是否一致，编制银行存款余额调节表。本月工行账户期初余额沿用上月，请注意核对本期所有借方和贷方发生额。',
    tip: '月末出纳必须核对银行日记账与银行对账单余额，如有未达账项需编制余额调节表。这是出纳每月必做的基础工作，确保资金安全。核对要点：逐笔勾对本月银行流水，标记未达账项，编制调节表。',
    entries: [],
    documents: [
      { type: 'text', label: '银行对账单', docTitle: '中国工商银行对账单（2026年7月）', content: '账号：xxxxxxxxxxxx\n\n本期借方发生额（收入）：\n  7/16 现销收款：135,600.00\n\n本期贷方发生额（支出）：\n  7/01 支付房租：6,000.00\n  7/03 支付广告费：8,000.00\n  7/04 支付水电费：2,500.00\n  7/06 购入低值易耗品：6,000.00\n  7/13 在途物资购入：45,200.00\n  7/15 现购商品：33,900.00\n  7/23 发放工资：45,000.00\n  7/29 缴纳增值税：13,000.00\n\n请与银行存款日记账逐笔勾对，如有差异编制余额调节表。\n\n注意事项：\n1. 赊购商品（丙公司56,500元）不涉及银行流水\n2. 赊销收款（鑫源商贸113,000元）尚未到账\n3. 在途物资到货入库为内部科目转换，不涉及银行\n4. 低值易耗品摊销为内部科目转换，不涉及银行\n5. 计提工资/折旧/利息为内部计提，不涉及银行', stampText: '中国工商银行 业务专用章' },
    ],
  },
]

export default tasks
