/**
 * 服务业（管理咨询/IT咨询/软件开发）1月教学任务
 *
 * 行业特征：项目制核算、人力成本为主、轻资产
 * 企业类型：一般纳税人（增值税6%）
 * 企业名称：雲帆管理咨询有限公司
 * 本月主题：🚀 开年新局·首签大单
 *   - 开年收尾款、新签战略咨询项目、项目启动
 *   - 筹资（增资+借款）+ 资产购置
 *   - 项目成本归集 + T&M收入确认
 *
 * 会计准则依据：
 * - 《企业会计准则第14号——收入》（财会[2017]22号）
 * - 《企业会计准则第6号——无形资产》
 *
 * 知识点标签：项目核算、收入确认、人工成本、费用管理、工资社保、税费、往来管理、资金管理、期末
 */

const jan = [
  // ═══════════════════════════════════════════
  // 第一周：开年收尾 + 筹资（1月2日~1月7日）
  // ═══════════════════════════════════════════
  {
    date: '2026-01-02', role: 'accountant', title: '收回A公司上年咨询尾款', tags: ["往来管理", "资金管理"], difficulty: 1,
    tip: '收回已确认收入的应收账款，不涉及收入确认。借：银行存款，贷：应收账款。',
    description: '收到A公司支付的上年管理咨询项目尾款150,000元，已存入工商银行账户。',
    entries: [
      { subjectCode: '100201', summary: '收回A公司尾款', debit: 150000, credit: 0 },
      { subjectCode: '1122', summary: 'A公司尾款', debit: 0, credit: 150000 }],
    documents: [
      { type: 'bank', label: '收款回单', date: '2026-01-02', totalAmount: 150000, payer: 'A公司', payerAccount: '6222 0100 **** 1111', payeeName: '雲帆管理咨询有限公司', payeeAccount: '6222 0200 **** 1234', content: '支付管理咨询项目尾款', refNo: 'HD202601020001' }]
  },
  {
    date: '2026-01-03', role: 'accountant', title: '新签B公司战略咨询合同·收到预付款', tags: ["项目核算", "收入确认"], difficulty: 2,
    tip: '预收服务款计入合同负债（新CAS 14），待履约后分期转收入。借：银行存款，贷：合同负债。',
    description: '与B公司签订年度战略咨询合同，合同总额600,000元。按合同约定，签约时收取50%预付款300,000元，已到账。',
    entries: [
      { subjectCode: '100201', summary: 'B公司预付咨询费', debit: 300000, credit: 0 },
      { subjectCode: '2232', summary: '预收B公司咨询费', debit: 0, credit: 300000 }],
    documents: [
      { type: 'bank', label: '收款回单', date: '2026-01-03', totalAmount: 300000, payer: 'B公司', payeeName: '雲帆管理咨询有限公司', content: '战略咨询合同预付款（50%）', refNo: 'HD202601030002' },
      { type: 'text', label: '咨询合同', docTitle: '管 理 咨 询 合 同', date: '2026-01-03', stampText: '合同专用章', content: '甲方：B公司\n乙方：雲帆管理咨询有限公司\n\n项目名称：2026年度战略管理咨询\n合同金额：600,000元\n付款方式：签约付50%，中期报告付30%，终验付20%\n服务期限：2026年1月-2026年6月\n\n服务内容：企业战略规划、组织架构优化、业务流程再造' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '甲方',
          'B公司'
        ],
        [
          '乙方',
          '雲帆管理咨询有限公司'
        ],
        [
          '项目名称',
          '2026年度战略管理咨询'
        ],
        [
          '合同金额',
          '600,000元'
        ],
        [
          '付款方式',
          '签约付50%，中期报告付30%，终验付20%'
        ],
        [
          '服务期限',
          '2026年1月-2026年6月'
        ],
        [
          '服务内容',
          '企业战略规划、组织架构优化、业务流程再造'
        ],
      ]}]
  },
  {
    date: '2026-01-04', role: 'accountant', title: '收到新股东增资款', tags: ["资金管理"], difficulty: 1,
    tip: '企业收到投资者投入资本时，银行存款增加记借方，实收资本增加记贷方。',
    description: '经股东会决议，引进新战略投资者，追加投入资本金500,000元，已存入工商银行账户。增资后注册资本变更为300万元。',
    entries: [
      { subjectCode: '100201', summary: '收到增资款', debit: 500000, credit: 0 },
      { subjectCode: '4001', summary: '新股东增资', debit: 0, credit: 500000 }],
    documents: [
      { type: 'bank', label: '收款回单', date: '2026-01-04', totalAmount: 500000, payer: '新投资者（王某）', payeeName: '雲帆管理咨询有限公司', content: '增资入股款', refNo: 'HD202601040003' },
      { type: 'text', label: '增资协议', docTitle: '增 资 扩 股 协 议', date: '2026-01-04', stampText: '股东会决议', content: '经全体股东一致同意，引进新股东王某以货币500,000元增资，增资后注册资本由250万元增至300万元。王某持股16.67%。\n\n全体股东签字确认。' }]
  },
  {
    date: '2026-01-05', role: 'accountant', title: '取得短期流动资金借款', tags: ["资金管理"], difficulty: 1,
    tip: '短期借款期限1年以内。取得时：借银行存款，贷短期借款。利息按月计提。',
    description: '因业务扩张需要，向工商银行借入短期流动资金借款200,000元，期限6个月，年利率4.35%，款项已到账。',
    entries: [
      { subjectCode: '100201', summary: '取得短期借款', debit: 200000, credit: 0 },
      { subjectCode: '2001', summary: '短期借款', debit: 0, credit: 200000 }],
    documents: [
      { type: 'bank', label: '借款回单', date: '2026-01-05', totalAmount: 200000, payer: '工商银行北京分行', payeeName: '雲帆管理咨询有限公司', content: '短期流动资金贷款发放', refNo: 'DK202601050001' },
      { type: 'text', label: '借款合同', docTitle: '流 动 资 金 借 款 合 同', content: '贷款人：中国工商银行北京分行\n借款人：雲帆管理咨询有限公司\n借款金额：200,000元\n期限：6个月（2026.1.5-2026.7.4）\n年利率：4.35%\n还款方式：到期一次性还本付息\n\n贷款行盖章：✓' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '贷款人',
          '中国工商银行北京分行'
        ],
        [
          '借款人',
          '雲帆管理咨询有限公司'
        ],
        [
          '借款金额',
          '200,000元'
        ],
        [
          '期限',
          '6个月（2026.1.5-2026.7.4）'
        ],
        [
          '年利率',
          '4.35%'
        ],
        [
          '还款方式',
          '到期一次性还本付息'
        ],
        [
          '贷款行盖章',
          '✓'
        ],
      ]}]
  },
  {
    date: '2026-01-06', role: 'accountant', title: '支付上年12月员工工资', tags: ["工资社保"], difficulty: 1,
    tip: '发放上月计提的工资。冲减应付职工薪酬，扣减个人社保公积金后实发。',
    description: '银行代发上年12月员工工资。应发工资总额120,000元，代扣个人社保12,000元、个人公积金6,000元，代扣个税2,500元，实发99,500元。',
    entries: [
      { subjectCode: '221101', summary: '发放12月工资', debit: 120000, credit: 0, explanation: '冲减应付职工薪酬。全额冲销上月已计提的应付工资。' },
      { subjectCode: '100201', summary: '实发工资', debit: 0, credit: 99500, explanation: '银行存款减少。实发=120,000-12,000-6,000-2,500=99,500。' },
      { subjectCode: '224101', summary: '代扣个人社保', debit: 0, credit: 12000, explanation: '其他应付款——社保个人部分增加。代扣的社保暂存，待缴纳时冲减。' },
      { subjectCode: '224102', summary: '代扣个人公积金', debit: 0, credit: 6000, explanation: '其他应付款——公积金个人部分增加。' },
      { subjectCode: '222110', summary: '代扣个税', debit: 0, credit: 2500, explanation: '应交个人所得税增加。代扣个税需在次月15日前缴纳。' }],
    documents: [
      { type: 'bank', label: '代发工资回单', date: '2026-01-06', totalAmount: 99500, payer: '雲帆管理咨询有限公司', payeeName: '员工代发户', content: '12月工资代发（共42人）', refNo: 'HD202601060004' },
      { type: 'text', label: '工资表', docTitle: '12 月 工 资 发 放 表', date: '2026-01-06', stampText: '人力资源部\n工资专用章', content: '期间：2025年12月\n应发工资总额：120,000.00元\n扣款：社保12,000+公积金6,000+个税2,500=20,500元\n实发合计：99,500.00元（银行代发）\n\n制表：王出纳\n审核：李会计' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '期间',
          '2025年12月'
        ],
        [
          '应发工资总额',
          '120,000.00元'
        ],
        [
          '扣款',
          '社保12,000+公积金6,000+个税2,500=20,500元'
        ],
        [
          '实发合计',
          '99,500.00元（银行代发）'
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
    date: '2026-01-07', role: 'accountant', title: '缴纳上年Q4企业所得税', tags: ["税费"], difficulty: 1,
    tip: '季度预缴企业所得税。上季末已计提，本月初缴纳冲减应交税费。',
    description: '缴纳上年第4季度预缴企业所得税45,000元。',
    entries: [
      { subjectCode: '222106', summary: '缴纳Q4所得税', debit: 45000, credit: 0, explanation: '应交所得税减少。冲减上季末计提的应交所得税。' },
      { subjectCode: '100201', summary: '缴纳税款', debit: 0, credit: 45000, explanation: '银行存款减少。' }],
    documents: [
      { type: 'bank', label: '缴税回单', date: '2026-01-07', totalAmount: 45000, payer: '雲帆管理咨询有限公司', payeeName: '国家税务总局北京市税务局', content: '2025年Q4企业所得税预缴', refNo: 'HD202601070005' }]
  },
  // ═══════════════════════════════════════════
  // 第二周：项目启动 + 资产购置（1月8日~1月14日）
  // ═══════════════════════════════════════════
  {
    date: '2026-01-08', role: 'accountant', title: '购买顾问办公用笔记本电脑', tags: ["费用管理"], difficulty: 1,
    tip: '办公设备作为固定资产入账，按月计提折旧。借：固定资产，贷：银行存款。',
    description: '为新增顾问购置高性能笔记本电脑5台，共计60,000元（单价12,000元/台），通过银行转账支付。',
    entries: [
      { subjectCode: '160105', summary: '购笔记本电脑', debit: 60000, credit: 0, explanation: '固定资产——电子设备增加。单价12,000元×5台=60,000元，符合固定资产确认条件。' },
      { subjectCode: '100201', summary: '支付设备款', debit: 0, credit: 60000, explanation: '银行存款减少。资本性支出，不计入当期费用。' }],
    documents: [
      { type: 'invoice', label: '增值税普通发票', region: '北京', invoiceNo: '1100365432', date: '2026年01月08日', buyer: '雲帆管理咨询有限公司', seller: '中关村数码科技有限公司', lineItems: [{ name: 'ThinkPad X1 Carbon', qty: 5, price: 12000, amount: 60000 }], totalAmount: 60000 },
      { type: 'bank', label: '转账回单', date: '2026-01-08', totalAmount: 60000, payer: '雲帆管理咨询有限公司', payeeName: '中关村数码科技有限公司', content: '购笔记本电脑5台', refNo: 'HD202601080006' }]
  },
  {
    date: '2026-01-09', role: 'accountant', title: '预付全年项目管理软件SaaS费', tags: ["费用管理"], difficulty: 2,
    tip: '预付全年服务费先计入长期待摊费用或预付账款，按月摊销。借：预付账款/长期待摊费用，贷：银行存款。',
    description: '采购团队协作与项目管理软件一年SaaS服务，总金额36,000元（月均3,000元），一次性付清全年费用。受益期覆盖全年12个月。',
    entries: [
      { subjectCode: '1208', summary: '预付SaaS年费', debit: 36000, credit: 0, explanation: '长期待摊费用增加。一次性支付全年费用，受益期12个月，需按月摊销。' },
      { subjectCode: '100201', summary: '支付软件年费', debit: 0, credit: 36000, explanation: '银行存款减少。' }],
    documents: [
      { type: 'bank', label: '转账回单', date: '2026-01-09', totalAmount: 36000, payer: '雲帆管理咨询有限公司', payeeName: '北京云帆科技有限公司', content: '项目管理SaaS年费（2026全年）', refNo: 'HD202601090007' },
      { type: 'text', label: '服务合同', docTitle: 'SaaS 服 务 合 同', date: '2026-01-09', content: '服务商：北京云帆科技有限公司\n采购方：雲帆管理咨询有限公司\n服务内容：项目管理SaaS平台（含工时管理、项目看板、成本核算模块）\n服务期限：2026年1月-2026年12月\n合同金额：36,000元（按年支付）' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '服务商',
          '北京云帆科技有限公司'
        ],
        [
          '采购方',
          '雲帆管理咨询有限公司'
        ],
        [
          '服务内容',
          '项目管理SaaS平台（含工时管理、项目看板、成本核算模块）'
        ],
        [
          '服务期限',
          '2026年1月-2026年12月'
        ],
        [
          '合同金额',
          '36,000元（按年支付）'
        ],
      ]}]
  },
  {
    date: '2026-01-10', role: 'accountant', title: '项目B启动·顾问现场调研差旅', tags: ["项目核算"], difficulty: 2,
    tip: '项目直接相关差旅费通过"劳务成本"归集。借：劳务成本-差旅费，贷：银行存款。',
    description: 'B公司战略咨询项目启动，3名顾问赴客户总部（上海）进行为期一周的现场调研。预付差旅费用12,000元（含往返机票、住宿、市内交通）。',
    entries: [
      { subjectCode: '520102', summary: '项目B调研差旅', debit: 12000, credit: 0, explanation: '劳务成本——差旅费增加。项目直接相关的差旅费归集到项目成本中。' },
      { subjectCode: '100201', summary: '支付差旅费', debit: 0, credit: 12000, explanation: '银行存款减少。' }],
    documents: [
      { type: 'receipt', label: '机票行程单', docTitle: '航空运输电子客票行程单', date: '2026-01-10', totalAmount: 7200, payer: '雲帆管理咨询有限公司', items: [{ name: '北京→上海 3张×1,200元', qty: 3, price: 1200, amount: 3600 }, { name: '上海→北京 3张×1,200元', qty: 3, price: 1200, amount: 3600 }]},
      { type: 'receipt', label: '住宿发票', docTitle: '住宿费发票', date: '2026-01-10', totalAmount: 3600, payer: '雲帆管理咨询有限公司', items: [{ name: '上海XX酒店 3间×3晚×400元', qty: 9, price: 400, amount: 3600 }]},
      { type: 'bank', label: '转账回单', date: '2026-01-10', totalAmount: 12000, payer: '雲帆管理咨询有限公司', payeeName: '各收款方（机票/酒店）', content: '项目B启动差旅费', refNo: 'HD202601100008' }]
  },
  {
    date: '2026-01-11', role: 'accountant', title: '支付项目B外聘行业专家费', tags: ["项目核算"], difficulty: 2,
    tip: '外包给外部专家的费用计入劳务成本——外包服务费。借：劳务成本-外包服务费，贷：银行存款。',
    description: '因项目B涉及高端制造业战略规划，特聘两位外部行业专家参与，支付专家咨询费共计25,000元。',
    entries: [
      { subjectCode: '520103', summary: '外聘专家-项目B', debit: 25000, credit: 0, explanation: '劳务成本——外包服务费增加。外聘专家的劳务费用归集到项目成本。' },
      { subjectCode: '100201', summary: '支付专家费', debit: 0, credit: 25000, explanation: '银行存款减少。' }],
    documents: [
      { type: 'bank', label: '转账回单', date: '2026-01-11', totalAmount: 25000, payer: '雲帆管理咨询有限公司', payeeName: '张专家（代扣个税后）', content: '项目B外聘专家咨询费', refNo: 'HD202601110009' },
      { type: 'text', label: '专家协议', docTitle: '外 聘 专 家 服 务 协 议', date: '2026-01-11', content: '甲方：雲帆管理咨询有限公司\n乙方：张XX、李XX（外部专家）\n\n服务内容：B公司战略咨询项目——高端制造业市场分析及技术趋势研判\n服务费：25,000元（含税，甲方代扣代缴个税）\n服务期限：2026年1月11日-1月25日' ,
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
          '张XX、李XX（外部专家）'
        ],
        [
          '服务内容',
          'B公司战略咨询项目——高端制造业市场分析及技术趋势研判'
        ],
        [
          '服务费',
          '25,000元（含税，甲方代扣代缴个税）'
        ],
        [
          '服务期限',
          '2026年1月11日-1月25日'
        ],
      ]}]
  },
  {
    date: '2026-01-12', role: 'accountant', title: '支付猎头招聘服务费', tags: ["费用管理"], difficulty: 1,
    tip: '招聘费用属于管理费用。借：管理费用-招聘费，贷：银行存款。',
    description: '因业务扩张，委托猎头公司招聘3名高级顾问，支付猎头服务费15,000元。',
    entries: [
      { subjectCode: '6602', summary: '猎头招聘费', debit: 15000, credit: 0, explanation: '管理费用增加。招聘费属于行政管理支出。' },
      { subjectCode: '100201', summary: '支付招聘费', debit: 0, credit: 15000, explanation: '银行存款减少。' }],
    documents: [
      { type: 'receipt', label: '服务发票', docTitle: '猎头服务费发票', date: '2026-01-12', totalAmount: 15000, payer: '雲帆管理咨询有限公司', stampText: '锐仕猎头\n发票专用章', items: [{ name: '高级管理顾问招聘服务（3名）', qty: 3, price: 5000, amount: 15000 }]}]
  },
  {
    date: '2026-01-13', role: 'accountant', title: '按里程碑确认项目B第一阶段收入', tags: ["项目核算", "收入确认"], difficulty: 2,
    tip: '完成第一阶段工作后，将对应的合同负债转为主营业务收入。借：合同负债，贷：主营业务收入、应交税费。',
    description: 'B公司项目完成第一阶段"现状诊断与调研报告"，按合同约定确认该里程碑收入。第一阶段合同价款80,000元，增值税6%=4,800元。将预收款中的84,800元结转收入。',
    entries: [
      { subjectCode: '2232', summary: 'B公司预收款转收入', debit: 84800, credit: 0, explanation: '合同负债减少。已完成阶段性履约义务，预收款转为收入。' },
      { subjectCode: '6001', summary: '项目B第一阶段收入', debit: 0, credit: 80000, explanation: '主营业务收入增加。确认咨询项目第一阶段收入，依据CAS 14按履约进度确认。' },
      { subjectCode: '222101', summary: '销项税额6%', debit: 0, credit: 4800, explanation: '应交增值税——销项税额增加。服务业一般纳税人适用6%税率。' }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '北京', invoiceType: '专用', copy: '发票联', invoiceNo: '1100432111', date: '2026年01月13日', buyer: 'B公司', buyerTaxId: '91110108MAXXXXXXXX', seller: '雲帆管理咨询有限公司', sellerTaxId: '91110108MA3XXXXXXXX', stampText: '发票专用章', payee: '李四', reviewer: '王五', drawer: '赵六', lineItems: [{ name: '管理咨询服务（第一阶段-现状诊断与调研报告）', unit: '项', qty: 1, price: 80000, amount: 80000, taxRate: '6%', tax: 4800 }], totalAmount: 84800 },
      { type: 'text', label: '项目验收单', docTitle: '阶 段 性 验 收 确 认 单', date: '2026-01-13', stampText: 'B公司\n项目验收专用章', content: '项目名称：2026年度战略管理咨询\n阶段：第一阶段——现状诊断与调研报告\n验收结论：通过 ✓\n交付物：市场分析报告、内部诊断报告、行业对标分析\n\n甲方代表：张总\n乙方代表：王顾问' ,
      headers: [
        '项目',
        '内容'
      ],
      rows: [
        [
          '项目名称',
          '2026年度战略管理咨询'
        ],
        [
          '阶段',
          '第一阶段——现状诊断与调研报告'
        ],
        [
          '验收结论',
          '通过 ✓'
        ],
        [
          '交付物',
          '市场分析报告、内部诊断报告、行业对标分析'
        ],
        [
          '甲方代表',
          '张总'
        ],
        [
          '乙方代表',
          '王顾问'
        ],
      ]}]
  },
  // ═══════════════════════════════════════════
  // 第三周：日常运营 + 成本归集（1月14日~1月21日）
  // ═══════════════════════════════════════════
  {
    date: '2026-01-14', role: 'accountant', title: '缴纳社保及公积金', tags: ["工资社保"], difficulty: 1,
    tip: '缴纳上月企业+个人社保公积金。企业部分计入各成本费用，个人部分冲其他应付款。借：应付职工薪酬/其他应付款，贷：银行存款。',
    description: '缴纳上月企业及个人社保公积金。企业部分：社保28,000元、公积金14,000元；个人部分：社保12,000元、公积金6,000元。合计60,000元。',
    entries: [
      { subjectCode: '221102', summary: '缴纳上月企业社保', debit: 28000, credit: 0, explanation: '应付职工薪酬——社保（企业部分）减少。' },
      { subjectCode: '224101', summary: '缴纳个人社保', debit: 12000, credit: 0, explanation: '其他应付款——个人社保减少。冲销上月代扣的个人社保。' },
      { subjectCode: '221102', summary: '缴纳企业公积金', debit: 14000, credit: 0, explanation: '应付职工薪酬——公积金（企业部分）减少。' },
      { subjectCode: '224102', summary: '缴纳个人公积金', debit: 6000, credit: 0, explanation: '其他应付款——个人公积金减少。冲销上月代扣的个人公积金。' },
      { subjectCode: '100201', summary: '支付社保公积金', debit: 0, credit: 60000, explanation: '银行存款减少。合计28,000+12,000+14,000+6,000=60,000。' }],
    documents: [
      { type: 'bank', label: '扣款回单', date: '2026-01-14', totalAmount: 60000, payer: '雲帆管理咨询有限公司', payeeName: '北京市社会保险基金管理中心', content: '社保+公积金缴纳（2025年12月）', refNo: 'HD202601140010' }]
  },
  {
    date: '2026-01-15', role: 'accountant', title: '计提1月折旧', tags: ["费用管理"], difficulty: 2,
    tip: '固定资产次月起计提折旧。笔记本电脑按3年、办公桌椅按5年，残值率5%。借：管理费用，贷：累计折旧。',
    description: '计提1月固定资产折旧。笔记本电脑原值60,000元（残值率5%，3年）、办公桌椅原值48,000元（残值率5%，5年）。',
    entries: [
      { subjectCode: '6602', summary: '折旧-电脑', debit: 1583, credit: 0, explanation: '管理费用增加。笔记本电脑月折旧=60,000×95%÷36=1,583.33。' },
      { subjectCode: '6602', summary: '折旧-办公桌椅', debit: 760, credit: 0, explanation: '管理费用增加。办公桌椅月折旧=48,000×95%÷60=760.00。' },
      { subjectCode: '1602', summary: '累计折旧', debit: 0, credit: 2343, explanation: '累计折旧增加。合计1,583.33+760.00=2,343.33。' }],
    documents: [
      { type: 'text', label: '折旧计算表', docTitle: '固 定 资 产 折 旧 计 算 表', date: '2026-01-15', stampText: '财务专用章', content: '折旧期间：2026年1月\n\n1. 笔记本电脑（原值60,000，残值率5%，年限3年）\n   月折旧=60,000×95%÷36=1,583.33元\n\n2. 办公桌椅（原值48,000，残值率5%，年限5年）\n   月折旧=48,000×95%÷60=760.00元\n\n合计：2,343.33元\n\n制表：李会计' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '折旧期间',
          '2026年1月'
        ],
        [
          '合计',
          '2,343.33元'
        ],
        [
          '制表',
          '李会计'
        ],
      ]}]
  },
  {
    date: '2026-01-16', role: 'accountant', title: '摊销预付SaaS服务费', tags: ["费用管理"], difficulty: 2,
    tip: '长期待摊费用按受益期平均摊销。借：管理费用，贷：长期待摊费用。',
    description: '摊销1月项目管理软件SaaS服务费。全年费用36,000元，分12个月摊销，月均3,000元。',
    entries: [
      { subjectCode: '6602', summary: '摊销SaaS费', debit: 3000, credit: 0, explanation: '管理费用增加。本月应摊销3,000元。' },
      { subjectCode: '1208', summary: '摊销SaaS年费', debit: 0, credit: 3000, explanation: '长期待摊费用减少。' }],
    documents: [
      { type: 'text', label: '摊销计算表', docTitle: '长 期 待 摊 费 用 摊 销 表', date: '2026-01-16', stampText: '财务专用章', content: '费用项目：项目管理SaaS年费\n原值：36,000.00元\n摊销期限：12个月（2026.1-2026.12）\n本月摊销：36,000÷12=3,000.00元\n累计摊销：3,000.00元\n剩余待摊：33,000.00元' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '费用项目',
          '项目管理SaaS年费'
        ],
        [
          '原值',
          '36,000.00元'
        ],
        [
          '摊销期限',
          '12个月（2026.1-2026.12）'
        ],
        [
          '本月摊销',
          '36,000÷12=3,000.00元'
        ],
        [
          '累计摊销',
          '3,000.00元'
        ],
        [
          '剩余待摊',
          '33,000.00元'
        ],
      ]}]
  },
  {
    date: '2026-01-17', role: 'accountant', title: '支付写字楼租金及物业费', tags: ["费用管理"], difficulty: 1,
    tip: '办公室租金计入管理费用。借：管理费用-房租物业，贷：银行存款。',
    description: '支付1月写字楼办公租金22,000元及物业管理费3,000元，合计25,000元。',
    entries: [
      { subjectCode: '660205', summary: '1月房租', debit: 22000, credit: 0, explanation: '管理费用——房租物业增加。办公室租金。' },
      { subjectCode: '660205', summary: '1月物业费', debit: 3000, credit: 0, explanation: '管理费用——房租物业增加。物业管理费。' },
      { subjectCode: '100201', summary: '支付租金物业', debit: 0, credit: 25000, explanation: '银行存款减少。合计22,000+3,000=25,000。' }],
    documents: [
      { type: 'receipt', label: '收据', docTitle: '房 屋 租 赁 专 用 收 据', date: '2026-01-17', totalAmount: 25000, payer: '雲帆管理咨询有限公司', paymentMethod: '银行转账', stampText: '北京XX物业管理有限公司\n财务专用章', items: [{ name: '望京XX大厦15层 1月租金', qty: 1, price: 22000, amount: 22000 }, { name: '1月物业管理费', qty: 1, price: 3000, amount: 3000 }]}]
  },
  {
    date: '2026-01-18', role: 'accountant', title: '支付水电费及网络通信费', tags: ["费用管理"], difficulty: 1,
    tip: '水电网络等日常运营费用计入管理费用。借：管理费用，贷：银行存款。',
    description: '支付1月办公水电费3,500元、企业宽带及电话费2,000元，合计5,500元。',
    entries: [
      { subjectCode: '6602', summary: '1月水电费', debit: 3500, credit: 0, explanation: '管理费用增加。办公用水电。' },
      { subjectCode: '6602', summary: '1月网络通信', debit: 2000, credit: 0, explanation: '管理费用增加。企业宽带及电话费。' },
      { subjectCode: '100201', summary: '支付水电网络', debit: 0, credit: 5500, explanation: '银行存款减少。' }],
    documents: [
      { type: 'receipt', label: '电费单', docTitle: '电 费 缴 费 凭 证', date: '2026-01-18', totalAmount: 3500, payer: '雲帆管理咨询有限公司', stampText: '国家电网\n电费收讫章', items: [{ name: '写字楼用电 3,500kWh×1.00元', qty: 3500, price: 1, amount: 3500 }]},
      { type: 'receipt', label: '通信费发票', docTitle: '通 信 服 务 发 票', date: '2026-01-18', totalAmount: 2000, payer: '雲帆管理咨询有限公司', stampText: '中国联通\n发票专用章', items: [{ name: '企业宽带（1月）', qty: 1, price: 1000, amount: 1000 }, { name: '企业电话费（1月）', qty: 1, price: 1000, amount: 1000 }]}]
  },
  {
    date: '2026-01-19', role: 'accountant', title: '报销项目B资料及通讯费', tags: ["项目核算"], difficulty: 2,
    tip: '项目直接费用（资料、通讯等）通过劳务成本——其他直接费用归集。借：劳务成本-其他直接费，贷：银行存款。',
    description: '项目B顾问报销调研期间资料打印费、行业报告购买费及通讯费，共计3,000元。',
    entries: [
      { subjectCode: '520104', summary: '项目B资料通讯费', debit: 3000, credit: 0, explanation: '劳务成本——其他直接费用增加。项目直接相关的资料及通讯费用。' },
      { subjectCode: '100201', summary: '报销付款', debit: 0, credit: 3000, explanation: '银行存款减少。' }],
    documents: [
      { type: 'receipt', label: '报销单', docTitle: '费 用 报 销 单', date: '2026-01-19', totalAmount: 3000, payer: '雲帆管理咨询有限公司', stampText: '财务\n审核专用章', items: [{ name: '行业报告购买（3份）', qty: 3, price: 600, amount: 1800 }, { name: '资料打印装订费', qty: 1, price: 800, amount: 800 }, { name: '项目通讯补贴', qty: 1, price: 400, amount: 400 }]}]
  },
  {
    date: '2026-01-20', role: 'accountant', title: '报销客户接待餐费', tags: ["费用管理"], difficulty: 1,
    tip: '业务招待费计入管理费用，有税前扣除限额（发生额的60%，最高不超过营业收入5‰）。借：管理费用-招待费，贷：银行存款。',
    description: '项目B团队宴请客户方项目负责人，报销餐费2,000元。',
    entries: [
      { subjectCode: '660203', summary: '招待B公司客户', debit: 2000, credit: 0, explanation: '管理费用——业务招待费增加。' },
      { subjectCode: '100201', summary: '报销餐费', debit: 0, credit: 2000, explanation: '银行存款减少。' }],
    documents: [
      { type: 'receipt', label: '餐饮发票', docTitle: '北 京 市 餐 饮 服 务 发 票', date: '2026-01-20', totalAmount: 2000, payer: '雲帆管理咨询有限公司', stampText: 'XX酒店\n发票专用章', items: [{ name: '商务宴请餐费', qty: 1, price: 2000, amount: 2000 }]}]
  },
  // ═══════════════════════════════════════════
  // 第四周：后续收入 + 薪酬计提（1月21日~1月27日）
  // ═══════════════════════════════════════════
  {
    date: '2026-01-21', role: 'accountant', title: '项目B中期交付·确认第二阶段收入', tags: ["项目核算", "收入确认"], difficulty: 2,
    tip: '按里程碑开票确认收入。借：合同负债/应收账款，贷：主营业务收入、应交税费。',
    description: 'B公司项目完成第二阶段"战略方案设计"，按合同约定确认该里程碑收入。第二阶段合同价款120,000元，增值税6%=7,200元。客户已确认，按合同约定本次30%预收款中支付尾款，剩余20%终验后支付。',
    entries: [
      { subjectCode: '2232', summary: 'B公司预收款转收入', debit: 127200, credit: 0, explanation: '合同负债减少。第二阶段里程碑完成，转出预收款。' },
      { subjectCode: '6001', summary: '项目B第二阶段收入', debit: 0, credit: 120000, explanation: '主营业务收入增加。中期交付的战略方案设计服务。' },
      { subjectCode: '222101', summary: '销项税额6%', debit: 0, credit: 7200, explanation: '应交增值税——销项税额增加。' }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '北京', invoiceType: '专用', copy: '发票联', invoiceNo: '1100432112', date: '2026年01月21日', buyer: 'B公司', buyerTaxId: '91110108MAXXXXXXXX', seller: '雲帆管理咨询有限公司', sellerTaxId: '91110108MA3XXXXXXXX', stampText: '发票专用章', payee: '李四', reviewer: '王五', drawer: '赵六', lineItems: [{ name: '管理咨询服务（第二阶段-战略方案设计）', unit: '项', qty: 1, price: 120000, amount: 120000, taxRate: '6%', tax: 7200 }], totalAmount: 127200 },
      { type: 'text', label: '项目验收单', docTitle: '阶 段 性 验 收 确 认 单', date: '2026-01-21', stampText: 'B公司\n项目验收专用章', content: '项目名称：2026年度战略管理咨询\n阶段：第二阶段——战略方案设计\n验收结论：通过 ✓\n交付物：三年战略规划方案、组织架构优化方案\n\n甲方代表：张总\n乙方代表：王顾问' ,
      headers: [
        '项目',
        '内容'
      ],
      rows: [
        [
          '项目名称',
          '2026年度战略管理咨询'
        ],
        [
          '阶段',
          '第二阶段——战略方案设计'
        ],
        [
          '验收结论',
          '通过 ✓'
        ],
        [
          '交付物',
          '三年战略规划方案、组织架构优化方案'
        ],
        [
          '甲方代表',
          '张总'
        ],
        [
          '乙方代表',
          '王顾问'
        ],
      ]}]
  },
  {
    date: '2026-01-22', role: 'accountant', title: '银行手续费', tags: ["资金管理"], difficulty: 1,
    tip: '银行手续费计入财务费用。借：财务费用，贷：银行存款。',
    description: '银行扣收1月账户管理费、转账手续费等共计500元。',
    entries: [
      { subjectCode: '6603', summary: '银行手续费', debit: 500, credit: 0, explanation: '财务费用增加。' },
      { subjectCode: '100201', summary: '银行扣费', debit: 0, credit: 500, explanation: '银行存款减少。' }],
    documents: [
      { type: 'bank', label: '扣费回单', date: '2026-01-22', totalAmount: 500, payer: '雲帆管理咨询有限公司', payeeName: '中国工商银行北京分行', content: '1月账户服务费及转账手续费', refNo: 'HD202601220011' }]
  },
  {
    date: '2026-01-23', role: 'accountant', title: '银行活期存款结息', tags: ["资金管理"], difficulty: 1,
    tip: '银行存款利息收入冲减财务费用。借：银行存款，贷：财务费用（负数或红字）。',
    description: '银行1月活期存款结息800元到账。',
    entries: [
      { subjectCode: '100201', summary: '1月活期结息', debit: 800, credit: 0, explanation: '银行存款增加。' },
      { subjectCode: '6603', summary: '利息收入（负数）', debit: 0, credit: 800, explanation: '财务费用减少。利息收入冲减财务费用。' }],
    documents: [
      { type: 'bank', label: '结息回单', date: '2026-01-23', totalAmount: 800, payer: '工商银行北京分行', payeeName: '雲帆管理咨询有限公司', content: '活期存款2026年1月结息', refNo: 'HD202601230012' }]
  },
  {
    date: '2026-01-24', role: 'accountant', title: '计提本月员工工资', tags: ["工资社保"], difficulty: 2,
    tip: '项目人员薪酬通过劳务成本归集，管理人员薪酬直接计入管理费用。借：劳务成本/管理费用，贷：应付职工薪酬。',
    description: '计提1月员工工资。项目人员（咨询顾问+开发人员）工资120,000元，管理人员（行政+财务）工资40,000元，合计160,000元。（注：新招聘3人未满月，按实际到岗天数计算）',
    entries: [
      { subjectCode: '520101', summary: '计提项目人员工资', debit: 120000, credit: 0, explanation: '劳务成本——人工成本增加。项目顾问薪酬，应直接归集到项目成本。' },
      { subjectCode: '6602', summary: '计提管理人员工资', debit: 40000, credit: 0, explanation: '管理费用——工资薪金增加。行政及财务人员薪酬。' },
      { subjectCode: '221101', summary: '应付1月工资', debit: 0, credit: 160000, explanation: '应付职工薪酬——工资增加。合计120,000+40,000=160,000。' }],
    documents: [
      { type: 'text', label: '工资计算表', docTitle: '1 月 工 资 计 算 汇 总 表', date: '2026-01-24', stampText: '人力资源部\n工资专用章', content: '期间：2026年1月\n\n项目人员（45人）：\n  咨询顾问：85,000元\n  开发工程师：35,000元\n  小计：120,000元\n\n管理人员（5人）：\n  行政人事：20,000元\n  财务人员：20,000元\n  小计：40,000元\n\n应发合计：160,000元\n\n制表：王出纳\n审核：李会计' ,
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
          '咨询顾问',
          '85,000元'
        ],
        [
          '开发工程师',
          '35,000元'
        ],
        [
          '小计',
          '120,000元'
        ],
        [
          '行政人事',
          '20,000元'
        ],
        [
          '财务人员',
          '20,000元'
        ],
        [
          '小计',
          '40,000元'
        ],
        [
          '应发合计',
          '160,000元'
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
    date: '2026-01-25', role: 'accountant', title: '计提企业社保及公积金', tags: ["工资社保"], difficulty: 2,
    tip: '企业承担的社保公积金按人员归属分别计入劳务成本和管理费用。借：劳务成本/管理费用，贷：应付职工薪酬。',
    description: '计提1月企业应承担的社保及公积金。项目人员社保25,000元、公积金13,000元；管理人员社保8,000元、公积金4,000元。合计50,000元。',
    entries: [
      { subjectCode: '520101', summary: '计提项目社保', debit: 25000, credit: 0, explanation: '劳务成本——人工成本增加。项目人员企业部分社保费用。' },
      { subjectCode: '520101', summary: '计提项目公积金', debit: 13000, credit: 0, explanation: '劳务成本——人工成本增加。项目人员企业部分公积金。' },
      { subjectCode: '6602', summary: '计提管理社保', debit: 8000, credit: 0, explanation: '管理费用增加。管理人员企业部分社保费用。' },
      { subjectCode: '6602', summary: '计提管理公积金', debit: 4000, credit: 0, explanation: '管理费用增加。管理人员企业部分公积金。' },
      { subjectCode: '221102', summary: '应付企业社保', debit: 0, credit: 33000, explanation: '应付职工薪酬——社保（企业部分）增加。25,000+8,000=33,000。' },
      { subjectCode: '221102', summary: '应付企业公积金', debit: 0, credit: 17000, explanation: '应付职工薪酬——公积金（企业部分）增加。13,000+4,000=17,000。' }],
    documents: [
      { type: 'text', label: '社保公积金计提表', docTitle: '社 保 公 积 金 计 提 汇 总 表', date: '2026-01-25', stampText: '财务专用章', content: '期间：2026年1月\n\n社保（企业部分）：\n  项目人员：25,000元\n  管理人员：8,000元\n  小计：33,000元\n\n公积金（企业部分）：\n  项目人员：13,000元\n  管理人员：4,000元\n  小计：17,000元\n\n合计：50,000元' ,
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
          '项目人员',
          '25,000元'
        ],
        [
          '管理人员',
          '8,000元'
        ],
        [
          '小计',
          '33,000元'
        ],
        [
          '项目人员',
          '13,000元'
        ],
        [
          '管理人员',
          '4,000元'
        ],
        [
          '小计',
          '17,000元'
        ],
        [
          '合计',
          '50,000元'
        ],
      ]}]
  },
  {
    date: '2026-01-26', role: 'accountant', title: '按季计提短期借款利息', tags: ["资金管理", "期末"], difficulty: 2,
    tip: '短期借款利息按权责发生制逐月计提。当月利息=本金×年利率÷12。借：财务费用，贷：应付利息。',
    description: '计提1月短期借款利息。借款本金200,000元，年利率4.35%。月利息=200,000×4.35%÷12=725元（尾数调整）。',
    entries: [
      { subjectCode: '6603', summary: '计提1月借款利息', debit: 725, credit: 0, explanation: '财务费用增加。200,000×4.35%÷12=725.00。' },
      { subjectCode: '2231', summary: '应付1月利息', debit: 0, credit: 725, explanation: '应付利息增加。到期一次性还本付息，按月计提。' }],
    documents: [
      { type: 'text', label: '利息计算表', docTitle: '短 期 借 款 利 息 计 算 表', date: '2026-01-26', stampText: '财务专用章', content: '借款本金：200,000.00元\n年利率：4.35%\n\n2026年1月利息计算：\n  200,000×4.35%÷12=725.00元\n\n制表：李会计' ,
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
          '制表',
          '李会计'
        ],
      ]}]
  },
  {
    date: '2026-01-27', role: 'accountant', title: '计提城建税及教育费附加', tags: ["税费"], difficulty: 2,
    tip: '以当月应纳增值税为基数，城建税7%、教育附加3%、地方教育附加2%。借：税金及附加，贷：应交税费。',
    description: '计提1月城建税及教育附加。本月应纳增值税=销项税额（4,800+7,200=12,000）—进项税额（0，服务业进项较少）=12,000元。',
    entries: [
      { subjectCode: '6403', summary: '城建税（7%）', debit: 840, credit: 0, explanation: '税金及附加增加。12,000×7%=840。' },
      { subjectCode: '6403', summary: '教育附加（3%）', debit: 360, credit: 0, explanation: '税金及附加增加。12,000×3%=360。' },
      { subjectCode: '6403', summary: '地方教育附加（2%）', debit: 240, credit: 0, explanation: '税金及附加增加。12,000×2%=240。' },
      { subjectCode: '222103', summary: '应交城建税', debit: 0, credit: 840, explanation: '应交税费——城建税增加。' },
      { subjectCode: '222104', summary: '应交教育附加', debit: 0, credit: 360, explanation: '应交税费——教育附加增加。' },
      { subjectCode: '222104', summary: '应交地方教育附加', debit: 0, credit: 240, explanation: '应交税费——地方教育附加增加。' }],
    documents: [
      { type: 'text', label: '税费计算表', docTitle: '城 建 税 及 教 育 附 加 计 提 表', date: '2026-01-27', stampText: '财务专用章', content: '期间：2026年1月\n计税依据：应纳增值税12,000.00元\n\n城建税（7%）：12,000×7%=840.00元\n教育附加（3%）：12,000×3%=360.00元\n地方教育附加（2%）：12,000×2%=240.00元\n\n合计：1,440.00元\n\n制表：李会计' ,
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
          '计税依据',
          '应纳增值税12,000.00元'
        ],
        [
          '城建税（7%）',
          '12,000×7%=840.00元'
        ],
        [
          '教育附加（3%）',
          '12,000×3%=360.00元'
        ],
        [
          '地方教育附加（2%）',
          '12,000×2%=240.00元'
        ],
        [
          '合计',
          '1,440.00元'
        ],
        [
          '制表',
          '李会计'
        ],
      ]}]
  },
  // ═══════════════════════════════════════════
  // 第五周：期末处理（1月28日~1月31日）
  // ═══════════════════════════════════════════
  {
    date: '2026-01-28', role: 'accountant', title: '期末结转劳务成本至主营业务成本', tags: ["项目核算", "期末"], difficulty: 3,
    tip: '已完成收入确认的项目，将归集的劳务成本结转至主营业务成本，实现收入成本配比。借：主营业务成本，贷：劳务成本。',
    description: 'B公司项目第一阶段和第二阶段的收入已确认，对应结转已归集的劳务成本。项目B总成本：人工成本按工时分摊（第一阶段40%+第二阶段60%）、差旅费12,000、外聘专家25,000、其他直接费3,000。（注：B项目顾问人工按工时占比40%分摊入成本）',
    entries: [
      { subjectCode: '6401', summary: '结转项目B人工成本', debit: 48000, credit: 0, explanation: '主营业务成本增加。B项目人工成本=120,000×40%=48,000（按工时占比）。' },
      { subjectCode: '6401', summary: '结转项目B差旅费', debit: 12000, credit: 0, explanation: '主营业务成本增加。全额结转差旅费12,000。' },
      { subjectCode: '6401', summary: '结转项目B外包费', debit: 25000, credit: 0, explanation: '主营业务成本增加。全额结转外聘专家费25,000。' },
      { subjectCode: '6401', summary: '结转项目B其他直接费', debit: 3000, credit: 0, explanation: '主营业务成本增加。全额结转资料通讯费3,000。' },
      { subjectCode: '520101', summary: '结转人工成本', debit: 0, credit: 48000, explanation: '劳务成本——人工成本减少。B项目人工转出。' },
      { subjectCode: '520102', summary: '结转差旅费', debit: 0, credit: 12000, explanation: '劳务成本——差旅费减少。' },
      { subjectCode: '520103', summary: '结转外包费', debit: 0, credit: 25000, explanation: '劳务成本——外包服务费减少。' },
      { subjectCode: '520104', summary: '结转其他直接费', debit: 0, credit: 3000, explanation: '劳务成本——其他直接费用减少。' }],
    documents: [
      { type: 'text', label: '成本计算表', docTitle: '项 目 成 本 结 转 计 算 表', date: '2026-01-28', stampText: '财务专用章', content: '结转期间：2026年1月\n项目：B公司战略管理咨询\n\n劳务成本归集：\n  人工成本（按工时40%）：48,000.00元\n  差旅费（全额）：12,000.00元\n  外聘专家费（全额）：25,000.00元\n  其他直接费（全额）：3,000.00元\n  合计：88,000.00元\n\n账务处理：\n  借：主营业务成本 88,000\n  贷：劳务成本 88,000\n\n制表：李会计\n审核：赵会计主管' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '结转期间',
          '2026年1月'
        ],
        [
          '项目',
          'B公司战略管理咨询'
        ],
        [
          '人工成本（按工时40%）',
          '48,000.00元'
        ],
        [
          '差旅费（全额）',
          '12,000.00元'
        ],
        [
          '外聘专家费（全额）',
          '25,000.00元'
        ],
        [
          '其他直接费（全额）',
          '3,000.00元'
        ],
        [
          '合计',
          '88,000.00元'
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
    date: '2026-01-29', role: 'accountant', title: '月末期间损益结转', tags: ["期末"], difficulty: 3,
    tip: '将所有损益类科目余额结转至本年利润。收入类贷方余额转入贷方，费用类借方余额转入借方。借：各收入科目，贷：本年利润；借：本年利润，贷：各费用科目。',
    description: '结转1月各损益科目至本年利润。本月主营业务收入200,000元，主营业务成本88,000元，税金及附加1,440元，管理费用130,343元，财务费用425元，销售费用0元。',
    entries: [
      { subjectCode: '6001', summary: '结转收入', debit: 200000, credit: 0, explanation: '主营业务收入结转至本年利润。' },
      { subjectCode: '4103', summary: '收入转入', debit: 0, credit: 200000, explanation: '本年利润增加。主营业务收入转至本年利润贷方。' },
      { subjectCode: '4103', summary: '成本费用转入', debit: 220208, credit: 0, explanation: '本年利润减少。成本费用转至本年利润借方。' },
      { subjectCode: '6401', summary: '结转成本', debit: 0, credit: 88000, explanation: '主营业务成本结转至本年利润。' },
      { subjectCode: '6403', summary: '结转税金', debit: 0, credit: 1440, explanation: '税金及附加结转至本年利润。' },
      { subjectCode: '6602', summary: '结转管理费', debit: 0, credit: 130343, explanation: '管理费用结转至本年利润。（明细：15,000猎头+2,343折旧+3,000摊销+25,000房租+5,500水电+2,000招待+40,000管理工资+12,000+4,000管理社保+4,000管理公积金+等）' },
      { subjectCode: '6603', summary: '结转财务费', debit: 0, credit: 425, explanation: '财务费用结转至本年利润。（手续费500+利息725-结息800=425）' }],
    documents: [
      { type: 'text', label: '结转表', docTitle: '期 间 损 益 结 转 表', date: '2026-01-31', stampText: '已结转', content: '结转期间：2026年1月\n\n收入类→本年利润：\n  主营业务收入：200,000.00元\n\n费用类→本年利润：\n  主营业务成本：88,000.00元\n  税金及附加：1,440.00元\n  管理费用：130,343.00元\n  财务费用：425.00元（手续费500+利息725-结息800）\n\n净利润：200,000-88,000-1,440-130,343-425=（-20,208）元\n\n1月为新签项目启动期，项目收入200,000元尚不足以覆盖全部运营成本，略有亏损属正常业务拓展阶段。' ,
      headers: [
        '项目',
        '金额/说明'
      ],
      rows: [
        [
          '结转期间',
          '2026年1月'
        ],
        [
          '主营业务收入',
          '200,000.00元'
        ],
        [
          '主营业务成本',
          '88,000.00元'
        ],
        [
          '税金及附加',
          '1,440.00元'
        ],
        [
          '管理费用',
          '130,343.00元'
        ],
        [
          '财务费用',
          '425.00元（手续费500+利息725-结息800）'
        ],
        [
          '净利润',
          '200,000-88,000-1,440-130,343-425=（-20,208）元'
        ],
      ]}]
  },
  {
    date: '2026-01-30', role: 'accountant', title: '支付网络推广服务费', tags: ["费用管理"], difficulty: 1,
    tip: '市场推广费计入销售费用。借：销售费用，贷：银行存款。',
    description: '支付1月百度SEM竞价排名及行业垂直媒体广告费8,000元。',
    entries: [
      { subjectCode: '6601', summary: '1月网络推广费', debit: 8000, credit: 0, explanation: '销售费用增加。市场推广支出。' },
      { subjectCode: '100201', summary: '支付推广费', debit: 0, credit: 8000, explanation: '银行存款减少。' }],
    documents: [
      { type: 'receipt', label: '服务发票', docTitle: '网 络 推 广 服 务 发 票', date: '2026-01-30', totalAmount: 8000, payer: '雲帆管理咨询有限公司', stampText: '百度在线网络技术有限公司\n发票专用章', items: [{ name: 'SEM竞价排名服务费（1月）', qty: 1, price: 8000, amount: 8000 }]}]
  },
  {
    date: '2026-01-31', role: 'accountant', title: '提取备用金', tags: ["资金管理"], difficulty: 1,
    tip: '提取备用金满足日常现金开支。借：库存现金，贷：银行存款。',
    description: '为满足日常零星开支需要，提取备用金5,000元。',
    entries: [
      { subjectCode: '1001', summary: '提取备用金', debit: 5000, credit: 0, explanation: '库存现金增加。' },
      { subjectCode: '100201', summary: '提取备用金', debit: 0, credit: 5000, explanation: '银行存款减少。' }],
    documents: [
      { type: 'bank', label: '现金支票回单', date: '2026-01-31', totalAmount: 5000, payer: '雲帆管理咨询有限公司', payeeName: '雲帆管理咨询有限公司（现金）', content: '提取备用金', refNo: 'HD202601310013' }]
  },
  {
    date: '2026-01-31', role: 'accountant', title: '模拟纳税申报', tags: ["税费", "期末"], difficulty: 1, tip: '每月15日前完成上月纳税申报。',
    description: '完成1月账务处理后，进行模拟纳税申报。', entries: [], nextAction: 'tax-filing',
    documents: [{ type: 'text', label: '申报提醒', docTitle: '1 月 纳 税 申 报 提 醒', stampText: '财务专用章', content: '申报期间：2026年1月\n截止日期：2026年2月15日\n\n申报税种：\n1. 增值税（6%，销项税额12,000元）\n2. 城市维护建设税（7%）\n3. 教育费附加（3%+2%）\n4. 代扣代缴个人所得税\n\n请前往纳税申报页面核对后提交。' }]
  },
]

export default jan
