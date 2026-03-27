import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { NButton, NDatePicker } from 'naive-ui'
import TimeRangeSelector from '@/components/dashboard/TimeRangeSelector.vue'

describe('TimeRangeSelector', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('渲染预设按钮', () => {
    const wrapper = mount(TimeRangeSelector, {
      props: {
        modelValue: {
          start: '2024-01-01',
          end: '2024-01-30',
          days: 30,
        },
      },
      global: {
        components: {
          NButton,
          NDatePicker,
        },
      },
    })

    const buttons = wrapper.findAllComponents(NButton)
    expect(buttons.length).toBeGreaterThanOrEqual(4)
    
    const buttonTexts = buttons.map(b => b.text())
    expect(buttonTexts).toContain('近7天')
    expect(buttonTexts).toContain('近30天')
    expect(buttonTexts).toContain('近90天')
    expect(buttonTexts).toContain('自定义')
  })

  it('点击预设按钮触发 change 事件', async () => {
    const wrapper = mount(TimeRangeSelector, {
      props: {
        modelValue: {
          start: '2024-01-01',
          end: '2024-01-30',
          days: 30,
        },
      },
      global: {
        components: {
          NButton,
          NDatePicker,
        },
      },
    })

    const buttons = wrapper.findAllComponents(NButton)
    const sevenDayButton = buttons.find(b => b.text() === '近7天')
    
    expect(sevenDayButton).toBeDefined()
  })

  it('默认选中近30天', () => {
    const wrapper = mount(TimeRangeSelector, {
      props: {
        modelValue: {
          start: '2024-01-01',
          end: '2024-01-30',
          days: 30,
        },
      },
      global: {
        components: {
          NButton,
          NDatePicker,
        },
      },
    })

    const buttons = wrapper.findAllComponents(NButton)
    const thirtyDayButton = buttons.find(b => b.text() === '近30天')
    
    expect(thirtyDayButton?.props('type')).toBe('primary')
  })
})
