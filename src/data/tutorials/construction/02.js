/**
 * 建筑业 - 2月教学任务
 *
 * 企业：鼎立建筑工程有限公司
 * 税制：一般纳税人（增值税9%）
 * 准则：CAS 14 新收入准则（投入法/完工百分比）
 * 本月主题：基础施工推进与分包进场
 */

const tasks = [
  {
    date: '2026-02-02',
    role: 'accountant',
    title: '缴纳上月增值税及附加税费',
    tags: [
      '税费'
    ],
    difficulty: 2,
    description: '申报缴纳1月增值税及附加。1月销项税额67,500元，进项税额53,300元，应纳14,200元。已预缴30,000元，留抵15,800元。城建税994元，教育费附加710元。实际缴纳附加税费1,704元。',
    tip: '增值税预缴大于应纳时差额留抵下期，无需补缴增值税，但附加税费需据实缴纳。',
    entries: [
      {
        subjectCode: '222103',
        debit: 994,
        credit: 0,
        summary: '缴纳1月城建税',
        explanation: '应交城建税减少。'
      },
      {
        subjectCode: '222104',
        debit: 710,
        credit: 0,
        summary: '缴纳1月教育费附加',
        explanation: '应交教育费附加减少。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 1704,
        summary: '缴纳税款',
        explanation: '银行存款减少1,704元。',
        cashFlowItem: 'cf-op4',
        cashFlowExplanation: '缴纳税费支出。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '电子缴税付款凭证',
        date: '2026-02-02',
        totalAmount: 1704,
        payer: '鼎立建筑工程有限公司',
        payeeName: '国家金库',
        content: '1月城建税及附加税费',
        refNo: 'JS202602020001'
      }
    ]
  },
  {
    date: '2026-02-02',
    role: 'accountant',
    title: '缴纳1月社保费',
    tags: [
      '工资社保'
    ],
    difficulty: 1,
    description: '缴纳1月企业应承担的社保费33,345元。',
    tip: '社保费缴纳时冲减"应付职工薪酬-社保"。',
    entries: [
      {
        subjectCode: '221102',
        debit: 33345,
        credit: 0,
        summary: '缴纳1月社保费',
        explanation: '应付职工薪酬-社保减少。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 33345,
        summary: '支付社保费',
        explanation: '银行存款减少33,345元。',
        cashFlowItem: 'cf-op3',
        cashFlowExplanation: '支付给职工以及为职工支付的现金。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '社保缴费回单',
        date: '2026-02-02',
        totalAmount: 33345,
        payer: '鼎立建筑工程有限公司',
        payeeName: '社会保险费征收机构',
        content: '1月社保费',
        refNo: 'SB202602020001'
      }
    ]
  },
  {
    date: '2026-02-02',
    role: 'accountant',
    title: '缴纳1月公积金',
    tags: [
      '工资社保'
    ],
    difficulty: 1,
    description: '缴纳1月公积金16,200元。',
    tip: '公积金缴纳冲减"应付职工薪酬-公积金"。',
    entries: [
      {
        subjectCode: '221103',
        debit: 16200,
        credit: 0,
        summary: '缴纳1月公积金',
        explanation: '应付职工薪酬-公积金减少。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 16200,
        summary: '支付公积金',
        explanation: '银行存款减少16,200元。',
        cashFlowItem: 'cf-op3',
        cashFlowExplanation: '支付给职工以及为职工支付的现金。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '公积金缴费回单',
        date: '2026-02-02',
        totalAmount: 16200,
        payer: '鼎立建筑工程有限公司',
        payeeName: '住房公积金管理中心',
        content: '1月公积金',
        refNo: 'GJJ202602020001'
      }
    ]
  },
  {
    date: '2026-02-03',
    role: 'accountant',
    title: '发放1月职工工资',
    tags: [
      '工资社保'
    ],
    difficulty: 1,
    description: '通过银行代发1月职工工资135,000元。',
    tip: '发放工资时借记"应付职工薪酬-工资"，贷记"银行存款"。注意与计提工资的区别。',
    entries: [
      {
        subjectCode: '221101',
        debit: 135000,
        credit: 0,
        summary: '发放1月工资',
        explanation: '应付职工薪酬-工资减少。清偿工资负债。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 135000,
        summary: '银行代发工资',
        explanation: '银行存款减少135,000元。',
        cashFlowItem: 'cf-op3',
        cashFlowExplanation: '支付给职工以及为职工支付的现金。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '银行代发工资回单',
        date: '2026-02-03',
        totalAmount: 135000,
        payer: '鼎立建筑工程有限公司',
        payeeName: '公司全体员工',
        content: '1月工资发放',
        refNo: 'GZ202602030001'
      }
    ]
  },
  {
    date: '2026-02-03',
    role: 'accountant',
    title: '提取备用金',
    tags: [
      '资金管理'
    ],
    difficulty: 1,
    description: '从银行提取备用金20,000元，补充日常零星开支。',
    tip: '提取备用金，借记"库存现金"，贷记"银行存款"。',
    entries: [
      {
        subjectCode: '1001',
        debit: 20000,
        credit: 0,
        summary: '提取备用金',
        explanation: '库存现金增加。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 20000,
        summary: '提取备用金',
        explanation: '银行存款减少20,000元。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '现金支票存根',
        date: '2026-02-03',
        totalAmount: 20000,
        payer: '鼎立建筑工程有限公司',
        payeeName: '鼎立建筑工程有限公司',
        content: '备用金',
        refNo: 'XJ202602030001'
      }
    ]
  },
  {
    date: '2026-02-04',
    role: 'accountant',
    title: '采购商品混凝土',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '采购商品混凝土300立方米，单价400元，共计120,000元，增值税15,600元，合计135,600元，转账支付。',
    tip: '商品混凝土采购成本直接计入"合同履约成本-材料成本"。',
    entries: [
      {
        subjectCode: '540102',
        debit: 120000,
        credit: 0,
        summary: '采购商品混凝土（300m³）',
        explanation: '合同履约成本-材料成本增加。'
      },
      {
        subjectCode: '222101',
        debit: 15600,
        credit: 0,
        summary: '增值税进项税额',
        explanation: '进项税额15,600元可抵扣。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 135600,
        summary: '支付混凝土款',
        explanation: '银行存款减少135,600元。',
        cashFlowItem: 'cf-op2',
        cashFlowExplanation: '购买商品接受劳务支付的现金。'
      }
    ],
    documents: [
      {
        type: 'invoice',
        label: '增值税专用发票',
        date: '2026-02-04',
        region: '江苏省',
        invoiceNo: '3200260204',
        buyer: '鼎立建筑工程有限公司',
        seller: 'XX商品混凝土公司',
        lineItems: [
          {
            name: 'C30商品混凝土',
            qty: 300,
            unit: '立方米',
            price: 400,
            amount: 120000
          }
        ],
        totalAmount: 135600
      },
      {
        type: 'text',
        label: '材料进场单',
        date: '2026-02-04',
        content: 'C30商品混凝土300m³，到货验收合格。',
        signature: '陈质检'
      }
    ]
  },
  {
    date: '2026-02-05',
    role: 'accountant',
    title: '月末材料盘点',
    tags: [
      '工程成本'
    ],
    difficulty: 2,
    description: '月末对现场材料进行盘点，混凝土和砂石已全部用于基础施工，钢材剩余15吨（原采购50吨+新采购0，领用30吨，结余20吨，盘点短缺5吨，需查明原因）。',
    tip: '现场材料盘点：发现亏损5吨钢材（价值20,000元），先计入"待处理财产损溢"，查明原因后再处理。',
    entries: [
      {
        subjectCode: '1901',
        debit: 20000,
        credit: 0,
        summary: '盘亏螺纹钢5吨（5×4,000）',
        explanation: '待处理财产损溢增加。盘亏待查明原因。'
      },
      {
        subjectCode: '540102',
        debit: 0,
        credit: 20000,
        summary: '材料盘亏转出',
        explanation: '合同履约成本-材料成本减少。材料盘亏从成本中转出。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '材料盘点表',
        date: '2026-02-05',
        docTitle: '现 场 材 料 月 末 盘 点 表',
        content: '螺纹钢：账面结余20吨，实存15吨，盘亏5吨（原因待查，约20,000元）\n水泥：账面结余70吨，实存70吨 ✓\n砂石：账面结余180方，实存180方 ✓\n盘点人：刘保管  监盘人：李会计',
        signature: '盘点小组'
      }
    ]
  },
  {
    date: '2026-02-06',
    role: 'accountant',
    title: '材料盘亏处理',
    tags: [
      '工程成本'
    ],
    difficulty: 2,
    description: '经查明，钢材盘亏5吨系露天堆放被盗。保险公司已确认赔付10,000元，剩余10,000元由公司承担，计入工程成本。',
    tip: '材料盘亏处理：保险公司赔款计入"其他应收款"，公司承担部分计入"合同履约成本-其他直接费用"。',
    entries: [
      {
        subjectCode: '1221',
        debit: 10000,
        credit: 0,
        summary: '应收保险公司赔款',
        explanation: '其他应收款增加。待保险公司赔付。'
      },
      {
        subjectCode: '540105',
        debit: 10000,
        credit: 0,
        summary: '盘亏损失（公司承担部分）',
        explanation: '其他直接费用增加。盘亏净损失计入工程成本。'
      },
      {
        subjectCode: '1901',
        debit: 0,
        credit: 20000,
        summary: '盘亏处理转出',
        explanation: '待处理财产损溢转出归零。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '盘亏处理意见',
        date: '2026-02-06',
        docTitle: '材料盘亏处理审批单',
        content: '盘亏原因：露天堆放被盗\n处理意见：保险公司赔付10,000元\n公司承担：10,000元计入工程成本\n审批人：赵总',
        signature: '审批意见'
      }
    ]
  },
  {
    date: '2026-02-07',
    role: 'accountant',
    title: '支付塔吊租赁费摊销（2月）',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '摊销本月塔吊租赁费15,000元（预付3个月，月租金15,000元，1月已摊销15,000元，本月再摊销15,000元，剩余1个月15,000元待摊）。',
    tip: '预付租赁费按月摊销计入"合同履约成本-机械使用费"。',
    entries: [
      {
        subjectCode: '540104',
        debit: 15000,
        credit: 0,
        summary: '塔吊租赁费（2月摊销）',
        explanation: '合同履约成本-机械使用费增加。'
      },
      {
        subjectCode: '1123',
        debit: 0,
        credit: 15000,
        summary: '预付租赁费摊销',
        explanation: '预付账款减少。剩余预付租金15,000元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '租赁费摊销表',
        date: '2026-02-07',
        docTitle: '机械租赁费摊销表',
        content: '塔吊月租15,000元\n已预付3个月共45,000元\n1月已摊销：15,000元\n2月摊销：15,000元\n剩余待摊：15,000元',
        signature: '赵会计'
      }
    ]
  },
  {
    date: '2026-02-07',
    role: 'accountant',
    title: '机械燃油及维修费',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '支付施工机械（挖掘机、搅拌机）2月燃油费8,000元及维修费3,500元，合计11,500元。',
    tip: '机械燃油费及维修费计入"合同履约成本-机械使用费"。',
    entries: [
      {
        subjectCode: '540104',
        debit: 11500,
        credit: 0,
        summary: '机械燃油及维修费',
        explanation: '合同履约成本-机械使用费增加。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 11500,
        summary: '支付燃油及维修费',
        explanation: '银行存款减少11,500元。',
        cashFlowItem: 'cf-op6',
        cashFlowExplanation: '其他经营活动现金支出。'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '燃油及维修费发票',
        date: '2026-02-07',
        totalAmount: 11500,
        items: [
          {
            name: '0#柴油 800升',
            amount: 8000
          },
          {
            name: '搅拌机保养',
            amount: 2000
          },
          {
            name: '振捣器维修',
            amount: 1500
          }
        ],
        stampText: 'XX加油站/维修部\n发票专用章'
      }
    ]
  },
  {
    date: '2026-02-10',
    role: 'accountant',
    title: '签订分包合同并预付工程款',
    tags: [
      '分包管理'
    ],
    difficulty: 1,
    description: '与大地基础工程有限公司签订桩基工程分包合同，合同价80万元（不含税），增值税9%。按合同约定预付分包工程款30%，即240,000元。',
    tip: '分包工程款预付时先计入"预付账款-预付分包款"，待完工结算后转入分包成本。预付分包款不直接进成本。',
    entries: [
      {
        subjectCode: '1123',
        debit: 240000,
        credit: 0,
        summary: '预付分包工程款（80万×30%）',
        explanation: '预付账款增加24万元。预付分包款项先挂在预付账款。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 240000,
        summary: '支付预付分包款',
        explanation: '银行存款减少240,000元。',
        cashFlowItem: 'cf-op6',
        cashFlowExplanation: '其他经营活动现金支出。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '银行回单',
        date: '2026-02-10',
        totalAmount: 240000,
        payer: '鼎立建筑工程有限公司',
        payeeName: '大地基础工程有限公司',
        content: '桩基工程预付分包款（30%）',
        refNo: 'ZF202602100001'
      }
    ]
  },
  {
    date: '2026-02-11',
    role: 'accountant',
    title: '临时设施维修',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '因下雨导致部分临时工棚损坏，支付维修费用3,000元，现金支付。',
    tip: '临时设施维修费计入"合同履约成本-其他直接费用"。',
    entries: [
      {
        subjectCode: '540105',
        debit: 3000,
        credit: 0,
        summary: '临时设施维修',
        explanation: '合同履约成本-其他直接费增加。'
      },
      {
        subjectCode: '1001',
        debit: 0,
        credit: 3000,
        summary: '现金支付维修费',
        explanation: '库存现金减少3,000元。'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '收据',
        date: '2026-02-11',
        totalAmount: 3000,
        items: [
          {
            name: '临时工棚维修',
            amount: 3000
          }
        ],
        stampText: 'XX维修服务部\n财务专用章'
      }
    ]
  },
  {
    date: '2026-02-13',
    role: 'accountant',
    title: '支付现场施工水电费',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '支付施工现场2月水电费：水费2,000元，电费9,500元，合计11,500元。',
    tip: '施工现场水电费计入"合同履约成本-其他直接费用"。',
    entries: [
      {
        subjectCode: '540105',
        debit: 11500,
        credit: 0,
        summary: '支付施工水电费',
        explanation: '合同履约成本-其他直接费增加。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 11500,
        summary: '支付水电费',
        explanation: '银行存款减少11,500元。',
        cashFlowItem: 'cf-op6',
        cashFlowExplanation: '其他经营活动现金支出。'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '水电费缴费单',
        date: '2026-02-13',
        totalAmount: 11500,
        items: [
          {
            name: '施工用电 9,500kWh',
            amount: 9500
          },
          {
            name: '施工用水 400吨',
            amount: 2000
          }
        ],
        stampText: '供电局/自来水公司'
      }
    ]
  },
  {
    date: '2026-02-14',
    role: 'accountant',
    title: '项目部差旅费及办公费报销',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '项目经理报销出差至材料供应商洽谈运费等差旅费2,800元；现场办公室购买办公用品1,500元，合计4,300元，现金支付。',
    tip: '项目管理人员差旅费计入"合同履约成本-其他直接费用"，项目办公费计入间接费用。',
    entries: [
      {
        subjectCode: '540105',
        debit: 2800,
        credit: 0,
        summary: '差旅费报销',
        explanation: '其他直接费增加。'
      },
      {
        subjectCode: '540106',
        debit: 1500,
        credit: 0,
        summary: '项目办公费',
        explanation: '间接费用增加。'
      },
      {
        subjectCode: '1001',
        debit: 0,
        credit: 4300,
        summary: '现金支付',
        explanation: '库存现金减少4,300元。'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '报销单',
        date: '2026-02-14',
        totalAmount: 4300,
        items: [
          {
            name: '差旅费',
            amount: 2800
          },
          {
            name: '项目办公用品',
            amount: 1500
          }
        ],
        stampText: '财务审核专用章'
      }
    ]
  },
  {
    date: '2026-02-14',
    role: 'accountant',
    title: '公司管理办公费',
    tags: [
      '资金管理'
    ],
    difficulty: 1,
    description: '报销公司管理部门2月办公用品、快递费等共计4,200元。',
    tip: '公司管理部门办公费计入"管理费用-办公费"。',
    entries: [
      {
        subjectCode: '6602',
        debit: 4200,
        credit: 0,
        summary: '支付办公费用',
        explanation: '管理费用增加。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 4200,
        summary: '支付办公费',
        explanation: '银行存款减少4,200元。',
        cashFlowItem: 'cf-op6',
        cashFlowExplanation: '其他经营活动现金支出。'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '办公费明细',
        date: '2026-02-14',
        totalAmount: 4200,
        items: [
          {
            name: '打印纸/墨盒',
            amount: 2500
          },
          {
            name: '快递费',
            amount: 800
          },
          {
            name: '其他办公用品',
            amount: 900
          }
        ],
        stampText: '办公用品清单'
      }
    ]
  },
  {
    date: '2026-02-17',
    role: 'accountant',
    title: '材料采购（钢筋调价）',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '因钢材市场价格上涨，本月采购第二批钢筋20吨，单价4,200元（上月为4,000元），合计84,000元，增值税10,920元，合计94,920元，款项暂未支付。',
    tip: '材料价格波动是建筑业面临的常见风险。材料涨价直接增加工程成本，影响项目毛利。',
    entries: [
      {
        subjectCode: '540102',
        debit: 84000,
        credit: 0,
        summary: '采购钢筋20吨（单价涨至4,200）',
        explanation: '合同履约成本-材料成本增加。钢材单价从4,000涨至4,200元/吨。'
      },
      {
        subjectCode: '222101',
        debit: 10920,
        credit: 0,
        summary: '增值税进项税额',
        explanation: '进项税额10,920元可抵扣。'
      },
      {
        subjectCode: '2202',
        debit: 0,
        credit: 94920,
        summary: '应付账款-华强建材',
        explanation: '材料款未付，形成对供应商的负债。'
      }
    ],
    documents: [
      {
        type: 'invoice',
        label: '增值税专用发票',
        date: '2026-02-17',
        region: '江苏省',
        invoiceNo: '3200260217',
        buyer: '鼎立建筑工程有限公司',
        seller: '华强建材有限公司',
        lineItems: [
          {
            name: '螺纹钢 Φ25mm（调价后）',
            qty: 20,
            unit: '吨',
            price: 4200,
            amount: 84000
          }
        ],
        totalAmount: 94920
      }
    ]
  },
  {
    date: '2026-02-18',
    role: 'accountant',
    title: '支付材料供应商欠款',
    tags: [
      '往来管理'
    ],
    difficulty: 1,
    description: '支付1月欠华强建材的钢材款226,000元。',
    tip: '支付欠款冲减"应付账款"。注意合理安排付款时间。',
    entries: [
      {
        subjectCode: '2202',
        debit: 226000,
        credit: 0,
        summary: '支付华强建材欠款',
        explanation: '应付账款减少。清偿前期欠款。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 226000,
        summary: '支付材料款',
        explanation: '银行存款减少226,000元。',
        cashFlowItem: 'cf-op2',
        cashFlowExplanation: '购买商品接受劳务支付的现金。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '银行回单',
        date: '2026-02-18',
        totalAmount: 226000,
        payer: '鼎立建筑工程有限公司',
        payeeName: '华强建材有限公司',
        content: '支付1月钢材款',
        refNo: 'ZF202602180001'
      }
    ]
  },
  {
    date: '2026-02-19',
    role: 'accountant',
    title: '分包工程进度确认',
    tags: [
      '分包管理'
    ],
    difficulty: 2,
    description: '大地基础公司桩基工程完成50%进度，收到分包工程进度单，确认分包成本按合同价的50%计量，即400,000元（不含税）。建筑服务增值税由总包方统一核算。',
    tip: '分包工程按进度确认成本，借记"合同履约成本-分包成本"，贷记"应付账款-分包单位"。',
    entries: [
      {
        subjectCode: '540103',
        debit: 400000,
        credit: 0,
        summary: '大地基础分包成本（50%进度）',
        explanation: '合同履约成本-分包成本增加。'
      },
      {
        subjectCode: '2202',
        debit: 0,
        credit: 400000,
        summary: '应付账款-大地基础',
        explanation: '应付分包款增加。按完成进度确认对分包商的负债。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '分包进度确认单',
        date: '2026-02-19',
        docTitle: '分包工程进度确认单',
        content: '分包单位：大地基础工程有限公司\n工程：桩基工程\n合同价：800,000元\n当月完成：50%\n确认金额：400,000元\n监理签字：王监理',
        signature: '分包确认'
      }
    ]
  },
  {
    date: '2026-02-20',
    role: 'accountant',
    title: '计提2月职工薪酬',
    tags: [
      '工资社保'
    ],
    difficulty: 2,
    description: '计提2月职工薪酬：施工人员85,000元（施工强度加大），项目部管理人员35,000元，公司管理人员25,000元，合计145,000元。',
    tip: '施工人员工资增加反映施工强度加大。分配路径与上月一致。',
    entries: [
      {
        subjectCode: '540101',
        debit: 85000,
        credit: 0,
        summary: '施工人员工资',
        explanation: '直接人工计入合同履约成本-人工成本。'
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
        credit: 145000,
        summary: '应付职工薪酬-工资',
        explanation: '应付职工薪酬增加。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '工资计提表',
        date: '2026-02-20',
        docTitle: '2026年2月工资计提表',
        content: '施工人员85,000+项目部管理35,000+公司管理25,000=145,000元',
        signature: '王人事'
      }
    ]
  },
  {
    date: '2026-02-20',
    role: 'accountant',
    title: '计提2月社保及公积金',
    tags: [
      '工资社保'
    ],
    difficulty: 2,
    description: '计提2月社保（24.7%）及公积金（12%）：施工人员85,000×36.7%=31,195元，项目部35,000×36.7%=12,845元，公司管理25,000×36.7%=9,175元，合计53,215元。',
    tip: '社保公积金按工资同路径分配。',
    entries: [
      {
        subjectCode: '540101',
        debit: 31195,
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
        credit: 35815,
        summary: '应付职工薪酬-社保（145K×24.7%）',
        explanation: '社保企业部分增加。'
      },
      {
        subjectCode: '221103',
        debit: 0,
        credit: 17400,
        summary: '应付职工薪酬-公积金（145K×12%）',
        explanation: '公积金企业部分增加。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '社保公积金计提表',
        date: '2026-02-20',
        content: '费率24.7%+12%=36.7%，合计53,215元',
        signature: '赵会计'
      }
    ]
  },
  {
    date: '2026-02-21',
    role: 'accountant',
    title: '计提固定资产折旧',
    tags: [
      '工程成本'
    ],
    difficulty: 2,
    description: '计提2月折旧：施工机械1,250元，办公设备600元，合计1,850元。',
    tip: '施工机械折旧计入"合同履约成本-机械使用费"，办公设备折旧计入"管理费用"。',
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
        explanation: '累计折旧增加1,850元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '折旧计算表',
        date: '2026-02-21',
        content: '施工机械1,250+办公设备600=1,850元',
        signature: '赵会计'
      }
    ]
  },
  {
    date: '2026-02-21',
    role: 'accountant',
    title: '摊销临时设施及预付租金',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '本月摊销临时设施5,000元（原值60,000元/12月），摊销办公租金10,000元（预付全年120,000元/12月）。',
    tip: '临时设施摊销计入其他直接费用，办公租金摊销计入管理费用。',
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
        explanation: '长期待摊费用减少。剩余55,000元。'
      },
      {
        subjectCode: '1123',
        debit: 0,
        credit: 10000,
        summary: '预付租金减少',
        explanation: '预付账款减少。剩余预付房租100,000元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '摊销计算表',
        date: '2026-02-21',
        content: '临时设施5,000+预付房租10,000=15,000元',
        signature: '赵会计'
      }
    ]
  },
  {
    date: '2026-02-24',
    role: 'accountant',
    title: '间接费用归集与分摊',
    tags: [
      '工程成本'
    ],
    difficulty: 3,
    description: '本月间接费用：项目部工资35,000+社保公积金12,845+项目办公费1,500=49,345元。全部分配给恒达项目（仍在建，唯一项目）。',
    tip: '间接费用每月末归集后按合理标准分摊。本月恒达项目只有1个，全额分配。',
    entries: [
      {
        subjectCode: '540101',
        debit: 49345,
        credit: 0,
        summary: '间接费用转入恒达项目',
        explanation: '间接费用全部分配至恒达项目合同履约成本。'
      },
      {
        subjectCode: '540106',
        debit: 0,
        credit: 49345,
        summary: '间接费用分配转出',
        explanation: '间接费用归零。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '间接费用分配表',
        date: '2026-02-24',
        content: '间接费用合计49,345元，已全额分配。分配后余额：0元 ✓',
        signature: '李会计'
      }
    ]
  },
  {
    date: '2026-02-25',
    role: 'accountant',
    title: '确认工程进度确认收入',
    tags: [
      '工程合同'
    ],
    difficulty: 3,
    description: '恒达办公楼工程累计完工进度达到35%（本月新增20%）。按完工百分比确认收入：500万×35%-已确认收入682,500=1,067,500元（不含税）。增值税销项税额96,075元。合同负债余额150万-75万(1月)=75万元，本次冲减75万，差额计入应收账款。',
    tip: '当合同负债余额不足以覆盖冲减金额时，差额记入"应收账款"。合同负债不能出现负数。',
    entries: [
      {
        subjectCode: '2205',
        debit: 750000,
        credit: 0,
        summary: '合同负债冲减（余额75万全额冲减）',
        explanation: '合同负债余额75万元全部冲减归零。'
      },
      {
        subjectCode: '1122',
        debit: 413575,
        credit: 0,
        summary: '应收账款-恒达地产（差额）',
        explanation: '应收账款增加413,575元。冲减合同负债后差额由客户另行支付。'
      },
      {
        subjectCode: '222101',
        debit: 0,
        credit: 96075,
        summary: '增值税销项税额（1,067,500×9%）',
        explanation: '应交增值税增加96,075元。'
      },
      {
        subjectCode: '6001',
        debit: 0,
        credit: 1067500,
        summary: '确认主营业务收入',
        explanation: '不含税收入1,067,500元。'
      }
    ],
    documents: [
      {
        type: 'invoice',
        label: '增值税专用发票',
        date: '2026-02-25',
        region: '江苏省',
        invoiceNo: '3200260225',
        buyer: '恒达地产有限公司',
        seller: '鼎立建筑工程有限公司',
        lineItems: [
          {
            name: '办公楼主体工程进度款（累计35%）',
            qty: 1,
            unit: '项',
            price: 1067500,
            amount: 1067500
          }
        ],
        totalAmount: 1163575
      }
    ]
  },
  {
    date: '2026-02-25',
    role: 'accountant',
    title: '结转主营业务成本',
    tags: [
      '工程合同'
    ],
    difficulty: 3,
    description: '结转本月合同履约成本至主营业务成本。本月成本合计：材料(84,000+盘亏调整10,000)=94,000+分包400,000+人工(85,000+31,195+49,345)=165,540+机械(15,000+11,500+1,250)=27,750+其他直接(11,500+3,000+5,000+2,800)=22,300=709,590元。',
    tip: '与收入同步结转成本，实现收入费用配比。',
    entries: [
      {
        subjectCode: '6401',
        debit: 709590,
        credit: 0,
        summary: '结转恒达项目本月成本',
        explanation: '主营业务成本增加。'
      },
      {
        subjectCode: '540101',
        debit: 0,
        credit: 165540,
        summary: '结转人工成本',
        explanation: '人工成本转出。'
      },
      {
        subjectCode: '540102',
        debit: 0,
        credit: 94000,
        summary: '结转材料成本',
        explanation: '材料成本转出。'
      },
      {
        subjectCode: '540103',
        debit: 0,
        credit: 400000,
        summary: '结转分包成本',
        explanation: '分包成本转出。'
      },
      {
        subjectCode: '540104',
        debit: 0,
        credit: 27750,
        summary: '结转机械使用费',
        explanation: '机械使用费转出。'
      },
      {
        subjectCode: '540105',
        debit: 0,
        credit: 22300,
        summary: '结转其他直接费',
        explanation: '其他直接费转出。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '成本结转表',
        date: '2026-02-25',
        content: '人工165,540+材料94,000+分包400,000+机械27,750+其他22,300=709,590元\n收入1,067,500元\n毛利357,910元',
        signature: '李会计'
      }
    ]
  },
  {
    date: '2026-02-26',
    role: 'accountant',
    title: '计提城建税及附加',
    tags: [
      '税费'
    ],
    difficulty: 2,
    description: '本月增值税：销项96,075-进项(10,920+15,600)=69,555元。计提城建税（7%）4,869元，教育费附加（3%）2,087元，地方教育附加（2%）1,391元，合计8,347元。',
    tip: '增值税应纳税额=销项-进项。',
    entries: [
      {
        subjectCode: '6403',
        debit: 8347,
        credit: 0,
        summary: '计提城建税及附加',
        explanation: '税金及附加增加8,347元。'
      },
      {
        subjectCode: '222103',
        debit: 0,
        credit: 4869,
        summary: '应交城建税（69,555×7%）',
        explanation: '城建税4,869元。'
      },
      {
        subjectCode: '222104',
        debit: 0,
        credit: 3478,
        summary: '应交教育费附加（69,555×5%）',
        explanation: '教育费附加3%+地方教育附加2%=5%，合计3,478元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '税费计算表',
        date: '2026-02-26',
        content: '应交增值税69,555×12%=8,347元',
        signature: '李会计'
      }
    ]
  },
  {
    date: '2026-02-27',
    role: 'accountant',
    title: '银行手续费及利息收入',
    tags: [
      '资金管理'
    ],
    difficulty: 1,
    description: '银行账户2月手续费400元，存款利息1,500元。',
    tip: '手续费计入财务费用，利息收入冲减财务费用。',
    entries: [
      {
        subjectCode: '6603',
        debit: 400,
        credit: 0,
        summary: '银行手续费',
        explanation: '财务费用增加。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 400,
        summary: '银行手续费',
        explanation: '银行存款减少。'
      },
      {
        subjectCode: '100201',
        debit: 1500,
        credit: 0,
        summary: '存款利息',
        explanation: '银行存款增加。',
        cashFlowItem: 'cf-op5',
        cashFlowExplanation: '收到其他与经营活动有关的现金。'
      },
      {
        subjectCode: '6603',
        debit: 0,
        credit: 1500,
        summary: '利息冲减财务费用',
        explanation: '财务费用减少。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '银行回单',
        date: '2026-02-27',
        totalAmount: 400,
        content: '2月手续费'
      },
      {
        type: 'bank',
        label: '利息回单',
        date: '2026-02-27',
        totalAmount: 1500,
        content: '2月存款利息'
      }
    ]
  },
  {
    date: '2026-02-13',
    role: 'accountant',
    title: '施工现场围挡及安全设施费',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '基础施工阶段搭建施工现场围挡1,200米，费用10,000元；采购安全警示牌等安全设施2,000元，合计12,000元，转账支付。',
    tip: '施工现场安全设施费用计入"合同履约成本-其他直接费用"。',
    entries: [
      {
        subjectCode: '540105',
        debit: 12000,
        credit: 0,
        summary: '围挡及安全设施费',
        explanation: '合同履约成本-其他直接费用增加。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 12000,
        summary: '支付费用',
        explanation: '银行存款减少12,000元。',
        cashFlowItem: 'cf-op6',
        cashFlowExplanation: '其他经营活动现金支出。'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '收款收据',
        date: '2026-02-13',
        totalAmount: 12000,
        items: [
          { name: '工地围挡搭建', amount: 10000 },
          { name: '安全警示牌等', amount: 2000 }
        ],
        stampText: '已付款'
      }
    ]
  },
  {
    date: '2026-02-28',
    role: 'accountant',
    title: '月末结转损益',
    tags: [
      '期末'
    ],
    difficulty: 3,
    description: '月末结转损益。收入1,067,500元，成本709,590元，税金9,847元（含印花税1,500），管理费用（工资25,000+社保9,175+办公4,200+折旧600+房租10,000+其他）48,975元，财务费用净收入1,100元。',
    tip: '月底将各损益科目余额转入本年利润。',
    entries: [
      {
        subjectCode: '6001',
        debit: 1067500,
        credit: 0,
        summary: '结转主营业务收入',
        explanation: '收入转出。'
      },
      {
        subjectCode: '6401',
        debit: 0,
        credit: 709590,
        summary: '结转主营业务成本',
        explanation: '成本转出。'
      },
      {
        subjectCode: '6403',
        debit: 0,
        credit: 9847,
        summary: '结转税金及附加',
        explanation: '税金转出（含印花税1,500+城建及附加8,347）。'
      },
      {
        subjectCode: '6602',
        debit: 0,
        credit: 48975,
        summary: '结转管理费用',
        explanation: '管理费用转出。'
      },
      {
        subjectCode: '6603',
        debit: 1100,
        credit: 0,
        summary: '结转财务费用（净收入）',
        explanation: '财务费用净收入1,100元。'
      },
      {
        subjectCode: '4103',
        debit: 0,
        credit: 300188,
        summary: '结转本年利润',
        explanation: '净利润=1,067,500-709,590-9,847-48,975+1,100=300,188元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '损益结转表',
        date: '2026-02-28',
        content: '净利润300,188元。各损益科目余额归零 ✓',
        signature: '李会计'
      }
    ]
  },
  {
    date: '2026-02-28',
    role: 'accountant',
    title: '模拟纳税申报',
    tags: [
      '期末',
      '申报'
    ],
    difficulty: 1,
    description: '完成2月账务处理后进行模拟纳税申报。本月应纳增值税69,555元（可抵减1月留抵15,800元，实际缴纳53,755元），城建税4,869元，教育费附加3,478元。',
    tip: '申报时注意：留抵税额可抵减当期应纳增值税。',
    entries: [],
    documents: [],
    nextAction: 'tax-filing'
  }
]

export default tasks
