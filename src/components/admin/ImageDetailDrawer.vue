<template>
  <n-drawer :show="show" width="40%" placement="right" @update:show="emit('update:show', $event)">
    <n-drawer-content :title="image?.name ?? '镜像详情'" closable>
      <template v-if="image">
        <div class="drawer-section">
          <h4 class="section-title">基本信息</h4>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">镜像名称</span>
              <span class="info-value">{{ image.name }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">版本</span>
              <span class="info-value">{{ image.version }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">大小</span>
              <span class="info-value">{{ formatSize(image.size) }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">镜像地址</span>
              <span class="info-value info-value-url">{{ image.imageUrl }}</span>
            </div>
          </div>
        </div>

        <div class="drawer-section">
          <h4 class="section-title">状态信息</h4>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">类型</span>
              <span class="info-value">
                <n-tag :type="typeInfo.type" size="small" round :bordered="false">{{ typeInfo.label }}</n-tag>
              </span>
            </div>
            <div class="info-item">
              <span class="info-label">状态</span>
              <span class="info-value">
                <n-tag :type="statusInfo.type" size="small" round>{{ statusInfo.label }}</n-tag>
              </span>
            </div>
          </div>
        </div>

        <div class="drawer-section">
          <h4 class="section-title">描述</h4>
          <p class="description-text">{{ image.description || '暂无描述' }}</p>
        </div>

        <div class="drawer-section">
          <h4 class="section-title">时间信息</h4>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">创建时间</span>
              <span class="info-value">{{ formatDate(image.createdAt) }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">更新时间</span>
              <span class="info-value">{{ formatDate(image.updatedAt) }}</span>
            </div>
          </div>
        </div>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NDrawer, NDrawerContent, NTag } from 'naive-ui'
import type { Image, ImageType, ImageStatus } from '@/types/image'

const props = defineProps<{
  show: boolean
  image: Image | null
}>()

const emit = defineEmits<{
  'update:show': [value: boolean]
}>()

const imageTypeMap: Record<ImageType, { label: string; type: 'info' | 'primary' }> = {
  vm: { label: '虚拟机', type: 'info' },
  openclaw: { label: 'OpenClaw', type: 'primary' },
}

const imageStatusMap: Record<ImageStatus, { label: string; type: 'success' | 'error' | 'warning' }> = {
  available: { label: '可用', type: 'success' },
  unavailable: { label: '不可用', type: 'error' },
  building: { label: '构建中', type: 'warning' },
}

const typeInfo = computed(() =>
  props.image ? imageTypeMap[props.image.type] : { label: '-', type: 'default' as const },
)

const statusInfo = computed(() =>
  props.image ? imageStatusMap[props.image.status] : { label: '-', type: 'default' as const },
)

function formatDate(isoString: string): string {
  const d = new Date(isoString)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function formatSize(mb: number): string {
  if (mb >= 1024) return `${(mb / 1024).toFixed(1)} GB`
  return `${mb} MB`
}
</script>

<style lang="less" scoped>
.drawer-section {
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e6eb;

  &:last-child {
    border-bottom: none;
  }
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: #30363e;
  margin-bottom: 12px;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-label {
  font-size: 12px;
  color: #8a8f8d;
}

.info-value {
  font-size: 14px;
  color: #4e5358;
  word-break: break-all;
}

.info-value-url {
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 13px;
}

.description-text {
  font-size: 14px;
  color: #4e5358;
  line-height: 1.6;
}
</style>
