<template>
  <div v-if="visible" class="activation-overlay" :class="{ 'fullscreen': isStrict }">
    <div class="activation-card">
      <div class="activation-body">
        <div class="activation-icon">
          <el-icon :size="48" color="#e6a23c"><Lock /></el-icon>
        </div>
        <p class="activation-title">观测者企业财务模拟系统</p>
        <p class="activation-desc">请输入16位激活码以验证正版授权</p>

        <div class="code-inputs">
          <el-input v-model="c1" maxlength="4" class="code-part" placeholder="XXXX" @input="onIn(1)" @keydown.delete="onDel(1,$event)" />
          <span class="code-sep">-</span>
          <el-input v-model="c2" maxlength="4" class="code-part" placeholder="XXXX" @input="onIn(2)" @keydown.delete="onDel(2,$event)" />
          <span class="code-sep">-</span>
          <el-input v-model="c3" maxlength="4" class="code-part" placeholder="XXXX" @input="onIn(3)" @keydown.delete="onDel(3,$event)" />
          <span class="code-sep">-</span>
          <el-input v-model="c4" maxlength="4" class="code-part" placeholder="XXXX" @input="onIn(4)" @keydown.delete="onDel(4,$event)" />
        </div>

        <p v-if="message" :class="['activation-msg', { success: msgSuccess, error: !msgSuccess }]">
          {{ message }}
        </p>
        <p class="fp-hint">本机标识：{{ deviceFingerprint }}</p>
        <p v-if="isStrict" class="master-key-hint">
          需要激活码？请联系管理员获取
        </p>
      </div>

      <div class="activation-footer">
        <el-button v-if="!isStrict" @click="handleSkip">跳过</el-button>
        <el-button type="warning" :loading="activating" @click="handleActivate" size="large" class="activate-btn">
          {{ activating ? '验证中...' : '激 活' }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import { activate, isActivated, isValidFormat, getDeviceFingerprint } from '@/utils/activation.js'

const props = defineProps({ strict: { type: Boolean, default: false } })
const emit = defineEmits(['activated'])
const visible = defineModel({ type: Boolean, default: false })

const isStrict = computed(() => props.strict)

const c1 = ref('')
const c2 = ref('')
const c3 = ref('')
const c4 = ref('')
const message = ref('')
const msgSuccess = ref(false)
const activating = ref(false)
const deviceFingerprint = ref('')

function filterHex(val) {
  return val.toUpperCase().replace(/[^A-F0-9]/g, '')
}

function focusInput(idx) {
  nextTick(() => {
    const inputs = document.querySelectorAll('.activation-card .code-part .el-input__inner')
    if (inputs[idx - 1]) inputs[idx - 1].focus()
  })
}

function onIn(idx) {
  const parts = [c1, c2, c3, c4]
  parts[idx - 1].value = filterHex(parts[idx - 1].value)
  if (parts[idx - 1].value.length >= 4 && idx < 4) focusInput(idx + 1)
  message.value = ''
}

function onDel(idx, e) {
  if (e.target.value === '' && idx > 1) focusInput(idx - 1)
}

function getFullCode() {
  // 防御性清理：确保每个部分都是纯大写十六进制
  const p1 = filterHex(c1.value || '')
  const p2 = filterHex(c2.value || '')
  const p3 = filterHex(c3.value || '')
  const p4 = filterHex(c4.value || '')
  return `${p1}-${p2}-${p3}-${p4}`
}

async function handleActivate() {
  const fullCode = getFullCode()
  if (fullCode === '--') {
    message.value = '请输入16位激活码'
    msgSuccess.value = false
    return
  }

  if (!isValidFormat(fullCode)) {
    message.value = '格式错误，正确格式：XXXX-XXXX-XXXX-XXXX（大写字母和数字）'
    msgSuccess.value = false
    return
  }

  activating.value = true
  await new Promise(r => setTimeout(r, 600))

  const result = await activate(fullCode)
  message.value = result.message
  msgSuccess.value = result.success

  if (result.success) {
    setTimeout(() => {
      visible.value = false
      emit('activated')
    }, 1500)
  }

  activating.value = false
}

function handleSkip() {
  visible.value = false
  emit('activated')
}

watch(visible, (val) => {
  if (val) {
    c1.value = ''; c2.value = ''; c3.value = ''; c4.value = ''
    message.value = ''
    deviceFingerprint.value = getDeviceFingerprint()

    if (isActivated()) {
      visible.value = false
      emit('activated')
    }
  }
})
</script>

<style scoped>
.activation-overlay {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.activation-overlay.fullscreen {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
}
.activation-card {
  background: #fff;
  border-radius: 16px;
  padding: 40px;
  width: 460px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  text-align: center;
}
.activation-body { margin-bottom: 24px; }
.activation-icon { margin-bottom: 16px; }
.activation-title { font-size: 20px; font-weight: 700; color: #1a1a2e; margin: 0 0 8px 0; }
.activation-desc { font-size: 14px; color: #909399; margin: 0 0 28px 0; }
.code-inputs { display: flex; justify-content: center; align-items: center; gap: 2px; }
.code-part { width: 105px; }
.code-part :deep(.el-input__inner) { text-align: center; font-size: 18px; font-family: 'Courier New', monospace; letter-spacing: 3px; }
.code-sep { font-size: 22px; font-weight: bold; color: #c0c4cc; margin: 0 2px; }
.activation-msg { margin-top: 16px; font-size: 14px; }
.activation-msg.success { color: #67c23a; }
.activation-msg.error { color: #f56c6c; }
.fp-hint { margin-top: 12px; font-size: 11px; color: #c0c4cc; font-family: monospace; }
.master-key-hint { margin-top: 8px; font-size: 13px; color: #909399; }
.master-key-hint code {
  font-family: 'Courier New', monospace; font-size: 14px; font-weight: 600;
  color: #e6a23c; letter-spacing: 1px; user-select: all;
}
.hint-sub { display: block; font-size: 11px; color: #c0c4cc; margin-top: 2px; }
.activation-footer { display: flex; justify-content: center; gap: 12px; }
.activate-btn { min-width: 160px; font-size: 16px; }
</style>
