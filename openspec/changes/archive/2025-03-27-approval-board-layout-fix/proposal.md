## Why

审批管理页面存在两个布局问题：1) 页头的 segment tabs（待审批/已审批）占地面积过大，导致"审批管理"标题被挤压换行显示不全；2) 实例管理页面的详情抽屉宽度仅 480px，内容展示过于拥挤。

## What Changes

- 优化审批管理页面的 header 布局：将 segment tabs 改为更紧凑的样式，或调整 header 布局让标题不被挤压
- 加宽 InstanceDrawer 抽屉组件的宽度，从 480px 增大到合理尺寸

## Capabilities

### New Capabilities

### Modified Capabilities
- `admin-dashboard`: 加宽 InstanceDrawer 抽屉宽度

## Impact

- 受影响文件：`src/views/admin/ApprovalBoard.vue`（header 布局和 tabs 样式）、`src/components/admin/InstanceDrawer.vue`（抽屉宽度）
- 纯 CSS/模板调整，不影响功能逻辑
