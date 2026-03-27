## Context

当前实例管理的操作菜单（`InstanceTable.vue` 的 NDropdown）提供"重启""配置""强制删除"三项。其中"重启"语义模糊，mock 中与 start 行为一致（仅改状态），实际应对应不同级别的重启操作。管理员运维中还需要 Gateway 级别的重启、配置修复和初始化恢复能力。

现有架构：InstanceAction 联合类型 → NDropdown 菜单 → emit action → InstanceList 分发 → 确认弹窗 → store.executeAction → API。新增操作需沿用此链路。

## Goals / Non-Goals

**Goals:**
- 将"重启"操作更名为"重启电脑"，明确语义
- 新增"重启 Gateway""修复配置""恢复初始设置"三个操作
- 每个新操作有独立的确认弹窗，适配不同风险等级
- 保持现有 start/stop/delete 操作不变

**Non-Goals:**
- 不实现真实的后端逻辑，仅 Mock 层模拟
- 不修改实例详情抽屉（InstanceDrawer）的内容
- 不改变 config 操作的行为（打开新窗口）

## Decisions

### 1. InstanceAction 类型扩展
扩展联合类型新增 `restart-gateway`、`repair-config`、`reset-instance`，保留 `restart` 改语义为"重启电脑"。

**选择**: 使用带连字符的字符串而非 enum — 与现有 `'start' | 'stop' | 'restart' | 'delete'` 风格一致，保持轻量。

### 2. 确认弹窗策略
沿用现有 RestartConfirmModal 模式（NModal + 简单确认），但根据风险等级区分：
- 重启 Gateway：warning 级别，简单确认
- 修复配置：warning 级别，简单确认
- 恢复初始设置：error 级别，需输入实例名称确认（与删除操作一致的高风险操作）

**选择**: 恢复初始设置采用输入名称确认，因其为不可逆操作。其余两个采用简单确认即可。

### 3. 新增操作在菜单中的位置
在"更多"下拉菜单中，按风险从低到高排列：
1. 重启 Gateway
2. 修复配置
3. 重启电脑（原"重启"）
4. 恢复初始设置
5. 强制删除

**选择**: 逻辑分组（Gateway 相关 → 配置相关 → 系统级 → 销毁级），低风险在上。

### 4. 弹窗组件复用 vs 独立
为每个新操作创建独立的确认弹窗组件，不抽取公共弹窗基础组件。

**选择**: 现有 RestartConfirmModal / StopConfirmModal / DeleteInstanceConfirmModal 均为独立组件，保持一致性。仅 3 个新增弹窗，维护成本可控。

## Risks / Trade-offs

- **[操作名称过长]** → "恢复初始设置"在下拉菜单中显示较长，但 NDropdown 能完整显示，且操作不频繁可接受
- **[重启电脑语义变化]** → 现有 `restart` action 语义变更，但 mock 层行为不变（仍为设置 running 状态），前端仅改 label，无破坏性
