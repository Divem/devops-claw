## MODIFIED Requirements

### Requirement: 侧边栏导航菜单
管理后台侧边栏 SHALL 包含以下导航项：仪表盘、实例管理、镜像管理、全局配置、审批管理。镜像管理菜单项 SHALL 使用 key `images`，标签「镜像管理」，图标 `📦`，路由 `/admin/images`。菜单项 SHALL 在「实例管理」之后、「全局配置」之前。

#### Scenario: 侧边栏显示镜像管理
- **WHEN** 用户进入管理后台
- **THEN** 侧边栏展示镜像管理导航项，位于实例管理和全局配置之间
