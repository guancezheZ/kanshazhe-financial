/**
 * 商业企业（商品流通企业）1月教学任务
 *
 * 行业特征：纯进销存，无生产成本核算
 * 企业类型：一般纳税人（增值税13%）
 * 知识点标签：商品采购、商品销售、仓存管理、往来管理、资金管理、费用管理、工资社保、税费、期末、出纳
 *
 * 会计准则依据：
 * - 《企业会计准则第14号——收入》（财会[2017]22号）
 * - 《企业会计准则第1号——存货》（财会[2006]3号）
 */

const tasks = [
  // ═══════════════════════════════════════════
  // 第一周：企业设立 + 资金筹集
  // ═══════════════════════════════════════════
  {
    date: '2026-01-02',
    title: '投资者投入资本金',
    tags: ['资金管理'],
    difficulty: 1,
    role: 'accountant',
    description: '公司收到投资者投入资本金1,000,000元，已存入工商银行账户。',
    tip: '企业设立时投资者投入资本是最基本的业务。实收资本是所有者权益类科目，贷方表示增加。注意区分注册资本与实际投入资本。',
    entries: [
      { subjectCode: '100201', summary: '收到投资款', debit: 1000000, credit: 0, explanation: '银行存款增加记借方。企业收到货币资金出资，资产增加。' , cashFlowItem: 'cf-fin3', cashFlowExplanation: '吸收投资收到的现金（配对科目4001），属于筹资活动现金流入——企业通过权益融资获得资金。'},
      { subjectCode: '4001', summary: '收到投资款', debit: 0, credit: 1000000, explanation: '实收资本增加记贷方。投资者投入资本形成企业的永久性资本，所有者权益增加。依据《公司法》第二十八条。' }],
    documents: [
      { type: 'bank', label: '银行回单', date: '2026-01-02', totalAmount: 1000000, payer: '张三（投资者）', payeeName: '本公司', content: '投资款', refNo: 'HD202601020001' },
      { type: 'text', label: '投资协议', docTitle: '股东投资协议', content: '根据公司章程，张三认缴出资1,000,000元，占注册资本100%。经全体股东一致同意，于2026年1月2日足额缴纳。', signature: '全体股东签字' }]},
  {
    date: '2026-01-03',
    title: '借入短期借款',
    tags: ['资金管理'],
    difficulty: 1,
    description: '公司向工商银行借入短期借款500,000元，期限6个月，年利率4.35%，款项已到账。',
    tip: '短期借款是企业向银行借入的期限在1年以内的借款。取得借款时：借：银行存款，贷：短期借款。利息一般在月末计提。',
    entries: [
      { subjectCode: '100201', summary: '取得短期借款', debit: 500000, credit: 0, explanation: '银行存款增加记借方。借款资金到账，企业可动用资金增加。' , cashFlowItem: 'cf-fin', cashFlowExplanation: '借款收到的现金（配对科目2001），属于筹资活动现金流入——企业通过负债融资获得资金。'},
      { subjectCode: '2001', summary: '取得短期借款', debit: 0, credit: 500000, explanation: '短期借款增加记贷方。企业承担了6个月内还本付息的义务，负债增加。' }],
    documents: [
      { type: 'bank', label: '借款回单', date: '2026-01-03', totalAmount: 500000, payer: '工商银行', payeeName: '本公司', content: '短期贷款发放', refNo: 'DK202601030001' },
      { type: 'text', label: '借款合同', docTitle: '流动资金借款合同', content: '借款人向工商银行申请短期流动资金贷款500,000元，年利率4.35%，期限6个月（2026.1.3-2026.7.2），到期一次性还本付息。', stampText: '中国工商银行 合同专用章' }]},
  {
    date: '2026-01-04',
    title: '购买办公用品',
    tags: ['费用管理'],
    difficulty: 1,
    description: '行政部在文具店购买办公用品一批，共计1,200元，以现金支付。',
    tip: '办公用品属于管理费用中的"办公费"。金额较小的日常办公支出直接用现金支付即可。借：管理费用，贷：库存现金。',
    entries: [
      { subjectCode: '660201', summary: '购买办公用品', debit: 1200, credit: 0, explanation: '管理费用-办公费增加记借方。办公用品用于日常行政管理，属于期间费用，计入当期损益。' },
      { subjectCode: '1001', summary: '购买办公用品', debit: 0, credit: 1200, explanation: '库存现金减少记贷方。现金支付办公用品款项，资产减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目660201），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '购物发票', docTitle: '增值税普通发票', date: '2026-01-04', totalAmount: 1200, stampText: 'XX文具店 发票专用章',
        items: [{ name: 'A4打印纸', qty: 5, price: 120, amount: 600 }, { name: '签字笔（盒）', qty: 10, price: 40, amount: 400 }, { name: '文件夹', qty: 20, price: 10, amount: 200 }] }]},
  {
    date: '2026-01-05',
    title: '预付采购定金',
    tags: ['商品采购'],
    difficulty: 2,
    description: '公司与供应商签订购销合同，预付商品采购定金30,000元，通过工商银行转账支付。',
    tip: '预付定金是商业企业常见的采购方式。预付时：借：预付账款，贷：银行存款。待商品到货时再冲减预付账款。定金金额一般不超过合同总价的20%。',
    entries: [
      { subjectCode: '1123', summary: '预付采购定金', debit: 30000, credit: 0, explanation: '预付账款增加记借方。企业预付货款形成对供应商的债权，待收货时冲销。' },
      { subjectCode: '100201', summary: '预付采购定金', debit: 0, credit: 30000, explanation: '银行存款减少记贷方。资金从银行账户划出，资产减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目1123），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '转账回单', date: '2026-01-05', totalAmount: 30000, payer: '本公司', payeeName: '鼎盛贸易有限公司', content: '预付货款（购销合同No.2026001）', refNo: 'HD202601050001' },
      { type: 'text', label: '购销合同', docTitle: '商品购销合同', content: '本公司向鼎盛贸易有限公司采购商品一批，合同总价约75,000元（不含税），预付定金30,000元，余款货到付清。交货日期：2026年1月9日。', stampText: '合同专用章' }]},

  // ═══════════════════════════════════════════
  // 第二周：商品采购
  // ═══════════════════════════════════════════
  {
    date: '2026-01-06',
    title: '采购商品（现购）',
    tags: ['商品采购', '税费'],
    difficulty: 2,
    description: '公司向华强供应链采购商品一批，不含税价30,000元，增值税3,900元，价税合计33,900元，以工商银行存款支付。',
    tip: '商业企业采购商品用于销售，直接计入"库存商品"。作为一般纳税人，取得增值税专用发票的进项税额可以抵扣。借：库存商品/应交税费-进项，贷：银行存款。',
    entries: [
      { subjectCode: '1405', summary: '采购商品入库', debit: 30000, credit: 0, explanation: '库存商品增加记借方。商品采购入库，存货资产增加。商业企业采购商品直接入库待售，无需经过生产环节。' },
      { subjectCode: '222101', summary: '采购商品进项税额', debit: 3900, credit: 0, explanation: '应交税费-应交增值税（进项税额）增加记借方。取得的增值税专用发票上注明的税额可以抵扣销项税。依据《增值税暂行条例》第八条。' },
      { subjectCode: '100201', summary: '支付采购货款', debit: 0, credit: 33900, explanation: '银行存款减少记贷方。支付采购货款及税款，资产减少。' , cashFlowItem: 'cf-op2', cashFlowExplanation: '采购存货/商品支出（配对科目1405），属于"购买商品、接受劳务支付的现金"——经营活动现金流出。'}],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '上海', invoiceNo: '3100234567', date: '2026-01-06', buyer: '本公司', seller: '华强供应链有限公司',
        lineItems: [{ name: 'A类商品', spec: '标准', unit: '件', qty: 300, price: 100, amount: 30000 }],
        totalAmount: 33900, taxRate: '13%', taxAmount: 3900, totalInWords: '叁万叁仟玖佰元整' },
      { type: 'bank', label: '付款回单', date: '2026-01-06', totalAmount: 33900, payer: '本公司', payeeName: '华强供应链有限公司', content: '货款', refNo: 'HD202601060001' }]},
  {
    date: '2026-01-07',
    title: '支付采购运费',
    tags: ['商品采购', '费用管理'],
    difficulty: 2,
    description: '支付上次采购商品的运输费1,000元，以现金支付。',
    tip: '商业企业的采购运费处理与制造业不同——可以直接计入当期"销售费用"，不需要分摊计入库存商品成本。这是商业企业特有的简化处理方式。',
    entries: [
      { subjectCode: '6601', summary: '支付采购运费', debit: 1000, credit: 0, explanation: '销售费用增加记借方。商业企业的采购运费直接计入当期损益（销售费用），无需分摊到库存商品成本。依据《企业会计准则第1号——存货》应用指南，商品流通企业的进货费用金额较小的可直接计入当期损益。' },
      { subjectCode: '1001', summary: '支付采购运费', debit: 0, credit: 1000, explanation: '库存现金减少记贷方。现金支付运费，资产减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6601），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '运费收据', docTitle: '运输业增值税普通发票', date: '2026-01-07', totalAmount: 1000, stampText: 'XX物流公司 发票专用章',
        items: [{ name: '运输费（华强供应链→本公司仓库）', qty: 1, price: 1000, amount: 1000 }] }]},
  {
    date: '2026-01-08',
    title: '采购商品（赊购）',
    tags: ['商品采购', '往来管理'],
    difficulty: 2,
    description: '向鼎盛贸易有限公司采购商品一批，不含税价50,000元，增值税6,500元，货款未付。商品已验收入库。',
    tip: '赊购是指采购商品后暂不付款，形成应付账款。借：库存商品/应交税费-进项，贷：应付账款。应付账款需要在约定的账期内偿还。',
    entries: [
      { subjectCode: '1405', summary: '赊购商品入库', debit: 50000, credit: 0, explanation: '库存商品增加记借方。商品验收入库，存货增加。' },
      { subjectCode: '222101', summary: '赊购商品进项税额', debit: 6500, credit: 0, explanation: '进项税额增加记借方，可抵扣销项税。' },
      { subjectCode: '220201', summary: '赊购商品款未付（丙公司）', debit: 0, credit: 56500, explanation: '应付账款-丙公司增加记贷方。采购商品尚未付款，形成对丙公司的债务。' }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '广东', invoiceNo: '4400567890', date: '2026-01-08', buyer: '本公司', seller: '鼎盛贸易有限公司',
        lineItems: [{ name: 'B类商品', spec: '标准', unit: '件', qty: 500, price: 100, amount: 50000 }],
        totalAmount: 56500, taxRate: '13%', taxAmount: 6500, totalInWords: '伍万陆仟伍佰元整' },
      { type: 'text', label: '入库单', docTitle: '商品入库单', content: 'B类商品 500件 已验收入库，质量合格。经手人：仓库管理员。', signature: '仓库管理员 王强' }]},
  {
    date: '2026-01-09',
    title: '预付款采购到货结算',
    tags: ['商品采购', '往来管理'],
    difficulty: 2,
    description: '上月预付定金的采购到货，商品不含税价45,000元，增值税5,850元。冲销预付定金30,000元后，余款20,850元以银行存款支付。',
    tip: '预付款采购到货时，先冲减预付账款（定金部分），余额用银行存款补付。分录拆分为：库存商品入库、进项税确认、冲预付、补付款。',
    entries: [
      { subjectCode: '1405', summary: '预付款采购到货入库', debit: 45000, credit: 0, explanation: '库存商品增加记借方。预付定金采购的商品到货入库，存货增加。' },
      { subjectCode: '222101', summary: '采购进项税额', debit: 5850, credit: 0, explanation: '进项税额增加，可抵扣销项。' },
      { subjectCode: '1123', summary: '冲销预付定金', debit: 0, credit: 30000, explanation: '预付账款减少记贷方。到货后冲销之前预付的定金，债权减少。' },
      { subjectCode: '100201', summary: '补付采购尾款', debit: 0, credit: 20850, explanation: '银行存款减少记贷方。补付扣除定金后的尾款，资产减少。' , cashFlowItem: 'cf-op2', cashFlowExplanation: '采购存货/商品支出（配对科目1405），属于"购买商品、接受劳务支付的现金"——经营活动现金流出。'}],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '广东', invoiceNo: '4400567891', date: '2026-01-09', buyer: '本公司', seller: '鼎盛贸易有限公司',
        lineItems: [{ name: 'C类商品', spec: '标准', unit: '件', qty: 300, price: 150, amount: 45000 }],
        totalAmount: 50850, taxRate: '13%', taxAmount: 5850, totalInWords: '伍万零捌佰伍拾元整' },
      { type: 'bank', label: '补付尾款回单', date: '2026-01-09', totalAmount: 20850, payer: '本公司', payeeName: '鼎盛贸易有限公司', content: '采购尾款（合同No.2026001）', refNo: 'HD202601090001' }]},

  // ═══════════════════════════════════════════
  // 第三周：商品销售
  // ═══════════════════════════════════════════
  {
    date: '2026-01-10',
    title: '销售商品并收款',
    tags: ['商品销售'],
    difficulty: 2,
    description: '销售A类商品一批，不含税价100,000元，增值税13,000元，价税合计113,000元已收存工商银行。',
    tip: '销售商品确认收入时：借：银行存款，贷：主营业务收入/应交税费-销项。注意增值税销项税额根据不含税收入的13%计算。收入确认需满足《企业会计准则第14号》的五条件。',
    entries: [
      { subjectCode: '100201', summary: '销售商品收款', debit: 113000, credit: 0, explanation: '银行存款增加记借方。销售商品收到款项，资产增加。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入——主营业务产生的现金收入。'},
      { subjectCode: '6001', summary: '销售商品确认收入', debit: 0, credit: 100000, explanation: '主营业务收入增加记贷方。商品销售实现，收入确认。依据《企业会计准则第14号——收入》第四条：企业已将商品所有权上的主要风险和报酬转移给购货方。' },
      { subjectCode: '222101', summary: '增值税销项税额', debit: 0, credit: 13000, explanation: '应交税费-应交增值税（销项税额）增加记贷方。销售商品产生纳税义务，负债增加。' }],
    documents: [
      { type: 'invoice', label: '增值税专用发票（销项）', region: '上海', invoiceNo: '3100234568', date: '2026-01-10', buyer: '鑫源商贸有限公司', seller: '本公司',
        lineItems: [{ name: 'A类商品', spec: '标准', unit: '件', qty: 600, price: 166.67, amount: 100000 }],
        totalAmount: 113000, taxRate: '13%', taxAmount: 13000, totalInWords: '壹拾壹万叁仟元整' },
      { type: 'bank', label: '收款回单', date: '2026-01-10', totalAmount: 113000, payer: '鑫源商贸有限公司', payeeName: '本公司', content: '货款', refNo: 'HD202601100001' }]},
  {
    date: '2026-01-11',
    title: '结转已销商品成本',
    tags: ['商品销售', '仓存管理'],
    difficulty: 2,
    description: '计算并结转本月10日销售商品的成本。该批商品采用移动加权平均法计价，单位成本100元/件，共销售600件，销售成本60,000元。',
    tip: '确认收入的同时必须同步结转成本，遵循配比原则。借：主营业务成本，贷：库存商品。这是商业企业最重要的期末处理之一。',
    entries: [
      { subjectCode: '6401', summary: '结转已销商品成本', debit: 60000, credit: 0, explanation: '主营业务成本增加记借方。与销售收入配比的成本结转，反映销售商品的采购成本。依据《企业会计准则第1号——存货》第十四条：企业应当将已售存货的成本结转为当期损益。' },
      { subjectCode: '1405', summary: '结转已销商品成本', debit: 0, credit: 60000, explanation: '库存商品减少记贷方。商品出库，存货减少。销售成本=销售数量×单位成本=600件×100元=60,000元。' }],
    documents: [
      { type: 'text', label: '成本计算表', docTitle: '商品销售成本计算表', content: '销售商品：A类商品\n销售数量：600件\n单位成本：100元（移动加权平均）\n销售成本：60,000元\n\n计算方法：期初库存0 + 本期入库300件×100元 = 30,000元 ÷ 300件 = 100元/件', stampText: '财务专用章' }]},
  {
    date: '2026-01-12',
    title: '销售商品（赊销）',
    tags: ['商品销售', '往来管理'],
    difficulty: 2,
    description: '向鑫源商贸有限公司赊销B类商品，不含税价80,000元，增值税10,400元，货款未收。',
    tip: '赊销时：借：应收账款，贷：主营业务收入/应交税费-销项。应收账款需跟进催收，避免形成坏账。',
    entries: [
      { subjectCode: '112201', summary: '赊销商品款未收（甲公司）', debit: 90400, credit: 0, explanation: '应收账款-甲公司增加记借方。赊销商品形成对甲公司的债权，需在信用期内催收。' },
      { subjectCode: '6001', summary: '赊销确认收入', debit: 0, credit: 80000, explanation: '主营业务收入增加记贷方。商品已发出，收入条件满足。' },
      { subjectCode: '222101', summary: '赊销增值税销项税额', debit: 0, credit: 10400, explanation: '销项税额增加记贷方。赊销也产生纳税义务，增值税不因未收款而免除。' }],
    documents: [
      { type: 'invoice', label: '增值税专用发票（销项）', region: '上海', invoiceNo: '3100234569', date: '2026-01-12', buyer: '鑫源商贸有限公司', seller: '本公司',
        lineItems: [{ name: 'B类商品', spec: '标准', unit: '件', qty: 400, price: 200, amount: 80000 }],
        totalAmount: 90400, taxRate: '13%', taxAmount: 10400, totalInWords: '玖万零肆佰元整' },
      { type: 'text', label: '出库单', docTitle: '商品出库单', content: 'B类商品 400件 已出库并发货，承运人：顺丰物流。', signature: '仓库管理员 王强' }]},
  {
    date: '2026-01-13',
    title: '结转赊销商品成本',
    tags: ['商品销售', '仓存管理'],
    difficulty: 2,
    description: '结转12日赊销的B类商品成本。B类商品单位成本为120元/件，共销售400件，销售成本48,000元。',
    tip: '赊销也需要同步结转成本，与现销的处理方式相同。配比原则要求收入与成本在同一会计期间确认。',
    entries: [
      { subjectCode: '6401', summary: '结转赊销商品成本', debit: 48000, credit: 0, explanation: '主营业务成本增加记借方。反映赊销商品的采购成本。' },
      { subjectCode: '1405', summary: '结转赊销商品成本', debit: 0, credit: 48000, explanation: '库存商品减少记贷方。B类商品出库，存货减少。销售成本=400件×120元=48,000元。' }],
    documents: [
      { type: 'text', label: '成本计算表', docTitle: '商品销售成本计算表', content: '销售商品：B类商品\n销售数量：400件\n单位成本：120元（移动加权平均）\n销售成本：48,000元', stampText: '财务专用章' }]},
  {
    date: '2026-01-14',
    title: '收到前欠货款',
    tags: ['往来管理'],
    difficulty: 1,
    description: '收到鑫源商贸有限公司汇来的前欠货款90,400元，已存入工商银行账户。',
    tip: '收到前欠货款时：借：银行存款，贷：应收账款。注意分清是哪一笔业务的回款，避免串户。',
    entries: [
      { subjectCode: '100201', summary: '收到前欠货款', debit: 90400, credit: 0, explanation: '银行存款增加记借方。客户偿还前欠货款，资金回笼。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目112201），属于经营活动现金流入——主营业务产生的现金收入。'},
      { subjectCode: '112201', summary: '收到前欠货款（甲公司）', debit: 0, credit: 90400, explanation: '应收账款-甲公司减少记贷方。债权已收回，甲公司欠款结清。' }],
    documents: [
      { type: 'bank', label: '收款回单', date: '2026-01-14', totalAmount: 90400, payer: '鑫源商贸有限公司', payeeName: '本公司', content: '货款（发票No.3100234569）', refNo: 'HD202601140001' }]},
  {
    date: '2026-01-15',
    title: '支付销售运费',
    tags: ['商品销售', '费用管理'],
    difficulty: 1,
    description: '支付本月销售商品发生的运输费2,000元，以银行存款支付。',
    tip: '销售运费属于"销售费用"，是商业企业常见的费用支出。借：销售费用，贷：银行存款。',
    entries: [
      { subjectCode: '6601', summary: '支付销售运费', debit: 2000, credit: 0, explanation: '销售费用增加记借方。销售商品发生的运输费属于销售环节费用，计入当期损益。' },
      { subjectCode: '100201', summary: '支付销售运费', debit: 0, credit: 2000, explanation: '银行存款减少记贷方。支付运费，资产减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6601），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '运费发票', docTitle: '运输业增值税普通发票', date: '2026-01-15', totalAmount: 2000, stampText: 'XX物流公司 发票专用章',
        items: [{ name: '销售商品运输费', qty: 1, price: 2000, amount: 2000 }] }]},

  // ═══════════════════════════════════════════
  // 第四周：日常经营
  // ═══════════════════════════════════════════
  {
    date: '2026-01-16',
    title: '计提本月工资',
    tags: ['工资社保'],
    difficulty: 2,
    description: '计提本月员工工资：管理人员工资30,000元，销售人员工资20,000元，合计50,000元。',
    tip: '工资计提（月末计提当月工资）：借：管理费用/销售费用，贷：应付职工薪酬。不同部门的工资计入不同的费用科目。',
    entries: [
      { subjectCode: '660203', summary: '计提管理人员工资', debit: 30000, credit: 0, explanation: '管理费用-工资薪金增加记借方。行政管理人员的工资计入管理费用。' },
      { subjectCode: '6601', summary: '计提销售人员工资', debit: 20000, credit: 0, explanation: '销售费用增加记借方。销售人员的工资计入销售费用。' },
      { subjectCode: '221101', summary: '计提本月工资', debit: 0, credit: 50000, explanation: '应付职工薪酬-工资增加记贷方。计提形成对员工的负债，发放时冲减。' }],
    documents: [
      { type: 'text', label: '工资表', docTitle: '2026年1月工资汇总表', content: '管理人员：5人 × 6,000元 = 30,000元\n销售人员：4人 × 5,000元 = 20,000元\n合计：50,000元\n实发金额：50,000元（无社保公积金扣除）', stampText: '行政人事部章' }]},
  {
    date: '2026-01-17',
    title: '发放工资',
    tags: ['工资社保'],
    difficulty: 1,
    description: '通过工商银行转账发放本月员工工资50,000元。',
    tip: '实际发放工资时：借：应付职工薪酬，贷：银行存款。发放后冲减计提时确认的负债。',
    entries: [
      { subjectCode: '221101', summary: '发放本月工资', debit: 50000, credit: 0, explanation: '应付职工薪酬-工资减少记借方。实际支付工资，负债减少。' },
      { subjectCode: '100201', summary: '发放本月工资', debit: 0, credit: 50000, explanation: '银行存款减少记贷方。通过银行代发工资，资金划出。' , cashFlowItem: 'cf-op3', cashFlowExplanation: '支付职工薪酬相关支出（配对科目221101），属于"支付给职工以及为职工支付的现金"——经营活动现金流出。'}],
    documents: [
      { type: 'bank', label: '代发工资回单', date: '2026-01-17', totalAmount: 50000, payer: '本公司', payeeName: '员工代发户', content: '2026年1月工资', refNo: 'HD202601170001' }]},
  {
    date: '2026-01-18',
    title: '支付广告费',
    tags: ['费用管理'],
    difficulty: 1,
    description: '支付本月网络广告推广费8,000元，以银行存款支付。',
    tip: '广告费属于销售费用，是企业为拓展市场发生的支出。借：销售费用-广告费，贷：银行存款。',
    entries: [
      { subjectCode: '660101', summary: '支付广告费', debit: 8000, credit: 0, explanation: '销售费用-广告费增加记借方。广告推广属于销售活动，计入销售费用。' },
      { subjectCode: '100201', summary: '支付广告费', debit: 0, credit: 8000, explanation: '银行存款减少记贷方。支付广告费用，资金减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目660101），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '广告费发票', docTitle: '增值税普通发票', date: '2026-01-18', totalAmount: 8000, stampText: 'XX网络科技有限公司 发票专用章',
        items: [{ name: '搜索引擎推广服务（1月）', qty: 1, price: 8000, amount: 8000 }] }]},
  {
    date: '2026-01-19',
    title: '支付水电费',
    tags: ['费用管理'],
    difficulty: 1,
    description: '支付本月水电费2,500元，以银行存款支付。',
    tip: '水电费属于管理费用中的办公相关支出。借：管理费用，贷：银行存款。',
    entries: [
      { subjectCode: '6602', summary: '支付水电费', debit: 2500, credit: 0, explanation: '管理费用增加记借方。企业日常运营的水电支出计入管理费用。' },
      { subjectCode: '100201', summary: '支付水电费', debit: 0, credit: 2500, explanation: '银行存款减少记贷方。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6602），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '水电费账单', docTitle: '上海市电力公司缴费单', date: '2026-01-19', totalAmount: 1500,
        items: [{ name: '电费', qty: 1, price: 1500, amount: 1500 }] },
      { type: 'receipt', label: '水费账单', docTitle: '上海市自来水公司缴费单', date: '2026-01-19', totalAmount: 1000,
        items: [{ name: '水费', qty: 1, price: 1000, amount: 1000 }] }]},
  {
    date: '2026-01-20',
    title: '员工报销差旅费',
    tags: ['费用管理'],
    difficulty: 1,
    description: '销售人员报销出差差旅费3,600元（含交通费2,100元、住宿费1,500元），以现金支付。',
    tip: '差旅费根据员工所属部门计入相应的费用科目。销售人员出差计入"销售费用"，管理人员出差计入"管理费用"。',
    entries: [
      { subjectCode: '6601', summary: '报销差旅费', debit: 3600, credit: 0, explanation: '销售费用增加记借方。销售人员出差的差旅费属于销售环节支出，计入销售费用。' },
      { subjectCode: '1001', summary: '报销差旅费', debit: 0, credit: 3600, explanation: '库存现金减少记贷方。现金支付报销款。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6601），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '差旅费报销单', docTitle: '差旅费报销单', date: '2026-01-20', totalAmount: 3600, stampText: '财务审核专用章',
        items: [{ name: '火车票（上海→北京）', qty: 2, price: 550, amount: 1100 }, { name: '火车票（北京→上海）', qty: 2, price: 500, amount: 1000 }, { name: '住宿费', qty: 3, price: 500, amount: 1500 }] }]},

  // ═══════════════════════════════════════════
  // 第五周：税费 + 期末
  // ═══════════════════════════════════════════
  {
    date: '2026-01-21',
    title: '计提城建税及教育费附加',
    tags: ['税费'],
    difficulty: 2,
    description: '根据本月应交增值税计算并计提城市维护建设税（税率7%）和教育费附加（税率3%）。本月应交增值税=销项23,400元-进项16,250元=7,150元。',
    tip: '城建税和教育费附加以实际缴纳的增值税为计税依据。城建税税率7%（城市），教育费附加3%。借：税金及附加，贷：应交税费-城建税/教育费附加。',
    entries: [
      { subjectCode: '6403', summary: '计提城建税及教育费附加', debit: 715, credit: 0, explanation: '税金及附加增加记借方。城建税和教育费附加是附加税费，计入税金及附加科目。依据《城市维护建设税暂行条例》第四条：城建税税率7%。' },
      { subjectCode: '222103', summary: '计提应交城建税', debit: 0, credit: 500.5, explanation: '应交税费-应交城市维护建设税增加记贷方。应交城建税=应交增值税×7%=7,150×7%=500.50元。' },
      { subjectCode: '222104', summary: '计提应交教育费附加', debit: 0, credit: 214.5, explanation: '应交税费-应交教育费附加增加记贷方。应交教育费附加=应交增值税×3%=7,150×3%=214.50元。' }],
    documents: [
      { type: 'text', label: '税金计算表', docTitle: '附加税费计算表', content: '计税依据：应交增值税=23,400-16,250=7,150元\n城市维护建设税：7,150×7%=500.50元\n教育费附加：7,150×3%=214.50元\n合计：715元', stampText: '财务专用章' }]},
  {
    date: '2026-01-22',
    title: '缴纳增值税',
    tags: ['税费'],
    difficulty: 2,
    description: '缴纳本月增值税7,150元，通过工商银行转账支付。',
    tip: '缴纳增值税时：借：应交税费-应交增值税（已交税金），贷：银行存款。一般纳税人通常次月申报并缴纳上月增值税。',
    entries: [
      { subjectCode: '222101', summary: '缴纳本月增值税', debit: 7150, credit: 0, explanation: '应交税费-应交增值税减少记借方。实际缴纳增值税，负债减少。' },
      { subjectCode: '100201', summary: '缴纳本月增值税', debit: 0, credit: 7150, explanation: '银行存款减少记贷方。缴纳增值税款，资金减少。' , cashFlowItem: 'cf-op4', cashFlowExplanation: '缴纳税费支出（配对科目222101），属于"支付的各项税费"——经营活动现金流出。'}],
    documents: [
      { type: 'bank', label: '缴税回单', date: '2026-01-22', totalAmount: 7150, payer: '本公司', payeeName: '国家金库上海分库', content: '缴纳2026年1月增值税', refNo: 'HD202601220001' },
      { type: 'text', label: '纳税申报表', docTitle: '增值税纳税申报表（简表）', content: '销项税额：23,400元\n进项税额：16,250元\n应交增值税：7,150元\n已缴纳：7,150元' }]},
  {
    date: '2026-01-23',
    title: '计提固定资产折旧',
    tags: ['费用管理'],
    difficulty: 2,
    description: '计提本月固定资产折旧。房屋建筑物原值500,000元，月折旧率0.2%（直线法）；办公设备原值60,000元，月折旧率0.8%。',
    tip: '固定资产折旧按部门计入费用：管理部门使用的固定资产折旧计入"管理费用"。借：管理费用，贷：累计折旧。',
    entries: [
      { subjectCode: '6602', summary: '计提折旧（管理部门）', debit: 1480, credit: 0, explanation: '管理费用增加记借方。管理部门使用的房屋建筑物折旧=500,000×0.2%=1,000元；办公设备折旧=60,000×0.8%=480元。合计1,480元。' },
      { subjectCode: '1602', summary: '计提折旧', debit: 0, credit: 1480, explanation: '累计折旧增加记贷方。累计折旧是固定资产的抵减科目，贷方表示增加。固定资产账面价值=原值-累计折旧。' }],
    documents: [
      { type: 'text', label: '折旧计算表', docTitle: '固定资产折旧计算表', content: '房屋建筑物：原值500,000×月折旧率0.2%=1,000元\n办公设备：原值60,000×月折旧率0.8%=480元\n合计：1,480元\n折旧方法：直线法（年限平均法）', stampText: '财务专用章' }]},
  {
    date: '2026-01-24',
    title: '期末结转损益',
    tags: ['期末'],
    difficulty: 3,
    description: '月末结转所有损益类科目余额至"本年利润"，计算本月净利润/亏损。',
    tip: '期末结转损益是每个月必须做的重要步骤。先将收入类科目结转至本年利润贷方，再将费用类科目结转至本年利润借方。差额即为本月利润（贷方余额）或亏损（借方余额）。',
    entries: [
      { subjectCode: '6001', debit: 280000, credit: 0, summary: '结转主营业务收入', explanation: '主营业务收入结转至本年利润。收入类科目期末余额转出，余额归零。' },
      { subjectCode: '6401', debit: 0, credit: 108000, summary: '结转主营业务成本', explanation: '主营业务成本转出，余额归零。已销商品成本108,000元（60,000+48,000）。' },
      { subjectCode: '6403', debit: 0, credit: 715, summary: '结转税金及附加', explanation: '税金及附加转出715元。' },
      { subjectCode: '6601', debit: 0, credit: 29600, summary: '结转销售费用', explanation: '销售费用转出34,600元（含采购运费1,000+销售运费2,000+工资20,000+广告8,000+差旅3,600）。' },
      { subjectCode: '660101', debit: 0, credit: 16000, summary: '结转660101', explanation: '660101转出，余额归零。' },
      { subjectCode: '6602', debit: 0, credit: 4030, summary: '结转管理费用', explanation: '管理费用转出35,180元（含办公1,200+工资30,000+水电2,500+折旧1,480）。' },
      { subjectCode: '660201', debit: 0, credit: 1200, summary: '结转660201', explanation: '660201转出，余额归零。' },
      { subjectCode: '660203', debit: 0, credit: 30000, summary: '结转660203', explanation: '660203转出，余额归零。' },
      { subjectCode: '4103', debit: 0, credit: 90455, summary: '结转费用类科目', explanation: '本年利润减少记借方。将本期所有费用转入本年利润：主营业务成本108,000+销售费用34,600+管理费用35,180+税金及附加715=178,495元。本月净利润=180,000-178,495=1,505元。' }
    ],
    documents: [
      { type: 'text', label: '损益计算表', docTitle: '2026年1月损益计算表', content: '一、营业收入：180,000元\n减：营业成本：108,000元\n减：销售费用：34,600元\n减：管理费用：35,180元\n减：税金及附加：715元\n二、营业利润：1,505元\n\n注：本月未计提借款利息（短期借款利息到期一次性支付）。', stampText: '财务专用章' }]},
  // ═══════════════════════════════════════════
  // 出纳专属任务（平行于会计任务）
  // ═══════════════════════════════════════════
  {
    date: '2026-01-01',
    title: '库存现金清点与日记账启用',
    tags: ['出纳'],
    difficulty: 1,
    description: '新公司成立，出纳收到首笔启动资金前的准备工作：清点保险柜现金余额（初始为0），建立现金日记账和银行存款日记账账页，确认工商银行账户已开立并可正常使用。',
    tip: '新公司成立时出纳的第一项工作是确认银行账户已开立、库存现金为零、准备好日记账。出纳日记账是出纳管理资金的"流水账"，必须逐笔序时登记，做到日清月结。',
    role: 'cashier',
    entries: [],
    documents: [
      { type: 'text', label: '现金日记账', docTitle: '现金日记账（2026年1月）', stampText: '现金日记账',
        content: `现金日记账
━━━━━━━━━━━━━━━━━━━━━━━━━
1月期初余额：0.00
（新公司成立，现金暂未启用）

注：现金日记账由出纳逐笔登记。
出纳：王出纳` },
      { type: 'text', label: '银行日记账启用', docTitle: '银行存款日记账（2026年1月）', stampText: '银行日记账',
        content: `银行存款日记账——工商银行
━━━━━━━━━━━━━━━━━━━━━━━━━
开户行：中国工商银行上海分行
账号：6222 0200 **** 8888
1月期初余额：0.00` }]},
  {
    date: '2026-01-02',
    title: '投资款到账确认并登记',
    tags: ['出纳'],
    difficulty: 1,
    description: '收到投资者张三投入的资本金1,000,000元已存入工商银行账户。出纳查询银行账户确认到账，登记银行存款日记账，并保存银行回单作为原始凭证附件。',
    tip: '出纳收到银行回单后，需第一时间确认到账金额与投资协议一致，登记银行存款日记账。出纳不负责做"实收资本"分录（那是会计的工作），但需确保银行日记账准确反映实际到账情况。',
    entries: [
      { subjectCode: '100201', summary: '确认投资款到账', debit: 1000000, credit: 0, explanation: '出纳登记银行存款日记账：工商银行收到投资款1,000,000元，借方增加。出纳需将银行回单编号HD202601020001附在记账凭证后。' , cashFlowItem: 'cf-fin3', cashFlowExplanation: '吸收投资收到的现金（配对科目4001），属于筹资活动现金流入——企业通过权益融资获得资金。'},
      { subjectCode: '4001', summary: '确认投资款到账', debit: 0, credit: 1000000, explanation: '出纳仅登记日记账，此分录由会计处理。出纳需确保日记账余额与银行对账单一致。' }],
    documents: [
      { type: 'bank', label: '银行回单', date: '2026-01-02', totalAmount: 1000000, payer: '张三（投资者）', payeeName: '本公司', content: '投资款', refNo: 'HD202601020001' },
      { type: 'text', label: '日记账登记示例', docTitle: '银行存款日记账登记示范', content: '日期：2026-01-02\n摘要：收到投资款\n对方科目：实收资本\n借方金额：1,000,000.00\n贷方金额：0.00\n余额：1,000,000.00\n凭证号：银收-001', stampText: '出纳章' }]},
  {
    date: '2026-01-03',
    title: '提取备用金（现金支票）',
    tags: ['出纳'],
    difficulty: 1,
    description: '为满足日常零星开支需要，出纳填写现金支票从工商银行提取备用金5,000元。支票号码：ZZ123456。',
    tip: '提取备用金是出纳最日常的业务之一。操作流程：①填写现金支票（加盖预留银行印鉴）→②到银行柜台取现或ATM取款→③现金入保险柜→④登记现金日记账。注意：现金支票必须填写"收款人"为本公司，背面加盖预留印鉴。',
    entries: [
      { subjectCode: '1001', summary: '提取备用金', debit: 5000, credit: 0, explanation: '库存现金增加记借方。出纳从银行提取现金后放入保险柜备用，现金日记账登记"收"方。' },
      { subjectCode: '100201', summary: '提取备用金', debit: 0, credit: 5000, explanation: '银行存款减少记贷方。从工行账户提取现金后，银行日记账登记"付"方。出纳需在支票登记簿记录该笔支票使用情况。' }],
    documents: [
      { type: 'receipt', label: '现金支票存根', docTitle: '中国工商银行现金支票存根', date: '2026-01-03', totalAmount: 5000, stampText: '预留印鉴',
        items: [{ name: '支票号码：ZZ123456', qty: 1, price: 5000, amount: 5000 }] },
      { type: 'bank', label: '取款回单', date: '2026-01-03', totalAmount: 5000, payer: '本公司工商银行账户', payeeName: '本公司（取现）', content: '提取备用金', refNo: 'HD202601030010' }]},
  {
    date: '2026-01-05',
    title: '预付定金银行转账操作',
    tags: ['出纳', '商品采购'],
    difficulty: 1,
    description: '根据采购部门审批的付款申请单，通过企业网银向鼎盛贸易有限公司预付采购定金30,000元。付款用途注明"购销合同No.2026001预付款"。',
    tip: '出纳办理转账付款流程：①收到审批齐全的付款申请单→②登录企业网银→③录入收款方信息（户名、账号、开户行）及金额→④换人复核（双人操作）→⑤打印转账回单→⑥登记银行日记账。大额付款必须经过双人复核（制单+复核）。',
    entries: [
      { subjectCode: '1123', summary: '预付采购定金-转账', debit: 30000, credit: 0, explanation: '预付账款增加记借方。出纳按审批单执行转账操作，确认款项已划出后登记银行日记账。' },
      { subjectCode: '100201', summary: '预付采购定金-转账', debit: 0, credit: 30000, explanation: '银行存款减少记贷方。出纳登记银行日记账：工商银行账户减少30,000元，附网银转账回单。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目1123），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '转账回单', date: '2026-01-05', totalAmount: 30000, payer: '本公司', payerAccount: '6222 0200 **** 8888', payeeName: '鼎盛贸易有限公司', payeeAccount: '6222 0200 **** 6666', content: '预付货款（购销合同No.2026001）', refNo: 'HD202601050001' },
      { type: 'text', label: '付款申请单', docTitle: '付款申请单', content: '申请部门：采购部\n收款单位：鼎盛贸易有限公司\n付款事由：预付商品采购定金\n申请金额：30,000.00\n审批签字：采购经理☑  财务主管☑  总经理☑', signature: '制单：采购员  审核：李会计  批准：赵总' }]},
  {
    date: '2026-01-06',
    title: '采购货款银行转账支付',
    tags: ['出纳', '商品采购'],
    difficulty: 1,
    description: '根据审批后的付款申请单，通过企业网银向华强供应链有限公司支付采购货款33,900元（含税），用途注明"货款及税款"。',
    tip: '出纳支付采购货款时，需核对发票金额与付款申请单是否一致，确认审批手续齐全后办理转账。转账完成后，将银行回单粘贴在付款申请单后，移交会计做账。',
    entries: [
      { subjectCode: '1405', summary: '支付采购货款', debit: 30000, credit: 0, explanation: '库存商品增加记借方。出纳不负责库存商品分录，此笔反映采购资金用途。出纳关注的是银行存款减少的金额和去向。' },
      { subjectCode: '222101', summary: '支付采购进项税', debit: 3900, credit: 0, explanation: '进项税额增加记借方。出纳付款时价税合计支付，税款部分由会计抵扣处理。' },
      { subjectCode: '100201', summary: '支付采购货款', debit: 0, credit: 33900, explanation: '银行存款减少记贷方。出纳登记银行日记账：工商银行账户支付33,900元。出纳需核对付款回单上的收款方、金额、日期无误后归档。' , cashFlowItem: 'cf-op2', cashFlowExplanation: '采购存货/商品支出（配对科目1405），属于"购买商品、接受劳务支付的现金"——经营活动现金流出。'}],
    documents: [
      { type: 'bank', label: '转账回单', date: '2026-01-06', totalAmount: 33900, payer: '本公司', payerAccount: '6222 0200 **** 8888', payeeName: '华强供应链有限公司', payeeAccount: '6222 0200 **** 7777', content: '货款', refNo: 'HD202601060001' },
      { type: 'text', label: '付款申请单', docTitle: '付款申请单', content: '收款单位：华强供应链有限公司\n付款事由：采购A类商品货款\n发票金额：33,900.00（含税）\n审批签字：采购经理☑  财务主管☑  总经理☑', signature: '出纳：王出纳  审核：李会计' }]},
  {
    date: '2026-01-07',
    title: '现金支付采购运费',
    tags: ['出纳', '费用管理'],
    difficulty: 1,
    description: 'XX物流公司送来上月采购商品的运费发票1,000元，出纳审核发票无误后，以现金支付运费。',
    tip: '现金支付需注意：①确认发票抬头为公司全称及税号②金额无误③收款方信息正确。支付后在发票上加盖"现金付讫"章，防止重复报销。出纳登记现金日记账，附发票原件。',
    entries: [
      { subjectCode: '6601', summary: '现金支付采购运费', debit: 1000, credit: 0, explanation: '销售费用增加记借方。商业企业采购运费直接计入销售费用，出纳以现金支付后需在发票上加盖"现金付讫"章。' },
      { subjectCode: '1001', summary: '现金支付采购运费', debit: 0, credit: 1000, explanation: '库存现金减少记贷方。出纳从备用金中支付运费1,000元，现金日记账登记"付"方。保险柜现金减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6601），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '运费发票', docTitle: '运输业增值税普通发票', date: '2026-01-07', totalAmount: 1000, stampText: 'XX物流公司 发票专用章',
        items: [{ name: '运输服务（华强→本公司仓库）', qty: 1, price: 1000, amount: 1000 }] }]},
  {
    date: '2026-01-09',
    title: '采购尾款银行补付',
    tags: ['出纳', '商品采购'],
    difficulty: 1,
    description: '预付定金的商品到货结算完毕，需补付鼎盛贸易有限公司采购尾款20,850元。出纳核对入库单和发票后，通过网银办理转账。',
    tip: '预付＋补付尾款的采购方式在商业企业中很常见。出纳在支付尾款前需核对：①入库单确认商品已到货②发票金额与合同一致③定金已付金额正确④尾款计算无误。尾款=总货款-已付定金。',
    entries: [
      { subjectCode: '1123', summary: '补付采购尾款', debit: 0, credit: 30000, explanation: '预付账款减少记贷方。冲销之前预付的30,000元定金，债权减少。出纳需确认定金和尾款两笔转账均已登记银行日记账。' },
      { subjectCode: '1405', summary: '补付采购尾款-商品入库', debit: 45000, credit: 0, explanation: '库存商品增加记借方。商品到货入库，出纳不负责商品入库分录，此笔反映采购业务完整闭环。' },
      { subjectCode: '222101', summary: '补付采购尾款-进项税', debit: 5850, credit: 0, explanation: '进项税额增加记借方。增值税专用发票上的进项税额由会计处理抵扣。' },
      { subjectCode: '100201', summary: '补付采购尾款', debit: 0, credit: 20850, explanation: '银行存款减少记贷方。补付扣除定金后的尾款20,850元（50,850-30,000），银行日记账登记"付"方。' , cashFlowItem: 'cf-op2', cashFlowExplanation: '采购存货/商品支出（配对科目1405），属于"购买商品、接受劳务支付的现金"——经营活动现金流出。'}],
    documents: [
      { type: 'bank', label: '转账回单', date: '2026-01-09', totalAmount: 20850, payer: '本公司', payerAccount: '6222 0200 **** 8888', payeeName: '鼎盛贸易有限公司', payeeAccount: '6222 0200 **** 6666', content: '采购尾款（合同No.2026001）', refNo: 'HD202601090001' },
      { type: 'text', label: '采购结算单', docTitle: '采购结算汇总单', content: '合同总价：50,850元（含税）\n已付定金：30,000元（2026.1.5）\n本次补付：20,850元\n采购状态：✓ 全部结清', stampText: '采购结算专用章' }]},
  {
    date: '2026-01-10',
    title: '销售收款银行到账确认',
    tags: ['出纳', '商品销售'],
    difficulty: 1,
    description: '鑫源商贸有限公司汇入货款113,000元，出纳收到银行收款通知后，确认款项到账并登记银行存款日记账。',
    tip: '出纳收到银行收款通知时的操作流程：①查询银行账户确认到账金额和时间②核对销售合同或发票确认收款对应哪笔业务③在银行回单上加盖"收讫"章④登记银行日记账⑤通知会计到账信息。出纳需特别关注"回款是否与发票金额一致"。',
    entries: [
      { subjectCode: '100201', summary: '确认销售款到账', debit: 113000, credit: 0, explanation: '银行存款增加记借方。出纳确认鑫源商贸有限公司汇入货款113,000元到账，登记银行日记账。回单编号：HD202601100001。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入——主营业务产生的现金收入。'},
      { subjectCode: '6001', summary: '确认销售款到账', debit: 0, credit: 100000, explanation: '主营业务收入增加记贷方。出纳不负责收入确认，此分录为会计处理。出纳确保银行日记账准确反映到账情况。' },
      { subjectCode: '222101', summary: '确认销售款到账-销项税', debit: 0, credit: 13000, explanation: '销项税额增加记贷方。出纳确认收款金额价税合计113,000元，其中不含税收入100,000元，增值税13,000元。' }],
    documents: [
      { type: 'bank', label: '收款回单', date: '2026-01-10', totalAmount: 113000, payer: '鑫源商贸有限公司', payerAccount: '6222 0200 **** 1111', payeeName: '本公司', payeeAccount: '6222 0200 **** 8888', content: '货款（发票No.3100234568）', refNo: 'HD202601100001' }]},
  {
    date: '2026-01-14',
    title: '收到前欠货款-银行确认',
    tags: ['出纳', '往来管理'],
    difficulty: 1,
    description: '鑫源商贸有限公司汇入前欠货款90,400元，出纳查询银行账户确认到账，打印银行回单并登记银行存款日记账。',
    tip: '收到客户回款是出纳最频繁的工作之一。操作要点：①网银查询交易明细确认到账②核对交易摘要中的发票号或合同号③打印电子回单④登记银行日记账⑤及时通知销售部门或会计。对账龄较长的应收账款回款，需特别关注。',
    entries: [
      { subjectCode: '100201', summary: '收到前欠货款', debit: 90400, credit: 0, explanation: '银行存款增加记借方。出纳确认鑫源商贸公司汇来前欠货款90,400元到账，登记银行日记账。回单编号：HD202601140001。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目112201），属于经营活动现金流入——主营业务产生的现金收入。'},
      { subjectCode: '112201', summary: '收到前欠货款（甲公司）', debit: 0, credit: 90400, explanation: '应收账款-甲公司减少记贷方。客户偿还前欠货款后，甲公司应收账款债权结清。出纳确认回款与发票No.3100234569对应。' }],
    documents: [
      { type: 'bank', label: '收款回单', date: '2026-01-14', totalAmount: 90400, payer: '鑫源商贸有限公司', payerAccount: '6222 0200 **** 1111', payeeName: '本公司', payeeAccount: '6222 0200 **** 8888', content: '货款（发票No.3100234569）', refNo: 'HD202601140001' },
      { type: 'text', label: '应收账款账龄表', docTitle: '应收账款回款跟踪表', content: '客户：鑫源商贸有限公司\n发票号：3100234569（2026.1.12）\n应收金额：90,400元\n回款日期：2026.1.14\n账龄：2天\n回款状态：✓ 已结清', signature: '出纳：王出纳  会计：李会计' }]},
  {
    date: '2026-01-15',
    title: '销售运费银行转账支付',
    tags: ['出纳', '费用管理'],
    difficulty: 1,
    description: '收到XX物流公司发来的销售商品运输费发票2,000元，出纳审核后通过网银办理转账支付。',
    tip: '支付服务类费用时，出纳需审核发票是否合规：①发票抬头为公司全称②纳税人识别号正确③发票专用章清晰④服务内容与实际发生一致。审核通过后办理转账支付，在发票上加盖"银行付讫"章并移交给会计。',
    entries: [
      { subjectCode: '6601', summary: '支付销售运费', debit: 2000, credit: 0, explanation: '销售费用增加记借方。商业企业销售商品产生的运输费计入销售费用，由出纳办理支付。' },
      { subjectCode: '100201', summary: '支付销售运费', debit: 0, credit: 2000, explanation: '银行存款减少记贷方。出纳通过网银支付运费2,000元，银行日记账登记"付"方。需保留网银转账回单。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6601），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '转账回单', date: '2026-01-15', totalAmount: 2000, payer: '本公司', payerAccount: '6222 0200 **** 8888', payeeName: 'XX物流公司', content: '销售商品运输费', refNo: 'HD202601150020' },
      { type: 'receipt', label: '运费发票', docTitle: '运输业增值税普通发票', date: '2026-01-15', totalAmount: 2000, stampText: 'XX物流公司 发票专用章',
        items: [{ name: '销售商品运输服务', qty: 1, price: 2000, amount: 2000 }] }]},
  {
    date: '2026-01-16',
    title: '备用金借支—差旅预借',
    tags: ['出纳', '费用管理'],
    difficulty: 1,
    description: '销售人员张伟下周需出差拜访客户，填写借款单预借差旅费2,000元。出纳审核借款单经部门经理和财务主管审批签字后，以现金支付。',
    tip: '员工借支差旅费的流程：①员工填写借款单→②部门经理审批→③财务主管审批→④出纳审核借款单审批手续完备→⑤支付现金→⑥借款单留存，待出差回来后报销冲账。注意："前账不清，后账不借"——员工有未报销的借款不能再借。',
    entries: [
      { subjectCode: '1221', summary: '差旅费预借款', debit: 2000, credit: 0, explanation: '其他应收款增加记借方。员工借支差旅费形成对公司的借款，出差回来后凭票据报销冲账。' },
      { subjectCode: '1001', summary: '差旅费预借款', debit: 0, credit: 2000, explanation: '库存现金减少记贷方。出纳从备用金中支付员工借支差旅费2,000元，需保留借款单原件。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目1221），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '借款单', docTitle: '员工借款单', date: '2026-01-16', totalAmount: 2000, stampText: '财务专用章',
        items: [{ name: '预借差旅费——北京出差（1月20-22日）', qty: 1, price: 2000, amount: 2000 }] },
      { type: 'text', label: '审批记录', docTitle: '借款审批记录', content: '借款人：张伟（销售部）\n借款事由：北京出差拜访客户\n金额：2,000.00\n部门经理审批：同意☑\n财务主管审批：同意☑\n备注：前笔借款已结清，可借支。', signature: '出纳：已支付 王出纳' }]},
  {
    date: '2026-01-17',
    title: '银行代发工资操作',
    tags: ['出纳', '工资社保'],
    difficulty: 2,
    description: '本月应付职工薪酬50,000元，出纳通过企业网银的"代发工资"功能办理转账发放。需从工商银行账户划转资金至员工个人工资卡。',
    tip: '银行代发工资操作流程：①登录企业网银→②选择"代发工资"功能→③上传工资明细文件（含姓名、账号、金额）→④制单提交→⑤换人复核→⑥打印代发清单和回单→⑦登记银行日记账。注意：代发工资系统一般在17:00前处理当天到账，建议上午操作。',
    entries: [
      { subjectCode: '221101', summary: '银行代发工资', debit: 50000, credit: 0, explanation: '应付职工薪酬减少记借方。通过银行代发工资后，应付职工薪酬负债减少。出纳上传的工资明细需与工资表一致。' },
      { subjectCode: '100201', summary: '银行代发工资', debit: 0, credit: 50000, explanation: '银行存款减少记贷方。工商银行账户划出50,000元用于发放工资，银行日记账登记"付"方。附银行代发工资回单。' , cashFlowItem: 'cf-op3', cashFlowExplanation: '支付职工薪酬相关支出（配对科目221101），属于"支付给职工以及为职工支付的现金"——经营活动现金流出。'}],
    documents: [
      { type: 'bank', label: '代发工资回单', date: '2026-01-17', totalAmount: 50000, payer: '本公司', payerAccount: '6222 0200 **** 8888', payeeName: '员工代发工资户', content: '2026年1月工资发放', refNo: 'HD202601170001' },
      { type: 'text', label: '代发工资明细', docTitle: '银行代发工资明细表', content: '总金额：50,000.00元\n人数：9人\n其中：\n  管理人员：5人 × 6,000 = 30,000元\n  销售人员：4人 × 5,000 = 20,000元\n代发状态：✓ 已提交银行处理', signature: '制单：王出纳  复核：李会计' }]},
  {
    date: '2026-01-18',
    title: '广告费银行转账支付',
    tags: ['出纳', '费用管理'],
    difficulty: 1,
    description: '收到XX网络科技有限公司发来的1月份搜索引擎推广服务费发票8,000元，出纳审核后通过网银转账支付。',
    tip: '出纳支付服务费时核对要点：①合同金额与发票金额一致②服务期间正确（本月费用）③收款方账户信息与合同一致。大额服务费支付后需及时通知相关部门确认服务已正常开展。',
    entries: [
      { subjectCode: '660101', summary: '支付广告推广费', debit: 8000, credit: 0, explanation: '销售费用-广告费增加记借方。网络推广服务费属于销售费用，由出纳办理银行转账支付。' },
      { subjectCode: '100201', summary: '支付广告推广费', debit: 0, credit: 8000, explanation: '银行存款减少记贷方。出纳通过网银支付广告费8,000元，银行日记账登记"付"方。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目660101），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '转账回单', date: '2026-01-18', totalAmount: 8000, payer: '本公司', payerAccount: '6222 0200 **** 8888', payeeName: 'XX网络科技有限公司', content: '1月网络推广服务费', refNo: 'HD202601180030' },
      { type: 'invoice', label: '服务发票', region: '北京', invoiceType: '普通', copy: '发票联', invoiceNo: '1100222333', date: '2026年01月18日', buyer: '本公司', buyerTaxId: '91440101MA3XXXXXXXX', seller: 'XX网络科技有限公司', sellerTaxId: '91110000MA6YYYYYYY', stampText: 'XX网络科技 发票专用章',
        lineItems: [{ name: '搜索引擎推广服务（2026年1月）', unit: '项', qty: 1, price: 8000, amount: 8000, taxRate: '6%', tax: 0 }], totalAmount: 8000 }]},
  {
    date: '2026-01-21',
    title: '购买转账支票本',
    tags: ['出纳'],
    difficulty: 1,
    description: '公司业务量增加，需使用转账支票支付供应商货款。出纳前往工商银行购买转账支票一本（25份），支付工本费及手续费共50元，银行从账户自动扣收。',
    tip: '购买支票的操作流程：①填写"票据和结算凭证领用单"（加盖预留银行印鉴）→②银行审核后发售支票→③支付工本费→④出纳在"支票登记簿"上登记购买信息（支票号码起止、购买日期、份数）→⑤支票簿存入保险柜保管。支票和印鉴必须分开保管，防止被盗用。',
    entries: [
      { subjectCode: '6602', summary: '购买转账支票本', debit: 50, credit: 0, explanation: '管理费用增加记借方。购买支票的工本费属于银行管理费用支出，计入当期损益。' },
      { subjectCode: '100201', summary: '购买转账支票本', debit: 0, credit: 50, explanation: '银行存款减少记贷方。银行扣收支票工本费50元，出纳登记银行日记账"付"方，同时在支票登记簿登记支票起止号码。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6602），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '支票工本费收据', docTitle: '中国工商银行收费凭证', date: '2026-01-21', totalAmount: 50, stampText: '中国工商银行 业务专用章',
        items: [{ name: '转账支票（25份/本）', qty: 1, price: 35, amount: 35 }, { name: '支票受理手续费', qty: 1, price: 15, amount: 15 }] },
      { type: 'text', label: '支票登记簿', docTitle: '支票领用登记簿', content: '购买日期：2026年1月21日\n支票类型：转账支票\n银行名称：工行上海分行\n起止号码：ZZ123457~ZZ123481\n份数：25份\n保管人：王出纳', stampText: '出纳专用章' }]},
  {
    date: '2026-01-22',
    title: '增值税银行转账缴纳',
    tags: ['出纳', '税费'],
    difficulty: 1,
    description: '收到税务局的缴款通知书，需缴纳本月增值税7,150元。出纳通过网银办理税款缴纳，收款方为"国家金库上海分库"。',
    tip: '缴纳税款操作：①登录电子税务局打印"税收缴款书"→②登录企业网银→③录入收款方为"国家金库XX分库"→④输入缴款书上的金额和预算科目→⑤制单→⑥复核→⑦打印电子缴税回单→⑧登记银行日记账。缴税截止日为次月15日，逾期将产生滞纳金。',
    entries: [
      { subjectCode: '222101', summary: '缴纳增值税', debit: 7150, credit: 0, explanation: '应交税费-应交增值税减少记借方。实际缴纳增值税后，应交税费负债减少。' },
      { subjectCode: '100201', summary: '缴纳增值税', debit: 0, credit: 7150, explanation: '银行存款减少记贷方。出纳通过网银缴纳增值税7,150元，银行日记账登记"付"方。附电子缴税回单和税收缴款书。' , cashFlowItem: 'cf-op4', cashFlowExplanation: '缴纳税费支出（配对科目222101），属于"支付的各项税费"——经营活动现金流出。'}],
    documents: [
      { type: 'bank', label: '缴税回单', date: '2026-01-22', totalAmount: 7150, payer: '本公司', payerAccount: '6222 0200 **** 8888', payeeName: '国家金库上海分库', content: '2026年1月增值税', refNo: 'HD202601220001' },
      { type: 'receipt', label: '税收缴款书', docTitle: '中华人民共和国税收缴款书（银行经收专用）', date: '2026-01-22', totalAmount: 7150, stampText: '国家税务总局 征收章',
        items: [{ name: '增值税（2026年1月）', qty: 1, price: 7150, amount: 7150 }] }]},
  {
    date: '2026-01-23',
    title: '出纳资金日报编制',
    tags: ['出纳'],
    difficulty: 1,
    description: '出纳根据本月现金日记账和银行存款日记账，编制1月份资金日报表，汇总当日资金收支及结余情况，报送财务主管审阅。',
    tip: '资金日报是出纳向管理层汇报资金状况的重要工具。内容包括：①昨日余额②本日收入（分现金/银行）③本日支出（分现金/银行）④本日余额⑤备注说明大额收支。大企业要求每日报送，中小企业至少每周报送。"日清月结"是出纳工作的基本要求。',
    role: 'cashier',
    entries: [],
    documents: [
      { type: 'text', label: '资金日报表', docTitle: '资金日报表（2026年1月23日）', stampText: '出纳专用章',
        content: `资金日报表
━━━━━━━━━━━━━━━━━━━━━━━━━
日期：2026年1月23日

现金部分：
  昨日余额：2,400.00
  本日收入：0.00
  本日支出：0.00
  本日余额：2,400.00

银行存款部分：
  昨日余额：1,640,550.00
  本日收入：0.00
  本日支出：0.00
  本日余额：1,640,550.00

资金合计：1,642,950.00

填报人：王出纳
审阅人：李会计` }]},
  {
    date: '2026-01-24',
    title: '月末库存现金盘点',
    tags: ['出纳', '期末'],
    difficulty: 1,
    description: '月末结账前，出纳对保险柜库存现金进行全面盘点，确认账面余额与实际库存一致。盘点时需有会计人员在旁监盘。',
    tip: '现金盘点流程：①出纳结出现金日记账余额→②盘点保险柜实存现金（按面值分类清点）→③会计监盘→④填写"库存现金盘点表"→⑤账实核对→⑥如有差异当日查明原因。盘点表需双方签字确认。发现短款由出纳赔偿，长款需查明原因后处理。',
    role: 'cashier',
    entries: [],
    documents: [
      { type: 'text', label: '现金盘点表', docTitle: '库存现金盘点表（2026年1月24日）', stampText: '财务专用章',
        content: `库存现金盘点表
━━━━━━━━━━━━━━━━━━━━━━━━━
盘点日期：2026年1月24日
账面余额：2,400.00

实盘金额：
  100元面值：20张 = 2,000.00
  50元面值：  6张 =   300.00
  20元面值：  5张 =   100.00
  10元面值：  0张 =     0.00
  5元面值：   0张 =     0.00
  硬币合计：        0.00
  实盘合计：      2,400.00

盘点结果：✓ 账实相符
盘点人：王出纳
监盘人：李会计` }]},
  {
    date: '2026-01-25',
    title: '银行存款余额核对',
    tags: ['出纳', '期末'],
    difficulty: 1,
    description: '月末核对工商银行日记账余额与银行对账单是否一致，编制银行存款余额调节表。',
    tip: '月末出纳需核对银行日记账与银行对账单余额，如有未达账项需编制余额调节表。这是出纳每月必做的基础工作。',
    role: 'cashier',
    entries: [],
    documents: [
      { type: 'text', label: '银行对账单', docTitle: '中国工商银行对账单（2026年1月）', content: '账户：xxxxxxxxxxxx\n期初余额：0.00\n本期借方：1,000,000+500,000+113,000+90,400\n本期贷方：33,900+30,000+20,850+50,000+2,000+8,000+2,500+7,150\n期末余额：请根据日记账计算核对', stampText: '中国工商银行 业务专用章' }]},

  {
    date: '2026-01-31',
    title: '模拟纳税申报',
    tags: ['期末', '税费'],
    difficulty: 1,
    description: '根据本月已完成的账务处理，进行模拟纳税申报。系统已自动计算应缴税额（增值税和企业所得税），请前往纳税申报页面核对并提交。',
    tip: '纳税申报是企业每月的法定义务。确认所有凭证已过账、期末结转已完成后，前往纳税申报页面核对各项税额后点击"提交申报"。',
    entries: [],
    documents: [
      { type: 'text', label: '纳税申报提醒', docTitle: '1月纳税申报提醒', content: '申报期间：2026-01-31\n\n请前往纳税申报页面：\n1. 核对增值税申报表数据\n2. 核对企业所得税申报表数据\n3. 确认无误后点击"提交申报"\n\n纳税申报是企业每月必做的合规义务，请按时完成。', stampText: '财务专用章' }]},
]
export default tasks
