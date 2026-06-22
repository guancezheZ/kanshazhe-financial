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

    <!-- ⭐ 存储空间清理 -->
    <el-card shadow="never" class="storage-card" style="margin-top:16px">
      <div class="storage-header">
        <h3 class="storage-title">📦 本地存储空间</h3>
        <el-tag :type="storageTagType" size="small">{{ storageUsage }} MB</el-tag>
      </div>
      <div class="storage-body">
        <div class="storage-stats">
          <span>教程标记: <strong>{{ stats.tutorialDone }}</strong> 项</span>
          <span>场景数据: <strong>{{ stats.scenarioData }}</strong> 项</span>
          <span>案例数据: <strong>{{ stats.caseData }}</strong> 项</span>
          <span>其他数据: <strong>{{ stats.other }}</strong> 项</span>
        </div>
        <div class="storage-actions">
          <el-button size="small" plain @click="handleStorageClean">
            <el-icon><Delete /></el-icon> 清理过期数据
          </el-button>
          <span v-if="lastCleanup" class="storage-hint">
            上次清理: {{ lastCleanup }}
          </span>
        </div>
        <div v-if="cleanResult" class="storage-result" :class="{ success: !cleanResult.error }">
          {{ cleanResult.message }}
        </div>
      </div>
    </el-card>

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
import { Plus, Coin, Delete } from '@element-plus/icons-vue'
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

// ─── 存储空间清理 ───
import { getStorageStats, getStorageUsageMB, runCleanup, getLastCleanupInfo } from '@/utils/storage-cleanup.js'

const storageUsage = ref('0')
const stats = ref({ tutorialDone: 0, scenarioData: 0, caseData: 0, other: 0 })
const cleanResult = ref(null)
const lastCleanup = ref('')

function refreshStorageInfo() {
  storageUsage.value = getStorageUsageMB()
  stats.value = getStorageStats()
  const info = getLastCleanupInfo()
  if (info?.lastRun) {
    lastCleanup.value = new Date(info.lastRun).toLocaleString('zh-CN')
  } else {
    lastCleanup.value = ''
  }
}

const storageTagType = computed(() => {
  const mb = parseFloat(storageUsage.value)
  if (mb > 4) return 'danger'
  if (mb > 2) return 'warning'
  return 'info'
})

function handleStorageClean() {
  const result = runCleanup({ monthsToKeep: 6, maxCompletedTasks: 2000 })
  const savedMB = ((result.beforeBytes - result.afterBytes) / (1024 * 1024)).toFixed(2)
  const parts = []
  if (result.tutorialMarkersRemoved > 0) parts.push('教程标记 ' + result.tutorialMarkersRemoved + ' 项')
  if (result.xpTasksTrimmed > 0) parts.push('XP记录 ' + result.xpTasksTrimmed + ' 项')
  if (result.orphansRemoved > 0) parts.push('冗余数据 ' + result.orphansRemoved + ' 项')
  if (result.abandonedDataRemoved > 0) parts.push('废弃场景 ' + result.abandonedDataRemoved + ' 项')

  const detail = parts.length > 0 ? '（' + parts.join('，') + '）' : '无过期数据'
  cleanResult.value = {
    message: '✅ 清理完成！释放 ' + savedMB + ' MB ' + detail,
    error: false,
  }
  refreshStorageInfo()
  setTimeout(() => { cleanResult.value = null }, 5000)
}

onMounted(() => { refreshStorageInfo() })
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

/* ⭐ 存储空间卡片 */
.storage-card { background: var(--bg-card, #faf7f2); }
.storage-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.storage-title { font-size: 16px; font-weight: 600; margin: 0; color: var(--text, #303133); }
.storage-body { display: flex; flex-direction: column; gap: 10px; }
.storage-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  font-size: 13px;
  color: var(--text-secondary, #606266);
}
.storage-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}
.storage-hint { font-size: 12px; color: var(--text-muted, #909399); }
.storage-result {
  font-size: 13px;
  padding: 6px 12px;
  border-radius: 6px;
  background: var(--bg-success, #f0f9eb);
  color: var(--color-success, #67c23a);
}
</style>
