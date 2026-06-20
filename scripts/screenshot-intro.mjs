import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.join(__dirname, '..', '观测者财务_系统介绍.html');
const outDir = path.join(__dirname, '..', '商品介绍截图');
fs.mkdirSync(outDir, { recursive: true });

async function main() {
  console.log('📸 分段截图商品介绍页\n');
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 640, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  // 获取总高度
  const totalHeight = await page.evaluate(() => document.body.scrollHeight);
  const viewportHeight = 900;
  let captured = 0;

  // 从顶部开始，每次滚动一个视口高度截图
  for (let scrollY = 0; scrollY < totalHeight; scrollY += viewportHeight) {
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(500);

    captured++;
    const filename = `商品介绍_${String(captured).padStart(2, '0')}.png`;
    await page.screenshot({ path: path.join(outDir, filename), fullPage: false });
    console.log(`  ✅ ${filename} (y=${scrollY}px)`);

    // 防止最后一段重复
    if (scrollY + viewportHeight >= totalHeight) break;
  }

  await browser.close();
  console.log(`\n✅ 完成! 共 ${captured} 张截图，保存在:`, outDir);
  const files = fs.readdirSync(outDir).sort();
  for (const f of files) {
    const fp = path.join(outDir, f);
    console.log(`  ${f} (${(fs.statSync(fp).size / 1024).toFixed(0)}KB)`);
  }
}

main().catch(e => { console.error('失败:', e); process.exit(1); });
