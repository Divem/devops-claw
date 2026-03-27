<template>
  <div class="image-list">
    <div class="toolbar">
      <n-input
        v-model:value="imageStore.filters.search"
        placeholder="搜索镜像名称"
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
        v-model:value="imageStore.filters.type"
        :options="typeOptions"
        placeholder="类型筛选"
        multiple
        clearable
        size="medium"
        style="width: 180px"
        @update:value="handleFetch"
      />

      <n-select
        v-model:value="imageStore.filters.status"
        :options="statusOptions"
        placeholder="状态筛选"
        multiple
        clearable
        size="medium"
        style="width: 180px"
        @update:value="handleFetch"
      />

      <div class="toolbar-spacer" />

      <n-button type="primary" size="medium" @click="openCreateModal">
        + 新增镜像
      </n-button>
    </div>

    <ImageTable
      :images="imageStore.items"
      :loading="imageStore.isLoading"
      @select="handleSelect"
      @edit="handleEdit"
      @delete="handleDelete"
      @sort="handleSortChange"
    />

    <div class="pagination-wrapper" v-if="imageStore.total > imageStore.pageSize">
      <n-pagination
        v-model:page="imageStore.page"
        :page-size="imageStore.pageSize"
        :item-count="imageStore.total"
        @update:page="handleFetch"
      />
    </div>

    <ImageCreateModal
      v-model:show="createModalVisible"
      :edit-image="editingImage"
      @success="handleSuccess"
    />

    <ImageDetailDrawer
      :show="imageStore.drawerVisible"
      :image="imageStore.selectedImage"
      @update:show="(v: boolean) => { if (!v) imageStore.closeDrawer() }"
    />

    <ImageDeleteConfirmModal
      :show="showDeleteModal"
      :image-name="pendingDeleteImage?.name ?? ''"
      @confirm="handleDeleteConfirm"
      @cancel="handleDeleteCancel"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { NInput, NSelect, NButton, NIcon, NPagination } from 'naive-ui'
import { SearchOutline } from '@vicons/ionicons5'
import { useImageStore } from '@/stores/image'
import ImageTable from '@/components/admin/ImageTable.vue'
import ImageDetailDrawer from '@/components/admin/ImageDetailDrawer.vue'
import ImageCreateModal from '@/components/admin/ImageCreateModal.vue'
import ImageDeleteConfirmModal from '@/components/admin/ImageDeleteConfirmModal.vue'
import type { Image } from '@/types/image'

const imageStore = useImageStore()
const createModalVisible = ref(false)
const editingImage = ref<Image | null>(null)
const showDeleteModal = ref(false)
const pendingDeleteImage = ref<Image | null>(null)

const typeOptions = [
  { label: '虚拟机', value: 'vm' },
  { label: 'OpenClaw', value: 'openclaw' },
]

const statusOptions = [
  { label: '可用', value: 'available' },
  { label: '不可用', value: 'unavailable' },
  { label: '构建中', value: 'building' },
]

function handleSortChange(key: string, order: 'ascend' | 'descend' | false) {
  if (!order) {
    imageStore.filters.sort = 'createdAt'
    imageStore.filters.order = 'desc'
  } else {
    imageStore.filters.sort = key as 'createdAt' | 'name'
    imageStore.filters.order = order === 'ascend' ? 'asc' : 'desc'
  }
  imageStore.fetchImages()
}

function handleSelect(image: Image) {
  imageStore.showDetail(image)
}

function openCreateModal() {
  editingImage.value = null
  createModalVisible.value = true
}

function handleEdit(image: Image) {
  editingImage.value = image
  createModalVisible.value = true
}

function handleDelete(image: Image) {
  pendingDeleteImage.value = image
  showDeleteModal.value = true
}

function handleDeleteConfirm() {
  if (pendingDeleteImage.value) {
    imageStore.deleteImage(pendingDeleteImage.value.id)
    pendingDeleteImage.value = null
  }
  showDeleteModal.value = false
}

function handleDeleteCancel() {
  pendingDeleteImage.value = null
  showDeleteModal.value = false
}

function handleSuccess() {
  handleFetch()
}

let debounceTimer: ReturnType<typeof setTimeout> | null = null
function debouncedFetch() {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    imageStore.page = 1
    imageStore.fetchImages()
  }, 300)
}

function handleFetch() {
  imageStore.page = 1
  imageStore.fetchImages()
}

onMounted(() => {
  imageStore.fetchImages()
})
</script>

<style lang="less" scoped>
.image-list {
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
