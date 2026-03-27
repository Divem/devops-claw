## Why

落地页当前使用了飞书品牌文案和部分硬编码样式值，与 DevOps Claw 自身品牌定位不符，且部分样式未遵循 `docs/design-token.md` 中定义的设计令牌规范（如字号 48px/700 超出规范、圆角 24px 非标准值、动画时长 0.3s 应为 0.2s 等）。需要统一品牌表述并严格对齐设计令牌。

## What Changes

- HeroSection 标题从 "飞书 OpenClaw" 改为 "DevOps Claw"
- 副标题中 "飞书" 替换为 "DevOps"
- FeatureCards 描述文案中 "飞书 IM" / "飞书官方插件" / "飞书体系" 改为 DevOps 对应表述
- LandingPage 顶部导航品牌名从 "飞书" 改为 "DevOps Claw"
- LandingFooter 品牌名、导航链接、版权信息全部替换
- 样式对齐 design-token.md：
  - 字号：Hero 标题 48px→40px（展示字号），副标题字重 400
  - 字重：标题统一 600，移除 700
  - 圆角：按钮 24px→6px（@radiusButton），卡片圆角使用标准值 4px/6px
  - 阴影：卡片 hover 使用标准阴影 `0px 0px 8px 0px rgba(2, 2, 2, 0.1)`
  - 动画：卡片过渡 0.3s→0.2s（标准交互）
  - 断点：响应式断点从 768px 调整为 1024px（sm 断点），对齐 Tailwind 配置
  - 链接颜色：使用设计令牌链接色 `#2d8cf0` 而非 `@primaryColor`
  - 间距：模块间距统一使用 16px 倍数

## Capabilities

### New Capabilities

（无新增能力）

### Modified Capabilities

- `landing-page`: 品牌文案替换，导航栏品牌名和链接文案变更
- `hero-section`: 标题文案变更，样式值对齐设计令牌
- `feature-cards`: 描述文案变更，卡片样式对齐设计令牌
- `landing-footer`: 品牌名、导航链接、版权信息全部替换

## Impact

- **前端组件**: 修改 4 个 Vue 组件（LandingPage、HeroSection、FeatureCards、LandingFooter）
- **测试文件**: 需更新 3 个测试文件中的断言文案
- **无 API / 后端变更**
- **无新增依赖**
