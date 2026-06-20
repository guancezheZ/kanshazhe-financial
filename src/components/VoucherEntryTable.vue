<template>
  <div class="entry-table-wrapper">
    <el-table
      :data="entries"
      border
      stripe
      size="small"
      class="entry-table"
      highlight-current-row

    >
      <el-table-column label="#" width="40" align="center">
        <template #default="{ $index }">
          <span class="row-num">{{ $index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="摘要" min-width="180">
        <template #default="{ row, $index }">
          <el-input
            v-model="row.summary"
            size="small"
            placeholder="输入摘要"
            clearable
            class="cell-input"
            @keydown.enter.prevent="handleSummaryEnter($index)"
          />
        </template>
      </el-table-column>
      <el-table-column label="科目" min-width="260">
        <template #default="{ row, $index }">
          <SubjectSelect
            v-model="row.subjectId"
            placeholder="点击选择科目"
            @change="(s) => handleSubjectChange($index, s)"
            @clear="handleSubjectClear($index)"
          />

        </template>
      </el-table-column>
      <el-table-column label="借方金额" width="160">
        <template #default="{ row, $index }">
          <el-input-number
            v-model="row.debit"
            :precision="2"
            :controls="false"
            size="small"
            placeholder="0.00"
            class="cell-input amount-input debit-amount"
            :class="{ 'red-ink': Number(row.debit) < 0 }"
            @change="() => handleAmountChange($index)"
          />
        </template>
      </el-table-column>
      <el-table-column label="现金流量" width="140">
        <template #default="{ row,  }">
          <el-select v-model="row.cashFlowItem" placeholder="-" size="small" clearable style="width:130px">
            <el-option v-for="cf in cashFlowItems" :key="cf.id" :label="cf.name" :value="cf.id" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="贷方金额" width="160">
        <template #default="{ row, $index }">
          <el-input-number
            v-model="row.credit"
            :precision="2"
            :controls="false"
            size="small"
            placeholder="0.00"
            class="cell-input amount-input credit-amount"
            :class="{ 'red-ink': Number(row.credit) < 0 }"
            @change="() => handleAmountChange($index)"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="60" fixed="right">
        <template #default="{ $index }">
          <el-button
            text
            type="danger"
            size="small"
            :disabled="entries.length <= 2"
            @click="removeRow($index)"
          >
            <el-icon><Delete /></el-icon>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 底部合计行 -->
    <div class="entry-footer">
      <div class="summary-row">
        <span class="summary-label">合计：</span>
        <span class="summary-amount sum-debit">借 <em>{{ formatTotal(debitTotal) }}</em></span>
        <span class="summary-amount sum-credit">贷 <em>{{ formatTotal(creditTotal) }}</em></span>
        <span v-if="!isBalanced" class="summary-diff error">
          差额：{{ formatTotal(Math.abs(diff)) }}
          <el-tag type="danger" size="small">不平衡</el-tag>
        </span>
        <span v-else class="summary-diff balanced">
          <el-tag type="success" size="small">平衡</el-tag>
        </span>
      </div>
      <div class="add-row-bar">
        <el-button text type="primary" size="small" @click="addRow">
          <el-icon><Plus /></el-icon>新增分录
        </el-button>
        <span class="entry-count">共 {{ entries.length }} 条分录</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { Delete, Plus } from '@element-plus/icons-vue'
import SubjectSelect from './SubjectSelect.vue'
import { useStore } from '@/stores/store.js'
const cashFlowItems = computed(function() { return store.state.cashFlowItems })
import { checkBalance, formatAmount } from '@/utils/accounting.js'

const props = defineProps({
  modelValue: { type: Array, required: true },
  readonly: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'balanceChange', 'balanceCheck'])

const store = useStore()

// 用 ref 包裹 entries 确保响应性
const entries = ref([])

// 同步外部数据
watch(() => props.modelValue, (val) => {
  entries.value = val.map(e => ({ ...e }))
}, { immediate: true })

// 借贷平衡计算
const balanceResult = computed(() => checkBalance(entries.value))
const debitTotal = computed(() => balanceResult.value.debitTotal)
const creditTotal = computed(() => balanceResult.value.creditTotal)
const diff = computed(() => balanceResult.value.diff)
const isBalanced = computed(() => balanceResult.value.balanced)

watch(isBalanced, (val) => {
  emit('balanceChange', val)
  emit('balanceCheck', { balanced: val, debitTotal: debitTotal.value, creditTotal: creditTotal.value })
})

function formatTotal(val) {
  return `¥${formatAmount(val)}`
}

function createEmptyRow() {
  return {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 4),
    summary: '',
    subjectId: '',
    subjectCode: '',
    subjectName: '',
    debit: null,
    credit: null,
    _editing: true,
  }
}

function addRow() {
  entries.value.push(createEmptyRow())
  emitUpdate()
}

function removeRow(index) {
  if (entries.value.length <= 2) return
  entries.value.splice(index, 1)
  emitUpdate()
}

function handleSubjectChange(index, subject) {
  const row = entries.value[index]
  if (subject) {
    // 构建完整科目编码（沿父链向上拼接）
    let fullCode = subject.code
    let parent = subject.parentId ? store.state.subjects.find(s => s.id === subject.parentId) : null
    while (parent) {
      fullCode = parent.code + fullCode
      parent = parent.parentId ? store.state.subjects.find(s => s.id === parent.parentId) : null
    }
    row.subjectId = subject.id
    row.subjectCode = fullCode
    row.subjectName = subject.name
  }
  row._editing = false
  emitUpdate()
}

function handleSubjectClear(index) {
  entries.value[index].subjectId = ''
  entries.value[index].subjectCode = ''
  entries.value[index].subjectName = ''
}

function handleAmountChange(index) {
  const row = entries.value[index]
  // 自动清除对方向金额（含负数红字处理）
  if ((Number(row.debit) || 0) !== 0 && (Number(row.credit) || 0) !== 0) {
    // 保留最后修改的：保留非零且绝对值大的，清空另一个
    const db = Math.abs(Number(row.debit) || 0)
    const cr = Math.abs(Number(row.credit) || 0)
    if (db >= cr) {
      row.credit = null
    } else {
      row.debit = null
    }
  }
  emitUpdate()
}

function handleSummaryEnter(index) {
  // Enter时把当前行摘要复制到下一行
  const summary = entries.value[index].summary
  if (summary && index < entries.value.length - 1) {
    if (!entries.value[index + 1].summary) {
      entries.value[index + 1].summary = summary
    }
  }
}

function handleCellClick(row) {
  // 单击科目单元格进入编辑模式
}

function editRow(index) {
  if (!props.readonly) {
    entries.value[index]._editing = true
  }
}

function emitUpdate() {
  emit('update:modelValue', entries.value.map(e => ({
    id: e.id,
    summary: e.summary,
    subjectId: e.subjectId,
    subjectCode: e.subjectCode,
    subjectName: e.subjectName,
    debit: e.debit != null ? Number(e.debit) : 0,
    credit: e.credit != null ? Number(e.credit) : 0,
  })))
}
</script>

<style scoped>
.entry-table-wrapper {
  margin: 0 -1px;
}
.entry-table {
  width: 100%;
}
.entry-table :deep(.cell) {
  padding: 2px 4px;
}

/* 行号圆圈 */
.row-num {
  display: inline-flex;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
  color: #fff;
  background: #c0c4cc;
  transition: background 0.2s;
}
.el-table__row:hover .row-num {
  background: #409eff;
}

.cell-input {
  width: 100%;
}
.amount-input {
  width: 100%;
}
.amount-input :deep(.el-input__inner) {
  text-align: right;
  font-family: monospace;
}
.subject-display {
  cursor: pointer;
  color: #409eff;
  font-size: 13px;
  padding: 0 4px;
}

/* 借贷金额分色：借🔴(e6a23c) 贷🟢(67c23a) */
.amount-input.debit-amount :deep(.el-input__inner) {
  color: #e6a23c;
  font-weight: 600;
}
.amount-input.credit-amount :deep(.el-input__inner) {
  color: #67c23a;
  font-weight: 600;
}
.amount-input.debit-amount :deep(.el-input__wrapper):focus-within {
  box-shadow: 0 0 0 1px #e6a23c inset;
}
.amount-input.credit-amount :deep(.el-input__wrapper):focus-within {
  box-shadow: 0 0 0 1px #67c23a inset;
}

/* 红字（负数金额）样式 */
.red-ink :deep(.el-input__inner) {
  color: #f56c6c !important;
}

.entry-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #fafafa;
  border: 1px solid #e8e8e8;
  border-top: none;
  border-radius: 0 0 4px 4px;
}
.summary-row {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 14px;
}
.summary-label {
  font-weight: 600;
  color: #303133;
}
.summary-amount {
  font-family: monospace;
  font-weight: 600;
}
.summary-amount em {
  font-style: normal;
}
.sum-debit { color: #e6a23c; }
.sum-credit { color: #67c23a; }
.summary-diff {
  font-family: monospace;
  font-weight: 600;
}
.summary-diff.error { color: #f56c6c; }
.summary-diff.balanced { color: #67c23a; }
.add-row-bar {
  display: flex;
  align-items: center;
  gap: 8px;
}
.entry-count {
  font-size: 12px;
  color: #909399;
}
</style>
