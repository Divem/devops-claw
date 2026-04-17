## Context

BotInfoDropdown 组件（`src/components/BotInfoDropdown.vue`）当前有编辑模式和查看模式。用户保存凭证后显示 `$message.success("机器人凭证已更新")`，但没有后续引导。

根据员工驱动模式的部署流程（PRD 5.1.2），凭证配置完成后还需管理员完成：
1. 配置 WebSocket 长连接 + 事件订阅
2. 发布应用

用户完成凭证配置后不知道下一步该做什么。

## Goals / Non-Goals

**Goals:**
- 凭证保存成功后，在 BotInfoDropdown 中展示引导提示，告知需联系管理员发布应用
- 提示文案清晰、不阻断操作

**Non-Goals:**
- 不做管理员端的任何改动
- 不做自动通知管理员的功能（仅文案引导）
- 不改变现有凭证保存逻辑

## Decisions

**1. 引导展示位置：凭证信息下方**

在 BotInfoDropdown 的查看模式中，当状态为"待配置"（有 AppID 但未连接）时，在凭证信息和操作按钮之间插入引导提示区域。

选择理由：用户保存凭证后回到查看模式，自然看到引导；不干扰编辑流程。

**2. 引导样式：NAlert info 类型**

使用 Naive UI 的 NAlert 组件（type="info"），轻量且与现有 UI 风格一致。

**3. 显示条件：有 AppID 且状态非"已连接"**

- `project.appId` 存在且 `project.botStatus !== 'connected'` 时显示
- 已连接状态不显示（说明管理员已完成发布）

## Risks / Trade-offs

- [文案可能过时] → 文案写为通用引导，不涉及具体操作步骤细节
- [提示可能被忽略] → 使用 info 色调的 Alert 组件，视觉上足够醒目但不打断操作
