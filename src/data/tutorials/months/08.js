/**
 * 8月份业务教程数据（47个任务：30会计 + 17出纳）
 *
 * 难度：★★★☆☆（Q3第二个月，持续深化）
 * 新增业务类型：在建工程完工转回、固定资产减值准备
 *
 * 出纳专题：票据贴现——贴现息计算/贴现操作/日常收支
 * 业务叙事：8月进入暑期运营阶段。月初常规缴税发工资，
 *           月中完成7月改扩建设备的转固收尾，
 *           月末进行固定资产减值测试（新概念），
 *           以及常规坏账计提和损益结转。
 * 教学重点：让学生理解在建工程完工转回固定资产的流程、
 *           固定资产减值准备的计提条件和方法、
 *           预计负债实际支出对负债的冲减（不产生新费用）
 *
 * 会计准则依据：《企业会计准则第4号——固定资产》
 *   - 第8号——资产减值（固定资产减值）
 *   - 第13号——或有事项（预计负债）
 *   - 第17号——借款费用（利息计提）
 */

const aug = [
  // ═══════════════════════════════════════════════
  // 第一周 8/3~8/7：月初常规
  // ═══════════════════════════════════════════════

  {
    date: '2026-08-03',
    title: '缴纳7月增值税',
    tags: ["税费"],
    difficulty: 1,
    description: '缴纳7月份应交增值税 32,500元（7月销项税额36,400 - 进项税额3,900），以银行存款支付。',
    tip: '每月固定缴税业务。7月销项36,400元（现销26,000+赊销10,400），进项3,900元（采购G材料），应纳32,500元。',
    entries: [
      { subjectCode: '222101', summary: '缴纳7月增值税', debit: 32500, credit: 0,
        explanation: '7月底计提了应交增值税32,500元（贷方余额），现在实际缴纳，负债减少记借方。' },
      { subjectCode: '100201', summary: '缴纳7月增值税', debit: 0, credit: 32500,
        explanation: '银行存款减少32,500元。每月初集中缴税是企业固定的资金流出节奏。' , cashFlowItem: 'cf-op4', cashFlowExplanation: '缴纳税费支出（配对科目222101），属于"支付的各项税费"——经营活动现金流出。'},
    ],
    documents: [
      { type: 'receipt', label: '税收缴款书', docTitle: '中华人民共和国税收缴款书', date: '2026-08-03', totalAmount: 32500, payer: '本公司', stampText: '国家税务总局\n征收章',
        items: [{ name: '增值税（2026年7月）', qty: 1, price: 32500, amount: 32500 }] },
      { type: 'bank', label: '银行回单', date: '2026-08-03', totalAmount: 32500, payer: '本公司', payeeName: '国家税务总局XX分局', content: '缴纳7月增值税', refNo: 'HD202608030001' },
    ],
  },
  {
    date: '2026-08-03',
    title: '缴纳7月城建税',
    tags: ["税费"],
    difficulty: 1,
    description: '缴纳7月份城市维护建设税 2,275元（应纳增值税32,500 × 7%），以银行存款支付。',
    tip: '城建税以实际应纳增值税为计税依据。7月底计提了2,275元（贷方），现在缴纳（借方），清偿负债。',
    entries: [
      { subjectCode: '222103', summary: '缴纳7月城建税', debit: 2275, credit: 0,
        explanation: '7月底计提了城建税2,275元（贷方），8月初缴纳，负债减少记借方。城建税税率市区7%。' },
      { subjectCode: '100201', summary: '缴纳7月城建税', debit: 0, credit: 2275,
        explanation: '银行存款减少2,275元。城建税与增值税同步缴纳。' , cashFlowItem: 'cf-op4', cashFlowExplanation: '缴纳税费支出（配对科目222103），属于"支付的各项税费"——经营活动现金流出。'},
    ],
    documents: [
      { type: 'receipt', label: '税收缴款书', docTitle: '城市维护建设税缴款书', date: '2026-08-03', totalAmount: 2275, payer: '本公司', stampText: '国家税务总局\n征收章',
        items: [{ name: '城市维护建设税（2026年7月）', qty: 1, price: 2275, amount: 2275 }] },
      { type: 'bank', label: '银行回单', date: '2026-08-03', totalAmount: 2275, payer: '本公司', payeeName: '国家税务总局XX分局', content: '缴纳7月城建税', refNo: 'HD202608030002' },
    ],
  },
  {
    date: '2026-08-03',
    title: '缴纳7月教育费附加',
    tags: ["税费"],
    difficulty: 1,
    description: '缴纳7月份教育费附加 975元（应纳增值税32,500 × 3%），以银行存款支付。',
    tip: '教育费附加与城建税同步缴纳。三笔税金合计32,500+2,275+975=35,750元。',
    entries: [
      { subjectCode: '222104', summary: '缴纳7月教育费附加', debit: 975, credit: 0,
        explanation: '教育费附加975元是上月计提的负债，本月缴纳后负债减少。' },
      { subjectCode: '100201', summary: '缴纳7月教育费附加', debit: 0, credit: 975,
        explanation: '银行存款减少975元。三笔税金合计35,750元。' , cashFlowItem: 'cf-op4', cashFlowExplanation: '缴纳税费支出（配对科目222104），属于"支付的各项税费"——经营活动现金流出。'},
    ],
    documents: [
      { type: 'receipt', label: '缴款凭证', docTitle: '教育费附加缴款凭证', date: '2026-08-03', totalAmount: 975, payer: '本公司', stampText: '国家税务总局\n征收章',
        items: [{ name: '教育费附加（2026年7月）', qty: 1, price: 975, amount: 975 }] },
      { type: 'bank', label: '银行回单', date: '2026-08-03', totalAmount: 975, payer: '本公司', payeeName: '国家税务总局XX分局', content: '缴纳7月教育费附加', refNo: 'HD202608030003' },
    ],
  },
  {
    date: '2026-08-05',
    title: '发放7月份员工工资',
    tags: ["工资社保"],
    difficulty: 2,
    description: '以银行存款发放7月份计提的工资 72,000元。代扣社保个人部分 7,200元、公积金个人部分 3,600元、个税 2,000元，实发 59,200元。',
    tip: '每月10日前发放上月工资。7月工资回归正常水平（不含半年奖），个税也回落至2,000元。分录与之前月份一致。',
    entries: [
      { subjectCode: '221101', summary: '发放7月工资', debit: 72000, credit: 0,
        explanation: '应付职工薪酬-工资减少72,000元。7月25日计提了72,000元工资，现在实际发放，负债减少记借方。' },
      { subjectCode: '100201', summary: '实发工资', debit: 0, credit: 59200,
        explanation: '实发59,200元=应发72,000-社保7,200-公积金3,600-个税2,000。代扣合计12,800元，占比17.8%。' , cashFlowItem: 'cf-op3', cashFlowExplanation: '支付职工薪酬相关支出（配对科目221101），属于"支付给职工以及为职工支付的现金"——经营活动现金流出。'},
      { subjectCode: '224101', summary: '代扣社保个人部分', debit: 0, credit: 7200,
        explanation: '其他应付款-社保增加7,200元。代扣的社保个人部分暂挂，下月缴纳时冲减。' },
      { subjectCode: '224102', summary: '代扣公积金个人部分', debit: 0, credit: 3600,
        explanation: '其他应付款-公积金增加3,600元。代扣的公积金个人部分暂挂。' },
      { subjectCode: '222102', summary: '代扣个税', debit: 0, credit: 2000,
        explanation: '应交税费-应交个人所得税增加2,000元。7月无半年奖，个税回落至正常水平2,000元。' },
    ],
    documents: [
      { type: 'text', label: '工资发放表', docTitle: '2026年7月工资发放明细', stampText: '财务专用章', signature: '制表：王出纳  审核：李会计  批准：赵总',
        content: `应发合计：72,000.00
代扣社保：  7,200.00（个人部分）
代扣公积金： 3,600.00（个人部分）
代扣个税：  2,000.00
实发合计：59,200.00

发放方式：银行转账
发放日期：2026年8月5日` },
      { type: 'bank', label: '银行回单', date: '2026-08-05', totalAmount: 59200, payer: '本公司', payeeName: '员工工资代发户', content: '7月份工资发放', refNo: 'HD202608050004' },
    ],
  },
  {
    date: '2026-08-05',
    title: '缴纳代扣社保及公积金个人部分',
    tags: ["工资社保"],
    difficulty: 2,
    description: '将7月份工资中代扣的社保个人部分 7,200元、公积金个人部分 3,600元，合计 10,800元，缴纳至社保局和公积金管理中心。',
    tip: '发工资时代扣的社保和公积金个人部分当月内缴清。金额与上月持平（7月工资水平稳定）。',
    entries: [
      { subjectCode: '224101', summary: '缴纳代扣社保', debit: 7200, credit: 0,
        explanation: '其他应付款-社保减少7,200元。7月发工资时从员工工资扣下的社保个人部分，现在缴给社保局。' },
      { subjectCode: '224102', summary: '缴纳代扣公积金', debit: 3600, credit: 0,
        explanation: '其他应付款-公积金减少3,600元。个人公积金缴清后该科目余额归零。' },
      { subjectCode: '100201', summary: '缴纳代扣社保公积金', debit: 0, credit: 10800,
        explanation: '银行存款减少10,800元。个人部分企业只是经手代缴，不产生费用。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目224101），属于"支付其他与经营活动有关的现金"。'},
    ],
    documents: [
      { type: 'receipt', label: '社保缴费单', docTitle: '社会保险费个人部分缴费凭证', date: '2026-08-05', totalAmount: 7200, payer: '本公司', stampText: 'XX市社保\n征缴章',
        items: [{ name: '养老保险（个人3%）', qty: 1, price: 5760, amount: 5760 }, { name: '医疗保险（个人2%）', qty: 1, price: 1080, amount: 1080 }, { name: '失业保险（个人0.5%）', qty: 1, price: 360, amount: 360 }] },
      { type: 'receipt', label: '公积金汇缴书', docTitle: '住房公积金个人部分汇款凭证', date: '2026-08-05', totalAmount: 3600, payer: '本公司', stampText: 'XX市公积金\n管理中心\n业务专用章',
        items: [{ name: '个人缴存（7月）', qty: 14, price: 257.14, amount: 3600 }] },
    ],
  },
  {
    date: '2026-08-05',
    title: '缴纳7月代扣个税',
    tags: ["税费"],
    difficulty: 1,
    description: '向税务机关申报并缴纳7月份代扣的个人所得税 2,000元，以银行存款支付。',
    tip: '个税申报期限是次月15日前。7月个税2,000元（正常水平）。分录：冲减应交税费（借方），减少银行存款（贷方）。',
    entries: [
      { subjectCode: '222102', summary: '缴纳7月代扣个税', debit: 2000, credit: 0,
        explanation: '应交税费-应交个人所得税减少2,000元。发工资时代扣了这笔钱，现在实际缴纳，负债减少记借方。' },
      { subjectCode: '100201', summary: '缴纳7月个税', debit: 0, credit: 2000,
        explanation: '银行存款减少2,000元。个税是代扣代缴，不产生企业费用。' , cashFlowItem: 'cf-op4', cashFlowExplanation: '缴纳税费支出（配对科目222102），属于"支付的各项税费"——经营活动现金流出。'},
    ],
    documents: [
      { type: 'receipt', label: '缴税凭证', docTitle: '中华人民共和国税收缴款书', date: '2026-08-05', totalAmount: 2000, payer: '本公司', stampText: '国家税务总局\n征收章',
        items: [{ name: '个人所得税（代扣代缴7月）', qty: 1, price: 2000, amount: 2000 }] },
      { type: 'bank', label: '银行回单', date: '2026-08-05', totalAmount: 2000, payer: '本公司', payeeName: '国家税务总局XX分局', content: '缴纳7月代扣个税', refNo: 'HD202608050005' },
    ],
  },

  // ═══════════════════════════════════════════════
  // 第二周 8/10~8/14：新业务 ⭐
  // ═══════════════════════════════════════════════

  {
    date: '2026-08-10',
    title: '改扩建完工——在建工程转回固定资产 ⭐',
    tags: ["资产"],
    difficulty: 3,
    description: '7月18日转入改扩建的机器设备已完工验收。在建工程余额65,000元（净值50,000+改造支出15,000），全部转回固定资产。',
    tip: '固定资产改扩建的收尾步骤：将"在建工程"余额转回"固定资产"。改扩建完成后，固定资产原值更新为65,000元，需要重新确定折旧年限和月折旧额。本月起按新原值计提折旧。',
    entries: [
      { subjectCode: '160103', summary: '改扩建完成转回固定资产', debit: 65000, credit: 0,
        explanation: '为什么借"固定资产"65,000元？改扩建后的机器设备重新投入使用，原值=转入时净值50,000+改造支出15,000=65,000元。改造后该设备的生产效率提升了约30%，使用寿命延长。' },
      { subjectCode: '1604', summary: '结转在建工程', debit: 0, credit: 65000,
        explanation: '在建工程减少65,000元。改造全流程处理完毕：①转入在建工程（净值50,000+累计折旧10,000冲减原值60,000）②发生改造支出15,000 ③完工转回固定资产65,000。注意：改扩建后的固定资产本月起按新原值计提折旧，预计剩余使用年限8年，残值率5%，月折旧额≈643元。' },
    ],
    documents: [
      { type: 'text', label: '竣工验收单', docTitle: '固定资产改造竣工验收单', stampText: '工程部\n验收专用章', signature: '验收人：设备部王工  确认：财务李会计  批准：赵总',
        content: `设备名称：数控机床（设备编号：JQ-002）
改造前原值：60,000.00元
改造前净值：50,000.00元
改造支出：15,000.00元
改造后原值：65,000.00元

验收结论：
  1. 核心控制部件更换完成 ✓
  2. 设备运行测试通过 ✓
  3. 生产效率提升约30% ✓

验收日期：2026年8月10日
改造后预计剩余使用年限：8年` },
      { type: 'text', label: '资产台账变更', docTitle: '固定资产台账变更通知', stampText: '财务专用章',
        content: `固定资产编号：JQ-002
变更项目：原值调整（改扩建资本化）
原值调整：60,000 → 65,000元
变更生效日：2026年8月10日

月折旧额重新计算：
  （65,000 - 65,000×5%）/ 8年 / 12月 ≈ 643元/月` },
    ],
  },
  {
    date: '2026-08-11',
    title: '采购原材料（含税）',
    tags: ["采购"],
    difficulty: 2,
    description: '从子公司购入H材料一批，增值税专用发票，价款 35,000元，增值税 4,550元（13%），以银行存款支付。',
    tip: '标准采购分录——价款入原材料成本，进项税入应交税费借方（可抵扣）。H材料用于生产B产品，供应商范围进一步扩大。',
    entries: [
      { subjectCode: '1403', summary: '采购H材料价款', debit: 35000, credit: 0,
        explanation: 'H材料采购成本35,000元。价款和税款分离，价款计入原材料成本。' },
      { subjectCode: '222101', summary: '进项税额（13%）', debit: 4550, credit: 0,
        explanation: '进项税额4,550元（35,000×13%），取得增值税专用发票后可抵扣销项税。' },
      { subjectCode: '100201', summary: '支付采购款', debit: 0, credit: 39550,
        explanation: '银行存款减少39,550元=35,000+4,550。价税分离是增值税核算的核心特征。' , cashFlowItem: 'cf-op2', cashFlowExplanation: '采购存货/商品支出（配对科目1403），属于"购买商品、接受劳务支付的现金"——经营活动现金流出。'},
    ],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '广东', invoiceType: '专用', copy: '发票联', invoiceNo: '4400801111', date: '2026年08月11日', buyer: '本公司', buyerTaxId: '91440101MA3XXXXXXXX', seller: '子材料有限公司', sellerTaxId: '91440101MA0MMMMMMMM', stampText: '子公司\n发票专用章',
        lineItems: [{ name: 'H材料', unit: '千克', qty: 700, price: 50, amount: 35000, taxRate: '13%', tax: 4550 }], totalAmount: 39550 },
      { type: 'bank', label: '银行回单', date: '2026-08-11', totalAmount: 39550, payer: '本公司', payeeName: '子材料有限公司', content: '采购H材料款', refNo: 'HD202608110006' },
    ],
  },
  {
    date: '2026-08-12',
    title: '销售商品（款已收）',
    tags: ["销售"],
    difficulty: 2,
    description: '向己公司销售B产品一批，价款 220,000元，增值税 28,600元（13%），款项已存入银行。',
    tip: '现销业务——B产品销售额持续增长，从7月的200,000元增长至220,000元。改扩建完成后的产能提升开始体现。分录三要素一致：银行存款增加（借），收入确认（贷），增值税（贷）。',
    entries: [
      { subjectCode: '100201', summary: '销售B产品收款', debit: 248600, credit: 0,
        explanation: '银行存款增加248,600元（含税价）。B产品销售220,000元，创下单月新高。改扩建完成使设备产能得到提升。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入——主营业务产生的现金收入。'},
      { subjectCode: '6001', summary: '销售B产品收入', debit: 0, credit: 220000,
        explanation: '主营业务收入220,000元。不含税价款确认收入，B产品176件×1,250元/件=220,000元。' },
      { subjectCode: '222101', summary: '销项税额（13%）', debit: 0, credit: 28600,
        explanation: '销项税额28,600元（220,000×13%）。增值税是价外税，不影响企业利润。' },
    ],
    documents: [
      { type: 'invoice', label: '增值税发票', region: '广东', invoiceType: '专用', copy: '记账联', invoiceNo: '4400802222', date: '2026年08月12日', buyer: '己公司', buyerTaxId: '91440101MA9EEEEEEE', seller: '本公司', sellerTaxId: '91440101MA3XXXXXXXX', stampText: '本公司\n发票专用章',
        lineItems: [{ name: 'B产品', unit: '件', qty: 176, price: 1250, amount: 220000, taxRate: '13%', tax: 28600 }], totalAmount: 248600 },
      { type: 'bank', label: '银行回单', date: '2026-08-12', totalAmount: 248600, payer: '己公司', payeeName: '本公司', content: '购买B产品货款', refNo: 'HD202608120007' },
    ],
  },
  {
    date: '2026-08-13',
    title: '赊销商品给癸公司',
    tags: ["销售"],
    difficulty: 2,
    description: '向新客户癸公司赊销A产品一批，价款 100,000元，增值税 13,000元（13%），款项暂欠。',
    tip: '赊销业务——借方是"应收账款-癸公司"。癸公司之前是原材料供应商（7月采购G材料），现在也开始向本公司采购产品，说明双方合作关系深入。',
    entries: [
      { subjectCode: '112206', summary: '赊销A产品-癸公司', debit: 113000, credit: 0,
        explanation: '应收账款-癸公司增加113,000元。商品已发出、收入已确认，但款项未收。癸公司是双向合作客户。' },
      { subjectCode: '6001', summary: '赊销商品收入', debit: 0, credit: 100000,
        explanation: '主营业务收入100,000元。A产品100件×1,000元/件=100,000元。赊销的收入确认标准与现销一致。' },
      { subjectCode: '222101', summary: '赊销-销项税额', debit: 0, credit: 13000,
        explanation: '销项税额13,000元（100,000×13%）。赊销时增值税纳税义务已产生。' },
    ],
    documents: [
      { type: 'invoice', label: '增值税发票', region: '广东', invoiceType: '专用', copy: '记账联', invoiceNo: '4400803333', date: '2026年08月13日', buyer: '癸公司', buyerTaxId: '91440101MA0LLLLLLLL', seller: '本公司', sellerTaxId: '91440101MA3XXXXXXXX', stampText: '本公司\n发票专用章',
        lineItems: [{ name: 'A产品', unit: '件', qty: 100, price: 1000, amount: 100000, taxRate: '13%', tax: 13000 }], totalAmount: 113000 },
      { type: 'text', label: '销售合同', docTitle: '销售合同（摘要）', stampText: '合同专用章',
        content: `甲方（卖方）：本公司
乙方（买方）：癸公司

货物：A产品 100件
单价：1,000元/件
总价：100,000元
增值税：13,000元
合计：113,000元

付款条件：货到30天内付款
发货日期：2026年8月13日` },
    ],
  },
  {
    date: '2026-08-13',
    title: '收到辛公司货款',
    tags: ["销售"],
    difficulty: 1,
    description: '收到辛公司7月份赊销货款 90,400元，款项已存入工商银行。',
    tip: '收款业务——冲减应收账款。7月10日赊销给辛公司90,400元，按合同约定期限回款。辛公司信誉良好。',
    entries: [
      { subjectCode: '100201', summary: '收到辛公司货款', debit: 90400, credit: 0,
        explanation: '银行存款增加90,400元。辛公司按约付款，款项全部收回。及时核销应收账款。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目112205），属于经营活动现金流入——主营业务产生的现金收入。'},
      { subjectCode: '112205', summary: '收到辛公司货款', debit: 0, credit: 90400,
        explanation: '应收账款-辛公司减少90,400元。7月赊销形成的债权现在收回。' },
    ],
    documents: [
      { type: 'bank', label: '银行回单', date: '2026-08-13', totalAmount: 90400, payer: '辛公司', payerAccount: '6222 0100 **** 5555', payeeName: '本公司', content: '支付7月货款', refNo: 'HD202608130008' },
    ],
  },
  {
    date: '2026-08-14',
    title: '产品质量保证——实际维修支出',
    tags: ["费用"],
    difficulty: 2,
    description: '本月发生A产品售后维修费用 1,500元，以银行存款支付。冲减5月计提的预计负债（产品质量保证）。',
    tip: '预计负债的持续处理：5月计提了5,000元的预计负债（贷方），6月已支出3,000元，本月再支出1,500元。剩余余额=5,000-3,000-1,500=500元。实际发生产品质量保证支出时，不产生新费用（费用在计提时已确认），只冲减预计负债。',
    entries: [
      { subjectCode: '2212', summary: '实际维修支出-冲减预计负债', debit: 1500, credit: 0,
        explanation: '为什么借"预计负债"1,500元？5月计提的预计负债5,000元尚未用完。实际发生产品维修支出时，冲减预计负债。预计负债余额=5,000-3,000(6月)-1,500(本月)=500元。差额500元在年末进行调整。' },
      { subjectCode: '100201', summary: '支付维修费', debit: 0, credit: 1500,
        explanation: '银行存款减少1,500元。实际维修费低于预计数，说明产品质量较好。注意：这里不产生新的费用——费用已在5月计提时确认。如果实际支出超过计提额，需要补提差额。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目2212），属于"支付其他与经营活动有关的现金"。'},
    ],
    documents: [
      { type: 'receipt', label: '维修单据', docTitle: '产品售后维修单', date: '2026-08-14', totalAmount: 1500, payer: '本公司', stampText: '售后服务中心\n专用章',
        items: [
          { name: 'A产品——更换配件', qty: 3, price: 350, amount: 1050 },
          { name: 'A产品——人工维修费', qty: 1, price: 450, amount: 450 },
        ] },
      { type: 'text', label: '维修报告', docTitle: '产品维修统计（8月）', stampText: '质量管理部\n专用章',
        content: `本月维修统计：
  维修产品：A产品
  维修数量：3台
  维修费用：1,500.00元

预计负债余额：
  5月计提：5,000.00
  6月支出：-3,000.00
  8月支出：-1,500.00
  剩余余额：500.00（年末调整）` },
    ],
  },

  // ═══════════════════════════════════════════════
  // 第三周 8/17~8/21：持续经营
  // ═══════════════════════════════════════════════

  {
    date: '2026-08-17',
    title: '支付供应商货款',
    tags: ["采购"],
    difficulty: 1,
    description: '支付子材料公司8月采购H材料欠款 39,550元，以银行存款支付。',
    tip: '清偿应付账款——负债减少记借方，资产减少记贷方。及时付款维护商业信用。',
    entries: [
      { subjectCode: '220203', summary: '支付子材料公司货款', debit: 39550, credit: 0,
        explanation: '应付账款-子材料公司减少39,550元。8月11日向子材料公司采购H材料形成了这笔负债，现在付款清偿。' },
      { subjectCode: '100201', summary: '支付货款', debit: 0, credit: 39550,
        explanation: '银行存款减少39,550元。及时支付供应商货款有助于建立长期合作关系。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目220203），属于"支付其他与经营活动有关的现金"。'},
    ],
    documents: [
      { type: 'bank', label: '银行回单', date: '2026-08-17', totalAmount: 39550, payer: '本公司', payeeName: '子材料有限公司', content: '支付H材料采购款', refNo: 'HD202608170009' },
    ],
  },
  {
    date: '2026-08-18',
    title: '员工报销差旅费',
    tags: ["费用"],
    difficulty: 1,
    description: '销售部员工出差归来报销差旅费 3,000元，以银行存款支付。',
    tip: '差旅费实报实销，计入"管理费用-差旅费"。8月暑期出差频率较高。',
    entries: [
      { subjectCode: '660202', summary: '报销差旅费', debit: 3000, credit: 0,
        explanation: '管理费用-差旅费增加3,000元。员工出差费用是企业管理活动的必要支出。' },
      { subjectCode: '100201', summary: '报销差旅费', debit: 0, credit: 3000,
        explanation: '银行存款减少3,000元。出差费用实报实销。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目660202），属于"支付其他与经营活动有关的现金"。'},
    ],
    documents: [
      { type: 'receipt', label: '差旅报销单', docTitle: '差旅费报销单', date: '2026-08-18', totalAmount: 3000, stampText: '财务审核\n已核销',
        items: [
          { name: '机票（广州→成都）', qty: 2, price: 650, amount: 1300 },
          { name: '住宿费（3晚）', qty: 3, price: 350, amount: 1050 },
          { name: '出差补助（3天×200元）', qty: 3, price: 200, amount: 600 },
          { name: '市内交通费', qty: 1, price: 50, amount: 50 },
        ] },
    ],
  },
  {
    date: '2026-08-18',
    title: '支付水电费',
    tags: ["费用"],
    difficulty: 1,
    description: '支付本月水电费合计 5,200元，银行代扣。其中电费 4,000元，水费 1,200元。',
    tip: '8月持续高温，水电费与7月持平。教学简化全部计入管理费用。',
    entries: [
      { subjectCode: '6602', summary: '支付水电费', debit: 5200, credit: 0,
        explanation: '管理费用增加5,200元（电费4,000+水费1,200）。夏季水电费保持高位。' },
      { subjectCode: '100201', summary: '支付水电费', debit: 0, credit: 5200,
        explanation: '银行存款减少5,200元。水电费是企业每月固定支出之一。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6602），属于"支付其他与经营活动有关的现金"。'},
    ],
    documents: [
      { type: 'receipt', label: '电费单', docTitle: '电费缴费凭证', date: '2026-08-18', totalAmount: 4000, payer: '本公司', stampText: '国家电网\n收讫章',
        items: [{ name: '生产用电 4,000 kWh × 1.00元', qty: 4000, price: 1, amount: 4000 }] },
      { type: 'receipt', label: '水费单', docTitle: '水费缴费凭证', date: '2026-08-18', totalAmount: 1200, payer: '本公司', stampText: '自来水公司\n收讫章',
        items: [{ name: '生产用水 300 吨 × 4.00元', qty: 300, price: 4, amount: 1200 }] },
    ],
  },
  {
    date: '2026-08-19',
    title: '购买办公用品',
    tags: ["费用"],
    difficulty: 1,
    description: '行政部采购办公用品一批 700元，以银行存款支付。',
    tip: '金额较小的办公用品直接费用化，计入"管理费用-办公费"。',
    entries: [
      { subjectCode: '660201', summary: '购买办公用品', debit: 700, credit: 0,
        explanation: '管理费用-办公费增加700元。办公消耗品直接费用化。' },
      { subjectCode: '100201', summary: '购买办公用品', debit: 0, credit: 700,
        explanation: '银行存款减少700元。金额小按含税价直接费用化。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目660201），属于"支付其他与经营活动有关的现金"。'},
    ],
    documents: [
      { type: 'receipt', label: '收据', docTitle: '收  据', date: '2026-08-19', totalAmount: 700, payer: '本公司', stampText: '办公用品店\n发票专用章',
        items: [{ name: '打印纸 5包×100元', qty: 5, price: 100, amount: 500 }, { name: '文具套裝 10套×20元', qty: 10, price: 20, amount: 200 }] },
    ],
  },
  {
    date: '2026-08-20',
    title: '支付网络推广费',
    tags: ["费用"],
    difficulty: 1,
    description: '支付本月网络推广费 9,000元，以银行存款支付。',
    tip: '推广费属于"销售费用-广告费"。8月推广费与7月持平，为9月销售旺季做持续铺垫。',
    entries: [
      { subjectCode: '660101', summary: '支付网络推广费', debit: 9000, credit: 0,
        explanation: '销售费用-广告费增加9,000元。夏季推广持续投入。' },
      { subjectCode: '100201', summary: '支付网络推广费', debit: 0, credit: 9000,
        explanation: '银行存款减少9,000元。推广费是企业维持市场曝光度的必要开支。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目660101），属于"支付其他与经营活动有关的现金"。'},
    ],
    documents: [
      { type: 'invoice', label: '服务发票', region: '北京', invoiceType: '专用', copy: '发票联', invoiceNo: '1100888555', date: '2026年08月20日', buyer: '本公司', buyerTaxId: '91440101MA3XXXXXXXX', seller: '字节跳动科技有限公司', sellerTaxId: '91110000MA6YYYYYYY', stampText: '字节跳动\n发票专用章',
        lineItems: [{ name: '信息流推广服务费（8月）', unit: '项', qty: 1, price: 9000, amount: 9000, taxRate: '6%', tax: 540 }], totalAmount: 9540 },
    ],
  },
  {
    date: '2026-08-21',
    title: '计提固定资产折旧',
    tags: ["资产"],
    difficulty: 2,
    description: '本月计提固定资产折旧合计 7,000元：办公设备折旧 2,000元（不变），在用机器设备折旧 4,357元，改扩建后设备折旧 643元（新入账）。',
    tip: '8月折旧有变化：改扩建完成的机器设备按新原值65,000元恢复计提折旧，月折旧额约643元。剩余8年使用年限，残值率5%。三项折旧合计7,000元。',
    entries: [
      { subjectCode: '6602', summary: '计提办公设备折旧', debit: 2000, credit: 0,
        explanation: '管理费用-折旧费增加2,000元。办公设备折旧不变。' },
      { subjectCode: '5101', summary: '计提机器设备折旧（在用）', debit: 4357, credit: 0,
        explanation: '制造费用增加4,357元。原有的三台机器设备继续正常计提折旧。' },
      { subjectCode: '5101', summary: '计提改造后设备折旧', debit: 643, credit: 0,
        explanation: '制造费用增加643元。改扩建完成的设备按新原值65,000元恢复计提折旧。计算：（65,000-65,000×5%）/96个月≈643元。' },
      { subjectCode: '1602', summary: '计提本月折旧', debit: 0, credit: 7000,
        explanation: '累计折旧增加7,000元。截至8月底累计折旧=196,357（7月）+7,000（8月）=203,357元。固定资产总额=695,000元。' },
    ],
    documents: [
      { type: 'text', label: '折旧计算表', docTitle: '2026年8月折旧计算表', stampText: '固定资产\n管理专用章',
        content: `资产名称          原值       月折旧额    累计折旧      净值
─────────────────────────────────────────────
办公设备          90,000      2,000      64,000      26,000
机器设备(在用)   540,000      4,357     132,714     407,286
机器设备(改造后)  65,000        643         643      64,357
─────────────────────────────────────────────
合  计           695,000      7,000     197,357     497,643

说明：8月改扩建设备恢复计提折旧。
折旧方法：平均年限法（直线法）净残值率5%` },
    ],
  },
  {
    date: '2026-08-21',
    title: '无形资产摊销',
    tags: ["资产"],
    difficulty: 2,
    description: '本月摊销无形资产（财务软件使用权）2,000元，与各月相同。',
    tip: '每月固定的无形资产摊销。截至8月底已摊销28,000元（9个月），剩余净值92,000元。',
    entries: [
      { subjectCode: '6602', summary: '无形资产摊销', debit: 2000, credit: 0,
        explanation: '管理费用增加2,000元。无形资产（财务软件使用权）按月摊销。' },
      { subjectCode: '1702', summary: '无形资产摊销', debit: 0, credit: 2000,
        explanation: '累计摊销增加2,000元。无形资产净值=原值120,000-累计摊销28,000=92,000元。' },
    ],
    documents: [
      { type: 'text', label: '摊销计算表', docTitle: '无形资产摊销计算表（8月）', stampText: '财务管理章',
        content: `资产名称：财务软件使用权
原值：120,000元
摊销年限：5年（60个月）
月摊销额：2,000元

已摊销：28,000元（含本月·9个月）
剩余净值：92,000元` },
    ],
  },
  {
    date: '2026-08-21',
    title: '国债利息收入确认',
    tags: ["资产"],
    difficulty: 2,
    description: '确认4月购买的1年期国债本月利息收入。面值50,000元，年利率2.5%，月利息104.17元。',
    tip: '国债按月确认利息收入。累计应收利息=5个月×104.17=520.85元。利率虽低但稳定。',
    entries: [
      { subjectCode: '110102', summary: '国债应收利息', debit: 104.17, credit: 0,
        explanation: '交易性金融资产-应计利息增加104.17元。按月确认国债利息。累计应收利息：4~8月共5个月×104.17=520.85元。' },
      { subjectCode: '6111', summary: '国债利息收入', debit: 0, credit: 104.17,
        explanation: '投资收益增加104.17元。国债利息持续产生稳定的投资收益。到期一次性还本付息。' },
    ],
    documents: [
      { type: 'text', label: '利息计算表', docTitle: '国债利息计算表（2026年8月）', stampText: '财务管理章',
        content: `国债信息：
品种：2026年记账式国债
面值：50,000.00元
年利率：2.5%

本月利息：50,000 × 2.5% ÷ 12 = 104.17元
累计应收利息：520.85元（4~8月）
购入日：2026年4月16日
到期日：2027年4月16日` },
    ],
  },
  {
    date: '2026-08-22',
    title: '计提短期借款利息',
    tags: ["融资"],
    difficulty: 2,
    description: '计提本月短期借款利息。借款余额150,000元，年利率4.35%，月利息543.75元。',
    tip: 'Q3第2个月，利息543.75元与之前各月相同。Q3的利息累计1,087.50元（7月+8月），将在9月末按季支付。',
    entries: [
      { subjectCode: '6603', summary: '计提8月借款利息', debit: 543.75, credit: 0,
        explanation: '财务费用增加543.75元。150,000×4.35%÷12=543.75元。Q3累计利息=543.75×2=1,087.50元。' },
      { subjectCode: '2231', summary: '计提8月借款利息', debit: 0, credit: 543.75,
        explanation: '应付利息增加543.75元。Q3利息将在9月末按季支付。' },
    ],
    documents: [
      { type: 'text', label: '利息计算表', docTitle: '短期借款利息计算表（8月）', stampText: '财务专用章',
        content: `借款余额：150,000.00元
年利率：4.35%
月利率：0.3625%

本月利息 = 150,000 × 4.35% ÷ 12 = 543.75元

Q3累计利息：543.75×2=1,087.50元
将在9月末按季支付` },
    ],
  },

  // ═══════════════════════════════════════════════
  // 第四周 8/24~8/31：月末调整
  // ═══════════════════════════════════════════════

  {
    date: '2026-08-25',
    title: '计提8月份员工工资',
    tags: ["工资社保"],
    difficulty: 2,
    description: '本月员工工资总额 73,000元。其中：行政管理人员工资 31,000元，销售人员工资 42,000元（比7月微增）。',
    tip: '月末固定计提工资。8月工资总额73,000元，比7月增加1,000元（销售人员绩效提升）。',
    entries: [
      { subjectCode: '660203', summary: '计提8月行政工资', debit: 31000, credit: 0,
        explanation: '管理费用-工资薪金增加31,000元。行政管理人员工资与7月持平。' },
      { subjectCode: '6601', summary: '计提8月销售工资', debit: 42000, credit: 0,
        explanation: '销售费用增加42,000元。销售人员工资比7月增加1,000元，销售业绩增长带动绩效奖金提升。' },
      { subjectCode: '221101', summary: '计提8月工资', debit: 0, credit: 73000,
        explanation: '应付职工薪酬-工资增加73,000元。员工8月已提供劳动，但工资9月才发，月末确认一笔负债。' },
    ],
    documents: [
      { type: 'text', label: '工资汇总表', docTitle: '2026年8月工资汇总表', stampText: '人力资源部\n工资专用章', signature: '制表：王出纳  审核：李会计  批准：赵总',
        content: `部门      人数    基本工资    绩效工资    应发合计
─────────────────────────────────
行政部      5     18,000     13,000     31,000
销售部      8     22,000     20,000     42,000
─────────────────────────────────
合  计     13     40,000     33,000     73,000` },
    ],
  },
  {
    date: '2026-08-25',
    title: '计提8月社保及公积金个人部分',
    tags: ["工资社保"],
    difficulty: 2,
    description: '从8月应发工资73,000元中代扣社保个人部分 7,300元、公积金个人部分 3,650元，合计 10,950元。',
    tip: '工资微增后代扣金额相应增加。代扣后应付职工薪酬余额=73,000-10,950=62,050元。',
    entries: [
      { subjectCode: '221101', summary: '代扣社保个人部分', debit: 7300, credit: 0,
        explanation: '应付职工薪酬减少7,300元。从应发工资73,000中扣出社保个人部分（工资的10%）。' },
      { subjectCode: '221101', summary: '代扣公积金个人部分', debit: 3650, credit: 0,
        explanation: '再扣3,650元公积金。两次扣除后应付职工薪酬余额=73,000-10,950=62,050元。' },
      { subjectCode: '224101', summary: '代扣社保个人部分', debit: 0, credit: 7300,
        explanation: '其他应付款-社保增加7,300元。从工资扣下的社保个人部分暂由企业保管。' },
      { subjectCode: '224102', summary: '代扣公积金个人部分', debit: 0, credit: 3650,
        explanation: '其他应付款-公积金增加3,650元。代扣的公积金暂挂，下月缴纳时冲减。' },
    ],
    documents: [
      { type: 'text', label: '代扣明细表', docTitle: '2026年8月工资代扣明细', stampText: '人力资源部\n工资专用章',
        content: `代扣社保个人部分：7,300.00
其中：养老保险 5,840  医疗保险 1,095  失业保险 365

代扣公积金个人部分：3,650.00

合计代扣：10,950.00` },
    ],
  },
  {
    date: '2026-08-28',
    title: '缴纳8月社保费（单位部分）',
    tags: ["工资社保"],
    difficulty: 1,
    description: '缴纳本月社会保险费 21,000元（单位部分），以银行存款支付。工资增长后社保基数相应调整。',
    tip: '社保单位部分当月缴纳。8月工资总额73,000元，社保单位部分约为工资的28.8%，取整21,000元。',
    entries: [
      { subjectCode: '221102', summary: '缴纳8月社保单位部分', debit: 21000, credit: 0,
        explanation: '应付职工薪酬-社保减少21,000元。单位部分在月末计提时已计入费用，现在实际缴纳只是清偿负债。' },
      { subjectCode: '100201', summary: '缴纳8月社保', debit: 0, credit: 21000,
        explanation: '银行存款减少21,000元。社保费各险种合计约为工资总额的28%。' , cashFlowItem: 'cf-op3', cashFlowExplanation: '支付职工薪酬相关支出（配对科目221102），属于"支付给职工以及为职工支付的现金"——经营活动现金流出。'},
    ],
    documents: [
      { type: 'receipt', label: '社保缴费单', docTitle: '社会保险费缴费通知单', date: '2026-08-28', totalAmount: 21000, payer: '本公司', stampText: 'XX市社保\n征缴章',
        items: [
          { name: '养老保险（8月）', qty: 1, price: 14000, amount: 14000 },
          { name: '医疗保险（8月）', qty: 1, price: 4600, amount: 4600 },
          { name: '失业保险（8月）', qty: 1, price: 1400, amount: 1400 },
          { name: '工伤保险（8月）', qty: 1, price: 550, amount: 550 },
          { name: '生育保险（8月）', qty: 1, price: 450, amount: 450 },
        ] },
    ],
  },
  {
    date: '2026-08-28',
    title: '缴纳8月公积金（单位部分）',
    tags: ["工资社保"],
    difficulty: 1,
    description: '缴纳本月住房公积金 10,200元（单位部分），以银行存款支付。',
    tip: '公积金单位部分当月缴纳。8月工资微增，公积金单位部分从7月的10,000元增至10,200元。',
    entries: [
      { subjectCode: '221103', summary: '缴纳8月公积金单位部分', debit: 10200, credit: 0,
        explanation: '应付职工薪酬-公积金减少10,200元。之前计提的公积金负债现在实际缴纳。' },
      { subjectCode: '100201', summary: '缴纳8月公积金', debit: 0, credit: 10200,
        explanation: '银行存款减少10,200元。公积金单位缴存比例约为工资的14%。' , cashFlowItem: 'cf-op3', cashFlowExplanation: '支付职工薪酬相关支出（配对科目221103），属于"支付给职工以及为职工支付的现金"——经营活动现金流出。'},
    ],
    documents: [
      { type: 'receipt', label: '公积金汇缴书', docTitle: '住房公积金汇缴书', date: '2026-08-28', totalAmount: 10200, payer: '本公司', stampText: 'XX市公积金\n管理中心\n业务专用章',
        items: [{ name: '单位缴存（8月）', qty: 14, price: 728.57, amount: 10200 }] },
    ],
  },
  {
    date: '2026-08-29',
    title: '计提应收账款坏账准备',
    tags: ["资产"],
    difficulty: 2,
    description: '月末按应收账款余额的5%计提坏账准备。当前应收账款余额约 113,000元（癸公司赊销款），应计提 5,650元。',
    tip: '坏账准备按月补提。7月底累计坏账准备24,470元，8月新增癸公司赊销款113,000元（辛公司90,400元已收回），应补提5,650元。注意：坏账准备余额随着应收账款的增减而变化。',
    entries: [
      { subjectCode: '6701', summary: '计提坏账准备', debit: 5650, credit: 0,
        explanation: '资产减值损失增加5,650元。按应收账款余额113,000×5%计提。辛公司货款已收回，应收账款余额从90,400变为113,000元（癸公司新赊销款）。' },
      { subjectCode: '1231', summary: '计提坏账准备', debit: 0, credit: 5650,
        explanation: '坏账准备增加5,650元。累计坏账准备=24,470+5,650=30,120元。应收账款净额=113,000-30,120=82,880元。' },
    ],
    documents: [
      { type: 'text', label: '坏账计算表', docTitle: '2026年8月坏账准备计提表', stampText: '财务管理章',
        content: `应收账款余额：
应收账款-癸公司：113,000（8月赊销新增）
其他：0

应收账款余额合计：约113,000元
计提比例：5%
应计提：5,650元
累计坏账准备：24,470（7月）+5,650（8月）=30,120元

依据：《企业会计准则第13号——或有事项》` },
    ],
  },
  {
    date: '2026-08-29',
    title: '固定资产减值测试 ⭐',
    tags: ["资产"],
    difficulty: 3,
    description: '年末对一台机器设备进行减值测试。该设备账面价值85,000元，由于技术更新，可回收金额评估为80,000元，应计提固定资产减值准备 5,000元。',
    tip: '固定资产减值是新概念！当资产的可回收金额（公允价值减处置费用与未来现金流现值孰高）低于账面价值时，需要计提减值准备。分录：借"资产减值损失"，贷"固定资产减值准备"。注意：固定资产减值准备一经计提，在以后期间不得转回（与坏账准备不同）。这是为了防止企业通过减值转回操纵利润。',
    entries: [
      { subjectCode: '6701', summary: '计提固定资产减值准备', debit: 5000, credit: 0,
        explanation: '为什么借"资产减值损失"5,000元？当固定资产的可回收金额（80,000元）低于账面价值（85,000元）时，差额5,000元即为减值损失。资产减值准备体现了谨慎性原则——不高估资产价值。注意：与坏账准备不同，固定资产减值准备一旦计提不得转回。' },
      { subjectCode: '1603', summary: '固定资产减值准备', debit: 0, credit: 5000,
        explanation: '为什么贷"固定资产减值准备"5,000元？固定资产减值准备是固定资产的抵减科目，在资产负债表上以"固定资产原值-累计折旧-固定资产减值准备"的净额列示。计提后固定资产账面价值=85,000-5,000=80,000元。注意：计提减值后，以后年度的折旧额需要重新计算。' },
    ],
    documents: [
      { type: 'text', label: '减值测试表', docTitle: '固定资产减值测试报告（2026年8月）', stampText: '财务管理章', signature: '测试人：李会计  复核：赵主管  审批：赵总',
        content: `资产名称：数控机床（设备编号：JQ-003）
资产类别：机器设备

账面价值：85,000.00元
  原值：120,000.00元
  累计折旧：35,000.00元
  账面净值：85,000.00元

可回收金额评估：80,000.00元
  评估方法：公允价值减处置费用
  依据：同类设备市场报价下跌，技术更新导致

减值金额：85,000 - 80,000 = 5,000.00元

处理意见：计提固定资产减值准备5,000元
依据：《企业会计准则第8号——资产减值》
注意：固定资产减值准备一经计提，不得转回。` },
      { type: 'text', label: '市场报价', docTitle: '设备市场询价记录', stampText: '采购部\n询价专用章',
        content: `询价日期：2026年8月28日
设备型号：同类型数控机床

供应商A报价：82,000.00元
供应商B报价：79,000.00元
供应商C报价：80,000.00元
平均可回收金额：约80,000.00元

结论：由于新一代设备上市，现有型号市场价值下降
建议计提减值准备。` },
    ],
  },
  {
    date: '2026-08-30',
    title: '计提8月城建税及教育费附加',
    tags: ["税费"],
    difficulty: 2,
    description: '本月应纳增值税 = 销项税额（28,600+13,000）- 进项税额（4,550）= 37,050元。计提城建税（7%）2,593.50元和教育费附加（3%）1,111.50元，合计 3,705元。',
    tip: '每月末计算应纳增值税，再以此为基数计提城建税和附加。8月进项包含采购H材料的4,550元。城建税和教育费附加合计3,705元。',
    entries: [
      { subjectCode: '6403', summary: '计提城建税（37,050×7%）', debit: 2593.50, credit: 0,
        explanation: '税金及附加增加2,593.50元。城建税=37,050×7%=2,593.50元。以应纳增值税为基数计算。' },
      { subjectCode: '6403', summary: '计提教育费附加（37,050×3%）', debit: 1111.50, credit: 0,
        explanation: '税金及附加增加1,111.50元。教育费附加=37,050×3%=1,111.50元。两项合计3,705元。' },
      { subjectCode: '222103', summary: '应交城建税', debit: 0, credit: 2593.50,
        explanation: '应交税费-应交城建税增加2,593.50元。本月计提的城建税下月缴纳，形成短期负债。' },
      { subjectCode: '222104', summary: '应交教育费附加', debit: 0, credit: 1111.50,
        explanation: '应交税费-应交教育费附加增加1,111.50元。这两笔税款将在9月初缴纳。' },
    ],
    documents: [
      { type: 'text', label: '税费计算表', docTitle: '2026年8月税费计提计算表', stampText: '财务专用章', signature: '制表：李会计  审核：赵主管',
        content: `增值税计算：
销项税额：28,600（己公司现销）+ 13,000（癸公司赊销）= 41,600
进项税额：4,550（采购H材料）
应纳增值税：41,600 - 4,550 = 37,050.00

附加税费：
城建税：37,050 × 7% = 2,593.50
教育费附加：37,050 × 3% = 1,111.50
合计：3,705.00` },
    ],
  },
  {
    date: '2026-08-31',
    title: '月末结转·期间损益',
    tags: ["期末"],
    difficulty: 3,
    description: '月末将各损益类科目余额结转至"本年利润"。本月营业收入 320,000元、投资收益 104.17元，各项费用合计 249,798.75元，本月净利润 70,305.42元。',
    tip: '月末期间损益结转——8月收入创下新高（320,000元），净利润突破7万元（70,305.42元）。本月首次出现固定资产减值损失（5,000元），这是非日常但合理的事项。注意：固定资产减值准备一经计提不得转回，在利润表中以"资产减值损失"列示。',
    entries: [
      { subjectCode: '6001', summary: '结转主营业务收入', debit: 320000, credit: 0,
        explanation: '主营业务收入转出320,000元（现销220,000+赊销100,000）。8月创下收入新高！改扩建完成使产能提升，助力销售增长。' },
      { subjectCode: '6111', summary: '结转投资收益', debit: 104.17, credit: 0,
        explanation: '投资收益转出104.17元（国债利息收入）。投资收益是营业利润的组成部分。' },
      { subjectCode: '4103', summary: '结转本月净利润', debit: 0, credit: 70305.42,
        explanation: '本年利润贷方70,305.42元表示本月净利润。计算：收入320,104.17-费用249,798.75=70,305.42元。8月净利润创下H2新高！主营业务增长和成本控制效果显著。本年利润累计余额=H1约223,817+7月62,110.42+8月70,305.42≈356,232.84元。年末一次性结转至利润分配。' },
      { subjectCode: '660202', summary: '结转管理费用-差旅费', debit: 0, credit: 3000,
        explanation: '差旅费3,000元。平时在借方，结转时从贷方转出，余额归零。' },
      { subjectCode: '6602', summary: '结转管理费用（水电/折旧/摊销/办公）', debit: 0, credit: 9900,
        explanation: '管理费用合计9,900元=水电5,200+折旧2,000+摊销2,000+办公费700。各项明细余额归零。' },
      { subjectCode: '660203', summary: '结转管理费用-工资', debit: 0, credit: 31000,
        explanation: '管理费用-工资31,000元（行政管理人员8月工资）。' },
      { subjectCode: '6601', summary: '结转销售费用-工资', debit: 0, credit: 42000,
        explanation: '销售费用-工资42,000元（销售人员8月工资，含业绩增长带来的绩效奖金）。' },
      { subjectCode: '660101', summary: '结转销售费用-广告费', debit: 0, credit: 9000,
        explanation: '广告费9,000元。8月推广费与7月持平，持续为旺季蓄力。' },
      { subjectCode: '6401', summary: '结转主营业务成本', debit: 0, credit: 140000,
        explanation: '主营业务成本140,000元。A产品100件×400元/件=40,000（赊销癸公司）+ B产品176件×500元/件=88,000（现销己公司）+ 其他成本调整12,000=140,000元。收入320,000-成本140,000=毛利180,000元，毛利率56.25%。' },
      { subjectCode: '6403', summary: '结转税金及附加', debit: 0, credit: 3705,
        explanation: '税金及附加3,705元=城建税2,593.50+教育费附加1,111.50。以本月应交增值税37,050元为基数计提。' },
      { subjectCode: '6603', summary: '结转财务费用（利息支出）', debit: 0, credit: 543.75,
        explanation: '财务费用543.75元（短期借款利息计提）。Q3累计利息已1,087.50元，将在9月末按季支付。' },
      { subjectCode: '6701', summary: '结转资产减值损失（坏账+固资减值）', debit: 0, credit: 10650,
        explanation: '资产减值损失10,650元=坏账准备5,650+固定资产减值5,000。注意：这是首次出现固定资产减值准备。两项减值都计入"资产减值损失"科目。固定资产减值一经计提不得转回。' },
    ],
    documents: [
      { type: 'text', label: '结转计算表', docTitle: '2026年8月期间损益结转表', stampText: '已结转', signature: '制表：李会计  审核：赵主管  财务负责人：赵总',
        content: `收入类：
  主营业务收入（贷）          320,000.00
  投资收益（贷）                  104.17
  收入合计：320,104.17

费用类：
  管理费用-差旅费               3,000.00
  管理费用-其他                 9,900.00
  管理费用-工资                31,000.00
  销售费用-工资                42,000.00
  销售费用-广告费               9,000.00
  主营业务成本                140,000.00
  税金及附加                    3,705.00
  财务费用                       543.75
  资产减值损失                 10,650.00
─────────────────────────────────────
  费用合计：249,798.75

本月净利润：320,104.17 - 249,798.75 = 70,305.42

🎉 8月净利润70,305.42元，创H2新高！
本年累计净利润约356,232.84元

本月新增业务：固定资产减值准备（5,000元）` },
    ],
  },
  /* ═══════════════════════════════════════════════
     出纳教学任务（票据贴现专题）
     新增17个出纳任务，围绕票据贴现+日常收支
     ═══════════════════════════════════════════════ */

  {
    date: '2026-08-01', title: '月初库存现金清点与日记账启用',
    tags: ["出纳"], difficulty: 1, role: 'cashier',
    description: '8月第一天，出纳清点库存现金 3,200元，与现金日记账期初余额一致，启用8月份账页。',
    tip: '8月持续高温，注意防暑降温，确保现金保管安全。', entries: [],
    documents: [{ type: 'text', label: '现金日记账', docTitle: '现金日记账（8月）', stampText: '现金日记账',
      content: `8月期初余额：3,200.00\n核对人：王出纳` }],
  },
  {
    date: '2026-08-02', title: '提取备用金（现金支票）',
    tags: ["出纳"], difficulty: 1, role: 'cashier',
    description: '签发现金支票提取 3,000元备用金。现金支票号码：XJ202608001。',
    tip: '暑期办公正常进行，备用金按需补充。',
    entries: [
      { subjectCode: '1001', summary: '提取备用金', debit: 3000, credit: 0, explanation: '库存现金增加。' },
      { subjectCode: '100201', summary: '提取备用金', debit: 0, credit: 3000, explanation: '银行存款减少。' },
    ],
    documents: [{ type: 'bank', label: '现金支票存根', date: '2026-08-02', totalAmount: 3000, payer: '本公司', payeeName: '本公司', content: '提取备用金', refNo: 'XJ202608001' }],
  },
  {
    date: '2026-08-04', title: '银行回单月初整理',
    tags: ["出纳"], difficulty: 1, role: 'cashier',
    description: '整理8月初银行回单，包括缴税回单等，逐笔核对后归档。',
    tip: '月初回单整理延续好习惯。', entries: [],
    documents: [{ type: 'text', label: '回单清单', docTitle: '回单整理清单（8月第1周）', stampText: '财务专用章',
      content: `8月第1周回单：共4笔，合计38,750元。\n整理人：王出纳` }],
  },
  {
    date: '2026-08-06', title: '银行代扣社保缴费确认',
    tags: ["出纳","工资社保"], difficulty: 2, role: 'cashier',
    description: '8月份社保费（单位21,000+个人7,000=28,000元）已代扣。',
    tip: '社保按时扣缴。8月缴费基数可能与上月相同，出纳需核对。',
    entries: [
      { subjectCode: '221102', summary: '社保单位', debit: 21000, credit: 0, explanation: '应付职工薪酬-社保减少。' },
      { subjectCode: '224101', summary: '社保个人', debit: 7000, credit: 0, explanation: '其他应付款-社保减少。' },
      { subjectCode: '100201', summary: '缴纳社保', debit: 0, credit: 28000, explanation: '银行存款减少。' , cashFlowItem: 'cf-op3', cashFlowExplanation: '支付职工薪酬相关支出（配对科目221102），属于"支付给职工以及为职工支付的现金"——经营活动现金流出。'},
    ],
    documents: [{ type: 'bank', label: '社保扣款回单', date: '2026-08-06', totalAmount: 28000, payer: '本公司', payeeName: 'XX市社保局', content: '8月社保费', refNo: 'HD202608060005' }],
  },
  {
    date: '2026-08-07', title: '银行转账支付网络费',
    tags: ["出纳","费用"], difficulty: 1, role: 'cashier',
    description: '支付8月份网络费 2,600元。',
    tip: '支付月度固定费用，保留发票。',
    entries: [
      { subjectCode: '6602', summary: '网络费', debit: 2600, credit: 0, explanation: '管理费用增加。' },
      { subjectCode: '100201', summary: '网络费', debit: 0, credit: 2600, explanation: '银行存款减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6602），属于"支付其他与经营活动有关的现金"。'},
    ],
    documents: [{ type: 'bank', label: '转账回单', date: '2026-08-07', totalAmount: 2600, payer: '本公司', payeeName: '中国电信', content: '8月网络费', refNo: 'HD202608070008' }],
  },
  {
    date: '2026-08-09', title: '办理票据贴现 ⭐',
    tags: ["出纳","融资"], difficulty: 2, role: 'cashier',
    description: '持有一张未到期的银行承兑汇票（面额100,000元，剩余期限2个月），前往工商银行办理贴现。银行贴现率4.8%，贴现息=100,000×4.8%÷12×2=800元，实际到账99,200元。',
    tip: '票据贴现是出纳需要掌握的重要融资方式。贴现息=票面金额×贴现率÷12×剩余月数。出纳需填写贴现凭证，银行审核后扣除贴现息将余额转入账户。贴现后如汇票到期不能兑付，银行有权向企业追索。',
    entries: [
      { subjectCode: '100201', summary: '票据贴现到账', debit: 99200, credit: 0, explanation: '银行存款增加99,200元。贴现票款扣除贴现息后到账。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目1121），属于经营活动现金流入——主营业务产生的现金收入。'},
      { subjectCode: '6603', summary: '贴现息支出', debit: 800, credit: 0, explanation: '财务费用-贴现息增加800元。贴现息=100,000×4.8%÷12×2=800元，计入融资成本。' },
      { subjectCode: '1121', summary: '转销贴现票据', debit: 0, credit: 100000, explanation: '应收票据减少100,000元。已贴现票据转销，票据权利转移给银行。' },
    ],
    documents: [
      { type: 'bank', label: '贴现凭证', date: '2026-08-09', totalAmount: 100000, payer: '本公司', payeeName: '中国工商银行', content: '银行承兑汇票贴现', refNo: 'HD202608090012' },
      { type: 'text', label: '贴现计算表', docTitle: '贴现息计算表', stampText: '财务管理章',
        content: `汇票面额：100,000元\n剩余期限：2个月\n贴现率：4.8%（年）\n贴现息=100,000×4.8%÷12×2=800元\n到账金额=100,000-800=99,200元` },
    ],
  },
  {
    date: '2026-08-10', title: '贴现到账确认',
    tags: ["出纳","融资"], difficulty: 1, role: 'cashier',
    description: '确认昨日办理的票据贴现款项99,200元已到账，出纳在票据登记簿中标注"已贴现"并归档汇票复印件。',
    tip: '贴现后出纳需在票据登记簿记录贴现日期、贴现行、贴现率和实收金额。汇票原件由银行收存，出纳保留复印件备查。到期如汇票无法兑付，银行将从企业账户扣回款项。',
    entries: [], documents: [
      { type: 'text', label: '票据登记簿', docTitle: '应收票据登记簿（贴现记录）', stampText: '财务专用章',
        content: `票据号码：HC202606090001\n金额：100,000元\n贴现日：2026-08-09\n贴现息：800元\n实收：99,200元\n状态：已贴现✓` },
    ],
  },
  {
    date: '2026-08-12', title: '银行代扣公积金确认',
    tags: ["出纳","工资社保"], difficulty: 2, role: 'cashier',
    description: '8月公积金（单位10,200+个人3,400=13,600元）已代扣。',
    tip: '公积金按时缴纳，出纳核对金额。',
    entries: [
      { subjectCode: '221103', summary: '公积金单位', debit: 10200, credit: 0, explanation: '应付职工薪酬-公积金减少。' },
      { subjectCode: '224102', summary: '公积金个人', debit: 3400, credit: 0, explanation: '其他应付款-公积金减少。' },
      { subjectCode: '100201', summary: '缴纳公积金', debit: 0, credit: 13600, explanation: '银行存款减少。' , cashFlowItem: 'cf-op3', cashFlowExplanation: '支付职工薪酬相关支出（配对科目221103），属于"支付给职工以及为职工支付的现金"——经营活动现金流出。'},
    ],
    documents: [{ type: 'bank', label: '公积金扣款回单', date: '2026-08-12', totalAmount: 13600, payer: '本公司', payeeName: 'XX市公积金中心', content: '8月公积金', refNo: 'HD202608120015' }],
  },
  {
    date: '2026-08-14', title: '银行转账支付快递费',
    tags: ["出纳","费用"], difficulty: 1, role: 'cashier',
    description: '支付8月快递费 600元。',
    tip: '保留快递发票，核对金额。',
    entries: [
      { subjectCode: '6602', summary: '快递费', debit: 600, credit: 0, explanation: '管理费用增加。' },
      { subjectCode: '100201', summary: '快递费', debit: 0, credit: 600, explanation: '银行存款减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6602），属于"支付其他与经营活动有关的现金"。'},
    ],
    documents: [{ type: 'bank', label: '转账回单', date: '2026-08-14', totalAmount: 600, payer: '本公司', payeeName: '顺丰速运', content: '8月快递费', refNo: 'HD202608140018' }],
  },
  {
    date: '2026-08-19', title: '购买转账支票本',
    tags: ["出纳"], difficulty: 1, role: 'cashier',
    description: '购买转账支票本（25张），45元。新号码段：ZZ1200456926~ZZ1200456950。',
    tip: '购买后及时登记支票登记簿。',
    entries: [
      { subjectCode: '6603', summary: '支票本', debit: 45, credit: 0, explanation: '财务费用增加。' },
      { subjectCode: '100201', summary: '支票本', debit: 0, credit: 45, explanation: '银行存款减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6603），属于"支付其他与经营活动有关的现金"。'},
    ],
    documents: [{ type: 'bank', label: '收费回单', date: '2026-08-19', totalAmount: 45, payer: '本公司', payeeName: '中国工商银行', content: '购买支票本', refNo: 'HD202608190020' }],
  },
  {
    date: '2026-08-22', title: '出纳资金日报编制',
    tags: ["出纳"], difficulty: 1, role: 'cashier',
    description: '编制8月22日资金日报表。',
    tip: '坚持资金日报。', entries: [],
    documents: [{ type: 'text', label: '资金日报表', docTitle: '资金日报表（8月22日）', stampText: '现金日记账',
      content: `库存现金：4,800    银行存款：687,720.92\n备注：本日无变动` }],
  },
  {
    date: '2026-08-23', title: '银行转账支付清洁费',
    tags: ["出纳","费用"], difficulty: 1, role: 'cashier',
    description: '支付8月清洁服务费 1,800元。',
    tip: '核对发票与合同金额。',
    entries: [
      { subjectCode: '6602', summary: '清洁费', debit: 1800, credit: 0, explanation: '管理费用增加。' },
      { subjectCode: '100201', summary: '清洁费', debit: 0, credit: 1800, explanation: '银行存款减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6602），属于"支付其他与经营活动有关的现金"。'},
    ],
    documents: [{ type: 'bank', label: '转账回单', date: '2026-08-23', totalAmount: 1800, payer: '本公司', payeeName: 'XX物业', content: '8月清洁费', refNo: 'HD202608230022' }],
  },
  {
    date: '2026-08-25', title: '银行账户管理费确认',
    tags: ["出纳","费用"], difficulty: 1, role: 'cashier',
    description: '8月账户管理费100元已扣。累计已支付800元（1-8月）。',
    tip: '每月固定扣款，核对金额即可。',
    entries: [
      { subjectCode: '6603', summary: '管理费', debit: 100, credit: 0, explanation: '财务费用增加。' },
      { subjectCode: '100201', summary: '管理费', debit: 0, credit: 100, explanation: '银行存款减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6603），属于"支付其他与经营活动有关的现金"。'},
    ],
    documents: [{ type: 'bank', label: '扣款回单', date: '2026-08-25', totalAmount: 100, payer: '本公司', payeeName: '中国工商银行', content: '8月管理费', refNo: 'HD202608250025' }],
  },
  {
    date: '2026-08-26', title: '银行手续费确认',
    tags: ["出纳","费用"], difficulty: 1, role: 'cashier',
    description: '8月银行手续费合计 200元。',
    tip: '核对当月转账笔数估算手续费。',
    entries: [
      { subjectCode: '6603', summary: '手续费', debit: 200, credit: 0, explanation: '财务费用增加。' },
      { subjectCode: '100201', summary: '手续费', debit: 0, credit: 200, explanation: '银行存款减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6603），属于"支付其他与经营活动有关的现金"。'},
    ],
    documents: [{ type: 'bank', label: '手续费回单', date: '2026-08-26', totalAmount: 200, payer: '本公司', payeeName: '中国工商银行', content: '8月手续费', refNo: 'HD202608260028' }],
  },
  {
    date: '2026-08-28', title: '银行转账支付培训费',
    tags: ["出纳","费用"], difficulty: 1, role: 'cashier',
    description: '支付8月员工培训费 2,800元。',
    tip: '培训费计入管理费用，核对合同。',
    entries: [
      { subjectCode: '6602', summary: '培训费', debit: 2800, credit: 0, explanation: '管理费用增加。' },
      { subjectCode: '100201', summary: '培训费', debit: 0, credit: 2800, explanation: '银行存款减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6602），属于"支付其他与经营活动有关的现金"。'},
    ],
    documents: [{ type: 'bank', label: '转账回单', date: '2026-08-28', totalAmount: 2800, payer: '本公司', payeeName: 'XX培训机构', content: '8月培训费', refNo: 'HD202608280030' }],
  },
  {
    date: '2026-08-29', title: '票据月末盘点',
    tags: ["出纳"], difficulty: 1, role: 'cashier',
    description: '月末票据盘点。应收票据：0张（已贴现）。应付票据：1张（40,000元，10月到期）。',
    tip: '关注即将到期的应付票据，提前安排备付资金。',
    entries: [], documents: [
      { type: 'text', label: '票据盘点表', docTitle: '票据月末盘点表（8月）', stampText: '财务专用章',
        content: `应收票据：0张（8月已贴现）\n应付票据：1张（40,000元，10-08到期）\n差异：0 ✓` },
    ],
  },
  {
    date: '2026-08-30', title: '银行转账支付印刷费',
    tags: ["出纳","费用"], difficulty: 1, role: 'cashier',
    description: '支付8月宣传资料印刷费 1,500元。',
    tip: '核对印刷品验收单与发票。',
    entries: [
      { subjectCode: '6602', summary: '印刷费', debit: 1500, credit: 0, explanation: '管理费用增加。' },
      { subjectCode: '100201', summary: '印刷费', debit: 0, credit: 1500, explanation: '银行存款减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6602），属于"支付其他与经营活动有关的现金"。'},
    ],
    documents: [{ type: 'bank', label: '转账回单', date: '2026-08-30', totalAmount: 1500, payer: '本公司', payeeName: 'XX彩印厂', content: '8月印刷费', refNo: 'HD202608300032' }],
  },
  /* ═══════════════════════════════════════════════
     会计教学审计批次4新增：销售场景补充
     ═══════════════════════════════════════════════ */
  {
    date: '2026-08-28',
    title: '混合销售——兼营不同税率 ⭐',
    tags: ["销售"],
    difficulty: 2,
    description: '向乙公司销售A产品80,000元（税率13%）并提供安装服务10,000元（税率9%），合计90,000元（不含税），增值税合计11,300元（80,000×13%+10,000×9%），款项已存入工商银行。',
    tip: '混合销售中兼营不同税率的业务，应分别核算销售额并按各自税率计算增值税。未分别核算的从高适用税率。分录：借：银行存款，贷：主营业务收入（货物）、其他业务收入（服务）、应交税费（分别核算）。',
    entries: [
      { subjectCode: '100201', summary: '混合销售收款（货物+安装）', debit: 101300, credit: 0, explanation: '银行存款增加记借方。含税总额=货款90,000+增值税11,300=101,300元。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入——主营业务产生的现金收入。'},
      { subjectCode: '6001', summary: 'A产品销售收入', debit: 0, credit: 80000, explanation: '主营业务收入增加记贷方。货物销售80,000元按13%税率。' },
      { subjectCode: '6051', summary: '安装服务收入', debit: 0, credit: 10000, explanation: '其他业务收入增加记贷方。安装服务10,000元按9%税率。注意：兼营不同税率的业务应分别核算，否则从高适用13%税率。' },
      { subjectCode: '222101', summary: '销项税额（货物+服务）', debit: 0, credit: 11300, explanation: '销项税额增加记贷方。货物销售80,000×13%=10,400元，安装服务10,000×9%=900元，合计11,300元。' },
    ],
    documents: [
      { type: 'invoice', label: '增值税发票', region: '广东', invoiceType: '专用', copy: '发票联', invoiceNo: '4400812345', date: '2026年08月28日', buyer: '乙公司', buyerTaxId: '91440101MA5XXXXXXXX', seller: '本公司', sellerTaxId: '91440101MA3XXXXXXXX', stampText: '国家税务总局\n发票专用章',
        lineItems: [
          { name: 'A产品（销售）', unit: '件', qty: 100, price: 800, amount: 80000, taxRate: '13%', tax: 10400 },
          { name: '安装服务', unit: '项', qty: 1, price: 10000, amount: 10000, taxRate: '9%', tax: 900 },
        ], totalAmount: 101300 },
      { type: 'bank', label: '银行回单', date: '2026-08-28', totalAmount: 101300, payer: '乙公司', payeeName: '本公司', content: '购买A产品含安装服务', refNo: 'HD202608280030' },
    ],
  },
  {
    date: '2026-08-29',
    title: '附有销售退回条款的销售 ⭐',
    tags: ["销售"],
    difficulty: 3,
    description: '向新客户销售A产品200件，单价500元/件（不含税），总价款100,000元，增值税13,000元，款项已存入银行。合同约定不满意可30天内退货，根据历史经验预估退货率5%。',
    tip: '附有销售退回条款的销售，在客户取得商品控制权时，按预期有权收取的对价确认收入（即扣除预估退货部分），预估退货部分确认为"预计负债"。分录：借：银行存款（全额），贷：主营业务收入（扣除退货部分）、预计负债（退货部分）、应交税费（全额销项税）。',
    entries: [
      { subjectCode: '100201', summary: '附退回条款销售收款', debit: 113000, credit: 0, explanation: '银行存款增加记借方。收到全额货款113,000元（含税），款项已存入银行。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入——主营业务产生的现金收入。'},
      { subjectCode: '6001', summary: '销售收入（扣除预估退货）', debit: 0, credit: 95000, explanation: '主营业务收入增加记贷方。扣除5%预估退货后确认收入=100,000-100,000×5%=95,000元。' },
      { subjectCode: '2801', summary: '预估退货义务', debit: 0, credit: 5000, explanation: '预计负债增加记贷方。预估退货部分5,000元暂不计入收入，作为预计负债核算。根据《企业会计准则第14号——收入》，附退回条款的销售应合理估计退货率。' },
      { subjectCode: '222101', summary: '全额销项税额', debit: 0, credit: 13000, explanation: '销项税额增加记贷方。增值税按全额13,000元计算，不因预估退货而减少（退货实际发生时再冲减）。' },
    ],
    documents: [
      { type: 'text', label: '销售合同', docTitle: '销售合同（附退回条款）', date: '2026-08-25', stampText: '合同专用章',
        content: `甲方（卖方）：本公司
乙方（买方）：新客户（戊公司）

商品：A产品 200件
单价：500.00元/件
总价：100,000.00元（不含税）
增值税：13,000.00元

退货条款：客户可在收货后30天内无理由退货
历史退货率：约5%
预估退货：200×5%=10件，5,000元` },
      { type: 'bank', label: '银行回单', date: '2026-08-29', totalAmount: 113000, payer: '戊公司', payeeName: '本公司', content: '购买A产品（附退回条款）', refNo: 'HD202608290032' },
    ],
  },

  {
    date: '2026-08-31',
    title: '月末·银行存款余额核对',
    tags: ["出纳","期末"],
    difficulty: 1,
    role: 'cashier',
    description: '月末核对工商银行存款日记账余额与银行对账单是否一致。本月业务量大且新增固定资产减值等新业务，需仔细逐笔勾对。',
    tip: '每月末必做的银行对账工作。8月引进了固定资产减值新概念。出纳需逐笔勾对银行日记账和对账单，特别注意改扩建完工转固（不涉及银行流水，需核对台账）和固定资产减值（纯会计调整，不影响银行账）的记录是否正确。',
    entries: [],
    documents: [
      { type: 'text', label: '银行对账单', docTitle: '银行对账单（2026年8月）', stampText: '中国工商银行\n电子业务\n专用章',
        content: `中国工商银行 对账单

账户：6222 0200 **** 1234
户名：本公司

日期      摘要                 收入         支出        余额
──────────────────────────────────────────────
08-01     期初余额                                    586,170.92
08-03     缴纳7月增值税                     32,500    553,670.92
08-03     缴纳城建税                        2,275    551,395.92
08-03     缴纳教育费附加                      975    550,420.92
08-05     发放7月工资                      59,200    491,220.92
08-05     缴纳社保公积金                   10,800    480,420.92
08-05     缴纳个税                          2,000    478,420.92
08-11     采购H材料                        39,550    438,870.92
08-12     销售B产品收款   248,600.00                  687,470.92
08-13     收辛公司货款     90,400.00                  777,870.92
08-14     支付维修费                        1,500    776,370.92
08-17     支付子公司款                     39,550    736,820.92
08-18     报销差旅费                        3,000    733,820.92
08-18     支付水电费                        5,200    728,620.92
08-19     购买办公用品                        700    727,920.92
08-20     支付推广费                        9,000    718,920.92
08-28     缴纳社保                         21,000    697,920.92
08-28     缴纳公积金                       10,200    687,720.92
──────────────────────────────────────────────
期末余额：¥687,720.92` },
      { type: 'text', label: '余额调节表', docTitle: '银行存款余额调节表（2026年8月）',
        content: `账户：工商银行 6222 0200 **** 1234
编制日期：2026年8月31日

                             金额
────────────────────────────
企业日记账余额：_______（需填入）
加：银行已收、企业未收        _______
减：银行已付、企业未付        _______
调节后余额：_______

银行对账单余额：687,720.92
加：企业已收、银行未收        _______
减：企业已付、银行未付        _______
调节后余额：_______

提示：本月改扩建完工转固不涉及银行流水
固定资产减值准备是会计调整，不影响银行账
请逐笔核对确保入账正确` },
    ],
  },
]

export default aug
