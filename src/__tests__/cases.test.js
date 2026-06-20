/**
 * 案例库数据测试
 *
 * 验证全部9个案例的：
 * - 数据加载
 * - 事件数量
 * - 字段完整性
 * - 借贷平衡
 * - 金额小数位（G5）
 * - 科目完整性
 */
import { describe, it, expect } from 'vitest'
import { CASES, getCaseConfig, getCasesByType } from '@/data/cases/index.js'

// 期望的事件数量
const EXPECTED_EVENT_COUNTS = {
  small_retail: 30,
  small_consulting: 27,
  small_restaurant: 32,
  medium_mfg: 39,
  medium_trade: 37,
  medium_construction: 36,
  large_group: 48,
  large_retail_chain: 45,
  large_property: 47,
}

// 期望的规模分布
const EXPECTED_TYPE_DISTRIBUTION = {
  small: 3,
  medium: 3,
  large: 3,
}

describe('案例库 - 注册表', () => {
  it('总计9个案例', () => {
    expect(CASES.length).toBe(9)
  })

  it('按规模分组各3个', () => {
    const byType = getCasesByType()
    expect(byType.small.length).toBe(EXPECTED_TYPE_DISTRIBUTION.small)
    expect(byType.medium.length).toBe(EXPECTED_TYPE_DISTRIBUTION.medium)
    expect(byType.large.length).toBe(EXPECTED_TYPE_DISTRIBUTION.large)
  })

  it('每个案例有完整配置字段', () => {
    for (const c of CASES) {
      expect(c).toHaveProperty('id')
      expect(c).toHaveProperty('title')
      expect(c).toHaveProperty('type')
      expect(c).toHaveProperty('typeLabel')
      expect(c).toHaveProperty('icon')
      expect(c).toHaveProperty('difficulty')
      expect(c).toHaveProperty('industry')
      expect(c).toHaveProperty('taxType')
      expect(c).toHaveProperty('desc')
      expect(c).toHaveProperty('eventCount')
      expect(c).toHaveProperty('data')
      // 难度值有效
      expect(c.difficulty).toBeGreaterThanOrEqual(1)
    }
  })

  it('getCaseConfig 按ID正确查找', () => {
    for (const c of CASES) {
      const found = getCaseConfig(c.id)
      expect(found).toBeTruthy()
      expect(found.id).toBe(c.id)
    }
    expect(getCaseConfig('nonexistent')).toBeNull()
  })

  it('每个案例的eventCount与实际事件数一致', () => {
    for (const c of CASES) {
      expect(c.eventCount).toBe(c.data.events.length)
    }
  })
})

describe('案例库 - 数据加载', () => {
  for (const c of CASES) {
    describe(c.title, () => {
      it('加载成功', () => {
        expect(c.data).toBeTruthy()
        expect(c.data.events).toBeTruthy()
        expect(c.data.subjects).toBeTruthy()
      })

      it(`事件数正确（期望 ${EXPECTED_EVENT_COUNTS[c.id]}）`, () => {
        expect(c.data.events.length).toBe(EXPECTED_EVENT_COUNTS[c.id])
      })

      it('每个事件有必需字段', () => {
        for (const evt of c.data.events) {
          expect(evt).toHaveProperty('id')
          expect(evt).toHaveProperty('date')
          expect(evt).toHaveProperty('title')
          expect(evt).toHaveProperty('entries')
          expect(evt).toHaveProperty('explanation')
          expect(evt.explanation).toBeTruthy()
          expect(Array.isArray(evt.entries)).toBe(true)
        }
      })

      it('每个事件的日期在2026年1月范围内', () => {
        for (const evt of c.data.events) {
          expect(evt.date).toMatch(/^2026-01-/)
        }
      })

      it('分录借贷平衡', () => {
        for (const evt of c.data.events) {
          if (evt.entries.length === 0) continue
          let debitTotal = 0
          let creditTotal = 0
          for (const e of evt.entries) {
            debitTotal += Number(e.debit) || 0
            creditTotal += Number(e.credit) || 0
          }
          expect(Math.abs(debitTotal - creditTotal)).toBeLessThan(0.01)
        }
      })

      it('金额不超过2位小数（G5铁律）', () => {
        for (const evt of c.data.events) {
          for (const e of evt.entries) {
            for (const key of ['debit', 'credit']) {
              const val = e[key]
              if (val && typeof val === 'number') {
                const str = String(val)
                const dotIdx = str.indexOf('.')
                if (dotIdx !== -1) {
                  expect(str.length - dotIdx - 1).toBeLessThanOrEqual(2)
                }
              }
            }
          }
        }
      })

      it('每个分录有summary字段', () => {
        for (const evt of c.data.events) {
          for (const e of evt.entries) {
            if (Number(e.debit) > 0 || Number(e.credit) > 0) {
              expect(e).toHaveProperty('summary')
              expect(e.summary).toBeTruthy()
            }
          }
        }
      })

      it('存在说明文档的事件有documents数组', () => {
        // 检查是否有事件带documents（非强制，但多数事件应有）
        const withDocs = c.data.events.filter(e => e.documents && e.documents.length > 0)
        expect(withDocs.length).toBeGreaterThanOrEqual(3)
      })

      it('科目表不小于10个', () => {
        expect(c.data.subjects.length).toBeGreaterThanOrEqual(10)
      })

      it('每个科目有必需字段', () => {
        for (const sub of c.data.subjects) {
          expect(sub).toHaveProperty('id')
          expect(sub).toHaveProperty('code')
          expect(sub).toHaveProperty('name')
          expect(sub).toHaveProperty('type')
          expect(['asset', 'liability', 'equity', 'cost', 'profit_loss']).toContain(sub.type)
        }
      })

      it('companyInfo完整', () => {
        const info = c.data.companyInfo
        expect(info).toBeTruthy()
        expect(info).toHaveProperty('name')
        expect(info).toHaveProperty('shortName')
        expect(info).toHaveProperty('taxType')
        expect(info).toHaveProperty('taxRate')
        expect(info).toHaveProperty('accountingSystem')
        expect(info).toHaveProperty('industry')
        expect(info).toHaveProperty('description')
      })
    })
  }
})

describe('案例库 - 额外质量检查', () => {
  it('所有事件ID格式为 evt_nn', () => {
    for (const c of CASES) {
      for (const evt of c.data.events) {
        expect(evt.id).toMatch(/^evt_\d{2}[a-z]?$/)
      }
    }
  })

  it('所有事件ID在各自的案例内唯一', () => {
    for (const c of CASES) {
      const ids = c.data.events.map(e => e.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    }
  })

  it('大型案例事件数>=40，中型>=35，小型>=25', () => {
    for (const c of CASES) {
      if (c.type === 'large') {
        expect(c.eventCount).toBeGreaterThanOrEqual(40)
      } else if (c.type === 'medium') {
        expect(c.eventCount).toBeGreaterThanOrEqual(35)
      } else if (c.type === 'small') {
        expect(c.eventCount).toBeGreaterThanOrEqual(25)
      }
    }
  })

  it('每个案例至少有一个期末调整事件（摊销/折旧/税费）', () => {
    for (const c of CASES) {
      const hasAdjustment = c.data.events.some(e =>
        e.title.includes('摊销') || e.title.includes('折旧') ||
        e.title.includes('增值税') || e.title.includes('城建税') ||
        e.title.includes('所得税')
      )
      expect(hasAdjustment).toBe(true)
    }
  })

  it('所有案例合计事件数>=335', () => {
    const totalEvents = CASES.reduce((sum, c) => sum + c.eventCount, 0)
    expect(totalEvents).toBeGreaterThanOrEqual(335)
  })
})

describe('案例库 - periodEnd配置', () => {
  for (const c of CASES) {
    it(`${c.id} 有标准periodEnd配置`, () => {
      const pe = c.data.periodEnd
      expect(pe).toBeTruthy()
      expect(pe).toHaveProperty('depreciation')
      expect(pe).toHaveProperty('amortization')
      expect(pe).toHaveProperty('taxTransfer')
      expect(pe).toHaveProperty('profitTransfer')
    })
  }
})
