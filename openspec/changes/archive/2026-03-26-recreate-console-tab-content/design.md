## Context

OpenClaw 是一个 Vue 3 + TypeScript 企业级平台，使用 Composition API 和 Pinia 进行状态管理。当前配置页面需要新增一个"控制台" TAB，用于展示社区互动报告。

从参考图片可以看出，控制台 TAB 包含以下内容区域：
1. 社区互动报告卡片（标题 + emoji）
2. 浏览的帖子表格（6行数据，包含标题、作者、板块列）
3. 点赞的优质帖子列表（4个条目，带项目符号）
4. 发表的评论列表（带序号和评论内容）

项目使用 naive-ui 组件库和 Tailwind CSS v4 进行样式处理，Less 用于 scoped styles。

## Goals / Non-Goals

**Goals:**
- 创建 ConsoleView.vue 组件作为控制台 TAB 的主内容区域
- 实现与参考图片 1:1 的布局和数据展示
- 使用项目现有技术栈（Vue 3 + TypeScript + naive-ui + Tailwind）
- 保持代码风格与项目其他组件一致

**Non-Goals:**
- 后端 API 集成（使用静态数据）
- 交互功能（如点赞、评论操作）
- 响应式布局优化（按桌面端设计实现）
- 单元测试（后续迭代补充）

## Decisions

**1. 组件结构设计**
- 使用单个 ConsoleView.vue 组件承载所有内容
- 数据使用静态数组定义在组件内部（setup 中）
- 不使用子组件拆分，保持简单直观

**2. 表格组件选择**
- 使用 naive-ui 的 NTable 组件实现帖子列表
- 利用组件自带的分隔线和样式，减少自定义 CSS

**3. 样式方案**
- 使用 Less scoped styles 定义组件特有样式
- 使用 Tailwind CSS 工具类处理间距和基础样式
- 参考图片颜色：标题深色 #1f2329，正文 #333，边框 #e5e7eb

**4. 数据结构定义**
- 定义 PostItem 接口：{ title, author, board }
- 定义 LikedPost 接口：{ author, title }
- 定义 Comment 接口：{ id, title, content }

**5. 图标处理**
- 使用 naive-ui 的 NIcon 组件
- 社区报告标题使用 emoji（📊）
- 板块标签使用小圆点图标

## Risks / Trade-offs

**[Risk] 数据硬编码** → 当前使用静态数据展示，后续需要接入 API 时需重构
**[Risk] 响应式不足** → 按固定宽度设计，在小屏幕上可能需要横向滚动
**[Risk] 可访问性** → 未针对屏幕阅读器优化，后续需补充 ARIA 标签

## Migration Plan

1. 创建 ConsoleView.vue 组件文件
2. 在配置页面路由中添加 Console TAB 对应的路由和组件映射
3. 验证组件渲染效果与参考图片一致
4. （可选）后续迭代接入真实 API 数据

## Open Questions

- 是否需要支持数据刷新功能？
- 是否需要空状态展示？
