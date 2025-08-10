import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppLayoutBarType } from 'src/enum/layout';

interface TabItem {
  path: string;
  title: string;
}

interface LayoutState {
  activeTab: TabItem | null;
  recentTabs: TabItem[];
  activeBar: AppLayoutBarType;
  showSideBar: boolean;
  showMenuSearch: boolean;
}

const initialState: LayoutState = {
  activeTab: null,
  recentTabs: [],
  activeBar: AppLayoutBarType.SIDE_BAR,
  showSideBar: false,
  showMenuSearch: false,
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setActiveTab(state, action: PayloadAction<TabItem>) {
      state.activeTab = action.payload;
    },
    addRecentTab(state, action: PayloadAction<TabItem>) {
      // Check if the tab already exists in recentTabs
      const exists = state.recentTabs.some(
        (tab) => tab.path === action.payload.path
      );
      if (!exists) {
        state.recentTabs.push(action.payload);
        state.activeTab = action.payload;
      } else {
        state.activeTab = action.payload;
      }
    },
    removeRecentTab(state, action: PayloadAction<string>) {
      const closingIndex = state.recentTabs.findIndex(
        (tab) => tab.path === action.payload
      );
      state.recentTabs = state.recentTabs.filter(
        (tab) => tab.path !== action.payload
      );
      // If the removed tab was the active tab, set the next or previous tab as active, or null if none
      if (state.activeTab && state.activeTab.path === action.payload) {
        if (state.recentTabs.length > 0) {
          state.activeTab =
            state.recentTabs[closingIndex] ||
            state.recentTabs[state.recentTabs.length - 1];
        } else {
          state.activeTab = null;
        }
      }
    },
    removeAllRecentTabs(state) {
      state.recentTabs = [];
      state.activeTab = null;
    },
    setActiveBar(state, action: PayloadAction<AppLayoutBarType>) {
      state.activeBar = action.payload;
    },
    toggleSideBar(state) {
      state.showSideBar = !state.showSideBar;
    },
    toggleMenuSearch(state) {
      state.showMenuSearch = !state.showMenuSearch;
    },
  },
});

export const selectActiveTab = (state: { layout: LayoutState }) =>
  state.layout.activeTab;

export const selectRecentTabs = (state: { layout: LayoutState }) =>
  state.layout.recentTabs;

export const selectActiveBar = (state: { layout: LayoutState }) =>
  state.layout.activeBar;
export const selectShowSideBar = (state: { layout: LayoutState }) =>
  state.layout.showSideBar;
export const selectShowMenuSearch = (state: { layout: LayoutState }) =>
  state.layout.showMenuSearch;

export const {
  setActiveTab,
  addRecentTab,
  removeRecentTab,
  removeAllRecentTabs,
  setActiveBar,
  toggleSideBar,
  toggleMenuSearch,
} = layoutSlice.actions;

export default layoutSlice.reducer;
