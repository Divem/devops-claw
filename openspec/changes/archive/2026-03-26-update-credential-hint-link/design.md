## Context

CreateModal 中刚新增的 App ID/Secret 输入框上方有一行提示文字。当前文案为「选填，不填则由系统自动分配」，需要替换为更有引导性的文案，并增加申请入口链接。

## Goals / Non-Goals

**Goals:**
- 替换提示文案为「联系管理员，获取飞书机器人信息」
- 在文案右侧添加「申请机器人」文字链接，新窗口打开飞书表单

**Non-Goals:**
- 不修改 App ID/Secret 输入框本身的行为和样式
- 不增加链接的权限控制（所有员工可见）

## Decisions

### 链接打开方式：target="_blank"

使用 `window.open(url, '_blank')` 在新标签页打开，避免离开创建弹框流程。

### URL 配置：硬编码为常量

飞书申请表单 URL 作为组件内常量，后续如需可提取到配置文件。

## Risks / Trade-offs

- **[风险] 飞书表单 URL 可能变更** → 缓解：URL 作为独立常量定义，便于后续维护。
