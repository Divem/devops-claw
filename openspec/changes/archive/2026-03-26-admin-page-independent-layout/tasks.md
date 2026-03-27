## 1. App.vue 全屏布局隔离

- [x] 1.1 将 OpenClawAdmin 从 `.app-main` 中移出，当 `pageState === 'admin'` 时独立渲染，不包含 Header、Footer、FeatureList 等首页元素
- [x] 1.2 为管理页面添加全屏样式（width: 100vw, height: 100vh），确保不受 `.app-main` 的 padding 和居中约束影响

## 2. 侧边导航组件

- [x] 2.1 重构 OpenClawAdmin.vue 为左右布局结构：左侧固定宽度侧边导航（220px）+ 右侧弹性内容区
- [x] 2.2 实现侧边导航顶部项目信息区：返回按钮、项目头像、项目名称、状态标签、去对话按钮
- [x] 2.3 实现侧边导航菜单项列表：聊天、概览、通道、实例、会话、使用情况、定时任务、配置、日志、文档，每项包含图标和文字
- [x] 2.4 实现菜单项选中状态高亮样式，默认选中「聊天」

## 3. 内容区与 iframe

- [x] 3.1 更新 iframe src 逻辑：根据选中的菜单项映射到对应的 Gateway 路径（chat→/chat, config→/code 等）
- [x] 3.2 调整 iframe 和内容区高度为 100vh，移除原有的 `calc(100vh - 200px)` 和 `min-height: 500px` 限制
- [x] 3.3 移除原有的顶部信息栏和 Tab 切换组件，将「返回」和「去对话」功能集成到侧边导航

## 4. 状态保留与清理

- [x] 4.1 保留 iframe 加载骨架屏动画和 Gateway 不可用错误处理逻辑
- [x] 4.2 清理不再使用的 Tab 相关代码（tabs 数组、activeTab 变量、Tab 样式）
