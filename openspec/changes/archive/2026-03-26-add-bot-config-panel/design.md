## Context

当前项目面板（`ProjectCard.vue`）仅展示项目基础信息（名称、状态、头像）和操作按钮（打开项目、去对话、删除）。飞书机器人凭据（App ID / Secret）由后端在创建流程中自动处理，前端无配置入口。现有表单模式参考 `CreateModal.vue`：`reactive` 表单 + `computed` 校验 + Naive UI 组件。

## Goals / Non-Goals

**Goals:**
- 在项目面板中新增 Bot 配置区域，支持手动输入 App ID 和 App Secret
- 支持 Secret 字段的显示/隐藏切换
- 提供保存按钮，调用后端 API 更新配置
- 配置保存后给出明确的成功/失败反馈

**Non-Goals:**
- 不涉及飞书机器人自动创建流程的改造
- 不涉及 OAuth 回调或其他高级配置（Event Subscription、权限管理等）
- 不做配置的加密存储方案设计（后端职责）
- 不做批量项目配置管理

## Decisions

**D1: 配置面板作为独立组件而非内联在 ProjectCard 中**
- 选择：新建 `BotConfigPanel.vue` 组件
- 理由：ProjectCard 已包含展示和操作逻辑，职责单一；配置表单是独立的交互单元，便于复用和测试
- 替代方案：在 ProjectCard 中直接添加表单 — 会使组件过于臃肿

**D2: 使用 NInput 的 password 模式而非自定义眼睛图标**
- 选择：`<n-input type="password" show-password-on="click" />`
- 理由：Naive UI 原生支持密码切换，无需额外引入图标库，保持 UI 一致性
- 替代方案：自定义 NIcon + NEye — 增加代码复杂度且样式需要手动对齐

**D3: API 设计为 PUT 而非 PATCH**
- 选择：`PUT /api/project/:id/bot-config`
- 理由：Bot 配置是完整的替换操作（App ID 和 Secret 一起提交），符合 PUT 语义
- 替代方案：`PATCH /api/project/:id` — 范围过宽，不够聚焦

**D4: 表单校验为前端非空校验 + 后端格式校验**
- 选择：前端仅检查非空，格式校验由后端返回错误信息
- 理由：App ID / Secret 格式规则由飞书定义且可能变化，前端硬编码格式规则容易过时

## Risks / Trade-offs

- **[Secret 在前端短暂可见]** → 使用 password 模式默认隐藏；保存后 API 请求走 HTTPS；后端返回时脱敏显示
- **[配置面板占用项目卡片空间]** → 使用可折叠/展开的 Accordion 模式，默认收起，需要时展开配置
