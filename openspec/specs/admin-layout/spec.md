## ADDED Requirements

### Requirement: Admin layout has full-screen structure
The system SHALL render the admin dashboard with a full-screen layout including a top navigation bar and a left sidebar.

#### Scenario: Admin navigates to dashboard
- **WHEN** an admin user enters the admin dashboard
- **THEN** the page SHALL display with:
  - A top navigation bar with platform logo and user menu
  - A left sidebar with navigation items
  - A main content area for dashboard widgets

### Requirement: Admin sidebar contains navigation items
The system SHALL display navigation items in the left sidebar for accessing different admin sections.

#### Scenario: Admin views sidebar
- **WHEN** an admin user views the admin layout
- **THEN** the left sidebar SHALL contain navigation items for:
  - 仪表盘 (Dashboard)
  - 实例管理 (Instance Management)
  - 全局配置 (Global Config)
  - 审批管理 (Approval Management)
  - 机器人管理 (Bot Management)
  - 系统设置 (Settings)

### Requirement: Current navigation item is highlighted
The system SHALL highlight the currently active navigation item in the sidebar.

#### Scenario: Admin is on dashboard page
- **WHEN** the admin user is on the dashboard page
- **THEN** the "仪表盘" navigation item SHALL be visually highlighted

### Requirement: Back button returns to employee portal
The system SHALL provide a way for the admin to return to the employee portal from the admin dashboard.

#### Scenario: Admin clicks back
- **WHEN** the admin user clicks the back/return button
- **THEN** the system SHALL navigate back to the employee portal home page
