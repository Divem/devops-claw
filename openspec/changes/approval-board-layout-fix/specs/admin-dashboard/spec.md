## MODIFIED Requirements

### Requirement: 审批管理页面 Header 布局

审批管理页面的 header SHALL 完整显示"审批管理"标题，tabs 组件 SHALL 使用紧凑样式，不挤压标题空间。

#### Scenario: 标题完整显示

- **WHEN** 用户进入审批管理页面
- **THEN** "审批管理"标题 SHALL 完整显示在一行内，不换行不截断

#### Scenario: Tabs 紧凑显示

- **WHEN** 审批管理页面加载完成
- **THEN** 待审批/已审批 tabs SHALL 使用 line 样式，占据更少的水平空间

### Requirement: InstanceDrawer 抽屉宽度

实例详情抽屉 SHALL 使用 640px 宽度，为详情内容提供充足的展示空间。

#### Scenario: 抽屉以 640px 宽度打开

- **WHEN** 用户在实例管理页面点击某个实例查看详情
- **THEN** 右侧抽屉 SHALL 以 640px 宽度滑出展示实例详情
