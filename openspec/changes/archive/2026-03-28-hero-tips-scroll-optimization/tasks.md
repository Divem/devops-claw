## 1. 核心逻辑修改

- [x] 1.1 `hideTips()` 移除 `currentTipIndex.value = 0`，不再重置索引
- [x] 1.2 `showTips()` 调用时将索引推进到下一条 `(currentTipIndex.value + 1) % tips.length`
