/**
 * 服务业 06月
 */

const tasks = [
  {
    "date": "2026-06-01",
    "role": "accountant",
    "title": "缴纳5月增值税及附加税",
    "tags": ["税费"],
    "difficulty": 2,
    "entries": [
      {
        "subjectCode": "222101",
        "summary": "增值税",
        "debit": 18000,
        "credit": 0,
        "explanation": "应交增值税减少记借方。缴纳增值税冲销负债。"
      },
      {
        "subjectCode": "222103",
        "summary": "城建税",
        "debit": 1260,
        "credit": 0,
        "explanation": "应交城建税增加记借方。计提城建税。"
      },
      {
        "subjectCode": "222104",
        "summary": "教育费附加",
        "debit": 540,
        "credit": 0,
        "explanation": "应交教育费附加增加记借方。计提教育费附加。"
      },
      {
        "subjectCode": "100201",
        "summary": "缴税",
        "debit": 0,
        "credit": 19800,
        "explanation": "银行存款减少记贷方。缴纳税款支付。",
        "cashFlowItem": "cf-op4",
        "cashFlowExplanation": "缴纳税费支出（配对科目222101），属于\"支付的各项税费\"——经营活动现金流出。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "付款回单",
        "totalAmount": 19800
      }
    ],
    "description": "通过银行转账缴纳各项税款合计19,800元。"
  },
  {
    "date": "2026-06-02",
    "role": "accountant",
    "title": "缴纳5月社保费",
    "tags": ["工资社保"],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "221102",
        "summary": "缴社保",
        "debit": 30250,
        "credit": 0,
        "explanation": "应付职工薪酬-社保减少记借方。缴纳社保冲销负债。"
      },
      {
        "subjectCode": "100201",
        "summary": "缴社保",
        "debit": 0,
        "credit": 30250,
        "explanation": "银行存款减少记贷方。缴纳社保费支付。",
        "cashFlowItem": "cf-op3",
        "cashFlowExplanation": "支付职工薪酬相关支出（配对科目221102），属于\"支付给职工以及为职工支付的现金\"——经营活动现金流出。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "付款回单",
        "totalAmount": 30250
      }
    ],
    "description": "通过银行转账缴纳社保费用合计30,250元。"
  },
  {
    "date": "2026-06-03",
    "role": "accountant",
    "title": "发放5月工资",
    "tags": [
      "人工成本",
      "工资社保"
    ],
    "difficulty": 3,
    "entries": [
      {
        "subjectCode": "221101",
        "summary": "应发",
        "debit": 121000,
        "credit": 0,
        "explanation": "应付职工薪酬增加记贷方。计提应发工资。"
      },
      {
        "subjectCode": "100201",
        "summary": "实发",
        "debit": 0,
        "credit": 117370,
        "explanation": "银行存款减少记贷方。实发工资转账支付。",
        "cashFlowItem": "cf-op6",
        "cashFlowExplanation": "其他经营活动现金支出（配对科目660203），属于\"支付其他与经营活动有关的现金\"。"
      },
      {
        "subjectCode": "222102",
        "summary": "个税",
        "debit": 0,
        "credit": 3630,
        "explanation": "应交个人所得税增加记贷方。代扣个税形成应交义务。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "付款回单",
        "totalAmount": 117370
      }
    ],
    "description": "通过银行转账缴纳各项税款合计121,000元。"
  },
  {
    "date": "2026-06-04",
    "role": "accountant",
    "title": "续签办公室租约（预付下半年房租）",
    "tags": [
      "费用管理"
    ],
    "difficulty": 2,
    "description": "续签下半年办公室租约，预付7-12月租金120,000元，银行转账。",
    "entries": [
      {
        "subjectCode": "1123",
        "summary": "预付下半年房租",
        "debit": 120000,
        "credit": 0,
        "explanation": "预付账款增加记借方。预付下半年房租形成债权。"
      },
      {
        "subjectCode": "100201",
        "summary": "付款",
        "debit": 0,
        "credit": 120000,
        "explanation": "银行存款减少记贷方。支付款项。",
        "cashFlowItem": "cf-op6",
        "cashFlowExplanation": "其他经营活动现金支出（配对科目1123），属于\"支付其他与经营活动有关的现金\"。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "付款回单",
        "totalAmount": 120000
      },
      {
        "type": "text",
        "label": "续租合同",
        "docTitle": "写字楼续租合同",
        "content": "续租2026年7月-12月，租金120,000元。"
      }
    ]
  },
  {
    "date": "2026-06-05",
    "role": "accountant",
    "title": "戊客户IT咨询项目终验",
    "tags": [
      "收入确认",
      "项目核算"
    ],
    "difficulty": 3,
    "description": "戊客户IT咨询项目全部完成，确认剩余收入200,000元，收到尾款212,000元（含税）。",
    "entries": [
      {
        "subjectCode": "100201",
        "summary": "终验尾款",
        "debit": 212000,
        "credit": 0,
        "explanation": "银行存款增加记借方。收到项目终验尾款。",
        "cashFlowItem": "cf-op",
        "cashFlowExplanation": "销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入——主营业务产生的现金收入。"
      },
      {
        "subjectCode": "6001",
        "summary": "确认收入",
        "debit": 0,
        "credit": 200000,
        "explanation": "主营业务收入增加记贷方。项目完成确认收入。"
      },
      {
        "subjectCode": "222101",
        "summary": "增值税",
        "debit": 0,
        "credit": 12000,
        "explanation": "应交增值税增加记贷方。确认收入产生增值税纳税义务。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "回单",
        "totalAmount": 212000
      }
    ]
  },
  {
    "date": "2026-06-06",
    "role": "accountant",
    "title": "结转戊项目成本",
    "tags": [
      "项目核算",
      "期末"
    ],
    "difficulty": 2,
    "description": "戊项目总成本约76,000元（人工+差旅），结转至主营业务成本。",
    "entries": [
      {
        "subjectCode": "6401",
        "summary": "结转戊项目成本",
        "debit": 76000,
        "credit": 0,
        "explanation": "主营业务成本增加记借方。项目完工结转成本。"
      },
      {
        "subjectCode": "520101",
        "summary": "人工成本",
        "debit": 0,
        "credit": 50000,
        "explanation": "合同履约成本减少记贷方。完工结转人工成本。"
      },
      {
        "subjectCode": "100201",
        "summary": "差旅费",
        "debit": 0,
        "credit": 16000,
        "explanation": "银行存款减少记贷方。支付差旅费。",
        "cashFlowItem": "cf-op6",
        "cashFlowExplanation": "其他经营活动现金支出（配对科目6401），属于\"支付其他与经营活动有关的现金\"。"
      },
      {
        "subjectCode": "520104",
        "summary": "其他直接费用",
        "debit": 0,
        "credit": 10000,
        "explanation": "合同履约成本减少记贷方。完工结转其他成本。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "成本结转表",
        "content": "戊项目成本76,000元。"
      }
    ]
  },
  {
    "date": "2026-06-09",
    "role": "accountant",
    "title": "半年度业务分析（查看类）",
    "tags": [
      "期末"
    ],
    "difficulty": 1,
    "description": "整理上半年业务数据，分析各项目收入成本情况。",
    "entries": [],
    "documents": [
      {
        "type": "text",
        "label": "分析报告",
        "content": "上半年收入合计约1,112,000元，成本约297,500元。净利润约365,000元。"
      }
    ]
  },
  {
    "date": "2026-06-10",
    "role": "accountant",
    "title": "计提6月上半月项目工资",
    "tags": [
      "项目核算",
      "人工成本"
    ],
    "difficulty": 2,
    "entries": [
      {
        "subjectCode": "520101",
        "summary": "项目上半月",
        "debit": 35000,
        "credit": 0,
        "explanation": "合同履约成本-人工增加记借方。项目人员上半月工资计提。"
      },
      {
        "subjectCode": "221101",
        "summary": "应付薪酬",
        "debit": 0,
        "credit": 35000,
        "explanation": "应付职工薪酬增加记贷方。计提工资负债增加。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "工资表",
        "content": "35,000元。"
      }
    ],
    "description": "通过银行代发工资合计35,000元。"
  },
  {
    "date": "2026-06-11",
    "role": "accountant",
    "title": "计提6月上半月管理工资",
    "tags": [
      "人工成本",
      "工资社保"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "660203",
        "summary": "管理上半月",
        "debit": 22500,
        "credit": 0,
        "explanation": "管理费用-工资薪金增加记借方。管理人员上半月工资计提。"
      },
      {
        "subjectCode": "221101",
        "summary": "应付薪酬",
        "debit": 0,
        "credit": 22500,
        "explanation": "应付职工薪酬增加记贷方。计提工资负债增加。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "工资表",
        "content": "22,500元。"
      }
    ],
    "description": "通过银行代发工资合计22,500元。"
  },
  {
    "date": "2026-06-12",
    "role": "accountant",
    "title": "支付6月水电费",
    "tags": [
      "费用管理"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "660201",
        "summary": "水电费",
        "debit": 6100,
        "credit": 0,
        "explanation": "管理费用-办公费增加记借方。水电费计入管理费用。"
      },
      {
        "subjectCode": "100201",
        "summary": "付款",
        "debit": 0,
        "credit": 6100,
        "explanation": "银行存款减少记贷方。支付款项。",
        "cashFlowItem": "cf-op6",
        "cashFlowExplanation": "其他经营活动现金支出（配对科目660201），属于\"支付其他与经营活动有关的现金\"。"
      }
    ],
    "documents": [
      {
        "type": "receipt",
        "label": "账单",
        "totalAmount": 6100
      }
    ],
    "description": "支付6月水电费，涉及金额6,100元。"
  },
  {
    "date": "2026-06-13",
    "role": "accountant",
    "title": "取得新短期借款",
    "tags": ["资金管理"],
    "difficulty": 1,
    "description": "为补充流动资金，向建设银行借入短期借款200,000元，年利率4.0%。",
    "entries": [
      {
        "subjectCode": "100201",
        "summary": "取得借款",
        "debit": 200000,
        "credit": 0,
        "explanation": "银行存款增加记借方。取得借款资金到账。",
        "cashFlowItem": "cf-fin",
        "cashFlowExplanation": "借款收到的现金（配对科目2001），属于筹资活动现金流入——企业通过负债融资获得资金。"
      },
      {
        "subjectCode": "2001",
        "summary": "短期借款",
        "debit": 0,
        "credit": 200000,
        "explanation": "短期借款增加记贷方。取得借款承担还本付息义务。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "借款回单",
        "totalAmount": 200000
      }
    ]
  },
  {
    "date": "2026-06-14",
    "role": "accountant",
    "title": "支付半年度审计费",
    "tags": [
      "费用管理"
    ],
    "difficulty": 1,
    "description": "支付会计师事务所半年度审计费8,000元，银行转账。",
    "entries": [
      {
        "subjectCode": "660201",
        "summary": "审计费",
        "debit": 8000,
        "credit": 0,
        "explanation": "管理费用-办公费增加记借方。审计费用计入管理费。"
      },
      {
        "subjectCode": "100201",
        "summary": "付款",
        "debit": 0,
        "credit": 8000,
        "explanation": "银行存款减少记贷方。支付款项。",
        "cashFlowItem": "cf-op6",
        "cashFlowExplanation": "其他经营活动现金支出（配对科目660201），属于\"支付其他与经营活动有关的现金\"。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "付款回单",
        "totalAmount": 8000
      }
    ]
  },
  {
    "date": "2026-06-16",
    "role": "accountant",
    "title": "计提6月下半月项目工资",
    "tags": [
      "项目核算",
      "人工成本"
    ],
    "difficulty": 2,
    "entries": [
      {
        "subjectCode": "520101",
        "summary": "项目下半月",
        "debit": 35000,
        "credit": 0,
        "explanation": "合同履约成本-人工增加记借方。项目人员下半月工资计提。"
      },
      {
        "subjectCode": "221101",
        "summary": "应付薪酬",
        "debit": 0,
        "credit": 35000,
        "explanation": "应付职工薪酬增加记贷方。计提工资负债增加。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "工资表",
        "content": "35,000元。"
      }
    ],
    "description": "通过银行代发工资合计35,000元。"
  },
  {
    "date": "2026-06-17",
    "role": "accountant",
    "title": "计提6月下半月管理工资",
    "tags": [
      "人工成本",
      "工资社保"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "660203",
        "summary": "管理下半月",
        "debit": 22500,
        "credit": 0,
        "explanation": "管理费用-工资薪金增加记借方。管理人员下半月工资计提。"
      },
      {
        "subjectCode": "221101",
        "summary": "应付薪酬",
        "debit": 0,
        "credit": 22500,
        "explanation": "应付职工薪酬增加记贷方。计提工资负债增加。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "工资表",
        "content": "22,500元。"
      }
    ],
    "description": "通过银行代发工资合计22,500元。"
  },
  {
    "date": "2026-06-18",
    "role": "accountant",
    "title": "计提6月社保",
    "tags": [
      "人工成本",
      "工资社保"
    ],
    "difficulty": 2,
    "entries": [
      {
        "subjectCode": "520101",
        "summary": "项目社保",
        "debit": 17500,
        "credit": 0,
        "explanation": "合同履约成本-人工增加记借方。项目人员社保计入项目成本。"
      },
      {
        "subjectCode": "660203",
        "summary": "管理社保",
        "debit": 11250,
        "credit": 0,
        "explanation": "管理费用-工资薪金增加记借方。管理人员单位社保计入管理费。"
      },
      {
        "subjectCode": "221102",
        "summary": "社保费用",
        "debit": 0,
        "credit": 28750,
        "explanation": "应付职工薪酬-社保增加记贷方。计提社保费用。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "社保表",
        "content": "17,500+11,250=28,750。"
      }
    ],
    "description": "通过银行转账缴纳社保费用合计28,750元。"
  },
  {
    "date": "2026-06-19",
    "role": "accountant",
    "title": "计提6月折旧",
    "tags": [
      "费用管理"
    ],
    "difficulty": 2,
    "entries": [
      {
        "subjectCode": "660205",
        "summary": "折旧",
        "debit": 4085,
        "credit": 0,
        "explanation": "管理费用-折旧费增加记借方。折旧费用计入管理费。"
      },
      {
        "subjectCode": "1602",
        "summary": "累计折旧",
        "debit": 0,
        "credit": 4085,
        "explanation": "累计折旧增加记贷方。计提固定资产折旧。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "折旧表",
        "content": "4,085元。"
      }
    ],
    "description": "计提6月折旧，涉及金额4,085元。"
  },
  {
    "date": "2026-06-20",
    "role": "accountant",
    "title": "无形资产摊销",
    "tags": [
      "费用管理"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "660206",
        "summary": "摊销",
        "debit": 2555.55,
        "credit": 0,
        "explanation": "管理费用-摊销费增加记借方。摊销费用计入管理费用。"
      },
      {
        "subjectCode": "1702",
        "summary": "累计摊销",
        "debit": 0,
        "credit": 2555.55,
        "explanation": "累计摊销增加记贷方。计提无形资产摊销。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "摊销表",
        "content": "2,555.55元。"
      }
    ],
    "description": "无形资产摊销，涉及金额2,555.55元。"
  },
  {
    "date": "2026-06-23",
    "role": "accountant",
    "title": "计提6月借款利息",
    "tags": ["期末"],
    "difficulty": 1,
    "description": "计提6月新借款利息。建设银行200,000×4.0%÷12=666.67元。",
    "entries": [
      {
        "subjectCode": "6603",
        "summary": "借款利息",
        "debit": 666.67,
        "credit": 0,
        "explanation": "财务费用增加记借方。借款利息计入财务费用。"
      },
      {
        "subjectCode": "2232",
        "summary": "应付利息",
        "debit": 0,
        "credit": 666.67,
        "explanation": "应付利息增加记贷方。计提借款利息费用。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "利息表",
        "content": "666.67元。"
      }
    ]
  },
  {
    "date": "2026-06-24",
    "role": "accountant",
    "title": "摊销6月办公室租金",
    "tags": [
      "费用管理"
    ],
    "difficulty": 1,
    "description": "下半年预付租金7月起生效，6月仍摊销上期预付的最后一笔（已摊销完毕），本月无需摊销。但可用\"其他\"角度记管理费用。",
    "entries": [],
    "documents": [
      {
        "type": "text",
        "label": "说明",
        "content": "6月房租已在上期预付中摊销完毕，本月无房租摊销。新预付下半年租金从7月开始摊销。"
      }
    ]
  },
  {
    "date": "2026-06-25",
    "role": "accountant",
    "title": "计算6月增值税及附加税",
    "tags": [
      "税费",
      "期末"
    ],
    "difficulty": 2,
    "description": "销项：戊客户尾款12,000元。进项：审计费480元（8,000×6%）。应交=11,520元。附加税1,152元。",
    "entries": [
      {
        "subjectCode": "222103",
        "summary": "城建税",
        "debit": 806.4,
        "credit": 0,
        "explanation": "应交城建税增加记借方。计提城建税。"
      },
      {
        "subjectCode": "222104",
        "summary": "教育费附加",
        "debit": 345.6,
        "credit": 0,
        "explanation": "应交教育费附加增加记借方。计提教育费附加。"
      },
      {
        "subjectCode": "222103",
        "summary": "城建税",
        "debit": 0,
        "credit": 806.4,
        "explanation": "应交城建税增加记贷方。按增值税计提城建税。"
      },
      {
        "subjectCode": "222104",
        "summary": "教育费附加",
        "debit": 0,
        "credit": 345.6,
        "explanation": "应交教育费附加增加记贷方。按增值税计提教育费附加。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "增值税计算表",
        "content": "应交11,520元，附加税1,152元。"
      }
    ]
  },
  {
    "date": "2026-06-26",
    "role": "accountant",
    "title": "半年利润分配（计提盈余公积）",
    "tags": [
      "期末"
    ],
    "difficulty": 3,
    "description": "上半年税后利润约365,000元，按10%计提法定盈余公积36,500元。",
    "entries": [
      {
        "subjectCode": "4104",
        "summary": "提取盈余公积",
        "debit": 36500,
        "credit": 0,
        "explanation": "利润分配减少记借方。提取盈余公积。"
      },
      {
        "subjectCode": "4104",
        "summary": "未分配利润",
        "debit": 0,
        "credit": 36500,
        "explanation": "利润分配增加记贷方。年末结转净利润。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "利润分配表",
        "content": "按净利润10%计提盈余公积。"
      }
    ]
  },
  {
    "date": "2026-06-27",
    "role": "accountant",
    "title": "期末结转损益",
    "tags": [
      "期末"
    ],
    "difficulty": 3,
    "description": "收入200,000元。成本76,000+税金1,152+管理费用约108,000+财务费用666.67=185,818.67。净利润约14,181.33元。",
    "entries": [
      { subjectCode: '6001', debit: 452000, credit: 0, summary: '结转收入', explanation: '主营业务收入减少记借方。期末结转至本年利润。' },
      { subjectCode: '6401', debit: 0, credit: 76000, summary: '成本', explanation: '主营业务成本减少记贷方。期末结转至本年利润。' },
      { subjectCode: '660201', debit: 0, credit: 31300, summary: '管理费用', explanation: '管理费用减少记贷方。期末结转至本年利润。' },
      { subjectCode: '660203', debit: 0, credit: 56250, summary: '结转660203', explanation: '660203转出，余额归零。' },
      { subjectCode: '660205', debit: 0, credit: 4085, summary: '结转660205', explanation: '660205转出，余额归零。' },
      { subjectCode: '660206', debit: 0, credit: 2555.55, summary: '结转660206', explanation: '660206转出，余额归零。' },
      { subjectCode: '6603', debit: 0, credit: 666.67, summary: '财务费用', explanation: '财务费用减少记贷方。期末结转至本年利润。' },
      { subjectCode: '4103', debit: 0, credit: 281142.78, summary: '费用转利润', explanation: '本年利润减少记借方。费用结转至本年利润。' }
    ],
    "documents": [
      {
        "type": "text",
        "label": "损益表",
        "content": "6月净利润约14,181元。"
      }
    ]
  },
  {
    "date": "2026-06-28",
    "role": "accountant",
    "title": "半年末资产盘点",
    "tags": [
      "期末"
    ],
    "difficulty": 1,
    "description": "半年末对固定资产、无形资产进行盘点。",
    "entries": [],
    "documents": [
      {
        "type": "text",
        "label": "盘点报告",
        "content": "资产盘点无异常。"
      }
    ]
  },
  {
    "date": "2026-06-01",
    "title": "纳税转账",
    "tags": [
      "出纳",
      "税费"
    ],
    "difficulty": 1,
    "role": "cashier",
    "entries": [
      {
        "subjectCode": "222110",
        "summary": "税",
        "debit": 18000,
        "credit": 0,
        "explanation": "未交增值税减少记借方。缴纳税款冲销负债。"
      },
      {
        "subjectCode": "222110",
        "summary": "税",
        "debit": 0,
        "credit": 18000,
        "explanation": "未交增值税增加记贷方。计提应交增值税。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "付款回单",
        "totalAmount": 18000
      }
    ],
    "description": "通过银行转账缴纳各项税款合计18,000元。"
  },
  {
    "date": "2026-06-02",
    "title": "社保缴纳",
    "tags": [
      "出纳",
      "工资社保"
    ],
    "difficulty": 1,
    "role": "cashier",
    "entries": [
      {
        "subjectCode": "221102",
        "summary": "社保",
        "debit": 30250,
        "credit": 0,
        "explanation": "应付职工薪酬-社保减少记借方。缴纳社保冲销负债。"
      },
      {
        "subjectCode": "221102",
        "summary": "社保",
        "debit": 0,
        "credit": 30250,
        "explanation": "应付职工薪酬-社保增加记贷方。计提社保负债增加。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "付款回单",
        "totalAmount": 30250
      }
    ],
    "description": "通过银行转账缴纳社保费用合计30,250元。"
  },
  {
    "date": "2026-06-03",
    "title": "工资代发",
    "tags": [
      "出纳",
      "工资社保"
    ],
    "difficulty": 2,
    "role": "cashier",
    "entries": [
      {
        "subjectCode": "660203",
        "summary": "工资",
        "debit": 121000,
        "credit": 0,
        "explanation": "管理费用-工资薪金增加记借方。管理人员工资计入管理费。"
      },
      {
        "subjectCode": "100201",
        "summary": "实发",
        "debit": 0,
        "credit": 117370,
        "explanation": "银行存款减少记贷方。实发工资转账支付。",
        "cashFlowItem": "cf-op6",
        "cashFlowExplanation": "其他经营活动现金支出（配对科目660203），属于\"支付其他与经营活动有关的现金\"。"
      },
      {
        "subjectCode": "222102",
        "summary": "个税",
        "debit": 0,
        "credit": 3630,
        "explanation": "应交个人所得税增加记贷方。代扣个税形成应交义务。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "回单",
        "totalAmount": 117370
      }
    ],
    "description": "通过银行转账缴纳各项税款合计121,000元。"
  },
  {
    "date": "2026-06-04",
    "title": "房租预付转账",
    "tags": [
      "出纳",
      "费用管理"
    ],
    "difficulty": 1,
    "role": "cashier",
    "entries": [
      {
        "subjectCode": "1123",
        "summary": "预付房租",
        "debit": 120000,
        "credit": 0,
        "explanation": "预付账款增加记借方。预付房租形成债权。"
      },
      {
        "subjectCode": "100201",
        "summary": "付款",
        "debit": 0,
        "credit": 120000,
        "explanation": "银行存款减少记贷方。支付款项。",
        "cashFlowItem": "cf-op6",
        "cashFlowExplanation": "其他经营活动现金支出（配对科目1123），属于\"支付其他与经营活动有关的现金\"。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "回单",
        "totalAmount": 120000
      }
    ],
    "description": "通过银行转账/代扣支付120,000元。"
  },
  {
    "date": "2026-06-05",
    "role": "accountant",
    "title": "终验尾款到账",
    "tags": ["出纳"],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "100201",
        "summary": "尾款",
        "debit": 212000,
        "credit": 0,
        "explanation": "银行存款增加记借方。收到尾款入账。",
        "cashFlowItem": "cf-op",
        "cashFlowExplanation": "销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入——主营业务产生的现金收入。"
      },
      {
        "subjectCode": "6001",
        "summary": "收入",
        "debit": 0,
        "credit": 212000,
        "explanation": "主营业务收入增加记贷方。项目收入确认入账。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "回单",
        "totalAmount": 212000
      }
    ],
    "description": "收到客户款项212,000元，已存入银行账户。"
  },
  {
    "date": "2026-06-13",
    "role": "accountant",
    "title": "新借款到账",
    "tags": ["出纳"],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "2001",
        "summary": "借款",
        "debit": 200000,
        "credit": 0,
        "explanation": "短期借款减少记借方。偿还借款本金。"
      },
      {
        "subjectCode": "2001",
        "summary": "借款",
        "debit": 0,
        "credit": 200000,
        "explanation": "短期借款增加记贷方。取得短期借款。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "回单",
        "totalAmount": 200000,
        "content": "建行借款"
      }
    ],
    "description": "通过银行转账偿还借款本息合计200,000元。"
  },
  {
    "date": "2026-06-14",
    "role": "accountant",
    "title": "审计费转账",
    "tags": [
      "费用管理"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "660201",
        "summary": "审计费",
        "debit": 8000,
        "credit": 0,
        "explanation": "管理费用-办公费增加记借方。审计费用计入管理费。"
      },
      {
        "subjectCode": "100201",
        "summary": "付款",
        "debit": 0,
        "credit": 8000,
        "explanation": "银行存款减少记贷方。支付款项。",
        "cashFlowItem": "cf-op6",
        "cashFlowExplanation": "其他经营活动现金支出（配对科目660201），属于\"支付其他与经营活动有关的现金\"。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "回单",
        "totalAmount": 8000
      }
    ],
    "description": "通过银行转账/代扣支付8,000元。"
  },
  {
    "date": "2026-06-28",
    "role": "accountant",
    "title": "现金盘点",
    "tags": [
      "期末"
    ],
    "difficulty": 1,
    "entries": [],
    "documents": [
      {
        "type": "text",
        "label": "盘点表",
        "content": "账实相符。"
      }
    ],
    "description": "对库存现金进行月末盘点，确保账实相符。"
  },
  {
    "date": "2026-06-29",
    "role": "accountant",
    "title": "银行对账",
    "tags": [
      "期末"
    ],
    "difficulty": 1,
    "entries": [],
    "documents": [
      {
        "type": "text",
        "label": "对账单",
        "content": "核对一致。"
      }
    ],
    "description": "将银行日记账与银行对账单进行核对，编制余额调节表。"
  },
  {
    "date": "2026-06-30",
    "role": "accountant",
    "title": "半年度票据归档",
    "tags": [
      "期末"
    ],
    "difficulty": 1,
    "entries": [],
    "documents": [
      {
        "type": "text",
        "label": "归档",
        "content": "半年票据归档完毕。"
      }
    ],
    "description": "将本月凭证整理装订成册，归档保存。"
  },
  {
    "date": "2026-06-08",
    "role": "accountant",
    "title": "支付宝收款-项目尾款",
    "tags": ["出纳"],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "101205",
        "summary": "支付宝收款",
        "debit": 31800,
        "credit": 0,
        "explanation": "其他货币资金-支付宝增加记借方。支付宝收款入账。",
        "cashFlowItem": "cf-op",
        "cashFlowExplanation": "销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入——主营业务产生的现金收入。"
      },
      {
        "subjectCode": "6001",
        "summary": "确认收入",
        "debit": 0,
        "credit": 30000,
        "explanation": "主营业务收入增加记贷方。项目完成确认收入。"
      },
      {
        "subjectCode": "222101",
        "summary": "计提增值税",
        "debit": 0,
        "credit": 1800,
        "explanation": "应交增值税增加记贷方。产生增值税纳税义务。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "记录"
      }
    ],
    "description": "通过银行转账缴纳各项税款合计31,800元。"
  },
  {
    "date": "2026-06-09",
    "role": "accountant",
    "title": "微信支付办公用品采购",
    "tags": [
      "费用管理"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "660201",
        "summary": "管理费用",
        "debit": 2200,
        "credit": 0,
        "explanation": "管理费用-办公费增加记借方。办公费用计入管理费。"
      },
      {
        "subjectCode": "101204",
        "summary": "微信付款",
        "debit": 0,
        "credit": 2200,
        "explanation": "其他货币资金-微信减少记贷方。微信支付款项。",
        "cashFlowItem": "cf-op6",
        "cashFlowExplanation": "其他经营活动现金支出（配对科目660201），属于\"支付其他与经营活动有关的现金\"。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "记录"
      }
    ],
    "description": "微信支付办公用品采购，涉及金额2,200元。"
  },
  {
    "date": "2026-06-10",
    "role": "accountant",
    "title": "银行转账支付空调维修费",
    "tags": [
      "费用管理"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "660201",
        "summary": "管理费用",
        "debit": 3800,
        "credit": 0,
        "explanation": "管理费用-办公费增加记借方。办公费用计入管理费。"
      },
      {
        "subjectCode": "100201",
        "summary": "银行存款减少",
        "debit": 0,
        "credit": 3800,
        "explanation": "银行存款减少记贷方。银行款项支出。",
        "cashFlowItem": "cf-op6",
        "cashFlowExplanation": "其他经营活动现金支出（配对科目660201），属于\"支付其他与经营活动有关的现金\"。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "记录"
      }
    ],
    "description": "通过银行转账/代扣支付3,800元。"
  },
  {
    "date": "2026-06-11",
    "role": "accountant",
    "title": "现金支付员工交通补贴",
    "tags": [
      "费用管理"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "660201",
        "summary": "管理费用",
        "debit": 3200,
        "credit": 0,
        "explanation": "管理费用-办公费增加记借方。办公费用计入管理费。"
      },
      {
        "subjectCode": "1001",
        "summary": "现金减少",
        "debit": 0,
        "credit": 3200,
        "explanation": "库存现金减少记贷方。现金支付款项。",
        "cashFlowItem": "cf-op6",
        "cashFlowExplanation": "其他经营活动现金支出（配对科目660201），属于\"支付其他与经营活动有关的现金\"。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "记录"
      }
    ],
    "description": "以现金支付3,200元。"
  },
  {
    "date": "2026-06-12",
    "role": "accountant",
    "title": "提取备用金",
    "tags": ["出纳"],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "1001",
        "summary": "现金增加",
        "debit": 8000,
        "credit": 0,
        "explanation": "库存现金增加记借方。现金收款入账。"
      },
      {
        "subjectCode": "100201",
        "summary": "银行存款减少",
        "debit": 0,
        "credit": 8000,
        "explanation": "银行存款减少记贷方。银行款项支出。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "记录"
      }
    ],
    "description": "从银行提取现金8,000元作为备用金。"
  },
  {
    "date": "2026-06-21",
    "role": "accountant",
    "title": "银行托收承兑汇票",
    "tags": [
      "往来管理"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "100201",
        "summary": "银行存款增加",
        "debit": 50000,
        "credit": 0,
        "explanation": "银行存款增加记借方。款项存入银行。",
        "cashFlowItem": "cf-op",
        "cashFlowExplanation": "销售商品/提供劳务收到的现金（配对科目1121），属于经营活动现金流入——主营业务产生的现金收入。"
      },
      {
        "subjectCode": "1121",
        "summary": "应收票据减少",
        "debit": 0,
        "credit": 50000,
        "explanation": "应收票据减少记贷方。应收票据到期或背书转让。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "记录"
      }
    ],
    "description": "银行托收商业汇票到期，款项已划入银行账户。"
  },
  {
    "date": "2026-06-24",
    "role": "accountant",
    "title": "微信收款-培训费",
    "tags": ["出纳"],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "101204",
        "summary": "微信收款",
        "debit": 10600,
        "credit": 0,
        "explanation": "其他货币资金-微信增加记借方。微信收款入账。",
        "cashFlowItem": "cf-op",
        "cashFlowExplanation": "销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入——主营业务产生的现金收入。"
      },
      {
        "subjectCode": "6001",
        "summary": "确认收入",
        "debit": 0,
        "credit": 10000,
        "explanation": "主营业务收入增加记贷方。项目完成确认收入。"
      },
      {
        "subjectCode": "222101",
        "summary": "计提增值税",
        "debit": 0,
        "credit": 600,
        "explanation": "应交增值税增加记贷方。产生增值税纳税义务。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "记录"
      }
    ],
    "description": "通过银行转账缴纳各项税款合计10,600元。"
  },
  {
    date: "2026-06-30",
    "role": "accountant",
    title: "模拟纳税申报",
    tags: ["期末", "税费"],
    difficulty: 1,
    description: "根据本月已完成的账务处理，进行模拟纳税申报。系统已自动计算应缴税额（增值税和企业所得税），请前往纳税申报页面核对并提交。",
    tip: "纳税申报是企业每月的法定义务。确认所有凭证已过账、期末结转已完成后，前往纳税申报页面核对各项税额后点击「提交申报」。",
    entries: [],
    documents: [
      { type: "text", label: "纳税申报提醒", docTitle: "6月纳税申报提醒", content: "申报期间：2026-06-30\n\n请前往纳税申报页面：\n1. 核对增值税申报表数据\n2. 核对企业所得税申报表数据\n3. 确认无误后点击「提交申报」\n\n纳税申报是企业每月必做的合规义务，请按时完成。", stampText: "财务专用章" }]},
]

export default tasks
