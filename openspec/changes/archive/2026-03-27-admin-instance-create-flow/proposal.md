## Why

当前管理员通过弹窗直接创建实例时，仅填写名称和选择用户后即完成，缺乏对创建过程的可见性，且无法在创建时配置飞书 AppID/AppSecret，导致实例创建后仍需手动到配置页完成机器人接入。参考用户端「一键创建 OpenClaw」的完整流程，管理员端也应提供带步骤进度的创建体验。

## What Changes

- 扩展现有管理员创建实例弹窗，增加 AppID / AppSecret 可选配置项
- 提交表单后，弹窗切换为步骤进度视图（参考用户端 ProgressModal），展示三阶段：启动云端电脑 → 安装 OpenClaw → 配置飞书连接
- 每步显示实时状态（pending / running / done / error）和耗时
- 全部步骤完成后显示成功摘要（实例名称、跳转链接）
- 后端 Mock 模拟轮询进度接口 `GET /api/admin/instances/:id/progress`

## Capabilities

### New Capabilities
- `admin-instance-create-flow`: 管理员创建实例的完整流程——表单填写 → 进度追踪 → 完成确认，对齐用户端体验，支持可选 AppID 配置

### Modified Capabilities
- `admin-instance-create`: 现有创建弹窗扩展：增加 AppID/AppSecret 输入项，提交后切换为进度视图而非直接关闭

## Impact

- **前端**：`InstanceCreateModal.vue` 重构，新增进度步骤视图（复用/参考 `ProgressModal` 样式）
- **类型**：`CreateInstanceRequest` 已有 `appId`，补充 `appSecret` 字段；新增 `InstanceCreateProgress` 类型
- **Mock**：`adminData.ts` 增加 `getInstanceCreateProgress` 函数；`handlers.ts` 增加 `GET /api/admin/instances/:id/progress` handler
- **Store**：`useAdminStore` 增加轮询进度逻辑
