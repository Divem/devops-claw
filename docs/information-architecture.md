# DevOps OpenClaw 信息架构

> 版本：v2.0 | 更新日期：2026-03-28

---

## 总览

```
DevOps OpenClaw
│
├── 🔐 认证系统
│
├── 👤 员工端（前台）
│   ├── 🏠 首页
│   ├── 📦 创建流程
│   ├── 📋 我的项目
│   └── 🖥️ 项目配置管理
│
├── 👨‍💼 管理端（后台）
│   ├── 📊 仪表盘
│   ├── 🗂️ 实例管理
│   ├── ⚙️ 全局配置
│   └── ✅ 审批管理
│
└── ⚙️ 后端服务
    ├── 🔧 编排引擎
    ├── 🔗 飞书集成服务
    ├── 📡 监控服务
    └── 🌐 API Gateway
```

---

## 1. 认证系统

```
认证系统
├── 登录方式          用户名 / 密码（全局登录弹窗）
├── Token 管理       accessToken + refreshToken + expiresAt
├── 自动刷新          过期前 5 分钟定时刷新
├── 401 重试          刷新 Token 后自动重发失败请求
└── 持久化            localStorage + 页面刷新恢复
```

---

## 2. 员工端

### 2.1 首页

```
首页
├── 落地页（未登录）
│   ├── Hero 区域         全屏光晕动画 + 图片缩放特效
│   ├── 特性卡片          一键部署 / 原生体验 / 企业级安全
│   ├── 鼠标跟随提示      CursorTips 气泡
│   └── 页脚
│
├── 员工首页（已登录，状态机驱动）
│   ├── loading           加载中
│   ├── empty             引导创建（Hero + FeatureList + CreateGuide）
│   ├── has_project       我的项目（ProjectCard + FeatureList）
│   └── admin             项目配置管理（跳转 /projects/:id/admin）
│
└── 顶部导航栏（AppHeader）
    ├── 品牌标识
    ├── UserDropdown
    └── 登录按钮 / 用户信息
```

### 2.2 创建流程

```
创建流程
├── ① 设置项目（CreateModal）
│   ├── 项目名输入        实时校验
│   ├── 飞书渠道配置       12 个头像选择 + 可选 AppID/Secret + 跳过
│   └── 确认创建
│
├── ② 部署进度（ProgressModal，2s 轮询）
│   ├── Step 1            启动云端电脑（虚拟机创建）
│   ├── Step 2            启动 OpenClaw（服务部署）
│   └── Step 3            连接飞书（Gateway 启动 + 凭证写入）
│
└── ③ 创建结果（CompleteModal）
    ├── 成功               部署完成 + 审批状态 + 「配置 OpenClaw」按钮
    └── 失败               错误信息 + 重试按钮
```

### 2.3 我的项目

```
我的项目
└── ProjectCard
    ├── 头像 + 项目名
    ├── 状态标签           创建中 / 已部署 / 审批中 / 异常
    ├── BotInfoDropdown    查看/复制凭证、去对话
    ├── 配置 OpenClaw      跳转项目配置管理页
    └── 更多操作           删除（DeleteConfirm：「删除后内容无法恢复」）
```

### 2.4 项目配置管理（/projects/:id/admin）

```
项目配置管理
├── 顶部工具栏
│   ├── 返回按钮
│   ├── 项目头像 + 名称 + 状态标签
│   └── 视图切换          控制台 / 代码模式 / 终端
│
├── 控制台模式
│   ├── 左侧导航（11 项）
│   │   ├── 控制台           ConsoleView（默认）
│   │   ├── 聊天             iframe /chat
│   │   ├── 概览             iframe /overview
│   │   ├── 通道             iframe /channels
│   │   ├── 实例             iframe /instances
│   │   ├── 会话             iframe /sessions
│   │   ├── 使用情况         iframe /usage
│   │   ├── 定时任务         iframe /schedules
│   │   ├── 配置             iframe /code
│   │   ├── 日志             iframe /logs
│   │   └── 文档             iframe /docs
│   ├── 右侧内容区
│   │   ├── ConsoleView 组件（控制台菜单）
│   │   ├── iframe Gateway Dashboard（其余菜单）
│   │   ├── 骨架屏 / 错误提示
│   │   └── 自动健康检查（10s 轮询）
│   └── BotInfoDropdown     AppID/Secret 脱敏展示 + 去对话
│
├── 代码模式（ConfigCodeMode）
│   ├── 文件资源管理器
│   │   ├── 新建文件/文件夹 + 刷新
│   │   ├── 实时搜索过滤
│   │   ├── 树形文件展示（展开/收起）
│   │   └── 拖拽调整宽度（180-400px）
│   ├── 代码编辑器
│   │   ├── 多文件 Tab 切换（关闭、未保存标记）
│   │   ├── 面包屑路径导航
│   │   ├── Monaco Editor（JSON 语法高亮、500ms 自动保存、Ctrl+S）
│   │   ├── 空状态提示
│   │   └── 状态栏（行列、文件类型、编码）
│   └── 支持格式            JSON / YAML / 纯文本
│
└── 终端模式（TerminalView）
    ├── 欢迎信息
    ├── 系统信息            负载 / 内存 / 配置大小 / 最后修改时间
    ├── 配置预览            cat config.yaml 风格
    └── 终端界面            深色主题、等宽字体、闪烁光标
```

---

## 3. 管理端

### 3.1 全局布局

```
AdminLayout
├── 顶部导航栏             返回按钮 + 品牌标识 + UserDropdown
├── 左侧边栏
│   ├── 仪表盘
│   ├── 实例管理
│   ├── 全局配置
│   └── 审批管理
└── 内容区                 router-view
```

### 3.2 仪表盘

```
仪表盘
├── 统计卡片               总数 / 运行中 / 已停止 / 异常 → 点击跳转（带筛选）
├── 资源使用               CPU / 内存 / 存储 / 网络 → NProgress 进度条
├── 创建趋势
│   ├── 时间范围           7天 / 30天 / 90天 / 自定义
│   ├── 趋势图表           InteractiveTrendChart
│   └── 刷新
└── 待处理事项             待审批长连接 + 异常实例 → 快捷跳转
```

### 3.3 实例管理

```
实例管理
├── 实例列表
│   ├── 搜索               防抖 300ms
│   ├── 筛选               多选状态
│   ├── 排序 + 分页
│   └── 字段               名称 / 员工 / 虚拟机状态 / 飞书状态 / 时间
│
├── 创建实例（InstanceCreateModal）
│   ├── Step 1            表单（名称 + 渠道 + 头像）
│   ├── Step 2            进度
│   └── Step 3            完成
│
├── 实例详情（InstanceDrawer）
│   ├── 基本信息           项目名 / 员工 / AppID / 创建时间
│   ├── 虚拟机信息         IP / 规格 / 运行时长
│   ├── 服务状态           Gateway 健康检查 / OpenClaw 版本 / 飞书长连接
│   └── 操作日志           NTimeline 时间线
│
└── 实例操作（7 种，各自确认弹窗）
    ├── 启动               直接执行
    ├── 重启               RestartConfirmModal
    ├── 重启 Gateway       RestartGatewayConfirmModal
    ├── 修复配置           RepairConfigConfirmModal
    ├── 恢复初始设置       ResetInstanceConfirmModal
    ├── 停止               StopConfirmModal
    └── 强制删除           DeleteInstanceConfirmModal
```

### 3.4 全局配置

```
全局配置
├── 模型配置
│   ├── 供应商             Anthropic / OpenAI / DeepSeek / 自定义
│   ├── API Key            脱敏展示 + 更新
│   ├── Base URL
│   ├── 默认模型
│   ├── 最大 Token
│   └── Temperature
│
├── Memory 配置
│   ├── 启用开关
│   ├── 策略               滚动窗口 / 摘要 / 混合
│   ├── 上下文上限
│   └── 保留天数
│
├── 发布策略
│   ├── 应用范围           全部 / 运行中 / 已停止 / 指定实例
│   ├── 生效方式           强制生效 / 条件生效 / 下次启动
│   └── 确认弹窗           完整参数 + 影响范围
│
└── 降级警告               已停止实例提示
```

### 3.5 审批管理

```
审批管理
├── 视图切换               卡片 / 列表（localStorage 记忆选择）
├── 配置引导（ApprovalGuide）
│   ├── 折叠步骤说明
│   └── 可关闭提示框
├── 状态筛选               全部 / 待审批 / 已审批
│
├── 卡片视图（ApprovalCard）
│   ├── 实例头像 + 名称 + 员工 + AppID
│   ├── 提交时间
│   └── 审批操作           通过 + 连接验证
│
└── 列表视图（ApprovalListItem）
    ├── 表头               员工 / 实例 / AppID / 时间 / 状态 / 操作
    └── 响应式             小屏自动切换卡片
```

---

## 4. 后端服务

```
后端服务
│
├── 编排引擎
│   ├── 虚拟机生命周期       创建 / 启动 / 停止 / 销毁
│   ├── OpenClaw 安装       npm i -g openclaw 或镜像部署
│   ├── 配置文件注入         openclaw.json 生成与写入
│   └── Gateway 启动注册
│
├── 飞书集成服务
│   ├── 凭证管理             AppID/Secret 加密存储
│   ├── 平台 API 对接        飞书开放平台
│   ├── 长连接监听           状态同步
│   └── 权限预置             tenant + user 级别批量配置
│
├── 监控服务
│   ├── 虚拟机探活           心跳检测
│   ├── Gateway 探活         HTTP 健康端点
│   ├── 长连接监控
│   └── 异常告警             飞书消息 / 邮件
│
└── API Gateway
    ├── 认证 API             登录 / 登出 / 刷新 / 当前用户
    ├── 员工端 API           创建 / 查询 / 删除项目 / 机器人配置 / 头像列表
    ├── 管理端 API           实例管理 / 审批 / 统计 / 全局配置 / 用户搜索
    ├── Gateway 代理         /api/projects/:id/gateway/*
    └── 轮询机制             创建进度 2s / 健康检查 10s
```

---

## 5. 页面路由

```
路由
├── /                       落地页（未登录）或 员工首页（已登录）
├── /login                  登录页（如有独立路由）
├── /projects/:id/admin     项目配置管理
├── /admin                  管理端仪表盘
├── /admin/instances        实例管理
├── /admin/config           全局配置
└── /admin/approvals        审批管理
```
