<template>
  <div class="config-code-mode">
    <!-- 左侧文件资源管理器 -->
    <div class="file-explorer-wrapper" :style="{ width: sidebarWidth + 'px' }">
      <FileExplorer />
    </div>

    <!-- 拖拽调整宽度的手柄 -->
    <div
      class="resize-handle"
      @mousedown="startResize"
    />

    <!-- 右侧编辑器区域 -->
    <div class="editor-area-wrapper">
      <EditorArea />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import FileExplorer from '@/components/config/FileExplorer.vue'
import EditorArea from '@/components/config/EditorArea.vue'
import { useFileExplorerStore } from '@/stores/fileExplorer'
import { useEditorStore } from '@/stores/editor'

const fileStore = useFileExplorerStore()
const editorStore = useEditorStore()

const sidebarWidth = ref(240)
const isResizing = ref(false)

onMounted(() => {
  fileStore.fetchFileTree()
  editorStore.restoreTabs()
})

function startResize(e: MouseEvent) {
  isResizing.value = true
  const startX = e.clientX
  const startWidth = sidebarWidth.value

  function handleMouseMove(e: MouseEvent) {
    if (!isResizing.value) return
    const delta = e.clientX - startX
    const newWidth = Math.max(180, Math.min(400, startWidth + delta))
    sidebarWidth.value = newWidth
  }

  function handleMouseUp() {
    isResizing.value = false
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}
</script>

<style lang="less" scoped>
.config-code-mode {
  display: flex;
  height: 100vh;
  width: 100%;
  background: #1e1e1e;
  color: #d4d4d4;
}

.file-explorer-wrapper {
  flex-shrink: 0;
  background: #252526;
  overflow: hidden;
}

.resize-handle {
  width: 4px;
  cursor: col-resize;
  background: transparent;
  transition: background 0.2s;

  &:hover,
  &:active {
    background: #006eff;
  }
}

.editor-area-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
