import { GlobalToken } from 'antd';
import commonComponentThemeConfig from 'src/theme/common-component-theme-config';

export const darkThemeComponent = (token: Partial<GlobalToken>) => ({
  ...commonComponentThemeConfig,
  Layout: {
    ...commonComponentThemeConfig.Layout,
    headerBg: token.colorPrimary,
    siderBg: '#000000',
    algorithm: true,
  },
});

export default darkThemeComponent;
