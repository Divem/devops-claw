## Why

当前实例管理的"更多"下拉菜单仅提供重启、配置、强制删除三个操作，缺少运维常用的高级管理功能。同时现有的"重启"操作语义模糊（实际是重启实例服务），需明确区分"重启 Gateway"和"重启电脑"两种不同级别的重启操作。增加修复配置和恢复初始设置能力，可以提升管理员的运维效率和故障恢复能力。

## What Changes

- **BREAKING** 将现有"重启"操作更名为"重启电脑"，明确其语义为重启实例所在的虚拟机
- 在"更多"下拉菜单中新增三项操作：重启 Gateway、修复 DevOps Claw 配置、恢复初始设置
- 为每项新增操作创建对应的确认弹窗组件
- 扩展 `InstanceAction` 类型以支持新增的操作类型
- 更新 Mock 层以支持新增操作的模拟行为

## Capabilities

### New Capabilities
- `instance-advanced-actions`: 实例高级操作能力，涵盖重启 Gateway、修复配置、恢复初始设置三个新操作及其确认弹窗

### Modified Capabilities
- `admin-instance-management`: 修改"重启"操作的语义为"重启电脑"，扩展操作菜单和 InstanceAction 类型

## Impact

- **类型定义**: `src/types/admin.ts` — 扩展 `InstanceAction` 联合类型
- **组件**: `src/components/admin/InstanceTable.vue` — 更新下拉菜单选项
- **组件**: 新增 3 个确认弹窗组件（RestartGatewayConfirmModal、RepairConfigConfirmModal、ResetInstanceConfirmModal）
- **页面**: `src/views/admin/InstanceList.vue` — 集成新弹窗和操作处理逻辑
- **Store**: `src/stores/admin.ts` — 操作分发逻辑适配
- **Mock**: `src/mocks/adminData.ts`、`src/mocks/handlers.ts` — 新增操作模拟
