## ADDED Requirements

### Requirement: 全局配置表单展示模型配置区域
系统 SHALL 在全局配置页面展示模型配置表单区域，包含供应商选择、API Key、Base URL、默认模型、最大 Token 和温度参数。

#### Scenario: 加载全局配置页面
- **WHEN** 管理员导航至 `/admin/global-config`
- **THEN** 系统 SHALL 渲染全局配置页面
- **AND** 页面 SHALL 包含「模型配置」和「Memory 配置」两个表单区域
- **AND** 页面 SHALL 包含「应用范围与发布策略」配置区域
- **AND** 页面 SHALL 从后端加载当前全局配置并填充表单

#### Scenario: 编辑模型配置
- **WHEN** 管理员在模型配置区域操作
- **THEN** 表单 SHALL 包含以下字段：
  - 供应商（下拉选择：Anthropic / OpenAI / DeepSeek / 自定义）
  - API Key（密码输入框，支持显示/隐藏切换）
  - Base URL（文本输入框，供应商为自定义时必填）
  - 默认模型（文本输入框）
  - 最大 Token（数字输入框）
  - 温度（数字输入框，范围 0-2，步长 0.1）

### Requirement: 全局配置表单展示 Memory 配置区域
系统 SHALL 在全局配置页面展示 Memory 配置表单区域。

#### Scenario: 编辑 Memory 配置
- **WHEN** 管理员在 Memory 配置区域操作
- **THEN** 表单 SHALL 包含以下字段：
  - 启用开关（N Switch）
  - 策略选择（下拉：滚动窗口 / 摘要 / 混合）
  - 上下文上限（数字输入框，单位 tokens）
  - 保留天数（数字输入框）

#### Scenario: 关闭 Memory 时隐藏子配置
- **WHEN** 管理员关闭 Memory 启用开关
- **THEN** 策略、上下文上限、保留天数字段 SHALL 禁用或隐藏

### Requirement: API Key 安全展示
系统 SHALL 对已保存的 API Key 进行掩码展示。

#### Scenario: 查看已保存的 API Key
- **WHEN** 全局配置加载完成且已有 API Key
- **THEN** API Key 输入框 SHALL 显示掩码格式（前 6 字符 + `****` + 后 4 字符）
- **AND** SHALL 提供独立的「更新」按钮触发密钥修改

#### Scenario: 更新 API Key
- **WHEN** 管理员点击「更新」按钮
- **THEN** 输入框 SHALL 切换为可编辑状态
- **AND** 管理员输入新 Key 后 SHALL 点击确认完成更新
