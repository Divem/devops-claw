## MODIFIED Requirements

### Requirement: Approval card displays application information
The approval card SHALL display application information in a compact format and SHALL NOT display an embedded configuration guide.

#### Scenario: Card renders with pending status
- **WHEN** an approval card is rendered with pending status
- **THEN** it SHALL display: owner avatar (24px), owner name, submit time, instance avatar (20px), instance name, masked App ID
- **AND** it SHALL NOT display the ApprovalGuide component
- **AND** it SHALL display action buttons: "去配置" and "标记完成"
- **AND** the card padding SHALL be 12px vertical and 16px horizontal

#### Scenario: Card renders with approved status
- **WHEN** an approval card is rendered with approved status
- **THEN** it SHALL display: owner avatar (24px), owner name, submit time, instance name, approved timestamp
- **AND** it SHALL NOT display any action buttons
- **AND** the card SHALL use a subdued visual style

#### Scenario: Dynamic configuration link
- **WHEN** user clicks the "去配置" button on a pending approval card
- **THEN** the browser SHALL open a new tab to `https://open.feishu.cn/app/{appId}/baseinfo`
- **AND** the {appId} SHALL be the actual application ID from the approval data

## REMOVED Requirements

### Requirement: Embedded ApprovalGuide component
**Reason**: Configuration guide is now unified at the page level to reduce visual clutter
**Migration**: The ApprovalGuide component is removed from ApprovalCard. Users will see the unified guide at the top of the approval board page instead.

### Requirement: Large card padding and spacing
**Reason**: To increase information density and reduce scrolling
**Migration**: Cards now use compact styling. Users can switch to list view for even higher information density.
