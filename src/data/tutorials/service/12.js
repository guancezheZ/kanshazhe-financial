/**
 * 服务业 12月 - 📊 年终决算
 * J项目终验、全年所得税汇算、盈余公积、利润分配、年终决算
 */

const dec = [
  { date: '2026-12-02', role: 'accountant', title: '发放11月员工工资', tags: ["工资社保"], difficulty: 1,
    entries: [{ subjectCode: '221101', summary: '发11月工资', debit: 195000, credit: 0 }, { subjectCode: '100201', summary: '实发', debit: 0, credit: 161000 }, { subjectCode: '224101', summary: '代扣社保', debit: 0, credit: 19500 }, { subjectCode: '224102', summary: '代扣公积金', debit: 0, credit: 10000 }, { subjectCode: '222110', summary: '代扣个税', debit: 0, credit: 4500 }],
    documents: [
      { type: 'bank', label: '代发工资回单', date: '2026-12-02', totalAmount: 161000, payer: '雲帆管理咨询有限公司', payeeName: '员工代发户', content: '11月工资代发（共52人）', refNo: 'HD202612020001' },
      { type: 'text', label: '工资表', docTitle: '11 月 工 资 发 放 表', date: '2026-12-02', stampText: '人力资源部\n工资专用章', content: '期间：2026年11月\n应发工资总额：195,000.00元\n扣款：社保19,500+公积金10,000+个税4,500=34,000元\n实发合计：161,000.00元（银行代发）\n\n制表：王出纳\n审核：李会计' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '期间',
          '2026年11月'
        ],
        [
          '应发工资总额',
          '195,000.00元'
        ],
        [
          '扣款',
          '社保19,500+公积金10,000+个税4,500=34,000元'
        ],
        [
          '实发合计',
          '161,000.00元（银行代发）'
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
  { date: '2026-12-03', role: 'accountant', title: '缴纳11月社保公积金', tags: ["工资社保"], difficulty: 1,
    entries: [{ subjectCode: '221102', summary: '企业社保', debit: 39500, credit: 0 }, { subjectCode: '224101', summary: '个人社保', debit: 19500, credit: 0 }, { subjectCode: '221102', summary: '企业公积金', debit: 19500, credit: 0 }, { subjectCode: '224102', summary: '个人公积金', debit: 10000, credit: 0 }, { subjectCode: '100201', summary: '支付', debit: 0, credit: 88500 }],
    documents: [
      { type: 'bank', label: '扣款回单', date: '2026-12-03', totalAmount: 88500, payer: '雲帆管理咨询有限公司', payeeName: '北京市社会保险基金管理中心', content: '11月社保+公积金缴纳', refNo: 'HD202612030002' }] },
  { date: '2026-12-04', role: 'accountant', title: '缴纳11月增值税及附加', tags: ["税费"], difficulty: 1,
    entries: [{ subjectCode: '222101', summary: '增值税', debit: 19200, credit: 0 }, { subjectCode: '222103', summary: '城建税', debit: 1344, credit: 0 }, { subjectCode: '222104', summary: '附加', debit: 960, credit: 0 }, { subjectCode: '100201', summary: '缴税', debit: 0, credit: 21504 }],
    documents: [
      { type: 'bank', label: '缴税回单', date: '2026-12-04', totalAmount: 21504, payer: '雲帆管理咨询有限公司', payeeName: '国家税务总局北京市税务局', content: '11月增值税及附加税缴纳', refNo: 'HD202612040003' }] },
  { date: '2026-12-05', role: 'accountant', title: '确认E年框12月收入', tags: ["项目核算"], difficulty: 2, description: '确认E公司年框收入20,000元，增值税6%=1,200元。',
    entries: [{ subjectCode: '2232', summary: 'E公司12月', debit: 21200, credit: 0 }, { subjectCode: '6001', summary: '年框收入', debit: 0, credit: 20000 }, { subjectCode: '222101', summary: '销项税额', debit: 0, credit: 1200 }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '北京', invoiceType: '专用', copy: '发票联', invoiceNo: '1100432140', date: '2026年12月05日', buyer: 'E集团公司', buyerTaxId: '91110108MAZZZZZZZ', seller: '雲帆管理咨询有限公司', sellerTaxId: '91110108MA3XXXXXXXX', stampText: '发票专用章', payee: '李四', reviewer: '王五', drawer: '赵六', lineItems: [{ name: '年度管理咨询服务（12月）', unit: '月', qty: 1, price: 20000, amount: 20000, taxRate: '6%', tax: 1200 }], totalAmount: 21200 }] },
  { date: '2026-12-06', role: 'accountant', title: '确认G运维12月收入', tags: ["项目核算"], difficulty: 2, description: '确认G公司运维收入15,000元，增值税6%=900元。',
    entries: [{ subjectCode: '2232', summary: 'G公司12月', debit: 15900, credit: 0 }, { subjectCode: '6001', summary: '运维收入', debit: 0, credit: 15000 }, { subjectCode: '222101', summary: '销项税额', debit: 0, credit: 900 }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '北京', invoiceType: '专用', copy: '发票联', invoiceNo: '1100432141', date: '2026年12月06日', buyer: 'G集团有限公司', buyerTaxId: '91110108MAKKKKKKK', seller: '雲帆管理咨询有限公司', sellerTaxId: '91110108MA3XXXXXXXX', stampText: '发票专用章', payee: '李四', reviewer: '王五', drawer: '赵六', lineItems: [{ name: 'IT运维服务（12月）', unit: '月', qty: 1, price: 15000, amount: 15000, taxRate: '6%', tax: 900 }], totalAmount: 15900 }] },
  { date: '2026-12-07', role: 'accountant', title: '确认H订阅12月收入', tags: ["项目核算"], difficulty: 2, description: '确认H公司SaaS订阅收入15,000元，增值税6%=900元。',
    entries: [{ subjectCode: '2232', summary: 'H公司12月', debit: 15900, credit: 0 }, { subjectCode: '6051', summary: 'SaaS收入', debit: 0, credit: 15000 }, { subjectCode: '222101', summary: '销项税额', debit: 0, credit: 900 }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '北京', invoiceType: '专用', copy: '发票联', invoiceNo: '1100432142', date: '2026年12月07日', buyer: 'H科技有限公司', buyerTaxId: '91110108MAHHHHHHH', seller: '雲帆管理咨询有限公司', sellerTaxId: '91110108MA3XXXXXXXX', stampText: '发票专用章', payee: '李四', reviewer: '王五', drawer: '赵六', lineItems: [{ name: '雲帆智能平台SaaS订阅（12月）', unit: '月', qty: 1, price: 15000, amount: 15000, taxRate: '6%', tax: 900 }], totalAmount: 15900 }] },
  { date: '2026-12-08', role: 'accountant', title: 'J项目终验交付', tags: ["项目核算"], difficulty: 2,
    description: 'J公司联合项目终验通过。终验收入200,000元（500,000-150,000-已确认部分）。增值税6%=12,000元。',
    entries: [{ subjectCode: '1122', summary: 'J公司终验款', debit: 212000, credit: 0 }, { subjectCode: '6001', summary: 'J终验收入', debit: 0, credit: 200000 }, { subjectCode: '222101', summary: '销项税额', debit: 0, credit: 12000 }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '北京', invoiceType: '专用', copy: '发票联', invoiceNo: '1100432143', date: '2026年12月08日', buyer: 'J实业集团有限公司', buyerTaxId: '91110108MAJJJJJJJ', seller: '雲帆管理咨询有限公司', sellerTaxId: '91110108MA3XXXXXXXX', stampText: '发票专用章', payee: '李四', reviewer: '王五', drawer: '赵六', lineItems: [{ name: '数字化转型实施（终验阶段）', unit: '项', qty: 1, price: 200000, amount: 200000, taxRate: '6%', tax: 12000 }], totalAmount: 212000 },
      { type: 'text', label: '终验报告', docTitle: '项 目 终 验 报 告', date: '2026-12-08', stampText: 'J实业集团有限公司\n项目验收专用章', content: '项目名称：数字化转型实施项目\n验收阶段：终验\n合同金额：500,000元\n已确认收入：150,000元（方案设计阶段）\n本次终验收入：200,000元（剩余尾款已在签约时预收100,000）\n验收结论：通过 ✓\n\n交付物：系统部署报告、用户培训记录、验收测试报告\n\n甲方代表：孙总\n乙方代表：王顾问\n分包方K公司确认：技术实施交付完成 ✓' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '项目名称',
          '数字化转型实施项目'
        ],
        [
          '验收阶段',
          '终验'
        ],
        [
          '合同金额',
          '500,000元'
        ],
        [
          '已确认收入',
          '150,000元（方案设计阶段）'
        ],
        [
          '本次终验收入',
          '200,000元（剩余尾款已在签约时预收100,000）'
        ],
        [
          '验收结论',
          '通过 ✓'
        ],
        [
          '交付物',
          '系统部署报告、用户培训记录、验收测试报告'
        ],
        [
          '甲方代表',
          '孙总'
        ],
        [
          '乙方代表',
          '王顾问'
        ],
        [
          '分包方K公司确认',
          '技术实施交付完成 ✓'
        ],
      ]}] },
  { date: '2026-12-09', role: 'accountant', title: '支付J项目K公司分包尾款', tags: ["项目核算"], difficulty: 2,
    description: 'J项目终验，支付K公司技术分包尾款200,000×50%=100,000元。',
    entries: [{ subjectCode: '520103', summary: 'K公司分包尾款', debit: 100000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 100000 }],
    documents: [
      { type: 'bank', label: '转账回单', date: '2026-12-09', totalAmount: 100000, payer: '雲帆管理咨询有限公司', payeeName: 'K科技有限公司', content: 'J项目分包尾款（终验后支付）', refNo: 'HD202612090004' },
      { type: 'text', label: '分包验收确认', docTitle: '分 包 工 作 验 收 确 认 书', date: '2026-12-09', stampText: '雲帆管理咨询有限公司\n项目专用章', content: '分包方：K科技有限公司\n项目：J公司数字化转型——技术实施部分（40%）\n分包金额：200,000元\n\n付款记录：\n  签约预付50%：100,000元（10月17日）\n  终验尾付50%：100,000元（本次）\n  合计：200,000元\n\n验收结论：K公司已完成全部技术实施工作，验收合格。' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '分包方',
          'K科技有限公司'
        ],
        [
          '项目',
          'J公司数字化转型——技术实施部分（40%）'
        ],
        [
          '分包金额',
          '200,000元'
        ],
        [
          '签约预付50%',
          '100,000元（10月17日）'
        ],
        [
          '终验尾付50%',
          '100,000元（本次）'
        ],
        [
          '合计',
          '200,000元'
        ],
        [
          '验收结论',
          'K公司已完成全部技术实施工作，验收合格。'
        ],
      ]}] },
  { date: '2026-12-10', role: 'accountant', title: '收到J公司终验款', tags: ["往来管理"], difficulty: 1,
    entries: [{ subjectCode: '100201', summary: 'J终验款', debit: 212000, credit: 0 }, { subjectCode: '1122', summary: 'J公司', debit: 0, credit: 212000 }],
    documents: [
      { type: 'bank', label: '收款回单', date: '2026-12-10', totalAmount: 212000, payer: 'J实业集团有限公司', payerAccount: '6222 0100 **** 4444', payeeName: '雲帆管理咨询有限公司', payeeAccount: '6222 0200 **** 1234', content: '数字化项目终验款', refNo: 'HD202612100005' }] },
  { date: '2026-12-11', role: 'accountant', title: '发放年终奖', tags: ["工资社保"], difficulty: 1,
    description: '发放11月计提的年终奖金120,000元。代扣个税12,000元，实发108,000元。',
    entries: [{ subjectCode: '221101', summary: '发年终奖', debit: 120000, credit: 0 }, { subjectCode: '100201', summary: '实发', debit: 0, credit: 108000 }, { subjectCode: '222110', summary: '代扣个税', debit: 0, credit: 12000 }],
    documents: [
      { type: 'bank', label: '代发奖金回单', date: '2026-12-11', totalAmount: 108000, payer: '雲帆管理咨询有限公司', payeeName: '员工代发户', content: '2026年度年终奖发放（共52人）', refNo: 'HD202612110006' },
      { type: 'text', label: '年终奖发放表', docTitle: '2026 年 度 年 终 奖 发 放 表', date: '2026-12-11', stampText: '人力资源部\n工资专用章', content: '年度：2026年\n应发总额：120,000.00元\n代扣个税：12,000.00元\n实发合计：108,000.00元（银行代发）\n\n制表：王出纳\n审核：李会计' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '年度',
          '2026年'
        ],
        [
          '应发总额',
          '120,000.00元'
        ],
        [
          '代扣个税',
          '12,000.00元'
        ],
        [
          '实发合计',
          '108,000.00元（银行代发）'
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
  { date: '2026-12-12', role: 'accountant', title: '支付12月写字楼租金', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '660205', summary: '房租', debit: 22000, credit: 0 }, { subjectCode: '660205', summary: '物业费', debit: 3000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 25000 }],
    documents: [
      { type: 'receipt', label: '房屋租赁收据', docTitle: '房 屋 租 赁 专 用 收 据', date: '2026-12-12', totalAmount: 25000, payer: '雲帆管理咨询有限公司', stampText: '北京XX物业管理有限公司\n财务专用章', items: [{ name: '望京XX大厦15层 12月租金', qty: 1, price: 22000, amount: 22000 }, { name: '12月物业管理费', qty: 1, price: 3000, amount: 3000 }]}] },
  { date: '2026-12-14', role: 'accountant', title: '自研平台摊销', tags: ["费用管理"], difficulty: 2,
    description: '首次计提自研平台无形资产摊销。原值185,000÷5年÷12月=3,083.33元。',
    entries: [{ subjectCode: '6602', summary: '自研平台摊销', debit: 3083, credit: 0 }, { subjectCode: '6602', summary: '其他摊销折旧', debit: 6020, credit: 0, explanation: '原SaaS3,000+外购软件400+其他折旧2,620。' }, { subjectCode: '1702', summary: '自研平台摊销', debit: 0, credit: 3083 }, { subjectCode: '1208', summary: '摊销', debit: 0, credit: 3000 }, { subjectCode: '1702', summary: '累计摊销', debit: 0, credit: 400 }, { subjectCode: '1602', summary: '折旧', debit: 0, credit: 2620 }],
    documents: [
      { type: 'text', label: '摊销折旧表', docTitle: '摊 销 折 旧 计 提 表', date: '2026-12-14', stampText: '财务专用章', content: '期间：2026年12月\n\n无形资产摊销：\n  自研智能平台：185,000÷5÷12=3,083.33元（首次计提）\n  外购软件：400.00元\n  小计：3,483.33元\nSaaS摊销：3,000.00元\n折旧合计：2,620.00元\n\n合计：9,103.33元\n\n制表：李会计' ,
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
          '自研智能平台',
          '185,000÷5÷12=3,083.33元（首次计提）'
        ],
        [
          '外购软件',
          '400.00元'
        ],
        [
          '小计',
          '3,483.33元'
        ],
        [
          'SaaS摊销',
          '3,000.00元'
        ],
        [
          '折旧合计',
          '2,620.00元'
        ],
        [
          '合计',
          '9,103.33元'
        ],
        [
          '制表',
          '李会计'
        ],
      ]}] },
  { date: '2026-12-15', role: 'accountant', title: '支付12月水电及网络', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '6602', summary: '水电费', debit: 5200, credit: 0 }, { subjectCode: '6602', summary: '网络费', debit: 2000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 7200 }],
    documents: [
      { type: 'receipt', label: '电费凭证', docTitle: '电 费 缴 费 凭 证', date: '2026-12-15', totalAmount: 5200, payer: '雲帆管理咨询有限公司', stampText: '国家电网\n电费收讫章', items: [{ name: '写字楼用电 5,200kWh×1.00元', qty: 5200, price: 1, amount: 5200 }]},
      { type: 'receipt', label: '通信费发票', docTitle: '通 信 服 务 发 票', date: '2026-12-15', totalAmount: 2000, payer: '雲帆管理咨询有限公司', stampText: '中国联通\n发票专用章', items: [{ name: '企业宽带+电话（12月）', qty: 1, price: 2000, amount: 2000 }]}] },
  { date: '2026-12-16', role: 'accountant', title: '银行手续费及利息', tags: ["资金管理"], difficulty: 1,
    entries: [{ subjectCode: '6603', summary: '手续费', debit: 700, credit: 0 }, { subjectCode: '100201', summary: '扣费', debit: 0, credit: 700 }, { subjectCode: '100201', summary: '结息', debit: 4000, credit: 0 }, { subjectCode: '6603', summary: '利息收入', debit: 0, credit: 4000 }],
    documents: [
      { type: 'bank', label: '扣费回单', date: '2026-12-16', totalAmount: 700, payer: '雲帆管理咨询有限公司', payeeName: '中国工商银行北京分行', content: '12月账户服务费及转账手续费', refNo: 'HD202612160007' },
      { type: 'bank', label: '结息回单', date: '2026-12-16', totalAmount: 4000, payer: '中国工商银行北京分行', payeeName: '雲帆管理咨询有限公司', content: '活期存款2026年12月结息', refNo: 'HD202612160008' }] },
  { date: '2026-12-17', role: 'accountant', title: '缴纳代扣个税', tags: ["税费"], difficulty: 1,
    entries: [{ subjectCode: '222110', summary: '个税', debit: 4500, credit: 0 }, { subjectCode: '100201', summary: '缴税', debit: 0, credit: 4500 }],
    documents: [
      { type: 'bank', label: '缴税回单', date: '2026-12-17', totalAmount: 4500, payer: '雲帆管理咨询有限公司', payeeName: '国家税务总局北京市税务局', content: '11月代扣代缴个人所得税', refNo: 'HD202612170009' }] },
  { date: '2026-12-18', role: 'accountant', title: '购买办公用品', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '660201', summary: '办公用品', debit: 2000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 2000 }],
    documents: [
      { type: 'receipt', label: '办公用品发票', docTitle: '办 公 用 品 发 票', date: '2026-12-18', totalAmount: 2000, payer: '雲帆管理咨询有限公司', stampText: '晨光文具\n发票专用章', items: [{ name: '年度办公用品补充采购', qty: 1, price: 2000, amount: 2000 }]}] },
  { date: '2026-12-19', role: 'accountant', title: '计提12月员工工资', tags: ["工资社保"], difficulty: 2,
    description: '计提12月工资。项目130,000+管理55,000=185,000元。',
    entries: [{ subjectCode: '520101', summary: '项目工资', debit: 130000, credit: 0 }, { subjectCode: '6602', summary: '管理工资', debit: 55000, credit: 0 }, { subjectCode: '221101', summary: '应付工资', debit: 0, credit: 185000 }],
    documents: [
      { type: 'text', label: '工资计算表', docTitle: '12 月 工 资 计 算 汇 总 表', date: '2026-12-19', stampText: '人力资源部\n工资专用章', content: '期间：2026年12月\n\n项目人员：130,000元（J项目收尾+E/G维护）\n管理人员：55,000元\n\n应发合计：185,000元\n\n制表：王出纳\n审核：李会计' ,
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
          '项目人员',
          '130,000元（J项目收尾+E/G维护）'
        ],
        [
          '管理人员',
          '55,000元'
        ],
        [
          '应发合计',
          '185,000元'
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
  { date: '2026-12-20', role: 'accountant', title: '计提社保公积金', tags: ["工资社保"], difficulty: 2, description: '计提企业社保及公积金，合计56,000元。',
    entries: [{ subjectCode: '520101', summary: '项目社保', debit: 26000, credit: 0 }, { subjectCode: '520101', summary: '项目公积金', debit: 13000, credit: 0 }, { subjectCode: '6602', summary: '管理社保', debit: 11500, credit: 0 }, { subjectCode: '6602', summary: '管理公积金', debit: 5500, credit: 0 }, { subjectCode: '221102', summary: '应付社保', debit: 0, credit: 37500 }, { subjectCode: '221102', summary: '应付公积金', debit: 0, credit: 18500 }],
    documents: [
      { type: 'text', label: '社保公积金计提表', docTitle: '社 保 公 积 金 计 提 汇 总 表', date: '2026-12-20', stampText: '财务专用章', content: '期间：2026年12月\n\n社保（企业部分）：\n  项目人员：26,000元\n  管理人员：11,500元\n  小计：37,500元\n\n公积金（企业部分）：\n  项目人员：13,000元\n  管理人员：5,500元\n  小计：18,500元\n\n合计：56,000元\n\n制表：李会计' ,
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
          '项目人员',
          '26,000元'
        ],
        [
          '管理人员',
          '11,500元'
        ],
        [
          '小计',
          '37,500元'
        ],
        [
          '项目人员',
          '13,000元'
        ],
        [
          '管理人员',
          '5,500元'
        ],
        [
          '小计',
          '18,500元'
        ],
        [
          '合计',
          '56,000元'
        ],
        [
          '制表',
          '李会计'
        ],
      ]}] },
  { date: '2026-12-21', role: 'accountant', title: '计提12月城建税及附加', tags: ["税费"], difficulty: 2,
    description: '销项税额=1,200+900+900+12,000=15,000。',
    entries: [{ subjectCode: '6403', summary: '城建税', debit: 1050, credit: 0 }, { subjectCode: '6403', summary: '教育附加', debit: 450, credit: 0 }, { subjectCode: '6403', summary: '地方教育附加', debit: 300, credit: 0 }, { subjectCode: '222103', summary: '应交城建税', debit: 0, credit: 1050 }, { subjectCode: '222104', summary: '应交附加', debit: 0, credit: 750 }],
    documents: [
      { type: 'text', label: '税费计算表', docTitle: '城 建 税 及 教 育 附 加 计 提 表', date: '2026-12-21', stampText: '财务专用章', content: '期间：2026年12月\n计税依据：应纳增值税15,000.00元\n\n城建税（7%）：15,000×7%=1,050.00元\n教育附加（3%）：15,000×3%=450.00元\n地方教育附加（2%）：15,000×2%=300.00元\n\n合计：1,800.00元\n\n制表：李会计' ,
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
          '计税依据',
          '应纳增值税15,000.00元'
        ],
        [
          '城建税（7%）',
          '15,000×7%=1,050.00元'
        ],
        [
          '教育附加（3%）',
          '15,000×3%=450.00元'
        ],
        [
          '地方教育附加（2%）',
          '15,000×2%=300.00元'
        ],
        [
          '合计',
          '1,800.00元'
        ],
        [
          '制表',
          '李会计'
        ],
      ]}] },
  { date: '2026-12-22', role: 'accountant', title: '计提年度企业所得税', tags: ["税费"], difficulty: 3,
    description: '全年利润总额估算约800,000元。全年所得税=800,000×25%=200,000元。已预缴(Q1 17,500+Q2 20,000+Q3 15,000)=52,500。12月需计提147,500元。',
    entries: [{ subjectCode: '6801', summary: '年度所得税费用', debit: 147500, credit: 0 }, { subjectCode: '222106', summary: '应交年度所得税', debit: 0, credit: 147500 }],
    documents: [
      { type: 'text', label: '所得税计算表', docTitle: '2026 年 度 企 业 所 得 税 汇 算 表', date: '2026-12-22', stampText: '财务专用章', content: '年度：2026年\n\n全年利润总额估算：800,000.00元\n适用税率：25%\n全年应纳所得税：800,000×25%=200,000.00元\n\n已预缴：\n  Q1：17,500元\n  Q2：20,000元\n  Q3：15,000元\n  小计：52,500元\n\n12月需补提：200,000-52,500=147,500.00元\n\n制表：李会计\n审核：赵会计主管' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '年度',
          '2026年'
        ],
        [
          '全年利润总额估算',
          '800,000.00元'
        ],
        [
          '适用税率',
          '25%'
        ],
        [
          '全年应纳所得税',
          '800,000×25%=200,000.00元'
        ],
        [
          'Q1',
          '17,500元'
        ],
        [
          'Q2',
          '20,000元'
        ],
        [
          'Q3',
          '15,000元'
        ],
        [
          '小计',
          '52,500元'
        ],
        [
          '12月需补提',
          '200,000-52,500=147,500.00元'
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
  { date: '2026-12-23', role: 'accountant', title: '期末结转劳务成本', tags: ["项目核算", "期末"], difficulty: 3,
    description: '结转J项目成本：人工80,000+分包100,000=180,000。',
    entries: [{ subjectCode: '6401', summary: '结转J人工', debit: 80000, credit: 0 }, { subjectCode: '6401', summary: '结转J分包', debit: 100000, credit: 0 }, { subjectCode: '520101', summary: '转人工', debit: 0, credit: 80000 }, { subjectCode: '520103', summary: '转分包', debit: 0, credit: 100000 }],
    documents: [
      { type: 'text', label: '成本计算表', docTitle: '项 目 成 本 结 转 计 算 表', date: '2026-12-23', stampText: '财务专用章', content: '结转期间：2026年12月\n\nJ公司项目（终验收入200,000元对应成本）：\n  人工成本（全额）：80,000元\n  分包成本（全额）：100,000元\n  合计：180,000元\n\n项目毛利率：（200,000-180,000）÷200,000=10%\n\n制表：李会计' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '结转期间',
          '2026年12月'
        ],
        [
          '人工成本（全额）',
          '80,000元'
        ],
        [
          '分包成本（全额）',
          '100,000元'
        ],
        [
          '合计',
          '180,000元'
        ],
        [
          '项目毛利率',
          '（200,000-180,000）÷200,000=10%'
        ],
        [
          '制表',
          '李会计'
        ],
      ]}] },
  { date: '2026-12-24', role: 'accountant', title: '12月期间损益结转', tags: ["期末"], difficulty: 3,
    description: '收入：E20,000+G15,000+H15,000+J200,000=250,000。',
    entries: [{ subjectCode: '6001', summary: '转主营收入', debit: 235000, credit: 0 }, { subjectCode: '6051', summary: '转其他收入', debit: 15000, credit: 0 }, { subjectCode: '4103', summary: '收入转入', debit: 0, credit: 250000 },
      { subjectCode: '4103', summary: '费用转入', debit: 239800, credit: 0 }, { subjectCode: '6401', summary: '转成本', debit: 0, credit: 180000 }, { subjectCode: '6403', summary: '转税金', debit: 0, credit: 1800 }, { subjectCode: '6602', summary: '转管理费', debit: 0, credit: 58000 }],
    documents: [
      { type: 'text', label: '结转表', docTitle: '12 月 期 间 损 益 结 转 表', date: '2026-12-24', stampText: '已结转', content: '结转期间：2026年12月\n\n收入类→本年利润：\n  主营业务收入：235,000元（E20,000+G15,000+J200,000）\n  其他业务收入：15,000元（H订阅）\n  合计：250,000元\n\n费用类→本年利润：\n  主营业务成本：180,000元\n  税金及附加：1,800元\n  管理费用（含摊销折旧）：58,000元\n  合计：239,800元\n\n本月净利润：10,200元\n\n制表：李会计' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '结转期间',
          '2026年12月'
        ],
        [
          '主营业务收入',
          '235,000元（E20,000+G15,000+J200,000）'
        ],
        [
          '其他业务收入',
          '15,000元（H订阅）'
        ],
        [
          '合计',
          '250,000元'
        ],
        [
          '主营业务成本',
          '180,000元'
        ],
        [
          '税金及附加',
          '1,800元'
        ],
        [
          '管理费用（含摊销折旧）',
          '58,000元'
        ],
        [
          '合计',
          '239,800元'
        ],
        [
          '本月净利润',
          '10,200元'
        ],
        [
          '制表',
          '李会计'
        ],
      ]}] },
  { date: '2026-12-25', role: 'accountant', title: '年末结转本年利润至利润分配', tags: ["期末"], difficulty: 3,
    tip: '年度终了，将本年利润余额结转至利润分配-未分配利润。借：本年利润，贷：利润分配-未分配利润（亏损则相反）。',
    description: '全年净利润=800,000-200,000（所得税）=600,000元。结转至利润分配-未分配利润。',
    entries: [{ subjectCode: '4103', summary: '结转全年净利润', debit: 600000, credit: 0, explanation: '本年利润结转。' }, { subjectCode: '4104', summary: '转入未分配利润', debit: 0, credit: 600000, explanation: '利润分配——未分配利润增加。' }],
    documents: [
      { type: 'text', label: '年终结转表', docTitle: '年 末 本 年 利 润 结 转 表', date: '2026-12-25', stampText: '财务专用章\n已年结', content: '年度：2026年\n\n全年收入合计：约2,000,000元\n全年成本费用合计：约1,200,000元\n全年利润总额：约800,000元\n全年所得税费用：200,000元\n全年净利润：600,000元\n\n账务处理：\n借：本年利润 600,000\n贷：利润分配——未分配利润 600,000\n\n制表：李会计\n审核：赵会计主管' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '年度',
          '2026年'
        ],
        [
          '全年收入合计',
          '约2,000,000元'
        ],
        [
          '全年成本费用合计',
          '约1,200,000元'
        ],
        [
          '全年利润总额',
          '约800,000元'
        ],
        [
          '全年所得税费用',
          '200,000元'
        ],
        [
          '全年净利润',
          '600,000元'
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
  { date: '2026-12-26', role: 'accountant', title: '提取法定盈余公积', tags: ["期末"], difficulty: 3,
    tip: '按净利润的10%提取法定盈余公积。借：利润分配-提取法定盈余公积，贷：盈余公积。',
    description: '按净利润600,000元的10%提取法定盈余公积60,000元。',
    entries: [{ subjectCode: '4104', summary: '提取法定盈余公积', debit: 60000, credit: 0, explanation: '利润分配减少。' }, { subjectCode: '4101', summary: '法定盈余公积', debit: 0, credit: 60000, explanation: '盈余公积——法定盈余公积增加。' }],
    documents: [
      { type: 'text', label: '盈余公积提取表', docTitle: '法 定 盈 余 公 积 提 取 表', date: '2026-12-26', stampText: '财务专用章\n股东会决议附件', content: '年度：2026年\n计提基础：全年净利润600,000.00元\n提取比例：10%（公司法规定）\n提取金额：600,000×10%=60,000.00元\n\n法律依据：《公司法》第166条\n\n制表：李会计\n审核：赵会计主管' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '年度',
          '2026年'
        ],
        [
          '计提基础',
          '全年净利润600,000.00元'
        ],
        [
          '提取比例',
          '10%（公司法规定）'
        ],
        [
          '提取金额',
          '600,000×10%=60,000.00元'
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
      ]}] },
  { date: '2026-12-27', role: 'accountant', title: '提取任意盈余公积', tags: ["期末"], difficulty: 3,
    tip: '按净利润的5%提取任意盈余公积（股东会决议）。',
    description: '按净利润600,000元的5%提取任意盈余公积30,000元。',
    entries: [{ subjectCode: '4104', summary: '提取任意盈余公积', debit: 30000, credit: 0 }, { subjectCode: '4101', summary: '任意盈余公积', debit: 0, credit: 30000 }],
    documents: [
      { type: 'text', label: '任意盈余公积提取表', docTitle: '任 意 盈 余 公 积 提 取 表', date: '2026-12-27', stampText: '财务专用章\n股东会决议附件', content: '年度：2026年\n计提基础：全年净利润600,000.00元\n提取比例：5%（股东会决议通过）\n提取金额：600,000×5%=30,000.00元\n\n股东会决议：2026年12月27日临时股东会通过。\n\n制表：李会计\n审核：赵会计主管' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '年度',
          '2026年'
        ],
        [
          '计提基础',
          '全年净利润600,000.00元'
        ],
        [
          '提取比例',
          '5%（股东会决议通过）'
        ],
        [
          '提取金额',
          '600,000×5%=30,000.00元'
        ],
        [
          '股东会决议',
          '2026年12月27日临时股东会通过。'
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
  { date: '2026-12-28', role: 'accountant', title: '计提应付股利', tags: ["期末"], difficulty: 3,
    tip: '根据股东会决议，计提应分配给股东的股利。借：利润分配，贷：应付股利。',
    description: '经股东会决议，计提应付投资者股利200,000元。',
    entries: [{ subjectCode: '4104', summary: '计提应付股利', debit: 200000, credit: 0 }, { subjectCode: '2232', summary: '应付股利', debit: 0, credit: 200000, explanation: '注意：2232原为合同负债，此处暂用。实际应用中可用"应付股利"科目。' }],
    documents: [
      { type: 'text', label: '股利分配方案', docTitle: '2026 年 度 股 利 分 配 方 案', date: '2026-12-28', stampText: '股东会决议\n专用章', content: '年度：2026年\n全年净利润：600,000.00元\n\n分配方案（经2026年12月28日股东会决议通过）：\n1. 提取法定盈余公积（10%）：60,000元\n2. 提取任意盈余公积（5%）：30,000元\n3. 计提应付股利：200,000元\n4. 剩余未分配利润：310,000元（留作企业发展）\n\n股东签字：王某、李某、张某' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '年度',
          '2026年'
        ],
        [
          '全年净利润',
          '600,000.00元'
        ],
        [
          '股东签字',
          '王某、李某、张某'
        ],
      ]}] },
  { date: '2026-12-29', role: 'accountant', title: '年终财务分析·出具年度报告', tags: ["期末"], difficulty: 3,
    description: '全年业务总结：累计收入约2,000,000元，净利润约600,000元。年末未分配利润=600,000-90,000(盈余公积)-200,000(应付股利)=310,000元。',
    entries: [],
    documents: [
      { type: 'text', label: '年度财务报告', docTitle: '2026 年 度 财 务 分 析 报 告', date: '2026-12-29', stampText: '雲帆管理咨询有限公司\n财务专用章', content: '2026年度财务总结（雲帆管理咨询有限公司）\n\n一、经营成果\n全年营业收入：约2,000,000元\n  管理咨询：约1,400,000元（B公司200,000+C公司212,000+D公司100,000+E公司240,000+F公司350,000+I公司280,000）\n  IT运维：180,000元（G公司）\n  SaaS订阅：180,000元（H公司）\n  数字化实施：500,000元（J公司含分包）\n\n二、成本费用\n全年主营业务成本：约700,000元\n全年管理费用：约300,000元\n全年销售费用：约100,000元\n全年研发费用：约100,000元\n\n三、利润\n全年利润总额：约800,000元\n所得税费用：200,000元\n全年净利润：600,000元\n\n四、利润分配\n法定盈余公积（10%）：60,000元\n任意盈余公积（5%）：30,000元\n应付股利：200,000元\n年末未分配利润：310,000元\n\n五、主要项目\nB公司战略咨询（1-3月完工）：收入200,000元\nC公司IT咨询（3-5月完工）：收入212,000元\nD公司内训（3月完成）：收入100,000元\nE公司年框（4-12月）：收入200,000元（本年占10个月）\nF公司数字化转型（5-7月完工）：收入350,000元\nG公司IT运维（7月签约）：收入75,000元（本年5个月）\nH公司SaaS订阅（8月签约）：收入60,000元（本年5个月）\nI公司战略绩效（9-11月完工）：收入280,000元\nJ公司数字化实施（10-12月完工）：收入350,000元（本年确认）\n\n六、财务状况（截至12月31日）\n货币资金充裕，无银行借款\n应收账款：已全部回款\n无形资产：185,000元（自研平台）\n\n制表：李会计\n审核：赵会计主管\n批准：总经理' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '全年营业收入',
          '约2,000,000元'
        ],
        [
          '管理咨询',
          '约1,400,000元（B公司200,000+C公司212,000+D公司100,000+E公司240,000+F公司350,000+I公司280,000）'
        ],
        [
          'IT运维',
          '180,000元（G公司）'
        ],
        [
          'SaaS订阅',
          '180,000元（H公司）'
        ],
        [
          '数字化实施',
          '500,000元（J公司含分包）'
        ],
        [
          '全年主营业务成本',
          '约700,000元'
        ],
        [
          '全年管理费用',
          '约300,000元'
        ],
        [
          '全年销售费用',
          '约100,000元'
        ],
        [
          '全年研发费用',
          '约100,000元'
        ],
        [
          '全年利润总额',
          '约800,000元'
        ],
        [
          '所得税费用',
          '200,000元'
        ],
        [
          '全年净利润',
          '600,000元'
        ],
        [
          '法定盈余公积（10%）',
          '60,000元'
        ],
        [
          '任意盈余公积（5%）',
          '30,000元'
        ],
        [
          '应付股利',
          '200,000元'
        ],
        [
          '年末未分配利润',
          '310,000元'
        ],
        [
          'B公司战略咨询（1-3月完工）',
          '收入200,000元'
        ],
        [
          'C公司IT咨询（3-5月完工）',
          '收入212,000元'
        ],
        [
          'D公司内训（3月完成）',
          '收入100,000元'
        ],
        [
          'E公司年框（4-12月）',
          '收入200,000元（本年占10个月）'
        ],
        [
          'F公司数字化转型（5-7月完工）',
          '收入350,000元'
        ],
        [
          'G公司IT运维（7月签约）',
          '收入75,000元（本年5个月）'
        ],
        [
          'H公司SaaS订阅（8月签约）',
          '收入60,000元（本年5个月）'
        ],
        [
          'I公司战略绩效（9-11月完工）',
          '收入280,000元'
        ],
        [
          'J公司数字化实施（10-12月完工）',
          '收入350,000元（本年确认）'
        ],
        [
          '应收账款',
          '已全部回款'
        ],
        [
          '无形资产',
          '185,000元（自研平台）'
        ],
        [
          '制表',
          '李会计'
        ],
        [
          '审核',
          '赵会计主管'
        ],
        [
          '批准',
          '总经理'
        ],
      ]}] },
  { date: '2026-12-30', role: 'accountant', title: '提取备用金', tags: ["资金管理"], difficulty: 1,
    entries: [{ subjectCode: '1001', summary: '备用金', debit: 5000, credit: 0 }, { subjectCode: '100201', summary: '提现', debit: 0, credit: 5000 }],
    documents: [
      { type: 'bank', label: '现金支票回单', date: '2026-12-30', totalAmount: 5000, payer: '雲帆管理咨询有限公司', payeeName: '雲帆管理咨询有限公司（现金）', content: '提取备用金', refNo: 'HD202612300010' }] },
  { date: '2026-12-31', role: 'accountant', title: '模拟纳税申报', tags: ["税费", "期末"], difficulty: 1, entries: [], nextAction: 'tax-filing',
    documents: [{ type: 'text', label: '申报提醒', docTitle: '12 月 及 年 度 所 得 税 汇 算 缴 申 报 提 醒', stampText: '财务专用章', content: '申报期间：2026年12月（年度汇算）\n截止日期：2027年1月15日（增值税）\n            2027年5月31日（所得税汇算清缴）\n\n申报税种：\n1. 增值税（6%，销项税额15,000元）\n2. 城市维护建设税（7%）\n3. 教育费附加（3%+2%）\n4. 代扣代缴个人所得税\n5. 2026年度企业所得税汇算清缴（已预缴52,500，全年应纳税200,000，12月补提147,500）\n\n请前往纳税申报页面核对后提交。' }] },
]

export default dec
