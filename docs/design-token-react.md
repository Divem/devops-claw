# MTP Web Design Tokens - React 版本

本文档是 `design-token.md` 的 React 适配版本，提供多种在 React 项目中使用设计令牌的方案。

---

## 使用方案对比

| 方案 | 优点 | 缺点 | 推荐场景 |
|------|------|------|----------|
| **CSS Variables** | 原生支持，无需构建工具，可动态切换主题 | 无类型提示 | 简单项目、需要运行时主题切换 |
| **Tailwind CSS** | 工具类优先，开发效率高，生态丰富 | 学习成本，HTML 类名冗长 | 中后台系统、快速开发 |
| **CSS-in-JS (Emotion)** | 组件级样式，动态样式，TypeScript 支持 | 运行时开销，构建复杂度 | 复杂组件库、需要动态样式 |
| **CSS Modules + SCSS** | 作用域隔离，预处理器特性 | 文件分散，命名冲突 | 大型项目、团队协作 |

---

## 方案一：CSS Variables（推荐简单项目）

### 1. 创建全局样式文件

```css
/* styles/tokens.css */
:root {
  /* 品牌主色 */
  --color-primary: #006eff;
  --color-primary-hover: #57a3f3;
  --color-primary-active: #2b85e4;
  
  /* 链接颜色 */
  --color-link: #2d8cf0;
  --color-link-hover: #57a3f3;
  --color-link-active: #2b85e4;
  
  /* 文字颜色 */
  --color-text: #515a6e;
  --color-text-heading: #30363e;
  --color-text-secondary: #606266;
  --color-text-placeholder: #909399;
  --color-text-muted: #99a9bf;
  
  /* 背景颜色 */
  --color-bg-page: #f7f7f7;
  --color-bg-area: #f9f9f9;
  --color-bg-panel: #f6f7f8;
  --color-bg-container: #f3f3f3;
  --color-bg-white: #ffffff;
  --color-bg-overlay: rgba(0, 0, 0, 0.9);
  
  /* 边框颜色 */
  --color-border: #e4e9f1;
  --color-border-form: #e4e7ed;
  --color-border-disabled: #cccccc;
  --color-border-light: #C0C4CC;
  
  /* 状态颜色 */
  --color-success: #18a058;
  --color-warning: #ff8800;
  --color-error: #f23030;
  --color-info: #409eff;
  
  /* 深色主题 */
  --color-dark-bg: #1a1a1a;
  --color-dark-bg-secondary: #262626;
  --color-dark-bg-card: #2e2e2e;
  --color-dark-text: #e5e5e5;
  --color-dark-text-secondary: #a5a5a5;
  
  /* 间距 */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  
  /* 圆角 */
  --radius-sm: 2px;
  --radius-md: 4px;
  --radius-lg: 6px;
  --radius-xl: 8px;
  --radius-2xl: 16px;
  
  /* 阴影 */
  --shadow-sm: 0px 0px 2px 0px rgba(0, 0, 0, 0.1);
  --shadow-md: 0px 0px 8px 0px rgba(2, 2, 2, 0.1);
  --shadow-lg: 0 2px 8px rgba(0, 0, 0, 0.15);
  --shadow-xl: 0 4px 12px rgba(0, 0, 0, 0.2);
  --shadow-header: 0px 2px 10px 0px rgba(96, 102, 110, 0.05);
  
  /* 字体 */
  --font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif;
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-md: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 20px;
  
  /* 布局 */
  --header-height: 57px;
  --footer-height: 46px;
  
  /* 动画 */
  --duration-fast: 0.15s;
  --duration-normal: 0.2s;
  --duration-slow: 0.3s;
  --easing-default: ease;
  --easing-smooth: ease-in-out;
  
  /* Z-Index */
  --z-base: 1;
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-modal: 1000;
  --z-popover: 2000;
  --z-tooltip: 3000;
}

/* 深色主题覆盖 */
[data-theme="dark"] {
  --color-bg-page: var(--color-dark-bg);
  --color-text: var(--color-dark-text);
  --color-text-secondary: var(--color-dark-text-secondary);
}
```

### 2. 在 React 中使用

```jsx
// App.jsx
import './styles/tokens.css';

function App() {
  return (
    <div style={{ 
      backgroundColor: 'var(--color-bg-page)',
      fontFamily: 'var(--font-family)'
    }}>
      <h1 style={{ color: 'var(--color-text-heading)' }}>
        Hello MTP
      </h1>
    </div>
  );
}
```

### 3. 创建 React Hooks 管理主题

```jsx
// hooks/useTheme.js
import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState('light');
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return { theme, toggleTheme, setTheme };
}
```

---

## 方案二：Tailwind CSS（推荐中后台项目）

### 1. 完整配置文件

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 品牌色
        primary: {
          DEFAULT: '#006eff',
          hover: '#57a3f3',
          active: '#2b85e4',
          50: '#e6f1ff',
          100: '#cce3ff',
          200: '#99c7ff',
          300: '#66abff',
          400: '#338fff',
          500: '#006eff',
          600: '#0058cc',
          700: '#004299',
          800: '#002c66',
          900: '#001633',
        },
        
        // 链接色
        link: {
          DEFAULT: '#2d8cf0',
          hover: '#57a3f3',
          active: '#2b85e4',
        },
        
        // 文字色
        text: {
          DEFAULT: '#515a6e',
          heading: '#30363e',
          secondary: '#606266',
          placeholder: '#909399',
          muted: '#99a9bf',
        },
        
        // 背景色
        background: {
          page: '#f7f7f7',
          area: '#f9f9f9',
          panel: '#f6f7f8',
          container: '#f3f3f3',
        },
        
        // 边框色
        border: {
          DEFAULT: '#e4e9f1',
          form: '#e4e7ed',
          disabled: '#cccccc',
          light: '#C0C4CC',
        },
        
        // 状态色
        success: {
          DEFAULT: '#18a058',
          light: '#e8f5e9',
        },
        warning: {
          DEFAULT: '#ff8800',
          light: '#fff3e0',
        },
        error: {
          DEFAULT: '#f23030',
          light: '#ffebee',
        },
        info: {
          DEFAULT: '#409eff',
          light: '#e3f2fd',
        },
        
        // 深色主题
        dark: {
          bg: '#1a1a1a',
          'bg-secondary': '#262626',
          'bg-card': '#2e2e2e',
          text: '#e5e5e5',
          'text-secondary': '#a5a5a5',
        },
      },
      
      fontFamily: {
        sans: ['Helvetica Neue', 'Helvetica', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Arial', 'sans-serif'],
      },
      
      fontSize: {
        'xs': ['12px', { lineHeight: '1.5' }],
        'sm': ['14px', { lineHeight: '1.5' }],
        'base': ['14px', { lineHeight: '1.5' }],
        'lg': ['16px', { lineHeight: '1.5' }],
        'xl': ['18px', { lineHeight: '26px' }],
        '2xl': ['20px', { lineHeight: '1.4' }],
        '3xl': ['24px', { lineHeight: '1.3' }],
        '4xl': ['32px', { lineHeight: '1.2' }],
        'display': ['40px', { lineHeight: '1.1' }],
      },
      
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
      },
      
      borderRadius: {
        'sm': '2px',
        'md': '4px',
        'lg': '6px',
        'xl': '8px',
        '2xl': '10px',
        '3xl': '16px',
      },
      
      boxShadow: {
        'sm': '0px 0px 2px 0px rgba(0, 0, 0, 0.1)',
        'md': '0px 0px 8px 0px rgba(2, 2, 2, 0.1)',
        'lg': '0 2px 8px rgba(0, 0, 0, 0.15)',
        'xl': '0 4px 12px rgba(0, 0, 0, 0.2)',
        '2xl': '0 4px 16px rgba(0, 0, 0, 0.15)',
        'header': '0px 2px 10px 0px rgba(96, 102, 110, 0.05)',
        'debug': '0 1px 1px 0 rgb(0 0 0 / 10%), 0 2px 4px rgb(0 0 0 / 8%), 0 4px 12px 0 rgb(0 0 0 / 6%)',
      },
      
      transitionDuration: {
        'fast': '150ms',
        'normal': '200ms',
        'slow': '300ms',
      },
      
      transitionTimingFunction: {
        'smooth': 'ease-in-out',
      },
      
      zIndex: {
        'base': '1',
        'dropdown': '100',
        'sticky': '200',
        'modal': '1000',
        'popover': '2000',
        'tooltip': '3000',
      },
      
      height: {
        'header': '57px',
        'footer': '46px',
      },
      
      minHeight: {
        'header': '57px',
      },
    },
    
    screens: {
      'sm': '1024px',
      'md': '1280px',
      'lg': '1440px',
      'xl': '1680px',
      '2xl': '2560px',
    },
  },
  plugins: [],
}
```

### 2. 在 React 中使用

```jsx
// 示例组件
function Card({ title, children }) {
  return (
    <div className="
      bg-white 
      p-md 
      rounded-md 
      shadow-sm 
      transition-all 
      duration-normal 
      ease-smooth
      hover:shadow-md
    ">
      <h2 className="text-xl font-semibold text-text-heading mb-md">
        {title}
      </h2>
      <div className="text-text">
        {children}
      </div>
    </div>
  );
}

// 按钮组件
function Button({ variant = 'primary', children, ...props }) {
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-hover',
    secondary: 'bg-background-area text-text hover:bg-background-panel',
    danger: 'bg-error text-white hover:opacity-80',
  };
  
  return (
    <button 
      className={`
        px-md py-sm 
        rounded-lg 
        font-medium 
        transition-all 
        duration-fast
        ${variants[variant]}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
```

### 3. 安装依赖

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

## 方案三：CSS-in-JS with Emotion

### 1. 安装依赖

```bash
npm install @emotion/react @emotion/styled
```

### 2. 创建主题配置

```javascript
// theme.js
export const theme = {
  colors: {
    primary: {
      main: '#006eff',
      hover: '#57a3f3',
      active: '#2b85e4',
    },
    text: {
      main: '#515a6e',
      heading: '#30363e',
      secondary: '#606266',
      placeholder: '#909399',
    },
    background: {
      page: '#f7f7f7',
      card: '#ffffff',
      area: '#f9f9f9',
    },
    border: '#e4e9f1',
    status: {
      success: '#18a058',
      warning: '#ff8800',
      error: '#f23030',
      info: '#409eff',
    },
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  
  borderRadius: {
    sm: '2px',
    md: '4px',
    lg: '6px',
    xl: '8px',
  },
  
  shadows: {
    sm: '0px 0px 2px 0px rgba(0, 0, 0, 0.1)',
    md: '0px 0px 8px 0px rgba(2, 2, 2, 0.1)',
    lg: '0 2px 8px rgba(0, 0, 0, 0.15)',
  },
  
  transitions: {
    fast: '150ms ease',
    normal: '200ms ease-in-out',
    slow: '300ms ease-in-out',
  },
  
  typography: {
    fontFamily: '"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif',
    sizes: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '18px',
      xl: '20px',
    },
  },
};
```

### 3. 创建类型定义（TypeScript）

```typescript
// theme.d.ts
import { theme } from './theme';

type Theme = typeof theme;

declare module '@emotion/react' {
  export interface Theme extends Theme {}
}
```

### 4. 在 React 中使用

```jsx
// App.jsx
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <YourApp />
    </ThemeProvider>
  );
}

// components/Card.jsx
import styled from '@emotion/styled';

const Card = styled.div`
  background-color: ${props => props.theme.colors.background.card};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => props.theme.shadows.sm};
  transition: all ${props => props.theme.transitions.normal};
  
  &:hover {
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const CardTitle = styled.h2`
  font-size: ${props => props.theme.typography.sizes.lg};
  color: ${props => props.theme.colors.text.heading};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

// 使用
function MyCard() {
  return (
    <Card>
      <CardTitle>标题</CardTitle>
      <p>内容</p>
    </Card>
  );
}
```

---

## 方案四：CSS Modules + SCSS

### 1. 文件结构

```
src/
  styles/
    _variables.scss      # SCSS 变量
    _mixins.scss         # SCSS Mixins
    tokens.module.scss   # CSS Modules
  components/
    Button/
      index.jsx
      Button.module.scss
```

### 2. SCSS 变量文件

```scss
// styles/_variables.scss

// 颜色
$color-primary: #006eff;
$color-primary-hover: #57a3f3;
$color-primary-active: #2b85e4;

$color-text: #515a6e;
$color-text-heading: #30363e;
$color-text-secondary: #606266;

$color-bg-page: #f7f7f7;
$color-bg-card: #ffffff;

$color-border: #e4e9f1;

$color-success: #18a058;
$color-warning: #ff8800;
$color-error: #f23030;

// 间距
$spacing-xs: 4px;
$spacing-sm: 8px;
$spacing-md: 16px;
$spacing-lg: 24px;

// 圆角
$radius-sm: 2px;
$radius-md: 4px;
$radius-lg: 6px;

// 阴影
$shadow-sm: 0px 0px 2px 0px rgba(0, 0, 0, 0.1);
$shadow-md: 0px 0px 8px 0px rgba(2, 2, 2, 0.1);

// 字体
$font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif;
$font-size-sm: 14px;
$font-size-md: 16px;
$font-size-lg: 18px;

// 过渡
$transition-fast: 150ms ease;
$transition-normal: 200ms ease-in-out;
```

### 3. 在组件中使用

```scss
// components/Button/Button.module.scss
@import '../../styles/variables';
@import '../../styles/mixins';

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: $spacing-sm $spacing-md;
  font-size: $font-size-sm;
  font-family: $font-family;
  border-radius: $radius-lg;
  border: none;
  cursor: pointer;
  transition: all $transition-normal;
  
  &.primary {
    background-color: $color-primary;
    color: white;
    
    &:hover {
      background-color: $color-primary-hover;
    }
    
    &:active {
      background-color: $color-primary-active;
    }
  }
  
  &.secondary {
    background-color: $color-bg-page;
    color: $color-text;
    border: 1px solid $color-border;
  }
}
```

```jsx
// components/Button/index.jsx
import styles from './Button.module.scss';

function Button({ variant = 'primary', children, ...props }) {
  return (
    <button 
      className={`${styles.button} ${styles[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
}
```

---

## React 组件最佳实践

### 1. 通用容器组件

```jsx
// components/Container.jsx
function Container({ children, className = '' }) {
  return (
    <div className={`
      bg-white 
      p-6 
      rounded 
      shadow-sm
      ${className}
    `}>
      {children}
    </div>
  );
}

// 或使用 CSS-in-JS
import styled from '@emotion/styled';

export const Container = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: 4px;
  box-shadow: ${props => props.theme.shadows.sm};
`;
```

### 2. 响应式布局组件

```jsx
// components/ResponsiveGrid.jsx
function ResponsiveGrid({ children }) {
  return (
    <div className="
      grid 
      grid-cols-1 
      sm:grid-cols-2 
      md:grid-cols-3 
      lg:grid-cols-4 
      gap-4
    ">
      {children}
    </div>
  );
}
```

### 3. 主题切换组件

```jsx
// components/ThemeToggle.jsx
import { useTheme } from '../hooks/useTheme';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button 
      onClick={toggleTheme}
      className="
        px-4 
        py-2 
        rounded-lg 
        bg-primary 
        text-white
        transition-all
        duration-200
        hover:bg-primary-hover
      "
    >
      {theme === 'light' ? '🌙 深色模式' : '☀️ 浅色模式'}
    </button>
  );
}
```

---

## 与 Ant Design / Arco Design 集成

如果使用组件库，可以自定义主题：

```javascript
// Ant Design 主题配置
// config/antd-theme.js
export const antdTheme = {
  token: {
    colorPrimary: '#006eff',
    colorLink: '#2d8cf0',
    colorSuccess: '#18a058',
    colorWarning: '#ff8800',
    colorError: '#f23030',
    borderRadius: 4,
    fontSize: 14,
    fontFamily: '"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif',
  },
};

// 在 App.jsx 中使用
import { ConfigProvider } from 'antd';
import { antdTheme } from './config/antd-theme';

function App() {
  return (
    <ConfigProvider theme={antdTheme}>
      <YourApp />
    </ConfigProvider>
  );
}
```

---

## 快速启动模板

### 创建新项目（Vite + React + Tailwind）

```bash
# 创建项目
npm create vite@latest my-app -- --template react

# 安装 Tailwind
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 复制上面的 tailwind.config.js 配置
# 在 index.css 中添加
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 推荐的 VS Code 插件

- **Tailwind CSS IntelliSense** - Tailwind 类名自动补全
- **Color Highlight** - 颜色预览
- **CSS Variable Autocomplete** - CSS 变量提示

---

## 参考资源

- [原 Vue/Less 版本](./design-token.md)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [Emotion 文档](https://emotion.sh/docs/introduction)
- [CSS Modules 文档](https://github.com/css-modules/css-modules)
