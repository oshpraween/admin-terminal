import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { lightThemeVariations } from 'src/theme/light-theme-variations';
import i18n from 'src/i18n';

interface TabItem {
  key: string;
  path: string;
  title: string;
  score: number; // Optional score property for tabs
}

interface FavouriteMenuType {
  path: string;
  title: string;
}

interface SettingsState {
  theme: 'light' | 'dark';
  language: 'en' | 'ar';
  recentTabs: TabItem[];
  themeVariant: string;
  favouriteTabs: FavouriteMenuType[];
}

const initialState: SettingsState = {
  theme: 'light',
  language: 'en',
  recentTabs: [],
  themeVariant: lightThemeVariations[0].id,
  favouriteTabs: [],
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<'light' | 'dark'>) {
      state.theme = action.payload;
    },
    setLanguage(state, action: PayloadAction<'en' | 'ar'>) {
      state.language = action.payload;
      i18n.changeLanguage(action.payload);

      document.documentElement.lang = action.payload;
      document.documentElement.dir = action.payload === 'ar' ? 'rtl' : 'ltr';

      // Tailwind RTL: add 'rtl' or 'ltr' class to <html>
      document.documentElement.classList.remove('rtl', 'ltr');
      document.documentElement.classList.add(
        action.payload === 'ar' ? 'rtl' : 'ltr'
      );
    },
    addRecentTab(
      state,
      action: PayloadAction<{
        key: string;
        path: string;
        title: string;
      }>
    ) {
      const existingTab = state.recentTabs.find(
        (tab) => tab.path === action.payload.path
      );

      if (existingTab) {
        // Increment the score of the existing tab
        existingTab.score += 1;
      } else {
        // Add the new tab with an initial score
        state.recentTabs.push({ ...action.payload, score: 1 });
      }

      // Sort the tabs by score in descending order
      state.recentTabs.sort((a, b) => b.score - a.score);
    },
    clearRecentTabs(state) {
      state.recentTabs = [];
    },
    setThemeVariant(state, action: PayloadAction<string>) {
      state.themeVariant = action.payload;
    },
    addFavouritesTab(state, action: PayloadAction<FavouriteMenuType>) {
      state.favouriteTabs.push(action.payload);
    },
    removeFromFavourites(state, action: PayloadAction<FavouriteMenuType>) {
      state.favouriteTabs = state.favouriteTabs.filter(
        (item) => item.path !== action.payload.path
      );
    },
  },
});

export const {
  setTheme,
  setLanguage,
  addRecentTab,
  clearRecentTabs,
  setThemeVariant,
  addFavouritesTab,
  removeFromFavourites,
} = settingsSlice.actions;

export const selectTheme = (state: { settings: SettingsState }) =>
  state.settings.theme;
export const selectLanguage = (state: { settings: SettingsState }) =>
  state.settings.language;
export const selectThemeVariant = (state: { settings: SettingsState }) =>
  state.settings.themeVariant;
export const selectRecentTabs = (state: { settings: SettingsState }) =>
  state.settings.recentTabs;
export const selectFavouriteTabs = (state: { settings: SettingsState }) =>
  state.settings.favouriteTabs;

export default settingsSlice.reducer;
