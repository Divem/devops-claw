## MODIFIED Requirements

### Requirement: 左侧侧边导航

管理页面 SHALL 包含一个左侧固定宽度的侧边导航栏（控制台模式下显示）。代码模式下侧边导航 SHALL 完全隐藏。

#### Scenario: 控制台模式下显示侧边导航

- **WHEN** 页面处于控制台模式
- **THEN** 左侧 SHALL 显示固定宽度（220px）的侧边导航栏

#### Scenario: 代码模式下隐藏侧边导航

- **WHEN** 页面切换到代码模式
- **THEN** 侧边导航 SHALL 完全隐藏，内容区 SHALL 占满全部宽度
