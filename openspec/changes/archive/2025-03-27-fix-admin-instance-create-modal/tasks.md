## 1. 更新类型与 Mock 数据

- [x] 1.1 在 `src/types/admin.ts` 的 `CreateInstanceRequest` 中新增 `avatarUrl: string`、`appId?: string`、`appSecret?: string` 字段
- [x] 1.2 更新 `src/mocks/adminData.ts` 的 `createInstance` 函数，接受 `avatarUrl / appId / appSecret`，`feishuStatus` 根据是否填写 appId 动态设置
- [x] 1.3 更新 `src/mocks/handlers.ts` 的 POST `/api/admin/instances` handler，使用新字段结构

## 2. 重写 InstanceCreateModal 表单视图

- [x] 2.1 将表单区块替换为：实例名称输入框（maxlength=30, show-count）
- [x] 2.2 新增「配置飞书渠道」区块：提示文案 + 应用 ID 输入框 + 应用密钥（password 类型）输入框，均选填
- [x] 2.3 新增头像选择网格（6列，复用 `avatarList`，默认选中第一个，点击切换选中状态及蓝色边框）
- [x] 2.4 底部改为全宽「创建」主色调按钮 + 「跳过机器人配置，先直接创建」跳过链接
- [x] 2.5 实现 `handleSkipAndCreate`：清空 appId/appSecret 后直接调用提交逻辑

## 3. 更新提交逻辑与 Store

- [x] 3.1 更新 `handleSubmit`，将 `avatarUrl / appId / appSecret` 一并传入 `adminStore.createInstance`
- [x] 3.2 更新 `startProgressPolling` 调用，根据是否填写 appId 传入 `hasAppId` 参数（恢复动态判断）

## 4. 样式对齐

- [x] 4.1 将 `<style>` 中的头像网格和选中状态样式与用户端 `CreateModal.vue` 保持一致（`.avatar-grid`、`.avatar-item`、`.avatar-item.selected`）
- [x] 4.2 飞书配置区块使用 `.form-label`（粗体）+ `.form-label-light`（普通）+ `.form-hint` 样式层次
