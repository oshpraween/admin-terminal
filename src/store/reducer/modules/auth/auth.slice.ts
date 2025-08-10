import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  login,
  loginFailure,
  loginSuccess,
  logout,
} from 'src/store/reducer/modules/auth/auth.action';
import { AuthResponse } from 'src/messages/oms/auth-response';
import { Settings } from 'src/settings/settings';

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  loginFullFilled: boolean;
  sessionId: string | null;
  permissions: string[];
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  error: null,
  loginFullFilled: false,
  sessionId: null,
  permissions: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError(state) {
      state.isAuthenticated = false;
      state.error = null;
      state.loginFullFilled = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login, (state) => {
        if (Settings.appConfig.enableMockData) {
          // In mock mode, we simulate a successful login
          state.isAuthenticated = true;
          state.loading = false;
          state.error = null;
          state.loginFullFilled = true;
          state.sessionId = 'mock-session-id'; // Mock session ID
          state.permissions = ['read', 'write']; // Mock permissions
        } else {
          state.loading = true;
          state.error = null;
          state.loginFullFilled = false;
        }
      })
      .addCase(loginFailure, (state, action: PayloadAction<AuthResponse>) => {
        state.isAuthenticated = false;
        state.loading = false;
        state.error = action.payload.responseMessage;
        state.loginFullFilled = true;
      })
      .addCase(loginSuccess, (state, action: PayloadAction<AuthResponse>) => {
        if (action.payload.sessionId) {
          state.isAuthenticated = true;
          state.loading = false;
          state.error = null;
          state.loginFullFilled = true;
          state.sessionId = action.payload.sessionId;
        } else {
          state.isAuthenticated = false;
          state.loading = false;
          state.error = 'Login failed: No session ID received';
          state.loginFullFilled = true;
        }
      })
      .addCase(logout, (state) => {
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
        state.loginFullFilled = false;
        state.sessionId = null;
        state.permissions = [];
      });
  },
});

export const { clearAuthError } = authSlice.actions;

export default authSlice.reducer;
