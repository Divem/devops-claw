import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { TrendDataPoint, TimeRange, TrendDataState } from '@/types/dashboard'
import { getDashboardData } from '@/mocks/data'

export const useTrendStore = defineStore('trend', () => {
  // State
  const state = ref<TrendDataState>({
    allData: [],
    currentRange: {
      start: '',
      end: '',
      days: 30,
    },
    isLoading: false,
    error: null,
    lastUpdated: 0,
  })

  // Getters
  const filteredData = computed(() => {
    const { start, end } = state.value.currentRange
    if (!start || !end) return []

    return state.value.allData
      .filter((item) => item.date >= start && item.date <= end)
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((item) => ({
        date: item.date,
        count: item.count,
      }))
  })

  const hasDataForRange = computed(() => {
    const { start, end } = state.value.currentRange
    if (!start || !end || state.value.allData.length === 0) return false

    const hasStart = state.value.allData.some((item) => item.date <= start)
    const hasEnd = state.value.allData.some((item) => item.date >= end)
    return hasStart && hasEnd
  })

  const isCacheValid = computed(() => {
    const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes
    return Date.now() - state.value.lastUpdated < CACHE_DURATION
  })

  // Actions
  async function fetchTrendData(days: number): Promise<TrendDataPoint[]> {
    state.value.isLoading = true
    state.value.error = null

    try {
      const data = getDashboardData(days)

      state.value.allData = data.trend.map((item: TrendDataPoint) => ({
        ...item,
        cachedAt: Date.now(),
      }))

      state.value.lastUpdated = Date.now()
      return data.trend
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      state.value.error = errorMessage
      return []
    } finally {
      state.value.isLoading = false
    }
  }

  function setTimeRange(range: TimeRange) {
    state.value.currentRange = range
  }

  function clearCache() {
    state.value.allData = []
    state.value.lastUpdated = 0
  }

  function refresh() {
    clearCache()
    const days = state.value.currentRange.days
    return fetchTrendData(days)
  }

  return {
    state,
    filteredData,
    hasDataForRange,
    isCacheValid,
    fetchTrendData,
    setTimeRange,
    clearCache,
    refresh,
  }
})
