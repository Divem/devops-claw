import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import InteractiveTrendChart from '@/components/dashboard/InteractiveTrendChart.vue'

describe('InteractiveTrendChart', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('正确渲染图表组件', () => {
    const wrapper = mount(InteractiveTrendChart, {
      props: {
        data: [
          { date: '2024-01-01', count: 5 },
          { date: '2024-01-02', count: 3 },
          { date: '2024-01-03', count: 8 },
        ],
        height: 200,
      },
      global: {
        stubs: {
          'v-chart': true,
        },
      },
    })

    expect(wrapper.find('.interactive-trend-chart').exists()).toBe(true)
    expect(wrapper.find('.chart').exists()).toBe(true)
  })

  it('无数据时不渲染图表', () => {
    const wrapper = mount(InteractiveTrendChart, {
      props: {
        data: [],
      },
      global: {
        stubs: {
          'v-chart': true,
        },
      },
    })

    expect(wrapper.find('.chart').exists()).toBe(false)
  })

  it('接受自定义颜色和高度', () => {
    const wrapper = mount(InteractiveTrendChart, {
      props: {
        data: [{ date: '2024-01-01', count: 5 }],
        height: 300,
        color: '#ff0000',
        areaColor: 'rgba(255, 0, 0, 0.1)',
      },
      global: {
        stubs: {
          'v-chart': true,
        },
      },
    })

    expect(wrapper.find('.interactive-trend-chart').exists()).toBe(true)
  })
})
