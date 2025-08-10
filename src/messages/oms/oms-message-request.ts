import { Channel, SolutionType } from 'src/enum/settings';
import { OmsJsonHeader } from './json/json-header';
import { OmsMessage } from './oms-message';
import { Settings } from '../../settings/settings';

export class OmsMessageRequest extends OmsMessage {
  packagedMessage: any;
  hed: OmsJsonHeader;
  /**
   *
   */
  constructor() {
    super();
    this.hed = new OmsJsonHeader();
    this.hed.channel = Channel.AT;
    this.hed.clientIp = Settings.user.clientIp ?? '';
    this.hed.commVer = Settings.app.version;
    this.hed.tenantCode = Settings.tenantCode;
    this.hed.loginId = +Settings.user.userId;
    this.hed.sesnId = Settings.auth.token ?? '';
    if (Settings.solutionType === SolutionType.SAAS) {
      this.hed.brokerCode = Settings.brokerCode;
    }
    if (Settings.userInstitution.primaryInstitutionId) {
      this.hed.instId = Settings.userInstitution.primaryInstitutionId;
    }
  }

  package(authMessage: any): void {
    // Overidden in extended classes
  }
}
