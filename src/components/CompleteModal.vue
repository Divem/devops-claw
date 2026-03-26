<template>
  <n-modal :show="show" :mask-closable="true" @update:show="(val: boolean) => !val && emit('close')">
    <div class="complete-modal">
      <n-button quaternary circle size="small" class="modal-close" @click="emit('close')">✕</n-button>
      <div class="modal-header">
        <h2 class="modal-title">你的 OpenClaw 已部署</h2>
        <p class="modal-desc">由于企业管理员安全设置，飞书机器人正在审批中，通过后即可与飞书智能体对话。</p>
      </div>
      <div class="modal-illustration">
        <span style="font-size: 64px;">🎉</span>
      </div>
      <div class="modal-footer">
        <n-button size="large" @click="emit('openProject')">打开 OpenClaw 项目</n-button>
        <n-button type="primary" size="large" @click="emit('viewApproval')">查看审批单</n-button>
      </div>
    </div>
  </n-modal>
</template>

<script setup lang="ts">
import { NModal, NButton } from 'naive-ui'
defineProps<{ show: boolean }>()
const emit = defineEmits<{ close: []; openProject: []; viewApproval: [] }>()
</script>

<style lang="less" scoped>
.complete-modal {
  background: @bgWhite; border-radius: @radiusModal; padding: 24px; width: 480px; max-width: 90vw; position: relative; text-align: center;
}
.modal-close { position: absolute; top: 16px; right: 16px; }
.modal-title { font-size: 18px; font-weight: 600; color: @textColorTitle; }
.modal-desc { font-size: 14px; color: @textColorSecondary; margin-top: 8px; line-height: 1.5; }
.modal-illustration { padding: 32px 0; display: flex; align-items: center; justify-content: center; }
.modal-footer { display: flex; gap: 12px; > button, > .n-button { flex: 1; } }
</style>
