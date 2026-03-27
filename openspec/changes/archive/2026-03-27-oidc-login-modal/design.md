## Context

DevOps OpenClaw 是一个企业内部 OpenClaw 托管平台，使用 Vue 3 + TypeScript + Naive UI 构建。当前部署流程为：落地页点击"立即部署" → 直接进入创建流程（CreateModal），无身份验证环节。用户身份使用硬编码的 `mockUser` 对象，退出登录为 TODO 状态。

项目现有模态弹窗均使用 Naive UI `<n-modal>`，统一风格：480px 宽、24px 内边距、圆角 @radiusModal。认证模块从零开始建设。

## Goals / Non-Goals

**Goals:**
- 在"立即部署"流程前插入 OIDC 域账号登录环节
- 提供登录态管理（登录、token 存储、自动刷新、登出）
- 登录弹窗视觉与现有模态弹窗风格一致
- MSW mock 支持开发阶段无后端调试

**Non-Goals:**
- 不实现 OIDC 授权码流（authorization code flow）的重定向方式，仅使用 ROPC（Resource Owner Password Credentials）表单登录
- 不实现多因素认证（MFA）
- 不实现角色权限管理（RBAC），当前仅区分登录/未登录状态
- 不实现 admin 路由的登录守卫（后续变更处理）

## Decisions

### 1. 认证方式：OIDC ROPC 表单登录

选择 ROPC（Resource Owner Password Credentials）而非授权码重定向，因为：
- 用户场景是企业域账号（san.zhang / password），适合直接表单输入
- 弹窗内登录体验更好，无需页面跳转
- 后端 OIDC provider 支持 ROPC grant type

备选方案：授权码流 + 回调页面 → 体验断裂，用户需要离开当前页面。

### 2. Token 存储策略：localStorage + 内存双缓存

- `localStorage` 存储 `access_token`、`refresh_token`、`expires_at`，用于页面刷新后恢复登录态
- `auth store` 中维护内存状态（`user`、`isAuthenticated`），避免频繁读取 localStorage
- token 刷新：在 access_token 过期前 5 分钟自动刷新，刷新失败则清除登录态

### 3. 登录弹窗集成方式：App.vue 层级挂载

LoginModal 挂载在 App.vue 中（与 CreateModal、ProgressModal 同级），由 `useAuthStore` 的 `showLogin` 状态控制显隐。`handleStartDeploy` 方法改为先检查登录态，未登录则弹出登录框，登录成功后继续部署流程。

备选方案：路由守卫 → 当前 `/` 路由不在 vue-router 管理范围内，不适用。

### 4. Auth Store 设计：独立 store，不侵入 project store

新建 `useAuthStore`，职责单一：
- 状态：`user`、`isAuthenticated`、`showLogin`、`isLoading`
- 方法：`login(username, password)`、`logout()`、`checkAuth()`、`refreshToken()`
- 不修改 project store 的 modalState 类型

### 5. API 层封装

新建 `src/api/auth.ts`，封装：
- `login(username, password)` → POST `/api/auth/login`（OIDC ROPC）
- `refreshToken()` → POST `/api/auth/refresh`
- `logout()` → POST `/api/auth/logout`
- `getCurrentUser()` → GET `/api/auth/me`

所有后续 API 请求通过 axios 拦截器自动注入 Authorization header。

## Risks / Trade-offs

- **[ROPC 已被 OAuth 2.1 弃用]** → 企业内网场景下可接受，且后端 OIDC provider 仍支持。若未来 provider 禁用 ROPC，需迁移到授权码流。
- **[Token 存储在 localStorage 有 XSS 风险]** → 企业内部平台，XSS 风险可控。后续可升级为 httpOnly cookie 方案。
- **[Token 刷新竞态]** → 使用 refresh 标志位防止并发刷新请求。
