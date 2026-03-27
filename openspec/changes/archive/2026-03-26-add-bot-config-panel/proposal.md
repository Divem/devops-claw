## Why

当前项目创建流程中，飞书机器人的 App ID 和 Secret 完全由后端自动处理，用户无法手动配置凭据。当自动创建失败或用户需要接入已有的飞书应用时，缺乏手动配置的途径，导致项目无法正常连接飞书。

## What Changes

- 在项目面板中新增 bot 配置区域，提供 App ID 和 App Secret 输入框
- 扩展 Project 类型，增加 `appId`、`appSecret` 字段
- 新增保存 bot 配置的 API 调用（`PUT /api/project/:id/bot-config`）
- 在 MSW mock 中添加对应的 mock handler
- 配置输入框支持显示/隐藏 Secret（密码模式切换）
- 配置保存后给出成功/失败反馈

## Capabilities

### New Capabilities
- `bot-config-form`: 在项目面板中显示飞书机器人 App ID 和 Secret 配置表单，支持手动输入、保存和校验

### Modified Capabilities

## Impact

- **类型**: `src/types/project.ts` — 新增 `appId`、`appSecret` 字段
- **组件**: 新增 `BotConfigPanel.vue` 组件，集成到项目面板中
- **Store**: `src/stores/project.ts` — 新增 `updateBotConfig` 方法
- **Mock**: `src/mocks/handlers.ts` — 新增 `PUT /api/project/:id/bot-config` handler
- **依赖**: 使用已有的 Naive UI 组件（NInput、NButton、NIcon）
