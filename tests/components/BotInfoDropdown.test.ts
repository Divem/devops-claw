import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { defineComponent, h } from 'vue'
import BotInfoDropdown from '@/components/BotInfoDropdown.vue'
import { useProjectStore } from '@/stores/project'

const mockMessage = {
  success: vi.fn(),
  error: vi.fn(),
  warning: vi.fn(),
  info: vi.fn(),
  loading: vi.fn(),
}

vi.mock('naive-ui', async () => {
  return {
    NPopover: defineComponent({
      props: ['trigger', 'placement', 'width'],
      inheritAttrs: false,
      setup(_props, { slots }) {
        return () => h('div', { 'data-testid': 'popover' }, [
          slots.trigger?.(),
          slots.default?.(),
        ])
      },
    }),
    NButton: defineComponent({
      props: ['disabled', 'loading', 'type', 'block', 'size'],
      inheritAttrs: false,
      setup(props, { slots, attrs }) {
        return () => h('button', { ...props, ...attrs }, slots.default?.())
      },
    }),
    NInput: defineComponent({
      props: ['value', 'type', 'placeholder', 'size', 'status'],
      inheritAttrs: false,
      setup(props, { attrs, emit }) {
        const onInput = (e: Event) => {
          emit('update:value', (e.target as HTMLInputElement).value)
        }
        return () => h('input', { 
          ...props, 
          ...attrs, 
          value: props.value,
          onInput 
        })
      },
    }),
    NTag: defineComponent({
      props: ['type', 'size', 'round'],
      inheritAttrs: false,
      setup(props, { slots }) {
        return () => h('span', { 'data-tag-type': props.type }, slots.default?.())
      },
    }),
    useMessage: () => mockMessage,
  }
})

const mockProject = {
  id: '1',
  botName: '测试机器人',
  appId: 'cli_xxx',
  feishuChatUrl: 'https://applink.feishu.cn/client/chat/open',
  createdAt: '2026-03-26',
}

function mountDropdown(projectData?: typeof mockProject) {
  const pinia = createPinia()
  setActivePinia(pinia)
  return mount(BotInfoDropdown, {
    props: {
      project: projectData !== undefined ? projectData : mockProject,
    },
    global: { plugins: [pinia] },
  })
}

describe('BotInfoDropdown', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('渲染去对话按钮', () => {
    const wrapper = mountDropdown()
    expect(wrapper.text()).toContain('去对话')
    expect(wrapper.find('[data-testid="popover"]').exists()).toBe(true)
  })

  it('渲染模式下显示 App ID', () => {
    const wrapper = mountDropdown()
    expect(wrapper.text()).toContain('cli_xxx')
  })

  it('渲染模式下显示 App Secret 占位符', () => {
    const wrapper = mountDropdown()
    expect(wrapper.text()).toContain('••••••••')
  })

  it('显示配置机器人按钮', () => {
    const wrapper = mountDropdown()
    expect(wrapper.text()).toContain('配置机器人')
  })

  it('点击配置机器人按钮进入编辑模式', async () => {
    const wrapper = mountDropdown()
    const editBtn = wrapper.findAll('button').find(b => b.text().includes('配置机器人'))
    expect(editBtn).toBeDefined()
    
    await editBtn!.trigger('click')
    
    // 编辑模式下应该显示 App ID 输入框
    expect(wrapper.find('[data-testid="edit-app-id-input"]').exists()).toBe(true)
    // 编辑模式下应该显示 Secret 输入框
    expect(wrapper.find('[data-testid="edit-secret-input"]').exists()).toBe(true)
  })

  it('编辑模式下显示保存和取消按钮', async () => {
    const wrapper = mountDropdown()
    const editBtn = wrapper.findAll('button').find(b => b.text().includes('配置机器人'))
    await editBtn!.trigger('click')
    
    expect(wrapper.text()).toContain('保存')
    expect(wrapper.text()).toContain('取消')
  })

  it('点击取消按钮返回查看模式', async () => {
    const wrapper = mountDropdown()
    const editBtn = wrapper.findAll('button').find(b => b.text().includes('配置机器人'))
    await editBtn!.trigger('click')
    
    const cancelBtn = wrapper.findAll('button').find(b => b.text() === '取消')
    await cancelBtn!.trigger('click')
    
    // 回到查看模式，应该显示配置机器人按钮
    expect(wrapper.text()).toContain('配置机器人')
    expect(wrapper.find('[data-testid="edit-app-id-input"]').exists()).toBe(false)
  })

  it('验证 App ID 格式', async () => {
    const wrapper = mountDropdown()
    const editBtn = wrapper.findAll('button').find(b => b.text().includes('配置机器人'))
    await editBtn!.trigger('click')
    
    const appIdInput = wrapper.find<HTMLInputElement>('[data-testid="edit-app-id-input"]')
    await appIdInput.setValue('invalid-id')
    
    const saveBtn = wrapper.findAll('button').find(b => b.text() === '保存')
    await saveBtn!.trigger('click')
    
    // 应该显示错误消息
    expect(wrapper.text()).toContain('App ID 格式不正确')
  })

  it('验证 App Secret 长度', async () => {
    const wrapper = mountDropdown()
    const editBtn = wrapper.findAll('button').find(b => b.text().includes('配置机器人'))
    await editBtn!.trigger('click')
    
    const appIdInput = wrapper.find<HTMLInputElement>('[data-testid="edit-app-id-input"]')
    const secretInput = wrapper.find<HTMLInputElement>('[data-testid="edit-secret-input"]')
    
    await appIdInput.setValue('cli_valid123')
    await secretInput.setValue('short')
    
    const saveBtn = wrapper.findAll('button').find(b => b.text() === '保存')
    await saveBtn!.trigger('click')
    
    // 应该显示错误消息
    expect(wrapper.text()).toContain('App Secret 长度不能少于')
  })

  it('有效的凭证可以提交', async () => {
    const wrapper = mountDropdown()
    const store = useProjectStore()
    store.setProject(mockProject as any)
    vi.spyOn(store, 'updateBotConfig').mockResolvedValue(true)
    
    const editBtn = wrapper.findAll('button').find(b => b.text().includes('配置机器人'))
    await editBtn!.trigger('click')
    
    const appIdInput = wrapper.find<HTMLInputElement>('[data-testid="edit-app-id-input"]')
    const secretInput = wrapper.find<HTMLInputElement>('[data-testid="edit-secret-input"]')
    
    await appIdInput.setValue('cli_valid123')
    await secretInput.setValue('valid_secret_123')
    
    const saveBtn = wrapper.findAll('button').find(b => b.text() === '保存')
    await saveBtn!.trigger('click')
    
    // 等待异步操作完成
    await wrapper.vm.$nextTick()
    
    // 验证 store 方法被调用，同时传递了 appId 和 appSecret
    expect(store.updateBotConfig).toHaveBeenCalledWith({
      appId: 'cli_valid123',
      appSecret: 'valid_secret_123',
    })
  })

  it('保存成功时显示成功提示', async () => {
    const wrapper = mountDropdown()
    const store = useProjectStore()
    store.setProject(mockProject as any)
    vi.spyOn(store, 'updateBotConfig').mockResolvedValue(true)
    
    const editBtn = wrapper.findAll('button').find(b => b.text().includes('配置机器人'))
    await editBtn!.trigger('click')
    
    const appIdInput = wrapper.find<HTMLInputElement>('[data-testid="edit-app-id-input"]')
    const secretInput = wrapper.find<HTMLInputElement>('[data-testid="edit-secret-input"]')
    
    await appIdInput.setValue('cli_valid123')
    await secretInput.setValue('valid_secret_123')
    
    const saveBtn = wrapper.findAll('button').find(b => b.text() === '保存')
    await saveBtn!.trigger('click')
    
    await wrapper.vm.$nextTick()
    
    expect(mockMessage.success).toHaveBeenCalledWith('机器人凭证已更新')
  })

  it('保存失败时显示错误提示', async () => {
    const wrapper = mountDropdown()
    const store = useProjectStore()
    store.setProject(mockProject as any)
    vi.spyOn(store, 'updateBotConfig').mockResolvedValue(false)
    
    const editBtn = wrapper.findAll('button').find(b => b.text().includes('配置机器人'))
    await editBtn!.trigger('click')
    
    const appIdInput = wrapper.find<HTMLInputElement>('[data-testid="edit-app-id-input"]')
    const secretInput = wrapper.find<HTMLInputElement>('[data-testid="edit-secret-input"]')
    
    await appIdInput.setValue('cli_valid123')
    await secretInput.setValue('valid_secret_123')
    
    const saveBtn = wrapper.findAll('button').find(b => b.text() === '保存')
    await saveBtn!.trigger('click')
    
    await wrapper.vm.$nextTick()
    
    expect(mockMessage.error).toHaveBeenCalledWith('保存失败，请重试')
  })
})
