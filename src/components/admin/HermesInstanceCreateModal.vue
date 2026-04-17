<template>
  <n-modal
    :show="show"
    :mask-closable="view === 'form'"
    @update:show="(val: boolean) => !val && handleClose(false)"
  >
    <div class="create-modal">
      <div class="modal-header">
        <h2 class="modal-title">
          <template v-if="view === 'progress'">正在创建 Hermes 实例...</template>
          <template v-else-if="view === 'success'">创建完成</template>
          <template v-else>创建 Hermes 实例</template>
        </h2>
        <p v-if="view === 'form'" class="modal-subtitle">一键接入飞书，创建预计耗时 1 分钟。</p>
        <n-button
          v-if="view === 'form'"
          quaternary
          circle
          size="small"
          class="modal-close"
          @click="handleClose(false)"
        >
          ✕
        </n-button>
      </div>

      <div v-if="view === 'form'" class="modal-body">
        <div class="form-group">
          <label class="form-label">设置实例名</label>
          <n-input
            v-model:value="form.name"
            placeholder="请输入实例名称"
            :maxlength="30"
            show-count
            :disabled="submitting"
          />
        </div>

        <div class="form-group">
          <label class="form-label">配置飞书渠道</label>
          <p class="form-hint" style="margin-top: 12px">
            填写飞书机器人信息（选填）
          </p>
          <label class="form-label-light" style="margin-top: 12px">应用 ID (App ID)</label>
          <n-input
            v-model:value="form.appId"
            placeholder="请输入 App ID"
            :disabled="submitting"
            style="margin-bottom: 8px"
          />
          <label class="form-label-light">应用密钥 (App Secret)</label>
          <n-input
            v-model:value="form.appSecret"
            type="password"
            show-password-on="click"
            placeholder="请输入 App Secret"
            :disabled="submitting || !form.appId"
          />
        </div>

        <div class="avatar-grid">
          <div
            v-for="(avatar, index) in avatarList"
            :key="avatar"
            :data-testid="`hermes-avatar-${index}`"
            class="avatar-item"
            :class="{ selected: form.avatarUrl === avatar }"
            @click="form.avatarUrl = avatar"
          >
            <n-avatar :size="48" :src="avatar" round />
          </div>
        </div>

        <n-alert v-if="errorMsg" type="error" :title="errorMsg" style="margin-top: 12px" />
      </div>

      <div v-else-if="view === 'progress'" class="modal-body">
        <div class="steps">
          <div
            v-for="(step, index) in adminStore.hermesCreateProgress"
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
                v-if="index < adminStore.hermesCreateProgress.length - 1"
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
      </div>

      <div v-else-if="view === 'success'" class="modal-body">
        <div class="success-view">
          <div class="success-icon">✓</div>
          <div class="success-title">Hermes 实例创建成功</div>
          <div class="success-name">{{ form.name }}</div>
          <n-alert
            v-if="feishuPending"
            type="warning"
            title="飞书连接待配置，可在实例详情中完成"
            style="margin-top: 16px"
          />
        </div>
      </div>

      <div class="modal-footer">
        <template v-if="view === 'form'">
          <n-button
            type="primary"
            size="large"
            block
            :disabled="!isValid || submitting"
            :loading="submitting"
            @click="handleSubmit"
          >
            创建
          </n-button>
          <p class="form-hint skip-link" @click="handleSkipAndCreate">
            跳过机器人配置，先直接创建实例
          </p>
        </template>
        <template v-else-if="view === 'progress'">
          <n-button v-if="hasError" type="primary" block @click="handleRetry">重试</n-button>
          <n-button v-else block disabled loading>创建中...</n-button>
        </template>
        <template v-else-if="view === 'success'">
          <n-button type="primary" block @click="handleDone">完成</n-button>
        </template>
      </div>
    </div>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { NModal, NInput, NButton, NAvatar, NAlert } from 'naive-ui'
import { useAdminStore } from '@/stores/admin'
import { avatarList } from '@/mocks/data'

const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  'update:show': [value: boolean]
  success: []
}>()

const adminStore = useAdminStore()
const submitting = ref(false)
const errorMsg = ref('')
const view = ref<'form' | 'progress' | 'success'>('form')

const form = reactive({
  name: '',
  avatarUrl: '',
  appId: '',
  appSecret: '',
})

watch(() => props.show, (newShow) => {
  if (newShow && !form.avatarUrl && avatarList.length > 0) {
    form.avatarUrl = avatarList[0]
  }
})

const isValid = computed(() => form.name.trim().length > 0 && form.avatarUrl !== '')

const hasError = computed(() =>
  adminStore.hermesCreateProgress.some((s) => s.status === 'error'),
)

const feishuPending = computed(() => {
  const feishu = adminStore.hermesCreateProgress.find((s) => s.key === 'feishu')
  return feishu?.note === '待配置'
})

async function doCreate() {
  submitting.value = true
  errorMsg.value = ''

  const result = await adminStore.createHermesInstance({
    name: form.name.trim(),
    avatarUrl: form.avatarUrl,
    appId: form.appId.trim() || undefined,
    appSecret: form.appSecret.trim() || undefined,
  })

  submitting.value = false

  if (result.ok && result.id) {
    view.value = 'progress'
    adminStore.startHermesProgressPolling(result.id, !!(form.appId.trim() && form.appSecret.trim()))
    const checkDone = setInterval(() => {
      if (adminStore.hermesCreateProgressDone) {
        clearInterval(checkDone)
        view.value = 'success'
      }
    }, 200)
  } else {
    errorMsg.value = result.error || '创建失败，请稍后重试'
  }
}

async function handleSubmit() {
  if (!isValid.value) return
  await doCreate()
}

function handleSkipAndCreate() {
  if (!form.name.trim() || !form.avatarUrl) return
  form.appId = ''
  form.appSecret = ''
  doCreate()
}

function handleRetry() {
  adminStore.stopHermesProgressPolling()
  view.value = 'form'
}

function handleDone() {
  emit('success')
  handleClose(false)
}

function handleClose(val: boolean) {
  if (view.value === 'progress' && !hasError.value) return
  adminStore.stopHermesProgressPolling()
  view.value = 'form'
  form.name = ''
  form.avatarUrl = ''
  form.appId = ''
  form.appSecret = ''
  errorMsg.value = ''
  emit('update:show', val)
}
</script>

<style lang="less" scoped>
.create-modal {
  background: @bgWhite;
  border-radius: @radiusModal;
  padding: 24px;
  width: 480px;
  max-width: 90vw;
  position: relative;
}

.modal-header { margin-bottom: 20px; }
.modal-title { font-size: 18px; font-weight: 600; color: @textColorTitle; }
.modal-subtitle { font-size: 12px; color: @textColorPlaceholder; margin-top: 4px; }
.modal-close { position: absolute; top: 16px; right: 16px; }
.modal-body { margin-bottom: 20px; }
.modal-footer { margin-top: 4px; }

.form-group { margin-bottom: 16px; }
.form-label {
  font-size: 14px; font-weight: 600; color: @textColorTitle;
  margin-bottom: 8px; display: block;
}
.form-label-light {
  font-size: 14px; font-weight: 400; color: @textColorBody;
  margin-bottom: 8px; display: block;
}
.form-hint {
  font-size: 12px; color: @textColorPlaceholder; margin-bottom: 8px;
}

.avatar-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 12px;
  margin-top: 12px;
}

.avatar-item {
  cursor: pointer;
  border-radius: 50%;
  padding: 2px;
  border: 2px solid transparent;
  transition: border-color 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover { border-color: @primaryColorHover; }
  &.selected { border-color: @primaryColor; }
}

.skip-link {
  text-align: center;
  margin-top: 12px;
  cursor: pointer;
  text-decoration: underline;
  text-decoration-style: dashed;
  text-underline-offset: 2px;
  transition: color 0.2s ease;

  &:hover { color: @primaryColor; text-decoration-style: solid; }
}

.steps { padding: 8px 0; }
.step-item { display: flex; gap: 12px; }
.step-indicator {
  display: flex; flex-direction: column; align-items: center;
  width: 24px; flex-shrink: 0;
}

.step-icon {
  width: 24px; height: 24px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; border: 2px solid @borderColor;
  color: @textColorPlaceholder;
}

.step-pending { border-color: @borderColor; color: @textColorPlaceholder; }
.step-running { border-color: @primaryColor; color: @primaryColor; }
.step-done { border-color: @successColor; background: @successColor; color: white; }
.step-error { border-color: @errorColor; background: @errorColor; color: white; }

.step-line { width: 2px; height: 36px; background: @borderColor; }
.step-line-done { background: @successColor; }

.step-content {
  display: flex; align-items: center; gap: 8px; flex: 1;
  min-height: 56px; padding-top: 2px;
}

.step-label { font-size: 14px; color: @textColorBody; }
.step-label-error { color: @errorColor; }
.step-note { font-size: 12px; color: @warningColor; font-style: italic; }
.step-elapsed { font-size: 12px; color: @textColorPlaceholder; margin-left: auto; }

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinner { display: inline-block; animation: spin 1s linear infinite; }

.success-view {
  display: flex; flex-direction: column; align-items: center;
  padding: 24px 0; gap: 8px;
}

.success-icon {
  width: 56px; height: 56px; border-radius: 50%;
  background: @successColor; color: white; font-size: 28px;
  display: flex; align-items: center; justify-content: center;
}

.success-title { font-size: 16px; font-weight: 600; color: @textColorTitle; margin-top: 8px; }
.success-name { font-size: 14px; color: @textColorPlaceholder; }
</style>
