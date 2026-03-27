import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { NButton } from 'naive-ui'
import HeroSection from '@/components/landing/HeroSection.vue'

describe('HeroSection', () => {
  it('渲染主标题', () => {
    const wrapper = mount(HeroSection)
    expect(wrapper.find('.hero-title').text()).toBe('DevOps Claw')
  })

  it('渲染副标题', () => {
    const wrapper = mount(HeroSection)
    const subtitle = wrapper.find('.hero-subtitle')
    expect(subtitle.exists()).toBe(true)
    expect(subtitle.text()).toContain('企业级部署方案')
  })

  it('渲染 CTA 按钮', () => {
    const wrapper = mount(HeroSection, {
      global: {
        components: { NButton }
      }
    })
    const button = wrapper.find('.deploy-btn')
    expect(button.exists()).toBe(true)
    expect(button.text()).toContain('立即部署')
  })

  it('点击按钮触发 deploy 事件', async () => {
    const wrapper = mount(HeroSection, {
      global: {
        components: { NButton }
      }
    })
    await wrapper.find('.deploy-btn').trigger('click')
    expect(wrapper.emitted('deploy')).toBeTruthy()
  })

  it('渲染虾群插画', () => {
    const wrapper = mount(HeroSection)
    const img = wrapper.find('.shrimp-image')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('/landing/hero-shrimps.png')
    expect(img.attributes('alt')).toBe('DevOps Claw AI 智能助手')
  })
})
