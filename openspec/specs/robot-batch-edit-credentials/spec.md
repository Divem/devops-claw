## ADDED Requirements

### Requirement: 同时编辑 AppID 和 secret
系统 SHALL 允许用户在机器人信息面板中同时编辑 AppID 和 secret 两个字段。

#### Scenario: 进入编辑模式
- **WHEN** 用户点击「编辑」按钮
- **THEN** 系统显示包含 AppID 和 secret 输入框的表单
- **AND** 两个字段均处于可编辑状态

#### Scenario: 同时修改两个字段
- **GIVEN** 用户已进入编辑模式
- **WHEN** 用户修改 AppID 和 secret 的值
- **AND** 点击「保存」按钮
- **THEN** 系统同时验证两个字段的格式
- **AND** 验证通过后同时保存两个字段

#### Scenario: 部分字段修改
- **GIVEN** 用户已进入编辑模式
- **WHEN** 用户仅修改 AppID（或仅修改 secret）
- **AND** 点击「保存」按钮
- **THEN** 系统验证修改后的字段
- **AND** 保存所有字段（包括未修改的字段原值）

### Requirement: 字段格式验证
系统 SHALL 在保存前验证 AppID 和 secret 的格式有效性。

#### Scenario: AppID 格式验证失败
- **GIVEN** 用户已输入 AppID 和 secret
- **WHEN** AppID 格式不符合要求（如为空或包含非法字符）
- **AND** 用户点击「保存」
- **THEN** 系统在 AppID 字段旁显示错误提示
- **AND** 不执行保存操作

#### Scenario: Secret 格式验证失败
- **GIVEN** 用户已输入 AppID 和 secret
- **WHEN** secret 格式不符合要求（如长度不足）
- **AND** 用户点击「保存」
- **THEN** 系统在 secret 字段旁显示错误提示
- **AND** 不执行保存操作

### Requirement: 原子性保存
系统 SHALL 确保 AppID 和 secret 的更新具有原子性。

#### Scenario: 保存成功
- **GIVEN** 用户提交有效的 AppID 和 secret
- **WHEN** 系统处理保存请求
- **THEN** 两个字段同时更新成功
- **AND** 显示成功提示

#### Scenario: 保存失败
- **GIVEN** 用户提交 AppID 和 secret
- **WHEN** 保存过程中发生错误（如网络中断）
- **THEN** 两个字段均不更新
- **AND** 显示错误提示，保留表单数据供用户重试
