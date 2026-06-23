/**
 * 服务业 6月 - 📈 半年结·项目交付
 * F项目中期、E年框、H1半年财务报表、借款到期还本付息
 */

const jun = [
  { date: '2026-06-02', role: 'accountant', title: '发放5月员工工资', tags: ["工资社保"], difficulty: 1,
    entries: [{ subjectCode: '221101', summary: '发5月工资', debit: 201000, credit: 0 }, { subjectCode: '100201', summary: '实发', debit: 0, credit: 166000 }, { subjectCode: '224101', summary: '代扣社保', debit: 0, credit: 20000 }, { subjectCode: '224102', summary: '代扣公积金', debit: 0, credit: 10000 }, { subjectCode: '222110', summary: '代扣个税', debit: 0, credit: 5000 }],
    documents: [
      { type: 'bank', label: '代发工资回单', date: '2026-06-02', totalAmount: 166000, payer: '雲帆管理咨询有限公司', payeeName: '员工代发户', content: '5月工资代发（共50人）', refNo: 'HD202606020001' },
      { type: 'text', label: '工资表', docTitle: '5 月 工 资 发 放 表', date: '2026-06-02', stampText: '人力资源部\n工资专用章', content: '期间：2026年5月\n应发工资总额：201,000.00元\n扣款：社保20,000+公积金10,000+个税5,000=35,000元\n实发合计：166,000.00元（银行代发）\n\n制表：王出纳\n审核：李会计' ,
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
          '应发工资总额',
          '201,000.00元'
        ],
        [
          '扣款',
          '社保20,000+公积金10,000+个税5,000=35,000元'
        ],
        [
          '实发合计',
          '166,000.00元（银行代发）'
        ],
        [
          '制表',
          '王出纳'
        ],
        [
          '审核',
          '李会计'
        ],
      ]}] },
  { date: '2026-06-03', role: 'accountant', title: '缴纳5月社保公积金', tags: ["工资社保"], difficulty: 1,
    entries: [{ subjectCode: '221102', summary: '企业社保', debit: 40500, credit: 0 }, { subjectCode: '224101', summary: '个人社保', debit: 20000, credit: 0 }, { subjectCode: '221102', summary: '企业公积金', debit: 20500, credit: 0 }, { subjectCode: '224102', summary: '个人公积金', debit: 10000, credit: 0 }, { subjectCode: '100201', summary: '支付', debit: 0, credit: 91000 }],
    documents: [
      { type: 'bank', label: '扣款回单', date: '2026-06-03', totalAmount: 91000, payer: '雲帆管理咨询有限公司', payeeName: '北京市社会保险基金管理中心', content: '5月社保+公积金缴纳', refNo: 'HD202606030002' }] },
  { date: '2026-06-04', role: 'accountant', title: '缴纳5月增值税及附加税', tags: ["税费"], difficulty: 1,
    entries: [{ subjectCode: '222101', summary: '增值税', debit: 14400, credit: 0 }, { subjectCode: '222103', summary: '城建税', debit: 1008, credit: 0 }, { subjectCode: '222104', summary: '附加', debit: 720, credit: 0 }, { subjectCode: '100201', summary: '缴税', debit: 0, credit: 16128 }],
    documents: [
      { type: 'bank', label: '缴税回单', date: '2026-06-04', totalAmount: 16128, payer: '雲帆管理咨询有限公司', payeeName: '国家税务总局北京市税务局', content: '5月增值税及附加税缴纳', refNo: 'HD202606040003' }] },
  { date: '2026-06-05', role: 'accountant', title: '短期借款到期还本付息', tags: ["资金管理"], difficulty: 2,
    tip: '借款到期一次性还本付息。本金200,000元+利息200,000×4.35%÷12×6=4,350元。合计204,350元。',
    description: '1月5日借入的短期借款200,000元到期，一次性还本付息。利息=200,000×4.35%÷12×6=4,350元（含1-6月已计提2,900元+本月应计1,450元）。合计204,350元。',
    entries: [
      { subjectCode: '2001', summary: '归还借款本金', debit: 200000, credit: 0, explanation: '短期借款减少。' },
      { subjectCode: '2231', summary: '支付已计提利息', debit: 2900, credit: 0, explanation: '冲减应付利息1-5月累计。' },
      { subjectCode: '6603', summary: '6月利息', debit: 1450, credit: 0, explanation: '财务费用增加。6月当月利息=200,000×4.35%÷12。' },
      { subjectCode: '100201', summary: '还本付息', debit: 0, credit: 204350 }],
    documents: [
      { type: 'bank', label: '还款回单', date: '2026-06-05', totalAmount: 204350, payer: '雲帆管理咨询有限公司', payeeName: '中国工商银行北京分行', content: '短期借款到期还本付息（本金200,000+利息4,350）', refNo: 'HD202606050002' },
      { type: 'text', label: '还款计算表', docTitle: '借 款 还 本 付 息 计 算 表', date: '2026-06-05', stampText: '财务专用章', content: '借款合同：工商银行短期流动资金贷款\n借款本金：200,000.00元\n年利率：4.35%\n期限：2026.1.5-2026.7.4（实际6个月）\n\n利息计算：200,000×4.35%÷12×6=4,350.00元\n已计提1-5月：2,900.00元\n本月利息：1,450.00元\n\n合计还本付息：204,350.00元' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '借款合同',
          '工商银行短期流动资金贷款'
        ],
        [
          '借款本金',
          '200,000.00元'
        ],
        [
          '年利率',
          '4.35%'
        ],
        [
          '期限',
          '2026.1.5-2026.7.4（实际6个月）'
        ],
        [
          '利息计算',
          '200,000×4.35%÷12×6=4,350.00元'
        ],
        [
          '已计提1-5月',
          '2,900.00元'
        ],
        [
          '本月利息',
          '1,450.00元'
        ],
        [
          '合计还本付息',
          '204,350.00元'
        ],
      ]}] },
  { date: '2026-06-06', role: 'accountant', title: '支付6月写字楼租金', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '660205', summary: '房租', debit: 22000, credit: 0 }, { subjectCode: '660205', summary: '物业费', debit: 3000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 25000 }],
    documents: [
      { type: 'receipt', label: '房屋租赁收据', docTitle: '房 屋 租 赁 专 用 收 据', date: '2026-06-06', totalAmount: 25000, payer: '雲帆管理咨询有限公司', stampText: '北京XX物业管理有限公司\n财务专用章', items: [{ name: '望京XX大厦15层 6月租金', qty: 1, price: 22000, amount: 22000 }, { name: '6月物业管理费', qty: 1, price: 3000, amount: 3000 }]}] },
  { date: '2026-06-08', role: 'accountant', title: '缴纳代扣个税', tags: ["税费"], difficulty: 1,
    entries: [{ subjectCode: '222110', summary: '个税', debit: 5000, credit: 0 }, { subjectCode: '100201', summary: '缴税', debit: 0, credit: 5000 }],
    documents: [
      { type: 'bank', label: '缴税回单', date: '2026-06-08', totalAmount: 5000, payer: '雲帆管理咨询有限公司', payeeName: '国家税务总局北京市税务局', content: '5月代扣代缴个人所得税', refNo: 'HD202606080004' }] },
  { date: '2026-06-09', role: 'accountant', title: 'F项目中期交付·确认第二阶段收入', tags: ["项目核算"], difficulty: 2,
    description: 'F项目完成数字化战略规划，确认收入120,000元（合同350,000×约34.3%）。增值税6%=7,200元。',
    entries: [{ subjectCode: '2232', summary: 'F公司预收款转收入', debit: 77200, credit: 0, explanation: '预收款余额冲减（140,000已转106,000=34,000）。' }, { subjectCode: '1122', summary: 'F公司中期款', debit: 50000, credit: 0, explanation: '差额挂应收。' }, { subjectCode: '6001', summary: 'F项目第二阶段', debit: 0, credit: 120000 }, { subjectCode: '222101', summary: '销项税额', debit: 0, credit: 7200 }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '北京', invoiceType: '专用', copy: '发票联', invoiceNo: '1100432122', date: '2026年06月09日', buyer: 'F新零售有限公司', buyerTaxId: '91110108MAYYYYYYY', seller: '雲帆管理咨询有限公司', sellerTaxId: '91110108MA3XXXXXXXX', stampText: '发票专用章', payee: '李四', reviewer: '王五', drawer: '赵六', lineItems: [{ name: '数字化转型咨询（战略规划阶段）', unit: '项', qty: 1, price: 120000, amount: 120000, taxRate: '6%', tax: 7200 }], totalAmount: 127200 },
      { type: 'text', label: '阶段验收', docTitle: '中 期 验 收 确 认 书', date: '2026-06-09', stampText: 'F新零售有限公司\n项目专用章', content: '项目：数字化转型咨询\n阶段：战略规划阶段（中期）\n结论：通过 ✓\n交付物：数字化战略规划方案、ERP选型方案\n\n甲方代表：刘总\n乙方代表：王顾问' ,
      headers: [
        '项目',
        '内容'
      ],
      rows: [
        [
          '项目',
          '数字化转型咨询'
        ],
        [
          '阶段',
          '战略规划阶段（中期）'
        ],
        [
          '结论',
          '通过 ✓'
        ],
        [
          '交付物',
          '数字化战略规划方案、ERP选型方案'
        ],
        [
          '甲方代表',
          '刘总'
        ],
        [
          '乙方代表',
          '王顾问'
        ],
      ]}] },
  { date: '2026-06-10', role: 'accountant', title: '确认E公司年框6月收入', tags: ["项目核算"], difficulty: 2, description: '确认E公司年框6月收入。金额合计21,200元。',
    entries: [{ subjectCode: '2232', summary: 'E公司6月', debit: 21200, credit: 0 }, { subjectCode: '6001', summary: '年框6月收入', debit: 0, credit: 20000 }, { subjectCode: '222101', summary: '销项税额', debit: 0, credit: 1200 }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '北京', invoiceType: '专用', copy: '发票联', invoiceNo: '1100432123', date: '2026年06月10日', buyer: 'E集团公司', buyerTaxId: '91110108MAZZZZZZZ', seller: '雲帆管理咨询有限公司', sellerTaxId: '91110108MA3XXXXXXXX', stampText: '发票专用章', payee: '李四', reviewer: '王五', drawer: '赵六', lineItems: [{ name: '年度管理咨询服务（6月）', unit: '月', qty: 1, price: 20000, amount: 20000, taxRate: '6%', tax: 1200 }], totalAmount: 21200 }] },
  { date: '2026-06-11', role: 'accountant', title: '收到F公司中期款', tags: ["往来管理"], difficulty: 1,
    entries: [{ subjectCode: '100201', summary: 'F公司中期款', debit: 50000, credit: 0 }, { subjectCode: '1122', summary: 'F公司', debit: 0, credit: 50000 }],
    documents: [
      { type: 'bank', label: '收款回单', date: '2026-06-11', totalAmount: 50000, payer: 'F新零售有限公司', payerAccount: '6222 0100 **** 5555', payeeName: '雲帆管理咨询有限公司', payeeAccount: '6222 0200 **** 1234', content: '数字化转型项目中期款', refNo: 'HD202606110005' }] },
  { date: '2026-06-12', role: 'accountant', title: 'F项目·ERP选型差旅', tags: ["项目核算"], difficulty: 2, description: 'F项目ERP选型差旅费用13,000元。',
    entries: [{ subjectCode: '520102', summary: 'F项目差旅', debit: 13000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 13000 }],
    documents: [
      { type: 'receipt', label: '差旅报销单', docTitle: '差 旅 费 报 销 单', date: '2026-06-12', totalAmount: 13000, payer: '雲帆管理咨询有限公司', stampText: '财务\n审核专用章', items: [{ name: '深圳ERP选型 高铁3人×2程', qty: 6, price: 600, amount: 3600 }, { name: '住宿 3人×5晚×400元', qty: 15, price: 400, amount: 6000 }, { name: '市内交通及补贴', qty: 1, price: 3400, amount: 3400 }]}] },
  { date: '2026-06-13', role: 'accountant', title: '支付大数据外包尾款', tags: ["项目核算"], difficulty: 2, description: '支付F项目大数据外包尾款17,500元。',
    entries: [{ subjectCode: '520103', summary: '大数据外包尾款', debit: 17500, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 17500 }],
    documents: [
      { type: 'bank', label: '转账回单', date: '2026-06-13', totalAmount: 17500, payer: '雲帆管理咨询有限公司', payeeName: 'XX数据科技有限公司', content: '大数据分析外包尾款（验收后付）', refNo: 'HD202606130006' },
      { type: 'text', label: '外包验收单', docTitle: '数 据 分 析 外 包 验 收 单', date: '2026-06-13', stampText: '雲帆管理咨询有限公司\n项目专用章', content: '分包方：XX数据科技有限公司\n服务内容：F项目大数据分析（已完成）\n金额：35,000元\n已付首款：17,500元（5月13日）\n本次尾款：17,500元\n验收结论：通过 ✓' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '分包方',
          'XX数据科技有限公司'
        ],
        [
          '服务内容',
          'F项目大数据分析（已完成）'
        ],
        [
          '金额',
          '35,000元'
        ],
        [
          '已付首款',
          '17,500元（5月13日）'
        ],
        [
          '本次尾款',
          '17,500元'
        ],
        [
          '验收结论',
          '通过 ✓'
        ],
      ]}] },
  { date: '2026-06-14', role: 'accountant', title: '支付6月水电及网络费', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '6602', summary: '水电费', debit: 5000, credit: 0 }, { subjectCode: '6602', summary: '网络费', debit: 2000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 7000 }],
    documents: [
      { type: 'receipt', label: '电费凭证', docTitle: '电 费 缴 费 凭 证', date: '2026-06-14', totalAmount: 5000, payer: '雲帆管理咨询有限公司', stampText: '国家电网\n电费收讫章', items: [{ name: '写字楼用电 5,000kWh×1.00元', qty: 5000, price: 1, amount: 5000 }]},
      { type: 'receipt', label: '通信费发票', docTitle: '通 信 服 务 发 票', date: '2026-06-14', totalAmount: 2000, payer: '雲帆管理咨询有限公司', stampText: '中国联通\n发票专用章', items: [{ name: '企业宽带（6月）', qty: 1, price: 2000, amount: 2000 }]}] },
  { date: '2026-06-15', role: 'accountant', title: '摊销SaaS费及计提折旧', tags: ["费用管理"], difficulty: 2, description: '摊销SaaS服务费3,000元及计提固定资产折旧2,620元。',
    entries: [{ subjectCode: '6602', summary: '摊销', debit: 3000, credit: 0 }, { subjectCode: '6602', summary: '折旧', debit: 2462, credit: 0 }, { subjectCode: '1208', summary: '摊销', debit: 0, credit: 3000 }, { subjectCode: '1602', summary: '折旧', debit: 0, credit: 2462 }],
    documents: [
      { type: 'text', label: '摊销折旧表', docTitle: '摊 销 折 旧 计 提 表', date: '2026-06-15', stampText: '财务专用章', content: '期间：2026年6月\n\nSaaS摊销：36,000÷12=3,000.00元\n折旧合计：2,461.68元（含3月新增桌椅）\n\n合计：5,461.68元\n\n制表：李会计' ,
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
          'SaaS摊销',
          '36,000÷12=3,000.00元'
        ],
        [
          '折旧合计',
          '2,461.68元（含3月新增桌椅）'
        ],
        [
          '合计',
          '5,461.68元'
        ],
        [
          '制表',
          '李会计'
        ],
      ]}] },
  { date: '2026-06-16', role: 'accountant', title: '收到D公司培训尾款', tags: ["往来管理"], difficulty: 1,
    entries: [{ subjectCode: '100201', summary: 'D公司尾款', debit: 50400, credit: 0 }, { subjectCode: '1122', summary: 'D公司', debit: 0, credit: 50400 }],
    documents: [
      { type: 'bank', label: '收款回单', date: '2026-06-16', totalAmount: 50400, payer: 'D金融服务有限公司', payerAccount: '6222 0100 **** 6666', payeeName: '雲帆管理咨询有限公司', payeeAccount: '6222 0200 **** 1234', content: '内训项目尾款（剩余60%）', refNo: 'HD202606160007' }] },
  { date: '2026-06-17', role: 'accountant', title: '计提坏账准备', tags: ["往来管理"], difficulty: 2,
    tip: '按应收账款余额的5%计提坏账准备。借：信用减值损失，贷：坏账准备。',
    description: 'H1应收账款余额（D公司已清、F公司已清、无长期挂账），按余额的5%计提坏账准备≈8,000元。',
    entries: [{ subjectCode: '6701', summary: '计提坏账准备', debit: 8000, credit: 0, explanation: '信用减值损失增加。' }, { subjectCode: '1221', summary: '坏账准备', debit: 0, credit: 8000 }],
    documents: [
      { type: 'text', label: '坏账计提表', docTitle: '坏 账 准 备 计 提 表', date: '2026-06-17', stampText: '财务专用章', content: 'H1应收账款余额≈160,000\n计提比例：5%\n计提金额：8,000\n\n制表：李会计\n审核：赵会计主管' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '计提比例',
          '5%'
        ],
        [
          '计提金额',
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
      ]}] },
  { date: '2026-06-18', role: 'accountant', title: '银行手续费及利息', tags: ["资金管理"], difficulty: 1,
    entries: [{ subjectCode: '6603', summary: '手续费', debit: 650, credit: 0 }, { subjectCode: '100201', summary: '扣费', debit: 0, credit: 650 }, { subjectCode: '100201', summary: '结息', debit: 2000, credit: 0 }, { subjectCode: '6603', summary: '利息收入', debit: 0, credit: 2000 }],
    documents: [
      { type: 'bank', label: '扣费回单', date: '2026-06-18', totalAmount: 650, payer: '雲帆管理咨询有限公司', payeeName: '中国工商银行北京分行', content: '6月账户服务费及转账手续费', refNo: 'HD202606180008' },
      { type: 'bank', label: '结息回单', date: '2026-06-18', totalAmount: 2000, payer: '中国工商银行北京分行', payeeName: '雲帆管理咨询有限公司', content: '活期存款2026年6月结息', refNo: 'HD202606180009' }] },
  { date: '2026-06-19', role: 'accountant', title: '购买办公用品', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '660201', summary: '办公用品', debit: 1800, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 1800 }],
    documents: [
      { type: 'receipt', label: '办公用品发票', docTitle: '办 公 用 品 发 票', date: '2026-06-19', totalAmount: 1800, payer: '雲帆管理咨询有限公司', stampText: '得力办公\n发票专用章', items: [{ name: '打印纸、文件夹、计算器', qty: 1, price: 1800, amount: 1800 }]}] },
  { date: '2026-06-20', role: 'accountant', title: '业务招待费', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '660203', summary: '招待费', debit: 2500, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 2500 }],
    documents: [
      { type: 'receipt', label: '餐饮发票', docTitle: '北 京 市 餐 饮 服 务 发 票', date: '2026-06-20', totalAmount: 2500, payer: '雲帆管理咨询有限公司', stampText: 'XX餐厅\n发票专用章', items: [{ name: 'F项目客户宴请', qty: 1, price: 2500, amount: 2500 }]}] },
  { date: '2026-06-21', role: 'accountant', title: '计提6月员工工资', tags: ["工资社保"], difficulty: 2, description: '计提6月员工工资，应发工资合计208,000元。',
    entries: [{ subjectCode: '520101', summary: '项目工资', debit: 160000, credit: 0 }, { subjectCode: '6602', summary: '管理工资', debit: 48000, credit: 0 }, { subjectCode: '221101', summary: '应付工资', debit: 0, credit: 208000 }],
    documents: [
      { type: 'text', label: '工资计算表', docTitle: '6 月 工 资 计 算 汇 总 表', date: '2026-06-21', stampText: '人力资源部\n工资专用章', content: '期间：2026年6月\n\n项目人员：160,000元（F项目冲刺+E年框）\n管理人员：48,000元\n\n应发合计：208,000元\n\n制表：王出纳\n审核：李会计' ,
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
          '项目人员',
          '160,000元（F项目冲刺+E年框）'
        ],
        [
          '管理人员',
          '48,000元'
        ],
        [
          '应发合计',
          '208,000元'
        ],
        [
          '制表',
          '王出纳'
        ],
        [
          '审核',
          '李会计'
        ],
      ]}] },
  { date: '2026-06-22', role: 'accountant', title: '计提企业社保及公积金', tags: ["工资社保"], difficulty: 2, description: '计提企业社保及公积金，合计63,000元。',
    entries: [{ subjectCode: '520101', summary: '项目社保', debit: 32000, credit: 0 }, { subjectCode: '520101', summary: '项目公积金', debit: 16000, credit: 0 }, { subjectCode: '6602', summary: '管理社保', debit: 10000, credit: 0 }, { subjectCode: '6602', summary: '管理公积金', debit: 5000, credit: 0 }, { subjectCode: '221102', summary: '应付社保', debit: 0, credit: 42000 }, { subjectCode: '221102', summary: '应付公积金', debit: 0, credit: 21000 }],
    documents: [
      { type: 'text', label: '社保公积金计提表', docTitle: '社 保 公 积 金 计 提 汇 总 表', date: '2026-06-22', stampText: '财务专用章', content: '期间：2026年6月\n\n社保（企业部分）：\n  项目人员：32,000元\n  管理人员：10,000元\n  小计：42,000元\n\n公积金（企业部分）：\n  项目人员：16,000元\n  管理人员：5,000元\n  小计：21,000元\n\n合计：63,000元\n\n制表：李会计' ,
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
          '项目人员',
          '32,000元'
        ],
        [
          '管理人员',
          '10,000元'
        ],
        [
          '小计',
          '42,000元'
        ],
        [
          '项目人员',
          '16,000元'
        ],
        [
          '管理人员',
          '5,000元'
        ],
        [
          '小计',
          '21,000元'
        ],
        [
          '合计',
          '63,000元'
        ],
        [
          '制表',
          '李会计'
        ],
      ]}] },
  { date: '2026-06-23', role: 'accountant', title: '计提6月城建税及教育附加', tags: ["税费"], difficulty: 2,
    description: '本月销项税额=7,200（F项目）+1,200（E年框）=8,400元。',
    entries: [{ subjectCode: '6403', summary: '城建税', debit: 588, credit: 0 }, { subjectCode: '6403', summary: '教育附加', debit: 252, credit: 0 }, { subjectCode: '6403', summary: '地方教育附加', debit: 168, credit: 0 }, { subjectCode: '222103', summary: '应交城建税', debit: 0, credit: 588 }, { subjectCode: '222104', summary: '应交附加', debit: 0, credit: 420 }],
    documents: [
      { type: 'text', label: '税费计算表', docTitle: '城 建 税 及 教 育 附 加 计 提 表', date: '2026-06-23', stampText: '财务专用章', content: '期间：2026年6月\n计税依据：应纳增值税8,400.00元\n\n城建税（7%）：8,400×7%=588.00元\n教育附加（3%）：8,400×3%=252.00元\n地方教育附加（2%）：8,400×2%=168.00元\n\n合计：1,008.00元\n\n制表：李会计' ,
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
          '计税依据',
          '应纳增值税8,400.00元'
        ],
        [
          '城建税（7%）',
          '8,400×7%=588.00元'
        ],
        [
          '教育附加（3%）',
          '8,400×3%=252.00元'
        ],
        [
          '地方教育附加（2%）',
          '8,400×2%=168.00元'
        ],
        [
          '合计',
          '1,008.00元'
        ],
        [
          '制表',
          '李会计'
        ],
      ]}] },
  { date: '2026-06-24', role: 'accountant', title: '计提Q2企业所得税', tags: ["税费"], difficulty: 3,
    description: 'Q2利润总额估算约3-6月累计≈80,000元。Q2所得税=80,000×25%=20,000元（Q1已预提12,500）。',
    entries: [{ subjectCode: '6801', summary: 'Q2所得税费用', debit: 20000, credit: 0 }, { subjectCode: '222106', summary: '应交Q2所得税', debit: 0, credit: 20000 }],
    documents: [
      { type: 'text', label: '所得税计算表', docTitle: 'Q2 企 业 所 得 税 计 提 表', date: '2026-06-24', stampText: '财务专用章', content: '期间：2026年Q2（4-6月）\nQ2利润总额估算：80,000.00元\n适用税率：25%\nQ2应纳所得税：80,000×25%=20,000.00元\n\n（Q1已预提12,500元，全年累计预提32,500元）\n\n制表：李会计' ,
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
          'Q2利润总额估算',
          '80,000.00元'
        ],
        [
          '适用税率',
          '25%'
        ],
        [
          'Q2应纳所得税',
          '80,000×25%=20,000.00元'
        ],
        [
          '制表',
          '李会计'
        ],
      ]}] },
  { date: '2026-06-25', role: 'accountant', title: '期末结转劳务成本', tags: ["项目核算", "期末"], difficulty: 3,
    description: '结转已确认收入对应的成本。F项目人工50,000+差旅13,000+外包17,500=80,500。',
    entries: [{ subjectCode: '6401', summary: '结转F人工', debit: 50000, credit: 0 }, { subjectCode: '6401', summary: '结转F差旅', debit: 13000, credit: 0 }, { subjectCode: '6401', summary: '结转F外包', debit: 17500, credit: 0 }, { subjectCode: '520101', summary: '转F人工', debit: 0, credit: 50000 }, { subjectCode: '520102', summary: '转F差旅', debit: 0, credit: 13000 }, { subjectCode: '520103', summary: '转F外包', debit: 0, credit: 17500 }],
    documents: [
      { type: 'text', label: '成本计算表', docTitle: '项 目 成 本 结 转 计 算 表', date: '2026-06-25', stampText: '财务专用章', content: '结转期间：2026年6月\n\nF项目（第二阶段完成）：\n  人工成本：50,000元\n  差旅费：13,000元\n  外包数据分析费：17,500元\n  合计：80,500元\n\n制表：李会计' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '结转期间',
          '2026年6月'
        ],
        [
          '人工成本',
          '50,000元'
        ],
        [
          '差旅费',
          '13,000元'
        ],
        [
          '外包数据分析费',
          '17,500元'
        ],
        [
          '合计',
          '80,500元'
        ],
        [
          '制表',
          '李会计'
        ],
      ]}] },
  { date: '2026-06-26', role: 'accountant', title: 'H1半年期间损益结转', tags: ["期末"], difficulty: 3,
    description: '收入：F项目120,000+E年框20,000=140,000。半年累计回顾。',
    entries: [{ subjectCode: '6001', summary: '结转收入', debit: 140000, credit: 0 }, { subjectCode: '4103', summary: '收入转入', debit: 0, credit: 140000 },
      { subjectCode: '4103', summary: '费用转入', debit: 135608, credit: 0, explanation: '80,500+1,008+44,000+100+8,000+2,000=135,608。' }, { subjectCode: '6401', summary: '转成本', debit: 0, credit: 80500 },
      { subjectCode: '6403', summary: '转税金', debit: 0, credit: 1008 }, { subjectCode: '6602', summary: '转管理费', debit: 0, credit: 44000 },
      { subjectCode: '6603', summary: '转财务费', debit: 0, credit: 100 }, { subjectCode: '6701', summary: '转减值损失', debit: 0, credit: 8000 },
      { subjectCode: '6801', summary: '转所得税', debit: 0, credit: 2000 }],
    documents: [
      { type: 'text', label: '结转表', docTitle: 'H1 半 年 期 间 损 益 结 转 表', date: '2026-06-30', stampText: '已结转', content: '结转期间：2026年6月（H1半年结转）\n\n收入类→本年利润：\n  主营业务收入：140,000元（F中期120,000+E年框20,000）\n\n费用类→本年利润：\n  主营业务成本：80,500元\n  税金及附加：1,008元\n  管理费用：44,000元\n  财务费用：100元\n  信用减值损失：8,000元（坏账准备）\n  所得税费用：2,000元\n  合计：135,608元\n\n半年净利润：140,000-135,608=4,392元\n\n制表：李会计' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '结转期间',
          '2026年6月（H1半年结转）'
        ],
        [
          '主营业务收入',
          '140,000元（F中期120,000+E年框20,000）'
        ],
        [
          '主营业务成本',
          '80,500元'
        ],
        [
          '税金及附加',
          '1,008元'
        ],
        [
          '管理费用',
          '44,000元'
        ],
        [
          '财务费用',
          '100元'
        ],
        [
          '信用减值损失',
          '8,000元（坏账准备）'
        ],
        [
          '所得税费用',
          '2,000元'
        ],
        [
          '合计',
          '135,608元'
        ],
        [
          '半年净利润',
          '140,000-135,608=4,392元'
        ],
        [
          '制表',
          '李会计'
        ],
      ]}] },
  { date: '2026-06-28', role: 'accountant', title: '提取备用金', tags: ["资金管理"], difficulty: 1,
    entries: [{ subjectCode: '1001', summary: '备用金', debit: 3000, credit: 0 }, { subjectCode: '100201', summary: '提现', debit: 0, credit: 3000 }],
    documents: [
      { type: 'bank', label: '现金支票回单', date: '2026-06-28', totalAmount: 3000, payer: '雲帆管理咨询有限公司', payeeName: '雲帆管理咨询有限公司（现金）', content: '提取备用金', refNo: 'HD202606280010' }] },
  { date: '2026-06-27', role: 'accountant', title: 'H1固定资产盘点', tags: ["费用管理"], difficulty: 1,
    description: '半年度固定资产盘点，账实相符，无误。',
    entries: [],
    documents: [
      { type: 'text', label: '盘点报告', docTitle: '固 定 资 产 盘 点 报 告', date: '2026-06-27', stampText: '财务专用章', content: '盘点日期：2026年6月27日\n盘点范围：全部固定资产（电子设备+办公家具）\n\n盘点结果：\n  笔记本电脑：10台  ✓\n  台式电脑：5台  ✓\n  办公桌椅：25套  ✓\n  其他设备：若干  ✓\n\n结论：账实相符，无盘亏盘盈。\n\n盘点人：王出纳\n监盘人：李会计' ,
      headers: [
        '项目',
        '内容'
      ],
      rows: [
        [
          '盘点日期',
          '2026年6月27日'
        ],
        [
          '盘点范围',
          '全部固定资产（电子设备+办公家具）'
        ],
        [
          '笔记本电脑',
          '10台  ✓'
        ],
        [
          '台式电脑',
          '5台  ✓'
        ],
        [
          '办公桌椅',
          '25套  ✓'
        ],
        [
          '其他设备',
          '若干  ✓'
        ],
        [
          '结论',
          '账实相符，无盘亏盘盈。'
        ],
        [
          '盘点人',
          '王出纳'
        ],
        [
          '监盘人',
          '李会计'
        ],
      ]}] },
  { date: '2026-06-28', role: 'accountant', title: '计提无形资产摊销', tags: ["费用管理"], difficulty: 2,
    description: '计提6月无形资产摊销400元。',
    entries: [{ subjectCode: '6602', summary: '无形资产摊销', debit: 400, credit: 0 }, { subjectCode: '1702', summary: '累计摊销', debit: 0, credit: 400 }],
    documents: [
      { type: 'text', label: '摊销计算表', docTitle: '无 形 资 产 摊 销 计 算 表', date: '2026-06-28', stampText: '财务专用章', content: '无形资产：软件项目管理工具（永久许可）\n原值：24,000.00元\n摊销期限：5年（60个月）\n月摊销额：400.00元\n累计摊销：1,600.00元\n\n制表：李会计' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '无形资产',
          '软件项目管理工具（永久许可）'
        ],
        [
          '原值',
          '24,000.00元'
        ],
        [
          '摊销期限',
          '5年（60个月）'
        ],
        [
          '月摊销额',
          '400.00元'
        ],
        [
          '累计摊销',
          '1,600.00元'
        ],
        [
          '制表',
          '李会计'
        ],
      ]}] },
  { date: '2026-06-28', role: 'accountant', title: '支付员工年度体检费', tags: ["费用管理"], difficulty: 1,
    description: '组织全体员工年度体检，费用12,000元。',
    entries: [{ subjectCode: '6602', summary: '体检费', debit: 12000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 12000 }],
    documents: [
      { type: 'receipt', label: '体检费发票', docTitle: '体 检 服 务 发 票', date: '2026-06-28', totalAmount: 12000, payer: '雲帆管理咨询有限公司', stampText: 'XX体检中心\n发票专用章', items: [{ name: '2026年度员工健康体检（52人）', qty: 52, price: 230.77, amount: 12000 }]},
      { type: 'bank', label: '转账回单', date: '2026-06-28', totalAmount: 12000, payer: '雲帆管理咨询有限公司', payeeName: 'XX爱康体检中心', content: '员工年度体检费', refNo: 'HD202606280011' }] },
  { date: '2026-06-29', role: 'accountant', title: '支付H1审计费', tags: ["费用管理"], difficulty: 1,
    description: '支付半年度财务报表审计费15,000元。',
    entries: [{ subjectCode: '6602', summary: '审计费', debit: 15000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 15000 }],
    documents: [
      { type: 'receipt', label: '审计费发票', docTitle: '审 计 服 务 发 票', date: '2026-06-29', totalAmount: 15000, payer: '雲帆管理咨询有限公司', stampText: 'XX会计师事务所\n发票专用章', items: [{ name: '2026年H1半年度财务报表审计', qty: 1, price: 15000, amount: 15000 }]},
      { type: 'bank', label: '转账回单', date: '2026-06-29', totalAmount: 15000, payer: '雲帆管理咨询有限公司', payeeName: 'XX会计师事务所', content: 'H1半年度审计费', refNo: 'HD202606290012' }] },
  { date: '2026-06-30', role: 'accountant', title: '模拟纳税申报', tags: ["税费", "期末"], difficulty: 1, entries: [], nextAction: 'tax-filing',
    documents: [{ type: 'text', label: '申报提醒', docTitle: '6 月 纳 税 申 报 提 醒', stampText: '财务专用章', content: '申报期间：2026年6月\n截止日期：2026年7月15日\n\n申报税种：\n1. 增值税（6%，销项税额8,400元）\n2. 城市维护建设税（7%）\n3. 教育费附加（3%+2%）\n4. 代扣代缴个人所得税\n5. Q2企业所得税预缴\n\n请前往纳税申报页面核对后提交。' }] },
]

export default jun
