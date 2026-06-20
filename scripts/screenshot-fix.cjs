/** 补拍缺失/质量差的截图 */
const { chromium } = require('playwright')
const path = require('path')
const { spawn } = require('child_process')

const SCREENSHOTS_DIR = path.resolve(__dirname, '..', 'docs', 'screenshots')

function startServer() {
  return new Promise((resolve, reject) => {
    const s = spawn('npm.cmd', ['run', 'dev'], { cwd: path.resolve(__dirname, '..'), stdio: ['ignore', 'pipe', 'pipe'], shell: true })
    const timeout = setTimeout(() => { s.kill(); reject(new Error('timeout')) }, 60000)
    s.stdout.on('data', d => {
      const txt = d.toString().replace(/\x1B\[[0-9;]*[a-zA-Z]/g, '')
      const m = txt.match(/http:\/\/localhost:(\d+)/)
      if (m) { clearTimeout(timeout); setTimeout(() => resolve({ server: s, port: parseInt(m[1]) }), 2000) }
    })
    s.stderr.on('data', d => {
      const txt = d.toString().replace(/\x1B\[[0-9;]*[a-zA-Z]/g, '')
      const m = txt.match(/http:\/\/localhost:(\d+)/)
      if (m) { clearTimeout(timeout); setTimeout(() => resolve({ server: s, port: parseInt(m[1]) }), 2000) }
    })
    s.on('exit', c => { clearTimeout(timeout); reject(new Error(`exit ${c}`)) })
  })
}

async function main() {
  console.log('🚀 Starting server...')
  const { server, port } = await startServer()
  const BASE = `http://localhost:${port}`
  let browser
  try {
    browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] })
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, locale: 'zh-CN' })

    // Login
    await page.goto(`${BASE}/#/login`, { waitUntil: 'networkidle' })
    await page.fill('input[placeholder="用户名"]', 'admin')
    await page.fill('input[placeholder="密码"]', 'admin123')
    await page.click('button:has-text("登 录")')
    await page.waitForTimeout(3000)

    // 1. Dashboard - wait for statistics to load
    console.log('📸 Dashboard...')
    await page.waitForTimeout(2000)
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '02-dashboard.png') })
    console.log('  ✅ 02-dashboard.png')

    // 2. Subjects -科目表
    console.log('📸 Subjects...')
    await page.goto(`${BASE}/#/accounting/subjects`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(3000)
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '04-subjects.png') })
    console.log('  ✅ 04-subjects.png')

    // 3. Login page - 重新拍(登录后退出)
    console.log('📸 Login page fresh...')
    await page.goto(`${BASE}/#/login`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(1000)
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '01-login.png') })
    console.log('  ✅ 01-login.png')

    console.log('\n✅ All done!')
  } catch (e) {
    console.error('❌', e.message)
  } finally {
    if (browser) await browser.close()
    server.kill()
  }
}

main()
