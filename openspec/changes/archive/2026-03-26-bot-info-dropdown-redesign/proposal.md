## Why

当前「机器人信息」以弹框（BotInfoModal）形式展示，交互较重（打开弹框 → 查看信息 → 关闭弹框），且弹框中缺少 Secret 字段，状态字段使用的是项目状态（creating/deployed 等）而非凭证配置状态。需要将弹框改为下拉面板，降低交互成本，同时丰富展示内容。

## What Changes

- 将「机器人信息」从弹框（NModal）改为下拉面板（NDropdown/Popover），点击按钮展开/收起，无需关闭操作
- 下拉面板中新增 Secret 字段展示（掩码显示）
- 下拉面板中的 App ID 和 Secret 字段支持内联编辑修改
- 状态字段改为凭证配置状态：「待配置」（appId 或 secret 为空）→「已连接」（均已填写）
- 移除 BotInfoModal 组件，从 App.vue 中移除相关引用和 modalState 'bot_info' 分支

## Capabilities

### New Capabilities

- `bot-info-dropdown`: 机器人信息下拉面板，包含信息展示、凭证编辑、状态显示

### Modified Capabilities

- `bot-config-form`: BotConfigPanel 折叠面板将被 BotInfoDropdown 替代，不再需要独立的配置面板

## Impact

- **前端组件**：新增 BotInfoDropdown 替代 BotInfoModal + BotConfigPanel
- **App.vue**：移除 BotInfoModal 引用、modalState 中 bot_info 分支、BotConfigPanel 引用
- **ProjectCard / OpenClawAdmin**：「机器人信息」按钮从 emit showBotInfo 改为直接使用下拉组件
- **types/project.ts**：ModalState 中移除 'bot_info'
- **stores/project.ts**：移除 openBotInfoModal 方法
