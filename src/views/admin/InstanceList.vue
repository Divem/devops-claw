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

      <n-select
        v-model:value="adminStore.filters.sort"
        :options="sortOptions"
        size="medium"
        style="width: 150px"
        @update:value="handleFetch"
      />

      <n-button
        quaternary
        size="medium"
        @click="toggleOrder"
      >
        {{ adminStore.filters.order === 'desc' ? '↓ 降序' : '↑ 升序' }}
      </n-button>
    </div>

    <!-- 表格 -->
    <InstanceTable
      :instances="adminStore.instances"
      :loading="adminStore.instanceLoading"
      @select="handleSelect"
      @action="handleAction"
      @config="handleConfig"
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
import type { Instance, InstanceAction, VmStatus } from '@/types/admin'

const adminStore = useAdminStore()
const route = useRoute()
const createModalVisible = ref(false)

const statusOptions = [
  { label: '运行中', value: 'running' },
  { label: '已停止', value: 'stopped' },
  { label: '异常', value: 'error' },
]

const sortOptions = [
  { label: '创建时间', value: 'createdAt' },
  { label: '最后活跃', value: 'lastActiveAt' },
]

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

function toggleOrder() {
  adminStore.filters.order = adminStore.filters.order === 'desc' ? 'asc' : 'desc'
  handleFetch()
}

function handleSelect(instance: Instance) {
  adminStore.fetchInstanceDetail(instance.id)
}

function handleAction(id: string, action: InstanceAction) {
  adminStore.executeAction(id, action)
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
