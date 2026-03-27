## MODIFIED Requirements

### Requirement: 右侧内容区

管理页面右侧 SHALL 为弹性内容区，占据侧边导航之外的剩余空间，高度为视口高度。各子页面内容 SHALL 填满整个内容区宽度，不设置 max-width 限制。

#### Scenario: 内容区填充剩余空间

- **WHEN** 管理页面加载完成
- **THEN** 右侧内容区 SHALL 填充侧边导航之外的全部剩余宽度和全部视口高度

#### Scenario: 子页面内容全宽显示

- **WHEN** 用户访问任意管理子页面（仪表盘、实例管理、审批管理）
- **THEN** 页面内容 SHALL 填满整个内容区宽度，不受 max-width 限制
