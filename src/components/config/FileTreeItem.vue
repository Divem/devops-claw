<template>
  <div
    class="file-tree-item"
    :style="{ paddingLeft: level * 12 + 8 + 'px' }"
  >
    <!-- 文件夹/文件项 -->
    <div
      class="tree-item-content"
      :class="{
        'is-selected': fileStore.selectedFileId === node.id,
        'is-directory': node.type === 'directory',
        'is-modified': node.isModified,
      }"
      @click="handleClick"
      @contextmenu.prevent="handleContextMenu"
    >
      <!-- 展开/折叠图标 -->
      <span
        v-if="node.type === 'directory'"
        class="expand-icon"
        @click.stop="toggleExpand"
      >
        {{ node.isExpanded ? '▼' : '▶' }}
      </span>
      <span v-else class="expand-icon-placeholder"></span>

      <!-- 文件图标 -->
      <span class="file-icon">{{ getFileIcon(node) }}</span>

      <!-- 文件名 -->
      <span class="file-name">{{ node.name }}</span>

      <!-- 修改标记 -->
      <span v-if="node.isModified" class="modified-indicator">●</span>
    </div>

    <!-- 子节点 -->
    <div v-if="node.type === 'directory' && node.isExpanded && node.children">
      <template v-if="node.children.length > 0">
        <FileTreeItem
          v-for="childId in node.children"
          :key="childId"
          :node="getChildNode(childId)"
          :level="level + 1"
        />
      </template>
      <div v-else class="empty-folder" :style="{ paddingLeft: (level + 1) * 12 + 20 + 'px' }">
        空文件夹
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { computed } from 'vue'
import type { FileNode } from '@/stores/fileExplorer'
import { useFileExplorerStore } from '@/stores/fileExplorer'
import { useEditorStore } from '@/stores/editor'
import { useConfigStore } from '@/stores/config'

interface Props {
  node: FileNode
  level: number
}

const props = defineProps<Props>()

const fileStore = useFileExplorerStore()
const editorStore = useEditorStore()
const configStore = useConfigStore()

function getChildNode(childId: string): FileNode {
  const child = fileStore.files.get(childId)
  if (!child) {
    return {
      id: childId,
      name: 'Unknown',
      path: '',
      type: 'file',
      parentId: props.node.id,
    }
  }
  return child
}

function getFileIcon(node: FileNode): string {
  if (node.type === 'directory') {
    return node.isExpanded ? '📂' : '📁'
  }

  const ext = node.name.split('.').pop()?.toLowerCase()
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
    case 'css':
    case 'less':
    case 'scss':
      return '🎨'
    default:
      return '📄'
  }
}

function toggleExpand() {
  fileStore.toggleExpand(props.node.id)
}

async function handleClick() {
  if (props.node.type === 'directory') {
    fileStore.toggleExpand(props.node.id)
  } else {
    fileStore.selectFile(props.node.id)

    // 加载文件内容并打开标签页
    try {
      const content = await configStore.fetchFileContent(props.node.path)
      const language = detectLanguage(props.node.name)
      editorStore.openTab(
        props.node.id,
        props.node.name,
        props.node.path,
        content,
        language
      )
    } catch {
      // 错误已在 store 中处理
    }
  }
}

function handleContextMenu() {
  // TODO: 实现右键菜单
}

function detectLanguage(fileName: string): string {
  if (fileName.endsWith('.json')) return 'json'
  if (fileName.endsWith('.yaml') || fileName.endsWith('.yml')) return 'yaml'
  if (fileName.endsWith('.md')) return 'markdown'
  if (fileName.endsWith('.ts')) return 'typescript'
  if (fileName.endsWith('.js')) return 'javascript'
  return 'plaintext'
}
</script>

<style lang="less" scoped>
.file-tree-item {
  user-select: none;
}

.tree-item-content {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 13px;
  color: #cccccc;
  transition: background-color 0.1s;

  &:hover {
    background-color: #2a2d2e;
  }

  &.is-selected {
    background-color: #37373d;
  }

  &.is-directory {
    font-weight: 500;
  }

  &.is-modified .file-name {
    color: #e2c08d;
  }
}

.expand-icon,
.expand-icon-placeholder {
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: #858585;
  flex-shrink: 0;
}

.expand-icon {
  cursor: pointer;

  &:hover {
    color: #cccccc;
  }
}

.file-icon {
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  flex-shrink: 0;
}

.file-name {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.modified-indicator {
  color: #e2c08d;
  font-size: 8px;
  margin-left: 4px;
}

.empty-folder {
  padding-top: 4px;
  padding-bottom: 4px;
  font-size: 12px;
  color: #6e6e6e;
  font-style: italic;
}
</style>
