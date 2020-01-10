import * as ws from 'ws';

import { WebSocketDetails } from '../types';

import uuid = require('uuid/v4');

export class WebSocketService {
  webSockets: { [x: string]: WebSocketDetails[] };

  constructor() {
    this.webSockets = {};
  }

  getUserId = (webSocketId: string): string => webSocketId.split('--')[0];

  addWebSocket = (webSocketId: string, webSocket: ws): void => {
    const userId = this.getUserId(webSocketId);
    const webSocketData = {
      webSocket,
      webSocketId,
    };
    this.webSockets[userId] = this.webSockets[userId]
      ? [...this.webSockets[userId], webSocketData]
      : [webSocketData];
  };

  removeWebSocket = (webSocketId: string): void => {
    const userId = this.getUserId(webSocketId);
    this.webSockets[userId] = this.webSockets[userId].filter(({ webSocketId: id }) => id !== webSocketId);
    if (this.webSockets[userId].length === 0) {
      delete this.webSockets[userId];
    }
  };

  removeUser = (userId: string): boolean => delete this.webSockets[userId];

  hasWebSockets = (userId: string): boolean => (
    Boolean(this.getWebSocketsByUserId(userId).length)
  );

  getWebSocketsByUserId = (userId: string): WebSocketDetails[] => (
    this.webSockets[userId]
      ? this.webSockets[userId]
      : []
  );
}

export const webSocketService = new WebSocketService();
