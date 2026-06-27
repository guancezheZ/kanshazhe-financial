/**
 * 服务业（管理咨询/IT咨询/软件开发）3月教学任务
 *
 * 企业：雲帆管理咨询有限公司
 * 本月主题：📊 季末税务·项目交付
 *   - 项目B终验交付（全年最大收入月）
 *   - Q1季度企业所得税预缴
 *   - C项目持续执行
 *   - Q1季末财务分析
 *
 * 知识点标签：项目核算、收入确认、人工成本、费用管理、工资社保、税费、往来管理、期末
 */

const mar = [
  // ═══════════════════════════════════════════
  // 第一周：工资发放 + 纳税申报（3月2日~3月8日）
  // ═══════════════════════════════════════════
  {
    date: '2026-03-02', role: 'accountant', title: '发放2月员工工资', tags: ["工资社保"], difficulty: 1,
    tip: '发放上月计提工资，冲减应付职工薪酬。',
    description: '银行代发2月工资。应发180,000元，代扣社保18,000元、公积金9,000元、个税4,000元，实发149,000元。',
    entries: [
      { subjectCode: '221101', summary: '发放2月工资', debit: 180000, credit: 0, explanation: '应付职工薪酬减少。' },
      { subjectCode: '100201', summary: '实发工资', debit: 0, credit: 149000, explanation: '银行存款减少。实发=180,000-18,000-9,000-4,000=149,000。' },
      { subjectCode: '224101', summary: '代扣个人社保', debit: 0, credit: 18000, explanation: '其他应付款——个人社保增加。' },
      { subjectCode: '224102', summary: '代扣个人公积金', debit: 0, credit: 9000, explanation: '其他应付款——个人公积金增加。' },
      { subjectCode: '222110', summary: '代扣个税', debit: 0, credit: 4000, explanation: '应交个人所得税增加。' }],
    documents: [
      { type: 'bank', label: '代发工资回单', date: '2026-03-02', totalAmount: 149000, payer: '雲帆管理咨询有限公司', payeeName: '员工代发户', content: '2月工资代发（共48人）', refNo: 'HD202603020001' },
      { type: 'text', label: '工资表', docTitle: '2 月 工 资 发 放 表', stampText: '人力资源部\n工资专用章', content: '应发：180,000\n扣款：社保18,000+公积金9,000+个税4,000=31,000\n实发：149,000\n\n制表：王出纳\n审核：李会计' ,
      headers: [
        '项目',
        '内容'
      ],
      rows: [
        [
          '应发',
          '180,000'
        ],
        [
          '扣款',
          '社保18,000+公积金9,000+个税4,000=31,000'
        ],
        [
          '实发',
          '149,000'
        ],
        [
          '制表',
          '王出纳'
        ],
        [
          '审核',
          '李会计'
        ],
      ]}]
  },
  {
    date: '2026-03-03', role: 'accountant', title: '缴纳2月社保及公积金', tags: ["工资社保"], difficulty: 1,
    tip: '企业部分冲应付职工薪酬，个人部分冲其他应付款。',
    description: '缴纳2月社保公积金。企业社保35,500+企业公积金18,500+个人社保18,000+个人公积金9,000=81,000元。',
    entries: [
      { subjectCode: '221102', summary: '缴纳企业社保', debit: 35500, credit: 0 }, { subjectCode: '224101', summary: '缴纳个人社保', debit: 18000, credit: 0 },
      { subjectCode: '221102', summary: '缴纳企业公积金', debit: 18500, credit: 0 }, { subjectCode: '224102', summary: '缴纳个人公积金', debit: 9000, credit: 0 },
      { subjectCode: '100201', summary: '支付社保公积金', debit: 0, credit: 81000 }],
    documents: [{ type: 'bank', label: '扣款回单', date: '2026-03-03', totalAmount: 81000, payer: '雲帆管理咨询有限公司', payeeName: '社保基金管理中心', content: '2月社保+公积金', refNo: 'HD202603030002' }]
  },
  {
    date: '2026-03-04', role: 'accountant', title: '缴纳2月增值税及附加税', tags: ["税费"], difficulty: 1,
    tip: '上月增值税需在当月15日前申报缴纳。',
    description: '缴纳2月增值税14,880元、城建税1,042元、教育附加446元、地方教育附加298元。合计16,666元。',
    entries: [
      { subjectCode: '222101', summary: '缴纳2月增值税', debit: 14880, credit: 0 }, { subjectCode: '222103', summary: '缴纳城建税', debit: 1042, credit: 0 },
      { subjectCode: '222104', summary: '缴纳教育附加', debit: 446, credit: 0 }, { subjectCode: '222104', summary: '缴纳地方教育附加', debit: 298, credit: 0 },
      { subjectCode: '100201', summary: '缴纳税款', debit: 0, credit: 16666 }],
    documents: [{ type: 'bank', label: '缴税回单', date: '2026-03-04', totalAmount: 16666, payer: '雲帆管理咨询有限公司', payeeName: '北京市税务局', content: '2月增值税及附加税', refNo: 'HD202603040003' }]
  },
  {
    date: '2026-03-05', role: 'accountant', title: '项目B终验交付·确认尾款收入', tags: ["项目核算", "收入确认"], difficulty: 2,
    tip: '项目终验完成，确认剩余20%尾款收入。借：应收账款，贷：主营业务收入、应交税费。',
    description: 'B公司战略咨询项目终验通过，确认终验收入120,000元（合同总额600,000×20%），增值税6%=7,200元。开具发票并挂应收。',
    entries: [
      { subjectCode: '1122', summary: 'B公司终验款', debit: 127200, credit: 0, explanation: '应收账款增加。B项目终验尾款20%。' },
      { subjectCode: '6001', summary: '项目B终验收入', debit: 0, credit: 120000, explanation: '主营业务收入增加。终验交付收入。' },
      { subjectCode: '222101', summary: '销项税额6%', debit: 0, credit: 7200, explanation: '应交增值税增加。120,000×6%=7,200。' }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '北京', invoiceType: '专用', invoiceNo: '1100432114', date: '2026年03月05日', buyer: 'B公司', seller: '雲帆管理咨询有限公司', lineItems: [{ name: '管理咨询服务（终验尾款）', unit: '项', qty: 1, price: 120000, amount: 120000, taxRate: '6%', tax: 7200 }], totalAmount: 127200 },
      { type: 'text', label: '终验报告', docTitle: '项 目 终 验 确 认 书', date: '2026-03-05', stampText: 'B公司\n项目验收章', content: '项目：2026年度战略管理咨询\n终验结论：全部阶段通过 ✓\n交付物清单：战略规划方案、组织设计、流程优化、实施辅导记录\n\n甲方代表：张总   乙方：王顾问' ,
      headers: [
        '项目',
        '内容'
      ],
      rows: [
        [
          '项目',
          '2026年度战略管理咨询'
        ],
        [
          '终验结论',
          '全部阶段通过 ✓'
        ],
        [
          '交付物清单',
          '战略规划方案、组织设计、流程优化、实施辅导记录'
        ],
        [
          '甲方代表',
          '张总   乙方：王顾问'
        ],
      ]}]
  },
  {
    date: '2026-03-06', role: 'accountant', title: '收到B公司终验款及1月尾款', tags: ["往来管理"], difficulty: 1,
    tip: '同时收到两笔回款冲减应收账款。',
    description: '收到B公司支付的终验尾款127,200元及1月咨询费尾款92,880元。合计220,080元。',
    entries: [
      { subjectCode: '100201', summary: '收到B公司款', debit: 220080, credit: 0, explanation: '银行存款增加。' },
      { subjectCode: '1122', summary: 'B公司回款', debit: 0, credit: 220080, explanation: '应收账款减少。两笔同时收回。' }],
    documents: [{ type: 'bank', label: '收款回单', date: '2026-03-06', totalAmount: 220080, payer: 'B公司', payeeName: '雲帆管理咨询有限公司', content: '终验款+1月尾款', refNo: 'HD202603060004' }]
  },
  {
    date: '2026-03-07', role: 'accountant', title: '支付3月写字楼租金', tags: ["费用管理"], difficulty: 1,
    description: '支付3月写字楼租金及物业费25,000元。',
    entries: [
      { subjectCode: '660205', summary: '3月房租', debit: 22000, credit: 0 }, { subjectCode: '660205', summary: '3月物业费', debit: 3000, credit: 0 },
      { subjectCode: '100201', summary: '支付租金', debit: 0, credit: 25000 }],
    documents: [{ type: 'receipt', label: '收据', docTitle: '房 屋 租 赁 收 据', date: '2026-03-07', totalAmount: 25000, payer: '雲帆管理咨询有限公司', stampText: 'XX物业\n财务专用章', items: [{ name: '3月租金', qty: 1, price: 22000, amount: 22000 }, { name: '3月物业费', qty: 1, price: 3000, amount: 3000 }]}]
  },
  {
    date: '2026-03-08', role: 'accountant', title: '缴纳代扣个税及Q1所得税预缴', tags: ["税费"], difficulty: 2,
    tip: 'Q1季度预缴企业所得税=Q1利润总额×25%。需在4月15日前完成。',
    description: '缴纳2月代扣个税4,000元；预缴Q1企业所得税（按预估利润的25%预缴）15,000元。合计19,000元。',
    entries: [
      { subjectCode: '222110', summary: '缴纳个税', debit: 4000, credit: 0 }, { subjectCode: '222106', summary: '预缴Q1所得税', debit: 15000, credit: 0 },
      { subjectCode: '100201', summary: '缴纳税款', debit: 0, credit: 19000 }],
    documents: [{ type: 'bank', label: '缴税回单', date: '2026-03-08', totalAmount: 19000, payer: '雲帆管理咨询有限公司', payeeName: '北京市税务局', content: '个税+预缴Q1所得税', refNo: 'HD202603080005' }]
  },
  // ═══════════════════════════════════════════
  // 第二周：C项目执行 + 日常运营（3月9日~3月15日）
  // ═══════════════════════════════════════════
  {
    date: '2026-03-09', role: 'accountant', title: '项目C·按里程碑确认第一阶段收入', tags: ["项目核算", "收入确认"], difficulty: 2,
    tip: 'C项目固定费率合同，按里程碑确认收入。',
    description: 'C公司IT咨询项目完成需求分析阶段，确认第一阶段收入80,000元（合同总额400,000×20%），增值税6%=4,800元。从预收款中冲减。',
    entries: [
      { subjectCode: '2232', summary: 'C公司预收款转收入', debit: 84800, credit: 0, explanation: '合同负债减少。' },
      { subjectCode: '6001', summary: '项目C第一阶段收入', debit: 0, credit: 80000, explanation: '主营业务收入增加。需求分析阶段。' },
      { subjectCode: '222101', summary: '销项税额6%', debit: 0, credit: 4800, explanation: '应交增值税增加。80,000×6%=4,800。' }],
    documents: [
      { type: 'invoice', label: '增值税专用发票', region: '北京', invoiceType: '专用', invoiceNo: '1100432115', date: '2026年03月09日', buyer: 'C商业银行', seller: '雲帆管理咨询有限公司', lineItems: [{ name: 'IT咨询（需求分析阶段）', unit: '项', qty: 1, price: 80000, amount: 80000, taxRate: '6%', tax: 4800 }], totalAmount: 84800 },
      { type: 'text', label: '阶段验收', docTitle: '阶 段 验 收 确 认 单', date: '2026-03-09', stampText: 'C银行\n项目章', content: '项目：核心银行系统升级咨询\n阶段：需求分析\n结论：通过 ✓\n\n甲方：张经理\n乙方：李顾问' ,
      headers: [
        '项目',
        '内容'
      ],
      rows: [
        [
          '项目',
          '核心银行系统升级咨询'
        ],
        [
          '阶段',
          '需求分析'
        ],
        [
          '结论',
          '通过 ✓'
        ],
        [
          '甲方',
          '张经理'
        ],
        [
          '乙方',
          '李顾问'
        ],
      ]}]
  },
  {
    date: '2026-03-10', role: 'accountant', title: '项目C·供应商选型差旅', tags: ["项目核算"], difficulty: 2,
    tip: '为项目发生的差旅费按项目归集到劳务成本。',
    description: '项目C团队赴深圳考察潜在系统供应商，差旅费12,000元。',
    entries: [
      { subjectCode: '520102', summary: '项目C选型差旅', debit: 12000, credit: 0, explanation: '劳务成本——差旅费增加。' },
      { subjectCode: '100201', summary: '支付差旅费', debit: 0, credit: 12000 }],
    documents: [{ type: 'receipt', label: '报销单', docTitle: '差 旅 费 报 销 单', date: '2026-03-10', totalAmount: 12000, payer: '雲帆管理咨询有限公司', stampText: '财务专用章', items: [{ name: '北京→深圳 往返机票×3', qty: 6, price: 1200, amount: 7200 }, { name: '住宿费（3天×3间）', qty: 9, price: 400, amount: 3600 }, { name: '市内交通', qty: 1, price: 1200, amount: 1200 }]}]
  },
  {
    date: '2026-03-11', role: 'accountant', title: '支付3月水电费及通信费', tags: ["费用管理"], difficulty: 1,
    description: '支付3月水电费4,500元、网络通信费2,000元。合计6,500元。',
    entries: [
      { subjectCode: '660203', summary: '3月水电费', debit: 4500, credit: 0 }, { subjectCode: '660203', summary: '3月网络费', debit: 2000, credit: 0 },
      { subjectCode: '100201', summary: '支付费用', debit: 0, credit: 6500 }],
    documents: [{ type: 'receipt', label: '电费单', docTitle: '电 费 缴 费 凭 证', date: '2026-03-11', totalAmount: 4500, payer: '雲帆管理咨询有限公司', stampText: '国家电网', items: [{ name: '3月用电 4,500kWh', qty: 4500, price: 1, amount: 4500 }]}, { type: 'receipt', label: '通信费', docTitle: '通 信 服 务 发 票', date: '2026-03-11', totalAmount: 2000, payer: '雲帆管理咨询有限公司', stampText: '中国联通', items: [{ name: '企业宽带及电话费（3月）', qty: 1, price: 2000, amount: 2000 }]}]
  },
  {
    date: '2026-03-12', role: 'accountant', title: '摊销SaaS费及计提折旧', tags: ["费用管理"], difficulty: 2,
    description: '摊销3月SaaS费3,000元；计提3月折旧2,343元。合计5,343元。',
    entries: [
      { subjectCode: '660206', summary: '摊销SaaS费', debit: 3000, credit: 0 }, { subjectCode: '660205', summary: '折旧费', debit: 2343, credit: 0 },
      { subjectCode: '1208', summary: '摊销SaaS年费', debit: 0, credit: 3000 }, { subjectCode: '1602', summary: '累计折旧', debit: 0, credit: 2343 }],
    documents: [{ type: 'text', label: '摊销折旧表', docTitle: '摊 销 折 旧 计 提 表', stampText: '财务专用章', content: 'SaaS摊销：3,000\n折旧：电脑1,583+桌椅760=2,343\n合计：5,343\n\n制表：李会计' ,
    headers: [
      '项目',
      '内容'
    ],
    rows: [
      [
        'SaaS摊销',
        '3,000'
      ],
      [
        '折旧',
        '电脑1,583+桌椅760=2,343'
      ],
      [
        '合计',
        '5,343'
      ],
      [
        '制表',
        '李会计'
      ],
    ]}]
  },
  {
    date: '2026-03-13', role: 'accountant', title: '报销项目C资料及通讯费', tags: ["项目核算"], difficulty: 2,
    description: '项目C报销供应商技术资料及长途通讯费4,500元。',
    entries: [
      { subjectCode: '520104', summary: '项目C资料通讯', debit: 4500, credit: 0, explanation: '劳务成本——其他直接费增加。' },
      { subjectCode: '100201', summary: '报销付款', debit: 0, credit: 4500 }],
    documents: [{ type: 'receipt', label: '报销单', docTitle: '费 用 报 销 单', date: '2026-03-13', totalAmount: 4500, payer: '雲帆管理咨询有限公司', stampText: '财务专用章', items: [{ name: '供应商技术资料购买', qty: 1, price: 3000, amount: 3000 }, { name: '长途通讯费', qty: 1, price: 1500, amount: 1500 }]}]
  },
  {
    date: '2026-03-14', role: 'accountant', title: '银行手续费', tags: ["资金管理"], difficulty: 1,
    description: '银行扣收3月手续费550元；活期结息1,200元。',
    entries: [
      { subjectCode: '6603', summary: '手续费', debit: 550, credit: 0 }, { subjectCode: '100201', summary: '扣费', debit: 0, credit: 550 },
      { subjectCode: '100201', summary: '结息', debit: 1200, credit: 0 }, { subjectCode: '6603', summary: '利息收入', debit: 0, credit: 1200 }],
    documents: [{ type: 'bank', label: '回单', date: '2026-03-14', totalAmount: 550, payer: '雲帆管理咨询有限公司', payeeName: '工商银行', content: '3月手续费', refNo: 'HD202603140006' }, { type: 'bank', label: '结息单', date: '2026-03-14', totalAmount: 1200, payer: '工商银行', payeeName: '雲帆管理咨询有限公司', content: '3月结息', refNo: 'HD202603140007' }]
  },
  {
    date: '2026-03-15', role: 'accountant', title: '计提短期借款利息', tags: ["资金管理"], difficulty: 2,
    description: '计提3月短期借款利息725元。累计1-3月应付2,175元。',
    entries: [
      { subjectCode: '6603', summary: '3月借款利息', debit: 725, credit: 0, explanation: '财务费用增加。' },
      { subjectCode: '2231', summary: '应付利息', debit: 0, credit: 725 }],
    documents: [{ type: 'text', label: '利息计算表', docTitle: '利 息 计 提 表', stampText: '财务专用章', content: '本金200,000×4.35%÷12=725\n累计1-3月：2,175\n\n制表：李会计' ,
    headers: [
      '项目',
      '内容'
    ],
    rows: [
      [
        '累计1-3月',
        '2,175'
      ],
      [
        '制表',
        '李会计'
      ],
    ]}]
  },
  // ═══════════════════════════════════════════
  // 第三周：B项目结算 + 新机会（3月16日~3月22日）
  // ═══════════════════════════════════════════
  {
    date: '2026-03-16', role: 'accountant', title: 'B项目总结·结转全部剩余劳务成本', tags: ["项目核算", "期末"], difficulty: 3,
    tip: '项目完工后，将剩余劳务成本全部结转至主营业务成本。',
    description: 'B项目已终验，结转剩余劳务成本。项目B本月人工成本66,000元（全月工时占比）+期初余额0=66,000元全额结转。',
    entries: [
      { subjectCode: '6401', summary: '结转B项目人工', debit: 66000, credit: 0, explanation: '主营业务成本增加。' },
      { subjectCode: '520101', summary: '结转人工成本', debit: 0, credit: 66000, explanation: '劳务成本减少。B项目全部成本已结转完毕。' }],
    documents: [{ type: 'text', label: '成本结算表', docTitle: 'B 项 目 成 本 结 算 表', date: '2026-03-16', stampText: '财务专用章', content: '项目B（已终验）\n1月已结转：88,000\n2月已结转：113,500\n3月人工：66,000\n累计总成本：267,500\n总收入：600,000\n项目毛利：332,500（55.4%）\n\n制表：李会计\n审核：赵主管' ,
    headers: [
      '项目',
      '内容'
    ],
    rows: [
      [
        '1月已结转',
        '88,000'
      ],
      [
        '2月已结转',
        '113,500'
      ],
      [
        '3月人工',
        '66,000'
      ],
      [
        '累计总成本',
        '267,500'
      ],
      [
        '总收入',
        '600,000'
      ],
      [
        '项目毛利',
        '332,500（55.4%）'
      ],
      [
        '制表',
        '李会计'
      ],
      [
        '审核',
        '赵主管'
      ],
    ]}]
  },
  {
    date: '2026-03-17', role: 'accountant', title: 'B项目利润核算·确认项目奖金', tags: ["项目核算"], difficulty: 2,
    tip: '项目完成后按净利润的一定比例计提项目奖金，计入管理费用。',
    description: 'B项目圆满结束，按项目利润的10%计提项目奖金33,250元，计入管理费用（待年终统一发放）。',
    entries: [
      { subjectCode: '660203', summary: 'B项目奖金', debit: 33250, credit: 0, explanation: '管理费用——奖金增加。项目利润332,500×10%。' },
      { subjectCode: '221101', summary: '应付项目奖金', debit: 0, credit: 33250, explanation: '应付职工薪酬——奖金增加。' }],
    documents: [{ type: 'text', label: '项目奖金计算表', docTitle: '项 目 奖 金 计 提 表', date: '2026-03-17', stampText: '财务专用章', content: '项目：B公司战略咨询\n项目毛利：332,500\n计提比例：10%\n计提金额：33,250\n待年终考核后发放。\n\n制表：李会计\n审核：赵总' ,
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '项目',
        'B公司战略咨询'
      ],
      [
        '项目毛利',
        '332,500'
      ],
      [
        '计提比例',
        '10%'
      ],
      [
        '计提金额',
        '33,250'
      ],
      [
        '制表',
        '李会计'
      ],
      [
        '审核',
        '赵总'
      ],
    ]}]
  },
  {
    date: '2026-03-18', role: 'accountant', title: '购买新办公桌椅（扩招）', tags: ["费用管理"], difficulty: 1,
    description: '因团队扩招，新购办公桌椅5套×1,500元=7,500元。',
    entries: [
      { subjectCode: '160105', summary: '购办公桌椅', debit: 7500, credit: 0, explanation: '固定资产增加。' },
      { subjectCode: '100201', summary: '付款', debit: 0, credit: 7500 }],
    documents: [{ type: 'invoice', label: '增值税普通发票', region: '北京', invoiceNo: '1100365999', date: '2026年03月18日', buyer: '雲帆管理咨询有限公司', seller: '京华家具', lineItems: [{ name: '办公桌椅套装', qty: 5, price: 1500, amount: 7500 }], totalAmount: 7500 }]
  },
  {
    date: '2026-03-19', role: 'accountant', title: 'D公司新签培训合同·预收款', tags: ["项目核算", "收入确认"], difficulty: 2,
    tip: '新业务线——企业管理培训服务。预收款计入合同负债。',
    description: '与D公司签订企业管理内训合同，合同总额90,000元，签约时支付50%预付款45,000元。已到账。',
    entries: [
      { subjectCode: '100201', summary: 'D公司培训预收款', debit: 45000, credit: 0 },
      { subjectCode: '2232', summary: '预收D公司培训费', debit: 0, credit: 45000 }],
    documents: [{ type: 'bank', label: '收款回单', date: '2026-03-19', totalAmount: 45000, payer: 'D公司', payeeName: '雲帆管理咨询有限公司', content: '企业管理内训预付款（50%）', refNo: 'HD202603190008' }, { type: 'text', label: '培训合同', docTitle: '企 业 管 理 内 训 合 同', stampText: '合同专用章', content: '甲方：D公司\n乙方：雲帆管理咨询有限公司\n课程：《战略执行与绩效管理》\n课时：2天（16学时）\n费用：90,000元（含教材）\n培训日期：2026年3月25-26日' ,
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '甲方',
        'D公司'
      ],
      [
        '乙方',
        '雲帆管理咨询有限公司'
      ],
      [
        '课程',
        '《战略执行与绩效管理》'
      ],
      [
        '课时',
        '2天（16学时）'
      ],
      [
        '费用',
        '90,000元（含教材）'
      ],
      [
        '培训日期',
        '2026年3月25-26日'
      ],
    ]}]
  },
  {
    date: '2026-03-20', role: 'accountant', title: '购买办公用品及培训教材', tags: ["费用管理"], difficulty: 1,
    description: '采购办公用品1,800元；D公司内训教材印刷费2,500元。合计4,300元。',
    entries: [
      { subjectCode: '660201', summary: '办公用品', debit: 1800, credit: 0 }, { subjectCode: '520104', summary: '培训教材', debit: 2500, credit: 0, explanation: 'D项目直接成本。' },
      { subjectCode: '100201', summary: '付款', debit: 0, credit: 4300 }],
    documents: [{ type: 'receipt', label: '发票', docTitle: '商 品 销 售 发 票', date: '2026-03-20', totalAmount: 4300, payer: '雲帆管理咨询有限公司', stampText: '京东办公', items: [{ name: '办公用品', qty: 1, price: 1800, amount: 1800 }, { name: '培训教材印刷', qty: 500, price: 5, amount: 2500 }]}]
  },
  {
    date: '2026-03-21', role: 'accountant', title: '提取备用金', tags: ["资金管理"], difficulty: 1,
    description: '提取备用金2,000元。',
    entries: [
      { subjectCode: '1001', summary: '提取备用金', debit: 2000, credit: 0 },
      { subjectCode: '100201', summary: '提取备用金', debit: 0, credit: 2000 }],
    documents: [{ type: 'bank', label: '现金支票', date: '2026-03-21', totalAmount: 2000, payer: '雲帆管理咨询有限公司', payeeName: '本公司（现金）', content: '提取备用金', refNo: 'HD202603210009' }]
  },
  {
    date: '2026-03-22', role: 'accountant', title: '举办D公司内训·确认培训收入', tags: ["项目核算", "收入确认"], difficulty: 2,
    tip: '培训完成即确认收入，冲减合同负债。借：合同负债，贷：主营业务收入、应交税费。',
    description: '3月25-26日为D公司完成企业内训，确认全额培训收入90,000元，增值税6%=5,400元。预收款45,000元冲减后差额挂应收。',
    entries: [
      { subjectCode: '2232', summary: 'D公司预收款转收入', debit: 45000, credit: 0, explanation: '合同负债减少。' },
      { subjectCode: '1122', summary: 'D公司培训尾款', debit: 50400, credit: 0, explanation: '应收账款增加。尾款50%待收。' },
      { subjectCode: '6001', summary: '培训收入', debit: 0, credit: 90000, explanation: '主营业务收入增加。D公司内训收入。' },
      { subjectCode: '222101', summary: '销项税额6%', debit: 0, credit: 5400, explanation: '应交增值税增加。' }],
    documents: [{ type: 'invoice', label: '增值税专用发票', region: '北京', invoiceType: '专用', invoiceNo: '1100432116', date: '2026年03月25日', buyer: 'D公司', seller: '雲帆管理咨询有限公司', lineItems: [{ name: '企业管理内训服务', unit: '项', qty: 1, price: 90000, amount: 90000, taxRate: '6%', tax: 5400 }], totalAmount: 95400 }, { type: 'text', label: '培训签到表', docTitle: '培 训 签 到 及 评 估 表', stampText: 'D公司\n培训部', content: '课程：《战略执行与绩效管理》\n时间：2026.3.25-3.26\n参训：45人\n满意度：4.8/5.0\n\n培训部确认：✓' ,
    headers: [
      '项目',
      '内容'
    ],
    rows: [
      [
        '课程',
        '《战略执行与绩效管理》'
      ],
      [
        '时间',
        '2026.3.25-3.26'
      ],
      [
        '参训',
        '45人'
      ],
      [
        '满意度',
        '4.8/5.0'
      ],
      [
        '培训部确认',
        '✓'
      ],
    ]}]
  },
  // ═══════════════════════════════════════════
  // 第四周：月末计提 + Q1季末结转（3月23日~3月31日）
  // ═══════════════════════════════════════════
  {
    date: '2026-03-23', role: 'accountant', title: '计提3月员工工资', tags: ["工资社保"], difficulty: 2,
    description: '计提3月工资。项目人员142,000元+管理人员43,000元=185,000元。',
    entries: [
      { subjectCode: '520101', summary: '项目人员工资', debit: 142000, credit: 0 }, { subjectCode: '660203', summary: '管理工资', debit: 43000, credit: 0 },
      { subjectCode: '221101', summary: '应付3月工资', debit: 0, credit: 185000 }],
    documents: [{ type: 'text', label: '工资表', docTitle: '3 月 工 资 汇 总 表', stampText: '人力资源部', content: '项目人员：142,000\n管理人员：43,000\n合计：185,000\n\n制表：王出纳\n审核：李会计' ,
    headers: [
      '项目',
      '内容'
    ],
    rows: [
      [
        '项目人员',
        '142,000'
      ],
      [
        '管理人员',
        '43,000'
      ],
      [
        '合计',
        '185,000'
      ],
      [
        '制表',
        '王出纳'
      ],
      [
        '审核',
        '李会计'
      ],
    ]}]
  },
  {
    date: '2026-03-24', role: 'accountant', title: '计提企业社保及公积金', tags: ["工资社保"], difficulty: 2,
    description: '计提3月企业社保公积金。项目社保28,000+公积金14,000；管理社保9,000+公积金4,500。合计55,500元。',
    entries: [
      { subjectCode: '520101', summary: '项目社保', debit: 28000, credit: 0 }, { subjectCode: '520101', summary: '项目公积金', debit: 14000, credit: 0 },
      { subjectCode: '660203', summary: '管理社保', debit: 9000, credit: 0 }, { subjectCode: '660203', summary: '管理公积金', debit: 4500, credit: 0 },
      { subjectCode: '221102', summary: '应付企业社保', debit: 0, credit: 37000 }, { subjectCode: '221102', summary: '应付企业公积金', debit: 0, credit: 18500 }],
    documents: [{ type: 'text', label: '社保计提表', docTitle: '社 保 公 积 金 计 提 表', stampText: '财务专用章', content: '项目人员：社保28,000+公积金14,000=42,000\n管理人员：社保9,000+公积金4,500=13,500\n合计：55,500\n\n制表：李会计' ,
    headers: [
      '项目',
      '内容'
    ],
    rows: [
      [
        '项目人员',
        '社保28,000+公积金14,000=42,000'
      ],
      [
        '管理人员',
        '社保9,000+公积金4,500=13,500'
      ],
      [
        '合计',
        '55,500'
      ],
      [
        '制表',
        '李会计'
      ],
    ]}]
  },
  {
    date: '2026-03-25', role: 'accountant', title: '计提3月城建税及教育附加', tags: ["税费"], difficulty: 2,
    description: '计提3月附加税。本月销项税额4,800+7,200+5,400=17,400元。',
    entries: [
      { subjectCode: '6403', summary: '城建税', debit: 1218, credit: 0, explanation: '17,400×7%。' },
      { subjectCode: '6403', summary: '教育附加', debit: 522, credit: 0, explanation: '17,400×3%。' },
      { subjectCode: '6403', summary: '地方教育附加', debit: 348, credit: 0, explanation: '17,400×2%。' },
      { subjectCode: '222103', summary: '应交城建税', debit: 0, credit: 1218 },
      { subjectCode: '222104', summary: '应交教育附加', debit: 0, credit: 522 },
      { subjectCode: '222104', summary: '应交地方教育附加', debit: 0, credit: 348 }],
    documents: [{ type: 'text', label: '税费计算表', docTitle: '附 加 税 计 提 表', stampText: '财务专用章', content: '应纳增值税：17,400\n城建税（7%）：1,218\n教育附加（3%）：522\n地方教育附加（2%）：348\n合计：2,088\n\n制表：李会计' ,
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '应纳增值税',
        '17,400'
      ],
      [
        '城建税（7%）',
        '1,218'
      ],
      [
        '教育附加（3%）',
        '522'
      ],
      [
        '地方教育附加（2%）',
        '348'
      ],
      [
        '合计',
        '2,088'
      ],
      [
        '制表',
        '李会计'
      ],
    ]}]
  },
  {
    date: '2026-03-26', role: 'accountant', title: '计提Q1企业所得税', tags: ["税费"], difficulty: 3,
    tip: 'Q1累计利润总额×25%。每月预缴可在次年汇算清缴时多退少补。',
    description: '计提Q1企业所得税。Q1累计利润总额估算约为248,000+120,000+80,000+90,000-88,000-113,500-66,000-33,250-各项费用≈约50,000元。计提所得税=50,000×25%=12,500元。',
    entries: [
      { subjectCode: '6801', summary: 'Q1所得税费用', debit: 12500, credit: 0, explanation: '所得税费用增加。' },
      { subjectCode: '222106', summary: '应交Q1所得税', debit: 0, credit: 12500, explanation: '应交企业所得税增加。' }],
    documents: [{ type: 'text', label: '所得税计算表', docTitle: 'Q1 企 业 所 得 税 计 提 表', stampText: '财务专用章', content: 'Q1利润总额≈50,000\n税率：25%\n所得税费用：12,500\n\n备注：已在3月预缴15,000，本月计提12,500，差额2,500在4月申报时调整。\n\n制表：李会计' ,
    headers: [
      '项目',
      '内容'
    ],
    rows: [
      [
        '税率',
        '25%'
      ],
      [
        '所得税费用',
        '12,500'
      ],
      [
        '备注',
        '已在3月预缴15,000，本月计提12,500，差额2,500在4月申报时调整。'
      ],
      [
        '制表',
        '李会计'
      ],
    ]}]
  },
  {
    date: '2026-03-27', role: 'accountant', title: '期末结转劳务成本至主营业务成本', tags: ["项目核算", "期末"], difficulty: 3,
    tip: '已确认收入的项目（C项目阶段一、D公司培训）结转对应成本。',
    description: '结转3月劳务成本。项目B人工66,000元（全部结清）；项目C人工50,000元（对应阶段一收入）；D培训直接成本2,500元。合计118,500元。',
    entries: [
      { subjectCode: '6401', summary: '结转B项目人工', debit: 66000, credit: 0 }, { subjectCode: '6401', summary: '结转C项目人工', debit: 50000, credit: 0 },
      { subjectCode: '6401', summary: '结转D培训成本', debit: 2500, credit: 0 },
      { subjectCode: '520101', summary: '结转B人工', debit: 0, credit: 66000 }, { subjectCode: '520101', summary: '结转C人工', debit: 0, credit: 50000 },
      { subjectCode: '520104', summary: '结转D培训成本', debit: 0, credit: 2500 }],
    documents: [{ type: 'text', label: '成本结转表', docTitle: '3 月 成 本 结 转 表', stampText: '财务专用章', content: 'B项目（终验）人工：66,000\nC项目（阶段一）人工：50,000\nD培训（已完成）教材：2,500\n合计：118,500\n\n制表：李会计' ,
    headers: [
      '项目',
      '内容'
    ],
    rows: [
      [
        'B项目（终验）人工',
        '66,000'
      ],
      [
        'C项目（阶段一）人工',
        '50,000'
      ],
      [
        'D培训（已完成）教材',
        '2,500'
      ],
      [
        '合计',
        '118,500'
      ],
      [
        '制表',
        '李会计'
      ],
    ]}]
  },
  {
    date: '2026-03-28', role: 'accountant', title: '新增固定资产折旧计算', tags: ["费用管理"], difficulty: 2,
    tip: '新增次月起计提折旧。新购办公桌椅5套7,500元，从4月起计提折旧。',
    description: '本月新增办公桌椅7,500元，残值率5%，使用年限5年。月折旧=7,500×95%÷60=118.75元，下月起计提。',
    entries: [],
    documents: [{ type: 'text', label: '资产卡片', docTitle: '固 定 资 产 卡 片', stampText: '财务专用章', content: '资产名称：办公桌椅×5套\n原值：7,500.00元\n残值率：5%\n折旧年限：5年\n月折旧额：118.75元\n开始计提：2026年4月\n\n制表：李会计' ,
    headers: [
      '项目',
      '金额/说明'
    ],
    rows: [
      [
        '资产名称',
        '办公桌椅×5套'
      ],
      [
        '原值',
        '7,500.00元'
      ],
      [
        '残值率',
        '5%'
      ],
      [
        '折旧年限',
        '5年'
      ],
      [
        '月折旧额',
        '118.75元'
      ],
      [
        '开始计提',
        '2026年4月'
      ],
      [
        '制表',
        '李会计'
      ],
    ]}]
  },
  {
    date: '2026-03-29', role: 'accountant', title: '月末期间损益结转', tags: ["期末"], difficulty: 3,
    description: '结转3月损益科目。收入：B终验120,000+C阶段80,000+D培训90,000=290,000。成本费用：约265,000元。',
    entries: [
      { subjectCode: '6001', summary: '结转收入', debit: 290000, credit: 0, explanation: '主营业务收入结转。' },
      { subjectCode: '4103', summary: '收入转入', debit: 0, credit: 290000, explanation: '本年利润增加。' },
      { subjectCode: '4103', summary: '成本费用转入', debit: 259063, credit: 0, explanation: '本年利润减少。118,500+2,088+125,900+75+12,500=259,063。' },
      { subjectCode: '6401', summary: '结转成本', debit: 0, credit: 118500 }, { subjectCode: '6403', summary: '结转税金', debit: 0, credit: 2088 },
      { subjectCode: '660203', summary: '结转管理费', debit: 0, credit: 125900 }, { subjectCode: '6603', summary: '结转财务费', debit: 0, credit: 75 },
      { subjectCode: '6801', summary: '结转所得税', debit: 0, credit: 12500 }],
    documents: [{ type: 'text', label: '结转表', docTitle: 'Q1 季 末 损 益 结 转 表', stampText: '已结转', content: 'Q1累计（简化）：\n收入：248,000+248,000+290,000=786,000\n成本费用：约732,000\n累计净利润≈54,000\n\n备注：B项目高毛利拉动了Q1整体盈利。' ,
    headers: [
      '项目',
      '内容'
    ],
    rows: [
      [
        '收入',
        '248,000+248,000+290,000=786,000'
      ],
      [
        '成本费用',
        '约732,000'
      ],
      [
        '备注',
        'B项目高毛利拉动了Q1整体盈利。'
      ],
    ]}]
  },
  { date: '2026-03-30', role: 'accountant', title: '购买项目管理软件永久许可', tags: ["费用管理"], difficulty: 2,
    tip: '购买软件许可作为无形资产入账，按5年摊销。',
    description: '购买项目管理软件永久许可24,000元，作为无形资产入账，按月摊销。',
    entries: [
      { subjectCode: '1701', summary: '购项目管理软件', debit: 24000, credit: 0, explanation: '无形资产增加。' },
      { subjectCode: '100201', summary: '付款', debit: 0, credit: 24000 }],
    documents: [{ type: 'bank', label: '转账回单', date: '2026-03-30', totalAmount: 24000, payer: '雲帆管理咨询有限公司', payeeName: 'XX软件科技有限公司', content: '项目管理软件永久许可', refNo: 'HD202603300010' }] },
  {
    date: '2026-03-31', role: 'accountant', title: '模拟纳税申报', tags: ["税费", "期末"], difficulty: 1, tip: 'Q1季度申报含企业所得税。',
    description: '完成3月及Q1账务处理后进行模拟纳税申报。', entries: [], nextAction: 'tax-filing',
    documents: [{ type: 'text', label: '申报提醒', docTitle: 'Q1 季 度 纳 税 申 报 提 醒', stampText: '财务专用章', content: '申报期间：2026年Q1（1-3月）\n截止日期：2026年4月15日\n\n申报税种：\n1. 增值税汇总（3个月）\n2. Q1企业所得税预缴\n3. 城建税及教育附加\n4. 代扣代缴个人所得税\n\n请前往纳税申报页面核对后提交。' }]
  },
]

export default mar
