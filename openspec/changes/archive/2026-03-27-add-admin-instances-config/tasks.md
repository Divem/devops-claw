## 1. InstanceTable 组件修改

- [x] 1.1 在 `InstanceTable.vue` 的 `defineEmits` 中添加 `config` 事件定义
- [x] 1.2 在表格操作列的 render 函数中添加「配置」按钮
- [x] 1.3 实现配置按钮点击时 emit `config` 事件并传递 `row.projectId`
- [x] 1.4 添加条件渲染：仅在 `row.projectId` 存在时显示配置按钮

## 2. InstanceList 视图修改

- [x] 2.1 在 `InstanceList.vue` 中导入 `useRouter` from 'vue-router'
- [x] 2.2 创建 `handleConfig` 函数处理配置按钮点击，执行路由跳转
- [x] 2.3 在 `InstanceTable` 组件上绑定 `@config` 事件到 `handleConfig` 处理函数

## 3. 类型定义检查

- [x] 3.1 确认 `Instance` 类型已包含 `projectId?: string` 字段
- [x] 3.2 如有缺失，在 `src/types/admin.ts` 中添加 `projectId` 字段定义

## 4. 测试验证

- [x] 4.1 运行 `npm run build` 确保 TypeScript 编译通过
- [x] 4.2 运行 `npx vitest run` 确保现有测试通过
- [ ] 4.3 手动验证：访问实例管理页面，确认配置按钮显示
- [ ] 4.4 手动验证：点击配置按钮，确认正确跳转到 `/projects/{id}/admin`
- [ ] 4.5 手动验证：无 projectId 的实例行不显示配置按钮
