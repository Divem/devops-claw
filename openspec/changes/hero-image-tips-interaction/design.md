## Context

当前首页 Hero 区域使用静态图片展示，视觉层次较为单一。用户首次访问时缺少引导性的交互元素来展示产品特色功能。本项目基于 Vue 3 + TypeScript 技术栈，需要实现轻量级的前端交互增强。

## Goals / Non-Goals

**Goals:**
- 实现 Hero 图片悬停放大效果，提升视觉冲击力
- 创建可复用的光标位置 Tips 组件，支持循环展示
- 确保动画性能流畅，不阻塞主线程
- 保持代码可维护性和可测试性

**Non-Goals:**
- 后端数据持久化（Tips 内容为前端静态配置）
- 移动端适配（仅在桌面端展示 Tips）
- 多语言支持（当前仅中文）
- Tips 点击交互或跳转功能

## Decisions

### 1. 使用 CSS transform 实现图片放大
- **选择**: 使用 CSS `transform: scale()` 配合 `transition` 实现放大效果
- **理由**: 硬件加速，性能优于 width/height 修改，60fps 流畅度
- **替代方案**: 使用 `width/height` 动画 - 会导致重排，性能较差

### 2. 使用 Vue Composable 封装 Tips 逻辑
- **选择**: 创建 `useCursorTips` composable 管理鼠标监听、计时器和状态
- **理由**: 逻辑与视图分离，便于测试和复用
- **替代方案**: 直接在组件中实现 - 导致代码重复，难以维护

### 3. 使用 requestAnimationFrame 优化鼠标位置更新
- **选择**: Tips 位置使用 `transform: translate()` 实时跟随鼠标
- **理由**: 避免频繁重排，使用 RAF 节流更新位置
- **替代方案**: CSS `left/top` 修改 - 触发重排，性能较差

### 4. Tips 内容使用静态配置
- **选择**: Tips 文案存储在组件的 const 数组中
- **理由**: 无需 API 调用，即时展示，降低复杂度
- **替代方案**: 从后端获取 - 增加延迟和依赖

## Risks / Trade-offs

| 风险 | 缓解措施 |
|------|----------|
| 鼠标快速移动导致 Tips 频繁闪烁 | 使用防抖策略，移动时延迟 50ms 再隐藏 |
| Tips 遮挡页面重要元素 | 限制 Tips 显示区域在 Hero 范围内，不遮挡导航 |
| 动画性能在低端设备卡顿 | 使用 `will-change` 提示，提供 `prefers-reduced-motion` 媒体查询支持 |
| 无障碍访问问题 | 添加 `aria-live="polite"` 确保屏幕阅读器能播报 Tips |

## Migration Plan

1. **开发阶段**：在 feature 分支实现，不影响生产环境
2. **测试阶段**：验证动画流畅度和交互逻辑
3. **发布阶段**：直接部署，无数据库迁移或配置变更
4. **回滚策略**：回退到上一版本即可，无数据风险

## Open Questions

- 是否需要支持自定义 Tips 内容（通过 props 传入）？
- 是否需要记录用户已看过的 Tips，避免重复展示？
- 是否需要支持 Tips 的关闭/不再提示功能？
