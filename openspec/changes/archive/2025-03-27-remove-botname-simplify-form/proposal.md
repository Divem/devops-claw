## Why

简化 OpenClaw 项目创建弹框的表单结构，移除不必要的机器人名称输入框，让飞书渠道配置更加简洁明了。同时调整 AppID 和 Secret 标签的视觉样式，使其与主要表单标签有所区分。

## What Changes

- **移除** "配置飞书渠道" 区域的机器人名称 (botName) 输入框
- **修改** AppID 和 Secret 标签样式，去除加粗效果
- **调整** 表单验证逻辑，移除对 botName 的必填验证
- **调整** 提交数据处理，不再包含 botName 字段
- **添加** 创建按钮下方提示文字："跳过机器人配置，先直接创建OpenClaw"

## Capabilities

### New Capabilities
- `simplify-feishu-form`: 简化飞书渠道配置表单，移除 botName 输入框并调整标签样式

### Modified Capabilities
<!-- 无现有 spec 需要修改 -->

## Impact

- `src/components/CreateModal.vue` - 表单结构和样式修改
- 移除 botName 相关验证和数据处理
- 需要创建新的非加粗标签样式类
