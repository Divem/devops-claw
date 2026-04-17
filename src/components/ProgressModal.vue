<template>
  <n-modal :show="show" :mask-closable="false" :closable="false">
    <div class="progress-modal">
      <div class="modal-header">
        <h2 class="modal-title">{{ titleText }}</h2>
        <p class="modal-subtitle">一键接入飞书，创建预计耗时 1 分钟。</p>
      </div>

      <div class="steps">
        <div v-for="(step, index) in steps" :key="step.key" class="step-item" :class="{
          'step-clickable': isStepClickable(step),
        }" @click="handleStepClick(step)">
          <div class="step-indicator">
            <div class="step-icon" :class="{
              'step-pending': step.status === 'pending',
              'step-running': step.status === 'running',
              'step-done': step.status === 'done',
              'step-error': step.status === 'error',
            }">
              <span v-if="step.status === 'done'">✓</span>
              <span v-else-if="step.status === 'error'">✕</span>
              <span v-else-if="step.status === 'running'" class="spinner">◌</span>
              <span v-else>○</span>
            </div>
            <div v-if="index < steps.length - 1" class="step-line" :class="{ 'step-line-done': step.status === 'done' }" />
          </div>
          <div class="step-content">
            <span class="step-label" :class="{ 'step-label-error': step.status === 'error' }">{{ step.label }}</span>
            <span v-if="step.elapsed" class="step-elapsed">{{ step.elapsed }} s</span>
            <span v-if="step.key === 'feishu' && skippedBotConfig" class="skip-hint">
              （本次跳过机器人配置）
            </span>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <n-button v-if="hasError" type="primary" size="large" block @click="emit('retry')">重试</n-button>
        <n-button v-else type="primary" size="large" block disabled loading>创建中</n-button>
      </div>
    </div>
  </n-modal>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NModal, NButton } from 'naive-ui'

type AgentType = 'openclaw' | 'hermes'

interface GenericStepInfo {
  key: string
  label: string
  status: 'pending' | 'running' | 'done' | 'error'
  elapsed?: number
}

const props = withDefaults(defineProps<{
  show: boolean
  steps: GenericStepInfo[]
  skippedBotConfig?: boolean
  agentType?: AgentType
}>(), {
  agentType: 'openclaw',
})

const emit = defineEmits<{
  retry: []
  skipToStep: [step: string]
}>()

const hasError = computed(() => props.steps.some((s) => s.status === 'error'))

const titleText = computed(() =>
  props.agentType === 'hermes' ? '正在创建 Hermes Agent' : '正在创建 OpenClaw 项目',
)

// Agent 主步骤（openclaw 或 hermes）完成时可以点击跳转到下一步
function isStepClickable(step: GenericStepInfo): boolean {
  return step.key === props.agentType && step.status === 'done'
}

function handleStepClick(step: GenericStepInfo) {
  if (isStepClickable(step)) {
    emit('skipToStep', 'feishu')
  }
}
</script>

<style lang="less" scoped>
.progress-modal {
  background: @bgWhite; border-radius: @radiusModal; padding: 24px; width: 480px; max-width: 90vw;
}
.modal-header { margin-bottom: 24px; }
.modal-title { font-size: 18px; font-weight: 600; color: @textColorTitle; }
.modal-subtitle { font-size: 12px; color: @textColorPlaceholder; margin-top: 4px; }
.steps { padding: 0 8px; }
.step-item { display: flex; gap: 12px; }
.step-indicator { display: flex; flex-direction: column; align-items: center; width: 24px; flex-shrink: 0; }
.step-icon {
  width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
  font-size: 12px; border: 2px solid @borderColor; color: @textColorPlaceholder;
}
.step-pending { border-color: @borderColor; color: @textColorPlaceholder; }
.step-running { border-color: @primaryColor; color: @primaryColor; }
.step-done { border-color: @successColor; background: @successColor; color: white; }
.step-error { border-color: @errorColor; background: @errorColor; color: white; }
.step-line { width: 2px; height: 32px; background: @borderColor; }
.step-line-done { background: @successColor; }
.step-content { display: flex; align-items: center; gap: 8px; flex: 1; min-height: 56px; padding-top: 2px; }
.step-label { font-size: 14px; color: @textColorBody; }
.step-label-error { color: @errorColor; }
.step-elapsed { font-size: 12px; color: @textColorPlaceholder; margin-left: auto; }
.skip-hint { font-size: 12px; color: @warningColor; font-style: italic; }

.step-item {
  &.step-clickable {
    cursor: pointer;

    &:hover {
      .step-label {
        color: @primaryColor;
      }

      .step-icon.step-done {
        transform: scale(1.1);
        box-shadow: 0 0 8px fade(@successColor, 50%);
      }
    }

    .step-icon.step-done {
      transition: all 0.2s ease;
    }
  }
}
.spinner { animation: spin 1s linear infinite; }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.modal-footer { margin-top: 24px; }
</style>
