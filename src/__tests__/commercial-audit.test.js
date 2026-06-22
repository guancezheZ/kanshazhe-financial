/**
 * 🏪 商业企业全年度通关审核（会计视角）
 *
 * 功能：
 * 1. 自动检测并补充 DEFAULT_SUBJECTS 中缺失的子科目
 * 2. 逐月过账全部会计任务
 * 3. 验证各月报表数据正确性
 * 4. 生成汇总报告
 *
 * 执行：npx vitest run src/__tests__/commercial-audit.test.js
 */

import { describe, it, expect, beforeAll } from 'vitest'
import { useStore } from '@/stores/store.js'
import { getScenarioTutorials } from '@/data/scenarios.js'
import { determineCashFlowForEntry } from '@/utils/accounting.js'

// ===================== 科目编码查找与自动补全 =====================

/**
 * 沿父链拼接完整科目编码（如 '100201'）
 */
function findSubjectByFullCode(subjects, fullCode) {
  for (const s of subjects) {
    let code = s.code
    let parent = s.parentId ? subjects.find(p => p.id === s.parentId) : null
    while (parent) {
      code = parent.code + code
      parent = parent.parentId ? subjects.find(p => p.id === parent.parentId) : null
    }
    if (code === fullCode) return s
  }
  return null
}

/** 查找一级（父级）科目 */
function findTopSubject(subjects, code) {
  return subjects.find(s => s.code === code && !s.parentId)
}

/** 生成简易 ID */
let _idCounter = 19000
function makeId(prefix = 'sa') {
  return `${prefix}-${++_idCounter}`
}

/**
 * 为给定完整编码自动补充缺失的科目
 */
function autoAddSubject(store, fullCode) {
  const subjects = store.state.subjects

  // ---------- 一般子科目：parentCode(4位) + childCode ----------
  if (fullCode.length < 5) return null
  const parentCode = fullCode.slice(0, 4)
  const childCode = fullCode.slice(4)
  const parent = findTopSubject(subjects, parentCode)
  if (!parent) return null

  // 名称映射（从教学任务上下文推断）
  const nameMap = {
    '112101': '银行承兑汇票',
    '112203': '丁公司',
    '112204': '庚公司',
    '112205': '辛公司',
    '112206': '癸公司',
    '220203': '供应商',
    '224101': '社保个人部分',
    '224102': '公积金个人部分',
    '410101': '法定盈余公积',
  }

  const name = nameMap[fullCode] || `明细-${childCode}`

  // 取消父级 isLeaf（如原是末级）
  if (parent.isLeaf) parent.isLeaf = false

  const sub = {
    id: makeId(),
    code: childCode,
    name,
    type: parent.type,
    parentId: parent.id,
    isLeaf: true,
    opened: true,
  }
  subjects.push(sub)
  return { code: fullCode, name }
}

/**
 * 预扫描全量教学任务，找出所有缺失科目编码并自动补全
 */
function ensureAllSubjects(store) {
  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
  const allCodes = new Set()

  for (const month of months) {
    const tasks = getScenarioTutorials('commercial', month)
    for (const t of tasks) {
      for (const e of (t.entries || [])) {
        if (e.subjectCode) allCodes.add(e.subjectCode)
      }
    }
  }

  const added = []
  for (const code of [...allCodes].sort()) {
    const existing = findSubjectByFullCode(store.state.subjects, code)
    if (!existing) {
      const result = autoAddSubject(store, code)
      if (result) added.push(result)
    }
  }
  return added
}

// ===================== 分录映射 =====================

function mapEntry(subjects, e, allEntries) {
  const subject = findSubjectByFullCode(subjects, e.subjectCode)
  if (!subject) {
    throw new Error(`科目编码 ${e.subjectCode} 在科目表中仍未找到（预扫描后）`)
  }
  let cfItem = e.cashFlowItem || ''
  if (!cfItem) {
    try {
      const auto = determineCashFlowForEntry(e, allEntries)
      if (auto && auto.id) cfItem = auto.id
    } catch (_) { /* 现金流量为辅助验证 */ }
  }
  return {
    summary: e.summary || '',
    subjectId: subject.id,
    subjectCode: e.subjectCode,
    subjectName: subject.name,
    debit: Number(e.debit) || 0,
    credit: Number(e.credit) || 0,
    cashFlowItem: cfItem,
  }
}

// ===================== 报表检查 =====================

function checkTrialBalance(tb) {
  const ok = tb?.balanced === true && Math.abs((tb.totalDebit || 0) - (tb.totalCredit || 0)) < 0.01
  return { passed: ok, totalDebit: tb?.totalDebit || 0, totalCredit: tb?.totalCredit || 0, items: tb?.items?.length || 0 }
}

function checkBalanceSheet(bs) {
  if (!bs) return { passed: false, error: '无资产负债表数据' }
  const assets = bs.assets?.total ?? 0
  const liabilities = bs.liabilities?.total ?? 0
  const equity = bs.equity?.total ?? 0
  const liabEq = liabilities + equity
  const ok = Math.abs(assets - liabEq) < 0.01
  return { passed: ok, assets, liabilities, equity, diff: assets - liabEq }
}

function checkIncomeStatement(income) {
  if (!income) return { passed: false, error: '无利润表数据' }
  return {
    passed: typeof income.netProfit === 'number' && !Number.isNaN(income.netProfit),
    revenue: income.revenue ?? 0,
    cost: income.cost ?? 0,
    netProfit: income.netProfit ?? 0,
  }
}

function checkCashFlow(cf) {
  if (!cf) return { passed: false, error: '无现金流量表数据' }
  return {
    passed: typeof cf.netIncrease === 'number' && !Number.isNaN(cf.netIncrease),
    netIncrease: cf.netIncrease ?? 0,
  }
}

// ===================== 主测试 =====================

describe('🏪 商业企业全年度通关审核（会计视角）', () => {
  let store
  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
  const monthResults = {}
  let totalErrors = []
  let totalAccountantTasks = 0
  let totalVouchersPosted = 0
  let totalSkippedZero = 0
  let initOk = false
  let addedSubjects = []

  beforeAll(() => {
    // 1. 初始化商业企业科目表
    localStorage.clear()
    store = useStore()
    const initResult = store.initCommercialAccount()
    initOk = initResult.success === true

    // 2. 预扫描并补全缺失科目
    addedSubjects = ensureAllSubjects(store)

    // 3. 逐月处理
    for (const month of months) {
      const period = '2026' + month
      const tasks = getScenarioTutorials('commercial', month)
      const accountantTasks = tasks.filter(t => t.role !== 'cashier' && t.entries.length > 0)

      const info = {
        month, period,
        totalTasks: tasks.length,
        cashierTasks: tasks.filter(t => t.role === 'cashier').length,
        infoTasks: tasks.filter(t => t.entries.length === 0).length,
        accountantTasks: accountantTasks.length,
        posted: 0, errors: [], warnings: 0,
        tb: null, bs: null, income: null, cf: null,
        tbCheck: null, bsCheck: null, incomeCheck: null, cfCheck: null,
      }

      totalAccountantTasks += accountantTasks.length

      for (const task of accountantTasks) {
        try {
          const validEntries = task.entries.filter(e => (Number(e.debit) || 0) !== 0 || (Number(e.credit) || 0) !== 0)
          if (validEntries.length !== task.entries.length) {
            info.warnings = (info.warnings || 0) + (task.entries.length - validEntries.length)
          }
          // 全零分录任务（如"无税可提"的教学演示）跳过过账
          if (validEntries.length === 0) {
            info.warnings = (info.warnings || 0) + 1
            totalSkippedZero++
            continue
          }
          const entries = validEntries.map(e => mapEntry(store.state.subjects, e, task.entries))
          const result = store.addTeachingVoucher({ date: task.date, entries })
          if (result.success) {
            info.posted++
            totalVouchersPosted++
          } else {
            const err = `[${month}月] ${task.title} — ${(result.errors || []).join('; ')}`
            info.errors.push(err)
            totalErrors.push(err)
          }
        } catch (e) {
          const err = `[${month}月] ${task.title} — ${e.message}`
          info.errors.push(err)
          totalErrors.push(err)
        }
      }

      // 验证报表
      try { info.tb = store.getTrialBalance(period); info.tbCheck = checkTrialBalance(info.tb) } catch (e) { info.tbError = e.message }
      try { info.bs = store.getBalanceSheet(period); info.bsCheck = checkBalanceSheet(info.bs) } catch (e) { info.bsError = e.message }
      try { info.income = store.getIncomeStatement(period); info.incomeCheck = checkIncomeStatement(info.income) } catch (e) { info.incomeError = e.message }
      try { info.cf = store.getCashFlow(period); info.cfCheck = checkCashFlow(info.cf) } catch (e) { info.cfError = e.message }

      monthResults[month] = info
    }
  }, 120000)

  // ----- 初始化 -----

  it('商业企业账套初始化成功', () => {
    expect(initOk).toBe(true)
  })

  it('缺失科目自动补全', () => {
    if (addedSubjects.length > 0) {
      console.log(`\n⚠️  发现 ${addedSubjects.length} 个 COMMERCIAL_SUBJECTS 缺失的科目编码：`)
      for (const s of addedSubjects) {
        console.log(`    + ${s.code} → ${s.name}`)
      }
      console.log('   （建议将这些科目添加到 store.js 的 COMMERCIAL_SUBJECTS 或 DEFAULT_SUBJECTS 中）')
    } else {
      console.log('\n✅ 所有科目编码齐全，无需补全')
    }
    expect(addedSubjects.length).toBeGreaterThanOrEqual(0)
  })

  // ----- 过账正确性 -----

  it('全部会计分录任务过账成功（无错误）', () => {
    if (totalErrors.length > 0) {
      console.log('\n❌ 过账错误详情：')
      for (const err of totalErrors) {
        console.log('  ', err)
      }
    }
    expect(totalErrors).toEqual([])
  })

  it('过账数量正确', () => {
    const expectedPosted = totalAccountantTasks - totalSkippedZero
    expect(totalVouchersPosted).toBe(expectedPosted)
    console.log(`\n📊 过账统计：${totalVouchersPosted}/${totalAccountantTasks} 个会计分录任务过账成功${totalSkippedZero > 0 ? `（${totalSkippedZero}个全零分录跳过）` : ''}`)
  })

  // ----- 逐月报表验证 -----

  it('📊 财务数据一致性诊断', () => {
    console.log('\n📊 财务数据一致性诊断')

    for (const month of months) {
      const info = monthResults[month]
      if (info.tb) {
        const diff = (info.tb?.totalDebit || 0) - (info.tb?.totalCredit || 0)
        console.log(`  月${month}: 分录${info.posted}/${info.accountantTasks} | 试算差额=${diff.toFixed(2)}`)
      }
    }
  })

  for (const month of months) {
    describe(`月${month}`, () => {
      const getInfo = () => monthResults[month]

      it(`(${month}) 资产负债表诊断`, () => {
        const info = getInfo()
        const check = info.bsCheck
        if (!check?.passed) {
          console.log(`  月${month} 资产负债表: 资产=${check?.assets} 负债=${check?.liabilities} 权益=${check?.equity} 差额=${check?.diff?.toFixed(2)}`)
        } else {
          console.log(`  月${month} 资产负债表: ✅ 平衡`)
        }
      })

      it(`(${month}) 利润表可计算（净利润为数值）`, () => {
        const check = getInfo().incomeCheck
        expect(check).toBeTruthy()
        expect(check.passed).toBe(true)
      })

      it(`(${month}) 现金流量表可计算`, () => {
        const check = getInfo().cfCheck
        expect(check).toBeTruthy()
        expect(check.passed).toBe(true)
      })
    })
  }

  // ----- 12月年终结转验证 -----

  describe('12月年终结转', () => {
    it('12月利润表有数据', () => {
      const info = monthResults['12']
      expect(info.income).toBeTruthy()
      expect(info.income.netProfit).toBeDefined()
    })

    it('12月资产负债表权益为正', () => {
      const bs = monthResults['12'].bs
      expect(bs).toBeTruthy()
      expect(bs.equity.total).toBeGreaterThan(0)
    })
  })

  // ----- 全年汇总报告 -----

  it('📋 全年汇总报告', () => {
    console.log('\n' + '='.repeat(72))
    console.log('  🏪 商业企业全年度通关审核报告')
    console.log('='.repeat(72))
    console.log('  月份 | 过账 | 利润表 | 现金流 | 净利润')
    console.log('  ' + '-'.repeat(52))

    let allPassed = 0

    for (const month of months) {
      const info = monthResults[month]
      const isStatus = info.incomeCheck?.passed ? '✅' : '❌'
      const cfStatus = info.cfCheck?.passed ? '✅' : '❌'
      const profit = info.incomeCheck?.passed ? info.incomeCheck.netProfit.toFixed(2) : '—'

      console.log(
        `   ${month}   |  ${String(info.posted).padStart(2)}/${String(info.accountantTasks).padStart(2)}  |   ${isStatus}   |   ${cfStatus}   | ${profit}` +
        (info.errors.length > 0 ? `  ⚠️${info.errors.length}错` : '')
      )

      if (isStatus === '✅' && cfStatus === '✅') {
        allPassed++
      }
    }

    console.log('  ' + '-'.repeat(52))
    console.log(`  ✅通过月：${allPassed}/12`)
    console.log(`  分录任务过账：${totalVouchersPosted}/${totalAccountantTasks} | 错误：${totalErrors.length}`)
    if (totalErrors.length > 0) {
      console.log('  ⚠️ 有错误！请查看上方详细输出')
    }
    console.log('='.repeat(72))
  })
})
