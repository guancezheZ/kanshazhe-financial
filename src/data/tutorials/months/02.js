const feb = [
  { date: '2026-02-02', role: 'accountant', title: '发放1月员工工资', tags: ["工资"], difficulty: 2, tip: '每月10日前发上月工资。',
    description: '银行代发1月工资90,000元，代扣社保9,000元、公积金4,500元，实发76,500元。',
    entries: [{ subjectCode: '221101', summary: '发1月工资', debit: 90000, credit: 0, explanation: '应付薪酬减少。全额冲减上月计提工资。' }, { subjectCode: '100201', summary: '实发', debit: 0, credit: 76500, explanation: '银行减少。实发=90,000-9,000-4,500=76,500。' }, { subjectCode: '224101', summary: '代扣社保', debit: 0, credit: 9000, explanation: '其他应付款增加。' }, { subjectCode: '224102', summary: '代扣公积金', debit: 0, credit: 4500, explanation: '其他应付款增加。' }],
    documents: [{ type: 'bank', label: '代发工资回单', date: '2026-02-02', totalAmount: 76500, payer: '本公司', payeeName: '员工代发户', content: '1月工资代发（共6人）', refNo: 'HD202602020030' }]},
  { date: '2026-02-03', role: 'accountant', title: '缴纳上月增值税及附加税', tags: ["税费"], difficulty: 2, tip: '每月15日前完成。',
    description: '缴纳增值税20,800、城建税1,456、教育附加624。',
    entries: [{ subjectCode: '222101', summary: '增值税', debit: 20800, credit: 0, explanation: '增值税减少。' }, { subjectCode: '222103', summary: '城建税', debit: 1456, credit: 0, explanation: '城建税减少。' }, { subjectCode: '222104', summary: '教育附加', debit: 624, credit: 0, explanation: '附加减少。' }, { subjectCode: '100201', summary: '缴税', debit: 0, credit: 22880, explanation: '银行减少。' }],
    documents: [{ type: 'bank', label: '缴税回单', date: '2026-02-03', totalAmount: 22880, payer: '本公司', payeeName: '国家税务总局XX市税务局', content: '1月增值税及附加税', refNo: 'HD202602030040' }]},
  { date: '2026-02-04', role: 'accountant', title: '支付丙公司采购款', tags: ["采购","资金"], difficulty: 1, tip: '按合同账期支付。',
    description: '支付1月采购款150,000元。',
    entries: [{ subjectCode: '220201', summary: '付丙公司', debit: 150000, credit: 0, explanation: '应付减少。' }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 150000, explanation: '银行减少。' }],
    documents: [{ type: 'bank', label: '转账回单', date: '2026-02-04', totalAmount: 150000, payer: '本公司', payerAccount: '6222 0200 **** 1234', payeeName: '丙公司', payeeAccount: '6222 0100 **** 8888', content: '支付1月A型钢材货款', refNo: 'HD202602040050' }]},
  { date: '2026-02-05', role: 'accountant', title: '收到丁公司赊销款', tags: ["资金","销售"], difficulty: 1, tip: '收到前期赊销款冲应收。',
    description: '收到丁公司1月赊销货款67,800元。',
    entries: [{ subjectCode: '100201', summary: '收款', debit: 67800, credit: 0, explanation: '银行增加。' }, { subjectCode: '112202', summary: '丁公司', debit: 0, credit: 67800, explanation: '应收减少。' }],
    documents: [{ type: 'bank', label: '收款回单', date: '2026-02-05', totalAmount: 67800, payer: '丁公司', payeeName: '本公司', content: '1月赊销货款', refNo: 'HD202602050060' }]},
  { date: '2026-02-06', role: 'accountant', title: '支付房租', tags: ["费用"], difficulty: 1, tip: '房租按月支付。',
    description: '支付2月租金8,000元。',
    entries: [{ subjectCode: '660203', summary: '房租', debit: 8000, credit: 0, explanation: '管理费增加。' }, { subjectCode: '100201', summary: '付房租', debit: 0, credit: 8000, explanation: '银行减少。' }],
    documents: [{ type: 'receipt', label: '收据', docTitle: '房屋租赁专用收据', date: '2026-02-06', totalAmount: 8000, payer: '本公司', paymentMethod: '银行转账', stampText: 'XX物业管理有限公司\n财务专用章', items: [{ name: 'XX大厦801室 2月租金', qty: 1, price: 8000, amount: 8000 }]}]},
  { date: '2026-02-07', role: 'accountant', title: '设备维修费', tags: ["费用","生产"], difficulty: 2, tip: '设备检修费用化。',
    description: '支付设备检修费5,000元。',
    entries: [{ subjectCode: '660203', summary: '检修费', debit: 5000, credit: 0, explanation: '管理费增加。' }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 5000, explanation: '银行减少。' }],
    documents: [{ type: 'bank', label: '转账回单', date: '2026-02-07', totalAmount: 5000, payer: '本公司', payeeName: 'XX设备维修有限公司', content: '生产设备检修费（春节检修）', refNo: 'HD202602070070' }]},
  { date: '2026-02-08', role: 'accountant', title: '提取备用金', tags: ["资金"], difficulty: 1, tip: '备用金满足日常开支。',
    description: '提取现金3,000元。',
    entries: [{ subjectCode: '1001', summary: '备用金', debit: 3000, credit: 0, explanation: '现金增加。' }, { subjectCode: '100201', summary: '提备用金', debit: 0, credit: 3000, explanation: '银行减少。' }],
    documents: [{ type: 'bank', label: '现金支票回单', date: '2026-02-08', totalAmount: 3000, payer: '本公司', payeeName: '本公司（现金）', content: '提取备用金', refNo: 'HD202602080080' }]},
  { date: '2026-02-09', role: 'accountant', title: '生产领料', tags: ["生产"], difficulty: 2, tip: '借生产成本，贷原材料。',
    description: '领用A型钢材6吨90,000元。',
    entries: [{ subjectCode: '500101', summary: '领料', debit: 90000, credit: 0, explanation: '生产成本增加。' }, { subjectCode: '1403', summary: '领料', debit: 0, credit: 90000, explanation: '原材料减少。' }],
    documents: [{ type: 'text', label: '领料单', docTitle: '领  料  单', date: '2026-02-09', stampText: '仓库\n发料专用章', content: '领料部门：生产车间   领料单号：LL20260209003\n\n材料名称：A型钢材 Φ25mm\n数量：6吨\n单价：15,000元/吨\n金额：90,000.00元\n\n用途：生产A产品（订单PO2026002）\n\n领料人：张生产\n发料人：刘保管\n审核人：李会计',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '领料部门',
        '生产车间   领料单号：LL20260209003'
      ],
      [
        '材料名称',
        'A型钢材 Φ25mm'
      ],
      [
        '数量',
        '6吨'
      ],
      [
        '单价',
        '15,000元/吨'
      ],
      [
        '金额',
        '90,000.00元'
      ],
      [
        '用途',
        '生产A产品（订单PO2026002）'
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
  { date: '2026-02-10', role: 'accountant', title: '微信收款处理', tags: ["资金","销售"], difficulty: 2, tip: '第三方支付入其他货币资金。',
    description: '客户微信支付还款8,000元。',
    entries: [{ subjectCode: '101204', summary: '微信收款', debit: 8000, credit: 0, explanation: '其他货币资金增加。' }, { subjectCode: '112201', summary: '还款', debit: 0, credit: 8000, explanation: '应收减少。' }],
    documents: [{ type: 'text', label: '微信收款记录', docTitle: '微信商户收款记录', date: '2026-02-10', stampText: '微信商户平台', content: '交易时间：2026年2月10日 10:23:15\n交易单号：wx202602101023150001\n付款方式：微信扫码\n付款方：甲公司\n金额：8,000.00元\n交易状态：支付成功 ✓\n商户单号：M20260210001',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '交易时间',
        '2026年2月10日 10:23:15'
      ],
      [
        '交易单号',
        'wx202602101023150001'
      ],
      [
        '付款方式',
        '微信扫码'
      ],
      [
        '付款方',
        '甲公司'
      ],
      [
        '金额',
        '8,000.00元'
      ],
      [
        '交易状态',
        '支付成功 ✓'
      ],
      [
        '商户单号',
        'M20260210001'
      ],
    ] }]},
  { date: '2026-02-11', role: 'accountant', title: '采购退货', tags: ["采购"], difficulty: 2, tip: '退货分录与采购相反。',
    description: '退回不合格材料4,000元已收款。',
    entries: [{ subjectCode: '100201', summary: '退货款', debit: 4000, credit: 0, explanation: '银行增加。' }, { subjectCode: '1403', summary: '退货', debit: 0, credit: 4000, explanation: '原材料减少。' }],
    documents: [{ type: 'bank', label: '收款回单', date: '2026-02-11', totalAmount: 4000, payer: '供应商', payeeName: '本公司', content: '退货退款——B型材料不合格退回', refNo: 'HD202602110090' }]},
  { date: '2026-02-12', role: 'accountant', title: '现销商品', tags: ["销售"], difficulty: 2, tip: '借银行，贷收入、税费。',
    description: '销售60台，价款120,000，增值税15,600元。',
    entries: [{ subjectCode: '100201', summary: '销60台', debit: 135600, credit: 0, explanation: '银行增加。' }, { subjectCode: '6001', summary: '收入', debit: 0, credit: 120000, explanation: '收入增加。' }, { subjectCode: '222101', summary: '销项税', debit: 0, credit: 15600, explanation: '增值税增加。' }],
    documents: [{ type: 'invoice', label: '增值税专用发票', region: '广东', invoiceType: '专用', copy: '发票联', invoiceNo: '4400215678', date: '2026年02月12日', buyer: '乙公司', buyerTaxId: '91440101MA5XXXXXXXX', seller: '本公司', sellerTaxId: '91440101MA3XXXXXXXX', stampText: '发票专用章', payee: '李四', reviewer: '王五', drawer: '赵六', lineItems: [{ name: 'A产品', unit: '台', qty: 60, price: 2000, amount: 120000, taxRate: '13%', tax: 15600 }], totalAmount: 135600 }, { type: 'bank', label: '收款回单', date: '2026-02-12', totalAmount: 135600, payer: '乙公司', payerAccount: '6222 0100 **** 6666', payeeName: '本公司', payeeAccount: '6222 0200 **** 1234', content: '购买A产品货款及增值税', refNo: 'HD202602120100' }]},
  { date: '2026-02-13', role: 'accountant', title: '差旅费报销', tags: ["费用"], difficulty: 1, tip: '差旅费入管理费。',
    description: '报销差旅费2,500元。',
    entries: [{ subjectCode: '660202', summary: '差旅', debit: 2500, credit: 0, explanation: '管理费增加。' }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 2500, explanation: '银行减少。' }],
    documents: [{ type: 'receipt', label: '报销单', docTitle: '差 旅 费 报 销 单', date: '2026-02-13', totalAmount: 2500, payer: '本公司', stampText: '财务\n审核专用章', items: [{ name: '交通费', qty: 1, price: 1200, amount: 1200 }, { name: '住宿费', qty: 1, price: 800, amount: 800 }, { name: '餐补', qty: 1, price: 500, amount: 500 }]}]},
  { date: '2026-02-14', role: 'accountant', title: '生产领料-辅助材料', tags: ["生产"], difficulty: 2, tip: '辅助材料入制造费用。',
    description: '领用辅助材料4,000元。',
    entries: [{ subjectCode: '5101', summary: '辅料', debit: 4000, credit: 0, explanation: '制造费用增加。' }, { subjectCode: '1403', summary: '辅料', debit: 0, credit: 4000, explanation: '原材料减少。' }],
    documents: [{ type: 'text', label: '领料单', docTitle: '领  料  单', date: '2026-02-14', stampText: '仓库\n发料专用章', content: '领料部门：生产车间   领料单号：LL20260214004\n\n材料名称：B型材料\n数量：2批\n金额：4,000.00元\n\n用途：机物料消耗（设备维护）\n\n领料人：张生产\n发料人：刘保管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '领料部门',
        '生产车间   领料单号：LL20260214004'
      ],
      [
        '材料名称',
        'B型材料'
      ],
      [
        '数量',
        '2批'
      ],
      [
        '金额',
        '4,000.00元'
      ],
      [
        '用途',
        '机物料消耗（设备维护）'
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
  { date: '2026-02-15', role: 'accountant', title: '支付水电费', tags: ["费用"], difficulty: 1, tip: '水电费入管理费。',
    description: '支付2月电费2,800元、水费900元，合计3,700元。',
    entries: [{ subjectCode: '660203', summary: '水电费', debit: 3700, credit: 0, explanation: '管理费增加。' }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 3700, explanation: '银行减少。' }],
    documents: [{ type: 'receipt', label: '电费单', docTitle: '电 费 缴 费 凭 证', date: '2026-02-15', totalAmount: 2800, payer: '本公司', stampText: '国家电网\n电费收讫章', items: [{ name: '有功电量 2,800kWh×1.00元', qty: 2800, price: 1, amount: 2800 }]}, { type: 'receipt', label: '水费单', docTitle: '水 费 缴 费 凭 证', date: '2026-02-15', totalAmount: 900, payer: '本公司', stampText: '自来水公司\n水费收讫章', items: [{ name: '用水量 225吨×4.00元', qty: 225, price: 4, amount: 900 }]}]},
  { date: '2026-02-16', role: 'accountant', title: '直接人工归集', tags: ["生产"], difficulty: 2, tip: '人工计入生产成本。',
    description: '生产工人工资35,000元。',
    entries: [{ subjectCode: '500102', summary: '人工', debit: 35000, credit: 0, explanation: '生产成本增加。' }, { subjectCode: '221101', summary: '计提', debit: 0, credit: 35000, explanation: '应付薪酬增加。' }],
    documents: [{ type: 'text', label: '工资计算表', docTitle: '直 接 人 工 费 用 分 配 表', date: '2026-02-16', stampText: '人力资源部\n工资专用章', content: '直接人工费用分配\n期间：2026年2月\n\n生产车间直接生产工人工资：35,000.00元\n\n工时统计：\n  A产品生产工时：2,500小时\n\n分配计算：\n  工资分配率 = 35,000 ÷ 2,500 = 14.00元/小时\n  计入生产成本-直接人工：35,000.00元\n\n制表：王出纳\n审核：李会计\n批准：赵总',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年2月'
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
  { date: '2026-02-17', role: 'accountant', title: '制造费用归集', tags: ["生产"], difficulty: 2, tip: '归集车间间接成本。',
    description: '归集制造费用9,000元（折旧2,000+水电3,000+辅料4,000）。',
    entries: [{ subjectCode: '5101', summary: '归集', debit: 5000, credit: 0, explanation: '制造费用增加。' }, { subjectCode: '1602', summary: '折旧', debit: 0, credit: 2000, explanation: '折旧增加。' }, { subjectCode: '100201', summary: '车间水电', debit: 0, credit: 3000, explanation: '银行减少。' }],
    documents: [{ type: 'text', label: '费用归集表', docTitle: '制 造 费 用 归 集 表', date: '2026-02-17', stampText: '财务专用章', content: '制造费用归集\n期间：2026年2月\n\n费用项目：\n1. 折旧费——机器设备：2,000.00元\n2. 车间水电费：3,000.00元\n3. 辅助材料（机物料）：4,000.00元（已另单领用）\n\n归集总额：9,000.00元\n\n制表：李会计\n审核：赵会计主管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年2月'
      ],
      [
        '归集总额',
        '9,000.00元'
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
  { date: '2026-02-18', role: 'accountant', title: '制造费用分配', tags: ["生产"], difficulty: 2, tip: '分配后余额归零。',
    description: '分配9,000元至生产成本。',
    entries: [{ subjectCode: '500103', summary: '分配', debit: 9000, credit: 0, explanation: '生产成本增加。' }, { subjectCode: '5101', summary: '分配', debit: 0, credit: 9000, explanation: '制造费用归零。' }],
    documents: [{ type: 'text', label: '分配表', docTitle: '制 造 费 用 分 配 表', date: '2026-02-18', stampText: '财务专用章', content: '制造费用分配\n期间：2026年2月\n\n待分配制造费用总额：9,000.00元\n\n分配标准：生产工时\n总工时：2,500小时\n\n分配率：9,000 ÷ 2,500 = 3.60元/小时\n\n分配入生产成本-制造费用：9,000.00元\n\n分配后制造费用余额：0.00元 ✓\n\n制表：李会计\n审核：赵会计主管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年2月'
      ],
      [
        '待分配制造费用总额',
        '9,000.00元'
      ],
      [
        '分配标准',
        '生产工时'
      ],
      [
        '总工时',
        '2,500小时'
      ],
      [
        '分配率',
        '9,000 ÷ 2,500 = 3.60元/小时'
      ],
      [
        '分配入生产成本-制造费用',
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
  { date: '2026-02-19', role: 'accountant', title: '采购A型钢材（赊购）', tags: ["采购"], difficulty: 1, tip: '赊购不涉及现金。',
    description: '采购A型钢材10吨150,000元。',
    entries: [{ subjectCode: '1403', summary: '采购', debit: 150000, credit: 0, explanation: '原材料增加。' }, { subjectCode: '220201', summary: '应付', debit: 0, credit: 150000, explanation: '应付增加。' }],
    documents: [{ type: 'text', label: '入库单', docTitle: '收  料  单', date: '2026-02-19', stampText: '仓库\n验收专用章', content: '供应商：丙公司\n入库日期：2026-02-19\n\n材料名称：A型钢材 Φ25mm\n数量：10吨\n单价：15,000元/吨\n金额：150,000.00元\n\n检验：合格 ✓\n保管：刘保管',
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
        '2026-02-19'
      ],
      [
        '材料名称',
        'A型钢材 Φ25mm'
      ],
      [
        '数量',
        '10吨'
      ],
      [
        '单价',
        '15,000元/吨'
      ],
      [
        '金额',
        '150,000.00元'
      ],
      [
        '检验',
        '合格 ✓'
      ],
      [
        '保管',
        '刘保管'
      ],
    ] }]},
  { date: '2026-02-20', role: 'accountant', title: '暂估入库', tags: ["采购"], difficulty: 3, tip: '货到票未到暂估入账。',
    description: 'C型材料5吨暂估90,000元。',
    entries: [{ subjectCode: '1403', summary: '暂估', debit: 90000, credit: 0, explanation: '原材料增加。' }, { subjectCode: '220203', summary: '暂估应付', debit: 0, credit: 90000, explanation: '暂估增加。' }],
    documents: [{ type: 'text', label: '暂估入库单', docTitle: '暂 估 入 库 单', date: '2026-02-20', stampText: '仓库\n验收专用章', content: '供应商：丁公司\n入库日期：2026-02-20\n\n材料名称：C型材料\n数量：5吨\n暂估单价：18,000元/吨\n暂估金额：90,000.00元\n\n说明：货到票未到，按合同价暂估入账\n\n保管：刘保管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '供应商',
        '丁公司'
      ],
      [
        '入库日期',
        '2026-02-20'
      ],
      [
        '材料名称',
        'C型材料'
      ],
      [
        '数量',
        '5吨'
      ],
      [
        '暂估单价',
        '18,000元/吨'
      ],
      [
        '暂估金额',
        '90,000.00元'
      ],
      [
        '说明',
        '货到票未到，按合同价暂估入账'
      ],
      [
        '保管',
        '刘保管'
      ],
    ] }]},
  { date: '2026-02-21', role: 'accountant', title: '现金折扣', tags: ["销售"], difficulty: 3, tip: '折扣计入财务费用。',
    description: '客户提前付款享折扣600元，实收33,300元。',
    entries: [{ subjectCode: '100201', summary: '收款', debit: 33300, credit: 0, explanation: '银行增加。' }, { subjectCode: '6603', summary: '折扣', debit: 600, credit: 0, explanation: '财务费增加。' }, { subjectCode: '112202', summary: '应收减少', debit: 0, credit: 33900, explanation: '应收减少。' }],
    documents: [{ type: 'bank', label: '收款回单', date: '2026-02-21', totalAmount: 33300, payer: '庚公司', payeeName: '本公司', content: '货款（现金折扣后金额）', refNo: 'HD202602210110' }, { type: 'text', label: '折扣计算', docTitle: '现 金 折 扣 计 算 说 明', date: '2026-02-21', stampText: '财务专用章', content: '销售合同条款：2/10, n/30\n\n应收账款余额：33,900.00元\n  价款：30,000.00元\n  增值税：3,900.00元（13%）\n\n折扣计算：\n  折扣基数：货款30,000.00元\n  折扣率：2%\n  折扣金额：600.00元\n\n实际收款：33,900 - 600 = 33,300.00元',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '销售合同条款',
        '2/10, n/30'
      ],
      [
        '应收账款余额',
        '33,900.00元'
      ],
      [
        '价款',
        '30,000.00元'
      ],
      [
        '增值税',
        '3,900.00元（13%）'
      ],
      [
        '折扣基数',
        '货款30,000.00元'
      ],
      [
        '折扣率',
        '2%'
      ],
      [
        '折扣金额',
        '600.00元'
      ],
      [
        '实际收款',
        '33,900 - 600 = 33,300.00元'
      ],
    ] }]},
  { date: '2026-02-22', role: 'accountant', title: '支付广告费', tags: ["费用"], difficulty: 1, tip: '广告费入销售费用。',
    description: '支付2月广告费5,000元。',
    entries: [{ subjectCode: '660101', summary: '广告费', debit: 5000, credit: 0, explanation: '销售费增加。' }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 5000, explanation: '银行减少。' }],
    documents: [{ type: 'receipt', label: '服务发票', docTitle: '网络推广服务费发票', date: '2026-02-22', totalAmount: 5000, payer: '本公司', stampText: '百度\n发票专用章', items: [{ name: '搜索推广服务费（2月）', qty: 1, price: 5000, amount: 5000 }]}]},
  { date: '2026-02-23', role: 'accountant', title: '完工产品入库', tags: ["生产"], difficulty: 2, tip: '借库存，贷生产成本。',
    description: '100台完工，成本134,000元。',
    entries: [{ subjectCode: '1405', summary: '完工', debit: 134000, credit: 0, explanation: '库存增加。' }, { subjectCode: '500101', summary: '材料', debit: 0, credit: 90000, explanation: '生产转出。' }, { subjectCode: '500102', summary: '人工', debit: 0, credit: 35000, explanation: '生产转出。' }, { subjectCode: '500103', summary: '制造费用', debit: 0, credit: 9000, explanation: '生产转出。' }],
    documents: [{ type: 'text', label: '入库单', docTitle: '产 品 入 库 单', date: '2026-02-23', stampText: '仓库\n验收专用章', content: '入库部门：生产车间   入库单号：RK20260223002\n\n产品名称：A产品\n规格型号：标准型\n\n完工数量：100台\n\n成本构成：\n  直接材料：90,000.00元\n  直接人工：35,000.00元\n  制造费用：9,000.00元\n━━━━━━━━━━━━━━━━━━━━━\n  总成本：134,000.00元\n  单位成本：1,340.00元/台\n\n质检结论：合格 ✓\n\n仓库验收：刘保管\n质量检验：陈检验',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '入库部门',
        '生产车间   入库单号：RK20260223002'
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
        '90,000.00元'
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
        '134,000.00元'
      ],
      [
        '单位成本',
        '1,340.00元/台'
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
  { date: '2026-02-24', role: 'accountant', title: '结转销售成本', tags: ["生产","成本"], difficulty: 3, tip: '先进先出法。',
    description: '结转60台成本76,900元。',
    entries: [{ subjectCode: '6401', summary: '结转成本', debit: 76900, credit: 0, explanation: '主营成本增加。' }, { subjectCode: '1405', summary: '转成本', debit: 0, credit: 76900, explanation: '库存减少。' }],
    documents: [{ type: 'text', label: '成本计算表', docTitle: '销 售 成 本 计 算 表', date: '2026-02-24', stampText: '财务专用章', content: '销售成本计算（先进先出法）\n期间：2026年2月\n\n本月销售数量：60台\n\n库存明细：\n  1月结余：20台 × 1,165.00 = 23,300.00元\n  2月新品：40台 × 1,340.00 = 53,600.00元\n\n本期结转：\n  优先发出1月库存：20台×1,165=23,300\n  再发2月新品：40台×1,340=53,600\n━━━━━━━━━━━━━━━━━━━━━━━━━\n  合计：76,900.00元\n\n制表：李会计\n审核：赵会计主管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年2月'
      ],
      [
        '本月销售数量',
        '60台'
      ],
      [
        '1月结余',
        '20台 × 1,165.00 = 23,300.00元'
      ],
      [
        '2月新品',
        '40台 × 1,340.00 = 53,600.00元'
      ],
      [
        '优先发出1月库存',
        '20台×1,165=23,300'
      ],
      [
        '再发2月新品',
        '40台×1,340=53,600'
      ],
      [
        '合计',
        '76,900.00元'
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
  { date: '2026-02-25', role: 'accountant', title: '银行利息', tags: ["资金"], difficulty: 1, tip: '利息冲财务费用。',
    description: '收到2月利息7,500元。',
    entries: [{ subjectCode: '100201', summary: '利息', debit: 7500, credit: 0, explanation: '银行增加。' }, { subjectCode: '6603', summary: '冲财务', debit: 0, credit: 7500, explanation: '财务费减少。' }],
    documents: [{ type: 'bank', label: '利息入账回单', date: '2026-02-25', totalAmount: 7500, payer: '中国工商银行', payeeName: '本公司', content: '2026年2月存款利息收入', refNo: 'HD20260225INT' }]},
  { date: '2026-02-26', role: 'accountant', title: '银行手续费及借款利息', tags: ["资金","融资"], difficulty: 2, tip: '手续费和利息入财务费用。',
    description: '手续费300元，借款利息544元。',
    entries: [{ subjectCode: '6603', summary: '手续费', debit: 300, credit: 0, explanation: '财务费增加。' }, { subjectCode: '100201', summary: '手续费', debit: 0, credit: 300, explanation: '银行减少。' }, { subjectCode: '6603', summary: '借款利息', debit: 544, credit: 0, explanation: '财务费增加。' }, { subjectCode: '2232', summary: '应付利息', debit: 0, credit: 544, explanation: '应付增加。' }],
    documents: [{ type: 'bank', label: '银行扣费回单', date: '2026-02-26', totalAmount: 300, payer: '本公司', payeeName: '中国工商银行', content: '转账手续费及账户维护费', refNo: 'HD20260226FEE' }, { type: 'text', label: '利息计算表', docTitle: '借 款 利 息 计 算 表', date: '2026-02-26', stampText: '财务专用章', content: '短期借款利息计算\n期间：2026年2月\n\n借款余额：150,000.00元\n年利率：4.35%\n\n本月利息 = 150,000 × 4.35% ÷ 12\n          ≈ 543.75元（取整544元）\n\n制表：李会计',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年2月'
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
  { date: '2026-02-27', role: 'accountant', title: '计提工资及折旧', tags: ["工资","资产"], difficulty: 1, tip: '计提2月工资并计提折旧。',
    description: '计提2月工资90,000元（行政部25,000、销售部35,000、生产部30,000），同时计提本月电脑折旧125元。',
    entries: [{ subjectCode: '660203', summary: '计提行政部工资', debit: 25000, credit: 0, explanation: '管理费用-工资增加。行政部工资计入当期损益。' }, { subjectCode: '660103', summary: '计提销售部工资', debit: 35000, credit: 0, explanation: '销售费用增加。销售部工资计入销售费用。' }, { subjectCode: '500102', summary: '计提生产部工资', debit: 30000, credit: 0, explanation: '生产成本-直接人工增加。生产部工资计入生产成本。' }, { subjectCode: '221101', summary: '计提本月工资', debit: 0, credit: 90000, explanation: '应付职工薪酬-工资增加。计提形成对员工的负债。' }, { subjectCode: '660205', summary: '计提电脑折旧', debit: 125, credit: 0, explanation: '管理费用-折旧费增加。联想台式电脑本月折旧=4,500÷36=125元。' }, { subjectCode: '1602', summary: '计提电脑折旧', debit: 0, credit: 125, explanation: '累计折旧增加。固定资产因使用损耗价值减少。' }], documents: [{ type: 'text', label: '工资计算表', docTitle: '2 月 工 资 计 算 表', date: '2026-02-27', stampText: '财务专用章', content: '期间：2026年2月\n\n行政部（2人）：25,000元\n销售部（2人）：35,000元\n生产部（2人）：30,000元\n\n应发合计：90,000元\n\n制表：李会计  审核：赵会计主管' }, { type: 'text', label: '折旧计算表', docTitle: '2 月 折 旧 计 算 表', date: '2026-02-27', stampText: '财务专用章', content: '资产：联想台式电脑\n原值：4,500.00元\n残值：0元\n使用月数：36个月\n月折旧额：4,500÷36=125.00元\n\n折旧方法：年限平均法（直线法）\n开始计提：2026年2月' }]},
  { date: '2026-02-28', role: 'accountant', title: '核对折旧计提', tags: ["资产"], difficulty: 1, tip: '首次折旧已计提完毕。', description: '确认2月折旧已正确计提。联想台式电脑首次计提折旧125元，累计折旧余额125元。', entries: [], documents: [{ type: 'text', label: '折旧确认单', docTitle: '2 月 折 旧 确 认 单', date: '2026-02-28', stampText: '财务专用章', content: '本月计提折旧：125.00元\n累计折旧余额：125.00元\n\n核对无误。' }]},
  { date: '2026-02-28', role: 'accountant', title: '计提附加税', tags: ["税费"], difficulty: 2, tip: '以增值税为基数。',
    description: '应纳增值税15,600，城建税1,092，教育附加468。',
    entries: [{ subjectCode: '6403', summary: '城建税', debit: 1092, credit: 0, explanation: '税金增加。' }, { subjectCode: '222103', summary: '城建税', debit: 0, credit: 1092, explanation: '应交增加。' }, { subjectCode: '6403', summary: '教育附加', debit: 468, credit: 0, explanation: '税金增加。' }, { subjectCode: '222104', summary: '教育附加', debit: 0, credit: 468, explanation: '应交增加。' }],
    documents: [{ type: 'text', label: '税费计算表', docTitle: '附 加 税 计 提 计 算 表', date: '2026-02-28', stampText: '财务专用章', content: '附加税计提计算\n期间：2026年2月\n\n计税依据：\n  增值税销项税额：15,600.00元\n  进项税额：0元（本月无采购进项）\n  应纳增值税：15,600.00元\n\n计提明细：\n  城市维护建设税（7%）：15,600×7%=1,092.00元\n  教育费附加（3%）：15,600×3%=468.00元\n  合计：1,560.00元\n\n政策依据：《城市维护建设税法》\n制表：李会计  审核：赵会计主管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年2月'
      ],
      [
        '增值税销项税额',
        '15,600.00元'
      ],
      [
        '进项税额',
        '0元（本月无采购进项）'
      ],
      [
        '应纳增值税',
        '15,600.00元'
      ],
      [
        '城市维护建设税（7%）',
        '15,600×7%=1,092.00元'
      ],
      [
        '教育费附加（3%）',
        '15,600×3%=468.00元'
      ],
      [
        '合计',
        '1,560.00元'
      ],
      [
        '政策依据',
        '《城市维护建设税法》'
      ],
      [
        '制表',
        '李会计  审核：赵会计主管'
      ],
    ] }]},
  { date: '2026-02-28', role: 'accountant', title: '月末期间损益结转', tags: ["期末"], difficulty: 3, tip: '收入借转，费用贷转。',
    description: '结转各损益科目至本年利润。',
    entries: [
      { subjectCode: '6001', summary: '转收入', debit: 120000, credit: 0, explanation: '收入转出。本月收入120,000元。' },
      { subjectCode: '6401', summary: '转成本', debit: 0, credit: 76900, explanation: '成本转出。COGS 76,900元。' },
      { subjectCode: '6403', summary: '转税金', debit: 0, credit: 1560, explanation: '税金转出。1,560元。' },
      { subjectCode: '660203', summary: '转管理费用', debit: 0, credit: 14200, explanation: '管理费转出。14,200元。' },
      { subjectCode: '6603', summary: '转财务费用', debit: 6656, credit: 0, explanation: '财务费转出。利息净收入6,656元。' },
      { subjectCode: '4103', summary: '转本年利润', debit: 0, credit: 33996, explanation: '净利润转出。33,996元。' }],
    documents: [{ type: 'text', label: '结转计算表', docTitle: '期 间 损 益 结 转 表', date: '2026-02-28', stampText: '已结转', content: '期间损益结转\n会计期间：2026年2月\n\n【损益科目余额】\n  主营业务收入（6001）：120,000（贷）\n  主营业务成本（6401）：76,900（借）\n  税金及附加（6403）：1,560（借）\n  管理费用（6602）：14,200（借）\n  财务费用（6603）：6,656（贷）——利息净收入\n\n【结转分录】\n  借：主营业务收入    120,000\n      财务费用          6,656\n    贷：主营业务成本     76,900\n        税金及附加        1,560\n        管理费用         14,200\n        本年利润         33,996\n\n【本月净利润】：33,996元\n\n结转后各损益类科目余额为零 ✓\n\n制表：李会计\n审核：赵会计主管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '会计期间',
        '2026年2月'
      ],
      [
        '主营业务收入（6001）',
        '120,000（贷）'
      ],
      [
        '主营业务成本（6401）',
        '76,900（借）'
      ],
      [
        '税金及附加（6403）',
        '1,560（借）'
      ],
      [
        '管理费用（6602）',
        '14,200（借）'
      ],
      [
        '财务费用（6603）',
        '6,656（贷）——利息净收入'
      ],
      [
        '【本月净利润】',
        '33,996元'
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
  { date: '2026-02-28', role: 'accountant', title: '模拟纳税申报', tags: ["期末","申报"], difficulty: 1, tip: '每月申报是法定义务。',
    description: '完成账务处理后申报。', entries: [], nextAction: 'tax-filing',
    documents: [{ type: 'text', label: '申报提醒', docTitle: '2 月 纳 税 申 报 提 醒', stampText: '财务专用章', content: '申报期间：2026年2月\n截止日期：2026年3月15日\n\n申报税种：\n1. 增值税（2月）\n2. 城市维护建设税\n3. 教育费附加\n\n请前往纳税申报页面核对数据后提交。' }]},
]
export default feb
