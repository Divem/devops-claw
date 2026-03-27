## ADDED Requirements

### Requirement: Hero illustration has larger visual footprint
The hero illustration SHALL render at a significantly larger size than the current 520px fixed width to create strong visual impact on first load.

#### Scenario: Desktop large display
- **WHEN** the viewport width is 1440px or wider
- **THEN** the illustration width is at least 800px
- **AND** the illustration height scales proportionally

#### Scenario: Standard desktop display
- **WHEN** the viewport width is between 1024px and 1439px
- **THEN** the illustration width scales proportionally using the clamp formula
- **AND** the illustration remains centered

#### Scenario: Mobile viewport preserves usability
- **WHEN** the viewport width is less than 1024px
- **THEN** the illustration width does not exceed 90vw
- **AND** the illustration height scales proportionally
- **AND** surrounding content remains accessible without excessive scrolling

### Requirement: Hero illustration blends with surrounding sections
The hero illustration SHALL have visual transition effects at its edges so it naturally blends into the page background above (navigation) and below (feature cards).

#### Scenario: Top edge fade transition
- **WHEN** the hero section renders
- **THEN** the top edge of the illustration area has a gradient fade-out effect
- **AND** the fade blends into the page background color

#### Scenario: Bottom edge fade transition
- **WHEN** the hero section renders
- **THEN** the bottom edge of the illustration area has a gradient fade-out effect
- **AND** the fade transitions smoothly to the feature cards section

#### Scenario: No visual hard edges on illustration
- **WHEN** the hero illustration is displayed
- **THEN** the illustration does not have a hard rectangular border
- **AND** the edges dissolve naturally into the background

### Requirement: Hero illustration has entrance animation
The hero illustration SHALL animate on page load to create a dynamic first impression.

#### Scenario: Image entrance animation
- **WHEN** the landing page loads
- **THEN** the illustration fades in with a slight upward float motion
- **AND** the animation duration is between 600ms and 1000ms
- **AND** the animation uses an ease-out timing function

#### Scenario: Staggered content reveal
- **WHEN** the illustration entrance animation begins
- **THEN** the title, subtitle, and CTA button appear with sequential delays after the illustration

#### Scenario: Reduced motion preference
- **WHEN** the user has `prefers-reduced-motion: reduce` enabled
- **THEN** the entrance animation is disabled
- **AND** all hero content appears immediately without animation

### Requirement: Hero illustration breaks container boundaries
The hero illustration SHALL extend beyond its container's top boundary to create visual tension and immersion.

#### Scenario: Illustration extends upward
- **WHEN** the hero section renders
- **THEN** the illustration visually extends above the standard content flow area
- **AND** the extension does not overlap with the fixed navigation bar content
