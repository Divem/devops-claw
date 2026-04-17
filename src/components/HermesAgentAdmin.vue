<template>
  <div class="hermes-admin">
    <!-- 顶部栏 -->
    <header class="admin-topbar">
      <div class="topbar-left">
        <n-button quaternary size="small" @click="emit('back')">
          <template #icon><span>&larr;</span></template>
        </n-button>
        <n-avatar :size="28" :src="project.avatarUrl" round />
        <span class="project-name">{{ project.name }}</span>
        <span class="agent-badge">Hermes</span>
        <n-tag :type="statusConfig.type" size="small" round>
          {{ statusConfig.label }}
        </n-tag>
      </div>
      <div class="topbar-right">
        <div class="topbar-tabs">
          <div
            v-for="tab in tabs"
            :key="tab.key"
            class="tab-item"
            :class="{ active: activeTab === tab.key }"
            @click="activeTab = tab.key"
          >
            {{ tab.label }}
          </div>
        </div>
      </div>
    </header>

    <div class="admin-body">
      <!-- 侧边栏 -->
      <aside class="admin-sidebar">
        <nav class="sidebar-nav">
          <div
            v-for="item in menuItems"
            :key="item.key"
            class="nav-item"
            :class="{ active: activeMenu === item.key }"
            @click="activeMenu = item.key"
          >
            <span class="nav-icon">{{ item.icon }}</span>
            <span class="nav-label">{{ item.label }}</span>
          </div>
        </nav>
      </aside>

      <!-- 内容区 -->
      <main class="admin-content">
        <div v-if="activeMenu === 'overview'" class="content-panel">
          <h3 class="panel-title">概览</h3>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Agent ID</span>
              <span class="info-value">{{ project.id }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">创建时间</span>
              <span class="info-value">{{ formatDate(project.createdAt) }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">状态</span>
              <span class="info-value">{{ statusConfig.label }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">App ID</span>
              <span class="info-value">{{ project.appId || '未配置' }}</span>
            </div>
          </div>

          <div class="panel-card">
            <div class="card-title">Gateway 服务</div>
            <div class="card-row">
              <span class="dot healthy" />
              <span>运行中</span>
              <span class="muted">{{ project.gatewayUrl }}</span>
            </div>
          </div>
        </div>

        <div v-else-if="activeMenu === 'channels'" class="content-panel">
          <h3 class="panel-title">通道</h3>
          <div class="panel-card">
            <div class="card-title">飞书机器人</div>
            <div class="card-row">
              <span class="dot" :class="project.botConfigured ? 'healthy' : 'warning'" />
              <span>{{ project.botConfigured ? '已连接' : '待配置' }}</span>
            </div>
          </div>
        </div>

        <div v-else-if="activeMenu === 'tools'" class="content-panel">
          <h3 class="panel-title">工具集</h3>
          <div class="tool-list">
            <div v-for="tool in tools" :key="tool.name" class="tool-card">
              <span class="tool-icon">{{ tool.icon }}</span>
              <div>
                <div class="tool-name">{{ tool.name }}</div>
                <div class="tool-desc">{{ tool.desc }}</div>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="activeMenu === 'logs'" class="content-panel">
          <h3 class="panel-title">运行日志</h3>
          <div class="log-panel">
            <div v-for="log in sampleLogs" :key="log.ts" class="log-line">
              <span class="log-ts">{{ log.ts }}</span>
              <span :class="['log-level', log.level]">{{ log.level.toUpperCase() }}</span>
              <span class="log-msg">{{ log.msg }}</span>
            </div>
          </div>
        </div>

        <div v-else class="content-panel">
          <h3 class="panel-title">{{ currentMenuLabel }}</h3>
          <div class="empty-hint">此模块开发中，敬请期待。</div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { NAvatar, NTag, NButton } from 'naive-ui'
import type { HermesProject, HermesProjectStatus } from '@/types/hermes'

const props = defineProps<{
  project: HermesProject
}>()

const emit = defineEmits<{
  back: []
}>()

const tabs = [
  { key: 'console', label: '控制台' },
  { key: 'code', label: '代码模式' },
]

const activeTab = ref('console')
const activeMenu = ref('overview')

const menuItems = [
  { key: 'overview', label: '概览', icon: '📊' },
  { key: 'channels', label: '通道', icon: '🔌' },
  { key: 'tools', label: '工具集', icon: '🧰' },
  { key: 'sessions', label: '会话', icon: '🗨️' },
  { key: 'usage', label: '使用情况', icon: '📈' },
  { key: 'logs', label: '运行日志', icon: '📋' },
  { key: 'config', label: '配置', icon: '⚙️' },
]

const currentMenuLabel = computed(
  () => menuItems.find((m) => m.key === activeMenu.value)?.label ?? '',
)

const statusMap: Record<HermesProjectStatus, { label: string; type: 'success' | 'warning' | 'error' | 'info' }> = {
  creating: { label: '创建中', type: 'info' },
  deployed: { label: '已连接', type: 'success' },
  pending_approval: { label: '待配置', type: 'warning' },
  error: { label: '异常', type: 'error' },
}

const statusConfig = computed(() => statusMap[props.project.status] ?? { label: '未知', type: 'info' as const })

const tools = [
  { icon: '🌐', name: 'HTTP 请求', desc: '支持 GET/POST/PUT/DELETE' },
  { icon: '📅', name: '日程查询', desc: '对接飞书日历' },
  { icon: '📂', name: '文件读写', desc: '云盘文件访问' },
  { icon: '🔍', name: '知识库检索', desc: '向量检索 + 语义匹配' },
]

const sampleLogs = [
  { ts: '10:24:02', level: 'info', msg: 'Agent 启动成功，监听端口 8080' },
  { ts: '10:24:15', level: 'info', msg: '已加载 4 个工具' },
  { ts: '10:25:03', level: 'info', msg: '收到会话请求 session_id=sess_abc123' },
  { ts: '10:25:04', level: 'debug', msg: '调用工具 HTTP 请求 耗时 320ms' },
  { ts: '10:26:10', level: 'warn', msg: '工具调用重试 1 次' },
]

function formatDate(isoString: string): string {
  const d = new Date(isoString)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}
</script>

<style lang="less" scoped>
.hermes-admin {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: @bgPage;
  position: relative;
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

.agent-badge {
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 4px;
  background: fade(@warningColor, 12%);
  color: @warningColor;
  font-weight: 500;
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

  &:last-child { border-right: none; }
  &:hover { color: @textColorTitle; background: @bgContainer; }
  &.active { color: @bgWhite; background: @primaryColor; font-weight: 500; }
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

.sidebar-nav { flex: 1; padding: 8px 0; overflow-y: auto; }

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  font-size: 14px;
  color: @textColorSecondary;
  cursor: pointer;
  transition: all 0.2s;

  &:hover { background: @bgContainer; color: @textColorTitle; }
  &.active { color: @primaryColor; background: fade(@primaryColor, 6%); font-weight: 500; }
}

.nav-icon {
  font-size: 16px;
  width: 20px;
  text-align: center;
  flex-shrink: 0;
}

.admin-content {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}

.content-panel { max-width: 960px; margin: 0 auto; }

.panel-title {
  font-size: 18px;
  font-weight: 600;
  color: @textColorTitle;
  margin-bottom: 16px;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding: 20px;
  background: @bgWhite;
  border-radius: 8px;
  box-shadow: @shadowCard;
  margin-bottom: 16px;
}

.info-item { display: flex; flex-direction: column; gap: 4px; }
.info-label { font-size: 12px; color: @textColorPlaceholder; }
.info-value { font-size: 14px; color: @textColorBody; word-break: break-all; }

.panel-card {
  padding: 20px;
  background: @bgWhite;
  border-radius: 8px;
  box-shadow: @shadowCard;
  margin-bottom: 16px;
}

.card-title { font-size: 14px; font-weight: 600; color: @textColorTitle; margin-bottom: 12px; }

.card-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: @textColorBody;
}

.muted { color: @textColorPlaceholder; margin-left: auto; font-size: 12px; }

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.dot.healthy { background: @successColor; }
.dot.warning { background: @warningColor; }
.dot.unhealthy { background: @errorColor; }

.tool-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.tool-card {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 16px;
  background: @bgWhite;
  border-radius: 8px;
  box-shadow: @shadowCard;
}

.tool-icon { font-size: 24px; }
.tool-name { font-size: 14px; font-weight: 600; color: @textColorTitle; }
.tool-desc { font-size: 12px; color: @textColorPlaceholder; margin-top: 2px; }

.log-panel {
  padding: 12px;
  background: #1e1e1e;
  border-radius: 8px;
  font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
  font-size: 12px;
  color: #d4d4d4;
}

.log-line { display: flex; gap: 12px; padding: 4px 0; }
.log-ts { color: #858585; }
.log-level { font-weight: 600; min-width: 48px; }
.log-level.info { color: #569cd6; }
.log-level.debug { color: #b5cea8; }
.log-level.warn { color: #dcdcaa; }
.log-level.error { color: #f48771; }
.log-msg { flex: 1; }

.empty-hint {
  padding: 48px 24px;
  text-align: center;
  color: @textColorPlaceholder;
  background: @bgWhite;
  border-radius: 8px;
  box-shadow: @shadowCard;
}
</style>
