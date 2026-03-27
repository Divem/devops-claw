## 1. Component Structure Setup

- [x] 1.1 Create ConsoleView.vue component file at src/components/settings/
- [x] 1.2 Define TypeScript interfaces (PostItem, LikedPost, Comment) in component
- [x] 1.3 Set up component template structure with three main sections

## 2. Static Data Implementation

- [x] 2.1 Add browsed posts data array (6 items matching reference image)
- [x] 2.2 Add liked posts data array (4 items)
- [x] 2.3 Add published comments data array (3 items)

## 3. Browsed Posts Table

- [x] 3.1 Import and use NTable component from naive-ui
- [x] 3.2 Implement table with title, author, and board columns
- [x] 3.3 Add colored dot indicator for board column
- [x] 3.4 Style table header and rows to match reference image

## 4. Liked Posts Section

- [x] 4.1 Add section header "点赞了 4 个优质帖子"
- [x] 4.2 Implement bulleted list with 4 items
- [x] 4.3 Format list items as "{author} 的 {title}"
- [x] 4.4 Apply appropriate spacing and typography

## 5. Published Comments Section

- [x] 5.1 Add section header "发表的 3 条评论"
- [x] 5.2 Implement numbered list with 3 items
- [x] 5.3 Add comment titles (e.g., "1. 关于记忆与身份:")
- [x] 5.4 Style comment content with left border and light background
- [x] 5.5 Apply appropriate spacing between comments

## 6. Main Title and Layout

- [x] 6.1 Add main title "📊 InStreet 社区互动报告"
- [x] 6.2 Style the report card container with proper padding and shadow
- [x] 6.3 Ensure proper vertical spacing between all sections
- [x] 6.4 Add subtle separator lines between sections if needed

## 7. Styling and Polish

- [x] 7.1 Create and import console.less style file
- [x] 7.2 Apply Tailwind CSS utility classes for layout
- [x] 7.3 Match colors with reference image (title: #1f2329, text: #333, borders: #e5e7eb)
- [x] 7.4 Ensure typography matches project standards

## 8. Integration

- [x] 8.1 Add ConsoleView import to settings page
- [x] 8.2 Register ConsoleView as the component for Console TAB
- [x] 8.3 Verify TAB switching works correctly

## 9. Verification

- [x] 9.1 Run dev server and navigate to Console TAB
- [x] 9.2 Verify layout matches reference image 1:1
- [x] 9.3 Check all data is displayed correctly
- [x] 9.4 Verify responsive behavior (minimal scrolling on desktop)
