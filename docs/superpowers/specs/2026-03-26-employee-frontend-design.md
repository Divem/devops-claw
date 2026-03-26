# DevOps OpenClaw 员工端前台设计文档

> 日期：2026-03-26 | 状态：已批准

## 1. 概述

### 1.1 范围

本设计覆盖 DevOps OpenClaw **员工端前台** MVP 的全部 P0 功能，包括 6 个页面/组件：

1. 首页/引导创建
2. 创建项目弹窗
3. 创建进度展示
4. 创建完成
5. 已创建状态（我的项目）
6. 删除确认弹窗

### 1.2 不在范围内

- 管理端后台
- 后端服务（编排引擎、飞书集成、监控）
- 飞书 OAuth 登录（MVP 用 Mock 用户）
- WebSocket 实时推送（MVP 用轮询模拟）
- Gateway Dashboard 嵌入

### 1.3 技术栈

| 技术 | 用途 |
|------|------|
| Vue 3 + TypeScript | 框架 |
| Vite | 构建工具 |
| Naive UI | 组件库（与 MTP design token 同源） |
| Pinia | 状态管理 |
| Less + Tailwind CSS | 样式体系 |
| MSW (Mock Service Worker) | API Mock（仅开发环境） |

### 1.4 设计参考

- UI 截图：`docs/images/01~06`
- 设计规范：`docs/design-token.md`
- 产品需求：`docs/devops-claw-prd.md`

---

## 2. 项目结构

```
devops-claw/
├── src/
│   ├── App.vue                  # 根组件
│   ├── main.ts                  # 入口，注册 Naive UI / Pinia
│   ├── assets/
│   │   └── styles/
│   │       ├── variables.less   # MTP design token Less 变量
│   │       └── global.less      # 全局样式覆盖
│   ├── components/
│   │   ├── AppHeader.vue        # 顶部导航栏
│   │   ├── HeroSection.vue      # 主图 + 标题区域
│   │   ├── FeatureList.vue      # 三大特性列表
│   │   ├── ProjectCard.vue      # 项目卡片（已创建状态）
│   │   ├── CreateGuide.vue      # 未创建时的引导卡片
│   │   ├── CreateModal.vue      # 创建项目弹窗
│   │   ├── ProgressModal.vue    # 创建进度弹窗
│   │   ├── CompleteModal.vue    # 创建完成弹窗
│   │   └── DeleteConfirm.vue    # 删除确认弹窗
│   ├── stores/
│   │   └── project.ts           # Pinia store
│   ├── mocks/
│   │   ├── handlers.ts          # MSW 请求处理器
│   │   ├── data.ts              # Mock 数据
│   │   └── browser.ts           # MSW 浏览器 worker
│   └── types/
│       └── project.ts           # TypeScript 类型定义
├── public/
│   ├── avatars/                 # 12 个预设机器人头像
│   └── images/                  # 吉祥物插图、完成页装饰图
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

关键决策：

- **单页面，无路由** — 整个员工端是一个页面，两种状态切换（未创建 ↔ 已创建），不需要 Vue Router
- **弹窗驱动交互** — 创建流程的 3 个步骤（填写→进度→完成）都是弹窗，由 Pinia store 状态机控制切换
- **MSW 条件加载** — 通过 `import.meta.env.DEV` 条件加载，不污染生产构建

---

## 3. 状态管理

### 3.1 类型定义

```typescript
// 页面状态
type PageState = 'empty' | 'has_project'

// 弹窗状态
type ModalState = 'none' | 'create' | 'progress' | 'complete' | 'delete'

// 创建进度
type ProgressStep = 'vm' | 'openclaw' | 'feishu'
type StepStatus = 'pending' | 'running' | 'done' | 'error'

interface StepInfo {
  key: ProgressStep
  label: string
  status: StepStatus
  elapsed?: number  // 耗时（秒）
}

// 项目数据
interface Project {
  id: string
  name: string
  botName: string
  avatarUrl: string
  status: 'creating' | 'deployed' | 'pending_approval' | 'error'
  gatewayUrl?: string
  feishuChatUrl?: string
  createdAt: string
}
```

### 3.2 状态流转

```
用户首次访问
  → pageState: 'empty' → 展示 CreateGuide

点击「创建」
  → modalState: 'create' → 打开 CreateModal

填写信息，点击确认
  → modalState: 'progress' → 切换到 ProgressModal
  → 依次推进 steps: vm → openclaw → feishu
  → 每步通过 Mock API 模拟延迟和状态更新

全部完成
  → modalState: 'complete' → 切换到 CompleteModal
  → project.status: 'pending_approval'

关闭弹窗
  → modalState: 'none', pageState: 'has_project'
  → 展示 ProjectCard

点击「...」→ 删除
  → modalState: 'delete' → 打开 DeleteConfirm

确认删除
  → 清空 project, pageState: 'empty'
```

---

## 4. 组件设计

### 4.1 AppHeader

- 左侧：Logo + "DevOps OpenClaw" 文字
- 右侧：用户头像（Mock 用户，固定显示）
- 高度 `57px`（`@header-height`），底部阴影 `0px 2px 10px 0px rgba(96,102,110,0.05)`

### 4.2 HeroSection

- 左侧：标题 "DevOps OpenClaw" + 副标题
- 右侧：龙虾吉祥物插图（静态图片，放 `public/images/`）
- 居中布局，最大宽度约 `800px`

### 4.3 CreateGuide（未创建状态）

- 图标 + "创建 DevOps OpenClaw" + 描述文字
- 右侧「创建」按钮（深色实心按钮）
- 白色卡片，圆角 `4px`，阴影 `0px 0px 2px 0px rgba(0,0,0,0.1)`

### 4.4 ProjectCard（已创建状态）

- 与 CreateGuide 同一位置，根据 `pageState` 互斥显示
- 头像 + 项目名 + 状态标签 + 操作按钮组
- 操作按钮：`...` 更多菜单（含删除）、「打开项目」、「去对话」
- 状态标签颜色映射：
  - `deployed` → `#00b81f`
  - `pending_approval` → `#ff8800`
  - `error` → `#f23030`

### 4.5 FeatureList

三行特性描述，每行：图标 + 标题 + 描述文字：

1. 一键部署，开箱即用
2. 原生体验，能力无损
3. 企业级安全，数据不离场

### 4.6 CreateModal

- 标题："创建 OpenClaw 项目"
- 副标题："一键接入飞书，创建预计耗时 1 分钟。"
- 表单：
  - 项目名输入框（必填，1-30 字符）
  - 机器人名称输入框（必填，1-20 字符）
  - 头像选择网格（3×4，12 个预设头像，点击选中高亮边框）
- 底部「创建」按钮，表单验证通过后可点击
- 可通过 × 或遮罩关闭

### 4.7 ProgressModal

- 标题："正在创建 OpenClaw 项目"
- 副标题："一键接入飞书，创建预计耗时 1 分钟。"
- 三步竖向列表，步骤间竖线连接：
  - ○ 启动云端电脑 — 右侧显示耗时
  - ○ 启动 OpenClaw
  - ○ 连接飞书
- 当前步骤图标旋转动画，已完成步骤打勾变绿
- 底部按钮禁用态，文字"创建中"带 loading spinner
- **创建进行中禁止关闭弹窗**（无关闭按钮，点击遮罩不关闭）
- 失败时：对应步骤标红，底部变为「重试」按钮

### 4.8 CompleteModal

- 标题："你的 OpenClaw 已部署"
- 描述：审批提示文字（"由于企业管理员安全设置，飞书机器人正在审批中..."）
- 中间：装饰性插图
- 底部两个按钮：「打开 OpenClaw 项目」（次要/outline）+「查看审批单」（主要/实心）
- 可通过 × 或遮罩关闭

### 4.9 DeleteConfirm

- 红色警告图标 + "删除智能助手？"
- 描述："删除后内容无法恢复，请谨慎操作"
- 「取消」+「删除」（红色危险按钮）
- 点击「取消」或遮罩关闭

---

## 5. 样式体系

### 5.1 Naive UI 主题覆盖

通过 `NConfigProvider` 的 `themeOverrides` 注入 MTP design token：

```typescript
const themeOverrides = {
  common: {
    primaryColor: '#006eff',
    primaryColorHover: '#57a3f3',
    successColor: '#00b81f',
    warningColor: '#ff8800',
    errorColor: '#f23030',
    infoColor: '#409eff',
    fontFamily: "'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif",
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
  Button: { borderRadiusMedium: '6px' },
  Modal: { borderRadius: '6px' },
  Card: {
    borderRadius: '4px',
    boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.1)',
  },
  Input: { borderRadius: '2px' },
}
```

### 5.2 样式分层

| 层级 | 文件 | 职责 |
|------|------|------|
| Design Token | `variables.less` | `@primaryColor` 等 Less 变量 |
| 全局样式 | `global.less` | 页面背景、字体、滚动条隐藏 |
| Tailwind | `tailwind.config.ts` | 断点、间距、字号映射 |
| 组件样式 | 各 `.vue` `<style lang="less" scoped>` | 组件级样式 |

### 5.3 Tailwind 配置

```typescript
export default {
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
    },
    extend: {
      colors: { primary: '#0960bd' },
    },
  },
}
```

### 5.4 Less 与 Tailwind 分工

- **Less**：组件内部样式（scoped），引用 `@primaryColor` 等变量
- **Tailwind**：布局（flex、padding、margin、gap）和快速原型

---

## 6. Mock API

### 6.1 初始化

`main.ts` 中条件加载（仅开发环境）：

```typescript
if (import.meta.env.DEV) {
  const { worker } = await import('./mocks/browser')
  await worker.start({ onUnhandledRequest: 'bypass' })
}
```

### 6.2 端点

| 方法 | 路径 | 说明 |
|------|------|------|
| `GET` | `/api/project` | 获取当前用户项目，无则返回 404 |
| `POST` | `/api/project` | 创建项目，返回 project id |
| `GET` | `/api/project/:id/progress` | 轮询创建进度，按调用次数递进 |
| `DELETE` | `/api/project/:id` | 删除项目，返回 204 |
| `GET` | `/api/avatars` | 返回头像列表 |

### 6.3 进度模拟逻辑

Mock handler 内部维护调用计数器：

- 第 1 次调用 → `vm: running`，其余 `pending`
- 第 2 次（延迟 ~2s）→ `vm: done, openclaw: running`
- 第 3 次（延迟 ~2s）→ `vm: done, openclaw: done, feishu: running`
- 第 4 次（延迟 ~1s）→ 全部 `done`

前端轮询间隔 2 秒。全部 done 后停止轮询。

### 6.4 Mock 用户

```typescript
export const mockUser = {
  id: 'user-001',
  name: '达尔文',
  avatarUrl: '/avatars/default-user.png',
}
```

所有 API 请求以此用户响应，不做 token 校验。

---

## 7. 错误处理

### 7.1 创建流程

| 场景 | 处理 |
|------|------|
| 创建 API 调用失败 | ProgressModal 第一步标红，显示「重试」按钮 |
| 某步骤超时（>30s） | 停止轮询，当前步骤标红，显示「重试」 |
| 轮询网络中断 | 连续 3 次失败后停止，显示错误状态 |
| 重试 | 重新 POST 创建，从头开始三步流程 |

### 7.2 表单验证

| 字段 | 规则 |
|------|------|
| 项目名 | 必填，1-30 字符 |
| 机器人名称 | 必填，1-20 字符 |
| 头像 | 必选一个 |

验证不通过时「创建」按钮禁用，输入框下方红色提示。

### 7.3 页面初始加载

```
App 挂载 → GET /api/project
  → 有项目 → pageState: 'has_project'
  → 无项目 → pageState: 'empty'
  → 加载中 → 全局 loading skeleton
```

---

## 8. 后续扩展点

MVP 完成后可按 PRD 路线扩展：

| 扩展 | 改动 |
|------|------|
| 飞书 OAuth 登录 | 替换 Mock 用户，添加登录页 |
| WebSocket 实时进度 | 替换轮询，ProgressModal 改为监听 WS 消息 |
| 多项目支持 | `project` store 改为数组，ProjectCard 改为列表 |
| Gateway Dashboard 嵌入 | 「打开项目」按钮跳转 iframe 或新窗口 |
| 管理端后台 | 独立模块，引入 Vue Router 区分员工端/管理端 |
