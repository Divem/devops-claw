## ADDED Requirements

### Requirement: 全屏独立布局

管理页面 SHALL 撑满整个浏览器视口（100vw × 100vh），不显示首页的 Header、HeroSection、FeatureList 和 Footer 元素。

#### Scenario: 进入管理页面时全屏展示

- **WHEN** 用户从项目卡片或完成弹窗点击「配置 OpenClaw」进入管理页面
- **THEN** 页面 SHALL 全屏展示管理界面，不包含首页的顶部导航栏和底部版权信息

#### Scenario: 返回首页时恢复完整布局

- **WHEN** 用户在管理页面点击「返回」按钮
- **THEN** 页面 SHALL 恢复首页完整布局，包含 Header、HeroSection、FeatureList 和 Footer

### Requirement: 左侧侧边导航

管理页面 SHALL 包含一个左侧固定宽度的侧边导航栏（控制台模式下显示）。代码模式下侧边导航 SHALL 完全隐藏。

#### Scenario: 控制台模式下显示侧边导航

- **WHEN** 页面处于控制台模式
- **THEN** 左侧 SHALL 显示固定宽度（220px）的侧边导航栏

#### Scenario: 代码模式下隐藏侧边导航

- **WHEN** 页面切换到代码模式
- **THEN** 侧边导航 SHALL 完全隐藏，内容区 SHALL 占满全部宽度

### Requirement: 侧边导航顶部项目信息

侧边导航顶部 SHALL 显示项目信息区域，包含项目头像、项目名称和连接状态标签，以及「返回」和「去对话」操作按钮。

#### Scenario: 项目信息展示

- **WHEN** 管理页面加载完成
- **THEN** 侧边导航顶部 SHALL 依次显示返回按钮、项目头像、项目名称和状态标签

#### Scenario: 去对话按钮

- **WHEN** 用户点击「去对话」按钮
- **THEN** 系统 SHALL 在新窗口打开飞书对话链接

#### Scenario: 返回按钮

- **WHEN** 用户点击返回按钮
- **THEN** 系统 SHALL 返回首页视图

### Requirement: 导航菜单项

侧边导航 SHALL 包含以下菜单项：聊天、概览、通道、实例、会话、使用情况、定时任务、配置、日志、文档。

#### Scenario: 默认选中聊天

- **WHEN** 管理页面首次加载
- **THEN** 「聊天」菜单项 SHALL 默认为选中状态

#### Scenario: 切换菜单项

- **WHEN** 用户点击任意菜单项
- **THEN** 该菜单项 SHALL 变为选中状态（高亮显示），右侧内容区 SHALL 加载对应的 iframe 内容

#### Scenario: 菜单项对应 Gateway 路径

- **WHEN** 用户选中某个菜单项
- **THEN** 右侧 iframe 的 src SHALL 指向 `/api/projects/:id/gateway/<对应路径>`

### Requirement: 右侧内容区

管理页面右侧 SHALL 为弹性内容区，占据侧边导航之外的剩余空间，高度为视口高度。

#### Scenario: 内容区填充剩余空间

- **WHEN** 管理页面加载完成
- **THEN** 右侧内容区 SHALL 填充侧边导航之外的全部剩余宽度和全部视口高度

### Requirement: iframe 加载状态

右侧内容区 SHALL 在 iframe 加载过程中显示骨架屏动画，加载完成后显示 iframe 内容。

#### Scenario: iframe 加载中

- **WHEN** 用户切换菜单项或首次进入管理页面
- **THEN** 右侧内容区 SHALL 显示骨架屏加载动画

#### Scenario: iframe 加载完成

- **WHEN** iframe 内容加载完成
- **THEN** 骨架屏 SHALL 消失，显示 iframe 实际内容

### Requirement: Gateway 服务不可用兜底

当 Gateway 服务不可用时，右侧内容区 SHALL 显示错误提示和重试按钮。

#### Scenario: Gateway 不可用

- **WHEN** iframe 加载失败或 Gateway 服务不可用
- **THEN** 右侧内容区 SHALL 显示「服务不可用」提示和「重试」按钮

#### Scenario: 重试加载

- **WHEN** 用户点击「重试」按钮
- **THEN** 系统 SHALL 重新加载当前选中的 iframe 内容
