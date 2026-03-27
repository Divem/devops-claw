## 1. 类型与 Store 更新

- [x] 1.1 在 `src/types/project.ts` 的 `ModalState` 联合类型中新增 `'bot_info'`
- [x] 1.2 在 `src/stores/project.ts` 中新增 `openBotInfoModal` 方法，设置 `modalState` 为 `'bot_info'`

## 2. ProjectCard 按钮改造

- [x] 2.1 将"去对话"按钮文案改为"机器人信息"，图标改为 🤖
- [x] 2.2 将 emit 事件从 `chat` 改为 `showBotInfo`
- [x] 2.3 移除 `chat` 相关的 emit 类型声明

## 3. BotInfoModal 组件

- [x] 3.1 创建 `src/components/BotInfoModal.vue`，使用 `<n-modal>` 包裹，接收 `show` 和 `project` props
- [x] 3.2 弹窗内展示机器人名称（botName）、App ID（未配置时显示"未配置"）、状态标签、创建时间
- [x] 3.3 当 `feishuChatUrl` 存在时，底部显示"前往飞书对话"按钮，点击新窗口打开链接
- [x] 3.4 弹窗关闭时 emit `close` 事件

## 4. 集成到 App.vue

- [x] 4.1 在 App.vue 中引入 BotInfoModal，绑定 `store.modalState === 'bot_info'` 控制显隐
- [x] 4.2 将 ProjectCard 的 `@chat` 事件替换为 `@show-bot-info="store.openBotInfoModal()"`
- [x] 4.3 移除 `handleChat` 函数（不再需要直接跳转飞书外链的逻辑）

## 5. 测试

- [x] 5.1 更新 ProjectCard 测试：验证按钮文案为"机器人信息"且 emit `showBotInfo`
- [x] 5.2 编写 BotInfoModal 组件测试：验证信息展示、App ID 未配置提示、飞书链接按钮显隐
