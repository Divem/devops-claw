## Why

OpenClaw 配置页面的控制台需要一个清晰的视觉占位符来标识当前页面状态和功能入口。使用 admin 图片占位符可以提供更好的用户体验，让用户直观理解当前正在查看的是管理员控制台界面。

## What Changes

- **新增控制台占位图片组件**: 在 `projects/proj-001/admin` 路由下，在控制台页面上方添加 `docs/images/99openclaw-admin.png` 图片作为视觉占位符
- **图片展示方式**: 图片将以适当的样式显示在页面上方，作为控制台的视觉标识

## Capabilities

### New Capabilities
- `admin-console-placeholder`: 在控制台页面上方显示 admin 占位图片，提供视觉标识和用户体验增强

### Modified Capabilities

## Impact

- **前端代码**: 需要修改控制台页面的 Vue 组件
- **路由**: `projects/proj-001/admin`
- **资源文件**: 使用 `docs/images/99openclaw-admin.png` 图片
- **样式**: 需要添加适当的 CSS 样式来定位图片
