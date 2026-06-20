<template>
  <div class="page">
    <div class="page-header">
      <h2 class="page-title">辅助核算</h2>
    </div>

    <el-row :gutter="16">
      <!-- 左侧：维度列表 -->
      <el-col :span="8">
        <el-card shadow="never">
          <template #header>
            <div class="card-h">
              <span>核算维度</span>
              <el-button size="small" type="primary" @click="showDimDialog = true">新增维度</el-button>
            </div>
          </template>
          <el-table :data="dims" size="small" border stripe highlight-current-row
            @current-change="handleDimChange" style="cursor:pointer">
            <el-table-column label="维度名称" prop="name" />
            <el-table-column label="编码" prop="code" width="80" />
            <el-table-column label="操作" width="80">
              <template #default="{ row }">
                <el-button text size="small" type="danger" @click="handleDelDim(row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>

      <!-- 右侧：核算项目列表 -->
      <el-col :span="16">
        <el-card shadow="never">
          <template #header>
            <div class="card-h">
              <span>核算项目 — {{ currentDim?.name || '请选择维度' }}</span>
              <el-button v-if="currentDim" size="small" type="primary" @click="showItemDialog = true">
                新增项目
              </el-button>
            </div>
          </template>
          <el-empty v-if="!currentDim" description="从左侧选择核算维度" />
          <el-table v-else :data="items" size="small" border stripe>
            <el-table-column label="编码" prop="code" width="100" />
            <el-table-column label="名称" prop="name" />
            <el-table-column label="状态" width="80">
              <template #default="{ row }">
                <el-tag :type="row.enabled ? 'success' : 'info'" size="small">
                  {{ row.enabled ? '启用' : '停用' }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120">
              <template #default="{ row }">
                <el-button text size="small" @click="editItem(row)">编辑</el-button>
                <el-button text size="small" type="danger" @click="handleDelItem(row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <!-- 新增维度对话框 -->
    <el-dialog v-model="showDimDialog" title="新增核算维度" width="400">
      <el-form :model="dimForm" label-width="80px">
        <el-form-item label="名称"><el-input v-model="dimForm.name" /></el-form-item>
        <el-form-item label="编码"><el-input v-model="dimForm.code" /></el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showDimDialog = false">取消</el-button>
        <el-button type="primary" @click="handleAddDim">确定</el-button>
      </template>
    </el-dialog>

    <!-- 新增项目对话框 -->
    <el-dialog v-model="showItemDialog" :title="editingItem ? '编辑项目' : '新增项目'" width="400">
      <el-form :model="itemForm" label-width="80px">
        <el-form-item label="编码"><el-input v-model="itemForm.code" /></el-form-item>
        <el-form-item label="名称"><el-input v-model="itemForm.name" /></el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="itemForm.enabled" active-text="启用" inactive-text="停用" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showItemDialog = false">取消</el-button>
        <el-button type="primary" @click="handleAddItem">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useStore } from '@/stores/store.js'

const store = useStore()

const dims = computed(() => store.state.auxiliaryDimensions)
const currentDim = ref(null)
const items = ref([])
const showDimDialog = ref(false)
const showItemDialog = ref(false)
const editingItem = ref(null)

const dimForm = ref({ name: '', code: '' })
const itemForm = ref({ code: '', name: '', enabled: true })

function handleDimChange(row) {
  currentDim.value = row
  items.value = store.getAuxItems(row.id)
}

function handleAddDim() {
  if (!dimForm.value.name) return ElMessage.warning('请输入维度名称')
  store.addAuxDimension({ ...dimForm.value })
  ElMessage.success('维度已添加')
  showDimDialog.value = false
  dimForm.value = { name: '', code: '' }
}

function handleDelDim(row) {
  ElMessageBox.confirm(`确定删除维度"${row.name}"吗？`, '确认').then(() => {
    const r = store.deleteAuxDimension(row.id)
    if (r.success) { ElMessage.success('已删除'); if (currentDim.value?.id === row.id) { currentDim.value = null; items.value = [] } }
    else ElMessage.error(r.error)
  }).catch(() => {})
}

function handleAddItem() {
  if (!itemForm.value.name) return ElMessage.warning('请输入项目名称')
  if (editingItem.value) {
    store.updateAuxItem(editingItem.value.id, { ...itemForm.value })
    ElMessage.success('已更新')
  } else {
    store.addAuxItem({ dimId: currentDim.value.id, ...itemForm.value })
    ElMessage.success('项目已添加')
  }
  showItemDialog.value = false
  editingItem.value = null
  itemForm.value = { code: '', name: '', enabled: true }
  items.value = store.getAuxItems(currentDim.value.id)
}

function editItem(row) {
  editingItem.value = row
  itemForm.value = { code: row.code, name: row.name, enabled: row.enabled }
  showItemDialog.value = true
}

function handleDelItem(row) {
  ElMessageBox.confirm(`确定删除项目"${row.name}"吗？`, '确认').then(() => {
    store.deleteAuxItem(row.id)
    ElMessage.success('已删除')
    items.value = store.getAuxItems(currentDim.value.id)
  }).catch(() => {})
}
</script>

<style scoped>
.page-header { margin-bottom: 16px; }
.page-title { font-size: 20px; color: #303133; }
.card-h { display: flex; justify-content: space-between; align-items: center; }
</style>
