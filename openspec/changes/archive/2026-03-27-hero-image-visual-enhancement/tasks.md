## 1. 图片尺寸放大

- [x] 1.1 将 `HeroSection.vue` 中 `.shrimp-image` 宽度从固定 `520px` 改为 `clamp(520px, 65vw, 800px)`
- [x] 1.2 移除响应式断点中 `.shrimp-image { width: 280px }` 的覆盖，改用 clamp 自动适配
- [x] 1.3 验证移动端（<1024px）图片不超出 90vw 且布局正常

## 2. 图片融合过渡效果

- [x] 2.1 在 `.hero-illustration` 添加 `::before` 伪元素，实现顶部渐变遮罩（从页面背景色到透明）
- [x] 2.2 在 `.hero-illustration` 添加 `::after` 伪元素，实现底部渐变遮罩（从透明到页面背景色）
- [x] 2.3 移除 `.hero-image-zoom` 的 `border-radius: 12px` 和 `overflow: hidden`，让图片边缘自然消融

## 3. 入场动画

- [x] 3.1 在 `HeroSection.vue` 的 `<style>` 中定义 `@keyframes hero-float-in` 动画（fade-in + translateY + scale）
- [x] 3.2 为 `.shrimp-image` 添加入场动画，duration 800ms，ease-out
- [x] 3.3 为 `.hero-title`、`.hero-subtitle`、`.hero-cta` 添加错开延迟的入场动画（各延迟 ~150ms）
- [x] 3.4 添加 `@media (prefers-reduced-motion: reduce)` 媒体查询，禁用所有入场动画

## 4. 图片突破容器边界

- [x] 4.1 为 `.hero-illustration` 添加负 `margin-top`，让图片顶部向上延伸
- [x] 4.2 确保向上延伸不遮挡固定导航栏内容（考虑 `headerHeight: 57px`）
- [x] 4.3 调整 `.hero-section` 的 `overflow` 和 `padding-top` 配合图片溢出效果

## 5. 验证与收尾

- [x] 5.1 运行 `npm run build` 确保无编译错误
- [x] 5.2 运行 `npx vitest run` 确保现有测试通过
- [ ] 5.3 在浏览器中验证桌面端和移动端视觉效果
