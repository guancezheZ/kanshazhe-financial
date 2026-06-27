/**
 * 闲鱼商品图截图脚本 v3
 *
 * 生成5张商品展示图
 * 用法：先 npm run dev（另一个终端），然后：
 *   node scripts/listing-screenshots.mjs
 *
 * 输出到：商品截图/ 目录
 */
import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', '商品截图');
fs.mkdirSync(outDir, { recursive: true });

function generateValidCode() {
  const chars = [];
  for (let i = 0; i < 12; i++) chars.push((Math.random() * 16 | 0).toString(16).toUpperCase());
  let cs = 0;
  for (let i = 0; i < 12; i++) cs ^= parseInt(chars[i], 16);
  chars.push(((cs >> 8) & 0xF).toString(16).toUpperCase());
  chars.push(((cs >> 4) & 0xF).toString(16).toUpperCase());
  chars.push((cs & 0xF).toString(16).toUpperCase());
  chars.push((Math.random() * 16 | 0).toString(16).toUpperCase());
  return `${chars.slice(0,4).join('')}-${chars.slice(4,8).join('')}-${chars.slice(8,12).join('')}-${chars.slice(12,16).join('')}`;
}

const BASE = process.env.BASE_URL || 'http://localhost:3000';
const SCENARIO = 'manufacturing';

function initScript(code) {
  return `
    localStorage.clear();
    localStorage.setItem('jd_activated', '${code}');
    localStorage.setItem('jd_onboarding_complete', 'true');
    localStorage.setItem('jd_onboarding_done', 'true');
    localStorage.setItem('jd_logged_in', 'true');
    localStorage.setItem('jd_role', '会计');
    localStorage.setItem('jd_current_role', '会计');
    localStorage.setItem('jd_scenario', '${SCENARIO}');
    localStorage.setItem('jd_selected_scenario', '${SCENARIO}');
    localStorage.setItem('jd_theme', 'ink');
    localStorage.setItem('jd_monthly_mode', 'false');
  `;
}

// 强制应用水墨国风主题
function applyInkTheme(page) {
  return page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'ink');
  });
}

async function takeScreenshot(browser, code, hash, filename) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await ctx.addInitScript(initScript(code));
  const page = await ctx.newPage();
  const filePath = path.join(outDir, filename);

  await page.goto(`${BASE}/#${hash}`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);

  // 强制应用水墨国风主题
  await applyInkTheme(page);
  await page.waitForTimeout(500);

  // 额外等待内容渲染
  try {
    await page.waitForSelector('.el-main, .app-main, #app > *', { timeout: 5000 }).catch(() => {});
  } catch {}

  await page.screenshot({ path: filePath, fullPage: false });
  await ctx.close();

  const sizeKB = (fs.statSync(filePath).size / 1024).toFixed(0);
  console.log(`  ✅ ${filename} (${sizeKB}KB)`);
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const code = generateValidCode();

  console.log('📸 图1 - 主界面仪表盘');
  await takeScreenshot(browser, code, '/dashboard', '01-主界面仪表盘.png');

  console.log('📸 图2 - 科目表（展示专业科目体系）');
  await takeScreenshot(browser, code, '/accounting/subjects', '02-科目表.png');

  console.log('📸 图3 - 资产负债表');
  await takeScreenshot(browser, code, '/reports/balance-sheet', '03-资产负债表.png');

  console.log('📸 图4 - 科目余额表（展示试算平衡数据）');
  await takeScreenshot(browser, code, '/accounting/subject-balance', '04-科目余额表.png');

  console.log('📸 图5 - 成就系统');
  await takeScreenshot(browser, code, '/tutorial/achievements', '05-成就系统.png');

  await browser.close();
  console.log('\n✅ 5张商品截图全部完成！');
  console.log(`📁 输出目录: ${outDir}`);
  const files = fs.readdirSync(outDir).sort();
  for (const f of files) {
    const s = fs.statSync(path.join(outDir, f));
    console.log(`  ${f} (${(s.size/1024).toFixed(0)}KB)`);
  }
}

main().catch(e => { console.error('失败:', e); process.exit(1); });
