<template>
  <n-modal
    :show="show"
    :mask-closable="true"
    @update:show="(val: boolean) => !val && emit('cancel')"
  >
    <div class="stop-modal">
      <div class="stop-header">
        <span class="stop-icon">⚠️</span>
        <h3 class="stop-title">停止实例？</h3>
      </div>
      <p class="stop-desc">
        确定要停止实例 <span class="instance-name" :title="instanceName">{{ displayName }}</span> 吗？停止后服务将不可用
      </p>
      <div class="stop-actions">
        <n-button size="medium" @click="emit('cancel')">取消</n-button>
        <n-button type="warning" size="medium" @click="emit('confirm')">确认停止</n-button>
      </div>
    </div>
  </n-modal>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NModal, NButton } from 'naive-ui'

const props = defineProps<{
  show: boolean
  instanceName: string
}>()

const emit = defineEmits<{
  cancel: []
  confirm: []
}>()

const displayName = computed(() => {
  if (props.instanceName.length > 20) {
    return props.instanceName.slice(0, 20) + '...'
  }
  return props.instanceName
})
</script>

<style lang="less" scoped>
.stop-modal {
  background: @bgWhite;
  border-radius: @radiusModal;
  padding: 24px;
  width: 400px;
  max-width: 90vw;
}

.stop-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.stop-icon {
  font-size: 20px;
}

.stop-title {
  font-size: 16px;
  font-weight: 600;
  color: @textColorTitle;
}

.stop-desc {
  font-size: 14px;
  color: @textColorSecondary;
  margin-bottom: 20px;
  line-height: 1.5;
}

.instance-name {
  font-weight: 600;
  color: @textColorTitle;
}

.stop-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
