/**
 * 建筑业 - 10月教学任务
 *
 * 企业：鼎立建筑工程有限公司
 * 税制：一般纳税人（增值税9%）
 * 准则：CAS 14 新收入准则（投入法/完工百分比）
 * 本月主题：竣工审计与新项目承接
 */

const tasks = [
  {
    date: '2026-10-09',
    role: 'accountant',
    title: '缴纳9月增值税及附加',
    tags: [
      '税费'
    ],
    difficulty: 2,
    description: '缴纳9月增值税24,900元，城建税1,743元，教育费附加1,245元，合计27,888元。',
    tip: '',
    entries: [
      {
        subjectCode: '222101',
        debit: 24900,
        credit: 0,
        summary: '缴增值税',
        explanation: '缴增值税。借24900元。'
      },
      {
        subjectCode: '222103',
        debit: 1743,
        credit: 0,
        summary: '缴城建税',
        explanation: '缴城建税。借1743元。'
      },
      {
        subjectCode: '222104',
        debit: 1245,
        credit: 0,
        summary: '缴附加',
        explanation: '缴附加。借1245元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 27888,
        summary: '支付',
        explanation: '支付。贷27888元。',
        cashFlowItem: 'cf-op4'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '电子缴税付款凭证',
        date: '2026-10-09',
        totalAmount: 27888,
        payer: '鼎立建筑工程有限公司',
        payeeName: '国家金库南京代理支库',
        content: '9月增值税24,900元、城建税1,743元、教育费附加1,245元',
        refNo: 'JS202610090001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234',
        payeeBank: '国家金库南京代理支库',
        payeeAccount: '0327 1001 2345 6789'
      }
    ]
  },
  {
    date: '2026-10-09',
    role: 'accountant',
    title: '缴纳9月社保公积金',
    tags: [
      '工资社保'
    ],
    difficulty: 1,
    description: '缴纳9月社保29,640元，公积金14,400元，合计44,040元。',
    tip: '',
    entries: [
      {
        subjectCode: '221102',
        debit: 29640,
        credit: 0,
        summary: '缴社保',
        explanation: '缴社保。借29640元。'
      },
      {
        subjectCode: '221103',
        debit: 14400,
        credit: 0,
        summary: '缴公积金',
        explanation: '缴公积金。借14400元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 44040,
        summary: '支付',
        explanation: '支付。贷44040元。',
        cashFlowItem: 'cf-op3'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '社保公积金缴费回单',
        date: '2026-10-09',
        totalAmount: 44040,
        payer: '鼎立建筑工程有限公司',
        payeeName: '社会保险费征收专户（代扣公积金）',
        content: '9月社保29,640元、公积金14,400元',
        refNo: 'SB202610090001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234',
        payeeBank: '社会保险费征收专户',
        payeeAccount: '3201 6500 0123 4567'
      }
    ]
  },
  {
    date: '2026-10-10',
    role: 'accountant',
    title: '发放9月职工工资',
    tags: [
      '工资社保'
    ],
    difficulty: 1,
    description: '代发9月工资120,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '221101',
        debit: 120000,
        credit: 0,
        summary: '发工资',
        explanation: '发工资。借120000元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 120000,
        summary: '代发',
        explanation: '代发。贷120000元。',
        cashFlowItem: 'cf-op3'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '银行代发工资回单',
        date: '2026-10-10',
        totalAmount: 120000,
        payer: '鼎立建筑工程有限公司',
        payeeName: '鼎立建筑职工（批量代发）',
        content: '9月职工工资代发',
        refNo: 'WF202610100001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '代发工资专户'
      }
    ]
  },
  {
    date: '2026-10-10',
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
        date: '2026-10-10',
        totalAmount: 15000,
        payer: '鼎立建筑工程有限公司',
        payeeName: '鼎立建筑工程有限公司（自提备用金）',
        content: '提取备用金',
        refNo: 'XJ202610100001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234'
      }
    ]
  },
  {
    date: '2026-10-11',
    role: 'accountant',
    title: '市政项目-收尾工程施工',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '市政项目进入收尾阶段，采购沥青及标线材料，价款35,000元，增值税4,550元，合计39,550元。',
    tip: '',
    entries: [
      {
        subjectCode: '540102',
        debit: 35000,
        credit: 0,
        summary: '采购收尾材料',
        explanation: '采购收尾材料。借35000元。'
      },
      {
        subjectCode: '222101',
        debit: 4550,
        credit: 0,
        summary: '进项税额',
        explanation: '进项税额。借4550元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 39550,
        summary: '支付',
        explanation: '支付。贷39550元。',
        cashFlowItem: 'cf-op2'
      }
    ],
    documents: [
      {
        type: 'invoice',
        label: '增值税专用发票',
        date: '2026-10-11',
        invoiceNo: '3200245801',
        buyer: '鼎立建筑工程有限公司',
        seller: '南京道路材料有限公司',
        totalAmount: 39550,
        taxRate: 0.13,
        taxAmount: 4550,
        amountWithoutTax: 35000,
        lineItems: [
          {
            name: '沥青混凝土',
            spec: 'AC-13 细粒式',
            unit: '吨',
            qty: 10,
            price: 2000,
            amount: 20000
          },
          {
            name: '热熔标线涂料',
            spec: '白色反光型',
            unit: '吨',
            qty: 5,
            price: 3000,
            amount: 15000
          }
        ]
      }
    ]
  },
  {
    date: '2026-10-11',
    role: 'accountant',
    title: '机械及水电费',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '10月机械费8,000元，水电费9,000元，合计17,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '540104',
        debit: 8000,
        credit: 0,
        summary: '机械费',
        explanation: '机械费。借8000元。'
      },
      {
        subjectCode: '540105',
        debit: 9000,
        credit: 0,
        summary: '水电费',
        explanation: '水电费。借9000元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 17000,
        summary: '支付',
        explanation: '支付。贷17000元。',
        cashFlowItem: 'cf-op6'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '费用明细',
        date: '2026-10-11',
        totalAmount: 17000,
        items: [
          { name: '机械燃油维修费', amount: 8000 },
          { name: '施工用水费', amount: 4000 },
          { name: '施工用电费', amount: 5000 }
        ]
      }
    ]
  },
  {
    date: '2026-10-14',
    role: 'accountant',
    title: '项目部及公司费用',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '10月项目差旅2,000元，办公1,500元，公司办公5,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '540105',
        debit: 2000,
        credit: 0,
        summary: '差旅',
        explanation: '差旅。借2000元。'
      },
      {
        subjectCode: '540106',
        debit: 1500,
        credit: 0,
        summary: '办公',
        explanation: '办公。借1500元。'
      },
      {
        subjectCode: '660201',
        debit: 5000,
        credit: 0,
        summary: '公司办公',
        explanation: '公司办公。借5000元。'
      },
      {
        subjectCode: '1001',
        debit: 0,
        credit: 3500,
        summary: '现金',
        explanation: '现金。贷3500元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 5000,
        summary: '转账',
        explanation: '转账。贷5000元。',
        cashFlowItem: 'cf-op6'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '费用明细',
        date: '2026-10-14',
        totalAmount: 8500,
        items: [
          { name: '项目部差旅费', amount: 2000 },
          { name: '项目部办公费', amount: 1500 },
          { name: '公司办公费', amount: 5000 }
        ]
      }
    ]
  },
  {
    date: '2026-10-15',
    role: 'accountant',
    title: '新项目投标',
    tags: [
      '工程合同'
    ],
    difficulty: 2,
    description: '公司参与高新区科创园项目投标（办公楼群，1,200万元）。支付投标保证金120,000元，购买标书费用2,000元。',
    tip: '新项目投标是维持公司业务持续性的重要活动。',
    entries: [
      {
        subjectCode: '1221',
        debit: 120000,
        credit: 0,
        summary: '投标保证金-科创园项目',
        explanation: '投标保证金-科创园项目。借120000元。'
      },
      {
        subjectCode: '660217',
        debit: 2000,
        credit: 0,
        summary: '购买招标文件',
        explanation: '购买招标文件。借2000元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 122000,
        summary: '支付保证金及标书费',
        explanation: '银行存款减少。',
        cashFlowItem: 'cf-op6'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '电汇凭证',
        date: '2026-10-15',
        totalAmount: 122000,
        payer: '鼎立建筑工程有限公司',
        payeeName: '高新区公共资源交易中心',
        content: '科创园项目投标保证金及标书费',
        refNo: 'DF202610150001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 9876 5432 1098 765'
      }
    ]
  },
  {
    date: '2026-10-15',
    role: 'accountant',
    title: '收到市政8月工程款',
    tags: [
      '往来管理'
    ],
    difficulty: 1,
    description: '收到市建设局8月工程进度款490,500元。',
    tip: '',
    entries: [
      {
        subjectCode: '100202',
        debit: 490500,
        credit: 0,
        summary: '收进度款',
        explanation: '收进度款。借490500元。',
        cashFlowItem: 'cf-op1'
      },
      {
        subjectCode: '1122',
        debit: 0,
        credit: 490500,
        summary: '应收减少',
        explanation: '应收减少。贷490500元。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '收款回单',
        date: '2026-10-15',
        totalAmount: 490500,
        payer: '南京市市政工程管理处',
        payeeName: '鼎立建筑工程有限公司',
        content: '市政道路工程8月进度款',
        refNo: 'SK202610150001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '市政工程管理处专户',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 0123 4567 8901 234'
      }
    ]
  },
  {
    date: '2026-10-16',
    role: 'accountant',
    title: '市政项目-工程进度确认',
    tags: [
      '工程合同'
    ],
    difficulty: 3,
    description: '市政项目完工进度达100%。确认剩余收入：300万×100%-已确认收入2,700,000=300,000元（不含税），增值税27,000元。',
    tip: '市政项目完工，全部收入确认完毕。',
    entries: [
      {
        subjectCode: '1122',
        debit: 327000,
        credit: 0,
        summary: '应收账款-市建设局（尾款）',
        explanation: '应收账款-市建设局（尾款）。借327000元。'
      },
      {
        subjectCode: '222101',
        debit: 0,
        credit: 27000,
        summary: '销项税额',
        explanation: '销项税额。贷27000元。'
      },
      {
        subjectCode: '6001',
        debit: 0,
        credit: 300000,
        summary: '确认收入-市政尾款',
        explanation: '确认收入-市政尾款。贷300000元。'
      }
    ],
    documents: [
      {
        type: 'invoice',
        label: '增值税专用发票',
        date: '2026-10-16',
        invoiceNo: '3200245802',
        buyer: '南京市建设局',
        seller: '鼎立建筑工程有限公司',
        totalAmount: 327000,
        taxRate: 0.09,
        taxAmount: 27000,
        amountWithoutTax: 300000,
        lineItems: [
          {
            name: '市政道路工程尾款（完工100%）',
            spec: '市政道路工程',
            unit: '项',
            qty: 1,
            price: 300000,
            amount: 300000
          }
        ]
      }
    ]
  },
  {
    date: '2026-10-16',
    role: 'accountant',
    title: '市政项目-最终成本结转',
    tags: [
      '工程合同'
    ],
    difficulty: 3,
    description: '市政项目最终成本：人工(累计)+材料(累计)+机械+其他。本月新增成本：材料35,000+人工摊+机械8,000+其他11,000=约104,000元（含间接费分摊后）。',
    tip: '',
    entries: [
      {
        subjectCode: '6401',
        debit: 104000,
        credit: 0,
        summary: '结转市政最后成本',
        explanation: '结转市政最后成本。借104000元。'
      },
      {
        subjectCode: '540102',
        debit: 0,
        credit: 35000,
        summary: '材料转出',
        explanation: '材料转出。贷35000元。'
      },
      {
        subjectCode: '540104',
        debit: 0,
        credit: 8000,
        summary: '机械转出',
        explanation: '机械转出。贷8000元。'
      },
      {
        subjectCode: '540105',
        debit: 0,
        credit: 11000,
        summary: '其他转出',
        explanation: '其他转出。贷11000元。'
      },
      {
        subjectCode: '540101',
        debit: 0,
        credit: 50000,
        summary: '人工转出（份额）',
        explanation: '人工转出（份额）。贷50000元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '成本表',
        date: '2026-10-16',
        content: '项目：市政道路工程（完工率100%）\n\n一、本月新增成本\n┌──────────────┬──────────┐\n│ 成本项目      │ 金额      │\n├──────────────┼──────────┤\n│ 直接材料      │ 35,000   │\n├──────────────┼──────────┤\n│ 直接人工      │ 50,000   │\n├──────────────┼──────────┤\n│ 机械使用费    │  8,000   │\n├──────────────┼──────────┤\n│ 其他直接费    │ 11,000   │\n├──────────────┼──────────┤\n│ 本月合计      │ 104,000  │\n└──────────────┴──────────┘\n\n二、项目总决算\n┌──────────────┬──────────┬─────────┐\n│ 项目          │ 金额      │ 占比     │\n├──────────────┼──────────┼─────────┤\n│ 总收入        │ 3,000,000│  100%   │\n├──────────────┼──────────┼─────────┤\n│ 总成本        │ 1,144,375│  38.1%  │\n├──────────────┼──────────┼─────────┤\n│ 总毛利        │ 1,855,625│  61.9%  │\n├──────────────┼──────────┼─────────┤\n│ 项目利润率    │   61.9%  │   —     │\n└──────────────┴──────────┴─────────┘\n\n三、市政项目全部成本已结转完毕 ✓',
        headers: [
          '成本项目',
          '金额'
        ],
        rows: [
          [
              '直接材料',
              '35,000'
          ],
          [
              '直接人工',
              '50,000'
          ],
          [
              '机械使用费',
              '8,000'
          ],
          [
              '其他直接费',
              '11,000'
          ],
          [
              '本月合计',
              '104,000'
          ],
        ],
        docTitle: '市 政 项 目 最 终 成 本 结 算 表',
        signature: '制表：李会计  审核：赵经理'
      }
    ]
  },
  {
    date: '2026-10-17',
    role: 'accountant',
    title: '市政项目-竣工验收',
    tags: [
      '工程合同'
    ],
    difficulty: 1,
    description: '市政道路工程通过竣工验收。',
    tip: '第二个项目完工。',
    entries: [],
    documents: [
      {
        type: 'text',
        label: '市政验收报告',
        date: '2026-10-17',
        docTitle: '市 政 道 路 工 程 竣 工 验 收 报 告',
        content: '工程名称：南京市市政道路工程\n施工单位：鼎立建筑工程有限公司\n开工日期：2026年3月\n竣工日期：2026年10月17日\n\n验收结论：\n 1. 道路工程各项指标符合设计及规范要求。\n 2. 路基、路面结构层压实度、弯沉值检测合格。\n 3. 标线、路灯、排水等附属设施安装到位。\n 4. 工程质量评定为：合格 ✓\n\n参验单位：南京市建设局、设计院、监理公司、施工单位\n验收日期：2026年10月17日',
        headers: [
          '项目',
          '内容'
        ],
        rows: [
          [
            '工程名称',
            '南京市市政道路工程'
          ],
          [
            '施工单位',
            '鼎立建筑工程有限公司'
          ],
          [
            '开工日期',
            '2026年3月'
          ],
          [
            '竣工日期',
            '2026年10月17日'
          ],
          [
            '4. 工程质量评定为',
            '合格 ✓'
          ],
          [
            '参验单位',
            '南京市建设局、设计院、监理公司、施工单位'
          ],
          [
            '验收日期',
            '2026年10月17日'
          ],
        ],
        signature: '建设单位：南京市建设局  施工单位：鼎立建筑'
      }
    ]
  },
  {
    date: '2026-10-18',
    role: 'accountant',
    title: '科创园项目中标通知',
    tags: [
      '工程合同'
    ],
    difficulty: 2,
    description: '公司成功中标高新区科创园项目（办公楼群），合同总价1,200万元（不含税），增值税9%。支付招标代理服务费50,000元。投标保证金转为履约保证金。',
    tip: '第三个项目启动，合同金额更大，技术更复杂。',
    entries: [
      {
        subjectCode: '6602',
        debit: 50000,
        credit: 0,
        summary: '招标代理费',
        explanation: '招标代理费。借50000元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 50000,
        summary: '支付',
        explanation: '支付。贷50000元。',
        cashFlowItem: 'cf-op6'
      },
      {
        subjectCode: '1221',
        debit: 120000,
        credit: 0,
        summary: '履约保证金增加（原投标保证金重分类）',
        explanation: '履约保证金增加（原投标保证金重分类）。借120000元。'
      },
      {
        subjectCode: '1221',
        debit: 0,
        credit: 120000,
        summary: '投标保证金减少（转履约）',
        explanation: '投标保证金减少（转履约）。贷120000元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '中标通知书',
        date: '2026-10-18',
        docTitle: '中 标 通 知 书',
        content: '项目名称：高新区科创园办公楼群\n中标价：12,000,000元\n中标单位：鼎立建筑工程有限公司\n投标保证金已转为履约保证金',
        headers: [
          '项目',
          '金额/说明'
        ],
        rows: [
          [
            '项目名称',
            '高新区科创园办公楼群'
          ],
          [
            '中标价',
            '12,000,000元'
          ],
          [
            '中标单位',
            '鼎立建筑工程有限公司'
          ],
        ],
        signature: '招标人签章'
      }
    ]
  },
  {
    date: '2026-10-18',
    role: 'accountant',
    title: '收到科创园预收款',
    tags: [
      '工程合同'
    ],
    difficulty: 1,
    description: '收到业主预付工程款360万元（1,200万×30%），存入工商银行。',
    tip: '',
    entries: [
      {
        subjectCode: '100201',
        debit: 3600000,
        credit: 0,
        summary: '收科创园预收款',
        explanation: '收科创园预收款。借3600000元。',
        cashFlowItem: 'cf-op5'
      },
      {
        subjectCode: '2205',
        debit: 0,
        credit: 3600000,
        summary: '合同负债-科创园项目',
        explanation: '合同负债-科创园项目。贷3600000元。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '收款回单',
        date: '2026-10-18',
        totalAmount: 3600000,
        payer: '高新区科创园建设指挥部',
        payeeName: '鼎立建筑工程有限公司',
        content: '科创园项目预付工程款（合同价30%）',
        refNo: 'SK202610180001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 9876 5432 1098 765'
      }
    ]
  },
  {
    date: '2026-10-21',
    role: 'accountant',
    title: '预缴增值税',
    tags: [
      '税费'
    ],
    difficulty: 2,
    description: '科创园预收款360万，预缴增值税（2%）72,000元，城建税5,040元，教育费附加3,600元，合计80,640元。',
    tip: '',
    entries: [
      {
        subjectCode: '222101',
        debit: 72000,
        credit: 0,
        summary: '预缴增值税',
        explanation: '预缴增值税。借72000元。'
      },
      {
        subjectCode: '222103',
        debit: 5040,
        credit: 0,
        summary: '城建税',
        explanation: '城建税。借5040元。'
      },
      {
        subjectCode: '222104',
        debit: 3600,
        credit: 0,
        summary: '附加',
        explanation: '附加。借3600元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 80640,
        summary: '缴纳税款',
        explanation: '缴纳税款。贷80640元。',
        cashFlowItem: 'cf-op4'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '预缴凭证',
        date: '2026-10-21',
        totalAmount: 80640,
        items: [
          {
            name: '增值税预征2%',
            amount: 72000
          },
          {
            name: '城建税7%',
            amount: 5040
          },
          {
            name: '教育费附加5%',
            amount: 3600
          }
        ],
      stampText: '已收款'
      }
    ]
  },
  {
    date: '2026-10-22',
    role: 'accountant',
    title: '科创园前期准备',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '科创园项目前期费用：勘察设计费80,000元，场地平整费40,000元，合计120,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '540102',
        debit: 80000,
        credit: 0,
        summary: '勘察设计费',
        explanation: '勘察设计费。借80000元。'
      },
      {
        subjectCode: '540105',
        debit: 40000,
        credit: 0,
        summary: '场地平整费',
        explanation: '场地平整费。借40000元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 120000,
        summary: '支付',
        explanation: '支付。贷120000元。',
        cashFlowItem: 'cf-op2'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '前期费用',
        date: '2026-10-22',
        totalAmount: 120000,
        items: [
          {
            name: '工程勘察设计',
            amount: 80000
          },
          {
            name: '场地平整',
            amount: 40000
          }
        ],
      stampText: '已收款'
      }
    ]
  },
  {
    date: '2026-10-22',
    role: 'accountant',
    title: '科创园-采购施工机械',
    tags: [
      '工程成本'
    ],
    difficulty: 2,
    description: '为科创园项目采购新型施工机械（塔吊、施工电梯等），总价500,000元，增值税65,000元，合计565,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '1601',
        debit: 500000,
        credit: 0,
        summary: '新购施工机械',
        explanation: '新购施工机械。借500000元。'
      },
      {
        subjectCode: '222101',
        debit: 65000,
        credit: 0,
        summary: '进项税额',
        explanation: '进项税额。借65000元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 565000,
        summary: '支付',
        explanation: '支付。贷565000元。',
        cashFlowItem: 'cf-inv',
        cashFlowExplanation: '购建固定资产支付的现金。'
      }
    ],
    documents: [
      {
        type: 'invoice',
        label: '增值税专用发票',
        date: '2026-10-22',
        invoiceNo: '3200245803',
        buyer: '鼎立建筑工程有限公司',
        seller: '南京建筑工程机械有限公司',
        totalAmount: 565000,
        taxRate: 0.13,
        taxAmount: 65000,
        amountWithoutTax: 500000,
        lineItems: [
          {
            name: '塔吊QTZ80',
            qty: 2,
            unit: '台',
            price: 150000,
            amount: 300000
          },
          {
            name: '施工电梯',
            qty: 1,
            unit: '台',
            price: 200000,
            amount: 200000
          }
        ],
      }
    ]
  },
  {
    date: '2026-10-23',
    role: 'accountant',
    title: '计提10月职工薪酬',
    tags: [
      '工资社保'
    ],
    difficulty: 2,
    description: '计提10月工资：科创园施工人员50,000元（前期准备），项目部35,000元，公司25,000元，合计110,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '540101',
        debit: 50000,
        credit: 0,
        summary: '施工工资-科创园',
        explanation: '施工工资-科创园。借50000元。'
      },
      {
        subjectCode: '540106',
        debit: 35000,
        credit: 0,
        summary: '项目部工资',
        explanation: '项目部工资。借35000元。'
      },
      {
        subjectCode: '660203',
        debit: 25000,
        credit: 0,
        summary: '管理工资',
        explanation: '管理工资。借25000元。'
      },
      {
        subjectCode: '221101',
        debit: 0,
        credit: 110000,
        summary: '应付薪酬',
        explanation: '应付薪酬。贷110000元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '工资表',
        date: '2026-10-23',
        content: '期间：2026年10月\n\n计提明细：\n┌──────────────┬──────┬──────────────┬──────────┐\n│ 部  门        │ 人数 │ 工资总额      │ 费用归属  │\n├──────────────┼──────┼──────────────┼──────────┤\n│ 科创园施工    │  12  │ 50,000元      │ 合同成本  │\n├──────────────┼──────┼──────────────┼──────────┤\n│ 项目部管理    │   4  │ 35,000元      │ 间接费用  │\n├──────────────┼──────┼──────────────┼──────────┤\n│ 公司管理层    │   5  │ 25,000元      │ 管理费用  │\n├──────────────┼──────┼──────────────┼──────────┤\n│ 合  计        │  21  │ 110,000元     │ —        │\n└──────────────┴──────┴──────────────┴──────────┘\n\n市政项目已完工，施工人员转入科创园项目',
        headers: [
          '部 门',
          '人数',
          '工资总额',
          '费用归属'
        ],
        rows: [
          [
              '科创园施工',
              '12',
              '50,000元',
              '合同成本'
          ],
          [
              '项目部管理',
              '4',
              '35,000元',
              '间接费用'
          ],
          [
              '公司管理层',
              '5',
              '25,000元',
              '管理费用'
          ],
          [
              '合 计',
              '21',
              '110,000元',
              '—'
          ],
        ],
        docTitle: '10 月 职 工 薪 酬 计 提 表',
        signature: '制表：王出纳  审核：李会计  批准：赵经理'
      }
    ]
  },
  {
    date: '2026-10-23',
    role: 'accountant',
    title: '计提10月社保公积金',
    tags: [
      '工资社保'
    ],
    difficulty: 2,
    description: '110K×36.7%=40,370元。',
    tip: '',
    entries: [
      {
        subjectCode: '540101',
        debit: 18350,
        credit: 0,
        summary: '施工社公（50K×36.7%）',
        explanation: '施工社公（50K×36.7%）。借18350元。'
      },
      {
        subjectCode: '540106',
        debit: 12845,
        credit: 0,
        summary: '项目部社公',
        explanation: '项目部社公。借12845元。'
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
        credit: 27170,
        summary: '社保',
        explanation: '社保。贷27170元。'
      },
      {
        subjectCode: '221103',
        debit: 0,
        credit: 13200,
        summary: '公积金',
        explanation: '公积金。贷13200元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '计提表',
        date: '2026-10-23',
        content: '期间：2026年10月\n计提基数：工资总额110,000元\n综合计提比例：36.7%（社保24.7%+公积金12%）\n\n费率明细：\n┌──────────┬────────┬──────────┐\n│ 险  种    │ 费率   │ 金额      │\n├──────────┼────────┼──────────┤\n│ 养老保险  │ 16.0%  │ 17,600   │\n├──────────┼────────┼──────────┤\n│ 医疗保险  │  6.5%  │  7,150   │\n├──────────┼────────┼──────────┤\n│ 失业保险  │  0.5%  │    550   │\n├──────────┼────────┼──────────┤\n│ 工伤保险  │  0.7%  │    770   │\n├──────────┼────────┼──────────┤\n│ 生育保险  │  1.0%  │  1,100   │\n├──────────┼────────┼──────────┤\n│ 小计(社保)│ 24.7%  │ 27,170   │\n├──────────┼────────┼──────────┤\n│ 公积金    │ 12.0%  │ 13,200   │\n├──────────┼────────┼──────────┤\n│ 合  计    │ 36.7%  │ 40,370   │\n└──────────┴────────┴──────────┘\n\n分配：施工50K×36.7%=18,350元，项目部35K×36.7%=12,845元，管理25K×36.7%=9,175元',
        headers: [
          '险 种',
          '费率',
          '金额'
        ],
        rows: [
          [
              '养老保险',
              '16.0%',
              '17,600'
          ],
          [
              '医疗保险',
              '6.5%',
              '7,150'
          ],
          [
              '失业保险',
              '0.5%',
              '550'
          ],
          [
              '工伤保险',
              '0.7%',
              '770'
          ],
          [
              '生育保险',
              '1.0%',
              '1,100'
          ],
          [
              '小计(社保)',
              '24.7%',
              '27,170'
          ],
          [
              '公积金',
              '12.0%',
              '13,200'
          ],
          [
              '合 计',
              '36.7%',
              '40,370'
          ],
        ],
        docTitle: '10 月 社 保 公 积 金 计 提 表',
        signature: '制表：王出纳  审核：李会计'
      }
    ]
  },
  {
    date: '2026-10-24',
    role: 'accountant',
    title: '折旧及摊销',
    tags: [
      '工程成本'
    ],
    difficulty: 2,
    description: '折旧：原施工机械1,250+新购(500K/96月≈5,208)=6,458元，办公设备600元，摊销15,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '540104',
        debit: 6458,
        credit: 0,
        summary: '折旧-施工机械',
        explanation: '折旧-施工机械。借6458元。'
      },
      {
        subjectCode: '660205',
        debit: 600,
        credit: 0,
        summary: '折旧-办公',
        explanation: '折旧-办公。借600元。'
      },
      {
        subjectCode: '540105',
        debit: 5000,
        credit: 0,
        summary: '临设摊销',
        explanation: '临设摊销。借5000元。'
      },
      {
        subjectCode: '660205',
        debit: 10000,
        credit: 0,
        summary: '房租摊销',
        explanation: '房租摊销。借10000元。'
      },
      {
        subjectCode: '1602',
        debit: 0,
        credit: 7058,
        summary: '累计折旧',
        explanation: '累计折旧。贷7058元。'
      },
      {
        subjectCode: '1801',
        debit: 0,
        credit: 5000,
        summary: '临设减',
        explanation: '余额15,000元。'
      },
      {
        subjectCode: '1123',
        debit: 0,
        credit: 10000,
        summary: '租金减',
        explanation: '余额20,000元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '折旧摊销',
        date: '2026-10-24',
        content: '期间：2026年10月\n本月新增施工机械500,000元（10月22日购入），按8年计提折旧\n\n一、折旧计提（合计：7,058元）\n┌──────────────┬──────────┬──────┬──────────┬──────────┐\n│ 资产名称      │ 原值      │ 年限  │ 月折旧    │ 归属部门  │\n├──────────────┼──────────┼──────┼──────────┼──────────┤\n│ 旧施工机械    │ 800,000  │  10年 │  1,250   │ 机械使用  │\n├──────────────┼──────────┼──────┼──────────┼──────────┤\n│ 新塔吊QTZ80   │ 300,000  │   8年 │  3,125   │ 机械使用  │\n├──────────────┼──────────┼──────┼──────────┼──────────┤\n│ 新施工电梯    │ 200,000  │   8年 │  2,083   │ 机械使用  │\n├──────────────┼──────────┼──────┼──────────┼──────────┤\n│ 办公设备      │ 120,000  │   5年 │    600   │ 管理费用  │\n├──────────────┼──────────┼──────┼──────────┼──────────┤\n│ 小计          │1,420,000 │  —   │  7,058   │  —       │\n└──────────────┴──────────┴──────┴──────────┴──────────┘\n\n二、摊销计提（合计：15,000元）\n┌──────────────┬──────────┬──────────┬──────────┬────────┐\n│ 项目          │ 原值      │ 已摊销    │ 本月摊销  │ 余额   │\n├──────────────┼──────────┼──────────┼──────────┼────────┤\n│ 临设摊销      │ 150,000  │ 135,000  │  5,000   │ 15,000 │\n├──────────────┼──────────┼──────────┼──────────┼────────┤\n│ 房租摊销      │ 180,000  │ 160,000  │ 10,000   │ 20,000 │\n├──────────────┼──────────┼──────────┼──────────┼────────┤\n│ 小计          │ 330,000  │ 295,000  │ 15,000   │ 35,000 │\n└──────────────┴──────────┴──────────┴──────────┴────────┘\n\n合计：折旧7,058元 + 摊销15,000元 = 22,058元 ✓',
        headers: [
          '资产名称',
          '原值',
          '年限',
          '月折旧',
          '归属部门'
        ],
        rows: [
          [
              '旧施工机械',
              '800,000',
              '10年',
              '1,250',
              '机械使用'
          ],
          [
              '新塔吊QTZ80',
              '300,000',
              '8年',
              '3,125',
              '机械使用'
          ],
          [
              '新施工电梯',
              '200,000',
              '8年',
              '2,083',
              '机械使用'
          ],
          [
              '办公设备',
              '120,000',
              '5年',
              '600',
              '管理费用'
          ],
          [
              '小计',
              '1,420,000',
              '—',
              '7,058',
              '—'
          ],
        ],
        docTitle: '10 月 折 旧 及 摊 销 计 算 表',
        signature: '制表：王出纳  审核：李会计'
      }
    ]
  },
  {
    date: '2026-10-25',
    role: 'accountant',
    title: '间接费用归集与分摊',
    tags: [
      '工程成本'
    ],
    difficulty: 3,
    description: '间接费35,000+12,845+1,500=49,345元。仅科创园项目，全额分配。',
    tip: '',
    entries: [
      {
        subjectCode: '540101',
        debit: 49345,
        credit: 0,
        summary: '间接-科创园项目',
        explanation: '间接-科创园项目。借49345元。'
      },
      {
        subjectCode: '540106',
        debit: 0,
        credit: 49345,
        summary: '间接转出',
        explanation: '间接转出。贷49345元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '间接费表',
        date: '2026-10-25',
        content: '期间：2026年10月\n\n一、费用归集\n┌──────────────┬──────────┐\n│ 费用项目      │ 金额      │\n├──────────────┼──────────┤\n│ 项目部工资    │ 35,000   │\n├──────────────┼──────────┤\n│ 项目部社保    │ 12,845   │\n├──────────────┼──────────┤\n│ 项目部办公    │  1,500   │\n├──────────────┼──────────┤\n│ 合计          │ 49,345   │\n└──────────────┴──────────┘\n\n二、分配情况\n仅科创园项目在建，全额分配\n分配率：100%\n分配金额：49,345元\n\n三、分配后余额：0元 ✓',
        headers: [
          '费用项目',
          '金额'
        ],
        rows: [
          [
              '项目部工资',
              '35,000'
          ],
          [
              '项目部社保',
              '12,845'
          ],
          [
              '项目部办公',
              '1,500'
          ],
          [
              '合计',
              '49,345'
          ],
        ],
        docTitle: '间 接 费 用 归 集 与 分 配 表',
        signature: '制表：王出纳  审核：李会计'
      }
    ]
  },
  {
    date: '2026-10-25',
    role: 'accountant',
    title: '科创园首次收入确认',
    tags: [
      '工程合同'
    ],
    difficulty: 3,
    description: '科创园项目本月完成前期准备，完工进度8%。确认收入：1,200万×8%=960,000元（不含税），增值税86,400元。冲减合同负债。',
    tip: '',
    entries: [
      {
        subjectCode: '2205',
        debit: 960000,
        credit: 0,
        summary: '合同负债冲减-科创园',
        explanation: '合同负债冲减-科创园。借960000元。'
      },
      {
        subjectCode: '222101',
        debit: 0,
        credit: 86400,
        summary: '销项税额',
        explanation: '销项税额。贷86400元。'
      },
      {
        subjectCode: '1122',
        debit: 86400,
        credit: 0,
        summary: '应收账款-科创园（增值税差额）',
        explanation: '应收账款-科创园（增值税差额）。借86400元。'
      },
      {
        subjectCode: '6001',
        debit: 0,
        credit: 960000,
        summary: '确认收入-科创园',
        explanation: '确认收入-科创园。贷960000元。'
      }
    ],
    documents: [
      {
        type: 'invoice',
        label: '增值税专用发票',
        date: '2026-10-25',
        invoiceNo: '3200245804',
        buyer: '高新区科创园建设指挥部',
        seller: '鼎立建筑工程有限公司',
        totalAmount: 1046400,
        taxRate: 0.09,
        taxAmount: 86400,
        amountWithoutTax: 960000,
        lineItems: [
          {
            name: '科创园办公楼群前期进度款（完工8%）',
            spec: '科创园项目一期',
            unit: '项',
            qty: 1,
            price: 960000,
            amount: 960000
          }
        ]
      }
    ]
  },
  {
    date: '2026-10-25',
    role: 'accountant',
    title: '结转科创园成本',
    tags: [
      '工程合同'
    ],
    difficulty: 3,
    description: '科创园成本：人工(50K+18,350+49,345)=117,695+勘察80,000+场地40,000+机械6,458+其他-≈250,000元（暂估）。',
    tip: '',
    entries: [
      {
        subjectCode: '6401',
        debit: 250000,
        credit: 0,
        summary: '结转科创园成本',
        explanation: '结转科创园成本。借250000元。'
      },
      {
        subjectCode: '540101',
        debit: 0,
        credit: 117695,
        summary: '人工转出',
        explanation: '人工转出。贷117695元。'
      },
      {
        subjectCode: '540102',
        debit: 0,
        credit: 80000,
        summary: '勘察转出',
        explanation: '勘察转出。贷80000元。'
      },
      {
        subjectCode: '540104',
        debit: 0,
        credit: 6458,
        summary: '机械转出',
        explanation: '机械转出。贷6458元。'
      },
      {
        subjectCode: '540105',
        debit: 0,
        credit: 45847,
        summary: '其他转出',
        explanation: '其他转出。贷45847元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '成本表',
        date: '2026-10-25',
        content: '期间：2026年10月\n项目：高新区科创园办公楼群（完工进度8%）\n\n成本构成：\n┌──────────────┬──────────┬─────────┐\n│ 成本项目      │ 本期发生  │ 期末结转  │\n├──────────────┼──────────┼─────────┤\n│ 直接人工      │ 117,695  │ 117,695 │\n├──────────────┼──────────┼─────────┤\n│ 勘察设计费    │  80,000  │  80,000 │\n├──────────────┼──────────┼─────────┤\n│ 机械使用费    │   6,458  │   6,458 │\n├──────────────┼──────────┼─────────┤\n│ 其他直接费    │  45,847  │  45,847 │\n├──────────────┼──────────┼─────────┤\n│ 成本合计      │ 250,000  │ 250,000 │\n├──────────────┼──────────┼─────────┤\n│ 本期收入      │ 960,000  │    —    │\n├──────────────┼──────────┼─────────┤\n│ 本期毛利      │ 710,000  │    —    │\n├──────────────┼──────────┼─────────┤\n│ 毛利率        │  74.0%   │    —    │\n└──────────────┴──────────┴─────────┘\n\n注：本期为项目前期准备阶段，成本主要为人工及勘察设计费',
        headers: [
          '成本项目',
          '本期发生',
          '期末结转'
        ],
        rows: [
          [
              '直接人工',
              '117,695',
              '117,695'
          ],
          [
              '勘察设计费',
              '80,000',
              '80,000'
          ],
          [
              '机械使用费',
              '6,458',
              '6,458'
          ],
          [
              '其他直接费',
              '45,847',
              '45,847'
          ],
          [
              '成本合计',
              '250,000',
              '250,000'
          ],
          [
              '本期收入',
              '960,000',
              '—'
          ],
          [
              '本期毛利',
              '710,000',
              '—'
          ],
          [
              '毛利率',
              '74.0%',
              '—'
          ],
        ],
        docTitle: '科 创 园 项 目 成 本 结 转 表',
        signature: '制表：王出纳  审核：李会计'
      }
    ]
  },
  {
    date: '2026-10-26',
    role: 'accountant',
    title: '计提城建税及附加',
    tags: [
      '税费'
    ],
    difficulty: 2,
    description: '本月增值税：销项(27,000+86,400)=113,400-进项(4,550+65,000)=43,850元。计提城建税3,070元，教育费附加1,316元，地方附加877元，合计5,263元。',
    tip: '',
    entries: [
      {
        subjectCode: '6403',
        debit: 5263,
        credit: 0,
        summary: '计提附加',
        explanation: '计提附加。借5263元。'
      },
      {
        subjectCode: '222103',
        debit: 0,
        credit: 3070,
        summary: '城建税',
        explanation: '城建税。贷3070元。'
      },
      {
        subjectCode: '222104',
        debit: 0,
        credit: 2193,
        summary: '附加',
        explanation: '附加。贷2193元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '税费表',
        date: '2026-10-26',
        content: '期间：2026年10月\n\n一、增值税计算\n┌──────────────────┬──────────┐\n│ 项目              │ 金额      │\n├──────────────────┼──────────┤\n│ 销项税额          │ 113,400  │\n│   ├市政尾款        │  27,000  │\n│   └科创园进度款    │  86,400  │\n├──────────────────┼──────────┤\n│ 进项税额          │  69,500  │\n│   ├收尾材料采购    │   4,550  │\n│   └新购施工机械    │  65,000  │\n├──────────────────┼──────────┤\n│ 应交增值税        │  43,900  │\n│ 调整后            │  43,850  │\n└──────────────────┴──────────┘\n\n二、附加税费计算（以增值税43,850为基数）\n┌──────────────┬────────┬──────────┐\n│ 税种          │ 税率   │ 金额      │\n├──────────────┼────────┼──────────┤\n│ 城建税        │   7%   │  3,070   │\n├──────────────┼────────┼──────────┤\n│ 教育费附加    │   3%   │  1,316   │\n├──────────────┼────────┼──────────┤\n│ 地方教育附加  │   2%   │    877   │\n├──────────────┼────────┼──────────┤\n│ 合计          │  12%   │  5,263   │\n└──────────────┴────────┴──────────┘\n\n注：已预缴增值税72,000元，本月留抵28,150元',
        headers: [
          '项目',
          '金额'
        ],
        rows: [
          [
              '销项税额',
              '113,400'
          ],
          [
              '├市政尾款',
              '27,000'
          ],
          [
              '└科创园进度款',
              '86,400'
          ],
          [
              '进项税额',
              '69,500'
          ],
          [
              '├收尾材料采购',
              '4,550'
          ],
          [
              '└新购施工机械',
              '65,000'
          ],
          [
              '应交增值税',
              '43,900'
          ],
          [
              '调整后',
              '43,850'
          ],
        ],
        docTitle: '城 建 税 及 附 加 计 提 表',
        signature: '制表：王出纳  审核：李会计'
      }
    ]
  },
  {
    date: '2026-10-27',
    role: 'accountant',
    title: '银行手续及利息',
    tags: [
      '资金管理'
    ],
    difficulty: 1,
    description: '10月手续费600元，利息3,000元（因收到大额预收款）。',
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
        debit: 3000,
        credit: 0,
        summary: '利息',
        explanation: '利息。借3000元。',
        cashFlowItem: 'cf-op5'
      },
      {
        subjectCode: '6603',
        debit: 0,
        credit: 3000,
        summary: '冲减',
        explanation: '冲减。贷3000元。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '银行手续费回单',
        date: '2026-10-27',
        totalAmount: 600,
        payer: '鼎立建筑工程有限公司',
        payeeName: '工商银行南京分行',
        content: '10月银行手续费',
        refNo: 'YW202610270001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 9876 5432 1098 765'
      },
      {
        type: 'bank',
        label: '存款利息回单',
        date: '2026-10-27',
        totalAmount: 3000,
        payer: '工商银行南京分行',
        payeeName: '鼎立建筑工程有限公司',
        content: '10月存款利息（因大额预收款资金沉淀）',
        refNo: 'LX202610270001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 9876 5432 1098 765',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 0123 4567 8901 234'
      }
    ]
  },
  {
    date: '2026-10-08',
    role: 'accountant',
    title: '科创园项目场地平整费',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '科创园项目开工前进行场地平整，费用25,000元，转账支付。',
    tip: '场地平整费计入"合同履约成本-其他直接费用"。',
    entries: [
      {
        subjectCode: '540105',
        debit: 25000,
        credit: 0,
        summary: '场地平整费',
        explanation: '合同履约成本-其他直接费用增加。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 25000,
        summary: '支付场地平整费',
        explanation: '银行存款减少25,000元。',
        cashFlowItem: 'cf-op6',
        cashFlowExplanation: '其他经营活动现金支出。'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '机械作业发票',
        date: '2026-10-08',
        totalAmount: 25000,
        items: [
          { name: '场地平整机械作业', amount: 25000 }
        ],
      stampText: '已收款'
      }
    ]
  },
  {
    date: '2026-10-15',
    role: 'accountant',
    title: '科创园项目图纸会审费',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '组织专家对科创园项目施工图纸进行会审，费用6,000元，转账支付。',
    tip: '图纸会审费计入"合同履约成本-其他直接费用"。',
    entries: [
      {
        subjectCode: '540105',
        debit: 6000,
        credit: 0,
        summary: '图纸会审费',
        explanation: '合同履约成本-其他直接费用增加。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 6000,
        summary: '支付会审费',
        explanation: '银行存款减少6,000元。',
        cashFlowItem: 'cf-op6',
        cashFlowExplanation: '其他经营活动现金支出。'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '专家服务费发票',
        date: '2026-10-15',
        totalAmount: 6000,
        items: [
          { name: '图纸会审专家费', amount: 6000 }
        ],
      stampText: '已收款'
      }
    ]
  },
  {
    date: '2026-10-22',
    role: 'accountant',
    title: '新项目部办公设备购置',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '科创园项目部新购办公桌椅、文件柜、电脑等办公设备，费用12,000元，转账支付。',
    tip: '项目部办公设备购置计入"合同履约成本-合同成本"。',
    entries: [
      {
        subjectCode: '540101',
        debit: 12000,
        credit: 0,
        summary: '项目部办公设备',
        explanation: '合同履约成本-合同成本增加。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 12000,
        summary: '支付办公设备款',
        explanation: '银行存款减少12,000元。',
        cashFlowItem: 'cf-op6',
        cashFlowExplanation: '其他经营活动现金支出。'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '办公设备发票',
        date: '2026-10-22',
        totalAmount: 12000,
        items: [
          { name: '办公桌椅', amount: 5000 },
          { name: '文件柜', amount: 3000 },
          { name: '电脑及配件', amount: 4000 }
        ],
      stampText: '已收款'
      }
    ]
  },
  {
    date: '2026-10-28',
    role: 'accountant',
    title: '月末结转损益',
    tags: [
      '期末'
    ],
    difficulty: 3,
    description: '月末结转：收入1,260,000元(市政30万+科创园96万)，成本354,000元，税金6,763元，管理费用(25K+9,175+5K+600+10K+50K+2K)101,775元，财务净收入2,400元。',
    tip: '',
    entries: [
      {
        subjectCode: '6001',
        debit: 1260000,
        credit: 0,
        summary: '结转收入',
        explanation: '结转收入。借1260000元。'
      },
      {
        subjectCode: '6401',
        debit: 0,
        credit: 354000,
        summary: '结转成本',
        explanation: '结转成本。贷354000元。'
      },
      {
        subjectCode: '6403',
        debit: 0,
        credit: 6763,
        summary: '结转税金',
        explanation: '结转税金。贷6763元。'
      },
      {
        subjectCode: '6602',
        debit: 0,
        credit: 101775,
        summary: '结转管理',
        explanation: '结转管理。贷101775元。'
      },
      {
        subjectCode: '6603',
        debit: 2400,
        credit: 0,
        summary: '结转财务',
        explanation: '结转财务。借2400元。'
      },
      {
        subjectCode: '4103',
        debit: 0,
        credit: 799862,
        summary: '结转本年利润',
        explanation: '净利润799,862元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '结转表',
        date: '2026-10-28',
        content: '期间：2026年10月\n\n一、收入结转\n┌──────────────┬──────────────────┬──────────┐\n│ 科目          │ 项目              │ 金额      │\n├──────────────┼──────────────────┼──────────┤\n│ 主营业务收入  │ 市政尾款           │ 300,000  │\n├──────────────┼──────────────────┼──────────┤\n│ 主营业务收入  │ 科创园进度款       │ 960,000  │\n├──────────────┼──────────────────┼──────────┤\n│ 收入合计      │  —               │ 1,260,000│\n└──────────────┴──────────────────┴──────────┘\n\n二、成本费用结转\n┌──────────────┬──────────────────┬──────────┐\n│ 科目          │ 明细              │ 金额      │\n├──────────────┼──────────────────┼──────────┤\n│ 主营业务成本  │ 市政最终+科创园    │ 354,000  │\n├──────────────┼──────────────────┼──────────┤\n│ 税金及附加    │ 城建附加           │   6,763  │\n├──────────────┼──────────────────┼──────────┤\n│ 管理费用      │ 工资/社公/办公/折旧│ 101,775  │\n├──────────────┼──────────────────┼──────────┤\n│ 财务费用      │ 利息收支净额       │  −2,400  │\n├──────────────┼──────────────────┼──────────┤\n│ 费用合计      │  —               │ 460,138  │\n└──────────────┴──────────────────┴──────────┘\n\n三、净利润\n  收入1,260,000 − 费用460,138 = 净利润799,862元 ✓\n\n四、结转后余额为零 ✓',
        headers: [
          '科目',
          '项目',
          '金额'
        ],
        rows: [
          [
              '主营业务收入',
              '市政尾款',
              '300,000'
          ],
          [
              '主营业务收入',
              '科创园进度款',
              '960,000'
          ],
          [
              '收入合计',
              '—',
              '1,260,000'
          ],
        ],
        docTitle: '月 末 损 益 结 转 表',
        signature: '制表：王出纳  审核：李会计'
      }
    ]
  },
  {
    date: '2026-10-30',
    role: 'accountant',
    title: '模拟纳税申报',
    tags: [
      '期末',
      '申报'
    ],
    difficulty: 1,
    description: '10月增值税应纳43,850元（预缴72,000元，留抵28,150元），城建税3,070元，教育费附加2,193元。',
    tip: '',
    entries: [],
    documents: [
      {
        type: 'text',
        label: '申报提醒',
        date: '2026-10-30',
        content: '申报期间：2026年10月\n纳税人：鼎立建筑工程有限公司\n\n一、增值税申报\n┌──────────────────┬──────────┐\n│ 项目              │ 金额      │\n├──────────────────┼──────────┤\n│ 销项税额          │ 113,400  │\n├──────────────────┼──────────┤\n│ 进项税额          │  69,500  │\n├──────────────────┼──────────┤\n│ 应交增值税        │  43,900  │\n├──────────────────┼──────────┤\n│ 已预缴            │  72,000  │\n├──────────────────┼──────────┤\n│ 本期留抵          │  28,100  │\n├──────────────────┼──────────┤\n│ 实际应补(退)      │       0  │\n└──────────────────┴──────────┘\n\n二、附加税费（实际为零，因预缴已覆盖）\n  城建税3,070 + 教育费附加2,193 = 5,263元（已包含在预缴中）\n\n三、申报状态：📤 待提交申报（预缴大于应缴，无需补税）',
        headers: [
          '项目',
          '金额'
        ],
        rows: [
          [
              '销项税额',
              '113,400'
          ],
          [
              '进项税额',
              '69,500'
          ],
          [
              '应交增值税',
              '43,900'
          ],
          [
              '已预缴',
              '72,000'
          ],
          [
              '本期留抵',
              '28,100'
          ],
          [
              '实际应补(退)',
              '0'
          ],
        ],
        docTitle: '10 月 税 费 申 报 汇 总 表',
        signature: '财务负责人：李会计'
      }
    ],
    nextAction: 'tax-filing'
  }
]

export default tasks
