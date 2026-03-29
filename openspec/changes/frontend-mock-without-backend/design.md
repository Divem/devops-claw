## Context

应用部署到 nginx 后通过 HTTP IP 访问，MSW Service Worker 因安全限制无法启动。当前所有业务 API 请求使用 `fetch('/api/...')` 发起，在无后端时全部失败。auth 模块已改造为纯前端验证，其余 20 处 fetch 调用仍依赖后端。

现有 mock 数据函数已完备，分布在：
- `src/mocks/data.ts`：项目 CRUD、进度、机器人配置、仪表盘数据
- `src/mocks/adminData.ts`：实例管理、审批、用户搜索、项目详情
- `src/mocks/imageData.ts`：镜像 CRUD

## Goals / Non-Goals

**Goals:**
- 所有 fetch API 调用替换为直接调用 mock 函数
- 员工端完整流程可用：创建项目 → 进度轮询 → 项目卡片 → 机器人配置 → Gateway 管理 → 删除
- 管理后台完整功能可用：仪表盘、实例管理、审批、镜像管理、用户搜索、趋势图
- 构建通过，无 TS 类型错误

**Non-Goals:**
- 不改造 MSW 相关代码（handlers.ts、browser.ts）
- 不删除 `src/api/` 目录（auth 已改完，client.ts 暂保留）
- 不清理 mockServiceWorker.js 构建产物
- 不新增 mock 数据或修改现有 mock 函数逻辑

## Decisions

### D1: 直接调用 mock 函数而非拦截 fetch

**选择**：将 `fetch('/api/...')` 替换为直接 import 和调用 `src/mocks/*.ts` 中的函数。

**替代方案**：
- A) 自定义 fetch 拦截层（mock fetch polyfill）— 增加复杂度，且需维护 URL 到函数的映射
- B) 启用 MSW 生产模式 — 受限于 HTTPS，HTTP 环境不可用

**理由**：最简单直接，无额外抽象层，mock 函数已实现完整的业务逻辑和状态管理。

### D2: 模拟网络延迟

**选择**：在 store 和组件中直接同步调用 mock 函数，不添加延迟。

**理由**：dev 环境 MSW 已有 delay，生产环境追求响应速度，用户无需等待。如需演示延迟效果可后续按需添加。

### D3: mock 函数返回值适配

**选择**：在调用处将 mock 函数的返回值适配为原 fetch response 解析后的数据格式（`.json()` 已返回的对象）。

**理由**：mock 函数返回的就是 `JSON.parse` 后的对象，无需包装 Response 对象，直接使用即可。

## Risks / Trade-offs

- **[Risk] 后端上线时需要改回 fetch 调用** → 所有改动集中在各文件顶部 import 和函数调用处，后续替换回 fetch 路径清晰
- **[Risk] mock 数据在页面刷新后重置** → 与 MSW dev 模式行为一致，可接受
- **[Trade-off] 去掉了网络错误处理逻辑** → mock 函数不会抛异常，try/catch 保留但不会触发，不影响用户体验
