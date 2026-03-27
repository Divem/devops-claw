<template>
  <div ref="chartContainer" class="interactive-trend-chart">
    <v-chart
      v-if="chartOption"
      :option="chartOption"
      autoresize
      class="chart"
      @mouseover="handleMouseOver"
      @mouseout="handleMouseOut"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  DataZoomComponent,
  TitleComponent,
  MarkLineComponent,
} from 'echarts/components'
import VChart from 'vue-echarts'

// 注册 ECharts 组件
use([
  CanvasRenderer,
  LineChart,
  GridComponent,
  TooltipComponent,
  DataZoomComponent,
  TitleComponent,
  MarkLineComponent,
])

interface TrendDataPoint {
  date: string
  count: number
}

interface Props {
  data: TrendDataPoint[]
  height?: number
  color?: string
  areaColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  height: 200,
  color: '#006eff',
  areaColor: 'rgba(0, 110, 255, 0.1)',
})

const isHovering = ref(false)

// 格式化日期显示
function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${month}-${day}`
}

// 计算图表配置
const chartOption = computed(() => {
  if (!props.data || props.data.length === 0) {
    return null
  }

  const dates = props.data.map((item) => formatDate(item.date))
  const values = props.data.map((item) => item.count)
  const maxValue = Math.max(...values, 1)

  return {
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '10%',
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e4e7ed',
      borderWidth: 1,
      textStyle: {
        color: '#606266',
        fontSize: 12,
      },
      formatter: (params: any) => {
        const data = params[0]
        const date = props.data[data.dataIndex]?.date || ''
        const count = data.value
        return `
          <div style="padding: 4px 8px;">
            <div style="font-weight: 500; margin-bottom: 4px;">${date}</div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="display: inline-block; width: 8px; height: 8px; background: ${props.color}; border-radius: 50%;"></span>
              <span>创建数量: <strong>${count}</strong></span>
            </div>
          </div>
        `
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: dates,
      axisLine: {
        lineStyle: {
          color: '#dcdfe6',
        },
      },
      axisLabel: {
        color: '#909399',
        fontSize: 11,
        interval: 'auto',
        rotate: dates.length > 30 ? 45 : 0,
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: Math.ceil(maxValue * 1.2),
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: '#909399',
        fontSize: 11,
      },
      splitLine: {
        lineStyle: {
          color: '#ebeef5',
          type: 'dashed',
        },
      },
    },
    dataZoom: [
      {
        type: 'inside',
        start: Math.max(0, 100 - (30 / props.data.length) * 100),
        end: 100,
        zoomOnMouseWheel: true,
        moveOnMouseWheel: true,
        moveOnMouseMove: true,
      },
      {
        type: 'slider',
        start: Math.max(0, 100 - (30 / props.data.length) * 100),
        end: 100,
        height: 20,
        bottom: 0,
        borderColor: 'transparent',
        backgroundColor: '#f5f7fa',
        fillerColor: 'rgba(0, 110, 255, 0.1)',
        handleStyle: {
          color: props.color,
          borderColor: props.color,
        },
        textStyle: {
          color: '#909399',
        },
      },
    ],
    series: [
      {
        name: '创建数量',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        showSymbol: false,
        lineStyle: {
          color: props.color,
          width: 2,
        },
        itemStyle: {
          color: props.color,
          borderWidth: 2,
          borderColor: '#fff',
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: props.areaColor.replace('0.1', '0.3'),
              },
              {
                offset: 1,
                color: props.areaColor.replace('0.1', '0.01'),
              },
            ],
          },
        },
        data: values,
        emphasis: {
          scale: true,
          itemStyle: {
            borderWidth: 3,
            shadowBlur: 10,
            shadowColor: 'rgba(0, 110, 255, 0.3)',
          },
        },
      },
    ],
    animation: true,
    animationDuration: 300,
    animationEasing: 'cubicOut' as const,
  }
})

// 处理鼠标悬停
function handleMouseOver() {
  isHovering.value = true
}

function handleMouseOut() {
  isHovering.value = false
}

// 监听数据变化，重置缩放
watch(
  () => props.data,
  () => {
    // 数据变化时，图表会自动更新
  },
  { deep: true }
)
</script>

<style lang="less" scoped>
.interactive-trend-chart {
  width: 100%;
  height: v-bind('`${props.height}px`');
  position: relative;
}

.chart {
  width: 100%;
  height: 100%;
}
</style>
