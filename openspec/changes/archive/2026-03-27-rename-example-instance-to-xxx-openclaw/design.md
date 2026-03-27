## Context

当前 `src/mocks/adminData.ts` 文件中的 `instanceNames` 数组定义了 10 个示例实例名称，使用部门功能命名（如"销售部 AI 助手"、"技术部代码审查"）。需要将这些名称统一改为"[姓名] 的 OpenClaw"格式，使其更直观地显示实例归属。

## Goals / Non-Goals

**Goals:**
- 将 10 个示例实例名称从部门功能命名改为"XXX 的 OpenClaw"格式
- 保持与现有用户名称（owners 数组）的对应关系
- 保持数据结构和其他字段不变

**Non-Goals:**
- 不涉及 UI 界面修改
- 不涉及 API 变更
- 不涉及业务逻辑变更

## Decisions

**命名格式**: 使用"[姓名] 的 OpenClaw"格式，例如"张三 的 OpenClaw"

**理由**:
- 简洁明了，直观显示实例归属
- 与现有用户名称列表对应
- 符合中文表达习惯

## Risks / Trade-offs

无风险。此变更仅影响示例数据，不影响生产环境。
