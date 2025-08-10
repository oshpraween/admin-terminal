// --- Enums ---

enum OrderStatus {
  SEND_TO_OMS_NEW = 'M',
  REJECTED = '8',
  AMEND_REJECTED = 'x',
  SEND_TO_OMS_AMEND = 'Q',
}

enum OrderCategory {
  ORD_EXEC_NORMAL = 1,
  ORD_EXEC_COND = 2,
  ORD_EXEC_CONDI = 3,
  ORD_EXEC_ALGO = 4,
  ORD_EXEC_DESK = 5,
  ORD_EXEC_TRADE_PROCESSING = 6,
}

enum MsgType {
  ORDER_REQUEST = 2,
}

interface OrderExecution {
  clOrdId: string;
  ordCatgry: OrderCategory;
  ordSts: OrderStatus;
  // ... other relevant fields
}

interface WebsocketMessage {
  HED: OmsJsonHeader;
  DAT: {
    order?: OrderExecution;
    isNewOrder?: boolean;
    [key: string]: OrderExecution | boolean | undefined;
  };
  [key: string]: unknown;
}

// --- WebSocket Connection Singleton ---

class WebSocketConnection {
  private static instance: WebSocketConnection;
  socket: WebSocket | null = null;
  url = '';
  subscribedForOrderUpdates = false;
  reconnectAttempts = 0;
  sendQueue: { message: unknown; binary: boolean | undefined }[] = [];
  onOpenCallbacks: Array<(event: Event) => void> = [];
  onCloseCallbacks: Array<(event: CloseEvent) => void> = [];
  onErrorCallbacks: Array<(event: Event) => void> = [];
  orderExecutions: Record<string, WebsocketMessage> = {};
  normalCloseCode = 1000;
  reconnectableStatusCodes = [4000];
  config = { initialDelay: 2000, maxDelay: 300000 };
  orderPushInterval: ReturnType<typeof setInterval> | null = null;
  internalConnectionState: number | undefined;

  static getInstance() {
    if (!WebSocketConnection.instance) {
      WebSocketConnection.instance = new WebSocketConnection();
    }
    return WebSocketConnection.instance;
  }

  setUrl(url: string) {
    this.url = url;
    if (!/^wss?:\/\//.test(url)) throw new Error('Invalid url provided');
  }

  connect(force = false) {
    if (force || !this.socket || this.socket.readyState !== WebSocket.OPEN) {
      this.socket = new WebSocket(this.url);

      this.socket.onopen = (ev) => {
        this.setInternalState(this.socket?.readyState ?? 0);
        this.sendConnectionStatus(this.socket?.readyState);
        this.onOpenHandler(ev);
      };

      this.socket.onmessage = (ev) => {
        this.postMessageReceived(ev);
      };

      this.socket.onclose = (ev) => {
        this.setInternalState(this.socket?.readyState ?? 0);
        this.sendConnectionStatus(this.socket?.readyState);
        this.notifyCloseCallbacks(ev);
        if (
          ev.code !== this.normalCloseCode ||
          this.reconnectableStatusCodes.includes(ev.code)
        ) {
          this.close(true);
          this.reconnect();
        } else {
          this.sendQueue = [];
        }
      };

      this.socket.onerror = (ev) => {
        this.notifyErrorCallbacks(ev);
      };
    }
  }

  postMessageReceived(ev: MessageEvent) {
    let jsonMessage: WebsocketMessage;
    try {
      jsonMessage = JSON.parse(ev.data);
    } catch {
      // Forward non-JSON messages as-is
      postMessage(ev.data);
      return;
    }

    if (jsonMessage.HED?.msgTyp === MsgType.ORDER_REQUEST) {
      this.processOrderRequest(jsonMessage);
    } else {
      postMessage(jsonMessage);
    }
  }

  processOrderRequest(jsonMessage: WebsocketMessage) {
    const orderExecutionDetails = jsonMessage.DAT.order;
    if (
      this.subscribedForOrderUpdates &&
      orderExecutionDetails &&
      orderExecutionDetails.ordCatgry === OrderCategory.ORD_EXEC_NORMAL
    ) {
      if (this.isNewlyPlacedOrder(orderExecutionDetails)) {
        jsonMessage.DAT.isNewOrder = true;
      }
      const oldOrderExecution =
        this.orderExecutions[orderExecutionDetails.clOrdId];
      if (oldOrderExecution && oldOrderExecution.DAT.isNewOrder) {
        jsonMessage.DAT.isNewOrder = true;
      }
      this.orderExecutions[orderExecutionDetails.clOrdId] = jsonMessage;
    }
  }

  isNewlyPlacedOrder(orderDetails: OrderExecution) {
    return (
      orderDetails.ordSts === OrderStatus.SEND_TO_OMS_NEW ||
      orderDetails.ordSts === OrderStatus.REJECTED ||
      orderDetails.ordSts === OrderStatus.SEND_TO_OMS_AMEND ||
      orderDetails.ordSts === OrderStatus.AMEND_REJECTED
    );
  }

  pushOrderExecutions() {
    const orderExecutionsTemp = { ...this.orderExecutions };
    this.orderExecutions = {};
    if (Object.keys(orderExecutionsTemp).length > 0) {
      postMessage({ orderMap: orderExecutionsTemp, msgTyp: 999999 });
    }
  }

  onOpenHandler(event: Event) {
    this.reconnectAttempts = 0;
    this.notifyOpenCallbacks(event);
    this.processQueue();
  }

  notifyOpenCallbacks(event: Event) {
    for (const cb of this.onOpenCallbacks) {
      cb.call(this, event);
    }
  }

  notifyErrorCallbacks(event: Event) {
    for (let i = 0; i < this.onErrorCallbacks.length; i++) {
      this.onErrorCallbacks[i].call(this, event);
    }
  }

  notifyCloseCallbacks(event: CloseEvent) {
    for (let i = 0; i < this.onCloseCallbacks.length; i++) {
      this.onCloseCallbacks[i].call(this, event);
    }
  }

  processQueue() {
    while (this.sendQueue.length && this.socket?.readyState === 1) {
      const data = this.sendQueue.shift();
      if (!data) continue;
      if (data.binary) {
        this.socket!.send(data.message as Blob | ArrayBuffer | string);
      } else {
        this.socket!.send(
          typeof data.message === 'string'
            ? data.message
            : JSON.stringify(data.message)
        );
      }
    }
  }

  close(force = false) {
    if ((force || !this.socket?.bufferedAmount) && this.socket) {
      this.socket.onclose = null;
      this.socket.close(this.normalCloseCode);
      this.socket = null;
    }
  }

  reconnect() {
    const backoffDelay = this.getBackoffDelay(++this.reconnectAttempts);
    setTimeout(() => {
      if (
        this.getReadyState() !== WebSocket.OPEN &&
        this.getReadyState() !== WebSocket.CONNECTING
      ) {
        this.sendConnectionStatus(0);
        this.connect();
      }
    }, backoffDelay);
  }

  getBackoffDelay(attempt: number) {
    if (attempt === 1) return this.config.initialDelay;
    const T = this.config.initialDelay;
    const N = attempt - 1;
    const M = this.config.maxDelay;
    return Math.floor(Math.min(T + 1000 * Math.pow(2, N), M));
  }

  setInternalState(state: number) {
    if (Math.floor(state) !== state || state < 0 || state > 4) {
      throw new Error(
        'state must be an integer between 0 and 4, got: ' + state
      );
    }
    this.internalConnectionState = state;
  }

  getReadyState() {
    if (!this.socket) return -1;
    return this.internalConnectionState ?? this.socket.readyState;
  }

  send(data: unknown, binary: boolean | undefined) {
    if (
      this.getReadyState() !== WebSocket.OPEN &&
      this.getReadyState() !== WebSocket.CONNECTING
    ) {
      this.connect();
      setTimeout(() => {
        this.addToQueueAndProcess(data, binary);
      }, 2000);
      return true;
    } else {
      return this.addToQueueAndProcess(data, binary);
    }
  }

  addToQueueAndProcess(data: unknown, binary: boolean | undefined) {
    this.sendQueue.push({ message: data, binary });
    if (this.socket && this.socket.readyState === 1) {
      while (this.sendQueue.length) {
        const q = this.sendQueue.shift();
        if (q?.binary) {
          this.socket.send(q.message as Blob | ArrayBuffer | string);
        } else {
          this.socket.send(
            typeof q?.message === 'string'
              ? q.message
              : JSON.stringify(q?.message)
          );
        }
      }
      return true;
    } else {
      return false;
    }
  }

  sendConnectionStatus(state: number | undefined) {
    postMessage({ connectionType: 100, connectionState: state });
  }
}

// --- Worker Message Routing ---

let omsPulseInterval: ReturnType<typeof setInterval> | undefined;

self.onmessage = (e: MessageEvent) => {
  const { type, message } = e.data;
  const ws = WebSocketConnection.getInstance();

  switch (type) {
    case 'send':
      ws.send(message, undefined);
      break;
    case 'connect':
      ws.setUrl(message as string);
      ws.connect(true);
      break;
    case 'update-url':
      ws.close(true);
      ws.setUrl(message as string);
      ws.connect(true);
      break;
    case 'start-pulse': {
      console.log('Sending pulse started');

      const { msgType, channel } = e.data.message as {
        msgType: number;
        channel: number;
      };

      if (!omsPulseInterval) {
        omsPulseInterval = setInterval(() => {
          const omsMessageRequest = new JsonPulse(msgType, channel);
          omsMessageRequest.package(new OmsPulse(msgType));

          WebSocketConnection.getInstance().send(
            omsMessageRequest.packagedMessage,
            undefined
          );
        }, 5000);
      }
      break;
    }
    case 'connection-state':
      postMessage({ connectionType: 100, connectionState: ws.getReadyState() });
      break;
    default:
      postMessage({
        error: `invalid message type : ${type} for the websocket worker`,
      });
  }
};

export class Guid {
  private _guid: string;

  // Static member for creating a new GUID
  static MakeNew(): Guid {
    let result = '';
    let i: string;
    for (let j = 0; j < 32; j++) {
      if (j === 8 || j === 12 || j === 16 || j === 20) {
        result += '-';
      }
      i = Math.floor(Math.random() * 16)
        .toString(16)
        .toUpperCase();
      result += i;
    }
    return new Guid(result);
  }

  constructor(public guid: string) {
    this._guid = guid;
  }

  public ToString(): string {
    return this.guid;
  }
}

export class OmsMessage {
  isSync: boolean = false;
  messageType: number = 0;
  messageId: string = '';
  authStatus: number = 0;
}

export class OmsPulse extends OmsMessage {
  packagedMessage: Record<string, unknown> | undefined;
  responseMessage: string = '';
  hed: OmsJsonHeader | undefined;

  constructor(msgType: number) {
    super();
    this.isSync = true;
    this.messageType = msgType;
    this.messageId = Guid.MakeNew().ToString();
  }
}

export class OmsJsonHeader {
  msgTyp: number = 0;
  tenantCode?: string;
  sesnId?: string;
  loginId?: number;
  channel?: number;
  clientIp?: string;
  commVer?: string;
  unqReqId?: string;
  routeId?: number;
  instId?: string;
}

export class MessageData {
  // Add fields as required by your protocol
}

export class JsonPulse extends OmsMessage {
  responseMessage: string = '';
  packagedMessage: Record<string, unknown> | undefined;
  hed: OmsJsonHeader = new OmsJsonHeader();
  DAT: MessageData = new MessageData();

  constructor(msgType: number, channel: number) {
    super();
    this.hed.msgTyp = msgType;
    this.hed.channel = channel;
  }

  package(omsPulse: OmsPulse): void {
    const data = new MessageData();
    this.hed.unqReqId = omsPulse.messageId;
    this.packagedMessage = { HED: this.hed, DAT: data };
  }
}
