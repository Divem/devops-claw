## ADDED Requirements

### Requirement: Feature cards display three core selling points
The FeatureCards SHALL display exactly three feature cards in a row on desktop.

#### Scenario: Features display
- **WHEN** the feature section renders
- **THEN** three cards are displayed with equal width
- **AND** each card has an icon, title, and description

### Requirement: Feature card content matches design
Each feature card SHALL display the correct content as per the design.

#### Scenario: Card 1 - One-click deployment
- **WHEN** the first feature card renders
- **THEN** it displays the mouse pointer icon
- **AND** it displays title "一键部署，所见即所得"
- **AND** it displays description about simplified deployment process

#### Scenario: Card 2 - Native experience
- **WHEN** the second feature card renders
- **THEN** it displays the shrimp claw icon
- **AND** it displays title "原生体验，能力无损"
- **AND** it displays description about full OpenClaw capabilities

#### Scenario: Card 3 - Enterprise security
- **WHEN** the third feature card renders
- **THEN** it displays the shield icon
- **AND** it displays title "企业级安全，数据不离场"
- **AND** it displays description about data security

### Requirement: Feature cards are responsive
The FeatureCards layout SHALL adapt to different screen sizes.

#### Scenario: Tablet viewport
- **WHEN** viewport is between 768px and 1024px
- **THEN** cards may stack in 2+1 or maintain 3-column layout

#### Scenario: Mobile viewport
- **WHEN** viewport is less than 768px
- **THEN** cards stack vertically in a single column
- **AND** each card takes full width

### Requirement: Feature section has section title
The FeatureCards SHALL display a section title above the cards.

#### Scenario: Section header displays
- **WHEN** the feature section renders
- **THEN** it displays the section title "好上手，超能干，更放心"
- **AND** the title is centered above the cards
