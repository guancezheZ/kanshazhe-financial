<template>
  <div class="page">
    <div class="page-header">
      <h2 class="page-title">现金流量表</h2>
      <div class="page-actions">
        <el-date-picker v-model="period" type="month" value-format="YYYYMM" placeholder="选择期间" size="small" style="width:150px" @change="loadData" />
      </div>
    </div>

    <el-card shadow="never" style="max-width:700px">
      <template #header>
        <div class="report-title">现金流量表</div>
        <div class="report-subtitle">{{ periodLabel }} 单位：元</div>
      </template>

      <el-table :data="tableData" border stripe size="small" style="width:100%">
        <el-table-column label="项目" min-width="300">
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
import { useStore } from '@/stores/store.js'
import { formatAmount, getCurrentPeriod } from '@/utils/accounting.js'

const store = useStore()
const period = ref(getCurrentPeriod())
const reportData = reactive({
  operating: { net: 0, items: [] },
  investing: { net: 0, items: [] },
  financing: { net: 0, items: [] },
  netIncrease: 0,
  netProfit: 0,
})

function fmt(val) { return formatAmount(val) }

const periodLabel = computed(() => {
  const p = period.value
  return p ? `${p.slice(0,4)}年${p.slice(4,6)}月` : ''
})

const tableData = computed(() => {
  const rows = []
  // 一、经营活动
  rows.push({ name: '一、经营活动现金流量', amount: '', bold: true, indent: false })
  // 经营活动明细项目
  const opItems = reportData.operating.items || []
  for (const item of opItems) {
    if (item.amount !== 0) {
      rows.push({ name: item.name, amount: item.amount, bold: false, indent: true })
    }
  }
  rows.push({ name: '经营活动现金流量净额', amount: reportData.operating.net, bold: true, indent: false })

  // 二、投资活动
  rows.push({ name: '二、投资活动现金流量', amount: '', bold: true, indent: false })
  const invItems = reportData.investing.items || []
  for (const item of invItems) {
    if (item.amount !== 0) {
      rows.push({ name: item.name, amount: item.amount, bold: false, indent: true })
    }
  }
  rows.push({ name: '投资活动现金流量净额', amount: reportData.investing.net, bold: true, indent: true })

  // 三、筹资活动
  rows.push({ name: '三、筹资活动现金流量', amount: '', bold: true, indent: false })
  const finItems = reportData.financing.items || []
  for (const item of finItems) {
    if (item.amount !== 0) {
      rows.push({ name: item.name, amount: item.amount, bold: false, indent: true })
    }
  }
  rows.push({ name: '筹资活动现金流量净额', amount: reportData.financing.net, bold: true, indent: true })

  // 四、现金净增加额
  rows.push({ name: '四、现金净增加额', amount: reportData.netIncrease, bold: true, indent: false })

  return rows
})

function loadData() {
  const data = store.getCashFlow(period.value)
  Object.assign(reportData, data)
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
