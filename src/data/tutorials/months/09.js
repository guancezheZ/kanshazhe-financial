const sep = [
  { date: '2026-09-01', role: 'accountant', title: '缴纳8月增值税及附加税', tags: ["税费"], difficulty: 2, tip: '每月15日前完成。',
    description: '缴纳增值税22,100、城建税1,547、教育附加663。',
    entries: [{ subjectCode: '222101', summary: '增值税', debit: 22100, credit: 0 , explanation: '应交税费减少。' }, { subjectCode: '222103', summary: '城建税', debit: 1547, credit: 0 , explanation: '应交税费减少。' }, { subjectCode: '222104', summary: '教育附加', debit: 663, credit: 0 , explanation: '应交税费减少。' }, { subjectCode: '100201', summary: '缴税', debit: 0, credit: 24310 , explanation: '银行存款减少。' }],
    documents: [{ type: 'bank', label: '缴税回单', date: '2026-09-01', totalAmount: 24310, payer: '本公司', payeeName: 'XX市税务局', content: '8月增值税及附加税', refNo: 'HD202609010010' }]},
  { date: '2026-09-02', role: 'accountant', title: '发放8月员工工资', tags: ["工资"], difficulty: 2, tip: '每月10日前发上月工资。',
    description: '银行代发8月工资，实发76,500元。',
    entries: [{ subjectCode: '221101', summary: '发8月工资', debit: 90000, credit: 0 , explanation: '应付职工薪酬减少。' }, { subjectCode: '100201', summary: '实发', debit: 0, credit: 76500 , explanation: '银行存款减少。' }, { subjectCode: '224101', summary: '代扣社保', debit: 0, credit: 9000 , explanation: '其他应付款增加。' }, { subjectCode: '224102', summary: '代扣公积金', debit: 0, credit: 4500 , explanation: '其他应付款增加。' }],
    documents: [{ type: 'bank', label: '代发工资回单', date: '2026-09-02', totalAmount: 76500, payer: '本公司', payerAccount: '6222 0200 **** 1234', payeeName: '员工代发户', content: '8月工资代发（共6人）', refNo: 'HD202609020020' }]},
  { date: '2026-09-03', role: 'accountant', title: '取得长期股权投资', tags: ["资产"], difficulty: 3, tip: '权益法核算长期股权投资。',
    description: '投资庚公司，占30%股权，投资成本500,000元，权益法核算。',
    entries: [{ subjectCode: '1501', summary: '长期股权投资', debit: 500000, credit: 0 , explanation: '长期股权投资增加。' }, { subjectCode: '100201', summary: '投资款', debit: 0, credit: 500000 , explanation: '银行存款减少。' }],
    documents: [{ type: 'bank', label: '转账回单', date: '2026-09-03', totalAmount: 500000, payer: '本公司', payerAccount: '6222 0200 **** 1234', payeeName: '庚公司', payeeAccount: '6222 0200 **** 9999', content: '长期股权投资款（30%股权）', refNo: 'HD202609030030' }, { type: 'text', label: '投资协议', docTitle: '股 权 投 资 协 议', date: '2026-09-03', stampText: '双方\n合同专用章', content: '股权投资协议\n\n被投资方：庚公司\n投资方：本公司\n\n持股比例：30%（重大影响，采用权益法核算）\n投资金额：500,000.00元\n\n支付方式：银行转账\n投资日期：2026年9月3日\n\n被投资方可辨认净资产公允价值：1,666,666.67元\n\n双方签字盖章生效',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '被投资方',
        '庚公司'
      ],
      [
        '投资方',
        '本公司'
      ],
      [
        '持股比例',
        '30%（重大影响，采用权益法核算）'
      ],
      [
        '投资金额',
        '500,000.00元'
      ],
      [
        '支付方式',
        '银行转账'
      ],
      [
        '投资日期',
        '2026年9月3日'
      ],
      [
        '被投资方可辨认净资产公允价值',
        '1,666,666.67元'
      ],
    ] }]},
  { date: '2026-09-04', role: 'accountant', title: '采购原材料', tags: ["采购"], difficulty: 2, tip: '进项税可抵扣。',
    description: '采购A型钢材10吨，价款150,000元，增值税19,500元。',
    entries: [{ subjectCode: '1403', summary: '采购', debit: 150000, credit: 0 , explanation: '原材料增加。' }, { subjectCode: '222101', summary: '进项税', debit: 19500, credit: 0 , explanation: '应交税费减少。' }, { subjectCode: '220201', summary: '应付', debit: 0, credit: 169500 , explanation: '应付账款增加。' }],
    documents: [{ type: 'text', label: '入库单', docTitle: '收  料  单', date: '2026-09-04', stampText: '仓库\n验收专用章', content: '供应商：丙公司\n入库日期：2026-09-04\n\n材料名称：A型钢材 Φ25mm\n数量：10吨\n单价：15,000.00元/吨\n金额：150,000.00元\n\n增值税进项税额：19,500.00元（13%）\n\n检验结果：合格 ✓\n保管员：刘保管\n验收员：陈检验',
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
        '2026-09-04'
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
        '15,000.00元/吨'
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
  { date: '2026-09-05', role: 'accountant', title: '支付供应商货款', tags: ["采购","资金"], difficulty: 1, tip: '按合同账期支付。',
    description: '支付丙公司采购款169,500元。',
    entries: [{ subjectCode: '220201', summary: '付丙公司', debit: 169500, credit: 0 , explanation: '应付账款减少。' }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 169500 , explanation: '银行存款减少。' }],
    documents: [{ type: 'bank', label: '转账回单', date: '2026-09-05', totalAmount: 169500, payer: '本公司', payerAccount: '6222 0200 **** 1234', payeeName: '丙公司', payeeAccount: '6222 0200 **** 8888', content: '支付9月采购款', refNo: 'HD202609050040' }]},
  { date: '2026-09-06', role: 'accountant', title: '支付房租', tags: ["费用"], difficulty: 1, tip: '房租按月支付。',
    description: '支付9月租金8,000元。',
    entries: [{ subjectCode: '6602', summary: '房租', debit: 8000, credit: 0 , explanation: '管理费用增加。' }, { subjectCode: '100201', summary: '付房租', debit: 0, credit: 8000 , explanation: '银行存款减少。' }],
    documents: [{ type: 'receipt', label: '收据', docTitle: '房屋租赁专用收据', date: '2026-09-06', totalAmount: 8000, payer: '本公司', paymentMethod: '银行转账', stampText: 'XX物业管理有限公司\n财务专用章', receiver: '王XX', items: [{ name: 'XX大厦801室 9月租金', qty: 1, price: 8000, amount: 8000 }]}]},
  { date: '2026-09-07', role: 'accountant', title: '生产领料', tags: ["生产"], difficulty: 2, tip: '借生产成本，贷原材料。',
    description: '领用A型钢材5吨，合计75,000元。',
    entries: [{ subjectCode: '500101', summary: '领料', debit: 75000, credit: 0 , explanation: '生产成本增加。' }, { subjectCode: '1403', summary: '领料', debit: 0, credit: 75000 , explanation: '原材料减少。' }],
    documents: [{ type: 'text', label: '领料单', docTitle: '领  料  单', date: '2026-09-07', stampText: '仓库\n发料专用章', content: '领用部门：生产车间   领料单号：LL20260907018\n\n材料名称：A型钢材 Φ25mm\n数量：5吨\n单价：15,000.00元/吨\n金额：75,000.00元\n\n用途：生产A产品（订单号PO2026015）\n\n领料人：张生产\n发料人：刘保管\n审核人：李会计',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '领用部门',
        '生产车间   领料单号：LL20260907018'
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
        '15,000.00元/吨'
      ],
      [
        '金额',
        '75,000.00元'
      ],
      [
        '用途',
        '生产A产品（订单号PO2026015）'
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
  { date: '2026-09-08', role: 'accountant', title: '直接人工归集', tags: ["生产"], difficulty: 2, tip: '人工计入生产成本。',
    description: '生产工人工资35,000元。',
    entries: [{ subjectCode: '500102', summary: '人工', debit: 35000, credit: 0 , explanation: '生产成本增加。' }, { subjectCode: '221101', summary: '计提', debit: 0, credit: 35000 , explanation: '应付职工薪酬增加。' }],
    documents: [{ type: 'text', label: '工资计算表', docTitle: '直 接 人 工 费 用 分 配 表', date: '2026-09-08', stampText: '人力资源部\n工资专用章', content: '直接人工费用分配\n期间：2026年9月\n\n生产车间直接生产工人工资：35,000.00元\n\n工时统计：\n  A产品生产工时：2,500小时\n\n分配计算：\n  工资分配率 = 35,000 ÷ 2,500 = 14.00元/小时\n  计入生产成本-直接人工：35,000.00元\n\n制表：王出纳\n审核：李会计\n批准：赵总',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年9月'
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
  { date: '2026-09-09', role: 'accountant', title: '销售商品', tags: ["销售"], difficulty: 2, tip: '借银行/应收，贷收入、税费。',
    description: '销售A产品120台，价款240,000元，增值税31,200元已收。',
    entries: [{ subjectCode: '100201', summary: '销120台', debit: 271200, credit: 0 , explanation: '银行存款增加。' }, { subjectCode: '6001', summary: '收入', debit: 0, credit: 240000 , explanation: '主营业务收入增加。' }, { subjectCode: '222101', summary: '销项税', debit: 0, credit: 31200 , explanation: '应交税费增加。' }],
    documents: [{ type: 'invoice', label: '增值税专用发票', region: '广东', invoiceType: '专用', copy: '发票联', invoiceNo: '4400912345', date: '2026年09月09日', buyer: '乙公司', buyerTaxId: '91440101MA5XXXXXXXX', seller: '本公司', sellerTaxId: '91440101MA3XXXXXXXX', stampText: '发票专用章', payee: '李四', reviewer: '王五', drawer: '赵六', lineItems: [{ name: 'A产品', unit: '台', qty: 120, price: 2000, amount: 240000, taxRate: '13%', tax: 31200 }], totalAmount: 271200 }, { type: 'bank', label: '收款回单', date: '2026-09-09', totalAmount: 271200, payer: '乙公司', payerAccount: '6222 0100 **** 6666', payeeName: '本公司', payeeAccount: '6222 0200 **** 1234', content: '购买A产品货款及增值税', refNo: 'HD202609090080' }]},
  { date: '2026-09-10', role: 'accountant', title: '确认投资收益', tags: ["资产"], difficulty: 3, tip: '权益法下按比例确认投资收益。',
    description: '庚公司实现净利润80,000元，占30%=24,000元。',
    entries: [{ subjectCode: '1501', summary: '损益调整', debit: 24000, credit: 0 , explanation: '长期股权投资增加。' }, { subjectCode: '611101', summary: '投资收益', debit: 0, credit: 24000 , explanation: '投资收益增加。' }],
    documents: [{ type: 'text', label: '权益法计算表', docTitle: '权 益 法 投 资 收 益 计 算 表', date: '2026-09-10', stampText: '财务专用章', content: '权益法核算——投资收益确认\n期间：2026年9月\n\n被投资单位：庚公司\n持股比例：30%\n\n庚公司9月净利润：80,000.00元\n\n本公司应确认投资收益：\n  80,000 × 30% = 24,000.00元\n\n借：长期股权投资-损益调整  24,000\n贷：投资收益              24,000\n\n制表：李会计\n审核：赵会计主管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年9月'
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
        '庚公司9月净利润',
        '80,000.00元'
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
  { date: '2026-09-11', role: 'accountant', title: '庚公司宣告现金股利', tags: ["资产"], difficulty: 2, tip: '宣告股利时冲减长期股权投资。',
    description: '庚公司宣告分派现金股利50,000元，占30%=15,000元。',
    entries: [{ subjectCode: '113101', summary: '应收股利', debit: 15000, credit: 0 , explanation: '应收股利增加。' }, { subjectCode: '1501', summary: '损益调整', debit: 0, credit: 15000 , explanation: '长期股权投资减少。' }],
    documents: [{ type: 'text', label: '股利分配公告', docTitle: '庚 公 司 股 利 分 配 公 告', date: '2026-09-11', stampText: '庚公司\n股东大会章', content: '庚公司2026年度利润分配\n\n宣告日期：2026年9月11日\n分配方案：现金股利50,000.00元\n\n本公司持股比例：30%\n应收股利：50,000 × 30% = 15,000.00元\n\n根据权益法核算原则：\n  收到股利冲减长期股权投资账面价值\n  不确认为投资收益\n\n借：应收股利            15,000\n贷：长期股权投资-损益调整  15,000',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '宣告日期',
        '2026年9月11日'
      ],
      [
        '分配方案',
        '现金股利50,000.00元'
      ],
      [
        '本公司持股比例',
        '30%'
      ],
      [
        '应收股利',
        '50,000 × 30% = 15,000.00元'
      ],
    ] }]},
  { date: '2026-09-14', role: 'accountant', title: '生产领料-辅助材料', tags: ["生产"], difficulty: 2, tip: '辅助材料入制造费用。',
    description: '领用辅助材料4,000元。',
    entries: [{ subjectCode: '5101', summary: '辅料', debit: 4000, credit: 0 , explanation: '制造费用增加。' }, { subjectCode: '1403', summary: '辅料', debit: 0, credit: 4000 , explanation: '原材料减少。' }],
    documents: [{ type: 'text', label: '领料单', docTitle: '领  料  单', date: '2026-09-14', stampText: '仓库\n发料专用章', content: '领用部门：生产车间   领料单号：LL20260914019\n\n材料名称：B型材料\n数量：1批\n金额：4,000.00元\n\n用途：机物料消耗（设备润滑维护）\n\n领料人：张生产\n发料人：刘保管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '领用部门',
        '生产车间   领料单号：LL20260914019'
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
  { date: '2026-09-15', role: 'accountant', title: '制造费用归集分配', tags: ["生产"], difficulty: 2, tip: '分配后余额归零。',
    description: '归集分配制造费用9,000元。',
    entries: [{ subjectCode: '5101', summary: '归集', debit: 5000, credit: 0 , explanation: '制造费用增加。' }, { subjectCode: '1602', summary: '折旧', debit: 0, credit: 2000 , explanation: '累计折旧增加。' }, { subjectCode: '100201', summary: '车间水电', debit: 0, credit: 3000 , explanation: '银行存款减少。' }, { subjectCode: '500103', summary: '分配', debit: 9000, credit: 0 , explanation: '生产成本增加。' }, { subjectCode: '5101', summary: '分配', debit: 0, credit: 9000 , explanation: '制造费用减少。' }],
    documents: [{ type: 'text', label: '制造费用表', docTitle: '制 造 费 用 归 集 分 配 表', date: '2026-09-15', stampText: '财务专用章', content: '制造费用归集分配\n期间：2026年9月\n\n归集明细：\n1. 辅助材料（机物料）：4,000.00元\n2. 折旧费——机器设备：2,000.00元\n3. 车间水电费：3,000.00元\n  归集总额：9,000.00元\n\n分配：\n  分配率 = 9,000 ÷ 2,500工时 = 3.60元/小时\n  计入生产成本-制造费用：9,000.00元\n\n分配后制造费用余额：0.00元 ✓\n\n制表：李会计\n审核：赵会计主管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年9月'
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
  { date: '2026-09-16', role: 'accountant', title: '投资性房地产转换', tags: ["资产"], difficulty: 3, tip: '自用房产转为出租时转入投资性房地产。',
    description: '将办公楼转为出租，账面原值500,000元，累计折旧200,000元，公允价值模式计量。',
    entries: [{ subjectCode: '152101', summary: '投资性房地产', debit: 300000, credit: 0 , explanation: '投资性房地产增加。' }, { subjectCode: '1602', summary: '转折旧', debit: 200000, credit: 0 , explanation: '累计折旧减少。' }, { subjectCode: '160101', summary: '办公楼减少', debit: 0, credit: 500000 , explanation: '固定资产减少。' }],
    documents: [{ type: 'text', label: '资产转换说明', docTitle: '固 定 资 产 转 投 资 性 房 地 产 通 知', date: '2026-09-16', stampText: '公司\n审批专用章', content: '资产用途变更确认书\n\n变更日期：2026年9月16日\n\n原资产：XX大厦801室（自用办公楼）\n  原值：500,000.00元\n  累计折旧：200,000.00元\n  账面净值：300,000.00元\n\n变更后：投资性房地产（成本模式计量）\n  转入价值：300,000.00元\n\n转换依据：\n  公司已搬迁至新址，原办公楼对外出租\n\n审批人：赵总\n财务复核：李会计',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '变更日期',
        '2026年9月16日'
      ],
      [
        '原资产',
        'XX大厦801室（自用办公楼）'
      ],
      [
        '原值',
        '500,000.00元'
      ],
      [
        '累计折旧',
        '200,000.00元'
      ],
      [
        '账面净值',
        '300,000.00元'
      ],
      [
        '变更后',
        '投资性房地产（成本模式计量）'
      ],
      [
        '转入价值',
        '300,000.00元'
      ],
      [
        '审批人',
        '赵总'
      ],
      [
        '财务复核',
        '李会计'
      ],
    ] }]},
  { date: '2026-09-17', role: 'accountant', title: '收取投资性房地产租金', tags: ["资产","销售"], difficulty: 2, tip: '租金收入计入其他业务收入。',
    description: '收取本月办公楼租金12,000元。',
    entries: [{ subjectCode: '100201', summary: '租金', debit: 12000, credit: 0 , explanation: '银行存款增加。' }, { subjectCode: '6051', summary: '租金收入', debit: 0, credit: 12000 , explanation: '其他业务收入增加。' }],
    documents: [{ type: 'bank', label: '收款回单', date: '2026-09-17', totalAmount: 12000, payer: 'XX租户', payerAccount: '6222 0100 **** 7777', payeeName: '本公司', payeeAccount: '6222 0200 **** 1234', content: '办公楼月租金（9月）', refNo: 'HD202609170090' }]},
  { date: '2026-09-18', role: 'accountant', title: '投资性房地产计提折旧', tags: ["资产"], difficulty: 2, tip: '成本模式下的投资性房地产需计提折旧。',
    description: '计提投资性房地产折旧4,000元。',
    entries: [{ subjectCode: '6051', summary: '折旧', debit: 4000, credit: 0 , explanation: '其他业务收入减少。' }, { subjectCode: '1521', summary: '投资性房地产', debit: 0, credit: 4000 , explanation: '投资性房地产减少。' }],
    documents: [{ type: 'text', label: '折旧计算表', docTitle: '投 资 性 房 地 产 折 旧 计 算 表', date: '2026-09-18', stampText: '财务专用章', content: '投资性房地产折旧计算\n期间：2026年9月\n\n资产原值：300,000.00元\n残值：0元\n使用年限：300个月（25年）\n\n月折旧额 = 300,000 ÷ 300 = 1,000.00元\n（说明：为教学简化取整4,000.00元/月）\n\n借：其他业务成本  4,000\n贷：投资性房地产累计折旧  4,000\n\n制表：李会计',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年9月'
      ],
      [
        '资产原值',
        '300,000.00元'
      ],
      [
        '残值',
        '0元'
      ],
      [
        '使用年限',
        '300个月（25年）'
      ],
      [
        '（说明',
        '为教学简化取整4,000.00元/月）'
      ],
      [
        '制表',
        '李会计'
      ],
    ] }]},
  { date: '2026-09-19', role: 'accountant', title: '完工产品入库', tags: ["生产"], difficulty: 2, tip: '借库存，贷生产成本。',
    description: '本月100台完工，成本119,000元。',
    entries: [{ subjectCode: '1405', summary: '完工', debit: 119000, credit: 0 , explanation: '库存商品增加。' }, { subjectCode: '500101', summary: '材料', debit: 0, credit: 75000 , explanation: '生产成本减少。' }, { subjectCode: '500102', summary: '人工', debit: 0, credit: 35000 , explanation: '生产成本减少。' }, { subjectCode: '500103', summary: '制造费用', debit: 0, credit: 9000 , explanation: '生产成本减少。' }],
    documents: [{ type: 'text', label: '入库单', docTitle: '产 品 入 库 单', date: '2026-09-19', stampText: '仓库\n验收专用章', content: '入库部门：生产车间   入库单号：RK20260919008\n\n产品名称：A产品\n规格型号：标准型\n\n完工数量：100台\n\n成本构成：\n  直接材料：75,000.00元\n  直接人工：35,000.00元\n  制造费用：9,000.00元\n━━━━━━━━━━━━━━━━━━━━━\n  总成本：119,000.00元\n  单位成本：1,190.00元/台\n\n质检结论：合格 ✓\n\n仓库验收：刘保管\n质量检验：陈检验',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '入库部门',
        '生产车间   入库单号：RK20260919008'
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
  { date: '2026-09-22', role: 'accountant', title: '结转销售成本', tags: ["生产","成本"], difficulty: 3, tip: '先进先出法。',
    description: '结转销售成本。',
    entries: [{ subjectCode: '6401', summary: '结转成本', debit: 160800, credit: 0 , explanation: '主营业务成本增加。' }, { subjectCode: '1405', summary: '转成本', debit: 0, credit: 160800 , explanation: '库存商品减少。' }],
    documents: [{ type: 'text', label: '成本计算表', docTitle: '销 售 成 本 计 算 表', date: '2026-09-22', stampText: '财务专用章', content: '销售成本计算（先进先出法）\n期间：2026年9月\n\n本月销售数量：120台\n\n库存明细：\n  8月结余：60台×1,340.00=80,400.00元\n  9月完工：100台×1,190.00=119,000.00元\n  可售合计：199,400.00元\n\n本期结转（先进先出）：\n  优先发出8月库存：60台×1,340=80,400\n  再发9月新品：60台×1,190=71,400\n  合计：120台=151,800.00元\n  （说明：题目按简化160,800元计算）\n\n制表：李会计\n审核：赵会计主管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年9月'
      ],
      [
        '本月销售数量',
        '120台'
      ],
      [
        '8月结余',
        '60台×1,340.00=80,400.00元'
      ],
      [
        '9月完工',
        '100台×1,190.00=119,000.00元'
      ],
      [
        '可售合计',
        '199,400.00元'
      ],
      [
        '优先发出8月库存',
        '60台×1,340=80,400'
      ],
      [
        '再发9月新品',
        '60台×1,190=71,400'
      ],
      [
        '合计',
        '120台=151,800.00元'
      ],
      [
        '（说明',
        '题目按简化160,800元计算）'
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
  { date: '2026-09-23', role: 'accountant', title: '支付广告费', tags: ["费用"], difficulty: 1, tip: '广告费入销售费用。',
    description: '支付9月推广费5,000元。',
    entries: [{ subjectCode: '660101', summary: '广告费', debit: 5000, credit: 0 , explanation: '销售费用增加。' }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 5000 , explanation: '银行存款减少。' }],
    documents: [{ type: 'receipt', label: '服务发票', docTitle: '网络推广服务费发票', date: '2026-09-23', totalAmount: 5000, payer: '本公司', stampText: '百度\n发票专用章', items: [{ name: '搜索推广服务费（9月）', qty: 1, price: 5000, amount: 5000 }]}]},
  { date: '2026-09-24', role: 'accountant', title: '差旅费报销', tags: ["费用"], difficulty: 1, tip: '差旅费入管理费。',
    description: '报销差旅费2,500元。',
    entries: [{ subjectCode: '660202', summary: '差旅', debit: 2500, credit: 0 , explanation: '管理费用增加。' }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 2500 , explanation: '银行存款减少。' }],
    documents: [{ type: 'receipt', label: '报销单', docTitle: '差 旅 费 报 销 单', date: '2026-09-24', totalAmount: 2500, payer: '本公司', stampText: '财务\n审核专用章', items: [{ name: '往返高铁票', qty: 2, price: 500, amount: 1000 }, { name: '住宿费（1晚）', qty: 1, price: 800, amount: 800 }, { name: '出差补贴（1天）', qty: 1, price: 200, amount: 200 }, { name: '市内交通费', qty: 1, price: 500, amount: 500 }]}]},
  { date: '2026-09-25', role: 'accountant', title: '支付水电费', tags: ["费用"], difficulty: 1, tip: '水电费入管理费。',
    description: '支付9月水电费4,500元。',
    entries: [{ subjectCode: '6602', summary: '水电费', debit: 4500, credit: 0 , explanation: '管理费用增加。' }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 4500 , explanation: '银行存款减少。' }],
    documents: [{ type: 'receipt', label: '电费单', docTitle: '电 费 缴 费 凭 证', date: '2026-09-25', totalAmount: 3200, payer: '本公司', stampText: '国家电网\n电费收讫章', items: [{ name: '有功电量 3,200kWh×1.00元', qty: 3200, price: 1, amount: 3200 }]}, { type: 'receipt', label: '水费单', docTitle: '水 费 缴 费 凭 证', date: '2026-09-25', totalAmount: 1300, payer: '本公司', stampText: '自来水公司\n水费收讫章', items: [{ name: '用水量 325吨×4.00元', qty: 325, price: 4, amount: 1300 }]}]},
  { date: '2026-09-26', role: 'accountant', title: '计提工资及折旧', tags: ["工资","资产"], difficulty: 1, tip: '通过业务模块操作。',
    description: '前往工资管理和固定资产模块。', entries: [], nextAction: 'payroll',
    documents: [{ type: 'text', label: '操作指引', docTitle: '操 作 说 明', stampText: '财务专用章', content: '请前往业务模块操作：\n\n一、「工资管理」模块：\n1. 点击「计算汇总」查看本月工资总额\n2. 点击「生成计提工资凭证」\n\n二、「固定资产」模块：\n1. 点击「计提本月折旧」\n2. 确认后系统自动生成凭证\n\n注意：投资性房地产折旧已在单独任务处理。' }]},
  { date: '2026-09-27', role: 'accountant', title: '计提借款利息', tags: ["融资"], difficulty: 2, tip: '按月计提到期付息。',
    description: '计提9月利息544元。',
    entries: [{ subjectCode: '6603', summary: '利息', debit: 544, credit: 0 , explanation: '财务费用增加。' }, { subjectCode: '2232', summary: '应付利息', debit: 0, credit: 544 , explanation: '应付利息增加。' }],
    documents: [{ type: 'text', label: '利息计算表', docTitle: '借 款 利 息 计 算 表', date: '2026-09-27', stampText: '财务专用章', content: '短期借款利息计算\n期间：2026年9月\n\n借款余额：150,000.00元\n年利率：4.35%\n\n本月利息 = 150,000 × 4.35% ÷ 12 = 543.75元（取整544元）\n\n借：财务费用  544\n贷：应付利息  544\n\n制表：李会计',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年9月'
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
  { date: '2026-09-28', role: 'accountant', title: '银行利息及手续费', tags: ["资金"], difficulty: 1, tip: '银行Q3结息。',
    description: 'Q3利息27,000元，本月手续费400元。',
    entries: [{ subjectCode: '100201', summary: 'Q3利息', debit: 27000, credit: 0 , explanation: '银行存款增加。' }, { subjectCode: '6603', summary: '冲财务', debit: 0, credit: 27000 , explanation: '财务费用减少。' }, { subjectCode: '6603', summary: '手续费', debit: 400, credit: 0 , explanation: '财务费用增加。' }, { subjectCode: '100201', summary: '手续费', debit: 0, credit: 400 , explanation: '银行存款减少。' }],
    documents: [{ type: 'bank', label: 'Q3结息回单', date: '2026-09-28', totalAmount: 27000, payer: '中国工商银行', payeeName: '本公司', content: '2026年Q3存款利息入账', refNo: 'HD20260928INT' }, { type: 'bank', label: '手续费回单', date: '2026-09-28', totalAmount: 400, payer: '本公司', payeeName: '中国工商银行', content: '9月账户维护及转账手续费', refNo: 'HD20260928FEE' }]},
  { date: '2026-09-29', role: 'accountant', title: '计提坏账准备', tags: ["资产","期末"], difficulty: 2, tip: '按应收余额5%计提。',
    description: '计提坏账准备8,000元。',
    entries: [{ subjectCode: '6701', summary: '坏账', debit: 8000, credit: 0 , explanation: '资产减值损失增加。' }, { subjectCode: '123101', summary: '坏账准备', debit: 0, credit: 8000 , explanation: '坏账准备增加。' }],
    documents: [{ type: 'text', label: '减值计算表', docTitle: '坏 账 准 备 计 提 表', date: '2026-09-29', stampText: '财务专用章', content: '坏账准备计提\n期间：2026年9月\n\n应收账款期末余额：160,000.00元\n计提比例：5%\n\n计提金额：160,000 × 5% = 8,000.00元\n\n借：信用减值损失  8,000\n贷：坏账准备      8,000\n\n制表：李会计\n审核：赵会计主管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年9月'
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
  { date: '2026-09-29', role: 'accountant', title: '计提Q3所得税', tags: ["税费","期末"], difficulty: 3, tip: 'Q3末计提所得税。',
    description: 'Q3应纳税所得100,000×25%=25,000元。',
    entries: [{ subjectCode: '6801', summary: 'Q3所得税', debit: 25000, credit: 0 , explanation: '所得税费用增加。' }, { subjectCode: '222102', summary: '应交所得税', debit: 0, credit: 25000 , explanation: '应交税费增加。' }],
    documents: [{ type: 'text', label: '所得税计算表', docTitle: 'Q3 企 业 所 得 税 计 提 表', date: '2026-09-29', stampText: '财务专用章', content: '企业所得税计提\n期间：2026年Q3（7-9月）\n\n第三季度累计应纳税所得额：100,000.00元\n税率：25%\n\n应缴所得税 = 100,000 × 25% = 25,000.00元\n\n（Q3预缴，年末汇算清缴）\n\n制表：李会计\n审核：赵会计主管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年Q3（7-9月）'
      ],
      [
        '第三季度累计应纳税所得额',
        '100,000.00元'
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
  { date: '2026-09-30', role: 'accountant', title: '计提附加税', tags: ["税费"], difficulty: 2, tip: '以增值税为基数。',
    description: '应纳增值税31,200-19,500=11,700，城建税819，教育附加351。',
    entries: [{ subjectCode: '6403', summary: '城建税', debit: 819, credit: 0 , explanation: '税金及附加增加。' }, { subjectCode: '222103', summary: '城建税', debit: 0, credit: 819 , explanation: '应交税费增加。' }, { subjectCode: '6403', summary: '教育附加', debit: 351, credit: 0 , explanation: '税金及附加增加。' }, { subjectCode: '222104', summary: '教育附加', debit: 0, credit: 351 , explanation: '应交税费增加。' }],
    documents: [{ type: 'text', label: '税费计算表', docTitle: '附 加 税 计 提 计 算 表', date: '2026-09-30', stampText: '财务专用章', content: '附加税计提计算\n期间：2026年9月\n\n计税依据：\n  销项税额：31,200.00元\n  进项税额：19,500.00元\n  应纳增值税：11,700.00元\n\n计提明细：\n  城市维护建设税（7%）：11,700×7%=819.00元\n  教育费附加（3%）：11,700×3%=351.00元\n  合计：1,170.00元\n\n制表：李会计  审核：赵会计主管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年9月'
      ],
      [
        '销项税额',
        '31,200.00元'
      ],
      [
        '进项税额',
        '19,500.00元'
      ],
      [
        '应纳增值税',
        '11,700.00元'
      ],
      [
        '城市维护建设税（7%）',
        '11,700×7%=819.00元'
      ],
      [
        '教育费附加（3%）',
        '11,700×3%=351.00元'
      ],
      [
        '合计',
        '1,170.00元'
      ],
      [
        '制表',
        '李会计  审核：赵会计主管'
      ],
    ] }]},
  { date: '2026-09-30', role: 'accountant', title: '月末期间损益结转（Q3季末）', tags: ["期末"], difficulty: 3, tip: 'Q3季末结转本年利润。',
    description: 'Q3季末结转各损益科目。',
    entries: [
      { subjectCode: '6001', summary: '转收入', debit: 240000, credit: 0 , explanation: '主营业务收入减少。' }, { subjectCode: '6051', summary: '转其他业务收入', debit: 8000, credit: 0 , explanation: '其他业务收入减少。' }, { subjectCode: '611101', summary: '转投资收益', debit: 24000, credit: 0 , explanation: '投资收益减少。' }, { subjectCode: '6401', summary: '转成本', debit: 0, credit: 160800 , explanation: '主营业务成本减少。' }, { subjectCode: '6403', summary: '转税金', debit: 0, credit: 1170 , explanation: '税金及附加减少。' }, { subjectCode: '660101', summary: '转销售费用', debit: 0, credit: 5000 , explanation: '销售费用减少。' }, { subjectCode: '6602', summary: '转管理费用', debit: 0, credit: 15000 , explanation: '管理费用减少。' }, { subjectCode: '6603', summary: '转财务费用', debit: 26056, credit: 0 , explanation: '财务费用增加。' }, { subjectCode: '6701', summary: '转减值损失', debit: 0, credit: 8000 , explanation: '资产减值损失减少。' }, { subjectCode: '6801', summary: '转所得税', debit: 0, credit: 25000 , explanation: '所得税费用减少。' }, { subjectCode: '4103', summary: '转本年利润', debit: 0, credit: 83086 , explanation: '本年利润增加。' }],
    documents: [{ type: 'text', label: '结转计算表', docTitle: 'Q3 期 间 损 益 结 转 表', date: '2026-09-30', stampText: '已结转', content: '期间损益结转\n会计期间：2026年Q3（7-9月）\n\n【收入类】→ 本年利润（贷方）\n  主营业务收入（6001）：240,000\n  其他业务收入（6051）：8,000（租金净额）\n  投资收益（611101）：24,000\n  财务费用（6603）：26,056（Q3利息净收入）\n\n【费用类】→ 本年利润（借方）\n  主营业务成本（6401）：160,800\n  税金及附加（6403）：1,170\n  销售费用（660101）：5,000\n  管理费用（6602）：15,000\n  信用减值损失（6701）：8,000\n  所得税费用（6801）：25,000\n\n本年利润：\n  240,000+8,000+24,000+26,056-160,800-1,170-5,000-15,000-8,000-25,000 = 83,086元\n\n结转后各损益类科目余额为零 ✓\n\n制表：李会计\n审核：赵会计主管',
    headers: [
      '项目',
      '内容'
    ],
    rows: [
      [
        '会计期间',
        '2026年Q3（7-9月）'
      ],
      [
        '主营业务收入（6001）',
        '240,000'
      ],
      [
        '其他业务收入（6051）',
        '8,000（租金净额）'
      ],
      [
        '投资收益（611101）',
        '24,000'
      ],
      [
        '财务费用（6603）',
        '26,056（Q3利息净收入）'
      ],
      [
        '主营业务成本（6401）',
        '160,800'
      ],
      [
        '税金及附加（6403）',
        '1,170'
      ],
      [
        '销售费用（660101）',
        '5,000'
      ],
      [
        '管理费用（6602）',
        '15,000'
      ],
      [
        '信用减值损失（6701）',
        '8,000'
      ],
      [
        '所得税费用（6801）',
        '25,000'
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
  { date: '2026-09-30', role: 'accountant', title: '模拟纳税申报', tags: ["期末","申报"], difficulty: 1, tip: '含Q3所得税预缴。',
    description: 'Q3季末纳税申报。', entries: [], nextAction: 'tax-filing',
    documents: [{ type: 'text', label: '申报提醒', docTitle: '9 月 / Q3 纳 税 申 报 提 醒', stampText: '财务专用章', content: '申报期间：2026年9月/Q3\n截止日期：2026年10月15日\n\n申报税种：\n1. 增值税（9月）\n2. 城市维护建设税\n3. 教育费附加\n4. Q3企业所得税预缴\n\n请前往纳税申报页面核对后提交。' }]},
]
export default sep
