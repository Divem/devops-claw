## Context

当前 `useCursorTips` composable 监听 `mousemove` / `mouseenter` / `mouseleave` 事件，用户鼠标在 Hero 区静止 2 秒后触发 Tips，Tips 跟随光标位置（fixed + transform）。文案是 5 条通用产品功能提示。

实际使用场景：用户首次进入首页主要动作是滚动浏览，而非悬停，导致 Tips 几乎不可见。

## Goals / Non-Goals

**Goals:**
- 将触发方式改为：页面滚动到 Hero 区域可见范围内，且用户停止滚动 1.5 秒后自动显示 Tips
- Tips 气泡固定显示在 Hero 图片旁边（图片右下角），不再跟随光标
- 更新 Tips 文案为小龙虾风格（10 条，涵盖安装痛点、平台价值、小龙虾情绪）
- 再次滚动时 Tips 立即隐藏

**Non-Goals:**
- 不做多区域 Tips（仅针对 Hero 区域的图片）
- 不做点击交互或 Tips 关闭按钮
- 不修改 HeroImageZoom 组件

## Decisions

### D1: 触发机制 — scroll + IntersectionObserver 组合

**方案**：用 `IntersectionObserver` 检测 Hero 区域是否进入视口，用 `scroll` 事件（节流 100ms）检测滚动停止。只有在 Hero 区域可见且滚动停止 1.5 秒后才显示 Tips。

**为何优于纯 scroll**：纯 scroll 监听无法知道 Hero 是否在视口内，IntersectionObserver 零性能开销地提供可见性状态。

**为何不用 Intersection threshold 触发**：threshold 仅在进入/离开时触发，无法感知滚动停止，需结合 scroll 停止检测。

### D2: Tips 定位 — 相对 Hero 图片的绝对定位

**方案**：在 `HeroSection.vue` 的 `.hero-illustration` 容器上加 `position: relative`，`CursorTips` 改为 `position: absolute`，定位在图片右下角（bottom: -20px, right: -20px）。

**为何优于 fixed**：fixed 定位无法与图片形成视觉关联；图片右下角的气泡更像"小龙虾说话"，符合 IP 形象。

### D3: 文案管理 — 集中配置在 HeroSection

文案数组从通用配置直接写在 `HeroSection.vue` 的 `heroTips` 中，10 条文案按主题分组：安装痛点（3）、平台价值（4）、小龙虾情绪（3）。不单独抽 i18n 文件，当前阶段没有多语言需求。

## Risks / Trade-offs

- **scroll 事件性能**：100ms 节流足够，Hero 区域是静态内容不触发重排，风险低
- **IntersectionObserver 兼容性**：所有现代浏览器支持，无 polyfill 需求
- **CursorTips 组件定位改变**：从 fixed 改为 absolute 影响组件通用性；后续如需在其他区域复用需评估，当前影响可控

## Migration Plan

1. 修改 `useCursorTips.ts`：替换事件监听逻辑，新增 scroll/IntersectionObserver 触发，移除 position 相关逻辑（定位交给 CSS）
2. 修改 `CursorTips.vue`：position 从 fixed 改为 absolute，移除 transform style prop
3. 修改 `HeroSection.vue`：更新文案数组，调整 CursorTips 组件属性，给 `.hero-illustration` 加 relative
4. 更新测试

无需数据迁移，无回滚风险（纯前端 UI 变更）。
