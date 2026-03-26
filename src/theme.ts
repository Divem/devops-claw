import type { GlobalThemeOverrides } from 'naive-ui'

export const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#006eff',
    primaryColorHover: '#57a3f3',
    primaryColorPressed: '#2b85e4',
    successColor: '#00b81f',
    warningColor: '#ff8800',
    errorColor: '#f23030',
    infoColor: '#409eff',
    fontFamily:
      "'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif",
    fontSize: '14px',
    borderRadius: '4px',
    bodyColor: '#f7f7f7',
    cardColor: '#ffffff',
    textColorBase: '#515a6e',
    textColor1: '#30363e',
    textColor2: '#515a6e',
    textColor3: '#909399',
    borderColor: '#e4e9f1',
  },
  Button: {
    borderRadiusMedium: '6px',
    borderRadiusLarge: '6px',
  },
  Modal: {
    borderRadius: '6px',
  },
  Card: {
    borderRadius: '4px',
    boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.1)',
  },
  Input: {
    borderRadius: '2px',
  },
  Dialog: {
    borderRadius: '6px',
  },
}
