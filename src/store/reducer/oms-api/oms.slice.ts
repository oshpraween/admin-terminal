import { createSlice } from '@reduxjs/toolkit';

// Define types for OMS state
interface Order {
  id: string;
  [key: string]: unknown;
}

interface OrderMap {
  [orderId: string]: Order;
}

interface OmsState {
  orderMap: OrderMap;
  lastOrderExecution?: Order;
  error?: string | null;

  // Connection and login
  connected: boolean;
  connecting: boolean;
  loginLoading: boolean;
  loginError?: string | null;
}

const initialState: OmsState = {
  orderMap: {},
  lastOrderExecution: undefined,
  error: null,
  connected: false,
  connecting: false,
  loginLoading: false,
  loginError: null,
};

const omsSlice = createSlice({
  name: 'oms',
  initialState,
  reducers: {
    // WebSocket connection handling
    omsSocketConnecting(state) {
      state.connecting = true;
      state.connected = false;
    },
    omsSocketConnected(state) {
      state.connecting = false;
      state.connected = true;
    },
    omsSocketDisconnected(state) {
      state.connecting = false;
      state.connected = false;
    },
  },
});

export const {
  omsSocketConnecting,
  omsSocketConnected,
  omsSocketDisconnected,
} = omsSlice.actions;

export default omsSlice.reducer;
