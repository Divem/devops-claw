## MODIFIED Requirements

### Requirement: Feature card content matches design
Each feature card SHALL display the correct content with DevOps branding.

#### Scenario: Card 1 - One-click deployment
- **WHEN** the first feature card renders
- **THEN** it displays the mouse pointer icon
- **AND** it displays title "一键部署，所见即所得"
- **AND** it displays description containing "即时通讯" (not "飞书 IM")

#### Scenario: Card 2 - Native experience
- **WHEN** the second feature card renders
- **THEN** it displays the shrimp claw icon
- **AND** it displays title "原生体验，能力无损"
- **AND** it displays description containing "官方集成插件" (not "飞书官方插件")

#### Scenario: Card 3 - Enterprise security
- **WHEN** the third feature card renders
- **THEN** it displays the shield icon
- **AND** it displays title "企业级安全，数据不离场"
- **AND** it displays description containing "企业内网" (not "飞书体系")

### Requirement: Feature cards follow design tokens
The FeatureCards component SHALL use design token values for styling.

#### Scenario: Card hover effect
- **WHEN** user hovers over a feature card
- **THEN** the card translates up 4px
- **AND** box-shadow is `0px 0px 8px 0px rgba(2, 2, 2, 0.1)` (标准阴影)
- **AND** transition duration is `0.2s ease-in-out` (标准交互)

#### Scenario: Card border radius
- **WHEN** feature cards render
- **THEN** each card uses standard border-radius from design tokens
- **AND** border uses `@borderColor`

### Requirement: Feature cards are responsive
The FeatureCards layout SHALL adapt using design token breakpoints.

#### Scenario: Small desktop viewport (< 1440px)
- **WHEN** viewport is less than 1440px (md breakpoint)
- **THEN** cards switch to 2-column layout

#### Scenario: Tablet/Mobile viewport (< 1024px)
- **WHEN** viewport is less than 1024px (sm breakpoint)
- **THEN** cards stack vertically in a single column
