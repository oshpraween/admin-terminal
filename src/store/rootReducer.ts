import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import sessionStorage from 'redux-persist/lib/storage/session';
import { persistReducer } from 'redux-persist';
import settingsReducer from './reducer/settings.slice';
import layoutSlice from './reducer/layout.slice';
import customerSlice from './reducer/modules/customer/customer.slice';
import loaderReducer from './reducer/loader.slice';
import authSlice from './reducer/modules/auth/auth.slice';
import omsReducer from 'src/store/reducer/oms-api/oms.slice';
import connectionStatusReducer from './reducer/connection-status.slice';
import dashboardWidgetReducer from './reducer/dashboardWidgets.slice';
import { withDashboardWidgetPersistence } from 'src/store/persistence/dashboardWidget.persist';

const settingsPersistConfig = {
  key: 'settings',
  storage,
};

const authPersistConfig = {
  key: 'auth',
  storage: sessionStorage,
};

export const rootReducer = combineReducers({
  settings: persistReducer(settingsPersistConfig, settingsReducer),
  customer: customerSlice,
  layout: layoutSlice,
  loader: loaderReducer,
  auth: persistReducer(authPersistConfig, authSlice),
  oms: omsReducer,
  connectionStatusReducer: connectionStatusReducer,
  dashboardWidget: withDashboardWidgetPersistence(dashboardWidgetReducer),
});

export type RootState = ReturnType<typeof rootReducer>;
