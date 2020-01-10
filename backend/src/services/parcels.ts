import * as ws from 'ws';

import { Parcel, WebSocketData } from '../types';

import { webSocketService, WebSocketService } from './webSockets';
import { logger } from '../logging';

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

  deliver = (parcel: Parcel): void => {
    this.webSocketService
      .getWebSocketsByUserId(parcel.receiverId)
      .map(({ webSocket }: WebSocketData) => webSocket)
      .forEach((webSocket: ws) => webSocket.send(parcel));
  };

  receive = (parcel: Parcel, onUnknownParcel = logUnknownParcel): void => {
    switch (parcel.type) {
      case 'DIRECT MESSAGE':
        return this.deliver(parcel);
      default:
        return onUnknownParcel(parcel);
    }
  };
}

const parcelService = new ParcelService(webSocketService);

export { ParcelService, parcelService };
