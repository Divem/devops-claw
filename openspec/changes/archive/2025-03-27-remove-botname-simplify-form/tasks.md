## 1. 移除 botName 相关代码

- [x] 1.1 删除 botName 输入框元素（placeholder="达尔文的 Claw" 的 n-input）
- [x] 1.2 从 form reactive 对象中移除 botName 字段
- [x] 1.3 从 isValid computed 中移除 botName 验证
- [x] 1.4 从 submit payload 中移除 botName
- [x] 1.5 从 emit 定义中移除 botName 字段

## 2. 修改标签样式

- [x] 2.1 创建新的 CSS 类 `.form-label-light`（font-weight: 400）
- [x] 2.2 将 App ID 标签的 class 从 `form-label` 改为 `form-label-light`
- [x] 2.3 将 App Secret 标签的 class 从 `form-label` 改为 `form-label-light`

## 3. 添加提示文字

- [x] 3.1 在创建按钮下方添加提示文字："跳过机器人配置，先直接创建OpenClaw"
- [x] 3.2 使用小字号灰色样式（复用现有 .form-hint 样式或创建新类）

## 4. 验证修改

- [x] 4.1 构建项目确保无错误
- [x] 4.2 运行测试套件确保无回归
