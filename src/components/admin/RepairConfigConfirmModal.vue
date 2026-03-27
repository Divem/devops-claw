<template>
  <n-modal
    :show="show"
    :mask-closable="true"
    @update:show="(val: boolean) => !val && emit('cancel')"
  >
    <div class="repair-config-modal">
      <div class="repair-config-header">
        <span class="repair-config-icon">🔧</span>
        <h3 class="repair-config-title">修复配置？</h3>
      </div>
      <p class="repair-config-desc">
        确定要修复实例 <span class="instance-name" :title="instanceName">{{ displayName }}</span> 的 DevOps Claw 配置吗？系统将自动检测并修复常见配置问题
      </p>
      <div class="repair-config-actions">
        <n-button size="medium" @click="emit('cancel')">取消</n-button>
        <n-button type="warning" size="medium" @click="emit('confirm')">确认修复</n-button>
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
.repair-config-modal {
  background: @bgWhite;
  border-radius: @radiusModal;
  padding: 24px;
  width: 400px;
  max-width: 90vw;
}

.repair-config-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.repair-config-icon {
  font-size: 20px;
}

.repair-config-title {
  font-size: 16px;
  font-weight: 600;
  color: @textColorTitle;
}

.repair-config-desc {
  font-size: 14px;
  color: @textColorSecondary;
  margin-bottom: 20px;
  line-height: 1.5;
}

.instance-name {
  font-weight: 600;
  color: @textColorTitle;
}

.repair-config-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
