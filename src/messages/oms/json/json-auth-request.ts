import { OmsMessageRequest } from '../oms-message-request';
import { AuthRequest } from '../auth-request';
import { JsonOmsContants } from './json-oms-constants';
import { Settings } from 'src/settings/settings';
import { SolutionType } from 'src/enum/common';

export class JsonAuthRequest extends OmsMessageRequest {
  constructor() {
    super();
  }

  package(authMessage: AuthRequest): void {
    this.hed.loginId = null;
    this.hed.sesnId = '';
    if (Settings.solutionType === SolutionType.SAAS) {
      this.hed.tenantCode = undefined;
    }
    this.hed.msgTyp = JsonOmsContants.auth_request;
    this.hed.unqReqId = authMessage.messageId;
    this.packagedMessage = { HED: this.hed };

    const data = new MessageData();
    data.lgnNme = authMessage.loginName;
    data.pwd = authMessage.pwd;
    data.ePwd = authMessage.ePwd;

    this.packagedMessage.HED.unqReqId = authMessage.messageId;
    this.packagedMessage.DAT = data;
  }
}

export class MessageData {
  lgnNme: string = '';
  pwd: string = '';
  ePwd: string = '';
}
