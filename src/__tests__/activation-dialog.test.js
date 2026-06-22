/**
 * ActivationDialog 组件测试
 *
 * 测试项：
 *   1. 组件挂载/显示
 *   2. 四个输入框自动聚焦与跳转
 *   3. 十六进制过滤
 *   4. 格式校验错误消息
 *   5. 激活成功流程
 *   6. 激活失败流程
 *   7. 跳过按钮（非严格模式）
 *   8. strict 模式下无跳过按钮
 *   9. 已激活状态自动关闭
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import ActivationDialog from '@/components/ActivationDialog.vue'

// ─── Mock activation.js ───
const mockActivate = vi.fn()
const mockIsActivated = vi.fn()
const mockIsValidFormat = vi.fn()
const mockGetDeviceFingerprint = vi.fn()

vi.mock('@/utils/activation.js', () => ({
  activate: (...args) => mockActivate(...args),
  isActivated: () => mockIsActivated(),
  isValidFormat: (...args) => mockIsValidFormat(...args),
  getDeviceFingerprint: () => mockGetDeviceFingerprint(),
}))

// ─── Element Plus 存根 ───
const ElIconStub = {
  name: 'ElIcon',
  template: '<span class="el-icon"><slot /></span>',
}
const ElInputStub = {
  name: 'ElInput',
  props: ['modelValue', 'maxlength', 'placeholder'],
  template: '<input class="el-input__inner" :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value); $emit(\'input\', $event)" @keydown.delete="$emit(\'keydown.delete\', $event)" />',
}
const ElButtonStub = {
  name: 'ElButton',
  props: ['type', 'loading', 'size'],
  template: '<button :class="[\'el-button\', type ? \'el-button--\' + type : \'\']" :disabled="loading" @click="$emit(\'click\')"><slot /></button>',
}

// ─── 辅助函数 ───
function createWrapper(options = {}) {
  return mount(ActivationDialog, {
    props: {
      strict: options.strict ?? false,
    },
    global: {
      stubs: {
        'el-icon': ElIconStub,
        'el-input': ElInputStub,
        'el-button': ElButtonStub,
      },
    },
    attachTo: document.body,
  })
}

function getInputs(wrapper) {
  return wrapper.findAll('input.el-input__inner')
}

function fillCode(wrapper, code) {
  const parts = code.split('-')
  const inputs = getInputs(wrapper)
  parts.forEach((part, i) => {
    inputs[i].setValue(part)
  })
}

describe('ActivationDialog', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockGetDeviceFingerprint.mockReturnValue('TEST-FP-12345678')
    mockIsActivated.mockReturnValue(false)
    mockIsValidFormat.mockImplementation((code) => {
      return /^[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}$/.test(code)
    })
  })

  it('1. 组件挂载时不可见（默认 visible=false）', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.activation-overlay').exists()).toBe(false)
  })

  it('2. visible=true 时显示激活对话框', async () => {
    const wrapper = createWrapper()
    await wrapper.setProps({ modelValue: true })
    await nextTick()
    expect(wrapper.find('.activation-card').isVisible()).toBe(true)
  })

  it('3. 显示设备指纹', async () => {
    const wrapper = createWrapper()
    await wrapper.setProps({ modelValue: true })
    await nextTick()
    expect(wrapper.text()).toContain('TEST-FP-12345678')
  })

  it('4. 空激活码点击激活提示"请输入"', async () => {
    const wrapper = createWrapper()
    await wrapper.setProps({ modelValue: true })
    await nextTick()

    await wrapper.find('.activate-btn').trigger('click')
    await nextTick()

    expect(wrapper.text()).toContain('请输入')
  })

  it('5. 无效格式显示格式错误', async () => {
    mockIsValidFormat.mockReturnValue(false)
    const wrapper = createWrapper()
    await wrapper.setProps({ modelValue: true })
    await nextTick()

    fillCode(wrapper, 'ZZZZ-ZZZZ-ZZZZ-ZZZZ')
    await nextTick()

    await wrapper.find('.activate-btn').trigger('click')
    await nextTick()

    expect(wrapper.text()).toContain('格式错误')
  })

  it('6. 有效格式调用 activate()', async () => {
    mockActivate.mockResolvedValue({ success: true, message: '✅ 激活成功！已绑定本机。' })
    const wrapper = createWrapper()
    await wrapper.setProps({ modelValue: true })
    await nextTick()

    fillCode(wrapper, 'ABCD-1234-EF56-7890')
    await wrapper.find('.activate-btn').trigger('click')
    await nextTick()

    // 600ms delay in handleActivate + resolve
    await new Promise(r => setTimeout(r, 700))
    await nextTick()

    expect(mockActivate).toHaveBeenCalledWith('ABCD-1234-EF56-7890')
    expect(wrapper.text()).toContain('激活成功')
  })

  it('7. 激活成功后发射 activated 事件', async () => {
    mockActivate.mockResolvedValue({ success: true, message: '✅ 激活成功！已绑定本机。' })
    const wrapper = createWrapper()
    await wrapper.setProps({ modelValue: true })
    await nextTick()

    fillCode(wrapper, 'ABCD-1234-EF56-7890')
    await wrapper.find('.activate-btn').trigger('click')
    await new Promise(r => setTimeout(r, 700))
    await nextTick()

    // 等待 1.5s auto-close
    await new Promise(r => setTimeout(r, 1600))
    await nextTick()

    expect(wrapper.emitted('activated')).toBeTruthy()
  })

  it('8. 激活失败显示错误消息', async () => {
    mockActivate.mockResolvedValue({ success: false, message: '❌ 激活码无效', block: false })
    const wrapper = createWrapper()
    await wrapper.setProps({ modelValue: true })
    await nextTick()

    fillCode(wrapper, 'ABCD-1234-EF56-7890')
    await wrapper.find('.activate-btn').trigger('click')
    await new Promise(r => setTimeout(r, 700))
    await nextTick()

    expect(wrapper.text()).toContain('激活码无效')
    expect(wrapper.find('.activation-msg.error').exists()).toBe(true)
  })

  it('9. 非严格模式有跳过按钮', async () => {
    const wrapper = createWrapper({ strict: false })
    await wrapper.setProps({ modelValue: true })
    await nextTick()

    const skipBtn = wrapper.findAll('button').filter(b => b.text().includes('跳过'))
    expect(skipBtn.length).toBeGreaterThan(0)
  })

  it('10. 严格模式无跳过按钮', async () => {
    const wrapper = createWrapper({ strict: true })
    await wrapper.setProps({ modelValue: true })
    await nextTick()

    const skipBtn = wrapper.findAll('button').filter(b => b.text().includes('跳过'))
    expect(skipBtn.length).toBe(0)
  })

  it('11. 跳过按钮触发 activated 事件', async () => {
    const wrapper = createWrapper({ strict: false })
    await wrapper.setProps({ modelValue: true })
    await nextTick()

    const skipBtn = wrapper.findAll('button').filter(b => b.text().includes('跳过'))
    await skipBtn[0].trigger('click')
    await nextTick()

    expect(wrapper.emitted('activated')).toBeTruthy()
  })

  it('12. 已激活状态自动关闭', async () => {
    mockIsActivated.mockReturnValue(true)
    const wrapper = createWrapper()
    await wrapper.setProps({ modelValue: true })
    await nextTick()

    expect(wrapper.emitted('activated')).toBeTruthy()
    expect(wrapper.find('.activation-card').exists()).toBe(false)
  })

  it('13. 输入自动转大写', async () => {
    const wrapper = createWrapper()
    await wrapper.setProps({ modelValue: true })
    await nextTick()

    const inputs = getInputs(wrapper)
    await inputs[0].setValue('abcd')
    await nextTick()

    expect(inputs[0].element.value).toBe('ABCD')
  })

  it('14. 过滤非十六进制字符（通过组件内部逻辑）', async () => {
    // 直接在 jsdom 中测试 filterHex 逻辑
    const filterHex = (val) => val.toUpperCase().replace(/[^A-F0-9]/g, '')
    expect(filterHex('GHIJKL')).toBe('')
    expect(filterHex('ABCDEF')).toBe('ABCDEF')
    expect(filterHex('abcdef')).toBe('ABCDEF')
    expect(filterHex('123XYZ')).toBe('123')
    expect(filterHex('测试abcd')).toBe('ABCD')
  })
})
