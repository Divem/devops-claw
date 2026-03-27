## 1. 按钮文案与导航变更

- [x] 1.1 将创建完成结果页面的【打开项目】按钮文案改为【配置 OpenClaw】，点击导航至 `/projects/:id/admin`
- [x] 1.2 将项目卡片上的【打开项目】按钮文案改为【配置 OpenClaw】，点击导航至 `/projects/:id/admin`

## 2. 管理页面路由与布局

- [x] 2.1 新增前端路由 `/projects/:id/admin`，对应 OpenClaw 管理页面
- [x] 2.2 实现管理页面顶部信息栏：项目名称、连接状态标签（已连接/待配置/断开）、【去对话】按钮
- [x] 2.3 实现标签页（Tab）组件，包含「控制台」和「代码模式」两个标签，默认激活「控制台」

## 3. iframe 嵌入与 loading 状态

- [x] 3.1 实现「控制台」标签页的 iframe 容器，src 指向 `/api/projects/:id/gateway/` 的聊天界面路由
- [x] 3.2 实现「代码模式」标签页的 iframe 容器，src 指向 `/api/projects/:id/gateway/` 的代码编辑路由
- [x] 3.3 实现 iframe 加载中的骨架屏 loading 状态
- [x] 3.4 实现 Gateway 服务不可用时的兜底提示和【重试】按钮

## 4. 后端反向代理

- [x] 4.1 新增后端 API 路由 `/api/projects/:id/gateway/*`，实现反向代理转发至虚拟机 Gateway Dashboard
- [x] 4.2 在代理中间件中添加用户身份验证和项目归属权限校验（非本人项目返回 403）
