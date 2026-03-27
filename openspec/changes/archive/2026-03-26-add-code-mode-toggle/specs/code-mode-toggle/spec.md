## ADDED Requirements

### Requirement: 视图模式切换

管理页面 SHALL 支持「控制台」和「代码模式」两种视图模式，用户可以在两种模式之间自由切换。

#### Scenario: 默认进入控制台模式

- **WHEN** 用户进入管理页面
- **THEN** 页面 SHALL 默认显示控制台模式（侧边导航 + 内容区布局）

#### Scenario: 切换到代码模式

- **WHEN** 用户在控制台模式下点击「代码模式」切换按钮
- **THEN** 页面 SHALL 切换到代码模式，侧边导航折叠为窄条，右侧内容区全宽展示代码编辑器 iframe

#### Scenario: 切换回控制台模式

- **WHEN** 用户在代码模式下点击「控制台」切换按钮
- **THEN** 页面 SHALL 切换回控制台模式，恢复完整侧边导航和当前选中的菜单项内容

### Requirement: 代码模式侧边导航折叠

代码模式下侧边导航 SHALL 折叠为窄条（60px），仅显示图标和操作按钮。

#### Scenario: 代码模式折叠导航展示

- **WHEN** 页面处于代码模式
- **THEN** 侧边导航 SHALL 折叠为 60px 宽度，仅显示返回按钮、模式切换按钮和纵向菜单图标

#### Scenario: 代码模式下菜单不可点击

- **WHEN** 页面处于代码模式且用户点击折叠导航中的菜单图标
- **THEN** 系统 SHALL 不响应菜单点击操作（代码模式下菜单仅做展示）

### Requirement: 代码模式内容区

代码模式下右侧内容区 SHALL 自动扩展填充侧边导航折叠后的全部剩余空间。

#### Scenario: 内容区自动扩展

- **WHEN** 页面切换到代码模式
- **THEN** 右侧内容区 SHALL 自动扩展至侧边导航折叠后的全宽，iframe src SHALL 指向 Gateway 代码编辑路由 `/code`

### Requirement: 切换动画

模式切换时侧边导航宽度变化 SHALL 使用平滑过渡动画。

#### Scenario: 平滑切换过渡

- **WHEN** 用户在控制台模式和代码模式之间切换
- **THEN** 侧边导航宽度变化 SHALL 使用 CSS transition 动画（0.3s），内容区 SHALL 跟随调整宽度
