import { ref, computed, watch } from 'vue'
import { useTrendStore } from '@/stores/trend'
import type { TimeRange, TrendDataPoint } from '@/types/dashboard'

/**
 * 计算日期范围
 */
function calculateDateRange(days: number): TimeRange {
  const end = new Date()
  end.setHours(23, 59, 59, 999)

  const start = new Date(end)
  start.setDate(start.getDate() - days + 1)
  start.setHours(0, 0, 0, 0)

  return {
    start: start.toISOString().split('T')[0],
    end: end.toISOString().split('T')[0],
    days,
  }
}

/**
 * Composable: 趋势数据管理
 */
export function useTrendData() {
  const store = useTrendStore()

  // Local state
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const currentRange = ref<TimeRange>(calculateDateRange(30))

  // Computed
  const trendData = computed<TrendDataPoint[]>(() => {
    return store.filteredData
  })

  const hasData = computed(() => trendData.value.length > 0)

  const canLoadMore = computed(() => {
    // 检查是否需要加载更多数据
    const cachedDays = store.state.allData.length
    const requestedDays = currentRange.value.days
    return cachedDays < requestedDays && requestedDays <= 90
  })

  // Methods
  async function loadData(days: number = 30): Promise<TrendDataPoint[]> {
    isLoading.value = true
    error.value = null

    try {
      // 检查缓存是否足够
      const cachedDays = store.state.allData.length
      
      if (cachedDays >= days && store.isCacheValid) {
        // 使用缓存数据
        const range = calculateDateRange(days)
        currentRange.value = range
        store.setTimeRange(range)
        return store.filteredData
      }

      // 需要请求新数据
      const data = await store.fetchTrendData(days)
      const range = calculateDateRange(days)
      currentRange.value = range
      store.setTimeRange(range)
      
      return data
    } catch (err) {
      error.value = err instanceof Error ? err.message : '加载失败'
      return []
    } finally {
      isLoading.value = false
    }
  }

  async function setTimeRange(range: TimeRange): Promise<TrendDataPoint[]> {
    currentRange.value = range
    store.setTimeRange(range)

    // 检查是否需要加载更多数据
    const cachedDays = store.state.allData.length
    if (range.days > cachedDays && range.days <= 90) {
      return loadData(range.days)
    }

    return store.filteredData
  }

  async function refresh(): Promise<TrendDataPoint[]> {
    store.clearCache()
    return loadData(currentRange.value.days)
  }

  // Initialize with default range
  watch(
    currentRange,
    (newRange) => {
      store.setTimeRange(newRange)
    },
    { immediate: true }
  )

  return {
    trendData,
    currentRange,
    isLoading,
    error,
    hasData,
    canLoadMore,
    loadData,
    setTimeRange,
    refresh,
  }
}
