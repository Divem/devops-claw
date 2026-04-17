## Why

当前 `AgentTypeSelectModal` 弹框中的类型描述过于笼统，用户难以理解 OpenClaw 与 Hermes Agent 的核心差异和适用场景。此外，弹框缺少直达官方文档/官网的入口，无法帮助用户在决策前深入了解两种 Agent 的定位。结合 devops-claw 作为企业级自托管平台的定位，需要在选择节点明确传达：Hermes 面向需要持续进化和复杂自动化的场景，OpenClaw 面向追求轻量敏捷和灵活自定义的场景。

## What Changes

- 重写 `AgentTypeSelectModal.vue` 中两种 Agent 的描述文案，突出定位差异与选择建议。
- 在每种 Agent 卡片底部增加「了解更多」可点击链接，跳转至对应官方页面：
  - Hermes Agent → `https://hermes-agent.nousresearch.com/`
  - OpenClaw → `https://openclaw.ai/`
- 保持现有交互与样式规范，仅扩展卡片内的信息结构。

## Capabilities

### New Capabilities
- `agent-select-modal-info-and-links`: 为 Agent 类型选择弹框增加定位说明文案与官方官网链接。

### Modified Capabilities
- 无

## Impact

- 前端组件：`src/components/AgentTypeSelectModal.vue`
- 无 API、状态管理或路由变更
- 纯 UI 增强，无向后不兼容变更
