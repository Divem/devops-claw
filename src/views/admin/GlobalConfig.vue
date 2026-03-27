<template>
  <div class="global-config">
    <div class="page-header">
      <h1 class="page-title">全局配置</h1>
      <p class="page-desc">统一管理所有实例的模型参数、引导文件，并批量下发配置。</p>
    </div>

    <n-spin :show="store.isLoading">
      <div class="config-layout">
        <!-- 上：模型配置 -->
        <div class="config-section">
          <h2 class="section-title">模型配置</h2>
          <div class="model-form-grid">
            <div class="form-row">
              <label class="form-label">供应商</label>
              <n-select
                v-model:value="form.model.provider"
                :options="providerOptions"
                style="width: 200px"
              />
            </div>

            <div class="form-row">
              <label class="form-label">API Key</label>
              <div class="api-key-field">
                <template v-if="!editingApiKey">
                  <n-input
                    :value="maskedApiKey"
                    readonly
                    style="flex: 1"
                    placeholder="未配置"
                  />
                  <n-button size="small" @click="startEditApiKey">更新</n-button>
                </template>
                <template v-else>
                  <n-input
                    v-model:value="newApiKey"
                    type="password"
                    show-password-on="click"
                    style="flex: 1"
                    placeholder="输入新的 API Key"
                  />
                  <n-button size="small" type="primary" @click="confirmApiKey">确认</n-button>
                  <n-button size="small" @click="cancelEditApiKey">取消</n-button>
                </template>
              </div>
            </div>

            <div class="form-row" v-if="form.model.provider === 'custom'">
              <label class="form-label">Base URL</label>
              <n-input v-model:value="form.model.baseUrl" placeholder="https://api.example.com/v1" />
            </div>

            <div class="form-row">
              <label class="form-label">默认模型</label>
              <n-input v-model:value="form.model.defaultModel" placeholder="claude-sonnet-4-6" />
            </div>

            <div class="form-row">
              <label class="form-label">最大 Token</label>
              <n-input-number
                v-model:value="form.model.maxTokens"
                :min="256"
                :max="200000"
                :step="256"
                style="width: 160px"
              />
            </div>

            <div class="form-row">
              <label class="form-label">温度</label>
              <n-input-number
                v-model:value="form.model.temperature"
                :min="0"
                :max="2"
                :step="0.1"
                :precision="1"
                style="width: 120px"
              />
            </div>
          </div>
        </div>

        <!-- 下：文件管理（左右分栏） -->
        <div class="config-section file-section">
          <div class="file-section-header">
            <h2 class="section-title">文件管理</h2>
            <span class="file-section-desc">管理 OpenClaw 实例的引导文件，支持上传更新。文件将在发布配置后下发给实例。</span>
          </div>

          <div class="file-split">
            <!-- 左：文件列表 -->
            <div class="file-list-panel">
              <div
                v-for="file in configFiles"
                :key="file.name"
                class="file-item"
                :class="{ active: activeFile?.name === file.name }"
                @click="activeFile = file"
              >
                <div class="file-icon">
                  <svg v-if="file.type === 'folder'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                  </svg>
                  <svg v-else viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                </div>
                <div class="file-info">
                  <span class="file-name">{{ file.name }}</span>
                  <span class="file-desc">{{ file.desc }}</span>
                </div>
                <span v-if="file.content" class="file-status configured">已配置</span>
                <span v-else class="file-status empty">未配置</span>
              </div>
            </div>

            <!-- 右：文件预览/编辑 -->
            <div class="file-preview-panel">
              <div class="file-preview-toolbar">
                <n-upload
                  :custom-request="handleUpload"
                  :show-file-list="false"
                  accept=".md"
                >
                  <n-button size="small" type="primary">上传文件</n-button>
                </n-upload>
                <template v-if="activeFile && activeFile.type === 'file'">
                  <n-upload
                    :custom-request="(args: any) => handleUploadSingle(args, activeFile!)"
                    :show-file-list="false"
                    accept=".md"
                  >
                    <n-button size="small" quaternary>上传更新</n-button>
                  </n-upload>
                  <n-button size="small" quaternary type="error" @click="clearFile(activeFile)">清空</n-button>
                </template>
              </div>
              <div class="file-preview-body">
                <template v-if="activeFile && activeFile.type === 'file'">
                  <n-input
                    v-model:value="activeFile.content"
                    type="textarea"
                    :placeholder="`在此编辑 ${activeFile.name} 的内容...`"
                    :autosize="{ minRows: 6, maxRows: 16 }"
                    @update:value="markFileDirty(activeFile)"
                  />
                </template>
                <template v-else-if="activeFile && activeFile.type === 'folder'">
                  <div class="folder-hint">
                    <p>{{ activeFile.name }} 是目录文件，不支持直接编辑。请上传 .md 文件进行更新。</p>
                  </div>
                </template>
                <template v-else>
                  <div class="empty-preview">
                    <p>点击左侧文件进行预览和编辑</p>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>

        <!-- 底部操作栏 -->
        <div class="form-actions">
          <n-button
            type="primary"
            :loading="store.isSaving"
            @click="handleSave"
          >
            保存配置
          </n-button>
          <n-button @click="drawerVisible = true">
            发布配置
          </n-button>
          <span v-if="store.lastSavedAt" class="saved-hint">
            已保存于 {{ formatTime(store.lastSavedAt) }}
          </span>
        </div>
      </div>
    </n-spin>

    <!-- 发布配置抽屉 -->
    <n-drawer v-model:show="drawerVisible" :width="drawerWidth" placement="right">
      <n-drawer-content title="发布配置">
        <div class="drawer-body">
          <div class="config-section">
            <h2 class="section-title">应用范围</h2>

            <n-radio-group v-model:value="publishScope" class="scope-group">
              <n-radio value="all">全部实例</n-radio>
              <n-radio value="running">仅运行中</n-radio>
              <n-radio value="stopped">仅已停止</n-radio>
              <n-radio value="selected">指定实例</n-radio>
            </n-radio-group>

            <div v-if="publishScope === 'selected'" class="instance-selector">
              <n-select
                v-model:value="selectedInstanceIds"
                :options="instanceOptions"
                multiple
                filterable
                placeholder="搜索并选择实例"
                :max-tag-count="3"
              />
            </div>

            <div class="scope-count">
              预计影响 <strong>{{ affectedCount }}</strong> 台实例
            </div>

            <n-alert
              v-if="showStoppedWarning"
              type="warning"
              :show-icon="true"
              style="margin-top: 12px"
            >
              {{ stoppedCount }} 台已停止实例将在下次启动时生效
            </n-alert>
          </div>

          <div class="config-section">
            <h2 class="section-title">生效策略</h2>

            <n-radio-group v-model:value="publishStrategy" class="strategy-group">
              <div class="strategy-item">
                <n-radio value="force">强制生效</n-radio>
                <span class="strategy-desc">立即覆盖所有运行中实例的配置</span>
              </div>
              <div class="strategy-item">
                <n-radio value="conditional">
                  条件生效
                  <n-tooltip trigger="hover">
                    <template #trigger>
                      <span class="info-icon">ⓘ</span>
                    </template>
                    当前所有实例无本地覆盖配置，MVP 阶段效果等同于强制生效
                  </n-tooltip>
                </n-radio>
                <span class="strategy-desc">仅对无本地覆盖的实例生效</span>
              </div>
              <div class="strategy-item">
                <n-radio value="restart">下次启动生效</n-radio>
                <span class="strategy-desc">实例下次启动时自动拉取应用</span>
              </div>
            </n-radio-group>
          </div>
        </div>

        <template #footer>
          <n-button
            type="primary"
            block
            size="large"
            :loading="store.isPublishing"
            @click="handlePublishClick"
          >
            发布配置
          </n-button>
        </template>
      </n-drawer-content>
    </n-drawer>

    <!-- 发布确认弹框 -->
    <n-modal v-model:show="confirmVisible" :mask-closable="false">
      <div class="confirm-modal">
        <h3 class="confirm-title">确认发布配置</h3>

        <div class="confirm-info">
          <div class="confirm-row">
            <span class="confirm-label">生效策略</span>
            <span class="confirm-value">{{ strategyLabels[publishStrategy] }}</span>
          </div>
          <div class="confirm-row">
            <span class="confirm-label">应用范围</span>
            <span class="confirm-value">{{ scopeLabels[publishScope] }}</span>
          </div>
          <div class="confirm-row">
            <span class="confirm-label">影响实例数</span>
            <span class="confirm-value"><strong>{{ affectedCount }}</strong> 台</span>
          </div>
          <n-alert v-if="showStoppedWarning" type="warning" :show-icon="true" style="margin-top: 8px">
            其中 {{ stoppedCount }} 台已停止实例将自动降级为「下次启动生效」
          </n-alert>
        </div>

        <div class="confirm-actions">
          <n-button @click="confirmVisible = false">取消</n-button>
          <n-button type="primary" :loading="store.isPublishing" @click="handleConfirmPublish">
            确认发布
          </n-button>
        </div>
      </div>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'
import {
  NButton, NSpin, NInput, NInputNumber, NSelect,
  NRadio, NRadioGroup, NAlert, NTooltip, NModal, NDrawer, NDrawerContent,
  NUpload,
} from 'naive-ui'
import { useGlobalConfigStore } from '@/stores/globalConfig'
import { useAdminStore } from '@/stores/admin'
import type { ConfigPublishStrategy, ConfigPublishScope } from '@/types/admin'
import type { UploadCustomRequestOptions } from 'naive-ui'

const store = useGlobalConfigStore()
const adminStore = useAdminStore()

// 抽屉宽度 40%
const drawerWidth = computed(() => window.innerWidth * 0.4)

// 表单数据
const form = reactive({
  model: {
    provider: 'anthropic' as 'anthropic' | 'openai' | 'deepseek' | 'custom',
    apiKey: '',
    baseUrl: '',
    defaultModel: 'claude-sonnet-4-6',
    maxTokens: 8192,
    temperature: 0.7,
  },
})

// API Key 编辑状态
const editingApiKey = ref(false)
const newApiKey = ref('')

const maskedApiKey = computed(() => {
  const key = form.model.apiKey
  if (!key) return ''
  if (key.length <= 10) return '••••••••'
  return key.slice(0, 6) + '••••' + key.slice(-4)
})

function startEditApiKey() {
  editingApiKey.value = true
  newApiKey.value = ''
}
function confirmApiKey() {
  if (newApiKey.value) form.model.apiKey = newApiKey.value
  editingApiKey.value = false
  newApiKey.value = ''
}
function cancelEditApiKey() {
  editingApiKey.value = false
  newApiKey.value = ''
}

// 文件管理
interface ConfigFile {
  name: string
  desc: string
  type: 'file' | 'folder'
  content: string
  dirty: boolean
}

const activeFile = ref<ConfigFile | null>(null)

const configFiles = reactive<ConfigFile[]>([
  {
    name: 'SKILLS',
    desc: '技能配置目录',
    type: 'folder',
    content: '',
    dirty: false,
  },
  {
    name: 'AGENTS.md',
    desc: '智能体行为指令',
    type: 'file',
    content: '',
    dirty: false,
  },
  {
    name: 'BOOTSTRAP.md',
    desc: '启动引导流程',
    type: 'file',
    content: '',
    dirty: false,
  },
  {
    name: 'HEARTBEAT.md',
    desc: '心跳保活配置',
    type: 'file',
    content: '',
    dirty: false,
  },
  {
    name: 'IDENTITY.md',
    desc: '身份与角色定义',
    type: 'file',
    content: '',
    dirty: false,
  },
  {
    name: 'SOUL.md',
    desc: '核心个性与价值观',
    type: 'file',
    content: '',
    dirty: false,
  },
  {
    name: 'TOOLS.md',
    desc: '工具使用规范',
    type: 'file',
    content: '',
    dirty: false,
  },
  {
    name: 'USER.md',
    desc: '用户偏好与上下文',
    type: 'file',
    content: '',
    dirty: false,
  },
])

function markFileDirty(file: ConfigFile) {
  file.dirty = true
}

function clearFile(file: ConfigFile) {
  file.content = ''
  file.dirty = true
}

function handleUpload({ file }: UploadCustomRequestOptions) {
  const reader = new FileReader()
  reader.onload = (e) => {
    const text = e.target?.result as string
    const fileName = file.name
    const target = configFiles.find(f => f.name === fileName || f.name === fileName.replace('.md', '').toUpperCase())
    if (target && target.type === 'file') {
      target.content = text
      target.dirty = true
      activeFile.value = target
    }
  }
  if (file.file) {
    reader.readAsText(file.file)
  }
}

function handleUploadSingle({ file }: UploadCustomRequestOptions, targetFile: ConfigFile) {
  const reader = new FileReader()
  reader.onload = (e) => {
    const text = e.target?.result as string
    targetFile.content = text
    targetFile.dirty = true
  }
  if (file.file) {
    reader.readAsText(file.file)
  }
}

// 发布配置
const publishScope = ref<ConfigPublishScope>('all')
const publishStrategy = ref<ConfigPublishStrategy>('force')
const selectedInstanceIds = ref<string[]>([])
const confirmVisible = ref(false)
const drawerVisible = ref(false)

const providerOptions = [
  { label: 'Anthropic', value: 'anthropic' },
  { label: 'OpenAI', value: 'openai' },
  { label: 'DeepSeek', value: 'deepseek' },
  { label: '自定义', value: 'custom' },
]

const strategyLabels: Record<ConfigPublishStrategy, string> = {
  force: '强制生效',
  conditional: '条件生效',
  restart: '下次启动生效',
}
const scopeLabels: Record<ConfigPublishScope, string> = {
  all: '全部实例',
  running: '仅运行中',
  stopped: '仅已停止',
  selected: '指定实例',
}

const instanceOptions = computed(() =>
  adminStore.instances.map(inst => ({
    label: `${inst.name} (${inst.ownerName})`,
    value: inst.id,
  }))
)

const runningCount = computed(() =>
  adminStore.instances.filter(i => i.vmStatus === 'running').length
)
const stoppedCount = computed(() =>
  adminStore.instances.filter(i => i.vmStatus === 'stopped').length
)

const affectedCount = computed(() => {
  if (publishScope.value === 'all') return adminStore.instances.length
  if (publishScope.value === 'running') return runningCount.value
  if (publishScope.value === 'stopped') return stoppedCount.value
  return selectedInstanceIds.value.length
})

const showStoppedWarning = computed(() => {
  if (publishStrategy.value === 'restart') return false
  if (publishScope.value === 'stopped') return stoppedCount.value > 0
  if (publishScope.value === 'all') return stoppedCount.value > 0
  if (publishScope.value === 'selected') {
    return selectedInstanceIds.value.some(id => {
      const inst = adminStore.instances.find(i => i.id === id)
      return inst?.vmStatus === 'stopped'
    })
  }
  return false
})

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
}

async function handleSave() {
  await store.saveGlobalConfig({
    model: { ...form.model },
    files: configFiles
      .filter(f => f.type === 'file' && (f.content || f.dirty))
      .map(f => ({ name: f.name, content: f.content })),
  })
  configFiles.forEach(f => { f.dirty = false })
}

function handlePublishClick() {
  confirmVisible.value = true
}

async function handleConfirmPublish() {
  await store.publishConfig({
    strategy: publishStrategy.value,
    scope: publishScope.value,
    selectedInstanceIds: publishScope.value === 'selected' ? selectedInstanceIds.value : undefined,
  })
  confirmVisible.value = false
}

onMounted(async () => {
  await store.fetchGlobalConfig()
  form.model = { ...store.config.model, baseUrl: store.config.model.baseUrl ?? '' }
  // 同步文件数据
  if (store.config.files) {
    for (const saved of store.config.files) {
      const target = configFiles.find(f => f.name === saved.name)
      if (target) target.content = saved.content
    }
  }
  activeFile.value = configFiles[0]
  if (!adminStore.instances.length) {
    adminStore.fetchInstances()
  }
})
</script>

<style lang="less" scoped>
.global-config {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.page-header {
  margin-bottom: 24px;
  flex-shrink: 0;
  .page-title {
    font-size: 20px;
    font-weight: 600;
    color: @textColorTitle;
    margin: 0 0 6px;
  }
  .page-desc {
    font-size: 14px;
    color: @textColorSecondary;
    margin: 0;
  }
}

.config-layout {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  min-height: 0;
}

.config-section {
  background: @bgWhite;
  border: 1px solid @borderColor;
  border-radius: @radiusCard;
  padding: 20px;

  .section-title {
    font-size: 15px;
    font-weight: 600;
    color: @textColorTitle;
    margin: 0 0 16px;
  }
}

// ---- 模型配置：多列表单网格 ----
.model-form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0 32px;

  .form-row:last-child { margin-bottom: 0; }
}

.form-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;

  .form-label {
    width: 80px;
    flex-shrink: 0;
    font-size: 13px;
    color: @textColorSecondary;
    text-align: right;
  }
}

.api-key-field {
  flex: 1;
  display: flex;
  gap: 8px;
  align-items: center;
}

// ---- 文件管理区域 ----
.file-section {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;

  .file-section-header {
    flex-shrink: 0;
    display: flex;
    align-items: baseline;
    gap: 12px;

    .section-title {
      margin: 0;
    }
  }

  .file-section-desc {
    font-size: 13px;
    color: @textColorSecondary;
    white-space: nowrap;
  }
}

// 左右分栏
.file-split {
  display: flex;
  gap: 16px;
  flex: 1;
  min-height: 0;
}

// 左：文件列表
.file-list-panel {
  width: 240px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-y: auto;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: @radiusCard;
  cursor: pointer;
  transition: background-color 0.15s;

  &:hover {
    background: @bgPage;
  }

  &.active {
    background: rgba(0, 110, 255, 0.06);
    outline: 1px solid rgba(0, 110, 255, 0.2);
  }

  .file-icon {
    color: @textColorSecondary;
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  .file-info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    .file-name {
      font-size: 13px;
      font-weight: 500;
      color: @textColorTitle;
    }
    .file-desc {
      font-size: 11px;
      color: @textColorSecondary;
    }
  }

  .file-status {
    font-size: 11px;
    flex-shrink: 0;
    padding: 1px 6px;
    border-radius: 10px;

    &.configured {
      color: #18a058;
      background: rgba(24, 160, 88, 0.08);
    }
    &.empty {
      color: @textColorPlaceholder;
      background: @bgPage;
    }
  }
}

// 右：文件预览/编辑
.file-preview-panel {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  border: 1px solid @borderColor;
  border-radius: @radiusCard;
  background: @bgPage;
  overflow: hidden;

  .file-preview-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    border-bottom: 1px solid @borderColor;
    flex-shrink: 0;
    background: @bgWhite;
  }

  .file-preview-body {
    flex: 1;
    padding: 16px;
    min-height: 0;
    display: flex;
    flex-direction: column;

    :deep(.n-input) {
      flex: 1;
      min-height: 0;
    }

    :deep(.n-input__textarea-el) {
      font-family: 'SF Mono', 'Menlo', 'Monaco', 'Consolas', monospace;
      font-size: 13px;
      line-height: 1.6;
    }
  }
}

.folder-hint,
.empty-preview {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: @textColorSecondary;
  font-size: 14px;
}

// ---- 底部操作栏 ----
.form-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  padding-bottom: 8px;
  .saved-hint {
    font-size: 12px;
    color: @textColorSecondary;
  }
}

// ---- 抽屉 ----
.drawer-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.scope-group, .strategy-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.strategy-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
  .strategy-desc {
    font-size: 12px;
    color: @textColorSecondary;
    padding-left: 24px;
  }
}

.info-icon {
  font-size: 12px;
  color: @textColorSecondary;
  cursor: help;
  margin-left: 4px;
}

.instance-selector {
  margin-top: 12px;
}

.scope-count {
  margin-top: 12px;
  font-size: 13px;
  color: @textColorSecondary;
  strong { color: @primaryColor; }
}

// ---- 确认弹框 ----
.confirm-modal {
  background: @bgWhite;
  border-radius: @radiusModal;
  padding: 24px;
  width: 400px;
  max-width: 90vw;

  .confirm-title {
    font-size: 16px;
    font-weight: 600;
    color: @textColorTitle;
    margin: 0 0 16px;
  }
}

.confirm-info {
  background: @bgPage;
  border-radius: @radiusCard;
  padding: 16px;
  margin-bottom: 20px;
}

.confirm-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  font-size: 14px;

  .confirm-label { color: @textColorSecondary; }
  .confirm-value { color: @textColorTitle; }
}

.confirm-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>
