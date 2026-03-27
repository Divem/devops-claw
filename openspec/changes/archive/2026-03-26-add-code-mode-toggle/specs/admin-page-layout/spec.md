## MODIFIED Requirements

### Requirement: 左侧侧边导航

管理页面 SHALL 包含一个左侧固定宽度的侧边导航栏，宽度为 220px，背景色使用设计 token。控制台模式下侧边导航 SHALL 在顶部项目信息区提供「代码模式」切换入口。

#### Scenario: 侧边导航固定展示

- **WHEN** 管理页面加载完成
- **THEN** 左侧 SHALL 显示固定宽度的侧边导航栏，不随右侧内容滚动

#### Scenario: 控制台模式切换入口

- **WHEN** 页面处于控制台模式
- **THEN** 侧边导航顶部项目信息区 SHALL 显示「代码模式」切换按钮

#### Scenario: 代码模式折叠展示

- **WHEN** 页面处于代码模式
- **THEN** 侧边导航 SHALL 折叠为 60px 宽度的窄条，顶部显示「控制台」切换按钮
