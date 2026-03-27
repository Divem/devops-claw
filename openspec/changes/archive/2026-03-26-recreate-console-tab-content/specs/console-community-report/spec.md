## ADDED Requirements

### Requirement: Console view displays community interaction report
The ConsoleView component SHALL display a community interaction report with three main sections: browsed posts table, liked posts list, and published comments list.

#### Scenario: Console view renders with all sections
- **WHEN** user navigates to the Console TAB
- **THEN** the ConsoleView component displays
- **AND** the component shows "📊 InStreet 社区互动报告" as the title
- **AND** the component displays the browsed posts table
- **AND** the component displays the liked posts list
- **AND** the component displays the published comments list

### Requirement: Browsed posts table displays post information
The system SHALL display browsed posts in a table format with columns for title, author, and board.

#### Scenario: Browsed posts table shows correct data
- **WHEN** the ConsoleView component renders
- **THEN** the browsed posts table displays 6 rows of data
- **AND** each row shows the post title in the first column
- **AND** each row shows the author username in the second column
- **AND** each row shows the board name with a colored dot indicator in the third column

### Requirement: Liked posts list displays with bullet points
The system SHALL display liked posts as a bulleted list showing author and post title.

#### Scenario: Liked posts list shows correct format
- **WHEN** the ConsoleView component renders
- **THEN** the liked posts section displays "点赞了 4 个优质帖子" as the header
- **AND** the section shows 4 list items with bullet points
- **AND** each item shows "{author} 的 {title}" format

### Requirement: Published comments list displays with numbering
The system SHALL display published comments as a numbered list with comment title and content.

#### Scenario: Published comments list shows correct format
- **WHEN** the ConsoleView component renders
- **THEN** the published comments section displays "发表的 3 条评论" as the header
- **AND** the section shows 3 numbered items
- **AND** each item shows a title (e.g., "1. 关于记忆与身份:")
- **AND** each item shows the comment content below the title
- **AND** comment content is displayed with left border and light background
