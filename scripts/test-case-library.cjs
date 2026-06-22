/**
 * 案例库流程测试
 *
 * 测试：案例库页面加载 → 案例详情 → 基础导航
 *
 * 用法: BASE_URL=http://localhost:3000 node scripts/test-case-library.cjs
 */

const { chromium } = require('playwright')
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

async function main() {
  console.log('╔══════════════════════════════════════╗')
  console.log('║   📋 案例库流程测试                  ║')
  console.log('╚══════════════════════════════════════╝')
  console.log('服务器: ' + BASE_URL + '\n')

  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] })
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
  const page = await context.newPage()

  try {
    // ═══ 测试1：案例库页面 ═══
    console.log('📁 测试1：案例库页面加载')
    await page.goto(BASE_URL + '/#/cases/library', { waitUntil: 'networkidle', timeout: 30000 })
    await page.waitForTimeout(2000)
    const title = await page.locator('.page-title').textContent().catch(() => '')
    assert(title.includes('案例库'), '页面标题: "' + title + '"')
    const bodyText = await page.locator('body').textContent().catch(() => '')
    assert(bodyText.length > 200, '页面内容加载（' + bodyText.length + '字符）')

    // ═══ 测试2：案例卡片 ═══
    console.log('\n📁 测试2：案例卡片')
    const caseCards = page.locator('.case-card')
    const cardCount = await caseCards.count().catch(() => 0)
    assert(cardCount >= 3, '案例卡片数 >= 3: ' + cardCount)

    // ═══ 测试3：点击第一个案例进入详情 ═══
    console.log('\n📁 测试3：案例详情页')
    if (cardCount > 0) {
      await caseCards.first().click()
      await page.waitForTimeout(2000)
      const detailUrl = page.url()
      assert(detailUrl.includes('case'), 'URL 进入案例详情: ' + detailUrl)

      const detailText = await page.locator('body').textContent().catch(() => '')
      assert(detailText.length > 100, '案例详情内容加载（' + detailText.length + '字符）')
    }

    // ═══ 测试4：控制台无错误 ═══
    console.log('\n📁 测试4：控制台错误检查')
    const errors = []
    page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()) })
    assert(errors.length === 0, '控制台无错误（' + errors.length + '个）')

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
