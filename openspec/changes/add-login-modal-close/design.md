## Context

当前 `LoginModal.vue` 使用 Naive UI 的 `NModal` 组件，设置了 `mask-closable="false"`，且模板中没有关闭按钮。`show` 属性由父组件通过 `authStore.showLogin` 控制，组件内部没有 `emit('close')` 的能力。

## Goals / Non-Goals

**Goals:**
- 为登录弹窗添加关闭按钮和遮罩关闭能力
- 关闭时通过 `emit` 通知父组件，由父组件设置 `authStore.showLogin = false`

**Non-Goals:**
- 不改变认证逻辑
- 不添加"记住我"或"忘记密码"等功能

## Decisions

### 关闭方式

同时支持两种关闭方式：
1. **右上角关闭按钮** — 使用 `NButton quaternary circle size="small"` 渲染 ✕ 图标
2. **点击遮罩关闭** — `mask-closable` 改为 `true`

**理由**: 两种方式覆盖了不同用户的操作习惯，且实现成本低。

### 事件通信

通过 `emit('close')` 通知父组件，父组件在 `@close` 处理中设置 `authStore.showLogin = false`。不直接在组件内修改 store，遵循 Vue 单向数据流。

## Risks / Trade-offs

- **[风险] 用户误触遮罩关闭登录弹窗** → **缓解**: 在需要强制登录的场景中（如访问受保护资源），可后续通过 prop 控制是否允许关闭
