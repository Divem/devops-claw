<template>
  <div class="file-explorer">
    <!-- 标题栏 -->
    <div class="explorer-header">
      <span class="explorer-title">资源管理器</span>
      <div class="explorer-actions">
        <n-button quaternary size="tiny" @click="handleNewFile">
          <template #icon><span>📄</span></template>
        </n-button>
        <n-button quaternary size="tiny" @click="handleNewFolder">
          <template #icon><span>📁</span></template>
        </n-button>
        <n-button quaternary size="tiny" @click="refresh">
          <template #icon><span>🔄</span></template>
        </n-button>
      </div>
    </div>

    <!-- 搜索框 -->
    <div class="explorer-search">
      <n-input
        v-model:value="fileStore.searchKeyword"
        placeholder="搜索文件"
        size="small"
        clearable
      >
        <template #prefix><span>🔍</span></template>
      </n-input>
    </div>

    <!-- 文件树 -->
    <div class="explorer-content">
      <n-spin v-if="fileStore.isLoading" size="small" />
      <div v-else-if="fileStore.error" class="explorer-error">
        {{ fileStore.error }}
      </div>
      <FileTree
        v-else
        :nodes="fileStore.filteredFileTree"
        :level="0"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { NButton, NInput, NSpin } from 'naive-ui'
import { useFileExplorerStore } from '@/stores/fileExplorer'
import FileTree from './FileTree.vue'

const fileStore = useFileExplorerStore()

function refresh() {
  fileStore.fetchFileTree()
}

function handleNewFile() {
  // TODO: 实现新建文件
}

function handleNewFolder() {
  // TODO: 实现新建文件夹
}
</script>

<style lang="less" scoped>
.file-explorer {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #252526;
}

.explorer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-bottom: 1px solid #3c3c3c;
}

.explorer-title {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  color: #bbbbbb;
  letter-spacing: 0.5px;
}

.explorer-actions {
  display: flex;
  gap: 4px;
}

.explorer-search {
  padding: 8px 12px;
  border-bottom: 1px solid #3c3c3c;
}

.explorer-content {
  flex: 1;
  overflow-y: auto;
  padding: 4px 0;
}

.explorer-error {
  padding: 16px;
  color: #f48771;
  text-align: center;
  font-size: 12px;
}
</style>
