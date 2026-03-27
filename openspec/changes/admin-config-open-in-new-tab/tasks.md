## 1. 修改配置按钮行为

- [x] 1.1 修改 `src/views/admin/InstanceList.vue` 中的 `handleConfig` 函数
- [x] 1.2 使用 `window.open('/projects/' + projectId + '/admin', '_blank')` 替代 `router.push`
- [x] 1.3 确保在点击事件处理程序中调用，避免被浏览器阻止

## 2. 添加根级路由

- [x] 2.1 在 `src/router/index.ts` 中添加根级路由 `/projects/:id/admin`
- [x] 2.2 创建 `src/views/ProjectAdmin.vue` 组件作为独立配置页面
- [x] 2.3 在 `ProjectAdmin.vue` 中复用 `OpenClawAdmin` 组件
- [x] 2.4 实现 `goBack` 函数：优先关闭窗口，否则路由跳转

## 3. 调整返回按钮行为

- [x] 3.1 在新配置页面组件中检查 `window.opener` 是否存在
- [x] 3.2 如果存在，调用 `window.close()` 并 `window.opener.focus()`
- [x] 3.3 如果不存在，使用 `router.push('/admin/instances')` 导航

## 4. 清理旧代码（可选）

- [x] 4.1 从 `src/router/index.ts` 中移除 `/admin/projects/:id` 子路由
- [x] 4.2 可选择性删除 `src/views/admin/AdminProjectView.vue` 文件

## 5. 测试验证

- [x] 5.1 运行 `npm run build` 确保 TypeScript 编译通过
- [ ] 5.2 点击配置按钮，验证新标签页正确打开
- [ ] 5.3 验证配置页面功能正常（控制台、代码模式、终端）
- [ ] 5.4 测试返回按钮，验证标签页关闭和聚焦行为
- [ ] 5.5 测试直接访问 URL，验证独立访问功能
