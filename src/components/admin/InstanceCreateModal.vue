<template>
  <n-modal
    :show="show"
    preset="card"
    :title="modalTitle"
    style="width: 480px"
    :mask-closable="view === 'form'"
    :closable="view === 'form'"
    @update:show="handleClose"
  >
    <!-- 表单视图 -->
    <template v-if="view === 'form'">
      <n-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-placement="left"
        label-width="80"
      >
        <n-form-item label="实例名称" path="name">
          <n-input
            v-model:value="form.name"
            placeholder="请输入实例名称（2-50字符）"
            :maxlength="50"
            show-count
            :disabled="submitting"
          />
        </n-form-item>
        <n-form-item label="目标用户" path="ownerId">
          <UserSelect
            v-model="form.ownerId"
            :disabled="submitting"
          />
        </n-form-item>
        <n-form-item label="飞书 AppID">
          <n-input
            v-model:value="form.appId"
            placeholder="可选，创建后可在实例详情中配置"
            :disabled="submitting"
          />
        </n-form-item>
        <n-form-item label="AppSecret">
          <n-input
            v-model:value="form.appSecret"
            type="password"
            show-password-on="click"
            placeholder="可选，填写 AppID 后配置"
            :disabled="submitting || !form.appId"
          />
        </n-form-item>
      </n-form>
      <n-alert v-if="errorMsg" type="error" :title="errorMsg" style="margin-top: 12px" />
    </template>

    <!-- 进度视图 -->
    <template v-else-if="view === 'progress'">
      <div class="steps">
        <div
          v-for="(step, index) in adminStore.createProgress"
          :key="step.key"
          class="step-item"
        >
          <div class="step-indicator">
            <div
              class="step-icon"
              :class="{
                'step-pending': step.status === 'pending',
                'step-running': step.status === 'running',
                'step-done': step.status === 'done',
                'step-error': step.status === 'error',
              }"
            >
              <span v-if="step.status === 'done'">✓</span>
              <span v-else-if="step.status === 'error'">✕</span>
              <span v-else-if="step.status === 'running'" class="spinner">◌</span>
              <span v-else>○</span>
            </div>
            <div
              v-if="index < adminStore.createProgress.length - 1"
              class="step-line"
              :class="{ 'step-line-done': step.status === 'done' }"
            />
          </div>
          <div class="step-content">
            <span class="step-label" :class="{ 'step-label-error': step.status === 'error' }">
              {{ step.label }}
            </span>
            <span v-if="step.note" class="step-note">（{{ step.note }}）</span>
            <span v-if="step.elapsed" class="step-elapsed">{{ step.elapsed }} s</span>
          </div>
        </div>
      </div>
    </template>

    <!-- 成功视图 -->
    <template v-else-if="view === 'success'">
      <div class="success-view">
        <div class="success-icon">✓</div>
        <div class="success-title">实例创建成功</div>
        <div class="success-name">{{ form.name }}</div>
        <n-alert
          v-if="feishuPending"
          type="warning"
          title="飞书连接待配置，可在实例详情中完成"
          style="margin-top: 16px"
        />
      </div>
    </template>

    <template #footer>
      <!-- 表单操作 -->
      <div v-if="view === 'form'" class="modal-footer">
        <n-button :disabled="submitting" @click="handleClose(false)">取消</n-button>
        <n-button type="primary" :loading="submitting" @click="handleSubmit">创建</n-button>
      </div>
      <!-- 进度中操作 -->
      <div v-else-if="view === 'progress'" class="modal-footer">
        <n-button v-if="hasError" type="primary" @click="handleRetry">重试</n-button>
        <n-button v-else disabled loading>创建中...</n-button>
      </div>
      <!-- 成功操作 -->
      <div v-else-if="view === 'success'" class="modal-footer">
        <n-button type="primary" @click="handleDone">查看实例</n-button>
      </div>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { NModal, NForm, NFormItem, NInput, NButton, NAlert } from 'naive-ui'
import type { FormInst, FormRules } from 'naive-ui'
import { useAdminStore } from '@/stores/admin'
import UserSelect from './UserSelect.vue'

defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  'update:show': [value: boolean]
  success: []
}>()

const adminStore = useAdminStore()
const formRef = ref<FormInst | null>(null)
const submitting = ref(false)
const errorMsg = ref('')
const view = ref<'form' | 'progress' | 'success'>('form')

const form = reactive({
  name: '',
  ownerId: undefined as string | undefined,
  appId: '',
  appSecret: '',
})

const rules: FormRules = {
  name: [
    { required: true, message: '请输入实例名称', trigger: 'blur' },
    { min: 2, max: 50, message: '名称长度为 2-50 字符', trigger: 'blur' },
  ],
  ownerId: [
    { required: true, message: '请选择目标用户', trigger: 'change' },
  ],
}

const modalTitle = computed(() => {
  if (view.value === 'progress') return '正在创建实例...'
  if (view.value === 'success') return '创建完成'
  return '创建实例'
})

const hasError = computed(() =>
  adminStore.createProgress.some((s) => s.status === 'error'),
)

const feishuPending = computed(() => {
  const feishu = adminStore.createProgress.find((s) => s.key === 'feishu')
  return feishu?.note === '待配置'
})

async function handleSubmit() {
  try {
    await formRef.value?.validate()
  } catch {
    return
  }

  submitting.value = true
  errorMsg.value = ''

  const result = await adminStore.createInstance({
    name: form.name,
    ownerId: form.ownerId!,
    appId: form.appId || undefined,
    appSecret: form.appSecret || undefined,
  })

  submitting.value = false

  if (result.ok && result.id) {
    view.value = 'progress'
    adminStore.startProgressPolling(result.id, !!(form.appId && form.appSecret))
    // 监听完成
    const checkDone = setInterval(() => {
      if (adminStore.createProgressDone) {
        clearInterval(checkDone)
        view.value = 'success'
      }
    }, 200)
  } else {
    errorMsg.value = result.error || '创建失败，请稍后重试'
  }
}

function handleRetry() {
  adminStore.stopProgressPolling()
  view.value = 'form'
}

function handleDone() {
  emit('success')
  handleClose(false)
}

function handleClose(val: boolean) {
  if (view.value === 'progress' && !hasError.value) return
  adminStore.stopProgressPolling()
  view.value = 'form'
  form.name = ''
  form.ownerId = undefined
  form.appId = ''
  form.appSecret = ''
  errorMsg.value = ''
  emit('update:show', val)
}
</script>

<style lang="less" scoped>
.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.steps {
  padding: 8px 0;
}

.step-item {
  display: flex;
  gap: 12px;
}

.step-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 24px;
  flex-shrink: 0;
}

.step-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  border: 2px solid @borderColor;
  color: @textColorPlaceholder;
}

.step-pending { border-color: @borderColor; color: @textColorPlaceholder; }
.step-running { border-color: @primaryColor; color: @primaryColor; }
.step-done { border-color: @successColor; background: @successColor; color: white; }
.step-error { border-color: @errorColor; background: @errorColor; color: white; }

.step-line {
  width: 2px;
  height: 36px;
  background: @borderColor;
}

.step-line-done {
  background: @successColor;
}

.step-content {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-height: 56px;
  padding-top: 2px;
}

.step-label {
  font-size: 14px;
  color: @textColorBody;
}

.step-label-error {
  color: @errorColor;
}

.step-note {
  font-size: 12px;
  color: @warningColor;
  font-style: italic;
}

.step-elapsed {
  font-size: 12px;
  color: @textColorPlaceholder;
  margin-left: auto;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinner {
  display: inline-block;
  animation: spin 1s linear infinite;
}

.success-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 0;
  gap: 8px;
}

.success-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: @successColor;
  color: white;
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.success-title {
  font-size: 16px;
  font-weight: 600;
  color: @textColorTitle;
  margin-top: 8px;
}

.success-name {
  font-size: 14px;
  color: @textColorPlaceholder;
}
</style>
