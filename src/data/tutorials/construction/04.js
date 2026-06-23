/**
 * 建筑业 - 4月教学任务
 *
 * 企业：鼎立建筑工程有限公司
 * 税制：一般纳税人（增值税9%）
 * 准则：CAS 14 新收入准则（投入法/完工百分比）
 * 本月主题：主体施工推进与成本控制
 */

const tasks = [
  {
    date: '2026-04-01',
    role: 'accountant',
    title: '缴纳3月增值税及附加税费',
    tags: [
      '税费'
    ],
    difficulty: 2,
    description: '缴纳3月增值税52,820元，城建税3,697元，教育费附加2,641元，合计59,158元。',
    tip: '',
    entries: [
      {
        subjectCode: '222101',
        debit: 52820,
        credit: 0,
        summary: '缴纳增值税',
        explanation: '应交增值税减少。'
      },
      {
        subjectCode: '222103',
        debit: 3697,
        credit: 0,
        summary: '缴纳城建税',
        explanation: '应交城建税减少。'
      },
      {
        subjectCode: '222104',
        debit: 2641,
        credit: 0,
        summary: '缴纳教育费附加',
        explanation: '应交教育费附加减少。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 59158,
        summary: '缴纳税款',
        explanation: '银行存款减少。',
        cashFlowItem: 'cf-op4',
        cashFlowExplanation: '缴纳税费支出。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '电子缴税凭证',
        date: '2026-04-01',
        totalAmount: 59158,
        content: '3月税费'
      }
    ]
  },
  {
    date: '2026-04-01',
    role: 'accountant',
    title: '缴纳3月社保及公积金',
    tags: [
      '工资社保'
    ],
    difficulty: 1,
    description: '缴纳3月社保37,050元、公积金18,000元，合计55,050元。',
    tip: '',
    entries: [
      {
        subjectCode: '221102',
        debit: 37050,
        credit: 0,
        summary: '缴纳社保',
        explanation: '应付职工薪酬-社保减少。'
      },
      {
        subjectCode: '221103',
        debit: 18000,
        credit: 0,
        summary: '缴纳公积金',
        explanation: '应付职工薪酬-公积金减少。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 55050,
        summary: '支付社保公积金',
        explanation: '银行存款减少。',
        cashFlowItem: 'cf-op3',
        cashFlowExplanation: '支付给职工以及为职工支付的现金。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '社保缴费回单',
        date: '2026-04-01',
        totalAmount: 37050,
        content: '3月社保费'
      },
      {
        type: 'bank',
        label: '公积金回单',
        totalAmount: 18000,
        content: '3月公积金'
      }
    ]
  },
  {
    date: '2026-04-02',
    role: 'accountant',
    title: '发放3月职工工资',
    tags: [
      '工资社保'
    ],
    difficulty: 1,
    description: '通过银行代发3月职工工资150,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '221101',
        debit: 150000,
        credit: 0,
        summary: '发放3月工资',
        explanation: '应付职工薪酬-工资减少。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 150000,
        summary: '银行代发工资',
        explanation: '银行存款减少。',
        cashFlowItem: 'cf-op3',
        cashFlowExplanation: '支付给职工以及为职工支付的现金。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '代发工资回单',
        date: '2026-04-02',
        totalAmount: 150000,
        content: '3月工资发放'
      }
    ]
  },
  {
    date: '2026-04-03',
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
        summary: '提取备用金',
        explanation: '提取备用金。借20000元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 20000,
        summary: '提取备用金',
        explanation: '提取备用金。贷20000元。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '现金支票存根',
        date: '2026-04-03',
        totalAmount: 20000,
        content: '备用金'
      }
    ]
  },
  {
    date: '2026-04-04',
    role: 'accountant',
    title: '砌体分包合同签订',
    tags: [
      '分包管理'
    ],
    difficulty: 1,
    description: '与永兴劳务公司签订砌体及二次结构分包合同，合同价60万元（不含税）。主体施工进入砌体阶段。',
    tip: '砌体工程分包是主体施工的重要组成部分。',
    entries: [],
    documents: [
      {
        type: 'text',
        label: '分包合同',
        date: '2026-04-04',
        docTitle: '砌体工程分包合同',
        content: '分包单位：永兴劳务有限公司\n合同价：600,000元（不含税）\n工期：4月5日-5月15日\n付款：按月进度计量',
        signature: '鼎立建筑 永兴劳务'
      }
    ]
  },
  {
    date: '2026-04-07',
    role: 'accountant',
    title: '主体施工材料采购（钢筋）',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '采购钢筋25吨，单价4,200元，合计105,000元，增值税13,650元，合计118,650元，转账支付。',
    tip: '',
    entries: [
      {
        subjectCode: '540102',
        debit: 105000,
        credit: 0,
        summary: '采购钢筋25吨',
        explanation: '采购钢筋25吨。借105000元。'
      },
      {
        subjectCode: '222101',
        debit: 13650,
        credit: 0,
        summary: '增值税进项税额',
        explanation: '增值税进项税额。借13650元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 118650,
        summary: '支付钢筋款',
        explanation: '银行存款减少。',
        cashFlowItem: 'cf-op2',
        cashFlowExplanation: '购买商品接受劳务支付的现金。'
      }
    ],
    documents: [
      {
        type: 'invoice',
        label: '增值税专用发票',
        date: '2026-04-07',
        lineItems: [
          {
            name: '螺纹钢',
            qty: 25,
            unit: '吨',
            price: 4200,
            amount: 105000
          }
        ],
        totalAmount: 118650
      }
    ]
  },
  {
    date: '2026-04-07',
    role: 'accountant',
    title: '采购砌体材料（砖、砂浆）',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '采购砌体工程用砖块、砂浆等材料，价款60,000元，增值税7,800元，合计67,800元，转账支付。',
    tip: '砌体材料进场，准备开始砌体工程施工。',
    entries: [
      {
        subjectCode: '540102',
        debit: 60000,
        credit: 0,
        summary: '采购砌体材料',
        explanation: '采购砌体材料。借60000元。'
      },
      {
        subjectCode: '222101',
        debit: 7800,
        credit: 0,
        summary: '增值税进项税额',
        explanation: '增值税进项税额。借7800元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 67800,
        summary: '支付材料款',
        explanation: '银行存款减少。',
        cashFlowItem: 'cf-op2',
        cashFlowExplanation: '购买商品接受劳务支付的现金。'
      }
    ],
    documents: [
      {
        type: 'invoice',
        label: '增值税专用发票',
        date: '2026-04-07',
        totalAmount: 67800,
        lineItems: [
          {
            name: '标准砖',
            qty: 100000,
            unit: '块',
            price: 0.5,
            amount: 50000
          },
          {
            name: '砌筑砂浆',
            qty: 50,
            unit: '吨',
            price: 200,
            amount: 10000
          }
        ]
      }
    ]
  },
  {
    date: '2026-04-08',
    role: 'accountant',
    title: '支付塔吊租赁费（4月）',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '支付4月塔吊租赁费15,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '540104',
        debit: 15000,
        credit: 0,
        summary: '塔吊租赁费4月',
        explanation: '塔吊租赁费4月。借15000元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 15000,
        summary: '支付租赁费',
        explanation: '银行存款减少。',
        cashFlowItem: 'cf-op6',
        cashFlowExplanation: '其他经营活动现金支出。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '银行回单',
        date: '2026-04-08',
        totalAmount: 15000,
        content: '塔吊月租金'
      }
    ]
  },
  {
    date: '2026-04-09',
    role: 'accountant',
    title: '支付机械燃油及维修费',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '支付4月机械燃油费9,000元，维修费3,000元，合计12,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '540104',
        debit: 12000,
        credit: 0,
        summary: '机械燃油及维修费',
        explanation: '机械燃油及维修费。借12000元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 12000,
        summary: '支付机械费',
        explanation: '银行存款减少。',
        cashFlowItem: 'cf-op6',
        cashFlowExplanation: '其他经营活动现金支出。'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '燃油维修发票',
        date: '2026-04-09',
        totalAmount: 12000,
        items: [
          {
            name: '柴油',
            amount: 9000
          },
          {
            name: '维修保养',
            amount: 3000
          }
        ]
      }
    ]
  },
  {
    date: '2026-04-10',
    role: 'accountant',
    title: '支付施工现场水电费',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '支付4月施工水电费：水费2,800元，电费13,000元，合计15,800元。',
    tip: '主体施工阶段用电量维持高位。',
    entries: [
      {
        subjectCode: '540105',
        debit: 15800,
        credit: 0,
        summary: '施工水电费',
        explanation: '施工水电费。借15800元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 15800,
        summary: '支付水电费',
        explanation: '银行存款减少。',
        cashFlowItem: 'cf-op6',
        cashFlowExplanation: '其他经营活动现金支出。'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '水电费缴费单',
        date: '2026-04-10',
        totalAmount: 15800,
        items: [
          {
            name: '施工用电13,000kWh',
            amount: 13000
          },
          {
            name: '施工用水560吨',
            amount: 2800
          }
        ]
      }
    ]
  },
  {
    date: '2026-04-11',
    role: 'accountant',
    title: '砌体分包施工进度确认',
    tags: [
      '分包管理'
    ],
    difficulty: 2,
    description: '永兴劳务砌体分包本月完成30%进度，确认分包成本180,000元（60万×30%）。发票未到，暂估入账。',
    tip: '分包工程按进度确认成本。发票未到需暂估入账，次月冲回。',
    entries: [
      {
        subjectCode: '540103',
        debit: 180000,
        credit: 0,
        summary: '砌体分包成本（30%进度）',
        explanation: '砌体分包成本（30%进度）。借180000元。'
      },
      {
        subjectCode: '2202',
        debit: 0,
        credit: 180000,
        summary: '应付账款-永兴劳务（暂估）',
        explanation: '应付分包款暂估。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '分包进度确认单',
        date: '2026-04-11',
        content: '永兴劳务砌体工程完成30%，确认180,000元',
        signature: '王监理'
      }
    ]
  },
  {
    date: '2026-04-14',
    role: 'accountant',
    title: '项目部差旅及办公费',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '报销4月项目部差旅费2,500元、办公费2,000元，合计4,500元。',
    tip: '',
    entries: [
      {
        subjectCode: '540105',
        debit: 2500,
        credit: 0,
        summary: '差旅费',
        explanation: '差旅费。借2500元。'
      },
      {
        subjectCode: '540106',
        debit: 2000,
        credit: 0,
        summary: '项目办公费',
        explanation: '项目办公费。借2000元。'
      },
      {
        subjectCode: '1001',
        debit: 0,
        credit: 4500,
        summary: '现金支付',
        explanation: '现金支付。贷4500元。'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '报销单',
        date: '2026-04-14',
        totalAmount: 4500,
        items: [
          {
            name: '差旅费',
            amount: 2500
          },
          {
            name: '办公用品',
            amount: 2000
          }
        ]
      }
    ]
  },
  {
    date: '2026-04-14',
    role: 'accountant',
    title: '公司管理办公费',
    tags: [
      '资金管理'
    ],
    difficulty: 1,
    description: '支付4月公司办公费4,800元。',
    tip: '',
    entries: [
      {
        subjectCode: '6602',
        debit: 4800,
        credit: 0,
        summary: '办公费',
        explanation: '管理费用增加。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 4800,
        summary: '支付办公费',
        explanation: '银行存款减少。',
        cashFlowItem: 'cf-op6',
        cashFlowExplanation: '其他经营活动现金支出。'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '办公费明细',
        date: '2026-04-14',
        totalAmount: 4800,
        items: [
          {
            name: '办公耗材',
            amount: 2800
          },
          {
            name: '通讯网络费',
            amount: 2000
          }
        ]
      }
    ]
  },
  {
    date: '2026-04-15',
    role: 'accountant',
    title: '收到恒达地产3月进度款',
    tags: [
      '往来管理'
    ],
    difficulty: 1,
    description: '收到恒达地产支付3月工程进度款1,090,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '100201',
        debit: 1090000,
        credit: 0,
        summary: '收到恒达进度款',
        explanation: '银行存款增加。',
        cashFlowItem: 'cf-op1',
        cashFlowExplanation: '销售商品提供劳务收到的现金。'
      },
      {
        subjectCode: '1122',
        debit: 0,
        credit: 1090000,
        summary: '应收账款收回',
        explanation: '应收账款减少。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '收款回单',
        date: '2026-04-15',
        totalAmount: 1090000,
        content: '恒达地产3月工程进度款'
      }
    ]
  },
  {
    date: '2026-04-16',
    role: 'accountant',
    title: '安全生产费计提',
    tags: [
      '工程成本'
    ],
    difficulty: 2,
    description: '按规定计提建筑施工企业安全生产费用。按工程造价的2%计提，恒达项目累计产值275万元（15%+35%+20%+本次暂估），计提安全生产费55,000元。',
    tip: '安全生产费是建筑业特有费用，专项用于安全生产。',
    entries: [
      {
        subjectCode: '540105',
        debit: 55000,
        credit: 0,
        summary: '计提安全生产费',
        explanation: '其他直接费增加。'
      },
      {
        subjectCode: '224101',
        debit: 0,
        credit: 55000,
        summary: '专项应付款-安全生产费',
        explanation: '安全生产费形成专项负债。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '安全生产费计提表',
        date: '2026-04-16',
        content: '恒达项目累计产值2,750,000×2%=55,000元',
        signature: '李会计'
      }
    ]
  },
  {
    date: '2026-04-17',
    role: 'accountant',
    title: '支付材料供应商欠款',
    tags: [
      '往来管理'
    ],
    difficulty: 1,
    description: '支付3月欠华强建材钢筋款142,380元。',
    tip: '',
    entries: [
      {
        subjectCode: '2202',
        debit: 142380,
        credit: 0,
        summary: '支付华强建材欠款',
        explanation: '支付华强建材欠款。借142380元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 142380,
        summary: '支付欠款',
        explanation: '银行存款减少。',
        cashFlowItem: 'cf-op2',
        cashFlowExplanation: '购买商品接受劳务支付的现金。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '银行回单',
        date: '2026-04-17',
        totalAmount: 142380,
        content: '付华强建材3月钢筋款'
      }
    ]
  },
  {
    date: '2026-04-18',
    role: 'accountant',
    title: '砌体工程材料领用确认',
    tags: [
      '工程成本'
    ],
    difficulty: 2,
    description: '砌体工程施工领用砖块80,000块（40,000元）、砂浆30吨（6,000元），合计46,000元。材料已采购时计入合同履约成本，领用时无需额外分录，登记备查台账。',
    tip: '',
    entries: [],
    documents: [
      {
        type: 'text',
        label: '领料单',
        date: '2026-04-18',
        content: '砌体领用：砖80,000块(40,000元)+砂浆30吨(6,000元)=46,000元\n领料人：砌体施工队'
      }
    ]
  },
  {
    date: '2026-04-20',
    role: 'accountant',
    title: '计提4月职工薪酬',
    tags: [
      '工资社保'
    ],
    difficulty: 2,
    description: '计提4月职工薪酬：施工人员95,000元（砌体施工增加人手），项目部管理人员35,000元（不变），公司管理人员25,000元，合计155,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '540101',
        debit: 95000,
        credit: 0,
        summary: '施工人员工资',
        explanation: '施工人员工资。借95000元。'
      },
      {
        subjectCode: '540106',
        debit: 35000,
        credit: 0,
        summary: '项目部管理人员工资',
        explanation: '项目部管理人员工资。借35000元。'
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
        credit: 155000,
        summary: '应付职工薪酬-工资',
        explanation: '应付职工薪酬-工资。贷155000元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '工资计提表',
        date: '2026-04-20',
        content: '施工95,000+项目部35,000+管理25,000=155,000元',
        signature: '王人事'
      }
    ]
  },
  {
    date: '2026-04-20',
    role: 'accountant',
    title: '计提4月社保及公积金',
    tags: [
      '工资社保'
    ],
    difficulty: 2,
    description: '计提4月社保及公积金：施工95K×36.7%=34,865元，项目部35K×36.7%=12,845元，管理25K×36.7%=9,175元，合计56,885元。',
    tip: '',
    entries: [
      {
        subjectCode: '540101',
        debit: 34865,
        credit: 0,
        summary: '施工社保公积金',
        explanation: '施工社保公积金。借34865元。'
      },
      {
        subjectCode: '540106',
        debit: 12845,
        credit: 0,
        summary: '项目部社保公积金',
        explanation: '项目部社保公积金。借12845元。'
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
        credit: 38285,
        summary: '社保（155K×24.7%）',
        explanation: '社保（155K×24.7%）。贷38285元。'
      },
      {
        subjectCode: '221103',
        debit: 0,
        credit: 18600,
        summary: '公积金（155K×12%）',
        explanation: '公积金（155K×12%）。贷18600元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '社保公积金计提表',
        date: '2026-04-20',
        content: '合计56,885元',
        signature: '赵会计'
      }
    ]
  },
  {
    date: '2026-04-21',
    role: 'accountant',
    title: '计提固定资产折旧',
    tags: [
      '工程成本'
    ],
    difficulty: 2,
    description: '计提4月折旧1,850元。',
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
        date: '2026-04-21',
        content: '1,850元'
      }
    ]
  },
  {
    date: '2026-04-21',
    role: 'accountant',
    title: '摊销临时设施及预付租金',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '摊销4月临时设施5,000元，预付办公租金10,000元。',
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
        summary: '临时设施减少',
        explanation: '余额45,000元。'
      },
      {
        subjectCode: '1123',
        debit: 0,
        credit: 10000,
        summary: '预付租金减少',
        explanation: '余额80,000元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '摊销表',
        date: '2026-04-21',
        content: '15,000元'
      }
    ]
  },
  {
    date: '2026-04-24',
    role: 'accountant',
    title: '间接费用归集与分摊',
    tags: [
      '工程成本'
    ],
    difficulty: 3,
    description: '本月间接费用：项目部工资35,000+社保12,845+办公费2,000=49,845元。全部分配给恒达项目。',
    tip: '',
    entries: [
      {
        subjectCode: '540101',
        debit: 49845,
        credit: 0,
        summary: '间接费用转入恒达项目',
        explanation: '间接费用转入恒达项目。借49845元。'
      },
      {
        subjectCode: '540106',
        debit: 0,
        credit: 49845,
        summary: '间接费用分配转出',
        explanation: '间接费用分配转出。贷49845元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '间接费用分配表',
        date: '2026-04-24',
        content: '49,845元全额分配 ✓',
        signature: '李会计'
      }
    ]
  },
  {
    date: '2026-04-25',
    role: 'accountant',
    title: '确认工程进度确认收入',
    tags: [
      '工程合同'
    ],
    difficulty: 3,
    description: '恒达办公楼工程累计完工进度达到72%（本月新增17%）。按完工百分比确认收入：500万×72%-已确认收入2,750,000=850,000元（不含税）。增值税76,500元。',
    tip: '工程接近主体封顶，完工进度72%。',
    entries: [
      {
        subjectCode: '1122',
        debit: 926500,
        credit: 0,
        summary: '应收账款-恒达地产',
        explanation: '应收账款-恒达地产。借926500元。'
      },
      {
        subjectCode: '222101',
        debit: 0,
        credit: 76500,
        summary: '增值税销项税额（85万×9%）',
        explanation: '增值税销项税额（85万×9%）。贷76500元。'
      },
      {
        subjectCode: '6001',
        debit: 0,
        credit: 850000,
        summary: '确认主营业务收入',
        explanation: '确认主营业务收入。贷850000元。'
      }
    ],
    documents: [
      {
        type: 'invoice',
        label: '增值税专用发票',
        date: '2026-04-25',
        lineItems: [
          {
            name: '办公楼主体工程进度款（累计72%）',
            qty: 1,
            unit: '项',
            price: 850000,
            amount: 850000
          }
        ],
        totalAmount: 926500
      }
    ]
  },
  {
    date: '2026-04-25',
    role: 'accountant',
    title: '结转主营业务成本',
    tags: [
      '工程合同'
    ],
    difficulty: 3,
    description: '结转本月成本：材料(105,000+60,000)=165,000+分包180,000+人工(95,000+34,865+49,845)=179,710+机械(15,000+12,000+1,250)=28,250+其他直接(15,800+5,000+2,500+55,000)=78,300=631,260元。',
    tip: '',
    entries: [
      {
        subjectCode: '6401',
        debit: 631260,
        credit: 0,
        summary: '结转本月成本',
        explanation: '结转本月成本。借631260元。'
      },
      {
        subjectCode: '540101',
        debit: 0,
        credit: 179710,
        summary: '人工转出',
        explanation: '人工转出。贷179710元。'
      },
      {
        subjectCode: '540102',
        debit: 0,
        credit: 165000,
        summary: '材料转出',
        explanation: '材料转出。贷165000元。'
      },
      {
        subjectCode: '540103',
        debit: 0,
        credit: 180000,
        summary: '分包转出',
        explanation: '分包转出。贷180000元。'
      },
      {
        subjectCode: '540104',
        debit: 0,
        credit: 28250,
        summary: '机械转出',
        explanation: '机械转出。贷28250元。'
      },
      {
        subjectCode: '540105',
        debit: 0,
        credit: 78300,
        summary: '其他直接费转出',
        explanation: '其他直接费转出。贷78300元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '成本结转表',
        date: '2026-04-25',
        content: '合计631,260元，毛利218,740元'
      }
    ]
  },
  {
    date: '2026-04-26',
    role: 'accountant',
    title: '计提城建税及附加',
    tags: [
      '税费'
    ],
    difficulty: 2,
    description: '本月增值税：销项76,500-进项(13,650+7,800)=55,050元。计提城建税3,854元，教育费附加1,652元，地方教育附加1,101元，合计6,607元。',
    tip: '',
    entries: [
      {
        subjectCode: '6403',
        debit: 6607,
        credit: 0,
        summary: '计提城建税及附加',
        explanation: '计提城建税及附加。借6607元。'
      },
      {
        subjectCode: '222103',
        debit: 0,
        credit: 3854,
        summary: '应交城建税（55,050×7%）',
        explanation: '应交城建税（55,050×7%）。贷3854元。'
      },
      {
        subjectCode: '222104',
        debit: 0,
        credit: 2753,
        summary: '应交教育费附加（55,050×5%）',
        explanation: '应交教育费附加（55,050×5%）。贷2753元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '税费计算表',
        date: '2026-04-26',
        content: '55,050×12%=6,607元'
      }
    ]
  },
  {
    date: '2026-04-27',
    role: 'accountant',
    title: '银行手续费及利息收入',
    tags: [
      '资金管理'
    ],
    difficulty: 1,
    description: '4月手续费450元，利息1,600元。',
    tip: '',
    entries: [
      {
        subjectCode: '6603',
        debit: 450,
        credit: 0,
        summary: '手续费',
        explanation: '手续费。借450元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 450,
        summary: '银行手续费',
        explanation: '银行手续费。贷450元。'
      },
      {
        subjectCode: '100201',
        debit: 1600,
        credit: 0,
        summary: '利息',
        explanation: '利息。借1600元。',
        cashFlowItem: 'cf-op5'
      },
      {
        subjectCode: '6603',
        debit: 0,
        credit: 1600,
        summary: '利息冲减费',
        explanation: '利息冲减费。贷1600元。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '回单',
        date: '2026-04-27',
        totalAmount: 450
      },
      {
        type: 'bank',
        label: '利息回单',
        totalAmount: 1600
      }
    ]
  },
  {
    date: '2026-04-28',
    role: 'accountant',
    title: '月末结转损益',
    tags: [
      '期末'
    ],
    difficulty: 3,
    description: '月末结转损益。收入850,000元，成本631,260元，税金8,107元，管理费用（工资25,000+社保9,175+办公4,800+折旧600+房租10,000）49,575元，财务费用净收入1,150元。',
    tip: '',
    entries: [
      {
        subjectCode: '6001',
        debit: 850000,
        credit: 0,
        summary: '结转收入',
        explanation: '结转收入。借850000元。'
      },
      {
        subjectCode: '6401',
        debit: 0,
        credit: 631260,
        summary: '结转成本',
        explanation: '结转成本。贷631260元。'
      },
      {
        subjectCode: '6403',
        debit: 0,
        credit: 8107,
        summary: '结转税金',
        explanation: '结转税金。贷8107元。'
      },
      {
        subjectCode: '6602',
        debit: 0,
        credit: 49575,
        summary: '结转管理费用',
        explanation: '结转管理费用。贷49575元。'
      },
      {
        subjectCode: '6603',
        debit: 1150,
        credit: 0,
        summary: '结转财务费用',
        explanation: '结转财务费用。借1150元。'
      },
      {
        subjectCode: '4103',
        debit: 0,
        credit: 162208,
        summary: '结转本年利润',
        explanation: '净利润162,208元'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '损益结转表',
        date: '2026-04-28',
        content: '净利润162,208元 ✓'
      }
    ]
  },
  {
    date: '2026-04-30',
    role: 'accountant',
    title: '模拟纳税申报',
    tags: [
      '期末',
      '申报'
    ],
    difficulty: 1,
    description: '4月增值税应纳55,050元，城建税3,854元，教育费附加2,753元。',
    tip: '',
    entries: [],
    documents: [
      {
        type: 'text',
        label: '申报提醒',
        date: '2026-04-30',
        content: '增值税55,050+附加6,607=61,657元'
      }
    ],
    nextAction: 'tax-filing'
  }
]

export default tasks
