import * as ws from 'ws';

import { WebSocketDetails } from '../types';

class WebSocketService {
  webSockets: { [x: string]: WebSocketDetails[] };

  constructor() {
    this.webSockets = {};
  }

  addWebSocket = (webSocketId: string, webSocket: ws): void => {
    const userId = this.getUserId(webSocketId);
    const webSocketData = { webSocket, webSocketId };
    this.webSockets[userId] = this.webSockets[userId]
      ? [...this.webSockets[userId], webSocketData]
      : [webSocketData];
  };

  hasWebSockets = (userId: string): boolean => (
    Boolean(this.getWebSocketsByUserId(userId).length)
  );

  getWebSocketsByUserId = (userId: string): WebSocketDetails[] => (
    this.webSockets[userId]
      ? this.webSockets[userId]
      : []
  );

  getUserId = (webSocketId: string): string => webSocketId.split('--')[0];

  removeWebSocket = (webSocketId: string): void => {
    const userId = this.getUserId(webSocketId);
    this.webSockets[userId] = this.webSockets[userId].filter(({ webSocketId: id }) => id !== webSocketId);
    if (this.webSockets[userId].length === 0) {
      this.removeUser(userId);
    }
  };

  removeUser = (userId: string): boolean => delete this.webSockets[userId];
}

const webSocketService = new WebSocketService();

export { webSocketService, WebSocketService };
