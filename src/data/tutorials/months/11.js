const nov = [
  { date: '2026-11-02', role: 'accountant', title: '缴纳10月增值税及附加税', tags: ["税费"], difficulty: 2, tip: '每月15日前完成。',
    description: '缴纳增值税5,200、城建税364、教育附加156。',
    entries: [{ subjectCode: '222101', summary: '增值税', debit: 5200, credit: 0, explanation: '增值税减少。' }, { subjectCode: '222103', summary: '城建税', debit: 364, credit: 0, explanation: '城建税减少。' }, { subjectCode: '222104', summary: '教育附加', debit: 156, credit: 0, explanation: '附加减少。' }, { subjectCode: '100201', summary: '缴税', debit: 0, credit: 5720, explanation: '银行减少。' }],
    documents: [{ type: 'bank', label: '缴税回单', date: '2026-11-02', totalAmount: 5720, payer: '本公司', payeeName: 'XX市税务局', content: '10月增值税及附加税', refNo: 'HD202611020010' }]},
  { date: '2026-11-03', role: 'accountant', title: '发放10月员工工资', tags: ["工资"], difficulty: 2, tip: '每月10日前发上月工资。',
    description: '银行代发10月工资，实发76,500元。',
    entries: [{ subjectCode: '221101', summary: '发10月工资', debit: 90000, credit: 0, explanation: '应付薪酬减少。' }, { subjectCode: '100201', summary: '实发', debit: 0, credit: 76500, explanation: '银行减少。' }, { subjectCode: '224101', summary: '代扣社保', debit: 0, credit: 9000, explanation: '其他应付款增加。' }, { subjectCode: '224102', summary: '代扣公积金', debit: 0, credit: 4500, explanation: '其他应付款增加。' }],
    documents: [{ type: 'bank', label: '代发工资回单', date: '2026-11-03', totalAmount: 76500, payer: '本公司', payerAccount: '6222 0200 **** 1234', payeeName: '员工代发户', content: '10月工资代发（共6人）', refNo: 'HD202611030020' }]},
  { date: '2026-11-04', role: 'accountant', title: '提取备用金', tags: ["资金"], difficulty: 1, tip: '备用金满足日常开支。',
    description: '提取现金3,000元。',
    entries: [{ subjectCode: '1001', summary: '备用金', debit: 3000, credit: 0, explanation: '现金增加。' }, { subjectCode: '100201', summary: '提备用金', debit: 0, credit: 3000, explanation: '银行减少。' }],
    documents: [{ type: 'bank', label: '现金支票回单', date: '2026-11-04', totalAmount: 3000, payer: '本公司', payerAccount: '6222 0200 **** 1234', payeeName: '本公司（现金）', content: '提取备用金', refNo: 'HD202611040030' }]},
  { date: '2026-11-05', role: 'accountant', title: '研发支出-费用化', tags: ["生产","资产"], difficulty: 3, tip: '研究阶段支出全部费用化。',
    description: '研究阶段支出30,000元。',
    entries: [{ subjectCode: '660204', summary: '研发费用', debit: 30000, credit: 0, explanation: '研发费用增加。' }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 30000, explanation: '银行减少。' }],
    documents: [{ type: 'bank', label: '付款回单', date: '2026-11-05', totalAmount: 30000, payer: '本公司', payerAccount: '6222 0200 **** 1234', payeeName: 'XX研究院', content: 'A产品研发项目研究阶段费用', refNo: 'HD202611050040' }, { type: 'text', label: '研发支出审批单', docTitle: '研 发 支 出 申 请 审 批 单', date: '2026-11-05', stampText: '技术部\n研发专用章', content: '研发支出审批单\n\n项目名称：A产品新型号研发\n\n阶段：研究阶段（探索性调研）\n\n费用明细：\n  材料费：12,000.00元\n  人工费：10,000.00元\n  试验费：8,000.00元\n  合计：30,000.00元\n\n会计处理：全部费用化，计入管理费用-研发费用\n\n申请人：周研发\n审批人：赵总',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '项目名称',
        'A产品新型号研发'
      ],
      [
        '阶段',
        '研究阶段（探索性调研）'
      ],
      [
        '材料费',
        '12,000.00元'
      ],
      [
        '人工费',
        '10,000.00元'
      ],
      [
        '试验费',
        '8,000.00元'
      ],
      [
        '合计',
        '30,000.00元'
      ],
      [
        '会计处理',
        '全部费用化，计入管理费用-研发费用'
      ],
      [
        '申请人',
        '周研发'
      ],
      [
        '审批人',
        '赵总'
      ],
    ] }]},
  { date: '2026-11-06', role: 'accountant', title: '支付房租', tags: ["费用"], difficulty: 1, tip: '房租按月支付。',
    description: '支付11月租金8,000元。',
    entries: [{ subjectCode: '660207', summary: '房租', debit: 8000, credit: 0, explanation: '管理费增加。' }, { subjectCode: '100201', summary: '付房租', debit: 0, credit: 8000, explanation: '银行减少。' }],
    documents: [{ type: 'receipt', label: '收据', docTitle: '房屋租赁专用收据', date: '2026-11-06', totalAmount: 8000, payer: '本公司', paymentMethod: '银行转账', stampText: 'XX物业管理有限公司\n财务专用章', receiver: '王XX', items: [{ name: 'XX大厦801室 11月租金', qty: 1, price: 8000, amount: 8000 }]}]},
  { date: '2026-11-07', role: 'accountant', title: '研发支出-资本化', tags: ["生产","资产"], difficulty: 3, tip: '开发阶段符合条件资本化。',
    description: '开发阶段资本化支出50,000元。',
    entries: [{ subjectCode: '1701', summary: '资本化支出', debit: 50000, credit: 0, explanation: '无形资产增加。' }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 50000, explanation: '银行减少。' }],
    documents: [{ type: 'bank', label: '付款回单', date: '2026-11-07', totalAmount: 50000, payer: '本公司', payerAccount: '6222 0200 **** 1234', payeeName: 'XX技术开发公司', content: 'A产品研发项目开发阶段费用', refNo: 'HD202611070050' }, { type: 'text', label: '资本化确认单', docTitle: '研 发 支 出 资 本 化 确 认 单', date: '2026-11-07', stampText: '技术部\n研发专用章', content: '研发支出资本化确认\n\n项目名称：A产品新型号研发\n\n阶段：开发阶段（样机试制+测试）\n\n符合资本化条件：\n✓ 技术上可行（已完成样机测试）\n✓ 有完成意图（已立项）\n✓ 未来经济利益很可能流入\n✓ 支出能可靠计量\n\n资本化金额：50,000.00元\n会计处理：计入无形资产\n\n申请人：周研发\n审批人：赵总\n财务审核：李会计',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '项目名称',
        'A产品新型号研发'
      ],
      [
        '阶段',
        '开发阶段（样机试制+测试）'
      ],
      [
        '资本化金额',
        '50,000.00元'
      ],
      [
        '会计处理',
        '计入无形资产'
      ],
      [
        '申请人',
        '周研发'
      ],
      [
        '审批人',
        '赵总'
      ],
      [
        '财务审核',
        '李会计'
      ],
    ] }]},
  { date: '2026-11-08', role: 'accountant', title: '采购原材料', tags: ["采购"], difficulty: 2, tip: '进项税可抵扣。',
    description: '采购A型钢材8吨，价款120,000元，增值税15,600元。',
    entries: [{ subjectCode: '1403', summary: '采购', debit: 120000, credit: 0, explanation: '原材料增加。' }, { subjectCode: '222101', summary: '进项税', debit: 15600, credit: 0, explanation: '进项增加。' }, { subjectCode: '220201', summary: '应付', debit: 0, credit: 135600, explanation: '应付增加。' }],
    documents: [{ type: 'text', label: '入库单', docTitle: '收  料  单', date: '2026-11-08', stampText: '仓库\n验收专用章', content: '供应商：丙公司\n入库日期：2026-11-08\n\n材料名称：A型钢材 Φ25mm\n数量：8吨\n单价：15,000元/吨\n金额：120,000.00元\n\n增值税进项税额：15,600.00元（13%）\n\n检验结果：合格 ✓\n保管员：刘保管\n验收员：陈检验',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '供应商',
        '丙公司'
      ],
      [
        '入库日期',
        '2026-11-08'
      ],
      [
        '材料名称',
        'A型钢材 Φ25mm'
      ],
      [
        '数量',
        '8吨'
      ],
      [
        '单价',
        '15,000元/吨'
      ],
      [
        '金额',
        '120,000.00元'
      ],
      [
        '增值税进项税额',
        '15,600.00元（13%）'
      ],
      [
        '检验结果',
        '合格 ✓'
      ],
      [
        '保管员',
        '刘保管'
      ],
      [
        '验收员',
        '陈检验'
      ],
    ] }]},
  { date: '2026-11-09', role: 'accountant', title: '支付供应商货款', tags: ["采购","资金"], difficulty: 1, tip: '按合同账期支付。',
    description: '支付丙公司采购款135,600元。',
    entries: [{ subjectCode: '220201', summary: '付丙公司', debit: 135600, credit: 0, explanation: '应付减少。' }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 135600, explanation: '银行减少。' }],
    documents: [{ type: 'bank', label: '转账回单', date: '2026-11-09', totalAmount: 135600, payer: '本公司', payerAccount: '6222 0200 **** 1234', payeeName: '丙公司', payeeAccount: '6222 0200 **** 8888', content: '支付11月采购款', refNo: 'HD202611090060' }]},
  { date: '2026-11-10', role: 'accountant', title: '生产领料', tags: ["生产"], difficulty: 2, tip: '借生产成本，贷原材料。',
    description: '领用A型钢材5吨，合计75,000元。',
    entries: [{ subjectCode: '500101', summary: '领料', debit: 75000, credit: 0, explanation: '生产成本增加。' }, { subjectCode: '1403', summary: '领料', debit: 0, credit: 75000, explanation: '原材料减少。' }],
    documents: [{ type: 'text', label: '领料单', docTitle: '领  料  单', date: '2026-11-10', stampText: '仓库\n发料专用章', content: '领用部门：生产车间   领料单号：LL20261110014\n\n材料名称：A型钢材 Φ25mm\n数量：5吨\n单价：15,000元/吨\n金额：75,000.00元\n\n用途：生产A产品（订单号PO2026014）\n\n领料人：张生产\n发料人：刘保管\n审核人：李会计',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '领用部门',
        '生产车间   领料单号：LL20261110014'
      ],
      [
        '材料名称',
        'A型钢材 Φ25mm'
      ],
      [
        '数量',
        '5吨'
      ],
      [
        '单价',
        '15,000元/吨'
      ],
      [
        '金额',
        '75,000.00元'
      ],
      [
        '用途',
        '生产A产品（订单号PO2026014）'
      ],
      [
        '领料人',
        '张生产'
      ],
      [
        '发料人',
        '刘保管'
      ],
      [
        '审核人',
        '李会计'
      ],
    ] }]},
  { date: '2026-11-11', role: 'accountant', title: '直接人工归集', tags: ["生产"], difficulty: 2, tip: '人工计入生产成本。',
    description: '生产工人工资35,000元。',
    entries: [{ subjectCode: '500102', summary: '人工', debit: 35000, credit: 0, explanation: '生产成本增加。' }, { subjectCode: '221101', summary: '计提', debit: 0, credit: 35000, explanation: '应付薪酬增加。' }],
    documents: [{ type: 'text', label: '工资计算表', docTitle: '直 接 人 工 费 用 分 配 表', date: '2026-11-11', stampText: '人力资源部\n工资专用章', content: '直接人工费用分配\n期间：2026年11月\n\n生产车间直接生产工人工资：35,000.00元\n\n工时统计：\n  A产品生产工时：2,500小时\n\n分配计算：\n  工资分配率 = 35,000 ÷ 2,500 = 14.00元/小时\n  计入生产成本-直接人工：35,000.00元\n\n制表：王出纳\n审核：李会计\n批准：赵总',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年11月'
      ],
      [
        '生产车间直接生产工人工资',
        '35,000.00元'
      ],
      [
        'A产品生产工时',
        '2,500小时'
      ],
      [
        '计入生产成本-直接人工',
        '35,000.00元'
      ],
      [
        '制表',
        '王出纳'
      ],
      [
        '审核',
        '李会计'
      ],
      [
        '批准',
        '赵总'
      ],
    ] }]},
  { date: '2026-11-12', role: 'accountant', title: '销售商品', tags: ["销售"], difficulty: 2, tip: '借银行，贷收入、税费。',
    description: '销售100台，价款200,000元，增值税26,000元已收。',
    entries: [{ subjectCode: '100201', summary: '销100台', debit: 226000, credit: 0, explanation: '银行增加。' }, { subjectCode: '6001', summary: '收入', debit: 0, credit: 200000, explanation: '收入增加。' }, { subjectCode: '222101', summary: '销项税', debit: 0, credit: 26000, explanation: '增值税增加。' }],
    documents: [{ type: 'invoice', label: '增值税专用发票', region: '广东', invoiceType: '专用', copy: '发票联', invoiceNo: '4400601010', date: '2026年11月12日', buyer: '癸公司', buyerTaxId: '91440101MABBBBBBBB', seller: '本公司', sellerTaxId: '91440101MA3XXXXXXXX', stampText: '发票专用章', payee: '李四', reviewer: '王五', drawer: '赵六', lineItems: [{ name: 'A产品', unit: '台', qty: 100, price: 2000, amount: 200000, taxRate: '13%', tax: 26000 }], totalAmount: 226000 }, { type: 'bank', label: '收款回单', date: '2026-11-12', totalAmount: 226000, payer: '癸公司', payerAccount: '6222 0100 **** 4444', payeeName: '本公司', payeeAccount: '6222 0200 **** 1234', content: '购买A产品货款及增值税', refNo: 'HD202611120090' }]},
  { date: '2026-11-13', role: 'accountant', title: '收取租金', tags: ["资产","销售"], difficulty: 2, tip: '租金入其他业务收入。',
    description: '收取11月办公楼租金12,000元。',
    entries: [{ subjectCode: '100201', summary: '租金', debit: 12000, credit: 0, explanation: '银行增加。' }, { subjectCode: '6051', summary: '租金收入', debit: 0, credit: 12000, explanation: '其他业务收入增加。' }],
    documents: [{ type: 'receipt', label: '收据', docTitle: '房屋租赁收款收据', date: '2026-11-13', totalAmount: 12000, payer: '某承租方', paymentMethod: '银行转账', stampText: '本公司\n财务专用章', receiver: '李会计', items: [{ name: 'XX大厦801室 11月租金收入', qty: 1, price: 12000, amount: 12000 }]}]},
  { date: '2026-11-14', role: 'accountant', title: '计提存货跌价准备', tags: ["生产","资产"], difficulty: 3, tip: '可变现净值低于成本时计提。',
    description: '计提存货跌价准备10,000元。',
    entries: [{ subjectCode: '6701', summary: '存货跌价', debit: 10000, credit: 0, explanation: '减值损失增加。' }, { subjectCode: '1461', summary: '跌价准备', debit: 0, credit: 10000, explanation: '存货跌价准备增加。' }],
    documents: [{ type: 'text', label: '存货减值测试', docTitle: '存 货 跌 价 测 试 表', date: '2026-11-14', stampText: '财务专用章', content: '存货跌价准备计提\n期间：2026年11月\n\n原材料A型钢材：\n  账面成本：120,000.00元\n  可变现净值：114,000.00元\n  跌价金额：6,000.00元\n\n库存商品A产品：\n  账面成本：134,000.00元\n  可变现净值：130,000.00元\n  跌价金额：4,000.00元\n\n合计计提跌价准备：10,000.00元\n\n制表：李会计\n审核：赵会计主管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年11月'
      ],
      [
        '账面成本',
        '120,000.00元'
      ],
      [
        '可变现净值',
        '114,000.00元'
      ],
      [
        '跌价金额',
        '6,000.00元'
      ],
      [
        '账面成本',
        '134,000.00元'
      ],
      [
        '可变现净值',
        '130,000.00元'
      ],
      [
        '跌价金额',
        '4,000.00元'
      ],
      [
        '合计计提跌价准备',
        '10,000.00元'
      ],
      [
        '制表',
        '李会计'
      ],
      [
        '审核',
        '赵会计主管'
      ],
    ] }]},
  { date: '2026-11-17', role: 'accountant', title: '递延所得税资产', tags: ["税费","期末"], difficulty: 3, tip: '可抵扣暂时性差异确认递延所得税资产。',
    description: '存货跌价确认递延所得税资产2,500元。',
    entries: [{ subjectCode: '1811', summary: '递延所得税资产', debit: 2500, credit: 0, explanation: '递延所得税资产增加。' }, { subjectCode: '6801', summary: '递延所得税', debit: 0, credit: 2500, explanation: '所得税费用减少。' }],
    documents: [{ type: 'text', label: '递延所得税计算表', docTitle: '递 延 所 得 税 资 产 确 认 表', date: '2026-11-17', stampText: '财务专用章', content: '递延所得税资产确认\n期间：2026年11月\n\n可抵扣暂时性差异：\n  存货跌价准备 10,000.00元\n  坏账准备 8,000.00元\n  合计：18,000.00元\n\n递延所得税资产：\n  18,000 × 25% = 4,500.00元\n  本期确认：2,500.00元（新增差异）\n\n借：递延所得税资产  2,500\n贷：所得税费用      2,500\n\n制表：李会计\n审核：赵会计主管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年11月'
      ],
      [
        '合计',
        '18,000.00元'
      ],
      [
        '本期确认',
        '2,500.00元（新增差异）'
      ],
      [
        '制表',
        '李会计'
      ],
      [
        '审核',
        '赵会计主管'
      ],
    ] }]},
  { date: '2026-11-18', role: 'accountant', title: '生产领料-辅助材料', tags: ["生产"], difficulty: 2, tip: '辅助材料入制造费用。',
    description: '领用辅助材料4,000元。',
    entries: [{ subjectCode: '5101', summary: '辅料', debit: 4000, credit: 0, explanation: '制造费用增加。' }, { subjectCode: '1403', summary: '辅料', debit: 0, credit: 4000, explanation: '原材料减少。' }],
    documents: [{ type: 'text', label: '领料单', docTitle: '领  料  单', date: '2026-11-18', stampText: '仓库\n发料专用章', content: '领用部门：生产车间   领料单号：LL20261118015\n\n材料名称：B型材料\n数量：1批\n金额：4,000.00元\n\n用途：机物料消耗（设备润滑维护）\n\n领料人：张生产\n发料人：刘保管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '领用部门',
        '生产车间   领料单号：LL20261118015'
      ],
      [
        '材料名称',
        'B型材料'
      ],
      [
        '数量',
        '1批'
      ],
      [
        '金额',
        '4,000.00元'
      ],
      [
        '用途',
        '机物料消耗（设备润滑维护）'
      ],
      [
        '领料人',
        '张生产'
      ],
      [
        '发料人',
        '刘保管'
      ],
    ] }]},
  { date: '2026-11-19', role: 'accountant', title: '制造费用归集分配', tags: ["生产"], difficulty: 2, tip: '分配后余额归零。',
    description: '归集分配制造费用9,000元。',
    entries: [{ subjectCode: '5101', summary: '归集', debit: 5000, credit: 0, explanation: '制造费用增加。' }, { subjectCode: '1602', summary: '折旧', debit: 0, credit: 2000, explanation: '累计折旧增加。' }, { subjectCode: '100201', summary: '车间水电', debit: 0, credit: 3000, explanation: '银行减少。' }, { subjectCode: '500103', summary: '分配', debit: 9000, credit: 0, explanation: '生产成本增加。' }, { subjectCode: '5101', summary: '分配', debit: 0, credit: 9000, explanation: '制造费用归零。' }],
    documents: [{ type: 'text', label: '制造费用表', docTitle: '制 造 费 用 归 集 分 配 表', date: '2026-11-19', stampText: '财务专用章', content: '制造费用归集分配\n期间：2026年11月\n\n归集明细：\n1. 辅助材料（机物料）：4,000.00元\n2. 折旧费——机器设备：2,000.00元\n3. 车间水电费：3,000.00元\n  归集总额：9,000.00元\n\n分配：\n  分配率 = 9,000 ÷ 2,500工时 = 3.60元/小时\n  计入生产成本-制造费用：9,000.00元\n\n分配后制造费用余额：0.00元 ✓\n\n制表：李会计\n审核：赵会计主管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年11月'
      ],
      [
        '归集总额',
        '9,000.00元'
      ],
      [
        '计入生产成本-制造费用',
        '9,000.00元'
      ],
      [
        '分配后制造费用余额',
        '0.00元 ✓'
      ],
      [
        '制表',
        '李会计'
      ],
      [
        '审核',
        '赵会计主管'
      ],
    ] }]},
  { date: '2026-11-20', role: 'accountant', title: '完工产品入库', tags: ["生产"], difficulty: 2, tip: '借库存，贷生产成本。',
    description: '本月100台完工，成本119,000元。',
    entries: [{ subjectCode: '1405', summary: '完工', debit: 119000, credit: 0, explanation: '库存增加。' }, { subjectCode: '500101', summary: '材料', debit: 0, credit: 75000, explanation: '生产转出。' }, { subjectCode: '500102', summary: '人工', debit: 0, credit: 35000, explanation: '生产转出。' }, { subjectCode: '500103', summary: '制造费用', debit: 0, credit: 9000, explanation: '生产转出。' }],
    documents: [{ type: 'text', label: '入库单', docTitle: '产 品 入 库 单', date: '2026-11-20', stampText: '仓库\n验收专用章', content: '入库部门：生产车间   入库单号：RK20261120007\n\n产品名称：A产品\n规格型号：标准型\n\n完工数量：100台\n\n成本构成：\n  直接材料：75,000.00元\n  直接人工：35,000.00元\n  制造费用：9,000.00元\n━━━━━━━━━━━━━━━━━━━━━\n  总成本：119,000.00元\n  单位成本：1,190.00元/台\n\n质检结论：合格 ✓\n\n仓库验收：刘保管\n质量检验：陈检验',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '入库部门',
        '生产车间   入库单号：RK20261120007'
      ],
      [
        '产品名称',
        'A产品'
      ],
      [
        '规格型号',
        '标准型'
      ],
      [
        '完工数量',
        '100台'
      ],
      [
        '直接材料',
        '75,000.00元'
      ],
      [
        '直接人工',
        '35,000.00元'
      ],
      [
        '制造费用',
        '9,000.00元'
      ],
      [
        '总成本',
        '119,000.00元'
      ],
      [
        '单位成本',
        '1,190.00元/台'
      ],
      [
        '质检结论',
        '合格 ✓'
      ],
      [
        '仓库验收',
        '刘保管'
      ],
      [
        '质量检验',
        '陈检验'
      ],
    ] }]},
  { date: '2026-11-21', role: 'accountant', title: '结转销售成本', tags: ["生产","成本"], difficulty: 3, tip: '先进先出法。',
    description: '结转销售成本134,000元。',
    entries: [{ subjectCode: '6401', summary: '结转成本', debit: 134000, credit: 0, explanation: '主营成本增加。' }, { subjectCode: '1405', summary: '转成本', debit: 0, credit: 134000, explanation: '库存减少。' }],
    documents: [{ type: 'text', label: '成本计算表', docTitle: '销 售 成 本 计 算 表', date: '2026-11-21', stampText: '财务专用章', content: '销售成本计算（先进先出法）\n期间：2026年11月\n\n本月销售数量：100台\n\n库存明细：\n  10月结余：60台×1,190.00=71,400.00元\n  11月完工：100台×1,190.00=119,000.00元\n  可售合计：190,400.00元\n\n本期结转：\n  100台 = 134,000.00元（简化计算）\n\n期末结余：60台×1,190+40台×1,190=119,000.00元\n\n制表：李会计\n审核：赵会计主管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年11月'
      ],
      [
        '本月销售数量',
        '100台'
      ],
      [
        '10月结余',
        '60台×1,190.00=71,400.00元'
      ],
      [
        '11月完工',
        '100台×1,190.00=119,000.00元'
      ],
      [
        '可售合计',
        '190,400.00元'
      ],
      [
        '期末结余',
        '60台×1,190+40台×1,190=119,000.00元'
      ],
      [
        '制表',
        '李会计'
      ],
      [
        '审核',
        '赵会计主管'
      ],
    ] }]},
  { date: '2026-11-22', role: 'accountant', title: '支付广告费', tags: ["费用"], difficulty: 1, tip: '广告费入销售费用。',
    description: '支付11月推广费5,000元。',
    entries: [{ subjectCode: '660101', summary: '广告费', debit: 5000, credit: 0, explanation: '销售费增加。' }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 5000, explanation: '银行减少。' }],
    documents: [{ type: 'receipt', label: '服务发票', docTitle: '网络推广服务费发票', date: '2026-11-22', totalAmount: 5000, payer: '本公司', stampText: '百度\n发票专用章', items: [{ name: '搜索推广服务费（11月）', qty: 1, price: 5000, amount: 5000 }]}]},
  { date: '2026-11-23', role: 'accountant', title: '差旅费报销', tags: ["费用"], difficulty: 1, tip: '差旅费入管理费。',
    description: '报销差旅费2,500元。',
    entries: [{ subjectCode: '660202', summary: '差旅', debit: 2500, credit: 0, explanation: '管理费增加。' }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 2500, explanation: '银行减少。' }],
    documents: [{ type: 'receipt', label: '报销单', docTitle: '差 旅 费 报 销 单', date: '2026-11-23', totalAmount: 2500, payer: '本公司', stampText: '财务\n审核专用章', items: [{ name: '往返高铁票', qty: 2, price: 500, amount: 1000 }, { name: '住宿费（1晚）', qty: 1, price: 800, amount: 800 }, { name: '出差补贴（1天）', qty: 1, price: 200, amount: 200 }, { name: '市内交通费', qty: 1, price: 500, amount: 500 }]}]},
  { date: '2026-11-24', role: 'accountant', title: '支付水电费', tags: ["费用"], difficulty: 1, tip: '水电费入管理费。',
    description: '支付11月水电费4,500元。',
    entries: [{ subjectCode: '660208', summary: '水电费', debit: 4500, credit: 0, explanation: '管理费增加。' }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 4500, explanation: '银行减少。' }],
    documents: [{ type: 'receipt', label: '电费单', docTitle: '电 费 缴 费 凭 证', date: '2026-11-24', totalAmount: 3000, payer: '本公司', stampText: '国家电网\n电费收讫章', items: [{ name: '有功电量 3,000kWh×1.00元', qty: 3000, price: 1, amount: 3000 }]}, { type: 'receipt', label: '水费单', docTitle: '水 费 缴 费 凭 证', date: '2026-11-24', totalAmount: 1500, payer: '本公司', stampText: '自来水公司\n水费收讫章', items: [{ name: '用水量 375吨×4.00元', qty: 375, price: 4, amount: 1500 }]}]},
  { date: '2026-11-25', role: 'accountant', title: '计提工资及折旧', tags: ["工资","资产"], difficulty: 1, tip: '计提11月工资及折旧。', description: '计提11月工资90,000元及折旧625元。', entries: [{ subjectCode: '660203', summary: '计提行政部工资', debit: 25000, credit: 0, explanation: '管理费用-工资增加。' }, { subjectCode: '660103', summary: '计提销售部工资', debit: 35000, credit: 0, explanation: '销售费用增加。' }, { subjectCode: '500102', summary: '计提生产部工资', debit: 30000, credit: 0, explanation: '生产成本-直接人工增加。' }, { subjectCode: '221101', summary: '计提本月工资', debit: 0, credit: 90000, explanation: '应付职工薪酬-工资增加。' }, { subjectCode: '660205', summary: '计提折旧', debit: 625, credit: 0, explanation: '管理费用-折旧费增加。' }, { subjectCode: '1602', summary: '计提折旧', debit: 0, credit: 625, explanation: '累计折旧增加。' }], documents: [{ type: 'text', label: '11月计提表', docTitle: '11 月 计 提 计 算 表', date: '2026-11-25', stampText: '财务专用章', content: '一、工资计提：90,000元\n二、折旧计提：625元\n\n制表：李会计  审核：赵会计主管' }]},
  { date: '2026-11-26', role: 'accountant', title: '计提借款利息', tags: ["融资"], difficulty: 2, tip: '按月计提到期付息。',
    description: '计提11月利息544元。',
    entries: [{ subjectCode: '6603', summary: '利息', debit: 544, credit: 0, explanation: '财务费增加。' }, { subjectCode: '2232', summary: '应付利息', debit: 0, credit: 544, explanation: '应付增加。' }],
    documents: [{ type: 'text', label: '利息计算表', docTitle: '借 款 利 息 计 算 表', date: '2026-11-26', stampText: '财务专用章', content: '短期借款利息计算\n期间：2026年11月\n\n借款余额：150,000.00元\n年利率：4.35%\n\n本月利息 = 150,000 × 4.35% ÷ 12 = 543.75元（取整544元）\n\n制表：李会计',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年11月'
      ],
      [
        '借款余额',
        '150,000.00元'
      ],
      [
        '年利率',
        '4.35%'
      ],
      [
        '制表',
        '李会计'
      ],
    ] }]},
  { date: '2026-11-27', role: 'accountant', title: '确认投资收益', tags: ["资产"], difficulty: 2, tip: '权益法核算。',
    description: '庚公司净利润30,000元，占30%=9,000元。',
    entries: [{ subjectCode: '1501', summary: '损益调整', debit: 9000, credit: 0, explanation: '长投增加。' }, { subjectCode: '611101', summary: '投资收益', debit: 0, credit: 9000, explanation: '投资收益增加。' }],
    documents: [{ type: 'text', label: '权益法核算表', docTitle: '权 益 法 核 算 调 整 表', date: '2026-11-27', stampText: '财务专用章', content: '长期股权投资——权益法核算\n期间：2026年11月\n\n被投资单位：庚公司\n持股比例：30%\n\n庚公司11月净利润：30,000.00元\n\n本公司应确认投资收益：\n  30,000 × 30% = 9,000.00元\n\n借：长期股权投资-损益调整  9,000\n贷：投资收益              9,000\n\n制表：李会计\n审核：赵会计主管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年11月'
      ],
      [
        '被投资单位',
        '庚公司'
      ],
      [
        '持股比例',
        '30%'
      ],
      [
        '庚公司11月净利润',
        '30,000.00元'
      ],
      [
        '制表',
        '李会计'
      ],
      [
        '审核',
        '赵会计主管'
      ],
    ] }]},
  { date: '2026-11-28', role: 'accountant', title: '银行利息', tags: ["资金"], difficulty: 1, tip: '利息冲财务费用。',
    description: '11月利息5,000元，手续费300元。',
    entries: [{ subjectCode: '100201', summary: '利息', debit: 5000, credit: 0, explanation: '银行增加。' }, { subjectCode: '6603', summary: '冲财务', debit: 0, credit: 5000, explanation: '财务费减少。' }, { subjectCode: '6603', summary: '手续费', debit: 300, credit: 0, explanation: '财务费增加。' }, { subjectCode: '100201', summary: '手续费', debit: 0, credit: 300, explanation: '银行减少。' }],
    documents: [{ type: 'bank', label: '结息回单', date: '2026-11-28', totalAmount: 5000, payer: '中国工商银行', payeeName: '本公司', content: '2026年11月存款利息收入', refNo: 'HD20261128INT' }, { type: 'bank', label: '手续费回单', date: '2026-11-28', totalAmount: 300, payer: '本公司', payeeName: '中国工商银行', content: '11月转账手续费', refNo: 'HD20261128FEE' }]},
  { date: '2026-11-29', role: 'accountant', title: '计提坏账准备', tags: ["资产","期末"], difficulty: 2, tip: '按应收余额5%计提。',
    description: '计提坏账准备8,000元。',
    entries: [{ subjectCode: '6701', summary: '坏账', debit: 8000, credit: 0, explanation: '减值损失增加。' }, { subjectCode: '123101', summary: '坏账准备', debit: 0, credit: 8000, explanation: '坏账增加。' }],
    documents: [{ type: 'text', label: '减值计算表', docTitle: '坏 账 准 备 计 提 表', date: '2026-11-29', stampText: '财务专用章', content: '坏账准备计提\n期间：2026年11月\n\n应收账款期末余额：160,000.00元\n计提比例：5%\n\n计提金额：160,000 × 5% = 8,000.00元\n\n制表：李会计\n审核：赵会计主管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年11月'
      ],
      [
        '应收账款期末余额',
        '160,000.00元'
      ],
      [
        '计提比例',
        '5%'
      ],
      [
        '计提金额',
        '160,000 × 5% = 8,000.00元'
      ],
      [
        '制表',
        '李会计'
      ],
      [
        '审核',
        '赵会计主管'
      ],
    ] }]},
  { date: '2026-11-30', role: 'accountant', title: '计提附加税', tags: ["税费"], difficulty: 2, tip: '以增值税为基数。',
    description: '应纳增值税26,000-15,600=10,400，城建税728，教育附加312。',
    entries: [{ subjectCode: '6403', summary: '城建税', debit: 728, credit: 0, explanation: '税金增加。' }, { subjectCode: '222103', summary: '城建税', debit: 0, credit: 728, explanation: '应交增加。' }, { subjectCode: '6403', summary: '教育附加', debit: 312, credit: 0, explanation: '税金增加。' }, { subjectCode: '222104', summary: '教育附加', debit: 0, credit: 312, explanation: '应交增加。' }],
    documents: [{ type: 'text', label: '税费计算表', docTitle: '附 加 税 计 提 计 算 表', date: '2026-11-30', stampText: '财务专用章', content: '附加税计提计算\n期间：2026年11月\n\n计税依据：\n  销项税额：26,000.00元\n  进项税额：15,600.00元\n  应纳增值税：10,400.00元\n\n计提明细：\n  城市维护建设税（7%）：10,400×7%=728.00元\n  教育费附加（3%）：10,400×3%=312.00元\n  合计：1,040.00元\n\n制表：李会计  审核：赵会计主管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年11月'
      ],
      [
        '销项税额',
        '26,000.00元'
      ],
      [
        '进项税额',
        '15,600.00元'
      ],
      [
        '应纳增值税',
        '10,400.00元'
      ],
      [
        '城市维护建设税（7%）',
        '10,400×7%=728.00元'
      ],
      [
        '教育费附加（3%）',
        '10,400×3%=312.00元'
      ],
      [
        '合计',
        '1,040.00元'
      ],
      [
        '制表',
        '李会计  审核：赵会计主管'
      ],
    ] }]},
  { date: '2026-11-30', role: 'accountant', title: '月末期间损益结转', tags: ["期末"], difficulty: 3, tip: '收入借转，费用贷转。',
    description: '结转各损益科目至本年利润。',
    entries: [
      { subjectCode: '6001', summary: '转收入', debit: 200000, credit: 0, explanation: '收入转出。' },
      { subjectCode: '6051', summary: '转其他业务收入', debit: 12000, credit: 0, explanation: '租金收入转出。' },
      { subjectCode: '611101', summary: '转投资收益', debit: 9000, credit: 0, explanation: '投资收益转出。' },
      { subjectCode: '6401', summary: '转成本', debit: 0, credit: 134000, explanation: '成本转出。' },
      { subjectCode: '6403', summary: '转税金', debit: 0, credit: 1040, explanation: '税金转出。' },
      { subjectCode: '660101', summary: '转销售费用', debit: 0, credit: 5000, explanation: '销售费转出。' },
      { subjectCode: '6602', summary: '转管理费用', debit: 0, credit: 45000, explanation: '管理费转出。' },
      { subjectCode: '6603', summary: '转财务费用', debit: 4156, credit: 0, explanation: '财务费转出。' },
      { subjectCode: '6701', summary: '转减值损失', debit: 0, credit: 18000, explanation: '减值损失转出。' },
      { subjectCode: '6801', summary: '转所得税', debit: 0, credit: 2500, explanation: '所得税转出。' },
      { subjectCode: '4103', summary: '转本年利润', debit: 0, credit: 19616, explanation: '净利润转出。' }],
    documents: [{ type: 'text', label: '结转计算表', docTitle: '月 末 期 间 损 益 结 转 表', date: '2026-11-30', stampText: '已结转', content: '期间损益结转\n会计期间：2026年11月\n\n【收入类】→ 本年利润（贷方）\n  主营业务收入（6001）：200,000\n  其他业务收入（6051）：12,000\n  投资收益（611101）：9,000\n  财务费用（6603）：4,156（利息净收入）\n\n【费用类】→ 本年利润（借方）\n  主营业务成本（6401）：134,000\n  税金及附加（6403）：1,040\n  销售费用（660101）：5,000\n  管理费用（6602）：45,000\n  信用减值损失（6701）：18,000\n  所得税费用（6801）：2,500\n\n本年利润：\n  200,000+12,000+9,000+4,156-134,000-1,040-5,000-45,000-18,000-2,500 = 19,616元\n\n结转后各损益类科目余额为零 ✓\n\n制表：李会计\n审核：赵会计主管',
    headers: [
      '项目',
      '内容'
    ],
    rows: [
      [
        '会计期间',
        '2026年11月'
      ],
      [
        '主营业务收入（6001）',
        '200,000'
      ],
      [
        '其他业务收入（6051）',
        '12,000'
      ],
      [
        '投资收益（611101）',
        '9,000'
      ],
      [
        '财务费用（6603）',
        '4,156（利息净收入）'
      ],
      [
        '主营业务成本（6401）',
        '134,000'
      ],
      [
        '税金及附加（6403）',
        '1,040'
      ],
      [
        '销售费用（660101）',
        '5,000'
      ],
      [
        '管理费用（6602）',
        '45,000'
      ],
      [
        '信用减值损失（6701）',
        '18,000'
      ],
      [
        '所得税费用（6801）',
        '2,500'
      ],
      [
        '制表',
        '李会计'
      ],
      [
        '审核',
        '赵会计主管'
      ],
    ] }]},
  { date: '2026-11-30', role: 'accountant', title: '模拟纳税申报', tags: ["期末","申报"], difficulty: 1, tip: '每月申报是法定义务。',
    description: '完成账务处理后申报。', entries: [], nextAction: 'tax-filing',
    documents: [{ type: 'text', label: '申报提醒', docTitle: '11 月 纳 税 申 报 提 醒', stampText: '财务专用章', content: '申报期间：2026年11月\n截止日期：2026年12月15日\n\n申报税种：\n1. 增值税（11月）\n2. 城市维护建设税\n3. 教育费附加\n\n请前往纳税申报页面核对后提交。' }]},
]
export default nov
