/**
 * 建筑业 - 12月教学任务
 *
 * 企业：鼎立建筑工程有限公司
 * 税制：一般纳税人（增值税9%）
 * 准则：CAS 14 新收入准则（投入法/完工百分比）
 * 本月主题：年终决算与利润分配
 */

const tasks = [
  {
    date: '2026-12-01',
    role: 'accountant',
    title: '缴纳11月增值税及附加',
    tags: [
      '税费'
    ],
    difficulty: 2,
    description: '缴纳11月增值税97,998元，城建税6,860元，教育费附加4,900元，合计109,758元。',
    tip: '',
    entries: [
      {
        subjectCode: '222101',
        debit: 97998,
        credit: 0,
        summary: '缴增值税',
        explanation: '缴增值税。借97998元。'
      },
      {
        subjectCode: '222103',
        debit: 6860,
        credit: 0,
        summary: '缴城建税',
        explanation: '缴城建税。借6860元。'
      },
      {
        subjectCode: '222104',
        debit: 4900,
        credit: 0,
        summary: '缴附加',
        explanation: '缴附加。借4900元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 109758,
        summary: '支付',
        explanation: '支付。贷109758元。',
        cashFlowItem: 'cf-op4'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '缴税凭证',
        date: '2026-12-01',
        totalAmount: 109758
      }
    ]
  },
  {
    date: '2026-12-01',
    role: 'accountant',
    title: '缴纳11月社保公积金',
    tags: [
      '工资社保'
    ],
    difficulty: 1,
    description: '缴纳11月社保38,285元，公积金18,600元，合计56,885元。',
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
        summary: '支付',
        explanation: '支付。贷56885元。',
        cashFlowItem: 'cf-op3'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '回单',
        date: '2026-12-01'
      }
    ]
  },
  {
    date: '2026-12-02',
    role: 'accountant',
    title: '发放11月工资',
    tags: [
      '工资社保'
    ],
    difficulty: 1,
    description: '代发11月工资155,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '221101',
        debit: 155000,
        credit: 0,
        summary: '发工资',
        explanation: '发工资。借155000元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 155000,
        summary: '代发',
        explanation: '代发。贷155000元。',
        cashFlowItem: 'cf-op3'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '代发回单',
        date: '2026-12-02',
        totalAmount: 155000
      }
    ]
  },
  {
    date: '2026-12-03',
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
        summary: '备用金',
        explanation: '备用金。借25000元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 25000,
        summary: '提取',
        explanation: '提取。贷25000元。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '现金支票',
        date: '2026-12-03',
        totalAmount: 25000
      }
    ]
  },
  {
    date: '2026-12-04',
    role: 'accountant',
    title: '科创园-主体施工推进',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '科创园项目采购12月主体材料：钢筋40吨（168,000元），混凝土500m³（200,000元），合计368,000元，增值税47,840元。',
    tip: '',
    entries: [
      {
        subjectCode: '540102',
        debit: 368000,
        credit: 0,
        summary: '采购主体材料',
        explanation: '采购主体材料。借368000元。'
      },
      {
        subjectCode: '222101',
        debit: 47840,
        credit: 0,
        summary: '进项税额',
        explanation: '进项税额。借47840元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 415840,
        summary: '支付',
        explanation: '支付。贷415840元。',
        cashFlowItem: 'cf-op2'
      }
    ],
    documents: [
      {
        type: 'invoice',
        label: '发票',
        date: '2026-12-04',
        totalAmount: 415840,
        lineItems: [
          {
            name: '钢筋',
            qty: 40,
            unit: '吨',
            price: 4200,
            amount: 168000
          },
          {
            name: '商品混凝土',
            qty: 500,
            unit: 'm³',
            price: 400,
            amount: 200000
          }
        ]
      }
    ]
  },
  {
    date: '2026-12-05',
    role: 'accountant',
    title: '支付机械及周转材料费',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '12月塔吊租金50,000元，脚手架25,000元，机械燃油20,000元，合计95,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '540104',
        debit: 70000,
        credit: 0,
        summary: '塔吊+机械燃油',
        explanation: '塔吊+机械燃油。借70000元。'
      },
      {
        subjectCode: '540105',
        debit: 25000,
        credit: 0,
        summary: '脚手架租赁',
        explanation: '脚手架租赁。借25000元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 95000,
        summary: '支付',
        explanation: '支付。贷95000元。',
        cashFlowItem: 'cf-op6'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '机械及周转',
        date: '2026-12-05',
        totalAmount: 95000,
        items: [
          {
            name: '塔吊租金',
            amount: 50000
          },
          {
            name: '脚手架',
            amount: 25000
          },
          {
            name: '燃油费',
            amount: 20000
          }
        ]
      }
    ]
  },
  {
    date: '2026-12-05',
    role: 'accountant',
    title: '支付水电费',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '12月水电费22,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '540105',
        debit: 22000,
        credit: 0,
        summary: '水电费',
        explanation: '水电费。借22000元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 22000,
        summary: '支付',
        explanation: '支付。贷22000元。',
        cashFlowItem: 'cf-op6'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '水电费',
        date: '2026-12-05',
        totalAmount: 22000
      }
    ]
  },
  {
    date: '2026-12-08',
    role: 'accountant',
    title: '项目部及公司费用',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '12月项目差旅4,000元，办公2,500元，公司办公6,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '540105',
        debit: 4000,
        credit: 0,
        summary: '差旅',
        explanation: '差旅。借4000元。'
      },
      {
        subjectCode: '540106',
        debit: 2500,
        credit: 0,
        summary: '办公',
        explanation: '办公。借2500元。'
      },
      {
        subjectCode: '6602',
        debit: 6000,
        credit: 0,
        summary: '公司办公',
        explanation: '公司办公。借6000元。'
      },
      {
        subjectCode: '1001',
        debit: 0,
        credit: 6500,
        summary: '现金',
        explanation: '现金。贷6500元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 6000,
        summary: '转账',
        explanation: '转账。贷6000元。',
        cashFlowItem: 'cf-op6'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '费用',
        date: '2026-12-08',
        totalAmount: 12500
      }
    ]
  },
  {
    date: '2026-12-09',
    role: 'accountant',
    title: '科创园-工程进度确认',
    tags: [
      '工程合同'
    ],
    difficulty: 3,
    description: '科创园项目累计完工进度40%（本月新增15%）。确认收入：1,200万×40%-已确认3,000,000=1,800,000元（不含税），增值税162,000元。合同负债余额：360万-96万-120万=144万元，本次冲减144万，差额计入应收。',
    tip: '',
    entries: [
      {
        subjectCode: '2205',
        debit: 1440000,
        credit: 0,
        summary: '合同负债冲减',
        explanation: '合同负债冲减。借1440000元。'
      },
      {
        subjectCode: '1122',
        debit: 522000,
        credit: 0,
        summary: '应收账款-科创园',
        explanation: '应收账款-科创园。借522000元。'
      },
      {
        subjectCode: '222101',
        debit: 0,
        credit: 162000,
        summary: '销项税额',
        explanation: '销项税额。贷162000元。'
      },
      {
        subjectCode: '6001',
        debit: 0,
        credit: 1800000,
        summary: '确认收入-科创园',
        explanation: '确认收入-科创园。贷1800000元。'
      }
    ],
    documents: [
      {
        type: 'invoice',
        label: '发票',
        date: '2026-12-09',
        lineItems: [
          {
            name: '科创园项目进度款（累计40%）',
            qty: 1,
            unit: '项',
            price: 1800000,
            amount: 1800000
          }
        ],
        totalAmount: 1962000
      }
    ]
  },
  {
    date: '2026-12-09',
    role: 'accountant',
    title: '结转科创园成本',
    tags: [
      '工程合同'
    ],
    difficulty: 3,
    description: '科创园成本：材料368,000+人工(90K+33,030+56,680)=179,710+劳务(信达后续)=0(本月未增加)+机械(70K+6,458)=76,458+其他(25K+22K+4K+2.5K)=53,500=677,668元。',
    tip: '',
    entries: [
      {
        subjectCode: '6401',
        debit: 677668,
        credit: 0,
        summary: '结转科创园成本',
        explanation: '结转科创园成本。借677668元。'
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
        credit: 368000,
        summary: '材料转出',
        explanation: '材料转出。贷368000元。'
      },
      {
        subjectCode: '540104',
        debit: 0,
        credit: 76458,
        summary: '机械转出',
        explanation: '机械转出。贷76458元。'
      },
      {
        subjectCode: '540105',
        debit: 0,
        credit: 53500,
        summary: '其他转出',
        explanation: '其他转出。贷53500元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '成本表',
        date: '2026-12-09',
        content: '677,668元\n毛利1,122,332元'
      }
    ]
  },
  {
    date: '2026-12-10',
    role: 'accountant',
    title: '科创园-分包付款',
    tags: [
      '分包管理'
    ],
    difficulty: 2,
    description: '支付信达劳务分包进度款800,000元（含税），扣除前期已付部分。',
    tip: '',
    entries: [
      {
        subjectCode: '2202',
        debit: 800000,
        credit: 0,
        summary: '支付信达劳务款',
        explanation: '支付信达劳务款。借800000元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 800000,
        summary: '支付',
        explanation: '支付。贷800000元。',
        cashFlowItem: 'cf-op2'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '回单',
        date: '2026-12-10',
        totalAmount: 800000,
        content: '付信达劳务分包款'
      }
    ]
  },
  {
    date: '2026-12-11',
    role: 'accountant',
    title: '收到科创园10月进度款',
    tags: [
      '往来管理'
    ],
    difficulty: 1,
    description: '收到科创园项目10月进度款1,023,600元。',
    tip: '',
    entries: [
      {
        subjectCode: '100201',
        debit: 1023600,
        credit: 0,
        summary: '收科创园款',
        explanation: '收科创园款。借1023600元。',
        cashFlowItem: 'cf-op1'
      },
      {
        subjectCode: '1122',
        debit: 0,
        credit: 1023600,
        summary: '应收减少',
        explanation: '应收减少。贷1023600元。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '收款回单',
        date: '2026-12-11',
        totalAmount: 1023600
      }
    ]
  },
  {
    date: '2026-12-12',
    role: 'accountant',
    title: '临时设施报废处理',
    tags: [
      '工程成本'
    ],
    difficulty: 2,
    description: '科创园现场临时设施部分拆除，账面净值10,000元，残料回收3,000元，净损失7,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '540105',
        debit: 7000,
        credit: 0,
        summary: '临设报废净损失',
        explanation: '临设报废净损失。借7000元。'
      },
      {
        subjectCode: '1001',
        debit: 3000,
        credit: 0,
        summary: '残料收入',
        explanation: '库存现金增加。'
      },
      {
        subjectCode: '1801',
        debit: 0,
        credit: 10000,
        summary: '临时设施减少',
        explanation: '余额归零。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '临设报废单',
        date: '2026-12-12',
        content: '原值60,000已摊50,000，净值10,000\n回收3,000元\n净损失7,000元',
        signature: '项目经理'
      }
    ]
  },
  {
    date: '2026-12-15',
    role: 'accountant',
    title: '计提12月职工薪酬',
    tags: [
      '工资社保'
    ],
    difficulty: 2,
    description: '计提12月工资：施工100,000元，项目部40,000元，公司25,000元，合计165,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '540101',
        debit: 100000,
        credit: 0,
        summary: '施工工资',
        explanation: '施工工资。借100000元。'
      },
      {
        subjectCode: '540106',
        debit: 40000,
        credit: 0,
        summary: '项目部工资',
        explanation: '项目部工资。借40000元。'
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
        credit: 165000,
        summary: '应付薪酬',
        explanation: '应付薪酬。贷165000元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '工资表',
        date: '2026-12-15',
        content: '165,000元'
      }
    ]
  },
  {
    date: '2026-12-15',
    role: 'accountant',
    title: '计提12月社保公积金',
    tags: [
      '工资社保'
    ],
    difficulty: 2,
    description: '165K×36.7%=60,555元。',
    tip: '',
    entries: [
      {
        subjectCode: '540101',
        debit: 36700,
        credit: 0,
        summary: '施工社公',
        explanation: '施工社公。借36700元。'
      },
      {
        subjectCode: '540106',
        debit: 14680,
        credit: 0,
        summary: '项目部社公',
        explanation: '项目部社公。借14680元。'
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
        credit: 40755,
        summary: '社保',
        explanation: '社保。贷40755元。'
      },
      {
        subjectCode: '221103',
        debit: 0,
        credit: 19800,
        summary: '公积金',
        explanation: '公积金。贷19800元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '计提表',
        date: '2026-12-15',
        content: '60,555元'
      }
    ]
  },
  {
    date: '2026-12-15',
    role: 'accountant',
    title: '计提固定资产折旧',
    tags: [
      '工程成本'
    ],
    difficulty: 2,
    description: '12月折旧：施工6,458元，办公600元。',
    tip: '',
    entries: [
      {
        subjectCode: '540104',
        debit: 6458,
        credit: 0,
        summary: '施工折旧',
        explanation: '施工折旧。借6458元。'
      },
      {
        subjectCode: '6602',
        debit: 600,
        credit: 0,
        summary: '办公折旧',
        explanation: '办公折旧。借600元。'
      },
      {
        subjectCode: '1602',
        debit: 0,
        credit: 7058,
        summary: '累计折旧',
        explanation: '累计折旧。贷7058元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '折旧表',
        date: '2026-12-15'
      }
    ]
  },
  {
    date: '2026-12-15',
    role: 'accountant',
    title: '摊销预付租金（最后一个月）',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '摊销最后一笔预付办公租金10,000元，预付账款余额归零。',
    tip: '',
    entries: [
      {
        subjectCode: '6602',
        debit: 10000,
        credit: 0,
        summary: '房租最后摊销',
        explanation: '房租最后摊销。借10000元。'
      },
      {
        subjectCode: '1123',
        debit: 0,
        credit: 10000,
        summary: '预付租金清零',
        explanation: '余额0元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '租金摊销',
        date: '2026-12-15',
        content: '预付租金摊销完毕 ✅'
      }
    ]
  },
  {
    date: '2026-12-18',
    role: 'accountant',
    title: '间接费用归集与分摊',
    tags: [
      '工程成本'
    ],
    difficulty: 3,
    description: '间接费40,000+14,680+2,500=57,180元，全额分配科创园。',
    tip: '',
    entries: [
      {
        subjectCode: '540101',
        debit: 57180,
        credit: 0,
        summary: '间接-科创园',
        explanation: '间接-科创园。借57180元。'
      },
      {
        subjectCode: '540106',
        debit: 0,
        credit: 57180,
        summary: '间接转出',
        explanation: '间接转出。贷57180元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '间接费表',
        date: '2026-12-18',
        content: '57,180元'
      }
    ]
  },
  {
    date: '2026-12-19',
    role: 'accountant',
    title: '计提企业所得税',
    tags: [
      '期末'
    ],
    difficulty: 3,
    description: '测算全年利润后计提所得税。全年累计利润暂估约：前序各月净利润合计(140,751+300,188+242,462+162,208+129,635+519,776+619,891+364,648-42,528+799,862-657,945+本月)=约3,538,948元。按25%计提所得税884,737元。',
    tip: '',
    entries: [
      {
        subjectCode: '6801',
        debit: 884737,
        credit: 0,
        summary: '计提所得税费用',
        explanation: '计提所得税费用。借884737元。'
      },
      {
        subjectCode: '222106',
        debit: 0,
        credit: 884737,
        summary: '应交企业所得税',
        explanation: '应交企业所得税。贷884737元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '所得税计提表',
        date: '2026-12-19',
        content: '全年利润约3,538,948×25%=884,737元'
      }
    ]
  },
  {
    date: '2026-12-20',
    role: 'accountant',
    title: '结转科创园成本（调整后）',
    tags: [
      '工程合同'
    ],
    difficulty: 3,
    description: '12月成本调整：人工(100K+36,700+57,180)=193,880+材料368,000+机械76,458+其他(22K+4K+7K)=33,000+临设7,000=678,338元。',
    tip: '',
    entries: [
      {
        subjectCode: '6401',
        debit: 678338,
        credit: 0,
        summary: '结转科创园12月成本',
        explanation: '结转科创园12月成本。借678338元。'
      },
      {
        subjectCode: '540101',
        debit: 0,
        credit: 193880,
        summary: '人工转出',
        explanation: '人工转出。贷193880元。'
      },
      {
        subjectCode: '540102',
        debit: 0,
        credit: 368000,
        summary: '材料转出',
        explanation: '材料转出。贷368000元。'
      },
      {
        subjectCode: '540104',
        debit: 0,
        credit: 76458,
        summary: '机械转出',
        explanation: '机械转出。贷76458元。'
      },
      {
        subjectCode: '540105',
        debit: 0,
        credit: 40000,
        summary: '其他转出',
        explanation: '其他转出。贷40000元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '成本表',
        date: '2026-12-20',
        content: '678,338元'
      }
    ]
  },
  {
    date: '2026-12-23',
    role: 'accountant',
    title: '计提城建税及附加',
    tags: [
      '税费'
    ],
    difficulty: 2,
    description: '本月增值税：销项162,000-进项47,840=114,160元。计提城建税7,991元，教育费附加3,425元，地方附加2,283元，合计13,699元。',
    tip: '',
    entries: [
      {
        subjectCode: '6403',
        debit: 13699,
        credit: 0,
        summary: '计提附加',
        explanation: '计提附加。借13699元。'
      },
      {
        subjectCode: '222103',
        debit: 0,
        credit: 7991,
        summary: '城建税',
        explanation: '城建税。贷7991元。'
      },
      {
        subjectCode: '222104',
        debit: 0,
        credit: 5708,
        summary: '附加',
        explanation: '附加。贷5708元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '税费表',
        date: '2026-12-23',
        content: '114,160×12%=13,699元'
      }
    ]
  },
  {
    date: '2026-12-24',
    role: 'accountant',
    title: '银行手续及利息',
    tags: [
      '资金管理'
    ],
    difficulty: 1,
    description: '12月手续费800元，利息4,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '6603',
        debit: 800,
        credit: 0,
        summary: '手续费',
        explanation: '手续费。借800元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 800,
        summary: '银行手续费',
        explanation: '银行手续费。贷800元。'
      },
      {
        subjectCode: '100201',
        debit: 4000,
        credit: 0,
        summary: '利息',
        explanation: '利息。借4000元。',
        cashFlowItem: 'cf-op5'
      },
      {
        subjectCode: '6603',
        debit: 0,
        credit: 4000,
        summary: '冲减',
        explanation: '冲减。贷4000元。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '回单',
        date: '2026-12-24'
      }
    ]
  },
  {
    date: '2026-12-25',
    role: 'accountant',
    title: '年末结转损益',
    tags: [
      '期末'
    ],
    difficulty: 3,
    description: '年末结转：收入1,800,000元，成本678,338元，税金15,199元，管理费用(25K+9,175+6K+600+10K)50,775元，信用减值损失无新增，所得税费用884,737元，财务净收入3,200元。',
    tip: '',
    entries: [
      {
        subjectCode: '6001',
        debit: 1800000,
        credit: 0,
        summary: '结转收入',
        explanation: '结转收入。借1800000元。'
      },
      {
        subjectCode: '6401',
        debit: 0,
        credit: 678338,
        summary: '结转成本',
        explanation: '结转成本。贷678338元。'
      },
      {
        subjectCode: '6403',
        debit: 0,
        credit: 15199,
        summary: '结转税金',
        explanation: '结转税金。贷15199元。'
      },
      {
        subjectCode: '6602',
        debit: 0,
        credit: 50775,
        summary: '结转管理',
        explanation: '结转管理。贷50775元。'
      },
      {
        subjectCode: '6603',
        debit: 3200,
        credit: 0,
        summary: '结转财务',
        explanation: '结转财务。借3200元。'
      },
      {
        subjectCode: '6801',
        debit: 0,
        credit: 884737,
        summary: '结转所得税费用',
        explanation: '结转所得税费用。贷884737元。'
      },
      {
        subjectCode: '4103',
        debit: 0,
        credit: 174151,
        summary: '结转本年利润',
        explanation: '净利润174,151元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '结转表',
        date: '2026-12-25',
        content: '净利润174,151元。全年净利润需看累计额。'
      }
    ]
  },
  {
    date: '2026-12-26',
    role: 'accountant',
    title: '全年利润清算',
    tags: [
      '期末'
    ],
    difficulty: 3,
    description: '全年累计净利润核算。各月净利润累加：140,751+300,188+242,462+162,208+129,635+519,776+619,891+364,648-42,528+799,862-657,945+174,151=3,713,099元。所得税884,737元。税后净利润2,828,362元。',
    tip: '年末清算全年利润是企业的法定义务。',
    entries: [],
    documents: [
      {
        type: 'text',
        label: '全年利润汇总',
        date: '2026-12-26',
        docTitle: '2026年度利润汇总表',
        content: '全年利润总额：3,713,099元\n所得税费用：884,737元\n税后净利润：2,828,362元\n平均月净利：235,697元',
        signature: '总会计师'
      }
    ]
  },
  {
    date: '2026-12-27',
    role: 'accountant',
    title: '提取盈余公积',
    tags: [
      '期末'
    ],
    difficulty: 3,
    description: '按税后净利润2,828,362元的10%提取法定盈余公积282,836元。',
    tip: '法定盈余公积累计达到注册资本50%时可不再提取。',
    entries: [
      {
        subjectCode: '410402',
        debit: 282836,
        credit: 0,
        summary: '提取法定盈余公积',
        explanation: '提取法定盈余公积。借282836元。'
      },
      {
        subjectCode: '410415',
        debit: 0,
        credit: 282836,
        summary: '盈余公积-法定',
        explanation: '盈余公积增加。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '盈余公积提取表',
        date: '2026-12-27',
        content: '税后净利润2,828,362×10%=282,836元\n依据：《公司法》第一百六十六条',
        signature: '董事会决议'
      }
    ]
  },
  {
    date: '2026-12-28',
    role: 'accountant',
    title: '计算应付股东利润',
    tags: [
      '期末'
    ],
    difficulty: 3,
    description: '经股东会决议，将税后净利润的40%向股东分配利润，计1,131,345元。剩余未分配利润转入下年。',
    tip: '',
    entries: [
      {
        subjectCode: '410402',
        debit: 1131345,
        credit: 0,
        summary: '应付股东利润',
        explanation: '利润分配减少。'
      },
      {
        subjectCode: '224101',
        debit: 0,
        credit: 1131345,
        summary: '应付利润-股东',
        explanation: '其他应付款-应付利润增加。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '利润分配决议',
        date: '2026-12-28',
        docTitle: '2026年度利润分配决议',
        content: '税后净利润：2,828,362元\n提取盈余公积：282,836元（10%）\n分配股东利润：1,131,345元（40%）\n未分配利润结余：1,414,181元（50%）',
        signature: '股东会签字'
      }
    ]
  },
  {
    date: '2026-12-29',
    role: 'accountant',
    title: '结转利润分配',
    tags: [
      '期末'
    ],
    difficulty: 3,
    description: '将本年利润余额和利润分配各明细科目结转。净利润2,828,362元转入利润分配-未分配利润。',
    tip: '',
    entries: [
      {
        subjectCode: '4103',
        debit: 2828362,
        credit: 0,
        summary: '本年利润转入利润分配',
        explanation: '本年利润转入利润分配。借2828362元。'
      },
      {
        subjectCode: '410401',
        debit: 0,
        credit: 2828362,
        summary: '利润分配-未分配利润',
        explanation: '利润分配-未分配利润。贷2828362元。'
      },
      {
        subjectCode: '410401',
        debit: 282836,
        credit: 0,
        summary: '提取盈余公积转入',
        explanation: '提取盈余公积转入。借282836元。'
      },
      {
        subjectCode: '410402',
        debit: 0,
        credit: 282836,
        summary: '提取法定盈余公积',
        explanation: '提取法定盈余公积。贷282836元。'
      },
      {
        subjectCode: '410401',
        debit: 1131345,
        credit: 0,
        summary: '应付利润转入',
        explanation: '应付利润转入。借1131345元。'
      },
      {
        subjectCode: '410402',
        debit: 0,
        credit: 1131345,
        summary: '应付股东利润',
        explanation: '应付股东利润。贷1131345元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '利润分配结转表',
        date: '2026-12-29',
        content: '未分配利润余额：2,828,362-282,836-1,131,345=1,414,181元',
        signature: '李会计'
      }
    ]
  },
  {
    date: '2026-12-30',
    role: 'accountant',
    title: '计提年终奖金',
    tags: [
      '工资社保'
    ],
    difficulty: 2,
    description: '计提管理层年终奖金200,000元。施工人员年终奖150,000元（按项目部分配），项目部50,000元，公司管理80,000元，合计280,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '540101',
        debit: 150000,
        credit: 0,
        summary: '施工年终奖-科创园',
        explanation: '施工年终奖-科创园。借150000元。'
      },
      {
        subjectCode: '540106',
        debit: 50000,
        credit: 0,
        summary: '项目部年终奖',
        explanation: '项目部年终奖。借50000元。'
      },
      {
        subjectCode: '6602',
        debit: 80000,
        credit: 0,
        summary: '管理年终奖',
        explanation: '管理年终奖。借80000元。'
      },
      {
        subjectCode: '221101',
        debit: 0,
        credit: 280000,
        summary: '应付年终奖',
        explanation: '应付年终奖。贷280000元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '年终奖计提表',
        date: '2026-12-30',
        docTitle: '2026年度年终奖计提表',
        content: '施工人员：150,000元\n项目部：50,000元\n公司管理：80,000元\n合计：280,000元',
        signature: '人事部'
      }
    ]
  },
  {
    date: '2026-12-30',
    role: 'accountant',
    title: '全年所得税汇算调整',
    tags: [
      '期末'
    ],
    difficulty: 3,
    description: '对全年所得税进行汇算清缴。账面利润3,713,099元，纳税调增项：业务招待费超支15,000元，坏账准备51,000元。应纳税所得额3,779,099元，应纳所得税944,775元。已计提884,737元，补提60,038元。',
    tip: '',
    entries: [
      {
        subjectCode: '6801',
        debit: 60038,
        credit: 0,
        summary: '补提所得税',
        explanation: '所得税费用增加。'
      },
      {
        subjectCode: '222106',
        debit: 0,
        credit: 60038,
        summary: '补交所得税调整',
        explanation: '补交所得税调整。贷60038元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '汇算清缴调整表',
        date: '2026-12-30',
        content: '应纳税所得额3,779,099×25%=944,775\n已计提884,737\n补提60,038',
        signature: '税务顾问'
      }
    ]
  },
  {
    date: '2026-12-31',
    role: 'accountant',
    title: '年末结转与报表',
    tags: [
      '期末'
    ],
    difficulty: 3,
    description: '完成全年账务处理，编制年度财务报表。资产负债表、利润表、现金流量表数据齐全。',
    tip: '年末结转后，全年会计工作完成。',
    entries: [],
    documents: [
      {
        type: 'text',
        label: '年度结转完成',
        date: '2026-12-31',
        docTitle: '2026年度账务处理完成确认书',
        content: '✅ 全年凭证已全部过账\n✅ 期末结转已完成\n✅ 利润分配已完成\n✅ 所得税汇算已调整\n✅ 年度报表可编制\n\n企业：鼎立建筑工程有限公司\n会计年度：2026年1月-12月',
        signature: '财务专用章'
      }
    ],
    nextAction: 'tax-filing'
  }
]

export default tasks
