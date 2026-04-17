## ADDED Requirements

### Requirement: 配置完成后显示发布引导提示
BotInfoDropdown 组件在查看模式下，当机器人凭证已配置但尚未连接时，SHALL 在凭证信息下方显示引导提示，告知用户需联系管理员发布应用。

#### Scenario: 凭证已配置但未连接时显示引导
- **WHEN** 用户查看 BotInfoDropdown，项目有 AppID 且 botStatus 不为 'connected'
- **THEN** 在凭证信息区域下方显示 NAlert（type="info"）引导提示，包含文案"机器人凭证已配置，请联系管理员配置长连接并发布应用后生效"

#### Scenario: 机器人已连接时不显示引导
- **WHEN** 用户查看 BotInfoDropdown，项目 botStatus 为 'connected'
- **THEN** 不显示发布引导提示

#### Scenario: 未配置凭证时不显示引导
- **WHEN** 用户查看 BotInfoDropdown，项目没有 AppID
- **THEN** 不显示发布引导提示（显示的是空状态引导）

#### Scenario: 凭证保存成功后切回查看模式显示引导
- **WHEN** 用户在编辑模式保存凭证成功，组件切回查看模式
- **THEN** 引导提示 SHALL 可见
