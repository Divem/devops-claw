## Why

当前 DevOps OpenClaw 项目只有一个基础的项目管理页面，缺少一个吸引用户的营销落地页。参考飞书 OpenClaw 的官方落地页设计，需要一个专业的首屏展示页面来提升产品形象，清晰传达产品价值主张，并引导用户一键部署。这将显著改善用户首次访问的体验，提高转化率。

## What Changes

- 创建全新的 LandingPage 组件，包含飞书风格的首屏设计
- 实现响应式 Hero Section，包含标题、副文案、CTA按钮
- 添加特性展示区域，展示三大核心卖点（一键部署、原生体验、企业安全）
- 实现深色主题页脚，包含导航链接和版权信息
- 使用 3D 风格的角色插画（虾群）作为 Hero 视觉元素
- 遵循现有设计令牌（Design Tokens），保持品牌一致性
- 集成到现有路由系统，作为默认首页

## Capabilities

### New Capabilities
- `landing-page`: 营销落地页组件，包含 Hero、Features、Footer 三个区块
- `hero-section`: 首屏展示区，包含标题、副文案、CTA按钮和视觉插画
- `feature-cards`: 特性卡片组件，展示三大核心卖点
- `landing-footer`: 营销页专用页脚组件

### Modified Capabilities
- (无现有能力需要修改，本次为纯新增页面)

## Impact

- **前端组件**: 新增 4 个 Vue 组件（LandingPage、HeroSection、FeatureCards、LandingFooter）
- **静态资源**: 需要添加 3D 虾群插画图片到 assets
- **路由配置**: App.vue 需添加条件渲染，首次访问展示 LandingPage
- **样式系统**: 复用现有 Less 变量和 Tailwind 配置
- **无 API 变更**: 纯前端展示页面，不涉及后端接口
