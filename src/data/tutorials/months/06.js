const jun = [
  { date: '2026-06-01', role: 'accountant', title: '缴纳5月增值税及附加税', tags: ["税费"], difficulty: 2, tip: '每月15日前完成。', description: '缴纳增值税36,400、城建税2,548、教育费附加1,092元。',
    entries: [{ subjectCode: '222101', summary: '增值税', debit: 36400, credit: 0, explanation: '增值税减少。' }, { subjectCode: '222103', summary: '城建税', debit: 2548, credit: 0, explanation: '城建税减少。' }, { subjectCode: '222104', summary: '教育附加', debit: 1092, credit: 0, explanation: '附加减少。' }, { subjectCode: '100201', summary: '缴税', debit: 0, credit: 40040, explanation: '银行减少。' }],
    documents: [{ type: 'bank', label: '缴税回单', date: '2026-06-01', totalAmount: 40040, payer: '本公司', payeeName: 'XX市税务局', content: '5月增值税及附加税', refNo: 'HD202606010010' }]},
  { date: '2026-06-02', role: 'accountant', title: '发放5月员工工资', tags: ["工资"], difficulty: 2, tip: '每月10日前发上月工资。', description: '银行代发5月工资，实发76,500元。',
    entries: [{ subjectCode: '221101', summary: '发5月工资', debit: 90000, credit: 0, explanation: '应付薪酬减少。' }, { subjectCode: '100201', summary: '实发', debit: 0, credit: 76500, explanation: '银行减少。' }, { subjectCode: '224101', summary: '代扣社保', debit: 0, credit: 9000, explanation: '其他应付款增加。' }, { subjectCode: '224102', summary: '代扣公积金', debit: 0, credit: 4500, explanation: '其他应付款增加。' }],
    documents: [{ type: 'bank', label: '代发工资回单', date: '2026-06-02', totalAmount: 76500, payer: '本公司', payerAccount: '6222 0200 **** 1234', payeeName: '员工代发户', content: '5月工资代发（共6人）', refNo: 'HD202606020020' }]},
  { date: '2026-06-03', role: 'accountant', title: '暂估入库冲回', tags: ["采购"], difficulty: 3, tip: '暂估入库次月必须冲回。', description: '2月暂估C型材料90,000元收到发票，实际92,000元。',
    entries: [{ subjectCode: '1403', summary: '冲回暂估', debit: 0, credit: 90000, explanation: '冲回原暂估。' }, { subjectCode: '220203', summary: '冲暂估应付', debit: 90000, credit: 0, explanation: '冲回暂估。' }, { subjectCode: '1403', summary: '按发票入账', debit: 92000, credit: 0, explanation: '原材料增加。' }, { subjectCode: '222101', summary: '进项税', debit: 11960, credit: 0, explanation: '进项增加。' }, { subjectCode: '220201', summary: '应付丁公司', debit: 0, credit: 103960, explanation: '应付增加。' }],
    documents: [{ type: 'text', label: '冲回说明', docTitle: '暂 估 入 库 冲 回 说 明', date: '2026-06-03', stampText: '财务专用章', content: '暂估入库冲回处理\n期间：2026年6月\n\n原暂估入库（2月）：\n  材料名称：C型材料\n  暂估金额：90,000.00元\n  暂估科目：应付账款-暂估\n\n收到发票后处理：\n  1. 冲回原暂估：借原材料 -90,000 贷应付-暂估 -90,000\n  2. 按发票入账：\n     原材料：92,000.00元\n     增值税进项：11,960.00元（92,000×13%）\n     应付丁公司：103,960.00元\n\n制表：李会计\n审核：赵会计主管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年6月'
      ],
      [
        '材料名称',
        'C型材料'
      ],
      [
        '暂估金额',
        '90,000.00元'
      ],
      [
        '暂估科目',
        '应付账款-暂估'
      ],
      [
        '原材料',
        '92,000.00元'
      ],
      [
        '增值税进项',
        '11,960.00元（92,000×13%）'
      ],
      [
        '应付丁公司',
        '103,960.00元'
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
  { date: '2026-06-04', role: 'accountant', title: '支付供应商货款', tags: ["采购","资金"], difficulty: 1, tip: '按合同账期支付。', description: '支付丙公司采购款135,600元。',
    entries: [{ subjectCode: '220201', summary: '付丙公司', debit: 135600, credit: 0, explanation: '应付减少。' }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 135600, explanation: '银行减少。' }],
    documents: [{ type: 'bank', label: '转账回单', date: '2026-06-04', totalAmount: 135600, payer: '本公司', payerAccount: '6222 0200 **** 1234', payeeName: '丙公司', payeeAccount: '6222 0200 **** 8888', content: '支付5月采购款', refNo: 'HD202606040030' }]},
  { date: '2026-06-05', role: 'accountant', title: '采购原材料', tags: ["采购"], difficulty: 2, tip: '进项税可抵扣。', description: '采购A型钢材10吨，价款150,000，增值税19,500，未付。',
    entries: [{ subjectCode: '1403', summary: '采购', debit: 150000, credit: 0, explanation: '原材料增加。' }, { subjectCode: '222101', summary: '进项税', debit: 19500, credit: 0, explanation: '进项增加。' }, { subjectCode: '220201', summary: '应付丙公司', debit: 0, credit: 169500, explanation: '应付增加。' }],
    documents: [{ type: 'text', label: '入库单', docTitle: '收  料  单', date: '2026-06-05', stampText: '仓库\n验收专用章', content: '供应商：丙公司\n入库日期：2026-06-05\n\n材料名称：A型钢材 Φ25mm\n数量：10吨\n单价：15,000元/吨\n金额：150,000.00元\n\n增值税进项税额：19,500.00元（13%）\n\n检验结果：合格 ✓\n保管员：刘保管\n验收员：陈检验',
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
        '2026-06-05'
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
        '增值税进项税额',
        '19,500.00元（13%）'
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
  { date: '2026-06-06', role: 'accountant', title: '支付房租', tags: ["费用"], difficulty: 1, tip: '房租按月支付。', description: '支付6月租金8,000元。',
    entries: [{ subjectCode: '6602', summary: '房租', debit: 8000, credit: 0, explanation: '管理费增加。' }, { subjectCode: '100201', summary: '付房租', debit: 0, credit: 8000, explanation: '银行减少。' }],
    documents: [{ type: 'receipt', label: '收据', docTitle: '房屋租赁专用收据', date: '2026-06-06', totalAmount: 8000, payer: '本公司', paymentMethod: '银行转账', stampText: 'XX物业管理有限公司\n财务专用章', receiver: '王XX', items: [{ name: 'XX大厦801室 6月租金', qty: 1, price: 8000, amount: 8000 }]}]},
  { date: '2026-06-07', role: 'accountant', title: '提取备用金', tags: ["资金"], difficulty: 1, tip: '备用金满足日常开支。', description: '提取现金3,000元。',
    entries: [{ subjectCode: '1001', summary: '备用金', debit: 3000, credit: 0, explanation: '现金增加。' }, { subjectCode: '100201', summary: '提备用金', debit: 0, credit: 3000, explanation: '银行减少。' }],
    documents: [{ type: 'bank', label: '现金支票回单', date: '2026-06-07', totalAmount: 3000, payer: '本公司', payerAccount: '6222 0200 **** 1234', payeeName: '本公司（现金）', content: '提取备用金', refNo: 'HD202606070040' }]},
  { date: '2026-06-08', role: 'accountant', title: '生产领料', tags: ["生产"], difficulty: 2, tip: '借生产成本，贷原材料。', description: '领用A型钢材6吨，合计90,000元。',
    entries: [{ subjectCode: '500101', summary: '领料', debit: 90000, credit: 0, explanation: '生产成本增加。' }, { subjectCode: '1403', summary: '领料', debit: 0, credit: 90000, explanation: '原材料减少。' }],
    documents: [{ type: 'text', label: '领料单', docTitle: '领  料  单', date: '2026-06-08', stampText: '仓库\n发料专用章', content: '领用部门：生产车间   领料单号：LL20260608009\n\n材料名称：A型钢材 Φ25mm\n规格：25mm\n数量：6吨\n单价：15,000元/吨\n金额：90,000.00元\n\n用途：生产A产品（订单号PO2026006）\n\n领料人：张生产\n发料人：刘保管\n审核人：李会计',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '领用部门',
        '生产车间   领料单号：LL20260608009'
      ],
      [
        '材料名称',
        'A型钢材 Φ25mm'
      ],
      [
        '规格',
        '25mm'
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
        '生产A产品（订单号PO2026006）'
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
  { date: '2026-06-09', role: 'accountant', title: '直接人工归集', tags: ["生产"], difficulty: 2, tip: '人工计入生产成本。', description: '生产工人工资35,000元。',
    entries: [{ subjectCode: '500102', summary: '人工', debit: 35000, credit: 0, explanation: '生产成本增加。' }, { subjectCode: '221101', summary: '计提工资', debit: 0, credit: 35000, explanation: '应付薪酬增加。' }],
    documents: [{ type: 'text', label: '工资计算表', docTitle: '直 接 人 工 费 用 分 配 表', date: '2026-06-09', stampText: '人力资源部\n工资专用章', content: '直接人工费用分配\n期间：2026年6月\n\n生产车间直接生产工人工资：35,000.00元\n\n工时统计：\n  A产品生产工时：2,500小时\n\n分配计算：\n  工资分配率 = 35,000 ÷ 2,500 = 14.00元/小时\n  计入生产成本-直接人工：35,000.00元\n\n制表：王出纳\n审核：李会计\n批准：赵总',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年6月'
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
  { date: '2026-06-10', role: 'accountant', title: '现销商品', tags: ["销售"], difficulty: 2, tip: '借银行，贷收入、税费。', description: '销售100台，价款200,000元，增值税26,000元。',
    entries: [{ subjectCode: '100201', summary: '销100台', debit: 226000, credit: 0, explanation: '银行增加。' }, { subjectCode: '6001', summary: '收入', debit: 0, credit: 200000, explanation: '收入增加。' }, { subjectCode: '222101', summary: '销项税', debit: 0, credit: 26000, explanation: '增值税增加。' }],
    documents: [{ type: 'invoice', label: '增值税专用发票', region: '广东', invoiceType: '专用', copy: '发票联', invoiceNo: '4400612345', date: '2026年06月10日', buyer: '乙公司', buyerTaxId: '91440101MA5XXXXXXXX', seller: '本公司', sellerTaxId: '91440101MA3XXXXXXXX', stampText: '发票专用章', payee: '李四', reviewer: '王五', drawer: '赵六', lineItems: [{ name: 'A产品', unit: '台', qty: 100, price: 2000, amount: 200000, taxRate: '13%', tax: 26000 }], totalAmount: 226000 }, { type: 'bank', label: '收款回单', date: '2026-06-10', totalAmount: 226000, payer: '乙公司', payerAccount: '6222 0100 **** 6666', payeeName: '本公司', payeeAccount: '6222 0200 **** 1234', content: '购买A产品货款及增值税', refNo: 'HD202606100080' }]},
  { date: '2026-06-11', role: 'accountant', title: '赊销商品', tags: ["销售"], difficulty: 2, tip: '借应收，贷收入、税费。', description: '向庚公司赊销60台，合计135,600元未收。',
    entries: [{ subjectCode: '112202', summary: '赊销', debit: 135600, credit: 0, explanation: '应收增加。' }, { subjectCode: '6001', summary: '收入', debit: 0, credit: 120000, explanation: '收入增加。' }, { subjectCode: '222101', summary: '销项税', debit: 0, credit: 15600, explanation: '增值税增加。' }],
    documents: [{ type: 'invoice', label: '增值税专用发票', region: '广东', invoiceType: '专用', copy: '发票联', invoiceNo: '4400678901', date: '2026年06月11日', buyer: '庚公司', buyerTaxId: '91440101MA0GGGGGGG', seller: '本公司', sellerTaxId: '91440101MA3XXXXXXXX', stampText: '发票专用章', payee: '李四', reviewer: '王五', drawer: '赵六', lineItems: [{ name: 'A产品', unit: '台', qty: 60, price: 2000, amount: 120000, taxRate: '13%', tax: 15600 }], totalAmount: 135600 }]},
  { date: '2026-06-12', role: 'accountant', title: '支付广告费', tags: ["费用"], difficulty: 1, tip: '广告费计入销售费用。', description: '支付6月推广费5,000元。',
    entries: [{ subjectCode: '660101', summary: '广告费', debit: 5000, credit: 0, explanation: '销售费增加。' }, { subjectCode: '100201', summary: '付广告费', debit: 0, credit: 5000, explanation: '银行减少。' }],
    documents: [{ type: 'receipt', label: '服务发票', docTitle: '网络推广服务费发票', date: '2026-06-12', totalAmount: 5000, payer: '本公司', stampText: '百度\n发票专用章', items: [{ name: '搜索推广服务费（6月）', qty: 1, price: 5000, amount: 5000 }]}]},
  { date: '2026-06-13', role: 'accountant', title: '差旅费报销', tags: ["费用"], difficulty: 1, tip: '差旅费入管理费。', description: '报销差旅费2,000元。',
    entries: [{ subjectCode: '660202', summary: '差旅费', debit: 2000, credit: 0, explanation: '管理费增加。' }, { subjectCode: '100201', summary: '付差旅费', debit: 0, credit: 2000, explanation: '银行减少。' }],
    documents: [{ type: 'receipt', label: '报销单', docTitle: '差 旅 费 报 销 单', date: '2026-06-13', totalAmount: 2000, payer: '本公司', stampText: '财务\n审核专用章', items: [{ name: '往返机票', qty: 2, price: 600, amount: 1200 }, { name: '住宿费（1晚）', qty: 1, price: 500, amount: 500 }, { name: '出差补贴（1天）', qty: 1, price: 200, amount: 200 }, { name: '市内交通费', qty: 1, price: 100, amount: 100 }]}]},
  { date: '2026-06-14', role: 'accountant', title: '生产领料-辅助材料', tags: ["生产"], difficulty: 2, tip: '辅助材料入制造费用。', description: '领用辅助材料4,000元。',
    entries: [{ subjectCode: '5101', summary: '辅料', debit: 4000, credit: 0, explanation: '制造费用增加。' }, { subjectCode: '1403', summary: '辅料', debit: 0, credit: 4000, explanation: '原材料减少。' }],
    documents: [{ type: 'text', label: '领料单', docTitle: '领  料  单', date: '2026-06-14', stampText: '仓库\n发料专用章', content: '领用部门：生产车间   领料单号：LL20260614010\n\n材料名称：B型材料\n数量：2批\n金额：4,000.00元\n\n用途：机物料消耗（设备维护）\n\n领料人：张生产\n发料人：刘保管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '领用部门',
        '生产车间   领料单号：LL20260614010'
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
  { date: '2026-06-15', role: 'accountant', title: '支付水电费', tags: ["费用"], difficulty: 1, tip: '水电费入管理费。', description: '支付6月水电费4,000元。',
    entries: [{ subjectCode: '6602', summary: '水电费', debit: 4000, credit: 0, explanation: '管理费增加。' }, { subjectCode: '100201', summary: '付水电费', debit: 0, credit: 4000, explanation: '银行减少。' }],
    documents: [{ type: 'receipt', label: '电费单', docTitle: '电 费 缴 费 凭 证', date: '2026-06-15', totalAmount: 2800, payer: '本公司', stampText: '国家电网\n电费收讫章', items: [{ name: '有功电量 2,800kWh×1.00元', qty: 2800, price: 1, amount: 2800 }]}, { type: 'receipt', label: '水费单', docTitle: '水 费 缴 费 凭 证', date: '2026-06-15', totalAmount: 1200, payer: '本公司', stampText: '自来水公司\n水费收讫章', items: [{ name: '用水量 300吨×4.00元', qty: 300, price: 4, amount: 1200 }]}]},
  { date: '2026-06-16', role: 'accountant', title: '制造费用归集分配', tags: ["生产"], difficulty: 2, tip: '分配后余额归零。', description: '归集分配制造费用9,000元。',
    entries: [{ subjectCode: '5101', summary: '归集', debit: 5000, credit: 0, explanation: '制造费用增加。' }, { subjectCode: '1602', summary: '折旧', debit: 0, credit: 2000, explanation: '累计折旧增加。' }, { subjectCode: '100201', summary: '车间水电', debit: 0, credit: 3000, explanation: '银行减少。' }, { subjectCode: '500103', summary: '分配', debit: 9000, credit: 0, explanation: '生产成本增加。' }, { subjectCode: '5101', summary: '分配', debit: 0, credit: 9000, explanation: '制造费用归零。' }],
    documents: [{ type: 'text', label: '制造费用表', docTitle: '制 造 费 用 归 集 分 配 表', date: '2026-06-16', stampText: '财务专用章', content: '制造费用归集分配\n期间：2026年6月\n\n归集明细：\n1. 辅助材料（机物料）：4,000.00元\n2. 折旧费——机器设备：2,000.00元\n3. 车间水电费：3,000.00元\n  归集总额：9,000.00元\n\n分配：\n  分配率 = 9,000 ÷ 2,500工时 = 3.60元/小时\n  计入生产成本-制造费用：9,000.00元\n\n分配后制造费用余额：0.00元 ✓\n\n制表：李会计\n审核：赵会计主管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年6月'
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
  { date: '2026-06-17', role: 'accountant', title: '完工产品入库', tags: ["生产"], difficulty: 2, tip: '借库存，贷生产成本。', description: '本月100台完工，成本134,000元。',
    entries: [{ subjectCode: '1405', summary: '完工', debit: 134000, credit: 0, explanation: '库存增加。' }, { subjectCode: '500101', summary: '材料', debit: 0, credit: 90000, explanation: '生产转出。' }, { subjectCode: '500102', summary: '人工', debit: 0, credit: 35000, explanation: '生产转出。' }, { subjectCode: '500103', summary: '制造费用', debit: 0, credit: 9000, explanation: '生产转出。' }],
    documents: [{ type: 'text', label: '入库单', docTitle: '产 品 入 库 单', date: '2026-06-17', stampText: '仓库\n验收专用章', content: '入库部门：生产车间   入库单号：RK20260617005\n\n产品名称：A产品\n规格型号：标准型\n\n完工数量：100台\n\n成本构成：\n  直接材料：90,000.00元\n  直接人工：35,000.00元\n  制造费用：9,000.00元\n━━━━━━━━━━━━━━━━━━━━━\n  总成本：134,000.00元\n  单位成本：1,340.00元/台\n\n质检结论：合格 ✓\n\n仓库验收：刘保管\n质量检验：陈检验',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '入库部门',
        '生产车间   入库单号：RK20260617005'
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
  { date: '2026-06-18', role: 'accountant', title: '结转销售成本', tags: ["生产","成本"], difficulty: 3, tip: '先进先出法。', description: '结转160台成本208,400元。',
    entries: [{ subjectCode: '6401', summary: '结转成本', debit: 208400, credit: 0, explanation: '主营成本增加。' }, { subjectCode: '1405', summary: '转成本', debit: 0, credit: 208400, explanation: '库存减少。' }],
    documents: [{ type: 'text', label: '成本计算表', docTitle: '销 售 成 本 计 算 表', date: '2026-06-18', stampText: '财务专用章', content: '销售成本计算（先进先出法）\n期间：2026年6月\n\n本月销售数量：160台\n\n库存明细：\n  5月结余：60台 × 1,240.00 = 74,400.00元\n  6月完工：100台 × 1,340.00 = 134,000.00元\n  可售合计：208,400.00元\n\n本期结转：\n  优先发出5月库存：60台×1,240=74,400\n  再发6月新品：100台×1,340=134,000\n  合计：160台=208,400.00元\n\n期末结余：0台\n\n制表：李会计\n审核：赵会计主管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年6月'
      ],
      [
        '本月销售数量',
        '160台'
      ],
      [
        '5月结余',
        '60台 × 1,240.00 = 74,400.00元'
      ],
      [
        '6月完工',
        '100台 × 1,340.00 = 134,000.00元'
      ],
      [
        '可售合计',
        '208,400.00元'
      ],
      [
        '优先发出5月库存',
        '60台×1,240=74,400'
      ],
      [
        '再发6月新品',
        '100台×1,340=134,000'
      ],
      [
        '合计',
        '160台=208,400.00元'
      ],
      [
        '期末结余',
        '0台'
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
  { date: '2026-06-19', role: 'accountant', title: '销售折让处理', tags: ["销售"], difficulty: 3, tip: '折让冲减当期收入。', description: '给予5%折让，冲收入12,000，增值税1,560。',
    entries: [{ subjectCode: '6001', summary: '折让', debit: 12000, credit: 0, explanation: '收入减少。' }, { subjectCode: '222101', summary: '冲增值税', debit: 1560, credit: 0, explanation: '增值税减少。' }, { subjectCode: '112202', summary: '折让款', debit: 0, credit: 13560, explanation: '应收减少。' }],
    documents: [{ type: 'text', label: '销售折让通知', docTitle: '销 售 折 让 通 知 单', date: '2026-06-19', stampText: '销售部\n业务专用章', content: '销售折让通知\n\n购货方：庚公司\n\n原销售情况：\n  产品：A产品\n  数量：60台\n  原合同金额：135,600.00元\n\n折让原因：\n  产品质量问题，经双方协商同意给予5%销售折让\n\n折让金额：\n  冲减收入：12,000.00元\n  冲减增值税：1,560.00元\n  合计：13,560.00元\n\n经手人：王销售\n审批人：赵总',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '购货方',
        '庚公司'
      ],
      [
        '产品',
        'A产品'
      ],
      [
        '数量',
        '60台'
      ],
      [
        '原合同金额',
        '135,600.00元'
      ],
      [
        '冲减收入',
        '12,000.00元'
      ],
      [
        '冲减增值税',
        '1,560.00元'
      ],
      [
        '合计',
        '13,560.00元'
      ],
      [
        '经手人',
        '王销售'
      ],
      [
        '审批人',
        '赵总'
      ],
    ] }]},
  { date: '2026-06-20', role: 'accountant', title: '国债利息收入确认', tags: ["资产"], difficulty: 2, tip: '利息计入投资收益。', description: '短期国债到期，收到本息50,375元。',
    entries: [{ subjectCode: '100201', summary: '国债本息', debit: 50375, credit: 0, explanation: '银行增加。' }, { subjectCode: '110101', summary: '国债减少', debit: 0, credit: 50000, explanation: '金融资产减少。' }, { subjectCode: '611101', summary: '利息收入', debit: 0, credit: 375, explanation: '投资收益增加。' }],
    documents: [{ type: 'bank', label: '收款回单', date: '2026-06-20', totalAmount: 50375, payer: '中国国债登记结算公司', payeeName: '本公司', content: '短期国债到期兑付本息', refNo: 'HD202606200090' }, { type: 'text', label: '国债到期通知', docTitle: '国 债 到 期 兑 付 通 知', date: '2026-06-20', stampText: '中央国债登记\n结算专用章', content: '国债到期兑付通知\n\n债券名称：2025年记账式短期国债\n持有面值：50,000.00元\n年利率：1.5%\n持有期限：6个月\n\n兑付金额：\n  本金：50,000.00元\n  利息：50,000×1.5%×6/12=375.00元\n本息合计：50,375.00元\n\n投资收益：375.00元（免税）',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '债券名称',
        '2025年记账式短期国债'
      ],
      [
        '持有面值',
        '50,000.00元'
      ],
      [
        '年利率',
        '1.5%'
      ],
      [
        '持有期限',
        '6个月'
      ],
      [
        '本金',
        '50,000.00元'
      ],
      [
        '利息',
        '50,000×1.5%×6/12=375.00元'
      ],
      [
        '本息合计',
        '50,375.00元'
      ],
      [
        '投资收益',
        '375.00元（免税）'
      ],
    ] }]},
  { date: '2026-06-21', role: 'accountant', title: '按季支付借款利息', tags: ["融资"], difficulty: 2, tip: '支付时冲应计利息。', description: '支付Q2借款利息1,631元。',
    entries: [{ subjectCode: '2232', summary: '付利息', debit: 1631, credit: 0, explanation: '应付利息减少。' }, { subjectCode: '100201', summary: '付利息', debit: 0, credit: 1631, explanation: '银行减少。' }],
    documents: [{ type: 'bank', label: '扣息回单', date: '2026-06-21', totalAmount: 1631, payer: '本公司', payeeName: '中国工商银行', content: 'Q2短期借款利息扣款', refNo: 'HD202606210095' }]},
  { date: '2026-06-25', role: 'accountant', title: '银行利息及手续费', tags: ["资金"], difficulty: 1, tip: '利息冲财务费用。', description: 'Q2利息28,000元，手续费400元。',
    entries: [{ subjectCode: '100201', summary: 'Q2利息', debit: 28000, credit: 0, explanation: '银行增加。' }, { subjectCode: '6603', summary: '冲财务', debit: 0, credit: 28000, explanation: '财务费减少。' }, { subjectCode: '6603', summary: '手续费', debit: 400, credit: 0, explanation: '财务费增加。' }, { subjectCode: '100201', summary: '手续费', debit: 0, credit: 400, explanation: '银行减少。' }],
    documents: [{ type: 'bank', label: 'Q2结息回单', date: '2026-06-25', totalAmount: 28000, payer: '中国工商银行', payeeName: '本公司', content: '2026年Q2存款利息入账', refNo: 'HD20260625INT' }, { type: 'bank', label: '手续费回单', date: '2026-06-25', totalAmount: 400, payer: '本公司', payeeName: '中国工商银行', content: 'Q2账户维护及转账手续费', refNo: 'HD20260625FEE' }]},
  { date: '2026-06-26', role: 'accountant', title: '计提工资及折旧', tags: ["工资","资产"], difficulty: 1, tip: '通过业务模块操作。', description: '前往工资管理和固定资产模块。', entries: [], nextAction: 'payroll',
    documents: [{ type: 'text', label: '操作指引', docTitle: '操 作 说 明', stampText: '财务专用章', content: '请前往业务模块操作：\n\n一、「工资管理」模块：\n1. 点击「计算汇总」\n2. 点击「生成计提工资凭证」\n\n二、「固定资产」模块：\n1. 点击「计提本月折旧」\n2. 确认后系统自动生成凭证\n\n注意：H1半年末，确保工资和折旧数据准确。' }]},
  { date: '2026-06-27', role: 'accountant', title: '计提借款利息', tags: ["融资"], difficulty: 2, tip: '按月计提到期付息。', description: '计提6月利息544元。',
    entries: [{ subjectCode: '6603', summary: '借款利息', debit: 544, credit: 0, explanation: '财务费增加。' }, { subjectCode: '2232', summary: '应付利息', debit: 0, credit: 544, explanation: '应付利息增加。' }],
    documents: [{ type: 'text', label: '利息计算表', docTitle: '借 款 利 息 计 算 表', date: '2026-06-27', stampText: '财务专用章', content: '短期借款利息计算\n期间：2026年6月\n\n借款余额：150,000.00元\n年利率：4.35%\n\n本月利息 = 150,000 × 4.35% ÷ 12 = 543.75元（取整544元）\n\n制表：李会计',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年6月'
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
  { date: '2026-06-28', role: 'accountant', title: '计提坏账准备', tags: ["资产","期末"], difficulty: 2, tip: '按应收余额5%计提。', description: '计提坏账准备8,000元。',
    entries: [{ subjectCode: '6701', summary: '坏账', debit: 8000, credit: 0, explanation: '减值损失增加。' }, { subjectCode: '123101', summary: '坏账准备', debit: 0, credit: 8000, explanation: '坏账增加。' }],
    documents: [{ type: 'text', label: '减值计算表', docTitle: '坏 账 准 备 计 提 表', date: '2026-06-28', stampText: '财务专用章', content: '坏账准备计提\n期间：2026年6月\n\n应收账款期末余额：160,000.00元\n计提比例：5%\n\n计提金额：160,000 × 5% = 8,000.00元\n\n制表：李会计\n审核：赵会计主管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年6月'
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
  { date: '2026-06-29', role: 'accountant', title: '计提附加税', tags: ["税费"], difficulty: 2, tip: '以增值税为基数。', description: '应纳增值税10,140，城建税710，教育费附加304。',
    entries: [{ subjectCode: '6403', summary: '城建税', debit: 710, credit: 0, explanation: '税金增加。' }, { subjectCode: '222103', summary: '城建税', debit: 0, credit: 710, explanation: '应交增加。' }, { subjectCode: '6403', summary: '教育附加', debit: 304, credit: 0, explanation: '税金增加。' }, { subjectCode: '222104', summary: '教育附加', debit: 0, credit: 304, explanation: '应交增加。' }],
    documents: [{ type: 'text', label: '税费计算表', docTitle: '附 加 税 计 提 计 算 表', date: '2026-06-29', stampText: '财务专用章', content: '附加税计提计算\n期间：2026年6月\n\n计税依据：\n  应纳增值税：10,140.00元\n\n计提明细：\n  城市维护建设税（7%）：10,140×7%=709.80 → 710.00元\n  教育费附加（3%）：10,140×3%=304.20 → 304.00元\n  合计：1,014.00元\n\n制表：李会计  审核：赵会计主管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年6月'
      ],
      [
        '应纳增值税',
        '10,140.00元'
      ],
      [
        '城市维护建设税（7%）',
        '10,140×7%=709.80 → 710.00元'
      ],
      [
        '教育费附加（3%）',
        '10,140×3%=304.20 → 304.00元'
      ],
      [
        '合计',
        '1,014.00元'
      ],
      [
        '制表',
        '李会计  审核：赵会计主管'
      ],
    ] }]},
  { date: '2026-06-29', role: 'accountant', title: '计提Q2企业所得税', tags: ["税费","期末"], difficulty: 3, tip: 'Q2末计提所得税。', description: 'Q2应纳税所得120,000×25%=30,000元。',
    entries: [{ subjectCode: '6801', summary: 'Q2所得税', debit: 30000, credit: 0, explanation: '所得税增加。' }, { subjectCode: '222102', summary: '应交所得税', debit: 0, credit: 30000, explanation: '应交增加。' }],
    documents: [{ type: 'text', label: '所得税计算表', docTitle: 'Q2 企 业 所 得 税 计 提 表', date: '2026-06-29', stampText: '财务专用章', content: '企业所得税计提\n期间：2026年Q2（4-6月）\n\n第二季度累计应纳税所得额：120,000.00元\n税率：25%\n\n应缴所得税 = 120,000 × 25% = 30,000.00元\n\n（Q2预缴，年末汇算清缴）\n\n制表：李会计\n审核：赵会计主管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年Q2（4-6月）'
      ],
      [
        '第二季度累计应纳税所得额',
        '120,000.00元'
      ],
      [
        '税率',
        '25%'
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
  { date: '2026-06-30', role: 'accountant', title: 'H1月末期间损益结转', tags: ["期末"], difficulty: 3, tip: 'H1半年末结转本年利润。', description: '结转各损益科目至本年利润。',
    entries: [
      { subjectCode: '6001', summary: '转收入', debit: 308000, credit: 0, explanation: '收入转出。' },
      { subjectCode: '611101', summary: '转投资收益', debit: 375, credit: 0, explanation: '国债利息转出。' },
      { subjectCode: '6401', summary: '转成本', debit: 0, credit: 208400, explanation: '成本转出。' },
      { subjectCode: '6403', summary: '转税金', debit: 0, credit: 1014, explanation: '税金转出。' },
      { subjectCode: '660101', summary: '转销售费用', debit: 0, credit: 5000, explanation: '销售费转出。' },
      { subjectCode: '6602', summary: '转管理费用', debit: 0, credit: 14000, explanation: '管理费转出。' },
      { subjectCode: '6603', summary: '转财务费用', debit: 27056, credit: 0, explanation: '财务费转出。' },
      { subjectCode: '6701', summary: '转减值损失', debit: 0, credit: 8000, explanation: '减值损失转出。' },
      { subjectCode: '6801', summary: '转所得税', debit: 0, credit: 30000, explanation: '所得税转出。' },
      { subjectCode: '4103', summary: '转本年利润', debit: 0, credit: 69017, explanation: '净利润=308,000+375-208,400-1,014-5,000-14,000+27,056-8,000-30,000=69,017。' }],
    documents: [{ type: 'text', label: '结转计算表', docTitle: 'H1 期 间 损 益 结 转 表', date: '2026-06-30', stampText: '已结转', content: '期间损益结转\n会计期间：2026年H1（1-6月）\n\n【收入类】→ 本年利润（贷方）\n  主营业务收入（6001）：308,000（扣减折让后净额）\n  投资收益（611101）：375（国债利息）\n  财务费用（6603）：27,056（利息净收入）\n\n【费用类】→ 本年利润（借方）\n  主营业务成本（6401）：208,400\n  税金及附加（6403）：1,014\n  销售费用（660101）：5,000\n  管理费用（6602）：14,000\n  信用减值损失（6701）：8,000\n  所得税费用（6801）：30,000\n\n本年利润：\n  308,000+375+27,056-208,400-1,014-5,000-14,000-8,000-30,000 = 69,017元\n\n结转后各损益类科目余额为零 ✓\n\n制表：李会计\n审核：赵会计主管',
    headers: [
      '项目',
      '内容'
    ],
    rows: [
      [
        '会计期间',
        '2026年H1（1-6月）'
      ],
      [
        '主营业务收入（6001）',
        '308,000（扣减折让后净额）'
      ],
      [
        '投资收益（611101）',
        '375（国债利息）'
      ],
      [
        '财务费用（6603）',
        '27,056（利息净收入）'
      ],
      [
        '主营业务成本（6401）',
        '208,400'
      ],
      [
        '税金及附加（6403）',
        '1,014'
      ],
      [
        '销售费用（660101）',
        '5,000'
      ],
      [
        '管理费用（6602）',
        '14,000'
      ],
      [
        '信用减值损失（6701）',
        '8,000'
      ],
      [
        '所得税费用（6801）',
        '30,000'
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
  { date: '2026-06-30', role: 'accountant', title: '模拟纳税申报', tags: ["期末","申报"], difficulty: 1, tip: '含Q2所得税预缴。', description: 'H1半年末纳税申报。', entries: [], nextAction: 'tax-filing',
    documents: [{ type: 'text', label: '申报提醒', docTitle: '6 月 / H1 纳 税 申 报 提 醒', stampText: '财务专用章', content: '申报期间：2026年6月/H1\n截止日期：2026年7月15日\n\n申报税种：\n1. 增值税（6月）\n2. 城市维护建设税\n3. 教育费附加\n4. Q2企业所得税预缴\n\nH1企业所得税按半年度利润预缴。\n请前往纳税申报页面核对后提交。' }]},
]
export default jun
