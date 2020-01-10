import { Request, NextFunction } from 'express-serve-static-core';
import * as ws from 'ws';

import { Parcel } from '../types';

import { logger } from '../logging';
import { parcelService } from '../services/parcelService';
import { webSocketService } from '../services/webSocketService';

const authenticateWebSocket = (webSocket: ws, req: Request, next: NextFunction): void => (
  (req.params.id.startsWith(req.session.userId) && req.session.authorized)
    ? next()
    : webSocket.close()
);

const onOpen = (webSocket: ws, socketId: string): void => {
  webSocketService.addWebSocket(socketId, webSocket);
  logger.info(`connection opened on websocket ${socketId}`);
  webSocket.send('welcome');
};

const onMessage = (webSocket: ws, data: Parcel): void => {
  parcelService.receive(data);
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
