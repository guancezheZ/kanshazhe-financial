<template>
  <div class="page">
    <div class="page-header">
      <h2 class="page-title">期末结转</h2>
      <div class="page-actions">
        <el-date-picker v-model="period" type="month" value-format="YYYYMM" size="small" style="width:150px" />
        <el-button type="primary" @click="handleTransfer">执行结转</el-button>
      </div>
    </div>

    <el-alert type="info" show-icon :closable="false" style="margin-bottom:16px">
      <template #title>
        期末结转将损益类科目余额结转至"本年利润"，生成结转凭证。包括：收入类科目（贷方余额→借方）、费用类科目（借方余额→贷方）。
      </template>
    </el-alert>

    <el-card shadow="never">
      <template #header>收入类科目（结转至本年利润贷方）</template>
      <el-table :data="revenueItems" border stripe size="small" empty-text="本月无收入数据">
        <el-table-column label="科目" prop="name" min-width="200" />
        <el-table-column label="余额" width="150" align="right"><template #default="{ row }">{{ fmt(row.balance) }}</template></el-table-column>
      </el-table>
    </el-card>

    <el-card shadow="never" style="margin-top:16px">
      <template #header>费用类科目（结转至本年利润借方）</template>
      <el-table :data="expenseItems" border stripe size="small" empty-text="本月无费用数据">
        <el-table-column label="科目" prop="name" min-width="200" />
        <el-table-column label="余额" width="150" align="right"><template #default="{ row }">{{ fmt(row.balance) }}</template></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useStore } from '@/stores/store.js'
import { formatAmount, getCurrentPeriod } from '@/utils/accounting.js'

const store = useStore()
const period = ref(getCurrentPeriod())
const revenueItems = ref([])
const expenseItems = ref([])

function fmt(v) { return formatAmount(v) }

function loadData() {
  const tb = store.getTrialBalance(period.value)
  revenueItems.value = (tb.items || []).filter(i => {
    const code = i.code || ''
    return (code.startsWith('60') || code.startsWith('63') || code.startsWith('61')) && i.balance
  })
  expenseItems.value = (tb.items || []).filter(i => {
    const code = i.code || ''
    return (code.startsWith('64') || code.startsWith('66') || code.startsWith('67') || code.startsWith('68')) && i.balance
  })
}

function handleTransfer() {
  if (localStorage.getItem("tutorial_task")) { return ElMessage.warning("💡 教学期间期末结转由系统自动完成，手动结转会导致数据异常。请通过教学中心的课程流程完成期末处理。") }
  if (revenueItems.value.length === 0 && expenseItems.value.length === 0) {
    return ElMessage.info('本月无损益类科目余额，无需结转')
  }
  ElMessageBox.confirm(
    `确认执行结转？将生成结转凭证，把收入${revenueItems.value.length}项、费用${expenseItems.value.length}项结转至本年利润。`,
    '期末结转',
    { confirmButtonText: '执行', cancelButtonText: '取消', type: 'info' }
  ).then(() => {
    // 构建结转分录
    const entries = []
    for (const r of revenueItems.value) {
      entries.push({ subjectId: '', subjectCode: r.code, subjectName: r.name, debit: Math.abs(r.balance), credit: 0 })
    }
    for (const e of expenseItems.value) {
      entries.push({ subjectId: '', subjectCode: e.code, subjectName: e.name, debit: 0, credit: Math.abs(e.balance) })
    }
    // 差额计入本年利润
    const totalRevenue = revenueItems.value.reduce((s, i) => s + Math.abs(i.balance), 0)
    const totalExpense = expenseItems.value.reduce((s, i) => s + Math.abs(i.balance), 0)
    const profit = totalRevenue - totalExpense
    if (profit > 0) {
      entries.push({ subjectId: '', subjectCode: '4103', subjectName: '本年利润', debit: 0, credit: profit })
    } else if (profit < 0) {
      entries.push({ subjectId: '', subjectCode: '4103', subjectName: '本年利润', debit: Math.abs(profit), credit: 0 })
    }
    if (entries.length > 0) {
      const result = store.addVoucher({ date: period.value + '-31', period: period.value, entries })
      if (result.success) {
        ElMessage.success(`结转凭证已生成：${result.voucher.voucherNo}`)
        loadData()
      } else {
        ElMessage.error('结转失败：' + (result.errors || []).join('；'))
      }
    }
  }).catch(() => {})
}

onMounted(loadData)
</script>
<style scoped>
.page-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; }
.page-title { font-size:20px; color:#303133; }
.page-actions { display:flex; gap:8px; align-items:center; }
</style>
