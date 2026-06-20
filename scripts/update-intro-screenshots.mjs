/**
 * 更新商品介绍 HTML：添加商业/服务/建筑业截图
 *
 * 用法：node scripts/update-intro-screenshots.mjs
 * 依赖：商品截图_b64.json（由 take-screenshots.mjs 生成）
 */
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const HTML_PATH = resolve(ROOT, '观测者财务_系统介绍.html');
const B64_PATH = resolve(ROOT, '商品截图_b64.json');

if (!existsSync(B64_PATH)) {
  console.error('❌ 请先运行 node scripts/take-screenshots.mjs 生成截图');
  process.exit(1);
}

const b64Map = JSON.parse(readFileSync(B64_PATH, 'utf-8'));

let html = readFileSync(HTML_PATH, 'utf-8');

// 检查是否已添加（避免重复）
if (html.includes('industry-commercial')) {
  console.log('ℹ️  截图已更新过，跳过');
  process.exit(0);
}

const INDUSTRIES = [
  { id: 'commercial', name: '商业企业', icon: '🏪', desc: '商品流通企业账务处理' },
  { id: 'service', name: '服务业', icon: '💼', desc: '管理咨询/软件开发账务' },
  { id: 'construction', name: '建筑业', icon: '🏗️', desc: '建筑工程企业账务处理' },
];

const PAGES = [
  { file: '01-仪表盘', label: '仪表盘' },
  { file: '02-科目余额表', label: '科目余额表' },
  { file: '03-资产负债表', label: '资产负债表' },
  { file: '04-利润表', label: '利润表' },
];

// 构建新截图区域的 HTML
let newSections = '';
for (const ind of INDUSTRIES) {
  newSections += `
      <!-- industry-${ind.id} -->
      <div style="margin-top:20px;padding:12px;background:#f8fafc;border-radius:10px;">
        <div style="font-size:15px;font-weight:700;margin-bottom:10px;">${ind.icon} ${ind.name} <span style="font-weight:400;font-size:13px;color:#666;">— ${ind.desc}</span></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">`;
  for (const pg of PAGES) {
    const key = `${ind.id}_${pg.file}.png`;
    const b64 = b64Map[key];
    if (!b64) {
      console.warn(`  ⚠️ 找不到: ${key}`);
      continue;
    }
    newSections += `
          <div style="text-align:center;">
            <img src="data:image/png;base64,${b64}" style="width:100%;border-radius:8px;border:1px solid #e2e8f0;box-shadow:0 1px 3px rgba(0,0,0,0.08);" loading="lazy">
            <div style="font-size:11px;color:#888;margin-top:4px;">${ind.name} — ${pg.label}</div>
          </div>`;
  }
  newSections += `
        </div>
      </div>`;
}

// 找到截图 section 的末尾（</div> 闭合前的插入点）
const marker = '<!-- ═══ 截图 ═══ -->';
const sectionStart = html.indexOf(marker);
if (sectionStart < 0) {
  console.error('❌ 未找到截图区域标记');
  process.exit(1);
}

// 找到截图区域内的第一个 </div> 闭合（ss-item 或 ss 的结束）
// 从 marker 后开始找，找到插入点（在原始的 ss 闭合前）
const ssEnd = html.indexOf('</div>', sectionStart + 200);
if (ssEnd < 0) {
  console.error('❌ 未找到截图区域结束');
  process.exit(1);
}

// 在 ss 块闭合前插入新内容
const insertPos = html.indexOf('</div>', ssEnd + 10);
if (insertPos < 0) {
  console.error('❌ 未找到 ss 闭合');
  process.exit(1);
}

html = html.slice(0, insertPos) + newSections + '\n    ' + html.slice(insertPos);

writeFileSync(HTML_PATH, html, 'utf-8');
console.log('✅ 商品介绍页截图更新完成！');
console.log(`   新增: ${INDUSTRIES.length}个行业 × ${PAGES.length}页 = ${INDUSTRIES.length * PAGES.length} 张截图`);
