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

class ParcelService {
  webSocketService: WebSocketService;

  constructor(wsService: WebSocketService) {
    this.webSocketService = wsService;
  }

  createParcel = (type: string, receiverId: string, senderId = 'system', body = {}, kwargs = {}): Parcel => ({
    ...kwargs,
    type,
    receiverId,
    senderId,
    body: JSON.stringify(body),
  });

  deliver = (parcel: Parcel): void => {
    this.webSocketService
      .getWebSocketsByUserId(parcel.receiverId)
      .map(({ webSocket }: WebSocketData) => webSocket)
      .forEach((webSocket: ws) => webSocket.send(JSON.stringify(parcel)));
  };

  deliverSetupParcel = (userId: string): void => {
    const parcel = this.createParcel(
      'SETUP CLIENT',
      userId,
    );
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

export { ParcelService, parcelService };
