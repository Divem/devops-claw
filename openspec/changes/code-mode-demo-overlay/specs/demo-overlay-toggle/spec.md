## ADDED Requirements

### Requirement: 演示覆盖层显示

代码模式页面 SHALL 支持全屏覆盖层展示设计参考图，覆盖整个编辑器内容区域（包含 FileExplorer 和 EditorArea）。

#### Scenario: 默认显示覆盖层

- **WHEN** 用户进入代码模式
- **THEN** 覆盖层 SHALL 默认显示，覆盖整个代码编辑区域
- **THEN** 覆盖层展示设计参考图 `99-openclaw-code.png`

#### Scenario: 覆盖层铺满内容区

- **WHEN** 覆盖层处于显示状态
- **THEN** 覆盖层 SHALL 完全覆盖 FileExplorer 和 EditorArea 区域
- **THEN** 覆盖层 SHALL 不超出 `.config-code-mode` 容器边界

### Requirement: 显示/隐藏切换开关

代码模式页面 SHALL 在右上角提供切换开关，控制覆盖层的显示与隐藏。

#### Scenario: 点击切换开关隐藏覆盖层

- **WHEN** 用户点击右上角的切换开关
- **THEN** 覆盖层 SHALL 隐藏
- **THEN** 真实的代码编辑器界面 SHALL 完全可见并可正常操作

#### Scenario: 点击切换开关显示覆盖层

- **GIVEN** 覆盖层处于隐藏状态
- **WHEN** 用户再次点击右上角的切换开关
- **THEN** 覆盖层 SHALL 重新显示

#### Scenario: 切换开关始终可点击

- **WHEN** 覆盖层处于显示状态
- **THEN** 切换开关 SHALL 位于覆盖层之上，始终可见且可点击

### Requirement: 设计参考图资源

设计参考图 SHALL 通过 `public/images/` 目录提供，确保构建后可直接通过路径访问。

#### Scenario: 图片资源可用

- **WHEN** 应用构建并运行
- **THEN** `99-openclaw-code.png` SHALL 可通过 `/images/99-openclaw-code.png` 路径访问
