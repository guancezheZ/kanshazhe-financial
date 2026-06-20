<template>
  <div class="page">
    <div class="page-header">
      <h2 class="page-title">工资管理</h2>
    </div>
    <el-row :gutter="16">
      <el-col :span="8">
        <el-card shadow="never">
          <template #header>
            <div class="card-h"><span>工资项目</span><el-button size="small" type="primary" @click="showForm=true;resetForm()">新增</el-button></div>
          </template>
          <el-table :data="items" border stripe size="small" empty-text="暂无项目">
            <el-table-column label="名称" prop="name" min-width="120" />
            <el-table-column label="类型" width="80"><template #default="{ row }">{{ row.type==='income'?'收入':'扣款' }}</template></el-table-column>
            <el-table-column label="操作" width="80"><template #default="{ row }"><el-button text size="small" type="danger" @click="delItem(row)">删除</el-button></template></el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card shadow="never">
          <template #header>
            <div class="card-h">
              <span>工资计算</span>
              <div>
                <el-date-picker v-model="period" type="month" value-format="YYYYMM" size="small" style="width:140px" />
                <el-button size="small" type="primary" style="margin-left:8px" @click="calcPayroll">计算</el-button>
                <el-button size="small" @click="genVoucher">生成凭证</el-button>
              </div>
            </div>
          </template>
          <el-empty description="点击计算查看本月工资" />
        </el-card>
      </el-col>
    </el-row>

    <el-dialog v-model="showForm" title="新增工资项目" width="400">
      <el-form :model="form" label-width="70px">
        <el-form-item label="名称"><el-input v-model="form.name" /></el-form-item>
        <el-form-item label="类型"><el-radio-group v-model="form.type"><el-radio value="income">收入</el-radio><el-radio value="deduction">扣款</el-radio></el-radio-group></el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showForm=false">取消</el-button>
        <el-button type="primary" @click="saveItem">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getCurrentPeriod } from '@/utils/accounting.js'

const period = ref(getCurrentPeriod())
const showForm = ref(false)
const items = ref([])
const form = ref({ name: '', type: 'income' })

function resetForm() { form.value = { name: '', type: 'income' } }

function loadItems() {
  try { items.value = JSON.parse(localStorage.getItem('jd_payroll_items') || '[]') } catch { items.value = [] }
}
function saveItem() {
  if (!form.value.name) return ElMessage.warning('请输入名称')
  const list = JSON.parse(localStorage.getItem('jd_payroll_items') || '[]')
  list.push({ id: Date.now(), ...form.value })
  localStorage.setItem('jd_payroll_items', JSON.stringify(list))
  showForm.value = false; resetForm(); loadItems()
  ElMessage.success('已保存')
}
function delItem(row) {
  ElMessageBox.confirm('确认删除？').then(() => {
    const list = items.value.filter(i => i.id !== row.id)
    localStorage.setItem('jd_payroll_items', JSON.stringify(list)); loadItems()
    ElMessage.success('已删除')
  }).catch(() => {})
}
function calcPayroll() { ElMessage.info('工资计算功能：根据工资项目设置自动计算应发/扣款/实发') }
function genVoucher() { ElMessage.info('生成凭证功能：一键生成计提工资凭证（借：管理费用/贷：应付职工薪酬）') }

onMounted(loadItems)
</script>

<style scoped>
.page-header { margin-bottom:16px; }
.page-title { font-size:20px; color:#303133; }
.card-h { display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; }
</style>
