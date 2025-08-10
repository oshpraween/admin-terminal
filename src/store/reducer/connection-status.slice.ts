import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ConnectionStatusState {
  isConnected: boolean;
}

const initialState: ConnectionStatusState = {
  isConnected: true,
};

const connectionStatusSlice = createSlice({
  name: 'connectionStatus',
  initialState,
  reducers: {
    setConnectionStatus(state, action: PayloadAction<boolean>) {
      state.isConnected = action.payload;
    },
  },
});

export const { setConnectionStatus } = connectionStatusSlice.actions;
export default connectionStatusSlice.reducer;
