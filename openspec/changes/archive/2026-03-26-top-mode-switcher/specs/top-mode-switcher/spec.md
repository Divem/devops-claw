## ADDED Requirements

### Requirement: 顶部模式切换 Tab 栏

管理页面顶部 SHALL 显示一个 Tab 栏，包含「控制台」和「代码模式」两个 Tab，用于切换页面视图模式。

#### Scenario: Tab 栏展示

- **WHEN** 管理页面加载完成
- **THEN** 顶部 SHALL 显示 Tab 栏，左侧为项目信息（返回按钮、头像、名称、状态标签），右侧为「控制台」「代码模式」Tab 和「去对话」按钮

#### Scenario: 默认选中控制台 Tab

- **WHEN** 用户首次进入管理页面
- **THEN** 「控制台」Tab SHALL 默认为选中状态

#### Scenario: 切换到代码模式

- **WHEN** 用户点击「代码模式」Tab
- **THEN** 页面 SHALL 切换到代码模式，隐藏侧边导航，内容区全宽展示代码编辑器 iframe

#### Scenario: 切换回控制台

- **WHEN** 用户在代码模式下点击「控制台」Tab
- **THEN** 页面 SHALL 切换回控制台模式，恢复侧边导航和当前选中的菜单项内容
