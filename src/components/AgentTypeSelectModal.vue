<template>
  <n-modal
    :show="show"
    :mask-closable="true"
    @update:show="(val: boolean) => !val && emit('close')"
  >
    <div class="type-select-modal">
      <div class="modal-header">
        <h2 class="modal-title">选择 Agent 类型</h2>
        <p class="modal-subtitle">选择你想要创建的 Agent 类型，不同类型适合不同的场景。</p>
        <n-button
          quaternary
          circle
          size="small"
          class="modal-close"
          @click="emit('close')"
        >
          ✕
        </n-button>
      </div>

      <div class="modal-body">
        <div
          class="type-card"
          data-testid="type-card-openclaw"
          @click="handleSelect('openclaw')"
        >
          <div class="type-icon openclaw-icon">🦞</div>
          <div class="type-info">
            <div class="type-name">OpenClaw</div>
            <div class="type-desc">企业级 AI 助手平台，支持飞书一键部署，适合日常办公场景。</div>
          </div>
          <n-button type="primary" size="small">选择</n-button>
        </div>

        <div
          class="type-card"
          data-testid="type-card-hermes"
          @click="handleSelect('hermes')"
        >
          <div class="type-icon hermes-icon">🪽</div>
          <div class="type-info">
            <div class="type-name">Hermes Agent</div>
            <div class="type-desc">轻量级智能 Agent，专为任务编排与工具调用设计，响应更快。</div>
          </div>
          <n-button type="primary" size="small">选择</n-button>
        </div>
      </div>
    </div>
  </n-modal>
</template>

<script setup lang="ts">
import { NModal, NButton } from 'naive-ui'

defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  close: []
  select: [type: 'openclaw' | 'hermes']
}>()

function handleSelect(type: 'openclaw' | 'hermes') {
  emit('select', type)
}
</script>

<style lang="less" scoped>
.type-select-modal {
  background: @bgWhite;
  border-radius: @radiusModal;
  padding: 24px;
  width: 520px;
  max-width: 90vw;
  position: relative;
}

.modal-header {
  margin-bottom: 20px;
}

.modal-title {
  font-size: 18px;
  font-weight: 600;
  color: @textColorTitle;
}

.modal-subtitle {
  font-size: 12px;
  color: @textColorPlaceholder;
  margin-top: 4px;
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.type-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border: 1px solid @borderColor;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: @primaryColor;
    box-shadow: 0 4px 12px fade(@primaryColor, 12%);
    transform: translateY(-1px);
  }
}

.type-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
}

.openclaw-icon {
  background: fade(@primaryColor, 8%);
}

.hermes-icon {
  background: fade(@warningColor, 12%);
}

.type-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.type-name {
  font-size: 15px;
  font-weight: 600;
  color: @textColorTitle;
}

.type-desc {
  font-size: 12px;
  color: @textColorPlaceholder;
  line-height: 1.5;
}
</style>
