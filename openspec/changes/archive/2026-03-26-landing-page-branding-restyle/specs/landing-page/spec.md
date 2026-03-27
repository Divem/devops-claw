## MODIFIED Requirements

### Requirement: Landing page provides navigation to app
The LandingPage SHALL provide clear navigation for users to access the main application.

#### Scenario: User clicks CTA button
- **WHEN** user clicks the "立即部署" button
- **THEN** the application navigates to the project creation page
- **AND** the project creation modal opens automatically

### Requirement: Landing page maintains brand consistency
The LandingPage SHALL use the existing design system (colors, typography, spacing) to maintain brand consistency.

#### Scenario: Brand name displays correctly
- **WHEN** the landing page renders
- **THEN** the header brand name displays "DevOps Claw"
- **AND** the navigation link text is "Claw 体验指南"

#### Scenario: Visual consistency check
- **WHEN** the landing page renders
- **THEN** the primary color matches the brand color `#006eff`
- **AND** typography uses the design token font sizes
- **AND** spacing follows the 8px grid system

#### Scenario: Link colors use design tokens
- **WHEN** navigation links render
- **THEN** link color is `#2d8cf0` (link default)
- **AND** hover color is `#57a3f3` (link hover)
