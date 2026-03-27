<template>
  <n-popover trigger="click" placement="bottom-end" :width="360">
    <template #trigger>
      <n-button type="primary" :size="size">
        <template #icon><span>🤖</span></template>
        去对话
      </n-button>
    </template>

    <div class="bot-info-dropdown">
      <div class="info-row">
        <span class="info-label">机器人名称</span>
        <span class="info-value">{{ displayBotName }}</span>
      </div>

      <!-- 查看模式 -->
      <template v-if="!isEditing">
        <div class="info-row">
          <span class="info-label">App ID</span>
          <div class="info-editable">
            <span class="info-value">{{ project.appId || '未配置' }}</span>
          </div>
        </div>

        <div class="info-row">
          <span class="info-label">App Secret</span>
          <div class="info-editable">
            <span class="info-value">{{ project.appId ? '••••••••' : '未配置' }}</span>
          </div>
        </div>
      </template>

      <!-- 编辑模式 -->
      <template v-else>
        <!-- 没有机器人时的引导 -->
        <div v-if="!project.appId" class="info-row empty-bot-guide">
          <span class="guide-text">没有机器人?<a href="https://www.feishu.cn/invitation/page/add_contact/?token=5a6r88f7-ecea-41fc-8b04-83c9e0c97240&unique_id=ziH9F8eSCNUbK0VkAMJEOg==" target="_blank" rel="noopener noreferrer" class="guide-link">点击申请机器人</a></span>
        </div>

        <div class="info-row edit-mode">
          <span class="info-label">App ID</span>
          <n-input
            v-model:value="editValues.appId"
            placeholder="请输入 App ID"
            size="small"
            :status="errors.appId ? 'error' : undefined"
            data-testid="edit-app-id-input"
          />
        </div>
        <div v-if="errors.appId" class="error-message">
          {{ errors.appId }}
        </div>

        <div class="info-row edit-mode">
          <span class="info-label">App Secret</span>
          <n-input
            v-model:value="editValues.secret"
            type="password"
            show-password-on="click"
            placeholder="请输入 App Secret"
            size="small"
            :status="errors.secret ? 'error' : undefined"
            data-testid="edit-secret-input"
          />
        </div>
        <div v-if="errors.secret" class="error-message">
          {{ errors.secret }}
        </div>

        <div class="info-row edit-actions">
          <n-button size="small" :loading="isSaving" type="primary" @click="saveCredentials">
            保存
          </n-button>
          <n-button size="small" @click="cancelEdit">取消</n-button>
        </div>
      </template>

      <div class="info-row">
        <span class="info-label">状态</span>
        <n-tag :type="project.appId ? 'success' : 'warning'" size="small" round>
          {{ project.appId ? '已连接' : '待配置' }}
        </n-tag>
      </div>

      <div class="info-row">
        <span class="info-label">创建时间</span>
        <span class="info-value">{{ project.createdAt }}</span>
      </div>

      <!-- 查看模式下显示底部操作按钮 -->
      <div v-if="!isEditing" class="dropdown-footer">
        <div class="footer-actions">
          <n-button size="small" @click="startEdit">
            <template #icon><span>✏️</span></template>
            配置机器人
          </n-button>
          <n-button v-if="project.feishuChatUrl" size="small" @click="handleOpenChat">
            前往飞书对话
          </n-button>
        </div>
      </div>
    </div>
  </n-popover>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { NPopover, NButton, NInput, NTag, useMessage } from 'naive-ui'
import { useProjectStore } from '@/stores/project'
import { mockUser } from '@/mocks/data'

const store = useProjectStore()
const message = useMessage()

// 计算显示的机器人名称
const displayBotName = computed(() => {
  if (props.project.botName) {
    return props.project.botName
  }
  return `${mockUser.name} 的 openclaw`
})

const props = withDefaults(defineProps<{
  project: { id: string; botName: string; appId?: string; feishuChatUrl?: string; createdAt: string }
  size?: 'small' | 'medium'
}>(), {
  size: 'medium'
})

const isEditing = ref(false)
const isSaving = ref(false)
const editValues = reactive({ appId: '', secret: '' })
const errors = reactive({ appId: '', secret: '' })

function startEdit() {
  isEditing.value = true
  editValues.appId = props.project.appId ?? ''
  editValues.secret = ''
  clearErrors()
}

function cancelEdit() {
  isEditing.value = false
  clearErrors()
}

function clearErrors() {
  errors.appId = ''
  errors.secret = ''
}

function validateAppId(appId: string): string | null {
  if (!appId.trim()) {
    return 'App ID 不能为空'
  }
  // Feishu App ID 通常以 cli_ 开头
  if (!appId.match(/^cli_[a-zA-Z0-9]+$/)) {
    return 'App ID 格式不正确，应以 cli_ 开头'
  }
  return null
}

function validateSecret(secret: string): string | null {
  if (!secret.trim()) {
    return 'App Secret 不能为空'
  }
  if (secret.length < 8) {
    return 'App Secret 长度不能少于 8 位'
  }
  return null
}

function validateForm(): boolean {
  clearErrors()
  let isValid = true

  const appIdError = validateAppId(editValues.appId)
  if (appIdError) {
    errors.appId = appIdError
    isValid = false
  }

  const secretError = validateSecret(editValues.secret)
  if (secretError) {
    errors.secret = secretError
    isValid = false
  }

  return isValid
}

async function saveCredentials() {
  if (!validateForm()) return

  isSaving.value = true
  const success = await store.updateBotConfig({
    appId: editValues.appId.trim(),
    appSecret: editValues.secret.trim(),
  })
  isSaving.value = false

  if (success) {
    message.success('机器人凭证已更新')
    isEditing.value = false
    clearErrors()
  } else {
    message.error('保存失败，请重试')
  }
}

function handleOpenChat() {
  if (props.project.feishuChatUrl) {
    window.open(props.project.feishuChatUrl, '_blank')
  }
}
</script>

<style lang="less" scoped>
.bot-info-dropdown {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid @borderColor;

  &:last-of-type {
    border-bottom: none;
  }
}

.info-label {
  font-size: 13px;
  color: @textColorSecondary;
  flex-shrink: 0;
}

.info-value {
  font-size: 13px;
  font-weight: 500;
  color: @textColorTitle;
}

.info-editable {
  display: flex;
  align-items: center;
  gap: 6px;
}

.edit-icon {
  cursor: pointer;
  font-size: 12px;
  opacity: 0.5;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
}

.info-edit-group {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1;
  max-width: 220px;
}

.dropdown-footer {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid @borderColor;
}

.footer-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-start;

  .n-button {
    flex: 1;
  }
}

.edit-actions {
  justify-content: flex-end;
  gap: 8px;
  padding: 8px 0;
}

.edit-mode {
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  padding: 4px 0;

  .info-label {
    margin-bottom: 2px;
  }

  :deep(.n-input) {
    width: 100%;
  }
}

.error-message {
  font-size: 12px;
  color: #d03050;
  padding-left: 0;
  margin-top: -4px;
  margin-bottom: 4px;
}

.empty-bot-guide {
  justify-content: center;
  padding: 12px 0;
  background: fade(@primaryColor, 4%);
  border-radius: 6px;
  margin-bottom: 8px;

  .guide-text {
    font-size: 13px;
    color: @textColorSecondary;
  }

  .guide-link {
    color: @primaryColor;
    text-decoration: none;
    margin-left: 4px;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
