<template>
  <div class="page">
    <div class="page-header"><h2 class="page-title">会计期间管理</h2></div>
    <el-card shadow="never">
      <el-table :data="periods" border stripe size="small" empty-text="暂无期间数据">
        <el-table-column label="会计期间" min-width="120">
          <template #default="{ row }">{{ row.period.slice(0,4) }}年{{ row.period.slice(4,6) }}月</template>
        </el-table-column>
        <el-table-column label="状态" width="120">
          <template #default="{ row }">
            <el-tag :type="row.isClosed ? 'danger' : 'success'" size="small">{{ row.isClosed ? '已结账' : '开启' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template #default="{ row }">
            <el-button :type="row.isClosed ? 'success' : 'warning'" size="small" @click="handleToggle(row)">
              {{ row.isClosed ? '反结账' : '结账' }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useStore } from '@/stores/store.js'
const store = useStore()
const periods = computed(() => store.getPeriods())
function handleToggle(row) {
  if (localStorage.getItem('tutorial_task')) {
    ElMessage.info('💡 教学期间会计期间由系统自动管理，手动结账/反结账会导致教学月份数据异常。请在浮动窗切换至「自由练习」模式后再操作。')
    return
  }
  if (store.getCurrentRole() !== 'supervisor') {
    ElMessage.warning('⚠️ 结账/反结账仅限主管角色操作。')
    return
  }
  const msg = row.isClosed ? '反结账后可以修改该期间凭证' : '结账后该期间凭证不可修改'
  ElMessageBox.confirm(`确定${row.isClosed ? '反结账' : '结账'}${row.period.slice(0,4)}年${row.period.slice(4,6)}月？${msg}`, '提示').then(() => {
    store.togglePeriod(row.period)
    ElMessage.success(row.isClosed ? '已反结账' : '已结账')
  }).catch(() => {})
}
</script>
<style scoped>
.page-header { margin-bottom:16px; }
.page-title { font-size:20px; color:#303133; }
</style>
