## Context

HeroSection 当前引用 `public/landing/hero-shrimps.png`（67 字节占位文件），页面首屏仅有纯文字和按钮。需要生成一张视觉配图来丰富首屏体验。

技术约束：
- 图片存储在 `public/landing/` 目录，通过绝对路径 `/landing/hero-shrimps.png` 引用
- 品牌主色 `#006eff`，需在配图中体现
- 当前展示尺寸：桌面端 520px 宽，移动端 280px 宽
- 项目已有 baoyu-image-gen / gemini-image 等 AI 图片生成技能可用

## Goals / Non-Goals

**Goals:**
- 生成一张高质量 Hero 配图，风格匹配 DevOps Claw 品牌调性
- 替换占位文件为正式配图
- 优化图片展示样式（尺寸、alt 文本）

**Non-Goals:**
- 不修改 HeroSection 的布局结构
- 不引入新的图片 CDN 或懒加载库
- 不做多张配图轮播

## Decisions

**Decision 1: 使用 Gemini 生成 Hero 配图**
- 使用 gemini-image 技能生成配图
- Prompt 主题：DevOps/AI 助手概念插画，蓝色品牌色调，扁平或 3D 风格
- **Rationale**: 项目已集成 gemini-image，无需额外依赖。AI 生成可快速迭代。

**Decision 2: 保持 PNG 格式引用路径不变**
- 生成后将文件覆盖写入 `public/landing/hero-shrimps.png`
- 无需修改 Vue 模板中的 src 路径
- **Rationale**: 最小变更，仅替换文件内容。

**Decision 3: 图片内容方向**
- 主题：AI 智能助手 + DevOps 自动化概念
- 色调：品牌蓝 #006eff 为主，搭配白色/浅灰背景
- 风格：现代科技感，扁平化或轻 3D 插画
- 构图：居中主体，适合在标题上方展示

## Risks / Trade-offs

**[Risk] AI 生成图片质量不稳定**
→ Mitigation: 可多次生成挑选最佳结果，或微调 prompt 重试。

**[Trade-off] 静态图片 vs 动态动画**
使用静态 PNG 而非 Lottie/SVG 动画，视觉效果较简单但实现成本极低、加载快。

## Open Questions

（无）
