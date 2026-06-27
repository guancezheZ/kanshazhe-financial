const jul = [
  { date: '2026-07-01', role: 'accountant', title: '缴纳6月增值税及Q2所得税', tags: ["税费"], difficulty: 2, tip: 'Q2所得税季末后15日内缴纳。',
    description: '缴纳增值税10,140、城建税710、教育附加304、Q2所得税30,000。',
    entries: [{ subjectCode: '222101', summary: '增值税', debit: 10140, credit: 0, explanation: '应交增值税减少。' }, { subjectCode: '222103', summary: '城建税', debit: 710, credit: 0, explanation: '城建税减少。' }, { subjectCode: '222104', summary: '教育附加', debit: 304, credit: 0, explanation: '附加减少。' }, { subjectCode: '222102', summary: 'Q2所得税', debit: 30000, credit: 0, explanation: '所得税减少。' }, { subjectCode: '100201', summary: '缴税费', debit: 0, credit: 41154, explanation: '银行减少。' }],
    documents: [{ type: 'bank', label: '缴税回单', date: '2026-07-01', totalAmount: 41154, payer: '本公司', payeeName: 'XX市税务局', content: '6月增值税及附加+Q2所得税预缴', refNo: 'HD202607010010' }]},
  { date: '2026-07-02', role: 'accountant', title: '发放6月员工工资', tags: ["工资"], difficulty: 2, tip: '每月10日前发上月工资。',
    description: '银行代发6月工资，实发76,500元。',
    entries: [{ subjectCode: '221101', summary: '发6月工资', debit: 90000, credit: 0, explanation: '应付薪酬减少。' }, { subjectCode: '100201', summary: '实发', debit: 0, credit: 76500, explanation: '银行减少。' }, { subjectCode: '224101', summary: '代扣社保', debit: 0, credit: 9000, explanation: '其他应付款增加。' }, { subjectCode: '224102', summary: '代扣公积金', debit: 0, credit: 4500, explanation: '其他应付款增加。' }],
    documents: [{ type: 'bank', label: '代发工资回单', date: '2026-07-02', totalAmount: 76500, payer: '本公司', payerAccount: '6222 0200 **** 1234', payeeName: '员工代发户', content: '6月工资代发（共6人）', refNo: 'HD202607020020' }]},
  { date: '2026-07-03', role: 'accountant', title: '提取备用金', tags: ["资金"], difficulty: 1, tip: '备用金满足日常开支。',
    description: '提取现金3,000元。',
    entries: [{ subjectCode: '1001', summary: '备用金', debit: 3000, credit: 0, explanation: '现金增加。' }, { subjectCode: '100201', summary: '提备用金', debit: 0, credit: 3000, explanation: '银行减少。' }],
    documents: [{ type: 'bank', label: '现金支票回单', date: '2026-07-03', totalAmount: 3000, payer: '本公司', payerAccount: '6222 0200 **** 1234', payeeName: '本公司（现金）', content: '提取备用金', refNo: 'HD202607030030' }]},
  { date: '2026-07-04', role: 'accountant', title: '预付采购定金', tags: ["采购"], difficulty: 2, tip: '预付账款是资产类科目。',
    description: '预付供应商定金30,000元。',
    entries: [{ subjectCode: '1123', summary: '预付定金', debit: 30000, credit: 0, explanation: '预付账款增加。' }, { subjectCode: '100201', summary: '付定金', debit: 0, credit: 30000, explanation: '银行减少。' }],
    documents: [{ type: 'bank', label: '转账回单', date: '2026-07-04', totalAmount: 30000, payer: '本公司', payerAccount: '6222 0200 **** 1234', payeeName: '戊公司（供应商）', payeeAccount: '6222 0500 **** 3333', content: '预付采购定金', refNo: 'HD202607040040' }, { type: 'text', label: '采购合同', docTitle: '采 购 合 同（定金条款）', date: '2026-07-04', stampText: '合同\n专用章', content: '采购合同\n\n供应商：戊公司\n材料名称：C型特种钢材\n预付定金：30,000.00元\n合同总价：150,000.00元\n\n支付条款：\n  1. 合同签订后支付定金30,000元\n  2. 交货时支付尾款120,000元\n  3. 定金抵作货款\n\n审批人：赵总',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '供应商',
        '戊公司'
      ],
      [
        '材料名称',
        'C型特种钢材'
      ],
      [
        '预付定金',
        '30,000.00元'
      ],
      [
        '合同总价',
        '150,000.00元'
      ],
      [
        '审批人',
        '赵总'
      ],
    ] }]},
  { date: '2026-07-05', role: 'accountant', title: '采购原材料', tags: ["采购"], difficulty: 2, tip: '进项税可抵扣。',
    description: '采购A型钢材8吨，价款120,000，增值税15,600元。',
    entries: [{ subjectCode: '1403', summary: '采购', debit: 120000, credit: 0, explanation: '原材料增加。' }, { subjectCode: '222101', summary: '进项税', debit: 15600, credit: 0, explanation: '进项增加。' }, { subjectCode: '220201', summary: '应付', debit: 0, credit: 135600, explanation: '应付增加。' }],
    documents: [{ type: 'text', label: '入库单', docTitle: '收  料  单', date: '2026-07-05', stampText: '仓库\n验收专用章', content: '供应商：丙公司\n入库日期：2026-07-05\n\n材料名称：A型钢材 Φ25mm\n数量：8吨\n单价：15,000元/吨\n金额：120,000.00元\n\n增值税进项：15,600.00元（13%）\n\n检验结果：合格 ✓\n保管员：刘保管',
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
        '2026-07-05'
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
        '增值税进项',
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
    ] }]},
  { date: '2026-07-06', role: 'accountant', title: '支付供应商货款', tags: ["采购","资金"], difficulty: 1, tip: '按合同账期支付。',
    description: '支付丙公司采购款169,500元。',
    entries: [{ subjectCode: '220201', summary: '付丙公司', debit: 169500, credit: 0, explanation: '应付减少。' }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 169500, explanation: '银行减少。' }],
    documents: [{ type: 'bank', label: '转账回单', date: '2026-07-06', totalAmount: 169500, payer: '本公司', payerAccount: '6222 0200 **** 1234', payeeName: '丙公司', payeeAccount: '6222 0200 **** 8888', content: '支付6月采购款', refNo: 'HD202607060050' }]},
  { date: '2026-07-07', role: 'accountant', title: '收到政府稳岗补贴', tags: ["资金"], difficulty: 3, tip: '政府补助计入营业外收入。',
    description: '收到稳岗补贴20,000元。',
    entries: [{ subjectCode: '100201', summary: '补贴', debit: 20000, credit: 0, explanation: '银行增加。' }, { subjectCode: '6301', summary: '补贴收入', debit: 0, credit: 20000, explanation: '营业外收入增加。' }],
    documents: [{ type: 'bank', label: '收款回单', date: '2026-07-07', totalAmount: 20000, payer: 'XX市人力资源和社会保障局', payeeName: '本公司', content: '稳岗补贴资金', refNo: 'HD202607070060' }, { type: 'text', label: '政府批文', docTitle: '稳 岗 补 贴 审 批 通 知', date: '2026-07-07', stampText: '人社局\n审批专用章', content: '关于拨付稳岗补贴的通知\n\n企业名称：本公司\n补贴项目：稳岗补贴\n补贴金额：20,000.00元\n\n发放依据：《关于做好失业保险稳岗位提技能防失业工作的通知》\n\n资金用途：用于职工生活补助、缴纳社会保险费等\n\nXX市人力资源和社会保障局\n2026年7月',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '企业名称',
        '本公司'
      ],
      [
        '补贴项目',
        '稳岗补贴'
      ],
      [
        '补贴金额',
        '20,000.00元'
      ],
      [
        '发放依据',
        '《关于做好失业保险稳岗位提技能防失业工作的通知》'
      ],
      [
        '资金用途',
        '用于职工生活补助、缴纳社会保险费等'
      ],
    ] }]},
  { date: '2026-07-08', role: 'accountant', title: '生产领料', tags: ["生产"], difficulty: 2, tip: '借生产成本，贷原材料。',
    description: '领用A型钢材5吨，合计75,000元。',
    entries: [{ subjectCode: '500101', summary: '领料', debit: 75000, credit: 0, explanation: '生产成本增加。' }, { subjectCode: '1403', summary: '领料', debit: 0, credit: 75000, explanation: '原材料减少。' }],
    documents: [{ type: 'text', label: '领料单', docTitle: '领  料  单', date: '2026-07-08', stampText: '仓库\n发料专用章', content: '领用部门：生产车间   领料单号：LL20260708011\n\n材料名称：A型钢材 Φ25mm\n规格：25mm\n数量：5吨\n单价：15,000元/吨\n金额：75,000.00元\n\n用途：生产A产品\n\n领料人：张生产\n发料人：刘保管\n审核人：李会计',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '领用部门',
        '生产车间   领料单号：LL20260708011'
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
        '生产A产品'
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
  { date: '2026-07-09', role: 'accountant', title: '直接人工归集', tags: ["生产"], difficulty: 2, tip: '人工计入生产成本。',
    description: '生产工人工资35,000元。',
    entries: [{ subjectCode: '500102', summary: '人工', debit: 35000, credit: 0, explanation: '生产成本增加。' }, { subjectCode: '221101', summary: '计提', debit: 0, credit: 35000, explanation: '应付薪酬增加。' }],
    documents: [{ type: 'text', label: '工资计算表', docTitle: '直 接 人 工 费 用 分 配 表', date: '2026-07-09', stampText: '人力资源部\n工资专用章', content: '直接人工费用分配\n期间：2026年7月\n\n生产车间工资：35,000.00元\n工时：2,500小时\n分配率：14.00元/小时\n计入生产成本-直接人工：35,000.00元\n\n制表：王出纳\n审核：李会计',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年7月'
      ],
      [
        '生产车间工资',
        '35,000.00元'
      ],
      [
        '工时',
        '2,500小时'
      ],
      [
        '分配率',
        '14.00元/小时'
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
    ] }]},
  { date: '2026-07-10', role: 'accountant', title: '现销商品', tags: ["销售"], difficulty: 2, tip: '借银行，贷收入、税费。',
    description: '销售100台，价款200,000元，增值税26,000元。',
    entries: [{ subjectCode: '100201', summary: '销100台', debit: 226000, credit: 0, explanation: '银行增加。' }, { subjectCode: '6001', summary: '收入', debit: 0, credit: 200000, explanation: '收入增加。' }, { subjectCode: '222101', summary: '销项税', debit: 0, credit: 26000, explanation: '增值税增加。' }],
    documents: [{ type: 'invoice', label: '增值税专用发票', region: '广东', invoiceType: '专用', copy: '发票联', invoiceNo: '4400712345', date: '2026年07月10日', buyer: '乙公司', buyerTaxId: '91440101MA5XXXXXXXX', seller: '本公司', sellerTaxId: '91440101MA3XXXXXXXX', stampText: '发票专用章', payee: '李四', reviewer: '王五', drawer: '赵六', lineItems: [{ name: 'A产品', unit: '台', qty: 100, price: 2000, amount: 200000, taxRate: '13%', tax: 26000 }], totalAmount: 226000 }, { type: 'bank', label: '收款回单', date: '2026-07-10', totalAmount: 226000, payer: '乙公司', payerAccount: '6222 0100 **** 6666', payeeName: '本公司', payeeAccount: '6222 0200 **** 1234', content: '购买A产品货款及增值税', refNo: 'HD202607100080' }]},
  { date: '2026-07-11', role: 'accountant', title: '赊销商品', tags: ["销售"], difficulty: 2, tip: '借应收，贷收入、税费。',
    description: '赊销A产品60台，价款120,000，增值税15,600元未收。',
    entries: [{ subjectCode: '112202', summary: '赊销', debit: 135600, credit: 0, explanation: '应收增加。' }, { subjectCode: '6001', summary: '收入', debit: 0, credit: 120000, explanation: '收入增加。' }, { subjectCode: '222101', summary: '销项税', debit: 0, credit: 15600, explanation: '增值税增加。' }],
    documents: [{ type: 'invoice', label: '增值税专用发票', region: '广东', invoiceType: '专用', copy: '发票联', invoiceNo: '4400789012', date: '2026年07月11日', buyer: '庚公司', buyerTaxId: '91440101MA0GGGGGGG', seller: '本公司', sellerTaxId: '91440101MA3XXXXXXXX', stampText: '发票专用章', payee: '李四', reviewer: '王五', drawer: '赵六', lineItems: [{ name: 'A产品', unit: '台', qty: 60, price: 2000, amount: 120000, taxRate: '13%', tax: 15600 }], totalAmount: 135600 }]},
  { date: '2026-07-14', role: 'accountant', title: '存货盘亏', tags: ["生产","资产"], difficulty: 3, tip: '盘亏先入待处理财产损溢。',
    description: '盘点发现原材料盘亏5,000元。',
    entries: [{ subjectCode: '1901', summary: '盘亏', debit: 5000, credit: 0, explanation: '待处理损溢增加。' }, { subjectCode: '1403', summary: '盘亏', debit: 0, credit: 5000, explanation: '原材料减少。' }],
    documents: [{ type: 'text', label: '盘点表', docTitle: '存 货 盘 点 表', date: '2026-07-14', stampText: '仓库\n盘点专用章', content: '存货盘点表\n盘点日期：2026年7月14日\n\n材料名称：B型材料\n账面数量：300批\n实盘数量：295批\n盘亏数量：5批\n盘亏金额：5,000.00元\n\n盘亏原因：待查\n\n盘点人：张生产\n监盘人：李会计',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '盘点日期',
        '2026年7月14日'
      ],
      [
        '材料名称',
        'B型材料'
      ],
      [
        '账面数量',
        '300批'
      ],
      [
        '实盘数量',
        '295批'
      ],
      [
        '盘亏数量',
        '5批'
      ],
      [
        '盘亏金额',
        '5,000.00元'
      ],
      [
        '盘亏原因',
        '待查'
      ],
      [
        '盘点人',
        '张生产'
      ],
      [
        '监盘人',
        '李会计'
      ],
    ] }]},
  { date: '2026-07-15', role: 'accountant', title: '生产领料-辅助材料', tags: ["生产"], difficulty: 2, tip: '辅助材料入制造费用。',
    description: '领用辅助材料4,000元。',
    entries: [{ subjectCode: '5101', summary: '辅料', debit: 4000, credit: 0, explanation: '制造费用增加。' }, { subjectCode: '1403', summary: '辅料', debit: 0, credit: 4000, explanation: '原材料减少。' }],
    documents: [{ type: 'text', label: '领料单', docTitle: '领  料  单', date: '2026-07-15', stampText: '仓库\n发料专用章', content: '领用部门：生产车间   领料单号：LL20260715012\n\n材料名称：B型材料\n数量：2批\n金额：4,000.00元\n用途：机物料消耗\n\n领料人：张生产\n发料人：刘保管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '领用部门',
        '生产车间   领料单号：LL20260715012'
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
        '机物料消耗'
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
  { date: '2026-07-16', role: 'accountant', title: '支付房租', tags: ["费用"], difficulty: 1, tip: '房租按月支付。',
    description: '支付7月租金8,000元。',
    entries: [{ subjectCode: '660207', summary: '房租', debit: 8000, credit: 0, explanation: '管理费增加。' }, { subjectCode: '100201', summary: '付房租', debit: 0, credit: 8000, explanation: '银行减少。' }],
    documents: [{ type: 'receipt', label: '收据', docTitle: '房屋租赁专用收据', date: '2026-07-16', totalAmount: 8000, payer: '本公司', paymentMethod: '银行转账', stampText: 'XX物业管理有限公司\n财务专用章', receiver: '王XX', items: [{ name: 'XX大厦801室 7月租金', qty: 1, price: 8000, amount: 8000 }]}]},
  { date: '2026-07-17', role: 'accountant', title: '制造费用归集分配', tags: ["生产"], difficulty: 2, tip: '分配后余额归零。',
    description: '归集分配制造费用9,000元。',
    entries: [{ subjectCode: '5101', summary: '归集', debit: 5000, credit: 0, explanation: '制造费用增加。' }, { subjectCode: '1602', summary: '折旧', debit: 0, credit: 2000, explanation: '累计折旧增加。' }, { subjectCode: '100201', summary: '车间水电', debit: 0, credit: 3000, explanation: '银行减少。' }, { subjectCode: '500103', summary: '分配', debit: 9000, credit: 0, explanation: '生产成本增加。' }, { subjectCode: '5101', summary: '分配', debit: 0, credit: 9000, explanation: '制造费用归零。' }],
    documents: [{ type: 'text', label: '制造费用表', docTitle: '制 造 费 用 归 集 分 配 表', date: '2026-07-17', stampText: '财务专用章', content: '制造费用归集分配\n期间：2026年7月\n\n归集明细：\n1. 辅助材料（机物料）：4,000.00元\n2. 折旧费——机器设备：2,000.00元\n3. 车间水电费：3,000.00元\n  归集总额：9,000.00元\n\n分配：\n  分配率 = 9,000 ÷ 2,500工时 = 3.60元/小时\n  计入生产成本-制造费用：9,000.00元\n\n分配后制造费用余额：0.00元 ✓\n\n制表：李会计\n审核：赵会计主管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年7月'
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
  { date: '2026-07-18', role: 'accountant', title: '完工产品入库', tags: ["生产"], difficulty: 2, tip: '借库存，贷生产成本。',
    description: '本月100台完工，成本119,000元。',
    entries: [{ subjectCode: '1405', summary: '完工', debit: 119000, credit: 0, explanation: '库存增加。' }, { subjectCode: '500101', summary: '材料', debit: 0, credit: 75000, explanation: '生产转出。' }, { subjectCode: '500102', summary: '人工', debit: 0, credit: 35000, explanation: '生产转出。' }, { subjectCode: '500103', summary: '制造费用', debit: 0, credit: 9000, explanation: '生产转出。' }],
    documents: [{ type: 'text', label: '入库单', docTitle: '产 品 入 库 单', date: '2026-07-18', stampText: '仓库\n验收专用章', content: '入库部门：生产车间   入库单号：RK20260718006\n\n产品名称：A产品\n规格型号：标准型\n\n完工数量：100台\n\n成本构成：\n  直接材料：75,000.00元\n  直接人工：35,000.00元\n  制造费用：9,000.00元\n━━━━━━━━━━━━━━━━━━━━━\n  总成本：119,000.00元\n  单位成本：1,190.00元/台\n\n质检结论：合格 ✓\n\n仓库验收：刘保管\n质量检验：陈检验',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '入库部门',
        '生产车间   入库单号：RK20260718006'
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
  { date: '2026-07-19', role: 'accountant', title: '固定资产改扩建', tags: ["资产"], difficulty: 3, tip: '改扩建期间转入在建工程。',
    description: '设备改扩建，原值300,000元，折旧120,000元转入在建工程。',
    entries: [{ subjectCode: '1604', summary: '转入在建', debit: 180000, credit: 0, explanation: '在建工程增加。' }, { subjectCode: '1602', summary: '转折旧', debit: 120000, credit: 0, explanation: '累计折旧减少。' }, { subjectCode: '160102', summary: '设备转出', debit: 0, credit: 300000, explanation: '固定资产减少。' }],
    documents: [{ type: 'text', label: '改扩建申请', docTitle: '固 定 资 产 改 扩 建 申 请 表', date: '2026-07-19', stampText: '公司\n审批专用章', content: '固定资产改扩建申请\n\n设备名称：数控加工中心\n固定资产编号：ZC-2024-001\n原值：300,000.00元\n已提折旧：120,000.00元\n净值：180,000.00元\n\n改扩建内容：\n  升级控制系统、增加自动送料装置\n\n会计处理：\n  1. 将固定资产转入在建工程\n     借：在建工程 180,000\n     累计折旧 120,000\n     贷：固定资产 300,000\n\n审批：赵总\n申请部门：生产部',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '设备名称',
        '数控加工中心'
      ],
      [
        '固定资产编号',
        'ZC-2024-001'
      ],
      [
        '原值',
        '300,000.00元'
      ],
      [
        '已提折旧',
        '120,000.00元'
      ],
      [
        '净值',
        '180,000.00元'
      ],
      [
        '审批',
        '赵总'
      ],
      [
        '申请部门',
        '生产部'
      ],
    ] }]},
  { date: '2026-07-21', role: 'accountant', title: '结转销售成本', tags: ["生产","成本"], difficulty: 3, tip: '先进先出法。',
    description: '结转销售成本134,000元。',
    entries: [{ subjectCode: '6401', summary: '结转成本', debit: 134000, credit: 0, explanation: '主营成本增加。' }, { subjectCode: '1405', summary: '转成本', debit: 0, credit: 134000, explanation: '库存减少。' }],
    documents: [{ type: 'text', label: '成本计算表', docTitle: '销 售 成 本 计 算 表', date: '2026-07-21', stampText: '财务专用章', content: '销售成本计算（先进先出法）\n期间：2026年7月\n\n销售数量：100台\n\n库存明细：\n  6月结余：119,600.00元\n  7月完工：100台×1,190.00=119,000.00元\n  可售合计：238,600.00元\n\n本期结转：\n  100台成本 = 134,000.00元\n\n期末结余：\n  余额：104,600.00元（下期销售）\n\n制表：李会计\n审核：赵会计主管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年7月'
      ],
      [
        '销售数量',
        '100台'
      ],
      [
        '6月结余',
        '119,600.00元'
      ],
      [
        '7月完工',
        '100台×1,190.00=119,000.00元'
      ],
      [
        '可售合计',
        '238,600.00元'
      ],
      [
        '余额',
        '104,600.00元（下期销售）'
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
  { date: '2026-07-22', role: 'accountant', title: '购买办公用品', tags: ["费用"], difficulty: 1, tip: '办公用品入管理费。',
    description: '购买办公用品600元。',
    entries: [{ subjectCode: '660201', summary: '办公用品', debit: 600, credit: 0, explanation: '管理费增加。' }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 600, explanation: '银行减少。' }],
    documents: [{ type: 'receipt', label: '收据', docTitle: '收  据', date: '2026-07-22', totalAmount: 600, payer: '本公司', stampText: '得力办公\n发票专用章', items: [{ name: '打印纸、墨盒等', qty: 1, price: 600, amount: 600 }]}]},
  { date: '2026-07-23', role: 'accountant', title: '计提工资及折旧', tags: ["工资","资产"], difficulty: 1, tip: '计提7月工资及折旧，改扩建资产折旧暂停。',
    description: '计提7月工资90,000元及折旧625元（电脑125+车床500）。改扩建资产部分折旧按准则暂停计提。',
    entries: [{ subjectCode: '660203', summary: '计提行政部工资', debit: 25000, credit: 0, explanation: '管理费用-工资增加。' }, { subjectCode: '660103', summary: '计提销售部工资', debit: 35000, credit: 0, explanation: '销售费用增加。' }, { subjectCode: '500102', summary: '计提生产部工资', debit: 30000, credit: 0, explanation: '生产成本-直接人工增加。' }, { subjectCode: '221101', summary: '计提本月工资', debit: 0, credit: 90000, explanation: '应付职工薪酬-工资增加。' }, { subjectCode: '660205', summary: '计提折旧', debit: 625, credit: 0, explanation: '管理费用-折旧费增加。电脑车床折旧625元。' }, { subjectCode: '1602', summary: '计提折旧', debit: 0, credit: 625, explanation: '累计折旧增加。改扩建资产部分暂停计提。' }], documents: [{ type: 'text', label: '7月计提表', docTitle: '7 月 计 提 计 算 表', date: '2026-07-23', stampText: '财务专用章', content: '一、工资计提\n  行政部：25,000元  销售部：35,000元  生产部：30,000元\n  合计：90,000元\n\n二、折旧计提\n  联想台式电脑：125元\n  数控车床：500元\n  合计：625元\n\n三、说明\n  固定资产改扩建期间，改扩建部分\n  折旧暂停计提（依据《企业会计准则\n  第4号——固定资产》改进期间暂停）。' }]},
  { date: '2026-07-24', role: 'accountant', title: '差旅费报销', tags: ["费用"], difficulty: 1, tip: '差旅费入管理费。',
    description: '报销差旅费2,500元。',
    entries: [{ subjectCode: '660202', summary: '差旅', debit: 2500, credit: 0, explanation: '管理费增加。' }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 2500, explanation: '银行减少。' }],
    documents: [{ type: 'receipt', label: '报销单', docTitle: '差 旅 费 报 销 单', date: '2026-07-24', totalAmount: 2500, payer: '本公司', stampText: '财务\n审核专用章', items: [{ name: '往返高铁票', qty: 2, price: 550, amount: 1100 }, { name: '住宿费（1晚）', qty: 1, price: 800, amount: 800 }, { name: '出差补贴（2天）', qty: 2, price: 200, amount: 400 }, { name: '市内交通费', qty: 1, price: 200, amount: 200 }]}]},
  { date: '2026-07-25', role: 'accountant', title: '支付水电费', tags: ["费用"], difficulty: 1, tip: '水电费入管理费。',
    description: '支付7月水电费4,500元。',
    entries: [{ subjectCode: '660208', summary: '水电费', debit: 4500, credit: 0, explanation: '管理费增加。' }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 4500, explanation: '银行减少。' }],
    documents: [{ type: 'receipt', label: '电费单', docTitle: '电 费 缴 费 凭 证', date: '2026-07-25', totalAmount: 3200, payer: '本公司', stampText: '国家电网\n电费收讫章', items: [{ name: '有功电量 3,200kWh×1.00元', qty: 3200, price: 1, amount: 3200 }]}, { type: 'receipt', label: '水费单', docTitle: '水 费 缴 费 凭 证', date: '2026-07-25', totalAmount: 1300, payer: '本公司', stampText: '自来水公司\n水费收讫章', items: [{ name: '用水量 325吨×4.00元', qty: 325, price: 4, amount: 1300 }]}]},
  { date: '2026-07-26', role: 'accountant', title: '计提借款利息', tags: ["融资"], difficulty: 2, tip: '按月计提到期付息。',
    description: '计提7月利息544元。',
    entries: [{ subjectCode: '6603', summary: '利息', debit: 544, credit: 0, explanation: '财务费增加。' }, { subjectCode: '2232', summary: '应付利息', debit: 0, credit: 544, explanation: '应付增加。' }],
    documents: [{ type: 'text', label: '利息计算表', docTitle: '借 款 利 息 计 算 表', date: '2026-07-26', stampText: '财务专用章', content: '借款利息计算\n期间：2026年7月\n\n借款余额：150,000.00元\n年利率：4.35%\n月利息=150,000×4.35%÷12≈544元\n\n制表：李会计',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年7月'
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
  { date: '2026-07-28', role: 'accountant', title: '银行利息收入', tags: ["资金"], difficulty: 1, tip: '利息冲财务费用。',
    description: '收到7月利息6,000元。',
    entries: [{ subjectCode: '100201', summary: '利息', debit: 6000, credit: 0, explanation: '银行增加。' }, { subjectCode: '6603', summary: '冲财务', debit: 0, credit: 6000, explanation: '财务费减少。' }],
    documents: [{ type: 'bank', label: '利息入账回单', date: '2026-07-28', totalAmount: 6000, payer: '中国工商银行', payeeName: '本公司', content: '2026年7月存款利息收入', refNo: 'HD20260728INT' }]},
  { date: '2026-07-29', role: 'accountant', title: '银行手续费', tags: ["资金"], difficulty: 1, tip: '手续费入财务费用。',
    description: '本月手续费300元。',
    entries: [{ subjectCode: '6603', summary: '手续费', debit: 300, credit: 0, explanation: '财务费增加。' }, { subjectCode: '100201', summary: '手续费', debit: 0, credit: 300, explanation: '银行减少。' }],
    documents: [{ type: 'bank', label: '银行扣费回单', date: '2026-07-29', totalAmount: 300, payer: '本公司', payeeName: '中国工商银行', content: '转账手续费及账户维护费', refNo: 'HD20260729FEE' }]},
  { date: '2026-07-30', role: 'accountant', title: '支付广告费', tags: ["费用"], difficulty: 1, tip: '广告费入销售费用。',
    description: '支付7月推广费5,000元。',
    entries: [{ subjectCode: '660101', summary: '广告费', debit: 5000, credit: 0, explanation: '销售费增加。' }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 5000, explanation: '银行减少。' }],
    documents: [{ type: 'receipt', label: '服务发票', docTitle: '网络推广服务费发票', date: '2026-07-30', totalAmount: 5000, payer: '本公司', stampText: '百度\n发票专用章', items: [{ name: '搜索推广服务费（7月）', qty: 1, price: 5000, amount: 5000 }]}]},
  { date: '2026-07-30', role: 'accountant', title: '计提坏账准备', tags: ["资产","期末"], difficulty: 2, tip: '按应收余额5%计提。',
    description: '计提坏账准备8,000元。',
    entries: [{ subjectCode: '6701', summary: '坏账', debit: 8000, credit: 0, explanation: '减值损失增加。' }, { subjectCode: '123101', summary: '坏账准备', debit: 0, credit: 8000, explanation: '坏账增加。' }],
    documents: [{ type: 'text', label: '减值计算表', docTitle: '坏 账 准 备 计 提 表', date: '2026-07-30', stampText: '财务专用章', content: '坏账准备计提\n期间：2026年7月\n\n应收账款余额：160,000.00元\n计提比例：5%\n计提金额：8,000.00元\n\n制表：李会计',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年7月'
      ],
      [
        '应收账款余额',
        '160,000.00元'
      ],
      [
        '计提比例',
        '5%'
      ],
      [
        '计提金额',
        '8,000.00元'
      ],
      [
        '制表',
        '李会计'
      ],
    ] }]},
  { date: '2026-07-30', role: 'accountant', title: '计提附加税', tags: ["税费"], difficulty: 2, tip: '以增值税为基数。',
    description: '应纳增值税26,000，城建税1,820，教育附加780。',
    entries: [{ subjectCode: '6403', summary: '城建税', debit: 1820, credit: 0, explanation: '税金增加。' }, { subjectCode: '222103', summary: '城建税', debit: 0, credit: 1820, explanation: '应交增加。' }, { subjectCode: '6403', summary: '教育附加', debit: 780, credit: 0, explanation: '税金增加。' }, { subjectCode: '222104', summary: '教育附加', debit: 0, credit: 780, explanation: '应交增加。' }],
    documents: [{ type: 'text', label: '税费计算表', docTitle: '附 加 税 计 提 表', date: '2026-07-30', stampText: '财务专用章', content: '附加税计提\n期间：2026年7月\n\n应纳增值税：26,000.00元\n城建税（7%）：1,820.00元\n教育附加（3%）：780.00元\n合计：2,600.00元\n\n制表：李会计',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年7月'
      ],
      [
        '应纳增值税',
        '26,000.00元'
      ],
      [
        '城建税（7%）',
        '1,820.00元'
      ],
      [
        '教育附加（3%）',
        '780.00元'
      ],
      [
        '合计',
        '2,600.00元'
      ],
      [
        '制表',
        '李会计'
      ],
    ] }]},
  { date: '2026-07-30', role: 'accountant', title: '盘亏处理（查明原因）', tags: ["生产","资产"], difficulty: 2, tip: '管理不善计入管理费用。',
    description: '盘亏5,000元属管理不善。',
    entries: [{ subjectCode: '660214', summary: '盘亏损失', debit: 5000, credit: 0, explanation: '管理费增加。' }, { subjectCode: '190101', summary: '转出', debit: 0, credit: 5000, explanation: '待处理损溢减少。' }],
    documents: [{ type: 'text', label: '盘亏处理意见', docTitle: '存 货 盘 亏 处 理 意 见 表', date: '2026-07-30', stampText: '公司\n审批专用章', content: '存货盘亏处理意见\n\n盘亏材料：B型材料\n盘亏金额：5,000.00元\n盘亏日期：2026-07-14\n\n查明原因：\n  经核查，为仓库管理不善导致材料受潮报废。\n\n处理意见：\n  计入管理费用——存货盘亏损失\n\n审批人：赵总\n财务意见：同意处理',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '盘亏材料',
        'B型材料'
      ],
      [
        '盘亏金额',
        '5,000.00元'
      ],
      [
        '盘亏日期',
        '2026-07-14'
      ],
      [
        '审批人',
        '赵总'
      ],
      [
        '财务意见',
        '同意处理'
      ],
    ] }]},
  { date: '2026-07-31', role: 'accountant', title: '月末期间损益结转', tags: ["期末"], difficulty: 3, tip: '收入借转，费用贷转。',
    description: '结转各损益科目至本年利润。',
    entries: [
      { subjectCode: '6001', summary: '转收入', debit: 320000, credit: 0, explanation: '收入转出。' },
      { subjectCode: '6301', summary: '转营业外收入', debit: 20000, credit: 0, explanation: '补贴收入转出。' },
      { subjectCode: '6401', summary: '转成本', debit: 0, credit: 134000, explanation: '成本转出。' },
      { subjectCode: '6403', summary: '转税金', debit: 0, credit: 2600, explanation: '税金转出。' },
      { subjectCode: '660101', summary: '转销售费用', debit: 0, credit: 5000, explanation: '销售费转出。' },
      { subjectCode: '6602', summary: '转管理费用', debit: 0, credit: 29100, explanation: '管理费转出。' },
      { subjectCode: '6603', summary: '转财务费用', debit: 5156, credit: 0, explanation: '财务费转出。' },
      { subjectCode: '6701', summary: '转减值损失', debit: 0, credit: 8000, explanation: '减值损失转出。' },
      { subjectCode: '4103', summary: '转本年利润', debit: 0, credit: 166456, explanation: '净利润转出。' }],
    documents: [{ type: 'text', label: '结转计算表', docTitle: '月 末 损 益 结 转 表', date: '2026-07-31', stampText: '已结转', content: '期间损益结转\n期间：2026年7月\n\n【收入类】→ 本年利润\n  主营收入：320,000\n  营业外收入：20,000（补贴）\n  财务费用：5,156（利息净收入）\n\n【费用类】→ 本年利润\n  主营成本：134,000\n  税金及附加：2,600\n  销售费用：5,000\n  管理费用：29,100（含盘亏5,000）\n  减值损失：8,000\n\n净利润：166,456元\n\n制表：李会计\n审核：赵会计主管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年7月'
      ],
      [
        '主营收入',
        '320,000'
      ],
      [
        '营业外收入',
        '20,000（补贴）'
      ],
      [
        '财务费用',
        '5,156（利息净收入）'
      ],
      [
        '主营成本',
        '134,000'
      ],
      [
        '税金及附加',
        '2,600'
      ],
      [
        '销售费用',
        '5,000'
      ],
      [
        '管理费用',
        '29,100（含盘亏5,000）'
      ],
      [
        '减值损失',
        '8,000'
      ],
      [
        '净利润',
        '166,456元'
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
  { date: '2026-07-31', role: 'accountant', title: '模拟纳税申报', tags: ["期末","申报"], difficulty: 1, tip: '每月申报是法定义务。',
    description: '完成账务处理后申报。', entries: [], nextAction: 'tax-filing',
    documents: [{ type: 'text', label: '申报提醒', docTitle: '7 月 纳 税 申 报 提 醒', stampText: '财务专用章', content: '申报期间：2026年7月\n截止日期：2026年8月15日\n\n申报税种：\n1. 增值税（7月）\n2. 城市维护建设税\n3. 教育费附加\n\n请前往纳税申报页面核对后提交。' }]},
]
export default jul
