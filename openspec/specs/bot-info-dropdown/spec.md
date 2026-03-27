## ADDED Requirements

### Requirement: Bot info dropdown panel displays on click
系统 SHALL 提供机器人信息下拉面板（BotInfoDropdown），点击「机器人信息」按钮展开，再次点击或点击外部区域收起。不需要关闭按钮。

#### Scenario: 展开下拉面板
- **WHEN** 用户点击「机器人信息」按钮
- **THEN** 下拉面板展开，显示机器人名称、App ID、Secret、凭证状态、创建时间

#### Scenario: 收起下拉面板
- **WHEN** 用户再次点击「机器人信息」按钮或点击面板外部区域
- **THEN** 下拉面板收起

### Requirement: Dropdown displays bot information
下拉面板 SHALL 展示以下信息行：机器人名称、App ID（未配置时显示「未配置」）、Secret（掩码显示为 `••••••••`，未配置时显示「未配置」）、凭证配置状态、创建时间。

#### Scenario: 信息展示 - 已配置
- **WHEN** 项目已配置 App ID
- **THEN** App ID 行显示实际值，Secret 行显示掩码 `••••••••`

#### Scenario: 信息展示 - 未配置
- **WHEN** 项目未配置 App ID
- **THEN** App ID 行显示「未配置」，Secret 行显示「未配置」

### Requirement: Credential status shows 待配置 or 已连接
下拉面板 SHALL 显示凭证配置状态。当 App ID 未配置时显示「待配置」（warning 标签），当 App ID 已配置时显示「已连接」（success 标签）。

#### Scenario: 状态 - 待配置
- **WHEN** 项目的 appId 为空
- **THEN** 状态行显示橙色 warning 标签「待配置」

#### Scenario: 状态 - 已连接
- **WHEN** 项目的 appId 非空
- **THEN** 状态行显示绿色 success 标签「已连接」

### Requirement: App ID and Secret support inline editing
下拉面板中的 App ID 和 Secret 行 SHALL 支持内联编辑。默认为展示模式，点击编辑图标后切换为输入框模式，显示保存和取消按钮。

#### Scenario: 进入编辑模式 - App ID
- **WHEN** 用户点击 App ID 行的编辑图标
- **THEN** App ID 行切换为输入框，预填当前值，显示保存和取消按钮

#### Scenario: 保存 App ID
- **WHEN** 用户修改 App ID 输入框内容并点击保存
- **THEN** 系统发送 PUT 请求到 `/api/project/:id/bot-config`，成功后切换回展示模式并更新显示值，显示成功提示

#### Scenario: 取消编辑 - App ID
- **WHEN** 用户点击取消按钮
- **THEN** App ID 行恢复为展示模式，输入框内容不保留

#### Scenario: 进入编辑模式 - Secret
- **WHEN** 用户点击 Secret 行的编辑图标
- **THEN** Secret 行切换为密码输入框，placeholder 为「请输入 App Secret」，显示保存和取消按钮

#### Scenario: 保存 Secret
- **WHEN** 用户输入新的 Secret 并点击保存
- **THEN** 系统发送 PUT 请求到 `/api/project/:id/bot-config`，成功后切换回展示模式，Secret 显示掩码 `••••••••`

### Requirement: Dropdown includes Feishu chat button
当下拉面板中的项目有飞书对话链接时，SHALL 显示「前往飞书对话」按钮，点击后在新窗口打开。

#### Scenario: 显示飞书对话按钮
- **WHEN** 项目的 feishuChatUrl 非空
- **THEN** 下拉面板底部显示「前往飞书对话」按钮

#### Scenario: 隐藏飞书对话按钮
- **WHEN** 项目的 feishuChatUrl 为空
- **THEN** 下拉面板不显示「前往飞书对话」按钮

### Requirement: Replace BotInfoModal with BotInfoDropdown
系统 SHALL 移除 BotInfoModal 组件，从 App.vue 中移除相关引用、modalState 'bot_info' 分支和 BotConfigPanel 引用。

#### Scenario: 移除 BotInfoModal
- **WHEN** 变更部署完成
- **THEN** BotInfoModal.vue 文件已删除，App.vue 中无 BotInfoModal 引用

#### Scenario: 移除 BotConfigPanel
- **WHEN** 变更部署完成
- **THEN** App.vue 中无 BotConfigPanel 引用，BotConfigPanel.vue 文件已删除

#### Scenario: 清理 modalState
- **WHEN** 变更部署完成
- **THEN** ModalState 类型中不包含 'bot_info'，store 中无 openBotInfoModal 方法
