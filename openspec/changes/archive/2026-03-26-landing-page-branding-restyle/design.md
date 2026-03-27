## Context

落地页已在 `landing-page-feishu-style` 变更中实现，包含 4 个组件：LandingPage、HeroSection、FeatureCards、LandingFooter。当前代码存在两类问题：

1. **品牌不一致**：使用飞书品牌文案（"飞书 OpenClaw"、"飞书 IM" 等），应为 DevOps Claw
2. **样式偏离规范**：多处硬编码值未遵循 `docs/design-token.md`（MTP Web 设计令牌）

设计令牌关键约束（来自 design-token.md）：
- 展示字号 `40px`（非 48px），字重标题 `600`（非 700）
- 标准交互动画 `0.2s ease-in-out`
- 按钮圆角 `6px`，卡片圆角 `4px`
- 卡片标准阴影 `0px 0px 8px 0px rgba(2, 2, 2, 0.1)`
- 响应式断点从 `sm: 1024px` 开始
- 链接颜色 `#2d8cf0`，hover `#57a3f3`
- Less 变量优先，不硬编码颜色值

## Goals / Non-Goals

**Goals:**
- 所有飞书品牌文案替换为 DevOps Claw 品牌
- 样式值严格对齐 design-token.md 规范
- 更新测试断言以匹配新文案
- 构建和测试全部通过

**Non-Goals:**
- 不修改组件结构或新增功能
- 不修改设计令牌文件本身
- 不调整 Layout 或增加新页面区块

## Decisions

**Decision 1: 品牌文案映射**
- "飞书 OpenClaw" → "DevOps Claw"
- "飞书" → "DevOps"（上下文为平台时）
- "飞书 IM" → "即时通讯"
- "飞书官方插件" → "官方集成插件"
- "飞书体系" → "企业内网"
- 导航链接：飞书官网/妙塔/aily/aPaaS/集成平台 → DevOps Claw 文档/API/社区/状态页/更新日志
- 版权：北京飞书科技有限公司 → DevOps Claw Team
- **Rationale**: 将飞书特定产品替换为通用 DevOps 品牌表述。

**Decision 2: 样式值修正**
- Hero 标题：`48px / 700` → `40px / 600`（对齐展示字号和标题字重规范）
- 按钮 border-radius：`24px` → `6px`（对齐 @radiusButton）
- 卡片 hover transform：保留 `translateY(-4px)`，box-shadow 改为标准阴影
- 卡片过渡：`0.3s` → `0.2s ease-in-out`（标准交互时长）
- 响应式断点：`768px` → `1024px`（对齐 sm 断点）
- 页脚深色背景：`#1a1a1a` 保留（对齐深色主题主背景）
- **Rationale**: 逐项对照 design-token.md 表格修正。

**Decision 3: 不引入新 CSS 变量**
- 现有 `variables.less` 已定义所需变量，不新增
- 缺少的令牌（如链接色）直接使用 design-token.md 中的值
- **Rationale**: 最小变更原则，仅修正现有代码。

## Risks / Trade-offs

**[Risk] 品牌文案修改可能遗漏**
→ Mitigation: 全局搜索 "飞书" 确保零遗漏。

**[Trade-off] 断点从 768px 改为 1024px 会影响平板体验**
- 原断点在平板上为桌面布局，新断点在平板上会提前切换为移动布局
- 这是设计令牌规范的要求，项目本身面向桌面端（sm 从 1024px 开始）

## Open Questions

（无）
