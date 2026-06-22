<template>
  <el-container class="main-container">
    <el-aside :width="sidebarWidth" class="main-sidebar" :class="roleSidebarClass">
      <div class="sidebar-header">
        <div v-if="!isCollapsed" class="sidebar-brand">
          <div class="brand-seal">
            <span class="seal-char">観</span>
          </div>
          <div class="brand-wrapper">
            <span class="brand-text">観測者财务</span>
          </div>
        </div>
        <div v-else class="sidebar-brand collapsed">
          <div class="brand-seal collapsed-seal">
            <span class="seal-char">観</span>
          </div>
        </div>
      </div>
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapsed"
        :collapse-transition="false"
        background-color="var(--primary)"
        text-color="#b8c7ce"
        active-text-color="#fff"
        router
        class="sidebar-menu"
      >
        <el-menu-item v-if="fm('/dashboard')" index="/dashboard">
          <el-icon><HomeFilled /></el-icon>
          <template #title>工作台</template>
        </el-menu-item>

        <!-- 📒 凭证管理 -->
        <el-sub-menu v-if="showVoucherGroup" index="voucher-group">
          <template #title>
            <el-icon><EditPen /></el-icon>
            <span>凭证管理</span>
          </template>
          <el-menu-item v-if="fm('/accounting/voucher/entry')" index="/accounting/voucher/entry">
            <el-icon><EditPen /></el-icon><template #title>凭证录入</template>
          </el-menu-item>
          <el-menu-item v-if="fm('/accounting/voucher/query')" index="/accounting/voucher/query">
            <el-icon><Search /></el-icon><template #title>凭证查询</template>
          </el-menu-item>
          <el-menu-item v-if="fm('/accounting/voucher-templates')" index="/accounting/voucher-templates">
            <el-icon><CopyDocument /></el-icon><template #title>凭证模板</template>
          </el-menu-item>
        </el-sub-menu>

        <!-- 📊 账簿报表 -->
        <el-sub-menu v-if="showLedgerGroup" index="ledger-group">
          <template #title>
            <el-icon><DataBoard /></el-icon>
            <span>账簿报表</span>
          </template>
          <el-menu-item v-if="fm('/accounting/subjects')" index="/accounting/subjects">
            <el-icon><List /></el-icon><template #title>科目表</template>
          </el-menu-item>
          <el-menu-item v-if="fm('/accounting/subject-balance')" index="/accounting/subject-balance">
            <el-icon><DataBoard /></el-icon><template #title>科目余额表</template>
          </el-menu-item>
          <el-menu-item v-if="fm('/accounting/trial-balance')" index="/accounting/trial-balance">
            <el-icon><DataBoard /></el-icon><template #title>试算平衡表</template>
          </el-menu-item>
          <el-menu-item v-if="fm('/accounting/ledger')" index="/accounting/ledger">
            <el-icon><Reading /></el-icon><template #title>账簿查询</template>
          </el-menu-item>
          <el-menu-item v-if="fm('/accounting/auxiliary')" index="/accounting/auxiliary">
            <el-icon><Coin /></el-icon><template #title>辅助核算</template>
          </el-menu-item>
        </el-sub-menu>

        <!-- 💰 出纳管理（仅出纳/主管可见） -->
        <el-sub-menu v-if="showCashierGroup" index="cashier-group">
          <template #title>
            <el-icon><Money /></el-icon>
            <span>出纳管理</span>
          </template>
          <el-menu-item v-if="fm('/accounting/cashier')" index="/accounting/cashier">
            <el-icon><Money /></el-icon><template #title>日记账与对账</template>
          </el-menu-item>
        </el-sub-menu>

        <!-- 🤝 往来管理 -->
        <el-sub-menu v-if="showARAPGroup" index="arap-group">
          <template #title>
            <el-icon><Coin /></el-icon>
            <span>往来管理</span>
          </template>
          <el-menu-item v-if="fm('/accounting/arap')" index="/accounting/arap">
            <el-icon><Coin /></el-icon><template #title>应收应付</template>
          </el-menu-item>
          <el-menu-item v-if="fm('/accounting/forex')" index="/accounting/forex">
            <el-icon><Money /></el-icon><template #title>外币核算</template>
          </el-menu-item>
        </el-sub-menu>

        <!-- 🏢 资产管理 -->
        <el-sub-menu v-if="showAssetGroup" index="asset-group">
          <template #title>
            <el-icon><SetUp /></el-icon>
            <span>资产管理</span>
          </template>
          <el-menu-item v-if="fm('/accounting/inventory')" index="/accounting/inventory">
            <el-icon><Box /></el-icon><template #title>存货管理</template>
          </el-menu-item>
          <el-menu-item v-if="fm('/accounting/fixed-assets')" index="/accounting/fixed-assets">
            <el-icon><SetUp /></el-icon><template #title>固定资产</template>
          </el-menu-item>
          <el-menu-item v-if="fm('/accounting/payroll')" index="/accounting/payroll">
            <el-icon><Coin /></el-icon><template #title>工资管理</template>
          </el-menu-item>
        </el-sub-menu>

        <!-- 📋 报表分析 -->
        <el-sub-menu v-if="showReportGroup" index="report-group">
          <template #title>
            <el-icon><Document /></el-icon>
            <span>报表分析</span>
          </template>
          <el-menu-item v-if="fm('/reports/balance-sheet')" index="/reports/balance-sheet">
            <el-icon><Document /></el-icon><template #title>资产负债表</template>
          </el-menu-item>
          <el-menu-item v-if="fm('/reports/income-statement')" index="/reports/income-statement">
            <el-icon><DataAnalysis /></el-icon><template #title>利润表</template>
          </el-menu-item>
          <el-menu-item v-if="fm('/reports/cash-flow')" index="/reports/cash-flow">
            <el-icon><Money /></el-icon><template #title>现金流量表</template>
          </el-menu-item>
          <el-menu-item v-if="fm('/reports/custom')" index="/reports/custom">
            <el-icon><DataAnalysis /></el-icon><template #title>自定义报表</template>
          </el-menu-item>
          <el-menu-item v-if="fm('/reports/tax-filing')" index="/reports/tax-filing">
            <el-icon><Document /></el-icon><template #title>模拟纳税申报</template>
          </el-menu-item>
          <el-menu-item v-if="fm('/reports/period-end-transfer')" index="/reports/period-end-transfer">
            <el-icon><Setting /></el-icon><template #title>期末结转</template>
          </el-menu-item>
          <el-menu-item v-if="fm('/reports/financial-trend')" index="/reports/financial-trend">
            <el-icon><TrendCharts /></el-icon><template #title>财务分析趋势</template>
          </el-menu-item>
        </el-sub-menu>

        <el-menu-item v-if="fm('/tutorial')" index="/tutorial">
          <el-icon><Reading /></el-icon><template #title>教学中心</template>
        </el-menu-item>

        <!-- 📋 案例库 -->
        <el-menu-item v-if="fm('/cases')" index="/cases">
          <el-icon><Collection /></el-icon><template #title>案例库</template>
        </el-menu-item>

        <el-menu-item v-if="fm('/system/settings')" index="/system/settings">
          <el-icon><Setting /></el-icon><template #title>系统设置</template>
        </el-menu-item>

        <!-- 🚀 检查更新 -->
        <el-menu-item v-if="isTauri" @click="checkUpdate">
          <el-icon><Download /></el-icon><template #title>检查更新</template>
        </el-menu-item>

        <!-- 📚 配套资料 -->
        <el-sub-menu v-if="isTauri" index="docs-group">
          <template #title>
            <el-icon><Reading /></el-icon>
            <span>配套资料</span>
          </template>
          <el-menu-item @click="openDoc('系统使用说明书.html')">
            <el-icon><Reading /></el-icon><template #title>📖 使用说明书</template>
          </el-menu-item>
          <el-menu-item @click="openDoc('教学知识点介绍.html')">
            <el-icon><Reading /></el-icon><template #title>📘 教学知识点</template>
          </el-menu-item>
          <el-menu-item @click="openDoc('観測者财务宣传.html')">
            <el-icon><Reading /></el-icon><template #title>🏠 系统宣传页</template>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
      <!-- 正版授权徽章 -->
      <div class="license-badge" :class="{ collapsed: isCollapsed, unauthorized: !activated }" @click="handleLicenseClick">
        <el-icon :size="isCollapsed ? 18 : 16" :color="activated ? 'var(--accent, #e6a23c)' : 'var(--text-light)'">
          <Check v-if="activated" /><Close v-else />
        </el-icon>
        <span v-show="!isCollapsed" class="license-text">{{ activated ? '正版授权' : '未授权' }}</span>
      </div>
    </el-aside>

    <el-container class="main-right">
      <el-header class="main-header">
        <div class="header-left">
          <el-button text @click="toggleSidebar" class="collapse-btn">
            <el-icon :size="20"><Fold /></el-icon>
          </el-button>
          <!-- 全局搜索 Ctrl+K -->
          <div class="header-search" @click="focusSearch">
            <el-input
              ref="searchInputRef"
              v-model="searchQuery"
              placeholder="搜索菜单或功能…"
              size="small"
              clearable
              class="global-search"
              @keydown.enter="handleSearch"
            >
              <template #prefix>
                <el-icon><Search /></el-icon>
              </template>
              <template #suffix>
                <span class="search-shortcut">Ctrl+K</span>
              </template>
            </el-input>
          </div>
          <el-breadcrumb class="header-breadcrumb">
            <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentPageTitle">{{ currentPageTitle }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="header-right">
          <el-dropdown trigger="click" class="role-switcher">
            <span class="role-badge">
              <el-tag :type="currentRole === 'supervisor' ? 'danger' : currentRole === 'accountant' ? 'primary' : 'warning'" size="small">
                {{ roleLabel }}
              </el-tag>
              <el-icon style="margin-left:2px"><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="r in store.ROLES" :key="r.id" :disabled="r.id === 'cashier'" @click="r.id !== 'cashier' && switchRole(r.id)">
                  <span :style="{ fontWeight: currentRole === r.id ? 700 : 400 }">{{ r.name }}</span>
                  <span style="color:#909399;font-size:12px;margin-left:8px">{{ r.desc }}</span>
                  <span v-if="r.id === 'cashier'" style="color:#c0c4cc;font-size:11px;margin-left:6px">暂未推出</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <!-- 等级徽章 -->
          <el-tooltip :content="levelTooltip" placement="bottom">
            <span class="level-badge" :style="{ borderColor: levelBorderColor }">
              <span class="level-icon">{{ levelInfo.icon }}</span>
              <span class="level-num">Lv.{{ levelInfo.level }}</span>
            </span>
          </el-tooltip>
          <el-dropdown trigger="click">
            <span class="user-info">
              <el-avatar :size="32" icon="UserFilled" class="user-avatar" />
              <span class="user-name">{{ currentUser }}</span>
              <el-icon><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item disabled>
                  <span class="dropdown-level">
                    {{ levelInfo.icon }} Lv.{{ levelInfo.level }} {{ levelInfo.title }}
                    <span style="color:#909399;font-size:11px">（{{ levelInfo.totalXp }} XP）</span>
                  </span>
                </el-dropdown-item>
                <el-dropdown-item divided @click="handleLogout">
                  <el-icon><SwitchButton /></el-icon>退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <div class="main-body">
        <el-main class="main-content">
          <router-view v-slot="{ Component }">
            <transition name="slide-fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
          <TutorialFloater />
        </el-main>
        <TeachingSidePanel />
      </div>
    </el-container>
  </el-container>
  <ActivationDialog v-model="showActivation" :strict="!activated" @activated="onActivated" />
  <IntegrityCheckDialog v-model="showIntegrity" />
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import {
  Fold, HomeFilled, Reading, List, EditPen, Search,
  Document, DataAnalysis, Money, Setting, ArrowDown,
  UserFilled, SwitchButton, DataBoard, Coin, CopyDocument, SetUp,
  Moon, Notebook, Lock, Close, Check, Download, Box, TrendCharts,
} from '@element-plus/icons-vue'
import { useStore } from '@/stores/store.js'
import { calcLevel } from '@/data/xp-system.js'
import TutorialFloater from '@/components/TutorialFloater.vue'
import TeachingSidePanel from '@/components/TeachingSidePanel.vue'
import ActivationDialog from '@/components/ActivationDialog.vue'
import IntegrityCheckDialog from '@/components/IntegrityCheckDialog.vue'
import { isActivated, syncTauriActivation, initDeviceFingerprint, initActivationCache } from '@/utils/activation.js'
import { checkIntegrity } from '@/utils/integrity.js'
import { shouldRunCleanup, runCleanup } from '@/utils/storage-cleanup.js'

// ⭐ 配套资料（Tauri桌面端专用）
const isTauri = computed(() => typeof window !== 'undefined' && window.__TAURI__ !== undefined)

async function openDoc(filename) {
  if (!isTauri.value) return
  try {
    const { invoke } = await import('@tauri-apps/api/core')
    await invoke('open_doc', { filename })
  } catch (e) {
    console.error('打开文档失败:', e)
  }
}

async function checkUpdate() {
  // 先联网检查最新版
  try {
    const res = await fetch('https://jiaqinw.xyz/version', { signal: AbortSignal.timeout(5000) })
    if (res.ok) {
      const data = await res.json()
      latestVersion.value = data.version
      if (data.version && data.version !== APP_VERSION) {
        // 有新版本 → 弹窗提示下载
        ElMessageBox.alert(
          `当前版本 ${APP_VERSION} → 最新 ${data.version}<br>点击"去下载"获取新版`,
          '📦 发现新版本',
          { confirmButtonText: '去下载', cancelButtonText: '取消', dangerouslyUseHTMLString: true, type: 'info' }
        ).then(() => {
          if (isTauri.value) {
            import('@tauri-apps/api/core').then(({ invoke }) => invoke('open_url', { url: 'https://jiaqinw.xyz/dl' }))
          } else {
            window.open('https://jiaqinw.xyz/dl', '_blank')
          }
        }).catch(() => {})
        return
      }
    }
  } catch { /* 网络不通则调浏览器 */ }

  // 无新版本或检查失败 → 打开更新页
  const url = 'https://jiaqinw.xyz/update'
  if (isTauri.value) {
    try {
      const { invoke } = await import('@tauri-apps/api/core')
      await invoke('open_url', { url })
    } catch { window.open(url, '_blank') }
  } else {
    window.open(url, '_blank')
  }
}


const store = useStore()
const router = useRouter()
const route = useRoute()

// 🔄 自动版本检查
const latestVersion = ref(null)
const APP_VERSION = 'v0.2.0'
async function checkLatestVersion() {
  try {
    const res = await fetch('https://jiaqinw.xyz/version', { signal: AbortSignal.timeout(5000) })
    if (res.ok) {
      const data = await res.json()
      latestVersion.value = data.version
      if (data.version && data.version !== APP_VERSION) {
        ElMessageBox.alert(
          `发现新版本 ${data.version}（当前 ${APP_VERSION}）<br>下载新版覆盖安装即可，<b>激活码不会丢失</b>`,
          '📦 有新版本',
          { confirmButtonText: '去下载', cancelButtonText: '稍后', dangerouslyUseHTMLString: true, type: 'info' }
        ).then(() => {
          if (isTauri.value) {
            import('@tauri-apps/api/core').then(({ invoke }) => invoke('open_url', { url: 'https://jiaqinw.xyz/dl' }))
          } else {
            window.open('https://jiaqinw.xyz/dl', '_blank')
          }
        }).catch(() => {})
      }
    }
  } catch { /* 网络不通不打扰用户 */ }
}

const isCollapsed = ref(false)
const sidebarWidth = computed(() => (isCollapsed.value ? '64px' : '220px'))
const activeMenu = computed(() => route.path)
const showActivation = ref(false)
const showIntegrity = ref(false)
const activated = ref(isActivated())
function refreshActivated() { activated.value = isActivated() }
function handleLicenseClick() {
  router.push('/system/activation')
}
function onActivated() {
  refreshActivated()
}
const currentPageTitle = computed(() => route.meta?.title || '')

const currentRole = computed(() => store.getCurrentRole())
const roleLabel = computed(() => { const r = store.ROLES.find(x => x.id === currentRole.value); return r ? r.name : '' })
const roleSidebarClass = computed(() => {
  const map = { accountant: 'sidebar-role-accountant', cashier: 'sidebar-role-cashier', supervisor: 'sidebar-role-supervisor' }
  return map[currentRole.value] || ''
})
const roleAccentColor = computed(() => {
  const map = { accountant: 'var(--sidebar-accent, #409eff)', cashier: 'var(--sidebar-accent, #e6a23c)', supervisor: 'var(--sidebar-accent, #f56c6c)' }
  return map[currentRole.value] || 'var(--sidebar-accent, #fff)'
})
const mf = computed(() => store.getRoleMenuFilter())
function fm(path) { return mf.value ? mf.value(path) : true }

// 子菜单可见性（6组）
const showVoucherGroup = computed(() => fm('/accounting/voucher/entry') || fm('/accounting/voucher/query') || fm('/accounting/voucher-templates'))
const showLedgerGroup = computed(() => fm('/accounting/subjects') || fm('/accounting/subject-balance') || fm('/accounting/trial-balance') || fm('/accounting/ledger') || fm('/accounting/auxiliary'))
const showCashierGroup = computed(() => fm('/accounting/cashier'))
const showARAPGroup = computed(() => fm('/accounting/arap') || fm('/accounting/forex'))
const showAssetGroup = computed(() => fm('/accounting/inventory') || fm('/accounting/fixed-assets') || fm('/accounting/payroll'))
const showReportGroup = computed(() => fm('/reports/balance-sheet') || fm('/reports/income-statement') || fm('/reports/cash-flow') || fm('/reports/custom') || fm('/reports/tax-filing') || fm('/reports/period-end-transfer') || fm('/reports/financial-trend'))

const currentUser = computed(() => {
  try { const u = JSON.parse(localStorage.getItem('jd_user') || '{}'); return u.name || '未知用户' }
  catch { return '未知用户' }
})

// 等级信息
const levelInfo = computed(() => {
  // 依赖 progressVersion 使等级信息响应式更新
  void store.state.progressVersion
  try { return store.getLevelInfo() }
  catch { return calcLevel(0) }
})
const levelTooltip = computed(() => {
  const info = levelInfo.value
  if (info.isMaxLevel) return `${info.icon} Lv.${info.level} ${info.title}（已达最高等级）`
  return `${info.icon} Lv.${info.level} ${info.title} → ${info.xpProgress}/${info.xpToNext} XP`
})
const levelBorderColor = computed(() => {
  const lv = levelInfo.value.level
  if (lv >= 11) return '#e6a23c'
  if (lv >= 8) return '#409eff'
  if (lv >= 5) return '#67c23a'
  return '#909399'
})

// ----- 全局搜索 (Ctrl+K) -----
const searchQuery = ref('')
const searchInputRef = ref(null)
const SEARCH_MENU_MAP = [
  { label: '工作台', path: '/dashboard' },
  { label: '凭证录入', path: '/accounting/voucher/entry' },
  { label: '凭证查询', path: '/accounting/voucher/query' },
  { label: '凭证模板', path: '/accounting/voucher-templates' },
  { label: '科目表', path: '/accounting/subjects' },
  { label: '科目余额表', path: '/accounting/subject-balance' },
  { label: '试算平衡表', path: '/accounting/trial-balance' },
  { label: '账簿查询', path: '/accounting/ledger' },
  { label: '辅助核算', path: '/accounting/auxiliary' },
  { label: '出纳管理', path: '/accounting/cashier' },
  { label: '应收应付', path: '/accounting/arap' },
  { label: '外币核算', path: '/accounting/forex' },
  { label: '固定资产', path: '/accounting/fixed-assets' },
  { label: '工资管理', path: '/accounting/payroll' },
  { label: '资产负债表', path: '/reports/balance-sheet' },
  { label: '利润表', path: '/reports/income-statement' },
  { label: '现金流量表', path: '/reports/cash-flow' },
  { label: '自定义报表', path: '/reports/custom' },
  { label: '模拟纳税申报', path: '/reports/tax-filing' },
  { label: '期末结转', path: '/reports/period-end-transfer' },
  { label: '教学中心', path: '/tutorial' },
  { label: '案例库', path: '/cases' },
  { label: '会计期间', path: '/system/periods' },
  { label: '审计轨迹', path: '/system/audit-log' },
  { label: '账套管理', path: '/system/accounts' },
]

function focusSearch() {
  searchInputRef.value?.focus()
}

function handleSearch() {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return
  const match = SEARCH_MENU_MAP.find(m => m.label.includes(q))
  if (match) {
    searchQuery.value = ''
    router.push(match.path)
  }
}

function handleKeydown(e) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault()
    focusSearch()
  }
}

// ----- 快速新建 -----
function quickNew(type) {
  const map = { voucher: '/accounting/voucher/entry', subject: '/accounting/subjects', report: '/reports/custom' }
  if (map[type]) router.push(map[type])
}

function openNotifications() {
  router.push('/dashboard')
}

// 响应式：小屏自动收起侧栏
let resizeHandler = null

onMounted(() => {
  // 应用已保存的主题
  const savedTheme = localStorage.getItem('jd_theme') || 'ink'
  document.documentElement.setAttribute('data-theme', savedTheme)
  resizeHandler = () => {
    if (window.innerWidth < 1024) isCollapsed.value = true
  }
  resizeHandler()
  window.addEventListener('resize', resizeHandler)
  window.addEventListener('keydown', handleKeydown)

  // 初始化加密存储缓存 + 设备指纹 + 同步 Tauri 激活状态
  initActivationCache().then(() => {
    refreshActivated()
    return initDeviceFingerprint()
  }).then(() => {
    return syncTauriActivation()
  }).then(() => {
    refreshActivated()
    if (!activated.value) {
      showActivation.value = true
    }
  })

  // 静默完整性校验：发现哈希不匹配时弹窗提醒
  checkIntegrity().then(results => {
    const hasIssues = results.some(r => !r.pass)
    if (hasIssues) {
      showIntegrity.value = true
    }
  }).catch(() => {
    // 静默失败，不影响用户操作
  })

  // 📦 存储空间自动清理（超过4MB或30天未清理时触发）
  setTimeout(() => {
    if (shouldRunCleanup()) {
      const result = runCleanup({ monthsToKeep: 6, maxCompletedTasks: 2000 })
      const savedMB = ((result.beforeBytes - result.afterBytes) / (1024 * 1024)).toFixed(2)
      if (parseFloat(savedMB) > 0) {
        console.log('[Storage] 自动清理完成，释放 ' + savedMB + ' MB')
      }
    }
  }, 5000) // 延迟5秒，不影响首页加载

  // 🔄 自动检测最新版本
  setTimeout(() => checkLatestVersion(), 3000) // 延迟3秒，不影响首页加载
})

onUnmounted(() => {
  if (resizeHandler) window.removeEventListener('resize', resizeHandler)
  window.removeEventListener('keydown', handleKeydown)
})

function toggleSidebar() { isCollapsed.value = !isCollapsed.value }
function switchRole(roleId) { store.switchRole(roleId) }

function handleLogout() {
  ElMessageBox.confirm('确认退出登录吗？', '提示', {
    confirmButtonText: '退出', cancelButtonText: '取消', type: 'warning',
  }).then(() => {
    localStorage.removeItem('jd_logged_in'); localStorage.removeItem('jd_user')
    router.push('/login')
  }).catch(() => {})
}
</script>

<style scoped>
.main-container { height: 100vh; }
.main-sidebar {
  background-color: var(--primary);
  overflow-y: auto; overflow-x: hidden;
  transition: width 0.3s ease, background-color 0.3s ease;
}
.sidebar-role-accountant { --sidebar-accent: #409eff; }
.sidebar-role-cashier { --sidebar-accent: #e6a23c; }
.sidebar-role-supervisor { --sidebar-accent: #f56c6c; }
.sidebar-header { height: 64px; display: flex; align-items: center; justify-content: center; border-bottom: 2px solid var(--sidebar-accent, rgba(255,255,255,0.15)); }
.sidebar-brand { display: flex; align-items: center; gap: 10px; }
.sidebar-brand.collapsed { justify-content: center; }
.brand-wrapper { display: flex; flex-direction: column; line-height: 1.2; }
.brand-text { font-size: 18px; font-weight: 700; color: #fff; letter-spacing: 2px; font-family: 'STKaiti', 'KaiTi', 'Microsoft YaHei', serif; }
.brand-version { font-size: 10px; color: rgba(255,255,255,0.55); letter-spacing: 0.5px; }

/* 水墨印章 */
.brand-seal {
  width: 32px; height: 32px; border: 2px solid var(--sidebar-accent, #b8453a);
  border-radius: 4px; display: flex; align-items: center; justify-content: center;
  background: transparent; transform: rotate(-3deg); flex-shrink: 0;
  transition: transform 0.3s ease;
}
.brand-seal:hover { transform: rotate(0deg) scale(1.05); }
.collapsed-seal { width: 28px; height: 28px; margin: 0 auto; }
.seal-char {
  font-family: 'STKaiti', 'KaiTi', serif; font-size: 16px; font-weight: 700;
  color: var(--sidebar-accent, #b8453a); line-height: 1;
}
.collapsed-seal .seal-char { font-size: 14px; }
.sidebar-menu { border-right: none; }
.sidebar-menu:not(.el-menu--collapse) { width: 220px; }
.main-right { display: flex; flex-direction: column; }
.main-body { display: flex; flex: 1; overflow: hidden; }
.main-header {
  height: 56px; background: var(--bg-card); border-bottom: 1px solid var(--border);
  display: flex; align-items: center; justify-content: space-between; padding: 0 16px;
  transition: background-color 0.3s ease;
}
.header-left { display: flex; align-items: center; gap: 12px; flex: 1; }
.collapse-btn { padding: 4px; }
.header-search { width: 220px; transition: width 0.3s ease; }
.header-search:focus-within { width: 280px; }
.global-search { --el-input-height: 30px; }
.global-search :deep(.el-input__wrapper) { border-radius: 6px; background: var(--bg); border: 1px solid var(--border); box-shadow: none; }
.global-search :deep(.el-input__inner) { font-size: 12px; }
.search-shortcut { font-size: 10px; color: var(--text-secondary); background: var(--bg-card); padding: 0 4px; border-radius: 3px; border: 1px solid var(--border); line-height: 16px; }
.header-breadcrumb { margin-left: 4px; }
.header-breadcrumb :deep(.el-breadcrumb__inner) { font-size: 13px; color: var(--text-secondary); }
.header-right { display: flex; align-items: center; gap: 12px; }
.role-switcher { cursor: pointer; }
.role-badge { display: flex; align-items: center; }
.user-info { display: flex; align-items: center; gap: 6px; cursor: pointer; padding: 4px 8px; border-radius: 4px; transition: background 0.2s; }
.user-info:hover { background: var(--bg); }
.user-avatar { background-color: var(--accent); }
.user-name { font-size: 13px; color: var(--text); }

/* 正版授权徽章 */
.license-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 6px 10px;
  margin: 4px 12px;
  border: 1px solid var(--el-color-warning, #e6a23c);
  border-radius: 6px;
  background: color-mix(in srgb, var(--accent, #e6a23c) 10%, transparent);
  color: var(--accent, #e6a23c);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;
}
.license-badge:hover {
  background: color-mix(in srgb, var(--accent, #e6a23c) 20%, transparent);
}
.license-badge.unauthorized {
  border-color: var(--text-light);
  background: color-mix(in srgb, var(--text-light) 10%, transparent);
  color: var(--text-light);
}
.license-badge.unauthorized:hover {
  background: color-mix(in srgb, var(--text-light) 20%, transparent);
}
.license-badge.collapsed {
  padding: 6px 0;
  margin: 4px 8px;
  justify-content: center;
}
.license-text {
  white-space: nowrap;
  font-weight: 500;
}

/* 等级徽章 */
.level-badge {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 1px 8px 1px 4px;
  border: 1.5px solid #909399;
  border-radius: 12px;
  font-size: 11px;
  background: var(--bg);
  cursor: default;
  transition: border-color 0.3s;
}
.level-icon { font-size: 13px; line-height: 1; }
.level-num { font-weight: 700; color: var(--text); line-height: 1; }
.dropdown-level { font-size: 13px; }
.main-content { flex: 1; padding: 16px; overflow-y: auto; background: var(--bg); transition: background-color 0.3s ease; }
</style>
