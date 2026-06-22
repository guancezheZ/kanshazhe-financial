/**
 * feedback.js 功能测试
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { submitFeedback, FEEDBACK_TYPES } from '@/utils/feedback.js'

describe('feedback - 反馈类型', () => {
  it('有5种反馈类型', () => {
    expect(FEEDBACK_TYPES.length).toBe(5)
  })

  it('每种类型有 value/label/desc', () => {
    for (const t of FEEDBACK_TYPES) {
      expect(t).toHaveProperty('value')
      expect(t).toHaveProperty('label')
      expect(t).toHaveProperty('desc')
    }
  })

  it('包含bug类型', () => {
    expect(FEEDBACK_TYPES.some(t => t.value === 'bug')).toBe(true)
  })
})

describe('feedback - API 调用', () => {
  beforeEach(() => {
    global.fetch = vi.fn()
  })

  it('提交成功返回 true', async () => {
    global.fetch.mockResolvedValue({
      json: () => Promise.resolve({ success: true }),
    })
    const result = await submitFeedback({ type: 'bug', content: '测试反馈' })
    expect(result).toBe(true)
  })

  it('提交失败抛出错误', async () => {
    global.fetch.mockResolvedValue({
      json: () => Promise.resolve({ success: false, message: 'API错误' }),
    })
    await expect(submitFeedback({ type: 'bug', content: 'test' })).rejects.toThrow('API错误')
  })

  it('网络错误抛出异常', async () => {
    global.fetch.mockRejectedValue(new Error('Network error'))
    await expect(submitFeedback({ type: 'bug', content: 'test' })).rejects.toThrow()
  })

  it('请求包含必要字段', async () => {
    let body = null
    global.fetch.mockImplementation(async (url, opts) => {
      body = JSON.parse(opts.body)
      return { json: () => Promise.resolve({ success: true }) }
    })
    await submitFeedback({ type: 'bug', content: '问题描述', page: '凭证录入' })
    expect(body.access_key).toBeTruthy()
    expect(body.subject).toContain('bug')
    expect(body.message).toBe('问题描述')
  })
})
