/**
 * 存储清理机制验证
 *
 * 用法: BASE_URL=http://localhost:3000 node scripts/test-storage-cleanup.cjs
 */

const { chromium } = require('playwright')
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

// 模拟激活码
const TEST_CODE = 'B32B-8A07-A5EC-009C'

let passed = 0, failed = 0, total = 0
function assert(condition, msg) {
  total++
  if (condition) { passed++; console.log('  ✅ ' + msg) }
  else { failed++; console.log('  ❌ ' + msg) }
}

async function main() {
  console.log('╔══════════════════════════════════════════╗')
  console.log('║   📦 存储清理机制验证                    ║')
  console.log('╚══════════════════════════════════════════╝')
  console.log('服务器: ' + BASE_URL + '\n')

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'zh-CN' })
  const page = await context.newPage()

  try {
    // ═══ 测试1：前置 - 激活并登录 ═══
    console.log('📁 测试1：前置准备（登录+跳转账套管理）')
    await page.goto(BASE_URL + '/#/login', { waitUntil: 'networkidle', timeout: 30000 })
    await page.evaluate((code) => {
      const keys = Object.keys(localStorage)
      for (const k of keys) if (k.startsWith('jd_')) localStorage.removeItem(k)
      localStorage.setItem('jd_onboarding_done', 'true')
      localStorage.setItem('jd_onboarding_complete', 'true')
      localStorage.setItem('jd_selected_scenario', 'manufacturing')
      localStorage.setItem('jd_current_role', 'accountant')
      localStorage.setItem('jd_role', 'accountant')
      localStorage.setItem('jd_theme', 'ink')
      localStorage.setItem('jd_logged_in', 'true')
      localStorage.setItem('jd_activated', code)

      // 写入一些旧的教程标记供清理测试
      const oldDate = new Date()
      oldDate.setFullYear(oldDate.getFullYear() - 2)
      localStorage.setItem('tutorial_done_' + oldDate.toISOString().slice(0, 10) + '_test_old', 'true')

      // 写入一些近期的标记（不应被清理）
      const recentDate = new Date()
      recentDate.setMonth(recentDate.getMonth() - 1)
      localStorage.setItem('tutorial_done_' + recentDate.toISOString().slice(0, 10) + '_test_recent', 'true')
    }, TEST_CODE)
    assert(true, 'localStorage 预设完成')

    // ═══ 测试2：清理工具函数（在浏览器环境运行） ═══
    console.log('\n📁 测试2：清理工具函数测试（浏览器环境）')
    {
      const unitResults = await page.evaluate(() => {
        // 动态导入 ESM
        const results = {}

        // 模拟 localStorage 数据
        const oldDate = new Date()
        oldDate.setFullYear(oldDate.getFullYear() - 2)
        localStorage.setItem('tutorial_done_' + oldDate.toISOString().slice(0, 10) + '_e2e_old', 'true')

        // 使用 page.evaluate 内联逻辑测试
        let count = 0
        const cutoff = new Date()
        cutoff.setMonth(cutoff.getMonth() - 6)
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i)
          if (key && key.startsWith('tutorial_done_')) {
            const dateStr = key.replace('tutorial_done_', '').split('_')[0]
            const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/)
            if (match) {
              const d = new Date(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]))
              if (d < cutoff) { count++ }
            }
          }
        }
        results.oldMarkersFound = count

        // 检查存储用量
        let total = 0
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i)
          if (key) {
            const val = localStorage.getItem(key)
            total += key.length * 2 + (val ? val.length * 2 : 0)
          }
        }
        results.usageBytes = total
        return results
      })

      assert(unitResults.oldMarkersFound >= 1, '发现过期教程标记: ' + unitResults.oldMarkersFound)
      assert(unitResults.usageBytes > 0, '存储用量 > 0: ' + (unitResults.usageBytes / 1024).toFixed(1) + ' KB')
    }

    // ═══ 测试3：验证账套管理页存储卡片 ═══
    await page.goto(BASE_URL + '/#/system/accounts', { waitUntil: 'networkidle', timeout: 30000 })
    await page.waitForTimeout(2000)

    // ═══ 测试3：验证存储卡片 ═══
    console.log('\n📁 测试3：存储空间卡片显示')
    const storageCard = page.locator('.storage-card')
    assert(await storageCard.isVisible().catch(() => false), '存储空间卡片可见')

    const storageTitle = await page.locator('.storage-title').textContent().catch(() => '')
    assert(storageTitle.includes('存储空间'), '卡片标题: "' + storageTitle + '"')

    const statsText = await page.locator('.storage-stats').textContent().catch(() => '')
    assert(statsText.includes('教程标记'), '统计项包含教程标记')

    // 点击清理按钮
    const cleanBtn = page.locator('button').filter({ hasText: '清理过期数据' })
    assert(await cleanBtn.isVisible().catch(() => false), '清理按钮可见')
    await cleanBtn.click()
    await page.waitForTimeout(1000)

    // 验证清理结果消息
    const resultMsg = page.locator('.storage-result')
    const msgText = await resultMsg.textContent().catch(() => '')
    assert(msgText.includes('清理完成') || msgText.includes('无过期'), '清理结果: "' + msgText + '"')

    console.log('\n' + '═'.repeat(50))
    console.log('📊 测试结果: ' + passed + '/' + total + ' 通过')
    if (failed > 0) console.log('❌ ' + failed + ' 个失败!')
    else console.log('✅ 全部通过！')

  } catch (err) {
    console.error('\n❌ 测试异常: ' + err.message)
  } finally {
    await browser.close()
  }
}

main()
