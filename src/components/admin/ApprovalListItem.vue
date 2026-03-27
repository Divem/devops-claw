<template>
  <div class="list-item" :class="{ approved: approval.status === 'approved' }">
    <div class="col-owner">
      <n-avatar :src="approval.ownerAvatarUrl" round :size="24">
        {{ approval.ownerName.charAt(0) }}
      </n-avatar>
      <span class="owner-name">{{ approval.ownerName }}</span>
    </div>
    <div class="col-instance">
      <n-avatar :src="approval.instanceAvatarUrl" round :size="20" />
      <span class="instance-name">{{ approval.instanceName }}</span>
    </div>
    <div class="col-appid">
      <span class="app-id">{{ maskAppId(approval.appId) }}</span>
    </div>
    <div class="col-time">
      <span class="time">{{ formatRelativeTime(approval.submittedAt) }}</span>
    </div>
    <div class="col-status">
      <n-tag
        :type="approval.status === 'approved' ? 'success' : 'warning'"
        size="tiny"
        round
      >
        {{ approval.status === 'approved' ? '已通过' : '待审批' }}
      </n-tag>
    </div>
    <div class="col-actions">
      <template v-if="approval.status === 'pending'">
        <n-button
          text
          type="primary"
          size="tiny"
          tag="a"
          :href="`${FEISHU_OPEN_PLATFORM_URL}/app/${approval.appId}/baseinfo`"
          target="_blank"
        >
          去配置
        </n-button>
        <n-button type="primary" size="tiny" @click="handleApprove">
          标记完成
        </n-button>
      </template>
      <span v-else-if="approval.approvedAt" class="approved-time">
        {{ formatDate(approval.approvedAt) }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NAvatar, NTag, NButton, useDialog } from 'naive-ui'
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
.list-item {
  display: flex;
  align-items: center;
  height: 56px;
  padding: 0 16px;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.15s;

  &:hover {
    background-color: #fafafa;
  }

  &.approved {
    opacity: 0.7;
  }
}

.col-owner {
  width: 140px;
  flex-shrink: 0;
  padding-right: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.col-instance {
  width: 180px;
  flex-shrink: 0;
  padding-right: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.col-appid {
  width: 140px;
  flex-shrink: 0;
  padding-right: 12px;
}

.col-time {
  width: 80px;
  flex-shrink: 0;
  padding-right: 12px;
}

.col-status {
  width: 70px;
  flex-shrink: 0;
  padding-right: 12px;
}

.col-actions {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
}

.owner-name {
  font-size: 13px;
  font-weight: 500;
  color: #30363e;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.instance-name {
  font-size: 13px;
  color: #4e5358;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.app-id {
  font-size: 12px;
  color: #8a8f8d;
  font-family: monospace;
}

.time {
  font-size: 12px;
  color: #8a8f8d;
}

.approved-time {
  font-size: 12px;
  color: #8a8f8d;
}
</style>
