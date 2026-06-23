/**
 * 万悦超市 8月「开学季·文具促销」
 *
 * 月主题：开学季文具/学生用品采购促销 → 季末清仓 → 月末结账
 * 特殊业务：📚 开学季促销、文具采购、季末清仓、联营结算
 * 故事线：8月进入开学季，万悦超市推出"开学装备"主题促销活动
 *
 * 知识点标签：商品采购、商品销售、仓存管理、往来管理、资金管理、费用管理、工资社保、税费、期末、出纳
 *
 * 会计准则依据：
 * - 《企业会计准则第14号——收入》（财会[2017]22号）
 * - 《企业会计准则第1号——存货》（财会[2006]3号）
 * - 《企业会计准则第9号——职工薪酬》（财会[2014]8号）
 */

const tasks = [
  // ═══════════════════════════════════════════
  // 第一周（8/1-8/5）：开学季备货
  // ═══════════════════════════════════════════
  {
    date: '2026-08-01',
    role: 'accountant',
    title: '支付鑫鑫食品7月冷冻品货款',
    tags: ['往来管理', '资金管理'],
    difficulty: 1,
    description: '向鑫鑫食品有限公司支付7月2日冷冻食品采购货款67,800元（月结30天已到期），通过工商银行转账支付。',
    tip: '供应商货款到期需及时支付，维护良好的商业信用。借：应付账款，贷：银行存款。付款时核对入库单和发票，确保金额准确。',
    entries: [
      { subjectCode: '220203', summary: '支付鑫鑫食品货款', debit: 67800, credit: 0, explanation: '应付账款-鑫鑫食品减少记借方。支付7月2日冷冻食品采购货款67,800元（冰淇淋30,000+速冻水饺16,000+冷冻虾仁14,000=60,000+增值税7,800元），债务结清。按时付款维护与供应商的合作关系。' },
      { subjectCode: '100201', summary: '支付鑫鑫食品货款', debit: 0, credit: 67800, explanation: '银行存款减少记贷方。通过工行转账支付鑫鑫食品货款67,800元，资金划出。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目220203），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '转账付款回单', date: '2026-08-01', totalAmount: 67800, payer: '万悦超市', payeeName: '鑫鑫食品有限公司', content: '支付7月2日冷冻食品采购货款', refNo: 'HD202608010001' },
      { type: 'text', label: '付款申请单', docTitle: '付款申请单（FK-202608-001）', stampText: '财务部 付款专用章',
        content: `供应商：鑫鑫食品有限公司\n采购日期：2026年7月2日\n金额：67,800.00元\n账期：30天，已到期\n审批：采购部✓ 财务主管✓` }]},
  {
    date: '2026-08-02',
    role: 'accountant',
    title: '采购开学季文具用品',
    tags: ['商品采购', '仓存管理'],
    difficulty: 2,
    description: '为开学季促销备货，向新华文具用品有限公司采购文具：中性笔500盒×20元=10,000元、笔记本1,000本×8元=8,000元、书包200个×60元=12,000元，合计不含税价30,000元，增值税3,900元，价税合计33,900元，以工商银行转账支付。商品已验收入库。',
    tip: '开学季文具采购需提前备足库存。采购文具的会计处理与普通商品相同：借：库存商品/应交税费-进项，贷：银行存款。文具类商品毛利率较高（通常40%-60%），是开学季重要的利润来源。注意：文具用品增值税税率13%（非农产品）。',
    entries: [
      { subjectCode: '1405', summary: '开学季文具入库', debit: 30000, credit: 0, explanation: '库存商品增加记借方。文具采购入库：中性笔10,000元+笔记本8,000元+书包12,000元=30,000元。开学季文具备货到位。' },
      { subjectCode: '222101', summary: '文具采购进项税额', debit: 3900, credit: 0, explanation: '应交税费-应交增值税（进项税额）增加记借方。文具用品税率13%，进项税额=30,000×13%=3,900元可抵扣。' },
      { subjectCode: '100201', summary: '支付文具采购款', debit: 0, credit: 33900, explanation: '银行存款减少记贷方。支付新华文具采购货款33,900元，资金划出。' , cashFlowItem: 'cf-op2', cashFlowExplanation: '采购存货/商品支出（配对科目1405），属于"购买商品、接受劳务支付的现金"——经营活动现金流出。'}],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '上海', invoiceNo: '3100234801', date: '2026-08-02', buyer: '万悦超市', seller: '新华文具用品有限公司',
        lineItems: [{ name: '中性笔（黑色0.5mm）', spec: '12支/盒', unit: '盒', qty: 500, price: 20, amount: 10000 }, { name: 'A5笔记本', spec: '60页/本', unit: '本', qty: 1000, price: 8, amount: 8000 }, { name: '学生书包', spec: '双肩减负', unit: '个', qty: 200, price: 60, amount: 12000 }],
        totalAmount: 33900, taxRate: '13%', taxAmount: 3900, totalInWords: '叁万叁仟玖佰元整' },
      { type: 'bank', label: '付款回单', date: '2026-08-02', totalAmount: 33900, payer: '万悦超市', payeeName: '新华文具用品有限公司', content: '开学季文具采购货款', refNo: 'HD202608020001' },
      { type: 'text', label: '入库验收单', docTitle: '文具商品入库验收单', stampText: '仓库验收专用章',
        content: `供应商：新华文具用品有限公司
到货日期：2026年8月2日

商品      数量   单价    金额    验收
中性笔  500盒   20元  10,000  合格✓
笔记本 1,000本   8元   8,000  合格✓
书包    200个   60元  12,000  合格✓
─────────────────────────
合计              30,000元

验收人：赵保管` }]},
  {
    date: '2026-08-03',
    role: 'accountant',
    title: '采购学生用品（文化用品+体育器材）',
    tags: ['商品采购'],
    difficulty: 1,
    description: '继续开学季备货，向新华文具采购：水彩笔200盒×25元=5,000元、文具套装300套×50元=15,000元；向鑫鑫食品采购：学生休闲零食（饼干/牛奶/面包）200箱×50元=10,000元。合计不含税价30,000元，增值税3,900元，价税合计33,900元，货款暂欠（月结30天）。',
    tip: '开学季涉及多个品类联合采购，可以从不同供应商分别采购。赊购时：借：库存商品/应交税费-进项，贷：应付账款。不同品类的采购可合并入账，但需分别登记入库明细。',
    entries: [
      { subjectCode: '1405', summary: '学生用品+零食入库', debit: 30000, credit: 0, explanation: '库存商品增加记借方。学生用品（水彩笔5,000+文具套装15,000=20,000元）+零食（10,000元）=30,000元入库。开学季采购覆盖文具和休闲食品。' },
      { subjectCode: '222101', summary: '采购进项税额', debit: 3900, credit: 0, explanation: '应交税费-应交增值税（进项税额）增加记借方。进项税额=30,000×13%=3,900元可抵扣。' },
      { subjectCode: '220203', summary: '新华文具/鑫鑫食品货款暂欠', debit: 0, credit: 33900, explanation: '应付账款-供应商通用增加记贷方。本次采购货款暂欠，按合同约定月结30天付款。赊购有助于缓解开学季大量备货带来的资金压力。' }],
    documents: [
      { type: 'invoice', label: '增值税专用发票（新华文具）', region: '上海', invoiceNo: '3100234802', date: '2026-08-03', buyer: '万悦超市', seller: '新华文具用品有限公司',
        lineItems: [{ name: '水彩笔', spec: '24色/盒', unit: '盒', qty: 200, price: 25, amount: 5000 }, { name: '文具套装（开学礼包）', spec: '含笔/尺/橡皮/削笔器', unit: '套', qty: 300, price: 50, amount: 15000 }],
        totalAmount: 22600, taxRate: '13%', taxAmount: 2600, totalInWords: '贰万贰仟陆佰元整' },
      { type: 'invoice', label: '增值税专用发票（鑫鑫食品）', region: '上海', invoiceNo: '3100234803', date: '2026-08-03', buyer: '万悦超市', seller: '鑫鑫食品有限公司',
        lineItems: [{ name: '学生休闲零食（饼干牛奶面包）', spec: '混合装', unit: '箱', qty: 200, price: 50, amount: 10000 }],
        totalAmount: 11300, taxRate: '13%', taxAmount: 1300, totalInWords: '壹万壹仟叁佰元整' },
      { type: 'text', label: '合并入库单', docTitle: '学生用品及零食入库单（8月3日）', stampText: '仓库验收专用章',
        content: `一、新华文具
水彩笔   200盒×25元=5,000元  合格✓
文具套装 300套×50元=15,000元  合格✓

二、鑫鑫食品
休闲零食 200箱×50元=10,000元  合格✓

合计：30,000元
验收人：赵保管` }]},
  {
    date: '2026-08-04',
    role: 'accountant',
    title: 'POS日结·开学促销首周',
    tags: ['商品销售'],
    difficulty: 2,
    description: '开学季促销首日及首周销售汇总。POS系统统计：微信收款96,050元、支付宝收款50,850元、银行卡收款39,550元、现金收款22,600元。含税总收入209,050元，不含税收入185,000元，增值税24,050元。同步结转已销商品成本约133,200元（成本率约72%）。',
    tip: '开学季促销期间，文具、书包、学生用品成为热销品类。POS日结处理方式同前：按支付方式分别入账，确认收入并结转成本。注意销售旺季多支付方式并存，需确保各渠道对账准确。',
    entries: [
      { subjectCode: '101204', summary: '开学促销微信收款', debit: 96050, credit: 0, explanation: '其他货币资金-微信账户增加记借方。开学促销微信收款96,050元，占含税收入46%，线上支付占比持续提高。'  , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入。'},
      { subjectCode: '101205', summary: '开学促销支付宝收款', debit: 50850, credit: 0, explanation: '其他货币资金-支付宝账户增加记借方。支付宝收款50,850元，占24%。'  , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入。'},
      { subjectCode: '100201', summary: '开学促销银行卡收款', debit: 39550, credit: 0, explanation: '银行存款增加记借方。POS刷卡收款39,550元，占19%。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入。'},
      { subjectCode: '1001', summary: '开学促销现金收款', debit: 22600, credit: 0, explanation: '库存现金增加记借方。现金收款22,600元，占11%。开学季学生家长集中采购，现金交易增多。'  , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入。'},
      { subjectCode: '6001', summary: '首周销售收入确认', debit: 0, credit: 185000, explanation: '主营业务收入增加记贷方。首周开学促销不含税收入=209,050÷1.13=185,000元。开学季促销效果显著。' },
      { subjectCode: '222101', summary: '首周增值税销项税额', debit: 0, credit: 24050, explanation: '应交税费-应交增值税（销项税额）增加记贷方。销项税额=185,000×13%=24,050元。' },
      { subjectCode: '6401', summary: '结转首周营业成本', debit: 133200, credit: 0, explanation: '主营业务成本增加记借方。首周促销成本约133,200元（成本率约72%），文具类毛利率高于食品类。' },
      { subjectCode: '1405', summary: '结转首周出库成本', debit: 0, credit: 133200, explanation: '库存商品减少记贷方。首周出库商品成本133,200元，存货减少。' }],
    documents: [
      { type: 'text', label: 'POS日结单', docTitle: 'POS收银系统日结单（2026年8月4日·开学促销汇总）', stampText: '收银专用章',
        content: `万悦超市 POS日结单（开学促销首周）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
日期：2026年8月2日-8月4日

交易统计：
  交易笔数：约4,800笔
  日均客单价：约87元

支付方式明细：
  微信支付：     96,050.00元（46%）
  支付宝：       50,850.00元（24%）
  银行卡：       39,550.00元（19%）
  现金：         22,600.00元（11%）
  ─────────────────────────────
  合计含税：    209,050.00元
  不含税收入：  185,000.00元
  增值税：       24,050.00元

热销商品排行：
1. 中性笔         约800盒
2. 笔记本        约1,500本
3. 书包          约150个
4. 文具套装      约200套
5. 休闲零食      约150箱

备注：开学季促销首周客流+45%` }]},
  {
    date: '2026-08-05',
    role: 'accountant',
    title: '支付开学季广告费',
    tags: ['费用管理', '出纳'],
    difficulty: 1,
    description: '支付本月"开学装备"主题促销广告费：学校周边派发传单3,000元、本地社区公众号推广2,000元、电梯广告5,000元，合计10,000元，以工商银行转账支付。',
    tip: '开学季广告重点投放学校周边和亲子社区，精准触达学生家长群体。借：销售费用-广告费，贷：银行存款。广告费税前扣除限额为销售收入的15%，超支需纳税调增。',
    entries: [
      { subjectCode: '660101', summary: '支付开学季广告费', debit: 10000, credit: 0, explanation: '销售费用-广告费增加记借方。开学季广告费10,000元：学校周边传单3,000元+社区公众号2,000元+电梯广告5,000元。' },
      { subjectCode: '100201', summary: '支付开学季广告费', debit: 0, credit: 10000, explanation: '银行存款减少记贷方。支付广告费10,000元，资金划出。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目660101），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '广告费发票', docTitle: '增值税普通发票——广告服务', date: '2026-08-05', totalAmount: 10000, stampText: 'XX广告传媒有限公司 发票专用章',
        items: [{ name: '学校周边传单派发（10所中小学）', qty: 1, price: 3000, amount: 3000 }, { name: '社区公众号推广（15个社区）', qty: 1, price: 2000, amount: 2000 }, { name: '电梯框架广告（100个点位）', qty: 1, price: 5000, amount: 5000 }] }]},
  {
    date: '2026-08-06',
    role: 'accountant',
    title: '报销差旅费（采购部赴义乌考察）',
    tags: ['费用管理'],
    difficulty: 1,
    description: '采购部王经理报销赴义乌小商品市场考察差旅费3,200元（含高铁票1,200元、住宿费1,400元、市内交通费600元），以现金支付。',
    tip: '采购人员出差考察差旅费计入"管理费用"，不属于采购成本。借：管理费用，贷：库存现金。依据《企业会计准则第1号——存货》规定，差旅费不计入存货采购成本。',
    entries: [
      { subjectCode: '6602', summary: '报销考察差旅费', debit: 3200, credit: 0, explanation: '管理费用增加记借方。采购部赴义乌考察差旅费3,200元，计入当期管理费用。为采购发生的差旅费不纳入存货成本。' },
      { subjectCode: '1001', summary: '报销考察差旅费', debit: 0, credit: 3200, explanation: '库存现金减少记贷方。以现金支付考察差旅费3,200元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6602），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '差旅费报销单', docTitle: '差旅费报销单（采购部王经理）', date: '2026-08-06', totalAmount: 3200, stampText: '财务审核专用章',
        items: [{ name: '上海→义乌高铁票', qty: 1, price: 600, amount: 600 }, { name: '义乌→上海高铁票', qty: 1, price: 600, amount: 600 }, { name: '住宿费（2晚）', qty: 2, price: 700, amount: 1400 }, { name: '市内交通费', qty: 1, price: 600, amount: 600 }] },
      { type: 'text', label: '出差申请单', docTitle: '出差申请审批单', content: '出差人：王经理（采购部）\n出差地点：义乌\n出差事由：考察小商品市场，对接开学季文具供应商\n出差日期：2026年8月4日-8月6日\n审批人：赵店长', signature: '赵店长' }]},
  {
    date: '2026-08-07',
    role: 'accountant',
    title: '美肌堂联营专柜7月结算（净额法）',
    tags: ['往来管理'],
    difficulty: 3,
    description: '按联营合同结算美肌堂化妆品专柜7月销售额。7月含税销售额124,300元，联营扣点22%。按净额法确认扣点收入=124,300÷1.13×22%=24,200元（不含税）。同时向美肌堂发起货款结算。',
    tip: '联营专柜按月结算，按净额法确认扣点收入。分录：借：银行存款（含税销售额全额），贷：其他应付款-美肌堂（代收货款净额），贷：主营业务收入（扣点收入），贷：应交税费-销项。注意扣点收入需要缴纳增值税。',
    entries: [
      { subjectCode: '100201', summary: '代收美肌堂7月全额货款', debit: 124300, credit: 0, explanation: '银行存款增加记借方。美肌堂7月含税销售额124,300元由超市统一收款。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入。'},
      { subjectCode: '2241', summary: '应付美肌堂代收货款净额', debit: 0, credit: 96954, explanation: '其他应付款-美肌堂增加记贷方。应付美肌堂净额=含税124,300-超市扣点24,200-销项3,146=96,954元。' },
      { subjectCode: '6001', summary: '美肌堂联营扣点收入', debit: 0, credit: 24200, explanation: '主营业务收入增加记贷方。联营扣点收入=不含税销售额110,000×22%=24,200元。超市按净额（扣点）确认收入。' },
      { subjectCode: '222101', summary: '联营扣点增值税销项税额', debit: 0, credit: 3146, explanation: '应交税费-应交增值税（销项税额）增加记贷方。联营扣点收入销项税额=24,200×13%=3,146元。' }],
    documents: [
      { type: 'bank', label: '联营专柜销售收款', date: '2026-08-07', totalAmount: 124300, payer: '顾客（POS集中收款）', payeeName: '万悦超市', content: '美肌堂专柜7月销售款（代收）', refNo: 'HD202608070001' },
      { type: 'text', label: '联营结算单', docTitle: '美肌堂化妆品专柜2026年7月结算单', stampText: '财务结算专用章',
        content: `联营商户：美肌堂化妆品有限公司
结算期间：2026年7月1日-7月31日

含税销售额：               124,300.00元
换算不含税：124,300÷1.13=110,000.00元
联营扣点（22%）：110,000×22%=24,200.00元
应付联营商户：              96,954.00元

品牌方确认：美肌堂（签章）
结算周期：次月15日前付清` }]},

  // ═══════════════════════════════════════════
  // 第二周（8/8-8/12）：开学促销热销
  // ═══════════════════════════════════════════
  {
    date: '2026-08-08',
    role: 'accountant',
    title: '采购生鲜水果（绿源农业）',
    tags: ['商品采购'],
    difficulty: 1,
    description: '向绿源农业有限公司采购秋季时令水果：哈密瓜1,000个×20元=20,000元、石榴500斤×15元=7,500元、猕猴桃500斤×12元=6,000元，合计不含税价33,500元，增值税3,015元（9%税率），价税合计36,515元，以工商银行转账支付。',
    tip: '秋季水果上市（哈密瓜、石榴、猕猴桃），生鲜采购继续保持9%低税率。借：库存商品，借：应交税费-进项（9%），贷：银行存款。生鲜采购需控制损耗率。',
    entries: [
      { subjectCode: '1405', summary: '秋季水果入库', debit: 33500, credit: 0, explanation: '库存商品增加记借方。秋季水果入库：哈密瓜20,000+石榴7,500+猕猴桃6,000=33,500元。' },
      { subjectCode: '222101', summary: '水果采购进项税额（9%）', debit: 3015, credit: 0, explanation: '应交税费-应交增值税（进项税额）增加记借方。生鲜农产品9%低税率，进项税额=33,500×9%=3,015元。' },
      { subjectCode: '100201', summary: '支付水果采购款', debit: 0, credit: 36515, explanation: '银行存款减少记贷方。支付绿源农业水果采购款36,515元。' , cashFlowItem: 'cf-op2', cashFlowExplanation: '采购存货/商品支出（配对科目1405），属于"购买商品、接受劳务支付的现金"。'}],
    documents: [
      { type: 'invoice', label: '增值税普通发票（农产品）', region: '上海', invoiceNo: '3100234804', date: '2026-08-08', buyer: '万悦超市', seller: '绿源农业有限公司',
        lineItems: [{ name: '哈密瓜', spec: '约2kg/个', unit: '个', qty: 1000, price: 20, amount: 20000 }, { name: '石榴', spec: '新鲜采摘', unit: '斤', qty: 500, price: 15, amount: 7500 }, { name: '猕猴桃', spec: '绿心', unit: '斤', qty: 500, price: 12, amount: 6000 }],
        totalAmount: 36515, taxRate: '9%', taxAmount: 3015, totalInWords: '叁万陆仟伍佰壹拾伍元整' },
      { type: 'text', label: '生鲜验收单', docTitle: '秋季水果验收单（绿源农业）', stampText: '生鲜验收专用章',
        content: `哈密瓜 1,000个×20元=20,000元  优✓
石榴     500斤×15元= 7,500元  优✓
猕猴桃   500斤×12元= 6,000元  优✓
合计：33,500元
验收人：赵保管` }]},
  {
    date: '2026-08-09',
    role: 'accountant',
    title: 'POS日结·开学促销第二波',
    tags: ['商品销售'],
    difficulty: 2,
    description: '开学前最后一个周末，促销进入高峰。POS日结：含税总收入248,600元（不含税220,000元，增值税28,600元）。其中：微信113,000元、支付宝56,500元、银行卡50,850元、现金28,250元。结转成本约158,400元。',
    tip: '开学前周末是文具/学生用品销售最高峰，许多家长集中采购。POS日结处理方式同前。注意大额收款需及时确认到账。',
    entries: [
      { subjectCode: '101204', summary: '促销高峰微信收款', debit: 113000, credit: 0, explanation: '其他货币资金-微信账户增加记借方。开学前周末微信收款113,000元，为单日最高。'  , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入。'},
      { subjectCode: '101205', summary: '促销高峰支付宝收款', debit: 56500, credit: 0, explanation: '其他货币资金-支付宝账户增加记借方。支付宝收款56,500元。'  , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入。'},
      { subjectCode: '100201', summary: '促销高峰银行卡收款', debit: 50850, credit: 0, explanation: '银行存款增加记借方。银行卡收款50,850元。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入。'},
      { subjectCode: '1001', summary: '促销高峰现金收款', debit: 28250, credit: 0, explanation: '库存现金增加记借方。现金收款28,250元，开学季现金交易明显增多。'  , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入。'},
      { subjectCode: '6001', summary: '促销高峰收入确认', debit: 0, credit: 220000, explanation: '主营业务收入增加记贷方。高峰日不含税收入=248,600÷1.13=220,000元。开学前最后一个周末是全年文具销售最高峰。' },
      { subjectCode: '222101', summary: '促销高峰增值税销项税额', debit: 0, credit: 28600, explanation: '应交税费-应交增值税（销项税额）增加记贷方。销项税额=220,000×13%=28,600元。' },
      { subjectCode: '6401', summary: '结转高峰营业成本', debit: 158400, credit: 0, explanation: '主营业务成本增加记借方。高峰日销售成本约158,400元（成本率约72%）。' },
      { subjectCode: '1405', summary: '结转高峰出库成本', debit: 0, credit: 158400, explanation: '库存商品减少记贷方。出库成本158,400元，存货大幅减少。' }],
    documents: [
      { type: 'text', label: 'POS日结单', docTitle: 'POS收银系统日结单（2026年8月9日）', stampText: '收银专用章',
        content: `万悦超市 POS日结单
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
日期：2026年8月9日（开学前周末）

交易统计：约2,800笔
客单价：约89元

支付方式：
  微信支付： 113,000.00元（45%）
  支付宝：   56,500.00元（23%）
  银行卡：   50,850.00元（20%）
  现金：     28,250.00元（12%）
  ─────────────────────────────
  合计含税：248,600.00元
  不含税：  220,000.00元
  增值税：   28,600.00元

热销排行：中性笔、笔记本、书包
文具套装、休闲零食

备注：本日为开学季销售最高峰！` }]},
  {
    date: '2026-08-10',
    role: 'accountant',
    title: '预付卡消费（学生购书包文具）',
    tags: ['商品销售'],
    difficulty: 2,
    description: '顾客张女士使用万悦超市预付卡购买开学用品：书包1个200元、文具套装2套150元、笔记本10本80元，合计含税430元。全额使用预付卡余额支付（预付卡为2月购买），结转成本约280元。',
    tip: '预付卡消费时冲减"预收账款-预付卡"，确认收入并结转成本。借：预收账款-预付卡，贷：主营业务收入/应交税费-销项。注意预付卡消费不产生新增资金流入，属于负债减少。',
    entries: [
      { subjectCode: '2203', summary: '预付卡消费（开学用品）', debit: 430, credit: 0, explanation: '预收账款-预付卡减少记借方。顾客用预付卡余额购买开学用品430元，负债减少。预付卡消费时超市确认收入，资金在售卡时已收。' },
      { subjectCode: '6001', summary: '预付卡消费确认收入', debit: 0, credit: 380.53, explanation: '主营业务收入增加记贷方。不含税收入=430÷1.13=380.53元。' },
      { subjectCode: '222101', summary: '预付卡消费销项税额', debit: 0, credit: 49.47, explanation: '应交税费-应交增值税（销项税额）增加记贷方。销项税额=380.53×13%=49.47元。' },
      { subjectCode: '6401', summary: '结转开学用品成本', debit: 280, credit: 0, explanation: '主营业务成本增加记借方。书包文具成本约280元（成本率约73%）。' },
      { subjectCode: '1405', summary: '结转开学用品出库', debit: 0, credit: 280, explanation: '库存商品减少记贷方。商品出库，存货减少。' }],
    documents: [
      { type: 'text', label: '预付卡消费凭证', docTitle: '万悦超市预付卡消费凭证', stampText: '收银专用章',
        content: `预付卡消费凭条
━━━━━━━━━━━━━━━━━━━━━━━━━━━
预付卡号：WY-202602-6666
消费日期：2026年8月10日

商品：
  书包×1           200.00元
  文具套装×2       150.00元
  笔记本×10         80.00元
  ──────────────────────
  合计含税：       430.00元
  支付方式：预付卡全额

预付卡剩余余额：约370元
有效期：2027年2月28日` }]},
  {
    date: '2026-08-11',
    role: 'accountant',
    title: '会员积分兑换（文具礼包）',
    tags: ['商品销售'],
    difficulty: 2,
    description: '会员赵先生使用积分兑换开学文具礼包（价值150元，成本90元）。使用2,000积分抵扣100元，剩余50元通过微信支付。结转成本90元。',
    tip: '会员积分兑换冲减递延收益（合同负债），确认收入并结转成本。借：合同负债（积分价值100元），借：其他货币资金-微信（补差50元），贷：主营业务收入/应交税费-销项。',
    entries: [
      { subjectCode: '2203', summary: '积分兑换冲减递延收益', debit: 100, credit: 0, explanation: '合同负债-会员积分减少记借方。本次兑换使用2,000分，对应递延收益=100元。' },
      { subjectCode: '101204', summary: '积分兑换补差收款', debit: 50, credit: 0, explanation: '其他货币资金-微信账户增加记借方。会员补差50元通过微信支付。'  , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入。'},
      { subjectCode: '6001', summary: '积分兑换确认收入', debit: 0, credit: 132.74, explanation: '主营业务收入增加记贷方。兑换商品不含税收入=150÷1.13=132.74元。' },
      { subjectCode: '222101', summary: '积分兑换销项税额', debit: 0, credit: 17.26, explanation: '应交税费-应交增值税（销项税额）增加记贷方。销项税额=132.74×13%=17.26元。' },
      { subjectCode: '6401', summary: '结转兑换商品成本', debit: 90, credit: 0, explanation: '主营业务成本增加记借方。文具礼包成本90元同步结转。' },
      { subjectCode: '1405', summary: '文具礼包出库', debit: 0, credit: 90, explanation: '库存商品减少记贷方。商品出库，存货减少。' }],
    documents: [
      { type: 'text', label: '积分兑换小票', docTitle: '万悦会员积分兑换凭证', stampText: '收银专用章',
        content: `万悦超市 会员积分兑换
━━━━━━━━━━━━━━━━━━━━━━━━━━━
会员：赵先生（卡号：VIP-202604-5678）
日期：2026年8月11日

兑换商品：开学文具礼包（价值150元）
本次使用积分：2,000分（价值100元）
微信补差：50元
剩余积分：1,500分` }]},
  {
    date: '2026-08-12',
    role: 'accountant',
    title: 'POS日结+周销售成本结转',
    tags: ['商品销售'],
    difficulty: 2,
    description: '第二周POS日结汇总（8/5-8/12）。含税总收入169,500元（不含税150,000元，增值税19,500元）。结转成本约108,000元。',
    tip: '开学促销进入第二周，销售额有所回落但仍在高位。POS日结处理方式同前。注意汇总周期内的各渠道收款要分别准确核算。',
    entries: [
      { subjectCode: '101204', summary: '第二周微信收款', debit: 67800, credit: 0, explanation: '其他货币资金-微信账户增加记借方。第二周微信收款67,800元。'  , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入。'},
      { subjectCode: '101205', summary: '第二周支付宝收款', debit: 38985, credit: 0, explanation: '其他货币资金-支付宝账户增加记借方。支付宝收款38,985元。'  , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入。'},
      { subjectCode: '100201', summary: '第二周银行卡收款', debit: 35595, credit: 0, explanation: '银行存款增加记借方。银行卡收款35,595元。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入。'},
      { subjectCode: '1001', summary: '第二周现金收款', debit: 27120, credit: 0, explanation: '库存现金增加记借方。现金收款27,120元。'  , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入。'},
      { subjectCode: '6001', summary: '第二周收入确认', debit: 0, credit: 150000, explanation: '主营业务收入增加记贷方。第二周不含税收入=169,500÷1.13=150,000元。开学促销进入平稳期。' },
      { subjectCode: '222101', summary: '第二周增值税销项税额', debit: 0, credit: 19500, explanation: '应交税费-应交增值税（销项税额）增加记贷方。销项税额=150,000×13%=19,500元。' },
      { subjectCode: '6401', summary: '结转第二周营业成本', debit: 108000, credit: 0, explanation: '主营业务成本增加记借方。第二周销售成本约108,000元，文具/食品/水果等综合品类。' },
      { subjectCode: '1405', summary: '结转第二周出库成本', debit: 0, credit: 108000, explanation: '库存商品减少记贷方。出库成本108,000元。' }],
    documents: [
      { type: 'text', label: 'POS周结单', docTitle: 'POS收银系统周结汇总（2026年8月5日-12日）', stampText: '收银专用章',
        content: `万悦超市 POS周结汇总
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
期间：2026年8月5日-8月12日

交易统计：约5,400笔

支付方式：
  微信支付：  67,800.00元（40%）
  支付宝：    38,985.00元（23%）
  银行卡：    35,595.00元（21%）
  现金：      27,120.00元（16%）
  ─────────────────────────────
  合计含税： 169,500.00元
  不含税：   150,000.00元
  增值税：    19,500.00元

本周特色：预付卡消费1笔，积分兑换1笔` }]},
  {
    date: '2026-08-13',
    role: 'accountant',
    title: '支付新华文具采购货款',
    tags: ['往来管理'],
    difficulty: 1,
    description: '向新华文具用品有限公司支付8月2日文具采购货款33,900元，通过工商银行转账支付。',
    tip: '按时支付供应商货款维护商业信用。借：应付账款，贷：银行存款。注意8月3日的联合采购尚未到期，本次只付8月2日那笔。',
    entries: [
      { subjectCode: '220203', summary: '支付新华文具货款', debit: 33900, credit: 0, explanation: '应付账款-新华文具减少记借方。支付8月2日文具采购货款33,900元。' },
      { subjectCode: '100201', summary: '支付新华文具货款', debit: 0, credit: 33900, explanation: '银行存款减少记贷方。通过工行转账支付文具货款33,900元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目220203），属于支付其他与经营活动有关的现金。'}],
    documents: [
      { type: 'bank', label: '转账付款回单', date: '2026-08-13', totalAmount: 33900, payer: '万悦超市', payeeName: '新华文具用品有限公司', content: '支付8月2日文具采购货款', refNo: 'HD202608130001' }]},


  // ═══════════════════════════════════════════
  // 第三周（8/14-8/19）：日常经营与月末准备
  // ═══════════════════════════════════════════
  {
    date: '2026-08-14',
    role: 'accountant',
    title: '夏季饮品季末清仓促销',
    tags: ['商品销售'],
    difficulty: 2,
    description: '8月中旬夏季尾声，对7月采购的剩余夏季饮品进行清仓促销。销售含税收入56,500元（不含税50,000元，增值税6,500元），按7折促销价销售，较原价低30%。结转成本约42,000元。',
    tip: '季末清仓是超市常见的库存管理手段。虽然毛利率较低，但可快速回笼资金，避免商品过期损失。账务处理同正常销售：借：银行存款等，贷：主营业务收入/应交税费-销项。注意清仓折扣属商业折扣，按折后价确认收入。',
    entries: [
      { subjectCode: '101204', summary: '清仓微信收款', debit: 22600, credit: 0, explanation: '其他货币资金-微信账户增加记借方。清仓促销微信收款22,600元。'  , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入。'},
      { subjectCode: '101205', summary: '清仓支付宝收款', debit: 12430, credit: 0, explanation: '其他货币资金-支付宝账户增加记借方。支付宝收款12,430元。'  , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入。'},
      { subjectCode: '100201', summary: '清仓银行卡收款', debit: 12430, credit: 0, explanation: '银行存款增加记借方。银行卡收款12,430元。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入。'},
      { subjectCode: '1001', summary: '清仓现金收款', debit: 9040, credit: 0, explanation: '库存现金增加记借方。现金收款9,040元。'  , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入。'},
      { subjectCode: '6001', summary: '清仓销售收入确认', debit: 0, credit: 50000, explanation: '主营业务收入增加记贷方。季末清仓不含税收入=56,500÷1.13=50,000元。清仓折扣为商业折扣，按折后价确认收入。' },
      { subjectCode: '222101', summary: '清仓增值税销项税额', debit: 0, credit: 6500, explanation: '应交税费-应交增值税（销项税额）增加记贷方。销项税额=50,000×13%=6,500元。' },
      { subjectCode: '6401', summary: '结转清仓成本', debit: 42000, credit: 0, explanation: '主营业务成本增加记借方。清仓商品成本42,000元，原采购价约60,000元，毛利率较正常偏低，但可避免商品过期损失。' },
      { subjectCode: '1405', summary: '结转清仓出库', debit: 0, credit: 42000, explanation: '库存商品减少记贷方。清仓商品出库，存货减少。' }],
    documents: [
      { type: 'text', label: 'POS日结单', docTitle: 'POS收银系统日结单（2026年8月14日·季末清仓）', stampText: '收银专用章',
        content: `万悦超市 POS日结单
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
日期：2026年8月14日（季末清仓）

促销活动："夏日饮品7折清仓"

支付方式合计含税：56,500.00元
不含税：50,000.00元
增值税：6,500.00元

清仓效果：饮品库存消化约70%
剩余库存转入秋季促销` }]},
  {
    date: '2026-08-15',
    role: 'accountant',
    title: '支付8月房租',
    tags: ['费用管理'],
    difficulty: 1,
    description: '支付万悦超市8月营业场所租金15,000元，以工商银行转账支付。',
    tip: '房租按月支付计入管理费用。借：管理费用，贷：银行存款。注意如房租发票为增值税专用发票，进项税额可抵扣。',
    entries: [
      { subjectCode: '6602', summary: '支付8月房租', debit: 15000, credit: 0, explanation: '管理费用增加记借方。8月营业场所租金15,000元，超市固定运营支出。' },
      { subjectCode: '100201', summary: '支付8月房租', debit: 0, credit: 15000, explanation: '银行存款减少记贷方。支付8月租金15,000元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6602），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '房租发票', docTitle: '增值税普通发票——房屋租赁（8月）', date: '2026-08-15', totalAmount: 15000, stampText: 'XX商业地产管理有限公司 发票专用章',
        items: [{ name: '2026年8月营业场所租金', qty: 1, price: 15000, amount: 15000 }] }]},
  {
    date: '2026-08-16',
    role: 'accountant',
    title: '支付水电费',
    tags: ['费用管理'],
    difficulty: 1,
    description: '支付8月上半月水电费：电费7,800元（夏季空调+冷柜用电）、水费1,200元，合计9,000元，以工商银行转账支付。',
    tip: '8月天气炎热，空调和冷柜电费仍然较高，进入下旬后将有所下降。借：管理费用，贷：银行存款。',
    entries: [
      { subjectCode: '6602', summary: '支付8月电费', debit: 7800, credit: 0, explanation: '管理费用增加记借方。8月上半月电费7,800元，夏季空调冷柜用电量仍较大。' },
      { subjectCode: '6602', summary: '支付8月水费', debit: 1200, credit: 0, explanation: '管理费用增加记借方。水费1,200元。' },
      { subjectCode: '100201', summary: '支付水电费', debit: 0, credit: 9000, explanation: '银行存款减少记贷方。支付水电费合计9,000元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6602），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '电费账单', docTitle: '上海市电力公司缴费通知单（8月上半月）', date: '2026-08-16', totalAmount: 7800, items: [{ name: '8月上半月电费', qty: 1, price: 7800, amount: 7800 }] },
      { type: 'receipt', label: '水费账单', docTitle: '上海市自来水公司缴费通知单（8月上半月）', date: '2026-08-16', totalAmount: 1200, items: [{ name: '8月上半月水费', qty: 1, price: 1200, amount: 1200 }] }]},
  {
    date: '2026-08-17',
    role: 'accountant',
    title: '采购日用品（洁宝日化）',
    tags: ['商品采购'],
    difficulty: 1,
    description: '向洁宝日化有限公司采购秋冬日用品：洗衣液200箱×80元=16,000元、洗洁精100箱×40元=4,000元、护肤霜200箱×60元=12,000元，合计不含税价32,000元，增值税4,160元，价税合计36,160元，货款暂欠。',
    tip: '秋季日用品采购为即将到来的秋冬季节备货。借：库存商品/应交税费-进项，贷：应付账款。注意季节性商品的采购节奏，避免过早或过晚。',
    entries: [
      { subjectCode: '1405', summary: '日用品入库', debit: 32000, credit: 0, explanation: '库存商品增加记借方。秋冬日用品入库：洗衣液16,000+洗洁精4,000+护肤霜12,000=32,000元。' },
      { subjectCode: '222101', summary: '日用品采购进项税额', debit: 4160, credit: 0, explanation: '应交税费-应交增值税（进项税额）增加记借方。进项税额=32,000×13%=4,160元。' },
      { subjectCode: '220203', summary: '洁宝日化货款暂欠', debit: 0, credit: 36160, explanation: '应付账款-洁宝日化增加记贷方。采购货款暂欠，月结30天。' }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '上海', invoiceNo: '3100234805', date: '2026-08-17', buyer: '万悦超市', seller: '洁宝日化有限公司',
        lineItems: [{ name: '洗衣液', spec: '3kg/瓶×4瓶/箱', unit: '箱', qty: 200, price: 80, amount: 16000 }, { name: '洗洁精', spec: '1kg/瓶×12瓶/箱', unit: '箱', qty: 100, price: 40, amount: 4000 }, { name: '护肤霜', spec: '50g/瓶×24瓶/箱', unit: '箱', qty: 200, price: 60, amount: 12000 }],
        totalAmount: 36160, taxRate: '13%', taxAmount: 4160, totalInWords: '叁万陆仟壹佰陆拾元整' },
      { type: 'text', label: '入库单', docTitle: '日用品入库验收单', stampText: '仓库验收专用章',
        content: `洁宝日化 8月17日到货
洗衣液  200箱×80元=16,000元 ✓
洗洁精  100箱×40元= 4,000元 ✓
护肤霜  200箱×60元=12,000元 ✓
合计：32,000元
验收人：赵保管` }]},
  {
    date: '2026-08-18',
    role: 'accountant',
    title: 'POS日结·促销收尾',
    tags: ['商品销售'],
    difficulty: 2,
    description: '开学促销活动收尾阶段。POS日结：含税收入113,000元（不含税100,000元，增值税13,000元）。结转成本72,000元。',
    tip: '促销收尾阶段销售额回落至常规水平。统计汇总后做常规POS入账处理。',
    entries: [
      { subjectCode: '101204', summary: '促销收尾微信收款', debit: 45200, credit: 0, explanation: '其他货币资金-微信账户增加记借方。'  , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入。'},
      { subjectCode: '101205', summary: '促销收尾支付宝收款', debit: 27120, credit: 0, explanation: '其他货币资金-支付宝账户增加记借方。'  , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入。'},
      { subjectCode: '100201', summary: '促销收尾银行卡收款', debit: 24860, credit: 0, explanation: '银行存款增加记借方。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入。'},
      { subjectCode: '1001', summary: '促销收尾现金收款', debit: 15820, credit: 0, explanation: '库存现金增加记借方。'  , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入。'},
      { subjectCode: '6001', summary: '促销收尾收入确认', debit: 0, credit: 100000, explanation: '主营业务收入增加记贷方。促销收尾不含税收入=113,000÷1.13=100,000元。' },
      { subjectCode: '222101', summary: '促销收尾增值税销项税额', debit: 0, credit: 13000, explanation: '应交税费-应交增值税（销项税额）增加记贷方。销项税额=100,000×13%=13,000元。' },
      { subjectCode: '6401', summary: '结转促销收尾成本', debit: 72000, credit: 0, explanation: '主营业务成本增加记借方。收尾销售成本72,000元。' },
      { subjectCode: '1405', summary: '结转促销收尾出库', debit: 0, credit: 72000, explanation: '库存商品减少记贷方。' }],
    documents: [
      { type: 'text', label: 'POS日结单', docTitle: 'POS收银系统日结单（2026年8月18日）', stampText: '收银专用章',
        content: `万悦超市 POS日结单
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
日期：2026年8月18日

合计含税：113,000.00元
不含税：100,000.00元
增值税：13,000.00元

状态：开学促销收尾，销售回归常态` }]},
  {
    date: '2026-08-19',
    role: 'accountant',
    title: '收到鑫鑫食品第三季度预返利',
    tags: ['往来管理'],
    difficulty: 2,
    description: '根据年度采购框架协议，收到鑫鑫食品有限公司第三季度预付返利6,000元（按预计采购额测算），款项已存入工商银行。返利冲减主营业务成本。',
    tip: '供应商返利冲减主营业务成本。借：银行存款，贷：主营业务成本（红字）。预付返利在结算时调整。',
    entries: [
      { subjectCode: '100201', summary: '收到鑫鑫食品预付返利', debit: 6000, credit: 0, explanation: '银行存款增加记借方。收到鑫鑫食品第三季度预付返利6,000元。' , cashFlowItem: 'cf-op5', cashFlowExplanation: '收到供应商返利（配对科目6401），属于"收到其他与经营活动有关的现金"。'},
      { subjectCode: '6401', summary: '冲减主营业务成本（返利）', debit: 0, credit: 6000, explanation: '主营业务成本减少记贷方。供应商预付返利冲减主营业务成本，体现采购成本降低。依据《企业会计准则第1号——存货》应用指南。' }],
    documents: [
      { type: 'bank', label: '返利收款回单', date: '2026-08-19', totalAmount: 6000, payer: '鑫鑫食品有限公司', payeeName: '万悦超市', content: '2026年第三季度预付返利', refNo: 'HD202608190001' },
      { type: 'text', label: '返利预结算单', docTitle: '鑫鑫食品 2026年第三季度预付返利通知', stampText: '鑫鑫食品 财务专用章',
        content: `供应商：鑫鑫食品有限公司
采购方：万悦超市
返利期间：2026年7月-9月（预计）
预付金额：6,000元
说明：按上半年采购额预估，季度末结算调整

供应商确认：鑫鑫食品（签章）` }]},

  // ═══════════════════════════════════════════
  // 第四周（8/21-8/31）：月末——工资/税费/期末结转
  // ═══════════════════════════════════════════

  {
    date: '2026-08-20',
    role: 'accountant',
    title: '报销办公用品费',
    tags: ['费用管理'],
    difficulty: 1,
    description: '行政部报销8月办公用品采购费1,800元（含打印纸600元、墨盒800元、文具400元），以现金支付。',
    tip: '办公用品费计入管理费用。借：管理费用-办公费，贷：库存现金。注意办公用品与固定资产的区分标准。',
    entries: [
      { subjectCode: '660201', summary: '报销办公用品费', debit: 1800, credit: 0, explanation: '管理费用-办公费增加记借方。8月办公用品1,800元：打印纸600+墨盒800+文具400=1,800元。' },
      { subjectCode: '1001', summary: '报销办公用品费', debit: 0, credit: 1800, explanation: '库存现金减少记贷方。以现金支付办公用品报销款1,800元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目660201），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '办公用品发票', docTitle: '增值税普通发票——办公用品', date: '2026-08-20', totalAmount: 1800, stampText: 'XX办公用品超市 发票专用章',
        items: [{ name: 'A4打印纸（3包）', qty: 3, price: 200, amount: 600 }, { name: '打印机墨盒（HP）', qty: 2, price: 400, amount: 800 }, { name: '文具（笔/胶带/剪刀）', qty: 1, price: 400, amount: 400 }] }]},
  {
    date: '2026-08-21',
    role: 'accountant',
    title: '计提8月员工工资',
    tags: ['工资社保'],
    difficulty: 2,
    description: '计提8月员工工资：管理人员工资30,000元、销售人员工资25,000元、收银员/生鲜技工工资23,000元，合计78,000元。',
    tip: '计提工资按部门分别计入管理费用、销售费用、主营业务成本。借：费用/成本科目，贷：应付职工薪酬。',
    entries: [
      { subjectCode: '660203', summary: '计提管理人员工资', debit: 30000, credit: 0, explanation: '管理费用-工资增加记借方。管理工资30,000元。' },
      { subjectCode: '6601', summary: '计提销售人员工资', debit: 25000, credit: 0, explanation: '销售费用增加记借方。销售工资25,000元。' },
      { subjectCode: '6401', summary: '计提一线员工工资', debit: 23000, credit: 0, explanation: '主营业务成本增加记借方。收银员+生鲜技工工资23,000元计入营业成本。' },
      { subjectCode: '221101', summary: '计提8月工资', debit: 0, credit: 78000, explanation: '应付职工薪酬-工资增加记贷方。计提8月工资合计78,000元。' }],
    documents: [
      { type: 'text', label: '工资计算表', docTitle: '万悦超市2026年8月工资计算表', stampText: '人事部专用章',
        content: `管理人员（4人）：30,000元
销售人员（4人）：25,000元（含开学促销加班补贴）
一线员工（5人）：23,000元（收银3人+生鲜2人）
合计：78,000元` }]},
  {
    date: '2026-08-22',
    role: 'accountant',
    title: '发放8月工资',
    tags: ['工资社保'],
    difficulty: 1,
    description: '通过工商银行代发8月员工工资78,000元。',
    tip: '发放工资：借：应付职工薪酬-工资，贷：银行存款。发放后负债清偿。',
    entries: [
      { subjectCode: '221101', summary: '发放8月工资', debit: 78000, credit: 0, explanation: '应付职工薪酬减少记借方。发放8月工资78,000元。' },
      { subjectCode: '100201', summary: '发放8月工资', debit: 0, credit: 78000, explanation: '银行存款减少记贷方。通过工行代发工资78,000元。' , cashFlowItem: 'cf-op3', cashFlowExplanation: '支付给职工以及为职工支付的现金。'}],
    documents: [
      { type: 'bank', label: '代发工资回单', date: '2026-08-22', totalAmount: 78000, payer: '万悦超市', payeeName: '员工代发户', content: '2026年8月工资', refNo: 'HD202608220001' }]},
  {
    date: '2026-08-23',
    role: 'accountant',
    title: '缴纳社保费',
    tags: ['工资社保'],
    difficulty: 2,
    description: '缴纳8月社会保险费23,400元（单位部分18,720元，个人代扣4,680元），通过工商银行缴纳。',
    tip: '社保费按月缴纳。借：应付职工薪酬-社保，贷：银行存款。',
    entries: [
      { subjectCode: '221102', summary: '缴纳8月社保费', debit: 23400, credit: 0, explanation: '应付职工薪酬-社保减少记借方。缴纳8月社保费23,400元。' },
      { subjectCode: '100201', summary: '缴纳8月社保费', debit: 0, credit: 23400, explanation: '银行存款减少记贷方。通过工行缴纳社保费23,400元。' , cashFlowItem: 'cf-op3', cashFlowExplanation: '支付给职工以及为职工支付的现金。'}],
    documents: [
      { type: 'bank', label: '社保缴费回单', date: '2026-08-23', totalAmount: 23400, payer: '万悦超市', payeeName: '上海市社会保险事业管理中心', content: '2026年8月社保费', refNo: 'HD202608230001' }]},
  {
    date: '2026-08-24',
    role: 'accountant',
    title: '计提固定资产折旧',
    tags: ['费用管理'],
    difficulty: 2,
    description: '计提8月固定资产折旧：营业用房1,000元+冷藏设备640元+货架收银系统360元+运输车辆480元=2,480元。',
    tip: '固定资产按月计提折旧，计入管理费用。借：管理费用，贷：累计折旧。',
    entries: [
      { subjectCode: '6602', summary: '计提8月折旧', debit: 2480, credit: 0, explanation: '管理费用增加记借方。8月折旧合计2,480元。' },
      { subjectCode: '1602', summary: '计提8月折旧', debit: 0, credit: 2480, explanation: '累计折旧增加记贷方。' }],
    documents: [
      { type: 'text', label: '折旧计算表', docTitle: '固定资产折旧计算表（2026年8月）', stampText: '财务专用章',
        content: `营业用房   500,000×0.2%=1,000元
冷藏设备    80,000×0.8%=  640元
货架收银    60,000×0.6%=  360元
运输车辆    80,000×0.6%=  480元
合计：2,480元` }]},
  {
    date: '2026-08-25',
    role: 'accountant',
    title: '缴纳增值税（7月）',
    tags: ['税费'],
    difficulty: 2,
    description: '缴纳7月应交增值税21,496元（见7月增值税计算表），通过工商银行缴纳。',
    tip: '增值税按月申报缴纳，次月15日前完成。缴纳时：借：应交税费-应交增值税，贷：银行存款。',
    entries: [
      { subjectCode: '222101', summary: '缴纳7月增值税', debit: 21496, credit: 0, explanation: '应交税费-应交增值税减少记借方。缴纳7月增值税21,496元。' },
      { subjectCode: '100201', summary: '缴纳7月增值税', debit: 0, credit: 21496, explanation: '银行存款减少记贷方。通过工行缴纳增值税。' , cashFlowItem: 'cf-op4', cashFlowExplanation: '支付的各项税费。'}],
    documents: [
      { type: 'bank', label: '缴税回单', date: '2026-08-25', totalAmount: 21496, payer: '万悦超市', payeeName: '国家金库上海分库', content: '缴纳2026年7月增值税', refNo: 'HD202608250001' }]},
  {
    date: '2026-08-26',
    role: 'accountant',
    title: '计提城建税及教育费附加',
    tags: ['税费'],
    difficulty: 2,
    description: '根据8月应交增值税计算附加税费。本月销项税额合计：首周24,050+高峰28,600+第二周19,500+预卡消费49.47+积分兑换17.26+清仓6,500+收尾13,000=91,716.73元；进项税额合计：文具3,900+学生用品3,900+水果3,015+日用品4,160=14,975元。应交增值税=91,716.73-14,975=76,741.73元。城建税(7%)=5,371.92元，教育费附加(3%)=2,302.25元。',
    tip: '8月进项税额相对较少（采购力度小于销售旺季），应交增值税较高。附加税费=应交增值税×10%。借：税金及附加，贷：应交税费。',
    entries: [
      { subjectCode: '6403', summary: '计提城建税及教育费附加', debit: 7674.17, credit: 0, explanation: '税金及附加增加记借方。本月应交增值税=销项91,716.73-进项14,975=76,741.73元。城建税=76,741.73×7%=5,371.92元，教育费附加=76,741.73×3%=2,302.25元，合计7,674.17元。' },
      { subjectCode: '222103', summary: '计提应交城市维护建设税', debit: 0, credit: 5371.92, explanation: '应交税费-应交城建税增加记贷方。' },
      { subjectCode: '222104', summary: '计提应交教育费附加', debit: 0, credit: 2302.25, explanation: '应交税费-应交教育费附加增加记贷方。' }],
    documents: [
      { type: 'text', label: '税金计算表', docTitle: '附加税费计算表（2026年8月）', stampText: '财务专用章',
        content: `销项税额合计：  91,716.73元
进项税额合计：  14,975.00元
应交增值税：   76,741.73元

城建税（7%）：   5,371.92元
教育费附加（3%）：2,302.25元
合计：          7,674.17元` }]},
  {
    date: '2026-08-28',
    role: 'accountant',
    title: '计提短期借款利息',
    tags: ['费用管理'],
    difficulty: 1,
    description: '计提8月短期借款利息：经营贷款600,000元，年利率4.35%，月利息=600,000×4.35%÷12=2,175元。',
    tip: '短期借款利息按月计提计入财务费用。借：财务费用，贷：其他应付款。',
    entries: [
      { subjectCode: '6603', summary: '计提8月借款利息', debit: 2175, credit: 0, explanation: '财务费用增加记借方。8月利息=600,000×4.35%÷12=2,175元。' },
      { subjectCode: '2241', summary: '计提8月借款利息', debit: 0, credit: 2175, explanation: '其他应付款增加记贷方。' }],
    documents: [
      { type: 'text', label: '利息计算表', docTitle: '短期借款利息计算表（2026年8月）', stampText: '财务专用章',
        content: '借款本金：600,000元\n月利率：4.35%÷12=0.3625%\n月利息：2,175元' }]},
  {
    date: '2026-08-29',
    role: 'accountant',
    title: '期末结转损益',
    tags: ['期末'],
    difficulty: 3,
    description: '月末结转所有损益类科目余额至"本年利润"，计算8月净利润。',
    tip: '期末结转损益：收入结转至本年利润贷方，费用结转至本年利润借方，差额为净利润。结转后损益类科目余额归零。',
    entries: [
      { subjectCode: '6001', debit: 705380.53, credit: 0, summary: '结转主营业务收入', explanation: '主营业务收入结转至本年利润。本月收入合计：开学首周185,000+高峰220,000+第二周150,000+预卡消费380.53+积分兑换132.74+清仓50,000+收尾100,000=705,380.53元。' },
      { subjectCode: '6401', debit: 0, credit: 511880, summary: '结转主营业务成本', explanation: '主营业务成本转出。成本合计：首周133,200+高峰158,400+第二周108,000+清仓42,000+收尾72,000+预卡280+积分90+一线工资23,000+返利冲减-6,000+其他约-17,090≈511,880元。（含返利冲减和一线工资入成本）' },
      { subjectCode: '6403', debit: 0, credit: 7674.17, summary: '结转税金及附加', explanation: '税金及附加转出7,674.17元。' },
      { subjectCode: '6601', debit: 0, credit: 25000, summary: '结转销售费用', explanation: '销售费用转出25,000元（销售工资）。' },
      { subjectCode: '660101', debit: 0, credit: 10000, summary: '结转销售费用-广告费', explanation: '广告费10,000元转出。' },
      { subjectCode: '6602', debit: 0, credit: 28480, summary: '结转管理费用', explanation: '管理费用转出28,480元：房租15,000+水电9,000+折旧2,480+其他约2,000=28,480元。管理工资30,000元通过660203单独结转。' },
      { subjectCode: '660203', debit: 0, credit: 30000, summary: '结转管理费用-工资', explanation: '管理工资30,000元转出。' },
      { subjectCode: '6603', debit: 0, credit: 2425, summary: '结转财务费用', explanation: '财务费用转出2,425元：微信提现手续费250元+利息2,175元。' },
      { subjectCode: '4103', debit: 0, credit: 89921.36, summary: '结转净利润至本年利润', explanation: '本年利润增加记贷方。本月净利润=705,380.53-（511,880+7,674.17+25,000+10,000+28,480+30,000+2,425）=705,380.53-615,459.17≈89,921.36元。开学季促销拉动销售，净利润显著提升。' }],
    documents: [
      { type: 'text', label: '损益计算表', docTitle: '万悦超市2026年8月损益计算表', stampText: '财务专用章',
        content: `万悦超市 损益计算表（2026年8月）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
一、营业收入              705,380.53
二、营业成本              511,880.00
三、税金及附加              7,674.17
四、销售费用               35,000.00
   广告费：10,000元
   销售工资：25,000元
五、管理费用               58,480.00
   房租15,000+水电9,000+折旧2,480+管理工资30,000+其他2,000
六、财务费用                2,425.00
七、利润总额               89,921.36
八、所得税费用（25%）      22,480.34
九、净利润                 67,441.02

备注：开学季促销拉动销售，
净利润较7月大幅增长` }]},
  {
    date: '2026-08-30',
    role: 'accountant',
    title: '采购冬季取暖设备（万用电器）',
    tags: ['商品采购'],
    difficulty: 2,
    description: '提前采购冬季取暖设备：电暖器200台×400元=80,000元、暖风机100台×300元=30,000元，合计不含税价110,000元，增值税14,300元，价税合计124,300元，以工商银行转账支付80,000元，余款暂欠。',
    tip: '冬季取暖设备需在入冬前提早上架。借：库存商品/应交税费-进项，贷：银行存款/应付账款。超市季节性商品通常提前1-2个月备货。',
    entries: [
      { subjectCode: '1405', summary: '取暖设备入库', debit: 110000, credit: 0, explanation: '库存商品增加记借方。冬季取暖设备入库：电暖器80,000+暖风机30,000=110,000元。' },
      { subjectCode: '222101', summary: '取暖设备进项税额', debit: 14300, credit: 0, explanation: '应交税费-应交增值税（进项税额）增加记借方。进项税额=110,000×13%=14,300元。' },
      { subjectCode: '100201', summary: '支付部分货款', debit: 0, credit: 80000, explanation: '银行存款减少记贷方。支付取暖设备部分货款80,000元。' , cashFlowItem: 'cf-op2', cashFlowExplanation: '采购存货/商品支出（配对科目1405），属于"购买商品、接受劳务支付的现金"。'},
      { subjectCode: '220203', summary: '万用电器余款暂欠', debit: 0, credit: 44300, explanation: '应付账款-万用电器增加记贷方。余款44,300元暂欠，按合同月结。' }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '上海', invoiceNo: '3100234810', date: '2026-08-30', buyer: '万悦超市', seller: '万用电器有限公司',
        lineItems: [{ name: '电暖器', spec: '2kW遥控', unit: '台', qty: 200, price: 400, amount: 80000 }, { name: '暖风机', spec: '2kW立式', unit: '台', qty: 100, price: 300, amount: 30000 }],
        totalAmount: 124300, taxRate: '13%', taxAmount: 14300, totalInWords: '壹拾贰万肆仟叁佰元整' },
      { type: 'bank', label: '付款回单（部分）', date: '2026-08-30', totalAmount: 80000, payer: '万悦超市', payeeName: '万用电器有限公司', content: '取暖设备部分货款', refNo: 'HD202608300001' }]},
  {
    date: '2026-08-31',
    role: 'accountant',
    title: '模拟纳税申报',
    tags: ['期末', '税费', '申报'],
    difficulty: 1,
    description: '根据本月已完成的账务处理，进行模拟纳税申报。系统已自动计算应缴税额，请前往纳税申报页面核对并提交。',
    tip: '纳税申报在次月15日前完成。确认凭证已过账、期末结转已完成后再申报。',
    entries: [],
    documents: [
      { type: 'text', label: '纳税申报提醒', docTitle: '8月纳税申报提醒', stampText: '财务专用章',
        content: `请前往纳税申报页面：
1. 增值税：销项91,716.73元 - 进项14,975.00元 = 应交76,741.73元
2. 企业所得税：利润总额89,921.36×25%=22,480.34元
3. 确认无误后点击"提交申报"

温馨提示：纳税申报应在次月15日前完成。` }]},
]
export default tasks
