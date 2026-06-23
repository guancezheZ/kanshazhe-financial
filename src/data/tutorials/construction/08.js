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
        label: '电子缴税付款凭证',
        date: '2026-08-03',
        totalAmount: 81234,
        payer: '鼎立建筑工程有限公司',
        payeeName: '国家金库',
        content: '7月增值税72,530元，城建税5,077元，教育费附加3,627元',
        refNo: 'JS202608030001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 9876 5432 1098 765'
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
        label: '社保缴费回单',
        date: '2026-08-03',
        totalAmount: 40755,
        payer: '鼎立建筑工程有限公司',
        payeeName: '社会保险费征收专户',
        content: '7月社保费',
        refNo: 'SB202608030001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234',
        payeeBank: '社会保险费征收专户',
        payeeAccount: '3201 6500 0123 4567'
      },
      {
        type: 'bank',
        label: '公积金缴费回单',
        date: '2026-08-03',
        totalAmount: 19800,
        payer: '鼎立建筑工程有限公司',
        payeeName: '住房公积金管理中心',
        content: '7月公积金',
        refNo: 'GJJ202608030001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234',
        payeeBank: '住房公积金管理中心专户',
        payeeAccount: '3810 0200 1234 5678'
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
        label: '银行代发工资回单',
        date: '2026-08-04',
        totalAmount: 165000,
        payer: '鼎立建筑工程有限公司',
        payeeName: '鼎立建筑职工（批量代发）',
        content: '7月工资发放',
        refNo: 'GZ202608040001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 9876 5432 1098 765'
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
        label: '现金支票存根',
        date: '2026-08-05',
        totalAmount: 20000,
        payer: '鼎立建筑工程有限公司',
        payeeName: '鼎立建筑工程有限公司',
        content: '备用金',
        refNo: 'XJ202608050001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 9876 5432 1098 765'
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
        headers: [
          '项目',
          '内容'
        ],
        rows: [
          [
            '工程名称',
            '恒达地产办公楼建设工程'
          ],
          [
            '验收结论',
            '合格 ✓'
          ],
          [
            '验收日期',
            '2026年8月6日'
          ],
          [
            '参验单位',
            '恒达地产、鼎立建筑、设计院、监理公司'
          ],
          [
            '验收意见',
            '同意通过'
          ],
        ],
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
        content: '工程名称：恒达地产办公楼建设工程\n建设单位：恒达地产有限公司\n施工单位：鼎立建筑工程有限公司\n结算日期：2026年8月7日\n\n一、合同价款\n  原合同金额：5,000,000元\n\n二、变更及签证\n┌──────────────┬──────────┬───────────┐\n│ 项目          │ 金额      │ 依据       │\n├──────────────┼──────────┼───────────┤\n│ 设计变更      │ 1,000,000│ 变更联系单  │\n├──────────────┼──────────┼───────────┤\n│ 现场签证      │   150,000│ 签证单汇总  │\n├──────────────┼──────────┼───────────┤\n│ 小计          │ 1,150,000│ —         │\n└──────────────┴──────────┴───────────┘\n\n三、结算总价\n  原合同 5,000,000 + 变更 1,000,000 + 签证 150,000 = 6,150,000元（不含税）\n  增值税销项税额：6,150,000 × 9% = 553,500元\n  含税总价：6,703,500元\n\n四、已收及应收\n┌──────────────────┬──────────┐\n│ 项目              │ 金额      │\n├──────────────────┼──────────┤\n│ 累计已确认收入    │ 5,652,000│\n├──────────────────┼──────────┤\n│ 本次结算尾款      │   498,000│\n├──────────────────┼──────────┤\n│ 质保金（5%）      │    30,750│\n├──────────────────┼──────────┤\n│ 本次应收合计      │   528,750│\n└──────────────────┴──────────┘\n\n五、结算结论：双方确认无误，同意按上述金额办理竣工结算。',
        headers: [
          '项目',
          '金额',
          '依据'
        ],
        rows: [
          [
              '设计变更',
              '1,000,000',
              '变更联系单'
          ],
          [
              '现场签证',
              '150,000',
              '签证单汇总'
          ],
          [
              '小计',
              '1,150,000',
              '—'
          ],
        ],
        signature: '施工单位：项目经理  造价工程师  建设单位：项目负责人'
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
        label: '拆除费明细',
        date: '2026-08-08',
        totalAmount: 8000,
        items: [
          { name: '临时设施拆除人工费', amount: 5000 },
          { name: '机械拆除费', amount: 2000 },
          { name: '垃圾清运费', amount: 1000 }
        ]
      },
      {
        type: 'receipt',
        label: '废品回收收入',
        date: '2026-08-08',
        totalAmount: 2000,
        items: [
          { name: '废旧钢筋回收', amount: 1200 },
          { name: '废旧模板回收', amount: 800 }
        ]
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
        label: '增值税专用发票',
        date: '2026-08-10',
        invoiceNo: '3200245610',
        buyer: '鼎立建筑工程有限公司',
        seller: '南京中石化沥青销售有限公司',
        totalAmount: 113000,
        taxRate: 0.13,
        taxAmount: 13000,
        amountWithoutTax: 100000,
        lineItems: [
          {
            name: '沥青混凝土',
            spec: 'AC-20 中粒式',
            unit: '吨',
            qty: 200,
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
        payer: '恒达地产有限公司',
        payeeName: '鼎立建筑工程有限公司',
        content: '恒达办公楼竣工尾款（质保金30,750元已扣留）',
        refNo: 'HD202608110001',
        payerBank: '恒达地产开户行',
        payerAccount: '3200 8800 1234 5678',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 0123 4567 8901 234'
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
        label: '银行回单',
        date: '2026-08-11',
        totalAmount: 15000,
        payer: '鼎立建筑工程有限公司',
        payeeName: '鼎力机械设备租赁有限公司',
        content: '塔吊退租-8月租金',
        refNo: 'ZF202608110001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 9876 5432 1098 765'
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
        label: '燃油维修明细',
        date: '2026-08-12',
        totalAmount: 11000,
        items: [
          { name: '柴油费', amount: 5000 },
          { name: '汽油费', amount: 3000 },
          { name: '机械维修费', amount: 3000 }
        ]
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
        label: '水电费明细',
        date: '2026-08-13',
        totalAmount: 12000,
        items: [
          { name: '施工用水费', amount: 5000 },
          { name: '施工用电费', amount: 7000 }
        ]
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
        label: '高温补贴发放表',
        date: '2026-08-14',
        docTitle: '8 月 高 温 补 贴 发 放 表',
        content: '发放依据：根据《防暑降温措施管理办法》及公司规定，气温35℃以上露天作业发放高温补贴\n\n发放标准：300元/人·月（高温作业岗位）\n\n发放明细：\n┌──────────────┬──────┬────────┬─────────┐\n│ 部  门        │ 人数 │ 标准   │ 金额    │\n├──────────────┼──────┼────────┼─────────┤\n│ 市政项目施工  │  20  │ 300元  │ 6,000元 │\n├──────────────┼──────┼────────┼─────────┤\n│ 项目部管理    │   5  │ 300元  │ 1,500元 │\n├──────────────┼──────┼────────┼─────────┤\n│ 合  计        │  25  │ 300元  │ 7,500元 │\n└──────────────┴──────┴────────┴─────────┘',
        headers: [
          '部 门',
          '人数',
          '标准',
          '金额'
        ],
        rows: [
          [
              '市政项目施工',
              '20',
              '300元',
              '6,000元'
          ],
          [
              '项目部管理',
              '5',
              '300元',
              '1,500元'
          ],
          [
              '合 计',
              '25',
              '300元',
              '7,500元'
          ],
        ],
        signature: '制表：王出纳  审核：李会计  批准：赵经理'
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
        label: '增值税专用发票',
        date: '2026-08-15',
        invoiceNo: '3200245611',
        buyer: '南京市建设局',
        seller: '鼎立建筑工程有限公司',
        totalAmount: 654000,
        taxRate: 0.09,
        taxAmount: 54000,
        amountWithoutTax: 600000,
        lineItems: [
          {
            name: '市政道路路面工程（累计75%进度）',
            spec: '市政道路工程',
            unit: '项',
            qty: 1,
            price: 600000,
            amount: 600000
          }
        ]
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
        docTitle: '恒 达 项 目 成 本 清 算 表',
        content: '项目名称：恒达地产办公楼建设工程\n完工日期：2026年8月6日（竣工验收通过）\n清算日期：2026年8月17日\n\n一、累计成本汇总\n┌──────────────┬──────────┬──────────┬──────────┐\n│ 成本项目      │ 累计发生  │ 已结转    │ 本次结转  │\n├──────────────┼──────────┼──────────┼──────────┤\n│ 直接人工      │ 723,015  │ 614,115  │ 108,900  │\n├──────────────┼──────────┼──────────┼──────────┤\n│ 直接材料      │ 1,115,000│ 955,000  │ 160,000  │\n├──────────────┼──────────┼──────────┼──────────┤\n│ 分包成本      │ 780,000  │ 780,000  │      —   │\n├──────────────┼──────────┼──────────┼──────────┤\n│ 机械使用费    │ 139,950  │ 116,350  │  23,600  │\n├──────────────┼──────────┼──────────┼──────────┤\n│ 其他直接费    │ 132,700  │  15,593  │ 117,107  │\n├──────────────┼──────────┼──────────┼──────────┤\n│ 成本合计      │2,890,665 │2,481,058 │ 409,607  │\n└──────────────┴──────────┴──────────┴──────────┘\n\n二、收入与毛利\n  已确认收入：6,150,000元\n  累计总成本：2,890,665元\n  项目总毛利：3,259,335元\n  毛利率：53.0%\n\n三、清算结论\n  剩余成本409,607元全部结转至主营业务成本 ✓\n  所有合同履约成本科目余额归零 ✓\n  恒达项目成本清算完成 ✓',
        headers: [
          '成本项目',
          '累计发生',
          '已结转',
          '本次结转'
        ],
        rows: [
          [
              '直接人工',
              '723,015',
              '614,115',
              '108,900'
          ],
          [
              '直接材料',
              '1,115,000',
              '955,000',
              '160,000'
          ],
          [
              '分包成本',
              '780,000',
              '780,000',
              '—'
          ],
          [
              '机械使用费',
              '139,950',
              '116,350',
              '23,600'
          ],
          [
              '其他直接费',
              '132,700',
              '15,593',
              '117,107'
          ],
          [
              '成本合计',
              '2,890,665',
              '2,481,058',
              '409,607'
          ],
        ],
        signature: '项目会计：李会计  项目经理：张经理'
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
        label: '收款回单',
        date: '2026-08-18',
        totalAmount: 247500,
        payer: '市建设局（财政专户）',
        payeeName: '鼎立建筑工程有限公司',
        content: '市政道路工程7月进度款',
        refNo: 'SZ202608180001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 9876 5432 1098 765',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 0123 4567 8901 234'
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
        label: '工资计提表',
        date: '2026-08-20',
        docTitle: '8 月 职 工 薪 酬 计 提 表',
        content: '期间：2026年8月\n\n📌 恒达项目已完工，相关人员已调离\n\n计提明细：\n┌──────────────┬──────┬──────────────┬──────────┐\n│ 部  门        │ 人数 │ 工资总额      │ 费用归属  │\n├──────────────┼──────┼──────────────┼──────────┤\n│ 市政项目施工  │  18  │ 70,000元      │ 合同成本  │\n├──────────────┼──────┼──────────────┼──────────┤\n│ 项目部管理    │   4  │ 30,000元      │ 间接费用  │\n├──────────────┼──────┼──────────────┼──────────┤\n│ 公司管理层    │   5  │ 25,000元      │ 管理费用  │\n├──────────────┼──────┼──────────────┼──────────┤\n│ 合  计        │  27  │ 125,000元     │ —        │\n└──────────────┴──────┴──────────────┴──────────┘\n\n分配依据：按部门实际考勤及岗位工资标准编制',
        headers: [
          '部 门',
          '人数',
          '工资总额',
          '费用归属'
        ],
        rows: [
          [
              '市政项目施工',
              '18',
              '70,000元',
              '合同成本'
          ],
          [
              '项目部管理',
              '4',
              '30,000元',
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
              '27',
              '125,000元',
              '—'
          ],
        ],
        signature: '制表：王出纳  审核：李会计  批准：赵经理'
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
        label: '社保公积金计提表',
        date: '2026-08-20',
        docTitle: '8 月 社 保 公 积 金 计 提 表',
        content: '期间：2026年8月\n计提基数：工资总额125,000元\n综合计提比例：36.7%（社保24.7%+公积金12%）\n\n费率明细：\n┌──────────┬────────┬────────┐\n│ 险  种    │ 费率   │ 金额    │\n├──────────┼────────┼────────┤\n│ 养老保险  │ 16.0%  │ 20,000 │\n├──────────┼────────┼────────┤\n│ 医疗保险  │  6.5%  │  8,125 │\n├──────────┼────────┼────────┤\n│ 失业保险  │  0.5%  │    625 │\n├──────────┼────────┼────────┤\n│ 工伤保险  │  0.7%  │    875 │\n├──────────┼────────┼────────┤\n│ 生育保险  │  1.0%  │  1,250 │\n├──────────┼────────┼────────┤\n│ 小计(社保)│ 24.7%  │ 30,875 │\n├──────────┼────────┼────────┤\n│ 公积金    │ 12.0%  │ 15,000 │\n├──────────┼────────┼────────┤\n│ 合  计    │ 36.7%  │ 45,875 │\n└──────────┴────────┴────────┘\n\n分配：市政施工70K×36.7%=25,690元，项目部30K×36.7%=11,010元，管理25K×36.7%=9,175元',
        headers: [
          '险 种',
          '费率',
          '金额'
        ],
        rows: [
          [
              '养老保险',
              '16.0%',
              '20,000'
          ],
          [
              '医疗保险',
              '6.5%',
              '8,125'
          ],
          [
              '失业保险',
              '0.5%',
              '625'
          ],
          [
              '工伤保险',
              '0.7%',
              '875'
          ],
          [
              '生育保险',
              '1.0%',
              '1,250'
          ],
          [
              '小计(社保)',
              '24.7%',
              '30,875'
          ],
          [
              '公积金',
              '12.0%',
              '15,000'
          ],
          [
              '合 计',
              '36.7%',
              '45,875'
          ],
        ],
        signature: '制表：王出纳  审核：李会计'
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
        label: '折旧摊销计算表',
        date: '2026-08-21',
        docTitle: '8 月 折 旧 及 摊 销 计 算 表',
        content: '期间：2026年8月\n\n一、折旧计提（合计：1,850元）\n┌──────────────┬──────────┬──────┬────────┬──────────┐\n│ 资产名称      │ 原值      │ 年限  │ 月折旧  │ 归属部门  │\n├──────────────┼──────────┼──────┼────────┼──────────┤\n│ 施工机械      │ 800,000  │  10年 │ 1,250  │ 机械使用  │\n├──────────────┼──────────┼──────┼────────┼──────────┤\n│ 办公设备      │ 120,000  │   5年 │   600  │ 管理费用  │\n├──────────────┼──────────┼──────┼────────┼──────────┤\n│ 小计          │ 920,000  │  —   │ 1,850  │  —       │\n└──────────────┴──────────┴──────┴────────┴──────────┘\n\n二、摊销计提（合计：15,000元）\n┌──────────────┬──────────┬──────────┬──────────┬────────┐\n│ 项目          │ 原值      │ 已摊销    │ 本月摊销  │ 余额   │\n├──────────────┼──────────┼──────────┼──────────┼────────┤\n│ 临设摊销      │ 150,000  │ 125,000  │  5,000   │ 25,000 │\n├──────────────┼──────────┼──────────┼──────────┼────────┤\n│ 房租摊销      │ 180,000  │ 140,000  │ 10,000   │ 40,000 │\n├──────────────┼──────────┼──────────┼──────────┼────────┤\n│ 小计          │ 330,000  │ 265,000  │ 15,000   │ 65,000 │\n└──────────────┴──────────┴──────────┴──────────┴────────┘\n\n三、合计：折旧1,850元 + 摊销15,000元 = 16,850元 ✓',
        headers: [
          '资产名称',
          '原值',
          '年限',
          '月折旧',
          '归属部门'
        ],
        rows: [
          [
              '施工机械',
              '800,000',
              '10年',
              '1,250',
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
              '920,000',
              '—',
              '1,850',
              '—'
          ],
        ],
        signature: '制表：王出纳  审核：李会计'
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
        label: '间接费用分配表',
        date: '2026-08-24',
        docTitle: '间 接 费 用 归 集 与 分 配 表',
        content: '期间：2026年8月\n\n一、费用归集\n┌──────────────┬──────────┐\n│ 费用项目      │ 金额      │\n├──────────────┼──────────┤\n│ 项目部工资    │ 30,000   │\n├──────────────┼──────────┤\n│ 项目部社保    │ 11,010   │\n├──────────────┼──────────┤\n│ 项目部办公    │  1,800   │\n├──────────────┼──────────┤\n│ 合计          │ 42,810   │\n└──────────────┴──────────┘\n\n二、分配情况\n仅市政项目在建，全额分配至市政项目\n分配率：100%\n分配金额：42,810元\n\n三、分配后余额：0元 ✓',
        headers: [
          '费用项目',
          '金额'
        ],
        rows: [
          [
              '项目部工资',
              '30,000'
          ],
          [
              '项目部社保',
              '11,010'
          ],
          [
              '项目部办公',
              '1,800'
          ],
          [
              '合计',
              '42,810'
          ],
        ],
        signature: '制表：王出纳  审核：李会计'
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
        label: '成本结转表',
        date: '2026-08-25',
        docTitle: '市 政 项 目 成 本 结 转 表',
        content: '期间：2026年8月\n项目：市政道路工程（累计完工进度75%）\n\n成本构成：\n┌──────────────┬──────────┬─────────┐\n│ 成本项目      │ 合同成本  │ 期末结转  │\n├──────────────┼──────────┼─────────┤\n│ 直接人工      │ 138,500  │ 138,500 │\n├──────────────┼──────────┼─────────┤\n│ 直接材料      │ 100,000  │ 100,000 │\n├──────────────┼──────────┼─────────┤\n│ 机械使用费    │  11,000  │  11,000 │\n├──────────────┼──────────┼─────────┤\n│ 其他直接费    │  15,000  │  15,000 │\n├──────────────┼──────────┼─────────┤\n│ 成本合计      │ 264,500  │ 264,500 │\n├──────────────┼──────────┼─────────┤\n│ 完工百分比    │    75%   │    —    │\n├──────────────┼──────────┼─────────┤\n│ 本期收入      │ 600,000  │    —    │\n├──────────────┼──────────┼─────────┤\n│ 本期毛利      │ 335,500  │    —    │\n├──────────────┼──────────┼─────────┤\n│ 毛利率        │  55.9%   │    —    │\n└──────────────┴──────────┴─────────┘\n\n成本构成占比：人工52.4%+材料37.8%+机械4.2%+其他5.7%\n\n成本归集后余额为零 ✓',
        headers: [
          '成本项目',
          '合同成本',
          '期末结转'
        ],
        rows: [
          [
              '直接人工',
              '138,500',
              '138,500'
          ],
          [
              '直接材料',
              '100,000',
              '100,000'
          ],
          [
              '机械使用费',
              '11,000',
              '11,000'
          ],
          [
              '其他直接费',
              '15,000',
              '15,000'
          ],
          [
              '成本合计',
              '264,500',
              '264,500'
          ],
          [
              '完工百分比',
              '75%',
              '—'
          ],
          [
              '本期收入',
              '600,000',
              '—'
          ],
          [
              '本期毛利',
              '335,500',
              '—'
          ],
          [
              '毛利率',
              '55.9%',
              '—'
          ],
        ],
        signature: '制表：王出纳  审核：李会计'
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
        label: '税费计算表',
        date: '2026-08-26',
        docTitle: '城 建 税 及 附 加 计 提 表',
        content: '期间：2026年8月\n\n一、增值税计算\n┌──────────────────┬──────────┐\n│ 项目              │ 金额      │\n├──────────────────┼──────────┤\n│ 销项税额          │          │\n│   ├市政进度款      │ 54,000   │\n│   └恒达竣工结算    │ 45,000   │\n│  销项合计          │ 99,000   │\n├──────────────────┼──────────┤\n│ 进项税额          │          │\n│   └沥青采购        │ 13,000   │\n├──────────────────┼──────────┤\n│ 应交增值税        │ 86,000   │\n└──────────────────┴──────────┘\n\n二、附加税费计算（以增值税为基数）\n┌──────────────┬────────┬──────────┐\n│ 税种          │ 税率   │ 金额      │\n├──────────────┼────────┼──────────┤\n│ 城建税        │   7%   │  6,020   │\n├──────────────┼────────┼──────────┤\n│ 教育费附加    │   3%   │  2,580   │\n├──────────────┼────────┼──────────┤\n│ 地方教育附加  │   2%   │  1,720   │\n├──────────────┼────────┼──────────┤\n│ 合计          │  12%   │ 10,320   │\n└──────────────┴────────┴──────────┘\n\n三、附加费率：7%+3%+2%=12%，86,000×12%=10,320元 ✓',
        headers: [
          '项目',
          '金额'
        ],
        rows: [
          [
              '销项税额',
              ''
          ],
          [
              '├市政进度款',
              '54,000'
          ],
          [
              '└恒达竣工结算',
              '45,000'
          ],
          [
              '销项合计',
              '99,000'
          ],
          [
              '进项税额',
              ''
          ],
          [
              '└沥青采购',
              '13,000'
          ],
          [
              '应交增值税',
              '86,000'
          ],
        ],
        signature: '制表：王出纳  审核：李会计'
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
        label: '银行回单',
        date: '2026-08-27',
        totalAmount: 450,
        payer: '鼎立建筑工程有限公司',
        payeeName: '工商银行南京分行',
        content: '8月银行手续费',
        refNo: 'YW202608270001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 9876 5432 1098 765'
      },
      {
        type: 'bank',
        label: '利息回单',
        date: '2026-08-27',
        totalAmount: 1800,
        payer: '工商银行南京分行',
        payeeName: '鼎立建筑工程有限公司',
        content: '8月存款利息',
        refNo: 'LX202608270001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 9876 5432 1098 765',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 0123 4567 8901 234'
      }
    ]
  },
  {
    date: '2026-08-05',
    role: 'accountant',
    title: '防暑降温物资采购',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '8月高温天气，采购矿泉水、藿香正气液、凉茶等防暑物资5,000元，发放给施工现场工人，转账支付。',
    tip: '防暑降温费计入"合同履约成本-其他直接费用"。',
    entries: [
      {
        subjectCode: '540105',
        debit: 5000,
        credit: 0,
        summary: '防暑降温物资',
        explanation: '合同履约成本-其他直接费用增加。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 5000,
        summary: '支付防暑物资款',
        explanation: '银行存款减少5,000元。',
        cashFlowItem: 'cf-op6',
        cashFlowExplanation: '其他经营活动现金支出。'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '采购发票',
        date: '2026-08-05',
        totalAmount: 5000,
        items: [
          { name: '矿泉水及凉茶', amount: 3000 },
          { name: '防暑药品', amount: 2000 }
        ]
      }
    ]
  },
  {
    date: '2026-08-12',
    role: 'accountant',
    title: '基坑排水及防汛费',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '雨季基坑排水用电及水泵租赁费，合计11,000元，转账支付。',
    tip: '基坑排水及防汛费计入"合同履约成本-其他直接费用"。',
    entries: [
      {
        subjectCode: '540105',
        debit: 11000,
        credit: 0,
        summary: '基坑排水及防汛费',
        explanation: '合同履约成本-其他直接费用增加。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 11000,
        summary: '支付排水防汛费',
        explanation: '银行存款减少11,000元。',
        cashFlowItem: 'cf-op6',
        cashFlowExplanation: '其他经营活动现金支出。'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '排水及租赁费发票',
        date: '2026-08-12',
        totalAmount: 11000,
        items: [
          { name: '基坑排水用电', amount: 7000 },
          { name: '水泵租赁费', amount: 4000 }
        ]
      }
    ]
  },
  {
    date: '2026-08-20',
    role: 'accountant',
    title: '施工道路修复费',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '雨季导致工地临时道路损毁，进行修复，费用6,000元，转账支付。',
    tip: '道路修复费计入"合同履约成本-其他直接费用"。',
    entries: [
      {
        subjectCode: '540105',
        debit: 6000,
        credit: 0,
        summary: '施工道路修复费',
        explanation: '合同履约成本-其他直接费用增加。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 6000,
        summary: '支付道路修复费',
        explanation: '银行存款减少6,000元。',
        cashFlowItem: 'cf-op6',
        cashFlowExplanation: '其他经营活动现金支出。'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '工程维修发票',
        date: '2026-08-20',
        totalAmount: 6000,
        items: [
          { name: '临时道路修复', amount: 6000 }
        ]
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
        label: '损益结转表',
        date: '2026-08-28',
        docTitle: '月 末 损 益 结 转 表',
        content: '期间：2026年8月\n\n一、收入结转\n┌──────────────┬──────────┬──────────┐\n│ 科目          │ 项目      │ 金额      │\n├──────────────┼──────────┼──────────┤\n│ 主营业务收入  │ 恒达竣工  │ 500,000  │\n├──────────────┼──────────┼──────────┤\n│ 主营业务收入  │ 市政进度  │ 600,000  │\n├──────────────┼──────────┼──────────┤\n│ 收入合计      │  —       │ 1,100,000│\n└──────────────┴──────────┴──────────┘\n\n二、成本费用结转\n┌──────────────┬──────────┬──────────┐\n│ 科目          │ 明细      │ 金额      │\n├──────────────┼──────────┼──────────┤\n│ 主营业务成本  │ 恒达清理  │ 409,607  │\n├──────────────┼──────────┼──────────┤\n│ 主营业务成本  │ 市政成本  │ 264,500  │\n├──────────────┼──────────┼──────────┤\n│ 税金及附加    │ 城建附加  │  11,820  │\n├──────────────┼──────────┼──────────┤\n│ 管理费用      │ 公司管理  │  50,775  │\n├──────────────┼──────────┼──────────┤\n│ 财务费用      │ 利息收支  │  −1,350  │\n├──────────────┼──────────┼──────────┤\n│ 费用合计      │  —       │ 735,352  │\n└──────────────┴──────────┴──────────┘\n\n三、净利润计算\n  收入 1,100,000 − 费用 735,352 = 净利润 364,648元 ✓\n\n四、科目余额\n  结转后收入/成本/费用类科目余额均为零 ✓',
        headers: [
          '科目',
          '项目',
          '金额'
        ],
        rows: [
          [
              '主营业务收入',
              '恒达竣工',
              '500,000'
          ],
          [
              '主营业务收入',
              '市政进度',
              '600,000'
          ],
          [
              '收入合计',
              '—',
              '1,100,000'
          ],
        ],
        signature: '制表：王出纳  审核：李会计'
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
        label: '模拟纳税申报表',
        date: '2026-08-30',
        docTitle: '8 月 税 费 申 报 汇 总 表',
        content: '申报期间：2026年8月\n纳税人：鼎立建筑工程有限公司\n\n一、增值税申报\n┌──────────────────┬──────────┐\n│ 项目              │ 金额      │\n├──────────────────┼──────────┤\n│ 销项税额          │  99,000  │\n│   ├恒达竣工结算    │  45,000  │\n│   └市政进度款      │  54,000  │\n├──────────────────┼──────────┤\n│ 进项税额          │  13,000  │\n│   └沥青采购        │  13,000  │\n├──────────────────┼──────────┤\n│ 应交增值税        │  86,000  │\n└──────────────────┴──────────┘\n\n二、附加税费申报\n┌──────────────┬────────┬──────────┐\n│ 税种          │ 计税依据│ 应纳税额  │\n├──────────────┼────────┼──────────┤\n│ 城建税        │ 86,000 │  6,020   │\n├──────────────┼────────┼──────────┤\n│ 教育费附加    │ 86,000 │  2,580   │\n├──────────────┼────────┼──────────┤\n│ 地方教育附加  │ 86,000 │  1,720   │\n├──────────────┼────────┼──────────┤\n│ 附加合计      │ 86,000 │ 10,320   │\n└──────────────┴────────┴──────────┘\n\n三、应缴总额：增值税86,000 + 附加10,320 = 96,320元\n\n四、申报状态：📤 待提交申报',
        headers: [
          '项目',
          '金额'
        ],
        rows: [
          [
              '销项税额',
              '99,000'
          ],
          [
              '├恒达竣工结算',
              '45,000'
          ],
          [
              '└市政进度款',
              '54,000'
          ],
          [
              '进项税额',
              '13,000'
          ],
          [
              '└沥青采购',
              '13,000'
          ],
          [
              '应交增值税',
              '86,000'
          ],
        ],
        signature: '财务负责人：李会计'
      }
    ],
    nextAction: 'tax-filing'
  }
]

export default tasks
