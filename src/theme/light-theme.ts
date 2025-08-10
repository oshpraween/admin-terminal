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
const antLightColorToken = buildAntdColorTokens(colorMap);

const theme = {
  token: {
    ...antLightColorToken,
    ...commonThemeConfig,
  },
  algorithm: undefined, // Use default (light) algorithm
};

export default theme;
