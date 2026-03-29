## 1. LoginModal 组件改造

- [x] 1.1 添加 `emit('close')` 事件定义和关闭按钮模板
- [x] 1.2 将 `mask-closable` 改为 `true`，添加 `@close` 处理重置表单状态

## 2. 父组件适配

- [x] 2.1 在 `App.vue` 中为 `LoginModal` 添加 `@close` 事件处理

## 3. 构建验证

- [x] 3.1 执行生产构建: `VITE_ENABLE_MOCK=true npx vite build`
