<template>
  <div class="page">
    <div class="page-header">
      <h2 class="page-title">资产负债表</h2>
      <div class="page-actions">
        <el-date-picker v-model="period" type="month" value-format="YYYYMM" placeholder="选择期间" size="small" style="width:150px" @change="loadData" />
        <el-tag v-if="reportData.isBalanced" type="success" size="large">✓ 资产 = 负债 + 所有者权益</el-tag>
        <el-tag v-else type="danger" size="large">✗ 不平衡</el-tag>
      </div>
    </div>

    <el-card shadow="never">
      <template #header>
        <div class="report-title">资产负债表</div>
        <div class="report-subtitle">{{ periodLabel }} 单位：元</div>
      </template>

      <el-row :gutter="16">
        <el-col :span="12">
          <div class="section-title">资产</div>
          <el-table :data="reportData.assets?.items || []" border stripe size="small" style="width:100%"
            :summary-method="() => ['资产合计', '', fmt(reportData.assets?.total || 0)]"
            show-summary
          >
            <el-table-column label="项目" prop="name" min-width="200" />
            <el-table-column label="期末余额" width="160" align="right">
              <template #default="{ row }">{{ fmt(row.amount) }}</template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12">
          <div class="section-title">负债及所有者权益</div>
          <div class="sub-section-title">负债</div>
          <el-table :data="reportData.liabilities?.items || []" border stripe size="small" style="width:100%"
            :summary-method="() => ['负债合计', '', fmt(reportData.liabilities?.total || 0)]"
            show-summary
          >
            <el-table-column label="项目" prop="name" min-width="200" />
            <el-table-column label="期末余额" width="160" align="right">
              <template #default="{ row }">{{ fmt(row.amount) }}</template>
            </el-table-column>
          </el-table>
          <div class="sub-section-title" style="margin-top:12px">所有者权益</div>
          <el-table :data="reportData.equity?.items || []" border stripe size="small" style="width:100%"
            :summary-method="() => ['所有者权益合计', '', fmt(reportData.equity?.total || 0)]"
            show-summary
          >
            <el-table-column label="项目" prop="name" min-width="200" />
            <el-table-column label="期末余额" width="160" align="right">
              <template #default="{ row }">{{ fmt(row.amount) }}</template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

      <div class="balance-check">
        资产总计：<strong>{{ fmt(reportData.assets?.total || 0) }}</strong>
        &nbsp;=&nbsp;
        负债总计：<strong>{{ fmt(reportData.liabilities?.total || 0) }}</strong>
        &nbsp;+&nbsp;
        所有者权益总计：<strong>{{ fmt(reportData.equity?.total || 0) }}</strong>
      </div>
    </el-card>

    <FinancialIndicators :indicators="financialIndicators" />
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/stores/store.js'
import { formatAmount, getCurrentPeriod } from '@/utils/accounting.js'
import FinancialIndicators from '@/components/FinancialIndicators.vue'

const store = useStore()
const route = useRoute()
const period = ref(getCurrentPeriod())
const reportData = reactive({
  assets: { items: [], total: 0 },
  liabilities: { items: [], total: 0 },
  equity: { items: [], total: 0 },
  isBalanced: true,
})
const financialIndicators = ref([])

function fmt(val) { return formatAmount(val) }

const periodLabel = computed(() => {
  const p = period.value
  return p ? `${p.slice(0,4)}年${p.slice(4,6)}月` : ''
})

function loadData() {
  const data = store.getBalanceSheet(period.value)
  reportData.assets = data.assets
  reportData.liabilities = data.liabilities
  reportData.equity = data.equity
  reportData.isBalanced = data.isBalanced
  financialIndicators.value = store.getFinancialRatios(period.value)
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
.section-title {
  font-size: 14px;
  font-weight: 600;
  color: #409eff;
  margin-bottom: 8px;
}
.sub-section-title {
  font-size: 13px;
  font-weight: 600;
  color: #606266;
  margin: 8px 0;
}
.balance-check {
  text-align: center;
  margin-top: 16px;
  padding: 12px;
  background: #f8f9fb;
  border-radius: 4px;
  font-size: 14px;
  color: #303133;
}
</style>
