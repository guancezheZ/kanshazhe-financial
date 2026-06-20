<template>
  <div class="case-detail">
    <!-- 加载中 -->
    <div v-if="!caseConfig" class="not-found">
      <span class="nf-icon">📋</span>
      <span>案例不存在或已下架</span>
      <el-button size="small" @click="$router.push('/cases')">返回案例库</el-button>
    </div>

    <template v-else>
      <!-- 顶部导航 -->
      <div class="back-bar">
        <el-button text @click="$router.push('/cases')">
          <el-icon><ArrowLeft /></el-icon> 返回案例库
        </el-button>
      </div>

      <!-- 企业背景卡片 -->
      <div class="company-card">
        <div class="company-header">
          <span class="company-icon">{{ caseConfig.icon || '📄' }}</span>
          <div class="company-info">
            <h1 class="company-name">{{ data.companyInfo.name }}</h1>
            <p class="company-title">{{ caseConfig.title }}</p>
          </div>
          <div class="company-type-tag">
            <span class="type-badge" :class="caseConfig.type">{{ caseConfig.typeLabel }}</span>
          </div>
        </div>

        <div class="company-meta">
          <div class="meta-item">
            <span class="meta-label">所属行业</span>
            <span class="meta-value">{{ data.companyInfo.industry }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">纳税人性质</span>
            <span class="meta-value">{{ data.companyInfo.taxType }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">会计制度</span>
            <span class="meta-value">{{ data.companyInfo.accountingSystem }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">难度评级</span>
            <span class="meta-value">⭐ {{ difficultyStars(caseConfig.difficulty) }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">业务事件</span>
            <span class="meta-value">{{ data.events.length }} 笔</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">地址</span>
            <span class="meta-value">{{ data.companyInfo.address }}</span>
          </div>
        </div>

        <div class="company-desc">
          <p>{{ data.companyInfo.description }}</p>
        </div>
      </div>

      <!-- 进度 & 操作 -->
      <div class="action-area">
        <div class="progress-summary">
          <span class="ps-label">完成进度</span>
          <div class="ps-bar">
            <div class="ps-fill" :style="{ width: progressPercent + '%' }"></div>
          </div>
          <span class="ps-text">{{ completedCount }}/{{ totalEvents }} ({{ progressPercent }}%)</span>
        </div>

        <div class="action-buttons">
          <el-button v-if="inCase" type="primary" size="large" @click="resumeCase" class="action-btn">
            ▶ 继续做账
          </el-button>
          <el-button v-else-if="progressPercent >= 100" type="success" size="large" @click="viewReport" class="action-btn">
            📊 查看企业报表
          </el-button>
          <el-button v-else type="primary" size="large" @click="enterCase" class="action-btn">
            🚀 开始做账
          </el-button>
          <el-button v-if="inCase" size="large" @click="exitCaseAction">
            退出案例
          </el-button>
        </div>
      </div>

      <!-- 业务事件列表 -->
      <el-card shadow="never" class="events-card">
        <template #header>
          <span>📋 业务事件列表（共 {{ totalEvents }} 笔）</span>
        </template>
        <div class="events-list">
          <div
            v-for="evt in data.events"
            :key="evt.id"
            class="event-item"
            :class="{ done: isDone(evt.id), active: currentEventId === evt.id }"
          >
            <div class="event-status">
              <span v-if="isDone(evt.id)" class="status-dot done">✓</span>
              <span v-else-if="currentEventId === evt.id" class="status-dot active">▶</span>
              <span v-else class="status-dot pending">{{ String(data.events.indexOf(evt) + 1).padStart(2, '0') }}</span>
            </div>
            <div class="event-body">
              <div class="event-date">{{ evt.date }}</div>
              <div class="event-title">{{ evt.title }}</div>
            </div>
            <el-button
              v-if="inCase && currentEventId !== evt.id"
              size="small"
              text
              @click="jumpToEvent(evt)"
            >
              去做
            </el-button>
          </div>
        </div>
      </el-card>

      <!-- 查看报表入口 -->
      <el-card v-if="progressPercent >= 100" shadow="never" class="report-cta">
        <div class="cta-content">
          <span class="cta-icon">🎉</span>
          <div class="cta-text">
            <strong>恭喜完成所有业务！</strong>
            <p>你现在可以查看该企业完整的三大财务报表，检验做账结果。</p>
          </div>
          <el-button type="primary" size="large" @click="viewReport">
            📊 查看财务报表
          </el-button>
        </div>
      </el-card>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ArrowLeft } from '@element-plus/icons-vue'
import { useStore } from '@/stores/store.js'
import { CASES } from '@/data/cases/index.js'

const route = useRoute()
const router = useRouter()
const store = useStore()

const caseConfig = ref(null)
const data = ref({ subjects: [], events: [], companyInfo: {} })
const currentEventId = ref(null)
const inCase = ref(false)

// 监听任务更新事件
function onTaskUpdated() {
  if (inCase.value && caseConfig.value) {
    loadProgress()
  }
}

onMounted(() => {
  const caseId = route.params.caseId
  const found = CASES.find(c => c.id === caseId)
  if (!found) return
  caseConfig.value = found
  data.value = found.data || { subjects: [], events: [], companyInfo: {} }
  inCase.value = store.getActiveCaseId() === caseId
  loadProgress()
  window.addEventListener('task-updated', onTaskUpdated)
})

onUnmounted(() => {
  window.removeEventListener('task-updated', onTaskUpdated)
})

const totalEvents = computed(() => data.value.events.length || 0)
const completedCount = ref(0)
const progressPercent = computed(() => {
  if (!totalEvents.value) return 0
  return Math.round(completedCount.value / totalEvents.value * 100)
})

function loadProgress() {
  const caseId = caseConfig.value?.id
  if (!caseId) return
  completedCount.value = data.value.events.filter(
    e => localStorage.getItem('case_done_' + caseId + '_' + e.id) === 'true'
  ).length
  // 找到当前正在进行的事件
  for (const e of data.value.events) {
    if (localStorage.getItem('case_done_' + caseId + '_' + e.id) !== 'true') {
      currentEventId.value = e.id
      break
    }
  }
  if (completedCount.value >= totalEvents.value) currentEventId.value = null
}

function enterCase() {
  const caseId = caseConfig.value.id
  if (!caseId) return
  const result = store.switchToCase(caseId)
  if (result.success) {
    inCase.value = true
    ElMessage.success('已进入案例模式，开始做账吧！')
    // 加载第一个事件到 VoucherEntry
    jumpToEvent(data.value.events[0])
  }
}

function resumeCase() {
  // 跳转到当前未完成的事件
  jumpToEvent(data.value.events.find(
    e => localStorage.getItem('case_done_' + caseConfig.value.id + '_' + e.id) !== 'true'
  ) || data.value.events[data.value.events.length - 1])
}

function jumpToEvent(evt) {
  if (!evt) return
  // 设置 tutorial_task 以便 VoucherEntry 拾取
  localStorage.setItem('tutorial_task', JSON.stringify({
    ...evt,
    caseEventId: evt.id,
    caseId: caseConfig.value.id,
  }))
  localStorage.setItem('tutorial_mode', 'practice')
  router.push('/accounting/voucher/entry')
}

function exitCaseAction() {
  ElMessageBox.confirm(
    '退出案例后，已完成的进度不会丢失，下次可继续。确定退出吗？',
    '退出案例',
    { confirmButtonText: '退出', cancelButtonText: '取消', type: 'info' }
  ).then(() => {
    const result = store.exitCase()
    if (result.success) {
      inCase.value = false
      ElMessage.success('已退出案例模式')
      router.push('/cases')
    }
  }).catch(() => {})
}

function viewReport() {
  // 留下案例ID参数，由 CaseReport 或直接跳报表页使用
  router.push({ name: 'CaseReport', params: { caseId: caseConfig.value.id } })
}

function isDone(eventId) {
  return localStorage.getItem('case_done_' + caseConfig.value?.id + '_' + eventId) === 'true'
}

function difficultyStars(d) {
  return '★'.repeat(d || 1) + '☆'.repeat(3 - (d || 1))
}
</script>

<style scoped>
.case-detail {
  max-width: 800px;
  margin: 0 auto;
  padding-bottom: 40px;
}
.back-bar { margin-bottom: 16px; }
.not-found {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-light, #909399);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.nf-icon { font-size: 48px; }

/* ─── 企业信息卡 ─── */
.company-card {
  background: var(--bg-card, #fff);
  border: 1px solid var(--border, #e4e7ed);
  border-radius: 14px;
  padding: 24px;
  margin-bottom: 20px;
}
.company-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 18px;
}
.company-icon { font-size: 40px; }
.company-info { flex: 1; }
.company-name {
  font-size: 20px;
  font-weight: 700;
  color: var(--text, #303133);
  margin: 0;
}
.company-title {
  font-size: 13px;
  color: var(--text-light, #909399);
  margin: 2px 0 0;
}
.type-badge {
  font-size: 12px;
  font-weight: 600;
  padding: 3px 12px;
  border-radius: 12px;
}
.type-badge.small { background: #e6f7ff; color: #1890ff; }
.type-badge.medium { background: #fff7e6; color: #fa8c16; }
.type-badge.large { background: #fef0ef; color: #f56c6c; }
.company-meta {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px 20px;
  margin-bottom: 14px;
  padding: 12px 16px;
  background: var(--bg, #f0f2f5);
  border-radius: 8px;
}
[data-theme="dark"] .company-meta { background: #2a2a2a; }
.meta-item {
  display: flex;
  gap: 6px;
  font-size: 13px;
}
.meta-label { color: var(--text-light, #909399); min-width: 70px; }
.meta-value { color: var(--text, #303133); font-weight: 500; }
.company-desc {
  font-size: 14px;
  color: var(--text-secondary, #606266);
  line-height: 1.7;
  padding: 0 4px;
}

/* ─── 操作区 ─── */
.action-area {
  background: var(--bg-card, #fff);
  border: 1px solid var(--border, #e4e7ed);
  border-radius: 12px;
  padding: 18px 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}
.progress-summary {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 200px;
}
.ps-label {
  font-size: 13px;
  color: var(--text-secondary, #606266);
  white-space: nowrap;
}
.ps-bar {
  flex: 1;
  height: 8px;
  background: var(--bg, #f0f2f5);
  border-radius: 4px;
  overflow: hidden;
}
.ps-fill {
  height: 100%;
  background: linear-gradient(90deg, #409eff, #67c23a);
  border-radius: 4px;
  transition: width 0.4s ease;
}
.ps-text {
  font-size: 12px;
  color: var(--text-light, #909399);
  white-space: nowrap;
}
.action-buttons {
  display: flex;
  gap: 8px;
}
.action-btn { letter-spacing: 0.5px; }

/* ─── 事件列表 ─── */
.events-card { margin-bottom: 20px; border-radius: 10px; }
.events-list { display: flex; flex-direction: column; gap: 2px; }
.event-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  transition: background 0.2s;
  cursor: default;
}
.event-item:hover { background: var(--bg, #f0f2f5); }
.event-item.done { opacity: 0.6; }
.event-item.active {
  background: rgba(64,158,255,0.06);
  border: 1px solid rgba(64,158,255,0.2);
}
.event-status { flex-shrink: 0; }
.status-dot {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  font-size: 11px;
  font-weight: 700;
}
.status-dot.done { background: #67c23a; color: #fff; }
.status-dot.active { background: #409eff; color: #fff; }
.status-dot.pending { background: var(--bg, #f0f2f5); color: var(--text-light, #909399); }
.event-body { flex: 1; }
.event-date { font-size: 11px; color: var(--text-light, #909399); }
.event-title {
  font-size: 14px;
  color: var(--text, #303133);
  font-weight: 500;
}

/* ─── 完成提示 ─── */
.report-cta { border-radius: 10px; }
.cta-content {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}
.cta-icon { font-size: 32px; }
.cta-text { flex: 1; }
.cta-text strong { font-size: 15px; color: var(--text, #303133); }
.cta-text p { font-size: 13px; color: var(--text-secondary, #606266); margin: 4px 0 0; }
</style>
