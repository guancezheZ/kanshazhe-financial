/**
 * Playwright 截图脚本 v2
 * 启动 dev server → 自动检测端口 → 登录 → 遍历各页面截图
 *
 * 用法：node scripts/take-screenshots.cjs
 */
const { chromium } = require('playwright')
const { spawn } = require('child_process')
const path = require('path')
const http = require('http')

const SCREENSHOTS_DIR = path.resolve(__dirname, '..', 'docs', 'screenshots')
const VIEWPORT = { width: 1440, height: 900 }

// 截图配置
const SCREENSHOT_CONFIG = [
  { name: '01-login',        route: '/#/login',                                       description: '登录页面' },
  { name: '02-dashboard',    route: '/#/dashboard',                                  description: '工作台 - 统计概览' },
  { name: '03-tutorial',     route: '/#/tutorial',                                   description: '教学中心' },
  { name: '04-subjects',     route: '/#/accounting/subjects',                        description: '科目表 - 树形结构' },
  { name: '05-voucher-entry',route: '/#/accounting/voucher/entry',                   description: '凭证录入页面' },
  { name: '06-voucher-query',route: '/#/accounting/voucher/query',                   description: '凭证查询' },
  { name: '07-subject-bal',  route: '/#/accounting/subject-balance',                 description: '科目余额表' },
  { name: '08-trial-bal',    route: '/#/accounting/trial-balance',                    description: '试算平衡表' },
  { name: '09-balance-sheet',route: '/#/reports/balance-sheet',                      description: '资产负债表' },
  { name: '10-income-stmt',  route: '/#/reports/income-statement',                   description: '利润表' },
  { name: '11-cash-flow',    route: '/#/reports/cash-flow',                          description: '现金流量表' },
  { name: '12-period-end',   route: '/#/reports/period-end-transfer',                description: '期末结转' },
  { name: '13-cashier',      route: '/#/accounting/cashier',                         description: '出纳管理' },
  { name: '14-fixed-assets', route: '/#/accounting/fixed-assets',                    description: '固定资产管理' },
  { name: '15-ledger',       route: '/#/accounting/ledger',                          description: '账簿查询' },
  { name: '16-auxiliary',    route: '/#/accounting/auxiliary',                       description: '辅助核算' },
  { name: '17-voucher-tpl',  route: '/#/accounting/voucher-templates',               description: '凭证模板' },
  { name: '18-arap',         route: '/#/accounting/arap',                            description: '应收应付管理' },
  { name: '19-payroll',      route: '/#/accounting/payroll',                          description: '工资管理' },
  { name: '20-forex',        route: '/#/accounting/forex',                           description: '外币核算' },
  { name: '21-tax-filing',   route: '/#/reports/tax-filing',                         description: '模拟纳税申报' },
  { name: '22-periods',      route: '/#/system/periods',                             description: '会计期间管理' },
  { name: '23-audit-log',    route: '/#/system/audit-log',                           description: '审计轨迹' },
  { name: '24-account-mgmt', route: '/#/system/accounts',                           description: '账套管理' },
  { name: '25-flow-chart',   route: '/#/tutorial/flow-chart',                        description: '业务流程全景图' },
  { name: '26-achievements', route: '/#/tutorial/achievements',                      description: '成就系统' },
  { name: '27-custom-report',route: '/#/reports/custom',                             description: '自定义报表' },
  { name: '28-voucher-display-invoice', route: '/#/accounting/voucher/query',        description: '凭证展示-发票' },
]

function startDevServer() {
  return new Promise((resolve, reject) => {
    const server = spawn('npm.cmd', ['run', 'dev'], {
      cwd: path.resolve(__dirname, '..'),
      stdio: ['ignore', 'pipe', 'pipe'],
      shell: true,
    })

    let resolved = false
    const timeout = setTimeout(() => {
      if (!resolved) { server.kill(); reject(new Error('Dev server did not start within 60s')) }
    }, 60000)

    function tryResolve(data) {
      // Strip ANSI escape codes before parsing
      const text = data.toString().replace(/\x1B\[[0-9;]*[a-zA-Z]/g, '')
      // 解析实际端口: http://localhost:PORT/
      const portMatch = text.match(/http:\/\/localhost:(\d+)/)
      if (portMatch && !resolved) {
        resolved = true
        clearTimeout(timeout)
        const port = parseInt(portMatch[1])
        console.log(`✅ Dev server running on port ${port}`)
        setTimeout(() => resolve({ server, port }), 2000)
      }
    }

    server.stdout.on('data', (data) => { tryResolve(data) })
    server.stderr.on('data', (data) => { tryResolve(data) })
    server.on('error', (err) => { if (!resolved) { clearTimeout(timeout); reject(err) } })
    server.on('exit', (code) => { if (!resolved) { clearTimeout(timeout); reject(new Error(`Exited with code ${code}`)) } })
  })
}

async function waitForApp(page, url, timeout = 20000) {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout })
  // 等待 Vue 挂载 - 检查 #app 下的内容
  await page.waitForFunction(() => {
    const app = document.querySelector('#app')
    return app && app.children.length > 0 && app.textContent.length > 20
  }, { timeout: 10000 }).catch(() => {})
  await page.waitForTimeout(2000)
}

async function takeScreenshots() {
  console.log('🚀 启动开发服务器...')
  const { server, port } = await startDevServer()
  const BASE_URL = `http://localhost:${port}`

  let browser
  try {
    console.log('🌐 启动浏览器...')
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })

    const context = await browser.newContext({
      viewport: VIEWPORT,
      locale: 'zh-CN',
    })
    const page = await context.newPage()

    // ===== 1. 登录页截图 =====
    console.log('📸 截图 1/28: 登录页面')
    await waitForApp(page, `${BASE_URL}/#/login`)
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '01-login.png') })

    // ===== 2. 登录 =====
    console.log('🔑 登录...')
    await page.fill('input[placeholder="用户名"]', 'admin')
    await page.fill('input[placeholder="密码"]', 'admin123')
    await page.click('button:has-text("登 录")')
    await page.waitForTimeout(3000)

    // ===== 3. 工作台 =====
    console.log('📸 截图 2/28: 工作台')
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '02-dashboard.png') })

    // ===== 4. 教学中心 =====
    console.log('📸 截图 3/28: 教学中心')
    await waitForApp(page, `${BASE_URL}/#/tutorial`)
    // 处理"进入教学"弹窗
    const dialogBtn = page.locator('.el-dialog button:has-text("进入教学"), .el-button--primary:has-text("进入教学")')
    if (await dialogBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await dialogBtn.click()
      await page.waitForTimeout(2000)
    }
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '03-tutorial.png') })

    // ===== 5-28: 其余页面 =====
    for (let i = 4; i < SCREENSHOT_CONFIG.length; i++) {
      const cfg = SCREENSHOT_CONFIG[i]
      console.log(`📸 截图 ${i}/28: ${cfg.description} (${cfg.name})`)
      try {
        await waitForApp(page, `${BASE_URL}${cfg.route}`)
        await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `${cfg.name}.png`) })
        console.log(`  ✅`)
      } catch (err) {
        console.error(`  ❌ ${err.message}`)
        await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `${cfg.name}-error.png`) }).catch(() => {})
      }
    }

    // ===== 额外：凭证展示的发票预览 =====
    // 在凭证查询页找到一个凭证点进去看详情
    console.log('📸 额外: 凭证详情')
    try {
      const firstView = page.locator('.el-table__row .el-button:has-text("查看"), .el-table__row .el-button:has-text("详情")').first()
      if (await firstView.isVisible({ timeout: 2000 }).catch(() => false)) {
        await firstView.click()
        await page.waitForTimeout(1500)
        await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '28-voucher-detail.png') })
      }
    } catch (_) {}

    console.log('\n✅ 所有截图完成! 共 ' + SCREENSHOT_CONFIG.length + ' 张')
  } catch (err) {
    console.error('❌ 截图失败:', err.message)
  } finally {
    if (browser) await browser.close()
    server.kill()
    console.log('🔌 服务器已关闭')
  }
}

takeScreenshots()
