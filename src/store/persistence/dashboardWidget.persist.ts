import storage from 'redux-persist/lib/storage';
import { createTransform } from 'redux-persist';
import { PersistConfig, persistReducer } from 'redux-persist';
import type { DashboardWidgetState } from 'src/store/reducer/dashboardWidgets.slice';

const slotMappingOnly = createTransform<
  DashboardWidgetState,
  Partial<DashboardWidgetState>
>(
  (inboundState) => ({ slotMapping: inboundState.slotMapping }),
  (outboundState, key) => {
    return {
      ...outboundState,
    } as any;
  },
  { whitelist: ['dashboardWidget'] }
);

export const dashboardWidgetPersistConfig: PersistConfig<DashboardWidgetState> =
  {
    key: 'dashboardWidget',
    storage,
    version: 1,
    transforms: [slotMappingOnly],
  };

export const withDashboardWidgetPersistence = (
  reducer: (
    state: DashboardWidgetState | undefined,
    action: any
  ) => DashboardWidgetState
) =>
  persistReducer<DashboardWidgetState>(dashboardWidgetPersistConfig, reducer);
