## 1. 创建 BotInfoDropdown 组件

- [x] 1.1 创建 `src/components/BotInfoDropdown.vue`，使用 NPopover 实现下拉面板，接收 project prop，展示机器人名称、App ID、Secret（掩码）、凭证状态（待配置/已连接）、创建时间
- [x] 1.2 实现凭证状态逻辑：appId 为空显示「待配置」warning 标签，非空显示「已连接」success 标签
- [x] 1.3 实现 App ID 内联编辑：点击编辑图标切换为输入框，保存发送 PUT /api/project/:id/bot-config，成功后更新显示
- [x] 1.4 实现 Secret 内联编辑：点击编辑图标切换为密码输入框，保存发送 PUT 请求，成功后恢复掩码显示
- [x] 1.5 添加「前往飞书对话」按钮（仅 feishuChatUrl 存在时显示）

## 2. 集成替换

- [x] 2.1 在 ProjectCard 中用 BotInfoDropdown 替代「机器人信息」按钮 + showBotInfo emit
- [x] 2.2 在 OpenClawAdmin 中用 BotInfoDropdown 替代「机器人信息」按钮 + showBotInfo emit
- [x] 2.3 从 App.vue 中移除 BotInfoModal 引用、BotConfigPanel 引用、modalState === 'bot_info' 条件渲染
- [x] 2.4 从 types/project.ts 的 ModalState 中移除 'bot_info'
- [x] 2.5 从 stores/project.ts 中移除 openBotInfoModal 方法

## 3. 清理

- [x] 3.1 删除 `src/components/BotInfoModal.vue`
- [x] 3.2 删除 `src/components/BotConfigPanel.vue`
