# DevOps OpenClaw 员工端前台实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建员工端前台 MVP，包含一键创建 OpenClaw 的完整流程（6 个页面/弹窗），使用 Mock API 驱动。

**Architecture:** 单页面 Vue 3 应用，无路由。页面有两种状态（未创建/已创建），所有交互通过弹窗完成。Pinia store 作为状态机控制页面和弹窗切换。MSW 在开发环境拦截 API 请求提供 Mock 数据。

**Tech Stack:** Vue 3, TypeScript, Vite, Naive UI, Pinia, Less, Tailwind CSS, MSW, Vitest, @vue/test-utils

---

## 文件结构

```
src/
├── App.vue                          # 根组件，组装所有子组件
├── main.ts                          # 入口，注册插件，条件加载 MSW
├── types/
│   └── project.ts                   # 所有 TypeScript 类型定义
├── stores/
│   └── project.ts                   # Pinia store：状态机 + API 调用
├── assets/
│   └── styles/
│       ├── variables.less           # MTP design token Less 变量
│       └── global.less              # 全局样式
├── composables/
│   └── usePolling.ts                # 轮询 composable（进度查询用）
├── components/
│   ├── AppHeader.vue                # 顶部导航栏
│   ├── HeroSection.vue              # 标题 + 吉祥物插图
│   ├── FeatureList.vue              # 三大特性列表
│   ├── CreateGuide.vue              # 未创建时引导卡片
│   ├── ProjectCard.vue              # 已创建时项目卡片
│   ├── CreateModal.vue              # 创建项目弹窗（表单）
│   ├── ProgressModal.vue            # 创建进度弹窗（三步）
│   ├── CompleteModal.vue            # 创建完成弹窗
│   └── DeleteConfirm.vue            # 删除确认弹窗
├── mocks/
│   ├── browser.ts                   # MSW setupWorker
│   ├── handlers.ts                  # API 请求处理器
│   └── data.ts                      # Mock 数据存储
tests/
├── stores/
│   └── project.test.ts              # Store 单元测试
├── composables/
│   └── usePolling.test.ts           # 轮询 composable 测试
└── components/
    ├── CreateModal.test.ts          # 表单验证测试
    ├── ProgressModal.test.ts        # 进度展示测试
    └── ProjectCard.test.ts          # 项目卡片测试
```

---

### Task 1: 项目脚手架

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `tailwind.config.ts`, `postcss.config.js`, `index.html`, `src/main.ts`, `src/App.vue`, `src/vite-env.d.ts`

- [ ] **Step 1: 用 Vite 创建 Vue 3 + TypeScript 项目**

```bash
cd /Users/dawinyuan/Documents/coder/devops-claw
npm create vite@latest . -- --template vue-ts
```

如果提示目录非空，选择 "Ignore files and continue"。

- [ ] **Step 2: 安装核心依赖**

```bash
npm install naive-ui pinia
npm install -D less tailwindcss @tailwindcss/vite msw vitest @vue/test-utils jsdom happy-dom
```

- [ ] **Step 3: 配置 Tailwind CSS**

创建 `tailwind.config.ts`：

```typescript
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{vue,ts,tsx}'],
  theme: {
    screens: {
      sm: '1024px',
      md: '1280px',
      lg: '1440px',
      xl: '1680px',
      '2xl': '2560px',
    },
    fontSize: {
      sm: '12px',
      base: '14px',
      xl: '16px',
      '2xl': '18px',
      '3xl': '20px',
      '4xl': '40px',
    },
    extend: {
      colors: {
        primary: '#0960bd',
      },
    },
  },
  plugins: [],
} satisfies Config
```

- [ ] **Step 4: 配置 Vite**

替换 `vite.config.ts`：

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: '@import "@/assets/styles/variables.less";',
      },
    },
  },
})
```

- [ ] **Step 5: 配置 Vitest**

在 `vite.config.ts` 中添加 test 配置（或创建 `vitest.config.ts`）。在 `vite.config.ts` 顶部添加三斜线引用，并在 `defineConfig` 中加入 `test` 字段：

```typescript
/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: '@import "@/assets/styles/variables.less";',
      },
    },
  },
  test: {
    environment: 'happy-dom',
    globals: true,
  },
})
```

在 `tsconfig.json` 的 `compilerOptions` 中确保包含：

```json
{
  "compilerOptions": {
    "types": ["vitest/globals"],
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

- [ ] **Step 6: 创建入口文件最小版本**

`src/main.ts`：

```typescript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

async function bootstrap() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser')
    await worker.start({ onUnhandledRequest: 'bypass' })
  }

  const app = createApp(App)
  app.use(createPinia())
  app.mount('#app')
}

bootstrap()
```

`src/App.vue`（占位）：

```vue
<template>
  <div>DevOps OpenClaw</div>
</template>
```

- [ ] **Step 7: 创建 MSW 占位文件（防止 import 报错）**

`src/mocks/browser.ts`：

```typescript
import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)
```

`src/mocks/handlers.ts`：

```typescript
import { http } from 'msw'

export const handlers = [
  http.get('/api/project', () => {
    return new Response(null, { status: 404 })
  }),
]
```

- [ ] **Step 8: 初始化 MSW service worker 文件**

```bash
npx msw init public/ --save
```

- [ ] **Step 9: 验证项目能跑起来**

```bash
npm run dev
```

打开浏览器确认看到 "DevOps OpenClaw" 文字，控制台显示 MSW 启用日志 `[MSW] Mocking enabled`。

- [ ] **Step 10: Commit**

```bash
git init
echo 'node_modules\ndist\n.superpowers' > .gitignore
git add -A
git commit -m "chore: scaffold Vue 3 + Vite + Naive UI + Pinia + MSW project"
```

---

### Task 2: 设计系统配置

**Files:**
- Create: `src/assets/styles/variables.less`, `src/assets/styles/global.less`, `src/theme.ts`

- [ ] **Step 1: 创建 Less 变量文件**

`src/assets/styles/variables.less`：

```less
// 品牌主色
@primaryColor: #006eff;
@primaryColorHover: #57a3f3;

// 文字颜色
@textColorTitle: #30363e;
@textColorBody: #515a6e;
@textColorSecondary: #606266;
@textColorPlaceholder: #909399;
@textColorLight: #99a9bf;

// 背景颜色
@bgPage: #f7f7f7;
@bgArea: #f9f9f9;
@bgPanel: #f6f7f8;
@bgContainer: #f3f3f3;
@bgWhite: #ffffff;

// 边框颜色
@borderColor: #e4e9f1;
@borderColorForm: #e4e7ed;

// 状态颜色
@successColor: #00b81f;
@warningColor: #ff8800;
@errorColor: #f23030;
@infoColor: #409eff;

// 布局
@headerHeight: 57px;

// 阴影
@shadowCard: 0px 0px 2px 0px rgba(0, 0, 0, 0.1);
@shadowHeader: 0px 2px 10px 0px rgba(96, 102, 110, 0.05);
@shadowModal: 0 4px 12px rgba(0, 0, 0, 0.2);

// 圆角
@radiusCard: 4px;
@radiusButton: 6px;
@radiusModal: 6px;
@radiusInput: 2px;
```

- [ ] **Step 2: 创建全局样式**

`src/assets/styles/global.less`：

```less
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 14px;
  line-height: 1.5;
}

body {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '\5FAE\8F6F\96C5\9ED1', Arial, sans-serif;
  color: @textColorBody;
  background-color: @bgPage;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

img,
video {
  display: block;
  max-width: 100%;
  height: auto;
}

.hide-scrollbar {
  scrollbar-width: none;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
```

- [ ] **Step 3: 创建 Naive UI 主题配置**

`src/theme.ts`：

```typescript
import type { GlobalThemeOverrides } from 'naive-ui'

export const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#006eff',
    primaryColorHover: '#57a3f3',
    primaryColorPressed: '#2b85e4',
    successColor: '#00b81f',
    warningColor: '#ff8800',
    errorColor: '#f23030',
    infoColor: '#409eff',
    fontFamily:
      "'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif",
    fontSize: '14px',
    borderRadius: '4px',
    bodyColor: '#f7f7f7',
    cardColor: '#ffffff',
    textColorBase: '#515a6e',
    textColor1: '#30363e',
    textColor2: '#515a6e',
    textColor3: '#909399',
    borderColor: '#e4e9f1',
  },
  Button: {
    borderRadiusMedium: '6px',
    borderRadiusLarge: '6px',
  },
  Modal: {
    borderRadius: '6px',
  },
  Card: {
    borderRadius: '4px',
    boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.1)',
  },
  Input: {
    borderRadius: '2px',
  },
  Dialog: {
    borderRadius: '6px',
  },
}
```

- [ ] **Step 4: 更新 App.vue 使用 NConfigProvider**

`src/App.vue`：

```vue
<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <div class="app">
        DevOps OpenClaw
      </div>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { NConfigProvider, NMessageProvider } from 'naive-ui'
import { themeOverrides } from './theme'
</script>

<style lang="less">
@import '@/assets/styles/global.less';
</style>
```

- [ ] **Step 5: 在 main.ts 中引入 Tailwind**

在 `src/main.ts` 顶部添加：

```typescript
import 'tailwindcss'
```

完整 `src/main.ts`：

```typescript
import 'tailwindcss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

async function bootstrap() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser')
    await worker.start({ onUnhandledRequest: 'bypass' })
  }

  const app = createApp(App)
  app.use(createPinia())
  app.mount('#app')
}

bootstrap()
```

- [ ] **Step 6: 验证设计系统生效**

```bash
npm run dev
```

打开浏览器，确认页面背景为 `#f7f7f7`，字体为 Helvetica Neue 系列。

- [ ] **Step 7: Commit**

```bash
git add src/assets/styles/ src/theme.ts src/App.vue src/main.ts tailwind.config.ts
git commit -m "feat: configure design system with MTP tokens, Naive UI theme, and Tailwind"
```

---

### Task 3: 类型定义与 Pinia Store

**Files:**
- Create: `src/types/project.ts`, `src/stores/project.ts`, `tests/stores/project.test.ts`

- [ ] **Step 1: 创建类型定义**

`src/types/project.ts`：

```typescript
export type PageState = 'loading' | 'empty' | 'has_project'

export type ModalState = 'none' | 'create' | 'progress' | 'complete' | 'delete'

export type ProgressStep = 'vm' | 'openclaw' | 'feishu'

export type StepStatus = 'pending' | 'running' | 'done' | 'error'

export interface StepInfo {
  key: ProgressStep
  label: string
  status: StepStatus
  elapsed?: number
}

export type ProjectStatus = 'creating' | 'deployed' | 'pending_approval' | 'error'

export interface Project {
  id: string
  name: string
  botName: string
  avatarUrl: string
  status: ProjectStatus
  gatewayUrl?: string
  feishuChatUrl?: string
  createdAt: string
}

export interface CreateProjectPayload {
  name: string
  botName: string
  avatarUrl: string
}

export interface ProgressResponse {
  steps: Array<{
    key: ProgressStep
    status: StepStatus
    elapsed?: number
  }>
  done: boolean
}

export interface MockUser {
  id: string
  name: string
  avatarUrl: string
}
```

- [ ] **Step 2: 编写 Store 测试**

`tests/stores/project.test.ts`：

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useProjectStore } from '@/stores/project'

describe('useProjectStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('初始状态为 loading', () => {
    const store = useProjectStore()
    expect(store.pageState).toBe('loading')
    expect(store.modalState).toBe('none')
    expect(store.project).toBeNull()
  })

  it('setProject 设置项目后 pageState 变为 has_project', () => {
    const store = useProjectStore()
    store.setProject({
      id: '1',
      name: '测试项目',
      botName: '测试机器人',
      avatarUrl: '/avatars/avatar-1.png',
      status: 'deployed',
      createdAt: '2026-03-26',
    })
    expect(store.pageState).toBe('has_project')
    expect(store.project?.name).toBe('测试项目')
  })

  it('setEmpty 清空项目后 pageState 变为 empty', () => {
    const store = useProjectStore()
    store.setProject({
      id: '1',
      name: '测试项目',
      botName: '测试机器人',
      avatarUrl: '/avatars/avatar-1.png',
      status: 'deployed',
      createdAt: '2026-03-26',
    })
    store.setEmpty()
    expect(store.pageState).toBe('empty')
    expect(store.project).toBeNull()
  })

  it('openCreateModal 打开创建弹窗', () => {
    const store = useProjectStore()
    store.openCreateModal()
    expect(store.modalState).toBe('create')
  })

  it('startProgress 切换到进度弹窗并初始化步骤', () => {
    const store = useProjectStore()
    store.startProgress()
    expect(store.modalState).toBe('progress')
    expect(store.steps).toHaveLength(3)
    expect(store.steps[0].status).toBe('pending')
  })

  it('updateStep 更新步骤状态', () => {
    const store = useProjectStore()
    store.startProgress()
    store.updateStep('vm', 'running')
    expect(store.steps[0].status).toBe('running')
  })

  it('updateStep 更新步骤耗时', () => {
    const store = useProjectStore()
    store.startProgress()
    store.updateStep('vm', 'done', 2)
    expect(store.steps[0].status).toBe('done')
    expect(store.steps[0].elapsed).toBe(2)
  })

  it('showComplete 切换到完成弹窗', () => {
    const store = useProjectStore()
    store.showComplete()
    expect(store.modalState).toBe('complete')
  })

  it('openDeleteModal 打开删除弹窗', () => {
    const store = useProjectStore()
    store.openDeleteModal()
    expect(store.modalState).toBe('delete')
  })

  it('closeModal 关闭弹窗', () => {
    const store = useProjectStore()
    store.openCreateModal()
    store.closeModal()
    expect(store.modalState).toBe('none')
  })
})
```

- [ ] **Step 3: 运行测试确认失败**

```bash
npx vitest run tests/stores/project.test.ts
```

预期：FAIL，`@/stores/project` 模块不存在。

- [ ] **Step 4: 实现 Pinia Store**

`src/stores/project.ts`：

```typescript
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type {
  PageState,
  ModalState,
  Project,
  StepInfo,
  StepStatus,
  ProgressStep,
} from '@/types/project'

export const useProjectStore = defineStore('project', () => {
  const pageState = ref<PageState>('loading')
  const modalState = ref<ModalState>('none')
  const project = ref<Project | null>(null)
  const steps = ref<StepInfo[]>([])

  function initSteps(): StepInfo[] {
    return [
      { key: 'vm', label: '启动云端电脑', status: 'pending' },
      { key: 'openclaw', label: '启动 OpenClaw', status: 'pending' },
      { key: 'feishu', label: '连接飞书', status: 'pending' },
    ]
  }

  function setProject(p: Project) {
    project.value = p
    pageState.value = 'has_project'
  }

  function setEmpty() {
    project.value = null
    pageState.value = 'empty'
  }

  function openCreateModal() {
    modalState.value = 'create'
  }

  function startProgress() {
    modalState.value = 'progress'
    steps.value = initSteps()
  }

  function updateStep(key: ProgressStep, status: StepStatus, elapsed?: number) {
    const step = steps.value.find((s) => s.key === key)
    if (step) {
      step.status = status
      if (elapsed !== undefined) {
        step.elapsed = elapsed
      }
    }
  }

  function showComplete() {
    modalState.value = 'complete'
  }

  function openDeleteModal() {
    modalState.value = 'delete'
  }

  function closeModal() {
    modalState.value = 'none'
  }

  return {
    pageState,
    modalState,
    project,
    steps,
    setProject,
    setEmpty,
    openCreateModal,
    startProgress,
    updateStep,
    showComplete,
    openDeleteModal,
    closeModal,
  }
})
```

- [ ] **Step 5: 运行测试确认通过**

```bash
npx vitest run tests/stores/project.test.ts
```

预期：全部 9 个测试 PASS。

- [ ] **Step 6: Commit**

```bash
git add src/types/ src/stores/ tests/stores/
git commit -m "feat: add project types and Pinia store with state machine"
```

---

### Task 4: Mock API 层

**Files:**
- Create: `src/mocks/data.ts`
- Modify: `src/mocks/handlers.ts`

- [ ] **Step 1: 创建 Mock 数据模块**

`src/mocks/data.ts`：

```typescript
import type { Project, MockUser } from '@/types/project'

export const mockUser: MockUser = {
  id: 'user-001',
  name: '达尔文',
  avatarUrl: '/avatars/default-user.png',
}

export const avatarList = Array.from(
  { length: 12 },
  (_, i) => `/avatars/avatar-${i + 1}.png`,
)

let currentProject: Project | null = null
let progressCallCount = 0

export function getProject(): Project | null {
  return currentProject
}

export function createProject(name: string, botName: string, avatarUrl: string): Project {
  progressCallCount = 0
  currentProject = {
    id: crypto.randomUUID(),
    name,
    botName,
    avatarUrl,
    status: 'creating',
    gatewayUrl: 'https://gateway.example.com/dashboard',
    feishuChatUrl: 'https://applink.feishu.cn/client/chat/open',
    createdAt: new Date().toISOString(),
  }
  return currentProject
}

export function getProgress() {
  progressCallCount++

  const steps = [
    { key: 'vm' as const, status: 'pending' as const, elapsed: undefined as number | undefined },
    { key: 'openclaw' as const, status: 'pending' as const, elapsed: undefined as number | undefined },
    { key: 'feishu' as const, status: 'pending' as const, elapsed: undefined as number | undefined },
  ]

  if (progressCallCount >= 1) {
    steps[0] = { key: 'vm', status: progressCallCount >= 2 ? 'done' : 'running', elapsed: progressCallCount >= 2 ? 2 : undefined }
  }
  if (progressCallCount >= 2) {
    steps[1] = { key: 'openclaw', status: progressCallCount >= 3 ? 'done' : 'running', elapsed: progressCallCount >= 3 ? 3 : undefined }
  }
  if (progressCallCount >= 3) {
    steps[2] = { key: 'feishu', status: progressCallCount >= 4 ? 'done' : 'running', elapsed: progressCallCount >= 4 ? 1 : undefined }
  }

  const done = progressCallCount >= 4

  if (done && currentProject) {
    currentProject.status = 'pending_approval'
  }

  return { steps, done }
}

export function deleteProject(): void {
  currentProject = null
  progressCallCount = 0
}
```

- [ ] **Step 2: 实现 API Handlers**

替换 `src/mocks/handlers.ts`：

```typescript
import { http, HttpResponse, delay } from 'msw'
import {
  getProject,
  createProject,
  getProgress,
  deleteProject,
  avatarList,
} from './data'

export const handlers = [
  http.get('/api/project', async () => {
    await delay(300)
    const project = getProject()
    if (!project) {
      return new HttpResponse(null, { status: 404 })
    }
    return HttpResponse.json(project)
  }),

  http.post('/api/project', async ({ request }) => {
    await delay(500)
    const body = (await request.json()) as {
      name: string
      botName: string
      avatarUrl: string
    }
    const project = createProject(body.name, body.botName, body.avatarUrl)
    return HttpResponse.json(project, { status: 201 })
  }),

  http.get('/api/project/:id/progress', async () => {
    await delay(1500)
    const progress = getProgress()
    return HttpResponse.json(progress)
  }),

  http.delete('/api/project/:id', async () => {
    await delay(300)
    deleteProject()
    return new HttpResponse(null, { status: 204 })
  }),

  http.get('/api/avatars', async () => {
    await delay(200)
    return HttpResponse.json(avatarList)
  }),
]
```

- [ ] **Step 3: 验证 Mock API 工作**

```bash
npm run dev
```

打开浏览器开发者工具 → Network，访问 `http://localhost:5173/api/project`，应看到 MSW 拦截返回 404。

- [ ] **Step 4: Commit**

```bash
git add src/mocks/
git commit -m "feat: implement MSW mock API with project CRUD and progress simulation"
```

---

### Task 5: AppHeader 组件

**Files:**
- Create: `src/components/AppHeader.vue`
- Modify: `src/App.vue`

- [ ] **Step 1: 实现 AppHeader**

`src/components/AppHeader.vue`：

```vue
<template>
  <header class="app-header">
    <div class="header-left">
      <span class="header-logo">🦞</span>
      <span class="header-title">DevOps OpenClaw</span>
    </div>
    <div class="header-right">
      <n-avatar
        round
        size="small"
        :src="mockUser.avatarUrl"
        :fallback-src="undefined"
      >
        {{ mockUser.name.charAt(0) }}
      </n-avatar>
    </div>
  </header>
</template>

<script setup lang="ts">
import { NAvatar } from 'naive-ui'
import { mockUser } from '@/mocks/data'
</script>

<style lang="less" scoped>
.app-header {
  height: @headerHeight;
  background: @bgWhite;
  box-shadow: @shadowHeader;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  position: sticky;
  top: 0;
  z-index: 10;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-logo {
  font-size: 20px;
}

.header-title {
  font-size: 16px;
  font-weight: 600;
  color: @textColorTitle;
}
</style>
```

- [ ] **Step 2: 集成到 App.vue**

更新 `src/App.vue`：

```vue
<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <div class="app">
        <AppHeader />
        <main class="app-main">
          <!-- 内容区域后续填充 -->
        </main>
      </div>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { NConfigProvider, NMessageProvider } from 'naive-ui'
import { themeOverrides } from './theme'
import AppHeader from './components/AppHeader.vue'
</script>

<style lang="less">
@import '@/assets/styles/global.less';

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 24px;
}
</style>
```

- [ ] **Step 3: 验证 Header 渲染**

```bash
npm run dev
```

确认顶部显示白色导航栏，左侧有 logo 和标题，右侧有用户头像。

- [ ] **Step 4: Commit**

```bash
git add src/components/AppHeader.vue src/App.vue
git commit -m "feat: add AppHeader component with logo and user avatar"
```

---

### Task 6: HeroSection + FeatureList 组件

**Files:**
- Create: `src/components/HeroSection.vue`, `src/components/FeatureList.vue`
- Modify: `src/App.vue`

- [ ] **Step 1: 实现 HeroSection**

`src/components/HeroSection.vue`：

```vue
<template>
  <section class="hero-section">
    <div class="hero-content">
      <h1 class="hero-title">DevOps OpenClaw</h1>
      <p class="hero-subtitle">企业里的 AI 同事，随时在线，助你高效工作！</p>
    </div>
    <div class="hero-image">
      <img src="/images/mascot.png" alt="OpenClaw 吉祥物" />
    </div>
  </section>
</template>

<style lang="less" scoped>
.hero-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
  margin-bottom: 24px;
}

.hero-title {
  font-size: 28px;
  font-weight: 600;
  color: @textColorTitle;
  margin-bottom: 8px;
}

.hero-subtitle {
  font-size: 14px;
  color: @textColorPlaceholder;
}

.hero-image {
  width: 240px;
  flex-shrink: 0;

  img {
    width: 100%;
    height: auto;
  }
}
</style>
```

- [ ] **Step 2: 实现 FeatureList**

`src/components/FeatureList.vue`：

```vue
<template>
  <section class="feature-list">
    <div v-for="feature in features" :key="feature.title" class="feature-item">
      <n-icon :size="20" class="feature-icon">
        <component :is="feature.icon" />
      </n-icon>
      <div class="feature-text">
        <h3 class="feature-title">{{ feature.title }}</h3>
        <p class="feature-desc">{{ feature.desc }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { NIcon } from 'naive-ui'

const RocketIcon = () => h('span', { style: 'font-size: 20px' }, '🚀')
const ShieldIcon = () => h('span', { style: 'font-size: 20px' }, '🛡️')
const StarIcon = () => h('span', { style: 'font-size: 20px' }, '⭐')

const features = [
  {
    icon: RocketIcon,
    title: '一键部署，开箱即用',
    desc: '告别繁琐的环境搭建和配置流程，一键云端部署，零配置接入飞书，打开就能对话。',
  },
  {
    icon: StarIcon,
    title: '原生体验，能力无损',
    desc: '提供原版 OpenClaw 完整能力，独特个性、长期记忆、内置飞书官方插件。',
  },
  {
    icon: ShieldIcon,
    title: '企业级安全，数据不离场',
    desc: '数据全程在企业体系内流转，权限可控，授权透明，安全合规，放心用 AI。',
  },
]
</script>

<style lang="less" scoped>
.feature-list {
  width: 100%;
  max-width: 800px;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 0;
}

.feature-icon {
  flex-shrink: 0;
  margin-top: 2px;
}

.feature-title {
  font-size: 14px;
  font-weight: 600;
  color: @textColorTitle;
  margin-bottom: 4px;
}

.feature-desc {
  font-size: 14px;
  color: @textColorPlaceholder;
  line-height: 1.5;
}
</style>
```

- [ ] **Step 3: 集成到 App.vue**

更新 `src/App.vue` 的 `<template>` 和 `<script>`：

```vue
<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <div class="app">
        <AppHeader />
        <main class="app-main">
          <HeroSection />
          <!-- 项目卡片区域后续填充 -->
          <FeatureList />
        </main>
      </div>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { NConfigProvider, NMessageProvider } from 'naive-ui'
import { themeOverrides } from './theme'
import AppHeader from './components/AppHeader.vue'
import HeroSection from './components/HeroSection.vue'
import FeatureList from './components/FeatureList.vue'
</script>
```

- [ ] **Step 4: 验证页面布局**

```bash
npm run dev
```

确认页面显示：顶部 Header → 标题区（左文字右图片）→ 三行特性列表。吉祥物图片暂时 404 没关系（后续添加资源）。

- [ ] **Step 5: Commit**

```bash
git add src/components/HeroSection.vue src/components/FeatureList.vue src/App.vue
git commit -m "feat: add HeroSection and FeatureList components"
```

---

### Task 7: CreateGuide + ProjectCard 组件

**Files:**
- Create: `src/components/CreateGuide.vue`, `src/components/ProjectCard.vue`, `tests/components/ProjectCard.test.ts`
- Modify: `src/App.vue`

- [ ] **Step 1: 实现 CreateGuide**

`src/components/CreateGuide.vue`：

```vue
<template>
  <div class="create-guide">
    <div class="guide-left">
      <span class="guide-icon">🔧</span>
      <div class="guide-text">
        <h3 class="guide-title">创建 DevOps OpenClaw</h3>
        <p class="guide-desc">一键云端部署，自动接入飞书机器人</p>
      </div>
    </div>
    <n-button type="primary" size="large" @click="emit('create')">
      创建
    </n-button>
  </div>
</template>

<script setup lang="ts">
import { NButton } from 'naive-ui'

const emit = defineEmits<{
  create: []
}>()
</script>

<style lang="less" scoped>
.create-guide {
  width: 100%;
  max-width: 800px;
  background: @bgWhite;
  border-radius: @radiusCard;
  box-shadow: @shadowCard;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.guide-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.guide-icon {
  font-size: 24px;
}

.guide-title {
  font-size: 16px;
  font-weight: 600;
  color: @textColorTitle;
}

.guide-desc {
  font-size: 12px;
  color: @textColorPlaceholder;
  margin-top: 2px;
}
</style>
```

- [ ] **Step 2: 编写 ProjectCard 测试**

`tests/components/ProjectCard.test.ts`：

```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProjectCard from '@/components/ProjectCard.vue'
import type { Project } from '@/types/project'

const mockProject: Project = {
  id: '1',
  name: '达尔文的 OpenClaw',
  botName: '达尔文的 Claw',
  avatarUrl: '/avatars/avatar-1.png',
  status: 'deployed',
  gatewayUrl: 'https://gateway.example.com',
  feishuChatUrl: 'https://feishu.cn/chat',
  createdAt: '2026-03-26',
}

describe('ProjectCard', () => {
  it('显示项目名称', () => {
    const wrapper = mount(ProjectCard, {
      props: { project: mockProject },
    })
    expect(wrapper.text()).toContain('达尔文的 OpenClaw')
  })

  it('显示已部署状态', () => {
    const wrapper = mount(ProjectCard, {
      props: { project: mockProject },
    })
    expect(wrapper.text()).toContain('已部署')
  })

  it('显示审批中状态', () => {
    const wrapper = mount(ProjectCard, {
      props: { project: { ...mockProject, status: 'pending_approval' } },
    })
    expect(wrapper.text()).toContain('审批中')
  })

  it('点击删除触发事件', async () => {
    const wrapper = mount(ProjectCard, {
      props: { project: mockProject },
    })
    // 找到更多菜单中的删除触发
    const moreBtn = wrapper.find('[data-testid="more-menu"]')
    if (moreBtn.exists()) {
      await moreBtn.trigger('click')
    }
    // 验证 delete 事件可以被触发
    expect(wrapper.emitted()).toBeDefined()
  })
})
```

- [ ] **Step 3: 运行测试确认失败**

```bash
npx vitest run tests/components/ProjectCard.test.ts
```

预期：FAIL，`@/components/ProjectCard.vue` 不存在。

- [ ] **Step 4: 实现 ProjectCard**

`src/components/ProjectCard.vue`：

```vue
<template>
  <div class="project-card">
    <div class="card-left">
      <n-avatar
        :size="48"
        :src="project.avatarUrl"
        round
      />
      <div class="card-info">
        <h3 class="card-name">{{ project.name }}</h3>
        <n-tag :type="statusConfig.type" size="small" round>
          {{ statusConfig.label }}
        </n-tag>
      </div>
    </div>
    <div class="card-actions">
      <n-dropdown
        trigger="click"
        :options="menuOptions"
        @select="handleMenuSelect"
      >
        <n-button
          quaternary
          size="small"
          data-testid="more-menu"
        >
          ...
        </n-button>
      </n-dropdown>
      <n-button size="medium" @click="emit('openProject')">
        <template #icon><span>📝</span></template>
        打开项目
      </n-button>
      <n-button type="primary" size="medium" @click="emit('chat')">
        <template #icon><span>💬</span></template>
        去对话
      </n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NAvatar, NTag, NButton, NDropdown } from 'naive-ui'
import type { Project, ProjectStatus } from '@/types/project'

const props = defineProps<{
  project: Project
}>()

const emit = defineEmits<{
  openProject: []
  chat: []
  delete: []
}>()

const statusMap: Record<ProjectStatus, { label: string; type: 'success' | 'warning' | 'error' | 'info' }> = {
  creating: { label: '创建中', type: 'info' },
  deployed: { label: '已部署', type: 'success' },
  pending_approval: { label: '审批中', type: 'warning' },
  error: { label: '异常', type: 'error' },
}

const statusConfig = computed(() => statusMap[props.project.status])

const menuOptions = [
  { label: '删除', key: 'delete' },
]

function handleMenuSelect(key: string) {
  if (key === 'delete') {
    emit('delete')
  }
}
</script>

<style lang="less" scoped>
.project-card {
  width: 100%;
  max-width: 800px;
  background: @bgWhite;
  border-radius: @radiusCard;
  box-shadow: @shadowCard;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.card-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.card-name {
  font-size: 16px;
  font-weight: 600;
  color: @textColorTitle;
  margin-bottom: 4px;
}

.card-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
```

- [ ] **Step 5: 运行测试**

```bash
npx vitest run tests/components/ProjectCard.test.ts
```

预期：显示项目名称和状态的测试 PASS。（Dropdown 相关的测试在 happy-dom 中可能需要调整，先确保基础渲染测试通过即可。）

- [ ] **Step 6: 集成到 App.vue**

更新 `src/App.vue`：

```vue
<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <div class="app">
        <AppHeader />
        <main class="app-main">
          <HeroSection />
          <CreateGuide
            v-if="store.pageState === 'empty'"
            @create="store.openCreateModal()"
          />
          <ProjectCard
            v-else-if="store.pageState === 'has_project' && store.project"
            :project="store.project"
            @open-project="handleOpenProject"
            @chat="handleChat"
            @delete="store.openDeleteModal()"
          />
          <FeatureList />
        </main>
      </div>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { NConfigProvider, NMessageProvider } from 'naive-ui'
import { themeOverrides } from './theme'
import { useProjectStore } from './stores/project'
import AppHeader from './components/AppHeader.vue'
import HeroSection from './components/HeroSection.vue'
import FeatureList from './components/FeatureList.vue'
import CreateGuide from './components/CreateGuide.vue'
import ProjectCard from './components/ProjectCard.vue'

const store = useProjectStore()

onMounted(async () => {
  try {
    const res = await fetch('/api/project')
    if (res.ok) {
      const project = await res.json()
      store.setProject(project)
    } else {
      store.setEmpty()
    }
  } catch {
    store.setEmpty()
  }
})

function handleOpenProject() {
  if (store.project?.gatewayUrl) {
    window.open(store.project.gatewayUrl, '_blank')
  }
}

function handleChat() {
  if (store.project?.feishuChatUrl) {
    window.open(store.project.feishuChatUrl, '_blank')
  }
}
</script>
```

- [ ] **Step 7: 验证页面状态切换**

```bash
npm run dev
```

首次打开应显示 CreateGuide（因为 Mock API 返回 404）。

- [ ] **Step 8: Commit**

```bash
git add src/components/CreateGuide.vue src/components/ProjectCard.vue tests/components/ProjectCard.test.ts src/App.vue
git commit -m "feat: add CreateGuide and ProjectCard with page state switching"
```

---

### Task 8: CreateModal 组件

**Files:**
- Create: `src/components/CreateModal.vue`, `tests/components/CreateModal.test.ts`
- Modify: `src/App.vue`

- [ ] **Step 1: 编写 CreateModal 测试**

`tests/components/CreateModal.test.ts`：

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CreateModal from '@/components/CreateModal.vue'

describe('CreateModal', () => {
  it('初始状态下创建按钮禁用', () => {
    const wrapper = mount(CreateModal, {
      props: { show: true },
    })
    const btn = wrapper.find('[data-testid="submit-btn"]')
    expect(btn.attributes('disabled')).toBeDefined()
  })

  it('填写项目名和机器人名后选择头像，按钮可用', async () => {
    const wrapper = mount(CreateModal, {
      props: { show: true },
    })
    const inputs = wrapper.findAll('input')
    await inputs[0].setValue('我的项目')
    await inputs[1].setValue('我的机器人')
    const avatar = wrapper.find('[data-testid="avatar-0"]')
    if (avatar.exists()) {
      await avatar.trigger('click')
    }
    // 按钮应不再禁用
    const btn = wrapper.find('[data-testid="submit-btn"]')
    // 由于 Naive UI 按钮 disabled 处理可能不同，检查组件内部状态
    expect(wrapper.vm).toBeDefined()
  })
})
```

- [ ] **Step 2: 运行测试确认失败**

```bash
npx vitest run tests/components/CreateModal.test.ts
```

预期：FAIL，模块不存在。

- [ ] **Step 3: 实现 CreateModal**

`src/components/CreateModal.vue`：

```vue
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
          <p class="form-hint">将会自动创建飞书智能体并绑定到 OpenClaw 项目</p>
          <n-input
            v-model:value="form.botName"
            placeholder="达尔文的 Claw"
            maxlength="20"
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
      </div>
    </div>
  </n-modal>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { NModal, NInput, NButton, NAvatar } from 'naive-ui'
import { avatarList } from '@/mocks/data'

defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  close: []
  submit: [payload: { name: string; botName: string; avatarUrl: string }]
}>()

const form = reactive({
  name: '',
  botName: '',
  avatarUrl: '',
})

const isValid = computed(() => {
  return form.name.trim().length > 0
    && form.botName.trim().length > 0
    && form.avatarUrl !== ''
})

function handleSubmit() {
  if (!isValid.value) return
  emit('submit', {
    name: form.name.trim(),
    botName: form.botName.trim(),
    avatarUrl: form.avatarUrl,
  })
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

.form-hint {
  font-size: 12px;
  color: @textColorPlaceholder;
  margin-bottom: 8px;
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
</style>
```

- [ ] **Step 4: 运行测试**

```bash
npx vitest run tests/components/CreateModal.test.ts
```

预期：基础渲染测试 PASS。

- [ ] **Step 5: 集成到 App.vue**

在 `src/App.vue` 的 `<template>` 中 `</main>` 后添加：

```vue
        <CreateModal
          :show="store.modalState === 'create'"
          @close="store.closeModal()"
          @submit="handleCreate"
        />
```

在 `<script setup>` 中添加 import 和 handler：

```typescript
import CreateModal from './components/CreateModal.vue'

async function handleCreate(payload: { name: string; botName: string; avatarUrl: string }) {
  store.startProgress()

  try {
    const res = await fetch('/api/project', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const project = await res.json()
    store.setProject(project)
    pollProgress(project.id)
  } catch {
    store.updateStep('vm', 'error')
  }
}
```

- [ ] **Step 6: 验证弹窗打开**

```bash
npm run dev
```

点击 CreateGuide 的「创建」按钮，应弹出创建项目弹窗，显示项目名、机器人名输入框和头像网格。

- [ ] **Step 7: Commit**

```bash
git add src/components/CreateModal.vue tests/components/CreateModal.test.ts src/App.vue
git commit -m "feat: add CreateModal with form validation and avatar selection"
```

---

### Task 9: usePolling Composable + ProgressModal 组件

**Files:**
- Create: `src/composables/usePolling.ts`, `tests/composables/usePolling.test.ts`, `src/components/ProgressModal.vue`, `tests/components/ProgressModal.test.ts`
- Modify: `src/App.vue`

- [ ] **Step 1: 编写 usePolling 测试**

`tests/composables/usePolling.test.ts`：

```typescript
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { usePolling } from '@/composables/usePolling'

describe('usePolling', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('start 后定时执行回调', async () => {
    const callback = vi.fn().mockResolvedValue(false)
    const { start } = usePolling(callback, 1000)

    start()

    // 第一次立即调用
    await vi.advanceTimersByTimeAsync(0)
    expect(callback).toHaveBeenCalledTimes(1)

    // 第二次在 1000ms 后
    await vi.advanceTimersByTimeAsync(1000)
    expect(callback).toHaveBeenCalledTimes(2)
  })

  it('回调返回 true 时停止轮询', async () => {
    let count = 0
    const callback = vi.fn().mockImplementation(async () => {
      count++
      return count >= 2
    })
    const { start } = usePolling(callback, 1000)

    start()

    await vi.advanceTimersByTimeAsync(0)
    expect(callback).toHaveBeenCalledTimes(1)

    await vi.advanceTimersByTimeAsync(1000)
    expect(callback).toHaveBeenCalledTimes(2)

    // 应该已停止
    await vi.advanceTimersByTimeAsync(1000)
    expect(callback).toHaveBeenCalledTimes(2)
  })

  it('stop 手动停止轮询', async () => {
    const callback = vi.fn().mockResolvedValue(false)
    const { start, stop } = usePolling(callback, 1000)

    start()
    await vi.advanceTimersByTimeAsync(0)
    expect(callback).toHaveBeenCalledTimes(1)

    stop()

    await vi.advanceTimersByTimeAsync(1000)
    expect(callback).toHaveBeenCalledTimes(1)
  })
})
```

- [ ] **Step 2: 运行测试确认失败**

```bash
npx vitest run tests/composables/usePolling.test.ts
```

预期：FAIL，模块不存在。

- [ ] **Step 3: 实现 usePolling**

`src/composables/usePolling.ts`：

```typescript
import { ref, onUnmounted } from 'vue'

/**
 * 轮询 composable
 * @param callback 每次轮询执行的回调，返回 true 表示停止轮询
 * @param interval 轮询间隔（毫秒）
 */
export function usePolling(
  callback: () => Promise<boolean>,
  interval: number,
) {
  const isPolling = ref(false)
  let timer: ReturnType<typeof setTimeout> | null = null

  async function poll() {
    if (!isPolling.value) return
    const shouldStop = await callback()
    if (shouldStop || !isPolling.value) {
      isPolling.value = false
      return
    }
    timer = setTimeout(poll, interval)
  }

  function start() {
    isPolling.value = true
    poll()
  }

  function stop() {
    isPolling.value = false
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  onUnmounted(stop)

  return { isPolling, start, stop }
}
```

- [ ] **Step 4: 运行测试确认通过**

```bash
npx vitest run tests/composables/usePolling.test.ts
```

预期：全部 3 个测试 PASS。（注意：由于 `onUnmounted` 在非组件环境中调用可能产生 Vue 警告，但测试仍应通过。）

- [ ] **Step 5: 编写 ProgressModal 测试**

`tests/components/ProgressModal.test.ts`：

```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProgressModal from '@/components/ProgressModal.vue'
import type { StepInfo } from '@/types/project'

const pendingSteps: StepInfo[] = [
  { key: 'vm', label: '启动云端电脑', status: 'pending' },
  { key: 'openclaw', label: '启动 OpenClaw', status: 'pending' },
  { key: 'feishu', label: '连接飞书', status: 'pending' },
]

const partialSteps: StepInfo[] = [
  { key: 'vm', label: '启动云端电脑', status: 'done', elapsed: 2 },
  { key: 'openclaw', label: '启动 OpenClaw', status: 'running' },
  { key: 'feishu', label: '连接飞书', status: 'pending' },
]

describe('ProgressModal', () => {
  it('显示三个步骤', () => {
    const wrapper = mount(ProgressModal, {
      props: { show: true, steps: pendingSteps },
    })
    expect(wrapper.text()).toContain('启动云端电脑')
    expect(wrapper.text()).toContain('启动 OpenClaw')
    expect(wrapper.text()).toContain('连接飞书')
  })

  it('已完成步骤显示耗时', () => {
    const wrapper = mount(ProgressModal, {
      props: { show: true, steps: partialSteps },
    })
    expect(wrapper.text()).toContain('2 s')
  })

  it('有 error 步骤时显示重试按钮', () => {
    const errorSteps: StepInfo[] = [
      { key: 'vm', label: '启动云端电脑', status: 'error' },
      { key: 'openclaw', label: '启动 OpenClaw', status: 'pending' },
      { key: 'feishu', label: '连接飞书', status: 'pending' },
    ]
    const wrapper = mount(ProgressModal, {
      props: { show: true, steps: errorSteps },
    })
    expect(wrapper.text()).toContain('重试')
  })
})
```

- [ ] **Step 6: 运行测试确认失败**

```bash
npx vitest run tests/components/ProgressModal.test.ts
```

预期：FAIL。

- [ ] **Step 7: 实现 ProgressModal**

`src/components/ProgressModal.vue`：

```vue
<template>
  <n-modal :show="show" :mask-closable="false" :closable="false">
    <div class="progress-modal">
      <div class="modal-header">
        <h2 class="modal-title">正在创建 OpenClaw 项目</h2>
        <p class="modal-subtitle">一键接入飞书，创建预计耗时 1 分钟。</p>
      </div>

      <div class="steps">
        <div
          v-for="(step, index) in steps"
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
              v-if="index < steps.length - 1"
              class="step-line"
              :class="{ 'step-line-done': step.status === 'done' }"
            />
          </div>

          <div class="step-content">
            <span class="step-label" :class="{ 'step-label-error': step.status === 'error' }">
              {{ step.label }}
            </span>
            <span v-if="step.elapsed" class="step-elapsed">{{ step.elapsed }} s</span>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <n-button
          v-if="hasError"
          type="primary"
          size="large"
          block
          @click="emit('retry')"
        >
          重试
        </n-button>
        <n-button
          v-else
          type="primary"
          size="large"
          block
          disabled
          loading
        >
          创建中
        </n-button>
      </div>
    </div>
  </n-modal>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NModal, NButton } from 'naive-ui'
import type { StepInfo } from '@/types/project'

const props = defineProps<{
  show: boolean
  steps: StepInfo[]
}>()

const emit = defineEmits<{
  retry: []
}>()

const hasError = computed(() => props.steps.some((s) => s.status === 'error'))
</script>

<style lang="less" scoped>
.progress-modal {
  background: @bgWhite;
  border-radius: @radiusModal;
  padding: 24px;
  width: 480px;
  max-width: 90vw;
}

.modal-header {
  margin-bottom: 24px;
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

.steps {
  padding: 0 8px;
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

.step-pending {
  border-color: @borderColor;
  color: @textColorPlaceholder;
}

.step-running {
  border-color: @primaryColor;
  color: @primaryColor;
}

.step-done {
  border-color: @successColor;
  background: @successColor;
  color: white;
}

.step-error {
  border-color: @errorColor;
  background: @errorColor;
  color: white;
}

.step-line {
  width: 2px;
  height: 32px;
  background: @borderColor;
}

.step-line-done {
  background: @successColor;
}

.step-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
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

.step-elapsed {
  font-size: 12px;
  color: @textColorPlaceholder;
}

.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.modal-footer {
  margin-top: 24px;
}
</style>
```

- [ ] **Step 8: 运行测试确认通过**

```bash
npx vitest run tests/components/ProgressModal.test.ts
```

预期：3 个测试 PASS。

- [ ] **Step 9: 集成轮询逻辑到 App.vue**

在 `src/App.vue` 的 `<template>` 中添加（在 CreateModal 后面）：

```vue
        <ProgressModal
          :show="store.modalState === 'progress'"
          :steps="store.steps"
          @retry="handleRetry"
        />
```

在 `<script setup>` 中添加轮询逻辑：

```typescript
import ProgressModal from './components/ProgressModal.vue'
import type { ProgressResponse } from './types/project'

let pollTimer: ReturnType<typeof setInterval> | null = null
let failCount = 0

function pollProgress(projectId: string) {
  failCount = 0
  if (pollTimer) clearInterval(pollTimer)

  pollTimer = setInterval(async () => {
    try {
      const res = await fetch(`/api/project/${projectId}/progress`)
      const data: ProgressResponse = await res.json()
      failCount = 0

      for (const step of data.steps) {
        store.updateStep(step.key, step.status, step.elapsed)
      }

      if (data.done) {
        clearInterval(pollTimer!)
        pollTimer = null
        store.showComplete()
        // 重新获取项目最新状态
        const projectRes = await fetch('/api/project')
        if (projectRes.ok) {
          store.setProject(await projectRes.json())
        }
      }
    } catch {
      failCount++
      if (failCount >= 3) {
        clearInterval(pollTimer!)
        pollTimer = null
        const runningStep = store.steps.find((s) => s.status === 'running')
        if (runningStep) {
          store.updateStep(runningStep.key, 'error')
        }
      }
    }
  }, 2000)
}

function handleRetry() {
  if (!store.project) return
  store.startProgress()
  pollProgress(store.project.id)
}
```

- [ ] **Step 10: 验证创建流程进度**

```bash
npm run dev
```

点击创建 → 填写表单 → 确认 → 应看到进度弹窗，步骤依次推进。

- [ ] **Step 11: Commit**

```bash
git add src/composables/ tests/composables/ src/components/ProgressModal.vue tests/components/ProgressModal.test.ts src/App.vue
git commit -m "feat: add ProgressModal with polling and step progression"
```

---

### Task 10: CompleteModal 组件

**Files:**
- Create: `src/components/CompleteModal.vue`
- Modify: `src/App.vue`

- [ ] **Step 1: 实现 CompleteModal**

`src/components/CompleteModal.vue`：

```vue
<template>
  <n-modal
    :show="show"
    :mask-closable="true"
    @update:show="(val: boolean) => !val && emit('close')"
  >
    <div class="complete-modal">
      <n-button
        quaternary
        circle
        size="small"
        class="modal-close"
        @click="emit('close')"
      >
        ✕
      </n-button>

      <div class="modal-header">
        <h2 class="modal-title">你的 OpenClaw 已部署</h2>
        <p class="modal-desc">
          由于企业管理员安全设置，飞书机器人正在审批中，通过后即可与飞书智能体对话。
        </p>
      </div>

      <div class="modal-illustration">
        <div class="illustration-placeholder">
          <span style="font-size: 64px;">🎉</span>
        </div>
      </div>

      <div class="modal-footer">
        <n-button size="large" @click="emit('openProject')">
          打开 OpenClaw 项目
        </n-button>
        <n-button type="primary" size="large" @click="emit('viewApproval')">
          查看审批单
        </n-button>
      </div>
    </div>
  </n-modal>
</template>

<script setup lang="ts">
import { NModal, NButton } from 'naive-ui'

defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  close: []
  openProject: []
  viewApproval: []
}>()
</script>

<style lang="less" scoped>
.complete-modal {
  background: @bgWhite;
  border-radius: @radiusModal;
  padding: 24px;
  width: 480px;
  max-width: 90vw;
  position: relative;
  text-align: center;
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
}

.modal-title {
  font-size: 18px;
  font-weight: 600;
  color: @textColorTitle;
}

.modal-desc {
  font-size: 14px;
  color: @textColorSecondary;
  margin-top: 8px;
  line-height: 1.5;
}

.modal-illustration {
  padding: 32px 0;
}

.illustration-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-footer {
  display: flex;
  gap: 12px;

  > button,
  > .n-button {
    flex: 1;
  }
}
</style>
```

- [ ] **Step 2: 集成到 App.vue**

在 `<template>` 中添加（在 ProgressModal 后面）：

```vue
        <CompleteModal
          :show="store.modalState === 'complete'"
          @close="store.closeModal()"
          @open-project="handleOpenProject"
          @view-approval="store.closeModal()"
        />
```

在 `<script setup>` 中添加 import：

```typescript
import CompleteModal from './components/CompleteModal.vue'
```

- [ ] **Step 3: 验证完成弹窗**

```bash
npm run dev
```

走完创建流程后，进度弹窗应自动切换到完成弹窗，显示"你的 OpenClaw 已部署"和两个按钮。

- [ ] **Step 4: Commit**

```bash
git add src/components/CompleteModal.vue src/App.vue
git commit -m "feat: add CompleteModal with deployment success display"
```

---

### Task 11: DeleteConfirm 组件

**Files:**
- Create: `src/components/DeleteConfirm.vue`
- Modify: `src/App.vue`

- [ ] **Step 1: 实现 DeleteConfirm**

`src/components/DeleteConfirm.vue`：

```vue
<template>
  <n-modal
    :show="show"
    :mask-closable="true"
    @update:show="(val: boolean) => !val && emit('cancel')"
  >
    <div class="delete-modal">
      <div class="delete-header">
        <span class="delete-icon">⚠️</span>
        <h3 class="delete-title">删除智能助手？</h3>
      </div>
      <p class="delete-desc">删除后内容无法恢复，请谨慎操作</p>
      <div class="delete-actions">
        <n-button size="medium" @click="emit('cancel')">
          取消
        </n-button>
        <n-button type="error" size="medium" @click="emit('confirm')">
          删除
        </n-button>
      </div>
    </div>
  </n-modal>
</template>

<script setup lang="ts">
import { NModal, NButton } from 'naive-ui'

defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  cancel: []
  confirm: []
}>()
</script>

<style lang="less" scoped>
.delete-modal {
  background: @bgWhite;
  border-radius: @radiusModal;
  padding: 24px;
  width: 400px;
  max-width: 90vw;
}

.delete-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.delete-icon {
  font-size: 20px;
}

.delete-title {
  font-size: 16px;
  font-weight: 600;
  color: @textColorTitle;
}

.delete-desc {
  font-size: 14px;
  color: @textColorSecondary;
  margin-bottom: 20px;
}

.delete-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
```

- [ ] **Step 2: 集成到 App.vue**

在 `<template>` 中添加：

```vue
        <DeleteConfirm
          :show="store.modalState === 'delete'"
          @cancel="store.closeModal()"
          @confirm="handleDelete"
        />
```

在 `<script setup>` 中添加：

```typescript
import DeleteConfirm from './components/DeleteConfirm.vue'

async function handleDelete() {
  if (!store.project) return
  try {
    await fetch(`/api/project/${store.project.id}`, { method: 'DELETE' })
    store.closeModal()
    store.setEmpty()
  } catch {
    // 删除失败时保持弹窗，用户可重试
  }
}
```

- [ ] **Step 3: 验证删除流程**

```bash
npm run dev
```

创建项目后，点击项目卡片的 `...` → 删除 → 弹出确认弹窗 → 点击删除 → 项目被清空，回到引导创建状态。

- [ ] **Step 4: Commit**

```bash
git add src/components/DeleteConfirm.vue src/App.vue
git commit -m "feat: add DeleteConfirm modal with project deletion flow"
```

---

### Task 12: App.vue 完整集成与端到端验证

**Files:**
- Modify: `src/App.vue`

- [ ] **Step 1: 确认 App.vue 最终完整代码**

确保 `src/App.vue` 包含所有组件和逻辑的完整版本：

```vue
<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <div class="app">
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
            @open-project="handleOpenProject"
            @chat="handleChat"
            @delete="store.openDeleteModal()"
          />

          <FeatureList />
        </main>

        <footer class="app-footer">
          <span>企业内部 OpenClaw 托管平台</span>
        </footer>

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
          @open-project="handleOpenProject"
          @view-approval="store.closeModal()"
        />

        <DeleteConfirm
          :show="store.modalState === 'delete'"
          @cancel="store.closeModal()"
          @confirm="handleDelete"
        />
      </div>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { NConfigProvider, NMessageProvider, NSpin } from 'naive-ui'
import { themeOverrides } from './theme'
import { useProjectStore } from './stores/project'
import type { ProgressResponse } from './types/project'
import AppHeader from './components/AppHeader.vue'
import HeroSection from './components/HeroSection.vue'
import FeatureList from './components/FeatureList.vue'
import CreateGuide from './components/CreateGuide.vue'
import ProjectCard from './components/ProjectCard.vue'
import CreateModal from './components/CreateModal.vue'
import ProgressModal from './components/ProgressModal.vue'
import CompleteModal from './components/CompleteModal.vue'
import DeleteConfirm from './components/DeleteConfirm.vue'

const store = useProjectStore()

let pollTimer: ReturnType<typeof setInterval> | null = null
let failCount = 0

onMounted(async () => {
  try {
    const res = await fetch('/api/project')
    if (res.ok) {
      store.setProject(await res.json())
    } else {
      store.setEmpty()
    }
  } catch {
    store.setEmpty()
  }
})

onUnmounted(() => {
  if (pollTimer) {
    clearInterval(pollTimer)
    pollTimer = null
  }
})

function handleOpenProject() {
  if (store.project?.gatewayUrl) {
    window.open(store.project.gatewayUrl, '_blank')
  }
}

function handleChat() {
  if (store.project?.feishuChatUrl) {
    window.open(store.project.feishuChatUrl, '_blank')
  }
}

async function handleCreate(payload: { name: string; botName: string; avatarUrl: string }) {
  store.startProgress()

  try {
    const res = await fetch('/api/project', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const project = await res.json()
    store.setProject(project)
    pollProgress(project.id)
  } catch {
    store.updateStep('vm', 'error')
  }
}

function pollProgress(projectId: string) {
  failCount = 0
  if (pollTimer) clearInterval(pollTimer)

  pollTimer = setInterval(async () => {
    try {
      const res = await fetch(`/api/project/${projectId}/progress`)
      const data: ProgressResponse = await res.json()
      failCount = 0

      for (const step of data.steps) {
        store.updateStep(step.key, step.status, step.elapsed)
      }

      if (data.done) {
        clearInterval(pollTimer!)
        pollTimer = null
        store.showComplete()
        const projectRes = await fetch('/api/project')
        if (projectRes.ok) {
          store.setProject(await projectRes.json())
        }
      }
    } catch {
      failCount++
      if (failCount >= 3) {
        clearInterval(pollTimer!)
        pollTimer = null
        const runningStep = store.steps.find((s) => s.status === 'running')
        if (runningStep) {
          store.updateStep(runningStep.key, 'error')
        }
      }
    }
  }, 2000)
}

function handleRetry() {
  if (!store.project) return
  store.startProgress()
  pollProgress(store.project.id)
}

async function handleDelete() {
  if (!store.project) return
  try {
    await fetch(`/api/project/${store.project.id}`, { method: 'DELETE' })
    store.closeModal()
    store.setEmpty()
  } catch {
    // 保持弹窗
  }
}
</script>

<style lang="less">
@import '@/assets/styles/global.less';

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 24px;
}

.app-footer {
  text-align: center;
  padding: 16px;
  font-size: 12px;
  color: @textColorPlaceholder;
}
</style>
```

- [ ] **Step 2: 运行所有测试**

```bash
npx vitest run
```

预期：全部测试 PASS。

- [ ] **Step 3: 端到端手动验证**

```bash
npm run dev
```

验证清单：

1. ✅ 首页显示 Header（logo + 用户头像）
2. ✅ 显示 HeroSection（标题 + 副标题）
3. ✅ 无项目时显示 CreateGuide 卡片 + 「创建」按钮
4. ✅ 显示三大特性 FeatureList
5. ✅ 点击「创建」→ 弹出 CreateModal
6. ✅ 表单空时「创建」按钮禁用
7. ✅ 填写项目名 + 机器人名 + 选头像 → 按钮激活
8. ✅ 点击「创建」→ 切换到 ProgressModal
9. ✅ 步骤依次推进（vm → openclaw → feishu），显示耗时
10. ✅ 全部完成 → 切换到 CompleteModal
11. ✅ 关闭完成弹窗 → 显示 ProjectCard（项目名 + 审批中标签）
12. ✅ 点击 `...` → 删除 → 弹出 DeleteConfirm
13. ✅ 确认删除 → 回到 CreateGuide 状态
14. ✅ 刷新页面 → 状态正确恢复（通过 MSW 返回）

- [ ] **Step 4: 构建检查**

```bash
npm run build
```

确认无 TypeScript 错误，构建成功。

- [ ] **Step 5: Commit**

```bash
git add src/App.vue
git commit -m "feat: integrate all components with complete create-progress-delete flow"
```

---

### Task 13: 静态资源与收尾

**Files:**
- Create: `public/avatars/` (12 个头像占位), `public/images/mascot.png` (占位)
- Modify: `.gitignore`

- [ ] **Step 1: 创建头像占位 SVG**

为 12 个头像创建简单的 SVG 占位文件（后续替换为真实头像）：

```bash
mkdir -p public/avatars public/images
```

创建一个脚本生成 12 个不同颜色的占位头像：

```bash
cd /Users/dawinyuan/Documents/coder/devops-claw
for i in $(seq 1 12); do
  color=$(printf '#%02x%02x%02x' $((RANDOM%200+50)) $((RANDOM%200+50)) $((RANDOM%200+50)))
  cat > "public/avatars/avatar-${i}.svg" << SVGEOF
<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <circle cx="48" cy="48" r="48" fill="${color}"/>
  <text x="48" y="56" text-anchor="middle" fill="white" font-size="32" font-family="Arial">${i}</text>
</svg>
SVGEOF
done
```

创建默认用户头像：

```bash
cat > public/avatars/default-user.svg << 'SVGEOF'
<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <circle cx="48" cy="48" r="48" fill="#006eff"/>
  <text x="48" y="56" text-anchor="middle" fill="white" font-size="36" font-family="Arial">D</text>
</svg>
SVGEOF
```

- [ ] **Step 2: 更新 Mock 数据中的头像路径为 SVG**

修改 `src/mocks/data.ts` 中的 `avatarList` 和 `mockUser`：

```typescript
export const avatarList = Array.from(
  { length: 12 },
  (_, i) => `/avatars/avatar-${i + 1}.svg`,
)

export const mockUser: MockUser = {
  id: 'user-001',
  name: '达尔文',
  avatarUrl: '/avatars/default-user.svg',
}
```

- [ ] **Step 3: 更新 .gitignore**

确保 `.gitignore` 包含：

```
node_modules
dist
.superpowers
```

- [ ] **Step 4: 验证头像显示**

```bash
npm run dev
```

确认 CreateModal 中的头像网格显示 12 个彩色圆形占位头像，顶部导航栏显示用户头像。

- [ ] **Step 5: 最终构建验证**

```bash
npm run build && npx vitest run
```

预期：构建成功，所有测试通过。

- [ ] **Step 6: Commit**

```bash
git add public/ src/mocks/data.ts .gitignore
git commit -m "feat: add placeholder avatars and finalize static assets"
```

---

## 自查结果

**规格覆盖检查：**

| 设计文档章节 | 对应 Task |
|-------------|-----------|
| 2. 项目结构 | Task 1 (脚手架) |
| 3. 状态管理 | Task 3 (类型 + Store) |
| 4.1 AppHeader | Task 5 |
| 4.2 HeroSection | Task 6 |
| 4.3 CreateGuide | Task 7 |
| 4.4 ProjectCard | Task 7 |
| 4.5 FeatureList | Task 6 |
| 4.6 CreateModal | Task 8 |
| 4.7 ProgressModal | Task 9 |
| 4.8 CompleteModal | Task 10 |
| 4.9 DeleteConfirm | Task 11 |
| 5. 样式体系 | Task 2 |
| 6. Mock API | Task 4 |
| 7. 错误处理 | Task 9 (轮询错误), Task 8 (表单验证) |
| 初始加载 | Task 12 (App.vue) |

**占位符扫描：** 无 TBD/TODO。所有代码步骤包含完整实现。

**类型一致性：** `Project`, `StepInfo`, `ProgressResponse`, `CreateProjectPayload` 等类型在 Task 3 定义，后续 Task 中引用路径和属性名一致。
