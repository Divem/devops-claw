## ADDED Requirements

### Requirement: 重启二次确认弹框
系统 SHALL 在管理员执行重启操作时显示二次确认弹框，防止误操作。

#### Scenario: 显示重启确认弹框
- **WHEN** 管理员点击实例的「重启」操作
- **THEN** 系统 SHALL 显示确认弹框
- **AND** 弹框 SHALL 显示实例名称
- **AND** 弹框 SHALL 显示警告提示文案
- **AND** 弹框 SHALL 提供「确认重启」和「取消」按钮

#### Scenario: 确认重启
- **WHEN** 重启确认弹框显示
- **AND** 管理员点击「确认重启」按钮
- **THEN** 弹框 SHALL 关闭
- **AND** 系统 SHALL 执行重启操作

#### Scenario: 取消重启
- **WHEN** 重启确认弹框显示
- **AND** 管理员点击「取消」按钮
- **THEN** 弹框 SHALL 关闭
- **AND** 系统 SHALL 不执行重启操作

#### Scenario: 点击遮罩关闭弹框
- **WHEN** 重启确认弹框显示
- **AND** 管理员点击弹框外部遮罩区域
- **THEN** 弹框 SHALL 关闭
- **AND** 系统 SHALL 不执行重启操作

#### Scenario: 实例名称过长显示
- **WHEN** 重启确认弹框显示
- **AND** 实例名称超过 20 个字符
- **THEN** 实例名称 SHALL 截断显示并添加省略号
- **AND** 完整名称 SHALL 在鼠标悬停时通过 tooltip 显示

### Requirement: 停止二次确认弹框
系统 SHALL 在管理员执行停止操作时显示二次确认弹框，防止误操作。

#### Scenario: 显示停止确认弹框
- **WHEN** 管理员点击实例的「停止」操作
- **THEN** 系统 SHALL 显示确认弹框
- **AND** 弹框 SHALL 显示实例名称
- **AND** 弹框 SHALL 显示警告提示文案
- **AND** 弹框 SHALL 提供「确认停止」和「取消」按钮

#### Scenario: 确认停止
- **WHEN** 停止确认弹框显示
- **AND** 管理员点击「确认停止」按钮
- **THEN** 弹框 SHALL 关闭
- **AND** 系统 SHALL 执行停止操作

#### Scenario: 取消停止
- **WHEN** 停止确认弹框显示
- **AND** 管理员点击「取消」按钮
- **THEN** 弹框 SHALL 关闭
- **AND** 系统 SHALL 不执行停止操作

#### Scenario: 点击遮罩关闭停止弹框
- **WHEN** 停止确认弹框显示
- **AND** 管理员点击弹框外部遮罩区域
- **THEN** 弹框 SHALL 关闭
- **AND** 系统 SHALL 不执行停止操作

#### Scenario: 停止弹框实例名称过长显示
- **WHEN** 停止确认弹框显示
- **AND** 实例名称超过 20 个字符
- **THEN** 实例名称 SHALL 截断显示并添加省略号
- **AND** 完整名称 SHALL 在鼠标悬停时通过 tooltip 显示

### Requirement: 强制删除二次确认弹框
系统 SHALL 在管理员执行强制删除操作时显示二次确认弹框，并要求输入实例名称进行验证，防止误删除。

#### Scenario: 显示删除确认弹框
- **WHEN** 管理员点击实例的「强制删除」操作
- **THEN** 系统 SHALL 显示确认弹框
- **AND** 弹框 SHALL 显示警告提示文案
- **AND** 弹框 SHALL 显示待删除实例名称
- **AND** 弹框 SHALL 提供输入框要求输入实例名称
- **AND** 弹框 SHALL 提供「确认删除」和「取消」按钮
- **AND** 确认按钮 SHALL 初始状态为禁用

#### Scenario: 输入正确实例名称启用删除按钮
- **WHEN** 删除确认弹框显示
- **AND** 管理员在输入框中输入的文本与实例名称完全一致
- **THEN** 「确认删除」按钮 SHALL 变为可用状态

#### Scenario: 输入错误实例名称保持禁用
- **WHEN** 删除确认弹框显示
- **AND** 管理员在输入框中输入的文本与实例名称不一致
- **THEN** 「确认删除」按钮 SHALL 保持禁用状态

#### Scenario: 确认删除
- **WHEN** 删除确认弹框显示
- **AND** 管理员已正确输入实例名称
- **AND** 管理员点击「确认删除」按钮
- **THEN** 弹框 SHALL 关闭
- **AND** 系统 SHALL 执行删除操作
- **AND** 输入框内容 SHALL 被清空

#### Scenario: 取消删除
- **WHEN** 删除确认弹框显示
- **AND** 管理员点击「取消」按钮
- **THEN** 弹框 SHALL 关闭
- **AND** 系统 SHALL 不执行删除操作
- **AND** 输入框内容 SHALL 被清空

#### Scenario: 关闭弹框清空输入
- **WHEN** 删除确认弹框显示
- **AND** 管理员关闭弹框（点击遮罩除外，因为设置了 mask-closable=false）
- **THEN** 弹框 SHALL 关闭
- **AND** 输入框内容 SHALL 被清空

#### Scenario: 输入框支持回车确认
- **WHEN** 删除确认弹框显示
- **AND** 管理员已正确输入实例名称
- **AND** 管理员在输入框中按下回车键
- **THEN** 系统 SHALL 执行删除操作
