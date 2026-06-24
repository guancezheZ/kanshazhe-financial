const may = [
  { date: '2026-05-04', role: 'accountant', title: '缴纳4月增值税及附加税', tags: ["税费"], difficulty: 2, tip: '每月15日前完成。', description: '缴纳增值税22,100、城建税1,547、教育费附加663，合计24,310元。',
    entries: [{ subjectCode: '222101', summary: '缴增值税', debit: 22100, credit: 0, explanation: '增值税减少。' }, { subjectCode: '222103', summary: '缴城建税', debit: 1547, credit: 0, explanation: '城建税减少。' }, { subjectCode: '222104', summary: '缴教育费附加', debit: 663, credit: 0, explanation: '附加减少。' }, { subjectCode: '100201', summary: '缴税', debit: 0, credit: 24310, explanation: '银行减少。' }],
    documents: [{ type: 'bank', label: '缴税回单', date: '2026-05-04', totalAmount: 24310, payer: '本公司', payeeName: 'XX市税务局', content: '4月增值税及附加税', refNo: 'HD202605040010' }]},
  { date: '2026-05-05', role: 'accountant', title: '发放4月员工工资', tags: ["工资"], difficulty: 2, tip: '每月10日前发上月工资。', description: '银行代发4月工资90,000元，实发76,500元。',
    entries: [{ subjectCode: '221101', summary: '发4月工资', debit: 90000, credit: 0, explanation: '应付薪酬减少。' }, { subjectCode: '100201', summary: '实发工资', debit: 0, credit: 76500, explanation: '银行减少。' }, { subjectCode: '224101', summary: '代扣社保', debit: 0, credit: 9000, explanation: '其他应付款增加。' }, { subjectCode: '224102', summary: '代扣公积金', debit: 0, credit: 4500, explanation: '其他应付款增加。' }],
    documents: [{ type: 'bank', label: '代发工资回单', date: '2026-05-05', totalAmount: 76500, payer: '本公司', payerAccount: '6222 0200 **** 1234', payeeName: '员工代发户', content: '4月工资代发（共6人）', refNo: 'HD202605050020' }]},
  { date: '2026-05-06', role: 'accountant', title: '支付供应商货款', tags: ["采购","资金"], difficulty: 1, tip: '按合同账期支付。', description: '支付丙公司采购款169,500元。',
    entries: [{ subjectCode: '220201', summary: '付丙公司', debit: 169500, credit: 0, explanation: '应付减少。' }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 169500, explanation: '银行减少。' }],
    documents: [{ type: 'bank', label: '转账回单', date: '2026-05-06', totalAmount: 169500, payer: '本公司', payerAccount: '6222 0200 **** 1234', payeeName: '丙公司', payeeAccount: '6222 0200 **** 8888', content: '支付4月采购款', refNo: 'HD202605060030' }]},
  { date: '2026-05-07', role: 'accountant', title: '采购原材料', tags: ["采购"], difficulty: 2, tip: '进项税可抵扣。', description: '采购A型钢材8吨，价款120,000元，增值税15,600元，未付。',
    entries: [{ subjectCode: '1403', summary: '采购钢材', debit: 120000, credit: 0, explanation: '原材料增加。' }, { subjectCode: '222101', summary: '进项税', debit: 15600, credit: 0, explanation: '进项增加。' }, { subjectCode: '220201', summary: '应付丙公司', debit: 0, credit: 135600, explanation: '应付增加。' }],
    documents: [{ type: 'text', label: '入库单', docTitle: '收  料  单', date: '2026-05-07', stampText: '仓库\n验收专用章', content: '供应商：丙公司\n入库日期：2026-05-07\n\n材料名称：A型钢材 Φ25mm\n数量：8吨\n单价：15,000元/吨\n金额：120,000.00元\n\n发票注明年月：2026年5月\n增值税进项税额：15,600.00元（13%）\n\n检验结果：合格 ✓\n保管员：刘保管\n验收员：陈检验',
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
        '2026-05-07'
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
        '发票注明年月',
        '2026年5月'
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
  { date: '2026-05-08', role: 'accountant', title: '支付房租', tags: ["费用"], difficulty: 1, tip: '房租按月支付。', description: '支付5月租金8,000元。',
    entries: [{ subjectCode: '6602', summary: '房租', debit: 8000, credit: 0, explanation: '管理费增加。' }, { subjectCode: '100201', summary: '付房租', debit: 0, credit: 8000, explanation: '银行减少。' }],
    documents: [{ type: 'receipt', label: '收据', docTitle: '房屋租赁专用收据', date: '2026-05-08', totalAmount: 8000, payer: '本公司', paymentMethod: '银行转账', stampText: 'XX物业管理有限公司\n财务专用章', receiver: '王XX', items: [{ name: 'XX大厦801室 5月租金', qty: 1, price: 8000, amount: 8000 }]}]},
  { date: '2026-05-09', role: 'accountant', title: '提取备用金', tags: ["资金"], difficulty: 1, tip: '备用金满足日常开支。', description: '提取现金3,000元。',
    entries: [{ subjectCode: '1001', summary: '备用金', debit: 3000, credit: 0, explanation: '现金增加。' }, { subjectCode: '100201', summary: '提备用金', debit: 0, credit: 3000, explanation: '银行减少。' }],
    documents: [{ type: 'bank', label: '现金支票回单', date: '2026-05-09', totalAmount: 3000, payer: '本公司', payerAccount: '6222 0200 **** 1234', payeeName: '本公司（现金）', content: '提取备用金', refNo: 'HD202605090040' }]},
  { date: '2026-05-10', role: 'accountant', title: '银行汇票', tags: ["资金"], difficulty: 3, tip: '申请时先存入保证金。', description: '办理银行汇票50,000元支付采购款。',
    entries: [{ subjectCode: '101201', summary: '汇票保证金', debit: 50000, credit: 0, explanation: '其他货币资金增加。' }, { subjectCode: '100201', summary: '存保证金', debit: 0, credit: 50000, explanation: '银行减少。' }],
    documents: [{ type: 'bank', label: '汇票申请书回单', date: '2026-05-10', totalAmount: 50000, payer: '本公司', payerAccount: '6222 0200 **** 1234', payeeName: '收款人（待填）', content: '银行汇票保证金存款', refNo: 'HD202605100050' }, { type: 'text', label: '银行汇票申请书', docTitle: '银行汇票申请书（存根）', date: '2026-05-10', stampText: '中国工商银行\n业务专用章', content: '申请人：本公司\n收款人：待定（根据采购合同确定）\n\n汇票金额：伍万元整\n\n用途：支付采购货款保证金\n\n出票日期：2026年5月10日\n有效期：1个月\n\n备注：汇票结算时需将实际结算金额填入汇票',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '申请人',
        '本公司'
      ],
      [
        '收款人',
        '待定（根据采购合同确定）'
      ],
      [
        '汇票金额',
        '伍万元整'
      ],
      [
        '用途',
        '支付采购货款保证金'
      ],
      [
        '出票日期',
        '2026年5月10日'
      ],
      [
        '有效期',
        '1个月'
      ],
      [
        '备注',
        '汇票结算时需将实际结算金额填入汇票'
      ],
    ] }]},
  { date: '2026-05-11', role: 'accountant', title: '生产领料', tags: ["生产"], difficulty: 2, tip: '借生产成本，贷原材料。', description: '领用A型钢材6吨，合计90,000元。',
    entries: [{ subjectCode: '500101', summary: '领料', debit: 90000, credit: 0, explanation: '生产成本增加。' }, { subjectCode: '1403', summary: '领料', debit: 0, credit: 90000, explanation: '原材料减少。' }],
    documents: [{ type: 'text', label: '领料单', docTitle: '领  料  单', date: '2026-05-11', stampText: '仓库\n发料专用章', content: '领用部门：生产车间   领料单号：LL20260511007\n\n材料名称：A型钢材 Φ25mm\n规格：25mm\n数量：6吨\n单价：15,000元/吨\n金额：90,000.00元\n\n用途：生产A产品（订单号PO2026005）\n\n领料人：张生产\n发料人：刘保管\n审核人：李会计',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '领用部门',
        '生产车间   领料单号：LL20260511007'
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
        '生产A产品（订单号PO2026005）'
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
  { date: '2026-05-12', role: 'accountant', title: '现销商品', tags: ["销售"], difficulty: 2, tip: '借银行，贷收入、税费。', description: '销售120台，价款240,000元，增值税31,200元。',
    entries: [{ subjectCode: '100201', summary: '销120台', debit: 271200, credit: 0, explanation: '银行增加。' }, { subjectCode: '6001', summary: '收入', debit: 0, credit: 240000, explanation: '收入增加。' }, { subjectCode: '222101', summary: '销项税', debit: 0, credit: 31200, explanation: '增值税增加。' }],
    documents: [{ type: 'invoice', label: '增值税专用发票', region: '广东', invoiceType: '专用', copy: '发票联', invoiceNo: '4400512345', date: '2026年05月12日', buyer: '乙公司', buyerTaxId: '91440101MA5XXXXXXXX', seller: '本公司', sellerTaxId: '91440101MA3XXXXXXXX', stampText: '发票专用章', payee: '李四', reviewer: '王五', drawer: '赵六', lineItems: [{ name: 'A产品', unit: '台', qty: 120, price: 2000, amount: 240000, taxRate: '13%', tax: 31200 }], totalAmount: 271200 }, { type: 'bank', label: '收款回单', date: '2026-05-12', totalAmount: 271200, payer: '乙公司', payerAccount: '6222 0100 **** 6666', payeeName: '本公司', payeeAccount: '6222 0200 **** 1234', content: '购买A产品货款及增值税', refNo: 'HD202605120080' }]},
  { date: '2026-05-13', role: 'accountant', title: '直接人工归集', tags: ["生产"], difficulty: 2, tip: '人工计入生产成本。', description: '生产工人工资35,000元。',
    entries: [{ subjectCode: '500102', summary: '人工', debit: 35000, credit: 0, explanation: '生产成本增加。' }, { subjectCode: '221101', summary: '计提工资', debit: 0, credit: 35000, explanation: '应付薪酬增加。' }],
    documents: [{ type: 'text', label: '工资计算表', docTitle: '直 接 人 工 费 用 分 配 表', date: '2026-05-13', stampText: '人力资源部\n工资专用章', content: '直接人工费用分配\n期间：2026年5月\n\n生产车间直接生产工人工资：35,000.00元\n\n工时统计：\n  A产品生产工时：2,500小时\n\n分配计算：\n  工资分配率 = 35,000 ÷ 2,500 = 14.00元/小时\n  计入生产成本-直接人工：35,000.00元\n\n制表：王出纳\n审核：李会计\n批准：赵总',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年5月'
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
  { date: '2026-05-14', role: 'accountant', title: '赊销商品', tags: ["销售"], difficulty: 2, tip: '借应收，贷收入、税费。', description: '向丙公司赊销80台，合计180,800元未收。',
    entries: [{ subjectCode: '112202', summary: '赊销80台', debit: 180800, credit: 0, explanation: '应收增加。' }, { subjectCode: '6001', summary: '收入', debit: 0, credit: 160000, explanation: '收入增加。' }, { subjectCode: '222101', summary: '销项税', debit: 0, credit: 20800, explanation: '增值税增加。' }],
    documents: [{ type: 'invoice', label: '增值税专用发票', region: '广东', invoiceType: '专用', copy: '发票联', invoiceNo: '4400567890', date: '2026年05月14日', buyer: '丙公司', buyerTaxId: '91440101MA8ZZZZZZZ', seller: '本公司', sellerTaxId: '91440101MA3XXXXXXXX', stampText: '发票专用章', payee: '李四', reviewer: '王五', drawer: '赵六', lineItems: [{ name: 'A产品', unit: '台', qty: 80, price: 2000, amount: 160000, taxRate: '13%', tax: 20800 }], totalAmount: 180800 }]},
  { date: '2026-05-15', role: 'accountant', title: '支付广告费', tags: ["费用"], difficulty: 1, tip: '广告费计入销售费用。', description: '支付5月推广费6,000元。',
    entries: [{ subjectCode: '660101', summary: '广告费', debit: 6000, credit: 0, explanation: '销售费用增加。' }, { subjectCode: '100201', summary: '付广告费', debit: 0, credit: 6000, explanation: '银行减少。' }],
    documents: [{ type: 'receipt', label: '服务发票', docTitle: '网络推广服务费发票', date: '2026-05-15', totalAmount: 6000, payer: '本公司', stampText: '百度\n发票专用章', items: [{ name: '搜索推广服务费（5月）', qty: 1, price: 6000, amount: 6000 }]}]},
  { date: '2026-05-16', role: 'accountant', title: '差旅费报销', tags: ["费用"], difficulty: 1, tip: '差旅费计入管理费。', description: '报销差旅费2,500元。',
    entries: [{ subjectCode: '660202', summary: '差旅费', debit: 2500, credit: 0, explanation: '管理费增加。' }, { subjectCode: '100201', summary: '付差旅费', debit: 0, credit: 2500, explanation: '银行减少。' }],
    documents: [{ type: 'receipt', label: '报销单', docTitle: '差 旅 费 报 销 单', date: '2026-05-16', totalAmount: 2500, payer: '本公司', stampText: '财务\n审核专用章', items: [{ name: '往返高铁票', qty: 2, price: 500, amount: 1000 }, { name: '住宿费（1晚）', qty: 1, price: 800, amount: 800 }, { name: '出差补贴（1天）', qty: 1, price: 200, amount: 200 }, { name: '市内交通费', qty: 1, price: 500, amount: 500 }]}]},
  { date: '2026-05-17', role: 'accountant', title: '生产领料-辅助材料', tags: ["生产"], difficulty: 2, tip: '辅助材料入制造费用。', description: '领用辅助材料4,000元。',
    entries: [{ subjectCode: '5101', summary: '辅料', debit: 4000, credit: 0, explanation: '制造费用增加。' }, { subjectCode: '1403', summary: '辅料', debit: 0, credit: 4000, explanation: '原材料减少。' }],
    documents: [{ type: 'text', label: '领料单', docTitle: '领  料  单', date: '2026-05-17', stampText: '仓库\n发料专用章', content: '领用部门：生产车间   领料单号：LL20260517008\n\n材料名称：B型材料\n数量：2批\n金额：4,000.00元\n\n用途：机物料消耗（设备润滑维护）\n\n领料人：张生产\n发料人：刘保管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '领用部门',
        '生产车间   领料单号：LL20260517008'
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
  { date: '2026-05-18', role: 'accountant', title: '支付水电费', tags: ["费用"], difficulty: 1, tip: '水电费计入管理费。', description: '支付5月水电费4,200元。',
    entries: [{ subjectCode: '6602', summary: '水电费', debit: 4200, credit: 0, explanation: '管理费增加。' }, { subjectCode: '100201', summary: '付水电费', debit: 0, credit: 4200, explanation: '银行减少。' }],
    documents: [{ type: 'receipt', label: '电费单', docTitle: '电 费 缴 费 凭 证', date: '2026-05-18', totalAmount: 3000, payer: '本公司', stampText: '国家电网\n电费收讫章', items: [{ name: '有功电量 3,000kWh×1.00元', qty: 3000, price: 1, amount: 3000 }]}, { type: 'receipt', label: '水费单', docTitle: '水 费 缴 费 凭 证', date: '2026-05-18', totalAmount: 1200, payer: '本公司', stampText: '自来水公司\n水费收讫章', items: [{ name: '用水量 300吨×4.00元', qty: 300, price: 4, amount: 1200 }]}]},
  { date: '2026-05-19', role: 'accountant', title: '制造费用归集分配', tags: ["生产"], difficulty: 2, tip: '分配后余额归零。', description: '归集分配制造费用9,000元。',
    entries: [{ subjectCode: '5101', summary: '归集', debit: 5000, credit: 0, explanation: '制造费用增加。' }, { subjectCode: '1602', summary: '折旧', debit: 0, credit: 2000, explanation: '累计折旧增加。' }, { subjectCode: '100201', summary: '车间水电', debit: 0, credit: 3000, explanation: '银行减少。' }, { subjectCode: '500103', summary: '分配', debit: 9000, credit: 0, explanation: '生产成本增加。' }, { subjectCode: '5101', summary: '分配', debit: 0, credit: 9000, explanation: '制造费用归零。' }],
    documents: [{ type: 'text', label: '制造费用表', docTitle: '制 造 费 用 归 集 分 配 表', date: '2026-05-19', stampText: '财务专用章', content: '制造费用归集分配\n期间：2026年5月\n\n归集明细：\n1. 辅助材料（机物料）：4,000.00元\n2. 折旧费——机器设备：2,000.00元\n3. 车间水电费：3,000.00元\n  归集总额：9,000.00元\n\n分配：\n  分配率 = 9,000 ÷ 2,500工时 = 3.60元/小时\n  计入生产成本-制造费用：9,000.00元\n\n分配后制造费用余额：0.00元 ✓\n\n制表：李会计\n审核：赵会计主管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年5月'
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
  { date: '2026-05-20', role: 'accountant', title: '完工产品入库', tags: ["生产"], difficulty: 2, tip: '借库存，贷生产成本。', description: '本月100台完工，成本134,000元。',
    entries: [{ subjectCode: '1405', summary: '完工', debit: 134000, credit: 0, explanation: '库存增加。' }, { subjectCode: '500101', summary: '材料', debit: 0, credit: 90000, explanation: '生产转出。' }, { subjectCode: '500102', summary: '人工', debit: 0, credit: 35000, explanation: '生产转出。' }, { subjectCode: '500103', summary: '制造费用', debit: 0, credit: 9000, explanation: '生产转出。' }],
    documents: [{ type: 'text', label: '入库单', docTitle: '产 品 入 库 单', date: '2026-05-20', stampText: '仓库\n验收专用章', content: '入库部门：生产车间   入库单号：RK20260520004\n\n产品名称：A产品\n规格型号：标准型\n\n完工数量：100台\n\n成本构成：\n  直接材料：90,000.00元\n  直接人工：35,000.00元\n  制造费用：9,000.00元\n━━━━━━━━━━━━━━━━━━━━━\n  总成本：134,000.00元\n  单位成本：1,340.00元/台\n\n质检结论：合格 ✓\n\n仓库验收：刘保管\n质量检验：陈检验',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '入库部门',
        '生产车间   入库单号：RK20260520004'
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
  { date: '2026-05-21', role: 'accountant', title: '结转销售成本', tags: ["生产","成本"], difficulty: 3, tip: '先进先出法。', description: '结转200台成本253,600元。',
    entries: [{ subjectCode: '6401', summary: '结转成本', debit: 253600, credit: 0, explanation: '主营成本增加。' }, { subjectCode: '1405', summary: '转成本', debit: 0, credit: 253600, explanation: '库存减少。' }],
    documents: [{ type: 'text', label: '成本计算表', docTitle: '销 售 成 本 计 算 表', date: '2026-05-21', stampText: '财务专用章', content: '销售成本计算（先进先出法）\n期间：2026年5月\n\n本月销售数量：200台\n\n库存明细：\n  4月结余：119,600.00元\n  5月完工：100台×1,340.00=134,000.00元\n  可售合计：253,600.00元\n\n本期结转：\n  200台成本 = 253,600.00元\n  单位销售成本 = 1,268.00元/台\n\n期末结余：\n  0台（全部售出）\n\n制表：李会计\n审核：赵会计主管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年5月'
      ],
      [
        '本月销售数量',
        '200台'
      ],
      [
        '4月结余',
        '119,600.00元'
      ],
      [
        '5月完工',
        '100台×1,340.00=134,000.00元'
      ],
      [
        '可售合计',
        '253,600.00元'
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
  { date: '2026-05-22', role: 'accountant', title: '债务重组', tags: ["融资"], difficulty: 3, tip: '债务减免计入营业外收入。', description: '应付50,000元只需付40,000元。',
    entries: [{ subjectCode: '220201', summary: '还债务', debit: 50000, credit: 0, explanation: '应付减少。' }, { subjectCode: '100201', summary: '付重组款', debit: 0, credit: 40000, explanation: '银行减少。' }, { subjectCode: '6301', summary: '重组收益', debit: 0, credit: 10000, explanation: '营业外收入增加。' }],
    documents: [{ type: 'bank', label: '付款回单', date: '2026-05-22', totalAmount: 40000, payer: '本公司', payerAccount: '6222 0200 **** 1234', payeeName: '丙公司', payeeAccount: '6222 0200 **** 8888', content: '债务重组付款（减免10,000元）', refNo: 'HD202605220090' }, { type: 'text', label: '债务重组协议', docTitle: '债 务 重 组 协 议 书', date: '2026-05-22', stampText: '双方\n合同专用章', content: '债务重组协议\n\n债权人：本公司\n债务人：丙公司\n\n原债务金额：50,000.00元\n\n重组方案：\n  丙公司一次性支付40,000.00元\n  剩余10,000.00元债务免除\n\n支付日期：2026年5月22日\n\n债务重组差额：10,000.00元\n  计入营业外收入——债务重组利得\n\n双方签字盖章：\n  本公司（公章）\n  丙公司（公章）',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '债权人',
        '本公司'
      ],
      [
        '债务人',
        '丙公司'
      ],
      [
        '原债务金额',
        '50,000.00元'
      ],
      [
        '支付日期',
        '2026年5月22日'
      ],
      [
        '债务重组差额',
        '10,000.00元'
      ],
    ] }]},
  { date: '2026-05-23', role: 'accountant', title: '产品质量保证', tags: ["费用"], difficulty: 3, tip: '按销售额预提质保费用。', description: '销售额400,000×2%=8,000元。',
    entries: [{ subjectCode: '6601', summary: '质保费', debit: 8000, credit: 0, explanation: '销售费用增加。' }, { subjectCode: '2212', summary: '预计负债', debit: 0, credit: 8000, explanation: '预计负债增加。' }],
    documents: [{ type: 'text', label: '质保计提表', docTitle: '产 品 质 量 保 证 费 计 提 表', date: '2026-05-23', stampText: '财务专用章', content: '产品质量保证费用计提\n期间：2026年5月\n\n计提依据：\n  本月销售额（含税）：400,000.00元\n  计提比例：2%\n\n计提金额：\n  400,000 × 2% = 8,000.00元\n\n科目：\n  借：销售费用——产品质量保证  8,000\n  贷：预计负债——产品质量保证  8,000\n\n政策依据：\n《企业会计准则第13号——或有事项》\n\n制表：李会计\n审核：赵会计主管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年5月'
      ],
      [
        '本月销售额（含税）',
        '400,000.00元'
      ],
      [
        '计提比例',
        '2%'
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
  { date: '2026-05-26', role: 'accountant', title: '商业折扣销售', tags: ["销售"], difficulty: 3, tip: '按折扣后净额确认收入。', description: '销售50台，10%折扣，实收101,700元。',
    entries: [{ subjectCode: '100201', summary: '折扣收款', debit: 101700, credit: 0, explanation: '银行增加。' }, { subjectCode: '6001', summary: '折后收入', debit: 0, credit: 90000, explanation: '收入增加。' }, { subjectCode: '222101', summary: '销项税', debit: 0, credit: 11700, explanation: '增值税增加。' }],
    documents: [{ type: 'invoice', label: '增值税专用发票', region: '广东', invoiceType: '专用', copy: '发票联', invoiceNo: '4400577777', date: '2026年05月26日', buyer: '戊公司', buyerTaxId: '91440101MA9WWWWWWW', seller: '本公司', sellerTaxId: '91440101MA3XXXXXXXX', stampText: '发票专用章', payee: '李四', reviewer: '王五', drawer: '赵六', lineItems: [{ name: 'A产品（商业折扣10%）', unit: '台', qty: 50, price: 2000, amount: 100000, discountRate: '10%', discountAmount: 10000, taxRate: '13%', tax: 11700 }], totalAmount: 101700 }, { type: 'bank', label: '收款回单', date: '2026-05-26', totalAmount: 101700, payer: '戊公司', payerAccount: '6222 0100 **** 2222', payeeName: '本公司', payeeAccount: '6222 0200 **** 1234', content: '购买A产品（商业折扣后）', refNo: 'HD202605260100' }]},
  { date: '2026-05-27', role: 'accountant', title: '银行利息收入', tags: ["资金"], difficulty: 1, tip: '利息收入冲财务费用。', description: '收到5月利息6,500元。',
    entries: [{ subjectCode: '100201', summary: '利息', debit: 6500, credit: 0, explanation: '银行增加。' }, { subjectCode: '6603', summary: '冲财务费', debit: 0, credit: 6500, explanation: '财务费用减少。' }],
    documents: [{ type: 'bank', label: '利息入账回单', date: '2026-05-27', totalAmount: 6500, payer: '中国工商银行', payeeName: '本公司', content: '2026年5月存款利息收入', refNo: 'HD20260527INT' }]},
  { date: '2026-05-28', role: 'accountant', title: '银行手续费', tags: ["资金"], difficulty: 1, tip: '手续费入财务费用。', description: '本月手续费350元。',
    entries: [{ subjectCode: '6603', summary: '手续费', debit: 350, credit: 0, explanation: '财务费用增加。' }, { subjectCode: '100201', summary: '手续费', debit: 0, credit: 350, explanation: '银行减少。' }],
    documents: [{ type: 'bank', label: '银行扣费回单', date: '2026-05-28', totalAmount: 350, payer: '本公司', payeeName: '中国工商银行', content: '转账手续费及账户维护费', refNo: 'HD20260528FEE' }]},
  { date: '2026-05-29', role: 'accountant', title: '计提工资及折旧', tags: ["工资","资产"], difficulty: 1, tip: '计提5月工资90,000元及折旧625元。', description: '计提5月工资90,000元（行政部25,000、销售部35,000、生产部30,000），同时计提折旧625元（电脑125+车床500）。', entries: [{ subjectCode: '660203', summary: '计提行政部工资', debit: 25000, credit: 0, explanation: '管理费用-工资增加。' }, { subjectCode: '6601', summary: '计提销售部工资', debit: 35000, credit: 0, explanation: '销售费用增加。' }, { subjectCode: '500102', summary: '计提生产部工资', debit: 30000, credit: 0, explanation: '生产成本-直接人工增加。' }, { subjectCode: '221101', summary: '计提本月工资', debit: 0, credit: 90000, explanation: '应付职工薪酬-工资增加。' }, { subjectCode: '660205', summary: '计提折旧', debit: 625, credit: 0, explanation: '管理费用-折旧费增加。电脑125+车床500=625元。' }, { subjectCode: '1602', summary: '计提折旧', debit: 0, credit: 625, explanation: '累计折旧增加。' }], documents: [{ type: 'text', label: '工资及折旧计算表', docTitle: '5 月 计 提 计 算 表', date: '2026-05-29', stampText: '财务专用章', content: '一、工资计提\n  行政部：25,000元\n  销售部：35,000元\n  生产部：30,000元\n  合计：90,000元\n\n二、折旧计提\n  联想台式电脑：125元\n  数控车床：500元\n  合计：625元\n\n制表：李会计  审核：赵会计主管' }]},
  { date: '2026-05-30', role: 'accountant', title: '计提借款利息', tags: ["融资"], difficulty: 2, tip: '按月计提到期付息。', description: '计提本月利息544元。',
    entries: [{ subjectCode: '6603', summary: '借款利息', debit: 544, credit: 0, explanation: '财务费增加。' }, { subjectCode: '2232', summary: '应付利息', debit: 0, credit: 544, explanation: '应付利息增加。' }],
    documents: [{ type: 'text', label: '利息计算表', docTitle: '借 款 利 息 计 算 表', date: '2026-05-30', stampText: '财务专用章', content: '短期借款利息计算\n期间：2026年5月\n\n借款余额：150,000.00元\n年利率：4.35%\n\n本月利息 = 150,000 × 4.35% ÷ 12 = 543.75元（取整544元）\n\n制表：李会计',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年5月'
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
  { date: '2026-05-30', role: 'accountant', title: '计提坏账准备', tags: ["资产","期末"], difficulty: 2, tip: '按应收余额5%计提。', description: '计提坏账准备8,000元。',
    entries: [{ subjectCode: '6701', summary: '坏账', debit: 8000, credit: 0, explanation: '减值损失增加。' }, { subjectCode: '123101', summary: '坏账准备', debit: 0, credit: 8000, explanation: '坏账准备增加。' }],
    documents: [{ type: 'text', label: '减值计算表', docTitle: '坏 账 准 备 计 提 表', date: '2026-05-30', stampText: '财务专用章', content: '坏账准备计提\n期间：2026年5月\n\n应收账款期末余额：160,000.00元\n计提比例：5%\n\n计提金额：160,000 × 5% = 8,000.00元\n\n制表：李会计\n审核：赵会计主管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年5月'
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
  { date: '2026-05-30', role: 'accountant', title: '计提附加税', tags: ["税费"], difficulty: 2, tip: '以增值税为基数。', description: '应纳增值税36,400，城建税2,548，教育费附加1,092。',
    entries: [{ subjectCode: '6403', summary: '城建税', debit: 2548, credit: 0, explanation: '税金增加。' }, { subjectCode: '222103', summary: '城建税', debit: 0, credit: 2548, explanation: '应交增加。' }, { subjectCode: '6403', summary: '教育附加', debit: 1092, credit: 0, explanation: '税金增加。' }, { subjectCode: '222104', summary: '教育附加', debit: 0, credit: 1092, explanation: '应交增加。' }],
    documents: [{ type: 'text', label: '税费计算表', docTitle: '附 加 税 计 提 计 算 表', date: '2026-05-30', stampText: '财务专用章', content: '附加税计提计算\n期间：2026年5月\n\n计税依据：\n  增值税销项税额：36,400.00元\n  进项税额：0元\n  应纳增值税：36,400.00元\n\n计提明细：\n  城市维护建设税（7%）：36,400×7%=2,548.00元\n  教育费附加（3%）：36,400×3%=1,092.00元\n  合计：3,640.00元\n\n制表：李会计  审核：赵会计主管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年5月'
      ],
      [
        '增值税销项税额',
        '36,400.00元'
      ],
      [
        '进项税额',
        '0元'
      ],
      [
        '应纳增值税',
        '36,400.00元'
      ],
      [
        '城市维护建设税（7%）',
        '36,400×7%=2,548.00元'
      ],
      [
        '教育费附加（3%）',
        '36,400×3%=1,092.00元'
      ],
      [
        '合计',
        '3,640.00元'
      ],
      [
        '制表',
        '李会计  审核：赵会计主管'
      ],
    ] }]},
  { date: '2026-05-31', role: 'accountant', title: '月末期间损益结转', tags: ["期末"], difficulty: 3, tip: '收入借转，费用贷转。', description: '结转各损益科目至本年利润。',
    entries: [
      { subjectCode: '6001', summary: '转收入', debit: 490000, credit: 0, explanation: '收入转出。' },
      { subjectCode: '6301', summary: '转营业外收入', debit: 10000, credit: 0, explanation: '重组收益转出。' },
      { subjectCode: '6401', summary: '转成本', debit: 0, credit: 253600, explanation: '成本转出。' },
      { subjectCode: '6403', summary: '转税金', debit: 0, credit: 3640, explanation: '税金转出。' },
      { subjectCode: '660101', summary: '转销售费用', debit: 0, credit: 14000, explanation: '销售费用转出。' },
      { subjectCode: '6602', summary: '转管理费用', debit: 0, credit: 14700, explanation: '管理费用转出。' },
      { subjectCode: '6603', summary: '转财务费用', debit: 5606, credit: 0, explanation: '财务费用转出。' },
      { subjectCode: '6701', summary: '转减值损失', debit: 0, credit: 8000, explanation: '减值损失转出。' },
      { subjectCode: '4103', summary: '转本年利润', debit: 0, credit: 211666, explanation: '净利润=490,000+10,000-253,600-3,640-14,000-14,700+5,606-8,000=211,666。' }],
    documents: [{ type: 'text', label: '结转计算表', docTitle: '月 末 期 间 损 益 结 转 表', date: '2026-05-31', stampText: '已结转', content: '期间损益结转\n会计期间：2026年5月\n\n【收入类】→ 本年利润（贷方）\n  主营业务收入（6001）：490,000\n  营业外收入（6301）：10,000（债务重组收益）\n  财务费用（6603）：5,606（利息净收入）\n\n【费用类】→ 本年利润（借方）\n  主营业务成本（6401）：253,600\n  税金及附加（6403）：3,640\n  销售费用（660101）：14,000\n  管理费用（6602）：14,700\n  信用减值损失（6701）：8,000\n\n本年利润：\n  490,000+10,000+5,606-253,600-3,640-14,000-14,700-8,000 = 211,666元\n\n结转后各损益类科目余额为零 ✓\n\n制表：李会计\n审核：赵会计主管',
    headers: [
      '项目',
      '内容'
    ],
    rows: [
      [
        '会计期间',
        '2026年5月'
      ],
      [
        '主营业务收入（6001）',
        '490,000'
      ],
      [
        '营业外收入（6301）',
        '10,000（债务重组收益）'
      ],
      [
        '财务费用（6603）',
        '5,606（利息净收入）'
      ],
      [
        '主营业务成本（6401）',
        '253,600'
      ],
      [
        '税金及附加（6403）',
        '3,640'
      ],
      [
        '销售费用（660101）',
        '14,000'
      ],
      [
        '管理费用（6602）',
        '14,700'
      ],
      [
        '信用减值损失（6701）',
        '8,000'
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
  { date: '2026-05-31', role: 'accountant', title: '模拟纳税申报', tags: ["期末","申报"], difficulty: 1, tip: '每月申报是法定义务。', description: '完成账务处理后申报。', entries: [], nextAction: 'tax-filing',
    documents: [{ type: 'text', label: '申报提醒', docTitle: '5 月 纳 税 申 报 提 醒', stampText: '财务专用章', content: '申报期间：2026年5月\n截止日期：2026年6月15日\n\n申报税种：\n1. 增值税（5月）\n2. 城市维护建设税\n3. 教育费附加\n\n请前往纳税申报页面核对后提交。' }]},
]
export default may
