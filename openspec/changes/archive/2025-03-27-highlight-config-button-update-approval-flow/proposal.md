## Why

当前"你的 OpenClaw 已部署"弹框中的按钮配置不够直观："配置 OpenClaw"按钮未突出显示，而"查看审批单"文案和交互也需要优化以更好地引导用户完成审核流程。

## What Changes

- 将"配置 OpenClaw"按钮改为高亮样式（type="primary"）
- 将"查看审批单"按钮文案修改为"申请审核"
- 点击"申请审核"按钮时，在新标签页打开飞书审批链接（使用占位链接：https://open.feishu.cn）
- 调整按钮顺序，将主要操作（配置）放在次要操作（申请审核）之前

## Capabilities

### New Capabilities
<!-- 此变更不涉及新的能力，仅为 UI 优化 -->
（无新能力）

### Modified Capabilities
<!-- 此变更不涉及现有 spec 级别的需求变更，仅为 UI 实现细节调整 -->
（无需求变更）

## Impact

- **受影响的文件**：`src/components/CompleteModal.vue`
- **UI 组件**：`n-button` 组件样式和事件处理
- **用户体验**：更清晰的视觉层次和更直观的操作流程
- **外部链接**：新增飞书开放平台链接跳转
