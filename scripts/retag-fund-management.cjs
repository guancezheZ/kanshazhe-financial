/**
 * 标签清洗脚本 v2：重洗"资金管理"标签（修复标题提取bug）
 *
 * 原则：
 * 1. 已有其他配对标签的任务 → 直接移除"资金管理"
 * 2. 仅有"资金管理"标签的任务 → 根据标题关键词分配新标签
 *
 * 运行：node scripts/retag-fund-management.cjs
 */

const fs = require('fs')
const path = require('path')

const BASE = path.resolve(__dirname, '..')

const DIRS = {
  commercial: path.join(BASE, 'src/data/tutorials/commercial'),
  construction: path.join(BASE, 'src/data/tutorials/construction'),
  service: path.join(BASE, 'src/data/tutorials/service'),
}

// ============ 标题→标签映射（仅对"资金管理"唯一标签生效）============
const TITLE_RULES = [
  // 保持资金管理（真正的资金筹措/规划类）
  { test: /资本金|投入资本|实收资本|追加投资/,
    tag: '资金管理', note: '资本金投入' },
  { test: /短期借款|长期借款|借款到期|还本付息|到期还本|取得.*借款|流动资金借款|新借款/,
    tag: '资金管理', note: '借款类' },
  { test: /计提.*利息|借款利息|支付.*利息/,
    tag: '资金管理', note: '利息计提/支付' },
  { test: /利息收入|结息|季度结息|活期存款利息|银行活期利息|存款利息/,
    tag: '资金管理', note: '利息收入' },
  { test: /银行间.*调拨|资金调拨|银行账户间|账户间转账|账户间.*调拨|划转/,
    tag: '资金管理', note: '资金调拨' },
  { test: /商业汇票贴现|汇票贴现|贴现/,
    tag: '资金管理', note: '票据贴现' },
  { test: /股东分红|应付股利/,
    tag: '期末', note: '股利分配' },
  { test: /投资款到账/,
    tag: '资金管理', note: '投资款' },
  { test: /银行汇票|申请银行汇票|履约保函|保函手续费/,
    tag: '资金管理', note: '银行汇票/保函' },
  { test: /收到.*工程尾款|收到.*结算款|工程结算款/,
    tag: '工程合同', note: '工程结算' },
  { test: /预付.*租金|预付下年度/,
    tag: '费用管理', note: '预付租金' },

  // 改为出纳（日常操作类）
  { test: /提取备用金|备用金补充/,
    tag: '出纳', note: '备用金' },
  { test: /现金送存/,
    tag: '出纳', note: '现金送存' },
  { test: /现金盘点|现金清点|月初现金|库存现金/,
    tag: '出纳', note: '现金盘点' },
  { test: /银行存款余额|余额核对|余额调节|对账|余额表/,
    tag: '出纳', note: '银行对账' },
  { test: /银行回单|票据整理|票据归档|月末票据|季度票据|年度票据|整理.*归档/,
    tag: '出纳', note: '票据归档' },
  { test: /编制资金日报|资金日报/,
    tag: '出纳', note: '资金日报' },
  { test: /购买支票|转账支票/,
    tag: '出纳', note: '购买支票' },
  { test: /银行对账|调节表|调节/,
    tag: '出纳', note: '银行调节' },
  { test: /月末.*归档|票据.*归档|凭证装订/,
    tag: '出纳', note: '月末归档' },
  { test: /现金.*封存|封存/,
    tag: '出纳', note: '现金封存' },

  // 改为费用管理
  { test: /银行手续费|账户管理费|手续费扣收|银行费用/,
    tag: '费用管理', note: '银行手续费' },
  { test: /办公费|水电费|办公用品|电话费/,
    tag: '费用管理', note: '办公费用' },
  { test: /报销.*差旅|差旅费/,
    tag: '费用管理', note: '差旅费' },
  { test: /日常办公/,
    tag: '费用管理', note: '办公费用' },
  { test: /摊销.*租金|摊销.*租/,
    tag: '费用管理', note: '摊销租金' },

  // 改为资产
  { test: /购入办公设备|固定资产|购入.*设备|购入.*车辆/,
    tag: '资产', note: '固定资产' },
  { test: /固定资产处置|出售旧设备|出售.*设备/,
    tag: '资产', note: '资产处置' },

  // 材料管理
  { test: /材料采购|材料款|采购款|采购定金/,
    tag: '材料管理', note: '材料采购' },

  // 工资社保
  { test: /农民工.*专户|专户发放|缴存.*农民工/,
    tag: '工资社保', note: '农民工工资' },
  { test: /支付.*年终奖|年终奖金/,
    tag: '工资社保', note: '年终奖' },

  // 工程成本
  { test: /保洁费|保安费|保安保洁/,
    tag: '工程成本', note: '现场费用' },
  { test: /保险费|工程一切险/,
    tag: '工程成本', note: '工程保险' },

  // 分包管理
  { test: /预付.*备料款|备料款/,
    tag: '分包管理', note: '备料款' },

  // 工程合同
  { test: /收到.*进度款|收到.*工程款/,
    tag: '往来管理', note: '工程收款' },
  { test: /退还投标保证金|投标保证金/,
    tag: '往来管理', note: '投标保证金' },
  { test: /微信.*质保金|质保金/,
    tag: '往来管理', note: '质保金' },
]

// 查找标题（找 beforeText 中最后一个 title）
function findLastTitle(beforeText, pattern) {
  const regex = new RegExp(pattern, 'g')
  let match, title = ''
  while ((match = regex.exec(beforeText)) !== null) {
    title = match[1]
  }
  return title
}

function classifyTitle(title) {
  for (const rule of TITLE_RULES) {
    if (rule.test.test(title)) return rule.tag
  }
  return '出纳' // 默认兜底
}

// ============ JS格式 ============
function processJSFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8')
  const changes = []

  const regex = /(tags\s*:\s*\[)([^\]]*?)(\])/g
  const replacements = []

  let match
  while ((match = regex.exec(content)) !== null) {
    const fullMatch = match[0]
    const tagContent = match[2]

    if (!tagContent.includes('资金管理')) continue

    const tags = tagContent.split(',').map(t => t.trim().replace(/^'/, '').replace(/'$/, '').trim()).filter(Boolean)

    const beforeText = content.substring(0, match.index)
    const title = findLastTitle(beforeText, /title\s*:\s*'([^']+)'/)

    const hadFundMgmt = tags.includes('资金管理')
    if (!hadFundMgmt) continue

    // 先去重
    const uniqueTags = [...new Set(tags)]
    let cleanedTags = uniqueTags.filter(t => t !== '资金管理')

    let newTags
    if (cleanedTags.length > 0) {
      // 去除资金管理后还有标签
      newTags = cleanedTags
    } else {
      // 全是资金管理（含重复）→ 根据标题重分类
      const newTag = classifyTitle(title)
      newTags = [newTag]
    }

    const newTagStr = newTags.map(t => `'${t}'`).join(', ')
    const replacement = `tags: [${newTagStr}]`

    replacements.push({ from: fullMatch, to: replacement, title, old: tags.join(','), newv: newTags.join(',') })
  }

  // Apply replacements in reverse order
  for (const r of replacements.reverse()) {
    // Only replace the LAST occurrence (the one we matched)
    const idx = content.lastIndexOf(r.from)
    if (idx >= 0) {
      content = content.substring(0, idx) + r.to + content.substring(idx + r.from.length)
    }
  }

  if (replacements.length > 0) {
    // Re-reverse for display
    replacements.reverse()
    fs.writeFileSync(filePath, content, 'utf-8')
    const changeStr = replacements.map(r => `"${r.title}" ${r.old}→${r.newv}`).join(' | ')
    console.log(`  ✅ ${path.basename(filePath)}: ${changeStr}`)
  }

  return replacements.length
}

// ============ JSON格式 ============
function processJSONFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8')
  const changes = []

  const regex = /("tags"\s*:\s*\[)([^\]]*?)(\])/g
  const replacements = []

  let match
  while ((match = regex.exec(content)) !== null) {
    const fullMatch = match[0]
    const tagContent = match[2]

    if (!tagContent.includes('资金管理')) continue

    const tags = tagContent.split(',').map(t => t.trim().replace(/^"/, '').replace(/"$/, '').trim()).filter(Boolean)

    const beforeText = content.substring(0, match.index)
    const title = findLastTitle(beforeText, /"title"\s*:\s*"([^"]+)"/)

    const hadFundMgmt = tags.includes('资金管理')
    if (!hadFundMgmt) continue

    // 先去重
    const uniqueTags = [...new Set(tags)]
    let cleanedTags = uniqueTags.filter(t => t !== '资金管理')

    let newTags
    if (cleanedTags.length > 0) {
      newTags = cleanedTags
    } else {
      const newTag = classifyTitle(title)
      newTags = [newTag]
    }

    const newTagStr = newTags.map(t => `"${t}"`).join(', ')
    const replacement = `"tags": [${newTagStr}]`

    replacements.push({ from: fullMatch, to: replacement, title, old: tags.join(','), newv: newTags.join(',') })
  }

  for (const r of replacements.reverse()) {
    const idx = content.lastIndexOf(r.from)
    if (idx >= 0) {
      content = content.substring(0, idx) + r.to + content.substring(idx + r.from.length)
    }
  }

  if (replacements.length > 0) {
    replacements.reverse()
    fs.writeFileSync(filePath, content, 'utf-8')
    const changeStr = replacements.map(r => `"${r.title}" ${r.old}→${r.newv}`).join(' | ')
    console.log(`  ✅ ${path.basename(filePath)}: ${changeStr}`)
  }

  return replacements.length
}

// ============ 主流程 ============
let totalFileCount = 0

console.log('\n🏪 商业企业（JS格式）：')
for (const f of fs.readdirSync(DIRS.commercial).filter(f => f.endsWith('.js') && f !== 'index.js').sort()) {
  const n = processJSFile(path.join(DIRS.commercial, f))
  if (n > 0) totalFileCount++
}
console.log(`  商业企业处理完成`)

console.log('\n🏗️ 建筑业（JS格式）：')
for (const f of fs.readdirSync(DIRS.construction).filter(f => f.endsWith('.js') && f !== 'index.js').sort()) {
  const n = processJSFile(path.join(DIRS.construction, f))
  if (n > 0) totalFileCount++
}
console.log(`  建筑业处理完成`)

console.log('\n💼 服务业（混合格式）：')
for (const f of fs.readdirSync(DIRS.service).filter(f => f.endsWith('.js') && f !== 'index.js').sort()) {
  // 01~03.js 用JS格式（单引号），04~12.js 用JSON格式（双引号）
  const isJS = /^0[1-3]\.js$/.test(f)
  const n = isJS
    ? processJSFile(path.join(DIRS.service, f))
    : processJSONFile(path.join(DIRS.service, f))
  if (n > 0) totalFileCount++
}
console.log(`  服务业处理完成`)

console.log(`\n📊 共修改 ${totalFileCount} 个文件 / 3 个行业`)
console.log('⚠️ 下一步：git diff 确认修改正确')
console.log('⚠️ 下一步：node scripts/compute-hashes.cjs 更新完整性哈希')
console.log('⚠️ 下一步：npm run test 确认测试通过')
