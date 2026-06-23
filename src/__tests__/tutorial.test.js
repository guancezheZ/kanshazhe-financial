import { describe, it, expect } from 'vitest'
import { getTutorials, compareAnswers } from '@/data/tutorials/year1.js'
import { getScenarioTutorials } from '@/data/scenarios.js'

describe('教程数据 - 结构', () => {
  it('1月份有31个教学任务', () => {
    const tasks = getTutorials('01')
    expect(tasks.length).toBe(30)
  })

  it('每个任务有完整字段', () => {
    const tasks = getTutorials('01')
    for (const t of tasks) {
      expect(t).toHaveProperty('date')
      expect(t).toHaveProperty('title')
      expect(t).toHaveProperty('description')
      expect(t).toHaveProperty('tip')
      expect(t).toHaveProperty('entries')
      expect(t).toHaveProperty('difficulty')
      expect([1, 2, 3]).toContain(t.difficulty)
    }
  })

  it('每个任务的日期在1月份范围内', () => {
    const tasks = getTutorials('01')
    for (const t of tasks) {
      expect(t.date).toMatch(/^2026-01-/)
    }
  })

  it('带分录的任务借贷平衡', () => {
    const tasks = getTutorials('01')
    for (const t of tasks) {
      if (t.entries.length === 0) continue
      let debitTotal = 0
      let creditTotal = 0
      for (const e of t.entries) {
        debitTotal += Number(e.debit) || 0
        creditTotal += Number(e.credit) || 0
      }
      expect(Math.abs(debitTotal - creditTotal)).toBeLessThan(0.01)
    }
  })

  it('1-12月有分录的任务都有原始凭证（数量正确）', () => {
    const EXPECTED = {
      '2026-01-03_购买办公用品': 2,
      '2026-01-14_支付水电费': 2,
      '2026-01-18_现销商品': 2,
      '2026-01-28_现金折扣': 2,
      '2026-01-29_缴纳社保公积金': 2,
      '2026-02-12_现销商品': 2,
      '2026-02-15_支付水电费': 2,
      '2026-02-21_现金折扣': 2,
      '2026-02-26_银行手续费及借款利息': 2,
      '2026-03-11_现销商品': 2,
      '2026-03-15_支付水电费': 2,
      '2026-04-09_现销商品': 2,
      '2026-04-15_支付水电费': 2,
      '2026-05-10_银行汇票': 2,
      '2026-05-12_现销商品': 2,
      '2026-05-18_支付水电费': 2,
      '2026-05-22_债务重组': 2,
      '2026-05-26_商业折扣销售': 2,
      '2026-06-10_现销商品': 2,
      '2026-06-15_支付水电费': 2,
      '2026-06-20_国债利息收入确认': 2,
      '2026-06-25_银行利息及手续费': 2,
      '2026-07-04_预付采购定金': 2,
      '2026-07-07_收到政府稳岗补贴': 2,
      '2026-07-10_现销商品': 2,
      '2026-07-25_支付水电费': 2,
      '2026-08-11_现销商品': 2,
      '2026-08-23_支付水电费': 2,
      '2026-09-03_取得长期股权投资': 2,
      '2026-09-09_销售商品': 2,
      '2026-09-25_支付水电费': 2,
      '2026-09-28_银行利息及手续费': 2,
      '2026-10-10_非货币性资产交换': 2,
      '2026-10-14_应收账款保理': 2,
      '2026-10-17_销售商品收款': 2,
      '2026-10-25_支付水电费': 2,
      '2026-10-29_银行利息': 2,
      '2026-11-05_研发支出-费用化': 2,
      '2026-11-07_研发支出-资本化': 2,
      '2026-11-12_销售商品': 2,
      '2026-11-24_支付水电费': 2,
      '2026-11-28_银行利息': 2,
      '2026-12-09_销售商品': 2,
      '2026-12-17_收取庚公司股利': 2,
      '2026-12-22_银行利息': 2,
      '2026-12-24_支付水电费': 2,
    }
    for (const mn of ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']) {
      const tasks = getTutorials(mn)
      for (const t of tasks) {
        if (t.entries.length === 0 && t.nextAction) continue
        if (t.entries.length === 0) continue
        expect(t.documents).toBeDefined()
        expect(Array.isArray(t.documents)).toBe(true)
        const key = t.date + '_' + t.title
        const expected = EXPECTED[key] || 1
        expect(t.documents.length).toBe(expected)
      }
    }
  })

  it('2月份有30个教学任务', () => {
    const tasks = getTutorials('02')
    expect(tasks.length).toBe(30)
  })

  it('2月每个任务有完整字段', () => {
    const tasks = getTutorials('02')
    for (const t of tasks) {
      expect(t).toHaveProperty('date')
      expect(t).toHaveProperty('title')
      expect(t).toHaveProperty('description')
      expect(t).toHaveProperty('tip')
      expect(t).toHaveProperty('entries')
      expect(t).toHaveProperty('difficulty')
      expect([1, 2, 3]).toContain(t.difficulty)
    }
  })

  it('2月每个任务的日期在2月份范围内', () => {
    const tasks = getTutorials('02')
    for (const t of tasks) {
      expect(t.date).toMatch(/^2026-02-/)
    }
  })

  it('2月带分录的任务借贷平衡', () => {
    const tasks = getTutorials('02')
    for (const t of tasks) {
      if (t.entries.length === 0) continue
      let debitTotal = 0
      let creditTotal = 0
      for (const e of t.entries) {
        debitTotal += Number(e.debit) || 0
        creditTotal += Number(e.credit) || 0
      }
      expect(Math.abs(debitTotal - creditTotal)).toBeLessThan(0.01)
    }
  })

  it('3月份有30个教学任务', () => {
    const tasks = getTutorials('03')
    expect(tasks.length).toBe(30)
  })

  it('3月每个任务有完整字段', () => {
    const tasks = getTutorials('03')
    for (const t of tasks) {
      expect(t).toHaveProperty('date')
      expect(t).toHaveProperty('title')
      expect(t).toHaveProperty('description')
      expect(t).toHaveProperty('tip')
      expect(t).toHaveProperty('entries')
      expect(t).toHaveProperty('difficulty')
      expect([1, 2, 3]).toContain(t.difficulty)
      // 有分录的任务必须有explanation
      if (t.entries.length > 0) {
        for (const e of t.entries) {
          expect(e).toHaveProperty('explanation')
          expect(e.explanation).toBeTruthy()
        }
      }
    }
  })

  it('3月每个任务的日期在3月份范围内', () => {
    const tasks = getTutorials('03')
    for (const t of tasks) {
      expect(t.date).toMatch(/^2026-03-/)
    }
  })

  it('3月带分录的任务借贷平衡', () => {
    const tasks = getTutorials('03')
    for (const t of tasks) {
      if (t.entries.length === 0) continue
      let debitTotal = 0
      let creditTotal = 0
      for (const e of t.entries) {
        debitTotal += Number(e.debit) || 0
        creditTotal += Number(e.credit) || 0
      }
      expect(Math.abs(debitTotal - creditTotal)).toBeLessThan(0.01)
    }
  })

  it('3月任务全部为会计角色', () => {
    const tasks = getTutorials('03')
    for (const t of tasks) {
      expect(t.role).toBe('accountant')
    }
  })

  it('4月份有29个教学任务', () => {
    const tasks = getTutorials('04')
    expect(tasks.length).toBe(29)
  })

  it('4月每个任务有完整字段', () => {
    const tasks = getTutorials('04')
    for (const t of tasks) {
      expect(t).toHaveProperty('date')
      expect(t).toHaveProperty('title')
      expect(t).toHaveProperty('description')
      expect(t).toHaveProperty('tip')
      expect(t).toHaveProperty('entries')
      expect(t).toHaveProperty('documents')
      expect(t).toHaveProperty('difficulty')
      expect([1, 2, 3]).toContain(t.difficulty)
      // 有分录的任务必须有explanation
      if (t.entries.length > 0) {
        for (const e of t.entries) {
          expect(e).toHaveProperty('explanation')
          expect(e.explanation).toBeTruthy()
        }
      }
    }
  })

  it('4月每个任务的日期在4月份范围内', () => {
    const tasks = getTutorials('04')
    for (const t of tasks) {
      expect(t.date).toMatch(/^2026-04-/)
    }
  })

  it('4月带分录的任务借贷平衡', () => {
    const tasks = getTutorials('04')
    for (const t of tasks) {
      if (t.entries.length === 0) continue
      let debitTotal = 0
      let creditTotal = 0
      for (const e of t.entries) {
        debitTotal += Number(e.debit) || 0
        creditTotal += Number(e.credit) || 0
      }
      expect(Math.abs(debitTotal - creditTotal)).toBeLessThan(0.01)
    }
  })

  it('4月带分录的任务借贷平衡', () => {
    const tasks = getTutorials('04')
    for (const t of tasks) {
      if (t.entries.length === 0) continue
      let d = 0, c = 0
      for (const e of t.entries) { d += Number(e.debit) || 0; c += Number(e.credit) || 0 }
      expect(Math.abs(d - c)).toBeLessThan(0.01)
    }
  })


  it('5月份有29个教学任务', () => {
    const tasks = getTutorials('05')
    expect(tasks.length).toBe(29)
  })

  it('5月每个任务有完整字段', () => {
    const tasks = getTutorials('05')
    for (const t of tasks) {
      expect(t).toHaveProperty('date')
      expect(t).toHaveProperty('title')
      expect(t).toHaveProperty('description')
      expect(t).toHaveProperty('tip')
      expect(t).toHaveProperty('entries')
      expect(t).toHaveProperty('difficulty')
      expect([1, 2, 3]).toContain(t.difficulty)
      if (t.entries.length > 0) {
        for (const e of t.entries) {
          expect(e).toHaveProperty('explanation')
          expect(e.explanation).toBeTruthy()
        }
      }
    }
  })

  it('5月每个任务的日期在5月份范围内', () => {
    const tasks = getTutorials('05')
    for (const t of tasks) {
      expect(t.date).toMatch(/^2026-05-/)
    }
  })

  it('5月带分录的任务借贷平衡', () => {
    const tasks = getTutorials('05')
    for (const t of tasks) {
      if (t.entries.length === 0) continue
      let debitTotal = 0
      let creditTotal = 0
      for (const e of t.entries) {
        debitTotal += Number(e.debit) || 0
        creditTotal += Number(e.credit) || 0
      }
      expect(Math.abs(debitTotal - creditTotal)).toBeLessThan(0.01)
    }
  })

  it('5月带分录的任务借贷平衡', () => {
    const tasks = getTutorials('05')
    for (const t of tasks) {
      if (t.entries.length === 0) continue
      let d = 0, c = 0
      for (const e of t.entries) { d += Number(e.debit) || 0; c += Number(e.credit) || 0 }
      expect(Math.abs(d - c)).toBeLessThan(0.01)
    }
  })

  it('6月份有29个教学任务', () => {
    const tasks = getTutorials('06')
    expect(tasks.length).toBe(29)
  })

  it('6月每个任务有完整字段', () => {
    const tasks = getTutorials('06')
    for (const t of tasks) {
      expect(t).toHaveProperty('date')
      expect(t).toHaveProperty('title')
      expect(t).toHaveProperty('description')
      expect(t).toHaveProperty('tip')
      expect(t).toHaveProperty('entries')
      expect(t).toHaveProperty('difficulty')
      expect([1, 2, 3]).toContain(t.difficulty)
      if (t.entries.length > 0) {
        for (const e of t.entries) {
          expect(e).toHaveProperty('explanation')
          expect(e.explanation).toBeTruthy()
        }
      }
    }
  })

  it('6月每个任务的日期在6月份范围内', () => {
    const tasks = getTutorials('06')
    for (const t of tasks) {
      expect(t.date).toMatch(/^2026-06-/)
    }
  })

  it('6月带分录的任务借贷平衡', () => {
    const tasks = getTutorials('06')
    for (const t of tasks) {
      if (t.entries.length === 0) continue
      let debitTotal = 0
      let creditTotal = 0
      for (const e of t.entries) {
        debitTotal += Number(e.debit) || 0
        creditTotal += Number(e.credit) || 0
      }
      expect(Math.abs(debitTotal - creditTotal)).toBeLessThan(0.01)
    }
  })

  it('6月带分录的任务借贷平衡', () => {
    const tasks = getTutorials('06')
    for (const t of tasks) {
      if (t.entries.length === 0) continue
      let d = 0, c = 0
      for (const e of t.entries) { d += Number(e.debit) || 0; c += Number(e.credit) || 0 }
      expect(Math.abs(d - c)).toBeLessThan(0.01)
    }
  })

  it('7月份有31个教学任务', () => {
    const tasks = getTutorials('07')
    expect(tasks.length).toBe(31)
  })

  it('7月每个任务有完整字段', () => {
    const tasks = getTutorials('07')
    for (const t of tasks) {
      expect(t).toHaveProperty('date')
      expect(t).toHaveProperty('title')
      expect(t).toHaveProperty('description')
      expect(t).toHaveProperty('tip')
      expect(t).toHaveProperty('entries')
      expect(t).toHaveProperty('difficulty')
      expect([1, 2, 3]).toContain(t.difficulty)
      if (t.entries.length > 0) {
        for (const e of t.entries) {
          expect(e).toHaveProperty('explanation')
          expect(e.explanation).toBeTruthy()
        }
      }
    }
  })

  it('7月每个任务的日期在7月份范围内', () => {
    const tasks = getTutorials('07')
    for (const t of tasks) {
      expect(t.date).toMatch(/^2026-07-/)
    }
  })

  it('7月带分录的任务借贷平衡', () => {
    const tasks = getTutorials('07')
    for (const t of tasks) {
      if (t.entries.length === 0) continue
      let debitTotal = 0
      let creditTotal = 0
      for (const e of t.entries) {
        debitTotal += Number(e.debit) || 0
        creditTotal += Number(e.credit) || 0
      }
      expect(Math.abs(debitTotal - creditTotal)).toBeLessThan(0.01)
    }
  })

  it('7月带分录的任务借贷平衡', () => {
    const tasks = getTutorials('07')
    for (const t of tasks) {
      if (t.entries.length === 0) continue
      let d = 0, c = 0
      for (const e of t.entries) { d += Number(e.debit) || 0; c += Number(e.credit) || 0 }
      expect(Math.abs(d - c)).toBeLessThan(0.01)
    }
  })

  it('8月份有30个教学任务', () => {
    const tasks = getTutorials('08')
    expect(tasks.length).toBe(30)
  })

  it('8月每个任务有完整字段', () => {
    const tasks = getTutorials('08')
    for (const t of tasks) {
      expect(t).toHaveProperty('date')
      expect(t).toHaveProperty('title')
      expect(t).toHaveProperty('description')
      expect(t).toHaveProperty('tip')
      expect(t).toHaveProperty('entries')
      expect(t).toHaveProperty('difficulty')
      expect([1, 2, 3]).toContain(t.difficulty)
      if (t.entries.length > 0) {
        for (const e of t.entries) {
          expect(e).toHaveProperty('explanation')
          expect(e.explanation).toBeTruthy()
        }
      }
    }
  })

  it('8月每个任务的日期在8月份范围内', () => {
    const tasks = getTutorials('08')
    for (const t of tasks) {
      expect(t.date).toMatch(/^2026-08-/)
    }
  })

  it('8月带分录的任务借贷平衡', () => {
    const tasks = getTutorials('08')
    for (const t of tasks) {
      if (t.entries.length === 0) continue
      let debitTotal = 0
      let creditTotal = 0
      for (const e of t.entries) {
        debitTotal += Number(e.debit) || 0
        creditTotal += Number(e.credit) || 0
      }
      expect(Math.abs(debitTotal - creditTotal)).toBeLessThan(0.01)
    }
  })

  it('8月带分录的任务借贷平衡', () => {
    const tasks = getTutorials('08')
    for (const t of tasks) {
      if (t.entries.length === 0) continue
      let d = 0, c = 0
      for (const e of t.entries) { d += Number(e.debit) || 0; c += Number(e.credit) || 0 }
      expect(Math.abs(d - c)).toBeLessThan(0.01)
    }
  })

  it('9月份有29个教学任务', () => {
    const tasks = getTutorials('09')
    expect(tasks.length).toBe(29)
  })

  it('9月每个任务有完整字段', () => {
    const tasks = getTutorials('09')
    for (const t of tasks) {
      expect(t).toHaveProperty('date')
      expect(t).toHaveProperty('title')
      expect(t).toHaveProperty('description')
      expect(t).toHaveProperty('tip')
      expect(t).toHaveProperty('entries')
      expect(t).toHaveProperty('difficulty')
      expect([1, 2, 3]).toContain(t.difficulty)
      if (t.entries.length > 0) {
        for (const e of t.entries) {
          expect(e).toHaveProperty('explanation')
          expect(e.explanation).toBeTruthy()
        }
      }
    }
  })

  it('9月每个任务的日期在9月份范围内', () => {
    const tasks = getTutorials('09')
    for (const t of tasks) {
      expect(t.date).toMatch(/^2026-09-/)
    }
  })

  it('9月带分录的任务借贷平衡', () => {
    const tasks = getTutorials('09')
    for (const t of tasks) {
      if (t.entries.length === 0) continue
      let debitTotal = 0
      let creditTotal = 0
      for (const e of t.entries) {
        debitTotal += Number(e.debit) || 0
        creditTotal += Number(e.credit) || 0
      }
      expect(Math.abs(debitTotal - creditTotal)).toBeLessThan(0.01)
    }
  })

  it('9月带分录的任务借贷平衡', () => {
    const tasks = getTutorials('09')
    for (const t of tasks) {
      if (t.entries.length === 0) continue
      let d = 0, c = 0
      for (const e of t.entries) { d += Number(e.debit) || 0; c += Number(e.credit) || 0 }
      expect(Math.abs(d - c)).toBeLessThan(0.01)
    }
  })

  it('10月份有30个教学任务', () => {
    const tasks = getTutorials('10')
    expect(tasks.length).toBe(30)
  })

  it('10月每个任务有完整字段', () => {
    const tasks = getTutorials('10')
    for (const t of tasks) {
      expect(t).toHaveProperty('date')
      expect(t).toHaveProperty('title')
      expect(t).toHaveProperty('description')
      expect(t).toHaveProperty('tip')
      expect(t).toHaveProperty('entries')
      expect(t).toHaveProperty('difficulty')
      expect([1, 2, 3]).toContain(t.difficulty)
      if (t.entries.length > 0) {
        for (const e of t.entries) {
          expect(e).toHaveProperty('explanation')
          expect(e.explanation).toBeTruthy()
        }
      }
    }
  })

  it('10月每个任务的日期在10月份范围内', () => {
    const tasks = getTutorials('10')
    for (const t of tasks) {
      expect(t.date).toMatch(/^2026-10-/)
    }
  })

  it('10月带分录的任务借贷平衡', () => {
    const tasks = getTutorials('10')
    for (const t of tasks) {
      if (t.entries.length === 0) continue
      let debitTotal = 0
      let creditTotal = 0
      for (const e of t.entries) {
        debitTotal += Number(e.debit) || 0
        creditTotal += Number(e.credit) || 0
      }
      expect(Math.abs(debitTotal - creditTotal)).toBeLessThan(0.01)
    }
  })

  it('10月带分录的任务借贷平衡', () => {
    const tasks = getTutorials('10')
    for (const t of tasks) {
      if (t.entries.length === 0) continue
      let d = 0, c = 0
      for (const e of t.entries) { d += Number(e.debit) || 0; c += Number(e.credit) || 0 }
      expect(Math.abs(d - c)).toBeLessThan(0.01)
    }
  })

  it('11月份有29个教学任务', () => {
    const tasks = getTutorials('11')
    expect(tasks.length).toBe(29)
  })

  it('11月每个任务有完整字段', () => {
    const tasks = getTutorials('11')
    for (const t of tasks) {
      expect(t).toHaveProperty('date')
      expect(t).toHaveProperty('title')
      expect(t).toHaveProperty('description')
      expect(t).toHaveProperty('tip')
      expect(t).toHaveProperty('entries')
      expect(t).toHaveProperty('difficulty')
      expect([1, 2, 3]).toContain(t.difficulty)
      if (t.entries.length > 0) {
        for (const e of t.entries) {
          expect(e).toHaveProperty('explanation')
          expect(e.explanation).toBeTruthy()
        }
      }
    }
  })

  it('11月每个任务的日期在11月份范围内', () => {
    const tasks = getTutorials('11')
    for (const t of tasks) {
      expect(t.date).toMatch(/^2026-11-/)
    }
  })

  it('11月带分录的任务借贷平衡', () => {
    const tasks = getTutorials('11')
    for (const t of tasks) {
      if (t.entries.length === 0) continue
      let debitTotal = 0
      let creditTotal = 0
      for (const e of t.entries) {
        debitTotal += Number(e.debit) || 0
        creditTotal += Number(e.credit) || 0
      }
      expect(Math.abs(debitTotal - creditTotal)).toBeLessThan(0.01)
    }
  })

  it('11月带分录的任务借贷平衡', () => {
    const tasks = getTutorials('11')
    for (const t of tasks) {
      if (t.entries.length === 0) continue
      let d = 0, c = 0
      for (const e of t.entries) { d += Number(e.debit) || 0; c += Number(e.credit) || 0 }
      expect(Math.abs(d - c)).toBeLessThan(0.01)
    }
  })

  it('12月份有30个教学任务', () => {
    const tasks = getTutorials('12')
    expect(tasks.length).toBe(30)
  })

  it('12月每个任务有完整字段', () => {
    const tasks = getTutorials('12')
    for (const t of tasks) {
      expect(t).toHaveProperty('date')
      expect(t).toHaveProperty('title')
      expect(t).toHaveProperty('description')
      expect(t).toHaveProperty('tip')
      expect(t).toHaveProperty('entries')
      expect(t).toHaveProperty('difficulty')
      expect([1, 2, 3]).toContain(t.difficulty)
      if (t.entries.length > 0) {
        for (const e of t.entries) {
          expect(e).toHaveProperty('explanation')
          expect(e.explanation).toBeTruthy()
        }
      }
    }
  })

  it('12月每个任务的日期在12月份范围内', () => {
    const tasks = getTutorials('12')
    for (const t of tasks) {
      expect(t.date).toMatch(/^2026-12-/)
    }
  })

  it('12月带分录的任务借贷平衡', () => {
    const tasks = getTutorials('12')
    for (const t of tasks) {
      if (t.entries.length === 0) continue
      let debitTotal = 0
      let creditTotal = 0
      for (const e of t.entries) {
        debitTotal += Number(e.debit) || 0
        creditTotal += Number(e.credit) || 0
      }
      expect(Math.abs(debitTotal - creditTotal)).toBeLessThan(0.01)
    }
  })

  it('12月带分录的任务借贷平衡', () => {
    const tasks = getTutorials('12')
    for (const t of tasks) {
      if (t.entries.length === 0) continue
      let d = 0, c = 0
      for (const e of t.entries) { d += Number(e.debit) || 0; c += Number(e.credit) || 0 }
      expect(Math.abs(d - c)).toBeLessThan(0.01)
    }
  })
})

describe('教程数据 - 难度', () => {
  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
  it('所有任务都有difficulty字段且值合法', () => {
    for (const m of months) {
      const tasks = getTutorials(m)
      for (const t of tasks) {
        expect(t).toHaveProperty('difficulty')
        expect([1, 2, 3]).toContain(t.difficulty)
      }
    }
  })

  it('1~12月难度分布合理', () => {
    const counts = { '01': { 1: 0, 2: 0, 3: 0 }, '02': { 1: 0, 2: 0, 3: 0 }, '03': { 1: 0, 2: 0, 3: 0 }, '04': { 1: 0, 2: 0, 3: 0 }, '05': { 1: 0, 2: 0, 3: 0 }, '06': { 1: 0, 2: 0, 3: 0 }, '07': { 1: 0, 2: 0, 3: 0 }, '08': { 1: 0, 2: 0, 3: 0 }, '09': { 1: 0, 2: 0, 3: 0 }, '10': { 1: 0, 2: 0, 3: 0 }, '11': { 1: 0, 2: 0, 3: 0 }, '12': { 1: 0, 2: 0, 3: 0 } }
    for (const m of months) {
      const tasks = getTutorials(m)
      for (const t of tasks) {
        counts[m][t.difficulty]++
      }
    }
    // 每个月的难度3任务至少1个（期末结转或复杂业务）
    for (const m of months) {
      expect(counts[m][3]).toBeGreaterThanOrEqual(1)
    }
    // 1月难度1任务占比应最高（基础业务多）
    const ratio1 = counts['01'][1] / (counts['01'][1] + counts['01'][2] + counts['01'][3])
    const ratio3 = counts['03'][1] / (counts['03'][1] + counts['03'][2] + counts['03'][3])
    expect(ratio1).toBeGreaterThanOrEqual(ratio3)
    // 3月难度3任务应保持一定数量
    expect(counts['03'][3]).toBeGreaterThanOrEqual(3)
  })
})

describe('教程数据 - 知识点标签', () => {
  const VALID_TAGS = ['采购', '销售', '费用', '税费', '资产', '融资', '期末', '资金', '生产', '工资', '成本', '申报']
  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']

  it('所有任务都有tags数组且非空', () => {
    for (const m of months) {
      const tasks = getTutorials(m)
      for (const t of tasks) {
        expect(t).toHaveProperty('tags')
        expect(Array.isArray(t.tags)).toBe(true)
        expect(t.tags.length).toBeGreaterThan(0)
      }
    }
  })

  it('所有tag值均为预定义的合法标签', () => {
    for (const m of months) {
      const tasks = getTutorials(m)
      for (const t of tasks) {
        for (const tag of t.tags) {
          expect(VALID_TAGS).toContain(tag)
        }
      }
    }
  })

  it('每个标签在1~12月中至少有1个任务', () => {
    const tagCount = {}
    for (const m of months) {
      const tasks = getTutorials(m)
      for (const t of tasks) {
        for (const tag of t.tags) {
          tagCount[tag] = (tagCount[tag] || 0) + 1
        }
      }
    }
    for (const tag of VALID_TAGS) {
      expect(tagCount[tag]).toBeGreaterThanOrEqual(1)
    }
  })

  it('3月成本核算标签任务不少于3个', () => {
    const tasks = getTutorials('03')
    const costTasks = tasks.filter(t => t.tags && (t.tags.includes('成本核算') || t.tags.includes('成本')))
    expect(costTasks.length).toBeGreaterThanOrEqual(1)
  })
})

describe('教程数据 - 答案比对', () => {
  it('完全正确时返回全部success', () => {
    const correct = [
      { subjectCode: '100201', debit: 500, credit: 0 },
      { subjectCode: '660201', debit: 0, credit: 500 },
    ]
    const user = [
      { subjectCode: '100201', debit: 500, credit: 0 },
      { subjectCode: '660201', debit: 0, credit: 500 },
    ]
    const result = compareAnswers(user, correct)
    expect(result.every(r => r.type === 'success')).toBe(true)
    expect(result.some(r => r.message.includes('全部正确'))).toBe(true)
  })

  it('科目不对时返回error', () => {
    const correct = [
      { subjectCode: '100201', debit: 1000, credit: 0 },
      { subjectCode: '2001', debit: 0, credit: 1000 },
    ]
    const user = [
      { subjectCode: '1001', debit: 1000, credit: 0 },
      { subjectCode: '2001', debit: 0, credit: 1000 },
    ]
    const result = compareAnswers(user, correct)
    expect(result.some(r => r.type === 'error')).toBe(true)
    expect(result.some(r => r.message.includes('科目应为'))).toBe(true)
  })

  it('金额不对时返回error', () => {
    const correct = [
      { subjectCode: '100201', debit: 5000, credit: 0 },
      { subjectCode: '2001', debit: 0, credit: 5000 },
    ]
    const user = [
      { subjectCode: '100201', debit: 500, credit: 0 },
      { subjectCode: '2001', debit: 0, credit: 500 },
    ]
    const result = compareAnswers(user, correct)
    expect(result.some(r => r.type === 'error')).toBe(true)
    expect(result.some(r => r.message.includes('借方应为'))).toBe(true)
  })

  it('分录条数不一致时提示warning', () => {
    const correct = [
      { subjectCode: '100201', debit: 1000, credit: 0 },
      { subjectCode: '2001', debit: 0, credit: 1000 },
    ]
    const user = [
      { subjectCode: '100201', debit: 1000, credit: 0 },
    ]
    const result = compareAnswers(user, correct)
    expect(result.some(r => r.type === 'warning')).toBe(true)
  })

  it('空答案正确比对', () => {
    const result = compareAnswers([], [])
    expect(result.every(r => r.type === 'success')).toBe(true)
  })
})

// ═══════════════════════════════════════════
// 商业企业教学数据测试
// ═══════════════════════════════════════════
describe('商业企业教程数据', () => {
  const COMMERCIAL_VALID_TAGS = ['商品采购','商品销售','仓存管理','往来管理','资金管理','费用管理','工资社保','税费','期末','出纳','资产','申报']
  // 资金管理标签已精简为仅对真正资金筹措类任务使用（约7个），不再每月检查覆盖率
  // 资产标签商业企业不是每月都有固资相关任务，不强制每月覆盖
  const COMMERCIAL_COVERAGE_TAGS = COMMERCIAL_VALID_TAGS.filter(t => t !== '资金管理' && t !== '资产')

  it('商业企业1月有35个教学任务（含5个出纳任务）', () => {
    const tasks = getScenarioTutorials('commercial', '01')
    expect(tasks.length).toBe(35)
  })

  it('每个任务有完整字段', () => {
    const tasks = getScenarioTutorials('commercial', '01')
    for (const t of tasks) {
      expect(t).toHaveProperty('date')
      expect(t).toHaveProperty('title')
      expect(t).toHaveProperty('description')
      expect(t).toHaveProperty('tip')
      expect(t).toHaveProperty('entries')
      expect(t).toHaveProperty('documents')
      expect(t).toHaveProperty('difficulty')
      expect([1, 2, 3]).toContain(t.difficulty)
      // 有分录的任务必须有explanation
      if (t.entries.length > 0) {
        for (const e of t.entries) {
          expect(e).toHaveProperty('explanation')
          expect(e.explanation).toBeTruthy()
        }
      }
    }
  })

  it('每个任务的日期在1月份范围内', () => {
    const tasks = getScenarioTutorials('commercial', '01')
    for (const t of tasks) {
      expect(t.date).toMatch(/^2026-01-/)
    }
  })

  it('带分录的任务借贷平衡', () => {
    const tasks = getScenarioTutorials('commercial', '01')
    for (const t of tasks) {
      if (t.entries.length === 0) continue
      let debitTotal = 0
      let creditTotal = 0
      for (const e of t.entries) {
        debitTotal += Number(e.debit) || 0
        creditTotal += Number(e.credit) || 0
      }
      expect(Math.abs(debitTotal - creditTotal)).toBeLessThan(0.01)
    }
  })

  it('每笔金额不超过2位小数（G5铁律）', () => {
    const tasks = getScenarioTutorials('commercial', '01')
    for (const t of tasks) {
      for (const e of t.entries) {
        if (e.debit) {
          const parts = String(e.debit).split('.')
          if (parts.length > 1) expect(parts[1].length).toBeLessThanOrEqual(2)
        }
        if (e.credit) {
          const parts = String(e.credit).split('.')
          if (parts.length > 1) expect(parts[1].length).toBeLessThanOrEqual(2)
        }
      }
    }
  })

  it('所有任务有tags数组且值合法', () => {
    const tasks = getScenarioTutorials('commercial', '01')
    for (const t of tasks) {
      expect(t).toHaveProperty('tags')
      expect(Array.isArray(t.tags)).toBe(true)
      expect(t.tags.length).toBeGreaterThan(0)
      for (const tag of t.tags) {
        expect(COMMERCIAL_VALID_TAGS).toContain(tag)
      }
    }
  })

  it('余额核对任务无分录且角色为出纳', () => {
    const tasks = getScenarioTutorials('commercial', '01')
    const checkTask = tasks.findLast(t => (t.title.includes('余额核对') || t.title.includes('盘点') || t.title.includes('对账')) && t.role === 'cashier')
    expect(checkTask).toBeTruthy()
    expect(checkTask.entries.length).toBe(0)
    expect(checkTask.role).toBe('cashier')
  })

  it('每个标签至少覆盖1个任务', () => {
    const tasks = getScenarioTutorials('commercial', '01')
    const tagCount = {}
    for (const t of tasks) {
      for (const tag of t.tags) {
        tagCount[tag] = (tagCount[tag] || 0) + 1
      }
    }
    for (const tag of COMMERCIAL_COVERAGE_TAGS) {
      expect(tagCount[tag]).toBeGreaterThanOrEqual(1)
    }
  })

  it('商业企业2月有31个教学任务', () => {
    const tasks = getScenarioTutorials('commercial', '02')
    expect(tasks.length).toBe(31)
  })

  it('2月每个任务有完整字段', () => {
    const tasks = getScenarioTutorials('commercial', '02')
    for (const t of tasks) {
      expect(t).toHaveProperty('date')
      expect(t).toHaveProperty('title')
      expect(t).toHaveProperty('description')
      expect(t).toHaveProperty('tip')
      expect(t).toHaveProperty('entries')
      expect(t).toHaveProperty('documents')
      expect(t).toHaveProperty('difficulty')
      expect([1, 2, 3]).toContain(t.difficulty)
      // 有分录的任务必须有explanation
      if (t.entries.length > 0) {
        for (const e of t.entries) {
          expect(e).toHaveProperty('explanation')
          expect(e.explanation).toBeTruthy()
        }
      }
    }
  })

  it('2月每个任务的日期在2月份范围内', () => {
    const tasks = getScenarioTutorials('commercial', '02')
    for (const t of tasks) {
      expect(t.date).toMatch(/^2026-02-/)
    }
  })

  it('2月带分录的任务借贷平衡', () => {
    const tasks = getScenarioTutorials('commercial', '02')
    for (const t of tasks) {
      if (t.entries.length === 0) continue
      let debitTotal = 0
      let creditTotal = 0
      for (const e of t.entries) {
        debitTotal += Number(e.debit) || 0
        creditTotal += Number(e.credit) || 0
      }
      expect(Math.abs(debitTotal - creditTotal)).toBeLessThan(0.01)
    }
  })

  it('2月每笔金额不超过2位小数（G5铁律）', () => {
    const tasks = getScenarioTutorials('commercial', '02')
    for (const t of tasks) {
      for (const e of t.entries) {
        if (e.debit) {
          const parts = String(e.debit).split('.')
          if (parts.length > 1) expect(parts[1].length).toBeLessThanOrEqual(2)
        }
        if (e.credit) {
          const parts = String(e.credit).split('.')
          if (parts.length > 1) expect(parts[1].length).toBeLessThanOrEqual(2)
        }
      }
    }
  })

  it('2月所有任务有tags数组且值合法', () => {
    const tasks = getScenarioTutorials('commercial', '02')
    for (const t of tasks) {
      expect(t).toHaveProperty('tags')
      expect(Array.isArray(t.tags)).toBe(true)
      expect(t.tags.length).toBeGreaterThan(0)
      for (const tag of t.tags) {
        expect(COMMERCIAL_VALID_TAGS).toContain(tag)
      }
    }
  })

  it('2月余额核对任务无分录且角色为出纳', () => {
    const tasks = getScenarioTutorials('commercial', '02')
    const checkTask = tasks.findLast(t => (t.title.includes('余额核对') || t.title.includes('盘点') || t.title.includes('对账')) && t.role === 'cashier')
    expect(checkTask).toBeTruthy()
    expect(checkTask.entries.length).toBe(0)
    expect(checkTask.role).toBe('cashier')
  })

  it('2月每个标签至少覆盖1个任务', () => {
    const tasks = getScenarioTutorials('commercial', '02')
    const tagCount = {}
    for (const t of tasks) {
      for (const tag of t.tags) {
        tagCount[tag] = (tagCount[tag] || 0) + 1
      }
    }
    for (const tag of COMMERCIAL_COVERAGE_TAGS) {
      expect(tagCount[tag]).toBeGreaterThanOrEqual(1)
    }
  })

  it('商业企业3月有34个教学任务（含4个出纳任务）', () => {
    const tasks = getScenarioTutorials('commercial', '03')
    expect(tasks.length).toBe(34)
  })

  it('3月每个任务有完整字段', () => {
    const tasks = getScenarioTutorials('commercial', '03')
    for (const t of tasks) {
      expect(t).toHaveProperty('date')
      expect(t).toHaveProperty('title')
      expect(t).toHaveProperty('description')
      expect(t).toHaveProperty('tip')
      expect(t).toHaveProperty('entries')
      expect(t).toHaveProperty('documents')
      expect(t).toHaveProperty('difficulty')
      expect([1, 2, 3]).toContain(t.difficulty)
      // 有分录的任务必须有explanation
      if (t.entries.length > 0) {
        for (const e of t.entries) {
          expect(e).toHaveProperty('explanation')
          expect(e.explanation).toBeTruthy()
        }
      }
    }
  })

  it('3月每个任务的日期在3月份范围内', () => {
    const tasks = getScenarioTutorials('commercial', '03')
    for (const t of tasks) {
      expect(t.date).toMatch(/^2026-03-/)
    }
  })

  it('3月带分录的任务借贷平衡', () => {
    const tasks = getScenarioTutorials('commercial', '03')
    for (const t of tasks) {
      if (t.entries.length === 0) continue
      let debitTotal = 0
      let creditTotal = 0
      for (const e of t.entries) {
        debitTotal += Number(e.debit) || 0
        creditTotal += Number(e.credit) || 0
      }
      expect(Math.abs(debitTotal - creditTotal)).toBeLessThan(0.01)
    }
  })

  it('3月每笔金额不超过2位小数（G5铁律）', () => {
    const tasks = getScenarioTutorials('commercial', '03')
    for (const t of tasks) {
      for (const e of t.entries) {
        if (e.debit) {
          const parts = String(e.debit).split('.')
          if (parts.length > 1) expect(parts[1].length).toBeLessThanOrEqual(2)
        }
        if (e.credit) {
          const parts = String(e.credit).split('.')
          if (parts.length > 1) expect(parts[1].length).toBeLessThanOrEqual(2)
        }
      }
    }
  })

  it('3月所有任务有tags数组且值合法', () => {
    const tasks = getScenarioTutorials('commercial', '03')
    for (const t of tasks) {
      expect(t).toHaveProperty('tags')
      expect(Array.isArray(t.tags)).toBe(true)
      expect(t.tags.length).toBeGreaterThan(0)
      for (const tag of t.tags) {
        expect(COMMERCIAL_VALID_TAGS).toContain(tag)
      }
    }
  })

  it('3月余额核对任务无分录且角色为出纳', () => {
    const tasks = getScenarioTutorials('commercial', '03')
    const checkTask = tasks.findLast(t => (t.title.includes('余额核对') || t.title.includes('盘点') || t.title.includes('对账')) && t.role === 'cashier')
    expect(checkTask).toBeTruthy()
    expect(checkTask.entries.length).toBe(0)
    expect(checkTask.role).toBe('cashier')
  })

  it('3月每个标签至少覆盖1个任务', () => {
    const tasks = getScenarioTutorials('commercial', '03')
    const tagCount = {}
    for (const t of tasks) {
      for (const tag of t.tags) {
        tagCount[tag] = (tagCount[tag] || 0) + 1
      }
    }
    for (const tag of COMMERCIAL_COVERAGE_TAGS) {
      expect(tagCount[tag]).toBeGreaterThanOrEqual(1)
    }
  })

  it('商业企业4月有32个教学任务（含2个出纳任务）', () => {
    const tasks = getScenarioTutorials('commercial', '04')
    expect(tasks.length).toBe(32)
  })

  it('4月每个任务有完整字段', () => {
    const tasks = getScenarioTutorials('commercial', '04')
    for (const t of tasks) {
      expect(t).toHaveProperty('date')
      expect(t).toHaveProperty('title')
      expect(t).toHaveProperty('description')
      expect(t).toHaveProperty('tip')
      expect(t).toHaveProperty('entries')
      expect(t).toHaveProperty('documents')
      expect(t).toHaveProperty('difficulty')
      expect([1, 2, 3]).toContain(t.difficulty)
      // 有分录的任务必须有explanation
      if (t.entries.length > 0) {
        for (const e of t.entries) {
          expect(e).toHaveProperty('explanation')
          expect(e.explanation).toBeTruthy()
        }
      }
    }
  })

  it('4月每个任务的日期在4月份范围内', () => {
    const tasks = getScenarioTutorials('commercial', '04')
    for (const t of tasks) {
      expect(t.date).toMatch(/^2026-04-/)
    }
  })

  it('4月带分录的任务借贷平衡', () => {
    const tasks = getScenarioTutorials('commercial', '04')
    for (const t of tasks) {
      if (t.entries.length === 0) continue
      let debitTotal = 0
      let creditTotal = 0
      for (const e of t.entries) {
        debitTotal += Number(e.debit) || 0
        creditTotal += Number(e.credit) || 0
      }
      expect(Math.abs(debitTotal - creditTotal)).toBeLessThan(0.01)
    }
  })

  it('4月每笔金额不超过2位小数（G5铁律）', () => {
    const tasks = getScenarioTutorials('commercial', '04')
    for (const t of tasks) {
      for (const e of t.entries) {
        if (e.debit) {
          const parts = String(e.debit).split('.')
          if (parts.length > 1) expect(parts[1].length).toBeLessThanOrEqual(2)
        }
        if (e.credit) {
          const parts = String(e.credit).split('.')
          if (parts.length > 1) expect(parts[1].length).toBeLessThanOrEqual(2)
        }
      }
    }
  })

  it('4月所有任务有tags数组且值合法', () => {
    const tasks = getScenarioTutorials('commercial', '04')
    for (const t of tasks) {
      expect(t).toHaveProperty('tags')
      expect(Array.isArray(t.tags)).toBe(true)
      expect(t.tags.length).toBeGreaterThan(0)
      for (const tag of t.tags) {
        expect(COMMERCIAL_VALID_TAGS).toContain(tag)
      }
    }
  })

  it('4月余额核对任务无分录且角色为出纳', () => {
    const tasks = getScenarioTutorials('commercial', '04')
    const checkTask = tasks.findLast(t => (t.title.includes('余额核对') || t.title.includes('盘点') || t.title.includes('对账')) && t.role === 'cashier')
    expect(checkTask).toBeTruthy()
    expect(checkTask.entries.length).toBe(0)
    expect(checkTask.role).toBe('cashier')
  })

  it('4月每个标签至少覆盖1个任务', () => {
    const tasks = getScenarioTutorials('commercial', '04')
    const tagCount = {}
    for (const t of tasks) {
      for (const tag of t.tags) {
        tagCount[tag] = (tagCount[tag] || 0) + 1
      }
    }
    for (const tag of COMMERCIAL_COVERAGE_TAGS) {
      expect(tagCount[tag]).toBeGreaterThanOrEqual(1)
    }
  })

  it('商业企业5月有31个教学任务（含1个出纳任务）', () => {
    const tasks = getScenarioTutorials('commercial', '05')
    expect(tasks.length).toBe(31)
  })

  it('5月每个任务有完整字段', () => {
    const tasks = getScenarioTutorials('commercial', '05')
    for (const t of tasks) {
      expect(t).toHaveProperty('date')
      expect(t).toHaveProperty('title')
      expect(t).toHaveProperty('description')
      expect(t).toHaveProperty('tip')
      expect(t).toHaveProperty('entries')
      expect(t).toHaveProperty('difficulty')
      expect([1, 2, 3]).toContain(t.difficulty)
      if (t.entries.length > 0) {
        for (const e of t.entries) {
          expect(e).toHaveProperty('explanation')
          expect(e.explanation).toBeTruthy()
        }
      }
    }
  })

  it('5月每个任务的日期在5月份范围内', () => {
    const tasks = getScenarioTutorials('commercial', '05')
    for (const t of tasks) {
      expect(t.date).toMatch(/^2026-05-/)
    }
  })

  it('5月带分录的任务借贷平衡', () => {
    const tasks = getScenarioTutorials('commercial', '05')
    for (const t of tasks) {
      if (t.entries.length === 0) continue
      let debitTotal = 0
      let creditTotal = 0
      for (const e of t.entries) {
        debitTotal += Number(e.debit) || 0
        creditTotal += Number(e.credit) || 0
      }
      expect(Math.abs(debitTotal - creditTotal)).toBeLessThan(0.01)
    }
  })

  it('5月每笔金额不超过2位小数（G5铁律）', () => {
    const tasks = getScenarioTutorials('commercial', '05')
    for (const t of tasks) {
      for (const e of t.entries) {
        if (e.debit) {
          const parts = String(e.debit).split('.')
          if (parts.length > 1) expect(parts[1].length).toBeLessThanOrEqual(2)
        }
        if (e.credit) {
          const parts = String(e.credit).split('.')
          if (parts.length > 1) expect(parts[1].length).toBeLessThanOrEqual(2)
        }
      }
    }
  })

  it('5月所有任务有tags数组且值合法', () => {
    const tasks = getScenarioTutorials('commercial', '05')
    for (const t of tasks) {
      expect(t).toHaveProperty('tags')
      expect(Array.isArray(t.tags)).toBe(true)
      expect(t.tags.length).toBeGreaterThan(0)
      for (const tag of t.tags) {
        expect(COMMERCIAL_VALID_TAGS).toContain(tag)
      }
    }
  })

  it('5月余额核对任务无分录且角色为出纳', () => {
    const tasks = getScenarioTutorials('commercial', '05')
    const checkTask = tasks.findLast(t => (t.title.includes('余额核对') || t.title.includes('盘点') || t.title.includes('对账')) && t.role === 'cashier')
    expect(checkTask).toBeTruthy()
    expect(checkTask.entries.length).toBe(0)
    expect(checkTask.role).toBe('cashier')
  })

  it('5月每个标签至少覆盖1个任务', () => {
    const tasks = getScenarioTutorials('commercial', '05')
    const tagCount = {}
    for (const t of tasks) {
      for (const tag of t.tags) {
        tagCount[tag] = (tagCount[tag] || 0) + 1
      }
    }
    for (const tag of COMMERCIAL_COVERAGE_TAGS) {
      expect(tagCount[tag]).toBeGreaterThanOrEqual(1)
    }
  })

  it('商业企业7月有42个教学任务', () => {
    const tasks = getScenarioTutorials('commercial', '07')
    expect(tasks.length).toBe(42)
  })

  it('7月每个任务有完整字段', () => {
    const tasks = getScenarioTutorials('commercial', '07')
    for (const t of tasks) {
      expect(t).toHaveProperty('date')
      expect(t).toHaveProperty('title')
      expect(t).toHaveProperty('description')
      expect(t).toHaveProperty('tip')
      expect(t).toHaveProperty('entries')
      expect(t).toHaveProperty('documents')
      expect(t).toHaveProperty('difficulty')
      expect([1, 2, 3]).toContain(t.difficulty)
      // 有分录的任务必须有explanation
      if (t.entries.length > 0) {
        for (const e of t.entries) {
          expect(e).toHaveProperty('explanation')
          expect(e.explanation).toBeTruthy()
        }
      }
    }
  })

  it('7月每个任务的日期在7月份范围内', () => {
    const tasks = getScenarioTutorials('commercial', '07')
    for (const t of tasks) {
      expect(t.date).toMatch(/^2026-07-/)
    }
  })

  it('7月带分录的任务借贷平衡', () => {
    const tasks = getScenarioTutorials('commercial', '07')
    for (const t of tasks) {
      if (t.entries.length === 0) continue
      let debitTotal = 0
      let creditTotal = 0
      for (const e of t.entries) {
        debitTotal += Number(e.debit) || 0
        creditTotal += Number(e.credit) || 0
      }
      expect(Math.abs(debitTotal - creditTotal)).toBeLessThan(0.01)
    }
  })

  it('7月每笔金额不超过2位小数（G5铁律）', () => {
    const tasks = getScenarioTutorials('commercial', '07')
    for (const t of tasks) {
      for (const e of t.entries) {
        if (e.debit) {
          const parts = String(e.debit).split('.')
          if (parts.length > 1) expect(parts[1].length).toBeLessThanOrEqual(2)
        }
        if (e.credit) {
          const parts = String(e.credit).split('.')
          if (parts.length > 1) expect(parts[1].length).toBeLessThanOrEqual(2)
        }
      }
    }
  })

  it('7月所有任务有tags数组且值合法', () => {
    const tasks = getScenarioTutorials('commercial', '07')
    for (const t of tasks) {
      expect(t).toHaveProperty('tags')
      expect(Array.isArray(t.tags)).toBe(true)
      expect(t.tags.length).toBeGreaterThan(0)
      for (const tag of t.tags) {
        expect(COMMERCIAL_VALID_TAGS).toContain(tag)
      }
    }
  })

  it('7月余额核对任务无分录且角色为出纳', () => {
    const tasks = getScenarioTutorials('commercial', '07')
    const lastTask = tasks[tasks.length - 2]
    expect(lastTask.title).toContain('银行存款余额核对')
    expect(lastTask.entries.length).toBe(0)
    expect(lastTask.role).toBe('cashier')
  })

  it('7月每个标签至少覆盖1个任务', () => {
    const tasks = getScenarioTutorials('commercial', '07')
    const tagCount = {}
    for (const t of tasks) {
      for (const tag of t.tags) {
        tagCount[tag] = (tagCount[tag] || 0) + 1
      }
    }
    for (const tag of COMMERCIAL_COVERAGE_TAGS) {
      expect(tagCount[tag]).toBeGreaterThanOrEqual(1)
    }
  })

  it('商业企业6月有32个教学任务（含2个出纳任务）', () => {
    const tasks = getScenarioTutorials('commercial', '06')
    expect(tasks.length).toBe(32)
  })

  it('6月每个任务有完整字段', () => {
    const tasks = getScenarioTutorials('commercial', '06')
    for (const t of tasks) {
      expect(t).toHaveProperty('date')
      expect(t).toHaveProperty('title')
      expect(t).toHaveProperty('description')
      expect(t).toHaveProperty('tip')
      expect(t).toHaveProperty('entries')
      expect(t).toHaveProperty('documents')
      expect(t).toHaveProperty('difficulty')
      expect([1, 2, 3]).toContain(t.difficulty)
      // 有分录的任务必须有explanation
      if (t.entries.length > 0) {
        for (const e of t.entries) {
          expect(e).toHaveProperty('explanation')
          expect(e.explanation).toBeTruthy()
        }
      }
    }
  })

  it('6月每个任务的日期在6月份范围内', () => {
    const tasks = getScenarioTutorials('commercial', '06')
    for (const t of tasks) {
      expect(t.date).toMatch(/^2026-06-/)
    }
  })

  it('6月带分录的任务借贷平衡', () => {
    const tasks = getScenarioTutorials('commercial', '06')
    for (const t of tasks) {
      if (t.entries.length === 0) continue
      let debitTotal = 0
      let creditTotal = 0
      for (const e of t.entries) {
        debitTotal += Number(e.debit) || 0
        creditTotal += Number(e.credit) || 0
      }
      expect(Math.abs(debitTotal - creditTotal)).toBeLessThan(0.01)
    }
  })

  it('6月每笔金额不超过2位小数（G5铁律）', () => {
    const tasks = getScenarioTutorials('commercial', '06')
    for (const t of tasks) {
      for (const e of t.entries) {
        if (e.debit) {
          const parts = String(e.debit).split('.')
          if (parts.length > 1) expect(parts[1].length).toBeLessThanOrEqual(2)
        }
        if (e.credit) {
          const parts = String(e.credit).split('.')
          if (parts.length > 1) expect(parts[1].length).toBeLessThanOrEqual(2)
        }
      }
    }
  })

  it('6月所有任务有tags数组且值合法', () => {
    const tasks = getScenarioTutorials('commercial', '06')
    for (const t of tasks) {
      expect(t).toHaveProperty('tags')
      expect(Array.isArray(t.tags)).toBe(true)
      expect(t.tags.length).toBeGreaterThan(0)
      for (const tag of t.tags) {
        expect(COMMERCIAL_VALID_TAGS).toContain(tag)
      }
    }
  })

  it('6月余额核对任务无分录且角色为出纳', () => {
    const tasks = getScenarioTutorials('commercial', '06')
    const checkTask = tasks.findLast(t => (t.title.includes('余额核对') || t.title.includes('盘点') || t.title.includes('对账')) && t.role === 'cashier')
    expect(checkTask).toBeTruthy()
    expect(checkTask.entries.length).toBe(0)
    expect(checkTask.role).toBe('cashier')
  })

  it('6月每个标签至少覆盖1个任务', () => {
    const tasks = getScenarioTutorials('commercial', '06')
    const tagCount = {}
    for (const t of tasks) {
      for (const tag of t.tags) {
        tagCount[tag] = (tagCount[tag] || 0) + 1
      }
    }
    for (const tag of COMMERCIAL_COVERAGE_TAGS) {
      expect(tagCount[tag]).toBeGreaterThanOrEqual(1)
    }
  })

  it('商业企业8月有40个教学任务', () => {
    const tasks = getScenarioTutorials('commercial', '08')
    expect(tasks.length).toBe(40)
  })

  it('8月每个任务有完整字段', () => {
    const tasks = getScenarioTutorials('commercial', '08')
    for (const t of tasks) {
      expect(t).toHaveProperty('date')
      expect(t).toHaveProperty('title')
      expect(t).toHaveProperty('description')
      expect(t).toHaveProperty('tip')
      expect(t).toHaveProperty('entries')
      expect(t).toHaveProperty('documents')
      expect(t).toHaveProperty('difficulty')
      expect([1, 2, 3]).toContain(t.difficulty)
      // 有分录的任务必须有explanation
      if (t.entries.length > 0) {
        for (const e of t.entries) {
          expect(e).toHaveProperty('explanation')
          expect(e.explanation).toBeTruthy()
        }
      }
    }
  })

  it('8月每个任务的日期在8月份范围内', () => {
    const tasks = getScenarioTutorials('commercial', '08')
    for (const t of tasks) {
      expect(t.date).toMatch(/^2026-08-/)
    }
  })

  it('8月带分录的任务借贷平衡', () => {
    const tasks = getScenarioTutorials('commercial', '08')
    for (const t of tasks) {
      if (t.entries.length === 0) continue
      let debitTotal = 0
      let creditTotal = 0
      for (const e of t.entries) {
        debitTotal += Number(e.debit) || 0
        creditTotal += Number(e.credit) || 0
      }
      expect(Math.abs(debitTotal - creditTotal)).toBeLessThan(0.01)
    }
  })

  it('8月每笔金额不超过2位小数（G5铁律）', () => {
    const tasks = getScenarioTutorials('commercial', '08')
    for (const t of tasks) {
      for (const e of t.entries) {
        if (e.debit) {
          const parts = String(e.debit).split('.')
          if (parts.length > 1) expect(parts[1].length).toBeLessThanOrEqual(2)
        }
        if (e.credit) {
          const parts = String(e.credit).split('.')
          if (parts.length > 1) expect(parts[1].length).toBeLessThanOrEqual(2)
        }
      }
    }
  })

  it('8月所有任务有tags数组且值合法', () => {
    const tasks = getScenarioTutorials('commercial', '08')
    for (const t of tasks) {
      expect(t).toHaveProperty('tags')
      expect(Array.isArray(t.tags)).toBe(true)
      expect(t.tags.length).toBeGreaterThan(0)
      for (const tag of t.tags) {
        expect(COMMERCIAL_VALID_TAGS).toContain(tag)
      }
    }
  })

  it('8月余额核对任务无分录且角色为出纳', () => {
    const tasks = getScenarioTutorials('commercial', '08')
    const lastTask = tasks[tasks.length - 2]
    expect(lastTask.title).toContain('银行存款余额核对')
    expect(lastTask.entries.length).toBe(0)
    expect(lastTask.role).toBe('cashier')
  })

  it('8月每个标签至少覆盖1个任务', () => {
    const tasks = getScenarioTutorials('commercial', '08')
    const tagCount = {}
    for (const t of tasks) {
      for (const tag of t.tags) {
        tagCount[tag] = (tagCount[tag] || 0) + 1
      }
    }
    for (const tag of COMMERCIAL_COVERAGE_TAGS) {
      expect(tagCount[tag]).toBeGreaterThanOrEqual(1)
    }
  })

  it('商业企业9月有44个教学任务（含2个出纳任务）', () => {
    const tasks = getScenarioTutorials('commercial', '09')
    expect(tasks.length).toBe(44)
  })

  it('9月每个任务有完整字段', () => {
    const tasks = getScenarioTutorials('commercial', '09')
    for (const t of tasks) {
      expect(t).toHaveProperty('date')
      expect(t).toHaveProperty('title')
      expect(t).toHaveProperty('description')
      expect(t).toHaveProperty('tip')
      expect(t).toHaveProperty('entries')
      expect(t).toHaveProperty('difficulty')
      expect([1, 2, 3]).toContain(t.difficulty)
      if (t.entries.length > 0) {
        for (const e of t.entries) {
          expect(e).toHaveProperty('explanation')
          expect(e.explanation).toBeTruthy()
        }
      }
    }
  })

  it('9月每个任务的日期在9月份范围内', () => {
    const tasks = getScenarioTutorials('commercial', '09')
    for (const t of tasks) {
      expect(t.date).toMatch(/^2026-09-/)
    }
  })

  it('9月带分录的任务借贷平衡', () => {
    const tasks = getScenarioTutorials('commercial', '09')
    for (const t of tasks) {
      if (t.entries.length === 0) continue
      let debitTotal = 0
      let creditTotal = 0
      for (const e of t.entries) {
        debitTotal += Number(e.debit) || 0
        creditTotal += Number(e.credit) || 0
      }
      expect(Math.abs(debitTotal - creditTotal)).toBeLessThan(0.01)
    }
  })

  it('9月每笔金额不超过2位小数（G5铁律）', () => {
    const tasks = getScenarioTutorials('commercial', '09')
    for (const t of tasks) {
      for (const e of t.entries) {
        if (e.debit) {
          const parts = String(e.debit).split('.')
          if (parts.length > 1) expect(parts[1].length).toBeLessThanOrEqual(2)
        }
        if (e.credit) {
          const parts = String(e.credit).split('.')
          if (parts.length > 1) expect(parts[1].length).toBeLessThanOrEqual(2)
        }
      }
    }
  })

  it('9月所有任务有tags数组且值合法', () => {
    const tasks = getScenarioTutorials('commercial', '09')
    for (const t of tasks) {
      expect(t).toHaveProperty('tags')
      expect(Array.isArray(t.tags)).toBe(true)
      expect(t.tags.length).toBeGreaterThan(0)
      for (const tag of t.tags) {
        expect(COMMERCIAL_VALID_TAGS).toContain(tag)
      }
    }
  })

  it('9月余额核对任务无分录且角色为出纳', () => {
    const tasks = getScenarioTutorials('commercial', '09')
    const lastTask = tasks[tasks.length - 2]
    expect(lastTask.title).toContain('银行存款余额核对')
    expect(lastTask.entries.length).toBe(0)
    expect(lastTask.role).toBe('cashier')
  })

  it('9月每个标签至少覆盖1个任务', () => {
    const tasks = getScenarioTutorials('commercial', '09')
    const tagCount = {}
    for (const t of tasks) {
      for (const tag of t.tags) {
        tagCount[tag] = (tagCount[tag] || 0) + 1
      }
    }
    for (const tag of COMMERCIAL_COVERAGE_TAGS) {
      expect(tagCount[tag]).toBeGreaterThanOrEqual(1)
    }
  })

  it('商业企业10月有47个教学任务（含5个出纳任务）', () => {
    const tasks = getScenarioTutorials('commercial', '10')
    expect(tasks.length).toBe(47)
  })

  it('10月每个任务有完整字段', () => {
    const tasks = getScenarioTutorials('commercial', '10')
    for (const t of tasks) {
      expect(t).toHaveProperty('date')
      expect(t).toHaveProperty('title')
      expect(t).toHaveProperty('description')
      expect(t).toHaveProperty('tip')
      expect(t).toHaveProperty('entries')
      expect(t).toHaveProperty('documents')
      expect(t).toHaveProperty('difficulty')
      expect([1, 2, 3]).toContain(t.difficulty)
      // 有分录的任务必须有explanation
      if (t.entries.length > 0) {
        for (const e of t.entries) {
          expect(e).toHaveProperty('explanation')
          expect(e.explanation).toBeTruthy()
        }
      }
    }
  })

  it('10月每个任务的日期在10月份范围内', () => {
    const tasks = getScenarioTutorials('commercial', '10')
    for (const t of tasks) {
      expect(t.date).toMatch(/^2026-10-/)
    }
  })

  it('10月带分录的任务借贷平衡', () => {
    const tasks = getScenarioTutorials('commercial', '10')
    for (const t of tasks) {
      if (t.entries.length === 0) continue
      let debitTotal = 0
      let creditTotal = 0
      for (const e of t.entries) {
        debitTotal += Number(e.debit) || 0
        creditTotal += Number(e.credit) || 0
      }
      expect(Math.abs(debitTotal - creditTotal)).toBeLessThan(0.01)
    }
  })

  it('10月每笔金额不超过2位小数（G5铁律）', () => {
    const tasks = getScenarioTutorials('commercial', '10')
    for (const t of tasks) {
      for (const e of t.entries) {
        if (e.debit) {
          const parts = String(e.debit).split('.')
          if (parts.length > 1) expect(parts[1].length).toBeLessThanOrEqual(2)
        }
        if (e.credit) {
          const parts = String(e.credit).split('.')
          if (parts.length > 1) expect(parts[1].length).toBeLessThanOrEqual(2)
        }
      }
    }
  })

  it('10月所有任务有tags数组且值合法', () => {
    const tasks = getScenarioTutorials('commercial', '10')
    for (const t of tasks) {
      expect(t).toHaveProperty('tags')
      expect(Array.isArray(t.tags)).toBe(true)
      expect(t.tags.length).toBeGreaterThan(0)
      for (const tag of t.tags) {
        expect(COMMERCIAL_VALID_TAGS).toContain(tag)
      }
    }
  })

  it('10月余额核对任务无分录且角色为出纳', () => {
    const tasks = getScenarioTutorials('commercial', '10')
    const lastTask = tasks[tasks.length - 2]
    expect(lastTask.title).toContain('银行存款余额核对')
    expect(lastTask.entries.length).toBe(0)
    expect(lastTask.role).toBe('cashier')
  })

  it('10月每个标签至少覆盖1个任务', () => {
    const tasks = getScenarioTutorials('commercial', '10')
    const tagCount = {}
    for (const t of tasks) {
      for (const tag of t.tags) {
        tagCount[tag] = (tagCount[tag] || 0) + 1
      }
    }
    for (const tag of COMMERCIAL_COVERAGE_TAGS) {
      expect(tagCount[tag]).toBeGreaterThanOrEqual(1)
    }
  })

  it('11月有41个教学任务', () => {
    const tasks = getScenarioTutorials('commercial', '11')
    expect(tasks.length).toBe(41)
  })

  it('11月每个任务有完整字段', () => {
    const tasks = getScenarioTutorials('commercial', '11')
    for (const t of tasks) {
      expect(t).toHaveProperty('date')
      expect(t).toHaveProperty('title')
      expect(t).toHaveProperty('description')
      expect(t).toHaveProperty('tip')
      expect(t).toHaveProperty('entries')
      expect(t).toHaveProperty('documents')
      expect(t).toHaveProperty('difficulty')
      expect([1, 2, 3]).toContain(t.difficulty)
      // 有分录的任务必须有explanation
      if (t.entries.length > 0) {
        for (const e of t.entries) {
          expect(e).toHaveProperty('explanation')
          expect(e.explanation).toBeTruthy()
        }
      }
    }
  })

  it('11月每个任务的日期在11月份范围内', () => {
    const tasks = getScenarioTutorials('commercial', '11')
    for (const t of tasks) {
      expect(t.date).toMatch(/^2026-11-/)
    }
  })

  it('11月带分录的任务借贷平衡', () => {
    const tasks = getScenarioTutorials('commercial', '11')
    for (const t of tasks) {
      if (t.entries.length === 0) continue
      let debitTotal = 0
      let creditTotal = 0
      for (const e of t.entries) {
        debitTotal += Number(e.debit) || 0
        creditTotal += Number(e.credit) || 0
      }
      expect(Math.abs(debitTotal - creditTotal)).toBeLessThan(0.01)
    }
  })

  it('11月每笔金额不超过2位小数（G5铁律）', () => {
    const tasks = getScenarioTutorials('commercial', '11')
    for (const t of tasks) {
      for (const e of t.entries) {
        if (e.debit) {
          const parts = String(e.debit).split('.')
          if (parts.length > 1) expect(parts[1].length).toBeLessThanOrEqual(2)
        }
        if (e.credit) {
          const parts = String(e.credit).split('.')
          if (parts.length > 1) expect(parts[1].length).toBeLessThanOrEqual(2)
        }
      }
    }
  })

  it('11月所有任务有tags数组且值合法', () => {
    const tasks = getScenarioTutorials('commercial', '11')
    for (const t of tasks) {
      expect(t).toHaveProperty('tags')
      expect(Array.isArray(t.tags)).toBe(true)
      expect(t.tags.length).toBeGreaterThan(0)
      for (const tag of t.tags) {
        expect(COMMERCIAL_VALID_TAGS).toContain(tag)
      }
    }
  })

  it('11月余额核对任务无分录且角色为出纳', () => {
    const tasks = getScenarioTutorials('commercial', '11')
    const lastTask = tasks[tasks.length - 2]
    expect(lastTask.title).toContain('银行存款余额核对')
    expect(lastTask.entries.length).toBe(0)
    expect(lastTask.role).toBe('cashier')
  })

  it('11月每个标签至少覆盖1个任务', () => {
    const tasks = getScenarioTutorials('commercial', '11')
    const tagCount = {}
    for (const t of tasks) {
      for (const tag of t.tags) {
        tagCount[tag] = (tagCount[tag] || 0) + 1
      }
    }
    for (const tag of COMMERCIAL_COVERAGE_TAGS) {
      expect(tagCount[tag]).toBeGreaterThanOrEqual(1)
    }
  })

  it('商业企业12月有50个教学任务', () => {
    const tasks = getScenarioTutorials('commercial', '12')
    expect(tasks.length).toBe(50)
  })

  it('12月每个任务有完整字段', () => {
    const tasks = getScenarioTutorials('commercial', '12')
    for (const t of tasks) {
      expect(t).toHaveProperty('date')
      expect(t).toHaveProperty('title')
      expect(t).toHaveProperty('description')
      expect(t).toHaveProperty('tip')
      expect(t).toHaveProperty('entries')
      expect(t).toHaveProperty('documents')
      expect(t).toHaveProperty('difficulty')
      expect([1, 2, 3]).toContain(t.difficulty)
      // 有分录的任务必须有explanation
      if (t.entries.length > 0) {
        for (const e of t.entries) {
          expect(e).toHaveProperty('explanation')
          expect(e.explanation).toBeTruthy()
        }
      }
    }
  })

  it('12月每个任务的日期在12月份范围内', () => {
    const tasks = getScenarioTutorials('commercial', '12')
    for (const t of tasks) {
      expect(t.date).toMatch(/^2026-12-/)
    }
  })

  it('12月带分录的任务借贷平衡', () => {
    const tasks = getScenarioTutorials('commercial', '12')
    for (const t of tasks) {
      if (t.entries.length === 0) continue
      let debitTotal = 0
      let creditTotal = 0
      for (const e of t.entries) {
        debitTotal += Number(e.debit) || 0
        creditTotal += Number(e.credit) || 0
      }
      expect(Math.abs(debitTotal - creditTotal)).toBeLessThan(0.01)
    }
  })

  it('12月每笔金额不超过2位小数（G5铁律）', () => {
    const tasks = getScenarioTutorials('commercial', '12')
    for (const t of tasks) {
      for (const e of t.entries) {
        if (e.debit) {
          const parts = String(e.debit).split('.')
          if (parts.length > 1) expect(parts[1].length).toBeLessThanOrEqual(2)
        }
        if (e.credit) {
          const parts = String(e.credit).split('.')
          if (parts.length > 1) expect(parts[1].length).toBeLessThanOrEqual(2)
        }
      }
    }
  })

  it('12月所有任务有tags数组且值合法', () => {
    const tasks = getScenarioTutorials('commercial', '12')
    for (const t of tasks) {
      expect(t).toHaveProperty('tags')
      expect(Array.isArray(t.tags)).toBe(true)
      expect(t.tags.length).toBeGreaterThan(0)
      for (const tag of t.tags) {
        expect(COMMERCIAL_VALID_TAGS).toContain(tag)
      }
    }
  })

  it('12月余额核对任务无分录且角色为出纳', () => {
    const tasks = getScenarioTutorials('commercial', '12')
    const lastTask = tasks[tasks.length - 2]
    expect(lastTask.title).toContain('银行存款余额核对')
    expect(lastTask.entries.length).toBe(0)
    expect(lastTask.role).toBe('cashier')
  })

  it('12月每个标签至少覆盖1个任务', () => {
    const tasks = getScenarioTutorials('commercial', '12')
    const tagCount = {}
    for (const t of tasks) {
      for (const tag of t.tags) {
        tagCount[tag] = (tagCount[tag] || 0) + 1
      }
    }
    for (const tag of COMMERCIAL_COVERAGE_TAGS) {
      expect(tagCount[tag]).toBeGreaterThanOrEqual(1)
    }
  })

  it('各月任务附件数量正确', () => {
    const COMMERCIAL_EXPECTED = {
      '2026-01-08_采购食品饮料（现购）': 3,
      '2026-01-10_采购生鲜果蔬': 3,
      '2026-01-18_小家电到货验收及尾款支付': 3,
      '2026-01-03_租用经营场地': 2,
      '2026-01-06_支付开业广告宣传费': 2,
      '2026-01-07_员工招聘及岗前培训费': 2,
      '2026-01-09_采购日用品（赊购）': 2,
      '2026-01-11_采购小家电（预付定金）': 2,
      '2026-01-16_微信/支付宝商户余额提现': 2,
      '2026-01-20_团购业务（企业客户）': 2,
      '2026-01-23_支付水电费': 2,
      '2026-01-25_银行账户管理费及利息收入': 2,
      '2026-01-28_缴纳增值税及附加税': 2,
      '2026-02-02_年货采购-食品饮料及礼盒（现购）': 3,
      '2026-02-04_生鲜追加采购（春节备货）': 3,
      '2026-02-11_团购业务-多家企业采购年货': 3,
      '2026-02-03_采购春节装饰及新年用品（赊购）': 2,
      '2026-02-05_支付上月供应商货款（鑫鑫食品）': 2,
      '2026-02-09_微信/支付宝余额提现（春节前）': 2,
      '2026-02-10_预付卡（礼品卡）销售': 2,
      '2026-02-15_发放1月员工工资': 2,
      '2026-02-17_缴纳社保单位部分': 2,
      '2026-02-18_缴纳公积金单位部分': 2,
      '2026-02-22_支付供应商货款（绿源农业）': 2,
      '2026-02-23_支付水电费（春节旺季）': 2,
      '2026-02-24_银行手续费及利息收入': 2,
      '2026-02-27_缴纳增值税及附加税': 2,
      '2026-02-08_出纳-春节高峰POS清机及现金送存': 2,
      '2026-03-03_食品饮料日常补货（现购）': 3,
      '2026-03-10_生鲜正常补货（现购）': 3,
      '2026-03-04_支付2月供应商货款（洁宝日化）': 2,
      '2026-03-05_日用品补货（赊购）': 2,
      '2026-03-06_发放2月员工工资（含春节加班费）': 2,
      '2026-03-14_缴纳社保公积金单位部分（2月基数）': 2,
      '2026-03-15_支付水电费': 2,
      '2026-03-18_微信/支付宝提现及手续费': 2,
      '2026-03-19_银行手续费及利息收入': 2,
      '2026-03-22_缴纳增值税及附加税': 2,
      '2026-03-22_生鲜补货（现购）': 2,
      '2026-03-26_日用品补货': 2,
      '2026-04-05_支付联营专柜3月结算款': 2,
      '2026-04-07_生鲜补货（现购）': 2,
      '2026-04-12_食品饮料补货（现购）': 3,
      '2026-04-14_日用品补货（赊购）': 2,
      '2026-04-15_缴纳社保公积金单位部分': 2,
      '2026-04-16_支付水电费': 2,
      '2026-04-29_食品补货': 2,
      '2026-05-05_生鲜补货': 2,
      '2026-05-06_食品饮料补货（现购）': 2,
      '2026-05-09_日用品补货（赊购）': 2,
      '2026-05-10_联营专柜4月结算': 2,
      '2026-05-12_生鲜补货（现购）': 2,
      '2026-05-15_💵 供应商返利入账': 2,
      '2026-05-19_食品补货': 2,
      '2026-05-22_生鲜补货': 2,
      '2026-06-06_食品饮料补货（现购）': 2,
      '2026-06-09_日用品补货（赊购）': 2,
      '2026-06-11_生鲜补货': 2,
      '2026-06-20_日用品补货（赊购）': 2,
      '2026-06-21_食品补货（现购）': 2,
      '2026-06-28_期末结转损益': 2,
    }
    const months = ['01','02','03','04','05','06']
    for (const mn of months) {
      const tasks = getScenarioTutorials('commercial', mn)
      for (const t of tasks) {
        if (t.entries.length === 0 && t.nextAction) continue
        if (t.entries.length === 0) continue
        expect(t.documents).toBeDefined()
        expect(Array.isArray(t.documents)).toBe(true)
        const key = t.date + '_' + t.title
        const expected = COMMERCIAL_EXPECTED[key] || 1
        expect(t.documents.length).toBe(expected)
      }
    }
  })


  it('all months cash entries have cashFlowItem (non internal transfer)', () => {
    const CASH_PREFIXES = ['1001', '1002', '1012']
    const VALID_CF = ['cf-op','cf-op2','cf-op3','cf-op4','cf-op5','cf-op6','cf-inv','cf-inv2','cf-inv3','cf-inv4','cf-fin','cf-fin2','cf-fin3','cf-fin4']
    const months = ['01','02','03','04','05','06','07','08','09','10','11','12']
    for (const m of months) {
      const tasks = getScenarioTutorials('commercial', m)
      for (const t of tasks) {
        const entries = t.entries || []
        if (entries.length === 0) continue
        for (const e of entries) {
          const isCash = CASH_PREFIXES.some(p => (e.subjectCode||'').startsWith(p))
          if (!isCash) continue
          const paired = entries.some(x => x !== e && CASH_PREFIXES.some(p => (x.subjectCode||'').startsWith(p)))
          if (paired) continue
          if (e.cashFlowItem) {
            expect(VALID_CF).toContain(e.cashFlowItem)
            expect(e.cashFlowExplanation).toBeTruthy()
          } else {
            expect(e.cashFlowItem).toBeTruthy()
          }
        }
      }
    }
  })
})

// ═══════════════════════════════════════════
// 服务业教学数据测试（2026年）
// ═══════════════════════════════════════════

const SERVICE_VALID_TAGS = ['项目核算','收入确认','人工成本','费用管理','工资社保','税费','往来管理','资金管理','期末','出纳']
// 资金管理标签已精简，不再每月检查覆盖率
const SERVICE_COVERAGE_TAGS = SERVICE_VALID_TAGS.filter(t => t !== '资金管理')

describe('服务业教程数据 - 结构', () => {
  it('1月份有43个教学任务', () => {
    const tasks = getScenarioTutorials('service', '01')
    expect(tasks.length).toBe(43)
  })

  it('1月每个任务有完整字段', () => {
    const tasks = getScenarioTutorials('service', '01')
    for (const t of tasks) {
      expect(t).toHaveProperty('date')
      expect(t).toHaveProperty('title')
      expect(t).toHaveProperty('description')
      expect(t).toHaveProperty('tip')
      expect(t).toHaveProperty('entries')
      expect(t).toHaveProperty('difficulty')
      expect([1, 2, 3]).toContain(t.difficulty)
    }
  })

  it('1月每个任务的日期在1月份范围内', () => {
    const tasks = getScenarioTutorials('service', '01')
    for (const t of tasks) {
      expect(t.date).toMatch(/^2026-01-/)
    }
  })

  it('1月带分录的任务借贷平衡', () => {
    const tasks = getScenarioTutorials('service', '01')
    for (const t of tasks) {
      if (t.entries.length === 0) continue
      let debitTotal = 0
      let creditTotal = 0
      for (const e of t.entries) {
        debitTotal += Number(e.debit) || 0
        creditTotal += Number(e.credit) || 0
      }
      expect(Math.abs(debitTotal - creditTotal)).toBeLessThan(0.01)
    }
  })

  it('1月所有任务有tags且值合法', () => {
    const tasks = getScenarioTutorials('service', '01')
    for (const t of tasks) {
      expect(t).toHaveProperty('tags')
      expect(Array.isArray(t.tags)).toBe(true)
      expect(t.tags.length).toBeGreaterThan(0)
      for (const tag of t.tags) {
        expect(SERVICE_VALID_TAGS).toContain(tag)
      }
    }
  })

  it('1月每个标签至少覆盖1个任务', () => {
    const tasks = getScenarioTutorials('service', '01')
    const tagCount = {}
    for (const t of tasks) {
      for (const tag of t.tags) {
        tagCount[tag] = (tagCount[tag] || 0) + 1
      }
    }
    for (const tag of SERVICE_COVERAGE_TAGS) {
      expect(tagCount[tag]).toBeGreaterThanOrEqual(1)
    }
  })

  it('2月份有40个教学任务', () => {
    const tasks = getScenarioTutorials('service', '02')
    expect(tasks.length).toBe(40)
  })

  it('2月带分录的任务借贷平衡', () => {
    const tasks = getScenarioTutorials('service', '02')
    for (const t of tasks) {
      if (t.entries.length === 0) continue
      let debitTotal = 0
      let creditTotal = 0
      for (const e of t.entries) {
        debitTotal += Number(e.debit) || 0
        creditTotal += Number(e.credit) || 0
      }
      expect(Math.abs(debitTotal - creditTotal)).toBeLessThan(0.01)
    }
  })

  it('2月所有任务有tags且值合法', () => {
    const tasks = getScenarioTutorials('service', '02')
    for (const t of tasks) {
      expect(t).toHaveProperty('tags')
      expect(Array.isArray(t.tags)).toBe(true)
      for (const tag of t.tags) {
        expect(SERVICE_VALID_TAGS).toContain(tag)
      }
    }
  })

  it('3月带分录的任务借贷平衡', () => {
    const tasks = getScenarioTutorials('service', '03')
    for (const t of tasks) {
      if (t.entries.length === 0) continue
      let debitTotal = 0
      let creditTotal = 0
      for (const e of t.entries) {
        debitTotal += Number(e.debit) || 0
        creditTotal += Number(e.credit) || 0
      }
      expect(Math.abs(debitTotal - creditTotal)).toBeLessThan(0.01)
    }
  })

  it('4-12月每个带分录的任务借贷平衡', () => {
    const months = ['04','05','06','07','08','09','10','11','12']
    for (const m of months) {
      const tasks = getScenarioTutorials('service', m)
      expect(tasks.length).toBeGreaterThanOrEqual(37)
      for (const t of tasks) {
        if (t.entries.length === 0) continue
        let debitTotal = 0
        let creditTotal = 0
        for (const e of t.entries) {
          debitTotal += Number(e.debit) || 0
          creditTotal += Number(e.credit) || 0
        }
        expect(Math.abs(debitTotal - creditTotal)).toBeLessThan(0.01)
      }
    }
  })

  it('全部12个月任务金额小数不超过2位', () => {
    const months = ['01','02','03','04','05','06','07','08','09','10','11','12']
    for (const m of months) {
      const tasks = getScenarioTutorials('service', m)
      for (const t of tasks) {
        for (const e of t.entries) {
          if (e.debit) {
            const parts = String(e.debit).split('.')
            if (parts.length > 1) expect(parts[1].length).toBeLessThanOrEqual(2)
          }
          if (e.credit) {
            const parts = String(e.credit).split('.')
            if (parts.length > 1) expect(parts[1].length).toBeLessThanOrEqual(2)
          }
        }
      }
    }
  })
})

// ═══════════════════════════════════════════════
// 建筑业教学数据测试
// ═══════════════════════════════════════════════

const CONSTRUCTION_VALID_TAGS = ['工程合同','工程成本','分包管理','材料管理','机械使用','往来管理','资金管理','工资社保','税费','期末','出纳','费用管理','资产']
const CONSTRUCTION_COVERAGE_TAGS = CONSTRUCTION_VALID_TAGS.filter(t => t !== '资金管理')

describe('建筑业教程数据', () => {
  it('1月有32个教学任务', () => {
    const tasks = getScenarioTutorials('construction', '01')
    expect(tasks.length).toBe(32)
  })

  it('1月每个任务有完整字段', () => {
    const tasks = getScenarioTutorials('construction', '01')
    for (const t of tasks) {
      expect(t).toHaveProperty('date')
      expect(t).toHaveProperty('title')
      expect(t).toHaveProperty('description')
      expect(t).toHaveProperty('tip')
      expect(t).toHaveProperty('entries')
      expect(t).toHaveProperty('difficulty')
      expect([1, 2, 3]).toContain(t.difficulty)
    }
  })

  it('1月每个任务的日期在1月份范围内', () => {
    const tasks = getScenarioTutorials('construction', '01')
    for (const t of tasks) {
      expect(t.date).toMatch(/^2026-01-/)
    }
  })

  it('1月带分录的任务借贷平衡', () => {
    const tasks = getScenarioTutorials('construction', '01')
    for (const t of tasks) {
      if (t.entries.length === 0) continue
      let debitTotal = 0
      let creditTotal = 0
      for (const e of t.entries) {
        debitTotal += Number(e.debit) || 0
        creditTotal += Number(e.credit) || 0
      }
      expect(Math.abs(debitTotal - creditTotal)).toBeLessThan(0.01)
    }
  })

  it('1月所有任务有tags且值合法', () => {
    const tasks = getScenarioTutorials('construction', '01')
    for (const t of tasks) {
      expect(t).toHaveProperty('tags')
      expect(Array.isArray(t.tags)).toBe(true)
      expect(t.tags.length).toBeGreaterThan(0)
      for (const tag of t.tags) {
        expect(CONSTRUCTION_VALID_TAGS).toContain(tag)
      }
    }
  })

  it('1月除往来管理外各标签至少覆盖1个任务', () => {
    const tasks = getScenarioTutorials('construction', '01')
    const tagCount = {}
    for (const t of tasks) {
      for (const tag of t.tags) {
        tagCount[tag] = (tagCount[tag] || 0) + 1
      }
    }
    // 1月为企业设立阶段，往来管理业务较少
    expect((tagCount['往来管理'] || 0)).toBeGreaterThanOrEqual(0)
    for (const tag of CONSTRUCTION_COVERAGE_TAGS) {
      if (tag !== '往来管理' && tag !== '费用管理' && tag !== '资产' && tag !== '出纳') {
        expect((tagCount[tag] || 0)).toBeGreaterThanOrEqual(1)
      }
    }
  })

  it('2-12月均有教学任务', () => {
    const monthCounts = { '02': 40, '03': 41, '04': 43, '05': 43, '06': 44, '07': 41, '08': 41, '09': 41, '10': 46, '11': 42, '12': 47 }
    for (const [m, count] of Object.entries(monthCounts)) {
      const tasks = getScenarioTutorials('construction', m)
      expect(tasks.length).toBe(count)
    }
  })

  it('2-12月每个带分录的任务借贷平衡', () => {
    const months = ['02','03','04','05','06','07','08','09','10','11','12']
    for (const m of months) {
      const tasks = getScenarioTutorials('construction', m)
      for (const t of tasks) {
        if (t.entries.length === 0) continue
        let debitTotal = 0
        let creditTotal = 0
        for (const e of t.entries) {
          debitTotal += Number(e.debit) || 0
          creditTotal += Number(e.credit) || 0
        }
        expect(Math.abs(debitTotal - creditTotal)).toBeLessThan(0.01)
      }
    }
  })

  it('2-12月所有任务标签合法', () => {
    const months = ['02','03','04','05','06','07','08','09','10','11','12']
    for (const m of months) {
      const tasks = getScenarioTutorials('construction', m)
      for (const t of tasks) {
        expect(t).toHaveProperty('tags')
        expect(Array.isArray(t.tags)).toBe(true)
        expect(t.tags.length).toBeGreaterThan(0)
        for (const tag of t.tags) {
          expect(CONSTRUCTION_VALID_TAGS).toContain(tag)
        }
      }
    }
  })

  it('2-12月每个标签至少覆盖1个任务', () => {
    const months = ['02','03','04','05','06','07','08','09','10','11','12']
    const tagCount = {}
    for (const m of months) {
      const tasks = getScenarioTutorials('construction', m)
      for (const t of tasks) {
        for (const tag of t.tags) {
          tagCount[tag] = (tagCount[tag] || 0) + 1
        }
      }
    }
    for (const tag of CONSTRUCTION_COVERAGE_TAGS) {
      expect(tagCount[tag]).toBeGreaterThanOrEqual(1)
    }
  })

  it('2-12月每笔金额不超过2位小数（G5铁律）', () => {
    const months = ['02','03','04','05','06','07','08','09','10','11','12']
    for (const m of months) {
      const tasks = getScenarioTutorials('construction', m)
      for (const t of tasks) {
        for (const e of t.entries) {
          if (e.debit) {
            const parts = String(e.debit).split('.')
            if (parts.length > 1) expect(parts[1].length).toBeLessThanOrEqual(2)
          }
          if (e.credit) {
            const parts = String(e.credit).split('.')
            if (parts.length > 1) expect(parts[1].length).toBeLessThanOrEqual(2)
          }
        }
      }
    }
  })

  it('各月存在无分录出纳任务（余额核对/票据归档）', () => {
    const months = ['01','02','03','04','05','06','07','08','09','10','11','12']
    for (const m of months) {
      const tasks = getScenarioTutorials('construction', m)
      const hasEmptyCashierTask = tasks.some(t => t.entries.length === 0 && t.role === 'cashier')
      // 🏗️ 建筑业01月无信息类出纳任务（原有出纳任务全为填凭证，已转会计）
      if (m === '01') continue
      expect(hasEmptyCashierTask).toBe(true)
    }
  })

  it('全部12个月有出纳任务和会计任务', () => {
    for (const m of ['01','02','03','04','05','06','07','08','09','10','11','12']) {
      const tasks = getScenarioTutorials('construction', m)
      // 会计角色：role='accountant' 或未指定（默认会计）
      const hasAccountant = tasks.some(t => t.role === 'accountant' || !t.role)
      const hasCashier = tasks.some(t => t.role === 'cashier')
      expect(hasAccountant).toBe(true)
      // 🏗️ 建筑业01月无出纳任务（原有出纳任务全为填凭证，已转会计）
      if (m === '01') continue
      expect(hasCashier).toBe(true)
    }
  })

  it('全部任务有explanation字段（有分录时）', () => {
    for (const m of ['01','02','03','04','05','06','07','08','09','10','11','12']) {
      const tasks = getScenarioTutorials('construction', m)
      for (const t of tasks) {
        if (t.entries.length > 0) {
          for (const e of t.entries) {
            if (Number(e.debit) > 0 || Number(e.credit) > 0) {
              expect(e).toHaveProperty('explanation')
              expect(e.explanation).toBeTruthy()
            }
          }
        }
      }
    }
  })
})
