# 管理后台前端交互页面设计

> 日期：2026-03-27 | 范围：仪表盘完善 + 实例管理 + 审批管理

---

## 1. 概述

在现有管理后台框架（AdminLayout + AdminDashboard）基础上，完善仪表盘功能并新增实例管理和审批管理两个核心页面。同时引入 vue-router 管理后台子路由，员工端保持现有 pageState 模式。

### 范围

- 仪表盘完善（统计卡片修正、网络指标、待办操作跳转）
- 实例管理（列表 + 侧边抽屉详情）
- 审批管理（待办卡片流）
- 路由架构（vue-router 仅用于管理后台）

### 不在范围

- 机器人管理、系统设置页面
- 员工端路由化改造
- 后端 API 实现（仅 MSW mock）

---

## 2. 路由架构

### 路由结构

```
/admin                → AdminLayout（父路由，侧边栏 + 顶栏）
  /admin/dashboard    → AdminDashboard（仪表盘）
  /admin/instances    → InstanceList（实例管理）
  /admin/approvals    → ApprovalBoard（审批管理）
```

### 导航切换逻辑

- **员工端**保持现有 `pageState` 驱动，不引入路由。`/` 路由匹配时渲染员工端。
- **进入管理后台：** `AppHeader` 的管理员入口改为 `router.push('/admin/dashboard')`。
- **退出管理后台：** AdminLayout 的"返回"按钮调用 `router.push('/')` + `store.goHome()`。
- **App.vue 改造：** 根组件判断 `route.path.startsWith('/admin')` 渲染 `<router-view />`，否则渲染现有员工端逻辑。
- **AdminLayout 侧边栏菜单项**改为 `<router-link>`，activeMenu 通过 `route.name` 自动计算。

### 新增依赖

- `vue-router@4`

---

## 3. 仪表盘完善

对照 PRD 5.2 仪表盘需求，当前 `AdminDashboard.vue` 需要以下改动：

### 3.1 统计卡片修正

- 第3项「待审批」→「已停止」，图标从 ⏳ 改为 🔴，字段从 `pendingApproval` 改为 `stoppedInstances`
- 待审批数据移到待办事项区域展示

### 3.2 资源使用补充

- 新增"网络"进度条，颜色 `#409eff`
- mock 数据中补充 `network` 字段

### 3.3 待办事项操作

- `handleTodoAction` 实现路由跳转：
  - 审批类 → `/admin/approvals`
  - 异常类 → `/admin/instances`（带筛选参数 `?status=error`）

### 3.4 统计卡片可点击

- 点击"运行中" → `/admin/instances?status=running`
- 点击"已停止" → `/admin/instances?status=stopped`
- 点击"异常" → `/admin/instances?status=error`
- 添加 hover 样式（cursor: pointer, 轻微阴影变化）

---

## 4. 实例管理

### 4.1 页面结构

顶部工具栏 + 数据表格 + 右侧抽屉详情。

### 4.2 工具栏

- **搜索框**：按实例名称/所属员工模糊搜索
- **状态筛选**：下拉多选（运行中/已停止/异常/待配置）
- **排序**：按创建时间/最后活跃时间，升降序切换

### 4.3 表格列

| 列名 | 说明 |
|------|------|
| 实例名称 | 头像 + 名称，可点击打开抽屉 |
| 所属员工 | 员工姓名 |
| 虚拟机状态 | 标签色：运行中(绿)/已停止(灰)/异常(红) |
| 飞书连接状态 | 已连接(绿)/待配置(橙)/断开(红) |
| 创建时间 | 格式 YYYY-MM-DD HH:mm |
| 最后活跃 | 相对时间（如"3分钟前"） |
| 操作 | 启动/停止/重启 按钮组 + 更多菜单(强制删除) |

### 4.4 抽屉详情（右侧 480px 宽）

分 4 个区块：

1. **基本信息** — 项目名、所属员工、AppID（脱敏）、创建时间
2. **虚拟机信息** — IP 地址、规格（CPU/内存）、运行时长
3. **服务状态** — Gateway 健康状态（绿点/红点）、OpenClaw 版本号、飞书长连接状态
4. **操作日志** — 时间线形式展示最近操作记录（创建/重启/配置变更），最多显示 20 条

---

## 5. 审批管理

### 5.1 页面结构

顶部 Tab 切换 + 卡片流。

### 5.2 Tab 切换

- **待审批**（默认）— 展示所有等待管理员配置长连接的实例
- **已审批** — 历史记录，展示已完成配置的实例

### 5.3 待审批卡片

每张卡片包含：

- **头部**：员工头像 + 姓名 + 提交时间（相对时间）
- **信息区**：实例名称、AppID（脱敏）、当前实例状态标签
- **配置引导**（展开/收起，默认收起）：
  1. 登录飞书开放平台，找到对应应用
  2. 配置 WebSocket 长连接地址
  3. 添加事件订阅
  4. 发布应用版本
- **操作区**：「去配置」（外链跳转飞书开放平台）+ 「标记完成」按钮

点击「标记完成」后：
- 弹出确认对话框："确认已完成飞书长连接配置？"
- 确认后系统校验连接状态，成功则卡片移入"已审批"，失败则提示"连接验证失败，请检查配置"

### 5.4 已审批卡片

简化展示：员工姓名、实例名称、审批时间、当前连接状态标签。

---

## 6. 组件与文件结构

### 6.1 新增文件

```
src/
├── router/
│   └── index.ts                    # vue-router 配置
├── views/admin/
│   ├── InstanceList.vue            # 实例管理页
│   └── ApprovalBoard.vue           # 审批管理页
├── components/admin/
│   ├── InstanceTable.vue           # 实例表格
│   ├── InstanceDrawer.vue          # 实例详情抽屉
│   ├── ApprovalCard.vue            # 审批卡片
│   └── ApprovalGuide.vue           # 配置引导步骤
├── stores/
│   └── admin.ts                    # 管理后台 store
├── types/
│   └── admin.ts                    # 管理后台类型定义
└── mocks/
    └── adminData.ts                # 管理后台 mock 数据
```

### 6.2 改动文件

| 文件 | 改动 |
|------|------|
| `src/App.vue` | 根据路由判断渲染 router-view 或员工端 |
| `src/main.ts` | 注册 vue-router |
| `src/components/admin/AdminLayout.vue` | slot → router-view，菜单项改为 router-link |
| `src/views/admin/AdminDashboard.vue` | 补充网络指标、修正统计卡片、接入路由跳转 |
| `src/components/AppHeader.vue` | 管理员入口改为 router.push |
| `src/mocks/handlers.ts` | 新增 admin 相关 API handlers |
| `package.json` | 新增 vue-router 依赖 |

### 6.3 Naive UI 组件使用

- 实例表格：`NDataTable`、`NTag`、`NButton`、`NDropdown`
- 搜索/筛选：`NInput`、`NSelect`
- 抽屉：`NDrawer`、`NDrawerContent`
- 审批卡片：`NCard`、`NCollapse`、`NTimeline`
- 确认框：`NModal` / `useDialog`
- 分页：`NPagination`

### 6.4 Store 设计（admin.ts）

```typescript
// 核心状态
instances: Instance[]               // 实例列表
selectedInstance: Instance | null    // 当前选中（抽屉展示）
approvals: Approval[]               // 审批列表
filters: {                          // 筛选条件
  search: string
  status: string[]
  sort: string
  order: 'asc' | 'desc'
}

// 核心 actions
fetchInstances()                    // 获取实例列表（带筛选/分页）
fetchInstanceDetail(id: string)     // 获取实例详情
executeAction(id: string, action: 'start' | 'stop' | 'restart' | 'delete')
fetchApprovals(status: 'pending' | 'approved')
approveInstance(id: string)         // 标记审批完成
```

---

## 7. Mock API

### 新增 handlers

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/admin/instances` | 实例列表，支持 query: search, status, sort, order, page, pageSize |
| GET | `/api/admin/instances/:id` | 实例详情（含操作日志） |
| POST | `/api/admin/instances/:id/action` | 执行操作，body: { action } |
| GET | `/api/admin/approvals` | 审批列表，query: status=pending\|approved |
| POST | `/api/admin/approvals/:id/approve` | 标记审批完成 |

### Mock 数据

- 实例列表：8-10 条，覆盖运行中/已停止/异常/待配置各种状态组合
- 审批列表：3-4 条待审批 + 2-3 条已审批
- 仪表盘数据：补充 `network` 字段和 `stoppedInstances` 字段

---

## 8. 样式规范

遵循 `docs/design-token.md` 中的 MTP Web 设计令牌：

- 品牌主色：`#006eff`
- 卡片：白底 `#ffffff`，圆角 `4px`，阴影 `0px 0px 2px rgba(0,0,0,0.1)`
- 状态色：成功 `#00b81f`，警告 `#ff8800`，错误 `#f23030`，信息 `#409eff`
- 字号：正文 `14px`，标题 `18px`，小字 `12px`
- 抽屉/弹窗圆角：`6px`，阴影 `0 4px 12px rgba(0,0,0,0.2)`
