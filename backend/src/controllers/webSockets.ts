import { Request, NextFunction } from 'express-serve-static-core';
import * as ws from 'ws';

import { logger } from '../logging';
import { webSocketService } from '../services/webSockets';

const authenticateWebSocket = (webSocket: ws, req: Request, next: NextFunction): void => {
  return (req.params.id.startsWith(req.session.userId) && req.session.authorized)
    ? next()
    : webSocket.close();
};

const onOpen = (webSocket: ws, req: Request, socketId: string): void => {
  webSocketService.addWebSocket(socketId, webSocket);
  logger.info(`connection opened on socket ${socketId}`);
  return webSocket.send('welcome');
};

const onMessage = (webSocket: ws, data: WebSocket) => {
  return logger.info('message received');
};

const onClose = (webSocket: ws, req: Request) => {
  webSocketService.removeWebSocket(req.params.id);
  return logger.info(`connection closed ${req.params.id}`);
};

const setupEventListeners = (webSocket: ws, req: Request): void => {
  onOpen(webSocket, req, req.params.id);
  webSocket.on('message', onMessage);
  webSocket.on('close', () => onClose(webSocket, req));
};

export { authenticateWebSocket, setupEventListeners };
