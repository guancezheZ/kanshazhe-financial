/**
 * 反馈提交工具
 *
 * 通过 Web3Forms API 发送反馈到开发者邮箱。
 * 邮箱地址配置在 Web3Forms 后台，不在前端代码中暴露。
 *
 * 使用方式：在 web3forms.com 注册 → 配置收件邮箱 → 将 Access Key 填入下方
 */

const WEB3FORMS_KEY = '632e0b7b-b9a4-4ed2-83d8-8f6fae025096'
const WEB3FORMS_API = 'https://api.web3forms.com/submit'

/**
 * 提交反馈
 * @param {{ type: string, content: string, page?: string }} feedback
 * @returns {Promise<boolean>}
 */
export async function submitFeedback({ type, content, page = '' }) {
  const res = await fetch(WEB3FORMS_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      subject: `[观测者财务] 新反馈：${type}`,
      name: type,
      message: content,
      from_name: '观测者财务模拟系统',
      botcheck: false
    })
  })
  const data = await res.json()
  if (!data.success) {
    throw new Error(data.message || '反馈提交失败')
  }
  return true
}

/**
 * 反馈类型选项
 */
export const FEEDBACK_TYPES = [
  { value: 'bug', label: '🐛 内容错误', desc: '教学数据、分录或金额有误' },
  { value: 'feature', label: '💡 功能建议', desc: '希望增加或改进的功能' },
  { value: 'ui', label: '🎨 界面问题', desc: '布局、样式或显示异常' },
  { value: 'experience', label: '📝 体验反馈', desc: '使用过程中的感受和建议' },
  { value: 'other', label: '其他', desc: '其他类型的反馈' }
]
