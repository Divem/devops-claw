## Context

管理端 `InstanceCreateModal.vue` 在上一次变更中被过度简化，移除了飞书配置和头像选择。用户端 `CreateModal.vue` 作为设计基准，包含：实例名称、App ID / App Secret（选填）、头像选择网格（12 个彩色头像）、全宽创建按钮、跳过链接。管理端需对齐这一流程，唯一差异是不含用户选择字段。

## Goals / Non-Goals

**Goals:**
- 管理端创建弹框表单与用户端 `CreateModal.vue` 视觉和流程完全对齐
- `CreateInstanceRequest` 类型恢复 `avatarUrl / appId / appSecret` 字段
- MSW Mock 支持新字段，`feishuStatus` 根据是否填写 appId 动态决定

**Non-Goals:**
- 不共享用户端 `CreateModal.vue` 组件（两端语义不同）
- 不添加用户选择字段
- 不实现真实飞书 OAuth 验证

## Decisions

### 1. 头像数据来源
复用 `src/mocks/data.ts` 中已有的 `avatarList`（12 个头像 URL），与用户端保持一致。弹框打开时默认选中第一个头像。

### 2. 跳过链接行为
点击「跳过机器人配置，先直接创建」时，清空 App ID / App Secret，直接以仅 name + avatarUrl 提交，与用户端 `handleSkipAndCreate` 逻辑一致。

### 3. 按钮布局
底部改为单列全宽「创建」按钮 + 跳过链接（`<p>` 文本样式），取消双按钮并排布局。

## Risks / Trade-offs

- [代码重复] 管理端和用户端弹框结构相似但独立维护 → Demo 阶段可接受，后续可提取共享基础组件
