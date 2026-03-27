## ADDED Requirements

### Requirement: Terminal tab visibility
The system SHALL display a "终端" tab in the configuration page tab bar, positioned after the "代码模式" tab.

#### Scenario: Tab is visible
- **WHEN** user navigates to the configuration page
- **THEN** the tab bar shows three tabs: "控制台", "代码模式", "终端"

#### Scenario: Tab is clickable
- **WHEN** user clicks on the "终端" tab
- **THEN** the terminal view is displayed below the tab bar

### Requirement: Terminal visual styling
The system SHALL render the terminal view with Ubuntu-style terminal aesthetics.

#### Scenario: Dark background
- **WHEN** the terminal view is active
- **THEN** the content area has a dark background color (#1e1e1e)

#### Scenario: Monospace font
- **WHEN** the terminal view displays text
- **THEN** the text uses monospace font family (Monaco, Consolas, 'Courier New')

#### Scenario: Syntax highlighting colors
- **WHEN** the terminal view displays system information
- **THEN** different text types use appropriate colors:
  - Green (#4ec9b0) for success/status indicators
  - Blue (#569cd6) for links and commands
  - Yellow (#dcdcaa) for warnings
  - Light gray (#d4d4d4) for normal text

### Requirement: Terminal content display
The system SHALL display configuration content in a terminal-like format.

#### Scenario: Welcome message
- **WHEN** the terminal view is first loaded
- **THEN** it displays a welcome message: "Welcome to OpenClaw Config Terminal"

#### Scenario: System information
- **WHEN** the terminal view displays system info
- **THEN** it shows formatted statistics similar to Ubuntu MOTD:
  - System load
  - Memory usage
  - Configuration file size
  - Last modified time

#### Scenario: Configuration as command output
- **WHEN** the terminal view displays configuration
- **THEN** it formats the config as if produced by a command:
  ```
  root@openclaw:~# cat config.yaml
  [configuration content here]
  root@openclaw:~#
  ```

### Requirement: Tab switching behavior
The system SHALL maintain proper tab state when switching between views.

#### Scenario: Switch from console to terminal
- **WHEN** user switches from "控制台" to "终端" tab
- **THEN** the terminal view is rendered with current configuration data

#### Scenario: Switch from code mode to terminal
- **WHEN** user switches from "代码模式" to "终端" tab  
- **THEN** the terminal view displays the same configuration in terminal format

#### Scenario: Return to other tabs
- **WHEN** user switches from "终端" to another tab
- **THEN** the terminal view is hidden and the selected tab's content is shown
