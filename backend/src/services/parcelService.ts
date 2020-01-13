import * as ws from 'ws';

import { WebSocketData } from '../types/backend';
import { Parcel } from '../types/applicationWide';

import { logger } from '../logging';
import { webSocketService, WebSocketService } from './webSocketService';

const logUnknownParcel = (parcel: Parcel): void => {
  logger.info({
    message: `received parcel of unknown type ${parcel.type}`,
    parcel,
  });
};

const createParcel = (type: string, receiverId = 'all', senderId = 'system', kwargs = {}): Parcel => ({
  timeStamp: new Date().toLocaleString(),
  type,
  receiverId,
  senderId,
  ...kwargs,
});

class ParcelService {
  webSocketService: WebSocketService;

  constructor(wsService: WebSocketService) {
    this.webSocketService = wsService;
  }

  broadCast = (parcel: Parcel): void => {
    this.webSocketService
      .getAllWebSockets()
      .forEach(({ webSocket }: { webSocket: ws}) => webSocket.send(JSON.stringify(parcel)));
  };

  deliver = (parcel: Parcel): void => {
    this.webSocketService
      .getWebSocketsByUserId(parcel.receiverId)
      .map(({ webSocket }: WebSocketData) => webSocket)
      .forEach((webSocket: ws) => webSocket.send(JSON.stringify(parcel)));
  };

  deliverSetupParcel = (userId: string, messages: Record<string, any>): void => {
    const parcel = createParcel('SETUP CLIENT', userId, '', { messages });
    this.deliver(parcel);
  };

  receive = (parcel: Parcel): void => {
    switch (parcel.type) {
      case 'DIRECT MESSAGE':
        return this.deliver(parcel);
      default:
        return logUnknownParcel(parcel);
    }
  };
}

const parcelService = new ParcelService(webSocketService);

export { ParcelService, parcelService, createParcel };
