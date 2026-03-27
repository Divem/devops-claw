## ADDED Requirements

### Requirement: Bot config form displays App ID and Secret inputs
The system SHALL display a bot configuration form in the project panel with two input fields: App ID (plain text) and App Secret (password mode).

#### Scenario: Config form renders with empty fields
- **WHEN** user views a project with no bot config set
- **THEN** the form displays with App ID input and Secret input both empty
- **AND** the Secret input uses password mode (masked by default)

#### Scenario: Config form renders with existing config
- **WHEN** user views a project that already has bot config
- **THEN** the App ID input is pre-filled with the stored App ID
- **AND** the Secret input shows a placeholder "已配置，如需修改请重新输入" instead of the actual secret

### Requirement: Secret field supports show/hide toggle
The system SHALL allow users to toggle the visibility of the Secret input field value.

#### Scenario: User toggles secret visibility
- **WHEN** user clicks the visibility toggle icon on the Secret input
- **THEN** the secret value switches between masked (password dots) and plain text display
- **AND** the toggle state is independent of the save action

### Requirement: User can save bot config
The system SHALL allow users to save the bot configuration by clicking a save button.

#### Scenario: Successful save with valid inputs
- **WHEN** user fills in App ID and Secret (both non-empty) and clicks save
- **THEN** the system sends a PUT request to `/api/project/:id/bot-config` with `{ appId, appSecret }`
- **AND** shows a success message upon 200 response
- **AND** the Secret input resets to the placeholder indicating config is saved

#### Scenario: Save with empty fields
- **WHEN** user leaves either App ID or Secret empty and clicks save
- **THEN** the save button remains disabled
- **AND** no API request is sent

#### Scenario: Save fails with server error
- **WHEN** the PUT request returns a non-200 response
- **THEN** the system displays an error message with the server error content

### Requirement: Config form uses collapsible panel layout
The system SHALL display the bot config form in a collapsible panel within the project panel.

#### Scenario: Panel starts collapsed
- **WHEN** user navigates to the project panel
- **THEN** the bot config section is collapsed by default
- **AND** a label "机器人配置" with expand/collapse indicator is visible

#### Scenario: User expands the config panel
- **WHEN** user clicks the "机器人配置" section header
- **THEN** the config form expands to show the App ID and Secret inputs
- **AND** the expand/collapse indicator changes state
