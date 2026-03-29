<template>
  <n-modal :show="show" :mask-closable="true">
    <div class="login-modal">
      <n-button quaternary circle size="small" class="modal-close" @click="handleClose">✕</n-button>
      <div class="login-header">
        <span class="login-icon">🔐</span>
        <h3 class="login-title">域账号登录</h3>
      </div>

      <n-form ref="formRef" :model="form" :disabled="authStore.isLoading">
        <n-form-item path="username" label="用户名">
          <n-input
            v-model:value="form.username"
            placeholder="san.zhang"
            :disabled="authStore.isLoading"
            @keyup.enter="handleSubmit"
          />
        </n-form-item>
        <n-form-item path="password" label="密码">
          <n-input
            v-model:value="form.password"
            type="password"
            show-password-on="click"
            placeholder="password"
            :disabled="authStore.isLoading"
            @keyup.enter="handleSubmit"
          />
        </n-form-item>
      </n-form>

      <div v-if="errorMessage" class="login-error">
        {{ errorMessage }}
      </div>

      <n-button
        type="primary"
        block
        :loading="authStore.isLoading"
        :disabled="!canSubmit"
        class="login-submit"
        @click="handleSubmit"
      >
        登录
      </n-button>

      <p class="login-hint">使用域账号登录，支持格式: san.zhang / password</p>
    </div>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { NModal, NForm, NFormItem, NInput, NButton } from 'naive-ui'
import { useAuthStore } from '@/stores/auth'

defineProps<{ show: boolean }>()
const emit = defineEmits<{ close: [] }>()

const authStore = useAuthStore()

const form = ref({ username: '', password: '' })
const errorMessage = ref('')

const canSubmit = computed(() => form.value.username.trim() !== '' && form.value.password.trim() !== '')

function handleClose() {
  form.value = { username: '', password: '' }
  errorMessage.value = ''
  emit('close')
}

async function handleSubmit() {
  if (!canSubmit.value || authStore.isLoading) return
  errorMessage.value = ''
  try {
    await authStore.login(form.value.username.trim(), form.value.password)
    form.value = { username: '', password: '' }
  } catch {
    form.value.password = ''
    errorMessage.value = '用户名或密码错误'
  }
}
</script>

<style lang="less" scoped>
.login-modal {
  background: @bgWhite;
  border-radius: @radiusModal;
  padding: 24px;
  width: 480px;
  max-width: 90vw;
  position: relative;
}

.modal-close {
  position: absolute;
  top: 12px;
  right: 12px;
}

.login-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
}

.login-icon {
  font-size: 20px;
}

.login-title {
  font-size: 18px;
  font-weight: 600;
  color: @textColorTitle;
}

.login-error {
  color: @errorColor;
  font-size: 13px;
  margin-bottom: 12px;
}

.login-submit {
  margin-top: 4px;
}

.login-hint {
  font-size: 12px;
  color: @textColorPlaceholder;
  margin-top: 12px;
  text-align: center;
}
</style>
