## ADDED Requirements

### Requirement: 管理端实例列表页面
系统 SHALL 在管理端提供实例管理页面，展示所有 OpenClaw 实例的列表。

#### Scenario: 访问实例管理页面
- **WHEN** 管理员导航至 `/admin/instances`
- **THEN** 系统 SHALL 渲染实例管理页面
- **AND** 页面 SHALL 显示实例列表表格
- **AND** 列表 SHALL 包含列：实例名称、状态、所属用户、创建时间、操作

#### Scenario: 实例列表展示状态 badge
- **WHEN** 实例列表加载完成
- **THEN** 每行 SHALL 显示对应状态的 badge
- **AND** 运行中(running) SHALL 显示绿色 badge
- **AND** 已停止(stopped) SHALL 显示灰色 badge
- **AND** 初始化中(initializing) SHALL 显示蓝色 badge

#### Scenario: 实例列表为空
- **WHEN** Mock 数据中没有实例
- **THEN** 系统 SHALL 显示空状态提示文案

### Requirement: 管理端创建实例弹框
系统 SHALL 提供「创建实例」弹框，与用户端「创建 OpenClaw 项目」弹框流程和样式对齐，但不含用户选择字段。

#### Scenario: 打开创建实例弹框
- **WHEN** 管理员点击「创建实例」按钮
- **THEN** 系统 SHALL 弹出创建实例弹框
- **AND** 弹框 SHALL 包含实例名称输入框（必填，最多 30 字符，显示计数）
- **AND** 弹框 SHALL 包含「配置飞书渠道」区块，含应用 ID 和应用密钥输入框（均选填）
- **AND** 弹框 SHALL 包含头像选择网格（12 个彩色头像，默认选中第一个）
- **AND** 弹框 SHALL 包含全宽「创建」主色调按钮
- **AND** 弹框 SHALL 包含「跳过机器人配置，先直接创建」跳过链接
- **AND** 弹框样式 SHALL 与用户端创建项目弹框保持一致（布局、间距、字体、圆角）

#### Scenario: 选择头像
- **WHEN** 管理员点击某个头像
- **THEN** 该头像 SHALL 显示选中状态（蓝色边框）
- **AND** 其他头像 SHALL 取消选中状态

#### Scenario: 成功创建实例（含飞书配置）
- **WHEN** 管理员填写实例名称、App ID、App Secret 并点击「创建」
- **THEN** 弹框 SHALL 进入进度视图，显示创建步骤
- **AND** 创建完成后飞书状态 SHALL 为「已连接」

#### Scenario: 跳过飞书配置创建实例
- **WHEN** 管理员点击「跳过机器人配置，先直接创建」链接
- **THEN** App ID 和 App Secret SHALL 被清空
- **AND** 系统 SHALL 以仅含实例名称和头像的请求提交
- **AND** 创建完成后飞书状态 SHALL 为「待配置」

#### Scenario: 创建时名称为空
- **WHEN** 管理员未填写实例名称即点击「创建」
- **THEN** 系统 SHALL 显示必填校验提示
- **AND** 弹框 SHALL 保持打开状态

### Requirement: 管理端实例操作
系统 SHALL 支持对实例进行基础操作（启动、停止、重启、删除）。

#### Scenario: 启动实例
- **WHEN** 管理员点击实例的「启动」操作
- **THEN** 该实例状态 SHALL 变更为「运行中」

#### Scenario: 停止实例
- **WHEN** 管理员点击实例的「停止」操作
- **AND** 在停止确认弹框中点击「确认停止」
- **THEN** 该实例状态 SHALL 变更为「已停止」

#### Scenario: 重启实例
- **WHEN** 管理员点击实例的「重启」操作
- **AND** 在重启确认弹框中点击「确认重启」
- **THEN** 该实例状态 SHALL 先变更为「已停止」
- **AND** 随后 SHALL 自动变更为「运行中」
- **AND** 重启期间 SHALL 显示加载状态

#### Scenario: 强制删除实例
- **WHEN** 管理员点击实例的「强制删除」操作
- **AND** 在删除确认弹框中正确输入实例名称
- **AND** 点击「确认删除」按钮
- **THEN** 该实例 SHALL 从列表中移除
- **AND** 实例相关数据 SHALL 被永久删除
