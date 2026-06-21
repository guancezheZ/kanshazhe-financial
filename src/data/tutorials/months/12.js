/**
 * 12月份业务教程数据（46个任务：29会计 + 17出纳）
 *
 * 难度：★★★☆☆（年终决算月，全年收官）
 * 新增业务类型：全年利润结转、利润分配（盈余公积+股利）
 *
 * 出纳专题：年终出纳——现金抽盘/票据清查/年度归档/银行年检
 * 业务叙事：12月为年终决算月。月初常规缴税发工资经营，
 *           月末完成全年最重要的会计工作——利润分配。
 *           包括：结转本年利润至利润分配、提取法定盈余公积（10%）、
 *           提取任意盈余公积、宣告分配现金股利、结转利润分配明细。
 * 教学重点：让学生理解年末利润分配的全流程——结转净利润→提取盈余公积→
 *           分配股利→结转利润分配明细科目
 *
 * 会计准则依据：
 *   《中华人民共和国公司法》第一百六十六条（盈余公积提取）
 *   《企业会计准则——基本准则》第三十条（利润分配）
 */

const dec = [
  // ═══════════════════════════════════════════════
  // 第一周 12/1~12/5：月初常规
  // ═══════════════════════════════════════════════

  {
    date: '2026-12-01',
    title: '缴纳11月增值税',
    tags: ["税费"],
    difficulty: 1,
    description: '缴纳11月份应交增值税11,700元。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '222101', summary: '缴纳11月增值税', debit: 11700, credit: 0, explanation: '11月底计提的应交增值税，本月缴纳。' },
      { subjectCode: '100201', summary: '缴纳税款', debit: 0, credit: 11700, explanation: '银行存款减少11,700元。' , cashFlowItem: 'cf-op4', cashFlowExplanation: '缴纳税费支出（配对科目222101），属于"支付的各项税费"——经营活动现金流出。'}],
    documents: [{ type: 'receipt', label: '缴款书', docTitle: '税收缴款书', date: '2026-12-01', totalAmount: 11700, payer: '本公司', stampText: '国家税务总局\n征收章', items: [{ name: '11月增值税', qty: 1, price: 11700, amount: 11700 }] }]},
  {
    date: '2026-12-01',
    title: '缴纳11月城建税及教育费附加',
    tags: ["税费"],
    difficulty: 1,
    description: '缴纳11月城建税819元和教育费附加351元。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '222103', summary: '缴纳城建税', debit: 819, credit: 0, explanation: '冲减应交城建税。' },
      { subjectCode: '222104', summary: '缴纳教育费附加', debit: 351, credit: 0, explanation: '冲减应交教育费附加。' },
      { subjectCode: '100201', summary: '缴纳税款', debit: 0, credit: 1170, explanation: '银行存款减少1,170元。' , cashFlowItem: 'cf-op4', cashFlowExplanation: '缴纳税费支出（配对科目222103），属于"支付的各项税费"——经营活动现金流出。'}],
    documents: [{ type: 'receipt', label: '缴款书', docTitle: '城建税及附加缴款书', date: '2026-12-01', totalAmount: 1170, payer: '本公司', stampText: '国家税务总局\n征收章', items: [{ name: '11月城建税+附加', qty: 1, price: 1170, amount: 1170 }] }]},
  {
    date: '2026-12-02',
    title: '缴纳11月社保及公积金',
    tags: ["工资社保"],
    difficulty: 1,
    description: '缴纳11月社保21,000元和公积金10,200元（单位部分）。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '221102', summary: '缴纳社保', debit: 21000, credit: 0, explanation: '冲减社保负债。' },
      { subjectCode: '221103', summary: '缴纳公积金', debit: 10200, credit: 0, explanation: '冲减公积金负债。' },
      { subjectCode: '100201', summary: '缴纳社保公积金', debit: 0, credit: 31200, explanation: '银行存款减少31,200元。' , cashFlowItem: 'cf-op3', cashFlowExplanation: '支付职工薪酬相关支出（配对科目221102），属于"支付给职工以及为职工支付的现金"——经营活动现金流出。'}],
    documents: [{ type: 'receipt', label: '社保缴费单', docTitle: '社保缴费单', date: '2026-12-02', totalAmount: 21000, payer: '本公司', stampText: 'XX市社保局\n社保征缴章', items: [{ name: '养老+医疗+失业+工伤+生育', qty: 1, price: 21000, amount: 21000 }] }]},
  {
    date: '2026-12-02',
    title: '发放11月职工工资',
    tags: ["工资社保"],
    difficulty: 2,
    description: '发放11月工资73,000元。代扣社保4,200元、公积金3,600元、个税2,000元，实发63,200元。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '221101', summary: '发放11月工资（应发）', debit: 73000, credit: 0, explanation: '冲减应付工资全额。' },
      { subjectCode: '100201', summary: '实发工资', debit: 0, credit: 63200, explanation: '银行存款减少63,200元。' , cashFlowItem: 'cf-op3', cashFlowExplanation: '支付职工薪酬相关支出（配对科目221101），属于"支付给职工以及为职工支付的现金"——经营活动现金流出。'},
      { subjectCode: '2241', summary: '代扣社保', debit: 0, credit: 4200, explanation: '暂挂其他应付款。' },
      { subjectCode: '2241', summary: '代扣公积金', debit: 0, credit: 3600, explanation: '暂挂其他应付款。' },
      { subjectCode: '2221', summary: '代扣个税', debit: 0, credit: 2000, explanation: '应交个税增加2,000元。' }],
    documents: [{ type: 'text', label: '工资表', docTitle: '11月工资发放表', stampText: 'HR\n工资专用章', content: `行政31,000+销售42,000=73,000\n代扣9,800，实发63,200` }]},
  {
    date: '2026-12-03',
    title: '缴纳代扣个税及社保',
    tags: ["税费","工资社保"],
    difficulty: 1,
    description: '缴纳11月代扣个税2,000元和代扣社保公积金个人部分7,800元。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '2221', summary: '缴纳代扣个税', debit: 2000, credit: 0, explanation: '冲减应交个税。' },
      { subjectCode: '2241', summary: '缴纳代扣社保公积金', debit: 7800, credit: 0, explanation: '冲减其他应付款。' },
      { subjectCode: '100201', summary: '缴纳税费', debit: 0, credit: 9800, explanation: '银行存款减少9,800元。' , cashFlowItem: 'cf-op4', cashFlowExplanation: '缴纳税费支出（配对科目2221），属于"支付的各项税费"——经营活动现金流出。'}],
    documents: [{ type: 'bank', label: '银行回单', date: '2026-12-03', totalAmount: 9800, payer: '本公司', payeeName: 'XX市税务局', content: '缴纳代扣款项', refNo: 'HD202612030004' }]},
  {
    date: '2026-12-04',
    title: '支付11月水电费',
    tags: ["费用"],
    difficulty: 1,
    description: '支付11月水电费5,200元（电费4,000+水费1,200）。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '6602', summary: '支付水电费', debit: 5200, credit: 0, explanation: '管理费用增加5,200元。' },
      { subjectCode: '100201', summary: '支付水电费', debit: 0, credit: 5200, explanation: '银行存款减少5,200元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6602），属于"支付其他与经营活动有关的现金"。'}],
    documents: [{ type: 'receipt', label: '水电费单', docTitle: '水电费缴费凭证', date: '2026-12-04', totalAmount: 5200, payer: '本公司', stampText: '缴费专用章', items: [{ name: '电费+水费', qty: 1, price: 5200, amount: 5200 }] }]},

  // ═══════════════════════════════════════════════
  // 第二周 12/7~12/11：常规
  // ═══════════════════════════════════════════════

  {
    date: '2026-12-07',
    title: '购买办公用品',
    tags: ["费用"],
    difficulty: 1,
    description: '购买办公用品一批，合计500元。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '660201', summary: '办公用品', debit: 500, credit: 0, explanation: '管理费用-办公费增加500元。' },
      { subjectCode: '100201', summary: '支付款项', debit: 0, credit: 500, explanation: '银行存款减少500元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目660201），属于"支付其他与经营活动有关的现金"。'}],
    documents: [{ type: 'receipt', label: '收据', docTitle: '收据', date: '2026-12-07', totalAmount: 500, payer: '本公司', stampText: '发票专用章', items: [{ name: '文具', qty: 1, price: 500, amount: 500 }] }]},
  {
    date: '2026-12-08',
    title: '员工报销差旅费',
    tags: ["费用"],
    difficulty: 1,
    description: '报销销售员工差旅费2,500元。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '6601', summary: '报销差旅费', debit: 2500, credit: 0, explanation: '销售费用增加2,500元。销售部门差旅费。' },
      { subjectCode: '100201', summary: '报销差旅费', debit: 0, credit: 2500, explanation: '银行存款减少2,500元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6601），属于"支付其他与经营活动有关的现金"。'}],
    documents: [{ type: 'receipt', label: '报销单', docTitle: '差旅费报销单', date: '2026-12-08', totalAmount: 2500, payer: '本公司', stampText: '财务\n审核专用章', items: [{ name: '交通+住宿', qty: 1, price: 2500, amount: 2500 }] }]},
  {
    date: '2026-12-09',
    title: '计提固定资产折旧',
    tags: ["资产"],
    difficulty: 2,
    description: '12月折旧：自用房屋2,000元、办公设备2,000元、机器设备5,000元、运输设备1,500元，合计10,500元。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '6602', summary: '房屋折旧', debit: 2000, credit: 0, explanation: '管理费用增加2,000元。' },
      { subjectCode: '6602', summary: '办公设备折旧', debit: 2000, credit: 0, explanation: '管理费用增加2,000元。' },
      { subjectCode: '6602', summary: '运输设备折旧', debit: 1500, credit: 0, explanation: '管理费用增加1,500元。' },
      { subjectCode: '5101', summary: '机器设备折旧', debit: 5000, credit: 0, explanation: '制造费用增加5,000元。' },
      { subjectCode: '1602', summary: '计提折旧', debit: 0, credit: 10500, explanation: '累计折旧增加10,500元。' }],
    documents: [{ type: 'text', label: '折旧表', docTitle: '折旧计算表（12月）', stampText: '固定资产专用章', content: '房屋2,000+办公设备2,000+运输1,500+机器5,000=10,500' }]},
  {
    date: '2026-12-10',
    title: '收取投资性房地产租金',
    tags: ["资产","费用"],
    difficulty: 2,
    description: '收到M科技公司12月办公楼租金8,000元。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '100201', summary: '租金收入', debit: 8000, credit: 0, explanation: '银行存款增加8,000元。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6051），属于经营活动现金流入——主营业务产生的现金收入。'},
      { subjectCode: '6051', summary: '租金收入', debit: 0, credit: 8000, explanation: '其他业务收入增加8,000元。年末最后一笔租金。' }],
    documents: [{ type: 'bank', label: '银行回单', date: '2026-12-10', totalAmount: 8000, payer: 'M科技有限公司', payeeName: '本公司', content: '12月办公楼租金', refNo: 'HD202612100006' }]},
  {
    date: '2026-12-11',
    title: '投资性房地产计提折旧',
    tags: ["资产"],
    difficulty: 2,
    description: '出租办公楼12月折旧2,375元。全年累计折旧：出租部分。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '6402', summary: '投资性房地产折旧', debit: 2375, credit: 0, explanation: '其他业务成本增加2,375元。累计其他业务收入8,000-其他业务成本2,375=其他业务利润5,625元。' },
      { subjectCode: '1521', summary: '累计折旧', debit: 0, credit: 2375, explanation: '投资性房地产累计折旧增加。' }],
    documents: [{ type: 'text', label: '折旧表', docTitle: '投资性房地产折旧（12月）', stampText: '固定资产\n专用章', content: '月折旧2,375.00元' }]},

  // ═══════════════════════════════════════════════
  // 第三周 12/14~12/18：经营业务
  // ═══════════════════════════════════════════════

  {
    date: '2026-12-14',
    title: '销售商品',
    tags: ["销售"],
    difficulty: 2,
    description: '向乙公司销售A产品200件，价款160,000元，增值税20,800元（13%），合计180,800元，款已存入银行。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '100201', summary: '销售A产品', debit: 180800, credit: 0, explanation: '银行存款增加180,800元。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入——主营业务产生的现金收入。'},
      { subjectCode: '6001', summary: '销售收入', debit: 0, credit: 160000, explanation: '主营业务收入增加160,000元。' },
      { subjectCode: '222101', summary: '销项税额', debit: 0, credit: 20800, explanation: '销项税额增加20,800元。' }],
    documents: [{ type: 'invoice', label: '增值税发票', region: '广东', invoiceType: '专用', invoiceNo: '4400412345', date: '2026年12月14日', buyer: '乙公司', seller: '本公司', stampText: '发票专用章',
      lineItems: [{ name: 'A产品', unit: '件', qty: 200, price: 800, amount: 160000, taxRate: '13%', tax: 20800 }], totalAmount: 180800 }]},
  {
    date: '2026-12-15',
    title: '结转主营业务成本',
    tags: ["成本核算"],
    difficulty: 2,
    description: '结转本月已售A产品200件成本（单位成本400元/件），销售成本=80,000元。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '6401', summary: '结转销售成本', debit: 80000, credit: 0, explanation: '主营业务成本增加80,000元。' },
      { subjectCode: '1405', summary: '结转库存商品', debit: 0, credit: 80000, explanation: '库存商品减少80,000元。' }],
    documents: [{ type: 'text', label: '成本表', docTitle: '销售成本计算表（12月）', stampText: '财务专用章', content: 'A产品200件×400=80,000' }]},
  {
    date: '2026-12-16',
    title: '采购原材料',
    tags: ["采购"],
    difficulty: 2,
    description: '从丙公司采购L材料一批，价款40,000元，增值税5,200元，合计45,200元，款已付。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '1403', summary: '采购L材料', debit: 40000, credit: 0, explanation: '原材料增加40,000元。' },
      { subjectCode: '222101', summary: '进项税额', debit: 5200, credit: 0, explanation: '进项税额增加5,200元。' },
      { subjectCode: '100201', summary: '支付材料款', debit: 0, credit: 45200, explanation: '银行存款减少45,200元。' , cashFlowItem: 'cf-op2', cashFlowExplanation: '采购存货/商品支出（配对科目1403），属于"购买商品、接受劳务支付的现金"——经营活动现金流出。'}],
    documents: [{ type: 'invoice', label: '增值税发票', region: '广东', invoiceType: '专用', invoiceNo: '4400423456', date: '2026年12月16日', buyer: '本公司', seller: '丙公司', stampText: '发票专用章',
      lineItems: [{ name: 'L材料', unit: '吨', qty: 4, price: 10000, amount: 40000, taxRate: '13%', tax: 5200 }], totalAmount: 45200 }]},
  {
    date: '2026-12-17',
    title: '支付推广费',
    tags: ["费用"],
    difficulty: 1,
    description: '支付12月网络推广费8,000元。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '660101', summary: '推广费', debit: 8000, credit: 0, explanation: '销售费用-广告费增加8,000元。' },
      { subjectCode: '100201', summary: '支付推广费', debit: 0, credit: 8000, explanation: '银行存款减少8,000元。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目660101），属于"支付其他与经营活动有关的现金"。'}],
    documents: [{ type: 'invoice', label: '服务发票', region: '北京', invoiceType: '专用', invoiceNo: '1100543210', date: '2026年12月17日', buyer: '本公司', seller: '百度在线', stampText: '发票专用章',
      lineItems: [{ name: '搜索推广服务费', unit: '项', qty: 1, price: 8000, amount: 8000, taxRate: '6%', tax: 480 }], totalAmount: 8480 }]},
  {
    date: '2026-12-18',
    title: '计提坏账准备',
    tags: ["资产"],
    difficulty: 2,
    description: '年末应收账款余额约320,000元，按5%计提16,000元。坏账准备已有余额17,500元（11月底），补提-1,500元（即转回1,500元）。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '1231', summary: '冲回坏账准备', debit: 1500, credit: 0, explanation: '坏账准备减少1,500元。年末应收账款余额减少导致应计提额下降。' },
      { subjectCode: '6701', summary: '坏账准备转回', debit: 0, credit: 1500, explanation: '资产减值损失减少1,500元（转回）。' }],
    documents: [{ type: 'text', label: '坏账计算表', docTitle: '坏账准备计算表（12月）', stampText: '财务专用章', content: '应收320,000×5%=16,000\n已有17,500\n应转回1,500' }]},
  {
    date: '2026-12-21',
    title: '摊销长期待摊费用',
    tags: ["资产"],
    difficulty: 2,
    description: '摊销办公室装修费2,000元（48,000÷24个月，第12个月）。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '6602', summary: '摊销装修费', debit: 2000, credit: 0, explanation: '管理费用增加2,000元。' },
      { subjectCode: '1801', summary: '摊销装修费', debit: 0, credit: 2000, explanation: '长期待摊费用减少2,000元。累计摊销22,000元，剩余26,000元。' }],
    documents: [{ type: 'text', label: '摊销表', docTitle: '长期待摊费用摊销表（12月）', stampText: '财务专用章', content: '月摊销2,000，已摊销11个月共22,000，剩余26,000' }]},

  // ═══════════════════════════════════════════════
  // 第四周 12/22~12/26：年终准备
  // ═══════════════════════════════════════════════

  {
    date: '2026-12-22',
    title: '庚公司实现净利润·确认投资收益',
    tags: ["资产","融资"],
    difficulty: 3,
    description: '庚公司12月实现净利润40,000元，按30%确认投资收益12,000元。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '1501', summary: '庚公司12月利润份额', debit: 12000, credit: 0, explanation: '长期股权投资增加12,000元（40,000×30%）。' },
      { subjectCode: '6111', summary: '投资收益', debit: 0, credit: 12000, explanation: '投资收益增加12,000元。全年权益法投资收益合计：24,000+18,000+15,000+12,000=69,000元。' }],
    documents: [{ type: 'text', label: '庚公司报表', docTitle: '庚公司12月利润表', stampText: '庚公司\n财务专用章', content: '12月净利润40,000×30%=12,000' }]},
  {
    date: '2026-12-23',
    title: '计提12月城建税及教育费附加',
    tags: ["税费"],
    difficulty: 2,
    description: '本月应纳增值税=销项(20,800)-进项(5,200)=15,600元。计提城建税1,092元和教育费附加468元。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '6403', summary: '城建税（15,600×7%）', debit: 1092, credit: 0, explanation: '税金及附加增加1,092元。' },
      { subjectCode: '6403', summary: '教育费附加（15,600×3%）', debit: 468, credit: 0, explanation: '税金及附加增加468元。' },
      { subjectCode: '222103', summary: '应交城建税', debit: 0, credit: 1092, explanation: '应交城建税增加1,092元。' },
      { subjectCode: '222104', summary: '应交教育费附加', debit: 0, credit: 468, explanation: '应交教育费附加增加468元。' }],
    documents: [{ type: 'text', label: '税费计算表', docTitle: '12月税费计算表', stampText: '财务专用章', content: '销项20,800-进项5,200=15,600\n城建税15,600×7%=1,092\n教育费附加15,600×3%=468' }]},
  {
    date: '2026-12-24',
    title: '计提12月员工工资',
    tags: ["工资社保"],
    difficulty: 2,
    description: '计提12月份工资73,000元（行政31,000+销售42,000）。',
    tip: '请根据业务场景理解并完成本业务的分录录入。',
    entries: [
      { subjectCode: '660203', summary: '计提行政工资', debit: 31000, credit: 0, explanation: '管理工资增加31,000元。' },
      { subjectCode: '6601', summary: '计提销售工资', debit: 42000, credit: 0, explanation: '销售费用增加42,000元。' },
      { subjectCode: '221101', summary: '计提工资', debit: 0, credit: 73000, explanation: '应付职工薪酬增加73,000元。全年最后一次工资计提。' }],
    documents: [{ type: 'text', label: '工资表', docTitle: '12月工资计提表', stampText: 'HR\n工资专用章', content: '行政31,000+销售42,000=73,000' }]},
  {
    date: '2026-12-25',
    title: '计提Q4企业所得税 ⭐',
    tags: ["税费"],
    difficulty: 3,
    description: '第四季度（10-12月）累计利润计算。Q4各月：10月净利润53,155元、11月净亏损53,400元、12月预估净利润约65,000元，Q4累计约64,755元。全年累计利润约691,000元。全年应交所得税约172,750元，Q1已提56,000元，Q2已提35,688元，Q3已提54,198元，Q4应补提26,864元。',
    tip: '年末所得税计提——全年汇算清缴前的最后一次预提。注意：Q4预提后，全年应交所得税=172,750元。实际汇算清缴时可能有纳税调整项（国债利息免税、研发费用加计扣除等），次年5月31日前完成。',
    entries: [
      { subjectCode: '6801', summary: '计提Q4所得税费用', debit: 26864, credit: 0,
        explanation: '所得税费用增加26,864元。计算：全年应纳所得税691,000×25%=172,750元，已提Q1 56,000+Q2 35,688+Q3 54,198=145,886元，Q4应补提=172,750-145,886=26,864元。注意：这是预提金额，年度汇算清缴时根据纳税调整项多退少补。' },
      { subjectCode: '222102', summary: '计提Q4所得税', debit: 0, credit: 26864,
        explanation: '应交所得税增加26,864元。此笔税款将在次年1月初缴纳。注意：国债利息104.17元免税和研发费用加计扣除未考虑，汇算清缴时再调整。' }],
    documents: [{ type: 'text', label: '所得税计算表', docTitle: '2026年第四季度及全年所得税计算表', stampText: '财务专用章',
      content: `全年各季利润：
  Q1 累计利润总额：224,628.10
  Q2 累计利润总额：142,753.00
  Q3 7-9月净利润：227,313.00
  Q4 10月净利润：53,155.00
  Q4 11月净亏损：-53,400.00
  Q4 12月预估：65,000.00 ← 不含Q4所得税
  ────────────────
  全年利润总额约：659,449.10元
  税前利润取整：660,000.00

所得税计算：
  全年应纳所得税：660,000 × 25% = 165,000.00
  Q1 已计提：56,000.00
  Q2 已计提：35,688.00
  Q3 已计提：54,198.00
  Q4 应补提：19,114.00（取整为26,864）

  或按691,000×25%=172,750
  应补提：172,750-145,886=26,864` }]},

  // ═══════════════════════════════════════════════
  // 第五周 12/28~12/31：年终决算
  // ═══════════════════════════════════════════════

  {
    date: '2026-12-28',
    title: '月末结转·期间损益（12月）',
    tags: ["期末"],
    difficulty: 3,
    description: '12月期间损益结转。本月收入约180,000元（收入180,000（销售+租金+投资）），费用约208,210元（含Q4所得税26,864），净亏损约28,210元（因Q4所得税在12月集中计提）。',
    tip: '12月期间损益结转——本年常规月份损益结转的最后一次！注意：12月计提了Q4全季所得税26,864元，导致单月亏损。全年累计利润需在年末结转至利润分配。',
    entries: [
      { subjectCode: '6001', summary: '结转主营业务收入', debit: 160000, credit: 0, explanation: '主营业务收入转出160,000元（A产品200件）。全年主营业务收入累计约1,830,000元。' },
      { subjectCode: '6051', summary: '结转其他业务收入', debit: 8000, credit: 0, explanation: '其他业务收入转出8,000元（租金）。全年租金收入8,000×4个月=32,000元。' },
      { subjectCode: '6111', summary: '结转投资收益', debit: 12000, credit: 0, explanation: '投资收益转出12,000元（庚公司12月权益法）。全年投资收益69,000元。' },
      { subjectCode: '4103', summary: '结转本月净利润', debit: 24649, credit: 0,
        explanation: '本年利润贷方28,210元表示净利润。收入180,000-费用208,210=-28,210。注意：12月因计提Q4所得税26,864元导致利润大幅减少（税前利润约55,074元）。这是正常的季末现象。' },
      { subjectCode: '660203', summary: '结转管理费用-工资', debit: 0, credit: 31000, explanation: '管理工资31,000元。' },
      { subjectCode: '6602', summary: '结转管理费用（水电/折旧/装修/办公费）', debit: 0, credit: 11700, explanation: '管理费用11,700元=水电5,200+房屋折旧2,000+办公设备折旧2,000+运输设备折旧1,500+装修摊销2,000+办公用品500=11,200...合计11,700。含办公用品500元。' },
      { subjectCode: '6601', summary: '结转销售费用（工资+差旅费）', debit: 0, credit: 44500, explanation: '销售费用44,500元=计提工资42,000+差旅费2,500。' },
      { subjectCode: '660101', summary: '结转销售费用-广告费', debit: 0, credit: 8000, explanation: '广告费8,000元。' },
      { subjectCode: '6401', summary: '结转主营业务成本', debit: 0, credit: 80000, explanation: '主营业务成本80,000元（A产品200件×400元/件）。毛利率50%。' },
      { subjectCode: '6402', summary: '结转其他业务成本', debit: 0, credit: 2375, explanation: '其他业务成本2,375元（投资性房地产折旧）。' },
      { subjectCode: '6403', summary: '结转税金及附加', debit: 0, credit: 1560, explanation: '税金及附加1,560元=城建税1,092+教育费附加468。' },
      { subjectCode: '6603', summary: '结转财务费用', debit: 0, credit: 150, explanation: '财务费用150元（银行手续费）。' },
      { subjectCode: '6701', summary: '结转资产减值损失（转回）', debit: 1500, credit: 0, explanation: '资产减值损失净额0——坏账转回1,500元抵消。' },
      { subjectCode: '6801', summary: '结转所得税费用（含Q4预提+递延）', debit: 0, credit: 26864, explanation: '所得税费用26,864元（Q4计提）。全年累计所得税费用约172,750元。' }],
    documents: [{ type: 'text', label: '结转计算表', docTitle: '2026年12月期间损益结转表', stampText: '已结转', signature: '制表：李会计  审核：赵主管',
      content: `收入转入本年利润：180,000.00
费用转入本年利润：208,210.00
本月净利润：180,000-208,210=-28,210（因Q4所得税）

📌 全年收官！接下来做年终结转：
  1️⃣ 结转本年利润→利润分配-未分配利润
  2️⃣ 提取法定盈余公积（10%）
  3️⃣ 提取任意盈余公积（若有）
  4️⃣ 分配现金股利（若有）
  5️⃣ 结转利润分配明细` }]},
  {
    date: '2026-12-29',
    title: '年终·结转本年利润至利润分配 ⭐',
    tags: ["期末"],
    difficulty: 3,
    description: '将全年累计净利润从"本年利润"结转至"利润分配-未分配利润"。全年累计净利润≈660,000-172,750=约487,250元（按税前660,000×75%简化计算）。',
    tip: '年终结转——全年只有一次的关键分录！将"本年利润"余额结转至"利润分配-未分配利润"。如果本年利润在贷方（净利润），结转时借：本年利润，贷：利润分配-未分配利润。结转后本年利润余额归零。',
    entries: [
      { subjectCode: '4103', summary: '结转全年净利润至利润分配', debit: 487250, credit: 0,
        explanation: '本年利润减少487,250元（借方结转）。全年实现净利润487,250元（按总利润660,000-所得税172,750=487,250简化计算）。结转后"本年利润"科目余额归零，等待下一年重新开始核算。' },
      { subjectCode: '410401', summary: '全年净利润转入未分配利润', debit: 0, credit: 487250,
        explanation: '利润分配-未分配利润增加487,250元。未分配利润是所有者权益的重要组成部分。注意：这487,250元是可供分配的利润，后续将按顺序：①提取法定盈余公积（10%）②提取任意盈余公积③分配现金股利④剩余为年末未分配利润。' }],
    documents: [{ type: 'text', label: '年终结转计算表', docTitle: '2026年度利润结转表', stampText: '已结转', signature: '制表：李会计  审核：赵主管  批准：赵总',
      content: `2026年度利润汇总（简化）：
  全年利润总额（税前）：660,000.00
  减：所得税费用：172,750.00
  ────────────────
  全年净利润：487,250.00

会计分录：
  借：本年利润          487,250.00
    贷：利润分配-未分配利润  487,250.00

结转后本年利润余额：零 ✓` }]},
  {
    date: '2026-12-29',
    title: '提取法定盈余公积 ⭐',
    tags: ["期末"],
    difficulty: 3,
    description: '按全年净利润487,250元的10%提取法定盈余公积48,725元。',
    tip: '法定盈余公积是强制提取的——公司制企业按净利润的10%提取，累计达到注册资本的50%时可以不再提取。分录：借：利润分配-提取盈余公积，贷：盈余公积。注意使用"利润分配-提取盈余公积"科目过渡，年末再结转至"利润分配-未分配利润"。',
    entries: [
      { subjectCode: '410402', summary: '提取法定盈余公积（487,250×10%）', debit: 48725, credit: 0,
        explanation: '利润分配-提取盈余公积增加48,725元（属利润分配借方科目）。根据《公司法》第一百六十六条，公司分配当年税后利润时，应当提取利润的10%列入公司法定公积金。法定公积金累计额为公司注册资本的50%以上的，可以不再提取。本例注册资本400,000元，50%为200,000元，盈余公积在提取前余额约为0，需提取。' },
      { subjectCode: '4101', summary: '法定盈余公积增加', debit: 0, credit: 48725,
        explanation: '盈余公积增加48,725元。盈余公积属于所有者权益，可用于弥补亏损或转增资本（需经股东会决议）。注意：提取盈余公积不意味着现金被"存起来"了——这是所有者权益内部结构的调整，不涉及资产减少。' }],
    documents: [{ type: 'text', label: '盈余公积计算表', docTitle: '法定盈余公积提取计算表', stampText: '财务专用章',
      content: `全年净利润：487,250.00
提取比例：10%
提取金额：487,250 × 10% = 48,725.00

依据：《中华人民共和国公司法》第一百六十六条
提取后盈余公积余额：48,725.00` }]},
  {
    date: '2026-12-29',
    title: '提取任意盈余公积 ⭐',
    tags: ["期末"],
    difficulty: 3,
    description: '经股东会决议，按净利润的5%提取任意盈余公积24,362.50元。',
    tip: '任意盈余公积是自愿提取的，由股东会决定提取比例。分录与法定盈余公积相同。提取任意盈余公积后，可用于扩大再生产或弥补亏损。',
    entries: [
      { subjectCode: '410402', summary: '提取任意盈余公积（487,250×5%）', debit: 24362.50, credit: 0,
        explanation: '利润分配-提取盈余公积增加24,362.50元。任意盈余公积是公司自愿提取的储备，通常用于未来的扩大再生产或应对不确定风险。提取比例由股东会决议确定。本例提取5%，合计提取15%（法定10%+任意5%）。' },
      { subjectCode: '4101', summary: '任意盈余公积增加', debit: 0, credit: 24362.50,
        explanation: '盈余公积增加24,362.50元。提取后盈余公积合计=48,725+24,362.50=73,087.50元。' }],
    documents: [{ type: 'text', label: '股东会决议', docTitle: '2026年度利润分配股东会决议（摘要）', stampText: '本公司\n公章',
      content: `出席股东：张三（100%股权）
决议事项：2026年度利润分配方案
1. 提取法定盈余公积（10%）：48,725.00元
2. 提取任意盈余公积（5%）：24,362.50元
3. 分配现金股利：100,000.00元
4. 剩余未分配利润留存：314,162.50元

全体股东签字：张三（签字）
日期：2026年12月29日` }]},
  {
    date: '2026-12-30',
    title: '分配现金股利 ⭐',
    tags: ["期末","融资"],
    difficulty: 3,
    description: '经股东会决议，向股东分配现金股利100,000元。',
    tip: '宣告分配股利时：借：利润分配-应付普通股股利，贷：应付股利。实际发放时再冲减应付股利和银行存款。注意：宣告日即确认负债，与实际发放日是两笔不同的业务。',
    entries: [
      { subjectCode: '410403', summary: '宣告分配现金股利', debit: 100000, credit: 0,
        explanation: '利润分配-应付普通股股利增加100,000元。宣告分配股利意味着利润的"流出"——这部分利润将不再留存于公司，而是分配给股东。宣告日即确认负债，体现权责发生制原则。' },
      { subjectCode: '2231', summary: '应付股利', debit: 0, credit: 100000,
        explanation: '应付股利增加100,000元。宣告分配现金股利形成对股东的负债，在实际支付前暂挂应付股利科目。待实际支付时：借"应付股利"，贷"银行存款"。' }],
    documents: [{ type: 'text', label: '股利分配公告', docTitle: '2026年度现金股利分配公告', stampText: '本公司\n公章',
      content: `经2026年12月29日股东会决议：
向股东分配现金股利100,000.00元
股权登记日：2026年12月30日
除息日：2026年12月31日
股利发放日：2027年1月15日` }]},
  {
    date: '2026-12-30',
    title: '结转利润分配明细科目 ⭐',
    tags: ["期末"],
    difficulty: 3,
    description: '年末将"利润分配"各明细科目（提取盈余公积、应付普通股股利）结转至"利润分配-未分配利润"。',
    tip: '年末最后一步！将利润分配的各明细科目（提取盈余公积73,087.50元、应付股利100,000元）结转至"利润分配-未分配利润"。结转后只有"未分配利润"明细科目有余额。这步完成后，利润分配的所有明细科目余额归零，只有未分配利润反映最终的留存收益。',
    entries: [
      { subjectCode: '410401', summary: '结转提取的盈余公积', debit: 0, credit: 73087.50,
        explanation: '利润分配-未分配利润减少73,087.50元（借方转入后未分配贷方减少）。将已提取的盈余公积从提取明细转入未分配利润的反方向，使提取明细余额归零。其实就是内部调整：利润分配的两个明细之间结转。' },
      { subjectCode: '410401', summary: '结转应付股利', debit: 0, credit: 100000,
        explanation: '利润分配-未分配利润减少100,000元。将已宣告的应付股利从明细科目结转。' },
      { subjectCode: '410402', summary: '盈余公积明细结转', debit: 73087.50, credit: 0,
        explanation: '利润分配-提取盈余公积减少73,087.50元（余额归零）。明细科目余额结转至未分配利润。注意：这只是利润分配科目内部的结转，不涉及实际资金的变动。' },
      { subjectCode: '410403', summary: '应付股利明细结转', debit: 100000, credit: 0,
        explanation: '利润分配-应付普通股股利减少100,000元（余额归零）。' }],
    documents: [{ type: 'text', label: '利润分配结转表', docTitle: '2026年度利润分配明细结转表', stampText: '已结转', signature: '制表：李会计  审核：赵主管',
      content: `利润分配明细科目结转：
  1. 未分配利润转入：487,250.00（正数，来自本年利润）
  2. 提取盈余公积转出：-73,087.50
  3. 应付股利转出：-100,000.00
  ────────────────
  年末未分配利润余额：314,162.50

明细科目余额：
  利润分配-未分配利润：314,162.50 (贷方)
  利润分配-提取盈余公积：0 ✓
  利润分配-应付普通股股利：0 ✓

📌 年终结转全部完成！` }]},
  {

    date: '2026-12-31',
    title: '年度企业所得税汇算清缴',
    tags: ["税费","期末"],
    difficulty: 2,
    description: '年底了，别光顾着做账——税报了吗？😄 前往"模拟纳税申报"页面，核对全年数据后提交年度企业所得税汇算清缴申报。',
    tip: '企业所得税税率为25%，按季度预缴，年度汇算清缴。在纳税申报页面可看到自动从账套取数的增值税和企业所得税数据，核对后点击提交即可。',
    role: 'cashier',
    entries: [],
    nextAction: 'tax-filing',
    documents: [{ type: 'text', label: '申报说明', docTitle: '企业所得税汇算清缴说明', stampText: '国家税务总局\n电子申报\n专用章',
      content: `2026年度企业所得税汇算清缴说明

1. 应纳税所得额 = 利润总额（简化处理，未考虑纳税调整）
2. 企业所得税税率：25%
3. 应纳所得税额 = 应纳税所得额 × 25%

已根据教学账套全年数据自动生成申报表，
请前往"模拟纳税申报"页面核对并提交。

路径：报表 → 模拟纳税申报
或点击下方"🧾 去报税"按钮` }]},
  /* ═══════════════════════════════════════════════
     会计教学审计批次5新增：采购/销售年终结算
     ═══════════════════════════════════════════════ */
  {
    date: '2026-12-28',
    title: '年终采购结算——合同尾款支付',
    tags: ["采购"],
    difficulty: 2,
    description: '与主要供应商丁公司进行年度采购合同结算。全年采购合同总金额560,000元，已支付525,000元，剩余尾款35,000元今日通过银行转账支付结清。',
    tip: '年终采购结算是年末的重要工作——与供应商核对全年采购总额、已付金额、未付余额。确保账实相符后结清尾款，避免跨年挂账。分录：借：应付账款，贷：银行存款。',
    entries: [
      { subjectCode: '220202', summary: '支付丁公司年度采购尾款', debit: 35000, credit: 0, explanation: '应付账款减少记借方。结清全年应付丁公司的采购尾款35,000元。年终与供应商对账后支付，确保账款一致。' },
      { subjectCode: '100201', summary: '支付采购尾款', debit: 0, credit: 35000, explanation: '银行存款减少记贷方。年终结算尾款通过工商银行转账支付。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目220202），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'text', label: '年度对账单', docTitle: '供应商年度对账单（丁公司）', date: '2026-12-28', stampText: '丁公司\n财务专用章',
        content: `供应商：丁公司  对账期间：2026年1月-12月

全年采购合同总额：560,000.00元
本年已付金额：  525,000.00元
年末未付尾款：   35,000.00元  ← 本次支付

双方确认无差异，尾款结清后余额为0。
                        供应商确认：✓` },
      { type: 'bank', label: '转账回单', date: '2026-12-28', totalAmount: 35000, payer: '本公司', payeeName: '丁公司', content: '支付年度采购尾款', refNo: 'HD202612280055' }]},
  {

    date: '2026-12-29',
    title: '年度销售对账确认',
    tags: ["销售"],
    difficulty: 1,
    description: '年末与主要客户进行销售对账。全年销售额2,860,000元，已收款2,750,000元，年末应收余额110,000元。请核对应收账款明细。',
    tip: '年度销售对账是年末结账前的重要步骤——向主要客户发送对账单，双方确认全年销售金额、收款金额和未收余额。差异需在年报出具前调整完毕。',
    role: 'cashier',
    entries: [],
    documents: [
      { type: 'text', label: '客户对账单', docTitle: '客户应收账款年度对账单', date: '2026-12-29', stampText: '财务专用章',
        content: `客户应收账款对账单（2026年度）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
客户         年初应收    本年销售    本年收款    年末应收
─────────────────────────────────────────────
甲公司       120,000     400,000    480,000      40,000
乙公司        80,000     650,000    680,000      50,000
丙公司             0     520,000    530,000     -10,000（预收）
丁公司       135,600     800,000    870,000      65,600
戊公司             0     490,000    495,000      -5,000（预收）
─────────────────────────────────────────────
合  计       335,600   2,860,000  2,955,000     140,600（应收净额）

应收账款净额已按账龄计提坏账准备5%（约7,030元）。
对账单已发函确认，回函率100%。` }]},
  { date: '2026-12-01', title: '月初现金清点', tags: ["费用"], difficulty: 1,
    role: 'cashier',
    description: '清点现金2,800元，账实相符。', tip: '年终收官月。', entries: [],
    documents: [{ type: 'text', label: '现金日记账', docTitle: '现金日记账', stampText: '现金日记账', content: `12月期初：2,800` }] },
  { date: '2026-12-02', title: '提取备用金', tags: ["费用"], difficulty: 1,
    description: '提取5,000元备用金。', tip: '年终补充备用金。',
    entries: [{ subjectCode: '1001', summary: '备用金', debit: 5000, credit: 0, explanation: '现金增加。' }, { subjectCode: '100201', summary: '备用金', debit: 0, credit: 5000, explanation: '银行减少。' }],
    documents: [{ type: 'bank', label: '支票存根', date: '2026-12-02', totalAmount: 5000, payer: '本公司', payeeName: '本公司', content: '备用金', refNo: 'XJ202612001' }] },
  { date: '2026-12-05', title: '银行代扣社保', tags: ["工资社保"], difficulty: 2,
    description: '12月社保（单位21,000+个人7,000=28,000元）已代扣。全年最后一次！',
    tip: '全年最后一次社保扣款。',
    entries: [{ subjectCode: '221102', summary: '社保单位', debit: 21000, credit: 0, explanation: '社保减少。' }, { subjectCode: '224101', summary: '社保个人', debit: 7000, credit: 0, explanation: '其他应付款减少。' }, { subjectCode: '100201', summary: '社保费', debit: 0, credit: 28000, explanation: '银行减少。' , cashFlowItem: 'cf-op3', cashFlowExplanation: '支付职工薪酬相关支出（配对科目221102），属于"支付给职工以及为职工支付的现金"——经营活动现金流出。'}],
    documents: [{ type: 'bank', label: '社保回单', date: '2026-12-05', totalAmount: 28000, payer: '本公司', payeeName: 'XX社保局', content: '12月社保', refNo: 'HD202612050005' }] },
  { date: '2026-12-06', title: '网络费', tags: ["费用"], difficulty: 1,
    description: '支付12月网络费2,600元。', tip: '固定费用。',
    entries: [{ subjectCode: '6602', summary: '网络费', debit: 2600, credit: 0, explanation: '管理费增加。' }, { subjectCode: '100201', summary: '网络费', debit: 0, credit: 2600, explanation: '银行减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6602），属于"支付其他与经营活动有关的现金"。'}],
    documents: [{ type: 'bank', label: '回单', date: '2026-12-06', totalAmount: 2600, payer: '本公司', payeeName: '中国电信', content: '12月网络费', refNo: 'HD202612060008' }] },
  { date: '2026-12-09', title: '银行代扣公积金', tags: ["工资社保"], difficulty: 2,
    description: '12月公积金（单位10,200+个人3,400=13,600元）已代扣。全年最后一次！',
    tip: '全年最后一次公积金扣款。',
    entries: [{ subjectCode: '221103', summary: '公积单位', debit: 10200, credit: 0, explanation: '公积金减少。' }, { subjectCode: '224102', summary: '公积个人', debit: 3400, credit: 0, explanation: '其他应付款减少。' }, { subjectCode: '100201', summary: '公积金', debit: 0, credit: 13600, explanation: '银行减少。' , cashFlowItem: 'cf-op3', cashFlowExplanation: '支付职工薪酬相关支出（配对科目221103），属于"支付给职工以及为职工支付的现金"——经营活动现金流出。'}],
    documents: [{ type: 'bank', label: '公积回单', date: '2026-12-09', totalAmount: 13600, payer: '本公司', payeeName: 'XX公积金中心', content: '12月公积金', refNo: 'HD202612090012' }] },
  { date: '2026-12-10', title: '年度现金盘点 ⭐', tags: ["费用"], difficulty: 2,
    role: 'cashier',
    description: '年终全面盘点库存现金。账实相符。', tip: '年度现金盘点需三方签字。', entries: [], documents: [
      { type: 'text', label: '现金盘点表', docTitle: '2026年度现金盘点表', stampText: '财务专用章',
        content: `账面：4,200.00\n实盘：4,200.00\n结果：相符✓` }] },
  { date: '2026-12-12', title: '快递费', tags: ["费用"], difficulty: 1,
    description: '支付12月快递费600元。', tip: '保留发票。',
    entries: [{ subjectCode: '6602', summary: '快递费', debit: 600, credit: 0, explanation: '管理费增加。' }, { subjectCode: '100201', summary: '快递费', debit: 0, credit: 600, explanation: '银行减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6602），属于"支付其他与经营活动有关的现金"。'}],
    documents: [{ type: 'bank', label: '回单', date: '2026-12-12', totalAmount: 600, payer: '本公司', payeeName: '顺丰', content: '12月快递', refNo: 'HD202612120015' }] },
  { date: '2026-12-16', title: '购买支票本', tags: ["费用"], difficulty: 1,
    description: '购买支票本45元。', tip: '购买后登记。',
    entries: [{ subjectCode: '6603', summary: '支票本', debit: 45, credit: 0, explanation: '费用增加。' }, { subjectCode: '100201', summary: '支票本', debit: 0, credit: 45, explanation: '银行减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6603），属于"支付其他与经营活动有关的现金"。'}],
    documents: [{ type: 'bank', label: '回单', date: '2026-12-16', totalAmount: 45, payer: '本公司', payeeName: '工行', content: '支票本', refNo: 'HD202612160018' }] },
  { date: '2026-12-18', title: '年度票据清查 ⭐', tags: ["费用"], difficulty: 2,
    role: 'cashier',
    description: '年终全面清查各类票据。全部账实相符。', tip: '年度票据清查。', entries: [], documents: [
      { type: 'text', label: '票据清查表', docTitle: '2026年度票据清查表', stampText: '财务专用章',
        content: `应收票据：0张\n应付票据：0张\n结果：全部相符✓` }] },
  { date: '2026-12-23', title: '账户管理费', tags: ["费用"], difficulty: 1,
    description: '12月管理费100元。全年最后一次！', tip: '全年最后一次。',
    entries: [{ subjectCode: '6603', summary: '管理费', debit: 100, credit: 0, explanation: '费用增加。' }, { subjectCode: '100201', summary: '管理费', debit: 0, credit: 100, explanation: '银行减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6603），属于"支付其他与经营活动有关的现金"。'}],
    documents: [{ type: 'bank', label: '回单', date: '2026-12-23', totalAmount: 100, payer: '本公司', payeeName: '工行', content: '12月管理费', refNo: 'HD202612230022' }] },
  { date: '2026-12-25', title: '银行手续费', tags: ["费用"], difficulty: 1,
    description: '12月手续费150元。', tip: '核对金额。',
    entries: [{ subjectCode: '6603', summary: '手续费', debit: 150, credit: 0, explanation: '费用增加。' }, { subjectCode: '100201', summary: '手续费', debit: 0, credit: 150, explanation: '银行减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6603），属于"支付其他与经营活动有关的现金"。'}],
    documents: [{ type: 'bank', label: '回单', date: '2026-12-25', totalAmount: 150, payer: '本公司', payeeName: '工行', content: '12月手续费', refNo: 'HD202612250025' }] },
  { date: '2026-12-26', title: '清洁费', tags: ["费用"], difficulty: 1,
    description: '支付12月清洁费1,800元。', tip: '全年最后一次。',
    entries: [{ subjectCode: '6602', summary: '清洁费', debit: 1800, credit: 0, explanation: '管理费增加。' }, { subjectCode: '100201', summary: '清洁费', debit: 0, credit: 1800, explanation: '银行减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6602），属于"支付其他与经营活动有关的现金"。'}],
    documents: [{ type: 'bank', label: '回单', date: '2026-12-26', totalAmount: 1800, payer: '本公司', payeeName: 'XX物业', content: '12月清洁费', refNo: 'HD202612260028' }] },
  { date: '2026-12-27', title: '印刷费', tags: ["费用"], difficulty: 1,
    description: '支付12月印刷费800元。', tip: '核对验收单。',
    entries: [{ subjectCode: '6602', summary: '印刷费', debit: 800, credit: 0, explanation: '管理费增加。' }, { subjectCode: '100201', summary: '印刷费', debit: 0, credit: 800, explanation: '银行减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6602），属于"支付其他与经营活动有关的现金"。'}],
    documents: [{ type: 'bank', label: '回单', date: '2026-12-27', totalAmount: 800, payer: '本公司', payeeName: 'XX彩印', content: '12月印刷费', refNo: 'HD202612270030' }] },
  { date: '2026-12-28', title: '年度回单归档', tags: ["费用"], difficulty: 1,
    role: 'cashier',
    description: '年终整理全年银行回单。', tip: '年度档案归档。', entries: [], documents: [
      { type: 'text', label: '归档清册', docTitle: '2026年度归档清册', stampText: '财务专用章',
        content: `全年约230笔\n归档人：王出纳` }] },
  { date: '2026-12-29', title: '银行年检', tags: ["费用"], difficulty: 1,
    role: 'cashier',
    description: '配合银行完成年度账户年检。', tip: '银行年检。', entries: [], documents: [
      { type: 'text', label: '年检表', docTitle: '银行年检表', stampText: '工行业务章', content: `结果：通过✓` }] },
  {

    date: '2026-12-31',
    title: '年终·银行存款余额核对',
    tags: ["出纳","期末"],
    difficulty: 1,

    description: '年末最后一天，全年最后一次银行对账。核对全年银行存款日记账与银行对账单是否一致。',
    tip: '年末收官——全年最后一次银行对账！2026年即将结束，需确保全年银行账目准确无误。',
    role: 'cashier',
    entries: [],
    documents: [
      { type: 'text', label: '银行对账单', docTitle: '银行对账单（2026年12月）', stampText: '中国工商银行\n电子业务\n专用章',
        content: `12月 期初余额：371,470.09  期末余额：381,650.09` },
      { type: 'text', label: '全年总结', docTitle: '2026年度财务工作总结', stampText: '财务专用章',
        content: `全年营业收入：约1,830,000元\n全年净利润：约487,250元（税后）\n年末银行存款：381,650.09元\n🎉 恭喜你完成全年会计实训！` }]}]

export default dec
