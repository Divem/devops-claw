<template>
  <div class="instance-list">
    <!-- 工具栏 -->
    <div class="toolbar">
      <n-input
        v-model:value="adminStore.filters.search"
        placeholder="搜索实例名称或员工"
        clearable
        size="medium"
        style="width: 240px"
        @update:value="debouncedFetch"
      >
        <template #prefix>
          <n-icon :component="SearchOutline" />
        </template>
      </n-input>

      <n-select
        v-model:value="adminStore.filters.status"
        :options="statusOptions"
        placeholder="状态筛选"
        multiple
        clearable
        size="medium"
        style="width: 200px"
        @update:value="handleFetch"
      />

      <div class="toolbar-spacer" />

      <n-button type="primary" size="medium" @click="createModalVisible = true">
        + 创建实例
      </n-button>
    </div>

    <!-- 表格 -->
    <InstanceTable
      :instances="adminStore.instances"
      :loading="adminStore.instanceLoading"
      @select="handleSelect"
      @action="handleAction"
      @config="handleConfig"
      @sort="handleSortChange"
    />

    <!-- 分页 -->
    <div class="pagination-wrapper" v-if="adminStore.instanceTotal > adminStore.instancePageSize">
      <n-pagination
        v-model:page="adminStore.instancePage"
        :page-size="adminStore.instancePageSize"
        :item-count="adminStore.instanceTotal"
        @update:page="handleFetch"
      />
    </div>

    <!-- 创建实例弹窗 -->
    <InstanceCreateModal
      v-model:show="createModalVisible"
      @success="handleFetch"
    />

    <!-- 抽屉 -->
    <InstanceDrawer
      :show="adminStore.drawerVisible"
      :detail="adminStore.selectedInstance"
      @update:show="(v: boolean) => { if (!v) adminStore.closeDrawer() }"
    />

    <!-- 重启确认弹框 -->
    <RestartConfirmModal
      :show="showRestartModal"
      :instance-name="pendingRestartInstance?.name ?? ''"
      @confirm="handleRestartConfirm"
      @cancel="handleRestartCancel"
    />

    <!-- 重启 Gateway 确认弹框 -->
    <RestartGatewayConfirmModal
      :show="showRestartGatewayModal"
      :instance-name="pendingRestartGatewayInstance?.name ?? ''"
      @confirm="handleRestartGatewayConfirm"
      @cancel="handleRestartGatewayCancel"
    />

    <!-- 修复配置确认弹框 -->
    <RepairConfigConfirmModal
      :show="showRepairConfigModal"
      :instance-name="pendingRepairConfigInstance?.name ?? ''"
      @confirm="handleRepairConfigConfirm"
      @cancel="handleRepairConfigCancel"
    />

    <!-- 恢复初始设置确认弹框 -->
    <ResetInstanceConfirmModal
      :show="showResetInstanceModal"
      :instance-name="pendingResetInstance?.name ?? ''"
      @confirm="handleResetInstanceConfirm"
      @cancel="handleResetInstanceCancel"
    />

    <!-- 停止确认弹框 -->
    <StopConfirmModal
      :show="showStopModal"
      :instance-name="pendingStopInstance?.name ?? ''"
      @confirm="handleStopConfirm"
      @cancel="handleStopCancel"
    />

    <!-- 删除确认弹框 -->
    <DeleteInstanceConfirmModal
      :show="showDeleteModal"
      :instance-name="pendingDeleteInstance?.name ?? ''"
      @confirm="handleDeleteConfirm"
      @cancel="handleDeleteCancel"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { NInput, NSelect, NButton, NIcon, NPagination } from 'naive-ui'
import { SearchOutline } from '@vicons/ionicons5'
import { useAdminStore } from '@/stores/admin'
import InstanceTable from '@/components/admin/InstanceTable.vue'
import InstanceDrawer from '@/components/admin/InstanceDrawer.vue'
import InstanceCreateModal from '@/components/admin/InstanceCreateModal.vue'
import RestartConfirmModal from '@/components/admin/RestartConfirmModal.vue'
import RestartGatewayConfirmModal from '@/components/admin/RestartGatewayConfirmModal.vue'
import RepairConfigConfirmModal from '@/components/admin/RepairConfigConfirmModal.vue'
import ResetInstanceConfirmModal from '@/components/admin/ResetInstanceConfirmModal.vue'
import StopConfirmModal from '@/components/admin/StopConfirmModal.vue'
import DeleteInstanceConfirmModal from '@/components/admin/DeleteInstanceConfirmModal.vue'
import type { Instance, InstanceAction, VmStatus } from '@/types/admin'

const adminStore = useAdminStore()
const route = useRoute()
const createModalVisible = ref(false)
const showRestartModal = ref(false)
const pendingRestartInstance = ref<Instance | null>(null)
const showStopModal = ref(false)
const pendingStopInstance = ref<Instance | null>(null)
const showDeleteModal = ref(false)
const pendingDeleteInstance = ref<Instance | null>(null)
const showRestartGatewayModal = ref(false)
const pendingRestartGatewayInstance = ref<Instance | null>(null)
const showRepairConfigModal = ref(false)
const pendingRepairConfigInstance = ref<Instance | null>(null)
const showResetInstanceModal = ref(false)
const pendingResetInstance = ref<Instance | null>(null)

const statusOptions = [
  { label: '运行中', value: 'running' },
  { label: '已停止', value: 'stopped' },
  { label: '异常', value: 'error' },
]

function handleSortChange(key: string, order: 'ascend' | 'descend' | false) {
  if (!order) {
    adminStore.filters.sort = 'createdAt'
    adminStore.filters.order = 'desc'
  } else {
    adminStore.filters.sort = key as 'createdAt' | 'lastActiveAt'
    adminStore.filters.order = order === 'ascend' ? 'asc' : 'desc'
  }
  adminStore.fetchInstances()
}

function handleSelect(instance: Instance) {
  adminStore.fetchInstanceDetail(instance.id)
}

let debounceTimer: ReturnType<typeof setTimeout> | null = null
function debouncedFetch() {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    adminStore.instancePage = 1
    adminStore.fetchInstances()
  }, 300)
}

function handleFetch() {
  adminStore.instancePage = 1
  adminStore.fetchInstances()
}

function handleAction(id: string, action: InstanceAction) {
  const instance = adminStore.instances.find(i => i.id === id)
  if (!instance) return

  if (action === 'restart') {
    pendingRestartInstance.value = instance
    showRestartModal.value = true
    return
  }

  if (action === 'stop') {
    pendingStopInstance.value = instance
    showStopModal.value = true
    return
  }

  if (action === 'delete') {
    pendingDeleteInstance.value = instance
    showDeleteModal.value = true
    return
  }

  if (action === 'restart-gateway') {
    pendingRestartGatewayInstance.value = instance
    showRestartGatewayModal.value = true
    return
  }

  if (action === 'repair-config') {
    pendingRepairConfigInstance.value = instance
    showRepairConfigModal.value = true
    return
  }

  if (action === 'reset-instance') {
    pendingResetInstance.value = instance
    showResetInstanceModal.value = true
    return
  }

  adminStore.executeAction(id, action)
}

function handleRestartConfirm() {
  if (pendingRestartInstance.value) {
    adminStore.executeAction(pendingRestartInstance.value.id, 'restart')
    pendingRestartInstance.value = null
  }
  showRestartModal.value = false
}

function handleRestartCancel() {
  pendingRestartInstance.value = null
  showRestartModal.value = false
}

function handleStopConfirm() {
  if (pendingStopInstance.value) {
    adminStore.executeAction(pendingStopInstance.value.id, 'stop')
    pendingStopInstance.value = null
  }
  showStopModal.value = false
}

function handleStopCancel() {
  pendingStopInstance.value = null
  showStopModal.value = false
}

function handleDeleteConfirm() {
  if (pendingDeleteInstance.value) {
    adminStore.executeAction(pendingDeleteInstance.value.id, 'delete')
    pendingDeleteInstance.value = null
  }
  showDeleteModal.value = false
}

function handleDeleteCancel() {
  pendingDeleteInstance.value = null
  showDeleteModal.value = false
}

function handleRestartGatewayConfirm() {
  if (pendingRestartGatewayInstance.value) {
    adminStore.executeAction(pendingRestartGatewayInstance.value.id, 'restart-gateway')
    pendingRestartGatewayInstance.value = null
  }
  showRestartGatewayModal.value = false
}

function handleRestartGatewayCancel() {
  pendingRestartGatewayInstance.value = null
  showRestartGatewayModal.value = false
}

function handleRepairConfigConfirm() {
  if (pendingRepairConfigInstance.value) {
    adminStore.executeAction(pendingRepairConfigInstance.value.id, 'repair-config')
    pendingRepairConfigInstance.value = null
  }
  showRepairConfigModal.value = false
}

function handleRepairConfigCancel() {
  pendingRepairConfigInstance.value = null
  showRepairConfigModal.value = false
}

function handleResetInstanceConfirm() {
  if (pendingResetInstance.value) {
    adminStore.executeAction(pendingResetInstance.value.id, 'reset-instance')
    pendingResetInstance.value = null
  }
  showResetInstanceModal.value = false
}

function handleResetInstanceCancel() {
  pendingResetInstance.value = null
  showResetInstanceModal.value = false
}

function handleConfig(projectId: string) {
  window.open(`/projects/${projectId}/admin`, '_blank')
}

onMounted(() => {
  const statusQuery = route.query.status as string | undefined
  if (statusQuery) {
    adminStore.filters.status = statusQuery.split(',') as VmStatus[]
  }
  adminStore.fetchInstances()
})
</script>

<style lang="less" scoped>
.instance-list {
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.toolbar-spacer {
  flex: 1;
}

.pagination-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}
</style>
