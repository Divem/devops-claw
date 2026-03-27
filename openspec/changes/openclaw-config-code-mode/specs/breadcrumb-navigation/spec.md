## ADDED Requirements

### Requirement: 面包屑路径显示
系统 SHALL 在编辑器上方显示当前文件的路径面包屑。

#### Scenario: 显示完整路径
- **WHEN** 用户打开一个文件
- **THEN** 面包屑 SHALL 显示从根目录到当前文件的完整路径
- **AND** 每个路径段 SHALL 作为独立的可点击元素

#### Scenario: 路径分隔符
- **WHEN** 面包屑渲染路径
- **THEN** 各路径段之间 SHALL 显示分隔符(>/»)
- **AND** 最后一个段(当前文件)SHALL 高亮显示

### Requirement: 面包屑导航
系统 SHALL 支持通过面包屑进行快速导航。

#### Scenario: 点击文件夹导航
- **WHEN** 用户点击面包屑中的文件夹段
- **THEN** 文件树 SHALL 自动定位并展开该文件夹
- **AND** 该文件夹 SHALL 高亮显示

#### Scenario: 路径下拉菜单
- **WHEN** 用户点击面包屑中的某个文件夹段的下拉箭头(如果有)
- **THEN** 系统 SHALL 显示该文件夹下的同级文件夹列表
- **AND** 用户可以选择跳转到其他文件夹

#### Scenario: 显示当前文件名
- **WHEN** 面包屑显示路径
- **THEN** 最后一个元素 SHALL 是当前文件名
- **AND** 文件名 SHALL 显示文件图标

### Requirement: 面包屑与文件树同步
系统 SHALL 保持面包屑与文件树状态同步。

#### Scenario: 切换文件时更新
- **WHEN** 用户切换到其他标签页
- **THEN** 面包屑 SHALL 实时更新为新文件的路径
- **AND** 过渡动画 SHALL 平滑自然

#### Scenario: 文件树操作反馈
- **WHEN** 用户在文件树中重命名文件或移动文件
- **THEN** 如果当前打开的是该文件,面包屑 SHALL 实时更新路径显示
