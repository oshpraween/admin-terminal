import React, { useEffect } from 'react';
import { ThemeContext } from './theme-context';
import { ConfigProvider, theme as antdTheme } from 'antd';
import lightTheme from './light-theme';
import darkTheme from './dark-theme';
import lightThemeComponent from 'src/theme/light-theme-component';
import darkThemeComponent from 'src/theme/dark-theme-component';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectLanguage,
  selectTheme,
  selectThemeVariant,
  setTheme,
  setThemeVariant,
} from 'src/store/reducer/settings.slice';
import enUS from 'antd/locale/en_US';
import arEG from 'antd/locale/ar_EG';
import { lightThemeVariations } from 'src/theme/light-theme-variations';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const language = useSelector(selectLanguage);
  const theme = useSelector(selectTheme);
  const themeVariant = useSelector(selectThemeVariant);
  const dispatch = useDispatch();

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  const setThemeColor = (id: string) => {
    const selectedColor = lightThemeVariations.find(
      (variation) => variation.id === id
    );
    if (!selectedColor) return;

    selectedColor.colors.forEach((color) => {
      document.documentElement.style.setProperty(color.var, color.hex);
    });

    dispatch(setThemeVariant(id));
  };

  useEffect(() => {
    setThemeColor(themeVariant);
  }, []);

  const lightThemeToken = {
    ...lightTheme.token,
  };

  const darkThemeToken = {
    ...darkTheme.token,
  };

  const antdThemeConfig =
    theme === 'dark'
      ? {
          algorithm: antdTheme.darkAlgorithm,
          token: darkTheme.token,
          components: darkThemeComponent(darkThemeToken),
        }
      : {
          algorithm: antdTheme.defaultAlgorithm,
          token: lightThemeToken,
          components: lightThemeComponent(lightThemeToken),
        };

  // Set AntD direction based on language
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setThemeColor }}>
      <ConfigProvider
        locale={language === 'ar' ? arEG : enUS}
        theme={antdThemeConfig}
        direction={direction}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};
