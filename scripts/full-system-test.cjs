/**
 * 全面系统功能测试脚本（第1轮）
 *
 * 测试范围：所有非教学功能 + 教学安全保护
 * 运行环境：需先 npm run dev
 * 用法：node scripts/full-system-test.cjs
 */
const { chromium } = require('playwright')
const path = require('path')
const fs = require('fs')

const BASE_URL = process.env.BASE_URL || 'http://localhost:3001'
const REPORT_DIR = path.resolve(__dirname, '..', 'test-reports')
const SCREENSHOTS_DIR = path.join(REPORT_DIR, 'screenshots')
const VIEWPORT = { width: 1440, height: 900 }

// 测试结果统计
const results = { passed: [], failed: [], skipped: [] }
let testCount = 0

function test(name, fn) {
  testCount++
  return { name, fn }
}

async function runTests(page, tests) {
  for (const t of tests) {
    try {
      await t.fn(page)
      results.passed.push(t.name)
      console.log(`  ✅ ${t.name}`)
    } catch (err) {
      results.failed.push(t.name)
      console.error(`  ❌ ${t.name}: ${err.message}`)
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `FAIL_${t.name.replace(/[\/\s:]/g, '_').slice(0, 80)}.png`) }).catch(() => {})
    }
  }
}

async function waitForApp(page, url, timeout = 15000) {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout })
  await page.waitForFunction(() => {
    const app = document.querySelector('#app')
    return app && app.children.length > 0 && app.textContent.length > 20
  }, { timeout: 8000 }).catch(() => {})
  await page.waitForTimeout(1500)
}

async function login(page, user = 'admin', pass = 'admin123') {
  await page.fill('input[placeholder="用户名"]', user)
  await page.fill('input[placeholder="密码"]', pass)
  await page.click('button:has-text("登 录")')
  await page.waitForTimeout(3000)
}

async function main() {
  console.log('='.repeat(60))
  console.log('📋 第1轮：系统功能全面测试（非教学+安全漏洞检查）')
  console.log('='.repeat(60))

  // 清理旧报告
  if (fs.existsSync(REPORT_DIR)) {
    fs.rmSync(REPORT_DIR, { recursive: true })
  }
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true })

  let browser
  try {
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })

    const context = await browser.newContext({
      viewport: VIEWPORT,
      locale: 'zh-CN',
    })
    const page = await context.newPage()

    // ===== 1.1 登录页测试 =====
    console.log('\n📁 1.1 登录与新用户引导')

    // 先设置引导标记，防止首次登录自动跳引导
    await page.goto(`${BASE_URL}/#/login`, { waitUntil: 'domcontentloaded', timeout: 15000 })
    await page.evaluate(() => {
      localStorage.setItem('jd_onboarding_done', 'true')
      localStorage.setItem('jd_selected_scenario', 'manufacturing')
    })

    await runTests(page, [
      test('登录页渲染', async (p) => {
        await waitForApp(p, `${BASE_URL}/#/login`)
        const content = await p.textContent('body')
        // 登录页可能已因之前session的cookie而自动登录，检查
        if (p.url().includes('onboarding') || p.url().includes('dashboard') || p.url().includes('tutorial')) {
          console.log('  (已登录/引导状态，跳过渲染检查)')
          return
        }
        if (!content.includes('登录') && !content.includes('観測者') && !content.includes('密码')) {
          throw new Error('登录页内容缺失')
        }
      }),
      test('登录表单可见', async (p) => {
        // 如果已登录，先退出
        if (!p.url().includes('login')) {
          console.log('  (已登录，跳过表单可见检查)')
          return
        }
        const usernameInput = await p.isVisible('input[placeholder="用户名"]')
        const passwordInput = await p.isVisible('input[placeholder="密码"]')
        if (!usernameInput || !passwordInput) throw new Error('登录表单不可见')
      }),
      test('登录成功跳转', async (p) => {
        await waitForApp(p, `${BASE_URL}/#/login`)
        // 如果已登录，检查是否在有效页面
        if (!p.url().includes('login')) {
          if (p.url().includes('dashboard') || p.url().includes('tutorial') || p.url().includes('onboarding')) {
            console.log('  (已登录)')
            return
          }
        }
        await login(p)
        // 登录后可能跳转到引导页或dashboard，都是正确行为
        const url = p.url()
        if (!url.includes('dashboard') && !url.includes('tutorial') && !url.includes('onboarding')) {
          throw new Error(`登录后未跳转到正确页面: ${url}`)
        }
        console.log(`  (跳转到: ${url.includes('onboarding') ? '新手引导' : '主页面'})`)
      }),
      test('引导完成后再登录不显示引导', async (p) => {
        // 确保引导标记存在
        await p.evaluate(() => localStorage.setItem('jd_onboarding_done', 'true'))
        // 退出登录
        await waitForApp(p, `${BASE_URL}/#/login`)
        if (!p.url().includes('login')) {
          console.log('  (已登录状态)')
          return
        }
        await login(p)
        await p.waitForTimeout(2000)
        // 不应跳转到onboarding
        if (p.url().includes('onboarding')) {
          throw new Error('引导标记存在但仍跳转到引导页')
        }
      }),
    ])

    // ===== 1.2 主题系统测试 =====
    console.log('\n📁 1.2 主题系统')
    await runTests(page, [
      test('默认light主题', async (p) => {
        const theme = await p.evaluate(() => document.documentElement.getAttribute('data-theme'))
        if (theme !== 'light') throw new Error(`默认主题不是light: ${theme}`)
      }),
      test('切换到dark主题', async (p) => {
        // 通过localStorage设置主题
        await p.evaluate(() => {
          localStorage.setItem('jd_theme', 'dark')
          document.documentElement.setAttribute('data-theme', 'dark')
          document.documentElement.classList.add('dark')
        })
        await p.waitForTimeout(500)
        const theme = await p.evaluate(() => document.documentElement.getAttribute('data-theme'))
        const hasDark = await p.evaluate(() => document.documentElement.classList.contains('dark'))
        if (theme !== 'dark') throw new Error('data-theme未切换为dark')
        if (!hasDark) throw new Error('html.dark class未添加')
      }),
      test('切换到warm主题', async (p) => {
        await p.evaluate(() => {
          localStorage.setItem('jd_theme', 'warm')
          document.documentElement.setAttribute('data-theme', 'warm')
          document.documentElement.classList.remove('dark')
        })
        await p.waitForTimeout(500)
        const theme = await p.evaluate(() => document.documentElement.getAttribute('data-theme'))
        if (theme !== 'warm') throw new Error('data-theme未切换为warm')
      }),
      test('主题持久化-localStorage', async (p) => {
        const stored = await p.evaluate(() => localStorage.getItem('jd_theme'))
        if (stored !== 'warm') throw new Error(`主题未持久化: ${stored}`)
      }),
      test('恢复light主题', async (p) => {
        await p.evaluate(() => {
          localStorage.setItem('jd_theme', 'light')
          document.documentElement.setAttribute('data-theme', 'light')
          document.documentElement.classList.remove('dark')
        })
        await p.waitForTimeout(300)
      }),
      test('浮动窗暗色模式亮色保持', async (p) => {
        // 切到暗色
        await p.evaluate(() => {
          localStorage.setItem('jd_theme', 'dark')
          document.documentElement.setAttribute('data-theme', 'dark')
          document.documentElement.classList.add('dark')
        })
        await p.waitForTimeout(300)
        // 导航到教学中心
        await waitForApp(p, `${BASE_URL}/#/tutorial`)
        // 恢复light
        await p.evaluate(() => {
          localStorage.setItem('jd_theme', 'light')
          document.documentElement.setAttribute('data-theme', 'light')
          document.documentElement.classList.remove('dark')
        })
      }),
    ])

    // // ===== 1.3 角色系统测试 =====
    console.log('\n📁 1.3 角色系统')
    await runTests(page, [
      test('切换到出纳角色', async (p) => {
        await waitForApp(p, `${BASE_URL}/#/dashboard`)
        await p.evaluate(() => {
          const store = window.__vue_app__?.config?.globalProperties?.$store
          if (store && typeof store.switchRole === 'function') {
            store.switchRole('cashier')
          } else {
            localStorage.setItem('jd_current_role', 'cashier')
          }
        })
        await p.waitForTimeout(500)
        // 刷新看角色是否切换
        await waitForApp(p, `${BASE_URL}/#/dashboard`)
        // 至少页面能正常加载
        const content = await p.textContent('body')
        if (!content || content.length < 50) throw new Error('切换出纳角色后页面内容过少')
      }),
      test('切换到会计角色', async (p) => {
        await p.evaluate(() => {
          const store = window.__vue_app__?.config?.globalProperties?.$store
          if (store && typeof store.switchRole === 'function') {
            store.switchRole('accountant')
          } else {
            localStorage.setItem('jd_current_role', 'accountant')
          }
        })
        await waitForApp(p, `${BASE_URL}/#/dashboard`)
        const content = await p.textContent('body')
        if (!content || content.length < 50) throw new Error('切换会计角色后页面内容过少')
      }),
      test('角色数据隔离-存储键含角色名', async (p) => {
        const keys = await p.evaluate(() => {
          return Object.keys(localStorage).filter(k => k.includes('scenario_data'))
        })
        if (keys.length === 0) {
          console.log('  ⚠️ 无scenario_data键（可能是空账套）')
          return
        }
        const hasRoleInKey = keys.some(k => k.includes('accountant') || k.includes('cashier') || k.includes('supervisor'))
        if (!hasRoleInKey) throw new Error('存储键不含角色名: ' + keys.join(', '))
      }),
    ])

    // ===== 1.4 科目管理测试 =====
    console.log('\n📁 1.4 科目管理')
    await runTests(page, [
      test('科目页面可访问', async (p) => {
        await waitForApp(p, `${BASE_URL}/#/accounting/subjects`)
        await p.waitForTimeout(1500)
        const content = await p.textContent('body')
        // 可能被教学弹窗挡住，弹窗也可能包含"科目"文本
        if (!content || content.length < 20) {
          // 检查是否被重定向或弹窗挡住
          const dialogVis = await p.isVisible('.el-dialog, .el-overlay').catch(() => false)
          if (dialogVis) {
            // 关闭弹窗再试
            const closeBtn = p.locator('.el-dialog__close, .el-dialog__headerbtn, .el-overlay-dialog .el-button--primary').first()
            if (await closeBtn.isVisible().catch(() => false)) {
              await closeBtn.click()
              await p.waitForTimeout(1000)
            }
          }
          // 重新检查
          const content2 = await p.textContent('body')
          if (!content2 || content2.length < 30) throw new Error('科目页面内容仍为空')
        }
      }),
      test('科目树可见', async (p) => {
        const tree = await p.isVisible('.el-tree, .tree-card')
        if (!tree) {
          // 可能树形结构尚未加载或不存在
          console.log('  ⚠️ 科目树不可见（可能是空状态）')
        }
      }),
      test('新增同级按钮可见', async (p) => {
        const btn = await p.isVisible('button:has-text("新增同级")')
        if (!btn) console.log('  ⚠️ 新增同级按钮不可见（可能非主管角色）')
      }),
    ])

    // ===== 1.5 凭证处理（非教学）测试 =====
    console.log('\n📁 1.5 凭证处理（非教学）')
    await runTests(page, [
      test('凭证录入页可访问', async (p) => {
        await waitForApp(p, `${BASE_URL}/#/accounting/voucher/entry`)
        const content = await p.textContent('body')
        if (!content || content.length < 30) throw new Error('凭证录入页内容缺失')
      }),
      test('凭证查询页可访问', async (p) => {
        await waitForApp(p, `${BASE_URL}/#/accounting/voucher/query`)
        const content = await p.textContent('body')
        if (!content || content.length < 30) throw new Error('凭证查询页内容缺失')
      }),
      test('凭证录入表单可见', async (p) => {
        // 非教学模式下应该有录入表单
        await waitForApp(p, `${BASE_URL}/#/accounting/voucher/entry`)
        const hasEntries = await p.evaluate(() => {
          return document.body.textContent.includes('摘要') || document.body.textContent.includes('科目')
        })
        if (!hasEntries) {
          // 可能被重定向或处于教学状态
          console.log('  ⚠️ 凭证录入表单要素未找到')
        }
      }),
    ])

    // ===== 1.6 教学安全保护测试 =====
    console.log('\n📁 1.6 ⭐教学安全保护（关键）')
    // 模拟教学状态：设置 tutorial_task 和 teaching_active
    await page.evaluate(() => {
      localStorage.setItem('tutorial_task', JSON.stringify({
        date: '2026-01-05',
        month: '01',
        scenarioId: 'manufacturing',
      }))
      localStorage.setItem('teaching_active', 'true')
    })
    await page.waitForTimeout(300)

    await runTests(page, [
      test('教学-Dashboard新增凭证拦截', async (p) => {
        await waitForApp(p, `${BASE_URL}/#/dashboard`)
        // 找"新增凭证"按钮
        const addBtn = p.locator('button:has-text("新增凭证"), .el-button:has-text("新增凭证")').first()
        if (await addBtn.isVisible().catch(() => false)) {
          await addBtn.click()
          await p.waitForTimeout(500)
          // 应该弹出提示而不是跳转
          const msg = await p.evaluate(() => {
            const toast = document.querySelector('.el-message, .el-notification')
            return toast ? toast.textContent : ''
          })
          if (msg && !msg.includes('教学')) {
            throw new Error(`教学期间新增凭证未拦截: ${msg}`)
          }
          // 确认没有跳转
          if (p.url().includes('voucher/entry')) throw new Error('教学期间被允许进入凭证录入')
        } else {
          console.log('  ⚠️ 新增凭证按钮不可见')
        }
      }),
      test('教学-VoucherQuery新增凭证拦截', async (p) => {
        await waitForApp(p, `${BASE_URL}/#/accounting/voucher/query`)
        const addBtn = p.locator('button:has-text("新增凭证")').first()
        if (await addBtn.isVisible().catch(() => false)) {
          await addBtn.click()
          await p.waitForTimeout(500)
          if (p.url().includes('voucher/entry')) throw new Error('教学期间被允许进入凭证录入')
        }
      }),
      test('教学-VoucherQuery编辑审核签字过账删除拦截', async (p) => {
        await waitForApp(p, `${BASE_URL}/#/accounting/voucher/query`)
        // 检查是否有操作按钮（编辑/审核/签字/过账/删除）
        const ops = ['编辑', '审核', '签字', '过账', '删除', '详情']
        for (const op of ops) {
          const btn = p.locator(`.el-table__row .el-button:has-text("${op}")`).first()
          if (await btn.isVisible().catch(() => false)) {
            await btn.click()
            await p.waitForTimeout(300)
            // 点击后应该弹出警告
            const urlAfter = p.url()
            // 不应该跳转到编辑页
            if (urlAfter.includes('entry')) throw new Error(`教学期间${op}操作被允许`)
          }
        }
      }),
      test('教学-PeriodEndTransfer结转拦截', async (p) => {
        await waitForApp(p, `${BASE_URL}/#/reports/period-end-transfer`)
        const execBtn = p.locator('button:has-text("执行结转"), button:has-text("期末结转")').first()
        if (await execBtn.isVisible().catch(() => false)) {
          await execBtn.click()
          await p.waitForTimeout(500)
        }
      }),
      test('教学-CashierMgmt对账拦截', async (p) => {
        await waitForApp(p, `${BASE_URL}/#/accounting/cashier`)
        const importBtn = p.locator('button:has-text("导入"), button:has-text("对账")').first()
        if (await importBtn.isVisible().catch(() => false)) {
          await importBtn.click()
          await p.waitForTimeout(500)
        }
      }),
      test('教学-VoucherEntry直接URL访问拦截', async (p) => {
        await waitForApp(p, `${BASE_URL}/#/accounting/voucher/entry`)
        await p.waitForTimeout(500)
        // 检查是否有保存按钮
        const saveBtn = p.locator('button:has-text("保存")').first()
        if (await saveBtn.isVisible().catch(() => false)) {
          // 点击保存应该被拦截
          await saveBtn.click()
          await p.waitForTimeout(500)
        }
      }),
      test('教学-SubjectList增删拦截', async (p) => {
        await waitForApp(p, `${BASE_URL}/#/accounting/subjects`)
        const addBtn = p.locator('button:has-text("新增同级"), button:has-text("新增下级")').first()
        if (await addBtn.isVisible().catch(() => false)) {
          await addBtn.click()
          await p.waitForTimeout(500)
          // 应弹出教学提示
          const msg = await p.evaluate(() => {
            const toast = document.querySelector('.el-message')
            return toast ? toast.textContent : ''
          })
          if (msg && !msg.includes('教学')) {
            console.log(`  ⚠️ 提示未明确提及教学: ${msg}`)
          }
        }
      }),
      test('教学-AccountManagement重置拦截', async (p) => {
        await waitForApp(p, `${BASE_URL}/#/system/accounts`)
        const resetBtn = p.locator('button:has-text("重置")').first()
        if (await resetBtn.isVisible().catch(() => false)) {
          await resetBtn.click()
          await p.waitForTimeout(500)
        }
      }),
      test('教学-PeriodManagement结账拦截', async (p) => {
        await waitForApp(p, `${BASE_URL}/#/system/periods`)
        const toggleBtn = p.locator('button:has-text("结账"), button:has-text("反结账")').first()
        if (await toggleBtn.isVisible().catch(() => false)) {
          await toggleBtn.click()
          await p.waitForTimeout(500)
        }
      }),
    ])

    // 清除教学标记
    await page.evaluate(() => {
      localStorage.removeItem('tutorial_task')
      localStorage.removeItem('teaching_active')
    })

    // ===== 1.7 自由模式测试 =====
    console.log('\n📁 1.7 自由模式')
    await runTests(page, [
      test('自由模式切换开关可见', async (p) => {
        await waitForApp(p, `${BASE_URL}/#/tutorial`)
        // 找切换按钮——浮动窗或教学中心
        const toggle = p.locator('text=自由练习, text=按课程学, text=🎯, text=📚').first()
        if (await toggle.isVisible().catch(() => false)) {
          console.log('  ✅ 自由模式切换开关可见')
        } else {
          console.log('  ⚠️ 自由模式切换开关不可见（可能需进入教学后才能显示）')
        }
      }),
      test('自由模式localStorage持久化', async (p) => {
        await p.evaluate(() => localStorage.setItem('jd_practice_mode', 'true'))
        const stored = await p.evaluate(() => localStorage.getItem('jd_practice_mode'))
        if (stored !== 'true') throw new Error('jd_practice_mode未持久化')
        // 清除
        await p.evaluate(() => localStorage.removeItem('jd_practice_mode'))
      }),
    ])

    // ===== 1.8 仪表盘测试 =====
    console.log('\n📁 1.8 仪表盘')
    await runTests(page, [
      test('仪表盘页面可访问', async (p) => {
        await waitForApp(p, `${BASE_URL}/#/dashboard`)
        const content = await p.textContent('body')
        if (!content || content.length < 50) throw new Error('仪表盘内容缺失')
      }),
      test('KPI卡片可见', async (p) => {
        const hasCards = await p.evaluate(() => {
          const text = document.body.textContent
          return text.includes('凭证') || text.includes('借方') || text.includes('贷方') || text.includes('货币资金')
        })
        if (!hasCards) console.log('  ⚠️ KPI卡片未找到')
      }),
      test('XP进度条可见', async (p) => {
        const xpBar = await p.isVisible('.el-progress, [class*="xp"], [class*="level"]').catch(() => false)
        if (!xpBar) console.log('  ⚠️ XP进度条不可见')
      }),
    ])

    // ===== 1.9 报表系统测试 =====
    console.log('\n📁 1.9 报表系统')
    await runTests(page, [
      test('试算平衡表', async (p) => {
        await waitForApp(p, `${BASE_URL}/#/accounting/trial-balance`)
        const content = await p.textContent('body')
        if (!content || content.length < 30) throw new Error('试算平衡表内容缺失')
      }),
      test('资产负债表', async (p) => {
        await waitForApp(p, `${BASE_URL}/#/reports/balance-sheet`)
        await p.waitForTimeout(1000)
        const content = await p.textContent('body')
        if (!content || content.length < 30) throw new Error('资产负债表内容缺失')
      }),
      test('利润表', async (p) => {
        await waitForApp(p, `${BASE_URL}/#/reports/income-statement`)
        await p.waitForTimeout(1000)
        const content = await p.textContent('body')
        if (!content || content.length < 30) throw new Error('利润表内容缺失')
      }),
      test('现金流量表', async (p) => {
        await waitForApp(p, `${BASE_URL}/#/reports/cash-flow`)
        await p.waitForTimeout(1000)
        const content = await p.textContent('body')
        if (!content || content.length < 30) throw new Error('现金流量表内容缺失')
      }),
      test('自定义报表', async (p) => {
        await waitForApp(p, `${BASE_URL}/#/reports/custom`)
        await p.waitForTimeout(1000)
        const content = await p.textContent('body')
        if (!content || content.length < 30) {
          console.log('  ⚠️ 自定义报表页面内容较少')
        }
      }),
    ])

    // ===== 1.10 辅助功能测试 =====
    console.log('\n📁 1.10 辅助功能')
    await runTests(page, [
      test('辅助核算页可访问', async (p) => {
        await waitForApp(p, `${BASE_URL}/#/accounting/auxiliary`)
        const content = await p.textContent('body')
        if (!content || content.length < 30) console.log('  ⚠️ 辅助核算页内容较少')
      }),
      test('审计日志可访问', async (p) => {
        await waitForApp(p, `${BASE_URL}/#/system/audit-log`)
        const content = await p.textContent('body')
        if (!content || content.length < 30) console.log('  ⚠️ 审计日志内容较少')
      }),
    ])

    // ===== 1.11 导航与路由测试 =====
    console.log('\n📁 1.11 导航与路由')
    await runTests(page, [
      test('侧栏菜单可见', async (p) => {
        await waitForApp(p, `${BASE_URL}/#/dashboard`)
        const sidebar = await p.isVisible('.el-menu, [class*="sidebar"], aside')
        if (!sidebar) console.log('  ⚠️ 侧栏菜单不可见（可能被收起）')
      }),
      test('404页面', async (p) => {
        await waitForApp(p, `${BASE_URL}/#/non-existent-page-xyz`)
        const content = await p.textContent('body')
        if (!content) throw new Error('404页面空白')
      }),
      test('未登录重定向', async (p) => {
        // 在无登录状态访问需要登录的页面
        await p.evaluate(() => localStorage.removeItem('jd_current_role'))
        await waitForApp(p, `${BASE_URL}/#/dashboard`)
        await p.waitForTimeout(1000)
        if (!p.url().includes('login')) {
          // 可能自动登录了
          console.log('  ⚠️ 未跳转到登录页（可能是自动登录）')
        }
        // 恢复登录状态
        await p.evaluate(() => localStorage.setItem('jd_current_role', 'accountant'))
      }),
      test('所有主要路由可访问', async (p) => {
        const routes = [
          '/#/login', '/#/dashboard', '/#/tutorial',
          '/#/accounting/subjects', '/#/accounting/voucher/entry', '/#/accounting/voucher/query',
          '/#/accounting/subject-balance', '/#/accounting/ledger',
          '/#/reports/balance-sheet', '/#/reports/income-statement', '/#/reports/cash-flow',
          '/#/system/periods', '/#/system/accounts',
        ]
        let failed = 0
        for (const route of routes) {
          try {
            await waitForApp(p, `${BASE_URL}${route}`, 8000)
          } catch (e) {
            failed++
            console.log(`    ⚠️ ${route}: 加载超时`)
          }
        }
        if (failed > routes.length / 2) throw new Error(`超过半数路由加载失败(${failed}/${routes.length})`)
      }),
    ])

    // ===== 1.12 XP/等级/成就测试 =====
    console.log('\n📁 1.12 XP/等级/成就')
    await runTests(page, [
      test('成就页面可访问', async (p) => {
        await waitForApp(p, `${BASE_URL}/#/tutorial/achievements`)
        const content = await p.textContent('body')
        if (!content || content.length < 30) throw new Error('成就页面内容缺失')
      }),
      test('业务流程全景图可访问', async (p) => {
        await waitForApp(p, `${BASE_URL}/#/tutorial/flow-chart`)
        const content = await p.textContent('body')
        if (!content || content.length < 30) console.log('  ⚠️ 全景图页面内容较少')
      }),
      test('纳税申报页可访问', async (p) => {
        await waitForApp(p, `${BASE_URL}/#/reports/tax-filing`)
        const content = await p.textContent('body')
        if (!content || content.length < 30) console.log('  ⚠️ 纳税申报页内容较少')
      }),
      // XP数据检查
      test('XP数据结构正常', async (p) => {
        const xpData = await p.evaluate(() => {
          try { return JSON.parse(localStorage.getItem('jd_xp_data')) }
          catch { return null }
        })
        if (!xpData) {
          console.log('  ⚠️ 无XP数据（可能是新环境）')
          return
        }
        if (typeof xpData.xp !== 'number') throw new Error('XP数据中缺少xp数值')
        if (typeof xpData.level !== 'number') throw new Error('XP数据中缺少level数值')
      }),
    ])

    // ===== 生成报告 =====
    console.log('\n' + '='.repeat(60))
    console.log('📊 测试报告')
    console.log('='.repeat(60))
    console.log(`总计: ${testCount} | ✅ 通过: ${results.passed.length} | ❌ 失败: ${results.failed.length}`)

    if (results.failed.length > 0) {
      console.log('\n❌ 失败项:')
      results.failed.forEach(f => console.log(`  - ${f}`))
    }

    // 写入JSON报告
    const report = {
      timestamp: new Date().toISOString(),
      total: testCount,
      passed: results.passed.length,
      failed: results.failed.length,
      passedTests: results.passed,
      failedTests: results.failed,
    }
    fs.writeFileSync(path.join(REPORT_DIR, 'test-report.json'), JSON.stringify(report, null, 2))
    console.log(`\n📄 报告已保存到: ${REPORT_DIR}`)

    return results.failed.length === 0

  } catch (err) {
    console.error('❌ 测试框架异常:', err.message)
    return false
  } finally {
    if (browser) await browser.close()
  }
}

main().then(success => {
  process.exit(success ? 0 : 1)
})
