/**
 * 建筑业 - 4月教学任务（多项目并行核算）
 *
 * 企业名称：鼎立建筑工程有限公司
 * 税制：一般纳税人（增值税9%）
 *
 * 本月主题：中标第二个工程项目——市政道路工程
 * 重点：新合同签订、设备跨项目调配、多项目成本并行核算
 *
 * 知识点标签：工程合同、工程成本、分包管理、材料管理、机械使用、往来管理、资金管理、工资社保、税费、期末
 */

const tasks = [
  // ═══════════════════════════════════════════════════════════════════
  // 月初交接（4月1日）
  // ═══════════════════════════════════════════════════════════════════
  {
    date: '2026-04-01',
    title: '月初现金盘点交接',
    tags: ['资金管理'],
    difficulty: 1,
    description: '月初出纳对库存现金进行盘点交接。上月末现金账面余额16,800元，经盘点实存16,800元，账实相符，交接手续完毕。',
    tip: '出纳每月月初应进行现金盘点交接，确保账实相符，明确责任。',
    role: 'cashier',
    entries: [],
    documents: [
      { type: 'text', label: '现金盘点交接表', docTitle: '库存现金盘点交接表', content: '账面余额16,800元，实盘16,800元，账实相符。移交人：刘出纳 接收人：李出纳 监盘人：赵会计', signature: '刘出纳 李出纳 赵会计' }]},

  // ═══════════════════════════════════════════════════════════════════
  // 中标新项目（4月2日~3日）
  // ═══════════════════════════════════════════════════════════════════
  {
    date: '2026-04-02',
    title: '退还投标保证金',
    tags: ['资金管理', '往来管理'],
    difficulty: 1,
    description: '公司参与市政道路工程投标时缴纳投标保证金50,000元，现中标结果公布后退还至公司账户。出纳查收银行回单。',
    tip: '投标保证金退回，借记"银行存款"，贷记"其他应收款"。此前缴纳时已借记其他应收款。',
    entries: [
      { subjectCode: '100201', debit: 50000, credit: 0, summary: '收到退还投标保证金', explanation: '投标保证金退回工商银行账户，银行存款增加50,000元。' , cashFlowItem: 'cf-op5', cashFlowExplanation: '其他经营活动现金流入（配对科目1221），属于"收到其他与经营活动有关的现金"。'},
      { subjectCode: '1221', debit: 0, credit: 50000, summary: '冲销其他应收款-投标保证金', explanation: '其他应收款减少50,000元，反映投标保证金的收回。' }],
    documents: [
      { type: 'bank', label: '银行回单', date: '2026-04-02', totalAmount: 50000, payer: '市政工程交易中心', payeeName: '鼎立建筑工程有限公司', content: '退还投标保证金', refNo: 'BZ202604020001' }]},
  {
    date: '2026-04-02',
    title: '中标市政道路工程并签订合同',
    tags: ['工程合同', '资金管理'],
    difficulty: 2,
    role: 'accountant',
    description: '公司与"市政建设集团"签订市政道路建设工程施工合同，合同总价800万元（不含税），增值税9%。按合同约定收到预付工程款240万元（30%），已存入建设银行账户。',
    tip: '签订合同收到预付款，借记"银行存款"，贷记"合同负债"。合同负债核算已收款但尚未履约的义务。建筑企业收到预收款时需预缴增值税。',
    entries: [
      { subjectCode: '100202', debit: 2400000, credit: 0, summary: '收到市政工程预付款（800万×30%）', explanation: '按合同约定收到30%预付款2,400,000元，存入建设银行。' , cashFlowItem: 'cf-op5', cashFlowExplanation: '其他经营活动现金流入（配对科目2205），属于"收到其他与经营活动有关的现金"。'},
      { subjectCode: '2205', debit: 0, credit: 2400000, summary: '合同负债-市政建设集团', explanation: '合同负债是新收入准则下预收工程款的核算科目。待工程进度确认后转入主营业务收入。' }],
    documents: [
      { type: 'bank', label: '银行回单', date: '2026-04-02', totalAmount: 2400000, payer: '市政建设集团', payeeName: '鼎立建筑工程有限公司', content: '市政道路工程预付款', refNo: 'HD202604020002' },
      { type: 'text', label: '施工合同', docTitle: '建设工程施工合同', content: '工程名称：市政道路工程。合同总价8,000,000元（不含税），增值税9%。开工日期：2026年4月。', signature: '鼎立建筑 市政建设集团' }]},

  // ═══════════════════════════════════════════════════════════════════
  // 税费预缴与材料采购（4月4日~7日）
  // ═══════════════════════════════════════════════════════════════════
  {
    date: '2026-04-04',
    title: '预缴市政工程增值税及附加税费',
    tags: ['税费'],
    difficulty: 2,
    role: 'accountant',
    description: '收到市政道路工程预收款2,400,000元后，按规定预缴增值税。建筑服务预收款按2%预征率计算，应预缴增值税48,000元。城建税7%+教育费附加3%+地方教育附加2%，合计5,760元。',
    tip: '一般纳税人建筑企业收到预收款时，按2%预征率预缴增值税。预缴的增值税在申报时从应纳税额中抵减。附加税费随增值税同时缴纳。',
    entries: [
      { subjectCode: '222101', debit: 48000, credit: 0, summary: '预缴增值税（240万×2%）', explanation: '建筑服务预收款按2%预征率预缴增值税，待申报时抵减应纳税额。' },
      { subjectCode: '222103', debit: 3360, credit: 0, summary: '城建税（48,000×7%）', explanation: '城建税按增值税额的7%计算缴纳。' },
      { subjectCode: '222104', debit: 2400, credit: 0, summary: '教育费附加3%+地方教育附加2%', explanation: '教育费附加3%（1,440元），地方教育附加2%（960元），合计2,400元。' },
      { subjectCode: '100202', debit: 0, credit: 53760, summary: '缴纳税费', explanation: '建设银行存款减少，支付增值税及附加税费共计53,760元。' , cashFlowItem: 'cf-op4', cashFlowExplanation: '缴纳税费支出（配对科目222101），属于"支付的各项税费"——经营活动现金流出。'}],
    documents: [
      { type: 'receipt', label: '电子缴税凭证', date: '2026-04-04', items: [{ label: '增值税（预征2%）', amount: 48000 }, { label: '城建税7%', amount: 3360 }, { label: '教育费附加3%', amount: 1440 }, { label: '地方教育附加2%', amount: 960 }], totalAmount: 53760, stampText: '国家税务总局电子缴税专用章' }]},
  {
    date: '2026-04-05',
    title: '采购市政道路工程材料',
    tags: ['材料管理', '工程成本'],
    difficulty: 2,
    role: 'accountant',
    description: '为市政道路工程购入沥青、碎石等专用材料，价款250,000元（不含税），增值税13%，材料已验收入库，款项未付。供应商为通达建材有限公司。',
    tip: '建筑业采购材料直接记入"合同履约成本-材料成本"，取得的增值税专用发票进项税额可抵扣。材料验收后计入工程成本。',
    entries: [
      { subjectCode: '540102', debit: 250000, credit: 0, summary: '购入沥青、碎石等市政道路材料', explanation: '市政工程材料成本直接记入合同履约成本-材料成本，按具体工程项目归集。' },
      { subjectCode: '222101', debit: 32500, credit: 0, summary: '增值税进项税额（25万×13%）', explanation: '取得增值税专用发票，进项税额32,500元可抵扣销项税额。' },
      { subjectCode: '220201', debit: 0, credit: 282500, summary: '应付账款-通达建材', explanation: '款项未付，形成对供应商的负债282,500元。' }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', date: '2026-04-05', region: '江苏省', invoiceNo: '3200260405', buyer: '鼎立建筑工程有限公司', seller: '通达建材有限公司', lineItems: [{ name: '沥青', qty: 50, unit: '吨', price: 3500, amount: 175000 }, { name: '碎石', qty: 300, unit: '吨', price: 250, amount: 75000 }], totalAmount: 282500 }]},
  {
    date: '2026-04-06',
    title: '提取备用金',
    tags: ['资金管理'],
    difficulty: 1,
    description: '出纳从工商银行提取备用金15,000元，用于日常零星开支。',
    tip: '提取备用金，借记"库存现金"，贷记"银行存款"。备用金用于日常小额支出。',
    entries: [
      { subjectCode: '1001', debit: 15000, credit: 0, summary: '提取备用金', explanation: '库存现金增加15,000元，用于日常零星开支。' },
      { subjectCode: '100201', debit: 0, credit: 15000, summary: '提取备用金', explanation: '银行存款减少15,000元。' }],
    documents: [
      { type: 'bank', label: '现金支票存根', date: '2026-04-06', totalAmount: 15000, payer: '鼎立建筑工程有限公司', payeeName: '鼎立建筑工程有限公司', content: '备用金', refNo: 'XJ0456789012' }]},
  {
    date: '2026-04-07',
    title: '支付材料采购款',
    tags: ['材料管理', '资金管理', '往来管理'],
    difficulty: 1,
    description: '出纳通过网银支付通达建材公司材料采购款282,500元。',
    tip: '支付应付账款，借记"应付账款"，贷记"银行存款"。出纳完成付款操作。',
    entries: [
      { subjectCode: '220201', debit: 282500, credit: 0, summary: '支付通达建材材料款', explanation: '应付账款减少282,500元，清偿对供应商的债务。' },
      { subjectCode: '100202', debit: 0, credit: 282500, summary: '支付材料款', explanation: '建设银行存款减少282,500元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目220201），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '网银转账回单', date: '2026-04-07', totalAmount: 282500, payer: '鼎立建筑工程有限公司', payeeName: '通达建材有限公司', content: '材料采购款', refNo: 'ZF202604070001' }]},

  // ═══════════════════════════════════════════════════════════════════
  // 设备调配与机械租赁（4月8日~10日）
  // ═══════════════════════════════════════════════════════════════════
  {
    date: '2026-04-08',
    title: '设备跨项目调配',
    tags: ['机械使用', '工程成本'],
    difficulty: 2,
    role: 'accountant',
    description: '为协调两项目资源，将办公楼项目的一台挖掘机调配至市政道路工程使用。该挖掘机月折旧额20,000元，自本月起折旧费改由市政道路项目承担。进行内部成本重新分配。',
    tip: '同一企业的设备跨项目调配属于内部资源再分配。通过分录将机械使用费从原项目成本调整至新项目成本，不涉及现金流动。',
    entries: [
      { subjectCode: '540104', debit: 20000, credit: 0, summary: '挖掘机折旧（市政道路项目）', explanation: '挖掘机调配至市政道路项目后，其折旧费由市政项目承担，计入合同履约成本-机械使用费。' },
      { subjectCode: '540104', debit: 0, credit: 20000, summary: '挖掘机折旧转出（办公楼项目）', explanation: '将原本归集到办公楼项目的挖掘机折旧成本内部调整至市政道路项目，体现资源重新配置。' }],
    documents: [
      { type: 'text', label: '设备调拨单', docTitle: '固定资产内部调拨单', content: '挖掘机（编号JX-001）由办公楼项目部调至市政道路项目部，自4月起折旧费由市政项目承担。', signature: '工程部 赵会计' }]},
  {
    date: '2026-04-09',
    title: '租赁压路机及摊铺机',
    tags: ['机械使用', '工程成本'],
    difficulty: 2,
    role: 'accountant',
    description: '为市政道路工程从宏远租赁公司租赁压路机和沥青摊铺机各一台，本月租金55,000元（含税），已取得增值税普通发票（无法抵扣进项），款项未付。',
    tip: '施工机械租赁费直接记入"合同履约成本-机械使用费"。若取得增值税专用发票可抵扣进项，普通发票则全额计入成本。',
    entries: [
      { subjectCode: '540104', debit: 55000, credit: 0, summary: '压路机、摊铺机本月租金', explanation: '机械使用费是合同履约成本的直接费用，55,000元全部计入市政道路工程成本（普通发票不可抵扣）。' },
      { subjectCode: '220201', debit: 0, credit: 55000, summary: '应付账款-宏远租赁', explanation: '款项未付，形成对租赁公司的负债55,000元。' }],
    documents: [
      { type: 'invoice', label: '增值税普通发票', date: '2026-04-09', region: '江苏省', invoiceNo: '3200260409', buyer: '鼎立建筑工程有限公司', seller: '宏远租赁有限公司', lineItems: [{ name: '压路机租赁费', qty: 1, unit: '月', price: 30000, amount: 30000 }, { name: '沥青摊铺机租赁费', qty: 1, unit: '月', price: 25000, amount: 25000 }], totalAmount: 55000 }]},
  {
    date: '2026-04-10',
    title: '支付机械租赁费',
    tags: ['机械使用', '资金管理'],
    difficulty: 1,
    description: '出纳通过网银支付宏远租赁公司机械租赁费55,000元。',
    tip: '支付租赁费，借记"应付账款"，贷记"银行存款"。',
    entries: [
      { subjectCode: '220201', debit: 55000, credit: 0, summary: '支付宏远租赁租赁费', explanation: '应付账款减少55,000元，清偿对租赁公司的债务。' },
      { subjectCode: '100202', debit: 0, credit: 55000, summary: '支付租赁费', explanation: '建设银行存款减少55,000元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目220201），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '网银转账回单', date: '2026-04-10', totalAmount: 55000, payer: '鼎立建筑工程有限公司', payeeName: '宏远租赁有限公司', content: '机械租赁费', refNo: 'ZF202604100001' }]},

  // ═══════════════════════════════════════════════════════════════════
  // 分包工程（4月10日~12日）
  // ═══════════════════════════════════════════════════════════════════
  {
    date: '2026-04-10',
    title: '分包市政道路工程土方工程',
    tags: ['分包管理', '工程成本'],
    difficulty: 2,
    role: 'accountant',
    description: '将市政道路工程的土方开挖部分分包给大地基础工程有限公司，分包合同价款150,000元（不含税），增值税9%。按合同约定预付30%即45,000元，已通过建设银行转账支付。',
    tip: '分包工程是建筑业常见模式。预付分包款借记"预付账款"，贷记"银行存款"。待完工结算后转入合同履约成本-分包成本。',
    entries: [
      { subjectCode: '1123', debit: 45000, credit: 0, summary: '预付分包工程款（15万×30%）', explanation: '预付账款增加45,000元，待分包工程完工结算后转入工程成本。' },
      { subjectCode: '100202', debit: 0, credit: 45000, summary: '支付预付分包款', explanation: '建设银行存款减少45,000元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目1123），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '银行回单', date: '2026-04-10', totalAmount: 45000, payer: '鼎立建筑工程有限公司', payeeName: '大地基础工程有限公司', content: '预付土方分包工程款', refNo: 'ZF202604100002' }]},
  {
    date: '2026-04-11',
    title: '预付办公楼项目分包款',
    tags: ['分包管理', '工程成本'],
    difficulty: 2,
    description: '办公楼项目墙体工程分包给大地基础工程有限公司，本月完成工程量确认后支付分包工程结算款70,000元（含税）。',
    tip: '收到分包工程发票并支付款项，全额计入合同履约成本-分包成本（简易计税分包可全额计入成本）。',
    entries: [
      { subjectCode: '540103', debit: 70000, credit: 0, summary: '办公楼墙体工程分包费', explanation: '分包成本是合同履约成本的重要组成部分，70,000元计入办公楼项目成本。' },
      { subjectCode: '100201', debit: 0, credit: 70000, summary: '支付分包工程款', explanation: '工商银行存款减少70,000元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目540103），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'invoice', label: '增值税普通发票', date: '2026-04-11', region: '江苏省', invoiceNo: '3200260411', buyer: '鼎立建筑工程有限公司', seller: '大地基础工程有限公司', lineItems: [{ name: '墙体工程分包款', qty: 1, unit: '项', price: 70000, amount: 70000 }], totalAmount: 70000 }]},
  {
    date: '2026-04-12',
    title: '摊销本月预付租金',
    tags: ['资金管理'],
    difficulty: 2,
    role: 'accountant',
    description: '本月摊销预付办公用房租金20,000元（第一季度预付60,000元已摊销完毕，现摊销第二季度预付租金），计入管理费用。',
    tip: '预付租金分期摊销，办公用房租金计入管理费用。按租期均匀摊销。',
    entries: [
      { subjectCode: '660201', debit: 20000, credit: 0, summary: '摊销办公用房租金', explanation: '办公用房租金摊销计入管理费用，本月应摊销20,000元。' },
      { subjectCode: '1123', debit: 0, credit: 20000, summary: '冲减预付账款', explanation: '预付账款减少20,000元，反映预付费用的分期摊销。' }],
    documents: [
      { type: 'text', label: '摊销计算表', docTitle: '预付费用摊销计算表', content: '第二季度办公用房租金60,000÷3=20,000元/月。本月摊销20,000元。', signature: '赵会计' }]},

  // ═══════════════════════════════════════════════════════════════════
  // 双项目进度确认与收款（4月14日~15日）
  // ═══════════════════════════════════════════════════════════════════
  {
    date: '2026-04-14',
    title: '办公楼项目进度确认并开票',
    tags: ['工程合同', '往来管理'],
    difficulty: 2,
    role: 'accountant',
    description: '办公楼工程本月完成至累计40%（此前完成30%），本期完成10%。按合同约定开具增值税专用发票，含税金额545,000元（500,000元+增值税45,000元）。前期预收款已确认完毕，本期作为应收账款处理，款项暂未收到。',
    tip: '预收款用完后再确认收入，不再冲减合同负债，而是形成应收账款。收入确认金额为不含税金额，增值税另列。不含税收入=含税收入÷(1+9%)。',
    entries: [
      { subjectCode: '112201', debit: 545000, credit: 0, summary: '应收账款-恒达地产（办公楼进度款含税）', explanation: '办公楼项目预收款已于上月用完，本期开具发票形成应收账款545,000元（含增值税）。' },
      { subjectCode: '6001', debit: 0, credit: 500000, summary: '确认主营业务收入（不含税）', explanation: '本期完成10%，不含税收入500,000元=含税545,000元÷(1+9%)，价税分离核算。' },
      { subjectCode: '222101', debit: 0, credit: 45000, summary: '增值税销项税额（50万×9%）', explanation: '开具增值税专用发票，确认增值税纳税义务，应交增值税-销项税额45,000元。' }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', date: '2026-04-14', region: '江苏省', invoiceNo: '3200260414', buyer: '恒达地产有限公司', seller: '鼎立建筑工程有限公司', lineItems: [{ name: '办公楼建设工程进度款', qty: 1, unit: '项', price: 500000, amount: 500000 }], totalAmount: 545000 },
      { type: 'text', label: '工程进度确认单', docTitle: '工程完工进度确认单', content: '办公楼工程累计完成40%，本期完成10%，经监理验收合格。', signature: '李监理 恒达地产 鼎立建筑' }]},
  {
    date: '2026-04-15',
    title: '收到办公楼工程进度款',
    tags: ['资金管理', '往来管理'],
    difficulty: 1,
    description: '收到恒达地产支付的办公楼工程进度款545,000元，存入工商银行账户。',
    tip: '收到应收账款，借记"银行存款"，贷记"应收账款"。',
    entries: [
      { subjectCode: '100201', debit: 545000, credit: 0, summary: '收到办公楼进度款', explanation: '工商银行存款增加545,000元。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目112201），属于经营活动现金流入——主营业务产生的现金收入。'},
      { subjectCode: '112201', debit: 0, credit: 545000, summary: '冲销应收账款', explanation: '应收账款减少545,000元，反映款项收回。' }],
    documents: [
      { type: 'bank', label: '银行回单', date: '2026-04-15', totalAmount: 545000, payer: '恒达地产有限公司', payeeName: '鼎立建筑工程有限公司', content: '办公楼工程进度款', refNo: 'SK202604150001' }]},

  // ═══════════════════════════════════════════════════════════════════
  // 职工薪酬（4月15日~17日）
  // ═══════════════════════════════════════════════════════════════════
  {
    date: '2026-04-15',
    title: '计提本月职工薪酬',
    tags: ['工程成本', '工资社保'],
    difficulty: 2,
    role: 'accountant',
    description: '本月应发职工薪酬：办公楼施工人员50,000元，市政道路施工人员40,000元，项目管理人员35,000元（含两项目），公司管理人员25,000元。合计150,000元。',
    tip: '直接施工人员工资按项目分别记入"合同履约成本-人工成本"，项目部管理人员工资记入"合同履约成本-间接费用"，公司管理人员工资记入"管理费用"。注意按项目区分成本归属。',
    entries: [
      { subjectCode: '540101', debit: 50000, credit: 0, summary: '办公楼项目施工人员工资', explanation: '办公楼直接人工50,000元计入合同履约成本-人工成本。' },
      { subjectCode: '540101', debit: 40000, credit: 0, summary: '市政项目施工人员工资', explanation: '市政道路直接人工40,000元计入合同履约成本-人工成本，按项目归集。' },
      { subjectCode: '540106', debit: 35000, credit: 0, summary: '项目部管理人员工资', explanation: '项目部管理人员工资属于间接费用35,000元，计入合同履约成本-间接费用。' },
      { subjectCode: '660201', debit: 25000, credit: 0, summary: '公司管理人员工资', explanation: '公司行政管理人员工资25,000元计入管理费用。' },
      { subjectCode: '221101', debit: 0, credit: 150000, summary: '应付职工薪酬-工资', explanation: '应付职工薪酬增加150,000元，形成对职工的负债。' }],
    documents: [
      { type: 'text', label: '工资表', docTitle: '2026年4月职工工资表', content: '办公楼施工人员50,000元；市政施工人员40,000元；项目管理人员35,000元；公司管理人员25,000元。合计150,000元。', signature: '王人事' }]},
  {
    date: '2026-04-16',
    title: '发放职工工资',
    tags: ['资金管理', '工资社保'],
    difficulty: 1,
    description: '出纳通过工商银行代发本月职工工资150,000元。',
    tip: '发放工资时，借记"应付职工薪酬"，贷记"银行存款"。',
    entries: [
      { subjectCode: '221101', debit: 150000, credit: 0, summary: '发放4月工资', explanation: '应付职工薪酬减少150,000元，清偿对职工的工资负债。' },
      { subjectCode: '100201', debit: 0, credit: 150000, summary: '银行代发工资', explanation: '工商银行存款减少150,000元。' , cashFlowItem: 'cf-op3', cashFlowExplanation: '支付职工薪酬相关支出（配对科目221101），属于"支付给职工以及为职工支付的现金"——经营活动现金流出。'}],
    documents: [
      { type: 'bank', label: '银行代发工资回单', date: '2026-04-16', totalAmount: 150000, payer: '鼎立建筑工程有限公司', payeeName: '公司全体员工', content: '4月份工资发放', refNo: 'GZ202604160001' }]},
  {
    date: '2026-04-17',
    title: '缴纳社保及公积金',
    tags: ['资金管理', '工资社保'],
    difficulty: 1,
    description: '缴纳本月社会保险费及住房公积金。公司承担部分：社保30,000元、公积金15,000元；个人承担部分从工资中代扣：社保10,500元、公积金15,000元。合计70,500元。',
    tip: '缴纳社保公积金时，借记"应付职工薪酬-社保"（公司+个人），贷记"银行存款"。公司部分已先期计入各成本科目。',
    entries: [
      { subjectCode: '221102', debit: 40500, credit: 0, summary: '缴纳社保费（公司30,000+个人10,500）', explanation: '社保费40,500元（公司30,000元+个人代扣10,500元），减少应付职工薪酬。' },
      { subjectCode: '221103', debit: 30000, credit: 0, summary: '缴纳公积金（公司15,000+个人15,000）', explanation: '公积金30,000元（公司15,000元+个人代扣15,000元），减少应付职工薪酬。' },
      { subjectCode: '100201', debit: 0, credit: 70500, summary: '支付社保及公积金', explanation: '工商银行存款减少70,500元。' , cashFlowItem: 'cf-op3', cashFlowExplanation: '支付职工薪酬相关支出（配对科目221102），属于"支付给职工以及为职工支付的现金"——经营活动现金流出。'}],
    documents: [
      { type: 'bank', label: '银行回单', date: '2026-04-17', totalAmount: 70500, payer: '鼎立建筑工程有限公司', payeeName: '社保局/公积金管理中心', content: '4月社保及公积金', refNo: 'SB202604170001' }]},

  // ═══════════════════════════════════════════════════════════════════
  // 日常费用报销（4月18日~20日）
  // ═══════════════════════════════════════════════════════════════════
  {
    date: '2026-04-18',
    title: '报销项目管理人员差旅费',
    tags: ['工程成本'],
    difficulty: 1,
    role: 'accountant',
    description: '两项目管理人员出差报销差旅费共4,500元。其中：办公楼项目经理报销2,000元，市政项目经理报销2,500元。已用备用金现金支付。',
    tip: '项目管理人员差旅费记入"合同履约成本-其他直接费用"。注意按项目分别归集成本。',
    entries: [
      { subjectCode: '540105', debit: 2000, credit: 0, summary: '办公楼项目差旅费', explanation: '办公楼项目管理人员出差费用2,000元计入合同履约成本-其他直接费用。' },
      { subjectCode: '540105', debit: 2500, credit: 0, summary: '市政项目差旅费', explanation: '市政道路项目管理人员出差费用2,500元计入合同履约成本-其他直接费用。' },
      { subjectCode: '1001', debit: 0, credit: 4500, summary: '现金支付差旅费', explanation: '库存现金减少4,500元，从备用金中支出。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目540105），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '差旅费报销单', date: '2026-04-18', items: [{ label: '办公楼项目差旅费', amount: 2000 }, { label: '市政项目差旅费', amount: 2500 }], totalAmount: 4500, stampText: '鼎立建筑工程有限公司财务专用章' }]},
  {
    date: '2026-04-19',
    title: '支付办公费及水电费',
    tags: ['资金管理'],
    difficulty: 1,
    description: '支付本月公司办公费5,000元及两项目部水电费6,000元（办公楼项目3,500元，市政项目2,500元），合计11,000元，已转账支付。',
    tip: '办公费计入管理费用，各项目水电费计入合同履约成本-间接费用，按项目分别归集。',
    entries: [
      { subjectCode: '660201', debit: 5000, credit: 0, summary: '公司办公费用', explanation: '行政管理部门办公费5,000元计入管理费用。' },
      { subjectCode: '540106', debit: 3500, credit: 0, summary: '办公楼项目水电费', explanation: '办公楼项目部水电费3,500元计入间接费用。' },
      { subjectCode: '540106', debit: 2500, credit: 0, summary: '市政项目水电费', explanation: '市政道路项目部水电费2,500元计入间接费用。' },
      { subjectCode: '100201', debit: 0, credit: 11000, summary: '支付办公费及水电费', explanation: '工商银行存款减少11,000元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目660201），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '缴费凭证', date: '2026-04-19', items: [{ label: '办公费', amount: 5000 }, { label: '办公楼水电费', amount: 3500 }, { label: '市政水电费', amount: 2500 }], totalAmount: 11000, stampText: '收款单位财务专用章' }]},
  {
    date: '2026-04-20',
    title: '采购办公楼项目专用材料',
    tags: ['材料管理', '工程成本'],
    difficulty: 2,
    role: 'accountant',
    description: '为办公楼项目采购装饰装修材料，价款150,000元（不含税），增值税13%，材料已验收入库，款项未付。供应商为华强建材有限公司。',
    tip: '材料成本按受益对象分别归集，办公楼项目材料计入对应项目的合同履约成本-材料成本。',
    entries: [
      { subjectCode: '540102', debit: 150000, credit: 0, summary: '购入办公楼装饰材料', explanation: '办公楼工程材料成本150,000元计入合同履约成本-材料成本，按办公楼项目归集。' },
      { subjectCode: '222101', debit: 19500, credit: 0, summary: '增值税进项税额（15万×13%）', explanation: '取得增值税专用发票，进项税额19,500元可抵扣销项税额。' },
      { subjectCode: '220201', debit: 0, credit: 169500, summary: '应付账款-华强建材', explanation: '款项未付，形成对供应商的负债169,500元。' }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', date: '2026-04-20', region: '江苏省', invoiceNo: '3200260420', buyer: '鼎立建筑工程有限公司', seller: '华强建材有限公司', lineItems: [{ name: '瓷砖', qty: 2000, unit: '平方米', price: 50, amount: 100000 }, { name: '涂料', qty: 100, unit: '桶', price: 500, amount: 50000 }], totalAmount: 169500 }]},
  {
    date: '2026-04-20',
    title: '支付办公楼材料款',
    tags: ['材料管理', '资金管理'],
    difficulty: 1,
    description: '出纳通过网银支付华强建材公司办公楼项目材料款169,500元。',
    tip: '支付应付账款，借记"应付账款"，贷记"银行存款"。注意区分各项目支出对应的银行账户。',
    entries: [
      { subjectCode: '220201', debit: 169500, credit: 0, summary: '支付华强建材材料款', explanation: '应付账款减少169,500元，清偿对供应商的债务。' },
      { subjectCode: '100201', debit: 0, credit: 169500, summary: '支付材料款', explanation: '工商银行存款减少169,500元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目220201），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '网银转账回单', date: '2026-04-20', totalAmount: 169500, payer: '鼎立建筑工程有限公司', payeeName: '华强建材有限公司', content: '材料采购款', refNo: 'ZF202604200001' }]},

  // ═══════════════════════════════════════════════════════════════════
  // 折旧与利息（4月21日~22日）
  // ═══════════════════════════════════════════════════════════════════
  {
    date: '2026-04-21',
    title: '计提本月固定资产折旧',
    tags: ['机械使用', '工程成本'],
    difficulty: 2,
    role: 'accountant',
    description: '本月应计提固定资产折旧：运输车辆折旧5,000元（用于双项目材料运输，各50%），施工机械折旧15,000元（办公楼项目挖掘机折旧已调出，剩余机械折旧计入办公楼），办公设备折旧2,000元。合计22,000元。',
    tip: '用于工程的固定资产折旧按项目使用情况分配计入合同履约成本-机械使用费，行政管理用折旧计入管理费用。多项目共享设备按合理比例分摊。',
    entries: [
      { subjectCode: '540104', debit: 2500, credit: 0, summary: '运输车辆折旧-办公楼项目（50%）', explanation: '运输车辆为双项目共用，50%折旧2,500元计入办公楼项目机械使用费。' },
      { subjectCode: '540104', debit: 2500, credit: 0, summary: '运输车辆折旧-市政项目（50%）', explanation: '运输车辆为双项目共用，50%折旧2,500元计入市政项目机械使用费。' },
      { subjectCode: '540104', debit: 15000, credit: 0, summary: '施工机械折旧-办公楼项目', explanation: '其他施工机械折旧15,000元计入办公楼项目机械使用费。' },
      { subjectCode: '660201', debit: 2000, credit: 0, summary: '办公设备折旧（管理用）', explanation: '办公设备用于行政管理，折旧费2,000元计入管理费用。' },
      { subjectCode: '1602', debit: 0, credit: 22000, summary: '计提累计折旧', explanation: '累计折旧增加22,000元，反映固定资产价值损耗。' }],
    documents: [
      { type: 'text', label: '折旧计算表', docTitle: '固定资产折旧计算表', content: '直线法折旧。运输车辆月折旧5,000元（双项目各50%）；施工机械月折旧15,000元；办公设备月折旧2,000元。合计22,000元。', signature: '赵会计' }]},
  {
    date: '2026-04-22',
    title: '支付短期借款利息',
    tags: ['资金管理'],
    difficulty: 1,
    description: '支付工商银行短期借款（本金400,000元，年利率4.35%）本月利息1,450元。',
    tip: '支付短期借款利息，借记"财务费用"，贷记"银行存款"。短期借款利息计入财务费用。',
    entries: [
      { subjectCode: '6603', debit: 1450, credit: 0, summary: '短期借款利息（40万×4.35%÷12）', explanation: '财务费用增加1,450元，反映借款的资金成本。' },
      { subjectCode: '100201', debit: 0, credit: 1450, summary: '支付利息', explanation: '工商银行存款减少1,450元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6603），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '银行扣息回单', date: '2026-04-22', totalAmount: 1450, payer: '鼎立建筑工程有限公司', payeeName: '工商银行', content: '短期借款利息', refNo: 'LX202604220001' }]},

  // ═══════════════════════════════════════════════════════════════════
  // 日常支付（4月23日~25日）
  // ═══════════════════════════════════════════════════════════════════
  {
    date: '2026-04-23',
    title: '报销办公用品及杂费',
    tags: ['资金管理'],
    difficulty: 1,
    description: '报销公司行政部门办公用品采购费3,000元，已用现金支付。',
    tip: '办公用品费计入管理费用。',
    entries: [
      { subjectCode: '660201', debit: 3000, credit: 0, summary: '办公用品费', explanation: '办公用品费3,000元计入管理费用。' },
      { subjectCode: '1001', debit: 0, credit: 3000, summary: '现金支付办公用品', explanation: '库存现金减少3,000元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目660201），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '办公用品发票', date: '2026-04-23', items: [{ label: '打印纸', amount: 500 }, { label: '墨盒', amount: 800 }, { label: '文具', amount: 1700 }], totalAmount: 3000, stampText: '收款单位财务专用章' }]},
  {
    date: '2026-04-24',
    title: '支付分包工程结算款',
    tags: ['分包管理', '资金管理', '往来管理'],
    difficulty: 1,
    description: '大地基础工程有限公司完成办公楼项目墙体分包工程，收到结算发票后支付剩余结算款80,000元。',
    tip: '支付分包工程结算款，借记"合同履约成本-分包成本"，贷记"银行存款"。注意分包成本按项目归集。',
    entries: [
      { subjectCode: '540103', debit: 80000, credit: 0, summary: '办公楼墙体工程分包结算', explanation: '分包成本80,000元计入办公楼项目合同履约成本-分包成本。' },
      { subjectCode: '100201', debit: 0, credit: 80000, summary: '支付分包结算款', explanation: '工商银行存款减少80,000元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目540103），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '网银转账回单', date: '2026-04-24', totalAmount: 80000, payer: '鼎立建筑工程有限公司', payeeName: '大地基础工程有限公司', content: '分包工程结算款', refNo: 'ZF202604240001' }]},
  {
    date: '2026-04-25',
    title: '市政项目机械使用费分摊',
    tags: ['机械使用', '工程成本'],
    difficulty: 2,
    role: 'accountant',
    description: '市政道路项目本月使用自有施工机械（压路机、摊铺机），按台班计算应分摊机械使用费25,000元，计入合同履约成本-机械使用费。',
    tip: '自有施工机械通过台班或工作量法将折旧和运维成本分配到各项目，计入合同履约成本-机械使用费。',
    entries: [
      { subjectCode: '540104', debit: 25000, credit: 0, summary: '市政项目机械使用费分摊', explanation: '市政道路项目自有机械使用费25,000元计入合同履约成本-机械使用费。' },
      { subjectCode: '1602', debit: 0, credit: 25000, summary: '累计折旧增加', explanation: '累计折旧增加25,000元，反映自有施工机械价值损耗。' }],
    documents: [
      { type: 'text', label: '机械台班计算表', docTitle: '施工机械台班计算表', content: '市政道路项目本月使用自有压路机300台班、摊铺机200台班，按台班单价50元/台班，合计25,000元。', signature: '设备部 赵会计' }]},
  {
    date: '2026-04-26',
    title: '购入办公设备',
    tags: ['资金管理'],
    difficulty: 1,
    role: 'accountant',
    description: '购入空调设备3台用于公司办公，价款12,000元（不含税），增值税1,560元，款项已通过工商银行转账支付。',
    tip: '购入固定资产，借记"固定资产"和"应交税费-进项税额"，贷记"银行存款"。空调属于办公设备。',
    entries: [
      { subjectCode: '160103', debit: 12000, credit: 0, summary: '购入空调设备', explanation: '固定资产-办公设备增加12,000元，按成本入账。' },
      { subjectCode: '222101', debit: 1560, credit: 0, summary: '增值税进项税额', explanation: '取得增值税专用发票，进项税额1,560元可抵扣。' },
      { subjectCode: '100201', debit: 0, credit: 13560, summary: '支付空调设备款', explanation: '工商银行存款减少13,560元。' , cashFlowItem: 'cf-inv', cashFlowExplanation: '购建固定资产/无形资产支出（配对科目160103），属于投资活动现金流出——资本性支出，区别于日常经营支出。'}],
    documents: [
      { type: 'invoice', label: '增值税专用发票', date: '2026-04-26', region: '江苏省', invoiceNo: '3200260426', buyer: '鼎立建筑工程有限公司', seller: '美菱电器有限公司', lineItems: [{ name: '空调', qty: 3, unit: '台', price: 4000, amount: 12000 }], totalAmount: 13560 }]},

  // ═══════════════════════════════════════════════════════════════════
  // 市政项目收入确认（4月27日）
  // ═══════════════════════════════════════════════════════════════════
  {
    date: '2026-04-27',
    title: '确认市政道路工程本月收入',
    tags: ['工程合同', '税费'],
    difficulty: 3,
    role: 'accountant',
    description: '市政道路工程本月完成5%进度。按完工百分比法确认工程收入400,000元（不含税），增值税销项税额36,000元。冲减合同负债（预收款），含税金额436,000元。',
    tip: '市政项目为首次确认收入，收到预收款时已记入合同负债。按进度确认收入时冲减合同负债：借记"合同负债"，贷记"主营业务收入"和"应交税费"。',
    entries: [
      { subjectCode: '2205', debit: 400000, credit: 0, summary: '合同负债冲减（市政项目预收款）', explanation: '冲减合同负债400,000元，对应5%进度的含税收入436,000元扣除增值税36,000元后的不含税金额对应部分。' },
      { subjectCode: '6001', debit: 0, credit: 364000, summary: '确认主营业务收入（不含税）', explanation: '确认市政道路工程收入364,000元（400,000元-36,000元增值税）。' },
      { subjectCode: '222101', debit: 0, credit: 36000, summary: '增值税销项税额（40万×9%）', explanation: '市政工程增值税销项税额36,000元。' }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', date: '2026-04-27', region: '江苏省', invoiceNo: '3200260427', buyer: '市政建设集团', seller: '鼎立建筑工程有限公司', lineItems: [{ name: '市政道路工程进度款', qty: 1, unit: '项', price: 400000, amount: 400000 }], totalAmount: 436000 },
      { type: 'text', label: '工程进度确认单', docTitle: '市政道路工程进度确认单', content: '市政道路工程本月完成5%，经监理验收合格。合同总收入8,000,000元（不含税），本期确认进度5%。', signature: '王监理 市政建设集团 鼎立建筑' }]},

  // ═══════════════════════════════════════════════════════════════════
  // 期末处理 - 成本与收入结转（4月28日）
  // ═══════════════════════════════════════════════════════════════════
  {
    date: '2026-04-28',
    title: '确认两项目工程总进度收入',
    tags: ['工程合同', '期末'],
    difficulty: 3,
    role: 'accountant',
    description: '月末按完工百分比法汇总确认本月两项目工程收入。办公楼项目完成10%确认含税收入545,000元，不含税收入500,000元；市政道路项目完成5%确认不含税收入364,000元。两项目合计确认主营业务收入864,000元。增值税销项税额81,000元已在开票时确认。',
    tip: '月末汇总确认本月所有项目收入，各项目独立核算。主营业务收入为不含税金额，增值税销项税额在开票时同步确认。',
    entries: [
      { subjectCode: '6001', debit: 500000, credit: 0, summary: '办公楼项目收入转入本年利润', explanation: '损益结转中，收入类科目余额转入本年利润。办公楼项目不含税收入500,000元。' },
      { subjectCode: '6001', debit: 364000, credit: 0, summary: '市政项目收入转入本年利润', explanation: '市政道路项目不含税收入364,000元准备结转。' },
      { subjectCode: '4103', debit: 0, credit: 864000, summary: '两项目收入合计转入本年利润', explanation: '本月主营业务收入合计864,000元转入本年利润。' }],
    documents: [
      { type: 'text', label: '收入汇总表', docTitle: '2026年4月工程收入汇总表', content: '办公楼项目确认不含税收入500,000元（累计40%）；市政道路项目确认不含税收入364,000元（累计5%）。合计864,000元。增值税销项税额合计81,000元。', signature: '赵会计' }]},
  {
    date: '2026-04-28',
    title: '结转合同履约成本-办公楼项目',
    tags: ['工程成本', '期末'],
    difficulty: 2,
    role: 'accountant',
    description: '月末将本月办公楼项目发生的合同履约成本结转至主营业务成本。本月办公楼项目成本合计：人工50,000元+材料270,000元（采购120,000+装饰150,000）+分包150,000元（墙体70,000+结算80,000）+机械70,000元（折旧17,500+设备2,500+其他50,000）+间接36,500元（管理工资17,500+水电3,500+其他15,500）+其他2,000=578,500元。按完工进度10%结转320,000元至主营业务成本。',
    tip: '月末按完工百分比法结转已完工部分对应的合同履约成本至主营业务成本。余额留在合同履约成本反映未完工项目成本。',
    entries: [
      { subjectCode: '6401', debit: 320000, credit: 0, summary: '结转办公楼项目主营业务成本', explanation: '按完工进度10%结转办公楼项目合同履约成本至主营业务成本。' },
      { subjectCode: '540101', debit: 0, credit: 50000, summary: '结转办公楼人工成本', explanation: '结转办公楼项目人工成本50,000元。' },
      { subjectCode: '540102', debit: 0, credit: 120000, summary: '结转办公楼材料成本', explanation: '结转办公楼项目材料成本120,000元（本期采购的一部分，按进度匹配）。' },
      { subjectCode: '540103', debit: 0, credit: 60000, summary: '结转办公楼分包成本', explanation: '结转办公楼项目分包成本60,000元（按进度匹配）。' },
      { subjectCode: '540104', debit: 0, credit: 17500, summary: '结转办公楼机械使用费', explanation: '结转办公楼项目机械使用费17,500元。' },
      { subjectCode: '540105', debit: 0, credit: 2000, summary: '结转办公楼其他直接费用', explanation: '结转办公楼项目其他直接费用2,000元（差旅费）。' },
      { subjectCode: '540106', debit: 0, credit: 70500, summary: '结转办公楼间接费用', explanation: '结转办公楼项目间接费用（管理人员工资17,500+水电3,500+其他分摊）合计70,500元，简化按比例结转。' }],
    documents: [
      { type: 'text', label: '成本结转计算表', docTitle: '办公楼项目合同履约成本结转计算表', content: '本月办公楼项目合同履约成本总额578,500元，按完工进度10%结转320,000元至主营业务成本。', signature: '赵会计' }]},
  {
    date: '2026-04-28',
    title: '结转合同履约成本-市政道路项目',
    tags: ['工程成本', '期末'],
    difficulty: 2,
    role: 'accountant',
    description: '月末将本月市政道路项目发生的合同履约成本结转至主营业务成本。本月市政项目成本合计：人工40,000元+材料250,000元+机械102,500元（租赁55,000+调配折旧20,000+运输车辆2,500+自有机械25,000）+分包45,000元（预付）+间接14,500元（管理工资17,500×50%+水电2,500+其他）=452,000元。按完工进度5%结转260,000元至主营业务成本。',
    tip: '市政项目为本月新开工项目，首次结转成本。按完工百分比法匹配成本与收入，剩余成本余额留在合同履约成本科目。',
    entries: [
      { subjectCode: '6401', debit: 260000, credit: 0, summary: '结转市政项目主营业务成本', explanation: '按完工进度5%结转市政道路项目合同履约成本至主营业务成本。' },
      { subjectCode: '540101', debit: 0, credit: 40000, summary: '结转市政人工成本', explanation: '结转市政项目人工成本40,000元。' },
      { subjectCode: '540102', debit: 0, credit: 100000, summary: '结转市政材料成本', explanation: '结转市政项目材料成本100,000元（按进度匹配）。' },
      { subjectCode: '540103', debit: 0, credit: 45000, summary: '结转市政分包成本', explanation: '结转市政项目预付分包成本45,000元。' },
      { subjectCode: '540104', debit: 0, credit: 40000, summary: '结转市政机械使用费', explanation: '结转市政项目机械使用费40,000元（含租赁费的分摊部分）。' },
      { subjectCode: '540106', debit: 0, credit: 35000, summary: '结转市政间接费用', explanation: '结转市政项目间接费用（管理工资分摊+水电）35,000元。' }],
    documents: [
      { type: 'text', label: '成本结转计算表', docTitle: '市政道路项目合同履约成本结转计算表', content: '本月市政项目合同履约成本总额452,000元，按完工进度5%结转260,000元至主营业务成本。', signature: '赵会计' }]},

  // ═══════════════════════════════════════════════════════════════════
  // 期末处理 - 税金及损益结转（4月29日）
  // ═══════════════════════════════════════════════════════════════════
  {
    date: '2026-04-29',
    title: '计提税金及附加',
    tags: ['税费', '期末'],
    difficulty: 2,
    role: 'accountant',
    description: '月末计提本月税金及附加。本月增值税销项税额81,000元（办公楼45,000+市政36,000），进项税额53,560元（材料32,500+19,500+办公设备1,560），预缴增值税48,000元。应纳增值税=81,000-53,560-48,000=-20,560元（留抵），因此本月无需缴纳城建税和教育费附加。但按权责发生制，按本期销项对应计提附加税费：附加税费基数81,000元，计提城建税5,670元、教育费附加2,430元、地方教育附加1,620元，合计9,720元。',
    tip: '城建税=增值税×7%，教育费附加=增值税×3%，地方教育附加=增值税×2%。即使有留抵税额，按权责发生制原则仍应按本期销项税额计提附加税费，待实际缴纳时冲减。',
    entries: [
      { subjectCode: '6403', debit: 9720, credit: 0, summary: '计提本月税金及附加', explanation: '税金及附加9,720元，按增值税销项税额81,000元为基数计算（81,000×12%）。' },
      { subjectCode: '222103', debit: 0, credit: 5670, summary: '应交城建税（81,000×7%）', explanation: '城建税按增值税额的7%计算为5,670元。' },
      { subjectCode: '222104', debit: 0, credit: 4050, summary: '教育费附加3%+地方教育附加2%', explanation: '教育费附加3%（2,430元），地方教育附加2%（1,620元），合计4,050元。' }],
    documents: [
      { type: 'text', label: '税费计算表', docTitle: '税金及附加计算表', content: '增值税销项税额81,000元。城建税81,000×7%=5,670元；教育费附加81,000×3%=2,430元；地方教育附加81,000×2%=1,620元。合计9,720元。', signature: '赵会计' }]},
  {
    date: '2026-04-29',
    title: '结转本月损益类科目',
    tags: ['期末'],
    difficulty: 2,
    role: 'accountant',
    description: '月末结转损益类科目到本年利润。本月收入：主营业务收入864,000元；费用：主营业务成本580,000元（320,000+260,000）、管理费用55,000元（租金20,000+管理工资25,000+办公折旧2,000+办公费5,000+办公用品3,000）、税金及附加9,720元、财务费用1,450元。费用合计646,170元。利润总额=864,000-646,170=217,830元。',
    tip: '月末将各损益类科目余额转入本年利润。收入类余额转借方，费用类余额转贷方。差额即为利润总额。',
    entries: [
      { subjectCode: '6001', debit: 864000, credit: 0, summary: '结转主营业务收入', explanation: '收入类科目余额864,000元转入本年利润。' },
      { subjectCode: '4103', debit: 0, credit: 864000, summary: '收入转入本年利润', explanation: '本年利润增加864,000元。' },
      { subjectCode: '4103', debit: 646170, credit: 0, summary: '费用转入本年利润', explanation: '费用合计646,170元转入本年利润借方。' },
      { subjectCode: '6401', debit: 0, credit: 580000, summary: '结转主营业务成本', explanation: '主营业务成本580,000元结转至本年利润。' },
      { subjectCode: '660201', debit: 0, credit: 55000, summary: '结转管理费用', explanation: '管理费用55,000元结转至本年利润。' },
      { subjectCode: '6403', debit: 0, credit: 9720, summary: '结转税金及附加', explanation: '税金及附加9,720元结转至本年利润。' },
      { subjectCode: '6603', debit: 0, credit: 1450, summary: '结转财务费用', explanation: '财务费用1,450元结转至本年利润。' }],
    documents: [
      { type: 'text', label: '损益结转计算表', docTitle: '2026年4月损益结转计算表', content: '收入864,000元；费用646,170元（主营业务成本580,000+管理费用55,000+税金及附加9,720+财务费用1,450）。利润总额=864,000-646,170=217,830元。', signature: '赵会计' }]},

  // ═══════════════════════════════════════════════════════════════════
  // 期末处理 - 所得税与利润分配（4月30日）
  // ═══════════════════════════════════════════════════════════════════
  {
    date: '2026-04-30',
    title: '计提并结转所得税费用',
    tags: ['税费', '期末'],
    difficulty: 2,
    role: 'accountant',
    description: '本月利润总额217,830元，按25%计提企业所得税54,457.50元。再将所得税费用结转至本年利润。净利润=217,830-54,457.50=163,372.50元。',
    tip: '计提所得税：借"所得税费用"贷"应交税费-应交所得税"。结转所得税：借"本年利润"贷"所得税费用"。',
    entries: [
      { subjectCode: '6801', debit: 54457.50, credit: 0, summary: '计提本月所得税（217,830×25%）', explanation: '所得税费用增加54,457.50元。' },
      { subjectCode: '222102', debit: 0, credit: 54457.50, summary: '应交企业所得税', explanation: '应交税费-应交所得税增加54,457.50元。' },
      { subjectCode: '4103', debit: 54457.50, credit: 0, summary: '所得税费用转入本年利润', explanation: '所得税费用54,457.50元结转至本年利润。' },
      { subjectCode: '6801', debit: 0, credit: 54457.50, summary: '结转所得税费用', explanation: '所得税费用科目余额结平。' }],
    documents: [
      { type: 'text', label: '所得税计算表', docTitle: '企业所得税计算表', content: '利润总额217,830元，所得税率25%，所得税54,457.50元，净利润163,372.50元。', signature: '赵会计' }]},
  {
    date: '2026-04-30',
    title: '结转净利润至未分配利润',
    tags: ['期末'],
    difficulty: 2,
    role: 'accountant',
    description: '将本月净利润163,372.50元从本年利润结转至利润分配-未分配利润。',
    tip: '月末将净利润结转至利润分配。借记"本年利润"，贷记"利润分配-未分配利润"。',
    entries: [
      { subjectCode: '4103', debit: 163372.50, credit: 0, summary: '本年利润转出', explanation: '本年利润减少163,372.50元，净利润转出。' },
      { subjectCode: '410401', debit: 0, credit: 163372.50, summary: '未分配利润增加', explanation: '未分配利润增加163,372.50元，所有者权益增加。' }],
    documents: [
      { type: 'text', label: '利润分配计算表', docTitle: '净利润结转计算表', content: '本月净利润163,372.50元结转至未分配利润。', signature: '赵会计' }]},
  {
    date: '2026-04-30',
    title: '提取盈余公积',
    tags: ['期末'],
    difficulty: 2,
    role: 'accountant',
    description: '按净利润163,372.50元的10%提取法定盈余公积16,337.25元，剩余147,035.25元留待以后年度分配。',
    tip: '提取盈余公积：借记"利润分配-提取盈余公积"，贷记"盈余公积"。盈余公积是留存收益的一部分。',
    entries: [
      { subjectCode: '410402', debit: 16337.25, credit: 0, summary: '提取法定盈余公积（163,372.50×10%）', explanation: '按净利润10%提取法定盈余公积16,337.25元。' },
      { subjectCode: '4101', debit: 0, credit: 16337.25, summary: '盈余公积增加', explanation: '盈余公积增加16,337.25元，所有者权益内部结构调整。' },
      { subjectCode: '410401', debit: 16337.25, credit: 0, summary: '未分配利润减少', explanation: '未分配利润减少16,337.25元，转为盈余公积。' },
      { subjectCode: '410402', debit: 0, credit: 16337.25, summary: '结转提取盈余公积', explanation: '利润分配-提取盈余公积科目余额结平，结转至未分配利润。' }],
    documents: [
      { type: 'text', label: '盈余公积计算表', docTitle: '法定盈余公积提取计算表', content: '净利润163,372.50元，提取10%法定盈余公积16,337.25元，剩余未分配利润147,035.25元。', signature: '赵会计' }]},

  // ═══════════════════════════════════════════════════════════════════
  // 出纳月末任务（4月30日）
  // ═══════════════════════════════════════════════════════════════════
  {
    date: '2026-04-30',
    title: '月末现金盘点',
    tags: ['资金管理', '期末'],
    difficulty: 1,
    description: '月末出纳对库存现金进行盘点。本月收入（提取备用金）15,000元，支出（差旅费报销4,500元+办公用品3,000元）7,500元。上月末余额16,800元，现金账面余额24,300元。经盘点实存24,300元，账实相符。',
    tip: '出纳应每月进行现金盘点，确保账实相符。发现差异及时查明原因。',
    entries: [],
    documents: [
      { type: 'text', label: '现金盘点表', docTitle: '库存现金盘点表', content: '账面余额24,300元，实盘24,300元，账实相符。盘点人：李出纳 监盘人：赵会计', signature: '李出纳 赵会计' }]},
  {
    date: '2026-04-30',
    title: '银行存款余额核对',
    tags: ['资金管理', '期末'],
    difficulty: 1,
    description: '月末核对工商银行和建设银行存款余额。编制余额调节表，确保账实相符。工商银行账户余额约6,800,000元，建设银行账户余额约2,000,000元。',
    tip: '月末出纳需将银行存款日记账与银行对账单逐笔核对，编制银行存款余额调节表。',
    role: 'cashier',
    entries: [],
    documents: [
      { type: 'text', label: '银行对账单', docTitle: '2026年4月银行存款对账单汇总', content: '工商银行：本月收入（投标保证金退回50,000+办公楼进度款545,000）595,000元，支出（提取备用金15,000+分包款70,000+工资150,000+社保70,500+办公水电11,000+材料款169,500+利息1,450+分包结算80,000+空调13,560+报销3,000）583,510元。建设银行：本月收入（预收款2,400,000元），支出（预缴税费53,760+材料款282,500+租赁费55,000+预付分包45,000）436,260元。核对相符。', signature: '工商银行 建设银行' }]},

  {
    date: '2026-04-18',
    title: '支付日常办公费用',
    tags: ['资金管理'],
    difficulty: 1,
    description: '支付本月办公用品采购费2,200元，已转账支付。',
    tip: '办公费计入管理费用。',
    entries: [
      { subjectCode: '660201', debit: 2200, credit: 0, summary: '办公用品费', explanation: '办公费计入管理费用。' },
      { subjectCode: '100201', debit: 0, credit: 2200, summary: '支付办公费', explanation: '银行存款减少2,200元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目660201），属于"支付其他与经营活动有关的现金"。'}],
    documents: [{ type: 'receipt', label: '办公用品发票', items: [{ label: '办公用品', amount: 2200 }], totalAmount: 2200, stampText: '收款单位财务章' }]},
  {
    date: '2026-04-22',
    title: '往来对账',
    tags: ['往来管理'],
    difficulty: 1,
    role: 'accountant',
    description: '月末与供应商核对往来账项。',
    tip: '月末往来对账确保双方账目一致。',
    entries: [
      { subjectCode: '220201', debit: 0, credit: 0, summary: '对账一致', explanation: '与供应商对账确认无误。' }],
    documents: [{ type: 'text', label: '对账确认单', docTitle: '往来对账确认单', content: '与供应商核对往来，确认全部款项已结清。', signature: '赵会计' }]},
  {
    date: '2026-04-25',
    title: '支付银行手续费',
    tags: ['资金管理'],
    difficulty: 1,
    description: '本月银行费用720元，已由银行自动扣划。',
    tip: '银行手续费计入财务费用。',
    entries: [
      { subjectCode: '6603', debit: 720, credit: 0, summary: '银行手续费', explanation: '银行手续费计入财务费用。' },
      { subjectCode: '100201', debit: 0, credit: 720, summary: '银行扣款', explanation: '银行存款减少720元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6603），属于"支付其他与经营活动有关的现金"。'}],
    documents: [{ type: 'bank', label: '银行扣款通知', totalAmount: 720 }]},
  {
    date: '2026-04-26',
    title: '固定资产日常维护',
    tags: ['机械使用'],
    difficulty: 1,
    role: 'accountant',
    description: '对施工设备进行日常维护，支付维护费3,000元，已转账支付。',
    tip: '设备维护费计入合同履约成本-机械使用费。',
    entries: [
      { subjectCode: '540104', debit: 3000, credit: 0, summary: '设备维护费', explanation: '施工设备维护费计入合同履约成本-机械使用费。' },
      { subjectCode: '100201', debit: 0, credit: 3000, summary: '支付维护费', explanation: '银行存款减少3,000元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目540104），属于"支付其他与经营活动有关的现金"。'}],
    documents: [{ type: 'receipt', label: '维护费发票', items: [{ label: '设备日常维护', amount: 3000 }], totalAmount: 3000, stampText: '维修厂发票章' }]}]

export default tasks
