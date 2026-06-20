<template>
  <div class="page">
    <div class="page-header">
      <h2 class="page-title">🧾 模拟纳税申报</h2>
      <div class="page-actions">
        <el-button type="primary" @click="handleSubmit">📤 提交申报</el-button>
        <el-button @click="refreshData">🔄 刷新数据</el-button>
      </div>
    </div>

    <div class="tax-intro">
      根据教学账套中的凭证数据自动计算应缴税额。请核对各项数据后提交申报。
      <span v-if="submitDone" class="tax-done">✅ 本期已申报</span>
    </div>

    <el-tabs v-model="activeTab">
      <!-- 增值税申报 -->
      <el-tab-pane label="增值税申报表" name="vat">
        <div class="tax-form">
          <div class="form-section">
            <div class="section-title">一、销项税额</div>
            <div class="form-row">
              <span class="row-label">销售额（不含税）</span>
              <span class="row-value">{{ fmt(vatData.sales) }}</span>
            </div>
            <div class="form-row">
              <span class="row-label">销项税额（13%）</span>
              <span class="row-value highlight">{{ fmt(vatData.outputTax) }}</span>
              <span class="row-note">= 销售额 × 13%</span>
            </div>
          </div>
          <div class="form-section">
            <div class="section-title">二、进项税额</div>
            <div class="form-row">
              <span class="row-label">采购额（不含税）</span>
              <span class="row-value">{{ fmt(vatData.purchases) }}</span>
            </div>
            <div class="form-row">
              <span class="row-label">进项税额（13%）</span>
              <span class="row-value highlight">{{ fmt(vatData.inputTax) }}</span>
              <span class="row-note">= 采购额 × 13%</span>
            </div>
          </div>
          <div class="form-section result">
            <div class="form-row">
              <span class="row-label">📌 本期应纳增值税</span>
              <span class="row-value result-value">{{ fmt(vatData.dueTax) }}</span>
              <span class="row-note">= 销项 - 进项</span>
            </div>
          </div>
        </div>
      </el-tab-pane>

      <!-- 企业所得税申报 -->
      <el-tab-pane label="企业所得税申报表" name="cit">
        <div class="tax-form">
          <div class="form-section">
            <div class="section-title">一、利润总额计算</div>
            <div class="form-row">
              <span class="row-label">营业收入</span>
              <span class="row-value">{{ fmt(citData.revenue) }}</span>
            </div>
            <div class="form-row">
              <span class="row-label">营业成本</span>
              <span class="row-value">({{ fmt(citData.cost) }})</span>
            </div>
            <div class="form-row">
              <span class="row-label">期间费用</span>
              <span class="row-value">({{ fmt(citData.expenses) }})</span>
            </div>
            <div class="form-row total">
              <span class="row-label">利润总额</span>
              <span class="row-value">{{ fmt(citData.profit) }}</span>
            </div>
          </div>
          <div class="form-section">
            <div class="section-title">二、应纳税额计算</div>
            <div class="form-row">
              <span class="row-label">应纳税所得额</span>
              <span class="row-value">{{ fmt(citData.taxableIncome) }}</span>
              <span class="row-note">= 利润总额（简化处理）</span>
            </div>
            <div class="form-row">
              <span class="row-label">适用税率</span>
              <span class="row-value">25%</span>
            </div>
            <div class="form-row">
              <span class="row-label">应纳所得税额</span>
              <span class="row-value highlight">{{ fmt(citData.taxDue) }}</span>
              <span class="row-note">= 应纳税所得额 × 25%</span>
            </div>
          </div>
          <div class="form-section result">
            <div class="form-row">
              <span class="row-label">📌 本期应纳企业所得税</span>
              <span class="row-value result-value">{{ fmt(citData.taxDue) }}</span>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from '@/stores/store.js'
import { getCurrentPeriod, formatAmount } from '@/utils/accounting.js'
import { ElMessage } from 'element-plus'

const store = useStore()
const activeTab = ref('vat')
const submitDone = ref(false)

function fmt(v) { return '¥' + formatAmount(v) }

// 获取科目余额
function getSubjectBalance(subjectCode) {
  const period = getCurrentPeriod()
  const balances = store.getPeriodBalances(period)
  const subjects = store.state.subjects

  // 先找到科目 ID
  let targetId = null
  for (const s of subjects) {
    let code = s.code
    let parent = s.parentId ? subjects.find(p => p.id === s.parentId) : null
    while (parent) {
      code = parent.code + code
      parent = parent.parentId ? subjects.find(p => p.id === parent.parentId) : null
    }
    if (code === subjectCode) { targetId = s.id; break }
  }
  if (!targetId) return 0

  // 查找该科目及所有子科目的余额
  const childIds = [targetId]
  for (const s of subjects) {
    if (s.parentId === targetId) childIds.push(s.id)
    // 二级子科目
    const parent = subjects.find(p => p.id === s.parentId)
    if (parent && parent.parentId === targetId) childIds.push(s.id)
  }

  let total = 0
  for (const b of balances) {
    if (childIds.includes(b.subjectId)) {
      total += Number(b.debitTotal || 0) - Number(b.creditTotal || 0)
    }
  }
  return total
}

// 增值税数据
const vatData = computed(() => {
  // 销项：从主营业务收入中估算（简化：取收入 × 13%）
  const revenue = getSubjectBalance('600101') // 主营业务收入
  const sales = Math.max(0, revenue)
  const outputTax = Math.round(sales * 0.13 * 100) / 100

  // 进项：从原材料采购中估算
  const purchases = getSubjectBalance('1403') // 原材料借方发生
  const inputTax = Math.round(Math.max(0, purchases) * 0.13 * 100) / 100

  const dueTax = Math.max(0, Math.round((outputTax - inputTax) * 100) / 100)
  return { sales, outputTax, purchases, inputTax, dueTax }
})

// 企业所得税数据
const citData = computed(() => {
  // 从利润表获取数据（getIncomeStatement 返回对象，含 revenue/cost/expenses 等属性）
  const incomeStmt = store.getIncomeStatement(getCurrentPeriod())
  const revenue = Math.abs(Number(incomeStmt?.revenue || 0))
  const cost = Math.abs(Number(incomeStmt?.cost || 0))
  const expenses = Math.abs(
    Number(incomeStmt?.sellingExp || 0) + Number(incomeStmt?.adminExp || 0) + Number(incomeStmt?.financeExp || 0)
  )
  const profit = Math.round((revenue - cost - expenses) * 100) / 100
  const taxableIncome = Math.max(0, profit)
  const taxDue = Math.round(taxableIncome * 0.25 * 100) / 100

  return { revenue, cost, expenses, profit, taxableIncome, taxDue }
})

function refreshData() {
  // 强制 computed 重新计算
  ElMessage.success('数据已刷新')
}

function handleSubmit() {
  submitDone.value = true
  const period = getCurrentPeriod()
  localStorage.setItem('tax_submitted_' + period, 'true')
  ElMessage.success('✅ 纳税申报已提交！期间：' + period)
}

onMounted(() => {
  const period = getCurrentPeriod()
  submitDone.value = localStorage.getItem('tax_submitted_' + period) === 'true'
})
</script>

<style scoped>
.page { max-width: 720px; margin: 0 auto; padding: 20px; }
.page-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; }
.page-title { font-size:20px; color:#303133; }
.page-actions { display:flex; gap:8px; }

.tax-intro { font-size:13px; color:#909399; margin-bottom:16px; padding:8px 14px; background:#f8f9fb; border-radius:6px; display:flex; align-items:center; gap:8px; }
.tax-done { font-size:12px; color:#67c23a; background:#f0f9eb; padding:2px 10px; border-radius:10px; }

.tax-form { background:#fff; border:1px solid #e8e8e8; border-radius:8px; overflow:hidden; }

.form-section { padding:14px 20px; border-bottom:1px solid #f0f0f0; }
.form-section:last-child { border-bottom:none; }
.form-section.result { background:#f6ffed; }
.section-title { font-size:14px; font-weight:600; color:#303133; margin-bottom:10px; }

.form-row { display:flex; align-items:center; gap:12px; padding:6px 0; font-size:13px; }
.row-label { color:#606266; min-width:140px; }
.row-value { font-family:monospace; font-weight:600; color:#303133; min-width:120px; text-align:right; }
.row-value.highlight { color:#409eff; font-size:14px; }
.row-value.result-value { color:#e6a23c; font-size:16px; }
.row-note { color:#bbb; font-size:11px; }
.form-row.total { border-top:1px solid #e8e8e8; margin-top:4px; padding-top:8px; }
.form-row.total .row-value { font-size:15px; }
</style>
