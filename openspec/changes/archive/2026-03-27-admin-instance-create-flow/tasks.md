## 1. 类型与 Mock 数据

- [x] 1.1 在 `src/types/admin.ts` 的 `CreateInstanceRequest` 增加 `appSecret?: string` 字段
- [x] 1.2 在 `src/types/admin.ts` 新增 `InstanceCreateProgress` 类型（含 `steps`, `done` 字段）
- [x] 1.3 在 `src/mocks/adminData.ts` 增加 `getInstanceCreateProgress(id, hasAppId)` 函数，模拟轮询推进三步骤
- [x] 1.4 在 `src/mocks/handlers.ts` 增加 `GET /api/admin/instances/:id/progress` handler

## 2. Store 更新

- [x] 2.1 在 `src/stores/admin.ts` 新增 `createProgress` 状态（steps 数组 + done 标志）
- [x] 2.2 实现 `startProgressPolling(id, hasAppId)` 方法：每 1.5 秒轮询一次，收到 done 后停止
- [x] 2.3 实现 `stopProgressPolling()` 方法：清除轮询定时器
- [x] 2.4 更新 `createInstance` 方法：成功后返回新实例 id，供调用方启动轮询

## 3. 创建弹窗重构

- [x] 3.1 在 `InstanceCreateModal.vue` 表单中增加「飞书 AppID」和「飞书 AppSecret」可选输入（带密文切换）
- [x] 3.2 新增 `view` 状态（`form` | `progress` | `success`），控制弹窗内容切换
- [x] 3.3 实现进度视图：复用 `StepInfo` 类型，展示三步骤状态（参考 `ProgressModal.vue` 样式）
- [x] 3.4 进度视图中：running 步骤显示旋转动画，done 显示 ✓，error 显示 ✕，并显示耗时秒数
- [x] 3.5 实现成功视图：✓ 图标 + 实例名称 + 「查看实例」按钮，点击后关闭弹窗并刷新列表
- [x] 3.6 表单提交成功后：调用 `startProgressPolling`，切换到进度视图
- [x] 3.7 进度中 `mask-closable="false"`，禁止点击遮罩关闭
- [x] 3.8 错误状态显示「重试」按钮，点击后重置到表单视图（保留已填内容）

## 4. 「配置飞书连接」步骤的跳过逻辑

- [x] 4.1 Mock 进度函数中：若 `hasAppId=true`，飞书步骤正常完成；否则在第 3 步标记为 done 并附带「待配置」提示文字
- [x] 4.2 成功视图中：若飞书步骤为「待配置」，显示额外提示「飞书连接待配置，可在实例详情中完成」

## 5. 测试

- [x] 5.1 为 `getInstanceCreateProgress` Mock 函数编写单元测试（验证步骤推进逻辑）
- [x] 5.2 为 `startProgressPolling` store 方法编写测试（验证轮询和 done 停止）
- [x] 5.3 为 `InstanceCreateModal` 编写组件测试：验证表单 → 进度 → 成功三个视图切换
- [x] 5.4 运行所有测试确保通过
