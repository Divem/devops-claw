## Context

代码模式（ConfigCodeMode.vue）是 OpenClaw 管理页面的三种视图之一，展示仿 VS Code 风格的配置文件编辑器。当前页面由 FileExplorer（左侧文件树）和 EditorArea（右侧编辑器）组成。

在产品演示场景中，需要展示设计稿的预期视觉效果，而非真实的代码编辑器。控制台模式已有类似的占位图机制（使用 `99openclaw-admin.png`），需要在代码模式中实现类似功能。

## Goals / Non-Goals

**Goals:**

- 在代码模式中添加全屏覆盖层，展示设计参考图
- 提供右上角切换开关，支持在演示图和真实页面之间切换
- 切换开关默认显示覆盖层（演示模式优先）

**Non-Goals:**

- 不修改现有代码编辑器的功能
- 不添加拖拽、缩放等图片交互
- 不影响其他视图模式（控制台/终端）

## Decisions

**D1: 覆盖层实现方式 — 绝对定位覆盖层**

在 ConfigCodeMode.vue 的 `.config-code-mode` 容器内添加绝对定位的覆盖层 `div`，铺满整个内容区域，`z-index` 置于最上层。

*备选方案*：使用 Vue `<keep-alive>` + 条件渲染隐藏真实组件 → 放弃，因为需要真实编辑器保持状态（文件加载、编辑内容不丢失）。

**D2: 图片资源路径 — public/images/**

将 `docs/images/99-openclaw-code.png` 复制到 `public/images/` 目录，通过绝对路径 `/images/99-openclaw-code.png` 引用，确保构建后可直接访问。

*备选方案*：使用 Vite `import` 静态资源 → 放弃，因为 `public/` 下的资源无需 hash 处理，更适合演示占位图场景。

**D3: 切换开关位置 — 右上角固定定位**

使用 `position: fixed` 将切换按钮固定在内容区域右上角，`z-index` 高于覆盖层，确保始终可点击。

**D4: 状态管理 — 组件内 ref**

使用 `ref<boolean>` 在 ConfigCodeMode.vue 内部管理覆盖层显示状态，无需引入 Pinia store，因为这是纯 UI 演示功能，无跨组件状态共享需求。

## Risks / Trade-offs

- **[风险] 演示模式忘记关闭** → 切换开关有明确的视觉状态（开/关），开发阶段默认开启，上线前需关闭或移除
- **[风险] 覆盖层遮挡交互** → 覆盖层使用 `pointer-events: none` 或切换时隐藏，确保不阻塞真实编辑器操作
