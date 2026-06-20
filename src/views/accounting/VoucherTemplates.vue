<template>
  <div class="page">
    <div class="page-header">
      <h2 class="page-title">凭证模板</h2>
      <div class="page-actions">
        <el-button type="primary" @click="showForm = true; editingId = null; resetForm()">新增模板</el-button>
      </div>
    </div>

    <el-card shadow="never">
      <el-table :data="templates" border stripe size="small" empty-text="暂无凭证模板">
        <el-table-column label="模板名称" prop="name" min-width="200" />
        <el-table-column label="分录数" width="80">
          <template #default="{ row }">{{ row.entries?.length || 0 }}</template>
        </el-table-column>
        <el-table-column label="创建时间" width="160">
          <template #default="{ row }">{{ formatDate(row.createdAt) }}</template>
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template #default="{ row }">
            <el-button text size="small" type="primary" @click="useTemplate(row)">应用</el-button>
            <el-button text size="small" type="danger" @click="handleDel(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 新增/编辑模板对话框 -->
    <el-dialog v-model="showForm" :title="editingId ? '编辑模板' : '新增模板'" width="700">
      <el-form :model="form" label-width="80px">
        <el-form-item label="模板名称">
          <el-input v-model="form.name" placeholder="如：计提工资、缴纳税费" />
        </el-form-item>
        <el-form-item label="分录">
          <div class="entries-area">
            <div v-for="(e, i) in form.entries" :key="i" class="entry-row">
              <el-input v-model="e.summary" placeholder="摘要" size="small" style="width:150px" />
              <SubjectSelect v-model="e.subjectId" placeholder="科目" size="small" class="subject-w"
                @change="(s) => { e.subjectCode = s.code; e.subjectName = s.name }" />
              <el-select v-model="e.direction" size="small" style="width:80px">
                <el-option label="借方" value="debit" />
                <el-option label="贷方" value="credit" />
              </el-select>
              <el-button text type="danger" size="small" @click="form.entries.splice(i, 1)">×</el-button>
            </div>
            <el-button size="small" @click="form.entries.push({ summary: '', subjectId: '', subjectCode: '', subjectName: '', direction: 'debit' })">
              + 新增分录
            </el-button>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showForm = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useStore } from '@/stores/store.js'
import SubjectSelect from '@/components/SubjectSelect.vue'

const store = useStore()
const templates = computed(() => store.state.voucherTemplates)
const showForm = ref(false)
const editingId = ref(null)
const form = ref({ name: '', entries: [] })

function resetForm() { form.value = { name: '', entries: [] } }

function formatDate(iso) {
  if (!iso) return ''
  return iso.slice(0, 10) + ' ' + iso.slice(11, 16)
}

function handleSave() {
  if (!form.value.name) return ElMessage.warning('请输入模板名称')
  store.addVoucherTemplate({ name: form.value.name, entries: form.value.entries })
  ElMessage.success('模板已保存')
  showForm.value = false
  resetForm()
}

function useTemplate(tmpl) {
  // 跳转到凭证录入页，携带模板信息
  const encoded = encodeURIComponent(JSON.stringify(tmpl.entries))
  window.open(`/#/accounting/voucher/entry?template=${encoded}`, '_blank')
  ElMessage.success('已在新标签页打开凭证录入，请调整分录后保存')
}

function handleDel(row) {
  ElMessageBox.confirm(`确定删除模板"${row.name}"吗？`, '确认').then(() => {
    store.deleteVoucherTemplate(row.id)
    ElMessage.success('已删除')
  }).catch(() => {})
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
.entries-area { display: flex; flex-direction: column; gap: 8px; }
.entry-row { display: flex; gap: 8px; align-items: center; }
.subject-w { flex: 1; }
</style>
