/**
 * 服务业 9月 - 🏢 年框合同·季度所得税
 * E/G/H三合同并行、Q3所得税计提、研发资本化确认
 */

const sep = [
  { date: '2026-09-02', role: 'accountant', title: '发放8月员工工资', tags: ["工资社保"], difficulty: 1,
    entries: [{ subjectCode: '221101', summary: '发8月工资', debit: 235000, credit: 0 }, { subjectCode: '100201', summary: '实发', debit: 0, credit: 194000 }, { subjectCode: '224101', summary: '代扣社保', debit: 0, credit: 23000 }, { subjectCode: '224102', summary: '代扣公积金', debit: 0, credit: 12000 }, { subjectCode: '222110', summary: '代扣个税', debit: 0, credit: 6000 }],
    documents: [
      { type: 'bank', label: '代发工资回单', date: '2026-09-02', totalAmount: 194000, payer: '雲帆管理咨询有限公司', payeeName: '员工代发户', content: '8月工资代发（共54人）', refNo: 'HD202609020001' },
      { type: 'text', label: '工资表', docTitle: '8 月 工 资 发 放 表', date: '2026-09-02', stampText: '人力资源部\n工资专用章', content: '期间：2026年8月\n应发工资总额：235,000.00元\n扣款：社保23,000+公积金12,000+个税6,000=41,000元\n实发合计：194,000.00元（银行代发）\n\n制表：王出纳\n审核：李会计' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '期间',
          '2026年8月'
        ],
        [
          '应发工资总额',
          '235,000.00元'
        ],
        [
          '扣款',
          '社保23,000+公积金12,000+个税6,000=41,000元'
        ],
        [
          '实发合计',
          '194,000.00元（银行代发）'
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
  { date: '2026-09-03', role: 'accountant', title: '缴纳8月社保公积金', tags: ["工资社保"], difficulty: 1,
    entries: [{ subjectCode: '221102', summary: '企业社保', debit: 47500, credit: 0 }, { subjectCode: '224101', summary: '个人社保', debit: 23000, credit: 0 }, { subjectCode: '221102', summary: '企业公积金', debit: 23500, credit: 0 }, { subjectCode: '224102', summary: '个人公积金', debit: 12000, credit: 0 }, { subjectCode: '100201', summary: '支付', debit: 0, credit: 106000 }],
    documents: [
      { type: 'bank', label: '扣款回单', date: '2026-09-03', totalAmount: 106000, payer: '雲帆管理咨询有限公司', payeeName: '北京市社会保险基金管理中心', content: '8月社保+公积金缴纳', refNo: 'HD202609030002' }] },
  { date: '2026-09-04', role: 'accountant', title: '缴纳8月增值税及附加', tags: ["税费"], difficulty: 1,
    entries: [{ subjectCode: '222101', summary: '增值税', debit: 3000, credit: 0 }, { subjectCode: '222103', summary: '城建税', debit: 210, credit: 0 }, { subjectCode: '222104', summary: '附加', debit: 150, credit: 0 }, { subjectCode: '100201', summary: '缴税', debit: 0, credit: 3360 }],
    documents: [
      { type: 'bank', label: '缴税回单', date: '2026-09-04', totalAmount: 3360, payer: '雲帆管理咨询有限公司', payeeName: '国家税务总局北京市税务局', content: '8月增值税及附加税缴纳', refNo: 'HD202609040003' }] },
  { date: '2026-09-05', role: 'accountant', title: '缴纳代扣个税', tags: ["税费"], difficulty: 1,
    entries: [{ subjectCode: '222110', summary: '个税', debit: 6000, credit: 0 }, { subjectCode: '100201', summary: '缴税', debit: 0, credit: 6000 }],
    documents: [
      { type: 'bank', label: '缴税回单', date: '2026-09-05', totalAmount: 6000, payer: '雲帆管理咨询有限公司', payeeName: '国家税务总局北京市税务局', content: '8月代扣代缴个人所得税', refNo: 'HD202609050004' }] },
  { date: '2026-09-07', role: 'accountant', title: '确认E年框9月收入', tags: ["项目核算"], difficulty: 2, description: '确认E公司年框收入20,000元，增值税6%=1,200元。',
    entries: [{ subjectCode: '2232', summary: 'E公司9月', debit: 21200, credit: 0 }, { subjectCode: '6001', summary: '年框收入', debit: 0, credit: 20000 }, { subjectCode: '222101', summary: '销项税额', debit: 0, credit: 1200 }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '北京', invoiceType: '专用', copy: '发票联', invoiceNo: '1100432128', date: '2026年09月07日', buyer: 'E集团公司', buyerTaxId: '91110108MAZZZZZZZ', seller: '雲帆管理咨询有限公司', sellerTaxId: '91110108MA3XXXXXXXX', stampText: '发票专用章', payee: '李四', reviewer: '王五', drawer: '赵六', lineItems: [{ name: '年度管理咨询服务（9月）', unit: '月', qty: 1, price: 20000, amount: 20000, taxRate: '6%', tax: 1200 }], totalAmount: 21200 }] },
  { date: '2026-09-08', role: 'accountant', title: '确认G运维9月收入', tags: ["项目核算"], difficulty: 2, description: '确认G公司运维收入15,000元，增值税6%=900元。',
    entries: [{ subjectCode: '2232', summary: 'G公司9月', debit: 15900, credit: 0 }, { subjectCode: '6001', summary: '运维收入', debit: 0, credit: 15000 }, { subjectCode: '222101', summary: '销项税额', debit: 0, credit: 900 }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '北京', invoiceType: '专用', copy: '发票联', invoiceNo: '1100432129', date: '2026年09月08日', buyer: 'G集团有限公司', buyerTaxId: '91110108MAKKKKKKK', seller: '雲帆管理咨询有限公司', sellerTaxId: '91110108MA3XXXXXXXX', stampText: '发票专用章', payee: '李四', reviewer: '王五', drawer: '赵六', lineItems: [{ name: 'IT运维服务（9月）', unit: '月', qty: 1, price: 15000, amount: 15000, taxRate: '6%', tax: 900 }], totalAmount: 15900 }] },
  { date: '2026-09-09', role: 'accountant', title: '确认H订阅9月收入', tags: ["项目核算"], difficulty: 2, description: '确认H公司SaaS订阅收入15,000元，增值税6%=900元。',
    entries: [{ subjectCode: '2232', summary: 'H公司9月', debit: 15900, credit: 0 }, { subjectCode: '6051', summary: 'SaaS收入', debit: 0, credit: 15000 }, { subjectCode: '222101', summary: '销项税额', debit: 0, credit: 900 }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '北京', invoiceType: '专用', copy: '发票联', invoiceNo: '1100432130', date: '2026年09月09日', buyer: 'H科技有限公司', buyerTaxId: '91110108MAHHHHHHH', seller: '雲帆管理咨询有限公司', sellerTaxId: '91110108MA3XXXXXXXX', stampText: '发票专用章', payee: '李四', reviewer: '王五', drawer: '赵六', lineItems: [{ name: '雲帆智能平台SaaS订阅（9月）', unit: '月', qty: 1, price: 15000, amount: 15000, taxRate: '6%', tax: 900 }], totalAmount: 15900 }] },
  { date: '2026-09-10', role: 'accountant', title: '支付9月写字楼租金', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '660205', summary: '房租', debit: 22000, credit: 0 }, { subjectCode: '660205', summary: '物业费', debit: 3000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 25000 }],
    documents: [
      { type: 'receipt', label: '房屋租赁收据', docTitle: '房 屋 租 赁 专 用 收 据', date: '2026-09-10', totalAmount: 25000, payer: '雲帆管理咨询有限公司', stampText: '北京XX物业管理有限公司\n财务专用章', items: [{ name: '望京XX大厦15层 9月租金', qty: 1, price: 22000, amount: 22000 }, { name: '9月物业管理费', qty: 1, price: 3000, amount: 3000 }]}] },
  { date: '2026-09-11', role: 'accountant', title: '研发支出归集-9月', tags: ["项目核算"], difficulty: 2,
    description: '研发团队9月费用。开发阶段持续，资本化支出60,000元（人工50,000+云资源10,000）。',
    entries: [{ subjectCode: '530101', summary: '研发资本化', debit: 60000, credit: 0 }, { subjectCode: '221101', summary: '应付研发工资', debit: 0, credit: 50000 }, { subjectCode: '100201', summary: '云资源费', debit: 0, credit: 10000 }],
    documents: [
      { type: 'text', label: '研发支出归集表', docTitle: '研 发 支 出 归 集 表', date: '2026-09-11', stampText: '技术研发部\n财务专用章', content: '项目：雲帆智能管理分析平台 V1.0\n期间：2026年9月\n\n资本化支出：\n  研发人员工资：50,000元\n  云服务器及资源：10,000元\n  合计：60,000元（开发阶段持续资本化）\n\n累计资本化：65,000（8月）+60,000=125,000元\n\n制表：李会计\n审核：赵会计主管' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '项目',
          '雲帆智能管理分析平台 V1.0'
        ],
        [
          '期间',
          '2026年9月'
        ],
        [
          '研发人员工资',
          '50,000元'
        ],
        [
          '云服务器及资源',
          '10,000元'
        ],
        [
          '合计',
          '60,000元（开发阶段持续资本化）'
        ],
        [
          '累计资本化',
          '65,000（8月）+60,000=125,000元'
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
  { date: '2026-09-12', role: 'accountant', title: '支付9月水电及网络', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '6602', summary: '水电费', debit: 5000, credit: 0 }, { subjectCode: '6602', summary: '网络费', debit: 2000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 7000 }],
    documents: [
      { type: 'receipt', label: '电费凭证', docTitle: '电 费 缴 费 凭 证', date: '2026-09-12', totalAmount: 5000, payer: '雲帆管理咨询有限公司', stampText: '国家电网\n电费收讫章', items: [{ name: '写字楼用电 5,000kWh×1.00元', qty: 5000, price: 1, amount: 5000 }]},
      { type: 'receipt', label: '通信费发票', docTitle: '通 信 服 务 发 票', date: '2026-09-12', totalAmount: 2000, payer: '雲帆管理咨询有限公司', stampText: '中国联通\n发票专用章', items: [{ name: '企业宽带+电话（9月）', qty: 1, price: 2000, amount: 2000 }]}] },
  { date: '2026-09-14', role: 'accountant', title: '摊销及折旧', tags: ["费用管理"], difficulty: 2, description: '摊销6800元+折旧5240元，合计12040元。',
    entries: [{ subjectCode: '6602', summary: '摊销', debit: 3400, credit: 0 }, { subjectCode: '6602', summary: '折旧', debit: 2620, credit: 0 }, { subjectCode: '1208', summary: '摊销', debit: 0, credit: 3000 }, { subjectCode: '1702', summary: '累计摊销', debit: 0, credit: 400 }, { subjectCode: '1602', summary: '折旧', debit: 0, credit: 2620 }],
    documents: [
      { type: 'text', label: '摊销折旧表', docTitle: '摊 销 折 旧 计 提 表', date: '2026-09-14', stampText: '财务专用章', content: '期间：2026年9月\n\nSaaS摊销：36,000÷12=3,000.00元\n无形资产摊销：400.00元\n折旧合计：2,620.00元\n\n合计：6,020.00元\n\n制表：李会计' ,
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
          'SaaS摊销',
          '36,000÷12=3,000.00元'
        ],
        [
          '无形资产摊销',
          '400.00元'
        ],
        [
          '折旧合计',
          '2,620.00元'
        ],
        [
          '合计',
          '6,020.00元'
        ],
        [
          '制表',
          '李会计'
        ],
      ]}] },
  { date: '2026-09-15', role: 'accountant', title: '银行手续费及利息', tags: ["资金管理"], difficulty: 1,
    entries: [{ subjectCode: '6603', summary: '手续费', debit: 600, credit: 0 }, { subjectCode: '100201', summary: '扣费', debit: 0, credit: 600 }, { subjectCode: '100201', summary: '结息', debit: 3200, credit: 0 }, { subjectCode: '6603', summary: '利息收入', debit: 0, credit: 3200 }],
    documents: [
      { type: 'bank', label: '扣费回单', date: '2026-09-15', totalAmount: 600, payer: '雲帆管理咨询有限公司', payeeName: '中国工商银行北京分行', content: '9月账户服务费及转账手续费', refNo: 'HD202609150005' },
      { type: 'bank', label: '结息回单', date: '2026-09-15', totalAmount: 3200, payer: '中国工商银行北京分行', payeeName: '雲帆管理咨询有限公司', content: '活期存款2026年9月结息', refNo: 'HD202609150006' }] },
  { date: '2026-09-16', role: 'accountant', title: '报销研发测试费', tags: ["项目核算"], difficulty: 2, description: '报销研发测试费用5,000元。',
    entries: [{ subjectCode: '530101', summary: '研发测试费', debit: 5000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 5000 }],
    documents: [
      { type: 'receipt', label: '测试服务发票', docTitle: '软 件 测 试 服 务 发 票', date: '2026-09-16', totalAmount: 5000, payer: '雲帆管理咨询有限公司', stampText: 'XX软件评测中心\n发票专用章', items: [{ name: '智能分析平台V1.0 性能测试及安全评测', qty: 1, price: 5000, amount: 5000 }]}] },
  { date: '2026-09-18', role: 'accountant', title: '购买办公用品', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '660201', summary: '办公用品', debit: 2000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 2000 }],
    documents: [
      { type: 'receipt', label: '办公用品发票', docTitle: '办 公 用 品 发 票', date: '2026-09-18', totalAmount: 2000, payer: '雲帆管理咨询有限公司', stampText: '晨光文具\n发票专用章', items: [{ name: '打印纸、订书机、文件夹等', qty: 1, price: 2000, amount: 2000 }]}] },
  { date: '2026-09-19', role: 'accountant', title: '业务招待费', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '660203', summary: '招待费', debit: 4000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 4000 }],
    documents: [
      { type: 'receipt', label: '餐饮发票', docTitle: '北 京 市 餐 饮 服 务 发 票', date: '2026-09-19', totalAmount: 4000, payer: '雲帆管理咨询有限公司', stampText: 'XX酒店\n发票专用章', items: [{ name: 'I公司新客户签约宴请', qty: 1, price: 4000, amount: 4000 }]}] },
  { date: '2026-09-21', role: 'accountant', title: 'SaaS产品正式发布·市场推广', tags: ["费用管理"], difficulty: 1,
    description: '雲帆智能管理分析平台正式上线，线上+线下推广费用25,000元。',
    entries: [{ subjectCode: '6601', summary: '产品发布推广', debit: 25000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 25000 }],
    documents: [
      { type: 'receipt', label: '发布活动发票', docTitle: '产 品 发 布 会 服 务 发 票', date: '2026-09-21', totalAmount: 15000, payer: '雲帆管理咨询有限公司', stampText: '北京XX会展服务公司\n发票专用章', items: [{ name: '产品发布会场地及设备租赁', qty: 1, price: 15000, amount: 15000 }]},
      { type: 'receipt', label: '线上推广发票', docTitle: '线 上 广 告 服 务 发 票', date: '2026-09-21', totalAmount: 10000, payer: '雲帆管理咨询有限公司', stampText: '百度在线\n发票专用章', items: [{ name: '信息流+搜索竞价推广', qty: 1, price: 10000, amount: 10000 }]}] },
  { date: '2026-09-22', role: 'accountant', title: 'I公司新签·管理咨询项目', tags: ["项目核算"], difficulty: 2,
    description: '与I公司签订战略绩效管理咨询合同，合同总额280,000元。签约付40%=112,000元。',
    entries: [{ subjectCode: '100201', summary: 'I公司预收款', debit: 112000, credit: 0 }, { subjectCode: '2232', summary: '预收I公司', debit: 0, credit: 112000 }],
    documents: [
      { type: 'bank', label: '收款回单', date: '2026-09-22', totalAmount: 112000, payer: 'I科技有限公司', payerAccount: '6222 0100 **** 3333', payeeName: '雲帆管理咨询有限公司', payeeAccount: '6222 0200 **** 1234', content: '战略绩效咨询项目预付款（40%）', refNo: 'HD202609220007' },
      { type: 'text', label: '咨询合同', docTitle: '战 略 绩 效 管 理 咨 询 合 同', date: '2026-09-22', stampText: '合同专用章', content: '甲方：I科技有限公司\n乙方：雲帆管理咨询有限公司\n\n项目名称：战略绩效管理体系设计与落地\n合同金额：280,000元\n付款方式：签约付40%（112,000），中期付30%（84,000），终验付30%（84,000）\n服务期限：2026年9月-2026年12月' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '甲方',
          'I科技有限公司'
        ],
        [
          '乙方',
          '雲帆管理咨询有限公司'
        ],
        [
          '项目名称',
          '战略绩效管理体系设计与落地'
        ],
        [
          '合同金额',
          '280,000元'
        ],
        [
          '付款方式',
          '签约付40%（112,000），中期付30%（84,000），终验付30%（84,000）'
        ],
        [
          '服务期限',
          '2026年9月-2026年12月'
        ],
      ]}] },
  { date: '2026-09-23', role: 'accountant', title: '计提9月员工工资', tags: ["工资社保"], difficulty: 2,
    description: '计提9月工资。项目125,000+研发65,000+管理52,000=242,000元。',
    entries: [{ subjectCode: '520101', summary: '项目工资', debit: 125000, credit: 0 }, { subjectCode: '530101', summary: '研发资本化工资', debit: 50000, credit: 0 }, { subjectCode: '530102', summary: '研发费用化工', debit: 15000, credit: 0 }, { subjectCode: '6602', summary: '管理工资', debit: 52000, credit: 0 }, { subjectCode: '221101', summary: '应付工资', debit: 0, credit: 242000 }],
    documents: [
      { type: 'text', label: '工资计算表', docTitle: '9 月 工 资 计 算 汇 总 表', date: '2026-09-23', stampText: '人力资源部\n工资专用章', content: '期间：2026年9月\n\n项目人员：125,000元（E/G/I三项目并行）\n研发人员（资本化）：50,000元\n研发人员（费用化）：15,000元\n管理人员：52,000元\n\n应发合计：242,000元\n\n制表：王出纳\n审核：李会计' ,
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
          '项目人员',
          '125,000元（E/G/I三项目并行）'
        ],
        [
          '研发人员（资本化）',
          '50,000元'
        ],
        [
          '研发人员（费用化）',
          '15,000元'
        ],
        [
          '管理人员',
          '52,000元'
        ],
        [
          '应发合计',
          '242,000元'
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
  { date: '2026-09-24', role: 'accountant', title: '计提社保公积金', tags: ["工资社保"], difficulty: 2, description: '计提企业社保及公积金，合计73,500元。',
    entries: [{ subjectCode: '520101', summary: '项目社保', debit: 25000, credit: 0 }, { subjectCode: '520101', summary: '项目公积金', debit: 12500, credit: 0 }, { subjectCode: '530101', summary: '研发资本化社保', debit: 10000, credit: 0 }, { subjectCode: '530101', summary: '研发资本化公积金', debit: 5000, credit: 0 }, { subjectCode: '530102', summary: '研发费用化社保', debit: 3000, credit: 0 }, { subjectCode: '530102', summary: '研发费用化公积金', debit: 1500, credit: 0 }, { subjectCode: '6602', summary: '管理社保', debit: 11000, credit: 0 }, { subjectCode: '6602', summary: '管理公积金', debit: 5500, credit: 0 }, { subjectCode: '221102', summary: '应付社保', debit: 0, credit: 49000 }, { subjectCode: '221102', summary: '应付公积金', debit: 0, credit: 24500 }],
    documents: [
      { type: 'text', label: '社保公积金计提表', docTitle: '社 保 公 积 金 计 提 汇 总 表', date: '2026-09-24', stampText: '财务专用章', content: '期间：2026年9月\n\n社保（企业部分）：\n  项目人员：25,000元\n  研发资本化：10,000元\n  研发费用化：3,000元\n  管理人员：11,000元\n  小计：49,000元\n\n公积金（企业部分）：\n  项目人员：12,500元\n  研发资本化：5,000元\n  研发费用化：1,500元\n  管理人员：5,500元\n  小计：24,500元\n\n合计：73,500元\n\n制表：李会计' ,
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
          '项目人员',
          '25,000元'
        ],
        [
          '研发资本化',
          '10,000元'
        ],
        [
          '研发费用化',
          '3,000元'
        ],
        [
          '管理人员',
          '11,000元'
        ],
        [
          '小计',
          '49,000元'
        ],
        [
          '项目人员',
          '12,500元'
        ],
        [
          '研发资本化',
          '5,000元'
        ],
        [
          '研发费用化',
          '1,500元'
        ],
        [
          '管理人员',
          '5,500元'
        ],
        [
          '小计',
          '24,500元'
        ],
        [
          '合计',
          '73,500元'
        ],
        [
          '制表',
          '李会计'
        ],
      ]}] },
  { date: '2026-09-25', role: 'accountant', title: '计提9月城建税及附加', tags: ["税费"], difficulty: 2,
    description: '销项税额=1,200(E)+900(G)+900(H)+新项目=3,000。',
    entries: [{ subjectCode: '6403', summary: '城建税', debit: 210, credit: 0 }, { subjectCode: '6403', summary: '教育附加', debit: 90, credit: 0 }, { subjectCode: '6403', summary: '地方教育附加', debit: 60, credit: 0 }, { subjectCode: '222103', summary: '应交城建税', debit: 0, credit: 210 }, { subjectCode: '222104', summary: '应交附加', debit: 0, credit: 150 }],
    documents: [
      { type: 'text', label: '税费计算表', docTitle: '城 建 税 及 教 育 附 加 计 提 表', date: '2026-09-25', stampText: '财务专用章', content: '期间：2026年9月\n计税依据：应纳增值税3,000.00元\n\n城建税（7%）：3,000×7%=210.00元\n教育附加（3%）：3,000×3%=90.00元\n地方教育附加（2%）：3,000×2%=60.00元\n\n合计：360.00元\n\n制表：李会计' ,
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
          '计税依据',
          '应纳增值税3,000.00元'
        ],
        [
          '城建税（7%）',
          '3,000×7%=210.00元'
        ],
        [
          '教育附加（3%）',
          '3,000×3%=90.00元'
        ],
        [
          '地方教育附加（2%）',
          '3,000×2%=60.00元'
        ],
        [
          '合计',
          '360.00元'
        ],
        [
          '制表',
          '李会计'
        ],
      ]}] },
  { date: '2026-09-26', role: 'accountant', title: '计提Q3企业所得税', tags: ["税费"], difficulty: 3,
    description: 'Q3利润总额估算≈60,000元。Q3所得税=60,000×25%=15,000元。',
    entries: [{ subjectCode: '6801', summary: 'Q3所得税', debit: 15000, credit: 0 }, { subjectCode: '222106', summary: '应交Q3所得税', debit: 0, credit: 15000 }],
    documents: [
      { type: 'text', label: '所得税计算表', docTitle: 'Q3 企 业 所 得 税 计 提 表', date: '2026-09-26', stampText: '财务专用章', content: '期间：2026年Q3（7-9月）\n\nQ3利润总额估算：60,000.00元\n适用税率：25%\nQ3应纳所得税：60,000×25%=15,000.00元\n\n制表：李会计\n审核：赵会计主管' ,
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
          'Q3利润总额估算',
          '60,000.00元'
        ],
        [
          '适用税率',
          '25%'
        ],
        [
          'Q3应纳所得税',
          '60,000×25%=15,000.00元'
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
  { date: '2026-09-27', role: 'accountant', title: '月末期间损益结转', tags: ["期末"], difficulty: 3,
    description: '收入：50,000（E+G+H）。',
    entries: [{ subjectCode: '6001', summary: '转主营收入', debit: 35000, credit: 0 }, { subjectCode: '6051', summary: '转其他收入', debit: 15000, credit: 0 }, { subjectCode: '4103', summary: '收入转入', debit: 0, credit: 50000 },
      { subjectCode: '4103', summary: '费用转入', debit: 48000, credit: 0 }, { subjectCode: '6602', summary: '转管理费', debit: 0, credit: 28000 }, { subjectCode: '6601', summary: '转销售费', debit: 0, credit: 20000 }],
    documents: [
      { type: 'text', label: '结转表', docTitle: '期 间 损 益 结 转 表', date: '2026-09-30', stampText: '已结转', content: '结转期间：2026年9月\n\n收入类→本年利润：\n  主营业务收入：35,000元（E年框20,000+G运维15,000）\n  其他业务收入：15,000元（H订阅）\n  合计：50,000元\n\n费用类→本年利润：\n  管理费用：28,000元\n  销售费用：20,000元（SaaS发布+推广）\n  合计：48,000元\n\n本月净利润：2,000元\n\n制表：李会计' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '结转期间',
          '2026年9月'
        ],
        [
          '主营业务收入',
          '35,000元（E年框20,000+G运维15,000）'
        ],
        [
          '其他业务收入',
          '15,000元（H订阅）'
        ],
        [
          '合计',
          '50,000元'
        ],
        [
          '管理费用',
          '28,000元'
        ],
        [
          '销售费用',
          '20,000元（SaaS发布+推广）'
        ],
        [
          '合计',
          '48,000元'
        ],
        [
          '本月净利润',
          '2,000元'
        ],
        [
          '制表',
          '李会计'
        ],
      ]}] },
  { date: '2026-09-28', role: 'accountant', title: '提取备用金', tags: ["资金管理"], difficulty: 1,
    entries: [{ subjectCode: '1001', summary: '备用金', debit: 2000, credit: 0 }, { subjectCode: '100201', summary: '提现', debit: 0, credit: 2000 }],
    documents: [
      { type: 'bank', label: '现金支票回单', date: '2026-09-28', totalAmount: 2000, payer: '雲帆管理咨询有限公司', payeeName: '雲帆管理咨询有限公司（现金）', content: '提取备用金', refNo: 'HD202609280008' }] },
  { date: '2026-09-29', role: 'accountant', title: '计提无形资产摊销', tags: ["费用管理"], difficulty: 2, description: '计提无形资产摊销400元。',
    entries: [{ subjectCode: '6602', summary: '摊销', debit: 400, credit: 0 }, { subjectCode: '1702', summary: '累计摊销', debit: 0, credit: 400 }],
    documents: [
      { type: 'text', label: '摊销计算表', docTitle: '无 形 资 产 摊 销 计 算 表', date: '2026-09-29', stampText: '财务专用章', content: '无形资产：软件项目管理工具（永久许可）\n原值：24,000.00元\n摊销期限：5年（60个月）\n月摊销额：400.00元\n累计摊销：2,000.00元\n\n制表：李会计' ,
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
          '2,000.00元'
        ],
        [
          '制表',
          '李会计'
        ],
      ]}] },
  { date: '2026-09-30', role: 'accountant', title: '期末结转劳务成本', tags: ["项目核算", "期末"], difficulty: 3, description: '期末结转劳务成本至主营业务成本。',
    entries: [{ subjectCode: '6401', summary: '结转人工', debit: 25000, credit: 0 }, { subjectCode: '520101', summary: '转人工', debit: 0, credit: 25000 }],
    documents: [
      { type: 'text', label: '成本计算表', docTitle: '服 务 成 本 结 转 计 算 表', date: '2026-09-30', stampText: '财务专用章', content: '结转期间：2026年9月\n\nE公司年框人工：12,000元\nG公司运维人工：6,000元\nH公司SaaS人工：7,000元\n\n合计结转：25,000元\n\n制表：李会计' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '结转期间',
          '2026年9月'
        ],
        [
          'E公司年框人工',
          '12,000元'
        ],
        [
          'G公司运维人工',
          '6,000元'
        ],
        [
          'H公司SaaS人工',
          '7,000元'
        ],
        [
          '合计结转',
          '25,000元'
        ],
        [
          '制表',
          '李会计'
        ],
      ]}] },
  { date: '2026-09-28', role: 'accountant', title: '购买办公用品', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '660201', summary: '办公用品', debit: 1800, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 1800 }],
    documents: [
      { type: 'receipt', label: '办公用品发票', docTitle: '办 公 用 品 发 票', date: '2026-09-28', totalAmount: 1800, payer: '雲帆管理咨询有限公司', stampText: '得力办公\n发票专用章', items: [{ name: '复印纸×3箱、文件盒×20', qty: 1, price: 1800, amount: 1800 }]}] },
  { date: '2026-09-28', role: 'accountant', title: '业务招待费', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '660203', summary: '招待费', debit: 2000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 2000 }],
    documents: [
      { type: 'receipt', label: '餐饮发票', docTitle: '北 京 市 餐 饮 服 务 发 票', date: '2026-09-28', totalAmount: 2000, payer: '雲帆管理咨询有限公司', stampText: 'XX餐厅\n发票专用章', items: [{ name: '客户午餐招待', qty: 1, price: 2000, amount: 2000 }]}] },
  { date: '2026-09-29', role: 'accountant', title: '提取备用金', tags: ["资金管理"], difficulty: 1,
    entries: [{ subjectCode: '1001', summary: '备用金', debit: 3000, credit: 0 }, { subjectCode: '100201', summary: '提现', debit: 0, credit: 3000 }],
    documents: [
      { type: 'bank', label: '现金支票回单', date: '2026-09-29', totalAmount: 3000, payer: '雲帆管理咨询有限公司', payeeName: '雲帆管理咨询有限公司（现金）', content: '提取备用金', refNo: 'HD202609290009' }] },
  { date: '2026-09-29', role: 'accountant', title: '报销员工差旅费', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '660202', summary: '差旅费', debit: 3500, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 3500 }],
    documents: [
      { type: 'receipt', label: '差旅报销单', docTitle: '差 旅 费 报 销 单', date: '2026-09-29', totalAmount: 3500, payer: '雲帆管理咨询有限公司', stampText: '财务\n审核专用章', items: [{ name: 'I公司项目现场调研 高铁×2人', qty: 4, price: 500, amount: 2000 }, { name: '住宿 2人×2晚×350元', qty: 4, price: 350, amount: 1400 }, { name: '市内交通', qty: 1, price: 100, amount: 100 }]}] },
  { date: '2026-09-30', role: 'accountant', title: '模拟纳税申报', tags: ["税费", "期末"], difficulty: 1, entries: [], nextAction: 'tax-filing',
    documents: [{ type: 'text', label: '申报提醒', docTitle: '9 月 纳 税 申 报 提 醒', stampText: '财务专用章', content: '申报期间：2026年9月\n截止日期：2026年10月15日\n\n申报税种：\n1. 增值税（6%，销项税额3,000元）\n2. 城市维护建设税（7%）\n3. 教育费附加（3%+2%）\n4. 代扣代缴个人所得税\n5. Q3企业所得税预缴\n\n请前往纳税申报页面核对后提交。' }] },
]

export default sep
