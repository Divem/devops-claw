## 背景
- 公司使用飞书办公，飞书机器人由管理员统一创建和分配，员工无法自主创建机器人。
- 作为 devops 平台，准备给大家创建一个 openclaw 一键安装方案，在平台点击安装 openclaw 后，自动化创建虚拟机，并根据 appid 和 secrete 配置飞书机器人插件
- 创建后需要管理员配合配置长连接
- 规划一下这个平台，前端支持员工快速创建 openclaw，后台管理端支持对所有openclaw 虚拟机和服务进行监控和管理

参考：https://openclaw.feishu.cn/
截图参考：docs/images

# DevOps OpenClaw 部署流程

```mermaid
sequenceDiagram
    participant A as 管理员
    participant B as 员工
    participant C as DevOps OpenClaw
    participant D as OpenClaw
    participant E as 飞书平台

    A->>E: 1.创建机器人(获取AppID/Secret),配置预置权限
    Note over A: 【管理员操作】
    A->>B: 2.分配机器人AppID/Secret
    B->>C: 3.在平台页面提交AppID/Secret
    Note over B: 员工操作
    C->>D: 4.创建虚机,写入配置,启动Gateway服务
    D-->>C: 5.返回Gateway启动成功状态
    C-->>B: 6.提示配置完成,提醒管理员配置长连接
    B->>A: 7.通知管理员配置长连接
    Note over B: 员工操作
    A->>E: 8.配置WebSocket长连接,添加事件,发布应用
    Note over A: 管理员操作
    E->>D: 9.绑定长连接,建立双向通信
    D-->>C: 10.同步长连接成功状态
    C-->>B: 11.页面显示机器人名称,二维码,提示对接完成可使用
```
