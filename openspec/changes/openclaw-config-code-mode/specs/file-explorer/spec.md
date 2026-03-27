## ADDED Requirements

### Requirement: 文件树展示
系统 SHALL 以树形结构展示配置文件目录。

#### Scenario: 加载文件树
- **WHEN** 用户进入代码编辑模式
- **THEN** 系统 SHALL 从后端加载文件树结构
- **AND** 文件树 SHALL 按文件夹优先、字母顺序排序显示

#### Scenario: 展开/折叠文件夹
- **WHEN** 用户点击文件夹名称或箭头图标
- **THEN** 文件夹 SHALL 切换展开/折叠状态
- **AND** 系统 SHALL 记忆展开状态(当前会话)

#### Scenario: 文件图标显示
- **WHEN** 文件树渲染文件列表
- **THEN** 不同文件类型 SHALL 显示对应图标(文件夹、JSON文件、YAML文件等)

### Requirement: 文件选择
系统 SHALL 支持用户在文件树中选择文件。

#### Scenario: 单击选中文件
- **WHEN** 用户单击文件
- **THEN** 该文件 SHALL 高亮显示为选中状态
- **AND** 系统 SHALL 打开该文件到编辑器(如果未打开)

#### Scenario: 当前文件高亮
- **WHEN** 用户切换标签页或打开新文件
- **THEN** 文件树中对应文件 SHALL 高亮显示
- **AND** 该文件所在文件夹 SHALL 自动展开

### Requirement: 文件操作
系统 SHALL 支持基础的文件操作。

#### Scenario: 新建文件
- **WHEN** 用户在文件树空白处或文件夹上右键选择"新建文件"
- **THEN** 系统 SHALL 显示输入框让用户输入文件名
- **AND** 文件名验证通过后 SHALL 创建文件
- **AND** 新建成功后 SHALL 自动打开该文件

#### Scenario: 新建文件夹
- **WHEN** 用户右键选择"新建文件夹"
- **THEN** 系统 SHALL 显示输入框让用户输入文件夹名
- **AND** 文件夹名验证通过后 SHALL 创建文件夹

#### Scenario: 重命名
- **WHEN** 用户在文件/文件夹上右键选择"重命名"
- **THEN** 文件名 SHALL 变为可编辑输入框
- **AND** 用户输入新名称后 SHALL 验证并更新

#### Scenario: 删除文件/文件夹
- **WHEN** 用户右键选择"删除"
- **THEN** 系统 SHALL 显示确认对话框
- **AND** 用户确认后 SHALL 删除文件/文件夹
- **AND** 如果删除的是已打开文件,标签页 SHALL 关闭

### Requirement: 文件搜索
系统 SHALL 提供文件搜索功能。

#### Scenario: 搜索过滤
- **WHEN** 用户在文件树搜索框输入关键词
- **THEN** 文件树 SHALL 实时过滤显示匹配的文件和文件夹
- **AND** 匹配的文件名 SHALL 高亮显示匹配部分
