## Why

当前管理页面（OpenClawAdmin.vue）只有控制台模式（侧边导航 + iframe 内容）。参考飞书 OpenClaw Gateway Dashboard 的代码模式界面（`docs/images/13openclaw-管理面板-代码模式.png`），需要支持在控制台模式和代码模式之间切换，代码模式提供沉浸式代码编辑器体验。

## What Changes

- 在管理页面添加「控制台」和「代码模式」两种视图模式的切换能力
- 代码模式下隐藏侧边导航，右侧内容区展示 iframe 嵌入的代码编辑器界面
- 在侧边导航顶部添加模式切换入口（切换按钮或选项）
- 控制台模式下保持现有侧边导航 + 内容区布局不变
- 模式切换时保持项目信息（头像、名称、状态）始终可见

## Capabilities

### New Capabilities
- `code-mode-toggle`: 管理页面的控制台/代码模式切换能力，包含切换入口、视图切换动画和状态保持

### Modified Capabilities
- `admin-page-layout`: 侧边导航顶部增加模式切换控件，代码模式下侧边导航折叠或隐藏

## Impact

- `OpenClawAdmin.vue`：新增视图模式状态管理、切换控件、代码模式布局
- 侧边导航组件：增加模式切换按钮
