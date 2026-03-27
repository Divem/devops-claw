import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FeatureCards from '@/components/landing/FeatureCards.vue'

describe('FeatureCards', () => {
  it('渲染 section 标题', () => {
    const wrapper = mount(FeatureCards)
    expect(wrapper.find('.section-title').text()).toBe('好上手，超能干，更放心')
  })

  it('渲染三个特性卡片', () => {
    const wrapper = mount(FeatureCards)
    const cards = wrapper.findAll('.feature-card')
    expect(cards).toHaveLength(3)
  })

  it('第一个卡片内容正确', () => {
    const wrapper = mount(FeatureCards)
    const cards = wrapper.findAll('.feature-card')
    expect(cards[0].find('.feature-title').text()).toBe('一键部署，所见即所得')
    expect(cards[0].find('.feature-description').text()).toContain('即时通讯')
  })

  it('第二个卡片内容正确', () => {
    const wrapper = mount(FeatureCards)
    const cards = wrapper.findAll('.feature-card')
    expect(cards[1].find('.feature-title').text()).toBe('原生体验，能力无损')
    expect(cards[1].find('.feature-description').text()).toContain('官方集成插件')
  })

  it('第三个卡片内容正确', () => {
    const wrapper = mount(FeatureCards)
    const cards = wrapper.findAll('.feature-card')
    expect(cards[2].find('.feature-title').text()).toBe('企业级安全，数据不离场')
    expect(cards[2].find('.feature-description').text()).toContain('企业内网')
  })

  it('每个卡片都有图标', () => {
    const wrapper = mount(FeatureCards)
    const icons = wrapper.findAll('.feature-icon img')
    expect(icons).toHaveLength(3)
  })
})
