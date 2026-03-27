## Context

管理端当前已有侧边栏导航（admin-layout）和若干后台页面（审批、配置等），但缺少实例管理页面。用户端已有创建项目的弹框（带机器人配置选填、图标选择等），管理端创建实例时应复用相近的视觉风格，但流程更简单（去掉用户选择、机器人配置等步骤）。

## Goals / Non-Goals

**Goals:**
- 新增管理端 `/admin/instances` 路由，挂载实例管理页面
- 实例列表使用 Table 展示（状态 badge、用户归属、创建时间、操作列）
- 「创建实例」弹框复用用户端弹框的表单布局和样式，只保留实例名称、描述字段
- 所有数据使用 MSW Mock

**Non-Goals:**
- 不实现真实的 VM 创建/停止 API 调用
- 不实现用户选择下拉（管理员默认以当前身份创建）
- 不实现实例详情页

## Decisions

### 1. 复用用户端弹框样式
参考 `src/` 中现有的用户端创建弹框组件结构（Modal + Form），在管理端用相同的布局方式创建新组件 `AdminCreateInstanceModal`。不直接共享组件，以避免两端逻辑耦合。

### 2. Mock 数据结构
实例列表 Mock 数据包含字段：`id, name, description, status(running|stopped|initializing), owner, createdAt`，通过 MSW handler 返回。

### 3. 路由集成
在管理端路由树中新增 `/admin/instances`，使用管理端布局（AdminLayout）包裹页面。

## Risks / Trade-offs

- [组件重复] 弹框不共享组件，会存在一定代码重复 → 当前阶段 Demo 可接受，后续可提取共享 Modal 基础组件
