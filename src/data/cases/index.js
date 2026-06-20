/**
 * 案例库注册表
 *
 * 每个案例是一个独立的企业财务情景，包含专属的科目体系、期初余额和一系列业务事件。
 * 案例不绑定行业场景，独立存储和运行。
 *
 * 共计 9 个案例（大/中/小型各3个）
 */

// 案例数据导入
import smallRetail from './small_retail.js'
import smallConsulting from './small_consulting.js'
import smallRestaurant from './small_restaurant.js'
import mediumMfg from './medium_mfg.js'
import mediumTrade from './medium_trade.js'
import mediumConstruction from './medium_construction.js'
import largeGroup from './large_group.js'
import largeRetailChain from './large_retail_chain.js'
import largeProperty from './large_property.js'

/**
 * 所有案例列表
 */
export const CASES = [
  {
    id: 'small_retail',
    title: '阳光便利店 — 1月账务',
    type: 'small',
    typeLabel: '小型企业',
    icon: '🏪',
    difficulty: 2,
    industry: '零售业',
    taxType: '小规模纳税人',
    desc: '一家社区便利店的1月份账务处理，包含日常销售、采购、费用报销等基础业务，适合初学者体验完整做账流程。',
    eventCount: 30,
    data: smallRetail,
  },
  {
    id: 'small_consulting',
    title: '启航咨询 — 1月账务',
    type: 'small',
    typeLabel: '小型企业',
    icon: '📋',
    difficulty: 2,
    industry: '管理咨询业',
    taxType: '小规模纳税人',
    desc: '一家管理咨询公司的1月份账务处理，涵盖项目收入成本核算、预收款、短期借款、工资及税费计提等，适合初学者巩固服务业做账流程。',
    eventCount: 27,
    data: smallConsulting,
  },
  {
    id: 'small_restaurant',
    title: '食味轩餐馆 — 1月账务',
    type: 'small',
    typeLabel: '小型企业',
    icon: '🍳',
    difficulty: 2,
    industry: '餐饮业',
    taxType: '小规模纳税人',
    desc: '一家社区餐馆的1月份账务处理，涵盖日常营业收支、食材采购、工资发放、费用支付及期末税费计提等，适合初学者熟悉餐饮业做账流程。',
    eventCount: 32,
    data: smallRestaurant,
  },
  // 🏢 中型企业
  {
    id: 'medium_mfg',
    title: '华鑫制造厂 — 1月账务',
    type: 'medium',
    typeLabel: '中型企业',
    icon: '🏭',
    difficulty: 4,
    industry: '制造业',
    taxType: '一般纳税人',
    desc: '一家工业设备零部件加工制造企业的1月份账务处理，涵盖采购、生产、销售、工资、税费及期末成本核算全流程，适合掌握制造业一般纳税人完整做账流程。',
    eventCount: 39,
    data: mediumMfg,
  },
  // 🏢 中型企业（续）
  {
    id: 'medium_trade',
    title: '瑞丰贸易 — 1月账务',
    type: 'medium',
    typeLabel: '中型企业',
    icon: '📦',
    difficulty: 4,
    industry: '商业贸易',
    taxType: '一般纳税人',
    desc: '一家电子产品批发贸易企业的1月份账务处理，涵盖现购赊购、现销赊销、预收转销、增值税核算、仓储费用及期末结转等，适合掌握商业贸易企业一般纳税人完整做账流程。',
    eventCount: 37,
    data: mediumTrade,
  },
  {
    id: 'medium_construction',
    title: '鼎盛建筑 — 1月账务',
    type: 'medium',
    typeLabel: '中型企业',
    icon: '🏗️',
    difficulty: 5,
    industry: '建筑业',
    taxType: '一般纳税人',
    desc: '一家房屋建筑工程施工企业的1月份账务处理，涵盖工程预收款、材料采购领用、分包工程、工程进度结算、完工百分比法确认收入、增值税留抵处理及期末调整等，适合掌握建筑业一般纳税人完整做账流程。',
    eventCount: 36,
    data: mediumConstruction,
  },
  // 🏭 大型企业
  {
    id: 'large_group',
    title: '振华集团 — 1月账务',
    type: 'large',
    typeLabel: '大型企业',
    icon: '🏭',
    difficulty: 6,
    industry: '制造业',
    taxType: '一般纳税人',
    desc: '一家综合性电子制造集团的1月份账务处理，涵盖资金筹集、资产购置、采购生产、现销赊销、委托代销、长期投资、研发支出费用化、工资税费及期末成本核算等全流程，适合掌握大型制造业集团一般纳税人完整做账流程。',
    eventCount: 48,
    data: largeGroup,
  },
  {
    id: 'large_retail_chain',
    title: '万佳连锁 — 1月账务',
    type: 'large',
    typeLabel: '大型企业',
    icon: '🏪',
    difficulty: 6,
    industry: '零售连锁',
    taxType: '一般纳税人',
    desc: '一家拥有3家连锁超市的零售企业的1月份账务处理，涵盖统一采购配送、各店销售、联营专柜分成、促销活动、存货盘点、跌价准备、增值税核算及期末结转等全流程，适合掌握零售连锁企业一般纳税人完整做账流程。',
    eventCount: 45,
    data: largeRetailChain,
  },
  {
    id: 'large_property',
    title: '恒达地产 — 1月账务',
    type: 'large',
    typeLabel: '大型企业',
    icon: '🏗️',
    difficulty: 6,
    industry: '房地产业',
    taxType: '一般纳税人',
    desc: '一家专业从事住宅地产开发企业的1月份账务处理，涵盖土地获取、前期费用、工程建设、材料采购领用、预售收款、利息资本化、项目竣工结转、交付确认收入及增值税9%进销项核算等全流程，适合掌握房地产开发企业一般纳税人完整做账流程。',
    eventCount: 47,
    data: largeProperty,
  },
]

// ─── 以下为暂缺的案例 stub ───
// 后续逐步添加时取消注释

// export const CASE_STUBS = [
//   { id: 'small_consulting', title: '启航咨询 — 1月账务', type: 'small', ... },
//   { id: 'small_restaurant', title: '食味轩餐馆 — 1月账务', type: 'small', ... },
//   { id: 'medium_construction', title: '鼎盛建筑 — 1月账务', type: 'medium', ... },
//   { id: 'large_group', title: '振华集团 — 1月账务', type: 'large', ... },
//   { id: 'large_property', title: '恒达地产 — 1月账务', type: 'large', ... },
//   { id: 'large_retail_chain', title: '万佳连锁 — 1月账务', type: 'large', ... },
// ]

/** 根据ID获取案例配置 */
export function getCaseConfig(caseId) {
  return CASES.find(c => c.id === caseId) || null
}

/** 按企业规模分组 */
export function getCasesByType() {
  return {
    small: CASES.filter(c => c.type === 'small'),
    medium: CASES.filter(c => c.type === 'medium'),
    large: CASES.filter(c => c.type === 'large'),
  }
}
