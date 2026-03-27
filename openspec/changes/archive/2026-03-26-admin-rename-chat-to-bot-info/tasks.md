## 1. OpenClawAdmin 按钮改造

- [x] 1.1 将顶部栏"去对话"按钮文案改为"机器人信息"，图标改为 🤖
- [x] 1.2 将 `handleChat()` 改为 emit `showBotInfo` 事件
- [x] 1.3 移除 `handleChat` 函数

## 2. 集成到 App.vue

- [x] 2.1 在 OpenClawAdmin 上监听 `@show-bot-info="store.openBotInfoModal()"` 事件
