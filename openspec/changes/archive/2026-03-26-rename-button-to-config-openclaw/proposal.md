## Why

创建完成后的结果页面当前有一个【打开项目】按钮，直接跳转到外部 OpenClaw Gateway Dashboard。这导致用户离开 DevOps 平台，体验断裂。需要将按钮改为【配置 OpenClaw】，点击后在平台内嵌入 OpenClaw 管理页面（包含控制台聊天和代码配置模式），提供一站式管理体验。

## What Changes

- 将创建完成页面和项目卡片上的【打开项目】按钮文案改为【配置 OpenClaw】
- 点击【配置 OpenClaw】后进入平台内的 OpenClaw 管理页面（而非跳转外部链接）
- 新增 OpenClaw 管理页面，包含：
  - 控制台标签页：嵌入 Gateway Dashboard 的聊天界面（参考 `11openclaw-管理面板-控制台.png`）
  - 代码模式标签页：嵌入 `openclaw.json` 配置编辑器（参考 `13openclaw-管理面板-代码模式.png`）
- 管理页面顶部显示项目信息、连接状态和【去对话】快捷入口

## Capabilities

### New Capabilities
- `openclaw-admin-page`: OpenClaw 管理页面，包含控制台（聊天调试）和代码模式（配置编辑）两个标签页，通过 iframe 嵌入 Gateway Dashboard

### Modified Capabilities

## Impact

- 创建完成结果页面：按钮文案和跳转目标变更
- 项目卡片组件：【打开项目】按钮改为【配置 OpenClaw】，跳转到平台内管理页面
- 路由：新增 `/projects/:id/admin` 管理页面路由
- Gateway Dashboard：需要以 iframe 方式嵌入，可能涉及跨域和鉴权处理
