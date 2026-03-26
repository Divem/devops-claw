# MTP Web Design Tokens

本文档整理了 MTP Web 项目的设计规范（Design Tokens），包含颜色、字体、间距、圆角、阴影、动画等核心视觉元素。开发过程中请遵循此规范以保持界面一致性。

## 1. 颜色系统 (Colors)

### 1.1 品牌主色 (Primary Colors)

| Token | 颜色值 | 用途 |
|-------|--------|------|
| `@primaryColor` | `#006eff` | 品牌主色，按钮、链接、强调元素 |
| `@primaryColorHover` | `#57a3f3` | 主色悬停状态 |
| `primary` (Tailwind) | `#0960bd` | Tailwind 主色配置 |

**使用示例：**
```less
// Less 变量
color: @primaryColor;

// Tailwind 类
.text-primary
.bg-primary
```

### 1.2 链接颜色 (Link Colors)

| 状态 | 颜色值 |
|------|--------|
| 默认 | `#2d8cf0` |
| 悬停 (hover) | `#57a3f3` |
| 激活 (active) | `#2b85e4` |

### 1.3 文字颜色 (Text Colors)

| Token | 颜色值 | 用途 |
|-------|--------|------|
| 正文 | `#515a6e` | 正文内容 |
| 标题 | `#30363e` | 标题、强调文字 |
| 次要文字 | `#606266` | 次要内容、图表文字 |
| 占位符/辅助 | `#909399` | 占位符、禁用文字 |
| 浅色辅助 | `#99a9bf` | 辅助说明 |

### 1.4 背景颜色 (Background Colors)

| Token | 颜色值 | 用途 |
|-------|--------|------|
| 页面背景 | `#f7f7f7` | 全局页面背景 |
| 区域背景 | `#f9f9f9` | 内容区域背景 |
| 面板背景 | `#f6f7f8` | 面板、Tab 内容背景 |
| 容器背景 | `#f3f3f3` | 特殊容器背景 |
| 纯白 | `#ffffff` | 卡片、弹窗背景 |
| 遮罩层 | `rgba(0, 0, 0, 0.9)` | 全屏遮罩 |

### 1.5 边框颜色 (Border Colors)

| 颜色值 | 用途 |
|--------|------|
| `#e4e9f1` | 主要边框、分隔线 |
| `#e4e7ed` | 表单边框 |
| `#cccccc` | 禁用状态边框 |
| `#C0C4CC` | 浅色边框 |

### 1.6 状态颜色 (Status Colors)

| 状态 | 颜色值 | 用途 |
|------|--------|------|
| 成功 (Success) | `#00b81f` / `#18a058` / `#67C23A` | 成功提示、通过状态 |
| 警告 (Warning) | `#ff8800` | 警告提示、待处理状态 |
| 错误/危险 (Error/Danger) | `#f23030` / `#ff4d4f` / `#ee6666` | 错误提示、删除操作 |
| 信息 (Info) | `#409eff` | 信息提示、链接 |

### 1.7 图表颜色 (Chart Colors)

用于 ECharts 等图表组件的配色方案：

```
#5470c6 (蓝色)
#91cc75 (绿色)
#fac858 (黄色)
#ee6666 (红色)
#73c0de (浅蓝)
#409EFF (Element 蓝)
```

### 1.8 深色主题颜色 (Dark Theme)

用于模拟器、代码编辑器等深色场景：

| 用途 | 颜色值 |
|------|--------|
| 主背景 | `#1a1a1a` |
| 次级背景 | `#262626` |
| 卡片背景 | `#2e2e2e` |
| 高亮背景 | `#383838` |
| 设备边框 | `#414141` |
| 边框/分隔 | `#4d4d4d` |
| 主文字 | `#e5e5e5` |
| 次文字 | `#a5a5a5` |

---

## 2. 字体系统 (Typography)

### 2.1 字体族 (Font Family)

```css
font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
  'Microsoft YaHei', '\5FAE\8F6F\96C5\9ED1', Arial, sans-serif;
```

### 2.2 字号规范 (Font Sizes)

| Token | 大小 | 用途 |
|-------|------|------|
| 基础字号 | `14px` | 正文、表单、常规内容 |
| 小字号 | `12px` | 辅助文字、标签、时间戳 |
| 中字号 | `15px`, `16px` | 小标题、强调内容 |
| 大字号 | `18px` | 页面标题、模块标题 |
| 特大字号 | `20px` | 主标题、Logo |
| 展示字号 | `40px` | 大屏展示、特殊场景 |

**Tailwind 配置：**
```js
fontSize: {
  base: '14px',
  xl: '16px',
  '2xl': '18px',
  '3xl': '20px',
}
```

### 2.3 行高 (Line Height)

- 默认行高：`1.5`
- 标题行高：`26px`（用于 filter-header）

### 2.4 字重 (Font Weight)

| 字重 | 用途 |
|------|------|
| `400` | 常规文字 |
| `600` | 标题、强调 |

---

## 3. 间距系统 (Spacing)

### 3.1 常用间距值

| 间距值 | 用途 |
|--------|------|
| `4px` | 紧凑间距、内边距微调 |
| `6px` | 小间距 |
| `8px` | 基础小间距、组件内间距 |
| `10px` | 按钮内边距、列表间距 |
| `12px` | 小卡片内边距 |
| `16px` | 标准间距、模块间距、卡片内边距 |
| `20px` | 中等间距、面板内边距 |
| `24px` | 容器内边距、大间距 |

### 3.2 布局间距

| 场景 | 间距值 |
|------|--------|
| 页面内边距 | `16px` |
| 容器内边距 | `24px` |
| 卡片内边距 | `16px` |
| 模块间距 (margin-top) | `16px` |

### 3.3 布局尺寸

| Token | 值 | 用途 |
|-------|-----|------|
| `@header-height` | `57px` | 顶部导航栏高度 |
| 底部按钮区高度 | `46px` | 底部操作栏高度 |

---

## 4. 圆角系统 (Border Radius)

| 圆角值 | 用途 |
|--------|------|
| `2px` | 微圆角、输入框 |
| `4px` | 标准圆角、卡片、容器 |
| `5px` | 聊天气泡 |
| `6px` | 按钮、弹窗、卡片 |
| `8px` | 下拉菜单、浮动面板 |
| `10px` | UI 组件 |
| `16px` | 设备模拟器、大圆角容器 |

---

## 5. 阴影系统 (Shadows)

### 5.1 阴影层级

| 层级 | 值 | 用途 |
|------|-----|------|
| 轻微阴影 | `0px 0px 2px 0px rgba(0, 0, 0, 0.1)` | 卡片默认状态 |
| 标准阴影 | `0px 0px 8px 0px rgba(2, 2, 2, 0.1)` | 悬浮卡片 |
| 弹出阴影 | `0 2px 8px rgba(0, 0, 0, 0.15)` | 下拉菜单、Tooltip |
| 浮动阴影 | `0 4px 12px rgba(0, 0, 0, 0.2)` | 弹窗、Modal |
| 深层阴影 | `0 4px 16px rgba(0, 0, 0, 0.15)` | 重要浮动元素 |
| 头部阴影 | `0px 2px 10px 0px rgba(96, 102, 110, 0.05)` | 顶部导航栏 |
| 调试面板阴影 | `0 1px 1px 0 rgb(0 0 0 / 10%), 0 2px 4px rgb(0 0 0 / 8%), 0 4px 12px 0 rgb(0 0 0 / 6%)` | 复合阴影 |

### 5.2 遮罩阴影

```css
/* 图片裁剪遮罩 */
box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.45);
```

---

## 6. 动画与过渡 (Animation & Transitions)

### 6.1 过渡时长

| 时长 | 用途 |
|------|------|
| `0.15s` | 快速响应、状态切换 |
| `0.2s` | 标准交互、按钮、链接 |
| `0.25s` | 中等过渡 |
| `0.28s` | 淡入淡出 |
| `0.3s` | 复杂动画、展开收起 |
| `0.35s` | 页面切换、缩放动画 |

### 6.2 缓动函数 (Easing)

| 缓动 | 用途 |
|------|------|
| `ease` | 默认缓动 |
| `ease-in-out` | 平滑过渡 |
| `ease-in-out` | 折叠动画 |

### 6.3 预设过渡类

项目提供了内置的过渡动画类，位于 `src/assets/styles/transition/` 目录：

**淡入淡出 (Fade)：**
```less
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
```

**缩放淡入 (Zoom Fade)：**
```less
.zoom-fade-enter-active,
.zoom-fade-leave-active {
  transition: transform 0.35s, opacity 0.28s ease-in-out;
}
```

**折叠动画 (Collapse)：**
```less
.collapse-transition {
  transition: 0.2s height ease-in-out, 0.2s padding-top ease-in-out, 0.2s padding-bottom ease-in-out;
}
```

**入场动画 (Enter Animation)：**
- `.enter-x` / `.enter-y` - 从 X/Y 方向入场
- `.-enter-x` / `.-enter-y` - 从负方向入场
- 动画时长：`0.4s`
- 延迟递增：每元素 `0.1s`

### 6.4 常用过渡写法

```less
// 标准交互
transition: all 0.2s ease-in-out;

// 复杂动画
transition: all 0.3s;

// 快速响应
transition: all 0.15s;
```

---

## 7. 断点系统 (Breakpoints)

响应式断点配置：

| 断点 | 最小宽度 | 用途 |
|------|----------|------|
| `sm` | `1024px` | 小屏桌面 |
| `md` | `1280px` | 标准桌面 |
| `lg` | `1440px` | 大屏桌面 |
| `xl` | `1680px` | 超大屏 |
| `2xl` | `2560px` | 4K 显示器 |

**Tailwind 配置：**
```js
screens: {
  sm: '1024px',
  md: '1280px',
  lg: '1440px',
  xl: '1680px',
  '2xl': '2560px',
}
```

---

## 8. Z-Index 层级

| 层级值 | 用途 |
|--------|------|
| `-1` | 背景层 |
| `9` | 拖拽手柄 |
| `30` | 加载层 |
| `40` | 错误处理层 |
| `2010` | 弹出组件 (v-binder-follower) |

---

## 9. 组件规范

### 9.1 容器组件 (Container)

```less
.mtp-container {
  background-color: white;
  padding: 24px;
  border-radius: 4px;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.1);
}
```

### 9.2 筛选器组件 (Filter)

```less
.mtp-filter {
  // 继承 .mtp-container 样式

  .filter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .header-title {
      line-height: 26px;
      color: #30363e;
      font-size: 18px;
      font-weight: 600;
    }
  }

  .filter-content {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
  }
}
```

### 9.3 卡片组件 (ms-card)

```less
.ms-card {
  transition: all 0.2s ease-in-out;
  border-radius: 4px;
}

.proCard {
  border-radius: 4px;

  .ms-card__content {
    padding: 16px;
  }
}
```

### 9.4 弹窗组件 (ms-modal)

```less
.ms-modal {
  border-radius: 6px;
}
```

---

## 10. 工具类

### 10.1 调试边框

```css
.b-red { border: 1px solid red !important; }
.b-blue { border: 1px solid blue !important; }
.b-pink { border: 1px solid #db2777 !important; }
```

### 10.2 滚动条隐藏

```css
.hide-scrollbar {
  scrollbar-width: none;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
```

### 10.3 图片/视频响应式

```css
img, video {
  display: block;
  max-width: 100%;
  height: auto;
}
```

---

## 11. 最佳实践

### 11.1 颜色使用

1. **优先使用 Less 变量**：使用 `@primaryColor` 而非硬编码 `#006eff`
2. **语义化颜色**：根据状态选择对应颜色（成功/警告/错误）
3. **对比度**：确保文字与背景有足够对比度

### 11.2 间距使用

1. **使用 4px 倍数**：保持 `4, 8, 12, 16, 20, 24` 等间距值
2. **组件内间距**：使用 `8px` 或 `16px`
3. **模块间距**：统一使用 `16px`

### 11.3 动画使用

1. **避免过度动画**：仅在必要交互处使用
2. **统一时长**：同类交互使用相同时长
3. **考虑性能**：复杂动画使用 `transform` 和 `opacity`

### 11.4 响应式开发

1. **移动优先**：从小屏开始设计
2. **断点选择**：根据内容选择合适断点
3. **弹性布局**：使用 Flexbox 和 Grid

---

## 12. 变量速查表

```less
// 颜色
@primaryColor: #006eff;
@primaryColorHover: #57a3f3;

// 布局
@header-height: 57px;

// Tailwind 主色
primary: #0960bd;
```


评价一下这个design-token