/**
 * 科目迁移测试
 * 验证：
 * 1. DEFAULT_SUBJECTS 包含所有新增子科目
 * 2. 老用户迁移逻辑正确补全缺失科目
 * 3. 迁移不产生重复科目
 */
import { describe, it, expect, beforeEach } from 'vitest'

// 迁移中定义的新科目 ID 列表（与 store.js 同步）
const NEW_SUBJECT_IDS = [
  // 销售费用明细（6601）
  's-660103', 's-660104', 's-660105', 's-660106',
  // 管理费用明细（6602）
  's-660207', 's-660208', 's-660209', 's-660210',
  's-660211', 's-660212', 's-660213', 's-660214',
  's-660215', 's-660216', 's-660217',
  // 其他应付款明细（2241）
  's-224103', 's-224104', 's-224105', 's-224106', 's-224199',
  // 盈余公积明细（4101）
  's-410102',
]

// 构建一个没有新科目的"老用户"状态
function createOldState() {
  return {
    subjects: [
      // 只包含一部分旧科目，验证迁移能补全
      { id: 's-1001', code: '1001', name: '库存现金', type: 'asset', parentId: null, isLeaf: true, opened: true },
      { id: 's-1002', code: '1002', name: '银行存款', type: 'asset', parentId: null, isLeaf: false, opened: true },
      { id: 's-100201', code: '01', name: '工商银行', type: 'asset', parentId: 's-1002', isLeaf: true, opened: true },
      { id: 's-6601', code: '6601', name: '销售费用', type: 'profit_loss', parentId: null, isLeaf: false, opened: true },
      { id: 's-660101', code: '01', name: '广告费', type: 'profit_loss', parentId: 's-6601', isLeaf: true, opened: true },
      { id: 's-660102', code: '02', name: '运输费', type: 'profit_loss', parentId: 's-6601', isLeaf: true, opened: true },
      { id: 's-6602', code: '6602', name: '管理费用', type: 'profit_loss', parentId: null, isLeaf: false, opened: true },
      { id: 's-660201', code: '01', name: '办公费', type: 'profit_loss', parentId: 's-6602', isLeaf: true, opened: true },
      { id: 's-660202', code: '02', name: '差旅费', type: 'profit_loss', parentId: 's-6602', isLeaf: true, opened: true },
      { id: 's-660203', code: '03', name: '工资薪金', type: 'profit_loss', parentId: 's-6602', isLeaf: true, opened: true },
      { id: 's-660204', code: '04', name: '研发费用', type: 'profit_loss', parentId: 's-6602', isLeaf: true, opened: true },
      { id: 's-660205', code: '05', name: '折旧费', type: 'profit_loss', parentId: 's-6602', isLeaf: true, opened: true },
      { id: 's-660206', code: '06', name: '摊销费', type: 'profit_loss', parentId: 's-6602', isLeaf: true, opened: true },
      { id: 's-2241', code: '2241', name: '其他应付款', type: 'liability', parentId: null, isLeaf: false, opened: true },
      { id: 's-224101', code: '01', name: '社保个人部分', type: 'liability', parentId: 's-2241', isLeaf: true, opened: true },
      { id: 's-224102', code: '02', name: '公积金个人部分', type: 'liability', parentId: 's-2241', isLeaf: true, opened: true },
      { id: 's-4101', code: '4101', name: '盈余公积', type: 'equity', parentId: null, isLeaf: false, opened: true },
      { id: 's-410101', code: '01', name: '法定盈余公积', type: 'equity', parentId: 's-4101', isLeaf: true, opened: true },
      { id: 's-4103', code: '4103', name: '本年利润', type: 'equity', parentId: null, isLeaf: true, opened: true },
      { id: 's-4104', code: '4104', name: '利润分配', type: 'equity', parentId: null, isLeaf: false, opened: true },
      { id: 's-410401', code: '01', name: '未分配利润', type: 'equity', parentId: 's-4104', isLeaf: true, opened: true },
      { id: 's-410402', code: '02', name: '提取盈余公积', type: 'equity', parentId: 's-4104', isLeaf: true, opened: true },
      { id: 's-410403', code: '03', name: '应付普通股股利', type: 'equity', parentId: 's-4104', isLeaf: true, opened: true },
    ],
    vouchers: [],
    periodBalances: [],
  }
}

// 导入 DEFAULT_SUBJECTS（从 store.js 中提取）
import { useStore } from '@/stores/store.js'

describe('科目迁移', () => {
  let store

  beforeEach(() => {
    localStorage.clear()
    store = useStore()
    store.resetToDefaults()
  })

  it('DEFAULT_SUBJECTS 包含所有新增子科目', () => {
    const subjects = store.state.subjects
    for (const id of NEW_SUBJECT_IDS) {
      const found = subjects.find(s => s.id === id)
      expect(found).toBeDefined(`缺少科目 ${id}`)
      expect(found.isLeaf).toBe(true)
      expect(found.opened).toBe(true)
    }
  })

  it('新增子科目属于正确的父级', () => {
    const subjects = store.state.subjects

    // 660103-660106 属于 6601
    for (const id of ['s-660103', 's-660104', 's-660105', 's-660106']) {
      const s = subjects.find(x => x.id === id)
      expect(s).toBeDefined()
      expect(s.parentId).toBe('s-6601')
    }

    // 660207-660217 属于 6602
    for (const id of ['s-660207', 's-660208', 's-660209', 's-660210',
      's-660211', 's-660212', 's-660213', 's-660214',
      's-660215', 's-660216', 's-660217']) {
      const s = subjects.find(x => x.id === id)
      expect(s).toBeDefined()
      expect(s.parentId).toBe('s-6602')
    }

    // 224103-224199 属于 2241
    for (const id of ['s-224103', 's-224104', 's-224105', 's-224106', 's-224199']) {
      const s = subjects.find(x => x.id === id)
      expect(s).toBeDefined()
      expect(s.parentId).toBe('s-2241')
    }

    // 410102 属于 4101
    const s410102 = subjects.find(x => x.id === 's-410102')
    expect(s410102).toBeDefined()
    expect(s410102.parentId).toBe('s-4101')
  })

  it('迁移代码能补全缺失科目（模拟老用户数据）', () => {
    // 手动模拟迁移逻辑
    const oldState = createOldState()
    const newSubjectDefs = store.state.subjects

    let addedCount = 0
    for (const id of NEW_SUBJECT_IDS) {
      const exists = oldState.subjects.some(s => s.id === id)
      if (!exists) {
        const src = newSubjectDefs.find(s => s.id === id)
        expect(src).toBeDefined(`迁移源中找不到 ${id}`)
        oldState.subjects.push({ ...src })
        addedCount++
      }
    }

    // 验证补全了
    expect(addedCount).toBe(NEW_SUBJECT_IDS.length)

    // 验证补全后没有重复 ID
    const ids = oldState.subjects.map(s => s.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)

    // 验证新科目属性完整
    for (const id of NEW_SUBJECT_IDS) {
      const found = oldState.subjects.find(s => s.id === id)
      expect(found).toBeDefined()
      expect(found.isLeaf).toBe(true)
      expect(typeof found.name).toBe('string')
      expect(found.name.length).toBeGreaterThan(0)
    }
  })

  it('迁移不破坏已有科目', () => {
    const oldState = createOldState()
    const originalCount = oldState.subjects.length

    // 迁移补全
    const allSubjects = store.state.subjects
    for (const id of NEW_SUBJECT_IDS) {
      if (!oldState.subjects.some(s => s.id === id)) {
        const src = allSubjects.find(s => s.id === id)
        if (src) oldState.subjects.push({ ...src })
      }
    }

    // 验证旧科目都在
    expect(oldState.subjects.length).toBe(originalCount + NEW_SUBJECT_IDS.length)
    expect(oldState.subjects.find(s => s.id === 's-1001')).toBeDefined()
    expect(oldState.subjects.find(s => s.id === 's-660201')).toBeDefined()
    expect(oldState.subjects.find(s => s.id === 's-660206')).toBeDefined()
    expect(oldState.subjects.find(s => s.id === 's-224101')).toBeDefined()
    expect(oldState.subjects.find(s => s.id === 's-410101')).toBeDefined()
  })

  it('重置后新科目也在（resetToDefaults 使用完整 DEFAULT_SUBJECTS）', () => {
    store.resetToDefaults()
    const subjects = store.state.subjects
    for (const id of NEW_SUBJECT_IDS) {
      expect(subjects.some(s => s.id === id)).toBe(true)
    }
  })
})
