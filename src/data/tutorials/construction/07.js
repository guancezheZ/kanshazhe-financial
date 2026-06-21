/**
 * 建筑业 7月 — 雨季施工与设备大修专题
 *
 * 企业名称：鼎立建筑工程有限公司
 * 税制：一般纳税人（增值税9%）
 *
 * 本月主题：
 *   进入雨季效率降低，机械故障维修。
 *   重点场景：设备大修、雨季施工增加费、工程保险。
 *
 * 知识点标签：工程合同、工程成本、分包管理、材料管理、机械使用、往来管理、资金管理、工资社保、税费、期末
 */

const tasks = [
  // ═════════════════════════════════════════════════════════════════════
  // 月初：缴纳上月税费、社保及工资（7/1-7/2）
  // ═════════════════════════════════════════════════════════════════════
  {
    date: '2026-07-01',
    title: '缴纳6月增值税及附加税费',
    tags: ['税费'],
    difficulty: 2,
    role: 'accountant',
    description: '缴纳6月应交增值税28,000元及附加税费。城建税7%为1,960元，教育费附加3%为840元，地方教育附加2%为560元，合计1,400元。总计缴纳31,360元。',
    tip: '增值税一般在次月15日前申报缴纳。城建税7%、教育费附加3%、地方教育附加2%，均以实际缴纳的增值税为计税依据。缴纳时借记"应交税费"各明细科目，贷记"银行存款"。',
    entries: [
      { subjectCode: '222101', debit: 28000, credit: 0, summary: '缴纳6月增值税', explanation: '应交增值税借方减少28,000元，反映增值税纳税义务已履行清偿。' },
      { subjectCode: '222103', debit: 1960, credit: 0, summary: '缴纳城建税（28,000×7%）', explanation: '城建税以实际缴纳增值税为计税依据。城市7%、县城5%、其他地区1%。本例按市区7%计算。' },
      { subjectCode: '222104', debit: 1400, credit: 0, summary: '缴纳教育费附加（28,000×5%）', explanation: '教育费附加3%（840元）+地方教育附加2%（560元）合计1,400元。借记应交税费减少负债。' },
      { subjectCode: '100201', debit: 0, credit: 31360, summary: '缴纳上月税费', explanation: '工商银行存款减少31,360元，用于缴纳税款。资金流出企业。' , cashFlowItem: 'cf-op4', cashFlowExplanation: '缴纳税费支出（配对科目222101），属于"支付的各项税费"——经营活动现金流出。'}],
    documents: [
      { type: 'bank', label: '电子缴税凭证', date: '2026-07-01', totalAmount: 31360, payer: '鼎立建筑工程有限公司', payeeName: '国家金库', content: '缴纳6月增值税及附加', refNo: 'JS202607010001' }]},
  {
    date: '2026-07-01',
    title: '缴纳6月社会保险费',
    tags: ['工资社保'],
    difficulty: 1,
    description: '缴纳6月社会保险费42,000元（含单位承担部分28,000元和个人代扣部分14,000元），通过工商银行转账支付。',
    tip: '社保费由单位承担和个人承担两部分组成，出纳需按月准时缴纳。借记"应付职工薪酬-社保"，贷记"银行存款"。缴费后可到社保局网站打印缴费凭证。',
    entries: [
      { subjectCode: '221102', debit: 42000, credit: 0, summary: '缴纳6月社保费', explanation: '应付职工薪酬-社保减少42,000元，清偿对社保机构的缴费义务。' },
      { subjectCode: '100201', debit: 0, credit: 42000, summary: '社保缴费转账', explanation: '工商银行存款减少42,000元，用于缴纳社保费。' , cashFlowItem: 'cf-op3', cashFlowExplanation: '支付职工薪酬相关支出（配对科目221102），属于"支付给职工以及为职工支付的现金"——经营活动现金流出。'}],
    documents: [
      { type: 'bank', label: '社保缴费回单', date: '2026-07-01', totalAmount: 42000, payer: '鼎立建筑工程有限公司', payeeName: '社会保险事业管理中心', content: '2026年6月社保费', refNo: 'SB202607010001' }]},
  {
    date: '2026-07-02',
    title: '发放6月职工工资',
    tags: ['工资社保'],
    difficulty: 1,
    description: '发放6月职工工资135,000元，通过工商银行代发至员工个人账户。',
    tip: '实际发放工资时借记"应付职工薪酬-工资"，贷记"银行存款"。上月已计提的应付职工薪酬清偿后余额归零。出纳需核对代发清单无误后提交银行办理。',
    entries: [
      { subjectCode: '221101', debit: 135000, credit: 0, summary: '发放6月工资', explanation: '应付职工薪酬-工资减少135,000元，清偿对职工的工资负债。' },
      { subjectCode: '100201', debit: 0, credit: 135000, summary: '银行代发工资', explanation: '工商银行存款减少135,000元，通过银行代发系统发放至员工个人账户。' , cashFlowItem: 'cf-op3', cashFlowExplanation: '支付职工薪酬相关支出（配对科目221101），属于"支付给职工以及为职工支付的现金"——经营活动现金流出。'}],
    documents: [
      { type: 'bank', label: '代发工资回单', date: '2026-07-02', totalAmount: 135000, payer: '鼎立建筑工程有限公司', payeeName: '公司全体员工', content: '6月工资发放', refNo: 'GZ202607020001' }]},

  // ═════════════════════════════════════════════════════════════════════
  // 工程保险与防护物资（7/3-7/6）
  // ═════════════════════════════════════════════════════════════════════
  {
    date: '2026-07-03',
    title: '支付全年建筑工程一切险保费',
    tags: ['工程成本'],
    difficulty: 1,
    role: 'accountant',
    description: '为本年度办公楼工程项目投保建筑工程一切险及第三方责任险，一次性支付全年保费120,000元，保险期间2026年7月至2027年6月。',
    tip: '跨年度的保险费先通过"预付账款"归集，再按月摊销计入工程成本。工程保险是建筑业风险管理的重要手段，保费属于合同履约成本-其他直接费用。',
    entries: [
      { subjectCode: '1123', debit: 120000, credit: 0, summary: '预付全年工程保险费', explanation: '预付账款增加120,000元。一次性支付全年保费，先作为预付款项，后续按月摊销计入工程成本。' },
      { subjectCode: '100201', debit: 0, credit: 120000, summary: '支付全年保险保费', explanation: '工商银行存款减少120,000元，一次性支付全年保险费用。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目1123），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '保险发票', date: '2026-07-03', totalAmount: 120000, docTitle: '建筑工程一切险保险费发票', items: [{ name: '建筑工程一切险保费', qty: 1, price: 90000, amount: 90000 }, { name: '第三方责任险保费', qty: 1, price: 30000, amount: 30000 }], stampText: '中国人民财产保险股份有限公司 发票专用章' }]},
  {
    date: '2026-07-04',
    title: '预付雨季施工防护物资款',
    tags: ['材料管理'],
    difficulty: 1,
    role: 'accountant',
    description: '雨季来临前预付防雨布、排水泵、防水电缆等防护物资采购款50,000元，已通过工商银行转账支付，物资尚未全部到货。',
    tip: '预付物资采购款先通过"预付账款"核算，待物资验收入库或领用时再转入工程成本。借记"预付账款"，贷记"银行存款"。',
    entries: [
      { subjectCode: '1123', debit: 50000, credit: 0, summary: '预付雨季防护物资款', explanation: '预付账款增加50,000元。防护物资尚未全部到货，先作为预付款项。待物资领用时再计入合同履约成本。' },
      { subjectCode: '100201', debit: 0, credit: 50000, summary: '支付防护物资预付款', explanation: '工商银行存款减少50,000元，预付防雨布、排水泵等雨季防护物资采购款。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目1123），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '转账回单', date: '2026-07-04', totalAmount: 50000, payer: '鼎立建筑工程有限公司', payeeName: '华东建材贸易有限公司', content: '预付雨季防护物资采购款', refNo: 'YF202607040001' }]},
  {
    date: '2026-07-05',
    title: '提取备用金',
    tags: ['出纳'],
    difficulty: 1,
    description: '从工商银行提取备用金30,000元，用于雨季期间项目部日常零星开支（如购买雨具、临时用工餐费等）。',
    tip: '提取备用金借记"库存现金"，贷记"银行存款"。雨季期间项目现场零星支出较多，适当增加备用金额度。出纳需妥善保管备用金。',
    entries: [
      { subjectCode: '1001', debit: 30000, credit: 0, summary: '提取备用金', explanation: '库存现金增加30,000元，用于雨季期间项目部日常零星支出。' },
      { subjectCode: '100201', debit: 0, credit: 30000, summary: '提取备用金', explanation: '工商银行存款减少30,000元，提取现金备用。' }],
    documents: [
      { type: 'receipt', label: '现金支票存根', date: '2026-07-05', totalAmount: 30000, docTitle: '现金支票存根', items: [{ name: '提取备用金（雨季项目部）', qty: 1, price: 30000, amount: 30000 }], stampText: '财务预留印鉴' }]},
  {
    date: '2026-07-06',
    title: '现金采购防雨劳保用品',
    tags: ['材料管理'],
    difficulty: 1,
    description: '施工人员在雨季期间需要雨衣、雨靴等劳保用品，以现金采购3,000元，已发放至各班组。',
    tip: '劳保用品直接用于工程现场施工人员，计入"合同履约成本-其他直接费用"。借记"合同履约成本"，贷记"库存现金"。劳保用品是为保障施工安全进行的必要支出。',
    entries: [
      { subjectCode: '540105', debit: 3000, credit: 0, summary: '现金采购防雨劳保用品', explanation: '其他直接费用增加3,000元。雨衣、雨靴等劳保用品直接用于施工现场，属于工程成本中的其他直接费用。' },
      { subjectCode: '1001', debit: 0, credit: 3000, summary: '支付防雨劳保用品', explanation: '库存现金减少3,000元，用于采购防雨劳保用品并发放至施工班组。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目540105），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '采购收据', date: '2026-07-06', totalAmount: 3000, docTitle: '劳保用品采购清单', items: [{ name: '雨衣（20件）', qty: 20, price: 80, amount: 1600 }, { name: '雨靴（20双）', qty: 20, price: 70, amount: 1400 }], stampText: '五金劳保商店 收款章' }]},

  // ═════════════════════════════════════════════════════════════════════
  // 设备大修与机械故障（7/7-7/10）
  // ═════════════════════════════════════════════════════════════════════
  {
    date: '2026-07-07',
    title: '支付塔吊故障检测费',
    tags: ['机械使用'],
    difficulty: 1,
    role: 'accountant',
    description: '项目部塔吊在雨季运行中出现异常响动，委托特种设备检测公司进行专业检测，支付检测费8,000元，已转账支付。',
    tip: '施工机械的检测费属于"合同履约成本-机械使用费"。建筑业施工机械的检测、维修等费用均计入机械使用费，是工程成本的组成部分。',
    entries: [
      { subjectCode: '540104', debit: 8000, credit: 0, summary: '塔吊故障检测费', explanation: '机械使用费增加8,000元。塔吊故障检测费是维持施工机械正常运转的必要支出，计入合同履约成本-机械使用费。' },
      { subjectCode: '100201', debit: 0, credit: 8000, summary: '支付检测费', explanation: '工商银行存款减少8,000元，用于支付特种设备检测服务费。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目540104），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '转账回单', date: '2026-07-07', totalAmount: 8000, payer: '鼎立建筑工程有限公司', payeeName: '安达特种设备检测有限公司', content: '塔吊故障检测服务费', refNo: 'JC202607070001' }]},
  {
    date: '2026-07-08',
    title: '设备大修——更换塔吊发动机总成',
    tags: ['机械使用', '工程成本'],
    difficulty: 2,
    role: 'accountant',
    description: '经检测，塔吊发动机严重磨损需大修。更换发动机总成及维修回转机构，维修费65,000元（含税），由维修公司开具增值税专用发票，款项尚未支付。',
    tip: '设备大修费用计入"合同履约成本-机械使用费"。与固定资产改良不同，大修恢复设备原有性能但不会延长使用寿命或提高产能，故不资本化。注意区分大修（费用化）与改良（资本化）的界限。',
    entries: [
      { subjectCode: '540104', debit: 65000, credit: 0, summary: '塔吊大修-更换发动机总成', explanation: '机械使用费增加65,000元。大修是恢复设备正常工作状态的必要支出，费用化处理计入当期工程成本。若为改良（如大幅提升性能或延长寿命3年以上）需资本化增加固定资产原值。' },
      { subjectCode: '2241', debit: 0, credit: 65000, summary: '应付维修公司大修费', explanation: '其他应付款增加65,000元。大修费用尚未支付，形成对维修公司的负债。' }],
    documents: [
      { type: 'text', label: '维修合同', docTitle: '塔吊大修施工合同（摘要）', content: '委托方：鼎立建筑工程有限公司\n承修方：中联重科售后服务有限公司\n维修内容：更换发动机总成+回转机构大修\n维修费用：65,000元（含税）\n质保期：6个月', signature: '双方签章' },
      { type: 'text', label: '设备维修单', docTitle: '设备大修竣工单', content: '设备名称：QTZ80塔式起重机\n维修项目：更换发动机总成、回转机构齿轮修复\n维修结果：调试运行正常，各项指标达标\n验收人：项目部 李经理', signature: '李经理' }]},
  {
    date: '2026-07-09',
    title: '暴雨导致临时停工损失',
    tags: ['工程成本'],
    difficulty: 2,
    role: 'accountant',
    description: '连续暴雨导致工地严重积水，临时停工2天。发生抽水费3,000元（柴油抽水机燃油及租赁），临时用工清理费4,500元，合计7,500元，现金支付。',
    tip: '雨季停工损失属于"合同履约成本-其他直接费用"。暴雨等不可抗力导致的停工损失应计入工程成本，这是建筑业雨季施工的特殊成本项目。',
    entries: [
      { subjectCode: '540105', debit: 7500, credit: 0, summary: '暴雨停工损失（抽水费+清理费）', explanation: '其他直接费用增加7,500元。暴雨导致的临时停工损失是雨季施工不可避免的额外成本，计入合同履约成本-其他直接费用。' },
      { subjectCode: '1001', debit: 0, credit: 7500, summary: '现金支付停工费用', explanation: '库存现金减少7,500元。支付抽水设备租赁及临时用工费用。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目540105），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '临时用工工资表', date: '2026-07-09', totalAmount: 4500, docTitle: '雨季临时清理用工工资表', items: [{ name: '临时用工（15人×2天×150元）', qty: 30, price: 150, amount: 4500 }], stampText: '项目部章' },
      { type: 'receipt', label: '柴油及租赁收据', date: '2026-07-09', totalAmount: 3000, docTitle: '抽水设备费用', items: [{ name: '柴油泵租赁费（2台×2天）', qty: 4, price: 500, amount: 2000 }, { name: '柴油（40升）', qty: 40, price: 25, amount: 1000 }], stampText: '五金店收款章' }]},
  {
    date: '2026-07-10',
    title: '租赁大功率排水泵',
    tags: ['机械使用'],
    difficulty: 1,
    role: 'accountant',
    description: '为确保雨季施工不中断，租赁大功率排水泵4台用于工地排水，本月租赁费16,000元，已转账支付。',
    tip: '施工排水是雨季施工的常规措施，排水设备租赁费计入"合同履约成本-机械使用费"。雨季施工增加费（含排水、防雨、保温等）在建筑业成本核算中有单独归集科目。',
    entries: [
      { subjectCode: '540104', debit: 16000, credit: 0, summary: '大功率排水泵本月租赁费', explanation: '机械使用费增加16,000元。排水泵租赁费属于机械使用费中的租赁费用，是为保证雨季正常施工的必要支出。' },
      { subjectCode: '100201', debit: 0, credit: 16000, summary: '支付排水泵租赁费', explanation: '工商银行存款减少16,000元，支付排水设备租赁费用。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目540104），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '转账回单', date: '2026-07-10', totalAmount: 16000, payer: '鼎立建筑工程有限公司', payeeName: '永固机械设备租赁有限公司', content: '排水泵7月租赁费', refNo: 'ZL202607100001' }]},

  // ═════════════════════════════════════════════════════════════════════
  // 材料采购与分包（7/11-7/14）
  // ═════════════════════════════════════════════════════════════════════
  {
    date: '2026-07-11',
    title: '采购7月工程材料',
    tags: ['材料管理', '工程成本'],
    difficulty: 2,
    role: 'accountant',
    description: '向丁公司采购7月施工用钢材、水泥等材料80,000元（不含税），增值税13%为10,400元，价税合计90,400元。材料已验收入库，款项未付。',
    tip: '建筑业材料采购直接记入"合同履约成本-材料成本"。取得的增值税专用发票进项税额可抵扣。借记"合同履约成本-材料成本"和"应交税费-进项税额"，贷记"应付账款"。',
    entries: [
      { subjectCode: '540102', debit: 80000, credit: 0, summary: '购入7月施工用钢材水泥', explanation: '材料成本增加80,000元。钢材、水泥等工程材料直接计入合同履约成本-材料成本。' },
      { subjectCode: '222101', debit: 10400, credit: 0, summary: '增值税进项税额（80,000×13%）', explanation: '应交增值税-进项税额增加10,400元。取得增值税专用发票，进项税额可抵扣销项税额。' },
      { subjectCode: '220202', debit: 0, credit: 90400, summary: '应付账款-丁公司', explanation: '应付账款-丁公司增加90,400元。材料款未付，形成对供应商的采购负债。' }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', date: '2026-07-11', region: '江苏省', invoiceNo: '3200260711', buyer: '鼎立建筑工程有限公司', seller: '丁公司', lineItems: [{ name: '螺纹钢HRB400', qty: 15, unit: '吨', price: 4000, amount: 60000 }, { name: '普通硅酸盐水泥P.O42.5', qty: 40, unit: '吨', price: 500, amount: 20000 }], totalAmount: 90400 }]},
  {
    date: '2026-07-12',
    title: '支付材料采购欠款',
    tags: ['材料管理'],
    difficulty: 1,
    description: '通过工商银行支付前欠丁公司材料采购款90,400元。',
    tip: '支付供应商欠款时，借记"应付账款"，贷记"银行存款"。出纳需核对采购合同、入库单和发票，确保付款金额准确无误。大额付款须双人复核。',
    entries: [
      { subjectCode: '220202', debit: 90400, credit: 0, summary: '支付丁公司材料款', explanation: '应付账款-丁公司减少90,400元，清偿对供应商的采购负债。' },
      { subjectCode: '100201', debit: 0, credit: 90400, summary: '转账支付材料款', explanation: '工商银行存款减少90,400元，用于支付采购欠款。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目220202），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '付款回单', date: '2026-07-12', totalAmount: 90400, payer: '鼎立建筑工程有限公司', payeeName: '丁公司', content: '支付材料采购款', refNo: 'FK202607120001' }]},
  {
    date: '2026-07-14',
    title: '分包工程进度结算',
    tags: ['分包管理', '工程成本'],
    difficulty: 2,
    role: 'accountant',
    description: '大地基础工程公司完成7月主体结构分包工程，经监理验收合格。本月进度结算款200,000元（不含税），增值税9%，价税合计218,000元，款项未付。',
    tip: '分包工程完工后按进度结算，借记"合同履约成本-分包成本"和"应交税费-进项税额"，贷记"应付账款"。建筑业分包方开具的增值税专用发票进项税额也可抵扣。',
    entries: [
      { subjectCode: '540103', debit: 200000, credit: 0, summary: '分包工程进度结算款', explanation: '分包成本增加200,000元。主体结构分包工程本月完成进度结算，按规定计量确认后计入工程成本。' },
      { subjectCode: '222101', debit: 18000, credit: 0, summary: '增值税进项税额（200,000×9%）', explanation: '应交增值税-进项税额增加18,000元。分包进项税额可抵扣，税率与销项一致（均为9%）。' },
      { subjectCode: '220201', debit: 0, credit: 218000, summary: '应付账款-大地基础工程公司', explanation: '应付账款增加218,000元。分包结算款尚未支付，形成对分包单位的负债。' }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', date: '2026-07-14', region: '江苏省', invoiceNo: '3200260714', buyer: '鼎立建筑工程有限公司', seller: '大地基础工程有限公司', lineItems: [{ name: '办公楼主体结构分包工程进度款', qty: 1, unit: '项', price: 200000, amount: 200000 }], totalAmount: 218000 },
      { type: 'text', label: '工程进度确认单', docTitle: '分包工程进度确认单', content: '分包单位：大地基础工程有限公司\n工程内容：办公楼主体结构施工\n本月进度：主体结构施工至第8层\n验收结论：质量合格，同意计量', signature: '总监理工程师 刘工' }]},

  // ═════════════════════════════════════════════════════════════════════
  // 折旧、薪酬与社保计提（7/15-7/16）
  // ═════════════════════════════════════════════════════════════════════
  {
    date: '2026-07-15',
    title: '计提本月固定资产折旧',
    tags: ['机械使用', '工程成本'],
    difficulty: 2,
    role: 'accountant',
    description: '本月应计提折旧：施工用挖掘机、塔吊等设备折旧18,000元，运输车辆折旧5,000元（用于工程材料运输），公司办公设备折旧2,000元。合计25,000元。',
    tip: '施工设备折旧计入"合同履约成本-机械使用费"，运输车辆用于工程运输的折旧也计入机械使用费，办公设备折旧计入"管理费用"。注意区分使用部门以确定费用归属。',
    entries: [
      { subjectCode: '540104', debit: 23000, credit: 0, summary: '施工设备折旧（18,000）+运输车辆折旧（5,000）', explanation: '机械使用费增加23,000元。施工用设备及运输车辆用于工程的折旧均计入机械使用费。' },
      { subjectCode: '660201', debit: 2000, credit: 0, summary: '办公设备折旧', explanation: '管理费用增加2,000元。办公设备用于行政管理，其折旧计入管理费用。' },
      { subjectCode: '1602', debit: 0, credit: 25000, summary: '计提累计折旧', explanation: '累计折旧增加25,000元，反映固定资产因使用而产生的价值损耗。' }],
    documents: [
      { type: 'text', label: '折旧计算表', docTitle: '2026年7月固定资产折旧计算表', content: '施工设备原值1,080,000元，月折旧率1.667%，月折旧额18,000元\n运输车辆原值300,000元，月折旧率1.667%，月折旧额5,000元\n办公设备原值120,000元，月折旧率1.667%，月折旧额2,000元\n合计：25,000元', signature: '赵会计' }]},
  {
    date: '2026-07-16',
    title: '计提本月职工薪酬',
    tags: ['工程成本', '工资社保'],
    difficulty: 2,
    role: 'accountant',
    description: '本月应发职工工资：施工人员90,000元（含雨季清理用工），项目部管理人员35,000元，公司管理人员28,000元。合计153,000元。',
    tip: '直接施工人员工资记入"合同履约成本-人工成本"，项目部管理人员工资记入"合同履约成本-间接费用"，公司管理人员工资记入"管理费用"。',
    entries: [
      { subjectCode: '540101', debit: 90000, credit: 0, summary: '施工人员工资（含雨季清理用工）', explanation: '人工成本增加90,000元。直接从事工程施工的人员工资计入合同履约成本-人工成本。' },
      { subjectCode: '540106', debit: 35000, credit: 0, summary: '项目部管理人员工资', explanation: '间接费用增加35,000元。项目部管理人员工资属于间接费用。' },
      { subjectCode: '660201', debit: 28000, credit: 0, summary: '公司管理人员工资', explanation: '管理费用增加28,000元。公司行政管理人员工资计入管理费用。' },
      { subjectCode: '221101', debit: 0, credit: 153000, summary: '应付职工薪酬-工资', explanation: '应付职工薪酬增加153,000元，形成对职工的工资负债，体现权责发生制。' }],
    documents: [
      { type: 'text', label: '工资表', docTitle: '2026年7月职工工资表', content: '施工人员（16人）90,000元\n项目部管理人员（5人）35,000元\n公司管理人员（4人）28,000元\n合计：153,000元', signature: '王人事  赵会计' }]},
  {
    date: '2026-07-16',
    title: '计提本月社会保险费',
    tags: ['工程成本', '工资社保'],
    difficulty: 2,
    role: 'accountant',
    description: '按规定计提本月社会保险费。项目部施工人员及管理人员社保15,000元计入间接费用，公司管理人员社保8,000元计入管理费用。合计23,000元。',
    tip: '社保费按受益对象分配归属。项目部人员的社保计入"合同履约成本-间接费用"，公司管理人员的社保计入"管理费用"。',
    entries: [
      { subjectCode: '540106', debit: 15000, credit: 0, summary: '项目部人员社保费', explanation: '间接费用增加15,000元。项目部人员的单位承担社保部分计入合同履约成本-间接费用。' },
      { subjectCode: '660201', debit: 8000, credit: 0, summary: '公司管理人员社保费', explanation: '管理费用增加8,000元。公司行政管理人员社保单位承担部分计入管理费用。' },
      { subjectCode: '221102', debit: 0, credit: 23000, summary: '应付职工薪酬-社保', explanation: '应付职工薪酬-社保增加23,000元，形成对社保机构的缴费义务。' }],
    documents: [
      { type: 'text', label: '社保计算表', docTitle: '2026年7月社会保险费计提表', content: '项目部（施工+管理）21人×基数×比例=15,000元\n公司管理人员4人×基数×比例=8,000元\n合计：23,000元', signature: '赵会计' }]},

  // ═════════════════════════════════════════════════════════════════════
  // 资金收付（7/15-7/17）
  // ═════════════════════════════════════════════════════════════════════
  {
    date: '2026-07-15',
    title: '银行账户管理费扣收',
    tags: ['出纳'],
    difficulty: 1,
    description: '工商银行收取本月账户管理费及转账手续费共计180元，直接从账户扣收。',
    tip: '银行手续费属于"财务费用"，银行直接从账户扣收。出纳需逐笔核对银行扣款金额和明细。',
    entries: [
      { subjectCode: '6603', debit: 180, credit: 0, summary: '银行账户管理费及转账手续费', explanation: '财务费用增加180元。银行账户管理费和转账手续费属于融资和结算费用，计入财务费用。' },
      { subjectCode: '100201', debit: 0, credit: 180, summary: '银行直接扣收', explanation: '工商银行存款减少180元，银行直接扣收手续费。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6603），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '银行扣款通知', date: '2026-07-15', totalAmount: 180, payer: '鼎立建筑工程有限公司', payeeName: '中国工商银行', content: '7月账户管理费及手续费', refNo: 'YH202607150001' }]},
  {
    date: '2026-07-17',
    title: '发放7月职工工资',
    tags: ['工资社保'],
    difficulty: 1,
    description: '通过工商银行发放本月职工工资153,000元，按照工资表明细代发至每位员工个人银行账户。',
    tip: '发放工资时借记"应付职工薪酬-工资"，贷记"银行存款"。上月计提的工资负债在发放后清偿。',
    entries: [
      { subjectCode: '221101', debit: 153000, credit: 0, summary: '发放7月工资', explanation: '应付职工薪酬-工资减少153,000元，清偿7月计提的职工薪酬负债。' },
      { subjectCode: '100201', debit: 0, credit: 153000, summary: '银行代发工资', explanation: '工商银行存款减少153,000元，通过银行代发系统发放工资。' , cashFlowItem: 'cf-op3', cashFlowExplanation: '支付职工薪酬相关支出（配对科目221101），属于"支付给职工以及为职工支付的现金"——经营活动现金流出。'}],
    documents: [
      { type: 'bank', label: '代发工资回单', date: '2026-07-17', totalAmount: 153000, payer: '鼎立建筑工程有限公司', payeeName: '公司全体员工', content: '2026年7月工资', refNo: 'GZ202607170001' }]},

  // ═════════════════════════════════════════════════════════════════════
  // 雨季施工增加费（7/18-7/22）
  // ═════════════════════════════════════════════════════════════════════
  {
    date: '2026-07-18',
    title: '搭设防雨棚',
    tags: ['工程成本'],
    difficulty: 1,
    role: 'accountant',
    description: '在施工现场材料堆放区和作业面搭设防雨棚，发生材料费8,000元、人工费5,000元，合计13,000元，已转账支付。',
    tip: '搭设防雨棚属于雨季施工增加费中的防护措施费用，计入"合同履约成本-其他直接费用"。',
    entries: [
      { subjectCode: '540105', debit: 13000, credit: 0, summary: '搭设防雨棚（材料+人工）', explanation: '其他直接费用增加13,000元。防雨棚搭设是雨季施工的必要防护措施，计入合同履约成本-其他直接费用。' },
      { subjectCode: '100201', debit: 0, credit: 13000, summary: '转账支付防雨棚费用', explanation: '工商银行存款减少13,000元，用于支付防雨棚搭设费用。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目540105），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '材料采购收据', date: '2026-07-18', totalAmount: 8000, docTitle: '防雨棚材料采购清单', items: [{ name: '彩钢瓦', qty: 100, unit: '平米', price: 50, amount: 5000 }, { name: '钢管脚手架', qty: 50, unit: '根', price: 40, amount: 2000 }, { name: '铁丝及扣件', qty: 1, unit: '批', price: 1000, amount: 1000 }], stampText: '建材店收款章' }]},
  {
    date: '2026-07-19',
    title: '报销考察设备维修方案差旅费',
    tags: ['工程成本'],
    difficulty: 1,
    role: 'accountant',
    description: '项目经理与设备主管赴设备厂家考察塔吊大修方案，报销差旅费4,600元（交通费2,000元、住宿费1,600元、餐补1,000元），现金支付。',
    tip: '与工程直接相关的差旅费计入"合同履约成本-其他直接费用"。为确定设备维修方案发生的差旅费，属于工程项目支出的组成部分。',
    entries: [
      { subjectCode: '540105', debit: 4600, credit: 0, summary: '考察塔吊大修方案差旅费', explanation: '其他直接费用增加4,600元。为确定塔吊大修方案而发生的差旅费，与工程项目直接相关。' },
      { subjectCode: '1001', debit: 0, credit: 4600, summary: '现金报销差旅费', explanation: '库存现金减少4,600元，用于支付考察差旅费报销款。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目540105），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '差旅费报销单', date: '2026-07-19', totalAmount: 4600, docTitle: '差旅费报销单', items: [{ name: '往返高铁票（2人）', qty: 4, price: 500, amount: 2000 }, { name: '住宿费（2间×2晚）', qty: 4, price: 400, amount: 1600 }, { name: '出差餐补（2人×2天）', qty: 4, price: 250, amount: 1000 }], stampText: '财务审核专用章' }]},
  {
    date: '2026-07-20',
    title: '转账支付分包工程款',
    tags: ['分包管理'],
    difficulty: 1,
    description: '向大地基础工程公司支付7月分包工程进度结算款218,000元。',
    tip: '支付分包工程款时借记"应付账款"，贷记"银行存款"。出纳需核实分包工程进度确认单、发票和合同约定付款条件后方可付款。',
    entries: [
      { subjectCode: '220201', debit: 218000, credit: 0, summary: '支付大地基础分包工程款', explanation: '应付账款减少218,000元。支付分包工程结算款，清偿对分包单位的债务。' },
      { subjectCode: '100201', debit: 0, credit: 218000, summary: '转账支付分包款', explanation: '工商银行存款减少218,000元，用于支付分包工程结算款。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目220201），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '付款回单', date: '2026-07-20', totalAmount: 218000, payer: '鼎立建筑工程有限公司', payeeName: '大地基础工程有限公司', content: '支付7月分包工程进度款', refNo: 'FK202607200001' }]},
  {
    date: '2026-07-20',
    title: '微信支付提现至银行账户',
    tags: ['费用管理'],
    difficulty: 1,
    description: '将微信账户中收到的工程零星款项余额4,500元提现至工商银行账户。',
    tip: '第三方支付平台资金提现时，借记"银行存款"，贷记"其他货币资金-微信支付"。定期将第三方平台余额归集至银行账户统一管理。',
    entries: [
      { subjectCode: '100201', debit: 4500, credit: 0, summary: '微信提现至工行', explanation: '银行存款增加4,500元。将微信账户资金转入工商银行，资金归集至主账户。' },
      { subjectCode: '101204', debit: 0, credit: 4500, summary: '微信账户资金减少', explanation: '其他货币资金-微信支付减少4,500元。微信账户余额减少，完成提现。' }],
    documents: [
      { type: 'bank', label: '微信提现记录', date: '2026-07-20', totalAmount: 4500, payer: '微信支付账户', payeeName: '鼎立建筑工程有限公司（工行）', content: '微信账户余额提现', refNo: 'WX202607200001' }]},
  {
    date: '2026-07-21',
    title: '摊销本月预付工程保险费',
    tags: ['工程成本'],
    difficulty: 1,
    role: 'accountant',
    description: '本月摊销预付的全年建筑工程一切险保费10,000元（年保费120,000元÷12个月），计入工程成本。',
    tip: '预付的保险费按照受益期分期摊销。本月摊销额=年保费120,000÷12=10,000元。借记"合同履约成本-其他直接费用"，贷记"预付账款"。体现权责发生制原则。',
    entries: [
      { subjectCode: '540105', debit: 10000, credit: 0, summary: '摊销7月工程保险费（120,000÷12）', explanation: '其他直接费用增加10,000元。全年工程保险费120,000元分12个月摊销，本月应承担10,000元。' },
      { subjectCode: '1123', debit: 0, credit: 10000, summary: '预付保险费摊销转出', explanation: '预付账款减少10,000元。保险费用摊销转出，符合权责发生制要求。' }],
    documents: [
      { type: 'text', label: '摊销计算表', docTitle: '预付费用摊销计算表（2026年7月）', content: '费用项目：工程保险费\n预付总额：120,000元\n摊销期限：12个月\n本月摊销：120,000÷12=10,000元', signature: '赵会计' }]},
  {
    date: '2026-07-22',
    title: '领用雨季防护物资',
    tags: ['材料管理'],
    difficulty: 1,
    role: 'accountant',
    description: '本月领用防雨布、排水泵等雨季防护物资35,000元，用于施工现场防雨防护，计入工程成本。',
    tip: '雨季防护物资领用时从"预付账款"转入"合同履约成本-其他直接费用"。这些物资直接服务于工程项目雨季施工防护。',
    entries: [
      { subjectCode: '540105', debit: 35000, credit: 0, summary: '领用防雨布、排水泵等防护物资', explanation: '其他直接费用增加35,000元。雨季防护物资领用后直接用于施工现场防护。' },
      { subjectCode: '1123', debit: 0, credit: 35000, summary: '防护物资领用转出', explanation: '预付账款减少35,000元。预付的防护物资领用后从预付账款转入工程成本。' }],
    documents: [
      { type: 'text', label: '物资领用单', docTitle: '防护物资领用单', date: '2026-07-22', content: '防雨布2,000平米×8元=16,000元\n排水泵4台×3,000元=12,000元\n防水电缆500米×14元=7,000元\n合计：35,000元', stampText: '项目部章' }]},
  {
    date: '2026-07-22',
    title: '支付宝余额提现至银行',
    tags: ['出纳'],
    difficulty: 1,
    description: '将支付宝账户余额3,200元提现至工商银行账户。',
    tip: '支付宝提现与微信提现处理方式相同。借记"银行存款-工行"，贷记"其他货币资金-支付宝"。定期归集第三方平台资金。',
    entries: [
      { subjectCode: '100201', debit: 3200, credit: 0, summary: '支付宝提现至工行', explanation: '银行存款增加3,200元。将支付宝账户资金转入工商银行。' },
      { subjectCode: '101205', debit: 0, credit: 3200, summary: '支付宝账户资金减少', explanation: '其他货币资金-支付宝减少3,200元。完成提现。' }],
    documents: [
      { type: 'bank', label: '支付宝提现记录', date: '2026-07-22', totalAmount: 3200, payer: '支付宝账户', payeeName: '鼎立建筑工程有限公司（工行）', content: '支付宝余额提现', refNo: 'ZFB202607220001' }]},
  {
    date: '2026-07-23',
    title: '支付办公费及水电费',
    tags: ['工程成本'],
    difficulty: 1,
    description: '支付本月公司办公费5,000元、项目部水电费4,500元，合计9,500元，已转账支付。',
    tip: '办公费计入"管理费用"，项目部水电费计入"合同履约成本-间接费用"。出纳需核对缴费通知单和发票。',
    entries: [
      { subjectCode: '660201', debit: 5000, credit: 0, summary: '公司办公费', explanation: '管理费用增加5,000元。行政管理部门办公用品及耗材费用。' },
      { subjectCode: '540106', debit: 4500, credit: 0, summary: '项目部水电费', explanation: '间接费用增加4,500元。施工现场水电费属于间接费用。' },
      { subjectCode: '100201', debit: 0, credit: 9500, summary: '转账支付办公水电费', explanation: '工商银行存款减少9,500元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目660201），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '办公费发票', date: '2026-07-23', totalAmount: 5000, docTitle: '办公用品采购发票', items: [{ name: '打印纸、墨盒等办公耗材', qty: 1, price: 5000, amount: 5000 }], stampText: '办公用品公司发票专用章' },
      { type: 'receipt', label: '电费缴费单', date: '2026-07-23', totalAmount: 4500, docTitle: '电力公司电费通知单', items: [{ name: '7月施工用电', qty: 1, price: 4500, amount: 4500 }], stampText: '电力公司收费章' }]},
  {
    date: '2026-07-24',
    title: '支付塔吊大修费',
    tags: ['机械使用'],
    difficulty: 2,
    description: '向中联重科售后服务公司支付塔吊大修费用65,000元，验收合格后付清。',
    tip: '支付设备大修费时，借记"其他应付款"，贷记"银行存款"。出纳需确认维修竣工验收单已签署后再付款。',
    entries: [
      { subjectCode: '2241', debit: 65000, credit: 0, summary: '支付塔吊大修欠款', explanation: '其他应付款减少65,000元。清偿此前计提的应付塔吊大修费用。' },
      { subjectCode: '100201', debit: 0, credit: 65000, summary: '转账支付大修费', explanation: '工商银行存款减少65,000元，用于支付塔吊大修费用。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目2241），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '付款回单', date: '2026-07-24', totalAmount: 65000, payer: '鼎立建筑工程有限公司', payeeName: '中联重科售后服务有限公司', content: '塔吊大修费用', refNo: 'FK202607240001' }]},

  // ═════════════════════════════════════════════════════════════════════
  // 收入确认与期末处理（7/25-7/31）
  // ═════════════════════════════════════════════════════════════════════
  {
    date: '2026-07-25',
    title: '确认本月工程进度收入',
    tags: ['工程合同', '工程成本'],
    difficulty: 3,
    role: 'accountant',
    description: '本月恒达地产办公楼受雨季影响施工效率降低，工程进度完成8%。按完工百分比法确认收入400,000元（合同总价500万×8%），增值税销项税额36,000元，冲减合同负债。',
    tip: '完工百分比法：按实际完工进度确认收入。冲减合同负债时借记"合同负债"，贷记"主营业务收入"和"应交增值税-销项税额"。',
    entries: [
      { subjectCode: '2205', debit: 436000, credit: 0, summary: '合同负债冲转（冲抵预收款）', explanation: '合同负债减少436,000元。此前收到的工程预付款在确认收入时冲减，反映履约义务减少。' },
      { subjectCode: '222101', debit: 0, credit: 36000, summary: '增值税销项税额（400,000×9%）', explanation: '应交增值税-销项税额增加36,000元。按9%税率计算增值税纳税义务。' },
      { subjectCode: '6001', debit: 0, credit: 400000, summary: '确认主营业务收入（不含税）', explanation: '主营业务收入增加400,000元。按完工百分比法确认本月工程收入。' }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', date: '2026-07-25', region: '江苏省', invoiceNo: '3200260725', buyer: '恒达地产有限公司', seller: '鼎立建筑工程有限公司', lineItems: [{ name: '办公楼建设工程进度款（8%）', qty: 1, unit: '项', price: 400000, amount: 400000 }], totalAmount: 436000 },
      { type: 'text', label: '工程进度确认单', docTitle: '2026年7月工程进度确认单', content: '合同总价：5,000,000元\n本月完工进度：8%\n本月确认收入：400,000元\n累计完工进度：50%\n说明：7月受雨季影响，施工效率有所降低', signature: '总监理工程师 刘工' }]},
  {
    date: '2026-07-26',
    title: '计算本月应交增值税及附加',
    tags: ['税费'],
    difficulty: 2,
    role: 'accountant',
    description: '计算本月应交增值税。销项税额36,000元，进项税额28,400元（材料10,400+分包18,000），应交增值税7,600元。计提城建税532元（7%）、教育费附加228元（3%）、地方教育附加152元（2%），合计912元。',
    tip: '月末计算增值税时，用销项税额减去进项税额得到应交增值税额。再以应交增值税为基数计算城建税（市区7%）和教育费附加（3%+2%）。',
    entries: [
      { subjectCode: '6403', debit: 912, credit: 0, summary: '计提城建税及教育费附加', explanation: '税金及附加增加912元。以应交增值税7,600元为基数计算。' },
      { subjectCode: '222103', debit: 0, credit: 532, summary: '应交城建税（7,600×7%）', explanation: '应交税费-城建税增加532元。市区企业适用7%税率。' },
      { subjectCode: '222104', debit: 0, credit: 380, summary: '应交教育费附加（7,600×5%）', explanation: '应交税费-教育费附加增加380元（3%+2%）。' }],
    documents: [
      { type: 'text', label: '税金计算表', docTitle: '2026年7月增值税及附加计算表', content: '销项税额：36,000元\n进项税额：28,400元\n应交增值税：7,600元\n城建税532+教育费附加380=912元', signature: '赵会计' }]},
  {
    date: '2026-07-27',
    title: '月末结转合同履约成本',
    tags: ['工程成本', '期末'],
    difficulty: 2,
    role: 'accountant',
    description: '月末按完工百分比法结转已完工部分对应的合同履约成本至主营业务成本。本月完工进度8%，应结转成本284,000元。其中：人工43,000元、材料38,000元、分包96,000元、机械54,000元、其他34,000元、间接19,000元。',
    tip: '月末将已完成工程量对应的合同履约成本结转至主营业务成本。只结转与已确认收入对应的部分，未完工部分的成本保留在合同履约成本科目。',
    entries: [
      { subjectCode: '6401', debit: 284000, credit: 0, summary: '结转本月主营业务成本', explanation: '主营业务成本增加284,000元。按完工进度8%结转至主营业务成本。' },
      { subjectCode: '540101', debit: 0, credit: 43000, summary: '结转人工成本', explanation: '合同履约成本-人工成本减少43,000元。' },
      { subjectCode: '540102', debit: 0, credit: 38000, summary: '结转材料成本', explanation: '合同履约成本-材料成本减少38,000元。' },
      { subjectCode: '540103', debit: 0, credit: 96000, summary: '结转分包成本', explanation: '合同履约成本-分包成本减少96,000元。' },
      { subjectCode: '540104', debit: 0, credit: 54000, summary: '结转机械使用费', explanation: '合同履约成本-机械使用费减少54,000元。' },
      { subjectCode: '540105', debit: 0, credit: 34000, summary: '结转其他直接费用', explanation: '合同履约成本-其他直接费用减少34,000元。' },
      { subjectCode: '540106', debit: 0, credit: 19000, summary: '结转间接费用', explanation: '合同履约成本-间接费用减少19,000元。' }],
    documents: [
      { type: 'text', label: '成本结转计算表', docTitle: '2026年7月合同履约成本结转计算表', content: '本月发生总额：人工90,000+材料80,000+分包200,000+机械112,000+其他70,100+间接39,500=591,600元\n完工进度8%对应：284,000元\n未结转余额：307,600元', signature: '赵会计' }]},
  {
    date: '2026-07-28',
    title: '计提短期借款利息',
    tags: ['出纳'],
    difficulty: 1,
    role: 'accountant',
    description: '计提本月短期借款利息。公司年初向工商银行借入短期借款400,000元，年利率4.35%，月利息1,450元（400,000×4.35%÷12）。',
    tip: '短期借款利息应按月计提，计入"财务费用"。借记"财务费用"，贷记"应付利息"。利息费用按权责发生制分期确认。',
    entries: [
      { subjectCode: '6603', debit: 1450, credit: 0, summary: '计提本月短期借款利息', explanation: '财务费用增加1,450元。利息=400,000×4.35%÷12。' },
      { subjectCode: '2232', debit: 0, credit: 1450, summary: '应付利息增加', explanation: '应付利息增加1,450元，计提的利息尚未支付。' }],
    documents: [
      { type: 'text', label: '利息计算表', docTitle: '短期借款利息计算表（2026年7月）', content: '借款本金：400,000元\n年利率：4.35%\n月利息：400,000×4.35%÷12=1,450元', signature: '赵会计' }]},
  {
    date: '2026-07-29',
    title: '结转本月损益类科目',
    tags: ['期末'],
    difficulty: 3,
    role: 'accountant',
    description: '月末结转所有损益类科目余额至本年利润。收入：主营业务收入400,000元。费用：主营业务成本284,000元、税金及附加912元、管理费用43,000元（折旧2,000+管理工资28,000+管理社保8,000+办公费5,000）、财务费用1,630元（利息1,450+银行手续费180）。利润总额=400,000-329,542=70,458元。',
    tip: '月末先结转收入类科目至本年利润贷方，再结转费用类科目至本年利润借方。本年利润贷方余额即为利润总额。',
    entries: [
      { subjectCode: '6001', debit: 400000, credit: 0, summary: '结转主营业务收入', explanation: '主营业务收入400,000元结转至本年利润，收入类科目余额归零。' },
      { subjectCode: '4103', debit: 0, credit: 400000, summary: '收入转入本年利润', explanation: '本年利润增加400,000元，所有者权益因盈利而增加。' },
      { subjectCode: '4103', debit: 329542, credit: 0, summary: '费用转入本年利润', explanation: '所有费用合计329,542元转入本年利润借方，减少本年利润。' },
      { subjectCode: '6401', debit: 0, credit: 284000, summary: '结转主营业务成本', explanation: '主营业务成本284,000元结转至本年利润，余额归零。' },
      { subjectCode: '6403', debit: 0, credit: 912, summary: '结转税金及附加', explanation: '税金及附加912元结转至本年利润，余额归零。' },
      { subjectCode: '660201', debit: 0, credit: 43000, summary: '结转管理费用', explanation: '管理费用43,000元结转至本年利润，余额归零。' },
      { subjectCode: '6603', debit: 0, credit: 1630, summary: '结转财务费用', explanation: '财务费用1,630元结转至本年利润，余额归零。' }],
    documents: [
      { type: 'text', label: '损益计算表', docTitle: '2026年7月损益结转计算表', content: '收入400,000-成本284,000-税金912-管理费43,000-财务费1,630=利润总额70,458元', signature: '赵会计' }]},
  {
    date: '2026-07-29',
    title: '计提并结转所得税费用',
    tags: ['税费', '期末'],
    difficulty: 2,
    role: 'accountant',
    description: '本月利润总额70,458元，按25%计提企业所得税17,614.50元。再将所得税费用结转至本年利润。净利润=70,458-17,614.50=52,843.50元。',
    tip: '计提所得税：借"所得税费用"贷"应交税费-应交所得税"。结转所得税：借"本年利润"贷"所得税费用"。净利润=利润总额-所得税费用。',
    entries: [
      { subjectCode: '6801', debit: 17614.5, credit: 0, summary: '计提本月所得税（70,458×25%）', explanation: '所得税费用增加17,614.50元，按利润总额的25%计算。' },
      { subjectCode: '222102', debit: 0, credit: 17614.5, summary: '应交企业所得税', explanation: '应交税费-应交所得税增加17,614.50元，形成纳税负债。' },
      { subjectCode: '4103', debit: 17614.5, credit: 0, summary: '所得税费用转入本年利润', explanation: '所得税费用17,614.50元结转至本年利润，减少本年利润。' },
      { subjectCode: '6801', debit: 0, credit: 17614.5, summary: '结转所得税费用', explanation: '所得税费用科目余额结转归零，完成所得税处理。' }],
    documents: [
      { type: 'text', label: '所得税计算表', docTitle: '2026年7月企业所得税计算表', content: '利润总额70,458×25%=17,614.50元\n净利润52,843.50元', signature: '赵会计' }]},
  {
    date: '2026-07-30',
    title: '结转净利润至未分配利润',
    tags: ['期末'],
    difficulty: 2,
    role: 'accountant',
    description: '将本月净利润52,843.50元从本年利润结转至利润分配-未分配利润。',
    tip: '月末将税后净利润结转至"利润分配-未分配利润"。借记"本年利润"，贷记"利润分配-未分配利润"。本年利润余额归零。',
    entries: [
      { subjectCode: '4103', debit: 52843.5, credit: 0, summary: '本年利润转出', explanation: '本年利润减少52,843.50元，净利润转出后余额归零。' },
      { subjectCode: '410401', debit: 0, credit: 52843.5, summary: '未分配利润增加', explanation: '利润分配-未分配利润增加52,843.50元，所有者权益增加。' }],
    documents: [
      { type: 'text', label: '利润结转表', docTitle: '2026年7月净利润结转表', content: '净利润52,843.50元结转至未分配利润。', signature: '赵会计' }]},
  {
    date: '2026-07-31',
    title: '提取法定盈余公积',
    tags: ['期末'],
    difficulty: 2,
    role: 'accountant',
    description: '按净利润52,843.50元的10%提取法定盈余公积5,284.35元。',
    tip: '法定盈余公积按净利润的10%提取，累计达注册资本50%时可不再提取。借记"利润分配-提取盈余公积"，贷记"盈余公积"。',
    entries: [
      { subjectCode: '410402', debit: 5284.35, credit: 0, summary: '提取法定盈余公积（52,843.50×10%）', explanation: '利润分配-提取盈余公积增加5,284.35元。法定盈余公积按净利润10%提取。' },
      { subjectCode: '4101', debit: 0, credit: 5284.35, summary: '盈余公积增加', explanation: '盈余公积增加5,284.35元，所有者权益增加。' }],
    documents: [
      { type: 'text', label: '盈余公积提取表', docTitle: '2026年7月法定盈余公积提取计算表', content: '净利润52,843.50×10%=5,284.35元\n依据：《公司法》第166条', signature: '赵会计' }]},

  // ═════════════════════════════════════════════════════════════════════
  // 出纳月末收尾（7/30-7/31）
  // ═════════════════════════════════════════════════════════════════════
  {
    date: '2026-07-30',
    title: '现金送存银行',
    tags: ['出纳'],
    difficulty: 1,
    description: '将库存现金中超过备用金限额的部分8,000元送存工商银行，确保库存现金余额在核定限额内。',
    tip: '当库存现金超过银行核定限额时，出纳应将超额部分送存银行。借记"银行存款"，贷记"库存现金"。',
    entries: [
      { subjectCode: '100201', debit: 8000, credit: 0, summary: '现金送存银行', explanation: '银行存款增加8,000元。将超额库存现金存入银行。' },
      { subjectCode: '1001', debit: 0, credit: 8000, summary: '现金送存银行', explanation: '库存现金减少8,000元。送存银行后余额回落至核定限额内。' }],
    documents: [
      { type: 'receipt', label: '现金进账单', date: '2026-07-30', totalAmount: 8000, docTitle: '中国工商银行现金进账单', items: [{ name: '库存现金送存', qty: 1, price: 8000, amount: 8000 }], stampText: '中国工商银行 业务专用章' }]},
  {
    date: '2026-07-31',
    title: '现金盘点',
    tags: ['期末'],
    difficulty: 1,
    description: '月末对库存现金进行实地盘点。本月现金收入30,000元（提取备用金），支出15,100元（劳保3,000+停工7,500+差旅4,600），现金账面余额14,900元。经盘点实存14,900元，账实相符。',
    tip: '出纳应每月进行现金盘点，确保账实相符。盘点时需有会计主管监盘。',
    role: 'cashier',
    entries: [],
    documents: [
      { type: 'text', label: '现金盘点表', docTitle: '2026年7月库存现金盘点表', content: '账面余额14,900元\n实盘金额14,900元\n盘点结果：账实相符\n盘点人：刘出纳  监盘人：赵会计', signature: '刘出纳  赵会计' }]},
  {
    date: '2026-07-31',
    title: '银行存款余额核对',
    tags: ['期末'],
    difficulty: 1,
    description: '月末核对工商银行日记账与银行对账单余额，编制银行存款余额调节表，确保账实一致。',
    tip: '月末出纳必须将银行存款日记账与银行对账单逐笔核对。存在未达账项时需编制余额调节表。',
    role: 'cashier',
    entries: [],
    documents: [
      { type: 'text', label: '银行对账单', docTitle: '中国工商银行对账单（2026年7月）', content: '本期收入：微信提现4,500元+支付宝提现3,200元+现金送存8,000元\n本期支出：缴税31,360元+社保42,000元+工资135,000元+保险120,000元+防护物资50,000元+备用金30,000元+检测费8,000元+排水费16,000元+材料款90,400元+手续费180元+工资153,000元+防雨棚13,000元+分包款218,000元+办公水电9,500元+大修费65,000元\n请与日记账逐笔核对。', stampText: '中国工商银行 业务专用章' }]},
  {
    date: '2026-07-31',
    title: '票据归档',
    tags: ['期末'],
    difficulty: 1,
    description: '月末将本月所有原始凭证、银行回单、发票、合同等财务票据整理归档，按日期顺序装订成册。',
    tip: '出纳应定期整理归档各类财务票据。凭证按编号顺序装订，封面注明月份、凭证号范围等信息。',
    role: 'cashier',
    entries: [],
    documents: [
      { type: 'text', label: '会计档案归档清单', docTitle: '2026年7月会计档案归档清单', content: '归档日期：2026年7月31日\n归档范围：记账凭证、银行回单、增值税发票、合同、工资表等\n保管期限：30年\n归档人：刘出纳  复核：赵会计', signature: '刘出纳  赵会计' }]}]

export default tasks
