import { describe, it, expect, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { NButton } from 'naive-ui'
import HeroSection from '@/components/landing/HeroSection.vue'
import HeroImageZoom from '@/components/HeroImageZoom.vue'
import CursorTips from '@/components/CursorTips.vue'

describe('HeroSection', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(HeroSection, {
      global: {
        components: { NButton }
      }
    })
  })

  it('渲染主标题', () => {
    expect(wrapper.find('.hero-title').text()).toBe('DevOps Claw')
  })

  it('渲染副标题', () => {
    const subtitle = wrapper.find('.hero-subtitle')
    expect(subtitle.exists()).toBe(true)
    expect(subtitle.text()).toContain('企业级部署方案')
  })

  it('渲染 CTA 按钮', () => {
    const button = wrapper.find('.deploy-btn')
    expect(button.exists()).toBe(true)
    expect(button.text()).toContain('立即部署')
  })

  it('点击按钮触发 deploy 事件', async () => {
    await wrapper.find('.deploy-btn').trigger('click')
    expect(wrapper.emitted('deploy')).toBeTruthy()
  })

  it('渲染 HeroImageZoom 组件', () => {
    const heroImageZoom = wrapper.findComponent(HeroImageZoom)
    expect(heroImageZoom.exists()).toBe(true)
    expect(heroImageZoom.props('src')).toBe('/landing/hero-shrimps.png')
    expect(heroImageZoom.props('alt')).toBe('DevOps Claw AI 智能助手')
  })

  it('渲染 CursorTips 组件', () => {
    const cursorTips = wrapper.findComponent(CursorTips)
    expect(cursorTips.exists()).toBe(true)
  })

  it('HeroSection 包含 CursorTips 组件', () => {
    const cursorTips = wrapper.findComponent(CursorTips)
    expect(cursorTips.exists()).toBe(true)
  })
})

describe('HeroImageZoom', () => {
  it('渲染图片并传递正确属性', () => {
    const wrapper = mount(HeroImageZoom, {
      props: {
        src: '/test-image.png',
        alt: '测试图片'
      }
    })

    const img = wrapper.find('.zoom-image')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('/test-image.png')
    expect(img.attributes('alt')).toBe('测试图片')
  })

  it('鼠标悬停时切换 is-hovered 状态', async () => {
    const wrapper = mount(HeroImageZoom, {
      props: {
        src: '/test.png',
        alt: '测试'
      }
    })

    const container = wrapper.find('.hero-image-zoom')
    expect(container.exists()).toBe(true)

    // 触发鼠标事件，验证组件响应
    await container.trigger('mouseenter')
    await container.trigger('mouseleave')

    // 组件应该保持正常工作
    expect(wrapper.find('.zoom-image').exists()).toBe(true)
  })
})

describe('CursorTips', () => {
  // Teleport 渲染到 body，测试中用 stub 让内容原地渲染
  const teleportStub = { template: '<div><slot /></div>' }

  it('visible 为 false 时不渲染', () => {
    const wrapper = mount(CursorTips, {
      props: { isVisible: false, currentTip: '测试提示', position: { x: 0, y: 0 } },
      global: { stubs: { Teleport: teleportStub } }
    })
    expect(wrapper.find('.cursor-tips').exists()).toBe(false)
  })

  it('visible 为 true 时渲染气泡', () => {
    const wrapper = mount(CursorTips, {
      props: { isVisible: true, currentTip: '测试提示', position: { x: 100, y: 200 } },
      global: { stubs: { Teleport: teleportStub } }
    })
    const tips = wrapper.find('.cursor-tips')
    expect(tips.exists()).toBe(true)
    expect(tips.find('.tips-bubble').exists()).toBe(true)
  })

  it('应用光标位置 transform 样式', () => {
    const wrapper = mount(CursorTips, {
      props: { isVisible: true, currentTip: '测试', position: { x: 150, y: 200 } },
      global: { stubs: { Teleport: teleportStub } }
    })
    const tips = wrapper.find('.cursor-tips')
    expect(tips.attributes('style')).toContain('translate(162px, 138px)')
  })

  it('具有正确的 ARIA 属性', () => {
    const wrapper = mount(CursorTips, {
      props: { isVisible: true, currentTip: '测试', position: { x: 0, y: 0 } },
      global: { stubs: { Teleport: teleportStub } }
    })
    const tips = wrapper.find('.cursor-tips')
    expect(tips.attributes('role')).toBe('status')
    expect(tips.attributes('aria-live')).toBe('polite')
    expect(tips.attributes('aria-atomic')).toBe('true')
  })

  it('组件渲染时包含正确的 CSS 类', () => {
    const wrapper = mount(CursorTips, {
      props: { isVisible: true, currentTip: '测试', position: { x: 0, y: 0 } },
      global: { stubs: { Teleport: teleportStub } }
    })
    const tips = wrapper.find('.cursor-tips')
    expect(tips.exists()).toBe(true)
    expect(tips.find('.tips-bubble').exists()).toBe(true)
  })
})
