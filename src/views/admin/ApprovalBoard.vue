<template>
  <div class="approval-board">
    <div class="board-header">
      <h2 class="board-title">审批管理</h2>
      <n-tabs v-model:value="adminStore.approvalTab" type="segment" size="medium" @update:value="handleTabChange">
        <n-tab-pane name="pending" tab="待审批" />
        <n-tab-pane name="approved" tab="已审批" />
      </n-tabs>
    </div>

    <n-spin :show="adminStore.approvalLoading">
      <div v-if="adminStore.approvals.length === 0" class="empty-state">
        <span class="empty-icon">{{ adminStore.approvalTab === 'pending' ? '✅' : '📋' }}</span>
        <p>{{ adminStore.approvalTab === 'pending' ? '暂无待审批项' : '暂无审批记录' }}</p>
      </div>

      <div v-else class="card-list">
        <ApprovalCard
          v-for="approval in adminStore.approvals"
          :key="approval.id"
          :approval="approval"
          @approve="handleApprove"
        />
      </div>
    </n-spin>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { NTabs, NTabPane, NSpin, useMessage } from 'naive-ui'
import { useAdminStore } from '@/stores/admin'
import ApprovalCard from '@/components/admin/ApprovalCard.vue'
import type { ApprovalStatus } from '@/types/admin'

const adminStore = useAdminStore()
const message = useMessage()

function handleTabChange(tab: ApprovalStatus) {
  adminStore.fetchApprovals(tab)
}

async function handleApprove(id: string) {
  const success = await adminStore.approveInstance(id)
  if (success) {
    message.success('审批通过，飞书长连接已就绪')
  } else {
    message.error('连接验证失败，请检查配置')
  }
}

onMounted(() => {
  adminStore.fetchApprovals()
})
</script>

<style lang="less" scoped>
.approval-board {
  max-width: 800px;
  margin: 0 auto;
}

.board-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.board-title {
  font-size: 18px;
  font-weight: 600;
  color: #30363e;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 0;
  color: #8a8f8d;
  font-size: 14px;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.card-list {
  display: flex;
  flex-direction: column;
}
</style>
