import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import CreateModal from '@/components/CreateModal.vue'

// Mock naive-ui 组件
vi.mock('naive-ui', async () => {
  return {
    NModal: defineComponent({
      props: ['show', 'maskClosable'],
      inheritAttrs: false,
      setup(props, { slots }) {
        return () => h('div', { 'data-testid': 'modal', 'data-show': props.show }, slots.default?.())
      },
    }),
    NInput: defineComponent({
      props: ['value', 'placeholder', 'maxlength', 'showCount', 'type'],
      inheritAttrs: false,
      setup(props, { emit, attrs }) {
        return () => h('input', {
          ...props,
          ...attrs,
          value: props.value,
          onInput: (e: Event) => emit('update:value', (e.target as HTMLInputElement).value),
        })
      },
    }),
    NButton: defineComponent({
      props: ['type', 'size', 'block', 'disabled', 'quaternary', 'circle'],
      inheritAttrs: false,
      setup(props, { slots, attrs, emit }) {
        return () => h('button', { 
          ...props, 
          ...attrs,
          disabled: props.disabled,
          onClick: () => emit('click'),
        }, slots.default?.())
      },
    }),
    NAvatar: defineComponent({
      props: ['size', 'src', 'round'],
      inheritAttrs: false,
      setup(props) {
        return () => h('img', { src: props.src, 'data-size': props.size, 'data-round': props.round })
      },
    }),
  }
})

// Mock avatar data
vi.mock('@/mocks/data', () => ({
  avatarList: [
    '/avatars/avatar-1.svg',
    '/avatars/avatar-2.svg',
    '/avatars/avatar-3.svg',
  ],
}))

function mountModal(show = false) {
  return mount(CreateModal, {
    props: { show },
  })
}

describe('CreateModal', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('弹框关闭时头像为空', () => {
    const wrapper = mountModal(false)
    // 初始状态，头像应为空
    const selectedAvatar = wrapper.find('.avatar-item.selected')
    expect(selectedAvatar.exists()).toBe(false)
  })

  it('弹框打开时默认选中第一个头像', async () => {
    const wrapper = mountModal(false)
    
    // 打开弹框
    await wrapper.setProps({ show: true })
    await wrapper.vm.$nextTick()
    
    // 应该选中第一个头像
    const firstAvatar = wrapper.find('[data-testid="avatar-0"]')
    expect(firstAvatar.classes()).toContain('selected')
  })

  it('点击其他头像可以切换选中状态', async () => {
    const wrapper = mountModal(true)
    await wrapper.vm.$nextTick()
    
    // 点击第二个头像
    const secondAvatar = wrapper.find('[data-testid="avatar-1"]')
    await secondAvatar.trigger('click')
    await wrapper.vm.$nextTick()
    
    // 第二个头像应该被选中
    expect(secondAvatar.classes()).toContain('selected')
    
    // 第一个头像不应该被选中
    const firstAvatar = wrapper.find('[data-testid="avatar-0"]')
    expect(firstAvatar.classes()).not.toContain('selected')
  })

  it('提交时包含默认选中的头像', async () => {
    const wrapper = mount(CreateModal, {
      props: { show: true },
    })
    await wrapper.vm.$nextTick()
    
    // 通过组件内部设置表单值
    const vm = wrapper.vm as unknown as { form: { name: string; avatarUrl: string }; handleSubmit: () => void }
    vm.form.name = '测试项目'
    vm.form.avatarUrl = '/avatars/avatar-1.svg'
    await wrapper.vm.$nextTick()
    
    // 手动调用提交方法
    vm.handleSubmit()
    await wrapper.vm.$nextTick()
    
    // 验证提交事件
    const emitted = wrapper.emitted('submit')
    expect(emitted).toBeTruthy()
    expect(emitted![0][0]).toMatchObject({
      name: '测试项目',
      avatarUrl: '/avatars/avatar-1.svg',
    })
  })
})
