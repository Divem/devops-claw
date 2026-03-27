## Context

当前 `OpenClawAdmin.vue` 使用顶部 Tab 在「控制台」和「代码模式」两个视图之间切换，内容区高度受限（`calc(100vh - 200px)`），管理页面嵌套在 App.vue 的主布局中（Header + HeroSection + FeatureList + Footer）。

参考飞书 OpenClaw Gateway Dashboard 设计，需要改为全屏独立布局：左侧固定侧边导航 + 右侧内容区，撑满整个视口。

当前项目不使用 vue-router，通过 Pinia store 的 `pageState` 控制页面切换。管理页面状态为 `'admin'`。

## Goals / Non-Goals

**Goals:**
- 管理页面全屏独立布局，不显示首页 Header、HeroSection、FeatureList、Footer
- 左侧固定宽度侧边导航，包含完整菜单项
- 右侧内容区根据导航选择显示对应 iframe
- 顶部项目信息（头像、名称、状态）集成到侧边导航顶部
- 保持现有的 iframe 加载状态和错误处理逻辑

**Non-Goals:**
- 不引入 vue-router，继续使用 pageState 控制页面切换
- 不实现侧边导航各菜单项的实际功能（仅 iframe 嵌入占位）
- 不修改后端 Gateway 反向代理逻辑
- 不修改落地页（LandingPage）行为

## Decisions

### 1. 布局结构：侧边导航 + 内容区

选择左侧固定侧边导航（宽度 220px）+ 右侧弹性内容区的经典管理后台布局。

**替代方案：** 顶部水平导航 + 下方内容区 — 不采用，因为参考设计使用侧边导航，且菜单项较多（9 项），水平导航空间不足。

### 2. 全屏隔离：App.vue 条件渲染

当 `pageState === 'admin'` 时，App.vue 不渲染 Header、Footer、FeatureList 等首页元素，仅渲染 OpenClawAdmin 组件并使其撑满视口。

**实现方式：** 将 OpenClawAdmin 从 `<main class="app-main">` 中移出，与 `.app` div 同级或独立渲染，确保不受 `.app-main` 的 padding 和居中约束影响。

### 3. 侧边导航结构

侧边导航分两个区域：
- **顶部区域**：项目信息（头像 + 名称 + 状态标签）+ 返回按钮 + 去对话按钮
- **菜单区域**：导航菜单项列表，每项包含图标 + 文字

菜单项定义：
| key | label | Gateway 路径 |
|-----|-------|-------------|
| chat | 聊天 | /chat |
| overview | 概览 | /overview |
| channels | 通道 | /channels |
| instances | 实例 | /instances |
| sessions | 会话 | /sessions |
| usage | 使用情况 | /usage |
| schedules | 定时任务 | /schedules |
| config | 配置 | /code |
| logs | 日志 | /logs |
| docs | 文档 | /docs |

### 4. 样式方案

使用项目已有的 Less 变量体系（MTP Web 设计 token），不引入新的 UI 库。侧边导航使用 `position: fixed` 或 flex 布局实现固定定位。

### 5. 图标方案

菜单项图标使用 Unicode/Emoji 字符，与现有组件（ProjectCard 的 ⚙️、OpenClawAdmin 的 💬）保持一致风格，不引入图标库。

## Risks / Trade-offs

- **[iframe 高度不足]** → 管理页面全屏后，内容区高度为 `100vh`，iframe 可获得更大显示区域，风险降低
- **[菜单项无实际功能]** → 非 chat/config 的菜单项 iframe 指向 Gateway 不存在的路由，mock 下会返回通用 mock 页面，用户理解为"开发中"即可
- **[无 vue-router]** → 无法使用浏览器前进/后退在管理页面菜单间导航，但当前项目架构如此，不在此变更中引入
