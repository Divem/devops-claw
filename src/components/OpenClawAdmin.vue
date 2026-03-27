<template>
  <div class="openclaw-admin">
    <!-- 全屏 Admin 占位图片 - 仅在控制台模式下且演示开关开启时显示 -->
    <div v-if="activeView === 'console' && showDemoOverlay" class="admin-placeholder-overlay">
      <img
        src="/images/99openclaw-admin.png"
        alt="Admin Console"
        class="admin-placeholder-image"
      />
    </div>

    <!-- 代码模式演示覆盖层 -->
    <div v-if="activeView === 'code' && showDemoOverlay" class="code-demo-overlay">
      <img
        src="/images/99-openclaw-code.png"
        alt="代码模式设计参考"
        class="code-demo-image"
      />
    </div>

    <!-- 演示/真实切换开关 -->
    <button
      class="demo-toggle"
      @click="showDemoOverlay = !showDemoOverlay"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      <span>{{ showDemoOverlay ? '演示' : '真实' }}</span>
    </button>

    <!-- 顶部 Tab 栏 -->
    <header class="admin-topbar">
      <div class="topbar-left">
        <n-button quaternary size="small" @click="emit('back')">
          <template #icon><span>&larr;</span></template>
        </n-button>
        <n-avatar :size="28" :src="project.avatarUrl" round />
        <span class="project-name">{{ project.name }}</span>
        <n-tag :type="statusConfig.type" size="small" round>
          {{ statusConfig.label }}
        </n-tag>
      </div>
      <div class="topbar-right">
        <div class="topbar-tabs">
          <div
            class="tab-item"
            :class="{ active: activeView === 'console' }"
            @click="setConsoleMode"
          >
            控制台
          </div>
          <div
            class="tab-item"
            :class="{ active: activeView === 'code' }"
            @click="setCodeMode"
          >
            代码模式
          </div>
          <div
            class="tab-item"
            :class="{ active: activeView === 'terminal' }"
            @click="setTerminalMode"
          >
            终端
          </div>
        </div>
        <BotInfoDropdown :project="project" size="small" />
      </div>
    </header>

    <div class="admin-body">
      <!-- 左侧侧边导航（仅控制台模式） -->
      <aside v-if="activeView === 'console'" class="admin-sidebar">
        <nav class="sidebar-nav">
          <div
            v-for="item in menuItems"
            :key="item.key"
            class="nav-item"
            :class="{ active: activeMenu === item.key }"
            @click="handleNavClick(item)"
          >
            <span class="nav-icon">{{ item.icon }}</span>
            <span class="nav-label">{{ item.label }}</span>
          </div>
        </nav>
      </aside>

      <!-- 右侧内容区 -->
      <div class="admin-content">
        <!-- 代码模式 -->
        <ConfigCodeMode v-if="activeView === 'code'" class="code-mode-container" />

        <!-- 终端视图 -->
        <TerminalView v-else-if="activeView === 'terminal'" :config="projectConfig" class="terminal-view-container" />

        <!-- 控制台视图 -->
        <ConsoleView v-else-if="activeMenu === 'console'" class="console-view-container" />

        <template v-else>
          <!-- 加载状态 -->
          <div v-if="iframeLoading" class="iframe-skeleton">
            <div class="skeleton-header">
              <div class="skeleton-bar w-48"></div>
              <div class="skeleton-bar w-24"></div>
            </div>
            <div class="skeleton-body">
              <div class="skeleton-sidebar">
                <div v-for="i in 6" :key="i" class="skeleton-bar w-full"></div>
              </div>
              <div class="skeleton-main">
                <div v-for="i in 4" :key="i" class="skeleton-bar w-full"></div>
              </div>
            </div>
          </div>

          <!-- Gateway 不可用 -->
          <div v-else-if="!gatewayAvailable" class="iframe-error">
            <span style="font-size: 48px;">⚠️</span>
            <p class="error-title">服务不可用</p>
            <p class="error-desc">OpenClaw Gateway 服务未就绪，请稍后重试</p>
            <n-button type="primary" @click="checkGateway">重试</n-button>
          </div>

          <!-- iframe -->
          <iframe
            v-show="iframeLoading || gatewayAvailable"
            ref="iframeRef"
            :src="iframeSrc"
            class="admin-iframe"
            @load="handleIframeLoad"
            @error="handleIframeError"
          ></iframe>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { NAvatar, NTag, NButton } from 'naive-ui'
import type { Project, ProjectStatus } from '@/types/project'
import BotInfoDropdown from './BotInfoDropdown.vue'
import ConfigCodeMode from '@/views/config/ConfigCodeMode.vue'
import ConsoleView from './settings/ConsoleView.vue'
import TerminalView from './config/TerminalView.vue'

const props = defineProps<{
  project: Project
}>()

const emit = defineEmits<{
  back: []
}>()

const menuItems = [
  { key: 'console', label: '控制台', icon: '🎛️', path: null },
  { key: 'chat', label: '聊天', icon: '💬', path: '/chat' },
  { key: 'overview', label: '概览', icon: '📊', path: '/overview' },
  { key: 'channels', label: '通道', icon: '🔌', path: '/channels' },
  { key: 'instances', label: '实例', icon: '🖥️', path: '/instances' },
  { key: 'sessions', label: '会话', icon: '🗨️', path: '/sessions' },
  { key: 'usage', label: '使用情况', icon: '📈', path: '/usage' },
  { key: 'schedules', label: '定时任务', icon: '⏰', path: '/schedules' },
  { key: 'config', label: '配置', icon: '⚙️', path: '/code' },
  { key: 'logs', label: '日志', icon: '📋', path: '/logs' },
  { key: 'docs', label: '文档', icon: '📖', path: '/docs', external: true } as const,
]

type ViewMode = 'console' | 'code' | 'terminal'

const activeMenu = ref('chat')
const activeView = ref<ViewMode>('console')
const showDemoOverlay = ref(true)
const projectConfig = ref<Record<string, any>>({})
const iframeRef = ref<HTMLIFrameElement | null>(null)
const iframeLoading = ref(true)
const gatewayAvailable = ref(true)

const statusMap: Record<ProjectStatus, { label: string; type: 'success' | 'warning' | 'error' | 'info' }> = {
  creating: { label: '创建中', type: 'info' },
  deployed: { label: '已连接', type: 'success' },
  pending_approval: { label: '待配置', type: 'warning' },
  error: { label: '异常', type: 'error' },
}

const statusConfig = computed(() => statusMap[props.project.status] ?? { label: '未知', type: 'info' as const })

const iframeSrc = computed(() => {
  const projectId = props.project?.id
  if (!projectId) return ''
  if (activeView.value === 'code') {
    return `/api/projects/${projectId}/gateway/code`
  }
  const item = menuItems.find((m) => m.key === activeMenu.value)
  if (item?.external) return ''
  const path = item?.path ?? '/chat'
  return `/api/projects/${projectId}/gateway${path}`
})

function setCodeMode() {
  activeView.value = 'code'
  iframeLoading.value = true
}

function setConsoleMode() {
  activeView.value = 'console'
  iframeLoading.value = true
}

function handleNavClick(item: (typeof menuItems)[number]) {
  if (item.external && item.path) {
    const projectId = props.project?.id
    if (projectId) {
      window.open(`/api/projects/${projectId}/gateway${item.path}`, '_blank')
    }
    return
  }
  activeMenu.value = item.key
}

function setTerminalMode() {
  activeView.value = 'terminal'
  iframeLoading.value = false
}

function handleIframeLoad() {
  iframeLoading.value = false
  gatewayAvailable.value = true
}

function handleIframeError() {
  iframeLoading.value = false
  gatewayAvailable.value = false
}

let checkTimer: ReturnType<typeof setInterval> | null = null

async function checkGateway() {
  iframeLoading.value = true
  gatewayAvailable.value = true
  const currentSrc = iframeSrc.value
  if (iframeRef.value) {
    iframeRef.value.src = ''
    await new Promise((r) => setTimeout(r, 50))
    iframeRef.value.src = currentSrc
  }
}

onMounted(() => {
  // 获取项目配置
  fetchProjectConfig()
  
  checkTimer = setInterval(async () => {
    if (!iframeLoading.value && !gatewayAvailable.value && props.project?.id) {
      try {
        const res = await fetch(`/api/projects/${props.project.id}/gateway/health`, { method: 'HEAD' })
        if (res.ok) {
          checkGateway()
        }
      } catch {
        // ignore
      }
    }
  }, 10000)
})

onUnmounted(() => {
  if (checkTimer) {
    clearInterval(checkTimer)
    checkTimer = null
  }
})

watch(activeMenu, () => {
  iframeLoading.value = true
})

async function fetchProjectConfig() {
  if (!props.project?.id) return
  try {
    const response = await fetch(`/api/projects/${props.project.id}/config`)
    if (response.ok) {
      projectConfig.value = await response.json()
    }
  } catch {
    projectConfig.value = {}
  }
}
</script>

<style lang="less" scoped>
.openclaw-admin {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: @bgPage;
  position: relative;
}

// Admin 占位图片 - 只遮挡内容区，保留顶部导航
.admin-placeholder-overlay {
  position: absolute;
  top: 48px; // 从顶部导航栏下方开始
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow: hidden;
}

.admin-placeholder-image {
  width: 100%;
  height: auto;
  max-height: calc(100vh - 48px);
  object-fit: contain;
}

.code-demo-overlay {
  position: absolute;
  top: 48px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background: #1e1e1e;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow: hidden;
}

.code-demo-image {
  width: 100%;
  height: auto;
  max-height: calc(100vh - 48px);
  object-fit: contain;
}

.demo-toggle {
  position: fixed;
  bottom: 16px;
  left: 16px;
  z-index: 200;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  background: none;
  color: @textColorPlaceholder;
  font-size: 12px;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: @primaryColor;
  }
}

.admin-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  padding: 0 16px;
  background: @bgWhite;
  border-bottom: 1px solid @borderColor;
  flex-shrink: 0;
}

.topbar-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.project-name {
  font-size: 14px;
  font-weight: 600;
  color: @textColorTitle;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.topbar-tabs {
  display: flex;
  border: 1px solid @borderColor;
  border-radius: 6px;
  overflow: hidden;
}

.tab-item {
  padding: 4px 16px;
  font-size: 13px;
  color: @textColorSecondary;
  cursor: pointer;
  transition: all 0.2s;
  border-right: 1px solid @borderColor;

  &:last-child {
    border-right: none;
  }

  &:hover {
    color: @textColorTitle;
    background: @bgContainer;
  }

  &.active {
    color: @bgWhite;
    background: @primaryColor;
    font-weight: 500;
  }
}

.admin-body {
  flex: 1;
  display: flex;
  min-height: 0;
}

.admin-sidebar {
  width: 220px;
  min-width: 220px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: @bgWhite;
  border-right: 1px solid @borderColor;
}

.sidebar-nav {
  flex: 1;
  padding: 8px 0;
  overflow-y: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  font-size: 14px;
  color: @textColorSecondary;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: @bgContainer;
    color: @textColorTitle;
  }

  &.active {
    color: @primaryColor;
    background: fade(@primaryColor, 6%);
    font-weight: 500;
  }
}

.nav-icon {
  font-size: 16px;
  width: 20px;
  text-align: center;
  flex-shrink: 0;
}

.nav-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.admin-content {
  flex: 1;
  position: relative;
  height: 100%;
}

.admin-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

/* 骨架屏 */
.iframe-skeleton {
  position: absolute;
  inset: 0;
  background: @bgPanel;
  padding: 16px;
  z-index: 1;
}

.skeleton-header {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.skeleton-body {
  display: flex;
  gap: 16px;
}

.skeleton-sidebar {
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.skeleton-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.skeleton-bar {
  height: 14px;
  background: linear-gradient(90deg, @bgContainer 25%, @borderColor 50%, @bgContainer 75%);
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s infinite;
  border-radius: 4px;
}

.w-full { width: 100%; }
.w-48 { width: 192px; }
.w-24 { width: 96px; }

@keyframes skeleton-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* 错误状态 */
.iframe-error {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: @bgWhite;
  z-index: 1;
}

.error-title {
  font-size: 16px;
  font-weight: 600;
  color: @textColorTitle;
}

.error-desc {
  font-size: 14px;
  color: @textColorSecondary;
}

/* 代码模式容器 */
.code-mode-container {
  width: 100%;
  height: 100%;
}

/* 控制台视图容器 */
.console-view-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background: @bgPage;
}

/* 终端视图容器 */
.terminal-view-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
