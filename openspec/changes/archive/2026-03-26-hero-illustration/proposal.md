## Why

Hero Section 引用的配图 `hero-shrimps.png` 仅为 67 字节的占位文件，实际无视觉内容。落地页首屏缺少视觉焦点，用户第一眼印象仅为纯文字，无法有效传达产品调性。需要生成一张高质量的 Hero 配图来提升页面视觉吸引力。

## What Changes

- 使用 AI 图片生成工具创建一张 Hero 配图，风格匹配 DevOps Claw 品牌调性
- 替换 `public/landing/hero-shrimps.png` 为正式配图（WebP 格式优化）
- 更新 HeroSection.vue 中的图片 alt 文本
- 优化图片展示尺寸和响应式行为

## Capabilities

### New Capabilities

（无新增能力）

### Modified Capabilities

- `hero-section`: 更新 Hero 配图资源，优化图片展示样式

## Impact

- **静态资源**: 替换 `public/landing/hero-shrimps.png`
- **前端组件**: 修改 HeroSection.vue 的 img 标签属性
- **测试**: 更新 HeroSection 测试中的 alt 文本断言
- **无 API / 后端变更**
