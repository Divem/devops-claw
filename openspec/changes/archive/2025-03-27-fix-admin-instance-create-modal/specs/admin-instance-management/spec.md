## MODIFIED Requirements

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
