<template>
  <div class="case-report">
    <div v-if="!caseConfig" class="not-found">
      <span>案例不存在</span>
      <el-button size="small" @click="$router.push('/cases')">返回案例库</el-button>
    </div>

    <template v-else>
      <div class="back-bar">
        <el-button text @click="$router.push('/cases/' + caseConfig.id)">
          <el-icon><ArrowLeft /></el-icon> 返回案例详情
        </el-button>
      </div>

      <div class="report-header">
        <div>
          <h2 class="rh-title">📊 {{ data.companyInfo.name }} — 财务报表</h2>
          <p class="rh-desc">基于你完成的全部业务事件生成的财务报表</p>
        </div>
        <el-tag type="success" size="large">案例完成</el-tag>
      </div>

      <!-- 三大报表 -->
      <el-tabs v-model="activeTab" class="report-tabs">
        <el-tab-pane label="资产负债表" name="balance">
          <el-card shadow="never">
            <h3 class="statement-title">资产负债表</h3>
            <p class="statement-sub">编制单位：{{ data.companyInfo.name }}  |  2026年1月</p>
            <el-table :data="balanceData" border stripe size="small" max-height="600">
              <el-table-column prop="name" label="资产" min-width="160" />
              <el-table-column prop="debit" label="期末余额" width="140" align="right">
                <template #default="{ row }">
                  <span v-if="row.debit !== undefined">{{ fmt(row.debit) }}</span>
                  <span v-else-if="row.totalDebit" style="font-weight:700">{{ fmt(row.totalDebit) }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="empty" label=" " width="20" />
              <el-table-column prop="liabilityName" label="负债及所有者权益" min-width="160" />
              <el-table-column prop="credit" label="期末余额" width="140" align="right">
                <template #default="{ row }">
                  <span v-if="row.credit !== undefined">{{ fmt(row.credit) }}</span>
                  <span v-else-if="row.totalCredit" style="font-weight:700">{{ fmt(row.totalCredit) }}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-tab-pane>

        <el-tab-pane label="利润表" name="income">
          <el-card shadow="never">
            <h3 class="statement-title">利润表</h3>
            <p class="statement-sub">编制单位：{{ data.companyInfo.name }}  |  2026年1月</p>
            <el-table :data="incomeData" border stripe size="small">
              <el-table-column prop="name" label="项目" min-width="220" />
              <el-table-column prop="amount" label="本月金额" width="160" align="right">
                <template #default="{ row }">
                  <span v-if="row.isTotal" style="font-weight:700">{{ row.amount >= 0 ? fmt(row.amount) : '(' + fmt(-row.amount) + ')' }}</span>
                  <span v-else>{{ fmt(row.amount) }}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-tab-pane>

        <el-tab-pane label="教学评价" name="review">
          <el-card shadow="never">
            <h3 class="statement-title">案例完成评价</h3>
            <div class="review-content">
              <div class="review-stat">
                <span>业务事件</span>
                <strong>{{ totalEvents }} 笔</strong>
              </div>
              <div class="review-stat">
                <span>已完成</span>
                <strong style="color:#67c23a">{{ completedCount }} 笔</strong>
              </div>
              <div class="review-stat">
                <span>企业类型</span>
                <strong>{{ data.companyInfo.taxType }}</strong>
              </div>
              <div class="review-stat">
                <span>会计制度</span>
                <strong>{{ data.companyInfo.accountingSystem }}</strong>
              </div>
            </div>
            <el-divider />
            <p class="review-tip">
              💡 你已经完成了一个完整的月度账务处理流程！从建账到出报表，体验了企业财务的完整闭环。
              建议尝试不同规模和行业的企业案例，拓展你的实战经验。
            </p>
            <div class="review-actions">
              <el-button @click="$router.push('/cases')">← 返回案例库</el-button>
              <el-button type="primary" @click="restartCase">重新做一遍</el-button>
            </div>
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import { ArrowLeft } from '@element-plus/icons-vue'
import { useStore } from '@/stores/store.js'
import { CASES } from '@/data/cases/index.js'

const route = useRoute()
const router = useRouter()
const store = useStore()

const activeTab = ref('balance')
const caseConfig = ref(null)
const data = ref({ events: [], companyInfo: {} })
const totalEvents = ref(0)
const completedCount = ref(0)
const balanceData = ref([])
const incomeData = ref([])

onMounted(() => {
  const caseId = route.params.caseId
  const found = CASES.find(c => c.id === caseId)
  if (!found) return
  caseConfig.value = found
  data.value = found.data
  totalEvents.value = found.data.events.length
  completedCount.value = found.data.events.filter(
    e => localStorage.getItem('case_done_' + caseId + '_' + e.id) === 'true'
  ).length

  // 加载财务报表
  loadReports()
})

function loadReports() {
  try {
    const balance = store.getBalanceSheet()
    // 适配返回格式
    let assets = [], liabilities = []
    if (Array.isArray(balance)) {
      const mid = Math.ceil(balance.length / 2)
      assets = balance.slice(0, mid)
      liabilities = balance.slice(mid)
    } else if (balance?.items) {
      assets = balance.items.filter(i => i.side === 'asset')
      liabilities = balance.items.filter(i => i.side === 'liability')
    }
    // 对齐资产负债表左右
    const maxLen = Math.max(assets.length, liabilities.length)
    balanceData.value = Array.from({ length: maxLen }, (_, i) => ({
      name: assets[i]?.name || '',
      debit: assets[i]?.balance ?? assets[i]?.closingDebit,
      liabilityName: liabilities[i]?.name || '',
      credit: liabilities[i]?.balance ?? liabilities[i]?.closingCredit,
    }))

    const income = store.getIncomeStatement()
    if (Array.isArray(income)) {
      incomeData.value = income
    } else if (income?.items) {
      incomeData.value = income.items
    } else {
      incomeData.value = []
    }
  } catch (e) {
    console.warn('加载案例报表失败:', e)
  }
}

function fmt(n) {
  if (n === 0 || n === null || n === undefined) return '—'
  return '¥' + Number(n).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function restartCase() {
  ElMessageBox.confirm(
    '重新做一遍会清除当前所有进度，确定吗？',
    '重新开始',
    { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }
  ).then(() => {
    // 清除案例进度
    const caseId = caseConfig.value.id
    data.value.events.forEach(e => {
      localStorage.removeItem('case_done_' + caseId + '_' + e.id)
    })
    localStorage.removeItem('jd_case_data_' + caseId)
    ElMessage.success('已重置案例进度')
    router.push('/cases/' + caseId)
  }).catch(() => {})
}
</script>

<style scoped>
.case-report {
  max-width: 900px;
  margin: 0 auto;
  padding-bottom: 40px;
}
.back-bar { margin-bottom: 16px; }
.not-found {
  text-align: center;
  padding: 60px;
  color: var(--text-light, #909399);
}
.report-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 12px;
  flex-wrap: wrap;
}
.rh-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--text, #303133);
  margin: 0 0 4px;
}
.rh-desc { font-size: 13px; color: var(--text-light, #909399); margin: 0; }
.report-tabs :deep(.el-tabs__item) { font-size: 14px; }
.statement-title {
  font-size: 16px;
  text-align: center;
  margin: 0 0 4px;
  color: var(--text, #303133);
}
.statement-sub {
  text-align: center;
  font-size: 12px;
  color: var(--text-light, #909399);
  margin: 0 0 16px;
}
.review-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.review-stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 12px 16px;
  background: var(--bg, #f0f2f5);
  border-radius: 8px;
}
.review-stat span { font-size: 12px; color: var(--text-light, #909399); }
.review-stat strong { font-size: 16px; color: var(--text, #303133); }
.review-tip {
  font-size: 14px;
  color: var(--text-secondary, #606266);
  line-height: 1.7;
}
.review-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 16px;
}
</style>
