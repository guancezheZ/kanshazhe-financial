/**
 * 跨浏览器兼容测试
 *
 * 测试：Chromium + Firefox 核心页面加载
 *
 * 用法: node scripts/test-cross-browser.cjs
 */

const { chromium, firefox } = require('playwright')
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

function genCode() {
  const chars = []
  for (let i = 0; i < 12; i++) chars.push((Math.random() * 16 | 0).toString(16).toUpperCase())
  let cs = 0
  for (let i = 0; i < 12; i++) cs ^= parseInt(chars[i], 16)
  chars.push(((cs >> 8) & 0xF).toString(16).toUpperCase())
  chars.push(((cs >> 4) & 0xF).toString(16).toUpperCase())
  chars.push((cs & 0xF).toString(16).toUpperCase())
  chars.push((Math.random() * 16 | 0).toString(16).toUpperCase())
  return chars.slice(0,4).join('') + '-' + chars.slice(4,8).join('') + '-' + chars.slice(8,12).join('') + '-' + chars.slice(12,16).join('')
}

let passed = 0, failed = 0, total = 0
function assert(cond, msg) { total++; if (cond) { passed++; console.log('  ✅ ' + msg) } else { failed++; console.log('  ❌ ' + msg) } }

const PAGES = [
  { path: '/#/dashboard', name: 'Dashboard' },
  { path: '/#/accounting/subjects', name: '科目表' },
  { path: '/#/reports/balance-sheet', name: '资产负债表' },
  { path: '/#/tutorial/center', name: '教学中心' },
  { path: '/#/cases/library', name: '案例库' },
]

async function testBrowser(browserType, browserName) {
  console.log('\n' + '═'.repeat(50))
  console.log('🌐 测试浏览器: ' + browserName)
  console.log('═'.repeat(50))

  const browser = await browserType.launch({ headless: true })
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'zh-CN' })
  const code = genCode()
  await context.addInitScript((c) => {
    localStorage.setItem('jd_activated', c)
    localStorage.setItem('jd_onboarding_complete', 'true')
    localStorage.setItem('jd_role', 'accountant')
    localStorage.setItem('jd_current_role', 'accountant')
    localStorage.setItem('jd_theme', 'ink')
    localStorage.setItem('jd_logged_in', 'true')
    localStorage.setItem('jd_scenario', 'manufacturing')
  }, code)

  for (const p of PAGES) {
    const page = await context.newPage()
    try {
      const t1 = Date.now()
      await page.goto(BASE_URL + p.path, { waitUntil: 'networkidle', timeout: 30000 })
      await page.waitForTimeout(2000)
      const loadTime = Date.now() - t1
      const title = await page.locator('.page-title').first().textContent().catch(() => '')
      const bodyText = await page.locator('body').textContent().catch(() => '')
      const hasContent = bodyText.length > 50
      assert(hasContent, p.name + ' → 加载(' + (loadTime/1000).toFixed(1) + 's) 标题:"' + title.slice(0,20) + '"')
    } catch (err) {
      assert(false, p.name + ' → 失败: ' + err.message.slice(0, 60))
    }
    await page.close()
  }
  await browser.close()
}

async function main() {
  console.log('╔══════════════════════════════════════╗')
  console.log('║   🌐 跨浏览器兼容测试                 ║')
  console.log('╚══════════════════════════════════════╝')
  console.log('服务器: ' + BASE_URL)

  // Chromium
  await testBrowser(chromium, 'Chromium')

  // Firefox
  await testBrowser(firefox, 'Firefox')

  console.log('\n' + '═'.repeat(50))
  console.log('📊 总结果: ' + passed + '/' + total + ' 通过')
  if (failed > 0) console.log('❌ ' + failed + ' 个失败!')
  else console.log('✅ 全部通过！')
}

main()
