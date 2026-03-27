## Why

当前部署流程点击"立即部署"后直接进入创建流程，无任何身份验证。在企业环境中，部署操作需要鉴权，确保只有经过域账号认证的用户才能创建和部署 OpenClaw 实例。需要在部署前增加 OIDC 域账号登录环节。

## What Changes

- 新增 OIDC 登录弹窗组件，在用户点击"立即部署"后弹出
- 弹窗包含用户名/密码表单，提示"使用域账号登录"，账号格式（不要后缀） `san.zhang`
- 新增 auth store 管理登录状态和 token
- 新增 OIDC 认证 API 对接（登录、token 刷新、登出）
- 部署流程前插入登录检查：未登录 → 弹出登录框 → 登录成功 → 进入创建流程
- 登录态持久化（localStorage + token 自动刷新）
- 退出登录功能实现

## Capabilities

### New Capabilities
- `oidc-login`: OIDC 域账号登录弹窗，包含登录表单、认证流程和会话管理

### Modified Capabilities

## Impact

- `src/App.vue`: 部署流程入口需插入登录检查
- `src/components/landing/HeroSection.vue`: "立即部署"点击行为不变，登录检查在父级处理
- `src/components/UserDropdown.vue`: 退出登录从 TODO 变为实际实现
- `src/stores/`: 新增 auth store
- `src/types/`: 新增 auth 相关类型定义
- `src/mocks/`: 新增登录相关 mock 数据和 handler
- 新增 `src/components/LoginModal.vue`
- 新增 `src/api/auth.ts` 认证 API
- 依赖 Naive UI `<n-modal>`, `<n-input>`, `<n-button>` 组件
