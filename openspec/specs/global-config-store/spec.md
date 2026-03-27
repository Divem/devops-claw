## ADDED Requirements

### Requirement: 全局配置 Store 管理配置状态
系统 SHALL 提供 `useGlobalConfigStore` 管理全局配置的加载、编辑和保存状态。

#### Scenario: 初始化加载配置
- **WHEN** 全局配置页面挂载
- **THEN** Store SHALL 调用 `fetchGlobalConfig` 获取当前全局配置
- **AND** 加载期间 `isLoading` SHALL 为 `true`
- **AND** 加载完成后表单 SHALL 填充返回的配置数据

#### Scenario: 保存配置
- **WHEN** 管理员编辑配置并点击保存
- **THEN** Store SHALL 调用 `saveGlobalConfig` 提交配置到后端
- **AND** 保存成功后 `lastSavedAt` SHALL 更新为当前时间

#### Scenario: 加载失败
- **WHEN** 获取全局配置请求失败
- **THEN** Store SHALL 设置 `error` 为错误信息
- **AND** 页面 SHALL 显示错误提示

### Requirement: 全局配置 Store 管理发布状态
系统 SHALL 提供发布配置的能力，包含策略和范围参数。

#### Scenario: 发布配置
- **WHEN** 管理员确认发布
- **THEN** Store SHALL 调用 `publishConfig` 提交发布请求
- **AND** 请求 SHALL 包含：生效策略（`force` | `conditional` | `restart`）、应用范围（`all` | `running` | `stopped` | `selected`）、指定实例 ID 列表（范围为 `selected` 时）

#### Scenario: 发布成功后刷新实例列表
- **WHEN** 配置发布成功
- **THEN** Store SHALL 触发实例列表刷新以更新 `globalConfigStatus`
