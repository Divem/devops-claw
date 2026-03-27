## 1. 类型扩展

- [x] 1.1 在 `src/types/project.ts` 中为 `Project` 接口新增 `appId?: string` 和 `appSecret?: string` 字段
- [x] 1.2 新增 `UpdateBotConfigPayload` 类型：`{ appId: string; appSecret: string }`

## 2. Store 更新

- [x] 2.1 在 `src/stores/project.ts` 中新增 `isConfigExpanded` ref，控制配置面板折叠状态
- [x] 2.2 新增 `toggleConfigPanel` 方法，切换折叠状态
- [x] 2.3 新增 `updateBotConfig` 异步方法，调用 `PUT /api/project/:id/bot-config`，成功后更新 project 的 appId 字段并弹出成功消息，失败时弹出错误消息

## 3. BotConfigPanel 组件

- [x] 3.1 创建 `src/components/BotConfigPanel.vue`，使用 `<n-collapse>` 实现可折叠面板，标题为"机器人配置"
- [x] 3.2 在面板内添加 App ID 输入框（`<n-input>`，v-model 绑定，placeholder "请输入 App ID"），预填 project.appId
- [x] 3.3 添加 App Secret 输入框（`<n-input type="password" show-password-on="click">`），已配置时显示 placeholder "已配置，如需修改请重新输入"
- [x] 3.4 添加保存按钮（`<n-button type="primary">`），通过 computed 校验两个字段非空来控制 disabled 状态
- [x] 3.5 保存成功后重置 Secret 输入框为 placeholder 状态

## 4. 集成到项目面板

- [x] 4.1 在 `App.vue` 主界面区域中引入 `BotConfigPanel` 组件，放在 ProjectCard 下方

## 5. Mock Handler

- [x] 5.1 在 `src/mocks/handlers.ts` 中新增 `PUT /api/project/:id/bot-config` handler，返回 200 和更新后的 appId
- [x] 5.2 在 mock 的 GET `/api/project` 响应中添加示例 `appId` 字段

## 6. 测试

- [x] 6.1 编写 `useProjectStore` 的 `updateBotConfig` 方法单元测试
- [x] 6.2 编写 `BotConfigPanel` 组件测试：渲染、输入校验、保存按钮状态
