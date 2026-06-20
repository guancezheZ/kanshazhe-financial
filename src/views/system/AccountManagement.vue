<template>
  <div class="page">
    <div class="page-header">
      <h2 class="page-title">账套管理</h2>
      <div class="page-actions">
        <el-button type="primary" @click="handleNewAccount">
          <el-icon><Plus /></el-icon>新建账套
        </el-button>
        <el-button type="danger" @click="showReset=true">重置数据</el-button>
      </div>
    </div>

    <el-row :gutter="16">
      <el-col v-for="acc in accounts" :key="acc.id" :span="8">
        <el-card
          shadow="never"
          class="account-card"
          :class="{ active: acc.id === currentId }"
          @click="handleSwitch(acc.id)"
        >
          <div class="card-header">
            <el-icon :size="24" color="#409eff"><Coin /></el-icon>
            <span class="card-name">{{ acc.name }}</span>
            <el-tag v-if="acc.id === currentId" size="small" type="success">当前</el-tag>
          </div>
          <div class="card-info">
            <div>会计年度：{{ acc.fiscalYear }}</div>
            <div>会计准则：{{ acc.standard }}</div>
            <div>本位币：{{ acc.currency }}</div>
          </div>
          <div class="card-actions">
            <el-button v-if="acc.id !== currentId" size="small" @click.stop="handleSwitch(acc.id)">
              切换
            </el-button>
            <el-button v-if="accounts.length > 1 && acc.id !== currentId" size="small" type="danger" @click.stop="handleDelete(acc.id)">
              删除
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 新建账套对话框 -->
    <el-dialog v-model="showCreateDialog" title="新建账套" width="500">
      <el-form :model="createForm" :rules="createRules" ref="createFormRef" label-width="100px">
        <el-form-item label="账套名称" prop="name">
          <el-input v-model="createForm.name" placeholder="输入账套名称" />
        </el-form-item>
        <el-form-item label="会计年度" prop="fiscalYear">
          <el-input-number v-model="createForm.fiscalYear" :min="2020" :max="2099" />
        </el-form-item>
        <el-form-item label="会计准则" prop="standard">
          <el-select v-model="createForm.standard" style="width:100%">
            <el-option label="企业会计准则" value="企业会计准则" />
            <el-option label="小企业会计准则" value="小企业会计准则" />
          </el-select>
        </el-form-item>
        <el-form-item label="本位币" prop="currency">
          <el-select v-model="createForm.currency" style="width:100%">
            <el-option label="人民币（CNY）" value="CNY" />
            <el-option label="美元（USD）" value="USD" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showCreateDialog = false">取消</el-button>
        <el-button type="primary" @click="handleCreate">创建</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="showReset" title="重置数据" width="420">
      <el-alert type="warning" show-icon title="此操作将清除所有凭证、余额和自定义数据！"
        description="科目表将恢复到预设的60个标准科目。此操作不可撤销。"
        :closable="false" />
      <template #footer>
        <el-button @click="showReset=false">取消</el-button>
        <el-button type="danger" @click="handleReset">确认重置</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Plus, Coin } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useStore } from '@/stores/store.js'

const store = useStore()
const state = store.state

const currentId = computed(() => state.currentAccountId)
const accounts = computed(() => state.accounts)

const showCreateDialog = ref(false)
const createFormRef = ref(null)
const createForm = ref({
  name: '',
  fiscalYear: new Date().getFullYear(),
  standard: '企业会计准则',
  currency: 'CNY',
})

const createRules = {
  name: [{ required: true, message: '请输入账套名称', trigger: 'blur' }],
  fiscalYear: [{ required: true, message: '请选择会计年度', trigger: 'blur' }],
}

// 教学/非主管角色点击新建账套时给出提示
function handleNewAccount() {
  if (localStorage.getItem('tutorial_task')) {
    ElMessage.info('💡 教学期间不支持新建账套。如需练习请在浮动窗切换至「自由练习」模式。')
    return
  }
  const role = store.getCurrentRole()
  if (role !== 'supervisor') {
    ElMessage.info('💡 系统暂只支持单账套运行。真实企业中可能涉及多账套管理（如分公司独立核算），本系统专注于教学场景。')
    return
  }
  showCreateDialog.value = true
}

function handleSwitch(id) {
  if (id === currentId.value) return
  store.switchAccount(id)
  ElMessage.success('已切换至：' + accounts.value.find(a => a.id === id)?.name)
}

function handleDelete(id) {
  const acc = accounts.value.find(a => a.id === id)
  ElMessageBox.confirm(`确定删除账套"${acc?.name}"吗？此操作不可恢复。`, '删除确认', {
    confirmButtonText: '删除', cancelButtonText: '取消', type: 'warning',
  }).then(() => {
    const result = store.deleteAccount(id)
    if (result.success) {
      ElMessage.success('账套已删除')
    } else {
      ElMessage.error(result.error)
    }
  }).catch(() => {})
}

function handleCreate() {
  createFormRef.value.validate((valid) => {
    if (!valid) return
    store.addAccount({ ...createForm.value })
    ElMessage.success('账套已创建')
    showCreateDialog.value = false
    createForm.value = { name: '', fiscalYear: new Date().getFullYear(), standard: '企业会计准则', currency: 'CNY' }
  })
}

const showReset = ref(false)

function handleReset() {
  // 教学模式下保护数据
  const tutorialTask = localStorage.getItem('tutorial_task')
  if (tutorialTask) {
    ElMessage.info('💡 教学期间数据由系统自动管理，重置数据请前往教学中心使用"重置进度"功能。')
    showReset.value = false
    return
  }
  store.resetToDefaults()
  ElMessage.success('数据已重置，请刷新页面')
  showReset.value = false
  setTimeout(() => location.reload(), 1000)
}
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.page-title { font-size: 20px; color: #303133; }
.page-actions { display: flex; gap: 8px; }
.account-card {
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 16px;
}
.account-card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
.account-card.active { border: 2px solid #409eff; }
.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}
.card-name { font-size: 16px; font-weight: 600; color: #303133; }
.card-info {
  font-size: 13px;
  color: #606266;
  line-height: 1.8;
}
.card-actions {
  margin-top: 12px;
  display: flex;
  gap: 8px;
}
</style>
