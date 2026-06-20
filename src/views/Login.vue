<template>
  <div class="login-page">
    <!-- 浮动粒子背景 -->
    <div class="particles">
      <div v-for="n in 30" :key="n" class="particle" :style="particleStyle(n)"></div>
    </div>

    <!-- 品牌标识 -->
    <div class="brand-badge">
      <el-tag size="small" type="warning" effect="dark" round>教学演示</el-tag>
      <span class="brand-version">v{{ version }}</span>
    </div>

    <!-- 登录卡片 -->
    <div class="login-card">
      <div class="login-header">
        <div class="login-logo-ring">
          <el-icon :size="40" color="#409eff"><Coin /></el-icon>
        </div>
        <h1 class="login-title">観測者企业财务模拟系统</h1>
        <p class="login-subtitle">KANSHASHA · Enterprise Financial Simulation</p>
      </div>

      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        class="login-form"
        @keyup.enter="handleLogin"
      >
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="用户名"
            :prefix-icon="User"
            size="large"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="密码"
            :prefix-icon="Lock"
            size="large"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="large"
            class="login-btn"
            :loading="loading"
            @click="handleLogin"
          >
            登 录
          </el-button>
        </el-form-item>
      </el-form>

      <div class="login-footer">
        <span class="login-hint">试用账号：admin / admin123</span>
        <span class="login-theme-toggle" @click="cycleLoginTheme" title="切换主题">
          🌓
        </span>
      </div>
    </div>

    <!-- 版权信息 -->
    <div class="login-copyright">
      © {{ year }} 観測者实验室 · 仅供教学使用
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { User, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const router = useRouter()
const formRef = ref(null)
const loading = ref(false)
const year = new Date().getFullYear()
const version = __APP_VERSION__ || '0.2.0'

const form = reactive({
  username: '',
  password: '',
})

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}

// 主题
const THEMES = ['light', 'dark', 'warm']
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme)
  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
onMounted(() => {
  const saved = localStorage.getItem('jd_theme') || 'light'
  applyTheme(saved)
})

function cycleLoginTheme() {
  const current = localStorage.getItem('jd_theme') || 'light'
  const idx = THEMES.indexOf(current)
  const next = THEMES[(idx + 1) % THEMES.length]
  applyTheme(next)
  localStorage.setItem('jd_theme', next)
}

function handleLogin() {
  formRef.value.validate((valid) => {
    if (!valid) return
    loading.value = true
    setTimeout(() => {
      if (form.username === 'admin' && form.password === 'admin123') {
        localStorage.setItem('jd_logged_in', 'true')
        localStorage.setItem('jd_user', JSON.stringify({ name: '管理员', username: 'admin' }))
        ElMessage.success('登录成功')
        router.push('/')
      } else {
        ElMessage.error('用户名或密码错误')
      }
      loading.value = false
    }, 600)
  })
}

// 粒子随机样式（SSR-safe）
function particleStyle(n) {
  const left = ((n * 17 + 31) % 100)
  const delay = ((n * 13) % 20)
  const size = 3 + ((n * 7) % 5)
  const duration = 12 + ((n * 11) % 8)
  const opacity = 0.15 + ((n * 3) % 6) * 0.05
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
.login-page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #0a1628 0%, #1a2a4a 30%, #2a4a6a 60%, #1a2a4a 100%);
  transition: background 0.8s ease;
}

/* 粒子动画 */
.particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}
.particle {
  position: absolute;
  bottom: -10px;
  background: rgba(255,255,255,0.3);
  border-radius: 50%;
  animation: floatUp linear infinite;
}
@keyframes floatUp {
  0% { transform: translateY(0) scale(1); opacity: 0; }
  10% { opacity: 0.6; }
  90% { opacity: 0.3; }
  100% { transform: translateY(-100vh) scale(0.5); opacity: 0; }
}

/* 品牌标识 */
.brand-badge {
  position: absolute;
  top: 24px;
  right: 28px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.brand-version {
  font-size: 12px;
  color: rgba(255,255,255,0.5);
  letter-spacing: 0.5px;
}

/* 登录卡片 */
.login-card {
  width: 400px;
  padding: 36px 32px;
  background: rgba(255,255,255,0.95);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  animation: cardIn 0.6s ease;
  position: relative;
  z-index: 1;
  backdrop-filter: blur(10px);
}
[data-theme="dark"] .login-card {
  background: rgba(37,37,64,0.95);
}
[data-theme="warm"] .login-card {
  background: rgba(255,253,249,0.95);
}

@keyframes cardIn {
  0% { opacity: 0; transform: translateY(30px) scale(0.96); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}

.login-header {
  text-align: center;
  margin-bottom: 28px;
}
.login-logo-ring {
  width: 64px;
  height: 64px;
  margin: 0 auto 14px;
  border-radius: 50%;
  background: linear-gradient(135deg, #e6f0ff, #b3d4ff);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(64,158,255,0.3);
  transition: background 0.3s;
}
.login-title {
  font-size: 22px;
  color: #303133;
  font-weight: 700;
  letter-spacing: 1px;
  margin: 0;
  transition: color 0.3s ease;
}
[data-theme="dark"] .login-title { color: #e0e0e0; }
[data-theme="warm"] .login-title { color: #3d2e1a; }

.login-subtitle {
  font-size: 11px;
  color: #909399;
  margin-top: 6px;
  letter-spacing: 2px;
}
[data-theme="dark"] .login-subtitle { color: #808090; }
[data-theme="warm"] .login-subtitle { color: #9a8e7a; }

.login-form { margin-bottom: 12px; }
.login-btn {
  width: 100%;
  font-size: 16px;
  letter-spacing: 4px;
  height: 42px;
  transition: all 0.2s ease;
}
.login-btn:active { transform: scale(0.98); }

.login-footer {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.login-hint {
  font-size: 12px;
  color: #909399;
}
.login-theme-toggle {
  font-size: 16px;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.2s, transform 0.2s;
}
.login-theme-toggle:hover {
  opacity: 1;
  transform: scale(1.2);
}

/* 版权 */
.login-copyright {
  position: absolute;
  bottom: 20px;
  font-size: 11px;
  color: rgba(255,255,255,0.3);
  letter-spacing: 1px;
}

/* 响应式 */
@media (max-width: 480px) {
  .login-card {
    width: 90%;
    padding: 28px 18px;
  }
  .login-title { font-size: 18px; }
  .brand-badge { top: 14px; right: 16px; }
}
</style>
