## Requirements

### Requirement: OpenClaw 卡片支持点击跳转
OpenClaw 卡片 SHALL 支持点击交互，点击后跳转到下一步骤。

#### Scenario: 用户点击 OpenClaw 卡片
- **WHEN** 用户在项目初始化流程中
- **AND** 用户点击 OpenClaw 卡片
- **THEN** 系统跳转到下一步骤（连接飞书）

#### Scenario: 用户悬停 OpenClaw 卡片
- **WHEN** 用户鼠标悬停在 OpenClaw 卡片上
- **THEN** 卡片显示可点击的视觉反馈（如光标变为手型、卡片高亮）

### Requirement: 在连接飞书步骤显示跳过提示
系统 SHALL 在连接飞书步骤显示提示，告知用户之前跳过了机器人配置。

#### Scenario: 用户到达连接飞书步骤
- **WHEN** 用户通过点击 OpenClaw 卡片跳转到连接飞书步骤
- **THEN** 页面显示提示信息："您已跳过机器人配置，可在项目设置中后续配置"