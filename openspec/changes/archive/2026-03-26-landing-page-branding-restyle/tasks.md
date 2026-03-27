## 1. HeroSection 品牌文案替换

- [x] 1.1 标题 "飞书 OpenClaw" → "DevOps Claw"
- [x] 1.2 副标题中 "飞书" → "DevOps"（全部出现处）

## 2. HeroSection 样式对齐 design-token

- [x] 2.1 标题字号 48px → 40px（展示字号），字重 700 → 600
- [x] 2.2 CTA 按钮 border-radius: 24px → 6px（@radiusButton）
- [x] 2.3 响应式断点 @media (max-width: 768px) → (max-width: 1024px)，移动端断点不变
- [x] 2.4 确认副标题字重为 400（默认），颜色使用 @textColorSecondary

## 3. FeatureCards 品牌文案替换

- [x] 3.1 Card 1 描述 "飞书 IM" → "即时通讯"
- [x] 3.2 Card 2 描述 "飞书官方插件" → "官方集成插件"
- [x] 3.3 Card 3 描述 "飞书体系" → "企业内网"

## 4. FeatureCards 样式对齐 design-token

- [x] 4.1 卡片 hover box-shadow 改为 `0px 0px 8px 0px rgba(2, 2, 2, 0.1)`（标准阴影）
- [x] 4.2 卡片 transition 从 0.3s → 0.2s ease-in-out（标准交互）
- [x] 4.3 卡片 border-radius 使用标准值（@radiusCard 或 6px）
- [x] 4.4 响应式断点 1024px → 1440px（md），768px → 1024px（sm）

## 5. LandingPage 品牌文案替换

- [x] 5.1 顶部导航品牌名 "飞书" → "DevOps Claw"
- [x] 5.2 导航链接 "OpenClaw 体验指南" → "Claw 体验指南"
- [x] 5.3 导航链接 hover 颜色改为 `#2d8cf0` / hover `#57a3f3`（链接色令牌）

## 6. LandingFooter 品牌文案替换

- [x] 6.1 品牌名 "飞书" → "DevOps Claw"
- [x] 6.2 导航链接替换：飞书官网/妙塔/aily/aPaaS/集成平台 → 文档/API/社区/状态页/更新日志
- [x] 6.3 版权信息替换：移除飞书公司名和备案号，改为 DevOps Claw 版权

## 7. 测试更新

- [x] 7.1 更新 HeroSection 测试：标题断言改为 "DevOps Claw"
- [x] 7.2 更新 LandingFooter 测试：品牌名断言、导航链接断言、版权信息断言
- [x] 7.3 更新 FeatureCards 测试：描述文案断言中 "飞书" 相关验证
- [x] 7.4 全局搜索确认零 "飞书" 残留（落地页相关文件）

## 8. 验证

- [x] 8.1 运行全部测试 `npx vitest run` 通过
- [x] 8.2 运行构建 `npm run build` 无错误
