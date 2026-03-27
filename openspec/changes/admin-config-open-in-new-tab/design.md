## Context

当前实现中，管理员点击实例列表的「配置」按钮后，通过 `router.push('/admin/projects/{projectId}')` 在 admin 布局内嵌打开 OpenClaw 配置页面。这通过以下组件实现：

- `InstanceList.vue` - 实例列表页面，包含配置按钮
- `AdminProjectView.vue` - 包装组件，在 admin 布局内渲染 `OpenClawAdmin`
- `OpenClawAdmin.vue` - 实际的配置页面组件

当前路由结构：
- `/admin` → AdminLayout
  - `/admin/instances` → InstanceList
  - `/admin/projects/:id` → AdminProjectView (内嵌 OpenClawAdmin)

## Goals / Non-Goals

**Goals:**
- 点击「配置」按钮在新标签页打开配置页面
- 新标签页使用根级路由 `/projects/:id/admin` 而非嵌套路由
- 配置页面作为独立页面正常显示，包含完整功能
- 保留返回按钮功能（返回实例列表）

**Non-Goals:**
- 不修改 OpenClawAdmin 组件的核心功能
- 不修改配置页面的 UI/UX
- 不添加新的权限控制
- 不改变现有的 API 调用

## Decisions

### Decision 1: 使用 `window.open()` 打开新标签页
**选择：** 在 `handleConfig` 函数中使用 `window.open('/projects/' + projectId + '/admin', '_blank')`

**理由：**
- 标准浏览器 API，兼容性好
- 简单直接，不需要额外的库
- 符合用户对新标签页的期望

**替代方案考虑：**
- 方案A：使用 `<a>` 标签的 `target="_blank"` - 需要改变按钮实现，不够灵活
- 方案B：使用 Vue Router 的导航守卫 - 过于复杂，不必要

### Decision 2: 路由结构调整
**选择：** 
1. 将项目配置页面从 `/admin/projects/:id` 移至根级 `/projects/:id/admin`
2. 创建新的布局组件或直接渲染 OpenClawAdmin

**理由：**
- 根级路由更适合独立页面
- 避免嵌套在 admin 布局中，减少不必要的布局层级
- 与现有的 Gateway 代理路由 `/api/projects/:id/gateway/*` 保持一致的 URL 模式

### Decision 3: 返回按钮行为
**选择：** 在新标签页中点击返回按钮，关闭当前标签页并聚焦回原实例列表标签页

**实现方式：**
```javascript
function goBack() {
  if (window.opener) {
    window.close()
    window.opener.focus()
  } else {
    router.push('/admin/instances')
  }
}
```

**理由：**
- 提供符合用户直觉的返回体验
- 如果直接访问 URL（无 opener），则回退到路由导航

## Risks / Trade-offs

| 风险 | 可能性 | 影响 | 缓解措施 |
|------|--------|------|----------|
| 浏览器阻止弹窗 | 低 | 高 | `window.open` 在点击事件处理程序中调用，不会被阻止 |
| 新标签页权限问题 | 低 | 中 | 使用相对路径，同源策略不会阻止 |
| 返回按钮在原标签页无响应 | 低 | 低 | 添加回退逻辑，使用路由导航 |
| 同时打开多个配置页 | 中 | 低 | 这是预期行为，允许用户并行工作 |

## Migration Plan

实施步骤：
1. 更新 `InstanceList.vue` 中的 `handleConfig` 函数
2. 添加根级路由 `/projects/:id/admin`
3. 创建新的项目配置视图组件（复用 OpenClawAdmin）
4. 可选：移除 `/admin/projects/:id` 路由

无需数据迁移，纯前端行为变更。

## Open Questions

无。
