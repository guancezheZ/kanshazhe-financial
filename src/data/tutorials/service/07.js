/**
 * 服务业 07月
 */

const tasks = [
  {
    "date": "2026-07-01",
    "role": "accountant",
    "title": "缴纳6月增值税",
    "tags": ["税费"],
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
    "date": "2026-07-02",
    "role": "accountant",
    "title": "缴纳6月社保",
    "tags": ["工资社保"],
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
    "date": "2026-07-03",
    "role": "accountant",
    "title": "发放6月工资",
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
    "date": "2026-07-04",
    "role": "accountant",
    "title": "新增数据分析业务线",
    "tags": [
      "收入确认"
    ],
    "difficulty": 2,
    "description": "承接大数据分析项目合同250,000元，预收40%定金106,000元（含税）。",
    "entries": [
      {
        "subjectCode": "100201",
        "summary": "定金",
        "debit": 106000,
        "credit": 0,
        "explanation": "银行存款增加记借方。收到客户定金。",
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
        "summary": "增值税",
        "debit": 0,
        "credit": 6000,
        "explanation": "应交增值税增加记贷方。确认收入产生增值税纳税义务。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "回单",
        "totalAmount": 106000
      }
    ]
  },
  {
    "date": "2026-07-05",
    "role": "accountant",
    "title": "摊销7月办公室租金",
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
        "content": "新预付下半年租金第1次摊销。"
      }
    ],
    "description": "摊销7月办公室租金，涉及金额20,000元。"
  },
  {
    "date": "2026-07-07",
    "role": "accountant",
    "title": "计提7月上半月项目工资",
    "tags": [
      "项目核算",
      "人工成本"
    ],
    "difficulty": 2,
    "entries": [
      {
        "subjectCode": "660203",
        "summary": "上半月",
        "debit": 38000,
        "credit": 0,
        "explanation": "管理费用-工资薪金增加记借方。上半月工资计提。"
      },
      {
        "subjectCode": "221101",
        "summary": "薪酬",
        "debit": 0,
        "credit": 38000,
        "explanation": "应付职工薪酬增加记贷方。计提薪酬负债增加。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "工资表",
        "content": "38,000元。"
      }
    ],
    "description": "通过银行代发工资合计38,000元。"
  },
  {
    "date": "2026-07-08",
    "role": "accountant",
    "title": "计提7月上半月管理工资",
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
    "date": "2026-07-09",
    "role": "accountant",
    "title": "支付7月水电费",
    "tags": [
      "费用管理"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "660201",
        "summary": "水电",
        "debit": 5900,
        "credit": 0,
        "explanation": "管理费用-办公费增加记借方。水电费计入管理费。"
      },
      {
        "subjectCode": "100201",
        "summary": "付款",
        "debit": 0,
        "credit": 5900,
        "explanation": "银行存款减少记贷方。支付款项。",
        "cashFlowItem": "cf-op6",
        "cashFlowExplanation": "其他经营活动现金支出（配对科目660201），属于\"支付其他与经营活动有关的现金\"。"
      }
    ],
    "documents": [
      {
        "type": "receipt",
        "label": "账单",
        "totalAmount": 5900
      }
    ],
    "description": "支付7月水电费，涉及金额5,900元。"
  },
  {
    "date": "2026-07-10",
    "role": "accountant",
    "title": "数据分析项目出差",
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
        "content": "数据项目出差预借6,000元。"
      }
    ],
    "description": "以现金支付6,000元。"
  },
  {
    "date": "2026-07-11",
    "role": "accountant",
    "title": "数据分析项目中期确认收入",
    "tags": [
      "收入确认",
      "项目核算"
    ],
    "difficulty": 3,
    "description": "数据分析项目完成中期目标，按进度确认40%收入100,000元。",
    "entries": [
      {
        "subjectCode": "2205",
        "summary": "合同负债转收入",
        "debit": 100000,
        "credit": 0,
        "explanation": "合同负债减少记借方。履约完成结转至收入。"
      },
      {
        "subjectCode": "6001",
        "summary": "确认收入",
        "debit": 0,
        "credit": 100000,
        "explanation": "主营业务收入增加记贷方。项目完成确认收入。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "中期报告",
        "content": "数据分析项目中期验收通过。"
      }
    ]
  },
  {
    "date": "2026-07-14",
    "role": "accountant",
    "title": "计提7月下半月项目工资",
    "tags": [
      "项目核算",
      "人工成本"
    ],
    "difficulty": 2,
    "entries": [
      {
        "subjectCode": "660203",
        "summary": "下半月",
        "debit": 38000,
        "credit": 0,
        "explanation": "管理费用-工资薪金增加记借方。下半月工资计提。"
      },
      {
        "subjectCode": "221101",
        "summary": "薪酬",
        "debit": 0,
        "credit": 38000,
        "explanation": "应付职工薪酬增加记贷方。计提薪酬负债增加。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "工资表",
        "content": "38,000元。"
      }
    ],
    "description": "通过银行代发工资合计38,000元。"
  },
  {
    "date": "2026-07-15",
    "role": "accountant",
    "title": "计提7月下半月管理工资",
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
    "date": "2026-07-16",
    "role": "accountant",
    "title": "计提7月社保",
    "tags": [
      "人工成本",
      "工资社保"
    ],
    "difficulty": 2,
    "entries": [
      {
        "subjectCode": "520101",
        "summary": "项目社保",
        "debit": 19000,
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
        "credit": 30250,
        "explanation": "应付职工薪酬-社保增加记贷方。计提社保负债增加。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "社保表",
        "content": "19,000+11,250=30,250。"
      }
    ],
    "description": "通过银行转账缴纳社保费用合计30,250元。"
  },
  {
    "date": "2026-07-17",
    "role": "accountant",
    "title": "计提7月折旧",
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
    "description": "计提7月折旧，涉及金额4,085元。"
  },
  {
    "date": "2026-07-18",
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

  // ═══════════════════════════════════════════
  // 项目成本分摊逻辑（7月19日~7月21日）
  // ═══════════════════════════════════════════
  {
    "date": "2026-07-19",
    "role": "accountant",
    "title": "多项目人力工时分配",
    "tags": ["项目核算", "人工成本"],
    "difficulty": 2,
    "description": "当前公司有两个在管项目：甲客户ERP咨询项目和庚客户数字化转型项目。7月项目组8人总工资76,000元，其中ERP项目团队5人（占60%工时）、数字化项目团队3人（占40%工时）。按工时比例分配：ERP项目应分配76,000×60%=45,600元，数字化项目应分配76,000×40%=30,400元。",
    "tip": "多项目并行时，人工成本需按合理方法在各项目间分配。常用分配标准：①实际工时比例（最准确）；②项目人数比例（简便）；③项目收入比例（收入导向）。建议按实际工时记录分配，体现成本归集的准确性。",
    "entries": [],
    "documents": [
      { "type": "text", "label": "工时分配表", "docTitle": "2026年7月多项目人工成本分配表", "content": "ERP项目团队5人60%工时→分配45,600元。数字化项目团队3人40%工时→分配30,400元。合计76,000元已全部归集到劳务成本-人工成本科目。", "signature": "项目经理确认" }
    ]
  },
  {
    "date": "2026-07-20",
    "role": "accountant",
    "title": "间接费用按项目分摊",
    "tags": ["项目核算", "费用管理"],
    "difficulty": 2,
    "description": "7月发生间接费用：办公室租金20,000元、水电费6,200元、折旧4,085元、摊销2,555.55元，合计32,840.55元。按各项目直接人工成本比例分摊：ERP项目占60%×32,840.55=19,704.33元，数字化项目占40%×32,840.55=13,136.22元。",
    "tip": "间接费用（房租、水电、折旧等）不能直接归属于某一项目，需选择合理的分配标准。常用的分摊基础：①直接人工成本比例（适用人工密集型）；②直接人工工时（适用工时记录完善）；③项目直接成本（综合性强）。分配标准一经选定应一贯运用。",
    "entries": [],
    "documents": [
      { "type": "text", "label": "间接费用分摊表", "docTitle": "2026年7月间接费用分摊计算表", "content": "间接费用合计32,840.55元。ERP项目(60%): 房租12,000+水电3,720+折旧2,451+摊销1,533.33=19,704.33。数字化项目(40%): 房租8,000+水电2,480+折旧1,634+摊销1,022.22=13,136.22。分摊标准：直接人工成本比例。", "signature": "财务部" }
    ]
  },
  {
    "date": "2026-07-21",
    "role": "accountant",
    "title": "各项目损益汇总分析",
    "tags": ["项目核算", "收入确认", "期末"],
    "difficulty": 2,
    "description": "汇总7月各项目损益。ERP项目：已确认收入90,000元，直接人工成本45,600元，分摊间接费用19,704.33元，项目利润=90,000-45,600-19,704.33=24,695.67元。数字化项目：已确认收入120,000元，直接人工成本30,400元，分摊间接费用13,136.22元，项目利润=120,000-30,400-13,136.22=76,463.78元。两个项目合计净利润101,159.45元。",
    "tip": "项目损益=项目收入-可直接归属成本-分摊间接费用。项目损益分析有助于管理层了解各项目的盈利能力和资源配置效率。注意间接费用分摊方法会影响项目利润的准确性，不同分摊方法可能导致不同结论。",
    "entries": [],
    "documents": [
      { "type": "text", "label": "项目损益表", "docTitle": "2026年7月项目损益分析表", "content": "ERP项目：收入90,000-成本65,304.33=利润24,695.67元（毛利率27.4%）。\n数字化项目：收入120,000-成本43,536.22=利润76,463.78元（毛利率63.7%）。\n合计：收入210,000-成本108,840.55=净利润101,159.45元。", "signature": "财务部" }
    ]
  },
  {
    "date": "2026-07-21",
    "role": "accountant",
    "title": "差旅报销冲预借",
    "tags": [
      "项目核算",
      "费用管理"
    ],
    "difficulty": 2,
    "entries": [
      {
        "subjectCode": "660202",
        "summary": "差旅费",
        "debit": 5500,
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
        "credit": 6000,
        "explanation": "其他应收款减少记贷方。报销冲抵借款。"
      }
    ],
    "documents": [
      {
        "type": "receipt",
        "label": "报销单",
        "totalAmount": 5500
      }
    ],
    "description": "以现金支付相关款项。"
  },
  {
    "date": "2026-07-22",
    "role": "accountant",
    "title": "计提7月借款利息",
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
    "date": "2026-07-24",
    "role": "accountant",
    "title": "计算7月增值税",
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
    "date": "2026-07-25",
    "role": "accountant",
    "title": "期末结转损益",
    "tags": [
      "期末"
    ],
    "difficulty": 3,
    "entries": [
      { subjectCode: '6001', debit: 120000, credit: 0, summary: '收入', explanation: '主营业务收入减少记借方。期末结转至本年利润。' },
      { subjectCode: '660201', debit: 0, credit: 13300, summary: '管理费用', explanation: '管理费用减少记贷方。期末结转至本年利润。' },
      { subjectCode: '660202', debit: 0, credit: 11000, summary: '结转660202', explanation: '660202转出，余额归零。' },
      { subjectCode: '660203', debit: 0, credit: 132250, summary: '结转660203', explanation: '660203转出，余额归零。' },
      { subjectCode: '660205', debit: 0, credit: 4085, summary: '结转660205', explanation: '660205转出，余额归零。' },
      { subjectCode: '660206', debit: 0, credit: 22555.55, summary: '结转660206', explanation: '660206转出，余额归零。' },
      { subjectCode: '6603', debit: 0, credit: 866.67, summary: '财务费用', explanation: '财务费用减少记贷方。期末结转至本年利润。' },
      { subjectCode: '4103', debit: 64057.22, credit: 0, summary: '收入转利润', explanation: '本年利润增加记贷方。收入结转至本年利润。' }
    ],
    "documents": [
      {
        "type": "text",
        "label": "损益表",
        "content": "7月净利润约-80,000元（项目初期投入较大）。"
      }
    ],
    "description": "期末结转损益，涉及金额276,866.67元。"
  },
  {
    "date": "2026-07-01",
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
    "date": "2026-07-02",
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
    "date": "2026-07-03",
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
    "date": "2026-07-04",
    "title": "定金到账",
    "tags": ["出纳"],
    "difficulty": 1,
    "role": "cashier",
    "entries": [
      {
        "subjectCode": "100201",
        "summary": "定金",
        "debit": 106000,
        "credit": 0,
        "explanation": "银行存款增加记借方。收到客户定金。",
        "cashFlowItem": "cf-op5",
        "cashFlowExplanation": "其他经营活动现金流入（配对科目2205），属于\"收到其他与经营活动有关的现金\"。"
      },
      {
        "subjectCode": "2205",
        "summary": "合同负债",
        "debit": 0,
        "credit": 106000,
        "explanation": "合同负债增加记贷方。预收款形成合同负债。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "回单",
        "totalAmount": 106000
      }
    ],
    "description": "收到客户款项106,000元，已存入银行账户。"
  },
  {
    "date": "2026-07-10",
    "role": "accountant",
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
    "date": "2026-07-21",
    "role": "accountant",
    "title": "差旅报销退款",
    "tags": [
      "费用管理"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "660202",
        "summary": "报销",
        "debit": 5500,
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
        "credit": 6000,
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
    "date": "2026-07-28",
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
        "content": "相符。"
      }
    ],
    "description": "对库存现金进行月末盘点，确保账实相符。"
  },
  {
    "date": "2026-07-29",
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
        "content": "一致。"
      }
    ],
    "description": "将银行日记账与银行对账单进行核对，编制余额调节表。"
  },
  {
    "date": "2026-07-31",
    "role": "accountant",
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
        "content": "7月归档完毕。"
      }
    ],
    "description": "将本月凭证整理装订成册，归档保存。"
  },
  {
    "date": "2026-07-08",
    "role": "accountant",
    "title": "微信收款-项目咨询费",
    "tags": ["出纳"],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "101204",
        "summary": "微信收款",
        "debit": 21200,
        "credit": 0,
        "explanation": "其他货币资金-微信增加记借方。微信收款入账。",
        "cashFlowItem": "cf-op",
        "cashFlowExplanation": "销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入——主营业务产生的现金收入。"
      },
      {
        "subjectCode": "6001",
        "summary": "确认收入",
        "debit": 0,
        "credit": 20000,
        "explanation": "主营业务收入增加记贷方。项目完成确认收入。"
      },
      {
        "subjectCode": "222101",
        "summary": "计提增值税",
        "debit": 0,
        "credit": 1200,
        "explanation": "应交增值税增加记贷方。产生增值税纳税义务。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "记录"
      }
    ],
    "description": "通过银行转账缴纳各项税款合计21,200元。"
  },
  {
    "date": "2026-07-09",
    "role": "accountant",
    "title": "支付宝支付软件授权续费",
    "tags": [
      "项目核算"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "520101",
        "summary": "项目成本增加",
        "debit": 6000,
        "credit": 0,
        "explanation": "合同履约成本增加记借方。项目成本归集。"
      },
      {
        "subjectCode": "101205",
        "summary": "支付宝付款",
        "debit": 0,
        "credit": 6000,
        "explanation": "其他货币资金-支付宝减少记贷方。支付宝支付款项。",
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
    "description": "支付宝支付软件授权续费，涉及金额6,000元。"
  },
  {
    "date": "2026-07-12",
    "role": "accountant",
    "title": "银行转账支付宽带及电话费",
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
        "subjectCode": "100201",
        "summary": "银行存款减少",
        "debit": 0,
        "credit": 2800,
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
    "description": "通过银行转账/代扣支付2,800元。"
  },
  {
    "date": "2026-07-13",
    "role": "accountant",
    "title": "提取备用金",
    "tags": ["出纳"],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "1001",
        "summary": "现金增加",
        "debit": 12000,
        "credit": 0,
        "explanation": "库存现金增加记借方。现金收款入账。"
      },
      {
        "subjectCode": "100201",
        "summary": "银行存款减少",
        "debit": 0,
        "credit": 12000,
        "explanation": "银行存款减少记贷方。银行款项支出。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "记录"
      }
    ],
    "description": "从银行提取现金12,000元作为备用金。"
  },
  {
    "date": "2026-07-15",
    "role": "accountant",
    "title": "现金支付员工防暑降温费",
    "tags": [
      "人工成本"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "660201",
        "summary": "管理费用",
        "debit": 4500,
        "credit": 0,
        "explanation": "管理费用-办公费增加记借方。办公费用计入管理费。"
      },
      {
        "subjectCode": "1001",
        "summary": "现金减少",
        "debit": 0,
        "credit": 4500,
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
    "description": "以现金支付4,500元。"
  },
  {
    "date": "2026-07-15",
    "role": "accountant",
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
    "date": "2026-07-19",
    "role": "accountant",
    "title": "发放项目绩效奖金",
    "tags": [
      "人工成本"
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
        "subjectCode": "4103",
        "summary": "贷方金额",
        "debit": 0,
        "credit": 15000,
        "explanation": "本年利润增加记贷方。结转收入至本年利润。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "记录"
      }
    ],
    "description": "发放项目绩效奖金，涉及金额15,000元。"
  },
  {
    "date": "2026-07-20",
    "role": "accountant",
    "title": "退客户定金（项目取消）",
    "tags": [
      "往来管理"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "2205",
        "summary": "冲减合同负债",
        "debit": 53000,
        "credit": 0,
        "explanation": "合同负债减少记借方。履约完成结转合同负债至收入。"
      },
      {
        "subjectCode": "100201",
        "summary": "银行存款减少",
        "debit": 0,
        "credit": 53000,
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
    "description": "收到客户款项53,000元，已存入银行账户。"
  },
  {
    "date": "2026-07-23",
    "role": "accountant",
    "title": "咨询项目差旅费报销",
    "tags": [
      "项目核算"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "520101",
        "summary": "项目成本增加",
        "debit": 3800,
        "credit": 0,
        "explanation": "合同履约成本增加记借方。项目成本归集。"
      },
      {
        "subjectCode": "4103",
        "summary": "贷方金额",
        "debit": 0,
        "credit": 3800,
        "explanation": "本年利润增加记贷方。结转收入至本年利润。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "记录"
      }
    ],
    "description": "咨询项目差旅费报销，涉及金额3,800元。"
  },
  {
    "date": "2026-07-26",
    "role": "accountant",
    "title": "购买转账支票",
    "tags": ["出纳"],
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
    "date": "2026-07-31",
    "role": "accountant",
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
    date: "2026-07-31",
    "role": "accountant",
    title: "模拟纳税申报",
    tags: ["期末", "税费"],
    difficulty: 1,
    description: "根据本月已完成的账务处理，进行模拟纳税申报。系统已自动计算应缴税额（增值税和企业所得税），请前往纳税申报页面核对并提交。",
    tip: "纳税申报是企业每月的法定义务。确认所有凭证已过账、期末结转已完成后，前往纳税申报页面核对各项税额后点击「提交申报」。",
    entries: [],
    documents: [
      { type: "text", label: "纳税申报提醒", docTitle: "7月纳税申报提醒", content: "申报期间：2026-07-31\n\n请前往纳税申报页面：\n1. 核对增值税申报表数据\n2. 核对企业所得税申报表数据\n3. 确认无误后点击「提交申报」\n\n纳税申报是企业每月必做的合规义务，请按时完成。", stampText: "财务专用章" }]},
]

export default tasks
