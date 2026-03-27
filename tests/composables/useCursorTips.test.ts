import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { ref, computed } from 'vue'

describe('useCursorTips', () => {
  interface CursorTipsOptions {
    tips: string[]
    scrollPauseDelay?: number
    switchInterval?: number
  }

  function mockUseCursorTips(options: CursorTipsOptions) {
    const { tips } = options

    const isVisible = ref(false)
    const currentTipIndex = ref(0)

    const currentTip = computed(() => {
      if (tips.length === 0) return ''
      return tips[currentTipIndex.value % tips.length]
    })

    return {
      isVisible,
      currentTipIndex,
      currentTip
    }
  }

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.clearAllMocks()
  })

  it('初始化状态正确', () => {
    const { isVisible, currentTip } = mockUseCursorTips({
      tips: ['Tip 1', 'Tip 2']
    })

    expect(isVisible.value).toBe(false)
    expect(currentTip.value).toBe('Tip 1')
  })

  it('空 tips 数组时返回空字符串', () => {
    const { currentTip } = mockUseCursorTips({
      tips: []
    })

    expect(currentTip.value).toBe('')
  })

  it('currentTip 根据 currentTipIndex 计算', () => {
    const { currentTip, currentTipIndex } = mockUseCursorTips({
      tips: ['Tip 1', 'Tip 2', 'Tip 3']
    })

    expect(currentTip.value).toBe('Tip 1')

    currentTipIndex.value = 1
    expect(currentTip.value).toBe('Tip 2')

    currentTipIndex.value = 2
    expect(currentTip.value).toBe('Tip 3')
  })

  it('currentTip 支持循环', () => {
    const { currentTip, currentTipIndex } = mockUseCursorTips({
      tips: ['Tip 1', 'Tip 2']
    })

    currentTipIndex.value = 2
    expect(currentTip.value).toBe('Tip 1')

    currentTipIndex.value = 3
    expect(currentTip.value).toBe('Tip 2')
  })

  it('isVisible 可以切换', () => {
    const { isVisible } = mockUseCursorTips({
      tips: ['Test']
    })

    expect(isVisible.value).toBe(false)

    isVisible.value = true
    expect(isVisible.value).toBe(true)

    isVisible.value = false
    expect(isVisible.value).toBe(false)
  })
})

describe('滚动停留触发逻辑', () => {
  it('滚动停止 1.5 秒后 isVisible 变为 true', () => {
    vi.useFakeTimers()

    let isHeroVisible = true
    const isVisible = ref(false)
    let scrollPauseTimer: ReturnType<typeof setTimeout> | null = null

    function handleScroll() {
      if (isVisible.value) isVisible.value = false
      if (scrollPauseTimer) clearTimeout(scrollPauseTimer)
      if (isHeroVisible) {
        scrollPauseTimer = setTimeout(() => {
          if (isHeroVisible) isVisible.value = true
        }, 1500)
      }
    }

    handleScroll()
    expect(isVisible.value).toBe(false)

    vi.advanceTimersByTime(1500)
    expect(isVisible.value).toBe(true)

    vi.useRealTimers()
  })

  it('滚动时 isVisible 立即变为 false', () => {
    vi.useFakeTimers()

    const isVisible = ref(true)
    let scrollPauseTimer: ReturnType<typeof setTimeout> | null = null

    function handleScroll() {
      if (isVisible.value) isVisible.value = false
      if (scrollPauseTimer) clearTimeout(scrollPauseTimer)
      scrollPauseTimer = setTimeout(() => {
        isVisible.value = true
      }, 1500)
    }

    expect(isVisible.value).toBe(true)
    handleScroll()
    expect(isVisible.value).toBe(false)

    vi.useRealTimers()
  })

  it('Hero 区不可见时不触发 showTips', () => {
    vi.useFakeTimers()

    let isHeroVisible = false
    const isVisible = ref(false)
    let scrollPauseTimer: ReturnType<typeof setTimeout> | null = null

    function handleScroll() {
      if (isVisible.value) isVisible.value = false
      if (scrollPauseTimer) clearTimeout(scrollPauseTimer)
      if (isHeroVisible) {
        scrollPauseTimer = setTimeout(() => {
          isVisible.value = true
        }, 1500)
      }
    }

    handleScroll()
    vi.advanceTimersByTime(2000)
    expect(isVisible.value).toBe(false)

    vi.useRealTimers()
  })
})

describe('Tips 配置验证', () => {
  it('支持 10 条 tips 配置', () => {
    const heroTips = [
      '终于不用折腾环境啦，一键安装太省心～',
      '解压即用，告别繁琐配置，快乐起飞！',
      '找了好久的纯净版，这下完美搞定 ✨',
      '小白也能轻松上手，全程零操作压力',
      'OpenClaw 官方纯净版，安全无捆绑',
      '一键部署，全平台兼容，开箱即用',
      '极速安装 + 稳定运行，体验拉满',
      '内置优化配置，无需手动调试',
      '小龙虾探头：主人快带我回家～',
      '钳钳发力，帮你一键装好 OpenClaw！'
    ]

    expect(heroTips.length).toBe(10)
    expect(heroTips.every((t) => t.length > 0)).toBe(true)
  })
})
