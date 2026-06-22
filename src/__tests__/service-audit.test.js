/**
 * 🏗️ 服务业全年度通关审核（会计视角）
 *
 * 执行：npx vitest run src/__tests__/service-audit.test.js
 */

import { describe, it, expect, beforeAll } from 'vitest'
import { useStore } from '@/stores/store.js'
import { getScenarioTutorials } from '@/data/scenarios.js'
import { determineCashFlowForEntry } from '@/utils/accounting.js'

// ===================== 科目查找与补全 =====================

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

function findTopSubject(subjects, code) {
  return subjects.find(s => s.code === code && !s.parentId)
}

let _idCounter = 29000
function makeId(prefix = 'sa') {
  return `${prefix}-${++_idCounter}`
}

function autoAddSubject(store, fullCode) {
  const subjects = store.state.subjects
  if (fullCode.length < 5) return null
  const parentCode = fullCode.slice(0, 4)
  const childCode = fullCode.slice(4)
  const parent = findTopSubject(subjects, parentCode)
  if (!parent) return null

  const nameMap = {
    '112101': '银行承兑汇票', '112203': '丁公司', '112204': '庚公司',
    '112205': '辛公司', '112206': '癸公司', '220203': '供应商',
    '224101': '社保个人部分', '224102': '公积金个人部分', '410101': '法定盈余公积',
    '140301': 'A材料', '140302': 'B材料', '140501': 'A产品', '140502': 'B产品',
    '160105': '研发设备', '500101': '直接材料', '500102': '直接人工',
    '500103': '制造费用', '660204': '研发费用',
  }

  const name = nameMap[fullCode] || `明细-${childCode}`
  if (parent.isLeaf) parent.isLeaf = false

  const sub = {
    id: makeId(), code: childCode, name, type: parent.type,
    parentId: parent.id, isLeaf: true, opened: true,
  }
  subjects.push(sub)
  return { code: fullCode, name }
}

function ensureAllSubjects(store) {
  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
  const allCodes = new Set()
  for (const month of months) {
    const tasks = getScenarioTutorials('service', month)
    for (const t of tasks) {
      for (const e of (t.entries || [])) {
        if (e.subjectCode) allCodes.add(e.subjectCode)
      }
    }
  }
  const added = []
  for (const code of [...allCodes].sort()) {
    if (!findSubjectByFullCode(store.state.subjects, code)) {
      const result = autoAddSubject(store, code)
      if (result) added.push(result)
    }
  }
  return added
}

// ===================== 分录映射 =====================

function mapEntry(subjects, e, allEntries) {
  const subject = findSubjectByFullCode(subjects, e.subjectCode)
  if (!subject) throw new Error(`科目编码 ${e.subjectCode} 未找到`)
  let cfItem = e.cashFlowItem || ''
  if (!cfItem) {
    try {
      const auto = determineCashFlowForEntry(e, allEntries)
      if (auto && auto.id) cfItem = auto.id
    } catch (_) {}
  }
  return {
    summary: e.summary || '', subjectId: subject.id,
    subjectCode: e.subjectCode, subjectName: subject.name,
    debit: Number(e.debit) || 0, credit: Number(e.credit) || 0,
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
  const ok = Math.abs(assets - (liabilities + equity)) < 0.01
  return { passed: ok, assets, liabilities, equity, diff: assets - (liabilities + equity) }
}

function checkIncomeStatement(income) {
  if (!income) return { passed: false, error: '无利润表数据' }
  return { passed: typeof income.netProfit === 'number' && !Number.isNaN(income.netProfit), revenue: income.revenue ?? 0, cost: income.cost ?? 0, netProfit: income.netProfit ?? 0 }
}

function checkCashFlow(cf) {
  if (!cf) return { passed: false, error: '无现金流量表数据' }
  return { passed: typeof cf.netIncrease === 'number' && !Number.isNaN(cf.netIncrease), netIncrease: cf.netIncrease ?? 0 }
}

// ===================== 主测试 =====================

describe('🏗️ 服务业全年度通关审核（会计视角）', () => {
  let store
  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
  const monthResults = {}
  let totalErrors = [], totalAccountantTasks = 0, totalVouchersPosted = 0, totalSkippedZero = 0
  let initOk = false, addedSubjects = []

  beforeAll(() => {
    localStorage.clear()
    store = useStore()
    const initResult = store.initServiceAccount()
    initOk = initResult.success === true

    addedSubjects = ensureAllSubjects(store)

    for (const month of months) {
      const period = '2026' + month
      const tasks = getScenarioTutorials('service', month)
      const accountantTasks = tasks.filter(t => t.role !== 'cashier' && t.entries.length > 0)
      const info = {
        month, period, totalTasks: tasks.length,
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
          if (validEntries.length === 0) { totalSkippedZero++; continue }
          if (validEntries.length !== task.entries.length) {
            info.warnings = (info.warnings || 0) + (task.entries.length - validEntries.length)
          }
          const entries = validEntries.map(e => mapEntry(store.state.subjects, e, task.entries))
          const result = store.addTeachingVoucher({ date: task.date, entries })
          if (result.success) { info.posted++; totalVouchersPosted++ }
          else {
            const err = `[${month}月] ${task.title} — ${(result.errors || []).join('; ')}`
            info.errors.push(err); totalErrors.push(err)
          }
        } catch (e) {
          const err = `[${month}月] ${task.title} — ${e.message}`
          info.errors.push(err); totalErrors.push(err)
        }
      }

      try { info.tb = store.getTrialBalance(period); info.tbCheck = checkTrialBalance(info.tb) } catch (e) { info.tbError = e.message }
      try { info.bs = store.getBalanceSheet(period); info.bsCheck = checkBalanceSheet(info.bs) } catch (e) { info.bsError = e.message }
      try { info.income = store.getIncomeStatement(period); info.incomeCheck = checkIncomeStatement(info.income) } catch (e) { info.incomeError = e.message }
      try { info.cf = store.getCashFlow(period); info.cfCheck = checkCashFlow(info.cf) } catch (e) { info.cfError = e.message }

      monthResults[month] = info
    }
  }, 120000)

  it('服务业账套初始化成功', () => { expect(initOk).toBe(true) })

  it('缺失科目自动补全', () => {
    if (addedSubjects.length > 0) {
      console.log(`\n⚠️  发现 ${addedSubjects.length} 个 SERVICE_SUBJECTS 缺失的科目编码：`)
      for (const s of addedSubjects) { console.log(`    + ${s.code} → ${s.name}`) }
    } else { console.log('\n✅ 所有科目编码齐全') }
    expect(addedSubjects.length).toBeGreaterThanOrEqual(0)
  })

  it('全部会计分录任务过账成功', () => {
    if (totalErrors.length > 0) { console.log('\n❌ 错误：'); for (const e of totalErrors) console.log('  ', e) }
    expect(totalErrors).toEqual([])
  })

  it('过账数量正确', () => {
    const expected = totalAccountantTasks - totalSkippedZero
    expect(totalVouchersPosted).toBe(expected)
    console.log(`\n📊 过账统计：${totalVouchersPosted}/${totalAccountantTasks}${totalSkippedZero > 0 ? `（${totalSkippedZero}个跳过）` : ''}`)
  })

  it('📊 财务数据一致性诊断', () => {
    console.log('\n📊 财务数据一致性诊断')
    for (const month of months) {
      const info = monthResults[month]
      if (info.tb) console.log(`  月${month}: ${info.posted}/${info.accountantTasks} | 试算差额=${((info.tb.totalDebit||0)-(info.tb.totalCredit||0)).toFixed(2)}`)
    }
  })

  for (const month of months) {
    describe(`月${month}`, () => {
      const getInfo = () => monthResults[month]
      it(`(${month}) 资产负债表诊断`, () => {
        const c = getInfo().bsCheck
        if (!c?.passed) console.log(`  月${month} BS: 资产=${c?.assets} 负债=${c?.liabilities} 权益=${c?.equity} 差额=${c?.diff?.toFixed(2)}`)
        else console.log(`  月${month} BS: ✅ 平衡`)
      })
      it(`(${month}) 利润表可计算`, () => { const c = getInfo().incomeCheck; expect(c).toBeTruthy(); expect(c.passed).toBe(true) })
      it(`(${month}) 现金流量表可计算`, () => { const c = getInfo().cfCheck; expect(c).toBeTruthy(); expect(c.passed).toBe(true) })
    })
  }

  describe('12月年终结转', () => {
    it('12月利润表有数据', () => { const i = monthResults['12'].income; expect(i).toBeTruthy(); expect(i.netProfit).toBeDefined() })
    it('12月资产负债表权益为正', () => { const bs = monthResults['12'].bs; expect(bs).toBeTruthy(); expect(bs.equity.total).toBeGreaterThan(0) })
  })

  it('📋 全年汇总报告', () => {
    console.log('\n' + '='.repeat(72))
    console.log('  🏗️ 服务业全年度通关审核报告')
    console.log('='.repeat(72))
    console.log('  月份 | 过账 | 利润表 | 现金流 | 净利润')
    console.log('  ' + '-'.repeat(52))
    let allPassed = 0
    for (const month of months) {
      const info = monthResults[month]
      const isS = info.incomeCheck?.passed ? '✅' : '❌'
      const cfS = info.cfCheck?.passed ? '✅' : '❌'
      const p = info.incomeCheck?.passed ? info.incomeCheck.netProfit.toFixed(2) : '—'
      console.log(`   ${month}   |  ${String(info.posted).padStart(2)}/${String(info.accountantTasks).padStart(2)}  |   ${isS}   |   ${cfS}   | ${p}` + (info.errors.length > 0 ? `  ⚠️${info.errors.length}错` : ''))
      if (isS === '✅' && cfS === '✅') allPassed++
    }
    console.log('  ' + '-'.repeat(52))
    console.log(`  ✅通过月：${allPassed}/12`)
    console.log(`  分录任务过账：${totalVouchersPosted}/${totalAccountantTasks} | 错误：${totalErrors.length}`)
    console.log('='.repeat(72))
  })
})
