/**
 * 系统使用说明书内容优化
 */
const fs = require('fs');
let c = fs.readFileSync('docs/系统使用说明书.html', 'utf8');

// 1. 出纳路线已锁定提示
c = c.replace(
  '<li>只想学管钱（日记账、对账）→ 选"出纳路线"</li>',
  '<li>只想学管钱（日记账、对账）→ 选"出纳路线" <span class="tag tag-warning">暂未推出</span></li>'
);
c = c.replace(
  '在页面左上角有三个单选按钮——<strong>"📋 全部"</strong>、<strong>"👤 会计路线"</strong>、<strong>"💰 出纳路线"</strong>。',
  '在页面左上角有三个单选按钮——<strong>"📋 全部"</strong>、<strong>"👤 会计路线"</strong>、<strong>"💰 出纳路线"</strong>（出纳路线暂未推出）。'
);

// 2. 出纳管理标记为已锁定
c = c.replace(
  '<h3>9.1 出纳管理</h3>\n<p><strong>路径</strong>：资产管理 → 出纳管理 &nbsp;|&nbsp; <strong>需要角色</strong>：出纳</p>',
  '<h3>9.1 出纳管理 <span class="tag tag-warning">暂未推出</span></h3>\n<p><strong>路径</strong>：资产管理 → 出纳管理 &nbsp;|&nbsp; <strong>需要角色</strong>：出纳（🔒 出纳角色尚未开放）</p>'
);

// 3. FAQ 出纳管理问题更新
c = c.replace(
  '<p><strong>❓ 为什么看不到"出纳管理"这个菜单？</strong><br>\n✅ 因为当前角色不是出纳。看页面右上角→点角色标签→切换到"出纳"即可。</p>',
  '<p><strong>❓ 为什么看不到"出纳管理"这个菜单？</strong><br>\n✅ 出纳角色目前暂未推出。如果你是会计专业的学习者，目前用不到这个模块。后续版本会开放。</p>'
);

// 4. 65节→69节
c = c.replace(
  '共 65 节内容',
  '共 69 节内容'
);

// 5. 简化加密描述（去掉技术细节）
c = c.replace(
  '<p>系统对敏感数据进行了<strong>双轨加密</strong>保护：</p>\n<ul>\n  <li><strong>明文同步写入</strong>：确保读取速度最快</li>\n  <li><strong>AES-GCM 异步加密</strong>：同时保存一份加密版本（2 秒防抖），防止数据被篡改</li>\n  <li>加密范围包括：激活码、设备指纹、场景数据、XP 数据等所有敏感信息</li>\n</ul>',
  '<p>系统对敏感数据进行了<strong>加密保护</strong>：激活码、设备信息、学习进度等关键数据都会加密存储在本地，防止被篡改或泄露。加密和读取都是自动完成的，你不需要做任何额外操作。</p>'
);

// 6. 补充案例库数量
c = c.replace(
  '案例库数据（9个案例）',
  '案例库数据（9个真实企业案例）'
);

// 7. 知识点文档引用更新
c = c.replace(
  '包含会计 12 章 + 出纳 8 章',
  '包含会计 12 章 + 出纳 8 章（共20章）'
);

fs.writeFileSync('docs/系统使用说明书.html', c);
console.log('内容优化完成');
