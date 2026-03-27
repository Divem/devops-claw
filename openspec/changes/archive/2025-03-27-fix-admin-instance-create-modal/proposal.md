## Why

上一次变更将管理端「创建实例」弹框简化为仅含实例名称和描述字段，但用户实际期望的是与用户端「创建 OpenClaw 项目」完全对齐的流程：含 App ID / App Secret（选填）+ 头像选择 + 全宽创建按钮 + 跳过链接，同时不含用户选择字段。

## What Changes

- **BREAKING** 将管理端 `InstanceCreateModal.vue` 的表单字段从「名称 + 描述」恢复为与用户端一致的「实例名称 + App ID + App Secret + 头像选择网格」
- 移除描述输入框，恢复飞书渠道配置区块（App ID / App Secret，选填）
- 恢复头像选择网格（复用 `avatarList` Mock 数据，12 个彩色头像）
- 底部按钮改为全宽主色调「创建」按钮 + 「跳过机器人配置，先直接创建」跳过链接
- 更新 `CreateInstanceRequest` 类型，新增 `avatarUrl / appId / appSecret` 字段
- 更新 MSW handler / adminData 以支持新字段

## Capabilities

### New Capabilities

### Modified Capabilities
- `admin-instance-management`: 创建实例弹框的字段和交互逻辑需与用户端对齐

## Impact

- `src/components/admin/InstanceCreateModal.vue` — 全量重写表单区块
- `src/types/admin.ts` — `CreateInstanceRequest` 新增字段
- `src/mocks/adminData.ts` + `src/mocks/handlers.ts` — 支持新字段
- `src/stores/admin.ts` — `createInstance` 调用侧参数更新
