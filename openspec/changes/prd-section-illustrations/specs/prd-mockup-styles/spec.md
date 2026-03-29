## ADDED Requirements

### Requirement: Mockup container CSS class
PRD HTML 文档 SHALL 定义 `.prd-mockup` CSS 类作为所有原型图的统一容器，样式包含：`background: var(--bg-page)`、`border: 1px solid var(--border)`、`border-radius: 8px`、`padding: 24px`、`margin: 24px 0`、`overflow-x: auto`。

#### Scenario: 原型图在页面中正确渲染
- **WHEN** 在 PRD HTML 中插入 `<div class="prd-mockup">` 元素
- **THEN** 该元素显示为浅灰背景、圆角边框的卡片容器，与 PRD 现有 `.info-box` 风格一致

#### Scenario: 移动端横向溢出处理
- **WHEN** 原型图宽度超过移动设备屏幕宽度
- **THEN** 容器显示横向滚动条，不破坏页面布局

### Requirement: Mockup title label
PRD HTML 文档 SHALL 定义 `.prd-mockup-title` CSS 类，在原型图容器顶部显示"页面原型"标签，样式为：`font-size: 12px`、`color: var(--text-muted)`、`margin-bottom: 16px`、`padding-bottom: 8px`、`border-bottom: 1px dashed var(--border)`。

#### Scenario: 原型图标题正确显示
- **WHEN** 在原型图容器内使用 `<div class="prd-mockup-title">页面原型 - xxx</div>`
- **THEN** 标签以浅灰色虚线分隔显示在原型图顶部

### Requirement: Browser frame mockup
PRD HTML 文档 SHALL 定义 `.prd-mockup-browser` CSS 类，模拟浏览器窗口外框，包含：顶部地址栏（含三个圆点图标和地址输入框）和下方内容区域。

#### Scenario: 浏览器外框正确渲染
- **WHEN** 使用 `.prd-mockup-browser` 类
- **THEN** 显示带地址栏的浏览器外框，内容区域使用白色背景

### Requirement: Component placeholder styles
PRD HTML 文档 SHALL 定义以下组件占位符样式类：
- `.prd-btn` — 按钮占位符（支持 primary/secondary/danger 变体）
- `.prd-input` — 输入框占位符
- `.prd-card` — 卡片占位符
- `.prd-tag` — 状态标签占位符（支持 success/warning/danger/info 变体）
- `.prd-sidebar` — 侧边栏占位符
- `.prd-toolbar` — 工具栏占位符

#### Scenario: 按钮占位符正确显示
- **WHEN** 使用 `<span class="prd-btn prd-btn-primary">创建</span>`
- **THEN** 显示蓝色背景、白色文字的按钮样式

#### Scenario: 状态标签正确着色
- **WHEN** 使用 `<span class="prd-tag prd-tag-success">运行中</span>`
- **THEN** 显示绿色背景的状态标签

### Requirement: Mockup grid layout
PRD HTML 文档 SHALL 支持 `.prd-grid-2`、`.prd-grid-3`、`.prd-grid-4` CSS 类实现原型图内的网格布局，使用 CSS Grid，列间距 `16px`，响应式自适应。

#### Scenario: 三列网格在窄屏降级为单列
- **WHEN** 在宽度小于 600px 的屏幕上使用 `.prd-grid-3`
- **THEN** 网格降级为单列垂直排列

### Requirement: Mockup flex layout
PRD HTML 文档 SHALL 支持 `.prd-flex`、`.prd-flex-center`、`.prd-flex-between`、`.prd-flex-col` CSS 类实现原型图内的 Flex 布局。

#### Scenario: flex between 正确分散对齐
- **WHEN** 使用 `.prd-flex prd-flex-between` 包裹子元素
- **THEN** 子元素在主轴上两端对齐，中间等距分布
