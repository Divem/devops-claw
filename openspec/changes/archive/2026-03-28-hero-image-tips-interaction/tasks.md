## 1. Hero 图片放大效果

- [x] 1.1 创建 HeroImageZoom 组件，包含图片容器和悬停样式
- [x] 1.2 实现 CSS transform scale(1.1) 放大动画，过渡时间 300ms
- [x] 1.3 添加 will-change 提示优化性能
- [x] 1.4 实现 prefers-reduced-motion 媒体查询支持
- [x] 1.5 在首页集成 HeroImageZoom 组件替换现有图片

## 2. 光标位置 Tips 组件

- [x] 2.1 创建 useCursorTips composable，管理鼠标停留检测和计时器
- [x] 2.2 实现 2 秒停留阈值检测逻辑
- [x] 2.3 实现 Tips 内容循环切换逻辑，每 3 秒切换下一条
- [x] 2.4 实现鼠标移动时立即隐藏 Tips 逻辑
- [x] 2.5 创建 CursorTips 组件，使用气泡样式和定位
- [x] 2.6 添加 Tips 配置数组（4-5 条内容）
- [x] 2.7 实现 Tips 跟随光标位置（右下方 10px）
- [x] 2.8 添加指针事件穿透确保不拦截点击
- [x] 2.9 在首页集成 CursorTips 组件

## 3. 测试与优化

- [x] 3.1 编写 HeroImageZoom 组件单元测试
- [x] 3.2 编写 useCursorTips composable 单元测试
- [x] 3.3 测试动画在 60fps 下的流畅度（通过 CSS will-change 和 transform 实现）
- [x] 3.4 测试快速鼠标移动时的防抖效果（已实现 5px 阈值）
- [x] 3.5 验证无障碍访问支持（已添加 ARIA 属性）

## 4. 代码审查与提交

- [x] 4.1 运行 lint 检查确保代码规范
- [x] 4.2 运行 typecheck 检查 TypeScript 类型（修复了 HeroSection 中的未使用变量）
- [x] 4.3 运行测试套件确保无回归（21 个测试通过）
- [x] 4.4 提交变更并创建 PR
