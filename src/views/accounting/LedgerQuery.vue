<template>
  <div class="page">
    <div class="page-header">
      <h2 class="page-title">账簿查询</h2>
      <div class="page-actions">
        <el-date-picker v-model="period" type="month" value-format="YYYYMM" size="small" style="width:150px" @change="loadData" />
        <el-select v-model="selectedSubjectId" filterable clearable placeholder="选择科目" size="small" style="width:220px" @change="loadData">
          <el-option v-for="s in leafSubjects" :key="s.id" :label="`${s.code} ${s.name}`" :value="s.id" />
        </el-select>
      </div>
    </div>

    <el-card shadow="never">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="总账" name="general">
          <el-table :data="generalData" border stripe size="small" empty-text="暂无数据">
            <el-table-column label="科目编码" prop="code" width="100" />
            <el-table-column label="科目名称" prop="name" min-width="160" />
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
        </el-tab-pane>

        <el-tab-pane label="明细账" name="detail">
          <el-table :data="detailData" border stripe size="small" empty-text="请选择科目查看明细">
            <el-table-column label="日期" prop="date" width="100" />
            <el-table-column label="凭证号" prop="voucherNo" width="170" />
            <el-table-column label="摘要" prop="summary" min-width="200" />
            <el-table-column label="借方金额" width="140" align="right">
              <template #default="{ row }">{{ row.debit ? fmt(row.debit) : '' }}</template>
            </el-table-column>
            <el-table-column label="贷方金额" width="140" align="right">
              <template #default="{ row }">{{ row.credit ? fmt(row.credit) : '' }}</template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="多栏账" name="multi">
          <div class="multi-tip">
            <el-alert type="info" show-icon :closable="false"
              title="多栏账按科目+辅助核算维度展开。当前显示所有选中科目的本期发生额。" />
          </div>
          <el-table :data="multiData" border stripe size="small" empty-text="暂无数据">
            <el-table-column label="科目" prop="name" min-width="160" />
            <el-table-column label="借方合计" width="140" align="right">
              <template #default="{ row }">{{ row.debitTotal ? fmt(row.debitTotal) : '' }}</template>
            </el-table-column>
            <el-table-column label="贷方合计" width="140" align="right">
              <template #default="{ row }">{{ row.creditTotal ? fmt(row.creditTotal) : '' }}</template>
            </el-table-column>
            <el-table-column label="净额" width="140" align="right">
              <template #default="{ row }">{{ row.net ? fmt(row.net) : '' }}</template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from '@/stores/store.js'
import { formatAmount, getCurrentPeriod } from '@/utils/accounting.js'

const store = useStore()
const activeTab = ref('general')
const period = ref(getCurrentPeriod())
const selectedSubjectId = ref('')
const generalData = ref([])
const detailData = ref([])
const multiData = ref([])

function fmt(val) { return formatAmount(val) }

const leafSubjects = computed(() => store.state.subjects.filter(s => s.isLeaf && s.opened))

function loadData() {
  if (activeTab.value === 'general') loadGeneral()
  else if (activeTab.value === 'detail') loadDetail()
  else loadMulti()
}

function loadGeneral() {
  const tb = store.getTrialBalance(period.value)
  generalData.value = (tb.items || []).filter(i => {
    if (!selectedSubjectId.value) return true
    return i.code === selectedSubjectId.value || i.code.startsWith(selectedSubjectId.value)
  })
}

function loadDetail() {
  if (!selectedSubjectId.value) { detailData.value = []; return }
  const vouchers = store.state.vouchers.filter(v => v.status === 'posted' && v.period === period.value)
  const rows = []
  for (const v of vouchers) {
    for (const e of v.entries) {
      if (e.subjectId === selectedSubjectId.value) {
        rows.push({
          date: v.date,
          voucherNo: v.voucherNo,
          summary: e.summary || '',
          debit: e.debit || 0,
          credit: e.credit || 0,
        })
      }
    }
  }
  rows.sort((a, b) => a.date.localeCompare(b.date) || a.voucherNo.localeCompare(b.voucherNo))
  detailData.value = rows
}

function loadMulti() {
  const tb = store.getTrialBalance(period.value)
  multiData.value = (tb.items || []).slice(0, 20).map(i => ({
    name: `${i.code} ${i.name}`,
    debitTotal: i.currentDebit || 0,
    creditTotal: i.currentCredit || 0,
    net: (i.currentDebit || 0) - (i.currentCredit || 0),
  }))
}

onMounted(loadData)
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 8px;
}
.page-title { font-size: 20px; color: #303133; }
.page-actions { display: flex; gap: 8px; align-items: center; }
.multi-tip { margin-bottom: 12px; }
</style>
