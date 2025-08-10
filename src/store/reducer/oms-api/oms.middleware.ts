import {
  Middleware,
  MiddlewareAPI,
  Dispatch,
  AnyAction,
} from '@reduxjs/toolkit';
import { OMS_INITIALIZE } from './oms.action.types';
import Worker from '../../../workers/websocket.worker?worker';
import { JsonOmsContants } from 'src/messages/oms/json/json-oms-constants';
import { Channel, ConnectionState, ConnectionType } from 'src/enum/settings';
import {
  omsSocketConnected,
  omsSocketConnecting,
  omsSocketDisconnected,
} from 'src/store/reducer/oms-api/oms.slice';
import { RootState } from 'src/store/rootReducer';
import { parse } from 'src/utils/connection-status';
import { setConnectionStatus } from 'src/store/reducer/connection-status.slice';
import { JsonOmsMessageResolver } from 'src/messages/oms/json/json-oms-message-resolver';
import { AppMiddlewareMeta } from 'src/types/messages';
import { OmsMessageConstants } from 'src/messages/oms/oms-message-constants';
import {
  loginFailure,
  loginSuccess,
} from 'src/store/reducer/modules/auth/auth.action';
import { AuthResponse } from 'src/messages/oms/auth-response';
import { clearAuthError } from 'src/store/reducer/modules/auth/auth.slice';

let worker: Worker | null = null;
let stopPulse = false;
const messageResolver = new JsonOmsMessageResolver();

// Helper: Start worker if not started
// Accept websocketUrl as parameter for initialization
function ensureWorker(store: MiddlewareAPI, websocketUrl?: string) {
  if (!worker) {
    worker = new Worker();
    // If websocketUrl is provided, connect immediately
    if (websocketUrl) {
      sendMessageToWorker('connect', websocketUrl);
    }
    worker.onmessage = (event: MessageEvent) => {
      handleOmsMessage(store, event);
    };
  }
}

function sendMessageToWorker(messageType: string, workerMessage: unknown) {
  if (worker) {
    worker.postMessage({ type: messageType, message: workerMessage });
  }
}

function handleOmsMessage(
  store: MiddlewareAPI<Dispatch, RootState>,
  msg: MessageEvent
): void {
  if (parse(msg.data)) {
    if (msg.data.connectionType === ConnectionType.SOCKET) {
      store.dispatch(setConnectionStatus(msg.data));

      if (msg.data.connectionState === ConnectionState.CONNECTED) {
        store.dispatch(omsSocketConnected());
      }

      if (
        msg.data.connectionState === ConnectionState.DISCONNECTED ||
        msg.data.connectionState === ConnectionState.DISCONNECTING
      ) {
        store.dispatch(omsSocketDisconnected());
      }

      if (msg.data.connectionState === ConnectionState.CONNECTING) {
        store.dispatch(omsSocketConnecting());
      }

      if (msg.data.connectionState !== ConnectionState.CONNECTED) {
        stopPulse = true;
        sendMessageToWorker('stop-pulse', '');
      }

      if (msg.data.connectionState === ConnectionState.CONNECTED && stopPulse) {
        // this.renewSession();
        // this.startSendingPulse();

        stopPulse = false;
      }

      return;
    }

    return;
  }

  const omsMessageResponse = messageResolver.Parse(JSON.stringify(msg.data));

  if (
    omsMessageResponse === null ||
    omsMessageResponse.messageType === OmsMessageConstants.pulse
  ) {
    return;
  }

  if (omsMessageResponse.messageType === OmsMessageConstants.auth_request) {
    if (omsMessageResponse.authStatus === 1) {
      store.dispatch(loginSuccess(omsMessageResponse as AuthResponse));
    } else {
      store.dispatch(loginFailure(omsMessageResponse as AuthResponse));
    }
  }
}

export const omsMiddleware: Middleware =
  (store: MiddlewareAPI<Dispatch<AnyAction>, RootState>) =>
  (next) =>
  (action: unknown) => {
    // Only handle actions with a "type" property (i.e. Redux actions)
    if (typeof action === 'object' && action !== null && 'type' in action) {
      const typedAction = action as AnyAction;
      const payloadData = typedAction.payload;
      const metaData: AppMiddlewareMeta = typedAction.meta; // Access the metadata

      // OMS_INITIALIZE: setup state, worker, and pulse
      if (typedAction.type === OMS_INITIALIZE) {
        store.dispatch(clearAuthError());
        // If payload has websocketUrl, pass it to the worker
        const websocketUrl: string | undefined =
          typedAction.payload?.websocketUrl;
        ensureWorker(store, websocketUrl);
        worker?.postMessage({
          type: 'start-pulse',
          message: { msgType: JsonOmsContants.pulse, channel: Channel.AT },
        });
      }

      if (payloadData && metaData && metaData.isOMSRequest) {
        const messageToSend = messageResolver.Package(payloadData);
        if (messageToSend) {
          // Send the message to the worker
          sendMessageToWorker('send', messageToSend);
        }
      }
    }

    return next(action);
  };
