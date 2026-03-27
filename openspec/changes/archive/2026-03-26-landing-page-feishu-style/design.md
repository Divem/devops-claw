## Context

DevOps OpenClaw 目前使用 Vue 3 + TypeScript 技术栈，采用 Composition API 和 Pinia 状态管理。项目已有一套成熟的设计系统，包括 MTP Web 设计令牌（颜色 `#006eff`、间距、字体等）、Less 变量和 Tailwind CSS v4。

根据飞书 OpenClaw 落地页截图，需要实现一个营销导向的首屏页面，包含：
- Hero Section：大标题、副文案、CTA按钮、3D虾群插画
- 特性展示：三个卡片展示核心卖点
- 页脚：深色背景，导航链接

现有技术栈完全支持此需求，无需引入新依赖。

## Goals / Non-Goals

**Goals:**
- 创建响应式营销落地页，参考飞书 OpenClaw 设计风格
- 实现 Hero Section，包含标题动画和 3D 虾群插画
- 实现三列特性卡片，使用图标和渐变背景
- 实现深色主题页脚
- 保持与现有设计令牌和品牌一致性
- 首屏加载性能优化（图片懒加载、组件按需渲染）

**Non-Goals:**
- 不实现复杂的路由切换动画（保持简单）
- 不引入额外的动画库（使用 CSS 过渡即可）
- 不修改后端 API（纯前端展示）
- 不实现多语言支持（仅中文）

## Decisions

**Decision 1: 组件拆分策略**
- 将落地页拆分为 4 个独立组件：LandingPage（容器）、HeroSection、FeatureCards、LandingFooter
- **Rationale**: 单一职责原则，便于维护和测试。每个区块可独立迭代。
- **Alternative**: 单一大文件，但会导致代码难以维护。

**Decision 2: 图片资源处理**
- 3D 虾群插画使用静态图片（PNG/SVG），存储在 `public/landing/` 目录
- **Rationale**: 3D 渲染需要专业设计资源，当前使用静态图片更可行。未来可替换为 Lottie 动画或 Three.js。
- **Alternative**: 使用 CSS 绘制简化的虾群，但视觉效果差。

**Decision 3: 响应式断点**
- 使用 Tailwind 标准断点：sm (640px)、md (768px)、lg (1024px)
- **Rationale**: 与现有 Tailwind 配置一致，确保全站响应式行为统一。

**Decision 4: 导航逻辑**
- 添加 "立即部署" 按钮，点击后跳转到现有的项目管理页面
- **Rationale**: 复用现有项目创建流程，不重复造轮子。

**Decision 5: 图标系统**
- 使用 Lucide Vue 图标库（已存在于 naive-ui 生态）
- **Rationale**: 风格统一，无需额外引入图标库。

## Risks / Trade-offs

**[Risk] 3D 虾群插画版权问题**
→ Mitigation: 使用免费可商用的 3D 插画资源，或委托设计团队制作原创素材。当前先用占位图实现功能。

**[Risk] 首屏加载性能**
→ Mitigation: 图片使用 WebP 格式 + lazy loading，CSS 使用 Tailwind purge 减少体积。

**[Risk] 移动端适配复杂**
→ Mitigation: 使用 Tailwind 响应式类，测试主要设备尺寸。

**[Trade-off] 视觉还原度 vs 开发成本**
飞书原设计使用了复杂的 3D 渲染和微交互。我们采用简化的静态图片 + CSS 动画，在 80% 还原度的前提下大幅降低开发成本。

## Migration Plan

无需数据迁移，纯新增页面。部署步骤：
1. 合并代码到主分支
2. 构建并部署静态资源
3. 验证所有图片资源加载正常
4. 监控首屏加载性能

Rollback: 直接回滚到上一版本即可，无数据风险。

## Open Questions

1. 是否需要 A/B 测试不同的 CTA 文案？（后续优化可考虑）
2. 特性卡片的内容是否需要根据实际产品能力调整？
