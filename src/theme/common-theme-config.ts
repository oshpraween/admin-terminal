import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config';
import { mapTwToAntTokensDynamic } from 'src/utils/theme';

const __fullConfig = resolveConfig(tailwindConfig) as unknown as {
  theme: {
    [key: string]: Record<string, string | number>;
  };
};

const _spacingPath = __fullConfig.theme.spacing;
const _borderRadiusPath = __fullConfig.theme.borderRadius;
const _borderWidthPath = __fullConfig.theme.borderWidth;
const _fontSizePath = __fullConfig.theme.fontSize;
const _fontWeightPath = __fullConfig.theme.fontWeight;
const _lineHeightPath = __fullConfig.theme.lineHeight;

const _spacing = mapTwToAntTokensDynamic(_spacingPath, 'padding', 16, 1);
const _borderRadius = mapTwToAntTokensDynamic(
  _borderRadiusPath,
  'borderRadius',
  16,
  1
);
const _borderWidth = mapTwToAntTokensDynamic(
  _borderWidthPath,
  'borderWidth',
  16,
  1
);
const _fontSize = mapTwToAntTokensDynamic(_fontSizePath, 'fontSize', 16, 1);
const _fontWeight = mapTwToAntTokensDynamic(_fontWeightPath, 'fontWeight', 16);
const _lineHeight = mapTwToAntTokensDynamic(_lineHeightPath, 'lineHeight', 16);

const commonThemeConfig = {
  // Typography
  fontFamily: 'Inter, sans-serif',

  // Controls
  controlHeightXS: 24,
  controlHeightSM: 28,
  controlHeight: 40,
  controlHeightLG: 48,
  controlHeightXL: 56,
  controlOutline: '#4096ff',
  controlItemBgHover: '#e6f4ff',
  controlItemBgActive: '#bae0ff',

  // Z-Index
  zIndexPopupBase: 1000,
  zIndexDrawer: 1000,
  zIndexModal: 1000,
  zIndexPopover: 1030,
  zIndexTooltip: 1060,

  // Motion
  motionDurationFast: '0.1s',
  motionDurationMid: '0.2s',
  motionDurationSlow: '0.3s',
  motionEaseIn: 'cubic-bezier(0.4, 0, 1, 1)',
  motionEaseOut: 'cubic-bezier(0, 0, 0.2, 1)',
  motionEaseInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',

  // Opacity
  opacityImage: 1,
  opacityLoading: 0.65,
  opacityMask: 0.45,

  // Others
  boxSizing: 'border-box',

  ..._fontSize,
  ..._fontWeight,
  ..._lineHeight,
  ..._spacing,
  ..._borderRadius,
  ..._borderWidth,
};

export default commonThemeConfig;
