## Context

`AgentTypeSelectModal.vue` 是用户在项目创建流程中首次选择 Agent 类型的弹框组件。当前描述文案较短，未充分体现两种 Agent 的定位差异，且缺少引导用户深入了解产品的外链入口。本次变更聚焦文案升级与交互增强，范围局限在单个 Vue 组件内。

## Goals / Non-Goals

**Goals:**
- 在弹框卡片内补充能帮助用户做决策的定位文案（结合 devops-claw 企业级自托管场景）。
- 为每种 Agent 提供可点击的官方链接，跳转至对应官网。
- 保持现有样式变量与交互行为不变。

**Non-Goals:**
- 不修改选择后的业务逻辑或路由跳转。
- 不引入新的外部依赖或图标库。
- 不改动弹框尺寸、动画及关闭行为。

## Decisions

- **文案结构**：保留原有 `type-name` + `type-desc` 两行结构，将 `type-desc` 扩展为一段包含“适合什么”的总结性文案；在卡片底部新增独立的 `type-footer` 区域放置「了解更多」链接，避免与描述混排导致信息层级混乱。
- **链接交互**：使用原生 `<a>` 标签并设置 `target="_blank" rel="noopener noreferrer"`，确保在新标签页打开并满足安全规范；不使用 `n-button text` 样式，避免与右侧「选择」按钮在视觉上产生歧义。
- **数据组织**：在组件 `script` 内新增常量对象 `agentDetails` 集中管理文案与链接，保持模板简洁，便于后续国际化或动态配置扩展。

## Risks / Trade-offs

- [Risk] 外部官网域名变更导致链接失效 → Mitigation: 将链接收敛到 `agentDetails` 常量对象中，后续仅需修改一处。
- [Risk] 文案过长导致卡片高度增加、布局失衡 → Mitigation: 控制文案在两行以内，并复用现有 `line-height: 1.5` 与 `font-size: 12px` 的样式约束。
