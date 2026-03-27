## Why

OpenClaw 管理页面顶部栏的"去对话"按钮直接跳转飞书外链，不符合管理面板场景。用户需要在该位置查看机器人信息（名称、App ID、状态等），而非直接跳转到飞书对话。

## What Changes

- 将 OpenClawAdmin 顶部栏的"去对话"按钮改为"机器人信息"，图标从 💬 改为 🤖
- 点击后弹出机器人信息 Modal，展示机器人名称、App ID、状态、创建时间
- Modal 内保留"前往飞书对话"入口链接

## Capabilities

### New Capabilities

### Modified Capabilities
- `openclaw-admin-page`: "去对话"按钮改为"机器人信息"，行为从跳转外链改为打开 Modal

## Impact

- **组件**: `OpenClawAdmin.vue` — 按钮文案/图标/事件修改
- **组件**: 新增 `BotInfoModal.vue`（复用上次已创建的组件）
- **Store**: 复用已有的 `openBotInfoModal` 方法和 `bot_info` ModalState
- **Spec**: 修改 `openclaw-admin-page` spec 中"点击去对话按钮"场景
