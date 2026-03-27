<template>
  <div class="terminal-view">
    <!-- 终端头部 - 系统信息 -->
    <div class="terminal-header">
      <div class="terminal-welcome">
        Welcome to OpenClaw Config Terminal
      </div>
      <div class="terminal-info">
        <div class="info-row">
          <span class="info-label">System load:</span>
          <span class="info-value">{{ systemLoad }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Memory usage:</span>
          <span class="info-value">{{ memoryUsage }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Config size:</span>
          <span class="info-value">{{ configSize }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Last modified:</span>
          <span class="info-value">{{ lastModified }}</span>
        </div>
      </div>
    </div>

    <!-- 终端内容区域 -->
    <div class="terminal-content" ref="terminalContentRef">
      <div class="terminal-command">
        <span class="prompt">root@openclaw:~#</span>
        <span class="command">cat config.yaml</span>
      </div>
      <pre class="terminal-output">{{ formattedConfig }}</pre>
      <div class="terminal-command">
        <span class="prompt">root@openclaw:~#</span>
        <span class="cursor">_</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  config?: Record<string, any>
}>()

// 模拟系统信息
const systemLoad = ref('0.0')
const memoryUsage = ref('10%')
const configSize = computed(() => {
  const configStr = JSON.stringify(props.config || {})
  return `${(configStr.length / 1024).toFixed(2)} KB`
})
const lastModified = computed(() => {
  return new Date().toLocaleString('zh-CN')
})

// 格式化配置为 YAML 风格
const formattedConfig = computed(() => {
  if (!props.config || Object.keys(props.config).length === 0) {
    return '# No configuration available'
  }
  return formatAsYaml(props.config)
})

function formatAsYaml(obj: any, indent = 0): string {
  const spaces = '  '.repeat(indent)
  let result = ''

  for (const [key, value] of Object.entries(obj)) {
    if (value === null || value === undefined) {
      result += `${spaces}${key}: null\n`
    } else if (typeof value === 'object' && !Array.isArray(value)) {
      result += `${spaces}${key}:\n`
      result += formatAsYaml(value, indent + 1)
    } else if (Array.isArray(value)) {
      result += `${spaces}${key}:\n`
      for (const item of value) {
        if (typeof item === 'object') {
          result += `${spaces}  -\n`
          result += formatAsYaml(item, indent + 2).replace(/^(\s*)/, '$1  ')
        } else {
          result += `${spaces}  - ${item}\n`
        }
      }
    } else {
      result += `${spaces}${key}: ${value}\n`
    }
  }

  return result
}
</script>

<style lang="less" scoped>
.terminal-view {
  width: 100%;
  height: 100%;
  background: #1e1e1e;
  color: #d4d4d4;
  font-family: Monaco, Consolas, 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.terminal-header {
  padding: 16px;
  border-bottom: 1px solid #333;
  flex-shrink: 0;
}

.terminal-welcome {
  color: #4ec9b0;
  font-weight: 600;
  margin-bottom: 12px;
}

.terminal-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px 24px;
}

.info-row {
  display: flex;
  gap: 8px;
}

.info-label {
  color: #569cd6;
  min-width: 120px;
}

.info-value {
  color: #d4d4d4;
}

.terminal-content {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
}

.terminal-command {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}

.prompt {
  color: #4ec9b0;
  font-weight: 600;
}

.command {
  color: #d4d4d4;
}

.terminal-output {
  margin: 0;
  padding: 8px 0;
  color: #d4d4d4;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.cursor {
  color: #4ec9b0;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* 滚动条样式 */
.terminal-view::-webkit-scrollbar,
.terminal-content::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.terminal-view::-webkit-scrollbar-track,
.terminal-content::-webkit-scrollbar-track {
  background: #1e1e1e;
}

.terminal-view::-webkit-scrollbar-thumb,
.terminal-content::-webkit-scrollbar-thumb {
  background: #424242;
  border-radius: 5px;
}

.terminal-view::-webkit-scrollbar-thumb:hover,
.terminal-content::-webkit-scrollbar-thumb:hover {
  background: #4f4f4f;
}
</style>
