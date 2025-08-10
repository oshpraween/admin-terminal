import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
} from 'src/store/reducer/modules/auth/auth.constant';
import { AuthRequest } from 'src/messages/oms/auth-request';
import { AuthResponse } from 'src/messages/oms/auth-response';
import { createAppAction } from 'src/utils/reducer';

export const login = createAppAction<AuthRequest>(LOGIN_REQUEST, {
  isOMSRequest: true,
});

export const loginSuccess = createAppAction<AuthResponse>(LOGIN_SUCCESS);

export const loginFailure = createAppAction<AuthResponse>(LOGIN_FAILURE);

export const logout = createAppAction<void>(LOGOUT_REQUEST);
