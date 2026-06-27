const apr = [
  { date: '2026-04-01', role: 'accountant', title: '缴纳Q1企业所得税及附加税', tags: ["税费"], difficulty: 2, tip: 'Q1所得税季末后15日内缴纳。',
    description: '缴纳Q1所得税12,500元、城建税2,184元、教育费附加936元，合计15,620元。',
    entries: [{ subjectCode: '222102', summary: '所得税', debit: 12500, credit: 0, explanation: '应交所得税减少。' }, { subjectCode: '222103', summary: '城建税', debit: 2184, credit: 0, explanation: '城建税减少。' }, { subjectCode: '222104', summary: '教育附加', debit: 936, credit: 0, explanation: '附加减少。' }, { subjectCode: '100201', summary: '缴税', debit: 0, credit: 15620, explanation: '银行减少。' }],
    documents: [{ type: 'bank', label: '缴税回单', date: '2026-04-01', totalAmount: 15620, payer: '本公司', payeeName: '国家税务总局XX市税务局', content: 'Q1企业所得税及3月附加税', refNo: 'HD202604010030' }]},
  { date: '2026-04-02', role: 'accountant', title: '银行季度结息收入', tags: ["资金"], difficulty: 1, tip: 'Q1利息收入冲减财务费用。',
    description: '收到工商银行Q1存款利息收入25,000元。',
    entries: [{ subjectCode: '100201', summary: 'Q1利息', debit: 25000, credit: 0, explanation: '银行增加。' }, { subjectCode: '6603', summary: '冲财务', debit: 0, credit: 25000, explanation: '财务费减少。' }],
    documents: [{ type: 'bank', label: '利息入账回单', date: '2026-04-02', totalAmount: 25000, payer: '中国工商银行', payeeName: '本公司', content: '2026年第一季度存款利息收入', refNo: 'HD20260402Q1INT' }]},
  { date: '2026-04-03', role: 'accountant', title: '发放3月员工工资', tags: ["工资"], difficulty: 2, tip: '每月10日前发上月工资。',
    description: '银行代发3月工资90,000元，代扣社保9,000、公积金4,500，实发76,500元。',
    entries: [{ subjectCode: '221101', summary: '发3月工资', debit: 90000, credit: 0, explanation: '应付薪酬减少。' }, { subjectCode: '100201', summary: '实发', debit: 0, credit: 76500, explanation: '银行减少。' }, { subjectCode: '224101', summary: '代扣社保', debit: 0, credit: 9000, explanation: '其他应付款增加。' }, { subjectCode: '224102', summary: '代扣公积金', debit: 0, credit: 4500, explanation: '其他应付款增加。' }],
    documents: [{ type: 'bank', label: '代发工资回单', date: '2026-04-03', totalAmount: 76500, payer: '本公司', payeeName: '员工代发户', content: '3月工资代发（共6人）', refNo: 'HD202604030040' }]},
  { date: '2026-04-04', role: 'accountant', title: '支付供应商货款', tags: ["采购","资金"], difficulty: 1, tip: '按合同账期支付。',
    description: '支付丙公司采购款135,600元。',
    entries: [{ subjectCode: '220201', summary: '付丙公司', debit: 135600, credit: 0, explanation: '应付减少。' }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 135600, explanation: '银行减少。' }],
    documents: [{ type: 'bank', label: '转账回单', date: '2026-04-04', totalAmount: 135600, payer: '本公司', payerAccount: '6222 0200 **** 1234', payeeName: '丙公司', content: '支付3月A型钢材采购款', refNo: 'HD202604040050' }]},
  { date: '2026-04-05', role: 'accountant', title: '支付房租', tags: ["费用"], difficulty: 1, tip: '房租按月支付。',
    description: '支付4月租金8,000元。',
    entries: [{ subjectCode: '660207', summary: '房租', debit: 8000, credit: 0, explanation: '管理费增加。' }, { subjectCode: '100201', summary: '付房租', debit: 0, credit: 8000, explanation: '银行减少。' }],
    documents: [{ type: 'receipt', label: '收据', docTitle: '房屋租赁专用收据', date: '2026-04-05', totalAmount: 8000, payer: '本公司', paymentMethod: '银行转账', stampText: 'XX物业管理有限公司\n财务专用章', items: [{ name: 'XX大厦801室 4月租金', qty: 1, price: 8000, amount: 8000 }]}]},
  { date: '2026-04-06', role: 'accountant', title: '采购原材料', tags: ["采购"], difficulty: 2, tip: '进项税可抵扣。',
    description: '采购A型钢材10吨，价款150,000元，增值税19,500元，价税合计169,500元未付。',
    entries: [{ subjectCode: '1403', summary: '采购', debit: 150000, credit: 0, explanation: '原材料增加。' }, { subjectCode: '222101', summary: '进项税', debit: 19500, credit: 0, explanation: '进项增加。' }, { subjectCode: '220201', summary: '应付', debit: 0, credit: 169500, explanation: '应付增加。' }],
    documents: [{ type: 'text', label: '入库单', docTitle: '收  料  单', date: '2026-04-06', stampText: '仓库\n验收专用章', content: '供应商：丙公司\n入库日期：2026-04-06\n\n材料名称：A型钢材 Φ25mm\n数量：10吨\n单价：15,000元/吨\n金额：150,000.00元\n\n增值税：19,500元（13%）\n价税合计：169,500.00元\n\n检验：合格 ✓\n保管：刘保管',
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
        '2026-04-06'
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
        '增值税',
        '19,500元（13%）'
      ],
      [
        '价税合计',
        '169,500.00元'
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
  { date: '2026-04-07', role: 'accountant', title: '提取备用金', tags: ["资金"], difficulty: 1, tip: '备用金满足日常开支。',
    description: '提取现金4,000元。',
    entries: [{ subjectCode: '1001', summary: '备用金', debit: 4000, credit: 0, explanation: '现金增加。' }, { subjectCode: '100201', summary: '提备用金', debit: 0, credit: 4000, explanation: '银行减少。' }],
    documents: [{ type: 'bank', label: '现金支票回单', date: '2026-04-07', totalAmount: 4000, payer: '本公司', payeeName: '本公司（现金）', content: '提取备用金', refNo: 'HD202604070060' }]},
  { date: '2026-04-08', role: 'accountant', title: '生产领料', tags: ["生产"], difficulty: 2, tip: '借生产成本，贷原材料。',
    description: '车间领用A型钢材6吨，单价15,000元，合计90,000元用于生产A产品。',
    entries: [{ subjectCode: '500101', summary: '领料', debit: 90000, credit: 0, explanation: '生产成本增加。' }, { subjectCode: '1403', summary: '领料', debit: 0, credit: 90000, explanation: '原材料减少。' }],
    documents: [{ type: 'text', label: '领料单', docTitle: '领  料  单', date: '2026-04-08', stampText: '仓库\n发料专用章', content: '领料部门：生产车间   领料单号：LL20260408007\n\n材料名称：A型钢材 Φ25mm\n数量：6吨\n单价：15,000元/吨\n金额：90,000.00元\n\n用途：生产A产品（订单PO2026004）\n\n领料人：张生产\n发料人：刘保管\n审核人：李会计',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '领料部门',
        '生产车间   领料单号：LL20260408007'
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
        '生产A产品（订单PO2026004）'
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
  { date: '2026-04-09', role: 'accountant', title: '现销商品', tags: ["销售"], difficulty: 2, tip: '借银行，贷收入、税费。',
    description: '向乙公司销售A产品100台，价款200,000元，增值税26,000元，合计226,000元已收。',
    entries: [{ subjectCode: '100201', summary: '销100台', debit: 226000, credit: 0, explanation: '银行增加。' }, { subjectCode: '6001', summary: '收入', debit: 0, credit: 200000, explanation: '收入增加。' }, { subjectCode: '222101', summary: '销项税', debit: 0, credit: 26000, explanation: '增值税增加。' }],
    documents: [{ type: 'invoice', label: '增值税专用发票', region: '广东', invoiceType: '专用', copy: '发票联', invoiceNo: '4400412345', date: '2026年04月09日', buyer: '乙公司', buyerTaxId: '91440101MA5XXXXXXXX', seller: '本公司', sellerTaxId: '91440101MA3XXXXXXXX', stampText: '发票专用章', payee: '李四', reviewer: '王五', drawer: '赵六', lineItems: [{ name: 'A产品', unit: '台', qty: 100, price: 2000, amount: 200000, taxRate: '13%', tax: 26000 }], totalAmount: 226000 }, { type: 'bank', label: '收款回单', date: '2026-04-09', totalAmount: 226000, payer: '乙公司', payerAccount: '6222 0100 **** 6666', payeeName: '本公司', payeeAccount: '6222 0200 **** 1234', content: '购买A产品货款及增值税', refNo: 'HD202604090080' }]},
  { date: '2026-04-10', role: 'accountant', title: '赊销商品', tags: ["销售"], difficulty: 2, tip: '借应收，贷收入、税费。',
    description: '向甲公司赊销A产品60台，价款120,000元，增值税15,600元，合计135,600元未收。',
    entries: [{ subjectCode: '112201', summary: '赊销', debit: 135600, credit: 0, explanation: '应收增加。' }, { subjectCode: '6001', summary: '收入', debit: 0, credit: 120000, explanation: '收入增加。' }, { subjectCode: '222101', summary: '销项税', debit: 0, credit: 15600, explanation: '增值税增加。' }],
    documents: [{ type: 'invoice', label: '增值税专用发票', region: '广东', invoiceType: '专用', copy: '发票联', invoiceNo: '4400412346', date: '2026年04月10日', buyer: '甲公司', buyerTaxId: '91440101MA5AAAAAA', seller: '本公司', sellerTaxId: '91440101MA3XXXXXXXX', stampText: '发票专用章', payee: '李四', reviewer: '王五', drawer: '赵六', lineItems: [{ name: 'A产品', unit: '台', qty: 60, price: 2000, amount: 120000, taxRate: '13%', tax: 15600 }], totalAmount: 135600 }]},
  { date: '2026-04-11', role: 'accountant', title: '直接人工归集', tags: ["生产"], difficulty: 2, tip: '人工计入生产成本-直接人工。',
    description: '本月生产车间直接工人工资35,000元，当月计提次月发放。',
    entries: [{ subjectCode: '500102', summary: '人工', debit: 35000, credit: 0, explanation: '生产成本增加。' }, { subjectCode: '221101', summary: '计提', debit: 0, credit: 35000, explanation: '应付薪酬增加。' }],
    documents: [{ type: 'text', label: '工资计算表', docTitle: '直 接 人 工 费 用 分 配 表', date: '2026-04-11', stampText: '人力资源部\n工资专用章', content: '直接人工费用分配\n期间：2026年4月\n\n生产车间直接生产工人工资：35,000.00元\n\n工时统计：\n  A产品生产工时：2,500小时\n\n分配计算：\n  工资分配率 = 35,000 ÷ 2,500 = 14.00元/小时\n  计入生产成本-直接人工：35,000.00元\n\n制表：王出纳\n审核：李会计\n批准：赵总',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年4月'
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
  { date: '2026-04-13', role: 'accountant', title: '支付广告费', tags: ["费用"], difficulty: 1, tip: '广告费入销售费用。',
    description: '支付4月网络推广费5,000元。',
    entries: [{ subjectCode: '660101', summary: '广告费', debit: 5000, credit: 0, explanation: '销售费增加。' }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 5000, explanation: '银行减少。' }],
    documents: [{ type: 'receipt', label: '服务发票', docTitle: '网络推广服务费发票', date: '2026-04-13', totalAmount: 5000, payer: '本公司', stampText: '百度\n发票专用章', items: [{ name: '搜索推广服务费（4月）', qty: 1, price: 5000, amount: 5000 }]}]},
  { date: '2026-04-14', role: 'accountant', title: '生产领料-辅助材料', tags: ["生产"], difficulty: 2, tip: '辅助材料计入制造费用。',
    description: '车间领用辅助材料4,000元作为机物料消耗。',
    entries: [{ subjectCode: '5101', summary: '辅料', debit: 4000, credit: 0, explanation: '制造费用增加。' }, { subjectCode: '1403', summary: '辅料', debit: 0, credit: 4000, explanation: '原材料减少。' }],
    documents: [{ type: 'text', label: '领料单', docTitle: '领  料  单', date: '2026-04-14', stampText: '仓库\n发料专用章', content: '领料部门：生产车间   领料单号：LL20260414008\n\n材料名称：B型材料\n数量：2批\n金额：4,000.00元\n\n用途：机物料消耗（设备维护）\n\n领料人：张生产\n发料人：刘保管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '领料部门',
        '生产车间   领料单号：LL20260414008'
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
  { date: '2026-04-15', role: 'accountant', title: '支付水电费', tags: ["费用"], difficulty: 1, tip: '水电费入管理费。',
    description: '支付4月电费3,500元、水费1,200元，合计4,700元。',
    entries: [{ subjectCode: '660208', summary: '水电费', debit: 4700, credit: 0, explanation: '管理费增加。' }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 4700, explanation: '银行减少。' }],
    documents: [{ type: 'receipt', label: '电费单', docTitle: '电 费 缴 费 凭 证', date: '2026-04-15', totalAmount: 3500, payer: '本公司', stampText: '国家电网\n电费收讫章', items: [{ name: '有功电量 3,500kWh×1.00元', qty: 3500, price: 1, amount: 3500 }]}, { type: 'receipt', label: '水费单', docTitle: '水 费 缴 费 凭 证', date: '2026-04-15', totalAmount: 1200, payer: '本公司', stampText: '自来水公司\n水费收讫章', items: [{ name: '用水量 300吨×4.00元', qty: 300, price: 4, amount: 1200 }]}]},
  { date: '2026-04-16', role: 'accountant', title: '差旅费报销', tags: ["费用"], difficulty: 1, tip: '差旅费入管理费。',
    description: '员工报销差旅费2,800元（交通1,500+住宿1,000+餐补300）。',
    entries: [{ subjectCode: '660202', summary: '差旅', debit: 2800, credit: 0, explanation: '管理费增加。' }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 2800, explanation: '银行减少。' }],
    documents: [{ type: 'receipt', label: '报销单', docTitle: '差 旅 费 报 销 单', date: '2026-04-16', totalAmount: 2800, payer: '本公司', stampText: '财务\n审核专用章', items: [{ name: '交通费', qty: 1, price: 1500, amount: 1500 }, { name: '住宿费', qty: 1, price: 1000, amount: 1000 }, { name: '餐补', qty: 1, price: 300, amount: 300 }]}]},
  { date: '2026-04-17', role: 'accountant', title: '购买短期国债', tags: ["资产"], difficulty: 3, tip: '短期国债按成本入账。',
    description: '使用闲置资金购买3个月期国债50,000元，年化收益率3%。',
    entries: [{ subjectCode: '110101', summary: '购国债', debit: 50000, credit: 0, explanation: '金融资产增加。' }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 50000, explanation: '银行减少。' }],
    documents: [{ type: 'text', label: '国债认购单', docTitle: '国 债 认 购 凭 证', date: '2026-04-17', stampText: '中国工商银行\n业务专用章', content: '产品名称：2026年记账式国债\n期限：3个月\n认购金额：50,000.00元\n年化收益率：3%\n起息日：2026-04-17\n到期日：2026-07-17\n\n经办行：中国工商银行XX支行',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '产品名称',
        '2026年记账式国债'
      ],
      [
        '期限',
        '3个月'
      ],
      [
        '认购金额',
        '50,000.00元'
      ],
      [
        '年化收益率',
        '3%'
      ],
      [
        '起息日',
        '2026-04-17'
      ],
      [
        '到期日',
        '2026-07-17'
      ],
      [
        '经办行',
        '中国工商银行XX支行'
      ],
    ] }]},
  { date: '2026-04-18', role: 'accountant', title: '出售旧设备', tags: ["资产"], difficulty: 3, tip: '售价与账面净值差额入营业外收支。',
    description: '出售旧机器一台，原值100,000元，已提折旧60,000元，售价35,000元，处置损失5,000元。',
    entries: [{ subjectCode: '100201', summary: '售设备款', debit: 35000, credit: 0, explanation: '银行增加。' }, { subjectCode: '1602', summary: '转折旧', debit: 60000, credit: 0, explanation: '折旧减少。' }, { subjectCode: '6711', summary: '处置损失', debit: 5000, credit: 0, explanation: '营业外支出增加。' }, { subjectCode: '160102', summary: '设备减少', debit: 0, credit: 100000, explanation: '固定资产减少。' }],
    documents: [{ type: 'bank', label: '收款回单', date: '2026-04-18', totalAmount: 35000, payer: 'XX二手设备公司', payeeName: '本公司', content: '旧设备出售款（净值40,000-折价5,000）', refNo: 'HD202604180090' }]},
  { date: '2026-04-19', role: 'accountant', title: '制造费用归集分配', tags: ["生产"], difficulty: 2, tip: '分配后余额归零。',
    description: '归集制造费用9,000元（折旧2,000+水电3,000+辅料4,000），全部分配至生产成本。',
    entries: [{ subjectCode: '5101', summary: '归集', debit: 5000, credit: 0, explanation: '制造费用增加。' }, { subjectCode: '1602', summary: '折旧', debit: 0, credit: 2000, explanation: '折旧增加。' }, { subjectCode: '100201', summary: '车间水电', debit: 0, credit: 3000, explanation: '银行减少。' }, { subjectCode: '500103', summary: '分配', debit: 9000, credit: 0, explanation: '生产成本增加。' }, { subjectCode: '5101', summary: '分配', debit: 0, credit: 9000, explanation: '制造费用归零。' }],
    documents: [{ type: 'text', label: '制造费用表', docTitle: '制 造 费 用 归 集 分 配 表', date: '2026-04-19', stampText: '财务专用章', content: '制造费用归集分配\n期间：2026年4月\n\n归集明细：\n1. 折旧费——机器设备：2,000.00元\n2. 车间水电费：3,000.00元\n3. 辅助材料（机物料）：4,000.00元\n  归集总额：9,000.00元\n\n分配标准：生产工时\n总工时：2,500小时\n分配率 = 9,000 ÷ 2,500 = 3.60元/小时\n\n计入生产成本-制造费用：9,000.00元\n\n分配后制造费用余额：0.00元 ✓\n\n制表：李会计\n审核：赵会计主管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年4月'
      ],
      [
        '归集总额',
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
  { date: '2026-04-21', role: 'accountant', title: '完工产品入库', tags: ["生产"], difficulty: 2, tip: '借库存商品，贷生产成本。',
    description: '本月A产品100台全部完工，生产成本合计134,000元。',
    entries: [{ subjectCode: '1405', summary: '完工', debit: 134000, credit: 0, explanation: '库存增加。' }, { subjectCode: '500101', summary: '材料', debit: 0, credit: 90000, explanation: '生产转出。' }, { subjectCode: '500102', summary: '人工', debit: 0, credit: 35000, explanation: '生产转出。' }, { subjectCode: '500103', summary: '制造费用', debit: 0, credit: 9000, explanation: '生产转出。' }],
    documents: [{ type: 'text', label: '入库单', docTitle: '产 品 入 库 单', date: '2026-04-21', stampText: '仓库\n验收专用章', content: '入库部门：生产车间   入库单号：RK20260421004\n\n产品名称：A产品\n规格型号：标准型\n\n完工数量：100台\n\n成本构成：\n  直接材料：90,000.00元\n  直接人工：35,000.00元\n  制造费用：9,000.00元\n━━━━━━━━━━━━━━━━━━━━━\n  总成本：134,000.00元\n  单位成本：1,340.00元/台\n\n质检结论：合格 ✓\n\n仓库验收：刘保管\n质量检验：陈检验',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '入库部门',
        '生产车间   入库单号：RK20260421004'
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
  { date: '2026-04-22', role: 'accountant', title: '结转销售成本', tags: ["生产","成本"], difficulty: 3, tip: '先进先出法。',
    description: '结转本月已销售160台的成本。上月结余40台×1,190，本月新品120台×1,340。',
    entries: [{ subjectCode: '6401', summary: '结转成本', debit: 208400, credit: 0, explanation: '主营成本增加。' }, { subjectCode: '1405', summary: '转成本', debit: 0, credit: 208400, explanation: '库存减少。' }],
    documents: [{ type: 'text', label: '成本计算表', docTitle: '销 售 成 本 计 算 表', date: '2026-04-22', stampText: '财务专用章', content: '销售成本计算（先进先出法）\n期间：2026年4月\n\n本月销售数量：160台\n\n库存明细：\n  3月结余：40台 × 1,190.00 = 47,600.00元\n  4月新品：120台 × 1,340.00 = 160,800.00元\n\n本期结转：\n  优先发出3月库存：40台×1,190 = 47,600\n  再发4月新品：120台×1,340 = 160,800\n━━━━━━━━━━━━━━━━━━━━━━━━━\n  合计：208,400.00元\n\n制表：李会计\n审核：赵会计主管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年4月'
      ],
      [
        '本月销售数量',
        '160台'
      ],
      [
        '3月结余',
        '40台 × 1,190.00 = 47,600.00元'
      ],
      [
        '4月新品',
        '120台 × 1,340.00 = 160,800.00元'
      ],
      [
        '优先发出3月库存',
        '40台×1,190 = 47,600'
      ],
      [
        '再发4月新品',
        '120台×1,340 = 160,800'
      ],
      [
        '合计',
        '208,400.00元'
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
  { date: '2026-04-23', role: 'accountant', title: '销售退回处理', tags: ["销售"], difficulty: 3, tip: '退货冲减当期收入和成本。',
    description: '上月销售的5台产品因质量问题退回，退还含税货款11,300元，退回商品按成本6,700元重新入库。',
    entries: [{ subjectCode: '6001', summary: '冲收入', debit: 10000, credit: 0, explanation: '收入减少。' }, { subjectCode: '222101', summary: '冲增值税', debit: 1300, credit: 0, explanation: '增值税减少。' }, { subjectCode: '100201', summary: '退货款', debit: 0, credit: 11300, explanation: '银行减少。' }, { subjectCode: '1405', summary: '退回入库', debit: 6700, credit: 0, explanation: '库存增加。' }, { subjectCode: '6401', summary: '冲成本', debit: 0, credit: 6700, explanation: '成本减少。' }],
    documents: [{ type: 'text', label: '退货单', docTitle: '销 售 退 回 通 知 单', date: '2026-04-23', stampText: '业务专用章', content: '退货产品：A产品\n退货数量：5台\n退货原因：外观瑕疵（质量问题）\n\n退款计算：\n  价款退还：5台×2,000=10,000.00元\n  增值税退还：10,000×13%=1,300.00元\n  退款合计：11,300.00元\n\n成本冲减：5台×1,340=6,700.00元\n\n审批：赵总',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '退货产品',
        'A产品'
      ],
      [
        '退货数量',
        '5台'
      ],
      [
        '退货原因',
        '外观瑕疵（质量问题）'
      ],
      [
        '价款退还',
        '5台×2,000=10,000.00元'
      ],
      [
        '增值税退还',
        '10,000×13%=1,300.00元'
      ],
      [
        '退款合计',
        '11,300.00元'
      ],
      [
        '成本冲减',
        '5台×1,340=6,700.00元'
      ],
      [
        '审批',
        '赵总'
      ],
    ] }]},
  { date: '2026-04-24', role: 'accountant', title: '合同违约金', tags: ["费用"], difficulty: 2, tip: '违约金入营业外支出。',
    description: '因未按合同约定时间付款，支付违约金2,000元。',
    entries: [{ subjectCode: '6711', summary: '违约金', debit: 2000, credit: 0, explanation: '营业外支出增加。' }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 2000, explanation: '银行减少。' }],
    documents: [{ type: 'bank', label: '转账回单', date: '2026-04-24', totalAmount: 2000, payer: '本公司', payeeName: 'XX供应商', content: '采购合同违约金', refNo: 'HD202604240100' }]},
  { date: '2026-04-25', role: 'accountant', title: '银行利息收入', tags: ["资金"], difficulty: 1, tip: '利息冲财务费用。',
    description: '收到4月存款利息7,000元。',
    entries: [{ subjectCode: '100201', summary: '利息', debit: 7000, credit: 0, explanation: '银行增加。' }, { subjectCode: '6603', summary: '冲财务', debit: 0, credit: 7000, explanation: '财务费减少。' }],
    documents: [{ type: 'bank', label: '利息入账回单', date: '2026-04-25', totalAmount: 7000, payer: '中国工商银行', payeeName: '本公司', content: '2026年4月存款利息收入', refNo: 'HD20260425INT' }]},
  { date: '2026-04-26', role: 'accountant', title: '银行手续费', tags: ["资金"], difficulty: 1, tip: '手续费入财务费用。',
    description: '本月银行手续费300元。',
    entries: [{ subjectCode: '6603', summary: '手续费', debit: 300, credit: 0, explanation: '财务费增加。' }, { subjectCode: '100201', summary: '手续费', debit: 0, credit: 300, explanation: '银行减少。' }],
    documents: [{ type: 'bank', label: '银行扣费回单', date: '2026-04-26', totalAmount: 300, payer: '本公司', payeeName: '中国工商银行', content: '转账手续费及账户维护费', refNo: 'HD20260426FEE' }]},
  { date: '2026-04-27', role: 'accountant', title: '计提工资及折旧', tags: ["工资","资产"], difficulty: 1, tip: '计提4月工资90,000元+折旧625元（电脑125+车床500）。',
    description: '计提4月工资90,000元（行政部25,000、销售部35,000、生产部30,000），并计提本月折旧625元（电脑125+数控车床500）。',
    entries: [{ subjectCode: '660203', summary: '计提行政部工资', debit: 25000, credit: 0, explanation: '管理费用-工资增加。' }, { subjectCode: '660103', summary: '计提销售部工资', debit: 35000, credit: 0, explanation: '销售费用增加。' }, { subjectCode: '500102', summary: '计提生产部工资', debit: 30000, credit: 0, explanation: '生产成本-直接人工增加。' }, { subjectCode: '221101', summary: '计提本月工资', debit: 0, credit: 90000, explanation: '应付职工薪酬-工资增加。' }, { subjectCode: '660205', summary: '计提电脑折旧', debit: 125, credit: 0, explanation: '管理费用-折旧费增加。电脑折旧125元。' }, { subjectCode: '660205', summary: '计提车床折旧', debit: 500, credit: 0, explanation: '管理费用-折旧费增加。数控车床本月起计提，月折旧500元。' }, { subjectCode: '1602', summary: '计提本月折旧', debit: 0, credit: 625, explanation: '累计折旧增加。本月合计折旧=125+500=625元。' }], documents: [{ type: 'text', label: '工资计算表', docTitle: '4 月 工 资 计 算 表', date: '2026-04-27', stampText: '财务专用章', content: '期间：2026年4月\n\n行政部（2人）：25,000元\n销售部（2人）：35,000元\n生产部（2人）：30,000元\n\n应发合计：90,000元\n\n制表：李会计  审核：赵会计主管' }, { type: 'text', label: '折旧计算表', docTitle: '4 月 折 旧 计 算 表', date: '2026-04-27', stampText: '财务专用章', content: '本月折旧明细：\n\n1. 联想台式电脑\n  原值4,500 / 36月 = 125.00元\n\n2. 数控车床\n  原值60,000 / 120月 = 500.00元  ★本月起计提\n\n合计折旧：625.00元' }]},
  { date: '2026-04-28', role: 'accountant', title: '计提借款利息', tags: ["融资"], difficulty: 2, tip: '按月计提到期付息。',
    description: '计提4月短期借款利息544元（150,000×4.35%÷12）。',
    entries: [{ subjectCode: '6603', summary: '利息', debit: 544, credit: 0, explanation: '财务费增加。' }, { subjectCode: '2232', summary: '应付利息', debit: 0, credit: 544, explanation: '应付增加。' }],
    documents: [{ type: 'text', label: '利息计算表', docTitle: '借 款 利 息 计 算 表', date: '2026-04-28', stampText: '财务专用章', content: '短期借款利息计算\n期间：2026年4月\n\n借款余额：150,000.00元\n年利率：4.35%\n\n本月利息 = 150,000 × 4.35% ÷ 12 ≈ 544.00元\n\n制表：李会计',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年4月'
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
  { date: '2026-04-29', role: 'accountant', title: '计提附加税', tags: ["税费"], difficulty: 2, tip: '附加税以应纳增值税为基数。',
    description: '应纳增值税=销项41,600-进项19,500=22,100。城建税22,100×7%=1,547，教育附加22,100×3%=663。',
    entries: [{ subjectCode: '6403', summary: '城建税', debit: 1547, credit: 0, explanation: '税金增加。' }, { subjectCode: '222103', summary: '城建税', debit: 0, credit: 1547, explanation: '应交增加。' }, { subjectCode: '6403', summary: '教育附加', debit: 663, credit: 0, explanation: '税金增加。' }, { subjectCode: '222104', summary: '教育附加', debit: 0, credit: 663, explanation: '应交增加。' }],
    documents: [{ type: 'text', label: '税费计算表', docTitle: '附 加 税 计 提 计 算 表', date: '2026-04-29', stampText: '财务专用章', content: '附加税计提计算\n期间：2026年4月\n\n计税依据：\n  增值税销项税额：41,600.00元\n  增值税进项税额：19,500.00元\n  应纳增值税：22,100.00元\n\n计提明细：\n  城市维护建设税（7%）：22,100×7%=1,547.00元\n  教育费附加（3%）：22,100×3%=663.00元\n  合计：2,210.00元\n\n制表：李会计  审核：赵会计主管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年4月'
      ],
      [
        '增值税销项税额',
        '41,600.00元'
      ],
      [
        '增值税进项税额',
        '19,500.00元'
      ],
      [
        '应纳增值税',
        '22,100.00元'
      ],
      [
        '城市维护建设税（7%）',
        '22,100×7%=1,547.00元'
      ],
      [
        '教育费附加（3%）',
        '22,100×3%=663.00元'
      ],
      [
        '合计',
        '2,210.00元'
      ],
      [
        '制表',
        '李会计  审核：赵会计主管'
      ],
    ] }]},
  { date: '2026-04-30', role: 'accountant', title: '月末期间损益结转', tags: ["期末"], difficulty: 3, tip: '收入借转，费用贷转。',
    description: '将各损益类科目余额结转至本年利润。',
    entries: [
      { subjectCode: '6001', summary: '转收入', debit: 310000, credit: 0, explanation: '收入转出。' },
      { subjectCode: '6401', summary: '转成本', debit: 0, credit: 201700, explanation: '成本转出。' },
      { subjectCode: '6403', summary: '转税金', debit: 0, credit: 2210, explanation: '税金转出。' },
      { subjectCode: '660101', summary: '转销售费用', debit: 0, credit: 5000, explanation: '销售费转出。' },
      { subjectCode: '6602', summary: '转管理费用', debit: 0, credit: 15500, explanation: '管理费转出。' },
      { subjectCode: '6603', summary: '转财务费用', debit: 31156, credit: 0, explanation: '财务费转出。' },
      { subjectCode: '6711', summary: '转营业外支出', debit: 0, credit: 7000, explanation: '营业外支出转出。' },
      { subjectCode: '4103', summary: '转本年利润', debit: 0, credit: 109746, explanation: '净利润转出。' }],
    documents: [{ type: 'text', label: '结转计算表', docTitle: '期 间 损 益 结 转 表', date: '2026-04-30', stampText: '已结转', content: '期间损益结转\n会计期间：2026年4月\n\n【收入类】→ 本年利润（贷方）\n  主营业务收入（6001）：310,000（含退货冲减10,000）\n  财务费用（6603）：31,156（利息净收入：Q1利息25,000+4月利息7,000-手续费300-借款利息544）\n\n【费用类】→ 本年利润（借方）\n  主营业务成本（6401）：201,700（208,400-退货冲减6,700）\n  税金及附加（6403）：2,210\n  销售费用-广告费（660101）：5,000\n  管理费用（6602）：15,500\n  营业外支出（6711）：7,000（违约金2,000+设备处置损失5,000）\n\n本年利润：\n  = 310,000 + 31,156 - 201,700 - 2,210 - 5,000 - 15,500 - 7,000\n  = 109,746元（净利润）\n\n结转后各损益类科目余额为零 ✓\n\n制表：李会计\n审核：赵会计主管',
    headers: [
      '项目',
      '内容'
    ],
    rows: [
      [
        '会计期间',
        '2026年4月'
      ],
      [
        '主营业务收入（6001）',
        '310,000（含退货冲减10,000）'
      ],
      [
        '财务费用（6603）',
        '31,156（利息净收入：Q1利息25,000+4月利息7,000-手续费300-借款利息544）'
      ],
      [
        '主营业务成本（6401）',
        '201,700（208,400-退货冲减6,700）'
      ],
      [
        '税金及附加（6403）',
        '2,210'
      ],
      [
        '销售费用-广告费（660101）',
        '5,000'
      ],
      [
        '管理费用（6602）',
        '15,500'
      ],
      [
        '营业外支出（6711）',
        '7,000（违约金2,000+设备处置损失5,000）'
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
  { date: '2026-04-30', role: 'accountant', title: '模拟纳税申报', tags: ["期末","申报"], difficulty: 1, tip: '每月申报是法定义务。',
    description: '完成账务处理后进行模拟纳税申报。', entries: [], nextAction: 'tax-filing',
    documents: [{ type: 'text', label: '申报提醒', docTitle: '4 月 纳 税 申 报 提 醒', stampText: '财务专用章', content: '申报期间：2026年4月\n截止日期：2026年5月15日\n\n申报税种：\n1. 增值税\n2. 城市维护建设税\n3. 教育费附加\n\n请前往纳税申报页面核对后提交。' }]},
]
export default apr
