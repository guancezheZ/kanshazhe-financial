/**
 * 服务业 8月 - 💻 软件产品·SaaS收入
 * 研发持续推进、G公司IT运维收入确认、E+G年框并行
 */

const aug = [
  { date: '2026-08-03', role: 'accountant', title: '发放7月员工工资', tags: ["工资社保"], difficulty: 1,
    entries: [{ subjectCode: '221101', summary: '发7月工资', debit: 213000, credit: 0 }, { subjectCode: '100201', summary: '实发', debit: 0, credit: 176000 }, { subjectCode: '224101', summary: '代扣社保', debit: 0, credit: 21000 }, { subjectCode: '224102', summary: '代扣公积金', debit: 0, credit: 11000 }, { subjectCode: '222110', summary: '代扣个税', debit: 0, credit: 5000 }],
    documents: [
      { type: 'bank', label: '代发工资回单', date: '2026-08-03', totalAmount: 176000, payer: '雲帆管理咨询有限公司', payeeName: '员工代发户', content: '7月工资代发（共52人）', refNo: 'HD202608030001' },
      { type: 'text', label: '工资表', docTitle: '7 月 工 资 发 放 表', date: '2026-08-03', stampText: '人力资源部\n工资专用章', content: '期间：2026年7月\n应发工资总额：213,000.00元\n扣款：社保21,000+公积金11,000+个税5,000=37,000元\n实发合计：176,000.00元（银行代发）\n\n制表：王出纳\n审核：李会计' }] },
  { date: '2026-08-04', role: 'accountant', title: '缴纳7月社保公积金', tags: ["工资社保"], difficulty: 1,
    entries: [{ subjectCode: '221102', summary: '企业社保', debit: 43000, credit: 0 }, { subjectCode: '224101', summary: '个人社保', debit: 21000, credit: 0 }, { subjectCode: '221102', summary: '企业公积金', debit: 22000, credit: 0 }, { subjectCode: '224102', summary: '个人公积金', debit: 11000, credit: 0 }, { subjectCode: '100201', summary: '支付', debit: 0, credit: 97000 }],
    documents: [
      { type: 'bank', label: '扣款回单', date: '2026-08-04', totalAmount: 97000, payer: '雲帆管理咨询有限公司', payeeName: '北京市社会保险基金管理中心', content: '7月社保+公积金缴纳', refNo: 'HD202608040002' }] },
  { date: '2026-08-05', role: 'accountant', title: '缴纳7月增值税及附加', tags: ["税费"], difficulty: 1,
    entries: [{ subjectCode: '222101', summary: '增值税', debit: 9000, credit: 0 }, { subjectCode: '222103', summary: '城建税', debit: 630, credit: 0 }, { subjectCode: '222104', summary: '附加', debit: 450, credit: 0 }, { subjectCode: '100201', summary: '缴税', debit: 0, credit: 10080 }],
    documents: [
      { type: 'bank', label: '缴税回单', date: '2026-08-05', totalAmount: 10080, payer: '雲帆管理咨询有限公司', payeeName: '国家税务总局北京市税务局', content: '7月增值税及附加税缴纳', refNo: 'HD202608050003' }] },
  { date: '2026-08-06', role: 'accountant', title: '确认E公司年框8月收入', tags: ["项目核算"], difficulty: 2,
    entries: [{ subjectCode: '2232', summary: 'E公司8月', debit: 21200, credit: 0 }, { subjectCode: '6001', summary: '年框收入', debit: 0, credit: 20000 }, { subjectCode: '222101', summary: '销项税额', debit: 0, credit: 1200 }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '北京', invoiceType: '专用', copy: '发票联', invoiceNo: '1100432125', date: '2026年08月06日', buyer: 'E集团公司', buyerTaxId: '91110108MAZZZZZZZ', seller: '雲帆管理咨询有限公司', sellerTaxId: '91110108MA3XXXXXXXX', stampText: '发票专用章', payee: '李四', reviewer: '王五', drawer: '赵六', lineItems: [{ name: '年度管理咨询服务（8月）', unit: '月', qty: 1, price: 20000, amount: 20000, taxRate: '6%', tax: 1200 }], totalAmount: 21200 }] },
  { date: '2026-08-07', role: 'accountant', title: '确认G公司运维8月收入', tags: ["项目核算"], difficulty: 2,
    description: '按直线法确认G公司IT运维8月收入15,000元。增值税6%=900元。',
    entries: [{ subjectCode: '2232', summary: 'G公司8月收入', debit: 15900, credit: 0 }, { subjectCode: '6001', summary: '运维收入', debit: 0, credit: 15000 }, { subjectCode: '222101', summary: '销项税额', debit: 0, credit: 900 }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '北京', invoiceType: '专用', copy: '发票联', invoiceNo: '1100432126', date: '2026年08月07日', buyer: 'G集团有限公司', buyerTaxId: '91110108MAKKKKKKK', seller: '雲帆管理咨询有限公司', sellerTaxId: '91110108MA3XXXXXXXX', stampText: '发票专用章', payee: '李四', reviewer: '王五', drawer: '赵六', lineItems: [{ name: 'IT运维服务（8月）', unit: '月', qty: 1, price: 15000, amount: 15000, taxRate: '6%', tax: 900 }], totalAmount: 15900 }] },
  { date: '2026-08-08', role: 'accountant', title: '研发支出归集-8月', tags: ["项目核算"], difficulty: 2,
    description: '研发团队8月工资及费用。开发阶段条件判断：技术可行性已论证，符合资本化条件，转入资本化支出。',
    entries: [{ subjectCode: '530101', summary: '研发支出-资本化', debit: 65000, credit: 0, explanation: '研发支出——资本化支出增加。开发阶段符合资本化条件。' }, { subjectCode: '221101', summary: '应付研发工资', debit: 0, credit: 50000 }, { subjectCode: '100201', summary: '云资源费', debit: 0, credit: 15000 }],
    documents: [
      { type: 'text', label: '研发支出归集表', docTitle: '研 发 支 出 归 集 表', date: '2026-08-08', stampText: '技术研发部\n财务专用章', content: '项目：雲帆智能管理分析平台 V1.0\n期间：2026年8月\n\n资本化支出：（开发阶段——技术可行性已论证）\n  研发人员工资：50,000元\n  云服务器及资源：15,000元\n  合计：65,000元\n\n开发阶段已满足资本化条件：\n1. 技术可行性已论证 ✓\n2. 有完成意图和能力 ✓\n3. 未来经济利益流入很可能 ✓\n4. 开发支出可可靠计量 ✓\n\n制表：李会计\n审核：赵会计主管' }] },
  { date: '2026-08-09', role: 'accountant', title: '支付8月写字楼租金', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '660205', summary: '房租', debit: 22000, credit: 0 }, { subjectCode: '660205', summary: '物业费', debit: 3000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 25000 }],
    documents: [
      { type: 'receipt', label: '房屋租赁收据', docTitle: '房 屋 租 赁 专 用 收 据', date: '2026-08-09', totalAmount: 25000, payer: '雲帆管理咨询有限公司', stampText: '北京XX物业管理有限公司\n财务专用章', items: [{ name: '望京XX大厦15层 8月租金', qty: 1, price: 22000, amount: 22000 }, { name: '8月物业管理费', qty: 1, price: 3000, amount: 3000 }]}] },
  { date: '2026-08-11', role: 'accountant', title: 'SaaS产品内测·市场推广', tags: ["费用管理"], difficulty: 1,
    description: '雲帆智能管理分析平台内测版发布，线上广告投放15,000元。',
    entries: [{ subjectCode: '6601', summary: 'SaaS推广费', debit: 15000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 15000 }],
    documents: [
      { type: 'receipt', label: '广告费发票', docTitle: '线 上 广 告 服 务 发 票', date: '2026-08-11', totalAmount: 15000, payer: '雲帆管理咨询有限公司', stampText: '百度在线网络技术有限公司\n发票专用章', items: [{ name: '信息流广告投放（8月）', qty: 1, price: 15000, amount: 15000 }]},
      { type: 'bank', label: '转账回单', date: '2026-08-11', totalAmount: 15000, payer: '雲帆管理咨询有限公司', payeeName: '百度在线网络技术有限公司', content: 'SaaS内测版线上广告投放', refNo: 'HD202608110004' }] },
  { date: '2026-08-12', role: 'accountant', title: '支付8月水电及网络', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '6602', summary: '水电费', debit: 5200, credit: 0 }, { subjectCode: '6602', summary: '网络费', debit: 2000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 7200 }],
    documents: [
      { type: 'receipt', label: '电费凭证', docTitle: '电 费 缴 费 凭 证', date: '2026-08-12', totalAmount: 5200, payer: '雲帆管理咨询有限公司', stampText: '国家电网\n电费收讫章', items: [{ name: '写字楼用电 5,200kWh×1.00元', qty: 5200, price: 1, amount: 5200 }]},
      { type: 'receipt', label: '通信费发票', docTitle: '通 信 服 务 发 票', date: '2026-08-12', totalAmount: 2000, payer: '雲帆管理咨询有限公司', stampText: '中国联通\n发票专用章', items: [{ name: '企业宽带+电话（8月）', qty: 1, price: 2000, amount: 2000 }]}] },
  { date: '2026-08-13', role: 'accountant', title: '报销研发人员差旅', tags: ["项目核算"], difficulty: 2,
    entries: [{ subjectCode: '530101', summary: '研发差旅-资本化', debit: 6000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 6000 }],
    documents: [
      { type: 'receipt', label: '差旅报销单', docTitle: '差 旅 费 报 销 单', date: '2026-08-13', totalAmount: 6000, payer: '雲帆管理咨询有限公司', stampText: '财务\n审核专用章', items: [{ name: '深圳出差 高铁3人×2程', qty: 6, price: 500, amount: 3000 }, { name: '住宿 3人×3晚×300元', qty: 9, price: 300, amount: 2700 }, { name: '市内交通', qty: 1, price: 300, amount: 300 }]}] },
  { date: '2026-08-14', role: 'accountant', title: '摊销及折旧', tags: ["费用管理"], difficulty: 2,
    entries: [{ subjectCode: '6602', summary: '摊销', debit: 3400, credit: 0, explanation: '含SaaS3,000+无形资产400。' }, { subjectCode: '6602', summary: '折旧', debit: 2620, credit: 0 }, { subjectCode: '1208', summary: '摊销', debit: 0, credit: 3000 }, { subjectCode: '1702', summary: '累计摊销', debit: 0, credit: 400 }, { subjectCode: '1602', summary: '折旧', debit: 0, credit: 2620 }],
    documents: [
      { type: 'text', label: '摊销折旧表', docTitle: '摊 销 折 旧 计 提 表', date: '2026-08-14', stampText: '财务专用章', content: '期间：2026年8月\n\nSaaS摊销：36,000÷12=3,000.00元\n无形资产摊销：400.00元\n折旧合计：2,620.00元\n\n合计：6,020.00元\n\n制表：李会计' }] },
  { date: '2026-08-15', role: 'accountant', title: '缴纳代扣个税', tags: ["税费"], difficulty: 1,
    entries: [{ subjectCode: '222110', summary: '个税', debit: 5000, credit: 0 }, { subjectCode: '100201', summary: '缴税', debit: 0, credit: 5000 }],
    documents: [
      { type: 'bank', label: '缴税回单', date: '2026-08-15', totalAmount: 5000, payer: '雲帆管理咨询有限公司', payeeName: '国家税务总局北京市税务局', content: '7月代扣代缴个人所得税', refNo: 'HD202608150005' }] },
  { date: '2026-08-16', role: 'accountant', title: '银行手续费及利息', tags: ["资金管理"], difficulty: 1,
    entries: [{ subjectCode: '6603', summary: '手续费', debit: 550, credit: 0 }, { subjectCode: '100201', summary: '扣费', debit: 0, credit: 550 }, { subjectCode: '100201', summary: '结息', debit: 3000, credit: 0 }, { subjectCode: '6603', summary: '利息收入', debit: 0, credit: 3000 }],
    documents: [
      { type: 'bank', label: '扣费回单', date: '2026-08-16', totalAmount: 550, payer: '雲帆管理咨询有限公司', payeeName: '中国工商银行北京分行', content: '8月账户服务费及转账手续费', refNo: 'HD202608160006' },
      { type: 'bank', label: '结息回单', date: '2026-08-16', totalAmount: 3000, payer: '中国工商银行北京分行', payeeName: '雲帆管理咨询有限公司', content: '活期存款2026年8月结息', refNo: 'HD202608160007' }] },
  { date: '2026-08-18', role: 'accountant', title: '业务招待费', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '660203', summary: '招待费', debit: 3500, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 3500 }],
    documents: [
      { type: 'receipt', label: '餐饮发票', docTitle: '北 京 市 餐 饮 服 务 发 票', date: '2026-08-18', totalAmount: 3500, payer: '雲帆管理咨询有限公司', stampText: 'XX餐厅\n发票专用章', items: [{ name: 'H公司客户招待', qty: 1, price: 3500, amount: 3500 }]}] },
  { date: '2026-08-19', role: 'accountant', title: '购买办公用品', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '660201', summary: '办公用品', debit: 1800, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 1800 }],
    documents: [
      { type: 'receipt', label: '办公用品发票', docTitle: '办 公 用 品 发 票', date: '2026-08-19', totalAmount: 1800, payer: '雲帆管理咨询有限公司', stampText: '京东办公\n发票专用章', items: [{ name: '打印纸×5箱、墨盒×10', qty: 1, price: 1800, amount: 1800 }]}] },
  { date: '2026-08-21', role: 'accountant', title: 'SaaS产品预售·收到首笔订阅费', tags: ["项目核算"], difficulty: 2,
    tip: 'SaaS订阅收入先计入合同负债，按月分期确认收入。',
    description: '雲帆智能平台预售，H公司签约三年SaaS订阅，年费60,000×3=180,000元一次性付清。按月确认收入15,000元。',
    entries: [{ subjectCode: '100201', summary: 'H公司SaaS订阅', debit: 180000, credit: 0 }, { subjectCode: '2232', summary: '预收H公司订阅', debit: 0, credit: 180000 }],
    documents: [
      { type: 'bank', label: '收款回单', date: '2026-08-21', totalAmount: 180000, payer: 'H科技有限公司', payerAccount: '6222 0100 **** 9999', payeeName: '雲帆管理咨询有限公司', payeeAccount: '6222 0200 **** 1234', content: 'SaaS订阅三年费用一次性付清', refNo: 'HD202608210008' },
      { type: 'text', label: 'SaaS订阅合同', docTitle: 'SaaS 订 阅 服 务 合 同', date: '2026-08-21', stampText: '合同专用章', content: '甲方：H科技有限公司\n乙方：雲帆管理咨询有限公司\n\n产品：雲帆智能管理分析平台\n订阅期限：3年（2026年8月-2029年7月）\n年费：60,000元/年\n总金额：180,000元\n付款方式：签约日一次性付清三年\n收入确认：按月直线法确认，月收入15,000元' }] },
  { date: '2026-08-22', role: 'accountant', title: '确认H公司8月SaaS收入', tags: ["项目核算"], difficulty: 2,
    description: '按直线法确认H公司SaaS订阅8月收入15,000元。增值税6%=900元。',
    entries: [{ subjectCode: '2232', summary: 'H公司8月收入', debit: 15900, credit: 0 }, { subjectCode: '6051', summary: 'SaaS订阅收入', debit: 0, credit: 15000, explanation: '其他业务收入——SaaS订阅。' }, { subjectCode: '222101', summary: '销项税额', debit: 0, credit: 900 }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '北京', invoiceType: '专用', copy: '发票联', invoiceNo: '1100432127', date: '2026年08月22日', buyer: 'H科技有限公司', buyerTaxId: '91110108MAHHHHHHH', seller: '雲帆管理咨询有限公司', sellerTaxId: '91110108MA3XXXXXXXX', stampText: '发票专用章', payee: '李四', reviewer: '王五', drawer: '赵六', lineItems: [{ name: '雲帆智能管理平台SaaS订阅（8月）', unit: '月', qty: 1, price: 15000, amount: 15000, taxRate: '6%', tax: 900 }], totalAmount: 15900 }] },
  { date: '2026-08-23', role: 'accountant', title: '计提8月员工工资', tags: ["工资社保"], difficulty: 2,
    description: '计提8月工资。项目人员120,000+研发65,000+管理50,000=235,000元。',
    entries: [{ subjectCode: '520101', summary: '项目工资', debit: 120000, credit: 0 }, { subjectCode: '530101', summary: '研发资本化工资', debit: 50000, credit: 0 }, { subjectCode: '530102', summary: '研发费用化工', debit: 15000, credit: 0 }, { subjectCode: '6602', summary: '管理工资', debit: 50000, credit: 0 }, { subjectCode: '221101', summary: '应付工资', debit: 0, credit: 235000 }],
    documents: [
      { type: 'text', label: '工资计算表', docTitle: '8 月 工 资 计 算 汇 总 表', date: '2026-08-23', stampText: '人力资源部\n工资专用章', content: '期间：2026年8月\n\n项目人员（在执项目E/G）：120,000元\n研发人员（资本化）：50,000元\n研发人员（费用化）：15,000元\n管理人员：50,000元\n\n应发合计：235,000元\n\n制表：王出纳\n审核：李会计' }] },
  { date: '2026-08-24', role: 'accountant', title: '计提社保公积金', tags: ["工资社保"], difficulty: 2,
    entries: [{ subjectCode: '520101', summary: '项目社保', debit: 24000, credit: 0 }, { subjectCode: '520101', summary: '项目公积金', debit: 12000, credit: 0 }, { subjectCode: '530101', summary: '研发资本化社保', debit: 10000, credit: 0 }, { subjectCode: '530101', summary: '研发资本化公积金', debit: 5000, credit: 0 }, { subjectCode: '530102', summary: '研发费用化社保', debit: 3000, credit: 0 }, { subjectCode: '530102', summary: '研发费用化公积金', debit: 1500, credit: 0 }, { subjectCode: '6602', summary: '管理社保', debit: 10500, credit: 0 }, { subjectCode: '6602', summary: '管理公积金', debit: 5000, credit: 0 }, { subjectCode: '221102', summary: '应付社保', debit: 0, credit: 47500 }, { subjectCode: '221102', summary: '应付公积金', debit: 0, credit: 23500 }],
    documents: [
      { type: 'text', label: '社保公积金计提表', docTitle: '社 保 公 积 金 计 提 汇 总 表', date: '2026-08-24', stampText: '财务专用章', content: '期间：2026年8月\n\n社保（企业部分）：\n  项目人员：24,000元\n  研发资本化：10,000元\n  研发费用化：3,000元\n  管理人员：10,500元\n  小计：47,500元\n\n公积金（企业部分）：\n  项目人员：12,000元\n  研发资本化：5,000元\n  研发费用化：1,500元\n  管理人员：5,000元\n  小计：23,500元\n\n合计：71,000元\n\n制表：李会计' }] },
  { date: '2026-08-25', role: 'accountant', title: '计提8月城建税及附加', tags: ["税费"], difficulty: 2,
    description: '销项税额=1,200(E)+900(G)+900(H)=3,000元。',
    entries: [{ subjectCode: '6403', summary: '城建税', debit: 210, credit: 0 }, { subjectCode: '6403', summary: '教育附加', debit: 90, credit: 0 }, { subjectCode: '6403', summary: '地方教育附加', debit: 60, credit: 0 }, { subjectCode: '222103', summary: '应交城建税', debit: 0, credit: 210 }, { subjectCode: '222104', summary: '应交附加', debit: 0, credit: 150 }],
    documents: [
      { type: 'text', label: '税费计算表', docTitle: '城 建 税 及 教 育 附 加 计 提 表', date: '2026-08-25', stampText: '财务专用章', content: '期间：2026年8月\n计税依据：应纳增值税3,000.00元\n\n城建税（7%）：3,000×7%=210.00元\n教育附加（3%）：3,000×3%=90.00元\n地方教育附加（2%）：3,000×2%=60.00元\n\n合计：360.00元\n\n制表：李会计' }] },
  { date: '2026-08-26', role: 'accountant', title: '月末期间损益结转', tags: ["期末"], difficulty: 3,
    description: '收入：E年框20,000+G运维15,000+H订阅15,000=50,000。',
    entries: [{ subjectCode: '6001', summary: '转主营收入', debit: 35000, credit: 0 }, { subjectCode: '6051', summary: '转其他收入', debit: 15000, credit: 0 }, { subjectCode: '4103', summary: '收入转入', debit: 0, credit: 50000 },
      { subjectCode: '4103', summary: '费用转入', debit: 45000, credit: 0 }, { subjectCode: '6602', summary: '转管理费', debit: 0, credit: 30000 }, { subjectCode: '6601', summary: '转销售费', debit: 0, credit: 15000 }],
    documents: [
      { type: 'text', label: '结转表', docTitle: '期 间 损 益 结 转 表', date: '2026-08-31', stampText: '已结转', content: '结转期间：2026年8月\n\n收入类→本年利润：\n  主营业务收入：35,000元（E年框20,000+G运维15,000）\n  其他业务收入：15,000元（H订阅）\n  合计：50,000元\n\n费用类→本年利润：\n  管理费用：30,000元\n  销售费用：15,000元（内测推广+展会）\n  合计：45,000元\n\n本月净利润：5,000元\n（SaaS收入模式初见成效）\n\n制表：李会计' }] },
  { date: '2026-08-28', role: 'accountant', title: '提取备用金', tags: ["资金管理"], difficulty: 1,
    entries: [{ subjectCode: '1001', summary: '备用金', debit: 2000, credit: 0 }, { subjectCode: '100201', summary: '提现', debit: 0, credit: 2000 }],
    documents: [
      { type: 'bank', label: '现金支票回单', date: '2026-08-28', totalAmount: 2000, payer: '雲帆管理咨询有限公司', payeeName: '雲帆管理咨询有限公司（现金）', content: '提取备用金', refNo: 'HD202608280009' }] },
  { date: '2026-08-29', role: 'accountant', title: '计提无形资产摊销', tags: ["费用管理"], difficulty: 2,
    entries: [{ subjectCode: '6602', summary: '摊销', debit: 400, credit: 0 }, { subjectCode: '1702', summary: '累计摊销', debit: 0, credit: 400 }],
    documents: [
      { type: 'text', label: '摊销计算表', docTitle: '无 形 资 产 摊 销 计 算 表', date: '2026-08-29', stampText: '财务专用章', content: '无形资产：软件项目管理工具（永久许可）\n原值：24,000.00元\n摊销期限：5年（60个月）\n月摊销额：24,000÷60=400.00元\n累计摊销：1,600.00元\n\n制表：李会计' }] },
  { date: '2026-08-30', role: 'accountant', title: '期末结转劳务成本', tags: ["项目核算", "期末"], difficulty: 3,
    description: '结转已确认收入对应的成本。E/G/H三个合同均为纯服务类，本月直接成本较少，主要为人工。预估成本20,000元。',
    entries: [{ subjectCode: '6401', summary: '结转人工', debit: 20000, credit: 0 }, { subjectCode: '520101', summary: '转人工', debit: 0, credit: 20000 }],
    documents: [
      { type: 'text', label: '成本计算表', docTitle: '服 务 成 本 结 转 计 算 表', date: '2026-08-30', stampText: '财务专用章', content: '结转期间：2026年8月\n\nE公司年框人工成本：10,000元\nG公司运维人工成本：5,000元\nH公司SaaS人工成本：5,000元\n\n合计结转：20,000元\n\n制表：李会计' }] },
  { date: '2026-08-28', role: 'accountant', title: '参加行业展会·市场推广', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '6601', summary: '展会费', debit: 8000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 8000 }],
    documents: [
      { type: 'receipt', label: '展会发票', docTitle: '会 展 服 务 发 票', date: '2026-08-28', totalAmount: 8000, payer: '雲帆管理咨询有限公司', stampText: '北京国际会展中心\n发票专用章', items: [{ name: '2026中国SaaS大会标准展位', qty: 1, price: 8000, amount: 8000 }]},
      { type: 'bank', label: '转账回单', date: '2026-08-28', totalAmount: 8000, payer: '雲帆管理咨询有限公司', payeeName: '北京国际会展中心', content: 'SaaS行业展会参展费', refNo: 'HD202608280010' }] },
  { date: '2026-08-29', role: 'accountant', title: '购买办公用品', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '660201', summary: '办公用品', debit: 2000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 2000 }],
    documents: [
      { type: 'receipt', label: '办公用品发票', docTitle: '办 公 用 品 发 票', date: '2026-08-29', totalAmount: 2000, payer: '雲帆管理咨询有限公司', stampText: '晨光文具\n发票专用章', items: [{ name: '文件夹、笔记本、印台等', qty: 1, price: 2000, amount: 2000 }]}] },
  { date: '2026-08-29', role: 'accountant', title: '报销员工培训费', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '6602', summary: '培训费', debit: 4500, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 4500 }],
    documents: [
      { type: 'receipt', label: '培训发票', docTitle: '专 业 培 训 服 务 发 票', date: '2026-08-29', totalAmount: 4500, payer: '雲帆管理咨询有限公司', stampText: 'XX培训机构\n发票专用章', items: [{ name: 'PMP项目管理认证培训×3人', qty: 3, price: 1500, amount: 4500 }]}] },
  { date: '2026-08-30', role: 'accountant', title: '业务招待费', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '660203', summary: '招待费', debit: 3000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 3000 }],
    documents: [
      { type: 'receipt', label: '餐饮发票', docTitle: '北 京 市 餐 饮 服 务 发 票', date: '2026-08-30', totalAmount: 3000, payer: '雲帆管理咨询有限公司', stampText: 'XX酒店\n发票专用章', items: [{ name: 'G公司运维总结宴请', qty: 1, price: 3000, amount: 3000 }]}] },
  { date: '2026-08-30', role: 'accountant', title: '提取备用金', tags: ["资金管理"], difficulty: 1,
    entries: [{ subjectCode: '1001', summary: '备用金', debit: 2000, credit: 0 }, { subjectCode: '100201', summary: '提现', debit: 0, credit: 2000 }],
    documents: [
      { type: 'bank', label: '现金支票回单', date: '2026-08-30', totalAmount: 2000, payer: '雲帆管理咨询有限公司', payeeName: '雲帆管理咨询有限公司（现金）', content: '提取备用金', refNo: 'HD202608300011' }] },
  { date: '2026-08-31', role: 'accountant', title: '模拟纳税申报', tags: ["税费", "期末"], difficulty: 1, entries: [], nextAction: 'tax-filing',
    documents: [{ type: 'text', label: '申报提醒', docTitle: '8 月 纳 税 申 报 提 醒', stampText: '财务专用章', content: '申报期间：2026年8月\n截止日期：2026年9月15日\n\n申报税种：\n1. 增值税（6%，销项税额3,000元）\n2. 城市维护建设税（7%）\n3. 教育费附加（3%+2%）\n4. 代扣代缴个人所得税\n\n请前往纳税申报页面核对后提交。' }] },
]

export default aug
