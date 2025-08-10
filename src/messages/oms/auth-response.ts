import { OmsMessageResponse } from './oms-message-response';
import { OmsMessageConstants } from './oms-message-constants';

export class AuthResponse extends OmsMessageResponse {
  authStatus: number = 0;
  failedAttempts: number = 0;
  sessionId: string = '';
  institutionId: number = 0;
  primaryInstituteId: number = 0;
  institutionName: string = '';
  userId: number = 0;
  empId: number = 0;
  userName: string = '';
  updatePassword: boolean = false;
  clientVersion: string = '';
  clientIp: string = '';
  entitlements: number[] = [];
  tenantCode: string | undefined = '';
  email: string = '';
  mobile: string = '';
  isCipherModeEnabled: number = 0;
  loginId: number | null | string = 0;
  otpValidPeriod: number = 0;
  otpValidPeriodInSec: number = 0;
  usrType: number = 0;
  triggerCaptcha: number = 0;
  resendEnableDelayPeriod: number = 0;

  constructor() {
    super();
    this.messageType = OmsMessageConstants.auth_request;
  }
}
