/**
 * 服务业 10月 - 🤝 联合履约·保底分成
 * I公司项目执行、J公司联合履约合同、保底+分成模式
 */

const oct = [
  { date: '2026-10-05', role: 'accountant', title: '发放9月员工工资', tags: ["工资社保"], difficulty: 1,
    entries: [{ subjectCode: '221101', summary: '发9月工资', debit: 242000, credit: 0 }, { subjectCode: '100201', summary: '实发', debit: 0, credit: 200000 }, { subjectCode: '224101', summary: '代扣社保', debit: 0, credit: 24000 }, { subjectCode: '224102', summary: '代扣公积金', debit: 0, credit: 12000 }, { subjectCode: '222110', summary: '代扣个税', debit: 0, credit: 6000 }],
    documents: [
      { type: 'bank', label: '代发工资回单', date: '2026-10-05', totalAmount: 200000, payer: '雲帆管理咨询有限公司', payeeName: '员工代发户', content: '9月工资代发（共54人）', refNo: 'HD202610050001' },
      { type: 'text', label: '工资表', docTitle: '9 月 工 资 发 放 表', date: '2026-10-05', stampText: '人力资源部\n工资专用章', content: '期间：2026年9月\n应发工资总额：242,000.00元\n扣款：社保24,000+公积金12,000+个税6,000=42,000元\n实发合计：200,000.00元（银行代发）\n\n制表：王出纳\n审核：李会计' }] },
  { date: '2026-10-06', role: 'accountant', title: '缴纳9月社保公积金', tags: ["工资社保"], difficulty: 1,
    entries: [{ subjectCode: '221102', summary: '企业社保', debit: 49000, credit: 0 }, { subjectCode: '224101', summary: '个人社保', debit: 24000, credit: 0 }, { subjectCode: '221102', summary: '企业公积金', debit: 24500, credit: 0 }, { subjectCode: '224102', summary: '个人公积金', debit: 12000, credit: 0 }, { subjectCode: '100201', summary: '支付', debit: 0, credit: 109500 }],
    documents: [
      { type: 'bank', label: '扣款回单', date: '2026-10-06', totalAmount: 109500, payer: '雲帆管理咨询有限公司', payeeName: '北京市社会保险基金管理中心', content: '9月社保+公积金缴纳', refNo: 'HD202610060002' }] },
  { date: '2026-10-07', role: 'accountant', title: '缴纳9月增值税及附加', tags: ["税费"], difficulty: 1,
    entries: [{ subjectCode: '222101', summary: '增值税', debit: 3000, credit: 0 }, { subjectCode: '222103', summary: '城建税', debit: 210, credit: 0 }, { subjectCode: '222104', summary: '附加', debit: 150, credit: 0 }, { subjectCode: '100201', summary: '缴税', debit: 0, credit: 3360 }],
    documents: [
      { type: 'bank', label: '缴税回单', date: '2026-10-07', totalAmount: 3360, payer: '雲帆管理咨询有限公司', payeeName: '国家税务总局北京市税务局', content: '9月增值税及附加税缴纳', refNo: 'HD202610070003' }] },
  { date: '2026-10-08', role: 'accountant', title: '缴纳Q3企业所得税', tags: ["税费"], difficulty: 1,
    entries: [{ subjectCode: '222106', summary: 'Q3所得税', debit: 15000, credit: 0 }, { subjectCode: '100201', summary: '缴税', debit: 0, credit: 15000 }],
    documents: [
      { type: 'bank', label: '缴税回单', date: '2026-10-08', totalAmount: 15000, payer: '雲帆管理咨询有限公司', payeeName: '国家税务总局北京市税务局', content: '2026年Q3企业所得税预缴', refNo: 'HD202610080004' }] },
  { date: '2026-10-09', role: 'accountant', title: '确认E年框10月收入', tags: ["项目核算"], difficulty: 2,
    entries: [{ subjectCode: '2232', summary: 'E公司10月', debit: 21200, credit: 0 }, { subjectCode: '6001', summary: '年框收入', debit: 0, credit: 20000 }, { subjectCode: '222101', summary: '销项税额', debit: 0, credit: 1200 }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '北京', invoiceType: '专用', copy: '发票联', invoiceNo: '1100432131', date: '2026年10月09日', buyer: 'E集团公司', buyerTaxId: '91110108MAZZZZZZZ', seller: '雲帆管理咨询有限公司', sellerTaxId: '91110108MA3XXXXXXXX', stampText: '发票专用章', payee: '李四', reviewer: '王五', drawer: '赵六', lineItems: [{ name: '年度管理咨询服务（10月）', unit: '月', qty: 1, price: 20000, amount: 20000, taxRate: '6%', tax: 1200 }], totalAmount: 21200 }] },
  { date: '2026-10-10', role: 'accountant', title: '确认G运维10月收入', tags: ["项目核算"], difficulty: 2,
    entries: [{ subjectCode: '2232', summary: 'G公司10月', debit: 15900, credit: 0 }, { subjectCode: '6001', summary: '运维收入', debit: 0, credit: 15000 }, { subjectCode: '222101', summary: '销项税额', debit: 0, credit: 900 }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '北京', invoiceType: '专用', copy: '发票联', invoiceNo: '1100432132', date: '2026年10月10日', buyer: 'G集团有限公司', buyerTaxId: '91110108MAKKKKKKK', seller: '雲帆管理咨询有限公司', sellerTaxId: '91110108MA3XXXXXXXX', stampText: '发票专用章', payee: '李四', reviewer: '王五', drawer: '赵六', lineItems: [{ name: 'IT运维服务（10月）', unit: '月', qty: 1, price: 15000, amount: 15000, taxRate: '6%', tax: 900 }], totalAmount: 15900 }] },
  { date: '2026-10-11', role: 'accountant', title: '确认H订阅10月收入', tags: ["项目核算"], difficulty: 2,
    entries: [{ subjectCode: '2232', summary: 'H公司10月', debit: 15900, credit: 0 }, { subjectCode: '6051', summary: 'SaaS收入', debit: 0, credit: 15000 }, { subjectCode: '222101', summary: '销项税额', debit: 0, credit: 900 }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '北京', invoiceType: '专用', copy: '发票联', invoiceNo: '1100432133', date: '2026年10月11日', buyer: 'H科技有限公司', buyerTaxId: '91110108MAHHHHHHH', seller: '雲帆管理咨询有限公司', sellerTaxId: '91110108MA3XXXXXXXX', stampText: '发票专用章', payee: '李四', reviewer: '王五', drawer: '赵六', lineItems: [{ name: '雲帆智能平台SaaS订阅（10月）', unit: '月', qty: 1, price: 15000, amount: 15000, taxRate: '6%', tax: 900 }], totalAmount: 15900 }] },
  { date: '2026-10-12', role: 'accountant', title: 'I项目启动·诊断阶段收入确认', tags: ["项目核算"], difficulty: 2,
    description: 'I公司项目完成诊断阶段，确认收入80,000元（合同280,000×约28.6%）。增值税6%=4,800元。',
    entries: [{ subjectCode: '2232', summary: 'I公司预收款转收入', debit: 84800, credit: 0 }, { subjectCode: '6001', summary: 'I项目阶段一', debit: 0, credit: 80000 }, { subjectCode: '222101', summary: '销项税额', debit: 0, credit: 4800 }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '北京', invoiceType: '专用', copy: '发票联', invoiceNo: '1100432134', date: '2026年10月12日', buyer: 'I科技有限公司', buyerTaxId: '91110108MAIIIIIII', seller: '雲帆管理咨询有限公司', sellerTaxId: '91110108MA3XXXXXXXX', stampText: '发票专用章', payee: '李四', reviewer: '王五', drawer: '赵六', lineItems: [{ name: '战略绩效咨询（诊断阶段）', unit: '项', qty: 1, price: 80000, amount: 80000, taxRate: '6%', tax: 4800 }], totalAmount: 84800 },
      { type: 'text', label: '阶段验收单', docTitle: '诊 断 阶 段 验 收 确 认 单', date: '2026-10-12', stampText: 'I科技有限公司\n项目专用章', content: '项目名称：战略绩效管理体系设计与落地\n阶段：诊断调研阶段\n验收结论：通过 ✓\n交付物：企业现状诊断报告、绩效指标调研分析\n\n甲方代表：陈总\n乙方代表：王顾问' }] },
  { date: '2026-10-13', role: 'accountant', title: '支付10月写字楼租金', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '660205', summary: '房租', debit: 22000, credit: 0 }, { subjectCode: '660205', summary: '物业费', debit: 3000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 25000 }],
    documents: [
      { type: 'receipt', label: '房屋租赁收据', docTitle: '房 屋 租 赁 专 用 收 据', date: '2026-10-13', totalAmount: 25000, payer: '雲帆管理咨询有限公司', stampText: '北京XX物业管理有限公司\n财务专用章', items: [{ name: '望京XX大厦15层 10月租金', qty: 1, price: 22000, amount: 22000 }, { name: '10月物业管理费', qty: 1, price: 3000, amount: 3000 }]}] },
  { date: '2026-10-14', role: 'accountant', title: 'J公司联合履约合同·签约收款', tags: ["项目核算"], difficulty: 3,
    tip: '与合作伙伴联合履约，将部分工作分包给合作方。按CAS 14判断是主要责任人还是代理人。',
    description: '与J公司签订数字化转型实施合同，合同总额500,000元。其中本公司负责项目管理及核心咨询（60%），K公司负责技术实施（40%分包）。签约预收款50%=250,000元。',
    entries: [{ subjectCode: '100201', summary: 'J公司预收款', debit: 250000, credit: 0 }, { subjectCode: '2232', summary: '预收J公司', debit: 0, credit: 250000 }],
    documents: [
      { type: 'bank', label: '收款回单', date: '2026-10-14', totalAmount: 250000, payer: 'J实业集团有限公司', payerAccount: '6222 0100 **** 4444', payeeName: '雲帆管理咨询有限公司', payeeAccount: '6222 0200 **** 1234', content: '数字化转型实施项目预付款（50%）', refNo: 'HD202610140005' },
      { type: 'text', label: '联合履约合同', docTitle: '数 字 化 转 型 实 施 合 同', date: '2026-10-14', stampText: '合同专用章', content: '甲方：J实业集团有限公司\n乙方：雲帆管理咨询有限公司（联合体牵头方）\n分包方：K科技有限公司（技术实施）\n\n合同总额：500,000元\n  乙方（咨询及项目管理60%）：300,000元\n  K公司（技术实施40%）：200,000元\n\n付款方式：签约付50%（250,000），中期付30%（150,000），终验付20%（100,000）\n\n按CAS 14判断：乙方为主要责任人（整体项目管理和最终交付负责）' }] },
  { date: '2026-10-15', role: 'accountant', title: '支付10月水电及网络', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '6602', summary: '水电费', debit: 5000, credit: 0 }, { subjectCode: '6602', summary: '网络费', debit: 2000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 7000 }],
    documents: [
      { type: 'receipt', label: '电费凭证', docTitle: '电 费 缴 费 凭 证', date: '2026-10-15', totalAmount: 5000, payer: '雲帆管理咨询有限公司', stampText: '国家电网\n电费收讫章', items: [{ name: '写字楼用电 5,000kWh×1.00元', qty: 5000, price: 1, amount: 5000 }]},
      { type: 'receipt', label: '通信费发票', docTitle: '通 信 服 务 发 票', date: '2026-10-15', totalAmount: 2000, payer: '雲帆管理咨询有限公司', stampText: '中国联通\n发票专用章', items: [{ name: '企业宽带+电话（10月）', qty: 1, price: 2000, amount: 2000 }]}] },
  { date: '2026-10-16', role: 'accountant', title: '摊销及折旧', tags: ["费用管理"], difficulty: 2,
    entries: [{ subjectCode: '6602', summary: '摊销', debit: 3400, credit: 0 }, { subjectCode: '6602', summary: '折旧', debit: 2620, credit: 0 }, { subjectCode: '1208', summary: '摊销', debit: 0, credit: 3000 }, { subjectCode: '1702', summary: '累计摊销', debit: 0, credit: 400 }, { subjectCode: '1602', summary: '折旧', debit: 0, credit: 2620 }],
    documents: [
      { type: 'text', label: '摊销折旧表', docTitle: '摊 销 折 旧 计 提 表', date: '2026-10-16', stampText: '财务专用章', content: '期间：2026年10月\n\nSaaS摊销：36,000÷12=3,000.00元\n无形资产摊销：400.00元\n折旧合计：2,620.00元\n\n合计：6,020.00元\n\n制表：李会计' }] },
  { date: '2026-10-17', role: 'accountant', title: '预付K公司分包款', tags: ["项目核算"], difficulty: 2,
    description: 'J项目中K公司承担技术实施部分（40%），预付50%分包款=500,000×40%×50%=100,000元。',
    entries: [{ subjectCode: '520103', summary: 'K公司分包预付款', debit: 100000, credit: 0, explanation: '劳务成本——外包服务费增加。分包预付款。' }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 100000 }],
    documents: [
      { type: 'bank', label: '转账回单', date: '2026-10-17', totalAmount: 100000, payer: '雲帆管理咨询有限公司', payeeName: 'K科技有限公司', content: 'J项目分包预付款（50%）', refNo: 'HD202610170006' },
      { type: 'text', label: '分包协议', docTitle: '项 目 分 包 协 议', date: '2026-10-17', stampText: '合同专用章', content: '总包方：雲帆管理咨询有限公司\n分包方：K科技有限公司\n\n分包项目：J公司数字化转型——技术实施部分\n分包金额：200,000元（合同总额40%）\n付款方式：\n  签约预付50%：100,000元\n  中期验收后付30%：60,000元\n  终验合格付20%：40,000元' }] },
  { date: '2026-10-18', role: 'accountant', title: '缴纳代扣个税', tags: ["税费"], difficulty: 1,
    entries: [{ subjectCode: '222110', summary: '个税', debit: 6000, credit: 0 }, { subjectCode: '100201', summary: '缴税', debit: 0, credit: 6000 }],
    documents: [
      { type: 'bank', label: '缴税回单', date: '2026-10-18', totalAmount: 6000, payer: '雲帆管理咨询有限公司', payeeName: '国家税务总局北京市税务局', content: '9月代扣代缴个人所得税', refNo: 'HD202610180007' }] },
  { date: '2026-10-19', role: 'accountant', title: '银行手续费及利息', tags: ["资金管理"], difficulty: 1,
    entries: [{ subjectCode: '6603', summary: '手续费', debit: 700, credit: 0 }, { subjectCode: '100201', summary: '扣费', debit: 0, credit: 700 }, { subjectCode: '100201', summary: '结息', debit: 3500, credit: 0 }, { subjectCode: '6603', summary: '利息收入', debit: 0, credit: 3500 }],
    documents: [
      { type: 'bank', label: '扣费回单', date: '2026-10-19', totalAmount: 700, payer: '雲帆管理咨询有限公司', payeeName: '中国工商银行北京分行', content: '10月账户服务费及转账手续费', refNo: 'HD202610190008' },
      { type: 'bank', label: '结息回单', date: '2026-10-19', totalAmount: 3500, payer: '中国工商银行北京分行', payeeName: '雲帆管理咨询有限公司', content: '活期存款2026年10月结息', refNo: 'HD202610190009' }] },
  { date: '2026-10-21', role: 'accountant', title: 'I项目差旅费', tags: ["项目核算"], difficulty: 2,
    entries: [{ subjectCode: '520102', summary: 'I项目差旅', debit: 9000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 9000 }],
    documents: [
      { type: 'receipt', label: '差旅报销单', docTitle: '差 旅 费 报 销 单', date: '2026-10-21', totalAmount: 9000, payer: '雲帆管理咨询有限公司', stampText: '财务\n审核专用章', items: [{ name: '广州出差 高铁3人×2程', qty: 6, price: 650, amount: 3900 }, { name: '住宿 3人×4晚×350元', qty: 12, price: 350, amount: 4200 }, { name: '市内交通及补贴', qty: 1, price: 900, amount: 900 }]}] },
  { date: '2026-10-22', role: 'accountant', title: '购买办公用品', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '660201', summary: '办公用品', debit: 2500, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 2500 }],
    documents: [
      { type: 'receipt', label: '办公用品发票', docTitle: '办 公 用 品 发 票', date: '2026-10-22', totalAmount: 2500, payer: '雲帆管理咨询有限公司', stampText: '得力办公\n发票专用章', items: [{ name: '打印纸×5箱、墨盒×5、文件夹×30', qty: 1, price: 2500, amount: 2500 }]}] },
  { date: '2026-10-23', role: 'accountant', title: '计提10月员工工资', tags: ["工资社保"], difficulty: 2,
    description: '计提10月工资。项目人员135,000+研发70,000+管理55,000=260,000元。',
    entries: [{ subjectCode: '520101', summary: '项目工资', debit: 135000, credit: 0 }, { subjectCode: '530101', summary: '研发资本化', debit: 55000, credit: 0 }, { subjectCode: '530102', summary: '研发费用化', debit: 15000, credit: 0 }, { subjectCode: '6602', summary: '管理工资', debit: 55000, credit: 0 }, { subjectCode: '221101', summary: '应付工资', debit: 0, credit: 260000 }],
    documents: [
      { type: 'text', label: '工资计算表', docTitle: '10 月 工 资 计 算 汇 总 表', date: '2026-10-23', stampText: '人力资源部\n工资专用章', content: '期间：2026年10月\n\n项目人员：135,000元（含I/J两项目）\n研发人员（资本化）：55,000元\n研发人员（费用化）：15,000元\n管理人员：55,000元\n\n应发合计：260,000元\n\n制表：王出纳\n审核：李会计' }] },
  { date: '2026-10-24', role: 'accountant', title: '计提社保公积金', tags: ["工资社保"], difficulty: 2,
    entries: [{ subjectCode: '520101', summary: '项目社保', debit: 27000, credit: 0 }, { subjectCode: '520101', summary: '项目公积金', debit: 13500, credit: 0 }, { subjectCode: '530101', summary: '研发资本化社保', debit: 11000, credit: 0 }, { subjectCode: '530101', summary: '研发资本化公积金', debit: 5500, credit: 0 }, { subjectCode: '530102', summary: '研发费用化社保', debit: 3000, credit: 0 }, { subjectCode: '530102', summary: '研发费用化公积金', debit: 1500, credit: 0 }, { subjectCode: '6602', summary: '管理社保', debit: 11500, credit: 0 }, { subjectCode: '6602', summary: '管理公积金', debit: 5500, credit: 0 }, { subjectCode: '221102', summary: '应付社保', debit: 0, credit: 52500 }, { subjectCode: '221102', summary: '应付公积金', debit: 0, credit: 26000 }],
    documents: [
      { type: 'text', label: '社保公积金计提表', docTitle: '社 保 公 积 金 计 提 汇 总 表', date: '2026-10-24', stampText: '财务专用章', content: '期间：2026年10月\n\n社保（企业部分）：\n  项目人员：27,000元\n  研发资本化：11,000元\n  研发费用化：3,000元\n  管理人员：11,500元\n  小计：52,500元\n\n公积金（企业部分）：\n  项目人员：13,500元\n  研发资本化：5,500元\n  研发费用化：1,500元\n  管理人员：5,500元\n  小计：26,000元\n\n合计：78,500元\n\n制表：李会计' }] },
  { date: '2026-10-25', role: 'accountant', title: '计提10月城建税及附加', tags: ["税费"], difficulty: 2,
    description: '销项税额=1,200+900+900+4,800=7,800。',
    entries: [{ subjectCode: '6403', summary: '城建税', debit: 546, credit: 0 }, { subjectCode: '6403', summary: '教育附加', debit: 234, credit: 0 }, { subjectCode: '6403', summary: '地方教育附加', debit: 156, credit: 0 }, { subjectCode: '222103', summary: '应交城建税', debit: 0, credit: 546 }, { subjectCode: '222104', summary: '应交附加', debit: 0, credit: 390 }],
    documents: [
      { type: 'text', label: '税费计算表', docTitle: '城 建 税 及 教 育 附 加 计 提 表', date: '2026-10-25', stampText: '财务专用章', content: '期间：2026年10月\n计税依据：应纳增值税7,800.00元\n\n城建税（7%）：7,800×7%=546.00元\n教育附加（3%）：7,800×3%=234.00元\n地方教育附加（2%）：7,800×2%=156.00元\n\n合计：936.00元\n\n制表：李会计' }] },
  { date: '2026-10-27', role: 'accountant', title: '月末期间损益结转', tags: ["期末"], difficulty: 3,
    description: '收入：E20,000+G15,000+H15,000+I80,000=130,000。',
    entries: [{ subjectCode: '6001', summary: '转主营收入', debit: 115000, credit: 0 }, { subjectCode: '6051', summary: '转其他收入', debit: 15000, credit: 0 }, { subjectCode: '4103', summary: '收入转入', debit: 0, credit: 130000 },
      { subjectCode: '4103', summary: '费用转入', debit: 80936, credit: 0 }, { subjectCode: '6401', summary: '转成本', debit: 0, credit: 30000 }, { subjectCode: '6403', summary: '转税金', debit: 0, credit: 936 }, { subjectCode: '6602', summary: '转管理费', debit: 0, credit: 40000 }, { subjectCode: '6601', summary: '转销售费', debit: 0, credit: 10000 }],
    documents: [
      { type: 'text', label: '结转表', docTitle: '期 间 损 益 结 转 表', date: '2026-10-31', stampText: '已结转', content: '结转期间：2026年10月\n\n收入类→本年利润：\n  主营业务收入：115,000元（E20,000+G15,000+I80,000）\n  其他业务收入：15,000元（H订阅）\n  合计：130,000元\n\n费用类→本年利润：\n  主营业务成本：30,000元\n  税金及附加：936元\n  管理费用：40,000元\n  销售费用：10,000元\n  合计：80,936元\n\n本月净利润：49,064元\n（J项目未确认收入，后续月份释放）\n\n制表：李会计' }] },
  { date: '2026-10-28', role: 'accountant', title: '计提无形资产摊销', tags: ["费用管理"], difficulty: 2,
    entries: [{ subjectCode: '6602', summary: '摊销', debit: 400, credit: 0 }, { subjectCode: '1702', summary: '累计摊销', debit: 0, credit: 400 }],
    documents: [
      { type: 'text', label: '摊销计算表', docTitle: '无 形 资 产 摊 销 计 算 表', date: '2026-10-28', stampText: '财务专用章', content: '无形资产：软件项目管理工具（永久许可）\n原值：24,000.00元\n摊销期限：5年（60个月）\n月摊销额：400.00元\n累计摊销：2,400.00元\n\n制表：李会计' }] },
  { date: '2026-10-29', role: 'accountant', title: '提取备用金', tags: ["资金管理"], difficulty: 1,
    entries: [{ subjectCode: '1001', summary: '备用金', debit: 3000, credit: 0 }, { subjectCode: '100201', summary: '提现', debit: 0, credit: 3000 }],
    documents: [
      { type: 'bank', label: '现金支票回单', date: '2026-10-29', totalAmount: 3000, payer: '雲帆管理咨询有限公司', payeeName: '雲帆管理咨询有限公司（现金）', content: '提取备用金', refNo: 'HD202610290010' }] },
  { date: '2026-10-30', role: 'accountant', title: '期末结转劳务成本', tags: ["项目核算", "期末"], difficulty: 3,
    description: '结转I项目成本：人工40,000+差旅9,000=49,000。J项目尚未确认收入不结转。',
    entries: [{ subjectCode: '6401', summary: '结转I人工', debit: 40000, credit: 0 }, { subjectCode: '6401', summary: '结转I差旅', debit: 9000, credit: 0 }, { subjectCode: '520101', summary: '转人工', debit: 0, credit: 40000 }, { subjectCode: '520102', summary: '转差旅', debit: 0, credit: 9000 }],
    documents: [
      { type: 'text', label: '成本计算表', docTitle: '项 目 成 本 结 转 计 算 表', date: '2026-10-30', stampText: '财务专用章', content: '结转期间：2026年10月\n\nI公司项目（收入已确认80,000元）：\n  人工成本（预计工时占比40%）：40,000元\n  差旅费：9,000元\n  合计：49,000元\n\nJ公司项目（尚未确认收入）：\n  分包预付100,000元暂留劳务成本，待收入确认后结转\n\n制表：李会计' }] },
  { date: '2026-10-28', role: 'accountant', title: '购买办公用品', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '660201', summary: '办公用品', debit: 2000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 2000 }],
    documents: [
      { type: 'receipt', label: '办公用品发票', docTitle: '办 公 用 品 发 票', date: '2026-10-28', totalAmount: 2000, payer: '雲帆管理咨询有限公司', stampText: '晨光文具\n发票专用章', items: [{ name: '文件盒、订书钉、便签等', qty: 1, price: 2000, amount: 2000 }]}] },
  { date: '2026-10-28', role: 'accountant', title: '报销员工通讯补贴', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '6602', summary: '通讯补贴', debit: 3000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 3000 }],
    documents: [
      { type: 'text', label: '通讯补贴表', docTitle: '10 月 员 工 通 讯 补 贴 表', date: '2026-10-28', stampText: '人力资源部\n专用章', content: '10月通讯补贴发放：\n  咨询顾问 10人×200元=2,000元\n  研发人员 5人×200元=1,000元\n  合计：3,000元\n\n制表：王出纳\n审核：李会计' }] },
  { date: '2026-10-29', role: 'accountant', title: '业务招待费', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '660203', summary: '招待费', debit: 2500, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 2500 }],
    documents: [
      { type: 'receipt', label: '餐饮发票', docTitle: '北 京 市 餐 饮 服 务 发 票', date: '2026-10-29', totalAmount: 2500, payer: '雲帆管理咨询有限公司', stampText: 'XX餐厅\n发票专用章', items: [{ name: 'J公司项目启动招待', qty: 1, price: 2500, amount: 2500 }]}] },
  { date: '2026-10-29', role: 'accountant', title: '支付法律顾问费', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '6602', summary: '法律顾问费', debit: 8000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 8000 }],
    documents: [
      { type: 'receipt', label: '法律费发票', docTitle: '法 律 顾 问 服 务 发 票', date: '2026-10-29', totalAmount: 8000, payer: '雲帆管理咨询有限公司', stampText: 'XX律师事务所\n发票专用章', items: [{ name: '2026年10月法律顾问服务（含合同审核）', qty: 1, price: 8000, amount: 8000 }]}] },
  { date: '2026-10-30', role: 'accountant', title: '提取备用金', tags: ["资金管理"], difficulty: 1,
    entries: [{ subjectCode: '1001', summary: '备用金', debit: 2000, credit: 0 }, { subjectCode: '100201', summary: '提现', debit: 0, credit: 2000 }],
    documents: [
      { type: 'bank', label: '现金支票回单', date: '2026-10-30', totalAmount: 2000, payer: '雲帆管理咨询有限公司', payeeName: '雲帆管理咨询有限公司（现金）', content: '提取备用金', refNo: 'HD202610300011' }] },
  { date: '2026-10-31', role: 'accountant', title: '模拟纳税申报', tags: ["税费", "期末"], difficulty: 1, entries: [], nextAction: 'tax-filing',
    documents: [{ type: 'text', label: '申报提醒', docTitle: '10 月 纳 税 申 报 提 醒', stampText: '财务专用章', content: '申报期间：2026年10月\n截止日期：2026年11月15日\n\n申报税种：\n1. 增值税（6%，销项税额7,800元）\n2. 城市维护建设税（7%）\n3. 教育费附加（3%+2%）\n4. 代扣代缴个人所得税\n\n请前往纳税申报页面核对后提交。' }] },
]

export default oct
