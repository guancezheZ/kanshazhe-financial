<template>
  <div class="page">
    <div class="page-header">
      <h2 class="page-title">出纳管理</h2>
      <div class="page-actions">
        <el-date-picker v-model="period" type="month" value-format="YYYYMM" size="small" style="width:150px" />
      </div>
    </div>

    <el-card shadow="never">
      <el-tabs v-model="activeTab">
        <!-- 现金日记账 -->
        <el-tab-pane label="现金日记账" name="cash">
          <el-table :data="cashJournal" border stripe size="small" empty-text="无现金业务数据">
            <el-table-column label="日期" prop="date" width="100" />
            <el-table-column label="凭证号" prop="voucherNo" width="170" />
            <el-table-column label="摘要" prop="summary" min-width="200" />
            <el-table-column label="借方" width="140" align="right">
              <template #default="{ row }">{{ row.debit ? fmt(row.debit) : '' }}</template>
            </el-table-column>
            <el-table-column label="贷方" width="140" align="right">
              <template #default="{ row }">{{ row.credit ? fmt(row.credit) : '' }}</template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <!-- 银行日记账 -->
        <el-tab-pane label="银行日记账" name="bank">
          <el-table :data="bankJournal" border stripe size="small" empty-text="无银行业务数据">
            <el-table-column label="日期" prop="date" width="100" />
            <el-table-column label="凭证号" prop="voucherNo" width="170" />
            <el-table-column label="摘要" prop="summary" min-width="200" />
            <el-table-column label="借方" width="140" align="right">
              <template #default="{ row }">{{ row.debit ? fmt(row.debit) : '' }}</template>
            </el-table-column>
            <el-table-column label="贷方" width="140" align="right">
              <template #default="{ row }">{{ row.credit ? fmt(row.credit) : '' }}</template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <!-- 银行对账 -->
        <el-tab-pane label="银行对账" name="reconcile">
          <div class="recon-toolbar">
            <span>银行对账单：</span>
            <el-button size="small" @click="showAddStmt = true">新增对账单记录</el-button>
            <el-button size="small" @click="autoMatch">自动勾对</el-button>
          </div>
          <el-table :data="reconData" border stripe size="small" empty-text="暂无对账单数据">
            <el-table-column label="日期" prop="date" width="100" />
            <el-table-column label="描述" prop="description" min-width="200" />
            <el-table-column label="金额" width="140" align="right">
              <template #default="{ row }">{{ fmt(row.amount) }}</template>
            </el-table-column>
            <el-table-column label="匹配状态" width="100">
              <template #default="{ row }">
                <el-tag :type="row.isMatched ? 'success' : 'warning'" size="small">
                  {{ row.isMatched ? '已匹配' : '未匹配' }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120">
              <template #default="{ row }">
                <el-button v-if="!row.isMatched" text size="small" type="primary" @click="manualMatch(row)">手动匹配</el-button>
                <el-button v-else text size="small" @click="store.unmatchBankStatement(row.id); loadRecon()">取消匹配</el-button>
                <el-button text size="small" type="danger" @click="store.deleteBankStatement(row.id); loadRecon()">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!-- 新增对账单对话框 -->
    <el-dialog v-model="showAddStmt" title="新增对账单记录" width="400">
      <el-form :model="stmtForm" label-width="80px">
        <el-form-item label="日期"><el-date-picker v-model="stmtForm.date" type="date" value-format="YYYY-MM-DD" style="width:100%" /></el-form-item>
        <el-form-item label="金额"><el-input-number v-model="stmtForm.amount" :precision="2" style="width:100%" /></el-form-item>
        <el-form-item label="描述"><el-input v-model="stmtForm.description" /></el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showAddStmt = false">取消</el-button>
        <el-button type="primary" @click="handleAddStmt">保存</el-button>
      </template>
    </el-dialog>

    <!-- 匹配协议框 -->
    <el-dialog v-model="showMatchDialog" title="选择匹配凭证" width="500">
      <el-table :data="unmatchedBankVouchers" border size="small" @row-click="handleMatchSelect">
        <el-table-column label="凭证号" prop="voucherNo" width="170" />
        <el-table-column label="日期" prop="date" width="100" />
        <el-table-column label="借方金额" width="130" align="right">
          <template #default="{ row }">{{ fmt(getVoucherDebit(row)) }}</template>
        </el-table-column>
        <el-table-column label="贷方金额" width="130" align="right">
          <template #default="{ row }">{{ fmt(getVoucherCredit(row)) }}</template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { useStore } from '@/stores/store.js'
import { formatAmount, getCurrentPeriod } from '@/utils/accounting.js'

const store = useStore()
const activeTab = ref('cash')
const period = ref(getCurrentPeriod())
const showAddStmt = ref(false)
const showMatchDialog = ref(false)
const matchingStmtId = ref(null)
const stmtForm = ref({ date: '', amount: 0, description: '' })

function fmt(v) { return formatAmount(v) }

// 现金科目编码
const CASH_SUBJECT_CODES = ['1001']
// 银行存款科目编码
const BANK_SUBJECT_CODES = ['1002']

function getJournal(subjectCodes) {
  const rows = []
  const vouchers = store.state.vouchers.filter(v => v.status === 'posted' && v.period === period.value)
  for (const v of vouchers) {
    for (const e of v.entries) {
      const sub = store.getSubjectById(e.subjectId)
      if (sub && subjectCodes.some(c => sub.code.startsWith(c) || e.subjectCode?.startsWith(c))) {
        rows.push({ date: v.date, voucherNo: v.voucherNo, summary: e.summary, debit: e.debit, credit: e.credit })
      }
    }
  }
  rows.sort((a, b) => a.date.localeCompare(b.date))
  return rows
}

const cashJournal = computed(() => getJournal(CASH_SUBJECT_CODES))
const bankJournal = computed(() => getJournal(BANK_SUBJECT_CODES))
const reconData = computed(() => store.getBankStatements())

const unmatchedBankVouchers = computed(() => {
  return store.state.vouchers.filter(v => v.status === 'posted' && v.period === period.value)
})

function getVoucherDebit(v) { return v.entries.reduce((s, e) => s + (Number(e.debit) || 0), 0) }
function getVoucherCredit(v) { return v.entries.reduce((s, e) => s + (Number(e.credit) || 0), 0) }

function loadRecon() {}

function handleAddStmt() {
  if (localStorage.getItem("tutorial_task")) { ElMessage.warning("💡 教学期间银行对账由系统自动管理"); return }

  if (!stmtForm.value.date) return ElMessage.warning('请选择日期')
  store.addBankStatement({ ...stmtForm.value })
  ElMessage.success('已添加')
  showAddStmt.value = false
  stmtForm.value = { date: '', amount: 0, description: '' }
}

function autoMatch() {
  if (localStorage.getItem("tutorial_task")) { ElMessage.warning("💡 教学期间银行对账由系统自动管理"); return }

  let count = 0
  const stmts = store.getBankStatements().filter(s => !s.isMatched)
  for (const stmt of stmts) {
    const match = unmatchedBankVouchers.value.find(v => {
      const total = getVoucherDebit(v) + getVoucherCredit(v)
      return Math.abs(total - stmt.amount) < 0.01
    })
    if (match) { store.matchBankStatement(stmt.id, match.id); count++ }
  }
  ElMessage.success(`自动勾对完成，匹配了 ${count} 条`)
}

function manualMatch(stmt) {
  matchingStmtId.value = stmt.id
  showMatchDialog.value = true
}

function handleMatchSelect(row) {
  if (matchingStmtId.value) {
    store.matchBankStatement(matchingStmtId.value, row.id)
    ElMessage.success('匹配成功')
    showMatchDialog.value = false
  }
}
</script>

<style scoped>
.page-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; }
.page-title { font-size:20px; color:#303133; }
.page-actions { display:flex; gap:8px; align-items:center; }
.recon-toolbar { display:flex; gap:12px; align-items:center; margin-bottom:12px; }
</style>
