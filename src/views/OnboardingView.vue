<template>
  <div class="onboarding-page">
    <!-- 浮动粒子背景 -->
    <div class="particles">
      <div v-for="n in 20" :key="n" class="particle" :style="particleStyle(n)"></div>
    </div>

    <!-- 跳过按钮（第一步显示） -->
    <div v-if="currentStep === 0" class="skip-area">
      <button class="skip-btn" @click="completeOnboarding">跳过引导</button>
    </div>

    <!-- 品牌标识 -->
    <div class="brand-badge">
      <el-tag size="small" type="warning" effect="dark" round>教学演示</el-tag>
    </div>

    <!-- 内容卡片 -->
    <div class="onboarding-card">
      <!-- 步骤指示器 -->
      <div class="step-indicator">
        <div
          v-for="(s, i) in steps"
          :key="i"
          class="step-dot"
          :class="{ active: currentStep === i, done: currentStep > i }"
        >
          <span class="step-num">{{ currentStep > i ? '✓' : i + 1 }}</span>
        </div>
        <div class="step-line" :style="{ width: `${(currentStep / (steps.length - 1)) * 100}%` }"></div>
        <div class="step-label" v-text="steps[currentStep]"></div>
      </div>

      <!-- 步骤内容 -->
      <div class="step-content" :key="'step-' + currentStep">
        <!-- 步骤0：欢迎 -->
        <div v-if="currentStep === 0" class="welcome-step">
          <div class="welcome-icon">👋</div>
          <h1 class="welcome-title">欢迎使用</h1>
          <h2 class="welcome-subtitle">観測者企业财务模拟系统</h2>
          <p class="welcome-desc">
            这是一款专为会计初学者设计的教学模拟系统。<br>
            你将在真实的企业财务场景中，通过做账练习掌握会计实务技能。
          </p>
          <div class="welcome-features">
            <div class="wf-item"><span class="wf-icon">🏭</span> 四大行业场景</div>
            <div class="wf-item"><span class="wf-icon">📋</span> 2,122 个教学任务</div>
            <div class="wf-item"><span class="wf-icon">🎯</span> 三种学习模式</div>
            <div class="wf-item"><span class="wf-icon">🏅</span> 成就与等级系统</div>
          </div>
          <button class="primary-btn" @click="currentStep = 1">
            开始设置 <span class="btn-arrow">→</span>
          </button>
        </div>

        <!-- 步骤1：选择行业 -->
        <div v-if="currentStep === 1" class="industry-step">
          <h2 class="step-title">选择你要学习的行业</h2>
          <p class="step-desc">不同行业的会计处理方式有所不同，选择一个你感兴趣的行业开始学习。</p>
          <div class="industry-grid">
            <div
              v-for="sc in SCENARIOS"
              :key="sc.id"
              class="industry-card"
              :class="{ selected: selectedScenario === sc.id }"
              @click="selectedScenario = sc.id"
            >
              <span class="industry-icon">{{ sc.icon }}</span>
              <span class="industry-name">{{ sc.label }}</span>
              <span class="industry-desc">{{ sc.description }}</span>
              <div class="industry-check">
                <span v-if="selectedScenario === sc.id" class="check-mark">✓</span>
              </div>
            </div>
          </div>
          <div class="step-actions">
            <button class="ghost-btn" @click="currentStep = 0">← 上一步</button>
            <button class="primary-btn" @click="currentStep = 2">
              下一步 →
            </button>
          </div>
        </div>

        <!-- 步骤2：选择角色 -->
        <div v-if="currentStep === 2" class="role-step">
          <h2 class="step-title">选择你的角色</h2>
          <p class="step-desc">
            不同角色的工作内容不同。建议初学者从<strong>会计</strong>开始，全面了解账务处理流程。<br>
            出纳角色暂未推出，敬请期待。
          </p>
          <div class="role-grid">
            <div
              v-for="role in ROLES"
              :key="role.id"
              class="role-card"
              :class="{ selected: selectedRole === role.id, disabled: role.id === 'cashier', [role.id]: true }"
              @click="role.id !== 'cashier' && (selectedRole = role.id)"
            >
              <span class="role-icon">{{ role.icon }}</span>
              <span class="role-name">{{ role.name }}</span>
              <span class="role-desc">{{ role.desc }}</span>
              <div class="role-tasks">
                <span v-for="t in role.tasks" :key="t" class="role-task-tag">{{ t }}</span>
              </div>
              <div class="role-check">
                <span v-if="selectedRole === role.id" class="check-mark">✓</span>
              </div>
              <div v-if="role.id === 'cashier'" class="role-locked-badge">暂未推出</div>
            </div>
          </div>
          <div class="step-actions">
            <button class="ghost-btn" @click="currentStep = 1">← 上一步</button>
            <button class="primary-btn" @click="currentStep = 3">
              下一步 →
            </button>
          </div>
        </div>

        <!-- 步骤3：功能概览 + 开始 -->
        <div v-if="currentStep === 3" class="overview-step">
          <h2 class="step-title">准备就绪！</h2>
          <p class="step-desc">系统已为你配置好 {{ scenarioLabel }} + {{ roleLabel }}，来看看怎么开始学习吧。</p>

          <div class="overview-grid">
            <div class="overview-card">
              <div class="ov-icon">📖</div>
              <div class="ov-title">三种学习模式</div>
              <div class="ov-list">
                <div><strong>引导模式</strong> — 分步推理带你做账</div>
                <div><strong>练习模式</strong> — 自主填空，答对自动过账</div>
                <div><strong>考试模式</strong> — 独立完成，检验成果</div>
              </div>
            </div>
            <div class="overview-card">
              <div class="ov-icon">🎮</div>
              <div class="ov-title">学习激励</div>
              <div class="ov-list">
                <div><strong>经验值 (XP)</strong> — 完成任务获得经验</div>
                <div><strong>等级称号</strong> — 见习生→财务传说（13级）</div>
                <div><strong>成就徽章</strong> — 解锁 16+ 项成就</div>
              </div>
            </div>
            <div class="overview-card overview-card-wide">
              <div class="ov-icon">💡</div>
              <div class="ov-title">学习路径建议</div>
              <div class="ov-list horizontal">
                <div>① 从 <strong>1月</strong> 开始按月学习</div>
                <div>② 先用 <strong>引导模式</strong> 熟悉流程</div>
                <div>③ 再用 <strong>练习模式</strong> 巩固</div>
                <div>④ 最后用 <strong>考试模式</strong> 检验</div>
              </div>
            </div>
          </div>

          <button class="primary-btn start-btn" @click="completeOnboarding">
            🚀 开始学习
          </button>
        </div>
      </div>
    </div>

    <!-- 版权信息 -->
    <div class="onboarding-copyright">
      © {{ year }} 観測者实验室 · 仅供教学使用
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/stores/store.js'
import { SCENARIOS } from '@/data/scenarios.js'

const router = useRouter()
const store = useStore()

const year = new Date().getFullYear()

// ─── 步骤状态 ───
const currentStep = ref(0)
const steps = ['欢迎', '选择行业', '选择角色', '准备就绪']

const selectedScenario = ref('manufacturing')
const selectedRole = ref('accountant')

// ─── 角色数据（含图标和任务描述） ───
const ROLES = [
  {
    id: 'accountant',
    name: '会计',
    icon: '👨‍💼',
    desc: '负责凭证录入、账务处理、编制报表',
    tasks: ['记账凭证', '科目余额表', '三大报表', '期末结转'],
  },
  {
    id: 'cashier',
    name: '出纳',
    icon: '💰',
    desc: '负责收付款、银行对账、资金管理',
    tasks: ['收款付款', '银行对账', '现金盘点', '日记账'],
  },
]

// ─── 计算属性 ───
const scenarioLabel = computed(() => {
  const s = SCENARIOS.find(s => s.id === selectedScenario.value)
  return s ? `${s.icon} ${s.label}` : ''
})

const roleLabel = computed(() => {
  const r = ROLES.find(r => r.id === selectedRole.value)
  return r ? r.name : ''
})

// ─── 完成引导 ───
function completeOnboarding() {
  // 1. 设置场景
  localStorage.setItem('jd_scenario', selectedScenario.value)
  // 2. 设置角色
  store.switchRole(selectedRole.value)
  // 3. 标记引导完成
  localStorage.setItem('jd_onboarding_complete', 'true')
  // 4. 跳转到工作台
  router.replace('/dashboard')
}

// ─── 粒子背景 ───
function particleStyle(n) {
  const left = ((n * 23 + 17) % 100)
  const delay = ((n * 11) % 15)
  const size = 2 + ((n * 5) % 4)
  const duration = 15 + ((n * 9) % 10)
  const opacity = 0.1 + ((n * 3) % 5) * 0.05
  return {
    left: `${left}%`,
    width: `${size}px`,
    height: `${size}px`,
    opacity,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
  }
}
</script>

<style scoped>
.onboarding-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #0a1628 0%, #1a2a4a 30%, #2a4a6a 55%, #1a2a4a 100%);
  padding: 20px;
}

/* ─── 粒子 ─── */
.particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}
.particle {
  position: absolute;
  bottom: -10px;
  background: rgba(255,255,255,0.25);
  border-radius: 50%;
  animation: floatUp linear infinite;
}
@keyframes floatUp {
  0% { transform: translateY(0) scale(1); opacity: 0; }
  10% { opacity: 0.5; }
  90% { opacity: 0.2; }
  100% { transform: translateY(-100vh) scale(0.3); opacity: 0; }
}

/* ─── 品牌 ─── */
.brand-badge {
  position: absolute;
  top: 20px;
  right: 24px;
  z-index: 2;
}

/* ─── 跳过 ─── */
.skip-area {
  position: absolute;
  top: 20px;
  left: 24px;
  z-index: 2;
}
.skip-btn {
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.15);
  color: rgba(255,255,255,0.6);
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}
.skip-btn:hover {
  background: rgba(255,255,255,0.15);
  color: rgba(255,255,255,0.9);
}

/* ─── 主卡片 ─── */
.onboarding-card {
  width: 680px;
  max-width: 100%;
  min-height: 520px;
  background: rgba(255,255,255,0.97);
  border-radius: 20px;
  box-shadow: 0 16px 64px rgba(0,0,0,0.35);
  padding: 40px 44px;
  position: relative;
  z-index: 1;
  backdrop-filter: blur(12px);
  animation: cardIn 0.5s ease;
}
[data-theme="dark"] .onboarding-card {
  background: rgba(37,37,64,0.98);
}
[data-theme="ink"] .onboarding-card {
  background: rgba(250,247,242,0.98);
}

@keyframes cardIn {
  0% { opacity: 0; transform: translateY(24px) scale(0.97); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}

/* ─── 步骤指示器 ─── */
.step-indicator {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  margin: 0 16px 36px;
  padding-bottom: 28px;
  border-bottom: 1px solid var(--border, #e4e7ed);
}
/* 步骤间连线（背景轨道） */
.step-indicator::before {
  content: '';
  position: absolute;
  top: 16px;
  left: 0;
  right: 0;
  height: 3px;
  background: #e4e7ed;
  border-radius: 2px;
  z-index: 0;
}
/* 步骤间连线（进度填充） */
.step-line {
  position: absolute;
  top: 16px;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, #67c23a, #409eff);
  transition: width 0.5s ease;
  border-radius: 2px;
  z-index: 1;
}
.step-dot {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e4e7ed;
  color: #909399;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
  flex-shrink: 0;
}
.step-dot.active {
  background: #409eff;
  color: #fff;
  box-shadow: 0 0 0 4px rgba(64,158,255,0.2);
}
.step-dot.done {
  background: #67c23a;
  color: #fff;
}
.step-num { line-height: 1; }
.step-label {
  position: absolute;
  right: 0;
  bottom: 6px;
  font-size: 13px;
  color: var(--text-light, #909399);
}

/* ─── 步骤内容动画 ─── */
.step-content {
  animation: fadeSlideIn 0.35s ease;
}
@keyframes fadeSlideIn {
  0% { opacity: 0; transform: translateX(12px); }
  100% { opacity: 1; transform: translateX(0); }
}

/* ─── 步骤0：欢迎 ─── */
.welcome-step {
  text-align: center;
  padding: 20px 0;
}
.welcome-icon {
  font-size: 56px;
  margin-bottom: 12px;
  animation: float 3s ease-in-out infinite;
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
.welcome-title {
  font-size: 28px;
  font-weight: 300;
  color: #606266;
  margin: 0 0 4px;
}
.welcome-subtitle {
  font-size: 26px;
  font-weight: 700;
  color: #1a3a5c;
  margin: 0 0 16px;
  letter-spacing: 2px;
}
[data-theme="dark"] .welcome-subtitle { color: #e0e0e0; }
[data-theme="ink"] .welcome-subtitle { color: #2c2c2c; }
.welcome-desc {
  font-size: 15px;
  color: #909399;
  line-height: 1.7;
  margin-bottom: 24px;
}
.welcome-features {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 32px;
}
.wf-item {
  background: #f0f9ff;
  color: #409eff;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid rgba(64,158,255,0.2);
}
[data-theme="dark"] .wf-item {
  background: rgba(64,158,255,0.1);
  border-color: rgba(64,158,255,0.25);
}
[data-theme="ink"] .wf-item {
  background: #f5f0e8;
  color: #b8453a;
  border-color: rgba(184,69,58,0.2);
}
.wf-icon { margin-right: 4px; }

/* ─── 通用步骤 ─── */
.step-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--text, #303133);
  margin: 0 0 8px;
}
.step-desc {
  font-size: 14px;
  color: var(--text-light, #909399);
  margin-bottom: 28px;
  line-height: 1.6;
}

/* ─── 步骤1：行业选择 ─── */
.industry-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-bottom: 28px;
}
.industry-card {
  background: var(--bg-card, #fff);
  border: 2px solid var(--border, #e4e7ed);
  border-radius: 14px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
}
.industry-card:hover {
  border-color: var(--accent, #409eff);
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(64,158,255,0.12);
}
.industry-card.selected {
  border-color: var(--accent, #409eff);
  background: rgba(64,158,255,0.06);
  box-shadow: 0 0 0 3px rgba(64,158,255,0.15);
}
.industry-icon {
  font-size: 36px;
  margin-bottom: 8px;
}
.industry-name {
  font-size: 16px;
  font-weight: 700;
  color: var(--text, #303133);
  margin-bottom: 4px;
}
.industry-desc {
  font-size: 12px;
  color: var(--text-light, #909399);
  line-height: 1.4;
}
.industry-check {
  position: absolute;
  top: 10px;
  right: 10px;
}
.check-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--accent, #409eff);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
}

/* ─── 步骤2：角色选择 ─── */
.role-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-bottom: 28px;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
}
.role-card {
  background: var(--bg-card, #fff);
  border: 2px solid var(--border, #e4e7ed);
  border-radius: 14px;
  padding: 20px 16px;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
}
.role-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
}
.role-card.accountant:hover,
.role-card.accountant.selected {
  border-color: #409eff;
  box-shadow: 0 0 0 3px rgba(64,158,255,0.15);
}
.role-card.cashier:not(.disabled):hover,
.role-card.cashier.selected {
  border-color: #e6a23c;
  box-shadow: 0 0 0 3px rgba(230,162,60,0.15);
}
.role-card.accountant.selected { background: rgba(64,158,255,0.06); border-color: #409eff; }
.role-card.cashier.selected { background: rgba(230,162,60,0.06); border-color: #e6a23c; }
.role-card.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  position: relative;
  overflow: hidden;
}
.role-card.disabled:hover {
  border-color: #dcdfe6;
  box-shadow: none;
}
.role-locked-badge {
  position: absolute;
  top: 10px;
  right: -28px;
  background: #909399;
  color: #fff;
  font-size: 11px;
  padding: 2px 32px;
  transform: rotate(45deg);
  letter-spacing: 1px;
}
.role-icon {
  font-size: 36px;
  margin-bottom: 8px;
}
.role-name {
  font-size: 16px;
  font-weight: 700;
  color: var(--text, #303133);
  margin-bottom: 4px;
}
.role-desc {
  font-size: 12px;
  color: var(--text-light, #909399);
  margin-bottom: 10px;
  line-height: 1.4;
}
.role-tasks {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: center;
}
.role-task-tag {
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 10px;
  background: var(--bg, #f0f2f5);
  color: var(--text-secondary, #606266);
  border: 1px solid var(--border, #e4e7ed);
}
.role-check {
  position: absolute;
  top: 10px;
  right: 10px;
}

/* ─── 导航按钮 ─── */
.step-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.primary-btn {
  background: linear-gradient(135deg, #409eff, #2d7bd6);
  color: #fff;
  border: none;
  padding: 10px 32px;
  border-radius: 24px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  letter-spacing: 0.5px;
}
.primary-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(64,158,255,0.35);
}
.primary-btn:active {
  transform: translateY(0);
}
.btn-arrow {
  margin-left: 4px;
}
.ghost-btn {
  background: transparent;
  border: 1px solid var(--border, #e4e7ed);
  color: var(--text-secondary, #606266);
  padding: 10px 24px;
  border-radius: 24px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}
.ghost-btn:hover {
  border-color: var(--accent, #409eff);
  color: var(--accent, #409eff);
}

/* ─── 步骤3：概览 ─── */
.overview-step {
  text-align: center;
  padding: 10px 0;
}
.overview-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-bottom: 28px;
}
.overview-card {
  background: var(--bg, #f0f2f5);
  border-radius: 14px;
  padding: 20px;
  text-align: left;
  transition: background 0.3s;
}
[data-theme="dark"] .overview-card { background: #2a2a2a; }
[data-theme="ink"] .overview-card { background: #faf7f2; }
.overview-card-wide {
  grid-column: 1 / -1;
}
.ov-icon {
  font-size: 28px;
  margin-bottom: 8px;
}
.ov-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--text, #303133);
  margin-bottom: 10px;
}
.ov-list {
  font-size: 13px;
  color: var(--text-secondary, #606266);
  line-height: 1.8;
}
.ov-list.horizontal {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 20px;
}
.ov-list.horizontal > div {
  white-space: nowrap;
}
.start-btn {
  padding: 12px 48px;
  font-size: 16px;
  letter-spacing: 1px;
}

/* ─── 版权 ─── */
.onboarding-copyright {
  position: absolute;
  bottom: 16px;
  font-size: 11px;
  color: rgba(255,255,255,0.25);
  letter-spacing: 1px;
}

/* ─── 响应式 ─── */
@media (max-width: 640px) {
  .onboarding-card {
    padding: 24px 20px;
    min-height: auto;
    border-radius: 14px;
  }
  .industry-grid { grid-template-columns: 1fr; }
  .role-grid { grid-template-columns: 1fr; }
  .overview-grid { grid-template-columns: 1fr; }
  .welcome-title { font-size: 22px; }
  .welcome-subtitle { font-size: 20px; }
  .step-title { font-size: 20px; }
  .welcome-features { flex-direction: column; align-items: center; }
}
</style>
