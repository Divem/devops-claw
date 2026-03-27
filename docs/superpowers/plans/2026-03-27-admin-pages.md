# 管理后台前端交互页面实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在管理后台框架基础上，引入 vue-router、完善仪表盘、新增实例管理和审批管理页面。

**Architecture:** 引入 vue-router@4 仅用于管理后台子路由（/admin/*），员工端保持现有 pageState 模式。管理后台使用 AdminLayout 作为父路由组件，内含 router-view 渲染子页面。新增独立的 admin store 管理实例列表、审批数据和筛选状态。

**Tech Stack:** Vue 3, vue-router@4, Pinia, Naive UI, Less, MSW, TypeScript

**Spec:** `docs/superpowers/specs/2026-03-27-admin-pages-design.md`

---

## File Map

### 新增文件

| 文件 | 职责 |
|------|------|
| `src/router/index.ts` | vue-router 配置，管理后台子路由 |
| `src/types/admin.ts` | 管理后台类型定义（Instance, Approval, OperationLog 等） |
| `src/stores/admin.ts` | 管理后台 Pinia store（实例列表、审批数据、筛选状态） |
| `src/mocks/adminData.ts` | 管理后台 mock 数据工厂 |
| `src/views/admin/InstanceList.vue` | 实例管理页面（工具栏 + 表格） |
| `src/views/admin/ApprovalBoard.vue` | 审批管理页面（Tab + 卡片流） |
| `src/components/admin/InstanceTable.vue` | 实例数据表格组件 |
| `src/components/admin/InstanceDrawer.vue` | 实例详情抽屉组件 |
| `src/components/admin/ApprovalCard.vue` | 审批卡片组件 |
| `src/components/admin/ApprovalGuide.vue` | 配置引导步骤组件 |

### 改动文件

| 文件 | 改动 |
|------|------|
| `package.json` | 新增 vue-router@4 依赖 |
| `src/main.ts` | 注册 vue-router |
| `src/App.vue` | 根据路由判断渲染 router-view 或员工端 |
| `src/components/admin/AdminLayout.vue` | slot → router-view，菜单项改为 router-link |
| `src/components/AppHeader.vue` | 管理员入口改为 router.push |
| `src/components/UserDropdown.vue` | 使用 router.push 代替 emit |
| `src/views/admin/AdminDashboard.vue` | 完善统计卡片、网络指标、待办操作跳转 |
| `src/mocks/handlers.ts` | 新增 admin 相关 API handlers |
| `src/mocks/data.ts` | 更新仪表盘 mock 数据 |

---

### Task 1: 安装 vue-router 并创建路由配置

**Files:**
- Modify: `package.json`
- Create: `src/router/index.ts`
- Modify: `src/main.ts`

- [ ] **Step 1: 安装 vue-router**

```bash
cd /Users/dawinyuan/Documents/coder/devops-claw && npm install vue-router@4
```

- [ ] **Step 2: 创建路由配置文件**

创建 `src/router/index.ts`：

```typescript
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/App.vue'),
      // 员工端由 App.vue 内部 pageState 控制，不走子路由
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/components/admin/AdminLayout.vue'),
      redirect: '/admin/dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'admin-dashboard',
          component: () => import('@/views/admin/AdminDashboard.vue'),
        },
        {
          path: 'instances',
          name: 'admin-instances',
          component: () => import('@/views/admin/InstanceList.vue'),
        },
        {
          path: 'approvals',
          name: 'admin-approvals',
          component: () => import('@/views/admin/ApprovalBoard.vue'),
        },
      ],
    },
  ],
})

export default router
```

- [ ] **Step 3: 在 main.ts 注册 router**

修改 `src/main.ts`，在 `createApp` 后增加 `app.use(router)`：

```typescript
import 'tailwindcss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

async function bootstrap() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser')
    await worker.start({ onUnhandledRequest: 'bypass' })
  }

  const app = createApp(App)
  app.use(createPinia())
  app.use(router)
  app.mount('#app')
}

bootstrap()
```

- [ ] **Step 4: 验证项目能编译**

```bash
cd /Users/dawinyuan/Documents/coder/devops-claw && npx vue-tsc --noEmit 2>&1 | head -20
```

注意：此时可能报错因为 InstanceList.vue 和 ApprovalBoard.vue 不存在，这是预期的。先创建占位组件。

- [ ] **Step 5: 创建占位页面组件**

创建 `src/views/admin/InstanceList.vue`：

```vue
<template>
  <div class="instance-list">
    <h2>实例管理</h2>
    <p>待实现</p>
  </div>
</template>

<script setup lang="ts">
</script>
```

创建 `src/views/admin/ApprovalBoard.vue`：

```vue
<template>
  <div class="approval-board">
    <h2>审批管理</h2>
    <p>待实现</p>
  </div>
</template>

<script setup lang="ts">
</script>
```

- [ ] **Step 6: 验证编译通过**

```bash
cd /Users/dawinyuan/Documents/coder/devops-claw && npx vue-tsc --noEmit 2>&1 | head -20
```

Expected: 无错误或仅有与本次变更无关的警告。

- [ ] **Step 7: Commit**

```bash
git add src/router/index.ts src/main.ts src/views/admin/InstanceList.vue src/views/admin/ApprovalBoard.vue package.json package-lock.json
git commit -m "$(cat <<'EOF'
feat: add vue-router with admin sub-routes

Introduce vue-router@4 for admin backend pages only.
Employee-facing pages keep existing pageState pattern.
EOF
)"
```

---

### Task 2: 改造 App.vue 和 AdminLayout 适配路由

**Files:**
- Modify: `src/App.vue`
- Modify: `src/components/admin/AdminLayout.vue`
- Modify: `src/components/AppHeader.vue`
- Modify: `src/components/UserDropdown.vue`

- [ ] **Step 1: 改造 App.vue**

App.vue 需要区分路由模式：当 `route.path` 以 `/admin` 开头时渲染 `<router-view />`，否则渲染现有员工端逻辑。

将 `src/App.vue` 的 `<template>` 改为：

```vue
<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <!-- 管理后台：由 vue-router 接管 -->
      <router-view v-if="isAdminRoute" />

      <!-- 员工端：保持现有 pageState 逻辑 -->
      <template v-else>
        <!-- 落地页 -->
        <LandingPage
          v-if="showLandingPage"
          @start-deploy="handleStartDeploy"
        />

        <!-- 员工 Gateway 配置页面 -->
        <OpenClawAdmin
          v-else-if="store.pageState === 'admin' && store.project"
          :project="store.project"
          @back="store.goHome()"
        />

        <!-- 应用主界面 -->
        <div v-else class="app">
          <AppHeader />
          <main class="app-main">
            <HeroSection />
            <n-spin v-if="store.pageState === 'loading'" size="large" />
            <CreateGuide
              v-else-if="store.pageState === 'empty'"
              @create="store.openCreateModal()"
            />
            <ProjectCard
              v-else-if="store.pageState === 'has_project' && store.project"
              :project="store.project"
              @config-open-claw="handleConfigOpenClaw"
              @delete="store.openDeleteModal()"
            />
            <FeatureList />
          </main>
          <footer class="app-footer"><span>企业内部 OpenClaw 托管平台</span></footer>
          <CreateModal
            :show="store.modalState === 'create'"
            @close="store.closeModal()"
            @submit="handleCreate"
          />
          <ProgressModal
            :show="store.modalState === 'progress'"
            :steps="store.steps"
            @retry="handleRetry"
          />

          <CompleteModal
            :show="store.modalState === 'complete'"
            @close="store.closeModal()"
            @config-open-claw="handleConfigOpenClaw"
            @view-approval="store.closeModal()"
          />

          <DeleteConfirm
            :show="store.modalState === 'delete'"
            @cancel="store.closeModal()"
            @confirm="handleDelete"
          />
        </div>
      </template>
    </n-message-provider>
  </n-config-provider>
</template>
```

在 `<script setup>` 中添加路由相关：

```typescript
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isAdminRoute = computed(() => route.path.startsWith('/admin'))
```

移除 `AdminLayout` 和 `AdminDashboard` 的导入（不再在 App.vue 中直接使用），移除 `store.pageState === 'admin_dashboard'` 的条件分支。

从 `AppHeader` 移除 `@navigate-to-admin` 事件（改由 UserDropdown 内部直接 router.push）。

- [ ] **Step 2: 改造 AdminLayout.vue**

修改 `src/components/admin/AdminLayout.vue`：

1. 将 `<slot />` 改为 `<router-view />`
2. 菜单项使用 `router-link` 代替 click handler
3. activeMenu 从 `route.name` 自动计算
4. 移除 `navigate` emit，保留 `back` 改为 router.push('/')

```vue
<template>
  <div class="admin-layout">
    <!-- 顶部导航栏 -->
    <header class="admin-header">
      <div class="header-left">
        <n-button quaternary size="small" @click="handleBack">
          <template #icon>
            <n-icon :component="ArrowBack" />
          </template>
          返回
        </n-button>
        <div class="header-brand">
          <span class="brand-logo">🦞</span>
          <span class="brand-title">DevOps-Claw 管理后台</span>
        </div>
      </div>
      <div class="header-right">
        <UserDropdown :user="mockUser" />
      </div>
    </header>

    <!-- 侧边栏 + 内容区 -->
    <div class="admin-body">
      <aside class="admin-sidebar">
        <nav class="sidebar-nav">
          <router-link
            v-for="item in menuItems"
            :key="item.key"
            :to="item.to"
            custom
            v-slot="{ isActive, navigate }"
          >
            <div
              class="nav-item"
              :class="{ active: isActive }"
              @click="navigate"
            >
              <span class="nav-icon">{{ item.icon }}</span>
              <span class="nav-label">{{ item.label }}</span>
            </div>
          </router-link>
        </nav>
      </aside>

      <main class="admin-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NButton, NIcon } from 'naive-ui'
import { ArrowBack } from '@vicons/ionicons5'
import { useRouter } from 'vue-router'
import UserDropdown from '../UserDropdown.vue'
import { mockUser } from '@/mocks/data'
import { useProjectStore } from '@/stores/project'

const router = useRouter()
const store = useProjectStore()

const menuItems = [
  { key: 'dashboard', label: '仪表盘', icon: '📊', to: '/admin/dashboard' },
  { key: 'instances', label: '实例管理', icon: '🖥️', to: '/admin/instances' },
  { key: 'approvals', label: '审批管理', icon: '✅', to: '/admin/approvals' },
]

function handleBack() {
  store.goHome()
  router.push('/')
}
</script>
```

样式部分保持不变（已有的 Less 样式全部保留）。

注意：侧边栏从 5 项减少为 3 项（仪表盘、实例管理、审批管理），机器人管理和系统设置不在本次范围内。

- [ ] **Step 3: 改造 UserDropdown.vue**

修改 `src/components/UserDropdown.vue`，在 `handleSelect` 中使用 router.push 代替 emit：

```typescript
import { useRouter } from 'vue-router'

const router = useRouter()

function handleSelect(key: string) {
  if (key === 'admin') {
    router.push('/admin/dashboard')
  }
}
```

移除 `navigateToAdmin` 的 emit 定义。

- [ ] **Step 4: 改造 AppHeader.vue**

由于 UserDropdown 现在内部处理路由跳转，AppHeader 不再需要 `navigateToAdmin` 事件。

修改 `src/components/AppHeader.vue`：

```vue
<template>
  <header class="app-header">
    <div class="header-left">
      <span class="header-logo">🦞</span>
      <span class="header-title">DevOps OpenClaw</span>
    </div>
    <div class="header-right">
      <UserDropdown :user="mockUser" />
    </div>
  </header>
</template>

<script setup lang="ts">
import UserDropdown from './UserDropdown.vue'
import { mockUser } from '@/mocks/data'
</script>
```

移除 emit 定义。样式保持不变。

- [ ] **Step 5: 验证编译通过**

```bash
cd /Users/dawinyuan/Documents/coder/devops-claw && npx vue-tsc --noEmit 2>&1 | head -30
```

- [ ] **Step 6: 手动验证**

```bash
cd /Users/dawinyuan/Documents/coder/devops-claw && npm run dev
```

验证：
1. 访问 `http://localhost:5173/` 显示员工端
2. 点击右上角用户头像 → 管理后台，跳转到 `/admin/dashboard`
3. 侧边栏菜单切换正常（dashboard / instances / approvals）
4. 点击"返回"回到员工端

- [ ] **Step 7: Commit**

```bash
git add src/App.vue src/components/admin/AdminLayout.vue src/components/AppHeader.vue src/components/UserDropdown.vue
git commit -m "$(cat <<'EOF'
feat: integrate vue-router into App.vue and AdminLayout

AdminLayout uses router-view instead of slot. UserDropdown navigates
via router.push. Employee-side keeps pageState pattern unchanged.
EOF
)"
```

---

### Task 3: 定义管理后台类型

**Files:**
- Create: `src/types/admin.ts`

- [ ] **Step 1: 创建类型定义文件**

创建 `src/types/admin.ts`：

```typescript
/** 虚拟机状态 */
export type VmStatus = 'running' | 'stopped' | 'error'

/** 飞书连接状态 */
export type FeishuConnectionStatus = 'connected' | 'pending' | 'disconnected'

/** 实例操作类型 */
export type InstanceAction = 'start' | 'stop' | 'restart' | 'delete'

/** 操作日志条目 */
export interface OperationLog {
  id: string
  action: string
  operator: string
  timestamp: string
  detail?: string
}

/** 实例基本信息（列表用） */
export interface Instance {
  id: string
  name: string
  avatarUrl: string
  ownerName: string
  ownerId: string
  vmStatus: VmStatus
  feishuStatus: FeishuConnectionStatus
  createdAt: string
  lastActiveAt: string
  appId?: string
}

/** 实例详情（抽屉用） */
export interface InstanceDetail extends Instance {
  ip: string
  cpuSpec: string
  memorySpec: string
  uptime: number // 运行时长（秒）
  gatewayHealthy: boolean
  openclawVersion: string
  logs: OperationLog[]
}

/** 实例列表筛选条件 */
export interface InstanceFilters {
  search: string
  status: VmStatus[]
  sort: 'createdAt' | 'lastActiveAt'
  order: 'asc' | 'desc'
}

/** 实例列表分页响应 */
export interface InstanceListResponse {
  items: Instance[]
  total: number
  page: number
  pageSize: number
}

/** 审批状态 */
export type ApprovalStatus = 'pending' | 'approved'

/** 审批记录 */
export interface Approval {
  id: string
  instanceId: string
  instanceName: string
  instanceAvatarUrl: string
  ownerName: string
  ownerAvatarUrl: string
  appId: string
  status: ApprovalStatus
  submittedAt: string
  approvedAt?: string
  feishuStatus: FeishuConnectionStatus
}

/** 仪表盘统计 */
export interface DashboardStats {
  totalInstances: number
  runningInstances: number
  stoppedInstances: number
  errorInstances: number
}

/** 仪表盘资源使用 */
export interface DashboardResources {
  cpu: number
  memory: number
  storage: number
  network: number
}
```

- [ ] **Step 2: 验证编译**

```bash
cd /Users/dawinyuan/Documents/coder/devops-claw && npx vue-tsc --noEmit 2>&1 | head -10
```

- [ ] **Step 3: Commit**

```bash
git add src/types/admin.ts
git commit -m "feat: add admin type definitions for instances and approvals"
```

---

### Task 4: 创建管理后台 mock 数据和 API handlers

**Files:**
- Create: `src/mocks/adminData.ts`
- Modify: `src/mocks/handlers.ts`
- Modify: `src/mocks/data.ts`

- [ ] **Step 1: 创建 adminData.ts**

创建 `src/mocks/adminData.ts`：

```typescript
import type {
  Instance,
  InstanceDetail,
  VmStatus,
  FeishuConnectionStatus,
  Approval,
  OperationLog,
} from '@/types/admin'

const vmStatuses: VmStatus[] = ['running', 'running', 'running', 'running', 'running', 'stopped', 'stopped', 'error', 'error', 'running']
const feishuStatuses: FeishuConnectionStatus[] = ['connected', 'connected', 'connected', 'pending', 'connected', 'disconnected', 'disconnected', 'disconnected', 'pending', 'connected']

const owners = [
  { id: 'u-001', name: '张三' },
  { id: 'u-002', name: '李四' },
  { id: 'u-003', name: '王五' },
  { id: 'u-004', name: '赵六' },
  { id: 'u-005', name: '孙七' },
  { id: 'u-006', name: '周八' },
  { id: 'u-007', name: '吴九' },
  { id: 'u-008', name: '郑十' },
  { id: 'u-009', name: '陈十一' },
  { id: 'u-010', name: '刘十二' },
]

const instanceNames = [
  '销售部 AI 助手',
  '技术部代码审查',
  '产品部需求分析',
  '设计部灵感助手',
  'HR 面试助手',
  '市场部内容生成',
  '财务部报表助手',
  '运维部监控助手',
  '客服部智能回复',
  '研发部文档助手',
]

function generateInstances(): Instance[] {
  return instanceNames.map((name, i) => {
    const daysAgo = Math.floor(Math.random() * 30)
    const createdAt = new Date()
    createdAt.setDate(createdAt.getDate() - daysAgo)

    const minutesAgo = vmStatuses[i] === 'running' ? Math.floor(Math.random() * 60) : Math.floor(Math.random() * 1440) + 60
    const lastActive = new Date()
    lastActive.setMinutes(lastActive.getMinutes() - minutesAgo)

    return {
      id: `inst-${String(i + 1).padStart(3, '0')}`,
      name,
      avatarUrl: `/avatars/avatar-${(i % 12) + 1}.svg`,
      ownerName: owners[i].name,
      ownerId: owners[i].id,
      vmStatus: vmStatuses[i],
      feishuStatus: feishuStatuses[i],
      createdAt: createdAt.toISOString(),
      lastActiveAt: lastActive.toISOString(),
      appId: `cli_a${String(i + 1).padStart(4, '0')}`,
    }
  })
}

let instances = generateInstances()

function generateLogs(instanceId: string): OperationLog[] {
  const actions = ['创建实例', '启动服务', '重启 Gateway', '更新配置', '连接飞书']
  const logs: OperationLog[] = []
  const count = 3 + Math.floor(Math.random() * 5)

  for (let i = 0; i < count; i++) {
    const ts = new Date()
    ts.setHours(ts.getHours() - i * 6)
    logs.push({
      id: `log-${instanceId}-${i}`,
      action: actions[i % actions.length],
      operator: owners[Math.floor(Math.random() * owners.length)].name,
      timestamp: ts.toISOString(),
      detail: i === 0 ? '操作成功' : undefined,
    })
  }
  return logs
}

export function getInstances(params: {
  search?: string
  status?: string
  sort?: string
  order?: string
  page?: number
  pageSize?: number
}): { items: Instance[]; total: number; page: number; pageSize: number } {
  let filtered = [...instances]

  if (params.search) {
    const q = params.search.toLowerCase()
    filtered = filtered.filter(
      (inst) => inst.name.toLowerCase().includes(q) || inst.ownerName.toLowerCase().includes(q),
    )
  }

  if (params.status) {
    const statuses = params.status.split(',')
    filtered = filtered.filter((inst) => statuses.includes(inst.vmStatus))
  }

  const sort = params.sort || 'createdAt'
  const order = params.order || 'desc'
  filtered.sort((a, b) => {
    const aVal = sort === 'lastActiveAt' ? a.lastActiveAt : a.createdAt
    const bVal = sort === 'lastActiveAt' ? b.lastActiveAt : b.createdAt
    return order === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
  })

  const page = params.page || 1
  const pageSize = params.pageSize || 10
  const start = (page - 1) * pageSize
  const items = filtered.slice(start, start + pageSize)

  return { items, total: filtered.length, page, pageSize }
}

export function getInstanceDetail(id: string): InstanceDetail | null {
  const inst = instances.find((i) => i.id === id)
  if (!inst) return null

  return {
    ...inst,
    ip: `10.0.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
    cpuSpec: '4 核',
    memorySpec: '8 GB',
    uptime: inst.vmStatus === 'running' ? Math.floor(Math.random() * 86400 * 7) : 0,
    gatewayHealthy: inst.vmStatus === 'running',
    openclawVersion: '1.4.2',
    logs: generateLogs(id),
  }
}

export function executeInstanceAction(id: string, action: string): Instance | null {
  const inst = instances.find((i) => i.id === id)
  if (!inst) return null

  switch (action) {
    case 'start':
      inst.vmStatus = 'running'
      inst.lastActiveAt = new Date().toISOString()
      break
    case 'stop':
      inst.vmStatus = 'stopped'
      break
    case 'restart':
      inst.vmStatus = 'running'
      inst.lastActiveAt = new Date().toISOString()
      break
    case 'delete':
      instances = instances.filter((i) => i.id !== id)
      return inst
  }
  return inst
}

// --- 审批数据 ---

const approvals: Approval[] = [
  {
    id: 'apr-001',
    instanceId: 'inst-004',
    instanceName: '设计部灵感助手',
    instanceAvatarUrl: '/avatars/avatar-4.svg',
    ownerName: '赵六',
    ownerAvatarUrl: '/avatars/default-user.svg',
    appId: 'cli_a0004',
    status: 'pending',
    submittedAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    feishuStatus: 'pending',
  },
  {
    id: 'apr-002',
    instanceId: 'inst-009',
    instanceName: '客服部智能回复',
    instanceAvatarUrl: '/avatars/avatar-9.svg',
    ownerName: '陈十一',
    ownerAvatarUrl: '/avatars/default-user.svg',
    appId: 'cli_a0009',
    status: 'pending',
    submittedAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    feishuStatus: 'pending',
  },
  {
    id: 'apr-003',
    instanceId: 'inst-new-1',
    instanceName: '法务部合同审查',
    instanceAvatarUrl: '/avatars/avatar-7.svg',
    ownerName: '钱十三',
    ownerAvatarUrl: '/avatars/default-user.svg',
    appId: 'cli_a0013',
    status: 'pending',
    submittedAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    feishuStatus: 'pending',
  },
  {
    id: 'apr-004',
    instanceId: 'inst-001',
    instanceName: '销售部 AI 助手',
    instanceAvatarUrl: '/avatars/avatar-1.svg',
    ownerName: '张三',
    ownerAvatarUrl: '/avatars/default-user.svg',
    appId: 'cli_a0001',
    status: 'approved',
    submittedAt: new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString(),
    approvedAt: new Date(Date.now() - 6 * 24 * 3600 * 1000).toISOString(),
    feishuStatus: 'connected',
  },
  {
    id: 'apr-005',
    instanceId: 'inst-002',
    instanceName: '技术部代码审查',
    instanceAvatarUrl: '/avatars/avatar-2.svg',
    ownerName: '李四',
    ownerAvatarUrl: '/avatars/default-user.svg',
    appId: 'cli_a0002',
    status: 'approved',
    submittedAt: new Date(Date.now() - 14 * 24 * 3600 * 1000).toISOString(),
    approvedAt: new Date(Date.now() - 13 * 24 * 3600 * 1000).toISOString(),
    feishuStatus: 'connected',
  },
]

export function getApprovals(status?: string): Approval[] {
  if (status) {
    return approvals.filter((a) => a.status === status)
  }
  return approvals
}

export function approveApproval(id: string): Approval | null {
  const approval = approvals.find((a) => a.id === id)
  if (!approval) return null

  approval.status = 'approved'
  approval.approvedAt = new Date().toISOString()
  approval.feishuStatus = 'connected'
  return approval
}
```

- [ ] **Step 2: 更新仪表盘 mock 数据**

修改 `src/mocks/data.ts` 中的 `getDashboardData` 函数，将 `pendingApproval` 改为 `stoppedInstances`，补充 `network` 字段：

```typescript
export function getDashboardData() {
  const days: string[] = []
  const counts: number[] = []
  const dayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

  for (let i = 6; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    days.push(i === 0 ? '今天' : dayNames[date.getDay()])
    counts.push(Math.floor(Math.random() * 5))
  }

  return {
    stats: {
      totalInstances: 12,
      runningInstances: 8,
      stoppedInstances: 2,
      errorInstances: 1,
    },
    resources: {
      cpu: 45,
      memory: 62,
      storage: 38,
      network: 27,
    },
    trend: days.map((day, i) => ({ day, count: counts[i] })),
    todos: [
      {
        id: 'todo-1',
        type: 'approval',
        icon: '⏳',
        title: '实例审批：销售部 OpenClaw',
        description: '申请人：张三，申请时间：2026-03-27',
        action: '去审批',
      },
      {
        id: 'todo-2',
        type: 'error',
        icon: '⚠️',
        title: '实例异常：技术部 Gateway',
        description: '错误：无法连接飞书长连接',
        action: '查看',
      },
    ] as Array<{ id: string; type: 'approval' | 'error' | 'info'; icon: string; title: string; description: string; action?: string }>,
  }
}
```

- [ ] **Step 3: 新增 admin API handlers**

在 `src/mocks/handlers.ts` 中新增 import 和 handlers：

在文件顶部添加导入：

```typescript
import {
  getInstances,
  getInstanceDetail,
  executeInstanceAction,
  getApprovals,
  approveApproval,
} from './adminData'
```

在 handlers 数组末尾添加：

```typescript
  // 管理后台 - 实例列表
  http.get('/api/admin/instances', async ({ request }) => {
    await delay(300)
    const url = new URL(request.url)
    const result = getInstances({
      search: url.searchParams.get('search') || undefined,
      status: url.searchParams.get('status') || undefined,
      sort: url.searchParams.get('sort') || undefined,
      order: url.searchParams.get('order') || undefined,
      page: Number(url.searchParams.get('page')) || undefined,
      pageSize: Number(url.searchParams.get('pageSize')) || undefined,
    })
    return HttpResponse.json(result)
  }),

  // 管理后台 - 实例详情
  http.get('/api/admin/instances/:id', async ({ params }) => {
    await delay(200)
    const detail = getInstanceDetail(params.id as string)
    if (!detail) {
      return new HttpResponse(null, { status: 404 })
    }
    return HttpResponse.json(detail)
  }),

  // 管理后台 - 实例操作
  http.post('/api/admin/instances/:id/action', async ({ params, request }) => {
    await delay(500)
    const body = (await request.json()) as { action: string }
    const result = executeInstanceAction(params.id as string, body.action)
    if (!result) {
      return new HttpResponse(null, { status: 404 })
    }
    return HttpResponse.json(result)
  }),

  // 管理后台 - 审批列表
  http.get('/api/admin/approvals', async ({ request }) => {
    await delay(300)
    const url = new URL(request.url)
    const status = url.searchParams.get('status') || undefined
    const result = getApprovals(status)
    return HttpResponse.json(result)
  }),

  // 管理后台 - 标记审批完成
  http.post('/api/admin/approvals/:id/approve', async ({ params }) => {
    await delay(500)
    const result = approveApproval(params.id as string)
    if (!result) {
      return new HttpResponse(null, { status: 404 })
    }
    return HttpResponse.json(result)
  }),
```

- [ ] **Step 4: 验证编译**

```bash
cd /Users/dawinyuan/Documents/coder/devops-claw && npx vue-tsc --noEmit 2>&1 | head -10
```

- [ ] **Step 5: Commit**

```bash
git add src/mocks/adminData.ts src/mocks/data.ts src/mocks/handlers.ts
git commit -m "$(cat <<'EOF'
feat: add admin mock data and API handlers

Mock data for 10 instances and 5 approvals. Handlers for instance
CRUD, approval list and approve action. Dashboard data updated
with stoppedInstances and network fields.
EOF
)"
```

---

### Task 5: 创建管理后台 store

**Files:**
- Create: `src/stores/admin.ts`

- [ ] **Step 1: 创建 admin store**

创建 `src/stores/admin.ts`：

```typescript
import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import type {
  Instance,
  InstanceDetail,
  InstanceFilters,
  InstanceAction,
  Approval,
  ApprovalStatus,
} from '@/types/admin'

export const useAdminStore = defineStore('admin', () => {
  // --- 实例管理 ---
  const instances = ref<Instance[]>([])
  const instanceTotal = ref(0)
  const instancePage = ref(1)
  const instancePageSize = ref(10)
  const instanceLoading = ref(false)
  const selectedInstance = ref<InstanceDetail | null>(null)
  const drawerVisible = ref(false)

  const filters = reactive<InstanceFilters>({
    search: '',
    status: [],
    sort: 'createdAt',
    order: 'desc',
  })

  async function fetchInstances() {
    instanceLoading.value = true
    try {
      const params = new URLSearchParams()
      if (filters.search) params.set('search', filters.search)
      if (filters.status.length) params.set('status', filters.status.join(','))
      params.set('sort', filters.sort)
      params.set('order', filters.order)
      params.set('page', String(instancePage.value))
      params.set('pageSize', String(instancePageSize.value))

      const res = await fetch(`/api/admin/instances?${params}`)
      if (res.ok) {
        const data = await res.json()
        instances.value = data.items
        instanceTotal.value = data.total
      }
    } finally {
      instanceLoading.value = false
    }
  }

  async function fetchInstanceDetail(id: string) {
    try {
      const res = await fetch(`/api/admin/instances/${id}`)
      if (res.ok) {
        selectedInstance.value = await res.json()
        drawerVisible.value = true
      }
    } catch {
      // 静默失败
    }
  }

  async function executeAction(id: string, action: InstanceAction) {
    try {
      const res = await fetch(`/api/admin/instances/${id}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      })
      if (res.ok) {
        await fetchInstances()
        if (selectedInstance.value?.id === id) {
          if (action === 'delete') {
            closeDrawer()
          } else {
            await fetchInstanceDetail(id)
          }
        }
      }
      return res.ok
    } catch {
      return false
    }
  }

  function closeDrawer() {
    drawerVisible.value = false
    selectedInstance.value = null
  }

  // --- 审批管理 ---
  const approvals = ref<Approval[]>([])
  const approvalLoading = ref(false)
  const approvalTab = ref<ApprovalStatus>('pending')

  async function fetchApprovals(status?: ApprovalStatus) {
    approvalLoading.value = true
    try {
      const s = status ?? approvalTab.value
      const res = await fetch(`/api/admin/approvals?status=${s}`)
      if (res.ok) {
        approvals.value = await res.json()
      }
    } finally {
      approvalLoading.value = false
    }
  }

  async function approveInstance(id: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/admin/approvals/${id}/approve`, {
        method: 'POST',
      })
      if (res.ok) {
        await fetchApprovals()
        return true
      }
      return false
    } catch {
      return false
    }
  }

  return {
    // 实例
    instances,
    instanceTotal,
    instancePage,
    instancePageSize,
    instanceLoading,
    selectedInstance,
    drawerVisible,
    filters,
    fetchInstances,
    fetchInstanceDetail,
    executeAction,
    closeDrawer,
    // 审批
    approvals,
    approvalLoading,
    approvalTab,
    fetchApprovals,
    approveInstance,
  }
})
```

- [ ] **Step 2: 验证编译**

```bash
cd /Users/dawinyuan/Documents/coder/devops-claw && npx vue-tsc --noEmit 2>&1 | head -10
```

- [ ] **Step 3: Commit**

```bash
git add src/stores/admin.ts
git commit -m "feat: add admin Pinia store for instances and approvals"
```

---

### Task 6: 完善仪表盘页面

**Files:**
- Modify: `src/views/admin/AdminDashboard.vue`

- [ ] **Step 1: 更新统计卡片**

在 `AdminDashboard.vue` 中，将第 3 个统计卡片从"待审批"改为"已停止"：

将：
```html
      <div class="stat-card">
        <div class="stat-icon pending">⏳</div>
        <div class="stat-info">
          <div class="stat-value">{{ stats.pendingApproval }}</div>
          <div class="stat-label">待审批</div>
        </div>
      </div>
```

改为：
```html
      <div class="stat-card clickable" @click="navigateTo('/admin/instances', { status: 'stopped' })">
        <div class="stat-icon stopped">🔴</div>
        <div class="stat-info">
          <div class="stat-value">{{ stats.stoppedInstances }}</div>
          <div class="stat-label">已停止</div>
        </div>
      </div>
```

同样为其他 3 个统计卡片添加 `clickable` class 和点击事件：

- 实例总数：`@click="navigateTo('/admin/instances')"`
- 运行中：`@click="navigateTo('/admin/instances', { status: 'running' })"`
- 异常：`@click="navigateTo('/admin/instances', { status: 'error' })"`

- [ ] **Step 2: 添加网络进度条**

在资源使用区域的存储进度条后面，追加网络进度条：

```html
          <div class="resource-item">
            <div class="resource-header">
              <span class="resource-name">网络</span>
              <span class="resource-value">{{ resources.network }}%</span>
            </div>
            <n-progress :percentage="resources.network" :show-indicator="false" :height="8" type="line" color="#409eff" />
          </div>
```

更新 `ResourceUsage` interface 添加 `network: number`。

- [ ] **Step 3: 实现导航和待办操作**

在 `<script setup>` 中添加：

```typescript
import { useRouter } from 'vue-router'

const router = useRouter()

function navigateTo(path: string, query?: Record<string, string>) {
  router.push({ path, query })
}

function handleTodoAction(item: TodoItem) {
  if (item.type === 'approval') {
    router.push('/admin/approvals')
  } else if (item.type === 'error') {
    router.push({ path: '/admin/instances', query: { status: 'error' } })
  }
}
```

- [ ] **Step 4: 添加 clickable 样式和 stopped 图标样式**

在 `<style>` 中追加：

```less
.stat-card.clickable {
  cursor: pointer;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
  }
}

.stat-icon.stopped {
  background: fade(#909399, 10%);
}
```

- [ ] **Step 5: 验证编译和运行**

```bash
cd /Users/dawinyuan/Documents/coder/devops-claw && npx vue-tsc --noEmit 2>&1 | head -10
```

手动验证：访问 `/admin/dashboard`，确认统计卡片、网络指标、待办操作跳转均正常。

- [ ] **Step 6: Commit**

```bash
git add src/views/admin/AdminDashboard.vue
git commit -m "$(cat <<'EOF'
feat: improve admin dashboard with clickable stats and network metric

Replace pending approval stat with stopped instances count. Add
network bandwidth progress bar. Wire up todo actions and stat cards
to navigate to instances/approvals pages with filter params.
EOF
)"
```

---

### Task 7: 实现实例表格组件

**Files:**
- Create: `src/components/admin/InstanceTable.vue`

- [ ] **Step 1: 创建 InstanceTable 组件**

创建 `src/components/admin/InstanceTable.vue`：

```vue
<template>
  <n-data-table
    :columns="columns"
    :data="instances"
    :loading="loading"
    :row-key="(row: Instance) => row.id"
    :bordered="false"
    size="medium"
    @update:page="emit('update:page', $event)"
  />
</template>

<script setup lang="ts">
import { h } from 'vue'
import { NDataTable, NTag, NButton, NAvatar, NDropdown, NSpace } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import type { Instance, VmStatus, FeishuConnectionStatus, InstanceAction } from '@/types/admin'

defineProps<{
  instances: Instance[]
  loading: boolean
}>()

const emit = defineEmits<{
  select: [instance: Instance]
  action: [id: string, action: InstanceAction]
  'update:page': [page: number]
}>()

const vmStatusMap: Record<VmStatus, { label: string; type: 'success' | 'default' | 'error' }> = {
  running: { label: '运行中', type: 'success' },
  stopped: { label: '已停止', type: 'default' },
  error: { label: '异常', type: 'error' },
}

const feishuStatusMap: Record<FeishuConnectionStatus, { label: string; type: 'success' | 'warning' | 'error' }> = {
  connected: { label: '已连接', type: 'success' },
  pending: { label: '待配置', type: 'warning' },
  disconnected: { label: '断开', type: 'error' },
}

function formatRelativeTime(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes}分钟前`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}小时前`
  const days = Math.floor(hours / 24)
  return `${days}天前`
}

function formatDate(isoString: string): string {
  const d = new Date(isoString)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

const moreOptions = [
  { label: '强制删除', key: 'delete' },
]

const columns: DataTableColumns<Instance> = [
  {
    title: '实例名称',
    key: 'name',
    render(row) {
      return h(
        'div',
        {
          style: 'display:flex;align-items:center;gap:8px;cursor:pointer',
          onClick: () => emit('select', row),
        },
        [
          h(NAvatar, { src: row.avatarUrl, round: true, size: 28 }),
          h('span', { style: 'font-weight:500;color:#30363e' }, row.name),
        ],
      )
    },
  },
  {
    title: '所属员工',
    key: 'ownerName',
    width: 100,
  },
  {
    title: '虚拟机状态',
    key: 'vmStatus',
    width: 110,
    render(row) {
      const s = vmStatusMap[row.vmStatus]
      return h(NTag, { type: s.type, size: 'small', round: true }, () => s.label)
    },
  },
  {
    title: '飞书连接',
    key: 'feishuStatus',
    width: 110,
    render(row) {
      const s = feishuStatusMap[row.feishuStatus]
      return h(NTag, { type: s.type, size: 'small', round: true }, () => s.label)
    },
  },
  {
    title: '创建时间',
    key: 'createdAt',
    width: 160,
    render(row) {
      return formatDate(row.createdAt)
    },
  },
  {
    title: '最后活跃',
    key: 'lastActiveAt',
    width: 110,
    render(row) {
      return formatRelativeTime(row.lastActiveAt)
    },
  },
  {
    title: '操作',
    key: 'actions',
    width: 200,
    render(row) {
      const isRunning = row.vmStatus === 'running'
      return h(NSpace, { size: 4 }, () => [
        isRunning
          ? h(NButton, { size: 'small', quaternary: true, type: 'warning', onClick: () => emit('action', row.id, 'stop') }, () => '停止')
          : h(NButton, { size: 'small', quaternary: true, type: 'success', onClick: () => emit('action', row.id, 'start') }, () => '启动'),
        h(NButton, { size: 'small', quaternary: true, type: 'info', onClick: () => emit('action', row.id, 'restart') }, () => '重启'),
        h(NDropdown, {
          options: moreOptions,
          trigger: 'click',
          onSelect: (key: string) => emit('action', row.id, key as InstanceAction),
        }, () => h(NButton, { size: 'small', quaternary: true }, () => '...')),
      ])
    },
  },
]
</script>
```

- [ ] **Step 2: 验证编译**

```bash
cd /Users/dawinyuan/Documents/coder/devops-claw && npx vue-tsc --noEmit 2>&1 | head -10
```

- [ ] **Step 3: Commit**

```bash
git add src/components/admin/InstanceTable.vue
git commit -m "feat: add InstanceTable component with status tags and actions"
```

---

### Task 8: 实现实例详情抽屉组件

**Files:**
- Create: `src/components/admin/InstanceDrawer.vue`

- [ ] **Step 1: 创建 InstanceDrawer 组件**

创建 `src/components/admin/InstanceDrawer.vue`：

```vue
<template>
  <n-drawer :show="show" :width="480" placement="right" @update:show="emit('update:show', $event)">
    <n-drawer-content :title="detail?.name ?? '实例详情'" closable>
      <template v-if="detail">
        <!-- 基本信息 -->
        <div class="drawer-section">
          <h4 class="section-title">基本信息</h4>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">项目名称</span>
              <span class="info-value">{{ detail.name }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">所属员工</span>
              <span class="info-value">{{ detail.ownerName }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">App ID</span>
              <span class="info-value">{{ maskAppId(detail.appId) }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">创建时间</span>
              <span class="info-value">{{ formatDate(detail.createdAt) }}</span>
            </div>
          </div>
        </div>

        <!-- 虚拟机信息 -->
        <div class="drawer-section">
          <h4 class="section-title">虚拟机信息</h4>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">IP 地址</span>
              <span class="info-value">{{ detail.ip }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">规格</span>
              <span class="info-value">{{ detail.cpuSpec }} / {{ detail.memorySpec }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">运行时长</span>
              <span class="info-value">{{ formatUptime(detail.uptime) }}</span>
            </div>
          </div>
        </div>

        <!-- 服务状态 -->
        <div class="drawer-section">
          <h4 class="section-title">服务状态</h4>
          <div class="status-list">
            <div class="status-item">
              <span class="status-dot" :class="detail.gatewayHealthy ? 'healthy' : 'unhealthy'" />
              <span>Gateway</span>
              <span class="status-text">{{ detail.gatewayHealthy ? '健康' : '异常' }}</span>
            </div>
            <div class="status-item">
              <span class="status-dot healthy" />
              <span>OpenClaw</span>
              <span class="status-text">v{{ detail.openclawVersion }}</span>
            </div>
            <div class="status-item">
              <span class="status-dot" :class="feishuDotClass" />
              <span>飞书长连接</span>
              <span class="status-text">{{ feishuStatusLabel }}</span>
            </div>
          </div>
        </div>

        <!-- 操作日志 -->
        <div class="drawer-section">
          <h4 class="section-title">操作日志</h4>
          <n-timeline>
            <n-timeline-item
              v-for="log in detail.logs"
              :key="log.id"
              :title="log.action"
              :content="log.operator + (log.detail ? ' — ' + log.detail : '')"
              :time="formatDate(log.timestamp)"
            />
          </n-timeline>
        </div>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NDrawer, NDrawerContent, NTimeline, NTimelineItem } from 'naive-ui'
import type { InstanceDetail, FeishuConnectionStatus } from '@/types/admin'

const props = defineProps<{
  show: boolean
  detail: InstanceDetail | null
}>()

const emit = defineEmits<{
  'update:show': [value: boolean]
}>()

function maskAppId(appId?: string): string {
  if (!appId) return '-'
  if (appId.length <= 8) return appId
  return appId.slice(0, 6) + '****' + appId.slice(-4)
}

function formatDate(isoString: string): string {
  const d = new Date(isoString)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function formatUptime(seconds: number): string {
  if (seconds === 0) return '已停止'
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  if (days > 0) return `${days}天 ${hours}小时`
  const minutes = Math.floor((seconds % 3600) / 60)
  return `${hours}小时 ${minutes}分钟`
}

const feishuStatusMap: Record<FeishuConnectionStatus, { label: string; dotClass: string }> = {
  connected: { label: '已连接', dotClass: 'healthy' },
  pending: { label: '待配置', dotClass: 'warning' },
  disconnected: { label: '断开', dotClass: 'unhealthy' },
}

const feishuStatusLabel = computed(() =>
  props.detail ? feishuStatusMap[props.detail.feishuStatus].label : '',
)

const feishuDotClass = computed(() =>
  props.detail ? feishuStatusMap[props.detail.feishuStatus].dotClass : '',
)
</script>

<style lang="less" scoped>
.drawer-section {
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid @borderColor;

  &:last-child {
    border-bottom: none;
  }
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: @textColorTitle;
  margin-bottom: 12px;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-label {
  font-size: 12px;
  color: @textColorSecondary;
}

.info-value {
  font-size: 14px;
  color: @textColorBody;
  word-break: break-all;
}

.status-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: @textColorBody;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;

  &.healthy {
    background: #00b81f;
  }

  &.unhealthy {
    background: #f23030;
  }

  &.warning {
    background: #ff8800;
  }
}

.status-text {
  margin-left: auto;
  font-size: 13px;
  color: @textColorSecondary;
}
</style>
```

- [ ] **Step 2: 验证编译**

```bash
cd /Users/dawinyuan/Documents/coder/devops-claw && npx vue-tsc --noEmit 2>&1 | head -10
```

- [ ] **Step 3: Commit**

```bash
git add src/components/admin/InstanceDrawer.vue
git commit -m "feat: add InstanceDrawer component with detail sections and timeline"
```

---

### Task 9: 实现实例管理页面

**Files:**
- Modify: `src/views/admin/InstanceList.vue`

- [ ] **Step 1: 替换 InstanceList.vue 占位内容**

将 `src/views/admin/InstanceList.vue` 替换为完整实现：

```vue
<template>
  <div class="instance-list">
    <!-- 工具栏 -->
    <div class="toolbar">
      <n-input
        v-model:value="adminStore.filters.search"
        placeholder="搜索实例名称或员工"
        clearable
        size="medium"
        style="width: 240px"
        @update:value="debouncedFetch"
      >
        <template #prefix>
          <n-icon :component="SearchOutline" />
        </template>
      </n-input>

      <n-select
        v-model:value="adminStore.filters.status"
        :options="statusOptions"
        placeholder="状态筛选"
        multiple
        clearable
        size="medium"
        style="width: 200px"
        @update:value="handleFetch"
      />

      <div class="toolbar-spacer" />

      <n-select
        v-model:value="adminStore.filters.sort"
        :options="sortOptions"
        size="medium"
        style="width: 150px"
        @update:value="handleFetch"
      />

      <n-button
        quaternary
        size="medium"
        @click="toggleOrder"
      >
        {{ adminStore.filters.order === 'desc' ? '↓ 降序' : '↑ 升序' }}
      </n-button>
    </div>

    <!-- 表格 -->
    <InstanceTable
      :instances="adminStore.instances"
      :loading="adminStore.instanceLoading"
      @select="handleSelect"
      @action="handleAction"
    />

    <!-- 分页 -->
    <div class="pagination-wrapper" v-if="adminStore.instanceTotal > adminStore.instancePageSize">
      <n-pagination
        v-model:page="adminStore.instancePage"
        :page-size="adminStore.instancePageSize"
        :item-count="adminStore.instanceTotal"
        @update:page="handleFetch"
      />
    </div>

    <!-- 抽屉 -->
    <InstanceDrawer
      :show="adminStore.drawerVisible"
      :detail="adminStore.selectedInstance"
      @update:show="(v: boolean) => { if (!v) adminStore.closeDrawer() }"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { NInput, NSelect, NButton, NIcon, NPagination } from 'naive-ui'
import { SearchOutline } from '@vicons/ionicons5'
import { useAdminStore } from '@/stores/admin'
import InstanceTable from '@/components/admin/InstanceTable.vue'
import InstanceDrawer from '@/components/admin/InstanceDrawer.vue'
import type { Instance, InstanceAction, VmStatus } from '@/types/admin'

const adminStore = useAdminStore()
const route = useRoute()

const statusOptions = [
  { label: '运行中', value: 'running' },
  { label: '已停止', value: 'stopped' },
  { label: '异常', value: 'error' },
]

const sortOptions = [
  { label: '创建时间', value: 'createdAt' },
  { label: '最后活跃', value: 'lastActiveAt' },
]

let debounceTimer: ReturnType<typeof setTimeout> | null = null
function debouncedFetch() {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    adminStore.instancePage = 1
    adminStore.fetchInstances()
  }, 300)
}

function handleFetch() {
  adminStore.instancePage = 1
  adminStore.fetchInstances()
}

function toggleOrder() {
  adminStore.filters.order = adminStore.filters.order === 'desc' ? 'asc' : 'desc'
  handleFetch()
}

function handleSelect(instance: Instance) {
  adminStore.fetchInstanceDetail(instance.id)
}

function handleAction(id: string, action: InstanceAction) {
  adminStore.executeAction(id, action)
}

onMounted(() => {
  // 从 query 参数读取初始筛选条件
  const statusQuery = route.query.status as string | undefined
  if (statusQuery) {
    adminStore.filters.status = statusQuery.split(',') as VmStatus[]
  }
  adminStore.fetchInstances()
})
</script>

<style lang="less" scoped>
.instance-list {
  max-width: 1200px;
  margin: 0 auto;
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.toolbar-spacer {
  flex: 1;
}

.pagination-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}
</style>
```

- [ ] **Step 2: 验证编译**

```bash
cd /Users/dawinyuan/Documents/coder/devops-claw && npx vue-tsc --noEmit 2>&1 | head -10
```

- [ ] **Step 3: 手动验证**

```bash
cd /Users/dawinyuan/Documents/coder/devops-claw && npm run dev
```

访问 `/admin/instances`，验证：
1. 表格显示 mock 数据
2. 搜索、状态筛选、排序正常工作
3. 点击实例名称打开抽屉
4. 操作按钮（启动/停止/重启/删除）可点击

- [ ] **Step 4: Commit**

```bash
git add src/views/admin/InstanceList.vue
git commit -m "feat: implement InstanceList page with toolbar, table, and drawer"
```

---

### Task 10: 实现审批卡片和引导组件

**Files:**
- Create: `src/components/admin/ApprovalGuide.vue`
- Create: `src/components/admin/ApprovalCard.vue`

- [ ] **Step 1: 创建 ApprovalGuide 组件**

创建 `src/components/admin/ApprovalGuide.vue`：

```vue
<template>
  <n-collapse>
    <n-collapse-item title="配置引导" name="guide">
      <n-timeline>
        <n-timeline-item title="步骤 1" content="登录飞书开放平台，找到对应应用" />
        <n-timeline-item title="步骤 2" content="配置 WebSocket 长连接地址" />
        <n-timeline-item title="步骤 3" content="添加事件订阅" />
        <n-timeline-item title="步骤 4" content="发布应用版本" />
      </n-timeline>
    </n-collapse-item>
  </n-collapse>
</template>

<script setup lang="ts">
import { NCollapse, NCollapseItem, NTimeline, NTimelineItem } from 'naive-ui'
</script>
```

- [ ] **Step 2: 创建 ApprovalCard 组件**

创建 `src/components/admin/ApprovalCard.vue`：

```vue
<template>
  <n-card class="approval-card" :bordered="true" size="medium">
    <!-- 头部 -->
    <div class="card-header">
      <div class="header-left">
        <n-avatar :src="approval.ownerAvatarUrl" round :size="32">
          {{ approval.ownerName.charAt(0) }}
        </n-avatar>
        <div class="header-info">
          <span class="owner-name">{{ approval.ownerName }}</span>
          <span class="submit-time">{{ formatRelativeTime(approval.submittedAt) }}</span>
        </div>
      </div>
      <n-tag
        :type="approval.status === 'approved' ? 'success' : 'warning'"
        size="small"
        round
      >
        {{ approval.status === 'approved' ? '已通过' : '待审批' }}
      </n-tag>
    </div>

    <!-- 信息区 -->
    <div class="card-body">
      <div class="info-row">
        <n-avatar :src="approval.instanceAvatarUrl" round :size="24" />
        <span class="instance-name">{{ approval.instanceName }}</span>
      </div>
      <div class="info-row">
        <span class="info-label">App ID：</span>
        <span class="info-value">{{ maskAppId(approval.appId) }}</span>
      </div>
    </div>

    <!-- 配置引导（仅待审批） -->
    <ApprovalGuide v-if="approval.status === 'pending'" />

    <!-- 操作区（仅待审批） -->
    <div v-if="approval.status === 'pending'" class="card-actions">
      <n-button text type="primary" tag="a" href="https://open.feishu.cn" target="_blank">
        去配置
      </n-button>
      <n-button type="primary" size="small" :loading="approving" @click="handleApprove">
        标记完成
      </n-button>
    </div>

    <!-- 已审批信息 -->
    <div v-if="approval.status === 'approved' && approval.approvedAt" class="card-footer">
      <span class="footer-text">审批时间：{{ formatDate(approval.approvedAt) }}</span>
    </div>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NCard, NAvatar, NTag, NButton, useDialog } from 'naive-ui'
import type { Approval } from '@/types/admin'
import ApprovalGuide from './ApprovalGuide.vue'

const props = defineProps<{
  approval: Approval
}>()

const emit = defineEmits<{
  approve: [id: string]
}>()

const approving = ref(false)
const dialog = useDialog()

function maskAppId(appId: string): string {
  if (appId.length <= 8) return appId
  return appId.slice(0, 6) + '****' + appId.slice(-4)
}

function formatRelativeTime(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes}分钟前`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}小时前`
  const days = Math.floor(hours / 24)
  return `${days}天前`
}

function formatDate(isoString: string): string {
  const d = new Date(isoString)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function handleApprove() {
  dialog.warning({
    title: '确认审批',
    content: '确认已完成飞书长连接配置？',
    positiveText: '确认',
    negativeText: '取消',
    onPositiveClick: async () => {
      approving.value = true
      emit('approve', props.approval.id)
      approving.value = false
    },
  })
}
</script>

<style lang="less" scoped>
.approval-card {
  margin-bottom: 16px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-info {
  display: flex;
  flex-direction: column;
}

.owner-name {
  font-size: 14px;
  font-weight: 500;
  color: @textColorTitle;
}

.submit-time {
  font-size: 12px;
  color: @textColorSecondary;
}

.card-body {
  margin-bottom: 12px;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 14px;
}

.instance-name {
  font-weight: 500;
  color: @textColorBody;
}

.info-label {
  color: @textColorSecondary;
}

.info-value {
  color: @textColorBody;
  font-family: monospace;
}

.card-actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid @borderColor;
}

.card-footer {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid @borderColor;
}

.footer-text {
  font-size: 12px;
  color: @textColorSecondary;
}
</style>
```

- [ ] **Step 3: 验证编译**

```bash
cd /Users/dawinyuan/Documents/coder/devops-claw && npx vue-tsc --noEmit 2>&1 | head -10
```

- [ ] **Step 4: Commit**

```bash
git add src/components/admin/ApprovalGuide.vue src/components/admin/ApprovalCard.vue
git commit -m "feat: add ApprovalCard and ApprovalGuide components"
```

---

### Task 11: 实现审批管理页面

**Files:**
- Modify: `src/views/admin/ApprovalBoard.vue`

- [ ] **Step 1: 替换 ApprovalBoard.vue 占位内容**

将 `src/views/admin/ApprovalBoard.vue` 替换为完整实现：

```vue
<template>
  <div class="approval-board">
    <div class="board-header">
      <h2 class="board-title">审批管理</h2>
      <n-tabs v-model:value="adminStore.approvalTab" type="segment" size="medium" @update:value="handleTabChange">
        <n-tab-pane name="pending" tab="待审批" />
        <n-tab-pane name="approved" tab="已审批" />
      </n-tabs>
    </div>

    <n-spin :show="adminStore.approvalLoading">
      <div v-if="adminStore.approvals.length === 0" class="empty-state">
        <span class="empty-icon">{{ adminStore.approvalTab === 'pending' ? '✅' : '📋' }}</span>
        <p>{{ adminStore.approvalTab === 'pending' ? '暂无待审批项' : '暂无审批记录' }}</p>
      </div>

      <div v-else class="card-list">
        <ApprovalCard
          v-for="approval in adminStore.approvals"
          :key="approval.id"
          :approval="approval"
          @approve="handleApprove"
        />
      </div>
    </n-spin>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { NTabs, NTabPane, NSpin, useMessage } from 'naive-ui'
import { useAdminStore } from '@/stores/admin'
import ApprovalCard from '@/components/admin/ApprovalCard.vue'
import type { ApprovalStatus } from '@/types/admin'

const adminStore = useAdminStore()
const message = useMessage()

function handleTabChange(tab: ApprovalStatus) {
  adminStore.fetchApprovals(tab)
}

async function handleApprove(id: string) {
  const success = await adminStore.approveInstance(id)
  if (success) {
    message.success('审批通过，飞书长连接已就绪')
  } else {
    message.error('连接验证失败，请检查配置')
  }
}

onMounted(() => {
  adminStore.fetchApprovals()
})
</script>

<style lang="less" scoped>
.approval-board {
  max-width: 800px;
  margin: 0 auto;
}

.board-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.board-title {
  font-size: 18px;
  font-weight: 600;
  color: @textColorTitle;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 0;
  color: @textColorSecondary;
  font-size: 14px;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.card-list {
  display: flex;
  flex-direction: column;
}
</style>
```

- [ ] **Step 2: 验证编译**

```bash
cd /Users/dawinyuan/Documents/coder/devops-claw && npx vue-tsc --noEmit 2>&1 | head -10
```

- [ ] **Step 3: 手动验证**

```bash
cd /Users/dawinyuan/Documents/coder/devops-claw && npm run dev
```

访问 `/admin/approvals`，验证：
1. 待审批 Tab 显示 3 张卡片
2. 已审批 Tab 显示 2 张卡片
3. 展开/收起配置引导正常
4. 点击"标记完成" → 确认对话框 → 卡片消失 → 切换到已审批 Tab 可见

- [ ] **Step 4: Commit**

```bash
git add src/views/admin/ApprovalBoard.vue
git commit -m "feat: implement ApprovalBoard page with tabs and card flow"
```

---

### Task 12: 全流程集成验证和清理

**Files:**
- Modify: `src/types/project.ts` (可能需要移除 `admin_dashboard` 状态)
- Modify: `src/stores/project.ts` (移除 `showAdminDashboard` 相关代码)

- [ ] **Step 1: 清理 project store 中不再需要的 admin_dashboard 状态**

由于管理后台现在由 vue-router 管理，`pageState` 不再需要 `admin_dashboard` 值。

修改 `src/types/project.ts`，将：
```typescript
export type PageState = 'loading' | 'empty' | 'has_project' | 'admin' | 'admin_dashboard'
```
改为：
```typescript
export type PageState = 'loading' | 'empty' | 'has_project' | 'admin'
```

修改 `src/stores/project.ts`，移除 `showAdminDashboard` 函数。

- [ ] **Step 2: 验证编译**

```bash
cd /Users/dawinyuan/Documents/coder/devops-claw && npx vue-tsc --noEmit 2>&1 | head -20
```

检查是否有引用 `showAdminDashboard` 或 `admin_dashboard` 的地方，修复编译错误。

- [ ] **Step 3: 全流程验证**

```bash
cd /Users/dawinyuan/Documents/coder/devops-claw && npm run dev
```

完整验证清单：
1. `/` — 员工端首页正常（落地页 → 创建 → 项目卡片）
2. 右上角用户菜单 → 管理后台 → 跳转到 `/admin/dashboard`
3. `/admin/dashboard` — 仪表盘：4 个统计卡片可点击、资源使用含网络、待办操作可跳转
4. `/admin/instances` — 实例管理：表格展示、搜索筛选、排序、抽屉详情、操作按钮
5. `/admin/instances?status=error` — 从仪表盘异常卡片跳转，自动筛选
6. `/admin/approvals` — 审批管理：Tab 切换、卡片展示、标记完成
7. 侧边栏菜单高亮正确跟随路由
8. "返回"按钮回到员工端首页

- [ ] **Step 4: Commit**

```bash
git add src/types/project.ts src/stores/project.ts
git commit -m "$(cat <<'EOF'
refactor: remove admin_dashboard pageState after router migration

Admin dashboard is now handled by vue-router at /admin/dashboard.
Remove showAdminDashboard from project store and admin_dashboard
from PageState type.
EOF
)"
```
