## ADDED Requirements

### Requirement: Monaco Editor 集成
系统 SHALL 集成 Monaco Editor 作为代码编辑组件。

#### Scenario: 编辑器初始化
- **WHEN** 用户打开代码编辑模式
- **THEN** 系统 SHALL 加载 Monaco Editor 实例
- **AND** 编辑器 SHALL 根据文件类型自动设置语言模式(JSON/YAML)

#### Scenario: 语法高亮
- **WHEN** 编辑器加载配置文件内容
- **THEN** 系统 SHALL 根据文件扩展名(.json/.yaml/.yml)显示对应语法高亮
- **AND** JSON 文件 SHALL 支持键值对的语义高亮

### Requirement: 代码编辑功能
系统 SHALL 提供基础的代码编辑功能。

#### Scenario: 文本编辑
- **WHEN** 用户在编辑器中输入或修改内容
- **THEN** 编辑器 SHALL 实时响应输入
- **AND** 系统 SHALL 标记文件为"已修改"状态

#### Scenario: 自动保存
- **WHEN** 用户停止输入超过 500ms
- **THEN** 系统 SHALL 自动保存当前文件内容到后端
- **AND** 保存成功后 SHALL 清除"已修改"标记

#### Scenario: 手动保存
- **WHEN** 用户按下 Ctrl+S (或 Cmd+S)
- **THEN** 系统 SHALL 立即保存当前文件
- **AND** 显示保存状态提示

### Requirement: 编辑器状态显示
系统 SHALL 在编辑器界面显示相关状态信息。

#### Scenario: 行号和列号显示
- **WHEN** 光标在编辑器中移动
- **THEN** 底部状态栏 SHALL 显示当前行号和列号
- **AND** 格式 SHALL 为 "行 X, 列 Y"

#### Scenario: 文件编码显示
- **WHEN** 文件在编辑器中打开
- **THEN** 底部状态栏 SHALL 显示文件编码(如 UTF-8)

#### Scenario: 修改状态指示
- **WHEN** 文件内容被修改但未保存
- **THEN** 标签页标题 SHALL 显示圆点标记(●)
- **AND** 标题栏 SHALL 显示 "● 文件名 - OpenClaw"
