/**
 * 财务核心工具函数
 * 借贷记账法、试算平衡、报表计算等核心逻辑
 *
 * 会计准则依据：《企业会计准则——基本准则》（财政部令第76号）
 */

// ==================== 常量定义 ====================

/** 借贷方向 */
export const DEBIT = 'debit'
export const CREDIT = 'credit'

/** 科目类型 */
export const SUBJECT_TYPE = {
  ASSET: 'asset',
  LIABILITY: 'liability',
  EQUITY: 'equity',
  COST: 'cost',
  PROFIT_LOSS: 'profit_loss',
}

/** 凭证状态 */
export const VOUCHER_STATUS = {
  DRAFT: 'draft',
  SIGNED: 'signed',
  APPROVED: 'approved',
  POSTED: 'posted',
}

/** 科目类型 → 余额方向 */
export const BALANCE_DIRECTION = {
  [SUBJECT_TYPE.ASSET]: DEBIT,
  [SUBJECT_TYPE.LIABILITY]: CREDIT,
  [SUBJECT_TYPE.EQUITY]: CREDIT,
  [SUBJECT_TYPE.COST]: DEBIT,
  [SUBJECT_TYPE.PROFIT_LOSS]: null,
}

/** 科目默认编码前缀 */
export const SUBJECT_CODE_PREFIX = {
  [SUBJECT_TYPE.ASSET]: '1',
  [SUBJECT_TYPE.LIABILITY]: '2',
  [SUBJECT_TYPE.EQUITY]: '3',
  [SUBJECT_TYPE.COST]: '4',
  [SUBJECT_TYPE.PROFIT_LOSS]: '5',
}

/** 科目类型中文名 */
export const SUBJECT_TYPE_CN = {
  [SUBJECT_TYPE.ASSET]: '资产类',
  [SUBJECT_TYPE.LIABILITY]: '负债类',
  [SUBJECT_TYPE.EQUITY]: '所有者权益类',
  [SUBJECT_TYPE.COST]: '成本类',
  [SUBJECT_TYPE.PROFIT_LOSS]: '损益类',
}

/** 凭证状态中文名 */
export const VOUCHER_STATUS_CN = {
  [VOUCHER_STATUS.DRAFT]: '草稿',
  [VOUCHER_STATUS.SIGNED]: '已签字',
  [VOUCHER_STATUS.APPROVED]: '已审核',
  [VOUCHER_STATUS.POSTED]: '已过账',
}

// ==================== 辅助函数 ====================

/** 生成UUID */
export function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

/** 获取当前会计期间 YYYYMM（教学模式下跟随当前任务所在月份） */
export function getCurrentPeriod() {
  try {
    // 教学模式下：从当前任务日期提取月份
    if (localStorage.getItem('teaching_active') === 'true') {
      const raw = localStorage.getItem('tutorial_task')
      if (raw) {
        const task = JSON.parse(raw)
        if (task.date && task.date.length >= 7) {
          return task.date.substring(0, 7).replace('-', '')
        }
      }
    }
  } catch { /* fall through to real date */ }
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  return `${y}${m}`
}

/** 格式化日期为 YYYY-MM-DD（教学模式下跟随当前任务日期） */
export function todayStr() {
  try {
    if (localStorage.getItem('teaching_active') === 'true') {
      const raw = localStorage.getItem('tutorial_task')
      if (raw) {
        const task = JSON.parse(raw)
        if (task.date) return task.date
      }
    }
  } catch { /* fall through */ }
  return '2026-01-01'
}

// ==================== 借贷平衡校验 ====================

/**
 * 验证凭证借贷是否平衡
 * 核心恒等式：借方总额 = 贷方总额
 */
export function checkBalance(entries) {
  const debitTotal = entries.reduce((sum, e) => sum + (Number(e.debit) || 0), 0)
  const creditTotal = entries.reduce((sum, e) => sum + (Number(e.credit) || 0), 0)
  return {
    balanced: Math.abs(debitTotal - creditTotal) < 0.001,
    debitTotal: round(debitTotal),
    creditTotal: round(creditTotal),
    diff: round(debitTotal - creditTotal),
  }
}

/**
 * 验证单条分录
 */
export function validateEntry(entry) {
  const errors = []
  if (!entry.subjectCode || entry.subjectCode.trim() === '') {
    errors.push('科目编码不能为空')
  }
  const debit = Number(entry.debit) || 0
  const credit = Number(entry.credit) || 0
  if (debit === 0 && credit === 0) errors.push('借方和贷方金额不能同时为零')
  if (debit > 0 && credit > 0) errors.push('同一条分录不能同时有借方和贷方金额')
  return { valid: errors.length === 0, errors }
}

/**
 * 验证整个凭证
 */
export function validateVoucher(voucher) {
  const errors = []
  if (!voucher.date) errors.push('日期不能为空')
  if (!voucher.entries || voucher.entries.length === 0) errors.push('分录不能为空')
  if (voucher.entries && voucher.entries.length < 2) errors.push('至少需要两条分录（一借一贷）')

  let allValid = true
  for (const e of voucher.entries) {
    const result = validateEntry(e)
    if (!result.valid) {
      allValid = false
      errors.push(...result.errors)
    }
  }

  const balance = checkBalance(voucher.entries || [])
  if (!balance.balanced) {
    errors.push(`借贷不平衡：借方 ${balance.debitTotal} ≠ 贷方 ${balance.creditTotal}，差额 ${balance.diff}`)
  }

  return { valid: errors.length === 0 && allValid, errors }
}

// ==================== 科目工具 ====================

/**
 * 将科目列表转为树形结构
 */
export function buildSubjectTree(subjects) {
  const map = {}
  const tree = []

  // 先按 code 排序
  const sorted = [...subjects].sort((a, b) => a.code.localeCompare(b.code))

  for (const s of sorted) {
    map[s.id] = { ...s, children: [] }
  }

  for (const s of sorted) {
    if (s.parentId && map[s.parentId]) {
      map[s.parentId].children.push(map[s.id])
    } else {
      tree.push(map[s.id])
    }
  }

  return tree
}

/**
 * 获取科目的完整名称链（含上级）
 * 如 "1001" → "库存现金"
 * 如 "100201" → "银行存款-工商银行"
 */
export function getSubjectFullName(subjects, subjectId) {
  const parts = []
  let current = subjects.find(s => s.id === subjectId)
  while (current) {
    parts.unshift(current.name)
    current = current.parentId ? subjects.find(s => s.id === current.parentId) : null
  }
  return parts.join(' / ')
}

/**
 * 获取科目的完整编码链
 */
export function getSubjectFullCode(subjects, subjectId) {
  const parts = []
  let current = subjects.find(s => s.id === subjectId)
  while (current) {
    parts.unshift(current.code)
    current = current.parentId ? subjects.find(s => s.id === current.parentId) : null
  }
  return parts.join('')
}

/**
 * 判断科目是否为末级（无子科目）
 */
export function isLeafSubject(subjects, subjectId) {
  return !subjects.some(s => s.parentId === subjectId)
}

/**
 * 获取科目所有末级子科目ID（含自身如果是末级）
 */
export function getLeafSubjectIds(subjects, subjectId) {
  const children = subjects.filter(s => s.parentId === subjectId)
  if (children.length === 0) return [subjectId]
  return children.flatMap(c => getLeafSubjectIds(subjects, c.id))
}

/**
 * 根据父科目编码生成下一级编码
 */
export function generateChildCode(subjects, parentCode) {
  const siblings = subjects.filter(s => {
    const sParent = s.parentId ? subjects.find(p => p.id === s.parentId) : null
    return sParent && sParent.code === parentCode
  })
  const maxCode = siblings.reduce((max, s) => Math.max(max, Number(s.code.slice(-2))), 0)
  return parentCode + String(maxCode + 1).padStart(2, '0')
}

// ==================== 金额格式化 ====================

export function formatAmount(amount, showSign = false) {
  const num = Number(amount) || 0
  const formatted = Math.abs(num).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return showSign ? (num < 0 ? `-${formatted}` : formatted) : formatted
}

/** 金额四舍五入到两位小数 */
export function round(val) {
  return Math.round(Number(val) * 100) / 100
}

// ==================== 凭证号生成 ====================

export function generateVoucherNo(prefix = '记', seq, period) {
  const seqStr = String(seq).padStart(4, '0')
  return period ? `${prefix}-${period}-${seqStr}` : `${prefix}-${seqStr}`
}

// ==================== 过账逻辑 ====================

/**
 * 基于凭证分录更新科目期间余额
 * 过账核心逻辑：
 * 1. 找到每个分录对应的科目（末级）
 * 2. 更新该科目在当前期间的借方/贷方发生额
 * 3. 重新计算期末余额
 *
 * @param {Array} periodBalances - 期间余额列表
 * @param {Array} entries - 凭证分录列表
 * @param {string} period - 会计期间 YYYYMM
 * @param {string} action - 'post' | 'unpost'
 * @returns {Array} 更新后的期间余额列表
 */
export function updateBalancesAfterPost(periodBalances, entries, period, action = 'post') {
  const updated = [...periodBalances]
  const sign = action === 'post' ? 1 : -1

  for (const entry of entries) {
    const debit = round(Number(entry.debit) || 0)
    const credit = round(Number(entry.credit) || 0)
    if (debit === 0 && credit === 0) continue

    // 找对应科目的期间余额记录
    const existingIndex = updated.findIndex(
      pb => pb.subjectId === entry.subjectId && pb.period === period
    )

    if (existingIndex >= 0) {
      const pb = { ...updated[existingIndex] }
      pb.currentDebit = round(pb.currentDebit + debit * sign)
      pb.currentCredit = round(pb.currentCredit + credit * sign)
      // 重算期末余额
      const bal = recalcClosingBalance(pb)
      pb.closingDebit = bal.closingDebit
      pb.closingCredit = bal.closingCredit
      updated[existingIndex] = pb
    }
  }

  return updated
}

/**
 * 根据期初、本期发生额计算期末余额
 * 资产/成本类：期末借方 = 期初借方 + 本期借方 - 本期贷方
 * 负债/权益类：期末贷方 = 期初贷方 + 本期贷方 - 本期借方
 */
export function recalcClosingBalance(pb) {
  const direction = BALANCE_DIRECTION[pb.subjectType]
  const openingDebit = round(Number(pb.openingDebit) || 0)
  const openingCredit = round(Number(pb.openingCredit) || 0)
  const currentDebit = round(Number(pb.currentDebit) || 0)
  const currentCredit = round(Number(pb.currentCredit) || 0)

  let closingDebit = 0
  let closingCredit = 0

  if (direction === DEBIT) {
    const net = openingDebit + currentDebit - currentCredit
    closingDebit = net >= 0 ? round(net) : 0
    closingCredit = net < 0 ? round(Math.abs(net)) : 0
  } else {
    const net = openingCredit + currentCredit - currentDebit
    closingCredit = net >= 0 ? round(net) : 0
    closingDebit = net < 0 ? round(Math.abs(net)) : 0
  }

  return { closingDebit, closingCredit }
}

/**
 * 初始化科目期间余额（新会计期间）
 */
export function createPeriodBalance(subjectId, subjectType, period, prevPeriodBalances = []) {
  const prev = prevPeriodBalances.find(pb => pb.subjectId === subjectId)
  const direction = BALANCE_DIRECTION[subjectType]

  // 从上期期末结转到本期期初
  let openingDebit = 0
  let openingCredit = 0
  if (prev) {
    openingDebit = prev.closingDebit
    openingCredit = prev.closingCredit
  }

  return {
    id: genId(),
    subjectId,
    subjectType,
    period,
    openingDebit: round(openingDebit),
    openingCredit: round(openingCredit),
    currentDebit: 0,
    currentCredit: 0,
    closingDebit: round(direction === DEBIT ? openingDebit : 0),
    closingCredit: round(direction === CREDIT ? openingCredit : 0),
  }
}

// ==================== 报表计算 ====================

/**
 * 试算平衡表
 */
export function trialBalance(subjectBalances) {
  let totalDebit = 0
  let totalCredit = 0
  const details = []

  for (const sb of subjectBalances) {
    const rawAmount = Number(sb.balance) || 0
    const direction = BALANCE_DIRECTION[sb.subjectType]
    let debitAmount = 0
    let creditAmount = 0
    if (direction === DEBIT) {
      debitAmount = rawAmount >= 0 ? rawAmount : 0
      creditAmount = rawAmount < 0 ? Math.abs(rawAmount) : 0
    } else if (direction === CREDIT) {
      creditAmount = rawAmount >= 0 ? rawAmount : 0
      debitAmount = rawAmount < 0 ? Math.abs(rawAmount) : 0
    } else {
      // 损益类：费用类按借方、收入类按贷方
      // 根据科目编码判断：6xxx/63xx为收入(贷方余额)，64xx/66xx/67xx/68xx为费用(借方余额)
      const code = sb.subjectCode || ""
      const isExpense = code.startsWith("64") || code.startsWith("66") || code.startsWith("67") || code.startsWith("68")
      if (isExpense) {
        // 费用类：负余额=借方余额，正余额=贷方余额
        debitAmount = rawAmount < 0 ? Math.abs(rawAmount) : 0
        creditAmount = rawAmount >= 0 ? rawAmount : 0
      } else {
        creditAmount = rawAmount >= 0 ? rawAmount : 0
        debitAmount = rawAmount < 0 ? Math.abs(rawAmount) : 0
      }
    }
    totalDebit += debitAmount
    totalCredit += creditAmount
    const displayAmount = debitAmount > 0 ? debitAmount : creditAmount
    details.push({ ...sb, direction: debitAmount > 0 ? '借' : '贷', amount: displayAmount })
  }

  return {
    balanced: Math.abs(totalDebit - totalCredit) < 0.001,
    totalDebit: round(totalDebit),
    totalCredit: round(totalCredit),
    details,
  }
}

/**
 * 资产负债表计算
 * 恒等式：资产 = 负债 + 所有者权益
 *
 * 资产类科目映射：
 *   流动资产：1001-1901 中余额在借方的
 *   非流动资产：长期资产类
 * 负债类科目映射：
 *   流动负债：2001-2401
 *   非流动负债：2501-2901
 * 所有者权益：4001-4104
 */
export function calcBalanceSheet(subjects, periodBalances) {
  const assets = []
  const liabilities = []
  const equities = []
  let totalAssets = 0
  let totalLiabilities = 0
  let totalEquity = 0

  for (const pb of periodBalances) {
    const subject = subjects.find(s => s.id === pb.subjectId)
    if (!subject) continue

    const closingAmount = round(Number(pb.closingDebit) - Number(pb.closingCredit))
    if (closingAmount === 0) continue

    const item = {
      code: subject.code,
      name: subject.name,
      amount: round(Math.abs(closingAmount)),
    }

    if (subject.type === SUBJECT_TYPE.ASSET || subject.type === SUBJECT_TYPE.COST) {
      assets.push(item)
      totalAssets += item.amount
    } else if (subject.type === SUBJECT_TYPE.LIABILITY) {
      liabilities.push(item)
      totalLiabilities += item.amount
    } else if (subject.type === SUBJECT_TYPE.EQUITY) {
      equities.push(item)
      totalEquity += item.amount
    }
  }

  const isBalanced = Math.abs(totalAssets - (totalLiabilities + totalEquity)) < 0.001

  return {
    assets: { items: assets, total: round(totalAssets) },
    liabilities: { items: liabilities, total: round(totalLiabilities) },
    equity: { items: equities, total: round(totalEquity) },
    isBalanced,
  }
}

/**
 * 利润表计算（多步式）
 *
 * 营业收入 = 主营业务收入 + 其他业务收入
 * 营业利润 = 营业收入 - 营业成本 - 税金及附加 - 销售费用 - 管理费用 - 财务费用
 * 利润总额 = 营业利润 + 营业外收入 - 营业外支出
 * 净利润 = 利润总额 - 所得税费用
 */
export function calcIncomeStatement(subjects, periodBalances) {
  const getAmount = (codePrefix) => {
    const subject = subjects.find(s => s.code.startsWith(codePrefix) && s.type === SUBJECT_TYPE.PROFIT_LOSS)
    if (!subject) return 0
    const pb = periodBalances.find(p => p.subjectId === subject.id)
    if (!pb) return 0
    // 损益类：贷方发生额 = 收入/利得，借方发生额 = 费用/损失
    return round(Number(pb.currentCredit) - Number(pb.currentDebit))
  }

  const revenue = getAmount('6001') + getAmount('6051')  // 营业收入
  const cost = getAmount('6401') + getAmount('6402')      // 营业成本
  const taxSurcharge = getAmount('6403')                  // 税金及附加
  const sellingExp = getAmount('6601')                     // 销售费用
  const adminExp = getAmount('6602')                       // 管理费用
  const financeExp = getAmount('6603')                     // 财务费用
  const otherIncome = getAmount('6301')                    // 营业外收入
  const otherExp = getAmount('6711')                       // 营业外支出
  const incomeTax = getAmount('6801')                      // 所得税费用

  const operatingProfit = round(revenue - cost - taxSurcharge - sellingExp - adminExp - financeExp)
  const totalProfit = round(operatingProfit + otherIncome - otherExp)
  const netProfit = round(totalProfit - incomeTax)

  return {
    items: [
      { name: '一、营业收入', amount: revenue, indent: false },
      { name: '减：营业成本', amount: cost, indent: true },
      { name: '    税金及附加', amount: taxSurcharge, indent: true },
      { name: '    销售费用', amount: sellingExp, indent: true },
      { name: '    管理费用', amount: adminExp, indent: true },
      { name: '    财务费用', amount: financeExp, indent: true },
      { name: '二、营业利润', amount: operatingProfit, indent: false, bold: true },
      { name: '加：营业外收入', amount: otherIncome, indent: true },
      { name: '减：营业外支出', amount: otherExp, indent: true },
      { name: '三、利润总额', amount: totalProfit, indent: false, bold: true },
      { name: '减：所得税费用', amount: incomeTax, indent: true },
      { name: '四、净利润', amount: netProfit, indent: false, bold: true },
    ],
    operatingProfit,
    totalProfit,
    netProfit,
  }
}

/**
 * 现金流量表（间接法）
 * 以净利润为起点，调整非现金项目后得到经营活动现金流
 */
export function calcCashFlow(subjects, periodBalances) {
  const income = calcIncomeStatement(subjects, periodBalances)

  // 简化版：从利润表净利润出发 + 折旧摊销等非现金支出调整
  // 在实际软件中需要按凭证逐笔分析现金流分类
  const depreciation = 0 // 折旧（需从科目余额获取）
  const amortization = 0 // 摊销

  const operatingCashFlow = round(income.netProfit + depreciation + amortization)
  const investingCashFlow = 0
  const financingCashFlow = 0
  const netIncrease = round(operatingCashFlow + investingCashFlow + financingCashFlow)

  return {
    operating: { net: operatingCashFlow },
    investing: { net: investingCashFlow },
    financing: { net: financingCashFlow },
    netIncrease,
    netProfit: income.netProfit,
  }
}


/**
 * 折旧计算方法
 */
export const DEPRECIATION_METHOD = {
  STRAIGHT_LINE: 'straight_line',
  DOUBLE_DECLINING: 'double_declining',
  SUM_OF_YEARS: 'sum_of_years',
}

export function calcMonthlyDepreciation(originalValue, salvageValue, usefulLifeMonths, method, currentMonth = 0) {
  const base = originalValue - salvageValue;
  if (base <= 0 || usefulLifeMonths <= 0) return 0;
  switch (method) {
    case 'double_declining': {
      const rate = 2 / usefulLifeMonths;
      const accumulated = originalValue * rate * currentMonth;
      const bookValue = originalValue - accumulated;
      const depr = Math.round(bookValue * rate * 100) / 100;
      const remaining = usefulLifeMonths - currentMonth;
      if (remaining <= 2) return Math.round((bookValue - salvageValue) / remaining * 100) / 100;
      return Math.max(depr, 0);
    }
    case 'sum_of_years': {
      const totalYears = usefulLifeMonths / 12;
      const sumY = totalYears * (totalYears + 1) / 2;
      const curYear = Math.floor(currentMonth / 12);
      const remYears = totalYears - curYear;
      if (remYears <= 0) return 0;
      const yearDepr = Math.round(base * remYears / sumY * 100) / 100;
      return Math.round(yearDepr / 12 * 100) / 100;
    }
    default: {
      return Math.round(base / usefulLifeMonths * 100) / 100;
    }
  }
}
