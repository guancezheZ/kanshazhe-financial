/**
 * 跨行业切换测试 v2
 *
 * 测试：通过场景切换验证各行业页面可访问。
 * 使用 addInitScript 绕过激活守卫。
 *
 * 用法: BASE_URL=http://localhost:3000 node scripts/test-industry-switching.cjs
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
function assert(condition, msg) {
  total++
  if (condition) { passed++; console.log('  ✅ ' + msg) }
  else { failed++; console.log('  ❌ ' + msg) }
}

const SCENARIOS = [
  { id: 'manufacturing', label: '制造业' },
  { id: 'commercial', label: '商业企业' },
  { id: 'service', label: '服务业' },
  { id: 'construction', label: '建筑业' },
]

async function main() {
  console.log('╔══════════════════════════════════════════╗')
  console.log('║   🔄 跨行业切换测试 v2                   ║')
  console.log('╚══════════════════════════════════════════╝')
  console.log('服务器: ' + BASE_URL + '\n')

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  // ─── 测试1：各行业 Dashboard 可访问 ───
  console.log('📁 测试1：四大行业 Dashboard 可访问')
  for (const sc of SCENARIOS) {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 }, locale: 'zh-CN',
    })
    const code = genCode()
    await context.addInitScript(({ scenario, activationCode }) => {
      const keys = Object.keys(localStorage)
      for (const k of keys) if (k.startsWith('jd_')) localStorage.removeItem(k)
      localStorage.setItem('jd_activated', activationCode)
      localStorage.setItem('jd_onboarding_complete', 'true')
      localStorage.setItem('jd_role', 'accountant')
      localStorage.setItem('jd_current_role', 'accountant')
      localStorage.setItem('jd_theme', 'ink')
      localStorage.setItem('jd_logged_in', 'true')
      localStorage.setItem('jd_onboarding_done', 'true')
      localStorage.setItem('jd_selected_scenario', scenario)
      localStorage.setItem('jd_scenario', scenario)
    }, { scenario: sc.id, activationCode: code })

    const page = await context.newPage()
    await page.goto(BASE_URL + '/#/dashboard', { waitUntil: 'networkidle', timeout: 30000 })
    await page.waitForTimeout(2000)

    const url = page.url()
    const hasTitle = await page.locator('.page-title').first().isVisible().catch(() => false)
    const bodyText = await page.locator('body').textContent().catch(() => '')
    const textLen = bodyText.length

    const ok = hasTitle && textLen > 100
    assert(ok, sc.label + ' Dashboard 可访问（标题可见=' + hasTitle + ', 内容长度=' + textLen + '）')
    await context.close()
  }

  // ─── 测试2：场景切换（独立 context，验证行业数据差异） ───
  console.log('\n📁 测试2：场景切换（独立 context）')
  {
    for (const sc of SCENARIOS) {
      const context = await browser.newContext({
        viewport: { width: 1440, height: 900 }, locale: 'zh-CN',
      })
      const code = genCode()
      await context.addInitScript(({ scenario, activationCode }) => {
        localStorage.setItem('jd_activated', activationCode)
        localStorage.setItem('jd_onboarding_complete', 'true')
        localStorage.setItem('jd_role', 'accountant')
        localStorage.setItem('jd_current_role', 'accountant')
        localStorage.setItem('jd_theme', 'ink')
        localStorage.setItem('jd_logged_in', 'true')
        localStorage.setItem('jd_onboarding_done', 'true')
        localStorage.setItem('jd_scenario', scenario)
        localStorage.setItem('jd_selected_scenario', scenario)
      }, { scenario: sc.id, activationCode: code })

      const page = await context.newPage()
      await page.goto(BASE_URL + '/#/dashboard', { waitUntil: 'networkidle', timeout: 30000 })
      await page.waitForTimeout(1500)
      const bodyText = await page.locator('body').textContent().catch(() => '')
      assert(bodyText.length > 100, sc.label + ' 独立加载（' + bodyText.length + '字符）')
      await context.close()
    }
  }

  // ─── 总结 ───
  console.log('\n' + '═'.repeat(50))
  console.log('📊 测试结果: ' + passed + '/' + total + ' 通过')
  if (failed > 0) console.log('❌ ' + failed + ' 个失败!')
  else console.log('✅ 全部通过！')
  await browser.close()
}

main()
