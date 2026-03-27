## Why

当前审批管理页面存在三个用户体验问题：

1. **配置引导重复显示**：每条待审批记录都包含一个 `ApprovalGuide` 组件，导致同一页面中多次出现相同的引导信息，干扰用户视线。
2. **配置链接不准确**："去配置"按钮统一指向 `https://open.feishu.cn`，无法直接跳转到具体应用的配置页面，用户需要手动查找应用。
3. **卡片占地面积过大**：垂直排列的卡片布局导致单屏显示内容量有限，需要频繁滚动查看所有审批记录。

这些问题降低了管理员处理审批任务的效率，需要优化布局和交互流程。

## What Changes

- **移除卡片内的配置引导**：从 `ApprovalCard` 组件中移除每条记录独立的 `ApprovalGuide`，改为在页面顶部显示统一的配置引导区域
- **优化配置跳转链接**：将"去配置"按钮的链接改为动态生成，格式为 `https://open.feishu.cn/app/{appId}/baseinfo`，可直接跳转至对应应用的设置页面
- **压缩卡片布局，提供列表视图**：
  - 减小卡片的 margin、padding 和字体大小
  - 优化字段排版，使用更紧凑的布局
  - 新增紧凑列表视图作为卡片视图的替代方案，提高单屏信息密度

## Capabilities

### New Capabilities

- `approval-config-guide`: 统一的审批配置引导区域，整合到页面顶部而非分散在每个卡片中
- `approval-compact-layout`: 紧凑的卡片和列表视图布局，提高单屏显示内容量

### Modified Capabilities

- `approval-card`: 移除内部配置引导，优化字段排版和间距，动态生成配置链接

## Impact

- **前端组件**:
  - `src/views/admin/ApprovalBoard.vue`：新增页面级配置引导区域，添加视图切换功能
  - `src/components/admin/ApprovalCard.vue`：移除 ApprovalGuide，优化布局，使用动态配置链接
  - 新增 `src/components/admin/ApprovalListItem.vue`：紧凑列表视图组件（可选）
- **类型定义**：可能需要扩展 Approval 类型以支持应用ID参数传递
- **用户体验**：审批页面操作更简洁，信息密度更高，配置跳转更直接
