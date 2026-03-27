<template>
  <div class="status-bar">
    <div class="status-left">
      <span v-if="editorStore.isSaving" class="status-item">
        <span class="status-icon">💾</span>
        保存中...
      </span>
      <span v-else-if="editorStore.saveError" class="status-item error">
        <span class="status-icon">⚠️</span>
        保存失败
      </span>
      <span v-else-if="lastSavedText" class="status-item">
        已保存 {{ lastSavedText }}
      </span>
    </div>

    <div class="status-right">
      <span v-if="cursorPosition" class="status-item">
        行 {{ cursorPosition.lineNumber }}, 列 {{ cursorPosition.column }}
      </span>
      <span class="status-item">UTF-8</span>
      <span class="status-item">{{ languageLabel }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useEditorStore } from '@/stores/editor'
import type { editor } from 'monaco-editor'

interface Props {
  editorInstance?: editor.IStandaloneCodeEditor | null
}

const props = defineProps<Props>()

const editorStore = useEditorStore()

const cursorPosition = ref<{ lineNumber: number; column: number } | null>(null)
const lastSavedText = ref('')
let saveTimeTimer: ReturnType<typeof setInterval> | null = null

const languageLabel = computed(() => {
  const lang = editorStore.activeTab?.language
  const labels: Record<string, string> = {
    json: 'JSON',
    yaml: 'YAML',
    markdown: 'Markdown',
    typescript: 'TypeScript',
    javascript: 'JavaScript',
  }
  return labels[lang || ''] || '纯文本'
})

// 监听光标位置
onMounted(() => {
  if (props.editorInstance) {
    props.editorInstance.onDidChangeCursorPosition((e) => {
      cursorPosition.value = {
        lineNumber: e.position.lineNumber,
        column: e.position.column,
      }
    })

    // 初始化光标位置
    const position = props.editorInstance.getPosition()
    if (position) {
      cursorPosition.value = {
        lineNumber: position.lineNumber,
        column: position.column,
      }
    }
  }

  // 更新保存时间显示
  updateLastSavedText()
  saveTimeTimer = setInterval(updateLastSavedText, 60000)
})

onBeforeUnmount(() => {
  if (saveTimeTimer) {
    clearInterval(saveTimeTimer)
  }
})

function updateLastSavedText() {
  if (!editorStore.activeTab) {
    lastSavedText.value = ''
    return
  }

  // TODO: 从 store 获取实际保存时间
  lastSavedText.value = ''
}
</script>

<style lang="less" scoped>
.status-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  height: 22px;
  background: #006eff;
  color: #ffffff;
  font-size: 12px;
}

.status-left,
.status-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 4px;

  &.error {
    color: #ffcccc;
  }
}

.status-icon {
  font-size: 10px;
}
</style>
