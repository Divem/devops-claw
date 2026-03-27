## Context

当前项目卡片（ProjectCard）和 OpenClaw 管理页面（OpenClawAdmin）中均有「机器人信息」按钮，点击后通过 store.openBotInfoModal() 打开 BotInfoModal 弹框。BotInfoModal 展示机器人名称、App ID（未配置/已配置）、项目状态、创建时间和飞书对话按钮。

另外，项目卡片下方有一个独立的 BotConfigPanel 折叠面板，用于编辑 App ID 和 Secret。两者功能有重叠，用户需要分别打开查看信息和编辑配置。

## Goals / Non-Goals

**Goals:**
- 将机器人信息从弹框改为下拉面板，点击按钮切换展开/收起
- 下拉面板展示：机器人名称、App ID、Secret（掩码）、凭证配置状态（待配置/已连接）、创建时间、飞书对话按钮
- App ID 和 Secret 支持内联编辑（点击字段变为输入框，编辑后保存）
- 用 BotInfoDropdown 替代 BotInfoModal + BotConfigPanel 两个组件

**Non-Goals:**
- 不修改飞书对话按钮的行为
- 不修改后端 API 接口（复用现有 PUT /api/project/:id/bot-config）
- 不修改创建项目弹框中的凭证输入逻辑

## Decisions

### 1. 下拉组件选型：使用 NPopover

**选择**：使用 Naive UI 的 NPopover 作为下拉容器，trigger="click"。

**替代方案**：NDropdown（纯菜单，不支持复杂内容渲染）。

**理由**：NPopover 支持任意自定义内容，可以包含信息展示和编辑表单。NDropdown 仅适合简单菜单选项。

### 2. 内联编辑交互：点击值区域进入编辑模式

**选择**：信息展示模式下，App ID 和 Secret 字段显示为文本，右侧有编辑图标。点击后切换为输入框，输入框旁显示保存/取消按钮。

**替代方案**：始终显示输入框。

**理由**：查看是高频操作，编辑是低频操作。默认展示模式更清晰。

### 3. 凭证配置状态：基于 appId + secret 是否存在

**选择**：状态仅判断 `project.appId` 是否存在。Secret 在前端不暴露（安全考虑），但 appId 存在意味着凭证已配置。

**替代方案**：增加后端字段标识凭证完整状态。

**理由**：当前 Project 类型中 appSecret 不返回前端，仅通过 appId 即可判断凭证是否已配置。状态语义为「待配置/已连接」而非精确的凭证完整性。

### 4. 组件放置：直接嵌入 ProjectCard 和 OpenClawAdmin

**选择**：移除 store 中的 modalState 管理，BotInfoDropdown 作为独立组件直接在 ProjectCard 和 OpenClawAdmin 中使用。

**替代方案**：保留 store 管理，在 App.vue 中渲染。

**理由**：下拉面板无需全局状态管理，组件自包含即可。移除 modalState 简化架构。

## Risks / Trade-offs

- **[风险] NPopover 在 iframe 上层可能有 z-index 问题** → 缓解：OpenClawAdmin 使用 fixed 定位，NPopover 也会使用 fixed 定位，通常不会有层级问题。如有问题可通过 placement 调整。
- **[权衡] 移除 BotConfigPanel 后项目卡片布局变化** → 缓解：BotConfigPanel 仅在有项目时显示，移除后卡片下方空间减少，视觉上更简洁。
