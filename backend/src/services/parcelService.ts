import * as ws from 'ws';

import { Parcel, WebSocketData } from '../types';

import { logger } from '../logging';
import { webSocketService, WebSocketService } from './webSocketService';

const logUnknownParcel = (parcel: Parcel): void => {
  logger.info({
    message: `received parcel of unknown type ${parcel.type}`,
    parcel,
  });
};

const createParcel = ({ type, receiverId = 'all', senderId = 'system', body = {}, kwargs = {} }): Parcel => ({
  ...kwargs,
  timeStamp: new Date().toLocaleString(),
  type,
  receiverId,
  senderId,
  body,
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
    const parcel = createParcel({
      type: 'SETUP CLIENT',
      receiverId: userId,
      body: { messages },
    });
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
