## Why

当前管理员在实例管理页面(InstanceList)只能查看实例的基本信息（名称、状态、创建时间等），但无法直接从列表页面进入实例的 OpenClaw 配置页面。管理员需要额外的步骤才能访问配置功能，降低了管理效率。添加配置入口可以让管理员快速跳转到指定实例的配置界面，提升操作便捷性。

## What Changes

- 在实例管理表格(InstanceTable)中添加「配置」操作列按钮
- 点击「配置」按钮后导航到 `/projects/:id/admin` 页面（OpenClaw 配置页面）
- 支持通过配置按钮快速定位到特定项目的管理界面
- 保持现有表格的其他功能不变（启动/停止/重启等操作）

## Capabilities

### New Capabilities
- `admin-instance-config-entry`: 在实例管理页面提供 OpenClaw 配置入口，允许管理员从实例列表直接跳转到指定实例的配置管理界面

### Modified Capabilities
<!-- 本变更仅添加操作入口，不涉及现有 spec 的行为变更 -->

## Impact

- **代码影响**：
  - `src/components/admin/InstanceTable.vue` - 添加配置按钮
  - `src/views/admin/InstanceList.vue` - 处理配置按钮点击事件，路由跳转
- **API 影响**：无，仅前端路由跳转
- **依赖影响**：无新增依赖
- **用户体验**：管理员可从实例列表一键进入配置页面
