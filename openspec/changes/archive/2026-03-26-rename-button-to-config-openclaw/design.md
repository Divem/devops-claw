## Context

当前创建完成页面和项目卡片上的【打开项目】按钮会跳转到外部 OpenClaw Gateway Dashboard URL。用户离开 DevOps 平台后体验断裂，且无法在统一入口完成管理操作。

参考截图：
- `11openclaw-管理面板-控制台.png`：Gateway Dashboard 聊天界面，左侧为功能导航（聊天、概览、通道、实例、会话等），右侧为聊天区域
- `13openclaw-管理面板-代码模式.png`：VS Code 风格的文件管理器 + `openclaw.json` 配置编辑器

## Goals / Non-Goals

**Goals:**
- 将【打开项目】改为【配置 OpenClaw】，明确操作语义
- 在平台内新增 OpenClaw 管理页面，通过 iframe 嵌入 Gateway Dashboard
- 提供「控制台」和「代码模式」两种视图切换
- 管理页面顶部展示项目状态信息和快捷操作

**Non-Goals:**
- 不重新实现 Gateway Dashboard 的功能，仅做 iframe 嵌入
- 不修改 Gateway Dashboard 本身的 UI 或功能
- 不涉及管理端后台页面的改动

## Decisions

### 1. 使用 iframe 嵌入 Gateway Dashboard

**选择**：通过 iframe 加载 Gateway Dashboard 的不同路由来实现控制台和代码模式。

**理由**：
- Gateway Dashboard 是 OpenClaw 自带的成熟 Web 管理界面，功能完整
- 重新实现成本极高且无必要
- iframe 可以直接复用 Gateway 的全部能力

**替代方案**：
- 通过 API 调用 Gateway 后端、自建前端 → 开发量大，维护成本高，放弃
- 新窗口打开 Gateway → 用户体验断裂，不满足一站式需求，放弃

### 2. 标签页切换控制台/代码模式

**选择**：管理页面顶部使用标签页（Tab）切换「控制台」和「代码模式」两种视图。

**理由**：
- 参考截图中 Gateway Dashboard 顶部已有「控制台」和「代码」两个标签，保持一致的心智模型
- 切换标签页时更换 iframe 的 src 指向 Gateway 的不同路由

### 3. iframe 通信与鉴权

**选择**：iframe src 直接指向虚拟机上 Gateway Dashboard 的内网地址，平台后端做代理转发。

**理由**：
- Gateway Dashboard 运行在员工专属虚拟机上，内网地址不可直接从浏览器访问
- 通过平台后端 API 做反向代理，同时解决跨域和鉴权问题
- 平台登录态可传递到代理层，无需 Gateway 单独鉴权

## Risks / Trade-offs

- **iframe 跨域限制** → 通过后端反向代理解决，代理路径：`/api/projects/:id/gateway/*` → 虚拟机 Gateway 地址
- **iframe 内页面交互受限（如全屏、文件下载）** → 设置 `allow` 属性和 `sandbox` 策略，允许必要的交互能力
- **Gateway Dashboard 加载性能** → iframe 首次加载可能较慢，添加 loading 骨架屏过渡
- **Gateway 服务未就绪时的兜底** → 管理页面需检测 Gateway 可用性，不可用时展示提示信息和重试按钮
