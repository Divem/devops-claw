## ADDED Requirements

### Requirement: Bot info modal displays robot details
The system SHALL display a modal with robot information when the user clicks the "机器人信息" button on the ProjectCard.

#### Scenario: Modal shows correct bot information
- **WHEN** user clicks the "机器人信息" button
- **THEN** the system opens a modal displaying: 机器人名称 (botName)、App ID (appId)、状态 (status)、创建时间 (createdAt)

#### Scenario: App ID not configured
- **WHEN** user opens bot info modal and the project has no appId
- **THEN** the App ID field displays "未配置"

### Requirement: Bot info modal provides link to Feishu chat
The system SHALL include a link to the Feishu chat within the bot info modal.

#### Scenario: Feishu chat link is available
- **WHEN** user views the bot info modal and the project has a feishuChatUrl
- **THEN** a "前往飞书对话" button is displayed and clickable, opening the Feishu chat URL in a new tab

#### Scenario: Feishu chat link is unavailable
- **WHEN** user views the bot info modal and the project has no feishuChatUrl
- **THEN** the "前往飞书对话" button is not displayed

### Requirement: ProjectCard button renamed to show bot info
The system SHALL rename the "去对话" button on ProjectCard to "机器人信息" and change its behavior from navigation to modal display.

#### Scenario: Button text and icon updated
- **WHEN** user views the ProjectCard
- **THEN** the button displays "机器人信息" with 🤖 icon instead of "去对话" with 💬 icon

#### Scenario: Button click opens modal instead of navigation
- **WHEN** user clicks the "机器人信息" button
- **THEN** the system emits a `showBotInfo` event instead of navigating to an external URL
