<template>
  <div class="page">
    <div class="page-header">
      <div>
        <h2 class="page-title">{{ pageTitle }}</h2>
        <span class="page-desc">{{ tutorialTask ? tutorialTask.title : '录入新的记账凭证' }}</span>
      </div>
      <div class="page-actions">
        <el-button type="primary" @click="handleSave" :disabled="saving">
          <el-icon><Select /></el-icon>保存
        </el-button>
        <el-button @click="handleSaveNew" :disabled="saving">
          保存并新增
        </el-button>
        <el-button @click="handleReset">重置</el-button>
        <template v-if="tutorialTask && !isCompletedTask">
          <el-button type="success" @click="checkAnswer" :disabled="checkAnswerLocked">检查答案</el-button>
          <el-button v-if="tutorialTask.entries?.length" @click="showAnswerDialog = true">👁️ 查看答案</el-button>
        </template>
        <el-button v-if="isCompletedTask" type="info" @click="router.push('/tutorial')">📋 返回教学中心</el-button>
      </div>
    </div>

    <!-- 已完成任务提示条 -->
    <div v-if="isCompletedTask" class="completed-banner" style="background:#f0f9eb;border:1px solid #b7eb8f;border-radius:6px;padding:10px 14px;margin-bottom:10px;display:flex;align-items:center;gap:8px">
      <span style="font-size:16px">✅</span>
      <span style="flex:1;font-size:13px;color:#333">
        <strong>此任务已完成</strong> — 按课程学模式下已完成任务不可修改。如需重新练习请切换至 🎯 自由练习模式。
      </span>
    </div>

    <!-- 快捷键提示条 -->
    <div class="shortcut-bar">
      <span class="shortcut-item"><kbd>Ctrl+S</kbd> 保存</span>
      <span class="shortcut-item"><kbd>Enter</kbd> 下一行</span>
      <span class="shortcut-item"><kbd>F8</kbd> 借贷互换</span>
      <span class="shortcut-item"><kbd>Esc</kbd> 取消选中</span>
    </div>

    <!-- 教学步骤条 -->
    <div v-if="tutorialTask" class="teaching-stepbar">
      <div class="stepbar-mode-tag">
        <el-tag :type="guidedAlertType" size="small" effect="dark" round>
          {{ guidedMode ? '📖 引导' : practiceMode ? '✏️ 练习' : '📝 考试' }}
        </el-tag>
        <span class="stepbar-title">{{ tutorialTask.title }}</span>
      </div>
      <div class="stepbar-steps">
        <div class="stepbar-step" :class="{ active: stepIndex >= 0 }">
          <span class="step-num">1</span>
          <span class="step-text">理解业务</span>
        </div>
        <div class="stepbar-arrow">→</div>
        <div class="stepbar-step" :class="{ active: stepIndex >= 1 }">
          <span class="step-num">2</span>
          <span class="step-text">编制分录</span>
        </div>
        <div class="stepbar-arrow">→</div>
        <div class="stepbar-step" :class="{ active: stepIndex >= 2 }">
          <span class="step-num">3</span>
          <span class="step-text">检查确认</span>
        </div>
      </div>
      <div v-if="practiceMode" class="stepbar-hint-bar">
        <el-button size="small" type="warning" plain @click="clickHint">
          💡 提示 <span v-if="hintLevel > 0">({{ hintLevel }}/{{ maxHintLevel }})</span>
        </el-button>
        <el-button v-if="hintLevel > 0" size="small" text type="info" @click="resetHint">清除</el-button>
      </div>
    </div>

    <!-- 教学提示内容 -->
    <transition name="hint-fade">
      <div v-if="hintText && hintText.length" class="hint-panel">
        <div v-for="(hint, idx) in hintText" :key="idx" class="hint-line">
          <span class="hint-icon">{{ hint.icon }}</span>
          <span class="hint-content">{{ hint.text }}</span>
        </div>
      </div>
    </transition>

    <!-- 案例模式：原始凭证附件预览 -->
    <template v-if="tutorialTask && tutorialTask.documents && tutorialTask.documents.length > 0">
      <div class="case-documents">
        <div class="documents-label">📎 原始凭证（{{ tutorialTask.documents.length }} 张）</div>
        <div class="documents-gallery">
          <div
            v-for="(doc, i) in tutorialTask.documents"
            :key="i"
            class="document-thumb"
            @click="previewDocIdx = i"
          >
            <div class="thumb-icon">{{ doc.type === 'invoice' ? '📄' : doc.type === 'bank' ? '🏦' : doc.type === 'receipt' ? '🧾' : '📋' }}</div>
            <div class="thumb-title">{{ doc.title }}</div>
          </div>
        </div>
      </div>

      <!-- 灯箱预览 -->
      <teleport to="body">
        <transition name="el-fade-in-linear">
          <div v-if="previewDocIdx !== null" class="lightbox-overlay" @click.self="previewDocIdx = null">
            <div class="lightbox-content">
              <button class="lightbox-close" @click="previewDocIdx = null">✕</button>
              <VoucherDisplay :doc="tutorialTask.documents[previewDocIdx]" />
              <div v-if="tutorialTask.documents.length > 1" class="lightbox-nav">
                <el-button size="small" @click="previewDocIdx = Math.max(0, previewDocIdx - 1)" :disabled="previewDocIdx <= 0">◀ 上一张</el-button>
                <span class="lightbox-counter">{{ previewDocIdx + 1 }} / {{ tutorialTask.documents.length }}</span>
                <el-button size="small" @click="previewDocIdx = Math.min(tutorialTask.documents.length - 1, previewDocIdx + 1)" :disabled="previewDocIdx >= tutorialTask.documents.length - 1">下一张 ▶</el-button>
              </div>
            </div>
          </div>
        </transition>
      </teleport>
    </template>

    <div class="voucher-card voucher-paper">
      <!-- 凭证头 -->
      <div class="voucher-header">
        <div class="voucher-info">
          <div class="info-item">
            <span class="info-label">凭证号：</span>
            <span class="info-value voucher-no">{{ voucherNo || '（自动生成）' }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">日期：</span>
            <el-date-picker
              v-model="voucherDate"
              type="date"
              value-format="YYYY-MM-DD"
              size="small"
              style="width: 150px"
              :disabled="isReadonly"
            />
          </div>
          <div class="info-item">
            <span class="info-label">附件：</span>
            <el-input-number
              v-model="attachments"
              :min="0"
              :max="99"
              size="small"
              style="width: 100px"
              :disabled="isReadonly"
            />
            <span class="info-unit">张</span>
          </div>
          <div class="info-item">
            <span class="info-label">状态：</span>
            <el-tag v-if="editingVoucher" :type="statusType" size="small">
              {{ statusText }}
            </el-tag>
            <el-tag v-else type="info" size="small">新凭证</el-tag>
          </div>
        </div>
        <div class="voucher-period">
          会计期间：{{ currentPeriod }}
        </div>
      </div>

      <!-- 凭证体：分录表格 -->
      <div class="voucher-body">
        <VoucherEntryTable
          ref="tableRef"
          v-model="entries"
          :readonly="isReadonly"
          @balance-check="handleBalanceCheck"
        />
      </div>

      <!-- 凭证尾 -->
      <div class="voucher-footer">
        <div class="footer-left">
          <span class="footer-label">制单人：管理员</span>
          <span v-if="editingVoucher?.approvedBy" class="footer-label">
            审核人：{{ editingVoucher.approvedBy }}
          </span>
        </div>
        <div v-if="balanceInfo" class="footer-right" :class="{ error: !balanceInfo.balanced }">
          <span class="footer-debit">借 <em>{{ formatAmt(balanceInfo.debitTotal) }}</em></span>
          <span class="footer-credit">贷 <em>{{ formatAmt(balanceInfo.creditTotal) }}</em></span>
          <span v-if="balanceInfo.balanced" class="footer-badge ok">✓ 平衡</span>
          <span v-else class="footer-badge err">✗ 不平衡</span>
        </div>
      </div>
    </div>

    <!-- 消息提示区 -->
    <div v-if="errorMessages.length" class="error-messages">
      <el-alert
        title="保存失败"
        :description="errorMessages.join('；')"
        type="error"
        show-icon
        closable
        @close="errorMessages = []"
      />
    </div>

    <!-- 查看答案弹窗 -->
    <Teleport to="body">
      <el-dialog v-model="showAnswerDialog" title="📖 正确答案与讲解" width="640" :close-on-click-modal="false">
        <div v-if="!tutorialTask?.entries?.length" style="text-align:center;padding:20px;color:#909399">无分录数据</div>
        <div v-for="(entry, i) in tutorialTask?.entries || []" :key="i" class="answer-entry" style="margin-bottom:10px">
          <div class="answer-header">
            <span class="answer-num">第{{ i + 1 }}条</span>
            <span class="answer-subject">{{ entry.subjectCode }} {{ findSubjectByFullCode(entry.subjectCode)?.name || '' }}</span>
            <span class="answer-summary">{{ entry.summary }}</span>
            <span class="answer-amount">
              <span v-if="entry.debit > 0" class="amount-debit">借 ¥{{ formatAmt(entry.debit) }}</span>
              <span v-if="entry.credit > 0" class="amount-credit">贷 ¥{{ formatAmt(entry.credit) }}</span>
            </span>
          </div>
          <div style="margin-top:6px;padding:6px 8px;background:#fff;border-left:3px solid #409eff;border-radius:3px;font-size:12px;color:#303133;line-height:1.6">
            💡 {{ entry.explanation }}
          </div>
        </div>
        <template #footer>
          <el-button type="primary" @click="showAnswerDialog = false">知道了</el-button>
        </template>
      </el-dialog>
    </Teleport>

    <!-- 分步引导弹窗 -->
    <StepByStepGuide
      v-if="tutorialTask && showStepByStep"
      :task="tutorialTask"
      :visible="showStepByStep"
      @complete="handleGuideComplete"
      @skip="handleGuideSkip"
      @close="handleGuideClose"
    />
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount, watch, h } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Select } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import VoucherEntryTable from '@/components/VoucherEntryTable.vue'
import StepByStepGuide from '@/components/StepByStepGuide.vue'
import VoucherDisplay from '@/components/VoucherDisplay.vue'
import { useStore } from '@/stores/store.js'
import { getCurrentPeriod, todayStr, formatAmount, validateVoucher, VOUCHER_STATUS, VOUCHER_STATUS_CN } from '@/utils/accounting.js'
import { compareAnswers } from '@/data/tutorials/year1.js'

const route = useRoute()
const router = useRouter()

const store = useStore()

const tableRef = ref(null)
const editingVoucher = ref(null) // 编辑已有凭证时为凭证对象
const saving = ref(false)

const voucherNo = ref('')
const voucherDate = ref(todayStr())
const attachments = ref(0)
const entries = ref([])
const errorMessages = ref([])
const balanceInfo = ref(null)

const tutorialTask = ref(null)
const tutorialMode = ref(localStorage.getItem('tutorial_mode') || 'practice')
const isCompletedTask = ref(false) // 已完成任务的只读查看模式
const checkResult = ref([])
const lastPostedPeriod = ref('') // 最新自动过账的期间（用于跳转报表）
const showStepByStep = ref(false) // 分步引导模式
const previewDocIdx = ref(null) // 案例凭证灯箱预览索引
const hintLevel = ref(0) // 练习模式提示级别（0=未提示，每点击+1）
const showAnswerDialog = ref(false) // 查看答案弹窗
const stepIndex = ref(0) // 教学步骤进度
const currentPeriod = computed(() => getCurrentPeriod())

const guidedMode = computed(() => tutorialMode.value === 'guided')
const practiceMode = computed(() => tutorialMode.value === 'practice')
const examMode = computed(() => tutorialMode.value === 'exam')
const guidedAlertType = computed(() => guidedMode.value ? 'success' : practiceMode.value ? 'warning' : 'danger')

// 页面标题：出纳看到"出纳收付款凭证"，会计看到"记账凭证"
const pageTitle = computed(() => {
  if (store.getCurrentRole() === 'cashier') return '🧾 出纳收付款凭证'
  return '📝 记账凭证'
})

// 练习模式提示系统
const maxHintLevel = computed(() => {
  const n = tutorialTask.value?.entries?.length || 0
  return n * 3 // 每笔分录3级：方向→科目→金额
})

const hintText = computed(() => {
  if (hintLevel.value <= 0 || !tutorialTask.value?.entries) return []
  const entries = tutorialTask.value.entries
  const result = []
  // 根据 hintLevel 确定揭示到哪一步
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i]
    if (!entry || !entry.subjectCode) continue
    // 该分录的最高已揭示级别：min(3, hintLevel - i*3)
    const entryHintLevel = Math.max(0, Math.min(3, hintLevel.value - i * 3))
    if (entryHintLevel <= 0) continue

    const isDebit = Number(entry.debit) > 0
    const direction = isDebit ? '借方' : '贷方'
    const code = entry.subjectCode
    const summary = entry.summary || ''
    const prefix = code.substring(0, 1)
    const categories = { '1': '资产', '2': '负债', '3': '所有者权益', '4': '成本', '5': '费用', '6': '损益' }
    const category = categories[prefix] || ''

    // 摘要提示
    if (entryHintLevel >= 1) {
      const incDec = (prefix === '1' || prefix === '4' || prefix === '5')
        ? '增加' : '减少'
      result.push({
        icon: '①',
        text: `第${i + 1}笔${summary ? '（' + summary + '）' : ''}：${direction}应记${category}类科目（${category}${incDec}）`
      })
    }
    // 科目提示
    if (entryHintLevel >= 2) {
      // 显示科目编码前几位
      const hintCode = code.substring(0, Math.min(4, code.length))
      result.push({
        icon: '②',
        text: `第${i + 1}笔：科目编码以 "${hintCode}" 开头`
      })
    }
    // 金额提示
    if (entryHintLevel >= 3) {
      const amt = isDebit ? Number(entry.debit) : Number(entry.credit)
      result.push({
        icon: '③',
        text: `第${i + 1}笔：金额为 ¥${formatAmount(Math.abs(amt))}`
      })
    }
  }
  return result
})

const isReadonly = computed(() => {
  if (!editingVoucher.value) return false
  return editingVoucher.value.status !== VOUCHER_STATUS.DRAFT
})

const statusType = computed(() => {
  if (!editingVoucher.value) return 'info'
  const s = editingVoucher.value.status
  return s === VOUCHER_STATUS.DRAFT ? 'warning' : s === VOUCHER_STATUS.APPROVED ? 'success' : 'primary'
})

const statusText = computed(() => {
  if (!editingVoucher.value) return ''
  return VOUCHER_STATUS_CN[editingVoucher.value.status] || editingVoucher.value.status
})

function handleBalanceCheck(result) {
  balanceInfo.value = result
}

function initNewVoucher() {
  editingVoucher.value = null
  voucherNo.value = ''
  voucherDate.value = todayStr()
  attachments.value = 0
  entries.value = getDefaultEntries()
  errorMessages.value = []
  checkResult.value = []
  hintLevel.value = 0
  loadTutorialTask()
}

function getDefaultEntries() {
  return [
    { id: 'e1', summary: '', subjectId: '', subjectCode: '', subjectName: '', debit: null, credit: null },
    { id: 'e2', summary: '', subjectId: '', subjectCode: '', subjectName: '', debit: null, credit: null },
  ]
}

async function handleSave() {
  if (isReadonly.value) {
    ElMessage.warning('已审核或已过账的凭证不能修改')
    return
  }

  // 教学模式下：保存即检查答案，不再生成草稿凭证
  if (tutorialTask.value) {
    await checkAnswer()
    return
  }

  // 教学期间阻止手动新增凭证（防御性保护）
  if (localStorage.getItem('teaching_active') === 'true') {
    ElMessage.warning('💡 教学期间由系统自动管理凭证，不支持手动新增。如需练习请在浮动窗切换至「自由练习」模式。')
    return
  }

  saving.value = true
  errorMessages.value = []

  // 构建凭证数据
  const voucherData = {
    date: voucherDate.value,
    period: currentPeriod.value,
    attachments: attachments.value,
    entries: entries.value.map(e => ({
      summary: e.summary,
      subjectId: e.subjectId,
      subjectCode: e.subjectCode,
      subjectName: e.subjectName,
      debit: e.debit || 0,
      credit: e.credit || 0,
    })),
  }

  // 校验
  const validation = validateVoucher(voucherData)
  if (!validation.valid) {
    errorMessages.value = validation.errors
    saving.value = false
    return
  }

  let result
  if (editingVoucher.value) {
    // 更新已有凭证
    result = store.updateVoucher(editingVoucher.value.id, voucherData)
  } else {
    // 新增凭证
    result = store.addVoucher(voucherData)
  }

  if (result.success) {
    ElMessage.success(editingVoucher.value ? '凭证已更新' : '凭证已保存')
    // 引导模式：保存后自动比对答案
    if (guidedMode.value && tutorialTask.value) {
      setTimeout(() => checkAnswer(), 300)
    }
    initNewVoucher()
  } else {
    errorMessages.value = result.errors || [result.error || '保存失败']
  }

  saving.value = false
}

async function handleSaveNew() {
  await handleSave()
  // handleSave 会调用 initNewVoucher，已经重置为新凭证
}

function handleReset() {
  if (editingVoucher.value && !isReadonly.value) {
    // 编辑模式：重新加载原数据
    loadVoucher(editingVoucher.value.id)
  } else if (tutorialTask.value) {
    // 教学模式下：清空已填入内容，不重新加载教学任务数据
    entries.value = getDefaultEntries()
    voucherDate.value = todayStr()
    attachments.value = 0
    hintLevel.value = 0
    resetHint()
    errorMessages.value = []
    checkResult.value = []
    ElMessage.info('已清空已填内容')
    return
  } else {
    initNewVoucher()
  }
  errorMessages.value = []
  ElMessage.info('已重置')
}

function loadVoucher(id) {
  const voucher = store.getVoucherById(id)
  if (!voucher) return

  editingVoucher.value = voucher
  voucherNo.value = voucher.voucherNo
  voucherDate.value = voucher.date
  attachments.value = voucher.attachments
  entries.value = voucher.entries.map(e => ({
    id: e.id,
    summary: e.summary,
    subjectId: e.subjectId,
    subjectCode: e.subjectCode,
    subjectName: e.subjectName,
    debit: e.debit,
    credit: e.credit,
    _editing: false,
  }))
}

function formatAmt(val) {
  return `¥${formatAmount(val)}`
}

// 暴露方法供父组件或路由调用（凭证查询跳转编辑时）
defineExpose({ loadVoucher, initNewVoucher })

// 监听路由参数，编辑已有凭证
// 根据完整科目编码查找科目对象
function findSubjectByFullCode(fullCode) {
  const subjects = store.state.subjects
  for (const s of subjects) {
    // 构建完整编码（沿着父链向上拼接）
    let code = s.code
    let parent = s.parentId ? subjects.find(p => p.id === s.parentId) : null
    while (parent) {
      code = parent.code + code
      parent = parent.parentId ? subjects.find(p => p.id === parent.parentId) : null
    }
    if (code === fullCode) return s
  }
  return null
}

// Load tutorial task from localStorage
function loadTutorialTask() {
  try {
    const raw = localStorage.getItem('tutorial_task')
    const mode = route.query.mode || localStorage.getItem('tutorial_mode') || 'practice'
    tutorialMode.value = mode

    if (raw) {
      tutorialTask.value = JSON.parse(raw)
      const t = tutorialTask.value
      if (t.date) voucherDate.value = t.date

      // ⭐ 检查是否已完成（按课程学模式下锁定，防止重复提交）
      if (!t.caseEventId && localStorage.getItem('teaching_active') === 'true' && !store.isPracticeMode()) {
        const doneKey = 'tutorial_done_' + t.date + '_' + t.title
        if (localStorage.getItem(doneKey) === 'true') {
          isCompletedTask.value = true
          // 预填正确答案，只读展示
          if (t.entries && t.entries.length > 0) {
            entries.value = t.entries.map((e, i) => {
              const subject = findSubjectByFullCode(e.subjectCode)
              return {
                id: 'te' + (i + 1),
                summary: e.summary || '',
                subjectId: subject ? subject.id : '',
                subjectCode: e.subjectCode,
                subjectName: subject ? subject.name : '',
                debit: e.debit || null,
                credit: e.credit || null,
              }
            })
          }
          return // 跳过后续预填逻辑
        }
      }

      // 预填附件数
      if (t.documents && t.documents.length > 0) {
        attachments.value = t.documents.length
      }

      // 分步引导模式（引导模式的默认行为）
      if (guidedMode.value && t.entries && t.entries.length > 0) {
        const stepByStep = localStorage.getItem('tutorial_stepByStep') !== 'false'
        if (stepByStep) {
          // 分步引导：暂不预填，等引导完成后填充
          showStepByStep.value = true
          entries.value = getDefaultEntries()
        } else {
          // 快速模式：直接预填（旧行为）
          showStepByStep.value = false
          entries.value = t.entries.map((e, i) => {
            const subject = findSubjectByFullCode(e.subjectCode)
            return {
              id: 'te' + (i + 1),
              summary: e.summary || '',
              subjectId: subject ? subject.id : '',
              subjectCode: e.subjectCode,
              subjectName: subject ? subject.name : '',
              debit: e.debit || null,
              credit: e.credit || null,
            }
          })
        }
      }

      // 练习模式：只预填摘要，科目和金额留空
      if (practiceMode.value && t.entries && t.entries.length > 0) {
        entries.value = t.entries.map((e, i) => ({
          id: 'te' + (i + 1),
          summary: e.summary || '',
          subjectId: '',
          subjectCode: '',
          subjectName: '',
          debit: null,
          credit: null,
        }))
      }
    }
  } catch { tutorialTask.value = null }
}

let checkAnswerLocked = false
function checkAnswer() {
  if (checkAnswerLocked) { return }
  checkAnswerLocked = true
  setTimeout(() => { checkAnswerLocked = false }, 1000)

  // ⭐ 已完成任务禁止再次提交（本地锁 + localStorage双重保险）
  if (isCompletedTask.value) {
    ElMessage.info('✅ 此任务已完成，不可重复提交。如需练习请切换至🎯自由练习模式。')
    return
  }

  const userEntries = entries.value.map(function(e) {
    return { subjectCode: e.subjectCode || '', subjectName: e.subjectName || '', debit: Number(e.debit) || 0, credit: Number(e.credit) || 0 }
  })
  const correct = tutorialTask.value?.entries || []
  if (correct.length === 0) { ElMessage.warning('该任务无需录入凭证'); return }
  const result = compareAnswers(userEntries, correct)
  checkResult.value = result
  // Show results
  const errors = result.filter(function(r) { return r.type === 'error' })
  // 更新标签统计（用于错题强化推送）
  updateTagStats(tutorialTask.value, errors.length === 0)
  if (errors.length === 0) {
    // ── 自由模式 ──
    if (store.isPracticeMode()) {
      // 不过账、不给XP、不标记完成、不更新错题本
      window.dispatchEvent(new CustomEvent('task-updated'))
      ElMessageBox.alert(h('div', [
        h('div', { style: 'background:#fdf6ec;border-radius:6px;padding:8px 12px;margin-bottom:10px;display:flex;align-items:center;gap:8px' },
          '🎯 自由练习 · 答案正确',
        ),
        h('p', { style: 'font-size:13px;color:#606266;margin-top:8px' },
          '自由模式下不记录进度、不发放XP、不过账。可随时切换回"按课程学"模式继续正式学习。'),
        h('div', { style: 'margin-top:10px;display:flex;gap:6px;flex-wrap:wrap' }, result.map(function(r) {
          const icon = r.type === 'success' ? '✅' : '⚠️'
          return h('div', { style: 'font-size:12px;color:#606266' }, icon + ' ' + r.message)
        })),
      ]), '🎯 自由练习', {
        confirmButtonText: '继续练习',
        type: 'success',
        dangerouslyUseHTMLString: false,
      })
      return
    }

    // ── 正常模式 ──
    const isCaseMode = tutorialTask.value && tutorialTask.value.caseEventId
    const caseId = isCaseMode ? tutorialTask.value.caseId : null
    const eventId = isCaseMode ? tutorialTask.value.caseEventId : null

    let doneKey, alreadyDone
    if (isCaseMode) {
      doneKey = 'case_done_' + caseId + '_' + eventId
    } else {
      doneKey = 'tutorial_done_' + tutorialTask.value.date + '_' + tutorialTask.value.title
    }
    alreadyDone = localStorage.getItem(doneKey) === 'true'

    // 标记完成
    localStorage.setItem(doneKey, 'true')
    // ⭐ 立即锁住当前页面，防止重复提交
    if (!store.isPracticeMode() && !isCaseMode) {
      isCompletedTask.value = true
    }
    if (!isCaseMode) removeFromWrongAnswers(tutorialTask.value)
    window.dispatchEvent(new CustomEvent('task-updated'))

    if ((guidedMode.value || practiceMode.value) && !alreadyDone) {
      const entries = tutorialTask.value.entries.map(e => {
        const subject = findSubjectByFullCode(e.subjectCode)
        return {
          summary: e.summary || '',
          subjectId: subject ? subject.id : '',
          subjectCode: e.subjectCode,
          subjectName: subject ? subject.name : '',
          debit: e.debit || 0,
          credit: e.credit || 0,
        }
      })
      const postResult = store.addTeachingVoucher({
        date: tutorialTask.value.date,
        entries,
      })
      if (postResult.success) {
        lastPostedPeriod.value = tutorialTask.value.date.substring(0, 7).replace('-', '')
        ElMessage.success('✅ 分录正确！已自动过账' + (isCaseMode ? '' : '至教学账套'))
      }
    }
  } else {
    // 有错
    if (!tutorialTask.value?.caseEventId && !store.isPracticeMode()) {
      saveWrongAnswer(tutorialTask.value, errors, userEntries)
      store.breakStreak()
    }
    ElMessage.warning('还有 ' + errors.length + ' 处需要修改，红色提示为答错项')
  }

  // 比对结果详情
  const details = result.map(function(r) {
    const icon = r.type === 'success' ? '✅' : r.type === 'error' ? '❌' : '⚠️'
    let text = icon + ' ' + r.message
    if (r.explanation) text += '\n   📖 ' + r.explanation
    return text
  }).join('\n\n')
  const guidance = guidedMode.value && errors.length > 0
    ? '\n\n💡 提示：可修改后重新保存再次比对'
    : ''

  if (errors.length === 0 && lastPostedPeriod.value && !store.isPracticeMode()) {
    // 全部正确 + 已自动过证 + 非自由模式 → 展示结果弹窗
    const isCaseMode = tutorialTask.value && tutorialTask.value.caseEventId

    if (isCaseMode) {
      ElMessageBox.alert('', '✅ 业务完成！已自动过账', {
        message: h('div', [
          h('div', { style: 'background:#f0f9eb;border-radius:6px;padding:8px 12px;margin-bottom:10px;display:flex;align-items:center;gap:8px' },
            '🎉 分录正确！可继续下一笔业务',
          ),
          h('p', { style: 'font-size:13px;color:#606266;margin-top:8px' },
            '完成所有业务后，可在案例详情页查看企业完整的三大财务报表。'),
        ]),
        dangerouslyUseHTMLString: false,
        showCancelButton: false,
        confirmButtonText: '继续',
      })
    } else {
      const xpResult = store.completeTask(tutorialTask.value, tutorialMode.value, true)
      const xpEarned = xpResult.xpEarned

      ElMessageBox.alert('', '🎉 全部正确！已自动过账', {
        message: h('div', [
          h('div', { style: 'background:#f0f9eb;border-radius:6px;padding:8px 12px;margin-bottom:10px;display:flex;align-items:center;gap:10px;flex-wrap:wrap' }, [
            h('span', { style: 'font-size:14px' }, '✨ +' + xpEarned + ' XP'),
            xpResult.didLevelUp ? h('span', { style: 'font-size:14px;font-weight:600;color:#e6a23c' },
              '⬆ 升级！' + xpResult.levelInfo.icon + ' ' + xpResult.levelInfo.title
            ) : null,
            h('span', { style: 'font-size:12px;color:#909399' },
              xpResult.levelInfo.icon + ' Lv.' + xpResult.levelInfo.level + ' ' + xpResult.levelInfo.title
            ),
          ]),
          ...(xpResult.newlyUnlocked?.length ? [
            h('div', { style: 'background:#fff7e6;border-radius:6px;padding:8px 12px;margin-bottom:10px' },
              '🏅 解锁成就：' + xpResult.newlyUnlocked.map(a => a.icon + ' ' + a.title).join('、')
            ),
          ] : []),
          h('p', '分录已过账至教学账套，可查看报表了解这项业务对财务状况的影响。'),
          h('p', { style: 'color: #909399; font-size: 12px; margin-top: 8px; line-height: 1.6' },
            '💡 在真实财务软件中，凭证需经会计主管审核后方可过账。',
            '本系统为教学体验，由系统自动完成过账。'),
          h('div', { style: 'margin-top: 12px; display: flex; gap: 8px; flex-wrap: wrap' }, [
            h('el-button', {
              type: 'primary',
              size: 'small',
              onClick: () => router.push('/reports/balance-sheet?period=' + lastPostedPeriod.value),
            }, '📊 资产负债表'),
            h('el-button', {
              size: 'small',
              onClick: () => router.push('/reports/income-statement?period=' + lastPostedPeriod.value),
            }, '📈 利润表'),
            h('el-button', {
              size: 'small',
              onClick: () => router.push('/accounting/trial-balance?period=' + lastPostedPeriod.value),
            }, '⚖️ 试算平衡表'),
          ]),
        ]),
        dangerouslyUseHTMLString: false,
        showCancelButton: false,
        confirmButtonText: '继续',
      })
    }
  } else if (errors.length === 0 && store.isPracticeMode()) {
    // 自由模式已经在前面return了，不会到这里
  } else {
    // 有错误或无需过账 → 普通结果弹窗（自由模式下不涉及XP）
    const isSuccess = errors.length === 0
    let xpInfo = null
    if (isSuccess && !store.isPracticeMode()) {
      xpInfo = store.completeTask(tutorialTask.value, tutorialMode.value, true)
    }
    const xpBlock = isSuccess && xpInfo ? h('div', { style: 'background:#f0f9eb;border-radius:6px;padding:8px 12px;margin-bottom:10px;display:flex;align-items:center;gap:10px;flex-wrap:wrap' }, [
      h('span', { style: 'font-size:14px' }, '✨ +' + xpInfo.xpEarned + ' XP'),
      xpInfo.didLevelUp ? h('span', { style: 'font-size:14px;font-weight:600;color:#e6a23c' }, '⬆ 升级！' + xpInfo.levelInfo.icon + ' ' + xpInfo.levelInfo.title) : null,
      h('span', { style: 'font-size:12px;color:#909399' }, xpInfo.levelInfo.icon + ' Lv.' + xpInfo.levelInfo.level + ' ' + xpInfo.levelInfo.title),
    ]) : null
    const achBlock = isSuccess && xpInfo?.newlyUnlocked?.length ? h('div', { style: 'background:#fff7e6;border-radius:6px;padding:8px 12px;margin-bottom:10px' }, '🏅 解锁成就：' + xpInfo.newlyUnlocked.map(a => a.icon + ' ' + a.title).join('、')) : null
    const msgChildren = [xpBlock, achBlock, h('div', details), h('div', guidance)].filter(Boolean)
    ElMessageBox.alert(h('div', msgChildren), isSuccess ? '🎉 恭喜完成！' : '比对结果', {
      confirmButtonText: '知道了',
      type: errors.length > 0 ? 'warning' : 'success',
      dangerouslyUseHTMLString: false,
    })
  }
}

// 分步引导完成 → 预填分录
function handleGuideComplete() {
  const t = tutorialTask.value
  if (t?.entries?.length) {
    entries.value = t.entries.map((e, i) => {
      const subject = findSubjectByFullCode(e.subjectCode)
      return {
        id: 'te' + (i + 1),
        summary: e.summary || '',
        subjectId: subject ? subject.id : '',
        subjectCode: e.subjectCode,
        subjectName: subject ? subject.name : '',
        debit: e.debit || null,
        credit: e.credit || null,
      }
    })
  }
  showStepByStep.value = false
  ElMessage.success('✅ 引导完成！请检查分录后点击"保存"')
}

// 跳过分步引导（快速模式）
function handleGuideSkip() {
  showStepByStep.value = false
  localStorage.setItem('tutorial_stepByStep', 'false')
  // 预填分录（旧引导模式行为）
  const t = tutorialTask.value
  if (guidedMode.value && t?.entries?.length) {
    entries.value = t.entries.map((e, i) => {
      const subject = findSubjectByFullCode(e.subjectCode)
      return {
        id: 'te' + (i + 1),
        summary: e.summary || '',
        subjectId: subject ? subject.id : '',
        subjectCode: e.subjectCode,
        subjectName: subject ? subject.name : '',
        debit: e.debit || null,
        credit: e.credit || null,
      }
    })
  }
  ElMessage.info('已切换为快速模式，分录已预填')
}

// 关闭引导（不预填，回到空白凭证）
function handleGuideClose() {
  showStepByStep.value = false
  // 不预填分录，保持空白状态让用户自行填写或切换模式
}

// 练习模式提示：逐级揭示
function clickHint() {
  if (hintLevel.value >= maxHintLevel.value) {
    // 已全部揭示 → 重置
    hintLevel.value = 0
    ElMessage.info('已清除所有提示，可从头开始挑战')
    return
  }
  hintLevel.value++
}

// 清除提示
function resetHint() {
  hintLevel.value = 0
}

// ─── 错题本 ───
function getWrongAnswers() {
  try {
    return JSON.parse(localStorage.getItem('tutorial_wrong_answers') || '[]')
  } catch { return [] }
}

function saveWrongAnswer(task, errors, userEntries) {
  if (!task) return
  const list = getWrongAnswers()
  const key = task.date + '_' + task.title
  // 检查是否已存在
  const existing = list.findIndex(item => item.key === key)
  const entry = {
    key,
    date: task.date,
    title: task.title,
    month: task._month || task.date.substring(5, 7),
    timestamp: Date.now(),
    errors: errors.map(e => e.message || '未知错误'),
    userSummary: userEntries.map(e => e.subjectCode || '(空)').join(', '),
    correctSummary: (task.entries || []).map(e => e.subjectCode).join(', '),
  }
  if (existing >= 0) {
    list[existing] = { ...list[existing], ...entry, retryCount: (list[existing].retryCount || 0) + 1 }
  } else {
    list.push({ ...entry, retryCount: 0 })
  }
  localStorage.setItem('tutorial_wrong_answers', JSON.stringify(list))
}

function removeFromWrongAnswers(task) {
  if (!task) return
  const key = task.date + '_' + task.title
  const list = getWrongAnswers().filter(item => item.key !== key)
  localStorage.setItem('tutorial_wrong_answers', JSON.stringify(list))
}

// ─── 标签错误率统计（错题强化推送用） ───
function updateTagStats(task, isCorrect) {
  if (!task || !task.tags || !task.tags.length) return
  try {
    const stats = JSON.parse(localStorage.getItem('tutorial_tag_stats') || '{}')
    for (const tag of task.tags) {
      if (!stats[tag]) stats[tag] = { attempted: 0, wrong: 0 }
      stats[tag].attempted++
      if (!isCorrect) stats[tag].wrong++
    }
    localStorage.setItem('tutorial_tag_stats', JSON.stringify(stats))
  } catch { /* ignore */ }
}

// 键盘快捷键
function handleKeydown(e) {
  // Ctrl+S 保存
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault()
    handleSave()
  }
  // Esc 取消选中
  if (e.key === 'Escape') {
    document.activeElement?.blur()
  }
  // F8：借贷互换
  if (e.key === 'F8') {
    e.preventDefault()
    const active = document.activeElement
    if (active) {
      const rowEl = active.closest('.el-table__row')
      if (rowEl) {
        const rowIndex = rowEl.dataset.index !== undefined ? parseInt(rowEl.dataset.index) : -1
        if (rowIndex >= 0 && rowIndex < entries.value.length) {
          const row = entries.value[rowIndex]
          const db = Number(row.debit) || 0
          const cr = Number(row.credit) || 0
          if (db !== 0 || cr !== 0) {
            row.debit = cr || null
            row.credit = db || null
          }
        }
      }
    }
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  // 初始化 stepIndex
  stepIndex.value = guidedMode.value ? 0 : practiceMode.value ? 1 : 2
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)
})

watch(() => route.query, (query) => {
  if (query.id) {
    loadVoucher(query.id)
  } else {
    initNewVoucher()
  }
}, { immediate: true })
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
}
.page-title { font-size: 20px; color: #303133; margin: 0; }
.page-desc { font-size: 13px; color: #909399; margin-top: 4px; display: block; }
.page-actions { display: flex; gap: 8px; flex-wrap: wrap; }

/* 快捷键提示条 */
.shortcut-bar {
  display: flex;
  gap: 16px;
  margin-bottom: 10px;
  padding: 6px 12px;
  background: #f5f7fa;
  border: 1px solid #e4e7ed;
  border-radius: 6px;
  font-size: 12px;
  color: #909399;
}
.shortcut-item { display: flex; align-items: center; gap: 4px; }
.shortcut-item kbd {
  display: inline-block;
  padding: 1px 5px;
  font-size: 11px;
  font-family: inherit;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 3px;
  box-shadow: 0 1px 0 #d9d9d9;
  line-height: 1.4;
}

/* 教学步骤条 */
.teaching-stepbar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
  padding: 8px 12px;
  background: #f0f5ff;
  border: 1px solid #d6e4ff;
  border-radius: 8px;
  font-size: 12px;
}
.stepbar-mode-tag {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}
.stepbar-title {
  font-weight: 600;
  color: #303133;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.stepbar-steps {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;
}
.stepbar-step {
  display: flex;
  align-items: center;
  gap: 4px;
  opacity: 0.4;
  transition: opacity 0.3s;
}
.stepbar-step.active { opacity: 1; }
.step-num {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #d9d9d9;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
  transition: background 0.3s;
}
.stepbar-step.active .step-num { background: #409eff; }
.step-text { font-size: 12px; color: #606266; white-space: nowrap; }
.stepbar-arrow { color: #c0c4cc; font-size: 12px; }
.stepbar-hint-bar {
  display: flex;
  gap: 4px;
  flex-shrink: 0;
}

/* 提示面板（过渡动画） */
.hint-panel {
  margin-bottom: 10px;
  padding: 10px 14px;
  background: #fff8e6;
  border: 1px solid #f0d78a;
  border-radius: 6px;
  font-size: 12px;
  line-height: 1.7;
}
.hint-fade-enter-active, .hint-fade-leave-active { transition: all 0.3s ease; }
.hint-fade-enter-from, .hint-fade-leave-to { opacity: 0; transform: translateY(-6px); }
.hint-line {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  padding: 2px 0;
}
.hint-icon {
  flex-shrink: 0;
  font-size: 13px;
  color: #e6a23c;
  width: 16px;
  text-align: center;
}
.hint-content {
  color: #7a6a2e;
}

/* 凭证卡片（纸纹背景） */
.voucher-card {
  border: 2px solid #d9d9d9;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.voucher-paper {
  background-image:
    repeating-linear-gradient(0deg, transparent, transparent 26px, #f0f0f0 26px, #f0f0f0 27px),
    linear-gradient(135deg, #fafafa 0%, #fefefe 100%);
  background-size: 100% 27px, 100%;
}

.voucher-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  background: rgba(248,249,251,0.9);
  border-bottom: 1px solid #e8e8e8;
}
.voucher-info {
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
}
.info-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
}
.info-label { color: #606266; white-space: nowrap; }
.info-value { color: #303133; }
.voucher-no { font-weight: 600; color: #409eff; font-family: monospace; }
.info-unit { color: #909399; font-size: 12px; }
.voucher-period {
  font-size: 13px;
  color: #909399;
}
.voucher-body {
  padding: 0;
}

/* 凭证尾 */
.voucher-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  border-top: 1px solid #e8e8e8;
  background: rgba(248,249,251,0.9);
  font-size: 12px;
}
.footer-left {
  display: flex;
  gap: 16px;
}
.footer-label { color: #909399; }
.footer-right {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: monospace;
  font-weight: 600;
}
.footer-right.error { color: #f56c6c; }
.footer-debit { color: #e6a23c; }
.footer-debit em { font-style: normal; }
.footer-credit { color: #67c23a; }
.footer-credit em { font-style: normal; }
.footer-badge {
  padding: 1px 6px;
  border-radius: 3px;
  font-size: 11px;
  font-family: inherit;
}
.footer-badge.ok { background: #f0f9eb; color: #67c23a; }
.footer-badge.err { background: #fef0f0; color: #f56c6c; }

.error-messages {
  margin-top: 16px;
}

/* 答案弹窗样式 */
:deep(.answer-entry) { background:#f8f9fb; border:1px solid #ebeef5; border-radius:6px; padding:10px 12px; }
:deep(.answer-header) { display:flex; align-items:center; gap:8px; flex-wrap:wrap; font-size:13px; }
:deep(.answer-num) { background:#409eff; color:#fff; padding:0 6px; border-radius:3px; font-size:11px; font-weight:600; }
:deep(.answer-subject) { font-family:monospace; font-weight:600; color:#303133; }
:deep(.answer-summary) { color:#606266; font-size:12px; }
:deep(.answer-amount) { margin-left:auto; display:flex; gap:6px; }
:deep(.amount-debit) { color:#e6a23c; font-weight:600; font-family:monospace; }
:deep(.amount-credit) { color:#67c23a; font-weight:600; font-family:monospace; }

/* ─── 案例原始凭证预览 ─── */
.case-documents {
  background: var(--bg-card, #fff);
  border: 1px solid var(--border, #e4e7ed);
  border-radius: 10px;
  padding: 14px 16px;
  margin-bottom: 14px;
}
.documents-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text, #303133);
  margin-bottom: 10px;
}
.documents-gallery {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.document-thumb {
  width: 120px;
  padding: 12px 8px;
  background: var(--bg, #f0f2f5);
  border: 1px solid var(--border-light, #ebeef5);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  text-align: center;
}
.document-thumb:hover {
  border-color: var(--accent, #409eff);
  transform: translateY(-2px);
  box-shadow: 0 3px 10px rgba(0,0,0,0.08);
}
.thumb-icon { font-size: 24px; }
.thumb-title {
  font-size: 11px;
  color: var(--text-secondary, #606266);
  line-height: 1.3;
  word-break: break-all;
}

/* ─── 灯箱 ─── */
.lightbox-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.75);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.lightbox-content {
  position: relative;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 12px 48px rgba(0,0,0,0.3);
}
.lightbox-close {
  position: absolute;
  top: 8px;
  right: 12px;
  background: none;
  border: none;
  font-size: 20px;
  color: #909399;
  cursor: pointer;
  z-index: 10;
  line-height: 1;
}
.lightbox-close:hover { color: #303133; }
.lightbox-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid #e4e7ed;
}
.lightbox-counter { font-size: 13px; color: #909399; }
</style>
