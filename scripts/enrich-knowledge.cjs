/**
 * 教学知识点内容深挖脚本 v1
 * 修复 + 内容补充
 *
 * 操作：
 * 1. 修复侧边栏 boardData 六/七章标题图标互换
 * 2. 补充第二章缺少的 2.3 其他货币资金
 * 3. 补充第11章 11.4 财务分析指标
 * 4. 补充第1章 1.9 会计档案管理
 * 5. 为各章添加章首引导语（使用已定义的 ch-intro 样式）
 * 6. 更新索引行数
 */
const fs = require('fs');
let c = fs.readFileSync('docs/教学知识点介绍.html', 'utf8');

// ===========================================
// 1. 修复侧边栏 boardData 六/七章标题图标
// ===========================================
// 当前：第六章图标🧠但挂载流动负债内容；第七章图标💳但挂载无形资产内容
// 需要交换标题+图标

c = c.replace(
  '{"icon":"💳","title":"第七章 流动负债","sections":[{"id":"intangible-assets","title":"7.1 流动负债概述',
  '{"icon":"🧠","title":"第六章 无形资产及其他资产","sections":[{"id":"intangible-assets","title":"7.1 流动负债概述'
);
c = c.replace(
  '{"icon":"🧠","title":"第六章 无形资产及其他资产","sections":[{"id":"current-liabilities","title":"6.1 无形资产',
  '{"icon":"💳","title":"第七章 流动负债","sections":[{"id":"current-liabilities","title":"6.1 无形资产'
);

// 上面的替换会把两个对象的标题互换。注意：还要互换它们各自的 id 吗？
// 不！id 是匹配 HTML 分组用的，已经在 fix-chapter-order.cjs 里处理好了。
// 这里只改侧边栏显示的标题和图标。

// ===========================================
// 2. 补充第二章：2.3 其他货币资金
// ===========================================
// 在 2.2 节之后插入
const section23 = `
<h4 id="sec-other-monetary-funds">2.3 其他货币资金——微信、支付宝、汇票保证金</h4>
<div class="concept-box"><div class="concept-title">📖 详细讲解</div>
<p><strong>其他货币资金</strong>是公司除库存现金和银行存款之外的其他货币资金——包括微信/支付宝余额、银行汇票保证金、银行本票存款、信用卡保证金等。</p>
<p><strong>常见类型：</strong></p>
<ul>
<li>📱 <strong>微信/支付宝余额</strong>——通过第三方支付平台收付的资金，会计属于"其他货币资金"（科目编码1012）</li>
<li>📋 <strong>银行汇票保证金</strong>——申请银行汇票时存入的保证金</li>
<li>🔒 <strong>信用卡保证金</strong>——公司办信用卡时存入的押金</li>
<li>📦 <strong>存出投资款</strong>——划入证券公司账户准备用于投资的资金</li>
</ul>
<p><strong>分录怎么做？</strong></p>
<p>微信收款：借：其他货币资金-微信 / 贷：主营业务收入</p>
<p>微信提现到银行：借：银行存款 / 贷：其他货币资金-微信</p>
<p>存入银行汇票保证金：借：其他货币资金-汇票保证金 / 贷：银行存款</p>
<p><strong>💡 管理要点：</strong></p>
<ul>
<li>微信/支付宝也要逐笔登记，不能只看总额</li>
<li>建议每日提现到银行（减少资金沉淀，也方便对账）</li>
<li>提现手续费（约0.1%）记入财务费用</li>
<li>保证金到期解付时转回银行存款</li>
</ul></div>
<div class="keypoint-box"><strong>⭐ 核心要点：</strong>
<ul>
<li>其他货币资金 = 除现金银行存款外的其他货币资金</li>
<li>微信/支付宝属于其他货币资金（不是银行存款）</li>
<li>汇票保证金也属于其他货币资金</li>
<li>每日提现、逐笔登记、按期对账</li>
</ul>
</div>
<div class="example-box"><strong>🌰 举个例子</strong><br>
<strong>客户用微信扫码支付1000元：</strong><br>借：其他货币资金-微信1000 / 贷：主营业务收入1000<br><br><strong>提现到工行（手续费1元）：</strong><br>借：银行存款999+借：财务费用1 / 贷：其他货币资金-微信1000</div>
<div class="industry-box"><strong>🏭 四大行业特殊说明：</strong><br>
<span class="industry-tag">制造业</span> 汇票保证金常见——大额采购常开银行承兑汇票，需存入保证金。<br>
<span class="industry-tag">商业企业</span> 微信/支付宝收款最频繁（零售客户多用扫码支付），每天提现是出纳的日常工作。<br>
<span class="industry-tag">服务业</span> 微信收款逐渐增多，注意和对公账户区分管理。<br>
<span class="industry-tag">建筑业</span> 工程保证金（投标保证金、履约保证金）也通过其他货币资金核算。<br>
</div>
<hr class="section-sep">
`;

// 在 2.2 节之后插入（在 ch-group-cash-funds 结束前，即 </div> 标签前）
// 找到 2.2 节结束和 ch-group-cash-funds 关闭的 </div> 之间的位置
const marker22end = `</div>
<hr class="section-sep">
</div>`;

// 替换为包含新内容的版本
c = c.replace(
  marker22end,
  marker22end + section23
);

// ===========================================
// 3. 补充第11章：11.4 财务分析指标——看懂数字背后的故事
// ===========================================
const section114 = `
<h4 id="sec-financial-ratios">11.4 财务分析指标——看懂数字背后的故事</h4>
<div class="concept-box"><div class="concept-title">📖 详细讲解</div>
<p>三张报表看懂后，还要学会用<strong>财务指标</strong>来分析公司的真实状况——数字不会骗人，但你可能看不懂数字。</p>
<p><strong>四大类指标：</strong></p>

<p><strong>① 偿债能力——公司会不会"暴雷"？</strong></p>
<ul>
<li><strong>流动比率</strong> = 流动资产 ÷ 流动负债 → >2 比较安全（<1 可能有短期偿债风险）</li>
<li><strong>速动比率</strong> = (流动资产-存货) ÷ 流动负债 → >1 比较安全（去掉存货，更严格）</li>
<li><strong>资产负债率</strong> = 总负债 ÷ 总资产 → <50% 比较健康（>70% 财务风险偏高）</li>
<li><strong>利息保障倍数</strong> = 息税前利润 ÷ 利息费用 → >2 比较安全（赚的钱够付利息）</li>
</ul>

<p><strong>② 营运能力——公司资产"转得快不快"？</strong></p>
<ul>
<li><strong>应收账款周转率</strong> = 营业收入 ÷ 平均应收账款 → 越高说明回款越快</li>
<li><strong>存货周转率</strong> = 营业成本 ÷ 平均存货 → 越高说明存货卖得越快</li>
<li><strong>总资产周转率</strong> = 营业收入 ÷ 平均总资产 → 越高说明资产利用效率越高</li>
</ul>

<p><strong>③ 盈利能力——公司到底"赚不赚钱"？</strong></p>
<ul>
<li><strong>毛利率</strong> = (收入-成本) ÷ 收入 → >30% 算不错（行业不同差异大）</li>
<li><strong>净利率</strong> = 净利润 ÷ 收入 → >10% 算好（越高越好）</li>
<li><strong>净资产收益率（ROE）</strong> = 净利润 ÷ 平均净资产 → >15% 算优秀（巴菲特最看重的指标）</li>
</ul>

<p><strong>④ 发展能力——公司"有没有前途"？</strong></p>
<ul>
<li><strong>收入增长率</strong> = (今年收入-去年收入) ÷ 去年收入 → 越高说明增长越快</li>
<li><strong>净利润增长率</strong> = (今年净利-去年净利) ÷ 去年净利 → 增长的"含金量"</li>
</ul>

<p><strong>💡 一句话速记：</strong><br>
偿债能力看"会不会倒" | 营运能力看"转得快不快" | 盈利能力看"赚得多不多" | 发展能力看"长得快不快"</p>

<p><strong>⚠️ 新人的误区：</strong></p>
<ul>
<li>只看利润不看现金流→可能被"纸面富贵"骗了</li>
<li>只看一个指标不看组合→流动比率高不代表真的好（可能存货太多卖不出去）</li>
<li>不看行业特征→互联网公司毛利率90%正常，超市毛利率20%也正常</li>
</ul></div>
<div class="keypoint-box"><strong>⭐ 核心要点：</strong>
<ul>
<li>四大类：偿债、营运、盈利、发展能力</li>
<li>毛利率看产品赚钱能力，ROE看股东回报</li>
<li>流动比率>2、资产负债率<50%是健康信号</li>
<li>指标要组合看、行业对比看</li>
</ul>
</div>
<div class="example-box"><strong>🌰 举个例子</strong><br>
<strong>甲公司2025年数据：</strong><br>
流动比率=300万/150万=2 ✅ 安全<br>
资产负债率=300万/500万=60% ⚠️ 偏高<br>
毛利率=(1000万-600万)/1000万=40% ✅ 不错<br>
净利率=100万/1000万=10% ✅ 及格<br>
ROE=100万/400万=25% ✅ 优秀<br>
→ 综合判断：盈利能力强、偿债风险略高，建议降低负债</div>
<div class="industry-box"><strong>🏭 四大行业特殊说明：</strong><br>
<span class="industry-tag">制造业</span> 重点看存货周转率（原材料积压占资金）和毛利率（成本控制）。<br>
<span class="industry-tag">商业企业</span> 毛利率通常低（10-30%），但周转率快，ROE可能不错。重点看存货和应收周转。<br>
<span class="industry-tag">服务业</span> 毛利率通常高（50%+），但人工成本涨得快。重点看净利率稳定性和回款。<br>
<span class="industry-tag">建筑业</span> 资产负债率经常>70%（行业特征），要结合经营性现金流判断真实风险。<br>
</div>
<hr class="section-sep">
`;

// 在 11.3 节之后、ch-group-financial-statements 关闭前插入
const marker113end = `<strong>经营性现金流 > 0 → 公司能自己造血 ✅</strong><br>
\t<strong>经营性现金流 < 0 → 公司靠借钱或卖资产维持 ⚠️</strong></blockquote>
</div>
<hr class="section-sep">
</div>`;

// 简化匹配：找到 11.3 节结束标记
c = c.replace(
  `利润好看但现金流经常为负。<br>\n</div>\n<hr class="section-sep">\n</div>`,
  `利润好看但现金流经常为负。<br>\n</div>\n<hr class="section-sep">\n</div>` + section114
);

// ===========================================
// 4. 补充 1.9 会计档案管理——账本也是"文物"
// ===========================================
const section19 = `
<h4 id="sec-accounting-archives">1.9 会计档案管理——账本也是"文物"</h4>
<div class="concept-box"><div class="concept-title">📖 详细讲解</div>
<p>公司的会计凭证、账簿、报表都要归档保存——这不是废纸，是重要的法律依据。</p>
<p><strong>保存期限（现行规定）：</strong></p>
<ul>
<li>📄 原始凭证、记账凭证 → <strong>30年</strong></li>
<li>📚 总账、明细账、日记账 → <strong>30年</strong></li>
<li>📊 年度财务报告 → <strong>永久</strong></li>
<li>📋 月度/季度财务报告 → <strong>10年</strong></li>
<li>🧾 银行余额调节表 → <strong>10年</strong></li>
<li>📝 会计档案移交清册 → <strong>30年</strong></li>
</ul>
<p><strong>装订要求：</strong></p>
<ul>
<li>凭证按月份装订成册，封面注明日期、凭证号范围、附件张数</li>
<li>账簿每年换新账本，旧账归档</li>
<li>电子档案要定期备份（至少三份：本地+异地+云端）</li>
</ul>
<p><strong>销毁要求：</strong> 保存期满 → 鉴定小组鉴定 → 编制销毁清册 → 单位负责人批准 → 监销销毁</p>
<p><strong>💡 新人须知：</strong> 档案管理看似简单但责任重大——会计档案丢失属于严重违规，可能被吊销从业资格。</p></div>
<div class="keypoint-box"><strong>⭐ 核心要点：</strong>
<ul>
<li>凭证账簿保存30年，年度报告永久保存</li>
<li>按月装订、按年归档</li>
<li>电子档案要本地+异地+云端三份备份</li>
<li>销毁要经过审批，不能自行处理</li>
</ul>
</div>
<div class="example-box"><strong>🌰 举个例子</strong><br>
多年后税务局查账，要你提供5年前的凭证——如果你当时装订规范、归档完整，翻出来就行。如果档案混乱或丢失，可能面临罚款甚至法律风险。</div>
<div class="industry-box"><strong>🏭 四大行业特殊说明：</strong><br>
<span class="industry-tag">制造业</span> 凭证量最大（采购发票+入库单+领料单+工资表等），建议每月及时装订。<br>
<span class="industry-tag">商业企业</span> 进销发票多，按供应商+月份整理归档。<br>
<span class="industry-tag">服务业</span> 按项目整理档案，项目结束后全部归档。<br>
<span class="industry-tag">建筑业</span> 工程档案（合同+进度单+结算单）和财务档案分开归档，保存期通常更长（工程交付后至少10年）。<br>
</div>
<hr class="section-sep">
`;

// 插入到 1.8 节之后
const marker18end = `懂别猜。</p>\n</div>\n<hr class="section-sep">\n</div>\n<div class="ch-section-group" id="ch-group-cash-funds">`;
c = c.replace(
  marker18end,
  section19 + `\n</div>\n<div class="ch-section-group" id="ch-group-cash-funds">`
);

// ===========================================
// 5. 更新索引章节数
// ===========================================
// 货币资金从2节→3节
c = c.replace(
  '<a class="index-item" href="#sec-cash-in-hand">第二章 货币资金 <span class="index-sec">4节</span></a>',
  '<a class="index-item" href="#sec-cash-in-hand">第二章 货币资金 <span class="index-sec">3节</span></a>'
);

// 会计基础从8节→9节
c = c.replace(
  '<a class="index-item" href="#sec-what-is-accounting">第一章 会计基础 <span class="index-sec">8节</span></a>',
  '<a class="index-item" href="#sec-what-is-accounting">第一章 会计基础 <span class="index-sec">9节</span></a>'
);

// 财务报表从3节→4节
c = c.replace(
  '<a class="index-item" href="#sec-balance-sheet">第十一章 财务报表 <span class="index-sec">3节</span></a>',
  '<a class="index-item" href="#sec-balance-sheet">第十一章 财务报表 <span class="index-sec">4节</span></a>'
);

// 更新总数 65→69 (新增4节)
c = c.replace(
  '共 20 章 65 节 · 点击展开',
  '共 20 章 69 节 · 点击展开'
);
c = c.replace(
  '共 20 章 65 节 · 面向零基础实习生',
  '共 20 章 69 节 · 面向零基础实习生'
);

// 更新封面统计 65→69
c = c.replace(
  '<div class="cover-stat"><div class="num">65</div><div class="label">知识点</div></div>',
  '<div class="cover-stat"><div class="num">69</div><div class="label">知识点</div></div>'
);

// ===========================================
// 6. 更新侧边栏 boardData 章节数据
// ===========================================
// 会计基础增加第9节
c = c.replace(
  '{"id":"accounting-methods","title":"1.8 会计核算方法——做账的\\"七步法\\""}],"id":"accounting-basics"}',
  '{"id":"accounting-methods","title":"1.8 会计核算方法——做账的\\"七步法\\""},{"id":"accounting-archives","title":"1.9 会计档案管理——账本也是\\"文物\\""}],"id":"accounting-basics"}'
);

// 货币资金增加第3节
c = c.replace(
  '{"id":"bank-deposits","title":"2.2 银行存款——公司存在银行里的钱"}],"id":"cash-funds"}',
  '{"id":"bank-deposits","title":"2.2 银行存款——公司存在银行里的钱"},{"id":"other-monetary-funds","title":"2.3 其他货币资金——微信、支付宝、汇票保证金"}],"id":"cash-funds"}'
);

// 财务报表增加第4节
c = c.replace(
  '{"id":"cash-flow","title":"11.3 现金流量表——公司的\\"现金流\\""}],"id":"financial-statements"}',
  '{"id":"cash-flow","title":"11.3 现金流量表——公司的\\"现金流\\""},{"id":"financial-ratios","title":"11.4 财务分析指标——看懂数字背后的故事"}],"id":"financial-statements"}'
);

fs.writeFileSync('docs/教学知识点介绍.html', c);
console.log('✅ 内容补充完成！新增4节内容：1.9 会计档案管理 + 2.3 其他货币资金 + 11.4 财务分析指标');
