/**
 * 教学任务提交验证测试
 *
 * 对每个教学任务的正确答案调用 compareAnswers()，
 * 确保所有2,122个任务都能够正常提交通过。
 *
 * 核心验证：提交正确答案 → compareAnswers 返回全部成功。
 * 附带扫描：标记数据质量问题（如借贷均为0的空分录）但不阻断测试。
 */
import { describe, it, expect } from 'vitest'
import { getScenarioTutorials } from '@/data/scenarios.js'
import { compareAnswers } from '@/data/tutorials/year1.js'

const SCENARIOS = [
  { id: 'manufacturing', name: '制造业', count: 585 },
  { id: 'commercial', name: '商业企业', count: 531 },
  { id: 'service', name: '服务业', count: 490 },
  { id: 'construction', name: '建筑业', count: 501 },
]
const MONTHS = ['01','02','03','04','05','06','07','08','09','10','11','12']

describe('教学任务提交验证', () => {
  let totalTasks = 0
  let totalWithEntries = 0
  let totalZeroEntries = 0
  let dataWarnings = []

  for (const { id: sid, name, count } of SCENARIOS) {
    describe(`${name}（${count}任务）`, () => {
      for (const m of MONTHS) {
        it(`${m}月所有任务提交正确答案通过`, () => {
          const tasks = getScenarioTutorials(sid, m)
          const errors = []

          for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i]
            const taskKey = `${sid}/${m} #${i + 1}`

            // 跳过无分录任务（对账/查阅类——只点"确认已完成"）
            if (!task.entries || task.entries.length === 0) {
              continue
            }

            // 验证entries数据完整性
            for (let j = 0; j < task.entries.length; j++) {
              const ent = task.entries[j]
              if (!ent.subjectCode || typeof ent.subjectCode !== 'string') {
                errors.push(`${taskKey} "${task.title}": entry[${j}] 缺subjectCode`)
              }
              if (isNaN(Number(ent.debit)) || isNaN(Number(ent.credit))) {
                errors.push(`${taskKey} "${task.title}": entry[${j}] 金额非数字 debit=${ent.debit} credit=${ent.credit}`)
              }
              // 标记借贷均为0的空分录（不影响提交，但属数据质量问题）
              if ((Number(ent.debit) || 0) === 0 && (Number(ent.credit) || 0) === 0) {
                dataWarnings.push(`${taskKey} "${task.title}": entry[${j}] 借贷均为0（空分录）`)
              }
            }

            // ⭐ 核心验证：提交正确答案 → compareAnswers 应全部返回 success
            const result = compareAnswers(task.entries, task.entries)
            const failures = result.filter(r => r.type !== 'success')
            if (failures.length > 0) {
              errors.push(`${taskKey} "${task.title}": 正确答案提交失败 — ${failures.map(f => f.message).join('; ')}`)
            }
          }

          expect(errors).toEqual([])
        })
      }
    })
  }

  // 全局统计
  it('所有场景任务总数正确', () => {
    for (const { id: sid, name, count } of SCENARIOS) {
      let total = 0
      for (const m of MONTHS) total += getScenarioTutorials(sid, m).length
      expect(total).toBe(count)
    }
  })

  // 汇总数据质量问题（不阻断测试）
  it('数据质量扫描汇总', () => {
    // 计算总任务数和有分录的任务数
    let withEntries = 0
    let zeroEntries = 0
    for (const { id: sid } of SCENARIOS) {
      for (const m of MONTHS) {
        for (const task of getScenarioTutorials(sid, m)) {
          if (task.entries && task.entries.length > 0) {
            withEntries++
            for (const ent of task.entries) {
              if ((Number(ent.debit) || 0) === 0 && (Number(ent.credit) || 0) === 0) {
                zeroEntries++
              }
            }
          }
        }
      }
    }

    console.log(`\n📊 提交验证数据统计：`)
    console.log(`   总任务数: ${SCENARIOS.reduce((s, c) => s + c.count, 0)}`)
    console.log(`   有分录任务: ${withEntries}`)
    console.log(`   空分录(借贷均为0): ${zeroEntries}条`)

    // 输出所有数据质量警告（仅当有警告时）
    if (dataWarnings.length > 0) {
      console.log(`\n⚠️ 数据质量扫描 — ${dataWarnings.length} 个警告（不影响提交，建议第3轮修复）：`)
      for (const w of dataWarnings.slice(0, 30)) {
        console.log(`   ${w}`)
      }
      if (dataWarnings.length > 30) {
        console.log(`   ... 还有 ${dataWarnings.length - 30} 条`)
      }
    }

    // 不强制断言，仅汇总
    expect(true).toBe(true)
  })
})
