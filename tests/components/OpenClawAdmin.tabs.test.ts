import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { defineComponent, h, nextTick } from 'vue'
import OpenClawAdmin from '@/components/OpenClawAdmin.vue'
import type { Project } from '@/types/project'

// Mock naive-ui
vi.mock('naive-ui', async () => {
  return {
    NButton: defineComponent({
      props: ['quaternary', 'size', 'type'],
      inheritAttrs: false,
      setup(_props, { slots, attrs }) {
        return () => h('button', { ...attrs }, slots.default ? slots.default() : undefined)
      },
    }),
    NAvatar: defineComponent({
      props: ['size', 'src', 'round'],
      setup(props) {
        return () => h('img', { src: props.src, width: props.size, height: props.size })
      },
    }),
    NTag: defineComponent({
      props: ['type', 'size', 'round'],
      setup(_props, { slots }) {
        return () => h('span', {}, slots.default ? slots.default() : '')
      },
    }),
  }
})

// Mock child components
vi.mock('@/views/config/ConfigCodeMode.vue', () => ({
  default: defineComponent({
    name: 'ConfigCodeMode',
    template: '<div data-testid="code-mode">Code Mode</div>',
  }),
}))

vi.mock('@/components/settings/ConsoleView.vue', () => ({
  default: defineComponent({
    name: 'ConsoleView',
    template: '<div data-testid="console-view">Console View</div>',
  }),
}))

vi.mock('@/components/config/TerminalView.vue', () => ({
  default: defineComponent({
    name: 'TerminalView',
    props: ['config'],
    template: '<div data-testid="terminal-view">Terminal View</div>',
  }),
}))

vi.mock('@/components/BotInfoDropdown.vue', () => ({
  default: defineComponent({
    name: 'BotInfoDropdown',
    props: ['project', 'size'],
    template: '<div data-testid="bot-info-dropdown">Bot Info</div>',
  }),
}))

const mockProject: Project = {
  id: 'test-project-id',
  name: 'Test Project',
  botName: 'Test Bot',
  avatarUrl: 'https://example.com/avatar.png',
  status: 'deployed',
  botConfigured: false,
  createdAt: new Date().toISOString(),
}

function mountOpenClawAdmin() {
  const pinia = createPinia()
  setActivePinia(pinia)
  
  return mount(OpenClawAdmin, {
    props: {
      project: mockProject,
    },
    global: {
      plugins: [pinia],
    },
  })
}

describe('OpenClawAdmin 标签切换', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('显示三个标签：控制台、代码模式、终端', () => {
    const wrapper = mountOpenClawAdmin()
    const tabs = wrapper.findAll('.tab-item')
    
    expect(tabs.length).toBe(3)
    expect(tabs[0].text()).toContain('控制台')
    expect(tabs[1].text()).toContain('代码模式')
    expect(tabs[2].text()).toContain('终端')
  })

  it('默认选中控制台标签', () => {
    const wrapper = mountOpenClawAdmin()
    const consoleTab = wrapper.findAll('.tab-item')[0]
    
    expect(consoleTab.classes()).toContain('active')
  })

  it('点击代码模式标签切换到代码视图', async () => {
    const wrapper = mountOpenClawAdmin()
    const codeTab = wrapper.findAll('.tab-item')[1]
    
    await codeTab.trigger('click')
    await nextTick()
    
    expect(codeTab.classes()).toContain('active')
    expect(wrapper.find('[data-testid="code-mode"]').exists()).toBe(true)
  })

  it('点击终端标签切换到终端视图', async () => {
    const wrapper = mountOpenClawAdmin()
    const terminalTab = wrapper.findAll('.tab-item')[2]
    
    await terminalTab.trigger('click')
    await nextTick()
    
    expect(terminalTab.classes()).toContain('active')
    expect(wrapper.find('[data-testid="terminal-view"]').exists()).toBe(true)
  })

  it('从终端切换到控制台正常工作', async () => {
    const wrapper = mountOpenClawAdmin()
    const terminalTab = wrapper.findAll('.tab-item')[2]
    const consoleTab = wrapper.findAll('.tab-item')[0]
    
    // 先切换到终端
    await terminalTab.trigger('click')
    await nextTick()
    
    // 再切换回控制台
    await consoleTab.trigger('click')
    await nextTick()
    
    expect(consoleTab.classes()).toContain('active')
    expect(terminalTab.classes()).not.toContain('active')
  })

  it('从终端切换到代码模式正常工作', async () => {
    const wrapper = mountOpenClawAdmin()
    const terminalTab = wrapper.findAll('.tab-item')[2]
    const codeTab = wrapper.findAll('.tab-item')[1]
    
    // 先切换到终端
    await terminalTab.trigger('click')
    await nextTick()
    
    // 再切换到代码模式
    await codeTab.trigger('click')
    await nextTick()
    
    expect(codeTab.classes()).toContain('active')
    expect(terminalTab.classes()).not.toContain('active')
  })
})
