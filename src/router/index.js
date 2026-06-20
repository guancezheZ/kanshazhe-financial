import { createRouter, createWebHashHistory } from 'vue-router'
import { isActivated } from '@/utils/activation.js'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/onboarding',
    name: 'Onboarding',
    component: () => import('@/views/OnboardingView.vue'),
    meta: { title: '新手引导' },
  },
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
        meta: { title: '工作台', icon: 'HomeFilled' },
      },
      // 总账模块
      {
        path: 'accounting/subjects',
        name: 'SubjectList',
        component: () => import('@/views/accounting/SubjectList.vue'),
        meta: { title: '科目表', icon: 'List' },
      },
      {
        path: 'accounting/voucher/entry',
        name: 'VoucherEntry',
        component: () => import('@/views/accounting/VoucherEntry.vue'),
        meta: { title: '凭证录入', icon: 'EditPen' },
      },
      {
        path: 'accounting/voucher/query',
        name: 'VoucherQuery',
        component: () => import('@/views/accounting/VoucherQuery.vue'),
        meta: { title: '凭证查询', icon: 'Search' },
      },
      {
        path: 'accounting/subject-balance',
        name: 'SubjectBalance',
        component: () => import('@/views/accounting/SubjectBalance.vue'),
        meta: { title: '科目余额表', icon: 'DataBoard' },
      },
      {
        path: 'accounting/trial-balance',
        name: 'TrialBalance',
        component: () => import('@/views/accounting/TrialBalance.vue'),
        meta: { title: '试算平衡表', icon: 'DataBoard' },
      },
      {
        path: 'accounting/auxiliary',
        name: 'AuxiliaryCalc',
        component: () => import('@/views/accounting/AuxiliaryCalc.vue'),
        meta: { title: '辅助核算', icon: 'Coin' },
      },
      {
        path: 'accounting/voucher-templates',
        name: 'VoucherTemplates',
        component: () => import('@/views/accounting/VoucherTemplates.vue'),
        meta: { title: '凭证模板', icon: 'CopyDocument' },
      },
      {
        path: 'accounting/ledger',
        name: 'LedgerQuery',
        component: () => import('@/views/accounting/LedgerQuery.vue'),
        meta: { title: '账簿查询', icon: 'Reading' },
      },
      {
        path: 'accounting/cashier',
        name: 'CashierMgmt',
        component: () => import('@/views/accounting/CashierMgmt.vue'),
        meta: { title: '出纳管理', icon: 'Money' },
      },
      // 报表模块
      {
        path: 'reports/balance-sheet',
        name: 'BalanceSheet',
        component: () => import('@/views/reports/BalanceSheet.vue'),
        meta: { title: '资产负债表', icon: 'Document' },
      },
      {
        path: 'reports/income-statement',
        name: 'IncomeStatement',
        component: () => import('@/views/reports/IncomeStatement.vue'),
        meta: { title: '利润表', icon: 'DataAnalysis' },
      },
      {
        path: 'reports/cash-flow',
        name: 'CashFlow',
        component: () => import('@/views/reports/CashFlow.vue'),
        meta: { title: '现金流量表', icon: 'Money' },
      },
      {
        path: 'reports/custom',
        name: 'CustomReport',
        component: () => import('@/views/reports/CustomReport.vue'),
        meta: { title: '自定义报表', icon: 'DataAnalysis' },
      },
      {
        path: 'reports/period-end-transfer',
        name: 'PeriodEndTransfer',
        component: () => import('@/views/reports/PeriodEndTransfer.vue'),
        meta: { title: '期末结转', icon: 'Setting' },
      },
      {
        path: 'reports/tax-filing',
        name: 'TaxFiling',
        component: () => import('@/views/reports/TaxFiling.vue'),
        meta: { title: '模拟纳税申报', icon: 'Document' },
      },
      {
        path: 'accounting/arap',
        name: 'ARAPMgmt',
        component: () => import('@/views/accounting/ARAPMgmt.vue'),
        meta: { title: '应收应付', icon: 'Coin' },
      },
      {
        path: 'accounting/fixed-assets',
        name: 'FixedAssets',
        component: () => import('@/views/accounting/FixedAssets.vue'),
        meta: { title: '固定资产', icon: 'SetUp' },
      },
      {
        path: 'accounting/payroll',
        name: 'PayrollMgmt',
        component: () => import('@/views/accounting/PayrollMgmt.vue'),
        meta: { title: '工资管理', icon: 'Coin' },
      },
      {
        path: 'accounting/forex',
        name: 'ForexMgmt',
        component: () => import('@/views/accounting/ForexMgmt.vue'),
        meta: { title: '外币核算', icon: 'Money' },
      },
      // 系统管理
      {
        path: 'system/periods',
        name: 'PeriodManagement',
        component: () => import('@/views/system/PeriodManagement.vue'),
        meta: { title: '会计期间', icon: 'Setting' },
      },
      {
        path: 'system/audit-log',
        name: 'AuditLog',
        component: () => import('@/views/system/AuditLog.vue'),
        meta: { title: '审计轨迹', icon: 'Search' },
      },
      {
        path: 'system/accounts',
        name: 'AccountManagement',
        component: () => import('@/views/system/AccountManagement.vue'),
        meta: { title: '账套管理', icon: 'Setting' },
      },
      {
        path: 'system/activation',
        name: 'ActivationManage',
        component: () => import('@/views/system/ActivationManage.vue'),
        meta: { title: '激活管理', icon: 'Key' },
      },
      {
        path: 'tutorial',
        name: 'TutorialCenter',
        component: () => import('@/views/tutorial/TutorialCenter.vue'),
        meta: { title: '教学中心', icon: 'Reading' },
      },
      {
        path: 'tutorial/flow-chart',
        name: 'BusinessFlowChart',
        component: () => import('@/views/tutorial/BusinessFlowChart.vue'),
        meta: { title: '业务流程全景图', icon: 'SetUp' },
      },
      {
        path: 'tutorial/achievements',
        name: 'AchievementSystem',
        component: () => import('@/views/tutorial/AchievementSystem.vue'),
        meta: { title: '成就系统', icon: 'Star' },
      },
      // 📋 案例库
      {
        path: 'cases',
        name: 'CaseLibrary',
        component: () => import('@/views/cases/CaseLibrary.vue'),
        meta: { title: '案例库', icon: 'Notebook' },
      },
      {
        path: 'cases/:caseId',
        name: 'CaseDetail',
        component: () => import('@/views/cases/CaseDetail.vue'),
        meta: { title: '案例详情' },
      },
      {
        path: 'cases/:caseId/report',
        name: 'CaseReport',
        component: () => import('@/views/cases/CaseReport.vue'),
        meta: { title: '案例报表' },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// 路由守卫：未登录跳转登录页 + 首次使用跳转引导
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('jd_logged_in')

  // 未登录 → 登录页
  if (to.name !== 'Login' && !isLoggedIn) {
    next({ name: 'Login' })
    return
  }

  // 已登录 → 检查是否需要新手引导
  const onboardingDone = localStorage.getItem('jd_onboarding_complete')
  if (isLoggedIn && !onboardingDone && to.name !== 'Onboarding') {
    next({ name: 'Onboarding' })
    return
  }

  // 已引导完成或已在引导页，正常放行
  // 另外：如果已引导完成还去/onboarding，重定向到工作台
  if (to.name === 'Onboarding' && onboardingDone) {
    next({ path: '/dashboard' })
    return
  }

  // 激活检查：未激活时所有主应用路由重定向到 dashboard（由 MainLayout 拦截）
  if (to.name !== 'Login' && to.name !== 'Onboarding' && !isActivated()) {
    if (to.path !== '/dashboard' && to.path !== '/login' && to.path !== '/onboarding') {
      next({ path: '/dashboard' })
      return
    }
  }

  next()
})

export default router
