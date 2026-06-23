/**
 * 万悦超市 3月「春季调整」
 *
 * 月主题：日常运营 → 引入联营专柜 → 预付卡消费 → 供应商结算 → 月末结转
 * 特殊业务：🎯 联营专柜引入（净额法）、预付卡消费确认收入、供应商返利
 *
 * 会计准则依据：
 * - 《企业会计准则第14号——收入》（财会[2017]22号）
 * - 《企业会计准则第1号——存货》（财会[2006]3号）
 * - 《企业会计准则第22号——金融工具确认和计量》（财会[2017]7号）
 */

const tasks = [
  // ═══════════════════════════════════════════
  // 第一周：月初运营（3/1 - 3/7）
  // ═══════════════════════════════════════════
  {
    date: '2026-03-02',
    role: 'accountant',
    title: '预付卡消费确认（春节期间售卡）',
    tags: ['商品销售'],
    difficulty: 3,
    description: '2月销售的预付卡（礼品卡）本月开始陆续有顾客持卡消费。根据POS系统统计，3月2日持卡消费合计8,500元（不含税），增值税1,105元（13%），含税9,605元。商品已通过POS系统完成销售。',
    tip: '这是"预付卡确认收入"的典型场景。顾客持卡消费时，从"预收账款"转入"主营业务收入"。分录：借：预收账款，贷：主营业务收入/应交税费-销项。注意：售卡时挂预收账款，消费时才确认收入。这是新收入准则的核心要求。',
    entries: [
      { subjectCode: '2203', summary: '预付卡消费确认', debit: 9605, credit: 0, explanation: '预收账款减少记借方。春节期间售出的预付卡，顾客持卡消费9,605元，冲减预收账款。预付卡消费时确认收入，符合新收入准则关于履约义务的要求。' },
      { subjectCode: '6001', summary: '预付卡消费确认收入', debit: 0, credit: 8500, explanation: '主营业务收入增加记贷方。预付卡消费确认收入8,500元（不含税）。顾客持卡消费时，超市才完成履约义务，此时确认收入。' },
      { subjectCode: '222101', summary: '预付卡消费销项税', debit: 0, credit: 1105, explanation: '应交税费-应交增值税（销项税额）增加记贷方。持卡消费时产生增值税纳税义务，销项税额=8,500×13%=1,105元。' }],
    documents: [
      { type: 'text', label: '预付卡消费汇总表', docTitle: '预付卡消费汇总表（2026年3月2日）', stampText: '财务专用章',
        content: '预付卡消费汇总表\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n日期：2026年3月2日\n\n预付卡消费金额（含税）：9,605.00元\n不含税收入：8,500.00元\n增值税（13%）：1,105.00元\n\n对应售卡记录：2月10日销售预付卡65,000元\n已消费：9,605.00元\n剩余未消费：55,395.00元\n\n制表：李会计  审核：赵会计主管' }]},
  {
    date: '2026-03-03',
    role: 'accountant',
    title: '食品饮料日常补货（现购）',
    tags: ['商品采购', '税费'],
    tip: '采购商品按不含税价入库存商品，进项税可抵扣。',
    difficulty: 2,
    description: '日常补货食品饮料商品。向鑫鑫食品有限公司采购，不含税价35,000元，增值税4,550元（13%），价税合计39,550元，以工商银行存款支付。',
    entries: [
      { subjectCode: '1405', summary: '食品饮料补货入库', debit: 35000, credit: 0, explanation: '库存商品增加记借方。日常补货食品饮料35,000元验收入库。春节后进入常规销售节奏，补货量恢复正常水平。' },
      { subjectCode: '222101', summary: '食品补货进项税额', debit: 4550, credit: 0, explanation: '应交税费-应交增值税（进项税额）增加记借方。' },
      { subjectCode: '100201', summary: '支付食品补货款', debit: 0, credit: 39550, explanation: '银行存款减少记贷方。' , cashFlowItem: 'cf-op2', cashFlowExplanation: '采购存货/商品支出，属于经营活动现金流出。'}],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '上海', invoiceNo: '3100456789', date: '2026-03-03', buyer: '本公司', seller: '鑫鑫食品有限公司',
        lineItems: [{ name: '饼干糕点', unit: '箱', qty: 100, price: 100, amount: 10000 }, { name: '饮料矿泉水', unit: '箱', qty: 150, price: 80, amount: 12000 }, { name: '方便食品', unit: '箱', qty: 80, price: 100, amount: 8000 }, { name: '调味品', unit: '箱', qty: 50, price: 100, amount: 5000 }],
        totalAmount: 39550, taxRate: '13%', taxAmount: 4550, totalInWords: '叁万玖仟伍佰伍拾元整' },
      { type: 'bank', label: '付款回单', date: '2026-03-03', totalAmount: 39550, payer: '本公司', payeeName: '鑫鑫食品有限公司', content: '日常补货', refNo: 'HD202603030001' },
      { type: 'text', label: '商品入库验收单', docTitle: '商品入库验收单', content: '供应商：鑫鑫食品有限公司\n入库日期：2026-03-03\n\n商品明细：全部合格 ✓\n入库保管：赵保管  验收：钱验收', signature: '仓库验收专用章' }]},
  {
    date: '2026-03-04',
    role: 'accountant',
    title: '支付2月供应商货款（洁宝日化）',
    tags: ['往来管理'],
    difficulty: 1,
    description: '偿还2月欠洁宝日化有限公司的春节装饰采购款28,250元（发票No.4400567891），以工商银行转账支付。',
    tip: '偿还应付账款时：借：应付账款-供应商，贷：银行存款。及时付款有助于维护良好的供应商关系。付款后需与供应商对账确认。',
    entries: [
      { subjectCode: '220203', summary: '偿还洁宝日化2月货款', debit: 28250, credit: 0, explanation: '应付账款减少记借方。偿还2月春节装饰品采购欠款28,250元。' },
      { subjectCode: '100201', summary: '偿还洁宝日化2月货款', debit: 0, credit: 28250, explanation: '银行存款减少记贷方。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出。'}],
    documents: [
      { type: 'bank', label: '转账回单', date: '2026-03-04', totalAmount: 28250, payer: '本公司', payeeName: '洁宝日化有限公司', content: '支付2月春节装饰采购款', refNo: 'HD202603040001' },
      { type: 'text', label: '付款审批单', docTitle: '付款审批单', content: '收款单位：洁宝日化有限公司\n金额：28,250.00元\n审批：财务主管 ✓', signature: '财务主管 李会计' }]},
  {
    date: '2026-03-05',
    role: 'accountant',
    title: '日用品补货（赊购）',
    tags: ['商品采购', '往来管理'],
    tip: '采购商品按不含税价入库存商品，进项税可抵扣。',
    difficulty: 2,
    description: '向洁宝日化有限公司补货日用品，不含税价30,000元，增值税3,900元（13%），价税合计33,900元，货款未付。',
    entries: [
      { subjectCode: '1405', summary: '日用品补货入库', debit: 30000, credit: 0, explanation: '库存商品增加记借方。日用品补货30,000元验收入库。' },
      { subjectCode: '222101', summary: '日用品进项税额', debit: 3900, credit: 0, explanation: '应交税费-应交增值税（进项税额）增加记借方。' },
      { subjectCode: '220203', summary: '赊购日用品款未付', debit: 0, credit: 33900, explanation: '应付账款-洁宝日化增加记贷方。赊购货款33,900元未付。' }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '广东', invoiceNo: '4400678902', date: '2026-03-05', buyer: '本公司', seller: '洁宝日化有限公司',
        lineItems: [{ name: '洗发水', unit: '箱', qty: 50, price: 150, amount: 7500 }, { name: '洗衣液', unit: '箱', qty: 80, price: 120, amount: 9600 }, { name: '纸巾', unit: '箱', qty: 60, price: 180, amount: 10800 }, { name: '厨房用品', unit: '箱', qty: 30, price: 70, amount: 2100 }],
        totalAmount: 33900, taxRate: '13%', taxAmount: 3900, totalInWords: '叁万叁仟玖佰元整' },
      { type: 'text', label: '商品入库验收单', docTitle: '商品入库验收单', content: '供应商：洁宝日化有限公司\n入库：全部合格 ✓', signature: '仓库验收专用章' }]},
  {
    date: '2026-03-06',
    role: 'accountant',
    title: '发放2月员工工资（含春节加班费）',
    tags: ['工资社保'],
    difficulty: 2,
    description: '通过工商银行代发2月员工工资77,827.60元（含春节加班费16,827.60元）。其中：店长9,122元、收银员约20,500元、理货员约26,700元、生鲜技工约12,800元、保洁约8,700元。',
    tip: '通过银行代发工资时：借：应付职工薪酬-工资，贷：银行存款。春节加班费按300%计算，需在工资单中单独列示。发放后冲减计提的应付职工薪酬负债。',
    entries: [
      { subjectCode: '221101', summary: '发放2月员工工资', debit: 77827.6, credit: 0, explanation: '应付职工薪酬-工资减少记借方。发放2月应发工资77,827.60元，含春节法定节假日加班费16,827.60元。' },
      { subjectCode: '100201', summary: '发放2月员工工资', debit: 0, credit: 77827.6, explanation: '银行存款减少记贷方。通过工商银行代发工资78,827.60元。' , cashFlowItem: 'cf-op3', cashFlowExplanation: '支付职工薪酬相关支出，属于经营活动现金流出。'}],
    documents: [
      { type: 'bank', label: '代发工资回单', date: '2026-03-06', totalAmount: 77827.6, payer: '本公司', payeeName: '员工代发工资户', content: '2026年2月工资发放（含春节加班费）', refNo: 'HD202603060001' },
      { type: 'text', label: '工资发放明细表', docTitle: '2026年2月工资发放明细表（含春节加班费）', signature: '人力资源部 工资专用章',
        content: '万悦超市 2026年2月工资发放明细\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n岗位        基础工资    加班费      实发金额\n─────────────────────────────────────\n店长         8,000      1,122       9,122.00\n收银员      16,000      4,500      20,500.00\n理货员      21,000      5,700      26,700.00\n生鲜技工    10,000      2,800      12,800.00\n保洁员       6,000      2,700       8,705.60\n─────────────────────────────────────\n合计        61,000     16,827.60   77,827.60\n\n制表：王出纳  审核：李会计  批准：赵店长' }]},

  // ═══════════════════════════════════════════
  // 第二周：联营专柜引入（3/7 - 3/14）
  // ═══════════════════════════════════════════
  {
    date: '2026-03-07',
    role: 'accountant',
    title: '引入联营专柜-签订合作协议',
    tags: ['商品销售', "info"],
    difficulty: 3,
    description: '万悦超市与"美肌堂化妆品有限公司"签订联营专柜合作协议。美肌堂在超市内设立品牌专柜，销售护肤品和彩妆。超市提供场地和统一收银，美肌堂负责商品、人员、库存。联营扣点比例为销售额（含税）的22%。协议约定保底月销售额30,000元（含税），不足时按30,000元计算扣点。',
    tip: '联营专柜是超市的重要经营模式。超市不承担商品库存风险，按销售额扣点收取佣金。依据新收入准则，超市在联营模式下为"代理人"，应按净额法确认收入——仅确认扣点部分。注意：联营商品不入超市库存（所有权归供应商），只在POS系统中记录流水。分录：销售发生时，按扣点确认收入。',
    entries: [],
    documents: [
      { type: 'text', label: '联营合作协议', docTitle: '联营专柜合作合同（摘要）', stampText: '合同专用章',
        content: '联营合作协议（摘要）\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n甲方（商场）：万悦超市有限公司\n乙方（供应商）：美肌堂化妆品有限公司\n\n合作方式：联营专柜\n专柜位置：万悦超市一层A区\n经营品类：护肤品、彩妆\n\n结算方式：\n  扣点比例：22%（按含税销售额）\n  保底销售额：30,000元/月（含税）\n  结算周期：按月结算\n  付款条件：次月15日前\n\n商品管理：\n  所有权：乙方（供应商）\n  库存风险：乙方承担\n  销售人员：乙方派驻\n  定价权：乙方主导，甲方审核\n\n合同期限：2026年3月7日-2027年3月6日\n\n合同双方签字盖章 ✓' }]},
  {
    date: '2026-03-08',
    role: 'accountant',
    title: '联营专柜首日销售（净额法）',
    tags: ['商品销售'],
    difficulty: 3,
    description: '美肌堂联营专柜今日开始营业。首日专柜含税销售额8,000元，根据合同约定22%扣点率，超市应确认的佣金收入=8,000×22%=1,760元（含税），不含税佣金收入=1,760÷1.06=1,660.38元，增值税99.62元（6%）。超市通过POS统一收银，货款暂存。',
    tip: '联营专柜按净额法确认收入——超市只确认佣金部分。分录：借：银行存款（全额），贷：应付账款-美肌堂（货款净额）、主营业务收入（佣金）、应交税费-销项（佣金部分的增值税6%）。注意：佣金收入的增值税税率为6%（现代服务业），不是13%（商品销售）。联营专柜与自营的最大区别就在这里。',
    entries: [
      { subjectCode: '100201', summary: '联营专柜首日销售收款', debit: 8000, credit: 0, explanation: '银行存款增加记借方。超市统一收银，联营专柜首日含税销售额8,000元全部通过超市POS系统收取。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金，属于经营活动现金流入。'},
      { subjectCode: '220203', summary: '应付美肌堂货款净额', debit: 0, credit: 6240, explanation: '应付账款增加记贷方。应支付给美肌堂的货款净额=8,000×78%=6,240元（扣除22%扣点后的余额）。该笔款项将在次月结算时支付给供应商。' },
      { subjectCode: '6001', summary: '联营佣金收入（净额法）', debit: 0, credit: 1660.38, explanation: '主营业务收入增加记贷方。联营专柜佣金收入1,660.38元（不含税）。按净额法确认收入：扣点收入8,000×22%=1,760元（含税），不含税=1,760÷1.06=1,660.38元。依据《企业会计准则第14号——收入》第三十四条：企业为主要责任人的，按总额确认收入；为代理人的，按净额确认收入。联营模式下超市是代理人。' },
      { subjectCode: '222101', summary: '联营佣金增值税销项', debit: 0, credit: 99.62, explanation: '应交税费-应交增值税（销项税额）增加记贷方。佣金部分增值税=1,760÷1.06×6%=99.62元。注意：联营佣金适用6%税率（现代服务业），不同于商品销售的13%。' }],
    documents: [
      { type: 'text', label: '联营销售日结单', docTitle: '联营专柜POS日结单（2026年3月8日·首日开业）', stampText: '联营专柜结算专用章',
        content: '联营专柜POS日结单\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n专柜：美肌堂化妆品专柜\n日期：2026年3月8日（首日开业）\n\n含税销售额：8,000.00元\n\n结算明细（净额法）：\n  扣点率：22%\n  超市佣金（含税）：1,760.00元\n  佣金增值税（6%）：99.62元\n  佣金净收入：1,660.38元\n  应付供应商（78%）：6,240.00元\n\n收入确认方式：净额法（代理人）\n依据：CAS 14 第三十四条' }]},
  {
    date: '2026-03-09',
    role: 'accountant',
    title: 'POS日常销售（自营）',
    tags: ['商品销售'],
    difficulty: 2,
    description: '周末日常POS销售。自营商品不含税收入85,000元，增值税11,050元（13%），含税96,050元。其中微信35,000元、支付宝28,000元、银行卡25,050元、现金8,000元。',
    tip: '自营商品POS销售收入按支付方式分别入账：微信/支付宝计入"其他货币资金"，银行卡计入"银行存款"，现金计入"库存现金"。每日POS日结单汇总入账。',
    entries: [
      { subjectCode: '101204', summary: '自营微信收款', debit: 35000, credit: 0, explanation: '其他货币资金-微信账户增加记借方。' },
      { subjectCode: '101205', summary: '自营支付宝收款', debit: 28000, credit: 0, explanation: '其他货币资金-支付宝账户增加记借方。' },
      { subjectCode: '100201', summary: '自营银行卡收款', debit: 25050, credit: 0, explanation: '银行存款增加记借方。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金，属于经营活动现金流入。'},
      { subjectCode: '1001', summary: '自营现金收款', debit: 8000, credit: 0, explanation: '库存现金增加记借方。' },
      { subjectCode: '6001', summary: '自营销售收入', debit: 0, credit: 85000, explanation: '主营业务收入增加记贷方。周末日常POS销售85,000元（不含税）。' },
      { subjectCode: '222101', summary: '自营销售增值税销项', debit: 0, credit: 11050, explanation: '应交税费-应交增值税（销项税额）增加记贷方。销项税额=85,000×13%=11,050元。' }],
    documents: [
      { type: 'text', label: 'POS日结单', docTitle: 'POS收银系统日结单（2026年3月9日）', stampText: '收银专用章',
        content: '万悦超市 POS日结单\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n日期：2026年3月9日（周末）\n\n自营商品：\n含税收入：96,050.00元\n不含税：85,000.00元  增值税：11,050.00元\n\n联营专柜（美肌堂）：已单独结算' }]},
  {
    date: '2026-03-10',
    role: 'accountant',
    title: '生鲜正常补货（现购）',
    tags: ['商品采购', '税费'],
    tip: '采购商品按不含税价入库存商品，进项税可抵扣。',
    difficulty: 2,
    description: '向绿源农业采购生鲜商品：蔬菜1,000斤×5元=5,000元、水果800斤×12元=9,600元、鲜肉600斤×20元=12,000元，合计不含税26,600元，增值税2,394元（9%），价税合计28,994元，以银行存款支付。',
    entries: [
      { subjectCode: '1405', summary: '生鲜商品入库', debit: 26600, credit: 0, explanation: '库存商品增加记借方。日常生鲜补货26,600元。' },
      { subjectCode: '222101', summary: '生鲜进项税额（9%）', debit: 2394, credit: 0, explanation: '应交税费-应交增值税（进项税额）增加记借方。农产品9%税率。' },
      { subjectCode: '100201', summary: '支付生鲜补货款', debit: 0, credit: 28994, explanation: '银行存款减少记贷方。' , cashFlowItem: 'cf-op2', cashFlowExplanation: '采购存货/商品支出，属于经营活动现金流出。'}],
    documents: [
      { type: 'invoice', label: '增值税普通发票（农产品）', region: '上海', invoiceNo: '3100901234', date: '2026-03-10', buyer: '本公司', seller: '绿源农业有限公司',
        lineItems: [{ name: '蔬菜', unit: '斤', qty: 1000, price: 5, amount: 5000 }, { name: '水果', unit: '斤', qty: 800, price: 12, amount: 9600 }, { name: '鲜肉', unit: '斤', qty: 600, price: 20, amount: 12000 }],
        totalAmount: 28994, taxRate: '9%', taxAmount: 2394, totalInWords: '贰万捌仟玖佰玖拾肆元整' },
      { type: 'bank', label: '付款回单', date: '2026-03-10', totalAmount: 28994, payer: '本公司', payeeName: '绿源农业有限公司', content: '生鲜日常补货', refNo: 'HD202603100001' },
      { type: 'text', label: '生鲜验收单', docTitle: '生鲜商品验收单', content: '蔬菜1,000斤 ✓ 水果800斤 ✓ 鲜肉600斤 ✓\n验收结论：全部合格', signature: '生鲜验收专用章' }]},
  {
    date: '2026-03-11',
    role: 'accountant',
    title: '联营专柜销售（3天汇总入账）',
    tags: ['商品销售'],
    difficulty: 3,
    description: '美肌堂联营专柜3月9日-11日累计含税销售额26,000元。超市按净额法确认收入：佣金收入=26,000×22%=5,720元（含税），不含税佣金=5,720÷1.06=5,396.23元，增值税323.77元（6%）。应付美肌堂货款=26,000×78%=20,280元。',
    tip: '联营专柜按净额法确认收入（CAS 14代理人模式）。超市仅按扣点佣金确认收入。借：银行存款（全额），贷：应付账款-供应商（货款净额）、主营业务收入-佣金（扣点部分）、应交税费-销项（佣金部分的6%增值税）。',
    entries: [
      { subjectCode: '100201', summary: '联营专柜3天销售收款', debit: 26000, credit: 0, explanation: '银行存款增加记借方。联营专柜3天含税销售额26,000元统一收银。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金，属于经营活动现金流入。'},
      { subjectCode: '220203', summary: '应付美肌堂货款净额', debit: 0, credit: 20280, explanation: '应付账款增加记贷方。应付美肌堂货款=26,000×78%=20,280元，待次月结算。' },
      { subjectCode: '6001', summary: '联营佣金收入（净额法）', debit: 0, credit: 5396.23, explanation: '主营业务收入增加记贷方。联营佣金收入5,396.23元（不含税）。净额法确认。' },
      { subjectCode: '222101', summary: '联营佣金增值税销项', debit: 0, credit: 323.77, explanation: '应交税费-应交增值税（销项税额）增加记贷方。佣金增值税=5,720÷1.06×6%=323.77元。' }],
    documents: [
      { type: 'text', label: '联营专柜销售汇总表', docTitle: '联营专柜销售汇总（3月9日-11日）', stampText: '联营专柜结算专用章',
        content: '联营专柜销售汇总\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n专柜：美肌堂化妆品专柜\n期间：2026年3月9日-11日\n\n含税销售额：26,000.00元\n\n扣点率：22%\n超市佣金（含税）：5,720.00元\n佣金增值税（6%）：323.77元\n佣金净收入：5,396.23元\n应付供应商：20,280.00元' }]},

  // ═══════════════════════════════════════════
  // 第三周：供应商结算及月末业务（3/12 - 3/20）
  // ═══════════════════════════════════════════
  {
    date: '2026-03-12',
    role: 'accountant',
    title: '结转已销商品成本（上旬）',
    tags: ['商品销售', '仓存管理'],
    difficulty: 3,
    description: '根据POS销售数据，采用移动加权平均法结转3月上旬已销自营商品成本。食品饮料类约48,000元、日用品类约22,000元、生鲜类约35,000元、小家电类约8,000元。合计113,000元。（注：联营专柜成本由供应商承担，超市不结转联营商品成本。）',
    tip: '联营专柜商品不入超市库存，超市不承担成本结转义务。只结转自营商品成本。这是联营模式与自营模式的关键区别——自营承担存货风险但赚取进销差价，联营不承担风险但只赚取佣金。',
    entries: [
      { subjectCode: '6401', summary: '结转上旬自营商品成本', debit: 113000, credit: 0, explanation: '主营业务成本增加记借方。3月上旬已销自营商品成本113,000元。注意：联营专柜商品成本由供应商承担，超市不结转。' },
      { subjectCode: '1405', summary: '食品饮料成本', debit: 0, credit: 48000, explanation: '库存商品减少记贷方。' },
      { subjectCode: '1405', summary: '日用品成本', debit: 0, credit: 22000, explanation: '库存商品减少记贷方。' },
      { subjectCode: '1405', summary: '生鲜成本', debit: 0, credit: 35000, explanation: '库存商品减少记贷方。' },
      { subjectCode: '1405', summary: '小家电成本', debit: 0, credit: 8000, explanation: '库存商品减少记贷方。' }],
    documents: [
      { type: 'text', label: '成本计算表', docTitle: '商品销售成本计算表（2026年3月上旬）', stampText: '财务专用章',
        content: '商品销售成本计算表（2026年3月上旬）\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n品类          销售成本\n──────────────────\n食品饮料      48,000.00\n日用品        22,000.00\n生鲜          35,000.00\n小家电         8,000.00\n──────────────────\n自营合计     113,000.00\n\n联营专柜：不结转成本（供应商承担）\n\n注：联营模式下超市仅确认佣金收入，不确认商品成本。\n\n制表：李会计' }]},
  {
    date: '2026-03-13',
    role: 'accountant',
    title: '计提3月员工工资',
    tags: ['工资社保'],
    difficulty: 2,
    description: '计提3月员工工资。本月无节假日加班，基础工资61,000元（同1月标准）。管理岗（店长）8,000元计入管理费用，一线员工53,000元计入销售费用。',
    tip: '月末计提当月工资，体现权责发生制原则。管理岗人员工资计入管理费用，一线员工工资计入销售费用。借：管理费用/销售费用，贷：应付职工薪酬-工资。',
    entries: [
      { subjectCode: '660203', summary: '计提店长3月工资', debit: 8000, credit: 0, explanation: '管理费用-工资薪金增加记借方。店长3月工资8,000元。' },
      { subjectCode: '6601', summary: '计提一线员工3月工资', debit: 53000, credit: 0, explanation: '销售费用增加记借方。一线员工3月工资53,000元。本月无节假日加班，恢复正常工资水平。' },
      { subjectCode: '221101', summary: '计提3月工资', debit: 0, credit: 61000, explanation: '应付职工薪酬-工资增加记贷方。3月应付工资61,000元。无加班费。' }],
    documents: [
      { type: 'text', label: '工资计算表', docTitle: '2026年3月工资计算表', stampText: '人力资源部 工资专用章',
        content: '万悦超市 2026年3月工资计算表\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n店长：1人×8,000=8,000元（管理费用）\n收银员：4人×4,000=16,000元\n理货员：6人×3,500=21,000元\n生鲜技工：2人×5,000=10,000元\n保洁员：2人×3,000=6,000元\n小计：53,000元（销售费用）\n\n合计应付：61,000.00元\n（本月无法定节假日加班）\n\n制表：王出纳  审核：李会计  批准：赵店长' }]},
  {
    date: '2026-03-14',
    role: 'accountant',
    title: '缴纳社保公积金单位部分（2月基数）',
    tags: ['工资社保'],
    difficulty: 2,
    description: '以2月工资总额77,827.60元为基数，缴纳社保（27.2%计21,169.11元）和公积金（7%计5,447.93元），合计26,617.04元。通过工商银行缴纳。',
    tip: '社保费由单位和个人共同承担。单位部分按工资基数×单位缴费比例计算。分录：借：管理费用/销售费用-社保费，贷：应付职工薪酬-社保；实际缴纳时冲减应付职工薪酬。',
    entries: [
      { subjectCode: '221102', summary: '缴纳2月社保单位部分', debit: 21169.11, credit: 0, explanation: '应付职工薪酬-社保减少记借方。2月社保单位部分，基数77,827.60×27.2%=21,169.11元。' },
      { subjectCode: '221103', summary: '缴纳2月公积金单位部分', debit: 5447.93, credit: 0, explanation: '应付职工薪酬-公积金减少记借方。2月公积金单位部分77,827.60×7%=5,447.93元。' },
      { subjectCode: '100201', summary: '缴纳2月社保公积金', debit: 0, credit: 26617.04, explanation: '银行存款减少记贷方。' , cashFlowItem: 'cf-op3', cashFlowExplanation: '支付职工薪酬相关支出，属于经营活动现金流出。'}],
    documents: [
      { type: 'bank', label: '社保缴费回单', date: '2026-03-14', totalAmount: 21169.11, payer: '本公司', payeeName: '上海市社会保险事业管理中心', content: '2026年2月社会保险费（单位部分）', refNo: 'HD202603140001' },
      { type: 'bank', label: '公积金缴费回单', date: '2026-03-14', totalAmount: 5447.93, payer: '本公司', payeeName: '上海市公积金管理中心', content: '2026年2月住房公积金（单位部分）', refNo: 'HD202603140002' }]},
  {
    date: '2026-03-15',
    role: 'accountant',
    title: '支付水电费',
    tags: ['费用管理'],
    difficulty: 1,
    description: '支付3月水电费。春节后恢复正常运营，电费8,800元、水费1,100元，合计9,900元，以银行存款支付。',
    tip: '水电费计入销售费用。借：销售费用-水电费，贷：银行存款。注意取得增值税专用发票。',
    entries: [
      { subjectCode: '6602', summary: '支付3月水电费', debit: 9900, credit: 0, explanation: '管理费用增加记借方。3月水电费9,900元（电费8,800+水费1,100），恢复至正常水平。' },
      { subjectCode: '100201', summary: '支付3月水电费', debit: 0, credit: 9900, explanation: '银行存款减少记贷方。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出。'}],
    documents: [
      { type: 'receipt', label: '电费发票', date: '2026-03-15', totalAmount: 8800, items: [{ name: '3月电费', qty: 1, price: 8800, amount: 8800 }] },
      { type: 'receipt', label: '水费发票', date: '2026-03-15', totalAmount: 1100, items: [{ name: '3月水费', qty: 1, price: 1100, amount: 1100 }] }]},
  {
    date: '2026-03-16',
    role: 'accountant',
    title: '计提固定资产折旧',
    tags: ['资产', "info"],
    difficulty: 2,
    description: '前往固定资产模块计提3月折旧。月折旧额1,350元（货架500+收银系统333.33+冷藏柜266.67+空调250），计入管理费用-折旧费。',
    tip: '固定资产按月计提折旧。超市固定资产按使用部门分配折旧费用。借：销售费用/管理费用-折旧费，贷：累计折旧。',
    entries: [],
    nextAction: 'fixed-assets',
    documents: [
      { type: 'text', label: '折旧计算表', docTitle: '固定资产折旧计算表（2026年3月）', stampText: '财务专用章',
        content: '固定资产折旧计算表\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n期间：2026年3月\n\n货架20组：500.00元（剩余58月）\n收银系统4台：333.33元（剩余34月）\n冷藏展示柜2台：266.67元（剩余58月）\n空调3台：250.00元（剩余58月）\n合计：1,350.00元\n\n归属：管理费用-折旧费\n\n前往「固定资产」模块操作' }]},
  {
    date: '2026-03-17',
    role: 'accountant',
    title: '生鲜日常损耗处理',
    tags: ['仓存管理'],
    difficulty: 2,
    description: '本月生鲜正常损耗：蔬菜5%（750元）、水果4%（600元）、鲜肉3%（500元）、水产品5%（600元），合计2,450元。经店长批准计入管理费用。',
    tip: '生鲜商品因水分蒸发、变质等产生自然损耗，属于正常经营损失。小金额的正常损耗计入管理费用，无需进项转出。分录：借：管理费用，贷：库存商品。',
    entries: [
      { subjectCode: '6602', summary: '生鲜正常损耗', debit: 2450, credit: 0, explanation: '管理费用增加记借方。3月生鲜正常损耗2,450元，损耗率已恢复至正常水平（春节后不再大量备货）。' },
      { subjectCode: '1405', summary: '生鲜损耗出库', debit: 0, credit: 2450, explanation: '库存商品减少记贷方。正常损耗，无需进项转出。' }],
    documents: [
      { type: 'text', label: '生鲜损耗报告单', docTitle: '生鲜商品损耗报告（2026年3月）', stampText: '生鲜部专用章',
        content: '生鲜商品损耗报告\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n期间：2026年3月\n\n品类     金额     损耗率   原因\n──────────────────────────\n蔬菜     750元     5%     自然损耗\n水果     600元     4%     轻微碰伤\n鲜肉     500元     3%     水分流失\n水产品   600元     5%     鲜活率下降\n──────────────────────────\n合计   2,450元     —\n\n损耗性质：正常合理损耗 ✓\n店长审批：同意 ☑' }]},

  // ═══════════════════════════════════════════
  // 第四周：月末（3/18 - 3/31）
  // ═══════════════════════════════════════════
  {
    date: '2026-03-18',
    role: 'accountant',
    title: '微信/支付宝提现及手续费',
    tags: ['资金管理'],
    tip: '银行手续费计入财务费用。',
    difficulty: 1,
    description: '将微信商户余额45,000元及支付宝余额32,000元提现至工行。微信手续费45元，实际到账44,955元；支付宝免费，全额到账32,000元。',
    entries: [
      { subjectCode: '100201', summary: '微信提现到账', debit: 44955, credit: 0, explanation: '银行存款增加记借方。微信45,000元提现，扣手续费45元后到账44,955元。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金。'},
      { subjectCode: '6603', summary: '微信提现手续费', debit: 45, credit: 0, explanation: '财务费用增加记借方。提现手续费45元（45,000×0.1%）。' },
      { subjectCode: '101204', summary: '微信余额提现转出', debit: 0, credit: 45000, explanation: '其他货币资金-微信账户减少记贷方。' },
      { subjectCode: '100201', summary: '支付宝提现到账', debit: 32000, credit: 0, explanation: '银行存款增加记借方。支付宝32,000元全额到账。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金。'},
      { subjectCode: '101205', summary: '支付宝余额提现转出', debit: 0, credit: 32000, explanation: '其他货币资金-支付宝账户减少记贷方。' }],
    documents: [
      { type: 'bank', label: '微信提现回单', date: '2026-03-18', totalAmount: 44955, payer: '财付通', payeeName: '本公司', content: '微信提现', refNo: 'TX20260318001' },
      { type: 'bank', label: '支付宝提现回单', date: '2026-03-18', totalAmount: 32000, payer: '支付宝', payeeName: '本公司', content: '支付宝提现', refNo: 'TX20260318002' }]},
  {
    date: '2026-03-19',
    role: 'accountant',
    title: '银行手续费及利息收入',
    tags: ['资金管理'],
    tip: '银行手续费计入财务费用。',
    difficulty: 1,
    description: '工商银行扣收3月账户管理费及转账手续费180元，收到3月活期存款利息520元。',
    entries: [
      { subjectCode: '6603', summary: '银行手续费', debit: 180, credit: 0, explanation: '财务费用增加记借方。' },
      { subjectCode: '100201', summary: '银行扣收手续费', debit: 0, credit: 180, explanation: '银行存款减少记贷方。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出。'},
      { subjectCode: '100201', summary: '收到3月存款利息', debit: 520, credit: 0, explanation: '银行存款增加记借方。' , cashFlowItem: 'cf-op5', cashFlowExplanation: '其他经营活动现金流入。'},
      { subjectCode: '6603', summary: '冲减财务费用-利息收入', debit: 0, credit: 520, explanation: '财务费用减少记贷方。' }],
    documents: [
      { type: 'bank', label: '银行扣费回单', date: '2026-03-19', totalAmount: 180, payer: '本公司', payeeName: '中国工商银行', content: '3月账户管理费', refNo: 'HD202603190001' },
      { type: 'bank', label: '利息入账回单', date: '2026-03-19', totalAmount: 520, payer: '中国工商银行', payeeName: '本公司', content: '2026年3月活期存款利息', refNo: 'HD202603190002' }]},
  {
    date: '2026-03-20',
    role: 'accountant',
    title: '结转已销商品成本（全月）',
    tags: ['商品销售', '仓存管理'],
    difficulty: 3,
    description: '汇总全月自营商品销售成本。食品饮料类98,000元、日用品类48,000元、生鲜类72,000元、小家电类15,000元。合计233,000元。',
    tip: '月末汇总结转自营商品成本。移动加权平均法计算。借：主营业务成本，贷：库存商品。',
    entries: [
      { subjectCode: '6401', summary: '结转3月自营商品成本', debit: 233000, credit: 0, explanation: '主营业务成本增加记借方。3月自营商品成本合计233,000元（不含联营专柜，联营成本由供应商承担）。' },
      { subjectCode: '1405', summary: '食品饮料成本', debit: 0, credit: 98000, explanation: '库存商品减少记贷方。' },
      { subjectCode: '1405', summary: '日用品成本', debit: 0, credit: 48000, explanation: '库存商品减少记贷方。' },
      { subjectCode: '1405', summary: '生鲜成本', debit: 0, credit: 72000, explanation: '库存商品减少记贷方。' },
      { subjectCode: '1405', summary: '小家电成本', debit: 0, credit: 15000, explanation: '库存商品减少记贷方。' }],
    documents: [
      { type: 'text', label: '成本计算表', docTitle: '商品销售成本计算表（2026年3月）', stampText: '财务专用章',
        content: '商品销售成本计算表（移动加权平均法）\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n期间：2026年3月\n\n品类        期初      进货      销售     期末\n────────────────────────────────────\n食品饮料    30,000    35,000    48,000    17,000\n日用品      19,000    30,000    22,000    27,000\n生鲜         4,600    26,600    72,000    约-41,000*\n小家电      18,000         0    15,000     3,000\n联营专柜         0         0         0         0\n────────────────────────────────────\n自营合计    71,600    91,600   233,000    约6,200\n\n*注：生鲜本期销售含上期库存，期末库存较少。\n联营专柜商品不纳入超市库存核算。\n\n制表：李会计  审核：赵会计主管' }]},
  {
    date: '2026-03-21',
    role: 'accountant',
    title: '计提城建税及教育费附加',
    tags: ['税费'],
    difficulty: 2,
    description: '根据本月应交增值税计算并计提城建税（7%）和教育费附加（3%）。本月销项税额=自营约34,790元+联营佣金约324元+预付卡消费1,105元=约36,219元。进项税额=食品4,550+日用品3,900+生鲜2,394+其他=约11,844元。应交增值税24,375元。应交城建税=24,375×7%=1,706.25元，教育费附加=24,375×3%=731.25元。',
    tip: '城建税和教育费附加以实际应缴纳的增值税为计税依据。城建税税率7%，教育费附加3%。借：税金及附加，贷：应交税费-城建税/教育费附加。',
    entries: [
      { subjectCode: '6403', summary: '计提城建税及教育费附加', debit: 2437.5, credit: 0, explanation: '税金及附加增加记借方。城建税1,706.25+教育费附加731.25=2,437.50元。' },
      { subjectCode: '222103', summary: '计提应交城建税', debit: 0, credit: 1706.25, explanation: '应交税费-应交城市维护建设税增加记贷方。' },
      { subjectCode: '222104', summary: '计提应交教育费附加', debit: 0, credit: 731.25, explanation: '应交税费-应交教育费附加增加记贷方。' }],
    documents: [
      { type: 'text', label: '税金计算表', docTitle: '附加税费计算表（2026年3月）', stampText: '财务专用章',
        content: '附加税费计算表\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n期间：2026年3月\n\n销项税额合计：约36,219.00元\n进项税额合计：约11,844.00元\n应交增值税：24,375.00元\n\n城建税（7%）：1,706.25元\n教育费附加（3%）：731.25元\n合计：2,437.50元\n\n制表：李会计  审核：赵会计主管' }]},
  {
    date: '2026-03-22',
    role: 'accountant',
    title: '缴纳增值税及附加税',
    tags: ['税费'],
    difficulty: 2,
    description: '缴纳3月应交增值税24,375元、城建税1,706.25元、教育费附加731.25元，合计26,812.50元，通过工商银行转账缴纳。',
    tip: '缴纳增值税及附加税时：借：应交税费-未交增值税/城建税/教育费附加，贷：银行存款。注意缴纳税款后需取得银行缴款回单作为原始凭证。',
    entries: [
      { subjectCode: '222101', summary: '缴纳3月增值税', debit: 24375, credit: 0, explanation: '应交税费-应交增值税减少记借方。' },
      { subjectCode: '222103', summary: '缴纳3月城建税', debit: 1706.25, credit: 0, explanation: '应交税费-应交城建税减少记借方。' },
      { subjectCode: '222104', summary: '缴纳3月教育费附加', debit: 731.25, credit: 0, explanation: '应交税费-应交教育费附加减少记借方。' },
      { subjectCode: '100201', summary: '缴纳税款', debit: 0, credit: 26812.5, explanation: '银行存款减少记贷方。' , cashFlowItem: 'cf-op4', cashFlowExplanation: '缴纳税费支出，属于经营活动现金流出。'}],
    documents: [
      { type: 'bank', label: '缴税回单', date: '2026-03-22', totalAmount: 26812.5, payer: '本公司', payeeName: '国家金库上海分库', content: '缴纳2026年3月增值税及附加税', refNo: 'HD202603220001' },
      { type: 'text', label: '税收缴款书', docTitle: '税收缴款书（2026年3月）', content: '增值税：24,375.00元\n城建税：1,706.25元\n教育费附加：731.25元\n合计：26,812.50元', stampText: '国家税务总局 征收专用章' }]},
  {
    date: '2026-03-25',
    role: 'accountant',
    title: '期末结转损益',
    tags: ['期末'],
    difficulty: 3,
    description: '月末结转所有损益类科目余额至"本年利润"。',
    tip: '本月新增联营专柜业务，注意联营佣金收入也通过"主营业务收入"核算（净额法，不确认商品成本）。结转后各损益科目余额归零。',
    entries: [
      // 收入类（原贷方余额→借方转出）
      { subjectCode: '6001', debit: 328000, credit: 0, summary: '结转主营业务收入', explanation: '含自营POS销售约313,000+联营佣金约7,000+预付卡消费8,500≈328,000元。' },
      { subjectCode: '6603', debit: 295, credit: 0, summary: '结转财务费用（净利息收入）', explanation: '财务费用净贷方余额295元，作为收入转出。' },
      // 费用类（原借方余额→贷方转出）
      { subjectCode: '6401', debit: 0, credit: 233000, summary: '结转主营业务成本', explanation: '自营商品成本233,000元。' },
      { subjectCode: '6403', debit: 0, credit: 2437.5, summary: '结转税金及附加', explanation: '税金及附加结转至本年利润。借：本年利润，贷：税金及附加。' },
      { subjectCode: '6601', debit: 0, credit: 53000, summary: '结转销售费用', explanation: '一线员工工资53,000元。' },
      { subjectCode: '6602', debit: 0, credit: 12350, summary: '结转管理费用（水电+损耗）', explanation: '水电9,900+生鲜损耗2,450=12,350元。' },
      { subjectCode: '660203', debit: 0, credit: 8000, summary: '结转管理费用-工资薪金', explanation: '店长工资8,000元。' },
      { subjectCode: '660205', debit: 0, credit: 1350, summary: '结转管理费用-折旧费', explanation: '折旧1,350元。' },
      // 净利润→本年利润贷方
      { subjectCode: '4103', debit: 0, credit: 18157.5, summary: '结转净利润', explanation: '本月净利润=328,295-310,137.50=18,157.50元。累计净利润：119,874.90+18,157.50=138,032.40元。（联营佣金贡献约7,000元成为新利润增长点。）' }
    ],
    documents: [
      { type: 'text', label: '损益计算表', docTitle: '2026年3月损益计算表（含联营专柜）', stampText: '财务专用章',
        content: '万悦超市 2026年3月损益计算表\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n一、营业收入：328,000.00元\n  自营商品销售：313,000元\n  联营佣金收入：7,000元（净额法）\n  预付卡消费确认：8,000元\n\n二、减：成本及费用\n  主营业务成本：233,000元（仅自营）\n  税金及附加：2,437.50元\n  销售费用：53,000元\n  管理费用：21,350元\n  财务费用（净）：-295元\n\n三、本月净利润：18,507.50元\n累计净利润：138,432.40元\n\n说明：联营专柜本月贡献佣金约7,000元，\n成为新的利润增长点。\n\n制表：李会计  审核：赵会计主管' }]},
  {
    date: '2026-03-31',
    role: 'accountant',
    title: '模拟纳税申报',
    tags: ['期末', '申报', "info"],
    difficulty: 1,
    description: '根据本月已完成的账务处理，进行模拟纳税申报。前往纳税申报页面核对并提交。',
    tip: '前往纳税申报页面核对数据后完成申报。半年末注意检查增值税累计数据。',
    entries: [],
    nextAction: 'tax-filing',
    documents: [
      { type: 'text', label: '纳税申报提醒', docTitle: '2026年3月纳税申报提醒', stampText: '财务专用章',
        content: '纳税申报提醒\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n申报期间：2026年3月\n\n增值税：应交24,375.00元\n城建税：1,706.25元\n教育费附加：731.25元\n\n请前往纳税申报页面核对后点击「提交申报」' }]},

  // ═══════════════════════════════════════════
  // 出纳任务
  // ═══════════════════════════════════════════
  {
    date: '2026-03-11',
    role: 'accountant',
    title: 'POS日常销售',
    tags: ['商品销售'],
    tip: 'POS日常销售按实际收款确认收入。借：银行存款，贷：主营业务收入、应交税费-销项。',
    difficulty: 1,
    description: 'POS日常销售含税收入56,500元（不含税50,000元，增值税6,500元），已收存银行。',
    entries: [
      { subjectCode: '100201', summary: 'POS销售收款', debit: 56500, credit: 0, explanation: '银行存款增加。日常销售收款。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金。'},
      { subjectCode: '6001', summary: '主营业务收入', debit: 0, credit: 50000, explanation: '主营业务收入增加。' },
      { subjectCode: '222101', summary: '增值税销项', debit: 0, credit: 6500, explanation: '应交税费-应交增值税（销项税额）增加。' }],
    documents: [
      { type: 'text', label: 'POS日结单', docTitle: 'POS收银系统日结单（2026年3月11日）', stampText: '收银专用章',
        content: `万悦超市 POS日结单
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
日期：2026年3月11日（工作日）

交易统计：
  交易笔数：约470笔
  客单价：约120元

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
    date: '2026-03-20',
    role: 'accountant',
    title: '银行手续费',
    tags: ['资金管理'],
    tip: '银行手续费计入财务费用。',
    difficulty: 1,
    description: '工商银行扣收3月账户管理费及转账手续费220元。',
    entries: [
      { subjectCode: '6603', summary: '银行手续费', debit: 220, credit: 0, explanation: '财务费用增加。' },
      { subjectCode: '100201', summary: '银行扣费', debit: 0, credit: 220, explanation: '银行存款减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出。'}],
    documents: [
      { type: 'bank', label: '银行扣费回单', date: '2026-03-20', totalAmount: 220, payer: '本公司', payeeName: '工商银行', content: '3月账户管理费', refNo: 'HD202603200001' }]},
  {
    date: '2026-03-24',
    role: 'accountant',
    title: '预付卡消费确认',
    tags: ['商品销售'],
    difficulty: 2,
    description: '本月顾客持预付卡累计消费6,800元（含税），确认收入。不含税6,017.70元，增值税782.30元。',
    tip: '顾客持卡消费时从预收账款转入主营业务收入。借：预收账款/合同负债，贷：主营业务收入、应交税费-销项税额。',
    entries: [
      { subjectCode: '2203', summary: '预付卡消费冲减', debit: 6800, credit: 0, explanation: '预收账款减少。' },
      { subjectCode: '6001', summary: '预付卡消费收入', debit: 0, credit: 6017.7, explanation: '主营业务收入增加。' },
      { subjectCode: '222101', summary: '增值税销项', debit: 0, credit: 782.3, explanation: '应交税费-应交增值税（销项税额）增加。' }],
    documents: [
      { type: 'text', label: '预付卡消费汇总', docTitle: '预付卡消费汇总（2026年3月）', stampText: '财务专用章',
        content: `预付卡消费汇总
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
期间：2026年3月

本月消费：
  消费金额（含税）：6,800.00元
  不含税收入：6,017.70元
  增值税（13%）：782.30元

预付卡余额追踪：
  2月售卡总额：65,000.00元
  3月初已消费：9,605.00元
  本次消费：6,800.00元
  剩余未消费：48,595.00元

依据：国家税务总局公告2016年第53号
  售卡时不确认收入
  消费时确认收入并计提销项税` }]},
  {
    date: '2026-03-12',
    role: 'accountant',
    title: 'POS日常销售',
    tags: ['商品销售'],
    tip: 'POS日常销售按实际收款确认收入。借：银行存款，贷：主营业务收入、应交税费-销项。',
    difficulty: 1,
    description: 'POS日常销售含税收入45,200元（不含税40,000元，增值税5,200元），已收存银行。',
    entries: [
      { subjectCode: '100201', summary: 'POS收款', debit: 45200, credit: 0, explanation: '银行存款增加。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金，属于经营活动现金流入。'},
      { subjectCode: '6001', summary: '销售收入', debit: 0, credit: 40000, explanation: '主营业务收入增加。' },
      { subjectCode: '222101', summary: '增值税销项', debit: 0, credit: 5200, explanation: '应交税费-应交增值税（销项税额）增加。' }],
    documents: [{ type: 'text', label: 'POS日结单', docTitle: 'POS收银系统日结单（2026年3月12日）', stampText: '收银专用章',
      content: `万悦超市 POS日结单
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
日期：2026年3月12日

交易统计：
  交易笔数：约380笔
  客单价：约119元

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
    date: '2026-03-18',
    role: 'accountant',
    title: 'POS日常销售',
    tags: ['商品销售'],
    tip: 'POS日常销售按实际收款确认收入。借：银行存款，贷：主营业务收入、应交税费-销项。',
    difficulty: 1,
    description: 'POS日常销售含税收入33,900元（不含税30,000元，增值税3,900元）。',
    entries: [
      { subjectCode: '100201', summary: 'POS收款', debit: 33900, credit: 0, explanation: '银行存款增加。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金，属于经营活动现金流入。'},
      { subjectCode: '6001', summary: '销售收入', debit: 0, credit: 30000, explanation: '销售收入增加记贷方。不含税金额贷记主营业务收入。' },
      { subjectCode: '222101', summary: '增值税销项', debit: 0, credit: 3900, explanation: '增值税销项税额增加记贷方。销售商品适用13%税率。' }],
    documents: [{ type: 'text', label: 'POS日结单', docTitle: 'POS收银系统日结单（2026年3月18日）', stampText: '收银专用章',
      content: `万悦超市 POS日结单
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
日期：2026年3月18日

交易统计：
  交易笔数：约290笔
  客单价：约117元

支付方式明细：
  微信支付：  13,200.00元（38.9%）
  支付宝：     7,500.00元（22.1%）
  银行卡：     9,500.00元（28.0%）
  现金：       3,700.00元（10.9%）
  ─────────────────────────────
  合计含税：  33,900.00元
  不含税收入： 30,000.00元
  增值税：      3,900.00元` }]},
  {
    date: '2026-03-22',
    role: 'accountant',
    title: '生鲜补货（现购）',
    tags: ['商品采购', '税费'],
    tip: '采购商品按不含税价入库存商品，进项税可抵扣。',
    difficulty: 2,
    description: '向绿源农业采购生鲜12,000元（不含税），增值税1,080元（9%），价税合计13,080元付讫。',
    entries: [
      { subjectCode: '1405', summary: '生鲜入库', debit: 12000, credit: 0, explanation: '库存商品增加。' },
      { subjectCode: '222101', summary: '进项税额', debit: 1080, credit: 0, explanation: '应交税费-应交增值税（进项税额）增加。' },
      { subjectCode: '100201', summary: '支付货款', debit: 0, credit: 13080, explanation: '银行存款减少。' , cashFlowItem: 'cf-op2', cashFlowExplanation: '采购存货/商品支出，属于经营活动现金流出。'}],
    documents: [{ type: 'invoice', label: '增值税普通发票（农产品）', region: '上海', invoiceNo: '3100789011', date: '2026-03-22', buyer: '万悦超市有限公司', seller: '绿源农业有限公司', totalAmount: 13080, taxRate: '9%', taxAmount: 1080,
      lineItems: [{ name: '蔬菜', unit: '斤', qty: 600, price: 5, amount: 3000 }, { name: '水果', unit: '斤', qty: 500, price: 12, amount: 6000 }, { name: '鲜肉', unit: '斤', qty: 150, price: 20, amount: 3000 }] },
      { type: 'text', label: '生鲜验收单', docTitle: '生鲜商品验收单', content: '供应商：绿源农业有限公司\n入库日期：2026-03-22\n\n验收情况：\n1. 蔬菜 600斤 ✓ 新鲜度合格\n2. 水果 500斤 ✓ 成熟度适中\n3. 鲜肉 150斤 ✓ 检疫合格\n\n验收人：钱验收', signature: '生鲜验收专用章' }]},
  {
    date: '2026-03-26',
    role: 'accountant',
    title: '日用品补货',
    tags: ['商品采购'],
    tip: '采购商品按不含税价入库存商品，进项税可抵扣。',
    difficulty: 2,
    description: '向洁宝日化赊购日用品18,000元（不含税），增值税2,340元，价税合计20,340元。',
    entries: [
      { subjectCode: '1405', summary: '日用品入库', debit: 18000, credit: 0, explanation: '库存商品增加记借方。采购商品验收入库。' },
      { subjectCode: '222101', summary: '进项税额', debit: 2340, credit: 0, explanation: '增值税进项税额增加记借方。取得专用发票可抵扣。' },
      { subjectCode: '220203', summary: '赊购款未付', debit: 0, credit: 20340, explanation: '应付账款增加。' }],
    documents: [{ type: 'invoice', label: '增值税专用发票', region: '广东', invoiceNo: '4400789123', date: '2026-03-26', buyer: '万悦超市有限公司', seller: '洁宝日化有限公司', totalAmount: 20340, taxRate: '13%', taxAmount: 2340,
      lineItems: [{ name: '日用品', unit: '箱', qty: 100, price: 180, amount: 18000 }] },
      { type: 'text', label: '商品入库验收单', docTitle: '商品入库验收单', content: '供应商：洁宝日化有限公司\n入库日期：2026-03-26\n\n商品明细：\n1. 日用品 100箱 ✓\n\n验收结论：全部合格 ✓\n\n入库保管：赵保管\n验收：钱验收', signature: '仓库验收专用章' }]}
]
export default tasks
