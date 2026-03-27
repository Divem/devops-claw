## 1. 组件开发

### 重启确认弹框
- [x] 1.1 创建 `RestartConfirmModal.vue` 组件文件
- [x] 1.2 实现 Props 接口：`show`, `instanceName`
- [x] 1.3 实现 Emits：`confirm`, `cancel`
- [x] 1.4 使用 `NModal` 和 `NButton` 搭建弹框结构
- [x] 1.5 添加警告图标和确认文案
- [x] 1.6 实现实例名称截断显示（超过20字符加省略号）
- [x] 1.7 添加 Less 样式，与 `DeleteConfirm.vue` 风格统一
- [x] 1.8 支持点击遮罩关闭弹框

### 停止确认弹框
- [x] 1.9 创建 `StopConfirmModal.vue` 组件文件
- [x] 1.10 实现 Props 接口：`show`, `instanceName`
- [x] 1.11 实现 Emits：`confirm`, `cancel`
- [x] 1.12 使用 `NModal` 和 `NButton` 搭建弹框结构
- [x] 1.13 添加警告图标和确认文案
- [x] 1.14 实现实例名称截断显示
- [x] 1.15 添加 Less 样式

### 删除确认弹框（带输入验证）
- [x] 1.16 创建 `DeleteInstanceConfirmModal.vue` 组件文件
- [x] 1.17 实现 Props 接口：`show`, `instanceName`
- [x] 1.18 实现 Emits：`confirm`, `cancel`
- [x] 1.19 使用 `NModal`、`NButton`、`NInput` 搭建弹框结构
- [x] 1.20 添加输入框要求用户输入实例名称
- [x] 1.21 实现输入验证逻辑（输入与实例名称一致才启用删除按钮）
- [x] 1.22 弹框显示时自动清空输入框
- [x] 1.23 支持回车键确认删除
- [x] 1.24 添加 Less 样式

## 2. 管理端集成

### 重启确认
- [x] 2.1 在 `InstanceList.vue` 中导入 `RestartConfirmModal`
- [x] 2.2 添加 `showRestartModal` 响应式状态
- [x] 2.3 添加 `pendingRestartInstance` 状态存储待重启实例
- [x] 2.4 修改 `handleAction` 处理函数，拦截 `restart` 操作
- [x] 2.5 点击「重启」时设置待重启实例并显示弹框
- [x] 2.6 处理弹框 `confirm` 事件，调用现有重启逻辑
- [x] 2.7 处理弹框 `cancel` 事件，清空待重启实例

### 停止确认
- [x] 2.8 在 `InstanceList.vue` 中导入 `StopConfirmModal`
- [x] 2.9 添加 `showStopModal` 响应式状态
- [x] 2.10 添加 `pendingStopInstance` 状态存储待停止实例
- [x] 2.11 修改 `handleAction` 处理函数，拦截 `stop` 操作
- [x] 2.12 点击「停止」时设置待停止实例并显示弹框
- [x] 2.13 处理弹框 `confirm` 事件，调用现有停止逻辑
- [x] 2.14 处理弹框 `cancel` 事件，清空待停止实例

### 删除确认
- [x] 2.15 在 `InstanceList.vue` 中导入 `DeleteInstanceConfirmModal`
- [x] 2.16 添加 `showDeleteModal` 响应式状态
- [x] 2.17 添加 `pendingDeleteInstance` 状态存储待删除实例
- [x] 2.18 修改 `handleAction` 处理函数，拦截 `delete` 操作
- [x] 2.19 点击「强制删除」时设置待删除实例并显示弹框
- [x] 2.20 处理弹框 `confirm` 事件，调用现有删除逻辑
- [x] 2.21 处理弹框 `cancel` 事件，清空待删除实例

## 3. 测试验证

### 重启确认
- [x] 3.1 验证重启弹框正确显示实例名称
- [x] 3.2 验证「确认重启」执行重启操作
- [x] 3.3 验证重启「取消」不执行操作
- [x] 3.4 验证重启弹框点击遮罩关闭且不执行操作

### 停止确认
- [x] 3.5 验证停止弹框正确显示实例名称
- [x] 3.6 验证「确认停止」执行停止操作
- [x] 3.7 验证停止「取消」不执行操作
- [x] 3.8 验证停止弹框点击遮罩关闭且不执行操作

### 删除确认
- [x] 3.9 验证删除弹框正确显示实例名称
- [x] 3.10 验证输入框提示信息正确显示
- [x] 3.11 验证输入错误名称时删除按钮禁用
- [x] 3.12 验证输入正确名称时删除按钮启用
- [x] 3.13 验证「确认删除」执行删除操作
- [x] 3.14 验证「取消」不执行删除操作
- [x] 3.15 验证弹框关闭后输入框自动清空
- [x] 3.16 验证回车键触发删除（当输入正确时）

### 通用验证
- [x] 3.17 验证长实例名称正确截断显示
- [x] 3.18 验证三个弹框样式一致
- [x] 3.19 验证启动操作不受影响（无需确认）

## 4. 代码审查

- [x] 4.1 检查 Props/Emits 类型定义
- [x] 4.2 检查样式变量与全局主题一致
- [x] 4.3 检查未使用的导入和变量
- [x] 4.4 运行 `npm run build` 确认无类型错误
