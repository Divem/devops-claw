## Why

OpenClaw 项目创建弹框中的 appid 和 secret 输入框缺少明确的标签说明，导致用户不清楚这些字段的用途和格式要求。添加标签可以提升表单的可读性和用户体验。

## What Changes

- 在项目创建弹框的表单中，为 appid 输入框添加标签 "应用 ID (App ID)"
- 为 secret 输入框添加标签 "应用密钥 (App Secret)"
- 标签样式与现有表单组件保持一致

## Capabilities

### New Capabilities
- `project-modal-labels`: 为 OpenClaw 项目创建弹框添加输入框标签

### Modified Capabilities
<!-- 无现有 spec 需要修改 -->

## Impact

- `src/components/` - 项目创建弹框组件
- 仅 UI 层修改，不影响 API 或数据模型
