## ADDED Requirements

### Requirement: Close button on login modal
The login modal SHALL display a close button (✕) in the top-right corner of the modal content.

#### Scenario: User clicks close button
- **WHEN** the login modal is visible and the user clicks the ✕ close button
- **THEN** the login modal SHALL emit a `close` event
- **AND** the parent component SHALL set `authStore.showLogin` to `false`

### Requirement: Mask click to close login modal
The login modal SHALL allow closing by clicking the mask (overlay area outside the modal).

#### Scenario: User clicks mask area
- **WHEN** the login modal is visible and the user clicks the mask area
- **THEN** the login modal SHALL close
- **AND** the parent component SHALL set `authStore.showLogin` to `false`

### Requirement: Close resets form state
When the login modal is closed, the form fields and error message SHALL be cleared.

#### Scenario: Close after failed login attempt
- **WHEN** the user has entered invalid credentials (error message displayed) and then closes the modal
- **THEN** upon reopening the modal, the form fields SHALL be empty
- **AND** no error message SHALL be displayed
