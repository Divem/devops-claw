## 1. BotInfoDropdown 引导提示实现

- [x] 1.1 在 BotInfoDropdown.vue 查看模式中，凭证信息与操作按钮之间添加 NAlert 引导提示区域
- [x] 1.2 实现显示条件：project.appId 存在且 botStatus !== 'connected' 时显示，否则隐藏
- [x] 1.3 引导文案："机器人凭证已配置，请联系管理员配置长连接并发布应用后生效"

## 2. 测试验证

- [x] 2.1 更新 BotInfoDropdown.test.ts，添加引导提示显示/隐藏的测试用例
