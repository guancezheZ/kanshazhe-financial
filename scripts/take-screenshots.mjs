import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '商品截图');
fs.mkdirSync(outDir, { recursive: true });

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

const BASE = 'http://localhost:3000';

// 每个截图独立 context，用 addInitScript 传参
async function makeScreenshot(browser, url, filename, label) {
  console.log(`📸 ${label}`);
  const code = generateValidCode();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  // 用 function + arg 传参，确保 localStorage 在页面 JS 执行前设置好
  await ctx.addInitScript((arg) => {
    const c = arg;
    const keys = Object.keys(localStorage);
    for (const k of keys) { if (k.startsWith('jd_')) localStorage.removeItem(k); }
    localStorage.setItem('jd_activated', c);
    localStorage.setItem('jd_onboarding_complete', 'true');
    localStorage.setItem('jd_onboarding_done', 'true');
    localStorage.setItem('jd_logged_in', 'true');
    localStorage.setItem('jd_role', '会计');
    localStorage.setItem('jd_current_role', '会计');
    localStorage.setItem('jd_scenario', 'year1');
    localStorage.setItem('jd_selected_scenario', 'manufacturing');
    localStorage.setItem('jd_theme', 'light');
  }, code);

  const page = await ctx.newPage();

  // 先加载仪表盘初始化 store
  await page.goto(`${BASE}/#/dashboard`, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(2000);

  // 再跳转到目标页面
  if (url !== '/dashboard') {
    await page.evaluate((u) => { window.location.hash = u; }, url);
    await page.waitForTimeout(3000);
  }

  const hash = await page.evaluate(() => window.location.hash);
  const bodyLen = await page.evaluate(() => document.body?.innerHTML?.length || 0);
  console.log(`  Hash: ${hash}, Body: ${bodyLen} chars`);

  await page.screenshot({ path: path.join(outDir, filename), fullPage: false });
  await ctx.close();
  console.log(`  ✅ ${filename}`);
}

async function main() {
  const browser = await chromium.launch({ headless: true });

  await makeScreenshot(browser, '/dashboard', '01-仪表盘.png', '仪表盘');
  await makeScreenshot(browser, '/accounting/subject-balance', '02-科目余额表.png', '科目余额表');
  await makeScreenshot(browser, '/reports/balance-sheet', '03-资产负债表.png', '资产负债表');
  await makeScreenshot(browser, '/reports/income-statement', '04-利润表.png', '利润表');

  await browser.close();
  console.log('\n✅ 全部完成!');
  const files = fs.readdirSync(outDir);
  for (const f of files) {
    const s = fs.statSync(path.join(outDir, f));
    console.log(`  ${f}: ${(s.size/1024).toFixed(1)}KB`);
  }
}

main().catch(e => { console.error('失败:', e); process.exit(1); });
