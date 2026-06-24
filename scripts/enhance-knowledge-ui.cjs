/**
 * 教学知识点 UI 国风改造 + 视觉增强
 * — 水墨国风配色 + 交互提升 —
 */
const fs = require('fs');
let c = fs.readFileSync('docs/教学知识点介绍.html', 'utf8');

// ═══════════════════════════════════════
// 1. 替换 :root 颜色变量为国风配色
// ═══════════════════════════════════════
c = c.replace(
  ':root{--primary:#1a3a5c;--primary-light:#2a5a8c;--accent:#409eff;--bg:#f5f7fa;--card:#fff;--text:#303133;--text-light:#909399;--border:#e8e8e8;--success:#67c23a;--warning:#e6a23c}',
  ':root{--primary:#3a3028;--primary-light:#5a4a3a;--accent:#9a4a42;--accent-light:#b06050;--bg:#f0ebe0;--card:#faf5ed;--text:#3a2a1a;--text-light:#8a7a6a;--border:#d8d0c4;--success:#5a8a5a;--warning:#b08a30}'
);

// ═══════════════════════════════════════
// 2. 替换暗色模式变量
// ═══════════════════════════════════════
c = c.replace(
  '[data-theme="dark"]{--primary:#1a2744;--primary-light:#4a7db5;--accent:#5b8ec9;--bg:#0f0f1a;--card:#1a1a2e;--text:#d0d0e0;--text-light:#808098;--border:#2a2a40}',
  '[data-theme="dark"]{--primary:#1a1a14;--primary-light:#3a2a1a;--accent:#7a3a32;--accent-light:#8a4a42;--bg:#14140e;--card:#1e1a14;--text:#ccc0b0;--text-light:#8a8070;--border:#2a241e;--success:#4a7a4a;--warning:#8a702a}'
);

// ═══════════════════════════════════════
// 3. 替换各信息框颜色
// ═══════════════════════════════════════

// concept-box 浅蓝→暖米
c = c.replace(
  '.concept-box{background:#f0f5ff;border:1px solid #d6e4ff;border-radius:8px;padding:16px 20px;margin:12px 0;font-size:14px}',
  '.concept-box{background:#faf5ed;border:1px solid #e0d8c8;border-radius:8px;padding:16px 20px;margin:12px 0;font-size:14px}'
);
c = c.replace(
  '.concept-box .concept-title{font-weight:600;color:var(--primary-light);margin-bottom:6px;font-size:15px}',
  '.concept-box .concept-title{font-weight:700;color:var(--accent);margin-bottom:8px;font-size:17px;letter-spacing:0.5px}'
);

// keypoint-box 黄调保留但调暖
c = c.replace(
  '.keypoint-box{background:linear-gradient(135deg,#fef9e7,#fef3cd);border:1px solid #f5d76e;border-radius:6px;padding:10px 14px;margin:10px 0}',
  '.keypoint-box{background:linear-gradient(135deg,#faf0d8,#f5e6c8);border:1px solid #d8c08a;border-radius:8px;padding:12px 16px;margin:12px 0}'
);
c = c.replace(
  '.keypoint-box strong{color:#8b6e00}',
  '.keypoint-box strong{color:#8a6a30}'
);
c = c.replace(
  '.keypoint-box ul{margin:4px 0 0 16px}',
  '.keypoint-box ul{margin:6px 0 0 18px}'
);
c = c.replace(
  '.keypoint-box li{font-size:13px;color:#5a4a00;margin-bottom:2px}',
  '.keypoint-box li{font-size:13px;color:#5a4a2a;margin-bottom:3px}'
);

// industry-box 绿调调暖
c = c.replace(
  '.industry-box{background:linear-gradient(135deg,#e8f8f5,#d5f5e3);border:1px solid #82e0aa;border-radius:6px;padding:10px 14px;margin:10px 0;font-size:13px}',
  '.industry-box{background:linear-gradient(135deg,#e8f0e0,#dce8d0);border:1px solid #a0c090;border-radius:8px;padding:12px 16px;margin:12px 0;font-size:13px}'
);
c = c.replace(
  '.industry-box strong{color:#1a6e3a}',
  '.industry-box strong{color:#4a7a3a}'
);
c = c.replace(
  '.industry-tag{display:inline-block;background:#1a6e3a;color:#fff;padding:0 6px;border-radius:3px;font-size:11px;font-weight:600;margin-right:4px}',
  '.industry-tag{display:inline-block;background:#5a7a4a;color:#fff;padding:1px 8px;border-radius:4px;font-size:11px;font-weight:600;margin-right:4px;letter-spacing:0.3px}'
);

// example-box 浅蓝→暖褐
c = c.replace(
  '.example-box{background:linear-gradient(135deg,#f0f7ff,#e6f0ff);border:1px solid #b3d9ff;border-radius:6px;padding:10px 14px;margin:8px 0;font-size:13px;line-height:1.7}',
  '.example-box{background:linear-gradient(135deg,#f5f0e8,#efe8dc);border:1px solid #d0c8b8;border-radius:8px;padding:12px 16px;margin:10px 0;font-size:13px;line-height:1.8}'
);
c = c.replace(
  '.example-box strong{color:#2c6aa0}',
  '.example-box strong{color:#7a4a3a}'
);

// 表格 th 蓝→暖
c = c.replace(
  'th{background:#ecf5ff;font-weight:600;color:var(--primary-light)}',
  'th{background:#e0d8cc;font-weight:700;color:#3a2a1a;letter-spacing:0.3px}'
);
c = c.replace(
  'tr:nth-child(even){background:#fafafa}',
  'tr:nth-child(even){background:#f5f0e8}'
);

// 封面 蓝→暖
c = c.replace(
  '.cover-section{text-align:center;padding:40px 20px 20px;background:linear-gradient(135deg,#f0f5ff,#e6f0ff);border-radius:16px;margin-bottom:32px}',
  '.cover-section{text-align:center;padding:40px 20px 20px;background:linear-gradient(135deg,#f5f0e8,#efe8dc);border-radius:16px;margin-bottom:32px;border:1px solid #e0d8c8}'
);
c = c.replace(
  '.cover-section h1{font-size:32px;color:var(--primary);margin:0 0 8px}',
  '.cover-section h1{font-size:34px;color:var(--primary);margin:0 0 8px;letter-spacing:2px}'
);

// 学习路线图
c = c.replace(
  '.roadmap-box{background:linear-gradient(135deg,#fff9e6,#fff3cc);border:2px solid #f0d060;border-radius:12px;padding:20px 24px;margin:20px 0;font-size:14px}',
  '.roadmap-box{background:linear-gradient(135deg,#faf0d8,#f5e6c8);border:2px solid #d0b870;border-radius:12px;padding:20px 24px;margin:20px 0;font-size:14px}'
);
c = c.replace(
  '.roadmap-box h4{color:#8b6e00;margin-top:0;font-size:16px}',
  '.roadmap-box h4{color:#7a5a20;margin-top:0;font-size:17px}'
);
c = c.replace(
  '.roadmap-num{background:#8b6e00;color:#fff;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;flex-shrink:0}',
  '.roadmap-num{background:#7a5a20;color:#fff;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:15px;flex-shrink:0}'
);
c = c.replace(
  '.roadmap-step{display:flex;align-items:flex-start;gap:12px;margin:10px 0;padding:8px 12px;background:rgba(255,255,255,0.7);border-radius:6px}',
  '.roadmap-step{display:flex;align-items:flex-start;gap:12px;margin:10px 0;padding:10px 14px;background:rgba(255,255,255,0.5);border-radius:8px;border:1px solid rgba(208,184,112,0.2)}'
);

// ch-intro 深蓝→深墨
c = c.replace(
  '.ch-intro{background:var(--primary);color:#fff;border-radius:10px;padding:18px 22px;margin:12px 0 20px}',
  '.ch-intro{background:var(--primary);color:#f0e8dc;border-radius:10px;padding:18px 22px;margin:12px 0 20px;border-left:4px solid var(--accent)}'
);
c = c.replace(
  '.ch-intro strong{color:#ffd700;font-size:16px}',
  '.ch-intro strong{color:#d4b86a;font-size:16px}'
);
c = c.replace(
  '.ch-intro p{color:rgba(255,255,255,0.85);margin:4px 0 0}',
  '.ch-intro p{color:rgba(240,232,220,0.85);margin:4px 0 0}'
);

// quick-link 白色→暖白
c = c.replace(
  '.quick-link{background:var(--card);border:1px solid var(--border);border-radius:8px;padding:10px 16px;text-decoration:none;color:var(--text);font-size:13px;transition:all .2s}',
  '.quick-link{background:var(--card);border:1px solid var(--border);border-radius:10px;padding:10px 18px;text-decoration:none;color:var(--text);font-size:14px;font-weight:600;transition:all .2s;box-shadow:0 1px 4px rgba(0,0,0,0.04)}'
);
c = c.replace(
  '.quick-link:hover{border-color:var(--accent);box-shadow:0 2px 8px rgba(64,158,255,0.15);transform:translateY(-1px)}',
  '.quick-link:hover{border-color:var(--accent);box-shadow:0 4px 12px rgba(154,74,66,0.12);transform:translateY(-2px)}'
);

// teach-link 蓝→砖红
c = c.replace(
  '.teach-link{display:inline-block;background:var(--accent);color:#fff;padding:2px 10px;border-radius:4px;font-size:12px;text-decoration:none;margin:2px 0}',
  '.teach-link{display:inline-block;background:var(--accent);color:#fff;padding:2px 10px;border-radius:4px;font-size:12px;text-decoration:none;margin:2px 0;transition:background .2s}'
);
c = c.replace(
  '.teach-link:hover{background:#2a7ed4}',
  '.teach-link:hover{background:var(--accent-light)}'
);

// tag-pill 蓝→暖
c = c.replace(
  '.tag-pill{display:inline-block;background:#ecf5ff;color:#337ecc;padding:1px 8px;border-radius:10px;font-size:11px;margin:1px}',
  '.tag-pill{display:inline-block;background:#e0d8cc;color:#5a3a2a;padding:1px 8px;border-radius:10px;font-size:11px;margin:1px}'
);

// 搜索栏
c = c.replace(
  '.search-bar{background:var(--card);border:1px solid var(--border);border-radius:8px;padding:10px 14px;margin:0 0 16px;display:flex;align-items:center;gap:10px}',
  '.search-bar{background:var(--card);border:1px solid var(--border);border-radius:10px;padding:10px 14px;margin:0 0 16px;display:flex;align-items:center;gap:10px;box-shadow:0 1px 4px rgba(0,0,0,0.04)}'
);
c = c.replace(
  '.search-bar input{flex:1;border:none;outline:none;font-size:15px;color:var(--text);background:transparent;padding:4px 0}',
  '.search-bar input{flex:1;border:none;outline:none;font-size:15px;color:var(--text);background:transparent;padding:4px 0;letter-spacing:0.3px}'
);

// 封面统计
c = c.replace(
  '.cover-stat{text-align:center;padding:12px 20px;background:var(--card);border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.06);min-width:100px}',
  '.cover-stat{text-align:center;padding:14px 24px;background:var(--card);border-radius:12px;box-shadow:0 2px 8px rgba(58,42,26,0.06);min-width:100px;border:1px solid var(--border)}'
);
c = c.replace(
  '.cover-stat .num{font-size:28px;font-weight:700;color:var(--primary)}',
  '.cover-stat .num{font-size:30px;font-weight:800;color:var(--accent)}'
);

// sidebar 顶部条
c = c.replace(
  '.top-bar{background:var(--primary);color:#fff;padding:12px 24px;display:none;align-items:center;gap:12px;font-size:15px;font-weight:600}',
  '.top-bar{background:var(--primary);color:#f0e8dc;padding:12px 24px;display:none;align-items:center;gap:12px;font-size:15px;font-weight:600;border-bottom:1px solid rgba(240,232,220,0.1)}'
);

// 概念/关键点 标题色
c = c.replace(
  '.concept-box .concept-title{font-weight:600;color:var(--primary-light);margin-bottom:6px;font-size:15px}',
  '.concept-box .concept-title{font-weight:700;color:var(--accent);margin-bottom:8px;font-size:17px;letter-spacing:0.5px}'
);

// ═══════════════════════════════════════
// 4. 暗色模式覆盖色调整
// ═══════════════════════════════════════
c = c.replace(
  '[data-theme="dark"] .concept-box{background:#1a2540;border-color:#2a3a5c}',
  '[data-theme="dark"] .concept-box{background:#1a1612;border-color:#2a241e}'
);
c = c.replace(
  '[data-theme="dark"] .keypoint-box{background:linear-gradient(135deg,#2a2510,#1a1a0e);border-color:#5a4a10}',
  '[data-theme="dark"] .keypoint-box{background:linear-gradient(135deg,#2a2216,#1e1a12);border-color:#4a3a20}'
);
c = c.replace(
  '[data-theme="dark"] .keypoint-box li{color:#b0a050}',
  '[data-theme="dark"] .keypoint-box li{color:#a09070}'
);
c = c.replace(
  '[data-theme="dark"] .keypoint-box strong{color:#d4b020}',
  '[data-theme="dark"] .keypoint-box strong{color:#c0a84a}'
);
c = c.replace(
  '[data-theme="dark"] .industry-box{background:linear-gradient(135deg,#0a2a1a,#0a1a10);border-color:#1a4a2a}',
  '[data-theme="dark"] .industry-box{background:linear-gradient(135deg,#1a2a14,#121e0e);border-color:#2a4a2a}'
);
c = c.replace(
  '[data-theme="dark"] .industry-box strong{color:#52c48a}',
  '[data-theme="dark"] .industry-box strong{color:#7ab06a}'
);
c = c.replace(
  '[data-theme="dark"] .example-box{background:linear-gradient(135deg,#0a1a3a,#0a102a);border-color:#1a3a6a}',
  '[data-theme="dark"] .example-box{background:linear-gradient(135deg,#1a1612,#14100e);border-color:#2a241e}'
);
c = c.replace(
  '[data-theme="dark"] .example-box strong{color:#5b9ec9}',
  '[data-theme="dark"] .example-box strong{color:#b08a7a}'
);
c = c.replace(
  '[data-theme="dark"] .cover-section{background:linear-gradient(135deg,#1a2540,#0f1a2e)}',
  '[data-theme="dark"] .cover-section{background:linear-gradient(135deg,#1e1a14,#14100e);border-color:#2a241e}'
);
c = c.replace(
  '[data-theme="dark"] .roadmap-box{background:linear-gradient(135deg,#2a2510,#1a1a0e);border-color:#5a4a10}',
  '[data-theme="dark"] .roadmap-box{background:linear-gradient(135deg,#2a2216,#1e1a12);border-color:#4a3a20}'
);
c = c.replace(
  '[data-theme="dark"] .roadmap-box h4{color:#d4b020}',
  '[data-theme="dark"] .roadmap-box h4{color:#c0a84a}'
);
c = c.replace(
  '[data-theme="dark"] .roadmap-step{background:rgba(255,255,255,0.05)}',
  '[data-theme="dark"] .roadmap-step{background:rgba(255,255,255,0.03);border-color:rgba(74,58,32,0.3)}'
);
c = c.replace(
  '[data-theme="dark"] .quick-link{background:var(--card);border-color:var(--border);color:var(--text)}',
  '[data-theme="dark"] .quick-link{background:var(--card);border-color:var(--border);color:var(--text);box-shadow:0 1px 4px rgba(0,0,0,0.1)}'
);
c = c.replace(
  '[data-theme="dark"] .cover-stat{background:var(--card)}',
  '[data-theme="dark"] .cover-stat{background:var(--card);border-color:var(--border)}'
);
c = c.replace(
  '[data-theme="dark"] th{background:#1a2540;color:var(--text)}',
  '[data-theme="dark"] th{background:#2a241e;color:#ccc0b0}'
);
c = c.replace(
  '[data-theme="dark"] tr:nth-child(even){background:#151520}',
  '[data-theme="dark"] tr:nth-child(even){background:#1a1612}'
);
c = c.replace(
  '[data-theme="dark"] .ch-intro{background:#1a2744}',
  '[data-theme="dark"] .ch-intro{background:#1a1a14}'
);
c = c.replace(
  '[data-theme="dark"] .teach-link{background:#3a6a9a}',
  '[data-theme="dark"] .teach-link{background:#6a3a32}'
);
c = c.replace(
  '[data-theme="dark"] .tag-pill{background:#2a3a5c;color:#8ab4f8}',
  '[data-theme="dark"] .tag-pill{background:#2a241e;color:#a09080}'
);

// ═══════════════════════════════════════
// 5. 追加 UI 增强样式
// ═══════════════════════════════════════
const enh = `
/* ═══════════════════════════════════════
   国风 UI 增强
   ═══════════════════════════════════════ */
html{scroll-behavior:smooth;scroll-padding-top:20px}

/* 章节标题左红条 */
h4{font-size:17px !important;color:var(--primary) !important;padding-left:14px;border-left:4px solid var(--accent);margin:36px 0 16px !important;line-height:1.5}
#board-accounting{font-size:22px !important;padding:16px 0 8px;margin-top:40px !important;color:var(--primary) !important}
#board-accounting:before{content:"📒 ";font-size:22px}
#board-cashier{font-size:22px !important;padding:16px 0 8px;margin-top:40px !important;color:var(--primary) !important}
#board-cashier:before{content:"💰 ";font-size:22px}

/* 信息框悬停效果 */
.concept-box,.keypoint-box,.example-box,.industry-box{transition:all .25s ease;position:relative}
.concept-box:hover,.keypoint-box:hover,.example-box:hover,.industry-box:hover{box-shadow:0 4px 16px rgba(58,42,26,0.08);transform:translateY(-1px)}
.concept-box{border-left:4px solid var(--accent) !important}
.keypoint-box{border-left:4px solid #c0a04a !important}
.keypoint-box:before{content:"⭐";margin-right:4px;font-size:14px}
.industry-box{border-left:4px solid #6a9a5a !important}
.example-box{border-left:4px solid #b08a7a !important}

/* 表格圆角+阴影 */
table{border-radius:10px;overflow:hidden;box-shadow:0 1px 4px rgba(58,42,26,0.04)}
th{padding:10px 12px;font-size:13.5px;text-align:center}
td{padding:9px 12px}
tr:hover td{background:#e8e0d4 !important}

/* 封面装饰 */
.cover-section{position:relative;overflow:hidden}
.cover-section:after{content:"";position:absolute;top:-40%;right:-20%;width:300px;height:300px;background:radial-gradient(circle,rgba(154,74,66,0.04),transparent 70%);pointer-events:none;border-radius:50%}
.cover-section h1{position:relative}
.cover-stat:hover{transform:translateY(-3px);box-shadow:0 6px 20px rgba(58,42,26,0.08)}

/* 引用块 */
blockquote{border-left:4px solid var(--accent);background:linear-gradient(135deg,rgba(154,74,66,0.04),transparent);padding:10px 16px;border-radius:0 8px 8px 0;margin:10px 0;font-size:14px;line-height:1.7}

/* 分隔线 */
.section-sep{border:none !important;height:1px;background:linear-gradient(90deg,transparent,var(--border),transparent);margin:36px 0 !important}

/* 返回顶部按钮 */
#backToTop{position:fixed;bottom:30px;right:30px;z-index:9998;width:44px;height:44px;border:1px solid rgba(240,232,220,0.2);border-radius:50%;background:var(--primary);color:#f0e8dc;font-size:20px;cursor:pointer;box-shadow:0 3px 12px rgba(58,42,26,0.2);transition:all .3s;opacity:0;transform:translateY(20px);pointer-events:none;display:flex;align-items:center;justify-content:center}
#backToTop.show{opacity:1;transform:translateY(0);pointer-events:auto}
#backToTop:hover{background:var(--accent);transform:translateY(-3px);box-shadow:0 6px 20px rgba(154,74,66,0.3)}
[data-theme="dark"] #backToTop{box-shadow:0 3px 12px rgba(0,0,0,0.4)}

/* 内容区宽度优化 */
#content{max-width:1000px}
.content-inner{padding:40px 56px 100px}

@media(max-width:900px){
  .content-inner{padding:16px 16px 70px}
  h4{padding-left:10px;font-size:16px !important}
  .cover-stat .num{font-size:24px !important}
  .cover-section h1{font-size:24px !important}
  .cover-stats{gap:10px}
  .cover-stat{padding:10px 16px;min-width:80px}
  #backToTop{bottom:20px;right:16px;width:38px;height:38px;font-size:16px}
  table{font-size:13px}
  th,td{padding:6px 8px}
}
@media(max-width:480px){
  body{font-size:14px}
  .content-inner{padding:12px 12px 60px}
  h4{font-size:15px !important;padding-left:8px}
  .concept-box,.keypoint-box{padding:12px 14px;font-size:13px}
  .example-box,.industry-box{padding:10px 12px;font-size:12px !important}
  .industry-tag{font-size:10px}
  .cover-stat .num{font-size:20px !important}
  .cover-stat{padding:8px 10px;min-width:70px}
  .quick-link{padding:8px 12px !important;font-size:12px !important}
  blockquote{padding:8px 12px;font-size:13px}
  #backToTop{bottom:16px;right:12px;width:34px;height:34px;font-size:14px}
}

/* 暗色模式补充 */
[data-theme="dark"] .concept-box:hover,[data-theme="dark"] .keypoint-box:hover,
[data-theme="dark"] .example-box:hover,[data-theme="dark"] .industry-box:hover{box-shadow:0 4px 16px rgba(0,0,0,0.3)}
[data-theme="dark"] tr:hover td{background:rgba(58,42,26,0.15) !important}
[data-theme="dark"] .cover-stat:hover{box-shadow:0 6px 20px rgba(0,0,0,0.3)}
[data-theme="dark"] .roadmap-step:hover{box-shadow:0 3px 12px rgba(0,0,0,0.3)}
[data-theme="dark"] blockquote{background:linear-gradient(135deg,rgba(154,74,66,0.06),transparent)}
`;

c = c.replace('</style>', enh + '\n</style>');

// ═══════════════════════════════════════
// 6. 返回顶部按钮 HTML + JS
// ═══════════════════════════════════════
c = c.replace('</body>', `
<button id="backToTop" onclick="window.scrollTo({top:0,behavior:'smooth'})" title="返回顶部">↑</button>
<script>
window.addEventListener('scroll',function(){
  document.getElementById('backToTop').classList.toggle('show',window.scrollY>400);
});
</script>
</body>`);

// ═══════════════════════════════════════
// 7. 版本号更新
// ═══════════════════════════════════════
c = c.replace('文档版本 v3.1', '文档版本 v3.2');
c = c.replace('共 20 章 69 节 · 面向零基础实习生', '共 20 章 69 节 · 会计+出纳系统教学书');

fs.writeFileSync('docs/教学知识点介绍.html', c);
console.log('✅ 国风 UI 改造完成！');
console.log('  - 宣纸米白底色 + 墨色文字');
console.log('  - 哑光砖红强调色');
console.log('  - 暖色信息框（概念/要点/行业/举例）');
console.log('  - 表格/封面/引用块统一国风配色');
console.log('  - 返回顶部按钮 + 悬停效果');
console.log('  - 暗色模式同步适配');
console.log('  - 版本 v3.1 → v3.2');
