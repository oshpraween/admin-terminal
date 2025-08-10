import { OmsMessageResponse } from './oms-message-response';
import { OmsMessageRequest } from './oms-message-request';

export class OmsMessageResolver {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Parse(_: string): OmsMessageResponse | null {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Package(_: OmsMessageRequest): string | null {
    return null;
  }
}
