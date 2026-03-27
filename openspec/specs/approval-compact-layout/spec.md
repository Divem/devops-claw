## ADDED Requirements

### Requirement: Compact card layout
The system SHALL provide a compact card layout option that displays more approvals per screen.

#### Scenario: Compact view enabled
- **WHEN** the user switches to compact view
- **THEN** approval cards SHALL use reduced padding, margins, and font sizes
- **AND** at least 50% more cards SHALL be visible in the viewport compared to default view

#### Scenario: List view option
- **WHEN** the user switches to list view
- **THEN** approvals SHALL be displayed in a table-like row format
- **AND** each row SHALL show: owner avatar, owner name, instance name, App ID (masked), status, and actions
- **AND** the row height SHALL be no more than 56px

### Requirement: View mode persistence
The system SHALL remember the user's preferred view mode.

#### Scenario: User changes view mode
- **WHEN** user switches between card view, compact card view, or list view
- **THEN** the preference SHALL be saved to localStorage
- **AND** the preference SHALL be restored on next page visit

### Requirement: Responsive layout
The compact layouts SHALL adapt to different screen sizes.

#### Scenario: Small screen display
- **WHEN** the viewport width is less than 768px
- **THEN** the system SHALL automatically switch to the most space-efficient layout
- **AND** all critical information SHALL remain visible
