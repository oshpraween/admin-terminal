import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { rootReducer, RootState } from './rootReducer';
import rootSaga from './rootSaga';
import { omsMiddleware } from 'src/store/reducer/oms-api/oms.middleware';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sagaMiddleware, logger, omsMiddleware),
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

// Types for useSelector and useDispatch hooks
export type AppDispatch = typeof store.dispatch;
export type AppThunk = (
  dispatch: AppDispatch,
  getState: () => RootState
) => void;
