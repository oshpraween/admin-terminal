import { OmsMessageRequest } from './oms-message-request';
import { OmsMessageConstants } from './oms-message-constants';
import { Guid } from 'src/utils/guid';

export class AuthRequest extends OmsMessageRequest {
  loginName: string;
  ePwd: string;
  pwd: string;

  constructor(loginName: string, ePwd: string = '', pwd: string = '') {
    super();
    this.loginName = loginName;
    this.ePwd = ePwd;
    this.pwd = pwd;
    this.messageType = OmsMessageConstants.auth_request;
    this.messageId = Guid.MakeNew().ToString();
  }
}
