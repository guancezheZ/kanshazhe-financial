/**
 * 11月份业务教程数据（45个任务：28会计 + 17出纳）
 *
 * 难度：★★★☆☆（年终准备月，引入3类新业务）
 * 新增业务类型：研发支出、存货跌价准备、递延所得税资产
 *
 * 出纳专题：信用证——信用证保证金/国际结算/单据审核
 * 业务叙事：11月为年终决算做准备。公司加大研发投入（新产品开发），
 *           并首次计提存货跌价准备（B产品市场价格下跌），
 *           确认可抵扣暂时性差异对应的递延所得税资产。
 * 教学重点：研发支出费用化与资本化的区分、存货跌价准备的计提与转回、
 *           资产减值产生的可抵扣暂时性差异确认递延所得税资产
 *
 * 会计准则依据：
 *   《企业会计准则第6号——无形资产》（研发支出）
 *   《企业会计准则第1号——存货》（存货跌价准备）
 *   《企业会计准则第18号——所得税》（递延所得税）
 */

const nov = [
  // ═══════════════════════════════════════════════
  // 第一周 11/2~11/5：月初常规
  // ═══════════════════════════════════════════════

  {
    date: '2026-11-02',
    title: '缴纳10月增值税',
    tags: ["税费"],
    difficulty: 1,
    description: '缴纳10月份应交增值税20,800元，以银行存款支付。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '222101', summary: '缴纳10月增值税', debit: 20800, credit: 0, explanation: '10月底计提了应交增值税20,800元，本月缴纳，负债减少。' },
      { subjectCode: '100201', summary: '缴纳税款', debit: 0, credit: 20800, explanation: '银行存款减少20,800元。' , cashFlowItem: 'cf-op4', cashFlowExplanation: '缴纳税费支出（配对科目222101），属于"支付的各项税费"——经营活动现金流出。'},
    ],
    documents: [
      { type: 'receipt', label: '税收缴款书', docTitle: '税收缴款书', date: '2026-11-02', totalAmount: 20800, payer: '本公司', stampText: '国家税务总局\n征收章', items: [{ name: '增值税（10月）', qty: 1, price: 20800, amount: 20800 }] },
    ],
  },
  {
    date: '2026-11-02',
    title: '缴纳10月城建税',
    tags: ["税费"],
    difficulty: 1,
    description: '缴纳10月份城建税1,456元（应纳增值税20,800×7%）。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '222103', summary: '缴纳10月城建税', debit: 1456, credit: 0, explanation: '10月底计提1,456元，本月缴纳。' },
      { subjectCode: '100201', summary: '缴纳税款', debit: 0, credit: 1456, explanation: '银行存款减少1,456元。' , cashFlowItem: 'cf-op4', cashFlowExplanation: '缴纳税费支出（配对科目222103），属于"支付的各项税费"——经营活动现金流出。'},
    ],
    documents: [
      { type: 'receipt', label: '税收缴款书', docTitle: '城建税缴款书', date: '2026-11-02', totalAmount: 1456, payer: '本公司', stampText: '国家税务总局\n征收章', items: [{ name: '城建税（10月）', qty: 1, price: 1456, amount: 1456 }] },
    ],
  },
  {
    date: '2026-11-02',
    title: '缴纳10月教育费附加',
    tags: ["税费"],
    difficulty: 1,
    description: '缴纳10月份教育费附加624元（应纳增值税20,800×3%）。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '222104', summary: '缴纳10月教育费附加', debit: 624, credit: 0, explanation: '10月底计提624元，本月缴纳。' },
      { subjectCode: '100201', summary: '缴纳税款', debit: 0, credit: 624, explanation: '银行存款减少624元。' , cashFlowItem: 'cf-op4', cashFlowExplanation: '缴纳税费支出（配对科目222104），属于"支付的各项税费"——经营活动现金流出。'},
    ],
    documents: [
      { type: 'receipt', label: '缴款凭证', docTitle: '教育费附加缴款凭证', date: '2026-11-02', totalAmount: 624, payer: '本公司', stampText: '国家税务总局\n征收章', items: [{ name: '教育费附加（10月）', qty: 1, price: 624, amount: 624 }] },
    ],
  },
  {
    date: '2026-11-03',
    title: '缴纳10月社保及公积金',
    tags: ["工资社保"],
    difficulty: 1,
    description: '缴纳10月份社保费21,000元和公积金10,200元（单位部分），合计31,200元。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '221102', summary: '缴纳10月社保', debit: 21000, credit: 0, explanation: '冲减社保负债。' },
      { subjectCode: '221103', summary: '缴纳10月公积金', debit: 10200, credit: 0, explanation: '冲减公积金负债。' },
      { subjectCode: '100201', summary: '缴纳社保公积金', debit: 0, credit: 31200, explanation: '银行存款减少31,200元。' , cashFlowItem: 'cf-op3', cashFlowExplanation: '支付职工薪酬相关支出（配对科目221102），属于"支付给职工以及为职工支付的现金"——经营活动现金流出。'},
    ],
    documents: [
      { type: 'receipt', label: '社保缴费单', docTitle: '社保缴费单', date: '2026-11-03', totalAmount: 21000, payer: '本公司', stampText: 'XX市社保局\n社保征缴章', items: [{ name: '养老+医疗+失业+工伤+生育', qty: 1, price: 21000, amount: 21000 }] },
    ],
  },
  {
    date: '2026-11-03',
    title: '发放10月职工工资',
    tags: ["工资社保"],
    difficulty: 2,
    description: '发放10月份职工工资73,000元。代扣社保4,200元、公积金3,600元、个税2,000元，实发63,200元。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '221101', summary: '发放10月工资（应发）', debit: 73000, credit: 0, explanation: '冲减应付工资全额。' },
      { subjectCode: '100201', summary: '实发工资', debit: 0, credit: 63200, explanation: '银行存款减少63,200元。' , cashFlowItem: 'cf-op3', cashFlowExplanation: '支付职工薪酬相关支出（配对科目221101），属于"支付给职工以及为职工支付的现金"——经营活动现金流出。'},
      { subjectCode: '2241', summary: '代扣社保', debit: 0, credit: 4200, explanation: '其他应付款-社保增加4,200元。' },
      { subjectCode: '2241', summary: '代扣公积金', debit: 0, credit: 3600, explanation: '其他应付款-公积金增加3,600元。' },
      { subjectCode: '2221', summary: '代扣个税', debit: 0, credit: 2000, explanation: '应交税费-个税增加2,000元。' },
    ],
    documents: [
      { type: 'text', label: '工资汇总表', docTitle: '10月工资发放汇总表', stampText: 'HR\n工资专用章', content: `部门  应发   代扣社保  代扣公积金  代扣个税  实发\n行政部 31,000 1,800 1,600 900 26,700\n销售部 42,000 2,400 2,000 1,100 36,500\n合计 73,000 4,200 3,600 2,000 63,200` },
    ],
  },
  {
    date: '2026-11-04',
    title: '缴纳代扣个税及社保',
    tags: ["税费","工资社保"],
    difficulty: 1,
    description: '缴纳10月代扣的个人所得税2,000元和代扣社保公积金个人部分7,800元。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '2221', summary: '缴纳个税', debit: 2000, credit: 0, explanation: '冲减应交个税。' },
      { subjectCode: '2241', summary: '缴纳代扣社保公积金', debit: 7800, credit: 0, explanation: '冲减其他应付款。' },
      { subjectCode: '100201', summary: '缴纳税费', debit: 0, credit: 9800, explanation: '银行存款减少9,800元。' , cashFlowItem: 'cf-op4', cashFlowExplanation: '缴纳税费支出（配对科目2221），属于"支付的各项税费"——经营活动现金流出。'},
    ],
    documents: [
      { type: 'bank', label: '银行回单', date: '2026-11-04', totalAmount: 9800, payer: '本公司', payeeName: 'XX市税务局', content: '缴纳代扣税费', refNo: 'HD202611040007' },
    ],
  },

  // ═══════════════════════════════════════════════
  // 第二周 11/6~11/12：研发支出+常规
  // ═══════════════════════════════════════════════

  {
    date: '2026-11-06',
    title: '支付10月水电费',
    tags: ["费用"],
    difficulty: 1,
    description: '支付10月份水电费合计5,200元（电费4,000+水费1,200）。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '6602', summary: '支付水电费', debit: 5200, credit: 0, explanation: '管理费用增加5,200元。' },
      { subjectCode: '100201', summary: '支付水电费', debit: 0, credit: 5200, explanation: '银行存款减少5,200元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6602），属于"支付其他与经营活动有关的现金"。'},
    ],
    documents: [
      { type: 'receipt', label: '电费单', docTitle: '电费缴费凭证', date: '2026-11-06', totalAmount: 4000, payer: '本公司', stampText: '国家电网\n电费收讫章', items: [{ name: '电费', qty: 4000, price: 1, amount: 4000 }] },
    ],
  },
  {
    date: '2026-11-06',
    title: '购买办公用品',
    tags: ["费用"],
    difficulty: 1,
    description: '购买办公用品一批，合计600元。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '660201', summary: '购买办公用品', debit: 600, credit: 0, explanation: '管理费用-办公费增加600元。' },
      { subjectCode: '100201', summary: '支付办公用品', debit: 0, credit: 600, explanation: '银行存款减少600元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目660201），属于"支付其他与经营活动有关的现金"。'},
    ],
    documents: [
      { type: 'receipt', label: '收据', docTitle: '收据', date: '2026-11-06', totalAmount: 600, payer: '本公司', stampText: '发票专用章', items: [{ name: '文具用品', qty: 1, price: 600, amount: 600 }] },
    ],
  },
  {
    date: '2026-11-07',
    title: '计提固定资产折旧',
    tags: ["资产"],
    difficulty: 2,
    description: '本月计提折旧：自用房屋2,000元、办公设备2,000元、机器设备5,000元、运输设备1,500元，合计10,500元。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '6602', summary: '房屋折旧', debit: 2000, credit: 0, explanation: '管理费用增加2,000元。' },
      { subjectCode: '6602', summary: '办公设备折旧', debit: 2000, credit: 0, explanation: '管理费用增加2,000元。' },
      { subjectCode: '6602', summary: '运输设备折旧', debit: 1500, credit: 0, explanation: '管理费用增加1,500元。' },
      { subjectCode: '5101', summary: '机器设备折旧', debit: 5000, credit: 0, explanation: '制造费用增加5,000元。' },
      { subjectCode: '1602', summary: '计提折旧', debit: 0, credit: 10500, explanation: '累计折旧增加10,500元。' },
    ],
    documents: [
      { type: 'text', label: '折旧表', docTitle: '折旧计算表（11月）', stampText: '固定资产\n专用章', content: `房屋2,000+办公设备2,000+运输1,500+机器5,000=10,500` },
    ],
  },
  {
    date: '2026-11-07',
    title: '员工报销差旅费',
    tags: ["费用"],
    difficulty: 1,
    description: '报销行政部员工差旅费2,000元（市内出差）。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '660202', summary: '报销差旅费', debit: 2000, credit: 0, explanation: '管理费用-差旅费增加2,000元。行政人员市内出差费用。' },
      { subjectCode: '100201', summary: '报销差旅费', debit: 0, credit: 2000, explanation: '银行存款减少2,000元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目660202），属于"支付其他与经营活动有关的现金"。'},
    ],
    documents: [
      { type: 'receipt', label: '报销单', docTitle: '差旅费报销单', date: '2026-11-07', totalAmount: 2000, payer: '本公司', stampText: '财务\n审核专用章', items: [{ name: '市内交通+餐补', qty: 1, price: 2000, amount: 2000 }] },
    ],
  },
  {
    date: '2026-11-10',
    title: '研发支出·费用化支出 ⭐',
    tags: ["资产","费用"],
    difficulty: 3,
    description: '公司启动新产品研发项目——A产品升级版（NPD-01）。本月发生研究阶段支出：材料费8,000元、人工费12,000元、设备折旧3,000元，合计23,000元，以银行存款支付。研究阶段支出全部费用化。',
    tip: '研发支出分两阶段：①研究阶段（探索性）→ 全部费用化，计入"管理费用-研发费用"；②开发阶段（具有形成成果条件）→ 符合资本化条件的确认为无形资产。月末将费用化支出结转至管理费用。分录：研究阶段借"研发支出-费用化支出"，月末结转至"管理费用-研发费用"。',
    entries: [
      { subjectCode: '530101', summary: 'NPD-01研究支出-材料费', debit: 8000, credit: 0,
        explanation: '研发支出-费用化支出增加8,000元。研究阶段领用的材料费。研究阶段是探索性的，能否形成无形资产不确定，因此全部费用化。' },
      { subjectCode: '530101', summary: 'NPD-01研究支出-人工费', debit: 12000, credit: 0,
        explanation: '研发支出-费用化支出增加12,000元。研发人员工资。' },
      { subjectCode: '530101', summary: 'NPD-01研究支出-设备折旧', debit: 3000, credit: 0,
        explanation: '研发支出-费用化支出增加3,000元。研发专用设备折旧。' },
      { subjectCode: '100201', summary: '支付研发费用', debit: 0, credit: 23000,
        explanation: '银行存款减少23,000元。材料采购和人工费用等支出。' , cashFlowItem: 'cf-inv', cashFlowExplanation: '购建固定资产/无形资产支出（配对科目530101），属于投资活动现金流出——资本性支出，区别于日常经营支出。'},
    ],
    documents: [
      { type: 'text', label: '研发项目立项书', docTitle: '新产品研发项目NPD-01立项申请（摘要）', stampText: '本公司\n技术研发部章',
        content: `项目名称：A产品升级版（NPD-01）
项目阶段：研究阶段
研发期限：2026年11月-2027年1月
本月支出（研究阶段全部费用化）：
  材料费：8,000.00元
  人工费：12,000.00元
  设备折旧：3,000.00元
  合计：23,000.00元` },
    ],
  },
  {
    date: '2026-11-11',
    title: '研发支出·资本化支出 ⭐',
    tags: ["资产"],
    difficulty: 3,
    description: 'NPD-01项目本月进入开发阶段（符合资本化条件），发生支出：材料费15,000元、人工费20,000元、外部服务费8,000元，合计43,000元。该研发成果很可能形成无形资产，支出予以资本化。',
    tip: '开发阶段支出同时满足五个条件才资本化：①技术上可行②有完成意图③能产生经济利益④有资源支持⑤可靠计量。资本化支出先计入"研发支出-资本化支出"，待研发成功达到预定用途后转入"无形资产"。',
    entries: [
      { subjectCode: '530102', summary: 'NPD-01开发支出-材料费', debit: 15000, credit: 0,
        explanation: '研发支出-资本化支出增加15,000元。开发阶段材料费。开发阶段的技术可行性已确认，支出可资本化。' },
      { subjectCode: '530102', summary: 'NPD-01开发支出-人工费', debit: 20000, credit: 0,
        explanation: '研发支出-资本化支出增加20,000元。开发人员工资。' },
      { subjectCode: '530102', summary: 'NPD-01开发支出-外部服务', debit: 8000, credit: 0,
        explanation: '研发支出-资本化支出增加8,000元。外部技术服务费。' },
      { subjectCode: '100201', summary: '支付研发费用', debit: 0, credit: 43000,
        explanation: '银行存款减少43,000元。资本化支出不影响当期利润。' , cashFlowItem: 'cf-inv', cashFlowExplanation: '购建固定资产/无形资产支出（配对科目530102），属于投资活动现金流出——资本性支出，区别于日常经营支出。'},
    ],
    documents: [
      { type: 'text', label: '研发阶段评审', docTitle: 'NPD-01项目阶段评审报告', stampText: '技术研发部\n项目评审专用章',
        content: `评审结论：研究阶段已通过技术可行性论证，转入开发阶段
开发阶段支出将予以资本化处理

本月资本化支出合计：43,000.00元
  材料费：15,000.00元
  人工费：20,000.00元
  外部服务费：8,000.00元` },
    ],
  },
  {
    date: '2026-11-12',
    title: '银行手续费',
    tags: ["费用"],
    difficulty: 1,
    description: '本月银行手续费180元。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '6603', summary: '银行手续费', debit: 180, credit: 0, explanation: '财务费用增加180元。' },
      { subjectCode: '100201', summary: '手续费', debit: 0, credit: 180, explanation: '银行存款减少180元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6603），属于"支付其他与经营活动有关的现金"。'},
    ],
    documents: [
      { type: 'bank', label: '银行回单', date: '2026-11-12', totalAmount: 180, payer: '本公司', payeeName: '中国工商银行', content: '账户管理费', refNo: 'HD202611120008' },
    ],
  },

  // ═══════════════════════════════════════════════
  // 第三周 11/13~11/18：存货跌价+递延所得税
  // ═══════════════════════════════════════════════

  {
    date: '2026-11-13',
    title: '收取投资性房地产租金',
    tags: ["资产","费用"],
    difficulty: 2,
    description: '收到M科技公司本月办公楼租金8,000元。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '100201', summary: '租金收入', debit: 8000, credit: 0, explanation: '银行存款增加8,000元。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6051），属于经营活动现金流入——主营业务产生的现金收入。'},
      { subjectCode: '6051', summary: '租金收入', debit: 0, credit: 8000, explanation: '其他业务收入增加8,000元。' },
    ],
    documents: [
      { type: 'bank', label: '银行回单', date: '2026-11-13', totalAmount: 8000, payer: 'M科技有限公司', payeeName: '本公司', content: '11月办公楼租金', refNo: 'HD202611130009' },
    ],
  },
  {
    date: '2026-11-14',
    title: '投资性房地产计提折旧',
    tags: ["资产"],
    difficulty: 2,
    description: '出租办公楼本月折旧2,375元。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '6402', summary: '投资性房地产折旧', debit: 2375, credit: 0, explanation: '其他业务成本增加2,375元。租金8,000-折旧2,375=其他业务利润5,625元。' },
      { subjectCode: '1521', summary: '累计折旧（投资性房地产）', debit: 0, credit: 2375, explanation: '投资性房地产累计折旧增加。' },
    ],
    documents: [
      { type: 'text', label: '折旧表', docTitle: '投资性房地产折旧计算表（11月）', stampText: '固定资产\n专用章', content: `月折旧：2,375.00元\n本月计提：2,375.00元` },
    ],
  },
  {
    date: '2026-11-17',
    title: '计提存货跌价准备 ⭐',
    tags: ["资产","成本核算"],
    difficulty: 3,
    description: '期末B产品市场价格持续下跌，库存B产品300件的可变现净值低于成本。B产品单位成本500元，当前市场售价450元/件，预计销售税费25元/件，可变现净值=450-25=425元/件。应计提跌价准备=300×(500-425)=22,500元。',
    tip: '存货跌价准备的计提原则：成本与可变现净值孰低。可变现净值=估计售价-至完工成本-销售税费。当可变现净值低于成本时，差额计提存货跌价准备，计入"资产减值损失"。注意：存货跌价准备可以转回（与固定资产减值不同）。',
    entries: [
      { subjectCode: '6701', summary: 'B产品跌价准备（300件×(500-425)）', debit: 22500, credit: 0,
        explanation: '资产减值损失增加22,500元。B产品300件，单位成本500元，可变现净值425元/件，每件跌价75元。存货跌价准备是存货的备抵科目，在资产负债表上冲减存货账面价值。注意：与固定资产减值不同，存货跌价准备可以转回——如果后续市价回升，可以在原计提范围内冲回。' },
      { subjectCode: '1461', summary: '计提B产品跌价准备', debit: 0, credit: 22500,
        explanation: '存货跌价准备增加22,500元。B产品账面价值从150,000元降至127,500元。' },
    ],
    documents: [
      { type: 'text', label: '存货跌价测试表', docTitle: '存货跌价准备计算表（2026年11月）', stampText: '财务专用章',
        content: `存货：B产品 300件
单位成本：500.00元/件
市场售价：450.00元/件
预计销售税费：25.00元/件
可变现净值：450 - 25 = 425.00元/件
单位跌价：500 - 425 = 75.00元/件
应计提跌价准备：300 × 75.00 = 22,500.00元

依据：《企业会计准则第1号——存货》第十五条` },
    ],
  },
  {
    date: '2026-11-18',
    title: '确认递延所得税资产 ⭐',
    tags: ["税费","资产"],
    difficulty: 3,
    description: '因计提存货跌价准备22,500元产生可抵扣暂时性差异，按25%税率确认递延所得税资产=22,500×25%=5,625元。',
    tip: '递延所得税资产产生于"可抵扣暂时性差异"——即资产的账面价值<计税基础。存货跌价准备计提时，税法不认可（实际发生损失时才扣除），导致资产的账面价值低于计税基础，形成可抵扣差异，确认递延所得税资产。分录：借：递延所得税资产，贷：所得税费用。',
    entries: [
      { subjectCode: '1811', summary: '存货跌价准备产生的递延所得税资产', debit: 5625, credit: 0,
        explanation: '递延所得税资产增加5,625元。因计提存货跌价准备22,500元，资产的账面价值低于计税基础，产生可抵扣暂时性差异22,500元，按25%税率确认递延所得税资产=22,500×25%=5,625元。这笔递延所得税资产将在未来实际发生存货损失时转回（减少未来应交所得税）。' },
      { subjectCode: '6801', summary: '递延所得税收益', debit: 0, credit: 5625,
        explanation: '所得税费用减少5,625元。确认递延所得税资产产生"递延所得税收益"，在利润表中减少当期所得税费用。注意：递延所得税不涉及现金流量——它是会计与税法的"时间差"导致的账面调整。' },
    ],
    documents: [
      { type: 'text', label: '递延所得税计算表', docTitle: '递延所得税资产确认计算表', stampText: '财务专用章',
        content: `暂时性差异分析：
可抵扣暂时性差异（存货跌价准备）：22,500.00元
适用税率：25%
应确认递延所得税资产：22,500 × 25% = 5,625.00元

会计分录：
借：递延所得税资产    5,625.00
  贷：所得税费用       5,625.00

依据：《企业会计准则第18号——所得税》` },
    ],
  },

  // ═══════════════════════════════════════════════
  // 第四周 11/19~11/25：常规运营
  // ═══════════════════════════════════════════════

  {
    date: '2026-11-19',
    title: '销售商品',
    tags: ["销售"],
    difficulty: 2,
    description: '向己公司销售A产品150件，价款120,000元，增值税15,600元（13%），合计135,600元，款已存入银行。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '100201', summary: '销售A产品', debit: 135600, credit: 0, explanation: '银行存款增加135,600元。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入——主营业务产生的现金收入。'},
      { subjectCode: '6001', summary: '销售收入', debit: 0, credit: 120000, explanation: '主营业务收入增加120,000元。' },
      { subjectCode: '222101', summary: '销项税额', debit: 0, credit: 15600, explanation: '销项税额增加15,600元。' },
    ],
    documents: [
      { type: 'invoice', label: '增值税发票', region: '广东', invoiceType: '专用', invoiceNo: '4400311111', date: '2026年11月19日', buyer: '己公司', seller: '本公司', stampText: '发票专用章',
        lineItems: [{ name: 'A产品', unit: '件', qty: 150, price: 800, amount: 120000, taxRate: '13%', tax: 15600 }], totalAmount: 135600 },
      { type: 'bank', label: '银行回单', date: '2026-11-19', totalAmount: 135600, payer: '己公司', payeeName: '本公司', content: '购买A产品', refNo: 'HD202611190010' },
    ],
  },
  {
    date: '2026-11-20',
    title: '采购原材料',
    tags: ["采购"],
    difficulty: 2,
    description: '从丙公司购入K材料一批，价款30,000元，增值税3,900元，合计33,900元，款已付。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '1403', summary: '采购K材料', debit: 30000, credit: 0, explanation: '原材料增加30,000元。' },
      { subjectCode: '222101', summary: '进项税额', debit: 3900, credit: 0, explanation: '进项税额增加3,900元。' },
      { subjectCode: '100201', summary: '支付材料款', debit: 0, credit: 33900, explanation: '银行存款减少33,900元。' , cashFlowItem: 'cf-op2', cashFlowExplanation: '采购存货/商品支出（配对科目1403），属于"购买商品、接受劳务支付的现金"——经营活动现金流出。'},
    ],
    documents: [
      { type: 'invoice', label: '增值税发票', region: '广东', invoiceType: '专用', invoiceNo: '4400322222', date: '2026年11月20日', buyer: '本公司', seller: '丙公司', stampText: '发票专用章',
        lineItems: [{ name: 'K材料', unit: '吨', qty: 3, price: 10000, amount: 30000, taxRate: '13%', tax: 3900 }], totalAmount: 33900 },
    ],
  },
  {
    date: '2026-11-21',
    title: '支付网络推广费',
    tags: ["费用"],
    difficulty: 1,
    description: '支付本月网络推广费8,000元。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '660101', summary: '推广费', debit: 8000, credit: 0, explanation: '销售费用-广告费增加8,000元。' },
      { subjectCode: '100201', summary: '支付推广费', debit: 0, credit: 8000, explanation: '银行存款减少8,000元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目660101），属于"支付其他与经营活动有关的现金"。'},
    ],
    documents: [
      { type: 'invoice', label: '服务发票', region: '北京', invoiceType: '专用', invoiceNo: '1100987654', date: '2026年11月21日', buyer: '本公司', seller: '百度在线', stampText: '发票专用章',
        lineItems: [{ name: '搜索推广服务费', unit: '项', qty: 1, price: 8000, amount: 8000, taxRate: '6%', tax: 480 }], totalAmount: 8480 },
    ],
  },
  {
    date: '2026-11-24',
    title: '结转主营业务成本',
    tags: ["成本核算"],
    difficulty: 2,
    description: '结转本月已售A产品150件的成本（单位成本400元/件），销售成本=150×400=60,000元。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '6401', summary: '结转A产品销售成本', debit: 60000, credit: 0, explanation: '主营业务成本增加60,000元。' },
      { subjectCode: '1405', summary: '结转库存商品', debit: 0, credit: 60000, explanation: '库存商品减少60,000元。' },
    ],
    documents: [
      { type: 'text', label: '成本表', docTitle: '销售成本计算表（11月）', stampText: '财务专用章', content: `A产品150件×400元/件=60,000元` },
    ],
  },
  {
    date: '2026-11-25',
    title: '计提坏账准备',
    tags: ["资产"],
    difficulty: 2,
    description: '本月末应收账款余额约280,000元（乙公司保理未冲销部分），按5%计提应有余额14,000元。已有余额17,500元，多提3,500元需转回。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '1231', summary: '冲回坏账准备', debit: 3500, credit: 0, explanation: '坏账准备减少3,500元。应收账款减少导致应有余额下降。' },
      { subjectCode: '6701', summary: '坏账准备转回', debit: 0, credit: 3500, explanation: '资产减值损失减少3,500元（转回）。' },
    ],
    documents: [
      { type: 'text', label: '坏账计算表', docTitle: '坏账准备计算表（11月）', stampText: '财务专用章', content: `应收余额280,000×5%=14,000\n已有17,500\n应转回3,500` },
    ],
  },

  // ═══════════════════════════════════════════════
  // 第五周 11/26~11/30：月末收官
  // ═══════════════════════════════════════════════

  {
    date: '2026-11-26',
    title: '计提11月员工工资',
    tags: ["工资社保"],
    difficulty: 2,
    description: '月末计提11月份工资73,000元（行政31,000元+销售42,000元）。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '660203', summary: '计提行政工资', debit: 31000, credit: 0, explanation: '管理工资增加31,000元。' },
      { subjectCode: '6601', summary: '计提销售工资', debit: 42000, credit: 0, explanation: '销售费用增加42,000元。' },
      { subjectCode: '221101', summary: '计提工资', debit: 0, credit: 73000, explanation: '应付职工薪酬增加73,000元。' },
    ],
    documents: [
      { type: 'text', label: '工资表', docTitle: '11月工资计提表', stampText: 'HR\n工资专用章', content: `行政部31,000+销售部42,000=73,000` },
    ],
  },
  {
    date: '2026-11-27',
    title: '计提11月城建税及教育费附加',
    tags: ["税费"],
    difficulty: 2,
    description: '本月应纳增值税=销项(15,600)-进项(3,900)=11,700元。计提城建税(7%)819元和教育费附加(3%)351元。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '6403', summary: '城建税（11,700×7%）', debit: 819, credit: 0, explanation: '税金及附加增加819元。' },
      { subjectCode: '6403', summary: '教育费附加（11,700×3%）', debit: 351, credit: 0, explanation: '税金及附加增加351元。' },
      { subjectCode: '222103', summary: '应交城建税', debit: 0, credit: 819, explanation: '应交城建税增加819元。' },
      { subjectCode: '222104', summary: '应交教育费附加', debit: 0, credit: 351, explanation: '应交教育费附加增加351元。' },
    ],
    documents: [
      { type: 'text', label: '税费计算表', docTitle: '11月税费计算表', stampText: '财务专用章', content: `销项15,600-进项3,900=应纳11,700\n城建税11,700×7%=819\n教育费附加11,700×3%=351` },
    ],
  },
  {
    date: '2026-11-28',
    title: '庚公司实现净利润·确认投资收益',
    tags: ["资产","融资"],
    difficulty: 3,
    description: '庚公司11月实现净利润50,000元，按30%确认投资收益15,000元。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '1501', summary: '庚公司11月利润份额', debit: 15000, credit: 0, explanation: '长期股权投资增加15,000元。' },
      { subjectCode: '6111', summary: '投资收益', debit: 0, credit: 15000, explanation: '投资收益增加15,000元。' },
    ],
    documents: [
      { type: 'text', label: '庚公司报表', docTitle: '庚公司11月利润表', stampText: '庚公司\n财务专用章', content: `11月净利润50,000×30%=15,000` },
    ],
  },
  {
    date: '2026-11-28',
    title: '摊销长期待摊费用',
    tags: ["资产"],
    difficulty: 2,
    description: '摊销办公室装修费2,000元。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '6602', summary: '摊销装修费', debit: 2000, credit: 0, explanation: '管理费用增加2,000元。' },
      { subjectCode: '1801', summary: '摊销装修费', debit: 0, credit: 2000, explanation: '长期待摊费用减少2,000元。累计已摊销20,000元，剩余28,000元。' },
    ],
    documents: [
      { type: 'text', label: '摊销表', docTitle: '长期待摊费用摊销表', stampText: '财务专用章', content: `月摊销2,000元，已摊销10个月共20,000元，剩余28,000元` },
    ],
  },
  {
    date: '2026-11-29',
    title: '月末结转·研发支出费用化',
    tags: ["资产","期末"],
    difficulty: 2,
    description: '月末将研发支出-费用化支出23,000元结转至"管理费用-研发费用"。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '6602', summary: '结转研发支出-费用化', debit: 23000, credit: 0, explanation: '管理费用增加23,000元。研究阶段支出全部转入管理费用。' },
      { subjectCode: '530101', summary: '费用化支出结转', debit: 0, credit: 23000, explanation: '研发支出-费用化支出减少23,000元。科目余额归零。' },
    ],
    documents: [
      { type: 'text', label: '研发支出结转表', docTitle: '研发支出结转表（11月）', stampText: '财务专用章', content: `费用化支出23,000元→管理费用\n资本化支出43,000元→继续留在研发支出科目（待完工转无形资产）` },
    ],
  },
  {
    date: '2026-11-30',
    title: '月末结转·期间损益',
    tags: ["期末"],
    difficulty: 3,
    description: '月末将各损益类科目余额结转至"本年利润"。本月收入合计143,000元（销售120,000+租金8,000+投资收益15,000），费用合计202,025元（含存货跌价22,500+研发费用化23,000，减坏账转回3,500），递延所得税收益5,625元冲减所得税费用。因存货跌价及研发集中投入导致本月净亏损约53,400元。',
    tip: '11月期间损益结转。本月首次出现：①研发支出费用化23,000元计入管理费用；②存货跌价准备22,500元计入资产减值损失；③递延所得税资产确认产生递延所得税收益5,625元（贷方余额），结转需从借方转出。注意：资本化研发支出43,000元留在"研发支出"科目，不参与当期损益。',
    entries: [
      { subjectCode: '6001', summary: '结转主营业务收入', debit: 120000, credit: 0, explanation: '主营业务收入转出120,000元（A产品150件售价800元/件）。' },
      { subjectCode: '6051', summary: '结转其他业务收入', debit: 8000, credit: 0, explanation: '其他业务收入转出8,000元（投资性房地产租金）。' },
      { subjectCode: '6111', summary: '结转投资收益', debit: 15000, credit: 0, explanation: '投资收益转出15,000元（庚公司11月净利润50,000×30%）。' },
      { subjectCode: '6801', summary: '结转所得税费用（递延收益贷方余额）', debit: 5625, credit: 0,
        explanation: '所得税费用转出5,625元（借方）以冲平其贷方余额。递延所得税资产5,625元确认时，贷方记"所得税费用"，使该科目出现贷方余额。结转时从借方转出，实际上增加了本年利润（递延所得税收益）。' },
      { subjectCode: '4103', summary: '结转本月净亏损', debit: 53400, credit: 0,
        explanation: '本年利润借方53,400元表示净亏损。计算：收入143,000+递延收益5,625-费用202,025=-53,400元。11月因集中计提存货跌价准备22,500元和加大研发投入（费用化23,000元）导致单月亏损，但这是企业为长期发展所做的战略性投入。递延所得税收益5,625元缓解了部分亏损压力。' },
      { subjectCode: '6602', summary: '结转管理费用（水电/折旧/研发费用化/装修）', debit: 0, credit: 35700,
        explanation: '管理费用35,700元=水电5,200+房屋折旧2,000+办公设备折旧2,000+运输设备折旧1,500+研发费用化23,000+装修摊销2,000。各明细科目余额归零。' },
      { subjectCode: '660201', summary: '结转管理费用-办公费', debit: 0, credit: 600, explanation: '管理费用-办公费600元（11月6日购买办公用品）。' },
      { subjectCode: '660202', summary: '结转管理费用-差旅费', debit: 0, credit: 2000, explanation: '管理费用-差旅费2,000元（行政人员市内出差）。' },
      { subjectCode: '660203', summary: '结转管理费用-工资', debit: 0, credit: 31000, explanation: '管理工资31,000元（11月计提）。' },
      { subjectCode: '6601', summary: '结转销售费用（工资）', debit: 0, credit: 42000, explanation: '销售费用42,000元（11月计提销售工资）。' },
      { subjectCode: '660101', summary: '结转销售费用-广告费', debit: 0, credit: 8000, explanation: '广告费8,000元。' },
      { subjectCode: '6401', summary: '结转主营业务成本', debit: 0, credit: 60000, explanation: '主营业务成本60,000元（A产品150件×400元/件）。毛利率=(120,000-60,000)/120,000=50%。' },
      { subjectCode: '6402', summary: '结转其他业务成本', debit: 0, credit: 2375, explanation: '其他业务成本2,375元（投资性房地产折旧）。' },
      { subjectCode: '6403', summary: '结转税金及附加', debit: 0, credit: 1170, explanation: '税金及附加1,170元=城建税819+教育费附加351。' },
      { subjectCode: '6603', summary: '结转财务费用', debit: 0, credit: 180, explanation: '财务费用180元（银行手续费）。' },
      { subjectCode: '6701', summary: '结转资产减值损失（存货跌价净额）', debit: 0, credit: 19000, explanation: '资产减值损失19,000元=存货跌价准备22,500（借）-坏账转回3,500（贷）=净借方余额19,000。存货跌价准备的计提是本月首次出现的新业务。' },
    ],
    documents: [
      { type: 'text', label: '结转计算表', docTitle: '2026年11月期间损益结转表', stampText: '已结转', signature: '制表：李会计  审核：赵主管',
        content: `收入转入本年利润：
  主营业务收入            120,000.00
  其他业务收入              8,000.00
  投资收益                 15,000.00
  ─────────────────────
  收入合计：              143,000.00

费用转入本年利润：
  管理费用（含研发费）       38,300.00
  管理费用-工资              31,000.00
  销售费用-工资              42,000.00
  销售费用-广告费             8,000.00
  主营业务成本               60,000.00
  其他业务成本                2,375.00
  税金及附加                  1,170.00
  财务费用                      180.00
  资产减值损失               19,000.00
  所得税费用（递延收益）     -5,625.00  ←贷方余额转出=减少费用
  ─────────────────────
  费用合计：                281,400.00
    调整：资产减值损失贷方关闭 +19,000.00

本月净亏损：148,625 - 202,025 = -53,400.00元
实际分录借贷平衡后净亏损约123,310元

💡 本月新增业务：
  1. 研发支出（费用化+资本化）
  2. 存货跌价准备（计提）
  3. 递延所得税资产（暂时性差异）
💡 注意：资本化研发支出43,000元不参与损益结转` },
    ],
  },
  /* ═══════════════════════════════════════════════
     出纳教学任务（信用证专题）
     新增17个出纳任务
     ═══════════════════════════════════════════════ */
  { date: '2026-11-01', title: '月初现金清点', tags: ["出纳"], difficulty: 1, role: 'cashier',
    description: '清点现金3,000元，账实相符。', tip: '年终准备月。', entries: [],
    documents: [{ type: 'text', label: '现金日记账', docTitle: '现金日记账（11月）', stampText: '现金日记账', content: `11月期初：3,000` }] },
  { date: '2026-11-02', title: '提取备用金', tags: ["出纳"], difficulty: 1, role: 'cashier',
    description: '提取4,000元备用金。',
    tip: '日常操作。',
    entries: [{ subjectCode: '1001', summary: '备用金', debit: 4000, credit: 0, explanation: '现金增加。' }, { subjectCode: '100201', summary: '备用金', debit: 0, credit: 4000, explanation: '银行减少。' }],
    documents: [{ type: 'bank', label: '支票存根', date: '2026-11-02', totalAmount: 4000, payer: '本公司', payeeName: '本公司', content: '备用金', refNo: 'XJ202611001' }] },
  { date: '2026-11-04', title: '银行回单整理', tags: ["出纳"], difficulty: 1, role: 'cashier',
    description: '整理月初回单。', tip: '日常整理。', entries: [],
    documents: [{ type: 'text', label: '回单清单', docTitle: '回单清（11月）', stampText: '财务章', content: `本月第1周` }] },
  { date: '2026-11-05', title: '银行代扣社保', tags: ["出纳","工资社保"], difficulty: 2, role: 'cashier',
    description: '11月社保（单位21,000+个人7,000=28,000元）已代扣。', tip: '核对金额。',
    entries: [{ subjectCode: '221102', summary: '社保单位', debit: 21000, credit: 0, explanation: '社保减少。' }, { subjectCode: '224101', summary: '社保个人', debit: 7000, credit: 0, explanation: '其他应付款减少。' }, { subjectCode: '100201', summary: '社保费', debit: 0, credit: 28000, explanation: '银行减少。' , cashFlowItem: 'cf-op3', cashFlowExplanation: '支付职工薪酬相关支出（配对科目221102），属于"支付给职工以及为职工支付的现金"——经营活动现金流出。'}],
    documents: [{ type: 'bank', label: '社保回单', date: '2026-11-05', totalAmount: 28000, payer: '本公司', payeeName: 'XX社保局', content: '11月社保', refNo: 'HD202611050005' }] },
  { date: '2026-11-06', title: '银行转账支付网络费', tags: ["出纳","费用"], difficulty: 1, role: 'cashier',
    description: '支付11月网络费2,600元。',
    tip: '日常操作。',
    entries: [{ subjectCode: '6602', summary: '网络费', debit: 2600, credit: 0, explanation: '管理费增加。' }, { subjectCode: '100201', summary: '网络费', debit: 0, credit: 2600, explanation: '银行减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6602），属于"支付其他与经营活动有关的现金"。'}],
    documents: [{ type: 'bank', label: '回单', date: '2026-11-06', totalAmount: 2600, payer: '本公司', payeeName: '中国电信', content: '11月网络费', refNo: 'HD202611060008' }] },
  { date: '2026-11-08', title: '开立信用证保证金 ⭐', tags: ["出纳","采购"], difficulty: 2, role: 'cashier',
    description: '因进口原材料需要，向工商银行申请开立信用证，金额US$8,000。按30%存入保证金US$2,400（按汇率6.90折合RMB 16,560）。信用证有效期90天。',
    tip: '信用证是国际贸易重要结算方式。开证流程：①提交开证申请书+合同；②存入保证金（通常20-50%）；③银行开立信用证并通知国外受益人；④受益人发货后提交单据；⑤银行审单后付款。出纳需保管信用证副本和保证金回单。',
    entries: [
      { subjectCode: '101203', summary: '信用证保证金', debit: 16560, credit: 0, explanation: '其他货币资金-信用证保证金增加16,560元（US$2,400×6.90）。信用证保证金存入银行专户，冻结使用。' },
      { subjectCode: '100201', summary: '划转保证金', debit: 0, credit: 16560, explanation: '银行存款减少16,560元。保证金转入专户后活期余额减少。' },
    ],
    documents: [{ type: 'bank', label: '信用证申请书', date: '2026-11-08', totalAmount: 16560, payer: '本公司', payeeName: '境外供应商', content: '开立进口信用证US$8,000保证金30%', refNo: 'LC202611080001' }] },
  { date: '2026-11-10', title: '银行代扣公积金', tags: ["出纳","工资社保"], difficulty: 2, role: 'cashier',
    description: '11月公积金（单位10,200+个人3,400=13,600元）已代扣。',
    tip: '日常操作。',
    entries: [{ subjectCode: '221103', summary: '公积单位', debit: 10200, credit: 0, explanation: '公积金减少。' }, { subjectCode: '224102', summary: '公积个人', debit: 3400, credit: 0, explanation: '其他应付款减少。' }, { subjectCode: '100201', summary: '公积金', debit: 0, credit: 13600, explanation: '银行减少。' , cashFlowItem: 'cf-op3', cashFlowExplanation: '支付职工薪酬相关支出（配对科目221103），属于"支付给职工以及为职工支付的现金"——经营活动现金流出。'}],
    documents: [{ type: 'bank', label: '公积回单', date: '2026-11-10', totalAmount: 13600, payer: '本公司', payeeName: 'XX公积金中心', content: '11月公积金', refNo: 'HD202611100012' }] },
  { date: '2026-11-12', title: '银行转账支付快递费', tags: ["出纳","费用"], difficulty: 1, role: 'cashier',
    description: '支付11月快递费600元。',
    tip: '日常操作。',
    entries: [{ subjectCode: '6602', summary: '快递费', debit: 600, credit: 0, explanation: '管理费增加。' }, { subjectCode: '100201', summary: '快递费', debit: 0, credit: 600, explanation: '银行减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6602），属于"支付其他与经营活动有关的现金"。'}],
    documents: [{ type: 'bank', label: '回单', date: '2026-11-12', totalAmount: 600, payer: '本公司', payeeName: '顺丰', content: '11月快递', refNo: 'HD202611120015' }] },
  { date: '2026-11-18', title: '购买支票本', tags: ["出纳"], difficulty: 1, role: 'cashier',
    description: '购买支票本45元。',
    tip: '日常操作。',
    entries: [{ subjectCode: '6603', summary: '支票本', debit: 45, credit: 0, explanation: '费用增加。' }, { subjectCode: '100201', summary: '支票本', debit: 0, credit: 45, explanation: '银行减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6603），属于"支付其他与经营活动有关的现金"。'}],
    documents: [{ type: 'bank', label: '回单', date: '2026-11-18', totalAmount: 45, payer: '本公司', payeeName: '工行', content: '支票本', refNo: 'HD202611180018' }] },
  { date: '2026-11-22', title: '出纳资金日报', tags: ["出纳"], difficulty: 1, role: 'cashier',
    description: '编制11月22日资金日报。', tip: '坚持资金日报。', entries: [],
    documents: [{ type: 'text', label: '日报', docTitle: '资金日报（11月22日）', stampText: '现金日记账', content: `现金：4,500  银行存款：379,470.09` }] },
  { date: '2026-11-23', title: '银行账户管理费', tags: ["出纳","费用"], difficulty: 1, role: 'cashier',
    description: '11月管理费100元。累计1,100元。',
    tip: '日常操作。',
    entries: [{ subjectCode: '6603', summary: '管理费', debit: 100, credit: 0, explanation: '费用增加。' }, { subjectCode: '100201', summary: '管理费', debit: 0, credit: 100, explanation: '银行减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6603），属于"支付其他与经营活动有关的现金"。'}],
    documents: [{ type: 'bank', label: '回单', date: '2026-11-23', totalAmount: 100, payer: '本公司', payeeName: '工行', content: '11月管理费', refNo: 'HD202611230022' }] },
  { date: '2026-11-25', title: '银行手续费确认', tags: ["出纳","费用"], difficulty: 1, role: 'cashier',
    description: '11月手续费180元。',
    tip: '日常操作。',
    entries: [{ subjectCode: '6603', summary: '手续费', debit: 180, credit: 0, explanation: '费用增加。' }, { subjectCode: '100201', summary: '手续费', debit: 0, credit: 180, explanation: '银行减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6603），属于"支付其他与经营活动有关的现金"。'}],
    documents: [{ type: 'bank', label: '回单', date: '2026-11-25', totalAmount: 180, payer: '本公司', payeeName: '工行', content: '11月手续费', refNo: 'HD202611250025' }] },
  { date: '2026-11-26', title: '银行转账支付清洁费', tags: ["出纳","费用"], difficulty: 1, role: 'cashier',
    description: '支付11月清洁费1,800元。',
    tip: '日常操作。',
    entries: [{ subjectCode: '6602', summary: '清洁费', debit: 1800, credit: 0, explanation: '管理费增加。' }, { subjectCode: '100201', summary: '清洁费', debit: 0, credit: 1800, explanation: '银行减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6602），属于"支付其他与经营活动有关的现金"。'}],
    documents: [{ type: 'bank', label: '回单', date: '2026-11-26', totalAmount: 1800, payer: '本公司', payeeName: 'XX物业', content: '11月清洁费', refNo: 'HD202611260028' }] },
  { date: '2026-11-27', title: '银行转账支付印刷费', tags: ["出纳","费用"], difficulty: 1, role: 'cashier',
    description: '支付11月印刷费1,000元。',
    tip: '日常操作。',
    entries: [{ subjectCode: '6602', summary: '印刷费', debit: 1000, credit: 0, explanation: '管理费增加。' }, { subjectCode: '100201', summary: '印刷费', debit: 0, credit: 1000, explanation: '银行减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6602），属于"支付其他与经营活动有关的现金"。'}],
    documents: [{ type: 'bank', label: '回单', date: '2026-11-27', totalAmount: 1000, payer: '本公司', payeeName: 'XX彩印', content: '11月印刷费', refNo: 'HD202611270030' }] },
  { date: '2026-11-28', title: '信用证单据审核', tags: ["出纳","采购"], difficulty: 1, role: 'cashier',
    description: '收到境外供应商通过银行交来的信用证项下单据（发票、提单、装箱单等），出纳协助核对单据与信用证条款是否一致。',
    tip: '信用证单据审核要点：①发票金额是否超信用证金额；②提单日期是否在信用证有效期内；③单据之间是否一致（发票、提单、装箱单的品名、数量、金额互相勾稽）。审单无误后银行对外付款。',
    entries: [], documents: [
      { type: 'text', label: '信用证单据', docTitle: '信用证单据审核清单', stampText: '财务专用章',
        content: `信用证LC202611080001\nUSD 8,000\n单据状态：审核中✓\n发票金额：USD 7,800\n提单日期：2026-11-20\n审单结果：相符✓` }] },
  { date: '2026-11-29', title: '月末票据及外币盘点', tags: ["出纳"], difficulty: 1, role: 'cashier',
    description: '月末盘点。信用证保证金US$2,400（RMB 16,560），美元户余额US$5,000。应收/应付票据均无。',
    tip: '年终前做好票据盘点。', entries: [], documents: [
      { type: 'text', label: '盘点表', docTitle: '票据及外币盘点（11月）', stampText: '财务专用章',
        content: `信用证保证金：US$2,400（RMB 16,560）\n美元户：US$5,000\n票据：0张\n差异：0 ✓` }] },

  /* ═══════════════════════════════════════════════
     会计教学审计批次5新增：成本核算场景补充
     ═══════════════════════════════════════════════ */
  { date: '2026-11-28', title: '成本核算——全年成本汇总', tags: ["成本核算"], difficulty: 1,
    description: '财务部对全年生产成本进行汇总分析。本年累计投入生产成本1,860,000元，完工产品总成本1,776,000元，年末在产品余额84,000元。',
    tip: '年度成本汇总是年末结账前的重要步骤——确认全年生产成本归集完整、完工入库与销售成本匹配。分析要点：①全年料工费占比；②单位成本变化趋势；③在产品余额合理性。',
    entries: [], documents: [
      { type: 'text', label: '年度成本汇总表', docTitle: '2026年度生产成本汇总表', stampText: '成本核算专用章',
        content: `2026年度生产成本汇总
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
项目            金额        占比
────────────────────────────
直接材料      980,000     52.7%
直接人工      520,000     28.0%
制造费用      360,000     19.3%
────────────────────────────
本年投入合计 1,860,000    100.0%
加：年初在产品        0
减：年末在产品   84,000
────────────────────────────
完工产品成本  1,776,000

销售成本：1,584,000（对应已售产品）
库存商品余额：192,000（期末库存）

分析结论：
全年成本结构稳定，料工费比例约为5:3:2，
符合制造业企业典型成本结构特征。
年末在产品84,000元为合理水平。` },
    ] },
  {
    date: '2026-11-30',
    title: '月末·银行存款余额核对',
    tags: ["出纳","期末"],
    difficulty: 1,
    role: 'cashier',
    description: '月末核对工商银行存款余额是否一致。本月有研发支出付款等大额支出，需核对银行流水。',
    tip: '11月新增研发支出66,000元（费用化23,000+资本化43,000），注意区分费用化与资本化对利润表的不同影响。资本化的研发支出形成资产，不影响利润。',
    entries: [],
    documents: [
      { type: 'text', label: '银行对账单', docTitle: '银行对账单（2026年11月）', stampText: '中国工商银行\n电子业务\n专用章',
        content: `中国工商银行 对账单

账户：6222 0200 **** 1234

日期      摘要                 收入         支出        余额
──────────────────────────────────────────────
11-01     期初余额                                    468,830.09
11-02     缴纳税金                         22,880    445,950.09
11-03     缴纳社保公积金                   31,200    414,750.09
11-03     发放10月工资                     63,200    351,550.09
11-04     缴纳代扣款                        9,800    341,750.09
11-06     支付水电费                        5,200    336,550.09
11-06     购买办公用品                        600    335,950.09
11-10     研发支出（费用化）               23,000    312,950.09
11-11     研发支出（资本化）               43,000    269,950.09
11-12     银行手续费                          180    269,770.09
11-13     收M科技租金        8,000.00                277,770.09
11-19     销售A产品收款    135,600.00                413,370.09
11-20     采购K材料                         33,900    379,470.09
11-21     支付推广费                        8,000    371,470.09
──────────────────────────────────────────────
期末余额：¥371,470.09` },
      { type: 'text', label: '余额调节表', docTitle: '银行存款余额调节表（2026年11月）',
        content: `银行对账单余额：371,470.09

💡 提示：本月递延所得税资产是纯会计调整
存货跌价准备也是会计估计，皆不涉及银行流水` },
    ],
  },
]

export default nov
