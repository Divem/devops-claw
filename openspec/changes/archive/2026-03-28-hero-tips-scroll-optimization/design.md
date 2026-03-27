## Context

`useCursorTips` composable 当前在 `hideTips()` 中将 `currentTipIndex` 重置为 0，导致每次鼠标移动→停止→Tips 重新出现时，都从第一条文案开始。用户的需求是 Tips 应该像滚动条一样持续向前推进，每次显示新位置时接着上次的进度继续。

## Goals / Non-Goals

**Goals:**
- 鼠标移动隐藏 Tips 后，再次显示时从下一条文案继续
- Tips 索引始终递增，形成连续阅读体验
- 轮播完所有文案后自然回到第一条

**Non-Goals:**
- 不改变 Tips 的触发条件（停留时间、可见性检测）
- 不改变 Tips 的视觉样式或位置计算
- 不引入持久化存储（页面刷新后重置）

## Decisions

**D1: hideTips 不再重置索引**
- `hideTips()` 移除 `currentTipIndex.value = 0`
- 隐藏时仅隐藏气泡和清除切换定时器，保留索引位置

**D2: showTips 自动推进到下一条**
- `showTips()` 调用时将索引 +1，确保用户看到的永远是"下一条"
- 若当前已是最后一条，则回到第一条（`(index + 1) % tips.length`）

**D3: 切换定时器逻辑不变**
- 每 3 秒自动切换下一条的 setInterval 保持不变
- 仅调整首次显示时的起始位置
