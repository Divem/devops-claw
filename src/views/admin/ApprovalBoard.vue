<template>
  <div class="approval-board">
    <div class="board-header">
      <h2 class="board-title">审批管理</h2>
      <div class="header-controls">
        <n-button-group size="small">
          <n-button
            v-for="mode in viewModes"
            :key="mode.value"
            :type="currentView === mode.value ? 'primary' : 'default'"
            @click="setViewMode(mode.value)"
          >
            {{ mode.label }}
          </n-button>
        </n-button-group>
        <n-select
          v-model:value="adminStore.approvalTab"
          :options="statusOptions"
          style="width: 120px"
          size="small"
          @update:value="handleTabChange"
        />
      </div>
    </div>

    <!-- 统一配置引导区域 -->
    <n-alert
      v-if="adminStore.approvalTab !== 'approved' && showGuide"
      type="info"
      closable
      class="config-guide"
      @close="showGuide = false"
    >
      <template #header>
        <span class="guide-title" @click="guideExpanded = !guideExpanded" style="cursor: pointer">
          配置引导 {{ guideExpanded ? '▾' : '▸' }}
        </span>
      </template>
      <template v-if="guideExpanded">
        <ol class="guide-steps">
          <li>登录飞书开放平台，找到对应应用</li>
          <li>配置 WebSocket 长连接地址</li>
          <li>添加事件订阅</li>
          <li>发布应用版本</li>
        </ol>
      </template>
    </n-alert>

    <n-spin :show="adminStore.approvalLoading">
      <div v-if="adminStore.approvals.length === 0" class="empty-state">
        <span class="empty-icon">{{ adminStore.approvalTab === 'pending' ? '✅' : '📋' }}</span>
        <p>{{ adminStore.approvalTab === 'pending' ? '暂无待审批项' : adminStore.approvalTab === 'approved' ? '暂无审批记录' : '暂无审批数据' }}</p>
      </div>

      <!-- 卡片视图 -->
      <div v-else-if="currentView === 'card'" class="card-list">
        <ApprovalCard
          v-for="approval in adminStore.approvals"
          :key="approval.id"
          :approval="approval"
          @approve="handleApprove"
        />
      </div>

      <!-- 紧凑卡片视图 -->
      <div v-else-if="currentView === 'compact'" class="compact-list">
        <ApprovalCard
          v-for="approval in adminStore.approvals"
          :key="approval.id"
          :approval="approval"
          @approve="handleApprove"
        />
      </div>

      <!-- 列表视图 -->
      <div v-else class="list-view">
        <div class="list-header">
          <span class="col-owner">员工</span>
          <span class="col-instance">实例</span>
          <span class="col-appid">App ID</span>
          <span class="col-time">提交时间</span>
          <span class="col-status">状态</span>
          <span class="col-actions">操作</span>
        </div>
        <ApprovalListItem
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
import { ref, onMounted, onUnmounted } from 'vue'
import { NSelect, NSpin, NAlert, NButton, NButtonGroup, useMessage } from 'naive-ui'
import { useAdminStore } from '@/stores/admin'
import ApprovalCard from '@/components/admin/ApprovalCard.vue'
import ApprovalListItem from '@/components/admin/ApprovalListItem.vue'
import type { ApprovalStatus, ApprovalViewMode } from '@/types/admin'

const adminStore = useAdminStore()
const message = useMessage()

const VIEW_MODE_KEY = 'approval-view-mode'

const viewModes = [
  { label: '卡片', value: 'card' as ApprovalViewMode },
  { label: '紧凑', value: 'compact' as ApprovalViewMode },
  { label: '列表', value: 'list' as ApprovalViewMode },
]

const statusOptions = [
  { label: '全部', value: 'all' },
  { label: '待审批', value: 'pending' },
  { label: '已审批', value: 'approved' },
]

const currentView = ref<ApprovalViewMode>(
  (localStorage.getItem(VIEW_MODE_KEY) as ApprovalViewMode) || 'card',
)
const showGuide = ref(true)
const guideExpanded = ref(false)

function setViewMode(mode: ApprovalViewMode) {
  currentView.value = mode
  localStorage.setItem(VIEW_MODE_KEY, mode)
}

function handleResponsive() {
  if (window.innerWidth < 768 && currentView.value === 'list') {
    currentView.value = 'compact'
  }
}

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
  handleResponsive()
  window.addEventListener('resize', handleResponsive)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResponsive)
})
</script>

<style lang="less" scoped>
.board-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.board-title {
  font-size: 18px;
  font-weight: 600;
  color: #30363e;
  white-space: nowrap;
}

.header-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.config-guide {
  margin-bottom: 16px;
}

.guide-title {
  font-weight: 500;
}

.guide-steps {
  margin: 8px 0 0;
  padding-left: 20px;
  font-size: 13px;
  color: #4e5358;

  li {
    margin-bottom: 4px;
  }
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

.compact-list {
  display: flex;
  flex-direction: column;

  :deep(.approval-card) {
    margin-bottom: 4px;

    .n-card__content {
      padding: 8px 12px !important;
    }

    .card-header {
      margin-bottom: 4px;
    }

    .card-detail {
      font-size: 12px;
    }
  }
}

.list-view {
  border: 1px solid #e5e6eb;
  border-radius: 4px;
  overflow: hidden;
}

.list-header {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 40px;
  padding: 0 16px;
  background: #f7f7f7;
  border-bottom: 1px solid #e5e6eb;
  font-size: 12px;
  font-weight: 500;
  color: #8a8f8d;
}

.col-owner {
  min-width: 90px;
}

.col-instance {
  min-width: 100px;
}

.col-appid {
  min-width: 80px;
}

.col-time {
  min-width: 60px;
}

.col-status {
  min-width: 60px;
}

.col-actions {
  margin-left: auto;
}

@media (max-width: 768px) {
  .board-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .list-header {
    display: none;
  }
}
</style>
