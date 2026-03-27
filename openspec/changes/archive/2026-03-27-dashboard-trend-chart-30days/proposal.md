## Why

当前 Admin Dashboard 的创建趋势图表仅显示近 7 天数据，时间范围固定且不可交互。随着业务数据增长，用户需要更灵活的数据查看能力来追踪长期趋势和进行数据分析。

## What Changes

- 将 Dashboard 创建趋势组件从静态 7 天图表升级为可交互趋势图
- 默认数据范围从 7 天扩展到 30 天
- 新增横向滚动功能，支持平滑浏览历史数据
- 新增周期筛选器，支持快速切换 7天/30天/90天/自定义时间范围
- 保持现有 API 兼容性，平滑迁移用户体验

## Capabilities

### New Capabilities
- `trend-chart-interactive`: 可交互式趋势图组件，支持手势滚动、数据缩放和周期切换
- `time-range-selector`: 时间范围选择器组件，提供预设周期和自定义日期范围选择
- `dashboard-data-pagination`: Dashboard 数据分页加载机制，支持按需获取历史数据

### Modified Capabilities
- (无 - 现有 API 和 Dashboard 基础架构保持不变)

## Impact

- **Frontend**: Admin Dashboard 页面，`/src/pages/admin/dashboard/` 目录下的趋势图表组件
- **Components**: 新增交互式图表组件，复用现有的数据获取逻辑
- **Dependencies**: 可能需要引入图表库（如 ECharts 或 Chart.js）用于高级交互功能
- **Performance**: 数据量从 7 条增至 30 条，需确保渲染性能；考虑虚拟滚动优化
- **User Experience**: 界面布局调整，新增筛选控件位置设计
