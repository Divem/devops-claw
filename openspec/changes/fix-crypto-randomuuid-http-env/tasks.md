## 1. 实现兼容的 UUID 生成函数

- [x] 1.1 在 `src/mocks/data.ts` 中添加 `generateProjectId()` 辅助函数
- [x] 1.2 将 `createProject()` 中的 `crypto.randomUUID()` 替换为 `generateProjectId()`

## 2. 验证与构建

- [x] 2.1 本地开发环境验证创建项目功能正常
- [x] 2.2 执行生产构建: `VITE_ENABLE_MOCK=true npx vite build`
- [ ] 2.3 部署到 nginx HTTP 环境验证项目创建和显示
