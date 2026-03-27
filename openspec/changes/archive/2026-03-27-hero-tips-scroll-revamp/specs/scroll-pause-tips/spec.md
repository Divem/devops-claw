## ADDED Requirements

### Requirement: Hero 区滚动停留触发 Tips
系统 SHALL 在用户将页面滚动至 Hero 图片区域可见、且停止滚动超过 1.5 秒后，自动显示 Tips 气泡。

#### Scenario: 滚动停留后显示
- **WHEN** Hero 图片区域进入视口，且用户停止滚动超过 1.5 秒
- **THEN** Tips 气泡出现在 Hero 图片右下角附近

#### Scenario: 再次滚动时隐藏
- **WHEN** Tips 正在显示，用户再次滚动页面
- **THEN** Tips 气泡立即消失

#### Scenario: Hero 区离开视口时隐藏
- **WHEN** 用户滚动导致 Hero 图片区域完全离开视口
- **THEN** Tips 气泡消失，停止计时

### Requirement: Tips 气泡固定在图片旁边
Tips 气泡 SHALL 以绝对定位方式固定在 Hero 图片容器的右下角，不跟随光标移动。

#### Scenario: 气泡定位
- **WHEN** Tips 气泡可见
- **THEN** 气泡显示在 Hero 图片容器的右下角区域，与图片形成视觉关联

### Requirement: 小龙虾风格文案
Tips 内容 SHALL 包含至少 10 条小龙虾风格文案，涵盖用户安装痛点、平台价值、小龙虾拟人情绪三个主题。

#### Scenario: 文案切换
- **WHEN** Tips 显示后，每隔 3 秒自动切换下一条文案
- **THEN** 以循环方式展示全部文案，直到用户再次滚动

#### Scenario: 文案内容覆盖
- **WHEN** 系统初始化 Tips
- **THEN** 文案内容包含：安装/配置痛点（终于不用折腾环境、一键部署等）、平台安全价值（数据不出企业、无捆绑等）、小龙虾情绪表达（探头、钳钳发力等）
