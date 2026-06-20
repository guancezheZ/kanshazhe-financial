<template>
  <div class="page">
    <div class="page-header">
      <h2 class="page-title">固定资产</h2>
      <div class="page-actions">
        <el-button type="primary" size="small" @click="showForm=true;editId=null;resetForm()">新增资产</el-button>
      </div>
    </div>

    <el-card shadow="never">
      <el-table :data="assets" border stripe size="small" empty-text="暂无固定资产">
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

    <el-dialog v-model="showForm" title="新增资产" width="500">
      <el-form :model="af" label-width="90px">
        <el-form-item label="编码"><el-input v-model="af.code" /></el-form-item>
        <el-form-item label="名称"><el-input v-model="af.name" /></el-form-item>
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
        <el-button type="primary" @click="saveAsset">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { formatAmount, calcMonthlyDepreciation } from '@/utils/accounting.js'

const showForm = ref(false)
const editId = ref(null)
const assets = ref([])
const af = ref({ code: '', name: '', category: '', originalValue: 0, salvageValue: 0, usefulLife: 60, deprMethod: 'straight_line', monthsCharged: 0 })

function fmt(v) { return formatAmount(v) }
function resetForm() { af.value = { code: '', name: '', category: '', originalValue: 0, salvageValue: 0, usefulLife: 60, deprMethod: 'straight_line', monthsCharged: 0 } }

function loadAssets() {
  try { assets.value = JSON.parse(localStorage.getItem('jd_fixed_assets') || '[]').map(a => {
    a.monthlyDepr = calcMonthlyDepreciation(a.originalValue, a.salvageValue, a.usefulLife, a.deprMethod, a.monthsCharged || 0)
    a.accumDepr = (a.monthsCharged || 0) * a.monthlyDepr
    a.netValue = Math.max(a.originalValue - a.accumDepr, 0)
    return a
  }) } catch { assets.value = [] }
}

function saveAsset() {
  if (!af.value.name) return ElMessage.warning('请输入名称')
  const list = JSON.parse(localStorage.getItem('jd_fixed_assets') || '[]')
  list.push({ id: Date.now(), ...af.value, monthsCharged: af.value.monthsCharged || 0, createdAt: new Date().toISOString() })
  localStorage.setItem('jd_fixed_assets', JSON.stringify(list))
  showForm.value = false; resetForm(); loadAssets()
  ElMessage.success('资产已添加')
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
