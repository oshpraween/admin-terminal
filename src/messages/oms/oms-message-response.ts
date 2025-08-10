import { OmsMessage } from './oms-message';
import { Utility } from 'src/utils/util';
import { Settings } from 'src/settings/settings';
import { Languages } from 'src/enum/common';

export class OmsMessageResponse extends OmsMessage {
  messageStatus: MessageStatus = MessageStatus.Fail;
  responseMessage: string = '';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  parse(_: string): OmsMessage | null {
    return null;
  }

  processDescription(omsDescription: string): string {
    let processedMessage: string = '';
    if (Utility.isDefined(omsDescription)) {
      const messageArray = omsDescription.split('|');

      if (messageArray.length === 2) {
        processedMessage =
          Settings.default.language === Languages.EN
            ? messageArray[0]
            : (Utility.convertUnicodeToString(messageArray[1]) ?? '');
      } else {
        processedMessage = omsDescription;
      }
    }
    return processedMessage;
  }
}

export enum MessageStatus {
  Fail = -1,
  Success = 1,
}
