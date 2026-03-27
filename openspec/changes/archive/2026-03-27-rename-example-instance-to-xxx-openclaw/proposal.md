## Why

当前 `/admin/instances` 页面的示例实例名称使用部门功能命名（如"销售部 AI 助手"），这种命名方式不够直观，无法体现实例归属。改为"XXX 的 OpenClaw"格式可以更清晰地展示每个实例的所属关系，提升用户体验。

## What Changes

- 修改 `src/mocks/adminData.ts` 中的 `instanceNames` 数组
- 将 10 个示例实例名称从部门功能命名改为"[姓名] 的 OpenClaw"格式
- 保持原有数据结构和其他字段不变

## Capabilities

### New Capabilities
<!-- 无新增功能 -->

### Modified Capabilities
<!-- 无需求层面的变更，仅为示例数据修改 -->

## Impact

- **文件**: `src/mocks/adminData.ts`
- **范围**: 仅示例数据，不影响生产逻辑
- **风险**: 无破坏性变更
