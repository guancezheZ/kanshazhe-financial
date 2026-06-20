<template>
  <div class="page">
    <div class="page-header">
      <h2 class="page-title">利润表</h2>
      <div class="page-actions">
        <el-date-picker v-model="period" type="month" value-format="YYYYMM" placeholder="选择期间" size="small" style="width:150px" @change="loadData" />
      </div>
    </div>

    <el-card shadow="never" style="max-width:700px">
      <template #header>
        <div class="report-title">利润表</div>
        <div class="report-subtitle">{{ periodLabel }} 单位：元</div>
      </template>

      <el-table :data="reportData.items || []" border stripe size="small" style="width:100%">
        <el-table-column label="项目" min-width="260">
          <template #default="{ row }">
            <span :style="{ fontWeight: row.bold ? 700 : 400, paddingLeft: row.indent ? '24px' : '0' }">
              {{ row.name }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="本期金额" width="180" align="right">
          <template #default="{ row }">
            <span :style="{ fontWeight: row.bold ? 700 : 400 }">{{ fmt(row.amount) }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/stores/store.js'
import { formatAmount, getCurrentPeriod } from '@/utils/accounting.js'

const store = useStore()
const route = useRoute()
const period = ref(getCurrentPeriod())
const reportData = reactive({ items: [], operatingProfit: 0, totalProfit: 0, netProfit: 0 })

function fmt(val) { return formatAmount(val) }

const periodLabel = computed(() => {
  const p = period.value
  return p ? `${p.slice(0,4)}年${p.slice(4,6)}月` : ''
})

function loadData() {
  const data = store.getIncomeStatement(period.value)
  Object.assign(reportData, data)
}

// 支持从查询参数 ?period=202604 跳转时自动选中期期间
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
.report-title {
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  color: #303133;
}
.report-subtitle {
  font-size: 12px;
  text-align: center;
  color: #909399;
  margin-top: 4px;
}
</style>
