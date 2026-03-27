## MODIFIED Requirements

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
