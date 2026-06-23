/**
 * 建筑业 - 11月教学任务
 *
 * 企业：鼎立建筑工程有限公司
 * 税制：一般纳税人（增值税9%）
 * 准则：CAS 14 新收入准则（投入法/完工百分比）
 * 本月主题：年末盘点与进度款催收
 */

const tasks = [
  {
    date: '2026-11-02',
    role: 'accountant',
    title: '缴纳10月增值税及附加',
    tags: [
      '税费'
    ],
    difficulty: 2,
    description: '缴纳10月增值税43,850元（留抵后延），城建税3,070元，教育费附加2,193元，合计5,263元。',
    tip: '',
    entries: [
      {
        subjectCode: '222103',
        debit: 3070,
        credit: 0,
        summary: '缴城建税',
        explanation: '缴城建税。借3070元。'
      },
      {
        subjectCode: '222104',
        debit: 2193,
        credit: 0,
        summary: '缴附加',
        explanation: '缴附加。借2193元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 5263,
        summary: '支付',
        explanation: '支付。贷5263元。',
        cashFlowItem: 'cf-op4'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '缴税凭证',
        date: '2026-11-02',
        totalAmount: 5263
      }
    ]
  },
  {
    date: '2026-11-02',
    role: 'accountant',
    title: '缴纳10月社保公积金',
    tags: [
      '工资社保'
    ],
    difficulty: 1,
    description: '缴纳10月社保27,170元，公积金13,200元，合计40,370元。',
    tip: '',
    entries: [
      {
        subjectCode: '221102',
        debit: 27170,
        credit: 0,
        summary: '缴社保',
        explanation: '缴社保。借27170元。'
      },
      {
        subjectCode: '221103',
        debit: 13200,
        credit: 0,
        summary: '缴公积金',
        explanation: '缴公积金。借13200元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 40370,
        summary: '支付',
        explanation: '支付。贷40370元。',
        cashFlowItem: 'cf-op3'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '社保公积金回单',
        date: '2026-11-02'
      }
    ]
  },
  {
    date: '2026-11-03',
    role: 'accountant',
    title: '发放10月工资',
    tags: [
      '工资社保'
    ],
    difficulty: 1,
    description: '代发10月工资110,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '221101',
        debit: 110000,
        credit: 0,
        summary: '发工资',
        explanation: '发工资。借110000元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 110000,
        summary: '代发',
        explanation: '代发。贷110000元。',
        cashFlowItem: 'cf-op3'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '代发回单',
        date: '2026-11-03',
        totalAmount: 110000
      }
    ]
  },
  {
    date: '2026-11-04',
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
        date: '2026-11-04',
        totalAmount: 20000
      }
    ]
  },
  {
    date: '2026-11-05',
    role: 'accountant',
    title: '科创园-主体材料采购',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '科创园项目采购主体工程钢材、混凝土，价款300,000元，增值税39,000元，合计339,000元，转账支付。',
    tip: '',
    entries: [
      {
        subjectCode: '540102',
        debit: 300000,
        credit: 0,
        summary: '采购主体材料-科创园',
        explanation: '采购主体材料-科创园。借300000元。'
      },
      {
        subjectCode: '222101',
        debit: 39000,
        credit: 0,
        summary: '进项税额',
        explanation: '进项税额。借39000元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 339000,
        summary: '支付',
        explanation: '支付。贷339000元。',
        cashFlowItem: 'cf-op2'
      }
    ],
    documents: [
      {
        type: 'invoice',
        label: '发票',
        date: '2026-11-05',
        totalAmount: 339000,
        lineItems: [
          {
            name: '螺纹钢',
            qty: 50,
            unit: '吨',
            price: 4200,
            amount: 210000
          },
          {
            name: '商品混凝土',
            qty: 300,
            unit: 'm³',
            price: 400,
            amount: 120000
          }
        ]
      }
    ]
  },
  {
    date: '2026-11-06',
    role: 'accountant',
    title: '科创园-机械及周转材料',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '租赁塔吊2台月租金50,000元，脚手架等周转材料20,000元，合计70,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '540104',
        debit: 50000,
        credit: 0,
        summary: '塔吊租金2台',
        explanation: '塔吊租金2台。借50000元。'
      },
      {
        subjectCode: '540105',
        debit: 20000,
        credit: 0,
        summary: '周转材料租赁',
        explanation: '周转材料租赁。借20000元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 70000,
        summary: '支付',
        explanation: '支付。贷70000元。',
        cashFlowItem: 'cf-op6'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '租赁费',
        date: '2026-11-06',
        totalAmount: 70000,
        items: [
          {
            name: '塔吊租赁×2',
            amount: 50000
          },
          {
            name: '脚手架租赁',
            amount: 20000
          }
        ]
      }
    ]
  },
  {
    date: '2026-11-07',
    role: 'accountant',
    title: '科创园-劳务分包',
    tags: [
      '分包管理'
    ],
    difficulty: 2,
    description: '与信达劳务公司签订主体施工劳务分包合同（清包工），分包价400万元。选择简易计税（3%）。',
    tip: '建筑业劳务分包可选择简易计税方式。',
    entries: [
      {
        subjectCode: '540103',
        debit: 400000,
        credit: 0,
        summary: '劳务分包-信达公司（首次进度30%）',
        explanation: '劳务分包-信达公司（首次进度30%）。借400000元。'
      },
      {
        subjectCode: '2202',
        debit: 0,
        credit: 400000,
        summary: '应付账款-信达劳务',
        explanation: '应付账款-信达劳务。贷400000元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '劳务分包合同',
        date: '2026-11-07',
        content: '分包：信达劳务有限公司\n清包工价：4,000,000元\n税率：简易计税3%\n首次进度30%'
      }
    ]
  },
  {
    date: '2026-11-07',
    role: 'accountant',
    title: '水电及机械费',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '11月水电费20,000元，机械燃油维修15,000元，合计35,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '540105',
        debit: 20000,
        credit: 0,
        summary: '水电费',
        explanation: '水电费。借20000元。'
      },
      {
        subjectCode: '540104',
        debit: 15000,
        credit: 0,
        summary: '机械费',
        explanation: '机械费。借15000元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 35000,
        summary: '支付',
        explanation: '支付。贷35000元。',
        cashFlowItem: 'cf-op6'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '费用',
        date: '2026-11-07',
        totalAmount: 35000
      }
    ]
  },
  {
    date: '2026-11-10',
    role: 'accountant',
    title: '项目部及公司费用',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '11月项目差旅3,000元，办公2,000元，公司办公5,500元。',
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
        debit: 2000,
        credit: 0,
        summary: '办公',
        explanation: '办公。借2000元。'
      },
      {
        subjectCode: '6602',
        debit: 5500,
        credit: 0,
        summary: '公司办公',
        explanation: '公司办公。借5500元。'
      },
      {
        subjectCode: '1001',
        debit: 0,
        credit: 5000,
        summary: '现金',
        explanation: '现金。贷5000元。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 5500,
        summary: '转账',
        explanation: '转账。贷5500元。',
        cashFlowItem: 'cf-op6'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '费用',
        date: '2026-11-10',
        totalAmount: 10500
      }
    ]
  },
  {
    date: '2026-11-11',
    role: 'accountant',
    title: '恒达项目质保金到期',
    tags: [
      '往来管理'
    ],
    difficulty: 2,
    description: '恒达地产质保金30,750元到期（扣留部分），收回款项。',
    tip: '',
    entries: [
      {
        subjectCode: '100201',
        debit: 30750,
        credit: 0,
        summary: '收回恒达质保金',
        explanation: '收回恒达质保金。借30750元。',
        cashFlowItem: 'cf-op5'
      },
      {
        subjectCode: '224101',
        debit: 0,
        credit: 30750,
        summary: '质保金减少',
        explanation: '其他应付款-质保金减少。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '收款回单',
        date: '2026-11-11',
        totalAmount: 30750,
        content: '恒达项目质保金返还'
      }
    ]
  },
  {
    date: '2026-11-12',
    role: 'accountant',
    title: '市政项目-竣工结算',
    tags: [
      '工程合同'
    ],
    difficulty: 2,
    description: '市政道路项目竣工结算，审计审定金额298万元（原合同300万，审减2万元）。质保金扣留5%共149,000元。尾款=327,000-20,000(审减)-149,000(质保金)=158,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '6001',
        debit: 20000,
        credit: 0,
        summary: '冲减收入-市政审减',
        explanation: '冲减审减金额。'
      },
      {
        subjectCode: '1122',
        debit: 0,
        credit: 20000,
        summary: '应收调减',
        explanation: '应收调减。贷20000元。'
      },
      {
        subjectCode: '100202',
        debit: 158000,
        credit: 0,
        summary: '收市政尾款',
        explanation: '收市政尾款。借158000元。',
        cashFlowItem: 'cf-op1'
      },
      {
        subjectCode: '224101',
        debit: 149000,
        credit: 0,
        summary: '扣留质保金',
        explanation: '扣留质保金。借149000元。'
      },
      {
        subjectCode: '1122',
        debit: 0,
        credit: 307000,
        summary: '应收减少',
        explanation: '冲减尾款和质保金。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '市政结算审计',
        date: '2026-11-12',
        content: '审定金额2,980,000元\n审减20,000元\n扣质保金149,000元\n实收尾款158,000元'
      }
    ]
  },
  {
    date: '2026-11-13',
    role: 'accountant',
    title: '科创园-分包结算',
    tags: [
      '分包管理'
    ],
    difficulty: 2,
    description: '信达劳务分包完成50%进度，结算200万元（含税）。已确认应付40万元，本次增加160万元。收到劳务发票（简易计税3%）。',
    tip: '',
    entries: [
      {
        subjectCode: '540103',
        debit: 1600000,
        credit: 0,
        summary: '劳务分包进度-信达（累计50%）',
        explanation: '劳务分包进度-信达（累计50%）。借1600000元。'
      },
      {
        subjectCode: '222101',
        debit: 0,
        credit: 46602,
        summary: '进项税额-劳务（1,600,000/1.03×3%）',
        explanation: '进项税额-劳务（1,600,000/1.03×3%）。贷46602元。'
      },
      {
        subjectCode: '2202',
        debit: 0,
        credit: 1553398,
        summary: '应付账款-信达劳务',
        explanation: '含税价调整。'
      }
    ],
    documents: [
      {
        type: 'invoice',
        label: '增值税专用发票',
        date: '2026-11-13',
        lineItems: [
          {
            name: '主体劳务分包-简易计税3%',
            qty: 1,
            unit: '项',
            price: 1553398,
            amount: 1553398
          }
        ],
        totalAmount: 1600000
      }
    ]
  },
  {
    date: '2026-11-14',
    role: 'accountant',
    title: '科创园-工程进度',
    tags: [
      '工程合同'
    ],
    difficulty: 3,
    description: '科创园项目累计完工进度25%（本月新增17%）。确认收入：1,200万×25%-已确认960,000=2,040,000元（不含税），增值税183,600元。',
    tip: '',
    entries: [
      {
        subjectCode: '2205',
        debit: 1200000,
        credit: 0,
        summary: '合同负债冲减-科创园',
        explanation: '合同负债余额：360万-96万=264万。'
      },
      {
        subjectCode: '1122',
        debit: 1023600,
        credit: 0,
        summary: '应收账款-科创园业主',
        explanation: '应收账款-科创园业主。借1023600元。'
      },
      {
        subjectCode: '222101',
        debit: 0,
        credit: 183600,
        summary: '销项税额',
        explanation: '销项税额。贷183600元。'
      },
      {
        subjectCode: '6001',
        debit: 0,
        credit: 2040000,
        summary: '确认收入-科创园',
        explanation: '确认收入-科创园。贷2040000元。'
      }
    ],
    documents: [
      {
        type: 'invoice',
        label: '发票',
        date: '2026-11-14',
        lineItems: [
          {
            name: '科创园主体工程进度款（累计25%）',
            qty: 1,
            unit: '项',
            price: 2040000,
            amount: 2040000
          }
        ],
        totalAmount: 2223600
      }
    ]
  },
  {
    date: '2026-11-14',
    role: 'accountant',
    title: '结转科创园成本',
    tags: [
      '工程合同'
    ],
    difficulty: 3,
    description: '科创园本月成本：材料300,000+劳务(400K+1,600K)=2,000K+机械(50K+15K)=65K+其他(20K+20K+2K+3K)=45K+人工=2,434,000元（含间接费分摊）。',
    tip: '',
    entries: [
      {
        subjectCode: '6401',
        debit: 2572000,
        credit: 0,
        summary: '结转科创园成本',
        explanation: '结转科创园成本。借2572000元。'
      },
      {
        subjectCode: '540101',
        debit: 0,
        credit: 160000,
        summary: '人工转出',
        explanation: '人工转出。贷160000元。'
      },
      {
        subjectCode: '540102',
        debit: 0,
        credit: 300000,
        summary: '材料转出',
        explanation: '材料转出。贷300000元。'
      },
      {
        subjectCode: '540103',
        debit: 0,
        credit: 2000000,
        summary: '分包转出',
        explanation: '分包转出。贷2000000元。'
      },
      {
        subjectCode: '540104',
        debit: 0,
        credit: 65000,
        summary: '机械转出',
        explanation: '机械转出。贷65000元。'
      },
      {
        subjectCode: '540105',
        debit: 0,
        credit: 47000,
        summary: '其他转出',
        explanation: '其他转出。贷47000元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '成本表',
        date: '2026-11-14',
        content: '科创园本月成本2,434,000元\n收入2,040,000元\n本月亏损394,000元（前期成本高）'
      }
    ]
  },
  {
    date: '2026-11-17',
    role: 'accountant',
    title: '年末现场材料盘点',
    tags: [
      '工程成本'
    ],
    difficulty: 2,
    description: '对科创园项目现场材料进行年末盘点。盘点结果：钢材盘盈3吨（12,600元），商品混凝土无差异。',
    tip: '年末盘点发现盘盈，冲减工程成本。',
    entries: [
      {
        subjectCode: '540102',
        debit: 0,
        credit: 12600,
        summary: '盘盈材料冲成本',
        explanation: '合同履约成本-材料成本减少。'
      },
      {
        subjectCode: '1901',
        debit: 12600,
        credit: 0,
        summary: '待处理财产损溢-盘盈',
        explanation: '待处理财产损溢-盘盈。借12600元。'
      },
      {
        subjectCode: '540102',
        debit: 12600,
        credit: 0,
        summary: '盘盈冲回成本',
        explanation: '盘盈冲回成本。借12600元。'
      },
      {
        subjectCode: '1901',
        debit: 0,
        credit: 12600,
        summary: '盘盈处理转出',
        explanation: '盘盈处理转出。贷12600元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '年末盘点表',
        date: '2026-11-17',
        docTitle: '2026年11月现场材料盘点表',
        content: '钢材：账面结余50吨，实存53吨，盘盈3吨（原因：计量误差），价值12,600元\n冲减工程成本\n盘点人：刘保管  监盘人：李会计',
        signature: '盘点小组'
      }
    ]
  },
  {
    date: '2026-11-18',
    role: 'accountant',
    title: '坏账准备计提',
    tags: [
      '期末'
    ],
    difficulty: 2,
    description: '对期末应收账款进行减值测试。应收账款余额约102万元（科创园未到期），按账龄分析法计提5%坏账准备51,000元。',
    tip: '坏账准备是企业年度财务必做事项。',
    entries: [
      {
        subjectCode: '6701',
        debit: 51000,
        credit: 0,
        summary: '计提坏账准备',
        explanation: '信用减值损失增加。'
      },
      {
        subjectCode: '1231',
        debit: 0,
        credit: 51000,
        summary: '坏账准备增加',
        explanation: '坏账准备增加。贷51000元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '坏账计提表',
        date: '2026-11-18',
        content: '应收余额1,023,600×5%=51,000元'
      }
    ]
  },
  {
    date: '2026-11-19',
    role: 'accountant',
    title: '收到市政9月尾款',
    tags: [
      '往来管理'
    ],
    difficulty: 1,
    description: '收到市建设局9月工程进度款327,000元（结算调整前）。',
    tip: '',
    entries: [
      {
        subjectCode: '100202',
        debit: 327000,
        credit: 0,
        summary: '收市政款',
        explanation: '收市政款。借327000元。',
        cashFlowItem: 'cf-op1'
      },
      {
        subjectCode: '1122',
        debit: 0,
        credit: 327000,
        summary: '应收减少',
        explanation: '应收减少。贷327000元。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '回单',
        date: '2026-11-19',
        totalAmount: 327000
      }
    ]
  },
  {
    date: '2026-11-20',
    role: 'accountant',
    title: '计提11月职工薪酬',
    tags: [
      '工资社保'
    ],
    difficulty: 2,
    description: '计提11月工资：科创园施工人员90,000元，项目部40,000元，公司25,000元，合计155,000元。（主体施工人员增加）',
    tip: '',
    entries: [
      {
        subjectCode: '540101',
        debit: 90000,
        credit: 0,
        summary: '施工工资',
        explanation: '施工工资。借90000元。'
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
        credit: 155000,
        summary: '应付薪酬',
        explanation: '应付薪酬。贷155000元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '工资表',
        date: '2026-11-20',
        content: '155,000元'
      }
    ]
  },
  {
    date: '2026-11-20',
    role: 'accountant',
    title: '计提11月社保公积金',
    tags: [
      '工资社保'
    ],
    difficulty: 2,
    description: '155K×36.7%=56,885元。',
    tip: '',
    entries: [
      {
        subjectCode: '540101',
        debit: 33030,
        credit: 0,
        summary: '施工社公（90K×36.7%）',
        explanation: '施工社公（90K×36.7%）。借33030元。'
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
        credit: 38285,
        summary: '社保',
        explanation: '社保。贷38285元。'
      },
      {
        subjectCode: '221103',
        debit: 0,
        credit: 18600,
        summary: '公积金',
        explanation: '公积金。贷18600元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '计提表',
        date: '2026-11-20',
        content: '56,885元'
      }
    ]
  },
  {
    date: '2026-11-21',
    role: 'accountant',
    title: '折旧及摊销',
    tags: [
      '工程成本'
    ],
    difficulty: 2,
    description: '折旧：施工机械(1,250+5,208)=6,458元，办公设备600元，摊销15,000元。',
    tip: '',
    entries: [
      {
        subjectCode: '540104',
        debit: 6458,
        credit: 0,
        summary: '施工机械折旧',
        explanation: '施工机械折旧。借6458元。'
      },
      {
        subjectCode: '6602',
        debit: 600,
        credit: 0,
        summary: '办公折旧',
        explanation: '办公折旧。借600元。'
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
        explanation: '余额10,000元。'
      },
      {
        subjectCode: '1123',
        debit: 0,
        credit: 10000,
        summary: '租金减',
        explanation: '余额10,000元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '折旧摊销',
        date: '2026-11-21',
        content: '22,058元'
      }
    ]
  },
  {
    date: '2026-11-24',
    role: 'accountant',
    title: '间接费用归集与分摊',
    tags: [
      '工程成本'
    ],
    difficulty: 3,
    description: '间接费40,000+14,680+2,000=56,680元。全额分配给科创园。',
    tip: '',
    entries: [
      {
        subjectCode: '540101',
        debit: 56680,
        credit: 0,
        summary: '间接-科创园',
        explanation: '间接-科创园。借56680元。'
      },
      {
        subjectCode: '540106',
        debit: 0,
        credit: 56680,
        summary: '间接转出',
        explanation: '间接转出。贷56680元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '间接费表',
        date: '2026-11-24',
        content: '56,680元'
      }
    ]
  },
  {
    date: '2026-11-25',
    role: 'accountant',
    title: '结转科创园成本（调整后）',
    tags: [
      '工程合同'
    ],
    difficulty: 3,
    description: '科创园成本调整后：(人工90K+33,030+56,680)=179,710+材料(300K-盘盈12.6K)=287,400+劳务2,000,000+机械65,000+其他47,000=2,579,110元。',
    tip: '',
    entries: [
      {
        subjectCode: '6401',
        debit: 2579110,
        credit: 0,
        summary: '结转科创园成本',
        explanation: '结转科创园成本。借2579110元。'
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
        credit: 287400,
        summary: '材料转出',
        explanation: '材料转出。贷287400元。'
      },
      {
        subjectCode: '540103',
        debit: 0,
        credit: 2000000,
        summary: '分包转出',
        explanation: '分包转出。贷2000000元。'
      },
      {
        subjectCode: '540104',
        debit: 0,
        credit: 65000,
        summary: '机械转出',
        explanation: '机械转出。贷65000元。'
      },
      {
        subjectCode: '540105',
        debit: 0,
        credit: 47000,
        summary: '其他转出',
        explanation: '其他转出。贷47000元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '成本表',
        date: '2026-11-25',
        content: '调整后2,579,110元'
      }
    ]
  },
  {
    date: '2026-11-26',
    role: 'accountant',
    title: '计提城建税及附加',
    tags: [
      '税费'
    ],
    difficulty: 2,
    description: '本月增值税：销项183,600-进项(39,000+46,602)=97,998元。计提城建税6,860元，教育费附加2,940元，地方附加1,960元，合计11,760元。',
    tip: '',
    entries: [
      {
        subjectCode: '6403',
        debit: 11760,
        credit: 0,
        summary: '计提附加',
        explanation: '计提附加。借11760元。'
      },
      {
        subjectCode: '222103',
        debit: 0,
        credit: 6860,
        summary: '城建税',
        explanation: '城建税。贷6860元。'
      },
      {
        subjectCode: '222104',
        debit: 0,
        credit: 4900,
        summary: '附加',
        explanation: '附加。贷4900元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '税费表',
        date: '2026-11-26',
        content: '97,998×12%=11,760元'
      }
    ]
  },
  {
    date: '2026-11-27',
    role: 'accountant',
    title: '银行手续及利息',
    tags: [
      '资金管理'
    ],
    difficulty: 1,
    description: '11月手续费800元，利息3,500元。',
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
        debit: 3500,
        credit: 0,
        summary: '利息',
        explanation: '利息。借3500元。',
        cashFlowItem: 'cf-op5'
      },
      {
        subjectCode: '6603',
        debit: 0,
        credit: 3500,
        summary: '冲减',
        explanation: '冲减。贷3500元。'
      }
    ],
    documents: [
      {
        type: 'bank',
        label: '回单',
        date: '2026-11-27'
      }
    ]
  },
  {
    date: '2026-11-28',
    role: 'accountant',
    title: '月末结转损益',
    tags: [
      '期末'
    ],
    difficulty: 3,
    description: '月末结转：收入2,040,000元，成本2,579,110元，税金13,260元，管理费用(25K+9,175+5,500+600+10K+5K+2K)57,275元，信用减值损失51,000元，财务净收入2,700元。',
    tip: '',
    entries: [
      {
        subjectCode: '6001',
        debit: 2040000,
        credit: 0,
        summary: '结转收入',
        explanation: '结转收入。借2040000元。'
      },
      {
        subjectCode: '6401',
        debit: 0,
        credit: 2579110,
        summary: '结转成本',
        explanation: '结转成本。贷2579110元。'
      },
      {
        subjectCode: '6403',
        debit: 0,
        credit: 13260,
        summary: '结转税金',
        explanation: '结转税金。贷13260元。'
      },
      {
        subjectCode: '6602',
        debit: 0,
        credit: 57275,
        summary: '结转管理',
        explanation: '结转管理。贷57275元。'
      },
      {
        subjectCode: '6701',
        debit: 0,
        credit: 51000,
        summary: '结转信用减值损失',
        explanation: '结转信用减值损失。贷51000元。'
      },
      {
        subjectCode: '6603',
        debit: 2700,
        credit: 0,
        summary: '结转财务',
        explanation: '结转财务。借2700元。'
      },
      {
        subjectCode: '4103',
        debit: 0,
        credit: -657945,
        summary: '结转本年利润',
        explanation: '本月亏损657,945元（科创园前期成本集中确认）'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '结转表',
        date: '2026-11-28',
        content: '本月-657,945元（科创园前期成本归集）'
      }
    ]
  },
  {
    date: '2026-11-30',
    role: 'accountant',
    title: '模拟纳税申报',
    tags: [
      '期末',
      '申报'
    ],
    difficulty: 1,
    description: '11月增值税应纳97,998元，城建税6,860元，教育费附加4,900元。',
    tip: '',
    entries: [],
    documents: [
      {
        type: 'text',
        label: '申报提醒',
        date: '2026-11-30',
        content: '增值税97,998+附加11,760=109,758元'
      }
    ],
    nextAction: 'tax-filing'
  }
]

export default tasks
