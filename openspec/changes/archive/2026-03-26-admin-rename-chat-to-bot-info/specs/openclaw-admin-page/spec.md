## MODIFIED Requirements

### Requirement: 管理页面布局
OpenClaw 管理页面 SHALL 包含顶部信息栏和主内容区。顶部信息栏 SHALL 展示项目名称、连接状态标签和【机器人信息】快捷按钮。主内容区 SHALL 包含「控制台」和「代码模式」两个标签页。

#### Scenario: 进入管理页面展示默认视图
- **WHEN** 员工进入 `/projects/:id/admin` 管理页面
- **THEN** 顶部展示项目名称和连接状态（已连接/待配置/断开）
- **THEN** 默认激活「控制台」标签页
- **THEN** 主内容区通过 iframe 加载 Gateway Dashboard 的聊天界面

#### Scenario: 点击机器人信息按钮
- **WHEN** 员工点击顶部的【机器人信息】按钮
- **THEN** 打开机器人信息弹窗，展示机器人名称、App ID、状态和创建时间
- **THEN** 弹窗内提供「前往飞书对话」链接按钮
