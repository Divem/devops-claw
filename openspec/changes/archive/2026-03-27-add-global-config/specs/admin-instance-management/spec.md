## ADDED Requirements

### Requirement: 实例展示全局配置同步状态
实例 SHALL 展示其全局配置同步状态，便于管理员了解配置下发情况。

#### Scenario: 实例已同步全局配置
- **WHEN** 实例已完成全局配置同步
- **THEN** 实例的 `globalConfigStatus` SHALL 为 `synced`
- **AND** 实例列表 SHALL 展示「已同步」状态标识

#### Scenario: 实例待同步全局配置
- **WHEN** 实例有全局配置待下次启动时生效
- **THEN** 实例的 `globalConfigStatus` SHALL 为 `pending`
- **AND** 实例列表 SHALL 展示「待同步」状态标识

#### Scenario: 实例配置已过期
- **WHEN** 全局配置已更新但实例尚未同步
- **THEN** 实例的 `globalConfigStatus` SHALL 为 `outdated`
- **AND** 实例列表 SHALL 展示「待更新」状态标识
