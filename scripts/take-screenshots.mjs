/**
 * 全行业系统界面截图（制造业/商业/服务业/建筑业）
 *
 * 用法：node scripts/take-screenshots.mjs
 * 依赖：需先 npm run dev（端口3000）
 */
import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '商品截图');
fs.mkdirSync(outDir, { recursive: true });

const CACHE_B64 = path.join(__dirname, '..', '商品截图_b64.json');

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

const BASE = process.env.BASE_URL || 'http://localhost:3000';

// 行业配置
const INDUSTRIES = [
  { id: 'manufacturing', label: '制造业', scenario: 'manufacturing', dirName: 'manufacturing' },
  { id: 'commercial', label: '商业企业', scenario: 'commercial', dirName: 'commercial' },
  { id: 'service', label: '服务业', scenario: 'service', dirName: 'service' },
  { id: 'construction', label: '建筑业', scenario: 'construction', dirName: 'construction' },
];

const PAGES = [
  { route: '/dashboard', file: '01-仪表盘', label: '仪表盘' },
  { route: '/accounting/subject-balance', file: '02-科目余额表', label: '科目余额表' },
  { route: '/reports/balance-sheet', file: '03-资产负债表', label: '资产负债表' },
  { route: '/reports/income-statement', file: '04-利润表', label: '利润表' },
];

// 存储所有 base64 数据
const b64Map = {};

async function makeScreenshot(browser, industry, pageInfo) {
  const { id: indId, label: indLabel, scenario } = industry;
  const { route, file, label: pageLabel } = pageInfo;
  const filename = `${indId}_${file}.png`;
  const filepath = path.join(outDir, filename);
  const fullLabel = `${indLabel} - ${pageLabel}`;

  console.log(`📸 ${fullLabel}`);
  const code = generateValidCode();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });

  await ctx.addInitScript(`(() => {
    const code = '${code}';
    const scenario = '${scenario}';
    const keys = Object.keys(localStorage);
    for (const k of keys) { if (k.startsWith('jd_')) localStorage.removeItem(k); }
    localStorage.setItem('jd_activated', code);
    localStorage.setItem('jd_onboarding_complete', 'true');
    localStorage.setItem('jd_onboarding_done', 'true');
    localStorage.setItem('jd_logged_in', 'true');
    localStorage.setItem('jd_role', '会计');
    localStorage.setItem('jd_current_role', '会计');
    localStorage.setItem('jd_scenario', scenario);
    localStorage.setItem('jd_selected_scenario', scenario);
    localStorage.setItem('jd_theme', 'light');
  })()`);

  const page = await ctx.newPage();

  // 先加载仪表盘初始化 store
  await page.goto(`${BASE}/#/dashboard`, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(2000);

  // 再跳转到目标页面
  if (route !== '/dashboard') {
    await page.evaluate((u) => { window.location.hash = u; }, route);
    await page.waitForTimeout(3000);
  }

  await page.screenshot({ path: filepath, fullPage: false });

  // 读取并 base64 编码
  const imgData = fs.readFileSync(filepath);
  const b64 = imgData.toString('base64');
  b64Map[filename] = b64;

  await ctx.close();
  const sizeKB = (imgData.length / 1024).toFixed(0);
  console.log(`  ✅ ${filename} (${sizeKB}KB)`);
}

async function main() {
  const browser = await chromium.launch({ headless: true });

  for (const ind of INDUSTRIES) {
    console.log(`\n━━━ ${ind.label} ━━━`);
    for (const pg of PAGES) {
      await makeScreenshot(browser, ind, pg);
    }
  }

  // 保存 base64 映射
  fs.writeFileSync(CACHE_B64, JSON.stringify(b64Map, null, 2));
  console.log(`\n✅ base64 缓存已保存: ${CACHE_B64}`);

  await browser.close();
  console.log('\n✅ 全部完成! 共计 ' + (INDUSTRIES.length * PAGES.length) + ' 张截图');

  // 列出所有文件
  const files = fs.readdirSync(outDir).sort();
  for (const f of files) {
    const s = fs.statSync(path.join(outDir, f));
    console.log(`  ${f}: ${(s.size/1024).toFixed(1)}KB`);
  }
}

main().catch(e => { console.error('失败:', e); process.exit(1); });
