## Why

首屏 Hero 区域的 Tips 气泡在每次鼠标移动后重新显示时，都会从第一条文案重新开始（`hideTips()` 重置 `currentTipIndex = 0`）。这导致用户反复看到相同的开头文案，后面的 Tips 永远无法被看到，循环展示形同虚设。

## What Changes

- 鼠标移动导致 Tips 隐藏后，再次显示时从**下一条**文案开始，不回退到第一条
- Tips 始终按顺序向后滚动，形成连续的阅读体验
- 完整轮播完所有 Tips 后，从第一条重新开始新一轮循环

## Capabilities

### New Capabilities

（无新增能力）

### Modified Capabilities

- `cursor-tips-loop`: 修改"移动隐藏机制"的行为——隐藏时不再重置 tip 索引，改为推进到下一条

## Impact

- `src/composables/useCursorTips.ts` — 核心逻辑修改
- `openspec/specs/cursor-tips-loop/spec.md` — 更新规范
