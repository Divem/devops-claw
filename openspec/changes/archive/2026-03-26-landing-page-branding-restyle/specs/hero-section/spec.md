## MODIFIED Requirements

### Requirement: Hero section displays main value proposition
The HeroSection SHALL display the main headline, subtitle, and primary CTA button prominently.

#### Scenario: Hero content display
- **WHEN** the hero section renders
- **THEN** it displays the title "DevOps Claw"
- **AND** it displays the subtitle describing enterprise deployment solution
- **AND** it displays a primary "立即部署" button

#### Scenario: Subtitle uses DevOps branding
- **WHEN** the hero section renders
- **THEN** the subtitle contains "DevOps" branding
- **AND** no "飞书" text appears in the subtitle

### Requirement: Hero section is responsive
The HeroSection SHALL adapt its layout for different screen sizes using design token breakpoints.

#### Scenario: Desktop viewport (>= 1024px)
- **WHEN** the viewport width is 1024px or above
- **THEN** the title font size is 40px (展示字号)
- **AND** the title font weight is 600

#### Scenario: Tablet/Mobile viewport (< 1024px)
- **WHEN** the viewport width is less than 1024px
- **THEN** the title font size reduces to 32px
- **AND** the illustration scales down proportionally
- **AND** content remains centered

### Requirement: Hero CTA button follows design tokens
The Hero CTA button SHALL use standard design token values.

#### Scenario: Button styling
- **WHEN** the CTA button renders
- **THEN** border-radius is 6px (@radiusButton)
- **AND** height is 48px
- **AND** font weight is 500
