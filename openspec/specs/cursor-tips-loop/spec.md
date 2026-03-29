## ADDED Requirements

### Requirement: 鼠标停留检测
系统 SHALL 检测用户在 Hero 区域的鼠标停留时间，超过阈值时触发 Tips 显示。

#### Scenario: 停留触发 Tips
- **GIVEN** 用户鼠标在 Hero 区域内静止
- **WHEN** 停留时间达到 2 秒
- **THEN** 在光标位置显示 Tips 气泡

#### Scenario: 移动重置计时
- **GIVEN** 用户鼠标在 Hero 区域静止 1 秒
- **WHEN** 用户移动鼠标
- **THEN** 计时器重置，Tips 不显示

### Requirement: Tips 循环展示
Tips 组件 SHALL 支持多条内容循环展示，每 3 秒自动切换下一条。

#### Scenario: 循环切换 Tips
- **GIVEN** Tips 已显示且包含 4 条内容
- **WHEN** 展示时间达到 3 秒
- **THEN** 平滑切换至下一条 Tip

#### Scenario: 循环完成后回到第一条
- **GIVEN** Tips 展示到最后一条
- **WHEN** 展示时间达到 3 秒
- **THEN** 切换回第一条 Tip 继续循环

### Requirement: 移动隐藏机制
Tips SHALL 在检测到鼠标移动时立即隐藏，但 SHALL NOT 重置当前文案索引。

#### Scenario: 移动立即隐藏
- **GIVEN** Tips 当前显示在光标位置，当前文案索引为 N
- **WHEN** 用户移动鼠标
- **THEN** Tips 在 100ms 内消失，文案索引保持为 N

#### Scenario: 快速移动防抖
- **GIVEN** Tips 已显示
- **WHEN** 用户快速微小移动后立即停止
- **THEN** Tips 不消失，继续展示

#### Scenario: 隐藏后重新显示继续推进
- **GIVEN** Tips 当前显示第 3 条文案后因鼠标移动而隐藏
- **WHEN** 用户在新位置停留超过阈值
- **THEN** Tips 重新出现时显示第 4 条文案

#### Scenario: 最后一条后回到第一条
- **GIVEN** Tips 当前显示最后一条文案后因鼠标移动而隐藏
- **WHEN** 用户在新位置停留超过阈值
- **THEN** Tips 重新出现时显示第 1 条文案

### Requirement: Tips 气泡样式
Tips SHALL 使用气泡样式，跟随光标位置，不影响页面交互。

#### Scenario: 气泡位置跟随光标
- **GIVEN** Tips 正在显示
- **WHEN** 用户在 Hero 区域内移动鼠标（保持静止前的位置）
- **THEN** Tips 气泡始终显示在光标右下方 10px 处

#### Scenario: 气泡不遮挡点击
- **GIVEN** Tips 气泡显示在按钮上方
- **WHEN** 用户点击按钮
- **THEN** 点击事件正常触发，气泡不拦截点击

#### Scenario: 气泡视觉样式
- **WHEN** Tips 气泡显示时
- **THEN** 气泡具有半透明背景、圆角边框、阴影效果，符合设计规范

### Requirement: 内容配置
Tips 内容 SHALL 可通过配置数组定义，至少支持 3-5 条内容。

#### Scenario: 配置多条内容
- **GIVEN** 配置数组包含 4 条 Tip 内容
- **WHEN** Tips 开始循环展示
- **THEN** 按顺序展示所有配置的内容

#### Scenario: 配置为空不显示
- **GIVEN** Tips 配置数组为空
- **WHEN** 用户停留超过 2 秒
- **THEN** 不显示任何 Tips
