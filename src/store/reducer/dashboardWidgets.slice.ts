import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { allDashboardWidgets } from 'src/config/dashboard/dashboardWidgets.config';

export interface WidgetConfig {
  id: string;
  title: string;
  description: string;
  langKey: string;
  color: string;
}

export interface DashboardWidgetState {
  allWidgets: WidgetConfig[];
  slotMapping: Record<string, string | null>; // slotId -> widgetId
}

const initialState: DashboardWidgetState = {
  allWidgets: allDashboardWidgets,
  slotMapping: {
    slot1: null,
    slot2: null,
    slot3: null,
    slot4: null,
    slot5: null,
    slot6: null,
  },
};

export const getWidgetById = (
  widgets: WidgetConfig[],
  id: string
): WidgetConfig | null => {
  return widgets.find((w) => w.id === id) || null;
};

const dashboardWidgetSlice = createSlice({
  name: 'dashboardWidget',
  initialState,
  reducers: {
    assignWidgetToSlot: (
      state,
      action: PayloadAction<{ slotId: string; widgetId: string }>
    ) => {
      const { slotId, widgetId } = action.payload;
      state.slotMapping[slotId] = widgetId;
    },
    removeWidgetFromSlot: (state, action: PayloadAction<string>) => {
      const slotId = action.payload;
      state.slotMapping[slotId] = null;
    },
    resetAllSlots: (state) => {
      Object.keys(state.slotMapping).forEach((slotId) => {
        state.slotMapping[slotId] = null;
      });
    },
  },
});

export const { assignWidgetToSlot, removeWidgetFromSlot, resetAllSlots } =
  dashboardWidgetSlice.actions;

export default dashboardWidgetSlice.reducer;
