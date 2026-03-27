## ADDED Requirements

### Requirement: Hero section displays main value proposition
The HeroSection SHALL display the main headline, subtitle, and primary CTA button prominently.

#### Scenario: Hero content display
- **WHEN** the hero section renders
- **THEN** it displays the title "飞书 OpenClaw"
- **AND** it displays the subtitle describing enterprise deployment solution
- **AND** it displays a primary "立即部署" button

### Requirement: Hero section includes visual illustration
The HeroSection SHALL include a visual illustration above the text content.

#### Scenario: Illustration renders with valid image
- **WHEN** the hero section loads
- **THEN** the illustration displays above the title
- **AND** the image file is a valid, non-placeholder image (file size > 1KB)
- **AND** the illustration has descriptive alt text for accessibility

#### Scenario: Illustration alt text reflects DevOps Claw branding
- **WHEN** the hero section renders
- **THEN** the image alt text is "DevOps Claw AI 智能助手"

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
