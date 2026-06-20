<template>
  <div class="page">
    <div class="page-header">
      <h2 class="page-title">科目表</h2>
      <div class="page-actions">
        <el-input
          v-model="searchText"
          placeholder="搜索科目编码/名称"
          :prefix-icon="Search"
          clearable
          class="search-input"
          @input="handleSearch"
        />
        <el-button type="primary" @click="handleAddSameLevel">新增同级</el-button>
        <el-button type="primary" plain @click="handleAddChild">新增下级</el-button>
        <el-tag v-if="!isSupervisor" size="small" type="info" effect="plain" style="margin-left:4px;font-size:10px;height:22px;line-height:20px">🔒 教学科目</el-tag>
        <el-button @click="refreshTree">刷新</el-button>
      </div>
    </div>

    <el-row :gutter="16" class="subject-layout">
      <!-- 左侧：科目树 -->
      <el-col :span="10">
        <el-card shadow="never" class="tree-card">
          <el-tree
            ref="treeRef"
            :data="treeData"
            :props="treeProps"
            node-key="id"
            highlight-current
            default-expand-all
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            @current-change="handleNodeClick"
          >
            <template #default="{ node, data }">
              <span class="tree-node">
                <span class="tree-node-code">{{ data.code }}</span>
                <span class="tree-node-name">{{ data.name }}</span>
                <el-tag v-if="!data.isLeaf" size="small" type="info" class="tree-tag">非末级</el-tag>
                <el-tag v-if="!data.opened" size="small" type="warning" class="tree-tag">停用</el-tag>
              </span>
            </template>
          </el-tree>
        </el-card>
      </el-col>

      <!-- 右侧：详情/编辑 -->
      <el-col :span="14">
        <el-card shadow="never">
          <template #header>
            <span class="section-title">{{ isEditing ? '编辑科目' : (selectedSubject ? '科目详情' : '请选择科目' )}}</span>
          </template>

          <div v-if="!selectedSubject && !isEditing" class="empty-state">
            <el-empty description="从左侧选择科目查看详情" />
          </div>

          <div v-else>
            <el-form :model="form" :rules="formRules" ref="formRef" label-width="100px" label-position="right">
              <el-form-item label="科目编码" prop="code">
                <el-input v-model="form.code" :disabled="!!selectedSubject" />
                <div class="form-tip">编码规则：一级1位+二级2位+三级2位</div>
              </el-form-item>
              <el-form-item label="科目名称" prop="name">
                <el-input v-model="form.name" />
              </el-form-item>
              <el-form-item label="科目类型" prop="type">
                <el-select v-model="form.type" :disabled="!!selectedSubject" style="width:100%">
                  <el-option v-for="(label, key) in subjectTypes" :key="key" :label="label" :value="key" />
                </el-select>
              </el-form-item>
              <el-form-item label="上级科目">
                <el-input :model-value="parentName" disabled />
              </el-form-item>
              <el-form-item label="是否末级">
                <el-tag :type="form.isLeaf ? 'success' : 'info'">
                  {{ form.isLeaf ? '末级科目（可使用）' : '非末级科目（不可用于凭证）' }}
                </el-tag>
              </el-form-item>
              <el-form-item label="状态">
                <el-switch v-model="form.opened" active-text="启用" inactive-text="停用" />
              </el-form-item>
              <el-form-item v-if="selectedSubject && selectedSubject.created">
                <span class="form-info">创建时间：{{ selectedSubject.created }}</span>
              </el-form-item>
              <el-form-item v-if="isEditing">
                <el-button type="primary" @click="handleSave">保存</el-button>
                <el-button @click="cancelEdit">取消</el-button>
                <el-button v-if="selectedSubject" type="danger" @click="handleDelete">删除</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useStore } from '@/stores/store.js'
import { SUBJECT_TYPE_CN } from '@/utils/accounting.js'

const store = useStore()
const treeRef = ref(null)
const formRef = ref(null)

const searchText = ref('')
const isSupervisor = computed(() => store.getCurrentRole() === 'supervisor')
const isTeachingMode = computed(() => !!localStorage.getItem('tutorial_task'))
const treeData = ref([])
const selectedSubject = ref(null)
const isEditing = ref(false)
const parentName = ref('')

const subjectTypes = SUBJECT_TYPE_CN

const treeProps = {
  children: 'children',
  label: 'name',
}

const form = reactive({
  code: '',
  name: '',
  type: 'asset',
  parentId: null,
  isLeaf: true,
  opened: true,
})

const formRules = {
  code: [{ required: true, message: '科目编码不能为空', trigger: 'blur' }],
  name: [{ required: true, message: '科目名称不能为空', trigger: 'blur' }],
  type: [{ required: true, message: '请选择科目类型', trigger: 'change' }],
}

function refreshTree() {
  treeData.value = store.getSubjectTree()
}

function filterNode(value, data) {
  if (!value) return true
  return data.code.includes(value) || data.name.includes(value)
}

function handleSearch() {
  treeRef.value?.filter(searchText.value)
}

function handleNodeClick(data) {
  selectedSubject.value = data
  isEditing.value = false
  populateForm(data)
}

function populateForm(data) {
  if (!data) return
  form.code = data.code
  form.name = data.name
  form.type = data.type
  form.parentId = data.parentId || null
  form.isLeaf = data.isLeaf
  form.opened = data.opened

  if (data.parentId) {
    const parent = store.getSubjectById(data.parentId)
    parentName.value = parent ? `${parent.code} ${parent.name}` : ''
  } else {
    parentName.value = '（一级科目）'
  }
}

function resetForm() {
  form.code = ''
  form.name = ''
  form.type = 'asset'
  form.parentId = null
  form.isLeaf = true
  form.opened = true
  parentName.value = ''
}

function handleAddSameLevel() {
  if (isTeachingMode.value) {
    ElMessage.info('💡 教学期间科目由系统自动管理，手动增删会导致教学任务中断。如需练习请在浮动窗切换至「自由练习」模式。')
    return
  }
  if (!isSupervisor.value) {
    ElMessage.info('💡 科目增删仅限主管操作。如需自定义科目，请联系会计主管。')
    return
  }
  if (!selectedSubject.value) {
    // 无选中时新增同级 = 新增一级科目
    handleAddChild()
    return
  }
  const parent = selectedSubject.value.parentId
    ? store.getSubjectById(selectedSubject.value.parentId)
    : null

  selectedSubject.value = null
  isEditing.value = true
  resetForm()
  form.parentId = parent?.id || null
  form.type = parent ? parent.type : 'asset'
  parentName.value = parent ? `${parent.code} ${parent.name}` : '（一级科目）'
  ElMessage.info('请填写新科目信息后保存')
}

function handleAddChild() {
  if (isTeachingMode.value) {
    ElMessage.info('💡 教学期间科目由系统自动管理，手动增删会导致教学任务中断。如需练习请在浮动窗切换至「自由练习」模式。')
    return
  }
  if (!isSupervisor.value) {
    ElMessage.info('💡 科目增删仅限主管操作。如需自定义科目，请联系会计主管。')
    return
  }
  if (!selectedSubject.value) {
    // 无选中 = 新增一级科目
    selectedSubject.value = null
    isEditing.value = true
    resetForm()
    parentName.value = '（一级科目）'
    ElMessage.info('请填写新科目信息后保存')
    return
  }
  isEditing.value = true
  resetForm()
  form.parentId = selectedSubject.value.id
  form.type = selectedSubject.value.type
  const parent = selectedSubject.value
  parentName.value = `${parent.code} ${parent.name}`
  ElMessage.info(`将在"${parent.name}"下新增子科目`)
}

function handleEdit() {
  if (!selectedSubject.value) {
    ElMessage.warning('请先选择科目')
    return
  }
  isEditing.value = true
}

function cancelEdit() {
  isEditing.value = false
  if (selectedSubject.value) {
    populateForm(selectedSubject.value)
  } else {
    resetForm()
  }
}

function handleSave() {
  formRef.value.validate((valid) => {
    if (!valid) return

    let result
    if (isEditing.value && selectedSubject.value) {
      // 编辑模式（只能修改名称和状态，不能改编码/类型/父级）
      result = store.updateSubject(selectedSubject.value.id, {
        name: form.name,
        opened: form.opened,
      })
      if (result) {
        ElMessage.success('科目已更新')
      }
    } else if (isEditing.value) {
      // 新增模式
      result = store.addSubject({
        name: form.name,
        type: form.type,
        parentId: form.parentId,
      })
      if (result) {
        ElMessage.success(`科目已添加：${result.code} ${result.name}`)
      }
    }

    refreshTree()
    isEditing.value = false
  })
}

function handleDelete() {
  if (isTeachingMode.value) {
    ElMessage.info('💡 教学期间科目由系统自动管理，手动删除会导致教学任务中断。如需练习请在浮动窗切换至「自由练习」模式。')
    return
  }
  if (!isSupervisor.value) {
    ElMessage.info('💡 科目删除仅限主管操作。如需删除请联系会计主管。')
    return
  }
  if (!selectedSubject.value) return
  ElMessageBox.confirm(
    `确定删除科目"${selectedSubject.value.code} ${selectedSubject.value.name}"吗？`,
    '删除确认',
    { confirmButtonText: '删除', cancelButtonText: '取消', type: 'warning' }
  ).then(() => {
    const result = store.deleteSubject(selectedSubject.value.id)
    if (result.success) {
      ElMessage.success('科目已删除')
      selectedSubject.value = null
      resetForm()
      refreshTree()
    } else {
      ElMessage.error(result.error)
    }
  }).catch(() => {})
}

onMounted(() => {
  refreshTree()
})
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 8px;
}
.page-title { font-size: 20px; color: #303133; }
.page-actions { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
.search-input { width: 220px; }
.subject-layout { height: calc(100vh - 160px); }
.tree-card {
  height: 100%;
  overflow-y: auto;
}
.tree-node {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
}
.tree-node-code { color: #909399; font-family: monospace; min-width: 60px; }
.tree-node-name { color: #303133; }
.tree-tag { transform: scale(0.8); margin-left: 4px; }
.section-title { font-size: 15px; font-weight: 600; }
.empty-state { padding: 60px 0; }
.form-tip { font-size: 12px; color: #909399; margin-top: 4px; }
.form-info { font-size: 12px; color: #909399; }
</style>
