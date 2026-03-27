## Why

当前 OpenClaw 配置页面只有「控制台」和「代码模式」两种视图，用户在查看配置时缺少一种更直观的命令行终端风格的展示方式。添加终端标签页可以提供类似 Ubuntu 终端的视觉效果，增强用户体验，让配置展示更加专业和技术化。

## What Changes

- 在配置页面的标签栏中，在「代码模式」后添加新的「终端」标签
- 点击「终端」标签后，下方内容区域显示终端风格的界面
- 终端界面采用深色背景（#1e1e1e 或类似），使用等宽字体（Monaco, Consolas, 'Courier New'）
- 显示模拟的终端内容，包括：
  - 系统欢迎信息（Welcome to Ubuntu...）
  - 系统信息统计（System load, Memory usage 等）
  - 配置内容以命令行形式展示
  - 底部显示命令提示符（如 `root@openclaw:~#`）

## Capabilities

### New Capabilities

- `config-terminal-view`: 配置页面的终端视图模式，提供类 Ubuntu 终端的 UI 展示

### Modified Capabilities

- （无现有能力需要修改需求，仅 UI 层添加新标签页）

## Impact

- **UI 组件**：需要在配置页面组件中添加新的标签页和终端视图组件
- **样式**：新增终端主题样式（深色背景、绿色/白色文字、等宽字体）
- **依赖**：可能需要 xterm.js 或其他终端模拟库（可选，也可纯 CSS 实现）
- **无 API 变更**：纯前端 UI 变更
- **无破坏性变更**：新增功能，不影响现有控制台和代码模式
