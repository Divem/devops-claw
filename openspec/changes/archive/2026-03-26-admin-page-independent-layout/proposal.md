## Why

当前 OpenClaw 管理页面（OpenClawAdmin.vue）使用顶部 Tab 在「控制台」和「代码模式」之间切换，仅展示两个视图。参考飞书 OpenClaw Gateway Dashboard 的设计（`docs/images/11openclaw-管理面板-控制台.png`），应改为左侧固定导航 + 右侧内容区的独立页面布局，完整展示所有管理功能入口。

## What Changes

- 将管理页面从「顶部 Tab 切换」重构为「左侧侧边导航 + 右侧内容区」布局
- 左侧导航包含完整菜单项：聊天（控制台）、概览、通道、实例、会话、使用情况、定时任务、配置（代码模式）、日志、文档
- 右侧内容区根据导航选择显示对应的 iframe 嵌入内容
- 管理页面撑满整个视口，不保留首页的 Header 和 FeatureList
- 顶部信息栏精简，集成到侧边导航顶部

## Capabilities

### New Capabilities
- `admin-page-layout`: OpenClaw 管理页面独立布局，左侧侧边导航 + 右侧内容区，参考飞书 OpenClaw Gateway Dashboard 设计

### Modified Capabilities

## Impact

- `OpenClawAdmin.vue`：重构为侧边导航 + 内容区布局
- `App.vue`：管理页面视图需要全屏展示，移除首页 Header/Footer 等元素
- 新增左侧导航组件（可内联在 OpenClawAdmin 中）
- Gateway 反向代理 mock：需支持更多路由路径
