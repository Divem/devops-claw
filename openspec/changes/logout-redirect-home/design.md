## Context

当前 `authStore.logout()` 只清除认证状态（token、用户信息、localStorage），不触发路由跳转。用户退出后停留在原页面，导致无认证上下文的页面残留。项目使用 Vue Router（HTML5 history 模式）+ Pinia 进行状态管理。

## Goals / Non-Goals

**Goals:**
- 退出登录后自动跳转到首页 `/`（LandingPage）
- 确保 App.vue 的 `showLandingPage` 状态正确重置，首页正常展示

**Non-Goals:**
- 不添加路由守卫（`beforeEach`）或 `meta.requiresAuth` 认证拦截
- 不修改登录流程
- 不处理 token 过期自动跳转

## Decisions

### 1. 在 auth store 的 `logout()` 中直接使用 `router.push('/')`

**选择**：在 `logout()` 函数内调用 `router.push('/')` 进行跳转。

**替代方案**：在 `UserDropdown.vue` 调用 `logout()` 后手动 `router.push('/')`。

**理由**：统一在 store 中处理，确保无论从哪里调用 `logout()`（包括 token 过期刷新失败等场景）都能正确跳转。auth store 已经引入了 router（通过 `useRouter()`）。

### 2. 重置 `showLandingPage` 通过路由跳转自然解决

**选择**：跳转到 `/` 后，路由变化会触发 App.vue 的 computed 逻辑，`isAdminRoute` 为 false，自然进入 LandingPage 渲染分支。

**理由**：无需额外重置状态，路由本身就是状态的来源。
