## Why

在生产环境（nginx HTTP 部署）中，创建 OpenClaw 项目后项目卡片无法正常显示。根本原因是 `crypto.randomUUID()` API 要求安全上下文（HTTPS 或 localhost），在纯 HTTP 环境下会抛出异常，导致项目 ID 生成失败（返回 `undefined`），进而使后续所有依赖项目 ID 的 API 请求都失败。

## What Changes

- 将 mock 数据层中项目 ID 的生成方式从 `crypto.randomUUID()` 改为兼容 HTTP 环境的自定义 UUID 生成方案
- 确保在本地开发（localhost）和生产 HTTP 部署环境下都能正常工作
- 保持向后兼容，现有项目数据不受影响

## Capabilities

### New Capabilities
- `mock-uuid-generation`: 兼容 HTTP 环境的 UUID 生成能力，用于替代浏览器原生的 `crypto.randomUUID()`

### Modified Capabilities
- *无*（此变更仅涉及实现细节，不涉及规范层面的行为变更）

## Impact

- **受影响文件**: `src/mocks/data.ts`
- **受影响功能**: 项目创建流程
- **兼容性**: 纯修复性质，不影响现有 API 接口或数据结构
- **环境**: 主要解决 HTTP 生产环境下的兼容性问题
