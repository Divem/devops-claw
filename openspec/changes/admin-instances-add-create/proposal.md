## Why

当前管理员只能通过审批流程来创建 OpenClaw 实例，对于需要快速为指定人员或领导配置实例的场景效率较低。管理员需要一个直接创建实例的功能，无需经过审批流程即可快速部署。

## What Changes

- 在实例管理页面（/admin/instances）添加「创建实例」按钮
- 实现实例创建弹窗，支持填写实例名称、选择目标用户（员工/领导）
- 添加 `POST /api/admin/instances` 接口用于管理员直接创建实例
- 创建成功后自动刷新实例列表并显示成功提示

## Capabilities

### New Capabilities
- `admin-instance-create`: 管理员直接创建 OpenClaw 实例功能，支持选择目标用户和配置实例参数

### Modified Capabilities
- 无（仅新增功能，不涉及现有功能的需求变更）

## Impact

- **前端**: `InstanceList.vue` 添加创建按钮，新建 `InstanceCreateModal.vue` 组件
- **后端**: 新增 `POST /api/admin/instances` API 端点
- **状态管理**: `useAdminStore` 添加 `createInstance` 方法
- **类型定义**: 可能需要新增创建请求的类型定义
