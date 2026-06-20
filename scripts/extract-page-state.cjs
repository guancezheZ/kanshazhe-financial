/**
 * 提取各确认项的页面文本状态（辅助截图验证）
 */
const { chromium } = require('playwright')
const path = require('path')

const BASE_URL = process.env.BASE_URL || 'http://localhost:3001'

async function getPageText(page) {
  return page.evaluate(() => {
    // 获取可见文本（排除隐藏元素）
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false)
    const texts = []
    let node
    while (node = walker.nextNode()) {
      if (node.parentElement && node.parentElement.offsetParent !== null) {
        const t = node.textContent.trim()
        if (t.length > 2) texts.push(t)
      }
    }
    return texts.join('\n').substring(0, 3000)
  })
}

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
    // ───── 1. 新手引导流程 ─────
    console.log('='.repeat(60))
    console.log('1️⃣  新手引导流程')
    console.log('='.repeat(60))

    // 清空状态
    await page.goto(`${BASE_URL}/#/login`, { waitUntil: 'domcontentloaded', timeout: 15000 })
    await page.waitForTimeout(500)
    await page.evaluate(() => {
      localStorage.clear()
      localStorage.setItem('jd_theme', 'light')
    })

    // 登录
    await page.fill('input[placeholder="用户名"]', 'admin')
    await page.fill('input[placeholder="密码"]', 'admin123')
    await page.click('button:has-text("登 录")')
    await page.waitForTimeout(3000)

    const redirectUrl = page.url()
    console.log(`\n📌 登录后跳转: ${redirectUrl}`)
    console.log(`\n📄 页面文本片段:`)
    const text1 = await getPageText(page)
    console.log(text1.substring(0, 500))
    console.log('...')

    await page.waitForTimeout(1000)

    // 尝试走引导流程
    for (let step = 1; step <= 3; step++) {
      const btns = await page.evaluate(() => {
        const buttons = document.querySelectorAll('button, .el-button, [role="button"]')
        return Array.from(buttons).map(b => ({
          text: b.textContent.trim().substring(0, 30),
          visible: b.offsetParent !== null,
          type: b.tagName,
          class: b.className.substring(0, 40),
        })).filter(b => b.visible && b.text.length > 0).slice(0, 8)
      })
      console.log(`\n  引导第${step}步 - 可见按钮: ${btns.map(b => `"${b.text}"`).join(', ')}`)

      // 找"下一步"/"开始"/"完成"按钮
      const nextBtn = page.locator(
        'button:has-text("下一步"), button:has-text("开始"), button:has-text("完成"), button:has-text("进入"), .el-button--primary'
      ).first()

      if (await nextBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
        const btnText = await nextBtn.textContent()
        console.log(`  点击: "${btnText.trim()}"`)
        await nextBtn.click()
        await page.waitForTimeout(2000)
      } else {
        console.log('  (无更多按钮)')
        break
      }
    }

    await page.waitForTimeout(1000)
    const afterGuideUrl = page.url()
    console.log(`\n📌 引导后跳转: ${afterGuideUrl}`)

    // ───── 2. 引导模式教学任务 ─────
    console.log('\n' + '='.repeat(60))
    console.log('2️⃣  引导模式教学任务')
    console.log('='.repeat(60))

    // 标记已完成引导
    await page.evaluate(() => {
      localStorage.setItem('jd_onboarding_done', 'true')
      localStorage.setItem('jd_selected_scenario', 'manufacturing')
      localStorage.setItem('jd_current_role', 'accountant')
      localStorage.setItem('jd_role', 'accountant')

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

    await page.goto(`${BASE_URL}/#/accounting/voucher/entry`, { waitUntil: 'domcontentloaded', timeout: 15000 })
    await page.waitForTimeout(3000)

    const text2 = await getPageText(page)
    console.log(`\n📄 引导任务页文本:`)
    console.log(text2.substring(0, 800))

    // 检查是否有弹窗挡住
    const dialogs = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.el-dialog, .el-overlay, [class*="guide"], [class*="step"]'))
        .filter(el => el.offsetParent !== null)
        .map(el => ({
          tag: el.tagName,
          class: el.className.substring(0, 60),
          text: el.textContent.trim().substring(0, 100),
        }))
    })
    console.log(`\n📌 可见弹窗/覆盖层: ${dialogs.length > 0 ? dialogs.map(d => `"${d.text.substring(0, 50)}..."`).join(' | ') : '无'}`)

    // ───── 3. 自由模式 ─────
    console.log('\n' + '='.repeat(60))
    console.log('3️⃣  自由模式')
    console.log('='.repeat(60))

    // 设置自由模式
    await page.evaluate(() => {
      localStorage.setItem('jd_practice_mode', 'true')
    })

    await page.goto(`${BASE_URL}/#/tutorial`, { waitUntil: 'domcontentloaded', timeout: 15000 })
    await page.waitForTimeout(2000)
    const text3 = await getPageText(page)
    console.log(`\n📄 自由模式-教学中心文本:`)
    // 检查自由模式相关文本
    const hasPracticeMode = text3.includes('自由练习') || text3.includes('🎯') || text3.includes('practice')
    console.log(`  自由模式标记可见: ${hasPracticeMode ? '✅' : '⚠️'}`)
    console.log(text3.substring(0, 500))

    // ───── 4. 出纳角色标题 ─────
    console.log('\n' + '='.repeat(60))
    console.log('4️⃣  出纳角色标题')
    console.log('='.repeat(60))

    await page.evaluate(() => {
      localStorage.removeItem('jd_practice_mode')
      localStorage.setItem('jd_current_role', 'cashier')
      localStorage.setItem('jd_role', 'cashier')
    })

    await page.goto(`${BASE_URL}/#/accounting/voucher/entry`, { waitUntil: 'domcontentloaded', timeout: 15000 })
    await page.waitForTimeout(3000)

    const text4 = await getPageText(page)
    console.log(`\n📄 出纳-凭证录入页文本:`)
    const hasCashierTitle = text4.includes('出纳') && (text4.includes('付款') || text4.includes('收款') || text4.includes('凭证'))
    console.log(`  出纳标题可见: ${hasCashierTitle ? '✅' : '⚠️'}`)

    // 检查是否有选择角色弹窗
    const roleDialog = await page.isVisible('.el-dialog:has-text("角色"), .el-dialog:has-text("选择"), [class*="role"]').catch(() => false)
    console.log(`  角色选择弹窗: ${roleDialog ? '⚠️ 出现(挡住了页面)' : '✅ 无'}`)

    console.log(text4.substring(0, 600))

    // ───── 5. 暗色模式 + 浮动窗 ─────
    console.log('\n' + '='.repeat(60))
    console.log('5️⃣  暗色模式 + 浮动窗')
    console.log('='.repeat(60))

    // 切回会计 + 暗色
    await page.evaluate(() => {
      localStorage.setItem('jd_current_role', 'accountant')
      localStorage.setItem('jd_role', 'accountant')
      localStorage.setItem('jd_theme', 'dark')
      document.documentElement.setAttribute('data-theme', 'dark')
      document.documentElement.classList.add('dark')
      // 保留teaching_active，让浮动窗出现
    })

    await page.goto(`${BASE_URL}/#/tutorial`, { waitUntil: 'domcontentloaded', timeout: 15000 })
    await page.waitForTimeout(2000)
    const text5 = await getPageText(page)
    console.log(`\n📄 暗色-教学中心:`)
    console.log(text5.substring(0, 500))

    // 检查浮动窗是否存在
    const hasFloater = await page.evaluate(() => {
      const body = document.body.textContent
      return body.includes('浮动') || body.includes('导航') || document.querySelector('[class*="floater"]') !== null ||
        document.querySelector('[class*="Floater"]') !== null
    })
    console.log(`\n  浮动窗存在: ${hasFloater ? '✅' : '⚠️'}`)

    // 检查html.dark class
    const hasDarkClass = await page.evaluate(() => document.documentElement.classList.contains('dark'))
    const dataTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'))
    console.log(`  html.dark: ${hasDarkClass} | data-theme: ${dataTheme}`)

    // ───── 清理 ─────
    await page.evaluate(() => {
      localStorage.setItem('jd_theme', 'light')
      document.documentElement.setAttribute('data-theme', 'light')
      document.documentElement.classList.remove('dark')
      localStorage.removeItem('tutorial_task')
      localStorage.removeItem('teaching_active')
      localStorage.removeItem('jd_practice_mode')
    })

    console.log('\n' + '='.repeat(60))
    console.log('✅ 页面状态提取完成！')
    console.log('='.repeat(60))

  } catch (err) {
    console.error('❌ 异常:', err.message)
  } finally {
    await browser.close()
  }
}

main()
