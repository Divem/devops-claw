## Why

ProjectCard 上的"去对话"按钮直接跳转飞书对话链接，不符合管理面板场景下用户需要查看机器人信息（如名称、App ID、状态等）的核心需求。需要将其替换为"机器人信息"功能，点击后展示机器人的详细配置信息面板。

## What Changes

- 将 ProjectCard 的"去对话"按钮更名为"机器人信息"，图标从 💬 改为 🤖
- 点击"机器人信息"后不再跳转外链，而是打开机器人信息面板（Modal）
- 机器人信息面板展示：机器人名称、App ID、状态、创建时间等信息
- App.vue 中将 `handleChat`（跳转外链）替换为打开机器人信息 Modal 的逻辑

## Capabilities

### New Capabilities
- `bot-info-modal`: 机器人信息弹窗，展示机器人名称、App ID、状态、创建时间等详细信息

### Modified Capabilities

## Impact

- **组件**: `ProjectCard.vue` — 按钮文案和 emit 事件名修改
- **组件**: 新增 `BotInfoModal.vue`
- **入口**: `App.vue` — 替换 chat 事件处理逻辑
- **Store**: `ModalState` 类型可能需新增状态（复用已有 modal 机制或单独管理）
- **类型**: 无新增类型依赖
