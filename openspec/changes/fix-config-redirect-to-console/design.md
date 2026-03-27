## Context

`OpenClawAdmin.vue` 组件是 OpenClaw 配置页面的核心组件，它包含：
- 顶部 Tab 栏（控制台、代码模式、终端）
- 左侧边栏导航（控制台、聊天、概览、通道等）
- 主内容区（iframe 加载 Gateway Dashboard）

当前默认行为：
- `activeMenu` 默认值为 `'chat'`（聊天）
- `activeView` 默认值为 `'console'`（表示显示控制台视图模式）

菜单项定义：
- `console`: 控制台（path: null，显示 ConsoleView 组件）
- `chat`: 聊天（path: '/chat'，iframe 加载）
- `overview`: 概览（path: '/overview'，iframe 加载）
- 其他菜单项...

## Goals / Non-Goals

**Goals:**
- 配置页面打开时默认显示有意义的页面（概览/控制台）
- iframe 加载 Gateway Dashboard 的概览页面作为默认视图
- 保持所有现有功能不变

**Non-Goals:**
- 不修改 ConsoleView 组件的功能
- 不添加新的菜单项
- 不改变路由结构

## Decisions

### Decision 1: 将默认菜单改为「概览」
**选择：** 将 `activeMenu` 的默认值从 `'chat'` 改为 `'overview'`

**理由：**
- 「概览」页面通常包含实例的整体状态和关键信息
- 比「聊天」页面更适合作为默认入口
- 仍然通过 iframe 加载 Gateway Dashboard

**替代方案考虑：**
- 方案A：修改为 `console` - 但 `console` 显示的是 ConsoleView（社区报告），不是 Gateway 页面
- 方案B：添加新的默认视图 - 过于复杂，没必要

### Decision 2: 保留现有 iframe 加载机制
**选择：** 保持现有的 iframe 加载逻辑，仅修改默认选中的菜单项

**理由：**
- 改动最小化，风险最低
- 不改变组件架构

## Risks / Trade-offs

| 风险 | 可能性 | 影响 | 缓解措施 |
|------|--------|------|----------|
| 用户习惯改变 | 低 | 低 | 概览页面比聊天页面更适合作为默认页 |

## Migration Plan

仅需修改默认值，无需数据迁移。

## Open Questions

无。
