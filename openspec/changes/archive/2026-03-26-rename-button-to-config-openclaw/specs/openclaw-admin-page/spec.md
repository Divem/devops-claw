## ADDED Requirements

### Requirement: 按钮文案改为「配置 OpenClaw」
创建完成结果页面和项目卡片上的原【打开项目】按钮 SHALL 更名为【配置 OpenClaw】，点击后 SHALL 导航至平台内的 OpenClaw 管理页面（路由 `/projects/:id/admin`），而非跳转外部链接。

#### Scenario: 创建完成后点击配置按钮
- **WHEN** 员工在创建完成结果页面点击【配置 OpenClaw】按钮
- **THEN** 页面导航至 `/projects/:id/admin` 管理页面

#### Scenario: 项目卡片点击配置按钮
- **WHEN** 员工在「我的项目」列表中点击项目卡片上的【配置 OpenClaw】按钮
- **THEN** 页面导航至 `/projects/:id/admin` 管理页面

### Requirement: 管理页面布局
OpenClaw 管理页面 SHALL 包含顶部信息栏和主内容区。顶部信息栏 SHALL 展示项目名称、连接状态标签和【去对话】快捷按钮。主内容区 SHALL 包含「控制台」和「代码模式」两个标签页。

#### Scenario: 进入管理页面展示默认视图
- **WHEN** 员工进入 `/projects/:id/admin` 管理页面
- **THEN** 顶部展示项目名称和连接状态（已连接/待配置/断开）
- **THEN** 默认激活「控制台」标签页
- **THEN** 主内容区通过 iframe 加载 Gateway Dashboard 的聊天界面

#### Scenario: 点击去对话按钮
- **WHEN** 员工点击顶部的【去对话】按钮
- **THEN** 跳转至飞书与对应机器人的聊天页面

### Requirement: 控制台标签页
「控制台」标签页 SHALL 通过 iframe 嵌入 Gateway Dashboard 的聊天界面。iframe SHALL 通过平台后端反向代理加载，代理路径为 `/api/projects/:id/gateway/*`。

#### Scenario: 加载控制台视图
- **WHEN** 「控制台」标签页被激活
- **THEN** iframe 加载 Gateway Dashboard 聊天界面（经后端代理）
- **THEN** 用户可在 iframe 内正常进行聊天调试操作

#### Scenario: Gateway 服务未就绪
- **WHEN** 「控制台」标签页被激活但 Gateway 服务不可用
- **THEN** 展示「服务启动中」或「服务不可用」提示信息
- **THEN** 提供【重试】按钮

### Requirement: 代码模式标签页
「代码模式」标签页 SHALL 通过 iframe 嵌入 Gateway Dashboard 的配置编辑界面，展示 `openclaw.json` 文件编辑器和文件管理器。

#### Scenario: 切换到代码模式
- **WHEN** 员工点击「代码模式」标签页
- **THEN** iframe 加载 Gateway Dashboard 的代码编辑界面
- **THEN** 用户可查看和编辑 `openclaw.json` 配置文件

#### Scenario: 代码模式加载中
- **WHEN** iframe 内容正在加载
- **THEN** 展示骨架屏 loading 状态
- **THEN** 加载完成后骨架屏消失，展示实际内容

### Requirement: 后端反向代理
平台后端 SHALL 提供反向代理 API（`/api/projects/:id/gateway/*`），将请求转发至对应虚拟机上的 Gateway Dashboard 服务。代理 SHALL 验证当前用户对该项目的访问权限。

#### Scenario: 代理转发请求
- **WHEN** 前端通过代理路径请求 Gateway Dashboard 资源
- **THEN** 后端验证用户身份和项目归属
- **THEN** 将请求转发至对应虚拟机的 Gateway Dashboard 地址
- **THEN** 返回 Gateway Dashboard 的响应内容

#### Scenario: 无权限访问
- **WHEN** 用户请求非自己项目的 Gateway 代理路径
- **THEN** 返回 403 Forbidden 错误
