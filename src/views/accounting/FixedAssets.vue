<template>
  <div class="page">
    <div class="page-header">
      <h2 class="page-title">固定资产</h2>
      <div class="page-actions">
        <el-button type="primary" size="small" @click="handleAddAssetClick">
          ➕ 新增资产
        </el-button>
        <el-button type="success" size="small" @click="handleDepreciationClick">
          📆 计提本月折旧
        </el-button>
      </div>
    </div>

    <el-card shadow="never">
      <el-table :data="assets" border stripe size="small" empty-text="暂无固定资产，请通过凭证录入完成购入">
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
        <el-table-column label="操作" width="100" v-if="!isTeachingMode">
          <template #default="{ row }">
            <el-button text size="small" type="danger" @click="delAsset(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 新增资产弹窗 -->
    <el-dialog v-model="showForm" title="新增资产" width="520">
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

const period = getCurrentPeriod()
function getAssetsKey() {
  const sid = localStorage.getItem('jd_scenario') || 'manufacturing'
  return `jd_fixed_assets_${sid}`
}

// ─── 教学提示文案 ──────────────────────────────
const TEACHING_HINTS = {
  addAsset: {
    title: '教学模式下无法直接新增资产',
    msg: '请通过【凭证录入】填制分录完成。\n\n📋 分录示例：\n  借：固定资产（1601）\n  贷：银行存款（1002）\n\n💡 真实企业做法：\n填写资产卡片（名称、类别、原值、残值率、\n折旧年限、折旧方法），系统自动生成凭证，\n次月起自动计提折旧。',
  },
  depreciation: {
    title: '教学模式下无法直接计提折旧',
    msg: '请通过【凭证录入】填制分录完成。\n\n📋 分录示例：\n  借：管理费用-折旧费（660205）\n  贷：累计折旧（1602）\n\n💡 真实企业做法：\n系统根据资产卡片自动计算月折旧额，\n点击「计提折旧」自动生成凭证，\n无需手动录入分录。',
  },
}

function handleAddAssetClick() {
  if (isTeachingMode.value) {
    ElMessage.info({ message: TEACHING_HINTS.addAsset.msg, title: TEACHING_HINTS.addAsset.title, duration: 8000 })
    return
  }
  showForm.value = true
  editId.value = null
  resetForm()
}

function handleDepreciationClick() {
  if (isTeachingMode.value) {
    ElMessage.info({ message: TEACHING_HINTS.depreciation.msg, title: TEACHING_HINTS.depreciation.title, duration: 8000 })
    return
  }
  handleDepreciation()
}

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
  try { assets.value = JSON.parse(localStorage.getItem(getAssetsKey()) || '[]').map(a => {
    a.monthlyDepr = calcMonthlyDepreciation(a.originalValue, a.salvageValue, a.usefulLife, a.deprMethod, a.monthsCharged || 0)
    a.accumDepr = (a.monthsCharged || 0) * a.monthlyDepr
    a.netValue = Math.max(a.originalValue - a.accumDepr, 0)
    return a
  }) } catch { assets.value = [] }
}

function saveAsset() {
  if (!af.value.name) return ElMessage.warning('请输入资产名称')
  if (!af.value.category) return ElMessage.warning('请选择资产类别')

  // 保存到本地
  const list = JSON.parse(localStorage.getItem(getAssetsKey()) || '[]')
  const assetId = Date.now()
  list.push({ id: assetId, ...af.value, monthsCharged: af.value.monthsCharged || 0, createdAt: new Date().toISOString() })
  localStorage.setItem(getAssetsKey(), JSON.stringify(list))
  showForm.value = false
  resetForm()
  loadAssets()
  ElMessage.success('资产已添加')
}

// 计提本月折旧（非教学模式下手动操作）
function handleDepreciation() {
  if (!assets.value.length) {
    return ElMessage.warning('没有固定资产，无需计提折旧')
  }

  // 检查是否已计提本月折旧（查凭证而非仅localStorage，防止用户清数据后重复计提）
  if (store.state.vouchers.some(v => v.period === period && v.entries.some(e => e.subjectCode === '660205' && e.debit > 0))) {
    return ElMessage.info('本月折旧已计提（凭证记录存在），无需重复操作')
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
      // 更新各资产的已计提月数
      const list = JSON.parse(localStorage.getItem(getAssetsKey()) || '[]')
      for (const a of list) {
        // 确保不超过使用寿命
        if ((a.monthsCharged || 0) < a.usefulLife) {
          a.monthsCharged = (a.monthsCharged || 0) + 1
        }
      }
      localStorage.setItem(getAssetsKey(), JSON.stringify(list))
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
    const list = JSON.parse(localStorage.getItem(getAssetsKey()) || '[]').filter(a => a.id !== row.id)
    localStorage.setItem(getAssetsKey(), JSON.stringify(list)); loadAssets()
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
