## Why

审批管理页面的"待审批/已审批"当前使用 n-tabs 组件实现，占据了 header 区域较多空间。这两个选项本质是数据筛选，不是独立的页面内容区，更适合用下拉选择器（Select）作为筛选项。

## What Changes

- 将审批管理 header 中的 n-tabs 组件替换为 n-select 下拉筛选器
- 移除 NTabs/NTabPane 的引用，改用 NSelect

## Capabilities

### New Capabilities

### Modified Capabilities
- `admin-dashboard`: 审批管理页面的 tab 切换改为 select 筛选

## Impact

- 受影响文件：`src/views/admin/ApprovalBoard.vue`
- 纯 UI 组件替换，筛选逻辑不变（仍调用 `adminStore.fetchApprovals(status)`）
