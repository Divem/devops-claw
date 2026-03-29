## 1. Auth Store 修改

- [x] 1.1 在 `src/stores/auth.ts` 的 `logout()` 函数中，调用 `clearAuth()` 后添加 `router.push('/')` 跳转到首页
- [x] 1.2 在 auth store 中引入 `useRouter`，确保路由实例可用

## 2. 验证

- [x] 2.1 确认从任意页面点击退出登录后跳转到首页，LandingPage 正常展示
- [x] 2.2 确认从 `/admin/*` 页面退出后不会残留管理页面
