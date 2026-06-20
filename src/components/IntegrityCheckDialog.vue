<template>
  <el-dialog v-model="visible" title="🛡️ 系统完整性校验" width="560" destroy-on-close>
    <div class="int-body">
      <p class="int-hint">校验关键数据模块是否被篡改，确保系统运行在安全状态。</p>

      <div v-if="!checked" class="int-center">
        <el-button type="primary" :loading="checking" @click="runCheck">
          {{ checking ? '校验中...' : '开始校验' }}
        </el-button>
      </div>

      <div v-else class="int-results">
        <el-table :data="results" stripe size="small">
          <el-table-column prop="label" label="校验模块" min-width="180" />
          <el-table-column label="状态" width="120">
            <template #default="{ row }">
              <el-tag :type="row.pass ? 'success' : 'danger'" size="small">
                {{ row.pass ? '✓ 正常' : '✗ 异常' }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>

        <div class="int-summary">
          <el-alert
            v-if="allPass"
            title="✅ 系统完整性良好，所有数据模块校验通过。"
            type="success"
            :closable="false"
            show-icon
          />
          <el-alert
            v-else
            title="⚠️ 数据完整性异常！部分模块可能被篡改。"
            type="error"
            :closable="false"
            show-icon
          />
        </div>
      </div>
    </div>

    <template #footer>
      <el-button @click="visible = false">关闭</el-button>
      <el-button v-if="checked" @click="reset">重新校验</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { checkIntegrity } from '@/utils/integrity.js'

const visible = defineModel({ type: Boolean, default: false })

const checking = ref(false)
const checked = ref(false)
const results = ref([])

const allPass = computed(() => results.value.length > 0 && results.value.every(r => r.pass))

async function runCheck() {
  checking.value = true
  try {
    results.value = await checkIntegrity()
  } catch (e) {
    results.value = [{ name: 'error', label: '校验过程出错', pass: false }]
  } finally {
    checking.value = false
    checked.value = true
  }
}

function reset() {
  checked.value = false
  results.value = []
}

// 打开时自动运行校验（用于启动时完整性自检触发的弹窗）
watch(visible, (val) => {
  if (val && !checked.value && !checking.value) {
    runCheck()
  }
})
</script>

<style scoped>
.int-body { min-height: 200px; }
.int-hint { color: #909399; font-size: 14px; margin: 0 0 16px 0; }
.int-center { text-align: center; padding: 40px 0; }
.int-results { display: flex; flex-direction: column; gap: 16px; }
.int-summary { margin-top: 8px; }
</style>
