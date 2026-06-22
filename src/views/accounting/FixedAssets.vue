<template>
  <div class="page">
    <div class="page-header">
      <h2 class="page-title">固定资产</h2>
      <div class="page-actions">
        <el-button type="primary" size="small" @click="showForm=true;editId=null;resetForm()"
          :disabled="teachingLocked" :title="teachingLocked ? '🔒 请到教学中心选择相关任务' : ''">
          ➕ 新增资产
        </el-button>
        <el-button v-if="isTeachingMode" type="success" size="small" @click="handleDepreciation"
          :disabled="deprLocked" :title="deprLocked ? '🔒 请到教学中心选择相关任务' : ''">
          📆 计提本月折旧
        </el-button>
      </div>
    </div>

    <el-card shadow="never">
      <el-table :data="assets" border stripe size="small" empty-text="暂无固定资产，请点击「新增资产」录入">
        <el-table-column label="编码" prop="code" width="90" />
        <el-table-column label="名称" prop="name" min-width="140" />
        <el-table-column label="类别" prop="category" width="100" />
        <el-table-column label="原值" width="120" align="right">
          <template #default="{ row }">{{ fmt(row.originalValue) }}</template>
        </el-table-column>
        <el-table-column label="残值" width="120" align="right">
          <template #default="{ row }">{{ fmt(row.salvageValue) }}</template>
        </el-table-column>
        <el-table-column label="使用月数" prop="usefulLife" width="90" />
        <el-table-column label="月折旧" width="120" align="right">
          <template #default="{ row }">{{ fmt(row.monthlyDepr) }}</template>
        </el-table-column>
        <el-table-column label="累计折旧" width="120" align="right">
          <template #default="{ row }">{{ fmt(row.accumDepr) }}</template>
        </el-table-column>
        <el-table-column label="净值" width="120" align="right">
          <template #default="{ row }">{{ fmt(row.netValue) }}</template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template #default="{ row }">
            <el-button text size="small" type="danger" @click="delAsset(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 新增资产弹窗 -->
    <el-dialog v-model="showForm" :title="isTeachingMode ? '新增资产（教学模式下将自动生成凭证）' : '新增资产'" width="520">
      <el-form :model="af" label-width="90px">
        <el-form-item label="编码"><el-input v-model="af.code" placeholder="如 ZC-001" /></el-form-item>
        <el-form-item label="名称"><el-input v-model="af.name" placeholder="如 联想台式电脑" /></el-form-item>
        <el-form-item label="类别">
          <el-select v-model="af.category" style="width:100%">
            <el-option label="房屋建筑物" value="房屋建筑物" />
            <el-option label="机器设备" value="机器设备" />
            <el-option label="办公设备" value="办公设备" />
            <el-option label="运输设备" value="运输设备" />
          </el-select>
        </el-form-item>
        <el-form-item label="原值"><el-input-number v-model="af.originalValue" :min="0" :precision="2" style="width:100%" /></el-form-item>
        <el-form-item label="残值"><el-input-number v-model="af.salvageValue" :min="0" :precision="2" style="width:100%" /></el-form-item>
        <el-form-item label="使用月数"><el-input-number v-model="af.usefulLife" :min="1" :max="600" style="width:100%" /></el-form-item>
        <el-form-item label="折旧方法">
          <el-select v-model="af.deprMethod" style="width:100%">
            <el-option label="直线法" value="straight_line" />
            <el-option label="双倍余额递减法" value="double_declining" />
            <el-option label="年数总和法" value="sum_of_years" />
          </el-select>
        </el-form-item>
        <el-form-item label="已计提月数"><el-input-number v-model="af.monthsCharged" :min="0" style="width:100%" /></el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showForm=false">取消</el-button>
        <el-button type="primary" @click="saveAsset">{{ isTeachingMode ? '保存并自动生成凭证' : '保存' }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useStore } from '@/stores/store.js'
import { formatAmount, calcMonthlyDepreciation, getCurrentPeriod, todayStr } from '@/utils/accounting.js'

const store = useStore()
const showForm = ref(false)
const editId = ref(null)
const assets = ref([])
const af = ref({ code: '', name: '', category: '', originalValue: 0, salvageValue: 0, usefulLife: 60, deprMethod: 'straight_line', monthsCharged: 0 })

const isTeachingMode = computed(() => localStorage.getItem('teaching_active') === 'true')

// 教学任务锁：从教学中心跳转过来时解锁，任务完成后重新锁定
const period = getCurrentPeriod()
const purchaseDoneKey = `jd_module_fa_purchase_${period}`
const deprDoneKey = `jd_module_fa_depr_${period}`

const moduleUnlocked = computed(() => {
  if (!isTeachingMode.value) return true
  return sessionStorage.getItem('jd_module_task') === 'fixed-assets'
})
const purchaseDone = computed(() => localStorage.getItem(purchaseDoneKey) === 'done')
const deprDone = computed(() => localStorage.getItem(deprDoneKey) === 'done')
const teachingLocked = computed(() => isTeachingMode.value && (!moduleUnlocked.value || purchaseDone.value))
const deprLocked = computed(() => isTeachingMode.value && (!moduleUnlocked.value || deprDone.value))

function fmt(v) { return formatAmount(v) }
function resetForm() { af.value = { code: '', name: '', category: '', originalValue: 0, salvageValue: 0, usefulLife: 60, deprMethod: 'straight_line', monthsCharged: 0 } }

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

// 资产类别 → 固定资产科目编码映射
const CATEGORY_SUBJECT = {
  '房屋建筑物': '160101',
  '机器设备': '160102',
  '办公设备': '160103',
  '运输设备': '160104',
}

function loadAssets() {
  try { assets.value = JSON.parse(localStorage.getItem('jd_fixed_assets') || '[]').map(a => {
    a.monthlyDepr = calcMonthlyDepreciation(a.originalValue, a.salvageValue, a.usefulLife, a.deprMethod, a.monthsCharged || 0)
    a.accumDepr = (a.monthsCharged || 0) * a.monthlyDepr
    a.netValue = Math.max(a.originalValue - a.accumDepr, 0)
    return a
  }) } catch { assets.value = [] }
}

function saveAsset() {
  if (teachingLocked.value) {
    return ElMessage.warning('🔒 请先到教学中心选择相关任务')
  }
  if (!af.value.name) return ElMessage.warning('请输入资产名称')
  if (!af.value.category) return ElMessage.warning('请选择资产类别')

  // 保存到本地
  const list = JSON.parse(localStorage.getItem('jd_fixed_assets') || '[]')
  const assetId = Date.now()
  list.push({ id: assetId, ...af.value, monthsCharged: af.value.monthsCharged || 0, createdAt: new Date().toISOString() })
  localStorage.setItem('jd_fixed_assets', JSON.stringify(list))
  showForm.value = false
  resetForm()
  loadAssets()

  // 教学模式下：自动生成购买固定资产凭证
  if (isTeachingMode.value) {
    const assetSubject = CATEGORY_SUBJECT[af.value.category] || '160103'
    const subjAsset = findSubject(assetSubject)
    const subjBank = findSubject('100201')

    const result = store.addTeachingVoucher({
      date: todayStr(),
      entries: [
        {
          summary: `购入${af.value.name}`,
          subjectCode: assetSubject,
          subjectId: subjAsset ? subjAsset.id : '',
          subjectName: subjAsset ? subjAsset.name : '',
          debit: af.value.originalValue,
          credit: 0,
          cashFlowItem: 'cf-inv',
          explanation: `固定资产增加。"购入${af.value.name}"按购入成本入账，次月开始计提折旧。`,
        },
        {
          summary: `支付${af.value.name}款`,
          subjectCode: '100201',
          subjectId: subjBank ? subjBank.id : '',
          subjectName: subjBank ? subjBank.name : '',
          debit: 0,
          credit: af.value.originalValue,
          cashFlowItem: 'cf-inv',
          explanation: '银行存款减少。支付资产购置款，该支出属于投资活动现金流出。',
        },
      ],
    })

    if (result.success) {
      localStorage.setItem(purchaseDoneKey, 'done')
      sessionStorage.removeItem('jd_module_task')
      ElMessage.success('✅ 凭证已自动生成！购入固定资产已过账')
      window.dispatchEvent(new CustomEvent('task-updated'))
    } else {
      ElMessage.warning('凭证自动生成失败：' + (result.errors || []).join('；'))
    }
  } else {
    ElMessage.success('资产已添加（非教学模式下不自动生成凭证）')
  }
}

// 计提本月折旧
function handleDepreciation() {
  if (deprLocked.value) {
    return ElMessage.warning('🔒 请先到教学中心选择相关任务')
  }
  if (!assets.value.length) {
    return ElMessage.warning('没有固定资产，无需计提折旧')
  }

  // 检查是否已计提本月折旧
  const deprCheckKey = `jd_fa_depr_${period}`
  if (localStorage.getItem(deprCheckKey)) {
    return ElMessage.info('本月折旧已计提，无需重复操作')
  }

  // 按类别汇总折旧
  let officeDepr = 0   // 管理费用-折旧费（办公设备、房屋）
  let mfgDepr = 0      // 制造费用（机器设备）
  let transportDepr = 0 // 可能的管理/销售费用（运输设备）

  for (const a of assets.value) {
    const d = a.monthlyDepr || 0
    if (a.category === '办公设备' || a.category === '房屋建筑物') {
      officeDepr += d
    } else if (a.category === '机器设备') {
      mfgDepr += d
    } else {
      officeDepr += d // 其他默认计入管理费用
    }
  }

  const totalDepr = officeDepr + mfgDepr + transportDepr
  if (totalDepr <= 0) {
    return ElMessage.warning('折旧额为0，请检查资产数据')
  }

  // 确认对话框
  ElMessageBox.confirm(
    `本月应计提折旧合计：¥${formatAmount(totalDepr)}\n\n` +
    (officeDepr > 0 ? `• 管理费用-折旧费：¥${formatAmount(officeDepr)}\n` : '') +
    (mfgDepr > 0 ? `• 制造费用：¥${formatAmount(mfgDepr)}\n` : ''),
    '确认计提本月折旧',
    { confirmButtonText: '确认计提', cancelButtonText: '取消', type: 'info' }
  ).then(() => {
    // 构建分录
    const entries = []
    let seq = 0
    if (officeDepr > 0) {
      const s = findSubject('660205')
      entries.push({
        summary: '计提折旧-管理用资产',
        subjectCode: '660205',
        subjectId: s ? s.id : '',
        subjectName: s ? s.name : '',
        debit: officeDepr,
        credit: 0,
        cashFlowItem: '',
        explanation: '管理费用-折旧费增加。管理用固定资产（办公设备/房屋）的折旧计入当期损益。',
      })
      seq++
    }
    if (mfgDepr > 0) {
      const s = findSubject('5101')
      entries.push({
        summary: '计提折旧-生产用设备',
        subjectCode: '5101',
        subjectId: s ? s.id : '',
        subjectName: s ? s.name : '',
        debit: mfgDepr,
        credit: 0,
        cashFlowItem: '',
        explanation: '制造费用增加。生产用固定资产（机器设备）的折旧先归集到制造费用，期末分配入生产成本。',
      })
      seq++
    }
    // 贷方：累计折旧
    const s = findSubject('1602')
    entries.push({
      summary: '计提折旧',
      subjectCode: '1602',
      subjectId: s ? s.id : '',
      subjectName: s ? s.name : '',
      debit: 0,
      credit: totalDepr,
      cashFlowItem: '',
      explanation: '累计折旧增加。固定资产因使用损耗价值减少，原值与累计折旧的差额为固定资产净值。',
    })

    const result = store.addTeachingVoucher({
      date: todayStr(),
      entries,
    })

    if (result.success) {
      // 标记本月已计提
      localStorage.setItem(deprCheckKey, 'true')
      localStorage.setItem(deprDoneKey, 'done')
      sessionStorage.removeItem('jd_module_task')
      // 更新各资产的已计提月数
      const list = JSON.parse(localStorage.getItem('jd_fixed_assets') || '[]')
      for (const a of list) {
        // 确保不超过使用寿命
        if ((a.monthsCharged || 0) < a.usefulLife) {
          a.monthsCharged = (a.monthsCharged || 0) + 1
        }
      }
      localStorage.setItem('jd_fixed_assets', JSON.stringify(list))
      loadAssets()
      ElMessage.success(`✅ 折旧凭证已自动生成！本月折旧合计：${formatAmount(totalDepr)}元`)
      window.dispatchEvent(new CustomEvent('task-updated'))
    } else {
      ElMessage.warning('折旧凭证生成失败：' + (result.errors || []).join('；'))
    }
  }).catch(() => {})
}

function delAsset(row) {
  ElMessageBox.confirm('确定删除此项资产吗？').then(() => {
    const list = JSON.parse(localStorage.getItem('jd_fixed_assets') || '[]').filter(a => a.id !== row.id)
    localStorage.setItem('jd_fixed_assets', JSON.stringify(list)); loadAssets()
    ElMessage.success('已删除')
  }).catch(() => {})
}

onMounted(loadAssets)
</script>

<style scoped>
.page-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; }
.page-title { font-size:20px; color:#303133; }
.page-actions { display:flex; gap:8px; }
</style>
