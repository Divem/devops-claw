## ADDED Requirements

### Requirement: Hero section displays main value proposition
The HeroSection SHALL display the main headline, subtitle, and primary CTA button prominently.

#### Scenario: Hero content display
- **WHEN** the hero section renders
- **THEN** it displays the title "飞书 OpenClaw"
- **AND** it displays the subtitle describing enterprise deployment solution
- **AND** it displays a primary "立即部署" button

### Requirement: Hero section includes visual illustration
The HeroSection SHALL include a visual illustration (3D shrimp group) above the text content.

#### Scenario: Visual element renders
- **WHEN** the hero section loads
- **THEN** the shrimp illustration displays above the title
- **AND** the illustration loads with appropriate alt text for accessibility

### Requirement: Hero section is responsive
The HeroSection SHALL adapt its layout for different screen sizes.

#### Scenario: Mobile viewport
- **WHEN** the viewport width is less than 768px
- **THEN** the title font size reduces appropriately
- **AND** the illustration scales down proportionally
- **AND** content remains centered

### Requirement: Hero CTA button is actionable
The Hero CTA button SHALL trigger the deployment flow when clicked.

#### Scenario: CTA interaction
- **WHEN** user clicks the "立即部署" button
- **THEN** an event is emitted to the parent component
- **AND** the button shows hover and active states
