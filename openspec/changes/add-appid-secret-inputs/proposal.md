## Why

当前创建 OpenClaw 项目的弹框（CreateModal）仅包含「项目名」和「飞书渠道（机器人名称+头像）」三个字段，AppID/Secret 需要在创建完成后通过项目卡片下的 BotConfigPanel 单独配置。对于已有飞书应用凭证的员工，创建后还需额外一步配置才能完成接入，流程割裂。将 AppID/Secret 字段前移到创建弹框中，可以让员工在创建时一并提供凭证，实现一步到位的创建体验。

## What Changes

- 在创建项目弹框中新增「App ID」和「App Secret」两个输入框，位于「配置飞书渠道」模块内
- App Secret 输入框使用密码类型，支持显示/隐藏切换
- 两个字段设为选填（不填写时后端从凭证池自动分配；填写时优先使用员工提供的凭证）
- 更新 `CreateProjectPayload` 类型定义，新增 `appId` 和 `appSecret` 可选字段
- 更新表单校验逻辑，AppID/Secret 选填不阻塞提交
- 后端 API 适配：创建项目接口支持接收并处理员工提供的凭证

## Capabilities

### New Capabilities

- `create-modal-credentials`: 创建弹框中的 AppID/Secret 输入能力，包含输入框 UI、密码切换、表单校验与 payload 扩展

### Modified Capabilities

（无需修改已有 spec，现有 `bot-config-form` spec 覆盖的是项目卡片内的 BotConfigPanel，与创建弹框无行为冲突）

## Impact

- **前端组件**：`src/components/CreateModal.vue` — 新增输入字段、调整布局
- **类型定义**：`src/types/project.ts` — `CreateProjectPayload` 新增可选字段
- **API 接口**：`POST /api/project` — request body 新增 `appId`、`appSecret` 可选字段
- **后端逻辑**：创建项目服务需判断员工是否提供了凭证，优先使用员工凭证，否则从凭证池分配
- **兼容性**：非 breaking change，现有不传凭证的调用行为不变
