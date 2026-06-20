<template>
  <div class="page">
    <div class="page-header">
      <div class="page-header-left">
        <h2>🔐 激活管理</h2>
        <span class="page-subtitle">系统正版授权管理</span>
      </div>
      <div class="page-header-right">
        <el-button type="warning" plain @click="handleReactivate">更新激活码</el-button>
        <el-button type="info" plain @click="showIntegrity = true">🛡️ 完整性校验</el-button>
      </div>
    </div>

    <el-card shadow="never" class="status-card">
      <div class="status-body">
        <div class="status-icon" :class="{ active: activated }">
          <el-icon :size="48">
            <CircleCheckFilled v-if="activated" />
            <WarningFilled v-else />
          </el-icon>
        </div>
        <div class="status-info">
          <h3>{{ activated ? '✅ 系统已激活' : '❌ 系统未激活' }}</h3>
          <p v-if="activated">
            激活码：<code class="act-code">{{ activationCode }}</code>
          </p>
          <p v-else>此系统尚未激活，点击「更新激活码」输入激活码。</p>
          <p class="status-hint">
            {{ activated ? '点击"更新激活码"可更换为新的激活码' : '' }}
          </p>
        </div>
      </div>
    </el-card>

    <el-card shadow="never" class="fp-card">
      <template #header><span>本机标识（设备指纹）</span></template>
      <p class="fp-value">{{ deviceFingerprint }}</p>
      <p class="fp-desc">
        设备指纹用于绑定激活码，防止激活码被复制到其他设备使用。
        此标识为匿名生成，不包含任何个人信息。
      </p>
    </el-card>

    <el-card shadow="never" class="about-card">
      <template #header>
        <span>关于正版保护</span>
      </template>
      <p>观测者企业财务模拟系统采用多层正版保护机制：</p>
      <ul class="protect-list">
        <li>🔐 <strong>序列号验证</strong> — 16位激活码含校验算法</li>
        <li>🖥️ <strong>设备绑定</strong> — 激活码与设备指纹绑定，防止二次盗卖</li>
        <li>🛡️ <strong>数据完整性校验</strong> — 检测教学数据是否被篡改</li>
        <li>🔒 <strong>后续 Tauri 版</strong> — Rust 层硬件绑定 + 加密存储</li>
      </ul>
    </el-card>

    <ActivationDialog v-model="showDialog" strict @activated="refreshStatus" />
    <IntegrityCheckDialog v-model="showIntegrity" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessageBox } from 'element-plus'
import { CircleCheckFilled, WarningFilled } from '@element-plus/icons-vue'
import { isActivated, getActivationCode, deactivate, getDeviceFingerprint } from '@/utils/activation.js'
import ActivationDialog from '@/components/ActivationDialog.vue'
import IntegrityCheckDialog from '@/components/IntegrityCheckDialog.vue'

const activated = ref(false)
const activationCode = ref('')
const deviceFingerprint = ref('')
const showDialog = ref(false)
const showIntegrity = ref(false)

function refreshStatus() {
  activated.value = isActivated()
  activationCode.value = getActivationCode() || ''
  deviceFingerprint.value = getDeviceFingerprint()
}

async function handleReactivate() {
  if (activated.value) {
    try {
      await ElMessageBox.confirm(
        '确定要更新激活码吗？更新后当前激活码将失效。',
        '更新激活码',
        { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }
      )
    } catch { return }
  }
  deactivate()
  showDialog.value = true
}

onMounted(() => {
  refreshStatus()
})
</script>

<style scoped>
.page { padding: 24px; max-width: 800px; margin: 0 auto; }
.page-header {
  display: flex; justify-content: space-between; align-items: flex-start;
  flex-wrap: wrap; gap: 12px;
  margin-bottom: 24px;
}
.page-header-left h2 { margin: 0 0 4px 0; }
.page-subtitle { font-size: 13px; color: #909399; }
.el-card { margin-bottom: 16px; }
.status-body {
  display: flex; align-items: center; gap: 24px; padding: 16px 0;
}
.status-icon { color: #c0c4cc; }
.status-icon.active { color: #67c23a; }
.status-info h3 { margin: 0 0 8px 0; }
.status-info p { margin: 4px 0; font-size: 14px; color: #606266; }
.act-code {
  font-family: 'Courier New', monospace;
  font-size: 14px; background: #f5f5f5; padding: 2px 8px; border-radius: 4px;
  letter-spacing: 1px;
}
.status-hint { font-size: 12px !important; color: #909399 !important; }
.about-card p { margin: 8px 0; font-size: 14px; color: #606266; }
.about-hint { color: #909399 !important; font-size: 12px !important; }
.fp-value {
  font-family: 'Courier New', monospace; font-size: 16px;
  letter-spacing: 2px; color: #409eff; text-align: center;
  padding: 12px 0;
}
.fp-desc { font-size: 12px; color: #909399; margin-top: 8px; }
.protect-list { padding-left: 20px; line-height: 2; }
.protect-list li { font-size: 14px; color: #606266; }
</style>
