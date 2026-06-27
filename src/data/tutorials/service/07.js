/**
 * 服务业 7月 - 🔬 研发投入·自主研发
 * 启动管理软件自主研发、研发支出归集、资本化判断、F项目终验
 */

const jul = [
  { date: '2026-07-02', role: 'accountant', title: '发放6月员工工资', tags: ["工资社保"], difficulty: 1,
    entries: [{ subjectCode: '221101', summary: '发6月工资', debit: 208000, credit: 0 }, { subjectCode: '100201', summary: '实发', debit: 0, credit: 172000 }, { subjectCode: '224101', summary: '代扣社保', debit: 0, credit: 20000 }, { subjectCode: '224102', summary: '代扣公积金', debit: 0, credit: 11000 }, { subjectCode: '222110', summary: '代扣个税', debit: 0, credit: 5000 }],
    documents: [
      { type: 'bank', label: '代发工资回单', date: '2026-07-02', totalAmount: 172000, payer: '雲帆管理咨询有限公司', payeeName: '员工代发户', content: '6月工资代发（共50人）', refNo: 'HD202607020001' },
      { type: 'text', label: '工资表', docTitle: '6 月 工 资 发 放 表', date: '2026-07-02', stampText: '人力资源部\n工资专用章', content: '期间：2026年6月\n应发工资总额：208,000.00元\n扣款：社保20,000+公积金11,000+个税5,000=36,000元\n实发合计：172,000.00元（银行代发）\n\n制表：王出纳\n审核：李会计' ,
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
          '应发工资总额',
          '208,000.00元'
        ],
        [
          '扣款',
          '社保20,000+公积金11,000+个税5,000=36,000元'
        ],
        [
          '实发合计',
          '172,000.00元（银行代发）'
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
  { date: '2026-07-03', role: 'accountant', title: '缴纳6月社保公积金', tags: ["工资社保"], difficulty: 1,
    entries: [{ subjectCode: '221102', summary: '企业社保', debit: 42000, credit: 0 }, { subjectCode: '224101', summary: '个人社保', debit: 20000, credit: 0 }, { subjectCode: '221102', summary: '企业公积金', debit: 21000, credit: 0 }, { subjectCode: '224102', summary: '个人公积金', debit: 11000, credit: 0 }, { subjectCode: '100201', summary: '支付', debit: 0, credit: 94000 }],
    documents: [
      { type: 'bank', label: '扣款回单', date: '2026-07-03', totalAmount: 94000, payer: '雲帆管理咨询有限公司', payeeName: '北京市社会保险基金管理中心', content: '6月社保+公积金缴纳', refNo: 'HD202607030002' }] },
  { date: '2026-07-04', role: 'accountant', title: '缴纳6月增值税及附加税', tags: ["税费"], difficulty: 1,
    entries: [{ subjectCode: '222101', summary: '增值税', debit: 8400, credit: 0 }, { subjectCode: '222103', summary: '城建税', debit: 588, credit: 0 }, { subjectCode: '222104', summary: '附加', debit: 420, credit: 0 }, { subjectCode: '100201', summary: '缴税', debit: 0, credit: 9408 }],
    documents: [
      { type: 'bank', label: '缴税回单', date: '2026-07-04', totalAmount: 9408, payer: '雲帆管理咨询有限公司', payeeName: '国家税务总局北京市税务局', content: '6月增值税及附加税缴纳', refNo: 'HD202607040003' }] },
  { date: '2026-07-05', role: 'accountant', title: '缴纳Q2企业所得税', tags: ["税费"], difficulty: 1,
    description: '缴纳Q2预缴企业所得税20,000元。',
    entries: [{ subjectCode: '222106', summary: 'Q2所得税', debit: 20000, credit: 0 }, { subjectCode: '100201', summary: '缴税', debit: 0, credit: 20000 }],
    documents: [
      { type: 'bank', label: '缴税回单', date: '2026-07-05', totalAmount: 20000, payer: '雲帆管理咨询有限公司', payeeName: '国家税务总局北京市税务局', content: '2026年Q2预缴企业所得税', refNo: 'HD202607050004' }] },
  { date: '2026-07-07', role: 'accountant', title: 'F项目终验交付·确认终验收入', tags: ["项目核算"], difficulty: 2,
    description: 'F公司数字化转型项目终验，确认尾款收入130,000元（合同350,000-100,000-120,000=130,000）。增值税6%=7,800元。',
    entries: [{ subjectCode: '1122', summary: 'F公司终验款', debit: 137800, credit: 0 }, { subjectCode: '6001', summary: '终验收入', debit: 0, credit: 130000 }, { subjectCode: '222101', summary: '销项税额', debit: 0, credit: 7800 }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '北京', invoiceType: '专用', copy: '发票联', invoiceNo: '1100432123', date: '2026年07月07日', buyer: 'F新零售有限公司', buyerTaxId: '91110108MAYYYYYYY', seller: '雲帆管理咨询有限公司', sellerTaxId: '91110108MA3XXXXXXXX', stampText: '发票专用章', payee: '李四', reviewer: '王五', drawer: '赵六', lineItems: [{ name: '数字化转型咨询服务（终验阶段）', unit: '项', qty: 1, price: 130000, amount: 130000, taxRate: '6%', tax: 7800 }], totalAmount: 137800 },
      { type: 'text', label: '终验报告', docTitle: '项 目 终 验 报 告', date: '2026-07-07', stampText: 'F新零售有限公司\n项目验收专用章', content: '项目名称：F公司数字化转型咨询\n验收阶段：终验（整体验收）\n合同金额：350,000元\n已确认收入：100,000（启动）+120,000（中期）=220,000元\n本次确认：130,000元\n\n验收结论：通过 ✓\n交付物：系统上线报告、业务运营数据、培训记录\n\n甲方代表：刘总\n乙方代表：王顾问' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '项目名称',
          'F公司数字化转型咨询'
        ],
        [
          '验收阶段',
          '终验（整体验收）'
        ],
        [
          '合同金额',
          '350,000元'
        ],
        [
          '已确认收入',
          '100,000（启动）+120,000（中期）=220,000元'
        ],
        [
          '本次确认',
          '130,000元'
        ],
        [
          '验收结论',
          '通过 ✓'
        ],
        [
          '交付物',
          '系统上线报告、业务运营数据、培训记录'
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
  { date: '2026-07-08', role: 'accountant', title: '收到F公司终验款', tags: ["往来管理"], difficulty: 1,
    entries: [{ subjectCode: '100201', summary: 'F终验款', debit: 137800, credit: 0 }, { subjectCode: '1122', summary: 'F公司', debit: 0, credit: 137800 }],
    documents: [
      { type: 'bank', label: '收款回单', date: '2026-07-08', totalAmount: 137800, payer: 'F新零售有限公司', payerAccount: '6222 0300 **** 5555', payeeName: '雲帆管理咨询有限公司', payeeAccount: '6222 0200 **** 1234', content: '数字化转型项目终验尾款', refNo: 'HD202607080005' }] },
  { date: '2026-07-09', role: 'accountant', title: '启动自主研发·立项管理软件', tags: ["项目核算"], difficulty: 2,
    tip: '自主研发项目先通过研发支出科目归集费用。开发阶段符合资本化条件的支出计入无形资产。',
    description: '公司决定自主研发"雲帆智能管理分析平台"，立项启动。预计研发周期6个月，总预算600,000元。本月研发人员工资50,000元先归集至研发支出。',
    entries: [{ subjectCode: '530102', summary: '研发支出-人工', debit: 50000, credit: 0, explanation: '研发支出——费用化支出增加。研究阶段支出全部费用化。' }, { subjectCode: '221101', summary: '应付研发工资', debit: 0, credit: 50000 }],
    documents: [
      { type: 'text', label: '立项报告', docTitle: '研 发 项 目 立 项 申 请 书', date: '2026-07-09', stampText: '雲帆管理咨询有限公司\n技术研发部', content: '项目名称：雲帆智能管理分析平台 V1.0\n研发周期：2026年7月—2026年12月（6个月）\n总预算：600,000元\n研发目标：开发面向中小企业的一站式管理分析SaaS平台\n\n立项审批：\n技术部：✓\n财务部：✓\n总经理：批准\n\n本月研发人员工资：50,000元（3名开发工程师）' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '项目名称',
          '雲帆智能管理分析平台 V1.0'
        ],
        [
          '研发周期',
          '2026年7月—2026年12月（6个月）'
        ],
        [
          '总预算',
          '600,000元'
        ],
        [
          '研发目标',
          '开发面向中小企业的一站式管理分析SaaS平台'
        ],
        [
          '技术部',
          '✓'
        ],
        [
          '财务部',
          '✓'
        ],
        [
          '总经理',
          '批准'
        ],
        [
          '本月研发人员工资',
          '50,000元（3名开发工程师）'
        ],
      ]}] },
  { date: '2026-07-10', role: 'accountant', title: '确认E公司年框7月收入', tags: ["项目核算"], difficulty: 2, description: '确认E公司年框7月收入。金额合计21,200元。',
    entries: [{ subjectCode: '2232', summary: 'E公司7月', debit: 21200, credit: 0 }, { subjectCode: '6001', summary: '年框收入', debit: 0, credit: 20000 }, { subjectCode: '222101', summary: '销项税额', debit: 0, credit: 1200 }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '北京', invoiceType: '专用', copy: '发票联', invoiceNo: '1100432124', date: '2026年07月10日', buyer: 'E集团公司', buyerTaxId: '91110108MAZZZZZZZ', seller: '雲帆管理咨询有限公司', sellerTaxId: '91110108MA3XXXXXXXX', stampText: '发票专用章', payee: '李四', reviewer: '王五', drawer: '赵六', lineItems: [{ name: '年度管理咨询服务（7月）', unit: '月', qty: 1, price: 20000, amount: 20000, taxRate: '6%', tax: 1200 }], totalAmount: 21200 }] },
  { date: '2026-07-11', role: 'accountant', title: '支付7月写字楼租金', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '660205', summary: '房租', debit: 22000, credit: 0 }, { subjectCode: '660205', summary: '物业费', debit: 3000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 25000 }],
    documents: [
      { type: 'receipt', label: '房屋租赁收据', docTitle: '房 屋 租 赁 专 用 收 据', date: '2026-07-11', totalAmount: 25000, payer: '雲帆管理咨询有限公司', stampText: '北京XX物业管理有限公司\n财务专用章', items: [{ name: '望京XX大厦15层 7月租金', qty: 1, price: 22000, amount: 22000 }, { name: '7月物业管理费', qty: 1, price: 3000, amount: 3000 }]}] },
  { date: '2026-07-12', role: 'accountant', title: '研发服务器及云资源采购', tags: ["项目核算"], difficulty: 2,
    description: '为研发项目采购云服务器及开发工具，费用15,000元。计入研发支出。',
    entries: [{ subjectCode: '530102', summary: '研发支出-云资源', debit: 15000, credit: 0, explanation: '研发支出增加。开发阶段硬件及云资源支出。' }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 15000 }],
    documents: [
      { type: 'receipt', label: '云服务发票', docTitle: '云 计 算 服 务 发 票', date: '2026-07-12', totalAmount: 10000, payer: '雲帆管理咨询有限公司', stampText: '阿里云计算有限公司\n发票专用章', items: [{ name: 'ECS云服务器 4台×2月', qty: 8, price: 1250, amount: 10000 }]},
      { type: 'receipt', label: '开发工具发票', docTitle: '软 件 开 发 工 具 发 票', date: '2026-07-12', totalAmount: 5000, payer: '雲帆管理咨询有限公司', stampText: 'JetBrains中国\n发票专用章', items: [{ name: 'All Products Pack 年度授权', qty: 1, price: 5000, amount: 5000 }]}] },
  { date: '2026-07-14', role: 'accountant', title: '支付7月水电及网络费', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '660205', summary: '水电费', debit: 4800, credit: 0 }, { subjectCode: '660205', summary: '网络费', debit: 2000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 6800 }],
    documents: [
      { type: 'receipt', label: '电费凭证', docTitle: '电 费 缴 费 凭 证', date: '2026-07-14', totalAmount: 4800, payer: '雲帆管理咨询有限公司', stampText: '国家电网\n电费收讫章', items: [{ name: '写字楼用电 4,800kWh×1.00元', qty: 4800, price: 1, amount: 4800 }]},
      { type: 'receipt', label: '通信费发票', docTitle: '通 信 服 务 发 票', date: '2026-07-14', totalAmount: 2000, payer: '雲帆管理咨询有限公司', stampText: '中国联通\n发票专用章', items: [{ name: '企业宽带（7月）', qty: 1, price: 2000, amount: 2000 }]}] },
  { date: '2026-07-15', role: 'accountant', title: '摊销及折旧', tags: ["费用管理"], difficulty: 2, description: '摊销6000元+折旧5240元，合计11240元。',
    entries: [{ subjectCode: '660205', summary: '摊销', debit: 3000, credit: 0 }, { subjectCode: '660205', summary: '折旧', debit: 2620, credit: 0, explanation: '含新增电脑折旧' }, { subjectCode: '1208', summary: '摊销', debit: 0, credit: 3000 }, { subjectCode: '1602', summary: '折旧', debit: 0, credit: 2620 }],
    documents: [
      { type: 'text', label: '摊销折旧表', docTitle: '摊 销 折 旧 计 提 表', date: '2026-07-15', stampText: '财务专用章', content: '期间：2026年7月\n\nSaaS摊销：36,000÷12=3,000.00元\n折旧合计：2,620.00元（含3月新购办公桌椅及5月新电脑）\n\n合计：5,620.00元\n\n制表：李会计' ,
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
          'SaaS摊销',
          '36,000÷12=3,000.00元'
        ],
        [
          '折旧合计',
          '2,620.00元（含3月新购办公桌椅及5月新电脑）'
        ],
        [
          '合计',
          '5,620.00元'
        ],
        [
          '制表',
          '李会计'
        ],
      ]}] },
  { date: '2026-07-16', role: 'accountant', title: 'F公司项目奖金计提', tags: ["项目核算"], difficulty: 2,
    description: 'F项目结束，利润=350,000-约150,000=200,000。计提10%奖金20,000元。',
    entries: [{ subjectCode: '660203', summary: 'F项目奖金', debit: 20000, credit: 0 }, { subjectCode: '221101', summary: '应付F项目奖金', debit: 0, credit: 20000 }],
    documents: [
      { type: 'text', label: '项目奖金计提表', docTitle: '项 目 奖 金 计 提 审 批 表', date: '2026-07-16', stampText: '人力资源部\n奖金审批专用章', content: '项目：F新零售数字化转型咨询\n项目利润：350,000-150,000≈200,000.00元\n计提比例：10%\n奖金总额：20,000.00元\n\n分配方案：\n  项目经理：8,000元\n  高级顾问×2：各3,500元=7,000元\n  初级顾问×2：各2,500元=5,000元\n\n审批：总经理 ✓' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '项目',
          'F新零售数字化转型咨询'
        ],
        [
          '项目利润',
          '350,000-150,000≈200,000.00元'
        ],
        [
          '计提比例',
          '10%'
        ],
        [
          '奖金总额',
          '20,000.00元'
        ],
        [
          '项目经理',
          '8,000元'
        ],
        [
          '高级顾问×2',
          '各3,500元=7,000元'
        ],
        [
          '初级顾问×2',
          '各2,500元=5,000元'
        ],
        [
          '审批',
          '总经理 ✓'
        ],
      ]}] },
  { date: '2026-07-17', role: 'accountant', title: '缴纳代扣个税', tags: ["税费"], difficulty: 1,
    entries: [{ subjectCode: '222110', summary: '个税', debit: 5000, credit: 0 }, { subjectCode: '100201', summary: '缴税', debit: 0, credit: 5000 }],
    documents: [
      { type: 'bank', label: '缴税回单', date: '2026-07-17', totalAmount: 5000, payer: '雲帆管理咨询有限公司', payeeName: '国家税务总局北京市税务局', content: '6月代扣代缴个人所得税', refNo: 'HD202607170006' }] },
  { date: '2026-07-18', role: 'accountant', title: '报销研发人员差旅', tags: ["项目核算"], difficulty: 2,
    description: '研发团队赴上海调研智能分析平台需求，差旅费8,000元。',
    entries: [{ subjectCode: '530102', summary: '研发支出-差旅', debit: 8000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 8000 }],
    documents: [
      { type: 'receipt', label: '差旅费报销单', docTitle: '差 旅 费 报 销 单', date: '2026-07-18', totalAmount: 8000, payer: '雲帆管理咨询有限公司', stampText: '财务\n审核专用章', items: [{ name: '北京→上海 高铁 3人×2程', qty: 6, price: 553, amount: 3318 }, { name: '上海住宿 3人×3晚×400元', qty: 9, price: 400, amount: 3600 }, { name: '市内交通及补贴', qty: 1, price: 1082, amount: 1082 }]}] },
  { date: '2026-07-19', role: 'accountant', title: '业务招待费', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '660203', summary: '招待费', debit: 3000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 3000 }],
    documents: [
      { type: 'receipt', label: '餐饮发票', docTitle: '北 京 市 餐 饮 服 务 发 票', date: '2026-07-19', totalAmount: 3000, payer: '雲帆管理咨询有限公司', stampText: 'XX大酒店\n发票专用章', items: [{ name: '客户宴请（F公司庆功宴）', qty: 1, price: 3000, amount: 3000 }]}] },
  { date: '2026-07-21', role: 'accountant', title: '购买办公用品', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '660201', summary: '办公用品', debit: 2000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 2000 }],
    documents: [
      { type: 'receipt', label: '办公用品发票', docTitle: '办 公 用 品 发 票', date: '2026-07-21', totalAmount: 2000, payer: '雲帆管理咨询有限公司', stampText: '晨光文具\n发票专用章', items: [{ name: '打印纸、文件夹、笔、便签等', qty: 1, price: 2000, amount: 2000 }]}] },
  { date: '2026-07-22', role: 'accountant', title: '银行手续费及利息', tags: ["资金管理"], difficulty: 1,
    entries: [{ subjectCode: '6603', summary: '手续费', debit: 600, credit: 0 }, { subjectCode: '100201', summary: '扣费', debit: 0, credit: 600 }, { subjectCode: '100201', summary: '结息', debit: 2500, credit: 0 }, { subjectCode: '6603', summary: '利息收入', debit: 0, credit: 2500 }],
    documents: [
      { type: 'bank', label: '扣费回单', date: '2026-07-22', totalAmount: 600, payer: '雲帆管理咨询有限公司', payeeName: '中国工商银行北京分行', content: '7月账户服务费及转账手续费', refNo: 'HD202607220007' },
      { type: 'bank', label: '结息回单', date: '2026-07-22', totalAmount: 2500, payer: '中国工商银行北京分行', payeeName: '雲帆管理咨询有限公司', content: '活期存款2026年7月结息', refNo: 'HD202607220008' }] },
  { date: '2026-07-23', role: 'accountant', title: '计提7月员工工资', tags: ["工资社保"], difficulty: 2,
    description: '计提7月工资。项目/研发人员165,000+管理人员48,000=213,000元。',
    entries: [{ subjectCode: '520101', summary: '项目工资', debit: 115000, credit: 0 }, { subjectCode: '530102', summary: '研发工资', debit: 50000, credit: 0 }, { subjectCode: '660203', summary: '管理工资', debit: 48000, credit: 0 }, { subjectCode: '221101', summary: '应付工资', debit: 0, credit: 213000 }],
    documents: [
      { type: 'text', label: '工资计算表', docTitle: '7 月 工 资 计 算 汇 总 表', date: '2026-07-23', stampText: '人力资源部\n工资专用章', content: '期间：2026年7月\n\n项目人员：115,000元\n  咨询顾问（3个在执项目）：85,000元\n  项目助理：30,000元\n\n研发人员：50,000元\n  研发工程师3人：50,000元\n\n管理人员：48,000元\n  行政人事：18,000元\n  财务人员：18,000元\n  管理层：12,000元\n\n应发合计：213,000元\n\n制表：王出纳\n审核：李会计' ,
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
          '项目人员',
          '115,000元'
        ],
        [
          '咨询顾问（3个在执项目）',
          '85,000元'
        ],
        [
          '项目助理',
          '30,000元'
        ],
        [
          '研发人员',
          '50,000元'
        ],
        [
          '研发工程师3人',
          '50,000元'
        ],
        [
          '管理人员',
          '48,000元'
        ],
        [
          '行政人事',
          '18,000元'
        ],
        [
          '财务人员',
          '18,000元'
        ],
        [
          '管理层',
          '12,000元'
        ],
        [
          '应发合计',
          '213,000元'
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
  { date: '2026-07-24', role: 'accountant', title: '计提企业社保及公积金', tags: ["工资社保"], difficulty: 2, description: '计提企业社保及公积金，合计65,000元。',
    entries: [{ subjectCode: '520101', summary: '项目社保', debit: 23000, credit: 0 }, { subjectCode: '520101', summary: '项目公积金', debit: 12000, credit: 0 }, { subjectCode: '530102', summary: '研发社保', debit: 10000, credit: 0 }, { subjectCode: '530102', summary: '研发公积金', debit: 5000, credit: 0 }, { subjectCode: '660203', summary: '管理社保', debit: 10000, credit: 0 }, { subjectCode: '660203', summary: '管理公积金', debit: 5000, credit: 0 }, { subjectCode: '221102', summary: '应付社保', debit: 0, credit: 43000 }, { subjectCode: '221102', summary: '应付公积金', debit: 0, credit: 22000 }],
    documents: [
      { type: 'text', label: '社保公积金计提表', docTitle: '社 保 公 积 金 计 提 汇 总 表', date: '2026-07-24', stampText: '财务专用章', content: '期间：2026年7月\n\n社保（企业部分）：\n  项目人员：23,000元\n  研发人员：10,000元\n  管理人员：10,000元\n  小计：43,000元\n\n公积金（企业部分）：\n  项目人员：12,000元\n  研发人员：5,000元\n  管理人员：5,000元\n  小计：22,000元\n\n合计：65,000元\n\n制表：李会计' ,
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
          '项目人员',
          '23,000元'
        ],
        [
          '研发人员',
          '10,000元'
        ],
        [
          '管理人员',
          '10,000元'
        ],
        [
          '小计',
          '43,000元'
        ],
        [
          '项目人员',
          '12,000元'
        ],
        [
          '研发人员',
          '5,000元'
        ],
        [
          '管理人员',
          '5,000元'
        ],
        [
          '小计',
          '22,000元'
        ],
        [
          '合计',
          '65,000元'
        ],
        [
          '制表',
          '李会计'
        ],
      ]}] },
  { date: '2026-07-25', role: 'accountant', title: '计提7月城建税及教育附加', tags: ["税费"], difficulty: 2,
    description: '本月销项税额=7,800(F终验)+1,200(E年框)=9,000。',
    entries: [{ subjectCode: '6403', summary: '城建税', debit: 630, credit: 0 }, { subjectCode: '6403', summary: '教育附加', debit: 270, credit: 0 }, { subjectCode: '6403', summary: '地方教育附加', debit: 180, credit: 0 }, { subjectCode: '222103', summary: '应交城建税', debit: 0, credit: 630 }, { subjectCode: '222104', summary: '应交附加', debit: 0, credit: 450 }],
    documents: [
      { type: 'text', label: '税费计算表', docTitle: '城 建 税 及 教 育 附 加 计 提 表', date: '2026-07-25', stampText: '财务专用章', content: '期间：2026年7月\n计税依据：应纳增值税9,000.00元\n\n城建税（7%）：9,000×7%=630.00元\n教育附加（3%）：9,000×3%=270.00元\n地方教育附加（2%）：9,000×2%=180.00元\n\n合计：1,080.00元\n\n制表：李会计' ,
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
          '计税依据',
          '应纳增值税9,000.00元'
        ],
        [
          '城建税（7%）',
          '9,000×7%=630.00元'
        ],
        [
          '教育附加（3%）',
          '9,000×3%=270.00元'
        ],
        [
          '地方教育附加（2%）',
          '9,000×2%=180.00元'
        ],
        [
          '合计',
          '1,080.00元'
        ],
        [
          '制表',
          '李会计'
        ],
      ]}] },
  { date: '2026-07-26', role: 'accountant', title: '期末结转劳务成本及研发支出', tags: ["项目核算", "期末"], difficulty: 3,
    description: 'F项目终验结转成本：人工70,000+差旅13,000+外包35,000=118,000。研发支出73,000（人工50,000+云资源15,000+差旅8,000）全部费用化。',
    entries: [
      { subjectCode: '6401', summary: '结转F人工', debit: 70000, credit: 0 }, { subjectCode: '6401', summary: '结转F差旅', debit: 13000, credit: 0 }, { subjectCode: '6401', summary: '结转F外包', debit: 35000, credit: 0 },
      { subjectCode: '520101', summary: '转人工', debit: 0, credit: 70000 }, { subjectCode: '520102', summary: '转差旅', debit: 0, credit: 13000 }, { subjectCode: '520103', summary: '转外包', debit: 0, credit: 35000 },
      { subjectCode: '6602', summary: '结转研发费用化', debit: 73000, credit: 0, explanation: '管理费用——研发费。研究阶段全部费用化。' },
      { subjectCode: '530102', summary: '转研发支出', debit: 0, credit: 73000 }],
    documents: [
      { type: 'text', label: '成本结转计算表', docTitle: '项 目 成 本 结 转 计 算 表', date: '2026-07-26', stampText: '财务专用章', content: '结转期间：2026年7月\n\n一、F项目成本结转：\n  人工成本（全额）：70,000.00元\n  差旅费（全额）：13,000.00元\n  外包服务费（全额）：35,000.00元\n  小计：118,000.00元\n\n二、研发支出费用化结转：\n  研发人员工资：50,000.00元\n  云服务器及工具：15,000.00元\n  差旅费：8,000.00元\n  小计：73,000.00元→管理费用-研发费\n\n制表：李会计\n审核：赵会计主管' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '结转期间',
          '2026年7月'
        ],
        [
          '人工成本（全额）',
          '70,000.00元'
        ],
        [
          '差旅费（全额）',
          '13,000.00元'
        ],
        [
          '外包服务费（全额）',
          '35,000.00元'
        ],
        [
          '小计',
          '118,000.00元'
        ],
        [
          '研发人员工资',
          '50,000.00元'
        ],
        [
          '云服务器及工具',
          '15,000.00元'
        ],
        [
          '差旅费',
          '8,000.00元'
        ],
        [
          '小计',
          '73,000.00元→管理费用-研发费'
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
  { date: '2026-07-27', role: 'accountant', title: '月末期间损益结转', tags: ["期末"], difficulty: 3,
    description: '收入：F终验130,000+E年框20,000=150,000。',
    entries: [{ subjectCode: '6001', summary: '结转收入', debit: 150000, credit: 0 }, { subjectCode: '4103', summary: '收入转入', debit: 0, credit: 150000 },
      { subjectCode: '4103', summary: '费用转入', debit: 165080, credit: 0 }, { subjectCode: '6401', summary: '转成本', debit: 0, credit: 118000 },
      { subjectCode: '6403', summary: '转税金', debit: 0, credit: 1080 }, { subjectCode: '660204', summary: '转管理费', debit: 0, credit: 46000 }],
    documents: [
      { type: 'text', label: '结转表', docTitle: '期 间 损 益 结 转 表', date: '2026-07-31', stampText: '已结转', content: '结转期间：2026年7月\n\n收入类→本年利润：\n  主营业务收入：150,000.00元（F终验130,000+E年框20,000）\n\n费用类→本年利润：\n  主营业务成本：118,000.00元\n  税金及附加：1,080.00元\n  管理费用（含研发费用化）：46,000.00元（注：含研发费用化结转73,000已在管理费用中）\n\n本月净利润：150,000-118,000-1,080-46,000=-15,080元\n（研发投入73,000元全部费用化导致阶段性亏损）\n\n制表：李会计' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '结转期间',
          '2026年7月'
        ],
        [
          '主营业务收入',
          '150,000.00元（F终验130,000+E年框20,000）'
        ],
        [
          '主营业务成本',
          '118,000.00元'
        ],
        [
          '税金及附加',
          '1,080.00元'
        ],
        [
          '管理费用（含研发费用化）',
          '46,000.00元（注：含研发费用化结转73,000已在管理费用中）'
        ],
        [
          '本月净利润',
          '150,000-118,000-1,080-46,000=-15,080元'
        ],
        [
          '制表',
          '李会计'
        ],
      ]}] },
  { date: '2026-07-28', role: 'accountant', title: '提取备用金', tags: ["资金管理"], difficulty: 1,
    entries: [{ subjectCode: '1001', summary: '备用金', debit: 2000, credit: 0 }, { subjectCode: '100201', summary: '提现', debit: 0, credit: 2000 }],
    documents: [
      { type: 'bank', label: '现金支票回单', date: '2026-07-28', totalAmount: 2000, payer: '雲帆管理咨询有限公司', payeeName: '雲帆管理咨询有限公司（现金）', content: '提取备用金', refNo: 'HD202607280009' }] },
  { date: '2026-07-29', role: 'accountant', title: 'G公司新签·IT运维服务合同', tags: ["项目核算"], difficulty: 2,
    description: '与G集团签订IT运维服务年合同，全年服务费180,000元（月均15,000元），预收全年款已到账。',
    entries: [{ subjectCode: '100201', summary: 'G公司预收款', debit: 180000, credit: 0 }, { subjectCode: '2232', summary: '预收G公司运维费', debit: 0, credit: 180000 }],
    documents: [
      { type: 'bank', label: '收款回单', date: '2026-07-29', totalAmount: 180000, payer: 'G集团有限公司', payerAccount: '6222 0100 **** 7777', payeeName: '雲帆管理咨询有限公司', payeeAccount: '6222 0200 **** 1234', content: 'IT运维年服务费（全年预收）', refNo: 'HD202607290010' },
      { type: 'text', label: '运维合同', docTitle: 'IT 运 维 服 务 合 同', date: '2026-07-29', stampText: '合同专用章', content: '甲方：G集团有限公司\n乙方：雲帆管理咨询有限公司\n\n服务内容：IT系统运维、网络安全监测、数据备份恢复\n服务期限：2026年8月-2027年7月（12个月）\n合同金额：180,000元（15,000元/月）\n付款方式：签约日一次性付清全年\n\n收入确认：按月均15,000元确认' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '甲方',
          'G集团有限公司'
        ],
        [
          '乙方',
          '雲帆管理咨询有限公司'
        ],
        [
          '服务内容',
          'IT系统运维、网络安全监测、数据备份恢复'
        ],
        [
          '服务期限',
          '2026年8月-2027年7月（12个月）'
        ],
        [
          '合同金额',
          '180,000元（15,000元/月）'
        ],
        [
          '付款方式',
          '签约日一次性付清全年'
        ],
        [
          '收入确认',
          '按月均15,000元确认'
        ],
      ]}] },
  { date: '2026-07-30', role: 'accountant', title: '计提无形资产摊销', tags: ["费用管理"], difficulty: 2, description: '计提无形资产摊销400元。',
    entries: [{ subjectCode: '660206', summary: '无形资产摊销', debit: 400, credit: 0 }, { subjectCode: '1702', summary: '累计摊销', debit: 0, credit: 400 }],
    documents: [
      { type: 'text', label: '摊销计算表', docTitle: '无 形 资 产 摊 销 计 算 表', date: '2026-07-30', stampText: '财务专用章', content: '无形资产：软件项目管理工具（永久许可）\n原值：24,000.00元\n摊销期限：5年（60个月）\n月摊销额：24,000÷60=400.00元\n\n制表：李会计' ,
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
          '24,000÷60=400.00元'
        ],
        [
          '制表',
          '李会计'
        ],
      ]}] },
  { date: '2026-07-28', role: 'accountant', title: '支付员工补充医疗保险', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '660212', summary: '补充医保', debit: 6000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 6000 }],
    documents: [
      { type: 'receipt', label: '保费发票', docTitle: '补 充 医 疗 保 险 发 票', date: '2026-07-28', totalAmount: 6000, payer: '雲帆管理咨询有限公司', stampText: '中国人寿\n发票专用章', items: [{ name: '2026年度员工补充医疗保险（全员）', qty: 1, price: 6000, amount: 6000 }]},
      { type: 'bank', label: '转账回单', date: '2026-07-28', totalAmount: 6000, payer: '雲帆管理咨询有限公司', payeeName: '中国人寿保险股份有限公司', content: '员工补充医疗保险费', refNo: 'HD202607280011' }] },
  { date: '2026-07-29', role: 'accountant', title: '购买办公用品', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '660201', summary: '办公用品', debit: 1500, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 1500 }],
    documents: [
      { type: 'receipt', label: '办公用品发票', docTitle: '办 公 用 品 发 票', date: '2026-07-29', totalAmount: 1500, payer: '雲帆管理咨询有限公司', stampText: '京东办公\n发票专用章', items: [{ name: '键盘×3、鼠标×5、耳机×2', qty: 1, price: 1500, amount: 1500 }]}] },
  { date: '2026-07-30', role: 'accountant', title: '业务招待费', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '660203', summary: '招待费', debit: 2500, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 2500 }],
    documents: [
      { type: 'receipt', label: '餐饮发票', docTitle: '北 京 市 餐 饮 服 务 发 票', date: '2026-07-30', totalAmount: 2500, payer: '雲帆管理咨询有限公司', stampText: 'XX餐厅\n发票专用章', items: [{ name: 'G公司客户招待', qty: 1, price: 2500, amount: 2500 }]}] },
  { date: '2026-07-31', role: 'accountant', title: '模拟纳税申报', tags: ["税费", "期末"], difficulty: 1, entries: [], nextAction: 'tax-filing',
    documents: [{ type: 'text', label: '申报提醒', docTitle: '7 月 纳 税 申 报 提 醒', stampText: '财务专用章', content: '申报期间：2026年7月\n截止日期：2026年8月15日\n\n申报税种：\n1. 增值税（6%，销项税额9,000元）\n2. 城市维护建设税（7%）\n3. 教育费附加（3%+2%）\n4. 代扣代缴个人所得税\n\n请前往纳税申报页面核对后提交。' }] },
]

export default jul
