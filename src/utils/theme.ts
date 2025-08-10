import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config';

// Define the shape of a color object
type TailwindColorObject = {
  [key: string]: string | TailwindColorObject;
};

// Resolve the full Tailwind configuration
const __fullConfig = resolveConfig(tailwindConfig) as unknown as {
  theme: {
    colors: {
      [key: string]: TailwindColorObject | string;
      dark: TailwindColorObject;
    };
  };
};
const __lightColors = __fullConfig.theme.colors;
const __darkColors = __fullConfig.theme.colors.dark;

/**
 * Capitalizes the first letter of a given string.
 * @param str - The string to capitalize.
 * @returns The string with the first letter capitalized.
 */
function _capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Recursively flattens a nested Tailwind color object into a single-level object.
 * Keys are dot-separated to represent the hierarchy.
 * @param obj - The nested Tailwind color object.
 * @param prefix - A prefix for keys (default is an empty string).
 * @returns A flat object with dot-separated keys and their corresponding values.
 */
function _flattenColorObject(
  obj: TailwindColorObject,
  prefix = ''
): Record<string, string> {
  let res: Record<string, string> = {};
  for (const [key, value] of Object.entries(obj)) {
    const subKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'string') {
      res[subKey] = value;
    } else {
      Object.assign(res, _flattenColorObject(value, subKey));
    }
  }
  return res;
}

/**
 * Builds an Ant Design token object dynamically based on Tailwind color definitions.
 * Maps Tailwind color keys to Ant Design token names.
 * @param colorMap - A mapping of Tailwind color keys to Ant Design token prefixes.
 * @param theme - Specifies whether to use the 'light' or 'dark' theme (default is 'light').
 * @returns A flat object containing Ant Design token names and their corresponding color values.
 */
export function buildAntdColorTokens(
  colorMap: Record<string, string>,
  theme: 'light' | 'dark' = 'light'
): Record<string, string> {
  const colors = theme === 'dark' ? __darkColors : __lightColors;
  const antdTokens: Record<string, string> = {};
  for (const [twKey, antdPrefix] of Object.entries(colorMap)) {
    const twColorObj = colors[twKey];
    if (!twColorObj || typeof twColorObj === 'string') continue;
    for (const [subKey, value] of Object.entries(
      _flattenColorObject(twColorObj)
    )) {
      // subKey could be "bg", "border", or nested like "special.active"
      const parts = subKey.split('.');
      let tokenName: string;
      if (parts[0] === 'DEFAULT') {
        tokenName = `color${antdPrefix}`;
      } else {
        tokenName = `color${antdPrefix}${parts.map(_capitalize).join('')}`;
      }
      antdTokens[tokenName] = value;
    }
    // Also handle top-level DEFAULT
    if (typeof twColorObj.DEFAULT === 'string') {
      antdTokens[`color${antdPrefix}`] = twColorObj.DEFAULT;
    }
  }
  return antdTokens;
}

/**
 * Capitalizes the all characters of a string.
 */
function _capitalizeAllUnit(str: string) {
  return str.toUpperCase();
}

/**
 * Capitalizes the first character of a string.
 */
function _capitalizeFirstUnit(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Converts Tailwind unit (rem, px, or number) to pixels.
 */
function _toPx(value: string | number, remBase = 16): number {
  if (typeof value === 'number') return value;
  if (value.endsWith('rem')) return parseFloat(value) * remBase;
  if (value.endsWith('px')) return parseFloat(value);
  if (!isNaN(Number(value))) return Number(value);
  throw new Error(`Unsupported unit: ${value}`);
}

/**
 * Maps Tailwind keys to Ant Design token keys dynamically.
 * @param twObj Tailwind config object (e.g. spacing)
 * @param tokenKey Ant token key prefix, e.g. 'padding'
 * @param remBase REM base for conversion (default 16)
 * @param capitalizeMethod
 */
export function mapTwToAntTokensDynamic<
  T extends Record<string, string | number | string[]>,
>(
  twObj: T,
  tokenKey: string,
  remBase = 16,
  capitalizeMethod = 0
): Record<string, number> {
  const antObj: Record<string, number> = {};
  const capitalize =
    capitalizeMethod === 0 ? _capitalizeFirstUnit : _capitalizeAllUnit;

  for (const [key, value] of Object.entries(twObj)) {
    let antKey: string;
    if (Array.isArray(value)) {
      // need to get the string value from the array, it can be place in any intdex of array
      const valueStr = value.find((v: any) => typeof v === 'string') || '';
      if (valueStr) {
        if (key === 'DEFAULT') {
          antKey = tokenKey;
        } else {
          antKey = tokenKey + capitalize(key);
        }
        try {
          antObj[antKey] = _toPx(valueStr, remBase);
        } catch {
          // skip or handle unsupported units
        }
      }
    } else {
      if (key === 'DEFAULT') {
        antKey = tokenKey;
      } else {
        antKey = tokenKey + capitalize(key);
      }
      try {
        antObj[antKey] = _toPx(value, remBase);
      } catch {
        // skip or handle unsupported units
      }
    }
  }
  return antObj;
}
