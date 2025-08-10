import {
  omsSocketConnected,
  omsSocketConnecting,
} from 'src/store/reducer/oms-api/oms.slice';
import { OMS_INITIALIZE } from 'src/store/reducer/oms-api/oms.action.types';
import { Settings } from 'src/settings/settings';
import { AppThunk } from 'src/store';

export const initializeOms = (): AppThunk => async (dispatch) => {
  if (Settings.appConfig.enableMockData) {
    dispatch(omsSocketConnected());
  } else {
    dispatch(omsSocketConnecting());

    dispatch({
      type: OMS_INITIALIZE,
      payload: { websocketUrl: Settings.api.websocketUrl },
    });
  }
};
