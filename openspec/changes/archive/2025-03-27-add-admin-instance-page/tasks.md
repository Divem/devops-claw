## 1. 重构 InstanceCreateModal 弹框样式与字段

- [x] 1.1 将 `InstanceCreateModal.vue` 的弹框外壳从 `n-modal preset="card"` 改为参考用户端 `CreateModal.vue` 的自定义 modal 布局（含 header/body/footer 分区、圆角卡片、关闭按钮）
- [x] 1.2 去掉「目标用户」字段（UserSelect + ownerId），同步移除对应的表单校验规则
- [x] 1.3 去掉「飞书 AppID / AppSecret」字段（简化表单，只保留实例名称必填 + 描述选填）
- [x] 1.4 新增「描述」输入框（选填），使用 `n-input type="textarea"` 并限制 200 字
- [x] 1.5 更新提交逻辑：`handleSubmit` 只传 `{ name, description }` 给 store

## 2. 更新 AdminStore createInstance 方法

- [x] 2.1 调整 `useAdminStore` 中 `createInstance` 方法的参数类型，去掉 `ownerId / appId / appSecret`，接受 `{ name: string; description?: string }`
- [x] 2.2 更新 MSW mock handler（`/api/admin/instances` POST），使其接受新的字段结构并返回含初始化中状态的新实例

## 3. 验收

- [x] 3.1 打开管理端 `/admin/instances` 页面，确认「创建实例」按钮存在
- [x] 3.2 点击「创建实例」，弹框样式与用户端创建弹框视觉风格一致（字体、间距、圆角、主色调）
- [x] 3.3 弹框中不含用户选择字段，只含实例名称（必填）和描述（选填）
- [x] 3.4 填写名称后点击「创建」，新实例以「初始化中」状态出现在列表顶部
- [x] 3.5 不填名称直接提交，显示校验提示，弹框保持打开
