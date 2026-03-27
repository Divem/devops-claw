## 1. 类型定义与 API 接口

- [x] 1.1 在 `src/types/admin.ts` 添加创建实例请求类型 `CreateInstanceRequest`
- [x] 1.2 在 MSW mock 中添加 `POST /api/admin/instances` 处理程序
- [x] 1.3 在 `src/stores/admin.ts` 添加 `createInstance` 方法

## 2. 用户选择器组件

- [x] 2.1 创建 `src/components/admin/UserSelect.vue` 用户选择器组件
- [x] 2.2 实现用户搜索接口调用（`GET /api/users/search?q=keyword`）
- [x] 2.3 添加用户列表展示（头像+名称+部门）

## 3. 实例创建弹窗

- [x] 3.1 创建 `src/components/admin/InstanceCreateModal.vue` 组件
- [x] 3.2 实现表单布局（实例名称输入、用户选择器）
- [x] 3.3 添加表单验证（名称长度、必填项）
- [x] 3.4 集成 `useAdminStore.createInstance` 方法
- [x] 3.5 添加加载状态和错误处理

## 4. 实例列表页面集成

- [x] 4.1 在 `InstanceList.vue` 工具栏添加「创建实例」按钮
- [x] 4.2 集成 `InstanceCreateModal` 组件
- [x] 4.3 实现创建成功后的列表刷新

## 5. 测试

- [x] 5.1 为 `UserSelect` 组件编写单元测试
- [x] 5.2 为 `InstanceCreateModal` 组件编写单元测试
- [x] 5.3 为 `createInstance` store 方法编写测试
- [x] 5.4 运行所有测试确保通过
