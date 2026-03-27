## Context

当前 CreateModal.vue 组件中，appid 和 secret 输入框缺少标签说明。用户填写表单时不清楚这两个字段的具体含义和格式要求。

## Goals / Non-Goals

**Goals:**
- 为 appid 输入框添加清晰的标签 "应用 ID (App ID)"
- 为 secret 输入框添加清晰的标签 "应用密钥 (App Secret)"
- 标签样式与现有表单组件保持一致
- 提升表单可读性和用户体验

**Non-Goals:**
- 不修改输入框的功能或验证逻辑
- 不改变表单的布局结构
- 不影响 API 或数据模型

## Decisions

**Decision 1: 标签文本使用中英双语**
- **Rationale**: 飞书开发者同时熟悉中英文术语，双语标签更准确传达字段含义
- **Alternative**: 仅使用中文 "应用ID" 和 "应用密钥" - 技术上可行但不够精确

**Decision 2: 复用现有 .form-label 样式类**
- **Rationale**: 与项目名、机器人名称字段保持一致的视觉风格
- **Alternative**: 创建新的标签样式 - 不必要，会增加样式复杂度

**Decision 3: 每个输入框独立标签**
- **Rationale**: 明确区分 appid 和 secret 两个不同的字段
- **Alternative**: 使用一个统一的 "飞书凭证" 标签组 - 不够清晰

## Risks / Trade-offs

- [风险] 新增标签可能会略微增加表单垂直高度
  - 缓解: 使用紧凑的 label 元素，样式已与现有表单保持一致
- [风险] 用户可能需要适应新的标签位置
  - 缓解: 这是正向的用户体验改进，用户反馈预期积极
