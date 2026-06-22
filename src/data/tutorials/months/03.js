/**
 * 3月份业务教程数据（31个会计任务）
 *
 * 难度：★★★☆☆（Q1季末，引入坏账准备、约当产量法、Q1所得税等新概念）
 * 新增业务：坏账准备、现金盘点、低值易耗品、公益性捐赠、约当产量法、Q1所得税
 * 行业背景：Q1季末，企业进入稳定运营期，处理制造费用归集分配、产品成本核算、季末所得税
 */

const mar = [
  // ═══════════════ 第1周：结算2月+季初常规（8个）═══════════════
  { date: '2026-03-02', role: 'accountant', title: '缴纳2月增值税及附加税', tags: ["税费"], difficulty: 2,
    description: '缴纳2月应纳增值税15,600元、城建税1,092元、教育费附加468元，合计17,160元。',
    tip: '每月15日前完成上月增值税及附加税的申报缴纳。',
    entries: [
      { subjectCode: '222101', summary: '缴纳2月增值税', debit: 15600, credit: 0, explanation: '应交增值税减少。缴纳2月销项税额15,600元。' },
      { subjectCode: '222103', summary: '缴纳城建税', debit: 1092, credit: 0, explanation: '应交城建税减少。' },
      { subjectCode: '222104', summary: '缴纳教育费附加', debit: 468, credit: 0, explanation: '应交教育费附加减少。' },
      { subjectCode: '100201', summary: '缴纳税费', debit: 0, credit: 17160, explanation: '银行存款减少。' }]},
  { date: '2026-03-03', role: 'accountant', title: '发放2月员工工资', tags: ["工资"], difficulty: 2,
    description: '通过银行代发2月份计提的工资。应发合计90,000元，代扣社保9,000元、公积金4,500元，实发76,500元。',
    tip: '工资发放与上月相同模式：冲减应付职工薪酬，代扣款计入其他应付款。',
    entries: [
      { subjectCode: '221101', summary: '发放2月工资', debit: 90000, credit: 0, explanation: '应付职工薪酬-工资减少。全额冲减2月计提负债。' },
      { subjectCode: '100201', summary: '实发工资', debit: 0, credit: 76500, explanation: '银行存款减少。实发=90,000-9,000-4,500=76,500元。' },
      { subjectCode: '224101', summary: '代扣社保个人部分', debit: 0, credit: 9000, explanation: '其他应付款-社保增加。' },
      { subjectCode: '224102', summary: '代扣公积金个人部分', debit: 0, credit: 4500, explanation: '其他应付款-公积金增加。' }]},
  { date: '2026-03-04', role: 'accountant', title: '采购原材料（含税）', tags: ["采购"], difficulty: 2,
    description: '从丙公司采购A型钢材8吨，单价15,000元，合计120,000元。增值税15,600元（13%），价税合计135,600元，款项未付。',
    tip: '一般纳税人采购原材料，价款和税款分开核算：价款入原材料成本，税款入应交税费-进项税额。',
    entries: [
      { subjectCode: '1403', summary: '采购A型钢材', debit: 120000, credit: 0, explanation: '原材料增加。8吨×15,000=120,000元，不含税金额计入存货成本。' },
      { subjectCode: '222101', summary: '进项税额（13%）', debit: 15600, credit: 0, explanation: '应交增值税-进项税额增加。一般纳税人取得的专票，进项税可抵扣销项税。' },
      { subjectCode: '220201', summary: '采购A型钢材-丙公司', debit: 0, credit: 135600, explanation: '应付账款增加。价税合计135,600元未付，含价款120,000和增值税15,600。' }]},
  { date: '2026-03-05', role: 'accountant', title: '支付丙公司货款', tags: ["采购","资金"], difficulty: 1,
    description: '以银行存款支付前期欠丙公司的货款75,000元。',
    tip: '支付前期应付账款。',
    entries: [
      { subjectCode: '220201', summary: '支付丙公司货款', debit: 75000, credit: 0, explanation: '应付账款减少。支付2月采购款。' },
      { subjectCode: '100201', summary: '支付丙公司货款', debit: 0, credit: 75000, explanation: '银行存款减少。' }]},
  { date: '2026-03-06', role: 'accountant', title: '支付办公室房租', tags: ["费用"], difficulty: 1,
    description: '支付3月份办公室租金8,000元。',
    tip: '房租按月支付，直接计入管理费用。',
    entries: [
      { subjectCode: '6602', summary: '支付3月房租', debit: 8000, credit: 0, explanation: '管理费用增加。' },
      { subjectCode: '100201', summary: '支付3月房租', debit: 0, credit: 8000, explanation: '银行存款减少。' }]},
  { date: '2026-03-07', role: 'accountant', title: '提取备用金', tags: ["资金"], difficulty: 1,
    description: '从工商银行提取现金5,000元补充库存现金。',
    tip: '提取备用金。',
    entries: [
      { subjectCode: '1001', summary: '提取备用金', debit: 5000, credit: 0, explanation: '库存现金增加。' },
      { subjectCode: '100201', summary: '提取备用金', debit: 0, credit: 5000, explanation: '银行存款减少。' }]},
  { date: '2026-03-08', role: 'accountant', title: '购买办公用品', tags: ["费用"], difficulty: 1,
    description: '购买办公用品一批，以银行存款支付800元。',
    tip: '办公用品计入管理费用-办公费。',
    entries: [
      { subjectCode: '660201', summary: '购买办公用品', debit: 800, credit: 0, explanation: '管理费用-办公费增加。' },
      { subjectCode: '100201', summary: '购买办公用品', debit: 0, credit: 800, explanation: '银行存款减少。' }]},

  // ═══════════════ 第2周：生产+销售（8个）═══════════════
  { date: '2026-03-09', role: 'accountant', title: '生产领料-直接材料', tags: ["生产"], difficulty: 2,
    description: '车间为生产A产品领用A型钢材5吨，单价15,000元，合计75,000元。',
    tip: '生产领料：借：生产成本-直接材料，贷：原材料。',
    entries: [
      { subjectCode: '500101', summary: '生产领用A型钢材', debit: 75000, credit: 0, explanation: '生产成本-直接材料增加。5吨×15,000=75,000元。' },
      { subjectCode: '1403', summary: '生产领用A型钢材', debit: 0, credit: 75000, explanation: '原材料减少。' }]},
  { date: '2026-03-10', role: 'accountant', title: '直接人工归集', tags: ["生产"], difficulty: 2,
    description: '本月生产车间直接工人工资35,000元，当月计提次月发放。',
    tip: '直接人工计入生产成本-直接人工。',
    entries: [
      { subjectCode: '500102', summary: '归集生产工人工资', debit: 35000, credit: 0, explanation: '生产成本-直接人工增加。' },
      { subjectCode: '221101', summary: '归集生产工人工资', debit: 0, credit: 35000, explanation: '应付职工薪酬-工资增加。计提形成负债。' }]},
  { date: '2026-03-11', role: 'accountant', title: '销售商品（款已收）', tags: ["销售"], difficulty: 2,
    description: '向乙公司销售A产品80台，单价2,000元，价款160,000元，增值税20,800元（13%），合计180,800元已存入银行。',
    tip: '现销分录：借：银行存款，贷：主营业务收入、应交税费。',
    entries: [
      { subjectCode: '100201', summary: '销售A产品80台', debit: 180800, credit: 0, explanation: '银行存款增加。价税合计180,800元。' },
      { subjectCode: '6001', summary: '销售A产品80台', debit: 0, credit: 160000, explanation: '主营业务收入增加。不含税价款160,000元。' },
      { subjectCode: '222101', summary: '销项税额（13%）', debit: 0, credit: 20800, explanation: '应交增值税增加。160,000×13%=20,800元。' }]},
  { date: '2026-03-12', role: 'accountant', title: '赊销商品给丁公司', tags: ["销售"], difficulty: 2,
    description: '向丁公司赊销A产品40台，单价2,000元，价款80,000元，增值税10,400元（13%），合计90,400元，款未收。',
    tip: '赊销：借：应收账款，贷：主营业务收入、应交税费。',
    entries: [
      { subjectCode: '112202', summary: '赊销A产品40台-丁公司', debit: 90400, credit: 0, explanation: '应收账款增加。丁公司未付款。' },
      { subjectCode: '6001', summary: '赊销A产品40台', debit: 0, credit: 80000, explanation: '主营业务收入增加。' },
      { subjectCode: '222101', summary: '销项税额（13%）', debit: 0, credit: 10400, explanation: '应交增值税增加。80,000×13%=10,400元。' }]},
  { date: '2026-03-13', role: 'accountant', title: '差旅费报销', tags: ["费用"], difficulty: 1,
    description: '员工出差归来报销差旅费2,000元，以银行存款支付。',
    tip: '差旅费计入管理费用-差旅费。',
    entries: [
      { subjectCode: '660202', summary: '报销差旅费', debit: 2000, credit: 0, explanation: '管理费用-差旅费增加。' },
      { subjectCode: '100201', summary: '报销差旅费', debit: 0, credit: 2000, explanation: '银行存款减少。' }]},
  { date: '2026-03-14', role: 'accountant', title: '生产领料-辅助材料', tags: ["生产"], difficulty: 2,
    description: '车间领用B型材料2批作为机物料消耗，每批2,000元，合计4,000元。',
    tip: '辅助材料计入制造费用。',
    entries: [
      { subjectCode: '5101', summary: '领用辅助材料', debit: 4000, credit: 0, explanation: '制造费用增加。机物料消耗。' },
      { subjectCode: '1403', summary: '领用辅助材料', debit: 0, credit: 4000, explanation: '原材料减少。' }]},
  { date: '2026-03-15', role: 'accountant', title: '支付水电费', tags: ["费用"], difficulty: 1,
    description: '支付3月电费3,000元、水费1,000元，合计4,000元。',
    tip: '水电费计入管理费用。',
    entries: [
      { subjectCode: '6602', summary: '支付水电费', debit: 4000, credit: 0, explanation: '管理费用增加。' },
      { subjectCode: '100201', summary: '支付水电费', debit: 0, credit: 4000, explanation: '银行存款减少。' }]},

  // ═══════════════ 第3周：制造费用+特色业务（8个）═══════════════
  { date: '2026-03-16', role: 'accountant', title: '制造费用归集', tags: ["生产"], difficulty: 2,
    description: '本月归集制造费用：折旧2,000元、水电3,000元、辅助材料4,000元，合计9,000元。',
    tip: '制造费用归集车间各项间接成本。',
    entries: [
      { subjectCode: '5101', summary: '归集车间折旧费', debit: 2000, credit: 0, explanation: '制造费用增加。' },
      { subjectCode: '5101', summary: '归集车间水电费', debit: 3000, credit: 0, explanation: '制造费用增加。' },
      { subjectCode: '1602', summary: '计提设备折旧', debit: 0, credit: 2000, explanation: '累计折旧增加。' },
      { subjectCode: '100201', summary: '支付车间水电费', debit: 0, credit: 3000, explanation: '银行存款减少。' }]},
  { date: '2026-03-17', role: 'accountant', title: '制造费用分配→生产成本', tags: ["生产"], difficulty: 2,
    description: '将归集的制造费用9,000元分配转入生产成本。',
    tip: '制造费用分配后余额归零。',
    entries: [
      { subjectCode: '500103', summary: '分配制造费用', debit: 9000, credit: 0, explanation: '生产成本-制造费用增加。' },
      { subjectCode: '5101', summary: '分配制造费用', debit: 0, credit: 9000, explanation: '制造费用归零。' }]},
  { date: '2026-03-18', role: 'accountant', title: '领用低值易耗品 ⭐', tags: ["生产","费用"], difficulty: 2,
    description: '车间领用低值易耗品一批（工具、量具等），价值3,000元，采用一次摊销法。',
    tip: '低值易耗品是制造业常见业务。一次摊销法：领用时一次性计入制造费用。也可以采用五五摊销法（领用和报废各摊50%）。',
    entries: [
      { subjectCode: '5101', summary: '领用低值易耗品（一次摊销）', debit: 3000, credit: 0, explanation: '制造费用增加。低值易耗品采用一次摊销法，领用时全额计入成本。' },
      { subjectCode: '1403', summary: '领用低值易耗品', debit: 0, credit: 3000, explanation: '原材料减少。低值易耗品出库，库存减少。' }]},
  { date: '2026-03-19', role: 'accountant', title: '完工产品入库', tags: ["生产"], difficulty: 2,
    description: '本月A产品100台完工验收入库。生产成本合计119,000元（直接材料75,000+直接人工35,000+制造费用9,000）。',
    tip: '完工入库将生产成本各明细余额转入库存商品。',
    entries: [
      { subjectCode: '1405', summary: 'A产品完工入库', debit: 119000, credit: 0, explanation: '库存商品增加。100台完工，单位成本1,190元。' },
      { subjectCode: '500101', summary: '结转直接材料', debit: 0, credit: 75000, explanation: '生产成本-直接材料转出。' },
      { subjectCode: '500102', summary: '结转直接人工', debit: 0, credit: 35000, explanation: '生产成本-直接人工转出。' },
      { subjectCode: '500103', summary: '结转制造费用', debit: 0, credit: 9000, explanation: '生产成本-制造费用转出。' }]},
  { date: '2026-03-20', role: 'accountant', title: '对外公益性捐赠 ⭐', tags: ["费用"], difficulty: 2,
    description: '通过当地红十字会向灾区捐赠现金10,000元，以银行存款支付。',
    tip: '公益性捐赠计入"营业外支出"。企业发生的公益性捐赠支出，不超过年度利润总额12%的部分准予税前扣除。',
    entries: [
      { subjectCode: '6711', summary: '公益性捐赠', debit: 10000, credit: 0, explanation: '营业外支出增加。对外捐赠不属于日常经营活动，计入营业外支出。' },
      { subjectCode: '100201', summary: '支付捐赠款', debit: 0, credit: 10000, explanation: '银行存款减少。' }]},
  { date: '2026-03-21', role: 'accountant', title: '计提应收账款坏账准备 ⭐', tags: ["资产","期末"], difficulty: 3,
    description: '月末对应收账款余额进行减值测试，按余额的5%计提坏账准备。本月应收账款期末余额200,000元，应计提坏账准备10,000元。',
    tip: '坏账准备是应收账款的抵减科目，反映预计无法收回的款项。借：信用减值损失，贷：坏账准备。这是会计谨慎性原则的体现。',
    entries: [
      { subjectCode: '6701', summary: '计提坏账准备', debit: 10000, credit: 0, explanation: '信用减值损失增加。按应收账款余额200,000×5%=10,000元计提。' },
      { subjectCode: '123101', summary: '计提坏账准备', debit: 0, credit: 10000, explanation: '坏账准备增加。应收账款账面价值减少。' }]},
  { date: '2026-03-22', role: 'accountant', title: '收到银行利息收入', tags: ["资金"], difficulty: 1,
    description: '收到工商银行3月份存款利息收入8,000元，银行自动入账。',
    tip: '利息收入冲减财务费用。',
    entries: [
      { subjectCode: '100201', summary: '3月存款利息', debit: 8000, credit: 0, explanation: '银行存款增加。' },
      { subjectCode: '6603', summary: '冲减财务费用', debit: 0, credit: 8000, explanation: '财务费用减少。' }]},
  { date: '2026-03-23', role: 'accountant', title: '银行手续费', tags: ["资金"], difficulty: 1,
    description: '本月银行手续费250元，银行已自动扣收。',
    tip: '银行手续费计入财务费用。',
    entries: [
      { subjectCode: '6603', summary: '银行手续费', debit: 250, credit: 0, explanation: '财务费用增加。' },
      { subjectCode: '100201', summary: '银行手续费', debit: 0, credit: 250, explanation: '银行存款减少。' }]},

  // ═══════════════ 第4周：月末收官（7个）═══════════════
  { date: '2026-03-24', role: 'accountant', title: '计提当月工资及社保公积金', tags: ["工资"], difficulty: 1,
    description: '前往「工资管理」模块生成计提3月工资凭证。应发合计90,000元。',
    tip: '每月固定操作，通过工资模块自动生成凭证。',
    entries: [], nextAction: 'payroll',
    documents: [
      { type: 'text', label: '操作指引', docTitle: '操作说明', stampText: '财务专用章',
        content: '前往「工资管理」→ 计算汇总 → 生成计提工资凭证' }]},
  { date: '2026-03-25', role: 'accountant', title: '计提固定资产折旧', tags: ["资产"], difficulty: 1,
    description: '前往「固定资产」模块点击"计提本月折旧"。',
    tip: '折旧每月固定计提，通过固定资产模块一键完成。',
    entries: [], nextAction: 'fixed-assets',
    documents: [
      { type: 'text', label: '操作指引', docTitle: '操作说明', stampText: '财务专用章',
        content: '前往「固定资产」模块 → 计提本月折旧' }]},
  { date: '2026-03-26', role: 'accountant', title: '结转销售成本', tags: ["生产","成本"], difficulty: 3,
    description: '结转本月已销售A产品120台（现销80台+赊销40台）的销售成本。上月结余60台（单价1,340元），本月新品60台（单价1,190元），采用先进先出法。',
    tip: '先进先出法：先耗用上期结存，再耗用本期生产。不同批次单位成本不同。',
    entries: [
      { subjectCode: '6401', summary: '结转销售成本', debit: 151800, credit: 0, explanation: '主营业务成本增加。60台×1,340+60台×1,190=80,400+71,400=151,800元。' },
      { subjectCode: '1405', summary: '结转销售成本', debit: 0, credit: 151800, explanation: '库存商品减少。先进先出：先出上月结余60台，再出本月新品60台。' }]},
  { date: '2026-03-27', role: 'accountant', title: '计提短期借款利息', tags: ["融资"], difficulty: 2,
    description: 'Q1季末计提短期借款利息。借款余额150,000元，年利率4.35%，3个月利息合计=150,000×4.35%÷12×3≈1,631元。',
    tip: 'Q1季末需将1-3月利息一次性计提入账。利息费用计入财务费用。',
    entries: [
      { subjectCode: '6603', summary: '计提Q1借款利息', debit: 1631, credit: 0, explanation: '财务费用增加。Q1利息=150,000×4.35%÷12×3≈1,631元。' },
      { subjectCode: '2232', summary: '计提Q1借款利息', debit: 0, credit: 1631, explanation: '应付利息增加。Q1计提利息，到期付息时冲减。' }]},
  { date: '2026-03-28', role: 'accountant', title: '计提城建税及教育费附加', tags: ["税费"], difficulty: 2,
    description: '计提3月城建税和教育费附加。本月增值税销项税额31,200元（20,800+10,400），城建税=31,200×7%=2,184元，教育费附加=31,200×3%=936元。',
    tip: 'Q1季末附加税按当月增值税计算。',
    entries: [
      { subjectCode: '6403', summary: '计提城建税（7%）', debit: 2184, credit: 0, explanation: '税金及附加增加。31,200×7%=2,184元。' },
      { subjectCode: '222103', summary: '计提城建税', debit: 0, credit: 2184, explanation: '应交城建税增加。' },
      { subjectCode: '6403', summary: '计提教育费附加（3%）', debit: 936, credit: 0, explanation: '税金及附加增加。31,200×3%=936元。' },
      { subjectCode: '222104', summary: '计提教育费附加', debit: 0, credit: 936, explanation: '应交教育费附加增加。' }]},
  { date: '2026-03-31', role: 'accountant', title: '计提Q1企业所得税 ⭐', tags: ["税费","期末"], difficulty: 3,
    description: 'Q1季末计提企业所得税。第一季度累计应纳税所得额约50,000元，按25%税率计提所得税=50,000×25%=12,500元。企业所得税按季度预缴，次年汇算清缴。',
    tip: '企业所得税按季度预缴（每季度末计提），次年5月31日前汇算清缴。计提时分录：借：所得税费用，贷：应交税费-应交所得税。',
    entries: [
      { subjectCode: '6801', summary: '计提Q1所得税', debit: 12500, credit: 0, explanation: '所得税费用增加。Q1应纳税所得额50,000×25%=12,500元。企业所得税按季预缴。' },
      { subjectCode: '222102', summary: '计提Q1所得税', debit: 0, credit: 12500, explanation: '应交所得税增加。计提形成负债，Q1结束前缴纳。' }]},
  { date: '2026-03-31', role: 'accountant', title: '月末期间损益结转', tags: ["期末"], difficulty: 3,
    description: 'Q1季末将各损益类科目余额结转至"本年利润"。本月收入240,000元，各项成本费用合计，计算Q1累计净利润。',
    tip: '期间损益结转是月末必做步骤。本年利润累计反映Q1全部经营成果。',
    entries: [
      { subjectCode: '6001', summary: '结转主营业务收入', debit: 240000, credit: 0, explanation: '主营业务收入转出。本月收入240,000元。' },
      { subjectCode: '6401', summary: '结转主营业务成本', debit: 0, credit: 151800, explanation: '主营业务成本转出。COGS 151,800元。' },
      { subjectCode: '6403', summary: '结转税金及附加', debit: 0, credit: 3120, explanation: '税金及附加转出。2,184+936=3,120元。' },
      { subjectCode: '6602', summary: '结转管理费用', debit: 0, credit: 14800, explanation: '管理费用转出。房租8,000+水电4,000+差旅2,000+办公800=14,800元。' },
      { subjectCode: '6603', summary: '结转财务费用（净收入）', debit: 6119, credit: 0, explanation: '财务费用转出。利息收入8,000-手续费250-利息1,631=6,119元。' },
      { subjectCode: '6711', summary: '结转营业外支出', debit: 0, credit: 10000, explanation: '营业外支出转出。公益性捐赠10,000元。' },
      { subjectCode: '6701', summary: '结转信用减值损失', debit: 0, credit: 10000, explanation: '信用减值损失转出。坏账准备10,000元。' },
      { subjectCode: '6801', summary: '结转所得税费用', debit: 0, credit: 12500, explanation: '所得税费用转出。Q1所得税12,500元。' },
      { subjectCode: '4103', summary: '结转本年利润（Q1净利润）', debit: 0, credit: 43899, explanation: '本年利润增加。Q1净利润=240,000-151,800-3,120-14,800+6,119-10,000-10,000-12,500=43,899元。' }]},
  { date: '2026-03-31', role: 'accountant', title: '模拟纳税申报', tags: ["期末","申报"], difficulty: 1,
    description: 'Q1季末进行模拟纳税申报。系统已自动计算应缴税额（含增值税、企业所得税等），请前往纳税申报页面核对并提交。',
    tip: 'Q1季末申报含增值税和企业所得税预缴。确认期末结转完成后前往申报页面。',
    entries: [], nextAction: 'tax-filing',
    documents: [
      { type: 'text', label: '纳税申报提醒', docTitle: '3月/Q1纳税申报提醒', stampText: '财务专用章',
        content: '申报期间：2026年3月/Q1\n截止日期：2026年4月15日\n请前往纳税申报页面核对并提交。' }]},
]

export default mar
