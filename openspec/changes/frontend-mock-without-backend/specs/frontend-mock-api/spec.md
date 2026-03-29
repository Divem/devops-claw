## ADDED Requirements

### Requirement: 员工端项目 API 使用前端 mock
员工端所有项目相关 API 调用 SHALL 直接调用 `src/mocks/data.ts` 中的 mock 函数，不发起网络请求。包括：获取项目（`getProject`）、创建项目（`createProject`）、获取进度（`getProgress`）、删除项目（`deleteProject`）、更新机器人配置（`updateBotConfig`）。

#### Scenario: 首页加载获取项目
- **WHEN** 应用 mounted 且 localStorage 中有项目数据
- **THEN** 调用 `getProject()` 返回项目对象，页面显示项目卡片

#### Scenario: 首页加载无项目
- **WHEN** 应用 mounted 且无项目数据
- **THEN** 调用 `getProject()` 返回 null，页面显示创建引导

#### Scenario: 创建新项目
- **WHEN** 用户提交创建表单
- **THEN** 调用 `createProject(name, avatarUrl, botName)` 创建项目并返回项目对象，启动进度轮询

#### Scenario: 进度轮询
- **WHEN** 项目创建中，轮询触发
- **THEN** 调用 `getProgress()` 获取进度数据，更新步骤状态

#### Scenario: 删除项目
- **WHEN** 用户确认删除
- **THEN** 调用 `deleteProject()` 清除项目数据，页面回到空状态

#### Scenario: 更新机器人配置
- **WHEN** 用户提交飞书 App 配置
- **THEN** 调用 `updateBotConfig(appId, appSecret)` 更新项目配置

### Requirement: 管理后台实例 API 使用前端 mock
管理后台所有实例相关 API 调用 SHALL 直接调用 `src/mocks/adminData.ts` 中的 mock 函数。包括：实例列表（`getInstances`）、实例详情（`getInstanceDetail`）、实例操作（`executeInstanceAction`）、创建实例（`createInstance`）、实例进度（`getInstanceCreateProgress`）。

#### Scenario: 加载实例列表
- **WHEN** 进入实例管理页面
- **THEN** 调用 `getInstances(filters)` 返回分页实例数据

#### Scenario: 查看实例详情
- **WHEN** 点击实例行展开详情
- **THEN** 调用 `getInstanceDetail(id)` 返回实例详情含操作日志

#### Scenario: 执行实例操作
- **WHEN** 管理员点击启动/停止/重启等操作
- **THEN** 调用 `executeInstanceAction(id, action)` 执行操作并刷新列表

#### Scenario: 创建实例
- **WHEN** 管理员提交创建实例表单
- **THEN** 调用 `createInstance(name, avatarUrl, appId, appSecret)` 创建实例并启动进度轮询

### Requirement: 管理后台审批 API 使用前端 mock
审批列表和审批操作 SHALL 直接调用 `src/mocks/adminData.ts` 中的 mock 函数。

#### Scenario: 加载审批列表
- **WHEN** 进入审批管理页面
- **THEN** 调用 `getApprovals(status)` 返回审批列表

#### Scenario: 审批通过
- **WHEN** 管理员点击通过审批
- **THEN** 调用 `approveApproval(id)` 更新审批状态并刷新列表

### Requirement: 管理后台镜像 API 使用前端 mock
镜像管理所有 API 调用 SHALL 直接调用 `src/mocks/imageData.ts` 中的 mock 函数。

#### Scenario: 加载镜像列表
- **WHEN** 进入镜像管理页面
- **THEN** 调用 `getImages(filters)` 返回分页镜像数据

#### Scenario: 创建镜像
- **WHEN** 管理员提交创建镜像表单
- **THEN** 调用 `createImage(data)` 创建镜像并刷新列表

#### Scenario: 更新镜像
- **WHEN** 管理员编辑镜像信息
- **THEN** 调用 `updateImage(id, data)` 更新镜像并刷新列表

#### Scenario: 删除镜像
- **WHEN** 管理员确认删除镜像
- **THEN** 调用 `deleteImage(id)` 删除镜像并刷新列表

### Requirement: 仪表盘和趋势图使用前端 mock
仪表盘数据 SHALL 直接调用 `src/mocks/data.ts` 中的 `getDashboardData()`。

#### Scenario: 加载仪表盘
- **WHEN** 进入管理后台首页
- **THEN** 调用 `getDashboardData()` 返回统计数据、资源使用率和待办事项

#### Scenario: 加载趋势数据
- **WHEN** 趋势图组件请求数据
- **THEN** 调用 `getDashboardData(days)` 返回趋势数据

### Requirement: 用户搜索使用前端 mock
用户搜索 SHALL 直接调用 `src/mocks/adminData.ts` 中的 `searchUsers()`。

#### Scenario: 搜索用户
- **WHEN** 管理员在用户搜索框输入关键词
- **THEN** 调用 `searchUsers(q)` 返回匹配的用户列表

### Requirement: Gateway 健康检查和项目配置使用前端 mock
Gateway 健康检查 SHALL 始终返回可用状态，项目配置 SHALL 返回 mock 配置数据。

#### Scenario: Gateway 健康检查
- **WHEN** OpenClawAdmin 组件定时检查 Gateway 健康状态
- **THEN** 直接标记 Gateway 为可用，不发起网络请求

#### Scenario: 获取项目配置
- **WHEN** OpenClawAdmin 组件加载项目配置
- **THEN** 直接设置 mock 配置数据，不发起网络请求

### Requirement: 构建无错误
所有改造完成后 SHALL 通过 `npm run build` 构建，无 TypeScript 类型错误。

#### Scenario: 构建通过
- **WHEN** 执行 `npm run build`
- **THEN** 构建成功，dist 目录生成完整产物
