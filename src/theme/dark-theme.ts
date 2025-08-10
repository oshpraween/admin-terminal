import commonThemeConfig from './common-theme-config';
import { buildAntdColorTokens } from 'src/utils/theme';

const colorMap: Record<string, string> = {
  primary: 'Primary',
  success: 'Success',
  warning: 'Warning',
  error: 'Error',
  info: 'Info',
  link: 'Link',
  text: 'Text',
  border: 'Border',
  fill: 'Fill',
  bg: 'Bg',
};
const antDarkColorToken = buildAntdColorTokens(colorMap, 'dark');

const theme = {
  token: {
    ...antDarkColorToken,
    ...commonThemeConfig,
  },
  // algorithm: 'dark', // Use Ant Design dark algorithm
};

export default theme;
