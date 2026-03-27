## ADDED Requirements

### Requirement: 实例管理页面提供配置入口
实例管理表格(InstanceTable)SHALL在操作列显示「配置」按钮，允许管理员点击进入对应实例的 OpenClaw 配置页面。

#### Scenario: 管理员查看实例列表
- **WHEN** 管理员访问实例管理页面
- **THEN** 实例表格的操作列显示「配置」按钮
- **THEN** 「配置」按钮位于启动/停止/重启按钮的右侧

#### Scenario: 管理员点击配置按钮
- **WHEN** 管理员点击实例行的「配置」按钮
- **THEN** 页面导航到 `/projects/{projectId}/admin` 路由
- **THEN** 显示对应实例的 OpenClaw 管理页面

#### Scenario: 实例缺少 projectId 时隐藏配置按钮
- **GIVEN** 某个实例的 projectId 为空或无效
- **WHEN** 管理员查看该实例行的操作列
- **THEN** 不显示「配置」按钮
