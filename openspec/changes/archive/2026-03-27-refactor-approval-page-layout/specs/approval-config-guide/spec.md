## ADDED Requirements

### Requirement: Unified configuration guide area
The system SHALL display a unified configuration guide area at the top of the approval board page, replacing the per-card configuration guides.

#### Scenario: Page loads with pending approvals
- **WHEN** the approval board page loads with pending approvals
- **THEN** a single configuration guide area SHALL be displayed at the top of the content area
- **AND** no individual approval card SHALL display its own configuration guide

#### Scenario: Configuration guide content
- **WHEN** the configuration guide area is rendered
- **THEN** it SHALL display instructions for configuring Feishu long connection
- **AND** it SHALL provide a link to the Feishu open platform documentation

### Requirement: Configuration guide visibility control
The system SHALL allow users to dismiss or collapse the configuration guide area.

#### Scenario: User dismisses guide
- **WHEN** user clicks the dismiss/collapse button on the configuration guide
- **THEN** the guide SHALL be hidden or minimized
- **AND** the setting SHALL persist for the current session
