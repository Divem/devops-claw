# OpenClaw API 接口规范

## 通用规范

### 基础信息

- **基础 URL**: `/api`
- **数据格式**: JSON
- **编码**: UTF-8
- **认证方式**: Bearer Token

### 认证请求头

```
Authorization: Bearer <accessToken>
```

### HTTP 状态码

| 状态码 | 含义 | 说明 |
|--------|------|------|
| 200 | OK | 请求成功 |
| 201 | Created | 资源创建成功 |
| 204 | No Content | 请求成功但无返回内容 |
| 400 | Bad Request | 请求参数错误 |
| 401 | Unauthorized | 未授权或认证失败 |
| 404 | Not Found | 资源不存在 |
| 500 | Internal Server Error | 服务器内部错误 |

### 响应格式

**成功响应 (200/201)**:
```json
{
  "数据对象"  // 直接返回数据对象或数组
}
```

**列表响应**:
```json
{
  "items": [],        // 数据列表
  "total": 0,         // 总条数
  "page": 1,          // 当前页码
  "pageSize": 10      // 每页条数
}
```

**错误响应 (400/401/404/500)**:
```json
{
  "message": "错误描述"
}
```

### 通用查询参数

列表接口支持以下通用查询参数：

| 参数 | 类型 | 说明 | 示例 |
|------|------|------|------|
| search | string | 搜索关键词 | `search=张三` |
| status | string | 状态筛选，多个用逗号分隔 | `status=running,stopped` |
| sort | string | 排序字段 | `sort=createdAt` |
| order | string | 排序方向: asc/desc | `order=desc` |
| page | number | 页码，从 1 开始 | `page=1` |
| pageSize | number | 每页条数 | `pageSize=10` |

## 数据类型定义

### 状态枚举

**项目状态 (ProjectStatus)**:
- `creating` - 创建中
- `pending_approval` - 待审批
- `approved` - 已审批
- `deployed` - 已部署
- `error` - 异常

**虚拟机状态 (VmStatus)**:
- `running` - 运行中
- `stopped` - 已停止
- `error` - 异常

**飞书连接状态 (FeishuConnectionStatus)**:
- `connected` - 已连接
- `disconnected` - 已断开
- `pending` - 待配置

**审批状态 (ApprovalStatus)**:
- `pending` - 待审批
- `approved` - 已通过
- `rejected` - 已拒绝

**镜像状态 (ImageStatus)**:
- `available` - 可用
- `unavailable` - 不可用
- `building` - 构建中

**镜像类型 (ImageType)**:
- `vm` - 虚拟机镜像
- `openclaw` - OpenClaw 镜像

**进度步骤状态 (StepStatus)**:
- `pending` - 等待中
- `running` - 进行中
- `done` - 已完成
- `error` - 失败

### 核心数据模型

**User 用户**:
```typescript
{
  id: string
  name: string
  avatarUrl: string
}
```

**Project 项目**:
```typescript
{
  id: string
  name: string
  botName?: string
  avatarUrl: string
  status: ProjectStatus
  gatewayUrl: string
  feishuChatUrl: string
  createdAt: string  // ISO 8601
  botConfigured: boolean
  appId?: string
}
```

**Instance 实例**:
```typescript
{
  id: string
  name: string
  avatarUrl: string
  ownerName: string
  ownerId: string
  vmStatus: VmStatus
  feishuStatus: FeishuConnectionStatus
  createdAt: string
  lastActiveAt: string
  appId: string
  projectId: string
  globalConfigStatus: 'synced' | 'outdated' | 'pending'
  lastConfigSyncAt?: string
}
```

**Approval 审批**:
```typescript
{
  id: string
  instanceId: string
  instanceName: string
  instanceAvatarUrl: string
  ownerName: string
  ownerAvatarUrl: string
  appId: string
  status: ApprovalStatus
  submittedAt: string
  approvedAt?: string
  feishuStatus: FeishuConnectionStatus
}
```

**Image 镜像**:
```typescript
{
  id: string
  type: ImageType
  name: string
  imageUrl: string
  version: string
  size: number  // MB
  status: ImageStatus
  description: string
  createdAt: string
  updatedAt: string
}
```

## 接口延迟说明

当前 mock 实现中，各接口添加了模拟延迟：

| 接口类型 | 延迟时间 | 说明 |
|----------|----------|------|
| 普通查询 | 200-300ms | GET 列表、详情等 |
| 创建操作 | 500-800ms | POST 创建资源 |
| 更新/删除 | 300ms | PUT/DELETE 操作 |
| 进度查询 | 1500ms | 项目创建进度 |
| 认证接口 | 200-500ms | 登录、刷新等 |
