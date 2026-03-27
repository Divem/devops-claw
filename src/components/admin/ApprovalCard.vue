<template>
  <n-card class="approval-card" :bordered="true" size="medium">
    <!-- 头部 -->
    <div class="card-header">
      <div class="header-left">
        <n-avatar :src="approval.ownerAvatarUrl" round :size="32">
          {{ approval.ownerName.charAt(0) }}
        </n-avatar>
        <div class="header-info">
          <span class="owner-name">{{ approval.ownerName }}</span>
          <span class="submit-time">{{ formatRelativeTime(approval.submittedAt) }}</span>
        </div>
      </div>
      <n-tag
        :type="approval.status === 'approved' ? 'success' : 'warning'"
        size="small"
        round
      >
        {{ approval.status === 'approved' ? '已通过' : '待审批' }}
      </n-tag>
    </div>

    <!-- 信息区 -->
    <div class="card-body">
      <div class="info-row">
        <n-avatar :src="approval.instanceAvatarUrl" round :size="24" />
        <span class="instance-name">{{ approval.instanceName }}</span>
      </div>
      <div class="info-row">
        <span class="info-label">App ID：</span>
        <span class="info-value">{{ maskAppId(approval.appId) }}</span>
      </div>
    </div>

    <!-- 配置引导（仅待审批） -->
    <ApprovalGuide v-if="approval.status === 'pending'" />

    <!-- 操作区（仅待审批） -->
    <div v-if="approval.status === 'pending'" class="card-actions">
      <n-button text type="primary" tag="a" href="https://open.feishu.cn" target="_blank">
        去配置
      </n-button>
      <n-button type="primary" size="small" @click="handleApprove">
        标记完成
      </n-button>
    </div>

    <!-- 已审批信息 -->
    <div v-if="approval.status === 'approved' && approval.approvedAt" class="card-footer">
      <span class="footer-text">审批时间：{{ formatDate(approval.approvedAt) }}</span>
    </div>
  </n-card>
</template>

<script setup lang="ts">
import { NCard, NAvatar, NTag, NButton, useDialog } from 'naive-ui'
import type { Approval } from '@/types/admin'
import ApprovalGuide from './ApprovalGuide.vue'

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
  margin-bottom: 16px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-info {
  display: flex;
  flex-direction: column;
}

.owner-name {
  font-size: 14px;
  font-weight: 500;
  color: #30363e;
}

.submit-time {
  font-size: 12px;
  color: #8a8f8d;
}

.card-body {
  margin-bottom: 12px;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 14px;
}

.instance-name {
  font-weight: 500;
  color: #4e5358;
}

.info-label {
  color: #8a8f8d;
}

.info-value {
  color: #4e5358;
  font-family: monospace;
}

.card-actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid #e5e6eb;
}

.card-footer {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e5e6eb;
}

.footer-text {
  font-size: 12px;
  color: #8a8f8d;
}
</style>
