<template>
  <n-modal :show="show" :mask-closable="true" @update:show="(val: boolean) => !val && emit('cancel')">
    <div class="delete-modal">
      <div class="delete-header">
        <span class="delete-icon">⚠️</span>
        <h3 class="delete-title">删除智能助手？</h3>
      </div>
      <p class="delete-desc">删除后内容无法恢复，请谨慎操作</p>
      <div class="delete-actions">
        <n-button size="medium" @click="emit('cancel')">取消</n-button>
        <n-button type="error" size="medium" @click="emit('confirm')">删除</n-button>
      </div>
    </div>
  </n-modal>
</template>

<script setup lang="ts">
import { NModal, NButton } from 'naive-ui'
defineProps<{ show: boolean }>()
const emit = defineEmits<{ cancel: []; confirm: [] }>()
</script>

<style lang="less" scoped>
.delete-modal {
  background: @bgWhite; border-radius: @radiusModal; padding: 24px; width: 400px; max-width: 90vw;
}
.delete-header { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
.delete-icon { font-size: 20px; }
.delete-title { font-size: 16px; font-weight: 600; color: @textColorTitle; }
.delete-desc { font-size: 14px; color: @textColorSecondary; margin-bottom: 20px; }
.delete-actions { display: flex; justify-content: flex-end; gap: 12px; }
</style>
