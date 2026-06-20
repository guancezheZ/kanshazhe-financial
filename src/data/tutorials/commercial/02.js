/**
 * 商业企业（商品流通企业）2月教学任务
 *
 * 行业特征：纯进销存，无生产成本核算
 * 企业类型：一般纳税人（增值税13%）
 * 知识点标签：商品采购、商品销售、仓存管理、往来管理、资金管理、费用管理、工资社保、税费、期末、出纳
 *
 * 本月主题：🧧 春节采购+节后经营
 * 时间线：春节前备货(2/2-2/7) → 节前结算(2/9-2/14) → 节后恢复(2/16-2/21) → 月末(2/23-2/28)
 *
 * 会计准则依据：
 * - 《企业会计准则第14号——收入》（财会[2017]22号）
 * - 《企业会计准则第1号——存货》（财会[2006]3号）
 */

const tasks = [
  // ═══════════════════════════════════════════
  // 第一阶段：春节前备货（2/2 - 2/7）
  // ═══════════════════════════════════════════
  {
    date: '2026-02-02',
    title: '春节前大批量采购商品（现购）',
    tags: ['商品采购', '税费'],
    difficulty: 2,
    description: '春节促销旺季前，公司向华强供应链大批量采购A类商品500件，不含税单价200元，不含税金额100,000元，增值税13,000元，价税合计113,000元，以工商银行存款支付。商品已验收入库。',
    tip: '春节前备货是商业企业的常规操作。大量采购时注意核对发票金额与入库数量。现购分录：借：库存商品/应交税费-进项，贷：银行存款。进项税额=不含税金额×13%。',
    entries: [
      { subjectCode: '1405', summary: '春节前备货入库', debit: 100000, credit: 0, explanation: '库存商品增加记借方。A类商品500件×200元=100,000元入库，存货资产增加。春节前大规模备货应对促销旺季。' },
      { subjectCode: '222101', summary: '采购进项税额', debit: 13000, credit: 0, explanation: '应交税费-应交增值税（进项税额）增加记借方。取得增值税专用发票，税额13,000元可抵扣销项税。依据《增值税暂行条例》第八条。' },
      { subjectCode: '100201', summary: '支付采购货款', debit: 0, credit: 113000, explanation: '银行存款减少记贷方。以工商银行存款支付采购货款及税款，资产减少。' },
    ],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '上海', invoiceNo: '3100234570', date: '2026-02-02', buyer: '本公司', seller: '华强供应链有限公司',
        lineItems: [{ name: 'A类商品', spec: '标准', unit: '件', qty: 500, price: 200, amount: 100000 }],
        totalAmount: 113000, taxRate: '13%', taxAmount: 13000, totalInWords: '壹拾壹万叁仟元整' },
      { type: 'bank', label: '付款回单', date: '2026-02-02', totalAmount: 113000, payer: '本公司', payeeName: '华强供应链有限公司', content: '货款（春节备货）', refNo: 'HD202602020001' },
      { type: 'text', label: '入库单', docTitle: '商品入库单', content: 'A类商品 500件 已验收入库，质量合格。春节备货批次。', signature: '仓库管理员 王强' },
    ],
  },
  {
    date: '2026-02-03',
    title: '赊购商品',
    tags: ['商品采购', '往来管理'],
    difficulty: 2,
    description: '向丙公司赊购B类商品300件，不含税单价150元，不含税金额45,000元，增值税5,850元，价税合计50,850元，货款未付。商品已验收入库。',
    tip: '赊购是商业企业常用采购方式，可缓解短期资金压力。借：库存商品/应交税费-进项，贷：应付账款。注意应付账款应正确区分供应商明细。',
    entries: [
      { subjectCode: '1405', summary: '赊购商品入库', debit: 45000, credit: 0, explanation: '库存商品增加记借方。B类商品300件×150元=45,000元入库，存货增加。' },
      { subjectCode: '222101', summary: '赊购进项税额', debit: 5850, credit: 0, explanation: '进项税额增加记借方，可抵扣销项税。' },
      { subjectCode: '220201', summary: '赊购商品款未付', debit: 0, credit: 50850, explanation: '应付账款-丙公司增加记贷方。赊购商品尚未付款，形成对丙公司的债务。' },
    ],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '江苏', invoiceNo: '3200678901', date: '2026-02-03', buyer: '本公司', seller: '丙公司',
        lineItems: [{ name: 'B类商品', spec: '标准', unit: '件', qty: 300, price: 150, amount: 45000 }],
        totalAmount: 50850, taxRate: '13%', taxAmount: 5850, totalInWords: '伍万零捌佰伍拾元整' },
      { type: 'text', label: '入库单', docTitle: '商品入库单', content: 'B类商品 300件 已验收入库，质量合格。', signature: '仓库管理员 王强' },
    ],
  },
  {
    date: '2026-02-04',
    title: '春节促销现销商品',
    tags: ['商品销售', '资金管理'],
    difficulty: 2,
    description: '春节促销活动：销售A类商品300件，促销单价350元/件（原价400元），不含税金额105,000元，增值税13,650元，价税合计118,650元，已收存工商银行。',
    tip: '促销时售价可能低于平时，但收入仍按实际售价确认。借：银行存款，贷：主营业务收入/应交税费-销项。注意增值税按实际售价计算，不因促销而减免。',
    entries: [
      { subjectCode: '100201', summary: '春节促销收款', debit: 118650, credit: 0, explanation: '银行存款增加记借方。春节促销销售商品收到款项，资金回笼。' },
      { subjectCode: '6001', summary: '春节促销确认收入', debit: 0, credit: 105000, explanation: '主营业务收入增加记贷方。促销商品销售实现，按实际售价确认收入。依据《企业会计准则第14号——收入》第五条：企业应按从购货方已收或应收的合同或协议价款确定收入金额。' },
      { subjectCode: '222101', summary: '促销增值税销项税额', debit: 0, credit: 13650, explanation: '应交税费-应交增值税（销项税额）增加记贷方。销售商品产生纳税义务，按实际售价13%计算。' },
    ],
    documents: [
      { type: 'invoice', label: '增值税专用发票（销项）', region: '上海', invoiceNo: '3100234571', date: '2026-02-04', buyer: '鑫源商贸有限公司', seller: '本公司',
        lineItems: [{ name: 'A类商品', spec: '标准', unit: '件', qty: 300, price: 350, amount: 105000 }],
        totalAmount: 118650, taxRate: '13%', taxAmount: 13650, totalInWords: '壹拾壹万捌仟陆佰伍拾元整' },
      { type: 'bank', label: '收款回单', date: '2026-02-04', totalAmount: 118650, payer: '鑫源商贸有限公司', payeeName: '本公司', content: '春节促销货款', refNo: 'HD202602040001' },
    ],
  },
  {
    date: '2026-02-05',
    title: '结转已销商品成本（促销部分）',
    tags: ['商品销售', '仓存管理'],
    difficulty: 2,
    description: '结转春节促销销售的A类商品成本。A类商品采用移动加权平均法计价：1月结存300件单价100元，本次采购500件单价200元，加权平均单价162.50元，销售300件，销售成本48,750元。',
    tip: '收入确认后必须同步结转成本，遵循配比原则。成本=销售数量×加权平均单价。商业企业用移动加权平均法计算发出商品成本。',
    entries: [
      { subjectCode: '6401', summary: '结转促销商品成本', debit: 48750, credit: 0, explanation: '主营业务成本增加记借方。与促销收入配比的成本结转。成本计算：(300×100+500×200)/800=162.50元/件，300件×162.50=48,750元。依据《企业会计准则第1号——存货》第十四条。' },
      { subjectCode: '1405', summary: '结转促销商品成本', debit: 0, credit: 48750, explanation: '库存商品减少记贷方。A类商品出库300件，存货减少。' },
    ],
    documents: [
      { type: 'text', label: '成本计算表', docTitle: '商品销售成本计算表（春节促销）', content: '销售商品：A类商品\n销售数量：300件\n\n成本计算：\n1月结存：300件×100元=30,000元\n2月采购：500件×200元=100,000元\n合计库存：800件，130,000元\n加权平均单价：130,000÷800=162.50元/件\n销售成本：300×162.50=48,750元', stampText: '财务专用章' },
    ],
  },
  {
    date: '2026-02-06',
    title: '赊销商品',
    tags: ['商品销售', '往来管理'],
    difficulty: 2,
    description: '向甲公司赊销B类商品200件，不含税单价280元，不含税金额56,000元，增值税7,280元，价税合计63,280元，货款未收。',
    tip: '赊销时：借：应收账款-甲公司，贷：主营业务收入/应交税费-销项。赊销虽未收到现金，但仍需确认收入和增值税纳税义务。注意正确区分应收账款明细客户。',
    entries: [
      { subjectCode: '112201', summary: '赊销商品款未收', debit: 63280, credit: 0, explanation: '应收账款-甲公司增加记借方。赊销商品形成对甲公司的债权，需在信用期内催收。' },
      { subjectCode: '6001', summary: '赊销确认收入', debit: 0, credit: 56000, explanation: '主营业务收入增加记贷方。商品已发出，收入条件满足。依据《企业会计准则第14号——收入》第四条。' },
      { subjectCode: '222101', summary: '赊销增值税销项税额', debit: 0, credit: 7280, explanation: '销项税额增加记贷方。赊销也产生纳税义务，增值税不因未收款而免除。' },
    ],
    documents: [
      { type: 'invoice', label: '增值税专用发票（销项）', region: '上海', invoiceNo: '3100234572', date: '2026-02-06', buyer: '甲公司', seller: '本公司',
        lineItems: [{ name: 'B类商品', spec: '标准', unit: '件', qty: 200, price: 280, amount: 56000 }],
        totalAmount: 63280, taxRate: '13%', taxAmount: 7280, totalInWords: '陆万叁仟贰佰捌拾元整' },
      { type: 'text', label: '出库单', docTitle: '商品出库单', content: 'B类商品 200件 已出库并发货，承运人：顺丰物流。', signature: '仓库管理员 王强' },
    ],
  },
  {
    date: '2026-02-07',
    title: '支付采购运费',
    tags: ['商品采购', '费用管理'],
    difficulty: 1,
    description: '支付春节前采购A类商品发生的运输费2,000元，以现金支付。',
    tip: '商业企业的采购运费可以直接计入当期"销售费用"，这是与制造业不同的简化处理方式。金额较小的运费直接用现金支付即可。',
    entries: [
      { subjectCode: '6601', summary: '支付采购运费', debit: 2000, credit: 0, explanation: '销售费用增加记借方。商业企业的采购运费直接计入当期损益（销售费用），无需分摊到库存商品成本。依据《企业会计准则第1号——存货》应用指南，商品流通企业的进货费用金额较小的可直接计入当期损益。' },
      { subjectCode: '1001', summary: '支付采购运费', debit: 0, credit: 2000, explanation: '库存现金减少记贷方。现金支付运费，资产减少。' },
    ],
    documents: [
      { type: 'receipt', label: '运费发票', docTitle: '运输业增值税普通发票', date: '2026-02-07', totalAmount: 2000, stampText: 'XX物流公司 发票专用章',
        items: [{ name: '运输费（华强供应链→本公司仓库）', qty: 1, price: 2000, amount: 2000 }] },
    ],
  },

  // ═══════════════════════════════════════════
  // 第二阶段：节前结算（2/9 - 2/14）
  // ═══════════════════════════════════════════
  {
    date: '2026-02-09',
    title: '结转已销商品成本（赊销部分）',
    tags: ['商品销售', '仓存管理'],
    difficulty: 2,
    description: '结转赊销B类商品的成本。B类商品采用移动加权平均法计价：1月结存500件单价120元，本次采购300件单价150元，加权平均单价131.25元，销售200件，销售成本26,250元。',
    tip: '赊销商品同样需要同步结转成本，与现销的处理方式相同。配比原则要求收入与成本在同一会计期间确认。',
    entries: [
      { subjectCode: '6401', summary: '结转赊销商品成本', debit: 26250, credit: 0, explanation: '主营业务成本增加记借方。与赊销收入配比的成本结转。成本计算：(500×120+300×150)/800=131.25元/件，200件×131.25=26,250元。' },
      { subjectCode: '1405', summary: '结转赊销商品成本', debit: 0, credit: 26250, explanation: '库存商品减少记贷方。B类商品出库200件，存货减少。' },
    ],
    documents: [
      { type: 'text', label: '成本计算表', docTitle: '商品销售成本计算表（赊销部分）', content: '销售商品：B类商品\n销售数量：200件\n\n成本计算：\n1月结存：500件×120元=60,000元\n2月采购：300件×150元=45,000元\n合计库存：800件，105,000元\n加权平均单价：105,000÷800=131.25元/件\n销售成本：200×131.25=26,250元', stampText: '财务专用章' },
    ],
  },
  {
    date: '2026-02-10',
    title: '采购商品退货（质量问题）',
    tags: ['商品采购', '往来管理'],
    difficulty: 2,
    description: '发现上月赊购的B类商品中有30件存在质量问题，经与丙公司协商同意退货。不含税退货金额4,500元（30件×150元），增值税585元，价税合计5,085元，冲减应付丙公司账款。',
    tip: '采购退货的处理：冲减库存商品，同时冲减进项税额（红字）。借：应付账款（全额），贷：库存商品（不含税），借：应交税费-进项税额（红字负数）。退货后需让对方开具红字发票。',
    entries: [
      { subjectCode: '220201', summary: '退货冲减应付账款', debit: 5085, credit: 0, explanation: '应付账款-丙公司减少记借方。因商品质量问题退货，冲减对丙公司的债务。' },
      { subjectCode: '222101', summary: '退货冲减进项税额（红字）', debit: -585, credit: 0, explanation: '应交税费-应交增值税（进项税额）红字冲回。退货对应的进项税额不得抵扣，作红字冲减。收到对方开具的红字增值税专用发票后办理。' },
      { subjectCode: '1405', summary: '退货商品出库', debit: 0, credit: 4500, explanation: '库存商品减少记贷方。退回不合格商品，存货减少。退货金额30件×150元=4,500元。' },
    ],
    documents: [
      { type: 'invoice', label: '红字增值税专用发票', region: '江苏', invoiceNo: '3200678901-R', date: '2026-02-10', buyer: '本公司', seller: '丙公司',
        lineItems: [{ name: 'B类商品（退货）', spec: '标准', unit: '件', qty: -30, price: 150, amount: -4500 }],
        totalAmount: -5085, taxRate: '13%', taxAmount: -585, totalInWords: '负数伍仟零捌拾伍元整' },
      { type: 'text', label: '退货单', docTitle: '商品退货单', content: 'B类商品 30件 经检验存在质量问题，退货处理。质检员：李明。', signature: '质检部 李明 / 仓库管理员 王强' },
    ],
  },
  {
    date: '2026-02-11',
    title: '节前最后一波现销（微信收款）',
    tags: ['商品销售', '资金管理'],
    difficulty: 2,
    description: '春节前最后一波销售：销售A类商品200件，单价380元/件，不含税金额76,000元，增值税9,880元，价税合计85,880元，通过微信商户二维码收款。',
    tip: '微信收款属于"其他货币资金"（科目101204）。随着移动支付普及，越来越多的企业接受微信/支付宝收款。分录：借：其他货币资金-微信，贷：主营业务收入/应交税费-销项。',
    entries: [
      { subjectCode: '101204', summary: '微信收款销售商品', debit: 85880, credit: 0, explanation: '其他货币资金-微信账户增加记借方。通过微信商户二维码收款，资金存入微信商户账户。微信账户属于"其他货币资金"，不属于银行存款。' },
      { subjectCode: '6001', summary: '节前现销确认收入', debit: 0, credit: 76000, explanation: '主营业务收入增加记贷方。A类商品200件×380元=76,000元，销售收入确认。' },
      { subjectCode: '222101', summary: '现销增值税销项税额', debit: 0, credit: 9880, explanation: '销项税额增加记贷方。销售商品产生增值税纳税义务。' },
    ],
    documents: [
      { type: 'invoice', label: '增值税普通发票（销项）', region: '上海', invoiceNo: '3100234573', date: '2026-02-11', buyer: '散客（春节促销）', seller: '本公司',
        lineItems: [{ name: 'A类商品', spec: '标准', unit: '件', qty: 200, price: 380, amount: 76000 }],
        totalAmount: 85880, taxRate: '13%', taxAmount: 9880, totalInWords: '捌万伍仟捌佰捌拾元整' },
      { type: 'receipt', label: '微信收款截图', docTitle: '微信商户收款凭证', date: '2026-02-11', totalAmount: 85880, stampText: '微信支付 电子凭证',
        items: [{ name: 'A类商品销售', qty: 200, price: 380, amount: 76000 }, { name: '增值税', qty: 1, price: 9880, amount: 9880 }] },
    ],
  },
  {
    date: '2026-02-12',
    title: '支付销售运费',
    tags: ['商品销售', '费用管理'],
    difficulty: 1,
    description: '支付本月销售商品发生的运输费3,000元，通过工商银行转账支付。',
    tip: '销售过程中发生的运费属于"销售费用"，是企业为销售商品发生的必要支出。借：销售费用，贷：银行存款。',
    entries: [
      { subjectCode: '660102', summary: '支付销售运费', debit: 3000, credit: 0, explanation: '销售费用-运杂费增加记借方。销售商品发生的运输费属于销售环节费用，计入当期损益。' },
      { subjectCode: '100201', summary: '支付销售运费', debit: 0, credit: 3000, explanation: '银行存款减少记贷方。通过工行转账支付运费，资产减少。' },
    ],
    documents: [
      { type: 'receipt', label: '运费发票', docTitle: '运输业增值税普通发票', date: '2026-02-12', totalAmount: 3000, stampText: 'XX物流公司 发票专用章',
        items: [{ name: '销售商品运输费（春节配送）', qty: 1, price: 3000, amount: 3000 }] },
    ],
  },
  {
    date: '2026-02-13',
    title: '收到前欠货款',
    tags: ['往来管理', '资金管理'],
    difficulty: 1,
    description: '收到甲公司汇来的前欠货款63,280元（2月6日赊销款），已存入工商银行账户。',
    tip: '收到前欠货款时：借：银行存款，贷：应收账款-甲公司。注意及时核销应收账款明细账，确保客户往来余额准确。',
    entries: [
      { subjectCode: '100201', summary: '收到甲公司前欠货款', debit: 63280, credit: 0, explanation: '银行存款增加记借方。甲公司偿还赊销货款，资金回笼。' },
      { subjectCode: '112201', summary: '收到甲公司前欠货款', debit: 0, credit: 63280, explanation: '应收账款-甲公司减少记贷方。甲公司欠款已收回，债权结清。' },
    ],
    documents: [
      { type: 'bank', label: '收款回单', date: '2026-02-13', totalAmount: 63280, payer: '甲公司', payeeName: '本公司', content: '货款（发票No.3100234572）', refNo: 'HD202602130001' },
    ],
  },
  {
    date: '2026-02-14',
    title: '计提工资（含年终奖）',
    tags: ['工资社保'],
    difficulty: 2,
    description: '计提2月员工工资及春节年终奖：管理人员工资30,000元+年终奖10,000元=40,000元，销售人员工资20,000元+年终奖8,000元=28,000元，合计68,000元。',
    tip: '年终奖属于职工薪酬的一部分，也需要通过"应付职工薪酬"核算。年终奖与当月工资一起计提，分别计入管理费用和销售费用。注意年终奖的个税处理（教学简化不考虑个税）。',
    entries: [
      { subjectCode: '660203', summary: '计提管理工资及年终奖', debit: 40000, credit: 0, explanation: '管理费用-工资薪金增加记借方。管理人员2月工资30,000元+年终奖10,000元=40,000元。年终奖是企业对员工的年度奖励，属于工资薪金范畴。' },
      { subjectCode: '6601', summary: '计提销售工资及年终奖', debit: 28000, credit: 0, explanation: '销售费用增加记借方。销售人员2月工资20,000元+年终奖8,000元=28,000元。' },
      { subjectCode: '221101', summary: '计提本月工资及年终奖', debit: 0, credit: 68000, explanation: '应付职工薪酬-工资增加记贷方。计提形成对员工的负债，含当月工资及年终奖合计68,000元。依据《企业会计准则第9号——职工薪酬》第五条。' },
    ],
    documents: [
      { type: 'text', label: '工资表', docTitle: '2026年2月工资及年终奖汇总表', content: '管理人员：\n  基本工资：5人×6,000元=30,000元\n  年终奖：10,000元\n  小计：40,000元\n\n销售人员：\n  基本工资：4人×5,000元=20,000元\n  年终奖：8,000元\n  小计：28,000元\n\n合计：68,000元', stampText: '行政人事部章' },
    ],
  },
  {
    date: '2026-02-14',
    title: '发放工资（含年终奖）',
    tags: ['工资社保'],
    difficulty: 1,
    description: '通过工商银行转账发放2月员工工资及年终奖共计68,000元。',
    tip: '实际发放工资及年终奖时：借：应付职工薪酬，贷：银行存款。发放后冲减计提时确认的负债。年终奖与工资合并发放。',
    entries: [
      { subjectCode: '221101', summary: '发放工资及年终奖', debit: 68000, credit: 0, explanation: '应付职工薪酬-工资减少记借方。实际支付工资及年终奖，负债减少。' },
      { subjectCode: '100201', summary: '发放工资及年终奖', debit: 0, credit: 68000, explanation: '银行存款减少记贷方。通过银行代发工资及年终奖，资金划出。' },
    ],
    documents: [
      { type: 'bank', label: '代发工资回单', date: '2026-02-14', totalAmount: 68000, payer: '本公司', payeeName: '员工代发户', content: '2026年2月工资及年终奖', refNo: 'HD202602140001' },
    ],
  },

  // ═══════════════════════════════════════════
  // 第三阶段：节后恢复（2/16 - 2/21）
  // ═══════════════════════════════════════════
  {
    date: '2026-02-16',
    title: '节后补货（现购商品）',
    tags: ['商品采购', '税费'],
    difficulty: 2,
    description: '春节后补货：向华强供应链采购A类商品400件，不含税单价210元（因市场涨价），不含税金额84,000元，增值税10,920元，价税合计94,920元，以建设银行存款支付。',
    tip: '节后补货时商品采购价格可能因市场行情变化而波动。本批使用建设银行账户付款（科目100202），注意区分不同的银行账户。',
    entries: [
      { subjectCode: '1405', summary: '节后补货入库', debit: 84000, credit: 0, explanation: '库存商品增加记借方。A类商品400件×210元=84,000元入库，节后补货恢复库存。' },
      { subjectCode: '222101', summary: '补货进项税额', debit: 10920, credit: 0, explanation: '进项税额增加记借方。采购进项税=84,000×13%=10,920元，可抵扣销项。' },
      { subjectCode: '100202', summary: '支付补货款', debit: 0, credit: 94920, explanation: '银行存款-建设银行减少记贷方。以建行账户支付采购货款，注意与工行账户区分。' },
    ],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '上海', invoiceNo: '3100234574', date: '2026-02-16', buyer: '本公司', seller: '华强供应链有限公司',
        lineItems: [{ name: 'A类商品', spec: '标准', unit: '件', qty: 400, price: 210, amount: 84000 }],
        totalAmount: 94920, taxRate: '13%', taxAmount: 10920, totalInWords: '玖万肆仟玖佰贰拾元整' },
      { type: 'bank', label: '付款回单', date: '2026-02-16', totalAmount: 94920, payer: '本公司', payeeName: '华强供应链有限公司', content: '节后补货款', refNo: 'CCB202602160001' },
    ],
  },
  {
    date: '2026-02-17',
    title: '赊购商品（新供应商）',
    tags: ['商品采购', '往来管理'],
    difficulty: 2,
    description: '向丁公司赊购C类商品300件，不含税单价100元，不含税金额30,000元，增值税3,900元，价税合计33,900元，货款未付。商品已验收入库。',
    tip: '与新的供应商建立采购关系时，注意在应付账款下设置正确的明细科目。丁公司的应付账款科目编码为220202。赊购分录与之前相同：借：库存商品/应交税费-进项，贷：应付账款。',
    entries: [
      { subjectCode: '1405', summary: '赊购C商品入库', debit: 30000, credit: 0, explanation: '库存商品增加记借方。C类商品300件×100元=30,000元入库，新增商品品类。' },
      { subjectCode: '222101', summary: '赊购进项税额', debit: 3900, credit: 0, explanation: '进项税额增加记借方，可抵扣销项税。' },
      { subjectCode: '220202', summary: '赊购商品款未付', debit: 0, credit: 33900, explanation: '应付账款-丁公司增加记贷方。向丁公司赊购商品尚未付款，形成对新供应商的债务。' },
    ],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '浙江', invoiceNo: '3300789012', date: '2026-02-17', buyer: '本公司', seller: '丁公司',
        lineItems: [{ name: 'C类商品', spec: '标准', unit: '件', qty: 300, price: 100, amount: 30000 }],
        totalAmount: 33900, taxRate: '13%', taxAmount: 3900, totalInWords: '叁万叁仟玖佰元整' },
      { type: 'text', label: '入库单', docTitle: '商品入库单', content: 'C类商品 300件 已验收入库，质量合格。新品类首次入库。', signature: '仓库管理员 王强' },
    ],
  },
  {
    date: '2026-02-18',
    title: '节后现销商品（支付宝收款）',
    tags: ['商品销售', '资金管理'],
    difficulty: 2,
    description: '节后恢复经营：销售A类商品150件，单价400元/件，不含税金额60,000元，增值税7,800元，价税合计67,800元，通过支付宝商户二维码收款。',
    tip: '支付宝收款与微信收款类似，使用"其他货币资金-支付宝"科目（101205）。借：其他货币资金-支付宝，贷：主营业务收入/应交税费-销项。注意区分不同的第三方支付平台。',
    entries: [
      { subjectCode: '101205', summary: '支付宝收款销售商品', debit: 67800, credit: 0, explanation: '其他货币资金-支付宝账户增加记借方。通过支付宝商户二维码收款，资金存入支付宝账户。与微信账户（101204）分属不同科目。' },
      { subjectCode: '6001', summary: '节后现销确认收入', debit: 0, credit: 60000, explanation: '主营业务收入增加记贷方。A类商品150件×400元=60,000元，节后恢复经营销售。' },
      { subjectCode: '222101', summary: '现销增值税销项税额', debit: 0, credit: 7800, explanation: '销项税额增加记贷方。销售商品产生增值税纳税义务。' },
    ],
    documents: [
      { type: 'invoice', label: '增值税普通发票（销项）', region: '上海', invoiceNo: '3100234575', date: '2026-02-18', buyer: '万家超市', seller: '本公司',
        lineItems: [{ name: 'A类商品', spec: '标准', unit: '件', qty: 150, price: 400, amount: 60000 }],
        totalAmount: 67800, taxRate: '13%', taxAmount: 7800, totalInWords: '陆万柒仟捌佰元整' },
      { type: 'receipt', label: '支付宝收款凭证', docTitle: '支付宝商户收款凭证', date: '2026-02-18', totalAmount: 67800, stampText: '支付宝 电子凭证',
        items: [{ name: 'A类商品销售', qty: 150, price: 400, amount: 60000 }, { name: '增值税', qty: 1, price: 7800, amount: 7800 }] },
    ],
  },
  {
    date: '2026-02-19',
    title: '赊销新商品',
    tags: ['商品销售', '往来管理'],
    difficulty: 2,
    description: '向乙公司赊销C类商品200件，不含税单价180元，不含税金额36,000元，增值税4,680元，价税合计40,680元，货款未收。',
    tip: '向不同客户赊销时注意应收账款明细科目的正确使用。乙公司的应收账款科目编码为112202。新商品的定价需考虑采购成本和市场行情。',
    entries: [
      { subjectCode: '112202', summary: '赊销C商品款未收', debit: 40680, credit: 0, explanation: '应收账款-乙公司增加记借方。赊销C类商品形成对乙公司的债权。' },
      { subjectCode: '6001', summary: '赊销C商品确认收入', debit: 0, credit: 36000, explanation: '主营业务收入增加记贷方。C类商品200件×180元=36,000元，收入确认。' },
      { subjectCode: '222101', summary: '赊销增值税销项税额', debit: 0, credit: 4680, explanation: '销项税额增加记贷方。赊销商品产生增值税纳税义务。' },
    ],
    documents: [
      { type: 'invoice', label: '增值税专用发票（销项）', region: '上海', invoiceNo: '3100234576', date: '2026-02-19', buyer: '乙公司', seller: '本公司',
        lineItems: [{ name: 'C类商品', spec: '标准', unit: '件', qty: 200, price: 180, amount: 36000 }],
        totalAmount: 40680, taxRate: '13%', taxAmount: 4680, totalInWords: '肆万零陆佰捌拾元整' },
      { type: 'text', label: '出库单', docTitle: '商品出库单', content: 'C类商品 200件 已出库并发货，承运人：德邦物流。', signature: '仓库管理员 王强' },
    ],
  },
  {
    date: '2026-02-20',
    title: '结转已销商品成本（C商品）',
    tags: ['商品销售', '仓存管理'],
    difficulty: 2,
    description: '结转赊销C类商品的成本。C类商品为新品，采购单价100元/件，销售200件，销售成本20,000元。',
    tip: '新商品首次结转成本时，加权平均单价即为采购单价。后续有多次采购后需重新计算加权平均单价。',
    entries: [
      { subjectCode: '6401', summary: '结转C商品销售成本', debit: 20000, credit: 0, explanation: '主营业务成本增加记借方。C类商品销售成本=200件×100元=20,000元。新品首次销售，成本即为采购单价。' },
      { subjectCode: '1405', summary: '结转C商品销售成本', debit: 0, credit: 20000, explanation: '库存商品减少记贷方。C类商品出库200件，存货减少。' },
    ],
    documents: [
      { type: 'text', label: '成本计算表', docTitle: '商品销售成本计算表（C商品）', content: '销售商品：C类商品\n销售数量：200件\n\n成本计算：\n本期采购：300件×100元=30,000元\n加权平均单价：30,000÷300=100元/件\n销售成本：200×100=20,000元', stampText: '财务专用章' },
    ],
  },
  {
    date: '2026-02-21',
    title: '收到前欠货款',
    tags: ['往来管理', '资金管理'],
    difficulty: 1,
    description: '收到乙公司汇来的前欠货款40,680元（2月19日赊销款），已存入工商银行账户。',
    tip: '及时催收赊销货款是往来管理的重要工作。收到货款时：借：银行存款，贷：应收账款-乙公司。',
    entries: [
      { subjectCode: '100201', summary: '收到乙公司前欠货款', debit: 40680, credit: 0, explanation: '银行存款增加记借方。乙公司偿还赊销货款，资金回笼。' },
      { subjectCode: '112202', summary: '收到乙公司前欠货款', debit: 0, credit: 40680, explanation: '应收账款-乙公司减少记贷方。乙公司欠款已收回，债权结清。' },
    ],
    documents: [
      { type: 'bank', label: '收款回单', date: '2026-02-21', totalAmount: 40680, payer: '乙公司', payeeName: '本公司', content: '货款（发票No.3100234576）', refNo: 'HD202602210001' },
    ],
  },

  // ═══════════════════════════════════════════
  // 第四阶段：月末（2/23 - 2/28）
  // ═══════════════════════════════════════════
  {
    date: '2026-02-23',
    title: '报销差旅费',
    tags: ['费用管理'],
    difficulty: 1,
    description: '销售人员报销春节前后出差差旅费2,800元（交通费1,600元、住宿费1,200元），以现金支付。',
    tip: '差旅费根据员工所属部门计入相应费用科目。销售人员出差计入"销售费用"，管理人员出差计入"管理费用"。',
    entries: [
      { subjectCode: '6601', summary: '报销差旅费', debit: 2800, credit: 0, explanation: '销售费用增加记借方。销售人员出差的差旅费属于销售环节支出，计入销售费用。' },
      { subjectCode: '1001', summary: '报销差旅费', debit: 0, credit: 2800, explanation: '库存现金减少记贷方。现金支付报销款。' },
    ],
    documents: [
      { type: 'receipt', label: '差旅费报销单', docTitle: '差旅费报销单', date: '2026-02-23', totalAmount: 2800, stampText: '财务审核专用章',
        items: [{ name: '火车票（上海→杭州）', qty: 2, price: 400, amount: 800 }, { name: '火车票（杭州→上海）', qty: 2, price: 400, amount: 800 }, { name: '住宿费', qty: 2, price: 600, amount: 1200 }] },
    ],
  },
  {
    date: '2026-02-24',
    title: '支付广告费',
    tags: ['费用管理'],
    difficulty: 1,
    description: '支付2月网络平台广告推广费6,000元，以工商银行存款支付。',
    tip: '广告费属于"销售费用"下的广告费明细科目（660101）。借：销售费用-广告费，贷：银行存款。',
    entries: [
      { subjectCode: '660101', summary: '支付广告费', debit: 6000, credit: 0, explanation: '销售费用-广告费增加记借方。2月网络平台广告推广支出，计入销售费用。' },
      { subjectCode: '100201', summary: '支付广告费', debit: 0, credit: 6000, explanation: '银行存款减少记贷方。支付广告费用，资金减少。' },
    ],
    documents: [
      { type: 'receipt', label: '广告费发票', docTitle: '增值税普通发票', date: '2026-02-24', totalAmount: 6000, stampText: 'XX网络科技有限公司 发票专用章',
        items: [{ name: '搜索引擎推广服务（2月）', qty: 1, price: 6000, amount: 6000 }] },
    ],
  },
  {
    date: '2026-02-24',
    title: '计提短期借款利息',
    tags: ['费用管理'],
    difficulty: 2,
    description: '计提本月短期借款利息。1月3日向工商银行借入短期借款500,000元，年利率4.35%，月利息费用=500,000×4.35%÷12=1,812.50元。',
    tip: '短期借款利息应按月计提，计入"财务费用"。如果是到期一次还本付息，计提时：借：财务费用，贷：其他应付款（或应付利息）。借款利息=本金×年利率÷12。',
    entries: [
      { subjectCode: '6603', summary: '计提短期借款利息', debit: 1812.5, credit: 0, explanation: '财务费用增加记借方。短期借款500,000元，月利息=500,000×4.35%÷12=1,812.50元。利息费用计入当期损益。依据《企业会计准则第17号——借款费用》第四条。' },
      { subjectCode: '2241', summary: '计提短期借款利息', debit: 0, credit: 1812.5, explanation: '其他应付款增加记贷方。计提的借款利息尚未支付，形成对其他应付款的负债。到期还本付息时冲减。' },
    ],
    documents: [
      { type: 'text', label: '利息计算表', docTitle: '短期借款利息计算表', content: '借款本金：500,000元\n年利率：4.35%\n月利息：500,000×4.35%÷12=1,812.50元\n\n借款合同：工行流动资金贷款\n借款日期：2026年1月3日\n到期日期：2026年7月2日\n付息方式：到期一次性还本付息', stampText: '财务专用章' },
    ],
  },
  {
    date: '2026-02-25',
    title: '计提固定资产折旧',
    tags: ['费用管理'],
    difficulty: 2,
    description: '计提本月固定资产折旧。房屋建筑物原值500,000元月折旧率0.2%（直线法），办公设备原值60,000元月折旧率0.8%，运输设备原值120,000元月折旧率0.6%。所有资产均为管理部门使用。',
    tip: '固定资产折旧按使用部门计入费用。管理部门使用的固定资产计提折旧计入"管理费用"。注意不同类型固定资产的折旧率不同。累计折旧是固定资产的抵减科目。',
    entries: [
      { subjectCode: '6602', summary: '计提折旧（管理部门）', debit: 2200, credit: 0, explanation: '管理费用增加记借方。本月折旧合计：房屋500,000×0.2%=1,000元+办公设备60,000×0.8%=480元+运输设备120,000×0.6%=720元=2,200元。' },
      { subjectCode: '1602', summary: '计提折旧', debit: 0, credit: 2200, explanation: '累计折旧增加记贷方。累计折旧是固定资产的抵减科目，贷方表示增加。固定资产账面价值=原值-累计折旧。' },
    ],
    documents: [
      { type: 'text', label: '折旧计算表', docTitle: '固定资产折旧计算表', content: '房屋建筑物：原值500,000×月折旧率0.2%=1,000元\n办公设备：原值60,000×月折旧率0.8%=480元\n运输设备：原值120,000×月折旧率0.6%=720元\n合计：2,200元\n折旧方法：直线法（年限平均法）', stampText: '财务专用章' },
    ],
  },
  {
    date: '2026-02-26',
    title: '计提城建税及教育费附加',
    tags: ['税费'],
    difficulty: 2,
    description: '根据本月应交增值税计算并计提城市维护建设税（税率7%）和教育费附加（税率3%）。本月销项税额43,290元，进项税额33,670元，退货冲减进项税额585元，应交增值税=43,290-(33,670-585)=10,205元。',
    tip: '城建税和教育费附加以实际应缴纳的增值税为计税依据。城建税税率7%（城市），教育费附加3%。注意计算应交增值税时要考虑进项税额转出/退货冲减等调整因素。',
    entries: [
      { subjectCode: '6403', summary: '计提城建税及教育费附加', debit: 1020.5, credit: 0, explanation: '税金及附加增加记借方。城建税和教育费附加是附加税费，计入税金及附加科目。依据《城市维护建设税暂行条例》第四条。' },
      { subjectCode: '222103', summary: '计提应交城建税', debit: 0, credit: 714.35, explanation: '应交税费-应交城市维护建设税增加记贷方。应交城建税=应交增值税×7%=10,205×7%=714.35元。' },
      { subjectCode: '222104', summary: '计提应交教育费附加', debit: 0, credit: 306.15, explanation: '应交税费-应交教育费附加增加记贷方。应交教育费附加=应交增值税×3%=10,205×3%=306.15元。' },
    ],
    documents: [
      { type: 'text', label: '税金计算表', docTitle: '附加税费计算表（2月）', content: '计税依据：\n  销项税额合计：13,650+7,280+9,880+7,800+4,680=43,290元\n  进项税额合计：13,000+5,850+10,920+3,900=33,670元\n  退货冲减进项：585元\n  应交增值税：43,290-(33,670-585)=10,205元\n\n附加税费：\n  城市维护建设税：10,205×7%=714.35元\n  教育费附加：10,205×3%=306.15元', stampText: '财务专用章' },
    ],
  },
  {
    date: '2026-02-27',
    title: '期末结转损益',
    tags: ['期末'],
    difficulty: 3,
    description: '月末结转所有损益类科目余额至"本年利润"，计算本月净利润/亏损。',
    tip: '期末结转损益是每月必须做的重要步骤。先将收入类科目结转至本年利润贷方，再将费用类科目结转至本年利润借方。差额即为本月利润（贷方余额）或亏损（借方余额）。结转后损益类科目余额为零。',
    entries: [
      { subjectCode: '6001', summary: '结转主营业务收入', debit: 333000, credit: 0, explanation: '主营业务收入结转至本年利润。收入类科目期末余额转出，余额归零。本月收入合计：105,000+56,000+76,000+60,000+36,000=333,000元。' },
      { subjectCode: '4103', summary: '结转主营业务收入', debit: 0, credit: 333000, explanation: '本年利润增加记贷方。收入结转至本年利润，所有者权益增加。' },
      { subjectCode: '4103', summary: '结转费用类科目', debit: 181833, credit: 0, explanation: '本年利润减少记借方。将本期所有费用转入本年利润：主营业务成本95,000+销售费用41,800+管理费用42,200+财务费用1,812.50+税金及附加1,020.50=181,833元。本月净利润=333,000-181,833=151,167元。' },
      { subjectCode: '6401', summary: '结转主营业务成本', debit: 0, credit: 95000, explanation: '主营业务成本转出95,000元，余额归零。含促销成本48,750+赊销成本26,250+C商品成本20,000。' },
      { subjectCode: '6601', summary: '结转销售费用', debit: 0, credit: 41800, explanation: '销售费用转出41,800元，余额归零。含采购运费2,000+销售运费3,000+业务提成28,000+差旅费2,800+广告费6,000。' },
      { subjectCode: '6602', summary: '结转管理费用', debit: 0, credit: 42200, explanation: '管理费用转出42,200元，余额归零。含管理人员工资及年终奖40,000+折旧2,200。' },
      { subjectCode: '6603', summary: '结转财务费用', debit: 0, credit: 1812.5, explanation: '财务费用转出1,812.50元，余额归零。为短期借款利息。' },
      { subjectCode: '6403', summary: '结转税金及附加', debit: 0, credit: 1020.5, explanation: '税金及附加转出1,020.50元，余额归零。含城建税714.35+教育费附加306.15。' },
    ],
    documents: [
      { type: 'text', label: '损益计算表', docTitle: '2026年2月损益计算表', content: '一、营业收入：333,000元\n  主营业务收入：333,000元\n减：营业成本：95,000元\n  主营业务成本：95,000元\n减：销售费用：41,800元\n减：管理费用：42,200元\n减：财务费用：1,812.50元\n减：税金及附加：1,020.50元\n二、营业利润：151,167元\n三、利润总额：151,167元', stampText: '财务专用章' },
    ],
  },
  // ═══════════════════════════════════════════
  // 出纳专属任务（平行于会计任务）
  // ═══════════════════════════════════════════
  {
    date: '2026-02-01',
    title: '月初库存现金清点与日记账启用',
    tags: ['出纳'],
    difficulty: 1,
    role: 'cashier',
    description: '2月第一个工作日，出纳清点保险柜库存现金余额，确认1月末余额无误后，启用2月份现金日记账和银行存款日记账新账页。',
    tip: '每月初出纳的第一项工作就是清点库存现金并与账面核对。确认无误后启用新账页登记本月业务。这是出纳"日清月结"制度的基础，也是会计基础工作的要求。',
    entries: [],
    documents: [
      { type: 'text', label: '现金日记账', docTitle: '现金日记账（2026年2月）', stampText: '现金日记账',
        content: `现金日记账
━━━━━━━━━━━━━━━━━━━━━━━━━
2月期初余额：2,400.00
（承1月末余额）

注：已与总账核对一致。
核对人：王出纳
核对日期：2026年2月1日` },
      { type: 'text', label: '库存现金盘点表', docTitle: '库存现金盘点表', stampText: '财务专用章',
        content: `盘点日期：2026年2月1日
账面余额：2,400.00
实盘金额：2,400.00
盘点结果：相符✓

盘点人：王出纳
监盘人：李会计` },
    ],
  },
  {
    date: '2026-02-02',
    title: '春节备货采购款转账支付',
    tags: ['出纳', '商品采购'],
    difficulty: 1,
    role: 'cashier',
    description: '采购部审批的春节备货付款申请已到财务，出纳核对发票和入库单后，通过网银向华强供应链支付采购款113,000元（含税）。',
    tip: '春节前备货金额较大，出纳需格外谨慎：①核对发票金额与付款申请单一致②确认收款方账户信息③制单后必须换人复核（双人操作）④保存回单并登记银行日记账。大额付款（超10万元）建议使用U盾+双人复核。',
    entries: [
      { subjectCode: '1405', summary: '支付春节备货款-商品入库', debit: 100000, credit: 0, explanation: '库存商品增加记借方。出纳执行转账操作，支付A类商品500件×200元=100,000元的采购货款。' },
      { subjectCode: '222101', summary: '支付春节备货款-进项税', debit: 13000, credit: 0, explanation: '进项税额增加记借方。增值税专用发票上的进项税额13,000元由会计抵扣处理。' },
      { subjectCode: '100201', summary: '支付春节备货款', debit: 0, credit: 113000, explanation: '银行存款减少记贷方。工商银行账户支付113,000元，银行日记账登记"付"方。春节大额采购支出。' },
    ],
    documents: [
      { type: 'bank', label: '转账回单', date: '2026-02-02', totalAmount: 113000, payer: '本公司', payerAccount: '6222 0200 **** 8888', payeeName: '华强供应链有限公司', payeeAccount: '6222 0200 **** 7777', content: '春节备货款', refNo: 'HD202602020001' },
      { type: 'text', label: '付款申请单', docTitle: '大额付款申请单（春节备货）', content: '收款单位：华强供应链有限公司\n金额：113,000.00元\n审批：采购经理☑  财务主管☑  总经理☑\n备注：春节前批量采购A类商品500件，发票及入库单已核对无误。', signature: '出纳：王出纳  复核：李会计' },
    ],
  },
  {
    date: '2026-02-03',
    title: '提取备用金——春节现金备用',
    tags: ['出纳'],
    difficulty: 1,
    role: 'cashier',
    description: '春节期间可能有用现金支付红包、零星采购等需求，出纳填写现金支票从工商银行提取备用金10,000元，增加库存现金储备。',
    tip: '春节是最常用的现金支付场景（红包、慰问金等），出纳需提前备好现金。办理流程同平常提取备用金：①填写现金支票→②银行取现→③入保险柜→④登记现金日记账。春节前后现金需求量大，应提前安排。',
    entries: [
      { subjectCode: '1001', summary: '提取备用金（春节现金）', debit: 10000, credit: 0, explanation: '库存现金增加记借方。春节前增加现金储备10,000元，用于节日期间可能发生的现金支出。' },
      { subjectCode: '100201', summary: '提取备用金（春节现金）', debit: 0, credit: 10000, explanation: '银行存款减少记贷方。提取现金10,000元，工商银行账户减少。登记银行日记账"付"方。' },
    ],
    documents: [
      { type: 'receipt', label: '现金支票存根', docTitle: '中国工商银行现金支票存根', date: '2026-02-03', totalAmount: 10000, stampText: '预留印鉴',
        items: [{ name: '支票号码：ZZ123457', qty: 1, price: 10000, amount: 10000 }] },
      { type: 'text', label: '春节现金需求计划', docTitle: '春节现金使用计划', content: '预计用途：\n  春节红包：5,000元\n  节日慰问采购：3,000元\n  零星现金支出：2,000元\n合计：10,000元\n\n审批：财务主管☑', signature: '出纳：王出纳' },
    ],
  },
  {
    date: '2026-02-07',
    title: '现金支付采购运费',
    tags: ['出纳', '费用管理'],
    difficulty: 1,
    role: 'cashier',
    description: 'XX物流公司送来节前采购商品的运费发票2,000元，出纳审核发票无误后，以备用金现金支付。',
    tip: '现金支付小额运费时注意：①发票必须为公司全称抬头②核对金额无误③支付后加盖"现金付讫"章防止重复报销④登记现金日记账。出纳应定期检查备用金余额，不足时及时补足。',
    entries: [
      { subjectCode: '6601', summary: '现金支付采购运费', debit: 2000, credit: 0, explanation: '销售费用增加记借方。商业企业采购运费直接计入销售费用，出纳以现金支付后加盖"现金付讫"章。' },
      { subjectCode: '1001', summary: '现金支付采购运费', debit: 0, credit: 2000, explanation: '库存现金减少记贷方。出纳从备用金中支付运费2,000元，现金日记账登记"付"方。' },
    ],
    documents: [
      { type: 'receipt', label: '运费发票', docTitle: '运输业增值税普通发票', date: '2026-02-07', totalAmount: 2000, stampText: 'XX物流公司 发票专用章',
        items: [{ name: '运输费（华强供应链→本公司仓库）', qty: 1, price: 2000, amount: 2000 }] },
    ],
  },
  {
    date: '2026-02-10',
    title: '采购退货收到退款（银行确认）',
    tags: ['出纳', '商品采购'],
    difficulty: 1,
    role: 'cashier',
    description: '丙公司因商品质量问题同意退货，已将退款5,085元汇入工商银行账户。出纳查询银行账户确认到账，并登记银行日记账。',
    tip: '采购退款的出纳处理：①收到银行收款通知后确认到账金额②核对是否与退货金额一致（5,085元）③登记银行日记账④通知会计已收到退款⑤将银行回单移交会计做账。注意：退款对应的进项税转出由会计处理，出纳只需确认资金到账。',
    entries: [
      { subjectCode: '100201', summary: '收到采购退货退款', debit: 5085, credit: 0, explanation: '银行存款增加记借方。丙公司退回的采购退货款5,085元到账，银行日记账登记"收"方。出纳需确认金额与退货单一致。' },
      { subjectCode: '220201', summary: '收到采购退货退款', debit: 0, credit: 5085, explanation: '应付账款-丙公司减少记贷方。退货后冲减对丙公司的应付账款，负债减少。' },
    ],
    documents: [
      { type: 'bank', label: '收款回单', date: '2026-02-10', totalAmount: 5085, payer: '丙公司', payeeName: '本公司', content: '退货退款（红票No.3200678901-R）', refNo: 'HD202602100010' },
    ],
  },
  {
    date: '2026-02-11',
    title: '微信收款提现到银行',
    tags: ['出纳'],
    difficulty: 2,
    role: 'cashier',
    description: '春节前微信商户账户收到大量销售款85,880元，余额较高。出纳通过微信商户平台将微信余额提现到工商银行账户（提现手续费0.1%）。',
    tip: '微信收款后的提现操作：①登录微信商户平台→②申请提现→③输入提现金额→④确认提现到绑定的银行账户→⑤银行到账后查收。微信提现一般T+1到账，提现手续费0.1%。提现后：借：银行存款，贷：其他货币资金-微信。手续费单独确认。',
    entries: [
      { subjectCode: '100201', summary: '微信提现到银行', debit: 85880, credit: 0, explanation: '银行存款增加记借方。将微信商户账户余额提现至工商银行账户，资金从第三方支付平台转入银行。' },
      { subjectCode: '101204', summary: '微信提现到银行', debit: 0, credit: 85880, explanation: '其他货币资金-微信账户减少记贷方。微信余额转出至银行账户，微信账户余额减少。' },
    ],
    documents: [
      { type: 'bank', label: '提现到账回单', date: '2026-02-11', totalAmount: 85880, payer: '微信商户平台', payeeName: '本公司', content: '微信收款提现', refNo: 'WX202602110001' },
      { type: 'receipt', label: '微信提现记录', docTitle: '微信商户提现凭证', date: '2026-02-11', totalAmount: 85880, stampText: '微信支付 电子凭证',
        items: [{ name: '微信余额提现', qty: 1, price: 85880, amount: 85880 }] },
    ],
  },
  {
    date: '2026-02-12',
    title: '销售运费银行转账支付',
    tags: ['出纳', '费用管理'],
    difficulty: 1,
    role: 'cashier',
    description: '收到XX物流公司发来的春节配送运费发票3,000元，出纳审核后通过网银转账支付。',
    tip: '支付物流运费时出纳需核对：①发票开具内容为"运输服务"②发票金额与合同或实际配送量一致③收款方账户信息准确。春节前后运费可能上涨，需关注单价是否合理。',
    entries: [
      { subjectCode: '660102', summary: '支付销售运费', debit: 3000, credit: 0, explanation: '销售费用-运杂费增加记借方。春节销售配送产生的运费，出纳办理银行转账支付。' },
      { subjectCode: '100201', summary: '支付销售运费', debit: 0, credit: 3000, explanation: '银行存款减少记贷方。出纳通过网银支付运费3,000元，银行日记账登记"付"方。' },
    ],
    documents: [
      { type: 'bank', label: '转账回单', date: '2026-02-12', totalAmount: 3000, payer: '本公司', payerAccount: '6222 0200 **** 8888', payeeName: 'XX物流公司', content: '春节配送运费', refNo: 'HD202602120020' },
      { type: 'receipt', label: '运费发票', docTitle: '运输业增值税普通发票', date: '2026-02-12', totalAmount: 3000, stampText: 'XX物流公司 发票专用章',
        items: [{ name: '春节商品配送运输服务', qty: 1, price: 3000, amount: 3000 }] },
    ],
  },
  {
    date: '2026-02-13',
    title: '甲公司回款到账确认',
    tags: ['出纳', '往来管理'],
    difficulty: 1,
    role: 'cashier',
    description: '甲公司汇来前欠货款63,280元，出纳查询银行账户确认到账，打印电子回单并登记银行存款日记账。',
    tip: '客户回款确认是出纳的日常高频工作。注意：①核对汇款方名称是否为甲公司②汇款金额是否与应收金额一致③回单摘要中的发票号是否匹配④及时通知会计核销应收账款。出纳需保留回款清单供月末对账使用。',
    entries: [
      { subjectCode: '100201', summary: '甲公司回款到账', debit: 63280, credit: 0, explanation: '银行存款增加记借方。甲公司汇来前欠货款63,280元到账，确认资金已入工商银行账户。' },
      { subjectCode: '112201', summary: '甲公司回款到账', debit: 0, credit: 63280, explanation: '应收账款-甲公司减少记贷方。甲公司欠款已收回，债权结清。出纳将回单移交会计做账。' },
    ],
    documents: [
      { type: 'bank', label: '收款回单', date: '2026-02-13', totalAmount: 63280, payer: '甲公司', payerAccount: '6222 0200 **** 2222', payeeName: '本公司', payeeAccount: '6222 0200 **** 8888', content: '货款（发票No.3100234572）', refNo: 'HD202602130001' },
    ],
  },
  {
    date: '2026-02-14',
    title: '部分年终奖现金发放',
    tags: ['出纳', '工资社保'],
    difficulty: 1,
    role: 'cashier',
    description: '经公司决定，每位员工的年终奖中500元以现金红包形式发放（取"吉利"之意）。出纳从备用金中准备现金红包，员工签字领取。现金发放部分合计4,500元（9人×500元）。',
    tip: '现金发放年终奖的注意事项：①编制"年终奖现金发放表"由员工本人签字确认②发放时需两名以上工作人员在场③发放完成后将签字表作为原始凭证④剩余备用金及时送存银行。现金发放必须做到手续完备、账目清楚。',
    entries: [
      { subjectCode: '221101', summary: '年终奖现金发放', debit: 4500, credit: 0, explanation: '应付职工薪酬减少记借方。现金发放年终奖4,500元（9人×500元），冲减应付职工薪酬负债。' },
      { subjectCode: '1001', summary: '年终奖现金发放', debit: 0, credit: 4500, explanation: '库存现金减少记贷方。出纳从备用金中发放现金红包4,500元，现金日记账登记"付"方。员工签字表作为原始凭证。' },
    ],
    documents: [
      { type: 'receipt', label: '现金发放表', docTitle: '春节年终奖现金发放签收表', date: '2026-02-14', totalAmount: 4500, stampText: '财务专用章',
        items: [{ name: '管理人员（5人×500元）', qty: 5, price: 500, amount: 2500 }, { name: '销售人员（4人×500元）', qty: 4, price: 500, amount: 2000 }] },
      { type: 'text', label: '发放记录', docTitle: '现金发放说明', content: '经公司管理层决定，2026年春节年终奖以"银行转账+现金红包"方式发放。其中银行代发63,500元，现金红包4,500元（每人500元寓意"五福临门"）。', signature: '财务主管审批☑' },
    ],
  },
  {
    date: '2026-02-14',
    title: '银行代发工资操作',
    tags: ['出纳', '工资社保'],
    difficulty: 2,
    role: 'cashier',
    description: '除现金红包外，剩余年终奖及工资63,500元（68,000-4,500）通过银行代发方式发放。出纳整理工资明细文件后，通过企业网银上传并提交代发。',
    tip: '银行代发工资的规范操作：①从HR系统导出工资明细（含姓名、银行卡号、金额）②登录网银选择"代发工资"③上传明细文件④制单提交⑤换人复核⑥确认发送成功⑦打印代发回单。注意：代发数据必须与工资表一致，发送前仔细核对总金额。',
    entries: [
      { subjectCode: '221101', summary: '银行代发工资', debit: 63500, credit: 0, explanation: '应付职工薪酬减少记借方。通过银行代发工资（不含现金红包部分），冲减应付职工薪酬负债。' },
      { subjectCode: '100201', summary: '银行代发工资', debit: 0, credit: 63500, explanation: '银行存款减少记贷方。工商银行账户划出63,500元用于代发工资及年终奖。附代发工资回单。' },
    ],
    documents: [
      { type: 'bank', label: '代发工资回单', date: '2026-02-14', totalAmount: 63500, payer: '本公司', payerAccount: '6222 0200 **** 8888', payeeName: '员工代发工资户', content: '2月工资及年终奖（银行代发部分）', refNo: 'HD202602140001' },
      { type: 'text', label: '代发明细', docTitle: '银行代发工资汇总', content: '总金额：63,500.00元\n工资部分：59,000元 + 年终奖代发部分：4,500元\n现金发放：4,500元（已单独处理）\n发放合计：68,000元 ✓ 与工资表一致', signature: '制单：王出纳  复核：李会计' },
    ],
  },
  {
    date: '2026-02-16',
    title: '节后补货建行转账付款',
    tags: ['出纳', '商品采购'],
    difficulty: 1,
    role: 'cashier',
    description: '春节后补货采购A类商品400件，通过建设银行账户向华强供应链支付货款94,920元（含税）。出纳登录建行网银办理转账。',
    tip: '企业开立了多个银行账户时，出纳需根据付款计划选择使用哪个账户支付。本笔使用建设银行账户（科目100202），注意不要与工商银行账户混淆。操作流程与工行相同，但需使用不同的U盾和登录密码。',
    entries: [
      { subjectCode: '1405', summary: '建行支付补货款', debit: 84000, credit: 0, explanation: '库存商品增加记借方。节后补货A类商品400件×210元=84,000元入库。' },
      { subjectCode: '222101', summary: '建行支付补货款-进项税', debit: 10920, credit: 0, explanation: '进项税额增加记借方。采购进项税=84,000×13%=10,920元。' },
      { subjectCode: '100202', summary: '建行支付补货款', debit: 0, credit: 94920, explanation: '银行存款-建设银行减少记贷方。出纳通过建行网银支付94,920元，建行日记账登记"付"方。注意区分不同银行的日记账。' },
    ],
    documents: [
      { type: 'bank', label: '建行转账回单', date: '2026-02-16', totalAmount: 94920, payer: '本公司', payerAccount: '6222 0200 **** 9999', payeeName: '华强供应链有限公司', payeeAccount: '6222 0200 **** 7777', content: '节后补货款', refNo: 'CCB202602160001' },
      { type: 'text', label: '付款审批单', docTitle: '付款审批单', content: '收款方：华强供应链有限公司\n金额：94,920.00元\n付款账户：建设银行（6222 **** 9999）\n审批：采购经理☑  财务主管☑', signature: '出纳：王出纳  复核：李会计' },
    ],
  },
  {
    date: '2026-02-18',
    title: '支付宝收款提现到银行',
    tags: ['出纳'],
    difficulty: 2,
    role: 'cashier',
    description: '节后支付宝商户账户收到销售款67,800元，出纳通过支付宝商户平台将余额提现至工商银行账户。',
    tip: '支付宝提现操作与微信类似：①登录支付宝商户平台→②申请提现→③确认提现金额和到账账户→④提交后一般T+1到账。提现操作与微信提现一样：借：银行存款，贷：其他货币资金-支付宝。出纳需分平台管理第三方支付账户余额。',
    entries: [
      { subjectCode: '100201', summary: '支付宝提现到银行', debit: 67800, credit: 0, explanation: '银行存款增加记借方。将支付宝商户余额提现至工商银行账户。' },
      { subjectCode: '101205', summary: '支付宝提现到银行', debit: 0, credit: 67800, explanation: '其他货币资金-支付宝减少记贷方。支付宝账户余额转出至银行。' },
    ],
    documents: [
      { type: 'bank', label: '提现到账回单', date: '2026-02-18', totalAmount: 67800, payer: '支付宝商户平台', payeeName: '本公司', content: '支付宝收款提现', refNo: 'ZFB202602180001' },
      { type: 'receipt', label: '支付宝提现记录', docTitle: '支付宝商户提现凭证', date: '2026-02-18', totalAmount: 67800, stampText: '支付宝 电子凭证',
        items: [{ name: '支付宝余额提现', qty: 1, price: 67800, amount: 67800 }] },
    ],
  },
  {
    date: '2026-02-21',
    title: '乙公司回款到账确认',
    tags: ['出纳', '往来管理'],
    difficulty: 1,
    role: 'cashier',
    description: '乙公司汇来前欠货款40,680元，出纳确认到账后登记银行日记账，并通知会计核销应收账款。',
    tip: '回款确认的核心操作：①查看到账金额是否与应收一致②检查汇款人账户信息确认是乙公司汇款③打印电子回单④登记银行日记账⑤移交会计做账。多个客户回款时需逐笔核对，防止串户。',
    entries: [
      { subjectCode: '100201', summary: '乙公司回款到账', debit: 40680, credit: 0, explanation: '银行存款增加记借方。乙公司前欠货款40,680元到账，银行日记账登记"收"方。' },
      { subjectCode: '112202', summary: '乙公司回款到账', debit: 0, credit: 40680, explanation: '应收账款-乙公司减少记贷方。乙公司欠款已收回，债权结清。' },
    ],
    documents: [
      { type: 'bank', label: '收款回单', date: '2026-02-21', totalAmount: 40680, payer: '乙公司', payerAccount: '6222 0200 **** 3333', payeeName: '本公司', payeeAccount: '6222 0200 **** 8888', content: '货款（发票No.3100234576）', refNo: 'HD202602210001' },
    ],
  },
  {
    date: '2026-02-23',
    title: '现金送存银行',
    tags: ['出纳'],
    difficulty: 1,
    role: 'cashier',
    description: '春节期间提取的备用金10,000元已使用部分，但仍有较多现金结余。出纳清点后，将超出限额（5,000元）的部分送存工商银行。',
    tip: '节日过后备用金结余较多时应及时送存银行，压降库存现金至限额以内。操作流程：①清点需送存的现金②填写现金缴款单③送交银行柜台④银行盖章后取回回单⑤登记现金日记账和银行日记账。',
    entries: [
      { subjectCode: '100201', summary: '现金送存银行', debit: 5000, credit: 0, explanation: '银行存款增加记借方。将超出限额的现金送存工商银行账户。' },
      { subjectCode: '1001', summary: '现金送存银行', debit: 0, credit: 5000, explanation: '库存现金减少记贷方。送存现金5,000元后，库存现金余额回到限额以内。' },
    ],
    documents: [
      { type: 'bank', label: '现金缴款单', date: '2026-02-23', totalAmount: 5000, payer: '本公司', payeeName: '本公司工商银行账户', content: '送存多余现金', refNo: 'HD202602230050' },
      { type: 'receipt', label: '现金缴款回单', docTitle: '中国工商银行现金缴款回单', date: '2026-02-23', totalAmount: 5000, stampText: '中国工商银行 现金收讫 业务专用章',
        items: [{ name: '现金缴款', qty: 5000, price: 1, amount: 5000 }] },
    ],
  },
  {
    date: '2026-02-25',
    title: '备用金借支——差旅预借',
    tags: ['出纳', '费用管理'],
    difficulty: 1,
    role: 'cashier',
    description: '销售人员李强节后需出差拜访浙江客户，填写借款单预借差旅费1,500元。出纳审核审批手续完备后以现金支付。',
    tip: '员工借支差旅费的注意事项：①检查借款单是否经部门经理和财务主管审批②查询该员工是否有未报销的前笔借款（前账不清后账不借）③支付后在借款单上加盖"现金付讫"章④登记现金日记账。待员工出差归来后凭发票报销冲账。',
    entries: [
      { subjectCode: '1221', summary: '差旅预借款', debit: 1500, credit: 0, explanation: '其他应收款增加记借方。员工借支差旅费形成对公司的债权，出差归来后凭票据报销冲账。' },
      { subjectCode: '1001', summary: '差旅预借款', debit: 0, credit: 1500, explanation: '库存现金减少记贷方。出纳从备用金中支付预借差旅费1,500元，现金日记账登记"付"方。' },
    ],
    documents: [
      { type: 'receipt', label: '借款单', docTitle: '员工借款单', date: '2026-02-25', totalAmount: 1500, stampText: '财务专用章',
        items: [{ name: '差旅费预借——浙江出差（2月26-28日）', qty: 1, price: 1500, amount: 1500 }] },
      { type: 'text', label: '审批记录', docTitle: '借款审批记录', content: '借款人：李强（销售部）\n事由：拜访浙江客户\n金额：1,500.00\n部门经理：同意☑  财务主管：同意☑\n前账记录：无未报销借款', signature: '出纳：已支付 王出纳' },
    ],
  },
  {
    date: '2026-02-26',
    title: '银行代扣手续费确认',
    tags: ['出纳', '费用管理'],
    difficulty: 1,
    role: 'cashier',
    description: '收到银行对账单，显示本月银行转账汇款手续费合计约200元（含工行和建行账户），银行已自动从账户扣收。出纳逐笔核对后登记银行日记账。',
    tip: '银行手续费核对要点：①逐笔核对账单上的手续费明细②确认手续费计算是否正确（一般按笔数和金额分段计费）③向银行索取手续费增值税发票④登记银行日记账⑤月末汇总当月全部手续费。不同银行账户的手续费分开登记。',
    entries: [
      { subjectCode: '6602', summary: '银行手续费（工行）', debit: 150, credit: 0, explanation: '管理费用增加记借方。工商银行账户2月转账汇款手续费约150元。' },
      { subjectCode: '100201', summary: '银行手续费（工行）', debit: 0, credit: 150, explanation: '银行存款-工行减少记贷方。工行账户自动扣收手续费150元。' },
    ],
    documents: [
      { type: 'bank', label: '银行扣款通知', date: '2026-02-26', totalAmount: 150, payer: '本公司（工商银行）', payeeName: '中国工商银行', content: '2月电子汇划费及手续费', refNo: 'HD202602260060' },
      { type: 'receipt', label: '手续费清单', docTitle: '银行服务收费明细（2月）', date: '2026-02-26', totalAmount: 150, stampText: '中国工商银行 业务专用章',
        items: [{ name: '转账汇款手续费', qty: 15, price: 8, amount: 120 }, { name: '账户维护费', qty: 1, price: 30, amount: 30 }] },
    ],
  },
  {
    date: '2026-02-27',
    title: '银行账户管理费确认',
    tags: ['出纳', '费用管理'],
    difficulty: 1,
    role: 'cashier',
    description: '建设银行账户产生本月账户管理费20元，银行已自动扣收。出纳收到扣款通知后登记银行日记账，并向银行索取发票。',
    tip: '银行账户管理费一般是按季度或按月收取，出纳需留意各银行账户的扣款情况。如果认为费用不合理，可以联系客户经理申请减免。注意：管理费金额虽小，但也是企业实际发生的费用，必须逐笔登记入账。',
    entries: [
      { subjectCode: '6602', summary: '建行账户管理费', debit: 20, credit: 0, explanation: '管理费用增加记借方。建设银行账户2月账户管理费20元。' },
      { subjectCode: '100202', summary: '建行账户管理费', debit: 0, credit: 20, explanation: '银行存款-建行减少记贷方。建行账户自动扣收管理费20元，建行日记账登记"付"方。' },
    ],
    documents: [
      { type: 'bank', label: '建行扣款通知', date: '2026-02-27', totalAmount: 20, payer: '本公司（建设银行）', payeeName: '中国建设银行', content: '2月账户管理费', refNo: 'CCB202602270010' },
    ],
  },
  {
    date: '2026-02-27',
    title: '出纳资金日报编制',
    tags: ['出纳'],
    difficulty: 1,
    role: 'cashier',
    description: '出纳根据2月份现金日记账和银行存款日记账，编制月度资金日报表，汇总本月全部资金收支及结余情况，报送财务主管审阅。',
    tip: '月度资金日报是管理层了解企业现金流状况的重要工具。内容需包含：①上月结存②本月总收入（分现金/银行/第三方支付）③本月总支出（分类别列示）④本月结存⑤资金分析说明。编制完成后需与总账核对一致。',
    entries: [],
    documents: [
      { type: 'text', label: '资金日报表', docTitle: '资金日报表（2026年2月27日）', stampText: '出纳专用章',
        content: `资金日报表
━━━━━━━━━━━━━━━━━━━━━━━━━
日期：2026年2月27日

现金部分：
  期初余额：2,400.00
  本月收入：10,000.00（提取备用金）
  本月支出：8,000.00（采购运费2,000+差旅报销2,800+年终奖现金4,500+借支1,500-部分现金送存5,000+购支票等）
  月末余额：~4,400.00

银行存款-工行：
  期初余额：约1,640,550.00
  本月收入：118,650+63,280+5,085+85,880+67,800+40,680+5,000=约386,375
  本月支出：113,000+3,000+63,500+6,000+150=约185,650
  月末余额：约1,841,275.00

银行存款-建行：
  期初余额：0.00
  本月支出：94,920+20=约94,940
  月末余额：约-94,940（负数表示透支，需关注！）

填报人：王出纳  审阅人：李会计` },
    ],
  },
  {
    date: '2026-02-28',
    title: '月末库存现金盘点',
    tags: ['出纳', '期末'],
    difficulty: 1,
    role: 'cashier',
    description: '月末结账前，出纳对库存现金进行全面盘点，确认账面余额与实际库存一致。会计在场监盘。',
    tip: '月末现金盘点比日常盘点更加重要，是确保账实相符的关键环节。流程：①结出现金日记账余额→②分类清点各种面值现金→③编制盘点表→④会计监盘签字→⑤如有差异当日查明。盘点表作为会计凭证附件保存。',
    entries: [],
    documents: [
      { type: 'text', label: '现金盘点表', docTitle: '库存现金盘点表（2026年2月28日）', stampText: '财务专用章',
        content: `库存现金盘点表
━━━━━━━━━━━━━━━━━━━━━━━━━
盘点日期：2026年2月28日

账面余额：约4,400.00

实盘金额：
  100元面值：35张 = 3,500.00
  50元面值：12张 =   600.00
  20元面值：10张 =   200.00
  10元面值：10张 =   100.00
  硬币合计：          0.00
  实盘合计：        4,400.00

盘点结果：✓ 账实相符
盘点人：王出纳  监盘人：李会计` },
    ],
  },
  {
    date: '2026-02-28',
    title: '银行存款余额核对',
    tags: ['出纳', '期末'],
    difficulty: 1,
    role: 'cashier',
    description: '月末核对工商银行存款日记账余额与银行对账单是否一致，编制银行存款余额调节表。',
    tip: '月末出纳需核对银行日记账与银行对账单余额，如有未达账项需编制余额调节表。这是出纳每月必做的基础工作，确保银行存款账实相符。',
    entries: [],
    documents: [
      { type: 'text', label: '银行对账单', docTitle: '中国工商银行对账单（2026年2月）', content: '账户：xxxxxxxxxxxx（工行账户）\n期初余额：请参照1月核对结果\n本期主要发生额：\n  收：118,650（促销收款）+63,280（甲公司回款）+40,680（乙公司回款）\n  付：113,000（春节备货）+3,000（销售运费）+68,000（工资发放）+6,000（广告费）\n期末余额：请根据日记账计算核对\n\n建议：逐笔勾对银行流水与日记账记录，确认无未达账项。', stampText: '中国工商银行 业务专用章' },
    ],
  },
]

export default tasks
