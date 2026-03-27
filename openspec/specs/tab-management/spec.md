## ADDED Requirements

### Requirement: 标签页展示
系统 SHALL 在编辑器顶部显示标签页栏。

#### Scenario: 打开新标签页
- **WHEN** 用户点击文件树中的文件
- **AND** 该文件尚未打开
- **THEN** 系统 SHALL 在标签栏新增一个标签页
- **AND** 标签页 SHALL 显示文件名和关闭按钮

#### Scenario: 标签页激活
- **WHEN** 用户点击标签页
- **THEN** 该标签页 SHALL 切换为激活状态(高亮显示)
- **AND** 编辑器 SHALL 显示该文件内容

#### Scenario: 关闭标签页
- **WHEN** 用户点击标签页上的关闭按钮
- **OR** 用户右键标签页选择"关闭"
- **THEN** 该标签页 SHALL 关闭
- **AND** 如果关闭的是当前激活标签,系统 SHALL 自动激活左侧相邻标签

#### Scenario: 关闭多个标签
- **WHEN** 用户右键标签页
- **THEN** 系统 SHALL 显示上下文菜单包含:
  - 关闭
  - 关闭其他
  - 关闭右侧所有
  - 关闭所有

### Requirement: 未保存状态标记
系统 SHALL 清晰标识未保存的文件。

#### Scenario: 显示未保存标记
- **WHEN** 文件内容被修改但未保存
- **THEN** 对应标签页 SHALL 在文件名旁显示圆点(●)
- **AND** 文件树中的文件名旁 SHALL 同时显示标记

#### Scenario: 保存后清除标记
- **WHEN** 文件保存成功
- **THEN** 所有未保存标记 SHALL 清除
- **AND** 标签页和文件树 SHALL 恢复普通状态

### Requirement: 标签页限制
系统 SHALL 对同时打开的标签页数量进行限制。

#### Scenario: 超过最大标签数
- **WHEN** 已打开 10 个标签页时用户尝试打开第 11 个
- **THEN** 系统 SHALL 显示提示:"最多同时打开 10 个文件"
- **AND** 建议用户关闭不需要的标签页

### Requirement: 标签页持久化
系统 SHALL 记住用户打开的标签页状态。

#### Scenario: 会话恢复
- **WHEN** 用户刷新页面或重新进入代码模式
- **THEN** 系统 SHALL 恢复上次打开的标签页列表
- **AND** 恢复上次激活的标签页
- **AND** 恢复每个标签页的滚动位置(如可行)
