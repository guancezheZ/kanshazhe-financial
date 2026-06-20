<template>
  <el-dialog v-model="visible" title="🛡️ 系统完整性校验" width="680" destroy-on-close>
    <div class="int-body">
      <p class="int-hint">
        校验关键数据模块是否被篡改，并检测数据中的异常值（NaN/Infinity/借贷不平衡等）。
      </p>

      <div v-if="!checked" class="int-center">
        <el-button type="primary" :loading="checking" @click="runCheck">
          {{ checking ? '校验中...' : '开始校验' }}
        </el-button>
      </div>

      <div v-else class="int-results">
        <!-- 结果列表 -->
        <el-table :data="results" stripe size="small" class="int-table">
          <el-table-column prop="label" label="校验模块" min-width="160" />

          <el-table-column label="哈希" width="72" align="center">
            <template #default="{ row }">
              <el-tooltip
                v-if="row.hashPass !== undefined"
                :content="row.hashPass ? '哈希匹配' : '哈希不匹配 — 数据可能被篡改'"
                placement="top"
              >
                <span :class="row.hashPass ? 'tag-ok' : 'tag-bad'">
                  {{ row.hashPass ? '✓' : '✗' }}
                </span>
              </el-tooltip>
              <span v-else class="tag-na">—</span>
            </template>
          </el-table-column>

          <el-table-column label="数据" width="72" align="center">
            <template #default="{ row }">
              <el-tooltip
                v-if="row.healthPass !== undefined"
                :content="row.healthPass ? '数据内容正常' : '检测到数据异常'"
                placement="top"
              >
                <span :class="row.healthPass ? 'tag-ok' : 'tag-warn'">
                  {{ row.healthPass ? '✓' : '⚠' }}
                </span>
              </el-tooltip>
              <span v-else class="tag-na">—</span>
            </template>
          </el-table-column>

          <el-table-column label="状态" width="100" align="center">
            <template #default="{ row }">
              <el-tag v-if="row.error" type="danger" size="small">出错</el-tag>
              <el-tag v-else-if="row.pass" type="success" size="small">正常</el-tag>
              <el-tag v-else type="warning" size="small">异常</el-tag>
            </template>
          </el-table-column>

          <!-- 展开按钮 -->
          <el-table-column width="60" align="center">
            <template #default="{ row }">
              <el-button
                v-if="hasDetails(row)"
                text
                size="small"
                @click="toggleExpand(row.name)"
              >
                {{ expandedRows.has(row.name) ? '▲' : '▼' }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 展开详情 -->
        <div v-for="r in results" :key="r.name">
          <div v-if="expandedRows.has(r.name) && hasDetails(r)" class="int-detail">
            <!-- 哈希详情 -->
            <div v-if="r.hash" class="detail-hash">
              <span class="detail-label">SHA-256：</span>
              <code class="detail-code">{{ r.hash }}</code>
            </div>

            <!-- 错误信息 -->
            <div v-if="r.error" class="detail-error">
              <el-alert :title="'导入错误：' + r.error" type="error" :closable="false" show-icon />
            </div>

            <!-- 健康问题列表 -->
            <div v-if="r.healthIssues && r.healthIssues.length > 0" class="detail-issues">
              <div class="issues-header">数据健康问题（{{ r.healthIssues.length }} 项）：</div>
              <el-table :data="r.healthIssues" size="small" stripe class="issues-table">
                <el-table-column label="类型" width="90">
                  <template #default="{ row: issue }">
                    <el-tag
                      :type="issue.severity === 'error' ? 'danger' : 'warning'"
                      size="small"
                    >{{ issue.type }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="路径" min-width="220">
                  <template #default="{ row: issue }">
                    <code class="issue-path">{{ issue.path }}</code>
                  </template>
                </el-table-column>
                <el-table-column label="描述" min-width="200">
                  <template #default="{ row: issue }">
                    {{ issue.message }}
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>

        <!-- 汇总 -->
        <div class="int-summary">
          <el-alert
            v-if="allPass"
            title="✅ 系统完整性良好。所有模块哈希匹配，数据内容正常。"
            type="success"
            :closable="false"
            show-icon
          />
          <el-alert
            v-else-if="warnOnly"
            title="⚠️ 存在警告（数据健康问题），建议检查相关模块。"
            type="warning"
            :closable="false"
            show-icon
          />
          <el-alert
            v-else
            title="❌ 完整性异常！部分模块校验失败，可能被篡改或数据损坏。"
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
const expandedRows = ref(new Set())

const allPass = computed(() =>
  results.value.length > 0 && results.value.every(r => r.pass)
)
const warnOnly = computed(() =>
  !allPass.value &&
  results.value.length > 0 &&
  results.value.every(r => r.hashPass !== false)
)

function hasDetails(row) {
  return row.hash || row.error || (row.healthIssues && row.healthIssues.length > 0)
}

function toggleExpand(name) {
  const next = new Set(expandedRows.value)
  if (next.has(name)) {
    next.delete(name)
  } else {
    next.add(name)
  }
  expandedRows.value = next
}

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
  expandedRows.value = new Set()
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
.int-results { display: flex; flex-direction: column; gap: 12px; }
.int-table { width: 100%; }
.int-summary { margin-top: 8px; }

.tag-ok { color: #67c23a; font-weight: bold; font-size: 16px; }
.tag-bad { color: #f56c6c; font-weight: bold; font-size: 16px; }
.tag-warn { color: #e6a23c; font-weight: bold; font-size: 16px; }
.tag-na { color: #c0c4cc; }

.int-detail {
  background: #fafafa;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  padding: 12px 16px;
  margin-top: 4px;
  font-size: 13px;
  line-height: 1.6;
}
.detail-hash { margin-bottom: 8px; }
.detail-label { color: #606266; }
.detail-code {
  font-family: 'Courier New', monospace;
  font-size: 12px;
  background: #f0f0f0;
  padding: 1px 6px;
  border-radius: 3px;
  word-break: break-all;
}
.issues-header {
  font-weight: 600;
  color: #e6a23c;
  margin-bottom: 6px;
}
.issues-table { width: 100%; }
.issue-path {
  font-family: 'Courier New', monospace;
  font-size: 11px;
  background: #f0f0f0;
  padding: 1px 4px;
  border-radius: 2px;
}
</style>
