## Why

现有 Tips 功能基于鼠标悬停停留触发，用户实际访问时以滚动浏览为主，导致 Tips 几乎无法被看到。同时当前 Tips 文案是通用快捷键说明，缺乏产品个性和情感共鸣，需要换成更能体现 DevOps Claw（小龙虾）IP 形象的有趣表达。

## What Changes

- **触发方式改为滚动停留**：监听页面滚动事件，用户滚动至 Hero 区域并停止滚动 1.5 秒后自动显示 Tips；再次滚动时立即隐藏
- **Tips 定位改为相对 Hero 图片固定位置**：不再跟随光标，而是在 Hero 图片的右下角或左侧固定出现，风格更像图片配套说明气泡
- **文案全面升级为小龙虾风格**：用用户痛点 + 平台价值 + 小龙虾拟人情绪表达的有趣语言重写所有 Tips 内容
- **Tips 数量扩充**：从 5 条扩展到 10 条，覆盖更多场景（安装痛点、部署价值、安全性、小龙虾心情等）

## Capabilities

### New Capabilities

- `scroll-pause-tips`: 基于滚动停留的 Hero 区 Tips 触发与定位机制

### Modified Capabilities

- `cursor-tips-loop`: 触发逻辑从鼠标悬停改为滚动停留，定位从跟随光标改为图片固定位置，文案更新为小龙虾风格

## Impact

- `src/composables/useCursorTips.ts`：重写触发逻辑，增加 scroll 事件监听，移除 mousemove 依赖
- `src/components/CursorTips.vue`：定位样式从 fixed + transform 改为相对 Hero 图片的绝对定位气泡
- `src/components/landing/HeroSection.vue`：更新 Tips 文案数组，调整 Tips 组件集成方式
- 测试文件：更新 useCursorTips 相关测试用例
