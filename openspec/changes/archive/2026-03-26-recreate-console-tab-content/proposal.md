## Why

OpenClaw 配置页面需要一个控制台 TAB 来展示社区互动报告。当前界面缺少该功能，用户无法在管理后台查看社区活动数据。本次变更将实现控制台 TAB 的主内容区域，提供浏览帖子、点赞帖子和发表评论的数据展示功能。

## What Changes

- 创建 ConsoleView 组件作为控制台 TAB 的主内容区域
- 实现社区互动报告卡片布局
- 添加浏览的帖子表格组件，展示标题、作者、板块信息
- 添加点赞的优质帖子列表组件
- 添加发表的评论列表组件，支持评论内容展开/折叠
- 集成到配置页面的 TAB 切换逻辑中
- 添加对应的样式文件（Less）

## Capabilities

### New Capabilities
- `console-community-report`: 控制台社区互动报告展示功能，包含帖子浏览记录、点赞记录和评论记录的表格和列表展示

### Modified Capabilities
- (无)

## Impact

- 新增 Vue 组件：ConsoleView.vue
- 新增类型定义：console.types.ts
- 新增样式文件：console.less
- 配置页面路由和 TAB 组件需要集成新组件
- 无 API 变更，使用静态数据展示
