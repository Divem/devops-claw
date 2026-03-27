## Why

创建弹框中 App ID/Secret 输入框上方的提示文案「选填，不填则由系统自动分配」不够直观，员工不了解如何获取凭证。改为更明确的引导文案并提供申请入口，降低员工使用门槛。

## What Changes

- 将提示文案「选填，不填则由系统自动分配」改为「联系管理员，获取飞书机器人信息」
- 在文案右侧新增文字链接「申请机器人」，点击后在新窗口打开飞书机器人申请表单页面

## Capabilities

### New Capabilities

（无）

### Modified Capabilities

- `create-modal-credentials`: 更新凭证提示文案内容和新增「申请机器人」跳转链接

## Impact

- **前端组件**：`src/components/CreateModal.vue` — 修改提示文案和新增文字链接
- **配置**：飞书机器人申请表单 URL 需确定
