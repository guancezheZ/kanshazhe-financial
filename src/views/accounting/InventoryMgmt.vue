<template>
  <div class="page">
    <div class="page-header">
      <h2 class="page-title">📦 存货管理</h2>
      <div class="page-actions">
        <el-tag type="info" effect="plain">
          {{ currentPeriodLabel }}
        </el-tag>
        <el-button size="small" @click="refreshData">
          <el-icon><Refresh /></el-icon>刷新
        </el-button>
      </div>
    </div>

    <el-alert
      title="本页面仅供查看"
      type="info"
      show-icon
      :closable="false"
      style="margin-bottom:12px"
    >
      <template #default>
        入库/出库/盘点操作请通过
        <router-link to="/accounting/voucher-entry" style="color:#409eff">凭证录入</router-link>
        完成，系统自动更新库存台账。
      </template>
    </el-alert>

    <div class="inventory-layout">
      <!-- 左侧：仓库列表 -->
      <div class="warehouse-sidebar">
        <div
          v-for="wh in warehouses"
          :key="wh.code"
          class="warehouse-card"
          :class="{ active: activeWarehouse === wh.code }"
          @click="selectWarehouse(wh.code)"
        >
          <div class="wh-icon">{{ wh.icon }}</div>
          <div class="wh-info">
            <div class="wh-name">{{ wh.name }}</div>
            <div class="wh-count">{{ wh.subjectCodes.join(', ') }}</div>
            <div class="wh-balance">余额：{{ fmt(warehouseBalance(wh.code)) }}</div>
          </div>
        </div>
      </div>

      <!-- 右侧：明细台账 -->
      <div class="ledger-area">
        <el-card shadow="never">
          <template #header>
            <div class="ledger-header">
              <div class="ledger-title">
                <span class="ledger-wh-name">{{ currentWarehouse?.name }}明细台账</span>
                <el-tag size="small" type="info" effect="plain">{{ currentWarehouse?.subjectCodes.join(' / ') }}</el-tag>
              </div>
              <div class="ledger-summary">
                <span>期初余额：{{ fmt(currentPeriodOpening) }}</span>
                <span class="summary-divider">|</span>
                <span>本期入库：{{ fmt(periodInTotal) }}</span>
                <span class="summary-divider">|</span>
                <span>本期出库：{{ fmt(periodOutTotal) }}</span>
                <span class="summary-divider">|</span>
                <span>期末余额：{{ fmt(periodEndBalance) }}</span>
              </div>
            </div>
          </template>
          <el-table
            :data="ledgerData"
            border
            stripe
            size="small"
            empty-text="暂无库存变动记录（当前期间已过账凭证中未找到相关科目分录）"
            style="width:100%"
          >
            <el-table-column label="日期" width="100">
              <template #default="{ row }">{{ row.date }}</template>
            </el-table-column>
            <el-table-column label="凭证号" width="130">
              <template #default="{ row }">{{ row.voucherNo }}</template>
            </el-table-column>
            <el-table-column label="摘要" min-width="200">
              <template #default="{ row }">{{ row.summary }}</template>
            </el-table-column>
            <el-table-column label="科目" width="160">
              <template #default="{ row }">
                <span class="entry-subject">{{ row.subjectCode }} {{ row.subjectName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="入库金额" width="130" align="right" header-align="right">
              <template #default="{ row }">
                <span v-if="row.inAmount" class="amount-in">{{ fmt(row.inAmount) }}</span>
                <span v-else class="amount-none">-</span>
              </template>
            </el-table-column>
            <el-table-column label="出库金额" width="130" align="right" header-align="right">
              <template #default="{ row }">
                <span v-if="row.outAmount" class="amount-out">{{ fmt(row.outAmount) }}</span>
                <span v-else class="amount-none">-</span>
              </template>
            </el-table-column>
            <el-table-column label="结存金额" width="130" align="right" header-align="right">
              <template #default="{ row }">
                <span class="amount-balance">{{ fmt(row.balance) }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { Refresh } from '@element-plus/icons-vue'
import { useStore } from '@/stores/store.js'
import { getCurrentPeriod, formatAmount, round, VOUCHER_STATUS } from '@/utils/accounting.js'

const store = useStore()
const activeWarehouse = ref('raw')

// 仓库定义（科目映射）
const warehouseDefs = [
  { code: 'raw',      name: '原材料仓',   icon: '📦', subjectCodes: ['1403'],          description: '原材料收发存' },
  { code: 'wip',      name: '在制品仓', icon: '⚙️', subjectCodes: ['5001', '5101'],  description: '生产成本归集与分配' },
  { code: 'finished', name: '产成品仓', icon: '🏭', subjectCodes: ['1405'],          description: '库存商品收发存' },
]

const currentPeriod = computed(() => getCurrentPeriod())

const currentPeriodLabel = computed(() => {
  const p = currentPeriod.value
  return p ? `${p.slice(0, 4)}年${p.slice(4, 6)}月` : ''
})

// ============ 科目查找 ============

function findSubjectByFullCode(fullCode) {
  const subjects = store.state.subjects
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

function getSubjectName(fullCode) {
  const s = findSubjectByFullCode(fullCode)
  return s ? s.name : fullCode
}

// ============ 台账数据 ============

// 检查科目的 fullCode 是否匹配某个仓库
function matchWarehouse(fullCode, whCodes) {
  return whCodes.some(wc => fullCode === wc || fullCode.startsWith(wc))
}

// 仓库基础数据
const warehouses = computed(() => {
  return warehouseDefs.map(wh => {
    const data = computeWarehouseData(wh)
    return { ...wh, ...data }
  })
})

const currentWarehouse = computed(() => {
  return warehouses.value.find(w => w.code === activeWarehouse.value)
})

// 台账明细行
const ledgerData = computed(() => {
  return currentWarehouse.value?.ledger || []
})

// 汇总金额
const currentPeriodOpening = computed(() => currentWarehouse.value?.openingBalance ?? 0)
const periodInTotal = computed(() => currentWarehouse.value?.inTotal ?? 0)
const periodOutTotal = computed(() => currentWarehouse.value?.outTotal ?? 0)
const periodEndBalance = computed(() => currentWarehouse.value?.closingBalance ?? 0)

function warehouseBalance(whCode) {
  const wh = warehouses.value.find(w => w.code === whCode)
  return wh?.closingBalance ?? 0
}

function selectWarehouse(code) {
  activeWarehouse.value = code
}

// ============ 核心计算逻辑 ============

function computeWarehouseData(wh) {
  const period = currentPeriod.value
  if (!period || !store.state.vouchers) {
    return { ledger: [], openingBalance: 0, inTotal: 0, outTotal: 0, closingBalance: 0 }
  }

  // 获取当前期间已过账的凭证
  const vouchers = store.state.vouchers.filter(v => v.period === period && v.status === VOUCHER_STATUS.POSTED)

  // 排序：按日期、凭证号
  vouchers.sort((a, b) => a.date.localeCompare(b.date) || a.seq - b.seq)

  // 提取该仓库相关的分录行
  const rows = []
  for (const v of vouchers) {
    for (const e of v.entries) {
      if (!matchWarehouse(e.subjectCode, wh.subjectCodes)) continue
      rows.push({
        date: v.date,
        voucherNo: v.voucherNo,
        summary: e.summary,
        subjectCode: e.subjectCode,
        subjectName: e.subjectName || getSubjectName(e.subjectCode),
        debit: round(Number(e.debit) || 0),
        credit: round(Number(e.credit) || 0),
        inAmount: round(Number(e.debit) || 0),
        outAmount: round(Number(e.credit) || 0),
      })
    }
  }

  // 计算期初余额 = 上月余额（简化：取上月的期末余额）
  // 从 periodBalances 中取上一个期间的余额作为期初
  const openingBalance = computeOpeningBalance(wh.subjectCodes, period)

  // 计算累计入库/出库
  const inTotal = round(rows.reduce((sum, r) => sum + r.inAmount, 0))
  const outTotal = round(rows.reduce((sum, r) => sum + r.outAmount, 0))

  // 计算逐行结存
  let runningBalance = openingBalance
  for (const r of rows) {
    // 资产/成本类科目：借方(=入库)增加余额，贷方(=出库)减少余额
    runningBalance = round(runningBalance + r.inAmount - r.outAmount)
    r.balance = runningBalance
  }

  const closingBalance = round(openingBalance + inTotal - outTotal)

  return {
    ledger: rows,
    openingBalance,
    inTotal,
    outTotal,
    closingBalance,
  }
}

// 计算期初余额：取上一期间的 balance closingDebit - closingCredit
function computeOpeningBalance(subjectCodes, currentPeriod) {
  const periodBalances = store.state.periodBalances || []

  // 找到上一个月份
  const year = parseInt(currentPeriod.slice(0, 4))
  const month = parseInt(currentPeriod.slice(4, 6))
  let prevMonth = month - 1
  let prevYear = year
  if (prevMonth === 0) { prevMonth = 12; prevYear-- }
  const prevPeriod = `${prevYear}${String(prevMonth).padStart(2, '0')}`

  // 遍历科目编码，从上一期间的余额中累加
  let balance = 0
  for (const code of subjectCodes) {
    const subjects = store.state.subjects.filter(s => {
      // 匹配一级科目（code === '1403'）及其子科目
      const fullCode = getSubjectFullCode(s.id)
      return fullCode === code || fullCode.startsWith(code)
    })

    for (const s of subjects) {
      const pb = periodBalances.find(p => p.period === prevPeriod && p.subjectId === s.id)
      if (pb) {
        // 资产/成本类：closingDebit - closingCredit = 借方余额
        balance += round(Number(pb.closingDebit) - Number(pb.closingCredit))
      }
    }
  }

  return round(balance)
}

// 获取科目的完整编码
function getSubjectFullCode(subjectId) {
  const subjects = store.state.subjects
  const s = subjects.find(x => x.id === subjectId)
  if (!s) return ''
  let code = s.code
  let parent = s.parentId ? subjects.find(p => p.id === s.parentId) : null
  while (parent) {
    code = parent.code + code
    parent = parent.parentId ? subjects.find(p => p.id === parent.parentId) : null
  }
  return code
}

function fmt(v) { return formatAmount(v) }

function refreshData() {
  // 计算属性自动依赖响应式数据，手动触发重新计算即可
  ElMessage.success('已刷新')
}

onMounted(() => {
  // 默认选中第一个仓库
  if (!activeWarehouse.value && warehouseDefs.length) {
    activeWarehouse.value = warehouseDefs[0].code
  }
})
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.page-title {
  font-size: 20px;
  color: #303133;
  margin: 0;
}
.page-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* 左右布局 */
.inventory-layout {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

/* 左侧仓库列表 */
.warehouse-sidebar {
  width: 220px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.warehouse-card {
  display: flex;
  gap: 12px;
  padding: 16px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  background: var(--bg-card);
}
.warehouse-card:hover {
  border-color: #409eff;
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.12);
}
.warehouse-card.active {
  border-color: #409eff;
  background: #ecf5ff;
}

.wh-icon {
  font-size: 32px;
  line-height: 1;
}
.wh-info {
  flex: 1;
  min-width: 0;
}
.wh-name {
  font-weight: 600;
  font-size: 15px;
  color: #303133;
}
.wh-count {
  font-size: 12px;
  color: #909399;
  margin-top: 2px;
}
.wh-balance {
  font-size: 14px;
  color: #606266;
  margin-top: 6px;
  font-weight: 500;
}

/* 右侧台账区域 */
.ledger-area {
  flex: 1;
  min-width: 0;
}
.ledger-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.ledger-title {
  display: flex;
  align-items: center;
  gap: 10px;
}
.ledger-wh-name {
  font-weight: 600;
  font-size: 16px;
}
.ledger-summary {
  font-size: 13px;
  color: #606266;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.summary-divider {
  color: #dcdfe6;
}

.entry-subject {
  font-size: 12px;
  color: #606266;
}

.amount-in {
  color: #67c23a;
  font-weight: 500;
}
.amount-out {
  color: #f56c6c;
  font-weight: 500;
}
.amount-balance {
  color: #303133;
  font-weight: 600;
}
.amount-none {
  color: #c0c4cc;
}

/* 暗色主题适配 */
html.dark .warehouse-card {
  background: #1d1e1f;
  border-color: #4c4d4f;
}
html.dark .warehouse-card:hover {
  border-color: #409eff;
}
html.dark .warehouse-card.active {
  background: #18222c;
  border-color: #409eff;
}
html.dark .wh-name {
  color: #e5eaf3;
}
html.dark .wh-balance {
  color: #cfd3dc;
}
html.dark .ledger-wh-name {
  color: #e5eaf3;
}
</style>
