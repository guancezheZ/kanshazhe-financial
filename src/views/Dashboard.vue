<template>
  <div class="dashboard">
    <div class="page-header">
      <div>
        <h2 class="page-title">工作台</h2>
        <span class="page-desc">欢迎使用观测者企业财务模拟系统</span>
      </div>
      <div class="header-meta">
        <el-tag size="small" type="info" effect="plain">{{ currentPeriodDisplay }}</el-tag>
      </div>
    </div>

    <!-- 快捷操作 -->
    <el-card class="section-card" shadow="never">
      <template #header>
        <span class="section-title"><el-icon><Promotion /></el-icon> 快捷操作</span>
      </template>
      <div class="quick-actions">
        <el-button type="primary" size="large" @click="handleNewVoucher">
          <el-icon><EditPen /></el-icon>新增凭证
        </el-button>
        <el-button size="large" @click="$router.push('/accounting/subjects')">
          <el-icon><List /></el-icon>科目表
        </el-button>
        <el-button size="large" @click="$router.push('/accounting/voucher/query')">
          <el-icon><Search /></el-icon>凭证查询
        </el-button>
        <el-button size="large" @click="$router.push('/accounting/subject-balance')">
          <el-icon><DataBoard /></el-icon>科目余额表
        </el-button>
        <el-button size="large" @click="$router.push('/reports/balance-sheet')">
          <el-icon><Document /></el-icon>资产负债表
        </el-button>
      </div>
    </el-card>

    <!-- KPI 卡片行 -->
    <el-row :gutter="16" class="kpi-row">
      <el-col :xs="12" :sm="8" :md="4">
        <el-card shadow="never" class="kpi-card" @click="$router.push('/accounting/voucher/query')">
          <div class="kpi-icon" style="background:#e6f7ff;color:#1890ff"><el-icon><Notebook /></el-icon></div>
          <div class="kpi-body">
            <div class="kpi-value">{{ stats.voucherCount }}</div>
            <div class="kpi-label">本月凭证</div>
            <div class="kpi-sub">已过账 {{ stats.postedCount }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="8" :md="4">
        <el-card shadow="never" class="kpi-card">
          <div class="kpi-icon" style="background:#f0f5ff;color:#2f54eb"><el-icon><TrendCharts /></el-icon></div>
          <div class="kpi-body">
            <div class="kpi-value">¥{{ fmt(stats.debitTotal) }}</div>
            <div class="kpi-label">借方合计</div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="8" :md="4">
        <el-card shadow="never" class="kpi-card">
          <div class="kpi-icon" style="background:#fff7e6;color:#fa8c16"><el-icon><TrendCharts /></el-icon></div>
          <div class="kpi-body">
            <div class="kpi-value">¥{{ fmt(stats.creditTotal) }}</div>
            <div class="kpi-label">贷方合计</div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="8" :md="4">
        <el-card shadow="never" class="kpi-card">
          <div class="kpi-icon" style="background:#f6ffed;color:#52c41a"><el-icon><Coin /></el-icon></div>
          <div class="kpi-body">
            <div class="kpi-value">¥{{ fmt(stats.cashBalance) }}</div>
            <div class="kpi-label">货币资金</div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="8" :md="4">
        <el-card shadow="never" class="kpi-card">
          <div class="kpi-icon" style="background:#fff0f6;color:#eb2f96"><el-icon><Wallet /></el-icon></div>
          <div class="kpi-body">
            <div class="kpi-value">¥{{ fmt(stats.arBalance) }}</div>
            <div class="kpi-label">应收账款</div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="8" :md="4">
        <el-card shadow="never" class="kpi-card">
          <div class="kpi-icon" style="background:#f0f0f0;color:#595959"><el-icon><Wallet /></el-icon></div>
          <div class="kpi-body">
            <div class="kpi-value">¥{{ fmt(stats.apBalance) }}</div>
            <div class="kpi-label">应付账款</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- XP 等级进度 -->
    <el-card shadow="never" class="section-card xp-card">
      <div class="xp-card-body">
        <div class="xp-level">
          <span class="xp-icon">{{ levelInfo.icon }}</span>
          <div class="xp-level-text">
            <span class="xp-title">Lv.{{ levelInfo.level }} {{ levelInfo.title }}</span>
            <span class="xp-sub">{{ levelInfo.totalXp }} XP</span>
          </div>
        </div>
        <div class="xp-bar-wrapper">
          <div class="xp-bar-label">
            <span v-if="!levelInfo.isMaxLevel">
              下一级：{{ levelInfo.nextIcon }} {{ levelInfo.nextTitle }}
            </span>
            <span v-else>已达最高等级</span>
            <span>{{ levelInfo.xpProgress }} / {{ levelInfo.xpToNext }} XP</span>
          </div>
          <el-progress
            :percentage="levelProgress"
            :stroke-width="6"
            color="#e6a23c"
            :format="() => ''"
            class="xp-progress"
          />
        </div>
      </div>
    </el-card>

    <!-- 图表 + 待办区域 -->
    <el-row :gutter="16" class="chart-row">
      <el-col :xs="24" :md="16">
        <el-card shadow="never" class="section-card">
          <template #header>
            <span class="section-title"><el-icon><DataAnalysis /></el-icon> 月度收支趋势</span>
            <el-radio-group v-model="chartMode" size="small">
              <el-radio-button value="revenue">收入/成本</el-radio-button>
              <el-radio-button value="profit">净利润</el-radio-button>
            </el-radio-group>
          </template>
          <div ref="trendChartRef" class="chart-container"></div>
        </el-card>
      </el-col>
      <el-col :xs="24" :md="8">
        <el-card shadow="never" class="section-card todo-card">
          <template #header>
            <span class="section-title"><el-icon><Bell /></el-icon> 待办事项</span>
          </template>
          <div class="todo-list">
            <div class="todo-item" @click="$router.push('/accounting/voucher/query')">
              <div class="todo-count" style="color:#e6a23c">{{ stats.pendingSign }}</div>
              <div class="todo-info">
                <div class="todo-label">待出纳签字</div>
                <div class="todo-desc">草稿状态的凭证</div>
              </div>
            </div>
            <div class="todo-item" @click="$router.push('/accounting/voucher/query')">
              <div class="todo-count" style="color:#409eff">{{ stats.pendingApprove }}</div>
              <div class="todo-info">
                <div class="todo-label">待主管审核</div>
                <div class="todo-desc">已签字待审核</div>
              </div>
            </div>
            <div class="todo-item" @click="$router.push('/accounting/voucher/query')">
              <div class="todo-count" style="color:#67c23a">{{ stats.pendingPost }}</div>
              <div class="todo-info">
                <div class="todo-label">待过账</div>
                <div class="todo-desc">已审核待过账</div>
              </div>
            </div>
            <div class="todo-item" :class="{ 'is-balanced': stats.isBalanced }">
              <div class="todo-count" :style="{ color: stats.isBalanced ? '#67c23a' : '#f56c6c' }">
                {{ stats.isBalanced ? '✓' : '✗' }}
              </div>
              <div class="todo-info">
                <div class="todo-label">试算平衡</div>
                <div class="todo-desc">{{ stats.isBalanced ? '借贷平衡' : '借贷不平衡！' }}</div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 凭证量趋势 -->
    <el-row :gutter="16" class="chart-row">
      <el-col :xs="24" :md="12">
        <el-card shadow="never" class="section-card">
          <template #header>
            <span class="section-title"><el-icon><DataLine /></el-icon> 各月凭证量</span>
          </template>
          <div ref="voucherChartRef" class="chart-container"></div>
        </el-card>
      </el-col>
      <el-col :xs="24" :md="12">
        <el-card shadow="never" class="section-card">
          <template #header>
            <span class="section-title"><el-icon><InfoFilled /></el-icon> 当前账套</span>
            <el-button text type="primary" size="small" @click="$router.push('/system/account')">
              管理
            </el-button>
          </template>
          <div class="account-info">
            <el-descriptions :column="2" border size="small">
              <el-descriptions-item label="账套名称">{{ currentAccount?.name || '—' }}</el-descriptions-item>
              <el-descriptions-item label="年度">{{ currentAccount?.fiscalYear || '—' }}年</el-descriptions-item>
              <el-descriptions-item label="会计准则">{{ currentAccount?.standard || '—' }}</el-descriptions-item>
              <el-descriptions-item label="本位币">{{ currencyLabel }}</el-descriptions-item>
              <el-descriptions-item label="期间">{{ currentPeriodDisplay }}</el-descriptions-item>
              <el-descriptions-item label="状态">
                <el-tag type="success" size="small">正常</el-tag>
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 最近凭证 -->
    <el-card class="section-card" shadow="never">
      <template #header>
        <span class="section-title"><el-icon><Document /></el-icon> 最近凭证</span>
        <el-button text type="primary" size="small" @click="$router.push('/accounting/voucher/query')">
          查看全部
        </el-button>
      </template>
      <el-table :data="recentVouchers" border stripe size="small" empty-text="暂无凭证">
        <el-table-column label="凭证号" prop="voucherNo" width="180" />
        <el-table-column label="日期" prop="date" width="110" />
        <el-table-column label="摘要" min-width="200">
          <template #default="{ row }">
            <span class="summary-text">{{ getSummary(row) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="statusTagType(row.status)" size="small" effect="plain">
              {{ statusLabel(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import {
  EditPen, List, Search, DataBoard, Document,
  Promotion, Notebook, TrendCharts, Coin, Wallet,
  DataAnalysis, DataLine, Bell, InfoFilled,
} from '@element-plus/icons-vue'
import { useStore } from '@/stores/store.js'
import { getCurrentPeriod, formatAmount, VOUCHER_STATUS_CN, VOUCHER_STATUS } from '@/utils/accounting.js'
import { calcLevel } from '@/data/xp-system.js'
import * as echarts from 'echarts'

const store = useStore()

const isTeaching = computed(() => !!localStorage.getItem('tutorial_task'))

function handleNewVoucher() {
  if (isTeaching.value) {
    ElMessage.info('💡 教学期间由系统自动管理凭证，手动新增会干扰教学数据。如需练习请在浮动窗切换至「自由练习」模式。')
    return
  }
  router.push('/accounting/voucher/entry')
}

const currentAccount = computed(() => store.getCurrentAccount())
const currentPeriod = getCurrentPeriod()
const currentPeriodDisplay = computed(() => {
  const p = currentPeriod
  return p ? `${p.slice(0,4)}年${p.slice(4,6)}月` : ''
})
const currencyLabel = computed(() => currentAccount.value?.currency === 'CNY' ? '人民币（CNY）' : currentAccount.value?.currency || '')

const stats = ref({
  voucherCount: 0, postedCount: 0,
  debitTotal: 0, creditTotal: 0,
  isBalanced: true,
  cashBalance: 0, arBalance: 0, apBalance: 0,
  pendingSign: 0, pendingApprove: 0, pendingPost: 0,
})
const recentVouchers = ref([])
const monthlyStats = ref([])
const chartMode = ref('revenue')

// 等级信息
const levelInfo = computed(() => {
  try { return store.getLevelInfo() }
  catch { return { level: 1, title: '见习生', icon: '📄', xpProgress: 0, xpToNext: 30, totalXp: 0, isMaxLevel: false, nextTitle: '账房学徒', nextIcon: '📊' } }
})
const levelProgress = computed(() => {
  const info = levelInfo.value
  if (info.isMaxLevel) return 100
  return Math.min(100, Math.round((info.xpProgress / info.xpToNext) * 100))
})
const levelBarColor = computed(() => {
  const lv = levelInfo.value.level
  if (lv >= 11) return '#e6a23c'
  if (lv >= 8) return '#409eff'
  if (lv >= 5) return '#67c23a'
  return '#909399'
})

// ECharts refs
const trendChartRef = ref(null)
const voucherChartRef = ref(null)
let trendChart = null
let voucherChart = null

function fmt(val) { return formatAmount(val) }
function statusLabel(s) { return VOUCHER_STATUS_CN[s] || s }
function statusTagType(s) {
  if (s === VOUCHER_STATUS.POSTED) return 'primary'
  if (s === VOUCHER_STATUS.APPROVED) return 'success'
  if (s === VOUCHER_STATUS.SIGNED) return 'warning'
  return 'info'
}

function getSummary(v) {
  const summaries = v.entries.map(e => e.summary).filter(Boolean)
  return [...new Set(summaries)].join('；') || '—'
}

function loadData() {
  stats.value = store.getDashboardStats(currentPeriod)
  monthlyStats.value = store.getMonthlyStats(12)

  const all = store.state.vouchers
  recentVouchers.value = [...all]
    .sort((a, b) => b.date.localeCompare(a.date) || b.voucherNo.localeCompare(a.voucherNo))
    .slice(0, 10)
}

// ========== ECharts 图表 ==========

function renderTrendChart() {
  if (!trendChartRef.value || !monthlyStats.value.length) return
  if (!trendChart) {
    trendChart = echarts.init(trendChartRef.value)
  }
  const data = monthlyStats.value
  const isRevenue = chartMode.value === 'revenue'
  const option = {
    tooltip: {
      trigger: 'axis',
      valueFormatter: v => '¥' + formatAmount(v || 0),
    },
    legend: { data: isRevenue ? ['营业收入', '营业成本'] : ['净利润'], bottom: 0 },
    grid: { left: 60, right: 20, top: 10, bottom: 36 },
    xAxis: {
      type: 'category',
      data: data.map(d => d.label),
      axisLabel: { fontSize: 11 },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        fontSize: 10,
        formatter: v => v >= 10000 ? (v / 10000).toFixed(0) + '万' : v.toFixed(0),
      },
    },
    series: isRevenue
      ? [
          {
            name: '营业收入',
            type: 'bar',
            data: data.map(d => d.revenue),
            itemStyle: { color: '#409eff', borderRadius: [4,4,0,0] },
          },
          {
            name: '营业成本',
            type: 'bar',
            data: data.map(d => d.cost),
            itemStyle: { color: '#f56c6c', borderRadius: [4,4,0,0] },
          },
        ]
      : [
          {
            name: '净利润',
            type: 'line',
            data: data.map(d => d.netProfit),
            smooth: true,
            lineStyle: { color: '#67c23a', width: 3 },
            itemStyle: { color: '#67c23a' },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(103,194,58,0.25)' },
                { offset: 1, color: 'rgba(103,194,58,0.02)' },
              ]),
            },
          },
        ],
  }
  trendChart.setOption(option, true)
}

function renderVoucherChart() {
  if (!voucherChartRef.value || !monthlyStats.value.length) return
  if (!voucherChart) {
    voucherChart = echarts.init(voucherChartRef.value)
  }
  const data = monthlyStats.value
  const maxV = Math.max(...data.map(d => d.voucherCount), 1)
  const option = {
    tooltip: {
      trigger: 'axis',
      valueFormatter: v => v + ' 张',
    },
    grid: { left: 50, right: 20, top: 10, bottom: 36 },
    xAxis: {
      type: 'category',
      data: data.map(d => d.label),
      axisLabel: { fontSize: 11 },
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: Math.ceil(maxV * 1.2),
      axisLabel: { fontSize: 10 },
    },
    series: [
      {
        type: 'line',
        data: data.map(d => d.voucherCount),
        smooth: true,
        lineStyle: { color: '#722ed1', width: 2 },
        itemStyle: { color: '#722ed1' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(114,46,209,0.2)' },
            { offset: 1, color: 'rgba(114,46,209,0.02)' },
          ]),
        },
        markLine: {
          data: [{ type: 'average', name: '平均' }],
          label: { formatter: '平均: {c}张', fontSize: 10 },
          lineStyle: { color: '#ff4d4f', type: 'dashed' },
        },
      },
    ],
  }
  voucherChart.setOption(option, true)
}

function resizeCharts() {
  trendChart?.resize()
  voucherChart?.resize()
}

// 监听图表模式切换
watch(chartMode, () => nextTick(renderTrendChart))

// ResizeObserver
let resizeObserver = null

onMounted(() => {
  loadData()
  nextTick(() => {
    renderTrendChart()
    renderVoucherChart()
  })
  resizeObserver = new ResizeObserver(resizeCharts)
  resizeObserver.observe(trendChartRef.value)
  resizeObserver.observe(voucherChartRef.value)
})

onBeforeUnmount(() => {
  trendChart?.dispose()
  voucherChart?.dispose()
  resizeObserver?.disconnect()
})
</script>

<style scoped>
.dashboard { max-width: 1400px; }
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}
.page-title { font-size: 22px; color: #303133; font-weight: 600; margin: 0; }
.page-desc { font-size: 13px; color: #909399; margin-top: 4px; display: block; }
.header-meta { padding-top: 4px; }

.section-card { margin-bottom: 16px; }
.section-title {
  font-size: 14px;
  font-weight: 600;
  color: #303133;
  display: flex;
  align-items: center;
  gap: 6px;
}
.section-card :deep(.el-card__header) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  min-height: 44px;
}
.section-card :deep(.el-card__body) { padding: 14px 16px; }

.quick-actions { display: flex; gap: 10px; flex-wrap: wrap; }

/* KPI 卡片 */
.kpi-row { margin-bottom: 16px; }
.kpi-card {
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  user-select: none;
}
.kpi-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
}
.kpi-card :deep(.el-card__body) {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
}
.kpi-icon {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
}
.kpi-body { min-width: 0; flex: 1; }
.kpi-value {
  font-size: 18px;
  font-weight: 700;
  color: #303133;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.kpi-label { font-size: 12px; color: #909399; margin-top: 2px; }
.kpi-sub { font-size: 11px; color: #c0c4cc; margin-top: 1px; }

/* 图表 */
.chart-row { margin-bottom: 16px; }
.chart-container { width: 100%; height: 280px; }

/* 待办 */
.todo-card .todo-list { display: flex; flex-direction: column; gap: 8px; }
.todo-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}
.todo-item:hover { background: #f5f7fa; }
.todo-item.is-balanced { cursor: default; }
.todo-count {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #f5f7fa;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  flex-shrink: 0;
}
.todo-info { min-width: 0; }
.todo-label { font-size: 14px; font-weight: 600; color: #303133; }
.todo-desc { font-size: 12px; color: #909399; margin-top: 2px; }

/* 账套 */
.account-info { padding: 2px 0; }

/* XP等级卡片 */
.xp-card { border-color: #e8e8e8 !important; }
.xp-card :deep(.el-card__body) { padding: 14px 20px; }
.xp-card-body {
  display: flex;
  align-items: center;
  gap: 16px;
}
.xp-level {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}
.xp-icon { font-size: 32px; line-height: 1; }
.xp-level-text { display: flex; flex-direction: column; }
.xp-title { font-size: 16px; font-weight: 700; color: #303133; line-height: 1.3; }
.xp-sub { font-size: 12px; color: #909399; }
.xp-bar-wrapper { flex: 1; min-width: 0; max-width: 360px; }
.xp-bar-label {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #909399;
  margin-bottom: 4px;
}
.xp-progress { width: 100%; }
.xp-progress :deep(.el-progress-bar__outer) { background: #e8e8e8; border-radius: 5px; height: 10px !important; }
.xp-progress :deep(.el-progress-bar__inner) { border-radius: 5px; }

/* 凭证摘要 */
.summary-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  max-width: 300px;
}
</style>
