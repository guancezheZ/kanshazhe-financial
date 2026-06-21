/**
 * 服务业 08月
 */

const tasks = [
  {
    "date": "2026-08-01",
    "title": "缴纳7月增值税",
    "tags": [
      "税费",
      "资金管理"
    ],
    "difficulty": 2,
    "entries": [
      {
        "subjectCode": "222101",
        "summary": "增值税",
        "debit": 11520,
        "credit": 0,
        "explanation": "应交增值税减少记借方。缴纳增值税冲销负债。"
      },
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
        "subjectCode": "100201",
        "summary": "缴税",
        "debit": 0,
        "credit": 12672,
        "explanation": "银行存款减少记贷方。缴纳税款支付。",
        "cashFlowItem": "cf-op4",
        "cashFlowExplanation": "缴纳税费支出（配对科目222101），属于\"支付的各项税费\"——经营活动现金流出。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "付款回单",
        "totalAmount": 12672
      }
    ],
    "description": "通过银行转账缴纳各项税款合计12,672元。"
  },
  {
    "date": "2026-08-02",
    "title": "缴纳7月社保",
    "tags": [
      "工资社保",
      "资金管理"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "221102",
        "summary": "社保",
        "debit": 28750,
        "credit": 0,
        "explanation": "应付职工薪酬-社保减少记借方。缴纳社保冲销负债。"
      },
      {
        "subjectCode": "221102",
        "summary": "社保",
        "debit": 0,
        "credit": 28750,
        "explanation": "应付职工薪酬-社保增加记贷方。计提社保负债增加。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "回单",
        "totalAmount": 28750
      }
    ],
    "description": "通过银行转账缴纳社保费用合计28,750元。"
  },
  {
    "date": "2026-08-03",
    "title": "发放7月工资",
    "tags": [
      "人工成本",
      "工资社保"
    ],
    "difficulty": 3,
    "entries": [
      {
        "subjectCode": "221101",
        "summary": "应发",
        "debit": 115000,
        "credit": 0,
        "explanation": "应付职工薪酬增加记贷方。计提应发工资。"
      },
      {
        "subjectCode": "100201",
        "summary": "实发",
        "debit": 0,
        "credit": 111550,
        "explanation": "银行存款减少记贷方。实发工资转账支付。",
        "cashFlowItem": "cf-op6",
        "cashFlowExplanation": "其他经营活动现金支出（配对科目660203），属于\"支付其他与经营活动有关的现金\"。"
      },
      {
        "subjectCode": "222102",
        "summary": "个税",
        "debit": 0,
        "credit": 3450,
        "explanation": "应交个人所得税增加记贷方。代扣个税形成应交义务。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "回单",
        "totalAmount": 111550
      }
    ],
    "description": "通过银行转账缴纳各项税款合计115,000元。"
  },
  {
    "date": "2026-08-05",
    "title": "新签ERP系统定制开发项目",
    "tags": [
      "收入确认"
    ],
    "difficulty": 2,
    "description": "与制造企业签订ERP系统定制开发合同300,000元，预收30%定金95,400元（含税6%）。",
    "entries": [
      {
        "subjectCode": "100201",
        "summary": "定金",
        "debit": 95400,
        "credit": 0,
        "explanation": "银行存款增加记借方。收到客户定金。",
        "cashFlowItem": "cf-op5",
        "cashFlowExplanation": "其他经营活动现金流入（配对科目2205），属于\"收到其他与经营活动有关的现金\"。"
      },
      {
        "subjectCode": "2205",
        "summary": "合同负债",
        "debit": 0,
        "credit": 90000,
        "explanation": "合同负债增加记贷方。预收款形成合同负债。"
      },
      {
        "subjectCode": "222101",
        "summary": "增值税",
        "debit": 0,
        "credit": 5400,
        "explanation": "应交增值税增加记贷方。确认收入产生增值税纳税义务。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "回单",
        "totalAmount": 95400
      }
    ]
  },
  {
    "date": "2026-08-06",
    "title": "摊销08月办公室租金",
    "tags": [
      "费用管理"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "660206",
        "summary": "摊销房租",
        "debit": 20000,
        "credit": 0,
        "explanation": "管理费用-摊销费增加记借方。摊销办公室租金。"
      },
      {
        "subjectCode": "1123",
        "summary": "预付摊销",
        "debit": 0,
        "credit": 20000,
        "explanation": "预付账款减少记贷方。摊销预付费用。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "摊销表",
        "content": "预付下半年租金第2次摊销（共6次）。"
      }
    ],
    "description": "摊销08月办公室租金，涉及金额20,000元。"
  },
  {
    "date": "2026-08-07",
    "title": "计提08月上半月项目工资",
    "tags": [
      "项目核算",
      "人工成本"
    ],
    "difficulty": 2,
    "entries": [
      {
        "subjectCode": "660203",
        "summary": "上半月",
        "debit": 40000,
        "credit": 0,
        "explanation": "管理费用-工资薪金增加记借方。上半月工资计提。"
      },
      {
        "subjectCode": "221101",
        "summary": "薪酬",
        "debit": 0,
        "credit": 40000,
        "explanation": "应付职工薪酬增加记贷方。计提薪酬负债增加。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "工资表",
        "content": "40,000元（含ERP项目新增人员）。"
      }
    ],
    "description": "通过银行代发工资合计40,000元。"
  },
  {
    "date": "2026-08-08",
    "title": "计提08月上半月管理工资",
    "tags": [
      "人工成本",
      "工资社保"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "660203",
        "summary": "上半月",
        "debit": 22500,
        "credit": 0,
        "explanation": "管理费用-工资薪金增加记借方。上半月工资计提。"
      },
      {
        "subjectCode": "221101",
        "summary": "薪酬",
        "debit": 0,
        "credit": 22500,
        "explanation": "应付职工薪酬增加记贷方。计提薪酬负债增加。"
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
    "date": "2026-08-09",
    "title": "支付08月水电费",
    "tags": [
      "费用管理"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "660201",
        "summary": "水电",
        "debit": 6200,
        "credit": 0,
        "explanation": "管理费用-办公费增加记借方。水电费计入管理费。"
      },
      {
        "subjectCode": "100201",
        "summary": "付款",
        "debit": 0,
        "credit": 6200,
        "explanation": "银行存款减少记贷方。支付款项。",
        "cashFlowItem": "cf-op6",
        "cashFlowExplanation": "其他经营活动现金支出（配对科目660201），属于\"支付其他与经营活动有关的现金\"。"
      }
    ],
    "documents": [
      {
        "type": "receipt",
        "label": "账单",
        "totalAmount": 6200
      }
    ],
    "description": "支付08月水电费，涉及金额6,200元。"
  },
  {
    "date": "2026-08-10",
    "title": "ERP项目现场调研出差",
    "tags": [
      "项目核算"
    ],
    "difficulty": 2,
    "entries": [
      {
        "subjectCode": "1221",
        "summary": "预借差旅",
        "debit": 6000,
        "credit": 0,
        "explanation": "其他应收款增加记借方。预借差旅费形成债权。"
      },
      {
        "subjectCode": "2001",
        "summary": "借款",
        "debit": 0,
        "credit": 6000,
        "explanation": "短期借款增加记贷方。取得短期借款。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "借款单",
        "content": "ERP项目现场调研预借差旅费6,000元。"
      }
    ],
    "description": "以现金支付6,000元。"
  },
  {
    "date": "2026-08-11",
    "title": "ERP系统需求分析验收收入",
    "tags": [
      "收入确认",
      "项目核算"
    ],
    "difficulty": 3,
    "description": "ERP项目完成需求分析阶段，按进度确认30%收入90,000元。",
    "entries": [
      {
        "subjectCode": "2205",
        "summary": "合同负债转收入",
        "debit": 90000,
        "credit": 0,
        "explanation": "合同负债减少记借方。履约完成结转至收入。"
      },
      {
        "subjectCode": "6001",
        "summary": "确认收入",
        "debit": 0,
        "credit": 90000,
        "explanation": "主营业务收入增加记贷方。项目完成确认收入。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "验收报告",
        "content": "ERP项目需求分析阶段验收通过。"
      }
    ]
  },
  {
    "date": "2026-08-14",
    "title": "计提08月下半月项目工资",
    "tags": [
      "项目核算",
      "人工成本"
    ],
    "difficulty": 2,
    "entries": [
      {
        "subjectCode": "660203",
        "summary": "下半月",
        "debit": 40000,
        "credit": 0,
        "explanation": "管理费用-工资薪金增加记借方。下半月工资计提。"
      },
      {
        "subjectCode": "221101",
        "summary": "薪酬",
        "debit": 0,
        "credit": 40000,
        "explanation": "应付职工薪酬增加记贷方。计提薪酬负债增加。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "工资表",
        "content": "40,000元。"
      }
    ],
    "description": "通过银行代发工资合计40,000元。"
  },
  {
    "date": "2026-08-15",
    "title": "计提08月下半月管理工资",
    "tags": [
      "人工成本",
      "工资社保"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "660203",
        "summary": "下半月",
        "debit": 22500,
        "credit": 0,
        "explanation": "管理费用-工资薪金增加记借方。下半月工资计提。"
      },
      {
        "subjectCode": "221101",
        "summary": "薪酬",
        "debit": 0,
        "credit": 22500,
        "explanation": "应付职工薪酬增加记贷方。计提薪酬负债增加。"
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
    "date": "2026-08-16",
    "title": "计提08月社保",
    "tags": [
      "人工成本",
      "工资社保"
    ],
    "difficulty": 2,
    "entries": [
      {
        "subjectCode": "520101",
        "summary": "项目社保",
        "debit": 20000,
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
        "summary": "社保",
        "debit": 0,
        "credit": 31250,
        "explanation": "应付职工薪酬-社保增加记贷方。计提社保负债增加。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "社保表",
        "content": "20,000+11,250=31,250。"
      }
    ],
    "description": "通过银行转账缴纳社保费用合计31,250元。"
  },
  {
    "date": "2026-08-17",
    "title": "计提08月折旧",
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
    "description": "计提08月折旧，涉及金额4,085元。"
  },
  {
    "date": "2026-08-18",
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
    "date": "2026-08-21",
    "title": "ERP项目差旅报销",
    "tags": [
      "项目核算",
      "费用管理"
    ],
    "difficulty": 2,
    "entries": [
      {
        "subjectCode": "660202",
        "summary": "差旅费",
        "debit": 5200,
        "credit": 0,
        "explanation": "管理费用-差旅费增加记借方。出差交通住宿计入管理费用。"
      },
      {
        "subjectCode": "1001",
        "summary": "退回",
        "debit": 800,
        "credit": 0,
        "explanation": "库存现金增加记借方。退回现金。",
        "cashFlowItem": "cf-op5",
        "cashFlowExplanation": "其他经营活动现金流入（配对科目1221），属于\"收到其他与经营活动有关的现金\"。"
      },
      {
        "subjectCode": "1221",
        "summary": "冲借款",
        "debit": 0,
        "credit": 6000,
        "explanation": "其他应收款减少记贷方。报销冲抵借款。"
      }
    ],
    "documents": [
      {
        "type": "receipt",
        "label": "报销单",
        "totalAmount": 5200
      }
    ],
    "description": "以现金支付相关款项。"
  },
  {
    "date": "2026-08-22",
    "title": "计提08月借款利息",
    "tags": [
      "资金管理",
      "期末"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "6603",
        "summary": "利息",
        "debit": 666.67,
        "credit": 0,
        "explanation": "财务费用增加记借方。利息支出计入财务费用。"
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
    ],
    "description": "通过银行转账偿还借款本息合计666.67元。"
  },
  {
    "date": "2026-08-24",
    "title": "计算08月增值税",
    "tags": [
      "税费",
      "期末"
    ],
    "difficulty": 2,
    "entries": [
      {
        "subjectCode": "222103",
        "summary": "城建税",
        "debit": 840,
        "credit": 0,
        "explanation": "应交城建税增加记借方。计提城建税。"
      },
      {
        "subjectCode": "222104",
        "summary": "教育费附加",
        "debit": 360,
        "credit": 0,
        "explanation": "应交教育费附加增加记借方。计提教育费附加。"
      },
      {
        "subjectCode": "222103",
        "summary": "城建税",
        "debit": 0,
        "credit": 840,
        "explanation": "应交城建税增加记贷方。按增值税计提城建税。"
      },
      {
        "subjectCode": "222104",
        "summary": "教育费附加",
        "debit": 0,
        "credit": 360,
        "explanation": "应交教育费附加增加记贷方。按增值税计提教育费附加。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "税表",
        "content": "应交增值税12,000元，附加税1,200元。"
      }
    ],
    "description": "通过银行转账缴纳各项税款合计1,200元。"
  },
  {
    "date": "2026-08-25",
    "title": "期末结转损益",
    "tags": [
      "期末"
    ],
    "difficulty": 3,
    "entries": [
      {
        "subjectCode": "6001",
        "summary": "收入",
        "debit": 90000,
        "credit": 0,
        "explanation": "主营业务收入减少记借方。期末结转至本年利润。"
      },
      {
        "subjectCode": "4103",
        "summary": "收入转利润",
        "debit": 0,
        "credit": 90000,
        "explanation": "本年利润增加记贷方。收入结转至本年利润。"
      },
      {
        "subjectCode": "6401",
        "summary": "费用转入",
        "debit": 180666.67,
        "credit": 0,
        "explanation": "主营业务成本增加记借方。将项目费用转入主营业务成本。"
      },
      {
        "subjectCode": "6401",
        "summary": "成本",
        "debit": 0,
        "credit": 60000,
        "explanation": "主营业务成本减少记贷方。期末结转至本年利润。"
      },
      {
        "subjectCode": "6403",
        "summary": "税金",
        "debit": 0,
        "credit": 1200,
        "explanation": "税金及附加减少记贷方。期末结转至本年利润。"
      },
      {
        "subjectCode": "660201",
        "summary": "管理费用",
        "debit": 0,
        "credit": 118800,
        "explanation": "管理费用减少记贷方。期末结转至本年利润。"
      },
      {
        "subjectCode": "6603",
        "summary": "财务费用",
        "debit": 0,
        "credit": 666.67,
        "explanation": "财务费用减少记贷方。期末结转至本年利润。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "损益表",
        "content": "08月净利润-91,466.67元（ERP项目前期投入加大）。"
      }
    ],
    "description": "期末结转损益，涉及金额270,666.67元。"
  },
  {
    "date": "2026-08-01",
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
        "debit": 12672,
        "credit": 0,
        "explanation": "未交增值税减少记借方。缴纳税款冲销负债。"
      },
      {
        "subjectCode": "222110",
        "summary": "税",
        "debit": 0,
        "credit": 12672,
        "explanation": "未交增值税增加记贷方。计提应交增值税。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "回单",
        "totalAmount": 12672
      }
    ],
    "description": "通过银行转账缴纳各项税款合计12,672元。"
  },
  {
    "date": "2026-08-02",
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
        "debit": 28750,
        "credit": 0,
        "explanation": "应付职工薪酬-社保减少记借方。缴纳社保冲销负债。"
      },
      {
        "subjectCode": "221102",
        "summary": "社保",
        "debit": 0,
        "credit": 28750,
        "explanation": "应付职工薪酬-社保增加记贷方。计提社保负债增加。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "回单",
        "totalAmount": 28750
      }
    ],
    "description": "通过银行转账缴纳社保费用合计28,750元。"
  },
  {
    "date": "2026-08-03",
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
        "debit": 115000,
        "credit": 0,
        "explanation": "管理费用-工资薪金增加记借方。管理人员工资计入管理费。"
      },
      {
        "subjectCode": "100201",
        "summary": "实发",
        "debit": 0,
        "credit": 111550,
        "explanation": "银行存款减少记贷方。实发工资转账支付。",
        "cashFlowItem": "cf-op6",
        "cashFlowExplanation": "其他经营活动现金支出（配对科目660203），属于\"支付其他与经营活动有关的现金\"。"
      },
      {
        "subjectCode": "222102",
        "summary": "个税",
        "debit": 0,
        "credit": 3450,
        "explanation": "应交个人所得税增加记贷方。代扣个税形成应交义务。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "回单",
        "totalAmount": 111550
      }
    ],
    "description": "通过银行转账缴纳各项税款合计115,000元。"
  },
  {
    "date": "2026-08-05",
    "title": "定金到账确认",
    "tags": [
      "出纳",
      "资金管理"
    ],
    "difficulty": 1,
    "role": "cashier",
    "entries": [
      {
        "subjectCode": "100201",
        "summary": "定金",
        "debit": 95400,
        "credit": 0,
        "explanation": "银行存款增加记借方。收到客户定金。",
        "cashFlowItem": "cf-op5",
        "cashFlowExplanation": "其他经营活动现金流入（配对科目2205），属于\"收到其他与经营活动有关的现金\"。"
      },
      {
        "subjectCode": "2205",
        "summary": "合同负债",
        "debit": 0,
        "credit": 95400,
        "explanation": "合同负债增加记贷方。预收款形成合同负债。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "回单",
        "totalAmount": 95400
      }
    ],
    "description": "收到客户款项95,400元，已存入银行账户。"
  },
  {
    "date": "2026-08-10",
    "title": "差旅借款",
    "tags": [
      "项目核算"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "2001",
        "summary": "借款",
        "debit": 6000,
        "credit": 0,
        "explanation": "短期借款减少记借方。偿还借款本金。"
      },
      {
        "subjectCode": "1001",
        "summary": "借支",
        "debit": 0,
        "credit": 6000,
        "explanation": "库存现金减少记贷方。员工借支现金。",
        "cashFlowItem": "cf-fin2",
        "cashFlowExplanation": "偿还债务本金（配对科目2001），属于筹资活动现金流出。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "借款单",
        "content": "6,000元。"
      }
    ],
    "description": "通过银行转账偿还借款本息合计6,000元。"
  },
  {
    "date": "2026-08-21",
    "title": "差旅报销退款",
    "tags": [
      "费用管理"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "660202",
        "summary": "报销",
        "debit": 5200,
        "credit": 0,
        "explanation": "管理费用-差旅费增加记借方。报销差旅费用。"
      },
      {
        "subjectCode": "1001",
        "summary": "退现",
        "debit": 800,
        "credit": 0,
        "explanation": "库存现金增加记借方。收回多余备用金。",
        "cashFlowItem": "cf-op5",
        "cashFlowExplanation": "其他经营活动现金流入（配对科目1221），属于\"收到其他与经营活动有关的现金\"。"
      },
      {
        "subjectCode": "1221",
        "summary": "冲销",
        "debit": 0,
        "credit": 6000,
        "explanation": "其他应收款减少记贷方。冲销借款。"
      }
    ],
    "documents": [
      {
        "type": "receipt",
        "label": "收据",
        "totalAmount": 800
      }
    ],
    "description": "以现金支付相关款项。"
  },
  {
    "date": "2026-08-28",
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
        "content": "相符。"
      }
    ],
    "description": "对库存现金进行月末盘点，确保账实相符。"
  },
  {
    "date": "2026-08-29",
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
        "content": "一致。"
      }
    ],
    "description": "将银行日记账与银行对账单进行核对，编制余额调节表。"
  },
  {
    "date": "2026-08-31",
    "title": "票据归档",
    "tags": [
      "期末"
    ],
    "difficulty": 1,
    "entries": [],
    "documents": [
      {
        "type": "text",
        "label": "归档",
        "content": "08月归档完毕。"
      }
    ],
    "description": "将本月凭证整理装订成册，归档保存。"
  },
  {
    "date": "2026-08-08",
    "title": "微信收款-ERP项目阶段款",
    "tags": [
      "资金管理"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "101204",
        "summary": "微信收款",
        "debit": 53000,
        "credit": 0,
        "explanation": "其他货币资金-微信增加记借方。微信收款入账。",
        "cashFlowItem": "cf-op",
        "cashFlowExplanation": "销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入——主营业务产生的现金收入。"
      },
      {
        "subjectCode": "6001",
        "summary": "确认收入",
        "debit": 0,
        "credit": 50000,
        "explanation": "主营业务收入增加记贷方。项目完成确认收入。"
      },
      {
        "subjectCode": "222101",
        "summary": "计提增值税",
        "debit": 0,
        "credit": 3000,
        "explanation": "应交增值税增加记贷方。产生增值税纳税义务。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "记录"
      }
    ],
    "description": "通过银行转账缴纳各项税款合计53,000元。"
  },
  {
    "date": "2026-08-09",
    "title": "银行转账支付服务器托管费",
    "tags": [
      "项目核算"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "520101",
        "summary": "项目成本增加",
        "debit": 8000,
        "credit": 0,
        "explanation": "合同履约成本增加记借方。项目成本归集。"
      },
      {
        "subjectCode": "100201",
        "summary": "银行存款减少",
        "debit": 0,
        "credit": 8000,
        "explanation": "银行存款减少记贷方。银行款项支出。",
        "cashFlowItem": "cf-op6",
        "cashFlowExplanation": "其他经营活动现金支出（配对科目520101），属于\"支付其他与经营活动有关的现金\"。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "记录"
      }
    ],
    "description": "通过银行转账/代扣支付8,000元。"
  },
  {
    "date": "2026-08-10",
    "title": "支付宝支付在线课程采购",
    "tags": [
      "费用管理"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "660201",
        "summary": "管理费用",
        "debit": 5000,
        "credit": 0,
        "explanation": "管理费用-办公费增加记借方。办公费用计入管理费。"
      },
      {
        "subjectCode": "101205",
        "summary": "支付宝付款",
        "debit": 0,
        "credit": 5000,
        "explanation": "其他货币资金-支付宝减少记贷方。支付宝支付款项。",
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
    "description": "支付宝支付在线课程采购，涉及金额5,000元。"
  },
  {
    "date": "2026-08-12",
    "title": "提取备用金",
    "tags": [
      "资金管理"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "1001",
        "summary": "现金增加",
        "debit": 10000,
        "credit": 0,
        "explanation": "库存现金增加记借方。现金收款入账。"
      },
      {
        "subjectCode": "100201",
        "summary": "银行存款减少",
        "debit": 0,
        "credit": 10000,
        "explanation": "银行存款减少记贷方。银行款项支出。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "记录"
      }
    ],
    "description": "从银行提取现金10,000元作为备用金。"
  },
  {
    "date": "2026-08-13",
    "title": "现金支付绿化保洁费",
    "tags": [
      "费用管理"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "660201",
        "summary": "管理费用",
        "debit": 1800,
        "credit": 0,
        "explanation": "管理费用-办公费增加记借方。办公费用计入管理费。"
      },
      {
        "subjectCode": "1001",
        "summary": "现金减少",
        "debit": 0,
        "credit": 1800,
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
    "description": "以现金支付1,800元。"
  },
  {
    "date": "2026-08-14",
    "title": "银行代扣手续费",
    "tags": [
      "费用管理"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "6603",
        "summary": "财务费用",
        "debit": 220,
        "credit": 0,
        "explanation": "财务费用增加记借方。利息支出计入财务费用。"
      },
      {
        "subjectCode": "100201",
        "summary": "银行存款减少",
        "debit": 0,
        "credit": 220,
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
    "description": "通过银行转账/代扣支付220元。"
  },
  {
    "date": "2026-08-19",
    "title": "银行存款账户间转账",
    "tags": [
      "资金管理"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "100201",
        "summary": "银行存款增加",
        "debit": 60000,
        "credit": 0,
        "explanation": "银行存款增加记借方。款项存入银行。"
      },
      {
        "subjectCode": "100201",
        "summary": "银行存款减少",
        "debit": 0,
        "credit": 60000,
        "explanation": "银行存款减少记贷方。银行款项支出。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "记录"
      }
    ],
    "description": "通过银行转账/代扣支付60,000元。"
  },
  {
    "date": "2026-08-20",
    "title": "退还客户部分预收款",
    "tags": [
      "往来管理"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "2205",
        "summary": "冲减合同负债",
        "debit": 21200,
        "credit": 0,
        "explanation": "合同负债减少记借方。履约完成结转合同负债至收入。"
      },
      {
        "subjectCode": "100201",
        "summary": "银行存款减少",
        "debit": 0,
        "credit": 21200,
        "explanation": "银行存款减少记贷方。银行款项支出。",
        "cashFlowItem": "cf-op6",
        "cashFlowExplanation": "其他经营活动现金支出（配对科目2205），属于\"支付其他与经营活动有关的现金\"。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "记录"
      }
    ],
    "description": "收到客户款项21,200元，已存入银行账户。"
  },
  {
    "date": "2026-08-23",
    "title": "电脑维修费现金支付",
    "tags": [
      "费用管理"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "660201",
        "summary": "管理费用",
        "debit": 1200,
        "credit": 0,
        "explanation": "管理费用-办公费增加记借方。办公费用计入管理费。"
      },
      {
        "subjectCode": "1001",
        "summary": "现金减少",
        "debit": 0,
        "credit": 1200,
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
    "description": "以现金支付1,200元。"
  },
  {
    "date": "2026-08-26",
    "title": "购买转账支票",
    "tags": ["资金管理"],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "660201",
        "summary": "管理费用",
        "debit": 100,
        "credit": 0,
        "explanation": "管理费用-办公费增加记借方。办公费用计入管理费。"
      },
      {
        "subjectCode": "1001",
        "summary": "现金减少",
        "debit": 0,
        "credit": 100,
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
    "description": "通过银行转账/代扣支付100元。"
  },
  {
    "date": "2026-08-31",
    "title": "月末归档",
    "tags": ["资金管理"],
    "difficulty": 1,
    "entries": [],
    "documents": [
      {
        "type": "text",
        "label": "记录"
      }
    ],
    "description": "将本月凭证整理装订成册，归档保存。"
  }
]

export default tasks
