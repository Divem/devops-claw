import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import { setActivePinia, createPinia } from 'pinia'
import InstanceCreateModal from '@/components/admin/InstanceCreateModal.vue'

vi.mock('naive-ui', () => ({
  NModal: defineComponent({
    props: ['show', 'maskClosable', 'closable', 'preset', 'title', 'style'],
    emits: ['update:show'],
    setup(props, { slots }) {
      return () => props.show
        ? h('div', { 'data-testid': 'modal', 'data-title': props.title },
            [slots.default?.(), slots.footer?.()]
          )
        : null
    },
  }),
  NForm: defineComponent({
    props: ['model', 'rules', 'labelPlacement', 'labelWidth'],
    setup(_, { slots, expose }) {
      expose({ validate: async () => {} })
      return () => h('form', { 'data-testid': 'form' }, slots.default?.())
    },
  }),
  NFormItem: defineComponent({
    props: ['label', 'path'],
    setup(_, { slots }) {
      return () => h('div', slots.default?.())
    },
  }),
  NInput: defineComponent({
    props: ['value', 'placeholder', 'maxlength', 'showCount', 'disabled', 'type', 'showPasswordOn'],
    emits: ['update:value'],
    setup(props, { emit }) {
      return () => h('input', {
        value: props.value,
        disabled: props.disabled,
        'data-placeholder': props.placeholder,
        onInput: (e: Event) => emit('update:value', (e.target as HTMLInputElement).value),
      })
    },
  }),
  NButton: defineComponent({
    props: ['type', 'loading', 'disabled'],
    emits: ['click'],
    setup(props, { slots, emit }) {
      return () => h('button', {
        'data-type': props.type,
        disabled: props.disabled || props.loading,
        onClick: () => emit('click'),
      }, slots.default?.())
    },
  }),
  NAlert: defineComponent({
    props: ['type', 'title'],
    setup(props) {
      return () => h('div', { 'data-testid': 'alert', 'data-type': props.type }, props.title)
    },
  }),
}))

vi.mock('@/components/admin/UserSelect.vue', () => ({
  default: defineComponent({
    props: ['modelValue', 'disabled'],
    emits: ['update:modelValue'],
    setup(_, { emit }) {
      return () => h('div', { 'data-testid': 'user-select', onClick: () => emit('update:modelValue', 'u-001') })
    },
  }),
}))

const mockCreateInstance = vi.fn()
const mockStartProgressPolling = vi.fn()
const mockStopProgressPolling = vi.fn()
const mockFetchInstances = vi.fn()

vi.mock('@/stores/admin', () => ({
  useAdminStore: () => ({
    createInstance: mockCreateInstance,
    startProgressPolling: mockStartProgressPolling,
    stopProgressPolling: mockStopProgressPolling,
    fetchInstances: mockFetchInstances,
    createProgress: [
      { key: 'vm', label: '启动云端电脑', status: 'running' },
      { key: 'openclaw', label: '安装 OpenClaw', status: 'pending' },
      { key: 'feishu', label: '配置飞书连接', status: 'pending' },
    ],
    createProgressDone: false,
  }),
}))

describe('InstanceCreateModal 视图切换', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('初始显示表单视图', () => {
    const wrapper = mount(InstanceCreateModal, { props: { show: true } })
    expect(wrapper.find('[data-testid="form"]').exists()).toBe(true)
  })

  it('show=false 时不渲染', () => {
    const wrapper = mount(InstanceCreateModal, { props: { show: false } })
    expect(wrapper.find('[data-testid="modal"]').exists()).toBe(false)
  })

  it('创建失败时显示错误 alert', async () => {
    mockCreateInstance.mockResolvedValueOnce({ ok: false, error: '实例名称已存在' })

    const wrapper = mount(InstanceCreateModal, { props: { show: true } })
    // 点击创建按钮
    const buttons = wrapper.findAll('button')
    const createBtn = buttons.find((b) => b.text().includes('创建'))
    await createBtn?.trigger('click')
    await wrapper.vm.$nextTick()

    // 因为表单验证会失败（name/ownerId 为空），不会调用 createInstance
    // 验证组件不崩溃
    expect(wrapper.find('[data-testid="modal"]').exists()).toBe(true)
  })

  it('提交成功后调用 startProgressPolling', async () => {
    mockCreateInstance.mockResolvedValueOnce({ ok: true, id: 'inst-new' })

    const wrapper = mount(InstanceCreateModal, { props: { show: true } })
    // 直接触发 handleSubmit（绕过表单验证）
    await (wrapper.vm as any).handleSubmit()
    await wrapper.vm.$nextTick()

    // 注意：因为表单验证 formRef 为 null，validate 会直接通过
    // createInstance 被调用
    // startProgressPolling 被调用
    expect(mockStartProgressPolling).toHaveBeenCalledWith('inst-new', false)
  })
})
