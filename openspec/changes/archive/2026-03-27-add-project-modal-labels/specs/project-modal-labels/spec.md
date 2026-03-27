## ADDED Requirements

### Requirement: App ID input has a label
The appid input field SHALL have a label displaying "应用 ID (App ID)" positioned above the input field.

#### Scenario: User views the project creation form
- **WHEN** the project creation modal is displayed
- **THEN** the appid input field displays the label "应用 ID (App ID)" above it

### Requirement: App Secret input has a label
The secret input field SHALL have a label displaying "应用密钥 (App Secret)" positioned above the input field.

#### Scenario: User views the project creation form
- **WHEN** the project creation modal is displayed
- **THEN** the secret input field displays the label "应用密钥 (App Secret)" above it

### Requirement: Label styling consistency
All form labels SHALL use the same CSS class and styling as existing form labels in the component.

#### Scenario: Labels have consistent appearance
- **WHEN** the project creation modal is displayed
- **THEN** the appid and secret labels have the same font size, weight, and color as the "设置项目名" and "配置飞书渠道" labels
