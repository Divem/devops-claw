## Why

当前管理员点击实例列表的「配置」按钮后，OpenClaw 配置页面在 admin 子路由中内嵌打开。这导致管理员无法同时查看实例列表和配置页面，且浏览器前进/后退按钮的行为不符合预期。在新标签页打开配置页面可以提供更好的多任务处理体验，允许管理员同时管理多个实例的配置。

## What Changes

- 修改「配置」按钮的点击行为，从路由跳转改为在新标签页打开配置页面
- 更新路由配置，使配置页面可以作为独立页面访问
- 确保新标签页中的配置页面具备完整的导航和功能
- **移除** admin 子路由中的项目配置页面路由（改为根级路由）

## Capabilities

### New Capabilities
- `admin-config-external-open`: 允许从实例管理页面在新标签页中打开 OpenClaw 配置页面，提供独立的浏览体验

### Modified Capabilities
<!-- 本变更是对现有行为的调整，不涉及 spec 级别的行为变更 -->

## Impact

- **代码影响**：
  - `src/views/admin/InstanceList.vue` - 修改 `handleConfig` 函数，使用 `window.open`
  - `src/router/index.ts` - 调整路由配置，支持独立访问
  - `src/views/admin/AdminProjectView.vue` - 可能需要调整返回按钮行为
- **API 影响**：无
- **用户体验**：配置页面在新标签页打开，可以同时管理多个实例
