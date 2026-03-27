## ADDED Requirements

### Requirement: Footer displays branding and navigation
The LandingFooter SHALL display the brand logo and navigation links.

#### Scenario: Footer content display
- **WHEN** the footer renders
- **THEN** it displays the brand logo on the left
- **AND** it displays navigation links on the right
- **AND** the background uses dark theme color

### Requirement: Footer navigation links are correct
The LandingFooter SHALL display the correct navigation links.

#### Scenario: Navigation links render
- **WHEN** the footer renders
- **THEN** it displays links: 飞书官网, 飞书妙塔, 飞书 aily, 飞书 aPaaS, 飞书集成平台
- **AND** each link has appropriate hover state

### Requirement: Footer displays copyright information
The LandingFooter SHALL display copyright and legal information.

#### Scenario: Copyright text display
- **WHEN** the footer renders
- **THEN** it displays copyright text with current year
- **AND** it displays ICP registration number
- **AND** it displays other legal information as per design

### Requirement: Footer is responsive
The LandingFooter layout SHALL adapt to different screen sizes.

#### Scenario: Mobile viewport
- **WHEN** viewport is less than 768px
- **THEN** logo and links stack vertically
- **AND** copyright text remains readable
