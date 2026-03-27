## MODIFIED Requirements

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
