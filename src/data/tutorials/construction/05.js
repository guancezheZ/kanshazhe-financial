/**
 * 建筑业 - 5月教学任务
 *
 * 企业：鼎立建筑工程有限公司
 * 税制：一般纳税人（增值税9%）
 * 准则：CAS 14 新收入准则（投入法/完工百分比）
 * 本月主题：新项目启动与双项目并行
 */

const tasks = [
  {
    date: '2026-05-04',
    role: 'accountant',
    title: '缴纳4月增值税及附加税费',
    tags: [
      '税费'
    ],
    difficulty: 2,
    description: '缴纳4月增值税55,050元，城建税3,854元，教育费附加2,753元，合计61,657元。',
    tip: '',
    entries: [
      {
        subjectCode: '222101',
        debit: 55050,
        credit: 0,
        summary: '缴纳增值税',
        explanation: '缴纳增值税。借55050元。'
      },
      {
        subjectCode: '222103',
        debit: 3854,
        credit: 0,
        summary: '缴纳城建税',
        explanation: '缴纳城建税。借3854元。'
      },
      {
        subjectCode: '222104',
        debit: 2753,
        credit: 0,
        summary: '缴纳教育费附加',
        explanation: '缴纳教育费附加。借2753元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 61657,
        summary: '缴纳税款',
        explanation: '银行存款减少。',
        cashFlowItem: 'cf-op4'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '电子缴税付款凭证',
        date: '2026-05-04',
        totalAmount: 61657,
        payer: '鼎立建筑工程有限公司',
        payeeName: '国家金库',
        content: '4月增值税55,050元，城建税3,854元，教育费附加2,753元',
        refNo: 'JS202605040001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 9876 5432 1098 765'
      }
    ]
  },
  {
    date: '2026-05-04',
    role: 'accountant',
    title: '缴纳4月社保及公积金',
    tags: [
      '工资社保'
    ],
    difficulty: 1,
    description: '缴纳4月社保38,285元，公积金18,600元，合计56,885元。',
    tip: '',
    entries: [
      {
        subjectCode: '221102',
        debit: 38285,
        credit: 0,
        summary: '缴社保',
        explanation: '缴社保。借38285元。'
      },
      {
        subjectCode: '221103',
        debit: 18600,
        credit: 0,
        summary: '缴公积金',
        explanation: '缴公积金。借18600元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 56885,
        summary: '支付社保公积金',
        explanation: '银行存款减少。',
        cashFlowItem: 'cf-op3'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '社保缴费回单',
        date: '2026-05-04',
        totalAmount: 38285,
        payer: '鼎立建筑工程有限公司',
        payeeName: '社会保险费征收专户',
        content: '4月社保费',
        refNo: 'SB202605040001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234',
        payeeBank: '社会保险费征收专户',
        payeeAccount: '3201 6500 0123 4567'
      },
      {
        type: 'bank',
        label: '公积金缴费回单',
        date: '2026-05-04',
        totalAmount: 18600,
        payer: '鼎立建筑工程有限公司',
        payeeName: '住房公积金管理中心',
        content: '4月公积金',
        refNo: 'GJJ202605040001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234',
        payeeBank: '住房公积金管理中心专户',
        payeeAccount: '3810 0200 1234 5678'
      }
    ]
  },
  {
    date: '2026-05-05',
    role: 'accountant',
    title: '发放4月职工工资',
    tags: [
      '工资社保'
    ],
    difficulty: 1,
    description: '银行代发4月工资155,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '221101',
        debit: 155000,
        credit: 0,
        summary: '发4月工资',
        explanation: '发4月工资。借155000元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 155000,
        summary: '代发工资',
        explanation: '银行存款减少。',
        cashFlowItem: 'cf-op3'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '银行代发工资回单',
        date: '2026-05-05',
        totalAmount: 155000,
        payer: '鼎立建筑工程有限公司',
        payeeName: '鼎立建筑职工（批量代发）',
        content: '4月工资发放',
        refNo: 'GZ202605050001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 9876 5432 1098 765'
      }
    ]
  },
  {
    date: '2026-05-06',
    role: 'accountant',
    title: '提取备用金',
    tags: [
      '资金管理'
    ],
    difficulty: 1,
    description: '提取备用金25,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '1001',
        debit: 25000,
        credit: 0,
        summary: '备用金增',
        explanation: '备用金增。借25000元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 25000,
        summary: '备用金减',
        explanation: '备用金减。贷25000元。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '现金支票存根',
        date: '2026-05-06',
        totalAmount: 25000,
        payer: '鼎立建筑工程有限公司',
        payeeName: '鼎立建筑工程有限公司',
        content: '备用金',
        refNo: 'XJ202605060001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 9876 5432 1098 765'
      }
    ]
  },
  {
    date: '2026-05-06',
    role: 'accountant',
    title: '中标市政道路工程',
    tags: [
      '工程合同'
    ],
    difficulty: 1,
    description: '公司中标市建设局市政道路工程，合同总价300万元（不含税），增值税9%。支付招标代理服务费12,000元。',
    tip: '第二个项目启动，双项目并行核算。',
    entries: [
      {
        subjectCode: '6602',
        debit: 12000,
        credit: 0,
        summary: '招标代理费',
        explanation: '管理费用增加。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 12000,
        summary: '支付代理费',
        explanation: '银行存款减少。',
        cashFlowItem: 'cf-op6'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '服务费发票',
        date: '2026-05-06',
        totalAmount: 12000,
        items: [
          {
            name: '市政道路工程招标代理费',
            amount: 12000
          }
        ],
      stampText: '已收款'
      }
    ]
  },
  {
    date: '2026-05-06',
    role: 'accountant',
    title: '收到市政工程预收款',
    tags: [
      '工程合同'
    ],
    difficulty: 1,
    description: '收到市建设局预付工程款90万元（300万×30%），存入建设银行账户。',
    tip: '',
    entries: [
      {
        subjectCode: '100202',
        debit: 900000,
        credit: 0,
        summary: '收到市政预收款',
        explanation: '银行存款-建行增加。',
        cashFlowItem: 'cf-op5',
        cashFlowExplanation: '收到其他与经营活动有关的现金。'
      },
      {
        subjectCode: '2205',
        debit: 0,
        credit: 900000,
        summary: '合同负债-市建设局',
        explanation: '合同负债增加。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '银行回单',
        date: '2026-05-06',
        totalAmount: 900000,
        payer: '市建设局（财政专户）',
        payeeName: '鼎立建筑工程有限公司',
        content: '市政道路工程预付款（合同总价300万×30%）',
        refNo: 'SZ202605060001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 9876 5432 1098 765',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 0123 4567 8901 234'
      }
    ]
  },
  {
    date: '2026-05-07',
    role: 'accountant',
    title: '预缴市政工程增值税',
    tags: [
      '税费'
    ],
    difficulty: 2,
    description: '收到市政预收款90万元，预缴增值税（2%预征）18,000元，城建税1,260元，教育费附加540元，地方教育附加360元，合计20,160元。',
    tip: '新项目预收款同需预缴增值税。',
    entries: [
      {
        subjectCode: '222101',
        debit: 18000,
        credit: 0,
        summary: '预缴增值税（90万×2%）',
        explanation: '预缴增值税（90万×2%）。借18000元。'
      },
      {
        subjectCode: '222103',
        debit: 1260,
        credit: 0,
        summary: '城建税',
        explanation: '城建税。借1260元。'
      },
      {
        subjectCode: '222104',
        debit: 900,
        credit: 0,
        summary: '教育费附加（3%+2%）',
        explanation: '教育费附加（3%+2%）。借900元。'
      },
      {
        subjectCode: '100202',
        debit: 0,
        credit: 20160,
        summary: '缴纳税款',
        explanation: '银行存款-建行减少。',
        cashFlowItem: 'cf-op4'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '预缴税款凭证',
        date: '2026-05-07',
        totalAmount: 20160,
        items: [
          {
            name: '增值税预征2%',
            amount: 18000
          },
          {
            name: '城建税7%',
            amount: 1260
          },
          {
            name: '教育费附加5%',
            amount: 900
          }
        ],
      stampText: '已收款'
      }
    ]
  },
  {
    date: '2026-05-08',
    role: 'accountant',
    title: '市政工程前期准备',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '市政道路项目开工前准备，支付勘察设计费30,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '540102',
        debit: 30000,
        credit: 0,
        summary: '勘察设计费-市政项目',
        explanation: '合同履约成本-材料成本(可归入其他直接费)。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 30000,
        summary: '支付勘察费',
        explanation: '银行存款减少。',
        cashFlowItem: 'cf-op6'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '勘察设计费发票',
        date: '2026-05-08',
        totalAmount: 30000,
        items: [
          {
            name: '市政道路工程勘察设计',
            amount: 30000
          }
        ],
      stampText: '已收款'
      }
    ]
  },
  {
    date: '2026-05-08',
    role: 'accountant',
    title: '市政工程机械租赁',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '为市政项目租赁压路机、摊铺机等专用机械，预付月租金40,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '1123',
        debit: 40000,
        credit: 0,
        summary: '预付机械租金',
        explanation: '预付机械租金。借40000元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 40000,
        summary: '支付预付租金',
        explanation: '银行存款减少。',
        cashFlowItem: 'cf-op6'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '银行回单',
        date: '2026-05-08',
        totalAmount: 40000,
        payer: '鼎立建筑工程有限公司',
        payeeName: 'XX机械设备租赁公司',
        content: '市政项目机械预付租金',
        refNo: 'ZF202605080001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 9876 5432 1098 765'
      }
    ]
  },
  {
    date: '2026-05-11',
    role: 'accountant',
    title: '恒达项目主体材料采购',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '恒达项目采购装修阶段材料（瓷砖、涂料等），价款80,000元，增值税10,400元，合计90,400元，转账支付。',
    tip: '办公楼主体封顶在即，提前准备装修材料。',
    entries: [
      {
        subjectCode: '540102',
        debit: 80000,
        credit: 0,
        summary: '采购装修材料',
        explanation: '采购装修材料。借80000元。'
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
        summary: '支付材料款',
        explanation: '银行存款减少。',
        cashFlowItem: 'cf-op2'
      }
    ],
    documents: [
      {
        type: 'invoice',
        label: '增值税专用发票',
        date: '2026-05-11',
        totalAmount: 90400,
        lineItems: [
          {
            name: '瓷砖',
            qty: 2000,
            unit: '平方米',
            price: 30,
            amount: 60000
          },
          {
            name: '环保涂料',
            qty: 50,
            unit: '桶',
            price: 400,
            amount: 20000
          }
        ],
      taxRate: 0.09,
        taxAmount: 7464,
        amountCN: '玖万零肆佰元整'
      }
    ]
  },
  {
    date: '2026-05-11',
    role: 'accountant',
    title: '市政项目材料采购',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '市政道路项目采购沥青、碎石等材料，价款120,000元，增值税15,600元，合计135,600元，款项未付。',
    tip: '双项目并行，材料采购分开核算。',
    entries: [
      {
        subjectCode: '540102',
        debit: 120000,
        credit: 0,
        summary: '采购沥青碎石-市政项目',
        explanation: '采购沥青碎石-市政项目。借120000元。'
      },
      {
        subjectCode: '222101',
        debit: 15600,
        credit: 0,
        summary: '进项税额',
        explanation: '进项税额。借15600元。'
      },
      {
        subjectCode: '2202',
        debit: 0,
        credit: 135600,
        summary: '应付账款-市政材料供应商',
        explanation: '应付账款-市政材料供应商。贷135600元。'
      }
    ],
    documents: [
      {
        type: 'invoice',
        label: '增值税专用发票',
        date: '2026-05-11',
        totalAmount: 135600,
        lineItems: [
          {
            name: '沥青混凝土',
            qty: 200,
            unit: '吨',
            price: 500,
            amount: 100000
          },
          {
            name: '级配碎石',
            qty: 500,
            unit: '方',
            price: 40,
            amount: 20000
          }
        ],
      taxRate: 0.09,
        taxAmount: 11196,
        amountCN: '壹拾叁万伍仟陆佰元整'
      }
    ]
  },
  {
    date: '2026-05-12',
    role: 'accountant',
    title: '支付塔吊租赁及机械费',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '支付恒达项目5月塔吊租金15,000元及双项目机械燃油维修费15,000元（恒达9,000+市政6,000），合计30,000元。',
    tip: '双项目机械使用费分别核算。',
    entries: [
      {
        subjectCode: '540104',
        debit: 15000,
        credit: 0,
        summary: '塔吊租金5月-恒达项目',
        explanation: '塔吊租金5月-恒达项目。借15000元。'
      },
      {
        subjectCode: '540104',
        debit: 15000,
        credit: 0,
        summary: '机械燃油维修-双项目',
        explanation: '机械使用费增加。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 30000,
        summary: '支付机械费',
        explanation: '银行存款减少。',
        cashFlowItem: 'cf-op6'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '机械费用明细',
        date: '2026-05-12',
        totalAmount: 30000,
        items: [
          {
            name: '塔吊租金',
            amount: 15000
          },
          {
            name: '燃油维修费',
            amount: 15000
          }
        ],
      stampText: '已收款'
      }
    ]
  },
  {
    date: '2026-05-13',
    role: 'accountant',
    title: '支付施工现场水电费',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '支付5月双项目水电费：恒达项目9,000元，市政项目6,000元，合计15,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '540105',
        debit: 15000,
        credit: 0,
        summary: '施工水电费',
        explanation: '施工水电费。借15000元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 15000,
        summary: '支付水电费',
        explanation: '银行存款减少。',
        cashFlowItem: 'cf-op6'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '水电费单',
        date: '2026-05-13',
        totalAmount: 15000,
        items: [
          {
            name: '恒达项目水电',
            amount: 9000
          },
          {
            name: '市政项目水电',
            amount: 6000
          }
        ],
      stampText: '已收款'
      }
    ]
  },
  {
    date: '2026-05-14',
    role: 'accountant',
    title: '项目部差旅及办公费',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '报销5月双项目部差旅费4,000元、办公费2,500元，合计6,500元。',
    tip: '',
    entries: [
      {
        subjectCode: '540105',
        debit: 4000,
        credit: 0,
        summary: '差旅费',
        explanation: '差旅费。借4000元。'
      },
      {
        subjectCode: '540106',
        debit: 2500,
        credit: 0,
        summary: '办公费',
        explanation: '办公费。借2500元。'
      },
      {
        subjectCode: '1001',
        debit: 0,
        credit: 6500,
        summary: '现金支付',
        explanation: '现金支付。贷6500元。'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '报销单',
        date: '2026-05-14',
        totalAmount: 6500,
        items: [
          {
            name: '差旅费',
            amount: 4000
          },
          {
            name: '办公用品',
            amount: 2500
          }
        ],
      stampText: '已收款'
      }
    ]
  },
  {
    date: '2026-05-14',
    role: 'accountant',
    title: '公司管理办公费',
    tags: [
      '资金管理'
    ],
    difficulty: 1,
    description: '支付5月公司办公费5,500元。',
    tip: '',
    entries: [
      {
        subjectCode: '6602',
        debit: 5500,
        credit: 0,
        summary: '办公费',
        explanation: '办公费。借5500元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 5500,
        summary: '支付办公费',
        explanation: '银行存款减少。',
        cashFlowItem: 'cf-op6'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '办公费明细',
        date: '2026-05-14',
        totalAmount: 5500,
        items: [
          {
            name: '办公耗材',
            amount: 3000
          },
          {
            name: '通讯网络费',
            amount: 2500
          }
        ],
      stampText: '已收款'
      }
    ]
  },
  {
    date: '2026-05-15',
    role: 'accountant',
    title: '恒达项目-砌体分包结算',
    tags: [
      '分包管理'
    ],
    difficulty: 2,
    description: '永兴劳务砌体工程完工，结算总价60万元。已按进度确认成本18万元，剩余42万元。支付尾款扣除质保金5%后支付。',
    tip: '',
    entries: [
      {
        subjectCode: '540103',
        debit: 420000,
        credit: 0,
        summary: '砌体分包尾款',
        explanation: '分包成本增加。'
      },
      {
        subjectCode: '2202',
        debit: 0,
        credit: 420000,
        summary: '应付账款-永兴劳务',
        explanation: '应付账款-永兴劳务。贷420000元。'
      },
      {
        subjectCode: '2202',
        debit: 600000,
        credit: 0,
        summary: '支付永兴劳务结算款',
        explanation: '应付账款减少。'
      },
      {
        subjectCode: '224101',
        debit: 0,
        credit: 30000,
        summary: '扣留质保金（60万×5%）',
        explanation: '扣留质保金（60万×5%）。贷30000元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 570000,
        summary: '支付结算净额',
        explanation: '银行存款减少（42万尾款-3万质保金+已付？需核对）。',
        cashFlowItem: 'cf-op2'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '银行回单',
        date: '2026-05-15',
        totalAmount: 570000,
        payer: '鼎立建筑工程有限公司',
        payeeName: '永兴建筑劳务有限公司',
        content: '永兴劳务结算款（扣留质保金30,000元）',
        refNo: 'ZF202605150001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 9876 5432 1098 765'
      }
    ]
  },
  {
    date: '2026-05-16',
    role: 'accountant',
    title: '确认市政项目工程进度',
    tags: [
      '工程合同'
    ],
    difficulty: 3,
    description: '市政道路项目本月完成路基施工，完工进度15%。确认收入：300万×15%=450,000元（不含税），增值税40,500元。冲减合同负债。',
    tip: '市政项目首次确认收入，用完工百分比法。',
    entries: [
      {
        subjectCode: '2205',
        debit: 450000,
        credit: 0,
        summary: '合同负债冲减-市政项目',
        explanation: '合同负债减少450,000元。'
      },
      {
        subjectCode: '222101',
        debit: 0,
        credit: 40500,
        summary: '增值税销项税额（45万×9%）',
        explanation: '增值税销项税额（45万×9%）。贷40500元。'
      },
      {
        subjectCode: '6001',
        debit: 0,
        credit: 409500,
        summary: '确认主营业务收入-市政项目',
        explanation: '确认主营业务收入-市政项目。贷409500元。'
      }
    ],
    documents: [
      {
        type: 'invoice',
        label: '增值税专用发票',
        date: '2026-05-16',
        lineItems: [
          {
            name: '市政道路路基工程进度款（15%）',
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
    date: '2026-05-16',
    role: 'accountant',
    title: '确认恒达项目工程进度',
    tags: [
      '工程合同'
    ],
    difficulty: 3,
    description: '恒达办公楼主体结构封顶，累计完工进度85%（本月新增13%）。确认收入：500万×85%-已确认收入3,600,000=650,000元（不含税），增值税58,500元。',
    tip: '',
    entries: [
      {
        subjectCode: '1122',
        debit: 708500,
        credit: 0,
        summary: '应收账款-恒达地产',
        explanation: '应收账款-恒达地产。借708500元。'
      },
      {
        subjectCode: '222101',
        debit: 0,
        credit: 58500,
        summary: '增值税销项税额（65万×9%）',
        explanation: '增值税销项税额（65万×9%）。贷58500元。'
      },
      {
        subjectCode: '6001',
        debit: 0,
        credit: 650000,
        summary: '确认主营业务收入-恒达项目',
        explanation: '确认主营业务收入-恒达项目。贷650000元。'
      }
    ],
    documents: [
      {
        type: 'invoice',
        label: '增值税专用发票',
        date: '2026-05-16',
        lineItems: [
          {
            name: '办公楼主体封顶进度款（累计85%）',
            qty: 1,
            unit: '项',
            price: 650000,
            amount: 650000
          }
        ],
        totalAmount: 708500,
      taxRate: 0.09,
        taxAmount: 58500,
        amountCN: '柒拾万捌仟伍佰元整'
      }
    ]
  },
  {
    date: '2026-05-18',
    role: 'accountant',
    title: '收到恒达地产4月进度款',
    tags: [
      '往来管理'
    ],
    difficulty: 1,
    description: '收到恒达地产支付4月工程进度款926,500元。',
    tip: '',
    entries: [
      {
        subjectCode: '100201',
        debit: 926500,
        credit: 0,
        summary: '收到恒达进度款',
        explanation: '收到恒达进度款。借926500元。',
        cashFlowItem: 'cf-op1'
      },
      {
        subjectCode: '1122',
        debit: 0,
        credit: 926500,
        summary: '应收账款减少',
        explanation: '应收账款减少。贷926500元。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '收款回单',
        date: '2026-05-18',
        totalAmount: 926500,
        payer: '恒达地产有限公司',
        payeeName: '鼎立建筑工程有限公司',
        content: '恒达地产4月办公楼工程进度款',
        refNo: 'HD202605180001',
        payerBank: '恒达地产开户行',
        payerAccount: '3200 8800 1234 5678',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 0123 4567 8901 234'
      }
    ]
  },
  {
    date: '2026-05-20',
    role: 'accountant',
    title: '计提5月职工薪酬',
    tags: [
      '工资社保'
    ],
    difficulty: 2,
    description: '计提5月职工薪酬：恒达项目施工人员60,000元，市政项目施工人员50,000元，项目部管理人员40,000元，公司管理人员25,000元，合计175,000元。',
    tip: '双项目施工人员分开归集。',
    entries: [
      {
        subjectCode: '540101',
        debit: 110000,
        credit: 0,
        summary: '施工人员工资（恒达60K+市政50K）',
        explanation: '施工人员工资（恒达60K+市政50K）。借110000元。'
      },
      {
        subjectCode: '540106',
        debit: 40000,
        credit: 0,
        summary: '项目部管理人员工资',
        explanation: '项目部管理人员工资。借40000元。'
      },
      {
        subjectCode: '6602',
        debit: 25000,
        credit: 0,
        summary: '公司管理人员工资',
        explanation: '公司管理人员工资。借25000元。'
      },
      {
        subjectCode: '221101',
        debit: 0,
        credit: 175000,
        summary: '应付职工薪酬',
        explanation: '应付职工薪酬。贷175000元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '工资计提表',
        date: '2026-05-20',
        docTitle: '2026年5月工资计提表',
        content: '期间：2026年5月\n\n一、人员构成及应发工资\n┌──────────────┬──────┬──────────┬──────────────────┐\n│    部门       │ 人数  │  月薪合计 │  备注             │\n├──────────────┼──────┼──────────┼──────────────────┤\n│恒达项目施工    │   7  │  60,000  │ 主体装修阶段      │\n│市政项目施工    │   6  │  50,000  │ 新项目路基施工    │\n│项目部管理      │   3  │  40,000  │ 双项目管理        │\n│公司管理       │   3  │  25,000  │ 不变              │\n├──────────────┼──────┼──────────┼──────────────────┤\n│    合计       │  19  │ 175,000  │ 较上月增2人       │\n└──────────────┴──────┴──────────┴──────────────────┘\n\n二、费用分配\n恒达项目施工工资 → 合同履约成本-人工（540101）：60,000元\n市政项目施工工资 → 合同履约成本-人工（540101）：50,000元\n项目部管理人员 → 合同履约成本-间接费用（540106）：40,000元\n公司管理人员 → 管理费用（6602）：25,000元\n\n制表：王人事\n审核：李会计\n批准：刘经理',
        signature: '李会计'
      }
    ]
  },
  {
    date: '2026-05-20',
    role: 'accountant',
    title: '计提5月社保及公积金',
    tags: [
      '工资社保'
    ],
    difficulty: 2,
    description: '计提5月社保及公积金：按工资分配。施工人员110K×36.7%=40,370元，项目部40K×36.7%=14,680元，管理25K×36.7%=9,175元，合计64,225元。',
    tip: '',
    entries: [
      {
        subjectCode: '540101',
        debit: 40370,
        credit: 0,
        summary: '施工人员社保公积金',
        explanation: '施工人员社保公积金。借40370元。'
      },
      {
        subjectCode: '540106',
        debit: 14680,
        credit: 0,
        summary: '项目部社保公积金',
        explanation: '项目部社保公积金。借14680元。'
      },
      {
        subjectCode: '6602',
        debit: 9175,
        credit: 0,
        summary: '管理社保公积金',
        explanation: '管理社保公积金。借9175元。'
      },
      {
        subjectCode: '221102',
        debit: 0,
        credit: 43225,
        summary: '社保（175K×24.7%）',
        explanation: '社保（175K×24.7%）。贷43225元。'
      },
      {
        subjectCode: '221103',
        debit: 0,
        credit: 21000,
        summary: '公积金（175K×12%）',
        explanation: '公积金（175K×12%）。贷21000元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '社保公积金计提表',
        date: '2026-05-20',
        docTitle: '2026年5月社保及公积金计提表',
        content: '期间：2026年5月\n缴费基数：175,000元（工资总额）\n\n一、社会保险（费率合计24.7%）\n┌────────┬─────────┬──────────┐\n│ 险种   │  费率    │  金额     │\n├────────┼─────────┼──────────┤\n│ 养老   │  16%     │  28,000  │\n│ 医疗   │   6.9%   │  12,075  │\n│ 失业   │   0.5%   │     875  │\n│ 工伤   │   0.8%   │   1,400  │\n│ 生育   │   0.5%   │     875  │\n├────────┼─────────┼──────────┤\n│ 小计   │  24.7%   │  43,225  │\n└────────┴─────────┴──────────┘\n\n二、住房公积金（费率12%）：175,000×12%=21,000元\n\n三、按部门分配\n施工人员（110,000×36.7%）=40,370 → 合同履约成本-人工\n项目部（40,000×36.7%）=14,680 → 合同履约成本-间接费用\n管理（25,000×36.7%）=9,175 → 管理费用\n合计：40,370+14,680+9,175=64,225元\n\n制表：赵会计\n审核：李会计',
        signature: '李会计'
      }
    ]
  },
  {
    date: '2026-05-21',
    role: 'accountant',
    title: '计提固定资产折旧',
    tags: [
      '工程成本'
    ],
    difficulty: 2,
    description: '5月折旧1,850元。',
    tip: '',
    entries: [
      {
        subjectCode: '540104',
        debit: 1250,
        credit: 0,
        summary: '施工机械折旧',
        explanation: '施工机械折旧。借1250元。'
      },
      {
        subjectCode: '6602',
        debit: 600,
        credit: 0,
        summary: '办公设备折旧',
        explanation: '办公设备折旧。借600元。'
      },
      {
        subjectCode: '1602',
        debit: 0,
        credit: 1850,
        summary: '累计折旧',
        explanation: '累计折旧。贷1850元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '折旧计算表',
        date: '2026-05-21',
        docTitle: '2026年5月固定资产折旧计算表',
        content: '期间：2026年5月\n折旧方法：直线法\n\n┌────────────┬──────────┬────────┬────────┬──────────┐\n│  资产类别   │  原值     │ 残值率 │ 年限   │  月折旧额 │\n├────────────┼──────────┼────────┼────────┼──────────┤\n│施工机械     │  180,000  │   5%   │  10年  │   1,425  │\n│运输设备     │  120,000  │   5%   │   8年  │   1,188  │\n│办公设备     │   60,000  │   5%   │   5年  │     950  │\n├────────────┼──────────┼────────┼────────┼──────────┤\n│  合计       │  360,000  │        │        │   3,563  │\n└────────────┴──────────┴────────┴────────┴──────────┘\n\n本期计提：施工机械1,250+办公设备600=1,850元\n（施工机械按实际使用情况计入机械费）\n\n制表：李会计\n审核：王总工',
        signature: '李会计'
      }
    ]
  },
  {
    date: '2026-05-21',
    role: 'accountant',
    title: '摊销临时设施及预付租金',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '摊销5月临时设施5,000元，预付租金10,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '540105',
        debit: 5000,
        credit: 0,
        summary: '临时设施摊销',
        explanation: '临时设施摊销。借5000元。'
      },
      {
        subjectCode: '6602',
        debit: 10000,
        credit: 0,
        summary: '办公租金摊销',
        explanation: '办公租金摊销。借10000元。'
      },
      {
        subjectCode: '1801',
        debit: 0,
        credit: 5000,
        summary: '临时设施减',
        explanation: '余额40,000元。'
      },
      {
        subjectCode: '1123',
        debit: 0,
        credit: 10000,
        summary: '预付租金减',
        explanation: '余额70,000元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '摊销计算表',
        date: '2026-05-21',
        docTitle: '2026年5月摊销计算表',
        content: '期间：2026年5月\n\n一、临时设施摊销\n┌──────────────┬──────────┬──────────┬───────────┐\n│    项目       │  原值     │ 月摊销额  │  累计摊销  │\n├──────────────┼──────────┼──────────┼───────────┤\n│ 临时板房     │  72,000  │   3,000  │   30,000  │\n│ 临时围挡     │  48,000  │   2,000  │   20,000  │\n├──────────────┼──────────┼──────────┼───────────┤\n│  小计        │ 120,000  │   5,000  │   50,000  │\n│  摊余价值    │          │          │   70,000  │\n└──────────────┴──────────┴──────────┴───────────┘\n\n二、预付租金摊销\n预付全年办公租金120,000元，月摊销10,000元\n累计已摊销：50,000元（1-5月）\n摊余价值：70,000元\n\n三、合计摊销：5,000+10,000=15,000元 ✓\n\n制表：李会计\n审核：王总工',
        signature: '李会计'
      }
    ]
  },
  {
    date: '2026-05-24',
    role: 'accountant',
    title: '间接费用归集与分摊',
    tags: [
      '工程成本'
    ],
    difficulty: 3,
    description: '本月间接费用40,000+14,680+2,500=57,180元。按双项目直接人工比例分摊：恒达60K/110K=54.55%得31,180元，市政50K/110K=45.45%得26,000元。',
    tip: '双项目间接费按直接人工比例分摊。',
    entries: [
      {
        subjectCode: '540101',
        debit: 31180,
        credit: 0,
        summary: '间接费-恒达项目',
        explanation: '双项目间接收割分配。'
      },
      {
        subjectCode: '540101',
        debit: 26000,
        credit: 0,
        summary: '间接费-市政项目',
        explanation: '间接费-市政项目。借26000元。'
      },
      {
        subjectCode: '540106',
        debit: 0,
        credit: 57180,
        summary: '间接费用转出',
        explanation: '间接费用转出。贷57180元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '间接费用分配表',
        date: '2026-05-24',
        docTitle: '2026年5月间接费用归集与分配表',
        content: '期间：2026年5月\n\n一、间接费用明细\n┌──────────────────┬──────────┐\n│    费用项目       │  金额     │\n├──────────────────┼──────────┤\n│ 项目部管理人员工资 │  40,000  │\n│ 项目部社保公积金   │  14,680  │\n│ 项目办公费        │   2,500  │\n├──────────────────┼──────────┤\n│    合计           │  57,180  │\n└──────────────────┴──────────┘\n\n二、分配标准（按双项目直接人工比例）\n恒达项目直接人工：60,000元\n市政项目直接人工：50,000元\n直接人工总额：110,000元\n\n三、分配计算\n恒达项目：57,180×60,000/110,000=57,180×54.55%=31,180元\n市政项目：57,180×50,000/110,000=57,180×45.45%=26,000元\n\n四、零余额确认\n间接费用（540106）余额：0 ✓\n\n制表：李会计\n审核：王总工',
        signature: '李会计'
      }
    ]
  },
  {
    date: '2026-05-25',
    role: 'accountant',
    title: '结转双项目主营业务成本',
    tags: [
      '工程合同'
    ],
    difficulty: 3,
    description: '结转双项目成本。恒达：人工(60K+已分配间接31,180)=91,180+材料80,000+分包420,000+机械(15,000+9,000+1,250)=25,250+其他(差旅4,000×54.55%≈2,180+水电9,000)=11,180=627,610元。市政：人工(50K+26,000)+材料(30,000+120,000)+机械6,000+其他(差旅4,000×45.45%≈1,820+水电6,000)=7,820=239,820元。',
    tip: '',
    entries: [
      {
        subjectCode: '6401',
        debit: 627610,
        credit: 0,
        summary: '结转恒达项目成本',
        explanation: '结转恒达项目成本。借627610元。'
      },
      {
        subjectCode: '6401',
        debit: 239820,
        credit: 0,
        summary: '结转市政项目成本',
        explanation: '结转市政项目成本。借239820元。'
      },
      {
        subjectCode: '540101',
        debit: 0,
        credit: 91180,
        summary: '人工转出',
        explanation: '人工转出。贷91180元。'
      },
      {
        subjectCode: '540101',
        debit: 0,
        credit: 76000,
        summary: '市政人工转出',
        explanation: '市政人工转出。贷76000元。'
      },
      {
        subjectCode: '540102',
        debit: 0,
        credit: 80000,
        summary: '材料转出',
        explanation: '材料转出。贷80000元。'
      },
      {
        subjectCode: '540102',
        debit: 0,
        credit: 150000,
        summary: '市政材料转出',
        explanation: '市政材料转出。贷150000元。'
      },
      {
        subjectCode: '540103',
        debit: 0,
        credit: 420000,
        summary: '分包转出',
        explanation: '分包转出。贷420000元。'
      },
      {
        subjectCode: '540104',
        debit: 0,
        credit: 25250,
        summary: '机械转出',
        explanation: '机械转出。贷25250元。'
      },
      {
        subjectCode: '540104',
        debit: 0,
        credit: 6000,
        summary: '市政机械转出',
        explanation: '市政机械转出。贷6000元。'
      },
      {
        subjectCode: '540105',
        debit: 0,
        credit: 11180,
        summary: '其他直接费转出',
        explanation: '其他直接费转出。贷11180元。'
      },
      {
        subjectCode: '540105',
        debit: 0,
        credit: 7820,
        summary: '市政其他转出',
        explanation: '市政其他转出。贷7820元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '成本结转表',
        date: '2026-05-25',
        docTitle: '2026年5月主营业务成本结转表',
        content: '期间：2026年5月\n\n一、恒达办公楼项目成本\n┌──────────────┬──────────┬──────────┐\n│  成本项目     │  金额     │  占比    │\n├──────────────┼──────────┼──────────┤\n│ 人工成本      │  91,180  │  14.5%  │\n│   -施工工资   │  60,000  │          │\n│   -间接费用分配│  31,180  │          │\n│ 材料成本      │  80,000  │  12.7%  │\n│ 分包成本      │ 420,000  │  67.0%  │\n│ 机械使用费    │  25,250  │   4.0%  │\n│   -塔吊租赁   │  15,000  │          │\n│   -燃油维修   │   9,000  │          │\n│   -折旧       │   1,250  │          │\n│ 其他直接费    │  11,180  │   1.8%  │\n├──────────────┼──────────┼──────────┤\n│  小计         │ 627,610  │ 100.0%  │\n└──────────────┴──────────┴──────────┘\n\n二、市政道路项目成本\n┌──────────────┬──────────┬──────────┐\n│  成本项目     │  金额     │  占比    │\n├──────────────┼──────────┼──────────┤\n│ 人工成本      │  76,000  │  31.7%  │\n│   -施工工资   │  50,000  │          │\n│   -间接费用分配│  26,000  │          │\n│ 材料成本      │ 150,000  │  62.5%  │\n│   -勘察设计   │  30,000  │          │\n│   -沥青碎石   │ 120,000  │          │\n│ 机械使用费    │   6,000  │   2.5%  │\n│ 其他直接费    │   7,820  │   3.3%  │\n├──────────────┼──────────┼──────────┤\n│  小计         │ 239,820  │ 100.0%  │\n└──────────────┴──────────┴──────────┘\n\n三、合计\n总成本：627,610+239,820=867,430元\n总收入：650,000+409,500=1,059,500元\n毛利：192,070元\n综合毛利率：18.1%\n\n四、零余额确认\n合同履约成本各明细科目余额：0 ✓\n\n制表：李会计\n审核：王总工',
        signature: '李会计'
      }
    ]
  },
  {
    date: '2026-05-26',
    role: 'accountant',
    title: '计提城建税及附加',
    tags: [
      '税费'
    ],
    difficulty: 2,
    description: '本月增值税：销项(58,500+40,500)=99,000-进项(10,400+15,600)=73,000元。计提城建税5,110元，教育费附加2,190元，地方教育附加1,460元，合计8,760元。',
    tip: '',
    entries: [
      {
        subjectCode: '6403',
        debit: 8760,
        credit: 0,
        summary: '计提附加税',
        explanation: '计提附加税。借8760元。'
      },
      {
        subjectCode: '222103',
        debit: 0,
        credit: 5110,
        summary: '城建税（73,000×7%）',
        explanation: '城建税（73,000×7%）。贷5110元。'
      },
      {
        subjectCode: '222104',
        debit: 0,
        credit: 3650,
        summary: '教育费附加（73,000×5%）',
        explanation: '教育费附加（73,000×5%）。贷3650元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '税费计算表',
        date: '2026-05-26',
        docTitle: '2026年5月城建税及附加计算表',
        content: '期间：2026年5月\n\n一、增值税计算\n销项税额（恒达65万×9%=58,500+市政45万×9%=40,500）：99,000元\n进项税额（装修材料10,400+沥青碎石15,600）：26,000元\n应纳增值税：99,000-26,000=73,000元\n（市政预缴18,000元可抵减，本月实缴55,000元）\n\n二、城建税及附加计算\n计税依据：应纳增值税73,000元\n┌──────────────┬──────┬──────────┬──────────┐\n│    税种       │  税率  │  计算过程  │   金额    │\n├──────────────┼──────┼──────────┼──────────┤\n│ 城建税        │   7%  │73,000×7% │   5,110  │\n│ 教育费附加    │   3%  │73,000×3% │   2,190  │\n│ 地方教育附加  │   2%  │73,000×2% │   1,460  │\n├──────────────┼──────┼──────────┼──────────┤\n│  合计         │  12%  │73,000×12%│   8,760  │\n└──────────────┴──────┴──────────┴──────────┘\n\n制表：李会计\n审核：刘经理',
        signature: '李会计'
      }
    ]
  },
  {
    date: '2026-05-27',
    role: 'accountant',
    title: '银行手续费及利息',
    tags: [
      '资金管理'
    ],
    difficulty: 1,
    description: '5月手续费600元，利息2,200元。',
    tip: '',
    entries: [
      {
        subjectCode: '6603',
        debit: 600,
        credit: 0,
        summary: '手续费',
        explanation: '手续费。借600元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 600,
        summary: '银行手续费',
        explanation: '银行手续费。贷600元。'
      },
      {
        subjectCode: '100201',
        debit: 2200,
        credit: 0,
        summary: '利息',
        explanation: '利息。借2200元。',
        cashFlowItem: 'cf-op5'
      },
      {
        subjectCode: '6603',
        debit: 0,
        credit: 2200,
        summary: '冲减费用',
        explanation: '冲减费用。贷2200元。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '银行回单',
        date: '2026-05-27',
        totalAmount: 600,
        payer: '鼎立建筑工程有限公司',
        payeeName: '工商银行南京分行',
        content: '5月银行手续费',
        refNo: 'YW202605270001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 9876 5432 1098 765'
      },
      {
        type: 'bank',
        label: '利息回单',
        date: '2026-05-27',
        totalAmount: 2200,
        payer: '工商银行南京分行',
        payeeName: '鼎立建筑工程有限公司',
        content: '5月存款利息',
        refNo: 'LX202605270001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 9876 5432 1098 765',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 0123 4567 8901 234'
      }
    ]
  },
  {
    date: '2026-05-10',
    role: 'accountant',
    title: '市政项目部临时设施搭建费',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '市政道路工程新项目部搭建临时办公板房、材料仓库等，费用15,000元，转账支付。',
    tip: '临时设施搭建费计入"合同履约成本-其他直接费用"。',
    entries: [
      {
        subjectCode: '540105',
        debit: 15000,
        credit: 0,
        summary: '临时设施搭建费',
        explanation: '合同履约成本-其他直接费用增加。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 15000,
        summary: '支付临时设施费',
        explanation: '银行存款减少15,000元。',
        cashFlowItem: 'cf-op6',
        cashFlowExplanation: '其他经营活动现金支出。'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '临时设施费发票',
        date: '2026-05-10',
        totalAmount: 15000,
        items: [
          { name: '临时办公板房搭建', amount: 10000 },
          { name: '材料仓库搭建', amount: 5000 }
        ],
        stampText: '已付款'
      }
    ]
  },
  {
    date: '2026-05-28',
    role: 'accountant',
    title: '月末结转损益',
    tags: [
      '期末'
    ],
    difficulty: 3,
    description: '月末结转损益。总收入1,059,500元，总成本867,430元，税金10,260元（含印花税），管理费用(25,000+9,175+5,500+600+10,000+其他)53,775元，财务费用净收入1,600元。',
    tip: '',
    entries: [
      {
        subjectCode: '6001',
        debit: 1059500,
        credit: 0,
        summary: '结转收入',
        explanation: '结转收入。借1059500元。'
      },
      {
        subjectCode: '6401',
        debit: 0,
        credit: 867430,
        summary: '结转成本',
        explanation: '结转成本。贷867430元。'
      },
      {
        subjectCode: '6403',
        debit: 0,
        credit: 10260,
        summary: '结转税金',
        explanation: '结转税金。贷10260元。'
      },
      {
        subjectCode: '6602',
        debit: 0,
        credit: 53775,
        summary: '结转管理费用',
        explanation: '结转管理费用。贷53775元。'
      },
      {
        subjectCode: '6603',
        debit: 1600,
        credit: 0,
        summary: '结转财务费用',
        explanation: '结转财务费用。借1600元。'
      },
      {
        subjectCode: '4103',
        debit: 0,
        credit: 129635,
        summary: '结转本年利润',
        explanation: '结转本年利润。贷129635元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '损益结转表',
        date: '2026-05-28',
        docTitle: '2026年5月损益结转表',
        content: '期间：2026年5月\n\n一、收入结转\n┌──────────────────┬──────────┬──────────┐\n│    科目           │  借方     │  贷方    │\n├──────────────────┼──────────┼──────────┤\n│ 主营业务收入(6001) │1,059,500 │          │\n│ 本年利润(4103)    │          │1,059,500 │\n└──────────────────┴──────────┴──────────┘\n→ 收入余额：0 ✓\n\n二、费用结转\n┌──────────────────┬──────────┬──────────┐\n│    科目           │  借方     │  贷方    │\n├──────────────────┼──────────┼──────────┤\n│ 本年利润(4103)    │ 929,865  │          │\n│ 主营业务成本(6401) │          │ 867,430  │\n│ 税金及附加(6403)   │          │  10,260  │\n│ 管理费用(6602)    │          │  53,775  │\n│ 财务费用(6603)    │          │  -1,600  │\n├──────────────────┼──────────┼──────────┤\n│  费用合计          │          │ 929,865  │\n└──────────────────┴──────────┴──────────┘\n→ 损益类科目余额：0 ✓\n\n三、净利润计算\n收入：1,059,500元\n费用：867,430+10,260+53,775-1,600=929,865元\n净利润：1,059,500-929,865=129,635元\n\n制表：李会计\n审核：刘经理',
        signature: '李会计'
      }
    ]
  },
  {
    date: '2026-05-30',
    role: 'accountant',
    title: '模拟纳税申报',
    tags: [
      '期末',
      '申报'
    ],
    difficulty: 1,
    description: '5月增值税应纳73,000元（预缴市政18,000元可抵减），城建税5,110元，教育费附加3,650元。',
    tip: '市政项目预缴的增值税可抵减。',
    entries: [],
    documents: [
      {
        type: 'text',
        label: '模拟纳税申报表',
        date: '2026-05-30',
        docTitle: '2026年5月增值税及附加纳税申报表',
        content: '纳税人：鼎立建筑工程有限公司\n所属期：2026年5月\n\n一、增值税申报\n┌──────────────────────────────┬────────────┐\n│          项目                 │    金额     │\n├──────────────────────────────┼────────────┤\n│ 应税销售额                    │ 1,100,000  │\n│  ├─ 恒达项目（650,000）       │             │\n│  └─ 市政项目（450,000）       │             │\n│ 销项税额（9%）                 │    99,000  │\n│ 进项税额                      │    26,000  │\n│  ├─ 装修材料（10,400）        │             │\n│  └─ 沥青碎石（15,600）        │             │\n│ 应纳增值税                     │    73,000  │\n│ 减：预缴税款                   │    18,000  │\n│ 本期应补（退）税额              │    55,000  │\n└──────────────────────────────┴────────────┘\n\n二、附加税费\n┌──────────────────────────────┬────────────┐\n│          项目                 │    金额     │\n├──────────────────────────────┼────────────┤\n│ 城建税（增值税×7%）            │     5,110  │\n│ 教育费附加（增值税×3%）        │     2,190  │\n│ 地方教育附加（增值税×2%）      │     1,460  │\n├──────────────────────────────┼────────────┤\n│ 附加税费合计                   │     8,760  │\n└──────────────────────────────┴────────────┘\n\n三、本月应纳税总额\n增值税55,000+附加8,760=63,760元\n\n申报人：李会计\n申报日期：2026-05-30',
        signature: '李会计'
      }
    ],
    nextAction: 'tax-filing'
  }
]

export default tasks
