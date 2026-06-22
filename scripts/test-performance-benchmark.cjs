/**
 * 性能基准测试
 *
 * 测量：页面加载时间、localStorage 读写速度、教学数据加载
 *
 * 用法: BASE_URL=http://localhost:3000 node scripts/test-performance-benchmark.cjs
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

let passed = 0, total = 0
function assert(cond, msg) { total++; if (cond) { passed++; console.log('  ✅ ' + msg) } else { console.log('  ⚠️  ' + msg) } }

async function main() {
  console.log('╔══════════════════════════════════════╗')
  console.log('║   ⚡ 性能基准测试                     ║')
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
    // ═══ 测试1：Dashboard 加载时间 ═══
    console.log('📁 测试1：页面加载性能')
    const t1 = Date.now()
    await page.goto(BASE_URL + '/#/dashboard', { waitUntil: 'networkidle', timeout: 30000 })
    await page.waitForTimeout(2000)
    const dashLoad = Date.now() - t1
    assert(dashLoad < 10000, 'Dashboard 加载 < 10s: ' + (dashLoad / 1000).toFixed(1) + 's')

    // ═══ 测试2：localStorage 性能（浏览器环境） ═══
    console.log('\n📁 测试2：localStorage 性能')
    const storagePerf = await page.evaluate(() => {
      const results = {}
      // 写入
      const w1 = Date.now()
      for (let i = 0; i < 100; i++) localStorage.setItem('bench_test_' + i, 'x'.repeat(1000))
      results.writeTime = Date.now() - w1

      // 读取
      const r1 = Date.now()
      let total = 0
      for (let i = 0; i < 100; i++) total += localStorage.getItem('bench_test_' + i).length
      results.readTime = Date.now() - r1
      results.totalBytes = total

      // 清理
      for (let i = 0; i < 100; i++) localStorage.removeItem('bench_test_' + i)
      return results
    })
    assert(storagePerf.writeTime < 500, '100次写入 < 500ms: ' + storagePerf.writeTime + 'ms')
    assert(storagePerf.readTime < 200, '100次读取 < 200ms: ' + storagePerf.readTime + 'ms')
    assert(storagePerf.totalBytes === 100000, '数据完整性: ' + storagePerf.totalBytes + ' 字节')

    // ═══ 测试3：场景数据大小 ═══
    console.log('\n📁 测试3：数据大小评估')
    const storageSize = await page.evaluate(() => {
      let total = 0
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key) {
          const val = localStorage.getItem(key)
          total += key.length * 2 + (val ? val.length * 2 : 0)
        }
      }
      return total
    })
    const storageMB = (storageSize / (1024 * 1024)).toFixed(2)
    assert(parseFloat(storageMB) < 10, 'localStorage 总用量 < 10MB: ' + storageMB + 'MB')

    // ═══ 测试4：路径切换性能 ═══
    console.log('\n📁 测试4：路由切换性能')
    const pages = ['/#/dashboard', '/#/accounting/subjects', '/#/reports/balance-sheet',
                   '/#/tutorial/center', '/#/cases/library']
    let totalNavTime = 0
    for (const p of pages) {
      const t1 = Date.now()
      await page.goto(BASE_URL + p, { waitUntil: 'networkidle', timeout: 15000 })
      await page.waitForTimeout(1000)
      totalNavTime += Date.now() - t1
    }
    const avgNav = totalNavTime / pages.length
    assert(avgNav < 5000, '页面切换平均 < 5s: ' + (avgNav / 1000).toFixed(1) + 's')

    console.log('\n' + '═'.repeat(50))
    console.log('📊 基准测试: ' + passed + '/' + total + ' 通过')
    console.log('  Dashboard 加载: ' + (dashLoad / 1000).toFixed(1) + 's')
    console.log('  localStorage: ' + storageMB + 'MB')
    console.log('  页面切换平均: ' + (avgNav / 1000).toFixed(1) + 's')

  } catch (err) {
    console.error('\n❌ 测试异常: ' + err.message)
  } finally {
    await browser.close()
  }
}

main()
