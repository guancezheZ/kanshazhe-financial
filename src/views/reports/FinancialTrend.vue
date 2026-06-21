<template>
  <div class="page">
    <div class="page-header">
      <h2 class="page-title">📈 财务分析趋势</h2>
      <div class="page-actions">
        <el-tag type="info" effect="plain" v-if="industryLabel">{{ industryLabel }} · {{ availableMonths.length }}期</el-tag>
        <el-button size="small" @click="refreshData">
          <el-icon><Refresh /></el-icon>刷新
        </el-button>
      </div>
    </div>

    <!-- 指标切换 -->
    <el-card shadow="never" class="indicator-selector">
      <div class="selector-row">
        <span class="selector-label">选择指标：</span>
        <el-radio-group v-model="selectedIndicator" size="small">
          <el-radio-button
            v-for="ind in indicatorNames"
            :key="ind.key"
            :value="ind.key"
          >
            {{ ind.label }}
          </el-radio-button>
        </el-radio-group>
      </div>
    </el-card>

    <!-- 趋势图 -->
    <el-card shadow="never" class="chart-card">
      <div ref="chartRef" class="trend-chart"></div>
    </el-card>

    <!-- 指标统计卡片 -->
    <el-card shadow="never" class="stats-card">
      <template #header>
        <div class="stats-header">
          <span>{{ currentIndicator?.label }} 各月数据</span>
          <el-tag size="small" :type="currentTrendTag">{{ currentTrendText }}</el-tag>
        </div>
      </template>
      <div class="stats-grid">
        <div
          v-for="(m, idx) in monthlyData"
          :key="m.period"
          class="stat-item"
          :class="{ clickable: true }"
          @click="goToMonth(m.period)"
        >
          <div class="stat-month">{{ m.label }}</div>
          <div class="stat-value" :class="valueClass(m.values[selectedIndicator])">
            {{ formatIndicatorValue(m.values[selectedIndicator], currentIndicator?.unit) }}
          </div>
          <div class="stat-judgment" :class="judgmentClass(m.values[selectedIndicator])">
            {{ judgmentText(m.values[selectedIndicator]) }}
          </div>
        </div>
      </div>
    </el-card>

    <!-- 全指标总览表 -->
    <el-card shadow="never">
      <template #header>
        <span>📋 全指标一览表（各月数据）</span>
      </template>
      <el-table :data="allIndicatorsTable" border stripe size="small" style="width:100%">
        <el-table-column label="月份" prop="label" width="80" fixed />
        <el-table-column
          v-for="ind in indicatorNames"
          :key="ind.key"
          :label="ind.label"
          :prop="ind.key"
          width="110"
          align="right"
        >
          <template #default="{ row }">
            <span :class="valueClass(row[ind.key])">{{ formatIndicatorValue(row[ind.key], ind.unit) }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Refresh } from '@element-plus/icons-vue'
import { useStore } from '@/stores/store.js'
import { getCurrentPeriod, calcFinancialRatios, round, formatAmount } from '@/utils/accounting.js'
import * as echarts from 'echarts'

const store = useStore()
const router = useRouter()

const chartRef = ref(null)
let chartInstance = null

const selectedIndicator = ref('毛利率')
const allMonthsData = ref([])

// ============ 行业常量 ============

const SCENARIO_LABELS = {
  manufacturing: '制造业',
  commercial: '商业企业',
  service: '服务业',
  construction: '建筑业',
}

// 行业平均参考值（各行业典型水平）
const INDUSTRY_AVERAGES = {
  manufacturing: { '毛利率': 30, '净利率': 8, '营业利润率': 12, '期间费用率': 20, '资产负债率': 50, '流动比率': 1.8, '总资产周转率（次）': 0.8, '净资产收益率 (ROE)': 10 },
  commercial:     { '毛利率': 15, '净利率': 5, '营业利润率': 8,  '期间费用率': 10, '资产负债率': 60, '流动比率': 1.5, '总资产周转率（次）': 2.0, '净资产收益率 (ROE)': 8 },
  service:        { '毛利率': 40, '净利率': 15, '营业利润率': 20, '期间费用率': 25, '资产负债率': 45, '流动比率': 2.0, '总资产周转率（次）': 0.6, '净资产收益率 (ROE)': 12 },
  construction:   { '毛利率': 12, '净利率': 4, '营业利润率': 6,  '期间费用率': 8,  '资产负债率': 65, '流动比率': 1.3, '总资产周转率（次）': 1.2, '净资产收益率 (ROE)': 6 },
}

// ============ 指标定义 ============

const indicatorNames = [
  { key: '毛利率',              label: '毛利率',              unit: '%',  category: '盈利能力' },
  { key: '净利率',              label: '净利率',              unit: '%',  category: '盈利能力' },
  { key: '营业利润率',           label: '营业利润率',          unit: '%',  category: '盈利能力' },
  { key: '期间费用率',           label: '期间费用率',          unit: '%',  category: '盈利能力' },
  { key: '资产负债率',           label: '资产负债率',          unit: '%',  category: '偿债能力' },
  { key: '流动比率',            label: '流动比率',            unit: '',   category: '偿债能力' },
  { key: '总资产周转率（次）',   label: '总资产周转率',         unit: '次', category: '营运能力' },
  { key: '净资产收益率 (ROE)',   label: '净资产收益率(ROE)',    unit: '%',  category: '营运能力' },
]

const currentIndicator = computed(() => indicatorNames.find(i => i.key === selectedIndicator.value))

// ============ 场景 ============

const scenarioId = computed(() => localStorage.getItem('jd_scenario') || 'manufacturing')
const industryLabel = computed(() => SCENARIO_LABELS[scenarioId.value] || '制造业')
const industryAvg = computed(() => INDUSTRY_AVERAGES[scenarioId.value] || INDUSTRY_AVERAGES.manufacturing)

// ============ 各月财务指标 ============

const currentPeriod = getCurrentPeriod()
const currentYear = computed(() => (currentPeriod || '202601').slice(0, 4))

// 获取所有有数据的月份
const availableMonths = computed(() => {
  const periods = [...new Set((store.state.periodBalances || []).map(pb => pb.period))].sort()
  // 只取本年度的月份
  return periods.filter(p => p.startsWith(currentYear.value))
})

// 收集各月财务指标
const monthlyData = computed(() => {
  const months = availableMonths.value
  if (!months.length) return []

  return months.map(period => {
    const balances = store.getPeriodBalances(period)
    const ratios = calcFinancialRatios(store.state.subjects, balances)
    const values = {}
    for (const ind of ratios) {
      values[ind.name] = ind.value
    }
    return {
      period,
      label: `${period.slice(4, 6)}月`,
      values,
    }
  })
})

// ============ 图表数据 ============

const chartLabels = computed(() => monthlyData.value.map(m => m.label))

const chartValues = computed(() => {
  return monthlyData.value.map(m => m.values[selectedIndicator.value])
})

const industryRefLine = computed(() => {
  return industryAvg.value[selectedIndicator.value] ?? null
})

const hasData = computed(() => monthlyData.value.length > 0)

// ============ 趋势判断 ============

function getTrend(data) {
  if (!data || data.length < 2) return 'stable'
  const first = data[0]
  const last = data[data.length - 1]
  if (first == null || last == null) return 'stable'

  const pctChange = first !== 0 ? ((last - first) / Math.abs(first)) * 100 : 0

  // 费用/负债类指标上升是负面的
  const isNegativeUp = ['期间费用率', '资产负债率'].includes(selectedIndicator.value)

  if (Math.abs(pctChange) < 5) return 'stable'

  if (pctChange > 0) return isNegativeUp ? 'declining' : 'improving'
  return isNegativeUp ? 'improving' : 'declining'
}

const currentTrendText = computed(() => {
  const t = getTrend(chartValues.value)
  return { improving: '📈 趋势向好', declining: '📉 趋势需关注', stable: '➡️ 保持平稳' }[t] || ''
})

const currentTrendTag = computed(() => {
  const t = getTrend(chartValues.value)
  return { improving: 'success', declining: 'danger', stable: 'info' }[t] || 'info'
})

// ============ 格式化 ============

function formatIndicatorValue(val, unit) {
  if (val === null || val === undefined) return '—'
  const formatted = val.toFixed(2)
  return unit === '%' ? formatted + '%' : unit ? formatted + unit : formatted
}

function valueClass(val) {
  if (val === null || val === undefined) return ''
  if (selectedIndicator.value === '资产负债率') {
    return val > 70 ? 'value-bad' : val > 50 ? 'value-warn' : 'value-good'
  }
  if (selectedIndicator.value === '期间费用率') {
    return val > 30 ? 'value-bad' : val > 15 ? 'value-warn' : 'value-good'
  }
  if (selectedIndicator.value === '流动比率') {
    return val >= 2 ? 'value-good' : val >= 1.2 ? 'value-warn' : 'value-bad'
  }
  // 一般指标越高越好
  return val > 0 ? 'value-good' : 'value-warn'
}

function judgmentText(val) {
  if (val === null || val === undefined) return '—'
  if (selectedIndicator.value === '资产负债率') return val > 70 ? '偏高' : val > 50 ? '适中' : '良好'
  if (selectedIndicator.value === '期间费用率') return val > 30 ? '偏高' : val > 15 ? '一般' : '良好'
  if (selectedIndicator.value === '流动比率') return val >= 2 ? '良好' : val >= 1.2 ? '一般' : '偏低'
  if (selectedIndicator.value === '总资产周转率（次）') return val >= 1 ? '良好' : val >= 0.5 ? '一般' : '偏低'
  return val > 0 ? '正常' : '—'
}

function judgmentClass(val) {
  if (val === null || val === undefined) return ''
  const t = judgmentText(val)
  if (t === '良好' || t === '正常') return 'judge-good'
  if (t === '一般' || t === '适中') return 'judge-warn'
  return 'judge-bad'
}

// ============ ECharts 渲染 ============

function renderChart() {
  if (!chartRef.value || !hasData.value) return
  if (!chartInstance) {
    chartInstance = echarts.init(chartRef.value)
  }

  const values = chartValues.value
  const avgLine = industryRefLine.value

  // 计算 Y 轴范围（留 20% 余量）
  const validVals = values.filter(v => v !== null && v !== undefined)
  const minVal = Math.min(...validVals, avgLine !== null ? avgLine : Infinity)
  const maxVal = Math.max(...validVals, avgLine !== null ? avgLine : -Infinity)
  const range = maxVal - minVal || 1
  const yMin = Math.max(0, minVal - range * 0.2)
  const yMax = maxVal + range * 0.3

  const option = {
    tooltip: {
      trigger: 'axis',
      valueFormatter: v => {
        if (v === null || v === undefined) return '—'
        const u = currentIndicator.value?.unit
        return u ? v.toFixed(2) + u : v.toFixed(2)
      },
    },
    legend: {
      data: [currentIndicator.value?.label || selectedIndicator.value, ...(avgLine !== null ? ['行业平均'] : [])],
      bottom: 0,
    },
    grid: { left: 60, right: 30, top: 20, bottom: 36 },
    xAxis: {
      type: 'category',
      data: chartLabels.value,
      axisLabel: { fontSize: 12 },
    },
    yAxis: {
      type: 'value',
      min: yMin,
      max: yMax,
      axisLabel: {
        fontSize: 11,
        formatter: v => {
          const u = currentIndicator.value?.unit
          return u === '%' ? v.toFixed(1) + '%' : v.toFixed(2)
        },
      },
      splitLine: { lineStyle: { type: 'dashed', color: '#e8e8e8' } },
    },
    series: [
      {
        name: currentIndicator.value?.label || selectedIndicator.value,
        type: 'line',
        data: values,
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: { width: 3, color: '#409eff' },
        itemStyle: { color: '#409eff' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(64,158,255,0.25)' },
            { offset: 1, color: 'rgba(64,158,255,0.02)' },
          ]),
        },
        markPoint: {
          data: [
            { type: 'max', name: '最大值' },
            { type: 'min', name: '最小值' },
          ],
          symbolSize: 48,
          label: { formatter: p => p.value?.toFixed(1) || '' },
        },
      },
      ...(avgLine !== null ? [{
        name: '行业平均',
        type: 'line',
        data: chartLabels.value.map(() => avgLine),
        smooth: false,
        symbol: 'none',
        lineStyle: { width: 2, type: 'dashed', color: '#e6a23c' },
        itemStyle: { color: '#e6a23c' },
      }] : []),
    ],
  }

  chartInstance.setOption(option, true)
}

// ============ 交互 ============

function goToMonth(period) {
  // 跳转到对应月份的利润表（tab）
  const month = parseInt(period.slice(4, 6))
  router.push({ path: '/reports/income-statement', query: { month } })
}

// ============ 全指标一览表 ============

const allIndicatorsTable = computed(() => {
  return monthlyData.value.map(m => {
    const row = { period: m.period, label: m.label }
    for (const ind of indicatorNames) {
      row[ind.key] = m.values[ind.key] ?? null
    }
    return row
  })
})

// ============ 生命周期 ============

function refreshData() {
  nextTick(() => {
    renderChart()
    ElMessage.success('已刷新')
  })
}

watch(selectedIndicator, () => {
  nextTick(() => renderChart())
})

watch(monthlyData, () => {
  nextTick(() => renderChart())
}, { deep: true })

function handleResize() {
  chartInstance?.resize()
}

onMounted(() => {
  nextTick(() => renderChart())
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  chartInstance?.dispose()
  chartInstance = null
})
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.page-title {
  font-size: 20px;
  color: #303133;
  margin: 0;
}
.page-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* 指标切换 */
.indicator-selector {
  margin-bottom: 16px;
}
.selector-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.selector-label {
  font-size: 14px;
  color: #606266;
  white-space: nowrap;
  font-weight: 500;
}

/* 趋势图 */
.chart-card {
  margin-bottom: 16px;
}
.trend-chart {
  width: 100%;
  height: 420px;
}

/* 统计卡片 */
.stats-card {
  margin-bottom: 16px;
}
.stats-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  gap: 8px;
}
.stat-item {
  text-align: center;
  padding: 10px 6px;
  border: 1px solid #e4e7ed;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}
.stat-item:hover {
  border-color: #409eff;
  box-shadow: 0 2px 6px rgba(64,158,255,0.1);
}
.stat-month {
  font-size: 12px;
  color: #909399;
  margin-bottom: 4px;
}
.stat-value {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}
.stat-judgment {
  font-size: 11px;
  margin-top: 2px;
}

/* 颜色 */
.value-good { color: #67c23a; }
.value-warn { color: #e6a23c; }
.value-bad  { color: #f56c6c; }
.judge-good { color: #67c23a; }
.judge-warn { color: #e6a23c; }
.judge-bad  { color: #f56c6c; }

/* 暗色主题 */
html.dark .stat-item {
  border-color: #4c4d4f;
  background: #1d1e1f;
}
html.dark .stat-item:hover {
  border-color: #409eff;
}
html.dark .stat-month { color: #a3a6ad; }
html.dark .stat-value { color: #e5eaf3; }
html.dark .selector-label { color: #cfd3dc; }
</style>
