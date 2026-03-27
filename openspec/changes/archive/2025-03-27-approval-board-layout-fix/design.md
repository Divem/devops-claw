## Context

审批管理页面 header 使用 `display: flex; justify-content: space-between` 排列标题和 tabs。当前 n-tabs 使用 `type="segment"` 样式，segment 控件自身较宽，在全宽布局下与标题争抢空间导致标题被挤压换行。InstanceDrawer 当前固定 480px 宽度。

## Goals / Non-Goals

**Goals:**
- 让"审批管理"标题完整显示，不换行
- 缩小 tabs 组件的占地面积，使 header 更紧凑
- 加宽 InstanceDrawer 到 640px，给详情内容更多展示空间

**Non-Goals:**
- 不改变 tabs 的功能逻辑
- 不重构 ApprovalCard 组件

## Decisions

**tabs 样式调整**：将 n-tabs 的 `type` 从 `"segment"` 改为 `"line"`，line 类型的 tabs 更紧凑，不会占据大量水平空间。同时给标题添加 `white-space: nowrap` 确保不换行。

**抽屉宽度**：将 InstanceDrawer 的 width 从 480px 调整为 640px，增加约 33% 的展示空间。

## Risks / Trade-offs

- [风险] line tabs 视觉风格与 segment 不同 → line 风格更轻量，适合管理后台
- [风险] 640px 抽屉在小屏上可能过宽 → 管理后台面向桌面端，最低 1280px 宽度，640px 可接受
