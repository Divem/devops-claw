## Context

ProjectCard 当前有两个操作按钮："配置 OpenClaw"和"去对话"。其中"去对话"按钮直接调用 `window.open(store.project?.feishuChatUrl)` 跳转飞书外链。现有 Modal 机制通过 `ModalState` 类型（'none' | 'create' | 'progress' | 'complete' | 'delete'）在 `App.vue` 统一管理。

## Goals / Non-Goals

**Goals:**
- 将"去对话"按钮改为"机器人信息"，点击后展示机器人详情弹窗
- 弹窗展示机器人名称、App ID、状态、创建时间等关键信息
- 保持与现有 Modal 管理机制一致

**Non-Goals:**
- 不移除飞书对话入口（可在弹窗内保留跳转链接）
- 不修改机器人配置逻辑（已有 BotConfigPanel 组件负责）
- 不改变 ModalState 联合类型的管理模式

## Decisions

**D1: 复用 ModalState 机制而非独立状态管理**
- 选择：在 `ModalState` 联合类型中新增 `'bot_info'` 状态
- 理由：与现有 create/progress/complete/delete 弹窗管理方式一致，统一在 App.vue 中控制显隐
- 替代方案：BotInfoModal 自行管理显隐状态 — 会脱离全局 Modal 生命周期管理

**D2: 机器人信息面板使用独立 Modal 组件**
- 选择：新建 `BotInfoModal.vue`，接收 `project` prop
- 理由：与 CreateModal、ProgressModal、CompleteModal 保持相同的组件模式，职责单一

**D3: emit 事件名从 chat 改为 showBotInfo**
- 选择：ProjectCard 的 emit 事件名从 `chat` 改为 `showBotInfo`
- 理由：语义更准确，反映实际行为（展示信息）而非旧行为（跳转对话）

## Risks / Trade-offs

- **[失去快速跳转飞书对话的入口]** → 在 BotInfoModal 内底部保留"前往飞书对话"外链按钮，兼顾信息查看与快捷操作
- **[ModalState 联合类型持续膨胀]** → 当前仅 6 个状态，尚可接受；后续如继续增长可考虑拆分为独立 Modal 管理器
