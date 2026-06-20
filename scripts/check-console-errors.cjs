/**
 * 检查各页面控制台错误
 * 快速验证没有Vue/JS运行时错误
 */
const { chromium } = require('playwright')
const path = require('path')

const BASE_URL = process.env.BASE_URL || 'http://localhost:3001'

const ROUTES = [
  { name: '登录页',       path: '/#/login' },
  { name: '仪表盘',       path: '/#/dashboard' },
  { name: '教学中心',     path: '/#/tutorial' },
  { name: '科目表',       path: '/#/accounting/subjects' },
  { name: '凭证录入',     path: '/#/accounting/voucher/entry' },
  { name: '凭证查询',     path: '/#/accounting/voucher/query' },
  { name: '科目余额表',   path: '/#/accounting/subject-balance' },
  { name: '账簿查询',     path: '/#/accounting/ledger' },
  { name: '试算平衡表',   path: '/#/accounting/trial-balance' },
  { name: '资产负债表',   path: '/#/reports/balance-sheet' },
  { name: '利润表',       path: '/#/reports/income-statement' },
  { name: '现金流量表',   path: '/#/reports/cash-flow' },
  { name: '自定义报表',   path: '/#/reports/custom' },
  { name: '期末结转',     path: '/#/reports/period-end-transfer' },
  { name: '纳税申报',     path: '/#/reports/tax-filing' },
  { name: '出纳管理',     path: '/#/accounting/cashier' },
  { name: '固定资产',     path: '/#/accounting/fixed-assets' },
  { name: '辅助核算',     path: '/#/accounting/auxiliary' },
  { name: '凭证模板',     path: '/#/accounting/voucher-templates' },
  { name: '应收应付',     path: '/#/accounting/arap' },
  { name: '工资管理',     path: '/#/accounting/payroll' },
  { name: '外币核算',     path: '/#/accounting/forex' },
  { name: '会计期间',     path: '/#/system/periods' },
  { name: '审计日志',     path: '/#/system/audit-log' },
  { name: '账套管理',     path: '/#/system/accounts' },
  { name: '成就系统',     path: '/#/tutorial/achievements' },
  { name: '业务流程全景图', path: '/#/tutorial/flow-chart' },
  { name: '404页面',      path: '/#/non-existent-xyz' },
]

async function main() {
  console.log('🔍 检查所有页面控制台错误...\n')

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    locale: 'zh-CN',
  })

  // 设置登录状态
  const page = await context.newPage()
  await page.goto(`${BASE_URL}/#/login`, { waitUntil: 'domcontentloaded', timeout: 15000 })
  await page.evaluate(() => {
    localStorage.setItem('jd_onboarding_done', 'true')
    localStorage.setItem('jd_selected_scenario', 'manufacturing')
    localStorage.setItem('jd_current_role', 'accountant')
  })

  // 登录
  await page.fill('input[placeholder="用户名"]', 'admin')
  await page.fill('input[placeholder="密码"]', 'admin123')
  await page.click('button:has-text("登 录")')
  await page.waitForTimeout(3000)
  await page.evaluate(() => localStorage.setItem('jd_onboarding_done', 'true'))

  let totalErrors = 0
  let errorPages = []

  for (const route of ROUTES) {
    const errors = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })

    page.on('pageerror', err => {
      errors.push(`PAGE ERROR: ${err.message}`)
    })

    try {
      await page.goto(`${BASE_URL}${route.path}`, { waitUntil: 'domcontentloaded', timeout: 10000 })
      await page.waitForTimeout(1500)
    } catch (e) {
      errors.push(`NAV ERROR: ${e.message}`)
    }

    // 收集该页面的错误
    const filtered = errors.filter(e => {
      // 忽略已知的第三方库错误
      if (e.includes('favicon.ico') || e.includes('Failed to load resource')) return false
      if (e.includes('ERR_BLOCKED_BY_CLIENT') || e.includes('ResizeObserver')) return false
      return true
    })

    if (filtered.length > 0) {
      totalErrors += filtered.length
      errorPages.push({ name: route.name, path: route.path, errors: filtered })
      console.log(`  ❌ ${route.name}: ${filtered.length} error(s)`)
      filtered.forEach(e => console.log(`       ${e.slice(0, 120)}`))
    } else {
      console.log(`  ✅ ${route.name}`)
    }

    // 清除事件监听
    page.removeAllListeners('console')
    page.removeAllListeners('pageerror')
  }

  console.log('\n' + '='.repeat(50))
  if (totalErrors === 0) {
    console.log('✅ 所有页面无控制台错误！')
  } else {
    console.log(`⚠️ 发现 ${totalErrors} 个控制台错误，分布在 ${errorPages.length} 个页面:`)
    errorPages.forEach(p => {
      console.log(`   ${p.name} (${p.path}):`)
      p.errors.forEach(e => console.log(`     - ${e.slice(0, 150)}`))
    })
  }

  await browser.close()
  process.exit(totalErrors > 0 ? 1 : 0)
}

main().catch(err => {
  console.error('测试失败:', err.message)
  process.exit(1)
})
