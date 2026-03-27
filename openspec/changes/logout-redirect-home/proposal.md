## Why

用户点击退出登录后，当前页面停留在原位置（如 `/admin/dashboard`），没有任何导航或状态重置。用户会看到一个无认证上下文的管理页面，体验断裂。需要在退出登录后自动跳转到首页，与常见 Web 应用的行为保持一致。

## What Changes

- 退出登录后自动跳转到首页（`/`），即 LandingPage
- 重置 `showLandingPage` 状态，确保首页正确展示

## Capabilities

### New Capabilities

（无新能力）

### Modified Capabilities

- `user-dropdown-menu`: 退出登录操作增加页面跳转逻辑
- `landing-page`: 确保退出登录后首页状态正确

## Impact

- `src/stores/auth.ts` — `logout()` 函数需要触发路由跳转
- `src/components/UserDropdown.vue` — 调用 logout 后可能需要导航
- `src/App.vue` — `showLandingPage` 状态在退出时需要重置
