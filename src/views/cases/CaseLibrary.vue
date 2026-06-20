<template>
  <div class="case-library">
    <div class="page-header">
      <div>
        <h2 class="page-title">📋 案例库</h2>
        <span class="page-desc">通过完整的企业月度账套，体验从建账到出报表的全流程实战</span>
      </div>
    </div>

    <!-- 按企业规模分组 -->
    <div v-for="group in caseGroups" :key="group.type" class="case-group">
      <div class="group-header">
        <span class="group-icon">{{ group.icon }}</span>
        <span class="group-title">{{ group.label }}</span>
        <span class="group-count">{{ group.cases.length }} 个案例</span>
      </div>
      <div class="group-desc" v-text="group.desc"></div>

      <div v-if="group.cases.length === 0" class="empty-state">
        <span class="empty-icon">🔜</span>
        <span>案例开发中，敬请期待</span>
      </div>

      <div v-else class="case-grid">
        <div
          v-for="c in group.cases"
          :key="c.id"
          class="case-card"
          :class="{ completed: isCompleted(c.id), active: activeCase === c.id }"
          @click="enterCase(c)"
        >
          <!-- 案例图标 & 类型 -->
          <div class="card-header">
            <span class="card-icon">{{ c.icon || '📄' }}</span>
            <span class="card-type" :class="c.type">{{ c.typeLabel }}</span>
          </div>

          <!-- 标题 -->
          <h3 class="card-title">{{ c.title }}</h3>
          <p class="card-desc">{{ c.desc }}</p>

          <!-- 元信息 -->
          <div class="card-meta">
            <span class="meta-tag">{{ c.industry }}</span>
            <span class="meta-tag">{{ c.taxType }}</span>
            <span class="meta-tag">⭐ {{ difficultyStars(c.difficulty) }}</span>
          </div>

          <!-- 进度条 -->
          <div class="card-progress">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: getProgress(c.id) + '%' }"></div>
            </div>
            <span class="progress-text">{{ getProgress(c.id) }}%</span>
          </div>

          <!-- 完成状态 -->
          <div v-if="isCompleted(c.id)" class="card-badge badge-done">✅ 已完成</div>
          <div v-else-if="activeCase === c.id" class="card-badge badge-active">▶ 进行中</div>
        </div>
      </div>
    </div>

    <!-- 关于案例库的说明 -->
    <el-card shadow="never" class="info-card">
      <div class="info-content">
        <span class="info-icon">💡</span>
        <div class="info-text">
          <strong>什么是案例库？</strong>
          每个案例模拟一家真实企业的完整月度账务。你需要独立完成从建账、凭证录入、过账到查看报表的全流程。
          案例不绑定教学进度，可随时进入/退出，适合巩固综合能力。
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/stores/store.js'
import { CASES } from '@/data/cases/index.js'

const router = useRouter()
const store = useStore()

const activeCase = ref(null)

onMounted(() => {
  activeCase.value = store.getActiveCaseId()
})

// 按企业规模分组
const caseGroups = [
  {
    type: 'small',
    icon: '🏪',
    label: '小型企业（小规模纳税人）',
    desc: '业务较简单，适合首次体验完整做账流程。无增值税进项抵扣，无折旧摊销等复杂业务。',
    cases: CASES.filter(c => c.type === 'small'),
  },
  {
    type: 'medium',
    icon: '🏢',
    label: '中型企业（一般纳税人）',
    desc: '业务较完整，涵盖采购、销售、费用、税费等全流程，适合有一定基础的学员。',
    cases: CASES.filter(c => c.type === 'medium'),
  },
  {
    type: 'large',
    icon: '🏭',
    label: '大型企业（集团企业）',
    desc: '业务复杂，涉及内部交易、多种税务处理，适合高阶学员挑战。',
    cases: CASES.filter(c => c.type === 'large'),
  },
]

function enterCase(c) {
  router.push({ name: 'CaseDetail', params: { caseId: c.id } })
}

function difficultyStars(d) {
  const max = 6 // 最高6星
  const stars = Math.min(d || 1, max)
  return '★'.repeat(stars) + '☆'.repeat(max - stars)
}

function getProgress(caseId) {
  try {
    const data = JSON.parse(localStorage.getItem('jd_case_data_' + caseId) || '{}')
    const events = CASES.find(c => c.id === caseId)?.data?.events || []
    if (!events.length) return 0
    const done = events.filter(e => localStorage.getItem('case_done_' + caseId + '_' + e.id) === 'true').length
    return Math.round(done / events.length * 100)
  } catch { return 0 }
}

function isCompleted(caseId) {
  return getProgress(caseId) >= 100
}
</script>

<style scoped>
.case-library {
  max-width: 960px;
  margin: 0 auto;
  padding-bottom: 32px;
}
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
}
.page-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--text, #303133);
  margin: 0 0 4px;
}
.page-desc {
  font-size: 13px;
  color: var(--text-light, #909399);
}

/* ─── 分组 ─── */
.case-group {
  margin-bottom: 32px;
}
.group-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}
.group-icon { font-size: 20px; }
.group-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text, #303133);
}
.group-count {
  font-size: 12px;
  color: var(--text-light, #909399);
  background: var(--bg, #f0f2f5);
  padding: 1px 8px;
  border-radius: 8px;
}
.group-desc {
  font-size: 13px;
  color: var(--text-light, #909399);
  margin-bottom: 14px;
  line-height: 1.5;
}

/* ─── 卡片网格 ─── */
.case-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 14px;
}
.case-card {
  background: var(--bg-card, #fff);
  border: 1.5px solid var(--border, #e4e7ed);
  border-radius: 12px;
  padding: 18px;
  cursor: pointer;
  transition: all 0.25s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.case-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  border-color: var(--accent, #409eff);
}
.case-card.active {
  border-color: var(--accent, #409eff);
  box-shadow: 0 0 0 2px rgba(64,158,255,0.12);
}
.case-card.completed {
  border-color: #67c23a;
  opacity: 0.85;
}
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.card-icon { font-size: 28px; }
.card-type {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 10px;
  border-radius: 10px;
}
.card-type.small { background: #e6f7ff; color: #1890ff; }
.card-type.medium { background: #fff7e6; color: #fa8c16; }
.card-type.large { background: #fef0ef; color: #f56c6c; }
.card-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--text, #303133);
  margin: 0;
  line-height: 1.3;
}
.card-desc {
  font-size: 12px;
  color: var(--text-light, #909399);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.card-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}
.meta-tag {
  font-size: 10px;
  padding: 1px 8px;
  border-radius: 8px;
  background: var(--bg, #f0f2f5);
  color: var(--text-secondary, #606266);
  border: 1px solid var(--border, #e4e7ed);
}
.card-progress {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: auto;
}
.progress-bar {
  flex: 1;
  height: 5px;
  background: var(--bg, #f0f2f5);
  border-radius: 3px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #409eff, #67c23a);
  border-radius: 3px;
  transition: width 0.4s ease;
}
.progress-text {
  font-size: 11px;
  color: var(--text-light, #909399);
  min-width: 32px;
  text-align: right;
}
.card-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 8px;
}
.badge-done { background: #f0f9eb; color: #67c23a; }
.badge-active { background: #ecf5ff; color: #409eff; }

/* ─── 空状态 ─── */
.empty-state {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 24px;
  color: var(--text-light, #909399);
  font-size: 14px;
  justify-content: center;
}
.empty-icon { font-size: 24px; }

/* ─── 说明 ─── */
.info-card {
  margin-top: 12px;
  border-radius: 10px;
}
.info-content {
  display: flex;
  gap: 10px;
  font-size: 13px;
  color: var(--text-secondary, #606266);
  line-height: 1.6;
}
.info-icon { font-size: 20px; flex-shrink: 0; }
</style>
