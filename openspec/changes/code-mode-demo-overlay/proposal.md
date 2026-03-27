## Why

代码模式（ConfigCodeMode）目前展示真实的文件编辑器界面，但在产品演示和对外展示场景中，需要展示设计稿的预期效果。需要一个演示覆盖层功能，支持在代码模式中切换显示设计参考图与真实编辑器界面，方便对比演示。

## What Changes

- 在代码模式（ConfigCodeMode.vue）内容区域添加全屏覆盖层，展示设计参考图 `docs/images/99-openclaw-code.png`
- 在右上角添加显示/隐藏切换开关，控制覆盖层可见性
- 切换开关默认状态：显示覆盖层（演示模式）
- 覆盖层遮盖整个代码编辑区域（FileExplorer + EditorArea）

## Capabilities

### New Capabilities

- `demo-overlay-toggle`: 代码模式中演示覆盖层的显示/隐藏切换功能

### Modified Capabilities

（无已有 spec 需要修改）

## Impact

- **代码**: `src/views/config/ConfigCodeMode.vue` — 添加覆盖层和切换开关
- **资源**: `docs/images/99-openclaw-code.png` — 需要复制到 `public/images/` 或通过 Vite 静态资源引入
- **依赖**: 无新增依赖
