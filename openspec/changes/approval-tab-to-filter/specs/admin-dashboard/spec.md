## MODIFIED Requirements

### Requirement: 审批管理状态筛选

审批管理页面 SHALL 使用下拉选择器（Select）筛选审批状态，而非 Tab 切换。

#### Scenario: 下拉筛选器显示

- **WHEN** 用户进入审批管理页面
- **THEN** header 右侧 SHALL 显示一个下拉选择器，包含"待审批"和"已审批"两个选项，默认选中"待审批"

#### Scenario: 切换筛选状态

- **WHEN** 用户在下拉选择器中选择不同状态
- **THEN** 页面 SHALL 加载对应状态的审批列表
