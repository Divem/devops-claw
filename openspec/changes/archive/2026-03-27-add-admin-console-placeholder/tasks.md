## 1. 准备工作

- [x] 1.1 验证图片文件 `docs/images/99openclaw-admin.png` 是否存在
- [x] 1.2 查找控制台页面组件文件（`projects/proj-001/admin` 路由对应的 Vue 文件）

## 2. 实现控制台占位图片

- [x] 2.1 在控制台 Vue 组件模板顶部添加图片元素，使用 `docs/images/99openclaw-admin.png` 作为 src
- [x] 2.2 添加 Tailwind CSS 类实现居中布局（`flex justify-center` 或 `mx-auto`）
- [x] 2.3 添加 scoped Less 样式，设置固定高度 200px，保持宽高比（`height: 200px; width: auto;`）
- [x] 2.4 添加响应式样式，在移动端（< 768px）将高度调整为 150px

## 3. 验证与测试

- [x] 3.1 启动开发服务器，验证控制台页面加载时图片正确显示
- [x] 3.2 验证图片在页面上方居中，不影响下方控制台内容
- [x] 3.3 验证响应式效果：在移动端图片高度调整为 150px
- [x] 3.4 运行测试命令（如 `npx vitest run`）确保没有破坏现有功能

