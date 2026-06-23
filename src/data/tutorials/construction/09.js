/**
 * 建筑业 - 9月教学任务
 *
 * 企业：鼎立建筑工程有限公司
 * 税制：一般纳税人（增值税9%）
 * 准则：CAS 14 新收入准则（投入法/完工百分比）
 * 本月主题：首个项目竣工决算
 */

const tasks = [
  {
    date: '2026-09-01',
    role: 'accountant',
    title: '缴纳8月增值税及附加税费',
    tags: [
      '税费'
    ],
    difficulty: 2,
    description: '缴纳8月增值税86,000元，城建税6,020元，教育费附加4,300元，合计96,320元。',
    tip: '',
    entries: [
      {
        subjectCode: '222101',
        debit: 86000,
        credit: 0,
        summary: '缴增值税',
        explanation: '缴增值税。借86000元。'
      },
      {
        subjectCode: '222103',
        debit: 6020,
        credit: 0,
        summary: '缴城建税',
        explanation: '缴城建税。借6020元。'
      },
      {
        subjectCode: '222104',
        debit: 4300,
        credit: 0,
        summary: '缴附加',
        explanation: '缴附加。借4300元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 96320,
        summary: '支付',
        explanation: '支付。贷96320元。',
        cashFlowItem: 'cf-op4'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '电子缴税付款凭证',
        date: '2026-09-01',
        totalAmount: 96320,
        payer: '鼎立建筑工程有限公司',
        payeeName: '国家金库南京代理支库',
        content: '8月增值税86,000元、城建税6,020元、教育费附加4,300元',
        refNo: 'JS202609010001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 9876 5432 1098 765'
      }
    ]
  },
  {
    date: '2026-09-01',
    role: 'accountant',
    title: '缴纳8月社保及公积金',
    tags: [
      '工资社保'
    ],
    difficulty: 1,
    description: '缴纳8月社保30,875元，公积金15,000元，合计45,875元。',
    tip: '',
    entries: [
      {
        subjectCode: '221102',
        debit: 30875,
        credit: 0,
        summary: '缴社保',
        explanation: '缴社保。借30875元。'
      },
      {
        subjectCode: '221103',
        debit: 15000,
        credit: 0,
        summary: '缴公积金',
        explanation: '缴公积金。借15000元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 45875,
        summary: '支付',
        explanation: '支付。贷45875元。',
        cashFlowItem: 'cf-op3'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '社保公积金缴费回单',
        date: '2026-09-01',
        totalAmount: 45875,
        payer: '鼎立建筑工程有限公司',
        payeeName: '社会保险费征收机构/住房公积金管理中心',
        content: '8月社保30,875元、公积金15,000元',
        refNo: 'SB202609010001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234',
        payeeBank: '社会保险费征收专户',
        payeeAccount: '3201 6500 0123 4567'
      }
    ]
  },
  {
    date: '2026-09-02',
    role: 'accountant',
    title: '发放8月职工工资',
    tags: [
      '工资社保'
    ],
    difficulty: 1,
    description: '代发8月工资125,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '221101',
        debit: 125000,
        credit: 0,
        summary: '发工资',
        explanation: '发工资。借125000元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 125000,
        summary: '代发',
        explanation: '代发。贷125000元。',
        cashFlowItem: 'cf-op3'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '银行代发工资回单',
        date: '2026-09-02',
        totalAmount: 125000,
        payer: '鼎立建筑工程有限公司',
        payeeName: '职工个人工资账户',
        content: '8月职工工资代发',
        refNo: 'WF202609020001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 9876 5432 1098 765'
      }
    ]
  },
  {
    date: '2026-09-03',
    role: 'accountant',
    title: '恒达项目决算审计',
    tags: [
      '工程合同'
    ],
    difficulty: 3,
    description: '恒达地产委托第三方审计事务所对办公楼工程进行竣工决算审计。审定金额调整为610万元（原结算615万元，审减5万元）。审计费8,000元由施工方承担。',
    tip: '竣工审计是工程结算的法定程序。审计结果作为最终结算依据。审减金额冲减收入。',
    entries: [
      {
        subjectCode: '6001',
        debit: 50000,
        credit: 0,
        summary: '冲减收入（审计审减5万元）',
        explanation: '主营业务收入减少。审计后收入调减。'
      },
      {
        subjectCode: '1122',
        debit: 0,
        credit: 50000,
        summary: '应收账款-恒达调减',
        explanation: '应收账款减少。'
      },
      {
        subjectCode: '6602',
        debit: 8000,
        credit: 0,
        summary: '承担审计费',
        explanation: '管理费用增加。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 8000,
        summary: '支付审计费',
        explanation: '银行存款减少。',
        cashFlowItem: 'cf-op6'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '审计报告',
        date: '2026-09-03',
        docTitle: '竣 工 决 算 审 计 报 告',
        content: '送审金额：6,150,000元\n审定金额：6,100,000元\n审减金额：50,000元\n审计意见：工程造价基本合理\n审计机构：XX工程咨询有限公司',
        signature: '审计专用章'
      }
    ]
  },
  {
    date: '2026-09-04',
    role: 'accountant',
    title: '短期借款到期偿还',
    tags: [
      '资金管理'
    ],
    difficulty: 2,
    description: '1月申请的短期借款100万元到期，偿还本金及最后一期利息。年利率4.35%，6个月利息合计21,750元。',
    tip: '借款到期需还本付息。利息已按月预提，最后一个月还需调整。',
    entries: [
      {
        subjectCode: '2001',
        debit: 1000000,
        credit: 0,
        summary: '偿还短期借款本金',
        explanation: '偿还短期借款本金。借1000000元。'
      },
      {
        subjectCode: '6603',
        debit: 3625,
        credit: 0,
        summary: '最后一个月利息（100万×4.35%/12）',
        explanation: '财务费用增加。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 1003625,
        summary: '支付本息',
        explanation: '银行存款减少。',
        cashFlowItem: 'cf-fin2',
        cashFlowExplanation: '偿还债务支付的现金——筹资活动现金流出。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '还款回单',
        date: '2026-09-04',
        totalAmount: 1003625,
        payer: '鼎立建筑工程有限公司',
        payeeName: '贷款银行',
        content: '偿还短期借款本金100万元及最后一期利息3,625元',
        refNo: 'HK202609040001',
        payerBank: '工商银行南京分行营业部',

      payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 9876 5432 1098 765'
      }
    ]
  },
  {
    date: '2026-09-05',
    role: 'accountant',
    title: '市政项目材料采购',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '市政项目采购交通标线、路灯等材料，价款80,000元，增值税10,400元，合计90,400元。',
    tip: '',
    entries: [
      {
        subjectCode: '540102',
        debit: 80000,
        credit: 0,
        summary: '采购市政材料',
        explanation: '采购市政材料。借80000元。'
      },
      {
        subjectCode: '222101',
        debit: 10400,
        credit: 0,
        summary: '进项税额',
        explanation: '进项税额。借10400元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 90400,
        summary: '支付',
        explanation: '支付。贷90400元。',
        cashFlowItem: 'cf-op2'
      }
    ],
    documents: [
      {
        type: 'invoice',
        label: '发票',
        date: '2026-09-05',
        totalAmount: 90400,
        lineItems: [
          {
            name: '热熔标线涂料',
            qty: 10,
            unit: '吨',
            price: 5000,
            amount: 50000
          },
          {
            name: 'LED路灯',
            qty: 20,
            unit: '套',
            price: 1500,
            amount: 30000
          }
        ],
      taxRate: 0.09,
        taxAmount: 7464,
        amountCN: '玖万零肆佰元整'
      }
    ]
  },
  {
    date: '2026-09-06',
    role: 'accountant',
    title: '提取备用金',
    tags: [
      '资金管理'
    ],
    difficulty: 1,
    description: '提取备用金15,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '1001',
        debit: 15000,
        credit: 0,
        summary: '备用金',
        explanation: '备用金。借15000元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 15000,
        summary: '提取',
        explanation: '提取。贷15000元。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '现金支票存根',
        date: '2026-09-06',
        totalAmount: 15000,
        payer: '鼎立建筑工程有限公司',
        payeeName: '备用金',
        content: '提取备用金',
        refNo: 'XJ202609060001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 9876 5432 1098 765'
      }
    ]
  },
  {
    date: '2026-09-07',
    role: 'accountant',
    title: '机械及水电费',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '9月机械费10,000元，水电费10,000元，合计20,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '540104',
        debit: 10000,
        credit: 0,
        summary: '机械费',
        explanation: '机械费。借10000元。'
      },
      {
        subjectCode: '540105',
        debit: 10000,
        credit: 0,
        summary: '水电费',
        explanation: '水电费。借10000元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 20000,
        summary: '支付',
        explanation: '支付。贷20000元。',
        cashFlowItem: 'cf-op6'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '费用',
        date: '2026-09-07',
        totalAmount: 20000,
        items: [
          {
            name: '机械燃油维修',
            amount: 10000
          },
          {
            name: '水电费',
            amount: 10000
          }
        ],
      stampText: '已收款'
      }
    ]
  },
  {
    date: '2026-09-10',
    role: 'accountant',
    title: '项目部差旅及办公费',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '9月项目差旅2,500元，办公1,500元，公司办公4,500元。',
    tip: '',
    entries: [
      {
        subjectCode: '540105',
        debit: 2500,
        credit: 0,
        summary: '差旅',
        explanation: '差旅。借2500元。'
      },
      {
        subjectCode: '540106',
        debit: 1500,
        credit: 0,
        summary: '办公',
        explanation: '办公。借1500元。'
      },
      {
        subjectCode: '6602',
        debit: 4500,
        credit: 0,
        summary: '公司办公',
        explanation: '公司办公。借4500元。'
      },
      {
        subjectCode: '1001',
        debit: 0,
        credit: 4000,
        summary: '现金',
        explanation: '现金。贷4000元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 4500,
        summary: '转账',
        explanation: '转账。贷4500元。',
        cashFlowItem: 'cf-op6'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '费用',
        date: '2026-09-10',
        totalAmount: 8500,
      stampText: '已收款'
      }
    ]
  },
  {
    date: '2026-09-11',
    role: 'accountant',
    title: '恒达项目质保期维护',
    tags: [
      '工程成本'
    ],
    difficulty: 2,
    description: '恒达项目质保期内发现屋面局部渗水，支付维修费用8,000元。',
    tip: '质保期内维修费计入"销售费用"或冲减质保金。',
    entries: [
      {
        subjectCode: '6601',
        debit: 8000,
        credit: 0,
        summary: '质保期维修费',
        explanation: '销售费用增加。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 8000,
        summary: '支付维修费',
        explanation: '银行存款减少。',
        cashFlowItem: 'cf-op6'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '维修费发票',
        date: '2026-09-11',
        totalAmount: 8000,
        items: [
          {
            name: '屋面防水维修',
            amount: 8000
          }
        ],
      stampText: '已收款'
      }
    ]
  },
  {
    date: '2026-09-14',
    role: 'accountant',
    title: '市政项目-工程进度确认',
    tags: [
      '工程合同'
    ],
    difficulty: 3,
    description: '市政项目累计完工进度90%（本月新增15%）。确认收入：300万×90%-已确认收入2,250,000=450,000元（不含税），增值税40,500元。合同负债余额已用完，全额计入应收账款。',
    tip: '',
    entries: [
      {
        subjectCode: '1122',
        debit: 490500,
        credit: 0,
        summary: '应收账款-市建设局',
        explanation: '应收账款-市建设局。借490500元。'
      },
      {
        subjectCode: '222101',
        debit: 0,
        credit: 40500,
        summary: '销项税额',
        explanation: '销项税额。贷40500元。'
      },
      {
        subjectCode: '6001',
        debit: 0,
        credit: 450000,
        summary: '确认收入-市政',
        explanation: '确认收入-市政。贷450000元。'
      }
    ],
    documents: [
      {
        type: 'invoice',
        label: '发票',
        date: '2026-09-14',
        lineItems: [
          {
            name: '市政道路工程进度款（累计90%）',
            qty: 1,
            unit: '项',
            price: 450000,
            amount: 450000
          }
        ],
        totalAmount: 490500,
      taxRate: 0.09,
        taxAmount: 40500,
        amountCN: '肆拾玖万零伍佰元整'
      }
    ]
  },
  {
    date: '2026-09-14',
    role: 'accountant',
    title: '市政项目-成本结转',
    tags: [
      '工程合同'
    ],
    difficulty: 3,
    description: '市政本月成本：材料80,000+人工(70K+应分摊间接)+机械10,000+其他10,000。间收费用待月末计算。此处先按直接成本暂估：100,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '6401',
        debit: 100000,
        credit: 0,
        summary: '结转市政成本（暂估）',
        explanation: '结转市政成本（暂估）。借100000元。'
      },
      {
        subjectCode: '540102',
        debit: 0,
        credit: 80000,
        summary: '材料转出',
        explanation: '材料转出。贷80000元。'
      },
      {
        subjectCode: '540104',
        debit: 0,
        credit: 10000,
        summary: '机械转出',
        explanation: '机械转出。贷10000元。'
      },
      {
        subjectCode: '540105',
        debit: 0,
        credit: 10000,
        summary: '其他转出',
        explanation: '其他转出。贷10000元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '成本表',
        date: '2026-09-14',
        content: '暂估100,000元',

      docTitle: '成本表',
        signature: '李会计'
      }
    ]
  },
  {
    date: '2026-09-16',
    role: 'accountant',
    title: '收到7月进度款',
    tags: [
      '往来管理'
    ],
    difficulty: 1,
    description: '收到恒达地产7月签证索赔款163,500元。',
    tip: '',
    entries: [
      {
        subjectCode: '100201',
        debit: 163500,
        credit: 0,
        summary: '收签证款',
        explanation: '收签证款。借163500元。',
        cashFlowItem: 'cf-op1'
      },
      {
        subjectCode: '1122',
        debit: 0,
        credit: 163500,
        summary: '应收减少',
        explanation: '应收减少。贷163500元。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '收款回单',
        date: '2026-09-16',
        totalAmount: 163500,
        payer: '恒达地产',
        payeeName: '鼎立建筑工程有限公司',
        content: '恒达项目7月进度款',
        refNo: 'SK202609160001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '恒达地产专户',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 0123 4567 8901 234'
      }
    ]
  },
  {
    date: '2026-09-17',
    role: 'accountant',
    title: '恒达项目-计算最终利润',
    tags: [
      '期末'
    ],
    difficulty: 3,
    description: '恒达项目全面结算完成。总收入（含变更签证及审计调整后）=500万(原)+100万(变更)+15万(签证)-5万(审计审减)=610万元。总成本2,890,665元。项目毛利3,209,335元，利润率52.6%。',
    tip: '项目利润分析是项目管理的重要环节。',
    entries: [],
    documents: [
      {
        type: 'text',
        label: '项目利润分析表',
        date: '2026-09-17',
        docTitle: '恒达地产办公楼项目利润分析表',
        content: '总包合同收入：6,100,000元\n总成本：2,890,665元\n项目毛利：3,209,335元\n毛利率：52.6%\n工期：1月-8月（8个月）\n结论：项目盈利良好',
        signature: '项目管理部'
      }
    ]
  },
  {
    date: '2026-09-18',
    role: 'accountant',
    title: '市政项目-材料费用',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '市政项目采购灯具、标牌等，价款40,000元，增值税5,200元，合计45,200元。',
    tip: '',
    entries: [
      {
        subjectCode: '540102',
        debit: 40000,
        credit: 0,
        summary: '采购材料',
        explanation: '采购材料。借40000元。'
      },
      {
        subjectCode: '222101',
        debit: 5200,
        credit: 0,
        summary: '进项税额',
        explanation: '进项税额。借5200元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 45200,
        summary: '支付',
        explanation: '支付。贷45200元。',
        cashFlowItem: 'cf-op2'
      }
    ],
    documents: [
      {
        type: 'invoice',
        label: '发票',
        date: '2026-09-18',
        totalAmount: 45200,
      taxRate: 0.09,
        taxAmount: 3732,
        amountCN: '肆万伍仟贰佰元整'
      }
    ]
  },
  {
    date: '2026-09-19',
    role: 'accountant',
    title: '收到市政7月进度款',
    tags: [
      '往来管理'
    ],
    difficulty: 1,
    description: '收到市建设局7月进度款454,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '100202',
        debit: 454000,
        credit: 0,
        summary: '收市政款',
        explanation: '收市政款。借454000元。',
        cashFlowItem: 'cf-op1'
      },
      {
        subjectCode: '1122',
        debit: 0,
        credit: 454000,
        summary: '应收减少',
        explanation: '应收减少。贷454000元。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '收款回单',
        date: '2026-09-19',
        totalAmount: 454000,
        payer: '南京市市政工程管理处',
        payeeName: '鼎立建筑工程有限公司',
        content: '市政项目7月进度款',
        refNo: 'SK202609190001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '市政工程管理处专户',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 0123 4567 8901 234'
      }
    ]
  },
  {
    date: '2026-09-20',
    role: 'accountant',
    title: '计提9月职工薪酬',
    tags: [
      '工资社保'
    ],
    difficulty: 2,
    description: '计提9月工资：市政施工65,000元，项目部30,000元，公司25,000元，合计120,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '540101',
        debit: 65000,
        credit: 0,
        summary: '施工工资',
        explanation: '施工工资。借65000元。'
      },
      {
        subjectCode: '540106',
        debit: 30000,
        credit: 0,
        summary: '项目部工资',
        explanation: '项目部工资。借30000元。'
      },
      {
        subjectCode: '6602',
        debit: 25000,
        credit: 0,
        summary: '管理工资',
        explanation: '管理工资。借25000元。'
      },
      {
        subjectCode: '221101',
        debit: 0,
        credit: 120000,
        summary: '应付薪酬',
        explanation: '应付薪酬。贷120000元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '工资表',
        date: '2026-09-20',
        content: '120,000元',

      docTitle: '工资表',
        signature: '李会计'
      }
    ]
  },
  {
    date: '2026-09-20',
    role: 'accountant',
    title: '计提9月社保公积金',
    tags: [
      '工资社保'
    ],
    difficulty: 2,
    description: '120K×36.7%=44,040元。',
    tip: '',
    entries: [
      {
        subjectCode: '540101',
        debit: 23855,
        credit: 0,
        summary: '施工社公（65K×36.7%）',
        explanation: '施工社公（65K×36.7%）。借23855元。'
      },
      {
        subjectCode: '540106',
        debit: 11010,
        credit: 0,
        summary: '项目部社公',
        explanation: '项目部社公。借11010元。'
      },
      {
        subjectCode: '6602',
        debit: 9175,
        credit: 0,
        summary: '管理社公',
        explanation: '管理社公。借9175元。'
      },
      {
        subjectCode: '221102',
        debit: 0,
        credit: 29640,
        summary: '社保',
        explanation: '社保。贷29640元。'
      },
      {
        subjectCode: '221103',
        debit: 0,
        credit: 14400,
        summary: '公积金',
        explanation: '公积金。贷14400元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '计提表',
        date: '2026-09-20',
        content: '44,040元',

      docTitle: '计提表',
        signature: '李会计'
      }
    ]
  },
  {
    date: '2026-09-21',
    role: 'accountant',
    title: '折旧及摊销',
    tags: [
      '工程成本'
    ],
    difficulty: 2,
    description: '折旧1,850元，摊销15,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '540104',
        debit: 1250,
        credit: 0,
        summary: '折旧',
        explanation: '折旧。借1250元。'
      },
      {
        subjectCode: '540105',
        debit: 5000,
        credit: 0,
        summary: '临设摊销',
        explanation: '临设摊销。借5000元。'
      },
      {
        subjectCode: '6602',
        debit: 600,
        credit: 0,
        summary: '办公折旧',
        explanation: '办公折旧。借600元。'
      },
      {
        subjectCode: '6602',
        debit: 10000,
        credit: 0,
        summary: '房租摊销',
        explanation: '房租摊销。借10000元。'
      },
      {
        subjectCode: '1602',
        debit: 0,
        credit: 1850,
        summary: '累计折旧',
        explanation: '累计折旧。贷1850元。'
      },
      {
        subjectCode: '1801',
        debit: 0,
        credit: 5000,
        summary: '临设减',
        explanation: '余额20,000元。'
      },
      {
        subjectCode: '1123',
        debit: 0,
        credit: 10000,
        summary: '租金减',
        explanation: '余额30,000元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '折旧摊销',
        date: '2026-09-21',
        content: '16,850元',

      docTitle: '折旧摊销',
        signature: '李会计'
      }
    ]
  },
  {
    date: '2026-09-24',
    role: 'accountant',
    title: '间接费用归集与分摊',
    tags: [
      '工程成本'
    ],
    difficulty: 3,
    description: '间接费30,000+11,010+1,500=42,510元。全额分配给市政项目。',
    tip: '',
    entries: [
      {
        subjectCode: '540101',
        debit: 42510,
        credit: 0,
        summary: '间接-市政项目',
        explanation: '间接-市政项目。借42510元。'
      },
      {
        subjectCode: '540106',
        debit: 0,
        credit: 42510,
        summary: '间接转出',
        explanation: '间接转出。贷42510元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '间接费表',
        date: '2026-09-24',
        content: '42,510元',

      docTitle: '间接费表',
        signature: '李会计'
      }
    ]
  },
  {
    date: '2026-09-25',
    role: 'accountant',
    title: '结转账政项目成本',
    tags: [
      '工程合同'
    ],
    difficulty: 3,
    description: '市政成本：人工(65K+23,855+42,510)=131,365+材料(80K+40K)=120,000+机械10,000+其他直接(10,000+2,500)=12,500=273,865元。',
    tip: '',
    entries: [
      {
        subjectCode: '6401',
        debit: 273865,
        credit: 0,
        summary: '结转市政成本',
        explanation: '结转市政成本。借273865元。'
      },
      {
        subjectCode: '540101',
        debit: 0,
        credit: 131365,
        summary: '人工转出',
        explanation: '人工转出。贷131365元。'
      },
      {
        subjectCode: '540102',
        debit: 0,
        credit: 120000,
        summary: '材料转出',
        explanation: '材料转出。贷120000元。'
      },
      {
        subjectCode: '540104',
        debit: 0,
        credit: 10000,
        summary: '机械转出',
        explanation: '机械转出。贷10000元。'
      },
      {
        subjectCode: '540105',
        debit: 0,
        credit: 12500,
        summary: '其他转出',
        explanation: '其他转出。贷12500元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '成本表',
        date: '2026-09-25',
        content: '273,865元\n收入450,000元\n毛利176,135元',

      docTitle: '成本表',
        signature: '李会计'
      }
    ]
  },
  {
    date: '2026-09-26',
    role: 'accountant',
    title: '计提城建税及附加',
    tags: [
      '税费'
    ],
    difficulty: 2,
    description: '本月增值税：销项(40,500+0)=40,500-进项(10,400+5,200)=24,900元。计提城建税1,743元，教育费附加747元，地方附加498元，合计2,988元。',
    tip: '',
    entries: [
      {
        subjectCode: '6403',
        debit: 2988,
        credit: 0,
        summary: '计提附加',
        explanation: '计提附加。借2988元。'
      },
      {
        subjectCode: '222103',
        debit: 0,
        credit: 1743,
        summary: '城建税',
        explanation: '城建税。贷1743元。'
      },
      {
        subjectCode: '222104',
        debit: 0,
        credit: 1245,
        summary: '附加',
        explanation: '附加。贷1245元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '税费表',
        date: '2026-09-26',
        content: '24,900×12%=2,988元',

      docTitle: '税费表',
        signature: '李会计'
      }
    ]
  },
  {
    date: '2026-09-27',
    role: 'accountant',
    title: '银行手续及利息',
    tags: [
      '资金管理'
    ],
    difficulty: 1,
    description: '9月手续费400元，利息1,500元。',
    tip: '',
    entries: [
      {
        subjectCode: '6603',
        debit: 400,
        credit: 0,
        summary: '手续费',
        explanation: '手续费。借400元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 400,
        summary: '银行手续费',
        explanation: '银行手续费。贷400元。'
      },
      {
        subjectCode: '100201',
        debit: 1500,
        credit: 0,
        summary: '利息',
        explanation: '利息。借1500元。',
        cashFlowItem: 'cf-op5'
      },
      {
        subjectCode: '6603',
        debit: 0,
        credit: 1500,
        summary: '冲减',
        explanation: '冲减。贷1500元。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '银行回单',
        date: '2026-09-27',
        totalAmount: 4000,
        payer: '鼎立建筑工程有限公司',
        payeeName: '工商银行南京分行',
        content: '9月手续费700元、存款利息?元',
        refNo: 'YW202609270001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234'
      }
    ]
  },
  {
    date: '2026-09-03',
    role: 'accountant',
    title: '竣工资料整理归档费',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '恒达项目竣工资料整理、装订、归档，费用3,000元，转账支付。',
    tip: '竣工资料整理费计入"合同履约成本-其他直接费用"。',
    entries: [
      {
        subjectCode: '540105',
        debit: 3000,
        credit: 0,
        summary: '竣工资料整理费',
        explanation: '合同履约成本-其他直接费用增加。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 3000,
        summary: '支付资料整理费',
        explanation: '银行存款减少3,000元。',
        cashFlowItem: 'cf-op6',
        cashFlowExplanation: '其他经营活动现金支出。'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '服务发票',
        date: '2026-09-03',
        totalAmount: 3000,
        items: [
          { name: '竣工资料整理装订', amount: 3000 }
        ],
      stampText: '已收款'
      }
    ]
  },
  {
    date: '2026-09-06',
    role: 'accountant',
    title: '工程结算审核费',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '委托造价咨询公司对恒达项目进行竣工结算审核，审核费18,000元，转账支付。',
    tip: '结算审核费计入"合同履约成本-合同成本"。',
    entries: [
      {
        subjectCode: '540101',
        debit: 18000,
        credit: 0,
        summary: '工程结算审核费',
        explanation: '合同履约成本-合同成本增加。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 18000,
        summary: '支付审核费',
        explanation: '银行存款减少18,000元。',
        cashFlowItem: 'cf-op6',
        cashFlowExplanation: '其他经营活动现金支出。'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '咨询费发票',
        date: '2026-09-06',
        totalAmount: 18000,
        items: [
          { name: '竣工结算审核服务', amount: 18000 }
        ],
      stampText: '已收款'
      }
    ]
  },
  {
    date: '2026-09-10',
    role: 'accountant',
    title: '项目部临设拆除费',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '恒达项目竣工后，拆除项目部临时办公板房等临时设施，费用8,000元，转账支付。',
    tip: '临设拆除费计入"合同履约成本-其他直接费用"。',
    entries: [
      {
        subjectCode: '540105',
        debit: 8000,
        credit: 0,
        summary: '临设拆除费',
        explanation: '合同履约成本-其他直接费用增加。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 8000,
        summary: '支付拆除费',
        explanation: '银行存款减少8,000元。',
        cashFlowItem: 'cf-op6',
        cashFlowExplanation: '其他经营活动现金支出。'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '拆除费发票',
        date: '2026-09-10',
        totalAmount: 8000,
        items: [
          { name: '临时设施拆除清理', amount: 8000 }
        ],
      stampText: '已收款'
      }
    ]
  },
  {
    date: '2026-09-15',
    role: 'accountant',
    title: '项目剩余材料退库',
    tags: [
      '工程成本'
    ],
    difficulty: 2,
    description: '恒达项目竣工后，剩余钢材5,000元退回公司材料库，办理退库手续。施工企业材料已直接计入合同履约成本，退库时冲减材料成本。',
    tip: '施工企业无"原材料"科目，退库通过"合同履约成本-材料成本"冲减即可。点击"✅ 标记完成"确认。',
    entries: [],
    documents: [
      {
        type: 'text',
        label: '退库单',
        date: '2026-09-15',
        content: '恒达项目剩余材料退库清单：\n钢筋 2吨 3,000元\n零星材料 2,000元\n合计：5,000元\n处理意见：已退库，冲减合同履约成本',
        signature: '陈质检/王保管'
      }
    ]
  },
  {
    date: '2026-09-20',
    role: 'accountant',
    title: '工程质量保修金预提',
    tags: [
      '工程成本'
    ],
    difficulty: 2,
    description: '按合同约定，恒达项目预留质量保修金20,000元，用于竣工后保修期内可能发生的维修支出。',
    tip: '质量保修金预提计入"合同履约成本-合同成本"，贷记"其他应付款-质保金"。',
    entries: [
      {
        subjectCode: '540101',
        debit: 20000,
        credit: 0,
        summary: '预提质量保修金',
        explanation: '合同履约成本-合同成本增加。'
      },
      {
        subjectCode: '2241',
        debit: 0,
        credit: 20000,
        summary: '应付质量保修金',
        explanation: '其他应付款-质保金增加。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '质量保修金计提表',
        date: '2026-09-20',
        content: '恒达项目合同价400万元×0.5%=20,000元\n保修期：竣工验收后2年',
        signature: '李会计'
      }
    ]
  },
  {
    date: '2026-09-28',
    role: 'accountant',
    title: '月末结转损益',
    tags: [
      '期末'
    ],
    difficulty: 3,
    description: '月末结转：收入(450K-50K审计调减)=400,000元，成本373,865元(暂估100K+273,865)，税金4,488元，管理费用(25K+9,175+4,500+600+10K+8K)57,275元，销售费用8,000元，财务净收入1,100元。',
    tip: '',
    entries: [
      {
        subjectCode: '6001',
        debit: 400000,
        credit: 0,
        summary: '结转收入',
        explanation: '结转收入。借400000元。'
      },
      {
        subjectCode: '6401',
        debit: 0,
        credit: 373865,
        summary: '结转成本',
        explanation: '结转成本。贷373865元。'
      },
      {
        subjectCode: '6403',
        debit: 0,
        credit: 4488,
        summary: '结转税金',
        explanation: '结转税金。贷4488元。'
      },
      {
        subjectCode: '6602',
        debit: 0,
        credit: 57275,
        summary: '结转管理',
        explanation: '结转管理。贷57275元。'
      },
      {
        subjectCode: '6601',
        debit: 0,
        credit: 8000,
        summary: '结转销售费用',
        explanation: '结转销售费用。贷8000元。'
      },
      {
        subjectCode: '6603',
        debit: 1100,
        credit: 0,
        summary: '结转财务',
        explanation: '结转财务。借1100元。'
      },
      {
        subjectCode: '4103',
        debit: 0,
        credit: -42528,
        summary: '结转本年利润',
        explanation: '本月亏损42,528元（因审计审减和维修费影响）'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '结转表',
        date: '2026-09-28',
        content: '利润-42,528元（项目收尾阶段费用较多）',

      docTitle: '结转表',
        signature: '李会计'
      }
    ]
  },
  {
    date: '2026-09-30',
    role: 'accountant',
    title: '模拟纳税申报',
    tags: [
      '期末',
      '申报'
    ],
    difficulty: 1,
    description: '9月增值税应纳24,900元，城建税1,743元，教育费附加1,245元。',
    tip: '',
    entries: [],
    documents: [
      {
        type: 'text',
        label: '申报提醒',
        date: '2026-09-30',
        content: '增值税24,900+附加2,988=27,888元',

      docTitle: '申报提醒',
        signature: '李会计'
      }
    ],
    nextAction: 'tax-filing'
  }
]

export default tasks
