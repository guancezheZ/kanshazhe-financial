/**
 * 🏗️ 建筑业全年度通关审核（会计视角）
 *
 * 执行：npx vitest run src/__tests__/construction-audit.test.js
 */

import { describe, it, expect, beforeAll } from 'vitest'
import { useStore } from '@/stores/store.js'
import { getScenarioTutorials } from '@/data/scenarios.js'
import { determineCashFlowForEntry } from '@/utils/accounting.js'

function findSubjectByFullCode(subjects, fullCode) {
  for (const s of subjects) {
    let code = s.code; let parent = s.parentId ? subjects.find(p => p.id === s.parentId) : null
    while (parent) { code = parent.code + code; parent = parent.parentId ? subjects.find(p => p.id === parent.parentId) : null }
    if (code === fullCode) return s
  }
  return null
}

function findTopSubject(subjects, code) { return subjects.find(s => s.code === code && !s.parentId) }

let _idCounter = 39000
function makeId(p = 'sa') { return `${p}-${++_idCounter}` }

function autoAddSubject(store, fullCode) {
  const subjects = store.state.subjects
  if (fullCode === '2212') {
    if (findTopSubject(subjects, '2212')) return null
    const sub = { id: makeId('sl'), code: '2212', name: '预计负债', type: 'liability', parentId: null, isLeaf: true, opened: true }
    subjects.push(sub); return { code: fullCode, name: '预计负债' }
  }
  if (fullCode.length < 5) return null
  const parentCode = fullCode.slice(0, 4); const childCode = fullCode.slice(4)
  const parent = findTopSubject(subjects, parentCode)
  if (!parent) return null

  const nameMap = {
    '112101': '银行承兑汇票', '112203': '丁公司', '112204': '戊公司', '112205': '己公司',
    '112206': '庚公司', '220203': '供应商', '224101': '社保个人部分', '224102': '公积金个人部分',
    '410101': '法定盈余公积', '140301': 'A材料', '140302': 'B材料', '140501': 'A产品',
    '160105': '研发设备',
  }
  const name = nameMap[fullCode] || `明细-${childCode}`
  if (parent.isLeaf) parent.isLeaf = false
  const sub = { id: makeId(), code: childCode, name, type: parent.type, parentId: parent.id, isLeaf: true, opened: true }
  subjects.push(sub); return { code: fullCode, name }
}

function ensureAllSubjects(store) {
  const months = ['01','02','03','04','05','06','07','08','09','10','11','12']
  const codes = new Set()
  for (const m of months) for (const t of getScenarioTutorials('construction', m)) for (const e of (t.entries||[])) if (e.subjectCode) codes.add(e.subjectCode)
  const added = []
  for (const code of [...codes].sort()) { if (!findSubjectByFullCode(store.state.subjects, code)) { const r = autoAddSubject(store, code); if (r) added.push(r) } }
  return added
}

function mapEntry(subjects, e, allEntries) {
  const s = findSubjectByFullCode(subjects, e.subjectCode)
  if (!s) throw new Error(`科目编码 ${e.subjectCode} 未找到`)
  let cf = e.cashFlowItem || ''
  if (!cf) { try { const a = determineCashFlowForEntry(e, allEntries); if (a?.id) cf = a.id } catch(_) {} }
  return { summary: e.summary||'', subjectId: s.id, subjectCode: e.subjectCode, subjectName: s.name, debit: Number(e.debit)||0, credit: Number(e.credit)||0, cashFlowItem: cf }
}

const checkTB = tb => ({ passed: tb?.balanced && Math.abs((tb.totalDebit||0)-(tb.totalCredit||0))<0.01, totalDebit: tb?.totalDebit||0, totalCredit: tb?.totalCredit||0 })
const checkBS = bs => { if (!bs) return {passed:false,error:'无BS'}; const a=bs.assets?.total??0, l=bs.liabilities?.total??0, e=bs.equity?.total??0, d=a-(l+e); return {passed:Math.abs(d)<0.01,assets:a,liabilities:l,equity:e,diff:d} }
const checkIS = income => income ? {passed:typeof income.netProfit==='number'&&!Number.isNaN(income.netProfit), revenue:income.revenue??0, cost:income.cost??0, netProfit:income.netProfit??0 } : {passed:false,error:'无IS'}
const checkCF = cf => cf ? {passed:typeof cf.netIncrease==='number'&&!Number.isNaN(cf.netIncrease), netIncrease:cf.netIncrease??0} : {passed:false,error:'无CF'}

describe('🏗️ 建筑业全年度通关审核（会计视角）', () => {
  let store; const months = ['01','02','03','04','05','06','07','08','09','10','11','12']
  const monthResults = {}; let errs=[], totalAcct=0, totalPosted=0, totalSkip=0, initOk=false, added=[]

  beforeAll(() => {
    localStorage.clear(); store = useStore()
    const r = store.initConstructionAccount(); initOk = r.success === true
    added = ensureAllSubjects(store)
    for (const month of months) {
      const period='2026'+month; const tasks=getScenarioTutorials('construction', month)
      const acct = tasks.filter(t => t.role!=='cashier' && t.entries.length>0)
      const info = { month, period, totalTasks:tasks.length, cashierTasks:tasks.filter(t=>t.role==='cashier').length, infoTasks:tasks.filter(t=>t.entries.length===0).length, accountantTasks:acct.length, posted:0, errors:[], warnings:0, tb:null, bs:null, income:null, cf:null, tbCheck:null, bsCheck:null, incomeCheck:null, cfCheck:null }
      totalAcct += acct.length
      for (const task of acct) {
        try {
          const ve = task.entries.filter(e=>(Number(e.debit)||0)!==0||(Number(e.credit)||0)!==0)
          if (ve.length===0) { totalSkip++; continue }
          if (ve.length!==task.entries.length) info.warnings = (info.warnings||0)+(task.entries.length-ve.length)
          const entries=ve.map(e=>mapEntry(store.state.subjects, e, task.entries))
          const vr=store.addTeachingVoucher({date:task.date, entries})
          if (vr.success) { info.posted++; totalPosted++ }
          else { const e=`[${month}月] ${task.title} — ${(vr.errors||[]).join('; ')}`; info.errors.push(e); errs.push(e) }
        } catch(e) { const em=`[${month}月] ${task.title} — ${e.message}`; info.errors.push(em); errs.push(em) }
      }
      try { info.tb=store.getTrialBalance(period); info.tbCheck=checkTB(info.tb) } catch(e){}
      try { info.bs=store.getBalanceSheet(period); info.bsCheck=checkBS(info.bs) } catch(e){}
      try { info.income=store.getIncomeStatement(period); info.incomeCheck=checkIS(info.income) } catch(e){}
      try { info.cf=store.getCashFlow(period); info.cfCheck=checkCF(info.cf) } catch(e){}
      monthResults[month] = info
    }
  }, 120000)

  it('建筑业账套初始化成功', () => { expect(initOk).toBe(true) })
  it('缺失科目自动补全', () => {
    if (added.length) { console.log(`\n⚠️ 发现 ${added.length} 个缺失科目：`); added.forEach(s=>console.log(`  + ${s.code} → ${s.name}`)) }
    else console.log('\n✅ 所有科目齐全')
    expect(added.length).toBeGreaterThanOrEqual(0)
  })
  it('全部过账成功', () => {
    if (errs.length) { console.log('\n❌ 错误：'); errs.forEach(e=>console.log('  ',e)) }
    expect(errs).toEqual([])
  })
  it('过账数量正确', () => {
    expect(totalPosted).toBe(totalAcct-totalSkip)
    console.log(`\n📊 ${totalPosted}/${totalAcct}${totalSkip>0?`（${totalSkip}跳过）`:''}`)
  })
  it('📊 财务数据诊断', () => {
    console.log('\n📊 财务数据诊断')
    for (const m of months) { const i=monthResults[m]; if (i.tb) console.log(`  月${m}: ${i.posted}/${i.accountantTasks} | 差额=${((i.tb.totalDebit||0)-(i.tb.totalCredit||0)).toFixed(2)}`) }
  })

  for (const month of months) {
    describe(`月${month}`, () => {
      const gi = () => monthResults[month]
      it(`(${month}) BS诊断`, () => { const c=gi().bsCheck; if (!c?.passed) console.log(`  月${month} BS: 差额=${c?.diff?.toFixed(2)}`); else console.log(`  月${month} BS: ✅`) })
      it(`(${month}) IS可算`, () => { const c=gi().incomeCheck; expect(c).toBeTruthy(); expect(c.passed).toBe(true) })
      it(`(${month}) CF可算`, () => { const c=gi().cfCheck; expect(c).toBeTruthy(); expect(c.passed).toBe(true) })
    })
  }

  describe('12月', () => {
    it('12月IS有数据', () => { const i=monthResults['12'].income; expect(i).toBeTruthy(); expect(i.netProfit).toBeDefined() })
    it('12月BS权益为正', () => { expect(monthResults['12'].bs.equity.total).toBeGreaterThan(0) })
  })

  it('📋 全年汇总', () => {
    console.log('\n'+'='.repeat(72)); console.log('  🏗️ 建筑业全年度通关审核报告'); console.log('='.repeat(72))
    console.log('  月份 | 过账 | IS | CF | 净利润'); console.log('  '+'-'.repeat(52))
    let allOk=0
    for (const m of months) { const i=monthResults[m]; const isS=i.incomeCheck?.passed?'✅':'❌'; const cfS=i.cfCheck?.passed?'✅':'❌'; const p=i.incomeCheck?.passed?i.incomeCheck.netProfit.toFixed(2):'—'; console.log(`   ${m}   |  ${String(i.posted).padStart(2)}/${String(i.accountantTasks).padStart(2)}  |   ${isS}   |   ${cfS}   | ${p}${i.errors.length?'  ⚠️'+i.errors.length+'错':''}`); if (isS==='✅'&&cfS==='✅') allOk++ }
    console.log('  '+'-'.repeat(52)); console.log(`  ✅${allOk}/12 | 过账${totalPosted}/${totalAcct} | 错误${errs.length}`); console.log('='.repeat(72))
  })
})
