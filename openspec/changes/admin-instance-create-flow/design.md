## Context

当前 `InstanceCreateModal.vue` 在管理员填写名称和目标用户后，调用 `useAdminStore.createInstance` 直接提交，成功后关闭弹窗并刷新列表。整个过程没有进度反馈，且不支持在创建时配置飞书 AppID/AppSecret。

用户端已有完整的进度体验：`ProgressModal.vue` 轮询 `GET /api/project/:id/progress` 展示 `vm → openclaw → feishu` 三阶段。管理员端需对齐此体验，同时在表单中增加可选的 AppID/AppSecret 配置。

## Goals / Non-Goals

**Goals:**
- `InstanceCreateModal` 增加两阶段视图：表单阶段 + 进度阶段
- 进度视图展示三步骤：启动云端电脑 / 安装 OpenClaw / 配置飞书连接
- 可选填写 AppID/AppSecret，填写后飞书连接步骤自动完成，否则标记为「待配置」
- Mock 进度接口 `GET /api/admin/instances/:id/progress` 模拟轮询
- 完成后显示成功摘要（实例名称、跳转实例列表）

**Non-Goals:**
- 不做独立路由页面，仍使用弹窗/Modal 形式
- 不实现真实后端逻辑，仅 Mock
- 不做重试逻辑复杂化（保持简单：error 状态下显示「重试」按钮）

## Decisions

### 1. 弹窗内双视图切换（表单 → 进度）
**选择**: 在同一个 `InstanceCreateModal` 内用 `v-if` 切换表单视图和进度视图
**理由**:
- 保持弹窗上下文，用户感知流程连贯性
- 不需要新增路由或独立组件，减少复杂度
- 与用户端 `ProgressModal` 组件分离（用户端是独立 Modal，管理端内嵌在创建 Modal 内）

### 2. 进度步骤定义
```
vm       → 「启动云端电脑」
openclaw → 「安装 OpenClaw」
feishu   → 「配置飞书连接」（有 AppID 则自动完成，无则标记待配置）
```
复用 `StepInfo` / `StepStatus` 类型（来自 `@/types/project`），保持一致。

### 3. 轮询策略
**选择**: 每 1.5 秒轮询一次 `GET /api/admin/instances/:id/progress`，收到 `done: true` 或所有步骤完成后停止
**理由**: 与用户端轮询节奏对齐，Mock 端在 3-5 次轮询内完成全部步骤

### 4. AppSecret 字段
**选择**: 在表单中增加「飞书 AppID」和「飞书 AppSecret」两个可选输入，带明文/密文切换
**理由**: 与现有用户端 `CreateModal` 中的字段一致，复用交互模式

### 5. 进度完成后行为
**选择**: 显示内嵌成功状态（✓ 图标 + 实例名称 + 「查看实例」按钮），点击按钮关闭弹窗并刷新列表
**理由**: 避免多个 Modal 层叠，减少跳转干扰

## Risks / Trade-offs

**[风险] 弹窗高度变化** → **缓解**: 进度视图使用固定高度或 `min-height`，避免弹窗闪烁

**[风险] 轮询中用户关闭弹窗** → **缓解**: 进度中 `mask-closable="false"`，防止误关；提供「后台运行」按钮允许关闭（进阶功能，当前版本暂不实现）

**[风险] Mock 进度与真实流程不一致** → **缓解**: Mock 通过多次轮询逐步推进步骤，模拟真实节奏
