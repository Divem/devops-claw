## Requirements

### Requirement: Remove botName input field
The botName input field SHALL be removed from the "配置飞书渠道" section of the project creation modal.

#### Scenario: User views the simplified form
- **WHEN** the project creation modal is displayed
- **THEN** only App ID and App Secret input fields are visible under "配置飞书渠道" section

### Requirement: App ID and Secret labels without bold styling
The App ID and App Secret labels SHALL use a non-bold font weight (font-weight: 400) to visually distinguish them from primary form labels.

#### Scenario: Labels have different visual weights
- **WHEN** the project creation modal is displayed
- **THEN** "设置项目名" and "配置飞书渠道" labels use bold (font-weight: 600)
- **AND** "应用 ID (App ID)" and "应用密钥 (App Secret)" labels use normal weight (font-weight: 400)

### Requirement: Update form validation
The form validation SHALL no longer require botName field to be filled.

#### Scenario: User creates project without botName
- **WHEN** user enters project name and selects avatar
- **AND** user leaves App ID and App Secret empty
- **THEN** the submit button is enabled
- **AND** user can successfully submit the form

### Requirement: Update submit payload
The submit event payload SHALL not include botName field.

#### Scenario: Form submission without botName
- **WHEN** user submits the form
- **THEN** the emitted payload contains: name, avatarUrl, appId (optional), appSecret (optional)
- **AND** the payload does NOT contain botName

### Requirement: Add hint text below submit button
A hint text SHALL be displayed below the submit button with the message "跳过机器人配置，先直接创建OpenClaw".

#### Scenario: User views the form footer
- **WHEN** the project creation modal is displayed
- **THEN** the submit button is visible
- **AND** below the button there is a hint text reading "跳过机器人配置，先直接创建OpenClaw"
- **AND** the hint text uses a smaller font size and gray color
