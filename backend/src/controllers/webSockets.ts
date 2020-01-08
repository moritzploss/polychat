import { Request } from 'express-serve-static-core';
import * as ws from 'ws';

import { logger } from '../logging';

export const onOpen = (webSocket: ws, req: Request, socketId: string): void => {
  logger.info('connection opened');
  return webSocket.send('welcome');
};

export const onMessage = (webSocket: ws, data: WebSocket) => {
  return logger.info('message received');
};

export const onClose = (webSocket: ws, code: number) => {
  return logger.info('connection closed');
};
