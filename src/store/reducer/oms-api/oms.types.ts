// Types for credentials and OMS message

export interface Credentials {
  username: string;
  password: string;
  [key: string]: string | number | boolean | undefined;
}

export interface OmsMessage {
  msgTyp: number;
  success?: boolean;
  error?: string;
  user?: Record<string, unknown>;
  orderMap?: Record<string, unknown>;
  [key: string]:
    | string
    | number
    | boolean
    | Record<string, unknown>
    | undefined;
}
