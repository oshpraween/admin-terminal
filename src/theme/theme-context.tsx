import { createContext } from 'react';
import { Theme } from 'src/enum/theme';

export const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
  setThemeColor: (color: string) => void;
}>({
  theme: 'light',
  toggleTheme: () => {},
  setThemeColor: () => {},
});
