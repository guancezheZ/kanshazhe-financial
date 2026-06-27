<template>
  <div class="page">
    <div class="page-header">
      <h2 class="page-title">⚙️ 系统设置</h2>
    </div>

    <el-tabs v-model="activeTab" class="settings-tabs">
      <!-- ═══ 外观设置 ═══ -->
      <el-tab-pane label="🎨 外观" name="appearance">
        <el-card shadow="never" class="settings-card">
          <h3 class="section-title">主题切换</h3>
          <p class="section-desc">选择你喜欢的界面风格</p>
          <div class="theme-options">
            <div
              class="theme-card"
              :class="{ active: currentTheme === 'ink' }"
              @click="setTheme('ink')"
            >
              <div class="theme-preview ink-preview">
                <div class="preview-header" style="background:#9a4a42"></div>
                <div class="preview-sidebar" style="background:#2c2c2c"></div>
                <div class="preview-body" style="background:#f2ede4"></div>
              </div>
              <span class="theme-name">🖌️ 水墨国风</span>
              <span class="theme-desc">宣纸米白 · 墨色 · 砖红</span>
            </div>
            <div
              class="theme-card"
              :class="{ active: currentTheme === 'classic' }"
              @click="setTheme('classic')"
            >
              <div class="theme-preview classic-preview">
                <div class="preview-header" style="background:#409eff"></div>
                <div class="preview-sidebar" style="background:#304156"></div>
                <div class="preview-body" style="background:#f5f7fa"></div>
              </div>
              <span class="theme-name">🔵 经典蓝白</span>
              <span class="theme-desc">Element 经典配色</span>
            </div>
          </div>
        </el-card>
      </el-tab-pane>

      <!-- ═══ 存储管理 ═══ -->
      <el-tab-pane label="📦 存储" name="storage">
        <el-card shadow="never" class="settings-card">
          <h3 class="section-title">本地存储空间</h3>
          <p class="section-desc">管理浏览器本地数据，定期清理可保持系统流畅</p>

          <div class="storage-info">
            <div class="storage-stat">
              <span class="stat-label">当前用量</span>
              <span class="stat-value" :class="storageTagType">{{ storageUsage }} MB</span>
            </div>
            <div class="storage-stat">
              <span class="stat-label">教程标记</span>
              <span class="stat-value">{{ stats.tutorialDone }} 项</span>
            </div>
            <div class="storage-stat">
              <span class="stat-label">场景数据</span>
              <span class="stat-value">{{ stats.scenarioData }} 项</span>
            </div>
            <div class="storage-stat">
              <span class="stat-label">案例数据</span>
              <span class="stat-value">{{ stats.caseData }} 项</span>
            </div>
          </div>

          <div class="storage-actions">
            <el-button type="primary" plain @click="handleClean" :loading="cleaning">
              🧹 清理过期数据
            </el-button>
            <span v-if="lastCleanup" class="cleanup-hint">上次清理：{{ lastCleanup }}</span>
          </div>
          <p v-if="cleanResult" class="cleanup-result">{{ cleanResult }}</p>
        </el-card>
      </el-tab-pane>

      <!-- ═══ 意见反馈 ═══ -->
      <el-tab-pane label="📬 反馈" name="feedback">
        <el-card shadow="never" class="settings-card">
          <h3 class="section-title">意见反馈</h3>
          <p class="section-desc">帮助我们改进产品，你的每一条反馈都很重要</p>
          <div class="feedback-inline">
            <el-radio-group v-model="fbType" class="fb-types">
              <el-radio-button v-for="item in FEEDBACK_TYPES" :key="item.value" :value="item.value" class="fb-radio">
                {{ item.label }}
              </el-radio-button>
            </el-radio-group>
            <el-input
              v-model="fbContent" type="textarea" :rows="4"
              placeholder="请详细描述..." maxlength="2000" show-word-limit
              style="margin-top:12px"
            />
            <div class="fb-actions">
              <el-button type="primary" @click="handleSubmitFB" :loading="fbSending" :disabled="!fbContent.trim()">
                📤 提交反馈
              </el-button>
              <span v-if="fbResult" class="fb-result" :class="{ success: fbSuccess }">{{ fbResult }}</span>
            </div>
          </div>
        </el-card>
      </el-tab-pane>

      <!-- ═══ 更新日志 ═══ -->
      <el-tab-pane label="📜 更新日志" name="changelog">
        <el-card shadow="never" class="settings-card">
          <h3 class="section-title">版本更新记录</h3>
          <p class="section-desc">了解每次更新的新功能和修复内容</p>
          <div class="changelog-list">
            <div v-for="log in changelog" :key="log.version" class="changelog-entry">
              <div class="cl-version">
                <span class="cl-version-tag">v{{ log.version }}</span>
                <span class="cl-date">{{ log.date }}</span>
                <span class="cl-title">{{ log.title }}</span>
              </div>
              <ul class="cl-items">
                <li v-for="(item, i) in log.items" :key="i">{{ item }}</li>
              </ul>
            </div>
          </div>
        </el-card>
      </el-tab-pane>

      <!-- ═══ 系统工具 ═══ -->
      <el-tab-pane label="🔧 工具" name="tools">
        <el-card shadow="never" class="settings-card">
          <h3 class="section-title">系统管理工具</h3>
          <p class="section-desc">访问各项系统管理功能</p>
          <div class="tool-grid">
            <div class="tool-item" @click="goTo('/#/system/accounts')">
              <span class="tool-icon">🏛️</span>
              <span class="tool-name">账套管理</span>
              <span class="tool-arrow">→</span>
            </div>
            <div class="tool-item" @click="goTo('/#/system/periods')">
              <span class="tool-icon">📅</span>
              <span class="tool-name">会计期间</span>
              <span class="tool-arrow">→</span>
            </div>
            <div class="tool-item" @click="goTo('/#/system/audit-log')">
              <span class="tool-icon">📋</span>
              <span class="tool-name">审计轨迹</span>
              <span class="tool-arrow">→</span>
            </div>
            <div class="tool-item" @click="goTo('/#/system/activation')">
              <span class="tool-icon">🔑</span>
              <span class="tool-name">激活管理</span>
              <span class="tool-arrow">→</span>
            </div>
          </div>
        </el-card>

        <el-card shadow="never" class="settings-card" style="margin-top:16px">
          <h3 class="section-title">关于系统</h3>
          <div class="about-info">
            <div class="about-row"><span class="about-label">系统名称</span><span>観測者企业财务模拟系统</span></div>
            <div class="about-row"><span class="about-label">版本号</span><span>v{{ version }}</span></div>
            <div class="about-row"><span class="about-label">技术栈</span><span>Vue3 + Element Plus + Tauri</span></div>
          </div>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { getStorageStats, getStorageUsageMB, runCleanup, getLastCleanupInfo } from '@/utils/storage-cleanup.js'
import { submitFeedback, FEEDBACK_TYPES } from '@/utils/feedback.js'
import { CHANGELOG } from '@/data/changelog.js'

const version = __APP_VERSION__ || '0.2.0'
const changelog = CHANGELOG
const activeTab = ref('appearance')

// ─── 主题 ───
const currentTheme = ref(localStorage.getItem('jd_theme') || 'ink')

function setTheme(theme) {
  currentTheme.value = theme
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('jd_theme', theme)
}

// ─── 存储 ───
const storageUsage = ref('0')
const stats = ref({ tutorialDone: 0, scenarioData: 0, caseData: 0, other: 0 })
const cleanResult = ref('')
const lastCleanup = ref('')
const cleaning = ref(false)

const storageTagType = computed(() => {
  const mb = parseFloat(storageUsage.value)
  if (mb > 4) return 'danger'
  if (mb > 2) return 'warning'
  return 'info'
})

function refreshStorage() {
  storageUsage.value = getStorageUsageMB()
  stats.value = getStorageStats()
  const info = getLastCleanupInfo()
  lastCleanup.value = info?.lastRun ? new Date(info.lastRun).toLocaleString('zh-CN') : ''
}

async function handleClean() {
  cleaning.value = true
  await new Promise(r => setTimeout(r, 300))
  const result = runCleanup({ monthsToKeep: 6, maxCompletedTasks: 2000 })
  const savedMB = ((result.beforeBytes - result.afterBytes) / (1024 * 1024)).toFixed(2)

  const parts = []
  if (result.tutorialMarkersRemoved > 0) parts.push('教程标记 ' + result.tutorialMarkersRemoved + ' 项')
  if (result.xpTasksTrimmed > 0) parts.push('XP记录 ' + result.xpTasksTrimmed + ' 项')
  if (result.orphansRemoved > 0) parts.push('冗余数据 ' + result.orphansRemoved + ' 项')

  const detail = parts.length > 0 ? '（' + parts.join('，') + '）' : '无过期数据'
  cleanResult.value = '✅ 清理完成！释放 ' + savedMB + ' MB ' + detail
  refreshStorage()
  cleaning.value = false
  setTimeout(() => { cleanResult.value = '' }, 5000)
}

// ─── 导航 ───
function goTo(path) {
  window.location.hash = path.replace('/#/', '')
}

// ─── 反馈 ───
const fbType = ref('bug')
const fbContent = ref('')
const fbSending = ref(false)
const fbResult = ref('')
const fbSuccess = ref(false)

async function handleSubmitFB() {
  if (!fbContent.value.trim()) return
  fbSending.value = true
  fbResult.value = ''
  try {
    await submitFeedback({ type: fbType.value, content: fbContent.value.trim() })
    fbSuccess.value = true
    fbResult.value = '✅ 反馈已提交，感谢你的支持！'
    fbContent.value = ''
    ElMessage.success('反馈提交成功！')
  } catch (e) {
    fbSuccess.value = false
    fbResult.value = '❌ 提交失败：' + (e.message || '网络错误')
  }
  fbSending.value = false
  setTimeout(() => { fbResult.value = '' }, 5000)
}

onMounted(() => { refreshStorage() })
</script>

<style scoped>
.settings-tabs { margin-top: 8px; }
.settings-card { margin-bottom: 16px; }
.section-title { font-size: 16px; font-weight: 600; margin: 0 0 4px 0; color: var(--text, #303133); }
.section-desc { font-size: 13px; color: var(--text-secondary, #909399); margin: 0 0 16px 0; }

/* 主题卡片 */
.theme-options { display: flex; gap: 16px; }
.theme-card {
  width: 200px; border: 2px solid var(--border-color, #e4e7ed); border-radius: 12px;
  padding: 12px; cursor: pointer; transition: all 0.2s; display: flex; flex-direction: column; gap: 6px;
}
.theme-card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
.theme-card.active { border-color: var(--el-color-primary, #409eff); }
.theme-preview {
  height: 80px; border-radius: 8px; overflow: hidden; display: flex; position: relative;
}
.preview-header { height: 12px; width: 100%; position: absolute; top: 0; }
.preview-sidebar { width: 30px; height: 100%; }
.preview-body { flex: 1; }
.theme-name { font-size: 14px; font-weight: 600; color: var(--text, #303133); }
.theme-desc { font-size: 12px; color: var(--text-secondary, #909399); }

/* 存储 */
.storage-info { display: flex; gap: 24px; margin-bottom: 16px; flex-wrap: wrap; }
.storage-stat { display: flex; flex-direction: column; gap: 4px; }
.stat-label { font-size: 12px; color: var(--text-secondary, #909399); }
.stat-value { font-size: 18px; font-weight: 700; color: var(--text, #303133); }
.stat-value.danger { color: #f56c6c; }
.stat-value.warning { color: #e6a23c; }
.storage-actions { display: flex; align-items: center; gap: 12px; }
.cleanup-hint { font-size: 12px; color: var(--text-muted, #c0c4cc); }
.cleanup-result { margin-top: 8px; font-size: 13px; color: #67c23a; }

/* 系统工具网格 */
.tool-grid { display: flex; flex-direction: column; gap: 2px; }
.tool-item {
  display: flex; align-items: center; padding: 12px 16px; border-radius: 8px;
  cursor: pointer; transition: background 0.2s; gap: 12px;
}
.tool-item:hover { background: var(--el-fill-color-light, #f5f7fa); }
.tool-icon { font-size: 20px; }
.tool-name { flex: 1; font-size: 14px; color: var(--text, #303133); }
.tool-arrow { font-size: 14px; color: var(--text-muted, #c0c4cc); }

/* 关于 */
.about-info { display: flex; flex-direction: column; gap: 8px; }
.about-row { display: flex; gap: 16px; font-size: 14px; }
.about-label { width: 100px; color: var(--text-secondary, #909399); flex-shrink: 0; }

/* 反馈 */
.fb-types { display: flex; flex-wrap: wrap; gap: 8px; }
.fb-actions { display: flex; align-items: center; gap: 12px; margin-top: 12px; }
.fb-result { font-size: 13px; }
.fb-result.success { color: #67c23a; }

/* 更新日志 */
.changelog-list { display: flex; flex-direction: column; gap: 20px; }
.changelog-entry {
  background: var(--el-fill-color-lighter, #fafafa);
  border-radius: 10px; padding: 16px 20px;
  border: 1px solid var(--border-color, #e4e7ed);
}
.cl-version { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; flex-wrap: wrap; }
.cl-version-tag {
  display: inline-block; background: var(--el-color-primary, #409eff); color: #fff;
  font-size: 13px; font-weight: 700; padding: 2px 10px; border-radius: 4px;
  font-family: monospace;
}
.cl-date { font-size: 12px; color: var(--text-muted, #c0c4cc); }
.cl-title { font-size: 14px; font-weight: 600; color: var(--text, #303133); }
.cl-items { margin: 0; padding-left: 18px; display: flex; flex-direction: column; gap: 6px; }
.cl-items li { font-size: 13px; color: var(--text-secondary, #606266); line-height: 1.6; }
</style>
