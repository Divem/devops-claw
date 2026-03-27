<template>
  <div ref="editorContainer" class="monaco-editor-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import loader from '@monaco-editor/loader'
import type { editor as MonacoEditorType, IPosition } from 'monaco-editor'

interface Props {
  modelValue: string
  language?: string
  filename?: string
  readonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  language: 'json',
  readonly: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
}>()

const editorContainer = ref<HTMLDivElement | null>(null)
let editor: MonacoEditorType.IStandaloneCodeEditor | null = null

onMounted(async () => {
  if (!editorContainer.value) return

  // 加载 Monaco Editor
  const monaco = await loader.init()

  // 创建编辑器
  editor = monaco.editor.create(editorContainer.value, {
    value: props.modelValue,
    language: props.language,
    theme: 'vs-dark',
    automaticLayout: true,
    minimap: { enabled: false },
    fontSize: 14,
    lineNumbers: 'on',
    roundedSelection: false,
    scrollBeyondLastLine: false,
    readOnly: props.readonly,
    wordWrap: 'on',
    folding: true,
    renderLineHighlight: 'all',
    selectOnLineNumbers: true,
    matchBrackets: 'always',
    autoIndent: 'full',
    formatOnPaste: true,
    formatOnType: true,
  })

  // 监听内容变化
  editor?.onDidChangeModelContent(() => {
    const value = editor?.getValue() || ''
    emit('update:modelValue', value)
    emit('change', value)
  })

  // 监听光标位置变化
  editor?.onDidChangeCursorPosition(() => {
    const position = editor?.getPosition()
    if (position) {
      // 可以通过事件发射出去
    }
  })
})

onBeforeUnmount(() => {
  if (editor) {
    editor.dispose()
    editor = null
  }
})

// 监听外部值变化
watch(() => props.modelValue, (newValue) => {
  if (editor && editor.getValue() !== newValue) {
    editor.setValue(newValue)
  }
})

// 监听语言变化
watch(() => props.language, async (newLanguage) => {
  if (editor) {
    const monaco = await loader.init()
    const model = editor.getModel()
    if (model) {
      monaco.editor.setModelLanguage(model, newLanguage)
    }
  }
})

// 暴露编辑器实例方法
defineExpose({
  getEditor: () => editor,
  getValue: () => editor?.getValue() || '',
  setValue: (value: string) => editor?.setValue(value),
  focus: () => editor?.focus(),
  getPosition: () => editor?.getPosition(),
  setPosition: (position: IPosition) => editor?.setPosition(position),
})
</script>

<style lang="less" scoped>
.monaco-editor-container {
  width: 100%;
  height: 100%;
  min-height: 200px;
}
</style>
