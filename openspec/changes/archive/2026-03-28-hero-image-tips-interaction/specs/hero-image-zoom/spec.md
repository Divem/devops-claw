## ADDED Requirements

### Requirement: Hero 图片悬停放大效果
Hero 图片容器 SHALL 在鼠标悬停时平滑放大至 1.1 倍，移出时恢复原状。

#### Scenario: 鼠标悬停放大
- **WHEN** 用户鼠标移入 Hero 图片区域
- **THEN** 图片在 300ms 内平滑放大至 1.1 倍

#### Scenario: 鼠标移出恢复
- **WHEN** 用户鼠标移出 Hero 图片区域
- **THEN** 图片在 300ms 内平滑恢复至原始大小

#### Scenario: 多次悬停保持流畅
- **GIVEN** 用户快速多次移入移出 Hero 图片
- **WHEN** 每次交互发生时
- **THEN** 动画效果保持流畅，无卡顿或闪烁

### Requirement: 动画性能优化
Hero 图片放大动画 SHALL 使用 GPU 加速，确保 60fps 流畅度。

#### Scenario: 动画使用 transform
- **WHEN** 图片放大动画执行时
- **THEN** 仅使用 `transform: scale()` 属性，不触发重排

#### Scenario: 支持减少动画偏好
- **GIVEN** 用户系统设置了 `prefers-reduced-motion: reduce`
- **WHEN** 用户悬停 Hero 图片
- **THEN** 不执行放大动画，保持静态显示
