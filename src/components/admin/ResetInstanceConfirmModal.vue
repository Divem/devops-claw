<template>
  <n-modal
    :show="show"
    :mask-closable="false"
    @update:show="(val: boolean) => !val && emit('cancel')"
  >
    <div class="reset-instance-modal">
      <div class="reset-instance-header">
        <span class="reset-instance-icon">🔄</span>
        <h3 class="reset-instance-title">恢复默认配置？</h3>
      </div>
      <div class="reset-instance-content">
        <p class="reset-instance-desc">
          此操作将清除实例 <span class="instance-name">{{ instanceName }}</span> 的所有自定义配置，恢复到默认状态，且不可撤销。请输入实例名称以确认
        </p>
        <div class="confirm-input-wrapper">
          <p class="input-label">请输入实例名称 "{{ instanceName }}" 以确认：</p>
          <n-input
            v-model:value="confirmInput"
            placeholder="请输入实例名称"
            size="medium"
            @keyup.enter="handleConfirm"
          />
        </div>
      </div>
      <div class="reset-instance-actions">
        <n-button size="medium" @click="emit('cancel')">取消</n-button>
        <n-button
          type="error"
          size="medium"
          :disabled="!isConfirmed"
          @click="handleConfirm"
        >
          确认恢复
        </n-button>
      </div>
    </div>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { NModal, NButton, NInput } from 'naive-ui'

const props = defineProps<{
  show: boolean
  instanceName: string
}>()

const emit = defineEmits<{
  cancel: []
  confirm: []
}>()

const confirmInput = ref('')

const isConfirmed = computed(() => {
  return confirmInput.value.trim() === props.instanceName.trim()
})

watch(() => props.show, (newVal) => {
  if (newVal) {
    confirmInput.value = ''
  }
})

function handleConfirm() {
  if (isConfirmed.value) {
    emit('confirm')
  }
}
</script>

<style lang="less" scoped>
.reset-instance-modal {
  background: @bgWhite;
  border-radius: @radiusModal;
  padding: 24px;
  width: 400px;
  max-width: 90vw;
}

.reset-instance-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.reset-instance-icon {
  font-size: 20px;
}

.reset-instance-title {
  font-size: 16px;
  font-weight: 600;
  color: @textColorTitle;
}

.reset-instance-content {
  margin-bottom: 20px;
}

.reset-instance-desc {
  font-size: 14px;
  color: @textColorSecondary;
  margin-bottom: 16px;
  line-height: 1.5;
}

.instance-name {
  font-weight: 600;
  color: @textColorTitle;
}

.confirm-input-wrapper {
  .input-label {
    font-size: 13px;
    color: @textColorSecondary;
    margin-bottom: 8px;
  }
}

.reset-instance-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
