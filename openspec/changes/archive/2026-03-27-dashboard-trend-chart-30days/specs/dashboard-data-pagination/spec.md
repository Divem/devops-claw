## ADDED Requirements

### Requirement: 按需加载历史数据
Dashboard 数据获取 SHALL 支持分页加载机制，避免一次性加载大量数据。

#### Scenario: 初始加载默认范围
- **WHEN** Dashboard 页面加载且默认显示近 30 天
- **THEN** 请求最近 30 天的创建趋势数据
- **AND** 响应时间 < 500ms

#### Scenario: 扩展至 90 天视图
- **WHEN** 用户切换至 "近90天" 视图
- **THEN** 若本地无缓存，向后端请求额外的 60 天数据（第31-90天）
- **AND** 新数据与现有数据合并显示

#### Scenario: 缓存已加载数据
- **WHEN** 用户从 90 天视图切换回 30 天视图
- **THEN** 直接使用本地缓存数据，不重复请求
- **AND** 切换响应 < 50ms

### Requirement: 数据更新机制
Dashboard 数据 SHALL 支持手动刷新和自动更新。

#### Scenario: 手动刷新
- **WHEN** 用户点击刷新按钮
- **THEN** 清除本地缓存并重新获取数据
- **AND** 显示加载状态指示器

#### Scenario: 自动刷新（可选）
- **WHEN** Dashboard 页面处于激活状态超过 5 分钟
- **THEN** 自动刷新当前视图的数据
- **AND** 更新过程平滑，不干扰用户操作

### Requirement: 数据格式规范
后端返回的 Dashboard 数据 SHALL 包含指定字段。

#### Scenario: 趋势数据结构
- **WHEN** 获取创建趋势数据
- **THEN** 每条记录包含：
  - `date`: 日期字符串（YYYY-MM-DD 格式）
  - `count`: 当日创建数量（整数，≥0）
  - `timestamp`: 可选，Unix 时间戳

#### Scenario: 空数据处理
- **WHEN** 某日期无创建记录
- **THEN** 后端返回该日期且 count 为 0
- **AND** 数据序列保持连续（无日期缺失）
