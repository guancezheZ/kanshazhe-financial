/**
 * GIF录制 + 特写截图脚本 v2
 * Playwright 逐帧截图 → ffmpeg 合成 GIF
 *
 * 用法：node scripts/capture-gifs.cjs
 */
const { chromium } = require('playwright')
const { spawn, execSync } = require('child_process')
const path = require('path')
const fs = require('fs')

const SCREENSHOTS_DIR = path.resolve(__dirname, '..', 'docs', 'screenshots')
const GIFS_DIR = path.resolve(__dirname, '..', 'docs', 'gifs')
const FFMPEG = require('@ffmpeg-installer/ffmpeg').path
const VIEWPORT = { width: 1440, height: 900 }

fs.mkdirSync(GIFS_DIR, { recursive: true })

function startServer() {
  return new Promise((resolve, reject) => {
    const s = spawn('npm.cmd', ['run', 'dev'], {
      cwd: path.resolve(__dirname, '..'), stdio: ['ignore', 'pipe', 'pipe'], shell: true
    })
    const timeout = setTimeout(() => { s.kill(); reject(new Error('timeout')) }, 60000)
    const handler = d => {
      const txt = d.toString().replace(/\x1B\[[0-9;]*[a-zA-Z]/g, '')
      const m = txt.match(/http:\/\/localhost:(\d+)/)
      if (m) { clearTimeout(timeout); setTimeout(() => resolve({ server: s, port: parseInt(m[1]) }), 2000) }
    }
    s.stdout.on('data', handler); s.stderr.on('data', handler)
    s.on('exit', c => { clearTimeout(timeout); reject(new Error(`exit ${c}`)) })
  })
}

async function createGif(frameDir, outputName) {
  const frames = fs.readdirSync(frameDir).filter(f => f.endsWith('.png')).sort()
  if (frames.length < 2) { console.log(`  ⚠️ 帧数不足，跳过`); return }

  // 重命名为严格顺序 frame-01.png, frame-02.png ...
  frames.forEach((f, i) => {
    const newName = `f-${String(i+1).padStart(2, '0')}.png`
    if (f !== newName) fs.renameSync(path.join(frameDir, f), path.join(frameDir, newName))
  })

  const outputPath = path.join(GIFS_DIR, `${outputName}.gif`)
  // 使用 glob 模式 (该 ffmpeg 版本支持)
  const cmd = `"${FFMPEG}" -y -framerate 1 -pattern_type glob -i "${frameDir.replace(/\\/g, '/')}/f-*.png" -vf "scale=800:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" -loop 0 "${outputPath}"`
  try {
    execSync(cmd, { stdio: ['ignore', 'pipe', 'pipe'], timeout: 30000 })
    const size = fs.statSync(outputPath).size
    console.log(`  ✅ ${outputName}.gif (${(size/1024).toFixed(0)}KB)`)
  } catch (e) {
    console.error(`  ❌ GIF失败尝试其他方式: ${e.message}`)
    // 降级: 用 image2 逐个拼接
    try {
      execSync(`"${FFMPEG}" -y -framerate 1 -i "${frameDir.replace(/\\/g, '/')}/f-%02d.png" -vf "scale=800:-1" -loop 0 "${outputPath}"`,
        { stdio: ['ignore', 'pipe', 'pipe'], timeout: 30000 })
      console.log(`  ✅ ${outputName}.gif (降级)`)
    } catch (e2) {
      console.error(`  ❌ 最终失败: ${e2.message}`)
    }
  }
}

async function capture() {
  console.log('🚀 启动服务器...')
  const { server, port } = await startServer()
  const BASE = `http://localhost:${port}`

  let browser
  try {
    browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] })
    const ctx = await browser.newContext({ viewport: VIEWPORT, locale: 'zh-CN' })
    const page = await ctx.newPage()

    // 登录
    await page.goto(`${BASE}/#/login`, { waitUntil: 'networkidle' })
    await page.fill('input[placeholder="用户名"]', 'admin')
    await page.fill('input[placeholder="密码"]', 'admin123')
    await page.click('button:has-text("登 录")')
    await page.waitForTimeout(3000)

    // 进入教学中心初始化
    await page.goto(`${BASE}/#/tutorial`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(2000)
    const initBtn = page.locator('.el-dialog .el-button--primary:has-text("进入教学"), .el-button:has-text("进入教学")')
    if (await initBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await initBtn.click()
      await page.waitForTimeout(2000)
    }

    // ===== GIF 1: 教学浮动窗导航 =====
    console.log('\n🎬 GIF 1: 教学浮动窗导航')
    const gif1Dir = path.join(GIFS_DIR, '_frames_01-floater')
    fs.mkdirSync(gif1Dir, { recursive: true })

    await page.screenshot({ path: path.join(gif1Dir, 'frame-01.png') })

    // 点击第一个"开始做"按钮 - 用 force=true 避免浮动窗遮挡
    const firstBtn = page.locator('.el-table__body .el-button--primary:has-text("开始做")').first()
    await firstBtn.click({ force: true, timeout: 5000 })
    await page.waitForTimeout(2000)
    await page.screenshot({ path: path.join(gif1Dir, 'frame-02.png') })

    // 浮动窗出现后截图
    await page.waitForSelector('.tutorial-floater', { timeout: 3000 }).catch(() => {})
    await page.screenshot({ path: path.join(gif1Dir, 'frame-03.png') })

    // 切换到练习模式
    const practiceBtn = page.locator('.mode-switch .el-radio-button:has-text("练习")')
    if (await practiceBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
      await practiceBtn.click()
      await page.waitForTimeout(800)
    }
    await page.screenshot({ path: path.join(gif1Dir, 'frame-04.png') })

    // 点击下一个任务
    const nextBtn = page.locator('.floater-actions .el-button:has-text("▶")')
    if (await nextBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
      await nextBtn.click({ force: true })
      await page.waitForTimeout(800)
    }
    await page.screenshot({ path: path.join(gif1Dir, 'frame-05.png') })

    await createGif(gif1Dir, '01-floater-navigation')

    // ===== GIF 2: 凭证录入流程 =====
    console.log('\n🎬 GIF 2: 凭证录入引导')
    const gif2Dir = path.join(GIFS_DIR, '_frames_02-voucher')
    fs.mkdirSync(gif2Dir, { recursive: true })

    // 回到教学中心
    await page.goto(`${BASE}/#/tutorial`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(1000)
    const firstBtn2 = page.locator('.el-table__body .el-button--primary:has-text("开始做")').first()
    await firstBtn2.click({ force: true, timeout: 5000 })
    await page.waitForTimeout(2000)
    await page.screenshot({ path: path.join(gif2Dir, 'frame-01.png') })

    // 点击去录入
    const goBtn = page.locator('.tutorial-floater .el-button--primary:has-text("去录入")')
    if (await goBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await goBtn.click({ force: true })
      await page.waitForTimeout(3000)
    }
    await page.screenshot({ path: path.join(gif2Dir, 'frame-02.png') })

    // 如果有分步引导弹窗
    const guideDialog = page.locator('.el-dialog:has-text("理解业务"), .el-dialog:has-text("Step")')
    if (await guideDialog.isVisible({ timeout: 2000 }).catch(() => false)) {
      await page.screenshot({ path: path.join(gif2Dir, 'frame-03.png') })
      // 点确认
      const confirmBtn = guideDialog.locator('.el-button--primary')
      if (await confirmBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
        await confirmBtn.click()
        await page.waitForTimeout(1500)
      }
    }
    await page.screenshot({ path: path.join(gif2Dir, 'frame-04.png') })

    await createGif(gif2Dir, '02-voucher-entry')

    // ===== GIF 3: 报表浏览 =====
    console.log('\n🎬 GIF 3: 报表浏览')
    const gif3Dir = path.join(GIFS_DIR, '_frames_03-reports')
    fs.mkdirSync(gif3Dir, { recursive: true })

    const reportPages = [
      { name: '资产负债表', url: '/#/reports/balance-sheet' },
      { name: '利润表', url: '/#/reports/income-statement' },
      { name: '现金流量表', url: '/#/reports/cash-flow' },
      { name: '试算平衡表', url: '/#/accounting/trial-balance' },
    ]
    for (let i = 0; i < reportPages.length; i++) {
      await page.goto(`${BASE}${reportPages[i].url}`, { waitUntil: 'networkidle' })
      await page.waitForTimeout(1500)
      await page.screenshot({ path: path.join(gif3Dir, `frame-${String(i+1).padStart(2, '0')}.png`) })
    }
    await createGif(gif3Dir, '03-report-views')

    // ===== 特写截图 =====
    console.log('\n📸 特写截图')

    // 凭证详情对话框
    await page.goto(`${BASE}/#/accounting/voucher/query`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(1500)
    const viewVoucherBtn = page.locator('.el-table__body .el-button:has-text("查看")').first()
    if (await viewVoucherBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await viewVoucherBtn.click({ force: true })
      await page.waitForTimeout(1500)
    }
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '30-voucher-detail-dialog.png') })
    console.log('  ✅ 30-voucher-detail-dialog.png')

    // 教学中心搜索
    await page.goto(`${BASE}/#/tutorial`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(1500)
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '31-tutorial-center-full.png') })
    console.log('  ✅ 31-tutorial-center-full.png')

    // 成就系统
    await page.goto(`${BASE}/#/tutorial/achievements`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(1500)
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '32-achievements-closeup.png') })
    console.log('  ✅ 32-achievements-closeup.png')

    // 税申报
    await page.goto(`${BASE}/#/reports/tax-filing`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(1500)
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '33-tax-filing-closeup.png') })
    console.log('  ✅ 33-tax-filing-closeup.png')

    console.log('\n✅ 全部完成！')
  } catch (e) {
    console.error('❌ 错误:', e.message)
  } finally {
    if (browser) await browser.close()
    server.kill()
  }
}

capture()
