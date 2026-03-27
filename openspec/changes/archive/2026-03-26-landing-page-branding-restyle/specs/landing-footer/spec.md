## MODIFIED Requirements

### Requirement: Footer displays branding and navigation
The LandingFooter SHALL display the DevOps Claw brand and navigation links.

#### Scenario: Footer brand displays correctly
- **WHEN** the footer renders
- **THEN** it displays the brand name "DevOps Claw" on the left
- **AND** no "飞书" text appears in the brand name

#### Scenario: Navigation links are DevOps-branded
- **WHEN** the footer renders
- **THEN** it displays links: 文档, API, 社区, 状态页, 更新日志
- **AND** no "飞书" product links appear

### Requirement: Footer displays copyright information
The LandingFooter SHALL display copyright and legal information for DevOps Claw.

#### Scenario: Copyright text display
- **WHEN** the footer renders
- **THEN** it displays copyright text with "DevOps Claw"
- **AND** it does not display "北京飞书科技有限公司"
- **AND** it does not display ICP or 公安备案号

### Requirement: Footer is responsive
The LandingFooter layout SHALL adapt to different screen sizes.

#### Scenario: Desktop viewport (>= 1024px)
- **WHEN** viewport is 1024px or above
- **THEN** brand and navigation links are side by side

#### Scenario: Mobile viewport (< 1024px)
- **WHEN** viewport is less than 1024px
- **THEN** logo and links stack vertically
- **AND** copyright text remains readable
