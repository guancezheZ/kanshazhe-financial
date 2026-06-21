/**
 * 2月份业务教程数据（45个任务：25会计 + 20出纳）
 * ⭐ 新增：微信收款处理（第三方支付入门）
 *
 * 难度：★★☆☆☆（比1月深入）
 * 新增业务类型：实际发放工资、个税扣缴、社保个人部分、无形资产摊销、借款利息计提
 * 业务叙事：延续1月业务，处理上期应付款/应收款、工资发放、社保缴纳等实际资金流出
 *
 * 出纳专题：银行结算入门——现金支票操作、银行转账、代扣确认、票据管理、资金日报
 *
 * 会计准则依据：《企业会计准则——基本准则》（财政部令第76号）
 */

const feb = [
  {
    date: '2026-02-01',
    title: '月初库存现金清点与日记账启用',
    tags: ["出纳"],
    difficulty: 1,
    description: '2月第一个工作日，出纳首先清点保险柜库存现金余额，确认与现金日记账1月末余额一致（4,000元），并启用2月份现金日记账和银行日记账新账页。',
    tip: '每月初出纳的第一项工作就是清点库存现金并与账面核对。确认无误后启用新账页登记本月业务。这是出纳"日清月结"制度的基础。',
    role: 'cashier',
    entries: [],
    documents: [
      { type: 'text', label: '现金日记账', docTitle: '现金日记账（2026年2月）', stampText: '现金日记账',
        content: `现金日记账
━━━━━━━━━━━━━━━━━━━━━━━━━
2月期初余额：4,000.00
（承1月末余额）

注：已与总账核对一致。
核对人：王出纳
核对日期：2026年2月1日` },
      { type: 'text', label: '库存现金盘点表', docTitle: '库存现金盘点表', stampText: '财务专用章',
        content: `库存现金盘点表
盘点日期：2026年2月1日

账面余额：4,000.00
实盘金额：4,000.00
盘点结果：相符✓

盘点人：王出纳
监盘人：李会计` }]},
  {
    date: '2026-02-02',
    title: '发放1月份员工工资',
    tags: ["工资社保"],
      difficulty: 2,
    description: '以银行存款发放1月份计提的工资 60,000元，同时代扣社保个人部分 6,000元、公积金个人部分 3,000元、个税 1,500元，实发 49,500元。',
    tip: '发放工资时：借：应付职工薪酬-工资（应发数），贷：银行存款（实发数）、其他应付款-社保/公积金（代扣部分）、应交税费-应交个人所得税。代扣款项需按时缴纳。',
    entries: [
      { subjectCode: '221101', summary: '发放1月工资', debit: 60000, credit: 0, explanation: '发放工资时冲减"应付职工薪酬-工资"（应发数）。1月计提的60,000元工资负债现在清偿。' },
      { subjectCode: '100201', summary: '实发工资', debit: 0, credit: 49500, explanation: '实发金额=应发60,000-社保6,000-公积金3,000-个税1,500=49,500元。代扣款项暂挂其他应付款。' , cashFlowItem: 'cf-op3', cashFlowExplanation: '支付职工薪酬相关支出（配对科目221101），属于"支付给职工以及为职工支付的现金"——经营活动现金流出。'},
      { subjectCode: '224101', summary: '代扣社保个人部分', debit: 0, credit: 6000, explanation: '社保个人部分从工资中代扣，形成对社保局的负债。次月缴纳时再冲减。' },
      { subjectCode: '224102', summary: '代扣公积金个人部分', debit: 0, credit: 3000, explanation: '其他应付款-公积金增加记贷方。代扣公积金个人部分暂由企业保管。' },
      { subjectCode: '222102', summary: '代扣个税', debit: 0, credit: 1500, explanation: '代扣的个人所得税暂挂"应交税费-应交个人所得税"，次月15日前向税务机关申报缴纳。' }],
    documents: [
      { type: 'text', label: '工资发放表', docTitle: '2026年1月工资发放明细', stampText: '财务专用章', signature: '制表：王出纳  审核：李会计  批准：赵总',
        content: `应发合计：60,000.00
代扣社保：  6,000.00（个人部分）
代扣公积金： 3,000.00（个人部分）
代扣个税：  1,500.00
实发合计：49,500.00

发放方式：银行转账
发放日期：2026年2月2日` },
      { type: 'bank', label: '银行回单', date: '2026-02-02', totalAmount: 49500, payer: '本公司', payeeName: '员工工资代发户', content: '1月份工资发放', refNo: 'HD202602020015' }]},
  {
    date: '2026-02-03',
    title: '缴纳上月代扣个税',
    tags: ["税费"],
      difficulty: 1,
    description: '向税务机关申报并缴纳上月代扣的个人所得税 1,500元，以银行存款支付。',
    tip: '企业代扣的员工个税必须在次月15日前向税务机关申报缴纳。分录：借：应交税费-应交个人所得税，贷：银行存款。',
    entries: [
      { subjectCode: '222102', summary: '缴纳1月代扣个税', debit: 1500, credit: 0, explanation: '应交个人所得税减少记借方。上月代扣个税现在缴纳，负债清偿。' },
      { subjectCode: '100201', summary: '缴纳1月代扣个税', debit: 0, credit: 1500, explanation: '银行存款减少记贷方。"缴纳1月代扣个税"，资金从银行划出，资产减少。月末需银行对账。' , cashFlowItem: 'cf-op4', cashFlowExplanation: '缴纳税费支出（配对科目222102），属于"支付的各项税费"——经营活动现金流出。'}],
    documents: [
      { type: 'receipt', label: '缴税凭证', docTitle: '中华人民共和国税收缴款书', date: '2026-02-03', totalAmount: 1500, payer: '本公司', stampText: '国家税务总局\n征收章',
        items: [{ name: '个人所得税（代扣代缴）', qty: 1, price: 1500, amount: 1500 }] },
      { type: 'bank', label: '银行回单', date: '2026-02-03', totalAmount: 1500, payer: '本公司', payeeName: '国家税务总局XX分局', content: '缴纳1月代扣个税', refNo: 'HD202602030022' }]},
  {
    date: '2026-02-04',
    title: '缴纳上月社保费（含个人部分）',
    tags: ["工资社保"],
      difficulty: 2,
    description: '缴纳1月份社保费合计 24,000元。其中单位部分 18,000元（上月已计提），个人部分 6,000元（上月发工资时代扣）。',
    tip: '社保缴纳分两部分：单位部分冲减已计提的应付职工薪酬-社保；个人部分冲减其他应付款-社保（发工资时代扣的）。',
    entries: [
      { subjectCode: '221102', summary: '缴纳1月社保单位部分', debit: 18000, credit: 0, explanation: '应付职工薪酬-社保减少记借方。缴纳社保单位部分，冲减原计提负债。' },
      { subjectCode: '224101', summary: '缴纳代扣社保个人部分', debit: 6000, credit: 0, explanation: '其他应付款-社保减少记借方。代扣社保个人部分已缴给社保局，负债减少。' },
      { subjectCode: '100201', summary: '缴纳1月社保费', debit: 0, credit: 24000, explanation: '银行存款减少记贷方。"缴纳1月社保费"，资金从银行划出，资产减少。月末需银行对账。' , cashFlowItem: 'cf-op3', cashFlowExplanation: '支付职工薪酬相关支出（配对科目221102），属于"支付给职工以及为职工支付的现金"——经营活动现金流出。'}],
    documents: [
      { type: 'receipt', label: '社保缴费单', docTitle: '社会保险费缴费通知单', date: '2026-02-04', totalAmount: 24000, payer: '本公司', stampText: 'XX市社保\n征缴章',
        items: [{ name: '单位部分（养老/医疗/失业/工伤/生育）', qty: 1, price: 18000, amount: 18000 }, { name: '个人部分（养老/医疗/失业）', qty: 1, price: 6000, amount: 6000 }] }]},
  {
    date: '2026-02-05',
    title: '缴纳上月公积金（含个人部分）',
    tags: ["工资社保"],
      difficulty: 2,
    description: '缴纳1月份住房公积金合计 12,000元。其中单位部分 9,000元（上月已计提），个人部分 3,000元（上月发工资时代扣）。',
    tip: '公积金缴纳与社保同理：单位部分冲应付职工薪酬-公积金，个人部分冲其他应付款-公积金。',
    entries: [
      { subjectCode: '221103', summary: '缴纳1月公积金单位部分', debit: 9000, credit: 0, explanation: '应付职工薪酬-公积金减少记借方。缴纳公积金单位部分，冲减原计提负债。' },
      { subjectCode: '224102', summary: '缴纳代扣公积金个人部分', debit: 3000, credit: 0, explanation: '其他应付款-公积金减少记借方。代扣公积金已缴给公积金中心，负债减少。' },
      { subjectCode: '100201', summary: '缴纳1月公积金', debit: 0, credit: 12000, explanation: '银行存款减少记贷方。"缴纳1月公积金"，资金从银行划出，资产减少。月末需银行对账。' , cashFlowItem: 'cf-op3', cashFlowExplanation: '支付职工薪酬相关支出（配对科目221103），属于"支付给职工以及为职工支付的现金"——经营活动现金流出。'}],
    documents: [
      { type: 'receipt', label: '公积金汇缴书', docTitle: '住房公积金汇缴书', date: '2026-02-05', totalAmount: 12000, payer: '本公司', stampText: 'XX市公积金\n管理中心\n业务专用章',
        items: [{ name: '单位缴存', qty: 13, price: 692.31, amount: 9000 }, { name: '个人缴存', qty: 13, price: 230.77, amount: 3000 }] }]},
  {
    date: '2026-02-06',
    title: '销售商品（赊销给丁公司）',
    tags: ["销售"],
      difficulty: 2,
    description: '向新客户丁公司销售商品一批，价款 120,000元，增值税 15,600元（13%），款项暂欠。',
    tip: '赊销与现销的区别在于借方科目不同：赊销借"应收账款"，现销借"银行存款"。赊销形成了债权，需要关注回款时间。',
    entries: [
      { subjectCode: '112203', summary: '赊销商品-丁公司', debit: 135600, credit: 0, explanation: '应收账款增加记借方。"赊销商品-丁公司"，商品已发出但款项未收，形成对客户的债权。需关注回款期限防止坏账。' },
      { subjectCode: '6001', summary: '赊销商品收入', debit: 0, credit: 120000, explanation: '主营业务收入增加记贷方。收入按不含税价确认（价税分离）。控制权转移时确认收入。' },
      { subjectCode: '222101', summary: '赊销商品销项税', debit: 0, credit: 15600, explanation: '销项税额增加记贷方。代收的增值税形成纳税义务。应交增值税=销项-进项。' }],
    documents: [
      { type: 'invoice', label: '增值税发票', region: '广东', invoiceType: '专用', copy: '发票联', invoiceNo: '4400205678', date: '2026年02月06日', buyer: '丁公司', buyerTaxId: '91440101MA7ZZZZZZZ', seller: '本公司', sellerTaxId: '91440101MA3XXXXXXXX', stampText: '国家税务总局\n发票专用章',
        lineItems: [{ name: 'A产品', unit: '件', qty: 150, price: 800, amount: 120000, taxRate: '13%', tax: 15600 }], totalAmount: 135600 },
      { type: 'text', label: '销售合同', docTitle: '销售合同（摘要）', stampText: '合同专用章',
        content: `甲方（卖方）：本公司
乙方（买方）：丁公司

货物：A产品 150件
单价：800元/件
总价：120,000元（不含税）
增值税：15,600元（13%）
价税合计：135,600元

付款方式：货到后30天付款
交货日期：2026年2月6日` }]},
  {
    date: '2026-02-07',
    title: '收到甲公司上月货款尾款',
    tags: ["销售"],
      difficulty: 1,
    description: '收到甲公司转账支付上月所欠货款尾款 70,000元，款项已存入工商银行。',
    tip: '收到赊销货款时冲减应收账款。注意核对该客户应收账款明细，确保每笔回款对应到正确的发票。',
    entries: [
      { subjectCode: '100201', summary: '收到甲公司尾款', debit: 70000, credit: 0, explanation: '银行存款增加记借方。"收到甲公司尾款"，款项存入银行账户，资产增加。需逐笔登记银行日记账并与银行对账。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目112201），属于经营活动现金流入——主营业务产生的现金收入。'},
      { subjectCode: '112201', summary: '收到甲公司尾款', debit: 0, credit: 70000, explanation: '应收账款减少记贷方。客户还款后债权减少。注意：收回欠款不确认收入（收入在赊销时已确认）。' }],
    documents: [
      { type: 'bank', label: '银行回单', date: '2026-02-07', totalAmount: 70000, payer: '甲公司', payerAccount: '6222 0100 **** 8888', payeeName: '本公司', content: '支付货款尾款', refNo: 'HD202602070035' }]},
  {
    date: '2026-02-08',
    title: '银行账户间资金划转',
    tags: ["出纳"],
    difficulty: 2,
    description: '因业务需要，从工商银行账户划转 50,000元至建设银行账户，用于支付即将到期的建行贷款利息。出纳通过企业网银办理同行跨行转账。',
    tip: '同一企业不同银行账户间的资金划转，不能记"银行存款"一增一减，而应通过"其他货币资金"过渡——因为工商银行和建设银行是两个独立的开户行。分录简化为：借：银行存款-建行，贷：银行存款-工行。实务中也可做一借一贷两笔分录。',
    entries: [
      { subjectCode: '100202', summary: '工行转建行-建行增加', debit: 50000, credit: 0, explanation: '银行存款-建设银行增加记借方。资金从工行转入建行，建行账户余额增加。' },
      { subjectCode: '100201', summary: '工行转建行-工行减少', debit: 0, credit: 50000, explanation: '银行存款-工商银行减少记贷方。资金从工行划出，工行账户余额减少。出纳需在两个银行的日记账中都登记此笔业务。' }],
    documents: [
      { type: 'bank', label: '网银转账回单', date: '2026-02-08', totalAmount: 50000, payer: '本公司（工行）', payerAccount: '6222 0200 **** 1234', payeeName: '本公司（建行）', payeeAccount: '6222 0200 **** 5678', content: '工行转建行-资金调拨', refNo: 'HD202602080028' }]},
  {
    date: '2026-02-09',
    title: '缴存多余现金',
    tags: ["出纳"],
    difficulty: 1,
    description: '库存现金余额超过日常备用金限额（5,000元），将多余的 3,000元现金缴存工商银行账户。',
    tip: '企业库存现金有限额管理，超限部分须及时送存银行。2月1日提取5,000元备用金，零星使用后仍有结余，多余部分缴存银行。分录：借：银行存款，贷：库存现金。',
    entries: [
      { subjectCode: '100201', summary: '缴存多余现金', debit: 3000, credit: 0, explanation: '银行存款增加记借方。将多余现金存入银行账户，余额增加。出纳需填写现金缴款单，银行盖章后退回单。' },
      { subjectCode: '1001', summary: '缴存多余现金', debit: 0, credit: 3000, explanation: '库存现金减少记贷方。现金存入银行后保险柜余额减少。出纳需登记现金日记账，确保余额不超过限额。' }],
    documents: [
      { type: 'bank', label: '现金缴款单', date: '2026-02-09', totalAmount: 3000, payer: '本公司', payeeName: '本公司工商银行账户', content: '缴存多余现金', refNo: 'HD202602090030' },
      { type: 'receipt', label: '现金缴款回单', docTitle: '中国工商银行现金缴款回单', date: '2026-02-09', totalAmount: 3000, stampText: '中国工商银行\n现金收讫\n业务专用章',
        items: [{ name: '现金缴存（壹元券）', qty: 3000, price: 1, amount: 3000 }] }]},
  {
    date: '2026-02-10',
    title: '支付丙公司1月采购款',
    tags: ["采购"],
      difficulty: 1,
    description: '以银行存款支付丙公司1月份采购原材料欠款 30,000元。',
    tip: '支付采购欠款时冲减应付账款。及时支付供应商货款有助于维护良好的商业信用，有时还能享受现金折扣。',
    entries: [
      { subjectCode: '220201', summary: '支付丙公司1月货款', debit: 30000, credit: 0, explanation: '应付账款减少记借方。"支付丙公司1月货款"，支付供应商货款后负债减少。' },
      { subjectCode: '100201', summary: '支付丙公司1月货款', debit: 0, credit: 30000, explanation: '银行存款减少记贷方。"支付丙公司1月货款"，资金从银行划出，资产减少。月末需银行对账。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目220201），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '银行回单', date: '2026-02-10', totalAmount: 30000, payer: '本公司', payeeName: '丙公司', content: '支付1月采购款', refNo: 'HD202602100042' }]},
  {
    date: '2026-02-11',
    title: '采购原材料（含税）',
    tags: ["采购"],
      difficulty: 2,
    description: '从戊公司购入原材料一批，价款 50,000元，增值税 6,500元（13%），材料已验收入库，款项未付。',
    tip: '一般纳税人采购原材料取得增值税专用发票，进项税额可以抵扣。分录：借：原材料、应交税费-应交增值税（进项税额），贷：应付账款。',
    entries: [
      { subjectCode: '1403', summary: '采购原材料', debit: 50000, credit: 0, explanation: '一般纳税人采购原材料按不含税价款入账。原材料增加记借方。' },
      { subjectCode: '222101', summary: '进项税额', debit: 6500, credit: 0, explanation: '取得增值税专用发票，进项税额6,500元可以抵扣。注意在"应交税费"相同科目下，进项税记借方，销项税记贷方。' },
      { subjectCode: '220202', summary: '采购原材料-戊公司', debit: 0, credit: 56500, explanation: '款项未付，形成应付账款。价税合计=50,000+6,500=56,500元。注意这是对戊公司的债务。' }],
    documents: [
      { type: 'invoice', label: '增值税发票', region: '广东', invoiceType: '专用', copy: '抵扣联', invoiceNo: '4400211111', date: '2026年02月11日', buyer: '本公司', buyerTaxId: '91440101MA3XXXXXXXX', seller: '戊公司', sellerTaxId: '91440101MA8KKKKKKK', stampText: '戊公司\n发票专用章',
        lineItems: [{ name: 'B型钢材', unit: '吨', qty: 2.5, price: 20000, amount: 50000, taxRate: '13%', tax: 6500 }], totalAmount: 56500 },
      { type: 'text', label: '入库单', docTitle: '收料单', stampText: '仓库\n验收章',
        content: `入库日期：2026年2月11日

材料名称：B型钢材
规格：Φ30mm
数量：2.5吨
单价：20,000元/吨
金额：50,000元

供应商：戊公司
验收人：刘保管
备注：含税采购，发票已到` }]},
  {
    date: '2026-02-12',
    title: '销售商品（收款）',
    tags: ["销售"],
      difficulty: 2,
    description: '向乙公司销售商品一批，价款 100,000元，增值税 13,000元（13%），款项已通过工商银行收妥。',
    tip: '这是现销业务，与赊销的区别在于直接收妥款项，记"银行存款"。本月已发生赊销和现销两种模式，注意对比分录差异。',
    entries: [
      { subjectCode: '100201', summary: '销售商品-乙公司', debit: 113000, credit: 0, explanation: '银行存款增加记借方。"销售商品-乙公司"，款项存入银行账户，资产增加。需逐笔登记银行日记账并与银行对账。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入——主营业务产生的现金收入。'},
      { subjectCode: '6001', summary: '销售商品收入', debit: 0, credit: 100000, explanation: '主营业务收入增加记贷方。收入按不含税价确认（价税分离）。控制权转移时确认收入。' },
      { subjectCode: '222101', summary: '销项税额', debit: 0, credit: 13000, explanation: '销项税额增加记贷方。代收的增值税形成纳税义务。应交增值税=销项-进项。' }],
    documents: [
      { type: 'invoice', label: '增值税发票', region: '广东', invoiceType: '专用', copy: '发票联', invoiceNo: '4400205679', date: '2026年02月12日', buyer: '乙公司', buyerTaxId: '91440101MA5XXXXXXXX', seller: '本公司', sellerTaxId: '91440101MA3XXXXXXXX', stampText: '国家税务总局\n发票专用章',
        lineItems: [{ name: 'A产品', unit: '件', qty: 125, price: 800, amount: 100000, taxRate: '13%', tax: 13000 }], totalAmount: 113000 },
      { type: 'bank', label: '银行回单', date: '2026-02-12', totalAmount: 113000, payer: '乙公司', payerAccount: '6222 0100 **** 6666', payeeName: '本公司', content: '购买产品货款', refNo: 'HD202602120056' }]},
  {
    date: '2026-02-13',
    title: '员工报销差旅费',
    tags: ["费用"],
      difficulty: 1,
    description: '行政部员工李四出差归来报销差旅费 2,800元（含机票1,600元、住宿700元、餐补500元），以银行存款支付。',
    tip: '差旅费计入管理费用，按部门归属。行政部门的差旅费入"管理费用-差旅费"，销售部门的入"销售费用-差旅费"。',
    entries: [
      { subjectCode: '660202', summary: '报销李四差旅费', debit: 2800, credit: 0, explanation: '管理费用-差旅费增加记借方。出差费用实报实销。' },
      { subjectCode: '100201', summary: '报销李四差旅费', debit: 0, credit: 2800, explanation: '银行存款减少记贷方。"报销李四差旅费"，资金从银行划出，资产减少。月末需银行对账。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目660202），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '报销单', docTitle: '差旅费报销单', date: '2026-02-13', totalAmount: 2800, payer: '本公司', stampText: '财务\n审核专用章', receiver: '李四',
        items: [{ name: '往返机票', qty: 1, price: 1600, amount: 1600 }, { name: '住宿费（2晚）', qty: 2, price: 350, amount: 700 }, { name: '出差补贴（2天）', qty: 2, price: 250, amount: 500 }] }]},
  {
    date: '2026-02-14',
    title: '收到银行一季度利息收入',
    tags: ["融资"],
      difficulty: 1,
    description: '收到工商银行第一季度存款利息收入 3,200元。',
    tip: '银行存款利息收入冲减"财务费用"。分录：借：银行存款，贷：财务费用-利息收入（或借方红字）。注意利息收入不是营业收入。',
    entries: [
      { subjectCode: '100201', summary: '银行利息收入', debit: 3200, credit: 0, explanation: '银行存款增加记借方。"银行利息收入"，款项存入银行账户，资产增加。需逐笔登记银行日记账并与银行对账。' , cashFlowItem: 'cf-op5', cashFlowExplanation: '其他经营活动现金流入（配对科目6603），属于"收到其他与经营活动有关的现金"。'},
      { subjectCode: '6603', summary: '银行利息收入（冲减财务费用）', debit: 0, credit: 3200, explanation: '财务费用转出记贷方。月末结转至本年利润，余额归零。' }],
    documents: [
      { type: 'bank', label: '利息回单', date: '2026-02-14', totalAmount: 3200, payer: '中国工商银行', payeeName: '本公司', content: '2026年第一季度存款利息', refNo: 'HD202602140078' }]},
  {
    date: '2026-02-14',
    title: '支付水电费',
    tags: ["费用"],
      difficulty: 1,
    description: '支付本月电费 3,000元、水费 900元，银行代扣。',
    tip: '水电费属于管理费用。企业可根据实际情况按部门分摊，行政办公用水电计入管理费用，车间用水电计入制造费用。',
    entries: [
      { subjectCode: '6602', summary: '支付水电费', debit: 3900, credit: 0, explanation: '管理费用增加记借方。"支付水电费"是企业管理支出，减少当期利润。' },
      { subjectCode: '100201', summary: '支付水电费', debit: 0, credit: 3900, explanation: '银行存款减少记贷方。"支付水电费"，资金从银行划出，资产减少。月末需银行对账。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6602），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '电费单', docTitle: '电费缴费凭证', date: '2026-02-14', totalAmount: 3000, payer: '本公司', stampText: '国家电网\n收讫章',
        items: [{ name: '有功电量 3,000 kWh × 1.00元', qty: 3000, price: 1, amount: 3000 }] },
      { type: 'receipt', label: '水费单', docTitle: '水费缴费凭证', date: '2026-02-14', totalAmount: 900, payer: '本公司', stampText: '自来水公司\n收讫章',
        items: [{ name: '用水量 225 吨 × 4.00元', qty: 225, price: 4, amount: 900 }] }]},
  {
    date: '2026-02-15',
    title: '现金支付零星办公用品费',
    tags: ["出纳","费用"],
    difficulty: 1,
    description: '行政部员工用备用金购买零星办公用品（笔、纸、文件夹等），花费 560元，取得增值税普通发票，出纳审核后以现金报销。',
    tip: '现金支付的零星费用，出纳需审核发票真实性后付款。大额采购走银行转账，零星采购用备用金支付。分录：借：管理费用-办公费，贷：库存现金。',
    entries: [
      { subjectCode: '660201', summary: '零星办公用品', debit: 560, credit: 0, explanation: '管理费用-办公费增加记借方。零星办公用品消耗直接费用化。出纳审核发票无误后支付现金。' },
      { subjectCode: '1001', summary: '支付零星办公用品', debit: 0, credit: 560, explanation: '库存现金减少记贷方。用备用金支付560元后保险柜现金减少。出纳需在现金日记账中登记支出。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目660201），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'invoice', label: '增值税普通发票', region: '广东', invoiceType: '普通', copy: '发票联', invoiceNo: '4400222333', date: '2026年02月15日', buyer: '本公司', buyerTaxId: '91440101MA3XXXXXXXX', seller: '晨光文具店', sellerTaxId: '91440101MA5EEEEEEE', stampText: '晨光文具\n发票专用章',
        lineItems: [{ name: '办公用品一批', unit: '批', qty: 1, price: 560, amount: 560, taxRate: '免税', tax: 0 }], totalAmount: 560 },
      { type: 'receipt', label: '费用报销单', docTitle: '费用报销单', date: '2026-02-15', totalAmount: 560, stampText: '现金付讫',
        items: [{ name: '中性笔（12支）', qty: 12, price: 5, amount: 60 }, { name: 'A4打印纸（2包）', qty: 2, price: 120, amount: 240 }, { name: '文件夹（10个）', qty: 10, price: 18, amount: 180 }, { name: '便利贴（20包）', qty: 20, price: 4, amount: 80 }] }]},
  {
    date: '2026-02-16',
    title: '银行转账支付设备维修费',
    tags: ["出纳","费用"],
    difficulty: 1,
    description: '办公室复印机发生故障，委托XX维修公司维修，维修费 2,000元（含税），通过工商银行转账支付。',
    tip: '大额支出必须通过银行转账，不能使用现金。出纳需登录企业网银或填写电汇凭证办理转账。分录：借：管理费用，贷：银行存款。',
    entries: [
      { subjectCode: '6602', summary: '支付设备维修费', debit: 2000, credit: 0, explanation: '管理费用增加记借方。设备维修费是企业管理支出，减少当期利润。未取得专票或小规模纳税人无进项抵扣。' },
      { subjectCode: '100201', summary: '支付设备维修费', debit: 0, credit: 2000, explanation: '银行存款减少记贷方。通过银行转账支付维修费后，银行账户余额减少。出纳需保留网银转账回单。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6602），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '转账回单', date: '2026-02-16', totalAmount: 2000, payer: '本公司', payeeName: 'XX维修公司', content: '复印机维修费', refNo: 'HD202602160085' },
      { type: 'invoice', label: '增值税普通发票', region: '广东', invoiceType: '普通', copy: '发票联', invoiceNo: '4400244444', date: '2026年02月16日', buyer: '本公司', buyerTaxId: '91440101MA3XXXXXXXX', seller: 'XX维修公司', sellerTaxId: '91440101MA5FFFFFFF', stampText: 'XX维修公司\n发票专用章',
        lineItems: [{ name: '复印机维修服务', unit: '项', qty: 1, price: 2000, amount: 2000, taxRate: '3%', tax: 0 }], totalAmount: 2000 }]},
  {
    date: '2026-02-17',
    title: '购买办公用品（含增值税）',
    tags: ["费用"],
      difficulty: 2,
    description: '采购办公用品一批，价款 1,200元，增值税 156元（13%），取得增值税专用发票，以银行存款支付。',
    tip: '办公用品取得增值税专用发票，进项税额可以抵扣。但金额较小直接费用化，不需作为固定资产。分录：借：管理费用-办公费、应交税费-进项税额，贷：银行存款。',
    entries: [
      { subjectCode: '660201', summary: '购买办公用品', debit: 1200, credit: 0, explanation: '管理费用-办公费增加记借方。行政办公消耗品直接费用化。' },
      { subjectCode: '222101', summary: '进项税额', debit: 156, credit: 0, explanation: '进项税额增加记借方。取得专票后进项可抵扣销项税，减少实际应交增值税。' },
      { subjectCode: '100201', summary: '购买办公用品', debit: 0, credit: 1356, explanation: '银行存款减少记贷方。"购买办公用品"，资金从银行划出，资产减少。月末需银行对账。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目660201），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'invoice', label: '增值税发票', region: '广东', invoiceType: '专用', copy: '发票联', invoiceNo: '4400212222', date: '2026年02月17日', buyer: '本公司', buyerTaxId: '91440101MA3XXXXXXXX', seller: '得力办公用品店', sellerTaxId: '91440101MA5DDDDDDD', stampText: '得力办公\n发票专用章',
        lineItems: [{ name: '办公用品一批', unit: '批', qty: 1, price: 1200, amount: 1200, taxRate: '13%', tax: 156 }], totalAmount: 1356 }]},
  {
    date: '2026-02-19',
    title: '计提2月份员工工资',
    tags: ["工资社保"],
      difficulty: 2,
    description: '本月员工工资总额 65,000元。其中：行政管理人员工资 28,000元，销售人员工资 37,000元。',
    tip: '工资计提是每月必做事项。注意与1月对比：工资总额略有增长（可能因绩效调整或新员工入职）。分录：借：管理费用/销售费用，贷：应付职工薪酬-工资。',
    entries: [
      { subjectCode: '660203', summary: '计提2月行政工资', debit: 28000, credit: 0, explanation: '管理费用-工资增加记借方。行政管理人员薪酬。' },
      { subjectCode: '6601', summary: '计提2月销售工资', debit: 37000, credit: 0, explanation: '销售费用增加记借方。"计提2月销售工资"，销售部门费用直接减少当期利润。' },
      { subjectCode: '221101', summary: '计提2月工资', debit: 0, credit: 65000, explanation: '应付职工薪酬-工资增加记贷方。当月工资当月计提（权责发生制），形成负债。次月发放时冲减。' }],
    documents: [
      { type: 'text', label: '工资汇总表', docTitle: '2026年2月工资汇总表', stampText: '人力资源部\n工资专用章', signature: '制表：王出纳  审核：李会计  批准：赵总',
        content: `部门      人数    应发合计
────────────────
行政部      5     28,000
销售部      8     37,000
────────────────
合  计     13     65,000

备注：本月含新入职员工1名` }]},
  {
    date: '2026-02-20',
    title: '缴纳2月社保费（单位部分）',
    tags: ["工资社保"],
      difficulty: 1,
    description: '缴纳本月社会保险费 19,500元（单位部分），以银行存款支付。',
    tip: '社保单位部分应在每月20日前缴纳。注意与1月相比金额变化：工资总额增长导致社保基数调整。分录：借：应付职工薪酬-社保，贷：银行存款。',
    entries: [
      { subjectCode: '221102', summary: '缴纳2月社保费', debit: 19500, credit: 0, explanation: '应付职工薪酬-社保减少记借方。缴纳社保单位部分，冲减原计提负债。' },
      { subjectCode: '100201', summary: '缴纳2月社保费', debit: 0, credit: 19500, explanation: '银行存款减少记贷方。"缴纳2月社保费"，资金从银行划出，资产减少。月末需银行对账。' , cashFlowItem: 'cf-op3', cashFlowExplanation: '支付职工薪酬相关支出（配对科目221102），属于"支付给职工以及为职工支付的现金"——经营活动现金流出。'}],
    documents: [
      { type: 'receipt', label: '社保缴费单', docTitle: '社会保险费缴费通知单', date: '2026-02-20', totalAmount: 19500, payer: '本公司', stampText: 'XX市社保\n征缴章',
        items: [{ name: '养老保险', qty: 1, price: 13000, amount: 13000 }, { name: '医疗保险', qty: 1, price: 4300, amount: 4300 }, { name: '失业保险', qty: 1, price: 1300, amount: 1300 }, { name: '工伤保险', qty: 1, price: 550, amount: 550 }, { name: '生育保险', qty: 1, price: 350, amount: 350 }] }]},
  {
    date: '2026-02-20',
    title: '缴纳2月公积金（单位部分）',
    tags: ["工资社保"],
      difficulty: 1,
    description: '缴纳本月住房公积金 9,750元（单位部分），以银行存款支付。',
    tip: '公积金基数与工资挂钩，工资增长导致公积金略有增加。分录：借：应付职工薪酬-公积金，贷：银行存款。',
    entries: [
      { subjectCode: '221103', summary: '缴纳2月公积金', debit: 9750, credit: 0, explanation: '应付职工薪酬-公积金减少记借方。缴纳公积金单位部分，冲减原计提负债。' },
      { subjectCode: '100201', summary: '缴纳2月公积金', debit: 0, credit: 9750, explanation: '银行存款减少记贷方。"缴纳2月公积金"，资金从银行划出，资产减少。月末需银行对账。' , cashFlowItem: 'cf-op3', cashFlowExplanation: '支付职工薪酬相关支出（配对科目221103），属于"支付给职工以及为职工支付的现金"——经营活动现金流出。'}],
    documents: [
      { type: 'receipt', label: '公积金汇缴书', docTitle: '住房公积金汇缴书', date: '2026-02-20', totalAmount: 9750, payer: '本公司', stampText: 'XX市公积金\n管理中心\n业务专用章',
        items: [{ name: '单位缴存', qty: 14, price: 696.43, amount: 9750 }] }]},
  {
    date: '2026-02-21',
    title: '固定资产日常维修',
    tags: ["费用"],
      difficulty: 1,
    description: '对办公设备进行日常维修保养，支付维修费 1,500元，以银行存款支付。',
    tip: '固定资产日常维修费直接计入当期费用（管理费用），不需要资本化。只有满足固定资产确认条件的重大改良才需要资本化。',
    entries: [
      { subjectCode: '6602', summary: '办公设备维修费', debit: 1500, credit: 0, explanation: '管理费用增加记借方。"办公设备维修费"是企业管理支出，减少当期利润。' },
      { subjectCode: '100201', summary: '支付维修费', debit: 0, credit: 1500, explanation: '银行存款减少记贷方。"支付维修费"，资金从银行划出，资产减少。月末需银行对账。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6602），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '维修发票', docTitle: '增值税普通发票', date: '2026-02-21', totalAmount: 1500, payer: '本公司', stampText: 'XX维修公司\n发票专用章',
        items: [{ name: '办公设备维修保养服务', qty: 1, price: 1500, amount: 1500 }] }]},
  {
    date: '2026-02-22',
    title: '签发转账支票支付设备款',
    tags: ["出纳","资产"],
    difficulty: 2,
    description: '公司新购置一台打印机，价款 3,500元，出纳签发工商银行转账支票一张（支票号：1200456781）支付设备款。',
    tip: '签发转账支票是出纳的核心技能之一。操作要点：①填写日期（大写）；②收款人全称；③大小写金额一致；④用途；⑤加盖预留印鉴（财务章+法人章）。分录：借：固定资产，贷：银行存款。',
    entries: [
      { subjectCode: '160103', summary: '购置打印机', debit: 3500, credit: 0, explanation: '固定资产-办公设备增加记借方。打印机单价超过2,000元且使用年限超1年，符合固定资产确认条件。' },
      { subjectCode: '100201', summary: '签发转账支票', debit: 0, credit: 3500, explanation: '银行存款减少记贷方。签发转账支票后，收款方进账时银行即扣款。出纳需在"支票登记簿"中登记支票号码和用途。' , cashFlowItem: 'cf-inv', cashFlowExplanation: '购建固定资产/无形资产支出（配对科目160103），属于投资活动现金流出——资本性支出，区别于日常经营支出。'}],
    documents: [
      { type: 'bank', label: '支票存根', date: '2026-02-22', totalAmount: 3500, payer: '本公司', payeeName: 'XX办公设备有限公司', content: '购置打印机', refNo: 'ZZ1200456781' },
      { type: 'invoice', label: '增值税发票', region: '广东', invoiceType: '普通', copy: '发票联', invoiceNo: '4400255555', date: '2026年02月22日', buyer: '本公司', buyerTaxId: '91440101MA3XXXXXXXX', seller: 'XX办公设备有限公司', sellerTaxId: '91440101MA7GGGGGGG', stampText: 'XX办公设备\n发票专用章',
        lineItems: [{ name: 'HP LaserJet Pro 打印机', unit: '台', qty: 1, price: 3500, amount: 3500, taxRate: '13%', tax: 455 }], totalAmount: 3955 }]},
  {
    date: '2026-02-23',
    title: '银行转账支付法律顾问费',
    tags: ["出纳","费用"],
    difficulty: 1,
    description: '支付2月份法律顾问服务费 5,000元，通过工商银行转账支付给XX律师事务所。',
    tip: '法律顾问费属于管理费用。分录：借：管理费用-中介费，贷：银行存款。注意：专业服务费（法律/审计/咨询）均计入管理费用下的"中介机构服务费"或相关明细科目。',
    entries: [
      { subjectCode: '6602', summary: '支付法律顾问费', debit: 5000, credit: 0, explanation: '管理费用增加记借方。法律顾问费是企业日常管理支出，减少当期利润。' },
      { subjectCode: '100201', summary: '支付法律顾问费', debit: 0, credit: 5000, explanation: '银行存款减少记贷方。通过银行转账支付后账户余额减少。出纳需保留转账回单及律师服务发票。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6602），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '转账回单', date: '2026-02-23', totalAmount: 5000, payer: '本公司', payeeName: 'XX律师事务所', content: '支付2月法律顾问服务费', refNo: 'HD202602230090' },
      { type: 'invoice', label: '服务发票', region: '广东', invoiceType: '普通', copy: '发票联', invoiceNo: '4400266666', date: '2026年02月23日', buyer: '本公司', buyerTaxId: '91440101MA3XXXXXXXX', seller: 'XX律师事务所', sellerTaxId: '91440101MA8HHHHHHH', stampText: 'XX律师事务所\n发票专用章',
        lineItems: [{ name: '法律顾问服务费（2月）', unit: '项', qty: 1, price: 5000, amount: 5000, taxRate: '6%', tax: 300 }], totalAmount: 5300 }]},
  {
    date: '2026-02-24',
    title: '计提固定资产折旧',
    tags: ["资产"],
      difficulty: 2,
    description: '本月计提固定资产折旧：办公设备折旧 2,000元，机器设备折旧 5,000元（与1月相同，直线法）。',
    tip: '固定资产折旧按月计提，采用直线法的情况下，各月折旧额相同。管理用固定资产折旧计入管理费用，生产用计入制造费用。',
    entries: [
      { subjectCode: '6602', summary: '计提办公设备折旧', debit: 2000, credit: 0, explanation: '管理费用增加记借方。"计提办公设备折旧"是企业管理支出，减少当期利润。' },
      { subjectCode: '5101', summary: '计提机器设备折旧', debit: 5000, credit: 0, explanation: '制造费用增加记借方。车间间接成本先归集，期末全部分配入生产成本，余额归零。' },
      { subjectCode: '1602', summary: '计提2月折旧', debit: 0, credit: 7000, explanation: '累计折旧增加记贷方。固定资产价值因使用消耗而减少。不直接减原值，保持历史成本。' }],
    documents: [
      { type: 'text', label: '折旧计算表', docTitle: '2026年2月折旧计算表', stampText: '固定资产\n管理专用章',
        content: `资产名称    原值      月折旧额    累计折旧    净值
──────────────────────────────────
办公设备   120,000    2,000     50,000    70,000
机器设备   600,000    5,000    105,000   495,000
──────────────────────────────────
合  计     720,000    7,000    155,000   565,000

方法：平均年限法  净残值率：5%` }]},
  {
    date: '2026-02-25',
    title: '无形资产摊销',
    tags: ["资产"],
      difficulty: 2,
    description: '本月摊销无形资产（财务软件使用权）2,000元。',
    tip: '无形资产与固定资产类似，需要在使用寿命内系统摊销。无形资产摊销计入"管理费用-无形资产摊销"。使用寿命不确定的无形资产不需要摊销。',
    entries: [
      { subjectCode: '6602', summary: '无形资产摊销', debit: 2000, credit: 0, explanation: '管理费用增加记借方。"无形资产摊销"是企业管理支出，减少当期利润。' },
      { subjectCode: '1702', summary: '无形资产摊销', debit: 0, credit: 2000, explanation: '累计摊销增加记贷方。无形资产成本在寿命期内系统分摊。' }],
    documents: [
      { type: 'text', label: '摊销计算表', docTitle: '无形资产摊销计算表（2月）', stampText: '财务管理章',
        content: `资产名称：财务软件使用权
原值：120,000元
摊销年限：5年（60个月）
月摊销额：2,000元

已摊销：14,000元（含本月）
剩余净值：106,000元` }]},
  {
    date: '2026-02-26',
    title: '计提短期借款利息',
    tags: ["融资"],
      difficulty: 2,
    description: '计提本月短期借款利息。借款余额 150,000元，年利率 4.35%，月利息约 543.75元。',
    tip: '短期借款利息按月计提、按季支付。分录：借：财务费用-利息支出，贷：应付利息。注意1月偿还了50,000元本金，现借款余额为150,000元。',
    entries: [
      { subjectCode: '6603', summary: '计提短期借款利息', debit: 543.75, credit: 0, explanation: '财务费用增加记借方。"计提短期借款利息"，融资成本或银行费用，减少利润。' },
      { subjectCode: '2231', summary: '计提短期借款利息', debit: 0, credit: 543.75, explanation: '应付利息增加记贷方。利息按月产生按季支付，权责发生制先计提。' }],
    documents: [
      { type: 'text', label: '利息计算表', docTitle: '短期借款利息计算表', stampText: '财务专用章',
        content: `借款余额：150,000.00元
年利率：4.35%
月利率：0.3625%

本月利息 = 150,000 × 4.35% ÷ 12 = 543.75元

合同编号：DK202501001
贷款行：中国工商银行XX支行` }]},
  {
    date: '2026-02-27',
    title: '计提本月税费',
    tags: ["税费"],
      difficulty: 2,
    description: '本月应计提城建税（增值税的7%）和教育费附加（增值税的3%）。本月应纳增值税 = 销项税额（13,000+15,600） - 进项税额（6,500+156） = 21,944元。',
    tip: '增值税一般纳税人按月计算应纳税额 = 销项税额 - 进项税额。城建税和教育费附加以实际应纳增值税为计税依据。',
    entries: [
      { subjectCode: '6403', summary: '计提城建税（21,944×7%）', debit: 1536.08, credit: 0, explanation: '税金及附加增加记借方。以应纳增值税为基数计提的城建税和教育费附加。' },
      { subjectCode: '6403', summary: '计提教育费附加（21,944×3%）', debit: 658.32, credit: 0, explanation: '税金及附加增加记借方。以应纳增值税为基数计提的城建税和教育费附加。' },
      { subjectCode: '222103', summary: '应交城建税', debit: 0, credit: 1536.08, explanation: '应交城建税增加记贷方。月末计提（增值税×7%），形成负债。' },
      { subjectCode: '222104', summary: '应交教育费附加', debit: 0, credit: 658.32, explanation: '应交教育费附加增加记贷方。月末计提（增值税×3%），形成负债。' }],
    documents: [
      { type: 'text', label: '税费计算表', docTitle: '2026年2月税费计提计算表', stampText: '财务专用章', signature: '制表：李会计  审核：赵主管',
        content: `增值税计算：
销项税额：13,000（乙公司）+ 15,600（丁公司）= 28,600
进项税额：6,500（采购）+ 156（办公用品）= 6,656
应纳增值税：28,600 - 6,656 = 21,944.00

附加税费：
城建税：21,944 × 7% = 1,536.08
教育费附加：21,944 × 3% = 658.32
合计：2,194.40` }]},
  {
    date: '2026-02-28',
    title: '计提2月社保个人部分',
    tags: ["工资社保"],
      difficulty: 2,
    description: '本月通过工资代扣社保个人部分 6,500元、公积金个人部分 3,250元。',
    tip: '工资中代扣的社保和公积金个人部分，从"应付职工薪酬-工资"转入"其他应付款-社保/公积金"。发工资时实际扣缴，在次月缴纳时冲减。',
    entries: [
      { subjectCode: '221101', summary: '代扣社保个人部分', debit: 6500, credit: 0, explanation: '应付职工薪酬减少记借方。冲减之前计提的工资负债。计提时在贷方，支付/冲减时在借方。' },
      { subjectCode: '221101', summary: '代扣公积金个人部分', debit: 3250, credit: 0, explanation: '应付职工薪酬减少记借方。冲减之前计提的工资负债。计提时在贷方，支付/冲减时在借方。' },
      { subjectCode: '224101', summary: '其他应付款-社保', debit: 0, credit: 6500, explanation: '其他应付款-社保增加记贷方。代扣社保个人部分暂由企业保管。' },
      { subjectCode: '224102', summary: '其他应付款-公积金', debit: 0, credit: 3250, explanation: '其他应付款-公积金增加记贷方。代扣公积金个人部分暂由企业保管。' }],
    documents: [
      { type: 'text', label: '代扣明细表', docTitle: '2026年2月工资代扣明细', stampText: '人力资源部\n工资专用章',
        content: `代扣社保个人部分：6,500.00
  其中：养老保险 5,200  医疗保险 1,000  失业保险 300

代扣公积金个人部分：3,250.00

合计代扣：9,750.00` }]},
  {
    date: '2026-02-28',
    title: '月末结转·期间损益',
    tags: ["期末"],
      difficulty: 3,
    description: '月末将各损益类科目余额结转至"本年利润"。本月收入 220,000元，各项费用合计约 97,694元。',
    tip: '本月收入大幅增长，首次实现月度盈利！注意结转后各损益类科目余额应为零。收入类从借方转出，费用类从贷方转出。',
    entries: [
      { subjectCode: '6001', summary: '结转主营业务收入', debit: 220000, credit: 0,
        explanation: '为什么结转入本年利润时借记"主营业务收入"？收入类科目平时在贷方，月末余额在贷方。结转时从借方转出（借方发生额=贷方余额），余额归零。收入220,000元转入本年利润贷方，增加了所有者权益。' },
      { subjectCode: '6603', summary: '结转财务费用（净利息收入冲减后）', debit: 2656.25, credit: 0, explanation: '财务费用增加记借方。"结转财务费用（净利息收入冲减后）"，融资成本或银行费用，减少利润。' },
      { subjectCode: '4103', summary: '结转本月净利润', debit: 0, credit: 129061.85, explanation: '本年利润是所有者权益科目。贷方余额表示盈利，年末结转至"利润分配-未分配利润"。' },
      { subjectCode: '660201', summary: '结转管理费用-办公费', debit: 0, credit: 1200, explanation: '办公费转出记贷方。月末余额归零。' },
      { subjectCode: '660202', summary: '结转管理费用-差旅费', debit: 0, credit: 2800, explanation: '差旅费转出记贷方。月末余额归零。' },
      { subjectCode: '6602', summary: '结转管理费用（折旧/摊销/水电/维修）', debit: 0, credit: 9400, explanation: '管理费用转出记贷方。月末结转至本年利润，余额归零。' },
      { subjectCode: '660203', summary: '结转管理费用-工资', debit: 0, credit: 28000, explanation: '管理工资转出记贷方。月末余额归零。' },
      { subjectCode: '6601', summary: '结转销售费用', debit: 0, credit: 37000, explanation: '销售费用转出记贷方。月末结转至本年利润，余额归零。' },
      { subjectCode: '660101', summary: '结转销售费用-广告费', debit: 0, credit: 8000, explanation: '广告费转出记贷方。月末余额归零。' },
      { subjectCode: '6403', summary: '结转税金及附加', debit: 0, credit: 2194.4, explanation: '税金及附加转出记贷方。月末余额归零。' },
      { subjectCode: '5101', summary: '结转制造费用', debit: 0, credit: 5000, explanation: '制造费用转出记贷方。期末分配至生产成本，余额归零。' }],
    documents: [
      { type: 'text', label: '结转计算表', docTitle: '2026年2月期间损益结转表', stampText: '已结转', signature: '制表：李会计  审核：赵主管  财务负责人：赵总',
        content: `收入类：
  主营业务收入（贷）    220,000.00

费用类：
  管理费用-办公费         1,200.00
  管理费用-差旅费         2,800.00
  管理费用-其他           9,400.00
  管理费用-工资          28,000.00
  销售费用-工资          37,000.00
  销售费用-广告费         8,000.00
  财务费用-利息支出         543.75
  （减：利息收入）       -3,200.00）
  税金及附加              2,194.40
  制造费用                5,000.00

收入合计：220,000.00
（其中利息净收入抵减财务费用 2,656.25）
费用合计：93,594.40
本月净利润：129,061.85

🎉 首次实现月度盈利！` }]},
  {
    date: '2026-02-28',
    title: '月末·银行存款余额核对',
    tags: ["出纳","期末"],
      difficulty: 1,
    description: '月末核对工商银行日记账余额与银行对账单是否一致。本月银行业务量增加，注意逐笔勾对。',
    tip: '每月末必须做银行存款余额调节表。2月银行业务比1月更多，逐笔勾对后找出未达账项。特别关注银行利息收入、代扣款项等自动发生的业务。',
    role: 'cashier',
    entries: [],
    documents: [
      { type: 'text', label: '银行对账单', docTitle: '银行对账单（2026年2月）', stampText: '中国工商银行\n电子业务\n专用章',
        content: `账户：6222 0200 **** 1234
户名：本公司

日期      摘要              收入        支出      余额
─────────────────────────────────────────
02-01     期初余额                                  646,400.00
02-02     发放工资                       49,500    596,900.00
02-03     缴纳个税                        1,500    595,400.00
02-04     缴纳社保                       24,000    571,400.00
02-05     缴纳公积金                     12,000    559,400.00
02-07     收到甲公司货款   70,000.00               629,400.00
02-10     支付丙公司货款                  30,000    599,400.00
02-12     销售收款       113,000.00               712,400.00
02-13     报销差旅费                      2,800    709,600.00
02-14     利息收入         3,200.00               712,800.00
02-14     支付水电费                      3,900    708,900.00
02-17     购买办公用品                    1,356    707,544.00
02-18     支付推广费                      8,000    699,544.00
02-20     缴纳社保                       19,500    680,044.00
02-20     缴纳公积金                      9,750    670,294.00
02-21     支付维修费                      1,500    668,794.00
─────────────────────────────────────────
期末余额：668,794.00` },
      { type: 'text', label: '余额调节表', docTitle: '银行存款余额调节表（2026年2月）',
        content: `企业日记账余额：_______
加：银行已收企业未收    _______
减：银行已付企业未付    _______
调节后余额：_______

银行对账单余额：668,794.00
加：企业已收银行未收    _______
减：企业已付银行未付    _______
调节后余额：_______

提示：请逐笔勾对本期银行交易` }]},

  /* ═══════════════════════════════════════════════
     真实出纳场景补充（网银操作/全电发票）
     ═══════════════════════════════════════════════ */
  {
    date: '2026-02-11',
    title: '网银制单与双人复核操作 ⭐',
    tags: ["出纳"],
    difficulty: 2,
    description: '出纳需要支付一笔采购款56,500元给戊公司，操作企业网银办理转账。出纳在网银中"制单"提交后，需由会计主管（或另一名财务人员）在网银中"复核"才能完成支付。这是企业资金安全的核心内控制度。',
    tip: '网银双人操作制度是资金安全的第一道防线：①出纳进入网银→转账录入→制单提交（此时资金未实际划出）；②会计主管登录网银→待复核列表→核对收款方、金额、用途→点击复核通过→资金才真正划出。\n\n⚠️ 真实要点：\n• 制单和复核必须是两个不同的人（不能是同一个人用两个U盾）\n• 大额转账（一般超过50万）可能还需要"三级审批"——制单→复核→审批\n• 复核时一定要仔细核对收款方全称、账号、金额，千万不能只看金额不看收款方\n• 一旦复核通过资金立即划出，无法撤销！如发现错误立即联系银行紧急止付',
    entries: [
      { subjectCode: '220202', summary: '支付戊公司采购款', debit: 56500, credit: 0, explanation: '应付账款-戊公司减少56,500元。网银制单时选择付款账户、填写收款方信息，确认后提交待复核。' },
      { subjectCode: '100201', summary: '支付采购款-戊公司', debit: 0, credit: 56500, explanation: '银行存款减少56,500元。这笔资金只有在复核人点击"复核通过"后才会实际划出。出纳制单后需通知会计主管尽快登录网银复核，避免超时导致支付失败。复核完成后打印电子回单。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目220202），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'text', label: '网银操作流程图', docTitle: '企业网银付款操作流程', stampText: '财务管理',
        content: `企业网银付款操作流程
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【第一步】出纳制单
① 登录网银系统（插入U盾+输入密码）
② 点击"转账汇款"→"单笔付款"
③ 填写信息：收款人（戊公司）、账号、金额（56,500）、用途（采购款）
④ 确认无误后点"提交"→输入交易密码
⑤ 系统提示"制单成功，等待复核"
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄

【第二步】主管复核
① 会计主管登录网银（本人U盾+本人密码）
② 点击"待复核"→查看交易明细
③ 核对：收款方=戊公司，金额=56,500元
④ 确认无误→点击"复核通过"
⑤ 资金划出，打印电子回单
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄

🏦 真实网银界面要素：
• 制单员能看到"待复核"状态
• 复核员能看到"待复核"列表
• 完成后状态变"已复核/交易成功"
• 电子回单含：交易流水号、时间、双方账号` },
      { type: 'bank', label: '网银电子回单', date: '2026-02-11', totalAmount: 56500, payer: '本公司', payeeName: '戊公司', content: '采购原材料货款', refNo: 'EB202602110055' }]},
  {
    date: '2026-02-18',
    title: '全电发票基础操作⭐',
    tags: ["出纳","费用"],
    difficulty: 2,
    description: '公司需要开具一张全电发票（全面数字化电子发票，简称"数电票"）给客户。出纳登录电子税务局，在"开票业务"模块中填开发票信息并交付给客户。',
    tip: '全电发票（数电票）是中国发票制度的重大改革，2023年起全国推广，取代传统纸质发票和税控盘开票。操作要点：\n\n①登录电子税务局（各省网址不同，如广东：etax.guangdong.chinatax.gov.cn）\n②进入"我要办税"→"开票业务"→"蓝字发票开具"\n③填写购买方信息（客户名称+统一社会信用代码）\n④填写开票内容（货物/服务名称、数量、单价、金额）\n⑤系统自动计算税额（价税分离）\n⑥确认→开具→系统生成OFD/PDF文件\n⑦通过邮件/短信/二维码交付给客户\n\n⚠️ 出纳需要了解的发票知识：\n• 全电发票没有纸质版和发票专用章，电子文件本身就是合法凭证\n• 发票开具后自动上传税务机关，无法"作废"只能"红冲"（开红字发票）\n• 开具后24小时内可"撤销"，超过24小时只能"红冲"\n• 发票数据自动同步到购销双方税务系统',
    role: 'cashier',
    entries: [],
    documents: [
      { type: 'text', label: '全电发票操作指南', docTitle: '全电发票（数电票）操作指南', stampText: '国家税务总局',
        content: `📋 全电发票（全面数字化电子发票）操作指南
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

▎与传统纸质发票的区别
传统发票：税务UKey/税控盘 → 打印 → 盖章 → 交付
全电发票：电子税务局 → 在线填写 → 生成OFD → 在线交付
                 ↓
         无需税控设备！无需纸质！无需盖章！

▎登录方式
① 打开电子税务局（如广东省 https://etax.guangdong.chinatax.gov.cn）
② 选择"企业登录"→扫码或证书登录
③ 进入"我要办税"→"开票业务"

▎开票流程
1. 选择"蓝字发票开具"
2. 填写购买方信息（名称+税号）
   小提示：常用客户可保存为"客户信息"
3. 填写项目名称（如"A产品"）
   需预先赋码：货物→1060101 家用电器
4. 填写数量、单价（不含税）
5. 系统自动计算金额和税额
6. 核对无误→点击"开具"
7. 系统自动生成发票→可选择"下载"或"邮箱交付"

💡 小贴士：
• 首次开票需先做"项目信息维护"和"客户信息维护"
• 全电发票不需要盖章，自带电子签名
• 红字发票在"红字发票开具"模块操作
• 发票状态可在"全量发票查询"中查看` },
      { type: 'invoice', label: '全电发票样例', region: '广东', invoiceType: '全电', copy: '电子件', invoiceNo: '4400222333', date: '2026年02月18日', buyer: '乙公司', buyerTaxId: '91440101MA5XXXXXXXX', seller: '本公司', sellerTaxId: '91440101MA3XXXXXXXX', stampText: '国家税务总局\n电子发票',
        lineItems: [{ name: 'A产品', unit: '件', qty: 10, price: 10000, amount: 100000, taxRate: '13%', tax: 13000 }], totalAmount: 113000 }]},

  {
    date: '2026-02-02',
    title: '提取备用金（现金支票）',
    tags: ["出纳"],
    difficulty: 1,
    description: '出纳需要补充保险柜的备用金，签发现金支票从工商银行提取 5,000元备用金。现金支票号码：XJ202602001。',
    tip: '现金支票用于从银行提取现金。签发时需填写：①日期（大写：贰零贰陆年零贰月零贰日）；②收款人（本公司全称）；③金额（大小写一致）；④用途（备用金）；⑤加盖预留印鉴（财务专用章+法人章）。现金支票只能提现不能转账。',
    entries: [
      { subjectCode: '1001', summary: '提取备用金', debit: 5000, credit: 0, explanation: '库存现金增加。从银行提取现金后保险柜余额增加，备用金补充到位。出纳需在现金日记账中登记收入。' },
      { subjectCode: '100201', summary: '提取备用金', debit: 0, credit: 5000, explanation: '银行存款减少。从工行提取现金后银行账户余额减少。出纳需在支票登记簿中记录支票号码、金额和用途。' }],
    documents: [
      { type: 'bank', label: '现金支票存根', date: '2026-02-02', totalAmount: 5000, payer: '本公司', payeeName: '本公司', content: '提取备用金', refNo: 'XJ202602001' }]},
  {
    date: '2026-02-05',
    title: '银行回单接收与整理',
    tags: ["出纳"],
    difficulty: 1,
    description: '月初集中处理银行回单。社保缴费 24,000元、公积金缴费 12,000元、个税缴纳 1,500元的电子回单已全部可以在网银下载，出纳逐一核对后按日期顺序整理归档。',
    tip: '银行回单是重要的原始凭证，必须按月装订保管至少10年。出纳应在每笔银行业务发生后3个工作日内取得回单，检查银行电子印章是否清晰、交易金额是否准确。电子回单与纸质回单具有同等法律效力。',
    role: 'cashier',
    entries: [],
    documents: [
      { type: 'text', label: '回单整理清单', docTitle: '2月第1周银行回单整理清单', stampText: '财务专用章',
        content: `回单整理清单（2026年2月第1周）
━━━━━━━━━━━━━━━━━━━━━━━━━━
02-02 发放工资 49,500 ✓
02-03 缴纳个税 1,500 ✓
02-04 缴纳社保 24,000 ✓
02-05 缴纳公积金 12,000 ✓
02-05 提取备用金 5,000 ✓
━━━━━━━━━━━━━━━━━━━━━━━━━━
共5笔 合计 92,000.00
整理人：王出纳  日期：2026-02-05` }]},
  {
    date: '2026-02-17',
    title: '银行转账支付印刷费',
    tags: ["出纳","费用"],
    difficulty: 1,
    description: '公司宣传资料（产品手册、企业画册）印刷费 1,800元，通过工商银行转账支付给XX彩印厂。',
    tip: '宣传资料印刷费计入管理费用。出纳转账时需取得印刷厂的正式发票，核对印刷数量和单价。大额印刷支出建议签订印刷合同，小额可直接支付。',
    entries: [
      { subjectCode: '6602', summary: '支付印刷费', debit: 1800, credit: 0, explanation: '管理费用增加。宣传资料印刷费是企业日常管理支出，减少当期利润。' },
      { subjectCode: '100201', summary: '支付印刷费', debit: 0, credit: 1800, explanation: '银行存款减少。通过银行转账支付印刷费，出纳需保留转账回单。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6602），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '转账回单', date: '2026-02-17', totalAmount: 1800, payer: '本公司', payeeName: 'XX彩印厂', content: '宣传资料印刷费', refNo: 'HD202602170058' },
      { type: 'invoice', label: '增值税发票', region: '广东', invoiceType: '普通', copy: '发票联', invoiceNo: '4400299999', date: '2026年02月17日', buyer: '本公司', buyerTaxId: '91440101MA3XXXXXXXX', seller: 'XX彩印厂', sellerTaxId: '91440101MA5AAAAAA', stampText: 'XX彩印厂\n发票专用章',
        lineItems: [{ name: '产品手册印刷（500份）', unit: '份', qty: 500, price: 2.4, amount: 1200 }, { name: '企业画册印刷（200份）', unit: '份', qty: 200, price: 3, amount: 600 }], totalAmount: 1800 }]},
  {
    date: '2026-02-27',
    title: '银行转账支付报刊订阅费',
    tags: ["出纳","费用"],
    difficulty: 1,
    description: '公司订阅下一年度行业期刊和报纸，订阅费共计 960元，通过工商银行转账支付给中国邮政集团公司XX市分公司。',
    tip: '报刊订阅费属于管理费用。出纳办理时需注意：预订下一年度报刊虽然付款在本年，但按权责发生制应在订阅期内分摊。对于金额较小的订阅费，实务中可直接费用化处理。保留邮局开具的订阅收据或发票。',
    entries: [
      { subjectCode: '6602', summary: '订阅下年度报刊', debit: 960, credit: 0, explanation: '管理费用增加。报刊订阅费是企业日常管理费用，减少当期利润。金额较小直接费用化。' },
      { subjectCode: '100201', summary: '订阅下年度报刊', debit: 0, credit: 960, explanation: '银行存款减少。通过银行转账支付订阅费，出纳需保留邮局收据和转账回单。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6602），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '转账回单', date: '2026-02-27', totalAmount: 960, payer: '本公司', payeeName: '中国邮政集团有限公司XX市分公司', content: '2027年度报刊订阅费', refNo: 'HD202602270075' },
      { type: 'receipt', label: '订阅收据', docTitle: '报刊订阅收据', date: '2026-02-27', totalAmount: 960, stampText: '中国邮政\n收讫章',
        items: [{ name: '《经济日报》（全年）', qty: 1, price: 360, amount: 360 }, { name: '《财务与会计》（全年）', qty: 1, price: 240, amount: 240 }, { name: '《中国税务报》（全年）', qty: 1, price: 360, amount: 360 }] }]},
  /* ═══════════════════════════════════════════════
     第三方支付：微信收款处理（P0优先级·现代企业高频场景）
     ═══════════════════════════════════════════════ */
  {
    date: '2026-02-14',
    title: '微信收款处理——客户扫码支付 ⭐',
    tags: ["出纳","销售"],
    difficulty: 2,
    description: '客户通过微信扫二维码支付A产品货款3,500元（含税），出纳在微信商户平台查询到账记录，确认款项已进入企业微信账户余额。这是现代企业最常见的收款方式！',
    tip: '**微信/支付宝科目归属：**\n微信和支付宝账户不属于"库存现金"也不属于"银行存款"，应记入"其他货币资金——微信/支付宝"。\n\n**出纳每日操作流程：**\n① 客户支付 → 微信商户平台显示"支付成功"\n② 出纳截图/下载电子回单\n③ 每日终了核对当日收款总额\n④ 定期将微信余额提现至银行账户（注意提现手续费）\n\n**分录逻辑：**\n借：其他货币资金——微信（含税总额）\n 贷：主营业务收入（不含税价）\n  应交税费——应交增值税（销项税额）',
    entries: [
      { subjectCode: '101204', summary: '微信收款', debit: 3500, credit: 0, explanation: '其他货币资金——微信增加3,500元。客户扫码支付后资金停留在微信商户平台，不属于银行存款。注意：第三方支付余额≠银行存款，不能直接借记银行存款。等提现到银行后再做"借：银行存款 贷：其他货币资金"。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入——主营业务产生的现金收入。'},
      { subjectCode: '6001', summary: '微信收款（不含税）', debit: 0, credit: 3097.35, explanation: '主营业务收入3,097.35元（不含税）。3,500÷1.13≈3,097.35。无论客户用什么方式付款，收入确认金额都是不含税价。' },
      { subjectCode: '222101', summary: '微信收款-销项税额', debit: 0, credit: 402.65, explanation: '销项税额402.65元（3,097.35×13%）。微信收款同样产生增值税纳税义务——电子支付不是逃税工具，一样要开票报税。' }],
    documents: [
      { type: 'text', label: '微信收款记录', docTitle: '微信商户平台收款记录', stampText: '微信支付\n电子凭证',
        content: `交易时间：2026-02-14 10:23:45
交易单号：WX202602141023450001
付款方式：微信零钱
交易金额：3,500.00元（含税）
商品说明：A产品 2件
收款账户：本公司微信商户号
交易状态：支付成功 ✅
资金流向：客户零钱→微信商户平台→T+1提现至银行卡` },
      { type: 'receipt', label: '收款通知', docTitle: '微信收款到账通知', totalAmount: 3500, stampText: '微信支付\n电子凭证',
        items: [{ name: 'A产品×2件', qty: 2, price: 1750, amount: 3500 }] }]},
  /* ═══════════════════════════════════════════════
     会计教学审计批次2新增：采购场景补充
     ═══════════════════════════════════════════════ */
  {
    date: '2026-02-10',
    title: '采购退货——材料质量不合格退回',
    tags: ["采购"],
    difficulty: 1,
    description: '上月从丙公司采购的A型钢材中有0.3吨（金额4,500元）经检验质量不合格。经与丙公司协商同意退货，丙公司已将款项4,500元退回至工商银行账户。',
    tip: '采购退货的处理：收到退回货款时，冲减原材料成本。借：银行存款，贷：原材料。注意：如果是已付款后退货，则收到退款；如果是未付款退货，则冲减应付账款。',
    entries: [
      { subjectCode: '100201', summary: '收到丙公司退货退款', debit: 4500, credit: 0, explanation: '银行存款增加记借方。丙公司退回不合格品货款4,500元已到账。' , cashFlowItem: 'cf-op5', cashFlowExplanation: '其他经营活动现金流入（配对科目1403），属于"收到其他与经营活动有关的现金"。'},
      { subjectCode: '1403', summary: '冲减退货原材料成本', debit: 0, credit: 4500, explanation: '原材料减少记贷方。退货后原材料减少，冲减原采购成本。注意：退回的不合格品不属于企业存货，不能继续挂账。' }],
    documents: [
      { type: 'text', label: '退货单', docTitle: '采购退货单（红字入库单）', date: '2026-02-10', stampText: '仓库\n退货专用章',
        content: `退货日期：2026年2月10日
退货供应商：丙公司
退货原因：A型钢材Φ25mm 质量不合格（表面裂纹）

退货明细：
  材料名称     规格    数量    单价       金额
──────────────────────────────────────
  A型钢材     Φ25mm  0.3吨  15,000    4,500.00
──────────────────────────────────────
  合  计                          4,500.00

退货人：陈采购    质检：吴质检    仓库：刘保管` },
      { type: 'bank', label: '退款回单', date: '2026-02-10', totalAmount: 4500, payer: '丙公司', payeeName: '本公司', content: '退货退款-材料质量不合格', refNo: 'HD202602100043' }]},
  {
    date: '2026-02-16',
    title: '客户提前付款享受现金折扣 ⭐',
    tags: ["销售"],
    difficulty: 2,
    description: '2月6日赊销给丁公司的商品（价款120,000元，增值税15,600元，合计应收账款135,600元），丁公司于今日提前付款，享受2%现金折扣（120,000×2%=2,400元）。实际收到133,200元存入工商银行。',
    tip: '赊销后客户提前付款时的现金折扣处理：实际收款=应收金额-折扣。现金折扣计入财务费用，不得冲减收入。分录：借：银行存款（实际额），借：财务费用（折扣额），贷：应收账款（全额）。',
    entries: [
      { subjectCode: '100201', summary: '收到丁公司货款（含现金折扣）', debit: 133200, credit: 0, explanation: '银行存款增加记借方。丁公司实际支付133,200元（135,600-2,400），已存入工商银行。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目112203），属于经营活动现金流入——主营业务产生的现金收入。'},
      { subjectCode: '6603', summary: '丁公司享受现金折扣', debit: 2400, credit: 0, explanation: '财务费用增加记借方。现金折扣120,000×2%=2,400元，是企业鼓励客户早付款的融资成本。现金折扣只能按货款（不含税）计算，增值税部分不享受折扣。' },
      { subjectCode: '112203', summary: '收回丁公司欠款', debit: 0, credit: 135600, explanation: '应收账款减少记贷方。全额冲减对丁公司的应收账款135,600元，差额2,400元为现金折扣。注意：现金折扣不冲减收入，应计入财务费用——依据《企业会计准则第14号——收入》。' }],
    documents: [
      { type: 'bank', label: '银行回单', date: '2026-02-16', totalAmount: 133200, payer: '丁公司', payerAccount: '6222 0100 **** 9999', payeeName: '本公司', content: '货款（含现金折扣）', refNo: 'HD202602160086' },
      { type: 'text', label: '现金折扣计算', docTitle: '现金折扣计算说明（丁公司）', stampText: '财务专用章',
        content: `合同条款：2/10, n/30
（10天内付款享受2%折扣，超10天则全额付款）

销售日期：2026年2月6日
付款日期：2026年2月16日（第10天 → 符合2%折扣条件）

应收账款余额：135,600.00元
  价款：120,000.00元
  增值税：15,600.00元

现金折扣计算：
  折扣基数：货款120,000.00元（增值税不享受折扣）
  折扣率：2%
  折扣金额：120,000 × 2% = 2,400.00元

实际收款：135,600 - 2,400 = 133,200.00元` }]},
  {
    date: '2026-02-25',
    title: '暂估入库——货到票未到',
    tags: ["采购"],
    difficulty: 2,
    description: '从丁公司采购C材料一批，已验收入库，但发票尚未收到。根据采购合同约定，该批材料暂估价款25,000元。月末按暂估价格入账，待下月收到发票后再做调整。',
    tip: '暂估入库是月末存货核算的重要环节。货到票未到时，月末必须按暂估价格入账，否则会造成账实不符（材料在仓库但账上没有）。下月初应用红字冲回原暂估分录，收到发票后按实际金额入账。这是"权责发生制"原则的体现。',
    entries: [
      { subjectCode: '1403', summary: '暂估入库C材料', debit: 25000, credit: 0, explanation: '原材料增加记借方。虽然发票未到，但材料已入库，按暂估价款25,000元入账。根据《企业会计准则第1号——存货》，货到票未到时应暂估入账，确保账实相符。' },
      { subjectCode: '220202', summary: '暂估应付账款-丁公司', debit: 0, credit: 25000, explanation: '应付账款增加记贷方。暂估的应付丁公司材料款，待收到发票后再按实际金额调整。注意：暂估入库时不考虑增值税（进项税额只有拿到增值税专用发票后才能抵扣）。' }],
    documents: [
      { type: 'text', label: '暂估入库单', docTitle: '收料单（暂估入库）', date: '2026-02-25', stampText: '仓库\n验收专用章\n（暂估）',
        content: `入库日期：2026年2月25日

 材料名称       规格      数量    暂估单价    暂估金额
──────────────────────────────────────
  C材料         Φ40mm    500kg     50.00    25,000.00
──────────────────────────────────────
  合  计                             25,000.00

供应商：丁公司
发票状态：未到（暂估入库）
仓库验收：刘保管    采购员：陈采购

⏰ 次月处理提醒：
1. 下月1日红字冲回暂估
2. 收到发票后按实际金额入账` },
      { type: 'text', label: '采购合同', docTitle: '购销合同（C材料）', stampText: '合同专用章',
        content: `甲方（买方）：本公司
乙方（卖方）：丁公司

货物：C材料（Φ40mm）
数量：500kg
暂定单价：50.00元/kg
合同总价：25,000.00元

交货方式：供应商送货
付款方式：发票到后30天付款
发票开具：增值税专用发票，税率13%

签订日期：2026年2月20日

🔔 教学要点：
暂估入库金额通常按合同价或最近一次采购价确定。
次月1日必须红字冲回，避免重复入账。` }]}]

export default feb
