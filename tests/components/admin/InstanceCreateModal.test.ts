import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h, ref } from 'vue'
import { setActivePinia, createPinia } from 'pinia'
import InstanceCreateModal from '@/components/admin/InstanceCreateModal.vue'

vi.mock('naive-ui', () => ({
  NModal: defineComponent({
    props: ['show', 'maskClosable', 'preset', 'title', 'style'],
    emits: ['update:show'],
    setup(props, { slots }) {
      return () => props.show
        ? h('div', { 'data-testid': 'modal' }, [slots.default?.(), slots.footer?.()])
        : null
    },
  }),
  NForm: defineComponent({
    props: ['model', 'rules', 'labelPlacement', 'labelWidth'],
    setup(_, { slots, expose }) {
      expose({ validate: async () => {} })
      return () => h('form', slots.default?.())
    },
  }),
  NFormItem: defineComponent({
    props: ['label', 'path'],
    setup(_, { slots }) {
      return () => h('div', slots.default?.())
    },
  }),
  NInput: defineComponent({
    props: ['value', 'placeholder', 'maxlength', 'showCount', 'disabled'],
    emits: ['update:value'],
    setup(props, { emit }) {
      return () => h('input', {
        value: props.value,
        disabled: props.disabled,
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
  useMessage: () => ({ success: vi.fn(), error: vi.fn() }),
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

vi.mock('@/stores/admin', () => ({
  useAdminStore: () => ({
    createInstance: vi.fn().mockResolvedValue({ ok: true }),
    fetchInstances: vi.fn(),
  }),
}))

describe('InstanceCreateModal', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('show=false 时不渲染弹窗内容', () => {
    const wrapper = mount(InstanceCreateModal, { props: { show: false } })
    expect(wrapper.find('[data-testid="modal"]').exists()).toBe(false)
  })

  it('show=true 时渲染弹窗', () => {
    const wrapper = mount(InstanceCreateModal, { props: { show: true } })
    expect(wrapper.find('[data-testid="modal"]').exists()).toBe(true)
  })

  it('渲染用户选择器', () => {
    const wrapper = mount(InstanceCreateModal, { props: { show: true } })
    expect(wrapper.find('[data-testid="user-select"]').exists()).toBe(true)
  })

  it('无错误时不显示 alert', () => {
    const wrapper = mount(InstanceCreateModal, { props: { show: true } })
    expect(wrapper.find('[data-testid="alert"]').exists()).toBe(false)
  })
})
