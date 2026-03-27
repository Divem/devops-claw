## ADDED Requirements

### Requirement: 视图模式切换

管理页面 SHALL 支持通过顶部 Tab 栏在「控制台」和「代码模式」之间切换。侧边导航不再参与模式切换。

#### Scenario: 通过顶部 Tab 切换模式

- **WHEN** 用户点击顶部 Tab 栏的「控制台」或「代码模式」Tab
- **THEN** 页面 SHALL 切换到对应模式

#### Scenario: 代码模式下侧边导航不折叠

- **WHEN** 页面处于代码模式
- **THEN** 侧边导航 SHALL 完全隐藏（而非折叠为窄条），不保留折叠导航中的菜单图标

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
