/**
 * 建筑业 - 3月教学任务
 *
 * 企业：鼎立建筑工程有限公司
 * 税制：一般纳税人（增值税9%）
 * 准则：CAS 14 新收入准则（投入法/完工百分比）
 * 本月主题：主体结构施工与材料采购
 */

const tasks = [
  {
    date: '2026-03-02',
    role: 'accountant',
    title: '缴纳上月增值税及附加税费',
    tags: [
      '税费'
    ],
    difficulty: 2,
    description: '缴纳2月增值税及附加。2月销项税额96,075元，进项税额26,520元，应纳69,555元，抵1月留抵15,800元后实缴53,755元。城建税4,869元，教育费附加3,478元。',
    tip: '注意：留抵税额可抵减当期应纳增值税。上月已计提。',
    entries: [
      {
        subjectCode: '222101',
        debit: 53755,
        credit: 0,
        summary: '缴纳2月增值税',
        explanation: '应交增值税减少。'
      },
      {
        subjectCode: '222103',
        debit: 4869,
        credit: 0,
        summary: '缴纳2月城建税',
        explanation: '应交城建税减少。'
      },
      {
        subjectCode: '222104',
        debit: 3478,
        credit: 0,
        summary: '缴纳2月教育费附加',
        explanation: '应交教育费附加减少。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 62102,
        summary: '缴纳税款',
        explanation: '银行存款减少62,102元。',
        cashFlowItem: 'cf-op4',
        cashFlowExplanation: '缴纳税费支出。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '电子缴税付款凭证',
        date: '2026-03-02',
        totalAmount: 62102,
        payer: '鼎立建筑工程有限公司',
        payeeName: '国家金库',
        content: '2月增值税及附加税费',
        refNo: 'JS202603020001'
      }
    ]
  },
  {
    date: '2026-03-02',
    role: 'accountant',
    title: '缴纳2月社保及公积金',
    tags: [
      '工资社保'
    ],
    difficulty: 1,
    description: '缴纳2月社保35,815元及公积金17,400元。',
    tip: '',
    entries: [
      {
        subjectCode: '221102',
        debit: 35815,
        credit: 0,
        summary: '缴纳2月社保',
        explanation: '应付职工薪酬-社保减少。'
      },
      {
        subjectCode: '221103',
        debit: 17400,
        credit: 0,
        summary: '缴纳2月公积金',
        explanation: '应付职工薪酬-公积金减少。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 53215,
        summary: '支付社保及公积金',
        explanation: '银行存款减少53,215元。',
        cashFlowItem: 'cf-op3',
        cashFlowExplanation: '支付给职工以及为职工支付的现金。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '社保缴费回单',
        date: '2026-03-02',
        totalAmount: 35815,
        content: '2月社保费'
      },
      {
        type: 'bank',
        label: '公积金缴费回单',
        date: '2026-03-02',
        totalAmount: 17400,
        content: '2月公积金'
      }
    ]
  },
  {
    date: '2026-03-03',
    role: 'accountant',
    title: '发放2月职工工资',
    tags: [
      '工资社保'
    ],
    difficulty: 1,
    description: '通过银行代发2月职工工资145,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '221101',
        debit: 145000,
        credit: 0,
        summary: '发放2月工资',
        explanation: '应付职工薪酬-工资减少。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 145000,
        summary: '银行代发工资',
        explanation: '银行存款减少145,000元。',
        cashFlowItem: 'cf-op3',
        cashFlowExplanation: '支付给职工以及为职工支付的现金。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '代发工资回单',
        date: '2026-03-03',
        totalAmount: 145000,
        content: '2月工资发放'
      }
    ]
  },
  {
    date: '2026-03-04',
    role: 'accountant',
    title: '提取备用金',
    tags: [
      '资金管理'
    ],
    difficulty: 1,
    description: '从银行提取备用金15,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '1001',
        debit: 15000,
        credit: 0,
        summary: '提取备用金',
        explanation: '库存现金增加。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 15000,
        summary: '提取备用金',
        explanation: '银行存款减少15,000元。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '现金支票存根',
        date: '2026-03-04',
        totalAmount: 15000,
        content: '备用金'
      }
    ]
  },
  {
    date: '2026-03-05',
    role: 'accountant',
    title: '主体施工材料采购（钢筋）',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '采购主体结构用钢筋30吨，单价4,200元，合计126,000元，增值税16,380元，合计142,380元，转账支付。',
    tip: '主体工程施工需要大量钢筋，采购后直接计入合同履约成本-材料成本。',
    entries: [
      {
        subjectCode: '540102',
        debit: 126000,
        credit: 0,
        summary: '采购主体结构钢筋',
        explanation: '合同履约成本-材料成本增加。'
      },
      {
        subjectCode: '222101',
        debit: 16380,
        credit: 0,
        summary: '增值税进项税额',
        explanation: '进项税额可抵扣。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 142380,
        summary: '支付钢筋款',
        explanation: '银行存款减少142,380元。',
        cashFlowItem: 'cf-op2',
        cashFlowExplanation: '购买商品接受劳务支付的现金。'
      }
    ],
    documents: [
      {
        type: 'invoice',
        label: '增值税专用发票',
        date: '2026-03-05',
        region: '江苏省',
        invoiceNo: '3200260305',
        buyer: '鼎立建筑工程有限公司',
        seller: '华强建材有限公司',
        lineItems: [
          {
            name: '螺纹钢 Φ25mm',
            qty: 30,
            unit: '吨',
            price: 4200,
            amount: 126000
          }
        ],
        totalAmount: 142380
      }
    ]
  },
  {
    date: '2026-03-05',
    role: 'accountant',
    title: '主体施工材料采购（商品混凝土）',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '采购商品混凝土400立方米，单价400元，合计160,000元，增值税20,800元，合计180,800元，转账支付。',
    tip: '主体工程对商品混凝土需求量大。',
    entries: [
      {
        subjectCode: '540102',
        debit: 160000,
        credit: 0,
        summary: '采购商品混凝土（400m³）',
        explanation: '合同履约成本-材料成本增加。'
      },
      {
        subjectCode: '222101',
        debit: 20800,
        credit: 0,
        summary: '增值税进项税额',
        explanation: '进项税额20,800元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 180800,
        summary: '支付混凝土款',
        explanation: '银行存款减少180,800元。',
        cashFlowItem: 'cf-op2',
        cashFlowExplanation: '购买商品接受劳务支付的现金。'
      }
    ],
    documents: [
      {
        type: 'invoice',
        label: '增值税专用发票',
        date: '2026-03-05',
        buyer: '鼎立建筑工程有限公司',
        seller: 'XX商品混凝土公司',
        lineItems: [
          {
            name: 'C30商品混凝土',
            qty: 400,
            unit: '立方米',
            price: 400,
            amount: 160000
          }
        ],
        totalAmount: 180800
      }
    ]
  },
  {
    date: '2026-03-07',
    role: 'accountant',
    title: '支付分包结算款',
    tags: [
      '分包管理'
    ],
    difficulty: 2,
    description: '大地基础公司桩基分包工程已完工，结算总价80万元。已预付24万元+上月确认应付40万元，剩余16万元。支付剩余结算款176,000元（扣除质保金5%共40,000元后支付）。',
    tip: '分包结算时按合同扣留质保金（通常5%），质保期满后支付。质保金通过"其他应付款-质保金"核算。',
    entries: [
      {
        subjectCode: '540103',
        debit: 160000,
        credit: 0,
        summary: '分包完工结算尾款',
        explanation: '合同履约成本-分包成本增加（尾款部分）。'
      },
      {
        subjectCode: '2202',
        debit: 0,
        credit: 160000,
        summary: '应付账款-大地基础',
        explanation: '应付分包款增加（尾款）。'
      },
      {
        subjectCode: '2202',
        debit: 560000,
        credit: 0,
        summary: '支付大地基础结算款（预付240K+应付400K-质保金40K=600K）',
        explanation: '应付账款减少。支付扣除质保金后的金额。'
      },
      {
        subjectCode: '224101',
        debit: 40000,
        credit: 0,
        summary: '扣留质保金（80万×5%）',
        explanation: '其他应付款-质保金增加。质保期1年。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 600000,
        summary: '支付结算净额',
        explanation: '银行存款减少600,000元。',
        cashFlowItem: 'cf-op2',
        cashFlowExplanation: '购买商品接受劳务支付的现金。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '银行回单',
        date: '2026-03-07',
        totalAmount: 600000,
        content: '分包结算款',
        refNo: 'ZF202603070001'
      }
    ]
  },
  {
    date: '2026-03-07',
    role: 'accountant',
    title: '塔吊租赁费摊销（3月最后一个月）',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '摊销3月塔吊租赁费15,000元。这是预付3个月租金的最后一个月摊销。',
    tip: '预付租金摊销完毕，预付账款余额归零。',
    entries: [
      {
        subjectCode: '540104',
        debit: 15000,
        credit: 0,
        summary: '塔吊租赁费（3月）',
        explanation: '合同履约成本-机械使用费增加。'
      },
      {
        subjectCode: '1123',
        debit: 0,
        credit: 15000,
        summary: '预付租赁费摊销完',
        explanation: '预付账款减少。余额0元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '租赁摊销表',
        date: '2026-03-07',
        content: '塔吊月租15,000元摊销完毕，预付账款余额归零 ✅',
        signature: '赵会计'
      }
    ]
  },
  {
    date: '2026-03-10',
    role: 'accountant',
    title: '续租塔吊并支付月租金',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '因主体工程仍需使用塔吊，与租赁公司续租3个月，月租金不变15,000元，本月支付3月租金15,000元。',
    tip: '续租不再预付，按月支付租金直接计入"合同履约成本-机械使用费"。',
    entries: [
      {
        subjectCode: '540104',
        debit: 15000,
        credit: 0,
        summary: '塔吊租赁费（续租3月）',
        explanation: '合同履约成本-机械使用费增加。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 15000,
        summary: '支付塔吊月租',
        explanation: '银行存款减少15,000元。',
        cashFlowItem: 'cf-op6',
        cashFlowExplanation: '其他经营活动现金支出。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '银行回单',
        date: '2026-03-10',
        totalAmount: 15000,
        content: '塔吊月租金',
        refNo: 'ZF202603100001'
      }
    ]
  },
  {
    date: '2026-03-11',
    role: 'accountant',
    title: '支付机械燃油及维修费',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '支付3月施工机械燃油费10,000元及维修费4,000元，合计14,000元。',
    tip: '主体施工阶段机械使用强度加大，费用略有增加。',
    entries: [
      {
        subjectCode: '540104',
        debit: 14000,
        credit: 0,
        summary: '机械燃油及维修费',
        explanation: '合同履约成本-机械使用费增加。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 14000,
        summary: '支付机械费用',
        explanation: '银行存款减少14,000元。',
        cashFlowItem: 'cf-op6',
        cashFlowExplanation: '其他经营活动现金支出。'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '燃油及维修发票',
        date: '2026-03-11',
        totalAmount: 14000,
        items: [
          {
            name: '柴油1,000升',
            amount: 10000
          },
          {
            name: '机械维修保养',
            amount: 4000
          }
        ]
      }
    ]
  },
  {
    date: '2026-03-12',
    role: 'accountant',
    title: '支付施工现场水电费',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '支付3月施工现场水电费：水费2,500元，电费12,000元，合计14,500元。',
    tip: '',
    entries: [
      {
        subjectCode: '540105',
        debit: 14500,
        credit: 0,
        summary: '施工水电费',
        explanation: '其他直接费增加。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 14500,
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
        date: '2026-03-12',
        totalAmount: 14500,
        items: [
          {
            name: '施工用电12,000kWh',
            amount: 12000
          },
          {
            name: '施工用水500吨',
            amount: 2500
          }
        ]
      }
    ]
  },
  {
    date: '2026-03-13',
    role: 'accountant',
    title: '收到恒达地产进度款',
    tags: [
      '往来管理'
    ],
    difficulty: 1,
    description: '收到恒达地产支付2月进度款413,575元（上月确认为应收账款的部分）。',
    tip: '',
    entries: [
      {
        subjectCode: '100201',
        debit: 413575,
        credit: 0,
        summary: '收到恒达进度款',
        explanation: '银行存款增加。',
        cashFlowItem: 'cf-op1',
        cashFlowExplanation: '销售商品提供劳务收到的现金。'
      },
      {
        subjectCode: '1122',
        debit: 0,
        credit: 413575,
        summary: '恒达地产欠款收回',
        explanation: '应收账款减少。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '收款回单',
        date: '2026-03-13',
        totalAmount: 413575,
        content: '恒达地产2月工程进度款'
      }
    ]
  },
  {
    date: '2026-03-14',
    role: 'accountant',
    title: '项目部差旅及办公费',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '报销3月项目部差旅费3,200元、办公用品1,800元，合计5,000元，现金支付。',
    tip: '',
    entries: [
      {
        subjectCode: '540105',
        debit: 3200,
        credit: 0,
        summary: '差旅费',
        explanation: '其他直接费增加。'
      },
      {
        subjectCode: '540106',
        debit: 1800,
        credit: 0,
        summary: '项目办公费',
        explanation: '间接费用增加。'
      },
      {
        subjectCode: '1001',
        debit: 0,
        credit: 5000,
        summary: '现金支付',
        explanation: '库存现金减少。'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '报销单',
        date: '2026-03-14',
        totalAmount: 5000,
        items: [
          {
            name: '差旅费',
            amount: 3200
          },
          {
            name: '办公用品',
            amount: 1800
          }
        ]
      }
    ]
  },
  {
    date: '2026-03-14',
    role: 'accountant',
    title: '公司管理办公费',
    tags: [
      '资金管理'
    ],
    difficulty: 1,
    description: '支付3月公司管理部门办公费5,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '6602',
        debit: 5000,
        credit: 0,
        summary: '办公费',
        explanation: '管理费用增加。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 5000,
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
        date: '2026-03-14',
        totalAmount: 5000,
        items: [
          {
            name: '办公耗材',
            amount: 3000
          },
          {
            name: '通讯费',
            amount: 2000
          }
        ]
      }
    ]
  },
  {
    date: '2026-03-17',
    role: 'accountant',
    title: '支付2月华强建材欠款',
    tags: [
      '往来管理'
    ],
    difficulty: 1,
    description: '支付2月采购钢筋欠华强建材的94,920元。',
    tip: '',
    entries: [
      {
        subjectCode: '2202',
        debit: 94920,
        credit: 0,
        summary: '支付华强建材欠款',
        explanation: '应付账款减少。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 94920,
        summary: '支付材料款',
        explanation: '银行存款减少。',
        cashFlowItem: 'cf-op2',
        cashFlowExplanation: '购买商品接受劳务支付的现金。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '银行回单',
        date: '2026-03-17',
        totalAmount: 94920,
        content: '支付2月钢筋款'
      }
    ]
  },
  {
    date: '2026-03-18',
    role: 'accountant',
    title: '支付工程保险续保费',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '建筑工程一切险到期续保，支付保费12,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '540105',
        debit: 12000,
        credit: 0,
        summary: '工程一切险续保',
        explanation: '其他直接费增加。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 12000,
        summary: '支付保费',
        explanation: '银行存款减少。',
        cashFlowItem: 'cf-op6',
        cashFlowExplanation: '其他经营活动现金支出。'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '保险发票',
        date: '2026-03-18',
        totalAmount: 12000,
        items: [
          {
            name: '建筑工程一切险续保',
            amount: 12000
          }
        ]
      }
    ]
  },
  {
    date: '2026-03-20',
    role: 'accountant',
    title: '计提3月职工薪酬',
    tags: [
      '工资社保'
    ],
    difficulty: 2,
    description: '计提3月职工薪酬：施工人员90,000元（主体施工人员增加），项目部管理人员35,000元，公司管理人员25,000元，合计150,000元。',
    tip: '主体施工阶段施工人员增加。',
    entries: [
      {
        subjectCode: '540101',
        debit: 90000,
        credit: 0,
        summary: '施工人员工资',
        explanation: '合同履约成本-人工成本增加。'
      },
      {
        subjectCode: '540106',
        debit: 35000,
        credit: 0,
        summary: '项目部管理人员工资',
        explanation: '间接费用增加。'
      },
      {
        subjectCode: '6602',
        debit: 25000,
        credit: 0,
        summary: '公司管理人员工资',
        explanation: '管理费用增加。'
      },
      {
        subjectCode: '221101',
        debit: 0,
        credit: 150000,
        summary: '应付职工薪酬-工资',
        explanation: '应付职工薪酬增加。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '工资计提表',
        date: '2026-03-20',
        content: '施工90,000+项目部35,000+管理25,000=150,000元',
        signature: '王人事'
      }
    ]
  },
  {
    date: '2026-03-20',
    role: 'accountant',
    title: '计提3月社保及公积金',
    tags: [
      '工资社保'
    ],
    difficulty: 2,
    description: '计提3月社保（24.7%）及公积金（12%），按工资分配：施工90K×36.7%=33,030元，项目部35K×36.7%=12,845元，管理25K×36.7%=9,175元，合计55,050元。',
    tip: '',
    entries: [
      {
        subjectCode: '540101',
        debit: 33030,
        credit: 0,
        summary: '施工人员社保公积金',
        explanation: '合同履约成本-人工成本增加。'
      },
      {
        subjectCode: '540106',
        debit: 12845,
        credit: 0,
        summary: '项目部社保公积金',
        explanation: '间接费用增加。'
      },
      {
        subjectCode: '6602',
        debit: 9175,
        credit: 0,
        summary: '公司管理社保公积金',
        explanation: '管理费用增加。'
      },
      {
        subjectCode: '221102',
        debit: 0,
        credit: 37050,
        summary: '社保（150K×24.7%）',
        explanation: '社保企业部分增加。'
      },
      {
        subjectCode: '221103',
        debit: 0,
        credit: 18000,
        summary: '公积金（150K×12%）',
        explanation: '公积金增加。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '社保公积金计提表',
        date: '2026-03-20',
        content: '费率36.7%，合计55,050元',
        signature: '赵会计'
      }
    ]
  },
  {
    date: '2026-03-21',
    role: 'accountant',
    title: '计提固定资产折旧',
    tags: [
      '工程成本'
    ],
    difficulty: 2,
    description: '计提3月折旧：施工机械1,250元，办公设备600元，合计1,850元。',
    tip: '',
    entries: [
      {
        subjectCode: '540104',
        debit: 1250,
        credit: 0,
        summary: '施工机械折旧',
        explanation: '机械使用费增加。'
      },
      {
        subjectCode: '6602',
        debit: 600,
        credit: 0,
        summary: '办公设备折旧',
        explanation: '管理费用增加。'
      },
      {
        subjectCode: '1602',
        debit: 0,
        credit: 1850,
        summary: '累计折旧增加',
        explanation: '累计折旧增加。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '折旧计算表',
        date: '2026-03-21',
        content: '施工机械1,250+办公设备600=1,850元'
      }
    ]
  },
  {
    date: '2026-03-21',
    role: 'accountant',
    title: '摊销临时设施及预付租金',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '摊销3月临时设施5,000元，预付办公租金10,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '540105',
        debit: 5000,
        credit: 0,
        summary: '临时设施摊销',
        explanation: '其他直接费增加。'
      },
      {
        subjectCode: '6602',
        debit: 10000,
        credit: 0,
        summary: '办公租金摊销',
        explanation: '管理费用增加。'
      },
      {
        subjectCode: '1801',
        debit: 0,
        credit: 5000,
        summary: '临时设施减少',
        explanation: '长期待摊费用减少。余额50,000元。'
      },
      {
        subjectCode: '1123',
        debit: 0,
        credit: 10000,
        summary: '预付租金减少',
        explanation: '预付账款减少。余额90,000元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '摊销表',
        date: '2026-03-21',
        content: '临时设施5,000+预付房租10,000=15,000元'
      }
    ]
  },
  {
    date: '2026-03-24',
    role: 'accountant',
    title: '间接费用归集与分摊',
    tags: [
      '工程成本'
    ],
    difficulty: 3,
    description: '本月间接费用：项目部工资35,000+社保公积金12,845+项目办公费1,800=49,645元。全部分配给恒达项目。',
    tip: '',
    entries: [
      {
        subjectCode: '540101',
        debit: 49645,
        credit: 0,
        summary: '间接费用转入恒达项目',
        explanation: '间接费用分配至合同履约成本。'
      },
      {
        subjectCode: '540106',
        debit: 0,
        credit: 49645,
        summary: '间接费用分配转出',
        explanation: '间接费用余额归零。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '间接费用分配表',
        date: '2026-03-24',
        content: '间接费用合计49,645元，全额分配 ✓',
        signature: '李会计'
      }
    ]
  },
  {
    date: '2026-03-25',
    role: 'accountant',
    title: '确认工程进度确认收入',
    tags: [
      '工程合同'
    ],
    difficulty: 3,
    description: '恒达办公楼工程累计完工进度达到55%（本月新增20%）。按完工百分比确认收入：500万×55%-已确认收入1,750,000=1,000,000元（不含税）。增值税销项税额90,000元。上月应收账款已收回，本次计入应收账款。',
    tip: '主体施工过半，累计收入确认进度与施工进度同步。',
    entries: [
      {
        subjectCode: '1122',
        debit: 1090000,
        credit: 0,
        summary: '应收账款-恒达地产',
        explanation: '应收账款增加（含税）。'
      },
      {
        subjectCode: '222101',
        debit: 0,
        credit: 90000,
        summary: '增值税销项税额（100万×9%）',
        explanation: '应交增值税增加。'
      },
      {
        subjectCode: '6001',
        debit: 0,
        credit: 1000000,
        summary: '确认主营业务收入',
        explanation: '不含税收入100万元。'
      }
    ],
    documents: [
      {
        type: 'invoice',
        label: '增值税专用发票',
        date: '2026-03-25',
        lineItems: [
          {
            name: '办公楼主体工程进度款（累计55%）',
            qty: 1,
            unit: '项',
            price: 1000000,
            amount: 1000000
          }
        ],
        totalAmount: 1090000
      }
    ]
  },
  {
    date: '2026-03-25',
    role: 'accountant',
    title: '结转主营业务成本',
    tags: [
      '工程合同'
    ],
    difficulty: 3,
    description: '结转本月成本：材料(126,000+160,000)=286,000+分包尾款160,000+人工(90,000+33,030+49,645)=172,675+机械(15,000+15,000+14,000+1,250)=45,250+其他直接(14,500+5,000+3,200+12,000)=34,700=698,625元。',
    tip: '',
    entries: [
      {
        subjectCode: '6401',
        debit: 698625,
        credit: 0,
        summary: '结转恒达项目本月成本',
        explanation: '主营业务成本增加。'
      },
      {
        subjectCode: '540101',
        debit: 0,
        credit: 172675,
        summary: '结转人工',
        explanation: '人工转出。'
      },
      {
        subjectCode: '540102',
        debit: 0,
        credit: 286000,
        summary: '结转材料',
        explanation: '材料转出。'
      },
      {
        subjectCode: '540103',
        debit: 0,
        credit: 160000,
        summary: '结转分包',
        explanation: '分包转出。'
      },
      {
        subjectCode: '540104',
        debit: 0,
        credit: 45250,
        summary: '结转机械',
        explanation: '机械费转出。'
      },
      {
        subjectCode: '540105',
        debit: 0,
        credit: 34700,
        summary: '结转其他直接费',
        explanation: '其他直接费转出。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '成本结转表',
        date: '2026-03-25',
        content: '人工172,675+材料286,000+分包160,000+机械45,250+其他34,700=698,625元\n毛利301,375元',
        signature: '李会计'
      }
    ]
  },
  {
    date: '2026-03-26',
    role: 'accountant',
    title: '计提城建税及附加',
    tags: [
      '税费'
    ],
    difficulty: 2,
    description: '本月增值税：销项90,000-进项(16,380+20,800)=52,820元。计提城建税3,697元，教育费附加1,585元，地方教育附加1,056元，合计6,338元。',
    tip: '',
    entries: [
      {
        subjectCode: '6403',
        debit: 6338,
        credit: 0,
        summary: '计提城建税及附加',
        explanation: '税金及附加增加。'
      },
      {
        subjectCode: '222103',
        debit: 0,
        credit: 3697,
        summary: '应交城建税（52,820×7%）',
        explanation: '城建税增加。'
      },
      {
        subjectCode: '222104',
        debit: 0,
        credit: 2641,
        summary: '应交教育费附加（52,820×5%）',
        explanation: '教育费附加3%+地方2%=5%。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '税费计算表',
        date: '2026-03-26',
        content: '应交增值税52,820×12%=6,338元',
        signature: '李会计'
      }
    ]
  },
  {
    date: '2026-03-27',
    role: 'accountant',
    title: '银行手续费及利息收入',
    tags: [
      '资金管理'
    ],
    difficulty: 1,
    description: '3月银行手续费500元，存款利息1,800元。',
    tip: '',
    entries: [
      {
        subjectCode: '6603',
        debit: 500,
        credit: 0,
        summary: '手续费',
        explanation: '财务费用增加。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 500,
        summary: '银行手续费',
        explanation: '银行存款减少。'
      },
      {
        subjectCode: '100201',
        debit: 1800,
        credit: 0,
        summary: '存款利息',
        explanation: '银行存款增加。',
        cashFlowItem: 'cf-op5',
        cashFlowExplanation: '收到其他与经营活动有关的现金。'
      },
      {
        subjectCode: '6603',
        debit: 0,
        credit: 1800,
        summary: '利息冲减财务费用',
        explanation: '财务费用减少。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '回单',
        date: '2026-03-27',
        totalAmount: 500,
        content: '手续费'
      },
      {
        type: 'bank',
        label: '利息回单',
        totalAmount: 1800,
        content: '利息'
      }
    ]
  },
  {
    date: '2026-03-28',
    role: 'accountant',
    title: '月末结转损益',
    tags: [
      '期末'
    ],
    difficulty: 3,
    description: '月末结转损益：收入100万元，成本698,625元，税金7,838元（含印花税），管理费用（工资25,000+社保9,175+办公5,000+折旧600+房租10,000+其他）52,375元，财务费用净收入1,300元。',
    tip: '',
    entries: [
      {
        subjectCode: '6001',
        debit: 1000000,
        credit: 0,
        summary: '结转收入',
        explanation: '收入转出。'
      },
      {
        subjectCode: '6401',
        debit: 0,
        credit: 698625,
        summary: '结转成本',
        explanation: '成本转出。'
      },
      {
        subjectCode: '6403',
        debit: 0,
        credit: 7838,
        summary: '结转税金',
        explanation: '税金转出。'
      },
      {
        subjectCode: '6602',
        debit: 0,
        credit: 52375,
        summary: '结转管理费用',
        explanation: '管理费用转出。'
      },
      {
        subjectCode: '6603',
        debit: 1300,
        credit: 0,
        summary: '结转财务费用（净收入）',
        explanation: '财务费用净收入。'
      },
      {
        subjectCode: '4103',
        debit: 0,
        credit: 242462,
        summary: '结转本年利润',
        explanation: '净利润=100万-698,625-7,838-52,375+1,300=242,462元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '损益结转表',
        date: '2026-03-28',
        content: '净利润242,462元 ✓',
        signature: '李会计'
      }
    ]
  },
  {
    date: '2026-03-31',
    role: 'accountant',
    title: '模拟纳税申报',
    tags: [
      '期末',
      '申报'
    ],
    difficulty: 1,
    description: '3月增值税应纳52,820元（无留抵），城建税3,697元，教育费附加2,641元。',
    tip: '增值税不再有留抵，需全额缴纳。',
    entries: [],
    documents: [
      {
        type: 'text',
        label: '申报提醒',
        date: '2026-03-31',
        content: '增值税：52,820元\n城建税：3,697元\n教育费附加：2,641元\n合计：59,158元',
        signature: '税务申报提醒'
      }
    ],
    nextAction: 'tax-filing'
  }
]

export default tasks
