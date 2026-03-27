## 1. 类型定义

- [x] 1.1 创建 `src/types/auth.ts`，定义 `AuthUser`（id, name, avatarUrl）、`LoginPayload`（username, password）、`AuthTokens`（accessToken, refreshToken, expiresAt）类型
- [x] 1.2 创建 `src/api/auth.ts`，封装 login / refreshToken / logout / getCurrentUser 四个 API 函数

## 2. Auth Store

- [x] 2.1 创建 `src/stores/auth.ts`，实现 `useAuthStore`：状态（user, isAuthenticated, showLogin, isLoading）、方法（login, logout, checkAuth, refreshToken）、localStorage 读写逻辑
- [x] 2.2 实现 token 自动刷新机制（过期前 5 分钟触发，并发控制标志位）
- [x] 2.3 编写 `tests/stores/auth.test.ts` 单元测试

## 3. 登录弹窗组件

- [x] 3.1 创建 `src/components/LoginModal.vue`，包含用户名/密码表单、"使用域账号登录"提示文案、登录按钮，mask-closable=false
- [x] 3.2 实现表单验证（非空检查）、登录中 loading 状态、登录失败错误提示
- [x] 3.3 弹窗样式与现有模态弹窗统一（480px 宽、@radiusModal、24px 内边距）

## 4. 部署流程集成

- [x] 4.1 修改 `src/App.vue`：导入 LoginModal 并挂载到模板中，通过 `authStore.showLogin` 控制显隐
- [x] 4.2 修改 `handleStartDeploy` 方法：先检查 `authStore.isAuthenticated`，未登录则 `authStore.showLogin = true`，登录成功回调中继续部署流程
- [x] 4.3 在 `App.vue` 的 `onMounted` 中调用 `authStore.checkAuth()` 恢复登录态

## 5. 退出登录

- [x] 5.1 修改 `src/components/UserDropdown.vue`：实现退出登录功能，调用 `authStore.logout()`

## 6. MSW Mock

- [x] 6.1 在 `src/mocks/handlers.ts` 中添加 login / refresh / logout / me 四个 mock handler
- [x] 6.2 在 `src/mocks/data.ts` 中添加 mock token 和 mock 认证响应数据

## 7. API 拦截器

- [x] 7.1 创建 `src/api/client.ts`，封装 fetch/axios 请求拦截器，自动注入 Authorization header，处理 401 自动刷新 token
- [x] 7.2 迁移现有 `App.vue` 和 `useProjectStore` 中的 fetch 调用使用统一 client
