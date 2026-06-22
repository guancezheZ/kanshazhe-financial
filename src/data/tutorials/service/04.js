/**
 * 服务业 04月
 */

const tasks = [
  {
    "date": "2026-04-01",
    "title": "缴纳3月增值税及附加税",
    "tags": ["税费"],
    "difficulty": 2,
    "description": "缴纳3月应交增值税19,800元、城建税1,386元、教育费附加594元，合计21,780元。",
    "entries": [
      {
        "subjectCode": "222101",
        "summary": "缴纳增值税",
        "debit": 19800,
        "credit": 0,
        "explanation": "应交增值税减少记借方。缴纳增值税冲销负债。"
      },
      {
        "subjectCode": "222103",
        "summary": "缴纳城建税",
        "debit": 1386,
        "credit": 0,
        "explanation": "应交城建税减少记借方。缴纳城建税冲销负债。"
      },
      {
        "subjectCode": "222104",
        "summary": "缴纳教育费附加",
        "debit": 594,
        "credit": 0,
        "explanation": "应交教育费附加减少记借方。缴纳教育费附加冲销负债。"
      },
      {
        "subjectCode": "100201",
        "summary": "缴纳税款",
        "debit": 0,
        "credit": 21780,
        "explanation": "银行存款减少记贷方。银行扣缴税款支付。",
        "cashFlowItem": "cf-op4",
        "cashFlowExplanation": "缴纳税费支出（配对科目222101），属于\"支付的各项税费\"——经营活动现金流出。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "付款回单",
        "date": "2026-04-01",
        "totalAmount": 21780,
        "payer": "雲帆管理咨询有限公司",
        "payeeName": "国家金库",
        "content": "纳税",
        "refNo": "FK202604010001"
      }
    ]
  },
  {
    "date": "2026-04-02",
    "title": "缴纳3月社保费",
    "tags": ["工资社保"],
    "difficulty": 1,
    "description": "缴纳3月社保费34,250元，银行转账。",
    "entries": [
      {
        "subjectCode": "221102",
        "summary": "缴纳社保",
        "debit": 34250,
        "credit": 0,
        "explanation": "应付职工薪酬-社保减少记借方。缴纳社保冲销负债。"
      },
      {
        "subjectCode": "221102",
        "summary": "缴纳社保",
        "debit": 0,
        "credit": 34250,
        "explanation": "银行存款减少记贷方。缴纳社保支付。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "付款回单",
        "date": "2026-04-02",
        "totalAmount": 34250,
        "payer": "雲帆管理咨询有限公司",
        "payeeName": "社保中心",
        "content": "社保",
        "refNo": "FK202604020001"
      }
    ]
  },
  {
    "date": "2026-04-03",
    "title": "缴纳一季度所得税",
    "tags": ["税费"],
    "difficulty": 2,
    "description": "缴纳一季度预缴所得税140,096.25元，银行转账。",
    "entries": [
      {
        "subjectCode": "222102",
        "summary": "缴纳所得税",
        "debit": 140096.25,
        "credit": 0,
        "explanation": "应交所得税减少记借方。缴纳所得税冲销负债。"
      },
      {
        "subjectCode": "222102",
        "summary": "缴纳所得税",
        "debit": 0,
        "credit": 140096.25,
        "explanation": "银行存款减少记贷方。缴纳所得税款支付。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "付款回单",
        "date": "2026-04-03",
        "totalAmount": 140096.25,
        "payer": "雲帆管理咨询有限公司",
        "payeeName": "国家税务局",
        "content": "所得税预缴",
        "refNo": "FK202604030001"
      }
    ]
  },
  {
    "date": "2026-04-04",
    "title": "发放3月工资",
    "tags": [
      "人工成本",
      "工资社保"
    ],
    "difficulty": 3,
    "description": "发放3月工资。应发项目92,000+管理45,000=137,000元，代扣个税4,110元，实发132,890元。",
    "entries": [
      {
        "subjectCode": "221101",
        "summary": "发放工资",
        "debit": 137000,
        "credit": 0,
        "explanation": "应付职工薪酬减少记借方。发放工资冲销负债。"
      },
      {
        "subjectCode": "100201",
        "summary": "实发工资",
        "debit": 0,
        "credit": 132890,
        "explanation": "银行存款减少记贷方。实发工资转账支付。",
        "cashFlowItem": "cf-op3",
        "cashFlowExplanation": "支付职工薪酬相关支出（配对科目221101），属于\"支付给职工以及为职工支付的现金\"——经营活动现金流出。"
      },
      {
        "subjectCode": "222102",
        "summary": "代扣个税",
        "debit": 0,
        "credit": 4110,
        "explanation": "应交个人所得税增加记贷方。代扣员工个人所得税。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "付款回单",
        "date": "2026-04-04",
        "totalAmount": 132890,
        "payer": "雲帆管理咨询有限公司",
        "payeeName": "批量代发",
        "content": "3月工资",
        "refNo": "FK202604040001"
      }
    ]
  },
  {
    "date": "2026-04-05",
    "title": "公司购车（商务用车）",
    "tags": [
      "费用管理"
    ],
    "difficulty": 2,
    "description": "购买商务车一辆150,000元，银行转账。",
    "entries": [
      {
        "subjectCode": "160105",
        "summary": "购买商务车",
        "debit": 150000,
        "credit": 0,
        "explanation": "固定资产-运输设备增加记借方。购入商务车按成本入账。"
      },
      {
        "subjectCode": "100201",
        "summary": "购车付款",
        "debit": 0,
        "credit": 150000,
        "explanation": "银行存款减少记贷方。支付购车款项。",
        "cashFlowItem": "cf-inv",
        "cashFlowExplanation": "购建固定资产/无形资产支出（配对科目160105），属于投资活动现金流出——资本性支出，区别于日常经营支出。"
      }
    ],
    "documents": [
      {
        "type": "invoice",
        "label": "机动车发票",
        "date": "2026-04-05",
        "buyer": "雲帆管理咨询有限公司",
        "seller": "北京腾龙汽车销售有限公司",
        "lineItems": [
          {
            "name": "商务车",
            "qty": 1,
            "price": 150000,
            "amount": 150000
          }
        ],
        "totalAmount": 150000
      }
    ]
  },
  {
    "date": "2026-04-07",
    "title": "短期借款到期还本付息",
    "tags": ["资金管理"],
    "difficulty": 2,
    "description": "1月取得的短期借款300,000元到期，支付本息合计303,262.50元。",
    "entries": [
      {
        "subjectCode": "2001",
        "summary": "偿还借款本金",
        "debit": 300000,
        "credit": 0,
        "explanation": "短期借款减少记借方。偿还短期借款本金。"
      },
      {
        "subjectCode": "2232",
        "summary": "支付应付利息",
        "debit": 3262.5,
        "credit": 0,
        "explanation": "应付利息减少记借方。支付应付利息冲销负债。"
      },
      {
        "subjectCode": "100201",
        "summary": "还本付息",
        "debit": 0,
        "credit": 303262.5,
        "explanation": "银行存款减少记贷方。偿还借款本息。",
        "cashFlowItem": "cf-fin2",
        "cashFlowExplanation": "偿还债务本金（配对科目2001），属于筹资活动现金流出。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "付款回单",
        "date": "2026-04-07",
        "totalAmount": 303262.5,
        "payer": "雲帆管理咨询有限公司",
        "payeeName": "工商银行",
        "content": "贷款还本付息",
        "refNo": "FK202604070001"
      }
    ]
  },
  {
    "date": "2026-04-08",
    "title": "签订新软件外包开发合同",
    "tags": [
      "收入确认",
      "往来管理"
    ],
    "difficulty": 2,
    "description": "与丁客户签订移动App外包开发合同200,000元（不含税），增值税6%，预收50%定金106,000元。",
    "entries": [
      {
        "subjectCode": "100201",
        "summary": "收取定金",
        "debit": 106000,
        "credit": 0,
        "explanation": "银行存款增加记借方。收取客户定金。",
        "cashFlowItem": "cf-op5",
        "cashFlowExplanation": "其他经营活动现金流入（配对科目2205），属于\"收到其他与经营活动有关的现金\"。"
      },
      {
        "subjectCode": "2205",
        "summary": "合同负债",
        "debit": 0,
        "credit": 100000,
        "explanation": "合同负债增加记贷方。预收款形成合同负债。"
      },
      {
        "subjectCode": "222101",
        "summary": "定金增值税",
        "debit": 0,
        "credit": 6000,
        "explanation": "应交增值税增加记贷方。定金收入产生增值税纳税义务。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "银行回单",
        "date": "2026-04-08",
        "totalAmount": 106000,
        "payer": "丁客户",
        "payeeName": "雲帆管理咨询有限公司",
        "content": "App开发定金",
        "refNo": "HD202604080001"
      }
    ]
  },
  {
    "date": "2026-04-09",
    "title": "摊销4月办公室租金",
    "tags": [
      "费用管理"
    ],
    "difficulty": 1,
    "description": "摊销4月办公室租金20,000元。",
    "entries": [
      {
        "subjectCode": "660206",
        "summary": "摊销房租",
        "debit": 20000,
        "credit": 0,
        "explanation": "管理费用-摊销费增加记借方。摊销办公室租金。"
      },
      {
        "subjectCode": "660206",
        "summary": "房租摊销",
        "debit": 0,
        "credit": 20000,
        "explanation": "预付账款减少记贷方。摊销预付房租。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "摊销表",
        "content": "办公室租金第4次摊销，剩余40,000元。",
        "signature": "财务部"
      }
    ]
  },
  {
    "date": "2026-04-10",
    "title": "计提4月上半月项目工资",
    "tags": [
      "项目核算",
      "人工成本"
    ],
    "difficulty": 2,
    "description": "计提4月上半月项目人员工资35,000元。",
    "entries": [
      {
        "subjectCode": "520101",
        "summary": "计提项目工资",
        "debit": 35000,
        "credit": 0,
        "explanation": "合同履约成本-人工增加记借方。项目人员工资计入成本。"
      },
      {
        "subjectCode": "221101",
        "summary": "应付职工薪酬",
        "debit": 0,
        "credit": 35000,
        "explanation": "应付职工薪酬增加记贷方。计提工资负债增加。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "工资计提表",
        "content": "项目组上半月35,000元。",
        "signature": "人力资源部"
      }
    ]
  },
  {
    "date": "2026-04-11",
    "title": "计提4月上半月管理工资",
    "tags": [
      "人工成本",
      "工资社保"
    ],
    "difficulty": 1,
    "description": "计提上半月管理人员工资22,500元。",
    "entries": [
      {
        "subjectCode": "660203",
        "summary": "管理工资",
        "debit": 22500,
        "credit": 0,
        "explanation": "管理费用-工资薪金增加记借方。管理人员工资计入管理费。"
      },
      {
        "subjectCode": "221101",
        "summary": "应付职工薪酬",
        "debit": 0,
        "credit": 22500,
        "explanation": "应付职工薪酬增加记贷方。计提工资负债增加。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "工资计提表",
        "content": "管理上半月22,500元。",
        "signature": "人力资源部"
      }
    ]
  },
  {
    "date": "2026-04-14",
    "title": "丁项目App外包开发成本支出",
    "tags": [
      "项目核算"
    ],
    "difficulty": 2,
    "description": "丁客户App项目委托外包开发，支付外包费80,000元。",
    "entries": [
      {
        "subjectCode": "520103",
        "summary": "外包开发费",
        "debit": 80000,
        "credit": 0,
        "explanation": "合同履约成本-外包费增加记借方。外包开发服务归集成本。"
      },
      {
        "subjectCode": "100201",
        "summary": "支付外包费",
        "debit": 0,
        "credit": 80000,
        "explanation": "银行存款减少记贷方。支付外包服务费用。",
        "cashFlowItem": "cf-op6",
        "cashFlowExplanation": "其他经营活动现金支出（配对科目520103），属于\"支付其他与经营活动有关的现金\"。"
      }
    ],
    "documents": [
      {
        "type": "invoice",
        "label": "增值税发票",
        "date": "2026-04-14",
        "buyer": "雲帆管理咨询有限公司",
        "seller": "极光软件开发团队",
        "lineItems": [
          {
            "name": "App外包开发服务",
            "qty": 1,
            "price": 80000,
            "amount": 80000
          }
        ],
        "totalAmount": 80000
      }
    ]
  },
  {
    "date": "2026-04-15",
    "title": "支付4月水电费",
    "tags": [
      "费用管理"
    ],
    "difficulty": 1,
    "description": "支付4月水电费6,000元。",
    "entries": [
      {
        "subjectCode": "660201",
        "summary": "水电费",
        "debit": 6000,
        "credit": 0,
        "explanation": "管理费用-办公费增加记借方。水电费计入管理费用。"
      },
      {
        "subjectCode": "100201",
        "summary": "支付水电费",
        "debit": 0,
        "credit": 6000,
        "explanation": "银行存款减少记贷方。支付水电费。",
        "cashFlowItem": "cf-op6",
        "cashFlowExplanation": "其他经营活动现金支出（配对科目660201），属于\"支付其他与经营活动有关的现金\"。"
      }
    ],
    "documents": [
      {
        "type": "receipt",
        "label": "水电账单",
        "items": [
          {
            "name": "电费",
            "amount": 4500
          },
          {
            "name": "水费",
            "amount": 1500
          }
        ],
        "totalAmount": 6000
      }
    ]
  },
  {
    "date": "2026-04-16",
    "title": "丁项目App开发完成（确认收入）",
    "tags": [
      "收入确认",
      "项目核算"
    ],
    "difficulty": 3,
    "description": "移动App开发完成验收，确认全额收入200,000元，收到尾款106,000元（含税）。",
    "entries": [
      {
        "subjectCode": "2205",
        "summary": "合同负债转收入",
        "debit": 100000,
        "credit": 0,
        "explanation": "合同负债减少记借方。履约完成结转至收入。"
      },
      {
        "subjectCode": "100201",
        "summary": "收取尾款",
        "debit": 106000,
        "credit": 0,
        "explanation": "银行存款增加记借方。收取项目尾款。",
        "cashFlowItem": "cf-op",
        "cashFlowExplanation": "销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入——主营业务产生的现金收入。"
      },
      {
        "subjectCode": "6001",
        "summary": "确认App开发收入",
        "debit": 0,
        "credit": 200000,
        "explanation": "主营业务收入增加记贷方。App开发项目完成确认收入。"
      },
      {
        "subjectCode": "222101",
        "summary": "尾款增值税",
        "debit": 0,
        "credit": 6000,
        "explanation": "应交增值税增加记贷方。尾款收入产生增值税纳税义务。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "银行回单",
        "date": "2026-04-16",
        "totalAmount": 106000,
        "payer": "丁客户",
        "payeeName": "雲帆管理咨询有限公司",
        "content": "App尾款",
        "refNo": "HD202604160001"
      }
    ]
  },
  {
    "date": "2026-04-17",
    "title": "结转丁项目成本",
    "tags": [
      "项目核算",
      "期末"
    ],
    "difficulty": 2,
    "description": "丁项目完工，结转成本：外包80,000+人工17,500+其他2,000=99,500元。",
    "entries": [
      {
        "subjectCode": "6401",
        "summary": "结转App项目成本",
        "debit": 99500,
        "credit": 0,
        "explanation": "主营业务成本增加记借方。项目完工结转成本。"
      },
      {
        "subjectCode": "520101",
        "summary": "结转人工",
        "debit": 0,
        "credit": 17500,
        "explanation": "合同履约成本减少记贷方。完工结转人工成本。"
      },
      {
        "subjectCode": "520103",
        "summary": "结转外包费",
        "debit": 0,
        "credit": 80000,
        "explanation": "合同履约成本减少记贷方。完工结转外包成本。"
      },
      {
        "subjectCode": "520104",
        "summary": "结转其他费用",
        "debit": 0,
        "credit": 2000,
        "explanation": "合同履约成本减少记贷方。完工结转其他成本。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "成本结转表",
        "content": "丁项目总成本99,500元。",
        "signature": "财务部"
      }
    ]
  },
  {
    "date": "2026-04-18",
    "title": "计提4月下半月项目工资",
    "tags": [
      "项目核算",
      "人工成本"
    ],
    "difficulty": 2,
    "description": "计提下半月项目人员工资35,000元。",
    "entries": [
      {
        "subjectCode": "520101",
        "summary": "项目下半月工资",
        "debit": 35000,
        "credit": 0,
        "explanation": "合同履约成本-人工增加记借方。项目人员下半月工资计提。"
      },
      {
        "subjectCode": "221101",
        "summary": "应付职工薪酬",
        "debit": 0,
        "credit": 35000,
        "explanation": "应付职工薪酬增加记贷方。计提工资负债增加。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "工资计提表",
        "content": "项目下半月35,000元。",
        "signature": "人力资源部"
      }
    ]
  },
  {
    "date": "2026-04-21",
    "title": "计提4月下半月管理工资",
    "tags": [
      "人工成本",
      "工资社保"
    ],
    "difficulty": 1,
    "description": "计提下半月管理工资22,500元。",
    "entries": [
      {
        "subjectCode": "660203",
        "summary": "管理下半月工资",
        "debit": 22500,
        "credit": 0,
        "explanation": "管理费用-工资薪金增加记借方。管理人员下半月工资计提。"
      },
      {
        "subjectCode": "221101",
        "summary": "应付职工薪酬",
        "debit": 0,
        "credit": 22500,
        "explanation": "应付职工薪酬增加记贷方。计提工资负债增加。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "工资计提表",
        "content": "管理下半月22,500元。",
        "signature": "人力资源部"
      }
    ]
  },
  {
    "date": "2026-04-22",
    "title": "计提4月社保费用",
    "tags": [
      "人工成本",
      "工资社保"
    ],
    "difficulty": 2,
    "description": "计提4月社保。项目70,000×25%=17,500元，管理45,000×25%=11,250元，合计28,750元。",
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
        "label": "社保计提表",
        "content": "项目17,500+管理11,250=28,750。",
        "signature": "人力资源部"
      }
    ]
  },
  {
    "date": "2026-04-23",
    "title": "计提4月折旧",
    "tags": [
      "费用管理"
    ],
    "difficulty": 2,
    "description": "计提折旧：办公设备760+电脑950+商务车2,375=4,085元。",
    "entries": [
      {
        "subjectCode": "660205",
        "summary": "计提折旧",
        "debit": 4085,
        "credit": 0,
        "explanation": "管理费用-折旧费增加记借方。折旧费用计入管理费用。"
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
        "content": "各项资产折旧合计4,085元。",
        "signature": "财务部"
      }
    ]
  },
  {
    "date": "2026-04-24",
    "title": "计提无形资产摊销",
    "tags": [
      "费用管理"
    ],
    "difficulty": 2,
    "description": "摊销软件资产：财务软件333.33+ERP系统80,000÷36=2,222.22，合计2,555.55元。",
    "entries": [
      {
        "subjectCode": "660206",
        "summary": "无形资产摊销",
        "debit": 2555.55,
        "credit": 0,
        "explanation": "管理费用-摊销费增加记借方。摊销无形资产费用。"
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
        "content": "软件摊销合计2,555.55元。",
        "signature": "财务部"
      }
    ]
  },
  {
    "date": "2026-04-25",
    "title": "收到银行活期利息",
    "tags": ["资金管理"],
    "difficulty": 1,
    "description": "收到银行活期存款利息500元。",
    "entries": [
      {
        "subjectCode": "100201",
        "summary": "银行活期利息",
        "debit": 500,
        "credit": 0,
        "explanation": "银行存款增加记借方。收到银行活期利息。",
        "cashFlowItem": "cf-op5",
        "cashFlowExplanation": "其他经营活动现金流入（配对科目6603），属于\"收到其他与经营活动有关的现金\"。"
      },
      {
        "subjectCode": "6603",
        "summary": "利息收入",
        "debit": 0,
        "credit": 500,
        "explanation": "财务费用减少记贷方。银行存款增加记贷方。利息收入冲减财务费用。"
      }
    ],
    "documents": [
      {
        "type": "receipt",
        "label": "银行结息单",
        "items": [
          {
            "name": "活期存款利息",
            "amount": 500
          }
        ],
        "totalAmount": 500
      }
    ]
  },
  {
    "date": "2026-04-26",
    "title": "计算4月增值税及附加税",
    "tags": [
      "税费",
      "期末"
    ],
    "difficulty": 2,
    "description": "销项税额：定金6,000+尾款6,000=12,000元。进项：外包费4,800元。应交=7,200元。附加税720元。",
    "entries": [
      {
        "subjectCode": "222103",
        "summary": "城建税",
        "debit": 504,
        "credit": 0,
        "explanation": "应交城建税增加记借方。计提城建税。"
      },
      {
        "subjectCode": "222104",
        "summary": "教育费附加",
        "debit": 216,
        "credit": 0,
        "explanation": "应交教育费附加增加记借方。计提教育费附加。"
      },
      {
        "subjectCode": "222103",
        "summary": "城建税",
        "debit": 0,
        "credit": 504,
        "explanation": "应交城建税增加记贷方。按增值税计提城建税。"
      },
      {
        "subjectCode": "222104",
        "summary": "教育费附加",
        "debit": 0,
        "credit": 216,
        "explanation": "应交教育费附加增加记贷方。按增值税计提教育费附加。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "增值税计算表",
        "content": "应交增值税7,200元，附加税720元。",
        "signature": "财务部"
      }
    ]
  },
  {
    "date": "2026-04-28",
    "title": "期末结转损益",
    "tags": [
      "期末"
    ],
    "difficulty": 3,
    "description": "收入200,000元。成本费用：成本99,500+税金720+管理费用（20,000+22,500+22,500+11,250+6,000+4,085+2,555.55+其他）=约142,390.55元，财务费用-500元（利息收入）。净利润=200,000-99,500-720-142,390.55+500=-42,110.55元（亏损）。",
    "entries": [
      { subjectCode: '6001', debit: 311000, credit: 0, summary: '结转收入', explanation: '主营业务收入减少记借方。期末结转至本年利润。' },
      { subjectCode: '6401', debit: 0, credit: 99500, summary: '结转成本', explanation: '主营业务成本减少记贷方。期末结转至本年利润。' },
      { subjectCode: '6602', debit: 0, credit: 8000, summary: '结转6602', explanation: '6602转出，余额归零。' },
      { subjectCode: '660201', debit: 0, credit: 22850, summary: '结转管理费用', explanation: '管理费用减少记贷方。期末结转至本年利润。' },
      { subjectCode: '660203', debit: 0, credit: 56250, summary: '结转660203', explanation: '660203转出，余额归零。' },
      { subjectCode: '660205', debit: 0, credit: 4085, summary: '结转660205', explanation: '660205转出，余额归零。' },
      { subjectCode: '660206', debit: 0, credit: 2555.55, summary: '结转660206', explanation: '660206转出，余额归零。' },
      { subjectCode: '6603', debit: 0, credit: 2142.5, summary: '结转财务费用', explanation: '财务费用减少记借方。利息收入冲减财务费用。' },
      { subjectCode: '4103', debit: 0, credit: 115616.95, summary: '成本费用转入', explanation: '本年利润减少记借方。费用结转至本年利润。' }
    ]
  },
  {
    "date": "2026-04-01",
    "title": "税款缴纳操作",
    "tags": [
      "出纳",
      "税费"
    ],
    "difficulty": 1,
    "role": "cashier",
    "entries": [
      {
        "subjectCode": "222110",
        "summary": "缴税",
        "debit": 21780,
        "credit": 0,
        "explanation": "未交增值税减少记借方。缴纳税款冲销负债。"
      },
      {
        "subjectCode": "100201",
        "summary": "缴税",
        "debit": 0,
        "credit": 21780,
        "explanation": "银行存款减少记贷方。缴纳税款支付。",
        "cashFlowItem": "cf-op4",
        "cashFlowExplanation": "缴纳税费支出（配对科目222110），属于\"支付的各项税费\"——经营活动现金流出。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "付款回单",
        "date": "2026-04-01",
        "totalAmount": 21780,
        "payer": "雲帆管理咨询有限公司",
        "payeeName": "国家金库",
        "content": "纳税",
        "refNo": "FK202604010001"
      }
    ],
    "description": "通过银行转账缴纳各项税款合计21,780元。"
  },
  {
    "date": "2026-04-02",
    "title": "社保缴纳操作",
    "tags": [
      "出纳",
      "工资社保"
    ],
    "difficulty": 1,
    "role": "cashier",
    "entries": [
      {
        "subjectCode": "221102",
        "summary": "缴社保",
        "debit": 34250,
        "credit": 0,
        "explanation": "应付职工薪酬-社保减少记借方。缴纳社保冲销负债。"
      },
      {
        "subjectCode": "100201",
        "summary": "缴社保",
        "debit": 0,
        "credit": 34250,
        "explanation": "银行存款减少记贷方。缴纳社保费支付。",
        "cashFlowItem": "cf-op3",
        "cashFlowExplanation": "支付职工薪酬相关支出（配对科目221102），属于\"支付给职工以及为职工支付的现金\"——经营活动现金流出。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "付款回单",
        "date": "2026-04-02",
        "totalAmount": 34250,
        "payer": "雲帆管理咨询有限公司",
        "payeeName": "社保中心",
        "content": "社保",
        "refNo": "FK202604020001"
      }
    ],
    "description": "通过银行转账缴纳社保费用合计34,250元。"
  },
  {
    "date": "2026-04-03",
    "title": "所得税大额转账",
    "tags": [
      "出纳",
      "税费"
    ],
    "difficulty": 2,
    "role": "cashier",
    "entries": [
      {
        "subjectCode": "222102",
        "summary": "缴所得税",
        "debit": 140096.25,
        "credit": 0,
        "explanation": "应交所得税减少记借方。缴纳所得税冲销负债。"
      },
      {
        "subjectCode": "100201",
        "summary": "缴所得税",
        "debit": 0,
        "credit": 140096.25,
        "explanation": "银行存款减少记贷方。缴纳所得税款支付。",
        "cashFlowItem": "cf-op4",
        "cashFlowExplanation": "缴纳税费支出（配对科目222102），属于\"支付的各项税费\"——经营活动现金流出。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "付款回单",
        "date": "2026-04-03",
        "totalAmount": 140096.25,
        "payer": "雲帆管理咨询有限公司",
        "payeeName": "税务局",
        "content": "所得税",
        "refNo": "FK202604030001"
      }
    ],
    "description": "通过银行转账缴纳各项税款合计140,096.25元。"
  },
  {
    "date": "2026-04-04",
    "title": "工资银行代发",
    "tags": [
      "出纳",
      "工资社保"
    ],
    "difficulty": 2,
    "role": "cashier",
    "entries": [
      {
        "subjectCode": "221101",
        "summary": "发工资",
        "debit": 137000,
        "credit": 0,
        "explanation": "应付职工薪酬减少记借方。发放工资冲销负债。"
      },
      {
        "subjectCode": "221101",
        "summary": "发工资",
        "debit": 0,
        "credit": 132890,
        "explanation": "银行存款减少记贷方。发放工资转账支付。"
      },
      {
        "subjectCode": "222102",
        "summary": "扣个税",
        "debit": 0,
        "credit": 4110,
        "explanation": "应交个人所得税增加记贷方。代扣个人所得税。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "付款回单",
        "date": "2026-04-04",
        "totalAmount": 132890,
        "payer": "雲帆管理咨询有限公司",
        "payeeName": "批量代发",
        "content": "3月工资",
        "refNo": "FK202604040001"
      }
    ],
    "description": "通过银行转账缴纳各项税款合计137,000元。"
  },
  {
    "date": "2026-04-05",
    "title": "购车大额转账",
    "tags": ["出纳"],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "160105",
        "summary": "购车",
        "debit": 150000,
        "credit": 0,
        "explanation": "固定资产-运输设备增加记借方。购入车辆按成本入账。"
      },
      {
        "subjectCode": "100201",
        "summary": "购车",
        "debit": 0,
        "credit": 150000,
        "explanation": "银行存款减少记贷方。支付购车款项。",
        "cashFlowItem": "cf-inv",
        "cashFlowExplanation": "购建固定资产/无形资产支出（配对科目160105），属于投资活动现金流出——资本性支出，区别于日常经营支出。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "付款回单",
        "date": "2026-04-05",
        "totalAmount": 150000,
        "payer": "雲帆管理咨询有限公司",
        "payeeName": "腾龙汽车",
        "content": "购车",
        "refNo": "FK202604050001"
      }
    ],
    "description": "通过银行转账支付设备/资产购置款150,000元。"
  },
  {
    "date": "2026-04-07",
    "title": "借款还本付息操作",
    "tags": ["资金管理"],
    "difficulty": 2,
    "entries": [
      {
        "subjectCode": "2001",
        "summary": "还本",
        "debit": 300000,
        "credit": 0,
        "explanation": "短期借款减少记借方。偿还短期借款本金。"
      },
      {
        "subjectCode": "6603",
        "summary": "付息",
        "debit": 3262.5,
        "credit": 0,
        "explanation": "财务费用增加记借方。支付借款利息。"
      },
      {
        "subjectCode": "100201",
        "summary": "还本付息",
        "debit": 0,
        "credit": 303262.5,
        "explanation": "银行存款减少记贷方。偿还借款本息。",
        "cashFlowItem": "cf-fin2",
        "cashFlowExplanation": "偿还债务本金（配对科目2001），属于筹资活动现金流出。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "付款回单",
        "date": "2026-04-07",
        "totalAmount": 303262.5,
        "payer": "雲帆管理咨询有限公司",
        "payeeName": "工商银行",
        "content": "还贷",
        "refNo": "FK202604070001"
      }
    ],
    "description": "偿还到期短期借款本金300,000元及利息3,262.5元，合计303,262.5元。"
  },
  {
    "date": "2026-04-08",
    "title": "新合同定金到账",
    "tags": ["出纳"],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "100201",
        "summary": "定金到账",
        "debit": 106000,
        "credit": 0,
        "explanation": "银行存款增加记借方。客户定金到账。"
      },
      {
        "subjectCode": "100201",
        "summary": "定金",
        "debit": 0,
        "credit": 106000,
        "explanation": "合同负债增加记贷方。收到定金形成合同负债。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "银行回单",
        "date": "2026-04-08",
        "totalAmount": 106000,
        "payer": "丁客户",
        "payeeName": "雲帆管理咨询有限公司",
        "content": "App定金",
        "refNo": "HD202604080001"
      }
    ],
    "description": "收到客户款项106,000元，已存入银行账户。"
  },
  {
    "date": "2026-04-14",
    "title": "外包费银行转账",
    "tags": [
      "项目核算"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "520103",
        "summary": "外包费",
        "debit": 80000,
        "credit": 0,
        "explanation": "合同履约成本-外包费增加记借方。外包服务归集成本。"
      },
      {
        "subjectCode": "520103",
        "summary": "外包费",
        "debit": 0,
        "credit": 80000,
        "explanation": "合同履约成本-外包费减少记贷方。完工结转外包成本。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "付款回单",
        "date": "2026-04-14",
        "totalAmount": 80000,
        "payer": "雲帆管理咨询有限公司",
        "payeeName": "极光团队",
        "content": "外包开发费",
        "refNo": "FK202604140001"
      }
    ],
    "description": "通过银行转账/代扣支付80,000元。"
  },
  {
    "date": "2026-04-16",
    "title": "App尾款到账",
    "tags": ["出纳"],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "100201",
        "summary": "尾款到账",
        "debit": 106000,
        "credit": 0,
        "explanation": "银行存款增加记借方。项目尾款到账。",
        "cashFlowItem": "cf-op",
        "cashFlowExplanation": "销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入——主营业务产生的现金收入。"
      },
      {
        "subjectCode": "6001",
        "summary": "尾款收入",
        "debit": 0,
        "credit": 106000,
        "explanation": "主营业务收入增加记贷方。项目尾款收入确认。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "银行回单",
        "date": "2026-04-16",
        "totalAmount": 106000,
        "payer": "丁客户",
        "payeeName": "雲帆管理咨询有限公司",
        "content": "App尾款",
        "refNo": "HD202604160001"
      }
    ],
    "description": "收到客户款项106,000元，已存入银行账户。"
  },
  {
    "date": "2026-04-25",
    "title": "银行利息到账确认",
    "tags": ["出纳"],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "6603",
        "summary": "利息收入",
        "debit": 500,
        "credit": 0,
        "explanation": "财务费用减少记贷方。利息收入冲减财务费用。"
      },
      {
        "subjectCode": "6603",
        "summary": "利息收入",
        "debit": 0,
        "credit": 500,
        "explanation": "财务费用减少记贷方。银行存款增加记贷方。利息收入冲减财务费用。"
      }
    ],
    "documents": [
      {
        "type": "receipt",
        "label": "银行结息单",
        "items": [
          {
            "name": "活期利息",
            "amount": 500
          }
        ],
        "totalAmount": 500
      }
    ],
    "description": "收到客户款项500元，已存入银行账户。"
  },
  {
    "date": "2026-04-27",
    "title": "库存现金盘点",
    "tags": [
      "期末"
    ],
    "difficulty": 1,
    "entries": [],
    "documents": [
      {
        "type": "text",
        "label": "现金盘点表",
        "content": "库存现金盘点无误。",
        "signature": "出纳 | 监盘人"
      }
    ],
    "description": "对库存现金进行月末盘点，确保账实相符。"
  },
  {
    "date": "2026-04-28",
    "title": "银行对账",
    "tags": [
      "期末"
    ],
    "difficulty": 1,
    "entries": [],
    "documents": [
      {
        "type": "text",
        "label": "银行对账单",
        "content": "4月银行对账一致。",
        "stampText": "工商银行"
      }
    ],
    "description": "将银行日记账与银行对账单进行核对，编制余额调节表。"
  },
  {
    "date": "2026-04-30",
    "title": "月末票据归档",
    "tags": [
      "期末"
    ],
    "difficulty": 1,
    "entries": [],
    "documents": [
      {
        "type": "text",
        "label": "档案清单",
        "content": "4月票据归档完毕。",
        "signature": "出纳"
      }
    ],
    "description": "将本月凭证整理装订成册，归档保存。"
  },
  {
    "date": "2026-04-06",
    "title": "微信收款—咨询费",
    "tags": ["出纳"],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "101204",
        "summary": "微信收款",
        "debit": 5300,
        "credit": 0,
        "explanation": "其他货币资金-微信增加记借方。微信收款入账。",
        "cashFlowItem": "cf-op",
        "cashFlowExplanation": "销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入——主营业务产生的现金收入。"
      },
      {
        "subjectCode": "6001",
        "summary": "咨询收入",
        "debit": 0,
        "credit": 5000,
        "explanation": "主营业务收入增加记贷方。咨询项目完成确认收入。"
      },
      {
        "subjectCode": "222101",
        "summary": "增值税",
        "debit": 0,
        "credit": 300,
        "explanation": "应交增值税增加记贷方。确认收入产生增值税纳税义务。"
      }
    ],
    "documents": [
      {
        "type": "receipt",
        "label": "微信收款凭证",
        "totalAmount": 5300
      }
    ],
    "description": "通过银行转账缴纳各项税款合计5,300元。"
  },
  {
    "date": "2026-04-10",
    "title": "支付宝付款—采购软件工具",
    "tags": ["出纳"],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "660201",
        "summary": "采购工具",
        "debit": 4200,
        "credit": 0,
        "explanation": "管理费用-办公费增加记借方。采购工具计入管理费。"
      },
      {
        "subjectCode": "101205",
        "summary": "支付宝付款",
        "debit": 0,
        "credit": 4200,
        "explanation": "其他货币资金-支付宝减少记贷方。支付宝支付款项。",
        "cashFlowItem": "cf-op6",
        "cashFlowExplanation": "其他经营活动现金支出（配对科目660201），属于\"支付其他与经营活动有关的现金\"。"
      }
    ],
    "documents": [
      {
        "type": "receipt",
        "label": "支付宝付款凭证",
        "totalAmount": 4200
      }
    ],
    "description": "通过银行转账/代扣支付4,200元。"
  },
  {
    "date": "2026-04-11",
    "title": "现金支付快递费",
    "tags": [
      "费用管理"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "660201",
        "summary": "快递费",
        "debit": 350,
        "credit": 0,
        "explanation": "管理费用-办公费增加记借方。快递费用计入管理费。"
      },
      {
        "subjectCode": "1001",
        "summary": "现金付款",
        "debit": 0,
        "credit": 350,
        "explanation": "库存现金减少记贷方。现金支付款项。",
        "cashFlowItem": "cf-op6",
        "cashFlowExplanation": "其他经营活动现金支出（配对科目660201），属于\"支付其他与经营活动有关的现金\"。"
      }
    ],
    "documents": [
      {
        "type": "receipt",
        "label": "快递费发票",
        "totalAmount": 350
      }
    ],
    "description": "以现金支付350元。"
  },
  {
    "date": "2026-04-12",
    "title": "银行账户间转账（工行→建行）",
    "tags": ["资金管理"],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "100202",
        "summary": "转入建行",
        "debit": 50000,
        "credit": 0,
        "explanation": "银行存款增加记借方。资金转入建设银行账户。"
      },
      {
        "subjectCode": "100201",
        "summary": "工行转出",
        "debit": 0,
        "credit": 50000,
        "explanation": "银行存款减少记贷方。通过工商银行转账支付。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "转账回单",
        "totalAmount": 50000,
        "content": "内部调拨"
      }
    ],
    "description": "通过银行转账/代扣支付50,000元。"
  },
  {
    "date": "2026-04-18",
    "title": "银行托收商业汇票",
    "tags": [
      "往来管理"
    ],
    "difficulty": 2,
    "entries": [
      {
        "subjectCode": "100201",
        "summary": "汇票托收到账",
        "debit": 30000,
        "credit": 0,
        "explanation": "银行存款增加记借方。商业汇票到期托收款项到账。",
        "cashFlowItem": "cf-op",
        "cashFlowExplanation": "销售商品/提供劳务收到的现金（配对科目1121），属于经营活动现金流入——主营业务产生的现金收入。"
      },
      {
        "subjectCode": "1121",
        "summary": "应收票据减少",
        "debit": 0,
        "credit": 30000,
        "explanation": "应收票据减少记贷方。应收票据到期或背书转让。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "托收回单",
        "totalAmount": 30000
      }
    ],
    "description": "银行托收商业汇票到期，款项已划入银行账户。"
  },
  {
    "date": "2026-04-20",
    "title": "咨询业务宣传费",
    "tags": [
      "费用管理"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "6602",
        "summary": "广告宣传费",
        "debit": 8000,
        "credit": 0,
        "explanation": "销售费用增加记借方。广告宣传费计入销售费用。"
      },
      {
        "subjectCode": "100201",
        "summary": "转账支付",
        "debit": 0,
        "credit": 8000,
        "explanation": "银行存款减少记贷方。银行转账支付款项。",
        "cashFlowItem": "cf-op6",
        "cashFlowExplanation": "其他经营活动现金支出（配对科目6602），属于\"支付其他与经营活动有关的现金\"。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "付款回单",
        "totalAmount": 8000
      }
    ],
    "description": "咨询业务宣传费，涉及金额8,000元。"
  },
  {
    "date": "2026-04-22",
    "title": "银行代扣手续费",
    "tags": [
      "费用管理"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "6603",
        "summary": "财务费用",
        "debit": 200,
        "credit": 0,
        "explanation": "财务费用增加记借方。利息支出计入财务费用。"
      },
      {
        "subjectCode": "100201",
        "summary": "银行存款减少",
        "debit": 0,
        "credit": 200,
        "explanation": "银行存款减少记贷方。银行款项支出。",
        "cashFlowItem": "cf-op6",
        "cashFlowExplanation": "其他经营活动现金支出（配对科目6603），属于\"支付其他与经营活动有关的现金\"。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "记录"
      }
    ],
    "description": "通过银行转账/代扣支付200元。"
  },
  {
    "date": "2026-04-23",
    "title": "咨询项目业务招待费",
    "tags": [
      "费用管理"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "660201",
        "summary": "管理费用",
        "debit": 3000,
        "credit": 0,
        "explanation": "管理费用-办公费增加记借方。办公费用计入管理费。"
      },
      {
        "subjectCode": "1001",
        "summary": "现金减少",
        "debit": 0,
        "credit": 3000,
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
    "description": "以现金支付3,000元。"
  },
  {
    "date": "2026-04-24",
    "title": "提取备用金补充库存",
    "tags": ["出纳"],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "1001",
        "summary": "现金增加",
        "debit": 15000,
        "credit": 0,
        "explanation": "库存现金增加记借方。现金收款入账。"
      },
      {
        "subjectCode": "100201",
        "summary": "银行存款减少",
        "debit": 0,
        "credit": 15000,
        "explanation": "银行存款减少记贷方。银行款项支出。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "记录"
      }
    ],
    "description": "从银行提取现金15,000元作为备用金。"
  },
  {
    "date": "2026-04-25",
    "title": "现金支付员工午餐补贴",
    "tags": [
      "费用管理"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "660201",
        "summary": "管理费用",
        "debit": 2800,
        "credit": 0,
        "explanation": "管理费用-办公费增加记借方。办公费用计入管理费。"
      },
      {
        "subjectCode": "1001",
        "summary": "现金减少",
        "debit": 0,
        "credit": 2800,
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
    "description": "以现金支付2,800元。"
  },
  {
    "date": "2026-04-26",
    "title": "购车保险费银行转账",
    "tags": [
      "费用管理"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "660201",
        "summary": "管理费用",
        "debit": 6500,
        "credit": 0,
        "explanation": "管理费用-办公费增加记借方。办公费用计入管理费。"
      },
      {
        "subjectCode": "100201",
        "summary": "银行存款减少",
        "debit": 0,
        "credit": 6500,
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
    "description": "通过银行转账支付设备/资产购置款6,500元。"
  },
  {
    "date": "2026-04-28",
    "title": "银行账户季度结息",
    "tags": ["资金管理"],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "100201",
        "summary": "银行存款增加",
        "debit": 820,
        "credit": 0,
        "explanation": "银行存款增加记借方。款项存入银行。",
        "cashFlowItem": "cf-op5",
        "cashFlowExplanation": "其他经营活动现金流入（配对科目6603），属于\"收到其他与经营活动有关的现金\"。"
      },
      {
        "subjectCode": "6603",
        "summary": "利息收入",
        "debit": 0,
        "credit": 820,
        "explanation": "财务费用减少记贷方。银行存款增加记贷方。利息收入冲减财务费用。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "记录"
      }
    ],
    "description": "银行账户季度结息，涉及金额820元。"
  },
  {
    "date": "2026-04-29",
    "title": "出纳月末现金盘点",
    "tags": ["出纳"],
    "difficulty": 1,
    "entries": [],
    "documents": [
      {
        "type": "text",
        "label": "记录"
      }
    ],
    "description": "对库存现金进行月末盘点，确保账实相符。"
  },
  {
    "date": "2026-04-29",
    "title": "银行对账调节表编制",
    "tags": ["出纳"],
    "difficulty": 1,
    "entries": [],
    "documents": [
      {
        "type": "text",
        "label": "记录"
      }
    ],
    "description": "将银行日记账与银行对账单进行核对，编制余额调节表。"
  },
  {
    "date": "2026-04-30",
    "title": "月末凭证装订归档",
    "tags": ["出纳"],
    "difficulty": 1,
    "entries": [],
    "documents": [
      {
        "type": "text",
        "label": "记录"
      }
    ],
    "description": "将本月凭证整理装订成册，归档保存。"
  },
  {
    date: "2026-04-30",
    title: "模拟纳税申报",
    tags: ["期末", "税费"],
    difficulty: 1,
    description: "根据本月已完成的账务处理，进行模拟纳税申报。系统已自动计算应缴税额（增值税和企业所得税），请前往纳税申报页面核对并提交。",
    tip: "纳税申报是企业每月的法定义务。确认所有凭证已过账、期末结转已完成后，前往纳税申报页面核对各项税额后点击「提交申报」。",
    entries: [],
    documents: [
      { type: "text", label: "纳税申报提醒", docTitle: "4月纳税申报提醒", content: "申报期间：2026-04-30\n\n请前往纳税申报页面：\n1. 核对增值税申报表数据\n2. 核对企业所得税申报表数据\n3. 确认无误后点击「提交申报」\n\n纳税申报是企业每月必做的合规义务，请按时完成。", stampText: "财务专用章" }]},
]

export default tasks
