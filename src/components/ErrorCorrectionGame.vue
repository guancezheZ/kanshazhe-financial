<template>
  <div class="error-correction-game">
    <div class="ec-header">
      <span class="ec-title">🔍 纠错训练</span>
      <span class="ec-subtitle">以下凭证分录中可能包含错误，请找出并修正</span>
    </div>

    <!-- 难度选择 -->
    <div v-if="!started" class="ec-difficulty">
      <div class="ec-diff-title">选择难度：</div>
      <el-radio-group v-model="difficulty" size="small">
        <el-radio-button value="easy">😊 简单</el-radio-button>
        <el-radio-button value="medium">🤔 中等</el-radio-button>
        <el-radio-button value="hard">😈 困难</el-radio-button>
      </el-radio-group>
      <el-button type="primary" size="small" @click="startGame" class="ec-start-btn">开始纠错</el-button>
    </div>

    <!-- 游戏进行中 -->
    <div v-else class="ec-game">
      <!-- 任务描述 -->
      <div class="ec-desc">{{ taskTitle }}</div>

      <!-- 错误计数 -->
      <div class="ec-counter">
        <span>已标记：{{ markedWrong }}/{{ totalErrors }} 个错误</span>
        <span v-if="markedWrong > totalErrors" class="ec-over">⚠️ 标记超过错误数了！</span>
      </div>

      <!-- 分录列表（可点击标记错误） -->
      <div class="ec-entries">
        <div
          v-for="(entry, i) in gameEntries" :key="i"
          class="ec-entry"
          :class="{
            'ec-entry-wrong': entry._playerMarked,
            'ec-entry-correct': entry._revealed && !entry._isError,
            'ec-entry-revealed-wrong': entry._revealed && entry._isError,
          }"
          @click="toggleMark(i)"
        >
          <div class="ec-entry-header">
            <span class="ec-entry-num">第{{ i + 1 }}条</span>
            <el-tag
              v-if="entry._isError && entry._revealed"
              size="small"
              type="danger"
              effect="dark"
              class="ec-error-tag"
            >❌ 有错</el-tag>
            <el-tag
              v-else-if="!entry._isError && entry._revealed"
              size="small"
              type="success"
              effect="dark"
              class="ec-correct-tag"
            >✅ 正确</el-tag>
            <span v-if="entry._playerMarked" class="ec-marked-badge">📍 已标记</span>
          </div>

          <div class="ec-entry-body">
            <span class="ec-subject">{{ getSubjectName(entry.subjectCode) }}</span>
            <span class="ec-summary">{{ entry.summary }}</span>
            <span v-if="entry.debit > 0" class="ec-amount ec-debit">借 ¥{{ fmt(entry.debit) }}</span>
            <span v-if="entry.credit > 0" class="ec-amount ec-credit">贷 ¥{{ fmt(entry.credit) }}</span>
          </div>

          <!-- 错误说明（揭示后显示） -->
          <div v-if="entry._isError && entry._revealed && entry._errorExplanation" class="ec-error-detail">
            <div class="ec-error-type">{{ entry._errorTypeLabel }}</div>
            <div class="ec-error-msg">{{ entry._errorExplanation }}</div>
            <div class="ec-correction">
              正确应为：
              <span class="ec-correction-subject">{{ getSubjectName(entry._original.subjectCode) }}</span>
              <span v-if="entry._original.debit > 0" class="ec-correction-amount ec-debit">借 ¥{{ fmt(entry._original.debit) }}</span>
              <span v-else class="ec-correction-amount ec-credit">贷 ¥{{ fmt(entry._original.credit) }}</span>
              <span class="ec-correction-summary">{{ entry._original.summary }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="ec-actions">
        <el-button
          v-if="!revealed"
          size="small"
          type="primary"
          :disabled="markedWrong === 0"
          @click="checkAnswer"
        >
          ✅ 提交检查
        </el-button>
        <el-button v-if="!revealed" size="small" @click="giveUp">😵 投降</el-button>
        <el-button v-if="revealed" size="small" type="primary" @click="nextRound">下一轮</el-button>
        <el-button size="small" class="ec-quit-btn" @click="quit">退出纠错</el-button>
      </div>

      <!-- 检查结果 -->
      <div v-if="revealed" class="ec-result">
        <div v-if="score === totalErrors && markedWrong === totalErrors" class="ec-result-perfect">
          🎉 完美！你找出了所有 {{ totalErrors }} 个错误！
        </div>
        <div v-else-if="score > 0" class="ec-result-good">
          👍 找出了 {{ score }}/{{ totalErrors }} 个错误
          <span v-if="markedWrong > totalErrors">（多标记了 {{ markedWrong - totalErrors }} 个正确的分录）</span>
        </div>
        <div v-else class="ec-result-bad">
          😅 没有找出错误，看看正确答案吧
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { formatAmount } from '@/utils/accounting.js'
import { ElMessage } from 'element-plus'
import { useStore } from '@/stores/store.js'

const props = defineProps({
  entries: { type: Array, default: () => [] },
  taskTitle: { type: String, default: '' },
})

const emit = defineEmits(['complete', 'quit'])

const store = useStore()
const fmt = formatAmount

// 科目名称查找（解析完整编码如 '100201' → 银行存款(1002) + 工商银行(01)）
function getSubjectName(fullCode) {
  if (!fullCode) return fullCode || ''
  const subjects = store.state.subjects || []
  // 根据完整编码查找末级科目对象（沿父链向上拼接code比对）
  for (const s of subjects) {
    let code = s.code
    let parent = s.parentId ? subjects.find(p => p.id === s.parentId) : null
    while (parent) {
      code = parent.code + code
      parent = parent.parentId ? subjects.find(p => p.id === parent.parentId) : null
    }
    if (code === fullCode) {
      // 沿父链向下收集名称：银行存款-工商银行
      const names = [s.name]
      let p = s.parentId ? subjects.find(x => x.id === s.parentId) : null
      while (p) {
        names.unshift(p.name)
        p = p.parentId ? subjects.find(x => x.id === p.parentId) : null
      }
      return `${names.join('-')}(${fullCode})`
    }
  }
  return fullCode
}

const difficulty = ref('easy')
const started = ref(false)
const revealed = ref(false)
const gameEntries = ref([])
const totalErrors = computed(() => gameEntries.value.filter(e => e._isError).length)
const markedWrong = computed(() => gameEntries.value.filter(e => e._playerMarked).length)
const score = computed(() => gameEntries.value.filter(e => e._isError && e._playerMarked).length)

// 相似科目映射（用于错误注入）
const SIMILAR_SUBJECTS = {
  '6601': '6602', // 销售费用 ↔ 管理费用
  '6602': '6601',
  '1001': '100201', // 库存现金 ↔ 银行存款-工行
  '100201': '1001',
  '6001': '6051', // 主营业务收入 ↔ 其他业务收入
  '6051': '6001',
  '6401': '6402', // 主营业务成本 ↔ 其他业务成本
  '6402': '6401',
  '1403': '1405', // 原材料 ↔ 库存商品
  '1405': '1403',
  '112201': '112202', // 应收账款-甲 ↔ 应收账款-乙
  '112202': '112201',
  '220201': '220202', // 应付账款-甲 ↔ 应付账款-乙
  '220202': '220201',
}

function startGame() {
  if (!props.entries || props.entries.length === 0) {
    ElMessage.warning('该任务无分录数据，无法进行纠错训练')
    return
  }

  const errorCount = { easy: 1, medium: 2, hard: 3 }[difficulty.value] || 1
  const maxErrors = Math.min(errorCount, props.entries.length)

  // 复制正确条目
  const entries = props.entries.map(e => ({
    ...e,
    _playerMarked: false,
    _isError: false,
    _revealed: false,
    _errorType: null,
    _errorTypeLabel: '',
    _errorExplanation: '',
    _original: null,
  }))

  // 随机选要注入错误的分录
  const indices = shuffle([...Array(entries.length).keys()]).slice(0, maxErrors)

  for (const idx of indices) {
    const entry = entries[idx]
    const errorType = pick(['subjectSwap', 'directionReverse', 'amountChange', 'imbalance'])
    entry._isError = true
    entry._original = { ...entry }

    switch (errorType) {
      case 'subjectSwap': {
        const replacementCode = SIMILAR_SUBJECTS[entry.subjectCode]
        if (replacementCode) {
          const origName = getSubjectName(entry.subjectCode)
          const replName = getSubjectName(replacementCode)
          entry.subjectCode = replacementCode
          entry._errorTypeLabel = '📌 科目错误'
          entry._errorExplanation = `科目使用不当。正确的科目应为"${origName}"，而非"${replName}"。不同科目反映不同的经济业务性质。`
        } else {
          // 没有可替换的科目，改为方向反转
          const tmp = entry.debit
          entry.debit = entry.credit
          entry.credit = tmp
          entry._errorTypeLabel = '🔄 方向错误'
          entry._errorExplanation = `借贷方向反了。"${entry._original.summary}"业务中，正确的处理是：${entry._original.debit > 0 ? '借方' : '贷方'}记"${entry._original.subjectCode}"。借贷方向错误会导致科目余额方向异常。`
        }
        break
      }
      case 'directionReverse': {
        const tmp = entry.debit
        entry.debit = entry.credit
        entry.credit = tmp
        entry._errorTypeLabel = '🔄 方向错误'
        entry._errorExplanation = `借贷方向反了。"${entry._original.summary}"业务中，${entry._original.debit > 0 ? '应记借方' : '应记贷方'}。确认业务类型：资产增加/费用发生记借方，负债增加/收入发生记贷方。`
        break
      }
      case 'amountChange': {
        const factor = pick([1.5, 2, 0.5, 0.3])
        const origAmount = entry.debit > 0 ? entry.debit : entry.credit
        const newAmount = Math.round(origAmount * factor)
        if (entry.debit > 0) {
          entry.debit = newAmount
        } else {
          entry.credit = newAmount
        }
        entry._errorTypeLabel = '💰 金额错误'
        entry._errorExplanation = `金额不正确。正确的金额应为 ${origAmount} 元（原金额${factor > 1 ? '×' + factor : '×' + factor}是错误的）。金额错误会导致账目不平或财务数据失真。`
        break
      }
      case 'imbalance': {
        // 在某个金额上加一个随机值，使借贷不平
        if (entry.debit > 0) {
          entry.debit = Math.round(entry.debit * 1.1)
        } else {
          entry.credit = Math.round(entry.credit * 1.1)
        }
        entry._errorTypeLabel = '⚖️ 借贷不平衡'
        entry._errorExplanation = `该分录导致借贷不平衡。正确的${entry._original.debit > 0 ? '借方' : '贷方'}金额应为 ${entry._original.debit > 0 ? entry._original.debit : entry._original.credit} 元。借贷记账法要求每笔分录有借必有贷，借贷必相等。`
        break
      }
    }
  }

  gameEntries.value = entries
  revealed.value = false
  started.value = true
}

function toggleMark(idx) {
  if (revealed.value) return
  gameEntries.value[idx]._playerMarked = !gameEntries.value[idx]._playerMarked
}

function checkAnswer() {
  revealed.value = true
  const found = score.value
  const total = totalErrors.value
  if (found === total) {
    ElMessage.success(`🎉 太棒了！全部找出！(${found}/${total})`)
  } else if (found > 0) {
    ElMessage.warning(`找出了 ${found}/${total} 个错误`)
  } else {
    ElMessage.info('没有找出错误，再看看正确答案吧')
  }
}

function giveUp() {
  revealed.value = true
  ElMessage.info('已揭示正确答案')
}

function nextRound() {
  startGame()
}

function quit() {
  emit('quit')
}

// 工具函数
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}
</script>

<style scoped>
.error-correction-game {
  font-size: 13px;
}
.ec-header {
  text-align: center;
  padding: 8px 0;
}
.ec-title {
  font-size: 15px;
  font-weight: 600;
  color: #e6a23c;
}
.ec-subtitle {
  font-size: 11px;
  color: #909399;
  margin-left: 6px;
}
.ec-difficulty {
  text-align: center;
  padding: 20px 0;
}
.ec-diff-title {
  margin-bottom: 8px;
  color: #606266;
}
.ec-start-btn {
  display: block;
  margin: 16px auto 0;
}
.ec-game {
  padding: 0 4px;
}
.ec-desc {
  font-size: 12px;
  color: #606266;
  background: #f5f7fa;
  padding: 8px 10px;
  border-radius: 4px;
  margin-bottom: 8px;
  line-height: 1.5;
}
.ec-counter {
  text-align: center;
  font-size: 12px;
  color: #909399;
  margin-bottom: 8px;
}
.ec-over {
  color: #f56c6c;
  margin-left: 8px;
}
.ec-entries {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.ec-entry {
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 8px 10px;
  cursor: pointer;
  transition: all 0.15s;
  background: #fff;
}
.ec-entry:hover {
  border-color: #c0c4cc;
}
.ec-entry-wrong {
  border-color: #f56c6c;
  background: #fef0f0;
}
.ec-entry-correct {
  border-color: #67c23a;
  background: #f0f9eb;
}
.ec-entry-revealed-wrong {
  border-color: #f56c6c;
  background: #fef0f0;
}
.ec-entry-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
}
.ec-entry-num {
  font-size: 10px;
  color: #c0c4cc;
}
.ec-error-tag, .ec-correct-tag {
  font-size: 9px !important;
  height: 16px !important;
  line-height: 14px !important;
  padding: 0 4px !important;
}
.ec-marked-badge {
  font-size: 10px;
  color: #f56c6c;
}
.ec-entry-body {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}
.ec-subject {
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: #409eff;
  background: #ecf5ff;
  padding: 1px 5px;
  border-radius: 2px;
}
.ec-summary {
  font-size: 12px;
  color: #303133;
  flex: 1;
}
.ec-amount {
  font-size: 12px;
  font-weight: 600;
  font-family: 'Courier New', monospace;
}
.ec-debit { color: #f56c6c; }
.ec-credit { color: #409eff; }
.ec-error-detail {
  margin-top: 6px;
  padding: 6px 8px;
  background: #fff;
  border-radius: 4px;
  border-left: 3px solid #f56c6c;
}
.ec-error-type {
  font-size: 11px;
  font-weight: 600;
  color: #f56c6c;
  margin-bottom: 2px;
}
.ec-error-msg {
  font-size: 11px;
  color: #606266;
  line-height: 1.5;
}
.ec-correction {
  font-size: 11px;
  color: #67c23a;
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
}
.ec-correction-subject {
  font-family: 'Courier New', monospace;
  background: #f0f9eb;
  padding: 0 4px;
  border-radius: 2px;
}
.ec-correction-amount {
  font-weight: 600;
  font-family: 'Courier New', monospace;
}
.ec-correction-summary {
  color: #909399;
}
.ec-actions {
  text-align: center;
  margin-top: 8px;
  display: flex;
  gap: 4px;
  justify-content: center;
}
.ec-result {
  text-align: center;
  margin-top: 6px;
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}
.ec-result-perfect { background: #f0f9eb; color: #67c23a; }
.ec-result-good { background: #fdf6ec; color: #e6a23c; }
.ec-result-bad { background: #fef0f0; color: #f56c6c; }
</style>
