/**
 * 行业说明框视觉升级
 * - CSS：改得更醒目
 * - HTML：添加"🏭🏪💼🏗️"图标前缀行
 */
const fs = require('fs');
let c = fs.readFileSync('docs/教学知识点介绍.html', 'utf8');

// 1. 升级CSS
const oldCSS = `.industry-box{background:linear-gradient(135deg,#e8f0e0,#dce8d0);border:1px solid #a0c090;border-radius:8px;padding:12px 16px;margin:12px 0;font-size:13px}
	  .industry-box strong{color:#4a7a3a}
	  .industry-tag{display:inline-block;background:#5a7a4a;color:#fff;padding:1px 8px;border-radius:4px;font-size:11px;font-weight:600;margin-right:4px;letter-spacing:0.3px}`;

const newCSS = `.industry-box{background:linear-gradient(135deg,#f8f4ee,#f0e8dc);border:1px solid #c8b8a0;border-radius:10px;padding:16px 20px;margin:16px 0;font-size:13px;box-shadow:0 1px 4px rgba(90,74,42,0.06);line-height:1.7}
	  .industry-box .ind-title{font-size:14px;font-weight:700;color:var(--primary);padding-bottom:8px;margin-bottom:10px;border-bottom:2px solid #d8ccc0;letter-spacing:0.5px}
	  .industry-tag{display:inline-block;background:#5a7a4a;color:#fff;padding:1px 8px;border-radius:4px;font-size:11px;font-weight:700;margin-right:4px;letter-spacing:0.3px}
	  .industry-box .ib{font-weight:600;color:#5a4a2a}`;

if (c.includes(oldCSS)) {
  c = c.replace(oldCSS, newCSS);
  console.log('CSS replaced');
} else {
  console.log('WARNING: CSS pattern not found, check file state');
}

// 2. 升级HTML：给每个行业框添加ind-title头部
// 替换所有 "<div class="industry-box"><strong>🏭 四大行业特殊说明：</strong><br>"
// 为带标题的版本
const oldHeader = '<div class="industry-box"><strong>🏭 四大行业特殊说明：</strong><br>';
const newHeader = '<div class="industry-box"><div class="ind-title">🏭 四大行业差异对比</div>';

const headerCount = (c.match(new RegExp(oldHeader.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
c = c.split(oldHeader).join(newHeader);
console.log(`Header replaced: ${headerCount} occurrences`);

// 3. 给每个行业条目添加图标前缀
// 制造业→🏭、商业企业→🏪、服务业→💼、建筑业→🏗️
// 格式：<span class="industry-tag">制造业</span>
// 改成：<span class="industry-tag">🏭 制造业</span>
c = c.replace(/<span class="industry-tag">制造业<\/span>/g, '<span class="industry-tag">🏭 制造业</span>');
c = c.replace(/<span class="industry-tag">商业企业<\/span>/g, '<span class="industry-tag">🏪 商业企业</span>');
c = c.replace(/<span class="industry-tag">服务业<\/span>/g, '<span class="industry-tag">💼 服务业</span>');
c = c.replace(/<span class="industry-tag">建筑业<\/span>/g, '<span class="industry-tag">🏗️ 建筑业</span>');

fs.writeFileSync('docs/教学知识点介绍.html', c);
console.log('✅ 行业框视觉升级完成！');
console.log('- 添加了 ind-title 标题行');
console.log('- 行业标签加上了🏭🏪💼🏗️图标');
console.log('- 背景色+阴影提升层次感');
