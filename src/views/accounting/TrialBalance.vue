<template>
  <div class="page">
    <div class="page-header">
      <h2 class="page-title">试算平衡表</h2>
      <div class="page-actions">
        <el-date-picker
          v-model="period"
          type="month"
          value-format="YYYYMM"
          placeholder="选择期间"
          size="small"
          style="width:150px"
          @change="loadData"
        />
        <el-tag v-if="isBalanced" type="success" size="large">✓ 借贷平衡</el-tag>
        <el-tag v-else type="danger" size="large">
          ✗ 不平衡（差额：{{ fmt(Math.abs(totalDebit - totalCredit)) }}）
        </el-tag>
      </div>
    </div>

    <el-card shadow="never">
      <el-table :data="items" border stripe size="small" style="width:100%" empty-text="当前期间无数据"
        :summary-method="showSummary"
        show-summary
      >
        <el-table-column label="科目编码" prop="code" width="120" />
        <el-table-column label="科目名称" prop="name" min-width="180" />
        <el-table-column label="方向" prop="direction" width="60" />
        <el-table-column label="期初借方" width="130" align="right">
          <template #default="{ row }">{{ row.openingDebit ? fmt(row.openingDebit) : '' }}</template>
        </el-table-column>
        <el-table-column label="期初贷方" width="130" align="right">
          <template #default="{ row }">{{ row.openingCredit ? fmt(row.openingCredit) : '' }}</template>
        </el-table-column>
        <el-table-column label="本期借方" width="130" align="right">
          <template #default="{ row }">{{ row.currentDebit ? fmt(row.currentDebit) : '' }}</template>
        </el-table-column>
        <el-table-column label="本期贷方" width="130" align="right">
          <template #default="{ row }">{{ row.currentCredit ? fmt(row.currentCredit) : '' }}</template>
        </el-table-column>
        <el-table-column label="期末借方" width="130" align="right">
          <template #default="{ row }">{{ row.closingDebit ? fmt(row.closingDebit) : '' }}</template>
        </el-table-column>
        <el-table-column label="期末贷方" width="130" align="right">
          <template #default="{ row }">{{ row.closingCredit ? fmt(row.closingCredit) : '' }}</template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/stores/store.js'
import { formatAmount, getCurrentPeriod } from '@/utils/accounting.js'

const store = useStore()
const route = useRoute()
const period = ref(getCurrentPeriod())
const items = ref([])
const totalDebit = ref(0)
const totalCredit = ref(0)
const isBalanced = computed(() => Math.abs(totalDebit.value - totalCredit.value) < 0.001)

function fmt(val) { return formatAmount(val) }

function loadData() {
  const tb = store.getTrialBalance(period.value)
  items.value = tb.items || []
  totalDebit.value = tb.totalDebit || 0
  totalCredit.value = tb.totalCredit || 0
}

function showSummary() {
  const sums = ['合计', '', '']
  const keys = ['openingDebit', 'openingCredit', 'currentDebit', 'currentCredit', 'closingDebit', 'closingCredit']
  const totals = {}
  keys.forEach(k => totals[k] = 0)
  for (const row of items.value) {
    keys.forEach(k => totals[k] += Number(row[k]) || 0)
  }
  keys.forEach(k => sums.push(fmt(totals[k])))
  return sums
}

// 支持从查询参数跳转时自动选中期期间
if (route.query.period) {
  period.value = route.query.period
}
loadData()
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.page-title { font-size: 20px; color: #303133; }
.page-actions { display: flex; gap: 8px; align-items: center; }
</style>
