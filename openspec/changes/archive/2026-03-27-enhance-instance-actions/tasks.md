## 1. 类型定义扩展

- [x] 1.1 在 `src/types/admin.ts` 中扩展 `InstanceAction` 类型，新增 `'restart-gateway' | 'repair-config' | 'reset-instance'`

## 2. 确认弹窗组件

- [x] 2.1 创建 `src/components/admin/RestartGatewayConfirmModal.vue` — 重启 Gateway 确认弹窗（warning 级别，简单确认）
- [x] 2.2 创建 `src/components/admin/RepairConfigConfirmModal.vue` — 修复配置确认弹窗（warning 级别，简单确认）
- [x] 2.3 创建 `src/components/admin/ResetInstanceConfirmModal.vue` — 恢复初始设置确认弹窗（error 级别，需输入实例名称确认，遮罩不可关闭）

## 3. 操作菜单更新

- [x] 3.1 修改 `src/components/admin/InstanceTable.vue` — 更新 NDropdown options：将"重启"改为"重启电脑"，新增"重启 Gateway""修复配置""恢复初始设置"，按风险等级排序
- [x] 3.2 修改 `src/components/admin/RestartConfirmModal.vue` — 弹窗标题从"重启实例？"改为"重启电脑？"

## 4. 页面集成

- [x] 4.1 修改 `src/views/admin/InstanceList.vue` — import 三个新弹窗组件，添加 show/pending 状态和确认/取消处理函数，集成到模板中

## 5. Mock 数据层

- [x] 5.1 修改 `src/mocks/adminData.ts` — 在 `executeInstanceAction` 的 switch 中新增 `restart-gateway`、`repair-config`、`reset-instance` 分支
- [x] 5.2 验证所有新增操作在 Mock 环境下可正常触发和执行
