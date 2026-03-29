import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import UserSelect from '@/components/admin/UserSelect.vue'

vi.mock('naive-ui', () => ({
  NAutoComplete: defineComponent({
    props: ['value', 'options', 'loading', 'placeholder', 'clearable'],
    emits: ['update:value', 'select', 'clear'],
    setup(props, { emit }) {
      return () => h('div', { 'data-testid': 'autocomplete', 'data-loading': props.loading },
        h('input', {
          value: props.value,
          placeholder: props.placeholder,
          onInput: (e: Event) => emit('update:value', (e.target as HTMLInputElement).value),
        }),
      )
    },
  }),
  NIcon: defineComponent({ setup: () => () => h('span') }),
  NTag: defineComponent({
    props: ['size', 'closable'],
    emits: ['close'],
    setup(_, { emit }) {
      return () => h('span', { 'data-testid': 'tag', onClick: () => emit('close') })
    },
  }),
}))

vi.mock('@vicons/ionicons5', () => ({ PersonOutline: {} }))

describe('UserSelect', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('渲染用户选择器', () => {
    const wrapper = mount(UserSelect)
    expect(wrapper.find('[data-testid="autocomplete"]').exists()).toBe(true)
  })

  it('输入时触发搜索请求', async () => {
    const mockFetch = vi.mocked(fetch)
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => [{ id: 'u-001', name: '张三', department: '研发部', avatarUrl: '/avatars/avatar-1.svg' }],
    } as Response)

    const wrapper = mount(UserSelect)
    const input = wrapper.find('input')
    await input.setValue('张')
    await input.trigger('input')

    // 等待 debounce
    await new Promise((resolve) => setTimeout(resolve, 400))
    expect(mockFetch).toHaveBeenCalledWith('/api/users/search?q=%E5%BC%A0')
  })

  it('清空搜索时不触发请求', async () => {
    const mockFetch = vi.mocked(fetch)
    const wrapper = mount(UserSelect)
    const input = wrapper.find('input')
    await input.setValue('')
    await input.trigger('input')

    await new Promise((resolve) => setTimeout(resolve, 400))
    expect(mockFetch).not.toHaveBeenCalled()
  })
})
