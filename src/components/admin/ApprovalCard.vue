<template>
  <n-card class="approval-card" :bordered="true" size="small">
    <div class="card-content">
      <!-- 左侧：信息 -->
      <div class="card-info">
        <div class="card-header">
          <n-avatar :src="approval.ownerAvatarUrl" round :size="24">
            {{ approval.ownerName.charAt(0) }}
          </n-avatar>
          <span class="owner-name">{{ approval.ownerName }}</span>
          <span class="submit-time">{{ formatRelativeTime(approval.submittedAt) }}</span>
          <n-tag
            :type="approval.status === 'approved' ? 'success' : 'warning'"
            size="tiny"
            round
          >
            {{ approval.status === 'approved' ? '已通过' : '待审批' }}
          </n-tag>
        </div>
        <div class="card-detail">
          <n-avatar :src="approval.instanceAvatarUrl" round :size="20" />
          <span class="instance-name">{{ approval.instanceName }}</span>
          <span class="separator">·</span>
          <span class="app-id">{{ maskAppId(approval.appId) }}</span>
          <template v-if="approval.status === 'approved' && approval.approvedAt">
            <span class="separator">·</span>
            <span class="approved-time">{{ formatDate(approval.approvedAt) }}</span>
          </template>
        </div>
      </div>

      <!-- 右侧：操作区（仅待审批） -->
      <div v-if="approval.status === 'pending'" class="card-actions">
        <n-button
          text
          type="primary"
          size="small"
          tag="a"
          :href="`${FEISHU_OPEN_PLATFORM_URL}/app/${approval.appId}/baseinfo`"
          target="_blank"
        >
          去配置
        </n-button>
        <n-button type="primary" size="tiny" @click="handleApprove">
          标记完成
        </n-button>
      </div>
    </div>
  </n-card>
</template>

<script setup lang="ts">
import { NCard, NAvatar, NTag, NButton, useDialog } from 'naive-ui'
import type { Approval } from '@/types/admin'
import { FEISHU_OPEN_PLATFORM_URL } from '@/types/admin'

const props = defineProps<{
  approval: Approval
}>()

const emit = defineEmits<{
  approve: [id: string]
}>()

const dialog = useDialog()

function maskAppId(appId: string): string {
  if (appId.length <= 8) return appId
  return appId.slice(0, 6) + '****' + appId.slice(-4)
}

function formatRelativeTime(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes}分钟前`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}小时前`
  const days = Math.floor(hours / 24)
  return `${days}天前`
}

function formatDate(isoString: string): string {
  const d = new Date(isoString)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function handleApprove() {
  dialog.warning({
    title: '确认审批',
    content: '确认已完成飞书长连接配置？',
    positiveText: '确认',
    negativeText: '取消',
    onPositiveClick: () => {
      emit('approve', props.approval.id)
    },
  })
}
</script>

<style lang="less" scoped>
.approval-card {
  margin-bottom: 8px;

  :deep(.n-card__content) {
    padding: 12px 16px !important;
  }
}

.card-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.card-info {
  flex: 1;
  min-width: 0;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.owner-name {
  font-size: 13px;
  font-weight: 500;
  color: #30363e;
}

.submit-time {
  font-size: 12px;
  color: #8a8f8d;
}

.card-detail {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
}

.instance-name {
  font-weight: 500;
  color: #4e5358;
}

.separator {
  color: #c0c4cc;
}

.app-id {
  color: #8a8f8d;
  font-family: monospace;
  font-size: 12px;
}

.approved-time {
  color: #8a8f8d;
  font-size: 12px;
}

.card-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}
</style>
