## ADDED Requirements

### Requirement: 管理员创建实例时可查看逐步进度
系统 SHALL 在管理员提交创建实例表单后，在弹窗内切换为进度视图，展示启动云端电脑、安装 OpenClaw、配置飞书连接三个步骤的实时状态。

#### Scenario: 提交后切换为进度视图
- **WHEN** 管理员填写完表单并点击「创建」按钮
- **THEN** 弹窗表单区域隐藏
- **AND** 显示进度步骤视图（三步：启动云端电脑 / 安装 OpenClaw / 配置飞书连接）
- **AND** 第一步「启动云端电脑」状态为 running

#### Scenario: 步骤依次推进
- **WHEN** 系统轮询进度接口（每 1.5 秒一次）
- **THEN** 各步骤状态按顺序从 pending → running → done 更新
- **AND** 每步显示已耗时（单位：秒）

#### Scenario: 全部步骤完成
- **WHEN** 所有步骤状态均为 done
- **THEN** 弹窗显示成功状态（✓ 图标 + 实例名称）
- **AND** 提供「查看实例」按钮
- **AND** 点击「查看实例」关闭弹窗并刷新实例列表

#### Scenario: 步骤出现错误
- **WHEN** 任意步骤状态变为 error
- **THEN** 该步骤显示错误样式（✕ 图标）
- **AND** 显示「重试」按钮
- **AND** 点击「重试」重新提交创建请求

#### Scenario: 进度中禁止关闭弹窗
- **WHEN** 进度视图显示中（非完成/非错误状态）
- **THEN** 点击遮罩层不关闭弹窗
- **AND** 不显示关闭按钮

### Requirement: 管理员创建实例时可选配置飞书凭证
系统 SHALL 在创建实例表单中提供可选的飞书 AppID 和 AppSecret 输入，填写后在进度视图中「配置飞书连接」步骤自动完成。

#### Scenario: 填写 AppID/AppSecret 后创建
- **WHEN** 管理员填写了 AppID 和 AppSecret
- **AND** 提交表单
- **THEN** 「配置飞书连接」步骤在进度中自动推进并完成
- **AND** 实例飞书状态标记为 connected

#### Scenario: 未填写凭证时创建
- **WHEN** 管理员未填写 AppID/AppSecret
- **AND** 提交表单
- **THEN** 「配置飞书连接」步骤显示「待配置」提示
- **AND** 该步骤最终状态为 done（跳过，非 error）
- **AND** 实例飞书状态标记为 pending
