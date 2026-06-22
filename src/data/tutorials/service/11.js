/**
 * 服务业 11月
 */

const tasks = [
  {
    "date": "2026-11-01",
    "title": "缴纳10月增值税",
    "tags": ["税费"],
    "difficulty": 2,
    "entries": [
      {
        "subjectCode": "222101",
        "summary": "增值税",
        "debit": 15000,
        "credit": 0,
        "explanation": "应交增值税减少记借方。缴纳增值税冲销负债。"
      },
      {
        "subjectCode": "222103",
        "summary": "城建税",
        "debit": 1050,
        "credit": 0,
        "explanation": "应交城建税增加记借方。计提城建税。"
      },
      {
        "subjectCode": "222104",
        "summary": "教育费附加",
        "debit": 450,
        "credit": 0,
        "explanation": "应交教育费附加增加记借方。计提教育费附加。"
      },
      {
        "subjectCode": "100201",
        "summary": "缴税",
        "debit": 0,
        "credit": 16500,
        "explanation": "银行存款减少记贷方。缴纳税款支付。",
        "cashFlowItem": "cf-op4",
        "cashFlowExplanation": "缴纳税费支出（配对科目222101），属于\"支付的各项税费\"——经营活动现金流出。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "付款回单",
        "totalAmount": 16500
      }
    ],
    "description": "通过银行转账缴纳各项税款合计16,500元。"
  },
  {
    "date": "2026-11-02",
    "title": "缴纳10月社保",
    "tags": ["工资社保"],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "221102",
        "summary": "社保",
        "debit": 33750,
        "credit": 0,
        "explanation": "应付职工薪酬-社保减少记借方。缴纳社保冲销负债。"
      },
      {
        "subjectCode": "221102",
        "summary": "社保",
        "debit": 0,
        "credit": 33750,
        "explanation": "应付职工薪酬-社保增加记贷方。计提社保负债增加。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "回单",
        "totalAmount": 33750
      }
    ],
    "description": "通过银行转账缴纳社保费用合计33,750元。"
  },
  {
    "date": "2026-11-03",
    "title": "发放10月工资",
    "tags": [
      "人工成本",
      "工资社保"
    ],
    "difficulty": 3,
    "entries": [
      {
        "subjectCode": "221101",
        "summary": "应发",
        "debit": 135000,
        "credit": 0,
        "explanation": "应付职工薪酬增加记贷方。计提应发工资。"
      },
      {
        "subjectCode": "100201",
        "summary": "实发",
        "debit": 0,
        "credit": 131250,
        "explanation": "银行存款减少记贷方。实发工资转账支付。",
        "cashFlowItem": "cf-op6",
        "cashFlowExplanation": "其他经营活动现金支出（配对科目660203），属于\"支付其他与经营活动有关的现金\"。"
      },
      {
        "subjectCode": "222102",
        "summary": "个税",
        "debit": 0,
        "credit": 3750,
        "explanation": "应交个人所得税增加记贷方。代扣个税形成应交义务。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "回单",
        "totalAmount": 131250
      }
    ],
    "description": "通过银行转账缴纳各项税款合计135,000元。"
  },
  {
    "date": "2026-11-04",
    "title": "承接企业内训与人才发展项目",
    "tags": [
      "收入确认"
    ],
    "difficulty": 2,
    "description": "承接大型企业内训项目150,000元，预收全额159,000元（含税6%）。",
    "entries": [
      {
        "subjectCode": "660201",
        "summary": "培训费",
        "debit": 159000,
        "credit": 0,
        "explanation": "管理费用-办公费增加记借方。培训费用计入管理费。"
      },
      {
        "subjectCode": "2205",
        "summary": "合同负债",
        "debit": 0,
        "credit": 150000,
        "explanation": "合同负债增加记贷方。预收款形成合同负债。"
      },
      {
        "subjectCode": "222101",
        "summary": "增值税",
        "debit": 0,
        "credit": 9000,
        "explanation": "应交增值税增加记贷方。确认收入产生增值税纳税义务。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "回单",
        "totalAmount": 159000
      }
    ]
  },
  {
    "date": "2026-11-05",
    "title": "摊销11月办公室租金",
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
        "content": "预付下半年租金第5次摊销（共6次）。"
      }
    ],
    "description": "摊销11月办公室租金，涉及金额20,000元。"
  },
  {
    "date": "2026-11-07",
    "title": "计提11月上半月项目工资",
    "tags": [
      "项目核算",
      "人工成本"
    ],
    "difficulty": 2,
    "entries": [
      {
        "subjectCode": "660203",
        "summary": "上半月",
        "debit": 45000,
        "credit": 0,
        "explanation": "管理费用-工资薪金增加记借方。上半月工资计提。"
      },
      {
        "subjectCode": "221101",
        "summary": "薪酬",
        "debit": 0,
        "credit": 45000,
        "explanation": "应付职工薪酬增加记贷方。计提薪酬负债增加。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "工资表",
        "content": "45,000元。"
      }
    ],
    "description": "通过银行代发工资合计45,000元。"
  },
  {
    "date": "2026-11-08",
    "title": "计提11月上半月管理工资",
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
    "date": "2026-11-09",
    "title": "支付11月水电费",
    "tags": [
      "费用管理"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "660201",
        "summary": "水电",
        "debit": 6300,
        "credit": 0,
        "explanation": "管理费用-办公费增加记借方。水电费计入管理费。"
      },
      {
        "subjectCode": "100201",
        "summary": "付款",
        "debit": 0,
        "credit": 6300,
        "explanation": "银行存款减少记贷方。支付款项。",
        "cashFlowItem": "cf-op6",
        "cashFlowExplanation": "其他经营活动现金支出（配对科目660201），属于\"支付其他与经营活动有关的现金\"。"
      }
    ],
    "documents": [
      {
        "type": "receipt",
        "label": "账单",
        "totalAmount": 6300
      }
    ],
    "description": "支付11月水电费，涉及金额6,300元。"
  },
  {
    "date": "2026-11-10",
    "title": "培训项目讲师出差安排",
    "tags": [
      "项目核算"
    ],
    "difficulty": 2,
    "entries": [
      {
        "subjectCode": "1221",
        "summary": "预借差旅",
        "debit": 7000,
        "credit": 0,
        "explanation": "其他应收款增加记借方。预借差旅费形成债权。"
      },
      {
        "subjectCode": "2001",
        "summary": "借款",
        "debit": 0,
        "credit": 7000,
        "explanation": "短期借款增加记贷方。取得短期借款。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "借款单",
        "content": "培训项目讲师出差预借差旅费7,000元。"
      }
    ],
    "description": "以现金支付7,000元。"
  },
  {
    "date": "2026-11-11",
    "title": "培训项目第一阶段收入确认",
    "tags": [
      "收入确认",
      "项目核算"
    ],
    "difficulty": 3,
    "description": "培训项目完成第一阶段（需求调研+课程开发），按进度确认60%收入90,000元。",
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
        "label": "培训验收单",
        "content": "培训项目需求调研与课程开发阶段完成。"
      }
    ]
  },
  {
    "date": "2026-11-14",
    "title": "计提11月下半月项目工资",
    "tags": [
      "项目核算",
      "人工成本"
    ],
    "difficulty": 2,
    "entries": [
      {
        "subjectCode": "660203",
        "summary": "下半月",
        "debit": 45000,
        "credit": 0,
        "explanation": "管理费用-工资薪金增加记借方。下半月工资计提。"
      },
      {
        "subjectCode": "221101",
        "summary": "薪酬",
        "debit": 0,
        "credit": 45000,
        "explanation": "应付职工薪酬增加记贷方。计提薪酬负债增加。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "工资表",
        "content": "45,000元。"
      }
    ],
    "description": "通过银行代发工资合计45,000元。"
  },
  {
    "date": "2026-11-15",
    "title": "计提11月下半月管理工资",
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
    "date": "2026-11-16",
    "title": "计提11月社保",
    "tags": [
      "人工成本",
      "工资社保"
    ],
    "difficulty": 2,
    "entries": [
      {
        "subjectCode": "520101",
        "summary": "项目社保",
        "debit": 22500,
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
        "credit": 33750,
        "explanation": "应付职工薪酬-社保增加记贷方。计提社保负债增加。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "社保表",
        "content": "22,500+11,250=33,750。"
      }
    ],
    "description": "通过银行转账缴纳社保费用合计33,750元。"
  },
  {
    "date": "2026-11-17",
    "title": "计提11月折旧",
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
    "description": "计提11月折旧，涉及金额4,085元。"
  },
  {
    "date": "2026-11-18",
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
    "date": "2026-11-21",
    "title": "培训项目差旅报销核销",
    "tags": [
      "项目核算",
      "费用管理"
    ],
    "difficulty": 2,
    "entries": [
      {
        "subjectCode": "660202",
        "summary": "差旅费",
        "debit": 6500,
        "credit": 0,
        "explanation": "管理费用-差旅费增加记借方。出差交通住宿计入管理费用。"
      },
      {
        "subjectCode": "1001",
        "summary": "退回",
        "debit": 500,
        "credit": 0,
        "explanation": "库存现金增加记借方。退回现金。",
        "cashFlowItem": "cf-op5",
        "cashFlowExplanation": "其他经营活动现金流入（配对科目1221），属于\"收到其他与经营活动有关的现金\"。"
      },
      {
        "subjectCode": "1221",
        "summary": "冲借款",
        "debit": 0,
        "credit": 7000,
        "explanation": "其他应收款减少记贷方。报销冲抵借款。"
      }
    ],
    "documents": [
      {
        "type": "receipt",
        "label": "报销单",
        "totalAmount": 6500
      }
    ],
    "description": "以现金支付相关款项。"
  },
  {
    "date": "2026-11-22",
    "title": "计提11月借款利息",
    "tags": ["期末"],
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
    "date": "2026-11-24",
    "title": "计算11月增值税",
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
    "date": "2026-11-25",
    "title": "期末结转损益",
    "tags": [
      "期末"
    ],
    "difficulty": 3,
    "entries": [
      { subjectCode: '6001', debit: 190000, credit: 0, summary: '收入', explanation: '主营业务收入减少记借方。期末结转至本年利润。' },
      { subjectCode: '660201', debit: 0, credit: 184500, summary: '管理费用', explanation: '管理费用减少记贷方。期末结转至本年利润。' },
      { subjectCode: '660202', debit: 0, credit: 13000, summary: '结转660202', explanation: '660202转出，余额归零。' },
      { subjectCode: '660203', debit: 0, credit: 146250, summary: '结转660203', explanation: '660203转出，余额归零。' },
      { subjectCode: '660205', debit: 0, credit: 4085, summary: '结转660205', explanation: '660205转出，余额归零。' },
      { subjectCode: '660206', debit: 0, credit: 22555.55, summary: '结转660206', explanation: '660206转出，余额归零。' },
      { subjectCode: '6603', debit: 0, credit: 666.67, summary: '财务费用', explanation: '财务费用减少记贷方。期末结转至本年利润。' },
      { subjectCode: '4103', debit: 181057.22, credit: 0, summary: '收入转利润', explanation: '本年利润增加记贷方。收入结转至本年利润。' }
    ],
    "documents": [
      {
        "type": "text",
        "label": "损益表",
        "content": "11月净利润-117,466.67元（培训业务仍亏损）。"
      }
    ],
    "description": "期末结转损益，涉及金额297,466.67元。"
  },
  {
    "date": "2026-11-01",
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
        "debit": 16500,
        "credit": 0,
        "explanation": "未交增值税减少记借方。缴纳税款冲销负债。"
      },
      {
        "subjectCode": "222110",
        "summary": "税",
        "debit": 0,
        "credit": 16500,
        "explanation": "未交增值税增加记贷方。计提应交增值税。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "回单",
        "totalAmount": 16500
      }
    ],
    "description": "通过银行转账缴纳各项税款合计16,500元。"
  },
  {
    "date": "2026-11-02",
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
        "debit": 33750,
        "credit": 0,
        "explanation": "应付职工薪酬-社保减少记借方。缴纳社保冲销负债。"
      },
      {
        "subjectCode": "221102",
        "summary": "社保",
        "debit": 0,
        "credit": 33750,
        "explanation": "应付职工薪酬-社保增加记贷方。计提社保负债增加。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "回单",
        "totalAmount": 33750
      }
    ],
    "description": "通过银行转账缴纳社保费用合计33,750元。"
  },
  {
    "date": "2026-11-03",
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
        "debit": 135000,
        "credit": 0,
        "explanation": "管理费用-工资薪金增加记借方。管理人员工资计入管理费。"
      },
      {
        "subjectCode": "100201",
        "summary": "实发",
        "debit": 0,
        "credit": 131250,
        "explanation": "银行存款减少记贷方。实发工资转账支付。",
        "cashFlowItem": "cf-op6",
        "cashFlowExplanation": "其他经营活动现金支出（配对科目660203），属于\"支付其他与经营活动有关的现金\"。"
      },
      {
        "subjectCode": "222102",
        "summary": "个税",
        "debit": 0,
        "credit": 3750,
        "explanation": "应交个人所得税增加记贷方。代扣个税形成应交义务。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "回单",
        "totalAmount": 131250
      }
    ],
    "description": "通过银行转账缴纳各项税款合计135,000元。"
  },
  {
    "date": "2026-11-04",
    "title": "预收款到账确认",
    "tags": ["出纳"],
    "difficulty": 1,
    "role": "cashier",
    "entries": [
      {
        "subjectCode": "660201",
        "summary": "培训费",
        "debit": 159000,
        "credit": 0,
        "explanation": "管理费用-办公费增加记借方。培训费用计入管理费。"
      },
      {
        "subjectCode": "2205",
        "summary": "合同负债",
        "debit": 0,
        "credit": 159000,
        "explanation": "合同负债增加记贷方。预收款形成合同负债。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "回单",
        "totalAmount": 159000
      }
    ],
    "description": "收到客户款项159,000元，已存入银行账户。"
  },
  {
    "date": "2026-11-10",
    "title": "差旅借款",
    "tags": [
      "项目核算"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "2001",
        "summary": "借款",
        "debit": 7000,
        "credit": 0,
        "explanation": "短期借款减少记借方。偿还借款本金。"
      },
      {
        "subjectCode": "1001",
        "summary": "借支",
        "debit": 0,
        "credit": 7000,
        "explanation": "库存现金减少记贷方。员工借支现金。",
        "cashFlowItem": "cf-fin2",
        "cashFlowExplanation": "偿还债务本金（配对科目2001），属于筹资活动现金流出。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "借款单",
        "content": "7,000元。"
      }
    ],
    "description": "通过银行转账偿还借款本息合计7,000元。"
  },
  {
    "date": "2026-11-21",
    "title": "差旅报销退款处理",
    "tags": [
      "费用管理"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "660202",
        "summary": "报销",
        "debit": 6500,
        "credit": 0,
        "explanation": "管理费用-差旅费增加记借方。报销差旅费用。"
      },
      {
        "subjectCode": "1001",
        "summary": "退现",
        "debit": 500,
        "credit": 0,
        "explanation": "库存现金增加记借方。收回多余备用金。",
        "cashFlowItem": "cf-op5",
        "cashFlowExplanation": "其他经营活动现金流入（配对科目1221），属于\"收到其他与经营活动有关的现金\"。"
      },
      {
        "subjectCode": "1221",
        "summary": "冲销",
        "debit": 0,
        "credit": 7000,
        "explanation": "其他应收款减少记贷方。冲销借款。"
      }
    ],
    "documents": [
      {
        "type": "receipt",
        "label": "收据",
        "totalAmount": 500
      }
    ],
    "description": "以现金支付相关款项。"
  },
  {
    "date": "2026-11-28",
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
    "date": "2026-11-29",
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
    "date": "2026-11-31",
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
        "content": "11月归档完毕。"
      }
    ],
    "description": "将本月凭证整理装订成册，归档保存。"
  },
  {
    "date": "2026-11-08",
    "title": "支付宝收款-年终咨询项目",
    "tags": ["出纳"],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "101205",
        "summary": "支付宝收款",
        "debit": 106000,
        "credit": 0,
        "explanation": "其他货币资金-支付宝增加记借方。支付宝收款入账。",
        "cashFlowItem": "cf-op",
        "cashFlowExplanation": "销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入——主营业务产生的现金收入。"
      },
      {
        "subjectCode": "6001",
        "summary": "确认收入",
        "debit": 0,
        "credit": 100000,
        "explanation": "主营业务收入增加记贷方。项目完成确认收入。"
      },
      {
        "subjectCode": "222101",
        "summary": "计提增值税",
        "debit": 0,
        "credit": 6000,
        "explanation": "应交增值税增加记贷方。产生增值税纳税义务。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "记录"
      }
    ],
    "description": "通过银行转账缴纳各项税款合计106,000元。"
  },
  {
    "date": "2026-11-09",
    "title": "微信支付数据采购费",
    "tags": [
      "项目核算"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "520101",
        "summary": "项目成本增加",
        "debit": 15000,
        "credit": 0,
        "explanation": "合同履约成本增加记借方。项目成本归集。"
      },
      {
        "subjectCode": "101204",
        "summary": "微信付款",
        "debit": 0,
        "credit": 15000,
        "explanation": "其他货币资金-微信减少记贷方。微信支付款项。",
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
    "description": "微信支付数据采购费，涉及金额15,000元。"
  },
  {
    "date": "2026-11-10",
    "title": "银行转账支付审计费",
    "tags": [
      "费用管理"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "660201",
        "summary": "管理费用",
        "debit": 10000,
        "credit": 0,
        "explanation": "管理费用-办公费增加记借方。办公费用计入管理费。"
      },
      {
        "subjectCode": "100201",
        "summary": "银行存款减少",
        "debit": 0,
        "credit": 10000,
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
    "description": "通过银行转账/代扣支付10,000元。"
  },
  {
    "date": "2026-11-11",
    "title": "提取备用金",
    "tags": ["出纳"],
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
    "date": "2026-11-12",
    "title": "现金支付会议费用",
    "tags": [
      "费用管理"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "660201",
        "summary": "管理费用",
        "debit": 4200,
        "credit": 0,
        "explanation": "管理费用-办公费增加记借方。办公费用计入管理费。"
      },
      {
        "subjectCode": "1001",
        "summary": "现金减少",
        "debit": 0,
        "credit": 4200,
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
    "description": "以现金支付4,200元。"
  },
  {
    "date": "2026-11-18",
    "title": "预付下年度软件服务费",
    "tags": [
      "费用管理"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "4103",
        "summary": "借方金额",
        "debit": 24000,
        "credit": 0,
        "explanation": "本年利润减少记借方。结转成本费用至本年利润。"
      },
      {
        "subjectCode": "100201",
        "summary": "银行存款减少",
        "debit": 0,
        "credit": 24000,
        "explanation": "银行存款减少记贷方。银行款项支出。",
        "cashFlowItem": "cf-op6",
        "cashFlowExplanation": "其他经营活动现金支出（配对科目4103），属于\"支付其他与经营活动有关的现金\"。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "记录"
      }
    ],
    "description": "预付下年度软件服务费，涉及金额24,000元。"
  },
  {
    "date": "2026-11-20",
    "title": "银行账户间转账",
    "tags": ["资金管理"],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "100201",
        "summary": "银行存款增加",
        "debit": 50000,
        "credit": 0,
        "explanation": "银行存款增加记借方。款项存入银行。"
      },
      {
        "subjectCode": "100201",
        "summary": "银行存款减少",
        "debit": 0,
        "credit": 50000,
        "explanation": "银行存款减少记贷方。银行款项支出。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "记录"
      }
    ],
    "description": "通过银行转账/代扣支付50,000元。"
  },
  {
    "date": "2026-11-23",
    "title": "现金支付年终聚餐费",
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
        "subjectCode": "1001",
        "summary": "现金减少",
        "debit": 0,
        "credit": 5000,
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
    "description": "以现金支付5,000元。"
  },
  {
    "date": "2026-11-30",
    "title": "月末票据归档",
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
    date: "2026-11-30",
    title: "模拟纳税申报",
    tags: ["期末", "税费"],
    difficulty: 1,
    description: "根据本月已完成的账务处理，进行模拟纳税申报。系统已自动计算应缴税额（增值税和企业所得税），请前往纳税申报页面核对并提交。",
    tip: "纳税申报是企业每月的法定义务。确认所有凭证已过账、期末结转已完成后，前往纳税申报页面核对各项税额后点击「提交申报」。",
    entries: [],
    documents: [
      { type: "text", label: "纳税申报提醒", docTitle: "11月纳税申报提醒", content: "申报期间：2026-11-30\n\n请前往纳税申报页面：\n1. 核对增值税申报表数据\n2. 核对企业所得税申报表数据\n3. 确认无误后点击「提交申报」\n\n纳税申报是企业每月必做的合规义务，请按时完成。", stampText: "财务专用章" }]},
]

export default tasks
