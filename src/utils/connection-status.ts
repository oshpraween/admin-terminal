import { ConnectionState, ConnectionType } from 'src/enum/settings';

interface ConnectionMessage {
  connectionType?: ConnectionType;
  connectionState?: ConnectionState;
}

export function parse(message: ConnectionMessage): boolean {
  return (
    typeof message.connectionType !== 'undefined' &&
    typeof message.connectionState !== 'undefined'
  );
}
