/**
 * 服务业 5月 — 多项目并行 + 坏账准备 + 其他业务收入
 */

const tasks = [
  {
    "date": "2026-05-04",
    "title": "缴纳4月增值税及附加税",
    "tags": [
      "税费",
      "资金管理"
    ],
    "difficulty": 2,
    "entries": [
        { subjectCode: '222101', summary: '缴增值税', debit: 7200, credit: 0, explanation: '应交增值税减少记借方。缴纳增值税冲销负债。' },
      { subjectCode: '222103', summary: '缴城建税', debit: 504, credit: 0, explanation: '应交城建税减少记借方。缴纳城建税冲销负债。' },
        { subjectCode: '222104', summary: '缴教育费附加', debit: 216, credit: 0, explanation: '应交教育费附加减少记借方。缴纳教育费附加冲销负债。' },
      { subjectCode: '100201', summary: '缴税', debit: 0, credit: 7920, explanation: '银行存款减少记贷方。缴纳税款支付。' },
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
    "tags": [
      "工资社保",
      "资金管理"
    ],
    "difficulty": 1,
    "entries": [
        { subjectCode: '221102', summary: '缴社保', debit: 28750, credit: 0, explanation: '应付职工薪酬-社保减少记借方。缴纳社保冲销负债。' },
      { subjectCode: '100201', summary: '缴社保', debit: 0, credit: 28750, explanation: '银行存款减少记贷方。缴纳社保费支付。' },
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
        { subjectCode: '221101', summary: '发工资', debit: 115000, credit: 0, explanation: '应付职工薪酬减少记借方。发放工资冲销负债。' },
      { subjectCode: '100201', summary: '实发', debit: 0, credit: 111550, explanation: '银行存款减少记贷方。实发工资转账支付。' },
        { subjectCode: '222102', summary: '个税', debit: 0, credit: 3450, explanation: '应交个人所得税增加记贷方。代扣个税形成应交义务。' },
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
        { subjectCode: '100201', summary: '定金', debit: 159000, credit: 0, explanation: '银行存款增加记借方。收到客户定金。' },
      { subjectCode: '2205', summary: '合同负债', debit: 0, credit: 150000, explanation: '合同负债增加记贷方。预收款形成合同负债。' },
        { subjectCode: '222101', summary: '增值税', debit: 0, credit: 9000, explanation: '应交增值税增加记贷方。确认收入产生增值税纳税义务。' },
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
    "tags": [
      "往来管理",
      "资金管理"
    ],
    "difficulty": 2,
    "description": "戊客户按合同支付中期款150,000元（不含税），增值税9,000元，合计159,000元已到账。",
    "entries": [
        { subjectCode: '100201', summary: '中期款', debit: 159000, credit: 0, explanation: '银行存款增加记借方。收到项目中期付款。' },
      { subjectCode: '6001', summary: '咨询收入', debit: 0, credit: 150000, explanation: '主营业务收入增加记贷方。咨询项目完成确认收入。' },
        { subjectCode: '222101', summary: '增值税', debit: 0, credit: 9000, explanation: '应交增值税增加记贷方。确认收入产生增值税纳税义务。' },
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
        { subjectCode: '660206', summary: '摊销房租', debit: 20000, credit: 0, explanation: '管理费用-摊销费增加记借方。摊销办公室租金。' },
      { subjectCode: '660206', summary: '房租摊销', debit: 0, credit: 20000, explanation: '预付账款减少记贷方。摊销预付房租。' },
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
        { subjectCode: '520101', summary: '项目上半月工资', debit: 38000, credit: 0, explanation: '合同履约成本-人工增加记借方。项目人员上半月工资计提。' },
      { subjectCode: '221101', summary: '应付薪酬', debit: 0, credit: 38000, explanation: '应付职工薪酬增加记贷方。计提工资负债增加。' },
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
        { subjectCode: '660203', summary: '管理上半月工资', debit: 22500, credit: 0, explanation: '管理费用-工资薪金增加记借方。管理人员上半月工资计提。' },
      { subjectCode: '221101', summary: '应付薪酬', debit: 0, credit: 22500, explanation: '应付职工薪酬增加记贷方。计提工资负债增加。' },
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
        { subjectCode: '660201', summary: '水电费', debit: 5800, credit: 0, explanation: '管理费用-办公费增加记借方。水电费计入管理费用。' },
      { subjectCode: '100201', summary: '付款', debit: 0, credit: 5800, explanation: '银行存款减少记贷方。支付款项。' },
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
        { subjectCode: '6701', summary: '计提坏账准备', debit: 6000, credit: 0, explanation: '资产减值损失增加记借方。计提坏账准备。' },
      { subjectCode: '6701', summary: '坏账准备', debit: 0, credit: 6000, explanation: '坏账准备增加记贷方。计提坏账准备。' },
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
        { subjectCode: '2205', summary: '合同负债转收入', debit: 150000, credit: 0, explanation: '合同负债减少记借方。履约完成结转至收入。' },
      { subjectCode: '6001', summary: '确认收入', debit: 0, credit: 150000, explanation: '主营业务收入增加记贷方。项目完成确认收入。' },
    ],
    "documents": [
      {
        "type": "text",
        "label": "阶段验收单",
        "content": "IT咨询第一阶段完成验收。"
      }
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
        { subjectCode: '660204', summary: '招待费', debit: 3500, credit: 0, explanation: '管理费用-业务招待费增加记借方。招待费用计入管理费。' },
      { subjectCode: '1001', summary: '现金支付', debit: 0, credit: 3500, explanation: '库存现金减少记贷方。现金支付款项。' },
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
        { subjectCode: '100201', summary: '废旧物资出售', debit: 2000, credit: 0, explanation: '银行存款增加记借方。废旧物资出售收款。' },
      { subjectCode: '6051', summary: '其他业务收入', debit: 0, credit: 2000, explanation: '其他业务收入增加记贷方。非主营收入确认。' },
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
        { subjectCode: '520101', summary: '项目下半月工资', debit: 38000, credit: 0, explanation: '合同履约成本-人工增加记借方。项目人员下半月工资计提。' },
      { subjectCode: '221101', summary: '应付薪酬', debit: 0, credit: 38000, explanation: '应付职工薪酬增加记贷方。计提工资负债增加。' },
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
        { subjectCode: '660203', summary: '管理下半月工资', debit: 22500, credit: 0, explanation: '管理费用-工资薪金增加记借方。管理人员下半月工资计提。' },
      { subjectCode: '221101', summary: '应付薪酬', debit: 0, credit: 22500, explanation: '应付职工薪酬增加记贷方。计提工资负债增加。' },
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
        { subjectCode: '520101', summary: '项目社保', debit: 19000, credit: 0, explanation: '合同履约成本-人工增加记借方。项目人员社保计入项目成本。' },
      { subjectCode: '660203', summary: '管理社保', debit: 11250, credit: 0, explanation: '管理费用-工资薪金增加记借方。管理人员单位社保计入管理费。' },
        { subjectCode: '221102', summary: '社保费用', debit: 0, credit: 30250, explanation: '应付职工薪酬-社保增加记贷方。计提社保费用。' },
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
        { subjectCode: '660205', summary: '折旧', debit: 4085, credit: 0, explanation: '管理费用-折旧费增加记借方。折旧费用计入管理费。' },
      { subjectCode: '1602', summary: '累计折旧', debit: 0, credit: 4085, explanation: '累计折旧增加记贷方。计提固定资产折旧。' },
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
        { subjectCode: '660206', summary: '摊销', debit: 2555.55, credit: 0, explanation: '管理费用-摊销费增加记借方。摊销费用计入管理费用。' },
      { subjectCode: '1702', summary: '累计摊销', debit: 0, credit: 2555.55, explanation: '累计摊销增加记贷方。计提无形资产摊销。' },
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
        { subjectCode: '660206', summary: '最后一次房租摊销', debit: 20000, credit: 0, explanation: '管理费用-摊销费增加记借方。最后一次摊销房租。' },
      { subjectCode: '1123', summary: '预付账款清零', debit: 0, credit: 20000, explanation: '预付账款减少记贷方。预付房租摊销完毕清零。' },
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
        { subjectCode: '222103', summary: '城建税', debit: 1260, credit: 0, explanation: '应交城建税增加记借方。计提城建税。' },
      { subjectCode: '222104', summary: '教育费附加', debit: 540, credit: 0, explanation: '应交教育费附加增加记借方。计提教育费附加。' },
        { subjectCode: '222103', summary: '城建税', debit: 0, credit: 1260, explanation: '应交城建税增加记贷方。按增值税计提城建税。' },
      { subjectCode: '222104', summary: '教育费附加', debit: 0, credit: 540, explanation: '应交教育费附加增加记贷方。按增值税计提教育费附加。' },
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
        { subjectCode: '6051', summary: '结转其他业务收入', debit: 2000, credit: 0, explanation: '其他业务收入减少记借方。期末结转至本年利润。' },
      { subjectCode: '6001', summary: '结转主营业务收入', debit: 150000, credit: 0, explanation: '主营业务收入减少记借方。期末结转至本年利润。' },
      { subjectCode: '4103', summary: '收入转入', debit: 0, credit: 152000, explanation: '本年利润增加记贷方。收入结转至本年利润。' },
      { subjectCode: '4103', summary: '费用转入', debit: 109800, credit: 0, explanation: '本年利润减少记借方。费用结转至本年利润。' },
        { subjectCode: '6403', summary: '税金', debit: 0, credit: 1800, explanation: '税金及附加减少记贷方。期末结转至本年利润。' },
      { subjectCode: '660201', summary: '管理费用', debit: 0, credit: 102000, explanation: '管理费用减少记贷方。期末结转至本年利润。' },
      { subjectCode: '6701', summary: '资产减值损失', debit: 0, credit: 6000, explanation: '资产减值损失减少记贷方。期末结转至本年利润。' },
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
        { subjectCode: '222110', summary: '税', debit: 7200, credit: 0, explanation: '未交增值税减少记借方。缴纳税款冲销负债。' },
      { subjectCode: '222110', summary: '税', debit: 0, credit: 7200, explanation: '未交增值税增加记贷方。计提应交增值税。' },
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
        { subjectCode: '221102', summary: '社保', debit: 28750, credit: 0, explanation: '应付职工薪酬-社保减少记借方。缴纳社保冲销负债。' },
      { subjectCode: '221102', summary: '社保', debit: 0, credit: 28750, explanation: '应付职工薪酬-社保增加记贷方。计提社保负债增加。' },
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
        { subjectCode: '660203', summary: '工资', debit: 115000, credit: 0, explanation: '管理费用-工资薪金增加记借方。管理人员工资计入管理费。' },
      { subjectCode: '100201', summary: '实发', debit: 0, credit: 111550, explanation: '银行存款减少记贷方。实发工资转账支付。' },
        { subjectCode: '222102', summary: '个税', debit: 0, credit: 3450, explanation: '应交个人所得税增加记贷方。代扣个税形成应交义务。' },
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
    "tags": [
      "出纳",
      "资金管理"
    ],
    "difficulty": 1,
    "role": "cashier",
    "entries": [
        { subjectCode: '100201', summary: '定金', debit: 159000, credit: 0, explanation: '银行存款增加记借方。收到客户定金。' },
      { subjectCode: '2205', summary: '合同负债', debit: 0, credit: 159000, explanation: '合同负债增加记贷方。预收款形成合同负债。' },
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
    "tags": [
      "出纳",
      "资金管理"
    ],
    "difficulty": 1,
    "role": "cashier",
    "entries": [
        { subjectCode: '100201', summary: '收款', debit: 159000, credit: 0, explanation: '银行存款增加记借方。收到款项入账。' },
      { subjectCode: '6001', summary: '收入', debit: 0, credit: 159000, explanation: '主营业务收入增加记贷方。项目收入确认入账。' },
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
    "tags": [
      "出纳",
      "资金管理"
    ],
    "difficulty": 1,
    "role": "cashier",
    "entries": [
        { subjectCode: '100201', summary: '收款', debit: 2000, credit: 0, explanation: '银行存款增加记借方。收到款项入账。' },
      { subjectCode: '6001', summary: '收入', debit: 0, credit: 2000, explanation: '主营业务收入增加记贷方。项目收入确认入账。' },
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
      "出纳",
      "期末"
    ],
    "difficulty": 1,
    "role": "cashier",
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
      "出纳",
      "期末"
    ],
    "difficulty": 1,
    "role": "cashier",
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
      "出纳",
      "期末"
    ],
    "difficulty": 1,
    "role": "cashier",
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
    "date": "2026-05-09",
    "title": "摊销5月办公室租金",
    "tags": [
      "费用管理"
    ],
    "difficulty": 1,
    "entries": [
        { subjectCode: '660201', summary: '管理费用', debit: 20000, credit: 0, explanation: '管理费用-办公费增加记借方。办公费用计入管理费。' },
      { subjectCode: '4103', summary: '贷方金额', debit: 0, credit: 20000, explanation: '本年利润增加记贷方。结转收入至本年利润。' },
    ],
    "documents": [
      {
        "type": "text",
        "label": "记录"
      }
    ],
    "description": "摊销5月办公室租金，涉及金额20,000元。"
  },
  {
    "date": "2026-05-12",
    "title": "微信收款-咨询费",
    "tags": [
      "资金管理"
    ],
    "difficulty": 1,
    "role": "cashier",
    "entries": [
        { subjectCode: '101204', summary: '微信收款', debit: 8480, credit: 0, explanation: '其他货币资金-微信增加记借方。微信收款入账。' },
      { subjectCode: '6001', summary: '确认收入', debit: 0, credit: 8000, explanation: '主营业务收入增加记贷方。项目完成确认收入。' },
        { subjectCode: '222101', summary: '计提增值税', debit: 0, credit: 480, explanation: '应交增值税增加记贷方。产生增值税纳税义务。' },
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
    "role": "cashier",
    "entries": [
        { subjectCode: '520101', summary: '项目成本增加', debit: 12000, credit: 0, explanation: '合同履约成本增加记借方。项目成本归集。' },
      { subjectCode: '101205', summary: '支付宝付款', debit: 0, credit: 12000, explanation: '其他货币资金-支付宝减少记贷方。支付宝支付款项。' },
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
    "tags": [
      "资金管理"
    ],
    "difficulty": 1,
    "role": "cashier",
    "entries": [
        { subjectCode: '100201', summary: '银行存款增加', debit: 80000, credit: 0, explanation: '银行存款增加记借方。款项存入银行。' },
      { subjectCode: '100201', summary: '银行存款减少', debit: 0, credit: 80000, explanation: '银行存款减少记贷方。银行款项支出。' },
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
    "role": "cashier",
    "entries": [
        { subjectCode: '660201', summary: '管理费用', debit: 680, credit: 0, explanation: '管理费用-办公费增加记借方。办公费用计入管理费。' },
      { subjectCode: '1001', summary: '现金减少', debit: 0, credit: 680, explanation: '库存现金减少记贷方。现金支付款项。' },
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
    "role": "cashier",
    "entries": [
        { subjectCode: '6603', summary: '财务费用', debit: 300, credit: 0, explanation: '财务费用增加记借方。利息支出计入财务费用。' },
      { subjectCode: '100201', summary: '银行存款减少', debit: 0, credit: 300, explanation: '银行存款减少记贷方。银行款项支出。' },
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
    "tags": [
      "资金管理"
    ],
    "difficulty": 1,
    "role": "cashier",
    "entries": [
        { subjectCode: '1001', summary: '现金增加', debit: 10000, credit: 0, explanation: '库存现金增加记借方。现金收款入账。' },
      { subjectCode: '100201', summary: '银行存款减少', debit: 0, credit: 10000, explanation: '银行存款减少记贷方。银行款项支出。' },
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
    "role": "cashier",
    "entries": [
        { subjectCode: '660201', summary: '管理费用', debit: 3500, credit: 0, explanation: '管理费用-办公费增加记借方。办公费用计入管理费。' },
      { subjectCode: '1001', summary: '现金减少', debit: 0, credit: 3500, explanation: '库存现金减少记贷方。现金支付款项。' },
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
    "date": "2026-05-22",
    "title": "银行手续费确认",
    "tags": [
      "费用管理"
    ],
    "difficulty": 1,
    "role": "cashier",
    "entries": [
        { subjectCode: '6603', summary: '财务费用', debit: 150, credit: 0, explanation: '财务费用增加记借方。利息支出计入财务费用。' },
      { subjectCode: '100201', summary: '银行存款减少', debit: 0, credit: 150, explanation: '银行存款减少记贷方。银行款项支出。' },
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
    "date": "2026-05-23",
    "title": "购买转账支票",
    "tags": [
      "出纳"
    ],
    "difficulty": 1,
    "role": "cashier",
    "entries": [
        { subjectCode: '660201', summary: '管理费用', debit: 150, credit: 0, explanation: '管理费用-办公费增加记借方。办公费用计入管理费。' },
      { subjectCode: '1001', summary: '现金减少', debit: 0, credit: 150, explanation: '库存现金减少记贷方。现金支付款项。' },
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
    "tags": [
      "出纳"
    ],
    "difficulty": 1,
    "role": "cashier",
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
    "tags": [
      "出纳"
    ],
    "difficulty": 1,
    "role": "cashier",
    "entries": [],
    "documents": [
      {
        "type": "text",
        "label": "记录"
      }
    ],
    "description": "银行存款余额调节。"
  }
];

export default tasks;
