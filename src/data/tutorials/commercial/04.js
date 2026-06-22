/**
 * 商业企业（商品流通企业）4月教学任务
 *
 * 主题：销售与应收管理
 * 行业特征：纯进销存，无生产成本核算
 * 企业类型：一般纳税人（增值税13%）
 *
 * 知识点标签：商品采购、商品销售、仓存管理、往来管理、资金管理、费用管理、工资社保、税费、期末、出纳
 *
 * 会计准则依据：
 * - 《企业会计准则第14号——收入》（财会[2017]22号）
 * - 《企业会计准则第22号——金融工具确认和计量》（财会[2017]7号）——坏账准备计提
 * - 《城市维护建设税暂行条例》国发[1985]19号
 */

const tasks = [
  // ═══════════════════════════════════════════
  // 第一周（4/1-4/7）：销售专题——各种销售方式
  // ═══════════════════════════════════════════
  {
    date: '2026-04-01',
    title: '现销商品（多品种）',
    tags: ['商品销售'],
    difficulty: 2,
    role: 'accountant',
    description: '销售A类商品300件、B类商品200件，不含税单价分别为160元和200元，价税合计99,440元已收存工商银行。',
    tip: '现销是一手交钱一手交货的销售方式。分录：借：银行存款，贷：主营业务收入/应交税费-销项。多品种销售时分别列示数量单价，汇总确认收入。',
    entries: [
      { subjectCode: '100201', summary: '现销商品收款', debit: 99440, credit: 0, explanation: '银行存款增加记借方。现销商品收到款项，资产增加。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入——主营业务产生的现金收入。'},
      { subjectCode: '6001', summary: '现销确认收入（A类300件×160）', debit: 0, credit: 48000, explanation: '主营业务收入增加记贷方。A类商品销售收入确认，收入=300件×160元=48,000元。' },
      { subjectCode: '6001', summary: '现销确认收入（B类200件×200）', debit: 0, credit: 40000, explanation: '主营业务收入增加记贷方。B类商品销售收入确认，收入=200件×200元=40,000元。' },
      { subjectCode: '222101', summary: '现销增值税销项税额', debit: 0, credit: 11440, explanation: '应交税费-应交增值税（销项税额）增加记贷方。销项税额=88,000×13%=11,440元。' }],
    documents: [
      { type: 'invoice', label: '增值税专用发票（销项）', region: '上海', invoiceNo: '3100456701', date: '2026-04-01', buyer: '永辉超市', seller: '本公司',
        lineItems: [{ name: 'A类商品', spec: '标准', unit: '件', qty: 300, price: 160, amount: 48000 }, { name: 'B类商品', spec: '标准', unit: '件', qty: 200, price: 200, amount: 40000 }],
        totalAmount: 99440, taxRate: '13%', taxAmount: 11440, totalInWords: '玖万玖仟肆佰肆拾元整' },
      { type: 'bank', label: '收款回单', date: '2026-04-01', totalAmount: 99440, payer: '永辉超市', payeeName: '本公司', content: '货款（发票No.3100456701）', refNo: 'HD202604010001' }]},
  // ══════ 出纳任务 ══════
  {
    date: '2026-04-01',
    title: '月初现金清点与日记账启用',
    tags: ['出纳'],
    difficulty: 1,
    description: '4月第一个工作日，出纳对库存现金进行清点，确认现金日记账期初余额为5,000元（3月末结转余额），账实相符后启用新账页，开始登记4月收支业务。',
    tip: '月初是出纳必做工作：清点保险柜现金实有数，与现金日记账余额核对，确保账实相符后方可开始日常业务。坚持"日清月结"制度，做到每日盘点、每月核对。这是出纳岗位的基本职责。',
    role: 'cashier',
    entries: [],
    documents: [
      { type: 'text', label: '现金日记账', docTitle: '现金日记账（2026年4月）', stampText: '现金日记账',
        content: `现金日记账
━━━━━━━━━━━━━━━━━━━━━━━━━
4月期初余额：5,000.00
（承3月末余额）

日期    摘要        收入    支出    余额
4/1     期初余额                     5,000.00
━━━━━━━━━━━━━━━━━━━━━━━━━
出纳核对：账实相符 ✓` },
      { type: 'receipt', label: '现金盘点表', docTitle: '库存现金盘点表', date: '2026-04-01', totalAmount: 5000, stampText: '出纳专用章',
        items: [{ name: '100元纸币', qty: 40, price: 100, amount: 4000 }, { name: '50元纸币', qty: 12, price: 50, amount: 600 }, { name: '20元及以下零钱', qty: 1, price: 400, amount: 400 }] }]},
  {
    date: '2026-04-02',
    role: 'accountant',
    title: '赊销商品（大额）',
    tags: ['商品销售', '往来管理'],
    difficulty: 2,
    description: '向鑫源商贸有限公司赊销C类商品400件，不含税单价250元，增值税13,000元，价税合计113,000元，货款未收。',
    tip: '赊销是常见的商业信用销售方式。确认收入时：借：应收账款，贷：主营业务收入/应交税费-销项。注意赊销虽未收到现金，但增值税纳税义务已发生。',
    entries: [
      { subjectCode: '112201', summary: '赊销商品款未收', debit: 113000, credit: 0, explanation: '应收账款-鑫源商贸增加记借方。赊销商品形成对客户的债权，需按合同约定账期催收。' },
      { subjectCode: '6001', summary: '赊销确认收入（C类400件×250）', debit: 0, credit: 100000, explanation: '主营业务收入增加记贷方。商品已发出，所有权风险报酬已转移，收入条件满足。依据《企业会计准则第14号》第四条。' },
      { subjectCode: '222101', summary: '赊销增值税销项税额', debit: 0, credit: 13000, explanation: '应交税费-应交增值税（销项税额）增加记贷方。赊销同样发生纳税义务，销项税额=100,000×13%=13,000元。' }],
    documents: [
      { type: 'invoice', label: '增值税专用发票（销项）', region: '上海', invoiceNo: '3100456702', date: '2026-04-02', buyer: '鑫源商贸有限公司', seller: '本公司',
        lineItems: [{ name: 'C类商品', spec: '标准', unit: '件', qty: 400, price: 250, amount: 100000 }],
        totalAmount: 113000, taxRate: '13%', taxAmount: 13000, totalInWords: '壹拾壹万叁仟元整' },
      { type: 'text', label: '出库单', docTitle: '商品出库单', content: 'C类商品 400件 已出库并发货，承运人：顺丰物流。经手人：仓库管理员。', signature: '仓库管理员 王强' }]},
  // ══════ 出纳任务 ══════
  {
    date: '2026-04-02',
    role: 'accountant',
    title: '提取备用金',
    tags: ['出纳'],
    difficulty: 1,
    description: '根据公司日常零星开支需要，出纳从工商银行提取备用金5,000元，现金已由出纳清点入库。',
    tip: '提取备用金是出纳最常见的付款业务之一。开具现金支票从银行提取现金，分录：借：库存现金，贷：银行存款。注意备用金金额需满足3-5天零星开支即可，不宜过大。出纳需在现金日记账和银行存款日记账上分别登记。',
    entries: [
      { subjectCode: '1001', summary: '提取备用金', debit: 5000, credit: 0, explanation: '库存现金增加记借方。提取备用金后保险柜现金增加，出纳需当面清点并登记现金日记账。' },
      { subjectCode: '100201', summary: '提取备用金', debit: 0, credit: 5000, explanation: '银行存款减少记贷方。从工行提取现金后银行账户余额减少，出纳需登记银行存款日记账。' }],
    documents: [
      { type: 'receipt', label: '现金支票存根', docTitle: '中国工商银行现金支票存根', date: '2026-04-02', totalAmount: 5000, stampText: '中国工商银行\n业务专用章',
        items: [{ name: '提取备用金', qty: 1, price: 5000, amount: 5000 }],
        content: '支票号码：XX789012\n收款人：本公司\n用途：备用金' }]},
  {
    date: '2026-04-03',
    role: 'accountant',
    title: '结转已销商品成本（现销+赊销）',
    tags: ['商品销售', '仓存管理'],
    difficulty: 2,
    description: '计算并结转4月1日-2日销售商品的成本。A类单位成本100元/件（300件），B类单位成本120元/件（200件），C类单位成本150元/件（400件），合计114,000元。',
    tip: '确认收入的同时必须同步结转成本，遵循配比原则。借：主营业务成本，贷：库存商品。成本计价采用移动加权平均法。',
    entries: [
      { subjectCode: '6401', summary: '结转已销商品成本', debit: 114000, credit: 0, explanation: '主营业务成本增加记借方。与销售收入配比的成本结转：A类300×100=30,000+B类200×120=24,000+C类400×150=60,000=114,000元。依据《企业会计准则第1号——存货》第十四条。' },
      { subjectCode: '1405', summary: '结转已销商品成本（A类）', debit: 0, credit: 30000, explanation: '库存商品-A类减少记贷方。A类商品出库300件×100元=30,000元。' },
      { subjectCode: '1405', summary: '结转已销商品成本（B类）', debit: 0, credit: 24000, explanation: '库存商品-B类减少记贷方。B类商品出库200件×120元=24,000元。' },
      { subjectCode: '1405', summary: '结转已销商品成本（C类）', debit: 0, credit: 60000, explanation: '库存商品-C类减少记贷方。C类商品出库400件×150元=60,000元。' }],
    documents: [
      { type: 'text', label: '成本计算表', docTitle: '商品销售成本计算表（4月第一批）', content: 'A类商品：销售300件×单位成本100元=30,000元\nB类商品：销售200件×单位成本120元=24,000元\nC类商品：销售400件×单位成本150元=60,000元\n合计：114,000元\n计价方法：移动加权平均法', stampText: '财务专用章' }]},
  // ══════ 出纳任务 ══════
  {
    date: '2026-04-03',
    role: 'accountant',
    title: '备用金借支（员工出差）',
    tags: ['出纳', '费用管理'],
    difficulty: 1,
    description: '销售人员李明因下周赴广州拜访客户，预借差旅费2,000元，出纳审核借款审批单后以现金支付。',
    tip: '员工预借差旅费是出纳日常备用金管理业务。借支时：借：其他应收款-员工，贷：库存现金。注意：借支必须有部门负责人和财务负责人签字审批，出差归来后凭发票报销，多退少补。',
    entries: [
      { subjectCode: '1221', summary: '预借差旅费', debit: 2000, credit: 0, explanation: '其他应收款增加记借方。员工预借差旅费形成对公司的暂借款，属于其他应收款，待出差归来后凭票报销冲抵。' },
      { subjectCode: '1001', summary: '预借差旅费', debit: 0, credit: 2000, explanation: '库存现金减少记贷方。支付借款后保险柜现金减少，出纳需登记现金日记账并在借款单上签章。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目1221），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '借款单', docTitle: '员工借款单', date: '2026-04-03', totalAmount: 2000, stampText: '财务审核专用章',
        items: [{ name: '差旅费预借款（广州出差）', qty: 1, price: 2000, amount: 2000 }],
        content: '借款人：李明（销售部）\n借款事由：广州客户拜访出差\n预计还款日：出差归来后3个工作日内\n审批人：销售经理 张伟\n财务审批：王芳' }]},
  {
    date: '2026-04-04',
    role: 'accountant',
    title: '销售退回（客户退货）',
    tags: ['商品销售', '仓存管理'],
    difficulty: 2,
    description: '鑫源商贸有限公司反映4月2日购买的C类商品中有30件存在质量问题，经协商同意退货。该批商品原售价250元/件，成本150元/件。',
    tip: '销售退回需同时冲减收入和成本。冲减收入：借：主营业务收入（红字或借方），应交税费-销项（红字或借方），贷：应收账款。同时冲减成本：借：库存商品，贷：主营业务成本。',
    entries: [
      { subjectCode: '6001', summary: '冲减退货收入（30件×250）', debit: 7500, credit: 0, explanation: '主营业务收入减少记借方（红字冲回）。退货30件冲减收入=30×250=7,500元。' },
      { subjectCode: '222101', summary: '冲减退货增值税销项', debit: 975, credit: 0, explanation: '应交税费-应交增值税（销项税额）减少记借方。退货对应的销项税=7,500×13%=975元。' },
      { subjectCode: '112201', summary: '冲减退货应收账款', debit: 0, credit: 8475, explanation: '应收账款-鑫源商贸减少记贷方。退货价税合计冲减客户欠款=7,500+975=8,475元。' },
      { subjectCode: '1405', summary: '退货入库冲减成本', debit: 4500, credit: 0, explanation: '库存商品增加记借方。退货商品验收入库，存货增加30件×150元=4,500元。' },
      { subjectCode: '6401', summary: '冲减退货成本', debit: 0, credit: 4500, explanation: '主营业务成本减少记贷方。退回商品的成本从当期成本中冲减=30件×150元=4,500元。' }],
    documents: [
      { type: 'invoice', label: '红字增值税专用发票', region: '上海', invoiceNo: '3100456703（红字）', date: '2026-04-04', buyer: '鑫源商贸有限公司', seller: '本公司',
        lineItems: [{ name: 'C类商品退货', spec: '标准', unit: '件', qty: -30, price: 250, amount: -7500 }],
        totalAmount: -8475, taxRate: '13%', taxAmount: -975, totalInWords: '负捌仟肆佰柒拾伍元整' },
      { type: 'receipt', label: '退货单', docTitle: '商品退货单', date: '2026-04-04', totalAmount: 8475, stampText: '鑫源商贸有限公司 收货专用章',
        items: [{ name: 'C类商品退货（质量问题）', qty: 30, price: 282.5, amount: 8475 }] }]},
  {
    date: '2026-04-05',
    role: 'accountant',
    title: '销售折让（质量问题让步）',
    tags: ['商品销售', '往来管理'],
    difficulty: 2,
    description: '永辉超市反馈上月采购的B类商品有轻微外观瑕疵，经协商不退货，给予价格折让2,000元（不含税），冲减应收账款。',
    tip: '销售折让与销售退回不同——客户保留商品，但价格上给予让步。分录：借：主营业务收入，借：应交税费-销项，贷：应收账款（价税合计）。折让金额冲减当期收入。',
    entries: [
      { subjectCode: '6001', summary: '给予销售折让', debit: 2000, credit: 0, explanation: '主营业务收入减少记借方。因质量问题给予客户价格折让，冲减当期收入2,000元。' },
      { subjectCode: '222101', summary: '折让冲减增值税销项', debit: 260, credit: 0, explanation: '应交税费-应交增值税（销项税额）减少记借方。折让对应的销项税冲减=2,000×13%=260元。' },
      { subjectCode: '112202', summary: '冲减折让应收账款', debit: 0, credit: 2260, explanation: '应收账款-永辉超市减少记贷方。折让价税合计冲减客户欠款=2,000+260=2,260元。' }],
    documents: [
      { type: 'text', label: '销售折让协议', docTitle: '商品销售折让协议', content: '经友好协商，就永辉超市采购B类商品外观瑕疵问题，本公司同意给予价格折让2,000元（不含税），折让金额从应收账款中扣除，客户保留商品不作退货处理。', stampText: '本公司 合同专用章', signature: '双方代表签字' }]},
  // ══════ 出纳任务 ══════
  {
    date: '2026-04-05',
    role: 'accountant',
    title: '现金报销快递费',
    tags: ['出纳', '费用管理'],
    difficulty: 1,
    description: '销售部寄送商品样品及合同文件给外地客户，发生顺丰快递费580元，出纳审核快递单据后以备用金现金支付。',
    tip: '零星快递费属于管理费用，使用备用金现金支付。分录：借：管理费用-办公费，贷：库存现金。注意：出纳需审核快递单的真实性和金额，确认无误后方可付款。大额费用必须走银行转账，不得使用现金。',
    entries: [
      { subjectCode: '660201', summary: '支付快递费', debit: 580, credit: 0, explanation: '管理费用-办公费增加记借方。快递费属于企业日常办公支出，金额较小直接计入当期费用。' },
      { subjectCode: '1001', summary: '支付快递费', debit: 0, credit: 580, explanation: '库存现金减少记贷方。以备用金支付快递费后，出纳需登记现金日记账并保留快递单作为原始凭证。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目660201），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '快递费发票', docTitle: '顺丰速运电子发票', date: '2026-04-05', totalAmount: 580, stampText: '顺丰速运\n发票专用章',
        items: [{ name: '快递服务费（样品+合同）', qty: 1, price: 580, amount: 580 }] }]},
  {
    date: '2026-04-06',
    role: 'accountant',
    title: '收到前欠货款（多笔）',
    tags: ['往来管理'],
    difficulty: 1,
    description: '收到两笔前欠货款：鑫源商贸有限公司偿还30,000元，永辉超市偿还25,000元，均已存入工商银行账户。',
    tip: '收到客户偿还的前欠货款时：借：银行存款，贷：应收账款。多笔回款应分别冲减对应客户明细，确保往来账清晰。',
    entries: [
      { subjectCode: '100201', summary: '收到鑫源前欠货款', debit: 30000, credit: 0, explanation: '银行存款增加记借方。鑫源商贸偿还前欠货款，资金回笼30,000元。' },
      { subjectCode: '100201', summary: '收到永辉前欠货款', debit: 25000, credit: 0, explanation: '银行存款增加记借方。永辉超市偿还前欠货款，资金回笼25,000元。' },
      { subjectCode: '112201', summary: '鑫源还前欠货款', debit: 0, credit: 30000, explanation: '应收账款-鑫源商贸减少记贷方。客户欠款30,000元已收回，债权减少。' },
      { subjectCode: '112202', summary: '永辉还前欠货款', debit: 0, credit: 25000, explanation: '应收账款-永辉超市减少记贷方。客户欠款25,000元已收回，债权减少。' }],
    documents: [
      { type: 'bank', label: '收款回单（鑫源）', date: '2026-04-06', totalAmount: 30000, payer: '鑫源商贸有限公司', payeeName: '本公司', content: '前欠货款', refNo: 'HD202604060001' },
      { type: 'bank', label: '收款回单（永辉）', date: '2026-04-06', totalAmount: 25000, payer: '永辉超市', payeeName: '本公司', content: '前欠货款', refNo: 'HD202604060002' }]},
  // ══════ 出纳任务 ══════
  {
    date: '2026-04-07',
    role: 'accountant',
    title: '支付销售运费',
    tags: ['商品销售', '费用管理'],
    difficulty: 1,
    description: '支付本月销售商品发生的运输费3,000元，以工商银行转账支付。',
    tip: '销售环节产生的运输费属于"销售费用"，是商业企业常见支出。借：销售费用，贷：银行存款。',
    entries: [
      { subjectCode: '6601', summary: '支付销售运费', debit: 3000, credit: 0, explanation: '销售费用增加记借方。销售商品发生的运输费属于销售环节费用，计入当期损益。' },
      { subjectCode: '100201', summary: '支付销售运费', debit: 0, credit: 3000, explanation: '银行存款减少记贷方。支付运费，资产减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6601），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '运费发票', docTitle: '运输业增值税普通发票', date: '2026-04-07', totalAmount: 3000, stampText: '顺丰物流 发票专用章',
        items: [{ name: '商品销售运输费（4月）', qty: 1, price: 3000, amount: 3000 }] }]},
  // ══════ 出纳任务 ══════
  {
    date: '2026-04-07',
    role: 'accountant',
    title: '银行转账支付仓储费',
    tags: ['出纳', '费用管理'],
    difficulty: 1,
    description: '支付本月仓库租赁及仓储管理费2,500元给XX物流仓储公司，通过工商银行转账支付，出纳已核对仓储合同及收费明细。',
    tip: '仓储费是商业企业常见的销售环节费用。分录：借：销售费用-仓储费，贷：银行存款。出纳办理转账时需核对收款方信息、金额与合同一致，付款后打印转账回单并登记银行日记账。',
    entries: [
      { subjectCode: '6601', summary: '支付仓储费', debit: 2500, credit: 0, explanation: '销售费用增加记借方。商业企业仓储费属于销售环节费用，计入当期损益。' },
      { subjectCode: '100201', summary: '支付仓储费', debit: 0, credit: 2500, explanation: '银行存款减少记贷方。通过工行网银转账支付仓储费，出纳需打印回单并登记银行日记账。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6601），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '转账回单', date: '2026-04-07', totalAmount: 2500, payer: '本公司', payeeName: 'XX物流仓储有限公司', content: '4月仓库租赁及仓储管理费', refNo: 'HD202604070066' },
      { type: 'receipt', label: '仓储费发票', docTitle: '仓储服务增值税发票', date: '2026-04-07', totalAmount: 2500, stampText: 'XX物流仓储\n发票专用章',
        items: [{ name: '4月仓库租赁费', qty: 1, price: 1500, amount: 1500 }, { name: '4月仓储管理服务费', qty: 1, price: 1000, amount: 1000 }] }]},

  // ═══════════════════════════════════════════
  // 第二周（4/8-4/14）：应收管理——催收+坏账
  // ═══════════════════════════════════════════
  {
    date: '2026-04-08',
    role: 'accountant',
    title: '现销商品（多品种二批）',
    tags: ['商品销售'],
    difficulty: 2,
    description: '销售A类商品200件、C类商品100件，不含税单价分别为160元和250元，价税合计64,410元已收存工商银行。',
    tip: '现销处理与第一批相同：借：银行存款，贷：主营业务收入/应交税费-销项。注意不同商品的单价不同，需分别计算金额。',
    entries: [
      { subjectCode: '100201', summary: '现销商品收款', debit: 64410, credit: 0, explanation: '银行存款增加记借方。第二批现销商品收到款项，资产增加。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入——主营业务产生的现金收入。'},
      { subjectCode: '6001', summary: '现销确认收入（A类200件×160）', debit: 0, credit: 32000, explanation: '主营业务收入增加记贷方。A类商品收入=200件×160元=32,000元。' },
      { subjectCode: '6001', summary: '现销确认收入（C类100件×250）', debit: 0, credit: 25000, explanation: '主营业务收入增加记贷方。C类商品收入=100件×250元=25,000元。' },
      { subjectCode: '222101', summary: '现销增值税销项税额', debit: 0, credit: 7410, explanation: '应交税费-应交增值税（销项税额）增加记贷方。销项税额=57,000×13%=7,410元。' }],
    documents: [
      { type: 'invoice', label: '增值税专用发票（销项）', region: '上海', invoiceNo: '3100456704', date: '2026-04-08', buyer: '鑫源商贸有限公司', seller: '本公司',
        lineItems: [{ name: 'A类商品', spec: '标准', unit: '件', qty: 200, price: 160, amount: 32000 }, { name: 'C类商品', spec: '标准', unit: '件', qty: 100, price: 250, amount: 25000 }],
        totalAmount: 64410, taxRate: '13%', taxAmount: 7410, totalInWords: '陆万肆仟肆佰壹拾元整' },
      { type: 'bank', label: '收款回单', date: '2026-04-08', totalAmount: 64410, payer: '鑫源商贸有限公司', payeeName: '本公司', content: '货款（发票No.3100456704）', refNo: 'HD202604080001' }]},
  // ══════ 出纳任务 ══════
  {
    date: '2026-04-08',
    role: 'accountant',
    title: '微信收款确认（客户回款）',
    tags: ['出纳'],
    difficulty: 2,
    description: '永辉超市通过微信扫码支付方式偿还前欠货款5,000元，款项已到公司微信商户账户（101204），出纳确认收款并登记。',
    tip: '微信/支付宝收款属于第三方支付方式，通过"其他货币资金-微信账户"核算。分录：借：其他货币资金-微信账户，贷：应收账款。出纳需在微信商户后台查询收款记录，截图保存作为收款依据。',
    entries: [
      { subjectCode: '101204', summary: '微信收款-永辉超市还款', debit: 5000, credit: 0, explanation: '其他货币资金-微信账户增加记借方。客户通过微信扫码还款，资金进入企业微信商户账户。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目112202），属于经营活动现金流入——主营业务产生的现金收入。'},
      { subjectCode: '112202', summary: '微信收款-永辉超市还款', debit: 0, credit: 5000, explanation: '应收账款-永辉超市减少记贷方。客户还款后应收账款减少，出纳需将收款信息告知会计做账。' }],
    documents: [
      { type: 'receipt', label: '微信收款截图', docTitle: '微信商户收款记录', date: '2026-04-08', totalAmount: 5000, stampText: '微信支付',
        items: [{ name: '永辉超市-前欠货款', qty: 1, price: 5000, amount: 5000 }],
        content: '交易单号：WX202604080001\n付款方：永辉超市\n收款账户：本公司微信商户\n交易方式：扫码支付' }]},
  {
    date: '2026-04-09',
    role: 'accountant',
    title: '赊销商品（大额二批）',
    tags: ['商品销售', '往来管理'],
    difficulty: 2,
    description: '向永辉超市赊销B类商品250件，不含税单价200元，增值税6,500元，价税合计56,500元，货款未收。',
    tip: '赊销给不同客户的应收账款应分别核算。借：应收账款-永辉超市，贷：主营业务收入/应交税费-销项。',
    entries: [
      { subjectCode: '112202', summary: '赊销商品款未收', debit: 56500, credit: 0, explanation: '应收账款-永辉超市增加记借方。赊销B类商品给永辉超市，债权增加。' },
      { subjectCode: '6001', summary: '赊销确认收入（B类250件×200）', debit: 0, credit: 50000, explanation: '主营业务收入增加记贷方。B类商品赊销收入=250件×200元=50,000元。' },
      { subjectCode: '222101', summary: '赊销增值税销项税额', debit: 0, credit: 6500, explanation: '应交税费-应交增值税（销项税额）增加记贷方。销项税额=50,000×13%=6,500元。' }],
    documents: [
      { type: 'invoice', label: '增值税专用发票（销项）', region: '上海', invoiceNo: '3100456705', date: '2026-04-09', buyer: '永辉超市', seller: '本公司',
        lineItems: [{ name: 'B类商品', spec: '标准', unit: '件', qty: 250, price: 200, amount: 50000 }],
        totalAmount: 56500, taxRate: '13%', taxAmount: 6500, totalInWords: '伍万陆仟伍佰元整' },
      { type: 'text', label: '出库单', docTitle: '商品出库单', content: 'B类商品 250件 已出库并发货，承运人：德邦物流。经手人：仓库管理员。', signature: '仓库管理员 王强' }]},
  // ══════ 出纳任务 ══════
  {
    date: '2026-04-09',
    role: 'accountant',
    title: '支付宝提现至银行',
    tags: ['出纳'],
    difficulty: 2,
    description: '将支付宝账户余额中的8,000元提现至工商银行账户，出纳在支付宝企业版操作提现并确认到账。',
    tip: '第三方支付账户（支付宝）内的资金提现至银行账户时：借：银行存款，贷：其他货币资金-支付宝账户。注意：提现通常需要1-2个工作日到账，出纳需跟踪到账情况并核对金额。',
    entries: [
      { subjectCode: '100201', summary: '支付宝提现至工行', debit: 8000, credit: 0, explanation: '银行存款增加记借方。支付宝余额提现后资金进入公司银行账户，增加银行存款。' },
      { subjectCode: '101205', summary: '支付宝提现至工行', debit: 0, credit: 8000, explanation: '其他货币资金-支付宝账户减少记贷方。支付宝余额减少，资金从第三方支付转入银行账户。' }],
    documents: [
      { type: 'bank', label: '提现到账回单', date: '2026-04-09', totalAmount: 8000, payer: '支付宝（中国）网络技术有限公司', payeeName: '本公司（工行账户）', content: '支付宝提现（单号：AL20260409001）', refNo: 'HD202604090099' },
      { type: 'receipt', label: '支付宝提现记录', docTitle: '支付宝企业版提现记录', date: '2026-04-09', totalAmount: 8000, stampText: '支付宝',
        items: [{ name: '支付宝余额提现', qty: 1, price: 8000, amount: 8000 }],
        content: '提现单号：AL20260409001\n到账账户：工商银行\n提现金额：8,000.00元\n处理状态：已到账' }]},
  {
    date: '2026-04-10',
    role: 'accountant',
    title: '结转已销商品成本（第二批）',
    tags: ['商品销售', '仓存管理'],
    difficulty: 2,
    description: '结转4月8日-9日销售商品的成本。A类200件×100元=20,000元，C类100件×150元=15,000元，B类250件×120元=30,000元，合计65,000元。',
    tip: '每批销售都需要独立结转成本，确保配比原则。使用移动加权平均法计算已售商品的单位成本。',
    entries: [
      { subjectCode: '6401', summary: '结转第二批销售成本', debit: 65000, credit: 0, explanation: '主营业务成本增加记借方。第二批销售成本=20,000+15,000+30,000=65,000元。' },
      { subjectCode: '1405', summary: '结转成本（A类200件）', debit: 0, credit: 20000, explanation: '库存商品-A类减少记贷方。A类200件×100元=20,000元。' },
      { subjectCode: '1405', summary: '结转成本（C类100件）', debit: 0, credit: 15000, explanation: '库存商品-C类减少记贷方。C类100件×150元=15,000元。' },
      { subjectCode: '1405', summary: '结转成本（B类250件）', debit: 0, credit: 30000, explanation: '库存商品-B类减少记贷方。B类250件×120元=30,000元。' }],
    documents: [
      { type: 'text', label: '成本计算表', docTitle: '商品销售成本计算表（4月第二批）', content: 'A类商品：销售200件×单位成本100元=20,000元\nC类商品：销售100件×单位成本150元=15,000元\nB类商品：销售250件×单位成本120元=30,000元\n合计：65,000元', stampText: '财务专用章' }]},
  // ══════ 出纳任务 ══════
  {
    date: '2026-04-11',
    role: 'accountant',
    title: '收到前欠货款',
    tags: ['往来管理'],
    difficulty: 1,
    description: '收到鑫源商贸有限公司汇来前欠货款40,000元，已存入工商银行账户。',
    tip: '及时催收应收账款是现金流管理的重要环节。收到欠款：借：银行存款，贷：应收账款-客户名。',
    entries: [
      { subjectCode: '100201', summary: '收到鑫源前欠货款', debit: 40000, credit: 0, explanation: '银行存款增加记借方。鑫源商贸偿还前欠货款40,000元。' , cashFlowItem: 'cf-op', cashFlowExplanation: '销售商品/提供劳务收到的现金（配对科目112201），属于经营活动现金流入——主营业务产生的现金收入。'},
      { subjectCode: '112201', summary: '鑫源还前欠货款', debit: 0, credit: 40000, explanation: '应收账款-鑫源商贸减少记贷方。应收账款收回，债权减少40,000元。' }],
    documents: [
      { type: 'bank', label: '收款回单', date: '2026-04-11', totalAmount: 40000, payer: '鑫源商贸有限公司', payeeName: '本公司', content: '前欠货款', refNo: 'HD202604110001' }]},
  {
    date: '2026-04-12',
    role: 'accountant',
    title: '计提坏账准备',
    tags: ['往来管理', '期末'],
    difficulty: 3,
    description: '月末按应收账款余额百分比法计提坏账准备。当期应收账款（鑫源商贸）账面余额为100,000元，计提比例为5%，应计提坏账准备5,000元。',
    tip: '坏账准备是应收账款的抵减科目，反映预期信用损失。借：资产减值损失，贷：坏账准备。计提比例按企业会计政策确定，此处为5%。依据《企业会计准则第22号》金融工具减值规定。',
    entries: [
      { subjectCode: '6701', summary: '计提坏账准备', debit: 5000, credit: 0, explanation: '资产减值损失增加记借方。按应收账款余额百分比法计提坏账=100,000×5%=5,000元。依据《企业会计准则第22号》第四十七条：企业应当以预期信用损失为基础进行减值会计处理。' },
      { subjectCode: '1231', summary: '计提坏账准备', debit: 0, credit: 5000, explanation: '坏账准备增加记贷方。坏账准备是应收账款的备抵科目，贷方表示计提增加。应收账款账面价值=应收账款余额-坏账准备。' }],
    documents: [
      { type: 'text', label: '坏账计算表', docTitle: '坏账准备计提计算表（2026年4月）', content: '计提方法：应收账款余额百分比法\n计提比例：5%\n应收账款（鑫源商贸）余额：100,000元\n应计提坏账准备：100,000×5%=5,000元\n\n注：永辉超市应收账款账龄较短，暂不计提。', stampText: '财务专用章' }]},
  // ══════ 出纳任务 ══════
  {
    date: '2026-04-12',
    title: '资金日报编制',
    tags: ['出纳'],
    difficulty: 1,
    description: '出纳编制4月上旬（4/1-4/11）资金日报表，汇总本期现金及银行存款的收支情况，上报财务主管审阅。',
    tip: '资金日报是出纳每日必做工作，向管理层反映当日资金动态。内容包括：当日现金/银行存款收支明细、余额、大额资金变动说明等。定期编制资金报表有助于企业掌握现金流状况，防范资金风险。',
    role: 'cashier',
    entries: [],
    documents: [
      { type: 'text', label: '资金日报表', docTitle: '资金日报表（2026年4月12日）', stampText: '出纳专用章',
        content: `资金日报表（4月1日-11日）
━━━━━━━━━━━━━━━━━━━━━━━━━━━
项目         期初余额    本期收入    本期支出    期末余额
库存现金       5,000       5,000      5,580       4,420
工商银行     500,000     269,850     10,525     759,325
━━━━━━━━━━━━━━━━━━━━━━━━━━━
编制人：出纳 审核人：财务主管 王芳
日期：2026年4月12日` }]},
  {
    date: '2026-04-13',
    role: 'accountant',
    title: '支付广告推广费',
    tags: ['费用管理'],
    difficulty: 1,
    description: '支付本月网络搜索引擎广告推广费6,000元，以工商银行转账支付。',
    tip: '广告费属于销售费用，属于期间费用，计入当期损益。借：销售费用，贷：银行存款。',
    entries: [
      { subjectCode: '6601', summary: '支付广告推广费', debit: 6000, credit: 0, explanation: '销售费用增加记借方。网络广告推广属于销售推广活动，费用计入当期损益。' },
      { subjectCode: '100201', summary: '支付广告推广费', debit: 0, credit: 6000, explanation: '银行存款减少记贷方。支付广告费用，资金减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6601），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '广告费发票', docTitle: '增值税普通发票', date: '2026-04-13', totalAmount: 6000, stampText: 'XX网络科技有限公司 发票专用章',
        items: [{ name: '搜索引擎推广服务（4月）', qty: 1, price: 6000, amount: 6000 }] }]},
  {
    date: '2026-04-14',
    role: 'accountant',
    title: '员工报销差旅费',
    tags: ['费用管理'],
    difficulty: 1,
    description: '销售人员报销本月出差差旅费2,800元（含交通费1,600元、住宿费1,200元），以现金支付。',
    tip: '差旅费根据员工所属部门计入费用：销售人员差旅费计入"销售费用"。借：销售费用，贷：库存现金。',
    entries: [
      { subjectCode: '6601', summary: '报销差旅费', debit: 2800, credit: 0, explanation: '销售费用增加记借方。销售人员出差差旅费属于销售环节支出，计入当期损益。' },
      { subjectCode: '1001', summary: '报销差旅费', debit: 0, credit: 2800, explanation: '库存现金减少记贷方。现金支付员工差旅报销款。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6601），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '差旅费报销单', docTitle: '差旅费报销单', date: '2026-04-14', totalAmount: 2800, stampText: '财务审核专用章',
        items: [{ name: '高铁票（上海→杭州）', qty: 2, price: 280, amount: 560 }, { name: '高铁票（杭州→上海）', qty: 2, price: 280, amount: 560 }, { name: '住宿费', qty: 2, price: 600, amount: 1200 }, { name: '市内交通费', qty: 1, price: 480, amount: 480 }] }]},
  // ══════ 出纳任务 ══════
  {
    date: '2026-04-14',
    role: 'accountant',
    title: '备用金补充',
    tags: ['出纳'],
    difficulty: 1,
    description: '因近期零星支出较多，库存现金余额不足，出纳从工商银行提取3,000元补充备用金，已办理现金支票提现手续。',
    tip: '当库存现金低于日常备用金限额时，需及时补充。分录：借：库存现金，贷：银行存款。出纳应合理预估现金需求，避免频繁提现或现金不足影响正常支付。',
    entries: [
      { subjectCode: '1001', summary: '补充备用金', debit: 3000, credit: 0, explanation: '库存现金增加记借方。备用金补充后现金余额回升，满足日常零星支付需求。' },
      { subjectCode: '100201', summary: '补充备用金', debit: 0, credit: 3000, explanation: '银行存款减少记贷方。从工行提现补充备用金，银行账户余额相应减少。' }],
    documents: [
      { type: 'receipt', label: '现金支票存根', docTitle: '中国工商银行现金支票存根', date: '2026-04-14', totalAmount: 3000, stampText: '中国工商银行\n业务专用章',
        items: [{ name: '补充备用金', qty: 1, price: 3000, amount: 3000 }],
        content: '支票号码：XX789013\n收款人：本公司\n用途：补充备用金' }]},

  // ═══════════════════════════════════════════
  // 第三周（4/15-4/21）：常规业务——采购+费用
  // ═══════════════════════════════════════════
  {
    date: '2026-04-15',
    role: 'accountant',
    title: '采购商品（现购）',
    tags: ['商品采购', '税费'],
    difficulty: 2,
    description: '向华强供应链有限公司现购A类商品一批，不含税价40,000元，增值税5,200元，价税合计45,200元，以工商银行转账支付。',
    tip: '现购商品：借：库存商品/应交税费-进项，贷：银行存款。作为一般纳税人，增值税专用发票的进项税额可以抵扣销项税。',
    entries: [
      { subjectCode: '1405', summary: '现购A类商品入库', debit: 40000, credit: 0, explanation: '库存商品增加记借方。现购A类商品验收入库，存货资产增加。' },
      { subjectCode: '222101', summary: '采购进项税额', debit: 5200, credit: 0, explanation: '应交税费-应交增值税（进项税额）增加记借方。增值税专用发票注明的税额可抵扣销项税。依据《增值税暂行条例》第八条。' },
      { subjectCode: '100201', summary: '支付采购货款', debit: 0, credit: 45200, explanation: '银行存款减少记贷方。支付采购货款及税款，资产减少。' , cashFlowItem: 'cf-op2', cashFlowExplanation: '采购存货/商品支出（配对科目1405），属于"购买商品、接受劳务支付的现金"——经营活动现金流出。'}],
    documents: [
      { type: 'invoice', label: '增值税专用发票（进项）', region: '广东', invoiceNo: '4400789012', date: '2026-04-15', buyer: '本公司', seller: '华强供应链有限公司',
        lineItems: [{ name: 'A类商品', spec: '标准', unit: '件', qty: 400, price: 100, amount: 40000 }],
        totalAmount: 45200, taxRate: '13%', taxAmount: 5200, totalInWords: '肆万伍仟贰佰元整' },
      { type: 'bank', label: '付款回单', date: '2026-04-15', totalAmount: 45200, payer: '本公司', payeeName: '华强供应链有限公司', content: '货款（发票No.4400789012）', refNo: 'HD202604150001' }]},
  {
    date: '2026-04-16',
    role: 'accountant',
    title: '采购商品（赊购）',
    tags: ['商品采购', '往来管理'],
    difficulty: 2,
    description: '向鼎盛贸易有限公司赊购B类商品一批，不含税价35,000元，增值税4,550元，货款未付，商品已验收入库。',
    tip: '赊购商品时暂不付款，形成应付账款。借：库存商品/应交税费-进项，贷：应付账款。注意区分不同供应商的应付账款明细。',
    entries: [
      { subjectCode: '1405', summary: '赊购B类商品入库', debit: 35000, credit: 0, explanation: '库存商品增加记借方。赊购商品验收入库，存货增加。' },
      { subjectCode: '222101', summary: '赊购进项税额', debit: 4550, credit: 0, explanation: '进项税额增加记借方，可抵扣销项税。' },
      { subjectCode: '220202', summary: '赊购货款未付', debit: 0, credit: 39550, explanation: '应付账款-鼎盛贸易增加记贷方。采购商品尚未付款，形成对供应商的债务。' }],
    documents: [
      { type: 'invoice', label: '增值税专用发票（进项）', region: '广东', invoiceNo: '4400789013', date: '2026-04-16', buyer: '本公司', seller: '鼎盛贸易有限公司',
        lineItems: [{ name: 'B类商品', spec: '标准', unit: '件', qty: 350, price: 100, amount: 35000 }],
        totalAmount: 39550, taxRate: '13%', taxAmount: 4550, totalInWords: '叁万玖仟伍佰伍拾元整' },
      { type: 'text', label: '入库单', docTitle: '商品入库单', content: 'B类商品 350件 已验收入库，质量合格。经手人：仓库管理员 王强。', signature: '仓库管理员 王强' }]},
  // ══════ 出纳任务 ══════
  {
    date: '2026-04-16',
    role: 'accountant',
    title: '银行转账支付供应商货款',
    tags: ['出纳'],
    difficulty: 2,
    description: '向鼎盛贸易有限公司支付前欠采购货款20,000元，出纳通过工商银行网银办理转账，核对采购订单及入库单后付款。',
    tip: '支付供应商货款是出纳的重要付款业务。分录：借：应付账款，贷：银行存款。出纳付款前必须核对：采购合同/订单、入库单、发票三单一致，并确认审批手续齐全后方可付款。付款后需及时登记银行日记账。',
    entries: [
      { subjectCode: '220202', summary: '支付鼎盛贸易货款', debit: 20000, credit: 0, explanation: '应付账款-鼎盛贸易减少记借方。偿还供应商货款后公司债务减少。' },
      { subjectCode: '100201', summary: '支付鼎盛贸易货款', debit: 0, credit: 20000, explanation: '银行存款减少记贷方。通过工行网银转账付款，出纳需核对收款账户信息准确无误。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目220202），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'bank', label: '转账回单', date: '2026-04-16', totalAmount: 20000, payer: '本公司', payeeName: '鼎盛贸易有限公司', content: '支付采购货款（采购订单PO20260401）', refNo: 'HD202604160055' },
      { type: 'text', label: '付款审批单', docTitle: '付款审批单', date: '2026-04-16', content: '收款单位：鼎盛贸易有限公司\n金额：20,000.00元\n付款事由：采购货款（B类商品）\n审批人：财务主管 王芳\n审批人：总经理 张伟', signature: '出纳签收' }]},
  {
    date: '2026-04-17',
    role: 'accountant',
    title: '支付采购运费',
    tags: ['商品采购', '费用管理'],
    difficulty: 1,
    description: '支付本月采购商品发生的运输费1,500元，以现金支付。',
    tip: '商业企业采购运费金额较小的可直接计入当期"销售费用"，无需计入库存商品成本。这是商业企业特有的简化处理方式。',
    entries: [
      { subjectCode: '6601', summary: '支付采购运费', debit: 1500, credit: 0, explanation: '销售费用增加记借方。商业企业采购运费金额较小，直接计入销售费用（当期损益），无需分摊到库存商品成本。依据《企业会计准则第1号——存货》应用指南。' },
      { subjectCode: '1001', summary: '支付采购运费', debit: 0, credit: 1500, explanation: '库存现金减少记贷方。现金支付运费，资产减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6601），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '运费收据', docTitle: '运输业增值税普通发票', date: '2026-04-17', totalAmount: 1500, stampText: 'XX物流公司 发票专用章',
        items: [{ name: '采购商品运输费', qty: 1, price: 1500, amount: 1500 }] }]},
  {
    date: '2026-04-18',
    role: 'accountant',
    title: '银行存款利息收入',
    tags: ['费用管理'],
    difficulty: 1,
    description: '收到工商银行第一季度存款利息2,300元，已划入公司账户。',
    tip: '银行存款利息收入冲减财务费用。借：银行存款，贷：财务费用（利息收入在贷方表示冲减费用）。注意利息收入不是营业收入，不计入主营业务收入。',
    entries: [
      { subjectCode: '100201', summary: '收到存款利息', debit: 2300, credit: 0, explanation: '银行存款增加记借方。银行划入存款利息，资产增加。' , cashFlowItem: 'cf-op5', cashFlowExplanation: '其他经营活动现金流入（配对科目6603），属于"收到其他与经营活动有关的现金"。'},
      { subjectCode: '6603', summary: '收到存款利息', debit: 0, credit: 2300, explanation: '财务费用减少记贷方。利息收入冲减财务费用，体现为费用的减少而非直接收入。' }],
    documents: [
      { type: 'bank', label: '利息回单', date: '2026-04-18', totalAmount: 2300, payer: '工商银行', payeeName: '本公司', content: '第一季度存款利息结息', refNo: 'HD202604180001' }]},
  // ══════ 出纳任务 ══════
  {
    date: '2026-04-18',
    title: '银行回单整理归档',
    tags: ['出纳'],
    difficulty: 1,
    description: '出纳对4月中上旬各类银行回单进行整理、分类、粘贴，按日期顺序装订归档，确保每笔银行收支都有完整的原始凭证。',
    tip: '银行回单是出纳编制银行日记账和会计记账的重要原始凭证。出纳需定期将银行回单按日期顺序整理，与银行日记账逐笔勾对，确保"单单相符、账证相符"。这是出纳档案管理的基础工作。',
    role: 'cashier',
    entries: [],
    documents: [
      { type: 'text', label: '回单整理清单', docTitle: '银行回单归档清单（2026年4月中上旬）', stampText: '出纳专用章',
        content: `银行回单整理归档清单
━━━━━━━━━━━━━━━━━━━━━━━━━━━
日期      业务内容              金额        回单编号
4/1       现销收款              99,440      HD202604010001
4/6       现金缴款               3,000      HD202604060088
4/6       鑫源回款              30,000      HD202604060001
4/6       永辉回款              25,000      HD202604060002
4/7       仓储费                 2,500      HD202604070066
4/8       现销收款              64,410      HD202604080001
4/10      支票工本费                25      HD202604100011
4/11      鑫源回款              40,000      HD202604110001
━━━━━━━━━━━━━━━━━━━━━━━━━━━
整理人：出纳  日期：2026-04-18` }]},
  // ══════ 出纳任务 ══════
  {
    date: '2026-04-20',
    role: 'accountant',
    title: '支付水电费',
    tags: ['费用管理'],
    difficulty: 1,
    description: '支付本月公司办公用水电费3,200元，以工商银行转账支付。',
    tip: '水电费属于企业管理费用中的日常运营支出。借：管理费用，贷：银行存款。',
    entries: [
      { subjectCode: '6602', summary: '支付水电费', debit: 3200, credit: 0, explanation: '管理费用增加记借方。办公用水电费属于企业日常管理运营支出，计入管理费用。' },
      { subjectCode: '100201', summary: '支付水电费', debit: 0, credit: 3200, explanation: '银行存款减少记贷方。支付水电费用，资产减少。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6602），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '电费账单', docTitle: '上海市电力公司缴费单', date: '2026-04-20', totalAmount: 2200,
        items: [{ name: '4月电费', qty: 1, price: 2200, amount: 2200 }] },
      { type: 'receipt', label: '水费账单', docTitle: '上海市自来水公司缴费单', date: '2026-04-20', totalAmount: 1000,
        items: [{ name: '4月水费', qty: 1, price: 1000, amount: 1000 }] }]},
  {
    date: '2026-04-21',
    role: 'accountant',
    title: '购买办公用品',
    tags: ['费用管理'],
    difficulty: 1,
    description: '行政部购买办公用品一批，共计860元，以现金支付。',
    tip: '办公用品金额较小的直接计入管理费用。借：管理费用，贷：库存现金。',
    entries: [
      { subjectCode: '6602', summary: '购买办公用品', debit: 860, credit: 0, explanation: '管理费用增加记借方。日常办公用品支出计入管理费用。' },
      { subjectCode: '1001', summary: '购买办公用品', debit: 0, credit: 860, explanation: '库存现金减少记贷方。现金支付办公用品款。' , cashFlowItem: 'cf-op6', cashFlowExplanation: '其他经营活动现金支出（配对科目6602），属于"支付其他与经营活动有关的现金"。'}],
    documents: [
      { type: 'receipt', label: '购物发票', docTitle: '增值税普通发票', date: '2026-04-21', totalAmount: 860, stampText: 'XX办公用品店 发票专用章',
        items: [{ name: '打印纸', qty: 5, price: 100, amount: 500 }, { name: '文件夹', qty: 12, price: 15, amount: 180 }, { name: '签字笔', qty: 30, price: 6, amount: 180 }] }]},
  // ══════ 出纳任务 ══════
  {
    date: '2026-04-21',
    title: '现金盘点',
    tags: ['出纳'],
    difficulty: 1,
    description: '出纳对库存现金进行月中盘点，保险柜实有现金4,420元，现金日记账余额4,420元，账实相符。盘点表经财务主管签字确认。',
    tip: '出纳应定期（至少每月一次）对库存现金进行盘点，确保账实相符。盘点时财务主管应在场监盘，盘点表由出纳和监盘人双签。如发现短缺或溢余，应立即查明原因并按规定处理。',
    role: 'cashier',
    entries: [],
    documents: [
      { type: 'receipt', label: '现金盘点表', docTitle: '库存现金盘点表（2026年4月21日）', totalAmount: 4420, stampText: '财务专用章',
        items: [{ name: '100元纸币', qty: 34, price: 100, amount: 3400 }, { name: '50元纸币', qty: 14, price: 50, amount: 700 }, { name: '20元纸币', qty: 10, price: 20, amount: 200 }, { name: '10元及以下零钱', qty: 1, price: 120, amount: 120 }],
        content: `盘点结果
账面余额：4,420.00元
实盘金额：4,420.00元
差异：0.00元
盘点人：出纳
监盘人：财务主管 王芳
盘点结论：账实相符` }]},

  // ═══════════════════════════════════════════
  // 第四周（4/22-4/30）：月末处理——期末+出纳
  // ═══════════════════════════════════════════
  {
    date: '2026-04-22',
    role: 'accountant',
    title: '计提固定资产折旧',
    tags: ['费用管理'],
    difficulty: 2,
    description: '计提本月固定资产折旧。房屋建筑物原值500,000元，月折旧率0.2%；办公设备原值80,000元，月折旧率0.8%；运输设备原值120,000元，月折旧率0.6%。',
    tip: '固定资产折旧按月计提，按资产使用部门计入费用。管理部门使用的固定资产折旧计入"管理费用"。借：管理费用，贷：累计折旧。',
    entries: [
      { subjectCode: '6602', summary: '计提折旧', debit: 2360, credit: 0, explanation: '管理费用增加记借方。本月折旧合计=房屋500,000×0.2%=1,000元+办公设备80,000×0.8%=640元+运输设备120,000×0.6%=720元=2,360元。' },
      { subjectCode: '1602', summary: '计提折旧', debit: 0, credit: 2360, explanation: '累计折旧增加记贷方。累计折旧是固定资产的抵减科目，贷方表示折旧增加。固定资产账面价值=原值-累计折旧。' }],
    documents: [
      { type: 'text', label: '折旧计算表', docTitle: '固定资产折旧计算表（2026年4月）', content: '房屋建筑物：原值500,000×月折旧率0.2%=1,000元\n办公设备：原值80,000×月折旧率0.8%=640元\n运输设备：原值120,000×月折旧率0.6%=720元\n合计：2,360元\n折旧方法：直线法（年限平均法）', stampText: '财务专用章' }]},
  // ══════ 出纳任务 ══════
  {
    date: '2026-04-22',
    title: '银行对账（月中核对）',
    tags: ['出纳', '期末'],
    difficulty: 1,
    description: '出纳进行月中银行存款对账，将银行存款日记账与工商银行提供的对账单进行逐笔勾对。经核对，截至4月21日，银行存款日记账余额与银行对账单余额一致，无未达账项。',
    tip: '银行对账是出纳的重要内控工作。定期（至少每月一次）与银行对账，发现差异需编制"银行存款余额调节表"，查找未达账项。月中对账可及早发现记账差错或异常交易，降低资金风险。',
    role: 'cashier',
    entries: [],
    documents: [
      { type: 'text', label: '银行对账单', docTitle: '中国工商银行对账单（截止2026年4月21日）', stampText: '中国工商银行 业务专用章',
        content: `工商银行对账单（截至4月21日）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
期初余额（4/1）：           500,000.00
本期借方发生额：            269,850.00
本期贷方发生额：             10,525.00
期末余额：                  759,325.00
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
核对结果：日记账余额 759,325.00 ✓  银行对账单 759,325.00 ✓` }]},
  {
    date: '2026-04-23',
    role: 'accountant',
    title: '计提本月工资',
    tags: ['工资社保'],
    difficulty: 2,
    description: '计提本月员工工资：管理人员工资30,000元，销售人员工资20,000元，合计50,000元。',
    tip: '月末计提当月工资，按部门计入不同费用科目。借：管理费用（管理岗）/销售费用（销售岗），贷：应付职工薪酬-工资。',
    entries: [
      { subjectCode: '6602', summary: '计提管理人员工资', debit: 30000, credit: 0, explanation: '管理费用增加记借方。行政管理人员的工资计入管理费用。' },
      { subjectCode: '6601', summary: '计提销售人员工资', debit: 20000, credit: 0, explanation: '销售费用增加记借方。销售人员的工资计入销售费用。' },
      { subjectCode: '221101', summary: '计提本月工资', debit: 0, credit: 50000, explanation: '应付职工薪酬-工资增加记贷方。计提工资形成对员工的负债，实际发放时冲减。' }],
    documents: [
      { type: 'text', label: '工资表', docTitle: '2026年4月工资汇总表', content: '管理人员：5人×6,000元=30,000元\n销售人员：4人×5,000元=20,000元\n合计：50,000元\n实发金额：50,000元（无社保公积金扣除）', stampText: '行政人事部章' }]},
  // ══════ 出纳任务 ══════
  {
    date: '2026-04-23',
    role: 'accountant',
    title: '员工归还备用金借款',
    tags: ['出纳', '费用管理'],
    difficulty: 1,
    description: '销售人员李明原计划赴广州出差因客户行程变更取消，将预借的2,000元差旅费全额归还出纳，出纳清点现金后开具收据。',
    tip: '员工借款因故未使用需全额归还。分录：借：库存现金，贷：其他应收款。出纳收到还款后开具收款收据，并在借款单上注明"已归还"字样，注销借款记录。',
    entries: [
      { subjectCode: '1001', summary: '收回员工备用金借款', debit: 2000, credit: 0, explanation: '库存现金增加记借方。员工归还备用金借款后保险柜现金增加，出纳需开具收据并登记现金日记账。' , cashFlowItem: 'cf-op5', cashFlowExplanation: '其他经营活动现金流入（配对科目1221），属于"收到其他与经营活动有关的现金"。'},
      { subjectCode: '1221', summary: '收回员工备用金借款', debit: 0, credit: 2000, explanation: '其他应收款减少记贷方。员工借款归还后，其他应收款余额减少，该笔借款结清。' }],
    documents: [
      { type: 'receipt', label: '收款收据', docTitle: '收款收据', date: '2026-04-23', totalAmount: 2000, stampText: '财务专用章',
        items: [{ name: '收回预借差旅费（借款人：李明）', qty: 1, price: 2000, amount: 2000 }],
        content: '借款日期：2026-04-03\n借款金额：2,000.00元\n归还日期：2026-04-23\n备注：客户行程变更，借款全额归还' }]},
  {
    date: '2026-04-24',
    role: 'accountant',
    title: '发放本月工资',
    tags: ['工资社保'],
    difficulty: 1,
    description: '通过工商银行转账发放本月员工工资50,000元。',
    tip: '实际发放工资时冲减计提的应付职工薪酬。借：应付职工薪酬，贷：银行存款。发放后"应付职工薪酬"余额归零。',
    entries: [
      { subjectCode: '221101', summary: '发放本月工资', debit: 50000, credit: 0, explanation: '应付职工薪酬-工资减少记借方。实际支付工资，负债减少。' },
      { subjectCode: '100201', summary: '发放本月工资', debit: 0, credit: 50000, explanation: '银行存款减少记贷方。通过银行代发工资，资金划出。' , cashFlowItem: 'cf-op3', cashFlowExplanation: '支付职工薪酬相关支出（配对科目221101），属于"支付给职工以及为职工支付的现金"——经营活动现金流出。'}],
    documents: [
      { type: 'bank', label: '代发工资回单', date: '2026-04-24', totalAmount: 50000, payer: '本公司', payeeName: '员工代发户', content: '2026年4月工资', refNo: 'HD202604240001' }]},
  {
    date: '2026-04-25',
    role: 'accountant',
    title: '计提城建税及教育费附加',
    tags: ['税费', '期末'],
    difficulty: 2,
    description: '根据本月应交增值税计算并计提城市维护建设税（税率7%）和教育费附加（税率3%）。本月销项税额37,115元，进项税额9,750元，应交增值税27,365元。',
    tip: '城建税和教育费附加以实际应交增值税为计税依据。借：税金及附加，贷：应交税费-城建税/教育费附加。税率：城建税7%，教育费附加3%。',
    entries: [
      { subjectCode: '6403', summary: '计提城建税及教育费附加', debit: 2736.5, credit: 0, explanation: '税金及附加增加记借方。城建税和教育费附加属于附加税费，计入税金及附加科目。应交增值税=销项37,115-进项9,750=27,365元。' },
      { subjectCode: '222103', summary: '计提应交城建税', debit: 0, credit: 1915.55, explanation: '应交税费-应交城市维护建设税增加记贷方。城建税=27,365×7%=1,915.55元。依据《城市维护建设税暂行条例》第四条。' },
      { subjectCode: '222104', summary: '计提应交教育费附加', debit: 0, credit: 820.95, explanation: '应交税费-应交教育费附加增加记贷方。教育费附加=27,365×3%=820.95元。' }],
    documents: [
      { type: 'text', label: '税金计算表', docTitle: '附加税费计算表（2026年4月）', content: '计税依据：应交增值税=销项税额37,115元-进项税额9,750元=27,365元\n城市维护建设税：27,365×7%=1,915.55元\n教育费附加：27,365×3%=820.95元\n合计：2,736.50元', stampText: '财务专用章' }]},
  // ══════ 出纳任务 ══════
  {
    date: '2026-04-25',
    title: '银行账户余额确认',
    tags: ['出纳'],
    difficulty: 1,
    description: '出纳登录工商银行网银查询账户余额，确认银行存款日记账与银行实际余额一致。本月即将结束，出纳提前核对确保月末结账顺利进行。',
    tip: '出纳应养成每日查询银行账户余额的习惯，确保资金安全。接近月末时，出纳需提前核对银行日记账与银行流水，为月末银行对账做好准备。发现异常交易需立即报告。',
    role: 'cashier',
    entries: [],
    documents: [
      { type: 'bank', label: '网银查询截图', date: '2026-04-25', totalAmount: 0, payer: '工商银行', payeeName: '本公司', content: '工行账户余额查询', refNo: 'HD202604250011' }]},
  {
    date: '2026-04-26',
    role: 'accountant',
    title: '期末结转损益',
    tags: ['期末'],
    difficulty: 3,
    description: '月末结转所有损益类科目余额至"本年利润"，计算本月净利润。',
    tip: '期末结转损益是每月必做的重要步骤。先将收入类科目结转至本年利润贷方，再将费用类科目结转至本年利润借方。差额即为本月净利润。注意财务费用如有贷方余额（利息收入>手续费），需作为收入结转。',
    entries: [
      { subjectCode: '6001', debit: 285500, credit: 0, summary: '结转主营业务收入', explanation: '主营业务收入结转至本年利润。收入类科目期末余额转出，余额归零。本月收入合计=88,000+100,000+57,000+50,000-7,500-2,000=285,500元。' },
      { subjectCode: '6603', debit: 2300, credit: 0, summary: '结转财务费用-利息收入', explanation: '财务费用结转至本年利润。利息收入2,300元扣除手续费350元后，净贷方余额1,950元作为收入结转。' },
      { subjectCode: '6401', debit: 0, credit: 174500, summary: '结转主营业务成本', explanation: '主营业务成本转出，余额归零。已销商品成本=114,000+65,000-4,500=174,500元。' },
      { subjectCode: '6403', debit: 0, credit: 2736.5, summary: '结转税金及附加', explanation: '税金及附加转出2,736.50元（计提的城建税及教育费附加）。' },
      { subjectCode: '6601', debit: 0, credit: 35800, summary: '结转销售费用', explanation: '销售费用转出33,300元（含销售运费3,000+广告费6,000+差旅费2,800+采购运费1,500+销售人员工资20,000）。' },
      { subjectCode: '6602', debit: 0, credit: 36420, summary: '结转管理费用', explanation: '管理费用转出36,420元（含水电费3,200+办公用品860+折旧2,360+管理人员工资30,000）。' },
      { subjectCode: '660201', debit: 0, credit: 580, summary: '结转660201', explanation: '660201转出，余额归零。' },
      { subjectCode: '6701', debit: 0, credit: 5000, summary: '结转资产减值损失', explanation: '资产减值损失转出5,000元（计提的坏账准备）。' },
      { subjectCode: '4103', debit: 0, credit: 32763.5, summary: '结转各项费用支出', explanation: '本年利润减少记借方。将本期所有费用转入本年利润：主营业务成本174,500+税金及附加2,736.50+销售费用33,300+管理费用36,420+资产减值损失5,000=251,956.50元。本月净利润=287,450-251,956.50=35,493.50元。' }
    ],
    documents: [
      { type: 'text', label: '损益计算表', docTitle: '2026年4月损益计算表', content: '一、营业收入：285,500元\n减：营业成本：174,500元\n减：税金及附加：2,736.50元\n减：销售费用：33,300元\n减：管理费用：36,420元\n减：资产减值损失：5,000元\n加：利息收入（冲财务费用）：1,950元\n二、营业利润：35,493.50元\n三、净利润：35,493.50元', stampText: '财务专用章' }]},
  {
    date: '2026-04-27',
    title: '月末银行存款余额核对',
    tags: ['出纳', '期末'],
    difficulty: 1,
    description: '月末核对工商银行日记账余额与银行对账单是否一致，编制银行存款余额调节表。本月工行账户期初余额500,000元，本期借方发生额261,150元，本期贷方发生额107,750元，期末余额653,400元。',
    tip: '月末出纳必须核对银行日记账与银行对账单余额，如有未达账项需编制余额调节表。这是出纳每月必做的基础工作，确保资金安全。',
    role: 'cashier',
    entries: [],
    documents: [
      { type: 'text', label: '银行对账单', docTitle: '中国工商银行对账单（2026年4月）', content: '账号：xxxxxxxxxxxx\n期初余额：500,000.00\n本期借方发生额：99,440+55,000+64,410+40,000+2,300=261,150.00\n本期贷方发生额：3,000+6,000+45,200+350+3,200+50,000=107,750.00\n期末余额：653,400.00\n\n请与银行存款日记账核对，如有差异编制余额调节表。', stampText: '中国工商银行 业务专用章' }]},

  {
    date: '2026-04-30',
    role: 'accountant',
    title: '模拟纳税申报',
    tags: ['期末', '税费'],
    difficulty: 1,
    description: '根据本月已完成的账务处理，进行模拟纳税申报。系统已自动计算应缴税额（增值税和企业所得税），请前往纳税申报页面核对并提交。',
    tip: '纳税申报是企业每月的法定义务。确认所有凭证已过账、期末结转已完成后，前往纳税申报页面核对各项税额后点击"提交申报"。',
    entries: [],
    documents: [
      { type: 'text', label: '纳税申报提醒', docTitle: '4月纳税申报提醒', content: '申报期间：2026-04-30\n\n请前往纳税申报页面：\n1. 核对增值税申报表数据\n2. 核对企业所得税申报表数据\n3. 确认无误后点击"提交申报"\n\n纳税申报是企业每月必做的合规义务，请按时完成。', stampText: '财务专用章' }]},
]
export default tasks
