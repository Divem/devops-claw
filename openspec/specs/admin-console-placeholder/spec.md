## ADDED Requirements

### Requirement: Admin console placeholder image display
The system SHALL display the admin placeholder image at the top of the console page for the route `projects/proj-001/admin`.

#### Scenario: Image is displayed on console page load
- **WHEN** user navigates to the console page at `projects/proj-001/admin`
- **THEN** the admin placeholder image SHALL be rendered at the top of the page content area
- **AND** the image source SHALL be `docs/images/99openclaw-admin.png`

#### Scenario: Image styling is applied
- **WHEN** the admin placeholder image is displayed
- **THEN** the image SHALL have a fixed height of 200px
- **AND** the image width SHALL maintain its aspect ratio
- **AND** the image SHALL be horizontally centered
- **AND** the image SHALL be positioned above the console content without overlapping

#### Scenario: Image loads successfully
- **GIVEN** the image file exists at `docs/images/99openclaw-admin.png`
- **WHEN** the console page loads
- **THEN** the image SHALL be displayed without errors
- **AND** the console content below SHALL remain fully functional

#### Scenario: Responsive behavior on smaller screens
- **WHEN** the viewport width is less than 768px
- **THEN** the image height SHALL be reduced to 150px
- **AND** the image SHALL remain centered and maintain aspect ratio

