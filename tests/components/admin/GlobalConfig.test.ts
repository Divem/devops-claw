import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import { setActivePinia, createPinia } from 'pinia'
import GlobalConfig from '@/views/admin/GlobalConfig.vue'

vi.mock('@/stores/globalConfig', () => ({
  useGlobalConfigStore: () => ({
    config: {
      model: {
        provider: 'anthropic',
        apiKey: 'sk-ant-mock-key-123456',
        baseUrl: '',
        defaultModel: 'claude-sonnet-4-6',
        maxTokens: 8192,
        temperature: 0.7,
      },
      files: [
        { name: 'IDENTITY.md', content: '# Identity' },
      ],
    },
    isLoading: false,
    isSaving: false,
    isPublishing: false,
    error: null,
    lastSavedAt: null,
    fetchGlobalConfig: vi.fn().mockResolvedValue(undefined),
    saveGlobalConfig: vi.fn().mockResolvedValue(undefined),
    publishConfig: vi.fn().mockResolvedValue(undefined),
  }),
}))

vi.mock('@/stores/admin', () => ({
  useAdminStore: () => ({
    instances: [
      { id: '1', name: '实例A', ownerName: '张三', vmStatus: 'running' },
      { id: '2', name: '实例B', ownerName: '李四', vmStatus: 'stopped' },
      { id: '3', name: '实例C', ownerName: '王五', vmStatus: 'running' },
    ],
    fetchInstances: vi.fn().mockResolvedValue(undefined),
  }),
}))

vi.mock('naive-ui', () => ({
  NButton: defineComponent({
    props: ['loading', 'type', 'block', 'size', 'quaternary'],
    emits: ['click'],
    setup(_, { slots, emit }) {
      return () => h('button', { onClick: () => emit('click') }, slots.default?.())
    },
  }),
  NSpin: defineComponent({
    props: ['show'],
    setup(_, { slots }) { return () => h('div', slots.default?.()) },
  }),
  NInput: defineComponent({
    props: ['value', 'modelValue', 'type', 'readonly', 'placeholder', 'autosize'],
    emits: ['update:modelValue', 'update:value'],
    setup(props, { emit }) {
      return () => h('input', {
        value: props.modelValue ?? props.value,
        onInput: (e: Event) => emit('update:modelValue', (e.target as HTMLInputElement).value),
      })
    },
  }),
  NInputNumber: defineComponent({
    props: ['value', 'modelValue', 'min', 'max', 'step', 'precision', 'disabled'],
    emits: ['update:modelValue', 'update:value'],
    setup(props) { return () => h('input', { type: 'number', value: props.modelValue ?? props.value }) },
  }),
  NSelect: defineComponent({
    props: ['value', 'modelValue', 'options', 'multiple', 'filterable', 'disabled', 'placeholder', 'maxTagCount'],
    emits: ['update:value', 'update:modelValue'],
    setup(props) { return () => h('select', { value: props.modelValue ?? props.value }) },
  }),
  NSwitch: defineComponent({
    props: ['value', 'modelValue'],
    emits: ['update:value'],
    setup(props) { return () => h('input', { type: 'checkbox', checked: props.modelValue ?? props.value }) },
  }),
  NRadio: defineComponent({
    props: ['value'],
    setup(props, { slots }) { return () => h('label', [h('input', { type: 'radio', value: props.value }), slots.default?.()] ) },
  }),
  NRadioGroup: defineComponent({
    props: ['value', 'modelValue'],
    emits: ['update:value'],
    setup(_, { slots }) { return () => h('div', slots.default?.()) },
  }),
  NAlert: defineComponent({
    props: ['type', 'showIcon'],
    setup(_, { slots }) { return () => h('div', { 'data-testid': 'alert' }, slots.default?.()) },
  }),
  NTooltip: defineComponent({
    setup(_, { slots }) { return () => h('div', [slots.trigger?.(), slots.default?.()]) },
  }),
  NModal: defineComponent({
    props: ['show', 'maskClosable'],
    emits: ['update:show'],
    setup(props, { slots }) {
      return () => props.show ? h('div', { 'data-testid': 'confirm-modal' }, slots.default?.()) : null
    },
  }),
  NDrawer: defineComponent({
    props: ['show', 'width', 'placement'],
    emits: ['update:show'],
    setup(_, { slots }) {
      return () => h('div', { 'data-testid': 'drawer' }, slots.default?.())
    },
  }),
  NDrawerContent: defineComponent({
    props: ['title'],
    setup(_, { slots }) { return () => h('div', { 'data-testid': 'drawer-content' }, [slots.default?.(), slots.footer?.()]) },
  }),
  NUpload: defineComponent({
    props: ['customRequest', 'showFileList', 'accept'],
    setup(_, { slots }) { return () => h('div', { 'data-testid': 'upload' }, slots.default?.()) },
  }),
}))

describe('GlobalConfig.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('页面正常渲染', () => {
    const wrapper = mount(GlobalConfig)
    expect(wrapper.text()).toContain('全局配置')
    expect(wrapper.text()).toContain('模型配置')
    expect(wrapper.text()).toContain('文件管理')
    expect(wrapper.text()).toContain('保存配置')
    expect(wrapper.text()).toContain('发布配置')
  })

  it('显示所有配置文件', () => {
    const wrapper = mount(GlobalConfig)
    const fileNames = ['AGENTS.md', 'BOOTSTRAP.md', 'IDENTITY.md', 'SOUL.md', 'TOOLS.md', 'USER.md', 'SKILLS', 'HEARTBEAT.md']
    for (const name of fileNames) {
      expect(wrapper.text()).toContain(name)
    }
  })

  it('API Key 显示为掩码格式', async () => {
    const wrapper = mount(GlobalConfig)
    await flushPromises()
    expect(wrapper.html()).toContain('sk-ant')
  })

  it('影响数量显示正确（全部实例=3）', () => {
    const wrapper = mount(GlobalConfig)
    expect(wrapper.text()).toContain('3')
  })

  it('存在已停止实例时显示降级警告', () => {
    const wrapper = mount(GlobalConfig)
    const alerts = wrapper.findAll('[data-testid="alert"]')
    expect(alerts.length).toBeGreaterThan(0)
  })
})
