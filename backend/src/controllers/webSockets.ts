import { Request, NextFunction } from 'express-serve-static-core';
import * as ws from 'ws';

import { logger } from '../logging';
import { parcelService } from '../services/parcelService';
import { connectedUserParcel } from '../parcels/blueprints';

import { webSocketService } from '../services/webSocketService';

const authenticateWebSocket = (webSocket: ws, req: Request, next: NextFunction): void => (
  (req.params.id.startsWith(req.session.userId) && req.session.authorized)
    ? next()
    : webSocket.close()
);

const onOpen = (webSocket: ws, webSocketId: string): void => {
  logger.info(`connection opened on websocket ${webSocketId}`);
  webSocketService.addWebSocket(webSocketId, webSocket);
  const userId = webSocketService.getUserId(webSocketId);
  parcelService.deliverContactListParcel(userId);
  parcelService.deliverMessageHistoryParcel(userId);
  parcelService.deliver(connectedUserParcel(userId));
};

const onMessage = (data: string): void => {
  console.log(data);
  const parcel = JSON.parse(data);
  parcelService.receive(parcel);
  logger.info('message received');
};

const onClose = (socketId: string): void => {
  webSocketService.removeWebSocket(socketId);
  logger.info(`connection closed on websocket ${socketId}`);
};

const setupEventListeners = (webSocket: ws, req: Request): void => {
  onOpen(webSocket, req.params.id);
  webSocket.on('message', onMessage);
  webSocket.on('close', () => onClose(req.params.id));
};

export { authenticateWebSocket, setupEventListeners };
