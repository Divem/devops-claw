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
系统 SHALL 提供「创建实例」弹框，供管理员为指定场景快速创建 OpenClaw 实例。

#### Scenario: 打开创建实例弹框
- **WHEN** 管理员点击「创建实例」按钮
- **THEN** 系统 SHALL 弹出创建实例弹框
- **AND** 弹框 SHALL 包含实例名称输入框（必填）
- **AND** 弹框 SHALL 包含描述输入框（选填）
- **AND** 弹框 SHALL 包含「创建」和「取消」按钮
- **AND** 弹框样式 SHALL 与用户端创建项目弹框保持一致（布局、间距、字体）

#### Scenario: 成功创建实例
- **WHEN** 管理员填写实例名称并点击「创建」按钮
- **THEN** 弹框 SHALL 关闭
- **AND** 新实例 SHALL 出现在列表顶部
- **AND** 新实例初始状态 SHALL 为「初始化中」

#### Scenario: 创建时名称为空
- **WHEN** 管理员未填写实例名称即点击「创建」
- **THEN** 系统 SHALL 显示必填校验提示
- **AND** 弹框 SHALL 保持打开状态

#### Scenario: 取消创建
- **WHEN** 管理员点击「取消」按钮
- **THEN** 弹框 SHALL 关闭
- **AND** 实例列表 SHALL 无变化

### Requirement: 管理端实例操作
系统 SHALL 支持对实例进行基础操作（启动、停止、删除）。

#### Scenario: 停止运行中的实例
- **WHEN** 管理员点击运行中实例的「停止」操作
- **THEN** 该实例状态 SHALL 变更为「已停止」

#### Scenario: 启动已停止的实例
- **WHEN** 管理员点击已停止实例的「启动」操作
- **THEN** 该实例状态 SHALL 变更为「运行中」

#### Scenario: 删除实例
- **WHEN** 管理员点击实例的「删除」操作
- **AND** 确认删除弹框中点击「确认」
- **THEN** 该实例 SHALL 从列表中移除
