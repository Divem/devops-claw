## Context

ApprovalBoard.vue header 当前使用 `n-tabs type="line"` 显示待审批/已审批切换。用户希望改为 select 下拉筛选。当前 header 是 flex 布局，左侧标题右侧 tabs。

## Goals / Non-Goals

**Goals:**
- 将 n-tabs 替换为 n-select 下拉选择器
- 保持筛选功能不变

**Non-Goals:**
- 不修改 adminStore 的 approvalTab 状态管理逻辑

## Decisions

**使用 NSelect 组件**：Naive UI 的 NSelect，设置固定宽度（约 120px），选项为"待审批"和"已审批"，放在标题右侧。v-model 绑定 adminStore.approvalTab，on-update:value 触发 fetchApprovals。

## Risks / Trade-offs

- 无显著风险，纯 UI 组件替换
