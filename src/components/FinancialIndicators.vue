<template>
  <el-card shadow="never" class="financial-indicators">
    <template #header>
      <div class="fi-header" @click="expanded = !expanded">
        <span class="fi-title">📊 财务指标解读</span>
        <el-tag size="small" type="info" effect="plain" style="cursor:pointer">
          {{ expanded ? '点击收起' : '点击展开' }}
        </el-tag>
      </div>
    </template>

    <div v-if="expanded && indicators.length > 0">
      <div
        v-for="(group, gi) in groupedIndicators" :key="gi"
        class="fi-group"
        :style="{ borderTop: gi > 0 ? '1px dashed #e0e0e0' : 'none', paddingTop: gi > 0 ? '12px' : '0', marginTop: gi > 0 ? '12px' : '0' }"
      >
        <div class="fi-group-title">{{ group.category }}</div>
        <div class="fi-grid">
          <div
            v-for="(ind, ii) in group.items" :key="ii"
            class="fi-card"
            @click="toggleDetail(ind)"
          >
            <div class="fi-card-top">
              <span class="fi-name">{{ ind.name }}</span>
              <el-tag
                size="small"
                :type="judgmentType(ind.judgment)"
                effect="dark"
                class="fi-tag"
              >{{ ind.judgment }}</el-tag>
            </div>
            <div class="fi-value">
              <span class="fi-num">{{ formatValue(ind) }}</span>
              <span v-if="ind.unit" class="fi-unit">{{ ind.unit }}</span>
            </div>
            <div v-if="activeDetail === ind" class="fi-explanation">
              <div class="fi-explanation-text">{{ ind.explanation }}</div>
            </div>
            <div class="fi-detail-hint">
              {{ activeDetail === ind ? '▲ 收起讲解' : '▼ 点击查看讲解' }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="!expanded" class="fi-collapsed-hint">
      点击展开查看财务指标分析
    </div>
  </el-card>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  indicators: {
    type: Array,
    default: () => [],
  },
})

const expanded = ref(false)
const activeDetail = ref(null)

const groupedIndicators = computed(() => {
  const groups = []
  const map = {}
  for (const ind of props.indicators) {
    if (!map[ind.category]) {
      map[ind.category] = { category: ind.category, items: [] }
      groups.push(map[ind.category])
    }
    map[ind.category].items.push(ind)
  }
  return groups
})

function toggleDetail(ind) {
  activeDetail.value = activeDetail.value === ind ? null : ind
}

function judgmentType(j) {
  if (j === '良好') return 'success'
  if (j === '一般' || j === '适中') return 'warning'
  if (j === '偏低' || j === '偏高' || j === '警惕') return 'danger'
  return 'info'
}

function formatValue(ind) {
  if (ind.value === null || ind.value === '—') return '—'
  if (ind.unit === '%') return ind.value.toFixed(2)
  if (ind.unit === '次') return ind.value.toFixed(2)
  return ind.value
}
</script>

<style scoped>
.financial-indicators {
  margin-top: 16px;
}
.fi-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  user-select: none;
}
.fi-title {
  font-size: 15px;
  font-weight: 600;
  color: #303133;
}
.fi-group-title {
  font-size: 13px;
  font-weight: 600;
  color: #606266;
  margin-bottom: 8px;
  padding-left: 4px;
}
.fi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 8px;
}
.fi-card {
  border: 1px solid #ebeef5;
  border-radius: 6px;
  padding: 10px 12px;
  cursor: pointer;
  transition: all 0.2s;
  background: #fafafa;
}
.fi-card:hover {
  border-color: #409eff;
  background: #ecf5ff;
}
.fi-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}
.fi-name {
  font-size: 12px;
  color: #606266;
}
.fi-tag {
  font-size: 9px !important;
  height: 16px !important;
  line-height: 14px !important;
  padding: 0 4px !important;
}
.fi-value {
  display: flex;
  align-items: baseline;
  gap: 2px;
}
.fi-num {
  font-size: 20px;
  font-weight: 700;
  color: #303133;
  font-family: 'Courier New', monospace;
}
.fi-unit {
  font-size: 12px;
  color: #909399;
  margin-left: 2px;
}
.fi-explanation {
  margin-top: 8px;
  padding: 8px 10px;
  background: #f0f9ff;
  border-radius: 4px;
  border-left: 3px solid #409eff;
}
.fi-explanation-text {
  font-size: 12px;
  line-height: 1.6;
  color: #303133;
}
.fi-detail-hint {
  font-size: 10px;
  color: #c0c4cc;
  margin-top: 4px;
  text-align: right;
}
.fi-collapsed-hint {
  color: #c0c4cc;
  font-size: 12px;
  text-align: center;
  padding: 8px 0;
}
</style>
