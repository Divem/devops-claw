## Context

当前落地页 Hero Section（`src/components/landing/HeroSection.vue`）采用纵向堆叠布局：龙虾插画（520px 固定宽度）→ 标题 → 副标题 → CTA 按钮。背景为白到浅灰线性渐变，图片通过 `HeroImageZoom` 组件仅提供 hover scale(1.1) 交互。图片与上下区域之间无任何过渡效果，视觉割裂感明显。

现有设计变量：主色 `#006eff`、页面背景 `#f7f7f7`、标题色 `#30363e`。页面使用 Tailwind v4 + Less 混合样式方案。

## Goals / Non-Goals

**Goals:**
- 龙虾主图成为首屏绝对视觉焦点，产生强烈冲击力
- 图片与页面上下区域（导航栏、FeatureCards）之间有自然的视觉过渡
- 首屏加载时有动态感，提升用户第一印象
- 保持响应式适配，移动端体验不退化
- 尊重 `prefers-reduced-motion` 无障碍设置

**Non-Goals:**
- 不替换龙虾插画素材本身（使用现有 `hero-shrimps.png`）
- 不改变 Hero Section 的文案内容、按钮行为
- 不重新设计导航栏或 FeatureCards 组件
- 不添加复杂的视差滚动效果（保持性能优先）

## Decisions

### 1. 图片尺寸放大策略：使用百分比 + vw 单位替代固定 px

**选择**：将龙虾图片宽度从固定 `520px` 改为 `clamp(520px, 65vw, 800px)`，桌面端最大可达 800px。

**替代方案**：
- A) 固定 800px：在 1080p 以下屏幕可能溢出
- B) 100vw 全宽：图片质量不足，边缘内容过多

**理由**：`clamp()` 方案在宽屏上充分利用空间放大视觉冲击力，在窄屏上自动缩小，无需额外媒体查询即可实现流畅响应。

### 2. 图片融合过渡效果：使用伪元素遮罩渐变

**选择**：在 `.hero-illustration` 的上下方向添加渐变遮罩（`::before` / `::after` 伪元素），使用 `mask-image` 或半透明渐变层让图片边缘自然淡出至页面背景色。

**替代方案**：
- A) 图片溢出容器 + `overflow: hidden` 裁切：过于生硬
- B) CSS `backdrop-filter: blur()` 模糊边缘：性能开销大，兼容性一般
- C) SVG 柔和边缘遮罩：增加资源复杂度

**理由**：伪元素 + 渐变遮罩方案零性能开销，纯 CSS 实现，兼容性好，效果自然。

### 3. 入场动画：CSS `@keyframes` + `animation`

**选择**：使用纯 CSS `@keyframes` 实现图片从下方淡入上浮 + 轻微放大的入场效果，配合 `animation-delay` 错开标题和按钮的出现时序。

**替代方案**：
- A) JavaScript 驱动（IntersectionObserver + GSAP）：功能强大但引入额外依赖
- B) Vue `<Transition>` 组件：适合组件挂载/卸载，不太适合首屏一次性入场

**理由**：纯 CSS 方案零 JS 开销，首屏渲染即可触发，无需等待 JS 加载。通过 `@media (prefers-reduced-motion: reduce)` 禁用动画保障无障碍。

### 4. 图片溢出容器：允许图片向上延伸

**选择**：让 `.hero-illustration` 允许图片向上溢出（负 margin-top），使图片顶部更接近导航栏，打破传统区块界限感。通过 `overflow: visible` + 渐变遮罩确保过渡自然。

**理由**：打破卡片式布局的视觉束缚，让龙虾图片"跃出"容器边界，增强视觉张力和沉浸感。

## Risks / Trade-offs

- **[图片放大后清晰度]** → 使用 `clamp()` 限制最大宽度 800px，现有 PNG 在此尺寸下应保持清晰；如不满足可后续替换更高分辨率素材
- **[入场动画与 MSW 加载冲突]** → 动画使用 CSS 而非 JS，不依赖数据加载状态，无冲突
- **[移动端渐变遮罩效果]** → 移动端图片较小（280px），过渡效果自然减弱，无需额外处理
- **[Hero Section 高度增加]** → 图片放大 + 负 margin 会导致 Hero 区域在首屏占比更大，可能需要微调 FeatureCards 的可见性。通过适当的 padding 约束控制
