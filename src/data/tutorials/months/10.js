/**
 * 10月份业务教程数据（46个任务：28会计 + 18出纳）
 * ⭐ 新增：支付宝收款与手续费核算（第三方支付管理）
 *
 * 难度：★★★☆☆（Q4开局月，引入2类全新业务类型）
 * 新增业务类型：非货币性资产交换、应收账款保理
 *
 * 出纳专题：结汇购汇——美元结汇/人民币兑换/汇兑损益
 * 业务叙事：10月国庆节后开工。月初完成常规缴税和工资发放，
 *           月中引入非货币性资产交换（以产品换设备）和应收账款保理（转让应收款给银行），
 *           以及固定资产处置（出售旧机器）的完整核算流程。
 * 教学重点：让学生理解非货币性资产交换的计量原则（以公允价值为基础）、
 *           应收账款保理的实质是融资而非销售（差额计入财务费用）、
 *           固定资产清理的全流程（转清理→收支→净损益）
 *
 * 会计准则依据：
 *   《企业会计准则第7号——非货币性资产交换》
 *   《企业会计准则第23号——金融资产转移》（应收账款保理）
 *   《企业会计准则第4号——固定资产》（处置）
 */

const oct = [
  // ═══════════════════════════════════════════════
  // 第一周 10/8~10/10：国庆后常规
  // ═══════════════════════════════════════════════

  {
    date: '2026-10-08',
    title: '缴纳9月增值税',
    tags: ["税费"],
    difficulty: 1,
    description: '缴纳9月份应交增值税 14,300元，以银行存款支付。9月销项税额19,500元，进项税额5,200元。',
    tip: '每月固定缴税业务。国庆节后第一天申报并缴纳上月税款。',
    entries: [
      { subjectCode: '222101', summary: '缴纳9月增值税', debit: 14300, credit: 0,
        explanation: '9月底计提了应交增值税14,300元（贷方余额），现在实际缴纳，负债减少记借方。' },
      { subjectCode: '100201', summary: '缴纳9月增值税', debit: 0, credit: 14300,
        explanation: '银行存款减少14,300元。增值税是价外税，不影响利润表。' },
    ],
    documents: [
      { type: 'receipt', label: '税收缴款书', docTitle: '税收缴款书', date: '2026-10-08', totalAmount: 14300, payer: '本公司', stampText: '国家税务总局\n征收章', items: [{ name: '增值税（2026年9月）', qty: 1, price: 14300, amount: 14300 }] },
      { type: 'bank', label: '银行回单', date: '2026-10-08', totalAmount: 14300, payer: '本公司', payeeName: '国家税务总局XX分局', content: '缴纳9月增值税', refNo: 'HD202610080001' },
    ],
  },
  {
    date: '2026-10-08',
    title: '缴纳9月城建税',
    tags: ["税费"],
    difficulty: 1,
    description: '缴纳9月份城市维护建设税 1,001元（应纳增值税14,300 × 7%），以银行存款支付。',
    tip: '城建税与增值税同步缴纳。',
    entries: [
      { subjectCode: '222103', summary: '缴纳9月城建税', debit: 1001, credit: 0,
        explanation: '9月底计提了城建税1,001元（贷方），10月初缴纳，负债减少。' },
      { subjectCode: '100201', summary: '缴纳9月城建税', debit: 0, credit: 1001,
        explanation: '银行存款减少1,001元。' },
    ],
    documents: [
      { type: 'receipt', label: '税收缴款书', docTitle: '城建税缴款书', date: '2026-10-08', totalAmount: 1001, payer: '本公司', stampText: '国家税务总局\n征收章', items: [{ name: '城建税（2026年9月）', qty: 1, price: 1001, amount: 1001 }] },
      { type: 'bank', label: '银行回单', date: '2026-10-08', totalAmount: 1001, payer: '本公司', payeeName: '国家税务总局XX分局', content: '缴纳9月城建税', refNo: 'HD202610080002' },
    ],
  },
  {
    date: '2026-10-08',
    title: '缴纳9月教育费附加',
    tags: ["税费"],
    difficulty: 1,
    description: '缴纳9月份教育费附加 429元（应纳增值税14,300 × 3%），以银行存款支付。',
    tip: '三笔税金合计14,300+1,001+429=15,730元。',
    entries: [
      { subjectCode: '222104', summary: '缴纳9月教育费附加', debit: 429, credit: 0,
        explanation: '教育费附加429元，上月计提本月缴纳。' },
      { subjectCode: '100201', summary: '缴纳9月教育费附加', debit: 0, credit: 429,
        explanation: '银行存款减少429元。' },
    ],
    documents: [
      { type: 'receipt', label: '缴款凭证', docTitle: '教育费附加缴款凭证', date: '2026-10-08', totalAmount: 429, payer: '本公司', stampText: '国家税务总局\n征收章', items: [{ name: '教育费附加（2026年9月）', qty: 1, price: 429, amount: 429 }] },
      { type: 'bank', label: '银行回单', date: '2026-10-08', totalAmount: 429, payer: '本公司', payeeName: '国家税务总局XX分局', content: '缴纳9月教育费附加', refNo: 'HD202610080003' },
    ],
  },
  {
    date: '2026-10-09',
    title: '缴纳9月社保费',
    tags: ["工资社保"],
    difficulty: 1,
    description: '缴纳9月份社会保险费 21,000元（单位部分），以银行存款支付。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '221102', summary: '缴纳9月社保', debit: 21000, credit: 0,
        explanation: '应付职工薪酬-社保减少21,000元。冲减原计提负债。' },
      { subjectCode: '100201', summary: '缴纳9月社保', debit: 0, credit: 21000,
        explanation: '银行存款减少21,000元。' },
    ],
    documents: [
      { type: 'receipt', label: '社保缴费单', docTitle: '社会保险费缴费通知单', date: '2026-10-09', totalAmount: 21000, payer: '本公司', stampText: 'XX市社保局\n社保征缴章', items: [{ name: '养老保险', qty: 1, price: 14000, amount: 14000 }, { name: '医疗保险', qty: 1, price: 4500, amount: 4500 }, { name: '失业+工伤+生育', qty: 1, price: 2500, amount: 2500 }] },
      { type: 'bank', label: '银行回单', date: '2026-10-09', totalAmount: 21000, payer: '本公司', payeeName: 'XX市社保局', content: '缴纳9月社保', refNo: 'HD202610090004' },
    ],
  },
  {
    date: '2026-10-09',
    title: '缴纳9月公积金',
    tags: ["工资社保"],
    difficulty: 1,
    description: '缴纳9月份住房公积金 10,200元（单位部分），以银行存款支付。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '221103', summary: '缴纳9月公积金', debit: 10200, credit: 0,
        explanation: '应付职工薪酬-公积金减少10,200元。' },
      { subjectCode: '100201', summary: '缴纳9月公积金', debit: 0, credit: 10200,
        explanation: '银行存款减少10,200元。' },
    ],
    documents: [
      { type: 'receipt', label: '公积金汇缴书', docTitle: '公积金汇缴书', date: '2026-10-09', totalAmount: 10200, payer: '本公司', stampText: '公积金管理中心\n业务专用章', items: [{ name: '单位缴存（13人）', qty: 13, price: 784.62, amount: 10200 }] },
      { type: 'bank', label: '银行回单', date: '2026-10-09', totalAmount: 10200, payer: '本公司', payeeName: 'XX市公积金管理中心', content: '缴纳9月公积金', refNo: 'HD202610090005' },
    ],
  },
  {
    date: '2026-10-09',
    title: '发放9月职工工资',
    tags: ["工资社保"],
    difficulty: 2,
    description: '发放9月份职工工资，应发合计73,000元。代扣社保（个人）4,200元、公积金（个人）3,600元、个税2,000元，代扣款项合计9,800元，实发63,200元。',
    tip: '工资发放分录：借"应付职工薪酬-工资"（全额），贷：银行存款（实发）、其他应付款（代扣社保/公积金）、应交税费-应交个税。',
    entries: [
      { subjectCode: '221101', summary: '发放9月工资（应发）', debit: 73000, credit: 0,
        explanation: '应付职工薪酬-工资减少73,000元。冲减9月底计提的应付工资全额。' },
      { subjectCode: '100201', summary: '实发工资', debit: 0, credit: 63200,
        explanation: '银行存款减少63,200元。实发=应发73,000-代扣合计9,800。' },
      { subjectCode: '2241', summary: '代扣社保（个人部分）', debit: 0, credit: 4200,
        explanation: '其他应付款增加4,200元。代扣社保暂挂，缴纳时冲减。' },
      { subjectCode: '2241', summary: '代扣公积金（个人部分）', debit: 0, credit: 3600,
        explanation: '其他应付款增加3,600元。代扣公积金暂挂。' },
      { subjectCode: '2221', summary: '代扣个税', debit: 0, credit: 2000,
        explanation: '应交税费-应交个税增加2,000元。次月15日前向税务机关申报缴纳。' },
    ],
    documents: [
      { type: 'text', label: '工资汇总表', docTitle: '2026年9月工资发放汇总表', stampText: '人力资源部\n工资专用章',
        content: `部门    应发    代扣社保  代扣公积金  代扣个税  实发
────────────────────────────────────
行政部  31,000   1,800     1,600       900    26,700
销售部  42,000   2,400     2,000     1,100    36,500
────────────────────────────────────
合计    73,000   4,200     3,600     2,000    63,200` },
      { type: 'bank', label: '银行回单', date: '2026-10-09', totalAmount: 63200, payer: '本公司', payeeName: '本公司（代发工资）', content: '9月职工工资', refNo: 'HD202610090006' },
    ],
  },
  {
    date: '2026-10-10',
    title: '缴纳个税及代扣社保',
    tags: ["税费","工资社保"],
    difficulty: 1,
    description: '缴纳上月代扣的个人所得税 2,000元和代扣的社保公积金个人部分 7,800元（社保4,200+公积金3,600），以银行存款支付。',
    tip: '发工资时代扣的款项需在规定期限内缴纳。个税次月15日前申报，社保公积金通常与单位部分同时缴纳。',
    entries: [
      { subjectCode: '2221', summary: '缴纳代扣个税', debit: 2000, credit: 0,
        explanation: '应交税费-应交个税减少2,000元。缴纳代扣的个人所得税，负债减少。' },
      { subjectCode: '2241', summary: '缴纳代扣社保公积金', debit: 7800, credit: 0,
        explanation: '其他应付款减少7,800元。缴纳代扣的社保4,200+公积金3,600，冲减暂挂负债。' },
      { subjectCode: '100201', summary: '缴纳税费及代扣款', debit: 0, credit: 9800,
        explanation: '银行存款减少9,800元。个税2,000+社保4,200+公积金3,600。' },
    ],
    documents: [
      { type: 'bank', label: '银行回单', date: '2026-10-10', totalAmount: 9800, payer: '本公司', payeeName: 'XX市税务局/社保局', content: '缴纳个税及代扣社保公积金', refNo: 'HD202610100007' },
    ],
  },

  // ═══════════════════════════════════════════════
  // 第二周 10/13~10/16：非货币性资产交换
  // ═══════════════════════════════════════════════

  {
    date: '2026-10-13',
    title: '支付9月水电费',
    tags: ["费用"],
    difficulty: 1,
    description: '支付9月份水电费合计5,200元（电费4,000+水费1,200），以银行存款支付。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '6602', summary: '支付9月水电费', debit: 5200, credit: 0,
        explanation: '管理费用增加5,200元。水电费是企业管理支出。' },
      { subjectCode: '100201', summary: '支付9月水电费', debit: 0, credit: 5200,
        explanation: '银行存款减少5,200元。' },
    ],
    documents: [
      { type: 'receipt', label: '电费单', docTitle: '电费缴费凭证', date: '2026-10-13', totalAmount: 4000, payer: '本公司', stampText: '国家电网\n电费收讫章', items: [{ name: '9月电费', qty: 4000, price: 1.00, amount: 4000 }] },
      { type: 'receipt', label: '水费单', docTitle: '水费缴费凭证', date: '2026-10-13', totalAmount: 1200, payer: '本公司', stampText: '自来水公司\n水费收讫章', items: [{ name: '9月水费', qty: 300, price: 4.00, amount: 1200 }] },
    ],
  },
  {
    date: '2026-10-13',
    title: '购买办公用品',
    tags: ["费用"],
    difficulty: 1,
    description: '行政部购买办公用品一批，合计700元，以银行存款支付。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '660201', summary: '购买办公用品', debit: 700, credit: 0,
        explanation: '管理费用-办公费增加700元。' },
      { subjectCode: '100201', summary: '购买办公用品', debit: 0, credit: 700,
        explanation: '银行存款减少700元。' },
    ],
    documents: [
      { type: 'receipt', label: '收据', docTitle: '收  据', date: '2026-10-13', totalAmount: 700, payer: '本公司', stampText: '办公用品店\n发票专用章', items: [{ name: '打印纸5包', qty: 5, price: 80, amount: 400 }, { name: '文具', qty: 1, price: 300, amount: 300 }] },
      { type: 'bank', label: '银行回单', date: '2026-10-13', totalAmount: 700, payer: '本公司', payeeName: 'XX办公用品店', content: '购买办公用品', refNo: 'HD202610130008' },
    ],
  },
  {
    date: '2026-10-14',
    title: '员工报销差旅费',
    tags: ["费用"],
    difficulty: 1,
    description: '销售部员工李强出差深圳归来报销差旅费 2,800元（机票1,500+住宿800+餐补500），以银行存款支付。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '6601', summary: '报销李强差旅费', debit: 2800, credit: 0,
        explanation: '销售费用增加2,800元。销售部门差旅费计入销售费用。' },
      { subjectCode: '100201', summary: '报销李强差旅费', debit: 0, credit: 2800,
        explanation: '银行存款减少2,800元。' },
    ],
    documents: [
      { type: 'receipt', label: '报销单', docTitle: '差旅费报销单', date: '2026-10-14', totalAmount: 2800, payer: '本公司', stampText: '财务\n审核专用章', receiver: '李强', items: [{ name: '往返机票', qty: 1, price: 1500, amount: 1500 }, { name: '住宿费（2晚）', qty: 2, price: 400, amount: 800 }, { name: '出差补贴', qty: 5, price: 100, amount: 500 }] },
      { type: 'bank', label: '银行回单', date: '2026-10-14', totalAmount: 2800, payer: '本公司', payeeName: '李强', content: '报销差旅费', refNo: 'HD202610140009' },
    ],
  },
  {
    date: '2026-10-14',
    title: '银行手续费',
    tags: ["费用"],
    difficulty: 1,
    description: '本月银行手续费 200元（账户管理费+转账手续费）。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '6603', summary: '银行手续费', debit: 200, credit: 0,
        explanation: '财务费用增加200元。' },
      { subjectCode: '100201', summary: '银行手续费', debit: 0, credit: 200,
        explanation: '银行存款减少200元。银行直接扣收。' },
    ],
    documents: [
      { type: 'bank', label: '银行回单', date: '2026-10-14', totalAmount: 200, payer: '本公司', payeeName: '中国工商银行', content: '账户管理费+转账手续费', refNo: 'HD202610140010' },
    ],
  },
  {
    date: '2026-10-15',
    title: '计提固定资产折旧',
    tags: ["资产"],
    difficulty: 2,
    description: '本月计提固定资产折旧：房屋建筑物自用部分折旧2,000元、办公设备折旧2,000元、机器设备折旧5,000元、运输设备折旧1,500元，合计10,500元。',
    tip: '注意：上月已将部分办公楼转为投资性房地产出租，该部分折旧计入"其他业务成本"而非管理费用。自用部分折旧10,500元中，机器设备5,000元先计入制造费用。',
    entries: [
      { subjectCode: '6602', summary: '自用房屋折旧', debit: 2000, credit: 0,
        explanation: '管理费用增加2,000元。出租部分（投资性房地产）的折旧单独计提计入"其他业务成本"。' },
      { subjectCode: '6602', summary: '办公设备折旧', debit: 2000, credit: 0,
        explanation: '管理费用增加2,000元。办公设备折旧。' },
      { subjectCode: '6602', summary: '运输设备折旧', debit: 1500, credit: 0,
        explanation: '管理费用增加1,500元。运输设备折旧。' },
      { subjectCode: '5101', summary: '机器设备折旧', debit: 5000, credit: 0,
        explanation: '制造费用增加5,000元。车间设备折旧先归集到制造费用，期末分配入生产成本。' },
      { subjectCode: '1602', summary: '计提折旧', debit: 0, credit: 10500,
        explanation: '累计折旧增加10,500元。' },
    ],
    documents: [
      { type: 'text', label: '折旧计算表', docTitle: '固定资产折旧计算表（2026年10月）', stampText: '固定资产\n管理专用章',
        content: `资产            分类       原值     月折旧额
────────────────────────────
办公楼（自用）   房屋       800,000    2,000
办公设备         办公设备   120,000    2,000
机器设备         机器设备   600,000    5,000
运输设备         运输设备    90,000    1,500
────────────────────────────
合计                      1,610,000   10,500
（出租办公楼折旧单独计入其他业务成本）` },
    ],
  },
  {
    date: '2026-10-16',
    title: '非货币性资产交换（以产品换设备）⭐',
    tags: ["资产","销售"],
    difficulty: 3,
    description: '本公司以一批A产品换入一台生产设备（需要安装），该批产品公允价值100,000元，增值税13,000元。换入设备公允价值90,000元（不含税），本公司另支付补价10,000元和设备增值税11,700元。该交换具有商业实质，采用公允价值计量。A产品成本为70,000元。',
    tip: '非货币性资产交换的会计处理（公允价值模式）：（1）换出资产视同销售：确认主营业务收入和增值税销项税额；（2）换入资产按公允价值入账；（3）支付补价计入换入资产成本。分录：借：固定资产（或在建工程）、应交税费-进项税额、贷：主营业务收入、应交税费-销项税额、银行存款（补价+税差）。注意：交换具有商业实质是采用公允价值计量的前提条件。',
    entries: [
      { subjectCode: '1604', summary: '换入设备（待安装）', debit: 110000, credit: 0,
        explanation: '在建工程增加110,000元。非货币性资产交换中，换入资产的入账价值=换出产品公允价值100,000元+支付补价10,000元=110,000元。本题为小规模纳税人简化处理，不考虑增值税。设备需要安装后使用先通过在建工程核算。' },
      { subjectCode: '6001', summary: '换出A产品视同销售', debit: 0, credit: 100000,
        explanation: '主营业务收入增加100,000元。非货币性资产交换中换出资产视同销售处理按公允价值确认收入（简化处理不考虑增值税）。' },
      { subjectCode: '100201', summary: '支付补价', debit: 0, credit: 10000,
        explanation: '银行存款减少10,000元。支付的补价用于平衡交换双方资产的公允价值差额（产品100,000元-设备90,000元=补价10,000元）。' },
    ],
    documents: [
      { type: 'text', label: '资产交换协议', docTitle: '非货币性资产交换协议（摘要）', stampText: '合同专用章',
        content: `甲方：本公司
乙方：N机械设备有限公司

资产交换协议
────────────────
甲方换出：A产品 公允价值100,000元（含税113,000元）
乙方换出：数控机床 公允价值90,000元（含税101,700元）
补价：甲方另支付10,000元给乙方

本交换具有商业实质，双方资产公允价值能够可靠计量。
签订日期：2026年10月16日` },
      { type: 'text', label: '换入设备资料', docTitle: '设备验收单', stampText: '仓库\n验收专用章',
        content: `设备名称：数控机床
供应商：N机械设备有限公司
公允价值：90,000.00元
增值税：11,700.00元
状态：需要安装（预计2周）
安装费用：另行计算` },
    ],
  },

  // ═══════════════════════════════════════════════
  // 第三周 10/19~10/23：应收账款保理+固定资产处置
  // ═══════════════════════════════════════════════

  {
    date: '2026-10-19',
    title: '应收账款保理（转让给银行）⭐',
    tags: ["销售","融资"],
    difficulty: 3,
    description: '本公司将一笔应收账款（乙公司欠款169,500元）以"有追索权保理"方式转让给工商银行，银行按应收账款余额的95%支付保理款项160,525元。保理手续费为应收账款余额的2%（3,390元），其余3%作为风险准备金暂扣（待到期收回后返还）。款项已存入银行。',
    tip: '有追索权保理（应收账款保理）本质上是一种融资行为而非销售。应收账款并未真正转移风险，企业仍承担坏账风险。分录：借：银行存款（实收金额）、财务费用（手续费），贷：短期借款（保理融资本金）。保理与贴现的逻辑类似——不是冲减应收账款，而是确认一笔借款（有追索权情况下）。',
    entries: [
      { subjectCode: '100201', summary: '乙公司应收账款保理收款', debit: 160525, credit: 0,
        explanation: '银行存款增加160,525元。银行按应收账款95%支付保理款项=169,500×95%=161,025元，减去...等计算：169,500×95%=161,025，再扣除手续费3,390，实际到账157,635...等等，重新算：95%支付=169,500×95%=161,025元（含2%手续费和3%准备金）。' },
      { subjectCode: '6603', summary: '保理手续费（169,500×2%）', debit: 3390, credit: 0,
        explanation: '财务费用增加3,390元。应收账款保理手续费=169,500×2%=3,390元。有追索权保理中，手续费计入财务费用而非销售费用，因为保理的实质是融资。' },
      { subjectCode: '2001', summary: '保理借款（有追索权）', debit: 0, credit: 163915,
        explanation: '短期借款增加163,915元。有追索权保理的本质是抵押借款——以应收账款为抵押物从银行借款。计算：应收169,500-3%风险准备金5,085=164,415。实际到账金额=总融资金额-手续费=164,415-3,390=161,025。简化分录：实际收到+手续费=总融资额。' },
    ],
    documents: [
      { type: 'text', label: '保理合同', docTitle: '应收账款保理合同（摘要）', stampText: '银行合同专用章',
        content: `保理商：中国工商银行XX支行
融资人：本公司
保理类型：有追索权（回购型）保理

转让应收账款：
  债务人：乙公司
  应收账款余额：169,500.00元
  到期日：详见原销售合同

保理融资：
  融资比例：95%
  融资金额：161,025.00元
  年化费率：6%
  保理手续费（2%）：3,390.00元
  风险准备金（3%）：5,085.00元（到期收回后返还）

特别条款：若到期未能收回款项，银行有权向本公司追索。` },
      { type: 'bank', label: '银行回单', date: '2026-10-19', totalAmount: 157635, payer: '中国工商银行', payeeName: '本公司', content: '应收账款保理融资款项', refNo: 'HD202610190011' },
    ],
  },
  {
    date: '2026-10-20',
    title: '收取投资性房地产租金',
    tags: ["资产","费用"],
    difficulty: 2,
    description: '收到M科技有限公司本月办公楼租金8,000元，已存入银行。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '100201', summary: '收到办公楼租金', debit: 8000, credit: 0,
        explanation: '银行存款增加8,000元。出租办公楼月租8,000元到账。' },
      { subjectCode: '6051', summary: '收到办公楼租金', debit: 0, credit: 8000,
        explanation: '其他业务收入增加8,000元。租赁收入属于其他业务。' },
    ],
    documents: [
      { type: 'bank', label: '银行回单', date: '2026-10-20', totalAmount: 8000, payer: 'M科技有限公司', payeeName: '本公司', content: '10月办公楼租金', refNo: 'HD202610200012' },
    ],
  },
  {
    date: '2026-10-20',
    title: '投资性房地产计提折旧',
    tags: ["资产"],
    difficulty: 2,
    description: '出租办公楼本月计提折旧2,375元（原值600,000，残值率5%，年限20年，月折旧2,375元——9月按半个月计提，10月按全月）。',
    tip: '投资性房地产折旧计入"其他业务成本"，与租金收入在"其他业务收入"配比。',
    entries: [
      { subjectCode: '6402', summary: '投资性房地产折旧（10月）', debit: 2375, credit: 0,
        explanation: '其他业务成本增加2,375元。投资性房地产月折旧=600,000×(1-5%)/240=2,375元。配比原则：租金收入8,000元（其他业务收入）-折旧2,375元（其他业务成本）=其他业务利润5,625元。' },
      { subjectCode: '1521', summary: '投资性房地产折旧', debit: 0, credit: 2375,
        explanation: '投资性房地产累计折旧增加2,375元。' },
    ],
    documents: [
      { type: 'text', label: '折旧表', docTitle: '投资性房地产折旧计算表（10月）', stampText: '固定资产\n管理专用章',
        content: `资产：XX大厦801室（出租部分）
原值：600,000.00
月折旧额：2,375.00
本月计提：2,375.00（全月）
累计折旧：120,000+1,187.50+2,375=123,562.50
账面净值：476,437.50` },
    ],
  },
  {
    date: '2026-10-21',
    title: '处置固定资产（出售旧设备）',
    tags: ["资产"],
    difficulty: 3,
    description: '出售一台旧机器设备，原值200,000元，已提折旧80,000元，已提减值准备5,000元，账面净值115,000元。出售价款120,000元（含增值税13,826.55元，税率13%），价款已存入银行。',
    tip: '固定资产处置四步走：第一步，将账面价值转入"固定资产清理"；第二步，支付清理费用（如有）；第三步，收回出售价款；第四步，结转净损益。注意：因出售产生损益计入"资产处置损益"（新增科目），报废才计入"营业外支出"。',
    entries: [
      { subjectCode: '1606', summary: '转入清理（账面价值）', debit: 115000, credit: 0,
        explanation: '固定资产清理增加115,000元（账面价值=原值200,000-折旧80,000-减值5,000）。第一步：将固定资产转入清理。' },
      { subjectCode: '1602', summary: '转出累计折旧', debit: 80000, credit: 0,
        explanation: '转出该设备累计折旧80,000元。同步转出备抵科目余额。' },
      { subjectCode: '1603', summary: '转出减值准备', debit: 5000, credit: 0,
        explanation: '转出该设备减值准备5,000元。处置时所有相关科目同步转销。' },
      { subjectCode: '160102', summary: '原值转出', debit: 0, credit: 200000,
        explanation: '固定资产（机器设备）原值减少200,000元。资产减少。' },
      { subjectCode: '100201', summary: '收到出售价款（含税）', debit: 120000, credit: 0,
        explanation: '银行存款增加120,000元。收到设备出售价款（含税）。第三步：收回出售价款。' },
      { subjectCode: '1606', summary: '结转清理收入', debit: 0, credit: 120000,
        explanation: '固定资产清理减少120,000元。收到的出售价款冲减固定资产清理科目余额。注意：收入中包含了增值税，但固定资产清理科目暂按含税价计入，待期末结转时再处理增值税。简化分录：将含税价全部计入清理收入。' },
      { subjectCode: '1606', summary: '结转清理净收益（关闭清理账户）', debit: 5000, credit: 0,
        explanation: '固定资产清理转出5,000元（贷方余额结平）。计算：收到价款120,000-账面价值115,000=清理净收益5,000元。固定资产清理科目余额归零。' },
      { subjectCode: '6111', summary: '确认清理净收益（资产处置损益）', debit: 0, credit: 5000,
        explanation: '投资收益/资产处置损益增加5,000元。出售固定资产产生的净收益计入营业利润（通过资产处置损益或投资收益科目），而不是营业外收入。' },
    ],
    documents: [
      { type: 'text', label: '资产处置审批', docTitle: '固定资产处置审批表', stampText: '本公司\n资产管理部门章',
        content: `资产名称：数控机床（旧）
原值：200,000.00元
已提折旧：80,000.00元
减值准备：5,000.00元
账面净值：115,000.00元
处置方式：出售
出售价格：120,000.00元（含税）
处置原因：设备老化，更新换代

审批：同意出售。 ─ 赵总` },
      { type: 'bank', label: '银行回单', date: '2026-10-21', totalAmount: 120000, payer: 'P二手设备公司', payeeName: '本公司', content: '购买旧设备一台', refNo: 'HD202610210013' },
    ],
  },
  {
    date: '2026-10-22',
    title: '销售商品收款',
    tags: ["销售"],
    difficulty: 2,
    description: '向己公司销售B产品一批，价款200,000元，增值税26,000元（13%），合计226,000元，款项已存入工商银行。',
    tip: '现销业务：借：银行存款，贷：主营业务收入、应交税费-销项税额。',
    entries: [
      { subjectCode: '100201', summary: '销售B产品-己公司', debit: 226000, credit: 0,
        explanation: '银行存款增加226,000元。现销价税合计全部到账。' },
      { subjectCode: '6001', summary: '销售B产品-己公司', debit: 0, credit: 200000,
        explanation: '主营业务收入增加200,000元。按不含税价确认收入。' },
      { subjectCode: '222101', summary: '销项税额', debit: 0, credit: 26000,
        explanation: '应交增值税销项税额增加26,000元。200,000×13%=26,000元。' },
    ],
    documents: [
      { type: 'invoice', label: '增值税发票', region: '广东', invoiceType: '专用', invoiceNo: '4400212345', date: '2026年10月22日', buyer: '己公司', seller: '本公司', stampText: '发票专用章',
        lineItems: [{ name: 'B产品', unit: '件', qty: 200, price: 1000, amount: 200000, taxRate: '13%', tax: 26000 }], totalAmount: 226000 },
      { type: 'bank', label: '银行回单', date: '2026-10-22', totalAmount: 226000, payer: '己公司', payeeName: '本公司', content: '购买B产品', refNo: 'HD202610220014' },
    ],
  },
  {
    date: '2026-10-23',
    title: '结转本月主营业务成本',
    tags: ["成本核算"],
    difficulty: 2,
    description: '本月销售A产品200件（非货币性交换），单位成本400元；销售B产品200件，单位成本500元。结转销售成本合计=200×400+200×500=80,000+100,000=180,000元。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '6401', summary: '结转A产品成本（200×400）', debit: 80000, credit: 0,
        explanation: '主营业务成本80,000元。非货币性交换换出的A产品200件，成本400元/件。' },
      { subjectCode: '6401', summary: '结转B产品成本（200×500）', debit: 100000, credit: 0,
        explanation: '主营业务成本100,000元。销售给己公司的B产品200件，成本500元/件。' },
      { subjectCode: '1405', summary: '结转销售成本', debit: 0, credit: 180000,
        explanation: '库存商品减少180,000元。A产品成本80,000+B产品成本100,000。' },
    ],
    documents: [
      { type: 'text', label: '成本计算表', docTitle: '主营业务成本计算表（2026年10月）', stampText: '财务专用章',
        content: `产品  数量    单位成本    金额
────────────────────────
A产品  200件    400.00    80,000.00
B产品  200件    500.00   100,000.00
────────────────────────
合计                      180,000.00` },
    ],
  },

  // ═══════════════════════════════════════════════
  // 第四周 10/26~10/28：月末常规
  // ═══════════════════════════════════════════════

  {
    date: '2026-10-26',
    title: '采购原材料',
    tags: ["采购"],
    difficulty: 2,
    description: '从丁公司购入J材料一批，价款50,000元，增值税6,500元（13%），合计56,500元。材料已验收入库，款项以银行存款支付。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '1403', summary: '采购J材料（不含税）', debit: 50000, credit: 0,
        explanation: '原材料增加50,000元。' },
      { subjectCode: '222101', summary: '进项税额', debit: 6500, credit: 0,
        explanation: '应交增值税进项税额增加6,500元，可抵扣。' },
      { subjectCode: '100201', summary: '支付材料款', debit: 0, credit: 56500,
        explanation: '银行存款减少56,500元。含税价。' },
    ],
    documents: [
      { type: 'invoice', label: '增值税发票', region: '广东', invoiceType: '专用', invoiceNo: '4400267890', date: '2026年10月26日', buyer: '本公司', seller: '丁公司', stampText: '发票专用章',
        lineItems: [{ name: 'J材料', unit: '吨', qty: 5, price: 10000, amount: 50000, taxRate: '13%', tax: 6500 }], totalAmount: 56500 },
      { type: 'bank', label: '银行回单', date: '2026-10-26', totalAmount: 56500, payer: '本公司', payeeName: '丁公司', content: '采购J材料', refNo: 'HD202610260015' },
    ],
  },
  {
    date: '2026-10-27',
    title: '支付网络推广费',
    tags: ["费用"],
    difficulty: 1,
    description: '支付本月网络搜索推广费9,000元，以银行存款支付。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '660101', summary: '支付推广费', debit: 9000, credit: 0,
        explanation: '销售费用-广告费增加9,000元。' },
      { subjectCode: '100201', summary: '支付推广费', debit: 0, credit: 9000,
        explanation: '银行存款减少9,000元。' },
    ],
    documents: [
      { type: 'invoice', label: '服务发票', region: '北京', invoiceType: '专用', invoiceNo: '1100321654', date: '2026年10月27日', buyer: '本公司', seller: '百度在线', stampText: '发票专用章',
        lineItems: [{ name: '搜索推广服务费', unit: '项', qty: 1, price: 9000, amount: 9000, taxRate: '6%', tax: 540 }], totalAmount: 9540 },
      { type: 'bank', label: '银行回单', date: '2026-10-27', totalAmount: 9540, payer: '本公司', payeeName: '百度在线', content: '推广费', refNo: 'HD202610270016' },
    ],
  },
  {
    date: '2026-10-28',
    title: '计提坏账准备',
    tags: ["资产"],
    difficulty: 2,
    description: '本月末应收账款余额约350,000元（乙公司169,500已做保理，暂时未冲销），按5%计提应有余额17,500元。坏账准备已有余额25,900元，多提8,400元，需转回。',
    tip: '坏账准备是会计估计，每月根据应收账款余额调整。当应收账款减少或估计比例变化导致应有余额小于已有余额时，应转回多提的坏账准备（做相反分录）。',
    entries: [
      { subjectCode: '1231', summary: '冲回多提坏账准备', debit: 8400, credit: 0,
        explanation: '坏账准备减少8,400元（贷方蓝字变借方红字）。因为乙公司169,500元已做保理融资，应收账款减少，应有坏账准备余额降低。计算：应收账款350,000×5%=17,500元，已有余额25,900元，多提8,400元需转回。' },
      { subjectCode: '6701', summary: '冲回坏账准备（负数减值损失）', debit: 0, credit: 8400,
        explanation: '资产减值损失减少8,400元（负值）。坏账准备转回相当于以前计提的减值损失"回冲"，在利润表中表现为减少费用。' },
    ],
    documents: [
      { type: 'text', label: '坏账准备计算表', docTitle: '坏账准备转回计算表（2026年10月）', stampText: '财务专用章',
        content: `应收账款期末余额：350,000.00元
计提比例：5%
应有坏账准备余额：17,500.00元
已有坏账准备余额：25,900.00元
本期应转回：25,900 - 17,500 = 8,400.00元

注：因乙公司169,500元保理，风险部分转移，应收账款减少` },
    ],
  },
  {
    date: '2026-10-28',
    title: '摊销长期待摊费用',
    tags: ["资产"],
    difficulty: 2,
    description: '摊销本月办公室装修费2,000元（48,000÷24个月）。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '6602', summary: '摊销办公室装修费', debit: 2000, credit: 0,
        explanation: '管理费用增加2,000元。' },
      { subjectCode: '1801', summary: '摊销装修费', debit: 0, credit: 2000,
        explanation: '长期待摊费用减少2,000元。累计已摊销18,000元（9个月），剩余30,000元。' },
    ],
    documents: [
      { type: 'text', label: '摊销表', docTitle: '长期待摊费用摊销表', stampText: '财务专用章',
        content: `项目：办公室装修费
月摊销：2,000.00元
本月摊销：2,000.00元
已摊销合计：18,000.00元
剩余：30,000.00元` },
    ],
  },

  // ═══════════════════════════════════════════════
  // 第五周 10/29~10/31：月末收官
  // ═══════════════════════════════════════════════

  {
    date: '2026-10-29',
    title: '计提10月城建税及教育费附加',
    tags: ["税费"],
    difficulty: 2,
    description: '本月应纳增值税=销项税额（26,000+13,000）-进项税额（6,500+11,700）=20,800元。计提城建税（7%）1,456元和教育费附加（3%）624元，合计2,080元。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '6403', summary: '城建税（20,800×7%）', debit: 1456, credit: 0,
        explanation: '税金及附加增加1,456元。城建税以应纳增值税为基数。' },
      { subjectCode: '6403', summary: '教育费附加（20,800×3%）', debit: 624, credit: 0,
        explanation: '税金及附加增加624元。两项合计2,080元。' },
      { subjectCode: '222103', summary: '应交城建税', debit: 0, credit: 1456,
        explanation: '应交城建税增加1,456元。' },
      { subjectCode: '222104', summary: '应交教育费附加', debit: 0, credit: 624,
        explanation: '应交教育费附加增加624元。' },
    ],
    documents: [
      { type: 'text', label: '税费计算表', docTitle: '2026年10月税费计算表', stampText: '财务专用章',
        content: `增值税：
销项：26,000（己公司现销）+ 13,000（非货币交换）= 39,000
进项：6,500（采购J材料）+ 11,700（换入设备）= 18,200
应纳增值税：39,000 - 18,200 = 20,800.00

附加税：
城建税：20,800×7% = 1,456.00
教育费附加：20,800×3% = 624.00
合计：2,080.00` },
    ],
  },
  {
    date: '2026-10-29',
    title: '计提10月员工工资',
    tags: ["工资社保"],
    difficulty: 2,
    description: '月末计提10月份职工工资，应发合计73,000元。行政31,000元，销售42,000元。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '660203', summary: '计提10月行政工资', debit: 31000, credit: 0,
        explanation: '管理费用-工资增加31,000元。' },
      { subjectCode: '6601', summary: '计提10月销售工资', debit: 42000, credit: 0,
        explanation: '销售费用增加42,000元。' },
      { subjectCode: '221101', summary: '计提10月工资', debit: 0, credit: 73000,
        explanation: '应付职工薪酬-工资增加73,000元。' },
    ],
    documents: [
      { type: 'text', label: '工资汇总表', docTitle: '2026年10月工资汇总表', stampText: '人力资源部\n工资专用章',
        content: `部门      应发合计
─────────────────
行政部       31,000
销售部       42,000
─────────────────
合计         73,000` },
    ],
  },
  {
    date: '2026-10-30',
    title: '庚公司实现净利润·确认投资收益',
    tags: ["资产","融资"],
    difficulty: 3,
    description: '庚公司2026年10月实现净利润60,000元。本公司持股30%，应确认投资收益18,000元。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '1501', summary: '庚公司10月净利润份额（60,000×30%）', debit: 18000, credit: 0,
        explanation: '长期股权投资增加18,000元。权益法下，被投资方实现净利润，投资方按持股比例增加长投账面价值。' },
      { subjectCode: '6111', summary: '确认投资收益', debit: 0, credit: 18000,
        explanation: '投资收益增加18,000元。权益法核心：被投资方经营成果按比例反映在投资方的利润表中。' },
    ],
    documents: [
      { type: 'text', label: '庚公司报表', docTitle: '庚公司2026年10月利润表（摘要）', stampText: '庚公司\n财务专用章',
        content: `庚公司10月净利润：60,000.00元
本公司持股：30%
应确认投资收益：18,000.00元` },
    ],
  },
  {
    date: '2026-10-31',
    title: '结转固定资产清理净损益',
    tags: ["资产"],
    difficulty: 2,
    description: '结转10月21日出售旧设备的固定资产清理净收益。清理账户余额：贷方5,000元（收到120,000-账面价值115,000）。该差额计入"资产处置损益"。',
    tip: '固定资产清理完毕，应将"固定资产清理"余额转出。因出售产生的损益计入"资产处置损益"（利润表项目，属于营业利润的组成部分）。因报废毁损产生的损益才计入"营业外支出"。',
    entries: [
      { subjectCode: '1606', summary: '结转固定资产清理（贷方余额）', debit: 5000, credit: 0,
        explanation: '固定资产清理转出5,000元（贷方余额）。计算：清理贷方=收到价款120,000-账面价值115,000=5,000元（收益）。清理科目余额结平。注意：出售固定资产的收益不是"营业外收入"，而是"资产处置损益"。这是2017年修订后的会计准则要求。' },
      { subjectCode: '6111', summary: '结转清理净收益', debit: 0, credit: 5000,
        explanation: '资产处置损益增加5,000元（使用6111投资收益科目简化处理，或专用"资产处置损益"科目）。出售固定资产产生的收益属于企业的日常经营活动（资产更新换代），因此计入营业利润。只有报废毁损等非正常原因才计入营业外收支。' },
    ],
    documents: [
      { type: 'text', label: '固定资产清理结转表', docTitle: '固定资产清理结转表', stampText: '财务专用章',
        content: `固定资产：旧数控机床
原值：200,000.00
累计折旧：80,000.00
减值准备：5,000.00
账面价值：115,000.00

清理收入（含税）：120,000.00
清理费用：0.00
清理净收益：5,000.00
结转去向：资产处置损益（投资收益）
余额：结平 ✓` },
    ],
  },
  {
    date: '2026-10-31',
    title: '月末结转·期间损益',
    tags: ["期末"],
    difficulty: 3,
    description: '月末将各损益类科目余额结转至"本年利润"。本月收入331,000元，费用286,245元（含财务费用3,590、税金2,080），坏账准备转回8,400元增加利润，本月净利润约53,155元。',
    tip: '10月期间损益结转。注意：① 坏账准备转回8,400元使资产减值损失出现贷方余额，结转需从借方转出（增加本年利润）；② 固定资产出售净收益计入投资收益（替代资产处置损益科目）；③ 保理手续费计入财务费用。',
    entries: [
      { subjectCode: '6001', summary: '结转入主营业务收入（换出+现销）', debit: 300000, credit: 0,
        explanation: '主营业务收入转出300,000元=非货币交换100,000+现销B产品200,000。' },
      { subjectCode: '6051', summary: '结转其他业务收入', debit: 8000, credit: 0,
        explanation: '其他业务收入转出8,000元（租金）。' },
      { subjectCode: '6111', summary: '结转投资收益（含长投+资产处置）', debit: 23000, credit: 0,
        explanation: '投资收益转出23,000元=庚公司权益法18,000+固定资产清理净收益5,000。' },
      { subjectCode: '6603', summary: '结转财务费用', debit: 0, credit: 3590,
        explanation: '财务费用转出3,590元=银行手续费200+保理手续费3,390。本月财务费用为借方余额（正常费用），从贷方转出。' },
      { subjectCode: '6701', summary: '结转资产减值损失（转回8,400元贷方余额）', debit: 8400, credit: 0,
        explanation: '资产减值损失转出8,400元（冲借方以关闭其贷方余额）。坏账准备转回使资产减值损失出现贷方余额，结转时从借方转出（增加本年利润）。' },
      { subjectCode: '4103', summary: '结转本月净利润', debit: 0, credit: 53155,
        explanation: '本年利润贷方53,155元表示本月净利润。计算：收入331,000+坏账转回8,400-费用286,245=53,155元。Q4开局实现盈利。注意：坏账准备转回使资产减值损失科目出现贷方余额，减少本期费用。' },
      { subjectCode: '660203', summary: '结转管理费用-工资', debit: 0, credit: 31000,
        explanation: '管理费用-工资31,000元。' },
      { subjectCode: '6602', summary: '结转管理费用（水电/折旧/摊销）', debit: 0, credit: 12700,
        explanation: '管理费用12,700元=水电5,200+房屋折旧2,000+办公设备折旧2,000+运输设备折旧1,500+装修摊销2,000。办公费700元在660201中单独结转。' },
      { subjectCode: '660201', summary: '结转管理费用-办公费', debit: 0, credit: 700,
        explanation: '管理费用-办公费700元（10月13日购买办公用品）。' },
      { subjectCode: '6601', summary: '结转销售费用（工资+差旅费）', debit: 0, credit: 44800,
        explanation: '销售费用44,800元=工资42,000+差旅费2,800。' },
      { subjectCode: '660101', summary: '结转销售费用-广告费', debit: 0, credit: 9000,
        explanation: '广告费9,000元。' },
      { subjectCode: '6401', summary: '结转主营业务成本', debit: 0, credit: 180000,
        explanation: '主营业务成本180,000元=A产品80,000+B产品100,000。' },
      { subjectCode: '6402', summary: '结转其他业务成本', debit: 0, credit: 2375,
        explanation: '其他业务成本2,375元（投资性房地产折旧）。' },
      { subjectCode: '6403', summary: '结转税金及附加', debit: 0, credit: 2080,
        explanation: '税金及附加2,080元=城建税1,456+教育费附加624。' },
      { subjectCode: '6701', summary: '结转资产减值损失（转回）', debit: 0, credit: 0,
        explanation: '资产减值损失净额0元——坏账准备转回8,400元抵消了其他减值。' },
    ],
    documents: [
      { type: 'text', label: '结转计算表', docTitle: '2026年10月期间损益结转表', stampText: '已结转', signature: '制表：李会计  审核：赵主管',
        content: `收入转入本年利润：
  主营业务收入              300,000.00
  其他业务收入                8,000.00
  投资收益（长投18,000+资产处置5,000） 23,000.00
  ─────────────────────────────
  收入合计：                331,000.00

  资产减值损失（转回8,400贷方） +8,400.00
  ─────────────────────────────
  净增加本年利润：          339,400.00

费用转入本年利润（减少本年利润）：
  财务费用（手续费+保理费）    3,590.00
  管理费用-工资               31,000.00
  管理费用-其他               12,700.00
  管理费用-办公费                700.00
  销售费用-工资+差旅费        44,800.00
  销售费用-广告费              9,000.00
  主营业务成本               180,000.00
  其他业务成本                 2,375.00
  税金及附加                   2,080.00
  ─────────────────────────────
  费用合计：                286,245.00

本月净利润：339,400 - 286,245 = 53,155.00元

🎉 Q4开局实现净利润53,155元！
📌 本月新增业务：
  1. 非货币性资产交换（公允价值模式）
  2. 应收账款保理（有追索权）
  3. 坏账准备转回
💡 学习要点：资产减值损失出现贷方余额时关闭方向相反` },
    ],
  },
  /* ═══════════════════════════════════════════════
     出纳教学任务（结汇购汇专题）
     新增17个出纳任务
     ═══════════════════════════════════════════════ */
  { date: '2026-10-01', title: '月初现金清点', tags: ["出纳"], difficulty: 1, role: 'cashier',
    description: '清点现金3,200元，账实相符。Q4开始！', tip: 'Q4最后一季度。', entries: [],
    documents: [{ type: 'text', label: '现金日记账', docTitle: '现金日记账（10月）', stampText: '现金日记账', content: `10月期初：3,200` }] },
  { date: '2026-10-02', title: '提取备用金', tags: ["出纳"], difficulty: 1, role: 'cashier',
    description: '提取4,000元备用金。', tip: 'Q4备用金补充。',
    entries: [{ subjectCode: '1001', summary: '备用金', debit: 4000, credit: 0, explanation: '库存现金增加。' }, { subjectCode: '100201', summary: '备用金', debit: 0, credit: 4000, explanation: '银行存款减少。' }],
    documents: [{ type: 'bank', label: '支票存根', date: '2026-10-02', totalAmount: 4000, payer: '本公司', payeeName: '本公司', content: '提取备用金', refNo: 'XJ202610001' }] },
  { date: '2026-10-04', title: '银行回单整理', tags: ["出纳"], difficulty: 1, role: 'cashier',
    description: '整理月初回单，含缴税回单。', tip: '月初整理。', entries: [],
    documents: [{ type: 'text', label: '回单清单', docTitle: '回单清单（10月）', stampText: '财务专用章', content: `共5笔` }] },
  { date: '2026-10-05', title: '银行代扣社保', tags: ["出纳","工资社保"], difficulty: 2, role: 'cashier',
    description: '10月社保（单位21,000+个人7,000=28,000元）已代扣。', tip: '社保扣款核对。',
    entries: [{ subjectCode: '221102', summary: '社保单位', debit: 21000, credit: 0, explanation: '社保减少。' }, { subjectCode: '224101', summary: '社保个人', debit: 7000, credit: 0, explanation: '其他应付款减少。' }, { subjectCode: '100201', summary: '社保费', debit: 0, credit: 28000, explanation: '银行减少。' }],
    documents: [{ type: 'bank', label: '社保回单', date: '2026-10-05', totalAmount: 28000, payer: '本公司', payeeName: 'XX市社保局', content: '10月社保', refNo: 'HD202610050005' }] },
  { date: '2026-10-06', title: '银行转账支付网络费', tags: ["出纳","费用"], difficulty: 1, role: 'cashier',
    description: '支付10月网络费2,600元。', tip: '固定费用。',
    entries: [{ subjectCode: '6602', summary: '网络费', debit: 2600, credit: 0, explanation: '管理费增加。' }, { subjectCode: '100201', summary: '网络费', debit: 0, credit: 2600, explanation: '银行减少。' }],
    documents: [{ type: 'bank', label: '回单', date: '2026-10-06', totalAmount: 2600, payer: '本公司', payeeName: '中国电信', content: '10月网络费', refNo: 'HD202610060008' }] },
  { date: '2026-10-09', title: '美元结汇为人民币 ⭐', tags: ["出纳","融资"], difficulty: 2, role: 'cashier',
    description: '将美元户中的US$5,000结汇为人民币。当日汇率6.85，获RMB 34,250元转入人民币账户。结汇单编号：JH202610001。',
    tip: '结汇流程：①填制"结汇申请书"；②提供合同/发票证明结汇用途；③银行按当日牌价结汇；④人民币入账。出纳需留存结汇水单和外汇申报单。',
    entries: [
      { subjectCode: '100201', summary: '美元结汇入账', debit: 34250, credit: 0, explanation: '银行存款-工行增加34,250元（US$5,000×6.85）。美元结汇后人民币入账。' },
      { subjectCode: '6603', summary: '汇兑损失', debit: 1350, credit: 0, explanation: '财务费用-汇兑损失增加1,350元。原记账汇率7.12，结汇汇率6.85，差额(7.12-6.85)×5,000=1,350元。' },
      { subjectCode: '100203', summary: '美元户减少', debit: 0, credit: 35600, explanation: '银行存款-美元户减少35,600元（US$5,000×7.12原记账汇率）。美元户余额减至US$5,000。' },
    ],
    documents: [{ type: 'bank', label: '结汇水单', date: '2026-10-09', totalAmount: 34250, payer: '本公司', payeeName: '本公司（人民币户）', content: '美元结汇US$5,000×6.85', refNo: 'JH202610001' }] },
  { date: '2026-10-10', title: '汇兑损益计算确认', tags: ["出纳","融资"], difficulty: 2, role: 'cashier',
    description: '月末计算美元账户汇兑损益。美元户余额US$5,000，月末汇率6.90，账面汇率7.12。汇兑收益=(7.12-6.90)×5,000=1,100元。',
    tip: '每月末需计算外币账户的汇兑损益。汇率变动产生的差额计入"财务费用-汇兑损益"。人民币贬值时外币资产升值（汇兑收益），人民币升值时相反。',
    entries: [], documents: [
      { type: 'text', label: '汇兑计算表', docTitle: '汇兑损益计算表（10月）', stampText: '财务管理章',
        content: `美元户余额：US$5,000\n月末汇率：6.90\n账面汇率：7.12\n汇兑收益=(7.12-6.90)×5,000=1,100元\n汇兑收益冲减财务费用。` }] },
  { date: '2026-10-12', title: '银行代扣公积金', tags: ["出纳","工资社保"], difficulty: 2, role: 'cashier',
    description: '10月公积金（单位10,200+个人3,400=13,600元）已代扣。',
    tip: '公积金按月缴纳，核对金额。',
    entries: [{ subjectCode: '221103', summary: '公积单位', debit: 10200, credit: 0, explanation: '公积金减少。' }, { subjectCode: '224102', summary: '公积个人', debit: 3400, credit: 0, explanation: '其他应付款减少。' }, { subjectCode: '100201', summary: '公积金', debit: 0, credit: 13600, explanation: '银行减少。' }],
    documents: [{ type: 'bank', label: '公积回单', date: '2026-10-12', totalAmount: 13600, payer: '本公司', payeeName: 'XX公积金中心', content: '10月公积金', refNo: 'HD202610120012' }] },
  { date: '2026-10-14', title: '银行转账支付快递费', tags: ["出纳","费用"], difficulty: 1, role: 'cashier',
    description: '支付10月快递费650元。', tip: '保留发票。',
    entries: [{ subjectCode: '6602', summary: '快递费', debit: 650, credit: 0, explanation: '管理费增加。' }, { subjectCode: '100201', summary: '快递费', debit: 0, credit: 650, explanation: '银行减少。' }],
    documents: [{ type: 'bank', label: '回单', date: '2026-10-14', totalAmount: 650, payer: '本公司', payeeName: '顺丰速运', content: '10月快递', refNo: 'HD202610140015' }] },
  { date: '2026-10-18', title: '购买支票本', tags: ["出纳"], difficulty: 1, role: 'cashier',
    description: '购买支票本45元。', tip: '登记。',
    entries: [{ subjectCode: '6603', summary: '支票本', debit: 45, credit: 0, explanation: '费用增加。' }, { subjectCode: '100201', summary: '支票本', debit: 0, credit: 45, explanation: '银行减少。' }],
    documents: [{ type: 'bank', label: '收费回单', date: '2026-10-18', totalAmount: 45, payer: '本公司', payeeName: '工商银行', content: '支票本', refNo: 'HD202610180018' }] },
  { date: '2026-10-22', title: '出纳资金日报', tags: ["出纳"], difficulty: 1, role: 'cashier',
    description: '编制10月22日资金日报。', tip: '坚持。', entries: [],
    documents: [{ type: 'text', label: '日报', docTitle: '资金日报（10月22日）', stampText: '现金日记账', content: `现金：4,800  银行存款：534,330.09` }] },
  { date: '2026-10-23', title: '银行账户管理费', tags: ["出纳","费用"], difficulty: 1, role: 'cashier',
    description: '10月管理费100元已扣。累计1,000元。',
    tip: '日常操作。',
    entries: [{ subjectCode: '6603', summary: '管理费', debit: 100, credit: 0, explanation: '费用增加。' }, { subjectCode: '100201', summary: '管理费', debit: 0, credit: 100, explanation: '银行减少。' }],
    documents: [{ type: 'bank', label: '回单', date: '2026-10-23', totalAmount: 100, payer: '本公司', payeeName: '工商银行', content: '10月管理费', refNo: 'HD202610230022' }] },
  { date: '2026-10-25', title: '银行手续费确认', tags: ["出纳","费用"], difficulty: 1, role: 'cashier',
    description: '10月手续费200元。',
    tip: '日常操作。',
    entries: [{ subjectCode: '6603', summary: '手续费', debit: 200, credit: 0, explanation: '费用增加。' }, { subjectCode: '100201', summary: '手续费', debit: 0, credit: 200, explanation: '银行减少。' }],
    documents: [{ type: 'bank', label: '手续费回单', date: '2026-10-25', totalAmount: 200, payer: '本公司', payeeName: '工商银行', content: '10月手续费', refNo: 'HD202610250025' }] },
  { date: '2026-10-26', title: '银行转账支付清洁费', tags: ["出纳","费用"], difficulty: 1, role: 'cashier',
    description: '支付10月清洁费1,800元。',
    tip: '日常操作。',
    entries: [{ subjectCode: '6602', summary: '清洁费', debit: 1800, credit: 0, explanation: '管理费增加。' }, { subjectCode: '100201', summary: '清洁费', debit: 0, credit: 1800, explanation: '银行减少。' }],
    documents: [{ type: 'bank', label: '回单', date: '2026-10-26', totalAmount: 1800, payer: '本公司', payeeName: 'XX物业', content: '10月清洁费', refNo: 'HD202610260028' }] },
  { date: '2026-10-28', title: '银行转账支付印刷费', tags: ["出纳","费用"], difficulty: 1, role: 'cashier',
    description: '支付10月印刷费1,200元。',
    tip: '日常操作。',
    entries: [{ subjectCode: '6602', summary: '印刷费', debit: 1200, credit: 0, explanation: '管理费增加。' }, { subjectCode: '100201', summary: '印刷费', debit: 0, credit: 1200, explanation: '银行减少。' }],
    documents: [{ type: 'bank', label: '回单', date: '2026-10-28', totalAmount: 1200, payer: '本公司', payeeName: 'XX彩印厂', content: '10月印刷费', refNo: 'HD202610280030' }] },
  { date: '2026-10-29', title: '外币账户月末盘点', tags: ["出纳"], difficulty: 1, role: 'cashier',
    description: '月末盘点外币账户。美元户余额US$5,000，期末汇率6.90，折合RMB 34,500。核对银行对账单一致。',
    tip: '外币账户月末必须核对余额并计算汇兑损益。', entries: [],
    documents: [{ type: 'text', label: '外币盘点', docTitle: '外币账户盘点表（10月）', stampText: '财务专用章',
      content: `美元户：US$5,000 汇率6.90 RMB 34,500\n差异：0 ✓` }] },
  { date: '2026-10-20', title: '支付宝收款与手续费核算 ⭐', tags: ["出纳","销售"], difficulty: 2, role: 'cashier',
    description: '客户通过支付宝付款8,000元购买B产品（含税），支付宝扣除0.6%手续费48元后实际到账7,952元。出纳在支付宝商家中心查询到账记录并核对手续费是否准确。',
    tip: '**支付宝与微信的异同：**\n科目相同（其他货币资金），但手续费处理方式不同。支付宝收款手续费在每笔交易时实时扣除，微信则提现时另收提现手续费。\n\n**支付宝费率：**标准0.6%（部分行业有优惠），每笔实时扣除。手续费发票可在支付宝商家中心申请电子发票。\n\n**出纳每日必做：**\n① 登录支付宝商家中心→下载"资金流水"明细\n② 核对每笔收款与业务单据是否一致\n③ 注意区分：实收=应收×(1-0.6%)，差额是手续费\n④ 定期提现到银行账户（支付宝提现免手续费）',
    entries: [
      { subjectCode: '101205', summary: '支付宝收款净额', debit: 7952, credit: 0, explanation: '其他货币资金——支付宝增加7,952元。客户支付8,000元，支付宝即时扣除手续费48元，净到账7,952元。注意：支付宝收款手续费和微信不同——支付宝是"实时扣款"，收款同时手续费就没了。' },
      { subjectCode: '6603', summary: '支付宝手续费0.6%', debit: 48, credit: 0, explanation: '财务费用增加48元。支付宝按0.6%收取手续费：8,000×0.6%=48元。这笔费用减少了企业实际收到的金额。' },
      { subjectCode: '6001', summary: '支付宝收款-不含税', debit: 0, credit: 7079.65, explanation: '主营业务收入7,079.65元（不含税）。8,000÷1.13≈7,079.65。收入确认以含税总价8,000元为基础计算，不能以扣除手续费后的7,952元为基础。手续费是额外费用，不影响收入确认金额。' },
      { subjectCode: '222101', summary: '支付宝销项税额', debit: 0, credit: 920.35, explanation: '销项税额920.35元（7,079.65×13%）。电子支付同样需要开具发票，不能因为没有现金交易就不开发票——这是税务违规行为。手续费48元可以索取增值税专用发票抵扣进项。' },
    ],
    documents: [
      { type: 'text', label: '支付宝到账记录', docTitle: '支付宝商家中心收款记录', stampText: '支付宝\n电子凭证',
        content: `交易时间：2026-10-20 14:15:30
交易订单号：AL202610201415300001
付款方式：余额宝
商品说明：B产品 5件
交易金额：8,000.00元
手续费(0.6%)：-48.00元
实际到账：7,952.00元
收款账户：本公司支付宝账户
交易状态：交易成功 ✅` },
      { type: 'receipt', label: '收款电子凭证', docTitle: '支付宝收款电子凭证', totalAmount: 7952, stampText: '支付宝\n电子凭证专用章',
        items: [{ name: 'B产品×5件', qty: 5, price: 1600, amount: 8000 }, { name: '扣手续费(0.6%)', qty: 1, price: -48, amount: -48 }] },
    ] },
  /* ═══════════════════════════════════════════════
     会计教学审计批次5新增：融资/费用场景补充
     ═══════════════════════════════════════════════ */
  {
    date: '2026-10-28',
    title: '资金调度——内部银行调拨',
    tags: ["融资"],
    difficulty: 1,
    description: '因建设银行账户需要支付一笔进口设备尾款，从工商银行调拨资金50,000元至建设银行。出纳通过企业网银办理同行转账。',
    tip: '同一企业不同银行账户间的资金调拨，属于资产内部变动，不涉及损益。分录：借：银行存款-建行（调入方），贷：银行存款-工行（调出方）。出纳需在两个账户的日记账中都登记此笔业务。',
    entries: [
      { subjectCode: '100202', summary: '工行转建行-建行增加', debit: 50000, credit: 0, explanation: '银行存款-建设银行增加记借方。资金从工行调入建行，建行账户余额增加。' },
      { subjectCode: '100201', summary: '工行转建行-工行减少', debit: 0, credit: 50000, explanation: '银行存款-工商银行减少记贷方。资金从工行划出，工行账户余额减少。出纳需在两个银行的日记账中都登记。' },
    ],
    documents: [
      { type: 'bank', label: '网银转账回单', date: '2026-10-28', totalAmount: 50000, payer: '本公司（工行）', payerAccount: '6222 0200 **** 1234', payeeName: '本公司（建行）', payeeAccount: '6222 0200 **** 5678', content: '资金调拨-采购设备尾款', refNo: 'HD202610280030' },
    ],
  },
  {
    date: '2026-10-29',
    title: '跨期费用分摊——财产保险费',
    tags: ["费用"],
    difficulty: 2,
    description: '7月1日支付全年财产保险费12,000元。按受益期（7月-12月）6个月分摊，本月应摊销2,000元。',
    tip: '跨期费用按受益期分摊。支付时先计入"长期待摊费用"，按月摊销计入管理费用。分录：借：管理费用-保险费，贷：长期待摊费用。注意：金额较小的保险费可一次性费用化，大额需分摊。',
    entries: [
      { subjectCode: '6602', summary: '摊销10月财产保险费', debit: 2000, credit: 0, explanation: '管理费用增加记借方。财产保险费按受益期6个月分摊，每月2,000元。根据《企业会计准则——基本准则》权责发生制原则，费用应在受益期间确认而非付款时确认。' },
      { subjectCode: '1801', summary: '摊销10月财产保险费', debit: 0, credit: 2000, explanation: '长期待摊费用减少记贷方。每月摊销冲减长期待摊费用余额，反映已消耗的预付费用。' },
    ],
    documents: [
      { type: 'receipt', label: '保险缴费单', docTitle: '财产保险缴费凭证', date: '2026-07-01', totalAmount: 12000, payer: '本公司', stampText: '中国人民财产保险\n保费收讫章',
        items: [{ name: '企业财产综合保险（2026.7-2026.12）', qty: 1, price: 12000, amount: 12000 }] },
      { type: 'text', label: '摊销计算表', docTitle: '长期待摊费用摊销表', stampText: '财务专用章',
        content: `项目：财产保险费
总金额：12,000.00元
受益期：2026年7月-12月（6个月）
每月摊销：12,000÷6=2,000.00元

摊销记录：
7月 ✓  8月 ✓  9月 ✓  10月（本期）→ 2,000
11月：2,000  12月：2,000

待摊余额：4,000.00元（11-12月）` },
    ],
  },

  {
    date: '2026-10-31',
    title: '月末·银行存款余额核对',
    tags: ["出纳","期末"],
    difficulty: 1,
    role: 'cashier',
    description: '月末核对工商银行存款日记账余额与银行对账单是否一致。本月有保理回款、设备出售款等特殊业务，需逐笔对账。',
    tip: '每月末必做的银行对账。10月有非货币交换（不涉及银行流水）、保理融资收款、设备出售收款等特殊业务，出纳需逐笔勾对入账是否正确。',
    entries: [],
    documents: [
      { type: 'text', label: '银行对账单', docTitle: '银行对账单（2026年10月）', stampText: '中国工商银行\n电子业务\n专用章',
        content: `中国工商银行 对账单

账户：6222 0200 **** 1234
户名：本公司

日期      摘要                 收入         支出        余额
──────────────────────────────────────────────
10-01     期初余额                                    151,525.09
10-08     缴纳9月增值税                     14,300    137,225.09
10-08     缴纳城建税                        1,001    136,224.09
10-08     缴纳教育费附加                      429    135,795.09
10-09     缴纳社保                         21,000    114,795.09
10-09     缴纳公积金                       10,200    104,595.09
10-09     发放9月工资                      63,200     41,395.09
10-10     缴纳个税+代扣款                   9,800     31,595.09
10-13     支付水电费                        5,200     26,395.09
10-13     购买办公用品                        700     25,695.09
10-14     报销差旅费                        2,800     22,895.09
10-14     银行手续费                          200     22,695.09
10-19     保理收款       157,635                    180,330.09
10-20     收M科技租金      8,000                    188,330.09
10-21     出售设备收款   120,000                    308,330.09
10-22     销售B产品收款  226,000                    534,330.09
10-26     采购J材料                        56,500    477,830.09
10-27     支付推广费                        9,000    468,830.09
──────────────────────────────────────────────
期末余额：¥468,830.09` },
      { type: 'text', label: '余额调节表', docTitle: '银行存款余额调节表（2026年10月）',
        content: `账户：工商银行 6222 0200 **** 1234
编制日期：2026年10月31日

银行对账单余额：468,830.09
加：企业已收、银行未收        _______
减：企业已付、银行未付        _______
调节后余额：_______

提示：本月非货币性资产交换不涉及银行流水
庚公司投资收益18,000元为权益法核算，无实际资金流入` },
    ],
  },
]

export default oct
