## Why

当前从实例管理页面点击「配置」按钮后，在新标签页打开的配置页面默认显示「聊天」页面（`/chat`），而不是用户期望的「控制台」页面。用户希望配置页面默认显示控制台视图，以便直接查看和管理 OpenClaw 实例。

## What Changes

- 修改 `OpenClawAdmin.vue` 的默认菜单选择，从「聊天」改为「概览」或合适的控制台页面
- 确保配置页面打开时 iframe 加载 Gateway Dashboard 的概览页面而非聊天页面
- 保留左侧边栏导航功能，允许用户切换到其他页面

## Capabilities

### New Capabilities
- `openclaw-default-console-view`: OpenClaw 配置页面默认显示控制台/概览视图而非聊天页面

### Modified Capabilities
<!-- 本变更是对默认行为的调整 -->

## Impact

- **代码影响**：
  - `src/components/OpenClawAdmin.vue` - 修改默认的 `activeMenu` 值
- **用户体验**：配置页面打开后默认显示更有价值的概览/控制台信息
- **API 影响**：无
