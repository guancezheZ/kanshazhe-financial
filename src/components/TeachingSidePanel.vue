<template>
  <div class="teaching-side-panel" :class="{ collapsed: isCollapsed }">
    <!-- 切换标签（始终可见） -->
    <div class="panel-tab" @click="isCollapsed = !isCollapsed">
      <el-icon :size="18">
        <ArrowLeft v-if="!isCollapsed" />
        <ArrowRight v-else />
      </el-icon>
      <span v-if="isCollapsed" class="tab-label">教学</span>
    </div>

    <!-- 面板内容（展开时） -->
    <div v-show="!isCollapsed" class="panel-body">
      <div class="panel-header">
        <span class="panel-title">📖 教学助手</span>
        <el-button text size="small" @click="isCollapsed = true" style="color:var(--text-secondary)">
          <el-icon><Close /></el-icon>
        </el-button>
      </div>

      <!-- 仅教学模式下显示 -->
      <template v-if="isTeachingActive && task">
        <div class="task-section">
          <div class="task-meta">
            <span class="task-month">{{ monthLabel }}</span>
            <el-tag v-if="task.role && task.role !== 'accountant'" :type="roleTagType(task.role)" size="small" effect="plain">
              {{ roleDisplayName(task.role) }}
            </el-tag>
          </div>
          <div class="task-title">{{ task.title }}</div>
          <div class="task-date">{{ task.date }}</div>
        </div>

        <!-- 进度 -->
        <div class="progress-section">
          <div class="progress-row">
            <span class="progress-label">当月进度</span>
            <span class="progress-value">{{ monthProgress.done }}/{{ monthProgress.total }}</span>
          </div>
          <el-progress :percentage="monthPercent" :stroke-width="6" :show-text="false" />
          <div class="progress-row overall">
            <span class="progress-label">总进度</span>
            <span class="progress-value">{{ overallProgress.done }}/{{ overallProgress.total }}</span>
          </div>
          <el-progress :percentage="overallPercent" :stroke-width="4" :show-text="false" color="var(--accent)" />
        </div>

        <!-- 知识点标签 -->
        <div v-if="task.tags && task.tags.length" class="tags-section">
          <div class="section-label">🏷️ 知识点</div>
          <div class="tag-list">
            <el-tag
              v-for="tag in task.tags" :key="tag"
              size="small"
              type="info"
              effect="plain"
            >{{ tag }}</el-tag>
          </div>
        </div>

        <!-- 教学提示 -->
        <div v-if="task.tip" class="tip-section">
          <div class="section-label">💡 提示</div>
          <div class="tip-content">{{ task.tip }}</div>
        </div>

        <!-- 操作按钮 -->
        <div class="action-section">
          <el-button size="small" type="primary" class="action-btn" @click="goToEntry">
            <el-icon><EditPen /></el-icon> 去录入
          </el-button>
          <el-button size="small" class="action-btn" @click="openTutorial">
            <el-icon><Reading /></el-icon> 教学中心
          </el-button>
        </div>
      </template>

      <!-- 案例模式 -->
      <template v-else-if="isCaseMode">
        <div class="task-section">
          <div class="task-meta">
            <span class="task-month">📋 案例模式</span>
            <el-tag size="small" type="success" effect="plain">{{ caseInfo?.typeLabel || '案例' }}</el-tag>
          </div>
          <div class="task-title">{{ caseInfo?.title || getCaseTitle() }}</div>
          <div v-if="caseTask" class="task-date">{{ caseTask.date }} · {{ caseTask.title }}</div>
          <div v-else class="task-date">点击"去录入"继续做账</div>
        </div>

        <div class="progress-section">
          <div class="progress-row">
            <span class="progress-label">案例进度</span>
            <span class="progress-value">{{ caseDoneCount }}/{{ caseTotalCount }}</span>
          </div>
          <el-progress :percentage="casePercent" :stroke-width="6" :show-text="false" color="#67c23a" />
        </div>

        <div class="action-section">
          <el-button size="small" type="primary" class="action-btn" @click="goToEntry">
            <el-icon><EditPen /></el-icon> 去录入
          </el-button>
          <el-button size="small" class="action-btn" @click="goToCaseDetail">
            <el-icon><Reading /></el-icon> 案例详情
          </el-button>
        </div>
      </template>

      <!-- 未激活教学 -->
      <div v-else class="empty-state">
        <el-icon :size="40" color="var(--text-secondary)"><Reading /></el-icon>
        <p>教学模式未激活</p>
        <el-button size="small" type="primary" @click="openTutorial">打开教学中心</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ArrowLeft, ArrowRight, Close, EditPen, Reading } from '@element-plus/icons-vue'
import { getScenarioConfig, getScenarioTutorials, getProgressKey } from '@/data/scenarios.js'
import { CASES } from '@/data/cases/index.js'

const router = useRouter()

const isCollapsed = ref(true)
const isTeachingActive = ref(false)
const isCaseMode = ref(false)
const task = ref(null)
const allTasks = ref([])
const caseTask = ref(null)
const caseInfo = ref(null)
const caseDoneCount = ref(0)
const caseTotalCount = ref(0)

// 按角色过滤任务（与 TutorialCenter 保持一致）
function filterByRole(tasks) {
  const role = localStorage.getItem('jd_role') || 'accountant'
  if (role === 'supervisor') return tasks
  if (role === 'cashier') return tasks.filter(t => t.role === 'cashier')
  return tasks.filter(t => !t.role || t.role === 'accountant' || t.role === 'supervisor')
}

function isDone(t) {
  const scenarioId = localStorage.getItem('jd_scenario') || 'manufacturing'
  const key = getProgressKey(scenarioId, t.date, t.title)
  return localStorage.getItem(key) === 'true'
}

// 面板状态：从 localStorage 读取教学状态
function refreshCaseInfo(caseId) {
  const found = CASES.find(x => x.id === caseId)
  if (found) {
    caseInfo.value = found
    caseTotalCount.value = found.data?.events?.length || 0
    caseDoneCount.value = found.data?.events
      ? found.data.events.filter(e => localStorage.getItem('case_done_' + caseId + '_' + e.id) === 'true').length
      : 0
  }
}

function refreshState() {
  // 检查案例模式
  const activeCaseId = localStorage.getItem('jd_active_case')
  if (activeCaseId) {
    isCaseMode.value = true
    isTeachingActive.value = false
    task.value = null

    refreshCaseInfo(activeCaseId)

    // 读取当前案例任务
    try {
      const raw = localStorage.getItem('tutorial_task')
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed.caseEventId) {
          caseTask.value = parsed
        } else {
          caseTask.value = null
        }
      } else {
        caseTask.value = null
      }
    } catch { caseTask.value = null }
    return
  }
  isCaseMode.value = false
  isTeachingActive.value = localStorage.getItem('teaching_active') === 'true'
  if (!isTeachingActive.value) {
    task.value = null
    return
  }
  const scenarioId = localStorage.getItem('jd_scenario') || 'manufacturing'
  const config = getScenarioConfig(scenarioId)
  if (!config) return

  // 读取当前任务索引（由 TutorialFloater 写入 localStorage 共享）
  const taskKey = localStorage.getItem('jd_current_task_key')
  const taskDate = localStorage.getItem('jd_current_task_date')

  const all = []
  for (const m of config.months || []) {
    const tasks = getScenarioTutorials(scenarioId, m)
    for (const t of tasks) {
      all.push({ ...t, _month: m })
    }
  }
  all.sort((a, b) => a.date.localeCompare(b.date))
  // 按角色过滤
  allTasks.value = filterByRole(all)

  // 尝试找到当前任务
  const roleTasks = allTasks.value
  if (taskKey) {
    task.value = roleTasks.find(t => t.key === taskKey) || null
  }
  if (!task.value && taskDate) {
    task.value = roleTasks.find(t => t.date === taskDate) || null
  }
  if (!task.value && roleTasks.length > 0) {
    // 找第一个未完成的任务
    const undone = roleTasks.filter(t => !isDone(t))
    task.value = undone[0] || roleTasks[0]
  }
}

const monthLabel = computed(() => {
  if (!task.value) return ''
  const scenarioId = localStorage.getItem('jd_scenario') || 'manufacturing'
  const config = getScenarioConfig(scenarioId)
  const labels = config?.monthLabels || []
  const m = parseInt(task.value._month) - 1
  return labels[m] || (m + 1) + '月'
})

const monthProgress = computed(() => {
  if (!task.value || !allTasks.value.length) return { done: 0, total: 0 }
  const month = task.value._month
  const monthTasks = allTasks.value.filter(t => t._month === month)
  const done = monthTasks.filter(t => isDone(t)).length
  return { done, total: monthTasks.length }
})

const monthPercent = computed(() =>
  monthProgress.value.total ? Math.round(monthProgress.value.done / monthProgress.value.total * 100) : 0
)

const overallProgress = computed(() => {
  if (!allTasks.value.length) return { done: 0, total: 0 }
  const done = allTasks.value.filter(t => isDone(t)).length
  return { done, total: allTasks.value.length }
})

const overallPercent = computed(() =>
  overallProgress.value.total ? Math.round(overallProgress.value.done / overallProgress.value.total * 100) : 0
)

const casePercent = computed(() =>
  caseTotalCount.value ? Math.round(caseDoneCount.value / caseTotalCount.value * 100) : 0
)

function roleDisplayName(role) {
  const map = { cashier: '出纳', supervisor: '主管', accountant: '会计' }
  return map[role] || role
}

function roleTagType(role) {
  const map = { cashier: 'warning', supervisor: 'danger', accountant: 'primary' }
  return map[role] || 'info'
}

function goToEntry() {
  router.push('/accounting/voucher/entry')
}

function openTutorial() {
  router.push('/tutorial')
}

function goToCaseDetail() {
  const caseId = localStorage.getItem('jd_active_case')
  if (caseId) router.push('/cases/' + caseId)
}

function getCaseTitle() {
  const caseId = localStorage.getItem('jd_active_case')
  if (!caseId) return ''
  const found = CASES.find(c => c.id === caseId)
  return found?.title || caseId
}

// 监听 localStorage 变化（其他标签页/组件修改时同步）
let storageHandler = null
let refreshInterval = null

onMounted(() => {
  refreshState()
  storageHandler = (e) => {
    if (e.key?.startsWith('jd_') || e.key?.startsWith('teaching_')) {
      refreshState()
    }
  }
  window.addEventListener('storage', storageHandler)
  // 定期刷新（同一标签页内 TutorialFloater 修改 localStorage 不会触发 storage 事件）
  refreshInterval = setInterval(refreshState, 3000)

  // 教学激活时自动展开
  if (isTeachingActive.value) {
    isCollapsed.value = false
  }
})

onUnmounted(() => {
  if (storageHandler) window.removeEventListener('storage', storageHandler)
  if (refreshInterval) clearInterval(refreshInterval)
})

// 教学激活时自动展开
watch(isTeachingActive, (val) => {
  if (val) isCollapsed.value = false
})
</script>

<style scoped>
.teaching-side-panel {
  position: relative;
  display: flex;
  width: 260px;
  background: var(--bg-card);
  border-left: 1px solid var(--border);
  transition: width 0.3s ease;
  flex-shrink: 0;
}

.teaching-side-panel.collapsed {
  width: 32px;
}

/* 切换标签 */
.panel-tab {
  position: absolute;
  left: -1px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 48px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-right: none;
  border-radius: 4px 0 0 4px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  z-index: 10;
  transition: color 0.2s;
}

.panel-tab:hover {
  color: var(--accent);
}

.tab-label {
  writing-mode: vertical-lr;
  font-size: 10px;
  letter-spacing: 2px;
  margin-top: 2px;
}

/* 面板主体 */
.panel-body {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
}

.panel-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
}

/* 任务信息 */
.task-section {
  padding: 8px;
  background: var(--bg);
  border-radius: 8px;
}

.task-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
}

.task-month {
  font-size: 11px;
  color: var(--accent);
  font-weight: 500;
}

.task-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
  line-height: 1.4;
  margin-bottom: 2px;
}

.task-date {
  font-size: 11px;
  color: var(--text-secondary);
}

/* 进度 */
.progress-section {
  padding: 8px;
  background: var(--bg);
  border-radius: 8px;
}

.progress-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.progress-row.overall {
  margin-top: 8px;
}

.progress-label {
  font-size: 11px;
  color: var(--text-secondary);
}

.progress-value {
  font-size: 11px;
  font-weight: 600;
  color: var(--text);
}

/* 标签区 */
.section-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 4px;
}

.tags-section {
  padding: 8px;
  background: var(--bg);
  border-radius: 8px;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

/* 提示区 */
.tip-section {
  padding: 8px;
  background: var(--bg);
  border-radius: 8px;
}

.tip-content {
  font-size: 12px;
  color: var(--text);
  line-height: 1.5;
}

/* 操作按钮 */
.action-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid var(--border);
}

.action-btn {
  width: 100%;
  display: flex; align-items: center; justify-content: center; gap: 4px;
}
/* 让两个按钮视觉一致 */
.action-section .el-button--primary {
  --el-button-bg-color: var(--accent);
  --el-button-border-color: var(--accent);
}
.action-section .el-button:not(.el-button--primary) {
  --el-button-bg-color: transparent;
  --el-button-border-color: var(--border);
  --el-button-text-color: var(--text-secondary);
}
.action-section .el-button:not(.el-button--primary):hover {
  --el-button-border-color: var(--accent);
  --el-button-text-color: var(--accent);
}

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 32px 8px;
  color: var(--text-secondary);
  font-size: 13px;
  text-align: center;
}
</style>
