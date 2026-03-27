<template>
  <div class="tab-bar">
    <div class="tabs-container">
      <div
        v-for="tab in editorStore.tabs"
        :key="tab.id"
        class="tab-item"
        :class="{
          'is-active': editorStore.activeTabId === tab.id,
          'is-modified': tab.isModified,
        }"
        @click="handleTabClick(tab.id)"
        @contextmenu.prevent="handleContextMenu($event, tab.id)"
      >
        <span class="tab-icon">{{ getFileIcon(tab.name) }}</span>
        <span class="tab-name">{{ tab.name }}</span>
        <span v-if="tab.isModified" class="tab-modified">●</span>
        <span
          class="tab-close"
          @click.stop="handleCloseTab(tab.id)"
        >×</span>
      </div>
    </div>

    <!-- 右键菜单 -->
    <n-dropdown
      :show="showContextMenu"
      :options="contextMenuOptions"
      :x="contextMenuX"
      :y="contextMenuY"
      @select="handleContextMenuSelect"
      @clickoutside="showContextMenu = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NDropdown } from 'naive-ui'
import { useEditorStore } from '@/stores/editor'

const editorStore = useEditorStore()

const showContextMenu = ref(false)
const contextMenuX = ref(0)
const contextMenuY = ref(0)
const contextTabId = ref<string | null>(null)

const contextMenuOptions = [
  { label: '关闭', key: 'close' },
  { label: '关闭其他', key: 'closeOthers' },
  { label: '关闭右侧所有', key: 'closeRight' },
  { label: '关闭所有', key: 'closeAll' },
]

function getFileIcon(fileName: string): string {
  const ext = fileName.split('.').pop()?.toLowerCase()
  switch (ext) {
    case 'json':
      return '📋'
    case 'yaml':
    case 'yml':
      return '📄'
    case 'md':
      return '📝'
    case 'ts':
    case 'js':
      return '💻'
    case 'vue':
      return '🔷'
    default:
      return '📄'
  }
}

function handleTabClick(tabId: string) {
  editorStore.setActiveTab(tabId)
}

function handleCloseTab(tabId: string) {
  editorStore.closeTab(tabId)
}

function handleContextMenu(event: MouseEvent, tabId: string) {
  contextTabId.value = tabId
  contextMenuX.value = event.clientX
  contextMenuY.value = event.clientY
  showContextMenu.value = true
}

function handleContextMenuSelect(key: string) {
  if (!contextTabId.value) return

  switch (key) {
    case 'close':
      editorStore.closeTab(contextTabId.value)
      break
    case 'closeOthers':
      editorStore.closeOtherTabs(contextTabId.value)
      break
    case 'closeRight':
      editorStore.closeTabsToRight(contextTabId.value)
      break
    case 'closeAll':
      editorStore.closeAllTabs()
      break
  }

  showContextMenu.value = false
  contextTabId.value = null
}
</script>

<style lang="less" scoped>
.tab-bar {
  display: flex;
  background: #2d2d2d;
  border-bottom: 1px solid #3c3c3c;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: thin;
  scrollbar-color: #4a4a4a transparent;
}

.tabs-container {
  display: flex;
  min-width: min-content;
}

.tab-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: #2d2d2d;
  border-right: 1px solid #3c3c3c;
  cursor: pointer;
  font-size: 13px;
  color: #969696;
  min-width: 120px;
  max-width: 200px;
  transition: all 0.2s;
  user-select: none;

  &:hover {
    background: #3c3c3c;
  }

  &.is-active {
    background: #1e1e1e;
    color: #ffffff;
    border-bottom: 2px solid #006eff;
  }

  &.is-modified .tab-name {
    color: #e2c08d;
  }
}

.tab-icon {
  font-size: 12px;
}

.tab-name {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tab-modified {
  color: #e2c08d;
  font-size: 8px;
}

.tab-close {
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  font-size: 14px;
  color: #858585;
  opacity: 0;
  transition: all 0.2s;

  .tab-item:hover & {
    opacity: 1;
  }

  &:hover {
    background: #c75450;
    color: #ffffff;
  }
}

/* 滚动条样式 */
.tab-bar::-webkit-scrollbar {
  height: 4px;
}

.tab-bar::-webkit-scrollbar-track {
  background: transparent;
}

.tab-bar::-webkit-scrollbar-thumb {
  background: #4a4a4a;
  border-radius: 2px;
}
</style>
