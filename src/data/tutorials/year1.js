import feb from './months/02.js'
import mar from './months/03.js'
import apr from './months/04.js'
import may from './months/05.js'
import jun from './months/06.js'
import jul from './months/07.js'
import aug from './months/08.js'
import sep from './months/09.js'
import oct from './months/10.js'
import nov from './months/11.js'
import dec from './months/12.js'

const tutorials = {
  '01': [
    { date: '2026-01-02', role: 'accountant', title: '提取备用金', tags: ["资金"], difficulty: 1, tip: '提取备用金是出纳基本业务。', description: '从工商银行提取现金2,000元作为备用金。', entries: [{ subjectCode: '1001', summary: '提取备用金', debit: 2000, credit: 0, explanation: '库存现金增加。提取备用金后企业手头可动用现金增多，需每日盘点。' }, { subjectCode: '100201', summary: '提取备用金', debit: 0, credit: 2000, explanation: '银行存款减少。资金从银行划出，月末需银行对账。' }], documents: [{ type: 'bank', label: '现金支票回单', date: '2026-01-02', totalAmount: 2000, payer: '本公司', payerAccount: '6222 0200 **** 1234', payeeName: '本公司（现金）', content: '提取备用金', refNo: 'HD202601020002' }]},
    { date: '2026-01-03', role: 'accountant', title: '购买办公用品', tags: ["费用"], difficulty: 1, tip: '办公用品属于管理费用-办公费。', description: '行政部采购办公用品一批500元。', entries: [{ subjectCode: '660201', summary: '购买办公用品', debit: 500, credit: 0, explanation: '管理费用-办公费增加。办公用品属于行政管理支出，不计入生产成本。' }, { subjectCode: '100201', summary: '购买办公用品', debit: 0, credit: 500, explanation: '银行存款减少。出纳需保留付款回单。' }], documents: [{ type: 'receipt', label: '收据', docTitle: '收  据', date: '2026-01-03', totalAmount: 500, payer: '本公司', paymentMethod: '银行转账', stampText: '得力办公用品店\n发票专用章', receiver: '李四', items: [{ name: '打印纸 5包×60元', qty: 5, price: 60, amount: 300 }, { name: '签字笔 20支×10元', qty: 20, price: 10, amount: 200 }]}, { type: 'bank', label: '银行回单', date: '2026-01-03', totalAmount: 500, payer: '本公司', payerAccount: '6222 0200 **** 1234', payeeName: '得力办公用品店', payeeAccount: '6222 0200 **** 5678', content: '支付办公用品采购款', refNo: 'HD202601030001' }]},
    { date: '2026-01-04', role: 'accountant', title: '收到客户欠款', tags: ["资金","销售"], difficulty: 1, tip: '收到欠款冲减应收账款。', description: '收到甲公司还款50,000元。', entries: [{ subjectCode: '100201', summary: '收到甲公司货款', debit: 50000, credit: 0, explanation: '银行存款增加。收到客户还款，是收回前期欠款而非当期销售收入。' }, { subjectCode: '112201', summary: '收到甲公司货款', debit: 0, credit: 50000, explanation: '应收账款减少。客户还款后债权减少，收回欠款不确认收入。' }], documents: [{ type: 'bank', label: '收款回单', date: '2026-01-04', totalAmount: 50000, payer: '甲公司', payerAccount: '6222 0100 **** 8888', payeeName: '本公司', payeeAccount: '6222 0200 **** 1234', content: '转账还款（2025年12月货款）', refNo: 'HD202601040012', instructionNo: 'HQH20260104002' }]},
    { date: '2026-01-05', role: 'accountant', title: '采购钢材（赊购）', tags: ["采购"], difficulty: 1, tip: '赊购不涉及现金，不产生现金流量。', description: '从丙公司赊购A型钢材10吨，单价15,000元，合计150,000元。', entries: [{ subjectCode: '1403', summary: '采购A型钢材', debit: 150000, credit: 0, explanation: '原材料增加。10吨×15,000元=150,000元，已验收入库。' }, { subjectCode: '220201', summary: '采购A型钢材-丙公司', debit: 0, credit: 150000, explanation: '应付账款增加。赊购材料未付款，形成对供应商的负债。' }], documents: [{ type: 'text', label: '入库单', docTitle: '收  料  单', date: '2026-01-05', stampText: '仓库\n验收专用章', content: '供应商：丙公司\n入库日期：2026-01-05\n\n材料名称：A型钢材 Φ25mm\n数量：10吨\n单价：15,000元/吨\n金额：150,000.00元\n\n检验结果：合格 ✓\n保管员：刘保管\n验收员：陈检验',
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
        '2026-01-05'
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
    { date: '2026-01-06', role: 'accountant', title: '支付房租', tags: ["费用"], difficulty: 1, tip: '房租计入管理费用。', description: '支付1月办公室租金8,000元。', entries: [{ subjectCode: '6602', summary: '支付1月房租', debit: 8000, credit: 0, explanation: '管理费用增加。房租是企业日常管理支出，计入当期损益。' }, { subjectCode: '100201', summary: '支付1月房租', debit: 0, credit: 8000, explanation: '银行存款减少。出纳需保留付款回单及租赁合同。' }], documents: [{ type: 'receipt', label: '收据', docTitle: '房屋租赁专用收据', date: '2026-01-06', totalAmount: 8000, payer: '本公司', paymentMethod: '银行转账', stampText: 'XX物业管理有限公司\n财务专用章', receiver: '王XX', items: [{ name: 'XX大厦801室 2026年1月租金', qty: 1, price: 8000, amount: 8000 }]}]},
    { date: '2026-01-07', role: 'accountant', title: '差旅费报销', tags: ["费用"], difficulty: 1, tip: '差旅费计入管理费用-差旅费。', description: '销售部员工出差归来报销差旅费3,000元。', entries: [{ subjectCode: '660202', summary: '报销差旅费', debit: 3000, credit: 0, explanation: '管理费用-差旅费增加。出差费用实报实销，计入当期管理费用。' }, { subjectCode: '100201', summary: '报销差旅费', debit: 0, credit: 3000, explanation: '银行存款减少。出纳需审核报销单据。' }], documents: [{ type: 'receipt', label: '报销单', docTitle: '差 旅 费 报 销 单', date: '2026-01-07', totalAmount: 3000, payer: '本公司', stampText: '财务\n审核专用章', items: [{ name: '广州-深圳 往返机票', qty: 1, price: 1800, amount: 1800 }, { name: '住宿费（2晚）', qty: 2, price: 400, amount: 800 }, { name: '出差补贴（2天）', qty: 2, price: 200, amount: 400 }]}]},
    { date: '2026-01-08', role: 'accountant', title: '采购材料+运杂费', tags: ["采购"], difficulty: 2, tip: '运杂费应计入存货成本而非期间费用。', description: '采购B型材料5批10,000元，运费2,400元，装卸费600元，合计10,500元现购。', entries: [{ subjectCode: '1403', summary: '采购B型材料（含运杂费）', debit: 10500, credit: 0, explanation: '原材料增加。采购成本=货款10,000+运费2,400+装卸费600=10,500元。' }, { subjectCode: '100201', summary: '支付货款及运杂费', debit: 0, credit: 10500, explanation: '银行存款减少。三项费用合并支付。' }], documents: [{ type: 'text', label: '入库单', docTitle: '收  料  单', date: '2026-01-08', stampText: '仓库\n验收专用章', content: '供应商：丁公司\n入库日期：2026-01-08\n\n材料名称：B型材料\n数量：5批\n金额：10,000.00元\n\n运杂费明细：\n  运费：2,400.00元\n  装卸费：600.00元\n  运杂费合计：3,000.00元\n\n入库总金额：10,500.00元\n保管员：刘保管',
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
        '2026-01-08'
      ],
      [
        '材料名称',
        'B型材料'
      ],
      [
        '数量',
        '5批'
      ],
      [
        '金额',
        '10,000.00元'
      ],
      [
        '运费',
        '2,400.00元'
      ],
      [
        '装卸费',
        '600.00元'
      ],
      [
        '运杂费合计',
        '3,000.00元'
      ],
      [
        '入库总金额',
        '10,500.00元'
      ],
      [
        '保管员',
        '刘保管'
      ],
    ] }]},
    { date: '2026-01-09', role: 'accountant', title: '生产领料', tags: ["生产"], difficulty: 2, tip: '生产领用原材料：借生产成本，贷原材料。', description: '车间领用A型钢材5吨，单价15,000，合计75,000元。', entries: [{ subjectCode: '500101', summary: '生产领用A型钢材', debit: 75000, credit: 0, explanation: '生产成本-直接材料增加。5吨×15,000=75,000元转入生产成本。' }, { subjectCode: '1403', summary: '生产领用A型钢材', debit: 0, credit: 75000, explanation: '原材料减少。材料从仓库发出，进入生产环节。' }], documents: [{ type: 'text', label: '领料单', docTitle: '领  料  单', date: '2026-01-09', stampText: '仓库\n发料专用章', content: '领用部门：生产车间   领料单号：LL20260109001\n\n材料名称：A型钢材 Φ25mm\n规格：25mm\n数量：5吨\n单价：15,000元/吨\n金额：75,000.00元\n\n用途：生产A产品（订单号：PO2026001）\n\n领料人：张生产\n发料人：刘保管\n审核人：李会计',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '领用部门',
        '生产车间   领料单号：LL20260109001'
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
        '生产A产品（订单号：PO2026001）'
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
    { date: '2026-01-10', role: 'accountant', title: '支付通讯费', tags: ["费用"], difficulty: 1, tip: '通讯费计入管理费用-办公费。', description: '支付1月份电话费及网络费1,200元。', entries: [{ subjectCode: '660201', summary: '支付快递/通讯费', debit: 1200, credit: 0, explanation: '管理费用-办公费增加。快递通讯费是企业日常管理支出。' }, { subjectCode: '100201', summary: '支付快递/通讯费', debit: 0, credit: 1200, explanation: '银行存款减少。出纳需保留付款回单。' }], documents: [{ type: 'bank', label: '缴费回单', date: '2026-01-10', totalAmount: 1200, payer: '本公司', payeeName: '中国电信XX分公司', content: '1月固定电话费及网络费', refNo: 'HD202601100020' }]},
    { date: '2026-01-11', role: 'accountant', title: '生产领料-辅助材料', tags: ["生产"], difficulty: 2, tip: '辅助材料属于间接成本，计入制造费用。', description: '车间领用辅助材料（机物料）6,000元。', entries: [{ subjectCode: '5101', summary: '领用辅助材料', debit: 6000, credit: 0, explanation: '制造费用增加。辅助材料是车间的间接成本，先归集到制造费用。' }, { subjectCode: '1403', summary: '领用辅助材料', debit: 0, credit: 6000, explanation: '原材料减少。B型材料出库用于车间机物料消耗。' }], documents: [{ type: 'text', label: '领料单', docTitle: '领  料  单', date: '2026-01-11', stampText: '仓库\n发料专用章', content: '领用部门：生产车间   领料单号：LL20260111002\n\n材料名称：B型材料\n数量：3批\n金额：6,000.00元\n\n用途：机物料消耗（辅助生产）\n\n领料人：张生产\n发料人：刘保管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '领用部门',
        '生产车间   领料单号：LL20260111002'
      ],
      [
        '材料名称',
        'B型材料'
      ],
      [
        '数量',
        '3批'
      ],
      [
        '金额',
        '6,000.00元'
      ],
      [
        '用途',
        '机物料消耗（辅助生产）'
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
    { date: '2026-01-12', role: 'accountant', title: '支付广告费', tags: ["费用"], difficulty: 1, tip: '广告费计入销售费用-广告费。', description: '支付1月份网络推广广告费6,000元。', entries: [{ subjectCode: '660101', summary: '支付广告费', debit: 6000, credit: 0, explanation: '销售费用-广告费增加。广告宣传支出直接费用化。' }, { subjectCode: '100201', summary: '支付广告费', debit: 0, credit: 6000, explanation: '银行存款减少。' }], documents: [{ type: 'receipt', label: '服务发票', docTitle: '网络推广服务费发票', date: '2026-01-12', totalAmount: 6000, payer: '本公司', stampText: '百度\n发票专用章', items: [{ name: '搜索推广服务费（1月）', qty: 1, price: 6000, amount: 6000 }]}]},
    { date: '2026-01-13', role: 'accountant', title: '直接人工归集', tags: ["生产"], difficulty: 2, tip: '直接人工计入生产成本-直接人工。', description: '本月生产车间直接工人工资30,000元，当月计提次月发放。', entries: [{ subjectCode: '500102', summary: '归集生产工人工资', debit: 30000, credit: 0, explanation: '生产成本-直接人工增加。直接生产工人工资是产品成本的直接组成部分。' }, { subjectCode: '221101', summary: '归集生产工人工资', debit: 0, credit: 30000, explanation: '应付职工薪酬-工资增加。工资当月计提形成负债，次月发放时冲减。' }], documents: [{ type: 'text', label: '工资计算表', docTitle: '直接人工费用分配表', date: '2026-01-13', stampText: '人力资源部\n工资专用章', content: '生产车间直接人工费用分配\n期间：2026年1月\n\n生产工人工资总额：30,000.00元\n\n工时统计：\n  A产品生产工时：2,500小时\n\n分配计算：\n  工资分配率 = 30,000 ÷ 2,500 = 12.00元/小时\n  计入生产成本-直接人工：30,000.00元\n\n制表：王出纳\n审核：李会计\n批准：赵总',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年1月'
      ],
      [
        '生产工人工资总额',
        '30,000.00元'
      ],
      [
        'A产品生产工时',
        '2,500小时'
      ],
      [
        '计入生产成本-直接人工',
        '30,000.00元'
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
    { date: '2026-01-14', role: 'accountant', title: '支付水电费', tags: ["费用"], difficulty: 1, tip: '水电费计入管理费用。', description: '支付1月电费2,500元、水费800元，合计3,300元。', entries: [{ subjectCode: '6602', summary: '支付水电费', debit: 3300, credit: 0, explanation: '管理费用增加。办公室水电费作为企业管理支出计入当期损益。' }, { subjectCode: '100201', summary: '支付水电费', debit: 0, credit: 3300, explanation: '银行存款减少。缴纳水电费，出纳需保留缴费回单。' }], documents: [{ type: 'receipt', label: '电费单', docTitle: '电 费 缴 费 凭 证', date: '2026-01-14', totalAmount: 2500, payer: '本公司', stampText: '国家电网\n电费收讫章', items: [{ name: '有功电量 2,500kWh×1.00元', qty: 2500, price: 1, amount: 2500 }]}, { type: 'receipt', label: '水费单', docTitle: '水 费 缴 费 凭 证', date: '2026-01-14', totalAmount: 800, payer: '本公司', stampText: '自来水公司\n水费收讫章', items: [{ name: '用水量 200吨×4.00元', qty: 200, price: 4, amount: 800 }]}]},
    { date: '2026-01-15', role: 'accountant', title: '制造费用归集', tags: ["生产"], difficulty: 2, tip: '制造费用归集车间发生的间接成本。', description: '归集制造费用：折旧2,000元、车间水电3,500元，合计5,500元。', entries: [{ subjectCode: '5101', summary: '归集车间折旧费', debit: 2000, credit: 0, explanation: '制造费用增加。生产用机器设备折旧先归集到制造费用。' }, { subjectCode: '5101', summary: '归集车间水电费', debit: 3500, credit: 0, explanation: '制造费用增加。车间生产用水电费先归集到制造费用。' }, { subjectCode: '1602', summary: '计提设备折旧', debit: 0, credit: 2000, explanation: '累计折旧增加。机器设备因使用损耗价值减少。' }, { subjectCode: '100201', summary: '支付车间水电费', debit: 0, credit: 3500, explanation: '银行存款减少。支付车间水电费。' }], documents: [{ type: 'text', label: '制造费用计算表', docTitle: '制 造 费 用 归 集 表', date: '2026-01-15', stampText: '财务专用章', content: '制造费用归集\n期间：2026年1月\n\n费用项目明细：\n1. 折旧费——机器设备\n   原值：600,000元\n   月折旧额：2,000元\n   折旧方法：平均年限法\n\n2. 车间水电费\n   电费分摊：2,500元\n   水费分摊：1,000元\n   小计：3,500元\n\n归集总额：5,500元\n\n制表：李会计\n审核：赵会计主管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年1月'
      ],
      [
        '原值',
        '600,000元'
      ],
      [
        '月折旧额',
        '2,000元'
      ],
      [
        '折旧方法',
        '平均年限法'
      ],
      [
        '电费分摊',
        '2,500元'
      ],
      [
        '水费分摊',
        '1,000元'
      ],
      [
        '小计',
        '3,500元'
      ],
      [
        '归集总额',
        '5,500元'
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
    { date: '2026-01-16', role: 'accountant', title: '制造费用分配', tags: ["生产"], difficulty: 3, tip: '制造费用分配是制造业独有的核算步骤。', description: '将归集的制造费用11,500元全部分配转入生产成本。', entries: [{ subjectCode: '500103', summary: '分配制造费用', debit: 11500, credit: 0, explanation: '生产成本-制造费用增加。制造费用分配转入产品成本。' }, { subjectCode: '5101', summary: '分配制造费用', debit: 0, credit: 11500, explanation: '制造费用减少归零。全部成本已分配至产品。' }], documents: [{ type: 'text', label: '制造费用分配表', docTitle: '制 造 费 用 分 配 表', date: '2026-01-16', stampText: '财务专用章', content: '制造费用分配\n期间：2026年1月\n\n待分配制造费用总额：11,500元\n（辅助材料6,000+折旧2,000+水电3,500）\n\n分配标准：生产工时\n总工时：2,500小时\n\n分配率计算：\n  11,500 ÷ 2,500 = 4.60元/小时\n\n分配金额：\n  生产成本-制造费用：11,500.00元\n\n分配后制造费用余额：0元 ✓\n\n制表：李会计\n审核：赵会计主管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年1月'
      ],
      [
        '待分配制造费用总额',
        '11,500元'
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
        '生产成本-制造费用',
        '11,500.00元'
      ],
      [
        '分配后制造费用余额',
        '0元 ✓'
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
    { date: '2026-01-17', role: 'accountant', title: '完工产品入库', tags: ["生产"], difficulty: 3, tip: '完工入库：借库存商品，贷生产成本。', description: '本月A产品100台全部完工，生产成本合计116,500元。', entries: [{ subjectCode: '1405', summary: 'A产品完工入库', debit: 116500, credit: 0, explanation: '库存商品增加。100台完工，总成本116,500元，单位成本1,165元。' }, { subjectCode: '500101', summary: '结转直接材料', debit: 0, credit: 75000, explanation: '生产成本-直接材料转出。' }, { subjectCode: '500102', summary: '结转直接人工', debit: 0, credit: 30000, explanation: '生产成本-直接人工转出。' }, { subjectCode: '500103', summary: '结转制造费用', debit: 0, credit: 11500, explanation: '生产成本-制造费用转出。' }], documents: [{ type: 'text', label: '入库单', docTitle: '产 品 入 库 单', date: '2026-01-17', stampText: '仓库\n验收专用章', content: '入库部门：生产车间   入库单号：RK20260117001\n\n产品名称：A产品\n规格型号：标准型\n\n完工数量：100台\n\n成本构成：\n  直接材料：75,000.00元\n  直接人工：30,000.00元\n  制造费用：11,500.00元\n━━━━━━━━━━━━━━━━━━━━━\n  总成本：116,500.00元\n  单位成本：1,165.00元/台\n\n质检结论：合格 ✓\n\n仓库验收：刘保管\n质量检验：陈检验\n成本会计：李会计',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '入库部门',
        '生产车间   入库单号：RK20260117001'
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
        '30,000.00元'
      ],
      [
        '制造费用',
        '11,500.00元'
      ],
      [
        '总成本',
        '116,500.00元'
      ],
      [
        '单位成本',
        '1,165.00元/台'
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
      [
        '成本会计',
        '李会计'
      ],
    ] }]},
    { date: '2026-01-18', role: 'accountant', title: '现销商品', tags: ["销售"], difficulty: 2, tip: '现销：借银行存款，贷主营业务收入、应交税费。', description: '向乙公司销售A产品50台，价款100,000元，增值税13,000元。', entries: [{ subjectCode: '100201', summary: '销售A产品50台-乙公司', debit: 113000, credit: 0, explanation: '银行存款增加。价税合计113,000元全部收到。' }, { subjectCode: '6001', summary: '销售A产品50台', debit: 0, credit: 100000, explanation: '主营业务收入增加。按不含税价款100,000元入账。' }, { subjectCode: '222101', summary: '销项税额（13%）', debit: 0, credit: 13000, explanation: '应交增值税增加。100,000×13%=13,000元。' }], documents: [{ type: 'invoice', label: '增值税专用发票', region: '广东', invoiceType: '专用', copy: '发票联', invoiceNo: '4400201234', date: '2026年01月18日', buyer: '乙公司', buyerTaxId: '91440101MA5XXXXXXXX', seller: '本公司', sellerTaxId: '91440101MA3XXXXXXXX', stampText: '发票专用章', payee: '李四', reviewer: '王五', drawer: '赵六', lineItems: [{ name: 'A产品', unit: '台', qty: 50, price: 2000, amount: 100000, taxRate: '13%', tax: 13000 }], totalAmount: 113000 }, { type: 'bank', label: '收款回单', date: '2026-01-18', totalAmount: 113000, payer: '乙公司', payerAccount: '6222 0100 **** 6666', payeeName: '本公司', payeeAccount: '6222 0200 **** 1234', content: '购买A产品货款及增值税', refNo: 'HD202601180035' }]},
    { date: '2026-01-19', role: 'accountant', title: '赊销商品', tags: ["销售"], difficulty: 2, tip: '赊销：借应收账款，贷主营业务收入、应交税费。', description: '向丁公司赊销A产品60台，价款60,000元，增值税7,800元。', entries: [{ subjectCode: '112202', summary: '赊销A产品30台-丁公司', debit: 67800, credit: 0, explanation: '应收账款增加。丁公司尚未付款，含价款60,000元和增值税7,800元。' }, { subjectCode: '6001', summary: '赊销A产品30台', debit: 0, credit: 60000, explanation: '主营业务收入增加。赊销确认收入60,000元。' }, { subjectCode: '222101', summary: '销项税额（13%）', debit: 0, credit: 7800, explanation: '应交增值税增加。60,000×13%=7,800元。' }], documents: [{ type: 'invoice', label: '增值税专用发票', region: '广东', invoiceType: '专用', copy: '发票联', invoiceNo: '4400205678', date: '2026年01月19日', buyer: '丁公司', buyerTaxId: '91440101MA8YYYYYYY', seller: '本公司', sellerTaxId: '91440101MA3XXXXXXXX', stampText: '发票专用章', payee: '李四', reviewer: '王五', drawer: '赵六', lineItems: [{ name: 'A产品', unit: '台', qty: 60, price: 2000, amount: 120000, taxRate: '13%', tax: 15600 }], totalAmount: 135600 }]},
    { date: '2026-01-20', role: 'accountant', title: '银行利息', tags: ["资金"], difficulty: 1, tip: '利息收入冲减财务费用。', description: '收到工商银行1月份存款利息8,500元。', entries: [{ subjectCode: '100201', summary: '1月存款利息', debit: 8500, credit: 0, explanation: '银行存款增加。存款利息由银行自动入账。' }, { subjectCode: '6603', summary: '冲减财务费用', debit: 0, credit: 8500, explanation: '财务费用减少。利息收入冲减费用。' }], documents: [{ type: 'bank', label: '利息入账回单', date: '2026-01-20', totalAmount: 8500, payer: '中国工商银行', payeeName: '本公司', content: '2026年1月存款利息收入', refNo: 'HD202601200050' }]},
    { date: '2026-01-21', role: 'accountant', title: '结转销售成本', tags: ["生产","成本"], difficulty: 3, tip: '先进先出法，收入费用配比原则。', description: '结转本月已销售A产品80台的销售成本，单位成本1,165元。', entries: [{ subjectCode: '6401', summary: '结转A产品销售成本', debit: 93200, credit: 0, explanation: '主营业务成本增加。80台×1,165=93,200元，成本与收入配比。' }, { subjectCode: '1405', summary: '结转A产品销售成本', debit: 0, credit: 93200, explanation: '库存商品减少。已售产品成本转出，剩余20台×1,165=23,300元。' }], documents: [{ type: 'text', label: '成本计算表', docTitle: '销 售 成 本 计 算 表', date: '2026-01-21', stampText: '财务专用章', content: '销售成本计算（先进先出法）\n期间：2026年1月\n\n本月销售数量：80台\n\n单位成本：\n  1月批次：1,165.00元/台\n\n本期结转：\n  80台 × 1,165.00 = 93,200.00元\n\n库存结余：\n  20台 × 1,165.00 = 23,300.00元\n\n制表：李会计\n审核：赵会计主管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年1月'
      ],
      [
        '本月销售数量',
        '80台'
      ],
      [
        '1月批次',
        '1,165.00元/台'
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
    { date: '2026-01-22', role: 'accountant', title: '银行账户划转', tags: ["资金"], difficulty: 1, tip: '内部银行账户间的资金调拨。', description: '从工商银行划转30,000元至建设银行。', entries: [{ subjectCode: '100202', summary: '工行转建行-建行增加', debit: 30000, credit: 0, explanation: '银行存款-建设银行增加。资金从工行转入建行。' }, { subjectCode: '100201', summary: '工行转建行-工行减少', debit: 0, credit: 30000, explanation: '银行存款-工商银行减少。资金从工行划出，出纳需在两本日记账中登记。' }], documents: [{ type: 'bank', label: '网银转账回单', date: '2026-01-22', totalAmount: 30000, payer: '本公司（工商银行）', payerAccount: '6222 0200 **** 1234', payeeName: '本公司（建设银行）', payeeAccount: '6222 0200 **** 5678', content: '资金调拨——工行转建行', refNo: 'HD202601220045' }]},
    { date: '2026-01-23', role: 'accountant', title: '购买办公电脑', tags: ["资产"], difficulty: 1, tip: '通过固定资产模块操作。', description: '前往固定资产模块新增电脑资产卡片，系统自动生成凭证。', entries: [], nextAction: 'fixed-assets', documents: [{ type: 'text', label: '操作指引', docTitle: '操 作 说 明', stampText: '财务专用章', content: '请前往「固定资产」模块操作：\n1. 点击「新增资产」按钮\n2. 填写资产信息：\n   名称：联想台式电脑\n   类别：办公设备\n   原值：4,500.00元\n   残值：0元\n   使用月数：36个月\n3. 点击「保存」\n4. 系统将自动生成购买凭证\n\n注意事项：\n- 次月开始计提折旧\n- 折旧年限36个月（3年）' }]},
    { date: '2026-01-24', role: 'accountant', title: '计提工资', tags: ["工资"], difficulty: 1, tip: '通过工资模块操作。', description: '前往工资管理模块计提1月工资。', entries: [], nextAction: 'payroll', documents: [{ type: 'text', label: '操作指引', docTitle: '操 作 说 明', stampText: '财务专用章', content: '请前往「工资管理」模块操作：\n1. 点击「计算汇总」查看本月工资总额\n2. 点击「生成计提工资凭证」\n3. 系统将自动生成计提凭证\n\n预设员工：6人\n行政部25,000元\n销售部35,000元\n生产部30,000元\n应发合计：90,000元' }]},
    { date: '2026-01-25', role: 'accountant', title: '计提附加税', tags: ["税费"], difficulty: 2, tip: '城建税和教育费附加以应纳增值税为基数。', description: '计提城建税（20,800×7%=1,456）和教育费附加（20,800×3%=624）。', entries: [{ subjectCode: '6403', summary: '计提城建税（7%）', debit: 1456, credit: 0, explanation: '税金及附加增加。城建税=20,800×7%=1,456元。' }, { subjectCode: '222103', summary: '计提城建税', debit: 0, credit: 1456, explanation: '应交城建税增加。计提形成负债。' }, { subjectCode: '6403', summary: '计提教育费附加（3%）', debit: 624, credit: 0, explanation: '税金及附加增加。教育费附加=20,800×3%=624元。' }, { subjectCode: '222104', summary: '计提教育费附加', debit: 0, credit: 624, explanation: '应交教育费附加增加。计提形成负债。' }], documents: [{ type: 'text', label: '税费计算表', docTitle: '税 费 计 提 计 算 表', date: '2026-01-25', stampText: '财务专用章', content: '税费计提计算\n期间：2026年1月\n\n计税依据：\n  增值税销项税额：20,800.00元\n\n一、城市维护建设税（7%）\n  20,800.00 × 7% = 1,456.00元\n\n二、教育费附加（3%）\n  20,800.00 × 3% = 624.00元\n\n合计计提：2,080.00元\n\n政策依据：\n《城市维护建设税法》\n《征收教育费附加的暂行规定》\n\n制表：李会计\n审核：赵会计主管',
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '期间',
        '2026年1月'
      ],
      [
        '增值税销项税额',
        '20,800.00元'
      ],
      [
        '合计计提',
        '2,080.00元'
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
    { date: '2026-01-26', role: 'accountant', title: '计提折旧', tags: ["资产"], difficulty: 1, tip: '通过固定资产模块操作。', description: '前往固定资产模块计提本月折旧。', entries: [], nextAction: 'fixed-assets', documents: [{ type: 'text', label: '操作指引', docTitle: '操 作 说 明', stampText: '财务专用章', content: '请前往「固定资产」模块：\n1. 点击「计提本月折旧」按钮\n2. 确认折旧金额\n3. 系统自动生成折旧凭证\n\n注意：折旧需在资产购买次月开始计提。' }]},
    { date: '2026-01-27', role: 'accountant', title: '银行手续费', tags: ["资金"], difficulty: 1, tip: '银行手续费计入财务费用。', description: '本月银行账户管理费及转账手续费200元。', entries: [{ subjectCode: '6603', summary: '银行手续费', debit: 200, credit: 0, explanation: '财务费用增加。银行手续费是企业的融资成本之一。' }, { subjectCode: '100201', summary: '银行手续费', debit: 0, credit: 200, explanation: '银行存款减少。银行自动扣收手续费。' }], documents: [{ type: 'bank', label: '银行扣费回单', date: '2026-01-27', totalAmount: 200, payer: '本公司', payeeName: '中国工商银行', content: '账户管理费及转账手续费', refNo: 'HD202601270080' }]},
    { date: '2026-01-28', role: 'accountant', title: '现金折扣', tags: ["销售"], difficulty: 3, tip: '现金折扣计入财务费用，不冲减收入。', description: '客户提前付款享受2%现金折扣，实际收款33,300元。', entries: [{ subjectCode: '100201', summary: '收到庚公司货款（含现金折扣）', debit: 33300, credit: 0, explanation: '银行存款增加。实际收款33,300元（33,900-600）。' }, { subjectCode: '6603', summary: '庚公司享受现金折扣', debit: 600, credit: 0, explanation: '财务费用增加。现金折扣=30,000×2%=600元。' }, { subjectCode: '112202', summary: '收回庚公司欠款', debit: 0, credit: 33900, explanation: '应收账款减少。全额冲减33,900元。' }], documents: [{ type: 'bank', label: '收款回单', date: '2026-01-28', totalAmount: 33300, payer: '庚公司', payeeName: '本公司', content: '货款（含现金折扣）', refNo: 'HD202601280090' }, { type: 'text', label: '现金折扣计算', docTitle: '现 金 折 扣 计 算 说 明', date: '2026-01-28', stampText: '财务专用章', content: '销售合同条款：2/10, n/30\n（10天内付款享受2%折扣，30天内全额）\n\n应收账款余额：33,900.00元\n  价款：30,000.00元\n  增值税：3,900.00元（13%）\n\n折扣计算：\n  折扣基数：货款30,000.00元\n  折扣率：2%\n  折扣金额：600.00元\n\n实际收款：33,900 - 600 = 33,300.00元\n\n会计分录：\n  借：银行存款      33,300\n      财务费用         600\n    贷：应收账款      33,900',
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
    { date: '2026-01-29', role: 'accountant', title: '缴纳社保公积金', tags: ["工资"], difficulty: 2, tip: '缴纳社保公积金冲减应付职工薪酬。', description: '缴纳社保单位部分18,000元、公积金单位部分9,000元。', entries: [{ subjectCode: '221102', summary: '缴纳上月社保单位部分', debit: 18000, credit: 0, explanation: '应付职工薪酬-社保减少。缴纳社保单位部分，冲减原计提负债。' }, { subjectCode: '221103', summary: '缴纳上月公积金单位部分', debit: 9000, credit: 0, explanation: '应付职工薪酬-公积金减少。缴纳公积金单位部分，冲减原计提负债。' }, { subjectCode: '100201', summary: '缴纳社保公积金', debit: 0, credit: 27000, explanation: '银行存款减少。社保18,000+公积金9,000=27,000元。' }], documents: [{ type: 'bank', label: '社保扣款回单', date: '2026-01-29', totalAmount: 18000, payer: '本公司', payeeName: 'XX市社会保险基金管理局', content: '缴纳1月社保费（单位部分）', refNo: 'HD202601290070' }, { type: 'bank', label: '公积金扣款回单', date: '2026-01-29', totalAmount: 9000, payer: '本公司', payeeName: 'XX市住房公积金管理中心', content: '缴纳1月公积金（单位部分）', refNo: 'HD202601290071' }]},
    { date: '2026-01-30', role: 'accountant', title: '月末期间损益结转', tags: ["期末"], difficulty: 3, tip: '收入类从借方转出，费用类从贷方转出。', description: '月末将各损益类科目余额结转至本年利润。', entries: [
      { subjectCode: '6001', summary: '结转主营业务收入', debit: 160000, credit: 0, explanation: '主营业务收入转出。收入平时在贷方，月末从借方转出，余额归零。' },
      { subjectCode: '6401', summary: '结转主营业务成本', debit: 0, credit: 93200, explanation: '主营业务成本转出。已售产品成本从贷方转出至本年利润。' },
      { subjectCode: '6403', summary: '结转税金及附加', debit: 0, credit: 2080, explanation: '税金及附加转出。月末余额归零。' },
      { subjectCode: '660101', summary: '结转销售费用-广告费', debit: 0, credit: 6000, explanation: '销售费用-广告费转出。月末余额归零。' },
      { subjectCode: '6602', summary: '结转管理费用', debit: 0, credit: 15500, explanation: '管理费用转出。含办公费1,700+差旅费3,000+房租8,000+水电3,300+通讯1,200=17,200。' },
      { subjectCode: '6603', summary: '结转财务费用（利息净收入）', debit: 7700, credit: 0, explanation: '财务费用转出。本月利息收入8,500元大于手续费200元+折扣600元=800元，净收入7,700元。' },
      { subjectCode: '4103', summary: '结转本年利润（净利润）', debit: 0, credit: 50920, explanation: '净利润=160,000-93,200-2,080-6,000-15,500+7,700=50,920元。' }], documents: [{ type: 'text', label: '结转计算表', docTitle: '期 间 损 益 结 转 表', date: '2026-01-30', stampText: '已结转', content: '期间损益结转\n会计期间：2026年1月\n\n【收入类】→ 本年利润（贷方）\n  主营业务收入（6001）贷方余额：160,000\n  财务费用-利息收入冲减：7,700\n\n【费用类】→ 本年利润（借方）\n  主营业务成本（6401）：93,200\n  税金及附加（6403）：2,080\n  销售费用-广告费（660101）：6,000\n  管理费用（6602）：15,500\n\n本年利润：\n  收入160,000 + 财务收入7,700 - 费用93,200 - 税金2,080 - 销售费6,000 - 管理费15,500\n  = 净利润50,920元（贷方余额）\n\n结转后各损益类科目余额为零 ✓\n\n制表：李会计\n审核：赵会计主管',
      headers: [
        '项目',
        '内容'
      ],
      rows: [
        [
          '会计期间',
          '2026年1月'
        ],
        [
          '主营业务收入（6001）贷方余额',
          '160,000'
        ],
        [
          '财务费用-利息收入冲减',
          '7,700'
        ],
        [
          '主营业务成本（6401）',
          '93,200'
        ],
        [
          '税金及附加（6403）',
          '2,080'
        ],
        [
          '销售费用-广告费（660101）',
          '6,000'
        ],
        [
          '管理费用（6602）',
          '15,500'
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
    { date: '2026-01-31', role: 'accountant', title: '模拟纳税申报', tags: ["期末","申报"], difficulty: 1, tip: '每月纳税申报是法定义务。', description: '完成账务处理后进行模拟纳税申报。', entries: [], nextAction: 'tax-filing', documents: [{ type: 'text', label: '申报提醒', docTitle: '1 月 纳 税 申 报 提 醒', stampText: '财务专用章', content: '申报期间：2026年1月\n截止日期：2026年2月15日\n\n请前往纳税申报页面：\n1. 核对增值税申报表数据\n2. 核对企业所得税申报表数据\n3. 确认无误后点击「提交申报」\n\n应缴税费预估：\n  增值税：20,800元\n  城建税：1,456元\n  教育费附加：624元' }]},
  ],
  '02': feb,
  '03': mar,
  '04': apr,
  '05': may,
  '06': jun,
  '07': jul,
  '08': aug,
  '09': sep,
  '10': oct,
  '11': nov,
  '12': dec}

export function getTutorials(month) { return tutorials[month] || [] }
export function compareAnswers(us, cs) {
  const r = []
  if (us.length !== cs.length) r.push({ type: 'warning', message: `分录条数不一致：你录了 ${us.length} 条，正确答案 ${cs.length} 条` })
  const n = Math.min(us.length, cs.length)
  for (let i = 0; i < n; i++) {
    const u = us[i], c = cs[i]
    const ok = u.subjectCode === c.subjectCode && Math.abs(Number(u.debit) - Number(c.debit)) < 0.01 && Math.abs(Number(u.credit) - Number(c.credit)) < 0.01
    if (ok) r.push({ type: 'success', message: `第${i+1}条 ✔` })
    else { const d = []; if (u.subjectCode !== c.subjectCode) d.push(`科目应为"${c.subjectCode}"`); if (Math.abs(Number(u.debit) - Number(c.debit)) >= 0.01) d.push(`借方应为 ${c.debit}`); if (Math.abs(Number(u.credit) - Number(c.credit)) >= 0.01) d.push(`贷方应为 ${c.credit}`); r.push({ type: 'error', message: `第${i+1}条 ✘ ${d.join('，')}` }) }
  }
  if (r.every(x => x.type === 'success')) r.push({ type: 'success', message: '🎉 全部正确！' })
  return r
}
export default tutorials
