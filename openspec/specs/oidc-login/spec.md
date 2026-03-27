## ADDED Requirements

### Requirement: Login modal display on deploy trigger
系统 SHALL 在用户点击"立即部署"时检查登录状态。若用户未登录，系统 SHALL 弹出 OIDC 登录弹窗，而非直接进入创建流程。

#### Scenario: 未登录用户点击立即部署
- **WHEN** 未登录用户点击"立即部署"按钮
- **THEN** 系统弹出登录弹窗，不进入创建流程

#### Scenario: 已登录用户点击立即部署
- **WHEN** 已登录用户点击"立即部署"按钮
- **THEN** 系统跳过登录弹窗，直接进入创建流程

#### Scenario: 登录弹窗不可通过点击遮罩关闭
- **WHEN** 登录弹窗显示时用户点击弹窗外部遮罩
- **THEN** 弹窗保持显示，不关闭

### Requirement: Login form with domain account
登录弹窗 SHALL 包含用户名和密码输入框，并显示"使用域账号登录"提示文案，支持格式 `san.zhang / password`。

#### Scenario: 登录表单初始状态
- **WHEN** 登录弹窗打开
- **THEN** 弹窗显示标题、用户名输入框（placeholder: "san.zhang"）、密码输入框（placeholder: "password"）、登录按钮，以及底部提示"使用域账号登录，支持格式: san.zhang / password"

#### Scenario: 表单验证
- **WHEN** 用户名或密码为空时点击登录按钮
- **THEN** 登录按钮保持禁用状态，不可提交

#### Scenario: 登录中状态
- **WHEN** 用户提交有效凭据后等待响应
- **THEN** 登录按钮显示加载状态，输入框不可编辑

#### Scenario: 登录成功
- **WHEN** 用户提交有效凭据且后端返回成功
- **THEN** 弹窗关闭，用户进入部署创建流程，用户信息显示在页面头部

#### Scenario: 登录失败
- **WHEN** 用户提交凭据但后端返回认证错误
- **THEN** 弹窗保持显示，密码输入框清空，显示"用户名或密码错误"提示信息

### Requirement: Session persistence with token management
系统 SHALL 将认证 token 存储在 localStorage 中，页面刷新后自动恢复登录状态。系统 SHALL 在 token 过期前自动刷新，刷新失败时清除登录态。

#### Scenario: 页面刷新后恢复登录态
- **WHEN** 已登录用户刷新页面
- **THEN** 系统从 localStorage 读取 token，自动恢复登录状态，无需重新登录

#### Scenario: Token 自动刷新
- **WHEN** access_token 距离过期不足 5 分钟
- **THEN** 系统自动使用 refresh_token 获取新的 access_token，用户无感知

#### Scenario: Token 刷新失败
- **WHEN** refresh_token 无效或已过期
- **THEN** 系统清除本地登录状态，在需要认证的操作时重新弹出登录弹窗

#### Scenario: Token 刷新并发控制
- **WHEN** 多个请求同时发现 token 需要刷新
- **THEN** 仅发送一次刷新请求，其余请求等待刷新完成后使用新 token

### Requirement: Logout functionality
系统 SHALL 提供退出登录功能，清除本地登录状态和 token。

#### Scenario: 用户主动退出登录
- **WHEN** 用户点击头部下拉菜单中的"退出登录"
- **THEN** 系统调用登出 API，清除 localStorage 中的 token 和用户信息，页面显示未登录状态
