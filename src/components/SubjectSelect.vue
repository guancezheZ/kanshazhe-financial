<template>
  <el-popover
    ref="popoverRef"
    v-model:visible="visible"
    trigger="click"
    placement="bottom-start"
    :width="360"
    :hide-after="0"
    @hide="handleHide"
  >
    <template #reference>
      <el-input
        :model-value="displayText"
        :placeholder="placeholder"
        :clearable="clearable"
        :disabled="disabled"
        readonly
        @clear="$emit('clear')"
      >
        <template #suffix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
    </template>

    <div class="subject-selector">
      <el-input
        v-model="filterText"
        placeholder="搜索科目编码/名称"
        clearable
        size="small"
        class="filter-input"
        @input="handleFilter"
      />
      <el-tree
        ref="treeRef"
        :data="treeData"
        :props="treeProps"
        :filter-node-method="filterNode"
        node-key="id"
        highlight-current
        default-expand-all
        class="subject-tree"
        @node-click="handleSelect"
      >
        <template #default="{ data }">
          <span class="tree-item" :class="{ disabled: !data.opened }">
            <span class="tree-code">{{ data.code }}</span>
            <span class="tree-name">{{ data.name }}</span>
            <el-tag v-if="!data.isLeaf" size="small" type="info">非末级</el-tag>
            <el-tag v-if="!data.opened" size="small" type="warning">停用</el-tag>
          </span>
        </template>
      </el-tree>
      <div style="margin-top:8px;text-align:right">
        <el-button size="small" @click="visible=false">取消</el-button>
      </div>
    </div>
  </el-popover>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { useStore } from '@/stores/store.js'

const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '选择科目' },
  clearable: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'change', 'clear'])

const store = useStore()
const popoverRef = ref(null)
const treeRef = ref(null)
const visible = ref(false)
const filterText = ref('')

const treeData = computed(() => store.getSubjectTree())

const treeProps = { children: 'children', label: 'name' }

const displayText = computed(() => {
  if (!props.modelValue) return ''
  const subject = store.getSubjectById(props.modelValue)
  return subject ? `${subject.code} ${subject.name}` : ''
})

function showPopover() {
  if (!props.disabled) visible.value = true
}

function handleHide() {
  visible.value = false
  filterText.value = ''
}

function handleFilter() {
  treeRef.value?.filter(filterText.value)
}

function filterNode(value, data) {
  if (!value) return true
  const subjects = store.state.subjects
  if (data.code.includes(value) || data.name.includes(value)) return true
  let cur = subjects.find(function(s) { return s.id === data.id })
  while (cur && cur.parentId) {
    cur = subjects.find(function(s) { return s.id === cur.parentId })
    if (cur && (cur.code.includes(value) || cur.name.includes(value))) return true
  }
  var kids = subjects.filter(function(s) { return s.parentId === data.id })
  if (kids.some(function(k) { return k.code.includes(value) || k.name.includes(value) })) return true
  return false
}

function handleSelect(data) {
  emit('update:modelValue', data.id)
  emit('change', data)
  visible.value = false
}
</script>

<style scoped>
.subject-selector {
  max-height: 360px;
  overflow-y: auto;
}
.filter-input {
  margin-bottom: 8px;
}
.subject-tree {
  max-height: 300px;
  overflow-y: auto;
}
.tree-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
}
.tree-item.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.tree-code {
  color: #909399;
  font-family: monospace;
  min-width: 50px;
}
.tree-name {
  color: #303133;
}
:root[data-theme="dark"] .tree-name { color: #e0e0e0; }
:root[data-theme="dark"] .tree-code { color: #808090; }
:root[data-theme="dark"] .subject-selector { background: #252540; }
</style>
