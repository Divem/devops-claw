<template>
  <div class="editor-area">
    <!-- 标签栏 -->
    <TabBar />

    <!-- 面包屑导航 -->
    <Breadcrumb />

    <!-- 编辑器内容区 -->
    <div class="editor-content">
      <!-- 空状态 -->
      <div v-if="!editorStore.activeTab" class="empty-state">
        <div class="empty-icon">📂</div>
        <div class="empty-title">欢迎使用 OpenClaw 配置</div>
        <div class="empty-desc">从左侧文件树选择一个文件开始编辑</div>
        <div class="empty-shortcuts">
          <div class="shortcut-item">
            <span class="shortcut-key">Ctrl+N</span>
            <span>新建文件</span>
          </div>
          <div class="shortcut-item">
            <span class="shortcut-key">Ctrl+S</span>
            <span>保存文件</span>
          </div>
        </div>
      </div>

      <!-- 编辑器 -->
      <div v-else class="editor-wrapper">
        <MonacoEditor
          ref="monacoEditorRef"
          v-model="currentContent"
          :language="editorStore.activeTab.language || 'json'"
          :filename="editorStore.activeTab.name"
          @change="handleContentChange"
        />
      </div>
    </div>

    <!-- 状态栏 -->
    <StatusBar :editor-instance="monacoEditorRef?.getEditor() || null" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import TabBar from './TabBar.vue'
import Breadcrumb from './Breadcrumb.vue'
import MonacoEditor from './MonacoEditor.vue'
import StatusBar from './StatusBar.vue'
import { useEditorStore } from '@/stores/editor'
import { useConfigStore } from '@/stores/config'

const editorStore = useEditorStore()
const configStore = useConfigStore()

const monacoEditorRef = ref<InstanceType<typeof MonacoEditor> | null>(null)
const saveTimer = ref<ReturnType<typeof setTimeout> | null>(null)

// 当前编辑器内容
const currentContent = computed({
  get: () => editorStore.activeTab?.content || '',
  set: (value: string) => {
    if (editorStore.activeTab) {
      editorStore.updateTabContent(editorStore.activeTab.id, value)
    }
  },
})

// 内容变化处理
function handleContentChange(_value: string) {
  // 清除之前的保存定时器
  if (saveTimer.value) {
    clearTimeout(saveTimer.value)
  }

  // 设置新的防抖保存
  saveTimer.value = setTimeout(async () => {
    await editorStore.saveActiveTab()
  }, 500)
}

// 键盘快捷键
function handleKeyDown(e: KeyboardEvent) {
  // Ctrl+S / Cmd+S 保存
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault()
    editorStore.saveActiveTab()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeyDown)
  if (saveTimer.value) {
    clearTimeout(saveTimer.value)
  }
})

// 监听标签切换
watch(() => editorStore.activeTabId, async (newId) => {
  if (newId && editorStore.activeTab) {
    const tab = editorStore.activeTab
    if (!tab.content && tab.isLoading) {
      // 需要加载文件内容
      try {
        const content = await configStore.fetchFileContent(tab.path)
        editorStore.updateTabContent(tab.id, content)
        tab.isLoading = false
      } catch {
        tab.isLoading = false
      }
    }
  }
})
</script>

<style lang="less" scoped>
.editor-area {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #1e1e1e;
}

.editor-content {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #6e6e6e;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-title {
  font-size: 18px;
  font-weight: 500;
  color: #cccccc;
  margin-bottom: 8px;
}

.empty-desc {
  font-size: 14px;
  margin-bottom: 32px;
}

.empty-shortcuts {
  display: flex;
  gap: 24px;
}

.shortcut-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}

.shortcut-key {
  padding: 4px 8px;
  background: #3c3c3c;
  border-radius: 4px;
  font-family: monospace;
  font-size: 12px;
  color: #cccccc;
}

.editor-wrapper {
  width: 100%;
  height: 100%;
}
</style>
