## Context

OpenClaw 配置页面当前缺少专业的代码编辑体验。用户需要通过一个直观的界面来管理复杂的 JSON 配置文件。参考 VS Code 的设计模式,我们需要构建一个功能完整的代码编辑器界面,包括文件资源管理器、多标签页编辑、面包屑导航等核心功能。

当前技术栈:
- Vue 3 + TypeScript
- Pinia 状态管理
- Naive UI 组件库
- Tailwind CSS

## Goals / Non-Goals

**Goals:**
- 实现类似 VS Code 的代码编辑界面,包含文件树、标签页、编辑器三大核心模块
- 支持 Monaco Editor 集成,提供语法高亮和基础代码提示
- 实现文件资源管理器,支持树形展示、文件操作(新建/删除/重命名)
- 实现多标签页系统,支持同时打开多个文件
- 实现面包屑导航,显示文件路径
- 支持配置文件的实时编辑和保存

**Non-Goals:**
- 完整的 IDE 功能(调试、终端、Git 集成等)
- 代码格式化、Lint 等高级编辑器功能
- 文件内容的版本控制/历史记录
- 协同编辑功能
- 插件/扩展系统

## Decisions

### 1. 使用 Monaco Editor vs CodeMirror

**选择**: Monaco Editor

**理由**:
- VS Code 同源编辑器,与目标设计风格一致
- 原生支持 JSON 语法高亮和验证
- 更好的性能和 TypeScript 支持
- 与 Vue 3 集成成熟

**替代方案**: CodeMirror 6
- 更轻量级,但 Monaco 的视觉一致性更重要

### 2. 状态管理架构

**选择**: Pinia 模块化管理

**设计**:
- `useFileExplorerStore`: 管理文件树状态、文件操作
- `useEditorStore`: 管理打开的文件、标签页、当前编辑内容
- `useConfigStore`: 管理配置数据的加载和保存

**理由**:
- 职责分离,便于维护和测试
- 与项目现有状态管理模式一致

### 3. 文件树数据结构

**选择**: 扁平化存储 + 计算属性构建树

**设计**:
```typescript
// 存储格式
files: Map<string, FileNode>

// 运行时构建树
const fileTree = computed(() => buildTree(files.value))
```

**理由**:
- 便于快速查找和更新特定文件
- 避免嵌套结构的深度遍历

### 4. 组件层级结构

```
ConfigCodeMode.vue (容器)
├── FileExplorer.vue (左侧文件树)
│   ├── FileTree.vue
│   └── FileTreeItem.vue
├── EditorArea.vue (中间编辑区)
│   ├── TabBar.vue (顶部标签栏)
│   ├── Breadcrumb.vue (面包屑导航)
│   └── MonacoEditor.vue (编辑器)
└── StatusBar.vue (底部状态栏)
```

### 5. 自动保存策略

**选择**: 防抖自动保存(500ms)

**理由**:
- 避免频繁触发保存请求
- 提供良好的用户体验
- 错误处理:保存失败时显示提示,不阻断编辑

## Risks / Trade-offs

### [风险] Monaco Editor 包体积较大
**影响**: 首屏加载时间可能增加
**缓解措施**:
- 使用 `monaco-editor-loader` 动态加载
- 按需加载编辑器功能(worker 分割)
- 配置路由懒加载,代码模式按需加载

### [风险] 大文件编辑性能
**影响**: 配置文件可能较大(数千行)
**缓解措施**:
- Monaco Editor 本身对大文件优化良好
- 设置虚拟滚动
- 限制同时打开的文件数量(最多 10 个标签页)

### [风险] 文件操作并发冲突
**影响**: 多个用户同时编辑同一配置
**缓解措施**:
- 当前版本仅支持单用户编辑
- 保存时检查文件版本/时间戳
- 冲突时提示用户刷新

### [风险] 浏览器兼容性
**影响**: Monaco Editor 对旧浏览器支持有限
**缓解措施**:
- 项目面向企业用户,浏览器版本可控
- 检测不兼容时显示降级提示

## Migration Plan

1. **Phase 1**: 基础架构
   - 安装 Monaco Editor 依赖
   - 创建状态管理模块
   - 搭建组件骨架

2. **Phase 2**: 核心功能
   - 实现文件资源管理器
   - 实现编辑器集成
   - 实现标签页系统

3. **Phase 3**: 完善功能
   - 实现面包屑导航
   - 实现文件操作(新建/删除/重命名)
   - 集成后端 API

4. **Phase 4**: 优化
   - 性能优化(懒加载、虚拟滚动)
   - 错误处理完善
   - UI 细节打磨

## Open Questions

1. **后端 API 格式**: 需要确认文件树 API 的具体返回格式
2. **配置验证**: 是否需要前端 JSON Schema 验证?
3. **快捷键**: 是否需要自定义键盘快捷键(如 Ctrl+S 保存)?
