## Requirements

### Requirement: Dialog displays above all page elements
The dialog component MUST render above all other page elements, including images in the console panel.

#### Scenario: User opens dialog from configuration page
- **WHEN** user clicks the "去对话" button on the admin openclaw configuration page
- **THEN** the dialog opens and is fully visible above the console panel images
- **AND** the dialog content is not obscured by any page elements

### Requirement: Dialog overlay masks the background
The dialog overlay/backdrop MUST cover the entire page with appropriate z-index.

#### Scenario: Dialog overlay blocks interaction with background
- **WHEN** the dialog is open
- **THEN** the overlay layer covers the entire viewport
- **AND** clicks on background elements are blocked until dialog is closed

### Requirement: Z-index is consistent across browsers
The dialog MUST display correctly in all supported browsers (Chrome, Firefox, Safari, Edge).

#### Scenario: Dialog displays correctly in different browsers
- **WHEN** user opens the dialog in Chrome, Firefox, Safari, or Edge
- **THEN** the dialog displays above all other elements consistently
- **AND** no visual artifacts or layering issues occur
