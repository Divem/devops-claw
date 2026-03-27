## 1. Setup and Assets

- [x] 1.1 Create landing page component directory `src/components/landing/`
- [x] 1.2 Add 3D shrimp group illustration to `public/landing/hero-shrimps.png`
- [x] 1.3 Add feature icons to `public/landing/` (mouse-pointer, shrimp-claw, shield)
- [x] 1.4 Verify all design tokens are available in variables.less

## 2. Hero Section Component

- [x] 2.1 Create `src/components/landing/HeroSection.vue`
- [x] 2.2 Implement hero layout with shrimp illustration above text
- [x] 2.3 Add main title "飞书 OpenClaw" with appropriate typography
- [x] 2.4 Add subtitle text about enterprise deployment solution
- [x] 2.5 Implement "立即部署" CTA button with hover states
- [x] 2.6 Add responsive styles for mobile/tablet/desktop
- [x] 2.7 Emit `deploy` event when CTA is clicked

## 3. Feature Cards Component

- [x] 3.1 Create `src/components/landing/FeatureCards.vue`
- [x] 3.2 Add section title "好上手，超能干，更放心"
- [x] 3.3 Implement FeatureCard sub-component with icon, title, description
- [x] 3.4 Create Card 1: "一键部署，所见即所得" with mouse pointer icon
- [x] 3.5 Create Card 2: "原生体验，能力无损" with shrimp claw icon
- [x] 3.6 Create Card 3: "企业级安全，数据不离场" with shield icon
- [x] 3.7 Implement 3-column layout for desktop
- [x] 3.8 Implement stacked layout for mobile
- [x] 3.9 Add gradient backgrounds or decorative elements as per design

## 4. Landing Footer Component

- [x] 4.1 Create `src/components/landing/LandingFooter.vue`
- [x] 4.2 Implement dark theme background using design tokens
- [x] 4.3 Add brand logo on the left side
- [x] 4.4 Add navigation links: 飞书官网, 飞书妙塔, 飞书 aily, 飞书 aPaaS, 飞书集成平台
- [x] 4.5 Add copyright text and legal information
- [x] 4.6 Implement responsive layout for mobile

## 5. Landing Page Container

- [x] 5.1 Create `src/components/landing/LandingPage.vue`
- [x] 5.2 Import and compose HeroSection, FeatureCards, LandingFooter
- [x] 5.3 Add top navigation bar with logo and "OpenClaw 体验指南" link
- [x] 5.4 Handle `deploy` event from HeroSection to navigate to project creation
- [x] 5.5 Apply consistent padding and max-width constraints
- [x] 5.6 Ensure smooth scrolling behavior

## 6. Integration

- [x] 6.1 Update `App.vue` to conditionally render LandingPage or existing project management UI
- [x] 6.2 Add state management to track if user has seen landing page
- [x] 6.3 Implement navigation from LandingPage to project creation flow
- [x] 6.4 Ensure LandingPage displays on initial visit

## 7. Testing

- [x] 7.1 Create unit tests for HeroSection component
- [x] 7.2 Create unit tests for FeatureCards component
- [x] 7.3 Create unit tests for LandingFooter component
- [x] 7.4 Verify responsive behavior on different screen sizes
- [x] 7.5 Test CTA button navigation flow
- [x] 7.6 Run all tests: `npx vitest run`

## 8. Polish and Review

- [x] 8.1 Verify all colors match design tokens
- [x] 8.2 Check typography hierarchy and readability
- [x] 8.3 Optimize images (compress, lazy loading)
- [x] 8.4 Run build: `npm run build` - ensure no errors
- [x] 8.5 Run dev server and manually verify visual appearance
- [x] 8.6 Check accessibility (alt text, keyboard navigation, color contrast)
