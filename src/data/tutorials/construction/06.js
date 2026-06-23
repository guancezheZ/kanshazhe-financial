/**
 * 建筑业 - 6月教学任务
 *
 * 企业：鼎立建筑工程有限公司
 * 税制：一般纳税人（增值税9%）
 * 准则：CAS 14 新收入准则（投入法/完工百分比）
 * 本月主题：半年进度冲刺与质保金处理
 */

const tasks = [
  {
    date: '2026-06-01',
    role: 'accountant',
    title: '缴纳5月增值税及附加税费',
    tags: [
      '税费'
    ],
    difficulty: 2,
    description: '缴纳5月增值税73,000元（扣除预缴18,000元实缴55,000元），城建税5,110元，教育费附加3,650元，合计63,760元。',
    tip: '',
    entries: [
      {
        subjectCode: '222101',
        debit: 55000,
        credit: 0,
        summary: '缴纳增值税',
        explanation: '缴纳增值税。借55000元。'
      },
      {
        subjectCode: '222103',
        debit: 5110,
        credit: 0,
        summary: '缴纳城建税',
        explanation: '缴纳城建税。借5110元。'
      },
      {
        subjectCode: '222104',
        debit: 3650,
        credit: 0,
        summary: '缴纳教育费附加',
        explanation: '缴纳教育费附加。借3650元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 63760,
        summary: '缴纳税款',
        explanation: '银行存款减少。',
        cashFlowItem: 'cf-op4'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '缴税凭证',
        date: '2026-06-01',
        totalAmount: 63760
      }
    ]
  },
  {
    date: '2026-06-01',
    role: 'accountant',
    title: '缴纳5月社保及公积金',
    tags: [
      '工资社保'
    ],
    difficulty: 1,
    description: '缴纳5月社保43,225元，公积金21,000元，合计64,225元。',
    tip: '',
    entries: [
      {
        subjectCode: '221102',
        debit: 43225,
        credit: 0,
        summary: '缴社保',
        explanation: '缴社保。借43225元。'
      },
      {
        subjectCode: '221103',
        debit: 21000,
        credit: 0,
        summary: '缴公积金',
        explanation: '缴公积金。借21000元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 64225,
        summary: '支付社保公积金',
        explanation: '银行存款减少。',
        cashFlowItem: 'cf-op3'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '社保回单',
        date: '2026-06-01',
        totalAmount: 43225
      },
      {
        type: 'bank',
        label: '公积金回单',
        totalAmount: 21000
      }
    ]
  },
  {
    date: '2026-06-02',
    role: 'accountant',
    title: '发放5月职工工资',
    tags: [
      '工资社保'
    ],
    difficulty: 1,
    description: '银行代发5月工资175,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '221101',
        debit: 175000,
        credit: 0,
        summary: '发5月工资',
        explanation: '发5月工资。借175000元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 175000,
        summary: '代发工资',
        explanation: '银行存款减少。',
        cashFlowItem: 'cf-op3'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '代发回单',
        date: '2026-06-02',
        totalAmount: 175000
      }
    ]
  },
  {
    date: '2026-06-03',
    role: 'accountant',
    title: '提取备用金',
    tags: [
      '资金管理'
    ],
    difficulty: 1,
    description: '提取备用金20,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '1001',
        debit: 20000,
        credit: 0,
        summary: '备用金',
        explanation: '备用金。借20000元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 20000,
        summary: '提取',
        explanation: '提取。贷20000元。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '现金支票',
        date: '2026-06-03',
        totalAmount: 20000
      }
    ]
  },
  {
    date: '2026-06-04',
    role: 'accountant',
    title: '恒达项目装修材料采购',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '恒达项目采购装修阶段不锈钢、玻璃等材料，价款100,000元，增值税13,000元，合计113,000元，转账支付。',
    tip: '办公楼进入装修阶段，材料档次提高。',
    entries: [
      {
        subjectCode: '540102',
        debit: 100000,
        credit: 0,
        summary: '采购装修材料-恒达',
        explanation: '采购装修材料-恒达。借100000元。'
      },
      {
        subjectCode: '222101',
        debit: 13000,
        credit: 0,
        summary: '进项税额',
        explanation: '进项税额。借13000元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 113000,
        summary: '支付材料款',
        explanation: '银行存款减少。',
        cashFlowItem: 'cf-op2'
      }
    ],
    documents: [
      {
        type: 'invoice',
        label: '发票',
        date: '2026-06-04',
        totalAmount: 113000,
        lineItems: [
          {
            name: '不锈钢扶手',
            qty: 500,
            unit: '米',
            price: 120,
            amount: 60000
          },
          {
            name: '钢化玻璃',
            qty: 200,
            unit: '平方米',
            price: 200,
            amount: 40000
          }
        ]
      }
    ]
  },
  {
    date: '2026-06-04',
    role: 'accountant',
    title: '市政项目材料补充采购',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '市政项目采购管涵、检查井等材料，价款70,000元，增值税9,100元，合计79,100元，转账支付。',
    tip: '',
    entries: [
      {
        subjectCode: '540102',
        debit: 70000,
        credit: 0,
        summary: '采购市政管涵材料',
        explanation: '采购市政管涵材料。借70000元。'
      },
      {
        subjectCode: '222101',
        debit: 9100,
        credit: 0,
        summary: '进项税额',
        explanation: '进项税额。借9100元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 79100,
        summary: '支付材料款',
        explanation: '银行存款减少。',
        cashFlowItem: 'cf-op2'
      }
    ],
    documents: [
      {
        type: 'invoice',
        label: '发票',
        date: '2026-06-04',
        totalAmount: 79100,
        lineItems: [
          {
            name: '钢筋混凝土管',
            qty: 100,
            unit: '米',
            price: 500,
            amount: 50000
          },
          {
            name: '检查井盖',
            qty: 40,
            unit: '套',
            price: 500,
            amount: 20000
          }
        ]
      }
    ]
  },
  {
    date: '2026-06-05',
    role: 'accountant',
    title: '市政项目机械租赁费摊销',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '摊销5月预付的市政机械租金40,000元（用于5月施工期间）。',
    tip: '',
    entries: [
      {
        subjectCode: '540104',
        debit: 40000,
        credit: 0,
        summary: '市政机械费摊销',
        explanation: '机械使用费增加。'
      },
      {
        subjectCode: '1123',
        debit: 0,
        credit: 40000,
        summary: '预付租金减少',
        explanation: '预付租金减少。贷40000元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '摊销表',
        date: '2026-06-05',
        content: '市政项目机械费40,000元摊销完毕'
      }
    ]
  },
  {
    date: '2026-06-05',
    role: 'accountant',
    title: '支付塔吊及机械维修费',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '支付6月塔吊租金15,000元及双项目机械维修费8,000元，合计23,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '540104',
        debit: 15000,
        credit: 0,
        summary: '塔吊租金-恒达',
        explanation: '塔吊租金-恒达。借15000元。'
      },
      {
        subjectCode: '540104',
        debit: 8000,
        credit: 0,
        summary: '机械维修费-双项目',
        explanation: '机械维修费-双项目。借8000元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 23000,
        summary: '支付',
        explanation: '银行存款减少。',
        cashFlowItem: 'cf-op6'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '机械费',
        date: '2026-06-05',
        totalAmount: 23000,
        items: [
          {
            name: '塔吊租金',
            amount: 15000
          },
          {
            name: '维修费',
            amount: 8000
          }
        ]
      }
    ]
  },
  {
    date: '2026-06-06',
    role: 'accountant',
    title: '支付施工现场水电费',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '支付6月双项目水电费：恒达8,000元，市政7,000元，合计15,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '540105',
        debit: 15000,
        credit: 0,
        summary: '水电费',
        explanation: '其他直接费增加。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 15000,
        summary: '支付',
        explanation: '银行存款减少。',
        cashFlowItem: 'cf-op6'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '水电费',
        date: '2026-06-06',
        totalAmount: 15000,
        items: [
          {
            name: '恒达项目',
            amount: 8000
          },
          {
            name: '市政项目',
            amount: 7000
          }
        ]
      }
    ]
  },
  {
    date: '2026-06-07',
    role: 'accountant',
    title: '恒达项目-质保金到期',
    tags: [
      '往来管理'
    ],
    difficulty: 2,
    description: '恒达项目前期工程质保金到期，收回大地基础公司质保金40,000元（桩基工程扣留）。',
    tip: '质保期届满，收回质保金。',
    entries: [
      {
        subjectCode: '100201',
        debit: 40000,
        credit: 0,
        summary: '收回质保金',
        explanation: '银行存款增加。',
        cashFlowItem: 'cf-op5'
      },
      {
        subjectCode: '224101',
        debit: 0,
        credit: 40000,
        summary: '质保金转出',
        explanation: '其他应付款-质保金减少。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '收款回单',
        date: '2026-06-07',
        totalAmount: 40000,
        content: '大地基础质保金返还'
      }
    ]
  },
  {
    date: '2026-06-10',
    role: 'accountant',
    title: '项目部差旅及办公费',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '报销6月项目部差旅费3,800元，办公费2,200元，合计6,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '540105',
        debit: 3800,
        credit: 0,
        summary: '差旅',
        explanation: '差旅。借3800元。'
      },
      {
        subjectCode: '540106',
        debit: 2200,
        credit: 0,
        summary: '办公',
        explanation: '办公。借2200元。'
      },
      {
        subjectCode: '1001',
        debit: 0,
        credit: 6000,
        summary: '现金',
        explanation: '现金。贷6000元。'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '报销单',
        date: '2026-06-10',
        totalAmount: 6000,
        items: [
          {
            name: '差旅',
            amount: 3800
          },
          {
            name: '办公',
            amount: 2200
          }
        ]
      }
    ]
  },
  {
    date: '2026-06-10',
    role: 'accountant',
    title: '公司管理办公费',
    tags: [
      '资金管理'
    ],
    difficulty: 1,
    description: '支付6月公司办公费4,500元。',
    tip: '',
    entries: [
      {
        subjectCode: '6602',
        debit: 4500,
        credit: 0,
        summary: '办公费',
        explanation: '管理费用增加。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 4500,
        summary: '支付',
        explanation: '银行存款减少。',
        cashFlowItem: 'cf-op6'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '办公费',
        date: '2026-06-10',
        totalAmount: 4500
      }
    ]
  },
  {
    date: '2026-06-11',
    role: 'accountant',
    title: '支付5月供应商欠款',
    tags: [
      '往来管理'
    ],
    difficulty: 1,
    description: '支付市政项目5月欠材料供应商货款135,600元。',
    tip: '',
    entries: [
      {
        subjectCode: '2202',
        debit: 135600,
        credit: 0,
        summary: '还欠款',
        explanation: '应付账款减少。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 135600,
        summary: '付欠款',
        explanation: '银行存款减少。',
        cashFlowItem: 'cf-op2'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '回单',
        date: '2026-06-11',
        totalAmount: 135600,
        content: '付市政材料欠款'
      }
    ]
  },
  {
    date: '2026-06-12',
    role: 'accountant',
    title: '半年工程进度汇总',
    tags: [
      '工程合同'
    ],
    difficulty: 3,
    description: '编制半年工程进度报告。恒达项目累计完工进度85%待装修完成，市政项目累计完工进度35%。上半年总收入累计已达451万元（682,500+1,067,500+1,000,000+850,000+650,000+409,500），总成本3,297,525元，累计净利润约116万元。',
    tip: '',
    entries: [],
    documents: [
      {
        type: 'text',
        label: '半年进度报告',
        date: '2026-06-12',
        docTitle: '2026年上半年工程进度汇总',
        content: '恒达地产办公楼：累计85%（装修阶段）\n市政道路工程：累计35%（路基施工）\n总收入：4,510,000元\n总成本：3,297,525元\n净利润：约1,160,000元',
        signature: '项目管理部'
      }
    ]
  },
  {
    date: '2026-06-13',
    role: 'accountant',
    title: '支付安全生产费用',
    tags: [
      '工程成本'
    ],
    difficulty: 2,
    description: '使用安全生产费购买现场安全防护用品（安全网、警示牌、消防器材等），共计18,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '224101',
        debit: 18000,
        credit: 0,
        summary: '使用安全生产费',
        explanation: '专项应付款减少。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 18000,
        summary: '支付安全费用',
        explanation: '银行存款减少。',
        cashFlowItem: 'cf-op6'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '安全用品发票',
        date: '2026-06-13',
        totalAmount: 18000,
        items: [
          {
            name: '安全防护网',
            amount: 8000
          },
          {
            name: '警示牌等',
            amount: 5000
          },
          {
            name: '消防器材',
            amount: 5000
          }
        ]
      }
    ]
  },
  {
    date: '2026-06-14',
    role: 'accountant',
    title: '收到恒达地产5月进度款',
    tags: [
      '往来管理'
    ],
    difficulty: 1,
    description: '收到恒达地产5月工程进度款708,500元。',
    tip: '',
    entries: [
      {
        subjectCode: '100201',
        debit: 708500,
        credit: 0,
        summary: '收恒达款',
        explanation: '收恒达款。借708500元。',
        cashFlowItem: 'cf-op1'
      },
      {
        subjectCode: '1122',
        debit: 0,
        credit: 708500,
        summary: '应收减少',
        explanation: '应收减少。贷708500元。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '回单',
        date: '2026-06-14',
        totalAmount: 708500,
        content: '恒达5月进度款'
      }
    ]
  },
  {
    date: '2026-06-17',
    role: 'accountant',
    title: '确认市政项目工程进度',
    tags: [
      '工程合同'
    ],
    difficulty: 3,
    description: '市政项目累计完工进度35%（本月新增20%）。确认收入：300万×35%-已确认收入409,500=640,500元（不含税）。合同负债余额45万元（90万-45万），本次冲减45万，差额计入应收账款。',
    tip: '',
    entries: [
      {
        subjectCode: '2205',
        debit: 450000,
        credit: 0,
        summary: '合同负债冲减-市政',
        explanation: '合同负债冲减-市政。借450000元。'
      },
      {
        subjectCode: '1122',
        debit: 248145,
        credit: 0,
        summary: '应收账款-市建设局',
        explanation: '应收账款-市建设局。借248145元。'
      },
      {
        subjectCode: '222101',
        debit: 0,
        credit: 57645,
        summary: '增值税销项税额（640,500×9%）',
        explanation: '增值税销项税额（640,500×9%）。贷57645元。'
      },
      {
        subjectCode: '6001',
        debit: 0,
        credit: 640500,
        summary: '确认收入-市政项目',
        explanation: '确认收入-市政项目。贷640500元。'
      }
    ],
    documents: [
      {
        type: 'invoice',
        label: '发票',
        date: '2026-06-17',
        lineItems: [
          {
            name: '市政道路工程进度款（累计35%）',
            qty: 1,
            unit: '项',
            price: 640500,
            amount: 640500
          }
        ],
        totalAmount: 698145
      }
    ]
  },
  {
    date: '2026-06-17',
    role: 'accountant',
    title: '确认恒达项目工程进度',
    tags: [
      '工程合同'
    ],
    difficulty: 3,
    description: '恒达项目装修阶段进行中，累计完工进度92%（本月新增7%）。确认收入：500万×92%-已确认收入4,250,000=350,000元（不含税），增值税31,500元。',
    tip: '',
    entries: [
      {
        subjectCode: '1122',
        debit: 381500,
        credit: 0,
        summary: '应收账款-恒达',
        explanation: '应收账款-恒达。借381500元。'
      },
      {
        subjectCode: '222101',
        debit: 0,
        credit: 31500,
        summary: '销项税额',
        explanation: '应交增值税增加。'
      },
      {
        subjectCode: '6001',
        debit: 0,
        credit: 350000,
        summary: '确认收入-恒达项目',
        explanation: '确认收入-恒达项目。贷350000元。'
      }
    ],
    documents: [
      {
        type: 'invoice',
        label: '发票',
        date: '2026-06-17',
        lineItems: [
          {
            name: '办公楼装修工程进度款（累计92%）',
            qty: 1,
            unit: '项',
            price: 350000,
            amount: 350000
          }
        ],
        totalAmount: 381500
      }
    ]
  },
  {
    date: '2026-06-20',
    role: 'accountant',
    title: '计提6月职工薪酬',
    tags: [
      '工资社保'
    ],
    difficulty: 2,
    description: '计提6月工资：施工人员（恒达50K+市政55K=105K），项目部42,000元，公司25,000元，合计172,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '540101',
        debit: 105000,
        credit: 0,
        summary: '施工工资',
        explanation: '施工工资。借105000元。'
      },
      {
        subjectCode: '540106',
        debit: 42000,
        credit: 0,
        summary: '项目部工资',
        explanation: '项目部工资。借42000元。'
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
        credit: 172000,
        summary: '应付薪酬',
        explanation: '应付薪酬。贷172000元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '工资表',
        date: '2026-06-20',
        content: '172,000元'
      }
    ]
  },
  {
    date: '2026-06-20',
    role: 'accountant',
    title: '计提6月社保及公积金',
    tags: [
      '工资社保'
    ],
    difficulty: 2,
    description: '计提6月社保及公积金：施工105K×36.7%=38,535元，项目部42K×36.7%=15,414元，管理25K×36.7%=9,175元，合计63,124元。',
    tip: '',
    entries: [
      {
        subjectCode: '540101',
        debit: 38535,
        credit: 0,
        summary: '施工社保公积金',
        explanation: '施工社保公积金。借38535元。'
      },
      {
        subjectCode: '540106',
        debit: 15414,
        credit: 0,
        summary: '项目部社保公积金',
        explanation: '项目部社保公积金。借15414元。'
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
        credit: 42484,
        summary: '社保（172K×24.7%）',
        explanation: '社保（172K×24.7%）。贷42484元。'
      },
      {
        subjectCode: '221103',
        debit: 0,
        credit: 20640,
        summary: '公积金（172K×12%）',
        explanation: '公积金（172K×12%）。贷20640元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '计提表',
        date: '2026-06-20',
        content: '63,124元'
      }
    ]
  },
  {
    date: '2026-06-21',
    role: 'accountant',
    title: '计提固定资产折旧',
    tags: [
      '工程成本'
    ],
    difficulty: 2,
    description: '6月折旧1,850元。',
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
        subjectCode: '6602',
        debit: 600,
        credit: 0,
        summary: '折旧',
        explanation: '折旧。借600元。'
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
        date: '2026-06-21',
        content: '1,850元'
      }
    ]
  },
  {
    date: '2026-06-21',
    role: 'accountant',
    title: '摊销临时设施及预付租金',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '摊销6月临时设施5,000元，预付租金10,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '540105',
        debit: 5000,
        credit: 0,
        summary: '临设摊销',
        explanation: '临设摊销。借5000元。'
      },
      {
        subjectCode: '6602',
        debit: 10000,
        credit: 0,
        summary: '租金摊销',
        explanation: '租金摊销。借10000元。'
      },
      {
        subjectCode: '1801',
        debit: 0,
        credit: 5000,
        summary: '临时设施减',
        explanation: '余额35,000元。'
      },
      {
        subjectCode: '1123',
        debit: 0,
        credit: 10000,
        summary: '租金减',
        explanation: '余额60,000元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '摊销表',
        date: '2026-06-21',
        content: '15,000元'
      }
    ]
  },
  {
    date: '2026-06-24',
    role: 'accountant',
    title: '间接费用归集与分摊',
    tags: [
      '工程成本'
    ],
    difficulty: 3,
    description: '本月间接费用42,000+15,414+2,200=59,614元。按直接人工分摊：恒达50K/105K=47.62%得28,386元，市政55K/105K=52.38%得31,228元。',
    tip: '',
    entries: [
      {
        subjectCode: '540101',
        debit: 28386,
        credit: 0,
        summary: '间接费转恒达',
        explanation: '间接费转恒达。借28386元。'
      },
      {
        subjectCode: '540101',
        debit: 31228,
        credit: 0,
        summary: '间接费转市政',
        explanation: '间接费转市政。借31228元。'
      },
      {
        subjectCode: '540106',
        debit: 0,
        credit: 59614,
        summary: '间接费转出',
        explanation: '间接费转出。贷59614元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '间接费用表',
        date: '2026-06-24',
        content: '恒达47.62%=28,386/市政52.38%=31,228=59,614元'
      }
    ]
  },
  {
    date: '2026-06-25',
    role: 'accountant',
    title: '结转双项目主营业务成本',
    tags: [
      '工程合同'
    ],
    difficulty: 3,
    description: '恒达：人工(50K+28,386)=78,386+材料100,000+机械(15,000+1,250)=16,250+其他(水电8,000+差旅3,800×47.62%≈1,810)=9,810=204,446元。市政：人工(55K+31,228)=86,228+材料70,000+机械(40,000+8,000×52.38%≈4,190)=44,190+其他(水电7,000+差旅3,800×52.38%≈1,990)=8,990=209,408元。',
    tip: '',
    entries: [
      {
        subjectCode: '6401',
        debit: 204446,
        credit: 0,
        summary: '结转恒达成本',
        explanation: '结转恒达成本。借204446元。'
      },
      {
        subjectCode: '6401',
        debit: 209408,
        credit: 0,
        summary: '结转市政成本',
        explanation: '结转市政成本。借209408元。'
      },
      {
        subjectCode: '540101',
        debit: 0,
        credit: 164614,
        summary: '人工转出',
        explanation: '人工转出。贷164614元。'
      },
      {
        subjectCode: '540102',
        debit: 0,
        credit: 170000,
        summary: '材料转出',
        explanation: '材料转出。贷170000元。'
      },
      {
        subjectCode: '540104',
        debit: 0,
        credit: 60440,
        summary: '机械转出',
        explanation: '机械转出。贷60440元。'
      },
      {
        subjectCode: '540105',
        debit: 0,
        credit: 18800,
        summary: '其他转出',
        explanation: '其他转出。贷18800元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '成本表',
        date: '2026-06-25',
        content: '恒达204,446+市政209,408=413,854元\n总收入990,500元\n毛利576,646元'
      }
    ]
  },
  {
    date: '2026-06-26',
    role: 'accountant',
    title: '计提城建税及附加',
    tags: [
      '税费'
    ],
    difficulty: 2,
    description: '本月增值税：销项(31,500+57,645)=89,145-进项(13,000+9,100)=67,045元。计提城建税4,693元，教育费附加2,011元，地方教育附加1,341元，合计8,045元。',
    tip: '',
    entries: [
      {
        subjectCode: '6403',
        debit: 8045,
        credit: 0,
        summary: '计提附加税',
        explanation: '计提附加税。借8045元。'
      },
      {
        subjectCode: '222103',
        debit: 0,
        credit: 4693,
        summary: '城建税',
        explanation: '城建税。贷4693元。'
      },
      {
        subjectCode: '222104',
        debit: 0,
        credit: 3352,
        summary: '教育费附加',
        explanation: '教育费附加。贷3352元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '税费表',
        date: '2026-06-26',
        content: '67,045×12%=8,045元'
      }
    ]
  },
  {
    date: '2026-06-27',
    role: 'accountant',
    title: '银行手续费及利息',
    tags: [
      '资金管理'
    ],
    difficulty: 1,
    description: '6月手续费550元，利息2,500元。',
    tip: '',
    entries: [
      {
        subjectCode: '6603',
        debit: 550,
        credit: 0,
        summary: '手续费',
        explanation: '手续费。借550元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 550,
        summary: '银行手续费',
        explanation: '银行手续费。贷550元。'
      },
      {
        subjectCode: '100201',
        debit: 2500,
        credit: 0,
        summary: '利息',
        explanation: '利息。借2500元。',
        cashFlowItem: 'cf-op5'
      },
      {
        subjectCode: '6603',
        debit: 0,
        credit: 2500,
        summary: '冲减',
        explanation: '冲减。贷2500元。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '回单',
        date: '2026-06-27',
        totalAmount: 550
      },
      {
        type: 'bank',
        label: '利息单',
        totalAmount: 2500
      }
    ]
  },
  {
    date: '2026-06-12',
    role: 'accountant',
    title: '半年工程资料整理及归档费',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '半年末整理恒达项目及市政项目工程技术资料、财务资料，聘请专业机构整理归档，费用5,000元，转账支付。',
    tip: '资料整理费计入"合同履约成本-合同成本"。',
    entries: [
      {
        subjectCode: '540101',
        debit: 5000,
        credit: 0,
        summary: '工程资料整理归档费',
        explanation: '合同履约成本-合同成本增加。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 5000,
        summary: '支付资料整理费',
        explanation: '银行存款减少5,000元。',
        cashFlowItem: 'cf-op6',
        cashFlowExplanation: '其他经营活动现金支出。'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '服务费发票',
        date: '2026-06-12',
        totalAmount: 5000,
        items: [
          { name: '工程资料整理归档服务', amount: 5000 }
        ]
      }
    ]
  },
  {
    date: '2026-06-18',
    role: 'accountant',
    title: '环保降尘整治费',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '环保部门检查要求工地降尘整改，购置防尘网、租赁雾炮机等，费用8,000元，转账支付。',
    tip: '环保降尘费计入"合同履约成本-其他直接费用"。',
    entries: [
      {
        subjectCode: '540105',
        debit: 8000,
        credit: 0,
        summary: '环保降尘整治费',
        explanation: '合同履约成本-其他直接费用增加。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 8000,
        summary: '支付环保整治费',
        explanation: '银行存款减少8,000元。',
        cashFlowItem: 'cf-op6',
        cashFlowExplanation: '其他经营活动现金支出。'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '环保材料及租赁发票',
        date: '2026-06-18',
        totalAmount: 8000,
        items: [
          { name: '防尘网采购', amount: 3500 },
          { name: '雾炮机租赁', amount: 4500 }
        ]
      }
    ]
  },
  {
    date: '2026-06-28',
    role: 'accountant',
    title: '月末结转损益',
    tags: [
      '期末'
    ],
    difficulty: 3,
    description: '月末结转损益：收入990,500元，成本413,854元，税金9,545元，管理费用(25,000+9,175+4,500+600+10,000)49,275元，财务费用净收入1,950元。',
    tip: '',
    entries: [
      {
        subjectCode: '6001',
        debit: 990500,
        credit: 0,
        summary: '结转收入',
        explanation: '结转收入。借990500元。'
      },
      {
        subjectCode: '6401',
        debit: 0,
        credit: 413854,
        summary: '结转成本',
        explanation: '结转成本。贷413854元。'
      },
      {
        subjectCode: '6403',
        debit: 0,
        credit: 9545,
        summary: '结转税金',
        explanation: '结转税金。贷9545元。'
      },
      {
        subjectCode: '6602',
        debit: 0,
        credit: 49275,
        summary: '结转管理费',
        explanation: '结转管理费。贷49275元。'
      },
      {
        subjectCode: '6603',
        debit: 1950,
        credit: 0,
        summary: '结转财务费',
        explanation: '结转财务费。借1950元。'
      },
      {
        subjectCode: '4103',
        debit: 0,
        credit: 519776,
        summary: '结转本年利润',
        explanation: '净利润519,776元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '结转表',
        date: '2026-06-28',
        content: '净利润519,776元 ✓'
      }
    ]
  },
  {
    date: '2026-06-30',
    role: 'accountant',
    title: '模拟纳税申报',
    tags: [
      '期末',
      '申报'
    ],
    difficulty: 1,
    description: '6月增值税应纳67,045元，城建税4,693元，教育费附加3,352元。',
    tip: '',
    entries: [],
    documents: [
      {
        type: 'text',
        label: '申报提醒',
        date: '2026-06-30',
        content: '增值税67,045+附加8,045=75,090元'
      }
    ],
    nextAction: 'tax-filing'
  }
]

export default tasks
