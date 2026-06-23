/**
 * 建筑业 - 7月教学任务
 *
 * 企业：鼎立建筑工程有限公司
 * 税制：一般纳税人（增值税9%）
 * 准则：CAS 14 新收入准则（投入法/完工百分比）
 * 本月主题：设计变更与签证索赔
 */

const tasks = [
  {
    date: '2026-07-01',
    role: 'accountant',
    title: '缴纳6月增值税及附加',
    tags: [
      '税费'
    ],
    difficulty: 2,
    description: '缴纳6月增值税67,045元，城建税4,693元，教育费附加3,352元，合计75,090元。',
    tip: '',
    entries: [
      {
        subjectCode: '222101',
        debit: 67045,
        credit: 0,
        summary: '缴增值税',
        explanation: '缴增值税。借67045元。'
      },
      {
        subjectCode: '222103',
        debit: 4693,
        credit: 0,
        summary: '缴城建税',
        explanation: '缴城建税。借4693元。'
      },
      {
        subjectCode: '222104',
        debit: 3352,
        credit: 0,
        summary: '缴附加',
        explanation: '缴附加。借3352元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 75090,
        summary: '支付',
        explanation: '支付。贷75090元。',
        cashFlowItem: 'cf-op4'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '缴税凭证',
        date: '2026-07-01',
        totalAmount: 75090
      }
    ]
  },
  {
    date: '2026-07-01',
    role: 'accountant',
    title: '缴纳6月社保及公积金',
    tags: [
      '工资社保'
    ],
    difficulty: 1,
    description: '缴纳6月社保42,484元，公积金20,640元，合计63,124元。',
    tip: '',
    entries: [
      {
        subjectCode: '221102',
        debit: 42484,
        credit: 0,
        summary: '缴社保',
        explanation: '缴社保。借42484元。'
      },
      {
        subjectCode: '221103',
        debit: 20640,
        credit: 0,
        summary: '缴公积金',
        explanation: '缴公积金。借20640元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 63124,
        summary: '支付',
        explanation: '支付。贷63124元。',
        cashFlowItem: 'cf-op3'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '社保回单',
        totalAmount: 42484
      },
      {
        type: 'bank',
        label: '公积金回单',
        totalAmount: 20640
      }
    ]
  },
  {
    date: '2026-07-02',
    role: 'accountant',
    title: '发放6月职工工资',
    tags: [
      '工资社保'
    ],
    difficulty: 1,
    description: '代发6月工资172,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '221101',
        debit: 172000,
        credit: 0,
        summary: '发工资',
        explanation: '发工资。借172000元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 172000,
        summary: '代发',
        explanation: '代发。贷172000元。',
        cashFlowItem: 'cf-op3'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '代发回单',
        date: '2026-07-02',
        totalAmount: 172000
      }
    ]
  },
  {
    date: '2026-07-03',
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
        label: '现金支票',
        date: '2026-07-03',
        totalAmount: 15000
      }
    ]
  },
  {
    date: '2026-07-04',
    role: 'accountant',
    title: '设计变更通知',
    tags: [
      '工程合同'
    ],
    difficulty: 2,
    description: '接恒达地产通知，办公楼外立面设计变更，增加玻璃幕墙工程。合同变更增加价款100万元（不含税），总合同价调整为600万元。双方已签署变更协议。',
    tip: '设计变更是建筑业常见业务，变更价款需业主确认后才可计入合同总收入。',
    entries: [],
    documents: [
      {
        type: 'text',
        label: '设计变更协议',
        date: '2026-07-04',
        docTitle: '设 计 变 更 补 充 协 议',
        content: '恒达地产办公楼外立面变更\n原合同价：5,000,000元\n变更增加：1,000,000元（玻璃幕墙）\n调整后总价：6,000,000元\n业主：恒达地产\n施工方：鼎立建筑工程有限公司\n签字日期：2026-07-04',
        signature: '双方签章'
      }
    ]
  },
  {
    date: '2026-07-07',
    role: 'accountant',
    title: '新增变更工程材料采购',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '为玻璃幕墙变更工程采购铝型材、玻璃面板等，价款150,000元，增值税19,500元，合计169,500元。',
    tip: '',
    entries: [
      {
        subjectCode: '540102',
        debit: 150000,
        credit: 0,
        summary: '采购幕墙材料',
        explanation: '采购幕墙材料。借150000元。'
      },
      {
        subjectCode: '222101',
        debit: 19500,
        credit: 0,
        summary: '进项税额',
        explanation: '进项税额。借19500元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 169500,
        summary: '支付',
        explanation: '支付。贷169500元。',
        cashFlowItem: 'cf-op2'
      }
    ],
    documents: [
      {
        type: 'invoice',
        label: '发票',
        date: '2026-07-07',
        totalAmount: 169500,
        lineItems: [
          {
            name: '铝合金型材',
            qty: 3,
            unit: '吨',
            price: 30000,
            amount: 90000
          },
          {
            name: '钢化中空玻璃',
            qty: 300,
            unit: '平方米',
            price: 200,
            amount: 60000
          }
        ]
      }
    ]
  },
  {
    date: '2026-07-08',
    role: 'accountant',
    title: '幕墙分包合同签订',
    tags: [
      '分包管理'
    ],
    difficulty: 1,
    description: '将玻璃幕墙安装工程分包给海达幕墙公司，分包价80万元（不含税），工期45天。',
    tip: '',
    entries: [
      {
        subjectCode: '540103',
        debit: 200000,
        credit: 0,
        summary: '幕墙分包-海达（首批进度50%）',
        explanation: '幕墙分包-海达（首批进度50%）。借200000元。'
      },
      {
        subjectCode: '2202',
        debit: 0,
        credit: 200000,
        summary: '应付账款-海达幕墙',
        explanation: '应付账款-海达幕墙。贷200000元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '分包合同',
        date: '2026-07-08',
        docTitle: '幕墙工程分包合同',
        content: '分包：海达幕墙工程有限公司\n合同价：800,000元（不含税）\n工期：7月10日-8月25日\n付款方式：按进度70%支付'
      }
    ]
  },
  {
    date: '2026-07-09',
    role: 'accountant',
    title: '市政项目-路沿石等材料采购',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '市政项目采购路沿石、人行道砖等，价款55,000元，增值税7,150元，合计62,150元。',
    tip: '',
    entries: [
      {
        subjectCode: '540102',
        debit: 55000,
        credit: 0,
        summary: '采购市政材料',
        explanation: '采购市政材料。借55000元。'
      },
      {
        subjectCode: '222101',
        debit: 7150,
        credit: 0,
        summary: '进项税额',
        explanation: '进项税额。借7150元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 62150,
        summary: '支付',
        explanation: '支付。贷62150元。',
        cashFlowItem: 'cf-op2'
      }
    ],
    documents: [
      {
        type: 'invoice',
        label: '发票',
        date: '2026-07-09',
        totalAmount: 62150
      }
    ]
  },
  {
    date: '2026-07-10',
    role: 'accountant',
    title: '塔吊及机械费',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '恒达项目塔吊租金15,000元，双项目机械燃油维修12,000元，合计27,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '540104',
        debit: 27000,
        credit: 0,
        summary: '机械使用费',
        explanation: '机械使用费。借27000元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 27000,
        summary: '支付',
        explanation: '支付。贷27000元。',
        cashFlowItem: 'cf-op6'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '机械费',
        date: '2026-07-10',
        totalAmount: 27000,
        items: [
          {
            name: '塔吊租金',
            amount: 15000
          },
          {
            name: '燃油维修',
            amount: 12000
          }
        ]
      }
    ]
  },
  {
    date: '2026-07-11',
    role: 'accountant',
    title: '水电费',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '7月双项目水电费16,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '540105',
        debit: 16000,
        credit: 0,
        summary: '水电费',
        explanation: '水电费。借16000元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 16000,
        summary: '支付',
        explanation: '支付。贷16000元。',
        cashFlowItem: 'cf-op6'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '水电费单',
        date: '2026-07-11',
        totalAmount: 16000
      }
    ]
  },
  {
    date: '2026-07-14',
    role: 'accountant',
    title: '高温施工补贴发放',
    tags: [
      '工资社保'
    ],
    difficulty: 2,
    description: '7月进入高温季节，按规定向施工人员发放高温补贴。恒达项目20人×300元=6,000元，市政项目18人×300元=5,400元，合计11,400元，现金发放。',
    tip: '高温补贴是建筑施工企业的季节性支出，计入合同履约成本。',
    entries: [
      {
        subjectCode: '540101',
        debit: 11400,
        credit: 0,
        summary: '高温补贴-施工人员（恒达6K+市政5.4K）',
        explanation: '高温补贴-施工人员（恒达6K+市政5.4K）。借11400元。'
      },
      {
        subjectCode: '1001',
        debit: 0,
        credit: 11400,
        summary: '现金发放',
        explanation: '库存现金减少。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '高温补贴发放表',
        date: '2026-07-14',
        docTitle: '高 温 补 贴 发 放 表',
        content: '恒达项目20人×300=6,000元\n市政项目18人×300=5,400元\n合计11,400元\n政策依据：《防暑降温措施管理办法》',
        signature: '王人事'
      }
    ]
  },
  {
    date: '2026-07-14',
    role: 'accountant',
    title: '项目部差旅及办公',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '报销7月项目差旅3,500元、办公2,000元，合计5,500元。',
    tip: '',
    entries: [
      {
        subjectCode: '540105',
        debit: 3500,
        credit: 0,
        summary: '差旅',
        explanation: '差旅。借3500元。'
      },
      {
        subjectCode: '540106',
        debit: 2000,
        credit: 0,
        summary: '办公',
        explanation: '办公。借2000元。'
      },
      {
        subjectCode: '1001',
        debit: 0,
        credit: 5500,
        summary: '现金',
        explanation: '现金。贷5500元。'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '报销',
        date: '2026-07-14',
        totalAmount: 5500
      }
    ]
  },
  {
    date: '2026-07-14',
    role: 'accountant',
    title: '公司办公费',
    tags: [
      '资金管理'
    ],
    difficulty: 1,
    description: '7月公司办公费5,200元。',
    tip: '',
    entries: [
      {
        subjectCode: '6602',
        debit: 5200,
        credit: 0,
        summary: '办公费',
        explanation: '办公费。借5200元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 5200,
        summary: '支付',
        explanation: '支付。贷5200元。',
        cashFlowItem: 'cf-op6'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '办公费',
        date: '2026-07-14',
        totalAmount: 5200
      }
    ]
  },
  {
    date: '2026-07-15',
    role: 'accountant',
    title: '设计变更-签证索赔处理',
    tags: [
      '工程合同'
    ],
    difficulty: 3,
    description: '因设计变更导致已完工程拆除返工，经与甲方协商确认签证索赔金额150,000元（不含税），甲方已签认。变更索赔增加合同总收入。',
    tip: '工程签证是建筑业特有业务，签证价款经业主确认后计入合同收入。',
    entries: [
      {
        subjectCode: '1122',
        debit: 163500,
        credit: 0,
        summary: '应收账款-恒达（签证索赔）',
        explanation: '应收账款-恒达（签证索赔）。借163500元。'
      },
      {
        subjectCode: '222101',
        debit: 0,
        credit: 13500,
        summary: '增值税销项税额（15万×9%）',
        explanation: '增值税销项税额（15万×9%）。贷13500元。'
      },
      {
        subjectCode: '6001',
        debit: 0,
        credit: 150000,
        summary: '确认签证收入',
        explanation: '确认签证收入。贷150000元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '工程签证单',
        date: '2026-07-15',
        docTitle: '工 程 签 证 单',
        content: '签证事由：设计变更导致已完外墙拆除返工\n金额：150,000元\n甲方确认：恒达地产（签章）\n监理确认：李监理'
      }
    ]
  },
  {
    date: '2026-07-16',
    role: 'accountant',
    title: '收到恒达6月进度款',
    tags: [
      '往来管理'
    ],
    difficulty: 1,
    description: '收到恒达地产6月工程款381,500元。',
    tip: '',
    entries: [
      {
        subjectCode: '100201',
        debit: 381500,
        credit: 0,
        summary: '收恒达款',
        explanation: '收恒达款。借381500元。',
        cashFlowItem: 'cf-op1'
      },
      {
        subjectCode: '1122',
        debit: 0,
        credit: 381500,
        summary: '应收减少',
        explanation: '应收减少。贷381500元。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '收款回单',
        date: '2026-07-16',
        totalAmount: 381500
      }
    ]
  },
  {
    date: '2026-07-17',
    role: 'accountant',
    title: '恒达项目竣工验收申请',
    tags: [
      '工程合同'
    ],
    difficulty: 2,
    description: '恒达地产办公楼工程完工进度达100%（本月新增8%+签证变更），全部完工。向甲方提交竣工验收申请。',
    tip: '工程完工是建筑业重要节点，完工后进入验收和决算阶段。',
    entries: [
      {
        subjectCode: '1122',
        debit: 383680,
        credit: 0,
        summary: '应收账款-恒达（完工进度款含税）',
        explanation: '应收账款增加。'
      },
      {
        subjectCode: '222101',
        debit: 0,
        credit: 31680,
        summary: '增值税销项（352,000×9%）',
        explanation: '增值税销项（352,000×9%）。贷31680元。'
      },
      {
        subjectCode: '6001',
        debit: 0,
        credit: 352000,
        summary: '确认收入-恒达项目',
        explanation: '含原合同变更后进度款+签证收入调整。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '竣工验收申请',
        date: '2026-07-17',
        content: '恒达地产办公楼工程已全部完工，申请竣工验收。\n累计完工进度：100%',
        signature: '项目经理'
      }
    ]
  },
  {
    date: '2026-07-18',
    role: 'accountant',
    title: '市政项目工程进度',
    tags: [
      '工程合同'
    ],
    difficulty: 3,
    description: '市政项目累计完工进度55%（本月新增20%）。确认收入：300万×55%-已确认收入1,050,000=600,000元（不含税），增值税54,000元，冲合同负债。',
    tip: '',
    entries: [
      {
        subjectCode: '2205',
        debit: 600000,
        credit: 0,
        summary: '合同负债冲减',
        explanation: '合同负债冲减。借600000元。'
      },
      {
        subjectCode: '222101',
        debit: 0,
        credit: 54000,
        summary: '销项税额',
        explanation: '销项税额。贷54000元。'
      },
      {
        subjectCode: '1122',
        debit: 54000,
        credit: 0,
        summary: '应收账款-市建设局（增值税差额）',
        explanation: '应收账款-市建设局（增值税差额）。借54000元。'
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
        date: '2026-07-18',
        lineItems: [
          {
            name: '市政道路工程进度款（累计55%）',
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
    date: '2026-07-20',
    role: 'accountant',
    title: '计提7月职工薪酬',
    tags: [
      '工资社保'
    ],
    difficulty: 2,
    description: '计提7月工资：施工人员（恒达40K+市政60K=100K），项目部40,000元，公司25,000元，合计165,000元。恒达项目进入收尾，人员减少。',
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
        date: '2026-07-20',
        content: '165,000元'
      }
    ]
  },
  {
    date: '2026-07-20',
    role: 'accountant',
    title: '计提7月社保及公积金',
    tags: [
      '工资社保'
    ],
    difficulty: 2,
    description: '计提7月社保及公积金：施工100K×36.7%=36,700元，项目部40K×36.7%=14,680元，管理25K×36.7%=9,175元，合计60,555元。',
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
        summary: '社保（165K×24.7%）',
        explanation: '社保（165K×24.7%）。贷40755元。'
      },
      {
        subjectCode: '221103',
        debit: 0,
        credit: 19800,
        summary: '公积金（165K×12%）',
        explanation: '公积金（165K×12%）。贷19800元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '计提表',
        date: '2026-07-20',
        content: '60,555元'
      }
    ]
  },
  {
    date: '2026-07-21',
    role: 'accountant',
    title: '计提固定资产折旧',
    tags: [
      '工程成本'
    ],
    difficulty: 2,
    description: '7月折旧1,850元。',
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
        date: '2026-07-21'
      }
    ]
  },
  {
    date: '2026-07-21',
    role: 'accountant',
    title: '摊销临时设施及预付租金',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '摊销7月临时设施5,000元，预付租金10,000元。',
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
        summary: '临设减',
        explanation: '余额30,000元。'
      },
      {
        subjectCode: '1123',
        debit: 0,
        credit: 10000,
        summary: '租金减',
        explanation: '余额50,000元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '摊销表',
        date: '2026-07-21',
        content: '15,000元'
      }
    ]
  },
  {
    date: '2026-07-24',
    role: 'accountant',
    title: '间接费用归集与分摊',
    tags: [
      '工程成本'
    ],
    difficulty: 3,
    description: '间接费40,000+14,680+2,000=56,680元。按直接人工分摊：恒达40K/100K=40%得22,672元，市政60K/100K=60%得34,008元。',
    tip: '',
    entries: [
      {
        subjectCode: '540101',
        debit: 22672,
        credit: 0,
        summary: '间接-恒达',
        explanation: '间接-恒达。借22672元。'
      },
      {
        subjectCode: '540101',
        debit: 34008,
        credit: 0,
        summary: '间接-市政',
        explanation: '间接-市政。借34008元。'
      },
      {
        subjectCode: '540106',
        debit: 0,
        credit: 56680,
        summary: '间接费转出',
        explanation: '间接费转出。贷56680元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '间接费表',
        date: '2026-07-24',
        content: '恒达40%/市政60%=56,680元'
      }
    ]
  },
  {
    date: '2026-07-25',
    role: 'accountant',
    title: '结转双项目主营业务成本',
    tags: [
      '工程合同'
    ],
    difficulty: 3,
    description: '恒达：人工(40K+22,672)=62,672+材料150,000+机械(15,000+1,250)=16,250+其他(水电+差旅+其他)=20,500=249,422元。市政：人工(60K+34,008)=94,008+材料55,000+机械12,000×60%=7,200+其他(水电+差旅)=16,800=173,008元。',
    tip: '',
    entries: [
      {
        subjectCode: '6401',
        debit: 249422,
        credit: 0,
        summary: '恒达成本',
        explanation: '恒达成本。借249422元。'
      },
      {
        subjectCode: '6401',
        debit: 173008,
        credit: 0,
        summary: '市政成本',
        explanation: '市政成本。借173008元。'
      },
      {
        subjectCode: '540101',
        debit: 0,
        credit: 156680,
        summary: '人工转出',
        explanation: '人工转出。贷156680元。'
      },
      {
        subjectCode: '540102',
        debit: 0,
        credit: 205000,
        summary: '材料转出',
        explanation: '材料转出。贷205000元。'
      },
      {
        subjectCode: '540104',
        debit: 0,
        credit: 23450,
        summary: '机械转出',
        explanation: '机械转出。贷23450元。'
      },
      {
        subjectCode: '540105',
        debit: 0,
        credit: 37300,
        summary: '其他转出',
        explanation: '其他转出。贷37300元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '成本表',
        date: '2026-07-25',
        content: '恒达249,422+市政173,008=422,430元\n总收入1,102,000元\n毛利679,570元'
      }
    ]
  },
  {
    date: '2026-07-26',
    role: 'accountant',
    title: '计提城建税及附加',
    tags: [
      '税费'
    ],
    difficulty: 2,
    description: '本月增值税：销项(31,680+54,000+13,500)=99,180-进项(19,500+7,150)=72,530元。计提城建税5,077元，教育费附加2,176元，地方附加1,451元，合计8,704元。',
    tip: '',
    entries: [
      {
        subjectCode: '6403',
        debit: 8704,
        credit: 0,
        summary: '计提附加',
        explanation: '计提附加。借8704元。'
      },
      {
        subjectCode: '222103',
        debit: 0,
        credit: 5077,
        summary: '城建税',
        explanation: '城建税。贷5077元。'
      },
      {
        subjectCode: '222104',
        debit: 0,
        credit: 3627,
        summary: '附加',
        explanation: '附加。贷3627元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '税费表',
        date: '2026-07-26',
        content: '72,530×12%=8,704元'
      }
    ]
  },
  {
    date: '2026-07-27',
    role: 'accountant',
    title: '银行手续及利息',
    tags: [
      '资金管理'
    ],
    difficulty: 1,
    description: '7月手续费500元，利息2,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '6603',
        debit: 500,
        credit: 0,
        summary: '手续费',
        explanation: '手续费。借500元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 500,
        summary: '银行手续费',
        explanation: '银行手续费。贷500元。'
      },
      {
        subjectCode: '100201',
        debit: 2000,
        credit: 0,
        summary: '利息',
        explanation: '利息。借2000元。',
        cashFlowItem: 'cf-op5'
      },
      {
        subjectCode: '6603',
        debit: 0,
        credit: 2000,
        summary: '冲减',
        explanation: '冲减。贷2000元。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '回单',
        date: '2026-07-27'
      }
    ]
  },
  {
    date: '2026-07-28',
    role: 'accountant',
    title: '月末结转损益',
    tags: [
      '期末'
    ],
    difficulty: 3,
    description: '月末结转损益。总收入1,102,000元，总成本422,430元，税金10,204元，管理费用50,975元，财务净收入1,500元。',
    tip: '',
    entries: [
      {
        subjectCode: '6001',
        debit: 1102000,
        credit: 0,
        summary: '结转收入',
        explanation: '结转收入。借1102000元。'
      },
      {
        subjectCode: '6401',
        debit: 0,
        credit: 422430,
        summary: '结转成本',
        explanation: '结转成本。贷422430元。'
      },
      {
        subjectCode: '6403',
        debit: 0,
        credit: 10204,
        summary: '结转税金',
        explanation: '结转税金。贷10204元。'
      },
      {
        subjectCode: '6602',
        debit: 0,
        credit: 50975,
        summary: '结转管理',
        explanation: '结转管理。贷50975元。'
      },
      {
        subjectCode: '6603',
        debit: 1500,
        credit: 0,
        summary: '结转财务',
        explanation: '结转财务。借1500元。'
      },
      {
        subjectCode: '4103',
        debit: 0,
        credit: 619891,
        summary: '结转本年利润',
        explanation: '结转本年利润。贷619891元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '结转表',
        date: '2026-07-28',
        content: '净利润619,891元'
      }
    ]
  },
  {
    date: '2026-07-30',
    role: 'accountant',
    title: '模拟纳税申报',
    tags: [
      '期末',
      '申报'
    ],
    difficulty: 1,
    description: '7月增值税应纳72,530元，城建税5,077元，教育费附加3,627元。注意：变更签证收入需申报。',
    tip: '',
    entries: [],
    documents: [
      {
        type: 'text',
        label: '申报提醒',
        date: '2026-07-30',
        content: '增值税72,530+附加8,704=81,234元'
      }
    ],
    nextAction: 'tax-filing'
  }
]

export default tasks
