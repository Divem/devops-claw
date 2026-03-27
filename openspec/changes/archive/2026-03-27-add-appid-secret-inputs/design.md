## Context

当前 CreateModal 组件（`src/components/CreateModal.vue`）包含项目名、机器人名称和头像选择三个字段。AppID/Secret 的配置在项目创建后通过 BotConfigPanel（`src/components/BotConfigPanel.vue`）完成，是一个两步流程。本次变更将凭证输入前移到创建弹框中，使员工可以在创建时一并提供。

现有凭证分配架构：后端维护凭证池，创建项目时从池中自动分配。本次变更需要兼容两种模式——员工自选凭证和凭证池自动分配。

## Goals / Non-Goals

**Goals:**
- 在创建弹框的「配置飞书渠道」模块中新增 App ID 和 App Secret 输入框
- 两个字段选填，不填写时行为与现有流程一致（凭证池自动分配）
- 填写时优先使用员工提供的凭证，跳过凭证池分配
- App Secret 使用密码输入类型，支持显示/隐藏切换

**Non-Goals:**
- 不修改凭证池管理端功能
- 不修改 BotConfigPanel 的现有行为（创建后仍可修改凭证）
- 不增加凭证格式校验逻辑（由后端统一校验）
- 不改变弹框的整体布局结构和样式风格

## Decisions

### 1. 字段放置位置：嵌入「配置飞书渠道」模块

**选择**：在机器人名称输入框和头像选择之间插入 App ID 和 App Secret 输入框。

**替代方案**：作为独立的「可选配置」模块放在底部。

**理由**：AppID/Secret 与飞书渠道强相关，放在同一模块内语义连贯。飞书 OpenClaw 的参考截图也采用了类似的分组方式。使用 hint 文字「选填，不填则由系统自动分配」明确告知用户可选。

### 2. App Secret 显示/隐藏：使用 NInput 的 show-password-on="click"

**选择**：利用 Naive UI NInput 原生的 `show-password-on="click"` 属性。

**理由**：与项目内 BotConfigPanel 的实现方式一致（复用相同模式），无需额外引入图标组件。

### 3. Payload 扩展：在 CreateProjectPayload 中新增可选字段

**选择**：`CreateProjectPayload` 新增 `appId?: string` 和 `appSecret?: string` 可选字段。

**理由**：非 breaking change，现有不传凭证的调用行为不变。后端通过判断字段是否存在决定分配策略。

### 4. 后端凭证分配策略：员工优先，凭证池兜底

**选择**：如果请求中包含 `appId` 和 `appSecret`，优先使用员工提供的凭证；否则从凭证池分配。两种方式均走加密存储（AES-256）。

**理由**：保持向后兼容，不影响已有凭证池流程。

## Risks / Trade-offs

- **[风险] 员工填写错误的凭证导致创建失败** → 缓解：后端在创建流程早期校验凭证有效性，失败时返回明确的错误提示，员工可在弹框内修改后重试。
- **[风险] 弹框内容增多可能导致高度过大** → 缓解：仅新增两个输入框，整体增加约 80px 高度，在常见屏幕尺寸下仍在可视范围内。
- **[权衡] 凭证前移可能降低安全性意识** → 缓解：hint 文字引导用户理解凭证用途，Secret 字段默认隐藏。
