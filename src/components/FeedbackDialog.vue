<template>
  <el-dialog v-model="visible" title="📬 意见反馈" width="520" :close-on-click-modal="false" destroy-on-close>
    <div class="feedback-body">
      <p class="feedback-hint">感谢您使用観測者财务模拟系统！请选择反馈类型：</p>

      <el-radio-group v-model="selectedType" class="feedback-types">
        <el-radio v-for="item in FEEDBACK_TYPES" :key="item.value" :value="item.value" class="feedback-radio">
          <div class="radio-content">
            <span class="radio-label">{{ item.label }}</span>
            <span class="radio-desc">{{ item.desc }}</span>
          </div>
        </el-radio>
      </el-radio-group>

      <div class="feedback-detail">
        <label class="detail-label">
          {{ selectedType === 'other' ? '请描述您的问题或建议' : '补充说明（可选）' }}
        </label>
        <el-input
          v-model="detailText"
          type="textarea"
          :rows="4"
          :placeholder="selectedType === 'other' ? '请详细描述...' : '可选填具体内容...'"
          maxlength="2000"
          show-word-limit
        />
      </div>
    </div>

    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" :loading="submitting" :disabled="!canSubmit" @click="handleSubmit">
        {{ submitting ? '提交中...' : '提交反馈' }}
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { FEEDBACK_TYPES, submitFeedback } from '@/utils/feedback.js'

const visible = defineModel({ type: Boolean, default: false })
const selectedType = ref('bug')
const detailText = ref('')
const submitting = ref(false)

const canSubmit = computed(() => {
  if (selectedType.value === 'other') return detailText.value.trim().length > 0
  return true
})

async function handleSubmit() {
  submitting.value = true
  try {
    const typeItem = FEEDBACK_TYPES.find(t => t.value === selectedType.value)
    const typeLabel = typeItem ? typeItem.label : selectedType.value
    await submitFeedback({
      type: typeLabel,
      content: detailText.value.trim() || '(未填写补充说明)'
    })
    ElMessage.success('✅ 感谢您的反馈！我们会认真对待每一条建议。')
    visible.value = false
    detailText.value = ''
  } catch (e) {
    ElMessage.error('❌ 提交失败，请稍后重试。')
    console.error('Feedback error:', e)
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.feedback-body {
  padding: 4px 0;
}
.feedback-hint {
  color: #909399;
  font-size: 14px;
  margin: 0 0 16px 0;
}
.feedback-types {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}
.feedback-radio {
  display: flex;
  align-items: flex-start;
  margin-right: 0;
  height: auto !important;
  padding: 10px 12px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  transition: all 0.2s;
}
.feedback-radio:hover {
  border-color: #409eff;
  background: #f0f7ff;
}
.feedback-radio:deep(.el-radio__label) {
  width: 100%;
}
.radio-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.radio-label {
  font-size: 14px;
  font-weight: 500;
  color: #303133;
}
.radio-desc {
  font-size: 12px;
  color: #909399;
}
.feedback-detail {
  margin-top: 16px;
}
.detail-label {
  display: block;
  font-size: 13px;
  color: #606266;
  margin-bottom: 8px;
}
</style>
