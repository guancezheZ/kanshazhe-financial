/**
 * 建筑业 - 8月教学任务
 *
 * 企业：鼎立建筑工程有限公司
 * 税制：一般纳税人（增值税9%）
 * 准则：CAS 14 新收入准则（投入法/完工百分比）
 * 本月主题：高温雨季施工与成本管控
 */

const tasks = [
  {
    date: '2026-08-03',
    role: 'accountant',
    title: '缴纳7月增值税及附加',
    tags: [
      '税费'
    ],
    difficulty: 2,
    description: '缴纳7月增值税72,530元，城建税5,077元，教育费附加3,627元，合计81,234元。',
    tip: '',
    entries: [
      {
        subjectCode: '222101',
        debit: 72530,
        credit: 0,
        summary: '缴增值税',
        explanation: '缴增值税。借72530元。'
      },
      {
        subjectCode: '222103',
        debit: 5077,
        credit: 0,
        summary: '缴城建税',
        explanation: '缴城建税。借5077元。'
      },
      {
        subjectCode: '222104',
        debit: 3627,
        credit: 0,
        summary: '缴附加',
        explanation: '缴附加。借3627元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 81234,
        summary: '支付',
        explanation: '支付。贷81234元。',
        cashFlowItem: 'cf-op4'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '缴税凭证',
        date: '2026-08-03',
        totalAmount: 81234
      }
    ]
  },
  {
    date: '2026-08-03',
    role: 'accountant',
    title: '缴纳7月社保及公积金',
    tags: [
      '工资社保'
    ],
    difficulty: 1,
    description: '缴纳7月社保40,755元，公积金19,800元，合计60,555元。',
    tip: '',
    entries: [
      {
        subjectCode: '221102',
        debit: 40755,
        credit: 0,
        summary: '缴社保',
        explanation: '缴社保。借40755元。'
      },
      {
        subjectCode: '221103',
        debit: 19800,
        credit: 0,
        summary: '缴公积金',
        explanation: '缴公积金。借19800元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 60555,
        summary: '支付',
        explanation: '支付。贷60555元。',
        cashFlowItem: 'cf-op3'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '社保回单',
        totalAmount: 40755
      },
      {
        type: 'bank',
        label: '公积金回单',
        totalAmount: 19800
      }
    ]
  },
  {
    date: '2026-08-04',
    role: 'accountant',
    title: '发放7月职工工资',
    tags: [
      '工资社保'
    ],
    difficulty: 1,
    description: '代发7月工资165,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '221101',
        debit: 165000,
        credit: 0,
        summary: '发工资',
        explanation: '发工资。借165000元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 165000,
        summary: '代发',
        explanation: '代发。贷165000元。',
        cashFlowItem: 'cf-op3'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '代发回单',
        date: '2026-08-04',
        totalAmount: 165000
      }
    ]
  },
  {
    date: '2026-08-05',
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
        date: '2026-08-05',
        totalAmount: 20000
      }
    ]
  },
  {
    date: '2026-08-05',
    role: 'accountant',
    title: '雨季施工专项措施费',
    tags: [
      '工程成本'
    ],
    difficulty: 2,
    description: '8月进入雨季，施工现场需搭设防雨棚、增加排水设施等措施，发生费用25,000元。',
    tip: '雨季施工措施费是建筑业季节性支出，计入其他直接费用。',
    entries: [
      {
        subjectCode: '540105',
        debit: 25000,
        credit: 0,
        summary: '雨季施工措施费',
        explanation: '其他直接费增加。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 25000,
        summary: '支付',
        explanation: '支付。贷25000元。',
        cashFlowItem: 'cf-op6'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '措施费明细',
        date: '2026-08-05',
        totalAmount: 25000,
        items: [
          {
            name: '防雨棚搭设',
            amount: 12000
          },
          {
            name: '排水设备租赁',
            amount: 8000
          },
          {
            name: '防汛物资',
            amount: 5000
          }
        ]
      }
    ]
  },
  {
    date: '2026-08-06',
    role: 'accountant',
    title: '恒达项目-竣工验收通过',
    tags: [
      '工程合同'
    ],
    difficulty: 2,
    description: '恒达地产办公楼工程通过竣工验收，获得竣工验收备案证。工程质量评定为合格。',
    tip: '竣工验收是工程项目的重要里程碑，标志着施工任务完成。',
    entries: [],
    documents: [
      {
        type: 'text',
        label: '竣工验收报告',
        date: '2026-08-06',
        docTitle: '工 程 竣 工 验 收 报 告',
        content: '工程名称：恒达地产办公楼建设工程\n验收结论：合格 ✓\n验收日期：2026年8月6日\n参验单位：恒达地产、鼎立建筑、设计院、监理公司\n验收意见：同意通过',
        signature: '四方签字'
      }
    ]
  },
  {
    date: '2026-08-07',
    role: 'accountant',
    title: '恒达项目-竣工结算申请',
    tags: [
      '工程合同'
    ],
    difficulty: 3,
    description: '恒达项目竣工结算。根据合同及变更签证，最终结算价款：原合同500万+设计变更100万+签证15万=615万元（不含税）。向甲方提交竣工结算书。',
    tip: '竣工结算是确定最终工程价款的关键环节。结算价常与合同价不同。',
    entries: [
      {
        subjectCode: '1122',
        debit: 545000,
        credit: 0,
        summary: '应收账款-恒达（竣工结算尾款含税）',
        explanation: '结算尾款含变更、签证和增值税。'
      },
      {
        subjectCode: '222101',
        debit: 0,
        credit: 45000,
        summary: '增值税销项（50万×9%）',
        explanation: '增值税销项（50万×9%）。贷45000元。'
      },
      {
        subjectCode: '6001',
        debit: 0,
        credit: 500000,
        summary: '确认收入-恒达竣工结算',
        explanation: '项目竣工后确认剩余收入。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '竣工结算书',
        date: '2026-08-07',
        docTitle: '工 程 竣 工 结 算 书',
        content: '工程：恒达地产办公楼\n原合同：5,000,000元\n变更增加：1,000,000元\n签证增加：150,000元\n结算总价：6,150,000元（不含税）\n累计已确认收入：5,652,000元\n本次结算尾款：498,000元',
        signature: '项目经理 造价工程师'
      }
    ]
  },
  {
    date: '2026-08-08',
    role: 'accountant',
    title: '临时设施拆除清理',
    tags: [
      '工程成本'
    ],
    difficulty: 2,
    description: '恒达项目完工，现场临时设施开始拆除。拆除费用8,000元，残料回收收入2,000元（冲减成本）。',
    tip: '项目完工后需拆除临时设施、清理场地。',
    entries: [
      {
        subjectCode: '540105',
        debit: 6000,
        credit: 0,
        summary: '临设拆除净支出（8,000-2,000）',
        explanation: '临设拆除净支出（8,000-2,000）。借6000元。'
      },
      {
        subjectCode: '1001',
        debit: 2000,
        credit: 0,
        summary: '残料回收收入',
        explanation: '现金增加，冲减拆除费。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 8000,
        summary: '支付拆除费',
        explanation: '银行存款减少。',
        cashFlowItem: 'cf-op6'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '拆除费',
        date: '2026-08-08',
        totalAmount: 8000
      },
      {
        type: 'receipt',
        label: '废品回收收入',
        totalAmount: 2000
      }
    ]
  },
  {
    date: '2026-08-10',
    role: 'accountant',
    title: '市政项目材料采购',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '市政项目采购沥青混凝土200吨（单价500），价款100,000元，增值税13,000元，合计113,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '540102',
        debit: 100000,
        credit: 0,
        summary: '采购沥青',
        explanation: '采购沥青。借100000元。'
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
        summary: '支付',
        explanation: '支付。贷113000元。',
        cashFlowItem: 'cf-op2'
      }
    ],
    documents: [
      {
        type: 'invoice',
        label: '发票',
        date: '2026-08-10',
        totalAmount: 113000,
        lineItems: [
          {
            name: '沥青混凝土',
            qty: 200,
            unit: '吨',
            price: 500,
            amount: 100000
          }
        ]
      }
    ]
  },
  {
    date: '2026-08-11',
    role: 'accountant',
    title: '恒达项目-质保金扣留',
    tags: [
      '往来管理'
    ],
    difficulty: 2,
    description: '竣工结算尾款498,000元中，甲方扣留5%质保金30,750元，实际到账467,250元。质保期2年。',
    tip: '质保金是建筑业通行做法，通过"其他应付款-质保金"或按新准则通过"合同资产"核算。',
    entries: [
      {
        subjectCode: '100201',
        debit: 467250,
        credit: 0,
        summary: '收到恒达竣工尾款',
        explanation: '收到恒达竣工尾款。借467250元。',
        cashFlowItem: 'cf-op1'
      },
      {
        subjectCode: '224101',
        debit: 30750,
        credit: 0,
        summary: '扣留质保金（615万×5%原口径调整）',
        explanation: '扣留质保金（615万×5%原口径调整）。借30750元。'
      },
      {
        subjectCode: '1122',
        debit: 0,
        credit: 498000,
        summary: '应收账款减少',
        explanation: '全额冲减。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '收款回单',
        date: '2026-08-11',
        totalAmount: 467250,
        content: '恒达项目竣工尾款（扣质保金）'
      }
    ]
  },
  {
    date: '2026-08-11',
    role: 'accountant',
    title: '塔吊退租',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '恒达项目完工，塔吊退租。支付8月塔吊租金15,000元后退还租赁公司。',
    tip: '',
    entries: [
      {
        subjectCode: '540104',
        debit: 15000,
        credit: 0,
        summary: '塔吊租金8月',
        explanation: '塔吊租金8月。借15000元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 15000,
        summary: '支付',
        explanation: '支付。贷15000元。',
        cashFlowItem: 'cf-op6'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '回单',
        date: '2026-08-11',
        totalAmount: 15000,
        content: '塔吊退租'
      }
    ]
  },
  {
    date: '2026-08-12',
    role: 'accountant',
    title: '机械燃油维修费',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '8月机械燃油费8,000元，维修费3,000元，合计11,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '540104',
        debit: 11000,
        credit: 0,
        summary: '机械费',
        explanation: '机械费。借11000元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 11000,
        summary: '支付',
        explanation: '支付。贷11000元。',
        cashFlowItem: 'cf-op6'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '燃油维修',
        date: '2026-08-12',
        totalAmount: 11000
      }
    ]
  },
  {
    date: '2026-08-13',
    role: 'accountant',
    title: '水电费',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '8月水电费12,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '540105',
        debit: 12000,
        credit: 0,
        summary: '水电费',
        explanation: '水电费。借12000元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 12000,
        summary: '支付',
        explanation: '支付。贷12000元。',
        cashFlowItem: 'cf-op6'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '水电费',
        date: '2026-08-13',
        totalAmount: 12000
      }
    ]
  },
  {
    date: '2026-08-14',
    role: 'accountant',
    title: '高温补贴（8月）',
    tags: [
      '工资社保'
    ],
    difficulty: 2,
    description: '发放8月高温补贴：市政项目20人×300=6,000元，项目部5人×300=1,500元，合计7,500元。',
    tip: '',
    entries: [
      {
        subjectCode: '540101',
        debit: 6000,
        credit: 0,
        summary: '高温补贴-市政施工',
        explanation: '高温补贴-市政施工。借6000元。'
      },
      {
        subjectCode: '540106',
        debit: 1500,
        credit: 0,
        summary: '高温补贴-项目部',
        explanation: '高温补贴-项目部。借1500元。'
      },
      {
        subjectCode: '1001',
        debit: 0,
        credit: 7500,
        summary: '现金发放',
        explanation: '现金发放。贷7500元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '高温补贴表',
        date: '2026-08-14',
        content: '7,500元'
      }
    ]
  },
  {
    date: '2026-08-14',
    role: 'accountant',
    title: '项目及办公费',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '报销8月项目差旅3,000元、办公1,800元，公司办公5,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '540105',
        debit: 3000,
        credit: 0,
        summary: '差旅',
        explanation: '差旅。借3000元。'
      },
      {
        subjectCode: '540106',
        debit: 1800,
        credit: 0,
        summary: '办公',
        explanation: '办公。借1800元。'
      },
      {
        subjectCode: '6602',
        debit: 5000,
        credit: 0,
        summary: '公司办公',
        explanation: '公司办公。借5000元。'
      },
      {
        subjectCode: '1001',
        debit: 0,
        credit: 4800,
        summary: '现金',
        explanation: '现金。贷4800元。'
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
        label: '报销',
        date: '2026-08-14',
        totalAmount: 9800,
        items: [
          {
            name: '差旅',
            amount: 3000
          },
          {
            name: '项目办公',
            amount: 1800
          },
          {
            name: '公司办公',
            amount: 5000
          }
        ]
      }
    ]
  },
  {
    date: '2026-08-15',
    role: 'accountant',
    title: '市政项目-路面施工进度',
    tags: [
      '工程合同'
    ],
    difficulty: 3,
    description: '市政项目累计完工进度75%（本月新增20%）。确认收入：300万×75%-已确认收入1,650,000=600,000元（不含税），增值税54,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '2205',
        debit: 200000,
        credit: 0,
        summary: '合同负债冲减',
        explanation: '合同负债冲减。借200000元。'
      },
      {
        subjectCode: '1122',
        debit: 454000,
        credit: 0,
        summary: '应收账款-市建设局',
        explanation: '应收账款-市建设局。借454000元。'
      },
      {
        subjectCode: '222101',
        debit: 0,
        credit: 54000,
        summary: '销项税额',
        explanation: '销项税额。贷54000元。'
      },
      {
        subjectCode: '6001',
        debit: 0,
        credit: 600000,
        summary: '确认收入-市政',
        explanation: '确认收入-市政。贷600000元。'
      }
    ],
    documents: [
      {
        type: 'invoice',
        label: '发票',
        date: '2026-08-15',
        lineItems: [
          {
            name: '市政道路路面工程（累计75%）',
            qty: 1,
            unit: '项',
            price: 600000,
            amount: 600000
          }
        ],
        totalAmount: 654000
      }
    ]
  },
  {
    date: '2026-08-17',
    role: 'accountant',
    title: '恒达项目成本清理',
    tags: [
      '工程成本'
    ],
    difficulty: 3,
    description: '恒达项目完工后全面清理成本。累计合同履约成本：人工723,015+材料1,115,000+分包780,000+机械139,950+其他直接132,700=2,890,665元。累计已结转成本2,481,058元，剩余待结转409,607元。',
    tip: '项目完工后需全面清算成本，确保所有成本均已结转。',
    entries: [
      {
        subjectCode: '6401',
        debit: 409607,
        credit: 0,
        summary: '恒达项目剩余成本结转',
        explanation: '恒达项目剩余成本结转。借409607元。'
      },
      {
        subjectCode: '540101',
        debit: 0,
        credit: 108900,
        summary: '人工清理',
        explanation: '人工清理。贷108900元。'
      },
      {
        subjectCode: '540102',
        debit: 0,
        credit: 160000,
        summary: '材料清理',
        explanation: '材料清理。贷160000元。'
      },
      {
        subjectCode: '540104',
        debit: 0,
        credit: 23600,
        summary: '机械清理',
        explanation: '机械清理。贷23600元。'
      },
      {
        subjectCode: '540105',
        debit: 0,
        credit: 117107,
        summary: '其他直接清理',
        explanation: '其他直接清理。贷117107元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '成本清算表',
        date: '2026-08-17',
        content: '恒达项目总成本：2,890,665元\n已结转：2,481,058元\n剩余结转：409,607元\n已确认收入：6,150,000元\n毛利率：53%',
        signature: '李会计'
      }
    ]
  },
  {
    date: '2026-08-18',
    role: 'accountant',
    title: '市政项目-收到工程款',
    tags: [
      '往来管理'
    ],
    difficulty: 1,
    description: '收到市建设局6月进度款247,500元。',
    tip: '',
    entries: [
      {
        subjectCode: '100202',
        debit: 247500,
        credit: 0,
        summary: '收市政款',
        explanation: '收市政款。借247500元。',
        cashFlowItem: 'cf-op1'
      },
      {
        subjectCode: '1122',
        debit: 0,
        credit: 247500,
        summary: '应收减少',
        explanation: '应收减少。贷247500元。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '回单',
        date: '2026-08-18',
        totalAmount: 247500
      }
    ]
  },
  {
    date: '2026-08-20',
    role: 'accountant',
    title: '计提8月职工薪酬',
    tags: [
      '工资社保'
    ],
    difficulty: 2,
    description: '计提8月工资：市政项目施工70,000元，项目部30,000元，公司25,000元，合计125,000元。恒达项目完工，相关人员调离。',
    tip: '',
    entries: [
      {
        subjectCode: '540101',
        debit: 70000,
        credit: 0,
        summary: '施工工资-市政',
        explanation: '施工工资-市政。借70000元。'
      },
      {
        subjectCode: '540106',
        debit: 30000,
        credit: 0,
        summary: '项目部工资',
        explanation: '项目部工资。借30000元。'
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
        credit: 125000,
        summary: '应付薪酬',
        explanation: '应付薪酬。贷125000元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '工资表',
        date: '2026-08-20',
        content: '125,000元（恒达项目结束，人员减少）'
      }
    ]
  },
  {
    date: '2026-08-20',
    role: 'accountant',
    title: '计提8月社保公积金',
    tags: [
      '工资社保'
    ],
    difficulty: 2,
    description: '工资125K×36.7%=45,875元。',
    tip: '',
    entries: [
      {
        subjectCode: '540101',
        debit: 25690,
        credit: 0,
        summary: '施工社公（70K×36.7%）',
        explanation: '施工社公（70K×36.7%）。借25690元。'
      },
      {
        subjectCode: '540106',
        debit: 11010,
        credit: 0,
        summary: '项目部社公（30K×36.7%）',
        explanation: '项目部社公（30K×36.7%）。借11010元。'
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
        credit: 30875,
        summary: '社保',
        explanation: '社保。贷30875元。'
      },
      {
        subjectCode: '221103',
        debit: 0,
        credit: 15000,
        summary: '公积金',
        explanation: '公积金。贷15000元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '计提表',
        date: '2026-08-20',
        content: '45,875元'
      }
    ]
  },
  {
    date: '2026-08-21',
    role: 'accountant',
    title: '折旧及摊销',
    tags: [
      '工程成本'
    ],
    difficulty: 2,
    description: '折旧1,850元，摊销15,000元。',
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
        subjectCode: '540105',
        debit: 5000,
        credit: 0,
        summary: '临设摊销',
        explanation: '临设摊销。借5000元。'
      },
      {
        subjectCode: '6602',
        debit: 600,
        credit: 0,
        summary: '办公折旧',
        explanation: '办公折旧。借600元。'
      },
      {
        subjectCode: '6602',
        debit: 10000,
        credit: 0,
        summary: '房租摊销',
        explanation: '房租摊销。借10000元。'
      },
      {
        subjectCode: '1602',
        debit: 0,
        credit: 1850,
        summary: '累计折旧',
        explanation: '累计折旧。贷1850元。'
      },
      {
        subjectCode: '1801',
        debit: 0,
        credit: 5000,
        summary: '临设减',
        explanation: '余额25,000元。'
      },
      {
        subjectCode: '1123',
        debit: 0,
        credit: 10000,
        summary: '租金减',
        explanation: '余额40,000元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '折旧摊销',
        date: '2026-08-21',
        content: '16,850元'
      }
    ]
  },
  {
    date: '2026-08-24',
    role: 'accountant',
    title: '间接费用归集与分摊',
    tags: [
      '工程成本'
    ],
    difficulty: 3,
    description: '间接费30,000+11,010+1,800=42,810元。仅市政项目，全额分配。',
    tip: '',
    entries: [
      {
        subjectCode: '540101',
        debit: 42810,
        credit: 0,
        summary: '间接-市政项目',
        explanation: '间接-市政项目。借42810元。'
      },
      {
        subjectCode: '540106',
        debit: 0,
        credit: 42810,
        summary: '间接转出',
        explanation: '间接转出。贷42810元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '间接费',
        date: '2026-08-24',
        content: '42,810元全额分配'
      }
    ]
  },
  {
    date: '2026-08-25',
    role: 'accountant',
    title: '结转市政项目成本',
    tags: [
      '工程合同'
    ],
    difficulty: 3,
    description: '市政成本：人工(70K+25,690+42,810)=138,500+材料100,000+机械11,000+其他直接(12,000+3,000)=15,000=264,500元。',
    tip: '',
    entries: [
      {
        subjectCode: '6401',
        debit: 264500,
        credit: 0,
        summary: '结转市政成本',
        explanation: '结转市政成本。借264500元。'
      },
      {
        subjectCode: '540101',
        debit: 0,
        credit: 138500,
        summary: '人工转出',
        explanation: '人工转出。贷138500元。'
      },
      {
        subjectCode: '540102',
        debit: 0,
        credit: 100000,
        summary: '材料转出',
        explanation: '材料转出。贷100000元。'
      },
      {
        subjectCode: '540104',
        debit: 0,
        credit: 11000,
        summary: '机械转出',
        explanation: '机械转出。贷11000元。'
      },
      {
        subjectCode: '540105',
        debit: 0,
        credit: 15000,
        summary: '其他转出',
        explanation: '其他转出。贷15000元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '成本表',
        date: '2026-08-25',
        content: '264,500元\n收入600,000元\n毛利335,500元'
      }
    ]
  },
  {
    date: '2026-08-26',
    role: 'accountant',
    title: '计提城建税及附加',
    tags: [
      '税费'
    ],
    difficulty: 2,
    description: '本月增值税：销项(54,000+45,000)=99,000-进项(13,000+0)=86,000元。计提城建税6,020元，教育费附加2,580元，地方附加1,720元，合计10,320元。',
    tip: '',
    entries: [
      {
        subjectCode: '6403',
        debit: 10320,
        credit: 0,
        summary: '计提附加',
        explanation: '计提附加。借10320元。'
      },
      {
        subjectCode: '222103',
        debit: 0,
        credit: 6020,
        summary: '城建税',
        explanation: '城建税。贷6020元。'
      },
      {
        subjectCode: '222104',
        debit: 0,
        credit: 4300,
        summary: '附加',
        explanation: '附加。贷4300元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '税费表',
        date: '2026-08-26',
        content: '86,000×12%=10,320元'
      }
    ]
  },
  {
    date: '2026-08-27',
    role: 'accountant',
    title: '银行手续及利息',
    tags: [
      '资金管理'
    ],
    difficulty: 1,
    description: '8月手续费450元，利息1,800元。',
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
        debit: 1800,
        credit: 0,
        summary: '利息',
        explanation: '利息。借1800元。',
        cashFlowItem: 'cf-op5'
      },
      {
        subjectCode: '6603',
        debit: 0,
        credit: 1800,
        summary: '冲减',
        explanation: '冲减。贷1800元。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '回单',
        date: '2026-08-27'
      }
    ]
  },
  {
    date: '2026-08-28',
    role: 'accountant',
    title: '月末结转损益',
    tags: [
      '期末'
    ],
    difficulty: 3,
    description: '月末结转：收入1,100,000元(恒达50万+市政60万)，成本674,107元(恒达409,607+市政264,500)，税金11,820元(含印花税)，管理费用50,775元，财务净收入1,350元。',
    tip: '',
    entries: [
      {
        subjectCode: '6001',
        debit: 1100000,
        credit: 0,
        summary: '结转收入',
        explanation: '结转收入。借1100000元。'
      },
      {
        subjectCode: '6401',
        debit: 0,
        credit: 674107,
        summary: '结转成本',
        explanation: '结转成本。贷674107元。'
      },
      {
        subjectCode: '6403',
        debit: 0,
        credit: 11820,
        summary: '结转税金',
        explanation: '结转税金。贷11820元。'
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
        debit: 1350,
        credit: 0,
        summary: '结转财务',
        explanation: '结转财务。借1350元。'
      },
      {
        subjectCode: '4103',
        debit: 0,
        credit: 364648,
        summary: '结转本年利润',
        explanation: '结转本年利润。贷364648元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '结转表',
        date: '2026-08-28',
        content: '净利润364,648元'
      }
    ]
  },
  {
    date: '2026-08-30',
    role: 'accountant',
    title: '模拟纳税申报',
    tags: [
      '期末',
      '申报'
    ],
    difficulty: 1,
    description: '8月增值税应纳86,000元，城建税6,020元，教育费附加4,300元。',
    tip: '',
    entries: [],
    documents: [
      {
        type: 'text',
        label: '申报提醒',
        date: '2026-08-30',
        content: '增值税86,000+附加10,320=96,320元'
      }
    ],
    nextAction: 'tax-filing'
  }
]

export default tasks
