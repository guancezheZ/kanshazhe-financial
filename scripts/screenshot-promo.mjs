// 拼多多宣传图截图脚本
// 使用方式：先 npm run dev 启动开发服务器，或直接用 file:// 协议
// 运行：node scripts/screenshot-promo.mjs

import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

// 宣传图HTML路径（用绝对路径 file:// 协议）
const promoHtml = path.join(projectRoot, 'docs', '拼多多宣传图.html');
const outputDir = path.join(projectRoot, '商品截图');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1200, height: 1400 } });

  // ===== 截图宣传图 =====
  console.log('📸 开始截图宣传图...');
  await page.goto(`file://${promoHtml}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const slides = await page.$$('.slide');
  console.log(`   找到 ${slides.length} 张宣传图`);

  for (let i = 0; i < slides.length; i++) {
    const name = `宣传图${i + 1}`;
    console.log(`   截图 ${name}...`);
    await slides[i].screenshot({
      path: path.join(outputDir, `宣传图${i + 1}.png`),
    });
  }

  console.log('✅ 宣传图截图完成！');

  // ===== 截图商品文案预览的描述区块 =====
  const previewHtml = path.join(projectRoot, 'docs', '拼多多商品文案预览.html');
  console.log('📸 开始截图商品描述区块...');
  await page.goto(`file://${previewHtml}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // 截图第1页（商品概览）
  const page1 = await page.$('.page:first-child');
  if (page1) {
    console.log('   截图 商品概览...');
    await page1.screenshot({ path: path.join(outputDir, '商品概览.png') });
  }

  // 截图第2页中的各个描述区块
  const sections = await page.$$('.desc-box');
  const sectionNames = ['描述-开场', '描述-四大行业', '描述-学习模式', '描述-适合人群与内容', '描述-购买流程'];
  for (let i = 0; i < sections.length; i++) {
    console.log(`   截图 ${sectionNames[i]}...`);
    await sections[i].screenshot({
      path: path.join(outputDir, `${sectionNames[i]}.png`),
    });
  }

  console.log('✅ 商品文案截图完成！');

  await browser.close();

  console.log('\n🎉 全部截图完成！文件保存在 商品截图/ 目录：');
  console.log('   宣传图1.png ~ 宣传图3.png');
  console.log('   商品文案页1.png ~ 商品文案页3.png');
}

run().catch(err => {
  console.error('截图失败：', err);
  process.exit(1);
});
