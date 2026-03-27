## Why

管理后台各页面（仪表盘、实例管理、审批管理）的内容区域设置了 max-width 限制（800px-1200px），在宽屏下两侧留白过多，内容显示区域太窄，信息密度低，不利于管理操作。需要移除宽度限制，让内容区域全屏填满可用空间。

## What Changes

- 移除 AdminDashboard 页面的 `max-width: 1200px` 限制，内容撑满整个内容区域
- 移除 InstanceList 页面的 `max-width: 1200px` 限制
- 移除 ApprovalBoard 页面的 `max-width: 800px` 限制
- 统一管理后台各页面的内容布局为全宽模式

## Capabilities

### New Capabilities

### Modified Capabilities
- `admin-page-layout`: 移除各管理页面的 max-width 限制，改为全宽布局

## Impact

- 受影响文件：`src/views/admin/AdminDashboard.vue`、`src/views/admin/InstanceList.vue`、`src/views/admin/ApprovalBoard.vue`
- 纯 CSS 变更，不影响功能逻辑和 API
