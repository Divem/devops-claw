## Why

当前创建项目的流程要求用户必须完成机器人配置才能继续，这增加了用户的认知负担和操作步骤。为了简化首次使用体验，让用户能更快看到 OpenClaw 的界面，需要允许用户先创建项目再配置机器人。

## What Changes

- **默认头像选择**：创建项目弹框中，默认选中第一个头像，减少用户操作
- **跳过机器人配置**：创建项目时不再强制要求配置机器人，改为可选步骤
- **OpenClaw 点击交互**：OpenClaw 卡片支持点击，点击后跳转到下一步
- **后续配置提示**：在【连接飞书】步骤后添加提示，标明本次跳过了机器人配置，需要在后续完成

## Capabilities

### New Capabilities
- `project-creation-flow`: 优化项目创建流程，支持跳过机器人配置
- `avatar-default-selection`: 项目创建时默认选中第一个头像

### Modified Capabilities
- `openclaw-card-interaction`: OpenClaw 卡片支持点击跳转到下一步

## Impact

- **前端组件**：
  - 创建项目弹框组件 (CreateProjectModal)
  - 头像选择组件
  - OpenClaw 卡片组件
  - 飞书连接步骤组件
- **状态管理**：项目创建流程的状态逻辑
- **用户体验**：简化了首次创建项目的流程
