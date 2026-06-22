/**
 * 建筑业 - 11月教学任务
 *
 * 本月主题：道路工程冲刺完工，办公楼进入保修期
 * 重点：道路完工验收、保修费预提、质保期管理、工程尾款结算、月末结转
 *
 * 企业名称：鼎立建筑工程有限公司
 * 税制：一般纳税人（增值税9%）
 * 主营：房屋建筑、市政工程
 */

const tasks = [
  // ═══════════════════════════════════════════════════════════════════
  // 月初：道路工程冲刺准备 (T01-T09)
  // ═══════════════════════════════════════════════════════════════════
  {
    date: '2026-11-01',
    title: '收到道路工程进度款',
    tags: ['往来管理'],
    difficulty: 1,
    role: 'accountant',
    description: '收到甲方市政工程管理处支付的道路工程10月进度款80万元，增值税9%计72,000元，合计872,000元已存入工商银行账户。',
    tip: '收到工程进度款先记入"合同负债"，待确认收入时转入主营业务收入。这是建筑业预收款项的标准处理方式。',
    entries: [
      { subjectCode: '100201', debit: 872000, credit: 0, summary: '收到进度款872,000元', explanation: '银行存款增加，收到甲方支付的工程进度款872,000元。' , cashFlowItem: 'cf-op5', cashFlowExplanation: '其他经营活动现金流入（配对科目2205），属于"收到其他与经营活动有关的现金"。'},
      { subjectCode: '2205', debit: 0, credit: 872000, summary: '合同负债增加', explanation: '合同负债是已收款但尚未确认收入的合同义务。待道路工程完工进度确认后转入主营业务收入。' }],
    documents: [
      { type: 'bank', label: '银行回单', date: '2026-11-01', totalAmount: 872000, payer: '市政工程管理处', payeeName: '鼎立建筑工程有限公司', content: '道路工程10月进度款', refNo: 'HD202611010001' }]},
  {
    date: '2026-11-01',
    title: '采购沥青混凝土材料',
    tags: ['材料管理', '工程成本'],
    difficulty: 2,
    role: 'accountant',
    description: '采购沥青混凝土一批用于道路工程路面摊铺施工，价款400,000元，增值税13%计52,000元，材料已运抵现场验收合格，款项未付。',
    tip: '建筑业材料采购直接记入"合同履约成本-材料成本"，不经过原材料科目。取得增值税专用发票的进项税额可抵扣销项税额。',
    entries: [
      { subjectCode: '540102', debit: 400000, credit: 0, summary: '购入沥青混凝土一批', explanation: '材料成本直接计入合同履约成本-材料成本，构成道路工程直接材料费用。' },
      { subjectCode: '222101', debit: 52000, credit: 0, summary: '增值税进项税额(400,000x13%)', explanation: '取得增值税专用发票，进项税额52,000元可用于抵扣当期销项税额。' },
      { subjectCode: '220201', debit: 0, credit: 452000, summary: '应付账款-丙公司', explanation: '款项未付，形成对材料供应商丙公司的债务。' }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', date: '2026-11-01', region: '江苏省', invoiceNo: '3200261101', buyer: '鼎立建筑工程有限公司', seller: '丙公司建材有限公司', lineItems: [{ name: '沥青混凝土(AC-20)', qty: 500, unit: '吨', price: 600, amount: 300000 }, { name: '沥青混凝土(AC-13)', qty: 200, unit: '吨', price: 500, amount: 100000 }], totalAmount: 452000 }]},
  {
    date: '2026-11-02',
    role: 'accountant',
    title: '支付材料采购款',
    tags: ['材料管理'],
    difficulty: 1,
    description: '出纳通过网银支付丙公司沥青混凝土材料款452,000元。',
    tip: '支付应付账款，借记"应付账款-丙公司"，贷记"银行存款"。出纳完成付款操作并取得银行回单作为原始凭证。',
    entries: [
      { subjectCode: '220201', debit: 452000, credit: 0, summary: '支付丙公司材料款', explanation: '应付账款减少，清偿对材料供应商丙公司的债务。' },
      { subjectCode: '100201', debit: 0, credit: 452000, summary: '支付材料款', explanation: '银行存款减少452,000元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目220201），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '网银转账回单', date: '2026-11-02', totalAmount: 452000, payer: '鼎立建筑工程有限公司', payeeName: '丙公司建材有限公司', content: '沥青混凝土材料款', refNo: 'ZF202611020001' }]},
  {
    date: '2026-11-02',
    title: '预付道路附属工程分包款',
    tags: ['分包管理'],
    difficulty: 1,
    role: 'accountant',
    description: '将道路工程中的绿化带和人行道工程分包给丁公司，分包合同价款300,000元(不含税)，按合同约定预付30%计90,000元。',
    tip: '预付分包工程款先计入"预付账款"，待分包工程完工验收后转入"合同履约成本-分包成本"。',
    entries: [
      { subjectCode: '1123', debit: 90000, credit: 0, summary: '预付分包工程款(300,000x30%)', explanation: '预付账款增加，待分包工程完工结算后转入工程成本。' },
      { subjectCode: '100201', debit: 0, credit: 90000, summary: '支付预付分包款', explanation: '银行存款减少90,000元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目1123），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '银行回单', date: '2026-11-02', totalAmount: 90000, payer: '鼎立建筑工程有限公司', payeeName: '丁公司路桥建设有限公司', content: '预付道路附属工程分包款', refNo: 'ZF202611020002' }]},
  {
    date: '2026-11-03',
    role: 'accountant',
    title: '提取备用金',
    tags: ['出纳'],
    difficulty: 1,
    description: '出纳从工商银行提取备用金30,000元，用于本月日常零星开支。',
    tip: '提取备用金，借记"库存现金"，贷记"银行存款"。备用金用于日常小额支付，如差旅费报销、零星采购等。',
    entries: [
      { subjectCode: '1001', debit: 30000, credit: 0, summary: '提取备用金30,000元', explanation: '库存现金增加30,000元，用于日常零星开支。' },
      { subjectCode: '100201', debit: 0, credit: 30000, summary: '提取备用金', explanation: '银行存款减少30,000元。' }],
    documents: [
      { type: 'bank', label: '现金支票存根', date: '2026-11-03', totalAmount: 30000, payer: '鼎立建筑工程有限公司', payeeName: '鼎立建筑工程有限公司', content: '备用金', refNo: 'XJ202611030001' }]},
  {
    date: '2026-11-03',
    title: '计提本月职工薪酬',
    tags: ['工程成本', '工资社保'],
    difficulty: 2,
    role: 'accountant',
    description: '本月应发职工薪酬：道路工程施工人员200,000元，项目部管理人员50,000元，公司管理人员30,000元，合计280,000元。',
    tip: '直接施工人员工资记入"合同履约成本-人工成本"，项目部管理人员工资记入"合同履约成本-间接费用"，公司行政管理人员工资记入"管理费用"。',
    entries: [
      { subjectCode: '540101', debit: 200000, credit: 0, summary: '施工人员工资', explanation: '直接人工是工程成本核心组成部分，道路工程施工人员工资计入合同履约成本-人工成本。' },
      { subjectCode: '540106', debit: 50000, credit: 0, summary: '项目部管理人员工资', explanation: '项目部管理人员工资属于间接费用，计入合同履约成本-间接费用。' },
      { subjectCode: '660201', debit: 30000, credit: 0, summary: '公司管理人员工资', explanation: '公司行政管理人员工资计入管理费用-工资。' },
      { subjectCode: '221101', debit: 0, credit: 280000, summary: '应付职工薪酬-工资', explanation: '应付职工薪酬增加280,000元，形成对职工的工资负债。' }],
    documents: [
      { type: 'text', label: '工资表', docTitle: '2026年11月职工工资表', content: '施工人员(18人)200,000元；项目部管理人员(6人)50,000元；公司管理人员(5人)30,000元。合计280,000元。', signature: '王人事' }]},
  {
    date: '2026-11-04',
    role: 'accountant',
    title: '发放职工工资',
    tags: ['工资社保'],
    difficulty: 1,
    description: '出纳通过银行代发本月职工工资280,000元。',
    tip: '发放工资时，借记"应付职工薪酬-工资"，贷记"银行存款"。工资发放后冲减对职工的工资负债。',
    entries: [
      { subjectCode: '221101', debit: 280000, credit: 0, summary: '发放11月工资', explanation: '应付职工薪酬减少，清偿对职工的工资负债280,000元。' },
      { subjectCode: '100201', debit: 0, credit: 280000, summary: '银行代发工资', explanation: '银行存款减少280,000元，通过银行代发至职工个人账户。' , cashFlowItem: 'cf-op3', cashFlowExplanation: '支付职工薪酬相关支出（配对科目221101），属于"支付给职工以及为职工支付的现金"——经营活动现金流出。'}],
    documents: [
      { type: 'bank', label: '银行代发工资回单', date: '2026-11-04', totalAmount: 280000, payer: '鼎立建筑工程有限公司', payeeName: '公司全体员工', content: '11月份工资发放', refNo: 'GZ202611040001' }]},
  {
    date: '2026-11-04',
    role: 'accountant',
    title: '支付施工机械租赁费',
    tags: ['机械使用'],
    difficulty: 1,
    description: '支付本月施工机械租赁费(摊铺机、压路机等)100,000元，增值税13%计13,000元，合计113,000元已转账支付。',
    tip: '施工机械租赁费记入"合同履约成本-机械使用费"。取得增值税专用发票的进项税额可抵扣销项税额。',
    entries: [
      { subjectCode: '540104', debit: 100000, credit: 0, summary: '施工机械本月租金', explanation: '机械使用费是合同履约成本的直接费用，计入道路工程成本。' },
      { subjectCode: '222101', debit: 13000, credit: 0, summary: '增值税进项税额(100,000x13%)', explanation: '取得增值税专用发票，进项税额13,000元可抵扣当期销项税额。' },
      { subjectCode: '100201', debit: 0, credit: 113000, summary: '支付机械租赁费', explanation: '银行存款减少113,000元。' , cashFlowItem: 'cf-op4', cashFlowExplanation: '缴纳税费支出（配对科目540104），属于"支付的各项税费"——经营活动现金流出。'}],
    documents: [
      { type: 'bank', label: '银行回单', date: '2026-11-04', totalAmount: 113000, payer: '鼎立建筑工程有限公司', payeeName: '鑫源租赁有限公司', content: '施工机械租赁费', refNo: 'ZF202611040001' }]},
  {
    date: '2026-11-05',
    title: '计提固定资产折旧',
    tags: ['机械使用', '工程成本'],
    difficulty: 2,
    role: 'accountant',
    description: '本月应计提折旧：工程运输车辆折旧5,000元(用于材料运输)，办公设备折旧2,000元，合计7,000元。',
    tip: '用于工程的固定资产折旧计入"合同履约成本-机械使用费"，行政管理用固定资产折旧计入"管理费用"。',
    entries: [
      { subjectCode: '540104', debit: 5000, credit: 0, summary: '运输车辆折旧(工程用)', explanation: '运输车辆用于工程材料运输，折旧费属于机械使用费，计入工程成本。' },
      { subjectCode: '660201', debit: 2000, credit: 0, summary: '办公设备折旧(管理用)', explanation: '办公设备用于行政管理，折旧费计入管理费用。' },
      { subjectCode: '1602', debit: 0, credit: 7000, summary: '计提累计折旧', explanation: '累计折旧增加7,000元，反映固定资产价值因使用而发生的损耗。' }],
    documents: [
      { type: 'text', label: '折旧计算表', docTitle: '固定资产折旧计算表', content: '直线法折旧。运输车辆月折旧5,000元；办公设备月折旧2,000元。合计7,000元。', signature: '赵会计' }]},

  // ═══════════════════════════════════════════════════════════════════
  // 道路工程冲刺施工 (T10-T16)
  // ═══════════════════════════════════════════════════════════════════
  {
    date: '2026-11-06',
    title: '购买安全防护用品',
    tags: ['材料管理', '工程成本'],
    difficulty: 1,
    role: 'accountant',
    description: '为道路工程路面施工购买安全锥、警示牌、反光衣等安全防护用品，价款15,000元已转账支付。',
    tip: '安全防护用品费用属于"合同履约成本-其他直接费用"。安全文明施工费是建筑业施工现场的必要开支。',
    entries: [
      { subjectCode: '540105', debit: 15000, credit: 0, summary: '购买安全防护用品', explanation: '安全防护用品属于其他直接费用，直接计入合同履约成本。' },
      { subjectCode: '100201', debit: 0, credit: 15000, summary: '支付安全用品款', explanation: '银行存款减少15,000元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目540105），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '增值税普通发票', date: '2026-11-06', items: [{ label: '安全锥', amount: 5000 }, { label: '警示牌', amount: 6000 }, { label: '反光衣', amount: 4000 }], totalAmount: 15000, stampText: '安全用品有限公司发票专用章' }]},
  {
    date: '2026-11-07',
    role: 'accountant',
    title: '报销项目管理人员差旅费',
    tags: ['工程成本'],
    difficulty: 1,
    description: '项目经理陈工报销道路工程现场管理差旅费4,500元，其中：交通费2,000元，住宿费1,500元，餐补1,000元，以现金支付。',
    tip: '工程管理人员差旅费记入"合同履约成本-其他直接费用"。这部分费用与工程施工直接相关。',
    entries: [
      { subjectCode: '540105', debit: 4500, credit: 0, summary: '项目经理差旅费', explanation: '项目管理人员现场差旅费属于与工程直接相关的其他直接费用，计入工程成本。' },
      { subjectCode: '1001', debit: 0, credit: 4500, summary: '现金报销差旅费', explanation: '库存现金减少4,500元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目540105），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '差旅费报销单', date: '2026-11-07', items: [{ label: '交通费', amount: 2000 }, { label: '住宿费', amount: 1500 }, { label: '餐补', amount: 1000 }], totalAmount: 4500, stampText: '鼎立建筑工程有限公司财务专用章' }]},
  {
    date: '2026-11-08',
    role: 'accountant',
    title: '支付办公费及水电费',
    tags: ['工程成本'],
    difficulty: 1,
    description: '支付本月公司办公费5,000元、水电费3,000元，合计8,000元已转账支付。',
    tip: '公司办公费计入"管理费用"，工程部水电费计入"合同履约成本-间接费用"。',
    entries: [
      { subjectCode: '660201', debit: 5000, credit: 0, summary: '公司办公费用', explanation: '行政管理部门办公费计入管理费用。' },
      { subjectCode: '540106', debit: 3000, credit: 0, summary: '工程部水电费', explanation: '工程部水电费属于间接费用，计入合同履约成本。' },
      { subjectCode: '100201', debit: 0, credit: 8000, summary: '支付办公费及水电费', explanation: '银行存款减少8,000元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目660201），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '缴费凭证', date: '2026-11-08', items: [{ label: '办公费', amount: 5000 }, { label: '水电费', amount: 3000 }], totalAmount: 8000, stampText: '收款单位财务专用章' }]},
  {
    date: '2026-11-09',
    title: '摊销预付办公用房租金',
    tags: ['工程成本'],
    difficulty: 2,
    role: 'accountant',
    description: '本月摊销预付办公用房租金20,000元(预付全年240,000元÷12个月)，计入管理费用。',
    tip: '预付的租金需按月摊销计入当期损益。长期待摊费用按期均匀摊销，遵循权责发生制原则。',
    entries: [
      { subjectCode: '660201', debit: 20000, credit: 0, summary: '摊销办公用房租金', explanation: '办公用房租金按月摊销20,000元，计入管理费用-租赁费。' },
      { subjectCode: '1123', debit: 0, credit: 20000, summary: '冲减预付账款', explanation: '预付账款减少20,000元，反映已摊销部分。' }],
    documents: [
      { type: 'text', label: '摊销计算表', docTitle: '预付费用摊销计算表', content: '办公用房租金240,000÷12=20,000元/月。', signature: '赵会计' }]},
  {
    date: '2026-11-10',
    title: '道路附属分包工程完工结算',
    tags: ['分包管理', '工程成本'],
    difficulty: 2,
    role: 'accountant',
    description: '道路绿化带和人行道分包工程完工验收合格，分包合同价款300,000元(不含税)，增值税9%计27,000元。冲抵预付90,000元后，余款237,000元未付。',
    tip: '分包工程完工验收后，将分包成本计入"合同履约成本-分包成本"，同时冲销"预付账款"。剩余未付部分确认为"应付账款"。',
    entries: [
      { subjectCode: '540103', debit: 300000, credit: 0, summary: '道路附属分包工程成本', explanation: '分包工程完工验收，成本计入合同履约成本-分包成本300,000元。' },
      { subjectCode: '222101', debit: 27000, credit: 0, summary: '增值税进项税额(300,000x9%)', explanation: '取得分包单位开具的增值税专用发票，进项税额27,000元可抵扣。' },
      { subjectCode: '1123', debit: 0, credit: 90000, summary: '冲销预付分包款', explanation: '冲销此前预付的分包工程款90,000元。' },
      { subjectCode: '220202', debit: 0, credit: 237000, summary: '应付账款-丁公司', explanation: '扣除预付款后的分包尾款237,000元形成对分包单位丁公司的债务。' }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', date: '2026-11-10', region: '江苏省', invoiceNo: '3200261110', buyer: '鼎立建筑工程有限公司', seller: '丁公司路桥建设有限公司', lineItems: [{ name: '道路绿化带及人行道工程', qty: 1, unit: '项', price: 300000, amount: 300000 }], totalAmount: 327000 },
      { type: 'text', label: '工程验收单', docTitle: '分包工程完工验收单', content: '道路绿化带及人行道工程已按合同约定完成，经监理验收合格。合同价款300,000元。', signature: '李监理 丁公司' }]},
  {
    date: '2026-11-11',
    title: '预提办公楼保修费用',
    tags: ['工程合同', '期末'],
    difficulty: 2,
    role: 'accountant',
    description: '年初完工的恒达地产办公楼本月进入保修期。按合同约定预提保修费用20,000元，用于保修期内可能发生的维修支出。保修期一年。',
    tip: '保修费用按预计可能发生的维修支出计提。虽然办公楼已完工交付，但保修期内的维修义务仍需确认费用和预计负债。借记"管理费用"，贷记"其他应付款"。',
    entries: [
      { subjectCode: '660201', debit: 20000, credit: 0, summary: '预提办公楼保修费用', explanation: '办公楼进入保修期，按预计维修支出计提保修费用20,000元，计入管理费用。' },
      { subjectCode: '2241', debit: 0, credit: 20000, summary: '其他应付款-预提保修费', explanation: '预提保修费用形成对其他应付款的负债，待实际发生维修时冲减。保修期至2027年10月。' }],
    documents: [
      { type: 'text', label: '保修费用计提表', docTitle: '办公楼保修费用预提计算表', content: '恒达地产办公楼合同总价5,000,000元，按0.4%/月计提保修费20,000元。保修期至2027年10月。', signature: '赵会计' }]},
  {
    date: '2026-11-12',
    role: 'accountant',
    title: '支付分包工程结算尾款',
    tags: ['分包管理'],
    difficulty: 1,
    description: '出纳通过网银支付丁公司道路附属分包工程尾款237,000元。',
    tip: '支付分包工程结算尾款，借记"应付账款-丁公司"，贷记"银行存款"。分包工程款结算完毕。',
    entries: [
      { subjectCode: '220202', debit: 237000, credit: 0, summary: '支付丁公司分包尾款', explanation: '应付账款减少，清偿对分包单位丁公司的债务237,000元。' },
      { subjectCode: '100201', debit: 0, credit: 237000, summary: '支付分包结算尾款', explanation: '银行存款减少237,000元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目220202），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '银行回单', date: '2026-11-12', totalAmount: 237000, payer: '鼎立建筑工程有限公司', payeeName: '丁公司路桥建设有限公司', content: '道路附属分包工程尾款', refNo: 'ZF202611120001' }]},
  {
    date: '2026-11-13',
    role: 'accountant',
    title: '购买办公用品',
    tags: ['工程成本'],
    difficulty: 1,
    description: '购买办公用墨盒、打印纸、文具等2,000元，以现金支付。',
    tip: '办公用品费用计入"管理费用-办公费"。小额办公用品可以从备用金中直接支付。',
    entries: [
      { subjectCode: '660201', debit: 2000, credit: 0, summary: '购买办公用品', explanation: '办公用品属于日常管理费用支出，计入管理费用。' },
      { subjectCode: '1001', debit: 0, credit: 2000, summary: '现金支付办公用品', explanation: '库存现金减少2,000元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目660201），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '购物发票', date: '2026-11-13', items: [{ label: '墨盒', amount: 800 }, { label: '打印纸', amount: 600 }, { label: '文具用品', amount: 600 }], totalAmount: 2000, stampText: '办公用品店发票专用章' }]},

  // ═══════════════════════════════════════════════════════════════════
  // 道路工程完工验收 (T17-T24)
  // ═══════════════════════════════════════════════════════════════════
  {
    date: '2026-11-14',
    title: '购买路面标线涂料',
    tags: ['材料管理', '工程成本'],
    difficulty: 1,
    role: 'accountant',
    description: '采购路面标线涂料及辅助材料一批，价款30,000元，增值税13%计3,900元，款项已转账支付。这是道路工程的最后一道工序。',
    tip: '路面标线是道路工程最后工序之一，材料费计入"合同履约成本-材料成本"。增值税进项税额可抵扣。',
    entries: [
      { subjectCode: '540102', debit: 30000, credit: 0, summary: '购入路面标线涂料', explanation: '路面标线材料计入合同履约成本-材料成本，构成道路工程直接材料费用。' },
      { subjectCode: '222101', debit: 3900, credit: 0, summary: '增值税进项税额(30,000x13%)', explanation: '取得增值税专用发票，进项税额3,900元可抵扣销项税额。' },
      { subjectCode: '100201', debit: 0, credit: 33900, summary: '支付材料款', explanation: '银行存款减少33,900元。' , cashFlowItem: 'cf-op4', cashFlowExplanation: '缴纳税费支出（配对科目540102），属于"支付的各项税费"——经营活动现金流出。'}],
    documents: [
      { type: 'invoice', label: '增值税专用发票', date: '2026-11-14', region: '江苏省', invoiceNo: '3200261114', buyer: '鼎立建筑工程有限公司', seller: '路美交通设施有限公司', lineItems: [{ name: '热熔型路面标线涂料', qty: 2000, unit: 'kg', price: 12, amount: 24000 }, { name: '玻璃微珠', qty: 300, unit: 'kg', price: 20, amount: 6000 }], totalAmount: 33900 }]},
  {
    date: '2026-11-15',
    role: 'accountant',
    title: '支付材料尾款',
    tags: ['材料管理'],
    difficulty: 1,
    description: '支付上月及本月零星材料采购尾款50,000元给丙公司。',
    tip: '支付应付材料款，借记"应付账款"，贷记"银行存款"。及时清理应付款项，维护供应商关系。',
    entries: [
      { subjectCode: '220201', debit: 50000, credit: 0, summary: '支付丙公司材料尾款', explanation: '应付账款减少，清偿对材料供应商丙公司的尾款债务。' },
      { subjectCode: '100201', debit: 0, credit: 50000, summary: '支付材料尾款', explanation: '银行存款减少50,000元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目220201），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '网银转账回单', date: '2026-11-15', totalAmount: 50000, payer: '鼎立建筑工程有限公司', payeeName: '丙公司建材有限公司', content: '材料尾款', refNo: 'ZF202611150001' }]},
  {
    date: '2026-11-16',
    role: 'accountant',
    title: '支付办公楼保修维修费',
    tags: ['工程成本'],
    difficulty: 1,
    description: '恒达地产办公楼卫生间渗水维修，发生维修费8,000元，已转账支付。冲减此前计提的保修费用。',
    tip: '保修期内实际发生的维修支出，冲减已计提的"其他应付款-预提保修费"。实际支出小于预提金额的，差额留待后续使用。',
    entries: [
      { subjectCode: '2241', debit: 8000, credit: 0, summary: '支付办公楼维修费', explanation: '冲减预提保修费用负债，实际发生保修维修支出8,000元。预提保修费余额还有12,000元。' },
      { subjectCode: '100201', debit: 0, credit: 8000, summary: '支付维修费', explanation: '银行存款减少8,000元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目2241），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '银行回单', date: '2026-11-16', totalAmount: 8000, payer: '鼎立建筑工程有限公司', payeeName: '恒达物业服务有限公司', content: '卫生间渗水维修费', refNo: 'ZF202611160001' }]},
  {
    date: '2026-11-17',
    title: '道路工程完工验收',
    tags: ['工程合同'],
    difficulty: 2,
    role: 'accountant',
    description: '市政道路工程全部完工，通过甲方市政工程管理处和监理单位的竣工验收，签署工程竣工验收报告。项目累计完成工程量100%。',
    tip: '工程完工验收是确认收入的重要节点。验收合格后，即可确认剩余未确认的工程收入。本任务为文档确认，无需编制会计分录。',
    entries: [],
    documents: [
      { type: 'text', label: '工程竣工验收报告', docTitle: '市政道路工程竣工验收报告', content: '鼎立建筑工程有限公司承建的市政道路工程已按合同约定全部完成，工程质量合格，通过竣工验收。合同总价8,000,000元，累计完成100%。', signature: '市政工程管理处 监理单位 鼎立建筑' }]},
  {
    date: '2026-11-18',
    title: '确认道路工程完工收入',
    tags: ['工程合同', '工程成本'],
    difficulty: 3,
    role: 'accountant',
    description: '道路工程完工验收合格，确认剩余20%的工程收入1,600,000元，增值税9%计144,000元。冲抵此前收到的合同负债872,000元后，剩余872,000元计入合同资产(含质保金400,000元)。',
    tip: '完工百分比法：工程完工时确认剩余全部收入。借记"合同负债"(冲抵预收款)和"合同资产"(应收尾款)，贷记"主营业务收入"和"应交税费-应交增值税(销项税额)"。',
    entries: [
      { subjectCode: '2205', debit: 872000, credit: 0, summary: '合同负债转入收入', explanation: '此前收到的道路工程进度款872,000元从合同负债转出，冲抵完工收入。' },
      { subjectCode: '1208', debit: 872000, credit: 0, summary: '合同资产-应收工程款', explanation: '工程尾款及质保金合计872,000元确认为合同资产(其中质保金400,000元)，待甲方后续支付。' },
      { subjectCode: '222101', debit: 0, credit: 144000, summary: '增值税销项税额(160万x9%)', explanation: '确认增值税纳税义务，应交增值税-销项税额144,000元。' },
      { subjectCode: '6001', debit: 0, credit: 1600000, summary: '确认主营业务收入(不含税)', explanation: '道路工程剩余20%完工，确认收入1,600,000元。合同总收入8,000,000元至此全部确认完毕。' }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', date: '2026-11-18', region: '江苏省', invoiceNo: '3200261118', buyer: '市政工程管理处', seller: '鼎立建筑工程有限公司', lineItems: [{ name: '市政道路工程完工结算款', qty: 1, unit: '项', price: 1600000, amount: 1600000 }], totalAmount: 1744000 },
      { type: 'text', label: '工程结算单', docTitle: '道路工程完工结算单', content: '合同总价8,000,000元，累计确认收入8,000,000元(100%)。增值税144,000元。扣留质保金5%计400,000元，应收工程尾款472,000元。', signature: '赵会计 市政工程管理处' }]},
  {
    date: '2026-11-18',
    title: '预提道路工程质保金',
    tags: ['工程合同', '往来管理'],
    difficulty: 2,
    role: 'accountant',
    description: '道路工程完工后，按合同约定甲方扣留工程质量保证金400,000元(合同总价8,000,000x5%)，保修期1年。将合同资产中的质保金部分单独归集。',
    tip: '工程质保金是甲方从结算款中扣留的质量保证金，是合同资产的重要组成部分。待保修期满无质量问题后，甲方向施工企业返还质保金。',
    entries: [
      { subjectCode: '1208', debit: 400000, credit: 0, summary: '合同资产-质保金', explanation: '合同资产中的质保金部分400,000元，单独反映被甲方扣留的质量保证金。' },
      { subjectCode: '1208', debit: 0, credit: 400000, summary: '应收工程款转入质保金', explanation: '从合同资产-应收工程款中转入，表明该400,000元须待保修期满后方可收回。' }],
    documents: [
      { type: 'text', label: '工程质保金确认函', docTitle: '工程质量保证金确认函', content: '市政道路工程合同总价8,000,000元，按5%扣留质保金400,000元，保修期自2026年11月18日至2027年11月17日。', signature: '市政工程管理处 鼎立建筑' }]},
  {
    date: '2026-11-19',
    title: '收到道路工程完工结算款',
    tags: ['往来管理'],
    difficulty: 1,
    role: 'accountant',
    description: '收到甲方市政工程管理处支付的道路工程完工结算款(扣除质保金后)472,000元，已存入工商银行账户。质保金400,000元待保修期满后收回。',
    tip: '收到工程结算款时，借记"银行存款"，贷记"合同资产-应收工程款"。质保金部分在合同资产中单独列示，待保修期满后收回。',
    entries: [
      { subjectCode: '100201', debit: 472000, credit: 0, summary: '收到道路工程结算款', explanation: '银行存款增加472,000元，收到甲方支付的工程尾款(不含质保金部分)。' , cashFlowItem: 'cf-op5', cashFlowExplanation: '其他经营活动现金流入（配对科目1208），属于"收到其他与经营活动有关的现金"。'},
      { subjectCode: '1208', debit: 0, credit: 472000, summary: '冲销合同资产-应收工程款', explanation: '合同资产-应收工程款减少472,000元，已收回的工程尾款冲销。' }],
    documents: [
      { type: 'bank', label: '银行回单', date: '2026-11-19', totalAmount: 472000, payer: '市政工程管理处', payeeName: '鼎立建筑工程有限公司', content: '道路工程完工结算款(扣除质保金)', refNo: 'HD202611190001' }]},
  {
    date: '2026-11-20',
    role: 'accountant',
    title: '缴纳增值税及附加税费',
    tags: ['税费'],
    difficulty: 2,
    description: '缴纳本月增值税48,100元，城建税3,367元(7%)，教育费附加2,405元(5%)，合计53,872元。',
    tip: '增值税=销项税额144,000元-进项税额95,900元=48,100元。附加税费=增值税×12%。出纳需在规定申报期内完成缴税。',
    entries: [
      { subjectCode: '222101', debit: 48100, credit: 0, summary: '缴纳增值税(144,000-95,900)', explanation: '应交增值税借方反映实缴金额，冲减应交增值税负债。' },
      { subjectCode: '222103', debit: 3367, credit: 0, summary: '缴纳城建税(48,100x7%)', explanation: '城建税按增值税额的7%计算缴纳。' },
      { subjectCode: '222104', debit: 2405, credit: 0, summary: '缴纳教育费附加(48,100x5%)', explanation: '教育费附加3%+地方教育附加2%=5%，合计2,405元。' },
      { subjectCode: '100201', debit: 0, credit: 53872, summary: '缴纳税费合计', explanation: '银行存款减少53,872元，用于缴纳增值税及附加税费。' , cashFlowItem: 'cf-op4', cashFlowExplanation: '缴纳税费支出（配对科目222101），属于"支付的各项税费"——经营活动现金流出。'}],
    documents: [
      { type: 'receipt', label: '电子缴税凭证', date: '2026-11-20', items: [{ label: '增值税', amount: 48100 }, { label: '城建税7%', amount: 3367 }, { label: '教育费附加5%', amount: 2405 }], totalAmount: 53872, stampText: '国家税务总局电子缴税专用章' }]},

  // ═══════════════════════════════════════════════════════════════════
  // 月末税务与日常 (T25-T32)
  // ═══════════════════════════════════════════════════════════════════
  {
    date: '2026-11-21',
    title: '计提本月税金及附加',
    tags: ['税费'],
    difficulty: 2,
    role: 'accountant',
    description: '月末计提本月应缴纳的城建税及教育费附加。增值税48,100元，城建税7%计3,367元，教育费附加5%计2,405元，合计5,772元。',
    tip: '税金及附加按增值税应纳税额的一定比例计提。月末借记"税金及附加"，贷记"应交税费-应交城建税/教育费附加"。',
    entries: [
      { subjectCode: '6403', debit: 5772, credit: 0, summary: '计提本月税金及附加', explanation: '税金及附加增加5,772元，反映本月应缴纳的城建税和教育费附加。' },
      { subjectCode: '222103', debit: 0, credit: 3367, summary: '应交城建税(48,100x7%)', explanation: '应交城建税增加3,367元。城建税税率7%，按增值税额计算。' },
      { subjectCode: '222104', debit: 0, credit: 2405, summary: '应交教育费附加(48,100x5%)', explanation: '应交教育费附加增加2,405元(含地方教育附加2%)。' }],
    documents: [
      { type: 'text', label: '税金计算表', docTitle: '城建税及教育费附加计算表', content: '增值税48,100元。城建税=48,100x7%=3,367元；教育费附加=48,100x5%=2,405元。合计5,772元。', signature: '赵会计' }]},
  {
    date: '2026-11-22',
    role: 'accountant',
    title: '报销日常零星费用',
    tags: ['工程成本'],
    difficulty: 1,
    description: '员工报销日常零星费用3,000元，其中：交通费1,500元，通讯费1,000元，其他500元，以现金支付。',
    tip: '日常零星费用计入"管理费用"。现金支付需确保有足够的备用金余额。',
    entries: [
      { subjectCode: '660201', debit: 3000, credit: 0, summary: '报销日常零星费用', explanation: '员工日常费用报销计入管理费用。' },
      { subjectCode: '1001', debit: 0, credit: 3000, summary: '现金支付报销款', explanation: '库存现金减少3,000元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目660201），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '费用报销单', date: '2026-11-22', items: [{ label: '交通费', amount: 1500 }, { label: '通讯费', amount: 1000 }, { label: '其他', amount: 500 }], totalAmount: 3000, stampText: '鼎立建筑工程有限公司财务专用章' }]},
  {
    date: '2026-11-24',
    role: 'accountant',
    title: '支付零星维修费',
    tags: ['工程成本'],
    difficulty: 1,
    description: '公司办公楼门锁、照明灯等零星维修，发生费用2,000元，以现金支付。',
    tip: '办公楼零星维修费计入"管理费用"。小额维修从备用金中直接支付。',
    entries: [
      { subjectCode: '660201', debit: 2000, credit: 0, summary: '支付零星维修费', explanation: '公司办公楼零星维修费计入管理费用。' },
      { subjectCode: '1001', debit: 0, credit: 2000, summary: '现金支付维修费', explanation: '库存现金减少2,000元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目660201），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '维修费收据', date: '2026-11-24', items: [{ label: '门锁维修', amount: 800 }, { label: '照明维修', amount: 700 }, { label: '其他维修', amount: 500 }], totalAmount: 2000, stampText: '维修服务部发票专用章' }]},
  {
    date: '2026-11-25',
    title: '库存现金盘点',
    tags: ['出纳'],
    difficulty: 1,
    description: '月末对库存现金进行盘点。本月收入备用金30,000元，支出：差旅费4,500元+办公用品2,000元+报销3,000元+维修费2,000元=11,500元。账面余额18,500元，经盘点实存18,500元，账实相符。',
    tip: '出纳应每月进行现金盘点，确保账实相符。盘点时需有会计监盘。若发现盘盈盘亏需及时查明原因。',
    role: 'cashier',
    entries: [],
    documents: [
      { type: 'text', label: '现金盘点表', docTitle: '库存现金盘点表', content: '账面余额：备用金收入30,000元-支出11,500元=18,500元。实盘金额：18,500元。账实相符。盘点人：刘出纳 监盘人：赵会计', signature: '刘出纳 赵会计' }]},
  {
    date: '2026-11-26',
    title: '银行存款余额核对',
    tags: ['期末'],
    difficulty: 1,
    description: '月末核对工商银行基本账户余额。编制银行存款余额调节表，确保银行日记账与银行对账单余额一致。',
    tip: '月末出纳需将银行存款日记账与银行对账单逐笔核对，查找未达账项，编制余额调节表。',
    role: 'cashier',
    entries: [],
    documents: [
      { type: 'text', label: '银行对账单', docTitle: '2026年11月银行对账单', content: '本月主要收支：收进度款872,000元+结算款472,000元=1,344,000元。支出：材料款452,000元+分包款90,000元+工资280,000元+机械费113,000元+安全用品15,000元+办公水电8,000元+分包尾款237,000元+涂料33,900元+材料尾款50,000元+维修费8,000元+税费53,872元+手续费1,500元=1,342,272元。月末余额核对相符。', signature: '工商银行' }]},
  {
    date: '2026-11-27',
    title: '摊销长期待摊费用',
    tags: ['工程成本'],
    difficulty: 2,
    role: 'accountant',
    description: '本月摊销办公室装修费5,000元，该装修费原值120,000元，分24个月摊销。',
    tip: '长期待摊费用按受益期均匀摊销。借记相关费用科目(管理费用)，贷记"长期待摊费用"。',
    entries: [
      { subjectCode: '660201', debit: 5000, credit: 0, summary: '摊销办公室装修费', explanation: '办公室装修费按月摊销5,000元(120,000÷24)，计入管理费用。' },
      { subjectCode: '1901', debit: 0, credit: 5000, summary: '长期待摊费用减少', explanation: '长期待摊费用减少5,000元，反映已摊销部分。' }],
    documents: [
      { type: 'text', label: '摊销计算表', docTitle: '长期待摊费用摊销计算表', content: '办公室装修费120,000元，按24个月摊销，月摊销额5,000元。', signature: '赵会计' }]},
  {
    date: '2026-11-28',
    title: '计提坏账准备',
    tags: ['往来管理', '期末'],
    difficulty: 2,
    role: 'accountant',
    description: '按应收账款余额的5%计提坏账准备。本月应收账款余额预计100,000元，应计提坏账准备5,000元。',
    tip: '坏账准备按应收账款余额的一定比例计提。借记"资产减值损失"，贷记"坏账准备"。这是谨慎性原则的体现。',
    entries: [
      { subjectCode: '6701', debit: 5000, credit: 0, summary: '计提坏账准备(100,000x5%)', explanation: '资产减值损失增加5,000元，反映预计可能发生的坏账损失。' },
      { subjectCode: '1231', debit: 0, credit: 5000, summary: '坏账准备增加', explanation: '坏账准备增加5,000元，作为应收账款的抵减项。' }],
    documents: [
      { type: 'text', label: '坏账准备计提表', docTitle: '坏账准备计提计算表', content: '应收账款余额100,000元，按5%计提坏账准备5,000元。', signature: '赵会计' }]},

  // ═══════════════════════════════════════════════════════════════════
  // 月末结转 (T33-T40)
  // ═══════════════════════════════════════════════════════════════════
  {
    date: '2026-11-29',
    title: '月末结转合同履约成本',
    tags: ['工程成本', '期末'],
    difficulty: 3,
    role: 'accountant',
    description: '道路工程已全部完工，将本月全部合同履约成本1,107,500元结转至主营业务成本。明细：人工200,000+材料430,000+分包300,000+机械105,000+其他直接19,500+间接53,000。',
    tip: '工程完工后，全部合同履约成本应结转至"主营业务成本"。合同履约成本科目借方余额反映未完工程成本，完工后应结平。',
    entries: [
      { subjectCode: '6401', debit: 1107500, credit: 0, summary: '结转主营业务成本', explanation: '道路工程本月全部完工，将1,107,500元合同履约成本结转至主营业务成本。' },
      { subjectCode: '540101', debit: 0, credit: 200000, summary: '结转人工成本', explanation: '结转施工人员人工成本200,000元。' },
      { subjectCode: '540102', debit: 0, credit: 430000, summary: '结转材料成本', explanation: '结转材料成本(沥青400,000+标线涂料30,000)430,000元。' },
      { subjectCode: '540103', debit: 0, credit: 300000, summary: '结转分包成本', explanation: '结转分包工程成本(绿化带及人行道)300,000元。' },
      { subjectCode: '540104', debit: 0, credit: 105000, summary: '结转机械使用费', explanation: '结转机械使用费(租赁100,000+折旧5,000)105,000元。' },
      { subjectCode: '540105', debit: 0, credit: 19500, summary: '结转其他直接费用', explanation: '结转其他直接费用(安全用品15,000+差旅4,500)19,500元。' },
      { subjectCode: '540106', debit: 0, credit: 53000, summary: '结转间接费用', explanation: '结转间接费用(管理工资50,000+水电3,000)53,000元。' }],
    documents: [
      { type: 'text', label: '成本结转计算表', docTitle: '合同履约成本结转计算表', content: '道路工程完工，本月合同履约成本合计1,107,500元全额结转至主营业务成本。明细：人工200,000+材料430,000+分包300,000+机械105,000+其他19,500+间接53,000。', signature: '赵会计' }]},
  {
    date: '2026-11-30',
    title: '结转损益类科目至本年利润',
    tags: ['期末'],
    difficulty: 2,
    role: 'accountant',
    description: '月末结转损益类科目余额至本年利润。本月收入：主营业务收入1,600,000元。费用合计1,208,772元=主营业务成本1,107,500+管理费用89,000+税金及附加5,772+财务费用1,500+资产减值损失5,000。利润总额391,228元。',
    tip: '月末将各损益类科目余额转入"本年利润"。收入类科目余额转借方(收入减少)，费用类科目余额转贷方(费用减少)。借贷差额为利润总额。',
    entries: [
      { subjectCode: '6001', debit: 1600000, credit: 0, summary: '结转主营业务收入', explanation: '收入类科目余额转入本年利润，收入减少，本年利润增加1,600,000元。' },
      { subjectCode: '6401', debit: 0, credit: 1107500, summary: '结转主营业务成本', explanation: '主营业务成本1,107,500元结转至本年利润。' },
      { subjectCode: '6403', debit: 0, credit: 5772, summary: '结转税金及附加', explanation: '税金及附加5,772元结转至本年利润。' },
      { subjectCode: '660201', debit: 0, credit: 91000, summary: '结转管理费用', explanation: '管理费用89,000元结转至本年利润(薪酬30,000+折旧2,000+办公5,000+租金摊销20,000+保修20,000+报销3,000+维修2,000+长期待摊5,000+办公用品2,000)。' },
      { subjectCode: '6701', debit: 0, credit: 5000, summary: '结转资产减值损失', explanation: '资产减值损失5,000元(坏账准备)结转至本年利润。' },
      { subjectCode: '4103', debit: 0, credit: 390728, summary: '费用转入本年利润', explanation: '费用合计1,208,772元转入本年利润借方，冲减利润。' }
    ],
    documents: [
      { type: 'text', label: '结转计算表', docTitle: '月末损益结转计算表', content: '收入1,600,000元；费用1,208,772元(主营成本1,107,500+管理费89,000+税金及附加5,772+财务费1,500+减值损失5,000)。利润总额=1,600,000-1,208,772=391,228元。', signature: '赵会计' }]},
  {
    date: '2026-11-30',
    title: '计提所得税费用',
    tags: ['税费', '期末'],
    difficulty: 2,
    role: 'accountant',
    description: '本月利润总额391,228元，按25%计提企业所得税97,807元。',
    tip: '计提所得税：借记"所得税费用"，贷记"应交税费-应交所得税"。所得税费用=应纳税所得额×所得税税率(一般企业25%)。',
    entries: [
      { subjectCode: '6801', debit: 97807, credit: 0, summary: '计提本月所得税(391,228x25%)', explanation: '所得税费用增加97,807元，按利润总额的25%计提。' },
      { subjectCode: '222102', debit: 0, credit: 97807, summary: '应交企业所得税', explanation: '应交税费-应交所得税增加97,807元，形成对税务局的负债。' }],
    documents: [
      { type: 'text', label: '所得税计算表', docTitle: '企业所得税计算表', content: '利润总额391,228元，所得税率25%，所得税97,807元。', signature: '赵会计' }]},
  {
    date: '2026-11-30',
    title: '结转所得税费用至本年利润',
    tags: ['期末'],
    difficulty: 2,
    role: 'accountant',
    description: '将本月所得税费用97,807元结转至本年利润。结转后本年利润余额为净利润293,421元(391,228-97,807)。',
    tip: '所得税费用转入本年利润：借记"本年利润"，贷记"所得税费用"。所得税费用科目余额结平。',
    entries: [
      { subjectCode: '4103', debit: 97807, credit: 0, summary: '所得税费用转入本年利润', explanation: '所得税费用结转至本年利润借方，减少本年利润。' },
      { subjectCode: '6801', debit: 0, credit: 97807, summary: '结转所得税费用', explanation: '所得税费用科目余额结平，余额为零。' }],
    documents: [
      { type: 'text', label: '所得税结转表', docTitle: '所得税费用结转表', content: '所得税费用97,807元结转至本年利润。净利润=391,228-97,807=293,421元。', signature: '赵会计' }]},
  {
    date: '2026-11-30',
    title: '结转净利润至未分配利润',
    tags: ['期末'],
    difficulty: 2,
    role: 'accountant',
    description: '将本月净利润293,421元从本年利润结转至利润分配-未分配利润。',
    tip: '月末将净利润结转至"利润分配-未分配利润"。借记"本年利润"(净利润结转)，贷记"利润分配-未分配利润"(所有者权益增加)。',
    entries: [
      { subjectCode: '4103', debit: 293421, credit: 0, summary: '本年利润转出', explanation: '本年利润科目借方结转293,421元，科目余额结平。' },
      { subjectCode: '410401', debit: 0, credit: 293421, summary: '未分配利润增加', explanation: '未分配利润增加293,421元，所有者权益增加。' }],
    documents: [
      { type: 'text', label: '利润分配计算表', docTitle: '净利润结转计算表', content: '本月净利润293,421元，从本年利润结转至利润分配-未分配利润。', signature: '赵会计' }]},
  {
    date: '2026-11-30',
    title: '提取盈余公积及分配股利',
    tags: ['期末'],
    difficulty: 2,
    role: 'accountant',
    description: '按净利润10%提取盈余公积29,342.10元，并宣告分配普通股股利150,000元。',
    tip: '提取盈余公积：借记"利润分配-提取盈余公积"，贷记"盈余公积"。分配股利：借记"利润分配-应付普通股股利"，贷记"应付股利"。盈余公积用于弥补亏损或转增资本。',
    entries: [
      { subjectCode: '410402', debit: 29342.10, credit: 0, summary: '提取盈余公积(293,421x10%)', explanation: '按净利润10%提取法定盈余公积29,342.10元。法定盈余公积累计达到注册资本50%后可不再提取。' },
      { subjectCode: '410403', debit: 150000, credit: 0, summary: '宣告分配普通股股利', explanation: '经股东会决议，分配普通股股利150,000元。' },
      { subjectCode: '4101', debit: 0, credit: 29342.10, summary: '盈余公积增加', explanation: '盈余公积增加29,342.10元，作为企业留存收益用于未来发展。' },
      { subjectCode: '2231', debit: 0, credit: 150000, summary: '应付股利增加', explanation: '应付股利增加150,000元，形成对股东的负债，待实际发放时支付。' }],
    documents: [
      { type: 'text', label: '利润分配表', docTitle: '2026年11月利润分配表', content: '净利润293,421元。提取盈余公积29,342.10元(10%)；分配股利150,000元；剩余未分配利润114,078.90元。', signature: '赵会计' }]},
  {
    date: '2026-11-30',
    title: '结转利润分配明细至未分配利润',
    tags: ['期末'],
    difficulty: 2,
    role: 'accountant',
    description: '将"提取盈余公积"和"应付普通股股利"明细科目余额结转至"未分配利润"明细科目。结转后未分配利润净增加114,078.90元(293,421-29,342.10-150,000)。',
    tip: '期末将利润分配各明细科目转入"未分配利润"。借记"利润分配-未分配利润"，贷记"利润分配-提取盈余公积"和"利润分配-应付普通股股利"。',
    entries: [
      { subjectCode: '410401', debit: 179342.10, credit: 0, summary: '未分配利润减少(29,342.10+150,000)', explanation: '未分配利润减少179,342.10元，用于提取盈余公积和分配股利。' },
      { subjectCode: '410402', debit: 0, credit: 29342.10, summary: '结转提取盈余公积', explanation: '利润分配-提取盈余公积科目余额结平。' },
      { subjectCode: '410403', debit: 0, credit: 150000, summary: '结转应付股利', explanation: '利润分配-应付普通股股利科目余额结平。' }],
    documents: [
      { type: 'text', label: '利润分配结转表', docTitle: '利润分配明细结转表', content: '提取盈余公积29,342.10元、分配股利150,000元结转至未分配利润。未分配利润净增加114,078.90元。', signature: '赵会计' }]},

  {
    date: '2026-11-18',
    role: 'accountant',
    title: '支付日常办公费用',
    tags: ['费用管理'],
    difficulty: 1,
    description: '支付本月办公用品采购费2,000元，已转账支付。',
    tip: '办公费计入管理费用。',
    entries: [
      { subjectCode: '660201', debit: 2000, credit: 0, summary: '办公用品费', explanation: '办公费计入管理费用。' },
      { subjectCode: '100201', debit: 0, credit: 2000, summary: '支付办公费', explanation: '银行存款减少2,000元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目660201），属于"支付其他与经营活动有关的现金"。'}],
    documents: [{ type: 'receipt', label: '办公用品发票', items: [{ label: '办公用品', amount: 2000 }], totalAmount: 2000, stampText: '收款单位财务章' }]},
  {
    date: '2026-11-22',
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
    date: "2026-11-30",
    role: 'accountant',
    title: "模拟纳税申报",
    tags: ["期末", "税费"],
    difficulty: 1,
    description: "根据本月已完成的账务处理，进行模拟纳税申报。系统已自动计算应缴税额（增值税和企业所得税），请前往纳税申报页面核对并提交。",
    tip: "纳税申报是企业每月的法定义务。确认所有凭证已过账、期末结转已完成后，前往纳税申报页面核对各项税额后点击「提交申报」。",
    entries: [],
    documents: [
      { type: "text", label: "纳税申报提醒", docTitle: "11月纳税申报提醒", content: "申报期间：2026-11-30\n\n请前往纳税申报页面：\n1. 核对增值税申报表数据\n2. 核对企业所得税申报表数据\n3. 确认无误后点击「提交申报」\n\n纳税申报是企业每月必做的合规义务，请按时完成。", stampText: "财务专用章" }]},
]

export default tasks

