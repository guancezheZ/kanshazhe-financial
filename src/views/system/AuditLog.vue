<template>
  <div class="page">
    <div class="page-header"><h2 class="page-title">审计轨迹</h2></div>
    <el-card shadow="never">
      <el-table :data="logs" border stripe size="small" empty-text="暂无操作记录">
        <el-table-column label="时间" width="170">
          <template #default="{ row }">{{ new Date(row.time).toLocaleString('zh-CN') }}</template>
        </el-table-column>
        <el-table-column label="操作人" prop="user" width="100" />
        <el-table-column label="操作" prop="action" width="100" />
        <el-table-column label="详情" prop="detail" min-width="200" />
      </el-table>
    </el-card>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useStore } from '@/stores/store.js'
const store = useStore()
const logs = computed(() => store.getAuditLogs())
</script>
<style scoped>
.page-header { margin-bottom:16px; }
.page-title { font-size:20px; color:#303133; }
</style>
