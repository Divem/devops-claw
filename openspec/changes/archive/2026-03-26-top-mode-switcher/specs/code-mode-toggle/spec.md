## MODIFIED Requirements

### Requirement: 视图模式切换

管理页面 SHALL 支持通过顶部 Tab 栏在「控制台」和「代码模式」之间切换。侧边导航不再参与模式切换。

#### Scenario: 通过顶部 Tab 切换模式

- **WHEN** 用户点击顶部 Tab 栏的「控制台」或「代码模式」Tab
- **THEN** 页面 SHALL 切换到对应模式

#### Scenario: 代码模式下侧边导航不折叠

- **WHEN** 页面处于代码模式
- **THEN** 侧边导航 SHALL 完全隐藏（而非折叠为窄条），不保留折叠导航中的菜单图标
