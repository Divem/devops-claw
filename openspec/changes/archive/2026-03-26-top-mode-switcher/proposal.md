## Why

当前代码模式/控制台的切换放在侧边导航中，通过侧边导航折叠实现模式切换。参考飞书 OpenClaw Gateway Dashboard 设计（`docs/images/13openclaw-管理面板-代码模式.png`），应将模式切换移至顶部，作为页面级别的 Tab 切换，更符合管理后台的交互习惯。代码模式下隐藏侧边导航，内容区全宽展示代码编辑器。

## What Changes

- 移除侧边导航中的「代码模式」和「控制台」切换按钮
- 在管理页面顶部添加「控制台」和「代码模式」两个 Tab 切换入口
- 控制台模式下保持现有侧边导航 + 内容区布局
- 代码模式下隐藏侧边导航，内容区全宽展示代码编辑器 iframe
- 顶部 Tab 栏包含项目信息（头像、名称、状态）和模式切换 Tab

## Capabilities

### New Capabilities
- `top-mode-switcher`: 管理页面顶部的控制台/代码模式 Tab 切换栏

### Modified Capabilities
- `admin-page-layout`: 顶部新增模式切换 Tab 栏，代码模式下隐藏侧边导航
- `code-mode-toggle`: 切换入口从侧边导航移至顶部 Tab，移除侧边折叠行为

## Impact

- `OpenClawAdmin.vue`：新增顶部 Tab 栏、移除侧边导航中的模式切换按钮和折叠逻辑
