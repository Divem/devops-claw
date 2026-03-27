import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LandingFooter from '@/components/landing/LandingFooter.vue'

describe('LandingFooter', () => {
  it('渲染品牌 Logo', () => {
    const wrapper = mount(LandingFooter)
    expect(wrapper.find('.brand-name').text()).toBe('DevOps Claw')
  })

  it('渲染所有导航链接', () => {
    const wrapper = mount(LandingFooter)
    const links = wrapper.findAll('.nav-link')
    expect(links).toHaveLength(5)
    expect(links[0].text()).toBe('文档')
    expect(links[1].text()).toBe('API')
    expect(links[2].text()).toBe('社区')
    expect(links[3].text()).toBe('状态页')
    expect(links[4].text()).toBe('更新日志')
  })

  it('渲染版权信息', () => {
    const wrapper = mount(LandingFooter)
    const copyright = wrapper.find('.copyright')
    expect(copyright.exists()).toBe(true)
    expect(copyright.text()).toContain('Copyright')
    expect(copyright.text()).toContain('DevOps Claw')
  })

  it('不包含飞书品牌文案', () => {
    const wrapper = mount(LandingFooter)
    const html = wrapper.html()
    expect(html).not.toContain('飞书')
  })
})
