## Requirements

### Requirement: 实例重启 Gateway 操作
系统 SHALL 支持对实例执行"重启 Gateway"操作，仅重启实例的 Gateway 服务而不影响虚拟机本身。

#### Scenario: 重启 Gateway 成功
- **WHEN** 管理员在"更多"菜单中点击"重启 Gateway"
- **AND** 在确认弹框中点击"确认重启"
- **THEN** 系统 SHALL 调用重启 Gateway API
- **AND** 实例状态 SHALL 保持"运行中"
- **AND** Gateway 健康状态 SHALL 在短暂不可用后恢复为健康

#### Scenario: 重启 Gateway 确认弹框
- **WHEN** 管理员点击"重启 Gateway"操作
- **THEN** 系统 SHALL 弹出确认弹框
- **AND** 弹框 SHALL 显示标题"重启 Gateway？"
- **AND** 弹框 SHALL 显示说明文案"确定要重启实例 {名称} 的 Gateway 服务吗？仅 Gateway 服务会短暂中断"
- **AND** 弹框 SHALL 包含"取消"和"确认重启"两个按钮
- **AND** 点击遮罩层 SHALL 关闭弹框

### Requirement: 实例修复配置操作
系统 SHALL 支持对实例执行"修复 DevOps Claw 配置"操作，自动修复实例的配置问题。

#### Scenario: 修复配置成功
- **WHEN** 管理员在"更多"菜单中点击"修复配置"
- **AND** 在确认弹框中点击"确认修复"
- **THEN** 系统 SHALL 调用修复配置 API
- **AND** 实例状态 SHALL 保持不变

#### Scenario: 修复配置确认弹框
- **WHEN** 管理员点击"修复配置"操作
- **THEN** 系统 SHALL 弹出确认弹框
- **AND** 弹框 SHALL 显示标题"修复配置？"
- **AND** 弹框 SHALL 显示说明文案"确定要修复实例 {名称} 的 DevOps Claw 配置吗？系统将自动检测并修复常见配置问题"
- **AND** 弹框 SHALL 包含"取消"和"确认修复"两个按钮
- **AND** 点击遮罩层 SHALL 关闭弹框

### Requirement: 实例恢复初始设置操作
系统 SHALL 支持对实例执行"恢复初始设置"操作，将实例恢复到初始创建状态（不可逆）。

#### Scenario: 恢复初始设置成功
- **WHEN** 管理员在"更多"菜单中点击"恢复初始设置"
- **AND** 在确认弹框中正确输入实例名称
- **AND** 点击"确认恢复"按钮
- **THEN** 系统 SHALL 调用恢复初始设置 API
- **AND** 实例状态 SHALL 变更为"运行中"

#### Scenario: 恢复初始设置确认弹框
- **WHEN** 管理员点击"恢复初始设置"操作
- **THEN** 系统 SHALL 弹出确认弹框
- **AND** 弹框 SHALL 显示标题"恢复初始设置？"
- **AND** 弹框 SHALL 显示说明文案"此操作将清除实例 {名称} 的所有自定义配置，恢复到初始状态，且不可撤销。请输入实例名称以确认"
- **AND** 弹框 SHALL 包含名称输入框
- **AND** 弹框 SHALL 包含"取消"和"确认恢复"两个按钮
- **AND** "确认恢复"按钮 SHALL 在输入框内容与实例名称匹配时才可点击

#### Scenario: 恢复初始设置输入名称不匹配
- **WHEN** 管理员在恢复初始设置弹框中输入的名称与实例名称不一致
- **THEN** "确认恢复"按钮 SHALL 处于禁用状态

#### Scenario: 恢复初始设置点击遮罩层
- **WHEN** 管理员在恢复初始设置弹框中点击遮罩层
- **THEN** 弹框 SHALL 不关闭（高风险操作不可通过遮罩关闭）

### Requirement: 更多操作菜单排序
"更多"下拉菜单 SHALL 按以下顺序排列操作项：重启 Gateway、修复配置、重启电脑、恢复初始设置、配置（条件显示）、强制删除。
