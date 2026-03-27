<template>
  <div class="admin-dashboard">
    <!-- 统计卡片 -->
    <div class="stats-grid">
      <div class="stat-card clickable" @click="navigateTo('/admin/instances')">
        <div class="stat-icon total">📦</div>
        <div class="stat-info">
          <div class="stat-value">{{ stats.totalInstances }}</div>
          <div class="stat-label">实例总数</div>
        </div>
      </div>
      <div class="stat-card clickable" @click="navigateTo('/admin/instances', { status: 'running' })">
        <div class="stat-icon running">🟢</div>
        <div class="stat-info">
          <div class="stat-value">{{ stats.runningInstances }}</div>
          <div class="stat-label">运行中</div>
        </div>
      </div>
      <div class="stat-card clickable" @click="navigateTo('/admin/instances', { status: 'stopped' })">
        <div class="stat-icon stopped">🔴</div>
        <div class="stat-info">
          <div class="stat-value">{{ stats.stoppedInstances }}</div>
          <div class="stat-label">已停止</div>
        </div>
      </div>
      <div class="stat-card clickable" @click="navigateTo('/admin/instances', { status: 'error' })">
        <div class="stat-icon error">⚠️</div>
        <div class="stat-info">
          <div class="stat-value">{{ stats.errorInstances }}</div>
          <div class="stat-label">异常</div>
        </div>
      </div>
    </div>

    <!-- 资源使用 + 创建趋势 -->
    <div class="dashboard-row">
      <div class="dashboard-card resource-card">
        <h3 class="card-title">资源使用概览</h3>
        <div class="resource-items">
          <div class="resource-item">
            <div class="resource-header">
              <span class="resource-name">CPU</span>
              <span class="resource-value">{{ resources.cpu }}%</span>
            </div>
            <n-progress :percentage="resources.cpu" :show-indicator="false" :height="8" type="line" color="#006eff" />
          </div>
          <div class="resource-item">
            <div class="resource-header">
              <span class="resource-name">内存</span>
              <span class="resource-value">{{ resources.memory }}%</span>
            </div>
            <n-progress :percentage="resources.memory" :show-indicator="false" :height="8" type="line" color="#67C23A" />
          </div>
          <div class="resource-item">
            <div class="resource-header">
              <span class="resource-name">存储</span>
              <span class="resource-value">{{ resources.storage }}%</span>
            </div>
            <n-progress :percentage="resources.storage" :show-indicator="false" :height="8" type="line" color="#ff8800" />
          </div>
          <div class="resource-item">
            <div class="resource-header">
              <span class="resource-name">网络</span>
              <span class="resource-value">{{ resources.network }}%</span>
            </div>
            <n-progress :percentage="resources.network" :show-indicator="false" :height="8" type="line" color="#409eff" />
          </div>
        </div>
      </div>

      <div class="dashboard-card trend-card">
        <h3 class="card-title">近7天创建趋势</h3>
        <div class="trend-chart">
          <div
            v-for="(day, index) in creationTrend"
            :key="index"
            class="trend-bar-wrapper"
          >
            <div class="trend-bar" :style="{ height: `${(day.count / maxTrendValue) * 100}%` }">
              <span class="trend-count" v-if="day.count > 0">{{ day.count }}</span>
            </div>
            <span class="trend-day">{{ day.day }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 待办事项 -->
    <div class="dashboard-card todo-card">
      <h3 class="card-title">待办事项</h3>
      <div class="todo-list">
        <div v-if="todoItems.length === 0" class="todo-empty">
          <span class="empty-icon">✅</span>
          <span>暂无待办事项</span>
        </div>
        <div
          v-for="item in todoItems"
          :key="item.id"
          class="todo-item"
          :class="item.type"
        >
          <span class="todo-icon">{{ item.icon }}</span>
          <div class="todo-content">
            <div class="todo-title">{{ item.title }}</div>
            <div class="todo-desc">{{ item.description }}</div>
          </div>
          <n-button v-if="item.action" size="small" type="primary" text @click="handleTodoAction(item)">
            {{ item.action }}
          </n-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { NProgress, NButton } from 'naive-ui'

const router = useRouter()

interface DashboardStats {
  totalInstances: number
  runningInstances: number
  stoppedInstances: number
  errorInstances: number
}

interface ResourceUsage {
  cpu: number
  memory: number
  storage: number
  network: number
}

interface TrendData {
  day: string
  count: number
}

interface TodoItem {
  id: string
  type: 'approval' | 'error' | 'info'
  icon: string
  title: string
  description: string
  action?: string
}

const stats = ref<DashboardStats>({
  totalInstances: 0,
  runningInstances: 0,
  stoppedInstances: 0,
  errorInstances: 0,
})

const resources = ref<ResourceUsage>({
  cpu: 0,
  memory: 0,
  storage: 0,
  network: 0,
})

const creationTrend = ref<TrendData[]>([])

const todoItems = ref<TodoItem[]>([])

const maxTrendValue = computed(() => {
  const max = Math.max(...creationTrend.value.map(d => d.count))
  return max > 0 ? max : 1
})

function navigateTo(path: string, query?: Record<string, string>) {
  router.push({ path, query })
}

async function fetchDashboardData() {
  try {
    const res = await fetch('/api/admin/dashboard')
    if (res.ok) {
      const data = await res.json()
      stats.value = data.stats
      resources.value = data.resources
      creationTrend.value = data.trend
      todoItems.value = data.todos
    }
  } catch {
    // 静默失败，保持默认值
  }
}

function handleTodoAction(item: TodoItem) {
  if (item.type === 'approval') {
    router.push('/admin/approvals')
  } else if (item.type === 'error') {
    router.push({ path: '/admin/instances', query: { status: 'error' } })
  }
}

onMounted(() => {
  fetchDashboardData()
})
</script>

<style lang="less" scoped>
.admin-dashboard {
  max-width: 1200px;
  margin: 0 auto;
}

/* 统计卡片 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  background: @bgWhite;
  border-radius: 4px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.1);
}

.stat-card.clickable {
  cursor: pointer;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
  }
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;

  &.total {
    background: fade(@primaryColor, 10%);
  }

  &.running {
    background: fade(#67C23A, 10%);
  }

  &.stopped {
    background: fade(#909399, 10%);
  }

  &.error {
    background: fade(#f23030, 10%);
  }
}

.stat-value {
  font-size: 28px;
  font-weight: 600;
  color: @textColorTitle;
  line-height: 1.2;
}

.stat-label {
  font-size: 14px;
  color: @textColorSecondary;
  margin-top: 4px;
}

/* 仪表盘行布局 */
.dashboard-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

.dashboard-card {
  background: @bgWhite;
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: @textColorTitle;
  margin-bottom: 16px;
}

/* 资源使用 */
.resource-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.resource-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.resource-name {
  font-size: 14px;
  color: @textColorBody;
}

.resource-value {
  font-size: 14px;
  font-weight: 600;
  color: @textColorTitle;
}

/* 创建趋势图 */
.trend-chart {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 150px;
  padding: 0 8px;
}

.trend-bar-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  height: 100%;
}

.trend-bar {
  width: 24px;
  background: @primaryColor;
  border-radius: 4px 4px 0 0;
  min-height: 4px;
  position: relative;
  transition: height 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
}

.trend-count {
  position: absolute;
  top: -18px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  color: @textColorBody;
  font-weight: 500;
}

.trend-day {
  margin-top: 8px;
  font-size: 12px;
  color: @textColorPlaceholder;
}

/* 待办事项 */
.todo-card {
  margin-bottom: 24px;
}

.todo-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.todo-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 40px;
  color: @textColorSecondary;
  font-size: 14px;

  .empty-icon {
    font-size: 20px;
  }
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: @bgPage;
  border-radius: 4px;
  border-left: 3px solid transparent;

  &.approval {
    border-left-color: #ff8800;
  }

  &.error {
    border-left-color: #f23030;
  }

  &.info {
    border-left-color: @primaryColor;
  }
}

.todo-icon {
  font-size: 20px;
}

.todo-content {
  flex: 1;
}

.todo-title {
  font-size: 14px;
  font-weight: 500;
  color: @textColorTitle;
}

.todo-desc {
  font-size: 12px;
  color: @textColorSecondary;
  margin-top: 2px;
}

@media (max-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .dashboard-row {
    grid-template-columns: 1fr;
  }
}
</style>
