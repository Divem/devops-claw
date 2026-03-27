<template>
  <n-drawer :show="show" width="40%" placement="right" @update:show="emit('update:show', $event)">
    <n-drawer-content :title="detail?.name ?? '实例详情'" closable>
      <template v-if="detail">
        <!-- 基本信息 -->
        <div class="drawer-section">
          <h4 class="section-title">基本信息</h4>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">项目名称</span>
              <span class="info-value">{{ detail.name }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">所属员工</span>
              <span class="info-value">{{ detail.ownerName }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">App ID</span>
              <span class="info-value">{{ maskAppId(detail.appId) }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">创建时间</span>
              <span class="info-value">{{ formatDate(detail.createdAt) }}</span>
            </div>
          </div>
        </div>

        <!-- 虚拟机信息 -->
        <div class="drawer-section">
          <h4 class="section-title">虚拟机信息</h4>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">IP 地址</span>
              <span class="info-value">{{ detail.ip }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">规格</span>
              <span class="info-value">{{ detail.cpuSpec }} / {{ detail.memorySpec }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">运行时长</span>
              <span class="info-value">{{ formatUptime(detail.uptime) }}</span>
            </div>
          </div>
        </div>

        <!-- 服务状态 -->
        <div class="drawer-section">
          <h4 class="section-title">服务状态</h4>
          <div class="status-list">
            <div class="status-item">
              <span class="status-dot" :class="detail.gatewayHealthy ? 'healthy' : 'unhealthy'" />
              <span>Gateway</span>
              <span class="status-text">{{ detail.gatewayHealthy ? '健康' : '异常' }}</span>
            </div>
            <div class="status-item">
              <span class="status-dot healthy" />
              <span>OpenClaw</span>
              <span class="status-text">v{{ detail.openclawVersion }}</span>
            </div>
            <div class="status-item">
              <span class="status-dot" :class="feishuDotClass" />
              <span>飞书长连接</span>
              <span class="status-text">{{ feishuStatusLabel }}</span>
            </div>
          </div>
        </div>

        <!-- 操作日志 -->
        <div class="drawer-section">
          <h4 class="section-title">操作日志</h4>
          <n-timeline>
            <n-timeline-item
              v-for="log in detail.logs"
              :key="log.id"
              :title="log.action"
              :content="log.operator + (log.detail ? ' — ' + log.detail : '')"
              :time="formatDate(log.timestamp)"
            />
          </n-timeline>
        </div>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NDrawer, NDrawerContent, NTimeline, NTimelineItem } from 'naive-ui'
import type { InstanceDetail, FeishuConnectionStatus } from '@/types/admin'

const props = defineProps<{
  show: boolean
  detail: InstanceDetail | null
}>()

const emit = defineEmits<{
  'update:show': [value: boolean]
}>()

function maskAppId(appId?: string): string {
  if (!appId) return '-'
  if (appId.length <= 8) return appId
  return appId.slice(0, 6) + '****' + appId.slice(-4)
}

function formatDate(isoString: string): string {
  const d = new Date(isoString)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function formatUptime(seconds: number): string {
  if (seconds === 0) return '已停止'
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  if (days > 0) return `${days}天 ${hours}小时`
  const minutes = Math.floor((seconds % 3600) / 60)
  return `${hours}小时 ${minutes}分钟`
}

const feishuStatusMap: Record<FeishuConnectionStatus, { label: string; dotClass: string }> = {
  connected: { label: '已连接', dotClass: 'healthy' },
  pending: { label: '待配置', dotClass: 'warning' },
  disconnected: { label: '断开', dotClass: 'unhealthy' },
}

const feishuStatusLabel = computed(() =>
  props.detail ? feishuStatusMap[props.detail.feishuStatus].label : '',
)

const feishuDotClass = computed(() =>
  props.detail ? feishuStatusMap[props.detail.feishuStatus].dotClass : '',
)
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

.status-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #4e5358;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;

  &.healthy {
    background: #00b81f;
  }

  &.unhealthy {
    background: #f23030;
  }

  &.warning {
    background: #ff8800;
  }
}

.status-text {
  margin-left: auto;
  font-size: 13px;
  color: #8a8f8d;
}
</style>
