# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

**技术栈**：Vue3 + Element Plus + Vite，已集成 **Tauri v2** 打包桌面应用。
**Rust 后端**：`src-tauri/` — 硬件指纹 + AES-256-GCM 加密
**开发语言**：JavaScript（Vue3 SFC）
**系统名称**：観測者企业财务模拟系统（教学用）
**包管理**：npm | **package.json 为 `"type": "module"`**（ESM 项目，脚本需 .cjs 后缀）

**测试框架**：Vitest + @vue/test-utils（**503 项测试**，6 个文件）+ Playwright e2e（56 项）

| 测试文件 | 数量 | 覆盖 |
|:---------|:----:|:-----|
| `tutorial.test.js` | ~250 | 四大行业教学数据验证 |
| `store.test.js` | ~100 | Store核心：科目/凭证/过账/场景 |
| `accounting.test.js` | ~67 | 会计引擎：余额计算/试算平衡/公式/精度校验/期末结转 |
| `cases.test.js` | ~30 | 案例数据加载/切换/报表 |
| `security.test.js` | ~46 | 激活码/加密存储/完整性自检（含20项边界值测试） |
| `submit.test.js` | ~15 | 凭证提交流程 |

**系统总计**：~2,107个教学任务（制造业585 + 商业企业531 + 服务业490 + 建筑业501）+ 9个案例库（341笔事件）

**XP/等级/成就**：13级声望称号（见习生→财务传说）+ 16项成就

**核心铁律**：
- ⭐ **质量 > 速度** — 财务计算错误可能违法
- ⭐ **测试驱动** — 每次改完代码必须 `npm run test`（503项全通过确认）
- ⭐ **G1**：每个回复末尾加"喵~"
- ⭐ **G2**：每次会话先输出**当前验证码**（见`经验总结.md`末尾）
- ⭐ **G3**：改东西必须全面扫清所有相关文件
- ⭐ **G4**：教学数据修改后必须实时更新自动化测试
- ⭐ **G5**：教学数据金额保留两位小数
- ⭐ **G6**：`经验总结.md` 必须实时同步更新
- ⭐ **G7**：记忆文件（`.claude/projects/.../memory/`）必须同步更新
- ⭐ **G8**：改安全/激活相关代码后检查 `src/utils/activation.js` 和 `secure-storage.js` 兼容性
- ⭐ **G9**：`onlineActivate()` 请求 Worker 必须带 `?action=activate` 查询参数
- ⭐ **G10**：教改现金分类数据后必须运行 `node scripts/compute-hashes.cjs` 更新 `src/utils/integrity.js` 哈希值
- ⭐ **验证码当前为 JD-066**

---

## GitHub MCP 替代方案

当本地网络连不上 GitHub 时，使用内置 MCP 工具进行推送：
- `mcp__github__push_files` — 一次推送多个文件（需认证时不可用）
- `mcp__github__create_or_update_file` — 创建/更新单个文件
- `mcp__github__search_repositories` — 搜索仓库（无需认证）
- `mcp__github__get_file_contents` — 读取仓库文件

**注意**：MCP 工具可能因认证或安全分级不可用，此时需用户通过 VPN 手动 `git push`。

## 开发环境

- **平台**：Windows 11 | **Node.js**：v24.16.0 | **npm**：11.13.0

### 常用命令

| 命令 | 用途 |
|------|------|
| `npm run dev` | 启动开发服务器（端口3000） |
| `npm run test` | 运行全部单元测试 |
| `npx vitest run src/__tests__/tutorial.test.js` | 只跑教程数据测试 |
| `npm run test:watch` | 监听模式 |
| `BASE_URL=http://localhost:3000 node scripts/run-all-tests.cjs` | **Playwright全量测试（56项）** |
| `npx tauri build` | 打包Tauri桌面应用（先设 PATH） |
| `node scripts/key-manager.cjs gen <数量>` | 生成激活码 |
| `node scripts/key-manager.cjs export [令牌]` | 查看密钥状态 |
| `node scripts/key-manager.cjs upload <令牌>` | 上传密钥到 Worker |
| `node scripts/key-manager.cjs revoke <令牌> <码>` | 吊销指定激活码（从列表彻底删除） |
| `node scripts/key-manager.cjs clean <令牌>` | 清理之前已吊销的所有旧密钥 |
| `node scripts/deep-audit.mjs` | 深度数据审计（分录平衡/重复任务/数量异常/角色分布） |
| `node scripts/compute-hashes.cjs` | 计算数据模块 SHA-256 哈希 |
| `node scripts/annotate-cashflow.mjs [行业] [月]` | 批量标注现金流量分类（行业: manufacturing/commercial/service/construction/all，月: 01-12/all，缺省=全部全部） |
| `node scripts/check-html-js.mjs` | 检查生成HTML的JS语法错误 |
| `node scripts/take-screenshots.mjs` | Playwright 截图系统界面（需先 `npm run dev`） |
| `node scripts/screenshot-intro.mjs` | 分段截图商品介绍页（手机宽度640px） |
| — | 📚 教学知识点现使用独立 HTML（`docs/教学知识点介绍.html`）配套赠送 |

**改代码后**：先 `npx kill-port 3000 3001 3002` 清旧进程，再用新端口测试。

### Playwright 截图技巧

截图需绕过激活守卫 + 新手引导，在 `browser.newContext()` 后使用 `addInitScript` 预置 localStorage：

```js
await context.addInitScript(() => {
  localStorage.setItem('jd_activated', generateValidCode());
  localStorage.setItem('jd_onboarding_complete', 'true');
  localStorage.setItem('jd_logged_in', 'true');
});
```

其中 `generateValidCode()` 生成 16 位 XOR 校验合法激活码（见 `scripts/run-all-tests.cjs:20`）。Vue 路由在 `src/router/index.js` 中使用 hash 模式，导航通过 `window.location.hash = '#/accounting/subjects'`。查看所有可用路由见该文件。

---

## 项目架构

### 数据流

```
Vue reactive 单例 store (src/stores/store.js)
  ← 通过 useStore() 注入各组件
  → localStorage 双轨持久化（同步明文 + 异步 AES-GCM 加密）
```

**存储键格式**：`jd_scenario_data_{scenarioId}_{role}`（场景+角色双维度隔离）
**案例数据**：`jd_case_data_{id}`，与教学数据完全独立。

### 教学数据文件系统

```
src/data/
├── tutorials/
│   ├── year1.js          # 制造业入口：1月内联 + import各月
│   ├── months/           # 制造业2~12月
│   ├── commercial/       # 商业企业12月（index.js + 01~12.js）
│   ├── service/          # 服务业12月
│   └── construction/     # 建筑业12月
├── cases/                # 9案例库（index.js + 各案例js）
│   ├── small_retail.js ~ large_group.js
├── （教学知识点已移至独立 HTML：docs/教学知识点介绍.html）
├── xp-system.js          # XP/等级/成就定义
└── scenarios.js          # 场景注册表 + getScenarioTutorials() 统一入口
```

**添加新月份**：创建 `{month}.js` → 对应场景 `index.js` 注册到 `MONTHS` → 更新测试。

### Store 核心 API

| 类别 | 函数 |
|:-----|:------|
| 科目 | `getSubjectTree` / `addSubject` / `findSubjectsByCode` |
| 凭证 | `addVoucher` / `addTeachingVoucher` / `updateVoucher` / `approveVoucher` / `signVoucher` / `postVoucher` |
| 报表 | `getTrialBalance` / `getBalanceSheet` / `getIncomeStatement` / `getCashFlow` |
| 教学 | `initTeachingAccount(制造业)` / `initCommercialAccount` / `initServiceAccount` / `initConstructionAccount` |
| 现金流量 | `determineCashFlowForEntry(entry, allEntries)` — 自动判断分录现金流分类（配对科目优先级规则） |
| XP/等级 | `completeTask` / `getLevelInfo` / `getAchievementStatus` / `addXP` |
| 场景切换 | `switchScenarioState(scenarioId)` / `switchRole(role)` / `practiceMode` |
| 案例 | `switchToCase(caseId)` / `exitCase()` / `persistCaseState(caseId)` |

### 完整性校验 API

```js
import { checkIntegrity, healthCheckOnly } from '@/utils/integrity.js'

// 完整校验（哈希 + 健康扫描）
await checkIntegrity()
// 跳过健康扫描
await checkIntegrity({ skipHealthScan: true })
// 只校验指定模块
await checkIntegrity({ modules: ['year1', 'service'] })
// 仅健康扫描（不检查哈希）
await healthCheckOnly()
```

**数据健康扫描检测项**：NaN、Infinity、undefined、BigInt、空模块、借贷不平衡（阈值0.02）、缺失必填字段（subjectCode/debit/credit）

### 凭证核心流程

```
教学（引导/练习）: checkAnswer() → 答对 → addTeachingVoucher() → 直接已过账（跳过审批）
正常模式: draft → signed(出纳签字) → approved(主管审核) → posted(过账)
```

### 教学模式

| 模式 | 说明 |
|:----|:------|
| 分步引导 | Step-by-Step 推理 → 自动填入 |
| 练习 | 填空作答 → 自动比对 → 错误讲解 |
| 考试 | 独立作答 → 无提示 → 评分 |
| 自由练习 | 全部开放，可重复做，不过账不给XP |

**防重复提交**：三层保护（本地锁 `isCompletedTask` + localStorage `tutorial_done_` + store `completedTasks` 数组）

**教学保护**：教学模式下 Dashboard/VoucherQuery/VoucherEntry/SubjectList/PeriodManagement 等 9 处操作全部拦截。

### 科目编码

教学数据使用**完整编码**（`'100201'` 而非 `'01'`），通过 `findSubjectByFullCode()` 转 store ID：
- 一级科目：4位数字（如 `1002`）
- 二级明细：一级+2位（如 `100201` 工商银行）
- 微信/支付宝：`101204` / `101205`（属于"其他货币资金"）

---

## 🔐 安全体系

| 模块 | 文件 | 说明 |
|:-----|:-----|:------|
| 激活码验证 | `src/utils/activation.js` | 16位XOR校验 + 在线/离线双模式 |
| 加密存储 | `src/utils/secure-storage.js` | AES-GCM 加密 localStorage |
| 完整性校验 | `src/utils/integrity.js` | SHA-256 哈希比对 + 数据健康扫描（NaN/Infinity/借贷平衡/缺失字段/空模块） |
| Worker 验证 | `scripts/worker-activation.js` | Cloudflare Worker，含速率限制+IP封禁+单设备绑定 |

**激活码**：`XXXX-XXXX-XXXX-XXXX`（16位大写hex，前12位 data + 13-15位 XOR校验和 + 第16位随机）
**验证链路**：用户 → jiaqinw.xyz (CDN) → Worker → KV 数据库
**单设备绑定**：同一码绑定1台（MAX_DEVICES=1），固定指纹+平台版专用
**离线回退**：Worker 不可达时走本地校验和验证 + localStorage 设备绑定
**指纹 v2**：确定性算法（无 `Math.random()`），清缓存后指纹不变

**注意**：
- 客户端不含任何密钥，全部走 Worker 在线验证
- `deactivate()` 不清除绑定记录，防止同码多设备复用
- Worker 修改后需部署到 Cloudflare（全量复制到编辑器）
- KV 旧格式（`{ fp }`）和断格式（`{ fps: [] }`）兼容
- 密钥管理 `revoke` 命令彻底删除密钥（非标记），不可恢复
- 旧版已吊销的密钥可用 `clean` 命令批量清理

---

## 视图与路由

```
src/views/
├── Login.vue, Dashboard.vue, OnboardingView.vue     # 顶层
├── accounting/       # 总账模块（12视图）
│   ├── SubjectList, VoucherEntry, VoucherQuery
│   ├── SubjectBalance, TrialBalance, AuxiliaryCalc
│   ├── VoucherTemplates, LedgerQuery, CashierMgmt
│   └── ARAPMgmt, FixedAssets, PayrollMgmt, ForexMgmt
├── reports/          # 报表模块（6视图）
│   ├── BalanceSheet, IncomeStatement, CashFlow
│   ├── CustomReport, PeriodEndTransfer, TaxFiling
├── system/           # 系统管理（4视图）
│   ├── PeriodManagement, AuditLog, AccountManagement, ActivationManage
├── tutorial/         # 教学模块（3视图）
│   ├── TutorialCenter, BusinessFlowChart, AchievementSystem
└── cases/            # 案例库（3视图）
    ├── CaseLibrary, CaseDetail, CaseReport
```

路由守卫链路：`Login → Onboarding → Dashboard`（三步：登录检查 → 新手引导 → 激活校验）。未激活时所有子路由重定向到 `/dashboard`，由 `isActivated()` 控制。

### 侧边栏菜单分组

`src/layouts/MainLayout.vue` 中侧边栏使用 `el-menu` 分组折叠结构：

```
凭证管理 → 凭证录入 / 凭证查询 / 凭证模板
账簿报表 → 科目表 / 科目余额表 / 试算平衡表 / 账簿查询 / 辅助核算
出纳与往来 → 出纳管理 / 应收应付
资产管理 → 固定资产 / 工资管理 / 外币核算
报表分析 → 资产负债表 / 利润表 / 现金流量表 / 自定义报表 / 期末结转 / 模拟纳税申报
教学中心 → 教学中心 / 业务流程全景图 / 成就系统
案例库 → 案例库
系统管理 → 会计期间 / 审计轨迹 / 账套管理 / 激活管理
```

### 新手引导流程（OnboardingView.vue）

首次登录后四步引导：
1. **欢迎页** → 系统介绍 + 统计数据
2. **选择行业** → 制造业/商业/服务业/建筑业
3. **选择角色** → 会计/出纳（决定侧边栏可见菜单）
4. **准备就绪** → 学习建议 + 点击"开始学习"进入

引导状态存储在 `localStorage.setItem('jd_onboarding_complete', 'true')`，测试截图时需预设此值。

## 核心组件

| 组件 | 作用 | 路径 |
|:-----|:-----|:-----|
| `TutorialFloater` | 浮动教学面板（引导/练习/考试三种模式） | `src/components/TutorialFloater.vue` |
| `StepByStepGuide` | 分步引导弹窗（三步推理→自动填入） | `src/components/StepByStepGuide.vue` |
| `TeachingSidePanel` | 教学侧面板（任务信息/进度/标签） | `src/components/TeachingSidePanel.vue` |
| `VoucherDisplay` | 高保真电子凭证（发票/回单/收据/文档） | `src/components/VoucherDisplay.vue` |
| `SubjectSelect` | 科目选择器（树形搜索） | `src/components/SubjectSelect.vue` |
| `ActivationDialog` | 激活码输入对话框 | `src/components/ActivationDialog.vue` |
| `IntegrityCheckDialog` | 数据完整性自检弹窗 | `src/components/IntegrityCheckDialog.vue` |
| `FeedbackDialog` | 用户反馈提交 | `src/components/FeedbackDialog.vue` |
| `VoucherEntryTable` | 凭证分录行编辑器 | `src/components/VoucherEntryTable.vue` |

## CSS 架构

单文件 `src/styles/global.css`（644行）+ 各 `.vue` 组件 `scoped` 样式。

全局CSS变量体系（`:root` 定义设计令牌）：
- light/dark 双主题通过 `[data-theme="dark"]` 和 `html.dark` 两套机制切换（需同步设置）
- sidebar 三角色配色：会计蓝、出纳橙、主管红

## 文档目录

`docs/` 包含完整的用户文档（更新 `docs/` 后需同步更新 `经验总结.md`）：
- `教学知识点介绍.html` — 系统教学书（会计12章+出纳8章，共65节，支持搜索/暗色模式/书签/进度条/章节索引）
- `系统使用说明书.html` — 用户操作手册
- `screenshots/` — 34张UI页面截图（Playwright 自动生成，反映最新UI）
- `gifs/` — 操作演示GIF

---

## Tauri 桌面应用

```
src-tauri/
├── Cargo.toml         # Rust 依赖（aes-gcm, machine-uid）
├── tauri.conf.json    # 窗口1440×900, NSIS安装包, CSP已配置
└── src/
    ├── main.rs        # Windows入口
    ├── lib.rs         # 注册7个Tauri命令
    └── activation.rs  # 硬件指纹 + AES-256-GCM（MASTER_KEYS已删除, 100轮迭代）
```

**构建**：`export PATH="$HOME/.cargo/bin:$PATH" && npx tauri build`
**双模式**：`activation.js` 自动检测 Tauri 环境 → Rust invoke，浏览器环境 → JS 回退

---

## 常见陷阱

1. **脚本 `.cjs`** — package.json 为 `"type": "module"`，.js 误用 `require()` 会报错
2. **subjectCode 是完整编码** — 写 `'100201'` 而非 `'01'`
3. **红字冲回用负数** — `debit: -40000`
4. **workflow脚本禁止 `Date.now()`/`Math.random()`** — 破坏可恢复性
5. **金额小数≤2位** — `Math.round(x * 100) / 100`
6. **出bug先看`经验总结.md`** — 所有踩坑历史
7. **`getIncomeStatement()` 返回对象 `{ items, revenue, cost, ... }`**
8. **1月数据在 `year1.js` 内联** — 不在 `months/01.js`
9. **微信/支付宝用 `101204`/`101205`** — 属于其他货币资金
10. **期末结转损益 entries 需借贷平衡** — 收入 Dr 收入/Cr 本年利润；费用 Dr 本年利润/Cr 费用
11. **搜索/filterByRole 在 TutorialCenter 和 TutorialFloater 各有一套** — 需同步改两处
12. **`data-theme` 和 `html.dark` 是两套机制** — 切换暗色必须同步设置
13. **激活码格式改过** — 现在是16位，同步 `isValidFormat()`/`verifyCode()`/`ActivationDialog.vue` 三处
14. **Vite多进程端口冲突** — `npx kill-port 3000 3001 3002`
15. **JS数据文件中的多行字符串** — 单引号 `'...'` 不能跨行，多行需用模板字符串 `` `...` ``。在大量教学内容的 JS 文件中尤其容易踩坑
16. **HTML生成脚本中引号嵌套** — 生成HTML时，`onclick="f('${id}')"` 在 `.mjs` 模板字符串中嵌套引号要小心：使用 `\x27` 代替 `\'`，或用事件委托绕过引号问题
17. **角色菜单过滤器** — `store.js` 中 `getRoleMenuFilter()` 控制各角色侧边栏可见性。出纳角色使用白名单（显式列出允许的路径关键词），会计角色使用黑名单（`!p.includes('cashier')`，主管为 `null` = 全可见）。新增菜单项需同步更新该函数，否则部分角色看不到
18. **HTML 章节折叠 ID 需匹配** — `docs/教学知识点介绍.html` 中每个 `.ch-section-group` 的 id 必须与 `boardData` JSON 中对应章节的 `id` 字段一致（格式 `ch-group-{chapterId}`），否则侧边栏折叠功能无效
19. **独立 HTML 知识点文件** — `docs/教学知识点介绍.html` 已脱离系统独立维护，不再从 `knowledge-system.js` 生成。内含搜索/暗色模式/书签/进度条/章节索引等交互功能，编辑时需同步更新 JS 逻辑与 CSS
20. **现金流量自动判断优先级** — `determineCashFlowForEntry()` 在 `src/utils/accounting.js`，匹配规则按优先级：固资/无形资产 > 原材料/库存商品 > 应付职工薪酬 > 应交税费 > 借款 > 应付股利/利息 > 期间费用 > 其他。手工标注的 `cashFlowItem` 优先于自动判断
21. **现金流量数据修改后需重算哈希** — 改了教学数据的 entries 后必须 `node scripts/compute-hashes.cjs`，更新 `src/utils/integrity.js` 对应模块的哈希值
22. **会计引擎在 `src/utils/accounting.js`** — 核心函数 `determineCashFlowForEntry()` 和 `calculateBalances()` 在此；`getIncomeStatement()`/`getBalanceSheet()`/`getCashFlow()` 在 `src/stores/store.js` 中组装调用
23. **月份文件可能含同行多条分录** — `entries: [{...}, {...}, {...}]` 内联格式在商业/服务业/建筑业文件中常见。逐行扫描 `subjectCode` 只能找到第一个，必须用 `matchAll`。`scripts/annotate-cashflow.mjs` 已处理此情况
24. **多行分录的 `}` 在不同行** — 有些月份文件的分录跨多行（`subjectCode` 在一行，`explanation` 在下一行，`}` 在第三行）。脚本/搜索时注意处理跨行场景，不能用单行正则简单处理
25. **标注脚本 duplicate key bug** — `annotate-cashflow.mjs` 的 `buildAnnotationMap` 使用 `code|dr|cr|summary` 作为 key。会计+出纳任务中同 summary 的分录会生成相同 key，第一个匹配后 `delete` 导致第二条丢失。已修复为计数模式（`count` 递减，归零才删）。改标注脚本时注意不要回退此逻辑
26. **`calcIncomeStatement.getAmount()` 必须聚合子科目** — 期间余额只存在于末级科目（isLeaf=true），非末级科目（6601/6602）无 periodBalance。`getAmount` 需 filter `isLeaf === true` 的所有匹配科目累加，不能用 `find()` 取第一个
27. **`calcIncomeStatement` 返回正值** — `getAmount` 取 `|currentCredit - currentDebit|`（Math.abs），费用类借方发生额返回正值。公式 `revenue - cost - ...` 中所有值为正，运算符决定加减方向
28. **`calcIncomeStatement` 返回属性缺失** — 返回值需包含 `revenue`/`cost`/`sellingExp`/`adminExp`/`financeExp`/`otherIncome`/`otherExp`/`incomeTax`，否则 `TaxFiling.vue` 纳税申报页全部显示为0

---

## 外部记忆系统

记忆文件在 `${user.home}/.claude/projects/D--GAME-Godot-xiangmu-----/memory/`，详见 `MEMORY.md` 索引。

### 每会话启动步骤

1. 读 `经验总结.md` 获取当前验证码（当前 **JD-066**）
2. `npm run test` 确认 **503** 项通过
3. 读交接单 `memory/session-handoff-june-2026-v13.md` 确定下一步
4. 检查 `MEMORY.md` 获取记忆索引
5. 有改代码 → `npx kill-port 3000 3001 3002` → 干净端口测试
6. 如需打包 → `export PATH="$HOME/.cargo/bin:$PATH" && npx tauri build`
7. 📚 教学知识点见独立 HTML 文件：`docs/教学知识点介绍.html`
8. 🛒 商品介绍页（闲鱼/拼多多用）：`观测者财务_商品介绍_闲鱼拼多多.html`
   - 截图在 `商品介绍截图/` 目录（Playwright 640px宽度分段生成）
   - 系统界面截图在 `scripts/商品截图/` 目录

### 首次访问注意事项

- 系统有完整的**新手引导流程**（OnboardingView.vue），测试截图中需预置 `jd_onboarding_complete=true`
- 激活守卫拦截所有非 dashboard 子路由，测试/截图需预置 `jd_activated=合法激活码`
- 服务端 Worker 部署在 Cloudflare，修改 `scripts/worker-activation.js` 后需全量复制到 CF 编辑器部署
