## 1. 重写 useCursorTips composable

- [x] 1.1 移除 mousemove / mouseenter / mouseleave 事件监听逻辑
- [x] 1.2 添加 IntersectionObserver 检测 Hero 容器是否进入视口
- [x] 1.3 添加 scroll 事件监听（window 级别，节流 100ms）
- [x] 1.4 实现滚动停止检测：滚动停止 1.5 秒后触发 showTips（仅在 Hero 可见时）
- [x] 1.5 实现滚动时立即隐藏 Tips 的逻辑
- [x] 1.6 移除 position 相关 ref 和返回值（定位交由 CSS 处理）
- [x] 1.7 onUnmounted 时清理 IntersectionObserver 和 scroll 监听

## 2. 修改 CursorTips 组件定位

- [x] 2.1 移除 position prop（不再需要光标坐标）
- [x] 2.2 将 `.cursor-tips` 的 `position: fixed` 改为 `position: absolute`
- [x] 2.3 设置定位为 `bottom: -20px; right: -20px`（图片右下角气泡）
- [x] 2.4 移除 tipsStyle computed（不再用 transform 跟随光标）
- [x] 2.5 调整气泡箭头方向为向上指向图片（或去掉箭头改为圆角气泡风格）

## 3. 更新 HeroSection 文案和集成

- [x] 3.1 将 `heroTips` 数组替换为 10 条小龙虾风格文案：
  - 终于不用折腾环境啦，一键安装太省心～
  - 解压即用，告别繁琐配置，快乐起飞！
  - 找了好久的纯净版，这下完美搞定 ✨
  - 小白也能轻松上手，全程零操作压力
  - OpenClaw 官方纯净版，安全无捆绑
  - 一键部署，全平台兼容，开箱即用
  - 极速安装 + 稳定运行，体验拉满
  - 内置优化配置，无需手动调试
  - 小龙虾探头：主人快带我回家～
  - 钳钳发力，帮你一键装好 OpenClaw！
- [x] 3.2 给 `.hero-illustration` 加 `position: relative`（为 Tips 绝对定位提供锚点）
- [x] 3.3 将 `CursorTips` 移入 `.hero-illustration` 容器内部
- [x] 3.4 移除传给 CursorTips 的 `:position` prop

## 4. 更新测试

- [x] 4.1 更新 useCursorTips 测试：移除 mousemove 相关用例，添加 scroll + IntersectionObserver mock 测试
- [x] 4.2 验证：滚动停止 1.5 秒后 isVisible 变为 true
- [x] 4.3 验证：滚动时 isVisible 立即变为 false
- [x] 4.4 运行 `npm run typecheck` 确认无 TS 错误
- [x] 4.5 运行 `npm run test` 确认全部测试通过
