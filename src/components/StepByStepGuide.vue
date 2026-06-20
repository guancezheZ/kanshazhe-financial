<template>
  <div v-if="visible" class="sbs-overlay">
    <div class="sbs-modal">
      <!-- 顶部：步骤指示器 + 跳过按钮 -->
      <div class="sbs-header">
        <div class="sbs-steps">
          <div
            v-for="(s, i) in STEPS"
            :key="i"
            class="sbs-step"
            :class="{ active: currentStep === i, completed: currentStep > i }"
            @click="goToStepSafe(i)"
          >
            <span class="sbs-step-circle">{{ currentStep > i ? '✓' : i + 1 }}</span>
            <span class="sbs-step-label">{{ s }}</span>
          </div>
        </div>
        <el-button text size="small" type="info" class="sbs-skip-btn" @click="handleSkip">
          ⏩ 快速模式
        </el-button>
        <el-button text size="small" type="danger" @click="handleClose" style="margin-left:4px" title="关闭引导">
          ✕
        </el-button>
      </div>

      <!-- ===== Step 0: 理解经济业务 ===== -->
      <div v-if="currentStep === 0" class="sbs-panel">
        <div class="sbs-panel-title">第一步：理解经济业务</div>
        <div class="sbs-description">
          <div class="sbs-desc-text">{{ task.description }}</div>
          <div v-if="docList.length" class="sbs-docs">
            <div class="sbs-docs-label">📎 原始凭证附件：</div>
            <div class="sbs-docs-grid">
              <div
                v-for="(doc, i) in docList"
                :key="i"
                class="sbs-doc-item"
                @click="previewDoc = previewDoc === i ? null : i"
              >
                <span class="sbs-doc-icon">{{ docIcon(doc.type) }}</span>
                <span class="sbs-doc-label">{{ doc.label }}</span>
              </div>
            </div>
            <!-- 简单预览窗 -->
            <div v-if="previewDoc !== null && docList[previewDoc]" class="sbs-doc-preview">
              <VoucherDisplay
                :type="docList[previewDoc].type"
                :data="docList[previewDoc]"
                :compact="true"
              />
            </div>
          </div>
        </div>
        <div v-if="task.tip" class="sbs-tip">
          💡 教学提示：{{ task.tip }}
        </div>
        <div class="sbs-actions">
          <el-button type="primary" size="large" @click="goToStep(1)">
            ✓ 已理解，开始分析分录
          </el-button>
        </div>
      </div>

      <!-- ===== Step 1: 逐笔分析分录 ===== -->
      <div v-if="currentStep === 1" class="sbs-panel">
        <div class="sbs-panel-title">第二步：逐笔分析会计分录</div>
        <div class="sbs-entry-progress">
          第 <strong>{{ currentEntryIdx + 1 }}</strong> / {{ totalEntries }} 笔分录
          <el-progress
            :percentage="Math.round((currentEntryIdx) / totalEntries * 100)"
            :stroke-width="4"
            :show-text="false"
            style="width:120px;margin-left:12px"
          />
        </div>

        <!-- 当前分录的引导卡片 -->
        <div class="sbs-entry-card">
          <div class="sbs-entry-summary" v-if="currentEntry.summary">
            📝 摘要：<strong>{{ currentEntry.summary }}</strong>
          </div>

          <!-- 未揭示状态：引导思考 -->
          <div v-if="!entryRevealed" class="sbs-thinking">
            <div class="sbs-thinking-icon">🤔</div>
            <div class="sbs-thinking-text">{{ entryHint }}</div>
            <div class="sbs-thinking-actions">
              <el-button type="primary" @click="revealEntry">显示答案</el-button>
            </div>
          </div>

          <!-- 已揭示状态：展示答案+讲解 -->
          <div v-else class="sbs-revealed">
            <!-- 借方 -->
            <div class="sbs-answer-line" v-if="currentEntry.debit && currentEntry.debit !== 0">
              <span class="sbs-answer-dir debit">借</span>
              <span class="sbs-answer-subject">{{ getSubjectName(currentEntry.subjectCode) }}</span>
              <span class="sbs-answer-amt">{{ formatAmt(currentEntry.debit) }}</span>
            </div>
            <!-- 贷方 -->
            <div class="sbs-answer-line" v-if="currentEntry.credit && currentEntry.credit !== 0">
              <span class="sbs-answer-dir credit">贷</span>
              <span class="sbs-answer-subject">{{ getSubjectName(currentEntry.subjectCode) }}</span>
              <span class="sbs-answer-amt">{{ formatAmt(currentEntry.credit) }}</span>
            </div>
            <!-- 讲解 -->
            <div class="sbs-explanation">
              <span class="sbs-exp-icon">📖</span>
              {{ currentEntry.explanation }}
            </div>
          </div>
        </div>

        <div class="sbs-actions">
          <el-button v-if="entryRevealed" type="primary" @click="nextEntry">
            {{ currentEntryIdx < totalEntries - 1 ? '下一条 →' : '✅ 完成所有分录分析' }}
          </el-button>
        </div>
      </div>

      <!-- ===== Step 2: 检查确认 ===== -->
      <div v-if="currentStep === 2" class="sbs-panel">
        <div class="sbs-panel-title">✅ 第三步：检查并保存凭证</div>
        <div class="sbs-review-text">
          你已经完成了所有分录的推理分析！下面是完整的凭证分录，请仔细核对：
        </div>

        <!-- 完整分录汇总 -->
        <div class="sbs-review-entries">
          <div class="sbs-review-entry" v-for="(entry, i) in task.entries" :key="i">
            <span class="sbs-review-idx">{{ i + 1 }}</span>
            <div class="sbs-review-detail">
              <span class="sbs-review-summary">{{ entry.summary }}</span>
              <div class="sbs-review-lines">
                <div class="sbs-review-line" v-if="entry.debit && entry.debit !== 0">
                  <span class="sbs-answer-dir debit">借</span>
                  <span class="sbs-answer-subject">{{ getSubjectName(entry.subjectCode) }}</span>
                  <span class="sbs-answer-amt">{{ formatAmt(entry.debit) }}</span>
                </div>
                <div class="sbs-review-line" v-if="entry.credit && entry.credit !== 0">
                  <span class="sbs-answer-dir credit">贷</span>
                  <span class="sbs-answer-subject">{{ getSubjectName(entry.subjectCode) }}</span>
                  <span class="sbs-answer-amt">{{ formatAmt(entry.credit) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 借贷平衡汇总 -->
        <div class="sbs-review-balance">
          <span>借：{{ formatAmt(totalDebit) }}</span>
          <span>贷：{{ formatAmt(totalCredit) }}</span>
          <el-tag v-if="isBalanced" type="success" size="small">✓ 借贷平衡</el-tag>
          <el-tag v-else type="danger" size="small">✗ 不平衡</el-tag>
        </div>

        <div class="sbs-actions">
          <el-button type="primary" size="large" @click="finishGuide">
            📝 关闭引导，填写凭证
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import VoucherDisplay from './VoucherDisplay.vue'
import { useStore } from '@/stores/store.js'
import { formatAmount } from '@/utils/accounting.js'

const props = defineProps({
  task: { type: Object, required: true },
  visible: { type: Boolean, default: false },
})

const emit = defineEmits(['complete', 'skip', 'close'])

const store = useStore()

const STEPS = ['理解业务', '分析分录', '检查确认']

const currentStep = ref(0)       // 0=理解业务, 1=逐笔分析, 2=检查确认
const currentEntryIdx = ref(0)   // 当前正在看第几条分录
const revealed = ref(new Set())  // 已揭示的分录索引
const previewDoc = ref(null)     // 预览的文档索引

// 重置状态
watch(() => props.visible, (val) => {
  if (val) {
    currentStep.value = 0
    currentEntryIdx.value = 0
    revealed.value = new Set()
    previewDoc.value = null
  }
})

const totalEntries = computed(() => props.task?.entries?.length || 0)
const currentEntry = computed(() => props.task?.entries?.[currentEntryIdx.value] || {})
const entryRevealed = computed(() => revealed.value.has(currentEntryIdx.value))
const docList = computed(() => props.task?.documents || [])

// 借贷合计
const totalDebit = computed(() => props.task?.entries?.reduce((s, e) => s + Number(e.debit || 0), 0) || 0)
const totalCredit = computed(() => props.task?.entries?.reduce((s, e) => s + Number(e.credit || 0), 0) || 0)
const isBalanced = computed(() => Math.abs(totalDebit.value - totalCredit.value) < 0.01)

// 获取科目名称
function getSubjectName(subjectCode) {
  const subjects = store.state.subjects
  for (const s of subjects) {
    let code = s.code
    let parent = s.parentId ? subjects.find(p => p.id === s.parentId) : null
    while (parent) {
      code = parent.code + code
      parent = parent.parentId ? subjects.find(p => p.id === parent.parentId) : null
    }
    if (code === subjectCode) return s.name
  }
  return subjectCode
}

// 生成思考提示
const entryHint = computed(() => {
  const entry = currentEntry.value
  if (!entry || !entry.subjectCode) return '请思考这笔分录应该记什么科目。'
  try {
    const isDebit = Number(entry.debit) > 0
    const direction = isDebit ? '借方' : '贷方'
    const code = entry.subjectCode
    const summary = entry.summary || ''

    // 根据科目编码前缀判断类别
    const prefix = code.substring(0, 1)
    const categories = { '1': '资产', '2': '负债', '3': '所有者权益', '4': '成本', '5': '费用', '6': '损益' }
    const category = categories[prefix] || ''
    const incDec = (prefix === '1' || prefix === '4' || prefix === '5')
      ? (isDebit ? '增加' : '减少')
      : (isDebit ? '减少' : '增加')

    const summaryText = summary ? `（摘要：${summary}）` : ''
    return `这笔分录的「${direction}」应该记哪个${category}类科目${summaryText}？\n💡 想一想：这笔业务使哪个${category}类科目${incDec}了？`
  } catch {
    return '请根据业务内容判断应记科目和金额。'
  }
})

// 揭示当前分录
function revealEntry() {
  revealed.value = new Set([...revealed.value, currentEntryIdx.value])
}

// 切换到指定步骤
function goToStep(step) {
  currentStep.value = step
}
// 安全导航：只能切换到已完成或当前步骤
function goToStepSafe(step) {
  if (step <= currentStep.value + 1) {
    currentStep.value = step
  }
}

// 下一条
function nextEntry() {
  if (currentEntryIdx.value < totalEntries.value - 1) {
    currentEntryIdx.value++
  } else {
    currentStep.value = 2
  }
}

// 完成引导
function finishGuide() {
  emit('complete')
}

// 跳过引导（快速模式）
function handleSkip() {
  emit('skip')
}

// 关闭引导（不预填，回到空白凭证）
function handleClose() {
  emit('close')
}

// 文档类型对应图标
function docIcon(type) {
  const icons = { invoice: '🧾', bank: '🏦', receipt: '📄', text: '📋' }
  return icons[type] || '📎'
}

function formatAmt(val) {
  return `¥${formatAmount(val)}`
}
</script>

<style scoped>
.sbs-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.sbs-modal {
  background: #fff;
  border-radius: 12px;
  width: 680px;
  max-width: 90vw;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

/* 顶部指示器 */
.sbs-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px 12px;
  border-bottom: 1px solid #f0f0f0;
}
.sbs-steps {
  display: flex;
  gap: 8px;
  align-items: center;
}
.sbs-step {
  display: flex;
  align-items: center;
  gap: 6px;
  opacity: 0.45;
  transition: opacity 0.3s;
}
.sbs-step.active { opacity: 1; }
.sbs-step.completed { opacity: 0.7; }
.sbs-step-circle {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  background: #e8e8e8;
  color: #909399;
}
.sbs-step.active .sbs-step-circle {
  background: #409eff;
  color: #fff;
}
.sbs-step.completed .sbs-step-circle {
  background: #67c23a;
  color: #fff;
}
.sbs-step-label {
  font-size: 13px;
  color: #303133;
  white-space: nowrap;
}
.sbs-skip-btn { font-size: 12px !important; }

/* 面板内容 */
.sbs-panel {
  flex: 1;
  overflow-y: auto;
  padding: 20px 24px 24px;
}
.sbs-panel-title {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 16px;
}
.sbs-description {
  background: #f8f9fb;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  line-height: 1.7;
  font-size: 14px;
  color: #303133;
}
.sbs-docs {
  margin-top: 12px;
}
.sbs-docs-label {
  font-size: 13px;
  color: #606266;
  margin-bottom: 8px;
}
.sbs-docs-grid {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.sbs-doc-item {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  transition: border-color 0.2s;
}
.sbs-doc-item:hover { border-color: #409eff; }
.sbs-doc-icon { font-size: 16px; }
.sbs-doc-label { color: #303133; }
.sbs-doc-preview {
  margin-top: 12px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 12px;
  max-height: 300px;
  overflow-y: auto;
  background: #fff;
}
.sbs-tip {
  background: #fef6e0;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 13px;
  color: #8a6d0b;
  line-height: 1.6;
  margin-bottom: 12px;
}

/* 分录引导 */
.sbs-entry-progress {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #606266;
  margin-bottom: 12px;
}
.sbs-entry-card {
  background: #f8f9fb;
  border: 1px solid #e8e8e8;
  border-radius: 10px;
  padding: 20px;
  min-height: 160px;
}
.sbs-entry-summary {
  font-size: 14px;
  color: #303133;
  margin-bottom: 14px;
  padding-bottom: 12px;
  border-bottom: 1px dashed #e0e0e0;
}

/* 思考状态 */
.sbs-thinking {
  text-align: center;
  padding: 20px 10px;
}
.sbs-thinking-icon {
  font-size: 36px;
  margin-bottom: 10px;
}
.sbs-thinking-text {
  font-size: 14px;
  color: #303133;
  line-height: 1.7;
  margin-bottom: 18px;
  white-space: pre-line;
}
.sbs-thinking-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
}

/* 揭示答案 */
.sbs-revealed {
  animation: sbsFadeIn 0.35s ease;
}
.sbs-answer-line {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  font-size: 15px;
}
.sbs-answer-dir {
  font-weight: 700;
  font-size: 16px;
  min-width: 24px;
}
.sbs-answer-dir.debit { color: #409eff; }
.sbs-answer-dir.credit { color: #e6a23c; }
.sbs-answer-subject {
  color: #303133;
  flex: 1;
}
.sbs-answer-amt {
  font-family: monospace;
  font-weight: 600;
  color: #606266;
}
.sbs-explanation {
  margin-top: 12px;
  padding: 12px 14px;
  background: #e8f4fd;
  border-radius: 8px;
  font-size: 13px;
  color: #2c5f7c;
  line-height: 1.7;
}
.sbs-exp-icon { margin-right: 4px; }

/* 底部操作按钮 */
.sbs-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 18px;
}

/* 第三步：检查确认 */
.sbs-review-text {
  font-size: 14px;
  color: #606266;
  margin-bottom: 16px;
}
.sbs-review-entries {
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  overflow: hidden;
}
.sbs-review-entry {
  display: flex;
  align-items: flex-start;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
}
.sbs-review-entry:last-child { border-bottom: none; }
.sbs-review-idx {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #409eff;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-right: 12px;
  margin-top: 2px;
}
.sbs-review-detail { flex: 1; }
.sbs-review-summary {
  font-size: 13px;
  color: #909399;
  margin-bottom: 4px;
  display: block;
}
.sbs-review-lines { margin-top: 4px; }
.sbs-review-line {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;
  font-size: 14px;
}
.sbs-review-balance {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  background: #f8f9fb;
  border-radius: 8px;
  margin-top: 12px;
  font-family: monospace;
  font-size: 14px;
  font-weight: 600;
  color: #303133;
}

@keyframes sbsFadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
