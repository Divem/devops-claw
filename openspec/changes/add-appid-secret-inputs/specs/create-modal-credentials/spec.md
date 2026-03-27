## ADDED Requirements

### Requirement: App ID 输入框
创建项目弹框 SHALL 在「配置飞书渠道」模块中提供 App ID 文本输入框。该字段为选填，placeholder 为「请输入 App ID」。输入框使用 NInput 组件，类型为 text。

#### Scenario: 填写 App ID
- **WHEN** 用户在 App ID 输入框中输入文本
- **THEN** 输入框正常显示输入内容，form 数据同步更新

#### Scenario: 不填写 App ID
- **WHEN** 用户未在 App ID 输入框中输入任何内容
- **THEN** 创建按钮不受影响，仍可正常提交，提交 payload 中不包含 appId 字段

### Requirement: App Secret 输入框
创建项目弹框 SHALL 在 App ID 输入框下方提供 App Secret 密码输入框。该字段为选填，placeholder 为「请输入 App Secret」。输入框使用 NInput 组件，类型为 password，支持通过 `show-password-on="click"` 切换明文/密文显示。

#### Scenario: 填写 App Secret
- **WHEN** 用户在 App Secret 输入框中输入文本
- **THEN** 输入框以密码形式（掩码）显示输入内容，form 数据同步更新

#### Scenario: 切换 App Secret 明文显示
- **WHEN** 用户点击 App Secret 输入框的密码切换按钮
- **THEN** 输入内容在明文和密文之间切换显示

#### Scenario: 不填写 App Secret
- **WHEN** 用户未在 App Secret 输入框中输入任何内容
- **THEN** 创建按钮不受影响，仍可正常提交，提交 payload 中不包含 appSecret 字段

### Requirement: 选填提示
App ID 和 App Secret 输入框区域 SHALL 显示提示文字「选填，不填则由系统自动分配」，告知用户这两个字段非必填。

#### Scenario: 提示文字展示
- **WHEN** 创建项目弹框打开
- **THEN** 在 App ID 输入框上方显示灰色提示文字「选填，不填则由系统自动分配」

### Requirement: 字段布局顺序
「配置飞书渠道」模块内的字段 SHALL 按以下顺序排列：模块说明文字 → 机器人名称输入框 → App ID/Secret 提示文字 → App ID 输入框 → App Secret 输入框 → 头像选择网格。

#### Scenario: 字段顺序验证
- **WHEN** 创建项目弹框打开
- **THEN** 从上到下依次显示：说明文字、机器人名称输入框、选填提示、App ID 输入框、App Secret 输入框、头像选择

### Requirement: 表单提交 Payload 扩展
CreateProjectPayload 类型 SHALL 新增 `appId?: string` 和 `appSecret?: string` 可选字段。提交时仅当用户输入了对应内容才包含在 payload 中。

#### Scenario: 提交含凭证的表单
- **WHEN** 用户填写了 App ID（值为 "cli_xxx"）和 App Secret（值为 "sec_xxx"），并点击创建
- **THEN** emit 的 payload 包含 `{ name, botName, avatarUrl, appId: "cli_xxx", appSecret: "sec_xxx" }`

#### Scenario: 提交不含凭证的表单
- **WHEN** 用户未填写 App ID 和 App Secret，并点击创建
- **THEN** emit 的 payload 不包含 appId 和 appSecret 字段，仅包含 `{ name, botName, avatarUrl }`

#### Scenario: 部分填写凭证
- **WHEN** 用户仅填写了 App ID 但未填写 App Secret（或反之）
- **THEN** emit 的 payload 仅包含已填写的字段，未填写的字段不包含在 payload 中

### Requirement: 表单校验不受影响
App ID 和 App Secret 字段 SHALL 不参与表单必填校验。创建按钮的 disabled 状态 SHALL 仅依赖项目名、机器人名称和头像选择三个原有字段。

#### Scenario: 仅填必填字段即可提交
- **WHEN** 用户仅填写了项目名、机器人名称并选择了头像，未填写 App ID 和 App Secret
- **THEN** 创建按钮 SHALL 为可用状态（disabled=false），可正常提交
