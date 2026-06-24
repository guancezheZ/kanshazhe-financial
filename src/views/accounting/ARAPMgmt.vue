<template>
  <div class="page">
    <div class="page-header"><h2 class="page-title">应收应付</h2></div>
    <el-card shadow="never">
      <el-tabs v-model="tab">
        <el-tab-pane label="客户档案" name="customers">
          <div style="margin-bottom:12px"><el-button size="small" type="primary" @click="handleAddCust">新增客户</el-button></div>
          <el-table :data="customers" border stripe size="small" empty-text="暂无客户">
            <el-table-column label="编码" prop="code" width="100" />
            <el-table-column label="名称" prop="name" min-width="160" />
            <el-table-column label="联系人" prop="contact" width="120" />
            <el-table-column label="电话" prop="phone" width="140" />
            <el-table-column label="操作" width="100" v-if="!isTeachingMode">
              <template #default="{ row }"><el-button text size="small" type="danger" @click="delCust(row)">删除</el-button></template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="供应商档案" name="vendors">
          <div style="margin-bottom:12px"><el-button size="small" type="primary" @click="handleAddVen">新增供应商</el-button></div>
          <el-table :data="vendors" border stripe size="small" empty-text="暂无供应商">
            <el-table-column label="编码" prop="code" width="100" />
            <el-table-column label="名称" prop="name" min-width="160" />
            <el-table-column label="联系人" prop="contact" width="120" />
            <el-table-column label="电话" prop="phone" width="140" />
            <el-table-column label="操作" width="100" v-if="!isTeachingMode">
              <template #default="{ row }"><el-button text size="small" type="danger" @click="delVen(row)">删除</el-button></template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="账龄分析" name="aging">
          <el-empty description="账龄分析功能：基于已过账凭证的应收/应付科目按账龄区间（30/60/90/120+天）自动统计。" />
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <el-dialog v-model="showCust" title="新增客户" width="400">
      <el-form :model="cf" label-width="70px">
        <el-form-item label="编码"><el-input v-model="cf.code" /></el-form-item>
        <el-form-item label="名称"><el-input v-model="cf.name" /></el-form-item>
        <el-form-item label="联系人"><el-input v-model="cf.contact" /></el-form-item>
        <el-form-item label="电话"><el-input v-model="cf.phone" /></el-form-item>
      </el-form>
      <template #footer><el-button @click="showCust=false">取消</el-button><el-button type="primary" @click="saveCust">保存</el-button></template>
    </el-dialog>
    <el-dialog v-model="showVen" title="新增供应商" width="400">
      <el-form :model="vf" label-width="70px">
        <el-form-item label="编码"><el-input v-model="vf.code" /></el-form-item>
        <el-form-item label="名称"><el-input v-model="vf.name" /></el-form-item>
        <el-form-item label="联系人"><el-input v-model="vf.contact" /></el-form-item>
        <el-form-item label="电话"><el-input v-model="vf.phone" /></el-form-item>
      </el-form>
      <template #footer><el-button @click="showVen=false">取消</el-button><el-button type="primary" @click="saveVen">保存</el-button></template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const tab = ref('customers')
const showCust = ref(false)
const showVen = ref(false)
const customers = ref([])
const vendors = ref([])
const cf = reactive({ code: '', name: '', contact: '', phone: '' })
const vf = reactive({ code: '', name: '', contact: '', phone: '' })

const isTeachingMode = computed(() => localStorage.getItem('teaching_active') === 'true')
function getCustKey() {
  const sid = localStorage.getItem('jd_scenario') || 'manufacturing'
  return `jd_arap_customers_${sid}`
}
function getVenKey() {
  const sid = localStorage.getItem('jd_scenario') || 'manufacturing'
  return `jd_arap_vendors_${sid}`
}

function handleAddCust() {
  if (isTeachingMode.value) {
    ElMessage.info({ message: '教学模式下客户数据已预设，无需手动添加。\n\n💡 真实企业做法：在应收应付模块管理客户档案（名称、联系人、信用额度等），用于应收账款核算和账龄分析。', title: '教学模式下无法新增客户', duration: 6000 })
    return
  }
  showCust.value = true
}
function handleAddVen() {
  if (isTeachingMode.value) {
    ElMessage.info({ message: '教学模式下供应商数据已预设，无需手动添加。\n\n💡 真实企业做法：在应收应付模块管理供应商档案，用于应付账款核算和付款计划管理。', title: '教学模式下无法新增供应商', duration: 6000 })
    return
  }
  showVen.value = true
}

function loadCust() {
  try { customers.value = JSON.parse(localStorage.getItem(getCustKey()) || '[]') } catch { customers.value = [] }
}
function loadVen() {
  try { vendors.value = JSON.parse(localStorage.getItem(getVenKey()) || '[]') } catch { vendors.value = [] }
}
function saveCust() {
  if (!cf.name) return ElMessage.warning('请输入名称')
  const list = [...customers.value, { id: Date.now(), ...cf }]
  localStorage.setItem(getCustKey(), JSON.stringify(list))
  loadCust(); showCust.value = false; cf.code = ''; cf.name = ''; cf.contact = ''; cf.phone = ''
  ElMessage.success('已添加')
}
function saveVen() {
  if (!vf.name) return ElMessage.warning('请输入名称')
  const list = [...vendors.value, { id: Date.now(), ...vf }]
  localStorage.setItem(getVenKey(), JSON.stringify(list))
  loadVen(); showVen.value = false; vf.code = ''; vf.name = ''; vf.contact = ''; vf.phone = ''
  ElMessage.success('已添加')
}
function delCust(row) {
  ElMessageBox.confirm('确认删除？').then(() => {
    const list = customers.value.filter(c => c.id !== row.id)
    localStorage.setItem(getCustKey(), JSON.stringify(list)); loadCust(); ElMessage.success('已删除')
  }).catch(() => {})
}
function delVen(row) {
  ElMessageBox.confirm('确认删除？').then(() => {
    const list = vendors.value.filter(v => v.id !== row.id)
    localStorage.setItem(getVenKey(), JSON.stringify(list)); loadVen(); ElMessage.success('已删除')
  }).catch(() => {})
}
onMounted(() => { loadCust(); loadVen() })
</script>
<style scoped>
.page-header { margin-bottom:16px; }
.page-title { font-size:20px; color:#303133; }
</style>
