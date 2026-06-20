<template>
  <div class="page">
    <div class="page-header">
      <h2 class="page-title">凭证查询</h2>
      <div class="page-actions">
        <el-button type="primary" @click="handleNewVoucher">
          <el-icon><Plus /></el-icon>新增凭证
        </el-button>
      </div>
    </div>

    <!-- 筛选栏 -->
    <el-card shadow="never" class="filter-card">
      <el-form :model="filter" inline size="small">
        <el-form-item label="期间">
          <el-input v-model="filter.period" placeholder="YYYYMM" style="width:100px" />
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="filter.dateRange"
            type="daterange"
            value-format="YYYY-MM-DD"
            range-separator="~"
            start-placeholder="开始"
            end-placeholder="结束"
            style="width: 240px"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="filter.status" clearable placeholder="全部" style="width:120px">
            <el-option label="草稿" value="draft" />
            <el-option label="已审核" value="approved" />
            <el-option label="已过账" value="posted" />
          </el-select>
        </el-form-item>
        <el-form-item label="关键词">
          <el-input v-model="filter.keyword" placeholder="摘要/科目/凭证号" style="width:200px" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 凭证列表 -->
    <el-card shadow="never">
      <el-table
        :data="voucherList"
        border
        stripe
        size="small"
        style="width:100%"
        empty-text="暂无凭证数据"
        @row-dblclick="handleViewDetail"
      >
        <el-table-column label="凭证号" width="180">
          <template #default="{ row }">
            <el-button text type="primary" @click="handleViewDetail(row)">
              {{ row.voucherNo }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="日期" width="110" prop="date" />
        <el-table-column label="摘要" min-width="200">
          <template #default="{ row }">
            <span class="summary-text">{{ getSummaryPreview(row) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="借方合计" width="140" align="right">
          <template #default="{ row }">
            {{ formatAmt(getDebitTotal(row)) }}
          </template>
        </el-table-column>
        <el-table-column label="贷方合计" width="140" align="right">
          <template #default="{ row }">
            {{ formatAmt(getCreditTotal(row)) }}
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="statusTag(row.status)" size="small">
              {{ statusLabel(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="制单人" width="100" prop="createdBy" />
        <el-table-column label="操作" width="220" fixed="right">
          <template #default="{ row }">
            <el-button text size="small" @click="handleViewDetail(row)">查看</el-button>
            <el-button
              v-if="row.status === 'draft'"
              text type="primary" size="small"
              @click="handleEdit(row)"
            >编辑</el-button>
            <el-button
              v-if="row.status === 'draft' && isCashier"
              text type="warning" size="small"
              @click="handleSign(row)"
            >签字</el-button>
            <el-button
              v-if="row.status === 'signed' && isCashier"
              text type="info" size="small"
              @click="handleUnsign(row)"
            >取消签字</el-button>
            <el-button
              v-if="row.status === 'draft' || row.status === 'signed'"
              text type="success" size="small"
              @click="handleApprove(row)"
            >{{ isSupervisor ? '审核' : '提交审核' }}</el-button>
            <el-button
              v-if="row.status === 'approved'"
              text type="warning" size="small"
              @click="handlePost(row)"
            >过账</el-button>
            <el-button
              v-if="row.status === 'approved' && isSupervisor"
              text type="info" size="small"
              @click="handleUnapprove(row)"
            >反审核</el-button>
            <el-button
              v-if="row.status === 'draft'"
              text type="danger" size="small"
              @click="handleDelete(row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 凭证详情对话框 -->
    <el-dialog
      v-model="detailVisible"
      :title="`凭证详情 - ${detailVoucher?.voucherNo || ''}`"
      width="800"
      top="5vh"
    >
      <template v-if="detailVoucher">
        <div class="detail-header">
          <span>日期：{{ detailVoucher.date }}</span>
          <span>期间：{{ detailVoucher.period }}</span>
          <span>附件：{{ detailVoucher.attachments }} 张</span>
          <span>
            状态：<el-tag :type="statusTag(detailVoucher.status)" size="small">
              {{ statusLabel(detailVoucher.status) }}
            </el-tag>
          </span>
        </div>
        <el-table :data="detailVoucher.entries" border size="small" style="margin-top:12px">
          <el-table-column label="摘要" prop="summary" min-width="160" />
          <el-table-column label="科目编码" prop="subjectCode" width="100" />
          <el-table-column label="科目名称" prop="subjectName" min-width="160" />
          <el-table-column label="借方金额" width="140" align="right">
            <template #default="{ row }"><span :class="Number(row.debit) < 0 ? 'red-ink' : ''">{{ row.debit ? formatAmt(row.debit) : '' }}</span></template>
          </el-table-column>
          <el-table-column label="贷方金额" width="140" align="right">
            <template #default="{ row }"><span :class="Number(row.credit) < 0 ? 'red-ink' : ''">{{ row.credit ? formatAmt(row.credit) : '' }}</span></template>
          </el-table-column>
        </el-table>
        <div class="detail-footer">
          <span>制单人：{{ detailVoucher.createdBy }}</span>
          <span v-if="detailVoucher.approvedBy">审核人：{{ detailVoucher.approvedBy }}</span>
        </div>
      </template>
      <template #footer>
        <div class="detail-actions">
          <el-button v-if="detailVoucher?.status === 'draft'" type="primary" @click="handleEdit(detailVoucher)">
            编辑
          </el-button>
          <el-button @click="detailVisible = false">关闭</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useStore } from '@/stores/store.js'
import { formatAmount, checkBalance, VOUCHER_STATUS_CN } from '@/utils/accounting.js'

const isTeaching = () => !!localStorage.getItem("tutorial_task")
function handleNewVoucher() {
  if (isTeaching()) { ElMessage.info("💡 教学期间由系统自动管理凭证，手动新增会干扰教学数据。如需练习请在浮动窗切换至「自由练习」模式。"); return }
  router.push("/accounting/voucher/entry")
}

const router = useRouter()
const store = useStore()
const isSupervisor = computed(() => store.getCurrentRole() === 'supervisor')
const isCashier = computed(() => store.getCurrentRole() === 'cashier')

const filter = reactive({
  period: '',
  dateRange: null,
  status: '',
  keyword: '',
})

const voucherList = ref([])
const detailVisible = ref(false)
const detailVoucher = ref(null)

function statusLabel(status) {
  return VOUCHER_STATUS_CN[status] || status
}

function statusTag(status) {
  return status === 'draft' ? 'warning' : status === 'signed' ? '' : status === 'approved' ? 'success' : 'primary'
}

function getDebitTotal(v) {
  return v.entries.reduce((s, e) => s + (Number(e.debit) || 0), 0)
}

function getCreditTotal(v) {
  return v.entries.reduce((s, e) => s + (Number(e.credit) || 0), 0)
}

function getSummaryPreview(v) {
  const summaries = v.entries.map(e => e.summary).filter(Boolean)
  return [...new Set(summaries)].join('；') || '—'
}

function formatAmt(val) {
  return `¥${formatAmount(val)}`
}

function handleSearch() {
  const params = {}
  if (filter.period) params.period = filter.period
  if (filter.dateRange) {
    params.dateFrom = filter.dateRange[0]
    params.dateTo = filter.dateRange[1]
  }
  if (filter.status) params.status = filter.status
  if (filter.keyword) params.keyword = filter.keyword

  voucherList.value = store.getVoucherList(params)
}

function handleReset() {
  filter.period = ''
  filter.dateRange = null
  filter.status = ''
  filter.keyword = ''
  handleSearch()
}

function handleViewDetail(row) {
  const v = store.getVoucherById(row.id)
  if (v) {
    detailVoucher.value = v
    detailVisible.value = true
  }
}

function handleEdit(row) {
  if (isTeaching()) { ElMessage.warning('💡 教学期间凭证由系统自动管理，不支持手动操作。'); return }

  router.push({ path: '/accounting/voucher/entry', query: { id: row.id } })
}

function handleApprove(row) {
  if (isTeaching()) { ElMessage.warning('💡 教学期间凭证由系统自动管理，不支持手动操作。'); return }

  if (isSupervisor.value) {
    ElMessageBox.confirm(`确认审核凭证"${row.voucherNo}"吗？`, '审核确认', {
      confirmButtonText: '审核', cancelButtonText: '取消', type: 'info',
    }).then(() => {
      const result = store.approveVoucher(row.id)
      if (result.success) { ElMessage.success(`凭证"${row.voucherNo}"已审核`); handleSearch() }
      else { ElMessage.error(result.error || result.errors?.join('；') || '审核失败') }
    }).catch(() => {})
  } else {
    const voucher = store.getVoucherById(row.id)
    if (!voucher) { ElMessage.error('凭证不存在'); return }
    const checks = []
    const summaries = voucher.entries.map(e => e.summary).filter(Boolean)
    if (summaries.length === 0) checks.push('摘要不能为空')
    if (voucher.entries.some(e => !e.subjectId)) checks.push('请为所有分录选择科目')
    const bal = checkBalance(voucher.entries)
    if (!bal.balanced) checks.push(`借贷不平衡：借${bal.debitTotal} ≠ 贷${bal.creditTotal}`)
    if (checks.length > 0) {
      ElMessage.warning('主管退回：' + checks.join('；'))
    } else {
      const result = store.approveVoucher(row.id)
      if (result.success) { ElMessage.success('✅ 主管已自动通过：' + row.voucherNo); handleSearch() }
      else { ElMessage.error('主管退回：' + (result.error || result.errors?.join('；') || '未知错误')) }
    }
  }
}
function handleSign(row) {
  if (isTeaching()) { ElMessage.warning('💡 教学期间凭证由系统自动管理，不支持手动操作。'); return }

  const result = store.signVoucher(row.id)
  if (result.success) { ElMessage.success(`凭证"${row.voucherNo}"已签字`); handleSearch() }
  else { ElMessage.error(result.error || result.errors?.join('；') || '签字失败') }
}
function handleUnsign(row) {
  if (isTeaching()) { ElMessage.warning('💡 教学期间凭证由系统自动管理，不支持手动操作。'); return }

  const result = store.unsignVoucher(row.id)
  if (result.success) { ElMessage.success(`凭证"${row.voucherNo}"已取消签字`); handleSearch() }
  else { ElMessage.error(result.error || '取消签字失败') }
}
function handleUnapprove(row) {
  if (isTeaching()) { ElMessage.warning('💡 教学期间凭证由系统自动管理，不支持手动操作。'); return }

  ElMessageBox.confirm(`确认反审核凭证"${row.voucherNo}"吗？`, '反审核确认', {
    confirmButtonText: '反审核', cancelButtonText: '取消', type: 'warning',
  }).then(() => {
    const result = store.unapproveVoucher(row.id)
    if (result.success) {
      ElMessage.success(`凭证"${row.voucherNo}"已反审核`)
      handleSearch()
    } else {
      ElMessage.error(result.error || '反审核失败')
    }
  }).catch(() => {})
}

function handlePost(row) {
  if (isTeaching()) { ElMessage.warning('💡 教学期间凭证由系统自动管理，不支持手动操作。'); return }

  ElMessageBox.confirm(
    `确认过账凭证"${row.voucherNo}"吗？过账后将更新科目余额。`,
    '过账确认',
    { confirmButtonText: '过账', cancelButtonText: '取消', type: 'info' }
  ).then(() => {
    const result = store.postVoucher(row.id)
    if (result.success) {
      ElMessage.success(`凭证"${row.voucherNo}"已过账`)
      handleSearch()
    } else {
      ElMessage.error(result.error || result.errors?.join('；') || '过账失败')
    }
  }).catch(() => {})
}

function handleDelete(row) {
  if (isTeaching()) { ElMessage.warning('💡 教学期间凭证由系统自动管理，不支持手动操作。'); return }

  ElMessageBox.confirm(`确认删除凭证"${row.voucherNo}"吗？`, '删除确认', {
    confirmButtonText: '删除', cancelButtonText: '取消', type: 'warning',
  }).then(() => {
    const result = store.deleteVoucher(row.id)
    if (result.success) {
      ElMessage.success('凭证已删除')
      handleSearch()
    } else {
      ElMessage.error(result.error || '删除失败')
    }
  }).catch(() => {})
}

onMounted(() => {
  handleSearch()
})
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.page-title { font-size: 20px; color: #303133; }
.red-ink { color: #f56c6c !important; }
.page-actions { display: flex; gap: 8px; }
.filter-card { margin-bottom: 16px; }
.summary-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  max-width: 300px;
}
.detail-header {
  display: flex;
  gap: 24px;
  font-size: 13px;
  color: #606266;
}
.detail-footer {
  margin-top: 12px;
  display: flex;
  gap: 24px;
  font-size: 12px;
  color: #909399;
}
.detail-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}
</style>
