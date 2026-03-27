<template>
  <n-modal
    :show="show"
    :mask-closable="false"
    @update:show="(val: boolean) => !val && emit('cancel')"
  >
    <div class="delete-modal">
      <div class="delete-header">
        <span class="delete-icon">🗑️</span>
        <h3 class="delete-title">删除镜像</h3>
      </div>
      <div class="delete-content">
        <p class="delete-desc">
          此操作将永久删除镜像 <span class="image-name">{{ imageName }}</span>，删除后无法恢复。
        </p>
        <div class="confirm-input-wrapper">
          <p class="input-label">请输入镜像名称 "{{ imageName }}" 以确认删除：</p>
          <n-input
            v-model:value="confirmInput"
            placeholder="请输入镜像名称"
            size="medium"
            @keyup.enter="handleConfirm"
          />
        </div>
      </div>
      <div class="delete-actions">
        <n-button size="medium" @click="emit('cancel')">取消</n-button>
        <n-button
          type="error"
          size="medium"
          :disabled="!isConfirmed"
          @click="handleConfirm"
        >
          确认删除
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
  imageName: string
}>()

const emit = defineEmits<{
  cancel: []
  confirm: []
}>()

const confirmInput = ref('')

const isConfirmed = computed(() => {
  return confirmInput.value.trim() === props.imageName.trim()
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
.delete-modal {
  background: @bgWhite;
  border-radius: @radiusModal;
  padding: 24px;
  width: 400px;
  max-width: 90vw;
}

.delete-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.delete-icon {
  font-size: 20px;
}

.delete-title {
  font-size: 16px;
  font-weight: 600;
  color: @textColorTitle;
}

.delete-content {
  margin-bottom: 20px;
}

.delete-desc {
  font-size: 14px;
  color: @textColorSecondary;
  margin-bottom: 16px;
  line-height: 1.5;
}

.image-name {
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

.delete-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
