## Why

在员工驱动模式下，员工配置完机器人凭证（AppID/Secret）后，机器人并不会立即生效——还需要管理员在飞书开放平台配置长连接并发布应用。当前 BotInfoDropdown 配置成功后仅提示"机器人凭证已更新"，没有引导用户下一步操作，导致用户困惑为什么机器人不可用。

## What Changes

- 在 BotInfoDropdown 组件中，凭证保存成功后新增引导提示区域，告知用户需联系管理员发布应用才能生效
- 引导文案包含下一步说明和操作指引（如联系管理员的方式）
- 引导仅在凭证配置完成且机器人状态为"待配置"时显示，已连接状态不显示

## Capabilities

### New Capabilities
- `bot-publish-guide`: 机器人配置完成后的发布引导提示，引导用户联系管理员发布应用

### Modified Capabilities

## Impact

- `src/components/BotInfoDropdown.vue` — 新增引导提示 UI
- 无 API 变更，纯前端文案和 UI 调整
