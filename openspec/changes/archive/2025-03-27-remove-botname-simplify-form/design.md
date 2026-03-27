## Context

当前 CreateModal.vue 中，"配置飞书渠道" 区域包含三个输入框：机器人名称、AppID、Secret。这增加了用户的填写负担。同时 AppID 和 Secret 标签使用与主标签相同的加粗样式，视觉上没有区分度。

## Goals / Non-Goals

**Goals:**
- 移除机器人名称输入框，简化飞书渠道配置流程
- 为 AppID 和 Secret 创建非加粗标签样式，与主标签形成视觉层次
- 调整表单验证逻辑，不再验证 botName
- 调整提交数据处理，移除 botName 字段

**Non-Goals:**
- 不改变项目名和头像选择区域
- 不改变 AppID 和 Secret 输入框的功能
- 不影响 API 接口（后端仍可能接收 botName，但前端不再发送）

## Decisions

**Decision 1: 创建新的 label 样式类 `.form-label-light`**
- **Rationale**: 保持 `.form-label` 不变用于主要标签（设置项目名、配置飞书渠道），新建轻量级样式用于次级标签
- **Alternative**: 直接在现有 label 上加 style - 不够可维护
- **样式定义**: font-size: 14px, font-weight: 400 (normal), color: @textColorBody (比 @textColorTitle 更淡)

**Decision 2: 完全移除 botName 相关代码**
- **Rationale**: 保持代码简洁，避免遗留无用代码
- **Alternative**: 保留 botName 但设为隐藏 - 会增加代码复杂度

**Decision 3: 调整验证逻辑**
- **Rationale**: 移除 botName 后，仅需验证 name 和 avatarUrl
- **注意**: 由于 botName 不再是必填项，提交 payload 中也不再包含该字段

**Decision 4: 在创建按钮下方添加提示文字**
- **Rationale**: 告知用户可以不填写飞书配置直接创建项目，降低使用门槛
- **Alternative**: 将提示放在表单顶部 - 不够聚焦，放在按钮附近更符合用户操作流程
- **文本内容**: "跳过机器人配置，先直接创建OpenClaw"
- **样式**: 使用小字号、灰色文字，不抢眼但可读

## Risks / Trade-offs

- [风险] 移除 botName 可能影响已有用户习惯
  - 缓解: 这是简化表单的改进，用户使用体验会更顺畅
- [风险] 提交 payload 结构变化可能影响后端
  - 缓解: botName 变为可选，后端应能处理缺失情况
- [风险] 样式变化需要确保一致性
  - 缓解: 使用 Less 变量保持与现有设计系统一致
