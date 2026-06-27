const dec = [
  { date: '2026-12-01', role: 'accountant', title: '缴纳11月增值税及附加税', tags: ["税费"], difficulty: 2, tip: '每月15日前完成。',
    description: '缴纳增值税10,400、城建税728、教育附加312。',
    entries: [{ subjectCode: '222101', summary: '增值税', debit: 10400, credit: 0 , explanation: '应交税费减少。' }, { subjectCode: '222103', summary: '城建税', debit: 728, credit: 0 , explanation: '应交税费减少。' }, { subjectCode: '222104', summary: '教育附加', debit: 312, credit: 0 , explanation: '应交税费减少。' }, { subjectCode: '100201', summary: '缴税', debit: 0, credit: 11440 , explanation: '银行存款减少。' }],
    documents: [{ type: 'bank', label: '缴税回单', date: '2026-12-01', totalAmount: 11440, payer: '本公司', payeeName: 'XX市税务局', content: '11月增值税及附加税', refNo: 'HD202612010010' }]},
  { date: '2026-12-02', role: 'accountant', title: '发放11月员工工资', tags: ["工资"], difficulty: 2, tip: '每月10日前发上月工资。',
    description: '银行代发11月工资，实发76,500元。',
    entries: [{ subjectCode: '221101', summary: '发11月工资', debit: 90000, credit: 0 , explanation: '应付职工薪酬减少。' }, { subjectCode: '100201', summary: '实发', debit: 0, credit: 76500 , explanation: '银行存款减少。' }, { subjectCode: '224101', summary: '代扣社保', debit: 0, credit: 9000 , explanation: '其他应付款增加。' }, { subjectCode: '224102', summary: '代扣公积金', debit: 0, credit: 4500 , explanation: '其他应付款增加。' }],
    documents: [{ type: 'bank', label: '代发工资回单', date: '2026-12-02', totalAmount: 76500, payer: '本公司', payerAccount: '6222 0200 **** 1234', payeeName: '员工代发户', content: '11月工资代发（共6人）', refNo: 'HD202612020020' }]},
  { date: '2026-12-03', role: 'accountant', title: '提取备用金', tags: ["资金"], difficulty: 1, tip: '备用金满足日常开支。',
    description: '提取现金5,000元。',
    entries: [{ subjectCode: '1001', summary: '备用金', debit: 5000, credit: 0 , explanation: '库存现金增加。' }, { subjectCode: '100201', summary: '提备用金', debit: 0, credit: 5000 , explanation: '银行存款减少。' }],
    documents: [{ type: 'bank', label: '现金支票回单', date: '2026-12-03', totalAmount: 5000, payer: '本公司', payerAccount: '6222 0200 **** 1234', payeeName: '本公司（现金）', content: '提取备用金', refNo: 'HD202612030030' }]},
  { date: '2026-12-04', role: 'accountant', title: '支付房租', tags: ["费用"], difficulty: 1, tip: '房租按月支付。',
    description: '支付12月租金8,000元。',
    entries: [{ subjectCode: '660207', summary: '房租', debit: 8000, credit: 0 , explanation: '管理费用增加。' }, { subjectCode: '100201', summary: '付房租', debit: 0, credit: 8000 , explanation: '银行存款减少。' }],
    documents: [{ type: 'receipt', label: '收据', docTitle: '房屋租赁专用收据', date: '2026-12-04', totalAmount: 8000, payer: '本公司', paymentMethod: '银行转账', stampText: 'XX物业管理有限公司\n财务专用章', receiver: '王XX', items: [{ name: 'XX大厦801室 12月租金', qty: 1, price: 8000, amount: 8000 }]}]},
  { date: '2026-12-05', role: 'accountant', title: '采购原材料', tags: ["采购"], difficulty: 2, tip: '进项税可抵扣。',
    description: '采购A型钢材10吨，价款150,000元，增值税19,500元。',
    entries: [{ subjectCode: '1403', summary: '采购', debit: 150000, credit: 0 , explanation: '原材料增加。' }, { subjectCode: '222101', summary: '进项税', debit: 19500, credit: 0 , explanation: '应交税费减少。' }, { subjectCode: '220201', summary: '应付', debit: 0, credit: 169500 , explanation: '应付账款增加。' }],
    documents: [{ type: 'text', label: '入库单', docTitle: '收  料  单', date: '2026-12-05', stampText: '仓库\n验收专用章', content: '供应商：丙公司\n入库日期：2026-12-05\n\n材料名称：A型钢材 Φ25mm\n数量：10吨\n单价：15,000元/吨\n金额：150,000.00元\n\n增值税进项税额：19,500.00元（13%）\n\n检验结果：合格 ✓\n保管员：刘保管\n验收员：陈检验',
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
        '2026-12-05'
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
  { date: '2026-12-06', role: 'accountant', title: '支付供应商货款', tags: ["采购","资金"], difficulty: 1, tip: '按合同账期支付。',
    description: '支付丙公司采购款169,500元。',
    entries: [{ subjectCode: '220201', summary: '付丙公司', debit: 169500, credit: 0 , explanation: '应付账款减少。' }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 169500 , explanation: '银行存款减少。' }],
    documents: [{ type: 'bank', label: '转账回单', date: '2026-12-06', totalAmount: 169500, payer: '本公司', payerAccount: '6222 0200 **** 1234', payeeName: '丙公司', payeeAccount: '6222 0200 **** 8888', content: '支付12月采购款', refNo: 'HD202612060040' }]},
  { date: '2026-12-07', role: 'accountant', title: '生产领料', tags: ["生产"], difficulty: 2, tip: '借生产成本，贷原材料。',
    description: '领用A型钢材6吨，合计90,000元。',
    entries: [{ subjectCode: '500101', summary: '领料', debit: 90000, credit: 0 , explanation: '生产成本增加。' }, { subjectCode: '1403', summary: '领料', debit: 0, credit: 90000 , explanation: '原材料减少。' }],
    documents: [{ type: 'text', label: '领料单', docTitle: '领  料  单', date: '2026-12-07', stampText: '仓库\n发料专用章', content: '领用部门：生产车间   领料单号：LL20261207016\n\n材料名称：A型钢材 Φ25mm\n数量：6吨\n单价：15,000元/吨\n金额：90,000.00元\n\n用途：生产A产品（订单号PO2026016）\n\n领料人：张生产\n发料人：刘保管\n审核人：李会计',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '领用部门',
        '生产车间   领料单号：LL20261207016'
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
        '生产A产品（订单号PO2026016）'
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
  { date: '2026-12-08', role: 'accountant', title: '直接人工归集', tags: ["生产"], difficulty: 2, tip: '人工计入生产成本。',
    description: '生产工人工资35,000元。',
    entries: [{ subjectCode: '500102', summary: '人工', debit: 35000, credit: 0 , explanation: '生产成本增加。' }, { subjectCode: '221101', summary: '计提', debit: 0, credit: 35000 , explanation: '应付职工薪酬增加。' }],
    documents: [{ type: 'text', label: '工资计算表', docTitle: '直 接 人 工 费 用 分 配 表', date: '2026-12-08', stampText: '人力资源部\n工资专用章', content: '直接人工费用分配\n期间：2026年12月\n\n生产车间直接生产工人工资：35,000.00元\n\n工时统计：\n  A产品生产工时：2,500小时\n\n分配计算：\n  工资分配率 = 35,000 ÷ 2,500 = 14.00元/小时\n  计入生产成本-直接人工：35,000.00元\n\n制表：王出纳\n审核：李会计\n批准：赵总',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年12月'
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
  { date: '2026-12-09', role: 'accountant', title: '销售商品', tags: ["销售"], difficulty: 2, tip: '借银行，贷收入、税费。',
    description: '销售100台，价款200,000元，增值税26,000元已收。',
    entries: [{ subjectCode: '100201', summary: '销100台', debit: 226000, credit: 0 , explanation: '银行存款增加。' }, { subjectCode: '6001', summary: '收入', debit: 0, credit: 200000 , explanation: '主营业务收入增加。' }, { subjectCode: '222101', summary: '销项税', debit: 0, credit: 26000 , explanation: '应交税费增加。' }],
    documents: [{ type: 'invoice', label: '增值税专用发票', region: '广东', invoiceType: '专用', copy: '发票联', invoiceNo: '4400612121', date: '2026年12月09日', buyer: '子公司', buyerTaxId: '91440101MACCCCCCCC', seller: '本公司', sellerTaxId: '91440101MA3XXXXXXXX', stampText: '发票专用章', payee: '李四', reviewer: '王五', drawer: '赵六', lineItems: [{ name: 'A产品', unit: '台', qty: 100, price: 2000, amount: 200000, taxRate: '13%', tax: 26000 }], totalAmount: 226000 }, { type: 'bank', label: '收款回单', date: '2026-12-09', totalAmount: 226000, payer: '子公司', payerAccount: '6222 0100 **** 5555', payeeName: '本公司', payeeAccount: '6222 0200 **** 1234', content: '购买A产品货款及增值税', refNo: 'HD202612090060' }]},
  { date: '2026-12-10', role: 'accountant', title: '收取租金', tags: ["资产","销售"], difficulty: 2, tip: '租金入其他业务收入。',
    description: '收取12月办公楼租金12,000元。',
    entries: [{ subjectCode: '100201', summary: '租金', debit: 12000, credit: 0 , explanation: '银行存款增加。' }, { subjectCode: '6051', summary: '租金收入', debit: 0, credit: 12000 , explanation: '其他业务收入增加。' }],
    documents: [{ type: 'receipt', label: '收据', docTitle: '房屋租赁收款收据', date: '2026-12-10', totalAmount: 12000, payer: '某承租方', paymentMethod: '银行转账', stampText: '本公司\n财务专用章', receiver: '李会计', items: [{ name: 'XX大厦801室 12月租金收入', qty: 1, price: 12000, amount: 12000 }]}]},
  { date: '2026-12-11', role: 'accountant', title: '生产领料-辅助材料', tags: ["生产"], difficulty: 2, tip: '辅助材料入制造费用。',
    description: '领用辅助材料4,000元。',
    entries: [{ subjectCode: '5101', summary: '辅料', debit: 4000, credit: 0 , explanation: '制造费用增加。' }, { subjectCode: '1403', summary: '辅料', debit: 0, credit: 4000 , explanation: '原材料减少。' }],
    documents: [{ type: 'text', label: '领料单', docTitle: '领  料  单', date: '2026-12-11', stampText: '仓库\n发料专用章', content: '领用部门：生产车间   领料单号：LL20261211017\n\n材料名称：B型材料\n数量：1批\n金额：4,000.00元\n\n用途：机物料消耗（设备润滑维护）\n\n领料人：张生产\n发料人：刘保管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '领用部门',
        '生产车间   领料单号：LL20261211017'
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
  { date: '2026-12-14', role: 'accountant', title: '制造费用归集分配', tags: ["生产"], difficulty: 2, tip: '分配后余额归零。',
    description: '归集分配制造费用9,000元。',
    entries: [{ subjectCode: '5101', summary: '归集', debit: 5000, credit: 0 , explanation: '制造费用增加。' }, { subjectCode: '1602', summary: '折旧', debit: 0, credit: 2000 , explanation: '累计折旧增加。' }, { subjectCode: '100201', summary: '车间水电', debit: 0, credit: 3000 , explanation: '银行存款减少。' }, { subjectCode: '500103', summary: '分配', debit: 9000, credit: 0 , explanation: '生产成本增加。' }, { subjectCode: '5101', summary: '分配', debit: 0, credit: 9000 , explanation: '制造费用减少。' }],
    documents: [{ type: 'text', label: '制造费用表', docTitle: '制 造 费 用 归 集 分 配 表', date: '2026-12-14', stampText: '财务专用章', content: '制造费用归集分配\n期间：2026年12月\n\n归集明细：\n1. 辅助材料（机物料）：4,000.00元\n2. 折旧费——机器设备：2,000.00元\n3. 车间水电费：3,000.00元\n  归集总额：9,000.00元\n\n分配：\n  分配率 = 9,000 ÷ 2,500工时 = 3.60元/小时\n  计入生产成本-制造费用：9,000.00元\n\n分配后制造费用余额：0.00元 ✓\n\n制表：李会计\n审核：赵会计主管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年12月'
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
  { date: '2026-12-15', role: 'accountant', title: '完工产品入库', tags: ["生产"], difficulty: 2, tip: '借库存，贷生产成本。',
    description: '本月100台完工，成本134,000元。',
    entries: [{ subjectCode: '1405', summary: '完工', debit: 134000, credit: 0 , explanation: '库存商品增加。' }, { subjectCode: '500101', summary: '材料', debit: 0, credit: 90000 , explanation: '生产成本减少。' }, { subjectCode: '500102', summary: '人工', debit: 0, credit: 35000 , explanation: '生产成本减少。' }, { subjectCode: '500103', summary: '制造费用', debit: 0, credit: 9000 , explanation: '生产成本减少。' }],
    documents: [{ type: 'text', label: '入库单', docTitle: '产 品 入 库 单', date: '2026-12-15', stampText: '仓库\n验收专用章', content: '入库部门：生产车间   入库单号：RK20261215008\n\n产品名称：A产品\n规格型号：标准型\n\n完工数量：100台\n\n成本构成：\n  直接材料：90,000.00元\n  直接人工：35,000.00元\n  制造费用：9,000.00元\n━━━━━━━━━━━━━━━━━━━━━\n  总成本：134,000.00元\n  单位成本：1,340.00元/台\n\n质检结论：合格 ✓\n\n仓库验收：刘保管\n质量检验：陈检验',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '入库部门',
        '生产车间   入库单号：RK20261215008'
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
  { date: '2026-12-16', role: 'accountant', title: '结转销售成本', tags: ["生产","成本"], difficulty: 3, tip: '先进先出法。',
    description: '结转销售成本。',
    entries: [{ subjectCode: '6401', summary: '结转成本', debit: 134000, credit: 0 , explanation: '主营业务成本增加。' }, { subjectCode: '1405', summary: '转成本', debit: 0, credit: 134000 , explanation: '库存商品减少。' }],
    documents: [{ type: 'text', label: '成本计算表', docTitle: '销 售 成 本 计 算 表', date: '2026-12-16', stampText: '财务专用章', content: '销售成本计算（先进先出法）\n期间：2026年12月\n\n本月销售数量：80台\n\n库存明细：\n  11月结余：60台×1,190=71,400.00元\n  12月完工：100台×1,340=134,000.00元\n  可售合计：205,400.00元\n\n本期结转：\n  80台 = 134,000.00元（简化全额结转）\n\n期末结余：80台×...=71,400.00元\n\n制表：李会计\n审核：赵会计主管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年12月'
      ],
      [
        '本月销售数量',
        '80台'
      ],
      [
        '11月结余',
        '60台×1,190=71,400.00元'
      ],
      [
        '12月完工',
        '100台×1,340=134,000.00元'
      ],
      [
        '可售合计',
        '205,400.00元'
      ],
      [
        '期末结余',
        '80台×...=71,400.00元'
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
  { date: '2026-12-17', role: 'accountant', title: '收取庚公司股利', tags: ["资产"], difficulty: 2, tip: '收到股利冲减长期股权投资。',
    description: '收到庚公司现金股利15,000元。',
    entries: [{ subjectCode: '100201', summary: '收到股利', debit: 15000, credit: 0 , explanation: '银行存款增加。' }, { subjectCode: '1131', summary: '应收股利', debit: 0, credit: 15000 , explanation: '应收股利减少。' }],
    documents: [{ type: 'bank', label: '收款回单', date: '2026-12-17', totalAmount: 15000, payer: '庚公司', payerAccount: '6222 0100 **** 9999', payeeName: '本公司', content: '庚公司2026年度现金股利', refNo: 'HD202612170070' }, { type: 'text', label: '股利分配通知', docTitle: '股 东 大 会 分 配 决 议', date: '2026-12-17', stampText: '庚公司\n股东大会章', content: '庚公司2026年度利润分配决议\n\n每股派发现金股利：0.15元\n本公司持股：100,000股\n\n应收股利：100,000×0.15=15,000.00元\n\n支付日期：2026年12月17日\n\n（采用成本法核算，股利确认为投资收益）',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '每股派发现金股利',
        '0.15元'
      ],
      [
        '本公司持股',
        '100,000股'
      ],
      [
        '应收股利',
        '100,000×0.15=15,000.00元'
      ],
      [
        '支付日期',
        '2026年12月17日'
      ],
    ] }]},
  { date: '2026-12-18', role: 'accountant', title: '支付广告费', tags: ["费用"], difficulty: 1, tip: '广告费入销售费用。',
    description: '支付12月推广费6,000元。',
    entries: [{ subjectCode: '660101', summary: '广告费', debit: 6000, credit: 0 , explanation: '销售费用增加。' }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 6000 , explanation: '银行存款减少。' }],
    documents: [{ type: 'receipt', label: '服务发票', docTitle: '网络推广服务费发票', date: '2026-12-18', totalAmount: 6000, payer: '本公司', stampText: '百度\n发票专用章', items: [{ name: '搜索推广服务费（12月）', qty: 1, price: 6000, amount: 6000 }]}]},
  { date: '2026-12-19', role: 'accountant', title: '计提工资及折旧', tags: ["工资","资产"], difficulty: 1, tip: '年末最后一次计提工资及折旧。', description: '计提12月工资90,000元及折旧625元。年末最后一次计提，确保全年数据准确。', entries: [{ subjectCode: '660203', summary: '计提行政部工资', debit: 25000, credit: 0, explanation: '管理费用-工资增加。' }, { subjectCode: '660103', summary: '计提销售部工资', debit: 35000, credit: 0, explanation: '销售费用增加。' }, { subjectCode: '500102', summary: '计提生产部工资', debit: 30000, credit: 0, explanation: '生产成本-直接人工增加。' }, { subjectCode: '221101', summary: '计提本月工资', debit: 0, credit: 90000, explanation: '应付职工薪酬-工资增加。' }, { subjectCode: '660205', summary: '计提折旧', debit: 625, credit: 0, explanation: '管理费用-折旧费增加。' }, { subjectCode: '1602', summary: '计提折旧', debit: 0, credit: 625, explanation: '累计折旧增加。本年累计折旧合计。' }], documents: [{ type: 'text', label: '12月计提表', docTitle: '12 月 计 提 计 算 表', date: '2026-12-19', stampText: '财务专用章', content: '一、工资计提：90,000元\n\n二、折旧计提：625元\n\n三、全年累计\n  工资计提：1,080,000元（12×90,000）\n  折旧计提：电脑125×11+车床500×9+\n             =待计算=\n\n年末最后一次计提，请核对全年累计数据。\n\n制表：李会计  审核：赵会计主管' }]},
  { date: '2026-12-20', role: 'accountant', title: '差旅费报销', tags: ["费用"], difficulty: 1, tip: '差旅费入管理费。',
    description: '报销差旅费3,000元。',
    entries: [{ subjectCode: '660202', summary: '差旅', debit: 3000, credit: 0 , explanation: '管理费用增加。' }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 3000 , explanation: '银行存款减少。' }],
    documents: [{ type: 'receipt', label: '报销单', docTitle: '差 旅 费 报 销 单', date: '2026-12-20', totalAmount: 3000, payer: '本公司', stampText: '财务\n审核专用章', items: [{ name: '往返高铁票', qty: 2, price: 600, amount: 1200 }, { name: '住宿费（2晚）', qty: 2, price: 600, amount: 1200 }, { name: '出差补贴（2天）', qty: 2, price: 200, amount: 400 }, { name: '市内交通费', qty: 1, price: 200, amount: 200 }]}]},
  { date: '2026-12-21', role: 'accountant', title: '计提借款利息', tags: ["融资"], difficulty: 2, tip: '按月计提到期付息。',
    description: '计提12月利息544元。',
    entries: [{ subjectCode: '6603', summary: '利息', debit: 544, credit: 0 , explanation: '财务费用增加。' }, { subjectCode: '2232', summary: '应付利息', debit: 0, credit: 544 , explanation: '应付利息增加。' }],
    documents: [{ type: 'text', label: '利息计算表', docTitle: '借 款 利 息 计 算 表', date: '2026-12-21', stampText: '财务专用章', content: '短期借款利息计算\n期间：2026年12月\n\n借款余额：150,000.00元\n年利率：4.35%\n\n本月利息 = 150,000 × 4.35% ÷ 12 = 543.75元（取整544元）\n\n制表：李会计',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年12月'
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
  { date: '2026-12-22', role: 'accountant', title: '银行利息', tags: ["资金"], difficulty: 1, tip: '利息冲财务费用。',
    description: '12月利息5,000元，手续费400元。',
    entries: [{ subjectCode: '100201', summary: '利息', debit: 5000, credit: 0 , explanation: '银行存款增加。' }, { subjectCode: '6603', summary: '冲财务', debit: 0, credit: 5000 , explanation: '财务费用减少。' }, { subjectCode: '6603', summary: '手续费', debit: 400, credit: 0 , explanation: '财务费用增加。' }, { subjectCode: '100201', summary: '手续费', debit: 0, credit: 400 , explanation: '银行存款减少。' }],
    documents: [{ type: 'bank', label: '结息回单', date: '2026-12-22', totalAmount: 5000, payer: '中国工商银行', payeeName: '本公司', content: '2026年12月存款利息收入', refNo: 'HD20261222INT' }, { type: 'bank', label: '手续费回单', date: '2026-12-22', totalAmount: 400, payer: '本公司', payeeName: '中国工商银行', content: '12月转账及账户维护费', refNo: 'HD20261222FEE' }]},
  { date: '2026-12-23', role: 'accountant', title: '计提坏账准备', tags: ["资产","期末"], difficulty: 2, tip: '年末按应收余额5%计提。',
    description: '计提坏账准备8,000元。',
    entries: [{ subjectCode: '6701', summary: '坏账', debit: 8000, credit: 0 , explanation: '资产减值损失增加。' }, { subjectCode: '123101', summary: '坏账', debit: 0, credit: 8000 , explanation: '坏账准备增加。' }],
    documents: [{ type: 'text', label: '减值计算表', docTitle: '坏 账 准 备 计 提 表', date: '2026-12-23', stampText: '财务专用章', content: '坏账准备计提（年末）\n期间：2026年12月\n\n应收账款期末余额：160,000.00元\n计提比例：5%\n\n计提金额：160,000 × 5% = 8,000.00元\n\n年末累计坏账准备余额：×××元\n\n制表：李会计\n审核：赵会计主管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年12月'
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
        '年末累计坏账准备余额',
        '×××元'
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
  { date: '2026-12-24', role: 'accountant', title: '购买办公用品', tags: ["费用"], difficulty: 1, tip: '办公用品入管理费。',
    description: '购买办公用品1,000元。',
    entries: [{ subjectCode: '660201', summary: '办公用品', debit: 1000, credit: 0 , explanation: '管理费用增加。' }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 1000 , explanation: '银行存款减少。' }],
    documents: [{ type: 'receipt', label: '收据', docTitle: '购 物 发 票', date: '2026-12-24', totalAmount: 1000, payer: '本公司', stampText: '办公用品\n发票专用章', items: [{ name: '打印纸A4（5包）', qty: 5, price: 100, amount: 500 }, { name: '签字笔（24支装）', qty: 1, price: 120, amount: 120 }, { name: '订书机+订书钉', qty: 5, price: 36, amount: 180 }, { name: '档案盒', qty: 5, price: 40, amount: 200 }]}]},
  { date: '2026-12-24', role: 'accountant', title: '支付水电费', tags: ["费用"], difficulty: 1, tip: '水电费入管理费。',
    description: '支付12月水电费5,000元。',
    entries: [{ subjectCode: '660208', summary: '水电费', debit: 5000, credit: 0 , explanation: '管理费用增加。' }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 5000 , explanation: '银行存款减少。' }],
    documents: [{ type: 'receipt', label: '电费单', docTitle: '电 费 缴 费 凭 证', date: '2026-12-24', totalAmount: 3500, payer: '本公司', stampText: '国家电网\n电费收讫章', items: [{ name: '有功电量 3,500kWh×1.00元', qty: 3500, price: 1, amount: 3500 }]}, { type: 'receipt', label: '水费单', docTitle: '水 费 缴 费 凭 证', date: '2026-12-24', totalAmount: 1500, payer: '本公司', stampText: '自来水公司\n水费收讫章', items: [{ name: '用水量 375吨×4.00元', qty: 375, price: 4, amount: 1500 }]}]},
  { date: '2026-12-25', role: 'accountant', title: '计提附加税及Q4所得税', tags: ["税费","期末"], difficulty: 3, tip: 'Q4末计提所得税。',
    description: '应纳增值税6,500，城建税455，教育附加195。Q4所得税30,000。',
    entries: [{ subjectCode: '6403', summary: '城建税', debit: 455, credit: 0 , explanation: '税金及附加增加。' }, { subjectCode: '222103', summary: '城建税', debit: 0, credit: 455 , explanation: '应交税费增加。' }, { subjectCode: '6403', summary: '教育附加', debit: 195, credit: 0 , explanation: '税金及附加增加。' }, { subjectCode: '222104', summary: '教育附加', debit: 0, credit: 195 , explanation: '应交税费增加。' }, { subjectCode: '6801', summary: 'Q4所得税', debit: 30000, credit: 0 , explanation: '所得税费用增加。' }, { subjectCode: '222102', summary: '应交所得税', debit: 0, credit: 30000 , explanation: '应交税费增加。' }],
    documents: [{ type: 'text', label: '税费计算表', docTitle: '12 月 税 费 及 Q4 所 得 税 计 提 表', date: '2026-12-25', stampText: '财务专用章', content: '12月附加税及Q4所得税计提\n期间：2026年12月（Q4）\n\n附加税计税依据：\n  应纳增值税：6,500.00元\n\n附加税计提：\n  城市维护建设税（7%）：6,500×7%=455.00元\n  教育费附加（3%）：6,500×3%=195.00元\n  合计：650.00元\n\nQ4企业所得税：\n  Q4应纳税所得额：120,000.00元\n  税率：25%\n  应缴所得税：30,000.00元\n\n制表：李会计  审核：赵会计主管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年12月（Q4）'
      ],
      [
        '应纳增值税',
        '6,500.00元'
      ],
      [
        '城市维护建设税（7%）',
        '6,500×7%=455.00元'
      ],
      [
        '教育费附加（3%）',
        '6,500×3%=195.00元'
      ],
      [
        '合计',
        '650.00元'
      ],
      [
        'Q4应纳税所得额',
        '120,000.00元'
      ],
      [
        '税率',
        '25%'
      ],
      [
        '应缴所得税',
        '30,000.00元'
      ],
      [
        '制表',
        '李会计  审核：赵会计主管'
      ],
    ] }]},
  { date: '2026-12-25', role: 'accountant', title: '年末资产盘点', tags: ["资产","期末"], difficulty: 2, tip: '年末全面盘点。',
    description: '固定资产全面盘点，账实相符。',
    entries: [{ subjectCode: '660214', summary: '盘点费用', debit: 2000, credit: 0 , explanation: '管理费用增加。' }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 2000 , explanation: '银行存款减少。' }],
    documents: [{ type: 'text', label: '盘点报告', docTitle: '年 末 资 产 盘 点 报 告', date: '2026-12-25', stampText: '财务部\n盘点专用章', content: '2026年度固定资产盘点报告\n\n盘点日期：2026年12月25日\n\n盘点范围：全部固定资产\n\n盘点结果：\n┌──────────┬──────┬──────┬──────┐\n│ 资产类别   │ 账面 │ 实盘 │ 差异 │\n├──────────┼──────┼──────┼──────┤\n│ 生产设备   │ 2台  │ 2台  │ 无   │\n│ 办公设备   │ 8台  │ 8台  │ 无   │\n│ 运输工具   │ 1辆  │ 1辆  │ 无   │\n│ 房屋建筑   │ 1处  │ 1处  │ 无   │\n└──────────┴──────┴──────┴──────┘\n\n盘点结论：账实相符 ✓\n盘点费用：2,000.00元（聘请外部盘点机构）\n\n盘点人：刘保管\n监盘人：李会计\n批准人：赵总',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '盘点日期',
        '2026年12月25日'
      ],
      [
        '盘点范围',
        '全部固定资产'
      ],
      [
        '盘点结论',
        '账实相符 ✓'
      ],
      [
        '盘点费用',
        '2,000.00元（聘请外部盘点机构）'
      ],
      [
        '盘点人',
        '刘保管'
      ],
      [
        '监盘人',
        '李会计'
      ],
      [
        '批准人',
        '赵总'
      ],
    ] }]},
  { date: '2026-12-28', role: 'accountant', title: '本年利润结转至利润分配', tags: ["期末"], difficulty: 3, tip: '年末结转本年利润。',
    description: 'H2净利润转入利润分配-未分配利润。',
    entries: [{ subjectCode: '4103', summary: '结转净利润', debit: 500000, credit: 0 , explanation: '本年利润转出。' }, { subjectCode: '410401', summary: '未分配利润', debit: 0, credit: 500000 , explanation: '利润分配增加。' }],
    documents: [{ type: 'text', label: '结转表', docTitle: '年 末 本 年 利 润 结 转 表', date: '2026-12-28', stampText: '已结转', content: '年末本年利润结转\n会计期间：2026年度（H2）\n\n本年利润（4103）余额（贷方）：500,000.00元\n\n结转至利润分配——未分配利润：\n  借：本年利润  500,000\n  贷：利润分配——未分配利润  500,000\n\n结转后本年利润余额为零 ✓\n\n制表：李会计\n审核：赵会计主管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '会计期间',
        '2026年度（H2）'
      ],
      [
        '本年利润（4103）余额（贷方）',
        '500,000.00元'
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
  { date: '2026-12-29', role: 'accountant', title: '提取法定盈余公积', tags: ["期末"], difficulty: 3, tip: '按净利润10%提取。',
    description: '提取法定盈余公积50,000元。',
    entries: [{ subjectCode: '410402', summary: '提取法定盈余公积', debit: 50000, credit: 0 , explanation: '利润分配减少。' }, { subjectCode: '410101', summary: '盈余公积-法定', debit: 0, credit: 50000 , explanation: '科目减少。' }],
    documents: [{ type: 'text', label: '盈余公积计算表', docTitle: '法 定 盈 余 公 积 计 提 表', date: '2026-12-29', stampText: '财务专用章', content: '法定盈余公积计提\n会计期间：2026年度\n\n净利润：500,000.00元\n提取比例：10%（法定）\n\n计提金额：500,000 × 10% = 50,000.00元\n\n会计分录：\n  借：利润分配——提取法定盈余公积  50,000\n  贷：盈余公积——法定盈余公积      50,000\n\n法律依据：《公司法》第166条\n\n制表：李会计\n审核：赵会计主管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '会计期间',
        '2026年度'
      ],
      [
        '净利润',
        '500,000.00元'
      ],
      [
        '提取比例',
        '10%（法定）'
      ],
      [
        '计提金额',
        '500,000 × 10% = 50,000.00元'
      ],
      [
        '法律依据',
        '《公司法》第166条'
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
  { date: '2026-12-29', role: 'accountant', title: '提取任意盈余公积', tags: ["期末"], difficulty: 3, tip: '按净利润5%提取。',
    description: '提取任意盈余公积25,000元。使用法定盈余公积科目（教学简化）。',
    entries: [{ subjectCode: '410402', summary: '提取任意盈余公积', debit: 25000, credit: 0 , explanation: '利润分配减少。' }, { subjectCode: '410101', summary: '盈余公积', debit: 0, credit: 25000 , explanation: '科目减少。' }],
    documents: [{ type: 'text', label: '盈余公积计算表', docTitle: '任 意 盈 余 公 积 计 提 表', date: '2026-12-29', stampText: '财务专用章', content: '任意盈余公积计提\n会计期间：2026年度\n\n净利润：500,000.00元\n提取比例：5%（股东会决议）\n\n计提金额：500,000 × 5% = 25,000.00元\n\n会计分录：\n  借：利润分配——提取任意盈余公积  25,000\n  贷：盈余公积——任意盈余公积      25,000\n\n股东会决议编号：2026-12-28-001\n\n制表：李会计\n审核：赵会计主管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '会计期间',
        '2026年度'
      ],
      [
        '净利润',
        '500,000.00元'
      ],
      [
        '提取比例',
        '5%（股东会决议）'
      ],
      [
        '计提金额',
        '500,000 × 5% = 25,000.00元'
      ],
      [
        '股东会决议编号',
        '2026-12-28-001'
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
  { date: '2026-12-30', role: 'accountant', title: '分配现金股利', tags: ["期末"], difficulty: 3, tip: '向股东分配股利。',
    description: '宣告分配现金股利100,000元。',
    entries: [{ subjectCode: '410402', summary: '分配股利', debit: 100000, credit: 0 , explanation: '利润分配减少。' }, { subjectCode: '2231', summary: '应付股利', debit: 0, credit: 100000 , explanation: '应付股利增加。' }],
    documents: [{ type: 'text', label: '股利分配决议', docTitle: '股 东 会 决 议——利 润 分 配', date: '2026-12-30', stampText: '本公司\n股东大会章', content: '2026年度利润分配决议\n\n一、净利润：500,000.00元\n\n二、分配顺序：\n1. 提取法定盈余公积（10%）：50,000.00元\n2. 提取任意盈余公积（5%）：25,000.00元\n3. 分配现金股利：100,000.00元\n4. 剩余未分配利润结转下年：325,000.00元\n\n三、现金股利分配方案：\n  每股派发现金股利：0.10元\n  总股本：1,000,000股\n  应付股利总额：100,000.00元\n\n四、股权登记日：2027年1月10日\n  除息日：2027年1月11日\n\n决议日期：2026年12月28日\n\n盖章生效',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '一、净利润',
        '500,000.00元'
      ],
      [
        '每股派发现金股利',
        '0.10元'
      ],
      [
        '总股本',
        '1,000,000股'
      ],
      [
        '应付股利总额',
        '100,000.00元'
      ],
      [
        '四、股权登记日',
        '2027年1月10日'
      ],
      [
        '除息日',
        '2027年1月11日'
      ],
      [
        '决议日期',
        '2026年12月28日'
      ],
    ] }]},
  { date: '2026-12-31', role: 'accountant', title: '模拟纳税申报', tags: ["期末","申报"], difficulty: 1, tip: '年末申报含Q4所得税。',
    description: '年末最后一天进行模拟纳税申报。', entries: [], nextAction: 'tax-filing',
    documents: [{ type: 'text', label: '申报提醒', docTitle: '12 月 / Q4 纳 税 申 报 提 醒', stampText: '财务专用章', content: '申报期间：2026年12月/Q4/全年\n截止日期：2027年1月15日\n\n申报税种：\n1. 增值税（12月）\n2. 城市维护建设税\n3. 教育费附加\n4. Q4企业所得税预缴\n\n年末需关注：\n- 全年所得税汇算清缴（次年5月31日前）\n- 核实全年应交税费余额\n\n请前往纳税申报页面核对后提交。' }]},
]
export default dec
