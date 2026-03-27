## ADDED Requirements

### Requirement: 配置页面在新标签页打开
管理员点击实例列表中的「配置」按钮后，OpenClaw 配置页面 SHALL 在浏览器新标签页中打开，而不是在当前 admin 页面内嵌显示。

#### Scenario: 管理员点击配置按钮
- **WHEN** 管理员点击实例行的「配置」按钮
- **THEN** 浏览器打开新标签页
- **THEN** 新标签页加载 `/projects/{projectId}/admin` 路由
- **THEN** 原实例列表页面保持打开状态

#### Scenario: 新标签页显示配置页面
- **GIVEN** 管理员已在新标签页打开配置页面
- **THEN** 页面显示 OpenClaw 配置界面（控制台、代码模式、终端等）
- **THEN** 页面顶部显示返回按钮
- **THEN** 所有配置功能正常工作

#### Scenario: 点击返回按钮关闭标签页
- **GIVEN** 管理员在新标签页中查看配置页面
- **WHEN** 管理员点击顶部的「返回」按钮
- **THEN** 如果原标签页存在，关闭当前标签页并聚焦回原标签页
- **THEN** 如果直接访问（无原标签页），导航到 `/admin/instances`

### Requirement: 支持独立访问配置页面
配置页面 SHALL 支持直接通过 URL 访问，无需从实例列表跳转。

#### Scenario: 直接访问配置页面 URL
- **GIVEN** 用户知道项目 ID
- **WHEN** 用户在浏览器地址栏输入 `/projects/{projectId}/admin`
- **THEN** 页面正常加载并显示配置界面
- **THEN** 返回按钮可用，点击后导航到实例列表
