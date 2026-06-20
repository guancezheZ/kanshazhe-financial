/**
 * 场景注册表
 *
 * 每个行业场景拥有独立的知识体系、科目体系、标签系统和进度追踪。
 * 场景之间完全隔离，互不干扰。
 *
 * 会计准则依据：《企业会计准则——基本准则》（财政部令第76号）
 */

import { getTutorials as getMfgTutorials } from './tutorials/year1.js'
import { getCommercialTutorials, getCommercialAllMonths, getCommercialMonthLabels } from './tutorials/commercial/index.js'
import { getServiceTutorials, getServiceAllMonths, getServiceMonthLabels } from './tutorials/service/index.js'
import { getConstructionTutorials, getConstructionAllMonths, getConstructionMonthLabels } from './tutorials/construction/index.js'

/**
 * 所有可用场景列表
 * comingSoon: true 表示场景框架已预留但暂无教学数据，选择时展示友好提示
 */
export const SCENARIOS = [
  {
    id: 'manufacturing',
    label: '制造业',
    icon: '🏭',
    description: '生产企业全流程（采购→生产→销售→成本核算）',
    months: ['01','02','03','04','05','06','07','08','09','10','11','12'],
    monthLabels: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
    tags: ['出纳','采购','销售','费用','工资社保','税费','资产','成本核算','融资','期末'],
    progressPrefix: 'tutorial',
    isBuiltIn: true,
    comingSoon: false,
  },
  {
    id: 'commercial',
    label: '商业企业',
    icon: '🏬',
    description: '商品流通企业（采购→仓储→销售，无生产成本）',
    months: ['01','02','03','04','05','06','07','08','09','10','11','12'],
    monthLabels: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
    tags: ['商品采购','商品销售','仓存管理','往来管理','资金管理','费用管理','工资社保','税费','期末','出纳'],
    progressPrefix: 'com_tutorial',
    isBuiltIn: false,
    comingSoon: false,
  },
  {
    id: 'service',
    label: '服务业',
    icon: '💼',
    description: '管理咨询/软件开发公司，项目制核算',
    months: ['01','02','03','04','05','06','07','08','09','10','11','12'],
    monthLabels: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
    tags: ['项目核算','收入确认','人工成本','费用管理','工资社保','税费','往来管理','资金管理','期末','出纳'],
    progressPrefix: 'svc_tutorial',
    isBuiltIn: false,
    comingSoon: false,
  },
  {
    id: 'construction',
    label: '建筑业',
    icon: '🏗️',
    description: '建筑工程企业，按进度确认收入',
    months: ['01','02','03','04','05','06','07','08','09','10','11','12'],
    monthLabels: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
    tags: ['工程合同','工程成本','分包管理','材料管理','机械使用','往来管理','资金管理','工资社保','税费','期末'],
    progressPrefix: 'con_tutorial',
    isBuiltIn: false,
    comingSoon: false,
  },
]

const SCENARIO_KEY = 'jd_scenario'

/** 获取当前选中的场景ID（localStorage 持久化） */
export function getCurrentScenarioId() {
  return localStorage.getItem(SCENARIO_KEY) || 'manufacturing'
}

/** 设置当前场景ID */
export function setCurrentScenarioId(id) {
  localStorage.setItem(SCENARIO_KEY, id)
}

/** 获取场景配置对象 */
export function getScenarioConfig(id) {
  return SCENARIOS.find(s => s.id === id) || SCENARIOS[0]
}

/**
 * 场景感知的任务获取
 * @param {string} scenarioId - 场景ID
 * @param {string} month - 月份 '01'~'12'
 * @returns {Array} 任务数组
 */
export function getScenarioTutorials(scenarioId, month) {
  const scenario = getScenarioConfig(scenarioId)
  if (!scenario) return []
  if (scenario.id === 'manufacturing') {
    return getMfgTutorials(month)
  }
  if (scenario.id === 'commercial') {
    return getCommercialTutorials(month)
  }
  if (scenario.id === 'service') {
    return getServiceTutorials(month)
  }
  if (scenario.id === 'construction') {
    return getConstructionTutorials(month)
  }
  // 其他场景暂无数据
  return []
}

// ─── 场景感知的 localStorage 键（隔离进度/错题/状态） ───

function getPrefix(scenarioId) {
  return getScenarioConfig(scenarioId)?.progressPrefix || 'tutorial'
}

/** 完成进度key（格式：${prefix}_done_${date}_${title}） */
export function getProgressKey(scenarioId, date, title) {
  return `${getPrefix(scenarioId)}_done_${date}_${title}`
}

/** 标签错误率统计key */
export function getTagStatsKey(scenarioId) {
  return `${getPrefix(scenarioId)}_tag_stats`
}

/** 错题本key */
export function getWrongAnswersKey(scenarioId) {
  return `${getPrefix(scenarioId)}_wrong_answers`
}

/** 连续答对key */
export function getStreakKey(scenarioId) {
  return `${getPrefix(scenarioId)}_streak`
}

/** 场景所有完成进度key的前缀（用于批量清除） */
export function getDoneKeyPrefix(scenarioId) {
  return `${getPrefix(scenarioId)}_done_`
}

/** 当前场景的默认标签列表 */
export function getScenarioTags(scenarioId) {
  return getScenarioConfig(scenarioId)?.tags || []
}
