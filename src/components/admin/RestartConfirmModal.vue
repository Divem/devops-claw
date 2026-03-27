<template>
  <n-modal
    :show="show"
    :mask-closable="true"
    @update:show="(val: boolean) => !val && emit('cancel')"
  >
    <div class="restart-modal">
      <div class="restart-header">
        <span class="restart-icon">⚠️</span>
        <h3 class="restart-title">重启电脑？</h3>
      </div>
      <p class="restart-desc">
        确定要重启电脑 <span class="instance-name" :title="instanceName">{{ displayName }}</span> 吗？重启期间服务将暂时不可用
      </p>
      <div class="restart-actions">
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
.restart-modal {
  background: @bgWhite;
  border-radius: @radiusModal;
  padding: 24px;
  width: 400px;
  max-width: 90vw;
}

.restart-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.restart-icon {
  font-size: 20px;
}

.restart-title {
  font-size: 16px;
  font-weight: 600;
  color: @textColorTitle;
}

.restart-desc {
  font-size: 14px;
  color: @textColorSecondary;
  margin-bottom: 20px;
  line-height: 1.5;
}

.instance-name {
  font-weight: 600;
  color: @textColorTitle;
}

.restart-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
