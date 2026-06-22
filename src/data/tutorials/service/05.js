/**
 * 服务业 05月
 */

const tasks = [
  {
    "date": "2026-05-04",
    "title": "缴纳4月增值税及附加税",
    "tags": ["税费"],
    "difficulty": 2,
    "entries": [
      {
        "subjectCode": "222101",
        "summary": "缴增值税",
        "debit": 7200,
        "credit": 0,
        "explanation": "应交增值税减少记借方。缴纳增值税冲销负债。"
      },
      {
        "subjectCode": "222103",
        "summary": "缴城建税",
        "debit": 504,
        "credit": 0,
        "explanation": "应交城建税减少记借方。缴纳城建税冲销负债。"
      },
      {
        "subjectCode": "222104",
        "summary": "缴教育费附加",
        "debit": 216,
        "credit": 0,
        "explanation": "应交教育费附加减少记借方。缴纳教育费附加冲销负债。"
      },
      {
        "subjectCode": "100201",
        "summary": "缴税",
        "debit": 0,
        "credit": 7920,
        "explanation": "银行存款减少记贷方。缴纳税款支付。",
        "cashFlowItem": "cf-op4",
        "cashFlowExplanation": "缴纳税费支出（配对科目222101），属于\"支付的各项税费\"——经营活动现金流出。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "付款回单",
        "totalAmount": 7920,
        "content": "纳税"
      }
    ],
    "description": "通过银行转账缴纳各项税款合计7,920元。"
  },
  {
    "date": "2026-05-05",
    "title": "缴纳4月社保费",
    "tags": ["工资社保"],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "221102",
        "summary": "缴社保",
        "debit": 28750,
        "credit": 0,
        "explanation": "应付职工薪酬-社保减少记借方。缴纳社保冲销负债。"
      },
      {
        "subjectCode": "100201",
        "summary": "缴社保",
        "debit": 0,
        "credit": 28750,
        "explanation": "银行存款减少记贷方。缴纳社保费支付。",
        "cashFlowItem": "cf-op3",
        "cashFlowExplanation": "支付职工薪酬相关支出（配对科目221102），属于\"支付给职工以及为职工支付的现金\"——经营活动现金流出。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "付款回单",
        "totalAmount": 28750,
        "content": "社保"
      }
    ],
    "description": "通过银行转账缴纳社保费用合计28,750元。"
  },
  {
    "date": "2026-05-06",
    "title": "发放4月工资",
    "tags": [
      "人工成本",
      "工资社保"
    ],
    "difficulty": 3,
    "entries": [
      {
        "subjectCode": "221101",
        "summary": "发工资",
        "debit": 115000,
        "credit": 0,
        "explanation": "应付职工薪酬减少记借方。发放工资冲销负债。"
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
        "label": "付款回单",
        "totalAmount": 111550,
        "content": "4月工资"
      }
    ],
    "description": "通过银行转账缴纳各项税款合计115,000元。"
  },
  {
    "date": "2026-05-07",
    "title": "签订新IT咨询大合同",
    "tags": [
      "收入确认",
      "往来管理"
    ],
    "difficulty": 2,
    "description": "与戊客户签订IT战略咨询合同500,000元（不含税），增值税6%，预收30%定金159,000元（含税）。",
    "entries": [
      {
        "subjectCode": "100201",
        "summary": "定金",
        "debit": 159000,
        "credit": 0,
        "explanation": "银行存款增加记借方。收到客户定金。",
        "cashFlowItem": "cf-op5",
        "cashFlowExplanation": "其他经营活动现金流入（配对科目2205），属于\"收到其他与经营活动有关的现金\"。"
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
        "label": "银行回单",
        "totalAmount": 159000,
        "content": "IT咨询定金"
      }
    ]
  },
  {
    "date": "2026-05-08",
    "title": "收到应收账款（戊客户中期款）",
    "tags": ["往来管理"],
    "difficulty": 2,
    "description": "戊客户按合同支付中期款150,000元（不含税），增值税9,000元，合计159,000元已到账。",
    "entries": [
      {
        "subjectCode": "100201",
        "summary": "中期款",
        "debit": 159000,
        "credit": 0,
        "explanation": "银行存款增加记借方。收到项目中期付款。",
        "cashFlowItem": "cf-op",
        "cashFlowExplanation": "销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入——主营业务产生的现金收入。"
      },
      {
        "subjectCode": "6001",
        "summary": "咨询收入",
        "debit": 0,
        "credit": 150000,
        "explanation": "主营业务收入增加记贷方。咨询项目完成确认收入。"
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
        "label": "银行回单",
        "totalAmount": 159000,
        "content": "IT咨询中期款"
      }
    ]
  },
  {
    "date": "2026-05-09",
    "title": "摊销5月办公室租金",
    "tags": [
      "费用管理"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "660206",
        "summary": "摊销本月办公室租金",
        "debit": 20000,
        "credit": 0,
        "explanation": "管理费用-摊销费增加记借方。摊销办公室租金。"
      },
      {
        "subjectCode": "1123",
        "summary": "摊销本月办公室租金",
        "debit": 0,
        "credit": 20000,
        "explanation": "预付账款减少记贷方。当月摊销额冲减预付账款（原预付半年租金120,000元，第5次摊销）。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "摊销表",
        "content": "办公室第5次摊销，剩余20,000元。"
      }
    ],
    "description": "摊销5月办公室租金，涉及金额20,000元。"
  },
  {
    "date": "2026-05-10",
    "title": "计提5月上半月项目工资",
    "tags": [
      "项目核算",
      "人工成本"
    ],
    "difficulty": 2,
    "entries": [
      {
        "subjectCode": "520101",
        "summary": "项目上半月工资",
        "debit": 38000,
        "credit": 0,
        "explanation": "合同履约成本-人工增加记借方。项目人员上半月工资计提。"
      },
      {
        "subjectCode": "221101",
        "summary": "应付薪酬",
        "debit": 0,
        "credit": 38000,
        "explanation": "应付职工薪酬增加记贷方。计提工资负债增加。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "工资计提表",
        "content": "项目上半月38,000元。"
      }
    ],
    "description": "通过银行代发工资合计38,000元。"
  },
  {
    "date": "2026-05-11",
    "title": "计提5月上半月管理工资",
    "tags": [
      "人工成本",
      "工资社保"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "660203",
        "summary": "管理上半月工资",
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
        "label": "工资计提表",
        "content": "管理上半月22,500元。"
      }
    ],
    "description": "通过银行代发工资合计22,500元。"
  },
  {
    "date": "2026-05-12",
    "title": "支付5月水电费",
    "tags": [
      "费用管理"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "660201",
        "summary": "水电费",
        "debit": 5800,
        "credit": 0,
        "explanation": "管理费用-办公费增加记借方。水电费计入管理费用。"
      },
      {
        "subjectCode": "100201",
        "summary": "付款",
        "debit": 0,
        "credit": 5800,
        "explanation": "银行存款减少记贷方。支付款项。",
        "cashFlowItem": "cf-op6",
        "cashFlowExplanation": "其他经营活动现金支出（配对科目660201），属于\"支付其他与经营活动有关的现金\"。"
      }
    ],
    "documents": [
      {
        "type": "receipt",
        "label": "水电账单",
        "totalAmount": 5800
      }
    ],
    "description": "支付5月水电费，涉及金额5,800元。"
  },
  {
    "date": "2026-05-13",
    "title": "计提坏账准备",
    "tags": [
      "往来管理"
    ],
    "difficulty": 3,
    "description": "按应收账款余额的5%计提坏账准备。应收账款余额约120,000元，坏账准备=120,000×5%=6,000元。",
    "entries": [
      {
        "subjectCode": "6701",
        "summary": "计提坏账准备",
        "debit": 6000,
        "credit": 0,
        "explanation": "资产减值损失增加记借方。计提坏账准备。"
      },
      {
        "subjectCode": "6701",
        "summary": "坏账准备",
        "debit": 0,
        "credit": 6000,
        "explanation": "坏账准备增加记贷方。计提坏账准备。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "坏账计提表",
        "content": "应收账款余额120,000×5%=6,000元。"
      }
    ]
  },
  {
    "date": "2026-05-14",
    "title": "戊客户IT咨询项目第一阶段完成",
    "tags": [
      "收入确认",
      "项目核算"
    ],
    "difficulty": 3,
    "description": "戊客户IT咨询完成第一阶段（总额的40%），确认收入200,000元。",
    "entries": [
      {
        "subjectCode": "2205",
        "summary": "合同负债转收入",
        "debit": 150000,
        "credit": 0,
        "explanation": "合同负债减少记借方。履约完成结转至收入。"
      },
      {
        "subjectCode": "6001",
        "summary": "确认收入",
        "debit": 0,
        "credit": 150000,
        "explanation": "主营业务收入增加记贷方。项目完成确认收入。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "阶段验收单",
        "content": "IT咨询第一阶段完成验收。"
      }
    ]
  },

  // ═══════════════════════════════════════════
  // 第三周：完工百分比法深化（5月15日~5月17日）
  // ═══════════════════════════════════════════
  {
    "date": "2026-05-15",
    "title": "投入法计算甲项目完工进度",
    "tags": ["项目核算", "收入确认"],
    "difficulty": 2,
    "description": "甲客户ERP咨询项目，合同总价400,000元，预算总成本220,000元。累计已发生劳务成本114,400元（人工72,000+差旅22,400+外包20,000）。采用投入法（实际成本比例）计算完工进度：114,400÷220,000=52%。投入法反映企业实际履约投入，适合服务型项目。",
    "tip": "投入法按已发生成本占预计总成本的比例确定完工进度：完工进度=已发生成本÷预计总成本。与产出法（按里程碑/产出物）不同，投入法更适用于服务型企业，能更及时地反映履约进度。",
    "entries": [],
    "documents": [
      { "type": "text", "label": "项目成本台账", "docTitle": "甲客户ERP咨询项目成本汇总表（截至5月15日）", "content": "累计人工成本72,000元+差旅费22,400元+外包服务费20,000元=114,400元。预算总成本220,000元。完工进度=114,400÷220,000=52%。已按合同总价400,000×52%=208,000元应确认累计收入。" }
    ]
  },
  {
    "date": "2026-05-16",
    "title": "按完工百分比确认项目收入",
    "tags": ["收入确认", "项目核算"],
    "difficulty": 3,
    "description": "甲项目完工进度52%，按比例确认收入。应确认累计收入400,000×52%=208,000元。此前已确认160,000元（定金20%即80,000+第一阶段20%即80,000），本期补确认48,000元。增值税6%=2,880元，已收款到账。",
    "tip": "时段法确认收入。按投入法完工进度确认收入：当期收入=(合同总收入×完工进度)-已确认收入。本期收到客户进度款，借：银行存款，贷：主营业务收入、应交税费。预收定金此前已记入合同负债，在确认收入时同步结转。",
    "entries": [
      { "subjectCode": "100201", "summary": "收取进度款", "debit": 50880, "credit": 0, "explanation": "银行存款增加记借方。本期应补收入48,000+增值税2,880=50,880元已到账。", "cashFlowItem": "cf-op", "cashFlowExplanation": "销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入。" },
      { "subjectCode": "6001", "summary": "确认收入", "debit": 0, "credit": 48000, "explanation": "主营业务收入增加记贷方。按完工进度确认当期收入。" },
      { "subjectCode": "222101", "summary": "增值税-销项税额", "debit": 0, "credit": 2880, "explanation": "应交增值税-销项税额增加记贷方。收入对应的销项税额。" }
    ],
    "documents": [
      { "type": "invoice", "label": "增值税发票", "region": "北京市", "invoiceNo": "1100789012", "date": "2026-05-16", "buyer": "甲客户", "seller": "雲帆管理咨询有限公司", "lineItems": [{ "name": "ERP咨询项目进度款（52%阶段）", "qty": 1, "price": 48000, "amount": 48000 }], "totalAmount": 48000 }
    ]
  },
  {
    "date": "2026-05-17",
    "title": "确认丁项目合同预计损失",
    "tags": ["项目核算", "收入确认"],
    "difficulty": 3,
    "description": "丁客户管理咨询项目，合同总价180,000元。已发生劳务成本156,000元，预计还需40,000元才能完成，预计总成本196,000元超合同收入。按新收入准则，亏损合同应确认预计损失16,000元。",
    "tip": "当预计总成本超过合同总收入时形成亏损合同。预计损失=预计总成本-合同总收入。借：资产减值损失，贷：预计负债——体现新收入准则的谨慎性原则，损失必须在可预见时立即确认。",
    "entries": [
      { "subjectCode": "6701", "summary": "确认合同预计损失", "debit": 16000, "credit": 0, "explanation": "资产减值损失增加记借方。亏损合同确认预计损失。当预计总成本超过合同总收入时，超出部分应立即确认为损失。" },
      { "subjectCode": "2801", "summary": "预计负债-亏损合同", "debit": 0, "credit": 16000, "explanation": "预计负债增加记贷方。因亏损合同确认的预计负债，项目完成或合同终止时冲销。" }
    ],
    "documents": [
      { "type": "text", "label": "合同预计损失计算表", "docTitle": "丁项目预计损失计算", "content": "合同总收入180,000元。已发生劳务成本156,000元，预计还需40,000元，预计总成本196,000元。预计损失=196,000-180,000=16,000元。", "signature": "财务部" }
    ]
  },
  {
    "date": "2026-05-15",
    "title": "发生业务招待费（大额）",
    "tags": [
      "费用管理"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "660204",
        "summary": "招待费",
        "debit": 3500,
        "credit": 0,
        "explanation": "管理费用-业务招待费增加记借方。招待费用计入管理费。"
      },
      {
        "subjectCode": "1001",
        "summary": "现金支付",
        "debit": 0,
        "credit": 3500,
        "explanation": "库存现金减少记贷方。现金支付款项。",
        "cashFlowItem": "cf-op6",
        "cashFlowExplanation": "其他经营活动现金支出（配对科目660204），属于\"支付其他与经营活动有关的现金\"。"
      }
    ],
    "documents": [
      {
        "type": "invoice",
        "label": "餐饮发票",
        "totalAmount": 3500
      }
    ],
    "description": "以现金支付3,500元。"
  },
  {
    "date": "2026-05-16",
    "title": "其他业务收入：出售废旧电脑",
    "tags": [
      "费用管理"
    ],
    "difficulty": 2,
    "description": "出售报废旧电脑一台，取得收入2,000元，现金收款。",
    "entries": [
      {
        "subjectCode": "100201",
        "summary": "废旧物资出售",
        "debit": 2000,
        "credit": 0,
        "explanation": "银行存款增加记借方。废旧物资出售收款。",
        "cashFlowItem": "cf-op",
        "cashFlowExplanation": "销售商品/提供劳务收到的现金（配对科目6051），属于经营活动现金流入——主营业务产生的现金收入。"
      },
      {
        "subjectCode": "6051",
        "summary": "其他业务收入",
        "debit": 0,
        "credit": 2000,
        "explanation": "其他业务收入增加记贷方。非主营收入确认。"
      }
    ],
    "documents": [
      {
        "type": "receipt",
        "label": "收款收据",
        "totalAmount": 2000
      }
    ]
  },
  {
    "date": "2026-05-18",
    "title": "计提5月下半月项目工资",
    "tags": [
      "项目核算",
      "人工成本"
    ],
    "difficulty": 2,
    "entries": [
      {
        "subjectCode": "520101",
        "summary": "项目下半月工资",
        "debit": 38000,
        "credit": 0,
        "explanation": "合同履约成本-人工增加记借方。项目人员下半月工资计提。"
      },
      {
        "subjectCode": "221101",
        "summary": "应付薪酬",
        "debit": 0,
        "credit": 38000,
        "explanation": "应付职工薪酬增加记贷方。计提工资负债增加。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "工资计提表",
        "content": "项目下半月38,000元。"
      }
    ],
    "description": "通过银行代发工资合计38,000元。"
  },
  {
    "date": "2026-05-19",
    "title": "计提5月下半月管理工资",
    "tags": [
      "人工成本",
      "工资社保"
    ],
    "difficulty": 1,
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
        "summary": "应付薪酬",
        "debit": 0,
        "credit": 22500,
        "explanation": "应付职工薪酬增加记贷方。计提工资负债增加。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "工资计提表",
        "content": "管理下半月22,500元。"
      }
    ],
    "description": "通过银行代发工资合计22,500元。"
  },
  {
    "date": "2026-05-20",
    "title": "计提5月社保",
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
        "summary": "社保费用",
        "debit": 0,
        "credit": 30250,
        "explanation": "应付职工薪酬-社保增加记贷方。计提社保费用。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "社保计提表",
        "content": "项目76,000×25%=19,000+管理45,000×25%=11,250=30,250。"
      }
    ],
    "description": "通过银行转账缴纳社保费用合计30,250元。"
  },
  {
    "date": "2026-05-21",
    "title": "计提5月折旧",
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
    "description": "计提5月折旧，涉及金额4,085元。"
  },
  {
    "date": "2026-05-22",
    "title": "计提无形资产摊销",
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
    "description": "计提无形资产摊销，涉及金额2,555.55元。"
  },
  {
    "date": "2026-05-23",
    "title": "补提房租摊销（预付期满）",
    "tags": [
      "费用管理"
    ],
    "difficulty": 1,
    "description": "预付半年租金已摊销5次（至5月），本次为最后一次摊销20,000元，预付账款余额清零。",
    "entries": [
      {
        "subjectCode": "660206",
        "summary": "最后一次房租摊销",
        "debit": 20000,
        "credit": 0,
        "explanation": "管理费用-摊销费增加记借方。最后一次摊销房租。"
      },
      {
        "subjectCode": "1123",
        "summary": "预付账款清零",
        "debit": 0,
        "credit": 20000,
        "explanation": "预付账款减少记贷方。预付房租摊销完毕清零。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "费用摊销表",
        "content": "预付房租6个月全部摊销完毕。"
      }
    ]
  },
  {
    "date": "2026-05-24",
    "title": "计算5月增值税",
    "tags": [
      "税费",
      "期末"
    ],
    "difficulty": 2,
    "description": "销项税额：IT咨询定金9,000+中期9,000+其他业务等≈18,000元。进项税额约0元。应交=18,000元。",
    "entries": [
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
        "subjectCode": "222103",
        "summary": "城建税",
        "debit": 0,
        "credit": 1260,
        "explanation": "应交城建税增加记贷方。按增值税计提城建税。"
      },
      {
        "subjectCode": "222104",
        "summary": "教育费附加",
        "debit": 0,
        "credit": 540,
        "explanation": "应交教育费附加增加记贷方。按增值税计提教育费附加。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "增值税计算表",
        "content": "应交增值税18,000元，附加税1,800元。"
      }
    ]
  },
  {
    "date": "2026-05-26",
    "title": "期末结转损益",
    "description": "月末将收入类、费用类科目余额结转至本年利润科目，计算当月经营成果。",
    "tags": [
      "期末"
    ],
    "difficulty": 3,
    "entries": [
      { subjectCode: '6001', debit: 517000, credit: 0, summary: '结转主营业务收入', explanation: '主营业务收入减少记借方。期末结转至本年利润。' },
      { subjectCode: '6051', debit: 2000, credit: 0, summary: '结转其他业务收入', explanation: '其他业务收入减少记借方。期末结转至本年利润。' },
      { subjectCode: '660201', debit: 0, credit: 10130, summary: '管理费用', explanation: '管理费用减少记贷方。期末结转至本年利润。' },
      { subjectCode: '660203', debit: 0, credit: 56250, summary: '结转660203', explanation: '660203转出，余额归零。' },
      { subjectCode: '660204', debit: 0, credit: 3500, summary: '结转660204', explanation: '660204转出，余额归零。' },
      { subjectCode: '660205', debit: 0, credit: 4085, summary: '结转660205', explanation: '660205转出，余额归零。' },
      { subjectCode: '660206', debit: 0, credit: 42555.55, summary: '结转660206', explanation: '660206转出，余额归零。' },
      { subjectCode: '6603', debit: 0, credit: 300, summary: '结转6603', explanation: '6603转出，余额归零。' },
      { subjectCode: '6701', debit: 0, credit: 16000, summary: '资产减值损失', explanation: '资产减值损失减少记贷方。期末结转至本年利润。' },
      { subjectCode: '4103', debit: 0, credit: 386179.45, summary: '费用转入', explanation: '本年利润减少记借方。费用结转至本年利润。' }
    ],
    "documents": [
      {
        "type": "text",
        "label": "损益表",
        "content": "5月净亏损约38,800元。"
      }
    ]
  },
  {
    "date": "2026-05-04",
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
        "debit": 7200,
        "credit": 0,
        "explanation": "未交增值税减少记借方。缴纳税款冲销负债。"
      },
      {
        "subjectCode": "222110",
        "summary": "税",
        "debit": 0,
        "credit": 7200,
        "explanation": "未交增值税增加记贷方。计提应交增值税。"
      }
    ],
    "documents": [
      {
        "type": "bank",
        "label": "付款回单",
        "totalAmount": 7200
      }
    ],
    "description": "通过银行转账缴纳各项税款合计7,200元。"
  },
  {
    "date": "2026-05-05",
    "title": "社保转账",
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
        "label": "付款回单",
        "totalAmount": 28750
      }
    ],
    "description": "通过银行转账缴纳社保费用合计28,750元。"
  },
  {
    "date": "2026-05-06",
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
        "label": "付款回单",
        "totalAmount": 111550
      }
    ],
    "description": "通过银行转账缴纳各项税款合计115,000元。"
  },
  {
    "date": "2026-05-07",
    "title": "定金到账",
    "tags": ["出纳"],
    "difficulty": 1,
    "role": "cashier",
    "entries": [
      {
        "subjectCode": "100201",
        "summary": "定金",
        "debit": 159000,
        "credit": 0,
        "explanation": "银行存款增加记借方。收到客户定金。",
        "cashFlowItem": "cf-op5",
        "cashFlowExplanation": "其他经营活动现金流入（配对科目2205），属于\"收到其他与经营活动有关的现金\"。"
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
    "date": "2026-05-08",
    "title": "中期款到账",
    "tags": ["出纳"],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "100201",
        "summary": "收款",
        "debit": 159000,
        "credit": 0,
        "explanation": "银行存款增加记借方。收到款项入账。",
        "cashFlowItem": "cf-op",
        "cashFlowExplanation": "销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入——主营业务产生的现金收入。"
      },
      {
        "subjectCode": "6001",
        "summary": "收入",
        "debit": 0,
        "credit": 159000,
        "explanation": "主营业务收入增加记贷方。项目收入确认入账。"
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
    "date": "2026-05-16",
    "title": "废旧物资收款",
    "tags": ["出纳"],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "100201",
        "summary": "收款",
        "debit": 2000,
        "credit": 0,
        "explanation": "银行存款增加记借方。收到款项入账。",
        "cashFlowItem": "cf-op",
        "cashFlowExplanation": "销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入——主营业务产生的现金收入。"
      },
      {
        "subjectCode": "6001",
        "summary": "收入",
        "debit": 0,
        "credit": 2000,
        "explanation": "主营业务收入增加记贷方。项目收入确认入账。"
      }
    ],
    "documents": [
      {
        "type": "receipt",
        "label": "收据",
        "totalAmount": 2000
      }
    ],
    "description": "收到客户款项2,000元，已存入银行账户。"
  },
  {
    "date": "2026-05-27",
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
    "date": "2026-05-28",
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
    "date": "2026-05-30",
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
        "content": "5月票据归档完毕。"
      }
    ],
    "description": "将本月凭证整理装订成册，归档保存。"
  },
  {
    "date": "2026-05-12",
    "title": "微信收款-咨询费",
    "tags": ["出纳"],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "101204",
        "summary": "微信收款",
        "debit": 8480,
        "credit": 0,
        "explanation": "其他货币资金-微信增加记借方。微信收款入账。",
        "cashFlowItem": "cf-op",
        "cashFlowExplanation": "销售商品/提供劳务收到的现金（配对科目6001），属于经营活动现金流入——主营业务产生的现金收入。"
      },
      {
        "subjectCode": "6001",
        "summary": "确认收入",
        "debit": 0,
        "credit": 8000,
        "explanation": "主营业务收入增加记贷方。项目完成确认收入。"
      },
      {
        "subjectCode": "222101",
        "summary": "计提增值税",
        "debit": 0,
        "credit": 480,
        "explanation": "应交增值税增加记贷方。产生增值税纳税义务。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "记录"
      }
    ],
    "description": "通过银行转账缴纳各项税款合计8,480元。"
  },
  {
    "date": "2026-05-14",
    "title": "支付宝支付外包设计费",
    "tags": [
      "项目核算"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "520101",
        "summary": "项目成本增加",
        "debit": 12000,
        "credit": 0,
        "explanation": "合同履约成本增加记借方。项目成本归集。"
      },
      {
        "subjectCode": "101205",
        "summary": "支付宝付款",
        "debit": 0,
        "credit": 12000,
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
    "description": "支付宝支付外包设计费，涉及金额12,000元。"
  },
  {
    "date": "2026-05-15",
    "title": "银行账户间调拨",
    "tags": ["资金管理"],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "100201",
        "summary": "银行存款增加",
        "debit": 80000,
        "credit": 0,
        "explanation": "银行存款增加记借方。款项存入银行。"
      },
      {
        "subjectCode": "100201",
        "summary": "银行存款减少",
        "debit": 0,
        "credit": 80000,
        "explanation": "银行存款减少记贷方。银行款项支出。"
      }
    ],
    "documents": [
      {
        "type": "text",
        "label": "记录"
      }
    ],
    "description": "银行账户间调拨，涉及金额80,000元。"
  },
  {
    "date": "2026-05-18",
    "title": "现金支付快递及办公杂费",
    "tags": [
      "费用管理"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "660201",
        "summary": "管理费用",
        "debit": 680,
        "credit": 0,
        "explanation": "管理费用-办公费增加记借方。办公费用计入管理费。"
      },
      {
        "subjectCode": "1001",
        "summary": "现金减少",
        "debit": 0,
        "credit": 680,
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
    "description": "以现金支付680元。"
  },
  {
    "date": "2026-05-19",
    "title": "银行代扣账户管理费",
    "tags": [
      "费用管理"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "6603",
        "summary": "财务费用",
        "debit": 300,
        "credit": 0,
        "explanation": "财务费用增加记借方。利息支出计入财务费用。"
      },
      {
        "subjectCode": "100201",
        "summary": "银行存款减少",
        "debit": 0,
        "credit": 300,
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
    "description": "通过银行转账/代扣支付300元。"
  },
  {
    "date": "2026-05-20",
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
    "date": "2026-05-21",
    "title": "缴纳团建费用",
    "tags": [
      "费用管理"
    ],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "660201",
        "summary": "管理费用",
        "debit": 3500,
        "credit": 0,
        "explanation": "管理费用-办公费增加记借方。办公费用计入管理费。"
      },
      {
        "subjectCode": "1001",
        "summary": "现金减少",
        "debit": 0,
        "credit": 3500,
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
    "description": "以现金支付3,500元。"
  },
  {
    "date": "2026-05-23",
    "title": "购买转账支票",
    "tags": ["出纳"],
    "difficulty": 1,
    "entries": [
      {
        "subjectCode": "660201",
        "summary": "管理费用",
        "debit": 150,
        "credit": 0,
        "explanation": "管理费用-办公费增加记借方。办公费用计入管理费。"
      },
      {
        "subjectCode": "1001",
        "summary": "现金减少",
        "debit": 0,
        "credit": 150,
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
    "description": "通过银行转账/代扣支付150元。"
  },
  {
    "date": "2026-05-27",
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
    "date": "2026-05-28",
    "title": "银行存款余额调节",
    "tags": ["出纳"],
    "difficulty": 1,
    "entries": [],
    "documents": [
      {
        "type": "text",
        "label": "记录"
      }
    ],
    "description": "银行存款余额调节。"
  },
  {
    date: "2026-05-31",
    title: "模拟纳税申报",
    tags: ["期末", "税费"],
    difficulty: 1,
    description: "根据本月已完成的账务处理，进行模拟纳税申报。系统已自动计算应缴税额（增值税和企业所得税），请前往纳税申报页面核对并提交。",
    tip: "纳税申报是企业每月的法定义务。确认所有凭证已过账、期末结转已完成后，前往纳税申报页面核对各项税额后点击「提交申报」。",
    entries: [],
    documents: [
      { type: "text", label: "纳税申报提醒", docTitle: "5月纳税申报提醒", content: "申报期间：2026-05-31\n\n请前往纳税申报页面：\n1. 核对增值税申报表数据\n2. 核对企业所得税申报表数据\n3. 确认无误后点击「提交申报」\n\n纳税申报是企业每月必做的合规义务，请按时完成。", stampText: "财务专用章" }]},
]

export default tasks
