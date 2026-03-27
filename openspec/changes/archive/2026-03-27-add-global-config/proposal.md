## Why

平台目前有 50+ 台云端电脑实例运行 OpenClaw，但管理员无法统一配置模型参数（供应商、API Key、模型选择）和 Memory 策略。这些配置目前散落在各实例内部，修改需要逐台操作，效率低且容易不一致。需要一个全局配置功能，让平台管理员在管理后台集中管理并批量下发配置。

## What Changes

- 新增管理后台「全局配置」页面（`/admin/global-config`），在侧边栏导航中新增入口
- 支持配置模型信息：供应商、API Key（加密存储）、Base URL、默认模型、最大 Token、温度
- 支持 Memory 配置：启用开关、策略（滚动窗口 / 摘要 / 混合）、上下文上限、保留天数
- 支持三种生效策略：强制生效（立即覆盖）、条件生效（仅无本地覆盖时生效）、下次启动生效
- 支持应用范围选择：全部实例、仅运行中、仅已停止、手动勾选指定实例
- 已停止实例在「立即生效」模式下自动降级为「下次启动生效」并显示警告
- 新增全局配置 Store（`useGlobalConfigStore`）和相关类型定义
- Instance 类型扩展 `globalConfigStatus` 和 `lastConfigSyncAt` 字段
- 全局配置与现有项目级 `openclaw.json` 配置完全独立，互不干扰

## Capabilities

### New Capabilities
- `global-config`: 全局配置的表单编辑、保存与发布，包括模型配置和 Memory 配置
- `config-publish`: 配置发布机制，包含生效策略（强制/条件/下次启动）和应用范围（全部/筛选/指定）
- `global-config-store`: 全局配置的 Pinia store，管理配置状态、保存、发布和实例同步状态

### Modified Capabilities
- `admin-layout`: 侧边栏导航新增「全局配置」菜单入口
- `admin-instance-management`: Instance 类型扩展 globalConfigStatus 和 lastConfigSyncAt 字段，实例列表展示配置同步状态

## Impact

- **前端路由**: 新增 `/admin/global-config` 路由
- **Stores**: 新增 `src/stores/globalConfig.ts`，修改 `src/types/admin.ts`
- **组件**: 新增全局配置页面及相关子组件，修改 `AdminLayout.vue` 侧边栏
- **API**: 后端需新增全局配置 CRUD 接口和发布接口（当前阶段前端用 mock）
- **与现有功能独立**: 不影响 `useConfigStore` 和 `ConfigCodeMode.vue`（项目级配置）
