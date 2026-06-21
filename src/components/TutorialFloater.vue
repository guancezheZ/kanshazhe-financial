<template>
  <div v-if="task && !minimized" class="tutorial-floater" data-theme="light" :style="floaterStyle" @mousedown="startDrag">
    <div class="floater-header">
      <span class="floater-title">📋 教学任务</span>
      <el-input
        v-model="floaterSearch"
        placeholder="🔍 搜索..."
        size="small"
        clearable
        class="floater-search"
        @click.stop
        @clear="floaterSearch = ''"
      />
      <div class="floater-actions">
        <el-button text size="small" @click.stop="prevTask">◀</el-button>
        <span class="task-counter">{{ currentIdx + 1 }}/{{ totalTasks }}</span>
        <el-button text size="small" @click.stop="nextTask">▶</el-button>
        <el-button text size="small" type="danger" @click.stop="close">✕</el-button>
      </div>
    </div>

    <!-- 月份进度条 -->
    <div class="month-bar">
      <span class="month-badge">{{ currentMonthName }}</span>
      <span class="current-role-badge">{{ roleLabel(store.getCurrentRole()) }}</span>
      <span class="month-progress">{{ monthProgress.done }}/{{ monthProgress.total }}</span>
      <span v-if="monthProgress.remaining > 0" class="month-remaining">剩余{{ monthProgress.remaining }}</span>
      <el-tag v-else size="small" type="success" effect="dark" style="font-size:10px;height:18px;line-height:16px;padding:0 6px">✓ 已完成</el-tag>
      <el-progress :percentage="Math.round(overallProgress.done / Math.max(overallProgress.total, 1) * 100)" :stroke-width="4" :show-text="false" style="flex:1;margin:0 6px" />
      <span class="overall-progress">{{ overallProgress.done }}/{{ overallProgress.total }}</span>
    </div>
<div class="floater-date">
      <span>{{ task.date }} · {{ task.title }}</span>
      <div style="display:flex;gap:4px;align-items:center;flex-shrink:0">
        <el-tag v-if="task.role && task.role !== 'accountant'" :type="roleTagType(task.role)" size="small" effect="plain" style="font-size:9px;height:16px;line-height:14px;padding:0 4px">{{ roleLabel(task.role) }}</el-tag>
        <el-tag v-if="isTaskDone(task)" size="small" type="success" effect="dark" style="font-size:10px;height:18px;line-height:16px;padding:0 6px">✅ 已完成</el-tag>
        <el-tag v-else size="small" type="warning" effect="plain" style="font-size:10px;height:18px;line-height:16px;padding:0 6px">⏳ 未完成</el-tag>
      </div>
    </div>

    <!-- 按课程学 / 自由练习 切换 -->
    <div class="course-mode-bar" style="padding:2px 10px;display:flex;align-items:center;gap:4px;background:var(--el-fill-color-light);border-radius:4px;margin:2px 8px">
      <el-switch
        :model-value="store.isPracticeMode()"
        @update:model-value="store.togglePracticeMode()"
        size="small"
        active-text="🎯 自由练习"
        inactive-text="📚 按课程学"
        style="--el-switch-on-color: #e6a23c;"
      />
      <span style="font-size:13px;cursor:help;color:#909399" title="自由练习：不记进度、不给XP、不过账、可重复做；适合复习和查漏补缺">ⓘ</span>
    </div>

    <!-- 教学模式（引导/练习/考试/纠错） -->
    <div class="mode-switch">
      <el-radio-group v-model="tutorialMode" size="small">
        <el-radio-button value="practice">✏️ 练习</el-radio-button>
        <el-radio-button value="exam">📝 考试</el-radio-button>
        <el-radio-button value="error-find">🔍 纠错</el-radio-button>
      </el-radio-group>
    </div>

    <!-- 标签筛选 -->
    <div class="tag-filter-bar" v-if="flatTasks.length > 0">
      <el-scrollbar class="tag-scroll" wrap-class="tag-scroll-wrap">
        <div class="tag-scroll-inner">
          <el-tag
            v-for="tag in TAG_OPTIONS" :key="tag"
            size="small"
            :type="tagFilter === tag ? 'primary' : 'info'"
            effect="plain"
            class="tag-chip"
            @click="toggleTag(tag)"
          >{{ tag }}</el-tag>
          <el-tag v-if="tagFilter" size="small" type="danger" effect="plain" class="tag-chip" @click="tagFilter = ''; currentIdx=0; updateTask()">
            ✕ 清除
          </el-tag>
          <span v-if="tagFilter" class="tag-filter-count">{{ filteredTasks.length }}个任务</span>
        </div>
      </el-scrollbar>
    </div>

    <!-- 错题强化推送：高错误率标签提醒 -->
    <div v-if="weakTags.length > 0 && !tagFilter" class="weak-tag-bar">
      <span class="weak-tag-icon">📌</span>
      <span class="weak-tag-text">需强化：</span>
      <el-tag
        v-for="wt in weakTags" :key="wt.tag"
        size="small"
        type="danger"
        effect="plain"
        style="cursor:pointer"
        @click="tagFilter = wt.tag; currentIdx=0; updateTask()"
      >{{ wt.tag }}（错{{ wt.wrong }}/{{ wt.total }}）
      </el-tag>
      <span class="weak-tag-hint">点击筛选同类任务</span>
    </div>

    <div class="floater-body">
      <!-- 跨月完成提示（内联） -->
      <div v-if="showMonthTransition" class="month-complete-banner">
        <div class="mc-icon">🎉</div>
        <div class="mc-text">
          <strong>{{ currentMonthName }}全部完成！</strong>
          <span>进入 {{ nextMonthName }} 继续学习？</span>
        </div>
        <div class="mc-actions">
          <el-button size="small" type="primary" @click="confirmNextMonth">继续</el-button>
          <el-button size="small" @click="showMonthTransition = false">留在此处</el-button>
        </div>
      </div>

<!-- 电子凭证展示区 -->
      <div class="voucher-doc">
        <div class="doc-header">
          <span class="doc-title">📎 原始凭证</span>
          <div style="display:flex;gap:4px;align-items:center">
            <el-tag size="small" type="success">{{ docs.length }}张</el-tag>
            <el-button v-if="docs.length > 0" text size="small" type="primary" @click.stop="showLightbox = true">🔍 放大</el-button>
          </div>
        </div>

        <!-- 分类过滤 tabs -->
        <div v-if="docCategories.length > 1" class="doc-filter">
          <el-tag v-for="cat in docCategories" :key="cat" size="small" :type="docFilter === cat ? 'primary' : 'info'" style="cursor:pointer" @click="docFilter = cat">{{ cat }}</el-tag>
          <el-tag v-if="docFilter !== '全部'" size="small" style="cursor:pointer" @click="docFilter = '全部'">清除筛选</el-tag>
        </div>

        <!-- 缩略图卡片网格 -->
        <div class="doc-content">
          <template v-if="filteredDocs.length > 0">
            <div class="thumb-grid">
              <div v-for="(d, i) in filteredDocs" :key="i"
                class="thumb-card"
                :class="{ active: currentDocIdx === docs.indexOf(d) }"
                @click="currentDocIdx = docs.indexOf(d)">
                <div class="thumb-icon">{{ docIcon(d.type) }}</div>
                <div class="thumb-label">{{ d.label }}</div>
                <div class="thumb-tag-row">
                  <el-tag :type="docTagType(d.type)" size="small" effect="plain">{{ docTypeLabel(d.type) }}</el-tag>
                </div>
                <div v-if="d.totalAmount" class="thumb-amount">¥{{ fmt(d.totalAmount) }}</div>
                <div v-else class="thumb-amount dim">{{ d.date || '' }}</div>
                <div v-if="currentDocIdx === docs.indexOf(d)" class="thumb-check">✓</div>
              </div>
            </div>
            <div class="doc-preview">
              <VoucherDisplay :doc="docs[currentDocIdx]" />
            </div>
          </template>
          <div v-else style="text-align:center;padding:20px;color:#909399;font-size:12px">
            该任务暂无电子凭证
          </div>
      </div>

      <!-- 教学提示 -->
      <details class="tip-section" open>
        <summary style="cursor:pointer;font-size:12px;color:#909399">💡 教学提示（可参考）</summary>
        <div class="tip-text">{{ task.tip }}</div>
      </details>

      <!-- 纠错训练模式 -->
      <div v-if="tutorialMode === 'error-find'" class="ec-section">
        <ErrorCorrectionGame
          v-if="task?.entries?.length"
          :entries="task.entries"
          :taskTitle="task?.description || task?.title || ''"
          @complete="onErrorFindComplete"
          @quit="onErrorFindQuit"
        />
        <div v-else style="text-align:center;padding:20px;color:#909399;font-size:12px">
          该任务无可纠错的分录数据
        </div>
      </div>
    </div>
    </div>

    <div v-if="tutorialMode !== 'error-find'" class="floater-footer">
      <el-button v-if="!hasEntries" size="small" type="success" @click="markReadDone">✅ 确认已完成</el-button>
      <el-button v-else-if="task?.nextAction === 'tax-filing'" size="small" type="danger" @click="goToEntry">
        🧾 去报税
      </el-button>
      <el-button v-else size="small" type="primary" @click="goToEntry">
        {{ tutorialMode === 'exam' ? '📝 开始答题' : '✏️ 开始练习' }}
      </el-button>
      <el-button v-if="tutorialMode !== 'exam' && hasEntries" size="small" @click="showAnswer">查看答案</el-button>
      <el-button size="small" type="danger" plain @click="showWrongAnswers = true">📝 错题本</el-button>
    <div class="resize-handle" @mousedown.stop="startResize">↘</div>
    </div>
  </div>

  <!-- 灯箱大图预览 -->
  <Teleport to="body">
    <div v-if="showLightbox && docs.length > 0" class="lightbox-overlay" @click.self="showLightbox = false">
      <div class="lightbox-header">
        <span class="lightbox-title">{{ docs[currentDocIdx]?.label }} · {{ currentDocIdx + 1 }}/{{ docs.length }}</span>
        <div class="lightbox-actions">
          <el-button text size="small" style="color:#fff" @click="lightboxPrev">◀</el-button>
          <el-button text size="small" style="color:#fff" @click="lightboxNext">▶</el-button>
          <el-button text size="small" style="color:#fff;margin-left:12px" @click="showLightbox = false">✕ 关闭</el-button>
        </div>
      </div>
      <div class="lightbox-body">
        <div class="lightbox-doc">
          <VoucherDisplay :doc="docs[currentDocIdx]" />
        </div>
      </div>
    </div>
  </Teleport>
  <div v-if="minimized" class="floater-badge" @click="minimized=false">📋</div>

  <!-- 错题本弹窗 -->
  <Teleport to="body">
    <el-dialog v-model="showWrongAnswers" title="📝 错题本" width="560" :close-on-click-modal="false">
      <div v-if="wrongAnswerList.length === 0" style="text-align:center;padding:30px 0;color:#909399">
        <div style="font-size:36px;margin-bottom:10px">🎉</div>
        <p>暂无错题！你太棒了！</p>
      </div>
      <div v-for="(item, i) in wrongAnswerList" :key="item.key" class="wrong-item">
        <div class="wrong-header">
          <span class="wrong-date">{{ item.date }}</span>
          <span class="wrong-title">{{ item.title }}</span>
          <span class="wrong-badge" v-if="item.retryCount > 0">已纠{{ item.retryCount }}次</span>
          <el-button text size="small" type="primary" @click="goToWrongTask(item)">去重做</el-button>
        </div>
        <div class="wrong-errors">
          <div v-for="(err, j) in item.errors" :key="j" class="wrong-error-line">❌ {{ err }}</div>
        </div>
      </div>
      <div v-if="wrongAnswerList.length > 0" class="wrong-footer">
        <el-button size="small" type="danger" plain @click="clearWrongAnswers">🗑️ 清空错题本</el-button>
      </div>
    </el-dialog>
  </Teleport>

  <!-- 查看答案弹窗 -->
  <Teleport to="body">
    <el-dialog v-model="showAnswerVisible" title="📖 正确答案与讲解" width="640" :close-on-click-modal="false">
      <div v-if="answerData.length === 0" style="text-align:center;padding:20px;color:#909399">无分录数据</div>
      <div v-for="entry in answerData" :key="entry.idx" class="answer-entry">
        <div class="answer-header">
          <span class="answer-num">第{{ entry.idx }}条</span>
          <span class="answer-subject">{{ entry.subjectCode }}</span>
          <span class="answer-summary">{{ entry.summary }}</span>
          <span class="answer-amount">
            <span v-if="entry.debit > 0" class="amount-debit">借 ¥{{ fmt(entry.debit) }}</span>
            <span v-if="entry.credit > 0" class="amount-credit">贷 ¥{{ fmt(entry.credit) }}</span>
          </span>
        </div>
        <div v-if="entry.explanation" class="answer-explain">💡 {{ entry.explanation }}</div>
      </div>
      <template #footer>
        <el-button type="primary" @click="showAnswerVisible = false">知道了</el-button>
      </template>
    </el-dialog>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/stores/store.js'
import { ElMessageBox, ElMessage } from 'element-plus'
import { formatAmount } from '@/utils/accounting.js'
import VoucherDisplay from '@/components/VoucherDisplay.vue'
import ErrorCorrectionGame from '@/components/ErrorCorrectionGame.vue'
import { getScenarioConfig, getScenarioTutorials, getProgressKey, getScenarioTags, getDoneKeyPrefix, getTagStatsKey, getWrongAnswersKey, getStreakKey } from '@/data/scenarios.js'

function filterByRole(tasks) {
  const role = store.getCurrentRole()
  if (role === 'supervisor') return tasks
  if (role === 'cashier') return tasks.filter(t => t.role === 'cashier')
  // accountant（默认）：显示无角色标记的会计任务，或有 accountant/supervisor 角色的任务
  return tasks.filter(t => !t.role || t.role === 'accountant' || t.role === 'supervisor')
}

function loadAllMonths() {
  const all = []
  const months = getFloaterMonths()
  for (const m of months) {
    const tasks = getScenarioTutorials(floaterScenarioId.value, m)
    for (const t of tasks) {
      all.push({ ...t, _month: m })
    }
  }
  const filtered = filterByRole(all)
  // 按日期排序，确保任务顺序不乱
  filtered.sort((a, b) => a.date.localeCompare(b.date))
  return filtered
}

const router = useRouter()
const store = useStore()

// 场景状态
const floaterScenarioId = ref(localStorage.getItem('jd_scenario') || 'manufacturing')
const floaterScenario = computed(() => getScenarioConfig(floaterScenarioId.value))
const TAG_OPTIONS = computed(() => {
  const tags = getScenarioTags(floaterScenarioId.value)
  // 非出纳角色不显示"出纳"知识点（会计任务中的出纳标签是历史遗留）
  if (store.getCurrentRole() !== 'cashier') {
    return tags.filter(t => t !== '出纳')
  }
  return tags
})
function getFloaterMonths() {
  return floaterScenario.value?.months || []
}
function getMonthName(m) {
  const labels = floaterScenario.value?.monthLabels || []
  return labels[parseInt(m) - 1] || m + '月'
}

const task = ref(null)
const currentIdx = ref(0)
const currentDocIdx = ref(0)
const flatTasks = ref([])              // 所有月份摊平后的任务列表
const tick = ref(0)                     // 用于强制刷新进度（完成/取消完成时递增）
const tutorialMode = ref(localStorage.getItem('tutorial_mode') || 'practice')
const tagFilter = ref('')              // 标签筛选（空=全部）
const floaterSearch = ref('')           // 浮动窗搜索
const filteredTasks = computed(() => {
  let result = flatTasks.value
  // 标签筛选
  if (tagFilter.value) {
    result = result.filter(t => t.tags && t.tags.includes(tagFilter.value))
  }
  // 搜索筛选
  if (floaterSearch.value) {
    const q = floaterSearch.value.toLowerCase()
    result = result.filter(t =>
      t.title.toLowerCase().includes(q) ||
      (t.description && t.description.toLowerCase().includes(q)) ||
      (t.tags && t.tags.some(tag => tag.toLowerCase().includes(q)))
    )
  }
  return result
})
const totalTasks = computed(() => filteredTasks.value.length)
const currentMonth = computed(() => task.value?._month || '')
const currentMonthName = computed(() => getMonthName(currentMonth.value))
const monthProgress = computed(() => {
  tick.value // 强制刷新：完成任务时 tick++ 触发重新计算
  if (!currentMonth.value) return { done: 0, total: 0, remaining: 0 }
  const all = flatTasks.value.filter(t => t._month === currentMonth.value)
  const done = all.filter(t => isTaskDone(t)).length
  return { done, total: all.length, remaining: all.length - done }
})
const overallProgress = computed(() => {
  tick.value // 强制刷新
  const done = flatTasks.value.filter(t => isTaskDone(t)).length
  return { done, total: flatTasks.value.length }
})

const hasEntries = computed(() => (task.value?.entries && task.value.entries.length > 0) || !!task.value?.nextAction)

// 错题强化推送：找出错误率 > 30% 的知识点标签
const weakTags = computed(() => {
  try {
    const raw = localStorage.getItem(getTagStatsKey(floaterScenarioId.value))
    if (!raw) return []
    const stats = JSON.parse(raw)
    // 清理旧系统bug残留数据（之前subjectCode比对错误导致假错题）
    // 直接删除旧的tag stats，让它在新的比对逻辑下重新积累
    localStorage.removeItem(getTagStatsKey(floaterScenarioId.value))
    return []
    const result = []
    for (const [tag, data] of Object.entries(stats)) {
      if (data.wrong > 0 && data.attempted >= 3 && data.wrong / data.attempted > 0.3) {
        result.push({ tag, rate: Math.round(data.wrong / data.attempted * 100), wrong: data.wrong, total: data.attempted })
      }
    }
    return result.sort((a, b) => b.rate - a.rate).slice(0, 2)
  } catch { return [] }
})

function markReadDone() {
  if (!task.value) return
  const key = getProgressKey(floaterScenarioId.value, task.value.date, task.value.title)
  localStorage.setItem(key, 'true')
  tick.value++  // 触发进度刷新
  ElMessage.success('✅ 已确认完成')
  // 自动前进到下一个任务
  setTimeout(() => {
    if (currentIdx.value < flatTasks.value.length - 1) {
      currentIdx.value++
      updateTask()
    }
  }, 800)
}

// ─── 跨月提示 ───
const showMonthTransition = ref(false)
const nextMonthName = computed(() => {
  if (!task.value) return ''
  const months = getFloaterMonths()
  const idx = months.indexOf(task.value._month)
  if (idx < 0 || idx >= months.length - 1) return ''
  return getMonthName(months[idx + 1])
})

// ─── 文档分类/过滤/展示 ───
const docFilter = ref('全部')
const showLightbox = ref(false)
const docCategories = computed(() => {
  if (!docs.value.length) return []
  const cats = new Set(docs.value.map(d => docTypeLabel(d.type)))
  return ['全部', ...cats]
})
const filteredDocs = computed(() => {
  if (docFilter.value === '全部') return docs.value
  return docs.value.filter(d => docTypeLabel(d.type) === docFilter.value)
})

function roleLabel(roleId) {
  return { cashier: '出纳', accountant: '会计', supervisor: '主管' }[roleId] || roleId
}
function roleTagType(roleId) {
  return { cashier: 'warning', accountant: 'primary', supervisor: 'danger' }[roleId] || 'info'
}
function docIcon(type) {
  const icons = { invoice: '📄', bank: '🏦', receipt: '🧾', text: '📝' }
  return icons[type] || '📎'
}
function docTagType(type) {
  const types = { invoice: 'danger', bank: 'primary', receipt: 'warning', text: 'info' }
  return types[type] || 'info'
}
function docTypeLabel(type) {
  const labels = { invoice: '发票', bank: '银行回单', receipt: '收据', text: '文档' }
  return labels[type] || type
}
function lightboxPrev() {
  if (currentDocIdx.value > 0) currentDocIdx.value--
}
function lightboxNext() {
  if (currentDocIdx.value < docs.value.length - 1) currentDocIdx.value++
}
function confirmNextMonth() {
  showMonthTransition.value = false
  if (currentIdx.value < flatTasks.value.length - 1) {
    currentIdx.value++
    updateTask()
  }
}
const docs = computed(() => {
  if (!task.value) return []
  if (task.value.documents && task.value.documents.length > 0) {
    currentDocIdx.value = Math.min(currentDocIdx.value, task.value.documents.length - 1)
    return task.value.documents
  }
  if (task.value.voucherType) return [{type: task.value.voucherType, label: task.value.voucherType === "invoice" ? "发票" : "回单", content: task.value.documentText, lineItems: task.value.lineItems, totalAmount: task.value.totalAmount, buyer: task.value.buyer, seller: task.value.seller, date: task.value.date}]
  return [{type: "text", label: "凭证", content: task.value.documentText || task.value.description}]
})

// 浮动窗位置
const posX = ref(typeof window !== 'undefined' ? window.innerWidth - 420 : 1080)
const posY = ref(80)
const dragging = ref(false)
const resizing = ref(false)
const minimized = ref(false)
const floaterW = ref(380)
const floaterH = ref(null)
const dragOffset = { x: 0, y: 0 }

const floaterStyle = computed(() => ({
  position: 'fixed',
  left: posX.value + 'px',
  top: posY.value + 'px',
  zIndex: 9999,
  width: floaterW.value + 'px',
    height: floaterH.value ? floaterH.value + 'px' : 'auto',
    maxHeight: floaterH.value ? 'none' : '90vh',
    display: 'flex',
    flexDirection: 'column',
  cursor: dragging.value ? 'grabbing' : 'default',
}))

function fmt(v) { return formatAmount(v) }

function isTaskDone(t) {
  if (!t) return false
  void tick.value  // 依赖响应式计数器，确保完成后刷新
  const key = getProgressKey(floaterScenarioId.value, t.date, t.title)
  return localStorage.getItem(key) === 'true'
}

// 判断任务是否被前序任务锁定（跨月+月内统一检查）
function isTaskLocked(t) {
  if (!t) return false
  const monthlyMode = localStorage.getItem('jd_monthly_mode') !== 'false'
  if (!monthlyMode || store.isPracticeMode()) return false
  if (t.entries.length === 0) return false // 信息任务不锁
  // 全局所有有分录任务按日期排序，前面的没做完就锁定后面的
  const allEntryTasks = flatTasks.value
    .filter(task => task.entries.length > 0)
    .sort((a, b) => (a.date || '').localeCompare(b.date || ''))
  const idx = allEntryTasks.findIndex(task => task.date === t.date && task.title === t.title)
  if (idx <= 0) return false // 第一个分录任务始终可用
  for (let i = 0; i < idx; i++) {
    if (!isTaskDone(allEntryTasks[i])) return true
  }
  return false
}

function loadTask() {
  try {
    // 案例模式下不显示教学浮动窗
    if (localStorage.getItem('jd_active_case')) {
      task.value = null
      return
    }

    // 同步当前场景ID
    const storedScenario = localStorage.getItem('jd_scenario') || 'manufacturing'
    floaterScenarioId.value = storedScenario

    // 加载所有月份任务
    flatTasks.value = loadAllMonths()

    // 首次进入教学时自动初始化账套（含期初余额）+ 清空旧的完成记录
    if (!localStorage.getItem('teaching_active') && flatTasks.value.length > 0) {
      if (floaterScenarioId.value === 'commercial') {
        store.initCommercialAccount()
      } else if (floaterScenarioId.value === 'service') {
        store.initServiceAccount()
      } else if (floaterScenarioId.value === 'construction') {
        store.initConstructionAccount()
      } else {
        store.initTeachingAccount()
      }
      // 清除当前场景的所有历史完成标记
      const prefix = getDoneKeyPrefix(floaterScenarioId.value)
      Object.keys(localStorage).filter(k => k.startsWith(prefix)).forEach(k => localStorage.removeItem(k))
      // 同时清除错题统计
      localStorage.removeItem(getTagStatsKey(floaterScenarioId.value))
      localStorage.removeItem(getStreakKey(floaterScenarioId.value))
    }

    const raw = localStorage.getItem('tutorial_task')
    if (!raw) { task.value = null; return }
    const data = JSON.parse(raw)

    // 如果保存的任务场景与当前场景不同，直接跳转至第一个任务
    if (data._scenario && data._scenario !== floaterScenarioId.value) {
      currentIdx.value = 0
      updateTask()
      return
    }

    // 在扁平列表中定位当前任务
    const foundIdx = flatTasks.value.findIndex(t => t.date === data.date && t.title === data.title)
    if (foundIdx === -1) {
      // 没找到（例如从案例模式退出后，tutorial_task 还是案例事件），跳到第一个教学任务
      currentIdx.value = 0
      updateTask()
      return
    }

    // 检查当前任务是否匹配当前标签筛选，不匹配则跳到筛选后第一个
    const filtered = filteredTasks.value
    const taskInFilter = filtered.findIndex(t => t.date === data.date && t.title === data.title)
    if (taskInFilter >= 0) {
      currentIdx.value = taskInFilter
      task.value = filtered[taskInFilter]
    } else {
      // 当前任务不在筛选中 → 取筛选后第一个（或 flat 的第一个）
      currentIdx.value = 0
      task.value = filtered.length > 0 ? filtered[0] : flatTasks.value[0]
    }
    // 如果当前任务被锁定，跳到第一个未锁定的任务
    if (isTaskLocked(task.value)) {
      const unlockedIdx = filtered.findIndex(t => !isTaskLocked(t) && !isTaskDone(t))
      if (unlockedIdx >= 0) {
        currentIdx.value = unlockedIdx
        task.value = filtered[unlockedIdx]
      }
    }
  } catch { task.value = null }
}

function goToEntry() {
  // 月度模式锁定检查
  if (isTaskLocked(task.value)) {
    ElMessage.warning('该任务尚未解锁，请先完成前面的任务')
    return
  }
  // 特殊操作：跳转到指定页面（如税申报）
  const nextAction = task.value?.nextAction
  if (nextAction === 'tax-filing') {
    router.push({ name: 'TaxFiling' })
    return
  }

  // 角色检查：任务有指定角色且与当前角色不符时提示
  const taskRole = task.value?.role
  if (taskRole) {
    const currentRole = store.getCurrentRole()
    const roleName = { cashier: '出纳', accountant: '会计', supervisor: '会计主管' }
    if (currentRole !== taskRole) {
      ElMessageBox.confirm(
        `当前任务应由【${roleName[taskRole] || taskRole}】完成，当前角色为【${roleName[currentRole] || currentRole}】。是否切换角色？`,
        '角色提示',
        { confirmButtonText: '切换角色并继续', cancelButtonText: '取消', type: 'warning' }
      ).then(() => {
        store.switchRole(taskRole)
        doNavigate()
      }).catch(() => {})
      return
    }
  }
  doNavigate()
}

function doNavigate() {
  localStorage.setItem('tutorial_mode', tutorialMode.value)
  const navKey = Date.now()
  router.push({
    path: '/accounting/voucher/entry',
    query: { mode: tutorialMode.value, _k: navKey }
  })
}

const showAnswerVisible = ref(false)
const answerData = ref([])
const showWrongAnswers = ref(false)
const wrongAnswerList = ref([])

function loadWrongAnswers() {
  try {
    wrongAnswerList.value = JSON.parse(localStorage.getItem(getWrongAnswersKey(floaterScenarioId.value)) || '[]')
  } catch { wrongAnswerList.value = [] }
}

function clearWrongAnswers() {
  localStorage.removeItem(getWrongAnswersKey(floaterScenarioId.value))
  wrongAnswerList.value = []
  ElMessage.success('错题本已清空')
}

function goToWrongTask(item) {
  // 定位到错题对应的任务
  const idx = flatTasks.value.findIndex(t => t.date === item.date && t.title === item.title)
  if (idx >= 0) {
    const locked = isTaskLocked(flatTasks.value[idx])
    if (locked) {
      ElMessage.warning('该任务已被锁定，请先完成前面的任务')
      return
    }
    currentIdx.value = idx
    updateTask()
    showWrongAnswers.value = false
    // 自动弹出录入
    setTimeout(() => goToEntry(), 300)
  } else {
    ElMessage.warning('未找到该任务（可能已被移除）')
  }
}

// 监听 storage 变化（其他页面添加错题时自动刷新）
watch(showWrongAnswers, (val) => {
  if (val) loadWrongAnswers()
})

function showAnswer() {
  if (!task.value || !task.value.entries) return
  answerData.value = task.value.entries.map((e, i) => ({
    idx: i + 1,
    summary: e.summary || '',
    subjectCode: e.subjectCode,
    debit: e.debit || 0,
    credit: e.credit || 0,
    explanation: e.explanation || '',
  }))
  showAnswerVisible.value = true
}

function onErrorFindComplete() {
  ElMessage.success('纠错训练完成！')
}

function onErrorFindQuit() {
  // 退出纠错模式，切回之前的教学模式
  tutorialMode.value = 'practice'
  localStorage.setItem('tutorial_mode', 'practice')
  ElMessage.info('已退出纠错模式')
}

function prevTask() {
  if (currentIdx.value > 0) {
    currentIdx.value--
    updateTask()
  }
}

function nextTask() {
  const tasks = filteredTasks.value
  let next = currentIdx.value + 1
  // 跳过被锁定的任务
  while (next < tasks.length && isTaskLocked(tasks[next])) {
    next++
  }
  if (next >= tasks.length) {
    ElMessage.info('💡 请先完成当前任务')
    return
  }
  currentIdx.value = next
  updateTask()
}

function toggleTag(tag) {
  tagFilter.value = tagFilter.value === tag ? '' : tag
  currentIdx.value = 0
  updateTask()
}

function updateTask() {
  let idx = currentIdx.value
  const tasks = filteredTasks.value
  // 如果当前任务被锁定，跳到下一个可用的
  while (idx < tasks.length && isTaskLocked(tasks[idx])) {
    idx++
  }
  if (idx >= tasks.length) idx = currentIdx.value // 没有可用的，回退到原位置
  currentIdx.value = idx
  const t = tasks[idx]
  if (t) {
    localStorage.setItem('tutorial_task', JSON.stringify(t))
    task.value = t
    currentDocIdx.value = 0
  }
}

function goFlowChart() {
  router.push({ name: 'BusinessFlowChart' })
}

function goAchievements() {
  router.push({ name: 'AchievementSystem' })
}

function goTaxFiling() {
  router.push({ name: 'TaxFiling' })
}

function close() {
  minimized.value = true
}

function startDrag(e) {
  if (e.target.closest('.floater-actions') || e.target.closest('.floater-footer') || e.target.closest('.resize-handle')) return
  dragging.value = true
  dragOffset.x = e.clientX - posX.value
  dragOffset.y = e.clientY - posY.value
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
}

function onDrag(e) {
  if (!dragging.value) return
  posX.value = e.clientX - dragOffset.x
  posY.value = e.clientY - dragOffset.y
}

function stopDrag() {
  dragging.value = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
}

function startResize(e) {
  resizing.value = true
  document.addEventListener('mousemove', onResize)
  document.addEventListener('mouseup', stopResize)
}
function onResize(e) {
  if (!resizing.value) return
  floaterW.value = Math.max(250, e.clientX - posX.value)
  floaterH.value = Math.max(200, e.clientY - posY.value)
}
function stopResize() {
  resizing.value = false
  document.removeEventListener('mousemove', onResize)
  document.removeEventListener('mouseup', stopResize)
}

const storageListener = () => loadTask()
const taskUpdatedListener = () => loadTask()
onMounted(() => {
  loadTask()
  window.addEventListener('storage', storageListener)
  window.addEventListener('task-updated', taskUpdatedListener)
})
onUnmounted(() => {
  window.removeEventListener('storage', storageListener)
  window.removeEventListener('task-updated', taskUpdatedListener)
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
})
</script>

<style scoped>
.tutorial-floater { position: relative; display: flex; flex-direction: column; font-size: clamp(11px, 1vw, 15px);
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.12);
  font-size: 13px;
  overflow: hidden;
  user-select: none;
}
.floater-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #409eff;
  color: #fff;
  cursor: grab;
}
.floater-title { font-weight: 600; font-size: 13px; }
.floater-search {
  width: 100px !important;
  margin: 0 6px;
  transition: width 0.3s ease;
}
.floater-search:focus-within {
  width: 160px !important;
}
.floater-search :deep(.el-input__wrapper) {
  background: rgba(255,255,255,0.2) !important;
  border-radius: 4px !important;
  box-shadow: none !important;
  padding: 0 8px !important;
}
.floater-search :deep(.el-input__inner) {
  color: #fff !important;
  font-size: 12px !important;
  height: 26px !important;
}
.floater-search :deep(.el-input__inner::placeholder) {
  color: rgba(255,255,255,0.6) !important;
}
.floater-search :deep(.el-input__clear) {
  color: rgba(255,255,255,0.6) !important;
}
.floater-actions { display: flex; align-items: center; gap: 4px; }
.task-counter { font-size: 11px; opacity: 0.8; }
.floater-date { padding: 6px 12px; font-size: 12px; color: #606266; background: #f8f9fb; border-bottom: 1px solid #eee; display:flex; justify-content:space-between; align-items:center; gap:8px; }
.month-bar { display:flex; align-items:center; gap:6px; padding:4px 12px; background:#fff; border-bottom:1px solid #f0f0f0; font-size:11px; }
.month-badge { background:#409eff; color:#fff; padding:1px 8px; border-radius:10px; font-weight:600; letter-spacing:1px; }
.current-role-badge { background:#e6a23c; color:#fff; padding:1px 6px; border-radius:10px; font-size:10px; font-weight:500; }
.month-progress { color:#67c23a; font-weight:600; min-width:30px; text-align:right; }
.month-remaining { color:#e6a23c; font-size:10px; background:#fdf6ec; padding:0 6px; border-radius:8px; line-height:16px; }
.overall-progress { color:#909399; font-size:10px; min-width:36px; text-align:right; }
.mode-switch { display:flex; justify-content:center; padding:8px 12px 4px; border-bottom:1px solid #f0f0f0; }
.mode-switch :deep(.el-radio-button__inner) { font-size:12px; padding:4px 10px; }
.floater-body { padding: 10px 12px; flex: 1 1 auto; overflow-y: auto; min-height: 60px; }
.step-guide { background:#f0f9ff; border:1px solid #b3d8ff; border-radius:6px; padding:8px 10px; margin-bottom:8px; display:flex; gap:6px; align-items:center; flex-wrap:wrap; font-size:11px; }
.step { color:#bbb; padding:2px 6px; border-radius:4px; white-space:nowrap; }
.step-done { color:#67c23a; background:#f0f9eb; }
.step-active { color:#409eff; background:#ecf5ff; font-weight:600; }
.step-guide-text { color:#909399; font-size:11px; width:100%; margin-top:2px; padding-left:4px; }
.month-complete-banner { background:#f0f9eb; border:1px solid #b7eb8f; border-radius:6px; padding:10px; margin-bottom:8px; display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
.mc-icon { font-size:20px; }
.mc-text { flex:1; font-size:12px; line-height:1.4; }
.mc-text span { display:block; color:#606266; }
.mc-actions { display:flex; gap:4px; }
.voucher-doc { margin-bottom: 8px; }
.doc-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
.doc-title { font-size: 12px; font-weight: 600; color: #303133; }
.doc-content { padding: 0; }
.doc-preview { margin-top:8px; }
.doc-filter { display:flex; gap:4px; margin-bottom:6px; flex-wrap:wrap; }
.thumb-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(90px,1fr)); gap:5px; }
.thumb-card { background:#fafafa; border:2px solid #eee; border-radius:5px; padding:6px 4px; cursor:pointer; text-align:center; transition:all 0.15s; position:relative; }
.thumb-card:hover { border-color:#409eff; background:#f0f7ff; }
.thumb-card.active { border-color:#409eff; background:#ecf5ff; }
.thumb-icon { font-size:18px; line-height:1.1; margin-bottom:1px; }
.thumb-label { font-size:10px; color:#303133; font-weight:500; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.thumb-tag-row { margin:1px 0; line-height:1; }
.thumb-tag-row :deep(.el-tag) { font-size:8px; padding:0 3px; height:14px; line-height:14px; border:none; }
.thumb-amount { font-size:9px; color:#303133; font-weight:600; font-family:monospace; }
.thumb-amount.dim { color:#bbb; font-weight:400; font-size:8px; }
.thumb-check { position:absolute; top:1px; right:3px; color:#409eff; font-weight:700; font-size:12px; }

/* ─── 灯箱大图 ─── */
.lightbox-overlay { position:fixed; inset:0; z-index:99999; background:rgba(0,0,0,0.75); display:flex; flex-direction:column; }
.lightbox-header { display:flex; justify-content:space-between; align-items:center; padding:10px 16px; color:#fff; }
.lightbox-title { font-size:14px; }
.lightbox-actions { display:flex; align-items:center; gap:2px; }
.lightbox-body { flex:1; overflow:auto; display:flex; justify-content:center; padding:20px 40px 40px; }
.lightbox-doc { transform:scale(1.3); transform-origin:top center; }
.tip-section { margin-top: 6px; }
.tip-text { font-size: 12px; color: #909399; line-height: 1.5; padding: 6px; background: #f8f9fb; border-radius: 4px; }
.floater-footer { display: flex; gap: 8px; padding: 8px 12px; border-top: 1px solid #eee; justify-content: flex-end; flex-shrink: 0; }
.resize-handle { position: absolute; bottom: 0; right: 0; width: 20px; height: 20px; cursor: se-resize; font-size: 14px; line-height: 20px; text-align: center; color: #ccc; user-select: none; }
.floater-badge { position: fixed; top: 80px; right: 10px; z-index: 9999; width: 40px; height: 40px; background: #409eff; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; cursor: pointer; box-shadow: 0 2px 12px rgba(64,158,255,0.4); }
.floater-badge:hover { transform: scale(1.1); }
.resize-handle:hover { color: #409eff; }

/* ─── 答案弹窗 ─── */
.answer-entry { background:#f8f9fb; border:1px solid #ebeef5; border-radius:6px; padding:10px 12px; margin-bottom:8px; }
.answer-header { display:flex; align-items:center; gap:8px; flex-wrap:wrap; font-size:13px; }
.answer-num { background:#409eff; color:#fff; padding:0 6px; border-radius:3px; font-size:11px; font-weight:600; }
.answer-subject { font-family:monospace; font-weight:600; color:#303133; }
.answer-summary { color:#606266; font-size:12px; }
.answer-amount { margin-left:auto; display:flex; gap:6px; }
.amount-debit { color:#e6a23c; font-weight:600; font-family:monospace; }
.amount-credit { color:#67c23a; font-weight:600; font-family:monospace; }
.answer-explain { margin-top:6px; padding:6px 8px; background:#fff; border-left:3px solid #409eff; border-radius:3px; font-size:12px; color:#303133; line-height:1.6; }

/* ─── 错题本 ─── */
:deep(.wrong-item) { background:#fff6f0; border:1px solid #fce4d6; border-radius:6px; padding:10px 12px; margin-bottom:8px; }
:deep(.wrong-header) { display:flex; align-items:center; gap:8px; flex-wrap:wrap; font-size:13px; }
:deep(.wrong-date) { color:#909399; font-family:monospace; font-size:11px; }
:deep(.wrong-title) { font-weight:600; color:#303133; flex:1; }
:deep(.wrong-badge) { background:#e6a23c; color:#fff; font-size:10px; padding:0 6px; border-radius:8px; line-height:18px; }
:deep(.wrong-errors) { margin-top:6px; }
:deep(.wrong-error-line) { font-size:12px; color:#c05a3e; line-height:1.6; padding:1px 0; }
:deep(.wrong-footer) { text-align:center; margin-top:8px; padding-top:8px; border-top:1px solid #eee; }

/* 错题强化推送 */
.weak-tag-bar { padding:4px 10px; background:#fff2f0; border-bottom:1px solid #ffccc7; display:flex; align-items:center; gap:4px; flex-wrap:wrap; font-size:11px; }
.weak-tag-icon { font-size:12px; }
.weak-tag-text { color:#c05a3e; font-weight:600; font-size:11px; }
.weak-tag-hint { color:#999; font-size:10px; margin-left:2px; }

/* 标签筛选 */
.tag-filter-bar { padding: 4px 4px; border-bottom: 1px solid #f0f0f0; }
.tag-scroll { width: 100%; }
.tag-scroll-wrap { overflow-x: auto !important; white-space: nowrap; }
.tag-scroll-inner { display: flex; align-items: center; gap: 4px; padding: 2px 4px; }
.tag-chip { flex-shrink: 0; cursor: pointer; font-size: 11px; }
.tag-filter-count { color: #909399; font-size: 10px; margin-left: 4px; flex-shrink: 0; }

/* 穿透 VoucherDisplay 子组件强制亮色 */
[data-theme="light"] :deep(.voucher-scroll),
[data-theme="light"] :deep(.voucher-wrapper) { background: #fff; }
[data-theme="light"] :deep(.voucher-paper) { background: #fefcf5 !important; }
[data-theme="light"] :deep(.doc-body) { background: #fff; }
[data-theme="light"] :deep(.doc-pre) { color: #303133; background: #fff; }
[data-theme="light"] :deep(.doc-signature) { color: #666; }
[data-theme="light"] :deep(.bank-table) { background: #fff; }
</style>

<!-- 浮动窗亮色主题 - 非scoped确保穿透到VoucherDisplay等子组件 -->
<style>
[data-theme="light"] .tutorial-floater,
[data-theme="light"] .floater-body,
[data-theme="light"] .voucher-doc,
[data-theme="light"] .doc-content,
[data-theme="light"] .doc-preview { background: #ffffff; }
[data-theme="light"] .floater-header { background: #f5f7fa; border-bottom: 1px solid #e4e7ed; }
[data-theme="light"] .month-bar { background: #f0f5ff; }
[data-theme="light"] .floater-title,
[data-theme="light"] .task-counter,
[data-theme="light"] .month-badge,
[data-theme="light"] .current-role-badge,
[data-theme="light"] .month-progress,
[data-theme="light"] .month-remaining,
[data-theme="light"] .overall-progress,
[data-theme="light"] .floater-date,
[data-theme="light"] .step-guide-text,
[data-theme="light"] .step { color: #303133; }
[data-theme="light"] .floater-date span { color: #303133; }
[data-theme="light"] .mode-switch { background: #fff; padding: 4px; }
[data-theme="light"] .tag-filter-bar { background: #fff; }
[data-theme="light"] .step-guide { background: #f0f9eb; border-color: #e1f3d8; }
[data-theme="light"] .doc-header { background: #f5f7fa; border-bottom: 1px solid #e4e7ed; }
[data-theme="light"] .doc-title { color: #303133; }
[data-theme="light"] .doc-filter { background: #fff; }
[data-theme="light"] .doc-body { background: #fff; }
[data-theme="light"] .doc-body .doc-pre { color: #303133; background: #fff; }
[data-theme="light"] .doc-signature { color: #666; }
[data-theme="light"] .thumb-card { background: #f5f7fa; border-color: #e4e7ed; }
[data-theme="light"] .thumb-card.active { background: #e6f0ff; border-color: #409eff; }
[data-theme="light"] .thumb-label { color: #303133; }
[data-theme="light"] .thumb-amount { color: #e6a23c; }
[data-theme="light"] .thumb-icon { color: #606266; }
[data-theme="light"] .doc-filter .el-tag { background: #f0f2f5 !important; border-color: #d9d9d9 !important; color: #606266 !important; }
[data-theme="light"] .doc-filter .el-tag--primary { background: #ecf5ff !important; border-color: #d9ecff !important; color: #409eff !important; }
[data-theme="light"] .floater-footer { background: #f5f7fa; border-top: 1px solid #e4e7ed; }
[data-theme="light"] .tip-section .tip-text { background: #f8f9fb; color: #606266; }
[data-theme="light"] .weak-tag-bar { background: #fff7e6; }
[data-theme="light"] .weak-tag-text { color: #e6a23c; }
[data-theme="light"] .weak-tag-hint { color: #909399; }
[data-theme="light"] .month-complete-banner { background: #f0f9eb; border-color: #e1f3d8; }
[data-theme="light"] .month-complete-banner .mc-text { color: #303133; }
[data-theme="light"] .el-progress-bar__outer { background: #e8e8e8 !important; }
[data-theme="light"] .el-progress-bar__inner { background: #409eff !important; }
[data-theme="light"] .floater-header .el-button,
[data-theme="light"] .floater-actions .el-button { color: #606266 !important; }
[data-theme="light"] .floater-header .el-button--primary.is-text,
[data-theme="light"] .floater-header .el-button--primary.is-link,
[data-theme="light"] .floater-actions .el-button--primary.is-text { color: #409eff !important; }
</style>
