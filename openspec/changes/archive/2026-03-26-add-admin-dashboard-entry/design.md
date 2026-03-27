## Context

当前 App.vue 中，用户登录信息区域仅展示用户名，没有交互功能。根据 PRD 要求，管理员需要能够从员工端快速进入管理后台。

现有架构：
- 员工端使用 `AppHeader.vue` 作为顶部导航
- 页面状态由 `pageState` 控制（'home' | 'admin' | 'loading' | 'empty' | 'has_project'）
- 已存在 `OpenClawAdmin.vue` 组件（Gateway Dashboard 嵌入），但这是给员工的 Gateway 配置界面，不是管理后台

需要区分：
- **员工 Gateway 配置页**: 已有的 `OpenClawAdmin.vue`（iframe 嵌入 Gateway）
- **管理后台**: 新建的管理员专用后台（实例管理、审批等）

## Goals / Non-Goals

**Goals:**
- 在 AppHeader 用户信息区域添加下拉菜单
- 下拉菜单显示「管理后台」入口（管理员角色可见）
- 创建管理后台仪表盘页面（路由 `/admin`）
- 仪表盘展示：实例统计、资源概览、待办事项
- 管理后台使用独立布局（侧边栏导航）

**Non-Goals:**
- 完整的实例管理 CRUD（本期仅做仪表盘展示）
- 真实的后端数据接入（使用 mock 数据）
- 用户认证/登录流程改造
- 细粒度权限控制（仅区分管理员/普通员工）

## Decisions

### 1. 路由设计
**决策**: 管理后台使用独立路由 `/admin`，由 App.vue 条件渲染

**理由**:
- 与现有 `OpenClawAdmin`（Gateway 配置）区分
- 管理后台是全屏独立布局，与员工端布局不同
- 避免路由库依赖，使用状态控制

**替代方案**: 使用 vue-router — 否决，当前项目使用简单状态管理，引入路由库增加复杂度

### 2. 用户角色识别
**决策**: 在现有 Project/User 类型中增加 `role` 字段，值为 'admin' | 'user'

**理由**:
- 最小化改动，复用现有用户数据流
- 管理后台入口根据 role 条件渲染

### 3. 管理后台布局
**决策**: 创建 `AdminLayout.vue` 组件，包含顶部导航 + 左侧边栏

**理由**:
- 管理后台需要多页面导航（仪表盘、实例管理、审批等）
- 侧边栏导航符合管理后台惯例
- 仪表盘作为默认页面

### 4. 仪表盘数据来源
**决策**: 使用 mock 数据，API 结构预留但返回静态数据

**理由**:
- 后端服务尚未实现（gap analysis 显示后端仅 15% 完成）
- 前端先行，接口格式与后端约定

## Risks / Trade-offs

| Risk | Mitigation |
|------|-----------|
| 与现有 `OpenClawAdmin` 命名混淆 | 新组件统一使用 `AdminDashboard` / `AdminLayout` 前缀，明确区分于 Gateway 配置页 |
| 用户角色信息缺失 | Mock 数据默认 role=admin，后续接入真实认证后再动态获取 |
| 管理后台与员工端样式不一致 | 复用现有 design token，保持品牌一致性 |
