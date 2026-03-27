## Context

管理后台使用 AdminLayout 组件提供侧边栏+头部+内容区的三栏布局。内容区本身通过 `flex: 1` 填满剩余空间，但各子页面内部额外设置了 `max-width` 限制（Dashboard/InstanceList 为 1200px，ApprovalBoard 为 800px），导致宽屏下内容区两侧大量留白。

## Goals / Non-Goals

**Goals:**
- 移除三个管理页面的 max-width 限制，让内容撑满整个可用宽度
- 保持内容区的 padding 不变，确保内容不贴边

**Non-Goals:**
- 不修改 AdminLayout 组件本身的结构（侧边栏宽度、头部高度等）
- 不调整响应式断点逻辑
- 不重构组件结构

## Decisions

**直接移除 max-width + margin: 0 auto**：最简单的方案，在各页面的 scoped style 中删除对应的 CSS 属性即可。AdminLayout 的 `.admin-content` 已有 `padding: 24px`，移除 max-width 后内容自然填满。

## Risks / Trade-offs

- [风险] Dashboard 中的统计卡片网格在超宽屏下可能过于分散 → 已有 grid 响应式布局，会自动适配
- [风险] ApprovalBoard 卡片在全宽下可能过宽 → 卡片内容本身有内边距，可接受
