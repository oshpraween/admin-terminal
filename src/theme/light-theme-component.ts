import { GlobalToken } from 'antd';
import commonComponentThemeConfig from 'src/theme/common-component-theme-config';

export const lightThemeComponent = (token: Partial<GlobalToken>) => ({
  ...commonComponentThemeConfig,
  Layout: {
    ...commonComponentThemeConfig.Layout,
    headerHeight: 40,
    headerBg: token.colorPrimary,
  },
  Menu: {
    ...commonComponentThemeConfig.Menu,
    horizontalItemSelectedColor: token.colorPrimary,
    itemColor: token.colorTextSecondary,
  },
  Tooltip: {
    colorBgSpotlight: token.colorPrimary,
  },
});

console.log('lightThemeComponent: ', lightThemeComponent);

export default lightThemeComponent;
