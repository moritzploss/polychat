import { Request, NextFunction } from 'express-serve-static-core';
import * as ws from 'ws';

import { logger } from '../logging';
import { parcelService } from '../services/parcelService';
import { setupParcel, contactListParcel } from '../parcels/defaults';

import { webSocketService } from '../services/webSocketService';
import { getUserMessages } from '../services/database';

const authenticateWebSocket = (webSocket: ws, req: Request, next: NextFunction): void => (
  (req.params.id.startsWith(req.session.userId) && req.session.authorized)
    ? next()
    : webSocket.close()
);

const onOpen = (webSocket: ws, webSocketId: string): void => {
  webSocketService.addWebSocket(webSocketId, webSocket);
  logger.info(`connection opened on websocket ${webSocketId}`);
  const userId = webSocketService.getUserId(webSocketId);
  getUserMessages(userId, (messages: Record<string, any>) => parcelService.deliver(setupParcel(userId, messages)));
  parcelService.broadCast(contactListParcel());
};

const onMessage = (webSocket: ws, data: string): void => {
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
