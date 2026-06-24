const fs = require('fs');
let c = fs.readFileSync('docs/教学知识点介绍.html', 'utf8');

// CSS
const cardCSS = `
.ind-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px}
.ind-card{border:1px solid #d8ccc0;border-radius:8px;padding:10px 14px;background:rgba(255,255,255,0.6);transition:all .2s;line-height:1.6}
.ind-card:hover{background:rgba(255,255,255,0.9);box-shadow:0 2px 8px rgba(90,74,42,0.08)}
.ind-card .ic-tag{display:block;font-weight:700;font-size:13px;margin-bottom:2px}
.ind-card .ic-text{font-size:12.5px;color:#4a3a2a}
@media(max-width:600px){.ind-grid{grid-template-columns:1fr}}
[data-theme="dark"] .ind-card{background:rgba(30,26,20,0.6);border-color:#3a2a1a}
[data-theme="dark"] .ind-card:hover{background:rgba(30,26,20,0.9)}
[data-theme="dark"] .ind-card .ic-text{color:#b0a090}
`;
c = c.replace('</style>', cardCSS + '\n</style>');

// 逐个查找 industry-box，智能匹配结束
let count = 0;
let pos = 0;
while (true) {
  const start = c.indexOf('<div class="industry-box">', pos);
  if (start === -1) break;

  // 找到第2个 </div> 才是真正的结束（第1个是 ind-title 的）
  let close1 = c.indexOf('</div>', start);
  if (close1 === -1) break;
  let close2 = c.indexOf('</div>', close1 + 6);
  if (close2 === -1) break;
  const end = close2 + 6;

  const box = c.substring(start, end);
  const before = c.substring(0, start);
  const after = c.substring(end);

  // 提取标题
  const titleMatch = box.match(/<div class="ind-title">([^<]+)<\/div>/);
  const title = titleMatch ? titleMatch[1] : '\u{1F3ED} 四大行业差异对比';

  // 提取行业条目
  const lines = box.split('\n');
  let cards = [];
  for (const line of lines) {
    const m = line.match(/<span class="industry-tag">([^<]*)<\/span>\s*(.+?)(?:<br\s*\/?>)?$/);
    if (m) {
      cards.push({ tag: m[1], text: m[2].trim() });
    }
  }

  if (cards.length > 0) {
    let grid = '<div class="ind-grid">';
    for (const card of cards) {
      grid += '<div class="ind-card"><div class="ic-tag">' + card.tag + '</div><div class="ic-text">' + card.text + '</div></div>';
    }
    grid += '</div>';
    const newBox = '<div class="industry-box"><div class="ind-title">' + title + '</div>' + grid + '</div>';
    c = before + newBox + after;
    count++;
  }
  pos = start + 10;
}

fs.writeFileSync('docs/教学知识点介绍.html', c);
console.log('Done: ' + count + ' industry boxes cardified');
