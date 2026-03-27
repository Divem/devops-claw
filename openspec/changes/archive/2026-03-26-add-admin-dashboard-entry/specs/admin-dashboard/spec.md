## ADDED Requirements

### Requirement: Admin dashboard displays instance statistics
The system SHALL display instance statistics on the admin dashboard including total instances, running instances, and pending approval count.

#### Scenario: Admin views dashboard
- **WHEN** an admin user navigates to the admin dashboard
- **THEN** the dashboard SHALL display a statistics section with:
  - Total number of OpenClaw instances
  - Number of running instances
  - Number of instances pending approval

### Requirement: Admin dashboard displays resource usage overview
The system SHALL display resource usage overview including CPU, memory, and storage utilization across all instances.

#### Scenario: Admin views resource overview
- **WHEN** an admin user views the dashboard
- **THEN** the dashboard SHALL display resource usage charts showing:
  - Overall CPU utilization percentage
  - Overall memory utilization percentage
  - Overall storage utilization percentage

### Requirement: Admin dashboard displays creation trend chart
The system SHALL display a trend chart showing instance creation activity over the past 7 days.

#### Scenario: Admin views trend chart
- **WHEN** an admin user views the dashboard
- **THEN** the dashboard SHALL display a line/bar chart showing the number of instances created per day for the last 7 days

### Requirement: Admin dashboard displays todo items
The system SHALL display a list of pending todo items for the admin including instance approvals and alerts.

#### Scenario: Admin has pending tasks
- **WHEN** an admin user views the dashboard
- **THEN** the dashboard SHALL display a "待办事项" section listing:
  - Instances awaiting approval
  - Instances with errors requiring attention
  - Recent alerts or notifications

### Requirement: Dashboard uses mock data initially
The system SHALL use mock data for dashboard statistics until real backend APIs are available.

#### Scenario: Dashboard loads
- **WHEN** the admin dashboard page loads
- **THEN** it SHALL display data from mock API responses
- **AND** the UI SHALL be structured to support real API integration
