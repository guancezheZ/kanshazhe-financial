/**
 * 服务业（管理咨询/IT咨询/软件开发）2月教学任务
 *
 * 企业：雲帆管理咨询有限公司
 * 本月主题：📋 项目执行·人力归集
 *   - 项目B持续执行，T&M收入确认（按工时）
 *   - 社保公积金缴纳 + 1月工资发放
 *   - 新顾问入职、人员成本归集
 *   - 新签C公司IT咨询项目
 *   - 日常费用报销 + 期末结转
 *
 * 知识点标签：项目核算、收入确认、人工成本、费用管理、工资社保、税费、往来管理、资金管理、期末
 */

const feb = [
  // ═══════════════════════════════════════════
  // 第一周：上月收尾 + 工资发放（2月2日~2月8日）
  // ═══════════════════════════════════════════
  {
    date: '2026-02-02', role: 'accountant', title: '发放1月员工工资', tags: ["工资社保"], difficulty: 1,
    tip: '发放上月计提工资，冲减应付职工薪酬，代扣个人社保公积金和个税。',
    description: '银行代发1月工资。应发160,000元，代扣个人社保16,000元、公积金8,000元、个税3,500元，实发132,500元。',
    entries: [
      { subjectCode: '221101', summary: '发放1月工资', debit: 160000, credit: 0, explanation: '应付职工薪酬减少。全额冲减上月计提的应付工资。' },
      { subjectCode: '100201', summary: '实发工资', debit: 0, credit: 132500, explanation: '银行存款减少。实发=160,000-16,000-8,000-3,500=132,500。' },
      { subjectCode: '224101', summary: '代扣个人社保', debit: 0, credit: 16000, explanation: '其他应付款——社保个人部分增加。' },
      { subjectCode: '224102', summary: '代扣个人公积金', debit: 0, credit: 8000, explanation: '其他应付款——公积金个人部分增加。' },
      { subjectCode: '222110', summary: '代扣个税', debit: 0, credit: 3500, explanation: '应交个人所得税增加。' }],
    documents: [
      { type: 'bank', label: '代发工资回单', date: '2026-02-02', totalAmount: 132500, payer: '雲帆管理咨询有限公司', payeeName: '员工代发户', content: '1月工资代发（共48人）', refNo: 'HD202602020001' },
      { type: 'text', label: '工资表', docTitle: '1 月 工 资 发 放 表', date: '2026-02-02', stampText: '人力资源部\n工资专用章', content: '期间：2026年1月\n应发工资总额：160,000.00元\n扣款：社保16,000+公积金8,000+个税3,500=27,500元\n实发合计：132,500.00元\n\n制表：王出纳\n审核：李会计' ,
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
          '应发工资总额',
          '160,000.00元'
        ],
        [
          '扣款',
          '社保16,000+公积金8,000+个税3,500=27,500元'
        ],
        [
          '实发合计',
          '132,500.00元'
        ],
        [
          '制表',
          '王出纳'
        ],
        [
          '审核',
          '李会计'
        ],
      ]}]
  },
  {
    date: '2026-02-03', role: 'accountant', title: '缴纳1月社保及公积金', tags: ["工资社保"], difficulty: 1,
    tip: '缴纳企业+个人社保公积金，企业部分冲应付职工薪酬，个人部分冲其他应付款。',
    description: '缴纳1月企业及个人社保公积金。企业社保33,000元、企业公积金17,000元，个人社保16,000元、个人公积金8,000元。合计74,000元。',
    entries: [
      { subjectCode: '221102', summary: '缴纳企业社保', debit: 33000, credit: 0, explanation: '应付职工薪酬——社保（企业部分）减少。' },
      { subjectCode: '224101', summary: '缴纳个人社保', debit: 16000, credit: 0, explanation: '其他应付款——个人社保减少。' },
      { subjectCode: '221102', summary: '缴纳企业公积金', debit: 17000, credit: 0, explanation: '应付职工薪酬——公积金（企业部分）减少。' },
      { subjectCode: '224102', summary: '缴纳个人公积金', debit: 8000, credit: 0, explanation: '其他应付款——个人公积金减少。' },
      { subjectCode: '100201', summary: '支付社保公积金', debit: 0, credit: 74000, explanation: '银行存款减少。' }],
    documents: [
      { type: 'bank', label: '扣款回单', date: '2026-02-03', totalAmount: 74000, payer: '雲帆管理咨询有限公司', payeeName: '北京市社会保险基金管理中心', content: '1月社保+公积金缴纳', refNo: 'HD202602030002' }]
  },
  {
    date: '2026-02-04', role: 'accountant', title: '缴纳1月增值税及附加税', tags: ["税费"], difficulty: 1,
    tip: '上月增值税及附加税需在当月15日前申报缴纳。',
    description: '缴纳1月增值税12,000元、城建税840元、教育附加360元、地方教育附加240元。合计13,440元。',
    entries: [
      { subjectCode: '222101', summary: '缴纳1月增值税', debit: 12000, credit: 0, explanation: '应交增值税减少。' },
      { subjectCode: '222103', summary: '缴纳城建税', debit: 840, credit: 0, explanation: '应交城建税减少。' },
      { subjectCode: '222104', summary: '缴纳教育附加', debit: 360, credit: 0, explanation: '应交教育附加减少。' },
      { subjectCode: '222104', summary: '缴纳地方教育附加', debit: 240, credit: 0, explanation: '应交地方教育附加减少。' },
      { subjectCode: '100201', summary: '缴纳税款', debit: 0, credit: 13440, explanation: '银行存款减少。' }],
    documents: [
      { type: 'bank', label: '缴税回单', date: '2026-02-04', totalAmount: 13440, payer: '雲帆管理咨询有限公司', payeeName: '国家税务总局北京市税务局', content: '1月增值税及附加税', refNo: 'HD202602040003' }]
  },
  {
    date: '2026-02-05', role: 'accountant', title: '项目B·按工时确认1月项目收入', tags: ["项目核算", "收入确认"], difficulty: 2,
    tip: 'T&M合同采用"开票权"实用变通法，按实际工时开票确认收入。借：应收账款/合同负债，贷：主营业务收入、应交税费。',
    description: '项目B（B公司战略咨询）1月顾问工时统计：高级顾问160小时×800元=128,000元，中级顾问240小时×500元=120,000元。按T&M费率确认1月项目收入248,000元。增值税6%=14,880元。预收款余额88,000元全额冲减后差额挂应收。',
    entries: [
      { subjectCode: '1122', summary: 'B公司1月咨询费', debit: 174880, credit: 0, explanation: '应收账款增加。262,880-88,000=174,880。' },
      { subjectCode: '2232', summary: 'B公司预收款余额', debit: 88000, credit: 0, explanation: '合同负债减少。冲减剩余预收款88,000元。' },
      { subjectCode: '6001', summary: '项目B1月T&M收入', debit: 0, credit: 248000, explanation: '主营业务收入增加。按实际工时费率确认。' },
      { subjectCode: '222101', summary: '销项税额6%', debit: 0, credit: 14880, explanation: '应交增值税——销项税额增加。248,000×6%=14,880。' }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '北京', invoiceType: '专用', copy: '发票联', invoiceNo: '1100432113', date: '2026年02月05日', buyer: 'B公司', buyerTaxId: '91110108MAXXXXXXXX', seller: '雲帆管理咨询有限公司', sellerTaxId: '91110108MA3XXXXXXXX', stampText: '发票专用章', payee: '李四', reviewer: '王五', drawer: '赵六', lineItems: [{ name: '管理咨询服务（1月T&M）', unit: '小时', qty: 400, price: 620, amount: 248000, taxRate: '6%', tax: 14880 }], totalAmount: 262880 },
      { type: 'text', label: '工时确认单', docTitle: '项 目 工 时 确 认 单', date: '2026-02-05', stampText: 'B公司\n项目确认章', content: '客户：B公司\n期间：2026年1月\n高级顾问：160h×800=128,000\n中级顾问：240h×500=120,000\n合计：400小时/248,000元\n\n甲方确认：张总    乙方确认：王顾问' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '客户',
          'B公司'
        ],
        [
          '期间',
          '2026年1月'
        ],
        [
          '高级顾问',
          '160h×800=128,000'
        ],
        [
          '中级顾问',
          '240h×500=120,000'
        ],
        [
          '合计',
          '400小时/248,000元'
        ],
        [
          '甲方确认',
          '张总    乙方确认：王顾问'
        ],
      ]}]
  },
  {
    date: '2026-02-06', role: 'accountant', title: '收到B公司1月咨询费回款', tags: ["往来管理", "资金管理"], difficulty: 1,
    tip: '收到客户回款冲减应收账款。',
    description: '收到B公司支付1月咨询费差额92,880元，已到账。',
    entries: [
      { subjectCode: '100201', summary: '收到B公司回款', debit: 92880, credit: 0, explanation: '银行存款增加。' },
      { subjectCode: '1122', summary: 'B公司回款', debit: 0, credit: 92880, explanation: '应收账款减少。' }],
    documents: [
      { type: 'bank', label: '收款回单', date: '2026-02-06', totalAmount: 92880, payer: 'B公司', payeeName: '雲帆管理咨询有限公司', content: '支付1月咨询费差额', refNo: 'HD202602060004' }]
  },
  {
    date: '2026-02-07', role: 'accountant', title: '新顾问入职·支付体检及培训费', tags: ["费用管理"], difficulty: 1,
    tip: '新员工入职体检和培训费属于管理费用。',
    description: '1月新招聘的3名高级顾问正式入职，支付入职体检费2,400元及岗前培训费6,000元。合计8,400元。',
    entries: [
      { subjectCode: '6602', summary: '体检费', debit: 2400, credit: 0, explanation: '管理费用增加。入职体检费。' },
      { subjectCode: '6602', summary: '培训费', debit: 6000, credit: 0, explanation: '管理费用增加。岗前培训费。' },
      { subjectCode: '100201', summary: '支付体检培训费', debit: 0, credit: 8400, explanation: '银行存款减少。' }],
    documents: [
      { type: 'receipt', label: '体检发票', docTitle: '医 疗 体 检 发 票', date: '2026-02-07', totalAmount: 2400, payer: '雲帆管理咨询有限公司', stampText: '慈铭体检\n发票专用章', items: [{ name: '入职体检（3人×800元）', qty: 3, price: 800, amount: 2400 }]},
      { type: 'receipt', label: '培训发票', docTitle: '培 训 服 务 发 票', date: '2026-02-07', totalAmount: 6000, payer: '雲帆管理咨询有限公司', stampText: '北大商学院\n发票专用章', items: [{ name: '管理咨询顾问岗前培训（3人）', qty: 3, price: 2000, amount: 6000 }]}]
  },
  {
    date: '2026-02-08', role: 'accountant', title: '支付2月写字楼租金', tags: ["费用管理"], difficulty: 1,
    tip: '办公室租金计入管理费用-房租物业。',
    description: '支付2月写字楼租金及物业费合计25,000元（房租22,000+物业3,000）。',
    entries: [
      { subjectCode: '660205', summary: '2月房租', debit: 22000, credit: 0, explanation: '管理费用——房租物业增加。' },
      { subjectCode: '660205', summary: '2月物业费', debit: 3000, credit: 0, explanation: '管理费用——房租物业增加。' },
      { subjectCode: '100201', summary: '支付租金', debit: 0, credit: 25000, explanation: '银行存款减少。' }],
    documents: [
      { type: 'receipt', label: '收据', docTitle: '房 屋 租 赁 专 用 收 据', date: '2026-02-08', totalAmount: 25000, payer: '雲帆管理咨询有限公司', paymentMethod: '银行转账', stampText: '北京XX物业管理有限公司\n财务专用章', items: [{ name: '望京大厦15层 2月租金', qty: 1, price: 22000, amount: 22000 }, { name: '2月物业管理费', qty: 1, price: 3000, amount: 3000 }]}]
  },
  // ═══════════════════════════════════════════
  // 第二周：项目执行 + 成本归集（2月9日~2月15日）
  // ═══════════════════════════════════════════
  {
    date: '2026-02-09', role: 'accountant', title: '项目B·顾问2月上旬差旅支出', tags: ["项目核算"], difficulty: 2,
    tip: '项目直接差旅费通过劳务成本-差旅费归集。',
    description: '项目B顾问赴上海进行第二阶段方案汇报及管理层访谈，差旅费共计15,000元（机票8,000+住宿5,000+市内交通2,000）。',
    entries: [
      { subjectCode: '520102', summary: '项目B差旅费', debit: 15000, credit: 0, explanation: '劳务成本——差旅费增加。' },
      { subjectCode: '100201', summary: '支付差旅费', debit: 0, credit: 15000, explanation: '银行存款减少。' }],
    documents: [
      { type: 'receipt', label: '机票行程单', docTitle: '航 空 运 输 行 程 单', date: '2026-02-09', totalAmount: 8000, payer: '雲帆管理咨询有限公司', stampText: '中国国航', items: [{ name: '北京→上海 4×1,000', qty: 4, price: 1000, amount: 4000 }, { name: '上海→北京 4×1,000', qty: 4, price: 1000, amount: 4000 }]},
      { type: 'receipt', label: '住宿发票', docTitle: '住 宿 费 发 票', date: '2026-02-09', totalAmount: 5000, payer: '雲帆管理咨询有限公司', stampText: '上海XX酒店', items: [{ name: '4间×3晚 住宿', qty: 12, price: 416.67, amount: 5000 }]},
      { type: 'bank', label: '转账回单', date: '2026-02-09', totalAmount: 15000, payer: '雲帆管理咨询有限公司', payeeName: '各收款方', content: '项目B2月差旅费', refNo: 'HD202602090005' }]
  },
  {
    date: '2026-02-10', role: 'accountant', title: '支付项目B外聘专家尾款', tags: ["项目核算"], difficulty: 2,
    tip: '外聘专家劳务费用通过劳务成本-外包服务费归集。',
    description: '支付1月参与项目B的两名外部专家尾款15,000元（合同总额25,000，前期已付10,000元定金）。',
    entries: [
      { subjectCode: '520103', summary: '专家尾款-项目B', debit: 15000, credit: 0, explanation: '劳务成本——外包服务费增加。' },
      { subjectCode: '100201', summary: '支付专家尾款', debit: 0, credit: 15000, explanation: '银行存款减少。' }],
    documents: [
      { type: 'bank', label: '转账回单', date: '2026-02-10', totalAmount: 15000, payer: '雲帆管理咨询有限公司', payeeName: '张XX、李XX（外部专家）', content: '项目B专家尾款', refNo: 'HD202602100006' }]
  },
  {
    date: '2026-02-11', role: 'accountant', title: '支付2月水电费及网络费', tags: ["费用管理"], difficulty: 1,
    tip: '日常运营费用计入管理费用。',
    description: '支付2月水电费4,000元、企业网络费2,000元。合计6,000元。',
    entries: [
      { subjectCode: '6602', summary: '2月水电费', debit: 4000, credit: 0, explanation: '管理费用增加。' },
      { subjectCode: '6602', summary: '2月网络费', debit: 2000, credit: 0, explanation: '管理费用增加。' },
      { subjectCode: '100201', summary: '支付水电网络', debit: 0, credit: 6000, explanation: '银行存款减少。' }],
    documents: [
      { type: 'receipt', label: '电费单', docTitle: '电 费 缴 费 凭 证', date: '2026-02-11', totalAmount: 4000, payer: '雲帆管理咨询有限公司', stampText: '国家电网\n电费收讫章', items: [{ name: '写字楼用电 4,000kWh', qty: 4000, price: 1, amount: 4000 }]},
      { type: 'receipt', label: '通信费发票', docTitle: '通 信 服 务 发 票', date: '2026-02-11', totalAmount: 2000, payer: '雲帆管理咨询有限公司', stampText: '中国联通\n发票专用章', items: [{ name: '企业宽带及电话费（2月）', qty: 1, price: 2000, amount: 2000 }]}]
  },
  {
    date: '2026-02-12', role: 'accountant', title: '报销项目B资料购置费', tags: ["项目核算"], difficulty: 2,
    tip: '项目专用资料购置费计入劳务成本-其他直接费用。',
    description: '项目B顾问报销购买行业数据库访问权限及竞品分析报告费用合计8,000元。',
    entries: [
      { subjectCode: '520104', summary: '项目B资料购置', debit: 8000, credit: 0, explanation: '劳务成本——其他直接费用增加。' },
      { subjectCode: '100201', summary: '报销付款', debit: 0, credit: 8000, explanation: '银行存款减少。' }],
    documents: [
      { type: 'receipt', label: '报销单', docTitle: '费 用 报 销 单', date: '2026-02-12', totalAmount: 8000, payer: '雲帆管理咨询有限公司', stampText: '财务\n审核专用章', items: [{ name: '行业数据库年费', qty: 1, price: 5000, amount: 5000 }, { name: '竞品分析报告×3份', qty: 3, price: 1000, amount: 3000 }]}]
  },
  {
    date: '2026-02-13', role: 'accountant', title: '购买办公用品', tags: ["费用管理"], difficulty: 1,
    tip: '办公用品计入管理费用-办公费。',
    description: '采购2月办公用品及桶装水共计2,500元。',
    entries: [
      { subjectCode: '660201', summary: '办公用品', debit: 2500, credit: 0, explanation: '管理费用——办公费增加。' },
      { subjectCode: '100201', summary: '付款', debit: 0, credit: 2500, explanation: '银行存款减少。' }],
    documents: [
      { type: 'receipt', label: '收据', docTitle: '商 品 销 售 发 票', date: '2026-02-13', totalAmount: 2500, payer: '雲帆管理咨询有限公司', stampText: '京东办公\n发票专用章', items: [{ name: '打印纸、文具等', qty: 1, price: 2000, amount: 2000 }, { name: '桶装水（20桶）', qty: 20, price: 25, amount: 500 }]}]
  },
  {
    date: '2026-02-14', role: 'accountant', title: '银行手续费及利息收入', tags: ["资金管理"], difficulty: 1,
    tip: '手续费计入财务费用，利息收入冲减财务费用。',
    description: '银行扣收2月账户管理费及转账手续费600元；活期存款结息900元。',
    entries: [
      { subjectCode: '6603', summary: '银行手续费', debit: 600, credit: 0, explanation: '财务费用增加。' },
      { subjectCode: '100201', summary: '银行扣费', debit: 0, credit: 600, explanation: '银行存款减少。' },
      { subjectCode: '100201', summary: '活期结息', debit: 900, credit: 0, explanation: '银行存款增加。' },
      { subjectCode: '6603', summary: '利息收入（红字）', debit: 0, credit: 900, explanation: '财务费用减少。利息收入冲减财务费用。' }],
    documents: [
      { type: 'bank', label: '扣费回单', date: '2026-02-14', totalAmount: 600, payer: '雲帆管理咨询有限公司', payeeName: '工商银行北京分行', content: '2月手续费', refNo: 'HD202602140007' },
      { type: 'bank', label: '结息回单', date: '2026-02-14', totalAmount: 900, payer: '工商银行北京分行', payeeName: '雲帆管理咨询有限公司', content: '2月活期结息', refNo: 'HD202602140008' }]
  },
  {
    date: '2026-02-15', role: 'accountant', title: '摊销SaaS费及计提折旧', tags: ["费用管理"], difficulty: 2,
    tip: '摊销和折旧属于非付现费用，按月计提。',
    description: '摊销2月SaaS服务费3,000元；计提2月折旧2,343元（电脑1,583+办公桌椅760）。合计5,343元。',
    entries: [
      { subjectCode: '6602', summary: '摊销SaaS费', debit: 3000, credit: 0, explanation: '管理费用——摊销费增加。' },
      { subjectCode: '6602', summary: '折旧费', debit: 2343, credit: 0, explanation: '管理费用——折旧费增加。' },
      { subjectCode: '1208', summary: '摊销SaaS年费', debit: 0, credit: 3000, explanation: '长期待摊费用减少。' },
      { subjectCode: '1602', summary: '累计折旧', debit: 0, credit: 2343, explanation: '累计折旧增加。' }],
    documents: [
      { type: 'text', label: '摊销计算表', docTitle: '摊 销 及 折 旧 计 提 表', date: '2026-02-15', stampText: '财务专用章', content: '期间：2026年2月\nSaaS摊销：3,000元\n折旧——电脑：1,583.33元\n折旧——桌椅：760.00元\n合计：5,343.33元\n\n制表：李会计' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '期间',
          '2026年2月'
        ],
        [
          'SaaS摊销',
          '3,000元'
        ],
        [
          '折旧——电脑',
          '1,583.33元'
        ],
        [
          '折旧——桌椅',
          '760.00元'
        ],
        [
          '合计',
          '5,343.33元'
        ],
        [
          '制表',
          '李会计'
        ],
      ]}]
  },
  // ═══════════════════════════════════════════
  // 第三周：新签项目 + 费用报销（2月16日~2月22日）
  // ═══════════════════════════════════════════
  {
    date: '2026-02-16', role: 'accountant', title: '新签C公司IT咨询项目·收到预付款', tags: ["项目核算", "收入确认"], difficulty: 2,
    tip: '新项目预收款计入合同负债。借：银行存款，贷：合同负债。',
    description: '与C公司（某商业银行）签订IT系统升级咨询合同，合同总额400,000元。签约时支付40%预付款160,000元，已到账。',
    entries: [
      { subjectCode: '100201', summary: 'C公司预付款', debit: 160000, credit: 0, explanation: '银行存款增加。收到C公司项目预付款。' },
      { subjectCode: '2232', summary: '预收C公司咨询费', debit: 0, credit: 160000, explanation: '合同负债增加。预收款待履约后分期转收入。' }],
    documents: [
      { type: 'bank', label: '收款回单', date: '2026-02-16', totalAmount: 160000, payer: 'C商业银行', payeeName: '雲帆管理咨询有限公司', content: 'IT系统升级咨询项目预付款（40%）', refNo: 'HD202602160009' },
      { type: 'text', label: '咨询合同', docTitle: 'IT 系 统 升 级 咨 询 合 同', date: '2026-02-16', stampText: '合同专用章', content: '甲方：C商业银行\n乙方：雲帆管理咨询有限公司\n项目：核心银行系统升级咨询\n金额：400,000元\n付款：签约40%+中期40%+终验20%\n期限：2026.2-2026.5\n\n服务内容：系统需求分析、供应商选型、实施监理' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '甲方',
          'C商业银行'
        ],
        [
          '乙方',
          '雲帆管理咨询有限公司'
        ],
        [
          '项目',
          '核心银行系统升级咨询'
        ],
        [
          '金额',
          '400,000元'
        ],
        [
          '付款',
          '签约40%+中期40%+终验20%'
        ],
        [
          '期限',
          '2026.2-2026.5'
        ],
        [
          '服务内容',
          '系统需求分析、供应商选型、实施监理'
        ],
      ]}]
  },
  {
    date: '2026-02-17', role: 'accountant', title: '项目C启动·需求调研差旅', tags: ["项目核算"], difficulty: 2,
    tip: '项目差旅费按项目归集到劳务成本-差旅费。',
    description: 'C项目启动，3名IT顾问赴客户现场进行需求调研，预付差旅费18,000元（机票+住宿+交通）。',
    entries: [
      { subjectCode: '520102', summary: '项目C调研差旅', debit: 18000, credit: 0, explanation: '劳务成本——差旅费增加。C项目直接差旅费用。' },
      { subjectCode: '100201', summary: '支付差旅费', debit: 0, credit: 18000, explanation: '银行存款减少。' }],
    documents: [
      { type: 'receipt', label: '报销单', docTitle: '差 旅 费 报 销 单', date: '2026-02-17', totalAmount: 18000, payer: '雲帆管理咨询有限公司', stampText: '财务\n审核专用章', items: [{ name: '北京→深圳 往返机票（3人）', qty: 3, price: 3000, amount: 9000 }, { name: '住宿费（7天）', qty: 21, price: 350, amount: 7350 }, { name: '市内交通费', qty: 1, price: 1650, amount: 1650 }]}]
  },
  {
    date: '2026-02-18', role: 'accountant', title: '缴纳代扣个人所得税', tags: ["税费"], difficulty: 1,
    tip: '上月代扣的个人所得税需在当月15日前缴纳。',
    description: '缴纳1月代扣的个人所得税3,500元。',
    entries: [
      { subjectCode: '222110', summary: '缴纳个税', debit: 3500, credit: 0, explanation: '应交个人所得税减少。' },
      { subjectCode: '100201', summary: '缴纳税款', debit: 0, credit: 3500, explanation: '银行存款减少。' }],
    documents: [
      { type: 'bank', label: '缴税回单', date: '2026-02-18', totalAmount: 3500, payer: '雲帆管理咨询有限公司', payeeName: '国家税务总局北京市税务局', content: '1月代扣个人所得税', refNo: 'HD202602180010' }]
  },
  {
    date: '2026-02-19', role: 'accountant', title: '报销项目B加班餐费及交通', tags: ["项目核算"], difficulty: 2,
    tip: '项目加班费用属于项目直接其他费用。借：劳务成本-其他直接费，贷：银行存款。',
    description: '项目B冲刺阶段，顾问团队加班赶制战略报告，报销加班餐费及打车费合计3,500元。',
    entries: [
      { subjectCode: '520104', summary: '项目B加班费用', debit: 3500, credit: 0, explanation: '劳务成本——其他直接费用增加。' },
      { subjectCode: '100201', summary: '报销付款', debit: 0, credit: 3500, explanation: '银行存款减少。' }],
    documents: [
      { type: 'receipt', label: '报销单', docTitle: '加 班 费 用 报 销 单', date: '2026-02-19', totalAmount: 3500, payer: '雲帆管理咨询有限公司', stampText: '财务\n审核专用章', items: [{ name: '加班餐费', qty: 1, price: 2000, amount: 2000 }, { name: '加班打车费', qty: 1, price: 1500, amount: 1500 }]}]
  },
  {
    date: '2026-02-20', role: 'accountant', title: '业务招待费-客户午餐会', tags: ["费用管理"], difficulty: 1,
    tip: '业务招待费计入管理费用，需留意税前扣除限额。',
    description: '项目B举办阶段性成果汇报午餐会，邀请B公司项目负责人及团队成员，费用3,000元。',
    entries: [
      { subjectCode: '660203', summary: '客户午餐会', debit: 3000, credit: 0, explanation: '管理费用——业务招待费增加。' },
      { subjectCode: '100201', summary: '报销付款', debit: 0, credit: 3000, explanation: '银行存款减少。' }],
    documents: [
      { type: 'receipt', label: '餐饮发票', docTitle: '餐 饮 服 务 发 票', date: '2026-02-20', totalAmount: 3000, payer: '雲帆管理咨询有限公司', stampText: 'XX酒店\n发票专用章', items: [{ name: 'B项目阶段性汇报午餐会', qty: 1, price: 3000, amount: 3000 }]}]
  },
  {
    date: '2026-02-21', role: 'accountant', title: '参会行业研讨会·市场推广', tags: ["费用管理"], difficulty: 1,
    tip: '市场推广费计入销售费用。',
    description: '参加"2026中国管理咨询行业峰会"展位费及宣传材料费用合计12,000元。',
    entries: [
      { subjectCode: '6601', summary: '行业峰会参展', debit: 12000, credit: 0, explanation: '销售费用增加。市场推广支出。' },
      { subjectCode: '100201', summary: '支付参展费', debit: 0, credit: 12000, explanation: '银行存款减少。' }],
    documents: [
      { type: 'receipt', label: '服务发票', docTitle: '展 会 服 务 发 票', date: '2026-02-21', totalAmount: 12000, payer: '雲帆管理咨询有限公司', stampText: '中国管理咨询协会\n发票专用章', items: [{ name: '行业峰会标准展位', qty: 1, price: 8000, amount: 8000 }, { name: '宣传材料制作', qty: 1, price: 4000, amount: 4000 }]}]
  },
  {
    date: '2026-02-22', role: 'accountant', title: '提取备用金', tags: ["资金管理"], difficulty: 1,
    tip: '提取备用金满足日常零星开支。',
    description: '提取备用金3,000元。',
    entries: [
      { subjectCode: '1001', summary: '提取备用金', debit: 3000, credit: 0, explanation: '库存现金增加。' },
      { subjectCode: '100201', summary: '提取备用金', debit: 0, credit: 3000, explanation: '银行存款减少。' }],
    documents: [
      { type: 'bank', label: '现金支票回单', date: '2026-02-22', totalAmount: 3000, payer: '雲帆管理咨询有限公司', payeeName: '雲帆管理咨询有限公司（现金）', content: '提取备用金', refNo: 'HD202602220011' }]
  },
  // ═══════════════════════════════════════════
  // 第四周：月末计提 + 期末结转（2月23日~2月28日）
  // ═══════════════════════════════════════════
  {
    date: '2026-02-23', role: 'accountant', title: '计提2月员工工资', tags: ["工资社保"], difficulty: 2,
    tip: '项目人员工资归集到劳务成本，管理人员工资计入管理费用。',
    description: '计提2月员工工资。项目人员（含新入职3人）工资138,000元，管理人员工资42,000元。合计180,000元。',
    entries: [
      { subjectCode: '520101', summary: '计提项目人员工资', debit: 138000, credit: 0, explanation: '劳务成本——人工成本增加。' },
      { subjectCode: '6602', summary: '计提管理工资', debit: 42000, credit: 0, explanation: '管理费用——工资薪金增加。' },
      { subjectCode: '221101', summary: '应付2月工资', debit: 0, credit: 180000, explanation: '应付职工薪酬——工资增加。' }],
    documents: [
      { type: 'text', label: '工资计算表', docTitle: '2 月 工 资 计 算 汇 总 表', date: '2026-02-23', stampText: '人力资源部\n工资专用章', content: '期间：2026年2月\n项目人员（48人）：138,000元\n管理人员（5人）：42,000元\n应发合计：180,000元\n\n制表：王出纳\n审核：李会计' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '期间',
          '2026年2月'
        ],
        [
          '项目人员（48人）',
          '138,000元'
        ],
        [
          '管理人员（5人）',
          '42,000元'
        ],
        [
          '应发合计',
          '180,000元'
        ],
        [
          '制表',
          '王出纳'
        ],
        [
          '审核',
          '李会计'
        ],
      ]}]
  },
  {
    date: '2026-02-24', role: 'accountant', title: '计提企业社保及公积金', tags: ["工资社保"], difficulty: 2,
    tip: '按人员归属分别计入劳务成本和管理费用。',
    description: '计提2月企业社保及公积金。项目人员社保27,000元、公积金14,000元；管理人员社保8,500元、公积金4,500元。合计54,000元。',
    entries: [
      { subjectCode: '520101', summary: '项目人员社保', debit: 27000, credit: 0, explanation: '劳务成本——人工成本增加。' },
      { subjectCode: '520101', summary: '项目人员公积金', debit: 14000, credit: 0, explanation: '劳务成本——人工成本增加。' },
      { subjectCode: '6602', summary: '管理社保', debit: 8500, credit: 0, explanation: '管理费用增加。' },
      { subjectCode: '6602', summary: '管理公积金', debit: 4500, credit: 0, explanation: '管理费用增加。' },
      { subjectCode: '221102', summary: '应付企业社保', debit: 0, credit: 35500, explanation: '应付职工薪酬——社保增加。' },
      { subjectCode: '221102', summary: '应付企业公积金', debit: 0, credit: 18500, explanation: '应付职工薪酬——公积金增加。' }],
    documents: [
      { type: 'text', label: '社保计提表', docTitle: '社 保 公 积 金 计 提 表', date: '2026-02-24', stampText: '财务专用章', content: '期间：2026年2月\n社保（企业）：项目35,500+管理8,500=44,000\n公积金（企业）：项目18,500+管理4,500=23,000\n合计：67,000\n\n制表：李会计' ,
      headers: [
        '项目',
        '内容'
      ],
      rows: [
        [
          '期间',
          '2026年2月'
        ],
        [
          '社保（企业）',
          '项目35,500+管理8,500=44,000'
        ],
        [
          '公积金（企业）',
          '项目18,500+管理4,500=23,000'
        ],
        [
          '合计',
          '67,000'
        ],
        [
          '制表',
          '李会计'
        ],
      ]}]
  },
  {
    date: '2026-02-25', role: 'accountant', title: '计提短期借款利息', tags: ["资金管理"], difficulty: 2,
    tip: '按月计提短期借款利息，到期一次性还本付息。',
    description: '计提2月短期借款利息。本金200,000元，年利率4.35%。月利息=200,000×4.35%÷12=725元。',
    entries: [
      { subjectCode: '6603', summary: '2月借款利息', debit: 725, credit: 0, explanation: '财务费用增加。' },
      { subjectCode: '2231', summary: '应付利息', debit: 0, credit: 725, explanation: '应付利息增加。累计1-2月1,450元。' }],
    documents: [
      { type: 'text', label: '利息计算表', docTitle: '借 款 利 息 计 算 表', date: '2026-02-25', stampText: '财务专用章', content: '本金：200,000×4.35%÷12=725.00元\n累计应付利息：1,450.00元\n\n制表：李会计' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '本金',
          '200,000×4.35%÷12=725.00元'
        ],
        [
          '累计应付利息',
          '1,450.00元'
        ],
        [
          '制表',
          '李会计'
        ],
      ]}]
  },
  {
    date: '2026-02-26', role: 'accountant', title: '计提2月城建税及教育附加', tags: ["税费"], difficulty: 2,
    tip: '以当月应纳增值税为基数计算附加税。服务业进项较少，附加税以销项为基数。',
    description: '计提2月附加税。本月销项税额14,880元，应纳增值税14,880元。',
    entries: [
      { subjectCode: '6403', summary: '城建税（7%）', debit: 1042, credit: 0, explanation: '税金及附加增加。14,880×7%=1,041.60。' },
      { subjectCode: '6403', summary: '教育附加（3%）', debit: 446, credit: 0, explanation: '税金及附加增加。14,880×3%=446.40。' },
      { subjectCode: '6403', summary: '地方教育附加（2%）', debit: 298, credit: 0, explanation: '税金及附加增加。14,880×2%=297.60。' },
      { subjectCode: '222103', summary: '应交城建税', debit: 0, credit: 1042, explanation: '应交城建税增加。' },
      { subjectCode: '222104', summary: '应交教育附加', debit: 0, credit: 446, explanation: '应交教育附加增加。' },
      { subjectCode: '222104', summary: '应交地方教育附加', debit: 0, credit: 298, explanation: '应交地方教育附加增加。' }],
    documents: [
      { type: 'text', label: '税费计算表', docTitle: '附 加 税 计 提 计 算 表', date: '2026-02-26', stampText: '财务专用章', content: '期间：2026年2月\n应纳增值税：14,880.00元\n城建税（7%）：1,041.60\n教育附加（3%）：446.40\n地方教育附加（2%）：297.60\n合计：1,785.60\n\n制表：李会计' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '期间',
          '2026年2月'
        ],
        [
          '应纳增值税',
          '14,880.00元'
        ],
        [
          '城建税（7%）',
          '1,041.60'
        ],
        [
          '教育附加（3%）',
          '446.40'
        ],
        [
          '地方教育附加（2%）',
          '297.60'
        ],
        [
          '合计',
          '1,785.60'
        ],
        [
          '制表',
          '李会计'
        ],
      ]}]
  },
  {
    date: '2026-02-27', role: 'accountant', title: '期末结转劳务成本至主营业务成本', tags: ["项目核算", "期末"], difficulty: 3,
    tip: '已完成收入确认的项目结转劳务成本。项目B成本结转，项目C尚未确认收入暂不结转。',
    description: '结转2月劳务成本。项目B人工72,000元+差旅15,000元+外包尾款15,000元+其他11,500元=113,500元。项目C成本暂留劳务成本余额。',
    entries: [
      { subjectCode: '6401', summary: '结转项目B人工', debit: 72000, credit: 0, explanation: '主营业务成本增加。' },
      { subjectCode: '6401', summary: '结转项目B差旅', debit: 15000, credit: 0, explanation: '主营业务成本增加。' },
      { subjectCode: '6401', summary: '结转项目B外包', debit: 15000, credit: 0, explanation: '主营业务成本增加。' },
      { subjectCode: '6401', summary: '结转项目B其他', debit: 11500, credit: 0, explanation: '主营业务成本增加。' },
      { subjectCode: '520101', summary: '结转人工成本', debit: 0, credit: 72000, explanation: '劳务成本减少。' },
      { subjectCode: '520102', summary: '结转差旅费', debit: 0, credit: 15000, explanation: '劳务成本减少。' },
      { subjectCode: '520103', summary: '结转外包费', debit: 0, credit: 15000, explanation: '劳务成本减少。' },
      { subjectCode: '520104', summary: '结转其他直接费', debit: 0, credit: 11500, explanation: '劳务成本减少。' }],
    documents: [
      { type: 'text', label: '成本结转表', docTitle: '项 目 成 本 结 转 表', date: '2026-02-27', stampText: '财务专用章', content: '项目B成本结转：\n人工：72,000\n差旅：15,000\n外包：15,000\n其他：11,500\n合计：113,500\n\n项目C成本留待后续结转。\n\n制表：李会计\n审核：赵会计主管' ,
      headers: [
        '项目',
        '内容'
      ],
      rows: [
        [
          '人工',
          '72,000'
        ],
        [
          '差旅',
          '15,000'
        ],
        [
          '外包',
          '15,000'
        ],
        [
          '其他',
          '11,500'
        ],
        [
          '合计',
          '113,500'
        ],
        [
          '制表',
          '李会计'
        ],
        [
          '审核',
          '赵会计主管'
        ],
      ]}]
  },
  {
    date: '2026-02-28', role: 'accountant', title: '月末期间损益结转', tags: ["期末"], difficulty: 3,
    tip: '结转所有损益类科目余额至本年利润。',
    description: '结转2月损益科目。收入248,000元，成本113,500元，税金1,786元，管理费用158,743元，销售费用12,000元，财务费用425元。',
    entries: [
      { subjectCode: '6001', summary: '结转收入', debit: 248000, credit: 0, explanation: '主营业务收入结转。' },
      { subjectCode: '4103', summary: '收入转入', debit: 0, credit: 248000, explanation: '本年利润增加。' },
      { subjectCode: '4103', summary: '成本费用转入', debit: 286454, credit: 0, explanation: '本年利润减少。' },
      { subjectCode: '6401', summary: '结转成本', debit: 0, credit: 113500, explanation: '主营业务成本结转。' },
      { subjectCode: '6403', summary: '结转税金', debit: 0, credit: 1786, explanation: '税金及附加结转。' },
      { subjectCode: '6602', summary: '结转管理费', debit: 0, credit: 158743, explanation: '管理费用结转。' },
      { subjectCode: '6601', summary: '结转销售费', debit: 0, credit: 12000, explanation: '销售费用结转。' },
      { subjectCode: '6603', summary: '结转财务费', debit: 0, credit: 425, explanation: '财务费用结转。（600+725-900=425）' }],
    documents: [
      { type: 'text', label: '结转表', docTitle: '期 间 损 益 结 转 表', date: '2026-02-28', stampText: '已结转', content: '2026年2月损益结转\n收入：248,000\n成本：113,500\n税金：1,786\n管理费：158,743\n销售费：12,000\n财务费：425\n净利润：-38,454\n\n说明：2月仍属项目前期投入阶段。' ,
      headers: [
        '项目',
        '内容'
      ],
      rows: [
        [
          '收入',
          '248,000'
        ],
        [
          '成本',
          '113,500'
        ],
        [
          '税金',
          '1,786'
        ],
        [
          '管理费',
          '158,743'
        ],
        [
          '销售费',
          '12,000'
        ],
        [
          '财务费',
          '425'
        ],
        [
          '净利润',
          '-38,454'
        ],
        [
          '说明',
          '2月仍属项目前期投入阶段。'
        ],
      ]}]
  },
  {
    date: '2026-02-28', role: 'accountant', title: '模拟纳税申报', tags: ["税费", "期末"], difficulty: 1, tip: '每月15日前完成申报。',
    description: '完成2月账务处理后进行模拟纳税申报。', entries: [], nextAction: 'tax-filing',
    documents: [{ type: 'text', label: '申报提醒', docTitle: '2 月 纳 税 申 报 提 醒', stampText: '财务专用章', content: '申报期间：2026年2月\n截止日期：2026年3月15日\n\n申报税种：\n1. 增值税（6%，销项税额14,880元）\n2. 城市维护建设税（7%）\n3. 教育费附加（3%+2%）\n4. 代扣代缴个人所得税\n\n请前往纳税申报页面核对后提交。' }]
  },
]

export default feb
