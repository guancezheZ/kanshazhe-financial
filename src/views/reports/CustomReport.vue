<template>
  <div class="page">
    <div class="page-header">
      <h2 class="page-title">自定义报表</h2>
      <div class="page-actions">
        <el-button type="primary" @click="generateReport">生成报表</el-button>
        <el-button @click="exportExcel">导出Excel</el-button>
      </div>
    </div>

    <el-card shadow="never" class="config-card">
      <el-form :model="config" inline size="small">
        <el-form-item label="期间范围">
          <el-date-picker v-model="config.periodFrom" type="month" value-format="YYYYMM" placeholder="开始" style="width:130px" />
          <span style="margin:0 8px">至</span>
          <el-date-picker v-model="config.periodTo" type="month" value-format="YYYYMM" placeholder="结束" style="width:130px" />
        </el-form-item>
        <el-form-item label="科目类型">
          <el-select v-model="config.subjectType" clearable placeholder="全部" style="width:140px">
            <el-option v-for="(l, k) in subjectTypes" :key="k" :label="l" :value="k" />
          </el-select>
        </el-form-item>
        <el-form-item label="显示方式">
          <el-radio-group v-model="config.showMode">
            <el-radio value="sideBySide">并排列</el-radio>
            <el-radio value="vertical">上下排</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label=" ">
          <el-checkbox v-model="config.showZero">显示余额为零的科目</el-checkbox>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 报表展示 -->
    <el-card shadow="never">
      <template #header>
        <div style="text-align:center">
          <div style="font-size:16px;font-weight:700">自定义报表</div>
          <div style="font-size:12px;color:#909399">
            {{ config.periodFrom }} ~ {{ config.periodTo }}
            <span v-if="config.subjectType"> | {{ subjectTypes[config.subjectType] }}</span>
          </div>
        </div>
      </template>

      <el-empty v-if="tableData.length === 0" description="点击生成报表查看数据" />

      <div v-else v-for="(group, gi) in tableData" :key="gi" style="margin-bottom:20px">
        <div style="font-weight:600;margin-bottom:8px;color:#409eff">{{ group.label }}</div>
        <el-table :data="group.rows" border stripe size="small">
          <el-table-column label="科目" min-width="180">
            <template #default="{ row }">{{ row.code }} {{ row.name }}</template>
          </el-table-column>
          <el-table-column v-for="(col, ci) in group.columns" :key="ci" :label="col.label" width="130" align="right">
            <template #default="{ row }">{{ row[col.key] !== undefined ? fmt(row[col.key]) : '' }}</template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useStore } from '@/stores/store.js'
import { formatAmount, getCurrentPeriod, SUBJECT_TYPE_CN, SUBJECT_TYPE, BALANCE_DIRECTION, DEBIT, CREDIT } from '@/utils/accounting.js'

const store = useStore()
const subjectTypes = SUBJECT_TYPE_CN

const config = reactive({
  periodFrom: getCurrentPeriod(),
  periodTo: getCurrentPeriod(),
  subjectType: '',
  showMode: 'sideBySide',
  showZero: false,
})

const tableData = ref([])

function fmt(val) { return formatAmount(val) }

function generateReport() {
  const periods = []
  let p = config.periodFrom
  while (p <= config.periodTo) {
    periods.push(p)
    const y = parseInt(p.slice(0, 4))
    const m = parseInt(p.slice(4, 6))
    const next = m === 12 ? `${y + 1}01` : `${y}${String(m + 1).padStart(2, '0')}`
    p = next
  }

  // 按类型分组
  const types = config.subjectType ? [config.subjectType] : Object.values(SUBJECT_TYPE)
  const groups = []
  for (const type of types) {
    const subjects = store.state.subjects.filter(s => s.isLeaf && s.type === type && s.opened)
    if (!config.showZero && periods.length > 0) {
      // 过滤掉所有期间余额都为零的
    }

    const rows = subjects.map(s => {
      const row = { code: s.code, name: s.name }
      for (const period of periods) {
        const bal = store.state.periodBalances.find(pb => pb.subjectId === s.id && pb.period === period)
        if (bal) {
          const direction = BALANCE_DIRECTION[s.type]
          const net = direction === DEBIT
            ? Number(bal.closingDebit) - Number(bal.closingCredit)
            : Number(bal.closingCredit) - Number(bal.closingDebit)
          row[`_p_${period}`] = net
        } else {
          row[`_p_${period}`] = 0
        }
      }
      return row
    })

    // 过滤零余额
    let filtered = config.showZero ? rows : rows.filter(r => {
      for (const period of periods) {
        if (r[`_p_${period}`]) return true
      }
      return false
    })

    const columns = periods.map(p => ({ label: `${p.slice(0,4)}年${p.slice(4,6)}月`, key: `_p_${p}` }))

    groups.push({
      label: subjectTypes[type] || type,
      rows: filtered,
      columns,
    })
  }

  tableData.value = groups
  if (groups.every(g => g.rows.length === 0)) {
    ElMessage.info('所选条件下无数据')
  }
}

function exportExcel() {
  if (tableData.value.length === 0) return ElMessage.warning('请先生成报表')
  // 生成简易 CSV
  let csv = '﻿' // BOM
  for (const group of tableData.value) {
    csv += `\n${group.label}\n`
    csv += '科目,' + group.columns.map(c => c.label).join(',') + '\n'
    for (const row of group.rows) {
      csv += `${row.code} ${row.name},` + group.columns.map(c => row[c.key] || '').join(',') + '\n'
    }
  }
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = `自定义报表_${config.periodFrom}_${config.periodTo}.csv`
  a.click()
  URL.revokeObjectURL(a.href)
  ElMessage.success('已导出CSV文件')
}
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
.config-card { margin-bottom: 16px; }
</style>
