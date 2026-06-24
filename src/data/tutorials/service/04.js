/**
 * 服务业 4月 - 🔄 固定费率·预收收入
 * C项目按履约进度确认收入、预付卡/年框合同、D公司培训尾款收回
 */

const apr = [
  { date: '2026-04-02', role: 'accountant', title: '发放3月员工工资', tags: ["工资社保"], difficulty: 1,
    entries: [{ subjectCode: '221101', summary: '发3月工资', debit: 185000, credit: 0 }, { subjectCode: '100201', summary: '实发', debit: 0, credit: 154000 }, { subjectCode: '224101', summary: '代扣社保', debit: 0, credit: 18500 }, { subjectCode: '224102', summary: '代扣公积金', debit: 0, credit: 9250 }, { subjectCode: '222110', summary: '代扣个税', debit: 0, credit: 3250 }],
    documents: [
      { type: 'bank', label: '代发工资回单', date: '2026-04-02', totalAmount: 154000, payer: '雲帆管理咨询有限公司', payeeName: '员工代发户', content: '3月工资代发（共48人）', refNo: 'HD202604020001' },
      { type: 'text', label: '工资表', docTitle: '3 月 工 资 发 放 表', date: '2026-04-02', stampText: '人力资源部\n工资专用章', content: '期间：2026年3月\n应发工资总额：185,000.00元\n扣款：社保18,500+公积金9,250+个税3,250=31,000元\n实发合计：154,000.00元（银行代发）\n\n制表：王出纳\n审核：李会计' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '期间',
          '2026年3月'
        ],
        [
          '应发工资总额',
          '185,000.00元'
        ],
        [
          '扣款',
          '社保18,500+公积金9,250+个税3,250=31,000元'
        ],
        [
          '实发合计',
          '154,000.00元（银行代发）'
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
  { date: '2026-04-03', role: 'accountant', title: '缴纳3月社保公积金', tags: ["工资社保"], difficulty: 1,
    entries: [{ subjectCode: '221102', summary: '企业社保', debit: 37000, credit: 0 }, { subjectCode: '224101', summary: '个人社保', debit: 18500, credit: 0 }, { subjectCode: '221102', summary: '企业公积金', debit: 18500, credit: 0 }, { subjectCode: '224102', summary: '个人公积金', debit: 9250, credit: 0 }, { subjectCode: '100201', summary: '支付', debit: 0, credit: 83250 }],
    documents: [
      { type: 'bank', label: '扣款回单', date: '2026-04-03', totalAmount: 83250, payer: '雲帆管理咨询有限公司', payeeName: '北京市社会保险基金管理中心', content: '3月社保+公积金缴纳', refNo: 'HD202604030002' }] },
  { date: '2026-04-04', role: 'accountant', title: '缴纳3月增值税及附加税', tags: ["税费"], difficulty: 1,
    entries: [{ subjectCode: '222101', summary: '增值税', debit: 17400, credit: 0 }, { subjectCode: '222103', summary: '城建税', debit: 1218, credit: 0 }, { subjectCode: '222104', summary: '教育附加', debit: 522, credit: 0 }, { subjectCode: '222104', summary: '地方教育附加', debit: 348, credit: 0 }, { subjectCode: '100201', summary: '缴税', debit: 0, credit: 19488 }],
    documents: [
      { type: 'bank', label: '缴税回单', date: '2026-04-04', totalAmount: 19488, payer: '雲帆管理咨询有限公司', payeeName: '国家税务总局北京市税务局', content: '3月增值税及附加税缴纳', refNo: 'HD202604040003' }] },
  { date: '2026-04-05', role: 'accountant', title: '收到D公司培训尾款', tags: ["往来管理"], difficulty: 1,
    entries: [{ subjectCode: '100201', summary: '收到D公司尾款', debit: 50400, credit: 0 }, { subjectCode: '1122', summary: 'D公司尾款', debit: 0, credit: 50400 }],
    documents: [
      { type: 'bank', label: '收款回单', date: '2026-04-05', totalAmount: 50400, payer: 'D金融服务有限公司', payerAccount: '6222 0100 **** 6666', payeeName: '雲帆管理咨询有限公司', payeeAccount: '6222 0200 **** 1234', content: '内训项目尾款（剩余60%）', refNo: 'HD202604050004' }] },
  { date: '2026-04-07', role: 'accountant', title: '缴纳代扣个税及Q1申报补税', tags: ["税费"], difficulty: 2,
    description: '缴纳3月个税3,250元；Q1所得税汇算补税2,500元（已预缴15,000，应计提17,500）。合计5,750元。',
    entries: [{ subjectCode: '222110', summary: '个税', debit: 3250, credit: 0 }, { subjectCode: '222106', summary: 'Q1补税', debit: 2500, credit: 0 }, { subjectCode: '100201', summary: '缴税', debit: 0, credit: 5750 }],
    documents: [
      { type: 'bank', label: '缴税回单', date: '2026-04-07', totalAmount: 5750, payer: '雲帆管理咨询有限公司', payeeName: '国家税务总局北京市税务局', content: '3月个税+Q1所得税补税', refNo: 'HD202604070005' }] },
  { date: '2026-04-08', role: 'accountant', title: '支付4月写字楼租金', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '660205', summary: '房租', debit: 22000, credit: 0 }, { subjectCode: '660205', summary: '物业费', debit: 3000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 25000 }],
    documents: [
      { type: 'receipt', label: '房屋租赁收据', docTitle: '房 屋 租 赁 专 用 收 据', date: '2026-04-08', totalAmount: 25000, payer: '雲帆管理咨询有限公司', stampText: '北京XX物业管理有限公司\n财务专用章', items: [{ name: '望京XX大厦15层 4月租金', qty: 1, price: 22000, amount: 22000 }, { name: '4月物业管理费', qty: 1, price: 3000, amount: 3000 }]}] },
  { date: '2026-04-09', role: 'accountant', title: 'C项目·按履约进度确认第二阶段收入', tags: ["项目核算"], difficulty: 2,
    tip: '固定费率合同按履约进度确认收入。已发生成本占预计总成本比例法。',
    description: 'C项目完成供应商选型及招标监理阶段。按履约进度（累计成本占预计总成本70%）确认收入。合同总额400,000×（70%-20%）=200,000元。增值税6%=12,000元。',
    entries: [
      { subjectCode: '1122', summary: 'C公司中期款', debit: 120000, credit: 0, explanation: '应收账款增加。中期按合同应收40%。' },
      { subjectCode: '2232', summary: 'C公司预收款（补）', debit: 92000, credit: 0, explanation: '合同负债减少。预收款用尽后差额。' },
      { subjectCode: '6001', summary: '项目C第二阶段收入', debit: 0, credit: 200000, explanation: '主营业务收入增加。按履约进度确认。' },
      { subjectCode: '222101', summary: '销项税额6%', debit: 0, credit: 12000 }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '北京', invoiceType: '专用', copy: '发票联', invoiceNo: '1100432117', date: '2026年04月09日', buyer: 'C商业银行', buyerTaxId: '91110108MACCCCCCC', seller: '雲帆管理咨询有限公司', sellerTaxId: '91110108MA3XXXXXXXX', stampText: '发票专用章', payee: '李四', reviewer: '王五', drawer: '赵六', lineItems: [{ name: 'IT咨询（供应商选型阶段）', unit: '项', qty: 1, price: 200000, amount: 200000, taxRate: '6%', tax: 12000 }], totalAmount: 212000 },
      { type: 'text', label: '阶段验收', docTitle: '第 二 阶 段 验 收 确 认 书', date: '2026-04-09', stampText: 'C商业银行\n项目专用章', content: '项目：核心银行系统升级咨询项目\n阶段：供应商选型及招标监理（第二阶段）\n结论：通过 ✓\n累计进度：70%\n\n甲方代表：周总\n乙方代表：王顾问' ,
      headers: [
        '项目',
        '内容'
      ],
      rows: [
        [
          '项目',
          '核心银行系统升级咨询项目'
        ],
        [
          '阶段',
          '供应商选型及招标监理（第二阶段）'
        ],
        [
          '结论',
          '通过 ✓'
        ],
        [
          '累计进度',
          '70%'
        ],
        [
          '甲方代表',
          '周总'
        ],
        [
          '乙方代表',
          '王顾问'
        ],
      ]}] },
  { date: '2026-04-10', role: 'accountant', title: '收到C公司中期咨询费', tags: ["往来管理"], difficulty: 1,
    entries: [{ subjectCode: '100201', summary: 'C公司中期款', debit: 120000, credit: 0 }, { subjectCode: '1122', summary: 'C公司', debit: 0, credit: 120000 }],
    documents: [
      { type: 'bank', label: '收款回单', date: '2026-04-10', totalAmount: 120000, payer: 'C商业银行', payerAccount: '6222 0100 **** 2222', payeeName: '雲帆管理咨询有限公司', payeeAccount: '6222 0200 **** 1234', content: 'IT咨询项目中期款', refNo: 'HD202604100006' }] },
  { date: '2026-04-11', role: 'accountant', title: '项目C·实施监理阶段差旅', tags: ["项目核算"], difficulty: 2, description: 'C项目实施监理阶段差旅费用。',
    entries: [{ subjectCode: '520102', summary: '项目C差旅', debit: 14000, credit: 0, explanation: '供应商实施现场监理差旅。' }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 14000 }],
    documents: [
      { type: 'receipt', label: '差旅报销单', docTitle: '差 旅 费 报 销 单', date: '2026-04-11', totalAmount: 14000, payer: '雲帆管理咨询有限公司', stampText: '财务\n审核专用章', items: [{ name: '往返深圳机票×4', qty: 8, price: 1250, amount: 10000 }, { name: '住宿×5天×4间', qty: 20, price: 200, amount: 4000 }]}] },
  { date: '2026-04-12', role: 'accountant', title: 'E公司年框管理咨询合同·签约收款', tags: ["项目核算"], difficulty: 2,
    tip: '大客户年度框架合同，预收全年服务费分期确认收入。',
    description: '与E公司签订年度管理咨询框架合同，全年服务费240,000元（月均20,000元）。签约即付全年款，已到账。全年分12个月确认收入。',
    entries: [
      { subjectCode: '100201', summary: 'E公司年框收款', debit: 240000, credit: 0 },
      { subjectCode: '2232', summary: '预收E公司年费', debit: 0, credit: 240000 }],
    documents: [
      { type: 'bank', label: '收款回单', date: '2026-04-12', totalAmount: 240000, payer: 'E集团公司', payerAccount: '6222 0100 **** 8888', payeeName: '雲帆管理咨询有限公司', payeeAccount: '6222 0200 **** 1234', content: '年度管理咨询年框服务费（全年）', refNo: 'HD202604120007' },
      { type: 'text', label: '年框合同', docTitle: '年 度 管 理 咨 询 框 架 合 同', date: '2026-04-12', stampText: '合同专用章', content: '甲方：E集团公司\n乙方：雲帆管理咨询有限公司\n服务范围：全年不限次管理咨询（含战略/运营/人力模块）\n年费：240,000元\n支付方式：签约日一次性付清\n收入确认：按月均20,000元确认' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '甲方',
          'E集团公司'
        ],
        [
          '乙方',
          '雲帆管理咨询有限公司'
        ],
        [
          '服务范围',
          '全年不限次管理咨询（含战略/运营/人力模块）'
        ],
        [
          '年费',
          '240,000元'
        ],
        [
          '支付方式',
          '签约日一次性付清'
        ],
        [
          '收入确认',
          '按月均20,000元确认'
        ],
      ]}] },
  { date: '2026-04-14', role: 'accountant', title: '支付4月水电及网络费', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '6602', summary: '水电费', debit: 4200, credit: 0 }, { subjectCode: '6602', summary: '网络费', debit: 2000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 6200 }],
    documents: [
      { type: 'receipt', label: '电费凭证', docTitle: '电 费 缴 费 凭 证', date: '2026-04-14', totalAmount: 4200, payer: '雲帆管理咨询有限公司', stampText: '国家电网\n电费收讫章', items: [{ name: '写字楼用电 4,200kWh×1.00元', qty: 4200, price: 1, amount: 4200 }]},
      { type: 'receipt', label: '通信费发票', docTitle: '通 信 服 务 发 票', date: '2026-04-14', totalAmount: 2000, payer: '雲帆管理咨询有限公司', stampText: '中国联通\n发票专用章', items: [{ name: '企业宽带（4月）', qty: 1, price: 2000, amount: 2000 }]}] },
  { date: '2026-04-15', role: 'accountant', title: '摊销SaaS费及计提折旧', tags: ["费用管理"], difficulty: 2, description: '摊销SaaS服务费3,000元及计提固定资产折旧2,620元。',
    entries: [{ subjectCode: '6602', summary: '摊销SaaS', debit: 3000, credit: 0 }, { subjectCode: '6602', summary: '折旧', debit: 2462, credit: 0, explanation: '含新增桌椅118.75元。' }, { subjectCode: '1208', summary: '摊销', debit: 0, credit: 3000 }, { subjectCode: '1602', summary: '折旧', debit: 0, credit: 2462 }],
    documents: [
      { type: 'text', label: '摊销折旧表', docTitle: '摊 销 折 旧 计 提 表', date: '2026-04-15', stampText: '财务专用章', content: '期间：2026年4月\n\nSaaS摊销：36,000÷12=3,000.00元\n折旧合计：2,461.68元（含3月新增桌椅118.75元）\n\n合计：5,461.68元\n\n制表：李会计' ,
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
          'SaaS摊销',
          '36,000÷12=3,000.00元'
        ],
        [
          '折旧合计',
          '2,461.68元（含3月新增桌椅118.75元）'
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
  { date: '2026-04-16', role: 'accountant', title: '确认E公司年框4月收入', tags: ["项目核算", "收入确认"], difficulty: 2,
    tip: '年框合同按月平均确认收入。月收入=240,000÷12=20,000元。',
    description: '按直线法确认E公司年框4月收入20,000元。增值税6%=1,200元。',
    entries: [
      { subjectCode: '2232', summary: 'E公司年框4月', debit: 21200, credit: 0, explanation: '合同负债减少。' },
      { subjectCode: '6001', summary: '年框4月收入', debit: 0, credit: 20000 },
      { subjectCode: '222101', summary: '销项税额', debit: 0, credit: 1200 }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '北京', invoiceType: '专用', copy: '发票联', invoiceNo: '1100432118', date: '2026年04月16日', buyer: 'E集团公司', buyerTaxId: '91110108MAZZZZZZZ', seller: '雲帆管理咨询有限公司', sellerTaxId: '91110108MA3XXXXXXXX', stampText: '发票专用章', payee: '李四', reviewer: '王五', drawer: '赵六', lineItems: [{ name: '年度管理咨询（4月）', unit: '月', qty: 1, price: 20000, amount: 20000, taxRate: '6%', tax: 1200 }], totalAmount: 21200 }] },
  { date: '2026-04-17', role: 'accountant', title: '报销项目C资料费及通讯费', tags: ["项目核算"], difficulty: 2, description: '报销项目资料费及通讯费，合计3,800元。',
    entries: [{ subjectCode: '520104', summary: '项目C资料通讯', debit: 3800, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 3800 }],
    documents: [
      { type: 'receipt', label: '费用报销单', docTitle: '费 用 报 销 单', date: '2026-04-17', totalAmount: 3800, payer: '雲帆管理咨询有限公司', stampText: '财务\n审核专用章', items: [{ name: '技术文档购买（C项目）', qty: 1, price: 2000, amount: 2000 }, { name: '国际长途话费（C项目）', qty: 1, price: 1800, amount: 1800 }]}] },
  { date: '2026-04-18', role: 'accountant', title: '银行手续费及利息', tags: ["资金管理"], difficulty: 1,
    entries: [{ subjectCode: '6603', summary: '手续费', debit: 600, credit: 0 }, { subjectCode: '100201', summary: '扣费', debit: 0, credit: 600 }, { subjectCode: '100201', summary: '结息', debit: 1500, credit: 0 }, { subjectCode: '6603', summary: '利息收入', debit: 0, credit: 1500 }],
    documents: [
      { type: 'bank', label: '扣费回单', date: '2026-04-18', totalAmount: 600, payer: '雲帆管理咨询有限公司', payeeName: '中国工商银行北京分行', content: '4月账户服务费及转账手续费', refNo: 'HD202604180008' },
      { type: 'bank', label: '结息回单', date: '2026-04-18', totalAmount: 1500, payer: '中国工商银行北京分行', payeeName: '雲帆管理咨询有限公司', content: '活期存款2026年4月结息', refNo: 'HD202604180009' }] },
  { date: '2026-04-19', role: 'accountant', title: '购买办公用品', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '660201', summary: '办公用品', debit: 2200, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 2200 }],
    documents: [
      { type: 'receipt', label: '办公用品发票', docTitle: '办 公 用 品 发 票', date: '2026-04-19', totalAmount: 2200, payer: '雲帆管理咨询有限公司', stampText: '晨光文具\n发票专用章', items: [{ name: '打印纸、墨盒等', qty: 1, price: 2200, amount: 2200 }]}] },
  { date: '2026-04-21', role: 'accountant', title: '业务招待费', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '660203', summary: '招待费', debit: 2800, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 2800 }],
    documents: [
      { type: 'receipt', label: '餐饮发票', docTitle: '北 京 市 餐 饮 服 务 发 票', date: '2026-04-21', totalAmount: 2800, payer: '雲帆管理咨询有限公司', stampText: 'XX酒店\n发票专用章', items: [{ name: 'E公司客户接待', qty: 1, price: 2800, amount: 2800 }]}] },
  { date: '2026-04-22', role: 'accountant', title: '计提短期借款利息', tags: ["资金管理"], difficulty: 2, description: '计提短期借款利息。',
    entries: [{ subjectCode: '6603', summary: '4月利息', debit: 725, credit: 0 }, { subjectCode: '2231', summary: '应付利息', debit: 0, credit: 725 }],
    documents: [
      { type: 'text', label: '利息计算表', docTitle: '短 期 借 款 利 息 计 算 表', date: '2026-04-22', stampText: '财务专用章', content: '借款本金：200,000.00元\n年利率：4.35%\n4月利息：200,000×4.35%÷12=725.00元\n累计应付利息：2,900.00元\n\n制表：李会计' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '借款本金',
          '200,000.00元'
        ],
        [
          '年利率',
          '4.35%'
        ],
        [
          '4月利息',
          '200,000×4.35%÷12=725.00元'
        ],
        [
          '累计应付利息',
          '2,900.00元'
        ],
        [
          '制表',
          '李会计'
        ],
      ]}] },
  { date: '2026-04-23', role: 'accountant', title: '计提4月员工工资', tags: ["工资社保"], difficulty: 2, description: '计提4月员工工资，应发工资合计193,000元。',
    entries: [{ subjectCode: '520101', summary: '项目人员工资', debit: 148000, credit: 0 }, { subjectCode: '6602', summary: '管理工资', debit: 45000, credit: 0 }, { subjectCode: '221101', summary: '应付工资', debit: 0, credit: 193000 }],
    documents: [
      { type: 'text', label: '工资计算表', docTitle: '4 月 工 资 计 算 汇 总 表', date: '2026-04-23', stampText: '人力资源部\n工资专用章', content: '期间：2026年4月\n\n项目人员：148,000元（C/E项目并行）\n管理人员：45,000元\n\n应发合计：193,000元\n\n制表：王出纳\n审核：李会计' ,
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
          '项目人员',
          '148,000元（C/E项目并行）'
        ],
        [
          '管理人员',
          '45,000元'
        ],
        [
          '应发合计',
          '193,000元'
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
  { date: '2026-04-24', role: 'accountant', title: '计提企业社保及公积金', tags: ["工资社保"], difficulty: 2, description: '计提企业社保及公积金，合计58,000元。',
    entries: [
      { subjectCode: '520101', summary: '项目社保', debit: 29000, credit: 0 }, { subjectCode: '520101', summary: '项目公积金', debit: 15000, credit: 0 },
      { subjectCode: '6602', summary: '管理社保', debit: 9500, credit: 0 }, { subjectCode: '6602', summary: '管理公积金', debit: 4500, credit: 0 },
      { subjectCode: '221102', summary: '应付社保', debit: 0, credit: 38500 }, { subjectCode: '221102', summary: '应付公积金', debit: 0, credit: 19500 }],
    documents: [
      { type: 'text', label: '社保公积金计提表', docTitle: '社 保 公 积 金 计 提 汇 总 表', date: '2026-04-24', stampText: '财务专用章', content: '期间：2026年4月\n\n社保（企业部分）：\n  项目人员：29,000元\n  管理人员：9,500元\n  小计：38,500元\n\n公积金（企业部分）：\n  项目人员：15,000元\n  管理人员：4,500元\n  小计：19,500元\n\n合计：58,000元\n\n制表：李会计' ,
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
          '项目人员',
          '29,000元'
        ],
        [
          '管理人员',
          '9,500元'
        ],
        [
          '小计',
          '38,500元'
        ],
        [
          '项目人员',
          '15,000元'
        ],
        [
          '管理人员',
          '4,500元'
        ],
        [
          '小计',
          '19,500元'
        ],
        [
          '合计',
          '58,000元'
        ],
        [
          '制表',
          '李会计'
        ],
      ]}] },
  { date: '2026-04-25', role: 'accountant', title: '计提4月城建税及教育附加', tags: ["税费"], difficulty: 2,
    description: '本月销项税额=12,000（C项目）+1,200（E年框）=13,200元。',
    entries: [
      { subjectCode: '6403', summary: '城建税', debit: 924, credit: 0, explanation: '13,200×7%。' },
      { subjectCode: '6403', summary: '教育附加', debit: 396, credit: 0, explanation: '13,200×3%。' },
      { subjectCode: '6403', summary: '地方教育附加', debit: 264, credit: 0, explanation: '13,200×2%。' },
      { subjectCode: '222103', summary: '应交城建税', debit: 0, credit: 924 },
      { subjectCode: '222104', summary: '应交教育附加', debit: 0, credit: 396 },
      { subjectCode: '222104', summary: '应交地方教育附加', debit: 0, credit: 264 }],
    documents: [
      { type: 'text', label: '税费计算表', docTitle: '城 建 税 及 教 育 附 加 计 提 表', date: '2026-04-25', stampText: '财务专用章', content: '期间：2026年4月\n计税依据：应纳增值税13,200.00元\n\n城建税（7%）：13,200×7%=924.00元\n教育附加（3%）：13,200×3%=396.00元\n地方教育附加（2%）：13,200×2%=264.00元\n\n合计：1,584.00元\n\n制表：李会计' ,
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
          '计税依据',
          '应纳增值税13,200.00元'
        ],
        [
          '城建税（7%）',
          '13,200×7%=924.00元'
        ],
        [
          '教育附加（3%）',
          '13,200×3%=396.00元'
        ],
        [
          '地方教育附加（2%）',
          '13,200×2%=264.00元'
        ],
        [
          '合计',
          '1,584.00元'
        ],
        [
          '制表',
          '李会计'
        ],
      ]}] },
  { date: '2026-04-27', role: 'accountant', title: '期末结转劳务成本', tags: ["项目核算", "期末"], difficulty: 3,
    description: '结转本月已确认收入对应的劳务成本：C项目人工80,000+差旅14,000+其他3,800；E年框暂无直接成本。合计97,800元。',
    entries: [
      { subjectCode: '6401', summary: '结转C人工', debit: 80000, credit: 0 }, { subjectCode: '6401', summary: '结转C差旅', debit: 14000, credit: 0 },
      { subjectCode: '6401', summary: '结转C其他', debit: 3800, credit: 0 },
      { subjectCode: '520101', summary: '转人工', debit: 0, credit: 80000 }, { subjectCode: '520102', summary: '转差旅', debit: 0, credit: 14000 },
      { subjectCode: '520104', summary: '转其他', debit: 0, credit: 3800 }],
    documents: [
      { type: 'text', label: '成本计算表', docTitle: '项 目 成 本 结 转 计 算 表', date: '2026-04-27', stampText: '财务专用章', content: '结转期间：2026年4月\n\nC项目（收入200,000元对应成本）：\n  人工成本：80,000元\n  差旅费：14,000元\n  其他直接费（资料/通讯）：3,800元\n  小计：97,800元\n\nE项目（年框业务，本月无直接成本）\n\n制表：李会计' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '结转期间',
          '2026年4月'
        ],
        [
          '人工成本',
          '80,000元'
        ],
        [
          '差旅费',
          '14,000元'
        ],
        [
          '其他直接费（资料/通讯）',
          '3,800元'
        ],
        [
          '小计',
          '97,800元'
        ],
        [
          '制表',
          '李会计'
        ],
      ]}] },
  { date: '2026-04-28', role: 'accountant', title: '月末期间损益结转', tags: ["期末"], difficulty: 3,
    description: '收入：C项目200,000+E年框20,000=220,000。',
    entries: [
      { subjectCode: '6001', summary: '结转收入', debit: 220000, credit: 0 }, { subjectCode: '4103', summary: '收入转入', debit: 0, credit: 220000 },
      { subjectCode: '4103', summary: '费用转入', debit: 191559, credit: 0 },
      { subjectCode: '6401', summary: '转成本', debit: 0, credit: 97800 }, { subjectCode: '6403', summary: '转税金', debit: 0, credit: 1584 },
      { subjectCode: '6602', summary: '转管理费', debit: 0, credit: 92000 }, { subjectCode: '6603', summary: '转财务费', debit: 0, credit: 175 }],
    documents: [
      { type: 'text', label: '结转表', docTitle: '期 间 损 益 结 转 表', date: '2026-04-30', stampText: '已结转', content: '结转期间：2026年4月\n\n收入类→本年利润：\n  主营业务收入：220,000元（C项目200,000+E年框20,000）\n\n费用类→本年利润：\n  主营业务成本：97,800元\n  税金及附加：1,584元\n  管理费用：92,000元\n  财务费用：175元\n  合计：191,559元\n\n本月净利润：28,441元\n\n制表：李会计' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '结转期间',
          '2026年4月'
        ],
        [
          '主营业务收入',
          '220,000元（C项目200,000+E年框20,000）'
        ],
        [
          '主营业务成本',
          '97,800元'
        ],
        [
          '税金及附加',
          '1,584元'
        ],
        [
          '管理费用',
          '92,000元'
        ],
        [
          '财务费用',
          '175元'
        ],
        [
          '合计',
          '191,559元'
        ],
        [
          '本月净利润',
          '28,441元'
        ],
        [
          '制表',
          '李会计'
        ],
      ]}] },
  { date: '2026-04-29', role: 'accountant', title: '提取备用金', tags: ["资金管理"], difficulty: 1,
    entries: [{ subjectCode: '1001', summary: '备用金', debit: 3000, credit: 0 }, { subjectCode: '100201', summary: '提现', debit: 0, credit: 3000 }],
    documents: [
      { type: 'bank', label: '现金支票回单', date: '2026-04-29', totalAmount: 3000, payer: '雲帆管理咨询有限公司', payeeName: '雲帆管理咨询有限公司（现金）', content: '提取备用金', refNo: 'HD202604290010' }] },
  { date: '2026-04-28', role: 'accountant', title: '参加行业管理论坛·市场推广', tags: ["费用管理"], difficulty: 1,
    description: '参加"2026中国企业数字化转型论坛"门票及展位费10,000元。',
    entries: [{ subjectCode: '6601', summary: '论坛参展费', debit: 10000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 10000 }],
    documents: [
      { type: 'receipt', label: '论坛发票', docTitle: '会 展 服 务 发 票', date: '2026-04-28', totalAmount: 10000, payer: '雲帆管理咨询有限公司', stampText: '中国企业管理协会\n发票专用章', items: [{ name: '2026数字化转型论坛门票+标准展位', qty: 1, price: 10000, amount: 10000 }]}] },
  { date: '2026-04-28', role: 'accountant', title: '报销员工培训费', tags: ["费用管理"], difficulty: 1,
    description: '2名顾问参加PMP项目管理认证考试培训，报销培训费5,000元。',
    entries: [{ subjectCode: '6602', summary: '员工培训费', debit: 5000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 5000 }],
    documents: [
      { type: 'receipt', label: '培训发票', docTitle: '专 业 培 训 服 务 发 票', date: '2026-04-28', totalAmount: 5000, payer: '雲帆管理咨询有限公司', stampText: 'XX教育科技有限公司\n发票专用章', items: [{ name: 'PMP项目管理认证培训×2人', qty: 2, price: 2500, amount: 5000 }]}] },
  { date: '2026-04-29', role: 'accountant', title: '支付法律顾问年费', tags: ["费用管理"], difficulty: 1,
    description: '支付常年法律顾问服务费（半年），12,000元。',
    entries: [{ subjectCode: '6602', summary: '法律顾问费', debit: 12000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 12000 }],
    documents: [
      { type: 'receipt', label: '法律费发票', docTitle: '法 律 顾 问 服 务 发 票', date: '2026-04-29', totalAmount: 12000, payer: '雲帆管理咨询有限公司', stampText: 'XX律师事务所\n发票专用章', items: [{ name: '2026年常年法律顾问费（半年）', qty: 1, price: 12000, amount: 12000 }]},
      { type: 'bank', label: '转账回单', date: '2026-04-29', totalAmount: 12000, payer: '雲帆管理咨询有限公司', payeeName: 'XX律师事务所', content: '常年法律顾问费上半年', refNo: 'HD202604290011' }] },
  { date: '2026-04-29', role: 'accountant', title: '购入项目管理软件', tags: ["费用管理"], difficulty: 2,
    tip: '无形资产当月购入次月摊销。项目管理软件24,000元÷5年÷12月=400元/月。下月起计提。',
    description: '购入项目管理软件（永久许可）24,000元，5年摊销。次月起计提摊销，月摊销额400元。',
    entries: [{ subjectCode: '1701', summary: '购入项目管理软件', debit: 24000, credit: 0, explanation: '无形资产增加。购入项目管理软件（永久许可），按购入成本入账。' }, { subjectCode: '100201', summary: '支付软件款', debit: 0, credit: 24000, cashFlowItem: 'cf-inv', cashFlowExplanation: '购买无形资产支付的现金（配对科目1701），属于投资活动现金流出。', explanation: '银行存款减少。支付项目管理软件采购款，次月起开始摊销。' }], documents: [{ type: 'text', label: '增值税发票', docTitle: '增 值 税 发 票', date: '2026-04-29', stampText: '发票专用章', content: '发票代码：110024****\n开票日期：2026年04月29日\n\n购买方：雲帆管理咨询有限公司\n\n销售方：XX软件科技有限公司\n\n商品信息：\n  项目管理软件（永久许可） × 1套\n  金额：24,000.00元\n  税率：6%\n  税额：1,440.00元\n\n价税合计：贰万肆仟元整\n（小写）¥24,000.00' }, { type: 'bank', label: '付款回单', date: '2026-04-29', totalAmount: 24000, payer: '雲帆管理咨询有限公司', payerAccount: '6222 0200 **** 5678', payeeName: 'XX软件科技有限公司', content: '购入项目管理软件（永久许可）', refNo: 'HD202604290012' }]},
  { date: '2026-04-30', role: 'accountant', title: '模拟纳税申报', tags: ["税费", "期末"], difficulty: 1, entries: [], nextAction: 'tax-filing',
    documents: [{ type: 'text', label: '申报提醒', docTitle: '4 月 纳 税 申 报 提 醒', stampText: '财务专用章', content: '申报期间：2026年4月\n截止日期：2026年5月15日\n\n申报税种：\n1. 增值税（6%，销项税额13,200元）\n2. 城市维护建设税（7%）\n3. 教育费附加（3%+2%）\n4. 代扣代缴个人所得税\n\n请前往纳税申报页面核对后提交。' }] },
]

export default apr
