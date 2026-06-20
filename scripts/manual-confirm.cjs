/**
 * 手动确认项自动截图脚本
 *
 * 覆盖5项肉眼确认：
 * 1. 新手引导三步流程
 * 2. 引导模式教学任务（自动预填+过账+XP）
 * 3. 自由模式
 * 4. 出纳角色标题
 * 5. 暗色模式浮动窗亮色保持
 */
const { chromium } = require('playwright')
const path = require('path')
const fs = require('fs')

const BASE_URL = process.env.BASE_URL || 'http://localhost:3001'
const CONFIRM_DIR = path.resolve(__dirname, '..', 'test-reports', 'manual-confirm')
const VIEWPORT = { width: 1440, height: 900 }

async function screenshot(page, name) {
  await page.screenshot({ path: path.join(CONFIRM_DIR, `${name}.png`), fullPage: true })
  console.log(`  📸 ${name}.png`)
}

async function waitAndSS(page, url, name, timeout = 15000) {
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout })
    await page.waitForTimeout(2000)
  } catch (e) {
    console.log(`  ⚠️ 页面加载: ${url} (${e.message})`)
  }
  await screenshot(page, name)
}

async function main() {
  console.log('='.repeat(60))
  console.log('🔍 手动确认项自动截图')
  console.log('='.repeat(60))

  if (fs.existsSync(CONFIRM_DIR)) {
    fs.rmSync(CONFIRM_DIR, { recursive: true })
  }
  fs.mkdirSync(CONFIRM_DIR, { recursive: true })

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const context = await browser.newContext({
    viewport: VIEWPORT,
    locale: 'zh-CN',
  })
  const page = await context.newPage()

  // 收集错误
  const errors = []
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()) })
  page.on('pageerror', err => errors.push(err.message))

  try {
    // ─────────────────────────────────────────────
    // 1. 新手引导三步流程
    // ─────────────────────────────────────────────
    console.log('\n📁 1. 新手引导流程')

    // 清除所有状态，模拟首次登录
    await page.goto(`${BASE_URL}/#/login`, { waitUntil: 'domcontentloaded', timeout: 15000 })
    await page.waitForTimeout(1000)
    await page.evaluate(() => {
      localStorage.clear()
      localStorage.setItem('jd_theme', 'light')
    })

    // 登录（无onboarding_done标记 → 应触发引导）
    await page.fill('input[placeholder="用户名"]', 'admin')
    await page.fill('input[placeholder="密码"]', 'admin123')
    await page.click('button:has-text("登 录")')
    await page.waitForTimeout(3000)
    await screenshot(page, '01-after-login-redirect')

    // 检查是否跳转到引导页
    const url = page.url()
    if (url.includes('onboarding') || url.includes('welcome')) {
      console.log('  ✅ 登录后正确跳转到新手引导页')
      await screenshot(page, '02-onboarding-page')

      // 尝试找到并点击引导按钮（"开始"或"下一步"）
      const startBtn = page.locator('button:has-text("开始"), button:has-text("下一步"), button:has-text("进入"), .el-button--primary').first()
      if (await startBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
        await startBtn.click()
        await page.waitForTimeout(2000)
        await screenshot(page, '03-onboarding-step-2')

        // 再点下一步
        const nextBtn = page.locator('button:has-text("下一步"), button:has-text("开始学习"), button:has-text("完成")').first()
        if (await nextBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
          await nextBtn.click()
          await page.waitForTimeout(2000)
          await screenshot(page, '04-onboarding-step-3')
        }
      }
    } else {
      // 可能直接进入了主页面（保留了一些状态）
      console.log('  ⚠️ 未跳转到引导页')
    }

    // ─────────────────────────────────────────────
    // 2. 引导模式教学任务
    // ─────────────────────────────────────────────
    console.log('\n📁 2. 引导模式教学任务')

    // 确保完成引导标记、设置教学状态
    await page.evaluate(() => {
      localStorage.setItem('jd_onboarding_done', 'true')
      localStorage.setItem('jd_selected_scenario', 'manufacturing')
      localStorage.setItem('jd_current_role', 'accountant')
      localStorage.setItem('jd_role', 'accountant')

      // 模拟进入教学：设置第一个引导任务
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
      localStorage.setItem('teaching_active', 'true')
    })

    // 访问凭证录入页（应自动加载引导任务）
    await waitAndSS(page, `${BASE_URL}/#/accounting/voucher/entry`, '05-guided-task-entry')

    // 检查是否自动预填了答案
    const hasPreFilled = await page.evaluate(() => {
      const body = document.body.textContent
      return body.includes('300,000') || body.includes('300000') || body.includes('投资款')
    })
    if (hasPreFilled) {
      console.log('  ✅ 引导任务已自动预填答案')
    } else {
      console.log('  ⚠️ 引导任务未预填（可能是分步引导弹窗挡住了）')
    }

    // ─────────────────────────────────────────────
    // 3. 自由模式
    // ─────────────────────────────────────────────
    console.log('\n📁 3. 自由模式')

    await page.evaluate(() => {
      // 设置教学任务但不设 practice_mode
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
      localStorage.setItem('teaching_active', 'true')
    })

    // 先看普通练习模式
    await waitAndSS(page, `${BASE_URL}/#/accounting/voucher/entry`, '06-practice-task-entry')

    // 然后切换到自由模式
    await page.evaluate(() => {
      localStorage.setItem('jd_practice_mode', 'true')
    })
    await waitAndSS(page, `${BASE_URL}/#/tutorial`, '07-practice-mode-tutorial')

    // 检查自由模式标记
    const isPracticeMode = await page.evaluate(() => localStorage.getItem('jd_practice_mode'))
    console.log(`  ${isPracticeMode === 'true' ? '✅' : '⚠️'} 自由模式: ${isPracticeMode}`)

    // 回到凭证录入
    await waitAndSS(page, `${BASE_URL}/#/accounting/voucher/entry`, '08-practice-mode-entry')

    // ─────────────────────────────────────────────
    // 4. 出纳角色
    // ─────────────────────────────────────────────
    console.log('\n📁 4. 出纳角色')

    // 切到出纳
    await page.evaluate(() => {
      localStorage.removeItem('jd_practice_mode')
      localStorage.setItem('jd_current_role', 'cashier')
      localStorage.setItem('jd_role', 'cashier')
    })

    await waitAndSS(page, `${BASE_URL}/#/accounting/voucher/entry`, '09-cashier-entry-title')

    // 检查标题
    const titleText = await page.evaluate(() => {
      const h2 = document.querySelector('h2')
      const h1 = document.querySelector('h1')
      const titleEl = document.querySelector('.page-title')
      return (h2?.textContent || h1?.textContent || titleEl?.textContent || '').trim()
    })
    console.log(`  ${titleText.includes('出纳') || titleText.includes('付款') ? '✅' : '⚠️'} 标题: "${titleText}"`)

    // 出纳看到凭证查询
    await waitAndSS(page, `${BASE_URL}/#/accounting/voucher/query`, '10-cashier-query')

    // ─────────────────────────────────────────────
    // 5. 暗色模式 + 浮动窗亮色保持
    // ─────────────────────────────────────────────
    console.log('\n📁 5. 暗色模式 + 浮动窗亮色保持')

    // 先设置教学任务以便浮动窗出现
    await page.evaluate(() => {
      localStorage.setItem('jd_current_role', 'accountant')
      localStorage.setItem('jd_role', 'accountant')
      localStorage.setItem('tutorial_task', JSON.stringify({
        title: '1月3日 短期借款',
        date: '2026-01-03',
        month: '01',
        scenarioId: 'manufacturing',
      }))
      localStorage.setItem('teaching_active', 'true')
      // 切到暗色
      localStorage.setItem('jd_theme', 'dark')
      document.documentElement.setAttribute('data-theme', 'dark')
      document.documentElement.classList.add('dark')
    })

    await waitAndSS(page, `${BASE_URL}/#/tutorial`, '11-dark-tutorial-center')

    // 凭证录入（浮动窗在暗色模式下的亮色）
    await waitAndSS(page, `${BASE_URL}/#/accounting/voucher/entry`, '12-dark-voucher-entry-with-floater')

    // 恢复亮色
    await page.evaluate(() => {
      localStorage.setItem('jd_theme', 'light')
      document.documentElement.setAttribute('data-theme', 'light')
      document.documentElement.classList.remove('dark')
      localStorage.removeItem('tutorial_task')
      localStorage.removeItem('teaching_active')
      localStorage.removeItem('jd_practice_mode')
    })

    // ─────────────────────────────────────────────
    // 报告
    // ─────────────────────────────────────────────
    console.log('\n' + '='.repeat(60))
    console.log('✅ 截图完成！')
    console.log(`截图保存路径: ${CONFIRM_DIR}`)
    console.log(`共 ${fs.readdirSync(CONFIRM_DIR).length} 张截图`)

    if (errors.length > 0) {
      const realErrors = errors.filter(e => !e.includes('favicon') && !e.includes('ResizeObserver'))
      if (realErrors.length > 0) {
        console.log(`\n⚠️ 控制台错误 (${realErrors.length}):`)
        realErrors.forEach(e => console.log(`  ${e.slice(0, 150)}`))
      } else {
        console.log('\n✅ 无实质性控制台错误')
      }
    } else {
      console.log('\n✅ 无控制台错误')
    }

    console.log('\n📋 请查看以下截图：')
    const files = fs.readdirSync(CONFIRM_DIR).sort()
    files.forEach(f => console.log(`   ${f}`))

  } catch (err) {
    console.error('❌ 异常:', err.message)
  } finally {
    await browser.close()
  }
}

main()
