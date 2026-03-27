## 1. 员工端 — App.vue

- [x] 1.1 替换 `onMounted` 中 `GET /api/project` 为 `getProject()` 调用
- [x] 1.2 替换 `handleCreate` 中 `POST /api/project` 为 `createProject()` 调用
- [x] 1.3 替换 `pollProgress` 中 `GET /api/project/:id/progress` 为 `getProgress()` 调用
- [x] 1.4 替换进度完成后 `GET /api/project` 为 `getProject()` 调用
- [x] 1.5 替换 `handleDelete` 中 `DELETE /api/project/:id` 为 `deleteProject()` 调用

## 2. 员工端 — stores/project.ts

- [x] 2.1 替换 `updateBotConfig` 中 `PUT /api/project/:id/bot-config` 为 `updateBotConfig()` 调用

## 3. 员工端 — OpenClawAdmin.vue

- [x] 3.1 替换 Gateway 健康检查 `HEAD /api/projects/:id/gateway/health` 为直接标记可用
- [x] 3.2 替换 `fetchProjectConfig` 中 `GET /api/projects/:id/config` 为直接设置 mock 配置

## 4. 管理后台 — stores/admin.ts

- [x] 4.1 替换 `fetchInstances` 中 fetch 为 `getInstances()` 调用
- [x] 4.2 替换 `fetchInstanceDetail` 中 fetch 为 `getInstanceDetail()` 调用
- [x] 4.3 替换 `executeAction` 中 fetch 为 `executeInstanceAction()` 调用
- [x] 4.4 替换 `createInstance` 中 fetch 为 `createInstance()` 调用
- [x] 4.5 替换 `startProgressPolling` 中 fetch 为 `getInstanceCreateProgress()` 调用
- [x] 4.6 替换 `fetchApprovals` 中 fetch 为 `getApprovals()` 调用
- [x] 4.7 替换 `approveInstance` 中 fetch 为 `approveApproval()` 调用

## 5. 管理后台 — stores/image.ts

- [x] 5.1 替换 `fetchImages` 中 fetch 为 `getImages()` 调用
- [x] 5.2 替换 `createImage` 中 fetch 为 `createImage()` 调用
- [x] 5.3 替换 `updateImage` 中 fetch 为 `updateImage()` 调用
- [x] 5.4 替换 `deleteImage` 中 fetch 为 `deleteImage()` 调用

## 6. 管理后台 — stores/trend.ts

- [x] 6.1 替换 `fetchTrendData` 中 fetch 为 `getDashboardData()` 调用

## 7. 管理后台 — 视图组件

- [x] 7.1 替换 `AdminDashboard.vue` 中 `fetchDashboardData` 的 fetch 为 `getDashboardData()` 调用
- [x] 7.2 替换 `ProjectAdmin.vue` 中 `fetch` 为 `getProjectById()` 调用
- [x] 7.3 替换 `UserSelect.vue` 中 fetch 为 `searchUsers()` 调用

## 8. 验证

- [x] 8.1 运行 `npm run build` 确认无 TS 类型错误
- [x] 8.2 清理不再使用的 `apiFetch` import（如 App.vue）
