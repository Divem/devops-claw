<template>
  <div class="time-range-selector">
    <div class="preset-buttons">
      <n-button
        v-for="preset in presets"
        :key="preset.value"
        size="small"
        :type="selectedPreset === preset.value ? 'primary' : 'default'"
        @click="handlePresetClick(preset.value)"
      >
        {{ preset.label }}
      </n-button>
    </div>
    
    <div v-if="showCustomPicker" class="custom-range">
      <n-date-picker
        v-model:value="customRange"
        type="daterange"
        size="small"
        :is-date-disabled="isDateDisabled"
        @update:value="handleCustomRangeChange"
      />
      <n-button
        v-if="validationError"
        size="tiny"
        type="error"
        text
        class="error-hint"
      >
        {{ validationError }}
      </n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { NButton, NDatePicker } from 'naive-ui'
import type { TimeRange } from '@/types/dashboard'

interface Props {
  modelValue: TimeRange
  maxDays?: number
}

const props = withDefaults(defineProps<Props>(), {
  maxDays: 90,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: TimeRange): void
  (e: 'change', value: TimeRange): void
}>()

const presets: Array<{ label: string; value: number | 'custom' }> = [
  { label: '近7天', value: 7 },
  { label: '近30天', value: 30 },
  { label: '近90天', value: 90 },
  { label: '自定义', value: 'custom' },
]

const selectedPreset = ref<number | 'custom'>(30)
const customRange = ref<[number, number] | null>(null)
const validationError = ref('')
const showCustomPicker = computed(() => selectedPreset.value === 'custom')

// 计算日期范围
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

// 计算天数差
function getDaysDiff(start: string, end: string): number {
  const startDate = new Date(start)
  const endDate = new Date(end)
  const diffTime = endDate.getTime() - startDate.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
}

// 验证日期范围
function validateRange(start: string, end: string): string | null {
  const startDate = new Date(start)
  const endDate = new Date(end)
  
  if (startDate > endDate) {
    return '开始日期不能晚于结束日期'
  }
  
  const days = getDaysDiff(start, end)
  if (days > props.maxDays) {
    return `时间范围不能超过 ${props.maxDays} 天`
  }
  
  return null
}

// 禁用超出范围的日期
function isDateDisabled(timestamp: number): boolean {
  const date = new Date(timestamp)
  const today = new Date()
  today.setHours(23, 59, 59, 999)
  
  // 禁用未来日期
  if (date > today) {
    return true
  }
  
  // 禁用早于 maxDays 天前的日期
  const minDate = new Date(today)
  minDate.setDate(minDate.getDate() - props.maxDays + 1)
  minDate.setHours(0, 0, 0, 0)
  
  if (date < minDate) {
    return true
  }
  
  return false
}

// 处理预设按钮点击
function handlePresetClick(value: number | 'custom') {
  selectedPreset.value = value
  validationError.value = ''
  
  if (value !== 'custom') {
    const range = calculateDateRange(value as number)
    emit('update:modelValue', range)
    emit('change', range)
  } else {
    // 切换到自定义时，默认选择最近30天
    const defaultRange = calculateDateRange(30)
    const startTimestamp = new Date(defaultRange.start).getTime()
    const endTimestamp = new Date(defaultRange.end).getTime()
    customRange.value = [startTimestamp, endTimestamp]
    emit('update:modelValue', defaultRange)
  }
}

// 处理自定义日期范围变化
function handleCustomRangeChange(value: [number, number] | null) {
  if (!value) return
  
  const startDate = new Date(value[0])
  const endDate = new Date(value[1])
  
  const start = startDate.toISOString().split('T')[0]
  const end = endDate.toISOString().split('T')[0]
  
  const error = validateRange(start, end)
  if (error) {
    validationError.value = error
    return
  }
  
  validationError.value = ''
  const days = getDaysDiff(start, end)
  const range: TimeRange = { start, end, days }
  
  emit('update:modelValue', range)
  emit('change', range)
}

// 监听外部值变化
watch(
  () => props.modelValue,
  (newValue) => {
    // 如果是预设天数，更新按钮状态
    const preset = presets.find((p) => p.value === newValue.days)
    if (preset) {
      selectedPreset.value = preset.value as number | 'custom'
    } else {
      selectedPreset.value = 'custom'
      const startTimestamp = new Date(newValue.start).getTime()
      const endTimestamp = new Date(newValue.end).getTime()
      customRange.value = [startTimestamp, endTimestamp]
    }
  },
  { immediate: true }
)
</script>

<style lang="less" scoped>
.time-range-selector {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.preset-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.custom-range {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.error-hint {
  align-self: flex-start;
}
</style>
