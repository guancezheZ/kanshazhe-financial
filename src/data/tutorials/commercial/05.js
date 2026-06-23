/**
 * 万悦超市 5月「劳动节促销」
 *
 * 月主题：劳动节促销 → 折扣券 → 买一赠一 → 供应商返利 → 月末结转
 * 特殊业务：🎯 折扣券（单项履约义务）、买一赠一、加班工资、供应商返利
 */

const tasks = [
  // ═══════════════════════════════════════════
  // 第一周：劳动节促销（5/1 - 5/7）
  // ═══════════════════════════════════════════
  {
    date: '2026-05-01',
    role: 'accountant',
    title: '劳动节加班工资计提',
    tags: ['工资社保'],
    difficulty: 3,
    description: '5月1日劳动节法定节假日，超市正常营业。收银员4人、理货员4人共8人加班，按300%计算加班费。日工资率=61,000÷21.75=2,804.60元/天，加班费=2,804.60÷15×8×1×300%=4,487.36元。月底随5月工资一并计提。',
    tip: '劳动节法定节假日加班按300%支付工资。依据《劳动法》第四十四条第三款。本日仅记录，月底随工资一并计提。',
    entries: [],
    documents: [{ type: 'text', label: '加班记录', docTitle: '劳动节加班人员统计表', stampText: '行政人事部',
      content: '劳动节（5月1日）加班统计\n加班人员：8人  加班天数：1天\n加班费标准：300%\n预估加班费：4,487.36元（月底随工资计提）' }]},
  {
    date: '2026-05-04',
    role: 'accountant',
    title: '🎯 折扣券促销-发放8折券',
    tags: ['商品销售'],
    difficulty: 3,
    description: '劳动节推出促销：消费满200元赠送8折折扣券。发放300张，预估使用率60%，平均额外消费150元。折扣券单独售价=150×300×60%×(1-80%)=5,400元。按新收入准则作为单项履约义务分摊交易价格。',
    tip: '折扣券若构成重大权利应作为单项履约义务。销售时按分摊比例将部分收入确认为合同负债（预收账款），待客户使用或过期时转入收入。增值税按全额计算。',
    entries: [
      { subjectCode: '100201', summary: '劳动节促销收款', debit: 135600, credit: 0, explanation: '银行存款增加。含税收入135,600元全额收存。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金。'},
      { subjectCode: '6001', summary: '商品销售收入（扣除折扣券分摊）', debit: 0, credit: 114858, explanation: '主营业务收入增加。按分摊后金额确认114,858元。折扣券分摊5,142元确认为合同负债。' },
      { subjectCode: '2203', summary: '折扣券分摊-合同负债', debit: 0, credit: 5142, explanation: '预收账款增加。折扣券分摊5,142元确认为合同负债，待客户使用时确认收入。' },
      { subjectCode: '222101', summary: '增值税销项税额', debit: 0, credit: 15600, explanation: '应交税费-应交增值税（销项税额）增加。增值税按全额计算。' }],
    documents: [{ type: 'text', label: '折扣券活动方案', docTitle: '劳动节折扣券促销活动方案', stampText: '市场部',
      content: '劳动节折扣券促销活动方案\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n一、活动规则\n  活动期间：2026年5月4日起\n  条件：消费满200元即送8折折扣券一张\n  发放数量：300张\n  有效期：30天\n  预估使用率：60%（约180张）\n\n二、会计处理依据（CAS 14第三十五条）\n  折扣券构成重大权利，作为单项履约义务\n\n三、收入分摊计算\n  预估额外消费金额：150元/张×180张=27,000元\n  折扣金额：27,000×20%=5,400元\n  折扣券单独售价：5,400元\n  ─────────────────────────────\n  合同负债-折扣券：5,142元（不含税）\n  商品收入：120,000-5,142=114,858元\n\n市场部  2026年5月4日' }]},
  {
    date: '2026-05-06',
    role: 'accountant',
    title: '食品饮料补货（现购）',
    tags: ['商品采购', '税费'],
    difficulty: 2,
    description: '劳动节后补货食品饮料28,000元（不含税），增值税3,640元，价税合计31,640元，以工商银行存款支付。',
    tip: '现购商品：借：库存商品/应交税费-进项税额，贷：银行存款。注意取得增值税专用发票方可抵扣进项税。',
    entries: [
      { subjectCode: '1405', summary: '食品补货入库', debit: 28000, credit: 0, explanation: '库存商品增加。食品饮料28,000元验收入库。' },
      { subjectCode: '222101', summary: '进项税额', debit: 3640, credit: 0, explanation: '应交税费-应交增值税（进项税额）增加。取得专票可抵扣。' },
      { subjectCode: '100201', summary: '支付货款', debit: 0, credit: 31640, explanation: '银行存款减少。' , cashFlowItem: 'cf-op2', cashFlowExplanation: '采购存货/商品支出。'}],
    documents: [{ type: 'invoice', label: '增值税专用发票', region: '上海', invoiceNo: '3100678901', date: '2026-05-06', buyer: '本公司', seller: '鑫鑫食品有限公司',
      lineItems: [{ name: '食品', unit: '箱', qty: 280, price: 100, amount: 28000 }], totalAmount: 31640, taxRate: '13%', taxAmount: 3640 },
      { type: 'text', label: '商品入库验收单', docTitle: '商品入库验收单', content: '商品入库验收单\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n供应商：鑫鑫食品有限公司\n入库日期：2026-05-06\n订单号：CG20260506004\n\n商品验收明细：\n1. 休闲食品  280箱 × 100.00元 = 28,000.00元 ✓\n─────────────────────────────────\n合计金额：28,000.00元（不含税）\n进项税额（13%）：3,640.00元\n价税合计：31,640.00元\n\n质量检验：包装完好、生产日期良好 ✓\n\n入库保管：赵保管  验收：钱验收', signature: '仓库验收专用章' }]},
  {
    date: '2026-05-07',
    role: 'accountant',
    title: '买一赠一促销活动',
    tags: ['商品销售'],
    difficulty: 3,
    description: '买一赠一活动：购买A品牌洗发水一瓶（售价48元），送同品牌护发素一支（售价28元）。销售500组，含税总收入24,000元。按公允价值比例分摊收入并结转成本：主商品成本15,000元+赠品成本7,500元。',
    tip: '买一赠一实质是组合销售，应按公允价值比例分摊收入。增值税方面不视为"无偿赠送"（分摊后各按分摊金额计税）。注意与"赠品视同销售"的区别。',
    entries: [
      { subjectCode: '100201', summary: '买一赠一收款', debit: 24000, credit: 0, explanation: '银行存款增加。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金。'},
      { subjectCode: '6001', summary: '主商品收入（分摊）', debit: 0, credit: 13274.34, explanation: '主营业务收入增加。15,000÷1.13≈13,274.34元。' },
      { subjectCode: '6001', summary: '赠品收入（分摊）', debit: 0, credit: 7964.6, explanation: '主营业务收入增加。9,000÷1.13≈7,964.60元。' },
      { subjectCode: '222101', summary: '增值税销项合计', debit: 0, credit: 2761.06, explanation: '应交税费-应交增值税（销项税额）增加。(15,000+9,000)÷1.13×13%=2,761.06元。' },
      { subjectCode: '6401', summary: '结转主商品成本', debit: 15000, credit: 0, explanation: '主营业务成本增加。500瓶×30元=15,000元。' },
      { subjectCode: '6401', summary: '结转赠品成本', debit: 7500, credit: 0, explanation: '主营业务成本增加。500支×15元=7,500元。' },
      { subjectCode: '1405', summary: '商品出库', debit: 0, credit: 22500, explanation: '库存商品减少。主商品15,000+赠品7,500=22,500元。' }],
    documents: [{ type: 'text', label: '买一赠一汇总表', docTitle: '买一赠一促销活动汇总表', stampText: '财务专用章',
      content: '买一赠一促销活动汇总表\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n活动：购买A品牌洗发水（48元）赠同品牌护发素（28元）\n销售数量：500组\n含税总收入：24,000.00元\n\n收入分摊（按公允价值比例）：\n  主商品：48/(48+28)=63.16% → 15,157.89元\n  赠品：28/(48+28)=36.84% → 8,842.11元\n  ─────────────────────────────────\n  合计不含税收入：24,000/1.13=21,238.94元\n  增值税：2,761.06元\n\n成本结转：\n  主商品成本：500瓶×30元=15,000.00元\n  赠品成本：500支×15元=7,500.00元\n  合计：22,500.00元' }]},

  // ═══════════════════════════════════════════
  // 第二周：日常经营（5/8 - 5/15）
  // ═══════════════════════════════════════════
  {
    date: '2026-05-08',
    role: 'accountant',
    title: '发放4月员工工资',
    tags: ['工资社保'],
    difficulty: 1,
    description: '通过工商银行发放4月员工工资61,000元。',
    tip: '通过银行代发上月工资时：借：应付职工薪酬-工资，贷：银行存款。发放后冲减计提时确认的应付职工薪酬负债。注意核对代扣代缴项目。',
    entries: [
      { subjectCode: '221101', summary: '发放4月工资', debit: 61000, credit: 0, explanation: '应付职工薪酬-工资减少。' },
      { subjectCode: '100201', summary: '发放4月工资', debit: 0, credit: 61000, explanation: '银行存款减少。' , cashFlowItem: 'cf-op3', cashFlowExplanation: '支付职工薪酬相关支出。'}],
    documents: [{ type: 'bank', label: '代发工资回单', date: '2026-05-08', totalAmount: 61000, payer: '本公司', payeeName: '员工代发工资户', content: '2026年4月工资', refNo: 'HD202605080001' }]},
  {
    date: '2026-05-09',
    role: 'accountant',
    title: '日用品补货（赊购）',
    tags: ['商品采购', '往来管理'],
    difficulty: 2,
    description: '向洁宝日化赊购日用品25,000元（不含税），增值税3,250元，价税合计28,250元，货款未付。',
    tip: '赊购商品形成应付账款。借：库存商品/应交税费-进项税额，贷：应付账款-供应商。',
    entries: [
      { subjectCode: '1405', summary: '日用品入库', debit: 25000, credit: 0, explanation: '库存商品增加。' },
      { subjectCode: '222101', summary: '进项税额', debit: 3250, credit: 0, explanation: '应交税费-应交增值税（进项税额）增加。' },
      { subjectCode: '220203', summary: '赊购款未付', debit: 0, credit: 28250, explanation: '应付账款增加。' }],
    documents: [{ type: 'invoice', label: '增值税专用发票', region: '广东', invoiceNo: '4400789013', date: '2026-05-09', buyer: '万悦超市有限公司', seller: '洁宝日化有限公司',
      lineItems: [{ name: '日用品', unit: '箱', qty: 200, price: 125, amount: 25000 }], totalAmount: 28250, taxRate: '13%', taxAmount: 3250 },
      { type: 'text', label: '商品入库验收单', docTitle: '商品入库验收单', content: '商品入库验收单\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n供应商：洁宝日化有限公司\n入库日期：2026-05-09\n订单号：CG20260509005\n\n商品验收明细：\n1. 日用品  200箱 × 125.00元 = 25,000.00元 ✓\n─────────────────────────────────\n合计金额：25,000.00元（不含税）\n进项税额（13%）：3,250.00元\n价税合计：28,250.00元\n\n质量检验：包装完好、生产日期良好 ✓\n\n入库保管：赵保管  验收：钱验收', signature: '仓库验收专用章' }]},
  {
    date: '2026-05-10',
    role: 'accountant',
    title: '联营专柜4月结算',
    tags: ['往来管理'],
    difficulty: 3,
    description: '结算美肌堂4月联营销售。含税总额76,000元，佣金22%=16,720元，应付美肌堂59,280元。以工商银行转账支付。',
    tip: '联营专柜月结时，按含税销售额扣除佣金后的净额支付给供应商。借：应付账款-联营供应商，贷：银行存款。注意与净额法佣金收入相区分。',
    entries: [
      { subjectCode: '222101', summary: '佣金进项发票', debit: 946.42, credit: 0, explanation: '应交税费-应交增值税（进项税额）增加。16,720÷1.06×6%=946.42元。' },
      { subjectCode: '6601', summary: '联营佣金费用', debit: 15773.58, credit: 0, explanation: '销售费用增加。' },
      { subjectCode: '220203', summary: '支付美肌堂货款', debit: 59280, credit: 0, explanation: '应付账款减少。' },
      { subjectCode: '100201', summary: '结算联营货款', debit: 0, credit: 76000, explanation: '银行存款减少。' , cashFlowItem: 'cf-op2', cashFlowExplanation: '采购存货/商品支出。'}],
    documents: [
      { type: 'text', label: '联营结算单', docTitle: '联营专柜结算单（2026年4月）', stampText: '联营结算专用章',
        content: '联营专柜结算单\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n供应商：美肌堂化妆品有限公司\n结算期间：2026年4月\n\n含税销售额：76,000.00元\n扣点率：22%\n超市佣金（含税）：16,720.00元\n佣金的增值税（6%）：946.42元\n佣金净收入：15,773.58元\n\n应付供应商净额：59,280.00元（76,000×78%）\n\n制表：李会计  审核：赵会计主管  联营商确认：美肌堂' },
      { type: 'bank', label: '转账回单', date: '2026-05-10', totalAmount: 76000, payer: '本公司', payeeName: '美肌堂化妆品有限公司', content: '联营专柜4月结算款', refNo: 'HD202605100001' }]},
  {
    date: '2026-05-12',
    role: 'accountant',
    title: '生鲜补货（现购）',
    tags: ['商品采购', '税费'],
    difficulty: 2,
    description: '向绿源农业采购生鲜22,000元（不含税），增值税1,980元（9%），价税合计23,980元付讫。',
    tip: '生鲜商品增值税税率9%（低税率）。现购时：借：库存商品/应交税费-进项税额（9%），贷：银行存款。',
    entries: [
      { subjectCode: '1405', summary: '生鲜入库', debit: 22000, credit: 0, explanation: '库存商品增加。' },
      { subjectCode: '222101', summary: '进项税额（9%）', debit: 1980, credit: 0, explanation: '增值税进项税额增加记借方。取得专用发票可抵扣。' },
      { subjectCode: '100201', summary: '支付货款', debit: 0, credit: 23980, explanation: '银行存款减少。' , cashFlowItem: 'cf-op2', cashFlowExplanation: '采购存货/商品支出。'}],
    documents: [{ type: 'invoice', label: '增值税普通发票（农产品）', region: '上海', invoiceNo: '3101012345', date: '2026-05-12', buyer: '万悦超市有限公司', seller: '绿源农业有限公司',
      lineItems: [{ name: '蔬菜', unit: '斤', qty: 800, price: 5, amount: 4000 }, { name: '水果', unit: '斤', qty: 600, price: 12, amount: 7200 }, { name: '鲜肉', unit: '斤', qty: 500, price: 20, amount: 10000 }],
      totalAmount: 23980, taxRate: '9%', taxAmount: 1980 },
      { type: 'text', label: '生鲜验收单', docTitle: '生鲜商品验收单', content: '生鲜商品验收单\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n供应商：绿源农业有限公司\n入库日期：2026-05-12\n订单号：CG20260512006\n\n验收明细：\n1. 蔬菜   800斤 × 5.00元 = 4,000.00元 ✓\n2. 水果   600斤 × 12.00元 = 7,200.00元 ✓\n3. 鲜肉   500斤 × 20.00元 = 10,000.00元 ✓\n──────────────────────────────\n合计金额：21,200.00元（不含税）\n进项税额（9%）：1,908.00元\n价税合计：23,108.00元\n\n验收结论：全部合格 ✓\n验收人：钱验收  保管员：赵保管', signature: '生鲜验收专用章' }]},
  {
    date: '2026-05-15',
    role: 'accountant',
    title: '💵 供应商返利入账',
    tags: ['商品采购'],
    difficulty: 3,
    description: '收到鑫鑫食品有限公司上半年采购返利5,000元（采购金额约250,000元的2%），已存入工商银行。返利冲减主营业务成本。',
    tip: '供应商返利实质是对采购成本的调整。收到返利时冲减主营业务成本，不确认为收入。借：银行存款，贷：主营业务成本。注意返利不是营业收入。',
    entries: [
      { subjectCode: '100201', summary: '收到鑫鑫食品返利', debit: 5000, credit: 0, explanation: '银行存款增加。收到采购返利5,000元。' , cashFlowItem: 'cf-op5', cashFlowExplanation: '其他经营活动现金流入。'},
      { subjectCode: '6401', summary: '冲减主营业务成本（返利）', debit: 0, credit: 5000, explanation: '主营业务成本减少。供应商返利实质为采购成本调整，依据CAS 1应用指南。' }],
    documents: [
      { type: 'bank', label: '收款回单', date: '2026-05-15', totalAmount: 5000, payer: '鑫鑫食品有限公司', payeeName: '本公司', content: '2026年上半年采购返利', refNo: 'HD202605150001' },
      { type: 'text', label: '返利计算表', docTitle: '供应商返利计算表', stampText: '财务专用章',
        content: '供应商返利计算表\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n供应商：鑫鑫食品有限公司\n返利期间：2026年1月-5月\n\n采购金额汇总：约250,000.00元\n返利比例：2%（按采购合同约定）\n返利金额：5,000.00元\n\n会计处理依据：\n供应商返利实质为采购成本调整\n冲减主营业务成本，不确认为收入\nCAS 1——存货准则应用指南\n\n已存入工商银行 ✓\n\n制表：李会计  审核：赵会计主管' }]},

  // ═══════════════════════════════════════════
  // 第三周：月末（5/16 - 5/31）
  // ═══════════════════════════════════════════
  {
    date: '2026-05-16',
    role: 'accountant',
    title: '计提5月员工工资（含劳动节加班）',
    tags: ['工资社保'],
    difficulty: 2,
    description: '计提5月工资。基础61,000元+加班4,487.36元=65,487.36元。管理岗约8,600元，一线约56,887元。',
    tip: '月末计提当月工资，体现权责发生制。劳动节加班工资按300%计算，需并入当月工资总额。借：管理费用/销售费用，贷：应付职工薪酬-工资。',
    entries: [
      { subjectCode: '660203', summary: '店长5月工资及加班', debit: 8600, credit: 0, explanation: '管理费用-工资薪金增加。' },
      { subjectCode: '6601', summary: '一线员工5月工资及加班', debit: 56887.36, credit: 0, explanation: '销售费用增加。' },
      { subjectCode: '221101', summary: '计提5月工资', debit: 0, credit: 65487.36, explanation: '应付职工薪酬-工资增加。含加班费4,487.36元。' }],
    documents: [{ type: 'text', label: '工资计算表', docTitle: '2026年5月工资计算表（含劳动节加班）', stampText: '人力资源部',
      content: '2026年5月工资计算表（含劳动节加班）\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n一、工资基数\n  基础工资：61,000.00元（14人×平均4,357元）\n\n二、劳动节加班（5月1日，法定节假日）\n  加班人数：8人（收银4人+理货4人）\n  日工资率：61,000÷21.75=2,804.60元/天\n  加班费：2,804.60÷15×8×300%=4,487.36元\n  法律依据：《劳动法》第四十四条第三款\n\n三、工资分配\n  管理费用（店长）：8,600.00元\n  销售费用（一线）：56,887.36元\n  合计：65,487.36元' }]},
  {
    date: '2026-05-18',
    role: 'accountant',
    title: '支付水电费',
    tags: ['费用管理'],
    difficulty: 1,
    description: '支付5月水电费8,800元（电费7,600+水费1,200）。',
    tip: '水电费计入销售费用。借：销售费用-水电费，贷：银行存款。注意取得增值税专用发票。',
    entries: [
      { subjectCode: '6602', summary: '5月水电费', debit: 8800, credit: 0, explanation: '管理费用增加。' },
      { subjectCode: '100201', summary: '支付水电费', debit: 0, credit: 8800, explanation: '银行存款减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出。'}],
    documents: [{ type: 'receipt', label: '电费发票', date: '2026-05-18', totalAmount: 7600, items: [{ name: '5月电费', qty: 1, price: 7600, amount: 7600 }] }]},
  {
    date: '2026-05-20',
    role: 'accountant',
    title: '生鲜损耗处理',
    tags: ['仓存管理'],
    difficulty: 2,
    description: '本月生鲜正常损耗1,950元，计入管理费用。',
    tip: '生鲜自然损耗计入管理费用。正常损耗小金额无需进项转出。借：管理费用，贷：库存商品。',
    entries: [
      { subjectCode: '6602', summary: '生鲜正常损耗', debit: 1950, credit: 0, explanation: '管理费用增加。正常损耗无需进项转出。' },
      { subjectCode: '1405', summary: '损耗出库', debit: 0, credit: 1950, explanation: '库存商品减少。' }],
    documents: [{ type: 'text', label: '生鲜损耗报告单', docTitle: '生鲜商品损耗报告（2026年5月）', stampText: '生鲜部专用章',
      content: `生鲜商品损耗报告
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
期间：2026年5月

品类       金额     损耗率    原因
──────────────────────────────
蔬菜       800元     5%      自然损耗
水果       650元     4%      轻微碰伤
鲜肉       500元     3%      水分流失
──────────────────────────────
合计     1,950.00元   —
损耗性质：正常合理损耗 ✓
店长审批：同意 ☑` }]},
  {
    date: '2026-05-22',
    role: 'accountant',
    title: '折扣券使用确认',
    tags: ['商品销售'],
    difficulty: 3,
    description: '已使用折扣券120张，平均消费160元，折扣金额3,840元。冲减合同负债并确认收入。',
    tip: '折扣券属于附有额外购买选择权的销售。根据CAS 14，使用时冲减合同负债并确认收入。借：合同负债，贷：主营业务收入、应交税费-销项税额。',
    entries: [
      { subjectCode: '2203', summary: '折扣券使用冲减合同负债', debit: 3840, credit: 0, explanation: '预收账款减少。折扣券使用，冲减此前计提的合同负债。' },
      { subjectCode: '6001', summary: '折扣券使用确认收入', debit: 0, credit: 3840, explanation: '主营业务收入增加。' }],
    documents: [{ type: 'text', label: '折扣券使用汇总', docTitle: '折扣券使用情况汇总表', stampText: '财务专用章',
      content: '折扣券使用情况汇总表\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n已使用折扣券：120张\n使用率：120/300=40%\n平均消费金额：160元/张\n折扣金额合计：120张×160元×20%=3,840.00元\n\n合同负债变动：\n  初始确认：5,142.00元\n  本期使用：-3,840.00元\n  剩余余额：1,302.00元\n\n制表：李会计  审核：赵会计主管' }]},
  {
    date: '2026-05-25',
    role: 'accountant',
    title: '联营专柜5月销售汇总入账',
    tags: ['商品销售'],
    difficulty: 3,
    description: '美肌堂5月含税销售额52,000元。按净额法确认：佣金11,440元（含税），不含税10,792.45元，增值税647.55元（6%）。',
    tip: '联营专柜按净额法确认收入。超市仅按扣点佣金确认收入。借：银行存款，贷：应付账款-美肌堂（货款净额）、主营业务收入-佣金（扣点部分）、应交税费-销项（6%）。',
    entries: [
      { subjectCode: '100201', summary: '联营销售收款', debit: 52000, credit: 0, explanation: '银行存款增加。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金。'},
      { subjectCode: '220203', summary: '应付美肌堂货款净额', debit: 0, credit: 40560, explanation: '应付账款增加。52,000×78%=40,560元。' },
      { subjectCode: '6001', summary: '联营佣金收入（净额法）', debit: 0, credit: 10792.45, explanation: '主营业务收入增加。净额法确认。' },
      { subjectCode: '222101', summary: '联营佣金增值税（6%）', debit: 0, credit: 647.55, explanation: '应交税费-应交增值税（销项税额）增加。' }],
    documents: [{ type: 'text', label: '联营销售汇总', docTitle: '联营专柜销售汇总（2026年5月）', stampText: '联营结算专用章',
      content: '联营专柜销售汇总（2026年5月）\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n专柜：美肌堂化妆品专柜\n期间：2026年5月1日-5月31日\n\n含税销售额：52,000.00元\n扣点率：22%\n超市佣金（含税）：11,440.00元\n佣金增值税（6%）：647.55元\n佣金净收入：10,792.45元\n\n应付供应商（78%）：40,560.00元\n\n收入确认方式：净额法（超市为代理人）' }]},
  {
    date: '2026-05-26',
    role: 'accountant',
    title: '结转已销商品成本（全月）',
    tags: ['商品销售', '仓存管理'],
    difficulty: 3,
    description: '结转5月自营商品成本206,500元（含买一赠一22,500元），扣除返利后净成本201,500元。',
    tip: '月末汇总结转自营商品成本。移动加权平均法计算。借：主营业务成本，贷：库存商品。',
    entries: [
      { subjectCode: '6401', summary: '结转5月自营成本', debit: 206500, credit: 0, explanation: '主营业务成本增加。' },
      { subjectCode: '1405', summary: '各品类出库', debit: 0, credit: 206500, explanation: '库存商品减少。' }],
    documents: [{ type: 'text', label: '成本计算表', docTitle: '商品销售成本计算表（2026年5月）', stampText: '财务专用章',
      content: '商品销售成本计算表（2026年5月）\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n一、自营商品成本\n  商品销售出库：184,000.00元\n  买一赠一促销成本：22,500.00元\n  小计：206,500.00元\n\n二、供应商返利冲减\n  鑫鑫食品返利：-5,000.00元\n  ─────────────────────────────\n  净成本：201,500.00元\n\n计算方式：移动加权平均法\n\n制表：李会计  审核：赵会计主管' }]},
  {
    date: '2026-05-28',
    role: 'accountant',
    title: '期末结转损益',
    tags: ['期末'],
    difficulty: 3,
    description: '月末结转损益类科目余额至本年利润。',
    tip: '月末结转损益科目至本年利润。收入类转入贷方，费用类转入借方。半年度需做财务分析总结。',
    entries: [
      { subjectCode: '6001', debit: 385000, credit: 0, summary: '结转主营业务收入', explanation: '含自营、联营佣金、折扣券≈385,000元。' },
      { subjectCode: '6401', debit: 0, credit: 201500, summary: '结转主营业务成本', explanation: '已扣返利。' },
      { subjectCode: '6403', debit: 0, credit: 2450, summary: '结转税金及附加', explanation: '税金及附加结转至本年利润。借：本年利润，贷：税金及附加。' },
      { subjectCode: '6601', debit: 0, credit: 72661, summary: '结转销售费用', explanation: '一线工资56,887+联营佣金15,774。' },
      { subjectCode: '6602', debit: 0, credit: 10750, summary: '结转管理费用', explanation: '水电8,800+损耗1,950=10,750。' },
      { subjectCode: '660203', debit: 0, credit: 8600, summary: '结转管理费用-工资薪金', explanation: '店长工资含加班。' },
      { subjectCode: '6603', debit: 170, credit: 0, summary: '结转财务费用（净利息收入）', explanation: '财务费用结转至本年利润。借：本年利润，贷：财务费用。' },
      { subjectCode: '4103', debit: 0, credit: 89209, summary: '结转净利润', explanation: '=385,170-296,961=88,209元。累计≈313,901元。' }
    ],
    documents: [{ type: 'text', label: '损益计算表', docTitle: '2026年5月损益计算表', stampText: '财务专用章',
      content: '2026年5月损益计算表（万悦超市）\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n一、营业收入                385,000.00元\n  主营业务收入             385,000.00元\n\n二、营业成本               -201,500.00元\n  （已扣供应商返利5,000元）\n\n三、税金及附加              -2,450.00元\n\n四、销售费用               -72,661.00元\n  一线工资及加班：56,887.36元\n  联营佣金：15,773.58元\n\n五、管理费用               -19,350.00元\n  店长工资及加班：8,600元\n  水电费：8,800元\n  生鲜损耗：1,950元\n\n六、财务费用（净利息收入）     +170.00元\n\n七、本月净利润                88,209.00元\n八、累计净利润（1-5月）      313,901.00元' }]},
  {
    date: '2026-05-31',
    role: 'accountant',
    title: '模拟纳税申报',
    tags: ['期末', '申报'],
    difficulty: 1,
    description: '完成5月模拟纳税申报。',
    tip: '前往纳税申报页面核对数据后完成申报。半年末注意检查增值税累计数据。',
    entries: [],
    nextAction: 'tax-filing',
    documents: [{ type: 'text', label: '纳税申报提醒', docTitle: '2026年5月纳税申报提醒', stampText: '财务专用章',
      content: '增值税约24,500元 | 城建税1,715元 | 教育费附加735元\n请前往纳税申报页面提交。' }]},
  {
    date: '2026-05-03',
    role: 'accountant',
    title: 'POS劳动节假期销售',
    tags: ['商品销售'],
    difficulty: 1,
    description: '劳动节假期POS销售含税收入45,200元（不含税40,000元，增值税5,200元），已收存银行。',
    tip: '劳动节假期POS销售收入按正常销售处理。按支付方式分别入账。注意节假日促销可能产生较多折扣，需正确核算折扣金额。',
    entries: [
      { subjectCode: '100201', summary: 'POS收款', debit: 45200, credit: 0, explanation: '银行存款增加。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金。'},
      { subjectCode: '6001', summary: '销售收入', debit: 0, credit: 40000, explanation: '主营业务收入增加。' },
      { subjectCode: '222101', summary: '销项税', debit: 0, credit: 5200, explanation: '应交税费-应交增值税（销项税额）增加。' }],
    documents: [{ type: 'text', label: 'POS日结单', docTitle: 'POS收银系统日结单（2026年5月3日·劳动节假期）', stampText: '收银专用章',
      content: `万悦超市 POS日结单
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
日期：2026年5月3日（劳动节假期）

交易统计：约380笔  客单价：约119元

支付方式明细：
  微信支付：  17,600.00元（38.9%）
  支付宝：     9,900.00元（21.9%）
  银行卡：    12,700.00元（28.1%）
  现金：       5,000.00元（11.1%）
  ─────────────────────────────
  合计含税：  45,200.00元
  不含税收入： 40,000.00元
  增值税：      5,200.00元` }]},
  {
    date: '2026-05-05',
    role: 'accountant',
    title: '生鲜补货',
    tags: ['商品采购', '税费'],
    difficulty: 2,
    description: '向绿源农业采购生鲜16,000元（不含税），增值税1,440元（9%），价税合计17,440元付讫。',
    tip: '生鲜商品增值税税率9%。采购时注意税率。借：库存商品/应交税费-进项（9%），贷：银行存款。',
    entries: [
      { subjectCode: '1405', summary: '生鲜入库', debit: 16000, credit: 0, explanation: '库存商品增加。' },
      { subjectCode: '222101', summary: '进项税额', debit: 1440, credit: 0, explanation: '增值税进项税额增加记借方。取得专用发票可抵扣。' },
      { subjectCode: '100201', summary: '支付货款', debit: 0, credit: 17440, explanation: '银行存款减少记贷方。支付采购货款。' , cashFlowItem: 'cf-op2', cashFlowExplanation: '采购存货/商品支出。'}],
    documents: [{ type: 'invoice', label: '增值税普通发票', region: '上海', invoiceNo: '3100567801', date: '2026-05-05', buyer: '万悦超市有限公司', seller: '绿源农业有限公司', totalAmount: 17440, taxRate: '9%', taxAmount: 1440,
      lineItems: [{ name: '蔬菜', unit: '斤', qty: 600, price: 5, amount: 3000 }, { name: '水果', unit: '斤', qty: 500, price: 12, amount: 6000 }, { name: '鲜肉', unit: '斤', qty: 350, price: 20, amount: 7000 }] },
      { type: 'text', label: '生鲜验收单', docTitle: '生鲜商品验收单', content: '生鲜商品验收单\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n供应商：绿源农业有限公司\n入库日期：2026-05-05\n订单号：CG20260505002\n\n验收明细：\n1. 蔬菜   600斤 × 5.00元 = 3,000.00元 ✓\n2. 水果   500斤 × 12.00元 = 6,000.00元 ✓\n3. 鲜肉   350斤 × 20.00元 = 7,000.00元 ✓\n──────────────────────────────\n合计金额：16,000.00元（不含税）\n进项税额（9%）：1,440.00元\n价税合计：17,440.00元\n\n验收结论：全部合格 ✓\n验收人：钱验收  保管员：赵保管', signature: '生鲜验收专用章' }]},
  {
    date: '2026-05-06',
    role: 'accountant',
    title: 'POS日常销售',
    tags: ['商品销售'],
    difficulty: 1,
    description: 'POS日常销售含税收入50,850元（不含税45,000元，增值税5,850元）。',
    tip: 'POS日常销售收入按支付方式分别入账。微信/支付宝计入"其他货币资金"，银行卡计入"银行存款"，现金计入"库存现金"。每日POS日结单汇总入账。借记各收款科目，贷记主营业务收入和应交税费-销项税额。',
    entries: [
      { subjectCode: '100201', summary: 'POS收款', debit: 50850, credit: 0, explanation: '银行存款增加。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金。'},
      { subjectCode: '6001', summary: '收入', debit: 0, credit: 45000, explanation: '销售收入增加记贷方。不含税金额贷记主营业务收入。' },
      { subjectCode: '222101', summary: '销项税', debit: 0, credit: 5850, explanation: '增值税销项税额增加记贷方。销售商品适用13%税率。' }],
    documents: [{ type: 'text', label: 'POS日结单', docTitle: 'POS收银系统日结单（2026年5月6日）', stampText: '收银专用章',
      content: `万悦超市 POS日结单
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
日期：2026年5月6日

交易统计：约420笔  客单价：约121元

支付方式明细：
  微信支付：  19,800.00元（38.9%）
  支付宝：    11,150.00元（21.9%）
  银行卡：    14,250.00元（28.0%）
  现金：       5,650.00元（11.1%）
  ─────────────────────────────
  合计含税：  50,850.00元
  不含税收入： 45,000.00元
  增值税：      5,850.00元` }]},
  {
    date: '2026-05-11',
    role: 'accountant',
    title: '银行手续费',
    tags: ['资金管理'],
    difficulty: 1,
    description: '工商银行扣收5月账户管理费及转账手续费215元。',
    tip: '银行手续费计入财务费用。借：财务费用-手续费，贷：银行存款。',
    entries: [
      { subjectCode: '6603', summary: '手续费', debit: 215, credit: 0, explanation: '财务费用增加。' },
      { subjectCode: '100201', summary: '银行扣费', debit: 0, credit: 215, explanation: '银行存款减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出。'}],
    documents: [{ type: 'bank', label: '银行扣费回单', date: '2026-05-11', totalAmount: 215, payer: '本公司', payeeName: '工商银行', content: '5月手续费', refNo: 'HD202605110001' }]},
  {
    date: '2026-05-13',
    role: 'accountant',
    title: 'POS日常销售',
    tags: ['商品销售'],
    difficulty: 1,
    description: 'POS日常销售含税收入67,800元（不含税60,000元，增值税7,800元）。',
    tip: 'POS日常销售收入按支付方式分别入账。微信/支付宝计入"其他货币资金"，银行卡计入"银行存款"，现金计入"库存现金"。每日POS日结单汇总入账。借记各收款科目，贷记主营业务收入和应交税费-销项税额。',
    entries: [
      { subjectCode: '100201', summary: 'POS收款', debit: 67800, credit: 0, explanation: '银行存款增加。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金。'},
      { subjectCode: '6001', summary: '收入', debit: 0, credit: 60000, explanation: '销售收入增加记贷方。不含税金额贷记主营业务收入。' },
      { subjectCode: '222101', summary: '销项税', debit: 0, credit: 7800, explanation: '增值税销项税额增加记贷方。销售商品适用13%税率。' }],
    documents: [{ type: 'text', label: 'POS日结单', docTitle: 'POS收银系统日结单（2026年5月13日）', stampText: '收银专用章',
      content: `万悦超市 POS日结单
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
日期：2026年5月13日

交易统计：约560笔  客单价：约121元

支付方式明细：
  微信支付：  26,400.00元（38.9%）
  支付宝：    14,900.00元（22.0%）
  银行卡：    19,000.00元（28.0%）
  现金：       7,500.00元（11.1%）
  ─────────────────────────────
  合计含税：  67,800.00元
  不含税收入： 60,000.00元
  增值税：      7,800.00元` }]},
  {
    date: '2026-05-14',
    role: 'accountant',
    title: '预付卡消费确认',
    tags: ['商品销售'],
    difficulty: 2,
    description: '本月顾客持预付卡消费7,200元（含税），确认收入6,371.68元，增值税828.32元。',
    tip: '顾客持卡消费时从预收账款转入主营业务收入。借：预收账款/合同负债，贷：主营业务收入、应交税费-销项税额。',
    entries: [
      { subjectCode: '2203', summary: '预付卡消费', debit: 7200, credit: 0, explanation: '预收账款减少。' },
      { subjectCode: '6001', summary: '预付卡收入', debit: 0, credit: 6371.68, explanation: '主营业务收入增加。' },
      { subjectCode: '222101', summary: '销项税', debit: 0, credit: 828.32, explanation: '增值税销项税额增加记贷方。销售商品适用13%税率。' }],
    documents: [{ type: 'text', label: '预付卡消费汇总', docTitle: '预付卡消费汇总（2026年5月）', stampText: '财务专用章',
      content: `预付卡消费汇总
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
期间：2026年5月

本月消费（含税）：7,200.00元
不含税收入：6,371.68元  增值税：828.32元

预付卡余额追踪：
  期初（4月末）：38,795.00元
  本月消费：-7,200.00元
  期末余额：31,595.00元` }]},
  {
    date: '2026-05-19',
    role: 'accountant',
    title: '食品补货',
    tags: ['商品采购', '税费'],
    difficulty: 2,
    description: '向鑫鑫食品采购食品15,000元（不含税），增值税1,950元，价税合计16,950元付讫。',
    tip: '采购商品按不含税价入库存商品，进项税单独核算。借：库存商品/应交税费-进项，贷：银行存款/应付账款。',
    entries: [
      { subjectCode: '1405', summary: '食品入库', debit: 15000, credit: 0, explanation: '库存商品增加记借方。采购商品验收入库。' },
      { subjectCode: '222101', summary: '进项税', debit: 1950, credit: 0, explanation: '增值税进项税额增加记借方。取得专用发票可抵扣。' },
      { subjectCode: '100201', summary: '付款', debit: 0, credit: 16950, explanation: '银行存款减少记贷方。支付采购货款。' , cashFlowItem: 'cf-op2', cashFlowExplanation: '采购存货/商品支出。'}],
    documents: [{ type: 'invoice', label: '增值税专用发票', region: '上海', invoiceNo: '3100678902', date: '2026-05-19', buyer: '万悦超市有限公司', seller: '鑫鑫食品有限公司', totalAmount: 16950, taxRate: '13%', taxAmount: 1950,
      lineItems: [{ name: '食品', unit: '箱', qty: 150, price: 100, amount: 15000 }] },
      { type: 'text', label: '商品入库验收单', docTitle: '商品入库验收单', content: '商品入库验收单\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n供应商：鑫鑫食品有限公司\n入库日期：2026-05-19\n订单号：CG20260519007\n\n商品验收明细：\n1. 休闲食品  150箱 × 100.00元 = 15,000.00元 ✓\n─────────────────────────────────\n合计金额：15,000.00元（不含税）\n进项税额（13%）：1,950.00元\n价税合计：16,950.00元\n\n质量检验：包装完好 ✓\n\n入库保管：赵保管  验收：钱验收', signature: '仓库验收专用章' }]},
  {
    date: '2026-05-21',
    role: 'accountant',
    title: 'POS日常销售',
    tags: ['商品销售'],
    difficulty: 1,
    description: 'POS日常销售含税收入56,500元（不含税50,000元，增值税6,500元）。',
    tip: 'POS日常销售收入按支付方式分别入账。微信/支付宝计入"其他货币资金"，银行卡计入"银行存款"，现金计入"库存现金"。每日POS日结单汇总入账。借记各收款科目，贷记主营业务收入和应交税费-销项税额。',
    entries: [
      { subjectCode: '100201', summary: 'POS收款', debit: 56500, credit: 0, explanation: '银行存款增加记借方。POS收款T+1到账。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入。'},
      { subjectCode: '6001', summary: '收入', debit: 0, credit: 50000, explanation: '销售收入增加记贷方。不含税金额贷记主营业务收入。' },
      { subjectCode: '222101', summary: '销项税', debit: 0, credit: 6500, explanation: '增值税销项税额增加记贷方。销售商品适用13%税率。' }],
    documents: [{ type: 'text', label: 'POS日结单', docTitle: 'POS收银系统日结单（2026年5月21日）', stampText: '收银专用章',
      content: `万悦超市 POS日结单
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
日期：2026年5月21日

交易统计：约470笔  客单价：约120元

支付方式明细：
  微信支付：  22,000.00元（38.9%）
  支付宝：    12,400.00元（21.9%）
  银行卡：    15,850.00元（28.1%）
  现金：       6,250.00元（11.1%）
  ─────────────────────────────
  合计含税：  56,500.00元
  不含税收入： 50,000.00元
  增值税：      6,500.00元` }]},
  {
    date: '2026-05-23',
    role: 'accountant',
    title: '微信提现及手续费',
    tags: ['资金管理'],
    difficulty: 1,
    description: '将微信商户余额28,000元提现至工行，手续费28元，实际到账27,972元。',
    tip: '微信商户资金提现至银行账户：借：银行存款/财务费用-手续费，贷：其他货币资金-微信账户。注意提现时银行可能收取手续费。',
    entries: [
      { subjectCode: '100201', summary: '提现到账', debit: 27972, credit: 0, explanation: '银行存款增加记借方。第三方支付资金提现到账。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入。'},
      { subjectCode: '6603', summary: '手续费', debit: 28, credit: 0, explanation: '手续费计入财务费用。' },
      { subjectCode: '101204', summary: '微信转出', debit: 0, credit: 28000, explanation: '其他货币资金减少记贷方。第三方支付资金转出。' }],
    documents: [{ type: 'bank', label: '提现回单', date: '2026-05-23', totalAmount: 27972, payer: '财付通', payeeName: '本公司', content: '微信提现', refNo: 'TX20260523' }]},
  {
    date: '2026-05-29',
    role: 'accountant',
    title: '银行存款利息收入',
    tags: ['资金管理'],
    difficulty: 1,
    description: '收到5月活期存款利息550元。',
    tip: '银行存款利息收入冲减财务费用。借：银行存款，贷：财务费用-利息收入。',
    entries: [
      { subjectCode: '100201', summary: '利息收入', debit: 550, credit: 0, explanation: '银行存款利息收入增加。' , cashFlowItem: 'cf-op5', cashFlowExplanation: '收到银行存款利息，属于经营活动现金流入（收到其他与经营活动有关的现金）。'},
      { subjectCode: '6603', summary: '冲减财务费用', debit: 0, credit: 550, explanation: '利息收入冲减财务费用（贷方红字）。' }],
    documents: [{ type: 'bank', label: '利息回单', date: '2026-05-29', totalAmount: 550, payer: '工商银行', payeeName: '本公司', content: '5月活期存款利息', refNo: 'HD202605290001' }]},
  {
    date: '2026-05-02',
    role: 'accountant',
    title: 'POS日常销售',
    tags: ['商品销售'],
    difficulty: 1,
    description: 'POS日常销售含税收入45,200元（不含税40,000元，增值税5,200元），已收存银行。',
    tip: 'POS日常销售收入按支付方式分别入账。微信/支付宝计入"其他货币资金"，银行卡计入"银行存款"，现金计入"库存现金"。每日POS日结单汇总入账。借记各收款科目，贷记主营业务收入和应交税费-销项税额。',
    entries: [
      { subjectCode: '100201', summary: 'POS收款', debit: 45200, credit: 0, explanation: '银行存款增加。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金。'},
      { subjectCode: '6001', summary: '收入', debit: 0, credit: 40000, explanation: '销售收入增加记贷方。不含税金额贷记主营业务收入。' },
      { subjectCode: '222101', summary: '销项税', debit: 0, credit: 5200, explanation: '增值税销项税额增加记贷方。销售商品适用13%税率。' }],
    documents: [{ type: 'text', label: 'POS日结单', docTitle: 'POS收银系统日结单（2026年5月2日）', stampText: '收银专用章',
      content: `万悦超市 POS日结单
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
日期：2026年5月2日

交易统计：约380笔  客单价：约119元

支付方式明细：
  微信支付：  17,600.00元（38.9%）
  支付宝：     9,900.00元（21.9%）
  银行卡：    12,700.00元（28.1%）
  现金：       5,000.00元（11.1%）
  ─────────────────────────────
  合计含税：  45,200.00元
  不含税收入： 40,000.00元
  增值税：      5,200.00元` }]},
  {
    date: '2026-05-22',
    role: 'accountant',
    title: '生鲜补货',
    tags: ['商品采购', '税费'],
    difficulty: 2,
    description: '向绿源农业采购生鲜14,000元（不含税），增值税1,260元（9%），价税合计15,260元付讫。',
    tip: '生鲜商品增值税税率9%。采购时注意税率。借：库存商品/应交税费-进项（9%），贷：银行存款。',
    entries: [
      { subjectCode: '1405', summary: '入库', debit: 14000, credit: 0, explanation: '库存商品增加记借方。采购商品验收入库。' },
      { subjectCode: '222101', summary: '进项税', debit: 1260, credit: 0, explanation: '增值税进项税额增加记借方。取得专用发票可抵扣。' },
      { subjectCode: '100201', summary: '付款', debit: 0, credit: 15260, explanation: '银行存款减少记贷方。支付采购货款。' , cashFlowItem: 'cf-op2', cashFlowExplanation: '采购存货/商品支出，属于经营活动现金流出。' }],
    documents: [{ type: 'invoice', label: '增值税普通发票', region: '上海', invoiceNo: '3100567802', date: '2026-05-22', buyer: '万悦超市有限公司', seller: '绿源农业有限公司', totalAmount: 15260, taxRate: '9%', taxAmount: 1260,
      lineItems: [{ name: '蔬菜', unit: '斤', qty: 400, price: 5, amount: 2000 }, { name: '水果', unit: '斤', qty: 500, price: 12, amount: 6000 }, { name: '鲜肉', unit: '斤', qty: 300, price: 20, amount: 6000 }] },
      { type: 'text', label: '生鲜验收单', docTitle: '生鲜商品验收单', content: '生鲜商品验收单\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n供应商：绿源农业有限公司\n入库日期：2026-05-22\n订单号：CG20260522008\n\n验收明细：\n1. 蔬菜   400斤 × 5.00元 = 2,000.00元 ✓\n2. 水果   500斤 × 12.00元 = 6,000.00元 ✓\n3. 鲜肉   300斤 × 20.00元 = 6,000.00元 ✓\n──────────────────────────────\n合计金额：14,000.00元（不含税）\n进项税额（9%）：1,260.00元\n价税合计：15,260.00元\n\n验收结论：全部合格 ✓\n验收人：钱验收  保管员：赵保管', signature: '生鲜验收专用章' }]},
  {
    date: '2026-05-24',
    role: 'accountant',
    title: '支付宝提现',
    tags: ['资金管理'],
    difficulty: 1,
    description: '将支付宝余额18,000元提现至工行，全额到账。',
    tip: '支付宝资金提现至银行账户：借：银行存款，贷：其他货币资金-支付宝账户。支付宝提现一般免手续费。',
    entries: [
      { subjectCode: '100201', summary: '到账', debit: 18000, credit: 0, explanation: '银行存款增加记借方。第三方支付资金提现到账。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入。'},
      { subjectCode: '101205', summary: '支付宝转出', debit: 0, credit: 18000, explanation: '其他货币资金减少记贷方。第三方支付资金转出。' }],
    documents: [{ type: 'bank', label: '提现回单', date: '2026-05-24', totalAmount: 18000, payer: '支付宝', payeeName: '本公司', content: '支付宝提现', refNo: 'TX20260524' }]},
  {
    date: '2026-05-31',
    role: 'cashier',
    title: '出纳-月末盘点及对账',
    tags: ['出纳', '期末'],
    difficulty: 1,
    description: '月末现金盘点及银行对账。',
    tip: '月末出纳盘点现金、核对银行余额，确保账实相符。无需制作凭证。',
    entries: [],
    documents: [{ type: 'text', label: '现金盘点表', docTitle: '库存现金盘点表（2026年5月31日）', stampText: '财务专用章',
      content: '账面约3,500元 | 实盘3,500元 | ✓ 账实相符' }]}
]
export default tasks
