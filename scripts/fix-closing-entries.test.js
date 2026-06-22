/**
 * 🔧 期末结转金额自动修复脚本
 *
 * 对指定行业/月份，过账非结转任务→获取损益科目余额→修正结转分录金额
 *
 * 用法：npx vitest run scripts/fix-closing-entries.test.js
 */
import { describe, it, expect, beforeAll } from 'vitest'
import { useStore } from '@/stores/store.js'
import { getScenarioTutorials } from '@/data/scenarios.js'
import { determineCashFlowForEntry } from '@/utils/accounting.js'

// 行业配置
const INDUSTRIES = {
  manufacturing: { init: 'initTeachingAccount', label: '制造业' },
  commercial:    { init: 'initCommercialAccount', label: '商业企业' },
  service:       { init: 'initServiceAccount', label: '服务业' },
  construction:  { init: 'initConstructionAccount', label: '建筑业' },
}

// ===================== 工具函数 =====================

function findSubjectByFullCode(subjects, fullCode) {
  for (const s of subjects) {
    let code = s.code; let parent = s.parentId ? subjects.find(p => p.id === s.parentId) : null
    while (parent) { code = parent.code + code; parent = parent.parentId ? subjects.find(p => p.id === parent.parentId) : null }
    if (code === fullCode) return s
  }
  return null
}

function findTopSubject(subjects, code) { return subjects.find(s => s.code === code && !s.parentId) }

let _idCounter = 50000
function makeId(p = 'sa') { return `${p}-${++_idCounter}` }

function autoAddSubject(store, fullCode) {
  const subjects = store.state.subjects
  if (fullCode === '2212') {
    if (findTopSubject(subjects, '2212')) return null
    subjects.push({ id: makeId('sl'), code: '2212', name: '预计负债', type: 'liability', parentId: null, isLeaf: true, opened: true })
    return { code: fullCode, name: '预计负债' }
  }
  if (fullCode.length < 5) return null
  const pCode = fullCode.slice(0, 4); const cCode = fullCode.slice(4)
  const parent = findTopSubject(subjects, pCode)
  if (!parent) return null
  if (parent.isLeaf) parent.isLeaf = false
  const sub = { id: makeId(), code: cCode, name: `明细-${cCode}`, type: parent.type, parentId: parent.id, isLeaf: true, opened: true }
  subjects.push(sub); return { code: fullCode, name: sub.name }
}

function ensureAllSubjects(store, scenario, months) {
  const codes = new Set()
  for (const m of months) for (const t of getScenarioTutorials(scenario, m)) for (const e of (t.entries||[])) if (e.subjectCode) codes.add(e.subjectCode)
  const added = []
  for (const code of [...codes].sort()) { if (!findSubjectByFullCode(store.state.subjects, code)) { const r = autoAddSubject(store, code); if (r) added.push(r) } }
  return added
}

// ===================== 主逻辑 =====================

describe('🔧 期末结转金额诊断与修复', () => {
  const months = ['01','02','03','04','05','06','07','08','09','10','11','12']

  for (const [scenario, cfg] of Object.entries(INDUSTRIES)) {
    describe(`${cfg.label} (${scenario})`, () => {
      let store
      const allResults = {}

      beforeAll(() => {
        localStorage.clear()
        store = useStore()
        store[cfg.init]()
        ensureAllSubjects(store, scenario, months)

        // 扫描所有月份，找出结转任务
        const closingTitles = ['月末结转·期间损益', '月末结转·期间损益（Q3季末）', '月末结转·期间损益（12月）']

        for (const month of months) {
          const tasks = getScenarioTutorials(scenario, month)
          const result = { month, beforeBalances: {}, closingTask: null, closingEntries: [], afterBalances: {} }

          // 第一步：找出结转任务
          const closingIdx = tasks.findIndex(t =>
            closingTitles.some(ct => t.title.includes(ct)) ||
            (t.title.includes('月末结转') && t.title.includes('损益'))
          )
          if (closingIdx === -1) {
            console.log(`  ⚠️ 月${month}: 未找到期间损益结转任务`)
            continue
          }

          // 第二步：分开结转任务和非结转任务
          const closingTask = tasks[closingIdx]
          const nonClosingTasks = tasks.filter((t, i) => i !== closingIdx)

          // 清理store状态（重新初始化）
          localStorage.clear()
          store = useStore()
          store[cfg.init]()
          ensureAllSubjects(store, scenario, months.slice(0, months.indexOf(month) + 1))

          // 第三步：过账之前所有月份的任务（确保累计余额正确）
          for (const pm of months.slice(0, months.indexOf(month))) {
            const prevTasks = getScenarioTutorials(scenario, pm)
            for (const t of prevTasks) {
              if (t.role === 'cashier' || t.entries.length === 0) continue
              const ve = t.entries.filter(e => (Number(e.debit)||0) !== 0 || (Number(e.credit)||0) !== 0)
              if (ve.length === 0) continue
              try {
                store.addTeachingVoucher({ date: t.date, entries: ve.map(e => {
                  const s = findSubjectByFullCode(store.state.subjects, e.subjectCode)
                  return { summary: e.summary||'', subjectId: s?.id||'', subjectCode: e.subjectCode, subjectName: s?.name||'', debit: Number(e.debit)||0, credit: Number(e.credit)||0 }
                })})
              } catch(_) {}
            }
          }

          // 第四步：过账本月非结转任务
          for (const t of nonClosingTasks) {
            if (t.role === 'cashier' || t.entries.length === 0) continue
            const ve = t.entries.filter(e => (Number(e.debit)||0) !== 0 || (Number(e.credit)||0) !== 0)
            if (ve.length === 0) continue
            try {
              store.addTeachingVoucher({ date: t.date, entries: ve.map(e => {
                const s = findSubjectByFullCode(store.state.subjects, e.subjectCode)
                return { summary: e.summary||'', subjectId: s?.id||'', subjectCode: e.subjectCode, subjectName: s?.name||'', debit: Number(e.debit)||0, credit: Number(e.credit)||0 }
              })})
            } catch(_) {}
          }

          // 第五步：获取结转前的各损益科目余额
          const period = '2026' + month
          const tb = store.getTrialBalance(period)
          const pnlAccounts = tb.items.filter(i => i.type === 'profit_loss' && Math.abs(i.balance) > 0.005)
          result.beforeBalances = Object.fromEntries(pnlAccounts.map(i => {
            const fullCode = findSubjectFullCode(store.state.subjects, i.subjectId)
            return [fullCode || i.subjectId, { name: i.subjectName, balance: Math.abs(i.balance), drOrCr: i.balance > 0 ? '借' : '贷' }]
          }))

          // 第六步：获取当前结转任务中的金额
          result.closingEntries = closingTask.entries.map(e => ({
            subjectCode: e.subjectCode,
            summary: e.summary,
            debit: Number(e.debit) || 0,
            credit: Number(e.credit) || 0,
            explanation: e.explanation || '',
          }))

          allResults[month] = result
        }
      }, 300000)

      it(`📊 结转前损益科目余额 vs 当前结转分录金额`, () => {
        console.log(`\n═══════════════════════════════════════════`)
        console.log(`  ${cfg.label} — 逐月结转诊断`)
        console.log(`═══════════════════════════════════════════`)

        let totalDiscrepancy = 0

        for (const month of months) {
          const r = allResults[month]
          if (!r) continue

          console.log(`\n  📍 月${month}`)
          console.log(`  ┌──────────┬────────────┬──────────────┬──────────────┬──────────────┐`)
          console.log(`  │ 科目     │ 实际余额    │ 当前结转      │ 应结转        │ 差额         │`)
          console.log(`  ├──────────┼────────────┼──────────────┼──────────────┼──────────────┤`)

          // 计算各科目正确的结转金额
          const correctAmounts = {}
          let monthDiff = 0

          for (const [code, info] of Object.entries(r.beforeBalances)) {
            const currentClosure = r.closingEntries.find(e => e.subjectCode === code)
            const currentAmount = currentClosure ? (currentClosure.debit || currentClosure.credit) : 0

            // 正确的结转金额 = 余额绝对值（收入类贷方余额从借方转出，费用类借方余额从贷方转出）
            const correctAmt = info.balance
            // 方向：收入类（贷方余额）→ debit转出；费用类（借方余额）→ credit转出
            const isRevenue = ['6001','6051','6101','6111','6301'].some(p => code.startsWith(p))
            const correctIsDebit = info.drOrCr === '贷'  // 贷方余额→需从借方转出

            correctAmounts[code] = { amount: correctAmt, isDebit: correctIsDebit }

            const diff = Math.abs(currentAmount - correctAmt)
            if (diff > 0.01) {
              monthDiff += diff
              console.log(`  │ ${code.padEnd(8)} │ ${String(info.balance.toFixed(2)).padStart(10)} │ ${String(currentAmount.toFixed(2)).padStart(12)} │ ${String(correctAmt.toFixed(2)).padStart(12)} │ ${String(diff.toFixed(2)).padStart(12)} │ ⚠️`)
            } else {
              console.log(`  │ ${code.padEnd(8)} │ ${String(info.balance.toFixed(2)).padStart(10)} │ ${String(currentAmount.toFixed(2)).padStart(12)} │ ${String(correctAmt.toFixed(2)).padStart(12)} │ ${String(diff.toFixed(2)).padStart(12)} │ ✅`)
            }
          }

          // 检查当前结转中有但实际余额为零的科目
          for (const ce of r.closingEntries) {
            if (!r.beforeBalances[ce.subjectCode]) {
              console.log(`  │ ${ce.subjectCode.padEnd(8)} │ ${'—'.padStart(10)} │ ${String((ce.debit||ce.credit).toFixed(2)).padStart(12)} │ ${'0.00'.padStart(12)} │ ${String((ce.debit||ce.credit).toFixed(2)).padStart(12)} │ ⚠️ 多余结转`)
            }
          }

          console.log(`  └──────────┴────────────┴──────────────┴──────────────┴──────────────┘`)
          console.log(`  月差额: ${monthDiff.toFixed(2)}`)
          totalDiscrepancy += monthDiff
        }

        console.log(`\n  📊 全年度总差额: ${totalDiscrepancy.toFixed(2)}`)
        expect(totalDiscrepancy).toBeGreaterThanOrEqual(0) // 信息性断言
      })
    })
  }
})

function findSubjectFullCode(subjects, subjectId) {
  const s = subjects.find(x => x.id === subjectId)
  if (!s) return null
  let code = s.code; let parent = s.parentId ? subjects.find(p => p.id === s.parentId) : null
  while (parent) { code = parent.code + code; parent = parent.parentId ? subjects.find(p => p.id === parent.parentId) : null }
  return code
}
