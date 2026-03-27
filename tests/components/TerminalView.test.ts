import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TerminalView from '@/components/config/TerminalView.vue'

// Mock naive-ui components if needed
vi.mock('naive-ui', async () => {
  return {
    useMessage: () => ({
      success: vi.fn(),
      error: vi.fn(),
    }),
  }
})

function mountTerminal(config?: Record<string, any>) {
  return mount(TerminalView, {
    props: {
      config: config || {},
    },
  })
}

describe('TerminalView', () => {
  beforeEach(() => {
    // Reset any mocks if needed
  })

  it('渲染终端欢迎信息', () => {
    const wrapper = mountTerminal()
    expect(wrapper.text()).toContain('Welcome to OpenClaw Config Terminal')
  })

  it('渲染系统信息统计', () => {
    const wrapper = mountTerminal()
    expect(wrapper.text()).toContain('System load:')
    expect(wrapper.text()).toContain('Memory usage:')
    expect(wrapper.text()).toContain('Config size:')
    expect(wrapper.text()).toContain('Last modified:')
  })

  it('渲染命令提示符', () => {
    const wrapper = mountTerminal()
    expect(wrapper.text()).toContain('root@openclaw:~#')
  })

  it('渲染 cat config.yaml 命令', () => {
    const wrapper = mountTerminal()
    expect(wrapper.text()).toContain('cat config.yaml')
  })

  it('当配置为空时显示提示信息', () => {
    const wrapper = mountTerminal({})
    expect(wrapper.text()).toContain('No configuration available')
  })

  it('正确格式化并显示配置内容', () => {
    const config = {
      name: 'test-project',
      version: '1.0.0',
      settings: {
        debug: true,
        timeout: 30,
      },
    }
    const wrapper = mountTerminal(config)
    
    const output = wrapper.find('.terminal-output')
    expect(output.exists()).toBe(true)
    expect(output.text()).toContain('name: test-project')
    expect(output.text()).toContain('version: 1.0.0')
    expect(output.text()).toContain('debug: true')
    expect(output.text()).toContain('timeout: 30')
  })

  it('正确格式化嵌套配置对象', () => {
    const config = {
      database: {
        host: 'localhost',
        port: 5432,
      },
    }
    const wrapper = mountTerminal(config)
    
    const output = wrapper.find('.terminal-output')
    expect(output.text()).toContain('database:')
    expect(output.text()).toContain('host: localhost')
    expect(output.text()).toContain('port: 5432')
  })

  it('正确格式化数组配置', () => {
    const config = {
      features: ['auth', 'logging', 'cache'],
    }
    const wrapper = mountTerminal(config)
    
    const output = wrapper.find('.terminal-output')
    expect(output.text()).toContain('features:')
    expect(output.text()).toContain('- auth')
    expect(output.text()).toContain('- logging')
    expect(output.text()).toContain('- cache')
  })

  it('使用深色背景样式', () => {
    const wrapper = mountTerminal()
    const terminalView = wrapper.find('.terminal-view')
    expect(terminalView.exists()).toBe(true)
  })

  it('使用等宽字体样式', () => {
    const wrapper = mountTerminal()
    const terminalView = wrapper.find('.terminal-view')
    expect(terminalView.exists()).toBe(true)
  })
})
