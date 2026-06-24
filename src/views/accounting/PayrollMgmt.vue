<template>
  <div class="page">
    <div class="page-header">
      <h2 class="page-title">工资管理</h2>
      <div class="page-actions">
        <el-button size="small" @click="handleLoadPresetData">
          {{ isTeachingMode ? '📋 载入教学示例数据' : '载入示例数据' }}
        </el-button>
      </div>
    </div>

    <el-row :gutter="16">
      <!-- 左侧：员工工资表 -->
      <el-col :span="14">
        <el-card shadow="never">
          <template #header>
            <div class="card-h">
              <span>👤 员工工资明细</span>
              <el-button size="small" type="primary" @click="handleAddEmployeeClick">
                {{ isTeachingMode ? '👤 新增员工' : '新增员工' }}
              </el-button>
            </div>
          </template>
          <el-table :data="employees" border stripe size="small" empty-text="暂无员工数据，点击「载入教学示例数据」">
            <el-table-column label="姓名" prop="name" width="80" />
            <el-table-column label="部门" prop="dept" width="90" />
            <el-table-column label="基本工资" width="110" align="right">
              <template #default="{ row }">{{ fmt(row.basicSalary) }}</template>
            </el-table-column>
            <el-table-column label="社保(个人)" width="100" align="right">
              <template #default="{ row }">{{ fmt(row.socialInsurance) }}</template>
            </el-table-column>
            <el-table-column label="公积金(个人)" width="110" align="right">
              <template #default="{ row }">{{ fmt(row.housingFund) }}</template>
            </el-table-column>
            <el-table-column label="应发工资" width="110" align="right">
              <template #default="{ row }">{{ fmt(row.basicSalary) }}</template>
            </el-table-column>
            <el-table-column label="实发工资" width="110" align="right">
              <template #default="{ row }">{{ fmt(row.basicSalary - row.socialInsurance - row.housingFund) }}</template>
            </el-table-column>
            <el-table-column label="操作" width="70" v-if="!isTeachingMode">
              <template #default="{ row, $index }">
                <el-button text size="small" type="danger" @click="removeEmployee($index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>

      <!-- 右侧：工资汇总与凭证生成 -->
      <el-col :span="10">
        <el-card shadow="never">
          <template #header>
            <div class="card-h">
              <span>📊 工资汇总</span>
              <el-button size="small" type="primary" @click="calcSummary">计算汇总</el-button>
            </div>
          </template>
          <div v-if="summary.total <= 0" class="empty-hint">点击「计算汇总」查看本月工资总额</div>
          <div v-else class="summary-area">
            <div class="summary-row">
              <span class="sl">员工人数：</span><span class="sv">{{ employees.length }} 人</span>
            </div>
            <div class="summary-row" v-for="(amt, dept) in summary.byDept" :key="dept">
              <span class="sl">{{ dept }}：</span><span class="sv">{{ fmt(amt) }}</span>
            </div>
            <el-divider />
            <div class="summary-row total">
              <span class="sl">应发合计：</span><span class="sv">{{ fmt(summary.total) }}</span>
            </div>
            <div class="summary-row">
              <span class="sl">社保合计：</span><span class="sv">{{ fmt(summary.totalSocial) }}</span>
            </div>
            <div class="summary-row">
              <span class="sl">公积金合计：</span><span class="sv">{{ fmt(summary.totalFund) }}</span>
            </div>
            <div class="summary-row">
              <span class="sl">实发合计：</span><span class="sv">{{ fmt(summary.netPay) }}</span>
            </div>

            <el-divider />
            <div class="voucher-actions">
              <el-button type="primary" size="small" @click="handleTeachingAction('accrual')"
                :disabled="summary.total <= 0 && !isTeachingMode">
                📝 生成计提工资凭证
              </el-button>
              <el-button size="small" @click="handleTeachingAction('payment')"
                :disabled="summary.total <= 0 && !isTeachingMode">
                💳 生成发放工资凭证
              </el-button>
            </div>
            <div class="voucher-hint" v-if="lastVoucherMsg">{{ lastVoucherMsg }}</div>
          </div>
        </el-card>

        <!-- 社保公积金汇总 -->
        <el-card shadow="never" style="margin-top:12px" v-if="summary.total > 0">
          <template #header>
            <div class="card-h"><span>🏛️ 社保公积金</span></div>
          </template>
          <div class="summary-row">
            <span class="sl">单位社保（约30%）：</span>
            <span class="sv">{{ fmt(round(summary.total * 0.30)) }}</span>
          </div>
          <div class="summary-row">
            <span class="sl">单位公积金（约5%）：</span>
            <span class="sv">{{ fmt(round(summary.total * 0.05)) }}</span>
          </div>
          <el-divider />
          <el-button size="small" type="warning" @click="handleTeachingAction('social')"
            :disabled="summary.total <= 0 && !isTeachingMode">
            🏛️ 生成单位社保/公积金计提凭证
          </el-button>
        </el-card>
      </el-col>
    </el-row>

    <!-- 新增员工弹窗 -->
    <el-dialog v-model="showForm" title="新增员工" width="400">
      <el-form :model="form" label-width="100px">
        <el-form-item label="姓名"><el-input v-model="form.name" /></el-form-item>
        <el-form-item label="部门">
          <el-select v-model="form.dept" style="width:100%">
            <el-option label="行政部" value="行政部" />
            <el-option label="销售部" value="销售部" />
            <el-option label="生产部" value="生产部" />
          </el-select>
        </el-form-item>
        <el-form-item label="基本工资"><el-input-number v-model="form.basicSalary" :min="0" :precision="2" style="width:100%" /></el-form-item>
        <el-form-item label="社保(个人)"><el-input-number v-model="form.socialInsurance" :min="0" :precision="2" style="width:100%" /></el-form-item>
        <el-form-item label="公积金(个人)"><el-input-number v-model="form.housingFund" :min="0" :precision="2" style="width:100%" /></el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showForm=false">取消</el-button>
        <el-button type="primary" @click="saveEmployee">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useStore } from '@/stores/store.js'
import { formatAmount, getCurrentPeriod, todayStr, round } from '@/utils/accounting.js'

const store = useStore()
const showForm = ref(false)
const employees = ref([])
const form = ref({ name: '', dept: '行政部', basicSalary: 0, socialInsurance: 0, housingFund: 0 })
const summary = reactive({ total: 0, byDept: {}, totalSocial: 0, totalFund: 0, netPay: 0 })
const lastVoucherMsg = ref('')

const isTeachingMode = computed(() => localStorage.getItem('teaching_active') === 'true')
const hasData = computed(() => employees.value.length > 0)
const period = getCurrentPeriod()

// ─── 教学提示文案 ──────────────────────────────
const TEACHING_HINTS = {
  addEmployee: {
    title: '教学模式下无法新增员工',
    msg: '请通过【凭证录入】填制分录反映工资数据。\n\n💡 真实企业做法：\n在工资模块录入员工信息（姓名、部门、基本工资、\n社保基数等），系统自动计算应发工资、代扣代缴，\n生成计提/发放凭证。',
  },
  accrual: {
    title: '教学模式下无法自动生成计提凭证',
    msg: '请通过【凭证录入】手动填制分录完成工资计提。\n\n📋 分录示例：\n  借：管理费用-工资（660203）\n      销售费用（6601）\n      生产成本-直接人工（500102）\n  贷：应付职工薪酬-工资（221101）\n\n💡 真实企业做法：\n系统根据员工工资明细自动汇总，\n点击「生成计提工资凭证」自动生成分录。',
  },
  payment: {
    title: '教学模式下无法自动生成发放凭证',
    msg: '请通过【凭证录入】手动填制分录完成工资发放。\n\n📋 分录示例：\n  借：应付职工薪酬-工资（221101）\n  贷：银行存款（1002）\n\n💡 真实企业做法：\n系统根据实发工资总额自动生成发放凭证，\n同步更新银行代发数据。',
  },
  social: {
    title: '教学模式下无法自动生成社保凭证',
    msg: '请通过【凭证录入】手动填制分录完成社保计提。\n\n📋 分录示例：\n  借：管理费用-社保费（660208）\n  贷：应付职工薪酬-社保（221102）\n\n💡 真实企业做法：\n系统根据社保基数自动计算单位部分，\n点击生成按钮自动计提。',
  },
}
// ─── 教学模式按钮点击处理 ──────────────────────
function handleTeachingAction(action) {
  if (!isTeachingMode.value) {
    // 非教学模式：执行原操作
    if (action === 'accrual') genAccrualVoucher()
    else if (action === 'payment') genPaymentVoucher()
    else if (action === 'social') genSocialVoucher()
    return
  }
  const hint = TEACHING_HINTS[action]
  if (hint) ElMessage.info({ message: hint.msg, title: hint.title, duration: 8000 })
}

function handleAddEmployeeClick() {
  if (isTeachingMode.value) {
    ElMessage.info({ message: TEACHING_HINTS.addEmployee.msg, title: TEACHING_HINTS.addEmployee.title, duration: 8000 })
    return
  }
  showForm.value = true
  resetForm()
}

function handleLoadPresetData() {
  if (isTeachingMode.value && hasData.value) {
    // 已有数据时教学模式下也弹出教育提示
    ElMessage.info({ message: '教学模式下员工数据已预设，无需重复载入。\n\n💡 真实企业做法：在工资模块录入员工信息后，系统自动保存至工资台账。', title: '教学模式下无法重新载入', duration: 6000 })
    return
  }
  loadPresetData()
}

function getPayrollKey() {
  const sid = localStorage.getItem('jd_scenario') || 'manufacturing'
  return `jd_payroll_employees_${sid}`
}

function fmt(v) { return formatAmount(v) }
function resetForm() { form.value = { name: '', dept: '行政部', basicSalary: 0, socialInsurance: 0, housingFund: 0 } }

// 根据完整科目编码查找科目对象
function findSubject(fullCode) {
  const subjects = store.state.subjects
  for (const s of subjects) {
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

// 部门→费用科目映射
const DEPT_SUBJECT = {
  '行政部': { code: '660203', name: '管理费用-工资' },
  '销售部': { code: '6601', name: '销售费用' },
  '生产部': { code: '500102', name: '生产成本-直接人工' },
}

function loadEmployees() {
  try { employees.value = JSON.parse(localStorage.getItem(getPayrollKey()) || '[]') } catch { employees.value = [] }
}

function saveEmployees() {
  localStorage.setItem(getPayrollKey(), JSON.stringify(employees.value))
}

function saveEmployee() {
  if (!form.value.name) return ElMessage.warning('请输入姓名')
  employees.value.push({ id: Date.now(), ...form.value })
  saveEmployees()
  showForm.value = false
  resetForm()
  ElMessage.success('员工已添加')
}

function removeEmployee(index) {
  ElMessageBox.confirm('确认删除该员工？').then(() => {
    employees.value.splice(index, 1)
    saveEmployees()
    if (!employees.value.length) resetSummary()
    ElMessage.success('已删除')
  }).catch(() => {})
}

function resetSummary() {
  summary.total = 0
  summary.byDept = {}
  summary.totalSocial = 0
  summary.totalFund = 0
  summary.netPay = 0
}

function calcSummary() {
  if (!employees.value.length) {
    ElMessage.warning('请先载入员工数据')
    return
  }
  const byDept = {}
  let total = 0, totalSocial = 0, totalFund = 0
  for (const e of employees.value) {
    byDept[e.dept] = (byDept[e.dept] || 0) + Number(e.basicSalary)
    total += Number(e.basicSalary)
    totalSocial += Number(e.socialInsurance || 0)
    totalFund += Number(e.housingFund || 0)
  }
  summary.byDept = byDept
  summary.total = round(total)
  summary.totalSocial = round(totalSocial)
  summary.totalFund = round(totalFund)
  summary.netPay = round(total - totalSocial - totalFund)
  lastVoucherMsg.value = ''
  ElMessage.success(`计算完成！应发工资合计：${formatAmount(total)}元`)
}

// 教学预设数据
function loadPresetData() {
  const preset = [
    { id: 1, name: '张管理', dept: '行政部', basicSalary: 15000, socialInsurance: 1500, housingFund: 750 },
    { id: 2, name: '李行政', dept: '行政部', basicSalary: 10000, socialInsurance: 1000, housingFund: 500 },
    { id: 3, name: '王销售', dept: '销售部', basicSalary: 20000, socialInsurance: 2000, housingFund: 1000 },
    { id: 4, name: '赵销售', dept: '销售部', basicSalary: 15000, socialInsurance: 1500, housingFund: 750 },
    { id: 5, name: '刘生产', dept: '生产部', basicSalary: 18000, socialInsurance: 1800, housingFund: 900 },
    { id: 6, name: '陈生产', dept: '生产部', basicSalary: 12000, socialInsurance: 1200, housingFund: 600 },
  ]
  employees.value = preset
  saveEmployees()
  calcSummary()
  ElMessage.success('已载入教学示例数据（6名员工）')
}

// 生成计提工资凭证（非教学模式）
function genAccrualVoucher() {
  if (summary.total <= 0) return ElMessage.warning('请先计算工资汇总')

  const entries = []
  for (const [dept, amount] of Object.entries(summary.byDept)) {
    if (amount <= 0) continue
    const subj = DEPT_SUBJECT[dept]
    if (!subj) continue
    const s = findSubject(subj.code)
    entries.push({
      summary: `计提${dept}工资`,
      subjectCode: subj.code,
      subjectId: s ? s.id : '',
      subjectName: subj.name,
      debit: amount,
      credit: 0,
      cashFlowItem: '',
      explanation: `${subj.name}增加。${dept}员工工资计入${dept === '生产部' ? '生产成本（直接人工）' : '当期损益'}。`,
    })
  }
  // 贷方：应付职工薪酬-工资
  const s = findSubject('221101')
  entries.push({
    summary: '计提本月工资',
    subjectCode: '221101',
    subjectId: s ? s.id : '',
    subjectName: s ? s.name : '',
    debit: 0,
    credit: summary.total,
    cashFlowItem: '',
    explanation: '应付职工薪酬-工资增加。计提形成对员工的负债，实际发放时冲减。',
  })

  doGenVoucher(entries, '✅ 计提工资凭证已自动生成！')
}

// 生成发放工资凭证（非教学模式）
function genPaymentVoucher() {
  if (summary.total <= 0) return ElMessage.warning('请先计算工资汇总')
  const netPay = summary.netPay

  const sPay = findSubject('221101')
  const sBank = findSubject('100201')
  const sSocial = findSubject('224101')
  const sFund = findSubject('224102')

  const entries = [
    {
      summary: '发放本月工资',
      subjectCode: '221101',
      subjectId: sPay ? sPay.id : '',
      subjectName: sPay ? sPay.name : '',
      debit: summary.total,
      credit: 0,
      cashFlowItem: 'cf-op3',
      explanation: '应付职工薪酬减少。实际发放工资时冲减计提负债，全额冲减。',
    },
    {
      summary: '代扣社保（个人部分）',
      subjectCode: '224101',
      subjectId: sSocial ? sSocial.id : '',
      subjectName: sSocial ? sSocial.name : '',
      debit: 0,
      credit: summary.totalSocial,
      cashFlowItem: '',
      explanation: '社保个人部分从工资中代扣，形成对其他应付款的负债，下月缴纳给社保局。',
    },
    {
      summary: '代扣公积金（个人部分）',
      subjectCode: '224102',
      subjectId: sFund ? sFund.id : '',
      subjectName: sFund ? sFund.name : '',
      debit: 0,
      credit: summary.totalFund,
      cashFlowItem: '',
      explanation: '公积金个人部分从工资中代扣，形成对其他应付款的负债，下月缴纳给公积金中心。',
    },
    {
      summary: '实发工资',
      subjectCode: '100201',
      subjectId: sBank ? sBank.id : '',
      subjectName: sBank ? sBank.name : '',
      debit: 0,
      credit: netPay,
      cashFlowItem: 'cf-op3',
      explanation: '银行存款减少。通过银行代发实发工资，需确保银行账户余额充足。',
    },
  ]

  doGenVoucher(entries, '✅ 发放工资凭证已自动生成！')
}

// 生成单位社保/公积金计提凭证
function genSocialVoucher() {
  const totalSocialEmployer = round(summary.total * 0.30)
  const totalFundEmployer = round(summary.total * 0.05)
  if (totalSocialEmployer <= 0 && totalFundEmployer <= 0) return ElMessage.warning('计算数据异常')

  const sMgt = findSubject('660203')
  const sSocial = findSubject('221102')
  const sFund = findSubject('221103')

  const entries = []
  let total = 0
  if (totalSocialEmployer > 0) {
    entries.push({
      summary: '计提单位社保',
      subjectCode: '660203',
      subjectId: sMgt ? sMgt.id : '',
      subjectName: '管理费用-工资',
      debit: totalSocialEmployer,
      credit: 0,
      cashFlowItem: '',
      explanation: '单位社保计入管理费用。社保单位部分是企业为员工承担的用工成本。',
    })
    entries.push({
      summary: '计提单位社保',
      subjectCode: '221102',
      subjectId: sSocial ? sSocial.id : '',
      subjectName: sSocial ? sSocial.name : '',
      debit: 0,
      credit: totalSocialEmployer,
      cashFlowItem: '',
      explanation: '应付职工薪酬-社保增加。单位社保部分计提形成负债，缴纳时冲减。',
    })
    total += totalSocialEmployer
  }
  if (totalFundEmployer > 0) {
    entries.push({
      summary: '计提单位公积金',
      subjectCode: '660203',
      subjectId: sMgt ? sMgt.id : '',
      subjectName: '管理费用-工资',
      debit: totalFundEmployer,
      credit: 0,
      cashFlowItem: '',
      explanation: '单位公积金计入管理费用。公积金单位部分与个人部分同比例缴存。',
    })
    entries.push({
      summary: '计提单位公积金',
      subjectCode: '221103',
      subjectId: sFund ? sFund.id : '',
      subjectName: sFund ? sFund.name : '',
      debit: 0,
      credit: totalFundEmployer,
      cashFlowItem: '',
      explanation: '应付职工薪酬-公积金增加。单位公积金部分计提形成负债。',
    })
    total += totalFundEmployer
  }

  doGenVoucher(entries, `✅ 单位社保公积金计提凭证已自动生成！合计：${formatAmount(total)}元`)
}

// 通用：自动生成凭证（非教学模式）
function doGenVoucher(entries, successMsg) {
  try {
    const result = store.addTeachingVoucher({
      date: todayStr(),
      entries,
    })
    if (result.success) {
      lastVoucherMsg.value = successMsg
      ElMessage.success(successMsg)
      window.dispatchEvent(new CustomEvent('task-updated'))
    } else {
      ElMessage.warning('凭证生成失败：' + (result.errors || []).join('；'))
    }
  } catch (e) {
    ElMessage.error('凭证生成异常：' + e.message)
  }
}

onMounted(loadEmployees)
</script>

<style scoped>
.page-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; }
.page-title { font-size:20px; color:#303133; }
.page-actions { display:flex; gap:8px; }
.card-h { display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; }
.empty-hint { text-align:center; color:#909399; padding:30px 0; font-size:13px; }
.summary-area { font-size:13px; }
.summary-row { display:flex; justify-content:space-between; padding:4px 0; }
.summary-row.total { font-weight:700; font-size:14px; color:#e6a23c; }
.sl { color:#606266; }
.sv { font-family:monospace; font-weight:600; color:#303133; }
.voucher-actions { display:flex; flex-direction:column; gap:8px; }
.voucher-hint { margin-top:8px; font-size:12px; color:#67c23a; text-align:center; }
</style>
