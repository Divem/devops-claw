## 1. 类型定义扩展

- [x] 1.1 在 `CreateProjectPayload` 接口中新增 `appId?: string` 和 `appSecret?: string` 可选字段

## 2. 创建弹框组件修改

- [ ] 2.1 在 CreateModal 的 form reactive 对象中新增 `appId: ''` 和 `appSecret: ''` 字段
- [x] 2.2 在「配置飞书渠道」模块中，机器人名称输入框下方添加选填提示文字「选填，不填则由系统自动分配」
- [x] 2.3 添加 App ID 文本输入框（NInput，placeholder「请输入 App ID」）
- [x] 2.4 添加 App Secret 密码输入框（NInput type="password"，`show-password-on="click"`，placeholder「请输入 App Secret」）
- [x] 2.5 更新 isValid computed，确保 AppID/Secret 不参与必填校验（仅 name、botName、avatarUrl 控制 disabled 状态）
- [x] 2.6 更新 handleSubmit 逻辑，仅当 appId/appSecret 有值时才包含在 emit payload 中
- [x] 2.7 更新 emit 的 submit 类型定义，payload 新增可选的 appId 和 appSecret 字段

## 3. 样式调整

- [x] 3.1 确认新增输入框与现有样式一致（form-group 间距、输入框边框、字体大小等）
