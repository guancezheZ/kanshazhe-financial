/**
 * 正确完成引导流程，验证各状态
 */
const { chromium } = require('playwright')
const path = require('path')
const BASE_URL = process.env.BASE_URL || 'http://localhost:3001'

async function main() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    locale: 'zh-CN',
  })
  const page = await context.newPage()

  try {
    // ─── 清空状态，首次登录 ───
    console.log('1️⃣  首次登录 → 新手引导')
    await page.goto(`${BASE_URL}/#/login`, { waitUntil: 'domcontentloaded', timeout: 15000 })
    await page.waitForTimeout(500)
    await page.evaluate(() => {
      localStorage.clear()
      localStorage.setItem('jd_theme', 'light')
    })

    await page.fill('input[placeholder="用户名"]', 'admin')
    await page.fill('input[placeholder="密码"]', 'admin123')
    await page.click('button:has-text("登 录")')
    await page.waitForTimeout(3000)
    console.log(`  URL: ${page.url()}`)

    // ─── 走完4步引导 ───
    // Step 1: 欢迎 → "开始设置 →"
    let btn = page.locator('button:has-text("开始设置")')
    if (await btn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await btn.click()
      await page.waitForTimeout(1500)
      console.log('  ✅ Step 1: 欢迎 → 开始设置')
    }

    // Step 2: 选择行业 → "下一步 →"
    btn = page.locator('button:has-text("下一步")')
    if (await btn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await btn.click()
      await page.waitForTimeout(1500)
      console.log('  ✅ Step 2: 选择行业 → 下一步')
    }

    // Step 3: 选择角色 → "下一步 →"
    btn = page.locator('button:has-text("下一步")')
    if (await btn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await btn.click()
      await page.waitForTimeout(1500)
      console.log('  ✅ Step 3: 选择角色 → 下一步')
    }

    // Step 4: 准备就绪 → "🚀 开始学习"
    btn = page.locator('button:has-text("开始学习")')
    if (await btn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await btn.click()
      await page.waitForTimeout(3000)
      console.log(`  ✅ Step 4: 准备就绪 → 开始学习`)
      console.log(`  跳转后 URL: ${page.url()}`)
    } else {
      console.log('  ⚠️ "开始学习"按钮不可见')
      // 打印可见按钮
      const btns = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('button')).map(b => b.textContent.trim()).filter(Boolean)
      })
      console.log(`  可见按钮: ${btns.join(', ')}`)
    }

    // ─── 引导完成后，检查状态 ───
    const completionFlag = await page.evaluate(() => localStorage.getItem('jd_onboarding_complete'))
    console.log(`\n  jd_onboarding_complete: ${completionFlag}`)
    console.log(`  当前角色: ${await page.evaluate(() => localStorage.getItem('jd_role'))}`)
    console.log(`  当前场景: ${await page.evaluate(() => localStorage.getItem('jd_scenario'))}`)

    // ─── 导航到教学中心，确认"准备就绪"不再出现 ───
    console.log('\n2️⃣  再次进入教学中心——确认弹窗不再出现')
    await page.goto(`${BASE_URL}/#/tutorial`, { waitUntil: 'domcontentloaded', timeout: 15000 })
    await page.waitForTimeout(3000)

    const hasReadyDialog = await page.isVisible('text=准备就绪').catch(() => false)
    console.log(`  "准备就绪"弹窗: ${hasReadyDialog ? '❌ 仍然出现' : '✅ 未出现'}`)

    // ─── 回到仪表盘 ───
    console.log('\n3️⃣  仪表盘确认')
    await page.goto(`${BASE_URL}/#/dashboard`, { waitUntil: 'domcontentloaded', timeout: 15000 })
    await page.waitForTimeout(2000)
    console.log(`  URL: ${page.url()}`)

    // ─── 设置教学任务 ───
    console.log('\n4️⃣  引导模式教学任务')
    await page.evaluate(() => {
      localStorage.setItem('tutorial_task', JSON.stringify({
        title: '1月1日 收到投资款',
        date: '2026-01-01',
        month: '01',
        scenarioId: 'manufacturing',
        mode: 'guided',
        description: '1月1日，收到张三投资款300,000元，存入银行。',
        entries: [
          { summary: '收到投资款', subjectCode: '100201', debit: 300000, credit: 0 },
          { summary: '收到投资款', subjectCode: '4001', debit: 0, credit: 300000 },
        ]
      }))
    })

    await page.goto(`${BASE_URL}/#/accounting/voucher/entry`, { waitUntil: 'domcontentloaded', timeout: 15000 })
    await page.waitForTimeout(3000)

    // 检查是否有分步引导弹窗
    const hasGuideDialog = await page.isVisible('[class*="guide"], [class*="step"], [class*="dialog"]').catch(() => false)
    const pageText = await page.evaluate(() => document.body.textContent.substring(0, 500))
    console.log(`  页面内容: ${pageText.replace(/\n+/g, ' | ').substring(0, 300)}`)

    // ─── 自由模式 ───
    console.log('\n5️⃣  自由模式')
    await page.evaluate(() => {
      localStorage.setItem('jd_practice_mode', 'true')
    })
    // 设置一个练习任务
    await page.evaluate(() => {
      localStorage.setItem('tutorial_task', JSON.stringify({
        title: '1月2日 购买办公用品',
        date: '2026-01-02',
        month: '01',
        scenarioId: 'manufacturing',
        mode: 'practice',
        description: '用现金购买办公用品500元。',
        entries: [
          { summary: '购买办公用品', subjectCode: '660201', debit: 500, credit: 0 },
          { summary: '购买办公用品', subjectCode: '1001', debit: 0, credit: 500 },
        ]
      }))
    })
    await page.goto(`${BASE_URL}/#/accounting/voucher/entry`, { waitUntil: 'domcontentloaded', timeout: 15000 })
    await page.waitForTimeout(2000)
    const practiceText = await page.evaluate(() => document.body.textContent.substring(0, 500))
    console.log(`  自由模式页面: ${practiceText.replace(/\n+/g, ' | ').substring(0, 200)}`)

    // ─── 出纳角色 ───
    console.log('\n6️⃣  出纳角色凭证录入标题')
    await page.evaluate(() => {
      localStorage.removeItem('jd_practice_mode')
      localStorage.removeItem('tutorial_task')
      localStorage.setItem('jd_role', 'cashier')
    })
    await page.goto(`${BASE_URL}/#/accounting/voucher/entry`, { waitUntil: 'domcontentloaded', timeout: 15000 })
    await page.waitForTimeout(2000)
    const cashierText = await page.evaluate(() => {
      const h2 = document.querySelector('h2')
      const h1 = document.querySelector('h1')
      const title = document.querySelector('.page-title')
      return (h2?.textContent || h1?.textContent || title?.textContent || '').trim()
    })
    console.log(`  页面标题: "${cashierText}"`)

    // ─── 暗色模式 ───
    console.log('\n7️⃣  暗色模式')
    await page.evaluate(() => {
      localStorage.setItem('jd_theme', 'dark')
      localStorage.setItem('jd_role', 'accountant')
      document.documentElement.setAttribute('data-theme', 'dark')
      document.documentElement.classList.add('dark')
    })
    await page.goto(`${BASE_URL}/#/dashboard`, { waitUntil: 'domcontentloaded', timeout: 15000 })
    await page.waitForTimeout(2000)
    const hasDark = await page.evaluate(() => document.documentElement.classList.contains('dark'))
    const dataTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'))
    console.log(`  html.dark: ${hasDark} | data-theme: ${dataTheme}`)

    // ─── 清理 ───
    await page.evaluate(() => {
      localStorage.setItem('jd_theme', 'light')
      document.documentElement.setAttribute('data-theme', 'light')
      document.documentElement.classList.remove('dark')
    })

    console.log('\n' + '='.repeat(50))
    console.log('✅ 引导流程验证完成')
    console.log('='.repeat(50))

  } catch (err) {
    console.error('❌ 异常:', err.message)
  } finally {
    await browser.close()
  }
}

main()
