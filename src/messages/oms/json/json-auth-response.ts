import { OmsJsonHeader } from './json-header';
import { OmsMessageResponse } from '../oms-message-response';
import { AuthResponse } from '../auth-response';

export class JsonAuthResponse extends OmsMessageResponse {
  HED: OmsJsonHeader = new OmsJsonHeader();
  DAT: MessageData = new MessageData();

  parse(message: string): AuthResponse {
    const jsonAuthResponse: { HED: OmsJsonHeader; DAT: MessageData } =
      JSON.parse(message);

    const authResponse: AuthResponse = new AuthResponse();
    authResponse.authStatus = jsonAuthResponse.DAT.authSts;
    authResponse.sessionId = jsonAuthResponse.HED.sesnId;
    authResponse.messageId = jsonAuthResponse.HED.unqReqId;
    authResponse.clientIp = jsonAuthResponse.HED.clientIp;
    authResponse.responseMessage = super.processDescription(
      jsonAuthResponse.DAT.rejResn
    );
    authResponse.userId = +jsonAuthResponse.DAT.usrId;
    authResponse.empId = +jsonAuthResponse.DAT.empId;
    authResponse.userName = jsonAuthResponse.DAT.cusNme;
    authResponse.institutionId = jsonAuthResponse.DAT.instId;
    authResponse.primaryInstituteId = jsonAuthResponse.DAT.primaryInstituteId;
    authResponse.institutionName = jsonAuthResponse.DAT.instName;
    authResponse.entitlements = jsonAuthResponse.DAT.entitlements;
    authResponse.updatePassword = jsonAuthResponse.DAT.updatePassword;
    authResponse.clientVersion = jsonAuthResponse.DAT.clientVersion;
    authResponse.tenantCode = jsonAuthResponse.HED.tenantCode;
    authResponse.mobile = jsonAuthResponse.DAT.mobile;
    authResponse.email = jsonAuthResponse.DAT.email;
    authResponse.isCipherModeEnabled = jsonAuthResponse.DAT.cipherMode;
    authResponse.loginId = jsonAuthResponse.HED.loginId;
    authResponse.otpValidPeriod = jsonAuthResponse.DAT.otpValidPeriod;
    authResponse.otpValidPeriodInSec = jsonAuthResponse.DAT.otpValidPeriodInSec;
    authResponse.usrType = jsonAuthResponse.DAT.usrType;
    authResponse.triggerCaptcha = jsonAuthResponse.DAT.triggerCaptcha;
    authResponse.resendEnableDelayPeriod =
      jsonAuthResponse.DAT.resendEnableDelayPeriod;

    return authResponse;
  }
}
// 1- success ,
export class MessageData {
  usrId: string = '';
  authSts: number = 0;
  dlrId: string = '';
  mubNo: string = '';
  failAtmps: number = 0;
  instId: number = 0;
  primaryInstituteId: number = 0;
  instName: string = '';
  l2AuthTyp: number = 0;
  rejResn: string = '';
  lgnExpDte: string = '';
  lstLgnTme: string = '';
  ssoToken: string = '';
  cusNme: string = '';
  updatePassword: boolean = false;
  userInstitution: UserInstitution = new UserInstitution();
  entitlements: number[] = [];
  clientVersion: string = '';
  empId: number = 0;
  mobile: string = '';
  email: string = '';
  cipherMode: number = 0;
  otpValidPeriod: number = 0;
  otpValidPeriodInSec: number = 0;
  usrType: number = 0;
  triggerCaptcha: number = 0;
  resendEnableDelayPeriod: number = 0;
}

export class UserInstitution {
  instId: number = 0;
  primaryInstituteId: number = 0;
  instName: string = '';
  brokerCode: string = '';
  enableMakerChecker: number = 0;
  enableGroupBuyingPower: number = 0;
  minCoverageRatio: number = 0;
  passwordWarningDays: number = 0;
  allowMultiCashTradingAccountLink: number = 0;
}
