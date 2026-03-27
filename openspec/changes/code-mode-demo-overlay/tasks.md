## 1. 资源准备

- [x] 1.1 将 `docs/images/99-openclaw-code.png` 复制到 `public/images/` 目录

## 2. 覆盖层实现

- [x] 2.1 在 `ConfigCodeMode.vue` 中添加 `showDemoOverlay` ref 状态，默认值为 `true`
- [x] 2.2 添加绝对定位覆盖层 `div`，铺满 `.config-code-mode` 容器，展示设计参考图
- [x] 2.3 覆盖层图片使用 `object-fit: cover` 或 `contain` 确保完整覆盖内容区域

## 3. 切换开关

- [x] 3.1 在覆盖层右上角添加切换按钮，`z-index` 高于覆盖层
- [x] 3.2 点击切换按钮切换 `showDemoOverlay` 状态，控制覆盖层显示/隐藏
- [x] 3.3 切换按钮样式：简洁的图标或文字按钮，与暗色主题匹配

## 4. 验证

- [x] 4.1 运行 `npm run build` 确认无编译错误
- [x] 4.2 在开发模式下验证覆盖层默认显示、切换开关正常工作
