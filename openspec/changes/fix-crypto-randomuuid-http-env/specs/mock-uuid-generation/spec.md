## ADDED Requirements

### Requirement: Compatible project ID generation
The mock data layer SHALL generate unique project IDs using a method compatible with both secure and non-secure browser contexts.

#### Scenario: Project creation in HTTP environment
- **WHEN** a user creates a new project via `createProject()` in an HTTP (non-secure) context
- **THEN** the system SHALL generate a valid project ID without throwing exceptions
- **AND** the generated ID SHALL follow the format `proj_<timestamp>_<random>`

#### Scenario: Project creation in HTTPS/localhost environment
- **WHEN** a user creates a new project via `createProject()` in HTTPS or localhost context
- **THEN** the system SHALL generate a valid project ID
- **AND** the generated ID SHALL be unique across multiple invocations

#### Scenario: ID uniqueness
- **WHEN** multiple projects are created in rapid succession
- **THEN** each project SHALL receive a distinct ID
- **AND** the probability of ID collision SHALL be negligible
