/**
 * 建筑业 - 1月教学任务
 *
 * 企业：鼎立建筑工程有限公司
 * 税制：一般纳税人（增值税9%）
 * 准则：CAS 14 新收入准则（投入法/完工百分比）
 * 本月主题：企业设立与首个项目中标
 */

const tasks = [
  {
    date: '2026-01-02',
    role: 'accountant',
    title: '股东投入资本金',
    tags: [
      '资金管理'
    ],
    difficulty: 1,
    description: '公司由三位股东共同出资设立，收到股东王建国、李建设、张工程投入的资本金共计600万元，存入工商银行基本账户。',
    tip: '收到投资者投入资本，借记"银行存款"，贷记"实收资本"。实收资本按约定比例记入各股东明细。',
    entries: [
      {
        subjectCode: '100201',
        debit: 6000000,
        credit: 0,
        summary: '收到股东投资款',
        explanation: '银行存款增加，借记银行存款-工商银行。实收资本增加，按1/3比例贷记各股东。',
        cashFlowItem: 'cf-fin3',
        cashFlowExplanation: '吸收投资收到的现金——筹资活动现金流入。'
      },
      {
        subjectCode: '4001',
        debit: 0,
        credit: 6000000,
        summary: '实收资本增加',
        explanation: '实收资本是所有者权益科目，贷方记增加。三位股东各占1/3。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '银行回单',
        date: '2026-01-02',
        totalAmount: 6000000,
        payer: '王建国等三人',
        payeeName: '鼎立建筑工程有限公司',
        content: '投资款',
        refNo: 'HD202601020001',

      payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 9876 5432 1098 765'
      }
    ]
  },
  {
    date: '2026-01-03',
    role: 'accountant',
    title: '租赁办公用房并预付租金',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '公司租赁XX大厦写字楼作为办公场所，租赁期1年，预付全年租金120,000元，转账支付。',
    tip: '预付租金先计入"预付账款"，后续按月摊销计入管理费用。',
    entries: [
      {
        subjectCode: '1123',
        debit: 120000,
        credit: 0,
        summary: '预付全年办公用房租金',
        explanation: '预付账款增加120,000元。预付的全年租金先挂在预付账款，按月摊销。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 120000,
        summary: '支付预付租金',
        explanation: '银行存款减少120,000元。',
        cashFlowItem: 'cf-op6',
        cashFlowExplanation: '其他经营活动现金支出——支付其他与经营活动有关的现金。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '银行回单',
        date: '2026-01-03',
        totalAmount: 120000,
        payer: '鼎立建筑工程有限公司',
        payeeName: '鑫源租赁有限公司',
        content: '办公用房全年租金',
        refNo: 'ZF202601030001',

      payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 9876 5432 1098 765'
      }
    ]
  },
  {
    date: '2026-01-04',
    role: 'accountant',
    title: '购买办公设备',
    tags: [
      '资金管理'
    ],
    difficulty: 1,
    description: '购置办公电脑6台、打印机等办公设备，共计36,000元，转账支付。',
    tip: '办公设备单价较高且使用年限超过一年，应确认为固定资产，次月开始计提折旧。',
    entries: [
      {
        subjectCode: '1601',
        debit: 36000,
        credit: 0,
        summary: '购入办公设备',
        explanation: '固定资产增加。办公设备作为固定资产入账，后续按月计提折旧。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 36000,
        summary: '支付办公设备款',
        explanation: '银行存款减少36,000元。',
        cashFlowItem: 'cf-inv',
        cashFlowExplanation: '购建固定资产支付的现金——投资活动现金流出。'
      }
    ],
    documents: [
      {
        type: 'invoice',
        label: '增值税普通发票',
        date: '2026-01-04',
        region: '江苏省',
        invoiceNo: '3200260104',
        buyer: '鼎立建筑工程有限公司',
        seller: 'XX科技有限公司',
        lineItems: [
          {
            name: '联想台式电脑',
            qty: 6,
            unit: '台',
            price: 5000,
            amount: 30000
          },
          {
            name: '打印机',
            qty: 1,
            unit: '台',
            price: 6000,
            amount: 6000
          }
        ],
        totalAmount: 36000,
      taxRate: 0.09,
        taxAmount: 2972,
        amountCN: '叁万陆仟元整'
      }
    ]
  },
  {
    date: '2026-01-05',
    role: 'accountant',
    title: '办理资质证照等开办费',
    tags: [
      '资金管理'
    ],
    difficulty: 1,
    description: '支付公司注册登记费、建筑业资质办理费、公章刻制等开办费用，共计8,500元。',
    tip: '筹建期间发生的开办费，直接计入"管理费用-开办费"。',
    entries: [
      {
        subjectCode: '660217',
        debit: 8500,
        credit: 0,
        summary: '支付开办费用',
        explanation: '管理费用增加。开办费作为企业筹建期间的支出计入当期管理费用。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 8500,
        summary: '支付开办费',
        explanation: '银行存款减少8,500元。',
        cashFlowItem: 'cf-op6',
        cashFlowExplanation: '其他经营活动现金支出。'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '行政事业性收费票据',
        date: '2026-01-05',
        totalAmount: 8500,
        items: [
          {
            name: '工商注册费',
            amount: 2000
          },
          {
            name: '建筑业资质办理费',
            amount: 5000
          },
          {
            name: '公章刻制等杂费',
            amount: 1500
          }
        ],
        stampText: 'XX市市场监督管理局\n收费专用章'
      }
    ]
  },
  {
    date: '2026-01-06',
    role: 'accountant',
    title: '提取备用金',
    tags: [
      '资金管理'
    ],
    difficulty: 1,
    description: '出纳从银行提取备用金30,000元，用于日常零星开支。',
    tip: '提取备用金借记"库存现金"，贷记"银行存款"。备用金实行定额管理。',
    entries: [
      {
        subjectCode: '1001',
        debit: 30000,
        credit: 0,
        summary: '提取备用金',
        explanation: '库存现金增加。备用金用于日常零星小额支出。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 30000,
        summary: '提取备用金',
        explanation: '银行存款减少30,000元。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '现金支票存根',
        date: '2026-01-06',
        totalAmount: 30000,
        payer: '鼎立建筑工程有限公司',
        payeeName: '鼎立建筑工程有限公司',
        content: '备用金',
        refNo: 'XJ202601060001',

      payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 9876 5432 1098 765'
      }
    ]
  },
  {
    date: '2026-01-07',
    role: 'accountant',
    title: '短期借款',
    tags: [
      '资金管理'
    ],
    difficulty: 1,
    description: '为补充流动资金，向工商银行申请短期借款100万元，年利率4.35%，期限6个月，款项已到账。',
    tip: '收到短期借款借记"银行存款"，贷记"短期借款"。短期借款属于流动负债。',
    entries: [
      {
        subjectCode: '100201',
        debit: 1000000,
        credit: 0,
        summary: '收到短期借款',
        explanation: '银行存款增加100万元。',
        cashFlowItem: 'cf-fin',
        cashFlowExplanation: '借款收到的现金——筹资活动现金流入。'
      },
      {
        subjectCode: '2001',
        debit: 0,
        credit: 1000000,
        summary: '短期借款增加',
        explanation: '短期借款增加，形成对银行的负债。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '银行回单',
        date: '2026-01-07',
        totalAmount: 1000000,
        payer: '工商银行',
        payeeName: '鼎立建筑工程有限公司',
        content: '短期借款放款',
        refNo: 'DK202601070001',

      payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 9876 5432 1098 765'
      }
    ]
  },
  {
    date: '2026-01-08',
    role: 'accountant',
    title: '购买招标文件',
    tags: [
      '工程合同'
    ],
    difficulty: 1,
    description: '为参与恒达地产办公楼工程投标，购买招标文件，支付工本费1,000元。',
    tip: '购买招标文件费用计入"管理费用-投标费"。',
    entries: [
      {
        subjectCode: '660217',
        debit: 1000,
        credit: 0,
        summary: '购买恒达项目招标文件',
        explanation: '管理费用增加。投标费用是经营过程中的必要支出。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 1000,
        summary: '支付招标文件费',
        explanation: '银行存款减少1,000元。',
        cashFlowItem: 'cf-op6',
        cashFlowExplanation: '其他经营活动现金支出。'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '收据',
        date: '2026-01-08',
        totalAmount: 1000,
        items: [
          {
            name: '恒达地产办公楼工程招标文件',
            qty: 1,
            price: 1000,
            amount: 1000
          }
        ],
        stampText: 'XX招标代理有限公司\n财务专用章'
      }
    ]
  },
  {
    date: '2026-01-09',
    role: 'accountant',
    title: '缴纳投标保证金',
    tags: [
      '资金管理'
    ],
    difficulty: 1,
    description: '按规定缴纳投标保证金50,000元，转账支付，待开标后未中标则退回。',
    tip: '投标保证金通过"其他应收款"核算，退回时冲销。',
    entries: [
      {
        subjectCode: '1221',
        debit: 50000,
        credit: 0,
        summary: '投标保证金',
        explanation: '其他应收款增加。投标保证金是临时性债权，后续收回。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 50000,
        summary: '支付投标保证金',
        explanation: '银行存款减少50,000元。',
        cashFlowItem: 'cf-op6',
        cashFlowExplanation: '其他经营活动现金支出。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '电汇凭证',
        date: '2026-01-09',
        totalAmount: 50000,
        payer: '鼎立建筑工程有限公司',
        payeeName: 'XX招标代理有限公司',
        content: '恒达项目投标保证金',
        refNo: 'BZ202601090001',

      payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 9876 5432 1098 765'
      }
    ]
  },
  {
    date: '2026-01-10',
    role: 'accountant',
    title: '中标恒达地产办公楼工程',
    tags: [
      '工程合同'
    ],
    difficulty: 1,
    description: '公司成功中标恒达地产办公楼建设工程，合同总价500万元（不含税），增值税9%。支付招标代理服务费15,000元。投标保证金暂未退回（转为履约保证金）。',
    tip: '中标后支付的招标代理服务费计入管理费用。投标保证金转为履约保证金的，继续挂在其他应收款。',
    entries: [
      {
        subjectCode: '660215',
        debit: 15000,
        credit: 0,
        summary: '支付招标代理服务费',
        explanation: '管理费用增加。中标服务费作为项目承接费用计入当期损益。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 15000,
        summary: '支付代理服务费',
        explanation: '银行存款减少15,000元。',
        cashFlowItem: 'cf-op6',
        cashFlowExplanation: '其他经营活动现金支出。'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '招标代理服务费发票',
        date: '2026-01-10',
        totalAmount: 15000,
        items: [
          {
            name: '恒达项目招标代理服务费',
            qty: 1,
            price: 15000,
            amount: 15000
          }
        ],
        stampText: 'XX招标代理有限公司\n发票专用章'
      }
    ]
  },
  {
    date: '2026-01-11',
    role: 'accountant',
    title: '签订施工合同并缴纳印花税',
    tags: [
      '税费'
    ],
    difficulty: 1,
    description: '与恒达地产正式签订办公楼建设工程施工合同，合同总价500万元。按规定缴纳建筑安装工程承包合同印花税（税率0.03%），应缴1,500元。',
    tip: '合同印花税直接计入"税金及附加"。建筑安装工程承包合同印花税税率为0.03%。',
    entries: [
      {
        subjectCode: '6403',
        debit: 1500,
        credit: 0,
        summary: '缴纳合同印花税（500万×0.03%）',
        explanation: '税金及附加增加。印花税作为合同签订时的税费计入当期损益。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 1500,
        summary: '支付印花税',
        explanation: '银行存款减少1,500元。',
        cashFlowItem: 'cf-op4',
        cashFlowExplanation: '缴纳税费支出。'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '印花税票',
        date: '2026-01-11',
        totalAmount: 1500,
        items: [
          {
            name: '建筑施工合同印花税（0.03%）',
            amount: 1500
          }
        ],
        stampText: '国家税务总局\n印花税票'
      }
    ]
  },
  {
    date: '2026-01-13',
    role: 'accountant',
    title: '收到预收工程款',
    tags: [
      '工程合同'
    ],
    difficulty: 1,
    description: '按合同约定收到恒达地产预付工程款150万元（合同价500万元的30%），存入工商银行。',
    tip: '收到预收工程款借记"银行存款"，贷记"合同负债"。合同负债是新收入准则下预收款项的核算科目。',
    entries: [
      {
        subjectCode: '100201',
        debit: 1500000,
        credit: 0,
        summary: '收到恒达地产预付工程款',
        explanation: '银行存款增加150万元。',
        cashFlowItem: 'cf-op5',
        cashFlowExplanation: '收到其他与经营活动有关的现金——预收工程款。'
      },
      {
        subjectCode: '2205',
        debit: 0,
        credit: 1500000,
        summary: '合同负债-恒达地产',
        explanation: '合同负债核算已收款但尚未履约的义务。待工程进度确认后转入收入。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '银行回单',
        date: '2026-01-13',
        totalAmount: 1500000,
        payer: '恒达地产有限公司',
        payeeName: '鼎立建筑工程有限公司',
        content: '办公楼工程预付款',
        refNo: 'HD202601130001',

      payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 9876 5432 1098 765'
      }
    ]
  },
  {
    date: '2026-01-14',
    role: 'accountant',
    title: '预缴增值税及附加税费',
    tags: [
      '税费'
    ],
    difficulty: 2,
    description: '收到预收工程款150万元后，按规定预缴增值税（一般计税项目预征率2%）30,000元。城建税2,100元（7%），教育费附加900元（3%），地方教育附加600元（2%），合计33,600元。',
    tip: '建筑业收到预收款需按2%预征率预缴增值税。预缴税款在申报时抵减应纳税额。注意：预征率2%≠实际税率9%。',
    entries: [
      {
        subjectCode: '222101',
        debit: 30000,
        credit: 0,
        summary: '预缴增值税（150万×2%）',
        explanation: '应交增值税借方反映预缴税额，可在申报时抵减。'
      },
      {
        subjectCode: '222103',
        debit: 2100,
        credit: 0,
        summary: '城建税（30,000×7%）',
        explanation: '城建税按实际预缴增值税的7%计算。'
      },
      {
        subjectCode: '222104',
        debit: 1500,
        credit: 0,
        summary: '教育费附加3%+地方教育附加2%',
        explanation: '教育费附加3%（900元），地方教育附加2%（600元）。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 33600,
        summary: '缴纳税费',
        explanation: '银行存款减少33,600元。',
        cashFlowItem: 'cf-op4',
        cashFlowExplanation: '缴纳税费支出。'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '电子缴税凭证',
        date: '2026-01-14',
        totalAmount: 33600,
        items: [
          {
            name: '增值税（预征2%）',
            amount: 30000
          },
          {
            name: '城建税7%',
            amount: 2100
          },
          {
            name: '教育费附加3%',
            amount: 900
          },
          {
            name: '地方教育附加2%',
            amount: 600
          }
        ],
        stampText: '国家税务总局电子缴税专用章'
      }
    ]
  },
  {
    date: '2026-01-15',
    role: 'accountant',
    title: '采购施工机械',
    tags: [
      '工程成本'
    ],
    difficulty: 2,
    description: '购入搅拌机2台、钢筋切割机1台、振捣器3台等施工机械，总价款120,000元，增值税15,600元，合计135,600元，转账支付。',
    tip: '施工机械作为固定资产入账，次月开始计提折旧。折旧费按项目使用情况分配计入合同履约成本-机械使用费。',
    entries: [
      {
        subjectCode: '1601',
        debit: 120000,
        credit: 0,
        summary: '购入施工机械',
        explanation: '固定资产增加。施工机械作为固定资产管理。'
      },
      {
        subjectCode: '222101',
        debit: 15600,
        credit: 0,
        summary: '增值税进项税额',
        explanation: '取得增值税专用发票，进项税额可抵扣。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 135600,
        summary: '支付施工机械款',
        explanation: '银行存款减少135,600元。',
        cashFlowItem: 'cf-inv',
        cashFlowExplanation: '购建固定资产支付的现金——投资活动现金流出。'
      }
    ],
    documents: [
      {
        type: 'invoice',
        label: '增值税专用发票',
        date: '2026-01-15',
        region: '江苏省',
        invoiceNo: '3200260115',
        buyer: '鼎立建筑工程有限公司',
        seller: 'XX工程机械有限公司',
        lineItems: [
          {
            name: '搅拌机JS500',
            qty: 2,
            unit: '台',
            price: 35000,
            amount: 70000
          },
          {
            name: '钢筋切割机',
            qty: 1,
            unit: '台',
            price: 25000,
            amount: 25000
          },
          {
            name: '振捣器',
            qty: 3,
            unit: '台',
            price: 3500,
            amount: 10500
          },
          {
            name: '配件一批',
            qty: 1,
            unit: '批',
            price: 14500,
            amount: 14500
          }
        ],
        totalAmount: 135600,
      taxRate: 0.09,
        taxAmount: 11196,
        amountCN: '壹拾叁万伍仟陆佰元整'
      }
    ]
  },
  {
    date: '2026-01-16',
    role: 'accountant',
    title: '租赁塔吊并预付租金',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '租赁塔吊一台用于办公楼工程施工，租赁期6个月，月租金15,000元。按合同约定预付3个月租金45,000元。',
    tip: '预付租赁费先计入"预付账款"，后续按月摊销计入合同履约成本-机械使用费。',
    entries: [
      {
        subjectCode: '1123',
        debit: 45000,
        credit: 0,
        summary: '预付塔吊租金（3个月）',
        explanation: '预付账款增加45,000元。预付款项待后续逐月摊销。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 45000,
        summary: '支付预付塔吊租金',
        explanation: '银行存款减少45,000元。',
        cashFlowItem: 'cf-op6',
        cashFlowExplanation: '其他经营活动现金支出。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '银行回单',
        date: '2026-01-16',
        totalAmount: 45000,
        payer: '鼎立建筑工程有限公司',
        payeeName: 'XX机械设备租赁公司',
        content: '塔吊预付租金（3个月）',
        refNo: 'ZF202601160001',

      payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 9876 5432 1098 765'
      }
    ]
  },
  {
    date: '2026-01-17',
    role: 'accountant',
    title: '采购首批工程材料（钢材）',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '采购首批建筑工程用钢材50吨，价款200,000元，增值税26,000元，合计226,000元，款项暂未支付。',
    tip: '建筑业采购工程材料直接记入"合同履约成本-材料成本"，不经过原材料科目。工程材料到货后直接用于施工。',
    entries: [
      {
        subjectCode: '540102',
        debit: 200000,
        credit: 0,
        summary: '购入钢材（基础工程用）',
        explanation: '合同履约成本-材料成本增加。工程材料直接计入项目成本。'
      },
      {
        subjectCode: '222101',
        debit: 26000,
        credit: 0,
        summary: '增值税进项税额（20万×13%）',
        explanation: '进项税额26,000元，取得专用发票可抵扣。'
      },
      {
        subjectCode: '2202',
        debit: 0,
        credit: 226000,
        summary: '应付账款-华强建材',
        explanation: '材料款未付，形成对供应商的负债。'
      }
    ],
    documents: [
      {
        type: 'invoice',
        label: '增值税专用发票',
        date: '2026-01-17',
        region: '江苏省',
        invoiceNo: '3200260117',
        buyer: '鼎立建筑工程有限公司',
        seller: '华强建材有限公司',
        lineItems: [
          {
            name: '螺纹钢 Φ25mm',
            qty: 40,
            unit: '吨',
            price: 4000,
            amount: 160000
          },
          {
            name: '盘螺 Φ8mm',
            qty: 10,
            unit: '吨',
            price: 4000,
            amount: 40000
          }
        ],
        totalAmount: 226000,
      taxRate: 0.09,
        taxAmount: 18661,
        amountCN: '贰拾贰万陆仟元整'
      },
      {
        type: 'text',
        label: '材料进场验收单',
        date: '2026-01-17',
        docTitle: '工程材料进场验收单',
        content: '供应商：华强建材\n到货日期：2026-01-17\n螺纹钢40吨、盘螺10吨，合计50吨\n验收结论：合格 ✓\n验收人：陈质检',
        headers: [
          '项目',
          '内容'
        ],
        rows: [
          [
            '供应商',
            '华强建材'
          ],
          [
            '到货日期',
            '2026-01-17'
          ],
          [
            '验收结论',
            '合格 ✓'
          ],
          [
            '验收人',
            '陈质检'
          ],
        ],
      }
    ]
  },
  {
    date: '2026-01-17',
    role: 'accountant',
    title: '采购水泥砂石',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '采购水泥200吨、砂石300方，价款90,000元，增值税11,700元，合计101,700元，转账支付。',
    tip: '水泥砂石采购成本直接计入"合同履约成本-材料成本"。注意：不同材料品种应分开核算。',
    entries: [
      {
        subjectCode: '540102',
        debit: 90000,
        credit: 0,
        summary: '购入水泥砂石',
        explanation: '合同履约成本-材料成本增加。水泥砂石是基础施工的重要材料。'
      },
      {
        subjectCode: '222101',
        debit: 11700,
        credit: 0,
        summary: '增值税进项税额',
        explanation: '进项税额11,700元可抵扣。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 101700,
        summary: '支付水泥砂石款',
        explanation: '银行存款减少101,700元。',
        cashFlowItem: 'cf-op2',
        cashFlowExplanation: '购买商品接受劳务支付的现金。'
      }
    ],
    documents: [
      {
        type: 'invoice',
        label: '增值税专用发票',
        date: '2026-01-17',
        region: '江苏省',
        invoiceNo: '3200260118',
        buyer: '鼎立建筑工程有限公司',
        seller: 'XX建材经营部',
        lineItems: [
          {
            name: '水泥P.O42.5',
            qty: 200,
            unit: '吨',
            price: 350,
            amount: 70000
          },
          {
            name: '砂石料',
            qty: 300,
            unit: '方',
            price: 100,
            amount: 30000
          }
        ],
        totalAmount: 101700,
      taxRate: 0.09,
        taxAmount: 8397,
        amountCN: '壹拾万壹仟柒佰元整'
      }
    ]
  },
  {
    date: '2026-01-18',
    role: 'accountant',
    title: '施工领料登记（基础施工）',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '基础工程施工领用：钢材30吨（120,000元）、水泥80吨（28,000元）、砂石120方（12,000元），合计160,000元。由于建筑业材料采购时已直接计入合同履约成本-材料成本，领用时无需再做分录，但需在备查簿登记材料使用台账。',
    tip: '建筑业材料在采购时直接计入工程成本，领用时无需重复做分录。但需做好材料领用台账便于项目成本分析。',
    entries: [],
    documents: [
      {
        type: 'text',
        label: '领料单',
        date: '2026-01-18',
        docTitle: '施 工 领 料 单',
        content: '工程项目：恒达地产办公楼\n领料部门：基础施工队\n\n材料明细：\n  螺纹钢 Φ25mm：30吨 计120,000元\n  水泥P.O42.5：80吨 计28,000元\n  砂石：120方 计12,000元\n  合计：160,000元\n\n领料人：张队长\n发料人：刘保管',
        headers: [
          '项目',
          '金额/说明'
        ],
        rows: [
          [
            '工程项目',
            '恒达地产办公楼'
          ],
          [
            '领料部门',
            '基础施工队'
          ],
          [
            '螺纹钢 Φ25mm',
            '30吨 计120,000元'
          ],
          [
            '水泥P.O42.5',
            '80吨 计28,000元'
          ],
          [
            '砂石',
            '120方 计12,000元'
          ],
          [
            '合计',
            '160,000元'
          ],
          [
            '领料人',
            '张队长'
          ],
          [
            '发料人',
            '刘保管'
          ],
        ],
      }
    ]
  },
  {
    date: '2026-01-20',
    role: 'accountant',
    title: '搭建临时设施',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '在施工现场搭建临时办公室、工人宿舍及材料仓库等临时设施，发生费用60,000元。',
    tip: '临时设施是建筑业特有资产。搭建时先通过"长期待摊费用"归集，使用期间按月摊销。',
    entries: [
      {
        subjectCode: '1801',
        debit: 60000,
        credit: 0,
        summary: '搭建施工现场临时设施',
        explanation: '长期待摊费用增加。临时设施先归集入账，后续在施工期间摊销。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 60000,
        summary: '支付临时设施费用',
        explanation: '银行存款减少60,000元。'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '临时设施费用明细',
        date: '2026-01-20',
        totalAmount: 60000,
        items: [
          {
            name: '活动板房采购',
            amount: 40000
          },
          {
            name: '临时水电安装',
            amount: 12000
          },
          {
            name: '场地平整费',
            amount: 8000
          }
        ],
        stampText: 'XX临建工程有限公司\n发票专用章'
      }
    ]
  },
  {
    date: '2026-01-21',
    role: 'accountant',
    title: '支付工程保险费',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '为恒达办公楼工程投保建筑工程一切险，支付保费12,000元，保障期限一年。',
    tip: '工程保险费用直接计入"合同履约成本-其他直接费用"。建筑工程一切险是施工企业常见的险种。',
    entries: [
      {
        subjectCode: '540105',
        debit: 12000,
        credit: 0,
        summary: '支付工程一切险保费',
        explanation: '合同履约成本-其他直接费增加。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 12000,
        summary: '支付保险费',
        explanation: '银行存款减少12,000元。',
        cashFlowItem: 'cf-op6',
        cashFlowExplanation: '其他经营活动现金支出。'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '保险单及发票',
        date: '2026-01-21',
        totalAmount: 12000,
        items: [
          {
            name: '建筑工程一切险 保单号BX2026001',
            amount: 12000
          }
        ],
        stampText: 'XX财产保险公司\n承保专用章'
      }
    ]
  },
  {
    date: '2026-01-22',
    role: 'accountant',
    title: '支付工程水电费',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '支付施工现场1月水电费：水费2,500元，电费8,500元，合计11,000元。',
    tip: '施工现场水电费计入"合同履约成本-其他直接费用"。注意与办公水电费区分。',
    entries: [
      {
        subjectCode: '540105',
        debit: 11000,
        credit: 0,
        summary: '支付施工现场水电费',
        explanation: '合同履约成本-其他直接费增加。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 11000,
        summary: '支付水电费',
        explanation: '银行存款减少11,000元。',
        cashFlowItem: 'cf-op6',
        cashFlowExplanation: '其他经营活动现金支出。'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '水电费缴费单',
        date: '2026-01-22',
        totalAmount: 11000,
        items: [
          {
            name: '施工用电 8,500kWh',
            amount: 8500
          },
          {
            name: '施工用水 500吨',
            amount: 2500
          }
        ],
        stampText: '供电局/自来水公司'
      }
    ]
  },
  {
    date: '2026-01-23',
    role: 'accountant',
    title: '计提1月职工薪酬',
    tags: [
      '工资社保'
    ],
    difficulty: 2,
    description: '计提1月职工薪酬：施工人员（基础施工队）工资80,000元，项目部管理人员工资30,000元，公司行政管理人员工资25,000元，合计135,000元。',
    tip: '直接施工人员工资记入"合同履约成本-人工成本"，项目部管理人员工资记入"间接费用"，公司管理人员工资记入"管理费用"。',
    entries: [
      {
        subjectCode: '540101',
        debit: 80000,
        credit: 0,
        summary: '施工人员工资',
        explanation: '直接人工计入合同履约成本-人工成本。'
      },
      {
        subjectCode: '540106',
        debit: 30000,
        credit: 0,
        summary: '项目部管理人员工资',
        explanation: '项目部管理工资属于间接费用，先归集再分配。'
      },
      {
        subjectCode: '660203',
        debit: 25000,
        credit: 0,
        summary: '公司管理人员工资',
        explanation: '行政管理人员工资计入管理费用。'
      },
      {
        subjectCode: '221101',
        debit: 0,
        credit: 135000,
        summary: '应付职工薪酬-工资',
        explanation: '应付职工薪酬增加，形成对职工的负债。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '工资计算表',
        date: '2026-01-23',
        docTitle: '2026年1月职工工资计提表',
        content: '期间：2026年1月\n\n人员明细：\n  施工人员（15人）：80,000元\n    - 基础施工队15人，月均工资5,333元\n  项目部管理人员（5人）：30,000元\n    - 项目经理1人8,000，技术员2人各5,000，安全员2人各6,000\n  公司管理人员（4人）：25,000元\n    - 总经理1人10,000，财务2人各5,000，行政1人5,000\n\n费用分配：\n  合同履约成本-人工成本（施工人员）：80,000元\n  间接费用（项目部管理）：30,000元\n  管理费用（公司管理）：25,000元\n\n工资总额：135,000元\n\n制表：王人事\n审核：李会计',
        headers: [
          '项目',
          '金额/说明'
        ],
        rows: [
          [
            '期间',
            '2026年1月'
          ],
          [
            '施工人员（15人）',
            '80,000元'
          ],
          [
            '项目部管理人员（5人）',
            '30,000元'
          ],
          [
            '公司管理人员（4人）',
            '25,000元'
          ],
          [
            '合同履约成本-人工成本（施工人员）',
            '80,000元'
          ],
          [
            '间接费用（项目部管理）',
            '30,000元'
          ],
          [
            '管理费用（公司管理）',
            '25,000元'
          ],
          [
            '工资总额',
            '135,000元'
          ],
          [
            '制表',
            '王人事'
          ],
          [
            '审核',
            '李会计'
          ],
        ],
      }
    ]
  },
  {
    date: '2026-01-23',
    role: 'accountant',
    title: '计提1月社保及公积金',
    tags: [
      '工资社保'
    ],
    difficulty: 2,
    description: '计提1月企业应承担的社保及公积金。社保费率合计24.7%（养老16%+医疗8%+失业0.5%+工伤0.2%），公积金费率12%。按工资归属分配计入各成本科目。',
    tip: '社保和公积金按受益对象与工资同路径分配。注意：这里计提的是企业承担部分。',
    entries: [
      {
        subjectCode: '540101',
        debit: 29360,
        credit: 0,
        summary: '施工人员社保19,760+公积金9,600',
        explanation: '80,000×(24.7%+12%)=29,360元。'
      },
      {
        subjectCode: '540106',
        debit: 11010,
        credit: 0,
        summary: '项目部社保7,410+公积金3,600',
        explanation: '30,000×(24.7%+12%)=11,010元。'
      },
      {
        subjectCode: '660212',
        debit: 9175,
        credit: 0,
        summary: '公司管理社保6,175+公积金3,000',
        explanation: '25,000×(24.7%+12%)=9,175元。'
      },
      {
        subjectCode: '221102',
        debit: 0,
        credit: 33345,
        summary: '应付职工薪酬-社保（135K×24.7%）',
        explanation: '社保企业部分合计33,345元。'
      },
      {
        subjectCode: '221103',
        debit: 0,
        credit: 16200,
        summary: '应付职工薪酬-公积金（135K×12%）',
        explanation: '公积金企业部分合计16,200元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '社保公积金计提表',
        date: '2026-01-23',
        docTitle: '2026年1月社保公积金计提明细表',
        content: '期间：2026年1月\n\n社保费率（企业部分）：\n  养老保险：16.0%\n  医疗保险：8.0%\n  失业保险：0.5%\n  工伤保险：0.2%\n  社保合计：24.7%\n  公积金：12.0%\n  总费率：36.7%\n\n分配明细：\n  施工人员（15人）：工资80,000×36.7% = 29,360元\n  项目部管理（5人）：工资30,000×36.7% = 11,010元\n  公司管理（4人）：工资25,000×36.7% = 9,175元\n  合计：49,545元\n\n其中：社保33,345元，公积金16,200元\n\n制表：赵会计\n审核：李会计',
        headers: [
          '项目',
          '金额/说明'
        ],
        rows: [
          [
            '期间',
            '2026年1月'
          ],
          [
            '养老保险',
            '16.0%'
          ],
          [
            '医疗保险',
            '8.0%'
          ],
          [
            '失业保险',
            '0.5%'
          ],
          [
            '工伤保险',
            '0.2%'
          ],
          [
            '社保合计',
            '24.7%'
          ],
          [
            '公积金',
            '12.0%'
          ],
          [
            '总费率',
            '36.7%'
          ],
          [
            '施工人员（15人）',
            '工资80,000×36.7% = 29,360元'
          ],
          [
            '项目部管理（5人）',
            '工资30,000×36.7% = 11,010元'
          ],
          [
            '公司管理（4人）',
            '工资25,000×36.7% = 9,175元'
          ],
          [
            '合计',
            '49,545元'
          ],
          [
            '其中',
            '社保33,345元，公积金16,200元'
          ],
          [
            '制表',
            '赵会计'
          ],
          [
            '审核',
            '李会计'
          ],
        ],
      }
    ]
  },
  {
    date: '2026-01-24',
    role: 'accountant',
    title: '计提固定资产折旧',
    tags: [
      '工程成本'
    ],
    difficulty: 2,
    description: '计提1月固定资产折旧。办公设备（原值36,000元，5年）月折600元；施工机械（原值120,000元，8年）月折1,250元，合计1,850元。',
    tip: '施工机械折旧计入"合同履约成本-机械使用费"，办公设备折旧计入"管理费用"。注意：当月新增的固定资产下月才计提折旧，此例为教学简化。',
    entries: [
      {
        subjectCode: '540104',
        debit: 1250,
        credit: 0,
        summary: '施工机械折旧',
        explanation: '合同履约成本-机械使用费增加。'
      },
      {
        subjectCode: '660205',
        debit: 600,
        credit: 0,
        summary: '办公设备折旧',
        explanation: '管理费用增加。'
      },
      {
        subjectCode: '1602',
        debit: 0,
        credit: 1850,
        summary: '计提固定资产折旧',
        explanation: '累计折旧增加1,850元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '折旧计算表',
        date: '2026-01-24',
        docTitle: '2026年1月固定资产折旧计算表',
        content: '期间：2026年1月\n\n固定资产明细：\n  1. 办公设备（电脑6台、打印机等）\n     原值：36,000元\n     折旧年限：5年（60个月）\n     月折旧额：36,000 ÷ 60 = 600元\n     费用归属：管理费用\n\n  2. 施工机械（搅拌机2台、切割机1台、振捣器3台）\n     原值：120,000元\n     折旧年限：8年（96个月）\n     月折旧额：120,000 ÷ 96 = 1,250元\n     费用归属：合同履约成本-机械使用费\n\n折旧费用分配：\n  管理费用：600元\n  合同履约成本-机械使用费：1,250元\n  合计：1,850元\n\n制表：赵会计\n审核：李会计',
        headers: [
          '项目',
          '金额/说明'
        ],
        rows: [
          [
            '期间',
            '2026年1月'
          ],
          [
            '原值',
            '36,000元'
          ],
          [
            '折旧年限',
            '5年（60个月）'
          ],
          [
            '月折旧额',
            '36,000 ÷ 60 = 600元'
          ],
          [
            '费用归属',
            '管理费用'
          ],
          [
            '原值',
            '120,000元'
          ],
          [
            '折旧年限',
            '8年（96个月）'
          ],
          [
            '月折旧额',
            '120,000 ÷ 96 = 1,250元'
          ],
          [
            '费用归属',
            '合同履约成本-机械使用费'
          ],
          [
            '管理费用',
            '600元'
          ],
          [
            '合同履约成本-机械使用费',
            '1,250元'
          ],
          [
            '合计',
            '1,850元'
          ],
          [
            '制表',
            '赵会计'
          ],
          [
            '审核',
            '李会计'
          ],
        ],
      }
    ]
  },
  {
    date: '2026-01-24',
    role: 'accountant',
    title: '摊销临时设施',
    tags: [
      '工程成本'
    ],
    difficulty: 2,
    description: '本月摊销临时设施费用5,000元（临时设施原值60,000元，预计使用12个月）。',
    tip: '临时设施摊销计入"合同履约成本-其他直接费用"。摊销方法参照固定资产折旧。',
    entries: [
      {
        subjectCode: '540105',
        debit: 5000,
        credit: 0,
        summary: '临时设施摊销',
        explanation: '合同履约成本-其他直接费增加。'
      },
      {
        subjectCode: '1801',
        debit: 0,
        credit: 5000,
        summary: '临时设施摊销减少',
        explanation: '长期待摊费用减少，反映临时设施的价值消耗。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '摊销计算表',
        date: '2026-01-24',
        docTitle: '临 时 设 施 摊 销 计 算 表',
        content: '期间：2026年1月\n资产项目：施工现场临时设施（活动板房、料棚等）\n\n摊销计算：\n  原值：60,000元\n  使用期限：12个月\n  月摊销额：60,000 ÷ 12 = 5,000元\n  本月摊销：5,000元\n  累计摊销：5,000元\n  账面净值：55,000元\n\n制表：赵会计\n审核：李会计',
        headers: [
          '项目',
          '金额/说明'
        ],
        rows: [
          [
            '期间',
            '2026年1月'
          ],
          [
            '资产项目',
            '施工现场临时设施（活动板房、料棚等）'
          ],
          [
            '原值',
            '60,000元'
          ],
          [
            '使用期限',
            '12个月'
          ],
          [
            '月摊销额',
            '60,000 ÷ 12 = 5,000元'
          ],
          [
            '本月摊销',
            '5,000元'
          ],
          [
            '累计摊销',
            '5,000元'
          ],
          [
            '账面净值',
            '55,000元'
          ],
          [
            '制表',
            '赵会计'
          ],
          [
            '审核',
            '李会计'
          ],
        ],
      }
    ]
  },
  {
    date: '2026-01-25',
    role: 'accountant',
    title: '摊销预付租金',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '本月摊销预付的办公用房租金10,000元（已预付全年120,000元，按月摊销）。',
    tip: '预付租金摊销计入"管理费用"。',
    entries: [
      {
        subjectCode: '660206',
        debit: 10000,
        credit: 0,
        summary: '摊销1月办公房租',
        explanation: '管理费用增加。预付租金按月摊销。'
      },
      {
        subjectCode: '1123',
        debit: 0,
        credit: 10000,
        summary: '预付房租摊销',
        explanation: '预付账款减少10,000元，剩余预付账款110,000元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '摊销计算表',
        date: '2026-01-25',
        docTitle: '办 公 用 房 租 金 摊 销 表',
        content: '期间：2026年1月\n费用项目：XX大厦写字楼办公用房租金\n\n摊销计算：\n  预付全年租金：120,000元\n  租赁期限：12个月\n  月摊销额：120,000 ÷ 12 = 10,000元\n  本月摊销：10,000元\n  累计摊销：10,000元\n  剩余待摊：110,000元\n\n制表：赵会计\n审核：李会计',
        headers: [
          '项目',
          '金额/说明'
        ],
        rows: [
          [
            '期间',
            '2026年1月'
          ],
          [
            '费用项目',
            'XX大厦写字楼办公用房租金'
          ],
          [
            '预付全年租金',
            '120,000元'
          ],
          [
            '租赁期限',
            '12个月'
          ],
          [
            '月摊销额',
            '120,000 ÷ 12 = 10,000元'
          ],
          [
            '本月摊销',
            '10,000元'
          ],
          [
            '累计摊销',
            '10,000元'
          ],
          [
            '剩余待摊',
            '110,000元'
          ],
          [
            '制表',
            '赵会计'
          ],
          [
            '审核',
            '李会计'
          ],
        ],
      }
    ]
  },
  {
    date: '2026-01-27',
    role: 'accountant',
    title: '间接费用归集与分摊',
    tags: [
      '工程成本'
    ],
    difficulty: 3,
    description: '本月项目部间接费用：项目部管理人员工资30,000元+项目部社保公积金11,010元=41,010元。按各项目直接人工比例分摊至恒达办公楼项目（本月唯一在建项目）。',
    tip: '间接费用每月末归集后，按合理标准分摊至各在建项目。单项目时全部分配。',
    entries: [
      {
        subjectCode: '540101',
        debit: 41010,
        credit: 0,
        summary: '间接费用转入恒达项目人工成本',
        explanation: '间接费用全部分配至恒达项目，计入合同履约成本-人工成本。'
      },
      {
        subjectCode: '540106',
        debit: 0,
        credit: 41010,
        summary: '间接费用分配转出',
        explanation: '间接费用减少归零。全部成本已分配至项目。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '间接费用分配表',
        date: '2026-01-27',
        docTitle: '间接费用分配表',
        content: '待分配间接费用：41,010元\n分配标准：直接人工\n恒达项目：直接人工80,000元，占比100%\n分配金额：41,010元\n分配后余额：0元 ✓',
        headers: [
          '项目',
          '金额/说明'
        ],
        rows: [
          [
            '待分配间接费用',
            '41,010元'
          ],
          [
            '分配标准',
            '直接人工'
          ],
          [
            '恒达项目',
            '直接人工80,000元，占比100%'
          ],
          [
            '分配金额',
            '41,010元'
          ],
          [
            '分配后余额',
            '0元 ✓'
          ],
        ],
        signature: '李会计'
      }
    ]
  },
  {
    date: '2026-01-28',
    role: 'accountant',
    title: '确认工程进度确认收入（完工百分比法）',
    tags: [
      '工程合同'
    ],
    difficulty: 3,
    description: '经监理确认，恒达办公楼工程本月完成基础施工，完工进度为15%。按完工百分比法确认收入：合同总收入500万元×15%=750,000元（不含税），增值税销项税额67,500元。冲减合同负债。',
    tip: '按完工百分比确认收入：冲减合同负债，确认主营业务收入和应交增值税。预收款收到的现金不属于收入，按进度确认的才是收入。',
    entries: [
      {
        subjectCode: '2205',
        debit: 750000,
        credit: 0,
        summary: '合同负债冲减转收入',
        explanation: '合同负债减少75万元，预收款项按进度转入收入。'
      },
      {
        subjectCode: '222101',
        debit: 0,
        credit: 67500,
        summary: '增值税销项税额（75万×9%）',
        explanation: '确认增值税纳税义务。'
      },
      {
        subjectCode: '6001',
        debit: 0,
        credit: 682500,
        summary: '确认主营业务收入（不含税）',
        explanation: '不含税收入682,500元。'
      }
    ],
    documents: [
      {
        type: 'invoice',
        label: '增值税专用发票',
        date: '2026-01-28',
        region: '江苏省',
        invoiceNo: '3200260128',
        buyer: '恒达地产有限公司',
        seller: '鼎立建筑工程有限公司',
        lineItems: [
          {
            name: '办公楼基础工程进度款（15%）',
            qty: 1,
            unit: '项',
            price: 750000,
            amount: 750000
          }
        ],
        totalAmount: 817500,
      taxRate: 0.09,
        taxAmount: 67500,
        amountCN: '捌拾壹万柒仟伍佰元整'
      },
      {
        type: 'text',
        label: '工程进度确认单',
        date: '2026-01-28',
        docTitle: '工程完工进度确认单',
        content: '恒达地产办公楼工程\n本月完成：基础施工（15%），累计完成：15%\n确认收入：750,000元\n监理签字：李监理\n甲方确认：恒达地产',
        headers: [
          '项目',
          '金额/说明'
        ],
        rows: [
          [
            '本月完成',
            '基础施工（15%），累计完成：15%'
          ],
          [
            '确认收入',
            '750,000元'
          ],
          [
            '监理签字',
            '李监理'
          ],
          [
            '甲方确认',
            '恒达地产'
          ],
        ],
      }
    ]
  },
  {
    date: '2026-01-28',
    role: 'accountant',
    title: '结转主营业务成本',
    tags: [
      '工程合同'
    ],
    difficulty: 3,
    description: '将本月归集的合同履约成本结转至主营业务成本。恒达项目本月成本：材料290,000+人工(80,000+29,360+41,010=150,370)+机械1,250+其他直接(12,000+11,000+5,000=28,000)=469,620元。',
    tip: '按完工进度将合同履约成本结转至主营业务成本，实现收入与成本配比。',
    entries: [
      {
        subjectCode: '6401',
        debit: 469620,
        credit: 0,
        summary: '结转恒达项目主营业务成本',
        explanation: '主营业务成本增加，与收入配比。'
      },
      {
        subjectCode: '540101',
        debit: 0,
        credit: 150370,
        summary: '结转人工成本',
        explanation: '合同履约成本-人工成本转出。'
      },
      {
        subjectCode: '540102',
        debit: 0,
        credit: 290000,
        summary: '结转材料成本',
        explanation: '合同履约成本-材料成本转出。'
      },
      {
        subjectCode: '540104',
        debit: 0,
        credit: 1250,
        summary: '结转机械使用费',
        explanation: '合同履约成本-机械使用费转出。'
      },
      {
        subjectCode: '540105',
        debit: 0,
        credit: 28000,
        summary: '结转其他直接费',
        explanation: '合同履约成本-其他直接费转出。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '成本结转表',
        date: '2026-01-28',
        docTitle: '合 同 履 约 成 本 结 转 表',
        content: '期间：2026年1月\n项目：恒达地产办公楼工程（完工进度15%）\n\n成本明细结转：\n  材料成本（钢材、水泥砂石）：290,000元 ✓\n  人工成本（施工工资+社保+间接费分配）：150,370元 ✓\n  机械使用费（施工机械折旧）：1,250元 ✓\n  其他直接费用（工程保险+水电+临设摊销）：28,000元 ✓\n  合同履约成本合计：469,620元 → 转入主营业务成本 ✓\n\n收入成本配比：\n  确认收入（不含税）：682,500元\n  结转成本：469,620元\n  毛利：212,880元\n  毛利率：31.2%\n\n零余额确认：\n  合同履约成本-材料成本：0 ✓\n  合同履约成本-人工成本：0 ✓\n  合同履约成本-机械使用费：0 ✓\n  合同履约成本-其他直接费：0 ✓\n\n制表：李会计\n审核：赵会计',
        headers: [
          '项目',
          '金额/说明'
        ],
        rows: [
          [
            '期间',
            '2026年1月'
          ],
          [
            '项目',
            '恒达地产办公楼工程（完工进度15%）'
          ],
          [
            '材料成本（钢材、水泥砂石）',
            '290,000元 ✓'
          ],
          [
            '人工成本（施工工资+社保+间接费分配）',
            '150,370元 ✓'
          ],
          [
            '机械使用费（施工机械折旧）',
            '1,250元 ✓'
          ],
          [
            '其他直接费用（工程保险+水电+临设摊销）',
            '28,000元 ✓'
          ],
          [
            '合同履约成本合计',
            '469,620元 → 转入主营业务成本 ✓'
          ],
          [
            '确认收入（不含税）',
            '682,500元'
          ],
          [
            '结转成本',
            '469,620元'
          ],
          [
            '毛利',
            '212,880元'
          ],
          [
            '毛利率',
            '31.2%'
          ],
          [
            '合同履约成本-材料成本',
            '0 ✓'
          ],
          [
            '合同履约成本-人工成本',
            '0 ✓'
          ],
          [
            '合同履约成本-机械使用费',
            '0 ✓'
          ],
          [
            '合同履约成本-其他直接费',
            '0 ✓'
          ],
          [
            '制表',
            '李会计'
          ],
          [
            '审核',
            '赵会计'
          ],
        ],
      }
    ]
  },
  {
    date: '2026-01-29',
    role: 'accountant',
    title: '计提城建税及教育费附加',
    tags: [
      '税费'
    ],
    difficulty: 2,
    description: '本月应交增值税=销项67,500-进项(26,000+11,700+15,600)=14,200元。计提城建税（7%）994元，教育费附加（3%）426元，地方教育附加（2%）284元，合计1,704元。',
    tip: '城建税和教育费附加以当月应纳增值税为计税依据。',
    entries: [
      {
        subjectCode: '6403',
        debit: 1704,
        credit: 0,
        summary: '计提城建税及附加费',
        explanation: '税金及附加增加。'
      },
      {
        subjectCode: '222103',
        debit: 0,
        credit: 994,
        summary: '应交城建税（14,200×7%）',
        explanation: '城建税994元。'
      },
      {
        subjectCode: '222104',
        debit: 0,
        credit: 710,
        summary: '应交教育费附加（14,200×5%）',
        explanation: '教育费附加3%+地方教育附加2%=5%，合计710元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '税费计算表',
        date: '2026-01-29',
        docTitle: '城 建 税 及 附 加 计 算 表',
        content: '期间：2026年1月\n计税依据：本月应纳增值税14,200元\n\n税率明细：\n  城建税：14,200×7% = 994元\n  教育费附加：14,200×3% = 426元\n  地方教育附加：14,200×2% = 284元\n  合计：1,704元\n\n制表：李会计\n审核：赵会计',
        headers: [
          '项目',
          '金额/说明'
        ],
        rows: [
          [
            '期间',
            '2026年1月'
          ],
          [
            '计税依据',
            '本月应纳增值税14,200元'
          ],
          [
            '城建税',
            '14,200×7% = 994元'
          ],
          [
            '教育费附加',
            '14,200×3% = 426元'
          ],
          [
            '地方教育附加',
            '14,200×2% = 284元'
          ],
          [
            '合计',
            '1,704元'
          ],
          [
            '制表',
            '李会计'
          ],
          [
            '审核',
            '赵会计'
          ],
        ],
      }
    ]
  },
  {
    date: '2026-01-30',
    role: 'accountant',
    title: '银行手续费及利息收入',
    tags: [
      '资金管理'
    ],
    difficulty: 1,
    description: '银行账户本月手续费（转账费、账户管理费）350元。收到工商银行存款利息1,200元。',
    tip: '手续费计入财务费用。利息收入冲减财务费用。',
    entries: [
      {
        subjectCode: '6603',
        debit: 350,
        credit: 0,
        summary: '银行手续费',
        explanation: '财务费用增加。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 350,
        summary: '银行手续费',
        explanation: '银行存款减少。'
      },
      {
        subjectCode: '100201',
        debit: 1200,
        credit: 0,
        summary: '收到存款利息',
        explanation: '银行存款增加。',
        cashFlowItem: 'cf-op5',
        cashFlowExplanation: '银行存款利息收入——收到其他与经营活动有关的现金。'
      },
      {
        subjectCode: '6603',
        debit: 0,
        credit: 1200,
        summary: '利息冲减财务费用',
        explanation: '财务费用减少。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '银行回单',
        date: '2026-01-30',
        totalAmount: 350,
        payer: '鼎立建筑工程有限公司',
        payeeName: '工商银行南京分行',
        content: '1月账户手续费',
        refNo: 'YW202601300001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 9876 5432 1098 765'
      },
      {
        type: 'bank',
        label: '利息回单',
        date: '2026-01-30',
        totalAmount: 1200,
        payer: '工商银行南京分行',
        payeeName: '鼎立建筑工程有限公司',
        content: '1月存款利息',
        refNo: 'LX202601300001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 9876 5432 1098 765',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 0123 4567 8901 234'
      }
    ]
  },
  {
    date: '2026-01-30',
    role: 'accountant',
    title: '月末结转损益',
    tags: [
      '期末'
    ],
    difficulty: 3,
    description: '月末将各损益类科目余额结转至本年利润。收入682,500元，成本469,620元，税金3,204元（1,500+1,704），管理费用69,775元（开办8,500+行政工资25,000+行政社保9,175+招标文件1,000+代理15,000+折旧600+房租10,000+办公费500），财务费用净收入850元。',
    tip: '月末结转损益：收入类科目从借方转出，费用类科目从贷方转出，差额计入本年利润。',
    entries: [
      {
        subjectCode: '6001',
        debit: 682500,
        credit: 0,
        summary: '结转主营业务收入',
        explanation: '收入转出，余额归零。'
      },
      {
        subjectCode: '6401',
        debit: 0,
        credit: 469620,
        summary: '结转主营业务成本',
        explanation: '成本转出。'
      },
      {
        subjectCode: '6403',
        debit: 0,
        credit: 3204,
        summary: '结转税金及附加',
        explanation: '税金转出。'
      },
      {
        subjectCode: '6602',
        debit: 0,
        credit: 69775,
        summary: '结转管理费用',
        explanation: '管理费用转出。'
      },
      {
        subjectCode: '6603',
        debit: 850,
        credit: 0,
        summary: '结转财务费用（净收入）',
        explanation: '财务费用净收入850元。'
      },
      {
        subjectCode: '4103',
        debit: 0,
        credit: 140751,
        summary: '结转本年利润（净利润）',
        explanation: '净利润=682,500-469,620-3,204-69,775+850=140,751元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '损益结转表',
        date: '2026-01-30',
        docTitle: '期 间 损 益 结 转 表',
        content: '期间：2026年1月\n\n收入类科目结转：\n  主营业务收入：682,500元 → 借方转出 ✓\n\n费用类科目结转：\n  主营业务成本：469,620元 → 贷方转出 ✓\n  税金及附加：3,204元 → 贷方转出 ✓\n  管理费用：69,775元 → 贷方转出 ✓\n  财务费用（净收入）：850元 → 借方转出 ✓\n\n净利润计算：\n  682,500 - 469,620 - 3,204 - 69,775 + 850 = 140,751元\n  转入本年利润：140,751元 ✓\n\n各损益科目余额：\n  主营业务收入：0 ✓\n  主营业务成本：0 ✓\n  税金及附加：0 ✓\n  管理费用：0 ✓\n  财务费用：0 ✓\n\n制表：李会计\n审核：赵会计',
        headers: [
          '项目',
          '金额/说明'
        ],
        rows: [
          [
            '期间',
            '2026年1月'
          ],
          [
            '主营业务收入',
            '682,500元 → 借方转出 ✓'
          ],
          [
            '主营业务成本',
            '469,620元 → 贷方转出 ✓'
          ],
          [
            '税金及附加',
            '3,204元 → 贷方转出 ✓'
          ],
          [
            '管理费用',
            '69,775元 → 贷方转出 ✓'
          ],
          [
            '财务费用（净收入）',
            '850元 → 借方转出 ✓'
          ],
          [
            '转入本年利润',
            '140,751元 ✓'
          ],
          [
            '主营业务收入',
            '0 ✓'
          ],
          [
            '主营业务成本',
            '0 ✓'
          ],
          [
            '税金及附加',
            '0 ✓'
          ],
          [
            '管理费用',
            '0 ✓'
          ],
          [
            '财务费用',
            '0 ✓'
          ],
          [
            '制表',
            '李会计'
          ],
          [
            '审核',
            '赵会计'
          ],
        ],
      }
    ]
  },
  {
    date: '2026-01-31',
    role: 'accountant',
    title: '模拟纳税申报',
    tags: [
      '期末',
      '申报'
    ],
    difficulty: 1,
    description: '完成1月账务处理后进行模拟纳税申报。本月应纳增值税14,200元（已预缴30,000元，留抵15,800元），城建税994元，教育费附加710元。',
    tip: '每月纳税申报是法定义务。注意：建筑业预收款预缴的增值税可在申报时抵减。',
    entries: [],
    documents: [
      {
        type: 'text',
        label: '增值税纳税申报表',
        date: '2026-01-31',
        docTitle: '增 值 税 纳 税 申 报 表（一般纳税人适用）',
        content: '纳税期间：2026年1月\n纳税人：鼎立建筑工程有限公司\n\n一、销项税额\n  按完工进度确认收入750,000×9%：67,500元\n\n二、进项税额\n  采购施工机械：15,600元\n  采购钢材（226,000）：26,000元\n  采购水泥砂石（101,700）：11,700元\n  进项税额合计：53,300元\n\n三、预缴税额\n  预收工程款预缴增值税：30,000元\n\n四、应纳税额\n  应纳：67,500 - 53,300 = 14,200元\n  已预缴：30,000元\n  本期留抵：15,800元（结转下期抵扣）\n  本期应补（退）：0元\n\n五、附加税费\n  城建税（7%）：14,200×7% = 994元\n  教育费附加（3%）：14,200×3% = 426元\n  地方教育附加（2%）：14,200×2% = 284元\n  附加合计：1,704元\n\n申报人：李会计\n申报日期：2026-01-31',
        headers: [
          '项目',
          '金额/说明'
        ],
        rows: [
          [
            '纳税期间',
            '2026年1月'
          ],
          [
            '纳税人',
            '鼎立建筑工程有限公司'
          ],
          [
            '按完工进度确认收入750,000×9%',
            '67,500元'
          ],
          [
            '采购施工机械',
            '15,600元'
          ],
          [
            '采购钢材（226,000）',
            '26,000元'
          ],
          [
            '采购水泥砂石（101,700）',
            '11,700元'
          ],
          [
            '进项税额合计',
            '53,300元'
          ],
          [
            '预收工程款预缴增值税',
            '30,000元'
          ],
          [
            '应纳',
            '67,500 - 53,300 = 14,200元'
          ],
          [
            '已预缴',
            '30,000元'
          ],
          [
            '本期留抵',
            '15,800元（结转下期抵扣）'
          ],
          [
            '本期应补（退）',
            '0元'
          ],
          [
            '城建税（7%）',
            '14,200×7% = 994元'
          ],
          [
            '教育费附加（3%）',
            '14,200×3% = 426元'
          ],
          [
            '地方教育附加（2%）',
            '14,200×2% = 284元'
          ],
          [
            '附加合计',
            '1,704元'
          ],
          [
            '申报人',
            '李会计'
          ],
          [
            '申报日期',
            '2026-01-31'
          ],
        ],
      }
    ],
    nextAction: 'tax-filing'
  }
]

export default tasks
