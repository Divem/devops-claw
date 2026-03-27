## Why

当前实例管理页面的重启功能没有二次确认，用户可能误点击导致实例意外重启，影响业务连续性。添加二次确认弹框可以显著降低误操作风险，提升用户体验和系统安全性。

## What Changes

- 新增 `RestartConfirmModal.vue` 重启二次确认弹框组件
- 新增 `StopConfirmModal.vue` 停止二次确认弹框组件
- 新增 `DeleteInstanceConfirmModal.vue` 强制删除二次确认弹框组件（带名称验证）
- 在 `InstanceList.vue` 中集成确认弹框逻辑
- 用户点击"重启"、"停止"或"强制删除"后显示确认弹框
- 强制删除需输入实例名称验证一致后才能执行
- 用户确认后才执行实际操作

## Capabilities

### New Capabilities
- `restart-confirmation-modal`: 重启二次确认弹框，支持显示实例信息、确认/取消操作
- `stop-confirmation-modal`: 停止二次确认弹框，支持显示实例信息、确认/取消操作
- `delete-instance-confirmation-modal`: 强制删除二次确认弹框，支持名称输入验证

### Modified Capabilities
- `instance-management`: 重启、停止、删除操作流增加确认步骤，不修改原有 API 行为

## Impact

- **UI**: `src/components/admin/` 新增确认弹框组件
- **Admin**: `InstanceList.vue` 调整操作事件处理逻辑
- **API**: 无影响，保持现有实例操作 API 不变
- **依赖**: 使用 naive-ui 的 Modal、Button、Input 组件
