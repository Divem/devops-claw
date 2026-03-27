## ADDED Requirements

### Requirement: 配置页面默认显示概览
OpenClaw 配置页面 SHALL 在加载时默认显示「概览」页面，而非「聊天」页面。

#### Scenario: 管理员打开配置页面
- **WHEN** 管理员从实例列表点击「配置」按钮
- **THEN** 新标签页打开配置页面
- **THEN** 默认选中左侧边栏的「概览」菜单项
- **THEN** iframe 加载 Gateway Dashboard 的概览页面（`/overview`）

#### Scenario: 直接访问配置页面 URL
- **WHEN** 用户直接访问 `/projects/{projectId}/admin`
- **THEN** 页面加载后默认显示概览页面
- **THEN** iframe 正确加载 Gateway Dashboard

### Requirement: 保留导航功能
所有现有的菜单导航功能 SHALL 保持正常工作。

#### Scenario: 切换菜单项
- **GIVEN** 用户已在配置页面
- **WHEN** 用户点击左侧边栏的其他菜单项（如聊天、通道等）
- **THEN** iframe 加载对应的 Gateway Dashboard 页面
- **THEN** 菜单项高亮状态正确更新
