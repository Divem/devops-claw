<template>
  <div class="breadcrumb">
    <div class="breadcrumb-items">
      <span
        v-for="(segment, index) in pathSegments"
        :key="index"
        class="breadcrumb-item"
        :class="{ 'is-last': index === pathSegments.length - 1 }"
      >
        <span
          v-if="index > 0"
          class="breadcrumb-separator"
        >/</span>
        <span
          class="breadcrumb-segment"
          :class="{ 'is-clickable': index < pathSegments.length - 1 && segment.id }"
          @click="handleSegmentClick(segment)"
        >
          <span class="segment-icon">{{ segment.icon }}</span>
          <span class="segment-name">{{ segment.name }}</span>
        </span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useFileExplorerStore } from '@/stores/fileExplorer'
import { useEditorStore } from '@/stores/editor'

interface PathSegment {
  name: string
  path: string
  id?: string
  icon: string
}

const fileStore = useFileExplorerStore()
const editorStore = useEditorStore()

const pathSegments = computed<PathSegment[]>(() => {
  const activeTab = editorStore.activeTab
  if (!activeTab) {
    return [{ name: 'openclaw', path: '/', icon: '📁' }]
  }

  const segments: PathSegment[] = []
  const parts = activeTab.path.split('/').filter(Boolean)

  // 根目录
  segments.push({ name: 'openclaw', path: '/', icon: '📁' })

  // 路径段
  let currentPath = ''
  for (let i = 0; i < parts.length; i++) {
    currentPath += '/' + parts[i]
    const isLast = i === parts.length - 1

    // 查找对应的文件节点
    let nodeId: string | undefined
    for (const [id, node] of fileStore.files) {
      if (node.path === currentPath) {
        nodeId = id
        break
      }
    }

    segments.push({
      name: parts[i],
      path: currentPath,
      id: nodeId,
      icon: isLast ? getFileIcon(parts[i]) : '📁',
    })
  }

  return segments
})

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

function handleSegmentClick(segment: PathSegment) {
  if (!segment.id) return

  const node = fileStore.files.get(segment.id)
  if (node && node.type === 'directory') {
    fileStore.toggleExpand(segment.id)
    // 展开文件树中对应的文件夹
  }
}
</script>

<style lang="less" scoped>
.breadcrumb {
  display: flex;
  align-items: center;
  padding: 6px 12px;
  background: #1e1e1e;
  border-bottom: 1px solid #3c3c3c;
  font-size: 12px;
  color: #cccccc;
}

.breadcrumb-items {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
}

.breadcrumb-separator {
  margin: 0 4px;
  color: #6e6e6e;
}

.breadcrumb-segment {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 4px;
  border-radius: 3px;
  transition: background-color 0.2s;

  &.is-clickable {
    cursor: pointer;

    &:hover {
      background-color: #3c3c3c;
    }
  }
}

.segment-icon {
  font-size: 12px;
}

.segment-name {
  color: #cccccc;
}

.breadcrumb-item.is-last .segment-name {
  color: #ffffff;
  font-weight: 500;
}
</style>
