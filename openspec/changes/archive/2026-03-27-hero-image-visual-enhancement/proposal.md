## Why

首页落地页 Hero Section 的龙虾插画（520px 宽）作为首屏视觉焦点，存在两个问题：一是图片尺寸偏小，缺乏视觉冲击力，无法在用户进入页面的第一眼产生强烈印象；二是图片与周围区域（上导航栏、下 FeatureCards）之间没有过渡效果，显得生硬割裂，视觉上缺乏整体感与沉浸感。

## What Changes

- **放大龙虾主图**：将 Hero 插画从固定 520px 提升至更大尺寸，增强首屏视觉冲击力
- **添加图片融合过渡效果**：在 Hero Section 上下边界添加渐变/模糊等过渡效果，使龙虾图片与页面背景自然融合
- **优化进入动画**：为龙虾图片添加入场动画，提升首屏加载时的动态感
- **调整布局结构**：优化 Hero Section 的层级关系，让图片成为更核心的视觉焦点

## Capabilities

### New Capabilities
- `hero-visual-impact`: 首屏龙虾图片的视觉增强，包含尺寸放大、融合过渡与入场动画

### Modified Capabilities
（无现有 spec 需要修改）

## Impact

- **组件修改**：`src/components/landing/HeroSection.vue`（主要改动）、`src/components/HeroImageZoom.vue`（可能需要增强交互效果）
- **样式修改**：`src/assets/styles/variables.less`（可能新增 Hero 相关变量）
- **资源**：`public/landing/hero-shrimps.png`（如需更大尺寸图片则需替换）
- **兼容性**：需确保响应式布局在移动端（1024px 断点以下）仍然正常
- **性能**：入场动画需考虑 `prefers-reduced-motion` 无障碍适配
