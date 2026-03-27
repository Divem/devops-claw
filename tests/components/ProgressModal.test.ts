import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import ProgressModal from '@/components/ProgressModal.vue'
import type { StepInfo } from '@/types/project'

// Mock naive-ui 组件
vi.mock('naive-ui', async () => {
  return {
    NModal: defineComponent({
      props: ['show', 'maskClosable', 'closable'],
      inheritAttrs: false,
      setup(props, { slots }) {
        return () => h('div', { 'data-testid': 'modal', 'data-show': props.show }, slots.default?.())
      },
    }),
    NButton: defineComponent({
      props: ['type', 'size', 'block', 'disabled', 'loading'],
      inheritAttrs: false,
      setup(props, { slots, attrs }) {
        return () => h('button', { 
          ...props, 
          ...attrs,
          disabled: props.disabled,
        }, slots.default?.())
      },
    }),
  }
})

const defaultSteps: StepInfo[] = [
  { key: 'vm', label: '启动云端电脑', status: 'done', elapsed: 2 },
  { key: 'openclaw', label: '启动 OpenClaw', status: 'running' },
  { key: 'feishu', label: '连接飞书', status: 'pending' },
]

function mountModal(steps: StepInfo[] = defaultSteps, skippedBotConfig = false) {
  return mount(ProgressModal, {
    props: { 
      show: true, 
      steps,
      skippedBotConfig,
    },
  })
}

describe('ProgressModal', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('渲染所有步骤', () => {
    const wrapper = mountModal()
    expect(wrapper.text()).toContain('启动云端电脑')
    expect(wrapper.text()).toContain('启动 OpenClaw')
    expect(wrapper.text()).toContain('连接飞书')
  })

  it('OpenClaw 步骤完成时可点击', () => {
    const steps: StepInfo[] = [
      { key: 'vm', label: '启动云端电脑', status: 'done', elapsed: 2 },
      { key: 'openclaw', label: '启动 OpenClaw', status: 'done', elapsed: 3 },
      { key: 'feishu', label: '连接飞书', status: 'pending' },
    ]
    const wrapper = mountModal(steps)
    
    // OpenClaw 步骤应该有可点击的样式类
    const stepItems = wrapper.findAll('.step-item')
    const openclawStep = stepItems[1]
    expect(openclawStep.classes()).toContain('step-clickable')
  })

  it('OpenClaw 步骤未完成时不可点击', () => {
    const wrapper = mountModal()
    
    const stepItems = wrapper.findAll('.step-item')
    const openclawStep = stepItems[1]
    expect(openclawStep.classes()).not.toContain('step-clickable')
  })

  it('点击 OpenClaw 步骤触发 skipToStep 事件', async () => {
    const steps: StepInfo[] = [
      { key: 'vm', label: '启动云端电脑', status: 'done', elapsed: 2 },
      { key: 'openclaw', label: '启动 OpenClaw', status: 'done', elapsed: 3 },
      { key: 'feishu', label: '连接飞书', status: 'pending' },
    ]
    const wrapper = mountModal(steps)
    
    const stepItems = wrapper.findAll('.step-item')
    const openclawStep = stepItems[1]
    await openclawStep.trigger('click')
    
    const emitted = wrapper.emitted('skipToStep')
    expect(emitted).toBeTruthy()
    expect(emitted![0]).toEqual(['feishu'])
  })

  it('显示跳过机器人配置的提示', () => {
    const steps: StepInfo[] = [
      { key: 'vm', label: '启动云端电脑', status: 'done', elapsed: 2 },
      { key: 'openclaw', label: '启动 OpenClaw', status: 'done', elapsed: 3 },
      { key: 'feishu', label: '连接飞书', status: 'done', elapsed: 1 },
    ]
    const wrapper = mountModal(steps, true)
    
    expect(wrapper.text()).toContain('本次跳过机器人配置')
  })

  it('不显示跳过提示当没有跳过配置', () => {
    const steps: StepInfo[] = [
      { key: 'vm', label: '启动云端电脑', status: 'done', elapsed: 2 },
      { key: 'openclaw', label: '启动 OpenClaw', status: 'done', elapsed: 3 },
      { key: 'feishu', label: '连接飞书', status: 'done', elapsed: 1 },
    ]
    const wrapper = mountModal(steps, false)
    
    expect(wrapper.text()).not.toContain('本次跳过机器人配置')
  })

  it('出现错误时显示重试按钮', () => {
    const steps: StepInfo[] = [
      { key: 'vm', label: '启动云端电脑', status: 'error' },
      { key: 'openclaw', label: '启动 OpenClaw', status: 'pending' },
      { key: 'feishu', label: '连接飞书', status: 'pending' },
    ]
    const wrapper = mountModal(steps)
    
    expect(wrapper.text()).toContain('重试')
  })

  it('点击重试按钮触发 retry 事件', async () => {
    const steps: StepInfo[] = [
      { key: 'vm', label: '启动云端电脑', status: 'error' },
      { key: 'openclaw', label: '启动 OpenClaw', status: 'pending' },
      { key: 'feishu', label: '连接飞书', status: 'pending' },
    ]
    const wrapper = mountModal(steps)
    
    const retryBtn = wrapper.find('button')
    await retryBtn.trigger('click')
    
    const emitted = wrapper.emitted('retry')
    expect(emitted).toBeTruthy()
  })
})
