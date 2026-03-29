## Why

登录弹窗 (`LoginModal.vue`) 当前设置了 `mask-closable="false"` 且没有关闭按钮，用户一旦触发登录弹窗就无法关闭，只能完成登录。在 mock 模式或演示场景下，用户可能不需要登录即可浏览页面，缺少关闭功能导致体验受阻。

## What Changes

- 为登录弹窗添加关闭按钮（右上角 ✕ 按钮）
- 点击关闭按钮后隐藏登录弹窗
- 支持点击遮罩层关闭弹窗（`mask-closable` 改为 `true`）

## Capabilities

### New Capabilities

- `login-modal-close`: 登录弹窗的关闭/取消交互能力

### Modified Capabilities

- *无*

## Impact

- **受影响文件**: `src/components/LoginModal.vue`
- **受影响功能**: 登录弹窗的显示/隐藏行为
- **兼容性**: 纯 UI 增强，不影响认证逻辑
