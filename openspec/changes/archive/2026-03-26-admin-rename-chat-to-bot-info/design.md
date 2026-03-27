## Context

OpenClawAdmin.vue 顶部栏右侧有"控制台/代码模式"Tab 切换和"去对话"按钮（第 32-35 行）。点击"去对话"调用 `handleChat()` 直接 `window.open(feishuChatUrl)`。上一次变更（rename-chat-to-bot-info）已在 ProjectCard 和 App.vue 层面实现了 BotInfoModal + store `openBotInfoModal` 方法。

## Goals / Non-Goals

**Goals:**
- 将 OpenClawAdmin 的"去对话"按钮改为"机器人信息"
- 点击后通过 emit 通知父组件打开 BotInfoModal（而非组件内直接打开）

**Non-Goals:**
- 不重复创建 BotInfoModal 组件（已存在）
- 不修改 store 或类型（已有 `bot_info` ModalState 和 `openBotInfoModal`）

## Decisions

**D1: 通过 emit 通知父组件而非组件内直接管理 Modal**
- 选择：OpenClawAdmin emit `showBotInfo` 事件，App.vue 中监听并调用 `store.openBotInfoModal()`
- 理由：OpenClawAdmin 是全屏独立布局组件，不参与 App.vue 的 Modal 管理区域。Modal 由 App.vue 统一渲染
- 替代方案：在 OpenClawAdmin 内部引入 BotInfoModal — 会导致 Modal 层级被 OpenClawAdmin 容器裁剪

## Risks / Trade-offs

- **[飞书对话快捷入口变深了一层]** → BotInfoModal 内已有"前往飞书对话"按钮，多一步操作
