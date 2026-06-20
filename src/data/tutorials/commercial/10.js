/**
 * 商业企业（商品流通企业）10月教学任务
 *
 * 行业特征：纯进销存，无生产成本核算
 * 企业类型：一般纳税人（增值税13%）
 * 本月主题：🎉 促销与折扣专题
 *
 * 时间线：促销专题(10/8-10/11) → 特殊销售(10/12-10/17) → 采购销售(10/19-10/24) → 月末(10/26-10/31)
 *
 * 知识点标签（10类）：商品采购、商品销售、仓存管理、往来管理、资金管理、费用管理、工资社保、税费、期末、出纳
 *
 * 会计准则依据：
 * - 《企业会计准则第14号——收入》（财会[2017]22号）
 * - 《企业会计准则第1号——存货》（财会[2006]3号）
 * - 《国家税务总局关于折扣额抵减增值税应税销售额问题通知》（国税函[2010]56号）
 * - 《企业会计准则第9号——职工薪酬》（财会[2014]8号）
 */

const tasks = [
  // ═══════════════════════════════════════════
  // 第一阶段：促销专题（10/8 - 10/11）
  // 国庆促销+折扣
  // ═══════════════════════════════════════════
  {
    date: '2026-10-08',
    title: '国庆促销销售A（商业折扣9折）',
    tags: ['商品销售', '税费'],
    difficulty: 2,
    description: '国庆促销活动：销售D类商品1,000件，原单价150元，国庆9折优惠，折后单价135元。不含税金额135,000元，增值税17,550元，价税合计152,550元已收存工商银行。',
    tip: '商业折扣（打折销售）按折扣后的金额确认收入并计算增值税。发票上需注明折扣额，或在同一张发票上分别注明原价和折扣额，方可按折扣后的金额计税。依据国税函[2010]56号。',
    entries: [
      { subjectCode: '100201', summary: '国庆促销收款', debit: 152550, credit: 0, explanation: '银行存款增加记借方。国庆促销商品销售收到款项，资金回笼。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入——主营业务产生的现金收入。'},
      { subjectCode: '6001', summary: '国庆促销确认收入', debit: 0, credit: 135000, explanation: '主营业务收入增加记贷方。商业折扣按折后价确认收入：1,000件×135元=135,000元。折扣额15,000元不确认收入。依据《企业会计准则第14号》第七条。' },
      { subjectCode: '222101', summary: '国庆促销销项税额', debit: 0, credit: 17550, explanation: '应交税费-应交增值税（销项税额）增加记贷方。增值税按折后价135,000×13%=17,550元计算。' },
    ],
    documents: [
      { type: 'invoice', label: '增值税专用发票（销项）', region: '上海', invoiceNo: '3100234590', date: '2026-10-08', buyer: '鑫源商贸有限公司', seller: '本公司',
        lineItems: [{ name: 'D类商品（国庆促销）', spec: '标准', unit: '件', qty: 1000, price: 135, amount: 135000 }],
        totalAmount: 152550, taxRate: '13%', taxAmount: 17550, totalInWords: '壹拾伍万贰仟伍佰伍拾元整' },
      { type: 'bank', label: '收款回单', date: '2026-10-08', totalAmount: 152550, payer: '鑫源商贸有限公司', payeeName: '本公司', content: '国庆促销货款（9折）', refNo: 'HD202610080001' },
    ],
  },
  {
    date: '2026-10-08',
    title: '结转促销商品成本A',
    tags: ['商品销售', '仓存管理'],
    difficulty: 1,
    description: '结转10月8日国庆促销销售D类商品1,000件的成本。D类商品单位采购成本80元/件，销售成本80,000元。',
    tip: '确认收入的同时必须同步结转成本，遵循配比原则。结转成本时：借：主营业务成本，贷：库存商品。成本金额=销售数量×单位成本，与售价无关。',
    entries: [
      { subjectCode: '6401', summary: '结转国庆促销商品成本', debit: 80000, credit: 0, explanation: '主营业务成本增加记借方。D类商品1,000件×80元=80,000元。配比原则要求收入与成本在同一会计期间确认。依据《企业会计准则第1号——存货》第十四条。' },
      { subjectCode: '1405', summary: '结转促销商品成本', debit: 0, credit: 80000, explanation: '库存商品减少记贷方。D类商品出库1,000件，存货减少。' },
    ],
    documents: [
      { type: 'text', label: '成本计算表', docTitle: '商品销售成本计算表（10月8日）', content: '销售商品：D类商品（国庆促销）\n销售数量：1,000件\n单位成本：80元（移动加权平均）\n销售成本：80,000元', stampText: '财务专用章' },
    ],
  },
  {
    date: '2026-10-09',
    title: '国庆促销销售B（满额折扣）',
    tags: ['商品销售', '税费'],
    difficulty: 2,
    description: '国庆促销活动：销售E类商品300件，原单价200元，满50,000元减5,000元，折后应收55,000元。增值税7,150元，价税合计62,150元已收存工商银行。',
    tip: '满额折扣也属于商业折扣，按折后金额确认收入。注意满额折扣的门槛设置，计算时先判断是否达到门槛，再计算折后金额。增值税按折后价计算。',
    entries: [
      { subjectCode: '100201', summary: '国庆促销收款', debit: 62150, credit: 0, explanation: '银行存款增加记借方。满额折扣促销收到款项62,150元。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入——主营业务产生的现金收入。'},
      { subjectCode: '6001', summary: '国庆促销确认收入', debit: 0, credit: 55000, explanation: '主营业务收入增加记贷方。E类商品满额折扣：原价300件×200元=60,000元，满50,000减5,000，确认收入55,000元。' },
      { subjectCode: '222101', summary: '促销增值税销项税额', debit: 0, credit: 7150, explanation: '应交税费-应交增值税（销项税额）增加记贷方。按折后价55,000×13%=7,150元计算。' },
    ],
    documents: [
      { type: 'invoice', label: '增值税专用发票（销项）', region: '上海', invoiceNo: '3100234591', date: '2026-10-09', buyer: '宏达贸易有限公司', seller: '本公司',
        lineItems: [{ name: 'E类商品（满额折扣）', spec: '标准', unit: '件', qty: 300, price: 183.33, amount: 55000 }],
        totalAmount: 62150, taxRate: '13%', taxAmount: 7150, totalInWords: '陆万贰仟壹佰伍拾元整' },
      { type: 'bank', label: '收款回单', date: '2026-10-09', totalAmount: 62150, payer: '宏达贸易有限公司', payeeName: '本公司', content: '国庆促销货款（满额减）', refNo: 'HD202610090001' },
    ],
  },
  {
    date: '2026-10-09',
    title: '结转促销商品成本B',
    tags: ['商品销售', '仓存管理'],
    difficulty: 1,
    description: '结转10月9日国庆促销销售E类商品300件的成本。E类商品单位采购成本120元/件，销售成本36,000元。',
    tip: '配比原则要求收入与成本配比。无论售价如何打折，成本仍按实际采购成本结转。借：主营业务成本，贷：库存商品。',
    entries: [
      { subjectCode: '6401', summary: '结转满额折扣商品成本', debit: 36000, credit: 0, explanation: '主营业务成本增加记借方。E类商品300件×120元=36,000元。' },
      { subjectCode: '1405', summary: '结转促销商品成本', debit: 0, credit: 36000, explanation: '库存商品减少记贷方。E类商品出库300件，存货减少。' },
    ],
    documents: [
      { type: 'text', label: '成本计算表', docTitle: '商品销售成本计算表（10月9日）', content: '销售商品：E类商品（满额折扣）\n销售数量：300件\n单位成本：120元（移动加权平均）\n销售成本：36,000元', stampText: '财务专用章' },
    ],
  },
  {
    date: '2026-10-09',
    title: '赊销商品（现金折扣条件2/10）',
    tags: ['商品销售', '往来管理'],
    difficulty: 2,
    description: '向乙公司赊销F类商品600件，单价100元，不含税金额60,000元，增值税7,800元，价税合计67,800元。现金折扣条件：2/10，n/30（10天内付款享受2%折扣）。',
    tip: '现金折扣不同于商业折扣。商业折扣直接冲减收入，现金折扣采用总价法处理：销售时按全额确认收入和应收账款，客户提前付款时折扣计入财务费用。依据《企业会计准则第14号》。',
    entries: [
      { subjectCode: '112202', summary: '赊销商品款未收', debit: 67800, credit: 0, explanation: '应收账款-乙公司增加记借方。赊销商品形成对乙公司的债权，现金折扣条件2/10。' },
      { subjectCode: '6001', summary: '赊销确认收入', debit: 0, credit: 60000, explanation: '主营业务收入增加记贷方。按全额确认收入60,000元（总价法）。客户如在折扣期内付款，折扣计入财务费用，不冲减收入。' },
      { subjectCode: '222101', summary: '赊销增值税销项税额', debit: 0, credit: 7800, explanation: '应交税费-应交增值税（销项税额）增加记贷方。赊销也产生纳税义务，增值税67,800-60,000=7,800元。' },
    ],
    documents: [
      { type: 'invoice', label: '增值税专用发票（销项）', region: '上海', invoiceNo: '3100234592', date: '2026-10-09', buyer: '乙公司', seller: '本公司',
        lineItems: [{ name: 'F类商品', spec: '标准', unit: '件', qty: 600, price: 100, amount: 60000 }],
        totalAmount: 67800, taxRate: '13%', taxAmount: 7800, totalInWords: '陆万柒仟捌佰元整' },
      { type: 'text', label: '出库单', docTitle: '商品出库单', content: 'F类商品 600件 已出库并发货，承运人：顺丰物流。\n付款条件：2/10，n/30', signature: '仓库管理员 王强' },
    ],
  },
  {
    date: '2026-10-10',
    title: '买一赠一促销',
    tags: ['商品销售', '税费'],
    difficulty: 3,
    description: '国庆买赠活动：购买G类商品30件（单价250元），赠送H类商品6件（单价80元）。总收款30×250=7,500元，增值税975元，价税合计8,475元已收存工商银行。赠品视同销售，按公允价值比例分摊收入。',
    tip: '买一赠一并非无偿赠送，在税务上视同销售。按公允价值比例分摊总收入：G类分摊收入=7,500×(7,500/7,980)=7,048.87元，H类分摊收入=7,500×(480/7,980)=451.13元。依据《国家税务总局关于确认企业所得税收入若干问题的通知》（国税函[2008]875号）。',
    entries: [
      { subjectCode: '100201', summary: '买赠活动收款', debit: 8475, credit: 0, explanation: '银行存款增加记借方。买一赠一活动收到货款8,475元。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入——主营业务产生的现金收入。'},
      { subjectCode: '6001', summary: 'G类商品销售收入', debit: 0, credit: 7048.87, explanation: '主营业务收入增加记贷方。G类商品分摊收入=7,500×(7,500/7,980)=7,048.87元。按公允价值比例分摊总收入。' },
      { subjectCode: '6001', summary: 'H类赠品视同销售收入', debit: 0, credit: 451.13, explanation: '主营业务收入增加记贷方。赠品H类分摊收入=7,500×(480/7,980)=451.13元。买一赠一赠品视同销售确认收入。' },
      { subjectCode: '222101', summary: '买赠活动销项税额', debit: 0, credit: 975, explanation: '应交税费-应交增值税（销项税额）增加记贷方。增值税按总收入7,500×13%=975元计算，不分摊。' },
    ],
    documents: [
      { type: 'invoice', label: '增值税专用发票（销项）', region: '上海', invoiceNo: '3100234593', date: '2026-10-10', buyer: '鑫源商贸有限公司', seller: '本公司',
        lineItems: [
          { name: 'G类商品', spec: '标准', unit: '件', qty: 30, price: 234.96, amount: 7048.87 },
          { name: 'H类商品（赠品）', spec: '标准', unit: '件', qty: 6, price: 75.19, amount: 451.13 },
        ],
        totalAmount: 8475, taxRate: '13%', taxAmount: 975, totalInWords: '捌仟肆佰柒拾伍元整' },
      { type: 'text', label: '促销海报', docTitle: '国庆买赠活动说明', content: '活动规则：购买G类商品5件即赠送H类商品1件，多买多赠。活动时间：2026年10月1日-10月10日。', stampText: '市场部章' },
    ],
  },
  {
    date: '2026-10-10',
    title: '结转买赠商品成本',
    tags: ['商品销售', '仓存管理'],
    difficulty: 1,
    description: '结转10月10日买一赠一活动销售商品成本。G类商品30件（单位成本140元），H类商品6件（单位成本40元），合计成本4,440元。',
    tip: '买一赠一的成本结转包括主商品和赠品。G类成本=30×140=4,200元，H类成本=6×40=240元，合计4,440元。赠品虽有收入但成本仍需全额结转。',
    entries: [
      { subjectCode: '6401', summary: '结转买赠商品成本', debit: 4440, credit: 0, explanation: '主营业务成本增加记借方。G类30件×140元=4,200元，H类6件×40元=240元，合计4,440元。' },
      { subjectCode: '1405', summary: '结转买赠商品成本', debit: 0, credit: 4440, explanation: '库存商品减少记贷方。买赠活动出库G类30件、H类6件，存货减少。' },
    ],
    documents: [
      { type: 'text', label: '成本计算表', docTitle: '买赠活动销售成本计算表', content: 'G类商品：30件×140元=4,200元\nH类商品（赠品）：6件×40元=240元\n合计销售成本：4,440元', stampText: '财务专用章' },
    ],
  },
  {
    date: '2026-10-11',
    title: '组合销售（套装商品）',
    tags: ['商品销售', '税费'],
    difficulty: 2,
    description: '国庆组合促销：推出"超值套装"（D类2件+F类3件），原价合计600元，套装价480元（8折）。销售20套，不含税金额9,600元，增值税1,248元，价税合计10,848元已收存工商银行。',
    tip: '组合销售（套装）按公允价值比例分摊确认各商品收入，也可将套装整体作为一项履约义务。本业务按公允价值比例分摊：D类=9,600×(300/600)=4,800元，F类=9,600×(300/600)=4,800元。',
    entries: [
      { subjectCode: '100201', summary: '组合套装收款', debit: 10848, credit: 0, explanation: '银行存款增加记借方。销售20套组合套装收到款项10,848元。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入——主营业务产生的现金收入。'},
      { subjectCode: '6001', summary: '套装-D类商品收入', debit: 0, credit: 4800, explanation: '主营业务收入增加记贷方。D类分摊收入：20套×2件×150元=6,000元（原价），按公允价值比例分摊=9,600×(6,000/12,000)=4,800元。' },
      { subjectCode: '6001', summary: '套装-F类商品收入', debit: 0, credit: 4800, explanation: '主营业务收入增加记贷方。F类分摊收入：20套×3件×100元=6,000元（原价），按公允价值比例分摊=9,600×(6,000/12,000)=4,800元。' },
      { subjectCode: '222101', summary: '组合套装销项税额', debit: 0, credit: 1248, explanation: '应交税费-应交增值税（销项税额）增加记贷方。套装收入9,600×13%=1,248元。' },
      { subjectCode: '6401', summary: '结转套装商品成本', debit: 6800, credit: 0, explanation: '主营业务成本增加记借方。D类20套×2件×80元=3,200元，F类20套×3件×60元=3,600元，合计6,800元。' },
      { subjectCode: '1405', summary: '结转套装商品成本', debit: 0, credit: 6800, explanation: '库存商品减少记贷方。套装出库D类40件、F类60件，存货减少。' },
    ],
    documents: [
      { type: 'invoice', label: '增值税专用发票（销项）', region: '上海', invoiceNo: '3100234594', date: '2026-10-11', buyer: '宏达贸易有限公司', seller: '本公司',
        lineItems: [
          { name: '超值套装-D类商品', spec: '标准', unit: '套', qty: 20, price: 240, amount: 4800 },
          { name: '超值套装-F类商品', spec: '标准', unit: '套', qty: 20, price: 240, amount: 4800 },
        ],
        totalAmount: 10848, taxRate: '13%', taxAmount: 1248, totalInWords: '壹万零捌佰肆拾捌元整' },
      { type: 'text', label: '促销海报', docTitle: '国庆组合套装说明', content: '超值套装：D类商品2件+F类商品3件，原价600元，套装价480元（8折优惠）。活动时间：2026年10月1日-10月11日。', stampText: '市场部章' },
    ],
  },

  // ═══════════════════════════════════════════
  // 第二阶段：特殊销售（10/12 - 10/17）
  // 买赠+返利+福利
  // ═══════════════════════════════════════════
  {
    date: '2026-10-12',
    title: '销售返利（达到目标返利）',
    tags: ['商品销售', '费用管理'],
    difficulty: 2,
    description: '客户鑫源商贸有限公司第三季度累计采购额达到200,000元，按合同约定给予2%返利4,000元，以工商银行存款支付。',
    tip: '销售返利是企业对客户的激励措施。达到一定采购额后给予现金返利，计入销售费用。这不是商业折扣（折扣是销售前给予），也不是销售折让（质量原因），而是销售后的费用支出。',
    entries: [
      { subjectCode: '6601', summary: '支付销售返利', debit: 4000, credit: 0, explanation: '销售费用增加记借方。达到销售目标给予客户的现金返利属于销售激励，计入销售费用。依据《企业会计准则——应用指南》附录会计科目使用说明。' },
      { subjectCode: '100201', summary: '支付销售返利', debit: 0, credit: 4000, explanation: '银行存款减少记贷方。支付返利款给鑫源商贸有限公司，资金减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6601），属于"支付其他与经营活动有关的现金"。'},
    ],
    documents: [
      { type: 'bank', label: '付款回单', date: '2026-10-12', totalAmount: 4000, payer: '本公司', payeeName: '鑫源商贸有限公司', content: '第三季度销售返利（2%）', refNo: 'HD202610120001' },
      { type: 'text', label: '返利协议', docTitle: '销售返利结算单', content: '客户：鑫源商贸有限公司\n第三季度累计采购额：200,000元\n返利比例：2%\n返利金额：4,000元\n经双方核对无误，予以支付。', stampText: '销售部章 财务专用章' },
    ],
  },
  {
    date: '2026-10-14',
    title: '职工福利（库存商品发放给员工）',
    tags: ['商品销售', '工资社保'],
    difficulty: 3,
    description: '中秋节将至，公司将G类库存商品10件（单位售价250元，单位成本140元）发放给管理部门员工作为节日福利。视同销售处理，确认收入2,500元，增值税325元。',
    tip: '将自产或外购商品发放给职工，在增值税和企业所得税上均视同销售。会计处理分三步：①确认费用 ②确认收入+销项税 ③结转成本。注意进价与售价的差异对利润的影响。依据《企业会计准则第9号——职工薪酬》和《增值税暂行条例实施细则》第四条。',
    entries: [
      { subjectCode: '6602', summary: '职工节日福利费', debit: 2825, credit: 0, explanation: '管理费用增加记借方。将库存商品发放给管理部门员工作为节日福利，按含税售价计入管理费用：2,500+325=2,825元。' },
      { subjectCode: '6001', summary: '视同销售确认收入', debit: 0, credit: 2500, explanation: '主营业务收入增加记贷方。商品发放给职工视同销售，确认收入10件×250元=2,500元。依据《企业会计准则第9号——职工薪酬》第五条。' },
      { subjectCode: '222101', summary: '视同销售增值税销项税额', debit: 0, credit: 325, explanation: '应交税费-应交增值税（销项税额）增加记贷方。视同销售按售价计算增值税：2,500×13%=325元。' },
      { subjectCode: '6401', summary: '结转福利商品成本', debit: 1400, credit: 0, explanation: '主营业务成本增加记借方。结转发放商品的采购成本10件×140元=1,400元。' },
      { subjectCode: '1405', summary: '结转福利商品成本', debit: 0, credit: 1400, explanation: '库存商品减少记贷方。G类商品10件出库用于职工福利，存货减少。' },
    ],
    documents: [
      { type: 'text', label: '福利发放表', docTitle: '中秋节职工福利发放清单', content: '福利品：G类商品\n数量：10件\n单价：250元（含税视同销售价）\n领取部门：行政管理部\n经手人：行政部 李芳', signature: '行政部负责人 张明' },
      { type: 'receipt', label: '出库单', docTitle: '商品出库单（职工福利）', date: '2026-10-14', totalAmount: 2500,
        items: [{ name: 'G类商品（职工福利）', qty: 10, price: 250, amount: 2500 }] },
    ],
  },
  {
    date: '2026-10-15',
    title: '职工福利（外购商品发放，进项税转出）',
    tags: ['费用管理', '税费', '工资社保'],
    difficulty: 3,
    description: '公司将外购的H类商品20件（采购成本40元/件，进项税额已抵扣）发放给销售人员作节日福利。含税总价904元（800+104），进项税额104元需做转出处理。',
    tip: '外购商品用于集体福利，进项税额不得抵扣，需做进项税额转出。会计处理：借：销售费用-福利费（含税价），贷：库存商品（成本价），贷：应交税费-应交增值税（进项税额转出）。注意与自产商品视同销售的区别：外购商品不确认收入。依据《增值税暂行条例》第十条。',
    entries: [
      { subjectCode: '6601', summary: '销售人员节日福利费', debit: 904, credit: 0, explanation: '销售费用增加记借方。外购商品发放给销售人员作福利，按含税采购成本计入销售费用：800+104=904元。外购商品用于集体福利不确认收入，直接冲减库存商品。' },
      { subjectCode: '1405', summary: '结转福利商品成本', debit: 0, credit: 800, explanation: '库存商品减少记贷方。H类商品20件×40元=800元出库用于职工福利。' },
      { subjectCode: '222101', summary: '进项税额转出', debit: 0, credit: 104, explanation: '应交税费-应交增值税（进项税额转出）增加记贷方。外购商品用于集体福利，进项税额不得抵扣需转出：800×13%=104元。依据《增值税暂行条例》第十条第一款。' },
    ],
    documents: [
      { type: 'text', label: '福利发放表', docTitle: '销售人员节日福利发放清单', content: '福利品：H类商品\n数量：20件\n采购成本：40元/件\n进项税额已抵扣，福利发放需进项税额转出。', signature: '销售部负责人 赵刚' },
      { type: 'receipt', label: '增值税专用发票（原采购）', docTitle: 'H类商品采购发票（复印件）', date: '2026-09-20', totalAmount: 904,
        items: [{ name: 'H类商品（原采购）', qty: 20, price: 40, amount: 800 }] },
    ],
  },
  {
    date: '2026-10-16',
    title: '支付广告费',
    tags: ['费用管理'],
    difficulty: 1,
    description: '支付本月网络推广广告费10,000元，以工商银行存款支付。',
    tip: '广告费属于销售费用，是商业企业为促进销售发生的支出。借：销售费用-广告费，贷：银行存款。广告费在税前扣除有比例限制（一般企业不超过销售收入15%）。',
    entries: [
      { subjectCode: '660101', summary: '支付网络广告费', debit: 10000, credit: 0, explanation: '销售费用-广告费增加记借方。国庆促销期间的网络推广费用计入销售费用。' },
      { subjectCode: '100201', summary: '支付广告费', debit: 0, credit: 10000, explanation: '银行存款减少记贷方。支付广告费用10,000元，资金减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目660101），属于"支付其他与经营活动有关的现金"。'},
    ],
    documents: [
      { type: 'receipt', label: '广告费发票', docTitle: '增值税普通发票', date: '2026-10-16', totalAmount: 10000, stampText: 'XX网络科技有限公司 发票专用章',
        items: [{ name: '搜索引擎推广服务（10月）', qty: 1, price: 10000, amount: 10000 }] },
    ],
  },
  {
    date: '2026-10-17',
    title: '支付运杂费',
    tags: ['费用管理'],
    difficulty: 1,
    description: '支付本月销售商品发生的运输费3,000元，以工商银行存款支付。',
    tip: '销售环节的运杂费计入"销售费用-运杂费"。借：销售费用-运杂费，贷：银行存款。商业企业的运杂费不摊销计入库存商品成本。',
    entries: [
      { subjectCode: '660102', summary: '支付销售运杂费', debit: 3000, credit: 0, explanation: '销售费用-运杂费增加记借方。销售商品发生的运输费用计入销售费用。' },
      { subjectCode: '100201', summary: '支付运杂费', debit: 0, credit: 3000, explanation: '银行存款减少记贷方。支付运杂费3,000元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目660102），属于"支付其他与经营活动有关的现金"。'},
    ],
    documents: [
      { type: 'receipt', label: '运费发票', docTitle: '运输业增值税普通发票', date: '2026-10-17', totalAmount: 3000, stampText: 'XX物流公司 发票专用章',
        items: [{ name: '10月销售商品运输费', qty: 1, price: 3000, amount: 3000 }] },
    ],
  },
  {
    date: '2026-10-17',
    title: '现金折扣收款（客户提前付款）',
    tags: ['往来管理', '资金管理'],
    difficulty: 2,
    description: '乙公司于10月9日赊购的F类商品货款67,800元，于今日（10月17日，8天内）提前付款，享受2%现金折扣1,200元，实际支付66,600元。款项已收存工商银行。',
    tip: '现金折扣采用总价法处理：原应收账款67,800元，折扣=60,000×2%=1,200元（仅对本金折扣，增值税不打折），实收66,600元。折扣部分计入"财务费用"——反映企业为加速回款付出的资金成本。',
    entries: [
      { subjectCode: '100201', summary: '收到乙公司付款', debit: 66600, credit: 0, explanation: '银行存款增加记借方。乙公司10天内付款享受现金折扣后实付66,600元。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目112202），属于经营活动现金流入——主营业务产生的现金收入。'},
      { subjectCode: '6603', summary: '现金折扣（乙公司2/10）', debit: 1200, credit: 0, explanation: '财务费用增加记借方。客户提前付款享受的现金折扣1,200元（60,000×2%），计入财务费用。折扣仅针对商品价款，不含增值税。' },
      { subjectCode: '112202', summary: '冲销乙公司应收账款', debit: 0, credit: 67800, explanation: '应收账款-乙公司减少记贷方。原应收账款67,800元全额冲销，其中66,600元为银行存款，1,200元为现金折扣。' },
    ],
    documents: [
      { type: 'bank', label: '收款回单', date: '2026-10-17', totalAmount: 66600, payer: '乙公司', payeeName: '本公司', content: '货款（10月9日发票No.3100234592，2/10折扣）', refNo: 'HD202610170001' },
      { type: 'text', label: '现金折扣计算表', docTitle: '现金折扣计算说明', content: '原应收账款：67,800元\n其中：货款60,000元，增值税7,800元\n折扣：60,000×2%=1,200元（仅货款折扣）\n实收：67,800-1,200=66,600元\n折扣条件：2/10，n/30', stampText: '财务专用章' },
    ],
  },

  // ═══════════════════════════════════════════
  // 第三阶段：采购销售（10/19 - 10/24）
  // 常规购销
  // ═══════════════════════════════════════════
  {
    date: '2026-10-19',
    title: '现购商品',
    tags: ['商品采购', '资金管理'],
    difficulty: 1,
    description: '向华强供应链采购D类商品500件，不含税单价80元，不含税金额40,000元，增值税5,200元，价税合计45,200元，以工商银行存款支付。商品已验收入库。',
    tip: '现购是最基础的采购方式，一手交钱一手交货。借：库存商品/应交税费-进项，贷：银行存款。注意核对发票数量和入库数量是否一致。',
    entries: [
      { subjectCode: '1405', summary: '现购商品入库', debit: 40000, credit: 0, explanation: '库存商品增加记借方。D类商品500件×80元=40,000元验收入库，存货增加。' },
      { subjectCode: '222101', summary: '采购进项税额', debit: 5200, credit: 0, explanation: '应交税费-应交增值税（进项税额）增加记借方。取得增值税专用发票，税额5,200元可抵扣销项税。' },
      { subjectCode: '100201', summary: '支付采购货款', debit: 0, credit: 45200, explanation: '银行存款减少记贷方。以工商银行存款支付采购货款及税款45,200元。' , cashFlowItem: 'cf-op2', cashFlowExplanation: '采购存货/商品支出（配对科目1405），属于"购买商品、接受劳务支付的现金"——经营活动现金流出。'},
    ],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '上海', invoiceNo: '3100234595', date: '2026-10-19', buyer: '本公司', seller: '华强供应链有限公司',
        lineItems: [{ name: 'D类商品', spec: '标准', unit: '件', qty: 500, price: 80, amount: 40000 }],
        totalAmount: 45200, taxRate: '13%', taxAmount: 5200, totalInWords: '肆万伍仟贰佰元整' },
      { type: 'bank', label: '付款回单', date: '2026-10-19', totalAmount: 45200, payer: '本公司', payeeName: '华强供应链有限公司', content: '货款', refNo: 'HD202610190001' },
      { type: 'text', label: '入库单', docTitle: '商品入库单', content: 'D类商品 500件 已验收入库，质量合格。', signature: '仓库管理员 王强' },
    ],
  },
  {
    date: '2026-10-20',
    title: '赊购商品',
    tags: ['商品采购', '往来管理'],
    difficulty: 1,
    description: '向丙公司赊购E类商品400件，不含税单价120元，不含税金额48,000元，增值税6,240元，价税合计54,240元，货款未付。商品已验收入库。',
    tip: '赊购商品不立即付款，形成应付账款。借：库存商品/应交税费-进项，贷：应付账款-丙公司。注意按期偿还，维护信用记录。',
    entries: [
      { subjectCode: '1405', summary: '赊购商品入库', debit: 48000, credit: 0, explanation: '库存商品增加记借方。E类商品400件×120元=48,000元验收入库，存货增加。' },
      { subjectCode: '222101', summary: '赊购进项税额', debit: 6240, credit: 0, explanation: '进项税额增加记借方，可抵扣销项税。' },
      { subjectCode: '220201', summary: '赊购商品款未付', debit: 0, credit: 54240, explanation: '应付账款-丙公司增加记贷方。赊购商品尚未付款，形成对丙公司的债务。' },
    ],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '江苏', invoiceNo: '3200678910', date: '2026-10-20', buyer: '本公司', seller: '丙公司',
        lineItems: [{ name: 'E类商品', spec: '标准', unit: '件', qty: 400, price: 120, amount: 48000 }],
        totalAmount: 54240, taxRate: '13%', taxAmount: 6240, totalInWords: '伍万肆仟贰佰肆拾元整' },
      { type: 'text', label: '入库单', docTitle: '商品入库单', content: 'E类商品 400件 已验收入库，质量合格。', signature: '仓库管理员 王强' },
    ],
  },
  {
    date: '2026-10-21',
    title: '现销商品（正常）',
    tags: ['商品销售', '资金管理'],
    difficulty: 1,
    description: '销售G类商品20件，单价250元，不含税金额5,000元，增值税650元，价税合计5,650元已收存工商银行。',
    tip: '正常现销业务，无折扣无促销。借：银行存款，贷：主营业务收入/应交税费-销项。这是最基础的销售分录。',
    entries: [
      { subjectCode: '100201', summary: '现销商品收款', debit: 5650, credit: 0, explanation: '银行存款增加记借方。正常销售商品收到款项5,650元。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入——主营业务产生的现金收入。'},
      { subjectCode: '6001', summary: '现销确认收入', debit: 0, credit: 5000, explanation: '主营业务收入增加记贷方。销售G类商品20件×250元=5,000元，收入确认。' },
      { subjectCode: '222101', summary: '现销增值税销项税额', debit: 0, credit: 650, explanation: '应交税费-应交增值税（销项税额）增加记贷方。5,000×13%=650元。' },
    ],
    documents: [
      { type: 'invoice', label: '增值税专用发票（销项）', region: '上海', invoiceNo: '3100234596', date: '2026-10-21', buyer: '鑫源商贸有限公司', seller: '本公司',
        lineItems: [{ name: 'G类商品', spec: '标准', unit: '件', qty: 20, price: 250, amount: 5000 }],
        totalAmount: 5650, taxRate: '13%', taxAmount: 650, totalInWords: '伍仟陆佰伍拾元整' },
      { type: 'bank', label: '收款回单', date: '2026-10-21', totalAmount: 5650, payer: '鑫源商贸有限公司', payeeName: '本公司', content: '货款', refNo: 'HD202610210001' },
    ],
  },
  {
    date: '2026-10-22',
    title: '赊销商品（正常）',
    tags: ['商品销售', '往来管理'],
    difficulty: 1,
    description: '向甲公司赊销E类商品150件，单价200元，不含税金额30,000元，增值税3,900元，价税合计33,900元，货款未收。',
    tip: '赊销时：借：应收账款-甲公司，贷：主营业务收入/应交税费-销项。注意跟进催收，避免形成坏账。',
    entries: [
      { subjectCode: '112201', summary: '赊销商品款未收', debit: 33900, credit: 0, explanation: '应收账款-甲公司增加记借方。赊销E类商品150件×200元=30,000元，形成对甲公司的债权。' },
      { subjectCode: '6001', summary: '赊销确认收入', debit: 0, credit: 30000, explanation: '主营业务收入增加记贷方。赊销商品收入确认30,000元。' },
      { subjectCode: '222101', summary: '赊销增值税销项税额', debit: 0, credit: 3900, explanation: '应交税费-应交增值税（销项税额）增加记贷方。赊销产生的销项税额3,900元。' },
    ],
    documents: [
      { type: 'invoice', label: '增值税专用发票（销项）', region: '上海', invoiceNo: '3100234597', date: '2026-10-22', buyer: '甲公司', seller: '本公司',
        lineItems: [{ name: 'E类商品', spec: '标准', unit: '件', qty: 150, price: 200, amount: 30000 }],
        totalAmount: 33900, taxRate: '13%', taxAmount: 3900, totalInWords: '叁万叁仟玖佰元整' },
      { type: 'text', label: '出库单', docTitle: '商品出库单', content: 'E类商品 150件 已出库并发货，承运人：德邦物流。', signature: '仓库管理员 王强' },
    ],
  },
  {
    date: '2026-10-22',
    title: '结转已销商品成本（含促销商品成本）',
    tags: ['商品销售', '仓存管理'],
    difficulty: 2,
    description: '汇总结转本月已销售但尚未结转成本的商品：①F类600件（单位成本60元）②G类20件（单位成本140元）③E类150件（单位成本120元），合计成本56,800元。',
    tip: '月末或定期汇总结转多笔销售商品的成本，简化核算工作。借：主营业务成本，贷：库存商品。注意核对销售数量与出库数量是否一致，不同商品的单位成本不同。',
    entries: [
      { subjectCode: '6401', summary: '结转F类商品成本', debit: 36000, credit: 0, explanation: '主营业务成本增加记借方。F类赊销商品600件×60元=36,000元，于10月9日赊销。' },
      { subjectCode: '6401', summary: '结转G类商品成本', debit: 2800, credit: 0, explanation: '主营业务成本增加记借方。G类现销商品20件×140元=2,800元，于10月21日销售。' },
      { subjectCode: '6401', summary: '结转E类商品成本', debit: 18000, credit: 0, explanation: '主营业务成本增加记借方。E类赊销商品150件×120元=18,000元，于10月22日销售。' },
      { subjectCode: '1405', summary: '结转已销商品总成本', debit: 0, credit: 56800, explanation: '库存商品减少记贷方。汇总出库F类600件、G类20件、E类150件，存货减少56,800元。' },
    ],
    documents: [
      { type: 'text', label: '成本汇总表', docTitle: '10月22日商品销售成本汇总表', content: 'F类商品：600件×60元=36,000元（10/9赊销）\nG类商品：20件×140元=2,800元（10/21现销）\nE类商品：150件×120元=18,000元（10/22赊销）\n合计：56,800元', stampText: '财务专用章' },
    ],
  },
  {
    date: '2026-10-23',
    title: '支付应付账款',
    tags: ['往来管理', '资金管理'],
    difficulty: 1,
    description: '支付前欠丙公司货款30,000元，以工商银行存款支付。',
    tip: '偿还应付账款时：借：应付账款-丙公司，贷：银行存款。及时付款有助于维护良好的供应商关系。',
    entries: [
      { subjectCode: '220201', summary: '偿还丙公司货款', debit: 30000, credit: 0, explanation: '应付账款-丙公司减少记借方。偿还前欠丙公司部分货款，负债减少。' },
      { subjectCode: '100201', summary: '偿还应付账款', debit: 0, credit: 30000, explanation: '银行存款减少记贷方。支付货款30,000元，资金减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目220201），属于"支付其他与经营活动有关的现金"。'},
    ],
    documents: [
      { type: 'bank', label: '付款回单', date: '2026-10-23', totalAmount: 30000, payer: '本公司', payeeName: '丙公司', content: '偿还前欠货款（部分）', refNo: 'HD202610230001' },
    ],
  },
  {
    date: '2026-10-24',
    title: '收到货款',
    tags: ['往来管理', '资金管理'],
    difficulty: 1,
    description: '收到甲公司汇来的前欠货款33,900元（10月22日赊销E类商品货款），已存入工商银行账户。',
    tip: '收到前欠货款：借：银行存款，贷：应收账款。客户及时付款有助于企业资金周转。注意核对应收账款明细防止串户。',
    entries: [
      { subjectCode: '100201', summary: '收到甲公司货款', debit: 33900, credit: 0, explanation: '银行存款增加记借方。甲公司偿还前欠赊销货款，资金回笼。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目112201），属于经营活动现金流入——主营业务产生的现金收入。'},
      { subjectCode: '112201', summary: '冲销甲公司应收账款', debit: 0, credit: 33900, explanation: '应收账款-甲公司减少记贷方。甲公司欠款结清，债权收回。' },
    ],
    documents: [
      { type: 'bank', label: '收款回单', date: '2026-10-24', totalAmount: 33900, payer: '甲公司', payeeName: '本公司', content: '货款（发票No.3100234597）', refNo: 'HD202610240001' },
    ],
  },

  // ═══════════════════════════════════════════
  // 第四阶段：月末（10/27 - 10/31）
  // 期末+出纳
  // ═══════════════════════════════════════════
  {
    date: '2026-10-27',
    title: '计提本月工资',
    tags: ['工资社保'],
    difficulty: 2,
    description: '计提本月员工工资：管理人员工资35,000元，销售人员工资25,000元，合计60,000元。',
    tip: '月末计提当月工资，体现权责发生制。借：管理费用/销售费用（按部门），贷：应付职工薪酬-工资。不同部门人员的工资计入不同的费用科目。',
    entries: [
      { subjectCode: '660203', summary: '计提管理人员工资', debit: 35000, credit: 0, explanation: '管理费用-工资薪金增加记借方。行政管理人员的工资35,000元计入管理费用。' },
      { subjectCode: '6601', summary: '计提销售人员工资', debit: 25000, credit: 0, explanation: '销售费用增加记借方。销售人员的工资25,000元计入销售费用。' },
      { subjectCode: '221101', summary: '计提本月工资', debit: 0, credit: 60000, explanation: '应付职工薪酬-工资增加记贷方。计提形成对员工的负债，发放时冲减。依据《企业会计准则第9号——职工薪酬》第四条。' },
    ],
    documents: [
      { type: 'text', label: '工资表', docTitle: '2026年10月工资汇总表', content: '管理人员：7人×5,000元=35,000元\n销售人员：5人×5,000元=25,000元\n合计：60,000元\n（个税及社保由公司另行申报）', stampText: '行政人事部章' },
    ],
  },
  {
    date: '2026-10-28',
    title: '发放工资',
    tags: ['工资社保'],
    difficulty: 1,
    description: '通过工商银行转账发放本月员工工资60,000元。',
    tip: '实际发放工资时：借：应付职工薪酬-工资，贷：银行存款。发放后冲减计提时确认的负债。注意区分"计提"和"发放"两个步骤的会计分录。',
    entries: [
      { subjectCode: '221101', summary: '发放本月工资', debit: 60000, credit: 0, explanation: '应付职工薪酬-工资减少记借方。实际支付工资，负债减少。' },
      { subjectCode: '100201', summary: '发放本月工资', debit: 0, credit: 60000, explanation: '银行存款减少记贷方。通过银行代发工资60,000元，资金划出。' , cashFlowItem: 'cf-op3', cashFlowExplanation: '支付职工薪酬相关支出（配对科目221101），属于"支付给职工以及为职工支付的现金"——经营活动现金流出。'},
    ],
    documents: [
      { type: 'bank', label: '代发工资回单', date: '2026-10-28', totalAmount: 60000, payer: '本公司', payeeName: '员工代发户', content: '2026年10月工资', refNo: 'HD202610280001' },
    ],
  },
  {
    date: '2026-10-29',
    title: '计提固定资产折旧',
    tags: ['费用管理'],
    difficulty: 2,
    description: '计提本月固定资产折旧。房屋建筑物原值500,000元，月折旧率0.2%（直线法）；办公设备原值60,000元，月折旧率0.8%。',
    tip: '固定资产折旧按使用部门计入相关费用。管理部门使用的固定资产折旧计入"管理费用"。借：管理费用，贷：累计折旧。月折旧额=原值×月折旧率。',
    entries: [
      { subjectCode: '6602', summary: '计提折旧（管理部门）', debit: 1480, credit: 0, explanation: '管理费用增加记借方。房屋折旧=500,000×0.2%=1,000元，办公设备折旧=60,000×0.8%=480元，合计1,480元。' },
      { subjectCode: '1602', summary: '计提折旧', debit: 0, credit: 1480, explanation: '累计折旧增加记贷方。累计折旧是固定资产的抵减科目，贷方表示折旧增加。固定资产账面价值=原值-累计折旧。' },
    ],
    documents: [
      { type: 'text', label: '折旧计算表', docTitle: '固定资产折旧计算表（2026年10月）', content: '房屋建筑物：原值500,000×月折旧率0.2%=1,000元\n办公设备：原值60,000×月折旧率0.8%=480元\n合计：1,480元\n折旧方法：直线法（年限平均法）', stampText: '财务专用章' },
    ],
  },
  {
    date: '2026-10-30',
    title: '计提城建税及教育费附加',
    tags: ['税费'],
    difficulty: 2,
    description: '根据本月应交增值税计提城市维护建设税（税率7%）和教育费附加（税率3%）。本月销项税额合计39,598元，进项税额合计11,440元，进项税额转出104元，应交增值税=39,598-11,440+104=28,262元。',
    tip: '城建税和教育费附加以实际应缴纳的增值税为计税依据。城建税税率7%（城市），教育费附加3%。借：税金及附加，贷：应交税费-城建税/教育费附加。',
    entries: [
      { subjectCode: '6403', summary: '计提城建税及教育费附加', debit: 2826.2, credit: 0, explanation: '税金及附加增加记借方。本月应交增值税28,262元，城建税=28,262×7%=1,978.34元，教育费附加=28,262×3%=847.86元，合计2,826.20元。依据《城市维护建设税暂行条例》第四条。' },
      { subjectCode: '222103', summary: '计提应交城建税', debit: 0, credit: 1978.34, explanation: '应交税费-应交城市维护建设税增加记贷方。城建税=应交增值税×7%=28,262×7%=1,978.34元。' },
      { subjectCode: '222104', summary: '计提应交教育费附加', debit: 0, credit: 847.86, explanation: '应交税费-应交教育费附加增加记贷方。教育费附加=应交增值税×3%=28,262×3%=847.86元。' },
    ],
    documents: [
      { type: 'text', label: '税金计算表', docTitle: '2026年10月附加税费计算表', content: '计税依据：\n销项税额合计：39,598元\n进项税额合计：11,440元\n进项税额转出：104元\n应交增值税：39,598-11,440+104=28,262元\n\n城市维护建设税：28,262×7%=1,978.34元\n教育费附加：28,262×3%=847.86元\n合计：2,826.20元', stampText: '财务专用章' },
    ],
  },
  {
    date: '2026-10-30',
    title: '期末结转损益',
    tags: ['期末'],
    difficulty: 3,
    description: '月末结转所有损益类科目余额至"本年利润"，计算本月净利润。本月主营业务收入304,600元，主营业务成本185,440元，销售费用42,904元，管理费用39,305元，财务费用1,200元，税金及附加2,826.20元。',
    tip: '期末结转损益是每月必做的关键步骤。先结转收入到本年利润贷方，再结转费用到本年利润借方。差额=净利润（贷方余额）或净亏损（借方余额）。本月净利润=304,600-271,675.20=32,924.80元。',
    entries: [
      { subjectCode: '6001', summary: '结转主营业务收入', debit: 304600, credit: 0, explanation: '主营业务收入转出，余额归零。本月累计收入304,600元转入本年利润。' },
      { subjectCode: '4103', summary: '收入转入本年利润', debit: 0, credit: 304600, explanation: '本年利润增加记贷方。主营业务收入304,600元转入本年利润贷方，所有者权益增加。' },
      { subjectCode: '4103', summary: '费用转入本年利润', debit: 271675.2, credit: 0, explanation: '本年利润减少记借方。将本月全部费用271,675.20元转入本年利润借方：主营业务成本185,440+销售费用42,904+管理费用39,305+财务费用1,200+税金及附加2,826.20。本月净利润=304,600-271,675.20=32,924.80元。' },
      { subjectCode: '6401', summary: '结转主营业务成本', debit: 0, credit: 185440, explanation: '主营业务成本转出185,440元，余额归零。含促销成本、买赠成本、套装成本、福利成本和常规销售成本。' },
      { subjectCode: '6601', summary: '结转销售费用', debit: 0, credit: 42904, explanation: '销售费用转出42,904元，余额归零。含返利4,000+福利904+广告费10,000+运杂费3,000+工资25,000。' },
      { subjectCode: '6602', summary: '结转管理费用', debit: 0, credit: 39305, explanation: '管理费用转出39,305元，余额归零。含福利2,825+工资35,000+折旧1,480。' },
      { subjectCode: '6603', summary: '结转财务费用', debit: 0, credit: 1200, explanation: '财务费用转出1,200元，余额归零。系乙公司现金折扣1,200元。' },
      { subjectCode: '6403', summary: '结转税金及附加', debit: 0, credit: 2826.2, explanation: '税金及附加转出2,826.20元，余额归零。含城建税1,978.34元和教育费附加847.86元。' },
    ],
    documents: [
      { type: 'text', label: '损益计算表', docTitle: '2026年10月损益计算表', content: '一、营业收入：304,600.00元\n减：营业成本：185,440.00元\n减：销售费用：42,904.00元\n减：管理费用：39,305.00元\n减：财务费用：1,200.00元\n减：税金及附加：2,826.20元\n二、营业利润：32,924.80元\n\n本月净利润：32,924.80元', stampText: '财务专用章' },
    ],
  },
  // ═══════════════════════════════════════════
  // 出纳任务（19个，穿插于全月）
  // ═══════════════════════════════════════════
  {
    date: '2026-10-01',
    title: '库存现金清点与日记账启用',
    tags: ['出纳', '期末'],
    difficulty: 1,
    role: 'cashier',
    description: '10月第一个工作日，出纳对库存现金进行清点，确认现金日记账期初余额为3,000元（9月末结转余额），账实相符后启用新账页，开始登记10月收支业务。',
    tip: '月初出纳必做工作：清点保险柜现金实有数，与现金日记账余额核对，确保账实相符后方可开始日常业务。坚持"日清月结"制度，做到每日盘点、每月核对。这是出纳岗位的基本职责。',
    entries: [],
    documents: [
      { type: 'text', label: '现金盘点表', docTitle: '库存现金盘点表（2026年10月1日）', content: '现金日记账余额：3,000元\n保险柜实有现金：3,000元\n差异：0元\n结论：账实相符\n监盘人：财务主管 王芳', signature: '出纳 刘静  监盘人 王芳' },
    ],
  },
  {
    date: '2026-10-02',
    title: '提取备用金',
    tags: ['出纳', '资金管理'],
    difficulty: 1,
    role: 'cashier',
    description: '根据公司日常零星开支需要，出纳从工商银行提取备用金5,000元，现金已由出纳清点入库。',
    tip: '提取备用金是出纳最常见的付款业务之一。开具现金支票从银行提取现金，分录：借：库存现金，贷：银行存款。注意备用金金额需满足3-5天零星开支即可，不宜过大。出纳需在现金日记账和银行存款日记账上分别登记。',
    entries: [
      { subjectCode: '1001', summary: '提取备用金', debit: 5000, credit: 0, explanation: '库存现金增加记借方。提取备用金后保险柜现金增加，出纳需当面清点并登记现金日记账。' },
      { subjectCode: '100201', summary: '提取备用金', debit: 0, credit: 5000, explanation: '银行存款减少记贷方。工行存款减少5,000元，出纳需在银行存款日记账贷方登记此笔支出，并保管好现金支票存根作为原始凭证。' },
    ],
    documents: [
      { type: 'bank', label: '现金支票存根', date: '2026-10-02', totalAmount: 5000, payer: '本公司', payeeName: '本公司', content: '提取备用金', refNo: 'CQ202610020001' },
      { type: 'receipt', label: '备用金收据', docTitle: '备用金收据', date: '2026-10-02', totalAmount: 5000, stampText: '财务专用章',
        items: [{ name: '提取备用金（现金支票#102345）', qty: 1, price: 5000, amount: 5000 }] },
    ],
  },
  {
    date: '2026-10-07',
    title: '备用金借支差旅费',
    tags: ['出纳', '费用管理'],
    difficulty: 1,
    role: 'cashier',
    description: '销售人员赵刚因赴广州拜访客户，预借差旅费2,000元，出纳审核借款审批单后以现金支付。',
    tip: '员工预借差旅费是出纳日常备用金管理业务。借支时：借：其他应收款-员工，贷：库存现金。注意：借支必须有部门负责人和财务负责人签字审批，出差归来后凭发票报销，多退少补。',
    entries: [
      { subjectCode: '1221', summary: '预借差旅费', debit: 2000, credit: 0, explanation: '其他应收款增加记借方。员工赵刚预借差旅费形成对公司的暂借款，属于其他应收款，待出差归来后凭票报销冲抵。' },
      { subjectCode: '1001', summary: '预借差旅费', debit: 0, credit: 2000, explanation: '库存现金减少记贷方。以备用金现金支付差旅费借款，保险柜现金减少，出纳需登记现金日记账并让借款人签字确认。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目1221），属于"支付其他与经营活动有关的现金"。'},
    ],
    documents: [
      { type: 'receipt', label: '借款单', docTitle: '差旅费借款单', date: '2026-10-07', totalAmount: 2000, stampText: '财务专用章',
        items: [{ name: '广州出差预借差旅费', qty: 1, price: 2000, amount: 2000 }] },
      { type: 'text', label: '审批单', docTitle: '借款审批单', content: '借款人：赵刚（销售部）\n事由：广州拜访客户\n借款金额：2,000元\n部门负责人：已审批 ✅\n财务负责人：已审批 ✅', signature: '销售部 张明  财务部 王芳' },
    ],
  },
  {
    date: '2026-10-08',
    title: '促销商品现金零售收款',
    tags: ['出纳', '商品销售', '税费'],
    difficulty: 2,
    role: 'cashier',
    description: '国庆促销期间，有零星客户现场选购促销D类商品，以现金方式支付货款2,260元（含税），出纳清点现金后开具收据。',
    tip: '促销现场现金收款，出纳需做到"唱收唱付"，当面清点现金并辨别真伪。会计分录：借：库存现金，贷：主营业务收入/应交税费-销项。收款后及时登记现金日记账，现金需当日存入保险柜。',
    entries: [
      { subjectCode: '1001', summary: '促销现金收款', debit: 2260, credit: 0, explanation: '库存现金增加记借方。促销商品零售收到现金2,260元，出纳需当面清点并辨别真伪，及时登记现金日记账。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入——主营业务产生的现金收入。'},
      { subjectCode: '6001', summary: '促销现金销售收入', debit: 0, credit: 2000, explanation: '主营业务收入增加记贷方。促销商品不含税收入=2,260÷1.13=2,000元，出纳需确认销售流水与收款金额一致。' },
      { subjectCode: '222101', summary: '促销现金销项税额', debit: 0, credit: 260, explanation: '应交税费-应交增值税（销项税额）增加记贷方。含税收入2,260×13%÷113%=260元。' },
    ],
    documents: [
      { type: 'receipt', label: '收款收据', docTitle: '促销商品销售收款收据（现金）', date: '2026-10-08', totalAmount: 2260, stampText: '财务专用章',
        items: [{ name: 'D类商品（国庆促销现金零售）', qty: 1, price: 2260, amount: 2260 }] },
    ],
  },
  {
    date: '2026-10-08',
    title: '促销商品微信收款',
    tags: ['出纳', '商品销售', '税费'],
    difficulty: 2,
    role: 'cashier',
    description: '客户通过扫描公司微信商户二维码，购买促销E类商品，支付3,390元（含税），出纳在微信商户后台确认收款到账。',
    tip: '微信收款属于第三方支付，通过"其他货币资金-微信账户"核算。出纳需登录微信商户平台核对收款记录与销售订单是否一致，截图保存电子回单。分录：借：其他货币资金-微信账户，贷：主营业务收入/应交税费-销项。',
    entries: [
      { subjectCode: '101204', summary: '微信收款-促销商品', debit: 3390, credit: 0, explanation: '其他货币资金-微信账户增加记借方。客户通过微信扫码支付3,390元，资金进入公司微信商户账户，出纳需在商户后台查询确认到账。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入——主营业务产生的现金收入。'},
      { subjectCode: '6001', summary: '微信促销销售收入', debit: 0, credit: 3000, explanation: '主营业务收入增加记贷方。促销商品不含税收入=3,390÷1.13=3,000元。' },
      { subjectCode: '222101', summary: '微信促销销项税额', debit: 0, credit: 390, explanation: '应交税费-应交增值税（销项税额）增加记贷方。微信收款含税价3,390元，税额=3,390×13%÷113%=390元。' },
    ],
    documents: [
      { type: 'text', label: '微信收款截图', docTitle: '微信商户后台收款记录', content: '交易时间：2026-10-08 14:23:15\n交易单号：WX202610081423150001\n付款方式：微信扫码\n交易金额：3,390.00元\n商品说明：促销E类商品\n交易状态：支付成功 ✅', stampText: '微信商户平台电子回单' },
    ],
  },
  {
    date: '2026-10-09',
    title: '促销商品支付宝收款',
    tags: ['出纳', '商品销售', '税费'],
    difficulty: 2,
    role: 'cashier',
    description: '客户通过支付宝扫码购买国庆促销F类商品，支付4,520元（含税），出纳登录支付宝企业版确认收款并记录。',
    tip: '支付宝收款与微信收款类似，通过"其他货币资金-支付宝账户"核算。出纳需在支付宝商家后台查看交易明细，与销售订单逐笔核对。当日支付宝收款建议日终前提现至银行账户，减少沉淀资金风险。',
    entries: [
      { subjectCode: '101205', summary: '支付宝收款-促销商品', debit: 4520, credit: 0, explanation: '其他货币资金-支付宝账户增加记借方。客户通过支付宝扫码支付4,520元，资金进入公司支付宝账户。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入——主营业务产生的现金收入。'},
      { subjectCode: '6001', summary: '支付宝促销销售收入', debit: 0, credit: 4000, explanation: '主营业务收入增加记贷方。促销商品不含税收入=4,520÷1.13=4,000元。' },
      { subjectCode: '222101', summary: '支付宝促销销项税额', debit: 0, credit: 520, explanation: '应交税费-应交增值税（销项税额）增加记贷方。支付宝收款4,520元，其中税额=4,520×13%÷113%=520元。' },
    ],
    documents: [
      { type: 'text', label: '支付宝收款截图', docTitle: '支付宝商家后台收款记录', content: '交易时间：2026-10-09 10:15:42\n交易单号：AL202610091015420001\n付款方式：支付宝扫码\n交易金额：4,520.00元\n商品说明：促销F类商品\n交易状态：交易成功 ✅', stampText: '支付宝商家平台电子回单' },
    ],
  },
  {
    date: '2026-10-10',
    title: '现金送存银行',
    tags: ['出纳', '资金管理'],
    difficulty: 1,
    role: 'cashier',
    description: '出纳将库存现金中超出日常备用金限额的5,000元送存工商银行账户，已填写现金缴款单办理完毕。',
    tip: '企业库存现金不能超过核定限额，超出部分需及时送存银行。分录：借：银行存款，贷：库存现金。出纳需填写"现金缴款单"到银行柜台办理，办理完成后将回单附在记账凭证后。',
    entries: [
      { subjectCode: '100201', summary: '现金送存银行', debit: 5000, credit: 0, explanation: '银行存款增加记借方。超限额现金送存银行后公司银行存款增加，出纳需登记银行存款日记账。' },
      { subjectCode: '1001', summary: '现金送存银行', debit: 0, credit: 5000, explanation: '库存现金减少记贷方。送存现金5,000元后保险柜现金减少，出纳需在现金日记账贷方登记此笔支出，并保管现金缴款单回单。' },
    ],
    documents: [
      { type: 'bank', label: '现金缴款单', date: '2026-10-10', totalAmount: 5000, payer: '本公司', payeeName: '本公司', content: '现金送存银行（超限额部分）', refNo: 'CJ202610100001' },
      { type: 'receipt', label: '缴款回单', docTitle: '现金进账单', date: '2026-10-10', totalAmount: 5000, stampText: '中国工商银行 业务清讫章',
        items: [{ name: '现金缴款（超限额备用金）', qty: 1, price: 5000, amount: 5000 }] },
    ],
  },
  {
    date: '2026-10-11',
    title: '购买转账支票',
    tags: ['出纳', '资金管理'],
    difficulty: 1,
    role: 'cashier',
    description: '出纳到工商银行购买转账支票簿一本（25张），支付工本费及手续费共计25元，银行直接从账户扣划。',
    tip: '购买支票簿的费用计入"财务费用"科目。分录：借：财务费用-手续费，贷：银行存款。出纳需保管好购买的空白支票，建立支票领用登记簿，实行"票印分离"管理（空白支票与印鉴章分开保管）。',
    entries: [
      { subjectCode: '6603', summary: '购买转账支票', debit: 25, credit: 0, explanation: '财务费用增加记借方。支票工本费及手续费属于银行服务费用，计入财务费用。' },
      { subjectCode: '100201', summary: '购买转账支票', debit: 0, credit: 25, explanation: '银行存款减少记贷方。银行直接扣划支票购买费用，出纳需核对银行回单金额后登记银行存款日记账。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6603），属于"支付其他与经营活动有关的现金"。'},
    ],
    documents: [
      { type: 'receipt', label: '工本费收据', docTitle: '中国工商银行收费凭证', date: '2026-10-11', totalAmount: 25, stampText: '中国工商银行 业务专用章',
        items: [{ name: '转账支票簿（25张）工本费', qty: 1, price: 25, amount: 25 }] },
    ],
  },
  {
    date: '2026-10-11',
    title: '银行账户管理费扣收',
    tags: ['出纳', '资金管理'],
    difficulty: 1,
    role: 'cashier',
    description: '收到工商银行10月份账户管理费及电子回单箱服务费回单，合计80元已从账户自动扣划，出纳确认并登记银行存款日记账。',
    tip: '银行账户管理费是银行对账户提供的日常管理服务收取的费用，属于财务费用。出纳收到银行扣款回单后需核对扣款金额是否合理，并登记银行存款日记账。对于自动扣划的费用，出纳应定期查看银行流水，确保无误。',
    entries: [
      { subjectCode: '6603', summary: '账户管理费', debit: 80, credit: 0, explanation: '财务费用-手续费增加记借方。银行账户管理费及回单箱服务费属于维护银行账户的必要支出。' },
      { subjectCode: '100201', summary: '账户管理费扣收', debit: 0, credit: 80, explanation: '银行存款减少记贷方。银行自动扣划管理费用80元，出纳需核对银行回单并登记日记账。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6603），属于"支付其他与经营活动有关的现金"。'},
    ],
    documents: [
      { type: 'bank', label: '银行扣款回单', date: '2026-10-11', totalAmount: 80, payer: '本公司', payeeName: '中国工商银行', content: '10月账户管理费及回单箱服务费', refNo: 'GL202610110001' },
    ],
  },
  {
    date: '2026-10-13',
    title: '银行转账支付电商平台推广费',
    tags: ['出纳', '费用管理'],
    difficulty: 1,
    role: 'cashier',
    description: '支付本月电商平台（天猫旗舰店）推广服务费8,000元，出纳通过工商银行网银办理转账，已核对推广合同及发票。',
    tip: '电商平台推广费属于销售费用-广告费。出纳办理转账时需核对收款方信息、金额与合同一致，付款后打印转账回单并登记银行日记账。推广服务费可在企业所得税前按规定扣除。',
    entries: [
      { subjectCode: '660101', summary: '支付电商推广费', debit: 8000, credit: 0, explanation: '销售费用-广告费增加记借方。国庆促销期间电商平台推广费用计入销售费用，属于促销配套支出。' },
      { subjectCode: '100201', summary: '支付电商推广费', debit: 0, credit: 8000, explanation: '银行存款减少记贷方。通过工商银行网银转账支付推广费，出纳需打印付款回单并登记银行存款日记账。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目660101），属于"支付其他与经营活动有关的现金"。'},
    ],
    documents: [
      { type: 'bank', label: '付款回单', date: '2026-10-13', totalAmount: 8000, payer: '本公司', payeeName: 'XX网络科技有限公司', content: '10月天猫旗舰店推广服务费', refNo: 'HD202610130001' },
      { type: 'receipt', label: '推广费发票', docTitle: '增值税普通发票', date: '2026-10-13', totalAmount: 8000, stampText: 'XX网络科技有限公司 发票专用章',
        items: [{ name: '天猫旗舰店推广服务（10月）', qty: 1, price: 8000, amount: 8000 }] },
    ],
  },
  {
    date: '2026-10-14',
    title: '银行转账缴纳社保费',
    tags: ['出纳', '工资社保'],
    difficulty: 1,
    role: 'cashier',
    description: '通过工商银行转账缴纳公司10月份社会保险费18,000元（含养老、医疗、失业、工伤保险），出纳收到社保局缴费通知单后办理转账。',
    tip: '社保费缴纳是出纳的定期付款业务。分录：借：应付职工薪酬-社保（公司部分），贷：银行存款。公司缴纳社保时先通过"应付职工薪酬-社保"归集，再支付给社保局。出纳需在缴费截止日前完成缴纳，避免产生滞纳金。',
    entries: [
      { subjectCode: '221102', summary: '缴纳10月社保费', debit: 18000, credit: 0, explanation: '应付职工薪酬-社保减少记借方。缴纳社保费用后公司对社保的负债减少。出纳需在缴费后向社保局索取缴费收据作为原始凭证。' },
      { subjectCode: '100201', summary: '缴纳10月社保费', debit: 0, credit: 18000, explanation: '银行存款减少记贷方。通过工商银行转账缴纳社保费，出纳需登记银行存款日记账并保管好社保缴费回单。' , cashFlowItem: 'cf-op3', cashFlowExplanation: '支付职工薪酬相关支出（配对科目221102），属于"支付给职工以及为职工支付的现金"——经营活动现金流出。'},
    ],
    documents: [
      { type: 'bank', label: '社保缴费回单', date: '2026-10-14', totalAmount: 18000, payer: '本公司', payeeName: '上海市社会保险事业管理中心', content: '2026年10月社会保险费', refNo: 'SB202610140001' },
      { type: 'text', label: '社保缴费通知单', docTitle: '上海市社会保险费缴纳通知书（10月）', content: '单位名称：本公司\n缴费金额合计：18,000元\n其中：养老保险10,000元、医疗保险5,000元、失业保险2,000元、工伤保险1,000元\n缴费截止日：2026年10月20日', stampText: '上海市社会保险事业管理中心 业务专用章' },
    ],
  },
  {
    date: '2026-10-15',
    title: '微信提现至银行',
    tags: ['出纳', '资金管理'],
    difficulty: 2,
    role: 'cashier',
    description: '出纳将微信商户账户余额中的3,000元提现至公司工商银行账户，在微信商户平台操作提现。',
    tip: '第三方支付账户内的资金提现至银行账户时：借：银行存款，贷：其他货币资金-微信账户。提现通常需要T+1个工作日到账，出纳需跟踪到账情况并核对金额。微信提现可能产生手续费，需一并处理。',
    entries: [
      { subjectCode: '100201', summary: '微信提现至工行', debit: 3000, credit: 0, explanation: '银行存款增加记借方。将微信商户余额提现至工商银行账户，银行存款增加。出纳需在提现操作后次日确认到账情况。' },
      { subjectCode: '101204', summary: '微信提现至工行', debit: 0, credit: 3000, explanation: '其他货币资金-微信账户减少记贷方。微信提现后微信商户余额减少3,000元，出纳需在微信商户平台核实提现记录。' },
    ],
    documents: [
      { type: 'text', label: '微信提现记录', docTitle: '微信商户平台提现记录', content: '提现时间：2026-10-15 16:30:00\n提现方式：普通提现（T+1到账）\n提现金额：3,000.00元\n到账账户：中国工商银行（尾号6789）\n提现单号：TX202610151630001\n状态：处理中（预计次日到账）', stampText: '微信商户平台' },
    ],
  },
  {
    date: '2026-10-16',
    title: '支付宝提现至银行',
    tags: ['出纳', '资金管理'],
    difficulty: 2,
    role: 'cashier',
    description: '出纳将支付宝企业账户余额中的4,000元提现至公司工商银行账户，在支付宝企业版操作提现。',
    tip: '支付宝提现与微信提现类似：借：银行存款，贷：其他货币资金-支付宝账户。出纳需注意支付宝企业版的提现限额和到账时间，合理安排资金。日常经营中建议定期将第三方支付账户余额提现至银行，减少资金分散风险。',
    entries: [
      { subjectCode: '100201', summary: '支付宝提现至工行', debit: 4000, credit: 0, explanation: '银行存款增加记借方。将支付宝余额提现至工商银行，银行存款增加4,000元。' },
      { subjectCode: '101205', summary: '支付宝提现至工行', debit: 0, credit: 4000, explanation: '其他货币资金-支付宝账户减少记贷方。支付宝提现后账户余额减少4,000元。出纳需关注提现手续费，通常在到账金额中直接扣除。' },
    ],
    documents: [
      { type: 'text', label: '支付宝提现记录', docTitle: '支付宝商家平台提现记录', content: '提现时间：2026-10-16 09:15:00\n提现方式：企业提现\n提现金额：4,000.00元\n到账账户：中国工商银行（尾号6789）\n提现单号：ALTX202610160915001\n状态：提现成功 ✅', stampText: '支付宝商家平台' },
    ],
  },
  {
    date: '2026-10-18',
    title: '收到客户银行汇款（前欠货款）',
    tags: ['出纳', '往来管理'],
    difficulty: 1,
    role: 'cashier',
    description: '收到乙公司通过工商银行汇来的前欠货款25,000元（部分偿还），出纳查询银行账户确认到账后开具收款收据。',
    tip: '收到客户偿还的欠款：借：银行存款，贷：应收账款。出纳需每日查询银行账户，及时确认客户回款，并登记银行存款日记账。对超过信用期的应收账款应提醒业务部门催收。',
    entries: [
      { subjectCode: '100201', summary: '收到乙公司回款', debit: 25000, credit: 0, explanation: '银行存款增加记借方。乙公司偿还前欠部分货款，出纳通过网银查询确认到账后登记银行存款日记账。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目112202），属于经营活动现金流入——主营业务产生的现金收入。'},
      { subjectCode: '112202', summary: '冲销乙公司应收账款', debit: 0, credit: 25000, explanation: '应收账款-乙公司减少记贷方。乙公司偿还部分欠款，应收账款减少。出纳需及时更新应收账款台账，跟踪剩余欠款的回收进度。' },
    ],
    documents: [
      { type: 'bank', label: '收款回单', date: '2026-10-18', totalAmount: 25000, payer: '乙公司', payeeName: '本公司', content: '前欠货款（部分偿还）', refNo: 'HD202610180001' },
      { type: 'receipt', label: '收款收据', docTitle: '收款收据', date: '2026-10-18', totalAmount: 25000, stampText: '财务专用章',
        items: [{ name: '乙公司偿还前欠货款（10月18日）', qty: 1, price: 25000, amount: 25000 }] },
    ],
  },
  {
    date: '2026-10-19',
    title: '备用金报销差旅费',
    tags: ['出纳', '费用管理'],
    difficulty: 1,
    role: 'cashier',
    description: '销售人员赵刚从广州出差归来，报销差旅费1,800元（含交通费1,200元、住宿费500元、市内交通费100元），原借款2,000元，退回多余现金200元。出纳审核报销单据后办理。',
    tip: '出差归来报销差旅费，多退少补。分录：借：管理费用（实际发生额），借或贷：库存现金（差额），贷：其他应收款（原借款额）。出纳需逐项审核发票的真实性、合规性，确认审批手续齐全后方可办理报销。',
    entries: [
      { subjectCode: '660201', summary: '报销差旅费', debit: 1800, credit: 0, explanation: '管理费用-办公费增加记借方。赵刚广州出差实际发生差旅费1,800元，发票审核无误后计入管理费用。' },
      { subjectCode: '1001', summary: '退回多余借款', debit: 200, credit: 0, explanation: '库存现金增加记借方。原借支2,000元，实际报销1,800元，退回现金200元，出纳清点无误后开具收款收据。' , cashFlowItem: 'cf-op5', cashFlowExplanation: '其他经营活动现金流入（配对科目1221），属于"收到其他与经营活动有关的现金"。'},
      { subjectCode: '1221', summary: '冲销预借差旅费', debit: 0, credit: 2000, explanation: '其他应收款减少记贷方。差旅费报销完毕冲销原借款，赵刚的借款记录结清。' },
    ],
    documents: [
      { type: 'receipt', label: '差旅费报销单', docTitle: '差旅费报销单', date: '2026-10-19', totalAmount: 1800, stampText: '财务专用章',
        items: [
          { name: '上海→广州高铁票', qty: 2, price: 600, amount: 1200 },
          { name: '酒店住宿费', qty: 2, price: 250, amount: 500 },
          { name: '市内交通费', qty: 1, price: 100, amount: 100 },
        ] },
      { type: 'text', label: '出差审批单', docTitle: '出差申请审批单', content: '出差人：赵刚（销售部）\n目的地：广州\n时间：10月8日-10月10日\n事由：拜访客户\n审批人：已审批 ✅\n\n实报：1,800元\n退回：200元', signature: '销售部 张明  财务部 王芳' },
    ],
  },
  {
    date: '2026-10-20',
    title: '银行回单整理归档',
    tags: ['出纳', '资金管理'],
    difficulty: 1,
    role: 'cashier',
    description: '出纳对10月中上旬各类银行回单进行整理、分类、粘贴，按日期顺序装订归档，确保每笔银行收支都有完整的原始凭证。',
    tip: '银行回单是出纳编制银行日记账和会计记账的重要原始凭证。出纳需定期将银行回单按日期顺序整理，与银行日记账逐笔勾对，确保"单单相符、账证相符"。这是出纳档案管理的基础工作。',
    entries: [],
    documents: [
      { type: 'text', label: '回单清单', docTitle: '银行回单归档清单（2026年10月中上旬）', content: '归档期间：10月1日-10月20日\n\n收款回单：\n1. 10/08 促销收款 152,550元\n2. 10/09 促销收款 62,150元\n3. 10/10 买赠收款 8,475元\n4. 10/11 套装收款 10,848元\n5. 10/17 折扣收款 66,600元\n6. 10/18 客户还款 25,000元\n\n付款回单：\n1. 10/02 提取备用金 5,000元\n2. 10/11 购买支票 25元\n3. 10/11 账户管理费 80元\n4. 10/12 返利支付 4,000元\n5. 10/13 推广费 8,000元\n6. 10/14 社保费 18,000元\n\n已整理核对无误。', signature: '出纳 刘静' },
    ],
  },
  {
    date: '2026-10-25',
    title: '编制资金日报表',
    tags: ['出纳', '资金管理'],
    difficulty: 1,
    role: 'cashier',
    description: '出纳编制10月下旬资金日报表，汇总本期现金及银行存款的收支情况，上报财务主管审阅。',
    tip: '资金日报是出纳日常管理的重要工具，向管理层反映最新资金动态。内容包括：当日现金/银行存款收支明细、余额、大额资金变动说明等。定期编制资金报表有助于企业掌握现金流状况，防范资金风险。',
    entries: [],
    documents: [
      { type: 'text', label: '资金日报表', docTitle: '资金日报表（2026年10月25日）', content: '一、库存现金\n上日余额：1,200元\n本日收入：200元（差旅费退回）\n本日支出：0元\n本日余额：1,400元\n\n二、银行存款（工行）\n上日余额：486,870元\n本日收入：0元\n本日支出：0元\n本日余额：486,870元\n\n三、其他货币资金\n微信账户余额：390元\n支付宝账户余额：520元\n\n编制人：出纳 刘静\n审核人：财务主管 王芳', stampText: '财务专用章' },
    ],
  },
  {
    date: '2026-10-26',
    title: '库存现金盘点',
    tags: ['出纳', '期末'],
    difficulty: 1,
    role: 'cashier',
    description: '出纳对库存现金进行月末盘点，保险柜实有现金1,400元，现金日记账余额1,400元，账实相符。盘点表经财务主管签字确认。',
    tip: '出纳应定期（至少每月一次）对库存现金进行盘点，确保账实相符。盘点时财务主管应在场监盘，盘点表由出纳和监盘人双签。如发现短缺或溢余，应立即查明原因并按规定处理。',
    entries: [],
    documents: [
      { type: 'text', label: '现金盘点表', docTitle: '库存现金盘点表（2026年10月26日）', content: '盘点时间：2026年10月26日 17:00\n\n面值100元：10张=1,000元\n面值50元：4张=200元\n面值20元：5张=100元\n面值10元：5张=50元\n面值5元：5张=25元\n面值1元：25枚=25元\n\n实盘金额：1,400.00元\n账面余额：1,400.00元\n差异：0.00元\n结论：账实相符 ✅\n\n监盘说明：经现场盘点，现金实有数与日记账余额一致，未发现白条抵库及挪用现金现象。', signature: '出纳 刘静  监盘人 财务主管 王芳' },
    ],
  },
  {
    date: '2026-10-28',
    title: '节前应付账款支付',
    tags: ['出纳', '往来管理'],
    difficulty: 1,
    role: 'cashier',
    description: '国庆促销期间为补充库存向供应商采购商品，现需支付丙公司部分前欠货款20,000元，出纳通过工商银行网银办理转账。',
    tip: '支付供应商货款是出纳的重要付款业务。分录：借：应付账款，贷：银行存款。出纳付款前必须核对采购合同、入库单、发票三单一致，并确认审批手续齐全后方可付款。节前及时支付货款有助于维护良好的供应商关系，确保后续供货稳定。',
    entries: [
      { subjectCode: '220201', summary: '支付丙公司货款', debit: 20000, credit: 0, explanation: '应付账款-丙公司减少记借方。偿还丙公司部分欠款后公司债务减少，出纳需在付款后通知供应商查收。' },
      { subjectCode: '100201', summary: '支付丙公司货款', debit: 0, credit: 20000, explanation: '银行存款减少记贷方。通过工商银行网银转账支付货款20,000元，出纳需打印转账回单并登记银行存款日记账。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目220201），属于"支付其他与经营活动有关的现金"。'},
    ],
    documents: [
      { type: 'bank', label: '付款回单', date: '2026-10-28', totalAmount: 20000, payer: '本公司', payeeName: '丙公司', content: '支付前欠采购货款（部分）', refNo: 'HD202610280002' },
      { type: 'text', label: '付款审批单', docTitle: '付款申请审批单', content: '收款单位：丙公司\n付款事由：支付前欠采购货款\n应付金额：54,240元（10/20赊购发票No.3200678910）\n本次支付：20,000元\n部门负责人：已审批 ✅\n财务负责人：已审批 ✅', signature: '采购部 李强  财务部 王芳' },
    ],
  },

  // ═══════════════════════════════════════════
  // 月末出纳核对
  // ═══════════════════════════════════════════
  {
    date: '2026-10-31',
    title: '月末银行存款余额核对',
    tags: ['出纳', '期末'],
    difficulty: 1,
    role: 'cashier',
    description: '月末核对工商银行日记账余额与银行对账单是否一致，编制银行存款余额调节表。',
    tip: '月末出纳需核对银行日记账与银行对账单余额，检查是否有未达账项并及时处理。这是出纳每月必做的基础工作，确保资金安全。',
    entries: [],
    documents: [
      { type: 'text', label: '银行对账单', docTitle: '中国工商银行对账单（2026年10月）', content: '账户：xxxxxxxxxxxx\n\n本期主要发生额：\n贷方（收入）：促销收款152,550+62,150+买赠8,475+套装10,848+折扣收款66,600+现销5,650+赊销收款33,900=340,173元\n借方（支出）：返利4,000+广告费10,000+运杂费3,000+现购45,200+付应付账款30,000+工资60,000=152,200元\n\n请根据日记账计算期末余额并与银行对账单核对。', stampText: '中国工商银行 业务专用章' },
    ],
  },
]

export default tasks
