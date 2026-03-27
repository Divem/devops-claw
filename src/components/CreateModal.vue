<template>
  <n-modal
    :show="show"
    :mask-closable="true"
    @update:show="(val: boolean) => !val && emit('close')"
  >
    <div class="create-modal">
      <div class="modal-header">
        <h2 class="modal-title">创建 OpenClaw 项目</h2>
        <p class="modal-subtitle">一键接入飞书，创建预计耗时 1 分钟。</p>
        <n-button
          quaternary
          circle
          size="small"
          class="modal-close"
          @click="emit('close')"
        >
          ✕
        </n-button>
      </div>

      <div class="modal-body">
        <div class="form-group">
          <label class="form-label">设置项目名</label>
          <n-input
            v-model:value="form.name"
            placeholder="达尔文的项目"
            maxlength="30"
            show-count
          />
        </div>

        <div class="form-group">
          <label class="form-label">配置飞书渠道</label>
<p class="form-hint" style="margin-top: 12px">
            联系管理员，获取飞书机器人信息（选填）
            <a
              class="form-link"
              href="https://openclaw.feishu.cn/home"
              target="_blank"
              rel="noopener noreferrer"
            >申请机器人</a>
          </p>          <label class="form-label-light" style="margin-top: 12px">应用 ID (App ID)</label>
          <n-input
            v-model:value="form.appId"
            placeholder="请输入 App ID"
            style="margin-bottom: 8px"
          />
          <label class="form-label-light">应用密钥 (App Secret)</label>
          <n-input
            v-model:value="form.appSecret"
            type="password"
            show-password-on="click"
            placeholder="请输入 App Secret"
          />
        </div>

        <div class="avatar-grid">
          <div
            v-for="(avatar, index) in avatarList"
            :key="avatar"
            :data-testid="`avatar-${index}`"
            class="avatar-item"
            :class="{ selected: form.avatarUrl === avatar }"
            @click="form.avatarUrl = avatar"
          >
            <n-avatar :size="48" :src="avatar" round />
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <n-button
          type="primary"
          size="large"
          block
          :disabled="!isValid"
          data-testid="submit-btn"
          @click="handleSubmit"
        >
          创建
        </n-button>
        <p
          class="form-hint skip-link"
          style="text-align: center; margin-top: 12px"
          @click="handleSkipAndCreate"
        >
          跳过机器人配置，先直接创建OpenClaw
        </p>
      </div>
    </div>
  </n-modal>
</template>

<script setup lang="ts">
import { reactive, computed, watch } from 'vue'
import { NModal, NInput, NButton, NAvatar } from 'naive-ui'
import { avatarList } from '@/mocks/data'

const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  close: []
  submit: [payload: { name: string; avatarUrl: string; appId?: string; appSecret?: string }]
}>()

const form = reactive({
  name: '',
  avatarUrl: '',
  appId: '',
  appSecret: '',
})

// 当弹框打开时，默认选中第一个头像
watch(() => props.show, (newShow) => {
  if (newShow && !form.avatarUrl && avatarList.length > 0) {
    form.avatarUrl = avatarList[0]
  }
})

const isValid = computed(() => {
  return form.name.trim().length > 0
    && form.avatarUrl !== ''
})

function handleSubmit() {
  if (!isValid.value) return
  const payload: { name: string; avatarUrl: string; appId?: string; appSecret?: string } = {
    name: form.name.trim(),
    avatarUrl: form.avatarUrl,
  }
  if (form.appId.trim()) {
    payload.appId = form.appId.trim()
  }
  if (form.appSecret.trim()) {
    payload.appSecret = form.appSecret.trim()
  }
  emit('submit', payload)
}

function handleSkipAndCreate() {
  // 清空机器人配置
  form.appId = ''
  form.appSecret = ''
  // 直接提交（不包含机器人配置）
  handleSubmit()
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

.modal-header {
  margin-bottom: 20px;
}

.modal-title {
  font-size: 18px;
  font-weight: 600;
  color: @textColorTitle;
}

.modal-subtitle {
  font-size: 12px;
  color: @textColorPlaceholder;
  margin-top: 4px;
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
}

.form-group {
  margin-bottom: 16px;
}

.form-label {
  font-size: 14px;
  font-weight: 600;
  color: @textColorTitle;
  margin-bottom: 8px;
  display: block;
}

.form-label-light {
  font-size: 14px;
  font-weight: 400;
  color: @textColorBody;
  margin-bottom: 8px;
  display: block;
}

.form-hint {
  font-size: 12px;
  color: @textColorPlaceholder;
  margin-bottom: 8px;
}

.form-link {
  color: @primaryColor;
  text-decoration: none;
  margin-left: 4px;

  &:hover {
    text-decoration: underline;
  }
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

  &:hover {
    border-color: @primaryColorHover;
  }

  &.selected {
    border-color: @primaryColor;
  }
}

.modal-footer {
  margin-top: 24px;
}

.skip-link {
  cursor: pointer;
  transition: color 0.2s ease;
  text-decoration: underline;
  text-decoration-style: dashed;
  text-underline-offset: 2px;

  &:hover {
    color: @primaryColor;
    text-decoration-style: solid;
  }
}
</style>
