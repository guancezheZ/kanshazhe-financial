<template>
  <div class="page">
    <div class="page-header">
      <div class="header-left">
        <h2 class="page-title">📊 教学中心</h2>
        <span class="page-subtitle">観測者企业财务模拟系统</span>
        <el-tag v-if="currentRole === 'cashier'" type="warning" size="small" style="margin-left:12px">💰 出纳视角</el-tag>
        <el-tag v-else-if="currentRole === 'supervisor'" type="danger" size="small" style="margin-left:12px">🔑 主管视角</el-tag>
        <el-tag v-else type="primary" size="small" style="margin-left:12px">👤 会计视角</el-tag>
        <!-- 声望等级显示 -->
        <div class="rank-display-header">
          <span class="rank-icon">{{ rankInfo.icon }}</span>
          <span class="rank-title">{{ rankInfo.title }}</span>
          <span class="rank-level">Lv.{{ rankInfo.level }}</span>
        </div>
        <!-- 场景选择器 -->
        <span style="margin:0 4px;color:#d0d0d0;">|</span>
        <el-dropdown size="small" @command="handleScenarioChange" trigger="click">
          <el-tag type="success" size="small" style="cursor:pointer;margin-left:0;border:none">
            {{ currentScenario.icon }} {{ currentScenario.label }}
            <span style="font-size:10px;margin-left:2px;">▼</span>
          </el-tag>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="s in scenarios" :key="s.id"
                :command="s.id"
                :disabled="s.comingSoon"
                :class="{ 'is-selected': s.id === currentScenarioId }"
              >
                {{ s.icon }} {{ s.label }}
                <span v-if="s.comingSoon" style="color:#909399;font-size:10px;margin-left:6px">即将推出</span>
                <span v-else-if="s.id === currentScenarioId" style="color:#67c23a;margin-left:6px">✓</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="page-actions">
        <el-button v-if="hasIncomplete" size="small" type="primary" @click="continueLearning">
          ▶ 继续学习
        </el-button>
        <el-button size="small" @click="router.push({ name: 'BusinessFlowChart' })">
          📊 全景图
        </el-button>
        <el-button size="small" type="warning" plain @click="router.push({ name: 'AchievementSystem' })">
          🏅 成就
        </el-button>
        <el-button size="small" type="danger" plain @click="router.push({ name: 'TaxFiling' })">
          🧾 报税
        </el-button>
        <el-tooltip content="自由练习：不记进度、不给XP、不过账、可重复做" placement="bottom" :show-after="300">
          <el-button
            size="small"
            :type="store.isPracticeMode() ? 'warning' : 'default'"
            :icon="store.isPracticeMode() ? 'StarFilled' : 'Star'"
            plain
            @click="store.togglePracticeMode()"
          >
            {{ store.isPracticeMode() ? '🎯 自由练习中' : '📚 按课程学' }}
          </el-button>
        </el-tooltip>
        <el-button size="small" type="danger" plain @click="resetProgress">
          🔄 重置进度
        </el-button>
        <el-input
          v-model="searchQuery"
          placeholder="🔍 搜索任务..."
          size="small"
          clearable
          class="search-input"
          @clear="searchQuery = ''"
        />
      </div>
    </div>

    <!-- 搜索结果显示 -->
    <div v-if="searchQuery" class="search-results-panel">
      <div class="search-results-header">
        🔍 搜索结果：找到 <strong>{{ searchResults.length }}</strong> 个匹配任务
        <el-button text size="small" type="primary" @click="searchQuery = ''">✕ 关闭搜索</el-button>
      </div>
      <div v-if="searchResults.length === 0" class="search-results-empty">
        没有找到与 "<strong>{{ searchQuery }}</strong>" 相关的任务
      </div>
      <div v-else class="search-results-grid">
        <div
          v-for="(task, idx) in searchResults"
          :key="task.date + task.title + idx"
          class="search-result-card"
          @click="goToSearchResult(task)"
        >
          <div class="search-result-month">{{ monthLabel(task.month) }}</div>
          <div class="search-result-body">
            <div class="search-result-title">
              {{ task.title }}
              <el-tag v-if="task.role && task.role !== 'accountant'"
                :type="roleTagType(task.role)" size="small" effect="plain">{{ roleLabel(task.role) }}</el-tag>
            </div>
            <div class="search-result-desc">
              📅 {{ task.date }} · {{ task.description?.slice(0, 60) }}{{ task.description?.length > 60 ? '…' : '' }}
            </div>
            <div class="search-result-tags">
              <el-tag v-for="tag in visibleTags(task)" :key="tag" size="small" type="info" effect="plain">{{ tag }}</el-tag>
            </div>
          </div>
          <div class="search-result-action">
            <el-tag v-if="isCompleted(task)" type="success" size="small">✅ 已完成</el-tag>
            <el-tag v-else type="warning" size="small">⏳ 待完成</el-tag>
          </div>
        </div>
      </div>
    </div>

    <!-- 总体进度概览卡片 -->
    <div class="stats-row">
      <div class="stat-card stat-card--success">
        <div class="stat-value">{{ overallStats.done }}</div>
        <div class="stat-label">✅ 已完成</div>
      </div>
      <div class="stat-card stat-card--warning">
        <div class="stat-value">{{ overallStats.remaining }}</div>
        <div class="stat-label">⏳ 待完成</div>
      </div>
      <div class="stat-card stat-card--primary">
        <div class="stat-value">{{ overallStats.total }}</div>
        <div class="stat-label">📋 总任务</div>
      </div>
      <div class="stat-card stat-card--accent">
        <div class="stat-value">{{ overallStats.percentage }}%</div>
        <div class="stat-label">📈 完成率</div>
      </div>
    </div>

    <!-- 总体进度条 -->
    <div class="overall-progress-bar">
      <el-progress
        :percentage="overallStats.percentage"
        :stroke-width="12"
        :color="overallStats.percentage === 100 ? '#67c23a' : '#409eff'"
        :format="overallFormat"
        striped
        striped-flow
      />
    </div>

    <!-- 难度筛选 -->
    <div class="tag-filter-section">
      <div class="tag-filter-header">
        <span class="tag-filter-title">⭐ 难度筛选</span>
        <span v-if="activeDifficulty" class="tag-filter-hint">
          难度：<strong>{{ difficultyLabel(activeDifficulty) }}</strong>
          （{{ difficultyStats[activeDifficulty]?.done || 0 }}/{{ difficultyStats[activeDifficulty]?.total || 0 }} 已完成）
          <el-button text size="small" type="primary" @click="activeDifficulty = 0">清除筛选</el-button>
        </span>
      </div>
      <div class="tag-filter-buttons">
        <el-button
          v-for="d in [1, 2, 3]"
          :key="d"
          :type="activeDifficulty === d ? 'primary' : 'default'"
          size="small"
          :class="{ 'tag-btn-done': difficultyStats[d]?.done > 0 && difficultyStats[d]?.done === difficultyStats[d]?.total }"
          @click="activeDifficulty = activeDifficulty === d ? 0 : d"
        >
          <span class="difficulty-stars" style="font-size:13px">
            <span v-for="i in 3" :key="i" :class="i <= d ? 'star-filled' : 'star-empty'">★</span>
          </span>
          <span class="tag-count">{{ difficultyStats[d]?.done || 0 }}/{{ difficultyStats[d]?.total || 0 }}</span>
        </el-button>
        <el-button size="small" type="info" plain @click="activeDifficulty = 0" :disabled="!activeDifficulty">
          📋 全部
        </el-button>
      </div>
    </div>

    <!-- 知识点标签筛选 -->
    <div class="tag-filter-section">
      <div class="tag-filter-header">
        <span class="tag-filter-title">🏷️ 知识点筛选</span>
        <span v-if="activeTag" class="tag-filter-hint">
          筛选：<strong>{{ tagLabel(activeTag) }}</strong>
          （{{ tagStats.find(t => t.tag === activeTag)?.done || 0 }}/{{ tagStats.find(t => t.tag === activeTag)?.total || 0 }} 已完成）
          <el-button text size="small" type="primary" @click="activeTag = ''">清除筛选</el-button>
        </span>
      </div>
      <el-scrollbar class="tag-scrollbar" wrap-class="tag-scroll-wrap">
        <div class="tag-filter-buttons">
          <el-button
            v-for="tag in tagStats"
            :key="tag.tag"
            :type="activeTag === tag.tag ? 'primary' : 'default'"
            :icon="tagIcon(tag.tag)"
            size="small"
            class="tag-btn"
            :class="{ 'tag-btn-done': tag.done > 0 && tag.done === tag.total }"
            @click="activeTag = activeTag === tag.tag ? '' : tag.tag"
          >
            {{ tagLabel(tag.tag) }}
            <span class="tag-count">{{ tag.done }}/{{ tag.total }}</span>
          </el-button>
        </div>
      </el-scrollbar>
    </div>

    <!-- 月份学习进度 -->
    <el-card shadow="never">
      <el-tabs v-model="activeMonth" @tab-change="onTabChange">
        <el-tab-pane
          v-for="m in monthStats"
          :key="m.value"
          :name="m.value"
        >
          <template #label>
            <span class="tab-label">
              <span>{{ m.shortLabel }}</span>
              <el-tag
                v-if="m.total > 0 && m.done === m.total"
                size="small"
                type="success"
                effect="dark"
                class="tab-tag"
              >{{ m.done }}/{{ m.total }}</el-tag>
              <el-tag
                v-else-if="m.total > 0 && m.done > 0"
                size="small"
                type="warning"
                effect="plain"
                class="tab-tag"
              >{{ m.done }}/{{ m.total }}</el-tag>
              <el-tag
                v-else-if="m.total > 0"
                size="small"
                type="info"
                effect="plain"
                class="tab-tag"
              >0/{{ m.total }}</el-tag>
            </span>
          </template>

          <!-- 本月进度条 -->
          <div v-if="currentMonthStats.total > 0" class="month-progress-section">
            <div class="month-progress-info">
              <span class="month-progress-label">📅 {{ currentMonthStats.shortLabel }}学习进度</span>
              <span class="month-progress-text">
                已完成 <strong>{{ currentMonthStats.done }}</strong> / {{ currentMonthStats.total }} 个任务
                <span v-if="currentMonthStats.done === currentMonthStats.total" class="month-done-badge">🎉 全部完成！</span>
                <span v-else-if="currentMonthStats.done > 0" class="month-remain-badge">⏳ 剩余 {{ currentMonthStats.remaining }}</span>
                <span v-else class="month-remain-badge">⬜ 尚未开始</span>
              </span>
            </div>
            <el-progress
              :percentage="currentMonthStats.percentage"
              :stroke-width="8"
              :color="currentMonthStats.done === currentMonthStats.total ? '#67c23a' : '#409eff'"
              striped
              striped-flow
            />
          </div>
          <div v-else class="month-progress-section month-progress-empty">
            <span class="month-empty-text">📭 该月暂无教学数据</span>
          </div>

          <!-- 任务列表表格 -->
          <el-table
            :data="filteredTasks"
            border
            stripe
            size="small"
            empty-text="该月暂无教学任务"
            style="margin-top:12px"
            :key="activeTag + '_' + activeDifficulty + '_' + tick"
          >
            <el-table-column label="日期" width="110" prop="date" />
            <el-table-column label="业务内容" min-width="220" prop="title">
              <template #default="{ row }">
                <div class="task-title-cell">
                  <span>{{ row.title }}</span>
                  <el-tag
                    v-if="row.role && row.role !== 'accountant'"
                    :type="roleTagType(row.role)"
                    size="small"
                    effect="plain"
                    class="role-tag"
                  >{{ roleLabel(row.role) }}</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="难度" width="90" align="center">
              <template #default="{ row }">
                <span class="difficulty-stars">
                  <span v-for="i in 3" :key="i"
                    :class="i <= (row.difficulty || 1) ? 'star-filled' : 'star-empty'">★</span>
                </span>
              </template>
            </el-table-column>
            <el-table-column label="知识点" width="160">
              <template #default="{ row }">
                <div class="tag-cell">
                  <el-tag
                    v-for="tag in visibleTags(row)"
                    :key="tag"
                    :type="activeTag === tag ? 'primary' : 'info'"
                    size="small"
                    effect="plain"
                    class="tag-badge"
                    @click="activeTag = activeTag === tag ? '' : tag"
                    style="cursor:pointer"
                  >{{ tagLabel(tag) }}</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="100">
              <template #default="{ row }">
                <el-tag v-if="isCompleted(row)" type="success" size="small" effect="dark">✅ 已完成</el-tag>
                <el-tag v-else type="warning" size="small" effect="plain">⏳ 待完成</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="140">
              <template #default="{ row }">
                <el-button
                  v-if="row.entries.length > 0"
                  size="small"
                  type="primary"
                  @click="startTask(row)"
                >开始做</el-button>
                <el-button
                  v-else
                  size="small"
                  @click="showTip(row)"
                >查看提示</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!-- 教学提示对话框 -->
    <el-dialog v-model="tipVisible" :title="tipTitle" width="600">
      <div class="tip-content">{{ tipContent }}</div>
      <template #footer>
        <el-button type="primary" @click="tipVisible = false">知道了</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/stores/store.js'
import { calcLevel } from '@/data/xp-system.js'
import { ElMessageBox, ElMessage } from 'element-plus'
import { SCENARIOS, getScenarioConfig, setCurrentScenarioId, getScenarioTutorials, getProgressKey, getScenarioTags, getDoneKeyPrefix, getTagStatsKey, getStreakKey } from '@/data/scenarios.js'

const router = useRouter()
const store = useStore()

const activeMonth = ref('01')
const tasks = ref([])
const searchQuery = ref('')
const tipVisible = ref(false)
const tipTitle = ref('')
const tipContent = ref('')
const tick = ref(0)  // 响应式计数器，强制刷新完成状态
const activeTag = ref('')  // 当前筛选的知识点标签
const activeDifficulty = ref(0)  // 当前筛选的难度（0=全部）
const currentRole = computed(() => store.getCurrentRole())

// 声望等级
const rankInfo = computed(() => {
  try { return store.getLevelInfo() }
  catch { return calcLevel(0) }
})

const currentScenarioId = ref(localStorage.getItem('jd_scenario') || 'manufacturing')
const currentScenario = computed(() => getScenarioConfig(currentScenarioId.value))
const scenarios = SCENARIOS

// 按当前角色筛选任务
function filterByRole(tasks) {
  const role = currentRole.value
  if (role === 'supervisor') return tasks
  if (role === 'cashier') return tasks.filter(t => t.role === 'cashier')
  // accountant（默认）：显示无角色标记的会计任务，或有 accountant/supervisor 角色的任务
  return tasks.filter(t => !t.role || t.role === 'accountant' || t.role === 'supervisor')
}

// 获取某月任务并过滤角色
function getMonthTasks(m) {
  return filterByRole(getScenarioTutorials(currentScenarioId.value, m))
}

// 监听store角色变化，刷新数据
watch([currentRole, currentScenarioId], () => {
  window.dispatchEvent(new CustomEvent('task-updated'))
  const stats = monthStats.value
  const firstNonEmpty = stats.find(s => s.total > 0)
  if (firstNonEmpty) activeMonth.value = firstNonEmpty.value
  tick.value++
  // 角色/场景变化时重新加载当月任务列表
  loadTasks()
})

// 场景感知的月份列表（使用getter以保持响应式）
function getScenarioMonths() {
  return getScenarioConfig(currentScenarioId.value)?.months || []
}
function getScenarioMonthLabels() {
  return getScenarioConfig(currentScenarioId.value)?.monthLabels || []
}

function monthLabel(m) {
  const labels = getScenarioMonthLabels()
  return labels[parseInt(m) - 1] || m + '月'
}

// ─── 搜索 ───
const searchResults = computed(() => {
  if (!searchQuery.value) return []
  const q = searchQuery.value.toLowerCase()
  const months = getScenarioMonths()
  const allTasks = []
  months.forEach(m => {
    const monthTasks = getScenarioTutorials(currentScenarioId.value, m)
    monthTasks.forEach(t => {
      if (filterByRole([t]).length > 0) {
        allTasks.push({ ...t, month: m })
      }
    })
  })
  return allTasks.filter(t =>
    t.title.toLowerCase().includes(q) ||
    (t.description && t.description.toLowerCase().includes(q)) ||
    (t.tags && t.tags.some(tag => tag.toLowerCase().includes(q)))
  )
})

function highlightMatch(text, query) {
  if (!text || !query) return text || ''
  const q = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const re = new RegExp(`(${q})`, 'gi')
  return text.replace(re, '<mark style="background:#ffd54f;padding:0 2px;border-radius:2px">$1</mark>')
}

function goToSearchResult(task) {
  // 切换到该任务所在月份
  activeMonth.value = task.month
  searchQuery.value = ''
  // 延时等月份切换完成后再滚动到该任务
  setTimeout(() => {
    const tableRows = document.querySelectorAll('.el-table__body-wrapper .el-table__body tr')
    for (const row of tableRows) {
      if (row.textContent.includes(task.title)) {
        row.scrollIntoView({ behavior: 'smooth', block: 'center' })
        row.style.background = '#fff3cd'
        setTimeout(() => { row.style.background = '' }, 2000)
        break
      }
    }
  }, 300)
}

// 场景感知标签图标映射（通用图标库，覆盖全部场景）
const TAG_ICONS = {
  '出纳': '💰', '采购': '📦', '销售': '🤝', '费用': '💳', '工资社保': '👷',
  '税费': '🏛️', '资产': '🏗️', '成本核算': '📐', '融资': '🏦', '期末': '📊',
  '采购管理': '📦', '销售管理': '🤝', '仓存管理': '📦', '资金管理': '💰',
  '往来管理': '🤝', '固定资产': '🏗️',
}

function getTags() {
  return getScenarioTags(currentScenarioId.value).map(tag => ({
    tag,
    label: tag,
    icon: TAG_ICONS[tag] || '🏷️',
  }))
}

function tagLabel(tag) { return tag }
function tagIcon(tag) { return TAG_ICONS[tag] || '🏷️' }

// ─── 工具函数 ───

// 按角色显示可见标签：非出纳角色不显示"出纳"标签
function visibleTags(task) {
  const tags = task.tags || []
  if (currentRole.value === 'cashier') return tags
  return tags.filter(t => t !== '出纳')
}

function roleLabel(roleId) {
  return { cashier: '出纳', accountant: '会计', supervisor: '主管' }[roleId] || roleId
}
function roleTagType(roleId) {
  return { cashier: 'warning', accountant: 'primary', supervisor: 'danger' }[roleId] || 'info'
}

function difficultyStars(level) {
  return '★'.repeat(level) + '★'.repeat(3 - level)
}
function difficultyLabel(level) {
  const labels = { 1: '简单', 2: '中等', 3: '复杂' }
  return labels[level] || level
}

function isCompleted(task) {
  void tick.value
  const key = getProgressKey(currentScenarioId.value, task.date, task.title)
  return localStorage.getItem(key) === 'true'
}

// ─── 计算各月统计 ───

const monthStats = computed(() => {
  const months = getScenarioMonths()
  const labels = getScenarioMonthLabels()
  return months.map((m, i) => {
    const monthTasks = getMonthTasks(m)
    const total = monthTasks.length
    const done = monthTasks.filter(t => isCompleted(t)).length
    return {
      value: m,
      shortLabel: labels[i] || m + '月',
      total,
      done,
      remaining: total - done,
      percentage: total > 0 ? Math.round(done / total * 100) : 0,
    }
  })
})

const overallStats = computed(() => {
  const total = monthStats.value.reduce((s, m) => s + m.total, 0)
  const done = monthStats.value.reduce((s, m) => s + m.done, 0)
  const percentage = total > 0 ? Math.round(done / total * 100) : 0
  return { total, done, remaining: total - done, percentage }
})

const currentMonthStats = computed(() => {
  return monthStats.value.find(m => m.value === activeMonth.value) || { shortLabel: '', total: 0, done: 0, remaining: 0, percentage: 0 }
})

const hasIncomplete = computed(() => overallStats.value.remaining > 0)

function overallFormat(p) {
  return `${overallStats.value.done}/${overallStats.value.total} (${p}%)`
}

// ─── 难度统计 ───

const difficultyStats = computed(() => {
  const stats = { 1: { total: 0, done: 0 }, 2: { total: 0, done: 0 }, 3: { total: 0, done: 0 } }
  for (const m of getScenarioMonths()) {
    const monthTasks = getMonthTasks(m)
    for (const t of monthTasks) {
      const d = t.difficulty || 1
      if (!stats[d]) stats[d] = { total: 0, done: 0 }
      stats[d].total++
      if (isCompleted(t)) stats[d].done++
    }
  }
  return stats
})

// ─── 知识点标签统计 ───

const tagStats = computed(() => {
  const role = currentRole.value
  const tags = getTags()
  return tags.map(({ tag }) => {
    // 非出纳角色不显示"出纳"知识点（会计任务中的出纳标签是历史遗留）
    if (tag === '出纳' && role !== 'cashier') return { tag, total: 0, done: 0, remaining: 0 }
    let total = 0, done = 0
    for (const m of getScenarioMonths()) {
      const monthTasks = getMonthTasks(m)
      for (const t of monthTasks) {
        if (t.tags && t.tags.includes(tag)) {
          total++
          if (isCompleted(t)) done++
        }
      }
    }
    return { tag, total, done, remaining: total - done }
  }).filter(t => t.total > 0)
})

// ─── 筛选后的任务列表 ───

const filteredTasks = computed(() => {
  void tick.value
  let list = tasks.value
  if (activeDifficulty.value > 0) {
    list = list.filter(t => (t.difficulty || 1) === activeDifficulty.value)
  }
  if (activeTag.value) {
    list = list.filter(t => t.tags && t.tags.includes(activeTag.value))
  }
  return list
})

// ─── 加载任务列表 ───

function loadTasks() {
  void tick.value
  const raw = getMonthTasks(activeMonth.value)
  // 按日期排序，解决出纳任务追加在月末导致的日期混乱
  tasks.value = [...raw].sort((a, b) => (a.date || '').localeCompare(b.date || ''))
}

function onTabChange() {
  loadTasks()
}

// ─── 场景切换 ───
function handleScenarioChange(id) {
  if (id === currentScenarioId.value) return
  // 切换场景数据（保存当前、加载目标）
  store.switchScenarioState(id)
  currentScenarioId.value = id
  // 重置筛选并刷新
  activeTag.value = ''
  activeDifficulty.value = 0
  activeMonth.value = '01'
  searchQuery.value = ''
  loadTasks()
  window.dispatchEvent(new CustomEvent('task-updated'))
  ElMessage.success(`已切换到「${currentScenario.value.label}」场景`)
}

// ─── 继续学习：找到第一个未完成的任务并跳转 ───

function continueLearning() {
  for (const m of monthStats.value) {
    if (m.total === 0 || m.done === m.total) continue
    const monthTasks = getMonthTasks(m.value)
    for (const task of monthTasks) {
      if (!isCompleted(task)) {
        // 有分录 → 设任务，浮动窗自动弹出，用户通过浮动窗选模式
        if (task.entries.length > 0) {
          localStorage.setItem('tutorial_task', JSON.stringify({
            date: task.date,
            title: task.title,
            description: task.description,
            tip: task.tip,
            entries: task.entries,
            documents: task.documents || [],
          }))
          if (!localStorage.getItem('tutorial_mode')) localStorage.setItem('tutorial_mode', 'practice')
          activeMonth.value = m.value
          window.dispatchEvent(new CustomEvent('task-updated'))
          ElMessage.success('📋 任务已加载，请使用右侧浮动窗查看并选择模式')
          return
        }
        // 无分录 → 弹提示说明
        tipTitle.value = task.title
        tipContent.value = `该任务无需录入凭证：\n\n${task.description}\n\n${task.tip || ''}`
        tipVisible.value = true
        return
      }
    }
  }
  // 全部完成
  tipTitle.value = '🎉 全部完成！'
  tipContent.value = '恭喜！你已经完成了所有教学任务！'
  tipVisible.value = true
}

// ─── 开始任务 ───

function startTask(task) {
  localStorage.setItem('tutorial_task', JSON.stringify({
    date: task.date,
    title: task.title,
    description: task.description,
    tip: task.tip,
    entries: task.entries,
    documents: task.documents || [],
    role: task.role,
    _scenario: currentScenarioId.value,
  }))
  if (!localStorage.getItem('tutorial_mode')) localStorage.setItem('tutorial_mode', 'practice')
  window.dispatchEvent(new CustomEvent('task-updated'))
  ElMessage.success('📋 任务已加载，请使用右侧浮动窗查看并选择模式')
}

function showTip(row) {
  tipTitle.value = row.title
  tipContent.value = row.tip || '该任务无需录入凭证，请按说明操作。'
  tipVisible.value = true
}

// ─── 重置教学进度（仅当前角色+当前行业） ───

function resetProgress() {
  const scenarioLabel = currentScenario.value?.label || '当前'
  const roleLabel = { cashier: '出纳', accountant: '会计', supervisor: '主管' }[currentRole.value] || '当前角色'
  ElMessageBox.confirm(
    `重置「${roleLabel} → ${scenarioLabel}」教学进度将：<br>` +
    `① 清除「${roleLabel}」在本行业的已完成标记<br>` +
    `② 清除该场景的凭证和余额数据（工作台数据重置）<br>` +
    `③ 清除XP和经验等级数据<br>` +
    `④ 其他场景和角色的数据不受影响<br><br>` +
    `此操作不可撤销，确定要继续吗？`,
    `⚠️ 重置${roleLabel}教学进度`,
    { confirmButtonText: '确认重置', cancelButtonText: '取消', type: 'warning', dangerouslyUseHTMLString: true }
  ).then(() => {
    // 获取当前场景的所有任务
    const allTasks = []
    const months = currentScenario.value?.months || []
    for (const m of months) {
      const tasks = getScenarioTutorials(currentScenarioId.value, m)
      for (const t of tasks) { allTasks.push({ ...t, _month: m }) }
    }
    // 按当前角色过滤
    const role = currentRole.value
    const myTasks = role === 'supervisor'
      ? allTasks
      : role === 'cashier'
        ? allTasks.filter(t => t.role === 'cashier')
        : allTasks.filter(t => !t.role || t.role === 'accountant' || t.role === 'supervisor')

    // 仅清除属于当前角色的已完成标记
    for (const t of myTasks) {
      const key = getProgressKey(currentScenarioId.value, t.date, t.title)
      localStorage.removeItem(key)
    }

    // ★ 重置工作台数据：重新初始化教学账套
    const sid = currentScenarioId.value
    if (sid === 'manufacturing') {
      store.initTeachingAccount()
    } else if (sid === 'commercial') {
      store.initCommercialAccount()
    } else if (sid === 'service') {
      store.initServiceAccount()
    } else if (sid === 'construction') {
      store.initConstructionAccount()
    }
    // 清除XP数据
    localStorage.removeItem('jd_xp_data')
    localStorage.removeItem('jd_achievements')
    // 清除旧tag stats
    Object.keys(localStorage).filter(k => k.includes('tag_stats')).forEach(k => localStorage.removeItem(k))

    tick.value++
    ElMessage.success(`✅ 已完全重置「${roleLabel} → ${scenarioLabel}」的教学进度和工作台数据`)
    loadTasks()
  }).catch(() => {})
}

onMounted(() => {
  loadTasks()
})
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
.header-left {
  display: flex;
  align-items: baseline;
  gap: 12px;
}
.page-title {
  font-size: 20px;
  color: #303133;
  margin: 0;
}
.page-subtitle {
  font-size: 13px;
  color: #909399;
}
.page-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

/* ─── 统计卡片 ─── */
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 16px;
}
.stat-card {
  background: #fff;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  padding: 16px 20px;
  text-align: center;
  transition: box-shadow 0.2s;
}
.stat-card:hover {
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}
.stat-card--success { border-left: 3px solid #67c23a; }
.stat-card--warning { border-left: 3px solid #e6a23c; }
.stat-card--primary { border-left: 3px solid #409eff; }
.stat-card--accent  { border-left: 3px solid #9b59b6; }
.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #303133;
  line-height: 1.2;
}
.stat-card--success .stat-value { color: #67c23a; }
.stat-card--warning .stat-value { color: #e6a23c; }
.stat-card--primary .stat-value { color: #409eff; }
.stat-card--accent .stat-value  { color: #9b59b6; }
.stat-label {
  font-size: 13px;
  color: #909399;
  margin-top: 4px;
}

/* ─── 总体进度条 ─── */
.overall-progress-bar {
  margin-bottom: 20px;
  padding: 0 2px;
}
.overall-progress-bar :deep(.el-progress-bar__outer) {
  background-color: #f0f0f0;
}

/* ─── Tab 标签 ─── */
.tab-label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
}
.tab-tag {
  font-size: 10px !important;
  height: 18px !important;
  line-height: 16px !important;
  padding: 0 5px !important;
  border: none !important;
}
.tab-tag.el-tag--success { background: #67c23a !important; color: #fff !important; }

/* ─── 月度进度区 ─── */
.month-progress-section {
  background: #f8f9fb;
  border: 1px solid #ebeef5;
  border-radius: 6px;
  padding: 12px 16px;
  margin-bottom: 4px;
}
.month-progress-empty {
  text-align: center;
  padding: 16px;
}
.month-empty-text {
  color: #c0c4cc;
  font-size: 13px;
}
.month-progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  flex-wrap: wrap;
  gap: 4px;
}
.month-progress-label {
  font-size: 13px;
  font-weight: 600;
  color: #303133;
}
.month-progress-text {
  font-size: 12px;
  color: #606266;
}
.month-done-badge {
  color: #67c23a;
  font-weight: 600;
  margin-left: 4px;
}
.month-remain-badge {
  color: #e6a23c;
  font-weight: 500;
  margin-left: 4px;
}

/* ─── 知识点标签筛选 ─── */
.tag-filter-section {
  margin-bottom: 16px;
}
.tag-filter-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}
.tag-filter-title {
  font-size: 13px;
  font-weight: 600;
  color: #303133;
}
.tag-filter-hint {
  font-size: 12px;
  color: #909399;
}
.tag-scrollbar { width: 100%; }
.tag-scroll-wrap { overflow-x: auto !important; white-space: nowrap; }
.tag-filter-buttons {
  display: flex;
  gap: 6px;
  padding: 2px 0;
}
.tag-btn { flex-shrink: 0; }
.tag-filter-buttons :deep(.el-button) {
  font-size: 12px;
  padding: 4px 10px;
}
.tag-btn-done {
  border-color: #67c23a;
}
.tag-count {
  margin-left: 3px;
  font-size: 10px;
  opacity: 0.7;
}

/* ─── 任务表格 ─── */
.task-title-cell {
  display: flex;
  align-items: center;
  gap: 6px;
}
.role-tag {
  font-size: 10px !important;
  height: 18px !important;
  line-height: 16px !important;
  padding: 0 5px !important;
}
.tag-cell {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
}
.tag-badge {
  font-size: 10px !important;
  height: 18px !important;
  line-height: 16px !important;
  padding: 0 5px !important;
}

.tip-content {
  white-space: pre-wrap;
  line-height: 1.8;
  font-size: 14px;
  color: #303133;
}

/* ─── 难度星级 ─── */
.difficulty-stars {
  font-size: 16px;
  letter-spacing: 2px;
  cursor: default;
  white-space: nowrap;
}
.star-filled { color: #f5a623; }
.star-empty { color: #d0d0d0; }

/* ─── 搜索输入框 ─── */
.search-input {
  width: 180px;
  transition: width 0.3s ease;
}
.search-input:focus-within {
  width: 240px;
}

/* ─── 搜索结果面板 ─── */
.search-results-panel {
  background: #fff;
  border: 1px solid #d9ecff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  max-height: 400px;
  overflow-y: auto;
  animation: fadeIn 0.3s ease;
}
.search-results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-size: 14px;
  color: #606266;
}
.search-results-empty {
  text-align: center;
  padding: 24px;
  color: #909399;
  font-size: 14px;
}
.search-results-grid {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.search-result-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border: 1px solid #ebeef5;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.search-result-card:hover {
  border-color: #409eff;
  background: #ecf5ff;
  transform: translateX(3px);
}
.search-result-month {
  background: #1a3a5c;
  color: #fff;
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  min-width: 48px;
  text-align: center;
}
.search-result-body {
  flex: 1;
  min-width: 0;
}
.search-result-title {
  font-size: 14px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 2px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.search-result-desc {
  font-size: 12px;
  color: #909399;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.search-result-tags {
  display: flex;
  gap: 3px;
  margin-top: 4px;
}
.search-result-tags :deep(.el-tag) {
  font-size: 10px !important;
  height: 18px !important;
  line-height: 16px !important;
  padding: 0 5px !important;
}
.search-result-action {
  flex-shrink: 0;
}

/* ─── 响应式 ─── */
@media (max-width: 640px) {
  .stats-row {
    grid-template-columns: repeat(2, 1fr);
  }
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }
  .page-actions {
    width: 100%;
    justify-content: space-between;
  }
}

/* 声望等级（header内嵌） */
.rank-display-header {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-left: 10px;
  padding: 2px 10px 2px 6px;
  background: linear-gradient(135deg, #f0f5ff, #e6f0ff);
  border: 1px solid #d6e4ff;
  border-radius: 14px;
  line-height: 1;
  flex-shrink: 0;
}
.rank-icon { font-size: 18px; }
.rank-title {
  font-size: 14px;
  font-weight: 700;
  color: #303133;
  line-height: 1.2;
}
.rank-level {
  font-size: 10px;
  font-weight: 600;
  color: #909399;
  margin-top: 1px;
}
</style>
