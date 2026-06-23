/**
 * 服务业 11月 - 🏆 冲刺·绩效考核
 * I项目终验、J项目确认收入、年终奖计提、研发完成结转入无形资产
 */

const nov = [
  { date: '2026-11-03', role: 'accountant', title: '发放10月员工工资', tags: ["工资社保"], difficulty: 1,
    entries: [{ subjectCode: '221101', summary: '发10月工资', debit: 260000, credit: 0 }, { subjectCode: '100201', summary: '实发', debit: 0, credit: 215000 }, { subjectCode: '224101', summary: '代扣社保', debit: 0, credit: 26000 }, { subjectCode: '224102', summary: '代扣公积金', debit: 0, credit: 13000 }, { subjectCode: '222110', summary: '代扣个税', debit: 0, credit: 6000 }],
    documents: [
      { type: 'bank', label: '代发工资回单', date: '2026-11-03', totalAmount: 215000, payer: '雲帆管理咨询有限公司', payeeName: '员工代发户', content: '10月工资代发（共56人）', refNo: 'HD202611030001' },
      { type: 'text', label: '工资表', docTitle: '10 月 工 资 发 放 表', date: '2026-11-03', stampText: '人力资源部\n工资专用章', content: '期间：2026年10月\n应发工资总额：260,000.00元\n扣款：社保26,000+公积金13,000+个税6,000=45,000元\n实发合计：215,000.00元（银行代发）\n\n制表：王出纳\n审核：李会计' }] },
  { date: '2026-11-04', role: 'accountant', title: '缴纳10月社保公积金', tags: ["工资社保"], difficulty: 1,
    entries: [{ subjectCode: '221102', summary: '企业社保', debit: 52500, credit: 0 }, { subjectCode: '224101', summary: '个人社保', debit: 26000, credit: 0 }, { subjectCode: '221102', summary: '企业公积金', debit: 26000, credit: 0 }, { subjectCode: '224102', summary: '个人公积金', debit: 13000, credit: 0 }, { subjectCode: '100201', summary: '支付', debit: 0, credit: 117500 }],
    documents: [
      { type: 'bank', label: '扣款回单', date: '2026-11-04', totalAmount: 117500, payer: '雲帆管理咨询有限公司', payeeName: '北京市社会保险基金管理中心', content: '10月社保+公积金缴纳', refNo: 'HD202611040002' }] },
  { date: '2026-11-05', role: 'accountant', title: '缴纳10月增值税及附加', tags: ["税费"], difficulty: 1,
    entries: [{ subjectCode: '222101', summary: '增值税', debit: 7800, credit: 0 }, { subjectCode: '222103', summary: '城建税', debit: 546, credit: 0 }, { subjectCode: '222104', summary: '附加', debit: 390, credit: 0 }, { subjectCode: '100201', summary: '缴税', debit: 0, credit: 8736 }],
    documents: [
      { type: 'bank', label: '缴税回单', date: '2026-11-05', totalAmount: 8736, payer: '雲帆管理咨询有限公司', payeeName: '国家税务总局北京市税务局', content: '10月增值税及附加税缴纳', refNo: 'HD202611050003' }] },
  { date: '2026-11-06', role: 'accountant', title: '确认E年框11月收入', tags: ["项目核算"], difficulty: 2,
    entries: [{ subjectCode: '2232', summary: 'E公司11月', debit: 21200, credit: 0 }, { subjectCode: '6001', summary: '年框收入', debit: 0, credit: 20000 }, { subjectCode: '222101', summary: '销项税额', debit: 0, credit: 1200 }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '北京', invoiceType: '专用', copy: '发票联', invoiceNo: '1100432135', date: '2026年11月06日', buyer: 'E集团公司', buyerTaxId: '91110108MAZZZZZZZ', seller: '雲帆管理咨询有限公司', sellerTaxId: '91110108MA3XXXXXXXX', stampText: '发票专用章', payee: '李四', reviewer: '王五', drawer: '赵六', lineItems: [{ name: '年度管理咨询服务（11月）', unit: '月', qty: 1, price: 20000, amount: 20000, taxRate: '6%', tax: 1200 }], totalAmount: 21200 }] },
  { date: '2026-11-07', role: 'accountant', title: '确认G运维11月收入', tags: ["项目核算"], difficulty: 2,
    entries: [{ subjectCode: '2232', summary: 'G公司11月', debit: 15900, credit: 0 }, { subjectCode: '6001', summary: '运维收入', debit: 0, credit: 15000 }, { subjectCode: '222101', summary: '销项税额', debit: 0, credit: 900 }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '北京', invoiceType: '专用', copy: '发票联', invoiceNo: '1100432136', date: '2026年11月07日', buyer: 'G集团有限公司', buyerTaxId: '91110108MAKKKKKKK', seller: '雲帆管理咨询有限公司', sellerTaxId: '91110108MA3XXXXXXXX', stampText: '发票专用章', payee: '李四', reviewer: '王五', drawer: '赵六', lineItems: [{ name: 'IT运维服务（11月）', unit: '月', qty: 1, price: 15000, amount: 15000, taxRate: '6%', tax: 900 }], totalAmount: 15900 }] },
  { date: '2026-11-08', role: 'accountant', title: '确认H订阅11月收入', tags: ["项目核算"], difficulty: 2,
    entries: [{ subjectCode: '2232', summary: 'H公司11月', debit: 15900, credit: 0 }, { subjectCode: '6051', summary: 'SaaS收入', debit: 0, credit: 15000 }, { subjectCode: '222101', summary: '销项税额', debit: 0, credit: 900 }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '北京', invoiceType: '专用', copy: '发票联', invoiceNo: '1100432137', date: '2026年11月08日', buyer: 'H科技有限公司', buyerTaxId: '91110108MAHHHHHHH', seller: '雲帆管理咨询有限公司', sellerTaxId: '91110108MA3XXXXXXXX', stampText: '发票专用章', payee: '李四', reviewer: '王五', drawer: '赵六', lineItems: [{ name: '雲帆智能平台SaaS订阅（11月）', unit: '月', qty: 1, price: 15000, amount: 15000, taxRate: '6%', tax: 900 }], totalAmount: 15900 }] },
  { date: '2026-11-09', role: 'accountant', title: 'I项目终验交付', tags: ["项目核算"], difficulty: 2,
    description: 'I公司管理咨询项目终验，终验收入120,000元（280,000-80,000-已确认部分）。增值税6%=7,200元。',
    entries: [{ subjectCode: '1122', summary: 'I公司终验款', debit: 127200, credit: 0 }, { subjectCode: '6001', summary: 'I终验收入', debit: 0, credit: 120000 }, { subjectCode: '222101', summary: '销项税额', debit: 0, credit: 7200 }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '北京', invoiceType: '专用', copy: '发票联', invoiceNo: '1100432138', date: '2026年11月09日', buyer: 'I科技有限公司', buyerTaxId: '91110108MAIIIIIII', seller: '雲帆管理咨询有限公司', sellerTaxId: '91110108MA3XXXXXXXX', stampText: '发票专用章', payee: '李四', reviewer: '王五', drawer: '赵六', lineItems: [{ name: '战略绩效咨询（终验阶段）', unit: '项', qty: 1, price: 120000, amount: 120000, taxRate: '6%', tax: 7200 }], totalAmount: 127200 },
      { type: 'text', label: '终验报告', docTitle: '项 目 终 验 报 告', date: '2026-11-09', stampText: 'I科技有限公司\n项目验收专用章', content: '项目名称：战略绩效管理体系设计与落地\n验收阶段：终验\n合同金额：280,000元\n已确认收入：80,000+120,000=200,000元\n本次终验收入：120,000元\n验收结论：通过 ✓\n\n甲方代表：陈总\n乙方代表：王顾问' }] },
  { date: '2026-11-10', role: 'accountant', title: 'J项目确认第一阶段收入', tags: ["项目核算"], difficulty: 2,
    description: 'J公司联合项目完成项目管理方案设计，确认收入150,000元（占合同500,000的30%）。增值税6%=9,000元。',
    entries: [{ subjectCode: '2232', summary: 'J公司预收款转收入', debit: 159000, credit: 0 }, { subjectCode: '6001', summary: 'J项目阶段一', debit: 0, credit: 150000 }, { subjectCode: '222101', summary: '销项税额', debit: 0, credit: 9000 }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '北京', invoiceType: '专用', copy: '发票联', invoiceNo: '1100432139', date: '2026年11月10日', buyer: 'J实业集团有限公司', buyerTaxId: '91110108MAJJJJJJJ', seller: '雲帆管理咨询有限公司', sellerTaxId: '91110108MA3XXXXXXXX', stampText: '发票专用章', payee: '李四', reviewer: '王五', drawer: '赵六', lineItems: [{ name: '数字化转型实施（方案设计阶段）', unit: '项', qty: 1, price: 150000, amount: 150000, taxRate: '6%', tax: 9000 }], totalAmount: 159000 },
      { type: 'text', label: '阶段验收单', docTitle: '第 一 阶 段 验 收 确 认 单', date: '2026-11-10', stampText: 'J实业集团有限公司\n项目专用章', content: '项目名称：数字化转型实施项目\n阶段：方案设计阶段（完工30%）\n验收结论：通过 ✓\n交付物：数字化转型总体规划方案、系统架构设计\n\n甲方代表：孙总\n乙方代表：王顾问\n分包方确认：K公司 ✓' }] },
  { date: '2026-11-11', role: 'accountant', title: '支付11月写字楼租金', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '660205', summary: '房租', debit: 22000, credit: 0 }, { subjectCode: '660205', summary: '物业费', debit: 3000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 25000 }],
    documents: [
      { type: 'receipt', label: '房屋租赁收据', docTitle: '房 屋 租 赁 专 用 收 据', date: '2026-11-11', totalAmount: 25000, payer: '雲帆管理咨询有限公司', stampText: '北京XX物业管理有限公司\n财务专用章', items: [{ name: '望京XX大厦15层 11月租金', qty: 1, price: 22000, amount: 22000 }, { name: '11月物业管理费', qty: 1, price: 3000, amount: 3000 }]}] },
  { date: '2026-11-12', role: 'accountant', title: '研发完成·结转无形资产', tags: ["项目核算"], difficulty: 3,
    tip: '开发阶段符合资本化条件的研发支出，在开发完成时转入无形资产。借：无形资产，贷：研发支出-资本化。',
    description: '雲帆智能管理分析平台开发完成，通过验收测试。累计资本化支出=7月0+8月65,000+9月60,000+10月60,000+11月0=185,000元。全部转入无形资产，按5年摊销。',
    entries: [{ subjectCode: '1701', summary: '研发完成转入', debit: 185000, credit: 0, explanation: '无形资产增加。资本化研发支出结转至无形资产。' }, { subjectCode: '530101', summary: '结转资本化支出', debit: 0, credit: 185000, explanation: '研发支出——资本化支出减少。开发完成结转入无形资产。' }],
    documents: [
      { type: 'text', label: '研发验收报告', docTitle: '研 发 项 目 验 收 报 告', date: '2026-11-12', stampText: '雲帆管理咨询有限公司\n技术研发部', content: '项目名称：雲帆智能管理分析平台 V1.0\n开发周期：2026年7月—2026年11月（5个月）\n\n验收结论：通过 ✓\n功能清单：\n  1. 项目管理模块 ✓\n  2. 财务分析模块 ✓\n  3. 数据看板模块 ✓\n  4. 用户权限系统 ✓\n\n资本化支出明细：\n  8月：65,000元\n  9月：60,000元\n  10月：60,000元\n  合计：185,000元\n\n摊销政策：5年直线法，月摊销3,083.33元\n\n技术总监：刘工 ✓' },
      { type: 'text', label: '无形资产入账通知', docTitle: '无 形 资 产 入 账 通 知 书', date: '2026-11-12', stampText: '财务专用章', content: '资产名称：雲帆智能管理分析平台软件V1.0\n类别：计算机软件著作权\n原值：185,000.00元\n摊销年限：5年（60个月）\n月摊销额：3,083.33元\n入账日期：2026年11月\n备注：从12月起计提摊销\n\n制表：李会计\n审核：赵会计主管' }] },
  { date: '2026-11-13', role: 'accountant', title: 'SaaS产品升级推广', tags: ["费用管理"], difficulty: 1,
    description: '智能平台v1.1版本发布，线上推广费18,000元。',
    entries: [{ subjectCode: '6601', summary: '产品推广', debit: 18000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 18000 }],
    documents: [
      { type: 'receipt', label: '推广费发票', docTitle: '线 上 推 广 服 务 发 票', date: '2026-11-13', totalAmount: 18000, payer: '雲帆管理咨询有限公司', stampText: '字节跳动巨量引擎\n发票专用章', items: [{ name: 'v1.1版本信息流推广', qty: 1, price: 18000, amount: 18000 }]},
      { type: 'bank', label: '转账回单', date: '2026-11-13', totalAmount: 18000, payer: '雲帆管理咨询有限公司', payeeName: '字节跳动科技有限公司', content: 'SaaS v1.1升级推广费用', refNo: 'HD202611130004' }] },
  { date: '2026-11-14', role: 'accountant', title: '支付11月水电及网络', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '6602', summary: '水电费', debit: 5500, credit: 0 }, { subjectCode: '6602', summary: '网络费', debit: 2000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 7500 }],
    documents: [
      { type: 'receipt', label: '电费凭证', docTitle: '电 费 缴 费 凭 证', date: '2026-11-14', totalAmount: 5500, payer: '雲帆管理咨询有限公司', stampText: '国家电网\n电费收讫章', items: [{ name: '写字楼用电 5,500kWh×1.00元', qty: 5500, price: 1, amount: 5500 }]},
      { type: 'receipt', label: '通信费发票', docTitle: '通 信 服 务 发 票', date: '2026-11-14', totalAmount: 2000, payer: '雲帆管理咨询有限公司', stampText: '中国联通\n发票专用章', items: [{ name: '企业宽带+电话（11月）', qty: 1, price: 2000, amount: 2000 }]}] },
  { date: '2026-11-15', role: 'accountant', title: '摊销及折旧', tags: ["费用管理"], difficulty: 2,
    description: 'SaaS摊销3,000+无形资产摊销400+折旧2,620=6,020。',
    entries: [{ subjectCode: '6602', summary: '摊销', debit: 3400, credit: 0 }, { subjectCode: '6602', summary: '折旧', debit: 2620, credit: 0 }, { subjectCode: '1208', summary: '摊销', debit: 0, credit: 3000 }, { subjectCode: '1702', summary: '累计摊销', debit: 0, credit: 400 }, { subjectCode: '1602', summary: '折旧', debit: 0, credit: 2620 }],
    documents: [
      { type: 'text', label: '摊销折旧表', docTitle: '摊 销 折 旧 计 提 表', date: '2026-11-15', stampText: '财务专用章', content: '期间：2026年11月\n\nSaaS摊销：36,000÷12=3,000.00元\n无形资产摊销：400.00元\n折旧合计：2,620.00元\n\n合计：6,020.00元\n\n制表：李会计' }] },
  { date: '2026-11-16', role: 'accountant', title: '自研平台摊销（从下月起）', tags: ["费用管理"], difficulty: 2,
    description: '自研平台185,000元，5年摊销，月摊销=185,000÷5÷12=3,083.33元。12月起计提。',
    entries: [],
    documents: [
      { type: 'text', label: '摊销计划', docTitle: '自 研 平 台 摊 销 计 划 表', date: '2026-11-16', stampText: '财务专用章', content: '资产：雲帆智能管理分析平台V1.0（无形资产）\n入账原值：185,000.00元\n摊销方法：直线法\n摊销年限：5年（60个月）\n月摊销额：185,000÷5÷12=3,083.33元\n首次摊销：2026年12月\n\n制表：李会计' }] },
  { date: '2026-11-17', role: 'accountant', title: '缴纳代扣个税', tags: ["税费"], difficulty: 1,
    entries: [{ subjectCode: '222110', summary: '个税', debit: 6000, credit: 0 }, { subjectCode: '100201', summary: '缴税', debit: 0, credit: 6000 }],
    documents: [
      { type: 'bank', label: '缴税回单', date: '2026-11-17', totalAmount: 6000, payer: '雲帆管理咨询有限公司', payeeName: '国家税务总局北京市税务局', content: '10月代扣代缴个人所得税', refNo: 'HD202611170005' }] },
  { date: '2026-11-18', role: 'accountant', title: '银行手续费及利息', tags: ["资金管理"], difficulty: 1,
    entries: [{ subjectCode: '6603', summary: '手续费', debit: 650, credit: 0 }, { subjectCode: '100201', summary: '扣费', debit: 0, credit: 650 }, { subjectCode: '100201', summary: '结息', debit: 3800, credit: 0 }, { subjectCode: '6603', summary: '利息收入', debit: 0, credit: 3800 }],
    documents: [
      { type: 'bank', label: '扣费回单', date: '2026-11-18', totalAmount: 650, payer: '雲帆管理咨询有限公司', payeeName: '中国工商银行北京分行', content: '11月账户服务费及转账手续费', refNo: 'HD202611180006' },
      { type: 'bank', label: '结息回单', date: '2026-11-18', totalAmount: 3800, payer: '中国工商银行北京分行', payeeName: '雲帆管理咨询有限公司', content: '活期存款2026年11月结息', refNo: 'HD202611180007' }] },
  { date: '2026-11-19', role: 'accountant', title: 'J项目分包尾款支付', tags: ["项目核算"], difficulty: 2,
    description: 'J项目完成第一阶段，支付K公司分包尾款=200,000×50%-已付100,000=0（尾款待终验后支付）。',
    entries: [],
    documents: [
      { type: 'text', label: '付款说明', docTitle: '分 包 付 款 计 划 表', date: '2026-11-19', stampText: '财务专用章', content: '项目：J公司数字化转型实施——K公司分包\n\n合同分包金额：200,000元\n已预付（50%）：100,000元（10月支付）\n本次应付：0元（按合同，第一阶不触发尾款支付）\n\n下一笔待付：分包中期款60,000元（终验后）\n\n制表：王出纳\n审核：李会计' }] },
  { date: '2026-11-20', role: 'accountant', title: '业务招待费', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '660203', summary: '招待费', debit: 3000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 3000 }],
    documents: [
      { type: 'receipt', label: '餐饮发票', docTitle: '北 京 市 餐 饮 服 务 发 票', date: '2026-11-20', totalAmount: 3000, payer: '雲帆管理咨询有限公司', stampText: 'XX餐厅\n发票专用章', items: [{ name: 'J公司项目总结宴请', qty: 1, price: 3000, amount: 3000 }]}] },
  { date: '2026-11-21', role: 'accountant', title: '计提年终奖', tags: ["工资社保"], difficulty: 3,
    tip: '年终奖在12月计提，按全年绩效计算。借：管理费用/劳务成本，贷：应付职工薪酬。',
    description: '计提全年年终奖金。按全年利润总额的15%计提=约800,000×15%=120,000元。其中项目人员85,000元（含B、C、F、I等项目奖金），管理人员35,000元。',
    entries: [{ subjectCode: '520101', summary: '项目人员年终奖', debit: 85000, credit: 0 }, { subjectCode: '6602', summary: '管理年终奖', debit: 35000, credit: 0 }, { subjectCode: '221101', summary: '应付年终奖', debit: 0, credit: 120000 }],
    documents: [
      { type: 'text', label: '年终奖计提表', docTitle: '2026 年 度 年 终 奖 计 提 表', date: '2026-11-21', stampText: '人力资源部\n奖金审批专用章', content: '计提年度：2026年\n计提比例：全年利润总额约800,000×15%=120,000元\n\n分配方案：\n  项目人员合计：85,000元\n    B项目团队：15,000元\n    C项目团队：18,000元\n    F项目团队：20,000元\n    I项目团队：17,000元\n    G/H运维组：15,000元\n  管理人员合计：35,000元\n    行政人事：12,000元\n    财务人员：15,000元\n    管理层：8,000元\n\n合计：120,000元\n\n审批：总经理 ✓' }] },
  { date: '2026-11-22', role: 'accountant', title: '计提11月员工工资', tags: ["工资社保"], difficulty: 2,
    description: '计提11月工资。项目140,000+研发0+管理55,000=195,000。',
    entries: [{ subjectCode: '520101', summary: '项目工资', debit: 140000, credit: 0 }, { subjectCode: '6602', summary: '管理工资', debit: 55000, credit: 0 }, { subjectCode: '221101', summary: '应付工资', debit: 0, credit: 195000 }],
    documents: [
      { type: 'text', label: '工资计算表', docTitle: '11 月 工 资 计 算 汇 总 表', date: '2026-11-22', stampText: '人力资源部\n工资专用章', content: '期间：2026年11月\n\n项目人员：140,000元（E/G/J项目并行）\n管理人员：55,000元\n（研发已全部转无形资产，不再计提研发工资）\n\n应发合计：195,000元\n\n制表：王出纳\n审核：李会计' }] },
  { date: '2026-11-24', role: 'accountant', title: '计提社保公积金', tags: ["工资社保"], difficulty: 2,
    entries: [{ subjectCode: '520101', summary: '项目社保', debit: 28000, credit: 0 }, { subjectCode: '520101', summary: '项目公积金', debit: 14000, credit: 0 }, { subjectCode: '6602', summary: '管理社保', debit: 11500, credit: 0 }, { subjectCode: '6602', summary: '管理公积金', debit: 5500, credit: 0 }, { subjectCode: '221102', summary: '应付社保', debit: 0, credit: 39500 }, { subjectCode: '221102', summary: '应付公积金', debit: 0, credit: 19500 }],
    documents: [
      { type: 'text', label: '社保公积金计提表', docTitle: '社 保 公 积 金 计 提 汇 总 表', date: '2026-11-24', stampText: '财务专用章', content: '期间：2026年11月\n\n社保（企业部分）：\n  项目人员：28,000元\n  管理人员：11,500元\n  小计：39,500元\n\n公积金（企业部分）：\n  项目人员：14,000元\n  管理人员：5,500元\n  小计：19,500元\n\n合计：59,000元\n\n制表：李会计' }] },
  { date: '2026-11-25', role: 'accountant', title: '计提11月城建税及附加', tags: ["税费"], difficulty: 2,
    description: '销项税额=1,200+900+900+7,200+9,000=19,200。',
    entries: [{ subjectCode: '6403', summary: '城建税', debit: 1344, credit: 0 }, { subjectCode: '6403', summary: '教育附加', debit: 576, credit: 0 }, { subjectCode: '6403', summary: '地方教育附加', debit: 384, credit: 0 }, { subjectCode: '222103', summary: '应交城建税', debit: 0, credit: 1344 }, { subjectCode: '222104', summary: '应交附加', debit: 0, credit: 960 }],
    documents: [
      { type: 'text', label: '税费计算表', docTitle: '城 建 税 及 教 育 附 加 计 提 表', date: '2026-11-25', stampText: '财务专用章', content: '期间：2026年11月\n计税依据：应纳增值税19,200.00元\n\n城建税（7%）：19,200×7%=1,344.00元\n教育附加（3%）：19,200×3%=576.00元\n地方教育附加（2%）：19,200×2%=384.00元\n\n合计：2,304.00元\n\n制表：李会计' }] },
  { date: '2026-11-27', role: 'accountant', title: '月末期间损益结转', tags: ["期末"], difficulty: 3,
    description: '收入：E20,000+G15,000+H15,000+I120,000+J150,000=320,000。',
    entries: [{ subjectCode: '6001', summary: '转主营收入', debit: 305000, credit: 0 }, { subjectCode: '6051', summary: '转其他收入', debit: 15000, credit: 0 }, { subjectCode: '4103', summary: '收入转入', debit: 0, credit: 320000 },
      { subjectCode: '4103', summary: '费用转入', debit: 210304, credit: 0 }, { subjectCode: '6401', summary: '转成本', debit: 0, credit: 70000 }, { subjectCode: '6403', summary: '转税金', debit: 0, credit: 2304 }, { subjectCode: '6602', summary: '转管理费', debit: 0, credit: 120000 }, { subjectCode: '6601', summary: '转销售费', debit: 0, credit: 18000 }],
    documents: [
      { type: 'text', label: '结转表', docTitle: '期 间 损 益 结 转 表', date: '2026-11-30', stampText: '已结转', content: '结转期间：2026年11月\n\n收入类→本年利润：\n  主营业务收入：305,000元（E20,000+G15,000+I120,000+J150,000）\n  其他业务收入：15,000元（H订阅）\n  合计：320,000元\n\n费用类→本年利润：\n  主营业务成本：70,000元\n  税金及附加：2,304元\n  管理费用（含年终奖）：120,000元\n  销售费用：18,000元\n  合计：210,304元\n\n本月净利润：109,696元\n\n制表：李会计' }] },
  { date: '2026-11-28', role: 'accountant', title: '计提无形资产摊销', tags: ["费用管理"], difficulty: 2,
    entries: [{ subjectCode: '6602', summary: '摊销', debit: 400, credit: 0 }, { subjectCode: '1702', summary: '累计摊销', debit: 0, credit: 400 }],
    documents: [
      { type: 'text', label: '摊销计算表', docTitle: '无 形 资 产 摊 销 计 算 表', date: '2026-11-28', stampText: '财务专用章', content: '无形资产：软件项目管理工具（永久许可）\n原值：24,000.00元\n累计摊销：2,800.00元\n月摊销额：400.00元\n\n制表：李会计' }] },
  { date: '2026-11-29', role: 'accountant', title: '提取备用金', tags: ["资金管理"], difficulty: 1,
    entries: [{ subjectCode: '1001', summary: '备用金', debit: 2000, credit: 0 }, { subjectCode: '100201', summary: '提现', debit: 0, credit: 2000 }],
    documents: [
      { type: 'bank', label: '现金支票回单', date: '2026-11-29', totalAmount: 2000, payer: '雲帆管理咨询有限公司', payeeName: '雲帆管理咨询有限公司（现金）', content: '提取备用金', refNo: 'HD202611290008' }] },
  { date: '2026-11-28', role: 'accountant', title: '购买办公用品', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '660201', summary: '办公用品', debit: 2500, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 2500 }],
    documents: [
      { type: 'receipt', label: '办公用品发票', docTitle: '办 公 用 品 发 票', date: '2026-11-28', totalAmount: 2500, payer: '雲帆管理咨询有限公司', stampText: '得力办公\n发票专用章', items: [{ name: '年度归档文件夹、档案盒等', qty: 1, price: 2500, amount: 2500 }]}] },
  { date: '2026-11-28', role: 'accountant', title: '报销员工差旅费', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '660202', summary: '差旅费', debit: 4000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 4000 }],
    documents: [
      { type: 'receipt', label: '差旅报销单', docTitle: '差 旅 费 报 销 单', date: '2026-11-28', totalAmount: 4000, payer: '雲帆管理咨询有限公司', stampText: '财务\n审核专用章', items: [{ name: 'J项目现场实施 高铁2人×2程', qty: 4, price: 550, amount: 2200 }, { name: '住宿 2人×3晚×280元', qty: 6, price: 280, amount: 1680 }, { name: '补贴', qty: 1, price: 120, amount: 120 }]}] },
  { date: '2026-11-29', role: 'accountant', title: '业务招待费', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '660203', summary: '招待费', debit: 3000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 3000 }],
    documents: [
      { type: 'receipt', label: '餐饮发票', docTitle: '北 京 市 餐 饮 服 务 发 票', date: '2026-11-29', totalAmount: 3000, payer: '雲帆管理咨询有限公司', stampText: 'XX酒店\n发票专用章', items: [{ name: '年终客户答谢', qty: 1, price: 3000, amount: 3000 }]}] },
  { date: '2026-11-29', role: 'accountant', title: '提取备用金', tags: ["资金管理"], difficulty: 1,
    entries: [{ subjectCode: '1001', summary: '备用金', debit: 3000, credit: 0 }, { subjectCode: '100201', summary: '提现', debit: 0, credit: 3000 }],
    documents: [
      { type: 'bank', label: '现金支票回单', date: '2026-11-29', totalAmount: 3000, payer: '雲帆管理咨询有限公司', payeeName: '雲帆管理咨询有限公司（现金）', content: '提取备用金', refNo: 'HD202611290009' }] },
  { date: '2026-11-30', role: 'accountant', title: '模拟纳税申报', tags: ["税费", "期末"], difficulty: 1, entries: [], nextAction: 'tax-filing',
    documents: [{ type: 'text', label: '申报提醒', docTitle: '11 月 纳 税 申 报 提 醒', stampText: '财务专用章', content: '申报期间：2026年11月\n截止日期：2026年12月15日\n\n申报税种：\n1. 增值税（6%，销项税额19,200元）\n2. 城市维护建设税（7%）\n3. 教育费附加（3%+2%）\n4. 代扣代缴个人所得税\n\n请前往纳税申报页面核对后提交。' }] },
]

export default nov
