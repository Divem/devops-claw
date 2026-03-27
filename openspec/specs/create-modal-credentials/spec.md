## MODIFIED Requirements

### Requirement: 选填提示
App ID 和 App Secret 输入框区域 SHALL 显示提示文字「联系管理员，获取飞书机器人信息」，提示文字右侧 SHALL 显示文字链接「申请机器人」。

#### Scenario: 提示文字展示
- **WHEN** 创建项目弹框打开
- **THEN** 在 App ID 输入框上方显示灰色提示文字「联系管理员，获取飞书机器人信息」，右侧显示品牌色文字链接「申请机器人」

#### Scenario: 点击申请机器人链接
- **WHEN** 用户点击「申请机器人」文字链接
- **THEN** 在新浏览器标签页中打开飞书机器人申请表单页面
