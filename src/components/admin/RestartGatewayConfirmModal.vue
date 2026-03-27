<template>
  <n-modal
    :show="show"
    :mask-closable="true"
    @update:show="(val: boolean) => !val && emit('cancel')"
  >
    <div class="restart-gateway-modal">
      <div class="restart-gateway-header">
        <span class="restart-gateway-icon">⚠️</span>
        <h3 class="restart-gateway-title">重启 Gateway？</h3>
      </div>
      <p class="restart-gateway-desc">
        确定要重启实例 <span class="instance-name" :title="instanceName">{{ displayName }}</span> 的 Gateway 服务吗？仅 Gateway 服务会短暂中断
      </p>
      <div class="restart-gateway-actions">
        <n-button size="medium" @click="emit('cancel')">取消</n-button>
        <n-button type="warning" size="medium" @click="emit('confirm')">确认重启</n-button>
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
.restart-gateway-modal {
  background: @bgWhite;
  border-radius: @radiusModal;
  padding: 24px;
  width: 400px;
  max-width: 90vw;
}

.restart-gateway-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.restart-gateway-icon {
  font-size: 20px;
}

.restart-gateway-title {
  font-size: 16px;
  font-weight: 600;
  color: @textColorTitle;
}

.restart-gateway-desc {
  font-size: 14px;
  color: @textColorSecondary;
  margin-bottom: 20px;
  line-height: 1.5;
}

.instance-name {
  font-weight: 600;
  color: @textColorTitle;
}

.restart-gateway-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
