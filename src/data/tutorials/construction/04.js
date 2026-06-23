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
        label: '电子缴税付款凭证',
        date: '2026-04-01',
        totalAmount: 59158,
        payer: '鼎立建筑工程有限公司',
        payeeName: '国家金库南京代理支库',
        content: '3月增值税52,820元、城建税3,697元、教育费附加2,641元',
        refNo: 'JS202604010001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 9876 5432 1098 765'
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
        payer: '鼎立建筑工程有限公司',
        payeeName: '社会保险费征收专户',
        content: '3月社会保险费（养老+医疗+失业+工伤+生育）',
        refNo: 'SB202604010001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234',
        payeeBank: '社会保险费征收专户',
        payeeAccount: '3201 6500 0123 4567'
      },
      {
        type: 'bank',
        label: '公积金缴费回单',
        date: '2026-04-01',
        totalAmount: 18000,
        payer: '鼎立建筑工程有限公司',
        payeeName: '住房公积金管理中心',
        content: '3月住房公积金（单位12%×155K=18,600，个人代扣部分同步扣缴）',
        refNo: 'GJJ202604010001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234',
        payeeBank: '住房公积金管理中心专户',
        payeeAccount: '3810 0200 1234 5678'
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
        payer: '鼎立建筑工程有限公司',
        payeeName: '鼎立建筑职工（批量代发）',
        content: '3月职工工资代发，人数18人',
        refNo: 'DF202604020001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 9876 5432 1098 765'
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
        payer: '鼎立建筑工程有限公司',
        payeeName: '鼎立建筑工程有限公司（备用金）',
        content: '提取备用金，用于日常零星支出',
        refNo: 'XJ:10234567',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 9876 5432 1098 765'
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
        totalAmount: 118650,
      taxRate: 0.09,
        taxAmount: 9797,
        amountCN: '壹拾壹万捌仟陆佰伍拾元整'
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
        ],
      taxRate: 0.09,
        taxAmount: 5598,
        amountCN: '陆万柒仟捌佰元整'
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
        payer: '鼎立建筑工程有限公司',
        payeeName: '南京建机租赁有限公司',
        content: '4月塔吊租赁费（QTZ80塔吊一台）',
        refNo: 'ZL202604080001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 9876 5432 1098 765'
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
        ],
      stampText: '已收款'
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
        ],
      stampText: '已收款'
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
        docTitle: '砌体工程分包进度确认单',
        content: '期间：2026年4月\n项目：恒达办公楼砌体及二次结构工程\n分包单位：永兴劳务有限公司\n合同金额：600,000元（不含税）\n\n本月完成进度：30%\n本月确认金额：600,000×30%=180,000元\n累计完成金额：180,000元\n剩余合同金额：420,000元\n\n施工内容：1-3层砌体砌筑，二次结构钢筋绑扎\n\n确认人：王监理（监理单位）\n分包负责人：张永兴',
        headers: [
          '项目',
          '金额/说明'
        ],
        rows: [
          [
            '期间',
            '2026年4月'
          ],
          [
            '项目',
            '恒达办公楼砌体及二次结构工程'
          ],
          [
            '分包单位',
            '永兴劳务有限公司'
          ],
          [
            '合同金额',
            '600,000元（不含税）'
          ],
          [
            '本月完成进度',
            '30%'
          ],
          [
            '本月确认金额',
            '600,000×30%=180,000元'
          ],
          [
            '累计完成金额',
            '180,000元'
          ],
          [
            '剩余合同金额',
            '420,000元'
          ],
          [
            '施工内容',
            '1-3层砌体砌筑，二次结构钢筋绑扎'
          ],
          [
            '确认人',
            '王监理（监理单位）'
          ],
          [
            '分包负责人',
            '张永兴'
          ],
        ],
        signature: '王监理  张永兴'
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
        ],
      stampText: '已收款'
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
        ],
      stampText: '已收款'
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
        payer: '恒达房地产开发有限公司',
        payeeName: '鼎立建筑工程有限公司',
        content: '恒达办公楼3月工程进度款（累计完成55%进度）',
        refNo: 'SK202604150001',
        payerBank: '工商银行南京城南支行',
        payerAccount: '3200 8800 1234 5678 999',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 0123 4567 8901 234'
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
        docTitle: '安全生产费计提表',
        content: '期间：2026年4月\n项目：恒达办公楼工程\n\n计提依据：《企业安全生产费用提取和使用管理办法》（财企〔2022〕136号）\n计提标准：房屋建筑工程按工程造价2.0%\n\n累计完成产值：2,750,000元\n（1月15%+2月35%+3月20%+4月暂估17% = 累计72%×500万=3,600,000，按实际发生2,750,000）\n计提比例：2%\n应计提金额：2,750,000×2%=55,000元\n\n用途：安全防护设施、安全培训、应急救援等\n\n制表：李会计\n审核：王总工',
        headers: [
          '项目',
          '金额/说明'
        ],
        rows: [
          [
            '期间',
            '2026年4月'
          ],
          [
            '项目',
            '恒达办公楼工程'
          ],
          [
            '计提依据',
            '《企业安全生产费用提取和使用管理办法》（财企〔2022〕136号）'
          ],
          [
            '计提标准',
            '房屋建筑工程按工程造价2.0%'
          ],
          [
            '累计完成产值',
            '2,750,000元'
          ],
          [
            '计提比例',
            '2%'
          ],
          [
            '应计提金额',
            '2,750,000×2%=55,000元'
          ],
          [
            '用途',
            '安全防护设施、安全培训、应急救援等'
          ],
          [
            '制表',
            '李会计'
          ],
          [
            '审核',
            '王总工'
          ],
        ],
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
        payer: '鼎立建筑工程有限公司',
        payeeName: '华强建材有限公司',
        content: '付3月钢筋采购欠款（货款105,000+税13,650+前期尾款）',
        refNo: 'FK202604170001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234',
        payeeBank: '工商银行南京雨花支行',
        payeeAccount: '3201 1000 5678 9012 345'
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
        docTitle: '领料单',
        content: '项目：恒达办公楼工程\n领料部门：砌体施工队\n日期：2026-04-18\n\n┌──────────┬──────┬──────┬────────┬──────────┐\n│ 材料名称  │ 规格  │ 数量  │  单价   │  金额    │\n├──────────┼──────┼──────┼────────┼──────────┤\n│ 标准砖    │ 240×115│80,000块│ 0.50   │  40,000  │\n│          │ ×53mm │       │        │          │\n│ 砌筑砂浆  │ M5    │ 30吨  │ 200.00 │   6,000  │\n├──────────┼──────┼──────┼────────┼──────────┤\n│ 合计      │       │       │        │  46,000  │\n└──────────┴──────┴──────┴────────┴──────────┘\n\n用途：恒达办公楼1-3层砌体工程\n\n领料人：砌体施工队\n发料人：王保管\n审核人：李会计',
        headers: [
          '材料名称',
          '规格',
          '数量',
          '单价',
          '金额'
        ],
        rows: [
          [
              '标准砖',
              '240×115 ×53mm',
              '80,000块',
              '0.50',
              '40,000'
          ],
          [
              '砌筑砂浆',
              'M5',
              '30吨',
              '200.00',
              '6,000'
          ],
          [
              '合计',
              '',
              '',
              '',
              '46,000'
          ],
        ],
        signature: '李会计'
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
        docTitle: '2026年4月工资计提表',
        content: '期间：2026年4月\n\n一、人员构成及应发工资\n┌──────────────┬──────┬──────────┬──────────┐\n│    部门       │ 人数  │  月薪合计 │  备注    │\n├──────────────┼──────┼──────────┼──────────┤\n│施工人员       │  12  │  95,000  │砌体增配4人│\n│项目部管理人员  │   3  │  35,000  │ 不变     │\n│公司管理人员   │   3  │  25,000  │ 不变     │\n├──────────────┼──────┼──────────┼──────────┤\n│    合计       │  18  │ 155,000  │          │\n└──────────────┴──────┴──────────┴──────────┘\n\n二、费用分配\n施工人员工资 → 合同履约成本-人工成本（540101）：95,000元\n项目部管理人员工资 → 合同履约成本-间接费用（540106）：35,000元\n公司管理人员工资 → 管理费用（6602）：25,000元\n\n制表：王人事\n审核：李会计\n批准：刘经理',
        headers: [
          '部门',
          '人数',
          '月薪合计',
          '备注'
        ],
        rows: [
          [
              '施工人员',
              '12',
              '95,000',
              '砌体增配4人'
          ],
          [
              '项目部管理人员',
              '3',
              '35,000',
              '不变'
          ],
          [
              '公司管理人员',
              '3',
              '25,000',
              '不变'
          ],
          [
              '合计',
              '18',
              '155,000',
              ''
          ],
        ],
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
        docTitle: '2026年4月社保及公积金计提表',
        content: '期间：2026年4月\n缴费基数：155,000元（工资总额）\n\n一、社会保险（费率合计24.7%）\n┌────────┬─────────┬──────────┬──────────┐\n│ 险种   │  费率    │  金额     │  备注    │\n├────────┼─────────┼──────────┼──────────┤\n│ 养老   │  16%     │  24,800  │ 单位承担 │\n│ 医疗   │   6.9%   │  10,695  │ 含生育险 │\n│ 失业   │   0.5%   │     775  │          │\n│ 工伤   │   0.8%   │   1,240  │ 行业费率 │\n│ 生育   │   0.5%   │     775  │ 并入医疗 │\n├────────┼─────────┼──────────┼──────────┤\n│ 小计   │  24.7%   │  38,285  │          │\n└────────┴─────────┴──────────┴──────────┘\n\n二、住房公积金（费率12%）：155,000×12%=18,600元\n\n三、按部门分配\n施工（95,000×36.7%）=34,865 → 合同履约成本-人工\n项目部（35,000×36.7%）=12,845 → 合同履约成本-间接费用\n管理（25,000×36.7%）=9,175 → 管理费用\n合计：34,865+12,845+9,175=56,885元\n\n制表：赵会计\n审核：李会计',
        headers: [
          '险种',
          '费率',
          '金额',
          '备注'
        ],
        rows: [
          [
              '养老',
              '16%',
              '24,800',
              '单位承担'
          ],
          [
              '医疗',
              '6.9%',
              '10,695',
              '含生育险'
          ],
          [
              '失业',
              '0.5%',
              '775',
              ''
          ],
          [
              '工伤',
              '0.8%',
              '1,240',
              '行业费率'
          ],
          [
              '生育',
              '0.5%',
              '775',
              '并入医疗'
          ],
          [
              '小计',
              '24.7%',
              '38,285',
              ''
          ],
        ],
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
        docTitle: '2026年4月固定资产折旧计算表',
        content: '期间：2026年4月\n折旧方法：直线法\n\n┌────────────┬──────────┬────────┬────────┬──────────┐\n│  资产类别   │  原值     │ 残值率 │ 年限   │  月折旧额 │\n├────────────┼──────────┼────────┼────────┼──────────┤\n│施工机械     │  180,000  │   5%   │  10年  │   1,425  │\n│运输设备     │  120,000  │   5%   │   8年  │   1,188  │\n│办公设备     │   60,000  │   5%   │   5年  │     950  │\n├────────────┼──────────┼────────┼────────┼──────────┤\n│  合计       │  360,000  │        │        │   3,563  │\n└────────────┴──────────┴────────┴────────┴──────────┘\n\n注：本期折旧1,850元含施工机械1,250+办公设备600\n（施工机械按实际使用情况计入机械费，非全额计提）\n\n制表：李会计\n审核：王总工',
        headers: [
          '资产类别',
          '原值',
          '残值率',
          '年限',
          '月折旧额'
        ],
        rows: [
          [
              '施工机械',
              '180,000',
              '5%',
              '10年',
              '1,425'
          ],
          [
              '运输设备',
              '120,000',
              '5%',
              '8年',
              '1,188'
          ],
          [
              '办公设备',
              '60,000',
              '5%',
              '5年',
              '950'
          ],
          [
              '合计',
              '360,000',
              '',
              '',
              '3,563'
          ],
        ],
        signature: '李会计'
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
        docTitle: '2026年4月摊销计算表',
        content: '期间：2026年4月\n\n一、临时设施摊销\n┌──────────────┬──────────┬──────────┬───────────┐\n│    项目       │  原值     │ 月摊销额  │  累计摊销  │\n├──────────────┼──────────┼──────────┼───────────┤\n│ 临时板房     │  72,000  │   3,000  │   27,000  │\n│ 临时围挡     │  48,000  │   2,000  │   18,000  │\n├──────────────┼──────────┼──────────┼───────────┤\n│  小计        │ 120,000  │   5,000  │   45,000  │\n│  摊余价值    │          │          │   75,000  │\n└──────────────┴──────────┴──────────┴───────────┘\n\n二、预付租金摊销\n预付全年办公租金120,000元，月摊销10,000元\n累计已摊销：40,000元（1-4月）\n摊余价值：80,000元\n\n三、合计摊销：5,000+10,000=15,000元 ✓\n\n制表：李会计\n审核：王总工',
        headers: [
          '项目',
          '原值',
          '月摊销额',
          '累计摊销'
        ],
        rows: [
          [
              '临时板房',
              '72,000',
              '3,000',
              '27,000'
          ],
          [
              '临时围挡',
              '48,000',
              '2,000',
              '18,000'
          ],
          [
              '小计',
              '120,000',
              '5,000',
              '45,000'
          ],
          [
              '摊余价值',
              '',
              '',
              '75,000'
          ],
        ],
        signature: '李会计'
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
        docTitle: '2026年4月间接费用归集与分配表',
        content: '期间：2026年4月\n\n一、间接费用明细\n┌──────────────────┬──────────┐\n│    费用项目       │  金额     │\n├──────────────────┼──────────┤\n│ 项目部管理人员工资 │  35,000  │\n│ 项目部社保公积金   │  12,845  │\n│ 项目办公费        │   2,000  │\n├──────────────────┼──────────┤\n│    合计           │  49,845  │\n└──────────────────┴──────────┘\n\n二、分配标准\n本月仅恒达项目一个在建项目，全额分配\n分配率：100%\n\n三、分配计算\n49,845×100%=49,845元 → 合同履约成本-人工成本（540101）\n\n四、零余额确认\n间接费用（540106）余额：0 ✓\n\n制表：李会计\n审核：王总工',
        headers: [
          '费用项目',
          '金额'
        ],
        rows: [
          [
              '项目部管理人员工资',
              '35,000'
          ],
          [
              '项目部社保公积金',
              '12,845'
          ],
          [
              '项目办公费',
              '2,000'
          ],
          [
              '合计',
              '49,845'
          ],
        ],
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
        totalAmount: 926500,
      taxRate: 0.09,
        taxAmount: 76500,
        amountCN: '玖拾贰万陆仟伍佰元整'
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
        docTitle: '2026年4月主营业务成本结转表',
        content: '期间：2026年4月\n项目：恒达办公楼工程\n\n一、成本构成明细\n┌───────────────┬──────────┬──────────────┐\n│   成本项目      │  金额     │  构成比例    │\n├───────────────┼──────────┼──────────────┤\n│ 人工成本       │  179,710  │    28.5%     │\n│   -施工人员工资 │   95,000  │              │\n│   -施工社保公积金│   34,865  │              │\n│   -间接费用转入  │   49,845  │              │\n├───────────────┼──────────┼──────────────┤\n│ 材料成本       │  173,000  │    27.4%     │\n│   -钢筋采购     │  105,000  │              │\n│   -砌体材料     │   60,000  │              │\n│   -结构检测费    │    8,000  │              │\n├───────────────┼──────────┼──────────────┤\n│ 分包成本       │  180,000  │    28.5%     │\n│   -砌体分包30%  │  180,000  │              │\n├───────────────┼──────────┼──────────────┤\n│ 机械使用费     │   28,250  │     4.5%     │\n│   -塔吊租赁     │   15,000  │              │\n│   -燃油维修     │   12,000  │              │\n│   -折旧         │    1,250  │              │\n├───────────────┼──────────┼──────────────┤\n│ 其他直接费     │   70,300  │    11.1%     │\n│   -脚手架租赁   │   22,000  │              │\n│   -水电费       │   15,800  │              │\n│   -临时设施摊销  │    5,000  │              │\n│   -差旅费       │    2,500  │              │\n│   -安全生产费   │   55,000  │              │\n│  （扣除内部抵消）│ -30,000   │              │\n├───────────────┼──────────┼──────────────┤\n│    合计        │  631,260  │   100.0%     │\n└───────────────┴──────────┴──────────────┘\n\n二、毛利计算\n收入：850,000元\n成本：631,260元\n毛利：218,740元\n毛利率：25.7%\n\n三、零余额确认\n合同履约成本各明细科目余额：0 ✓\n\n制表：李会计\n审核：王总工',
        headers: [
          '成本项目',
          '金额',
          '构成比例'
        ],
        rows: [
          [
              '人工成本',
              '179,710',
              '28.5%'
          ],
          [
              '-施工人员工资',
              '95,000',
              ''
          ],
          [
              '-施工社保公积金',
              '34,865',
              ''
          ],
          [
              '-间接费用转入',
              '49,845',
              ''
          ],
          [
              '材料成本',
              '173,000',
              '27.4%'
          ],
          [
              '-钢筋采购',
              '105,000',
              ''
          ],
          [
              '-砌体材料',
              '60,000',
              ''
          ],
          [
              '-结构检测费',
              '8,000',
              ''
          ],
          [
              '分包成本',
              '180,000',
              '28.5%'
          ],
          [
              '-砌体分包30%',
              '180,000',
              ''
          ],
          [
              '机械使用费',
              '28,250',
              '4.5%'
          ],
          [
              '-塔吊租赁',
              '15,000',
              ''
          ],
          [
              '-燃油维修',
              '12,000',
              ''
          ],
          [
              '-折旧',
              '1,250',
              ''
          ],
          [
              '其他直接费',
              '70,300',
              '11.1%'
          ],
          [
              '-脚手架租赁',
              '22,000',
              ''
          ],
          [
              '-水电费',
              '15,800',
              ''
          ],
          [
              '-临时设施摊销',
              '5,000',
              ''
          ],
          [
              '-差旅费',
              '2,500',
              ''
          ],
          [
              '-安全生产费',
              '55,000',
              ''
          ],
          [
              '（扣除内部抵消）',
              '-30,000',
              ''
          ],
          [
              '合计',
              '631,260',
              '100.0%'
          ],
        ],
        signature: '李会计'
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
        docTitle: '2026年4月城建税及附加计算表',
        content: '期间：2026年4月\n\n一、增值税计算\n销项税额（4月工程进度款85万×9%）：76,500元\n进项税额（钢筋13,650+砌体材料7,800）：21,450元\n应纳增值税：76,500-21,450=55,050元\n\n二、城建税及附加计算\n计税依据：应纳增值税55,050元\n┌──────────────┬──────┬──────────┬──────────┐\n│    税种       │  税率  │  计算过程  │   金额    │\n├──────────────┼──────┼──────────┼──────────┤\n│ 城建税        │   7%  │55,050×7% │   3,854  │\n│ 教育费附加    │   3%  │55,050×3% │   1,652  │\n│ 地方教育附加  │   2%  │55,050×2% │   1,101  │\n├──────────────┼──────┼──────────┼──────────┤\n│  合计         │  12%  │55,050×12%│   6,607  │\n└──────────────┴──────┴──────────┴──────────┘\n\n三、本月税费总计\n增值税55,050+附加6,607=61,657元\n\n制表：李会计\n审核：刘经理',
        headers: [
          '税种',
          '税率',
          '计算过程',
          '金额'
        ],
        rows: [
          [
              '城建税',
              '7%',
              '55,050×7%',
              '3,854'
          ],
          [
              '教育费附加',
              '3%',
              '55,050×3%',
              '1,652'
          ],
          [
              '地方教育附加',
              '2%',
              '55,050×2%',
              '1,101'
          ],
          [
              '合计',
              '12%',
              '55,050×12%',
              '6,607'
          ],
        ],
        signature: '李会计'
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
        label: '银行回单',
        date: '2026-04-27',
        totalAmount: 450,
        payer: '鼎立建筑工程有限公司',
        payeeName: '工商银行南京分行',
        content: '4月银行手续费',
        refNo: 'YW202604270001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 9876 5432 1098 765'
      },
      {
        type: 'bank',
        label: '利息回单',
        date: '2026-04-21',
        totalAmount: 1600,
        payer: '工商银行南京分行',
        payeeName: '鼎立建筑工程有限公司',
        content: '2026年4月活期存款利息',
        refNo: 'LX202604210001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 9876 5432 1098 765'
      }
    ]
  },
  {
    date: '2026-04-05',
    role: 'accountant',
    title: '脚手架租赁及搭设费',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '主体施工需搭设外脚手架，租赁钢管、扣件、脚手板等，本月租赁费22,000元，转账支付。',
    tip: '脚手架租赁费计入"合同履约成本-其他直接费用"。',
    entries: [
      {
        subjectCode: '540105',
        debit: 22000,
        credit: 0,
        summary: '脚手架租赁及搭设费',
        explanation: '合同履约成本-其他直接费用增加。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 22000,
        summary: '支付脚手架费',
        explanation: '银行存款减少22,000元。',
        cashFlowItem: 'cf-op6',
        cashFlowExplanation: '其他经营活动现金支出。'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '租赁费发票',
        date: '2026-04-05',
        totalAmount: 22000,
        items: [
          { name: '钢管扣件租赁', amount: 18000 },
          { name: '脚手板租赁', amount: 4000 }
        ],
        stampText: '已开票'
      }
    ]
  },
  {
    date: '2026-04-12',
    role: 'accountant',
    title: '主体结构检测费',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '委托检测机构对主体结构混凝土强度、钢筋保护层等进行检测，费用8,000元，转账支付。',
    tip: '结构检测费计入"合同履约成本-材料成本"。',
    entries: [
      {
        subjectCode: '540102',
        debit: 8000,
        credit: 0,
        summary: '结构检测费',
        explanation: '合同履约成本-材料成本增加。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 8000,
        summary: '支付检测费',
        explanation: '银行存款减少8,000元。',
        cashFlowItem: 'cf-op2',
        cashFlowExplanation: '购买商品接受劳务支付的现金。'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '检测费发票',
        date: '2026-04-12',
        totalAmount: 8000,
        items: [
          { name: '混凝土强度检测', amount: 5000 },
          { name: '钢筋保护层检测', amount: 3000 }
        ],
      stampText: '已收款'
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
        docTitle: '2026年4月损益结转表',
        content: '期间：2026年4月\n\n一、收入结转\n┌──────────────────┬──────────┬──────────┐\n│    科目           │  借方     │  贷方    │\n├──────────────────┼──────────┼──────────┤\n│ 主营业务收入(6001) │ 850,000  │          │\n│ 本年利润(4103)    │          │ 850,000  │\n└──────────────────┴──────────┴──────────┘\n→ 收入余额：0 ✓\n\n二、费用结转\n┌──────────────────┬──────────┬──────────┐\n│    科目           │  借方     │  贷方    │\n├──────────────────┼──────────┼──────────┤\n│ 本年利润(4103)    │ 688,942  │          │\n│ 主营业务成本(6401) │          │ 631,260  │\n│ 税金及附加(6403)   │          │   8,107  │\n│ 管理费用(6602)    │          │  49,575  │\n│ 财务费用(6603)    │          │  -1,150  │\n├──────────────────┼──────────┼──────────┤\n│  费用合计          │          │ 687,792  │\n└──────────────────┴──────────┴──────────┘\n→ 损益类科目余额：0 ✓\n\n三、净利润计算\n收入：850,000元\n费用：631,260+8,107+49,575-1,150=687,792元\n利润总额：850,000-687,792=162,208元\n净利润：162,208元（本年利润贷方余额）\n\n制表：李会计\n审核：刘经理',
        headers: [
          '科目',
          '借方',
          '贷方'
        ],
        rows: [
          [
              '主营业务收入(6001)',
              '850,000',
              ''
          ],
          [
              '本年利润(4103)',
              '',
              '850,000'
          ],
        ],
        signature: '李会计'
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
        label: '模拟纳税申报表',
        date: '2026-04-30',
        docTitle: '2026年4月增值税及附加纳税申报表',
        content: '纳税人：鼎立建筑工程有限公司\n所属期：2026年4月\n\n一、增值税申报\n┌──────────────────────────────┬────────────┐\n│          项目                 │    金额     │\n├──────────────────────────────┼────────────┤\n│ 应税销售额（9%税率）           │   850,000  │\n│ 销项税额                      │    76,500  │\n│ 进项税额                      │    21,450  │\n│  ├─ 钢筋采购（13,650）        │             │\n│  └─ 砌体材料（7,800）          │             │\n│ 应纳增值税                     │    55,050  │\n└──────────────────────────────┴────────────┘\n\n二、附加税费\n┌──────────────────────────────┬────────────┐\n│          项目                 │    金额     │\n├──────────────────────────────┼────────────┤\n│ 城建税（增值税×7%）            │     3,854  │\n│ 教育费附加（增值税×3%）        │     1,652  │\n│ 地方教育附加（增值税×2%）      │     1,101  │\n├──────────────────────────────┼────────────┤\n│ 附加税费合计                   │     6,607  │\n└──────────────────────────────┴────────────┘\n\n三、本月应纳税总额\n增值税55,050+附加6,607=61,657元\n\n申报人：李会计\n申报日期：2026-04-30',
        headers: [
          '项目',
          '金额'
        ],
        rows: [
          [
              '应税销售额（9%税率）',
              '850,000'
          ],
          [
              '销项税额',
              '76,500'
          ],
          [
              '进项税额',
              '21,450'
          ],
          [
              '├─ 钢筋采购（13,650）',
              ''
          ],
          [
              '└─ 砌体材料（7,800）',
              ''
          ],
          [
              '应纳增值税',
              '55,050'
          ],
        ],
        signature: '李会计'
      }
    ],
    nextAction: 'tax-filing'
  }
]

export default tasks
