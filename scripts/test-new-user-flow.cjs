/**
 * 新用户完整流程走查（v0.8.3）
 *
 * 模拟全新用户从0开始的完整体验：
 *   打开App → 登录 → 新手引导(4步) → 激活码输入 → Dashboard首页
 *
 * 用法: BASE_URL=http://localhost:3000 node scripts/test-new-user-flow.cjs
 */

const { chromium } = require('playwright')
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

// ─── 使用已上传但未绑定的激活码 ───
const TEST_CODE = 'B32B-8A07-A5EC-009C'

let passed = 0, failed = 0, total = 0
function assert(condition, msg) {
  total++
  if (condition) { passed++; console.log(`  ✅ ${msg}`) }
  else { failed++; console.log(`  ❌ ${msg}`) }
}

async function main() {
  console.log('╔══════════════════════════════════════════╗')
  console.log('║   👤 新用户完整流程走查                  ║')
  console.log('╚══════════════════════════════════════════╝')
  console.log(`服务器: ${BASE_URL}`)
  console.log(`测试激活码: ${TEST_CODE}\n`)

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    locale: 'zh-CN',
  })
  const page = await context.newPage()

  // 收集控制台错误
  const consoleErrors = []
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text())
  })
  page.on('pageerror', err => consoleErrors.push(err.message))

  try {
    // ═══════════════════════════════════════════════
    // 第一步：打开App → 登录
    // ═══════════════════════════════════════════════
    console.log('📁 第一步：打开App → 登录')

    // 清空所有本地状态（模拟全新用户）
    await page.goto(`${BASE_URL}/#/login`, { waitUntil: 'networkidle', timeout: 30000 })
    await page.evaluate(() => {
      const keys = Object.keys(localStorage)
      for (const k of keys) if (k.startsWith('jd_')) localStorage.removeItem(k)
    })
    await page.waitForTimeout(500)

    // 确认登录页面显示
    await page.waitForSelector('input[placeholder="用户名"]', { timeout: 5000 })
    await page.waitForSelector('input[placeholder="密码"]', { timeout: 5000 })
    assert(true, '登录页正常显示（用户名/密码输入框）')

    // 填写登录信息
    await page.fill('input[placeholder="用户名"]', 'admin')
    await page.fill('input[placeholder="密码"]', 'admin123')

    const loginBtn = page.locator('button').filter({ hasText: '登 录' })
    await loginBtn.waitFor({ state: 'visible', timeout: 3000 })
    await loginBtn.click()
    await page.waitForTimeout(1500)

    // 验证已离开登录页（应被重定向到引导页）
    const currentUrl = page.url()
    assert(currentUrl.includes('onboarding'), `登录后跳转到引导页: ${currentUrl.includes('onboarding') ? '✓' : '✗'}`)

    // ═══════════════════════════════════════════════
    // 第二步：新手引导（4步）
    // ═══════════════════════════════════════════════
    console.log('\n📁 第二步：新手引导（4步）')

    // 步骤0：欢迎页
    await page.waitForSelector('.welcome-title', { timeout: 5000 })
    const welcomeText = await page.locator('.welcome-title').textContent()
    assert(welcomeText.includes('欢迎使用'), '欢迎页显示: "' + (welcomeText || '') + '"')

    // 点击"开始设置"
    await page.locator('.primary-btn').filter({ hasText: '开始设置' }).click()
    await page.waitForTimeout(500)
    assert(true, '步骤0→1：点击"开始设置"')

    // 步骤1：选择行业
    await page.waitForSelector('.industry-step', { timeout: 3000 })
    // 默认制造业应该被选中
    const industryCards = page.locator('.industry-card')
    const cardCount = await industryCards.count()
    assert(cardCount === 4, `行业卡片数量: ${cardCount}`)

    // 点击"制造业"（第一个卡片）
    await industryCards.first().click()
    await page.waitForTimeout(300)
    // 点击"下一步"
    await page.locator('.primary-btn').filter({ hasText: '下一步' }).click()
    await page.waitForTimeout(500)
    assert(true, '步骤1→2：选择制造业 → 下一步')

    // 步骤2：选择角色
    await page.waitForSelector('.role-step', { timeout: 3000 })
    const roleCards = page.locator('.role-card')
    const roleCount = await roleCards.count()
    assert(roleCount === 2, `角色卡片数量: ${roleCount}（会计 + 出纳）`)

    // 验证出纳已禁用
    const cashierCard = roleCards.nth(1)
    const cashierDisabled = await cashierCard.getAttribute('class')
    assert(cashierDisabled.includes('disabled'), '出纳角色已禁用（标注"暂未推出"）')

    // 选择"会计"
    await roleCards.first().click()
    await page.waitForTimeout(300)
    // 点击"下一步"
    await page.locator('.primary-btn').filter({ hasText: '下一步' }).click()
    await page.waitForTimeout(500)
    assert(true, '步骤2→3：选择会计 → 下一步')

    // 步骤3：准备就绪
    await page.waitForSelector('.overview-step', { timeout: 3000 })
    const readyTitle = await page.locator('.step-title').textContent()
    assert(readyTitle.includes('准备就绪'), '准备页显示: "' + (readyTitle || '') + '"')

    // 点击"开始学习"
    await page.locator('.start-btn').click()
    await page.waitForTimeout(2000)
    assert(true, '步骤3→完成：点击"开始学习"')

    // 验证引导完成状态
    const onboardingDone = await page.evaluate(() =>
      localStorage.getItem('jd_onboarding_complete')
    )
    assert(onboardingDone === 'true', '引导完成标记已写入 localStorage')

    const selectedScenario = await page.evaluate(() =>
      localStorage.getItem('jd_scenario')
    )
    assert(selectedScenario === 'manufacturing', `行业已设为制造业: ${selectedScenario}`)

    const currentRole = await page.evaluate(() =>
      localStorage.getItem('jd_role')
    )
    assert(currentRole === 'accountant', `角色已设为会计: ${currentRole}`)

    // ═══════════════════════════════════════════════
    // 第三步：激活对话框
    // ═══════════════════════════════════════════════
    console.log('\n📁 第三步：激活码输入')

    // 等待激活对话框弹出
    const dialog = page.locator('.activation-card')
    await dialog.waitFor({ state: 'visible', timeout: 10000 })
    assert(await dialog.isVisible(), '激活对话框弹出')

    // 验证对话框内容
    const dialogTitle = await page.locator('.activation-title').textContent()
    assert(dialogTitle.includes('观测者'), '对话框标题正确: "' + (dialogTitle || '') + '"')

    // 输入激活码
    const parts = TEST_CODE.split('-')
    const inputs = page.locator('.activation-card .code-part .el-input__inner')
    for (let i = 0; i < 4; i++) {
      await inputs.nth(i).fill(parts[i])
      await page.waitForTimeout(100)
    }

    // 点击激活
    const activateBtn = page.locator('.activate-btn')
    await activateBtn.click()
    await page.waitForTimeout(3000)

    // 验证成功消息
    const msgEl = page.locator('.activation-msg')
    const msgText = await msgEl.textContent().catch(() => '')
    assert(msgText.includes('激活成功'), '激活成功: "' + (msgText || '') + '"')

    // 等待对话框自动关闭
    await page.waitForTimeout(2000)
    const dialogClosed = await page.locator('.activation-card').isVisible().catch(() => false)
    assert(!dialogClosed, '激活后对话框自动关闭')

    // 验证激活状态
    const activatedCode = await page.evaluate(() =>
      localStorage.getItem('jd_activated')
    )
    assert(activatedCode === TEST_CODE, `localStorage 激活码一致: ${activatedCode === TEST_CODE}`)

    // ═══════════════════════════════════════════════
    // 第四步：Dashboard 首页
    // ═══════════════════════════════════════════════
    console.log('\n📁 第四步：Dashboard 首页')

    await page.waitForTimeout(1000)

    // 验证已到达 dashboard
    const dashUrl = page.url()
    assert(dashUrl.includes('dashboard'), `已在 Dashboard 页: ${dashUrl.includes('dashboard') ? '✓' : '✗'}`)

    // 验证首页内容加载
    const pageTitle = page.locator('.page-title')
    const titleText = await pageTitle.textContent().catch(() => '')
    assert(titleText.includes('工作台') || titleText.includes('Dashboard'),
      `首页标题显示: "${titleText || '(取不到)'}"`)

    // 验证侧边栏存在
    const sidebar = page.locator('.main-sidebar')
    assert(await sidebar.isVisible().catch(() => false), '侧边栏可见')

    // 验证侧边栏有教学中心菜单
    const menuText = await page.locator('.main-sidebar').textContent().catch(() => '')
    assert(menuText.includes('教学中心') || menuText.includes('凭证'),
      '侧边栏内容加载: 包含教学中心或凭证菜单')

    // 验证无控制台错误
    if (consoleErrors.length > 0) {
      console.log(`  ⚠️  控制台 ${consoleErrors.length} 个错误:`)
      consoleErrors.slice(0, 5).forEach(e => console.log(`      ${e.slice(0, 100)}`))
    }
    assert(consoleErrors.length === 0, `控制台无错误（${consoleErrors.length} 个）`)

    // ═══════════════════════════════════════════════
    // 总结
    // ═══════════════════════════════════════════════
    console.log('\n' + '═'.repeat(50))
    console.log(`📊 测试结果: ${passed}/${total} 通过`)
    if (failed > 0) { console.log(`❌ ${failed} 个失败!`) }
    else { console.log('✅ 全部通过！') }

    console.log(`\n⚠️  测试已将 ${TEST_CODE} 绑定到当前浏览器指纹。`)
    console.log('   如需清理: node scripts/key-manager.cjs revoke dugujunol123. ' + TEST_CODE)

  } catch (err) {
    console.error(`\n❌ 测试异常: ${err.message}`)
    await page.screenshot({ path: `test-reports/screenshots/NEW_USER_FLOW_FAIL.png` }).catch(() => {})
  } finally {
    await browser.close()
  }
}

main()
