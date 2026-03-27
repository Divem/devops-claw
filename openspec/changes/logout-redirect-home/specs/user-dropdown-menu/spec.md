## MODIFIED Requirements

### Requirement: User dropdown menu displays in header
The system SHALL display a dropdown menu when the user clicks on the user information area in the top-right corner of the page.

#### Scenario: User clicks on user info area
- **WHEN** the user clicks on the user avatar/username in the header
- **THEN** a dropdown menu SHALL appear below the user info area

### Requirement: Dropdown menu contains admin dashboard entry
The system SHALL display an "Admin Dashboard" entry in the user dropdown menu when the current user has admin role.

#### Scenario: Admin user opens dropdown
- **WHEN** an admin user clicks on the user info area
- **THEN** the dropdown menu SHALL contain an entry labeled "管理后台" or "Admin Dashboard"

#### Scenario: Regular user opens dropdown
- **WHEN** a regular user clicks on the user info area
- **THEN** the dropdown menu SHALL NOT contain the admin dashboard entry

### Requirement: Clicking admin entry navigates to admin dashboard
The system SHALL navigate to the admin dashboard when the user clicks on the admin dashboard entry in the dropdown menu.

#### Scenario: User clicks admin dashboard entry
- **WHEN** the user clicks on the "管理后台" entry in the dropdown
- **THEN** the system SHALL navigate to the admin dashboard page
- **AND** the dropdown menu SHALL close

### Requirement: Logout redirects to home page
The system SHALL navigate to the application root `/` when the user clicks the logout entry in the dropdown menu.

#### Scenario: User clicks logout from any page
- **WHEN** the user clicks the "退出登录" entry in the dropdown menu
- **THEN** the system SHALL clear authentication state
- **AND** the system SHALL navigate to the application root `/`
- **AND** the landing page SHALL be displayed

#### Scenario: User clicks logout from admin page
- **WHEN** an authenticated admin user is on `/admin/dashboard` and clicks "退出登录"
- **THEN** the system SHALL navigate to `/`
- **AND** the landing page SHALL be displayed
- **AND** the admin page SHALL NOT remain visible
