import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.join(__dirname, '..', '观测者财务_商品介绍_闲鱼拼多多.html');
const imgDir = path.join(__dirname, '商品截图');

let html = fs.readFileSync(htmlPath, 'utf-8');

const screenshots = [
  { placeholder: '🏠', label: '仪表盘', file: '01-仪表盘.png' },
  { placeholder: '💰', label: '科目余额表', file: '02-科目余额表.png' },
  { placeholder: '📊', label: '资产负债表', file: '03-资产负债表.png' },
  { placeholder: '📈', label: '利润表', file: '04-利润表.png' },
];

for (const ss of screenshots) {
  const imgPath = path.join(imgDir, ss.file);
  if (!fs.existsSync(imgPath)) {
    console.error(`❌ 找不到: ${ss.file}`);
    continue;
  }
  const ext = path.extname(ss.file).slice(1);
  const b64 = fs.readFileSync(imgPath).toString('base64');
  const dataUri = `data:image/${ext};base64,${b64}`;

  // 替换 <div class="ph">🏠</div> -> <div class="ph"><img src="..."></div>
  const oldPh = `<div class="ph">${ss.placeholder}</div>`;
  const newPh = `<div class="ph"><img src="${dataUri}" alt="${ss.label}"></div>`;
  html = html.replace(oldPh, newPh);
  console.log(`✅ ${ss.file}: ${(b64.length / 1024).toFixed(0)}KB`);
}

fs.writeFileSync(htmlPath, html, 'utf-8');
console.log('\n✅ HTML 截图嵌入完成!');
