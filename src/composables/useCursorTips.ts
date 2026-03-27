import { ref, computed, onMounted, onUnmounted } from 'vue'

interface CursorTipsOptions {
  tips: string[]
  scrollPauseDelay?: number
  switchInterval?: number
  containerSelector?: string
}

interface CursorTipsState {
  isVisible: boolean
  currentTip: string
  position: { x: number; y: number }
}

export function useCursorTips(options: CursorTipsOptions) {
  const {
    tips,
    scrollPauseDelay = 1500,
    switchInterval = 3000,
    containerSelector = '.hero-section'
  } = options

  const isVisible = ref(false)
  const currentTipIndex = ref(0)
  const position = ref({ x: 0, y: 0 })

  let scrollPauseTimer: number | null = null
  let switchTimer: number | null = null
  let isHeroVisible = false
  let observer: IntersectionObserver | null = null
  let lastScrollHandleTime = 0

  const currentTip = computed(() => {
    if (tips.length === 0) return ''
    return tips[currentTipIndex.value % tips.length]
  })

  const state = computed((): CursorTipsState => ({
    isVisible: isVisible.value,
    currentTip: currentTip.value,
    position: position.value
  }))

  function startSwitchTimer() {
    if (switchTimer) clearInterval(switchTimer)
    switchTimer = window.setInterval(() => {
      if (isVisible.value && tips.length > 1) {
        currentTipIndex.value = (currentTipIndex.value + 1) % tips.length
      }
    }, switchInterval)
  }

  function clearSwitchTimer() {
    if (switchTimer) {
      clearInterval(switchTimer)
      switchTimer = null
    }
  }

  function showTips() {
    if (tips.length === 0) return
    isVisible.value = true
    startSwitchTimer()
  }

  function hideTips() {
    isVisible.value = false
    clearSwitchTimer()
    currentTipIndex.value = 0
  }

  function startPauseTimer() {
    if (scrollPauseTimer) clearTimeout(scrollPauseTimer)
    scrollPauseTimer = window.setTimeout(() => {
      if (isHeroVisible) showTips()
    }, scrollPauseDelay)
  }

  let mousePauseTimer: number | null = null

  function handleMouseMove(event: MouseEvent) {
    position.value = { x: event.clientX, y: event.clientY }

    // 移动时立即隐藏
    if (isVisible.value) hideTips()

    // 重置停留计时器
    if (mousePauseTimer) clearTimeout(mousePauseTimer)
    if (isHeroVisible) {
      mousePauseTimer = window.setTimeout(() => {
        if (isHeroVisible) showTips()
      }, scrollPauseDelay)
    }
  }

  function handleScroll() {
    const now = Date.now()
    if (now - lastScrollHandleTime < 100) return
    lastScrollHandleTime = now

    if (isVisible.value) hideTips()

    if (isHeroVisible) startPauseTimer()
  }

  function setupIntersectionObserver() {
    const container = document.querySelector(containerSelector)
    if (!container) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isHeroVisible = entry.isIntersecting
          if (isHeroVisible) {
            startPauseTimer()
          } else {
            hideTips()
            if (scrollPauseTimer) {
              clearTimeout(scrollPauseTimer)
              scrollPauseTimer = null
            }
          }
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(container)
  }

  onMounted(() => {
    setupIntersectionObserver()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('mousemove', handleMouseMove)
    if (observer) {
      observer.disconnect()
      observer = null
    }
    if (scrollPauseTimer) clearTimeout(scrollPauseTimer)
    if (mousePauseTimer) clearTimeout(mousePauseTimer)
    clearSwitchTimer()
  })

  return {
    state,
    isVisible: computed(() => isVisible.value),
    currentTip,
    position: computed(() => position.value),
    currentTipIndex: computed(() => currentTipIndex.value)
  }
}
