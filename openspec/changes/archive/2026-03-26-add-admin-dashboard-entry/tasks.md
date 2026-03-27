## 1. User Dropdown Menu

- [x] 1.1 Add `role` field to user types (admin | user)
- [x] 1.2 Create `UserDropdown.vue` component with dropdown menu
- [x] 1.3 Update `AppHeader.vue` to integrate user dropdown
- [x] 1.4 Conditionally show "管理后台" entry based on admin role
- [x] 1.5 Implement click handler to navigate to admin dashboard

## 2. Admin Layout

- [x] 2.1 Create `AdminLayout.vue` component with topbar + sidebar structure
- [x] 2.2 Create sidebar navigation items (仪表盘, 实例管理, 机器人管理, 审批管理, 系统设置)
- [x] 2.3 Implement active navigation item highlighting
- [x] 2.4 Add back button to return to employee portal
- [x] 2.5 Apply design token styling (colors, spacing, shadows)

## 3. Admin Dashboard Page

- [x] 3.1 Create `AdminDashboard.vue` page component
- [x] 3.2 Create instance statistics cards (total, running, pending)
- [x] 3.3 Create resource usage overview section (CPU/Memory/Storage)
- [x] 3.4 Create 7-day creation trend chart component
- [x] 3.5 Create todo items list component (待办事项)
- [x] 3.6 Add mock API handlers for dashboard data
- [x] 3.7 Integrate dashboard into admin layout

## 4. Routing and Integration

- [x] 4.1 Add 'admin_dashboard' to pageState in project store
- [x] 4.2 Add admin dashboard route handling in App.vue
- [x] 4.3 Ensure proper navigation flow between employee portal and admin
- [x] 4.4 Test admin-only access (entry should not show for regular users)

## 5. Polish and Testing

- [x] 5.1 Verify dropdown closes when clicking outside (naive-ui dropdown handles this)
- [x] 5.2 Verify navigation highlighting updates correctly
- [x] 5.3 Test back navigation from admin to employee portal
- [x] 5.4 Review responsive behavior at different screen sizes
