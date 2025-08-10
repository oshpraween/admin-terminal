import { OmsMessageResponse } from '../oms-message-response';
import { OmsMessageRequest } from '../oms-message-request';
import { OmsMessageConstants } from '../oms-message-constants';
import { JsonAuthRequest } from './json-auth-request';
import { JsonOmsContants } from './json-oms-constants';
import { JsonAuthResponse } from './json-auth-response';
import { OmsMessageResolver } from 'src/messages/oms/oms-message-resolver';

export class JsonOmsMessageResolver implements OmsMessageResolver {
  Parse(message: string): OmsMessageResponse | null {
    try {
      if (message === '' || message === undefined || message === null) {
        return null;
      }
      const jsonMessage = JSON.parse(message);
      let omsMessageResponse: OmsMessageResponse | null = null;

      if (jsonMessage.HED.msgTyp === JsonOmsContants.auth_request) {
        omsMessageResponse = new JsonAuthResponse().parse(message);
      }

      return omsMessageResponse;
    } catch {
      console.log('Error parsing message');
      return null;
    }
  }

  Package(message: OmsMessageRequest): string | null {
    try {
      let omsMessageRequest: OmsMessageRequest | null = null;
      omsMessageRequest = this.getPackagedMessage(message, omsMessageRequest);

      if (omsMessageRequest) {
        return omsMessageRequest.packagedMessage;
      } else {
        return null;
      }
    } catch {
      console.log('Error packaing message');
      return null;
    }
  }

  getPackagedMessage(
    message: OmsMessageRequest,
    omsMessageRequest: OmsMessageRequest | null
  ) {
    if (message.messageType === OmsMessageConstants.auth_request) {
      omsMessageRequest = new JsonAuthRequest();
      omsMessageRequest.package(message);
    }

    return omsMessageRequest;
  }
}
