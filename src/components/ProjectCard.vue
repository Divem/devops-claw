<template>
  <div class="project-card">
    <div class="card-left">
      <n-avatar
        :size="48"
        :src="project.avatarUrl"
        round
      />
      <div class="card-info">
        <h3 class="card-name">{{ project.name }}</h3>
        <n-tag :type="statusConfig.type" size="small" round>
          {{ statusConfig.label }}
        </n-tag>
      </div>
    </div>
    <div class="card-actions">
      <n-dropdown
        trigger="click"
        :options="menuOptions"
        @select="handleMenuSelect"
      >
        <n-button
          quaternary
          size="small"
          data-testid="more-menu"
        >
          ...
        </n-button>
      </n-dropdown>
      <n-button size="medium" @click="emit('configOpenClaw')">
        <template #icon><span>⚙️</span></template>
        配置 OpenClaw
      </n-button>
      <BotInfoDropdown :project="project" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NAvatar, NTag, NButton, NDropdown } from 'naive-ui'
import type { Project, ProjectStatus } from '@/types/project'
import BotInfoDropdown from './BotInfoDropdown.vue'

const props = defineProps<{
  project: Project
}>()

const emit = defineEmits<{
  configOpenClaw: []
  delete: []
}>()

const statusMap: Record<ProjectStatus, { label: string; type: 'success' | 'warning' | 'error' | 'info' }> = {
  creating: { label: '创建中', type: 'info' },
  deployed: { label: '已部署', type: 'success' },
  pending_approval: { label: '审批中', type: 'warning' },
  error: { label: '异常', type: 'error' },
}

const statusConfig = computed(() => statusMap[props.project.status])

const menuOptions = [
  { label: '删除', key: 'delete' },
]

function handleMenuSelect(key: string) {
  if (key === 'delete') {
    emit('delete')
  }
}
</script>

<style lang="less" scoped>
.project-card {
  width: 100%;
  max-width: 800px;
  background: @bgWhite;
  border-radius: @radiusCard;
  box-shadow: @shadowCard;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.card-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.card-name {
  font-size: 16px;
  font-weight: 600;
  color: @textColorTitle;
  margin-bottom: 4px;
}

.card-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
