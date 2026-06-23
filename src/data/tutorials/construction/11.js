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
        label: '电子缴税付款凭证',
        date: '2026-11-02',
        totalAmount: 5263,
        payer: '鼎立建筑工程有限公司',
        payeeName: '国家金库南京代理支库',
        content: '10月城建税3,070元、教育费附加2,193元',
        refNo: 'JS202611020001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 9876 5432 1098 765'
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
        label: '社保缴费回单',
        date: '2026-11-02',
        totalAmount: 27170,
        payer: '鼎立建筑工程有限公司',
        payeeName: '社会保险费征收专户',
        content: '10月社保费',
        refNo: 'SB202611020001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234',
        payeeBank: '社会保险费征收专户',
        payeeAccount: '3201 6500 0123 4567'
      },
      {
        type: 'bank',
        label: '公积金缴费回单',
        date: '2026-11-02',
        totalAmount: 13200,
        payer: '鼎立建筑工程有限公司',
        payeeName: '住房公积金管理中心',
        content: '10月公积金',
        refNo: 'GJJ202611020001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234',
        payeeBank: '住房公积金管理中心专户',
        payeeAccount: '3810 0200 1234 5678'
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
        label: '银行代发工资回单',
        date: '2026-11-03',
        totalAmount: 110000,
        payer: '鼎立建筑工程有限公司',
        payeeName: '鼎立建筑职工（批量代发）',
        content: '10月工资发放',
        refNo: 'GZ202611030001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 9876 5432 1098 765'
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
        label: '现金支票存根',
        date: '2026-11-04',
        totalAmount: 20000,
        payer: '鼎立建筑工程有限公司',
        payeeName: '鼎立建筑工程有限公司',
        content: '备用金',
        refNo: 'XJ202611040001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 9876 5432 1098 765'
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
        label: '增值税专用发票',
        date: '2026-11-05',
        invoiceNo: '3200245901',
        buyer: '鼎立建筑工程有限公司',
        seller: '南京钢铁贸易有限公司',
        totalAmount: 339000,
        taxRate: 0.13,
        taxAmount: 39000,
        amountWithoutTax: 300000,
        lineItems: [
          {
            name: '螺纹钢',
            spec: 'HRB400 Φ25',
            unit: '吨',
            qty: 50,
            price: 4200,
            amount: 210000
          },
          {
            name: '商品混凝土',
            spec: 'C30 泵送',
            unit: 'm³',
            qty: 300,
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
        docTitle: '建 设 工 程 劳 务 分 包 合 同',
        content: '总包单位：鼎立建筑工程有限公司\n分包单位：信达劳务服务有限公司\n工程名称：高新区科创园办公楼群-主体劳务\n\n合同主要内容：\n 一、分包方式：清包工（包工不包料）\n 二、分包总价：4,000,000元（不含税）\n 三、计税方式：简易计税（增值税3%）\n 四、付款方式：按月度完成进度支付\n 五、合同工期：2026年11月—2027年6月\n\n首批进度款：1,200,000元（合同价30%，已完成）',
        signature: '鼎立建筑（盖章）  信达劳务（盖章）'
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
        label: '费用明细',
        date: '2026-11-07',
        totalAmount: 35000,
        items: [
          { name: '施工用水电费', amount: 20000 },
          { name: '机械燃油维修费', amount: 15000 }
        ]
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
        label: '费用明细',
        date: '2026-11-10',
        totalAmount: 10500,
        items: [
          { name: '项目部差旅费', amount: 3000 },
          { name: '项目部办公费', amount: 2000 },
          { name: '公司办公费', amount: 5500 }
        ]
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
        payer: '恒达地产有限公司',
        payeeName: '鼎立建筑工程有限公司',
        content: '恒达办公楼质保金到期返还',
        refNo: 'HD202611110001',
        payerBank: '恒达地产开户行',
        payerAccount: '3200 8800 1234 5678',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 0123 4567 8901 234'
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
        docTitle: '市 政 道 路 项 目 竣 工 结 算 审 计 表',
        content: '项目名称：南京市市政道路工程\n\n一、审计结果\n┌──────────────────┬──────────┬──────────┬──────────┐\n│ 项目              │ 送审金额  │ 审定金额  │ 审减金额  │\n├──────────────────┼──────────┼──────────┼──────────┤\n│ 合同内工程        │ 3,000,000│ 2,980,000│   20,000 │\n└──────────────────┴──────────┴──────────┴──────────┘\n\n二、尾款结算\n┌──────────────────┬──────────┐\n│ 项目              │ 金额      │\n├──────────────────┼──────────┤\n│ 应收尾款（含税）  │ 327,000  │\n├──────────────────┼──────────┤\n│ 审计审减          │ −20,000  │\n├──────────────────┼──────────┤\n│ 扣留质保金5%      │ −149,000 │\n├──────────────────┼──────────┤\n│ 实收尾款          │ 158,000  │\n└──────────────────┴──────────┘\n\n三、市政项目全部结算完成 ✓',
        headers: [
          '项目',
          '送审金额',
          '审定金额',
          '审减金额'
        ],
        rows: [
          [
              '合同内工程',
              '3,000,000',
              '2,980,000',
              '20,000'
          ],
        ],
        signature: '审计机构：南京永正咨询  施工单位确认：李会计'
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
        invoiceNo: '3200245902',
        buyer: '鼎立建筑工程有限公司',
        seller: '信达劳务服务有限公司',
        totalAmount: 1600000,
        taxRate: 0.03,
        taxAmount: 46602,
        amountWithoutTax: 1553398,
        lineItems: [
          {
            name: '主体施工劳务分包（简易计税）',
            spec: '清包工劳务',
            unit: '项',
            qty: 1,
            price: 1553398,
            amount: 1553398
          }
        ]
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
        label: '增值税专用发票',
        date: '2026-11-14',
        invoiceNo: '3200245903',
        buyer: '高新区科创园建设指挥部',
        seller: '鼎立建筑工程有限公司',
        totalAmount: 2223600,
        taxRate: 0.09,
        taxAmount: 183600,
        amountWithoutTax: 2040000,
        lineItems: [
          {
            name: '科创园办公楼群主体工程进度款（累计25%）',
            spec: '科创园项目一期',
            unit: '项',
            qty: 1,
            price: 2040000,
            amount: 2040000
          }
        ]
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
        docTitle: '科 创 园 项 目 成 本 结 转 表（首 次）',
        content: '期间：2026年11月\n项目：高新区科创园办公楼群（完工进度25%）\n\n成本构成：\n┌──────────────┬──────────┬─────────┐\n│ 成本项目      │ 本期发生  │ 期末结转  │\n├──────────────┼──────────┼─────────┤\n│ 直接人工      │ 160,000  │ 160,000 │\n├──────────────┼──────────┼─────────┤\n│ 直接材料      │ 300,000  │ 300,000 │\n├──────────────┼──────────┼─────────┤\n│ 劳务分包      │ 2,000,000│ 2,000,000│\n├──────────────┼──────────┼─────────┤\n│ 机械使用费    │  65,000  │  65,000 │\n├──────────────┼──────────┼─────────┤\n│ 其他直接费    │  47,000  │  47,000 │\n├──────────────┼──────────┼─────────┤\n│ 成本合计      │ 2,572,000│ 2,572,000│\n├──────────────┼──────────┼─────────┤\n│ 本期收入      │ 2,040,000│    —    │\n├──────────────┼──────────┼─────────┤\n│ 本期毛利      │ −532,000 │    —    │\n└──────────────┴──────────┴─────────┘\n\n亏损原因：劳务分包成本2,000,000元集中确认，实际进度与成本归集存在时间差',
        headers: [
          '成本项目',
          '本期发生',
          '期末结转'
        ],
        rows: [
          [
              '直接人工',
              '160,000',
              '160,000'
          ],
          [
              '直接材料',
              '300,000',
              '300,000'
          ],
          [
              '劳务分包',
              '2,000,000',
              '2,000,000'
          ],
          [
              '机械使用费',
              '65,000',
              '65,000'
          ],
          [
              '其他直接费',
              '47,000',
              '47,000'
          ],
          [
              '成本合计',
              '2,572,000',
              '2,572,000'
          ],
          [
              '本期收入',
              '2,040,000',
              '—'
          ],
          [
              '本期毛利',
              '−532,000',
              '—'
          ],
        ],
        signature: '制表：王出纳  审核：李会计'
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
        label: '收款回单',
        date: '2026-11-19',
        totalAmount: 327000,
        payer: '市建设局（财政专户）',
        payeeName: '鼎立建筑工程有限公司',
        content: '市政道路工程10月进度款',
        refNo: 'SZ202611190001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 9876 5432 1098 765',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 0123 4567 8901 234'
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
        label: '工资计提表',
        date: '2026-11-20',
        docTitle: '11 月 职 工 薪 酬 计 提 表',
        content: '期间：2026年11月\n主体施工人员增加（科创园项目进入主体施工阶段）\n\n计提明细：\n┌──────────────┬──────┬──────────────┬──────────┐\n│ 部  门        │ 人数 │ 工资总额      │ 费用归属  │\n├──────────────┼──────┼──────────────┼──────────┤\n│ 科创园施工    │  22  │ 90,000元      │ 合同成本  │\n├──────────────┼──────┼──────────────┼──────────┤\n│ 项目部管理    │   5  │ 40,000元      │ 间接费用  │\n├──────────────┼──────┼──────────────┼──────────┤\n│ 公司管理层    │   5  │ 25,000元      │ 管理费用  │\n├──────────────┼──────┼──────────────┼──────────┤\n│ 合  计        │  32  │ 155,000元     │ —        │\n└──────────────┴──────┴──────────────┴──────────┘',
        headers: [
          '部 门',
          '人数',
          '工资总额',
          '费用归属'
        ],
        rows: [
          [
              '科创园施工',
              '22',
              '90,000元',
              '合同成本'
          ],
          [
              '项目部管理',
              '5',
              '40,000元',
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
              '32',
              '155,000元',
              '—'
          ],
        ],
        signature: '制表：王出纳  审核：李会计  批准：赵经理'
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
        label: '社保公积金计提表',
        date: '2026-11-20',
        docTitle: '11 月 社 保 公 积 金 计 提 表',
        content: '期间：2026年11月\n计提基数：工资总额155,000元\n综合计提比例：36.7%（社保24.7%+公积金12%）\n\n费率明细：\n┌──────────┬────────┬──────────┐\n│ 险  种    │ 费率   │ 金额      │\n├──────────┼────────┼──────────┤\n│ 养老保险  │ 16.0%  │ 24,800   │\n├──────────┼────────┼──────────┤\n│ 医疗保险  │  6.5%  │ 10,075   │\n├──────────┼────────┼──────────┤\n│ 失业保险  │  0.5%  │    775   │\n├──────────┼────────┼──────────┤\n│ 工伤保险  │  0.7%  │  1,085   │\n├──────────┼────────┼──────────┤\n│ 生育保险  │  1.0%  │  1,550   │\n├──────────┼────────┼──────────┤\n│ 小计(社保)│ 24.7%  │ 38,285   │\n├──────────┼────────┼──────────┤\n│ 公积金    │ 12.0%  │ 18,600   │\n├──────────┼────────┼──────────┤\n│ 合  计    │ 36.7%  │ 56,885   │\n└──────────┴────────┴──────────┘\n\n分配：施工90K×36.7%=33,030元，项目部40K×36.7%=14,680元，管理25K×36.7%=9,175元',
        headers: [
          '险 种',
          '费率',
          '金额'
        ],
        rows: [
          [
              '养老保险',
              '16.0%',
              '24,800'
          ],
          [
              '医疗保险',
              '6.5%',
              '10,075'
          ],
          [
              '失业保险',
              '0.5%',
              '775'
          ],
          [
              '工伤保险',
              '0.7%',
              '1,085'
          ],
          [
              '生育保险',
              '1.0%',
              '1,550'
          ],
          [
              '小计(社保)',
              '24.7%',
              '38,285'
          ],
          [
              '公积金',
              '12.0%',
              '18,600'
          ],
          [
              '合 计',
              '36.7%',
              '56,885'
          ],
        ],
        signature: '制表：王出纳  审核：李会计'
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
        label: '折旧摊销计算表',
        date: '2026-11-21',
        docTitle: '11 月 折 旧 及 摊 销 计 算 表',
        content: '期间：2026年11月\n\n一、折旧计提（合计：7,058元）\n┌──────────────┬──────────┬──────┬──────────┬──────────┐\n│ 资产名称      │ 原值      │ 年限  │ 月折旧    │ 归属部门  │\n├──────────────┼──────────┼──────┼──────────┼──────────┤\n│ 旧施工机械    │ 800,000  │  10年 │  1,250   │ 机械使用  │\n├──────────────┼──────────┼──────┼──────────┼──────────┤\n│ 新塔吊QTZ80   │ 300,000  │   8年 │  3,125   │ 机械使用  │\n├──────────────┼──────────┼──────┼──────────┼──────────┤\n│ 新施工电梯    │ 200,000  │   8年 │  2,083   │ 机械使用  │\n├──────────────┼──────────┼──────┼──────────┼──────────┤\n│ 办公设备      │ 120,000  │   5年 │    600   │ 管理费用  │\n├──────────────┼──────────┼──────┼──────────┼──────────┤\n│ 小计          │1,420,000 │  —   │  7,058   │  —       │\n└──────────────┴──────────┴──────┴──────────┴──────────┘\n\n二、摊销计提（合计：15,000元）\n┌──────────────┬──────────┬──────────┬──────────┬────────┐\n│ 项目          │ 原值      │ 已摊销    │ 本月摊销  │ 余额   │\n├──────────────┼──────────┼──────────┼──────────┼────────┤\n│ 临设摊销      │ 150,000  │ 140,000  │  5,000   │ 10,000 │\n├──────────────┼──────────┼──────────┼──────────┼────────┤\n│ 房租摊销      │ 180,000  │ 170,000  │ 10,000   │ 10,000 │\n├──────────────┼──────────┼──────────┼──────────┼────────┤\n│ 小计          │ 330,000  │ 310,000  │ 15,000   │ 20,000 │\n└──────────────┴──────────┴──────────┴──────────┴────────┘\n\n合计：折旧7,058元 + 摊销15,000元 = 22,058元 ✓',
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
        signature: '制表：王出纳  审核：李会计'
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
        label: '间接费分配表',
        date: '2026-11-24',
        docTitle: '间 接 费 用 归 集 与 分 配 表',
        content: '期间：2026年11月\n\n一、费用归集\n┌──────────────┬──────────┐\n│ 费用项目      │ 金额      │\n├──────────────┼──────────┤\n│ 项目部工资    │ 40,000   │\n├──────────────┼──────────┤\n│ 项目部社保    │ 14,680   │\n├──────────────┼──────────┤\n│ 项目部办公    │  2,000   │\n├──────────────┼──────────┤\n│ 合计          │ 56,680   │\n└──────────────┴──────────┘\n\n二、分配情况\n仅科创园项目在建，全额分配\n分配率：100%\n分配金额：56,680元\n\n三、分配后余额：0元 ✓',
        headers: [
          '费用项目',
          '金额'
        ],
        rows: [
          [
              '项目部工资',
              '40,000'
          ],
          [
              '项目部社保',
              '14,680'
          ],
          [
              '项目部办公',
              '2,000'
          ],
          [
              '合计',
              '56,680'
          ],
        ],
        signature: '制表：王出纳  审核：李会计'
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
        label: '成本表（调整后）',
        date: '2026-11-25',
        docTitle: '科 创 园 成 本 调 整 结 转 表',
        content: '期间：2026年11月（调整后）\n\n调整说明：含间接费分摊56,680元 + 材料盘盈冲减12,600元\n\n成本构成：\n┌──────────────┬──────────┬─────────┐\n│ 成本项目      │ 调整前    │ 调整后    │\n├──────────────┼──────────┼─────────┤\n│ 直接人工      │ 160,000  │ 179,710  │\n├──────────────┼──────────┼─────────┤\n│ 直接材料      │ 300,000  │ 287,400  │\n├──────────────┼──────────┼─────────┤\n│ 劳务分包      │ 2,000,000│ 2,000,000│\n├──────────────┼──────────┼─────────┤\n│ 机械使用费    │  65,000  │  65,000  │\n├──────────────┼──────────┼─────────┤\n│ 其他直接费    │  47,000  │  47,000  │\n├──────────────┼──────────┼─────────┤\n│ 成本合计      │ 2,572,000│ 2,579,110│\n└──────────────┴──────────┴─────────┘\n\n差异：+7,110元（间接费56,680+人工19,710-材料盘盈12,600-原人工差额）\n成本归集后余额为零 ✓',
        headers: [
          '成本项目',
          '调整前',
          '调整后'
        ],
        rows: [
          [
              '直接人工',
              '160,000',
              '179,710'
          ],
          [
              '直接材料',
              '300,000',
              '287,400'
          ],
          [
              '劳务分包',
              '2,000,000',
              '2,000,000'
          ],
          [
              '机械使用费',
              '65,000',
              '65,000'
          ],
          [
              '其他直接费',
              '47,000',
              '47,000'
          ],
          [
              '成本合计',
              '2,572,000',
              '2,579,110'
          ],
        ],
        signature: '制表：王出纳  审核：李会计'
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
        label: '税费计算表',
        date: '2026-11-26',
        docTitle: '城 建 税 及 附 加 计 提 表',
        content: '期间：2026年11月\n\n一、增值税计算\n┌──────────────────┬──────────┐\n│ 项目              │ 金额      │\n├──────────────────┼──────────┤\n│ 销项税额          │ 183,600  │\n│   └科创园进度款    │ 183,600  │\n├──────────────────┼──────────┤\n│ 进项税额          │  85,602  │\n│   ├主体材料采购    │  39,000  │\n│   └劳务分包（3%）  │  46,602  │\n├──────────────────┼──────────┤\n│ 应交增值税        │  97,998  │\n└──────────────────┴──────────┘\n\n二、附加税费计算\n┌──────────────┬────────┬──────────┐\n│ 税种          │ 税率   │ 金额      │\n├──────────────┼────────┼──────────┤\n│ 城建税        │   7%   │  6,860   │\n├──────────────┼────────┼──────────┤\n│ 教育费附加    │   3%   │  2,940   │\n├──────────────┼────────┼──────────┤\n│ 地方教育附加  │   2%   │  1,960   │\n├──────────────┼────────┼──────────┤\n│ 合计          │  12%   │ 11,760   │\n└──────────────┴────────┴──────────┘\n\n97,998×12%=11,760元 ✓',
        headers: [
          '项目',
          '金额'
        ],
        rows: [
          [
              '销项税额',
              '183,600'
          ],
          [
              '└科创园进度款',
              '183,600'
          ],
          [
              '进项税额',
              '85,602'
          ],
          [
              '├主体材料采购',
              '39,000'
          ],
          [
              '└劳务分包（3%）',
              '46,602'
          ],
          [
              '应交增值税',
              '97,998'
          ],
        ],
        signature: '制表：王出纳  审核：李会计'
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
        label: '银行回单',
        date: '2026-11-27',
        totalAmount: 800,
        payer: '鼎立建筑工程有限公司',
        payeeName: '工商银行南京分行',
        content: '11月银行手续费',
        refNo: 'YW202611270001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 0123 4567 8901 234',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 9876 5432 1098 765'
      },
      {
        type: 'bank',
        label: '利息回单',
        date: '2026-11-27',
        totalAmount: 3500,
        payer: '工商银行南京分行',
        payeeName: '鼎立建筑工程有限公司',
        content: '11月存款利息',
        refNo: 'LX202611270001',
        payerBank: '工商银行南京分行营业部',
        payerAccount: '3200 9876 5432 1098 765',
        payeeBank: '工商银行南京分行营业部',
        payeeAccount: '3200 0123 4567 8901 234'
      }
    ]
  },
  {
    date: '2026-11-06',
    role: 'accountant',
    title: '科创园-材料检测费',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '科创园项目进场材料进行质量检测，费用5,000元，转账支付。',
    tip: '材料检测费计入"合同履约成本-其他直接费用"。',
    entries: [
      {
        subjectCode: '540105',
        debit: 5000,
        credit: 0,
        summary: '材料检测费',
        explanation: '合同履约成本-其他直接费用增加。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 5000,
        summary: '支付检测费',
        explanation: '银行存款减少5,000元。',
        cashFlowItem: 'cf-op6',
        cashFlowExplanation: '其他经营活动现金支出。'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '检测费发票',
        date: '2026-11-06',
        totalAmount: 5000,
        items: [
          { name: '材料质量检测', amount: 5000 }
        ]
      }
    ]
  },
  {
    date: '2026-11-12',
    role: 'accountant',
    title: '科创园-安全文明施工费',
    tags: [
      '工程成本'
    ],
    difficulty: 1,
    description: '科创园项目现场安全文明施工措施投入，购置安全标语、警示牌、消防器材等，费用8,000元，转账支付。',
    tip: '安全文明施工费计入"合同履约成本-其他直接费用"。',
    entries: [
      {
        subjectCode: '540105',
        debit: 8000,
        credit: 0,
        summary: '安全文明施工费',
        explanation: '合同履约成本-其他直接费用增加。'
      },
      {
        subjectCode: '100201',
        debit: 0,
        credit: 8000,
        summary: '支付安全文明施工费',
        explanation: '银行存款减少8,000元。',
        cashFlowItem: 'cf-op6',
        cashFlowExplanation: '其他经营活动现金支出。'
      }
    ],
    documents: [
      {
        type: 'receipt',
        label: '安全物资发票',
        date: '2026-11-12',
        totalAmount: 8000,
        items: [
          { name: '安全标语及警示牌', amount: 3000 },
          { name: '消防器材', amount: 5000 }
        ]
      }
    ]
  },
  {
    date: '2026-11-18',
    role: 'accountant',
    title: '供应商年终对账确认',
    tags: [
      '材料管理'
    ],
    difficulty: 1,
    description: '年末与各材料供应商进行往来对账，余额相符，双方签字确认。',
    tip: '对账确认不需做账务处理，只需在确认单上签字。点击"✅ 标记完成"即可。',
    entries: [],
    documents: [
      {
        type: 'text',
        label: '供应商对账确认表',
        date: '2026-11-18',
        content: '华强建材：应付余额128,000元 ✓\n大地商砼：应付余额95,000元 ✓\n鑫达钢材：应付余额45,000元 ✓',
        signature: '李会计/各供应商财务'
      }
    ]
  },
  {
    date: '2026-11-22',
    role: 'accountant',
    title: '计提应收账款坏账准备',
    tags: [
      '往来管理'
    ],
    difficulty: 2,
    description: '年末对应收账款进行信用风险评估，按应收账款余额的5%计提坏账准备。科创园项目应收进度款300,000元，计提坏账准备15,000元。',
    tip: '借记"信用减值损失"，贷记"坏账准备"。坏账准备是应收账款的抵减科目。',
    entries: [
      {
        subjectCode: '6701',
        debit: 15000,
        credit: 0,
        summary: '计提坏账准备',
        explanation: '信用减值损失增加15,000元。'
      },
      {
        subjectCode: '1231',
        debit: 0,
        credit: 15000,
        summary: '应收账款坏账准备',
        explanation: '坏账准备增加15,000元。'
      }
    ],
    documents: [
      {
        type: 'text',
        label: '坏账准备计提表',
        date: '2026-11-22',
        content: '应收账款余额：300,000元\n计提比例：5%\n计提金额：15,000元',
        signature: '李会计'
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
        label: '损益结转表',
        date: '2026-11-28',
        docTitle: '月 末 损 益 结 转 表',
        content: '期间：2026年11月\n\n一、收入结转\n  主营业务收入：2,040,000元（科创园进度款）\n\n二、成本费用结转\n┌──────────────┬──────────────────┬──────────┐\n│ 科目          │ 明细              │ 金额      │\n├──────────────┼──────────────────┼──────────┤\n│ 主营业务成本  │ 调整后成本        │ 2,579,110│\n├──────────────┼──────────────────┼──────────┤\n│ 税金及附加    │ 城建附加+印花税    │  13,260  │\n├──────────────┼──────────────────┼──────────┤\n│ 管理费用      │ 工资/社公/办公/折旧│  57,275  │\n├──────────────┼──────────────────┼──────────┤\n│ 信用减值损失  │ 坏账准备计提       │  51,000  │\n├──────────────┼──────────────────┼──────────┤\n│ 财务费用      │ 利息收支净额       │  −2,700  │\n├──────────────┼──────────────────┼──────────┤\n│ 费用合计      │  —               │ 2,697,945│\n└──────────────┴──────────────────┴──────────┘\n\n三、本月利润\n  收入2,040,000 − 费用2,697,945 = 净利润 −657,945元 ⚠️（亏损）\n\n原因：劳务分包成本2,000,000元集中确认在本月，导致月度亏损\n\n四、结转后余额为零 ✓',
        headers: [
          '科目',
          '明细',
          '金额'
        ],
        rows: [
          [
              '主营业务成本',
              '调整后成本',
              '2,579,110'
          ],
          [
              '税金及附加',
              '城建附加+印花税',
              '13,260'
          ],
          [
              '管理费用',
              '工资/社公/办公/折旧',
              '57,275'
          ],
          [
              '信用减值损失',
              '坏账准备计提',
              '51,000'
          ],
          [
              '财务费用',
              '利息收支净额',
              '−2,700'
          ],
          [
              '费用合计',
              '—',
              '2,697,945'
          ],
        ],
        signature: '制表：王出纳  审核：李会计'
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
        label: '模拟纳税申报表',
        date: '2026-11-30',
        docTitle: '11 月 税 费 申 报 汇 总 表',
        content: '申报期间：2026年11月\n纳税人：鼎立建筑工程有限公司\n\n一、增值税申报\n┌──────────────────┬──────────┐\n│ 项目              │ 金额      │\n├──────────────────┼──────────┤\n│ 销项税额          │ 183,600  │\n├──────────────────┼──────────┤\n│ 进项税额          │  85,602  │\n├──────────────────┼──────────┤\n│ 应交增值税        │  97,998  │\n└──────────────────┴──────────┘\n\n二、附加税费\n  城建税6,860 + 教育费附加2,940 + 地方附加1,960 = 11,760元\n\n三、应缴总额：增值税97,998 + 附加11,760 = 109,758元\n\n四、申报状态：📤 待提交申报',
        headers: [
          '项目',
          '金额'
        ],
        rows: [
          [
              '销项税额',
              '183,600'
          ],
          [
              '进项税额',
              '85,602'
          ],
          [
              '应交增值税',
              '97,998'
          ],
        ],
        signature: '财务负责人：李会计'
      }
    ],
    nextAction: 'tax-filing'
  }
]

export default tasks
