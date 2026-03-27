# OpenClaw API 接口清单

## 目录

- [认证模块](#认证模块)
- [员工端模块](#员工端模块)
- [管理后台 - 仪表盘](#管理后台---仪表盘)
- [管理后台 - 实例管理](#管理后台---实例管理)
- [管理后台 - 审批管理](#管理后台---审批管理)
- [管理后台 - 镜像管理](#管理后台---镜像管理)
- [管理后台 - 用户搜索](#管理后台---用户搜索)

---

## 认证模块

### 1. 用户登录

- **Method**: `POST`
- **Path**: `/api/auth/login`
- **Request**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response (200)**:
  ```json
  {
    "user": {
      "id": "user-001",
      "name": "达尔文",
      "avatarUrl": "/avatars/default-user.svg"
    },
    "tokens": {
      "accessToken": "mock-access-token-xxx",
      "refreshToken": "mock-refresh-token-xxx",
      "expiresAt": 1712345678901
    }
  }
  ```
- **Error (401)**:
  ```json
  { "message": "用户名或密码错误" }
  ```

### 2. 刷新 Token

- **Method**: `POST`
- **Path**: `/api/auth/refresh`
- **Request**:
  ```json
  { "refreshToken": "string" }
  ```
- **Response (200)**:
  ```json
  {
    "accessToken": "mock-access-token-xxx",
    "refreshToken": "mock-refresh-token-xxx",
    "expiresAt": 1712345678901
  }
  ```
- **Error (401)**:
  ```json
  { "message": "Token 无效" }
  ```

### 3. 用户登出

- **Method**: `POST`
- **Path**: `/api/auth/logout`
- **Response**: `204 No Content`

### 4. 获取当前用户

- **Method**: `GET`
- **Path**: `/api/auth/me`
- **Headers**: `Authorization: Bearer <token>`
- **Response (200)**:
  ```json
  {
    "id": "user-001",
    "name": "达尔文",
    "avatarUrl": "/avatars/default-user.svg"
  }
  ```
- **Error (401)**:
  ```json
  { "message": "未授权" }
  ```

---

## 员工端模块

### 1. 获取当前项目

- **Method**: `GET`
- **Path**: `/api/project`
- **Response (200)**:
  ```json
  {
    "id": "proj_xxx",
    "name": "项目名",
    "botName": "机器人名",
    "avatarUrl": "/avatars/avatar-1.svg",
    "status": "pending_approval",
    "gatewayUrl": "https://gateway.example.com/dashboard",
    "feishuChatUrl": "https://www.feishu.cn/...",
    "createdAt": "2026-03-28T10:00:00.000Z",
    "botConfigured": true,
    "appId": "cli_xxx"
  }
  ```
- **Response (404)**: 项目不存在

### 2. 创建项目

- **Method**: `POST`
- **Path**: `/api/project`
- **Request**:
  ```json
  {
    "name": "string",
    "botName": "string",      // optional
    "avatarUrl": "string",
    "appId": "string",        // optional
    "appSecret": "string"     // optional
  }
  ```
- **Response (201)**: 返回创建的 Project 对象

### 3. 获取创建进度

- **Method**: `GET`
- **Path**: `/api/project/:id/progress`
- **Response (200)**:
  ```json
  {
    "steps": [
      { "key": "vm", "status": "done", "elapsed": 2 },
      { "key": "openclaw", "status": "running", "elapsed": null },
      { "key": "feishu", "status": "pending", "elapsed": null }
    ],
    "done": false
  }
  ```

### 4. 删除项目

- **Method**: `DELETE`
- **Path**: `/api/project/:id`
- **Response**: `204 No Content`

### 5. 更新机器人配置

- **Method**: `PUT`
- **Path**: `/api/project/:id/bot-config`
- **Request**:
  ```json
  {
    "appId": "string",
    "appSecret": "string"
  }
  ```
- **Response (200)**: 返回更新后的 Project 对象

### 6. 获取头像列表

- **Method**: `GET`
- **Path**: `/api/avatars`
- **Response (200)**:
  ```json
  [
    "/avatars/avatar-1.svg",
    "/avatars/avatar-2.svg",
    ...
  ]
  ```

### 7. Gateway 代理访问 (GET)

- **Method**: `GET`
- **Path**: `/api/projects/:id/gateway/*`
- **Response (200)**: HTML 内容
- **Response (404)**: 项目不存在

### 8. Gateway 代理检查 (HEAD)

- **Method**: `HEAD`
- **Path**: `/api/projects/:id/gateway/*`
- **Response**: `200` 或 `404`

### 9. 获取项目详情（管理员查看）

- **Method**: `GET`
- **Path**: `/api/projects/:id`
- **Response (200)**: Project 对象
- **Response (404)**: 项目不存在

### 10. 获取项目配置

- **Method**: `GET`
- **Path**: `/api/projects/:id/config`
- **Response (200)**:
  ```json
  {
    "model": {
      "provider": "anthropic",
      "defaultModel": "claude-sonnet-4-20250514"
    },
    "gateway": {
      "url": "https://gateway.example.com",
      "status": "running"
    }
  }
  ```

---

## 管理后台 - 仪表盘

### 1. 获取仪表盘数据

- **Method**: `GET`
- **Path**: `/api/admin/dashboard`
- **Query**: `?days=30` (可选，默认 90 天)
- **Response (200)**:
  ```json
  {
    "stats": {
      "totalInstances": 12,
      "runningInstances": 8,
      "stoppedInstances": 2,
      "errorInstances": 1
    },
    "resources": {
      "cpu": 45,
      "memory": 62,
      "storage": 38,
      "network": 27
    },
    "trend": [
      { "date": "2026-01-01", "count": 3 },
      ...
    ],
    "todos": [
      {
        "id": "todo-1",
        "type": "approval",
        "icon": "⏳",
        "title": "实例审批：销售部 OpenClaw",
        "description": "申请人：张三，申请时间：2026-03-27",
        "action": "去审批"
      }
    ]
  }
  ```

---

## 管理后台 - 实例管理

### 1. 获取实例列表

- **Method**: `GET`
- **Path**: `/api/admin/instances`
- **Query**:
  - `search` - 搜索实例名或所有者
  - `status` - 状态筛选 (running,stopped,error)
  - `sort` - 排序字段 (createdAt/lastActiveAt)
  - `order` - asc/desc
  - `page` - 页码
  - `pageSize` - 每页条数
- **Response (200)**:
  ```json
  {
    "items": [Instance],
    "total": 100,
    "page": 1,
    "pageSize": 10
  }
  ```

### 2. 获取实例详情

- **Method**: `GET`
- **Path**: `/api/admin/instances/:id`
- **Response (200)**:
  ```json
  {
    "id": "inst-001",
    "name": "张三 的 OpenClaw",
    "avatarUrl": "/avatars/avatar-1.svg",
    "ownerName": "张三",
    "ownerId": "u-001",
    "vmStatus": "running",
    "feishuStatus": "connected",
    "createdAt": "2026-03-01T10:00:00.000Z",
    "lastActiveAt": "2026-03-28T08:30:00.000Z",
    "appId": "cli_a0001",
    "projectId": "proj-001",
    "globalConfigStatus": "synced",
    "lastConfigSyncAt": "2026-03-27T10:00:00.000Z",
    "ip": "10.0.1.100",
    "cpuSpec": "4 核",
    "memorySpec": "8 GB",
    "uptime": 604800,
    "gatewayHealthy": true,
    "openclawVersion": "1.4.2",
    "logs": [
      {
        "id": "log-inst-001-0",
        "action": "创建实例",
        "operator": "张三",
        "timestamp": "2026-03-28T10:00:00.000Z",
        "detail": "操作成功"
      }
    ]
  }
  ```
- **Response (404)**: 实例不存在

### 3. 执行实例操作

- **Method**: `POST`
- **Path**: `/api/admin/instances/:id/action`
- **Request**:
  ```json
  { "action": "start" }
  ```
- **Action 类型**:
  - `start` - 启动实例
  - `stop` - 停止实例
  - `restart` - 重启实例
  - `restart-gateway` - 重启 Gateway
  - `repair-config` - 修复配置
  - `reset-instance` - 重置实例
  - `delete` - 删除实例
- **Response (200)**: 返回更新后的 Instance 对象
- **Response (404)**: 实例不存在

### 4. 创建实例

- **Method**: `POST`
- **Path**: `/api/admin/instances`
- **Request**:
  ```json
  {
    "name": "string",
    "avatarUrl": "string",
    "appId": "string",      // optional
    "appSecret": "string"   // optional
  }
  ```
- **Response (201)**: 返回创建的 Instance 对象
- **Error (400)**:
  ```json
  { "message": "参数缺失" }
  ```

### 5. 获取实例创建进度

- **Method**: `GET`
- **Path**: `/api/admin/instances/:id/progress`
- **Query**: `?hasAppId=true` (是否配置了飞书应用)
- **Response (200)**:
  ```json
  {
    "steps": [
      { "key": "vm", "label": "启动云端电脑", "status": "done", "elapsed": 8 },
      { "key": "openclaw", "label": "安装 OpenClaw", "status": "running", "elapsed": null },
      { "key": "feishu", "label": "配置飞书连接", "status": "pending", "elapsed": null, "note": null }
    ],
    "done": false
  }
  ```

---

## 管理后台 - 审批管理

### 1. 获取审批列表

- **Method**: `GET`
- **Path**: `/api/admin/approvals`
- **Query**: `?status=pending` (pending/approved/rejected)
- **Response (200)**:
  ```json
  [
    {
      "id": "apr-001",
      "instanceId": "inst-004",
      "instanceName": "设计部灵感助手",
      "instanceAvatarUrl": "/avatars/avatar-4.svg",
      "ownerName": "赵六",
      "ownerAvatarUrl": "/avatars/default-user.svg",
      "appId": "cli_a0004",
      "status": "pending",
      "submittedAt": "2026-03-28T08:00:00.000Z",
      "feishuStatus": "pending"
    }
  ]
  ```

### 2. 审批通过

- **Method**: `POST`
- **Path**: `/api/admin/approvals/:id/approve`
- **Response (200)**: 返回更新后的 Approval 对象
- **Response (404)**: 审批不存在

---

## 管理后台 - 镜像管理

### 1. 获取镜像列表

- **Method**: `GET`
- **Path**: `/api/admin/images`
- **Query**:
  - `search` - 搜索镜像名称
  - `status` - 状态筛选 (available/unavailable/building)
  - `type` - 类型筛选 (vm/openclaw)
  - `sort` - 排序字段 (createdAt/name)
  - `order` - asc/desc
  - `page` - 页码
  - `pageSize` - 每页条数
- **Response (200)**:
  ```json
  {
    "items": [Image],
    "total": 100,
    "page": 1,
    "pageSize": 10
  }
  ```

### 2. 创建镜像

- **Method**: `POST`
- **Path**: `/api/admin/images`
- **Request**:
  ```json
  {
    "type": "vm" | "openclaw",
    "name": "string",
    "version": "string",
    "description": "string",  // optional
    "size": 0                 // optional, MB
  }
  ```
- **Response (201)**: 返回创建的 Image 对象
- **Error (400)**:
  ```json
  { "message": "参数缺失" }
  ```

### 3. 更新镜像

- **Method**: `PUT`
- **Path**: `/api/admin/images/:id`
- **Request**:
  ```json
  {
    "name": "string",
    "description": "string"
  }
  ```
- **Response (200)**: 返回更新后的 Image 对象
- **Response (404)**: 镜像不存在

### 4. 删除镜像

- **Method**: `DELETE`
- **Path**: `/api/admin/images/:id`
- **Response**: `204 No Content`
- **Response (404)**: 镜像不存在

---

## 管理后台 - 用户搜索

### 1. 搜索用户

- **Method**: `GET`
- **Path**: `/api/users/search`
- **Query**: `?q=张三`
- **Response (200)**:
  ```json
  [
    {
      "id": "u-001",
      "name": "张三",
      "department": "研发部",
      "avatarUrl": "/avatars/avatar-1.svg"
    }
  ]
  ```

---

## 接口统计

| 模块 | 接口数量 |
|------|----------|
| 认证模块 | 4 |
| 员工端模块 | 10 |
| 管理后台-仪表盘 | 1 |
| 管理后台-实例管理 | 5 |
| 管理后台-审批管理 | 2 |
| 管理后台-镜像管理 | 4 |
| 管理后台-用户搜索 | 1 |
| **总计** | **27** |
