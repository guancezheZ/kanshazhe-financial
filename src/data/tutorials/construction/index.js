/**
 * 建筑业（建筑工程企业）教学任务入口
 *
 * 行业特点：合同成本归集、完工百分比法收入确认、分包核算
 * 企业类型：一般纳税人（增值税9%）
 * 会计准则依据：《企业会计准则第14号——收入》（财会[2017]22号）
 *
 * 知识点标签（10类）：
 * 工程合同、工程成本、分包管理、材料管理、机械使用、往来管理、资金管理、工资社保、税费、期末
 */

import mon01 from './01.js'
import mon02 from './02.js'
import mon03 from './03.js'
import mon04 from './04.js'
import mon05 from './05.js'
import mon06 from './06.js'
import mon07 from './07.js'
import mon08 from './08.js'
import mon09 from './09.js'
import mon10 from './10.js'
import mon11 from './11.js'
import mon12 from './12.js'

const MONTHS = { '01': mon01, '02': mon02, '03': mon03, '04': mon04, '05': mon05, '06': mon06, '07': mon07, '08': mon08, '09': mon09, '10': mon10, '11': mon11, '12': mon12 }

export function getConstructionTutorials(month) {
  return MONTHS[month] || []
}

export function getConstructionAllMonths() {
  return Object.keys(MONTHS)
}

export function getConstructionMonthLabels() {
  return { '01': '1月', '02': '2月', '03': '3月', '04': '4月', '05': '5月', '06': '6月', '07': '7月', '08': '8月', '09': '9月', '10': '10月', '11': '11月', '12': '12月' }
}

// 用于完整性校验的数据导出
export { MONTHS }
