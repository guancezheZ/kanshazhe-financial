/**
 * 更新日志数据
 * 每次版本更新时，在数组最前面插入新版本记录
 */
export const CHANGELOG = [
  {
    version: '0.2.1',
    date: '2026-06-27',
    title: '科目明细化重构 & 体验优化',
    items: [
      '教学任务中的一级科目（管理费用、销售费用等）现在可以正常选择了',
      '新增21个子科目，教学任务数据已全部对应更新',
      '反馈功能新增联系方式输入框（选填）',
    ],
  },
]

/**
 * 获取最新版本号
 */
export function getLatestVersion() {
  return CHANGELOG[0]?.version || '0.2.0'
}
