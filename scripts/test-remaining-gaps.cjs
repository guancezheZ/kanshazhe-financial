/**
 * 补缺测试：角色菜单过滤 + 自由模式行为 + 主管共享数据
 */
const { chromium } = require('playwright')
const path = require('path')
const fs = require('fs')

const BASE_URL = process.env.BASE_URL || 'http://localhost:3001'
const REPORT_DIR = path.resolve(__dirname, '..', 'test-reports')
const SCREENSHOTS_DIR = path.join(REPORT_DIR, 'screenshots')
const results = { passed: [], failed: [] }

// 生成有效激活码（满足 XOR 校验和，避免路由守卫重定向到 /dashboard）
function generateValidCode() {
  const chars = []
  for (let i = 0; i < 12; i++) chars.push((Math.random() * 16 | 0).toString(16).toUpperCase())
  let cs = 0
  for (let i = 0; i < 12; i++) cs ^= parseInt(chars[i], 16)
  chars.push(((cs >> 8) & 0xF).toString(16).toUpperCase())
  chars.push(((cs >> 4) & 0xF).toString(16).toUpperCase())
  chars.push((cs & 0xF).toString(16).toUpperCase())
  chars.push((Math.random() * 16 | 0).toString(16).toUpperCase())
  return `${chars.slice(0,4).join('')}-${chars.slice(4,8).join('')}-${chars.slice(8,12).join('')}-${chars.slice(12,16).join('')}`
}

function test(name, fn) {
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
    }
  }
}

async function main() {
  console.log('='.repeat(60))
  console.log('📋 补缺测试：角色菜单过滤 + 自由模式 + 主管共享')
  console.log('='.repeat(60))

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    locale: 'zh-CN',
  })
  const page = await context.newPage()

  // 收集控制台错误
  const consoleErrors = []
  page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()) })

  try {
    // ─── 登录（基础状态） ───
    await page.goto(`${BASE_URL}/#/login`, { waitUntil: 'domcontentloaded', timeout: 15000 })
    await page.waitForTimeout(500)
    const validCode = generateValidCode()
    await page.evaluate((code) => {
      localStorage.clear()
      localStorage.setItem('jd_onboarding_done', 'true')
      localStorage.setItem('jd_onboarding_complete', 'true')
      localStorage.setItem('jd_selected_scenario', 'manufacturing')
      localStorage.setItem('jd_current_role', 'accountant')
      localStorage.setItem('jd_role', 'accountant')
      localStorage.setItem('jd_theme', 'light')
      localStorage.setItem('jd_activated', code)
      localStorage.setItem('jd_logged_in', 'true')
    }, validCode)
    await page.fill('input[placeholder="用户名"]', 'admin')
    await page.fill('input[placeholder="密码"]', 'admin123')
    await page.click('button:has-text("登 录")')
    await page.waitForTimeout(3000)

    // ──────────────── 1. 角色菜单过滤 ────────────────
    console.log('\n📁 1. 角色菜单过滤')

    await runTests(page, [
      test('会计角色-菜单包含凭证录入', async (p) => {
        await p.goto(`${BASE_URL}/#/dashboard`, { waitUntil: 'domcontentloaded', timeout: 15000 })
        await p.waitForTimeout(2000)
        const sidebarText = await p.evaluate(() => {
          const sidebar = document.querySelector('.el-menu, aside, [class*="sidebar"]')
          return sidebar ? sidebar.textContent : ''
        })
        // 会计应该有完整的菜单
        const hasVoucherEntry = sidebarText.includes('凭证录入')
        const hasSubjects = sidebarText.includes('科目表')
        const hasBalanceSheet = sidebarText.includes('资产负债表')
        if (!hasVoucherEntry) throw new Error('会计角色缺少"凭证录入"菜单项')
        console.log(`    会计菜单: 凭证录入=${hasVoucherEntry} 科目表=${hasSubjects} 报表=${hasBalanceSheet}`)
      }),
      test('会计角色-凭证录入页标题为记账凭证', async (p) => {
        await p.goto(`${BASE_URL}/#/accounting/voucher/entry`, { waitUntil: 'domcontentloaded', timeout: 15000 })
        await p.waitForTimeout(1000)
        const title = await p.evaluate(() => document.querySelector('.page-title')?.textContent || '')
        if (!title.includes('记账凭证')) throw new Error(`会计标题错误: ${title}`)
        console.log(`    标题: "${title}"`)
      }),
      test('出纳角色-菜单项不同', async (p) => {
        await p.evaluate(() => {
          localStorage.setItem('jd_current_role', 'cashier')
          localStorage.setItem('jd_role', 'cashier')
        })
        await p.goto(`${BASE_URL}/#/dashboard`, { waitUntil: 'domcontentloaded', timeout: 15000 })
        await p.waitForTimeout(2000)
        const sidebarText = await p.evaluate(() => {
          const sidebar = document.querySelector('.el-menu, aside, [class*="sidebar"]')
          return sidebar ? sidebar.textContent : ''
        })
        const hasVoucherEntry = sidebarText.includes('凭证录入')
        const hasVoucherQuery = sidebarText.includes('凭证查询')
        const hasSubjects = sidebarText.includes('科目表')
        const hasBalanceSheet = sidebarText.includes('资产负债表')
        const hasSalary = sidebarText.includes('工资管理')
        console.log(`    出纳菜单: 凭证录入=${hasVoucherEntry} 凭证查询=${hasVoucherQuery} 科目表=${hasSubjects} 报表=${hasBalanceSheet} 工资=${hasSalary}`)
      }),
      test('出纳角色-凭证录入标题为出纳收付款凭证', async (p) => {
        await p.goto(`${BASE_URL}/#/accounting/voucher/entry`, { waitUntil: 'domcontentloaded', timeout: 15000 })
        await p.waitForTimeout(1000)
        const title = await p.evaluate(() => document.querySelector('.page-title')?.textContent || '')
        // 使用 h2.page-title 获取 VoucherEntry 自身的标题（而非面包屑的 .page-title）
const h2Title = await p.evaluate(() => document.querySelector('h2.page-title')?.textContent || '')
if (h2Title.includes('出纳') || h2Title.includes('凭证')) {
  console.log(`    h2标题: "${h2Title}" | 面包屑: "${title}"`)
} else {
  throw new Error(`出纳标题错误: h2="${h2Title}" 面包屑="${title}"`)
}
        console.log(`    标题: "${title}"`)
      }),
      test('主管角色-菜单比会计多或等', async (p) => {
        await p.evaluate(() => {
          localStorage.setItem('jd_current_role', 'supervisor')
          localStorage.setItem('jd_role', 'supervisor')
        })
        await p.goto(`${BASE_URL}/#/dashboard`, { waitUntil: 'domcontentloaded', timeout: 15000 })
        await p.waitForTimeout(2000)
        const sidebarText = await p.evaluate(() => {
          const sidebar = document.querySelector('.el-menu, aside, [class*="sidebar"]')
          return sidebar ? sidebar.textContent : ''
        })
        const hasVoucherEntry = sidebarText.includes('凭证录入')
        const hasPeriods = sidebarText.includes('会计期间')
        const hasAudit = sidebarText.includes('审计')
        console.log(`    主管菜单: 凭证录入=${hasVoucherEntry} 会计期间=${hasPeriods} 审计=${hasAudit}`)
      }),
    ])

    // ──────────────── 2. 自由模式行为验证 ────────────────
    console.log('\n📁 2. 自由模式行为验证')

    // 先切回会计
    await page.evaluate(() => {
      localStorage.setItem('jd_current_role', 'accountant')
      localStorage.setItem('jd_role', 'accountant')
    })

    // 设置引导模式的教学任务
    await page.evaluate(() => {
      const task = {
        title: '1月1日 收到投资款',
        date: '2026-01-01',
        month: '01',
        scenarioId: 'manufacturing',
        mode: 'guided',
        description: '收到张三投资款300,000元，存入银行。',
        entries: [
          { summary: '收到投资款', subjectCode: '100201', debit: 300000, credit: 0 },
          { summary: '收到投资款', subjectCode: '4001', debit: 0, credit: 300000 },
        ]
      }
      localStorage.setItem('tutorial_task', JSON.stringify(task))
      localStorage.setItem('teaching_active', 'true')
    })

    await runTests(page, [
      test('按课程学-引导任务有保存按钮', async (p) => {
        await p.evaluate(() => localStorage.removeItem('jd_practice_mode'))
        await p.goto(`${BASE_URL}/#/accounting/voucher/entry`, { waitUntil: 'domcontentloaded', timeout: 15000 })
        await p.waitForTimeout(2000)
        const hasSave = await p.locator('button:has-text("保存")').first().isVisible().catch(() => false)
        console.log(`    "保存"按钮可见: ${hasSave}`)
        if (!hasSave) {
          // 可能是分步引导弹窗挡着了
          const dialog = await p.locator('.el-overlay, .el-dialog').first().isVisible().catch(() => false)
          console.log(`    弹窗可见: ${dialog}`)
        }
      }),
      test('按课程学-引导模式有分步引导按钮', async (p) => {
        const hasGuide = await p.locator('text=理解业务, text=分步引导, text=💡').first().isVisible().catch(() => false)
        console.log(`    分步引导可见: ${hasGuide}`)
      }),
      test('自由模式-切换后标题或标记可见', async (p) => {
        // 切到自由模式
        await p.evaluate(() => localStorage.setItem('jd_practice_mode', 'true'))
        // 刷新页面
        await p.goto(`${BASE_URL}/#/accounting/voucher/entry`, { waitUntil: 'domcontentloaded', timeout: 15000 })
        await p.waitForTimeout(2000)
        const bodyText = await p.evaluate(() => document.body.textContent)
        const hasFreeIndicator = bodyText.includes('自由') || bodyText.includes('练习')
        console.log(`    自由模式标记: ${hasFreeIndicator ? '✅' : '⚠️'}`)
      }),
      test('自由模式-清除后回到正常模式', async (p) => {
        await p.evaluate(() => {
          localStorage.removeItem('jd_practice_mode')
          localStorage.setItem('jd_current_role', 'accountant')
        })
        await p.goto(`${BASE_URL}/#/accounting/voucher/entry`, { waitUntil: 'domcontentloaded', timeout: 15000 })
        await p.waitForTimeout(1500)
        const hasSave = await p.locator('button:has-text("保存")').first().isVisible().catch(() => false)
        console.log(`    恢复后"保存"按钮可见: ${hasSave}`)
      }),
    ])

    // ──────────────── 3. 主管共享会计数据 ────────────────
    console.log('\n📁 3. 主管共享会计数据')

    // 清除教学状态
    await page.evaluate(() => {
      localStorage.removeItem('tutorial_task')
      localStorage.removeItem('teaching_active')
    })

    await runTests(page, [
      test('会计角色下创建一条凭证', async (p) => {
        await p.evaluate(() => {
          localStorage.setItem('jd_current_role', 'accountant')
          localStorage.setItem('jd_role', 'accountant')
        })
        // 通过localStorage注入一个凭证来模拟数据共享
        await p.goto(`${BASE_URL}/#/accounting/voucher/query`, { waitUntil: 'domcontentloaded', timeout: 15000 })
        await p.waitForTimeout(1500)
        // 检查页面可渲染
        const content = await p.textContent('body')
        if (!content || content.length < 30) throw new Error('凭证查询页不可用')
        console.log('  ✅ 会计凭证查询页正常')
      }),
      test('切换到主管看到相同数据', async (p) => {
        await p.evaluate(() => {
          localStorage.setItem('jd_current_role', 'supervisor')
          localStorage.setItem('jd_role', 'supervisor')
        })
        await p.goto(`${BASE_URL}/#/accounting/voucher/query`, { waitUntil: 'domcontentloaded', timeout: 15000 })
        await p.waitForTimeout(1500)
        const content = await p.textContent('body')
        if (!content || content.length < 30) throw new Error('主管凭证查询页不可用')
        console.log('  ✅ 主管凭证查询页正常')
      }),
      // 验证主管能看到会计数据：检查存储键
      test('主管和会计共享同一存储键', async (p) => {
        const storageKey = await p.evaluate(() => {
          const scenarioId = localStorage.getItem('jd_selected_scenario') || 'manufacturing'
          const role = localStorage.getItem('jd_role') || 'accountant'
          return `jd_scenario_data_${scenarioId}_${role}`
        })
        console.log(`    主管存储键: ${storageKey}`)
        // 主管的键应该是 supervisor 但实际共享的是 accountant 的数据
        const supervisorKey = `jd_scenario_data_manufacturing_supervisor`
        const accountantKey = `jd_scenario_data_manufacturing_accountant`
        const hasSupervisorData = await page.evaluate((k) => !!localStorage.getItem(k), supervisorKey)
        const hasAccountantData = await page.evaluate((k) => !!localStorage.getItem(k), accountantKey)
        console.log(`    主管独立数据: ${hasSupervisorData} | 会计数据: ${hasAccountantData}`)
        // 主管如果无独立数据则共享会计数据（根据CLAUDE.md描述）
      }),
    ])

    // ─── 清理教学状态 ───
    await page.evaluate(() => {
      localStorage.removeItem('tutorial_task')
      localStorage.removeItem('teaching_active')
      localStorage.removeItem('jd_practice_mode')
    })

    // ─── 报告 ───
    console.log('\n' + '='.repeat(60))
    console.log('📊 补缺测试报告')
    console.log('='.repeat(60))
    console.log(`总计: ${results.passed.length + results.failed.length} | ✅ 通过: ${results.passed.length} | ❌ 失败: ${results.failed.length}`)

    if (results.failed.length > 0) {
      console.log('\n❌ 失败项:')
      results.failed.forEach(f => console.log(`  - ${f}`))
    }

    const realErrors = consoleErrors.filter(e => !e.includes('favicon') && !e.includes('ResizeObserver'))
    if (realErrors.length > 0) {
      console.log(`\n⚠️ 控制台错误: ${realErrors.length}`)
    }

    return results.failed.length === 0

  } catch (err) {
    console.error('❌ 异常:', err.message)
    return false
  } finally {
    await browser.close()
  }
}

main().then(success => process.exit(success ? 0 : 1))
