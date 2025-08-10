export class OmsJsonHeader {
  msgTyp: number = 0;
  tenantCode: string | undefined = '';
  sesnId: string = '';
  loginId: number | null | string = 0;
  channel: number = 0;
  clientIp: string = '';
  commVer: string = '';
  unqReqId: string = '';
  routeId: number = 0;
  brokerCode: string = '';
  instId: string = '';
}
