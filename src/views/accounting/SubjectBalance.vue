<template>
  <div class="page">
    <div class="page-header">
      <h2 class="page-title">科目余额表</h2>
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
      </div>
    </div>
    <el-card shadow="never">
      <el-table :data="items" border stripe size="small" style="width:100%" empty-text="当前期间无数据">
        <el-table-column label="科目编码" prop="code" width="120" />
        <el-table-column label="科目名称" min-width="200">
          <template #default="{ row }">{{ getSubjectFullName(store.state.subjects, row.subjectId) }}</template>
        </el-table-column>
        <el-table-column label="方向" prop="direction" width="60" />
        <el-table-column label="期初借方" width="140" align="right">
          <template #default="{ row }">{{ row.openingDebit ? fmt(row.openingDebit) : '' }}</template>
        </el-table-column>
        <el-table-column label="期初贷方" width="140" align="right">
          <template #default="{ row }">{{ row.openingCredit ? fmt(row.openingCredit) : '' }}</template>
        </el-table-column>
        <el-table-column label="本期借方" width="140" align="right">
          <template #default="{ row }">{{ row.currentDebit ? fmt(row.currentDebit) : '' }}</template>
        </el-table-column>
        <el-table-column label="本期贷方" width="140" align="right">
          <template #default="{ row }">{{ row.currentCredit ? fmt(row.currentCredit) : '' }}</template>
        </el-table-column>
        <el-table-column label="期末借方" width="140" align="right">
          <template #default="{ row }">{{ row.closingDebit ? fmt(row.closingDebit) : '' }}</template>
        </el-table-column>
        <el-table-column label="期末贷方" width="140" align="right">
          <template #default="{ row }">{{ row.closingCredit ? fmt(row.closingCredit) : '' }}</template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from '@/stores/store.js'
import { formatAmount, getCurrentPeriod, getSubjectFullName } from '@/utils/accounting.js'

const store = useStore()
const period = ref(getCurrentPeriod())
const items = ref([])

function fmt(val) { return formatAmount(val) }

function loadData() {
  const p = period.value
  const tb = store.getTrialBalance(p)
  items.value = tb.items || []
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
.page-actions { display: flex; gap: 8px; }
</style>
