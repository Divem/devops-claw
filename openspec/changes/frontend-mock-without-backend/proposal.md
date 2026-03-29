## Why

当前部署到 nginx 后，所有 API 请求（`/api/...`）因无后端服务全部失败。虽然 MSW 在开发模式下能拦截请求，但非 HTTPS 环境下 Service Worker 无法启动，导致只有登录页面外的大部分功能不可用。需要将所有 `fetch('/api/...')` 调用改为直接调用已有的 mock 数据函数，使应用在无后端的情况下完整可用。

## What Changes

- 将员工端核心流程（获取项目、创建项目、进度轮询、删除项目、机器人配置）的 fetch 调用替换为直接调用 `src/mocks/data.ts` 中的函数
- 将管理后台所有 store（admin、image、trend）的 fetch 调用替换为直接调用 `src/mocks/adminData.ts` 和 `src/mocks/imageData.ts` 中的函数
- 将视图组件（AdminDashboard、ProjectAdmin、OpenClawAdmin、UserSelect）中的 fetch 调用替换为 mock 函数调用
- auth 模块已完成改造，本次不涉及

## Capabilities

### New Capabilities

- `frontend-mock-api`: 将所有后端 API fetch 调用替换为前端 mock 函数直接调用，使应用无需后端即可完整运行

### Modified Capabilities

（无现有 spec 需求变更）

## Impact

- **代码变更**：8 个文件、约 20 处 fetch 调用需要替换
  - `src/App.vue`（4 处）
  - `src/stores/project.ts`（1 处）
  - `src/stores/admin.ts`（6 处）
  - `src/stores/image.ts`（4 处）
  - `src/stores/trend.ts`（1 处）
  - `src/views/admin/AdminDashboard.vue`（1 处）
  - `src/views/ProjectAdmin.vue`（1 处）
  - `src/components/OpenClawAdmin.vue`（2 处）
  - `src/components/admin/UserSelect.vue`（1 处）
- **依赖**：无新增依赖，使用已有的 `src/mocks/` 目录下的 mock 函数
- **API 层**：`src/api/client.ts` 和 `src/api/auth.ts` 不再被业务代码调用（auth 已改完），可后续清理
- **MSW**：构建产物中的 MSW service worker 文件（`mockServiceWorker.js`）不再需要，但暂不删除以保持兼容
