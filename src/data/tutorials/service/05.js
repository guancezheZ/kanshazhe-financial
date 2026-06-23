/**
 * 服务业 5月 - 💼 多项目并行·外包协作
 * C项目终验、E年框、F公司新签数字化转型项目、外包大数据分析
 */

const may = [
  { date: '2026-05-04', role: 'accountant', title: '发放4月员工工资', tags: ["工资社保"], difficulty: 1,
    entries: [{ subjectCode: '221101', summary: '发4月工资', debit: 193000, credit: 0 }, { subjectCode: '100201', summary: '实发', debit: 0, credit: 160000 }, { subjectCode: '224101', summary: '代扣社保', debit: 0, credit: 19000 }, { subjectCode: '224102', summary: '代扣公积金', debit: 0, credit: 10000 }, { subjectCode: '222110', summary: '代扣个税', debit: 0, credit: 4000 }],
    documents: [
      { type: 'bank', label: '代发工资回单', date: '2026-05-04', totalAmount: 160000, payer: '雲帆管理咨询有限公司', payeeName: '员工代发户', content: '4月工资代发（共50人）', refNo: 'HD202605040001' },
      { type: 'text', label: '工资表', docTitle: '4 月 工 资 发 放 表', date: '2026-05-04', stampText: '人力资源部\n工资专用章', content: '期间：2026年4月\n应发工资总额：193,000.00元\n扣款：社保19,000+公积金10,000+个税4,000=33,000元\n实发合计：160,000.00元（银行代发）\n\n制表：王出纳\n审核：李会计' ,
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
          '应发工资总额',
          '193,000.00元'
        ],
        [
          '扣款',
          '社保19,000+公积金10,000+个税4,000=33,000元'
        ],
        [
          '实发合计',
          '160,000.00元（银行代发）'
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
  { date: '2026-05-05', role: 'accountant', title: '缴纳4月社保公积金', tags: ["工资社保"], difficulty: 1,
    entries: [{ subjectCode: '221102', summary: '企业社保', debit: 38500, credit: 0 }, { subjectCode: '224101', summary: '个人社保', debit: 19000, credit: 0 }, { subjectCode: '221102', summary: '企业公积金', debit: 19500, credit: 0 }, { subjectCode: '224102', summary: '个人公积金', debit: 10000, credit: 0 }, { subjectCode: '100201', summary: '支付', debit: 0, credit: 87000 }],
    documents: [
      { type: 'bank', label: '扣款回单', date: '2026-05-05', totalAmount: 87000, payer: '雲帆管理咨询有限公司', payeeName: '北京市社会保险基金管理中心', content: '4月社保+公积金缴纳', refNo: 'HD202605050002' }] },
  { date: '2026-05-06', role: 'accountant', title: '缴纳4月增值税及附加税', tags: ["税费"], difficulty: 1,
    entries: [{ subjectCode: '222101', summary: '增值税', debit: 13200, credit: 0 }, { subjectCode: '222103', summary: '城建税', debit: 924, credit: 0 }, { subjectCode: '222104', summary: '教育附加', debit: 396, credit: 0 }, { subjectCode: '222104', summary: '地方教育附加', debit: 264, credit: 0 }, { subjectCode: '100201', summary: '缴税', debit: 0, credit: 14784 }],
    documents: [
      { type: 'bank', label: '缴税回单', date: '2026-05-06', totalAmount: 14784, payer: '雲帆管理咨询有限公司', payeeName: '国家税务总局北京市税务局', content: '4月增值税及附加税缴纳', refNo: 'HD202605060003' }] },
  { date: '2026-05-07', role: 'accountant', title: 'C项目终验交付·确认终验收入', tags: ["项目核算"], difficulty: 2, description: 'C项目完成终验，确认终验收入。',
    entries: [
      { subjectCode: '1122', summary: 'C公司终验款', debit: 127200, credit: 0 }, { subjectCode: '6001', summary: '终验收入', debit: 0, credit: 120000 },
      { subjectCode: '222101', summary: '销项税额', debit: 0, credit: 7200 }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '北京', invoiceType: '专用', copy: '发票联', invoiceNo: '1100432119', date: '2026年05月07日', buyer: 'C商业银行', buyerTaxId: '91110108MACCCCCCC', seller: '雲帆管理咨询有限公司', sellerTaxId: '91110108MA3XXXXXXXX', stampText: '发票专用章', payee: '李四', reviewer: '王五', drawer: '赵六', lineItems: [{ name: 'IT咨询（终验阶段）', unit: '项', qty: 1, price: 120000, amount: 120000, taxRate: '6%', tax: 7200 }], totalAmount: 127200 },
      { type: 'text', label: '终验报告', docTitle: 'C 项 目 终 验 确 认 书', date: '2026-05-07', stampText: 'C商业银行\n项目验收专用章', content: '项目名称：核心银行系统升级咨询项目\n验收阶段：终验\n合同金额：400,000元\n已确认收入：80,000+200,000=280,000元\n本次终验收入：120,000元\n\n验收结论：通过 ✓\n系统运行稳定，达到预期目标。\n\n甲方代表：周总\n乙方代表：王顾问' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '项目名称',
          '核心银行系统升级咨询项目'
        ],
        [
          '验收阶段',
          '终验'
        ],
        [
          '合同金额',
          '400,000元'
        ],
        [
          '已确认收入',
          '80,000+200,000=280,000元'
        ],
        [
          '本次终验收入',
          '120,000元'
        ],
        [
          '验收结论',
          '通过 ✓'
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
  { date: '2026-05-08', role: 'accountant', title: '收到C公司终验款', tags: ["往来管理"], difficulty: 1,
    entries: [{ subjectCode: '100201', summary: 'C公司终验款', debit: 127200, credit: 0 }, { subjectCode: '1122', summary: 'C公司', debit: 0, credit: 127200 }],
    documents: [
      { type: 'bank', label: '收款回单', date: '2026-05-08', totalAmount: 127200, payer: 'C商业银行', payerAccount: '6222 0100 **** 2222', payeeName: '雲帆管理咨询有限公司', payeeAccount: '6222 0200 **** 1234', content: 'IT咨询项目终验尾款', refNo: 'HD202605080004' }] },
  { date: '2026-05-09', role: 'accountant', title: '支付5月写字楼租金', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '660205', summary: '房租', debit: 22000, credit: 0 }, { subjectCode: '660205', summary: '物业费', debit: 3000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 25000 }],
    documents: [
      { type: 'receipt', label: '房屋租赁收据', docTitle: '房 屋 租 赁 专 用 收 据', date: '2026-05-09', totalAmount: 25000, payer: '雲帆管理咨询有限公司', stampText: '北京XX物业管理有限公司\n财务专用章', items: [{ name: '望京XX大厦15层 5月租金', qty: 1, price: 22000, amount: 22000 }, { name: '5月物业管理费', qty: 1, price: 3000, amount: 3000 }]}] },
  { date: '2026-05-10', role: 'accountant', title: '确认E公司年框5月收入', tags: ["项目核算"], difficulty: 2, description: '确认E公司年框5月收入。金额合计21,200元。',
    entries: [{ subjectCode: '2232', summary: 'E公司5月', debit: 21200, credit: 0 }, { subjectCode: '6001', summary: '年框5月收入', debit: 0, credit: 20000 }, { subjectCode: '222101', summary: '销项税额', debit: 0, credit: 1200 }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '北京', invoiceType: '专用', copy: '发票联', invoiceNo: '1100432120', date: '2026年05月10日', buyer: 'E集团公司', buyerTaxId: '91110108MAZZZZZZZ', seller: '雲帆管理咨询有限公司', sellerTaxId: '91110108MA3XXXXXXXX', stampText: '发票专用章', payee: '李四', reviewer: '王五', drawer: '赵六', lineItems: [{ name: '年度管理咨询服务（5月）', unit: '月', qty: 1, price: 20000, amount: 20000, taxRate: '6%', tax: 1200 }], totalAmount: 21200 }] },
  { date: '2026-05-12', role: 'accountant', title: '新签F公司数字化转型项目·预收款', tags: ["项目核算"], difficulty: 2,
    description: '与F公司（新零售企业）签订数字化转型咨询合同，合同总额350,000元。预收40%=140,000元，已到账。',
    entries: [{ subjectCode: '100201', summary: 'F公司预收款', debit: 140000, credit: 0 }, { subjectCode: '2232', summary: '预收F公司', debit: 0, credit: 140000 }],
    documents: [
      { type: 'bank', label: '收款回单', date: '2026-05-12', totalAmount: 140000, payer: 'F新零售有限公司', payerAccount: '6222 0100 **** 5555', payeeName: '雲帆管理咨询有限公司', payeeAccount: '6222 0200 **** 1234', content: '数字化转型项目预付款40%', refNo: 'HD202605120005' },
      { type: 'text', label: '合同', docTitle: '数 字 化 转 型 咨 询 合 同', date: '2026-05-12', stampText: '合同专用章', content: '甲方：F新零售有限公司\n乙方：雲帆管理咨询有限公司\n\n项目名称：数字化转型咨询\n合同金额：350,000元\n付款方式：签约付40%（140,000），中期付34.3%（120,000），终验付25.7%（90,000）\n服务期限：2026.5-2026.7\n\n服务内容：数字化战略规划、ERP选型、实施监理' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '甲方',
          'F新零售有限公司'
        ],
        [
          '乙方',
          '雲帆管理咨询有限公司'
        ],
        [
          '项目名称',
          '数字化转型咨询'
        ],
        [
          '合同金额',
          '350,000元'
        ],
        [
          '付款方式',
          '签约付40%（140,000），中期付34.3%（120,000），终验付25.7%（90,000）'
        ],
        [
          '服务期限',
          '2026.5-2026.7'
        ],
        [
          '服务内容',
          '数字化战略规划、ERP选型、实施监理'
        ],
      ]}] },
  { date: '2026-05-13', role: 'accountant', title: 'F项目启动·外包大数据分析', tags: ["项目核算"], difficulty: 2, description: 'F项目启动，支付外包大数据分析服务17,500元。',
    tip: '外包给专业数据分析公司，费用计入劳务成本——外包服务费。',
    entries: [{ subjectCode: '520103', summary: '大数据外包首付', debit: 17500, credit: 0, explanation: 'F项目外包数据分析费首付50%。' }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 17500 }],
    documents: [
      { type: 'bank', label: '转账回单', date: '2026-05-13', totalAmount: 17500, payer: '雲帆管理咨询有限公司', payeeName: 'XX数据科技有限公司', content: 'F项目大数据分析外包首付50%', refNo: 'HD202605130006' },
      { type: 'text', label: '外包协议', docTitle: '数 据 分 析 外 包 协 议', date: '2026-05-13', stampText: '合同专用章', content: '甲方：雲帆管理咨询有限公司\n乙方：XX数据科技有限公司\n\n服务内容：F公司项目大数据分析服务\n总金额：35,000元\n付款方式：签约付50%（17,500），验收付50%（17,500）\n\n交付物：客户画像分析、运行数据报告、决策建议' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '甲方',
          '雲帆管理咨询有限公司'
        ],
        [
          '乙方',
          'XX数据科技有限公司'
        ],
        [
          '服务内容',
          'F公司项目大数据分析服务'
        ],
        [
          '总金额',
          '35,000元'
        ],
        [
          '付款方式',
          '签约付50%（17,500），验收付50%（17,500）'
        ],
        [
          '交付物',
          '客户画像分析、运行数据报告、决策建议'
        ],
      ]}] },
  { date: '2026-05-14', role: 'accountant', title: '支付5月水电及网络费', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '6602', summary: '水电费', debit: 4800, credit: 0 }, { subjectCode: '6602', summary: '网络费', debit: 2000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 6800 }],
    documents: [
      { type: 'receipt', label: '电费凭证', docTitle: '电 费 缴 费 凭 证', date: '2026-05-14', totalAmount: 4800, payer: '雲帆管理咨询有限公司', stampText: '国家电网\n电费收讫章', items: [{ name: '写字楼用电 4,800kWh×1.00元', qty: 4800, price: 1, amount: 4800 }]},
      { type: 'receipt', label: '通信费发票', docTitle: '通 信 服 务 发 票', date: '2026-05-14', totalAmount: 2000, payer: '雲帆管理咨询有限公司', stampText: '中国联通\n发票专用章', items: [{ name: '企业宽带（5月）', qty: 1, price: 2000, amount: 2000 }]}] },
  { date: '2026-05-15', role: 'accountant', title: 'F项目启动·顾问差旅', tags: ["项目核算"], difficulty: 2, description: 'F项目启动，顾问差旅费用11,000元。',
    entries: [{ subjectCode: '520102', summary: 'F项目差旅', debit: 11000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 11000 }],
    documents: [
      { type: 'receipt', label: '差旅报销单', docTitle: '差 旅 费 报 销 单', date: '2026-05-15', totalAmount: 11000, payer: '雲帆管理咨询有限公司', stampText: '财务\n审核专用章', items: [{ name: '杭州出差 高铁3人×2程', qty: 6, price: 550, amount: 3300 }, { name: '住宿 3人×4晚×400元', qty: 12, price: 400, amount: 4800 }, { name: '市内交通及补贴', qty: 1, price: 2900, amount: 2900 }]}] },
  { date: '2026-05-16', role: 'accountant', title: '摊销SaaS费及计提折旧', tags: ["费用管理"], difficulty: 2, description: '摊销SaaS服务费3,000元及计提固定资产折旧2,620元。',
    entries: [{ subjectCode: '6602', summary: '摊销', debit: 3000, credit: 0 }, { subjectCode: '6602', summary: '折旧', debit: 2462, credit: 0 }, { subjectCode: '1208', summary: '摊销', debit: 0, credit: 3000 }, { subjectCode: '1602', summary: '折旧', debit: 0, credit: 2462 }],
    documents: [
      { type: 'text', label: '摊销折旧表', docTitle: '摊 销 折 旧 计 提 表', date: '2026-05-16', stampText: '财务专用章', content: '期间：2026年5月\n\nSaaS摊销：36,000÷12=3,000.00元\n折旧合计：2,461.68元（含3月新增桌椅）\n\n合计：5,461.68元\n\n制表：李会计' ,
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
  { date: '2026-05-17', role: 'accountant', title: '缴纳代扣个税', tags: ["税费"], difficulty: 1,
    entries: [{ subjectCode: '222110', summary: '个税', debit: 4000, credit: 0 }, { subjectCode: '100201', summary: '缴税', debit: 0, credit: 4000 }],
    documents: [
      { type: 'bank', label: '缴税回单', date: '2026-05-17', totalAmount: 4000, payer: '雲帆管理咨询有限公司', payeeName: '国家税务总局北京市税务局', content: '4月代扣代缴个人所得税', refNo: 'HD202605170007' }] },
  { date: '2026-05-19', role: 'accountant', title: '业务招待费-客户接待', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '660203', summary: '招待费', debit: 3500, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 3500 }],
    documents: [
      { type: 'receipt', label: '餐饮发票', docTitle: '北 京 市 餐 饮 服 务 发 票', date: '2026-05-19', totalAmount: 3500, payer: '雲帆管理咨询有限公司', stampText: 'XX酒店\n发票专用章', items: [{ name: 'F公司客户接待', qty: 1, price: 3500, amount: 3500 }]}] },
  { date: '2026-05-20', role: 'accountant', title: '购买办公用品', tags: ["费用管理"], difficulty: 1,
    entries: [{ subjectCode: '660201', summary: '办公用品', debit: 2000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 2000 }],
    documents: [
      { type: 'receipt', label: '办公用品发票', docTitle: '办 公 用 品 发 票', date: '2026-05-20', totalAmount: 2000, payer: '雲帆管理咨询有限公司', stampText: '晨光文具\n发票专用章', items: [{ name: '打印纸、墨盒、文件夹等', qty: 1, price: 2000, amount: 2000 }]}] },
  { date: '2026-05-21', role: 'accountant', title: '银行手续费及利息', tags: ["资金管理"], difficulty: 1,
    entries: [{ subjectCode: '6603', summary: '手续费', debit: 550, credit: 0 }, { subjectCode: '100201', summary: '扣费', debit: 0, credit: 550 }, { subjectCode: '100201', summary: '结息', debit: 1800, credit: 0 }, { subjectCode: '6603', summary: '利息收入', debit: 0, credit: 1800 }],
    documents: [
      { type: 'bank', label: '扣费回单', date: '2026-05-21', totalAmount: 550, payer: '雲帆管理咨询有限公司', payeeName: '中国工商银行北京分行', content: '5月账户服务费及转账手续费', refNo: 'HD202605210008' },
      { type: 'bank', label: '结息回单', date: '2026-05-21', totalAmount: 1800, payer: '中国工商银行北京分行', payeeName: '雲帆管理咨询有限公司', content: '活期存款2026年5月结息', refNo: 'HD202605210009' }] },
  { date: '2026-05-22', role: 'accountant', title: '计提短期借款利息', tags: ["资金管理"], difficulty: 2, description: '计提短期借款利息。',
    entries: [{ subjectCode: '6603', summary: '5月利息', debit: 725, credit: 0 }, { subjectCode: '2231', summary: '应付利息', debit: 0, credit: 725 }],
    documents: [
      { type: 'text', label: '利息计算表', docTitle: '短 期 借 款 利 息 计 算 表', date: '2026-05-22', stampText: '财务专用章', content: '借款本金：200,000.00元\n年利率：4.35%\n5月利息：200,000×4.35%÷12=725.00元\n累计应付利息：2,175.00元\n\n制表：李会计' ,
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
          '5月利息',
          '200,000×4.35%÷12=725.00元'
        ],
        [
          '累计应付利息',
          '2,175.00元'
        ],
        [
          '制表',
          '李会计'
        ],
      ]}] },
  { date: '2026-05-23', role: 'accountant', title: '计提5月员工工资', tags: ["工资社保"], difficulty: 2, description: '计提5月员工工资，应发工资合计201,000元。',
    entries: [{ subjectCode: '520101', summary: '项目工资', debit: 155000, credit: 0 }, { subjectCode: '6602', summary: '管理工资', debit: 46000, credit: 0 }, { subjectCode: '221101', summary: '应付工资', debit: 0, credit: 201000 }],
    documents: [
      { type: 'text', label: '工资计算表', docTitle: '5 月 工 资 计 算 汇 总 表', date: '2026-05-23', stampText: '人力资源部\n工资专用章', content: '期间：2026年5月\n\n项目人员：155,000元（C终验+F新签并行）\n管理人员：46,000元\n\n应发合计：201,000元\n\n制表：王出纳\n审核：李会计' ,
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
          '项目人员',
          '155,000元（C终验+F新签并行）'
        ],
        [
          '管理人员',
          '46,000元'
        ],
        [
          '应发合计',
          '201,000元'
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
  { date: '2026-05-24', role: 'accountant', title: '计提企业社保及公积金', tags: ["工资社保"], difficulty: 2, description: '计提企业社保及公积金，合计61,000元。',
    entries: [{ subjectCode: '520101', summary: '项目社保', debit: 31000, credit: 0 }, { subjectCode: '520101', summary: '项目公积金', debit: 15500, credit: 0 }, { subjectCode: '6602', summary: '管理社保', debit: 9500, credit: 0 }, { subjectCode: '6602', summary: '管理公积金', debit: 5000, credit: 0 }, { subjectCode: '221102', summary: '应付社保', debit: 0, credit: 40500 }, { subjectCode: '221102', summary: '应付公积金', debit: 0, credit: 20500 }],
    documents: [
      { type: 'text', label: '社保公积金计提表', docTitle: '社 保 公 积 金 计 提 汇 总 表', date: '2026-05-24', stampText: '财务专用章', content: '期间：2026年5月\n\n社保（企业部分）：\n  项目人员：31,000元\n  管理人员：9,500元\n  小计：40,500元\n\n公积金（企业部分）：\n  项目人员：15,500元\n  管理人员：5,000元\n  小计：20,500元\n\n合计：61,000元\n\n制表：李会计' ,
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
          '项目人员',
          '31,000元'
        ],
        [
          '管理人员',
          '9,500元'
        ],
        [
          '小计',
          '40,500元'
        ],
        [
          '项目人员',
          '15,500元'
        ],
        [
          '管理人员',
          '5,000元'
        ],
        [
          '小计',
          '20,500元'
        ],
        [
          '合计',
          '61,000元'
        ],
        [
          '制表',
          '李会计'
        ],
      ]}] },
  { date: '2026-05-25', role: 'accountant', title: '计提5月城建税及教育附加', tags: ["税费"], difficulty: 2,
    description: '本月销项税额=7,200（C终验）+1,200（E年框）+6,000（F阶段）=14,400元。',
    entries: [{ subjectCode: '6403', summary: '城建税', debit: 1008, credit: 0 }, { subjectCode: '6403', summary: '教育附加', debit: 432, credit: 0 }, { subjectCode: '6403', summary: '地方教育附加', debit: 288, credit: 0 }, { subjectCode: '222103', summary: '应交城建税', debit: 0, credit: 1008 }, { subjectCode: '222104', summary: '应交教育附加', debit: 0, credit: 720 }],
    documents: [
      { type: 'text', label: '税费计算表', docTitle: '城 建 税 及 教 育 附 加 计 提 表', date: '2026-05-25', stampText: '财务专用章', content: '期间：2026年5月\n计税依据：应纳增值税14,400.00元\n\n城建税（7%）：14,400×7%=1,008.00元\n教育附加（3%）：14,400×3%=432.00元\n地方教育附加（2%）：14,400×2%=288.00元\n\n合计：1,728.00元\n\n制表：李会计' ,
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
          '计税依据',
          '应纳增值税14,400.00元'
        ],
        [
          '城建税（7%）',
          '14,400×7%=1,008.00元'
        ],
        [
          '教育附加（3%）',
          '14,400×3%=432.00元'
        ],
        [
          '地方教育附加（2%）',
          '14,400×2%=288.00元'
        ],
        [
          '合计',
          '1,728.00元'
        ],
        [
          '制表',
          '李会计'
        ],
      ]}] },
  { date: '2026-05-26', role: 'accountant', title: 'F项目·确认第一阶段收入', tags: ["项目核算"], difficulty: 2,
    description: 'F项目完成现状诊断阶段，确认收入100,000元（合同350,000×约28.6%）。增值税6%=6,000元。',
    entries: [{ subjectCode: '2232', summary: 'F公司预收款转收入', debit: 106000, credit: 0 }, { subjectCode: '6001', summary: 'F项目阶段一', debit: 0, credit: 100000 }, { subjectCode: '222101', summary: '销项税额', debit: 0, credit: 6000 }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '北京', invoiceType: '专用', copy: '发票联', invoiceNo: '1100432121', date: '2026年05月26日', buyer: 'F新零售有限公司', buyerTaxId: '91110108MAYYYYYYY', seller: '雲帆管理咨询有限公司', sellerTaxId: '91110108MA3XXXXXXXX', stampText: '发票专用章', payee: '李四', reviewer: '王五', drawer: '赵六', lineItems: [{ name: '数字化转型咨询（诊断阶段）', unit: '项', qty: 1, price: 100000, amount: 100000, taxRate: '6%', tax: 6000 }], totalAmount: 106000 },
      { type: 'text', label: '阶段验收', docTitle: '诊 断 阶 段 验 收 确 认 书', date: '2026-05-26', stampText: 'F新零售有限公司\n项目专用章', content: '项目：数字化转型咨询\n阶段：诊断阶段\n结论：通过 ✓\n交付物：现状评估报告、数字化成熟度分析\n\n甲方代表：刘总\n乙方代表：王顾问' ,
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
          '诊断阶段'
        ],
        [
          '结论',
          '通过 ✓'
        ],
        [
          '交付物',
          '现状评估报告、数字化成熟度分析'
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
  { date: '2026-05-27', role: 'accountant', title: '期末结转劳务成本', tags: ["项目核算", "期末"], difficulty: 3,
    description: '结转已确认收入对应的成本73,500元。',
    entries: [
      { subjectCode: '6401', summary: '结转C人工', debit: 45000, credit: 0 }, { subjectCode: '6401', summary: '结转F人工', debit: 11000, credit: 0 },
      { subjectCode: '6401', summary: '结转F外包', debit: 17500, credit: 0 },
      { subjectCode: '520101', summary: '转C人工', debit: 0, credit: 45000 }, { subjectCode: '520101', summary: '转F人工', debit: 0, credit: 11000 },
      { subjectCode: '520103', summary: '转F外包', debit: 0, credit: 17500 }],
    documents: [
      { type: 'text', label: '成本计算表', docTitle: '项 目 成 本 结 转 计 算 表', date: '2026-05-27', stampText: '财务专用章', content: '结转期间：2026年5月\n\nC项目（终验阶段）：\n  人工成本：45,000元\n  \nF项目（第一阶段）：\n  人工成本：11,000元\n  外包数据分析费：17,500元\n  小计：28,500元\n\n合计结转：73,500元\n\n制表：李会计\n审核：赵会计主管' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '结转期间',
          '2026年5月'
        ],
        [
          '人工成本',
          '45,000元'
        ],
        [
          '人工成本',
          '11,000元'
        ],
        [
          '外包数据分析费',
          '17,500元'
        ],
        [
          '小计',
          '28,500元'
        ],
        [
          '合计结转',
          '73,500元'
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
  { date: '2026-05-28', role: 'accountant', title: '月末期间损益结转', tags: ["期末"], difficulty: 3,
    description: '收入：C终验120,000+E年框20,000+F阶段100,000=240,000。净利润≈43,000。',
    entries: [{ subjectCode: '6001', summary: '结转收入', debit: 240000, credit: 0 }, { subjectCode: '4103', summary: '收入转入', debit: 0, credit: 240000 },
      { subjectCode: '4103', summary: '费用转入', debit: 174753, credit: 0, explanation: '73,500+1,728+99,000+525=174,753。' }, { subjectCode: '6401', summary: '转成本', debit: 0, credit: 73500 },
      { subjectCode: '6403', summary: '转税金', debit: 0, credit: 1728 }, { subjectCode: '6602', summary: '转管理费', debit: 0, credit: 99000 },
      { subjectCode: '6603', summary: '转财务费', debit: 0, credit: 525 }],
    documents: [
      { type: 'text', label: '结转表', docTitle: '期 间 损 益 结 转 表', date: '2026-05-31', stampText: '已结转', content: '结转期间：2026年5月\n\n收入类→本年利润：\n  主营业务收入：240,000元（C终验120,000+E年框20,000+F阶段100,000）\n\n费用类→本年利润：\n  主营业务成本：73,500元\n  税金及附加：1,728元\n  管理费用：99,000元\n  财务费用：525元\n\n本月净利润：240,000-73,500-1,728-99,000-525=65,247元\n\n制表：李会计' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '结转期间',
          '2026年5月'
        ],
        [
          '主营业务收入',
          '240,000元（C终验120,000+E年框20,000+F阶段100,000）'
        ],
        [
          '主营业务成本',
          '73,500元'
        ],
        [
          '税金及附加',
          '1,728元'
        ],
        [
          '管理费用',
          '99,000元'
        ],
        [
          '财务费用',
          '525元'
        ],
        [
          '本月净利润',
          '240,000-73,500-1,728-99,000-525=65,247元'
        ],
        [
          '制表',
          '李会计'
        ],
      ]}] },
  { date: '2026-05-29', role: 'accountant', title: '提取备用金', tags: ["资金管理"], difficulty: 1,
    entries: [{ subjectCode: '1001', summary: '备用金', debit: 2000, credit: 0 }, { subjectCode: '100201', summary: '提现', debit: 0, credit: 2000 }],
    documents: [
      { type: 'bank', label: '现金支票回单', date: '2026-05-29', totalAmount: 2000, payer: '雲帆管理咨询有限公司', payeeName: '雲帆管理咨询有限公司（现金）', content: '提取备用金', refNo: 'HD202605290010' }] },
  { date: '2026-05-30', role: 'accountant', title: 'C项目利润核算·计提项目奖金', tags: ["项目核算"], difficulty: 2,
    description: 'C项目结束，利润=400,000-约180,000=220,000。计提10%奖金22,000元。',
    entries: [{ subjectCode: '6602', summary: 'C项目奖金', debit: 22000, credit: 0 }, { subjectCode: '221101', summary: '应付C项目奖金', debit: 0, credit: 22000 }],
    documents: [
      { type: 'text', label: '项目奖金表', docTitle: 'C 项 目 奖 金 计 提 表', date: '2026-05-30', stampText: '人力资源部\n奖金审批专用章', content: '项目：C商业银行IT咨询\n项目收入：400,000元\n项目成本：约180,000元\n项目利润：约220,000元\n奖金比例：10%\n奖金金额：22,000元\n\n审批：总经理 ✓' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '项目',
          'C商业银行IT咨询'
        ],
        [
          '项目收入',
          '400,000元'
        ],
        [
          '项目成本',
          '约180,000元'
        ],
        [
          '项目利润',
          '约220,000元'
        ],
        [
          '奖金比例',
          '10%'
        ],
        [
          '奖金金额',
          '22,000元'
        ],
        [
          '审批',
          '总经理 ✓'
        ],
      ]}] },
  { date: '2026-05-29', role: 'accountant', title: '计提无形资产摊销', tags: ["费用管理"], difficulty: 2,
    description: '计提5月无形资产摊销。项目管理软件24,000÷5年÷12月=400元。',
    entries: [{ subjectCode: '6602', summary: '无形资产摊销', debit: 400, credit: 0, explanation: '管理费用——摊销费增加。' }, { subjectCode: '1702', summary: '累计摊销', debit: 0, credit: 400 }],
    documents: [
      { type: 'text', label: '摊销计算表', docTitle: '无 形 资 产 摊 销 计 算 表', date: '2026-05-29', stampText: '财务专用章', content: '无形资产：软件项目管理工具（永久许可）\n原值：24,000.00元\n摊销期限：5年（60个月）\n月摊销额：400.00元\n累计摊销：1,200.00元\n\n制表：李会计' ,
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
          '1,200.00元'
        ],
        [
          '制表',
          '李会计'
        ],
      ]}] },
  { date: '2026-05-30', role: 'accountant', title: '支付投标保证金', tags: ["资金管理"], difficulty: 1,
    description: '参与某国有企业咨询项目投标，支付投标保证金20,000元。',
    entries: [{ subjectCode: '1221', summary: '投标保证金', debit: 20000, credit: 0, explanation: '其他应收款增加。' }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 20000 }],
    documents: [
      { type: 'bank', label: '转账回单', date: '2026-05-30', totalAmount: 20000, payer: '雲帆管理咨询有限公司', payeeName: 'XX招标代理有限公司', content: '国有企业咨询项目投标保证金', refNo: 'HD202605300011' }] },
  { date: '2026-05-30', role: 'accountant', title: '购买新办公电脑', tags: ["费用管理"], difficulty: 1,
    description: '为新增员工购买办公电脑2台×8,000=16,000元。',
    entries: [{ subjectCode: '160105', summary: '购办公电脑', debit: 16000, credit: 0 }, { subjectCode: '100201', summary: '付款', debit: 0, credit: 16000 }],
    documents: [
      { type: 'invoice', label: '增值税普通发票', region: '北京', invoiceNo: '1100365440', date: '2026年05月30日', buyer: '雲帆管理咨询有限公司', seller: '中关村数码科技有限公司', lineItems: [{ name: '联想ThinkPad E14', qty: 2, price: 8000, amount: 16000 }], totalAmount: 16000 },
      { type: 'bank', label: '转账回单', date: '2026-05-30', totalAmount: 16000, payer: '雲帆管理咨询有限公司', payeeName: '中关村数码科技有限公司', content: '购办公电脑2台', refNo: 'HD202605300012' }] },
  { date: '2026-05-31', role: 'accountant', title: '模拟纳税申报', tags: ["税费", "期末"], difficulty: 1, entries: [], nextAction: 'tax-filing',
    documents: [{ type: 'text', label: '申报提醒', docTitle: '5 月 纳 税 申 报 提 醒', stampText: '财务专用章', content: '申报期间：2026年5月\n截止日期：2026年6月15日\n\n申报税种：\n1. 增值税（6%，销项税额14,400元）\n2. 城市维护建设税（7%）\n3. 教育费附加（3%+2%）\n4. 代扣代缴个人所得税\n\n请前往纳税申报页面核对后提交。' }] },
]

export default may
