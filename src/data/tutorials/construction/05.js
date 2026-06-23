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
        label: '缴税凭证',
        date: '2026-05-04',
        totalAmount: 61657,
        content: '4月税费'
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
        label: '社保回单',
        date: '2026-05-04',
        totalAmount: 38285
      },
      {
        type: 'bank',
        label: '公积金回单',
        totalAmount: 18600
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
        label: '代发回单',
        date: '2026-05-05',
        totalAmount: 155000,
        content: '4月工资'
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
        label: '现金支票',
        date: '2026-05-06',
        totalAmount: 25000
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
        ]
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
        content: '市政道路工程预付款30%'
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
        ]
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
        ]
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
        content: '市政项目机械预付租金'
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        totalAmount: 5500
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
        content: '永兴劳务结算款'
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
        totalAmount: 490500
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
        totalAmount: 708500
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
        content: '恒达地产4月工程款'
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
        content: '恒达60K+市政50K+项目部40K+管理25K=175K'
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
        label: '计提表',
        date: '2026-05-20',
        content: '合计64,225元'
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
        label: '折旧表',
        date: '2026-05-21',
        content: '1,850元'
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
        label: '摊销表',
        date: '2026-05-21',
        content: '15,000元'
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
        content: '恒达54.55%=31,180元，市政45.45%=26,000元，余额0元 ✓'
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
        content: '恒达627,610+市政239,820=867,430元\n恒达收入650,000+市政409,500=1,059,500元\n毛利192,070元'
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
        content: '73,000×12%=8,760元'
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
        label: '回单',
        date: '2026-05-27',
        totalAmount: 600
      },
      {
        type: 'bank',
        label: '利息回单',
        totalAmount: 2200
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
        content: '净利润129,635元 ✓'
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
        label: '申报提醒',
        date: '2026-05-30',
        content: '增值税应纳73,000\n预缴抵减18,000\n实缴55,000\n城建税5,110\n教育费附加3,650'
      }
    ],
    nextAction: 'tax-filing'
  }
]

export default tasks
