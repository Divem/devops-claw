## 1. 类型定义

- [x] 1.1 在 `src/types/admin.ts` 中新增 `GlobalConfig`、`GlobalConfigPublishRequest`、`ConfigPublishScope`、`ConfigPublishStrategy` 类型定义
- [x] 1.2 扩展 `Instance` 接口，新增 `globalConfigStatus` 和 `lastConfigSyncAt` 字段

## 2. Store 实现

- [x] 2.1 创建 `src/stores/globalConfig.ts`，实现 `useGlobalConfigStore`，包含 `fetchGlobalConfig`、`saveGlobalConfig`、`publishConfig` 方法及 mock 数据
- [x] 2.2 为 `useGlobalConfigStore` 编写单元测试 `tests/stores/globalConfig.test.ts`

## 3. 路由与导航

- [x] 3.1 在 `src/router/index.ts` 的 admin children 中新增 `global-config` 路由，指向全局配置页面组件
- [x] 3.2 在 `src/components/admin/AdminLayout.vue` 侧边栏 `menuItems` 中新增「全局配置」导航项（位于「实例管理」之后）

## 4. 全局配置页面

- [x] 4.1 创建 `src/views/admin/GlobalConfig.vue` 页面骨架，包含模型配置、Memory 配置、应用范围与发布策略三个区域
- [x] 4.2 实现模型配置表单区域：供应商选择、API Key（密码模式 + 掩码展示 + 更新按钮）、Base URL、默认模型、最大 Token、温度
- [x] 4.3 实现 Memory 配置表单区域：启用开关、策略选择、上下文上限、保留天数，关闭时禁用子字段
- [x] 4.4 实现应用范围配置：全部实例 / 仅运行中 / 仅已停止 / 指定实例，指定实例模式下支持搜索和多选
- [x] 4.5 实现生效策略选择：强制生效 / 条件生效（附 tooltip）/ 下次启动生效
- [x] 4.6 实现已停止实例自动降级警告提示
- [x] 4.7 实现发布确认弹框，显示策略、范围、影响数量
- [x] 4.8 为全局配置页面编写组件测试

## 5. 实例列表集成

- [x] 5.1 更新 `src/mocks/data.ts` 中实例 mock 数据，添加 `globalConfigStatus` 和 `lastConfigSyncAt` 字段
- [x] 5.2 在实例列表表格中新增「配置状态」列，展示 `synced` / `pending` / `outdated` 状态标识
